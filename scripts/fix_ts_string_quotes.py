#!/usr/bin/env python3
"""Rewrite quoted string values in generated Salsa data modules as template literals.

Two agents independently produced the same ~2650 TypeScript syntax errors while
writing the intermediate courses' data modules, and the cause is the same in both:
the material is transcript text. Cue `verbatim` fields, footwork paragraphs and
teacher quotes are full of apostrophes ("Let's start", "you don't", "the
follower's right hand") and of inner double quotes, and the agents wrapped them
in single-quoted literals. Three distinct breakages follow:

* An unescaped apostrophe closes the literal early, and the remainder of the
  sentence is parsed as code.
* A literal opened with `'` and closed with `"` — a mismatched pair the eye reads
  as fine.
* Prettier-style wrapping put a long paragraph on its own line, and a
  single-quoted literal cannot span lines at all (TS1002).

This is a mechanical problem and deserves a mechanical fix rather than another
agent pass. Backtick literals are the fix rather than better escaping: inside a
template literal both `'` and `"` are ordinary characters, so the entire class of
error disappears instead of being escaped around. Only a backtick and the `${`
sequence need care, and neither occurs in salsa transcript text — the script
escapes them anyway so it stays correct if that ever changes.

What counts as a value string: a literal opening immediately after `key:`, or
opening a line on its own (prettier moves long values to the next line, and
array elements sit alone too). Object, array and numeric values never match,
because the pattern requires a quote character at the value position.

The terminator is the last quote on a line, optionally followed by a comma.
Where a line has none, the value is a wrapped paragraph and the script keeps
consuming lines until it finds one. That is the only heuristic here, and it is
checked rather than trusted: `tsc --noEmit` must reach zero errors afterwards,
and any place the heuristic guessed wrong shows up there as a syntax error
rather than as silently mangled text.

Idempotent — a value already written as a template literal is left alone.

Usage:
    uv run scripts/fix_ts_string_quotes.py <file.ts> [<file.ts> ...]
    uv run scripts/fix_ts_string_quotes.py --check <file.ts>   # report, don't write
"""

from __future__ import annotations

import argparse
import logging
import re
import sys
from pathlib import Path

log = logging.getLogger("fix_ts_string_quotes")

# A value position: `key: "` / `key: '`, or a literal alone at the start of a line
# (prettier's wrapping of a long value, and array elements). The trailing group is
# whatever follows the opening quote on that line.
#
# The optional backslash is a fourth breakage: some values open with `\"` rather
# than `"`, an escape written where no escaping applies. TypeScript rejects it as
# an invalid character, and without the `\\?` here those lines look like ordinary
# code and are skipped.
OPEN = r"\\?(?P<q>['\"])"
VALUE_START = re.compile(
    r"^(?P<lead>\s*(?:[A-Za-z_$][\w$]*|'[^']*'|\"[^\"]*\"|\[[^\]]*\])\s*:\s*)"
    + OPEN + r"(?P<rest>.*)$"
)
BARE_START = re.compile(r"^(?P<lead>\s*)" + OPEN + r"(?P<rest>.*)$")

# A line that ends a string value: a quote, then an optional comma, then nothing.
# The closing quote is deliberately not required to match the opening one, and may
# itself carry a stray backslash — a literal opened with ' and closed with " (or
# with \") is exactly what is being repaired.
# Greedy, so it finds the *last* quote on the line rather than the first: the body
# legitimately contains quotes, and stopping at the first would truncate the value.
TERMINATOR = re.compile(r"(?P<body>.*)(?P<q>['\"])(?P<tail>,?)\s*$")


def as_template(content: str) -> str:
    """Body of a template literal holding `content` verbatim.

    Escapes only what a template literal treats as special. Incoming `\\'` and
    `\\"` are unescaped first: inside backticks those are literal characters, and
    leaving the backslashes in would print them.
    """
    content = content.replace("\\'", "'").replace('\\"', '"')
    return content.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def repair(lines: list[str]) -> tuple[list[str], int]:
    out: list[str] = []
    i = 0
    changed = 0
    while i < len(lines):
        line = lines[i]
        m = VALUE_START.match(line) or BARE_START.match(line)
        if not m:
            out.append(line)
            i += 1
            continue

        # Collect the value, following wrapped paragraphs across lines.
        parts: list[str] = []
        j = i
        rest = m.group("rest")
        tail = ""
        while True:
            end = TERMINATOR.match(rest)
            if end:
                # A backslash immediately before the closing quote belongs to the
                # stray escape, not to the text. Greedy matching leaves it in the
                # body, so take it off here rather than complicating the pattern.
                parts.append(end.group("body").removesuffix("\\"))
                tail = end.group("tail")
                break
            parts.append(rest)
            j += 1
            if j >= len(lines):
                # Unterminated to end of file: not something to guess at.
                log.warning("unterminated string starting at line %d", i + 1)
                out.extend(lines[i : j + 1])
                i = j + 1
                parts = []
                break
            rest = lines[j]
        if not parts:
            continue

        # A wrapped paragraph rejoins with a single space; prettier's break points
        # sit between words, so joining without one would fuse them.
        content = " ".join(p.strip() for p in parts) if len(parts) > 1 else parts[0]
        out.append(f"{m.group('lead')}`{as_template(content)}`{tail}")
        if j != i or m.group("q") != "`":
            changed += 1
        i = j + 1
    return out, changed


def main() -> int:
    logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("files", nargs="+", type=Path)
    ap.add_argument("--check", action="store_true",
                    help="report what would change without writing")
    args = ap.parse_args()

    total = 0
    for path in args.files:
        if not path.exists():
            log.error("%s: no such file", path)
            return 1
        original = path.read_text().splitlines()
        fixed, changed = repair(original)
        total += changed
        log.info("%s: %d value string(s) rewritten", path.name, changed)
        if changed and not args.check:
            path.write_text("\n".join(fixed) + "\n")
    log.info("%d value string(s) rewritten across %d file(s)", total, len(args.files))
    return 0


if __name__ == "__main__":
    sys.exit(main())

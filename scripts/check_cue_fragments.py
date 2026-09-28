"""
Validate the markdown cue tables in the intermediate spec against the types they
will be compiled into.

Why this exists as a script and not a reading pass: the cues were written by a
dozen separate agents into a dozen separate files, and the failure modes are all
invisible to a skim. A `kind` that is not in the `CueKind` union reads perfectly
well in markdown and only fails much later, in Step 5, as a TypeScript error with
no pointer back to which transcript the bad row came from. A `@` timestamp past
the end of the video looks like any other number. A duplicate cue id across two
fragments cannot be seen at all without holding both files at once.

The allowed values are **parsed out of `salsa-types.ts`**, never hardcoded here.
That is the whole point: this script's job is to agree with the types, so reading
the union from the source means the check cannot drift when a kind is added. A
hardcoded copy would pass while being wrong, which is worse than no check. The
first pass of this spec had exactly that bug one level up — the brief listed five
of the eight real `CueKind` values, so agents were pushed into using `concept` for
everything that was really `styling` or `musicality`, and one invented
`body-movement` outright.

Durations come from the `.info.json` files, so "this timestamp is past the end of
the video" is checkable rather than a judgement call.

Usage:
    uv run scripts/check_cue_fragments.py
    uv run scripts/check_cue_fragments.py --verbose   # also print per-file stats
"""

# /// script
# requires-python = ">=3.12"
# dependencies = []
# ///

import argparse
import json
import logging
import re
import sys
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
TYPES = REPO / "frontend" / "src" / "data" / "salsa-types.ts"
INFO_DIR = REPO / "data" / "cache" / "salsa" / "info"
PLAN = REPO / "SALSA_INTERMEDIATE_PLAN.md"

# A row of one of the plan's three scope tables: `| 7 | Mojito | `AthN6Dl2zqw` | …`.
# The first backticked id is the teaching video; a second one, where present, is
# the official short, which is a clip source rather than something cues come from.
PLAN_ROW = re.compile(r"^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*`([A-Za-z0-9_-]{11})`")

# Where the slug a move's cue ids actually use differs from the slug of the name in
# the plan's table. Same idea as ALIASES in normalize_salsa_terms.py, and the same
# cause: the channel spells its own move two ways. The move video is titled
# `"Sombrero por dabajo"` while all three of its shorts say "Debajo", so the cue
# ids use the correct Spanish and the plan's table quotes the video title verbatim
# (R1). Both are right; this maps between them rather than picking a winner.
SLUG_ALIASES = {"sombrero-por-dabajo": "sombrero-por-debajo"}

log = logging.getLogger("check_cue_fragments")

# A cue row. Deliberately tolerant about spacing and about the backticks agents
# put around `id`/`role`/`kind`, because those are cosmetic; it is strict about
# there being exactly seven columns, because a missing one silently shifts every
# later value into the wrong field.
ROW = re.compile(r"^\|(?P<cells>(?:[^|]*\|){6}[^|]*)\|\s*$")

HEADER_CELLS = ["id", "beat", "role", "kind", "text", "@", "verbatim"]


def parse_union(source: str, name: str) -> set[str]:
    """Pull the string literals out of `export type <name> = 'a' | 'b' | ...`.

    Reading these from the TypeScript instead of restating them is what keeps this
    script honest: if someone adds a `CueKind`, the check widens automatically
    instead of rejecting valid new data.
    """
    m = re.search(
        rf"export type {name}\s*=\s*(?P<body>(?:[^=;]|\n)*?);?\n\n", source + "\n\n"
    )
    if not m:
        raise SystemExit(f"could not find `export type {name}` in {TYPES}")
    values = set(re.findall(r"'([^']+)'", m.group("body")))
    if not values:
        raise SystemExit(f"found `{name}` but no string literals in it")
    return values


def video_durations() -> dict[str, float]:
    """video id -> duration in seconds, from the cached metadata."""
    out = {}
    for p in INFO_DIR.glob("*.info.json"):
        try:
            data = json.loads(p.read_text())
        except json.JSONDecodeError:
            continue
        if (dur := data.get("duration")) is not None:
            out[p.name.removesuffix(".info.json")] = float(dur)
    return out


def strip_cell(s: str) -> str:
    return s.strip().strip("`").strip()


def parse_beat(raw: str) -> str | None:
    """Reasons `beat` is malformed, or None if it is fine.

    `—` (or `-`) means the teachers never said a number, which is the common and
    correct case — R1 forbids inventing one. Anything else must be a beat in 1..8
    or a list of them.
    """
    v = strip_cell(raw)
    if v in {"—", "-", "–", ""}:
        return None
    if v.startswith("["):
        try:
            nums = json.loads(v)
        except json.JSONDecodeError:
            return f"beat {v!r} is not a valid list"
        if not all(isinstance(n, int) and 1 <= n <= 8 for n in nums):
            return f"beat {v!r} has a value outside 1-8"
        return None
    if re.fullmatch(r"\d+", v):
        return None if 1 <= int(v) <= 8 else f"beat {v} is outside 1-8"
    # Four agents independently wrote a bare `5,6` for a multi-beat cue, so this
    # is the notation people reach for rather than a careless slip — say what to
    # write instead of only what is wrong. It maps to `beats`, not `beat`, and the
    # brackets are what make the two distinguishable without guessing.
    if re.fullmatch(r"\d+(?:\s*,\s*\d+)+", v):
        return f"beat {v!r} needs list brackets: write [{','.join(x.strip() for x in v.split(','))}]"
    return f"beat {v!r} is neither a number, a list, nor an em dash"


def check_file(path: Path, kinds: set[str], roles: set[str],
               durations: dict[str, float]) -> tuple[list[str], list[dict], set[str]]:
    problems: list[str] = []
    cues: list[dict] = []
    text = path.read_text()

    # `sourceVideo` is stated once per class in prose rather than per row, so the
    # ids named anywhere in the file are the candidate sources for its timestamps.
    # Several files legitimately mention more than one (a move video plus its
    # short), so this is a set to check against, not a single value.
    # Not `\b`-anchored: two of these ids begin with a hyphen (`-oIcWUIwlx4`,
    # "Donde vas"), and `\b` cannot match between a space and a hyphen, so the
    # word-boundary version silently never saw them — it reported the move as
    # having no cues while its cues sat in the file being read. Explicit
    # lookarounds for "not a continuation of a longer token" instead.
    ids_named = set(re.findall(
        r"(?<![A-Za-z0-9_-])([A-Za-z0-9_-]{11})(?![A-Za-z0-9_-])", text))
    known = {v for v in ids_named if v in durations}
    longest = max((durations[v] for v in known), default=None)

    # `int-couples` is not a numbered course; the channel never numbered these
    # videos, so a "Class N" label here would be invented structure (plan §5).
    #
    # But *referring* to another course's numbered class is not that error, and the
    # first version of this check could not tell the difference: it flagged
    # "references El Uno from the beginners course (couples Class 5)", which is a
    # true and useful sentence — that beginners class is exactly what this move
    # elaborates. What the rule is actually guarding against is a class number
    # being used as this material's own label, so it only fires where a label
    # would live: a heading, or a table cell. Prose citing another course is fine,
    # and a citation naming that course is fine anywhere.
    if "_ic-" in path.name:
        for lineno, line in enumerate(text.splitlines(), 1):
            if not (m := re.search(r"\bClass\s+\d+", line)):
                continue
            cites_other_course = re.search(
                r"\b(beginners|beginner|steps course|couples course|int-steps)\b",
                line, re.I)
            is_label_position = line.lstrip().startswith(("#", "|"))
            if is_label_position or not cites_other_course:
                problems.append(
                    f"{path.name}:{lineno}: says {m.group(0)!r} as a label — "
                    f"int-couples has no class numbers, identify the move by name "
                    f"(citing another course's class in prose is fine)")

    # Only rows under a cue header count. The segment-map tables in these same
    # files also have seven columns (`| id | start | end | role | ... |`), and
    # reading those as cues produced hundreds of nonsense complaints about a
    # `kind` of "teach" and a `@` of "cachan" — the check has to know which table
    # it is standing in, not just count pipes.
    in_cue_table = False

    # Which class/move/sequence each cue belongs to, for the coverage check. Cue
    # ids cannot answer this: they are keyed to a move slug the agents chose
    # ("elegua-weight" for "Elegua basic step", "transition-to-son-1" for the
    # Salsa→Son class), so matching them against the plan's names misses. The
    # headings are regular where the ids are not — `# Class N — Name`,
    # `# Position N — Name`, `# Name — Cues` — so a cue's owning section is the
    # nearest level-1 and level-2 heading above it.
    crumbs: dict[int, str] = {}

    for lineno, line in enumerate(text.splitlines(), 1):
        if h := re.match(r"^(#{1,2})\s+(.*)", line):
            level = len(h.group(1))
            crumbs[level] = h.group(2).strip()
            for deeper in [k for k in crumbs if k > level]:
                del crumbs[deeper]
        m = ROW.match(line)
        if not m:
            # A blank line or prose ends the table. Without this a cue header
            # would make every later 7-column table look like cues too.
            if not line.strip().startswith("|"):
                in_cue_table = False
            continue
        cells = [c for c in m.group("cells").split("|")]
        if len(cells) != 7:
            continue
        stripped = [strip_cell(c) for c in cells]
        lowered = [s.lower() for s in stripped]
        # The beginners spec writes this column as "beat / beats" in places, so
        # match on the columns that identify a cue table rather than all seven.
        if lowered[0] == "id" and lowered[5] == "@" and lowered[6] == "verbatim":
            in_cue_table = True
            continue
        if lowered == HEADER_CELLS:
            in_cue_table = True
            continue
        if all(set(s) <= set("-: ") for s in stripped):
            continue  # the |---|---| separator row
        if not in_cue_table:
            continue
        cue_id, beat, role, kind, body, at, verbatim = stripped
        where = f"{path.name}:{lineno}"

        if not cue_id:
            problems.append(f"{where}: empty id")
        if role not in roles:
            problems.append(f"{where}: role {role!r} is not in CueRole {sorted(roles)}")
        if kind not in kinds:
            problems.append(f"{where}: kind {kind!r} is not in CueKind {sorted(kinds)}")
        if (why := parse_beat(beat)):
            problems.append(f"{where}: {why}")
        if not body:
            problems.append(f"{where}: empty cue text")
        if not verbatim:
            # The whole point of this column is that a cue stays checkable against
            # the transcript. Without it there is nothing to check against.
            problems.append(f"{where}: empty verbatim — the cue cannot be verified")

        # The timestamp is the one field with no honest default. R3: a cue without
        # a source timestamp is treated as invented.
        if not re.fullmatch(r"\d+(?:\.\d+)?", at):
            problems.append(f"{where}: @ {at!r} is not a timestamp")
        else:
            secs = float(at)
            if longest is not None and secs > longest + 1:
                problems.append(
                    f"{where}: @ {secs} is past the end of every video named in "
                    f"this file (longest is {longest:.0f}s)"
                )
            if "." not in at:
                problems.append(f"{where}: @ {at} has no decimals — word timings "
                                f"are given to the hundredth, a whole number is a "
                                f"sign it was chosen rather than looked up")
            cues.append({"id": cue_id, "kind": kind, "role": role,
                         "beat": beat, "at": secs, "file": path.name,
                         "section": " / ".join(crumbs[k] for k in sorted(crumbs))})

    if not cues:
        problems.append(f"{path.name}: no cue rows found at all — either the tables "
                        f"are missing or the column layout does not match")
    return problems, cues, known


def existing_move_ids() -> set[str]:
    """Every move id the beginners courses actually export.

    Read from `teaches:` arrays rather than from `id:`, because `id:` in those
    modules is mostly cue and segment ids — matching against all of them makes any
    string look valid and the check passes on nonsense.
    """
    ids: set[str] = set()
    for d in ("salsa-steps-classes", "salsa-couples-classes"):
        for p in (REPO / "frontend" / "src" / "data" / d).glob("*.ts"):
            for block in re.findall(r"teaches:\s*\[([^\]]*)\]", p.read_text()):
                ids |= set(re.findall(r"'([a-z0-9-]+)'", block))
    return ids


def check_composed_of(expected: list[tuple[str, str, str, str]],
                      slugify) -> list[str]:
    """Every `composedOf` id must name a move that exists.

    This cannot be done by reading, which is the whole reason it is here. A
    `composedOf` entry pointing at an id nothing defines renders as an ordinary
    link and stays indistinguishable from a working one until someone taps it, so
    the corpus carried five dangling ids through a full review pass. One was
    Whisper's mishearing of a real move ("dile-cano" for `dile-que-no`), two named
    moves that are only ever taught in videos this course deliberately does not
    clip, and one named a move that is genuinely in the video but has no id of its
    own. Only the first was fixable by renaming; the rest had to be dropped, and
    the difference is exactly what a reader cannot see.
    """
    universe = existing_move_ids()
    # The intermediate moves have no TypeScript yet — Step 5 writes it — so their
    # ids come from the same scope tables the coverage check uses. That keeps the
    # two checks from disagreeing about what is in scope.
    universe |= {slugify(name) for _, _, name, _ in expected}
    problems: list[str] = []
    for path in sorted(REPO.glob("SALSA_INTERMEDIATE_SPEC_PART*.md")):
        for lineno, line in enumerate(path.read_text().splitlines(), 1):
            if "composedOf" not in line:
                continue
            # Only the array itself. These rows carry prose after it explaining
            # which ids were dropped and why, and that prose names the dropped
            # ids — reading the whole line would re-flag every one of them.
            m = re.search(r"`\[([^\]]*)\]`", line)
            if not m:
                continue
            for move_id in re.findall(r"'([^']+)'", m.group(1)):
                if move_id not in universe:
                    problems.append(
                        f"{path.name}:{lineno}: composedOf names {move_id!r}, which "
                        f"is not a move in any course — rename it to the real id or "
                        f"drop it and say why (a dangling edge fails silently)")
    return problems


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--verbose", action="store_true", help="print per-file stats")
    args = ap.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(message)s")

    source = TYPES.read_text()
    kinds = parse_union(source, "CueKind")
    roles = parse_union(source, "CueRole")
    durations = video_durations()
    log.info("CueKind from salsa-types.ts: %s", ", ".join(sorted(kinds)))
    log.info("CueRole from salsa-types.ts: %s", ", ".join(sorted(roles)))
    log.info("durations known for %d videos", len(durations))

    files = sorted(REPO.glob("SALSA_INTERMEDIATE_CUES_*.md"))
    files += sorted(REPO.glob("SALSA_INTERMEDIATE_SPEC_PART*.md"))
    if not files:
        log.error("no cue fragments or spec parts found in %s", REPO)
        return 1

    problems: list[str] = []
    all_cues: list[dict] = []
    covered: set[str] = set()
    for path in files:
        file_problems, cues, named = check_file(path, kinds, roles, durations)
        problems += file_problems
        all_cues += cues
        # A video counts as covered when it is named in a file that actually has
        # cues in it. Being named in a cue-less file means the opposite of covered.
        if cues:
            covered |= named
        if args.verbose:
            by_kind = Counter(c["kind"] for c in cues)
            log.info("  %-46s %3d cues  %s", path.name, len(cues),
                     " ".join(f"{k}={v}" for k, v in by_kind.most_common()))

    # Duplicate ids are the one error that is invisible from inside a single file,
    # which is exactly why the fragments needed a cross-file check.
    seen: dict[str, list[str]] = defaultdict(list)
    for c in all_cues:
        seen[c["id"]].append(c["file"])
    for cue_id, where in sorted(seen.items()):
        if len(where) > 1:
            problems.append(f"duplicate cue id {cue_id!r} in {', '.join(where)}")

    # Coverage. The corpus is spread over 28 files written by a dozen agents, some
    # per-class and some per-batch, so "did every move in scope actually get cues"
    # is not answerable by reading — a move can go missing without any single file
    # looking wrong. The plan's own scope tables are the list to check against,
    # which also means widening scope there automatically widens this check.
    #
    # Each entry is checked against the sections that actually contain cues, not
    # against "the video id appears somewhere in a file that has cues": one batch
    # file covers nine moves at once, so the weaker test passes for all nine as
    # soon as any single one of them has a cue.
    sections = {c["section"] for c in all_cues}
    expected: list[tuple[str, str, str, str]] = []  # table, n, name, video
    table = None
    for line in PLAN.read_text().splitlines():
        if line.startswith("### Intermediate steps"):
            table = "steps"
        elif line.startswith("### Intermediate couples"):
            table = "couples"
        elif line.startswith("Sequences getting"):
            table = "sequences"
        elif line.startswith(("##", "Video 23")):
            table = None
        if table and (m := PLAN_ROW.match(line)):
            expected.append((table, m.group(1), m.group(2), m.group(3)))
    if not expected:
        problems.append(f"parsed no scope rows out of {PLAN.name} — the coverage "
                        f"check is silently passing, fix PLAN_ROW")

    def slugify(name: str) -> str:
        ascii_name = (unicodedata.normalize("NFKD", name)
                      .encode("ascii", "ignore").decode())
        s = re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", ascii_name.lower())).strip("-")
        return SLUG_ALIASES.get(s, s)

    def names_entry(section: str, table: str, n: str, name: str) -> bool:
        """Does this section heading identify this scope-table entry?"""
        if table == "steps":
            # `\b` matters: without it "Class 1" also matches "Class 14".
            return re.search(rf"\bClass\s+{n}\b", section) is not None
        slug = slugify(name)
        # The negative lookahead keeps "Casino con estilo" from matching
        # "Casino con estilo 2" — the two sequences differ only by that trailing
        # digit, so a plain substring test would mark both covered off one of them.
        if re.search(rf"{re.escape(slug)}(?!-?\d)", slugify(section)):
            return True
        return (table == "couples"
                and re.search(rf"\bPosition\s+{n}\b", section) is not None)

    missing = []
    for table, n, name, video in expected:
        if not any(names_entry(s, table, n, name) for s in sections):
            missing.append((n, name, f"Class/Position {n} or {slugify(name)!r}"))
    log.info("")
    log.info("coverage: %d of %d entries in the plan's scope tables have cues",
             len(expected) - len(missing), len(expected))
    for n, name, want in missing:
        problems.append(f"no cues for {n}. {name} — nothing matching {want!r}")

    composed = check_composed_of(expected, slugify)
    problems += composed
    log.info("composedOf: %d dangling move id(s)", len(composed))

    log.info("")
    log.info("%d cues across %d files", len(all_cues), len(files))
    for k, v in Counter(c["kind"] for c in all_cues).most_common():
        log.info("   %-12s %4d", k, v)
    dashed = sum(1 for c in all_cues if strip_cell(c["beat"]) in {"—", "-", "–", ""})
    log.info("   %d cues state a beat, %d correctly leave it unstated",
             len(all_cues) - dashed, dashed)

    if problems:
        log.error("")
        log.error("FAIL — %d problem(s):", len(problems))
        for p in problems:
            log.error("   %s", p)
        return 1
    log.info("")
    log.info("OK — every cue row is well-formed and consistent with the types.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

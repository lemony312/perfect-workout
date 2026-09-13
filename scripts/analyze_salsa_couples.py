#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""
Build the working material for the Cuban Salsa Beginners Course *for Couples*.

Unlike the steps course, this one is fully chaptered (197 chapters over 21
classes) and each description carries an explicit "we show and explain how to
do:" list. So the move index and the segment boundaries come straight from the
teachers instead of being inferred, and this script's job is to lay that out
next to the transcript so a human (or an agent) can mine lead cues from it.

Deliberately does NOT decide anything. It emits chapters, description moves and
chapter-aligned transcript text; choosing clip windows and writing cues is a
judgement pass that happens after this, against `SALSA_TAB_GOALS.md`.

Two things it *does* assert, because both bit us on the steps course:

  1. **Chapter titles are normalised to roles, and unrecognised titles are
     reported rather than bucketed.** Steps Class 2's chapters were actively
     mislabelled, so a title we don't recognise is a finding, not a default.

  2. **Every chapter boundary is checked against the transcript.** A `count`
     chapter that contains no counting, or a `music` chapter whose first words
     are still explanation, means the boundary is off. Reported per chapter as a
     confidence hint; nothing is silently trusted.

Usage:
    uv run scripts/analyze_salsa_couples.py                  # all 21 -> stdout
    uv run scripts/analyze_salsa_couples.py --class 11       # one class
    uv run scripts/analyze_salsa_couples.py --out FILE.md    # write to disk
    uv run scripts/analyze_salsa_couples.py --roles          # role tally only
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
INFO_DIR = BASE_DIR / "data/cache/salsa/info"
WHISPER_DIR = BASE_DIR / "data/cache/salsa/whisper"

# Playlist order. Mirrors COUPLES in transcribe_salsa.py; kept as a literal here
# so this script is readable on its own and so a mismatch is obvious.
COUPLES: list[tuple[int, str, str]] = [
    (1, "MDEAN40DUVY", "Al centro, arriba, abajo"),
    (2, "np3g2IzZ11A", "La chica, el chico, los dos"),
    (3, "y6wC5uHfXG0", "Dile que no, Guapea"),
    (4, "kg5Ztcp5xQU", "Enchufla, Enchufla al Centro"),
    (5, "4KKAKgn8UZ4", "El Uno"),
    (6, "yZ562-ehtQQ", "Kentucky"),
    (7, "pZChl5ylSJw", "Vacilala por la mano"),
    (8, "X4Sr8QbXQLU", "Adios con la hermana"),
    (9, "lV56IVufYOU", "Sombrero"),
    (10, "CkZO6nyJwjw", "Enchufla, Alarde, Exhibela"),
    (11, "QueWxI6vMrc", "Setenta"),
    (12, "EuT94T544Mg", "Paseala"),
    (13, "GT7PTpvni_A", "CocaCola"),
    (14, "jBaHuGXoWBY", "Vacilala, Vacilala Los Dos"),
    (15, "f8Y-b3m070c", "Tiramisu"),
    (16, "H5Idj-uzmn8", "Sombrero complicado doble"),
    (17, "uoq2J1txSTE", "Juana la Cubana"),
    (18, "97Urh5GlCbg", "Dedo"),
    (19, "M3J7w59rXTE", "Santiago"),
    (20, "6-cpKa0UMWA", "Solo sequence"),
    (21, "X7lz-BBMmU8", "All moves demo"),
]

# Classes with no official short — per the charter, the single most important
# research finding. These need BOTH clips cut from the class itself.
NO_SHORT_CLASSES = {1, 2, 3, 4, 20, 21}

SHORTS: dict[int, str] = {
    5: "qwR89NAQgqM", 6: "V57F7c5R5jY", 7: "18cM9UvzsoI", 8: "JkwUzKb_X-8",
    9: "Nl714zi8W-A", 10: "fNXwnQuVdEI", 11: "TyOHtkirh_g", 12: "UsvPdXW4-O4",
    13: "7MODqLfyTQQ", 14: "c0H4GQnYjNE", 15: "xwwnWPXpKz8", 16: "wAK8hMxwfes",
    17: "B5A2kgjTvnw", 18: "TM9kP4jy0To", 19: "vlSqi-msy60",
}

# Chapter-title -> role, matched as a substring on the lowercased title, longest
# pattern first so "practise with music" beats a bare "music".
#
# The camera annotation is deliberately NOT a role. This course reshoots the same
# material from several cameras and says so in the title, which means a chapter
# can be *both* a music demo and a back-camera take: Class 1's "All moves with
# music - Back camera" is the only full-tempo demo in the entire class. Treating
# the camera as the role hides it, and classes 1 and 2 lose every fast-clip
# candidate they have. So the content wins and the camera is recorded separately.
#
# A chapter that carries *only* a camera annotation is a genuine alternate take of
# a window already covered elsewhere — those get role `angle` further down, and
# are review material rather than publishable clips, since the framing changes
# mid-move.
ROLE_PATTERNS: list[tuple[str, str]] = [
    ("fluently with count", "count"),
    ("slowly with count", "count"),
    ("with count", "count"),
    ("practise with music", "music"),
    ("practice with music", "music"),
    ("review with music", "review"),
    ("music + review", "review"),
    ("with music", "music"),
    ("presentation & explanation", "teach"),
    ("presentation and explanation", "teach"),
    ("explanation", "teach"),
    ("presentation", "teach"),
    ("about this class", "skip"),
    ("intro", "skip"),
    ("outro", "skip"),
    ("summary", "skip"),
    ("recap", "review"),
]

# Camera annotations, stripped off before the role is decided.
CAMERA_PATTERNS: list[tuple[str, str]] = [
    ("back camera", "back"),
    ("front camera", "front"),
    ("both cameras", "both"),
    ("side view", "side"),
    ("different angle", "other"),
    ("other angle", "other"),
]

# Words that indicate counting is actually happening in a window. Whisper renders
# the count-alongs inconsistently ("5, 6, 7", "five six seven", "cinco"), so the
# check is deliberately loose — it answers "is there counting here at all?", not
# "how many bars".
COUNT_TOKENS = re.compile(
    r"\b(one|two|three|four|five|six|seven|eight|1|2|3|4|5|6|7|8|"
    r"uno|dos|tres|cinco|seis|siete)\b", re.I)


# Chapters titled by *content* instead of by the template. There are 17 of them
# and they are not noise — several are the most valuable windows in the course
# ("Leading Dile Que No" is 56s of pure lead instruction, exactly what R3 wants).
#
# Matched on the exact title so a new unrecognised title still gets reported
# rather than being absorbed by a loose pattern. Each was assigned by checking
# the window's count-density in this script's own output: a real `count` window
# runs very high, a `music` window carries the demo, and everything below sits in
# the 7–32% band that means "explaining, with some counting alongside" — i.e.
# `teach`. None of these are loopable demos, so none may be published as a clip
# while a genuine `count` chapter exists in the same class.
TITLE_OVERRIDES: dict[str, str] = {
    # Class 1 — the course preamble and the fundamentals of the hold.
    'About the "Salsa beginners guide"': "skip",       # meta, about the course
    "How to hold your partner? (Close position)": "teach",
    "Basic step on the spot": "teach",
    # Class 2
    "About the close position": "teach",              # technique, not meta
    # Class 3–5 — Dile que no and Guapea, the foundations with no short.
    "Dile que no - steps": "teach",
    "Leading Dile Que No": "teach",                   # R3 goldmine, 56s
    "Enchufla al Centro": "teach",
    "Open - close position loop": "teach",
    "Versions of Guapea": "teach",
    "Open - close loop practice": "teach",
    "Dile Que No side to side": "teach",
    # Class 6
    "Extra information": "teach",
    "BONUS - La chica from Guapea": "teach",          # a named move
    # Class 17
    "Semi complicado part": "teach",
    # Class 20
    "How to enter a solo sequence": "teach",
    "Additional info about dancing solo": "teach",
    # Class 21 — the all-moves recap is one continuous song.
    "Demo song": "music",
}


@dataclass
class Chapter:
    index: int
    title: str
    start: float
    end: float
    role: str
    role_matched: str | None
    # Which camera this take is from, when the title says. Independent of role:
    # a chapter can be a music demo *and* a back-camera take.
    camera: str | None = None
    text: str = ""
    count_density: float = 0.0
    notes: list[str] = field(default_factory=list)

    @property
    def duration(self) -> float:
        return self.end - self.start


def mmss(seconds: float) -> str:
    return f"{int(seconds) // 60}:{int(seconds) % 60:02d}"


def classify(title: str) -> tuple[str, str | None, str | None]:
    """
    Map a chapter title to (role, camera, matched_pattern).

    The camera annotation is found and removed first, so "All moves with music -
    Back camera" classifies on "with music" and still records that it is the back
    camera. Only a title with nothing left after the camera is stripped becomes
    role `angle`.
    """
    camera: str | None = None
    low = title.lower()
    for pattern, cam in CAMERA_PATTERNS:
        if pattern in low:
            camera = cam
            low = low.replace(pattern, " ")
            break

    if title in TITLE_OVERRIDES:
        return TITLE_OVERRIDES[title], camera, "exact-title override"

    for pattern, role in sorted(ROLE_PATTERNS, key=lambda p: -len(p[0])):
        if pattern in low:
            return role, camera, pattern

    # Nothing but a camera annotation, e.g. "Al centro - Front camera": an
    # alternate take of material covered by a neighbouring chapter.
    if camera:
        return "angle", camera, "camera annotation only"
    return "UNKNOWN", None, None


def load_info(video_id: str) -> dict:
    p = INFO_DIR / f"{video_id}.info.json"
    if not p.exists():
        raise FileNotFoundError(
            f"{p} missing — run: uv run scripts/transcribe_salsa.py couples")
    return json.loads(p.read_text())


def load_segments(video_id: str) -> list[dict]:
    """Prefer the term-normalised transcript; fall back to the raw one."""
    for name in (f"{video_id}.norm.json", f"{video_id}.json"):
        p = WHISPER_DIR / name
        if p.exists():
            data = json.loads(p.read_text())
            return data["segments"] if isinstance(data, dict) else data
    return []


def description_moves(description: str) -> list[str]:
    """
    Pull the explicit move list out of the description.

    The template is "we show and explain how to do:" followed by "- " bullets.
    Stops at the first blank line or non-bullet, so the social links at the
    bottom of every description don't leak in.
    """
    moves: list[str] = []
    lines = description.splitlines()
    started = False
    for line in lines:
        s = line.strip()
        if not started:
            if re.search(r"how to do\s*:?\s*$", s, re.I) or re.search(
                    r"(we show and explain|during this class)", s, re.I):
                started = True
            continue
        if s.startswith("-") or s.startswith("•"):
            item = s.lstrip("-• ").strip()
            if item:
                moves.append(item)
        elif not s:
            if moves:
                break
        else:
            break
    return moves


def build_chapters(info: dict, segments: list[dict]) -> list[Chapter]:
    raw = info.get("chapters") or []
    duration = float(info.get("duration") or 0)
    chapters: list[Chapter] = []
    for i, ch in enumerate(raw, 1):
        start = float(ch.get("start_time") or 0)
        end = float(ch.get("end_time") or duration)
        title = (ch.get("title") or "").strip()
        role, camera, matched = classify(title)
        chapters.append(Chapter(i, title, start, end, role, matched, camera))

    # Attach transcript text per chapter, and measure how much counting is in it.
    for c in chapters:
        parts = [s["text"] for s in segments
                 if s["start"] < c.end and s["end"] > c.start]
        c.text = " ".join(parts).strip()
        words = c.text.split()
        c.count_density = (
            len(COUNT_TOKENS.findall(c.text)) / len(words) if words else 0.0)

    # Boundary sanity checks. These are hints for the judgement pass, not errors.
    for c in chapters:
        if c.role == "count" and c.count_density < 0.05:
            c.notes.append(
                f"SUSPECT: a 'count' chapter with almost no counting in it "
                f"(density {c.count_density:.1%}) — boundary may be wrong, or "
                f"Whisper dropped the count-along.")
        if c.role == "music" and c.count_density > 0.30:
            c.notes.append(
                f"NOTE: heavy counting ({c.count_density:.0%}) for a 'music' "
                f"chapter — the teachers are probably counting over the music, "
                f"so this is not a silent demo.")
        if c.role in {"count", "music"} and c.duration < 12:
            c.notes.append(
                f"SHORT: {c.duration:.0f}s — under the 23s floor set by the "
                f"official shorts. Usable, but say so in the clip caveat.")
        if not c.text:
            c.notes.append("NO TRANSCRIPT TEXT in this window.")
        if c.role == "UNKNOWN":
            c.notes.append(
                "UNRECOGNISED TITLE — do not assume a role. Add a pattern to "
                "ROLE_PATTERNS only after checking what the window contains.")
    return chapters


def render_class(num: int, video_id: str, title: str, *, verbose: bool) -> str:
    info = load_info(video_id)
    segments = load_segments(video_id)
    chapters = build_chapters(info, segments)
    duration = float(info.get("duration") or 0)
    moves = description_moves(info.get("description") or "")

    out: list[str] = []
    out.append(f"\n## Class {num} — {title}")
    out.append("")
    out.append(f"- **Video** `{video_id}` · {mmss(duration)} · "
               f"{len(chapters)} chapters · "
               f"{'NO OFFICIAL SHORT' if num in NO_SHORT_CLASSES else f'short `{SHORTS.get(num)}`'}")
    if not segments:
        out.append("- **NO TRANSCRIPT** — cue mining impossible for this class.")
    out.append(f"- **Moves, per the description**: "
               + (", ".join(f"`{m}`" for m in moves) if moves else "*(none listed)*"))
    if num in NO_SHORT_CLASSES:
        out.append("- ⚠ Both clips must be cut from the class itself (charter R2, "
                   "the shorts gap).")
    out.append("")
    out.append("| # | Role | Chapter | Start | End | Len | Count |")
    out.append("|---|---|---|---|---|---|---|")
    for c in chapters:
        out.append(
            f"| {c.index} | `{c.role}` | {c.title} | {mmss(c.start)} "
            f"({c.start:.1f}) | {mmss(c.end)} ({c.end:.1f}) | {c.duration:.0f}s "
            f"| {c.count_density:.0%} |")
    out.append("")

    flagged = [c for c in chapters if c.notes]
    if flagged:
        out.append("**Boundary checks**")
        out.append("")
        for c in flagged:
            for n in c.notes:
                out.append(f"- ch{c.index} “{c.title}” — {n}")
        out.append("")

    # Candidate clip windows: the money segments.
    counts = [c for c in chapters if c.role == "count"]
    musics = [c for c in chapters if c.role in {"music", "review"}]
    out.append("**Clip candidates** (slow ← `count`, fast ← `music`/short)")
    out.append("")
    if counts:
        for c in counts:
            out.append(f"- slow: ch{c.index} {c.start:.1f} → {c.end:.1f} "
                       f"({c.duration:.0f}s) “{c.title}”")
    else:
        out.append("- slow: **none** — no `count` chapter. Must be cut from a "
                   "`teach` window; say so in the caveat.")
    if num in SHORTS:
        out.append(f"- fast: official short `{SHORTS[num]}` (9/16 vertical)")
    for c in musics:
        out.append(f"- fast: ch{c.index} {c.start:.1f} → {c.end:.1f} "
                   f"({c.duration:.0f}s) “{c.title}” [{c.role}]")
    angles = [c for c in chapters if c.role == "angle"]
    if angles:
        out.append(f"- alternates only ({len(angles)} camera-angle chapters): "
                   + ", ".join(f"ch{c.index} {c.start:.1f}→{c.end:.1f}" for c in angles))
    out.append("")

    if verbose:
        out.append("**Transcript, by chapter** — the `teach` windows are where "
                   "lead cues live.")
        out.append("")
        for c in chapters:
            if c.role == "skip" or not c.text:
                continue
            out.append(f"<details><summary>ch{c.index} `{c.role}` "
                       f"{mmss(c.start)}–{mmss(c.end)} — {c.title}</summary>")
            out.append("")
            for s in segments:
                if s["start"] < c.end and s["end"] > c.start:
                    out.append(f"    {s['start']:>7.2f}  {s['text']}")
            out.append("")
            out.append("</details>")
            out.append("")
    return "\n".join(out)


def role_tally() -> str:
    tally: dict[str, int] = {}
    unknown: list[str] = []
    for num, vid, _ in COUPLES:
        info = load_info(vid)
        for ch in info.get("chapters") or []:
            role, _cam, _m = classify((ch.get("title") or "").strip())
            tally[role] = tally.get(role, 0) + 1
            if role == "UNKNOWN":
                unknown.append(f"Class {num}: {ch.get('title')!r}")
    lines = ["Role tally across all 21 classes:", ""]
    for role, n in sorted(tally.items(), key=lambda kv: -kv[1]):
        lines.append(f"  {role:<8} {n}")
    lines.append("")
    if unknown:
        lines.append(f"UNRECOGNISED TITLES ({len(unknown)}) — classify these "
                     f"before trusting any role:")
        lines += [f"  {u}" for u in unknown]
    else:
        lines.append("Every chapter title matched a known role pattern.")
    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--class", dest="only", type=int, help="one class, 1-21")
    ap.add_argument("--out", type=Path, help="write markdown here")
    ap.add_argument("--roles", action="store_true", help="role tally only")
    ap.add_argument("--quiet", action="store_true",
                    help="omit the per-chapter transcript dump")
    args = ap.parse_args()

    if args.roles:
        print(role_tally())
        return 0

    wanted = [c for c in COUPLES if args.only is None or c[0] == args.only]
    if not wanted:
        print(f"no such class: {args.only}", file=sys.stderr)
        return 1

    parts = ["# Cuban Salsa — Couples Course — chapter & transcript analysis",
             "",
             "Generated by `scripts/analyze_salsa_couples.py`. Chapters and the",
             "move lists are the teachers' own; roles are normalised from the",
             "chapter titles. Nothing here is a decision — see",
             "`SALSA_TAB_GOALS.md` for what the data has to become.",
             ""]
    for num, vid, title in wanted:
        parts.append(render_class(num, vid, title, verbose=not args.quiet))

    text = "\n".join(parts)
    if args.out:
        args.out.parent.mkdir(parents=True, exist_ok=True)
        args.out.write_text(text)
        print(f"wrote {args.out} ({len(text.splitlines())} lines)")
    else:
        print(text)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

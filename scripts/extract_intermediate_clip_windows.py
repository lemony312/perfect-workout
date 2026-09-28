"""
Extract the clip windows from the intermediate spec into a JSON table, and audit
them before anything is encoded.

Why extract rather than hand-copy into the clipper the way clip_salsa_couples.py
does: that course's 70 windows were written by one pass and transcribed once. This
course has ~90 windows spread over five spec files written by five different
agents, and hand-copying them would introduce a class of error the spec cannot
defend against — a digit typed wrong here still cuts a valid-looking clip, just of
the wrong moment, and nothing downstream would ever notice. Parsing the spec means
the numbers in the clipper are the spec's numbers by construction.

This does not re-derive anything. The boundaries are still the spec's, each one
anchored to a transcript event or an authored chapter mark; this only moves them.

The audit is the other half of the job, because several windows are not fit to cut
as written and that is invisible until the durations are lined up:

  * R2 wants roughly 23-47s. A 98s "slow" clip is a teaching block, not a demo
    loop, and a 6s one is not a loop either.
  * A boundary on a round number is the tell the brief calls out for a value that
    was chosen rather than found. Authored chapter marks are the legitimate
    exception — YouTube chapters really do land on whole seconds — so a round
    number is only reported when the anchor text does not cite a chapter.
  * Some windows say UNRESOLVED or placeholder outright.

Usage:
    uv run scripts/extract_intermediate_clip_windows.py            # write the JSON
    uv run scripts/extract_intermediate_clip_windows.py --audit    # report only
"""

# /// script
# requires-python = ">=3.12"
# dependencies = []
# ///

import argparse
import bisect
import functools
import json
import logging
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "SALSA_INTERMEDIATE_CLIP_WINDOWS.json"
INFO_DIR = REPO / "data" / "cache" / "salsa" / "info"
VIDEO_DIR = REPO / "data" / "cache" / "salsa" / "videos"
WHISPER_DIR = REPO / "data" / "cache" / "salsa" / "whisper"

# How close a boundary must be to a word timing to count as anchored to it. Word
# timings and clip boundaries are both given to the hundredth, so this is a rounding
# allowance, not a search radius: widen it and the check starts accepting boundaries
# that merely landed near a word.
ANCHOR_TOLERANCE = 0.06

# R2's target range for a demo loop, and the range the beginners course's own
# clips sit in. Outside it is not automatically wrong — several beginners clips are
# deliberately short and say so — but it must be a decision, not an accident.
MIN_GOOD = 18.0
MAX_GOOD = 52.0

log = logging.getLogger("extract_clip_windows")

# Populated in main() from the spec's segment-map tables. Module-level because the
# audit reads it per row and threading it through every call buys nothing.
SEGMENT_MAPS: dict[str, list[tuple[float, float, str, str]]] = {}

# Columns are located by header name, not by position. The five files use three
# different layouts — 8 columns starting at `Move`, 9 with a leading `#` index, and
# 7 with no `Move` column at all (the sequences, where the section heading names the
# move) — so a fixed-position parser reads two files and silently returns nothing
# for the other three, which is exactly what the first version of this did.
WANTED = ("move", "video", "in", "out", "len", "file", "trust", "anchors")


def clean(cell: str) -> str:
    return cell.strip().strip("*").strip("`").strip().strip("*").strip()


def number(cell: str) -> float | None:
    m = re.search(r"\d+(?:\.\d+)?", cell)
    return float(m.group(0)) if m else None


def durations() -> dict[str, float]:
    out = {}
    for p in INFO_DIR.glob("*.info.json"):
        try:
            data = json.loads(p.read_text())
        except json.JSONDecodeError:
            continue
        if (d := data.get("duration")) is not None:
            out[p.name.removesuffix(".info.json")] = float(d)
    return out


@functools.cache
def container_duration(video: str) -> float | None:
    """The precise duration of the downloaded file, via ffprobe.

    `.info.json` carries yt-dlp's `duration`, which is whole seconds. That is fine
    for "is this timestamp past the end of the video", but not for a clip boundary:
    ending a 38.47s short at 38.0 silently drops the last half second, which on a
    short is the final beat of the move. The beginners course's whole-short clips
    end on container values like 31.414 for exactly this reason.
    """
    path = VIDEO_DIR / f"{video}.mp4"
    if not path.exists():
        return None
    try:
        out = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=nw=1:nk=1", str(path)],
            capture_output=True, text=True, check=True).stdout.strip()
        return round(float(out), 3)
    except (subprocess.CalledProcessError, ValueError, FileNotFoundError):
        return None


@functools.cache
def speech_marks(video: str) -> tuple[float, ...]:
    """Every word and segment boundary in the transcript, sorted.

    Note the key names: Whisper words are stored as `{"w":, "s":, "e":}`, not
    `{"word":, "start":, "end":}`. Reading the long names silently yields nothing but
    segment boundaries, which makes a genuinely word-anchored corpus look almost
    entirely unanchored — a false alarm that costs more than the check saves.
    """
    path = WHISPER_DIR / f"{video}.json"
    if not path.exists():
        return ()
    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError:
        return ()
    marks: set[float] = set()
    for seg in data.get("segments") or []:
        for key in ("start", "end"):
            if seg.get(key) is not None:
                marks.add(round(float(seg[key]), 2))
        for word in seg.get("words") or []:
            for key in ("s", "e"):
                if word.get(key) is not None:
                    marks.add(round(float(word[key]), 2))
    return tuple(sorted(marks))


# A spoken count. Both languages, and the digits Whisper sometimes emits instead of
# words ("Malibu 3 Cuba Libre 7, 8, 1"). Anchored at both ends so "one" matches and
# "one important aspect" still matches on the bare word but "money" does not.
COUNT_WORD = re.compile(
    r"^(one|two|three|four|five|six|seven|eight"
    r"|uno|dos|tres|cuatro|cinco|seis|siete|ocho|[1-8])$", re.I)

# What it takes to call something a counted run: three counts inside this many
# seconds. One stray "one" is a figure of speech; three in a bar is a teacher
# counting a move in.
RUN_WINDOW = 3.0
RUN_COUNTS = 3

# Below this, a window is mostly music and has nothing to say — which is exactly what
# a full-tempo grain should look like, so it is exempt from the content check.
QUIET_WORDS = 25


@functools.cache
def transcript_words(video: str) -> tuple[tuple[float, str], ...]:
    """(start, word) for every timed word, sorted. Same `{"w":,"s":,"e":}` schema."""
    path = WHISPER_DIR / f"{video}.json"
    if not path.exists():
        return ()
    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError:
        return ()
    out: list[tuple[float, str]] = []
    for seg in data.get("segments") or []:
        for word in seg.get("words") or []:
            if word.get("s") is not None and word.get("w"):
                out.append((float(word["s"]), str(word["w"])))
    return tuple(sorted(out))


def counted_runs(video: str, start: float, end: float) -> list[float]:
    """When, inside the window, the teacher counts a bar in.

    This is the only check here that looks at what a window *contains* rather than
    where its edges sit, and it exists because word-anchoring turned out to be
    necessary but not sufficient. Four `fast` windows had both boundaries verified
    against real word timings and still held the teacher explaining knee bend or
    reciting the names of the drinks — a perfect grade A on a clip with no dancing
    in it. Every check upstream reads the spec's own claims about a boundary; this
    one asks whether the seconds between them are a demonstration.
    """
    counts = [t for t, w in transcript_words(video)
              if start <= t < end and COUNT_WORD.match(w.strip(" ,.!?¡¿-"))]
    return [t for t in counts
            if sum(1 for u in counts if t <= u <= t + RUN_WINDOW) >= RUN_COUNTS]


@functools.cache
def chapter_marks(video: str) -> frozenset[float]:
    """Authored chapter start/end times, which legitimately fall on whole seconds."""
    path = INFO_DIR / f"{video}.info.json"
    if not path.exists():
        return frozenset()
    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError:
        return frozenset()
    marks: set[float] = set()
    for ch in data.get("chapters") or []:
        marks.add(round(float(ch["start_time"]), 2))
        marks.add(round(float(ch["end_time"]), 2))
    return frozenset(marks)


def anchor_of(video: str, value: float, duration: float | None) -> str | None:
    """What `value` is anchored to — 'word', 'chapter', 'start', 'end' — or None.

    This is the check the rest of the audit cannot make. Every other rule here reads
    what the spec *says* about a boundary; this one asks the transcript whether the
    boundary is really there. It is the difference between a spec that claims its
    numbers are anchored and one that demonstrably is, and it found five boundaries
    whose anchors cell quoted a word at a timestamp where that word does not occur.
    """
    if value == 0.0:
        return "start"
    if duration is not None and abs(value - duration) < 1.5:
        return "end"
    if value in chapter_marks(video):
        return "chapter"
    marks = speech_marks(video)
    if marks:
        i = bisect.bisect_left(marks, value)
        for j in (i - 1, i, i + 1):
            if 0 <= j < len(marks) and abs(marks[j] - value) <= ANCHOR_TOLERANCE:
                return "word"
    return None


# A row of one of the spec's segment maps: `| `is11-count` | 426.52 | 580.28 |
# `count` | ... |`. These tables are the teachers' own structure for each class,
# and they are what says where the move is actually danced.
SEGMENT_ROW = re.compile(
    r"^\|\s*`?([a-z0-9-]+)`?\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|"
    r"\s*`?(teach|count|music|review|skip)`?\s*\|")

# Which segment role each grain belongs in. `slow` is the counted demo, `fast` is
# the one danced to music — that is the definition of the two grains, so a `fast`
# clip taken from a `count` block is not a full-tempo clip whatever its boundaries
# are anchored to.
ROLE_OF_GRAIN = {"slow": "count", "fast": "music"}


def segment_maps() -> dict[str, list[tuple[float, float, str, str]]]:
    """video id -> its segment map, from the spec's own tables.

    Parsed rather than restated for the same reason the clip windows are: these
    are the numbers the spec already committed to, and a second copy would drift.
    """
    maps: dict[str, list[tuple[float, float, str, str]]] = {}
    for path in sorted(REPO.glob("SALSA_INTERMEDIATE_SPEC_PART*.md")):
        video = None
        for line in path.read_text().splitlines():
            if mv := re.search(r"\*\*Video\*\*\s*`([A-Za-z0-9_-]{11})`", line):
                video = mv.group(1)
            if (m := SEGMENT_ROW.match(line.strip())) and video:
                maps.setdefault(video, []).append(
                    (float(m.group(2)), float(m.group(3)), m.group(4), m.group(1)))
    return maps


def grain_of(row: dict) -> str | None:
    """'slow' or 'fast', from the output filename.

    Deliberately not `row['tempo']`, which is read off the nearest `### Slow` /
    `### Fast` subheading and is wrong for the tables that use a leading `#`
    column instead of subheadings — there it silently inherits whatever heading
    came last, so Class 11's counted window reads as `fast`. The filename is the
    thing the encoder actually writes, so it cannot disagree with the output.
    """
    name = row.get("file") or ""
    if "-slow" in name:
        return "slow"
    if "-fast" in name:
        return "fast"
    return None


def parse_file(path: Path, video_durations: dict[str, float]
               ) -> tuple[list[dict], list[str]]:
    rows: list[dict] = []
    problems: list[str] = []
    cols: dict[str, int] = {}
    # The nearest heading, so a window can be traced back to its class or move —
    # and so `tempo` can be read off the `### Slow` / `### Fast` subheading, which
    # is where four of the five files put it rather than in a column.
    section = ""
    tempo = ""

    for lineno, line in enumerate(path.read_text().splitlines(), 1):
        if h := re.match(r"^#{1,3}\s+(.*)", line):
            title = h.group(1).strip()
            if re.match(r"^#{1,2}\s", line):
                section = title
            low = title.lower()
            if "slow" in low:
                tempo = "slow"
            elif "fast" in low or "full tempo" in low:
                tempo = "fast"
            continue

        if not line.strip().startswith("|"):
            cols = {}
            continue

        cells = [clean(c) for c in line.strip().strip("|").split("|")]
        lowered = [c.lower() for c in cells]
        if "in" in lowered and "out" in lowered and "file" in lowered:
            # Prefix match, not equality: PARTA titles the column "Anchors &
            # caveats". Requiring an exact "anchors" silently dropped that column,
            # and with it the check for windows that declare themselves unresolved —
            # a check that had been working and went quiet without failing.
            cols = {}
            for name in WANTED:
                for i, head in enumerate(lowered):
                    if head == name or head.startswith(name + " "):
                        cols[name] = i
                        break
            continue
        if not cols:
            continue
        if all(set(c) <= set("-: ") for c in cells):
            continue

        def cell(name: str) -> str:
            i = cols.get(name)
            return cells[i] if i is not None and i < len(cells) else ""

        video = cell("video")
        start, end = number(cell("in")), number(cell("out"))
        anchors = cell("anchors")

        # "0.0 -> [duration]" / "-> full" means the whole official short, which is
        # determinate from the cached metadata rather than unknown — the beginners
        # course resolved the same case the same way (its shorts end on values like
        # 31.414, straight off the container). Treating it as a parse failure would
        # discard a perfectly good window.
        resolved = False
        if end is None and re.search(r"\bdur|full|whole|end\b", cell("out"), re.I):
            dur = container_duration(video) or video_durations.get(video)
            if dur is not None:
                end, resolved = dur, True
            else:
                problems.append(f"{path.name}:{lineno}: whole-short window but no "
                                f"cached duration for {video!r}")
                continue

        if start is None or end is None:
            problems.append(f"{path.name}:{lineno}: could not read in/out from "
                            f"{cell('in')!r} / {cell('out')!r}")
            continue

        rows.append({
            "move": cell("move"),
            "video": video,
            "start": start,
            "end": end,
            "file": cell("file"),
            "trust": cell("trust").replace(" ", ""),
            "tempo": tempo,
            "section": section,
            "anchors": anchors,
            "end_from_metadata": resolved,
            "source": f"{path.name}:{lineno}",
        })
    return rows, problems


def audit(rows: list[dict],
          video_durations: dict[str, float]) -> tuple[list[str], list[str]]:
    """(problems, declared) — windows that must not be cut, and ones that say why.

    The split matters. A clip outside 18-52s is usually a teaching block that slipped
    through, but the four sequence videos chain several moves and one complete run
    genuinely cannot fit: cutting it to 52s would end mid-sequence, which is worse
    than a long clip. A window that states the overrun and its measured length is a
    decision; one that is merely long is a defect. Conflating them either blocks a
    correct window forever or trains the reader to ignore the report.
    """
    issues: list[str] = []
    declared: list[str] = []
    for r in rows:
        where = f"{r['source']}  {r['move']} {r['tempo'] or '?'}"
        length = round(r["end"] - r["start"], 2)

        if length <= 0:
            issues.append(f"{where}: out ({r['end']}) is not after in ({r['start']})")
            continue

        # Stated placeholders. These are honest of the agent and must still block a
        # cut: the brief asked for an unresolved gap to be declared rather than
        # guessed, and this is that declaration being honoured downstream.
        if re.search(r"UNRESOLVED|placeholder|needs video|approximate", r["anchors"],
                     re.I):
            issues.append(f"{where}: window declares itself unresolved — {length}s, "
                          f"{r['anchors'][:110]}")

        if not (MIN_GOOD <= length <= MAX_GOOD):
            if re.search(r"OVERRUN", r["anchors"]):
                declared.append(f"{where}: {length}s, over the {MAX_GOOD:.0f}s "
                                f"ceiling and declared — one complete run of the "
                                f"sequence does not fit")
            else:
                issues.append(f"{where}: {length}s is outside the {MIN_GOOD:.0f}-"
                              f"{MAX_GOOD:.0f}s demo range")

        # A round boundary is the tell for a chosen rather than found number — but
        # authored chapter marks genuinely land on whole seconds, so only flag it
        # when the row does not cite a chapter.
        cites_chapter = re.search(r"chapter", r["anchors"], re.I)
        for label, value in (("in", r["start"]), ("out", r["end"])):
            # An end read off the container is a found number by definition, even
            # when it happens to be round — flagging it would be flagging this
            # script's own output.
            if label == "out" and r["end_from_metadata"]:
                continue
            if value == round(value) and not cites_chapter and value != 0.0:
                issues.append(f"{where}: {label} {value} is a whole second with no "
                              f"chapter cited — anchored windows are given to the "
                              f"hundredth")

        if (dur := video_durations.get(r["video"])) is not None:
            if r["end"] > dur + 1:
                issues.append(f"{where}: out {r['end']} is past the end of "
                              f"{r['video']} ({dur:.0f}s)")
        elif r["video"]:
            issues.append(f"{where}: no cached metadata for video {r['video']!r}")

        # Is the boundary actually where the spec says it is? A window may sit in
        # music with no speech to anchor to — that is legitimate and normal for a
        # fast grain — but then it is a derived boundary and must be graded `D`.
        # Grading it `A` asserts a word anchor that is not there.
        if speech_marks(r["video"]):
            anchors = {lbl: anchor_of(r["video"], v, dur)
                       for lbl, v in (("in", r["start"]), ("out", r["end"]))}
            loose = [lbl for lbl, kind in anchors.items() if kind is None]
            claims_anchored = r["trust"].upper().startswith("A")
            if loose and claims_anchored:
                issues.append(
                    f"{where}: trust {r['trust']!r} claims both boundaries are "
                    f"anchored, but {' and '.join(loose)} "
                    f"({', '.join(str(r[{'in': 'start', 'out': 'end'}[l]]) for l in loose)}) "
                    f"matches no word, segment or chapter boundary — regrade to D or "
                    f"move it to a real anchor")
            elif loose:
                declared.append(f"{where}: {' and '.join(loose)} not anchored to any "
                                f"word or chapter, and graded {r['trust']!r} — a "
                                f"derived boundary, honestly labelled")

        # Does the window actually contain a demonstration? A talkative window that
        # never counts a bar is a teaching block, whatever its boundaries are
        # anchored to. A quiet one is music, which is what a fast grain should be.
        words = [w for t, w in transcript_words(r["video"]) if r["start"] <= t < r["end"]]
        if len(words) > QUIET_WORDS and not counted_runs(r["video"], r["start"], r["end"]):
            # NARRATED is not a way around the check, it is the answer to it for
            # this course. Measured across all fourteen int-steps music blocks,
            # every one runs 0.77-3.04 words/second: the teachers talk continuously
            # over the full-tempo pass, and they mark tempo with vocalised rhythm
            # ("king, cuckoo … and one", "ping ping pa") rather than by counting.
            # So "no counted bar" does not distinguish a lecture from a genuine
            # full-tempo run here, and demanding one would reject the good Mojito
            # window along with the bad ones. What separates them is which block
            # the window sits in and whether the move is named in it, and that is
            # the structural check below. A NARRATED window still carries the fact
            # into `SalsaClip.caveat`, which is rendered, never hidden.
            if re.search(r"NARRATED", r["anchors"]):
                declared.append(f"{where}: {len(words)} spoken words over the demo and "
                                f"declared — the teacher narrates every full-tempo "
                                f"pass in this course")
            else:
                issues.append(f"{where}: {len(words)} spoken words and not one counted "
                              f"bar — this window is explanation, not a demo run. If "
                              f"the move really is danced here under narration, say "
                              f"NARRATED in the anchors cell and why")

        # Is the window in the part of the class that grain comes from? This is a
        # different question from the one above and neither subsumes the other. A
        # window can be full of counting and still be the counted lesson rather
        # than the full-tempo run, and a window can sit correctly inside the music
        # block while the teacher talks over its first twenty seconds. The first
        # pass at fixing four lecture windows hit exactly this: told to find a
        # counted run, agents moved all four *out* of the music block into counted
        # teaching, which satisfied the content check and was still wrong.
        grain = grain_of(r)
        want = ROLE_OF_GRAIN.get(grain or "")
        segs = SEGMENT_MAPS.get(r["video"])
        if want and segs:
            mid = (r["start"] + r["end"]) / 2
            here = next((s for s in segs if s[0] <= mid < s[1]), None)
            target = [s for s in segs if s[2] == want]
            if not target:
                declared.append(f"{where}: no {want!r} segment exists in this class, "
                                f"so the {grain} grain cannot come from one")
            elif here is None or here[2] != want:
                found = f"{here[3]} ({here[2]})" if here else "no segment at all"
                spans = ", ".join(f"{s[0]:.2f}-{s[1]:.2f}" for s in target)
                issues.append(f"{where}: the {grain} grain sits in {found}, but this "
                              f"class's {want} block is {spans} — a {grain} clip taken "
                              f"from anywhere else is not a {grain} clip. Note the "
                              f"teacher usually talks over the first seconds of a "
                              f"music block, so the demo is later inside it")
    return issues, declared


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--audit", action="store_true", help="report only, write nothing")
    args = ap.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(message)s")

    files = sorted(REPO.glob("SALSA_INTERMEDIATE_SPEC_PART*.md"))
    if not files:
        log.error("no spec parts found in %s", REPO)
        return 1

    global SEGMENT_MAPS
    SEGMENT_MAPS = segment_maps()
    log.info("segment maps for %d videos, %d segments", len(SEGMENT_MAPS),
             sum(len(v) for v in SEGMENT_MAPS.values()))

    video_durations = durations()
    rows: list[dict] = []
    problems: list[str] = []
    for path in files:
        got, probs = parse_file(path, video_durations)
        rows += got
        problems += probs
        log.info("  %-40s %3d windows", path.name, len(got))

    issues, declared = audit(rows, video_durations)

    log.info("")
    log.info("%d windows across %d files", len(rows), len(files))
    # `grain_of`, not `r['tempo']`. The checks already use it; this summary did not,
    # and reported `?=12` for every row in a table that uses a leading `#` column
    # rather than `### Slow` / `### Fast` subheadings. Twelve unknown tempos in a
    # report whose job is to find problems reads as a problem, and it is not one —
    # so the summary and the checks now agree on where grain comes from.
    by_grain: dict[str, int] = {}
    for r in rows:
        by_grain[grain_of(r) or "?"] = by_grain.get(grain_of(r) or "?", 0) + 1
    log.info("   by grain: %s", ", ".join(f"{k}={v}" for k, v in sorted(by_grain.items())))
    lengths = sorted(round(r["end"] - r["start"], 1) for r in rows)
    if lengths:
        log.info("   lengths: min %.1fs, median %.1fs, max %.1fs",
                 lengths[0], lengths[len(lengths) // 2], lengths[-1])

    if problems:
        log.error("")
        log.error("PARSE PROBLEMS — %d:", len(problems))
        for p in problems:
            log.error("   %s", p)

    if declared:
        log.info("")
        log.info("DECLARED DEPARTURES — %d (stated in the spec, not defects):",
                 len(declared))
        for d in declared:
            log.info("   %s", d)

    if issues:
        log.warning("")
        log.warning("WINDOWS NEEDING WORK — %d:", len(issues))
        for i in issues:
            log.warning("   %s", i)

    if not args.audit:
        OUT.write_text(json.dumps(rows, indent=1) + "\n")
        log.info("")
        log.info("wrote %s (%d windows)", OUT.name, len(rows))

    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())

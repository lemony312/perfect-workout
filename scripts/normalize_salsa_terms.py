"""
Normalize Cuban salsa move names in the Whisper transcripts to the spellings
La Suerte themselves use, and flag anything that looks like a move name but
doesn't match the canonical index.

Why this is a separate pass from transcription: seeding `initial_prompt` with the
correct spellings (see transcribe_salsa.py) is not sufficient, because most of
these are *phonetic* mismatches rather than recognition failures. Spanish `h` is
silent, so "exhíbela" is pronounced [eksiBela] — Whisper hears it correctly and
writes "exibela", which is a faithful transcription of the sound and the wrong
spelling for our index. No prompt fixes that; a lookup does. Keeping it separate
also means the alias map can be tuned and re-run in seconds instead of
re-transcribing two hours of audio.

Verified against the 15-class steps course: "exibela" appears 9 times in Class 5
and the correct "exhibela" zero times, so without this pass the move taught by
that class would be unfindable by name — breaking SALSA_TAB_GOALS.md R1.

Canonical spellings come from the class titles and descriptions, which are the
channel's own written form and therefore authoritative (R1: we do not invent
terminology). Variants below were all observed in real transcript output; this is
not a guess-list.

Usage:
    uv run scripts/normalize_salsa_terms.py            # normalize every transcript
    uv run scripts/normalize_salsa_terms.py --report   # show what would change, write nothing

Reads  data/cache/salsa/whisper/<id>.json
Writes data/cache/salsa/whisper/<id>.norm.json   (+ .norm.txt for skimming)
"""

# /// script
# requires-python = ">=3.12"
# dependencies = []
# ///

import argparse
import difflib
import json
import logging
import re
import sys
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
WHISPER_DIR = REPO / "data" / "cache" / "salsa" / "whisper"

# canonical spelling -> variants Whisper actually produced.
# Keep the variant lists tight: a loose entry here silently rewrites the
# transcript, which is worse than leaving a term unmatched and flagged.
ALIASES: dict[str, list[str]] = {
    "Exhibela": ["exibela", "exhibla", "exhiba", "exibella", "zibela",
                 "exit below", "exhibit",
                 # Couples pass: the h is silent, so Whisper drops it and then
                 # guesses at the first syllable.
                 "exivela", "xibela", "exibala", "exiblas",
                 # Intermediate sequence ("with Exibola turn left hand goes
                 # down", ScbrkgnWV8s @162.4).
                 "exibola"],
    "Enchufla": ["chufla", "enchufa", "anchufla", "enchuffla", "choupla", "shufla",
                 # Couples pass. "chuflas" is the plural the teachers actually
                 # say ("two chuflas"), heard without the leading "en".
                 "enchuva", "enciufla", "chuflas", "chuffla",
                 # Intermediate: the full plural, said while stacking repeats
                 # ("enchuflas and one with kachan", FtsTDpd8ARA @615.2).
                 "enchuflas"],
    # Intermediate steps class 5 is "Charanga wave"; Whisper drops the initial
    # affricate ("saranga wave and go", I8a_F5iOXp8 @276.7).
    "Charanga": ["taranga", "charanaga", "saranga"],
    "Rumba": ["roomba", "rhumba"],
    "Guaguancó": ["wawanko", "guaguanco", "wawanco"],
    "Cubano": ["kubano"],
    "Setenta": ["cetenta", "satenta", "sententa", "sedenta"],
    "Guapea": ["guapear", "wapea", "guapéa",
               # Couples pass. Spanish "gu" is /gw/, hence "gwapea"; "guape"
               # is the word clipped short ("it ends with Guape again").
               "gwapea", "guatea", "guape",
               # Intermediate: masculine ending, in clear instruction
               # ("we go back to Guapeo", MRpIKs0iQD8 @99.6).
               "guapeo"],
    "Vacilala": ["vasilala", "bacilala",
                 # Couples pass. Spanish v is /b/, so v<->f<->b all appear.
                 # Bare "vacila" is the teachers' own shortening —
                 # "Vacila por la mano" @198.7 — and is safe because the
                 # pattern is \b-anchored and cannot match inside "vacilala".
                 "vacillala", "vacílala", "facilala", "vacila",
                 # Couples classes 7 and 14. This is the worst break in the
                 # corpus and the exact "exibela" failure again, but bigger:
                 # across the 36 transcripts the mangled forms occur 108 times
                 # and the correct "Vacilala" only 4, so without these the two
                 # Vacilala classes are unfindable by name (R1). Whisper hears
                 # the /b/ and then splits the word in every possible place.
                 #
                 # Only the move NAME is mapped, never "por la mano". That
                 # keeps the two distinct moves — Vacilala (class 14) and
                 # Vacilala por la mano (class 7) — apart for free: "Basila La
                 # Por La Mano" becomes "Vacilala por la mano" because the
                 # trailing words were already transcribed correctly. Mapping
                 # the full phrase separately would risk assigning one move's
                 # name to the other's.
                 #
                 # Ordering is handled by build_pattern's longest-first sort,
                 # which is load-bearing here: "basila la" must win over
                 # "basila". The remaining splits ("basilala" vs "basila") are
                 # safe regardless, because \b cannot match mid-word.
                 "basi la la", "basila la", "basi lala", "basilala",
                 "basila", "vasila"],
    # "somberro" is the r's transposed, in clear instruction ("1 2 like
    # somberro", X9Ad-ljIw-c @48.6).
    "Sombrero": ["sombrer", "tombrero", "somberro"],
    "Dile que no": ["dilekeno", "dile que non"],
    "Mambo Cubano": ["mambo kubano", "mambo cuban", "mamba cubano",
                     "manpo cubano", "mambo kumano"],
    "Paseala": ["pasa yala",
                # Couples pass. Class 12 is Paseala and mangles it every way.
                "pasala", "passala", "pansala", "passela", "baseala",
                # Intermediate "Paseala Complicado", both in clear instruction
                # ("We continue with Pasella Complicado" @59.5, "And
                # pastella, arm resting grip" @146.8, 7ugimJ0MFas).
                "pasella", "pastella"],
    # The move is "Setenta y Cuatro" and the teachers say it correctly, but
    # Whisper spells the number the Italian way throughout _L36hAcjsXg
    # ("The move for today is setenta y quattro" @27.2). Without this the move
    # is not findable by its own name (R1). Tight by construction: "quattro"
    # is never correct Spanish, so there is nothing else it could be.
    "Cuatro": ["quattro"],
    "basic side": ["basic sign"],
}

# Deliberately NOT aliased, from the couples-course near-miss report. Both look
# like obvious manglings and both are traps — each was checked in context first:
#
#   "cubana" -> Cubano.  It is NOT a mangling. Couples Class 17 teaches a move
#       called *Juana la Cubana*, and "cubana" is its correct feminine spelling
#       ("beginning till this point, Juana la Cubana should be very easy",
#       uoq2J1txSTE @39.40). Rewriting it would rename a real move.
#
#   "rueba" -> Rumba.  It is actually *Rueda* — the casino circle dance —
#       mis-heard: "very often it happens that in Rueba we can..." Rueda is a
#       separate playlist and explicitly out of scope (charter non-goals), so it
#       gets no alias in either direction.
#
# And four more from the intermediate near-miss report, same treatment — each was
# read in context before being rejected:
#
#   "cuba" -> Cubano.  The single most-reported near-miss (12 of the 41
#       transcripts) and entirely spurious. Intermediate steps class 1 teaches a
#       move called *Cuba Libre* ("This step is called Cuba Libre",
#       g0h32MDXV6Q @28.7), and the rest are the country and "Cuban salsa".
#       Aliasing it would rename a real move on twelve transcripts.
#
#   "kumba" -> Rumba.  Inside a vocalised-rhythm passage, not instruction: "And
#       turn and king king. And turn and king king. ... And finish and kumba."
#       (MRpIKs0iQD8 @1.3). "king king" is Whisper on a count-along, so nothing
#       in that sentence is evidence of a word. One occurrence.
#
#   "rumbe" -> Rumba.  A speculative aside, and probably "rumbeando" rather than
#       the bare noun: "I think it's a rumbe ando" (j3O7xmKbaAE @60.3). The
#       teachers are guessing at the music, not naming a move. One occurrence.
#
#   "setantai" -> Setenta.  "setantai 4-hop", inside the same kind of count-along
#       mush ("chick chick pa and chick chick pull", _L36hAcjsXg @~200). It is
#       "setenta y cuatro" said at speed, and the move is already findable from
#       the eight clear instructional mentions in that video, so rewriting a
#       garbled rhythm passage buys nothing and risks a wrong phrase.
#
# Deliberately NOT aliased: "3 to 1" / "3 2 1" / "three to one" for the move
# "Three, Two, One" (steps Class 8). Those strings are also literal counting,
# which the teachers do constantly, so the variant list could not be kept tight
# and the rewrite would corrupt every count-along passage in the corpus. Class 8
# is findable via its English name, so nothing is lost by leaving it alone.

# Terms that are correct as-is; used only to skip them in the near-miss scan so
# it doesn't flag a word for being similar to a term that is already right.
# "cuban" and "cano" are here because they are ordinary words the teachers use
# ("Cuban salsa", "...cano"), not manglings of "Cubano" — without them the scan
# reports a false positive on every single transcript.
KNOWN_GOOD = {
    "enchufla", "exhibela", "charanga", "rumba", "setenta", "guapea", "vacilala",
    "sombrero", "cubano", "mambo", "alarde", "casino", "kentucky", "tiramisu",
    "dedo", "santiago", "paseala", "guaguancó", "timba", "rueda", "son",
    "cuban", "cano",
    # Correct as written: the feminine in "Juana la Cubana" (couples Class 17).
    # Without this the scan reports it against "Cubano" on five transcripts
    # forever, and a report that is never clean stops being read.
    "cubana", "juana",
    # Same reasoning, intermediate pass: "Cuba" is both the country and half of
    # the move "Cuba Libre" (steps class 1), and it was being reported against
    # "Cubano" on twelve of the 41 transcripts. "cuatro" is now canonical, so it
    # must be skipped too or it reports against itself.
    "cuba", "libre", "cuatro",
}

# Near-misses that have been read in context and rejected, with the reason in one
# line. Kept out of the actionable report but NOT put in KNOWN_GOOD, because these
# spellings are not correct — they are garbled, we have simply decided that
# rewriting them would do more harm than leaving them. The long-form reasoning for
# each is in the "Deliberately NOT aliased" block above.
#
# The point of this set is that the report stays empty until something genuinely
# new appears. A report that always has the same four lines in it stops being read,
# and then the fifth line gets missed.
REJECTED: dict[str, str] = {
    "rueba": "is Rueda, a different dance and out of scope",
    "cubana": "correct feminine in 'Juana la Cubana'",
    "cuba": "the country, and half of the move 'Cuba Libre'",
    "kumba": "inside a count-along, no word is evidence there",
    "rumbe": "a speculative aside, probably 'rumbeando'",
    "setantai": "'setenta y cuatro' at speed, inside a count-along",
}

log = logging.getLogger("normalize_salsa_terms")


def build_pattern() -> tuple[re.Pattern, dict[str, str]]:
    """One alternation over every variant, longest-first so 'mambo kubano' wins
    over the bare 'kubano' that would otherwise match inside it."""
    lookup = {v: canon for canon, variants in ALIASES.items() for v in variants}
    variants = sorted(lookup, key=len, reverse=True)
    pattern = re.compile(r"\b(" + "|".join(re.escape(v) for v in variants) + r")\b", re.I)
    return pattern, lookup


def normalize_text(text: str, pattern: re.Pattern, lookup: dict[str, str],
                   counter: Counter) -> str:
    def sub(m: re.Match) -> str:
        canon = lookup[m.group(1).lower()]
        counter[f"{m.group(1).lower()} -> {canon}"] += 1
        return canon

    return pattern.sub(sub, text)


def near_misses(text: str) -> dict[str, list[str]]:
    """Words that resemble a canonical term but matched no alias — i.e. spellings
    we have not accounted for yet. These are reported, never auto-rewritten."""
    words = set(re.findall(r"[A-Za-zÀ-ÿ']{4,}", text.lower()))
    known_variants = {v for vs in ALIASES.values() for v in vs}
    found: dict[str, list[str]] = {}
    for canon in ALIASES:
        target = canon.lower()
        hits = [
            w for w in words
            if w != target
            and w not in KNOWN_GOOD
            and w not in REJECTED
            and w not in known_variants
            and difflib.SequenceMatcher(None, target, w).ratio() > 0.78
        ]
        if hits:
            found[canon] = sorted(hits)
    return found


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--report", action="store_true", help="show changes, write nothing")
    args = ap.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(message)s")

    sources = sorted(p for p in WHISPER_DIR.glob("*.json") if not p.name.endswith(".norm.json"))
    if not sources:
        log.error("no transcripts in %s — run transcribe_salsa.py first", WHISPER_DIR)
        return 1

    pattern, lookup = build_pattern()
    total: Counter = Counter()
    flagged: dict[str, dict[str, list[str]]] = {}

    for src in sources:
        data = json.loads(src.read_text())
        counter: Counter = Counter()

        for seg in data["segments"]:
            seg["text"] = normalize_text(seg["text"], pattern, lookup, counter)
            for w in seg["words"]:
                w["w"] = normalize_text(w["w"], pattern, lookup, Counter())
        data["text"] = normalize_text(data["text"], pattern, lookup, Counter())

        misses = near_misses(data["text"])
        if misses:
            flagged[src.stem] = misses

        label = data.get("label", src.stem)
        if counter:
            log.info("%s (class %s): %s", src.stem, label,
                     ", ".join(f"{k} x{v}" for k, v in counter.most_common()))
        total.update(counter)

        if not args.report:
            data["normalized"] = True
            out = src.with_suffix(".norm.json")
            out.write_text(json.dumps(data, indent=1, ensure_ascii=False))
            out.with_suffix(".txt").write_text(
                "\n".join(f'{s["start"]:8.2f}  {s["text"]}' for s in data["segments"]) + "\n"
            )

    log.info("")
    log.info("TOTAL substitutions: %d across %d transcripts", sum(total.values()), len(sources))
    for k, v in total.most_common():
        log.info("   %-28s x%d", k, v)

    if flagged:
        log.info("")
        log.info("UNMATCHED near-misses — review and add to ALIASES if real:")
        for vid, misses in flagged.items():
            for canon, hits in misses.items():
                log.info("   %s  %s <- %s", vid, canon, hits)
    else:
        log.info("")
        log.info("No unmatched near-misses.")

    # Stated, not hidden. Suppressing these from the actionable list is what keeps
    # the list worth reading, but a silent filter would eventually be forgotten and
    # then look like the scan had gone blind.
    log.info("(%d near-miss spelling(s) suppressed as already-reviewed; see "
             "REJECTED in this file)", len(REJECTED))

    return 0


if __name__ == "__main__":
    sys.exit(main())

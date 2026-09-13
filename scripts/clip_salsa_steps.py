"""
Cut the demo clips for the Beginners Cuban Salsa Steps Course.

Source: La Suerte Dance School "Beginners Cuban Salsa Steps Course" playlist
(PL8hFYIpg2Jp1XK-ADBSd0B78_KgkdckYH, 15 classes). All 15 source videos are at
data/cache/salsa/videos/<VIDEO_ID>.mp4, already h264/aac 1280x720 30fps.

Every window in this script comes from SALSA_STEPS_BUILD_SPEC.md §3, which
records the exact in/out seconds, the transcript event each boundary is anchored
to, and the trust grade. The spec deliberately corrected several windows from
the outlines' first pass — do not re-derive them.

Encode settings are identical to the posture script EXCEPT that audio is kept:
the spoken count in these clips is the whole point, so `-c:a aac -b:a 128k` is
used instead of `-an`. The posture page mutes its clips and plays background
music; the salsa page keeps clip audio as the metronome.

Usage:
    uv run scripts/clip_salsa_steps.py --review    # -> data/review/salsa/ + index.html
    uv run scripts/clip_salsa_steps.py             # -> frontend/public/clips/salsa/moves/
    uv run scripts/clip_salsa_steps.py --only quick-5
"""
# /// script
# dependencies = []
# ///

import argparse
import html
import logging
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

PROJECT_ROOT = Path("/Users/louis.boguslav/Documents/perfect-workout")
VIDEOS_DIR = PROJECT_ROOT / "data" / "cache" / "salsa" / "videos"
PUBLISH_DIR = PROJECT_ROOT / "frontend" / "public" / "clips" / "salsa" / "moves"
CLASS_CLIP_DIR = PROJECT_ROOT / "frontend" / "public" / "clips" / "salsa"
REVIEW_DIR = PROJECT_ROOT / "data" / "review" / "salsa"

# Match the encode settings used for the posture clips, but KEEP audio.
VIDEO_CODEC = "libx264"
VIDEO_PRESET = "fast"
VIDEO_CRF = 23
# CRITICAL: Do NOT pass -an. The spoken count is the whole point of a salsa clip.
# The posture script drops audio because that page mutes clips; here we keep it.
AUDIO_CODEC = "aac"
AUDIO_BITRATE = "128k"

# Loudness-normalise to a common target. Measured on the first cut of these
# clips, the `slow` windows (voice only — the teachers counting over a quiet
# room) peaked around -14 dBFS while the `fast` windows (music underneath) hit
# -0.6, a ~14 dB mismatch. That breaks the page two ways: the counted demo is
# the one you most need to hear from across the room while dancing, and it is
# the quieter of the pair; and the default player mode plays slow then fast
# back-to-back, so the swap lands as a jump in volume.
#
# EBU R128 via a single loudnorm pass. -16 LUFS is the usual target for spoken
# content and leaves TP headroom so the aac encoder doesn't clip.
AUDIO_FILTER = "loudnorm=I=-16:TP=-1.5:LRA=11"

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")


@dataclass
class Clip:
    slug: str
    name: str
    video_id: str
    start: float
    end: float
    tempo: str  # 'slow' or 'fast'
    class_num: int
    trust: str  # 'A', 'D', or 'V'
    move: str = ""
    notes: str = ""
    caveat: str = ""
    alternate_for: str = ""
    shared: bool = False
    is_class_clip: bool = False

    @property
    def duration(self) -> float:
        return round(self.end - self.start, 1)

    @property
    def source_path(self) -> Path:
        return VIDEOS_DIR / f"{self.video_id}.mp4"

    @property
    def output_filename(self) -> str:
        if self.is_class_clip:
            return "warm-up-review.mp4"
        return f"{self.slug}.mp4"


# §3.1 Slow clips (counted demo, no music)
CLIPS: list[Clip] = [
    Clip(slug="basic-side-slow", name="Basic to the side", video_id="Bah_PB9Ga4A",
         start=137.6, end=166.4, tempo="slow", class_num=1, trust="D", move="basic-side",
         notes="Anchored @137.58 'so five six seven left cheeky cheeky left…'; both halves, spoken rhythm."),
    Clip(slug="basic-front-and-back-slow", name="Basic front and back", video_id="Bah_PB9Ga4A",
         start=250.9, end=272.4, tempo="slow", class_num=1, trust="D", move="basic-front-and-back",
         notes="Anchored @250.94 'front, back together, and back, front together'."),
    Clip(slug="right-turn-side-slow", name="Right turn (from the basic side)", video_id="4qMJzwT6xPM",
         start=187.8, end=211.6, tempo="slow", class_num=2, trust="D", move="right-turn-side",
         notes="Cue @185.82 'Let's try to do it slowly together'; ends before the 213.4 teach boundary."),
    Clip(slug="left-turn-side-slow", name="Left turn (from the basic side)", video_id="4qMJzwT6xPM",
         start=241.2, end=280.1, tempo="slow", class_num=2, trust="A", move="left-turn-side",
         notes="Anchored @241.18 '5, 6, 7, cheeky, cheeky, left' → the 280.1 teach boundary. Longest slow clip; inside R2's 23–47s band."),
    Clip(slug="right-turn-front-back-slow", name="Right turn (from the basic front and back)", video_id="4qMJzwT6xPM",
         start=341.1, end=365.4, tempo="slow", class_num=2, trust="D", move="right-turn-front-back",
         notes="Anchored to the 341.08 segment end (@337.0 'okay, let's travel front and back')."),
    Clip(slug="hook-turn-slow", name="Hook turn", video_id="FUB6hqwNo0o",
         start=83.0, end=99.1, tempo="slow", class_num=3, trust="V", move="hook-turn",
         notes="Shortest clip in the set. Anchored @81.24 'Let's do one, two, three and then hook turn' → cue @99.08. Under the 23s reference floor; extend by eye toward 105.0 if a longer loop is wanted, but do not pad blind."),
    Clip(slug="double-right-turn-slow", name="Double right turn", video_id="FUB6hqwNo0o",
         start=149.5, end=176.8, tempo="slow", class_num=3, trust="A", move="double-right-turn",
         notes="Anchored @149.48 '…double, right turn, watch us slowly'."),
    Clip(slug="enchufla-slow", name="Enchufla", video_id="seH4eLK_S6o",
         start=83.3, end=100.5, tempo="slow", class_num=4, trust="V", move="enchufla",
         notes="Anchored @83.32 'And again, back, front and open…'. 17.2s, under the floor. Alternate: 120.6→149.6."),
    Clip(slug="left-turn-front-back-slow", name="Left turn (from the basic front and back)", video_id="seH4eLK_S6o",
         start=217.2, end=245.0, tempo="slow", class_num=4, trust="A", move="left-turn-front-back",
         notes="Anchored @217.16 '1, 2, 3, with numbers, hop, left, turn' → 244.90 segment end."),
    Clip(slug="exhibela-crossing-slow", name="Exhibela crossing", video_id="WMgTtp-CRaQ",
         start=78.2, end=102.6, tempo="slow", class_num=5, trust="A", move="exhibela-crossing",
         notes="Anchored @78.04 'Let's do it. 5, 6, 7, go.' Footwork only, before the arms are added — the cleanest look at the crossing."),
    Clip(slug="basic-body-movement-slow", name="Basic body movement", video_id="U454lXjpKi8",
         start=645.6, end=668.7, tempo="slow", class_num=6, trust="D", move="basic-body-movement",
         notes="Cue @639.72 'all basic steps, front and back, arms, ribcage, hips, and knees' — all four layers at once."),
    Clip(slug="mambo-cubano-slow", name="Mambo Cubano", video_id="FNuS26xguaI",
         start=306.6, end=335.3, tempo="slow", class_num=7, trust="A", move="mambo-cubano",
         notes="The 306.56–335.30 count run (@305.74 'Let's do our step'). With arms and styling."),
    Clip(slug="three-two-one-slow", name="Three, Two, One", video_id="E8Y7VwC4ODY",
         start=152.0, end=187.1, tempo="slow", class_num=8, trust="A", move="three-two-one",
         notes="@146.70 'okay very slowly but fluently' → cue @187.10. Best count window in the course."),
    Clip(slug="tapping-slow", name="Tapping", video_id="k4H5m9hJ_nA",
         start=133.8, end=158.6, tempo="slow", class_num=9, trust="A", move="tapping",
         notes="Tap added to the side basic → cue @158.58. Contains @140.14 'and suddenly this step looks a lot more Latin' — the point of the class."),
    Clip(slug="tapping-on-8-slow", name="Tapping on 8", video_id="nOABL5GW_qk",
         start=61.9, end=95.1, tempo="slow", class_num=10, trust="A", move="tapping-on-8",
         notes="@60.06 'I'll start from basic' and @78.16 'And we can loop it. Tap, step, open, close.' → cue @95.10. Cleanest count window in the course."),
    Clip(slug="cross-front-and-back-slow", name="Cross front and back", video_id="8b0zqIk1AHE",
         start=74.4, end=97.2, tempo="slow", class_num=11, trust="A", move="cross-front-and-back",
         notes="Anchored @74.40 → the 97.18 teach boundary."),
    Clip(slug="cross-and-slide-slow", name="Cross and slide", video_id="8b0zqIk1AHE",
         start=126.4, end=150.7, tempo="slow", class_num=11, trust="A", move="cross-and-slide",
         notes="Anchored @126.38 '1, 2, 3 and tap together, open, close and tap'."),
    Clip(slug="cross-slide-cha-cha-cha-slow", name="Cross, slide, cha cha cha", video_id="8b0zqIk1AHE",
         start=246.0, end=272.5, tempo="slow", class_num=11, trust="A", move="cross-slide-cha-cha-cha",
         notes="Anchored @246.04 'now triple step cha-cha-cha…' → the 272.5 boundary."),
    Clip(slug="charanga-slow", name="Charanga", video_id="Gy8jEBggrLc",
         start=189.5, end=210.3, tempo="slow", class_num=12, trust="A", move="charanga",
         notes="Anchored @189.54 → @210.30 (the clap instruction). Open-close pattern clearly visible."),
    Clip(slug="step-in-a-spot-slow", name="Step in a spot", video_id="Gy8jEBggrLc",
         start=62.9, end=93.3, tempo="slow", class_num=12, trust="A", move="step-in-a-spot",
         notes="Anchored @62.86 'let's think about feet…' → @93.28. Feet only, before the upper body is added."),
    Clip(slug="cuban-rumba-basic-slow", name="Cuban Rumba Basic", video_id="ZArlfy9EakM",
         start=344.2, end=368.0, tempo="slow", class_num=13, trust="D", move="cuban-rumba-basic",
         notes="@340.26 'let's try to combine it with salsa step one more time'. The salsa→rumba→salsa transition — more useful than the isolated basic, because the entry is the hard part."),
    Clip(slug="quick-5-slow", name="Quick 5", video_id="tlUegbWymak",
         start=145.4, end=188.3, tempo="slow", class_num=14, trust="A", move="quick-5",
         notes="Anchored @145.40 'Five, six, a bit faster'. The step run repeated while the tempo is raised — the tempo contrast is Quick 5, and you can hear it happen."),
    # §3.2 Fast clips (full tempo, with music)
    Clip(slug="basic-side-fast", name="Basic to the side", video_id="Bah_PB9Ga4A",
         start=414.2, end=448.7, tempo="fast", class_num=1, trust="V", move="basic-side",
         notes="Corrected from the outlines' 412.0→448.0. Word timings show the teacher is still talking at 412.0 ('…put it in slower motion') and counting in at 410.2–413.9; the dancing run is 414.2 ('3 5 6 7 1 2 3…') to 437.1, then 'basic side' is explicitly re-called @437.8 and the front-and-back begins @448.76.",
         caveat="The first ~23s is not verbally identified as side vs front — verify by eye."),
    Clip(slug="basic-front-and-back-fast", name="Basic front and back", video_id="Bah_PB9Ga4A",
         start=448.8, end=460.6, tempo="fast", class_num=1, trust="V", move="basic-front-and-back",
         notes="Corrected from the outlines' 448.8→485.1. Word timings: 'let's go front with a left hop' @448.76, then 'and basic side' @~458 and the 460.60–485.10 segment is all side basic ('cheeky cheeky left, and cheeky cheeky right'). Class 1's music block only spends ~12s on the front-and-back basic.",
         caveat="Ship the 11.8s clip with a caveat, set complete: true (all three grains exist), and log a follow-up to extend by eye if the dancers are in fact still travelling front-and-back after 460.6. Do not stretch the window on the transcript's evidence — it says the opposite."),
    Clip(slug="right-turn-side-fast", name="Right turn (from the basic side)", video_id="4qMJzwT6xPM",
         start=371.3, end=400.0, tempo="fast", class_num=2, trust="A", move="right-turn-side",
         notes="Dancing from @371.26. Word-anchored calls: 'right turn' @381.26, 'left turn' @386.42, 'right turn' @394.96."),
    # Shared clip: left-turn-side reuses right-turn-side-fast.mp4
    Clip(slug="right-turn-side-fast", name="Left turn (from the basic side)", video_id="4qMJzwT6xPM",
         start=371.3, end=400.0, tempo="fast", class_num=2, trust="A", move="left-turn-side",
         shared=True,
         notes="Shared file, marked shared: true. The left turn is called at 386.42 and again at 400.16, so no contiguous left-turn-only window exists inside the music review. Reusing the class-2 window with the label 'Class 2 music review — side basic, right turn @9.9s, left turn @15.1s into the clip' is honest; inventing a window would not be."),
    Clip(slug="right-turn-front-back-fast", name="Right turn (from the basic front and back)", video_id="4qMJzwT6xPM",
         start=409.1, end=442.9, tempo="fast", class_num=2, trust="A", move="right-turn-front-back",
         notes="New window; the outlines only said '(within 371.3 → 452.7)'. Resolved from word-level timings in 4qMJzwT6xPM.norm.json: 'front and back, let's start forward' @409.08–411.06, two plain front-and-back basics (411.4, 416.1), then three right turns from it — 'and right, turn, go' @419.80 with the foot count 'left right left right back six seven one' @421.5–424.9, 'right turn, go and hop' @426.40, 'right turn, one more time, let's go' @436.04 — then 'basic side' @442.90 ends it. Start 409.1 and end 442.9 are both word-anchored."),
    Clip(slug="hook-turn-fast", name="Hook turn", video_id="FUB6hqwNo0o",
         start=264.9, end=296.6, tempo="fast", class_num=3, trust="A", move="hook-turn",
         notes="Three hook turns: @264.86 'And hook, turn, 1, cross, right, left, front', @273.96 'The same again, hook turn', 'hook turn again'; ends at the 296.56 'double right turn' call."),
    Clip(slug="double-right-turn-fast", name="Double right turn", video_id="FUB6hqwNo0o",
         start=296.6, end=316.9, tempo="fast", class_num=3, trust="A", move="double-right-turn",
         notes="Called by name @296.56 and @306.46; ends @316.90 ('5 6 7 and small review')."),
    Clip(slug="enchufla-fast", name="Enchufla", video_id="seH4eLK_S6o",
         start=274.4, end=301.9, tempo="fast", class_num=4, trust="A", move="enchufla",
         notes="The 274.40–301.88 segment is exactly the Enchufla block ('and Enchufla rotate back, with left back, back cheeky cheek…'). End trimmed from the outlines' 302.0 to the 301.88 segment boundary."),
    Clip(slug="left-turn-front-back-fast", name="Left turn (from the basic front and back)", video_id="seH4eLK_S6o",
         start=309.8, end=335.1, tempo="fast", class_num=4, trust="A", move="left-turn-front-back",
         notes="Anchored @309.80 'and front and back we go one and left turn hop'; three left turns (@319.40, @329.40); end pulled back from 336.3 to 335.1, because @335.14 is 'and now a bit of combos' and @336.26 is 'double right turn'."),
    Clip(slug="exhibela-crossing-fast", name="Exhibela crossing", video_id="WMgTtp-CRaQ",
         start=226.4, end=255.4, tempo="fast", class_num=5, trust="A", move="exhibela-crossing",
         notes="The 226.36–255.36 segment is the Exhibela block, called by name twice."),
    Clip(slug="basic-body-movement-fast", name="Basic body movement", video_id="U454lXjpKi8",
         start=678.9, end=720.0, tempo="fast", class_num=6, trust="V", move="basic-body-movement",
         notes="Start moved to the first dancing segment @678.94 (from the outlines' 683.2); end 720.0 sits before 'And front and back, let's go' @721.04.",
         caveat="Two caveats: (i) the music here is deliberately slow — @674.52 'with slow music so you can have a clear view for what is happen with our bodies' — so label this clip 'With music (slow, by the teachers' choice)', not 'Full tempo'; (ii) the teacher talks over it from 686.7 to 696.3."),
    Clip(slug="mambo-cubano-fast", name="Mambo Cubano", video_id="FNuS26xguaI",
         start=372.0, end=400.0, tempo="fast", class_num=7, trust="A", move="mambo-cubano",
         notes="Called by name @383.34 and @392.76; last mambo rep ends 399.38 and 'Right turn, only one' starts 402.42, so the 400.0 end lands cleanly in the gap. Announced as 156 BPM (@337.12) — see G1."),
    Clip(slug="three-two-one-fast", name="Three, Two, One", video_id="E8Y7VwC4ODY",
         start=410.1, end=434.9, tempo="fast", class_num=8, trust="V", move="three-two-one",
         notes="Do not extend the start earlier than 410.1. Whisper hallucinated a repetition loop from 387.7 to 410.08 (the phrase 'one and 3 to 1.' ~18 times, several segments with start == end == 410.00), so the music block's true start is unrecoverable from the transcript; the safe interval is 380.10 (last real speech) → 410.10 (first real call).",
         caveat="The teacher counts the steps aloud over the music, so this is not a silent demo; the final ~1s begins the next call ('…and one Exhibela')."),
    Clip(slug="tapping-fast", name="Tapping", video_id="k4H5m9hJ_nA",
         start=374.9, end=396.6, tempo="fast", class_num=9, trust="A", move="tapping",
         notes="@374.88 'Five, six, seven, and one' → @377.44 'And start tapping'; ends at the 396.60 'right turn' call. Shows the basic without tap, then with."),
    Clip(slug="tapping-on-8-fast", name="Tapping on 8", video_id="nOABL5GW_qk",
         start=158.7, end=189.3, tempo="fast", class_num=10, trust="A", move="tapping-on-8",
         notes="Anchored @158.68 'front and back and tapping on eight'; called again @166.30 and @179.90; ends at the 189.32 segment boundary."),
    Clip(slug="cross-front-and-back-fast", name="Cross front and back", video_id="8b0zqIk1AHE",
         start=293.0, end=310.2, tempo="fast", class_num=11, trust="V", move="cross-front-and-back",
         notes="Corrected from the outlines' 293.0→325.1. From 310.18 the teachers switch to cross and slide ('cross front and back, let's go, with the left, hop and slide'), which contaminates a plain-cross demo. 293.0–310.2 is pure 'just cross' reps. 17.2s, under the 23s floor — accepted, because a clean 17s loop beats a 32s loop of the wrong move."),
    Clip(slug="cross-and-slide-fast", name="Cross and slide", video_id="8b0zqIk1AHE",
         start=310.2, end=334.8, tempo="fast", class_num=11, trust="A", move="cross-and-slide",
         notes="New exact window; the outlines only said '(within 310.2 → 334.8)'. Resolved from the transcript: start anchored to the verbatim call at 310.18 'cross front and back, let's go, with the left, hop and slide'; the slide reps run through 317.02–324.88; end 334.80 is the segment boundary, and the next segment @337.30 is the cha-cha-cha variant.",
         caveat="The last ~9s drifts back to the plain front-and-back basic ('and front and back, six, seven, one')."),
    Clip(slug="cross-slide-cha-cha-cha-fast", name="Cross, slide, cha cha cha", video_id="8b0zqIk1AHE",
         start=337.3, end=357.1, tempo="fast", class_num=11, trust="A", move="cross-slide-cha-cha-cha",
         notes="Anchored @337.30 'and one more time cross and slide boom one six seven and cha-cha-cha' → 357.08, where 'left turn double right Exhibela' begins. 19.8s."),
    Clip(slug="charanga-fast", name="Charanga", video_id="Gy8jEBggrLc",
         start=294.8, end=318.7, tempo="fast", class_num=12, trust="V", move="charanga",
         notes="Anchored @294.84 'and charanga, side and clap, five, six, seven and one, charanga'.",
         caveat="From ~305 the teacher starts explaining the Mambo Cubano combination while dancing it (@312.74 'So Mambo Cubano, hop, and Charanga') — which is genuinely useful, but it is not 24s of plain Charanga."),
    Clip(slug="step-in-a-spot-fast", name="Step in a spot", video_id="Gy8jEBggrLc",
         start=268.5, end=294.8, tempo="fast", class_num=12, trust="A", move="step-in-a-spot",
         notes="Anchored @268.48 'Tiki Tiki right and Tiki Tiki left and spot spot spot'; called again @~281 ('and spot again'); ends where Charanga starts @294.84.",
         caveat="The first ~3s is still the side basic."),
    Clip(slug="cuban-rumba-basic-fast", name="Cuban Rumba Basic", video_id="ZArlfy9EakM",
         start=389.7, end=424.5, tempo="fast", class_num=13, trust="A", move="cuban-rumba-basic",
         notes="Start corrected from the outlines' 394.1, which falls mid-phrase. 389.66 is the segment start 'And front and back, six, seven' — the entry call — then 'Rumba' @399.26, 'And front' @407.90, 'Rumba' @413.16, 'And salsa, hop and one' @422.40, ending 424.50. Shows salsa→rumba→salsa→rumba→salsa, which is the useful thing."),
    Clip(slug="quick-5-fast", name="Quick 5", video_id="tlUegbWymak",
         start=351.0, end=382.0, tempo="fast", class_num=14, trust="V", move="quick-5",
         notes="Anchored @350.98; 'Quick 5' called @363.46, @371.60, @378.72; end pulled to the 381.96 segment boundary, before 'Left turn' @384.86.",
         caveat="Class 14's music is announced only as 'slow tempo' with no BPM (@346.20), and @488.06 the teacher says 'Rumba feels very slow with this music' — so this 'fast' clip is slower than Class 7's. Do not infer a BPM."),
    # §3.3 Class 15 — class-level clip
    Clip(slug="warm-up-review", name="Salsa warm-up (Class 15)", video_id="qD6Vp3qj48o",
         start=14.8, end=52.3, tempo="fast", class_num=15, trust="A", is_class_clip=True,
         notes="Basic side → right turn → left turn → front → left turn → double right turn → Exhibela, each called by name."),
]

# §3.5 Alternates — cut for review, not published
ALTERNATES: list[Clip] = [
    Clip(slug="basic-side-slow-alt", name="Basic to the side (alternate)", video_id="Bah_PB9Ga4A",
         start=183.3, end=201.9, tempo="slow", class_num=1, trust="D", move="basic-side",
         alternate_for="basic-side-slow",
         notes="Same step with numbers spoken on top."),
    Clip(slug="enchufla-slow-alt", name="Enchufla (alternate)", video_id="seH4eLK_S6o",
         start=120.6, end=149.6, tempo="slow", class_num=4, trust="D", move="enchufla",
         alternate_for="enchufla-slow",
         notes="Longer, but mixed with the basic."),
    Clip(slug="exhibela-crossing-slow-alt", name="Exhibela crossing (alternate)", video_id="WMgTtp-CRaQ",
         start=160.3, end=190.0, tempo="slow", class_num=5, trust="D", move="exhibela-crossing",
         alternate_for="exhibela-crossing-slow",
         notes="With arms — but the transcript there is almost entirely rhythm vocalisation, so verify by eye."),
    Clip(slug="three-two-one-slow-alt", name="Three, Two, One (alternate)", video_id="E8Y7VwC4ODY",
         start=337.5, end=360.0, tempo="slow", class_num=8, trust="D", move="three-two-one",
         alternate_for="three-two-one-slow",
         notes="With arm styling."),
    Clip(slug="hook-turn-slow-alt", name="Hook turn (alternate)", video_id="FUB6hqwNo0o",
         start=119.3, end=129.8, tempo="slow", class_num=3, trust="D", move="hook-turn",
         alternate_for="hook-turn-slow",
         notes="10.5s, too short to publish."),
    Clip(slug="cross-and-slide-slow-alt", name="Cross and slide (alternate)", video_id="8b0zqIk1AHE",
         start=194.8, end=223.3, tempo="slow", class_num=11, trust="D", move="cross-and-slide",
         alternate_for="cross-and-slide-slow",
         notes="Arms styling, leader then follower — this is where the beat-4 cue lives."),
    Clip(slug="charanga-slow-alt", name="Charanga (alternate)", video_id="Gy8jEBggrLc",
         start=216.3, end=225.9, tempo="slow", class_num=12, trust="D", move="charanga",
         alternate_for="charanga-slow",
         notes="9.6s, with the clap."),
    Clip(slug="cuban-rumba-basic-slow-alt1", name="Cuban Rumba Basic (alternate 1)", video_id="ZArlfy9EakM",
         start=210.5, end=224.3, tempo="slow", class_num=13, trust="D", move="cuban-rumba-basic",
         alternate_for="cuban-rumba-basic-slow",
         notes="The isolated basic, 13.8s, too short."),
    Clip(slug="cuban-rumba-basic-slow-alt2", name="Cuban Rumba Basic (alternate 2)", video_id="ZArlfy9EakM",
         start=254.8, end=277.0, tempo="slow", class_num=13, trust="D", move="cuban-rumba-basic",
         alternate_for="cuban-rumba-basic-slow",
         notes="The arms version, 22.2s."),
    Clip(slug="quick-5-slow-alt", name="Quick 5 (alternate)", video_id="tlUegbWymak",
         start=329.0, end=343.6, tempo="slow", class_num=14, trust="D", move="quick-5",
         alternate_for="quick-5-slow",
         notes="Arms, 14.6s."),
    Clip(slug="warm-up-review-alt", name="Salsa warm-up (Class 15 alternate)", video_id="qD6Vp3qj48o",
         start=99.5, end=137.2, tempo="fast", class_num=15, trust="A",
         alternate_for="warm-up-review", is_class_clip=True,
         notes="Second call-sheet stretch: tapping on 8 → cross, slide → just cross."),
]


def cut(clip: Clip, out_dir: Path, dry_run: bool) -> tuple[bool, float]:
    """Encode `clip`'s window from its source into out_dir/<slug>.mp4.
    Returns (success, actual_duration).
    """
    if clip.is_class_clip:
        dest = CLASS_CLIP_DIR / clip.output_filename
        dest.parent.mkdir(parents=True, exist_ok=True)
    else:
        dest = out_dir / clip.output_filename

    if dry_run:
        logger.info(f"[DRY RUN] {clip.slug}: {clip.start}–{clip.end} ({clip.duration}s)")
        return True, clip.duration

    if not clip.source_path.exists():
        logger.error(f"Source missing: {clip.source_path}")
        return False, 0.0

    cmd = [
        "ffmpeg",
        "-ss", str(clip.start),
        "-i", str(clip.source_path),
        "-t", str(clip.duration),
        # CRITICAL: Keep audio. The spoken count is the whole point.
        "-c:v", VIDEO_CODEC,
        "-preset", VIDEO_PRESET,
        "-crf", str(VIDEO_CRF),
        "-pix_fmt", "yuv420p",
        "-c:a", AUDIO_CODEC,
        "-b:a", AUDIO_BITRATE,
        "-af", AUDIO_FILTER,
        "-movflags", "+faststart",
        "-y", str(dest),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0 or not dest.exists():
        logger.error(f"FAIL {clip.slug}:\n{result.stderr[-2000:]}")
        return False, 0.0

    # Probe actual duration
    probe_cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        str(dest)
    ]
    probe = subprocess.run(probe_cmd, capture_output=True, text=True)
    actual_duration = float(probe.stdout.strip()) if probe.returncode == 0 else 0.0

    kb = dest.stat().st_size // 1024
    drift = abs(actual_duration - clip.duration)
    drift_str = f" [drift {drift:.1f}s]" if drift > 0.2 else ""
    short_str = " [<15s, short]" if clip.duration < 15 and not clip.alternate_for else ""
    logger.info(f"OK {clip.slug}: {clip.start}–{clip.end} ({clip.duration}s, {kb} KiB){drift_str}{short_str}")
    return True, actual_duration


def timecode(seconds: float) -> str:
    return f"{int(seconds // 60)}:{seconds % 60:05.2f}"


def write_review_page(clips: list[Clip], out_dir: Path) -> Path:
    """Build a self-contained page that loops every clip with metadata."""

    def card(c: Clip) -> str:
        badges = [
            f'<span class="badge">{c.duration}s</span>',
            f'<span class="badge trust-{c.trust.lower()}">{c.trust}</span>',
            f'<span class="badge tempo-{c.tempo}">{"SLOW" if c.tempo == "slow" else "FAST"}</span>',
        ]
        if c.alternate_for:
            badges.append('<span class="badge alt">alternate</span>')
        if c.shared:
            badges.append('<span class="badge shared">SHARED FILE</span>')
        if c.is_class_clip:
            badges.append('<span class="badge class-clip">CLASS CLIP</span>')

        caveat_html = ""
        if c.caveat:
            caveat_html = f'<p class="caveat"><strong>⚠ Caveat:</strong> {html.escape(c.caveat)}</p>'

        return f"""
      <figure class="card">
        <video src="{c.output_filename}" loop autoplay playsinline preload="auto"></video>
        <figcaption>
          <h2>{html.escape(c.name)}</h2>
          <p class="meta">Class {c.class_num} · {c.move or "class clip"}</p>
          <p class="times">{timecode(c.start)} &rarr; {timecode(c.end)}
             <span class="dim">(raw {c.start}s &ndash; {c.end}s)</span></p>
          <div class="badges">{''.join(badges)}</div>
          {caveat_html}
          <p class="notes">{html.escape(c.notes)}</p>
        </figcaption>
      </figure>"""

    # Group slow/fast pairs
    moves = {}
    for c in clips:
        if c.alternate_for:
            continue
        move_key = c.move or c.slug
        if move_key not in moves:
            moves[move_key] = {"slow": None, "fast": None}
        moves[move_key][c.tempo] = c

    pairs_html = []
    for move_key in moves:
        pair = moves[move_key]
        slow_card = card(pair["slow"]) if pair["slow"] else ""
        fast_card = card(pair["fast"]) if pair["fast"] else ""
        pairs_html.append(f'<div class="pair">{slow_card}{fast_card}</div>')

    alternates = [c for c in clips if c.alternate_for]
    alternates_html = '<h3>Alternates (review only, not published)</h3>\n<div class="grid">'
    alternates_html += ''.join(card(c) for c in alternates)
    alternates_html += '</div>'

    doc = f"""<!doctype html>
<meta charset="utf-8">
<title>Salsa Steps clips — review</title>
<style>
  :root {{ color-scheme: dark; }}
  body {{ margin: 0; padding: 32px; background: #111; color: #ededed;
         font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }}
  header {{ max-width: 1400px; margin: 0 auto 28px; }}
  h1 {{ margin: 0 0 6px; font-size: 26px; }}
  .sub {{ color: #909090; margin: 0; }}
  h3 {{ max-width: 1400px; margin: 36px auto 14px; font-size: 13px;
        text-transform: uppercase; letter-spacing: .12em; color: #fbbf24; }}
  .pair {{ max-width: 1400px; margin: 0 auto 24px; display: grid; gap: 20px;
           grid-template-columns: 1fr 1fr; }}
  .grid {{ max-width: 1400px; margin: 0 auto;
           display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); }}
  .card {{ margin: 0; background: #1a1a1a; border: 1px solid rgba(255,255,255,.06);
           border-radius: 14px; overflow: hidden; }}
  video {{ width: 100%; aspect-ratio: 16/9; object-fit: cover; background: #000; display: block; }}
  figcaption {{ padding: 14px 16px 16px; }}
  h2 {{ margin: 0 0 4px; font-size: 17px; }}
  .meta {{ margin: 0 0 4px; font-size: 13px; color: #909090; }}
  .times {{ margin: 0 0 10px; font-family: ui-monospace, Menlo, monospace; font-size: 12.5px; color: #d0d0d0; }}
  .dim {{ color: #6c6c6c; }}
  .badges {{ display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }}
  .badge {{ font-size: 11px; padding: 3px 8px; border-radius: 999px;
            background: #252525; color: #b8b8b8; }}
  .badge.trust-a {{ background: #1a3a2a; color: #7ce0a0; }}
  .badge.trust-d {{ background: #3a3520; color: #f0d060; }}
  .badge.trust-v {{ background: #3a2520; color: #f0a060; }}
  .badge.tempo-slow {{ background: #20253a; color: #7cc4ff; }}
  .badge.tempo-fast {{ background: #3a2030; color: #ff7cc4; }}
  .badge.alt {{ background: #1e3040; color: #7cc4ff; }}
  .badge.shared {{ background: #40301a; color: #fbbf24; font-weight: 600; }}
  .badge.class-clip {{ background: #2a3a2a; color: #a0e07c; }}
  .caveat {{ margin: 6px 0; padding: 8px; background: #3a2520; border-left: 3px solid #f0a060;
             font-size: 13px; color: #f0d0c0; }}
  .notes {{ margin: 6px 0 0; font-size: 13px; color: #8d8d8d; }}
</style>
<header>
  <h1>Salsa Steps — demo clips for review</h1>
  <p class="sub">Cut from La Suerte Dance School "Beginners Cuban Salsa Steps Course"
     (15 classes). All clips loop with audio. Windows from SALSA_STEPS_BUILD_SPEC.md §3.
     22 moves × 2 tempos + 1 class clip = 44 published files (left-turn-side shares right-turn-side-fast.mp4).</p>
  <p class="sub"><strong>Trust grades:</strong> A = both boundaries anchored, D = one derived, V = contains caveat.</p>
</header>

<h3>Slow / Fast pairs (44 published clips)</h3>
{''.join(pairs_html)}

{alternates_html}
"""
    dest = out_dir / "index.html"
    dest.write_text(doc)
    return dest


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--review", action="store_true",
                        help="write to data/review/salsa/ with an index.html, "
                             "including the alternate candidates")
    parser.add_argument("--only", metavar="SLUG",
                        help="cut only the clip(s) with this slug (supports partial match)")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    out_dir = REVIEW_DIR if args.review else PUBLISH_DIR
    clips_to_cut = CLIPS + (ALTERNATES if args.review else [])

    if args.only:
        clips_to_cut = [c for c in clips_to_cut if args.only in c.slug]
        if not clips_to_cut:
            logger.error(f"No clips match --only '{args.only}'")
            sys.exit(1)
        logger.info(f"Filtered to {len(clips_to_cut)} clip(s) matching '{args.only}'")

    # Dedupe shared clips: encode once by (video_id, start, end)
    seen = set()
    unique_clips = []
    for c in clips_to_cut:
        key = (c.video_id, c.start, c.end)
        if key not in seen:
            seen.add(key)
            unique_clips.append(c)

    out_dir.mkdir(parents=True, exist_ok=True)
    logger.info(f"Cutting {len(unique_clips)} unique clips into {out_dir}")

    failed = []
    total_size = 0
    duration_warnings = []

    for c in unique_clips:
        success, actual_duration = cut(c, out_dir, args.dry_run)
        if not success:
            failed.append(c.slug)
        elif not args.dry_run:
            if c.is_class_clip:
                dest = CLASS_CLIP_DIR / c.output_filename
            else:
                dest = out_dir / c.output_filename
            total_size += dest.stat().st_size
            drift = abs(actual_duration - c.duration)
            if drift > 0.3:
                duration_warnings.append(f"{c.slug}: expected {c.duration}s, got {actual_duration:.1f}s (drift {drift:.1f}s)")

    if failed:
        logger.error(f"Failed: {', '.join(failed)}")
        sys.exit(1)

    if duration_warnings:
        logger.warning("Duration drifts > 0.3s:")
        for w in duration_warnings:
            logger.warning(f"  {w}")

    if not args.dry_run:
        total_mb = total_size / (1024 * 1024)
        logger.info(f"Total size: {total_mb:.1f} MB")

    if args.review and not args.dry_run:
        page = write_review_page(clips_to_cut, out_dir)
        logger.info(f"Review page: {page}")

    logger.info("Done.")


if __name__ == "__main__":
    main()

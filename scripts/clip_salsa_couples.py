"""
Cut the demo clips for the Cuban Salsa Beginners Course for Couples.

Source: La Suerte Dance School "Cuban Salsa - Beginners Course for Couples"
playlist (PL8hFYIpg2Jp1EJE3TCWMr0f_zr9WOi10j, 21 classes) plus the channel's
official vertical shorts. Sources live at data/cache/salsa/videos/<VIDEO_ID>.mp4.

Every window comes from SALSA_COUPLES_SPEC_PART1.md (classes 1-7),
SALSA_COUPLES_SPEC_PART2.md (classes 8-14) and SALSA_COUPLES_SPEC_PART3.md
(classes 15-21). Do not re-derive these numbers: each boundary is
anchored to a transcript event and graded, and several were corrected against the
first pass.

Four things differ from clip_salsa_steps.py, all forced by the material:

  * Output goes to frontend/public/clips/salsa/couples/, not .../moves/. Enchufla
    and Exhibela are taught in BOTH courses, so a flat namespace would have the
    couples cut silently overwrite the steps cut. Clips hang off a TeachingSource
    rather than off a move precisely because each source films it differently.

  * Clips have mixed aspect. The class videos are 16/9; the official shorts the
    fast grain is usually taken from are 9/16. The review page must honour each
    clip's own aspect, or every short gets centre-cropped into a letterbox and
    the feet - the thing being reviewed - are cut off.

  * Several moves share one window. The clearest case is Class 10's short, which
    shows Enchufla doble, Alarde and Exhibela in one continuous combination and
    is therefore the fast grain for three separate moves. One file is encoded and
    the other moves reference it, exactly as left-turn-side reuses
    right-turn-side-fast.mp4 in the steps course. `shared_file` names the owner.

  * Five class videos (17-21) are not yet downloaded, which blocks 12 windows -
    and because the user's priority is the counted slow demo, the blocked set is
    the painful one. Missing sources are reported and skipped rather than failing
    the run, so the 29 cuttable clips still land.

Usage:
    uv run scripts/clip_salsa_couples.py --review    # -> data/review/salsa-couples/ + index.html
    uv run scripts/clip_salsa_couples.py             # -> frontend/public/clips/salsa/couples/
    uv run scripts/clip_salsa_couples.py --only vacilala
"""
# /// script
# dependencies = []
# ///

import argparse
import html
import logging
import subprocess
import sys
from dataclasses import dataclass, field
from pathlib import Path

PROJECT_ROOT = Path("/Users/louis.boguslav/Documents/perfect-workout")
VIDEOS_DIR = PROJECT_ROOT / "data" / "cache" / "salsa" / "videos"
PUBLISH_DIR = PROJECT_ROOT / "frontend" / "public" / "clips" / "salsa" / "couples"
REVIEW_DIR = PROJECT_ROOT / "data" / "review" / "salsa-couples"

# Identical to the steps cutter, deliberately: the two courses are played by the
# same component, so a clip from one must not look or sound different from the other.
VIDEO_CODEC = "libx264"
VIDEO_PRESET = "fast"
VIDEO_CRF = 23
# CRITICAL: Do NOT pass -an. The spoken count is the whole point of a salsa clip.
AUDIO_CODEC = "aac"
AUDIO_BITRATE = "128k"
# EBU R128. The mismatch this fixes is worse here than in the steps course: the
# slow grain is voice over a quiet room and the fast grain is an official short
# with mastered music, so the two halves of a pair can be 14 dB apart.
AUDIO_FILTER = "loudnorm=I=-16:TP=-1.5:LRA=11"

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")


@dataclass
class Clip:
    slug: str
    video_id: str
    start: float
    end: float
    tempo: str  # 'slow' or 'fast'
    class_num: int
    trust: str  # 'A' both boundaries anchored, 'D' one derived, 'V' carries a caveat
    aspect: str  # '16/9' class video, '9/16' official short
    move: str = ""
    # How each boundary was anchored. Distinct from `caveat`: notes explain why
    # the window is where it is, a caveat says what is wrong with it.
    notes: str = ""
    caveat: str = ""
    label: str = ""
    alternate_for: str = ""
    # Set when another clip owns the encoded file. Nothing is encoded for this
    # entry; the name is recorded so the data module and the review page agree
    # on which file the move actually points at.
    shared_file: str = ""
    is_class_clip: bool = False

    @property
    def duration(self) -> float:
        return round(self.end - self.start, 1)

    @property
    def source_path(self) -> Path:
        return VIDEOS_DIR / f"{self.video_id}.mp4"

    @property
    def output_filename(self) -> str:
        return self.shared_file or f"{self.slug}.mp4"

    @property
    def name(self) -> str:
        """Display name for the review page only.

        Derived from the slug rather than carried as a field: the authoritative
        display names live in the TypeScript data modules, taken from the specs,
        and a second hand-typed copy here would drift from them.
        """
        base = (self.move or self.slug).replace("-", " ").strip()
        pretty = base[:1].upper() + base[1:]
        if self.label:
            return f"{pretty} - {self.label}"
        return f"{pretty} ({'slow' if self.tempo == 'slow' else 'full tempo'})"


CLIPS: list[Clip] = [
    # ---- Classes 1-7, from SALSA_COUPLES_SPEC_PART1.md -------------------------
    # Classes 1-4 have neither an official short nor a `count` chapter, so both
    # grains are cut from the class video and the counted demo had to be found
    # inside a `teach` block. Classes 5-7 take their fast grain from the official
    # short, cut whole. The three shorts carry no speech at all - a continuous
    # music bed - so no cue can ever be sourced from one.
    Clip(slug="al-centro-slow", video_id="MDEAN40DUVY",
         start=299.54, end=327.32, tempo="slow",
         class_num=1, trust="A", aspect="16/9",
         move="al-centro",
         notes="In: the word \"five\" of \"five six seven and cheeky cheeky open\" @299.54, the first count after the footwork instruction \"girls are starting with the right\" @298.44. Out: the segment ending 327.32, last word \"open.\" @327.02; the next words \"I'm talking right now from guy's point of view\" start @327.50."),
    Clip(slug="arriba-abajo-slow", video_id="MDEAN40DUVY",
         start=479.4, end=500.28, tempo="slow",
         class_num=1, trust="V", aspect="16/9",
         move="arriba",
         notes="In: \"Walking forward, Arriba, walking back, Abajo.\" @479.40 \u2014 the naming and the counted demo are the same breath. Out: the segment end 500.28 (last audible word \"6.\" @500.12); the next real speech is @508.52."),
    Clip(slug="abajo-slow", video_id="MDEAN40DUVY",
         start=479.4, end=500.28, tempo="slow",
         class_num=1, trust="V", aspect="16/9",
         move="abajo", shared_file="arriba-abajo-slow.mp4",
         notes="In: \"Walking forward, Arriba, walking back, Abajo.\" @479.40 \u2014 the naming and the counted demo are the same breath. Out: the segment end 500.28 (last audible word \"6.\" @500.12); the next real speech is @508.52."),
    Clip(slug="al-centro-fast", video_id="MDEAN40DUVY",
         start=581.24, end=612.0, tempo="fast",
         class_num=1, trust="V", aspect="16/9",
         move="al-centro",
         notes="In: the count \"1, 3, 5, 6, 7, 8.\" @581.24, immediately after \"We start with Al Centro.\" @579.48. Out: 612.00, the word before \"we will swap camera\" \u2014 the chapter mark is 613.00."),
    Clip(slug="arriba-abajo-fast", video_id="MDEAN40DUVY",
         start=667.9, end=691.34, tempo="fast",
         class_num=1, trust="V", aspect="16/9",
         move="arriba",
         notes="In: the word \"arriba\" @667.90 in \"now I'll keep swapping a bit faster \u2014 arriba front\". Out: the segment end 691.34; \"Nice one.\" @691.66. `abajo` @679.94 is inside the window."),
    Clip(slug="abajo-fast", video_id="MDEAN40DUVY",
         start=667.9, end=691.34, tempo="fast",
         class_num=1, trust="V", aspect="16/9",
         move="abajo", shared_file="arriba-abajo-fast.mp4",
         notes="In: the word \"arriba\" @667.90 in \"now I'll keep swapping a bit faster \u2014 arriba front\". Out: the segment end 691.34; \"Nice one.\" @691.66. `abajo` @679.94 is inside the window."),
    Clip(slug="la-chica-slow", video_id="np3g2IzZ11A",
         start=199.02, end=233.86, tempo="slow",
         class_num=2, trust="V", aspect="16/9",
         move="la-chica",
         notes="In: \"Five,\" @199.02, the first count after \"\u2026react to them and follow.\" @197.98. Out: the word \"seven.\" @233.86 ending \"Hop, one hand up and push and five, six, seven.\"; \"From girl perspective,\" starts @234.38."),
    Clip(slug="el-chico-slow", video_id="np3g2IzZ11A",
         start=350.54, end=367.34, tempo="slow",
         class_num=2, trust="V", aspect="16/9",
         move="el-chico",
         notes="In: the \"5\" @350.54 of \"Or maybe we'll just show you how it works. 5 6 7 1 al centro 5 el chico\u2026\" @347.88. Out: the \"7.\" @367.34 that closes the third repetition; \"Now\" @367.84 begins the feet explanation."),
    Clip(slug="los-dos-slow", video_id="np3g2IzZ11A",
         start=583.4, end=606.64, tempo="slow",
         class_num=2, trust="A", aspect="16/9",
         move="los-dos",
         notes="In: the \"5\" @583.40 of \"5 6 7 1 2 3 5 los dos swap hand push 5 6 7\". Out: the word \"right.\" @606.64; \"What we like to do quite often\" starts @607.16."),
    Clip(slug="el-chico-fast", video_id="np3g2IzZ11A",
         start=746.48, end=759.76, tempo="fast",
         class_num=2, trust="V", aspect="16/9",
         move="el-chico",
         notes="In: \"El Chico, guys, you go.\" @746.48. Out: \"Five, al centro, al centro, one.\" @759.76 \u2014 the call moves on to al centro. The move is called twice inside the window, @746.48 and @753.28."),
    Clip(slug="la-chica-fast", video_id="np3g2IzZ11A",
         start=781.46, end=794.3, tempo="fast",
         class_num=2, trust="V", aspect="16/9",
         move="la-chica",
         notes="In: \"One, la chica, hop and turn\" @781.46, the first call after \"So ladies, from your perspective.\" @779.18. Out: \"7 and cheeky cheeky open\" @794.30. Two repetitions \u2014 \"one more time, and hop la chica\" @789.44\u2013792.70."),
    Clip(slug="los-dos-fast", video_id="np3g2IzZ11A",
         start=814.12, end=827.98, tempo="fast",
         class_num=2, trust="V", aspect="16/9",
         move="los-dos",
         notes="In: \"now\" @814.12 of \"and now lost dos we go together\". Out: \"Six, seven and one.\" @827.98. Contains the lead audible at tempo twice: \"Swap arms and press.\" @815.98 and \"Los dos. Swap and press.\" @822.22."),
    Clip(slug="guapea-slow", video_id="y6wC5uHfXG0",
         start=368.16, end=410.98, tempo="slow",
         class_num=3, trust="A", aspect="16/9",
         move="guapea",
         notes="In: \"Five,\" @368.16, the first count after \"She goes back with the right.\" @366.68. Out: the segment ending 410.98, last words \"and front, and stop.\" @409.92\u2013410.62; \"Okay? I hope that is clear.\" starts @411.56."),
    Clip(slug="dile-que-no-slow", video_id="y6wC5uHfXG0",
         start=653.04, end=675.8, tempo="slow",
         class_num=3, trust="A", aspect="16/9",
         move="dile-que-no",
         notes="In: the \"five\" @653.04 of \"five six basic tiki one two three delay cano\", right after \"so it should be quite easy\" @651.94. Out: the word \"stop\" @675.64, whose following word \"we'll\" starts @675.82 \u2014 cut at 675.80, in the 0.18s gap."),
    Clip(slug="dile-que-no-fast", video_id="y6wC5uHfXG0",
         start=814.38, end=842.3, tempo="fast",
         class_num=3, trust="V", aspect="16/9",
         move="dile-que-no",
         notes="In: the \"5\" @814.38 of \"5 6 7 and cheeky cheeky hop\", the first count after \"Okay let's start one more time from top.\" @809.96. Out: 842.30, immediately before \"ok one more time but this time different direction\" @842.32."),
    Clip(slug="guapea-fast", video_id="y6wC5uHfXG0",
         start=873.42, end=895.1, tempo="fast",
         class_num=3, trust="V", aspect="16/9",
         move="guapea",
         notes="In: the word \"basic\" @873.42 opening \"basic chick chick hop be like an o hop\u2026\", right after \"this time this angle, five, six,\" @870.66\u2013873.24. Out: the segment ending 895.10, last words \"and ting ting ca and ting ting cun cun\" @891.34\u2013894.28; the chapter mark is 895.00 and \"and let's start reviewing a bit\" @896.08."),
    Clip(slug="enchufla-slow", video_id="kg5Ztcp5xQU",
         start=189.24, end=220.18, tempo="slow",
         class_num=4, trust="V", aspect="16/9",
         move="enchufla",
         notes="In: \"Now\" @189.24, opening \"Now at the same time I go behind her back\". Out: 220.18, in the gap before \"tick,\" @220.20, which starts the rhythm vocalisation."),
    Clip(slug="enchufla-al-centro-slow", video_id="kg5Ztcp5xQU",
         start=309.26, end=331.78, tempo="slow",
         class_num=4, trust="V", aspect="16/9",
         move="enchufla-al-centro",
         notes="In: the \"five\" @309.26 of \"five six seven one two three five six both back\", the first count after \"And cheeky, cheeky D like I know.\" @307.26\u2013309.12. Out: 331.78, after \"nice one\" @331.24\u2013331.60 and before \"we'll\" @331.82."),
    Clip(slug="enchufla-fast", video_id="kg5Ztcp5xQU",
         start=569.28, end=589.8, tempo="fast",
         class_num=4, trust="V", aspect="16/9",
         move="enchufla",
         notes="In: \"Hop\" @569.28, the segment start after \"One, be like an all.\" ends @567.92. Out: 589.80, 0.06s before \"And one more time\" @589.86."),
    Clip(slug="enchufla-al-centro-fast", video_id="kg5Ztcp5xQU",
         start=699.5, end=728.3, tempo="fast",
         class_num=4, trust="V", aspect="16/9",
         move="enchufla-al-centro",
         notes="In: \"And\" @699.50, the segment start after \"this perspective.\" ends @697.40. Out: 728.30, after \"great.\" @728.06 and before \"Okay, so one of the goals is achieved\" @729.88."),
    Clip(slug="el-uno-slow", video_id="4KKAKgn8UZ4",
         start=440.16, end=471.1, tempo="slow",
         class_num=5, trust="A", aspect="16/9",
         move="el-uno",
         notes="In: \"Hop\" @440.16, the first call after \"we'll show you fluently.\" ends @439.34. Out: 471.10, after \"puku.\" @470.84 and before \"Maybe\" @471.22."),
    Clip(slug="el-uno-fast", video_id="qwR89NAQgqM",
         start=0.0, end=31.414, tempo="fast",
         class_num=5, trust="V", aspect="9/16",
         move="el-uno",
         notes="The whole short. `aspect: '9/16'`. Dancing is already running at frame 5 (~0.2s) \u2014 there is no title card, so there is nothing to trim off the front. 31.38 is the ffprobe stream duration."),
    Clip(slug="kentucky-slow", video_id="yZ562-ehtQQ",
         start=209.92, end=241.4, tempo="slow",
         class_num=6, trust="A", aspect="16/9",
         move="kentucky",
         notes="In: \"5,\" @209.92, the first call after the announcement \"One more time from this perspective fluently.\" closes @209.26. Out: 241.40, the segment end after \"7.\" @241.20 and before \"Important elements\" @243.52."),
    Clip(slug="la-chica-open-slow", video_id="yZ562-ehtQQ",
         start=557.88, end=575.62, tempo="slow",
         class_num=6, trust="V", aspect="16/9",
         move="la-chica",
         notes="In: \"We'll show you this from another perspective, from girl point of view\" @557.88, after \"card as usual.\" closes @557.40. Out: 575.62, the segment end after \"and back.\" @575.24."),
    Clip(slug="kentucky-fast", video_id="V57F7c5R5jY",
         start=0.0, end=40.534, tempo="fast",
         class_num=6, trust="V", aspect="9/16",
         move="kentucky",
         notes="The whole short. `aspect: '9/16'`. No title card \u2014 dancing is running by frame 5. 40.52 is the ffprobe stream duration (40.523817); the container reports 40.534."),
    Clip(slug="vacilala-por-la-mano-slow", video_id="pZChl5ylSJw",
         start=305.54, end=331.18, tempo="slow",
         class_num=7, trust="A", aspect="16/9",
         move="vacilala-por-la-mano",
         notes="In: \"5\" @305.54, the first call of the side view, after \"\u2026just from different perspective.\" closes @305.06. Out: 331.18, the first word of the next sentence, \"Let's do it with music\" \u2014 the previous pass ends on \"cheek.\" @330.72."),
    Clip(slug="vacilala-por-la-mano-fast", video_id="18cM9UvzsoI",
         start=0.0, end=32.174, tempo="fast",
         class_num=7, trust="V", aspect="9/16",
         move="vacilala-por-la-mano",
         notes="The whole short. `aspect: '9/16'`. No title card \u2014 dancing is running by frame 5. 32.17 is the ffprobe stream duration (32.165467); the container reports 32.174."),
    # ---- Classes 8-14 (PART2) and 15-21 (PART3) --------------------------------
    Clip(slug="adios-con-la-hermana-slow", video_id="X4Sr8QbXQLU",
         start=273.26, end=313.08, tempo="slow",
         class_num=8, trust="A", aspect="16/9",
         move="adios-con-la-hermana",
         caveat="Crosses the 291.0 chapter boundary on purpose (GC-d) \u2014 the camera changes mid-clip and the second rep is called with words rather than numbers. The chapter is titled 'side view' but the teachers announce 'the front angle' (K8-a)."),
    Clip(slug="enchufla-mix-slow", video_id="X4Sr8QbXQLU",
         start=208.68, end=230.62, tempo="slow",
         class_num=8, trust="V", aspect="16/9",
         move="enchufla-mix",
         caveat="21.9s, just under the 23s reference floor. The first ~8s is the fluent demo; from 216.76 the teacher describes her steps over it ('open with the left, then small cross, and then joining legs together') and ends on 'We finish with Dile que no'. It is the only isolated demo of the Mix in the course."),
    Clip(slug="adios-con-la-hermana-fast", video_id="JkwUzKb_X-8",
         start=0, end=37.594, tempo="fast",
         class_num=8, trust="D", aspect="9/16",
         move="adios-con-la-hermana",
         caveat="Whole official short, un-transcribed \u2014 no interior boundary could be anchored. Check for an intro title card before publishing."),
    Clip(slug="enchufla-mix-fast", video_id="JkwUzKb_X-8",
         start=0, end=37.594, tempo="fast",
         class_num=8, trust="D", aspect="9/16",
         move="enchufla-mix", shared_file="adios-con-la-hermana-fast.mp4",
         caveat="Whole official short, un-transcribed \u2014 no interior boundary could be anchored. Check for an intro title card before publishing."),
    Clip(slug="sombrero-slow", video_id="lV56IVufYOU",
         start=234.94, end=264.36, tempo="slow",
         class_num=9, trust="A", aspect="16/9",
         move="sombrero",
         caveat="Starts 15s before the 'fluently with count' chapter, inside the teach block: the chapter begins mid-demo (K9-a). The teachers' shorthand \u2014 'Hop and pull. Pull, swap, give second' \u2014 is audible over the first rep."),
    Clip(slug="sombrero-fast", video_id="Nl714zi8W-A",
         start=0, end=33.474, tempo="fast",
         class_num=9, trust="D", aspect="9/16",
         move="sombrero",
         caveat="Whole official short, un-transcribed \u2014 no interior boundary could be anchored. Check for an intro title card before publishing."),
    Clip(slug="enchufla-doble-alarde-exhibela-slow", video_id="CkZO6nyJwjw",
         start=416.1, end=436.52, tempo="slow",
         class_num=10, trust="A", aspect="16/9",
         move="enchufla-doble-alarde-exhibela",
         caveat="20.4s, under the 23s reference floor; one rep only. The chapter's remaining 22s is spoken etiquette, not dancing."),
    Clip(slug="enchufla-doble-alarde-slow", video_id="CkZO6nyJwjw",
         start=174.02, end=193.98, tempo="slow",
         class_num=10, trust="A", aspect="16/9",
         move="enchufla-doble-alarde",
         caveat="19.96s, under the 23s reference floor. The teacher talks to his partner mid-demo ('guys, front and D leg, can you put hand on my shoulder' 185\u2013187). The rest of the chapter (203.72\u2013228.02) is deliberately excluded: those reps are Enchufla **triple** alarde and a 'straight away' variant, not this move's own count (K10-a)."),
    Clip(slug="exhibela-crossing-slow", video_id="CkZO6nyJwjw",
         start=353.12, end=373.36, tempo="slow",
         class_num=10, trust="A", aspect="16/9",
         move="exhibela-crossing",
         caveat="20.2s. The teacher narrates over the second rep. The hand lead being demonstrated is described 6s earlier, at 349.70 \u2014 a viewer who starts at the in-point does not hear it."),
    Clip(slug="enchufla-doble-alarde-exhibela-fast", video_id="fNXwnQuVdEI",
         start=0, end=45.734, tempo="fast",
         class_num=10, trust="D", aspect="9/16",
         move="enchufla-doble-alarde-exhibela",
         caveat="Whole official short, un-transcribed \u2014 no interior boundary could be anchored. Check for an intro title card before publishing."),
    Clip(slug="enchufla-doble-alarde-fast", video_id="fNXwnQuVdEI",
         start=0, end=45.734, tempo="fast",
         class_num=10, trust="D", aspect="9/16",
         move="enchufla-doble-alarde", shared_file="enchufla-doble-alarde-exhibela-fast.mp4",
         caveat="Whole official short, un-transcribed \u2014 no interior boundary could be anchored. Check for an intro title card before publishing. Shared with Enchufla doble, alarde, Exhibela \u2014 the short shows the full combination including the Exhibela tail."),
    Clip(slug="exhibela-crossing-fast", video_id="fNXwnQuVdEI",
         start=0, end=45.734, tempo="fast",
         class_num=10, trust="D", aspect="9/16",
         move="exhibela-crossing", shared_file="enchufla-doble-alarde-exhibela-fast.mp4",
         caveat="Whole official short, un-transcribed \u2014 no interior boundary could be anchored. Check for an intro title card before publishing."),
    Clip(slug="setenta-slow", video_id="QueWxI6vMrc",
         start=177.66, end=221.12, tempo="slow",
         class_num=11, trust="V", aspect="16/9",
         move="setenta",
         caveat="First ~26s sits in the teach chapter, not the counted one: it is the 'one more time super slow' repetition with the teacher naming the hand actions over it. The clean fluent counted rep is the last 17s (from 203.9)."),
    Clip(slug="setenta-fast", video_id="TyOHtkirh_g",
         start=0, end=44.574, tempo="fast",
         class_num=11, trust="D", aspect="9/16",
         move="setenta",
         caveat="Whole official short, un-transcribed \u2014 no interior boundary could be anchored. Check for an intro title card before publishing."),
    Clip(slug="paseala-slow", video_id="EuT94T544Mg",
         start=291.88, end=310.02, tempo="slow",
         class_num=12, trust="A", aspect="16/9",
         move="paseala",
         caveat="18.1s, under the 23s reference floor, and one repetition only. It is the entire 'fluently with count' demo in this class \u2014 the chapter is 104s but 86s of it is teaching entries (K12-b)."),
    Clip(slug="paseala-fast", video_id="UsvPdXW4-O4",
         start=0, end=30.954, tempo="fast",
         class_num=12, trust="D", aspect="9/16",
         move="paseala",
         caveat="Whole official short, un-transcribed \u2014 no interior boundary could be anchored. Check for an intro title card before publishing."),
    Clip(slug="cocacola-slow", video_id="GT7PTpvni_A",
         start=360.7, end=391.58, tempo="slow",
         class_num=13, trust="A", aspect="16/9",
         move="cocacola",
         caveat="Seven seconds in the middle (373.14\u2013380.28) are spoken, not danced \u2014 the entry rule ('so it's enough that we will finish with dilekano'). The second rep is entered from Sombrero rather than from the closed position."),
    Clip(slug="cocacola-fast", video_id="7MODqLfyTQQ",
         start=0, end=23.794, tempo="fast",
         class_num=13, trust="D", aspect="9/16",
         move="cocacola",
         caveat="Whole official short, un-transcribed \u2014 no interior boundary could be anchored. Check for an intro title card before publishing. At 24s this is the shortest short in the range."),
    Clip(slug="vacilala-los-dos-slow", video_id="jBaHuGXoWBY",
         start=374.18, end=385.72, tempo="slow",
         class_num=14, trust="A", aspect="16/9",
         move="vacilala-los-dos",
         caveat="11.5s \u2014 well under the 20s floor. It is the only complete counted rep of this move in the class: Vacilala los dos has no count chapter (K14-c). The teacher names the move over it ('Basila, Los dos') and the count is part rhythm vocalisation ('D leg')."),
    Clip(slug="vacilala-slow", video_id="jBaHuGXoWBY",
         start=299.2, end=319.22, tempo="slow",
         class_num=14, trust="A", aspect="16/9",
         move="vacilala",
         caveat="The count degrades into rhythm vocalisation after the first rep ('king king hop and D leg and hop') \u2014 normal for this channel, and the beats are still audible. Starts 0.8s before the chapter boundary."),
    Clip(slug="vacilala-fast", video_id="c0H4GQnYjNE",
         start=0, end=22.634, tempo="fast",
         class_num=14, trust="D", aspect="9/16",
         move="vacilala",
         caveat="Whole official short, un-transcribed \u2014 no interior boundary could be anchored. Check for an intro title card before publishing. One short for a class that teaches two moves \u2014 which of Vacilala and Vacilala los dos it shows is unknown until someone watches it. Same file is referenced from vacilala-los-dos."),
    Clip(slug="vacilala-los-dos-fast", video_id="c0H4GQnYjNE",
         start=0, end=22.634, tempo="fast",
         class_num=14, trust="D", aspect="9/16",
         move="vacilala-los-dos", shared_file="vacilala-fast.mp4",
         caveat="Whole official short, un-transcribed \u2014 no interior boundary could be anchored. Check for an intro title card before publishing. One short for a class that teaches two moves \u2014 which of Vacilala and Vacilala los dos it shows is unknown until someone watches it."),
    Clip(slug="tiramisu-slow", video_id="f8Y-b3m070c",
         start=267.48, end=306.6, tempo="slow",
         class_num=15, trust="A", aspect="16/9",
         move="tiramisu",
         caveat="The teacher names each action over the count ('Both arms over, right comes on head', 'left up, right comes back around head') \u2014 this is a narrated demo, not a silent one. That is an asset here, not a defect."),
    Clip(slug="tiramisu-fast", video_id="xwwnWPXpKz8",
         start=0.0, end=42.494, tempo="fast",
         class_num=15, trust="V", aspect="9/16",
         move="tiramisu",
         caveat="Whole short. It has not been transcribed or downloaded, so neither boundary is anchored to an event and a title card at the head, if there is one, is unchecked."),
    Clip(slug="sombrero-complicado-doble-slow", video_id="H5Idj-uzmn8",
         start=298.12, end=318.6, tempo="slow",
         class_num=16, trust="A", aspect="16/9",
         move="sombrero-complicado-doble",
         caveat="20.5s \u2014 the shortest slow clip in this range, and only just over the 20s floor. It is one complete run, counted and narrated from the leader's point of view. The chapter it comes from is 87s long but the other 67s are talking (flag K16-a)."),
    Clip(slug="sombrero-complicado-doble-fast", video_id="wAK8hMxwfes",
         start=0.0, end=37.474, tempo="fast",
         class_num=16, trust="V", aspect="9/16",
         move="sombrero-complicado-doble",
         caveat="Whole short, untranscribed, boundaries not event-anchored."),
    Clip(slug="el-uno-semi-complicado-slow", video_id="uoq2J1txSTE",
         start=366.16, end=383.0, tempo="slow",
         class_num=17, trust="D", aspect="16/9",
         move="el-uno-semi-complicado",
         caveat="16.8s \u2014 below the 20s floor, and the middle ~7s (371.18\u2013378.62) is the teacher standing still saying 'in here my hand is already on top, so this one extra turn is making the difference'. It is nonetheless the only window in the course where this move is shown on its own. Accepted deliberately: a short honest isolated demo beats a long clip of the wrong thing."),
    Clip(slug="juana-la-cubana-slow", video_id="uoq2J1txSTE",
         start=195.2, end=236.76, tempo="slow",
         class_num=17, trust="A", aspect="16/9",
         move="juana-la-cubana",
         caveat="Two runs with a 0.7s 'Let's do it again' between them. Counting only \u2014 the move name is called at the top of each run and nothing else is narrated."),
    Clip(slug="el-uno-semi-complicado-fast", video_id="uoq2J1txSTE",
         start=594.3, end=609.5, tempo="fast",
         class_num=17, trust="D", aspect="16/9",
         move="el-uno-semi-complicado",
         caveat="Not an isolated demo. 15.2s inside a longer combo, and the first ~8s is Sombrero complicado doble. The semi-complicado itself is roughly 602\u2013609. There is no full-tempo window anywhere in the course that shows this move alone \u2014 the official short for Class 17 is Juana la Cubana."),
    Clip(slug="juana-la-cubana-fast", video_id="B5A2kgjTvnw",
         start=0.0, end=47.274, tempo="fast",
         class_num=17, trust="V", aspect="9/16",
         move="juana-la-cubana",
         caveat="Whole short, container duration 47s, untranscribed, boundaries not event-anchored."),
    Clip(slug="dedo-slow", video_id="97Urh5GlCbg",
         start=227.9, end=265.9, tempo="slow",
         class_num=18, trust="A", aspect="16/9",
         move="dedo",
         caveat="Three runs. The first two (228.00\u2013254.90) are counted in numbers; the third (255.68\u2013265.64) is counted in rhythm sounds \u2014 'King, king, pa, ti-ting, ti-ta'. That is the teachers vocalising the rhythm, not speech, and it is perfectly usable to dance to; it is only unusable as a *cue* source."),
    Clip(slug="dedo-fast", video_id="TM9kP4jy0To",
         start=0.0, end=37.694, tempo="fast",
         class_num=18, trust="V", aspect="9/16",
         move="dedo",
         caveat="Whole short, container duration 38s, untranscribed, boundaries not event-anchored."),
    Clip(slug="santiago-slow", video_id="M3J7w59rXTE",
         start=403.7, end=433.0, tempo="slow",
         class_num=19, trust="A", aspect="16/9",
         move="santiago",
         caveat="One run. The teachers narrate the sections over it, which is useful, and they switch to full tempo 0.2s after the clip ends \u2014 do not extend it."),
    Clip(slug="santiago-fast", video_id="vlSqi-msy60",
         start=0.0, end=45.954, tempo="fast",
         class_num=19, trust="V", aspect="9/16",
         move="santiago",
         caveat="Whole short, container duration 46s, untranscribed, boundaries not event-anchored."),
    Clip(slug="release-and-return-slow", video_id="6-cpKa0UMWA",
         start=260.1, end=302.3, tempo="slow",
         class_num=20, trust="A", aspect="16/9",
         move="release-and-return", shared_file="solo-sequence-one-slow.mp4",
         caveat="Shared with solo-sequence-one. It contains the release verbatim and the return. The skill is not a separate demo; it is the first and last three bars of every sequence. Sharing the file is the honest model, not a shortcut."),
    Clip(slug="solo-sequence-one-slow", video_id="6-cpKa0UMWA",
         start=260.1, end=302.3, tempo="slow",
         class_num=20, trust="A", aspect="16/9",
         move="solo-sequence-one",
         caveat="Two runs, filmed from two angles, with a 3-second remark between them ('so I can reverse the camera'). If a single clean loop is wanted, the second run alone is 285.05 \u2192 302.30 (17.25s), which is below the 20s floor."),
    Clip(slug="solo-sequence-two-slow", video_id="6-cpKa0UMWA",
         start=481.05, end=523.6, tempo="slow",
         class_num=20, trust="A", aspect="16/9",
         move="solo-sequence-two",
         caveat="Two runs with a 2.4s remark between. The second run drifts into rhythm vocalisation ('tic tiki', 'king king pa') rather than numbers from about 509.8 \u2014 normal for this course, not a defect."),
    Clip(slug="release-and-return-fast", video_id="6-cpKa0UMWA",
         start=753.3, end=787.4, tempo="fast",
         class_num=20, trust="A", aspect="16/9",
         move="release-and-return", shared_file="solo-sequence-one-fast.mp4",
         caveat="Shared with solo-sequence-one."),
    Clip(slug="solo-sequence-one-fast", video_id="6-cpKa0UMWA",
         start=753.3, end=787.4, tempo="fast",
         class_num=20, trust="A", aspect="16/9",
         move="solo-sequence-one",
         caveat="Full tempo over music, with the teachers calling the sequence over it ('left turn guys, straight away and hop girls left'). Not a silent demo \u2014 but the calls are exactly the cue list, so this is a feature here."),
    Clip(slug="solo-sequence-two-fast", video_id="6-cpKa0UMWA",
         start=787.5, end=828.6, tempo="fast",
         class_num=20, trust="A", aspect="16/9",
         move="solo-sequence-two",
         caveat="Full tempo. From about 818.9 the calls become rhythm vocalisation ('And ping, ping, ping', 'And king, king, pa') rather than move names."),
    Clip(slug="class-21-demo", video_id="X7lz-BBMmU8",
         start=269.3, end=306.6, tempo="fast",
         class_num=21, trust="A", aspect="16/9",
         move="",
         caveat="There is no slow clip for this class and none should be synthesised. The class has no count chapter \u2014 the whole thing is one continuous full-tempo song. The full demo is 44.0\u2013371.0 and should be reached by deep link, not cut. This 37s window is a sample of the densest calling, not the demo."),
]

ALTERNATES: list[Clip] = [
    Clip(slug="adios-con-la-hermana-fast-alt", video_id="X4Sr8QbXQLU",
         start=358.04, end=398.8, tempo="fast",
         class_num=8, trust="A", aspect="16/9",
         move="adios-con-la-hermana", alternate_for="adios-con-la-hermana-fast",
         label="fast alternate (16/9)",
         caveat="41% count density \u2014 the teachers call numbers over the music ('With all numbers' @375.42), so this is not a silent demo (GC-c)."),
    Clip(slug="enchufla-mix-fast-alt", video_id="X4Sr8QbXQLU",
         start=406.18, end=417.86, tempo="fast",
         class_num=8, trust="A", aspect="16/9",
         move="enchufla-mix", alternate_for="enchufla-mix-fast",
         label="fast alternate (16/9, review only)",
         caveat="Far too short to publish; kept because it is the only place the Mix is named over music."),
    Clip(slug="sombrero-slow-alt", video_id="lV56IVufYOU",
         start=267.14, end=289.98, tempo="slow",
         class_num=9, trust="A", aspect="16/9",
         move="sombrero", alternate_for="sombrero-slow",
         label="slow alternate (16/9, review only)",
         caveat="Kept as an alternate rather than published because the framing is unverified and the chapter title ('side view') is not what the teachers say ('different perspective')."),
    Clip(slug="sombrero-fast-alt", video_id="lV56IVufYOU",
         start=372.66, end=400.86, tempo="fast",
         class_num=9, trust="A", aspect="16/9",
         move="sombrero", alternate_for="sombrero-fast",
         label="fast alternate (16/9)",
         caveat="From 381.94 the teachers vocalise the rhythm ('king king pa') and from 391.62 call every number over the music ('with all numbers go') \u2014 32% count density, not a silent demo (GC-c)."),
    Clip(slug="enchufla-doble-alarde-slow-alt", video_id="CkZO6nyJwjw",
         start=234.64, end=264.98, tempo="slow",
         class_num=10, trust="A", aspect="16/9",
         move="enchufla-doble-alarde", alternate_for="enchufla-doble-alarde-slow",
         label="slow alternate (16/9)",
         caveat="Three counted reps, uninterrupted, from the second camera \u2014 a longer and cleaner cut than the published one. It is the alternate only because the announcement is 'We'll do the same opposite direction' @231.46 and it cannot be determined from the transcript whether that means the camera moved or the move is being led to the other side. Watch 231\u2013235: if the footwork is unchanged, publish this instead. Highest-value 4-second check in this spec."),
    Clip(slug="enchufla-doble-alarde-exhibela-slow-alt", video_id="CkZO6nyJwjw",
         start=463.2, end=490.08, tempo="slow",
         class_num=10, trust="A", aspect="16/9",
         move="enchufla-doble-alarde-exhibela", alternate_for="enchufla-doble-alarde-exhibela-slow",
         label="slow alternate (16/9)",
         caveat="Two reps from the second camera, with 'and now our angles are different. I'll try again. I want you to see feet' (474.08\u2013479.28) spoken between them."),
    Clip(slug="enchufla-doble-alarde-fast-alt", video_id="CkZO6nyJwjw",
         start=529.16, end=545.46, tempo="fast",
         class_num=10, trust="A", aspect="16/9",
         move="enchufla-doble-alarde", alternate_for="enchufla-doble-alarde-fast",
         label="fast alternate (16/9)",
         caveat="16.3s, and the teacher calls it *triple* (K10-a)."),
    Clip(slug="enchufla-doble-alarde-exhibela-fast-alt", video_id="CkZO6nyJwjw",
         start=492.38, end=524.58, tempo="fast",
         class_num=10, trust="A", aspect="16/9",
         move="enchufla-doble-alarde-exhibela", alternate_for="enchufla-doble-alarde-exhibela-fast",
         label="fast alternate (16/9)",
         caveat="30% count density \u2014 the teacher counts and comments over the music throughout (GC-c)."),
    Clip(slug="enchufla-doble-alarde-exhibela-fast-alt2", video_id="CkZO6nyJwjw",
         start=0.0, end=17.92, tempo="fast",
         class_num=10, trust="A", aspect="16/9",
         move="enchufla-doble-alarde-exhibela", alternate_for="enchufla-doble-alarde-exhibela-fast",
         label="second fast alternate \u2014 the intro teaser",
         caveat="Class intro \u2014 almost certainly carries an on-screen title or channel branding. Unverified; check before publishing."),
    Clip(slug="setenta-slow-alt", video_id="QueWxI6vMrc",
         start=279.18, end=316.9, tempo="slow",
         class_num=11, trust="A", aspect="16/9",
         move="setenta", alternate_for="setenta-slow",
         label="slow alternate (review only)",
         caveat="The angle chapter, four counted Setenta reps from the side with no music and no explanation. Kept as an alternate rather than published because it is a camera-angle chapter and the framing is unverified."),
    Clip(slug="setenta-fast-alt", video_id="QueWxI6vMrc",
         start=383.92, end=400.56, tempo="fast",
         class_num=11, trust="A", aspect="16/9",
         move="setenta", alternate_for="setenta-fast",
         label="fast alternate (16/9, transcript-anchored)",
         caveat="16.6s, under the 23s reference floor, and the teacher counts over the music. Publish this instead of the short only if the short opens on a title card."),
    Clip(slug="paseala-slow-alt", video_id="EuT94T544Mg",
         start=277.82, end=291.88, tempo="slow",
         class_num=12, trust="A", aspect="16/9",
         move="paseala", alternate_for="paseala-slow",
         label="Exaggerated lead \u2014 the pull on 4 and 8",
         caveat="Not published because the teachers disown it on camera: 'Obviously we don't want you to dance like that but we want you to see where the signal happens' @287.12. A learner looping it would copy the exaggeration."),
    Clip(slug="paseala-slow-alt2", video_id="EuT94T544Mg",
         start=401.82, end=428.02, tempo="slow",
         class_num=12, trust="A", aspect="16/9",
         move="paseala", alternate_for="paseala-slow",
         label="Side view",
         caveat="Two counted reps plus an Enchufla-mix entry, from the second camera. Longer and cleaner than the published clip; withheld only because the framing is unverified."),
    Clip(slug="paseala-fast-alt", video_id="EuT94T544Mg",
         start=505.12, end=536.38, tempo="fast",
         class_num=12, trust="A", aspect="16/9",
         move="paseala", alternate_for="paseala-fast",
         label="fast alternate (16/9)",
         caveat="58% count density \u2014 the teacher counts continuously over the music and calls the entry ('Enchufla doble a large there one and Paseala' @516.74). There is no silent full-tempo Paseala anywhere in this class (K12-a)."),
    Clip(slug="paseala-fast-alt2", video_id="EuT94T544Mg",
         start=538.34, end=576.14, tempo="fast",
         class_num=12, trust="A", aspect="16/9",
         move="paseala", alternate_for="paseala-fast",
         label="second fast alternate (16/9)",
         caveat="The side-view music round: two entries (Enchufla mix @543.46, Enchufla doble alarde Exhibela @~560) into Paseala, with a grip swap called on camera. 43% counted."),
    Clip(slug="cocacola-slow-alt", video_id="GT7PTpvni_A",
         start=398.16, end=426.04, tempo="slow",
         class_num=13, trust="A", aspect="16/9",
         move="cocacola", alternate_for="cocacola-slow",
         label="slow alternate (16/9)",
         caveat="Two reps from the second camera, the second entered from Enchufla ('I'll do it with enchufla' @~412). Same 'opposite direction' ambiguity as K10-f."),
    Clip(slug="cocacola-slow-alt2", video_id="GT7PTpvni_A",
         start=465.34, end=477.84, tempo="slow",
         class_num=13, trust="A", aspect="16/9",
         move="cocacola", alternate_for="cocacola-slow",
         label="second slow alternate (16/9)",
         caveat="Far too short to publish, but it is the only feet-only framing of the follower's two-step turn ('Five, six, seven, one, two, three, five. Twist, twist forward'). Keep for the review page."),
    Clip(slug="cocacola-fast-alt", video_id="GT7PTpvni_A",
         start=557.14, end=582.43, tempo="fast",
         class_num=13, trust="A", aspect="16/9",
         move="cocacola", alternate_for="cocacola-fast",
         label="fast alternate (16/9)",
         caveat="25% count density \u2014 the cleanest full-tempo window in the class, two Enchufla-mix\u2192CocaCola runs from the second camera. The teacher calls the entries over the music ('and Enchufla mix, seven and one, Coca-Cola boom'); the last ~2s is rhythm vocalisation."),
    Clip(slug="cocacola-fast-alt2", video_id="GT7PTpvni_A",
         start=512.02, end=555.18, tempo="fast",
         class_num=13, trust="A", aspect="16/9",
         move="cocacola", alternate_for="cocacola-fast",
         label="second fast alternate (16/9)",
         caveat="62% count density (GC-c) \u2014 the teacher counts almost continuously and names three entries (Enchufla mix @522.72, a combination @534.76, El uno). Use the side-view alternate instead unless the framing is wrong."),
    Clip(slug="vacilala-slow-alt", video_id="jBaHuGXoWBY",
         start=295.52, end=319.22, tempo="slow",
         class_num=14, trust="A", aspect="16/9",
         move="vacilala", alternate_for="vacilala-slow",
         label="slow alternate (16/9)",
         caveat="The same window opened at the word start of 'We'll do that from Guapea', so the clip announces its own starting position. 3.7s of speech at the front is the price."),
    Clip(slug="vacilala-slow-alt2", video_id="jBaHuGXoWBY",
         start=348.68, end=360.12, tempo="slow",
         class_num=14, trust="A", aspect="16/9",
         move="vacilala", alternate_for="vacilala-slow",
         label="second slow alternate (16/9)",
         caveat="One rep, filmed after 'girls pay attention how arms are moving from open position in a circular way up' \u2014 the only rep shot *for the arms*. Too short to publish; keep for the review page next to cues -20\u2026-27."),
    Clip(slug="vacilala-los-dos-slow-alt", video_id="jBaHuGXoWBY",
         start=412.3, end=420.54, tempo="slow",
         class_num=14, trust="A", aspect="16/9",
         move="vacilala-los-dos", alternate_for="vacilala-los-dos-slow",
         label="slow alternate (16/9)",
         caveat="Second rep, shorter still."),
    Clip(slug="vacilala-los-dos-slow-alt2", video_id="jBaHuGXoWBY",
         start=374.18, end=420.54, tempo="slow",
         class_num=14, trust="A", aspect="16/9",
         move="vacilala-los-dos", alternate_for="vacilala-los-dos-slow",
         label="second slow alternate (16/9)",
         caveat="Both reps in one window. Rejected because 26.6 of those 46 seconds are speech (385.72 \u2192 412.30, the left-turn explanation and the two card pointers). Kept because a reviewer may prefer one long clip with a caveat to an 11s loop; that is a judgement call and it belongs to a human."),
    Clip(slug="vacilala-fast-alt", video_id="jBaHuGXoWBY",
         start=516.52, end=544.38, tempo="fast",
         class_num=14, trust="A", aspect="16/9",
         move="vacilala", alternate_for="vacilala-fast",
         label="fast alternate (16/9)",
         caveat="The teacher calls and vocalises the rhythm over the whole window ('hop, king king open, king king, hop') \u2014 not a silent demo. The last ~6s is rhythm vocalisation only. Second camera, continuous, and it contains one Vacilala rep (516.52\u2013524.46) and two Vacilala los dos reps (525.04\u2013533.72, 535.46\u2013537.86)."),
    Clip(slug="vacilala-fast-alt2", video_id="jBaHuGXoWBY",
         start=461.88, end=478.98, tempo="fast",
         class_num=14, trust="A", aspect="16/9",
         move="vacilala", alternate_for="vacilala-fast",
         label="second fast alternate (16/9)",
         caveat="Front camera, one rep of each move back to back. Shorter, but the better framing of the two."),
    Clip(slug="vacilala-los-dos-fast-alt", video_id="jBaHuGXoWBY",
         start=516.52, end=544.38, tempo="fast",
         class_num=14, trust="A", aspect="16/9",
         move="vacilala-los-dos", alternate_for="vacilala-los-dos-fast",
         label="fast alternate (16/9)",
         caveat="This window is the better fit for vacilala-los-dos of the two moves: it contains two los dos reps and only one Vacilala rep. The teacher calls and vocalises the rhythm over the whole window ('hop, king king open, king king, hop') \u2014 not a silent demo. The last ~6s is rhythm vocalisation only."),
    Clip(slug="vacilala-los-dos-fast-alt2", video_id="jBaHuGXoWBY",
         start=468.0, end=477.26, tempo="fast",
         class_num=14, trust="A", aspect="16/9",
         move="vacilala-los-dos", alternate_for="vacilala-los-dos-fast",
         label="second fast alternate (16/9)",
         caveat="One los dos rep at tempo from the front camera, isolated. Too short to publish alone."),
    Clip(slug="tiramisu-fast-alt", video_id="f8Y-b3m070c",
         start=336.86, end=366.2, tempo="fast",
         class_num=15, trust="A", aspect="16/9",
         move="tiramisu", alternate_for="tiramisu-fast",
         label="Full tempo (in class)",
         caveat="Teacher calls the move parts over the music throughout ('bow over', 'the right comes back', 'knee with left'). Two full-tempo runs, the second from 'one more time and go' @355.14."),
    Clip(slug="sombrero-complicado-doble-slow-alt", video_id="H5Idj-uzmn8",
         start=402.6, end=424.2, tempo="slow",
         class_num=16, trust="A", aspect="16/9",
         move="sombrero-complicado-doble", alternate_for="sombrero-complicado-doble-slow",
         label="Slow (side view)",
         caveat="The teachers *announce* this one as slower ('five a bit slower' @402.64), which is stronger provenance than the chapter title on the published window. Contains five clean counted bars with nothing but counting over them. This may be the better window."),
    Clip(slug="sombrero-complicado-doble-fast-alt", video_id="H5Idj-uzmn8",
         start=432.34, end=464.9, tempo="fast",
         class_num=16, trust="A", aspect="16/9",
         move="sombrero-complicado-doble", alternate_for="sombrero-complicado-doble-fast",
         label="Full tempo (in class)",
         caveat="From ~447 the teacher talks over the music while still dancing \u2014 'that signal, I promised last time to show you'. Keep the audio: that sentence is the only pointer to the complicado/doble/triple signal (flag K16-e)."),
    Clip(slug="el-uno-semi-complicado-slow-alt", video_id="uoq2J1txSTE",
         start=392.2, end=424.6, tempo="slow",
         class_num=17, trust="A", aspect="16/9",
         move="el-uno-semi-complicado", alternate_for="el-uno-semi-complicado-slow",
         label="Slow, in combination",
         caveat="A four-move chain, not an isolated demo. Use it to see what the extra turn is *for*; use the 16.8s window to see the turn itself. Counted, no music. Contains El uno semi-complicado @393.98 \u2192 complicado doble @401.98 \u2192 another semi-complicato @408.98 \u2192 Juana la Cubana @411.80."),
    Clip(slug="juana-la-cubana-fast-alt", video_id="uoq2J1txSTE",
         start=493.9, end=534.2, tempo="fast",
         class_num=17, trust="A", aspect="16/9",
         move="juana-la-cubana", alternate_for="juana-la-cubana-fast",
         label="Full tempo (in class)",
         caveat="The teachers call '6 7 and 1' over the music for the whole clip. Whisper produced almost nothing but bare counts here, which is itself evidence that this is a demo rather than an explanation."),
    Clip(slug="dedo-slow-alt", video_id="97Urh5GlCbg",
         start=302.6, end=319.4, tempo="slow",
         class_num=18, trust="A", aspect="16/9",
         move="dedo", alternate_for="dedo-slow",
         label="slow alternate 1",
         caveat="Opposite direction. Under the floor (16.80s)."),
    Clip(slug="dedo-slow-alt2", video_id="97Urh5GlCbg",
         start=321.4, end=341.1, tempo="slow",
         class_num=18, trust="A", aspect="16/9",
         move="dedo", alternate_for="dedo-slow",
         label="slow alternate 2",
         caveat="Explicitly the slowest run in the class. Just under the floor (19.70s). Announced 'one more time the same pitch slower' @319.54."),
    Clip(slug="dedo-fast-alt", video_id="97Urh5GlCbg",
         start=343.6, end=383.2, tempo="fast",
         class_num=18, trust="A", aspect="16/9",
         move="dedo", alternate_for="dedo-fast",
         label="Full tempo (in class)",
         caveat="First ~22s has the teachers calling and vocalising over the music ('King King Fa', 'Chick Chick'); 366\u2013377 is silent dancing. Contains an 11.4s stretch with no transcript at all (366.04 \u2192 377.42.) \u2014 the single strongest available evidence of a genuinely silent full-tempo demo anywhere in this range."),
    Clip(slug="santiago-fast-alt", video_id="M3J7w59rXTE",
         start=498.9, end=543.0, tempo="fast",
         class_num=19, trust="A", aspect="16/9",
         move="santiago", alternate_for="santiago-fast",
         label="Full tempo (in class)",
         caveat="Teachers call the sections over the music. 44.1s \u2014 at the top of the 20\u201345s target range, so trim from the front if a shorter loop is wanted; the second run alone is 521.76 \u2192 543.00 (21.2s)."),
    Clip(slug="release-and-return-slow-alt", video_id="6-cpKa0UMWA",
         start=601.9, end=611.3, tempo="slow",
         class_num=20, trust="V", aspect="16/9",
         move="release-and-return", alternate_for="release-and-return-slow",
         label="The unannounced return",
         caveat="9.40s \u2014 far below the 20s floor, so it is an alternates entry, not published. The only place in the class where the return is demonstrated *without being choreographed*. Kept because it is the single best 9 seconds of evidence for the class's central claim, and a reviewer should see it."),
]


def cut(clip: Clip, out_dir: Path, dry_run: bool) -> tuple[bool, float]:
    """Encode `clip`'s window into out_dir/<slug>.mp4. Returns (success, duration)."""
    dest = out_dir / clip.output_filename

    if dry_run:
        logger.info(f"[DRY RUN] {clip.slug}: {clip.start}-{clip.end} ({clip.duration}s)")
        return True, clip.duration

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

    probe = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(dest)],
        capture_output=True, text=True)
    actual = float(probe.stdout.strip()) if probe.returncode == 0 else 0.0

    kb = dest.stat().st_size // 1024
    drift = abs(actual - clip.duration)
    drift_str = f" [drift {drift:.1f}s]" if drift > 0.2 else ""
    # R2 asks for 23-47s. Anything shorter still gets cut - the spec knows it is
    # short and says so - but it is flagged so a short clip is never a surprise.
    short_str = " [<23s, under the reference floor]" if clip.duration < 23 and not clip.alternate_for else ""
    logger.info(f"OK {clip.slug}: {clip.start}-{clip.end} ({clip.duration}s, {kb} KiB){drift_str}{short_str}")
    return True, actual


def timecode(seconds: float) -> str:
    return f"{int(seconds // 60)}:{seconds % 60:05.2f}"


def write_review_page(clips: list[Clip], out_dir: Path) -> Path:
    """Build a self-contained page that loops every clip with its metadata."""

    def card(c: Clip) -> str:
        badges = [
            f'<span class="badge">{c.duration}s</span>',
            f'<span class="badge trust-{c.trust.lower()}">{c.trust}</span>',
            f'<span class="badge tempo-{c.tempo}">{"SLOW" if c.tempo == "slow" else "FULL TEMPO"}</span>',
            f'<span class="badge aspect">{c.aspect}</span>',
        ]
        if c.alternate_for:
            badges.append('<span class="badge alt">alternate</span>')
        if c.shared_file:
            badges.append(f'<span class="badge shared">SHARED &rarr; {html.escape(c.shared_file)}</span>')
        if c.is_class_clip:
            badges.append('<span class="badge class-clip">CLASS CLIP</span>')

        caveat_html = ""
        if c.caveat:
            caveat_html = f'<p class="caveat"><strong>&#9888;</strong> {html.escape(c.caveat)}</p>'
        if c.notes:
            caveat_html += f'<p class="notes">{html.escape(c.notes)}</p>'

        # Per-clip aspect-ratio, not a hardcoded 16/9. The shorts are 9/16; forcing
        # them into a 16/9 box with object-fit: cover crops away the footwork.
        return f"""
      <figure class="card">
        <video src="{html.escape(c.output_filename)}" loop autoplay muted playsinline preload="metadata"
               style="aspect-ratio: {c.aspect}"></video>
        <figcaption>
          <h2>{html.escape(c.name)}</h2>
          <p class="meta">Class {c.class_num} &middot; {html.escape(c.move or "class clip")} &middot; {c.video_id}</p>
          <p class="times">{timecode(c.start)} &rarr; {timecode(c.end)}
             <span class="dim">(raw {c.start}s &ndash; {c.end}s)</span></p>
          <div class="badges">{''.join(badges)}</div>
          {caveat_html}
        </figcaption>
      </figure>"""

    # Group into slow/fast pairs per move, in playlist order.
    pairs: dict[str, dict[str, Clip | None]] = {}
    for c in clips:
        if c.alternate_for:
            continue
        key = c.move or c.slug
        pairs.setdefault(key, {"slow": None, "fast": None, "class": c.class_num})
        pairs[key][c.tempo] = c

    pairs_html = []
    for key, pair in sorted(pairs.items(), key=lambda kv: kv[1]["class"]):
        slow = card(pair["slow"]) if pair["slow"] else (
            '<div class="missing">No slow (counted) clip &mdash; '
            'this is the grain that matters most for learning.</div>')
        fast = card(pair["fast"]) if pair["fast"] else (
            '<div class="missing">No full-tempo clip.</div>')
        pairs_html.append(
            f'<div class="pair"><h4>Class {pair["class"]} &middot; {html.escape(key)}</h4>'
            f'<div class="two">{slow}{fast}</div></div>')

    alts = [c for c in clips if c.alternate_for]
    alts_html = ('<h3>Alternates (review only, not published)</h3>\n<div class="grid">'
                 + ''.join(card(c) for c in alts) + '</div>')

    doc = f"""<!doctype html>
<meta charset="utf-8">
<title>Salsa couples clips - review</title>
<style>
  :root {{ color-scheme: dark; }}
  body {{ margin: 0; padding: 32px; background: #111; color: #ededed;
         font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }}
  header {{ max-width: 1400px; margin: 0 auto 28px; }}
  h1 {{ margin: 0 0 6px; font-size: 26px; }}
  .sub {{ color: #909090; margin: 0 0 4px; }}
  h3 {{ max-width: 1400px; margin: 36px auto 14px; font-size: 13px;
        text-transform: uppercase; letter-spacing: .12em; color: #fbbf24; }}
  h4 {{ margin: 0 0 8px; font-size: 12px; text-transform: uppercase;
        letter-spacing: .1em; color: #808080; font-weight: 500; }}
  .pair {{ max-width: 1400px; margin: 0 auto 28px; }}
  .two {{ display: grid; gap: 20px; grid-template-columns: 1fr 1fr; align-items: start; }}
  .grid {{ max-width: 1400px; margin: 0 auto;
           display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
           align-items: start; }}
  .card {{ margin: 0; background: #1a1a1a; border: 1px solid rgba(255,255,255,.06);
           border-radius: 14px; overflow: hidden; }}
  video {{ width: 100%; object-fit: contain; background: #000; display: block; max-height: 70vh; }}
  figcaption {{ padding: 14px 16px 16px; }}
  h2 {{ margin: 0 0 4px; font-size: 17px; }}
  .meta {{ margin: 0 0 4px; font-size: 13px; color: #909090; font-family: ui-monospace, Menlo, monospace; }}
  .times {{ margin: 0 0 10px; font-family: ui-monospace, Menlo, monospace; font-size: 12.5px; color: #d0d0d0; }}
  .dim {{ color: #6c6c6c; }}
  .badges {{ display: flex; flex-wrap: wrap; gap: 6px; }}
  .badge {{ font-size: 11px; padding: 3px 8px; border-radius: 999px;
            background: #252525; color: #b8b8b8; }}
  .badge.trust-a {{ background: #1a3a2a; color: #7ce0a0; }}
  .badge.trust-d {{ background: #3a3520; color: #f0d060; }}
  .badge.trust-v {{ background: #3a2520; color: #f0a060; }}
  .badge.tempo-slow {{ background: #20253a; color: #7cc4ff; }}
  .badge.tempo-fast {{ background: #3a2030; color: #ff7cc4; }}
  .badge.aspect {{ background: #202a20; color: #a0c0a0; font-family: ui-monospace, Menlo, monospace; }}
  .badge.alt {{ background: #1e3040; color: #7cc4ff; }}
  .badge.shared {{ background: #40301a; color: #fbbf24; font-weight: 600; }}
  .badge.class-clip {{ background: #2a3a2a; color: #a0e07c; }}
  .caveat {{ margin: 10px 0 0; padding: 8px; background: #2a2018; border-left: 3px solid #f0a060;
             font-size: 12.5px; color: #f0d8c4; font-weight: 400; }}
  .caveat strong {{ font-weight: 400; }}
  .notes {{ margin: 8px 0 0; font-size: 12.5px; color: #8d8d8d; }}
  .missing {{ padding: 20px; border: 1px dashed rgba(255,255,255,.14); border-radius: 14px;
              color: #7a7a7a; font-size: 13px; }}
</style>
<header>
  <h1>Cuban Salsa for Couples - demo clips for review</h1>
  <p class="sub">La Suerte Dance School, "Cuban Salsa - Beginners Course for Couples".
     Windows from SALSA_COUPLES_SPEC_PART1.md (classes 1&ndash;7), PART2 (8&ndash;14)
     and PART3 (15&ndash;21).</p>
  <p class="sub"><strong>Trust grades:</strong> A = both boundaries anchored to a
     transcript event, D = one boundary derived, V = carries a caveat.</p>
  <p class="sub">Clips are muted here so 40 of them can autoplay at once. On the site
     they play unmuted &mdash; the spoken count is the metronome.</p>
  <p class="sub"><strong>What to check:</strong> that the clip shows the named move,
     that a 9/16 short has no title card over the first seconds, and that any clip
     graded V is still usable.</p>
</header>

<h3>Slow / full-tempo pairs</h3>
{''.join(pairs_html)}

{alts_html}
"""
    dest = out_dir / "index.html"
    dest.write_text(doc)
    return dest


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--review", action="store_true",
                        help="write to data/review/salsa-couples/ with an index.html, "
                             "including the alternate candidates")
    parser.add_argument("--only", metavar="SLUG",
                        help="cut only clips whose slug contains this string")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    out_dir = REVIEW_DIR if args.review else PUBLISH_DIR
    clips = CLIPS + (ALTERNATES if args.review else [])

    if args.only:
        clips = [c for c in clips if args.only in c.slug]
        if not clips:
            logger.error(f"No clips match --only '{args.only}'")
            sys.exit(1)
        logger.info(f"Filtered to {len(clips)} clip(s) matching '{args.only}'")

    # A clip that names shared_file is a reference, not a file to encode. Dedupe by
    # window as well, so a window recorded twice never gets encoded twice.
    seen: set[tuple[str, float, float]] = set()
    to_encode: list[Clip] = []
    for c in clips:
        if c.shared_file:
            continue
        key = (c.video_id, c.start, c.end)
        if key in seen:
            continue
        seen.add(key)
        to_encode.append(c)

    # Missing sources are reported and skipped, not fatal: classes 17-21 are not
    # downloaded yet and the other 29 clips must still land.
    missing = [c for c in to_encode if not c.source_path.exists()]
    to_encode = [c for c in to_encode if c.source_path.exists()]

    out_dir.mkdir(parents=True, exist_ok=True)
    logger.info(f"Encoding {len(to_encode)} clips into {out_dir}")

    failed: list[str] = []
    drifts: list[str] = []
    total = 0

    for c in to_encode:
        ok, actual = cut(c, out_dir, args.dry_run)
        if not ok:
            failed.append(c.slug)
        elif not args.dry_run:
            total += (out_dir / c.output_filename).stat().st_size
            if abs(actual - c.duration) > 0.3:
                drifts.append(f"{c.slug}: expected {c.duration}s, got {actual:.1f}s")

    if drifts:
        logger.warning("Duration drifts > 0.3s:")
        for d in drifts:
            logger.warning(f"  {d}")

    if missing:
        by_video: dict[str, list[str]] = {}
        for c in missing:
            by_video.setdefault(c.video_id, []).append(c.slug)
        logger.warning(f"SKIPPED {len(missing)} clip(s) - source video not downloaded:")
        for vid, slugs in sorted(by_video.items()):
            cls = next(c.class_num for c in missing if c.video_id == vid)
            logger.warning(f"  {vid} (class {cls}): {', '.join(sorted(slugs))}")
        slow = [c.slug for c in missing if c.tempo == "slow"]
        if slow:
            logger.warning(f"  Of those, {len(slow)} are SLOW (counted) clips: {', '.join(sorted(slow))}")

    if not args.dry_run:
        logger.info(f"Total size: {total / (1024 * 1024):.1f} MB")

    if args.review and not args.dry_run:
        # The review page lists every window, including the skipped ones, so the
        # gaps are visible rather than silently absent.
        logger.info(f"Review page: {write_review_page(clips, out_dir)}")

    if failed:
        logger.error(f"Failed to encode: {', '.join(failed)}")
        sys.exit(1)

    logger.info("Done.")


if __name__ == "__main__":
    main()

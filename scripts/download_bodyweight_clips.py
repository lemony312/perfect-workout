"""
Download real exercise demonstration clips from YouTube for bodyweight exercises.

For each exercise, searches YouTube for a short demonstration video, downloads
~15 seconds, and crops to 9:16 vertical format at 1080x1920.
"""

import json
import subprocess
import sys
import tempfile
import time
from pathlib import Path

PROJECT_ROOT = Path("/Users/louis.boguslav/Documents/perfect-workout")
CLIPS_DIR = PROJECT_ROOT / "frontend" / "public" / "clips" / "bodyweight"
MANIFEST_PATH = PROJECT_ROOT / "frontend" / "public" / "clips" / "manifest.json"

EXERCISES = [
    "Scapula Push-ups",
    "Incline Push-ups",
    "Decline Push-ups",
    "Archer Push-ups",
    "Push-up Plus",
    "Deficit Push-up Ladder",
    "Band Pull Apart",
    "Wide Push-ups",
    "Pseudo Planche Push-ups",
    "Hindu Push-ups",
    "Typewriter Push-ups",
    "Push-up Burnout 21s",
    "Bodyweight Triceps Extensions",
    "Diamond Push-ups",
    "Bench Dips",
    "Cobra Push-ups",
    "Pike Push-ups",
    "Wall Handstand Hold",
    "Prone I-Y-T Raises",
    "Scap Pull-ups",
    "Pull-ups",
    "Inverted Rows overhand",
    "Prone Y-T-W Raises",
    "Superman Hold",
    "Dead Hang",
    "Band Face Pulls",
    "Commando Pull-ups",
    "Inverted Rows underhand",
    "Sliding Pullover",
    "Reverse Snow Angels",
    "Flexed Arm Hang",
    "Chin-ups",
    "Inverted Curls supinated",
    "Doorway Curls",
    "Headbanger Pull-ups",
    "Close-Grip Chin-ups",
    "Pelican Curls",
    "Inverted Curls 1.5 rep",
    "Towel Isometric Curls",
    "Bodyweight Squats",
    "Pistol Squats",
    "Bulgarian Split Squats",
    "Reverse Lunges",
    "Nordic Hamstring Curls",
    "Single Leg Calf Raises",
    "Cossack Squats",
    "Shrimp Squats",
    "Step-ups high box",
    "Walking Lunges",
    "Sliding Hamstring Curls",
    "Wall Sit Calf Raises",
    "Dead Bugs",
    "Ab Wheel Rollout Body Saw",
    "Hanging Leg Raises",
    "Side Plank Hip Dip",
    "Reverse Crunches",
    "Pallof Press Plank Shoulder Taps",
    "Dragon Flag Negatives",
    "Hollow Body Hold",
]

# Map search-friendly name -> manifest slug(s) it covers
# (some exercises appear in manifest with slightly different names)
SLUG_MAP = {
    "Scapula Push-ups": ["scapula-push-ups"],
    "Incline Push-ups": ["incline-push-ups-to-flat-push-ups"],
    "Decline Push-ups": ["decline-push-ups"],
    "Archer Push-ups": ["archer-push-ups"],
    "Push-up Plus": ["push-up-plus"],
    "Deficit Push-up Ladder": ["deficit-push-up-ladder"],
    "Band Pull Apart": ["band-pull-apart-primer"],
    "Wide Push-ups": ["wide-push-ups"],
    "Pseudo Planche Push-ups": ["pseudo-planche-push-ups"],
    "Hindu Push-ups": ["hindu-push-ups"],
    "Typewriter Push-ups": ["typewriter-push-ups"],
    "Push-up Burnout 21s": ["push-up-burnout-21s"],
    "Bodyweight Triceps Extensions": ["bodyweight-triceps-extensions"],
    "Diamond Push-ups": ["diamond-push-ups"],
    "Bench Dips": ["bench-dips"],
    "Cobra Push-ups": ["cobra-push-ups"],
    "Pike Push-ups": ["pike-push-ups"],
    "Wall Handstand Hold": ["wall-handstand-hold"],
    "Prone I-Y-T Raises": ["prone-i-y-t-raises"],
    "Scap Pull-ups": ["scap-pull-ups"],
    "Pull-ups": ["pull-ups"],
    "Inverted Rows overhand": ["inverted-rows-overhand-wide"],
    "Prone Y-T-W Raises": ["prone-y-t-w-raises"],
    "Superman Hold": ["superman-hold"],
    "Dead Hang": ["dead-hang"],
    "Band Face Pulls": ["band-face-pulls-primer"],
    "Commando Pull-ups": ["commando-pull-ups"],
    "Inverted Rows underhand": ["inverted-rows-underhand-close"],
    "Sliding Pullover": ["sliding-pullover"],
    "Reverse Snow Angels": ["reverse-snow-angels"],
    "Flexed Arm Hang": ["flexed-arm-hang"],
    "Chin-ups": ["chin-ups"],
    "Inverted Curls supinated": ["inverted-curls-supinated"],
    "Doorway Curls": ["doorway-curls"],
    "Headbanger Pull-ups": ["headbanger-pull-ups"],
    "Close-Grip Chin-ups": ["close-grip-chin-ups"],
    "Pelican Curls": ["pelican-curls-rings-bar"],
    "Inverted Curls 1.5 rep": ["inverted-curls-1.5-rep"],
    "Towel Isometric Curls": ["towel-isometric-curls"],
    "Bodyweight Squats": ["bodyweight-squats"],
    "Pistol Squats": ["pistol-squats-assisted-if-needed"],
    "Bulgarian Split Squats": ["bulgarian-split-squats"],
    "Reverse Lunges": ["reverse-lunges"],
    "Nordic Hamstring Curls": ["nordic-hamstring-curls"],
    "Single Leg Calf Raises": ["single-leg-calf-raises"],
    "Cossack Squats": ["cossack-squats"],
    "Shrimp Squats": ["shrimp-squats-assisted-if-needed"],
    "Step-ups high box": ["step-ups-high-box"],
    "Walking Lunges": ["walking-lunges"],
    "Sliding Hamstring Curls": ["sliding-hamstring-curls"],
    "Wall Sit Calf Raises": ["wall-sit-calf-raises"],
    "Dead Bugs": ["dead-bugs"],
    "Ab Wheel Rollout Body Saw": ["ab-wheel-rollout-body-saw"],
    "Hanging Leg Raises": ["hanging-leg-raises"],
    "Side Plank Hip Dip": ["side-plank-hip-dip"],
    "Reverse Crunches": ["reverse-crunches"],
    "Pallof Press Plank Shoulder Taps": ["pallof-press-band-plank-shoulder-taps"],
    "Dragon Flag Negatives": ["dragon-flag-negatives"],
    "Hollow Body Hold": ["hollow-body-hold"],
}


def search_and_download(exercise_name: str, output_path: Path) -> bool:
    """Search YouTube for exercise demo and download a clipped vertical video."""
    search_query = f"{exercise_name} exercise demonstration form"

    with tempfile.TemporaryDirectory() as tmpdir:
        raw_path = Path(tmpdir) / "raw.mp4"

        # Download first 20 seconds of top search result
        dl_cmd = [
            "yt-dlp",
            f"ytsearch1:{search_query}",
            "-f", "bv*[height<=720]+ba/b[height<=720]/bv*+ba/b",
            "--download-sections", "*0-20",
            "--force-keyframes-at-cuts",
            "-o", str(raw_path),
            "--merge-output-format", "mp4",
            "--no-playlist",
            "--quiet",
            "--no-warnings",
        ]

        result = subprocess.run(dl_cmd, capture_output=True, text=True, timeout=120)
        if result.returncode != 0 or not raw_path.exists():
            print(f"  yt-dlp failed: {result.stderr[-200:] if result.stderr else 'no output'}")
            return False

        # Crop to 9:16 vertical and trim to 12s
        crop_cmd = [
            "ffmpeg", "-y",
            "-i", str(raw_path),
            "-t", "12",
            "-vf", "crop=ih*9/16:ih,scale=1080:1920",
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "23",
            "-an",
            "-pix_fmt", "yuv420p",
            str(output_path),
        ]

        result = subprocess.run(crop_cmd, capture_output=True, text=True, timeout=60)
        if result.returncode != 0:
            print(f"  ffmpeg failed: {result.stderr[-200:] if result.stderr else 'no output'}")
            return False

    return output_path.exists() and output_path.stat().st_size > 5000


def main():
    CLIPS_DIR.mkdir(parents=True, exist_ok=True)

    total = len(EXERCISES)
    success = 0
    failed = []

    for i, exercise in enumerate(EXERCISES, 1):
        slugs = SLUG_MAP[exercise]
        output_path = CLIPS_DIR / f"{slugs[0]}.mp4"

        print(f"[{i:2d}/{total}] {exercise}")

        if search_and_download(exercise, output_path):
            size_kb = output_path.stat().st_size / 1024
            print(f"         -> {slugs[0]}.mp4 ({size_kb:.0f} KB)")
            success += 1
        else:
            print(f"         FAILED")
            failed.append(exercise)

        # Rate limit: small pause between downloads
        if i < total:
            time.sleep(2)

    print(f"\nDone: {success}/{total} clips downloaded")
    if failed:
        print(f"Failed ({len(failed)}):")
        for name in failed:
            print(f"  - {name}")


if __name__ == "__main__":
    main()

"""
Generate visually distinct placeholder clips for bodyweight exercises.

Each clip is a 12-second 1080x1920 (9:16) video with:
- Muscle-group-themed gradient background
- Animated elements (moving bars, pulsing boxes)
- Distinct color per muscle group matching the frontend theme
"""

import json
import subprocess
import sys
from pathlib import Path

PROJECT_ROOT = Path("/Users/louis.boguslav/Documents/perfect-workout")
CLIPS_DIR = PROJECT_ROOT / "frontend" / "public" / "clips" / "bodyweight"
MANIFEST_PATH = PROJECT_ROOT / "frontend" / "public" / "clips" / "manifest.json"

MUSCLE_COLORS = {
    "Chest":     {"bg": "1a0505", "mid": "991b1b", "accent": "f87171"},
    "Back":      {"bg": "050d1a", "mid": "1e3a5f", "accent": "60a5fa"},
    "Legs":      {"bg": "021a0a", "mid": "14532d", "accent": "4ade80"},
    "Triceps":   {"bg": "0f051a", "mid": "4c1d95", "accent": "a78bfa"},
    "Biceps":    {"bg": "1a0f02", "mid": "78350f", "accent": "fbbf24"},
    "Shoulders": {"bg": "1a0a02", "mid": "9a3412", "accent": "fb923c"},
    "Core":      {"bg": "021a17", "mid": "115e59", "accent": "2dd4bf"},
}

EXERCISES = {
    "bodyweight-chest": {
        "muscle": "Chest",
        "workout1": [
            "Scapula Push-ups",
            "Incline Push-ups → Flat Push-ups",
            "Decline Push-ups",
            "Archer Push-ups",
            "Push-up Plus",
            "Deficit Push-up Ladder",
        ],
        "workout2": [
            "Band Pull Apart (Primer)",
            "Wide Push-ups",
            "Pseudo Planche Push-ups",
            "Hindu Push-ups",
            "Typewriter Push-ups",
            "Push-up Burnout 21s",
        ],
    },
    "bodyweight-triceps": {
        "muscle": "Triceps",
        "workout1": [
            "Bodyweight Triceps Extensions",
            "Diamond Push-ups",
            "Bench Dips",
            "Cobra Push-ups",
        ],
        "workout2": [
            "Bodyweight Triceps Extensions",
            "Diamond Push-ups",
            "Bench Dips",
            "Cobra Push-ups",
        ],
    },
    "bodyweight-shoulders": {
        "muscle": "Shoulders",
        "workout1": [
            "Pike Push-ups",
            "Wall Handstand Hold",
            "Prone I-Y-T Raises",
        ],
        "workout2": [
            "Pike Push-ups",
            "Wall Handstand Hold",
            "Prone I-Y-T Raises",
        ],
    },
    "bodyweight-back": {
        "muscle": "Back",
        "workout1": [
            "Scap Pull-ups",
            "Pull-ups",
            "Inverted Rows (overhand wide)",
            "Prone Y-T-W Raises",
            "Superman Hold",
            "Dead Hang",
        ],
        "workout2": [
            "Band Face Pulls (Primer)",
            "Commando Pull-ups",
            "Inverted Rows (underhand close)",
            "Sliding Pullover",
            "Reverse Snow Angels",
            "Flexed Arm Hang",
        ],
    },
    "bodyweight-biceps": {
        "muscle": "Biceps",
        "workout1": [
            "Chin-ups",
            "Inverted Curls (supinated)",
            "Doorway Curls",
            "Headbanger Pull-ups",
        ],
        "workout2": [
            "Close-Grip Chin-ups",
            "Pelican Curls (rings/bar)",
            "Inverted Curls (1.5 rep)",
            "Towel Isometric Curls",
        ],
    },
    "bodyweight-legs": {
        "muscle": "Legs",
        "workout1": [
            "Bodyweight Squats",
            "Pistol Squats (assisted if needed)",
            "Bulgarian Split Squats",
            "Reverse Lunges",
            "Nordic Hamstring Curls",
            "Single Leg Calf Raises",
        ],
        "workout2": [
            "Cossack Squats",
            "Shrimp Squats (assisted if needed)",
            "Step-ups (high box)",
            "Walking Lunges",
            "Sliding Hamstring Curls",
            "Wall Sit + Calf Raises",
        ],
    },
    "bodyweight-core": {
        "muscle": "Core",
        "workout1": [
            "Dead Bugs",
            "Ab Wheel Rollout / Body Saw",
            "Hanging Leg Raises",
            "Side Plank + Hip Dip",
        ],
        "workout2": [
            "Reverse Crunches",
            "Pallof Press (band) / Plank Shoulder Taps",
            "Dragon Flag Negatives",
            "Hollow Body Hold",
        ],
    },
}


def to_slug(name: str) -> str:
    import re
    s = name.lower()
    s = s.replace("→", "to")
    s = s.replace(" ", "-")
    s = s.replace("(", "").replace(")", "")
    s = s.replace("/", "-")
    s = re.sub(r'[^a-z0-9.\-]', '', s)
    s = re.sub(r'-+', '-', s)
    return s.strip('-')


def generate_clip(muscle: str, idx: int, output_path: Path) -> bool:
    c = MUSCLE_COLORS[muscle]
    phase = idx * 0.7

    vf = (
        f"color=c=0x{c['bg']}:s=1080x1920:d=12:r=30,"
        f"drawbox=x=0:y=0:w=1080:h=400:color=0x{c['mid']}@0.4:t=fill,"
        f"drawbox=x=0:y='900+60*sin(t*1.5+{phase:.1f})':w=1080:h=4:color=0x{c['accent']}@0.6:t=fill,"
        f"drawbox=x='(1080-w)/2':y='(1920-h)/2':w='180+40*sin(t*2+{phase:.1f})':h='180+40*sin(t*2+{phase:.1f})':color=0x{c['accent']}@0.12:t=fill,"
        f"drawbox=x='(1080-w)/2':y='(1920-h)/2':w='100+20*sin(t*2.5+{phase:.1f})':h='100+20*sin(t*2.5+{phase:.1f})':color=0x{c['accent']}@0.25:t=3,"
        f"drawbox=x='(1080-w)/2':y=1700:w='300+80*sin(t*1.2+{phase:.1f})':h=3:color=0x{c['accent']}@0.4:t=fill,"
        f"drawbox=x=40:y=40:w=50:h=50:color=0x{c['accent']}@0.15:t=2,"
        f"drawbox=x=990:y=40:w=50:h=50:color=0x{c['accent']}@0.15:t=2,"
        f"drawbox=x=40:y=1830:w=50:h=50:color=0x{c['accent']}@0.15:t=2,"
        f"drawbox=x=990:y=1830:w=50:h=50:color=0x{c['accent']}@0.15:t=2"
    )

    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi",
        "-i", vf,
        "-c:v", "libx264",
        "-preset", "ultrafast",
        "-crf", "30",
        "-pix_fmt", "yuv420p",
        "-t", "12",
        "-an",
        str(output_path),
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    if result.returncode != 0:
        print(f"  FAILED: {output_path.name}")
        print(f"  stderr: {result.stderr[-300:]}")
        return False
    return True


def main():
    CLIPS_DIR.mkdir(parents=True, exist_ok=True)

    with open(MANIFEST_PATH) as f:
        manifest = json.load(f)

    total = 0
    success = 0
    seen_slugs = set()

    for video_id, data in EXERCISES.items():
        muscle = data["muscle"]
        if video_id not in manifest:
            manifest[video_id] = {}

        for workout_key in ["workout1", "workout2"]:
            exercises = data[workout_key]
            manifest_entries = []

            for idx, name in enumerate(exercises):
                slug = to_slug(name)
                output_path = CLIPS_DIR / f"{slug}.mp4"
                total += 1

                if slug not in seen_slugs:
                    seen_slugs.add(slug)
                    print(f"[{total:2d}] {muscle:10s} | {name}")
                    if generate_clip(muscle, idx, output_path):
                        success += 1
                        size_kb = output_path.stat().st_size / 1024
                        print(f"       -> {slug}.mp4 ({size_kb:.0f} KB)")
                else:
                    print(f"[{total:2d}] {muscle:10s} | {name} (reuse)")
                    success += 1

                manifest_entries.append({
                    "exercise": name,
                    "slug": slug,
                    "file": f"bodyweight/{slug}.mp4",
                    "duration": 12,
                })

            manifest[video_id][workout_key] = manifest_entries

    with open(MANIFEST_PATH, "w") as f:
        json.dump(manifest, f, indent=2)

    print(f"\nDone: {success}/{total} clips generated")
    print(f"Manifest updated: {MANIFEST_PATH}")


if __name__ == "__main__":
    main()

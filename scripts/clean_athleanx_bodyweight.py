"""
Clean false positives from the AthleanX bodyweight video catalog.

The discovery script matches on broad keywords (e.g. "home workout",
"calisthenics"), which sweeps in videos that aren't actually bodyweight
exercise content: equipment-based workouts, pure diet/motivation talks, gear
reviews, etc. This pass re-classifies each video and splits the catalog into
a cleaned "bodyweight" list plus a "rejected" list (with reasons), so the
filtering is auditable rather than silent.

Usage:
    uv run python scripts/clean_athleanx_bodyweight.py [--write]

Without --write it prints a dry-run report. With --write it updates
data/athleanx_bodyweight_videos.json in place (keeping only kept videos) and
writes the rejects to data/athleanx_bodyweight_rejected.json.
"""

import json
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path("/Users/louis.boguslav/Documents/perfect-workout")
DATA_DIR = PROJECT_ROOT / "data"
CATALOG = DATA_DIR / "athleanx_bodyweight_videos.json"
REJECTED = DATA_DIR / "athleanx_bodyweight_rejected.json"

# Equipment that disqualifies a video from being "bodyweight focused".
# Matched as whole words against title + description.
EQUIPMENT_TERMS = [
    "dumbbell", "dumbbells", "barbell", "barbells", "kettlebell", "kettlebells",
    "medicine ball", "med ball", "cable", "machine", "smith machine",
    "treadmill", "resistance band only", "trap bar", "ez bar", "landmine",
    "deadlift", "bench press",
]
# Bands and pull-up bars are allowed (used in the app's bodyweight program),
# so they are intentionally NOT in EQUIPMENT_TERMS.

# Titles that are talks/diet/gear, not an exercise demo or workout.
# Only clear non-exercise content — pain/mobility/posture videos are kept
# because they are still bodyweight movement content.
NON_WORKOUT_TERMS = [
    "body fat", "skinny fat", "get lean", "burn fat", "fat loss",
    "fat burning", "how many reps", "how much weight",
    "best home gym equipment", "what nobody tells you",
    "what really makes you fat", "build muscle and burn fat",
    "measure body fat", "non-workout days", "begging you", "i'll prove it",
    "pros and cons", "worth it or not", "workout motivation",
    "workout consistency", "workout split is best", "skinny guys",
    "build muscle at 40", "over 40 workouts fail",
]

# Strong positive signals. Aligned with the discovery keyword set (every
# catalogued video matched at least one of these) PLUS explicit bodyweight
# exercise names. Bands and pull-up bars are allowed, so "with bands" /
# "no weights" count as positive. If any of these appear we keep the video.
STRONG_POSITIVE = [
    "bodyweight", "body weight", "no equipment", "calisthenics",
    "home workout", "at home", "in the home", "home edition", "no gym",
    "no weights", "without weights", "with bands", "no pullup bar",
    "no pull-up bar", "push-up", "pushup", "push up", "pull-up", "pullup",
    "pull up", "chin-up", "chinup", "dip", "squat", "plank", "lunge",
    "ab workout", "abs workout", "core workout", "front lever",
    "muscle up", "handstand", "gymnast", "no machines",
    # AthleanX corrective / mobility content is bodyweight (or band) by nature
    "fix knee pain", "fix shoulder pain", "fix elbow pain", "fix back pain",
    "fix upper back pain", "fix low back", "low back pain", "tennis elbow",
    "neck exercises", "fix bad posture", "posture", "mobility", "impingement",
]


def _has_word(text: str, term: str) -> bool:
    # phrase match for multi-word terms, word-boundary match for single words
    if " " in term:
        return term in text
    return re.search(rf"\b{re.escape(term)}\b", text) is not None


def classify(video: dict) -> tuple[bool, str]:
    """Return (keep, reason)."""
    title = (video.get("title") or "").lower()
    desc = (video.get("description") or "").lower()
    text = f"{title} {desc}"

    # Hard equipment disqualifier (check title primarily to avoid description
    # false hits like "no dumbbells needed").
    for term in EQUIPMENT_TERMS:
        if _has_word(title, term):
            # "no <equipment>" / "without <equipment>" is actually a positive
            neg_ctx = re.search(rf"(no|without|instead of)\s+\w*\s*{re.escape(term)}", title)
            if not neg_ctx:
                return False, f"equipment: {term}"

    has_positive = any(_has_word(text, p) for p in STRONG_POSITIVE)

    # Non-workout talk/diet content, unless it's clearly a bodyweight piece.
    for term in NON_WORKOUT_TERMS:
        if _has_word(title, term) and not has_positive:
            return False, f"non-workout: {term}"

    if not has_positive:
        return False, "no bodyweight signal in title/description"

    return True, "ok"


def main() -> None:
    write = "--write" in sys.argv
    data = json.loads(CATALOG.read_text())
    videos = data["videos"]

    kept, rejected = [], []
    for v in videos:
        keep, reason = classify(v)
        (kept if keep else rejected).append({**v, "_filter_reason": reason})

    print(f"Catalog: {len(videos)} videos")
    print(f"  keep:   {len(kept)}")
    print(f"  reject: {len(rejected)}\n")
    print("--- Rejected ---")
    for v in sorted(rejected, key=lambda x: x["_filter_reason"]):
        print(f"  [{v['_filter_reason']:<32}] {v['title'][:60]}")

    if write:
        for v in kept:
            v.pop("_filter_reason", None)
        data["videos"] = kept
        data["total_videos"] = len(kept)
        CATALOG.write_text(json.dumps(data, indent=2, ensure_ascii=False))
        REJECTED.write_text(json.dumps(
            {"rejected_count": len(rejected), "videos": rejected},
            indent=2, ensure_ascii=False,
        ))
        print(f"\nWrote {len(kept)} kept -> {CATALOG.name}")
        print(f"Wrote {len(rejected)} rejected -> {REJECTED.name}")
    else:
        print("\n(dry run — pass --write to apply)")


if __name__ == "__main__":
    main()

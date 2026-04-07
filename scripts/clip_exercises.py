"""
AthleanX Exercise Video Clipper for TikTok Format

This script downloads full workout videos and clips individual exercises into
vertical 9:16 TikTok-format shorts. Each exercise is extracted based on manually
defined timestamps and saved as a standalone video file.

Features:
- Downloads videos using the existing downloader module with caching
- Clips exercises using ffmpeg with center-crop to 9:16 aspect ratio
- Generates a JSON manifest of all clips for frontend consumption
- Supports selective processing by video ID
- Idempotent operation (skips existing clips unless --force)
- Dry-run mode for validation

Usage:
    uv run scripts/clip_exercises.py                    # Process all videos
    uv run scripts/clip_exercises.py --video-id {id}    # Process single video
    uv run scripts/clip_exercises.py --skip-download    # Only clip (assumes cached)
    uv run scripts/clip_exercises.py --dry-run          # Show what would be done
    uv run scripts/clip_exercises.py --force            # Overwrite existing clips
"""

import argparse
import json
import logging
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional

# Add scripts directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))
from downloader import download_video, extract_video_id, VIDEO_CACHE_DIR

# ============================================================================
# Configuration
# ============================================================================

PROJECT_ROOT = Path("/Users/louis.boguslav/Documents/perfect-workout")
CLIPS_OUTPUT_DIR = PROJECT_ROOT / "frontend" / "public" / "clips"
MANIFEST_PATH = CLIPS_OUTPUT_DIR / "manifest.json"

# Video quality for download (720p is sufficient for TikTok crops)
DOWNLOAD_QUALITY = "720p"

# FFmpeg settings for TikTok vertical format
OUTPUT_WIDTH = 1080
OUTPUT_HEIGHT = 1920
VIDEO_CODEC = "libx264"
VIDEO_PRESET = "fast"
VIDEO_CRF = 23  # Constant rate factor (18-28, lower = better quality)
AUDIO_CODEC = "aac"
AUDIO_BITRATE = "128k"

# Logging
logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


# ============================================================================
# Data Models
# ============================================================================

@dataclass
class Exercise:
    """Represents a single exercise with timing information."""
    name: str
    start_time: int  # seconds
    end_time: int    # seconds

    @property
    def duration(self) -> int:
        """Duration in seconds."""
        return self.end_time - self.start_time

    @property
    def slug(self) -> str:
        """URL-friendly slug for the exercise. Must match frontend toSlug()."""
        import re
        s = self.name.lower()
        s = s.replace("→", "to")
        s = s.replace(" ", "-")
        s = s.replace("(", "").replace(")", "")
        s = s.replace("/", "-")
        s = re.sub(r'[^a-z0-9.\-]', '', s)
        s = re.sub(r'-+', '-', s)
        return s.strip('-')


@dataclass
class Workout:
    """Represents a workout containing multiple exercises."""
    name: str  # e.g., "workout1" or "workout2"
    exercises: List[Exercise]


@dataclass
class VideoInfo:
    """Represents a video with its workouts."""
    video_id: str
    title: str
    workouts: List[Workout]


# ============================================================================
# Exercise Timestamp Data
# ============================================================================

EXERCISE_DATA: Dict[str, VideoInfo] = {
    # ── Chest ──────────────────────────────────────────────────────────────
    "zD266B2jk0s": VideoInfo(
        video_id="zD266B2jk0s",
        title="Chest",
        workouts=[
            Workout(
                name="workout1",
                exercises=[
                    Exercise("Banded ER (Primer)", 236, 248),
                    Exercise("Incline DB Bench Press", 340, 352),
                    Exercise("Crossovers", 390, 402),
                    Exercise("Floor Flys", 478, 490),
                    Exercise("Deficit 1.5 Rep Ladder Pushups", 558, 572),
                    Exercise("Dips", 610, 622),
                ]
            ),
            Workout(
                name="workout2",
                exercises=[
                    Exercise("Band Pull Apart (Primer)", 675, 687),
                    Exercise("Flat DB Bench Press", 718, 730),
                    Exercise("High-to-Low Crossover", 750, 762),
                    Exercise("Incline Cable Press", 800, 812),
                    Exercise("Dip (1.5 Rep Ladder)", 838, 852),
                    Exercise("Prison Yard Pushup", 878, 892),
                ]
            ),
        ]
    ),
    # ── Back ───────────────────────────────────────────────────────────────
    "fX36liNtKzw": VideoInfo(
        video_id="fX36liNtKzw",
        title="Back",
        workouts=[
            Workout(
                name="workout1",
                exercises=[
                    Exercise("Scap Pulldown (Primer)", 218, 231),
                    Exercise("Seated Cable Rows (elbows wide)", 263, 277),
                    Exercise("Lat Pulldowns (narrow grip)", 325, 338),
                    Exercise("Straight Arm Pushdowns", 398, 411),
                    Exercise("1.5 Rep DB Pullover Ladder", 458, 471),
                    Exercise("Bodyweight/Banded Pullups", 523, 536),
                ]
            ),
            Workout(
                name="workout2",
                exercises=[
                    Exercise("Face Pulls (Primer)", 595, 608),
                    Exercise("Barbell Row", 616, 629),
                    Exercise("Wide Grip Lat Pulldown", 664, 677),
                    Exercise("DB High Pull", 719, 732),
                    Exercise("1.5 Rep High Cable Row Ladder", 776, 790),
                    Exercise("Inverted Row", 829, 842),
                ]
            ),
        ]
    ),
    # ── Legs ───────────────────────────────────────────────────────────────
    "QXtXEug0PLU": VideoInfo(
        video_id="QXtXEug0PLU",
        title="Legs",
        workouts=[
            Workout(
                name="workout1",
                exercises=[
                    Exercise("Reverse Hyper (Primer)", 198, 210),
                    Exercise("Deadlifts", 253, 265),
                    Exercise("Barbell Front Squats", 335, 347),
                    Exercise("Alternating DB Reverse Lunges", 400, 413),
                    Exercise("Seated Hamstring Curls", 470, 482),
                    Exercise("Standing Calf Raises", 530, 542),
                ]
            ),
            Workout(
                name="workout2",
                exercises=[
                    Exercise("Banded Overhead Squat (Primer)", 622, 635),
                    Exercise("Barbell Squat", 670, 682),
                    Exercise("Barbell Hip Thrust", 755, 768),
                    Exercise("DB Spanish Squat", 835, 848),
                    Exercise("Glute-Ham Raise (GHR)", 878, 891),
                    Exercise("Seated Calf Raises", 962, 975),
                ]
            ),
        ]
    ),
    # ── Triceps ────────────────────────────────────────────────────────────
    "8Nkfuhxsl-0": VideoInfo(
        video_id="8Nkfuhxsl-0",
        title="Triceps",
        workouts=[
            Workout(
                name="workout1",
                exercises=[
                    Exercise("Triceps Pushdowns", 197, 210),
                    Exercise("Lying DB Extensions", 253, 266),
                    Exercise("DB/Cable Triceps Kickbacks", 337, 350),
                    Exercise("Cobra Pushups", 408, 420),
                ]
            ),
            Workout(
                name="workout2",
                exercises=[
                    Exercise("PJR Pullover", 495, 508),
                    Exercise("Cable Tricep Push Away", 545, 558),
                    Exercise("X Push Down", 597, 610),
                    Exercise("Bench Dip", 672, 685),
                ]
            ),
        ]
    ),
    # ── Biceps ─────────────────────────────────────────────────────────────
    "hmeTQHsBwv8": VideoInfo(
        video_id="hmeTQHsBwv8",
        title="Biceps",
        workouts=[
            Workout(
                name="workout1",
                exercises=[
                    Exercise("Barbell Strict Curl to Cheat Curls", 120, 132),
                    Exercise("DB Cross Body Hammer Curls", 206, 218),
                    Exercise("Cable Stretch Drag Curls", 295, 308),
                    Exercise("Mentzer Pulldowns (Trap Set)", 357, 370),
                ]
            ),
            Workout(
                name="workout2",
                exercises=[
                    Exercise("Chin-Up Curls", 415, 428),
                    Exercise("DB Spider Curl", 460, 472),
                    Exercise("DB Incline Curl", 515, 528),
                    Exercise("Standing DB Curl Trap Set", 566, 579),
                ]
            ),
        ]
    ),
    # ── Shoulders ──────────────────────────────────────────────────────────
    "zEf4pKoKc70": VideoInfo(
        video_id="zEf4pKoKc70",
        title="Shoulders",
        workouts=[
            Workout(
                name="workout1",
                exercises=[
                    Exercise("DB Single Arm OHP / Barbell OHP", 112, 125),
                    Exercise("DB Lateral Raises (Straight Arm to Bent Arm)", 195, 209),
                    Exercise("DB Rear Delt Rows", 247, 260),
                ]
            ),
            Workout(
                name="workout2",
                exercises=[
                    Exercise("DB Cheat Lateral Raise", 323, 337),
                    Exercise("Incline Stretch Front Raise", 393, 407),
                    Exercise("Face Pulls", 434, 447),
                ]
            ),
        ]
    ),
}


# ============================================================================
# Video Download
# ============================================================================

def ensure_video_downloaded(video_id: str, skip_download: bool = False) -> Optional[Path]:
    """
    Ensure video is downloaded and cached.

    Args:
        video_id: YouTube video ID
        skip_download: If True, only check cache without downloading

    Returns:
        Path to the cached video file, or None if not available
    """
    video_url = f"https://www.youtube.com/watch?v={video_id}"

    # Check if video is already cached
    from downloader import get_cache_path
    cache_path = get_cache_path(video_id, DOWNLOAD_QUALITY)

    if cache_path.exists():
        logger.info(f"Video {video_id} already cached at {cache_path}")
        return cache_path

    if skip_download:
        logger.warning(f"Video {video_id} not cached and --skip-download specified")
        return None

    # Download the video
    logger.info(f"Downloading video {video_id}...")
    try:
        video_path = download_video(
            video_url,
            quality=DOWNLOAD_QUALITY,
            use_cache=True,
        )
        logger.info(f"Downloaded video to {video_path}")
        return video_path
    except Exception as e:
        logger.error(f"Failed to download video {video_id}: {e}")
        return None


# ============================================================================
# Video Clipping with FFmpeg
# ============================================================================

def clip_exercise(
    input_video: Path,
    output_path: Path,
    exercise: Exercise,
    dry_run: bool = False,
    force: bool = False,
) -> bool:
    """
    Clip a single exercise from the full video using ffmpeg.

    Args:
        input_video: Path to the full video file
        output_path: Path where the clip should be saved
        exercise: Exercise object with timing information
        dry_run: If True, only show what would be done
        force: If True, overwrite existing clips

    Returns:
        True if successful (or skipped), False if failed
    """
    # Check if clip already exists
    if output_path.exists() and not force:
        logger.info(f"Clip already exists (skipping): {output_path.name}")
        return True

    duration = exercise.duration

    if dry_run:
        logger.info(
            f"[DRY RUN] Would clip: {exercise.name} "
            f"({exercise.start_time}s-{exercise.end_time}s, {duration}s) "
            f"-> {output_path.name}"
        )
        return True

    # Ensure output directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Build ffmpeg command
    # -ss before -i for fast seeking
    # crop=ih*9/16:ih crops to 9:16 aspect ratio (center crop)
    # scale=1080:1920 scales to TikTok resolution
    cmd = [
        "ffmpeg",
        "-ss", str(exercise.start_time),  # Seek to start time
        "-i", str(input_video),            # Input file
        "-t", str(duration),               # Duration
        "-vf", f"crop=ih*9/16:ih,scale={OUTPUT_WIDTH}:{OUTPUT_HEIGHT}",  # Crop and scale
        "-c:v", VIDEO_CODEC,               # Video codec
        "-preset", VIDEO_PRESET,           # Encoding preset
        "-crf", str(VIDEO_CRF),            # Quality
        "-c:a", AUDIO_CODEC,               # Audio codec
        "-b:a", AUDIO_BITRATE,             # Audio bitrate
        "-y",                              # Overwrite output file
        str(output_path),                  # Output file
    ]

    logger.info(f"Clipping: {exercise.name} ({duration}s) -> {output_path.name}")

    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300,  # 5 minute timeout per clip
        )

        if result.returncode != 0:
            logger.error(f"FFmpeg failed for {exercise.name}:")
            logger.error(f"  stderr: {result.stderr}")
            return False

        if not output_path.exists():
            logger.error(f"Output file not created: {output_path}")
            return False

        file_size_mb = output_path.stat().st_size / (1024 * 1024)
        logger.info(f"Successfully clipped: {output_path.name} ({file_size_mb:.1f} MB)")
        return True

    except subprocess.TimeoutExpired:
        logger.error(f"FFmpeg timeout for {exercise.name}")
        return False
    except Exception as e:
        logger.error(f"Failed to clip {exercise.name}: {e}")
        return False


# ============================================================================
# Manifest Generation
# ============================================================================

def generate_manifest(
    video_ids: Optional[List[str]] = None,
    dry_run: bool = False,
) -> Dict:
    """
    Generate a JSON manifest of all clips.

    When video_ids is a subset, the existing manifest is loaded first so that
    entries for other videos are preserved (not clobbered).

    Args:
        video_ids: Optional list of video IDs to include (defaults to all)
        dry_run: If True, don't write manifest file

    Returns:
        The manifest dictionary
    """
    # Load existing manifest so a partial run doesn't clobber other entries
    manifest = {}
    if MANIFEST_PATH.exists():
        try:
            with open(MANIFEST_PATH, 'r') as f:
                manifest = json.load(f)
        except (json.JSONDecodeError, OSError):
            manifest = {}

    video_ids_to_process = video_ids if video_ids else list(EXERCISE_DATA.keys())

    for video_id in video_ids_to_process:
        if video_id not in EXERCISE_DATA:
            logger.warning(f"Unknown video ID: {video_id}")
            continue

        video_info = EXERCISE_DATA[video_id]
        manifest[video_id] = {}

        for workout in video_info.workouts:
            manifest[video_id][workout.name] = []

            for exercise in workout.exercises:
                clip_path = CLIPS_OUTPUT_DIR / video_id / f"{exercise.slug}.mp4"

                # Only include in manifest if clip exists (or in dry-run mode)
                if dry_run or clip_path.exists():
                    manifest[video_id][workout.name].append({
                        "exercise": exercise.name,
                        "slug": exercise.slug,
                        "file": f"{video_id}/{exercise.slug}.mp4",
                        "duration": exercise.duration,
                    })

    if not dry_run:
        MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
        with open(MANIFEST_PATH, 'w') as f:
            json.dump(manifest, f, indent=2)
        logger.info(f"Manifest written to: {MANIFEST_PATH}")
    else:
        logger.info(f"[DRY RUN] Would write manifest to: {MANIFEST_PATH}")

    return manifest


# ============================================================================
# Main Processing Logic
# ============================================================================

def process_video(
    video_id: str,
    skip_download: bool = False,
    dry_run: bool = False,
    force: bool = False,
) -> bool:
    """
    Process a single video: download and clip all exercises.

    Args:
        video_id: YouTube video ID
        skip_download: Skip downloading (use cached video only)
        dry_run: Show what would be done without doing it
        force: Overwrite existing clips

    Returns:
        True if successful, False if failed
    """
    if video_id not in EXERCISE_DATA:
        logger.error(f"Unknown video ID: {video_id}")
        return False

    video_info = EXERCISE_DATA[video_id]
    logger.info(f"\n{'='*70}")
    logger.info(f"Processing: {video_info.title} ({video_id})")
    logger.info(f"{'='*70}")

    # Step 1: Ensure video is downloaded
    if not dry_run:
        video_path = ensure_video_downloaded(video_id, skip_download)
        if video_path is None:
            logger.error(f"Could not get video for {video_id}")
            return False
    else:
        video_path = Path(f"/path/to/{video_id}.mp4")  # Dummy path for dry-run

    # Step 2: Clip each exercise
    total_exercises = sum(len(workout.exercises) for workout in video_info.workouts)
    current_exercise = 0
    failed_clips = []

    for workout in video_info.workouts:
        logger.info(f"\n{workout.name.upper()} ({len(workout.exercises)} exercises)")
        logger.info("-" * 50)

        for exercise in workout.exercises:
            current_exercise += 1
            logger.info(f"[{current_exercise}/{total_exercises}] {exercise.name}")

            output_path = CLIPS_OUTPUT_DIR / video_id / f"{exercise.slug}.mp4"

            success = clip_exercise(
                input_video=video_path,
                output_path=output_path,
                exercise=exercise,
                dry_run=dry_run,
                force=force,
            )

            if not success:
                failed_clips.append(exercise.name)

    # Report results
    if failed_clips:
        logger.error(f"\nFailed to clip {len(failed_clips)} exercises:")
        for name in failed_clips:
            logger.error(f"  - {name}")
        return False

    logger.info(f"\nSuccessfully processed {total_exercises} exercises from {video_id}")
    return True


def main():
    """Main entry point for the script."""
    parser = argparse.ArgumentParser(
        description="Clip AthleanX workout videos into TikTok-format shorts",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  uv run scripts/clip_exercises.py
  uv run scripts/clip_exercises.py --video-id zD266B2jk0s
  uv run scripts/clip_exercises.py --skip-download --force
  uv run scripts/clip_exercises.py --dry-run
        """
    )

    parser.add_argument(
        "--video-id",
        type=str,
        help="Process only this video ID (default: all videos)"
    )

    parser.add_argument(
        "--skip-download",
        action="store_true",
        help="Skip downloading videos (only clip from cache)"
    )

    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be done without doing it"
    )

    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing clips"
    )

    args = parser.parse_args()

    # Determine which videos to process
    if args.video_id:
        video_ids = [args.video_id]
    else:
        video_ids = list(EXERCISE_DATA.keys())

    logger.info(f"Starting exercise clipper")
    logger.info(f"Output directory: {CLIPS_OUTPUT_DIR}")
    logger.info(f"Videos to process: {len(video_ids)}")
    if args.dry_run:
        logger.info("DRY RUN MODE - No files will be created")
    if args.force:
        logger.info("FORCE MODE - Existing clips will be overwritten")
    if args.skip_download:
        logger.info("SKIP DOWNLOAD MODE - Only cached videos will be used")

    # Process each video
    failed_videos = []
    for video_id in video_ids:
        success = process_video(
            video_id=video_id,
            skip_download=args.skip_download,
            dry_run=args.dry_run,
            force=args.force,
        )
        if not success:
            failed_videos.append(video_id)

    # Generate manifest
    logger.info(f"\n{'='*70}")
    logger.info("Generating manifest...")
    logger.info(f"{'='*70}")
    generate_manifest(video_ids=video_ids, dry_run=args.dry_run)

    # Final summary
    logger.info(f"\n{'='*70}")
    logger.info("PROCESSING COMPLETE")
    logger.info(f"{'='*70}")
    logger.info(f"Videos processed: {len(video_ids) - len(failed_videos)}/{len(video_ids)}")

    if failed_videos:
        logger.error(f"Failed videos: {', '.join(failed_videos)}")
        sys.exit(1)
    else:
        logger.info("All videos processed successfully!")
        if not args.dry_run:
            logger.info(f"Clips saved to: {CLIPS_OUTPUT_DIR}")
            logger.info(f"Manifest saved to: {MANIFEST_PATH}")


if __name__ == "__main__":
    main()

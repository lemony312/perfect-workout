"""
Discover all bodyweight exercise videos published by AthleanX on YouTube.

Uses yt-dlp to search the AthleanX channel for bodyweight-related videos
and saves structured metadata to data/athleanx_bodyweight_videos.json.
"""

import json
import logging
import re
import sys
from datetime import datetime
from pathlib import Path

import yt_dlp

PROJECT_ROOT = Path("/Users/louis.boguslav/Documents/perfect-workout")
DATA_DIR = PROJECT_ROOT / "data"
OUTPUT_FILE = DATA_DIR / "athleanx_bodyweight_videos.json"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

BODYWEIGHT_KEYWORDS = [
    "bodyweight",
    "body weight",
    "no equipment",
    "no gym",
    "home workout",
    "calisthenics",
    "at home",
    "without weights",
    "no weights",
]

ATHLEANX_CHANNEL = "https://www.youtube.com/@athleanx/videos"
ATHLEANX_SEARCH_QUERIES = [
    "ytsearch50:athleanx bodyweight workout",
    "ytsearch50:athleanx no equipment workout",
    "ytsearch50:athleanx home workout no gym",
    "ytsearch50:athleanx calisthenics",
    "ytsearch50:athleanx body weight exercises",
]


def is_bodyweight_related(title: str, description: str = "") -> bool:
    text = (title + " " + description).lower()
    return any(kw in text for kw in BODYWEIGHT_KEYWORDS)


def extract_channel_videos() -> list[dict]:
    """Extract all video metadata from the AthleanX channel."""
    logger.info("Extracting AthleanX channel video list (this may take a minute)...")

    opts = {
        "quiet": True,
        "no_warnings": True,
        "extract_flat": True,
        "ignoreerrors": True,
        "extractor_args": {
            "youtube": {
                "player_client": ["android", "web"],
            }
        },
    }

    all_videos = {}

    # Method 1: Channel tab extraction (gets all videos)
    logger.info("Fetching from AthleanX channel tab...")
    try:
        with yt_dlp.YoutubeDL(opts) as ydl:
            result = ydl.extract_info(ATHLEANX_CHANNEL, download=False)
            if result and "entries" in result:
                entries = list(result["entries"]) if result["entries"] else []
                logger.info(f"  Found {len(entries)} total channel videos")
                for entry in entries:
                    if entry is None:
                        continue
                    vid_id = entry.get("id", "")
                    title = entry.get("title", "")
                    if vid_id and is_bodyweight_related(title, entry.get("description", "") or ""):
                        all_videos[vid_id] = {
                            "video_id": vid_id,
                            "title": title,
                            "url": f"https://www.youtube.com/watch?v={vid_id}",
                            "upload_date": entry.get("upload_date"),
                            "duration": entry.get("duration"),
                            "view_count": entry.get("view_count"),
                            "description": (entry.get("description") or "")[:500],
                            "source": "channel_tab",
                        }
                logger.info(f"  {len(all_videos)} matched bodyweight keywords from channel tab")
    except Exception as e:
        logger.warning(f"Channel tab extraction failed: {e}")

    # Method 2: Targeted YouTube searches (catches videos that might not match
    # simple keyword filter on title alone)
    for query in ATHLEANX_SEARCH_QUERIES:
        logger.info(f"Searching: {query}")
        try:
            with yt_dlp.YoutubeDL(opts) as ydl:
                result = ydl.extract_info(query, download=False)
                if result and "entries" in result:
                    entries = list(result["entries"]) if result["entries"] else []
                    new_count = 0
                    for entry in entries:
                        if entry is None:
                            continue
                        vid_id = entry.get("id", "")
                        title = entry.get("title", "")
                        uploader = (entry.get("uploader") or entry.get("channel") or "").lower()
                        if vid_id and vid_id not in all_videos and "athlean" in uploader:
                            all_videos[vid_id] = {
                                "video_id": vid_id,
                                "title": title,
                                "url": f"https://www.youtube.com/watch?v={vid_id}",
                                "upload_date": entry.get("upload_date"),
                                "duration": entry.get("duration"),
                                "view_count": entry.get("view_count"),
                                "description": (entry.get("description") or "")[:500],
                                "source": "search",
                            }
                            new_count += 1
                    logger.info(f"  +{new_count} new videos from this search")
        except Exception as e:
            logger.warning(f"Search failed for '{query}': {e}")

    return list(all_videos.values())


def enrich_metadata(videos: list[dict]) -> list[dict]:
    """Fetch full metadata for each discovered video (description, chapters, etc.)."""
    logger.info(f"Enriching metadata for {len(videos)} videos...")

    opts = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
        "ignoreerrors": True,
        "extractor_args": {
            "youtube": {
                "player_client": ["android", "web"],
            }
        },
    }

    enriched = []
    for i, video in enumerate(videos):
        vid_id = video["video_id"]
        url = video["url"]
        logger.info(f"  [{i+1}/{len(videos)}] {video['title'][:60]}...")

        try:
            with yt_dlp.YoutubeDL(opts) as ydl:
                info = ydl.extract_info(url, download=False)
                if info:
                    video["title"] = info.get("title", video["title"])
                    video["description"] = (info.get("description") or "")[:1000]
                    video["upload_date"] = info.get("upload_date", video.get("upload_date"))
                    video["duration"] = info.get("duration", video.get("duration"))
                    video["view_count"] = info.get("view_count", video.get("view_count"))
                    video["like_count"] = info.get("like_count")
                    video["chapters"] = info.get("chapters") or []
                    video["tags"] = info.get("tags") or []
        except Exception as e:
            logger.warning(f"  Could not enrich {vid_id}: {e}")

        enriched.append(video)

    return enriched


def format_date(date_str: str | None) -> str | None:
    if not date_str:
        return None
    try:
        return datetime.strptime(date_str, "%Y%m%d").strftime("%Y-%m-%d")
    except ValueError:
        return date_str


def main():
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    # Step 1: Discover videos
    videos = extract_channel_videos()
    if not videos:
        logger.error("No videos found. Check network connectivity and yt-dlp version.")
        sys.exit(1)

    logger.info(f"\nDiscovered {len(videos)} bodyweight-related AthleanX videos")

    # Step 2: Enrich with full metadata
    skip_enrich = "--skip-enrich" in sys.argv
    if not skip_enrich:
        videos = enrich_metadata(videos)
    else:
        logger.info("Skipping metadata enrichment (--skip-enrich flag)")

    # Step 3: Clean up and sort by upload date (newest first)
    for v in videos:
        v["upload_date"] = format_date(v.get("upload_date"))
        if v.get("duration"):
            dur = int(v["duration"])
            minutes = dur // 60
            seconds = dur % 60
            v["duration_formatted"] = f"{minutes}:{seconds:02d}"

    videos.sort(key=lambda v: v.get("upload_date") or "0000-00-00", reverse=True)

    # Step 4: Save
    output = {
        "discovered_at": datetime.now().isoformat(),
        "channel": "AthleanX",
        "channel_url": "https://www.youtube.com/@athleanx",
        "total_videos": len(videos),
        "videos": videos,
    }

    OUTPUT_FILE.write_text(json.dumps(output, indent=2, ensure_ascii=False))
    logger.info(f"\nSaved {len(videos)} videos to {OUTPUT_FILE}")

    # Print summary
    print(f"\n{'='*70}")
    print(f"AthleanX Bodyweight Video Discovery - {len(videos)} videos found")
    print(f"{'='*70}")
    for v in videos[:20]:
        date = v.get("upload_date", "unknown")
        dur = v.get("duration_formatted", "?:??")
        views = v.get("view_count")
        views_str = f"{views:,}" if views else "?"
        print(f"  [{date}] ({dur}) {v['title'][:55]}")
        print(f"           {v['url']}  ({views_str} views)")
    if len(videos) > 20:
        print(f"  ... and {len(videos) - 20} more (see {OUTPUT_FILE})")
    print(f"{'='*70}")


if __name__ == "__main__":
    main()

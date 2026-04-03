#!/usr/bin/env python3
"""
CLI script to download YouTube playlist metadata and transcripts.

Usage:
    uv run scripts/fetch_playlist.py "https://www.youtube.com/playlist?list=PLRS2DE4P39EdzTqPZTL_uYvMZi7tichL0"
    uv run scripts/fetch_playlist.py "PLAYLIST_URL" --include-video
    uv run scripts/fetch_playlist.py "PLAYLIST_URL" --no-cache
"""

import argparse
import json
import logging
import sys
from pathlib import Path
from typing import List, Dict, Any

# Add scripts directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from downloader import (
    download_playlist,
    get_cache_stats,
    extract_playlist_id,
)

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def format_file_size(size_bytes: float) -> str:
    """Format file size in human-readable format."""
    if size_bytes < 1024:
        return f"{size_bytes:.1f} B"
    elif size_bytes < 1024**2:
        return f"{size_bytes / 1024:.1f} KB"
    elif size_bytes < 1024**3:
        return f"{size_bytes / (1024**2):.1f} MB"
    else:
        return f"{size_bytes / (1024**3):.1f} GB"


def format_duration(seconds: int) -> str:
    """Format duration in human-readable format."""
    if seconds < 60:
        return f"{seconds}s"
    elif seconds < 3600:
        minutes = seconds // 60
        secs = seconds % 60
        return f"{minutes}m {secs}s"
    else:
        hours = seconds // 3600
        minutes = (seconds % 3600) // 60
        return f"{hours}h {minutes}m"


def print_summary(results: List[Dict[str, Any]]) -> None:
    """Print a summary of downloaded content."""
    print("\n" + "=" * 80)
    print("DOWNLOAD SUMMARY")
    print("=" * 80)

    total_videos = len(results)
    successful_metadata = sum(1 for r in results if r["metadata"])
    successful_transcripts = sum(1 for r in results if r["transcript_path"])
    successful_videos = sum(1 for r in results if r["video_path"])

    print(f"\nTotal videos in playlist: {total_videos}")
    print(f"Metadata downloaded: {successful_metadata}/{total_videos}")
    print(f"Transcripts downloaded: {successful_transcripts}/{total_videos}")
    if any(r["video_path"] for r in results):
        print(f"Videos downloaded: {successful_videos}/{total_videos}")

    # Calculate total duration
    total_duration = sum(
        r["metadata"].get("duration", 0)
        for r in results
        if r["metadata"]
    )
    print(f"Total duration: {format_duration(total_duration)}")

    # Cache statistics
    cache_stats = get_cache_stats()
    print("\nCache Statistics:")
    if "videos" in cache_stats:
        print(f"  Videos: {cache_stats['videos']['count']} files, {format_file_size(cache_stats['videos']['size_mb'] * 1024**2)}")
    if "transcripts" in cache_stats:
        print(f"  Transcripts: {cache_stats['transcripts']['count']} files, {format_file_size(cache_stats['transcripts']['size_kb'] * 1024)}")
    if "metadata" in cache_stats:
        print(f"  Metadata: {cache_stats['metadata']['count']} files, {format_file_size(cache_stats['metadata']['size_kb'] * 1024)}")

    # List all videos
    print("\nVideos:")
    for idx, result in enumerate(results, 1):
        if result["metadata"]:
            meta = result["metadata"]
            title = meta.get("title", "Unknown")
            duration = meta.get("duration", 0)
            video_id = meta.get("id", "Unknown")

            status_parts = []
            if result["transcript_path"]:
                status_parts.append("transcript")
            if result["video_path"]:
                status_parts.append("video")
            status = ", ".join(status_parts) if status_parts else "metadata only"

            print(f"  {idx}. [{video_id}] {title} ({format_duration(duration)}) - {status}")
        else:
            print(f"  {idx}. [FAILED] Could not download metadata")

    print("\n" + "=" * 80)


def main():
    """Main entry point for the script."""
    parser = argparse.ArgumentParser(
        description="Download YouTube playlist metadata and transcripts for Perfect Workout app",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Download metadata and transcripts only
  uv run scripts/fetch_playlist.py "https://www.youtube.com/playlist?list=PLRS2DE4P39EdzTqPZTL_uYvMZi7tichL0"

  # Download metadata, transcripts, and video files
  uv run scripts/fetch_playlist.py "PLAYLIST_URL" --include-video

  # Force re-download without using cache
  uv run scripts/fetch_playlist.py "PLAYLIST_URL" --no-cache

  # Export results to JSON file
  uv run scripts/fetch_playlist.py "PLAYLIST_URL" --output results.json
        """
    )

    parser.add_argument(
        "playlist_url",
        help="YouTube playlist URL"
    )

    parser.add_argument(
        "--include-video",
        action="store_true",
        help="Also download video files (default: metadata and transcripts only)"
    )

    parser.add_argument(
        "--no-cache",
        action="store_true",
        help="Force re-download without using cache"
    )

    parser.add_argument(
        "--no-cookies",
        action="store_true",
        help="Disable cookie-based authentication"
    )

    parser.add_argument(
        "--output",
        "-o",
        type=Path,
        help="Save results to JSON file"
    )

    parser.add_argument(
        "--verbose",
        "-v",
        action="store_true",
        help="Enable verbose logging"
    )

    args = parser.parse_args()

    # Configure logging level
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    # Validate playlist URL
    playlist_id = extract_playlist_id(args.playlist_url)
    if not playlist_id:
        logger.error(f"Invalid playlist URL: {args.playlist_url}")
        sys.exit(1)

    logger.info(f"Fetching playlist: {playlist_id}")
    logger.info(f"Include videos: {args.include_video}")
    logger.info(f"Use cache: {not args.no_cache}")
    logger.info(f"Use cookies: {not args.no_cookies}")

    try:
        # Download playlist
        results = download_playlist(
            playlist_url=args.playlist_url,
            include_videos=args.include_video,
            use_cookies=not args.no_cookies,
            use_cache=not args.no_cache,
        )

        # Print summary
        print_summary(results)

        # Save to JSON if requested
        if args.output:
            output_data = {
                "playlist_id": playlist_id,
                "playlist_url": args.playlist_url,
                "total_videos": len(results),
                "results": results,
            }

            args.output.write_text(json.dumps(output_data, indent=2))
            logger.info(f"Results saved to: {args.output}")

        # Exit with success
        sys.exit(0)

    except KeyboardInterrupt:
        logger.warning("\nDownload interrupted by user")
        sys.exit(130)
    except Exception as e:
        logger.error(f"Error: {e}")
        if args.verbose:
            import traceback
            traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Example usage of the YouTube downloader module.

This demonstrates how to use the downloader programmatically in your code.
"""

import sys
from pathlib import Path

# Add scripts directory to path
sys.path.insert(0, str(Path(__file__).parent))

from downloader import (
    download_video,
    download_transcript,
    download_metadata,
    download_playlist,
    get_cache_stats,
)


def example_download_single_video():
    """Example: Download a single video with metadata and transcript."""
    print("=" * 80)
    print("Example 1: Download single video")
    print("=" * 80)

    video_url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

    # Download metadata (fast, no video download)
    print("\n1. Downloading metadata...")
    metadata = download_metadata(video_url)
    print(f"   Title: {metadata['title']}")
    print(f"   Duration: {metadata['duration']}s")
    print(f"   Channel: {metadata['channel']}")

    # Download transcript (if available)
    print("\n2. Downloading transcript...")
    transcript_path = download_transcript(video_url)
    if transcript_path:
        print(f"   Transcript saved to: {transcript_path}")
    else:
        print("   No transcript available")

    # Download video (this is cached)
    print("\n3. Downloading video...")
    video_path = download_video(video_url)
    print(f"   Video saved to: {video_path}")


def example_download_playlist():
    """Example: Download playlist metadata and transcripts."""
    print("\n" + "=" * 80)
    print("Example 2: Download playlist")
    print("=" * 80)

    playlist_url = "https://www.youtube.com/playlist?list=PLRS2DE4P39EdzTqPZTL_uYvMZi7tichL0"

    # Download playlist (metadata + transcripts only, no videos)
    print("\nDownloading playlist metadata and transcripts...")
    results = download_playlist(
        playlist_url,
        include_videos=False,  # Set to True to also download videos
        use_cache=True,
    )

    print(f"\nProcessed {len(results)} videos:")
    for idx, result in enumerate(results[:5], 1):  # Show first 5
        metadata = result["metadata"]
        print(f"  {idx}. {metadata['title']}")
        print(f"     Duration: {metadata['duration']}s")
        print(f"     Transcript: {'Yes' if result['transcript_path'] else 'No'}")


def example_check_cache():
    """Example: Check cache statistics."""
    print("\n" + "=" * 80)
    print("Example 3: Cache statistics")
    print("=" * 80)

    stats = get_cache_stats()

    print("\nCache Statistics:")
    if "videos" in stats:
        print(f"  Videos: {stats['videos']['count']} files ({stats['videos']['size_mb']:.2f} MB)")
    if "transcripts" in stats:
        print(f"  Transcripts: {stats['transcripts']['count']} files ({stats['transcripts']['size_kb']:.2f} KB)")
    if "metadata" in stats:
        print(f"  Metadata: {stats['metadata']['count']} files ({stats['metadata']['size_kb']:.2f} KB)")


if __name__ == "__main__":
    print("\nYouTube Downloader - Example Usage")
    print("=" * 80)
    print("This script demonstrates how to use the downloader module.")
    print("Note: These examples will download real videos to your cache.")
    print("=" * 80)

    # Run examples (comment out if you don't want to download)
    # example_download_single_video()
    # example_download_playlist()

    # Check cache (safe to run anytime)
    example_check_cache()

    print("\n" + "=" * 80)
    print("Examples complete!")
    print("=" * 80)

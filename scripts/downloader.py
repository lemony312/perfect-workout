"""
YouTube video downloader using yt-dlp for Perfect Workout app.

This module downloads exercise demonstration videos from YouTube with the following features:
- Infinite video cache (static reference videos that never expire)
- 720p quality (higher than tab extraction - people actually watch these)
- Transcript extraction (English auto-generated subtitles)
- Metadata extraction (title, description, duration, chapters, thumbnail, etc.)
- Playlist support (bulk download metadata + transcripts)
- Rate limiting and abuse prevention
- Cookie-based authentication for premium content

Cache structure:
- data/cache/videos/{video_id}_720p.mp4
- data/cache/transcripts/{video_id}.vtt
- data/cache/metadata/{video_id}.json
"""

import hashlib
import json
import logging
import re
import time
import uuid
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional, List, Dict, Any

import yt_dlp

# ============================================================================
# Configuration
# ============================================================================

# Base paths (absolute paths from project root)
PROJECT_ROOT = Path("/Users/louis.boguslav/Documents/perfect-workout")
DATA_DIR = PROJECT_ROOT / "data"
CACHE_DIR = DATA_DIR / "cache"
VIDEO_CACHE_DIR = CACHE_DIR / "videos"
TRANSCRIPT_CACHE_DIR = CACHE_DIR / "transcripts"
METADATA_CACHE_DIR = CACHE_DIR / "metadata"
DOWNLOADS_DIR = DATA_DIR / "downloads"
COOKIES_FILE = PROJECT_ROOT / "cookies.txt"

# Ensure directories exist
VIDEO_CACHE_DIR.mkdir(parents=True, exist_ok=True)
TRANSCRIPT_CACHE_DIR.mkdir(parents=True, exist_ok=True)
METADATA_CACHE_DIR.mkdir(parents=True, exist_ok=True)
DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)

# Video download settings
VIDEO_QUALITY = "720p"  # Higher quality for actual viewing (not just tab extraction)
VIDEO_FORMAT = "mp4"

# YouTube-specific settings
COOKIES_FROM_BROWSER = None  # Options: "chrome", "firefox", "edge", None

# Rate limiting
DOWNLOAD_SLEEP_INTERVAL = 2  # Seconds to wait between downloads
MAX_DOWNLOADS_PER_HOUR = 50  # Safety limit

# Video caching
ENABLE_VIDEO_CACHE = True
VIDEO_CACHE_MAX_AGE_HOURS = None  # Never expire - static reference videos
VIDEO_CACHE_MAX_SIZE_GB = 20  # Maximum cache size in GB

# Logging
logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


# ============================================================================
# Rate Limiting
# ============================================================================

class RateLimiter:
    """Track downloads and enforce rate limits to prevent YouTube abuse."""

    def __init__(self, max_per_hour: int = MAX_DOWNLOADS_PER_HOUR):
        self.max_per_hour = max_per_hour
        self.download_times: List[datetime] = []
        self.state_file = VIDEO_CACHE_DIR / "rate_limit_state.json"
        self._load_state()

    def _load_state(self):
        """Load rate limit state from disk."""
        try:
            if self.state_file.exists():
                data = json.loads(self.state_file.read_text())
                self.download_times = [
                    datetime.fromisoformat(ts) for ts in data.get("download_times", [])
                ]
                self._cleanup_old_entries()
        except Exception as e:
            logger.warning(f"Could not load rate limit state: {e}")
            self.download_times = []

    def _save_state(self):
        """Save rate limit state to disk."""
        try:
            self._cleanup_old_entries()
            data = {
                "download_times": [ts.isoformat() for ts in self.download_times]
            }
            self.state_file.write_text(json.dumps(data))
        except Exception as e:
            logger.warning(f"Could not save rate limit state: {e}")

    def _cleanup_old_entries(self):
        """Remove entries older than 1 hour."""
        cutoff = datetime.now() - timedelta(hours=1)
        self.download_times = [ts for ts in self.download_times if ts > cutoff]

    def can_download(self) -> bool:
        """Check if we can download without exceeding rate limit."""
        self._cleanup_old_entries()
        return len(self.download_times) < self.max_per_hour

    def get_wait_time(self) -> float:
        """Get seconds to wait before next download is allowed."""
        if self.can_download():
            return 0

        oldest = min(self.download_times)
        expires = oldest + timedelta(hours=1)
        wait = (expires - datetime.now()).total_seconds()
        return max(0, wait)

    def record_download(self):
        """Record a download."""
        self.download_times.append(datetime.now())
        self._save_state()

    def get_downloads_this_hour(self) -> int:
        """Get number of downloads in the last hour."""
        self._cleanup_old_entries()
        return len(self.download_times)


# Global rate limiter
_rate_limiter = RateLimiter()


def check_rate_limit() -> None:
    """
    Check rate limit and wait if necessary.

    Raises:
        RuntimeError: If rate limit is exceeded and wait time is too long
    """
    if not _rate_limiter.can_download():
        wait_time = _rate_limiter.get_wait_time()
        if wait_time > 300:  # More than 5 minutes
            raise RuntimeError(
                f"Rate limit exceeded. {_rate_limiter.get_downloads_this_hour()} downloads "
                f"in the last hour. Please wait {int(wait_time)}s or try again later."
            )
        logger.warning(f"Rate limit approaching, waiting {wait_time:.0f}s...")
        time.sleep(wait_time)


# ============================================================================
# Video ID Extraction
# ============================================================================

def extract_video_id(url: str) -> Optional[str]:
    """
    Extract YouTube video ID from URL.

    Supports various YouTube URL formats:
    - https://www.youtube.com/watch?v=VIDEO_ID
    - https://youtu.be/VIDEO_ID
    - https://www.youtube.com/embed/VIDEO_ID
    """
    patterns = [
        r'(?:v=|\/videos\/|embed\/|youtu\.be\/|\/v\/|\/e\/|watch\?v=)([a-zA-Z0-9_-]{11})',
        r'^([a-zA-Z0-9_-]{11})$',  # Just the ID
    ]

    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)

    return None


def extract_playlist_id(url: str) -> Optional[str]:
    """
    Extract YouTube playlist ID from URL.

    Supports formats like:
    - https://www.youtube.com/playlist?list=PLAYLIST_ID
    - https://www.youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID
    """
    patterns = [
        r'[?&]list=([a-zA-Z0-9_-]+)',
    ]

    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)

    return None


# ============================================================================
# Video Caching
# ============================================================================

def get_cache_path(video_id: str, quality: str = VIDEO_QUALITY) -> Path:
    """Get the cache file path for a video."""
    cache_name = f"{video_id}_{quality}.mp4"
    return VIDEO_CACHE_DIR / cache_name


def get_cached_video(url: str, quality: str = VIDEO_QUALITY) -> Optional[Path]:
    """
    Check if video is already cached.

    Args:
        url: YouTube video URL
        quality: Video quality setting

    Returns:
        Path to cached video if exists and valid, None otherwise
    """
    if not ENABLE_VIDEO_CACHE:
        return None

    video_id = extract_video_id(url)
    if not video_id:
        return None

    cache_path = get_cache_path(video_id, quality)

    if cache_path.exists():
        # Check if cache is still valid (infinite cache if max_age is None)
        if VIDEO_CACHE_MAX_AGE_HOURS is None:
            logger.info(f"Using cached video: {cache_path}")
            return cache_path
        else:
            age_hours = (time.time() - cache_path.stat().st_mtime) / 3600
            if age_hours < VIDEO_CACHE_MAX_AGE_HOURS:
                logger.info(f"Using cached video: {cache_path} (age: {age_hours:.1f}h)")
                return cache_path
            else:
                logger.info(f"Cache expired for {video_id}, will re-download")
                cache_path.unlink()

    return None


def cache_video(source_path: Path, url: str, quality: str = VIDEO_QUALITY) -> Path:
    """
    Cache a downloaded video.

    Args:
        source_path: Path to the downloaded video
        url: YouTube video URL
        quality: Video quality setting

    Returns:
        Path to the cached video
    """
    if not ENABLE_VIDEO_CACHE:
        return source_path

    video_id = extract_video_id(url)
    if not video_id:
        return source_path

    cache_path = get_cache_path(video_id, quality)

    try:
        import shutil
        shutil.copy2(source_path, cache_path)
        source_path.unlink()
        logger.info(f"Cached video: {cache_path}")

        cleanup_cache()

        return cache_path
    except Exception as e:
        logger.warning(f"Could not cache video: {e}")
        return source_path


def cleanup_cache() -> None:
    """Clean up old cache files to stay under size limit."""
    if not ENABLE_VIDEO_CACHE or not VIDEO_CACHE_DIR.exists():
        return

    try:
        cache_files = list(VIDEO_CACHE_DIR.glob("*.mp4"))

        total_size_gb = sum(f.stat().st_size for f in cache_files) / (1024**3)

        if total_size_gb <= VIDEO_CACHE_MAX_SIZE_GB:
            return

        cache_files.sort(key=lambda f: f.stat().st_mtime)

        for cache_file in cache_files:
            if total_size_gb <= VIDEO_CACHE_MAX_SIZE_GB * 0.8:
                break

            file_size_gb = cache_file.stat().st_size / (1024**3)
            cache_file.unlink()
            total_size_gb -= file_size_gb
            logger.info(f"Removed old cache file: {cache_file}")

    except Exception as e:
        logger.warning(f"Cache cleanup failed: {e}")


# ============================================================================
# Format Selection
# ============================================================================

def get_format_string(quality: str) -> str:
    """Convert quality string to yt-dlp format selector."""
    quality_map = {
        "lowest": "wv*[height>=144][height<=360]+wa/w[height<=360]/wv*+wa/w",
        "240p": "wv*[height<=240]+wa/w[height<=240]/wv*[height<=360]+wa/w",
        "360p": "wv*[height<=360]+wa/w[height<=360]/wv*[height<=480]+wa/w",
        "480p": "wv*[height<=480]+wa/w[height<=480]",
        "720p": "bv*[height<=720]+ba/b[height<=720]",
        "1080p": "bv*[height<=1080]+ba/b[height<=1080]",
    }
    return quality_map.get(quality, quality_map["720p"])


def get_format_sort(quality: str) -> List[str]:
    """Get format sorting options for yt-dlp."""
    if quality in ["lowest", "240p", "360p"]:
        return ["+size", "+res", "+br", "ext:mp4:m4a"]
    else:
        return ["res", "ext:mp4:m4a"]


# ============================================================================
# YT-DLP Options
# ============================================================================

def get_ydl_base_opts(use_cookies: bool = True) -> Dict[str, Any]:
    """Get base yt-dlp options."""
    opts = {
        "quiet": True,
        "no_warnings": True,
        "extract_flat": False,
        "extractor_args": {
            "youtube": {
                "player_client": ["android", "web"],
            }
        },
        "sleep_interval": 1,
        "max_sleep_interval": 5,
    }

    if use_cookies:
        if COOKIES_FROM_BROWSER:
            opts["cookiesfrombrowser"] = (COOKIES_FROM_BROWSER,)
            logger.info(f"Using cookies from browser: {COOKIES_FROM_BROWSER}")
        elif COOKIES_FILE.exists():
            opts["cookiefile"] = str(COOKIES_FILE)
            logger.info("Using cookies from cookies.txt")

    return opts


# ============================================================================
# Video Download
# ============================================================================

def download_video(
    url: str,
    output_dir: Optional[Path] = None,
    quality: Optional[str] = None,
    use_cookies: bool = True,
    use_cache: bool = True,
) -> Path:
    """
    Download a YouTube video with caching and rate limiting.

    Args:
        url: YouTube video URL
        output_dir: Directory to save the video (defaults to DOWNLOADS_DIR)
        quality: Video quality ("lowest", "360p", "480p", "720p", "1080p")
        use_cookies: Whether to use cookies for authentication
        use_cache: Whether to use/update video cache

    Returns:
        Path to the downloaded video file

    Raises:
        ValueError: If the URL is invalid
        RuntimeError: If download fails or rate limit exceeded
    """
    output_dir = output_dir or DOWNLOADS_DIR
    quality = quality or VIDEO_QUALITY

    # Check cache first
    if use_cache:
        cached_path = get_cached_video(url, quality)
        if cached_path:
            return cached_path

    # Check rate limit
    check_rate_limit()

    downloads_this_hour = _rate_limiter.get_downloads_this_hour()
    logger.info(f"Downloads this hour: {downloads_this_hour}/{MAX_DOWNLOADS_PER_HOUR}")

    output_dir.mkdir(parents=True, exist_ok=True)

    file_id = str(uuid.uuid4())[:8]
    output_template = str(output_dir / f"{file_id}.%(ext)s")

    ydl_opts = get_ydl_base_opts(use_cookies)
    ydl_opts.update({
        "format": get_format_string(quality),
        "format_sort": get_format_sort(quality),
        "outtmpl": output_template,
        "merge_output_format": VIDEO_FORMAT,
    })

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if info is None:
                raise ValueError(f"Could not extract info from URL: {url}")

            title = info.get("title", "Unknown")
            duration = info.get("duration", 0)

            logger.info(f"Downloading: {title} ({duration}s) at {quality} quality")

            ydl.download([url])

            _rate_limiter.record_download()

            video_path = output_dir / f"{file_id}.{VIDEO_FORMAT}"
            if not video_path.exists():
                for ext in ["mp4", "mkv", "webm", "m4a"]:
                    alt_path = output_dir / f"{file_id}.{ext}"
                    if alt_path.exists():
                        video_path = alt_path
                        break

            if not video_path.exists():
                created_files = list(output_dir.glob(f"{file_id}.*"))
                if created_files:
                    video_path = created_files[0]
                else:
                    raise RuntimeError(f"Downloaded file not found at {video_path}")

            file_size_mb = video_path.stat().st_size / (1024 * 1024)
            logger.info(f"Downloaded to: {video_path} ({file_size_mb:.1f} MB)")

            if use_cache:
                video_path = cache_video(video_path, url, quality)

            if DOWNLOAD_SLEEP_INTERVAL > 0:
                time.sleep(DOWNLOAD_SLEEP_INTERVAL)

            return video_path

    except yt_dlp.DownloadError as e:
        error_msg = str(e)

        if "Sign in to confirm" in error_msg or "bot" in error_msg.lower():
            raise RuntimeError(
                "YouTube requires authentication. Please add your YouTube cookies."
            )
        elif "Private video" in error_msg:
            raise RuntimeError("This video is private.")
        elif "Video unavailable" in error_msg:
            raise RuntimeError("Video is unavailable (may be deleted or geo-restricted).")
        elif "HTTP Error 429" in error_msg or "Too Many Requests" in error_msg:
            raise RuntimeError(
                "YouTube rate limit exceeded. Please wait 10-30 minutes."
            )
        else:
            raise RuntimeError(f"Download failed: {e}")


# ============================================================================
# Transcript Download
# ============================================================================

def get_transcript_cache_path(video_id: str) -> Path:
    """Get the cache file path for a transcript."""
    return TRANSCRIPT_CACHE_DIR / f"{video_id}.vtt"


def get_cached_transcript(url: str) -> Optional[Path]:
    """Check if transcript is already cached."""
    video_id = extract_video_id(url)
    if not video_id:
        return None

    cache_path = get_transcript_cache_path(video_id)
    if cache_path.exists():
        logger.info(f"Using cached transcript: {cache_path}")
        return cache_path

    return None


def download_transcript(
    url: str,
    use_cookies: bool = True,
    use_cache: bool = True,
) -> Optional[Path]:
    """
    Download English auto-generated subtitles from a YouTube video.

    Args:
        url: YouTube video URL
        use_cookies: Whether to use cookies for authentication
        use_cache: Whether to use/update transcript cache

    Returns:
        Path to the transcript file (.vtt format), or None if no subtitles available
    """
    if use_cache:
        cached_path = get_cached_transcript(url)
        if cached_path:
            return cached_path

    video_id = extract_video_id(url)
    if not video_id:
        raise ValueError(f"Could not extract video ID from URL: {url}")

    output_template = str(TRANSCRIPT_CACHE_DIR / video_id)

    ydl_opts = get_ydl_base_opts(use_cookies)
    ydl_opts.update({
        "skip_download": True,
        "writesubtitles": True,
        "writeautomaticsub": True,
        "subtitleslangs": ["en"],
        "subtitlesformat": "vtt",
        "outtmpl": output_template,
    })

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if info is None:
                raise ValueError(f"Could not extract info from URL: {url}")

            # Check if subtitles are available
            subtitles = info.get("subtitles", {})
            automatic_captions = info.get("automatic_captions", {})

            if not subtitles.get("en") and not automatic_captions.get("en"):
                logger.warning(f"No English subtitles available for {video_id}")
                return None

            logger.info(f"Downloading transcript for: {info.get('title', 'Unknown')}")
            ydl.download([url])

            transcript_path = get_transcript_cache_path(video_id)

            if transcript_path.exists():
                logger.info(f"Transcript saved to: {transcript_path}")
                return transcript_path
            else:
                logger.warning(f"Transcript download completed but file not found: {transcript_path}")
                return None

    except yt_dlp.DownloadError as e:
        logger.error(f"Failed to download transcript: {e}")
        return None


# ============================================================================
# Metadata Download
# ============================================================================

def get_metadata_cache_path(video_id: str) -> Path:
    """Get the cache file path for metadata."""
    return METADATA_CACHE_DIR / f"{video_id}.json"


def get_cached_metadata(url: str) -> Optional[Dict[str, Any]]:
    """Check if metadata is already cached."""
    video_id = extract_video_id(url)
    if not video_id:
        return None

    cache_path = get_metadata_cache_path(video_id)
    if cache_path.exists():
        logger.info(f"Using cached metadata: {cache_path}")
        try:
            return json.loads(cache_path.read_text())
        except Exception as e:
            logger.warning(f"Could not read cached metadata: {e}")
            return None

    return None


def download_metadata(
    url: str,
    use_cookies: bool = True,
    use_cache: bool = True,
) -> Dict[str, Any]:
    """
    Download full video metadata from YouTube.

    Args:
        url: YouTube video URL
        use_cookies: Whether to use cookies for authentication
        use_cache: Whether to use/update metadata cache

    Returns:
        Dictionary with video metadata (title, description, duration, chapters, thumbnail, etc.)
    """
    if use_cache:
        cached_metadata = get_cached_metadata(url)
        if cached_metadata:
            return cached_metadata

    video_id = extract_video_id(url)
    if not video_id:
        raise ValueError(f"Could not extract video ID from URL: {url}")

    ydl_opts = get_ydl_base_opts(use_cookies)

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if info is None:
                raise ValueError(f"Could not extract info from URL: {url}")

            metadata = {
                "id": info.get("id"),
                "url": info.get("webpage_url"),
                "title": info.get("title"),
                "description": info.get("description"),
                "duration": info.get("duration"),
                "duration_string": info.get("duration_string"),
                "upload_date": info.get("upload_date"),
                "uploader": info.get("uploader"),
                "uploader_id": info.get("uploader_id"),
                "channel": info.get("channel"),
                "channel_id": info.get("channel_id"),
                "channel_url": info.get("channel_url"),
                "view_count": info.get("view_count"),
                "like_count": info.get("like_count"),
                "thumbnail": info.get("thumbnail"),
                "thumbnails": info.get("thumbnails", []),
                "chapters": info.get("chapters", []),
                "tags": info.get("tags", []),
                "categories": info.get("categories", []),
                "is_live": info.get("is_live", False),
                "was_live": info.get("was_live", False),
            }

            logger.info(f"Downloaded metadata for: {metadata['title']}")

            if use_cache:
                cache_path = get_metadata_cache_path(video_id)
                cache_path.write_text(json.dumps(metadata, indent=2))
                logger.info(f"Metadata cached to: {cache_path}")

            return metadata

    except yt_dlp.DownloadError as e:
        raise RuntimeError(f"Failed to download metadata: {e}")


# ============================================================================
# Playlist Support
# ============================================================================

def download_playlist(
    playlist_url: str,
    include_videos: bool = False,
    use_cookies: bool = True,
    use_cache: bool = True,
) -> List[Dict[str, Any]]:
    """
    Download metadata and transcripts for all videos in a playlist.

    Args:
        playlist_url: YouTube playlist URL
        include_videos: If True, also download video files (default: False)
        use_cookies: Whether to use cookies for authentication
        use_cache: Whether to use/update cache

    Returns:
        List of dictionaries with video metadata and paths
    """
    playlist_id = extract_playlist_id(playlist_url)
    if not playlist_id:
        raise ValueError(f"Could not extract playlist ID from URL: {playlist_url}")

    ydl_opts = get_ydl_base_opts(use_cookies)
    ydl_opts["extract_flat"] = "in_playlist"

    results = []

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            playlist_info = ydl.extract_info(playlist_url, download=False)
            if playlist_info is None:
                raise ValueError(f"Could not extract playlist info from URL: {playlist_url}")

            entries = playlist_info.get("entries", [])
            total = len(entries)

            logger.info(f"Processing playlist: {playlist_info.get('title', 'Unknown')} ({total} videos)")

            for idx, entry in enumerate(entries, 1):
                try:
                    video_url = entry.get("url") or f"https://www.youtube.com/watch?v={entry['id']}"
                    video_id = entry.get("id")

                    logger.info(f"[{idx}/{total}] Processing: {entry.get('title', video_id)}")

                    # Download metadata
                    metadata = download_metadata(video_url, use_cookies=use_cookies, use_cache=use_cache)

                    # Download transcript
                    transcript_path = download_transcript(video_url, use_cookies=use_cookies, use_cache=use_cache)

                    # Optionally download video
                    video_path = None
                    if include_videos:
                        video_path = download_video(video_url, use_cookies=use_cookies, use_cache=use_cache)

                    results.append({
                        "metadata": metadata,
                        "transcript_path": str(transcript_path) if transcript_path else None,
                        "video_path": str(video_path) if video_path else None,
                    })

                except Exception as e:
                    logger.error(f"Failed to process video {idx}/{total}: {e}")
                    continue

            logger.info(f"Playlist processing complete: {len(results)}/{total} videos processed")
            return results

    except yt_dlp.DownloadError as e:
        raise RuntimeError(f"Failed to process playlist: {e}")


# ============================================================================
# Utility Functions
# ============================================================================

def get_cache_stats() -> Dict[str, Any]:
    """Get statistics about all caches."""
    stats = {}

    # Video cache
    if VIDEO_CACHE_DIR.exists():
        video_files = list(VIDEO_CACHE_DIR.glob("*.mp4"))
        video_size_mb = sum(f.stat().st_size for f in video_files) / (1024**2)
        stats["videos"] = {
            "count": len(video_files),
            "size_mb": round(video_size_mb, 2),
        }

    # Transcript cache
    if TRANSCRIPT_CACHE_DIR.exists():
        transcript_files = list(TRANSCRIPT_CACHE_DIR.glob("*.vtt"))
        transcript_size_kb = sum(f.stat().st_size for f in transcript_files) / 1024
        stats["transcripts"] = {
            "count": len(transcript_files),
            "size_kb": round(transcript_size_kb, 2),
        }

    # Metadata cache
    if METADATA_CACHE_DIR.exists():
        metadata_files = list(METADATA_CACHE_DIR.glob("*.json"))
        metadata_size_kb = sum(f.stat().st_size for f in metadata_files) / 1024
        stats["metadata"] = {
            "count": len(metadata_files),
            "size_kb": round(metadata_size_kb, 2),
        }

    return stats


def clear_cache() -> Dict[str, int]:
    """Clear all caches and return counts of deleted files."""
    counts = {}

    # Clear video cache
    if VIDEO_CACHE_DIR.exists():
        video_files = list(VIDEO_CACHE_DIR.glob("*.mp4"))
        for f in video_files:
            try:
                f.unlink()
            except OSError:
                pass
        counts["videos"] = len(video_files)

    # Clear transcript cache
    if TRANSCRIPT_CACHE_DIR.exists():
        transcript_files = list(TRANSCRIPT_CACHE_DIR.glob("*.vtt"))
        for f in transcript_files:
            try:
                f.unlink()
            except OSError:
                pass
        counts["transcripts"] = len(transcript_files)

    # Clear metadata cache
    if METADATA_CACHE_DIR.exists():
        metadata_files = list(METADATA_CACHE_DIR.glob("*.json"))
        for f in metadata_files:
            try:
                f.unlink()
            except OSError:
                pass
        counts["metadata"] = len(metadata_files)

    # Clear rate limit state
    state_file = VIDEO_CACHE_DIR / "rate_limit_state.json"
    if state_file.exists():
        state_file.unlink()

    logger.info(f"Cleared cache: {counts}")
    return counts

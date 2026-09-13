#!/usr/bin/env python3
"""
Parse the Beginners Cuban Salsa Steps Course metadata and transcripts.
Extracts move names, timestamps, and teaching structure from 15 classes.
"""

import json
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import re

# Video IDs for the 15 classes in order
VIDEO_IDS = [
    "Bah_PB9Ga4A",    # 1
    "4qMJzwT6xPM",    # 2
    "FUB6hqwNo0o",    # 3
    "seH4eLK_S6o",    # 4
    "WMgTtp-CRaQ",    # 5
    "U454lXjpKi8",    # 6
    "FNuS26xguaI",    # 7
    "E8Y7VwC4ODY",    # 8
    "k4H5m9hJ_nA",    # 9
    "nOABL5GW_qk",    # 10
    "8b0zqIk1AHE",    # 11
    "Gy8jEBggrLc",    # 12
    "ZArlfy9EakM",    # 13
    "tlUegbWymak",    # 14
    "qD6Vp3qj48o",    # 15
]

BASE_DIR = Path("/Users/louis.boguslav/Documents/perfect-workout")
INFO_DIR = BASE_DIR / "data/cache/salsa/info"
TRANSCRIPT_DIR = BASE_DIR / "data/cache/transcripts"


def load_info(video_id: str) -> Dict:
    """Load metadata from info.json file."""
    info_path = INFO_DIR / f"{video_id}.info.json"
    with open(info_path) as f:
        return json.load(f)


def load_transcript(video_id: str) -> Optional[List[Dict]]:
    """Load transcript from json3 file if it exists."""
    transcript_path = TRANSCRIPT_DIR / f"{video_id}.en-orig.json3"
    if not transcript_path.exists():
        return None

    with open(transcript_path) as f:
        data = json.load(f)

    # Parse json3 format: d['events'], each with 'tStartMs' and 'segs'
    events = data.get('events', [])
    transcript = []

    for event in events:
        t_start = event.get('tStartMs', 0)
        segs = event.get('segs', [])

        # Join segments and skip empty
        text = ''.join(seg.get('utf8', '') for seg in segs).strip()
        if text:
            transcript.append({
                'start_ms': t_start,
                'start_sec': t_start / 1000,
                'text': text
            })

    return transcript


def normalize_move_name(name: str) -> str:
    """Normalize move name for deduplication - remove quotes, lowercase, strip."""
    return name.replace('"', '').replace("'", '').lower().strip()


def extract_title_moves(title: str, class_num: int) -> List[Tuple[str, str]]:
    """Extract move names from video title. Returns list of (name, confidence)."""
    moves = []

    # Look for moves in parentheses
    if '(' in title and ')' in title:
        # e.g. "Class 2 (Basic Turns)" or "Class 11 (Cross, Cross & Slide)"
        match = re.search(r'\(([^)]+)\)', title)
        if match:
            content = match.group(1)
            # Remove surrounding quotes if present
            content = content.strip('"').strip("'")
            # Split by commas
            parts = re.split(r',\s*', content)
            for part in parts:
                part = part.strip().strip('"').strip("'")
                if part and len(part) > 2:
                    moves.append((part, "confirmed"))

    return moves


def extract_description_moves(description: str, class_num: int) -> List[Tuple[str, str]]:
    """Extract move names from video description."""
    moves = []
    lines = description.split('\n')

    # Find the move list section - it starts after "Class X step:" or "Class no. X."
    in_move_section = False
    for i, line in enumerate(lines):
        line_stripped = line.strip()

        # Start of move section
        if f'Class no. {class_num}' in line_stripped or f'Class {class_num} step' in line_stripped:
            in_move_section = True
            continue

        # End of move section
        if in_move_section and (line_stripped.startswith('---') or
                                'SUBSCRIBE' in line_stripped or
                                'Table of contents' in line_stripped or
                                'http' in line_stripped.lower()):
            break

        # Extract move names from the section
        if in_move_section and line_stripped:
            # Skip pure whitespace or very short lines
            if len(line_stripped) < 3:
                continue

            # Skip descriptive lines that aren't move names (for Class 9)
            if 'concept' in line_stripped.lower() or 'explain' in line_stripped.lower():
                # This is description, not a move name
                # But we might still want to parse it
                if ' - ' in line_stripped:
                    # e.g., "This time we explain a concept - tapping, using a feet action during pauses."
                    # Skip this kind of line
                    continue

            # Clean up the line
            move_name = line_stripped.strip('"').strip("'").strip()

            # Skip if it's too long (likely a description not a move name)
            if len(move_name) > 80:
                continue

            moves.append((move_name, "confirmed"))

    return moves


def find_timing_cues(transcript: List[Dict], class_num: int) -> List[Tuple[int, str]]:
    """Find explicit timing/count references in transcript. Returns (timestamp_sec, quote)."""
    if not transcript:
        return []

    cues = []

    # Patterns for timing cues: "on 3", "on 8", "quick quick slow", counts, etc.
    timing_patterns = [
        r'\bon\s+(\d|one|two|three|four|five|six|seven|eight)\b',
        r'\bcount\s+(\d+|one|two|three|four|five|six|seven|eight)\b',
        r'\b(quick|slow)\s+(quick|slow)\b',
        r'\beight\s+counts?\b',
        r'\bfour\s+counts?\b',
        r'\bone\s+two\s+three\b',
        r'\bfive\s+six\s+seven\s+eight\b',
    ]

    for entry in transcript:
        text_lower = entry['text'].lower()
        for pattern in timing_patterns:
            if re.search(pattern, text_lower):
                # Found a potential timing cue
                cues.append((int(entry['start_sec']), entry['text']))
                break  # Only count once per line

    return cues


def analyze_segments(chapters: List[Dict], transcript: Optional[List[Dict]], class_num: int) -> List[Dict]:
    """
    Analyze video structure into segments.
    Uses chapters if available, derives from transcript if not.
    """
    segments = []

    if chapters:
        # Use provided chapters
        for ch in chapters:
            title = ch.get('title', '').lower()
            start = ch.get('start_time', 0)
            end = ch.get('end_time', 0)

            # Classify chapter role
            role = "other"
            if any(kw in title for kw in ['intro', 'about', 'summary', 'outro', 'welcome']):
                role = "skip"
            elif any(kw in title for kw in ['presentation', 'explanation']):
                role = "teach"
            elif 'fluently' in title or 'with count' in title:
                role = "count"
            elif any(kw in title for kw in ['side view', 'front', 'back', 'camera', 'angle']):
                role = "angle"
            elif 'with music' in title:
                role = "music"
            elif 'review' in title:
                role = "review"

            segments.append({
                'start': start,
                'end': end,
                'duration': end - start,
                'title': ch.get('title', ''),
                'role': role
            })
    elif transcript:
        # Derive from transcript - look for section markers
        # Common markers: "let's start", "with music", "let's practice", etc.
        # For now, just mark intro/outro based on position
        total_duration = transcript[-1]['start_sec'] if transcript else 0

        segments.append({
            'start': 0,
            'end': min(30, total_duration * 0.1),
            'duration': min(30, total_duration * 0.1),
            'title': 'Intro (estimated)',
            'role': 'skip'
        })

        segments.append({
            'start': min(30, total_duration * 0.1),
            'end': total_duration - 30,
            'duration': total_duration - min(30, total_duration * 0.1) - 30,
            'title': 'Teaching (estimated)',
            'role': 'teach'
        })

        segments.append({
            'start': max(0, total_duration - 30),
            'end': total_duration,
            'duration': min(30, total_duration * 0.1),
            'title': 'Outro (estimated)',
            'role': 'skip'
        })

    return segments


def main():
    print("# Beginners Cuban Salsa Steps Course — Index\n")
    print("Analysis of 15 classes from La Suerte Dance School")
    print("Playlist: PL8hFYIpg2Jp1XK-ADBSd0B78_KgkdckYH\n")

    # Track all unique moves across the course
    all_moves = {}  # name -> {classes: [list], confidence: str, first_class: int}

    # Track which classes have transcripts
    print("## Data availability\n")
    print("| Class | Video ID | Info | Transcript | Chapters |")
    print("|-------|----------|------|------------|----------|")

    class_data = []

    for i, video_id in enumerate(VIDEO_IDS, 1):
        info = load_info(video_id)
        transcript = load_transcript(video_id)
        chapters = info.get('chapters', [])

        has_transcript = "✓" if transcript else "✗"
        has_chapters = "✓" if chapters else "✗"

        print(f"| {i:2d} | {video_id} | ✓ | {has_transcript} | {has_chapters} |")

        class_data.append({
            'num': i,
            'video_id': video_id,
            'info': info,
            'transcript': transcript,
            'chapters': chapters
        })

    print("\n**Note:** 7 classes have no auto-generated transcripts available. Move names for those classes are derived from titles only.\n")

    # Extract all move names
    print("\n---\n")
    print("## PART 1: Move Name Index\n")
    print("All distinct named steps/moves taught across the 15 classes, in order of first appearance:\n")

    move_counter = 0

    for cls in class_data:
        class_num = cls['num']
        info = cls['info']
        title = info.get('title', '')
        description = info.get('description', '')

        # Extract from title
        title_moves = extract_title_moves(title, class_num)

        # Extract from description
        desc_moves = extract_description_moves(description, class_num)

        # Combine
        for move_name, confidence in title_moves + desc_moves:
            # Normalize name for deduplication
            name_key = normalize_move_name(move_name)

            if name_key not in all_moves:
                move_counter += 1
                all_moves[name_key] = {
                    'display_name': move_name,
                    'classes': [class_num],
                    'confidence': confidence,
                    'first_class': class_num,
                    'number': move_counter
                }
            else:
                # Already seen - add this class
                if class_num not in all_moves[name_key]['classes']:
                    all_moves[name_key]['classes'].append(class_num)

    # Print in order of first appearance
    sorted_moves = sorted(all_moves.items(), key=lambda x: x[1]['first_class'])

    for name_key, move_data in sorted_moves:
        num = move_data['number']
        display_name = move_data['display_name']
        classes = move_data['classes']
        confidence = move_data['confidence']

        classes_str = ", ".join(str(c) for c in classes)
        appears_in = f"Class {classes_str}" if len(classes) == 1 else f"Classes {classes_str}"

        print(f"{num}. **{display_name}** — {appears_in} — *{confidence}*")

    print(f"\n**Total: {len(all_moves)} distinct moves identified**")

    # Now do per-class analysis
    print("\n\n---\n")
    print("## PART 2: Per-Class Breakdown\n")

    for cls in class_data:
        class_num = cls['num']
        video_id = cls['video_id']
        info = cls['info']
        transcript = cls['transcript']
        chapters = cls['chapters']

        title = info.get('title', '')
        duration = info.get('duration', 0)

        print(f"\n### Class {class_num}: {title}")
        print(f"**Video ID:** `{video_id}` | **Duration:** {duration}s ({duration//60}:{duration%60:02d})")

        # Extract moves for this class
        title_moves = extract_title_moves(title, class_num)
        desc_moves = extract_description_moves(info.get('description', ''), class_num)
        class_moves = title_moves + desc_moves

        if class_moves:
            move_names = [name for name, conf in class_moves]
            print(f"**Moves taught:** {', '.join(move_names)}")
        else:
            print("**Moves taught:** *(no named moves identified in title/description)*")

        # Segments
        segments = analyze_segments(chapters, transcript, class_num)

        if chapters:
            print(f"\n**Structure** (from YouTube chapters):")
        elif transcript:
            print(f"\n**Structure** (estimated from transcript):")
        else:
            print(f"\n**Structure** (no chapters or transcript available):")

        for seg in segments:
            start = int(seg['start'])
            end = int(seg['end'])
            dur = int(seg['duration'])
            role_label = {
                'skip': '⏭️ Skip',
                'teach': '📚 Teaching',
                'count': '🎯 Demo with count',
                'angle': '📹 Angle view',
                'music': '🎵 Practice with music',
                'review': '🔄 Review',
                'other': '▪️ Other'
            }.get(seg['role'], '▪️ Other')

            print(f"- {start:3d}s–{end:3d}s ({dur:3d}s) — {role_label}: {seg['title']}")

        # Physical description from transcript
        if transcript:
            # Look for the explanation/teaching section - usually after intro
            # Skip the first ~5 entries (intro/welcome)
            teaching_start = 5 if len(transcript) > 10 else 0

            # Extract key instructional segments from the teaching portion
            footwork_keywords = ['step', 'foot', 'feet', 'left', 'right', 'forward', 'back', 'side', 'turn', 'cross', 'tap', 'slide', 'weight', 'place', 'move']

            instructional_segments = []
            for entry in transcript[teaching_start:min(teaching_start + 40, len(transcript))]:
                text = entry['text']
                text_lower = text.lower()

                # Skip overly short entries
                if len(text) < 20:
                    continue

                # Look for instructional content
                if any(kw in text_lower for kw in footwork_keywords):
                    # Avoid intro/outro fluff
                    if not any(skip in text_lower for skip in ['welcome', 'subscribe', 'patreon', 'thank you', 'bye']):
                        instructional_segments.append(text)
                        if len(instructional_segments) >= 3:
                            break

            if instructional_segments:
                print(f"\n**Physical description** (inferred from transcript):")
                combined = ' '.join(instructional_segments[:2])
                # Truncate cleanly at word boundary
                if len(combined) > 400:
                    combined = combined[:400].rsplit(' ', 1)[0] + '...'
                print(f"> {combined}")
            else:
                # Fallback: just show what the class is about from early transcript
                first_meaningful = []
                for entry in transcript[:20]:
                    text = entry['text']
                    if len(text) > 25 and 'welcome' not in text.lower():
                        first_meaningful.append(text)
                        if len(first_meaningful) >= 2:
                            break

                if first_meaningful:
                    combined = ' '.join(first_meaningful)
                    if len(combined) > 350:
                        combined = combined[:350].rsplit(' ', 1)[0] + '...'
                    print(f"\n**Physical description** (from transcript intro):")
                    print(f"> {combined}")
                else:
                    print(f"\n**Physical description:** *(transcript available but minimal instructional content detected)*")
        else:
            print(f"\n**Physical description:** *(no transcript available)*")

        # Timing cues
        timing_cues = find_timing_cues(transcript, class_num)

        if timing_cues:
            print(f"\n**Timing cues identified:** {len(timing_cues)} instances")
            # Show first 3 examples
            for ts, quote in timing_cues[:3]:
                print(f"- {ts:3d}s: \"{quote[:80]}...\"" if len(quote) > 80 else f"- {ts:3d}s: \"{quote}\"")
            if len(timing_cues) > 3:
                print(f"- *(and {len(timing_cues) - 3} more)*")
        else:
            if transcript:
                print(f"\n**Timing cues:** *(none explicitly identified in transcript)*")
            else:
                print(f"\n**Timing cues:** *(no transcript available to analyze)*")

    print("\n\n---\n")
    print("## Summary\n")
    print(f"- **15 classes** analyzed")
    print(f"- **8 classes** with transcripts (1, 2, 3, 6, 9, 12, 14, 15)")
    print(f"- **7 classes** without transcripts (4, 5, 7, 8, 10, 11, 13)")
    print(f"- **{len(all_moves)} distinct moves** identified from titles and descriptions")
    print(f"- **4 classes** have YouTube chapters (1, 2, 3, 15)")
    print(f"\nFor classes without transcripts, manual video review is required to extract:")
    print(f"- Detailed footwork descriptions")
    print(f"- Timing cues and counts")
    print(f"- Segment boundaries for teaching/demo/music practice")


if __name__ == "__main__":
    main()

# Posture tab — plan

> **Status: built.** All five primary windows were approved and published;
> the alternates were not used. See "What shipped" at the bottom.

Source: **"Fix Bad Posture in 5 Minutes (FOREVER!)"** — ATHLEAN-X, uploaded 2022-11-06.
`https://youtu.be/YAUGMT0_PiE` · 6:37 (397s) · 1280x720 · downloaded to
`data/cache/videos/YAUGMT0_PiE_720p.mp4` (av1/opus) + `.en.vtt` + `.info.json`.

> Download note: the pinned `yt-dlp` 2026.03.17 in `/opt/homebrew/bin` 403s / hits
> "The page needs to be reloaded" on this video. What worked:
> `uvx --from "yt-dlp[default]" yt-dlp --js-runtimes node ...` (2026.08.19).

## Unique exercises — 5 total

Jeff's own labels (A–E) from the video description. Only 5 unique movements; the
5-minute routine is these 10 x 30s slots.

| # | Exercise | Targets | Notes |
|---|----------|---------|-------|
| A | Supermans | Thoracic spine / upper back strength | Prone, fists on sternum, "reveal the S" — reps, not a hold |
| B | Glute Bridge Marches | Glute strength-endurance | Bridge, alternate 5–6" foot lifts, no pelvis drop |
| C | Kneeling Thoracic Drops | Thoracic mobility + lat stretch | **Needs a chair** — elbows on seat, hands behind head, sink chest |
| D | Wall DLs | Glutes / full hip extension | **Needs a wall** — RDL hinge, drive knee back to wall. Per-leg |
| E | Bridge and Reach Overs | Combo: thoracic rotation + glutes | Bridge, reach opposite arm across and back |

## Routine order — 10 x 30s = 5:00 of work

| Slot | Move | Duration |
|------|------|----------|
| 1 | A. Supermans | 30s |
| 2 | B. Glute Bridge Marches | 30s |
| 3 | A. Supermans | 30s |
| 4 | B. Glute Bridge Marches | 30s |
| 5 | E. Bridge and Reach Overs | 30s |
| 6 | C. Kneeling Thoracic Drops | 30s |
| 7 | D. Wall DLs — **right** leg | 30s |
| 8 | C. Kneeling Thoracic Drops | 30s |
| 9 | D. Wall DLs — **left** leg | 30s |
| 10 | E. Bridge and Reach Overs | 30s |

Slots 1–5 are the "short on time" version (2:30). Slots 6–10 are the optional
second half — worth building in a stop point after slot 5.

## Clip source time frames

Each window sits **inside a single camera shot** (verified against ffmpeg scene
detection: cuts at 102.1, 127.2, 179.1, 190.7, 193.7, 221.6, 237.0, 247.7, 259,
303.8, 317.2) and shows the movement being performed, not Jeff talking.

| Move | In | Out | Len | Shot | Framing | ATHLEANX.COM watermark |
|------|-----|-----|-----|------|---------|------------------------|
| Supermans | 118.0 | 125.8 | 7.8s | 102.1–127.2 | Prone, side-on, shirt | yes (bottom-left) |
| Glute Bridge Marches | 180.0 | 190.3 | 10.3s | 179.1–190.7 | Side-on bridge, alternating leg lifts | no |
| Bridge and Reach Overs | 222.2 | 236.6 | 14.4s | 221.6–237.0 | Side-on bridge, both reach directions | no |
| Kneeling Thoracic Drops | 248.5 | 258.5 | 10.0s | 247.7–259.0 | Wide, chair visible, multiple reps | yes |
| Wall DLs | 305.5 | 315.8 | 10.3s | 303.8–317.2 | Wide full body at wall, full hinge cycle | yes |

Windows deliberately avoided: the shirtless macro close-ups (~128–178 in places,
260–279, 296–302 — body parts only, no context) and the hips-only close-up at
318–337.8 (Wall DL, crops out the upper body entirely). A "REMEMBER TO
SUBSCRIBE" overlay lands at ~316.3, which is why Wall DLs cuts at 315.8.

Two moves reuse one clip each (A and B appear twice; E twice; C twice; D twice
with a left/right label), so **5 clips, not 10**.

## Build steps

1. **`scripts/clip_posture_moves.py`** (new, uv). Cuts the 5 windows above from
   `data/cache/videos/YAUGMT0_PiE_720p.mp4` to
   `frontend/public/clips/stretching/posture/moves/*.mp4` — or a sibling
   `clips/posture/moves/`. Re-encode is mandatory: source is **av1/opus**, the
   rest of the app's clips are **h264/aac** (libx264, preset fast, crf 23, aac
   128k — same settings as `scripts/trim_stretch_clips.py`). Drop audio (`-an`)
   since the page mutes the clip element anyway. Slugs:
   `supermans`, `glute-bridge-marches`, `kneeling-thoracic-drops`,
   `wall-dls`, `bridge-and-reach-overs`.
2. **Full follow-along video.** Trim the source to the routine body and encode
   h264 to `clips/posture/fix-bad-posture.mp4` for the "Watch the full original
   video" panel.
3. **`frontend/src/data/posture-routine.ts`.** Reuse the `StretchMove` /
   `StretchRoutine` / `MusicTrack` shapes from `stretching-routine.ts` — export
   `FIX_BAD_POSTURE` with the 10 slots. Re-export `MUSIC_TRACKS` rather than
   duplicating it.
4. **`frontend/src/app/posture/page.tsx`.** Clone `stretching/page.tsx`; it
   already has everything asked for (start/pause/reset, per-move countdown ring,
   looping demo clip, lead-in "Get ready" break, spoken move names + chimes via
   `@/lib/cues`, wake lock, background music). One real change: the clip
   container is `aspect-[9/16] max-h-[42vh]` with `object-cover` because the
   stretching source is a vertical reel — this source is **16:9 landscape**, so
   use `aspect-video` (cropping these floor/wall shots to 9:16 would cut the
   body in half).
5. **Nav link.** Add `/posture` to the nav in `frontend/src/app/layout.tsx:42-81`
   (currently `/`, `/2025`, `/bodyweight`, `/stretching`, `/voice-training`).

## Timing decisions

- **Lead-in / rest between moves.** `DEFAULT_LEAD_IN = 5` (stretching uses 2 —
  these floor/chair/wall positions take longer to get into), with `leadIn: 12`
  on every slot in block 2, since each one changes your setup: floor -> chair
  (6), chair -> wall (7), wall -> chair (8), chair -> wall (9), wall -> floor
  (10). Wall clock: 5:00 of work + 0:25 + 1:00 of rest = **6:25**.
- **Halfway cues.** None of the five need "switch sides": B and E alternate
  continuously within the 30s, and D is one leg per slot (encoded in the move
  name instead). B carries a form cue at the midpoint — "don't let the pelvis
  drop".

## What shipped

| File | |
|---|---|
| `scripts/clip_posture_moves.py` | new — cuts the clips; `--review` builds the review page, no flag publishes |
| `frontend/src/data/posture-routine.ts` | new — `FIX_BAD_POSTURE`, 10 slots over 5 clips; imports `MUSIC_TRACKS` from the stretching routine rather than duplicating it |
| `frontend/src/app/posture/page.tsx` | new — the timer page |
| `frontend/src/app/layout.tsx` | one nav link added between Stretching and Voice Training |
| `frontend/public/clips/posture/moves/*.mp4` | 5 clips, h264/yuv420p, no audio |
| `frontend/public/clips/posture/fix-bad-posture.mp4` | full 6:37 video transcoded to h264/aac (source is av1/opus, which Safari cannot decode) |

Deliberate differences from the stretching page, both forced by this source
being landscape rather than a vertical reel:

- clip container is `aspect-video`, not `aspect-[9/16]`
- the slot list keys on index, not `m.name` — names repeat across the 10 slots,
  so name keys would collide

Additions the stretching page does not have: `setup` badges (Floor / Chair /
Wall) on each slot and in the "Get ready" overlay, `blockLabel` section
headings, and a "Finish here" button during slot 5 for the 2:30 version.

Pre-existing lint state: the `react-hooks/refs` "cannot access refs during
render" rule already fires 5x on `stretching/page.tsx` and 5x on
`voice-training/page.tsx`. The posture page inherits the same ref-sync pattern
and so reports the same 5 errors — left consistent with the other two rather
than changing the timer's timing semantics in a new file only.

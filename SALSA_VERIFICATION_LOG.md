# Salsa tab — verification log

> Every value in the Salsa data carries a `confidence` of `verified`,
> `transcript` or `suspect` (`frontend/src/data/salsa-types.ts`). This file is the
> list of things **no human has watched yet**, so that "unverified" is a tracked
> state rather than a vague worry.
>
> It covers both courses: the solo steps course first, then the couples course
> from §8 on.
>
> Charter: `SALSA_TAB_GOALS.md`. Requirement R3 is why this file exists — every
> cue carries a source timestamp precisely so it can be re-checked later. This
> is the worklist for doing that.
>
> **Nothing here is a bug.** These are places where the source material is
> genuinely ambiguous, or where a value was derived from a transcript rather
> than read off the video. The page renders them honestly. Resolving an item
> means opening the deep link, watching a few seconds, and either flipping
> `confidence` to `'verified'` or correcting the value.

## Status of the steps course, at a glance

| | Count |
|---|---|
| Moves | 22 |
| Moves flagged incomplete (`complete: false`) | **0** |
| Moves missing a slow or fast clip | **0** |
| Cues | 237 |
| Cues with a source timestamp | 237 (**mandatory**, R3) |
| Cues at `confidence: 'suspect'` | **1** |
| Segments at `confidence: 'suspect'` | **1** |
| Clips carrying a `caveat` | **9** |
| Everything else | `confidence: 'transcript'` — faithful to the audio, not eye-checked |

There is no `verified` value anywhere in the data yet. That is accurate: the
course was built from transcripts and clip windows, and no one has sat down with
the video open to confirm a single cue. Doing so is the highest-value follow-up
in the tab.

---

## 1. The suspect cue — Mambo Cubano arms

The only cue the data actively distrusts. Rendered on the page as **Unverified**
with the warning shown inline, and **never spoken aloud in drill mode**.

| | |
|---|---|
| Move | Mambo Cubano (steps Class 7) |
| Cue id | `mambo-arms-right` |
| Kind | `arms` |
| Text | "When you touch with the right, arm goes up." |
| Source | `FNuS26xguaI` @ 143.4 → https://youtu.be/FNuS26xguaI?t=143 |
| Outlines flag | `C7-b` |

**Why it's suspect.** Two independent reasons, either of which alone would only
warrant a caveat:

1. Whisper transcribed the same words twice, at @143.40 and @145.98. A duplicate
   usually means the decoder looped rather than that the teacher repeated
   themselves, so the timestamp may belong to neither instance.
2. As written it **contradicts the same class 2.5 seconds earlier** — @140.86
   establishes "arms move opposite to the legs", which would put the arm *down*
   on a right touch, not up.

**How to resolve it.** Listen to `FNuS26xguaI` from about 138 to 150 seconds.
Three outcomes, all fine:

- The teacher really says the arm goes up → the "opposite" rule has an exception
  here. Model it with `exceptions` on the move (Quick 5 already does this
  against Class 6's arm rule) and set both cues to `verified`.
- The teacher says the arm goes *down* → correct `text`, set `verified`, drop
  the `warning`.
- It's inaudible → leave `suspect`. That is a legitimate final state.

Do **not** simply delete the cue. The arm question is the substance of the class
and the page saying "we don't know" is better than the page being silent.

## 2. The suspect segment — steps Class 8 music block

| | |
|---|---|
| Class | 8 — Three, Two, One (`E8Y7VwC4ODY`) |
| Segment id | `c8-music` |
| Stored window | 380.1 → 530.3 |
| Label | "Three Two One + review" |

**Why it's suspect.** The segment start is not determinable from the transcript:
Whisper looped over the music from 387.7 to 410.1, so the audio in that stretch
produced no trustworthy word timings. The safe interval is 380.1–410.1 and the
first real call is @410.10.

**How to resolve it.** Scrub `E8Y7VwC4ODY` between 380 and 412 and find where the
music block actually begins. This affects a segment boundary, not a clip — the
`three-two-one-fast.mp4` clip is cut elsewhere and is unaffected.

## 3. The nine clips with caveats

These clips are published and correct, but each is imperfect in a way the page
states under the player rather than hiding. Listed here so a reviewer can decide
whether a better window exists. **Never silently drop a caveat** — that converts
an honest limitation into a lie.

| Move | Clip | The caveat |
|---|---|---|
| Basic to the side | `basic-side-fast` | First ~23s is not verbally identified as side vs front — verify by eye. |
| Basic front and back | `basic-front-and-back-fast` | Class 1's music block spends only ~12s on this basic; the clip is 11.8s. |
| Basic body movement | `basic-body-movement-fast` | Teachers deliberately chose **slow** music (@674.52 "so you can have a clear view"), so "fast" is a misnomer. Teacher also talks over 686.7–696.3. |
| Three, Two, One | `three-two-one-fast` | Teacher counts aloud over the music — not a silent demo. Final ~1s begins the next call. |
| Cross front and back | `cross-front-and-back-fast` | 17.2s, under the 23s reference floor. Accepted: a clean 17s loop beats a 32s loop of the wrong move. |
| Cross and slide | `cross-and-slide-fast` | Last ~9s drifts back to the plain front-and-back basic. |
| Charanga | `charanga-fast` | From ~305 the teacher explains the Mambo Cubano combination while dancing it. |
| Step in a spot | `step-in-a-spot-fast` | First ~3s is still the side basic. |
| Quick 5 | `quick-5-fast` | Class 14's music is announced only as "slow tempo", no BPM — so this "fast" clip is slower than Class 7's. |

Two of these are worth a second look specifically because the *tempo label* is
wrong rather than the content: `basic-body-movement-fast` and `quick-5-fast` are
both slower than other classes' fast clips. The label override field (`label` on
`SalsaClip`) exists for exactly this and is currently unused for them.

## 4. Two clip windows resolved from word timings, not from the outlines

The outlines left these two windows as a range rather than a pair of numbers.
A decision pass resolved them from word-level timings; the reasoning is recorded
in `SALSA_STEPS_BUILD_SPEC.md` §3, rows 5 and 17. They are the windows most
likely to be a few seconds off, because nothing in the source states them
directly.

| Move | Class | Window | Outlines had said |
|---|---|---|---|
| `right-turn-front-back` | 2 | 409.1 → 442.9 | *"(within 371.3 → 452.7)"* |
| `cross-and-slide` | 11 | 310.2 → 334.8 | *"(within 310.2 → 334.8)"* |

Both are word-anchored at each end — see the spec for the exact phrases — but
"the transcript supports this boundary" is weaker than "someone watched it".

## 5. Eight alternate windows kept for review

`data/review/salsa/index.html` plays the published clip next to a rejected
alternate window, side by side. The alternates are **not** in the TS data
(`alternates` is empty everywhere) and are not shipped in `frontend/public/` —
they exist only under the gitignored `data/` tree.

Alternates exist for: `basic-side-slow`, `charanga-slow`, `cross-and-slide-slow`,
`enchufla-slow`, `exhibela-crossing-slow`, `hook-turn-slow`, `quick-5-slow`,
`three-two-one-slow`.

If an alternate turns out to be the better cut, re-cut with
`uv run scripts/clip_salsa_steps.py --only <slug>` after fixing the window in
the spec, so the published file and the spec never disagree.

## 6. Four moves exceed the drillable-cue cap

`SALSA_STEPS_BUILD_SPEC.md` §5 caps a move at 8 drillable cues (kinds
`footwork`, `lead`, `arms`, `rhythm` — see `DRILLABLE_CUE_KINDS`). Four moves are
over. This was flagged rather than fixed, deliberately: trimming means deciding
which real instruction the teachers gave doesn't matter, which is an editorial
call, not a mechanical one.

| Move | Drillable cues | Cap |
|---|---|---|
| Basic body movement | 12 | 8 |
| Mambo Cubano | 11 | 8 |
| "Tapping on 8" footwork | 9 | 8 |
| Quick 5 | 9 | 8 |

The first two are the genuinely dense classes — body movement is four
independent axes (knees, hips, ribcage, arms) and Mambo Cubano layers arms onto
a new footwork. The cap may simply be wrong for them; raising it for
`kind: 'body-movement'` moves is a legitimate resolution.

## 7. Two classes worth re-transcribing

Both suspect items above trace to transcript noise in the same two classes.
Re-running them may resolve items 1 and 2 without any manual watching:

```
uv run scripts/transcribe_salsa.py ids FNuS26xguaI E8Y7VwC4ODY --force
uv run scripts/normalize_salsa_terms.py
```

Whisper is non-deterministic across runs on ambiguous audio, so a second pass
sometimes breaks a loop that the first pass fell into. If the duplicate at
@143.40/@145.98 disappears, item 1 is settled cheaply. If it reappears
identically, that is evidence the teacher *did* repeat themselves and the cue is
probably real.

---

## 8. The couples course — what is unverified, and what is simply missing

The couples course (21 classes, `PL8hFYIpg2Jp1EJE3TCWMr0f_zr9WOi10j`) was built
the same way and is unverified in the same way: no one has watched a second of it.
Its specs are `SALSA_COUPLES_SPEC_PART1.md` (classes 1–7), `PART2` (8–14) and
`PART3` (15–21), and between them they record **over 100 numbered known defects**
(K1-a … K21-x, plus five course-wide ones GC-a … GC-e). Those files are the
detailed worklist; this section records only what someone picking the work up
needs to know before opening them.

Two things make it a harder verification job than the steps course.

**The lead cues are the point, and they are the least checkable.** The steps
course has zero `kind: 'lead'` cues — it is solo footwork. The couples course is
full of them, and many are said exactly once, with the partner deliberately held
still so the hand is visible. A transcript can tell you *that* a hand goes over
her head; it cannot tell you which hand, or how high, and the teachers frequently
do not say. Every `lead` cue is therefore a stronger candidate for eye-checking
than any footwork cue in the steps course.

**Leader and follower must never be merged.** R4 forbids collapsing the two roles
into one instruction, and `role: 'both'` is reserved for genuinely
role-independent advice. The specific failure mode to watch for while reviewing:
a `both` cue containing a possessive limb reference ("your right hand") that
actually differs by role. That is a merge wearing a disguise.

### 8.1 ~~Five class videos were never downloaded~~ — RESOLVED

**Struck, because it is fixed.** All 21 couples class videos are on disk at
1280x720, and the cutter now produces all 60 clip files with nothing skipped. The
ten windows this section used to list as blocked — including the six slow, counted
ones, which were the real cost — are cut and published.

It is kept rather than deleted because the diagnosis recorded here was **wrong**,
and the way it was wrong is worth not repeating. This section previously said the
failure was a genuine YouTube rate limit, that retrying would not clear it, and
that the fix "needs a human" to sign in. None of that was true. There were three
independent causes, and the bot-check error message pointed at none of them:

1. **yt-dlp was five months stale.** It was resolved unpinned, so uv served
   2026.03.17 from its cache while PyPI had 2026.8.19, and `--refresh-package`
   did not dislodge it. A version floor in the PEP 723 header did.
2. **The JS challenge needed its solver, not just an engine.** `--js-runtimes
   node` alone is no longer enough; `--remote-components ejs:github` fetches the
   solver script itself. Without it, extraction reports "n challenge solving
   failed" and then falls through to **"Sign in to confirm you're not a bot"** —
   which is why this was misread as authentication. That is the trap.
3. **yt-dlp then picked a client that only offers muxed 360p** (`visionos`).
   `--extractor-args youtube:player_client=ios,web_safari,mweb` restores the HLS
   ladder. Without this the downloads "succeed" at a resolution too coarse to
   read footwork from, which is worse than failing.

`--no-warnings` in the downloader had been suppressing the diagnostics that said
all of this. The fix is committed in `scripts/download_salsa_videos.py`; its
docstring carries the full reasoning.

Two things follow for anyone reading the rest of this file:

- **No `ClipPair` side anywhere in the couples course is `null` for want of a
  file.** The single remaining one-sided pair is Class 21's missing *slow* clip,
  and that is editorial, not mechanical: the class has no count chapter at all —
  it is one continuous full-tempo song — so there is nothing to cut and none
  should be synthesised.
- **A cookie/sign-in workaround was authorised and used during the diagnosis**
  (`--cookies-from-browser brave`) but turned out not to be what fixed it. The
  flag stays opt-in and off by default: it attaches the account's identity to
  every request. Do not reach for it first next time — check the yt-dlp version
  and the challenge diagnostics before assuming an account problem.

### 8.2 The three official shorts for classes 5–7 contain no speech

`qwR89NAQgqM` (El Uno), `V57F7c5R5jY` (Kentucky) and `18cM9UvzsoI` (Vacilala por
la mano) are a continuous music bed with **zero speech**. Whisper hallucinated
transcripts over them; those were deleted. Consequences worth knowing:

- **No cue may ever be sourced from a short.** R3 requires a real timestamp in
  real audio.
- ~~The `.m4a` audio for all three is still cached, so a re-run would silently
  regenerate the same garbage into the alias corpus.~~ **Closed.**
  `transcribe_salsa.py` now refuses any id in `SHORTS` (all 15, not just these
  three) unless `--allow-music-only` is passed, and says why. The cached audio can
  stay: the hazard was never the files, it was that `ids <short>` took two seconds
  and looked like it had worked. (`SALSA_COUPLES_SPEC_PART1.md` K5-a.)
- All three carry a burned-in banner over roughly a quarter of the frame, which
  is why every one of those fast clips is caveated.

### 8.3 The highest-value four seconds in the whole course

`SALSA_COUPLES_SPEC_PART2.md` §10.3: the **slow alternate** for
`enchufla-doble-alarde`, at `CkZO6nyJwjw` 234.64 → 264.98 (30.3s), is three
counted reps, uninterrupted, from the second camera — longer and cleaner than the
published window (174.02 → 193.98, 20.0s, which is under the 23s floor and has
the teacher talking to his partner through the middle of it).

It is the alternate only because the teachers announce "We'll do the same
**opposite direction**" @231.46, and the transcript cannot say whether that means
the camera moved or the move is being led to the other side.

**Watch 231–235. If the footwork is unchanged, publish the alternate instead.**
Four seconds of watching upgrades one of the course's weakest slow clips to one
of its strongest.

### 8.4 Windows shared between moves

Seven encoded files serve more than one move, because the teachers demonstrate a
combination rather than an isolated figure — that is why 68 manifest rows resolve
to 60 files. These are correct, not duplicates, but each one is a place where a
reviewer should confirm the file really does show the move it is being offered for:

| File | Also used by | Why |
|---|---|---|
| `enchufla-doble-alarde-exhibela-fast.mp4` | `enchufla-doble-alarde`, `exhibela-crossing` | Class 10's short is one continuous combination through all three |
| `adios-con-la-hermana-fast.mp4` | `enchufla-mix` | Class 8's short covers the move and its ending |
| `vacilala-fast.mp4` | `vacilala-los-dos` | One short for a class that teaches two moves — **which of the two it actually shows is unknown until someone watches it** |
| `arriba-abajo-slow.mp4` / `-fast.mp4` | `arriba`, `abajo` | The teachers name and demonstrate both in the same breath |
| `solo-sequence-one-slow.mp4` / `-fast.mp4` | `release-and-return` | Class 20 teaches the release as part of sequence one, never on its own |

The `vacilala` row is the one that matters: it is the only shared file where the
sharing may be simply wrong. The two `solo-sequence-one` rows are the newest and
the least checked — they only became cuttable once §8.1 was fixed.

### 8.5 Clips under the 23-second reference floor

R2 asks for 23–47s. **21 of the 60 published couples clips come in under it, and
14 of those are the slow grain** — a much worse rate than the steps course, and
the single biggest quality gap in this course. It is not padding that could be
fixed by extending a window: in each case the demo itself is that short, because
the teachers move on to leading and etiquette instead of repeating the figure.

(Counted per encoded file, not per manifest row — see §8.4 for the seven files
that serve two moves each. Recomputed after §8.1 was fixed; the ten new clips
added two under-floor entries, both from Class 17.)

They are cut and published anyway — a short counted demo beats none — and each
carries a caveat. The extremes:

| Clip | Duration | |
|---|---|---|
| `vacilala-los-dos-slow.mp4` | **11.5s** | a single repetition |
| `la-chica-fast.mp4` | 12.8s | |
| `el-chico-fast.mp4` | 13.3s | |
| `los-dos-fast.mp4` | 13.9s | |
| `el-uno-semi-complicado-fast.mp4` | 15.2s | not isolated — first ~8s is Sombrero complicado doble |
| `el-chico-slow.mp4` | 16.8s | |
| `el-uno-semi-complicado-slow.mp4` | 16.8s | middle ~7s is the teacher standing still, explaining |

`el-uno-semi-complicado` is the worst-served move in the course: **both** its
clips are under the floor and **neither** shows the move on its own. Class 17's
official short is Juana la Cubana, so there is no clean full-tempo window
anywhere. If any move deserves a re-cut from a better window, it is this one.

Where a spec found a longer window but held it back for a resolvable ambiguity,
it is in `ClipPair.alternates` — §8.3 is the best of those. Reviewing the
alternates is the cheapest way to raise this course's clip quality.

### 8.6 Classes worth re-transcribing

`SALSA_COUPLES_SPEC_PART2.md` names Class 11's arms explanation (143–193s) as its
top verification priority. As with steps classes 7 and 8 (§7 above),
re-transcribing with a different seed sometimes breaks a loop the first pass fell
into, and is cheaper than watching.

---

## How to record a resolution

1. Change the value and set `confidence: 'verified'` in the relevant fragment
   under `frontend/src/data/salsa-steps-classes/` or
   `frontend/src/data/salsa-couples-classes/`.
2. Delete the `warning` if it no longer applies. Keep `flag` — it is
   traceability back to `SALSA_STEPS_OUTLINES.md` and stays forever.
3. Strike the row here rather than deleting it, and note what was seen. A
   checked item that turned out fine is as useful as one that turned out wrong.
4. `npx tsc --noEmit` in `frontend/`, then
   `uv run --with playwright scripts/test_mobile_layout.py`.

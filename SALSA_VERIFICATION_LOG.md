# Salsa tab — verification log

> Every value in the Salsa data carries a `confidence` of `verified`,
> `transcript` or `suspect` (`frontend/src/data/salsa-steps-types.ts`). This file
> is the list of things **no human has watched yet**, so that "unverified" is a
> tracked state rather than a vague worry.
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

## How to record a resolution

1. Change the value and set `confidence: 'verified'` in the relevant fragment
   under `frontend/src/data/salsa-steps-classes/`.
2. Delete the `warning` if it no longer applies. Keep `flag` — it is
   traceability back to `SALSA_STEPS_OUTLINES.md` and stays forever.
3. Strike the row here rather than deleting it, and note what was seen. A
   checked item that turned out fine is as useful as one that turned out wrong.
4. `npx tsc --noEmit` in `frontend/`, then
   `uv run --with playwright scripts/test_mobile_layout.py`.

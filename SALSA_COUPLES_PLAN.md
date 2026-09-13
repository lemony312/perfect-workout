# Cuban Salsa — Beginners Course for Couples — deferred plan

> **Status: NOT STARTED. Deliberately deferred.** The solo steps course
> (`SALSA_STEPS_OUTLINES.md`) is being built first. This document records
> everything already known about the couples course so that nothing has to be
> re-researched when we pick it up, and so the work can be handed to someone
> cold.
>
> Charter: `SALSA_TAB_GOALS.md`. Read that first — the requirements R1–R5 below
> refer to it.

## Why it's deferred, and why that's safe

The couples course is the *core* of the tab (charter: "Partnerwork. The core of
the tab.") and it is where the lead cues live — the thing R3 exists for. So this
is a deferral of the most important content, not the least. It's safe because
the steps course exercises the whole pipeline end to end on easier material:
solo footwork has no leader/follower ambiguity, no hand cues, and no partner
timing. Whatever the steps page teaches us about clip lengths, data shape and
page ergonomics will be cheaper to learn there and reuse here than to discover
on 21 classes of partnerwork.

**The one thing to avoid:** shipping a steps page whose data model can't express
a lead cue. See "Data model must already fit" below.

## What is already done

- **All 21 classes indexed** with video IDs, durations, chapters and the
  description-derived move names — see the table in `SALSA_TAB_GOALS.md`.
- **Metadata cached** at `data/cache/salsa/info/<VIDEO_ID>.info.json` (all 21).
- **Whisper transcript for Class 11 (Setenta) only**, at
  `data/cache/salsa/whisper/QueWxI6vMrc.norm.json` — produced as the A/B test
  that validated the local-transcription approach. The other 20 are not done.
- **The pipeline itself is built and proven**: `scripts/transcribe_salsa.py`
  already contains the full `COUPLES` list in playlist order, so transcribing
  the whole course is one command.

## What needs to happen

### 1. Transcribe the remaining 20 classes

```
uv run scripts/transcribe_salsa.py couples
uv run scripts/normalize_salsa_terms.py
```

~4.5 hours of audio at ~7x realtime, so roughly 40 minutes plus download time.
Class 11 is already cached and will be skipped.

Then **check the normalizer's near-miss report**. The couples course is far
denser in Spanish than the steps course (Setenta, Vacilala, Paseala, Adios con
la hermana, Juana la Cubana, Sombrero complicado doble…), so expect new variants
that `ALIASES` doesn't yet cover. The report exists precisely so these surface
instead of being silently accepted. Also fold in the 12 alias additions already
surfaced by the steps pass and listed at the end of
`SALSA_STEPS_OUTLINES.md` — several are couples-course terms
(`Pasa Yala` → Paseala) that the steps pass only saw in passing.

### 2. Exploit the chapters — this course is much easier than the steps course

The single biggest difference, and the reason this course should go *faster*
despite being larger:

| | Steps course | Couples course |
|---|---|---|
| Classes with YouTube chapters | 4 of 15 (one of them mislabelled) | **21 of 21** |
| Chapters per class | 3–6 | 7–14 |
| Separate "fluently with count" chapter | **none** | **16 classes have one** |
| Move names in the description | yes | yes, plus an explicit "we show and explain how to do:" list |

So `count` and `music` windows can be read straight off the chapter boundaries
rather than derived from spoken cues. Normalize chapter titles with the role
vocabulary already established in `SALSA_TAB_GOALS.md`:

| Role | Chapter titles seen |
|---|---|
| `teach` | "presentation & explanation", "explanation", "presentation" |
| `count` | "fluently with count" |
| `angle` | "side view", "front camera", "back camera", "both cameras", "different angle" |
| `music` | "with music" |
| `review` | "review with music" |
| `skip` | "intro", "about this class", "summary / outro" |

**But verify, don't trust.** Steps Class 2's chapters were actively mislabelled
(a 25s "Left Turn" chapter over a 67s teach block). Check every chapter boundary
against the transcript before cutting a clip on it.

### 3. Fill the shorts gap — the ten foundational moves

This is the most important single task in the couples course, and it is called
out as non-negotiable in the charter (R2).

The official shorts playlist covers **classes 5–19 only**. There is no short for:

| Class | Moves with no short |
|---|---|
| 1 | al centro, arriba, abajo |
| 2 | la chica, el chico, los dos |
| 3 | dile que no, guapea |
| 4 | enchufla, enchufla al centro |
| 20 | solo sequences |
| 21 | *(all-moves demo — no new moves, no short needed)* |

Those ten are the absolute foundations — `dile que no` and `guapea` are in
practically every Cuban salsa combination — and they are exactly the ones with
no loopable demo. **Cut them ourselves** from each class's `count` chapter.
Do not ship those ten as "long video only".

The 15 classes that *do* have shorts (5–19) still need a slow clip cut from the
class, because a short is a full-tempo demo. See "slow and fast" below.

### 4. Extract the lead cues — the actual point

This is the work R3 exists for and the reason the tab is not a playlist embed.

For each move, read the `teach` chapter transcript **with the video open** and
write one entry per lead action, anchored to a beat:

```
Setenta · cue 2 of 5
  Beat 3   — left hand up, over her head, palm forward. Elbow soft.
  Source   — Class 11 @ 1:42  (youtu.be/QueWxI6vMrc?t=102)
```

Rules, from the charter:

- **Every cue carries its source timestamp.** A cue without one is a guess and
  does not belong in the data (R3).
- **Leader-first, and never merge roles.** "Your left hand" is ambiguous and
  actively dangerous if you can't tell whose hand. Follower cues go in a
  separate labelled field (R4). The steps course already proved this matters:
  steps Class 8 contains a live on-camera disagreement where the leader uses
  the opposite arm to the foot and the follower the same arm.
- **Do not invent Spanish or invent moves** (R1, non-goals).
- Whisper garbles the count-along passages ("5, 6, 7, nya nya", "cheeky
  cheeky") — those are the teachers vocalising rhythm, not instructions, and
  they occur in the demo segments we cut as clips rather than the explanation
  segments we mine. Don't try to parse them.

Class 11 is worth doing first as the reference example: it's already
transcribed, and the class explicitly discusses leading — *"if you pay attention
in every single move how our arms are moving, which signals we are giving in
which moment — it does matter, timing matters, precision of the lead matters."*

### 5. Slow and fast, per move

Same rule as the steps page (R2): every move needs a slow clip and a fast clip.

| | Source |
|---|---|
| **slow** | the class's `count` chapter ("fluently with count") |
| **fast** | the class's `music` chapter, or the official vertical short |

Note the aspect-ratio split: classes are **1920x1080 landscape**, shorts are
**1080x1920 vertical**. Both must be handled in one player. The Posture page hit
exactly this problem — see step 4 of `POSTURE_ROUTINE_PLAN.md`.

### 6. Model the many-to-many relationships

Three structural facts the data model has to express. All three are already
visible in the research and all three break a naive one-move-per-class model:

- **One class can teach several moves.** Class 10 teaches "enchufla doble,
  alarde" *and* "enchufla doble, alarde, exhibela" as separate chaptered
  sequences. Class 14 teaches Vacilala and Vacilala los dos.
- **One move can be taught in several classes, in both courses.** `Enchufla`
  and `Exhibela` are taught solo in steps classes 4 and 5 *and* partnered in
  couples classes 4 and 10. That is **one move with multiple teaching sources**,
  not two moves that share a name.
- **Moves compose.** Setenta is built from Enchufla plus Dile que no; Class 17
  teaches "Juana la Cubana" and "(El uno) semi complicado". Class 21 is a
  recap of everything. The dependency edges are implied by the class order and
  are worth capturing, even though **presentation order stays as filmed**
  (charter, "Decided").

### 7. Ordering

Playlist order, as decided. Classes 1→21. Do not reorder into a
dependency-graph sequence; regrouping is presentation-only.

## Data model must already fit

Whatever ships for the steps page has to be able to express a lead cue without a
migration, or step 4 above turns into a refactor. Minimum shape:

```ts
interface LeadCue {
  /** Which beat of the 8 this happens on: 1..8. */
  beat: number
  /** Leader's action, imperative, from the leader's point of view. */
  text: string
  /** Whose action this is. Never merge the two (R4). */
  role: 'leader' | 'follower'
  /** Seconds into the source video. Mandatory (R3). */
  sourceStart: number
  sourceVideo: string
}
```

The steps course populates `role: 'leader'` sparsely and `beat` often (footwork
is beat-anchored), so the field earns its place immediately rather than sitting
unused until the couples work starts.

## Effort estimate

| Task | Rough cost |
|---|---|
| Transcribe + normalize 20 classes | ~1 hour, mostly unattended |
| Verify chapter boundaries against transcripts | ~2 hours |
| Cut clips: 10 missing foundations + ~30 slow/fast pairs | ~3 hours |
| Lead-cue extraction, 21 classes with video open | **the bulk of it** — budget a day |
| Page work | small, if the steps page is reused |

The lead-cue pass dominates and cannot be automated away. That is the tab's
actual value, so it is the right place to spend the time.

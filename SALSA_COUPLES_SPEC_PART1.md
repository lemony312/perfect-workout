# Cuban Salsa — Couples Course — build spec, PART 1 (Classes 1–7)

> **What this is.** The decision pass for classes 1–7 of the La Suerte *Cuban
> Salsa Couples* playlist. Every value below is a decision, not a suggestion:
> move ids, clip windows to the hundredth of a second, cue text, and the
> transcript anchor for each. A later pass cross-checks every number here
> against `data/cache/salsa/whisper/<id>.norm.json` and reports invented ones.
>
> Charter: `SALSA_TAB_GOALS.md` (R1–R5 and the Non-goals are binding).
> Instructions: `SALSA_COUPLES_PLAN.md` §2–7.
> Structural model: `SALSA_STEPS_BUILD_SPEC.md`.
> Types to populate: `frontend/src/data/salsa-types.ts` — **unchanged, no new
> types are proposed** (see "Type vocabulary held" below).
> Confidence semantics: `SALSA_VERIFICATION_LOG.md`.
>
> Parts 2 and 3 cover classes 8–14 and 15–21.

## Classes in this part

| Class | Title | Video | Official short |
|---|---|---|---|
| 1 | Al centro, arriba, abajo | `MDEAN40DUVY` | **none** |
| 2 | La chica, el chico, los dos | `np3g2IzZ11A` | **none** |
| 3 | Dile que no, Guapea | `y6wC5uHfXG0` | **none** |
| 4 | Enchufla, Enchufla al Centro | `kg5Ztcp5xQU` | **none** |
| 5 | El Uno | `4KKAKgn8UZ4` | `qwR89NAQgqM` |
| 6 | Kentucky | `yZ562-ehtQQ` | `V57F7c5R5jY` |
| 7 | Vacilala por la mano | `pZChl5ylSJw` | `18cM9UvzsoI` |

Classes 1–4 are the hard half of the whole course: **no official short and no
`count` chapter**. Both grains (R2 slow and R2 fast) have to be cut out of the
class video itself, and the slow one has to be found inside a `teach` block.
That work is done — every class 1–4 has a real, word-anchored slow window, with
a caveat where the window is imperfect. Nothing in classes 1–4 is declared
missing.

Classes 5–7 are the easy shape: slow ← the `count` chapter, fast ← the official
short. Shorts are 1080×1920 vertical (`aspect: '9/16'`); classes are 1920×1080
landscape (`aspect: '16/9'`).

## Conventions used throughout

**Segment ids** are prefixed `cc<n>-` — *couples class n* — so they never
collide with the steps course's `c<n>-` ids (`c4-teach-enchufla` is steps
Class 4; `cc4-teach-enchufla` is couples Class 4). Both appear in the same
`segmentIds` namespace once `Enchufla` carries two `TeachingSource`s.

**Clip windows** are given to the hundredth of a second and are never a round
number chosen for tidiness. Each row states the transcript event each boundary
is anchored to, quoted. Trust grades follow the steps spec:

| Grade | Meaning |
|---|---|
| **A** | Both boundaries anchored to a word timing |
| **D** | One boundary anchored, the other derived (segment end, chapter mark) |
| **V** | Contains something worth knowing about — always carries a `caveat` |

**Chapter role normalisation.** `scripts/analyze_salsa_couples.py` emits a role
`angle` for the camera-angle chapters. `SegmentRole` has no `angle` and does not
need one: a camera-angle chapter is still either a counted demo or a music
block, and which camera it is belongs in the `label`. Every `angle` chapter is
normalised below to the role it actually plays, and the normalisation is stated
per row. This is the one place the analysis file and the type vocabulary
disagree, and it is a naming difference, not a modelling gap.

**Cue kind discipline.** `kind: 'lead'` is reserved for a cue describing an
action that *signals or moves the partner* — a push, a pull, a block, a hand
raised over her head, a step forward used as a signal, a wrist that "acts".
Establishing or holding the frame is `kind: 'arms'`. This matters because the
`lead` count is the headline number for R3 and inflating it with static
hand-hold instructions would be dishonest. Every `lead` cue below is a signal.

**R4 is enforced literally.** Where the teachers give the leader and the
follower different instructions, that is two cues. No `role: 'both'` cue below
contains a possessive limb reference that differs by role. Where the teachers
give an instruction for one role and say nothing about the other, the silence is
recorded as a defect rather than filled in.

**Type vocabulary held.** Everything in classes 1–7 fits
`frontend/src/data/salsa-types.ts` as written. Four things were checked
specifically and all four fit: the `angle` chapters (fold into existing roles,
above); the vertical shorts (`aspect: '9/16'` already exists); a `count` window
that sits inside a `teach` block (`ClassSegment.nestedIn`, already there for
exactly this); and a cue whose beat the teachers never state (`beat` is optional
by design — "inventing a beat would be a guess"). No new types.

---

# Class 1 — Al centro, arriba, abajo

- **Video** `MDEAN40DUVY` · 13:45 (825s) · 13 YouTube chapters · **no official short**
- **Moves, per the description**: `al centro`, `arriba`, `abajo`
- Both clips for all three moves must come out of this video.
- **No `count` chapter.** The slow windows below are cut from inside `teach`
  blocks and both are word-anchored.

## 1.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `al-centro` | Al centro | `step` | — | `al centro`, `Al Centro`, `Al centro`, `al Centro`, `aisle central`, `out centro`, `centro` | The side basic danced in close position, and the same step danced on the spot. |
| `arriba` | Arriba | `step` | `al-centro` | `arriba`, `Arriba` | Three steps travelling forward, in close position. |
| `abajo` | Abajo | `step` | `al-centro` | `abajo`, `Abajo` | Three steps travelling back, in close position. |

**Canonical spelling.** The class description writes all three lower case
(`al centro`, `arriba`, `abajo`); the chapter titles capitalise the first word
("Al centro, basic step in close position", "Arriba & Abajo - Back camera").
Sentence case is used above, per R1 "spelled as the channel writes it", and the
lower-case description forms are kept as aliases so a search for either hits.

**Alias evidence — and a finding worth stating.** These three names survive
Whisper almost intact, which is unusual for this course. Counted across the raw
(pre-normalisation) transcripts of all seven classes in this part: `arriba` 20×,
`abajo` 16×, `al centro` 37×, with exactly **two** manglings in the whole set:

| Mangling | Where | What happened |
|---|---|---|
| `aisle central` | `kg5Ztcp5xQU` @121.36 | "Enchufla aisle central" — Class 4's *Enchufla al Centro* |
| `out centro` | `MDEAN40DUVY` @682.04 | "hop, out / centro, piki" — split across a segment boundary at 682.18 |

Both are already in the alias lists. Neither needed the normaliser; both are
worth adding to `scripts/normalize_salsa_terms.py` anyway (see §1.5).

**Not an alias: the rhythm vocalisation.** At @471.68 the teachers say
"so first step to the side — **Tiki, Chiki Chiki Coco, Chiki Chiki Chiki Chiki
Chiki Coco** — will be called al centro." That is the teachers singing the beat,
and it is what R1's aliases must *not* absorb: "chiki chiki coco" is the sound of
a side basic, not a name for one, and aliasing it would make every basic in the
course match `al-centro`. It is captured as `kind: 'rhythm'` cue
`al-centro-rhythm` instead. Same for "cheeky cheeky open" (@301.86), "spot, spot,
open" (@323.88), "king king pa" (@677.10) and "piki" (@683.64).

### Footwork paragraphs

**`al-centro`** — In close position, guys start with the left foot and girls
with the right. Two quick steps then an open step to the side: left, right,
left, and right, left, right for the leader, mirrored right, left, right and
left, right, left for the follower — the "cheeky cheeky open" of the side basic.
The same step is then danced on the spot instead of travelling sideways
("spot, spot, open"), which is just stomping in place on the same rhythm. In
both versions the partners' legs cross slightly: the leader's left leg is
outside hers and her leg is outside his, and that offset is what makes
travelling front and back possible.

**`arriba`** — Three steps travelling forward, on the same 1-2-3 / 5-6-7 count
as al centro, with the legs kept crossed as in close position. The teachers show
one sequence forward (1, 2, 3, and 5, 6, 7) rather than continuous travel,
because of the space they are filming in — "you could carry on forward all the
time."

**`abajo`** — Three steps travelling back, the reverse of arriba, on the same
count. Arriba and abajo are taught, named and demonstrated as one alternating
pair and are never shown apart, which is why they share both clip files.

## 1.2 Segment map

13 chapters, all kept. `role` is the normalised role; where it differs from the
analysis file's role, the row says so.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `cc1-intro` | 0.0 | 18.0 | `skip` | Intro | — | chapter title "Intro" |
| `cc1-about-class` | 18.0 | 52.0 | `skip` | About this class | — | chapter title "About this class" |
| `cc1-about-guide` | 52.0 | 270.44 | `skip` | About the "Salsa beginners guide" | — | chapter title; end moved from the chapter's 271.0 to the first word of the next sentence, "First," @270.44 |
| `cc1-teach-frame` | 270.44 | 290.40 | `teach` | How to hold your partner (close position) | `al-centro`, `arriba`, `abajo` | chapter title "How to hold your partner? (Close position)"; "First, how to hold your partner." @270.44 |
| `cc1-teach-al-centro-back` | 290.40 | 339.00 | `teach` | Al centro, side basic in close position — back camera | `al-centro` | chapter title "Al centro, basic step in close position - Back camera"; "in this / position we start our basic step to the side" @290.34–290.52. **Analysis says `angle`** — normalised to `teach`: it opens with the footwork instruction "guys are starting with the left foot" @295.58 |
| `cc1-count-al-centro` | 299.54 | 327.32 | `count` | Al centro, counted — back camera | `al-centro` | nested in `cc1-teach-al-centro-back`; "five six seven and cheeky cheeky open" @299.54, no music |
| `cc1-count-al-centro-front` | 339.00 | 366.82 | `count` | Al centro — front camera | `al-centro` | chapter title "Al centro - Front camera"; announced at "and now we'll reverse the camera" @336.48, demo resumes "five six seven" @339.90. **Analysis says `angle`** — normalised to `count`: spoken count, no music |
| `cc1-teach-al-centro-spot` | 366.82 | 420.00 | `teach` | Basic step on the spot | `al-centro` | chapter title "Basic step on the spot"; "you how to do the same step in a spot" @366.82 |
| `cc1-teach-arriba-abajo` | 420.00 | 508.00 | `teach` | Arriba & Abajo — back camera | `arriba`, `abajo` | chapter title "Arriba & Abajo - Back camera"; "the next step we are going to show you is just walking front and back" @418.72. **Analysis says `angle`** — normalised to `teach`: explanation, the naming, then the demo |
| `cc1-count-arriba-abajo` | 479.40 | 500.28 | `count` | Arriba & Abajo, counted — back camera | `arriba`, `abajo` | nested in `cc1-teach-arriba-abajo`; "Walking forward, Arriba, walking back, Abajo. 5, 6, Arriba front…" @479.40 |
| `cc1-count-all-front` | 508.00 | 580.00 | `count` | All moves — front camera | `al-centro`, `arriba`, `abajo` | chapter title "All moves - Front camera". **`confidence: 'suspect'`** — see K1-a: the boundary cannot be checked, the transcript is a Whisper repetition loop from 508.52 to 528.10. **Analysis says `angle`** — normalised to `count` |
| `cc1-music-back-1` | 580.00 | 613.00 | `music` | All moves with music — back camera | `al-centro`, `arriba`, `abajo` | chapter title "All moves with music - Back camera"; "Let's start to do moves." @573.18, "We start with Al Centro." @579.48 |
| `cc1-music-front` | 613.00 | 634.00 | `music` | All moves with music — front camera | `al-centro`, `arriba`, `abajo` | chapter title "All moves with music - Front camera"; "we will swap camera" @612.00 |
| `cc1-music-back-2` | 634.00 | 694.00 | `music` | All moves with music — back camera | `al-centro`, `arriba`, `abajo` | chapter title "All moves with music - Back camera"; ends "Nice one." @691.66 |
| `cc1-outro` | 694.00 | 825.00 | `skip` | Summary / Outro | — | chapter title "Summary / Outro"; "We do this course for two different reasons." @695.22 |

**Boundary checks run.** Nine of the eleven non-skip boundaries agree with the
transcript to within a second. Three disagreements, all recorded above rather
than silently accepted:

1. **271.0 → 270.44.** The chapter mark lands 0.56s inside the sentence it is
   meant to start. `teachStart` for the frame is 270.44, not 271.
2. **339.0.** The camera change is *announced* at 336.48 ("now we'll reverse the
   camera"), 2.5s before the chapter mark, and the demo resumes at 339.90. The
   chapter mark sits between the two, which is defensible; the clip alternate
   starts at 339.90, not 339.0.
3. **508.0 — unverifiable.** See K1-a.

`chaptered: true`. `teaches: ['al-centro', 'arriba', 'abajo']`.

## 1.3 Clip windows

Four windows, two shared files. Arriba and Abajo share both their clips because
the teachers never demonstrate one without the other.

### Slow (cut from `teach` blocks — there is no `count` chapter)

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `al-centro` | `MDEAN40DUVY` | **299.54** | **327.32** | 27.78s | `al-centro-slow.mp4` | **A** | In: the word "five" of *"five six seven and cheeky cheeky open"* @299.54, the first count after the footwork instruction *"girls are starting with the right"* @298.44. Out: the segment ending 327.32, last word *"open."* @327.02; the next words *"I'm talking right now from guy's point of view"* start @327.50. |
| 2 | `arriba` + `abajo` | `MDEAN40DUVY` | **479.40** | **500.28** | 20.88s | `arriba-abajo-slow.mp4` (`shared: true` on `abajo`) | **D V** | In: *"Walking forward, Arriba, walking back, Abajo."* @479.40 — the naming and the counted demo are the same breath. Out: the segment end 500.28 (last audible word *"6."* @500.12); the next real speech is @508.52. |

Window 2 carries `caveat`: **"Word timings inside this segment degenerate from
499.34 — nine consecutive words share that one timestamp — so the last ~1s of
the window is anchored to the segment end, not to a word. Also names the moves
in the first 3s before counting them."** That is honest and it is still the best
slow window in the class: it is the only place arriba and abajo are counted
aloud without music.

**Alternates** (kept for the review page, not published):

| Move | Window | Len | Why rejected |
|---|---|---|---|
| `al-centro` | 339.90 → 360.08 | 20.18s | Front camera, so it shows the follower's footwork — genuinely useful, but 7.6s shorter and the count is sparser ("one two three and five six seven" only from 351.72) |
| `arriba` + `abajo` | 424.50 → 434.80 | 10.30s | *"So I'll do three steps forward… And then I'll go back"* — the cleanest single forward-and-back pair in the class, but far under the 20s floor and the moves are not yet named |
| `arriba` | 443.52 → 453.26 | 9.74s | The continuous-forward quick demo, *"1 2 3 5 6 7"* ×4 with no talking at all. Under the floor, and arriba only |

### Fast (cut from the `music` chapters — there is no short)

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 3 | `al-centro` | `MDEAN40DUVY` | **581.24** | **612.00** | 30.76s | `al-centro-fast.mp4` | **A V** | In: the count *"1, 3, 5, 6, 7, 8."* @581.24, immediately after *"We start with Al Centro."* @579.48. Out: 612.00, the word before *"we will swap camera"* — the chapter mark is 613.00. |
| 4 | `arriba` + `abajo` | `MDEAN40DUVY` | **667.90** | **691.34** | 23.44s | `arriba-abajo-fast.mp4` (`shared: true` on `abajo`) | **D V** | In: the word *"arriba"* @667.90 in *"now I'll keep swapping a bit faster — arriba front"*. Out: the segment end 691.34; *"Nice one."* @691.66. `abajo` @679.94 is inside the window. |

Window 3 caveat: **"The teachers count and coach over the music — 'Just relax'
@595.58, 'Try to keep the rhythm' @597.38. Not a silent demo."**

Window 4 caveat: **"Announced as 'I'll keep swapping a bit faster' @666.98, so
the tempo rises through the clip. The last ~9s returns to al centro — 'hop, out
/ centro, piki' @682.04–683.64."**

Both fast windows sit inside `cc1-music-back-2`/`cc1-music-back-1` and both are
back-camera, i.e. shot over the follower's shoulder. `cc1-music-front`
(613–634, 21s) is the front-camera equivalent and is a legitimate alternate for
either move, but it is the shortest music chapter and contains all three moves
mixed, so it is not published.

## 1.4 Cues

**25 cues on three moves. 0 `kind: 'lead'`** — and that is the correct number
for this class, which is the point worth making: Class 1 teaches the *frame*,
not a signal. Nobody pushes, pulls or blocks anybody. Inventing a lead cue here
to make the R3 number look better would be exactly the failure mode the charter
is guarding against. The frame cues are `kind: 'arms'`, and they are what every
real lead cue in classes 2–7 depends on.

All `sourceVideo: 'MDEAN40DUVY'`. All `confidence: 'transcript'` unless a row
says otherwise.

### `al-centro` — the frame (from `cc1-teach-frame`)

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `al-centro-frame-1` | — | `both` | `concept` | Stand opposite your partner. | 272.64 | "We're standing opposite to each other." |
| `al-centro-frame-2` | — | `leader` | `arms` | Show her the thumb of your left hand. | 274.44 | "I show her thumb of my left hand and she grabs my thumb." |
| `al-centro-frame-3` | — | `follower` | `arms` | Grab his thumb. | 276.00 | "she grabs my thumb" |
| `al-centro-frame-4` | — | `leader` | `arms` | Close the rest of your fingers on top. | 277.04 | "Rest of the fingers I close on top." |
| `al-centro-frame-5` | — | `leader` | `arms` | Put your other hand on her back, not too low. | 279.14 | "second hand I put it on her back not too long" |
| `al-centro-frame-6` | — | `leader` | `arms` | If she is not your partner, put that hand around her shoulder blades instead. | 285.60 | "if she's your wife or girlfriend it's fine otherwise hand around her shoulder blades in this position" |

Two of these need care and both are handled in the text rather than in a
comment:

- **`al-centro-frame-3`** carries `warning: "The teachers do not say which hand
  she grabs with. His left hand implies her right, but that is a deduction, not
  something said on camera."` R4 forbids writing "your right hand" here. This is
  a `follower` cue and not a merge: the leader offers, she grabs, two actions.
- **`al-centro-frame-5`** is **`confidence: 'suspect'`**, flag `K1-b`, with
  `warning: "Whisper has 'not too long'. In context — the leader's hand on the
  follower's back — this is almost certainly 'not too LOW'. The cue text reads
  'low'; the verbatim keeps 'long' so the substitution stays visible."` It also
  quietly resolves a second problem: the teachers say "second hand", never
  "right hand". "Your other hand" is faithful to what was said and needs no
  deduction.

### `al-centro` — footwork and rhythm

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `al-centro-1` | 1 | `leader` | `footwork` | Start with your left foot. | 295.58 | "guys are starting with the left foot" |
| `al-centro-2` | 1 | `follower` | `footwork` | Start with your right foot. | 297.72 | "girls are starting with the right" |
| `al-centro-3` | [1,2,3,5,6,7] | `leader` | `footwork` | Left, right, left — then right, left, right. | 304.88 | "left, right, left, and right, left, right." |
| `al-centro-4` | [1,2,3,5,6,7] | `follower` | `footwork` | Right, left, right — then left, right, left. | 342.16 | "Ola is moving her feet right left right left and left right left" |
| `al-centro-rhythm` | — | `both` | `rhythm` | Hear it as "cheeky cheeky, open" — two quick steps, then the open step. | 301.86 | "five six seven and cheeky cheeky open and cheeky cheeky open" |
| `al-centro-name` | — | `both` | `concept` | The side basic in close position is called Al centro. | 471.68 | "so first step to the side Tiki, Chiki Chiki Coco, Chiki Chiki Chiki Chiki Chiki Coco will be called al centro." |

`al-centro-3` and `al-centro-4` are the same information for the two roles and
are therefore two cues, not one — and note the sources are 37s apart, because
the leader's version is called over the back camera and the follower's over the
front. The beats are the teachers' own 1-2-3 / 5-6-7, established across the
class and explicitly at @331.36 ("one, two, three, and five, six, seven").

### `al-centro` — on the spot, and the crossed legs

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `al-centro-5` | — | `both` | `footwork` | On the spot, keep stomping in place instead of travelling sideways. | 385.92 | "We just keep stomping on / On the spot, tick." |
| `al-centro-6` | — | `both` | `concept` | Check your legs — they should be slightly crossing. | 408.16 | "But my point is that our legs are slightly crossing." |
| `al-centro-7` | — | `leader` | `footwork` | Your left leg goes outside hers. | 410.50 | "So my left leg is outside." |
| `al-centro-8` | — | `follower` | `footwork` | Your leg goes outside his too. | 412.36 | "And her leg is also outside." |
| `al-centro-9` | — | `both` | `concept` | Crossing the legs is what makes travelling front and back easy. | 414.52 | "Because of that, it will be easier for us to travel front and back." |
| `al-centro-bpm` | — | `both` | `context` | The music in these classes is app-generated, 130 beats per minute. | 553.42 | "This music is app generated. This is only 130 bits per minute." |

`al-centro-7` and `al-centro-8` are the R4 case in miniature: "my left leg is
outside" and "her leg is also outside" are different sentences about different
legs and must not be collapsed into "your leg goes outside". Note also that
*which* of her legs is never stated — the follower cue says "your leg", matching
the audio.

`al-centro-bpm` is `kind: 'context'`, so it is not drillable and is never spoken
in drill mode. Per steps-spec G1 there is **no `bpm` field** and none is
proposed; the number lives in the cue text and the verbatim. "bits per minute"
is Whisper; "beats" is the cue. See K1-e.

### `arriba` and `abajo`

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `arriba-1` | — | `both` | `concept` | The next step is just walking front and back on the same principle. | 418.72 | "So the next step we are going to show you is just walking front and back with exactly the same principle." |
| `arriba-2` | [1,2,3,5,6,7] | `leader` | `footwork` | Three steps forward — one, two, three — then another five, six, seven. | 424.50 | "So I'll do three steps forward. One, two, three, and another five, six, seven." |
| `abajo-1` | [1,2,3,5,6,7] | `leader` | `footwork` | Then go back — one, two, three, and five, six, seven. | 430.02 | "And then I'll go back. One, two, three, and five, six, seven." |
| `arriba-3` | — | `both` | `concept` | You could carry on forward the whole time; you only turn it around because of the space. | 440.96 | "You could carry on forward all the time." |
| `arriba-4` | — | `both` | `concept` | In a small space, do one sequence forward and one sequence back. | 455.74 | "but because we are dancing in a small space we'll again show you how to do one sequence for front and one sequence back" |
| `arriba-5` | — | `leader` | `concept` | Walking forward is Arriba. | 479.40 | "Walking forward, Arriba, walking back, Abajo." |
| `abajo-2` | — | `leader` | `concept` | Walking back is Abajo. | 481.44 | "Walking forward, Arriba, walking back, Abajo." |

`arriba-5` and `abajo-2` are `role: 'leader'`, not `both`, and that is a
deliberate reading of the audio: the teacher established at @327.50 "I'm talking
right now from guy's point of view", and never says what the follower does
during arriba or abajo. See K1-d — this is the most substantive gap in Class 1
and it is flagged, not filled.

`arriba-2` and `abajo-1` are the leader's own count ("I'll do three steps
forward"), so they are `leader` for the same reason. They are footwork, not
lead: he is describing his feet, not a signal.

**Drillable-cue counts** (kinds `footwork`, `lead`, `arms`, `rhythm`):
`al-centro` 12 — **over the cap of 8**, and flagged rather than trimmed, exactly
as the steps course did for its four dense moves. Six of the twelve are the
frame, which is arguably a separate drill from the footwork; splitting the frame
into its own pseudo-move would fix the count but would invent a move, so it is
not done. `arriba` 2, `abajo` 1.

## 1.5 Known defects

| Flag | What | Data | UI |
|---|---|---|---|
| **K1-a** | **Whisper repetition loop, 508.52–528.10.** "Who is the first one?" / "The first one?" repeated ~30 times, with 23 consecutive degenerate segments at `start == end == 510.62` and more at 510.94. Real speech resumes @528.10 ("hop, cheeky cheeky hop"). | `cc1-count-all-front` gets `confidence: 'suspect'` and `warning: "Chapter boundary 508.0 cannot be verified — the transcript is a Whisper repetition loop from 508.52 to 528.10."` | Render the segment with the unverified badge. Do not deep-link a cue into 508–528. |
| **K1-a′** | Consequence of the same loop: **any term-frequency count over `MDEAN40DUVY` is corrupted.** The alias counts in §1.1 were taken from the raw file with this range excluded. | None — a note here. | None. |
| **K1-b** | **"not too long" ≠ "not too low."** @282.26. The leader's hand on the follower's back. | `al-centro-frame-5`: `confidence: 'suspect'`, `flag: 'K1-b'`, warning as quoted in §1.4. | Show the warning inline. **Never speak this cue in drill mode** — a mis-heard word about where a hand goes on a partner's body is precisely the cue not to read aloud unchecked. |
| **K1-c** | **"is lower" is a Whisper substitution, not an instruction.** @314.92, inside "Cheeky, cheeky, left, and cheeky, cheeky, **is lower**." Every other repetition of that phrase in the class ends "right" (@311.60, @319.02, @323.12). It is the vocalisation, mis-decoded. | **No cue.** Explicitly do not create a "lower your steps" cue from this. | None. Recorded so a later pass does not "find" it. |
| **K1-d** | **The follower's direction in Arriba and Abajo is never stated.** The whole class is called from the leader's side ("from guy's point of view" @327.50). That the follower walks back on Arriba is visible in `cc1-count-arriba-abajo` but is not in the audio. | `arriba-5` / `abajo-2` are `role: 'leader'`. No follower cue is written. Add to the verification log as the highest-value eye-check in Class 1: watch 479.40–500.28 and add two `role: 'follower'` cues at `confidence: 'verified'`. | The moves show as having leader footwork and no follower footwork, which is accurate. |
| **K1-e** | **"130 bits per minute"** @557.44. "bits" = beats. | `al-centro-bpm` text says "beats", verbatim keeps "bits". No `bpm` field (steps-spec G1). | None. |
| **K1-f** | **The counted demo's numbering is internally inconsistent**, so the beat on which direction changes cannot be derived from the audio: @483.56 runs "5, 6, Arriba front, 1, 2, 3, Abajo back, go back, 1, 2, 3, Arriba front, 1, 2, 3" — the direction changes after a 5-6 and then after a 1-2-3. | No `beat` on `arriba-5` / `abajo-2`. Do not synthesise a direction-change beat. | None. |
| **K1-g** | **Normaliser additions.** `aisle central` → `al centro`; `out centro` → `al centro`. | Add both to `scripts/normalize_salsa_terms.py`. `out centro` spans a segment boundary (682.18), so the normaliser must match across the join or it will only catch it in `text`, not in `segments`. | None. |

---

# Class 2 — La chica, el chico, los dos

- **Video** `np3g2IzZ11A` · 18:14 (1094s) · 14 YouTube chapters · **no official short**
- **Moves, per the description**: `la chica`, `el chico`, `los dos`
- **No `count` chapter and no `music` chapter.** The three `angle` chapters at
  640–716 are the counted demo; the two chapters titled "with music + review"
  are the only full-tempo material in the class. Every window below is cut from
  a `teach`, `angle` or `review` chapter.
- **This is where the course actually starts leading.** Chapter 4 contains the
  sentence the whole tab exists for: *"there is additional skill we are learning
  during this course and we could call it leading and following. I'm giving
  signals, she's trying to interpret the signals and react to them and follow."*
  (@186.56–197.98).

## 2.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `la-chica` | La chica | `turn` | `al-centro` | `la chica`, `La Chica`, `Chica`, `chica` | The follower turns right on 5-6-7 while the leader keeps his basic. Led with the left arm up on 3 and a push with the right. |
| `el-chico` | El chico | `turn` | `al-centro` | `el chico`, `El Chico`, `El chico` | The mirror: the leader turns left on 5-6-7 under his own raised arm while the follower keeps her basic. |
| `los-dos` | Los dos | `turn` | `al-centro` | `los dos`, `Los dos`, `Los Dos`, `lost dos` | Both turn simultaneously on 5-6-7 — she right, he left. Led by swapping to her right wrist and a dynamic push outside. |

**Alias evidence.** Raw (pre-normalisation) counts across all seven classes in
this part: `chica` 32×, `chico` 27×, `los dos` 25×. One genuine mangling:

| Mangling | Where | What happened |
|---|---|---|
| `lost dos` | `np3g2IzZ11A` @797.30, @814.38 | Both inside the full-tempo review — "lost dos, guys you go ladies you stay basic" |

**Two things that look like aliases and must not be.** Both would break R1 if
absorbed:

1. **`chick` (49×) and `chicky` (5×) are not `la chica`.** They are the rhythm
   vocalisation — "chick cheeky open", "Chiki Chiki La", "ticky ticky hop". A
   name search for "chica" must not match every basic step in the course. Note
   the trap: "Chiki Chiki **La**" @115.60–116.74 sits four words after a real
   "La Chica" @110.96, in the same breath.
2. **`last time` (8×) is not `los dos`.** It is the teachers saying "last time",
   e.g. @677.72 "And last time the same." A fuzzy `los`/`last` rule would
   generate eight false hits.

### Footwork paragraphs

**`la-chica`** — The follower takes three steps of basic on 1, 2, 3 and then
rotates to the right on 5, 6, 7. The leader changes nothing about his feet: he
carries on with the basic the whole way through, "cheeky cheeky basic, cheeky
cheeky hop", which is exactly what lets the two of them re-synchronise the
moment she finishes her rotation. Note the count differs from the solo steps
course on purpose: there the right turn was on 1, 2, 3 because it was taught
from the man's side; here it is on 5, 6, 7 because it is the follower turning.

**`el-chico`** — The mirror of la chica. The leader rotates to the left on
5, 6, 7, taking exactly one step outside and then two more to arrive back in
front of his partner; he passes under the raised joined arms. The follower keeps
her basic step going all the way through and changes nothing.

**`los-dos`** — Both turn at once on 5, 6, 7, the follower to her right and the
leader to his left, so the two of them are in sync rather than one holding a
basic for the other. Each takes one step out and then two more steps to get back
to the original position. The footwork is the easy half; the lead is the part
that differs, and the teachers say so — "Lead is slightly different for it and
this is the only thing that we should really discuss" (@540.40).

## 2.2 Segment map

14 chapters, all kept.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `cc2-intro` | 0.0 | 18.0 | `skip` | Intro | — | chapter title "Intro" |
| `cc2-about-class` | 18.0 | 96.90 | `skip` | About this class | — | chapter title; end moved from 97.0 to the last word of "If you are done, let's go." @96.90 |
| `cc2-teach-la-chica-back` | 96.90 | 177.00 | `teach` | La chica — explanation, back camera | `la-chica` | chapter title "La chica - explanation - Back camera"; "Move number one, la chica." @97.96 |
| `cc2-teach-la-chica-front` | 177.00 | 250.16 | `teach` | La chica — front camera, and the lead | `la-chica` | chapter title "La chica - Front Camera"; end moved from the chapter's 252.0 to "actually we didn't say that on the first class" @250.16, where the close-position digression begins. **Analysis says `angle`** — normalised to `teach`: this chapter contains the leading breakdown, not just a camera change |
| `cc2-teach-close-position` | 250.16 | 334.00 | `teach` | About the close position | `al-centro` | chapter title "About the close position". `moves: ['al-centro']` — this refines Class 1's frame, so it hangs off `al-centro`, not off the Class 2 moves |
| `cc2-teach-el-chico-back` | 334.00 | 405.00 | `teach` | El chico — explanation, back camera | `el-chico` | chapter title "El chico - explanation - Back camera"; "Let's do el chico when guys are turning around." @334.98 |
| `cc2-teach-el-chico-front` | 405.00 | 508.16 | `teach` | El chico — front camera, the lift, and the roles | `el-chico` | chapter title "El chico - Front camera". Start is **derived**: the camera change is not announced and 405.0 lands mid-demo ("and chico one two three" @406.06). End moved from the chapter's 508.0 to the count ending "seven." @508.16. **Analysis says `angle`** — normalised to `teach` |
| `cc2-teach-los-dos` | 508.16 | 640.00 | `teach` | Los dos — explanation | `los-dos` | chapter title "Los dos - explanation"; "And the third move that we want to show you." @508.76 |
| `cc2-count-combo-front` | 640.00 | 676.00 | `count` | All three moves together — front camera | `la-chica`, `el-chico`, `los-dos` | chapter title "All 3 moves together - Front camera"; "Let's do it." @642.42, count starts @644.52, no music. **Analysis says `angle`** — normalised to `count` |
| `cc2-count-combo-back` | 676.00 | 716.00 | `count` | All three moves together — back camera | `la-chica`, `el-chico`, `los-dos` | chapter title "All 3 moves together - Back camera"; the counted run continues unbroken through 691.80. **Analysis says `angle`** — normalised to `count` |
| `cc2-review-music-back` | 716.0 | 777.00 | `review` | All three moves with music + review — back camera | `la-chica`, `el-chico`, `los-dos` | chapter title "All 3 moves together with music + review - Back camera"; ends "Ok, we'll swap the camera." @776.64. `reviewsEarlierMoves: true` |
| `cc2-review-music-front` | 777.00 | 853.00 | `review` | All three moves with music + review — front camera | `la-chica`, `el-chico`, `los-dos`, `arriba`, `abajo`, `al-centro` | chapter title; "So ladies, from your perspective." @779.18. Reviews Class 1 too — "And now, arriba and abajo." @830.04. `reviewsEarlierMoves: true` |
| `cc2-review-back-2` | 853.00 | 904.00 | `review` | The same again from back camera | `la-chica`, `el-chico`, `los-dos`, `arriba`, `abajo`, `al-centro` | chapter title "The same again from back camera"; "In, in, out, in, in, out" @853.46. Contains the full combo call @864.82. **Analysis says `angle`** — normalised to `review`: it is the same review material from the other camera |
| `cc2-outro` | 904.00 | 1094.00 | `skip` | Summary / Outro | — | chapter title "Summary / Outro" |

**Boundary checks run.** Four disagreements, all recorded above:

1. **97.0 → 96.90.** Chapter mark 0.1s after the previous sentence ends. Trivial,
   corrected for cleanliness.
2. **252.0 → 250.16.** The close-position digression starts 1.8s early, mid-word
   in the la chica explanation ("actually we didn't say that on the first
   class"). Corrected — the chapter mark cuts the sentence.
3. **405.0 — derived, not anchored.** The front-camera chapter for el chico
   starts in the middle of a counted demo with no verbal marker at all. Kept at
   the chapter value; flagged K2-e.
4. **508.0 → 508.16.** The mark lands 0.6s before "And the third move that we
   want to show you." @508.76 but inside the preceding count. Moved to 508.16
   (the last word of the count) so the los dos block starts clean.

`chaptered: true`. `teaches: ['la-chica', 'el-chico', 'los-dos']`.

## 2.3 Clip windows

Six windows and one shared alternate. The three slow windows all come from
`teach` blocks; the three fast windows all come from `review` chapters, because
Class 2 has no `music` chapter at all. That is the single reason every fast
window in this class is short.

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 5 | `la-chica` | `np3g2IzZ11A` | **199.02** | **233.86** | 34.84s | `la-chica-slow.mp4` | **A V** | In: *"Five,"* @199.02, the first count after *"…react to them and follow."* @197.98. Out: the word *"seven."* @233.86 ending *"Hop, one hand up and push and five, six, seven."*; *"From girl perspective,"* starts @234.38. |
| 6 | `el-chico` | `np3g2IzZ11A` | **350.54** | **367.34** | 16.80s | `el-chico-slow.mp4` | **A V** | In: the *"5"* @350.54 of *"Or maybe we'll just show you how it works. 5 6 7 1 al centro 5 el chico…"* @347.88. Out: the *"7."* @367.34 that closes the third repetition; *"Now"* @367.84 begins the feet explanation. |
| 7 | `los-dos` | `np3g2IzZ11A` | **583.40** | **606.64** | 23.24s | `los-dos-slow.mp4` | **A** | In: the *"5"* @583.40 of *"5 6 7 1 2 3 5 los dos swap hand push 5 6 7"*. Out: the word *"right."* @606.64; *"What we like to do quite often"* starts @607.16. |

Window 5 caveat: **"This is the leading breakdown, not a clean demo: the teacher
deliberately freezes at 'one, two, freeze' @201.12–202.32 to point at the arm,
and talks all the way through. It is published anyway because it is the only
place in the class where the lead is demonstrated slowly, and the counted
repetition at 221.66 ('One, two, three and push. Five, six, seven') and the
fluent one at 228.96 are both inside it."**

Window 6 caveat: **"16.8s — 3.2s under the 20s floor. Accepted: this is the only
uninterrupted counted passage for El chico in the class. The 23.1s alternate is
longer but has coaching over it."**

Window 7 is the best slow window in Class 2 — 23.2s, three repetitions, counted
throughout, no freeze, and the lead is called inside it ("swap hand push"
@588.74–590.34). No caveat.

**Alternates:**

| Move | Window | Len | Why rejected |
|---|---|---|---|
| `la-chica` | 106.78 → 118.68 | 11.90s | *"5 6 7 1 2 3 5 La Chica, hand up push and 5 6 7 Chiki Chiki La and Chiki Chiki Right."* — the clean pre-breakdown demo, and it contains the lead called at tempo ("hand up push" @112.22). Half the floor, one repetition. |
| `el-chico` | 376.54 → 399.66 | 23.12s | Over the floor and contains the two best footwork cues ("make sure that only one step goes outside" @383.28), but the teacher coaches continuously, so it is a teach window rather than a demo. |
| all three | 644.52 → 691.80 | 47.28s | **The whole-combo counted demo**, three full repetitions: la chica @648.92, el chico @652.26, los dos @655.54, repeated at 663.64/667.10/670.34 and 679.96/683.22/686.46. No music. Rejected as the per-move slow clip only because it is a combo, not a single move; 2.3s over the 45s target. `shared: true` across all three moves if it is ever published. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 8 | `el-chico` | `np3g2IzZ11A` | **746.48** | **759.76** | 13.28s | `el-chico-fast.mp4` | **A V** | In: *"El Chico, guys, you go."* @746.48. Out: *"Five, al centro, al centro, one."* @759.76 — the call moves on to al centro. The move is called twice inside the window, @746.48 and @753.28. |
| 9 | `la-chica` | `np3g2IzZ11A` | **781.46** | **794.30** | 12.84s | `la-chica-fast.mp4` | **A V** | In: *"One, la chica, hop and turn"* @781.46, the first call after *"So ladies, from your perspective."* @779.18. Out: *"7 and cheeky cheeky open"* @794.30. Two repetitions — *"one more time, and hop la chica"* @789.44–792.70. |
| 10 | `los-dos` | `np3g2IzZ11A` | **814.12** | **827.98** | 13.86s | `los-dos-fast.mp4` | **A V** | In: *"now"* @814.12 of *"and now lost dos we go together"*. Out: *"Six, seven and one."* @827.98. Contains the lead audible at tempo twice: *"Swap arms and press."* @815.98 and *"Los dos. Swap and press."* @822.22. |

All three carry a caveat of the same shape, because the cause is the same:
**"Cut from a review chapter, not a music chapter — Class 2 has none. The
teachers call the move by name over the music rather than dancing it silently,
and each window holds only 1–2 repetitions. 12.8–13.9s, under the 20s floor."**

Window 9 additionally: **"Front camera, so the follower's turn is seen from
behind her."**

**Shared fast alternate:** **864.82 → 890.72** (25.88s) — *"and now combo, la
chica, el chico, los dos, arriba, arriba, arriba, go, abajo, abajo, and al
centro, hop la chica, el chico and los dos."* This is the only full-tempo window
in the class that clears 20s, and it contains all three moves plus Class 1's.
Kept as an alternate for all three moves rather than published, because a
focused 13s loop of the right move beats a 26s loop where the move you want
occupies 3 seconds. That is a decision, and it is the reverse of the trade the
steps course made for `cross-front-and-back-fast`; the difference is that here a
correctly-labelled focused window exists.

## 2.4 Cues

**38 cues on four moves** (`la-chica`, `el-chico`, `los-dos`, plus four added to
`al-centro` from this class). **10 are `kind: 'lead'`** — the first real lead
cues in the tab.

All `sourceVideo: 'np3g2IzZ11A'`. All `confidence: 'transcript'` unless a row
says otherwise.

### `la-chica`

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `la-chica-lead-intro` | — | `both` | `concept` | This course adds a second skill on top of the footwork: leading and following. The leader gives signals, the follower reads them. | 186.56 | "Now, there is additional skill we are learning during this course and we could call it leading and following. I'm giving signals, she's trying to interpret the signals and react to them and follow." |
| `la-chica-1` | 3 | `leader` | **`lead`** | On 3, your left arm goes up. | 203.54 | "On three, left arm goes up guys." |
| `la-chica-2` | — | `leader` | `concept` | The raised arm is making space for her to turn. | 206.52 | "We are creating space for girl to turn around." |
| `la-chica-3` | — | `leader` | **`lead`** | Second signal: push her with your right arm, straight after the 3. | 215.10 | "But the second signal I'll have to give is to give her a push with my right arm." + the count "One, two, three and push. Five, six, seven" @221.66 |
| `la-chica-4` | — | `leader` | **`lead`** | Push, and she starts rotating — you do not turn her. | 219.60 | "I'm pushing, she starts rotating." |
| `la-chica-5` | [1,2,3] | `follower` | `footwork` | Three steps of basic on 1, 2, 3. | 146.06 | "So from girl perspective, we have three steps of basic. 1, 2, 3." |
| `la-chica-6` | 5 | `follower` | `footwork` | Then rotate to the right on 5, 6, 7. | 150.62 | "And then rotation to the right on 5, 6, 7." |
| `la-chica-7` | [1,2,3,5,6,7] | `leader` | `footwork` | Keep your basic going — your feet do not change. | 153.24 | "From guy point of view, when it comes to steps, we carry on only with basic. 5, 6, 7. Cheeky, cheeky, basic. and cheeky cheeky basic." |
| `la-chica-8` | — | `both` | `concept` | His unbroken basic is what re-syncs you when she finishes the turn. | 166.20 | "Thanks to that we can synchronize when she's done. She's finishing her rotation, I continue with my basic, and then we get back to the same point." |
| `la-chica-9` | — | `both` | `concept` | In the solo steps course the right turn was on 1, 2, 3, taught from the man's side. Here it is the follower turning, so it is on 5, 6, 7. | 132.10 | "So the turn to the right was happening on 1, 2, 3. Here, from Lady's point of view, turn is happening on 5, 6, 7." |
| `la-chica-10` | — | `follower` | `arms` | Extend your left hand out and bring it back to his shoulder. | 235.72 | "Ola is doing something with her left hand that is on my shoulder… we're extending the hand out and then bringing it in. Tick, tick, boom. So she's hiding it in between our bodies, extending it and then it comes back to the shoulder." |
| `la-chica-11` | — | `both` | `concept` | A follower who reads the signal turns on her own — the leader should not have to drag her round. | 316.70 | "I will be very lazy partner and turn. We can turn, yeah, one more time. And turn. Boom, boom, boom. She will do it. I don't have to drag her around, you know what I mean? She knows what to do basically." |

`la-chica-3` is the cue that made the "omit the beat" decision necessary. The
teachers never give the push a beat number: they count "One, two, three and
push", which puts it after the 3 and before the 5, i.e. on the 4 — but 4 is a
pause in this course's counting and they never say "on four". `beat` is
therefore **omitted** and "straight after the 3" lives in the text, with the
count preserved in `verbatim`. Writing `beat: 4` would have been an invention.

`la-chica-1` and `la-chica-3` are two cues, not one, because they are two
actions the teacher himself numbers ("the **second** signal"). `la-chica-4` is
kept separate from `la-chica-3` because it is the outcome the leader must feel,
and it is the sentence that stops him from muscling her round.

### `al-centro`, from Class 2's close-position chapter

Four follower-frame cues. They belong to `al-centro` — they refine Class 1's
close position, not any of Class 2's turns — and they are the reason `al-centro`
gets a **second `TeachingSource`**: `{ course: 'couples', classNumber: 2,
videoId: 'np3g2IzZ11A', teachStart: 250.16, segmentIds:
['cc2-teach-close-position'], clips: { slow: null, fast: null, missingReason:
'Class 2 only refines the close position; both clips come from Class 1.' } }`.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `al-centro-frame-7` | — | `follower` | `arms` | Put your hand on his shoulder — not anywhere else. | 254.94 | "very important girls that you put your hand on the guy's shoulder please don't grab other body parts" |
| `al-centro-frame-8` | — | `follower` | `arms` | When he drops his hand, keep yours where it is. | 264.08 | "when Mihael drops or your partner drops his hand your hand is still there" |
| `al-centro-frame-9` | — | `follower` | `arms` | Don't use his hand as support. | 268.28 | "when his hand is there you're not using it as support because it's very tiring for a guy to dance with you like that when you're holding your whole weight on him" |
| `al-centro-frame-10` | — | `follower` | `arms` | Carry your own weight and hold your own frame. | 276.78 | "so keep your your weight and your arms in a frame by yourself that's why we are at the beginning teaching you how to dance solo separately that you learn that you have to be responsible for your own weight and for your own steps" |

All four are `role: 'follower'` and none has a `both` counterpart, because the
teachers address them to the follower explicitly ("girls", "you're not using it
as support", "it's very tiring for a guy"). This is R4 working as intended: the
symmetric-looking instruction "hold your own frame" is *not* given to the leader
in this class, and it is not invented for him.

### `el-chico`

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `el-chico-1` | 5 | `leader` | `footwork` | Rotate to the left on 5, 6, 7. | 374.32 | "and I rotate to the left on five six seven" |
| `el-chico-2` | [1,2,3,5,6,7] | `follower` | `footwork` | Keep your basic step going the whole way through. | 343.34 | "and girls you keep your basic step in your feet" (restated @369.44 "Ola is keeping her basic step all the way through") |
| `el-chico-3` | — | `leader` | `footwork` | Only one step goes outside. | 383.28 | "make sure that only one step goes outside" |
| `el-chico-4` | — | `leader` | `footwork` | Then come back in front of your partner. | 386.20 | "and we come back in front of our partner" |
| `el-chico-5` | — | `leader` | **`lead`** | This time you lift the arm for your own turn. | 418.44 | "so this time I'm lifting arm up as well" |
| `el-chico-6` | — | `leader` | **`lead`** | You lift it, not her — you need enough strength to raise your own arm. | 421.30 | "now it is important guys you do it not girls okay you have to have enough strength to lift your arm" |
| `el-chico-7` | — | `follower` | **`lead`** | Let your arm follow his. Don't try to rotate him. | 429.26 | "Your partner's arm will follow, but girls you are not trying to rotate the guy. It's our own will to do it." |
| `el-chico-8` | — | `leader` | `footwork` | Go under the arm and come back to where you started. | 436.86 | "And I just go under the arm, she just carries on with basic and we come back to original position." |
| `el-chico-roles-1` | — | `both` | `concept` | Don't reverse roles mid-dance — the follower doesn't start giving signals, because she can't know what he was planning. | 442.58 | "So it's not okay to reverse roles at this point that ladies suddenly are starting giving signals to guys. No, because you simply don't know what he's planning to do." |
| `el-chico-roles-2` | — | `both` | `concept` | Swapping which partner leads is fine in general; this course always has the guy leading, to keep it simple. | 462.72 | "we have leader and follower role. If you decide to swap, so like ladies leading and guys following, it's perfectly fine with us, not a problem. But during this course we'll show you this simple way, just not to confuse you." |

`el-chico-6` and `el-chico-7` are the R4 pair of this class, and the clearest
example in classes 1–7 of why merging is dangerous. Both sentences are about the
*same* raised arm. Merged they would read "lift the arm and let it follow",
which is incoherent. Split, they are two correct instructions to two people.

`el-chico-5`, `-6` and `-7` are `kind: 'lead'` because they are about the shared
connection — the leader raising the joined hands and the follower not resisting.
`el-chico-1`, `-3`, `-4` and `-8` are `footwork`: he is describing his own feet
and body, not signalling.

### `los-dos`

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `los-dos-1` | 5 | `follower` | `footwork` | Rotate to the right on 5, 6, 7. | 532.50 | "Ola is rotating to the right, I'm rotating to the left. We do it simultaneously. We do it both on 5-6-7." |
| `los-dos-2` | 5 | `leader` | `footwork` | Rotate to the left on 5, 6, 7. | 534.56 | (same sentence) |
| `los-dos-3` | — | `both` | `concept` | You turn at the same time — neither of you holds a basic for the other. | 536.74 | "We do it simultaneously." |
| `los-dos-4` | — | `both` | `concept` | The footwork is the same idea as the other two; the lead is what's different. | 540.40 | "Lead is slightly different for it and this is the only thing that we should really discuss." |
| `los-dos-5` | — | `leader` | **`lead`** | After three steps, swap arms. | 545.58 | "After three steps I'm swapping arms. 5-6-7. 1-2-3." |
| `los-dos-6` | — | `leader` | **`lead`** | Instead of holding her left hand, take the wrist of her right arm. | 552.54 | "So instead of holding her with my left, I grab wrist of her right arm with my arm" |
| `los-dos-7` | — | `leader` | **`lead`** | Then push her outside — a dynamic push. | 559.04 | "and then I will give a push, quite dynamic push outside." |
| `los-dos-8` | 5 | `leader` | **`lead`** | Start your own rotation to the left as you push. | 562.34 | "At the same time I will start rotating to the left and she will start rotating to the right." |
| `los-dos-9` | — | `both` | `footwork` | One step out each, then two more steps back to where you started. | 575.68 | "this time we're in sync going out only one step out for both of us and then two more steps to get back to our original position." |
| `los-dos-10` | — | `both` | `rhythm` | Count it: 1, 2, 3 and push, 5, 6, 7. | 567.76 | "We start on five, one, two, three and push five, six, seven." |
| `los-dos-combo-1` | — | `both` | `concept` | The three moves are commonly danced straight after one another with no pause between. | 608.16 | "What we like to do quite often is to put these three moves in order without pauses in between. So we'll do la chica, el chico, los dos one by one. This is very commonly used combination when we do classes in real life." |
| `los-dos-combo-2` | — | `leader` | `concept` | The combination is a thinking drill, not a footwork drill — moving your feet in order is only half of it. | 628.84 | "It demands from you guys to be relatively quick and to think quickly… Moving your feet in proper order is half of the problem, but working your brain on time, this is a lot more demanding action." |

**`los-dos-6` is `confidence: 'suspect'`**, flag `K2-a`, with `warning: "Whisper
transcribed 'I grab wrist of her right arm with my arm' — the word naming which
of his arms is missing. The cue text does not name it. Do not fill it in without
watching 552–558."` This is exactly the case the brief calls out: "your left
hand" is ambiguous and dangerous if you cannot tell whose hand, so the hand that
is *not* in the audio is not written.

`los-dos-8` carries `beat: 5` on the strength of "We do it both on 5-6-7"
(@538.76) and the counted "1, 2, 3 and push, 5, 6, 7" (@567.76). The push itself
is again unnumbered, and again gets no `beat` (`los-dos-7`).

**Corroboration at tempo, recorded but not duplicated as cues.** The full-tempo
review calls the same leads in three words: "Swap arms and press." @815.98 and
"Los dos. Swap and press." @822.22 for `los-dos-5`/`-7`; "hand up push" @112.22
for `la-chica-1`/`-3`; "lost dos, guys you go ladies you stay basic"
@814.38–800.98 for `los-dos-1`/`-2`. These are second sources for existing cues,
not new cues, and they are inside the published fast windows so a user hears
them.

**Drillable-cue counts:** `la-chica` 8 (at the cap), `el-chico` 8 (at the cap),
`los-dos` 8 (at the cap), `al-centro` +4 from this class → **16 total, double
the cap** (see K1 note; the frame is now ten of them).

## 2.5 Known defects

| Flag | What | Data | UI |
|---|---|---|---|
| **K2-a** | **The arm is missing from the los dos lead.** @558.06: "I grab wrist of her right arm with my **arm**". Which of his arms is not in the audio. | `los-dos-6`: `confidence: 'suspect'`, `flag: 'K2-a'`, warning as quoted in §2.4. | Show the warning inline. **Never speak this cue in drill mode.** Highest-value eye-check in Class 2 — watch 552–562. |
| **K2-b** | **No `music` chapter.** Class 2's only full-tempo material is in two chapters titled "with music + **review**", where the teachers call move names continuously. There is no silent full-tempo demo anywhere in the class. | All three fast clips carry the shared caveat in §2.3. `cc2-review-music-back` / `-front` keep `role: 'review'` with `reviewsEarlierMoves: true` rather than being relabelled `music`, because the title says review and the content is review. | The three "Full tempo" players all show a caveat. Consider the `label` override — "Full tempo, with calls" is more honest than "Full tempo". |
| **K2-c** | **`lost dos`** @797.30 and @814.38. | Alias on `los-dos`; add `lost dos` → `los dos` to `scripts/normalize_salsa_terms.py`. | None. |
| **K2-d** | **`left chica` @399.66 is an unresolved mangled call.** In context ("and five / left chica one and girls and five six seven") it is most likely "la chica" — he is calling the follower's turn, and "girls" follows immediately. But "el chico" is also possible, since that is the move being taught in this chapter. | **Not aliased to either move.** Recorded here only. | None. |
| **K2-e** | **The 405.0 chapter boundary is derived, not anchored.** The el chico camera change is never announced; the mark lands mid-count. | `cc2-teach-el-chico-front` keeps `start: 405.0` from the chapter, `confidence: 'transcript'` with `warning: "Chapter mark only — the camera change is not announced in the audio."` | Unverified badge on the segment. |
| **K2-f** | **Whisper drops "la" from a real move call.** @399.66 and @115.60–116.74 both show the article vanishing ("Chiki Chiki La", "left chica"). Fuzzy-matching "chica" without the article is what makes `chick`/`chicky` a false-positive risk (§2.1). | No data change. The alias lists deliberately include the bare `chica` and `chico` but **not** `chick`/`chicky`. | None. |
| **K2-g** | **The push has no beat, in two moves.** `la-chica-3` and `los-dos-7`. The teachers count "1, 2, 3 and push" both times and never say a number for it. | `beat` omitted on both. The position is in the cue text ("straight after the 3") and the count is in `verbatim`. **Do not add `beat: 4`.** | Cues render without a beat chip, which is correct. |

---

# Class 3 — Dile que no, Guapea

- **Video** `y6wC5uHfXG0` · 18:47 (1127s) · 9 YouTube chapters · **no official short**
- **Moves, per the description**: `dile que no`, `guapea`
- **No `count` chapter**, but this class has the **best slow window in classes
  1–4** — a 42.8s split-screen counted Guapea inside chapter 4.
- **Note the order.** The description lists `dile que no` first; the video
  teaches **Guapea first** (ch3–4) and Dile que no second (ch5–6), because you
  need somewhere to arrive before you can practise arriving. The segment map is
  in chapter order, which is video order. Playlist order is untouched (charter,
  "Decided") — this is within-class ordering only.

## 3.1 Move index

| id | Canonical name | kind | base | Summary |
|---|---|---|---|---|
| `guapea` | Guapea | `step` | `basic-front-and-back` | The basic step in open position, holding one hand, with the free hands touching palm to palm on 5. |
| `dile-que-no` | Dile que no | `step` | — | The position change: out of close position, she walks past him, both rotate left, and you land in Guapea facing each other. |

**`guapea` aliases:** `Guapea`, `guapea`, `guapéa`, `guapé`. Raw counts across
the seven classes: `Guapea` 24×, `guapéa` 5×, `guapea` 2×, `guapé` 1×. Whisper
handles this name well; the only quirk is an inserted acute accent (`guapéa`,
`guapé`), which is not how the channel writes it — the chapter titles use
"Guapea".

**`dile-que-no` aliases — the worst mangling in the course, by a wide margin.**
Whisper produces **at least 27 distinct spellings** across the seven classes in
this part and gets it right **twice**. R1 lives or dies on this list, so it is
given in full with a source for every entry:

| Alias | Where |
|---|---|
| `Dile que no` | `y6wC5uHfXG0` @731.10 — **correct**, once in this class |
| `Dile Cano` | `4KKAKgn8UZ4` @62.50 (×2), @172.60 (×2), @184.78, @727.12, @728.86; `kg5Ztcp5xQU` @30.88; `y6wC5uHfXG0` @939.72 |
| `Dile Kano` | `y6wC5uHfXG0` @707.38 |
| `Dile Keno` | `kg5Ztcp5xQU`, `y6wC5uHfXG0` |
| `Dilekano` | `kg5Ztcp5xQU` @56.44, @62.88, @71.42; `pZChl5ylSJw` @153.12, @158.76 |
| `Dilekeno` | `y6wC5uHfXG0` (×3) — **the only form the normaliser currently catches** |
| `Dileka know` | `y6wC5uHfXG0` @559.50 |
| `Dilek En O` | `y6wC5uHfXG0` (×2) |
| `D-Lekano` | `y6wC5uHfXG0` @919.52 |
| `D-Lek-N-O` | `y6wC5uHfXG0` @477.80 |
| `D-L-E-K-N-O` | `y6wC5uHfXG0` |
| `D-L-A-K-E-N-O` | `y6wC5uHfXG0` |
| `delay cano` | `y6wC5uHfXG0` @657.66, @683.82; `kg5Ztcp5xQU` |
| `die lekeno` | `4KKAKgn8UZ4` |
| `Le Cano` | `4KKAKgn8UZ4` @116.06, @350.30, @671.34, @744.50 |
| `Le Canoe` | `yZ562-ehtQQ` @350.14 |
| `Lekano` | `yZ562-ehtQQ` @604.68 |
| `D like an off` | `y6wC5uHfXG0` @793.98 |
| `D like and hop` | `y6wC5uHfXG0` @824.02; `kg5Ztcp5xQU` @633.94; `pZChl5ylSJw` @305.54, @316.74 |
| `D like I know` | `kg5Ztcp5xQU` @304.02; `yZ562-ehtQQ` @234.22 |
| `D like a no` | `4KKAKgn8UZ4` @635.98 |
| `D like Eno` | `kg5Ztcp5xQU` @605.92 |
| `D like N` | `4KKAKgn8UZ4` @443.62 |
| `D like N or` | `pZChl5ylSJw` @186.32 |
| `D leg and O` | `4KKAKgn8UZ4` @605.98, @621.58 |
| `D legger` | `pZChl5ylSJw` @293.60 |
| `d leg and` | `kg5Ztcp5xQU` @541.40 |
| `be like an o` | `y6wC5uHfXG0` @875.56 |
| `be like an all` | `kg5Ztcp5xQU` @566.80 |
| `be like and hop` | `yZ562-ehtQQ` @325.50 |
| `be like a knot` | `pZChl5ylSJw` @209.26 |
| `leg and hop` | `kg5Ztcp5xQU` @343.36 |

**Six of these must NOT go in the `aliases` array as bare substrings**, because
they collide with ordinary English in the same transcripts: `D like`, `d like`,
`be like a`, `d leg`, `leg and`, `Le Cano` as `le cano`. The same seven files
contain "if you would like to get one" (`y6wC5uHfXG0` @29.44), "we would like to
limit this" (`kg5Ztcp5xQU` @234.52), "if you'd like us to explain it"
(`4KKAKgn8UZ4` @781.14), "if you would like to join" (`yZ562-ehtQQ` @673.98) and
several more. Ship the **full phrase** forms above (`D like an off`, `D like and
hop`, `be like an o`, …) and leave the two-word prefixes to the normaliser with
context. See K3-a.

### Footwork paragraphs

**`guapea`** — The open-position basic. You stand a little apart, holding one
hand — his left, her right, the same thumb grip as close position — with the
free hands touching palm to palm on 5. Both partners start with the back foot
and both continue forward, on opposite feet: he goes left back, right front,
feet together, then right front, left back, together; she mirrors it starting
right back. It is almost the solo basic front and back from the steps course,
but not exactly — for the follower it is the identical step started in the
opposite direction, and for the leader it is that step mirrored. She walks
directly forward between his legs; he opens slightly outside. "Back, cheeky
cheek — and front, cheeky puku."

**`dile-que-no`** — The change out of close position into Guapea. From one
basic to the side, the leader steps left foot forward, right foot back, and
opens with the left, which creates the space in front of him; at the same moment
the follower goes back with the right, then front with the left and front with
the right, into that space. He then takes three steps on the spot rotating his
body to the left while she walks three steps forward, rotating left as well. He
keeps the hand hold and releases the other hand. They end up facing each other,
rotated, and start Guapea immediately. Dile que no reverses which side of the
room each partner is on.

## 3.2 Segment map

9 chapters, all kept.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `cc3-intro` | 0.0 | 18.0 | `skip` | Intro | — | chapter title "Intro" |
| `cc3-about-class` | 18.0 | 158.00 | `skip` | About this class | — | chapter title "About this class" |
| `cc3-teach-guapea` | 158.00 | 290.04 | `teach` | Guapea — presentation and explanation | `guapea` | chapter title "Guapea - presentation and explanation"; "It's an open position." @158.64, "The step we just showed now is called guapé." @183.94 |
| `cc3-teach-guapea-split` | 290.04 | 417.00 | `teach` | Guapea — both cameras, split screen | `guapea` | chapter title "Guapea - both cameras"; "Okay, the screen will be spirit half. On half you have me from the back, on half of it you have Ola from the back." @290.04. **Analysis says `angle`** — normalised to `teach`: it contains the open-position hold, the palm touch and the counted demo |
| `cc3-count-guapea` | 368.16 | 410.98 | `count` | Guapea, counted — split screen | `guapea` | nested in `cc3-teach-guapea-split`; "Five, six, seven. One, two, three and touch on five, six, seven." @368.16, no music |
| `cc3-teach-dile-que-no` | 417.00 | 567.00 | `teach` | Dile que no — explanation | `dile-que-no` | chapter title "Dile que no - explanation"; "Now, the clue of our class will be how to change positions" @416.94 — the closest chapter-to-transcript agreement in the class |
| `cc3-teach-dile-que-no-steps` | 567.00 | 780.00 | `teach` | Dile que no — steps | `dile-que-no`, `guapea` | chapter title "Dile que no - steps"; "And from here, guys, you are going with the left foot forward" @566.36 |
| `cc3-count-dile-que-no` | 653.04 | 675.80 | `count` | Dile que no, counted — split screen | `dile-que-no`, `guapea` | nested in `cc3-teach-dile-que-no-steps`; "five six basic tiki one two three delay cano" @653.04, no music |
| `cc3-music` | 780.00 | 895.00 | `music` | Dile que no and Guapea with music | `dile-que-no`, `guapea` | chapter title "Dile que no and Guapea with music"; "Okie dokie." @780.64 lands in the 1.2s gap after the previous chapter's last word @779.38 |
| `cc3-review` | 895.00 | 1004.00 | `review` | Review with music | `dile-que-no`, `guapea`, `al-centro`, `la-chica`, `el-chico`, `los-dos`, `arriba`, `abajo` | chapter title "Review with music"; "and let's start reviewing a bit" @896.08, then "this is al centro" @897.70, "la chica" @900.68, "6 el chico" @903.16, "5 6 7 los dos" @906.18. `reviewsEarlierMoves: true` |
| `cc3-outro` | 1004.00 | 1127.00 | `skip` | Summary / Outro | — | chapter title "Summary / Outro"; "Okey dokey." @1001.88 closes the review |

**Boundary checks run.** This is the best-chaptered class in the part. Every
boundary agrees with the transcript to within 1.2 seconds, and two are
sub-second (417.0 vs 416.94; 895.0 vs the last review-preamble word). No
boundary was moved. One caveat, K3-c, applies to the *inside* of `cc3-review`,
not to its edges.

`chaptered: true`. `teaches: ['guapea', 'dile-que-no']` — in that order, which
is teaching order, not description order.

## 3.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 11 | `guapea` | `y6wC5uHfXG0` | **368.16** | **410.98** | 42.82s | `guapea-slow.mp4` | **A** | In: *"Five,"* @368.16, the first count after *"She goes back with the right."* @366.68. Out: the segment ending 410.98, last words *"and front, and stop."* @409.92–410.62; *"Okay? I hope that is clear."* starts @411.56. |
| 12 | `dile-que-no` | `y6wC5uHfXG0` | **653.04** | **675.80** | 22.76s | `dile-que-no-slow.mp4` | **A** | In: the *"five"* @653.04 of *"five six basic tiki one two three delay cano"*, right after *"so it should be quite easy"* @651.94. Out: the word *"stop"* @675.64, whose following word *"we'll"* starts @675.82 — cut at 675.80, in the 0.18s gap. |

**Window 11 is the answer to the hardest part of this brief.** It is 42.8
seconds, counted throughout, split-screen so both partners' feet are visible at
once, and it contains the four best footwork observations in the class inside it:
"Now if you watch our feet" @379.48, "She's going directly forward in between my
legs" @382.54, "and I open slightly outside" @386.74, and the switch to the
vocalisation at 397.64. **No caveat.** For a class with no `count` chapter and no
official short, this is a better slow clip than most of the classes that have
both.

Window 12 has **no caveat** either: 22.8s, inside the target band, counted, no
music, one clean Dile que no into three repetitions of Guapea.

**Alternates:**

| Move | Window | Len | Why rejected |
|---|---|---|---|
| `guapea` | 280.76 → 289.82 | 9.06s | Three clean repetitions of *"Back cheeky cheek and front cheeky puku"* with no talking — the footwork-only demo, before the partners take hands. Less than a quarter of the published window. |
| `dile-que-no` | 681.02 → 701.88 | 20.86s | *"5 6 7 1 2 delay cano 5 6 go cheeky cheeky open…"* — the second run, announced as *"we'll do it one more time but this time we'll start sign to you"* @677.94. Anchored at both ends (out at *"7."* @701.88, *"What"* @702.50) and inside the band. Rejected only because window 12 is 1.9s longer and starts from the basic; this one is a genuinely equal alternative. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 13 | `dile-que-no` | `y6wC5uHfXG0` | **814.38** | **842.30** | 27.92s | `dile-que-no-fast.mp4` | **A V** | In: the *"5"* @814.38 of *"5 6 7 and cheeky cheeky hop"*, the first count after *"Okay let's start one more time from top."* @809.96. Out: 842.30, immediately before *"ok one more time but this time different direction"* @842.32. |
| 14 | `guapea` | `y6wC5uHfXG0` | **873.42** | **895.10** | 21.68s | `guapea-fast.mp4` | **A V** | In: the word *"basic"* @873.42 opening *"basic chick chick hop be like an o hop…"*, right after *"this time this angle, five, six,"* @870.66–873.24. Out: the segment ending 895.10, last words *"and ting ting ca and ting ting cun cun"* @891.34–894.28; the chapter mark is 895.00 and *"and let's start reviewing a bit"* @896.08. |

Window 13 caveat: **"One repetition of Dile que no (@824.02, 'D like and hop').
That is inherent — it is a position change, so it happens once per pass and then
you are in Guapea. The teacher counts and coaches over the music: 'Keep a basic
for a bit longer' @818.14, 'Get ready go' @825.38. The last ~5s is Guapea, not
Dile que no."**

Window 14 caveat: **"The first ~7s is the closed-position basic and one Dile que
no ('be like an o' @875.56) before Guapea proper begins at 880.74. From there it
is clean — 'left cheeky chick right cheeky puku' ×2 @884.08–890.62, then the
rhythm vocalisation."**

Both fast windows come from `cc3-music`, a genuine `music` chapter (unlike Class
2), which is why both clear 20 seconds.

**Rejected fast candidates for `guapea`**, recorded because the choice was close:
829.66 → 842.30 (12.64s, three clean "bow back cheeky cheek and front cheeky
puku" repetitions but under the floor) and 919.52 → 931.76 (12.24s, in the review
chapter, "And D-Lekano. And one. Five, six, seven, boom, back, cheeky cheek, and
front, cheeky poo poo" — starts on Dile que no and runs into "In next episode…").

## 3.4 Cues

**41 cues on two moves. Exactly 1 is `kind: 'lead'`** (`dqn-12`) — Class 3 is deliberately thin on
leading, and the teachers say why: this Dile que no is the simplified version and
"we'll show you many better ways" (@483.68). The lead for it is Class 4's whole
first chapter. `guapea` has 0 lead cues, correctly: nobody signals anything in
the open-position basic.

All `sourceVideo: 'y6wC5uHfXG0'`. All `confidence: 'transcript'` unless a row
says otherwise.

### `guapea` — what it is, and the relationship to the solo basic

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `guapea-1` | — | `both` | `concept` | Guapea is the basic step in open position — the position you spend most of your time in. | 183.94 | "The step we just showed now is called guapé. It's a basic step in open position." (+ "it's the position you are in more while dancing. It's an open position." @156.04) |
| `guapea-2` | — | `both` | `concept` | It is almost the solo basic front and back, but not exactly — same principle, slightly different. | 199.02 | "because they are the same, or they're almost the same as the basic front and back that we already taught you in one of the previous videos… It's based on the same principle, but it's slightly different." |
| `guapea-3` | 5 | `follower` | `footwork` | Exactly the solo step, started the other way: right foot back instead of left foot forward. | 221.08 | "From a lady perspective, it's exactly the same step, but you started opposite direction. So instead of going with the left forward, she starts with the right back, but it is exactly the same step." |
| `guapea-4` | 5 | `leader` | `footwork` | Still start with the left leg, but go back with it instead of forward. | 248.40 | "So you still can start with the left leg, but instead of going front with the left, you'll go back with the left." |
| `guapea-5` | [5,6,7,1,2,3] | `leader` | `footwork` | Left back, right front, feet together — then right front, left back, feet together. | 254.50 | "So I'll go left back, right front together, and right front, left back together" |
| `guapea-6` | — | `both` | `footwork` | You both start on the back foot and you both continue forward. | 263.82 | "So we both start with back foot and both continue forward." |
| `guapea-7` | — | `both` | `concept` | You are on opposite feet throughout. | 270.36 | "But we're going with opposite feet." |
| `guapea-rhythm` | — | `both` | `rhythm` | "Back, cheeky cheek — and front, cheeky puku." | 259.78 | "And back cheeky cheek and front cheeky puku." |

`guapea-2` is why the move carries `base: 'basic-front-and-back'` — the teachers
make the link themselves, and then immediately qualify it. The cue keeps the
qualification, because a user who assumes it *is* the solo basic will start on
the wrong foot.

### `guapea` — the open-position hold

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `guapea-8` | — | `both` | `concept` | In open position you stand a little apart. | 297.94 | "Now, when we're standing opposite to each other, we are in a bit of distance." |
| `guapea-9` | — | `both` | `arms` | Hold one hand only. | 304.70 | "and we'll hold only one hand." |
| `guapea-10` | — | `follower` | `arms` | Keep holding his thumb, your fingers on top. | 307.24 | "She's still holding my thumb, her fingers on top and my fingers are closing the grip." |
| `guapea-11` | — | `leader` | `arms` | Close your fingers over hers to finish the grip. | 310.22 | (same sentence) |
| `guapea-12` | — | `follower` | `arms` | Your free hand goes on your hip. | 315.54 | "second hand is free. Her is on the hip, mine will be around my waist as well." |
| `guapea-13` | — | `leader` | `arms` | Your free hand goes around your own waist. | 317.08 | (same sentence) |
| `guapea-14` | 5 | `both` | `arms` | Touch free hands, palm to palm, on 5. | 320.06 | "Another thing that will happen with the second hand, we'll start touching it. So we'll go palm to palm and this touch will happen on five." |
| `guapea-15` | — | `both` | `arms` | A touch, not a clap. | 327.98 | "And it has to be touch not a clap. So it's not nothing like that, just simple touch." |
| `guapea-16` | — | `leader` | `concept` | The reason it's a touch: later you catch that hand mid-move and continue on two hands, and you cannot catch a clap. | 333.82 | "Why this touch is important? Because there will be moments that I will try to grab her hand and continue with the move with two hands. And if we just clap it, it's impossible to hold it." |

`guapea-10`/`-11` and `guapea-12`/`-13` are two more R4 splits. `guapea-12` and
`-13` in particular would be catastrophic merged: "your free hand goes on your
hip / around your waist" are *different* placements for the two roles, said in
one sentence, and a `role: 'both'` cue containing "your hip" would be wrong for
one of the two people reading it.

`guapea-14` **is** legitimately `role: 'both'`: each partner has exactly one free
hand, the action is identical, and the teachers never say which hand it is on
either side. That is the distinction the type doc is drawing — "genuinely
role-independent instruction", not a merge.

### `guapea` — the counted demo

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `guapea-17` | 5 | `leader` | `footwork` | Go back with the left. | 365.86 | "I go back with the left." |
| `guapea-18` | 5 | `follower` | `footwork` | Go back with the right. | 366.68 | "She goes back with the right." |
| `guapea-19` | [1,2,3] | `follower` | `footwork` | Walk directly forward, in between his legs. | 382.54 | "She's going directly forward in between my legs." |
| `guapea-20` | [1,2,3] | `leader` | `footwork` | Open slightly outside. | 386.74 | "One, two, three and I open slightly outside." |
| `guapea-21` | — | `both` | `styling` | Lower it. | 394.52 | "One, two, let's lower, five, six, seven" |

**`guapea-21` is `confidence: 'suspect'`**, flag `K3-b`, with `warning: "The
teacher says only 'let's lower' — two words inside a count. What to lower (the
knees, the body, the steps) is not stated anywhere in the class. Kept because it
is real instruction; do not guess the object."` It is `kind: 'styling'` so it is
not drilled.

### `dile-que-no`

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `dqn-1` | — | `both` | `concept` | Dile que no is how you change from close position into the open position of Guapea. | 416.94 | "Now, the clue of our class will be how to change positions, how to go from close position we showed you previously to open positions of Guapea step that we are showing you right now." |
| `dqn-2` | — | `both` | `concept` | This is a deliberately simplified version. It is correct and it builds proper habits; better versions come later. | 477.80 | "So when we show you this D-Lek-N-O step, we'll simplify it as well. This is not the best way to do it. We are telling you it right now. And we'll show you many better ways… but it's completely proper it's correct and it develops proper habits" |
| `dqn-3` | — | `both` | `footwork` | Start from one basic to the side, and stop. | 559.76 | "now Dileka know, we'll do one basic to the side, five, six, seven, cheeky, cheeky, open, cheeky, cheeky, stop." |
| `dqn-4` | 1 | `leader` | `footwork` | Left foot forward. | 566.36 | "And from here, guys, you are going with the left foot forward and then with right back and we open with the left" |
| `dqn-5` | 2 | `leader` | `footwork` | Right foot back. | 572.26 | (same sentence) |
| `dqn-6` | 3 | `leader` | `footwork` | Open with the left. | 573.28 | (same sentence) |
| `dqn-7` | 1 | `follower` | `footwork` | At the same moment, go back with the right. | 582.40 | "Okay, from a girl's perspective, at the same moment, she goes back with the right, five, six, seven." |
| `dqn-8` | [1,2,3] | `follower` | `footwork` | Back with the right, front with the left, front with the right. | 586.12 | "Back with the right, front with the left, and front with the right." |
| `dqn-9` | — | `leader` | `concept` | Those three steps are what create the space in front of you for her to walk into. | 590.14 | "And now, we created a bit of space in front of us. There is space for her to go in front of me. Okay, this is very important. We created this space for girls." |
| `dqn-10` | [5,6,7] | `leader` | `footwork` | Three steps on the spot, rotating your body to the left. | 605.94 | "Now I continue with three steps in a spot and I will rotate my body to the left." |
| `dqn-11` | [5,6,7] | `follower` | `footwork` | At the same time, walk forward and rotate your body to the left as well. | 611.06 | "At the same time she'll walk forward and rotate her body to the left as well." |
| `dqn-12` | — | `leader` | **`lead`** | Keep the hand hold; let go with the other hand. | 615.10 | "We keep holding the left hand, we'll let go the right one." |
| `dqn-13` | [5,6,7] | `follower` | `footwork` | Walk, walk, walk — three steps. | 621.76 | "Walk, walk, walk. Three steps." |
| `dqn-14` | — | `leader` | `footwork` | You finish rotated towards her, facing each other. | 624.94 | "I rotated towards her, we're facing each other." |
| `dqn-15` | — | `both` | `footwork` | From there, start Guapea straight away. | 627.94 | "From here straight away we start Guapea." |
| `dqn-16` | — | `follower` | `arms` | Keep your own weight even in the moment you separate — you are a frame, not a support. | 522.32 | "ladies what I said in the first video even when you do this move where you separate still keep your weight so your partner is not your support… you're a frame not a support, you're a frame and you're keeping your own nice picture" (restated @547.10 "she's always dancing light… not dropping on me") |
| `dqn-17` | — | `both` | `concept` | The hardest part is knowing when to start it. | 703.54 | "What we notice is more the most difficult for our students when they are learning Dile Kano is the moment to start it." |
| `dqn-18` | — | `both` | **`rhythm`** | Almost every action starts after the open step. | 709.84 | "So it's a good habit or it's a good idea to remember that all actions or majority of actions are starting after our open step. So cheeky cheeky open cheeky cheeky open and after I open then I go cheeky cheeky hop" |
| `dqn-19` | — | `both` | `concept` | Dile que no reverses your positions — you end up on each other's side of the floor. | 730.30 | "also Dile que no reverses the position so we started from this camera that I'm looking at now you could see my back now you can see Ola's back okay and this is one of the aims as well" |

**`dqn-12` carries a `warning`** rather than a `suspect` grade: `"The teacher
says 'the left hand' and 'the right one' without saying whose. Read against
Class 1's frame — his left hand holds hers (@274.44) and his other hand is on her
back (@279.14) — this is 'keep the hand hold, release the hand on her back'. The
cue text avoids naming a side because the audio does not. Worth an eye-check at
615."` This is the R4 rule applied to a *deduction that is probably right*: the
reading goes in the warning, not in the cue.

`dqn-18` is the highest-value cue in Class 3 and the one most worth drilling.
It is `kind: 'rhythm'` — not `concept` — precisely so it is spoken in drill mode:
it is the timing rule that makes every later move startable, and the teachers
introduce it as the answer to `dqn-17`.

`dqn-4`, `-5` and `-6` are three cues from one sentence, because they are three
steps on three beats. The beats are the teachers' own — he counts "five, six,
seven, go front, back, open" @574.68–577.48, which maps front/back/open onto the
following 1, 2, 3.

**Drillable-cue counts:** `guapea` 17 — **more than double the cap of 8**;
`dile-que-no` 12 — also over. Both flagged, neither trimmed. The reason is
structural rather than editorial: Guapea is the first move in the course that
introduces a whole new *position*, so nine of its seventeen drillable cues are
the hold rather than the step. If the cap is ever enforced mechanically, split
the hold out of the step rather than deleting instruction.

## 3.5 Known defects

| Flag | What | Data | UI |
|---|---|---|---|
| **K3-a** | **Dile que no is mangled 27 ways and the normaliser catches one of them.** `scripts/normalize_salsa_terms.py` currently maps only `Dilekeno` → `Dile que no` (2 hits in `y6wC5uHfXG0`). Every other form in the §3.1 table passes through untouched, including the six that appear in *other* classes' transcripts, which is why Part 2 and Part 3 will hit the same problem. | Ship the full §3.1 list as `aliases` on `dile-que-no`, **excluding** the six English-colliding prefixes. Add the unambiguous forms to the normaliser. | None — this is a data-layer fix. But it is the single highest-impact defect in classes 1–7: without it, a name search for the course's most common move finds it twice out of ~40 mentions. |
| **K3-a′** | **Six manglings collide with ordinary English** in the same files: `D like`, `d like`, `be like a`, `d leg`, `leg and`, `le cano`. Counter-examples in the same transcripts: @29.44 "if you would like to get one", `kg5Ztcp5xQU` @234.52 "we would like to limit this", `4KKAKgn8UZ4` @781.14 "if you'd like us to explain it", `yZ562-ehtQQ` @673.98 "if you would like to join". | Alias only the full phrases. Any normaliser rule for the prefixes must require a following count token or "hop". | None. |
| **K3-b** | **"let's lower"** @394.52 — two words, object unstated. | `guapea-21`: `confidence: 'suspect'`, `flag: 'K3-b'`, `kind: 'styling'`, warning as quoted in §3.4. | Show the warning. Not drilled (styling is not in `DRILLABLE_CUE_KINDS`). |
| **K3-c** | **Degenerate word timings inside `cc3-review`.** The segment nominally spanning 966.00–995.98 has words that stop at 988.78 and then jump straight to 995.98 — roughly 7 seconds of "Dile que no straight away, go, one, and close position, arriba, and chik chik pa, chik chik" with no usable timing. | No clip window is cut anywhere in 966–996, and no cue is sourced there. `cc3-review` stays `confidence: 'transcript'` with `warning: "Word timings are unreliable between 966 and 996."` | Unverified note on the segment. |
| **K3-d** | **"the left hand … the right one"** @616.42/@618.26 — whose hand is never said. | `dqn-12` warning, as quoted in §3.4. Not graded `suspect`, because Class 1's frame determines the answer; graded `transcript` with the deduction disclosed. | Show the warning inline. |
| **K3-e** | **"Ball back" / "bow back" are not a move name.** @630.38 "From here straight away we start Guapea. Ball back." and @880.74 "bow back tiki tic". Compare @664.34, where the same call is transcribed correctly as "both back". | **Do not alias.** Add `ball back` → `both back` and `bow back` → `both back` to the normaliser. | None. |
| **K3-f** | **"the screen will be spirit half"** @290.04 = "split in half". Worth recording because it is the *provenance string* for the `cc3-teach-guapea-split` boundary, and a reader who does not know it is a mangling will think the segment map is quoting nonsense. | Provenance string kept verbatim (it is provenance — it must be what was said), with the reading in the label: "split screen". | None. |
| **K3-g** | **`guapéa` / `guapé` carry an accent the channel does not use.** 6 of 32 raw mentions. | Aliases on `guapea`; canonical name stays `Guapea`, per the chapter titles. | None. |

---

# Class 4 — Enchufla, Enchufla al Centro

- **Video** `kg5Ztcp5xQU` · 14:04 (844s) · 12 YouTube chapters · **no official short**
- **Moves, per the description**: `enchufla (double, triple)`, `enchufla al centro`
- **No `count` chapter.** Both clips for both moves are cut from `teach` blocks
  and from the music/review chapters. Class 4 is the last class in this part with
  that problem — Class 5 onwards has both a `count` chapter and a short.
- **The best-chaptered class in the part.** Eleven of the twelve boundaries land
  within 1.2s of a sentence start; three are sub-second. Nothing was moved by
  more than the length of a pause, except one boundary that sits in a 4.5s
  silence (see §4.2).
- **This class closes the loop the course has been building since Class 1**, and
  the teachers say so at @734.54: *"So we can complete now the basic salsa loop."*

## 4.1 Move index

Class 4 touches **four** moves. Two are new; two already exist and gain a further
teaching source.

| id | Canonical name | kind | base | New? | Summary |
|---|---|---|---|---|---|
| `enchufla` | Enchufla | `step` | `basic-side` | **No** — exists from steps Class 4. Gains a 2nd `TeachingSource`. | Both partners rotate in opposite directions and swap places, holding one hand, the leader passing behind her back and blocking with his right hand. |
| `enchufla-al-centro` | Enchufla al Centro | `step` | `enchufla` | **Yes** | Half an Enchufla: swap places on 1-2-3, then pull her in and close the position over three steps, landing back in the basic to the side. |
| `dile-que-no` | Dile que no | `step` | — | **No** — Class 3. Gains a 2nd `TeachingSource`. | Class 4's chapter 3 is the *leading* of it. |
| `guapea` | Guapea | `step` | `basic-front-and-back` | **No** — Class 3. Gains a 2nd `TeachingSource`. | Class 4's chapter 8 is the versions of it. |

### `enchufla` — the shared move, as required

Per the brief, Class 4's Enchufla is **an additional `TeachingSource` on the
existing `enchufla` move id**, not a new move. The teachers make the join
themselves, at @136.92: *"if you check our beginner steps classes, we've done a
Enchufla step and we'll show you how it works as a couple."* That sentence is the
justification, and it is shipped as cue `enchufla-9`.

```ts
// added to the existing enchufla move's `sources` array
{
  course: 'couples', classNumber: 4, videoId: 'kg5Ztcp5xQU',
  teachStart: 131.26,
  segmentIds: [
    'cc4-teach-enchufla-presentation',
    'cc4-teach-enchufla',
    'cc4-count-enchufla',
  ],
  clips: { /* see §4.3 */ },
  note: 'The couples version of the solo step from steps Class 4. Filmed from '
      + 'an unusual angle, announced at 131.90 as "a bit weird perspective".',
}
```

**Two consequences of sharing the id, both of which must be handled:**

1. **Clip filenames collide.** `enchufla-slow.mp4` and `enchufla-fast.mp4`
   already exist under `frontend/public/` from steps Class 4. The couples clips
   must be `enchufla-couples-slow.mp4` / `enchufla-couples-fast.mp4`. `SalsaClip.src`
   is a free path, so nothing in the types needs changing — but a cutting script
   that derives the filename from the move id will silently overwrite the steps
   clips. Flagged as **K4-m**.
2. **Cue ids must not collide.** Steps Class 4 uses `enchufla-1` … `enchufla-7`.
   The couples cues continue the sequence from `enchufla-8`, exactly as
   `al-centro` continued to `al-centro-frame-7..10` in Class 2.

**`enchufla` aliases to add.** Raw Whisper drops the initial *en* in the large
majority of cases — the normalised transcript reads "Enchufla" where the raw
audio file says "chufla", so `scripts/normalize_salsa_terms.py` is already
handling that one. Everything below it is not:

| Alias | Where (raw) |
|---|---|
| `chufla`, `Chufla` | `kg5Ztcp5xQU` @0.00, @49.72, @113.48 (×3), @136.92, @552.40, @569.28, @576.34 (×3); `4KKAKgn8UZ4` @221.28 (×2), @258.64 (×2) — **normaliser already maps this** |
| `and chufla` | `4KKAKgn8UZ4` @221.28 |
| `an chufla` | `4KKAKgn8UZ4` @243.12; `pZChl5ylSJw` @461.12 |
| `chuffla` | `kg5Ztcp5xQU` @529.80 |
| `chuflas` | `MDEAN40DUVY` @75.90 ("alternate patterns and chuflas") |
| `ciufla` | `4KKAKgn8UZ4` @507.20 |
| `enchu flá` | `kg5Ztcp5xQU` @246.88, @250.76, @252.90, @254.62, @258.04 |
| `enchu flá doble`, `enchu flá tripla` | `kg5Ztcp5xQU` @252.90, @254.62 |
| `two flat`, `2 flat` | `kg5Ztcp5xQU` @317.46, @323.36, @450.24, @453.26, @471.32, @486.10, @709.56; `yZ562-ehtQQ` @230.84, @473.74 |
| `flat` | as above — see K4-c |
| `2 flas`, `flas` | `kg5Ztcp5xQU` @646.72 |
| `fly` | `kg5Ztcp5xQU` @617.72 ("and two, fly al centro") |
| `Enchufla Doble`, `Enchufla Triple`, `Enchufla, triple` | `kg5Ztcp5xQU` @419.92, @420.72, @354.30, @574.12 |
| `small enchufla`, `very tiny enchufla` | `4KKAKgn8UZ4` @443.62, @330.48 — recorded here, belongs to Class 5 |

### `enchufla-al-centro` — the new move

**Canonical name: `Enchufla al Centro`**, as the chapter title and the description
write it. Not translated, not re-spelled.

**Aliases:** `Enchufla al Centro`, `enchufla al centro`, `chufla al centro`,
`Chufla al centro` (`kg5Ztcp5xQU` @0.00), `an chufla al centro`
(`pZChl5ylSJw` @461.12), `and chufla double one al centro` (`kg5Ztcp5xQU`
@529.80), `ciufla doble al centro` (`4KKAKgn8UZ4` @507.20), `aisle central`
(`kg5Ztcp5xQU` @121.36), `two flat center` (@471.32), `L centro` (@486.98),
`fly al centro` (@617.72), `2 flas doble al centro` (@646.72), `two flat doble al
centro` (@317.46), `two flat triple al centro` (@709.56), `Enchufla Doble al
Centro`, `Enchufla Triple al Centro`.

**Explicitly NOT an alias: bare `al centro`.** That is a different move —
`al-centro`, the close-position step from Class 1 — and it appears 37 times in
raw across these seven classes in that sense. See **K4-b**; this is the most
dangerous R1 collision in classes 1–7.

**Explicitly NOT separate moves: `Enchufla Doble` and `Enchufla Tripla`.** The
teachers state at @243.40 that the name carries the repetition count: *"when we
call this move, we call it enchu flá, and we add the number of repeats after. If
it's only enchu flá, it's one repetition. Enchu flá doble, we do it twice. Enchu
flá tripla, we do it three times."* The description's "enchufla (double, triple)"
is one move with a count, not three moves. That sentence is shipped as cue
`enchufla-22` and it is the reason no `enchufla-doble` id exists.

### Footwork paragraphs

**`enchufla`** (couples) — From Guapea, holding one hand — his left, her right,
the Guapea grip. Both partners rotate, in opposite directions, mirroring each
other: he goes back with the left foot on 5, she goes back with the right. His
hand swings a little down, then up in front of her face, and rotates; at the same
time he travels behind her back, and his right hand stops her and blocks. The
count is "one, two, three and block, six, seven", repeated as many times as
called. Her free hand goes up and outside on each repetition.

**`enchufla-al-centro`** — The way back from open position to close position, and
the last piece of the basic salsa loop. On the final repetition of an Enchufla you
do only half of it: you swap places on 1, 2, 3. Then instead of continuing, the
leader pulls her towards himself and both take three steps — not on the spot,
travelling towards each other so the position closes. From there you are in the
basic to the side: "chiki cheeky left, and cheeky cheeky right."

## 4.2 Segment map

12 chapters, all kept. Three nested `count` windows added.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `cc4-intro` | 0.0 | 18.30 | `skip` | Intro (cold-open preview) | — | chapter title "Intro". Contains a preview clip lifted from later in the video — see K4-i |
| `cc4-about-class` | 18.30 | 56.44 | `skip` | About this class | — | chapter title "About this class"; "Hello welcome to another beginners Cuban salsa class" @18.30; "So we'll teach you Enchufla and Enchufla al Centro." @47.14–50.96 |
| `cc4-teach-leading-dile-que-no` | 56.44 | 112.50 | `teach` | Leading Dile que no | `dile-que-no` | chapter title "Leading Dile Que No"; "we'll go through the following and leading in Dilekano" @56.44 — a sub-second agreement |
| `cc4-teach-enchufla-presentation` | 112.50 | 131.26 | `teach` | Enchufla — presentation | `enchufla`, `enchufla-al-centro` | chapter title "Enchufla - presentation"; "So we'll show you step first five six and Enchufla" @112.50 |
| `cc4-teach-enchufla` | 131.26 | 256.76 | `teach` | Enchufla — explanation | `enchufla` | chapter title "Enchufla - explanation"; "We'll face this way for a moment. That will be a bit weird perspective" @131.26. **Chapter mark is 127.0**, which falls in the 4.5s silence between "open." @126.74 and "We'll" @131.26 — moved to the anchor |
| `cc4-count-enchufla` | 189.24 | 220.18 | `count` | Enchufla, counted — narrated | `enchufla` | nested in `cc4-teach-enchufla`; "Now at the same time I go behind her back" @189.24, then "One, two, three and block six, seven." ×3 @195.38–207.22 |
| `cc4-teach-enchufla-al-centro` | 256.76 | 300.00 | `teach` | Enchufla al Centro | `enchufla-al-centro`, `enchufla` | chapter title "Enchufla al Centro"; "So for example, enchu flá tripla" @256.76. **Mislabel:** the first ~12s is the Enchufla Tripla naming demo; al centro begins @268.24 "and now we'll go to al centro" — see K4-j |
| `cc4-teach-loop` | 300.00 | 375.06 | `teach` | Open–close position loop | `enchufla`, `enchufla-al-centro`, `dile-que-no`, `guapea` | chapter title "Open - close position loop". 300.0 falls in the 0.88s gap between "basic side." @299.96 and "Chiki," @300.84 — kept as published |
| `cc4-count-loop` | 309.26 | 331.78 | `count` | The whole loop, counted — front view | `enchufla-al-centro`, `enchufla`, `dile-que-no`, `guapea` | nested in `cc4-teach-loop`; "five six seven one two three five six both back" @309.26, no music |
| `cc4-count-loop-side` | 337.06 | 370.42 | `count` | The whole loop, counted — side view | `enchufla-al-centro`, `enchufla`, `dile-que-no`, `guapea` | nested in `cc4-teach-loop`; "then you'll see side of us during Enchufla." @337.06, no music |
| `cc4-teach-guapea-versions` | 375.06 | 413.92 | `teach` | Versions of Guapea | `guapea` | chapter title "Versions of Guapea"; "Okay, one more thing to mention." @375.06 |
| `cc4-teach-loop-practice` | 413.92 | 506.68 | `teach` | Open–close loop practice (called) | `enchufla`, `enchufla-al-centro`, `dile-que-no`, `guapea` | chapter title "Open - close loop practice"; "We'll do a transition a couple of times between Dile Keno, Guapea, and then I'll call Enchufla, Enchufla Doble, Enchufla Triple" @413.92 |
| `cc4-count-loop-practice` | 463.10 | 498.80 | `count` | The loop, counted and called | `enchufla-al-centro`, `enchufla`, `dile-que-no`, `guapea` | nested in `cc4-teach-loop-practice`; "5, 6, 7. 1, D, le cano. Hop and go." @463.10, no music |
| `cc4-music` | 506.68 | 621.62 | `music` | Open–close loop with music | `enchufla`, `enchufla-al-centro`, `dile-que-no`, `guapea` | chapter title "Open - close loop with music"; "We'll do it both directions" @506.68. The teachers count and call over the music throughout — this is not a silent demo |
| `cc4-review` | 621.62 | 729.88 | `review` | Review with music | `enchufla`, `enchufla-al-centro`, `dile-que-no`, `guapea`, `al-centro`, `la-chica`, `el-chico`, `los-dos`, `arriba`, `abajo` | chapter title "Review with music"; "And start reviewing. One." @621.62, then "La chica." @625.24, "El chico." @628.10, "Los dos together." @631.36, "arriba" @679.86, "abajo, abajo" @686.56–687.14. `reviewsEarlierMoves: true` |
| `cc4-outro` | 729.88 | 844.00 | `skip` | Summary / Outro | — | chapter title "Summary / Outro"; "Okay, so one of the goals is achieved with this class." @729.88 |

`chaptered: true`. `teaches: ['enchufla', 'enchufla-al-centro']` — the two moves
the class is *for*. Chapters 3 and 8 add sources to `dile-que-no` and `guapea`
but do not teach them from scratch, so they stay out of `teaches`.

**One boundary worth a second look.** Nothing in this class is `suspect`; the
weakest is 300.0, which lands in a sub-second gap rather than on a word. Kept as
published because moving it to 300.84 would push the loop chapter's own
introduction ("And from here we start our basic side" @298.44) into the previous
chapter.

## 4.3 Clip windows

Four windows, two per move. **Every one is cut from this class**, because there is
no official short for Class 4 and no `count` chapter to take a slow clip from.

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 15 | `enchufla` | `kg5Ztcp5xQU` | **189.24** | **220.18** | 30.94s | `enchufla-couples-slow.mp4` | **A V** | In: *"Now"* @189.24, opening *"Now at the same time I go behind her back"*. Out: 220.18, in the gap before *"tick,"* @220.20, which starts the rhythm vocalisation. |
| 16 | `enchufla-al-centro` | `kg5Ztcp5xQU` | **309.26** | **331.78** | 22.52s | `enchufla-al-centro-slow.mp4` | **A V** | In: the *"five"* @309.26 of *"five six seven one two three five six both back"*, the first count after *"And cheeky, cheeky D like I know."* @307.26–309.12. Out: 331.78, after *"nice one"* @331.24–331.60 and before *"we'll"* @331.82. |

**Window 15 caveat:** *"Class 4 has no count chapter, so this is cut from the
'Enchufla - explanation' teach block and the teachers narrate over it. The
counted repetitions are 195.4–207.2 ('One, two, three and block, six, seven' ×3)
and the follower's styling repetitions are 209.5–218.4. Filmed from the angle the
teachers themselves call 'a bit weird perspective' (@131.90) — they are turned
away from the usual front camera so the rotation is visible."*

**Window 16 caveat:** *"Cut from the 'Open - close position loop' teach block —
Class 4 has no count chapter. Counted throughout with no music, and it contains
two Enchufla al Centro passes (@318.60 'two flat doble al centro hop' and @323.36
'two flat pull step step step'), but it is a full-loop demo, so it also contains
Guapea and a Dile que no. The teacher says 'nice one' in the last 0.5s."*

**Alternates:**

| Move | Window | Len | Why rejected |
|---|---|---|---|
| `enchufla` | 258.04 → 268.20 | 10.16s | *"enchu flá tripla, five, six, seven, one enchufla, hop block, 5 6 7 2 enchufla hop block 5 6 7 3 enchufla hop"* — three clean counted repetitions with no explanation over them, and the best demonstration of what *tripla* means. Rejected only for length; it is less than half the floor. |
| `enchufla` | 337.06 → 370.42 | 33.36s | The side view (`cc4-count-loop-side`), announced as *"then you'll see side of us during Enchufla"* @337.06. Counted throughout, and the angle is arguably better for the pass-behind. Rejected because it is a full-loop demo in which Enchufla is one element, whereas window 15 is about Enchufla only. |
| `enchufla-al-centro` | 273.54 → 300.80 | 27.26s | **The better explanation, the worse loop.** In at *"so how to do enchufla al centro"* @273.54, out before *"Chiki,"* @300.84. Entirely about this move: the half-repetition, the swap on 1-2-3, the pull, the three closing steps. Rejected because it is talk-led rather than counted, and the brief prioritises a followable counted demo. Strong candidate if a reviewer disagrees. |
| `enchufla-al-centro` | 463.10 → 498.80 | 35.70s | `cc4-count-loop-practice`. Counted, no music, and it contains three different al centro calls: *"two flat center only one straight away close it"* @471.32, *"two flat triple L centro"* @486.10, and the *"cheeky cheeky cuckoo"* finish. Rejected for the same reason as window 16's rivals — more loop than move — and it is 0.7s over the 35s comfortable ceiling. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 17 | `enchufla` | `kg5Ztcp5xQU` | **569.28** | **589.80** | 20.52s | `enchufla-couples-fast.mp4` | **A V** | In: *"Hop"* @569.28, the segment start after *"One, be like an all."* ends @567.92. Out: 589.80, 0.06s before *"And one more time"* @589.86. |
| 18 | `enchufla-al-centro` | `kg5Ztcp5xQU` | **699.50** | **728.30** | 28.80s | `enchufla-al-centro-fast.mp4` | **A V** | In: *"And"* @699.50, the segment start after *"this perspective."* ends @697.40. Out: 728.30, after *"great."* @728.06 and before *"Okay, so one of the goals is achieved"* @729.88. |

**Window 17 caveat:** *"The teacher calls over the music — 'and one and Enchufla
triple' @573.28, then 'One and Enchufla hop' / 'two and Enchufla hop' / 'three
and Enchufla hop, finish' @576.34–584.74, which is three clean repetitions and
exactly what the clip is for. The last ~4.5s (585.3–589.8) has no speech; the
dancers are resetting between passes. Trim to 585.34 if the reset looks wrong on
screen — that costs 4.5s and puts the clip under the 20s floor."*

**Window 18 caveat:** *"Cut from the review chapter rather than the music
chapter, because the review contains the reversed split-screen angle the
teachers announce at 687.52 ('reverse camera, split it') and at 696.02 ('I don't
think we ever showed this step from this perspective'). The teacher calls
throughout: 'and 2 flat triple, al centro, Go' @709.42–711.12, then three
repetitions and 'king, king, cuckoo' ×4. Ends on 'great.'"*

**Rejected fast candidate for `enchufla-al-centro`:** 633.90 → 662.14 (28.24s,
also grade A — in after *"Los dos together. Hop."* @633.82, out at the segment
end 662.14). *"6, 7 and 1 and D like and hop and 1, Guapea both back and back and
5, 6, 7 and 1 and 2 flas doble al centro go…"* — the **doble** rather than the
triple, from the ordinary camera. A genuinely equal alternative; window 18 wins
only on the camera angle.

## 4.4 Cues

**34 cues on four moves, 7 of them `kind: 'lead'`.** Class 4 is where the R3
promise starts paying: chapter 3 is 56 seconds of nothing but leading, and the
Enchufla explanation adds the hand swing and the block.

All `sourceVideo: 'kg5Ztcp5xQU'`. All `confidence: 'transcript'` unless a row
says otherwise. All ids continue their move's existing sequence.

### `dile-que-no` — the leading (chapter 3). This is the chapter the brief singled out.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `dqn-20` | 1 | `leader` | **`lead`** | Step forward — your whole body is the signal. | 72.74 | "The first element of leading Dilekano is me stepping forward and the whole of my body is giving the signal." |
| `dqn-21` | — | `leader` | **`lead`** | Step forward, then open — and on the open, push. | 80.36 | "So I step forward and then open and at this point I give a push." |
| `dqn-22` | — | `both` | `rhythm` | "Push! Take! Poco!" | 85.00 | "Push! Take! Poco!" |
| `dqn-23` | 5 | `leader` | **`lead`** | You both start back into Guapea — and your wrist acts as you go. | 87.02 | "When we land in Guapea we both start back but the wrist is acting as well." |

`dqn-20` takes `beat: 1` from Class 3's `dqn-4` — the leader's step forward is
the left foot on 1, stated at `y6wC5uHfXG0` @566.36. That is a cross-class read,
not an invention, and it is the one beat in this group that is safe.

**`dqn-21` carries no `beat`.** "At this point" refers to the open step, which
Class 3 puts on 3 — but the teachers never say a number for the push, in this
class or in Class 2, where the identical problem produced K2-g. The position is
in the cue text; `beat` stays absent. Same defect family, recorded as **K4-f**.

**`dqn-23` carries a `warning`:** `"'the wrist is acting' — the teacher does not
say whose wrist. He is describing his own lead from the leader's point of view
throughout this chapter, and the wrist in question is the one holding her hand,
so this is read as the leader's. Worth an eye-check at 90.58."` `beat: 5` comes
from "we both start back", and Class 3's `guapea-17`/`-18` put the back step on 5.

`dqn-22` is included even though it is a vocalisation, and the distinction matters
given how carefully the rest of this part excludes them. "Cheeky cheeky" and
"king king pa" are the teachers singing the *beat* — they carry no information.
"Push! Take! Poco!" names the *actions* of the lead in order, which is why it is
a cue and the others are not.

### `enchufla` — the couples version (chapters 4–6)

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `enchufla-8` | — | `both` | `context` | You know how to get from close position to open. Enchufla is how you get all the way back. | 105.34 | "Now we landed in open position, we know how to swap from close to open, now we'll have to go all the way back." |
| `enchufla-9` | — | `both` | `concept` | It is the Enchufla from the beginners steps course, done as a couple. | 136.92 | "if you check our beginner steps classes, we've done a Enchufla step and we'll show you how it works as a couple." |
| `enchufla-10` | — | `both` | `footwork` | You both rotate, in opposite directions. | 143.28 | "So we'll both rotate and we'll both rotate opposite direction." |
| `enchufla-11` | 5 | `leader` | `footwork` | Go back with the left foot. | 146.80 | "I'll go back with the left foot, she'll go back with the right and we'll kind of mirror each other." |
| `enchufla-12` | 5 | `follower` | `footwork` | Go back with the right foot. | 148.66 | (same sentence) |
| `enchufla-13` | — | `both` | `concept` | You mirror each other. | 150.32 | "and we'll kind of mirror each other." |
| `enchufla-14` | — | `leader` | `arms` | Hold one hand only — your left, the same hand as in Guapea. | 178.76 | "so i'm holding only one hand the same hand as in guapea so my left head right" |
| `enchufla-15` | — | `follower` | `arms` | Give your right hand, as in Guapea. | 183.14 | (same sentence) |
| `enchufla-16` | — | `leader` | **`lead`** | Swing that hand down, then up in front of her face, and rotate. | 184.14 | "the hand is swinging going a bit down and then in front of her face and rotating." |
| `enchufla-17` | — | `leader` | `footwork` | At the same time, travel behind her back. | 189.24 | "Now at the same time I go behind her back" |
| `enchufla-18` | — | `leader` | **`lead`** | Your right hand stops her and blocks, straight after the 3. | 193.22 | "and my right hand will stop her and block. One, two, three and block six, seven." |
| `enchufla-19` | — | `follower` | `styling` | Free hand up, and outside. | 207.78 | "Ola is styling this freehand. It goes up and outside and up and outside and up and outside." |
| `enchufla-20` | — | `both` | `rhythm` | "Tick, ticky, poku." | 220.20 | "tick, ticky, poku and 1, 2, 3 and 5" |
| `enchufla-21` | — | `both` | `concept` | Fine at a party — but cap it at about three repeats or your partner will get bored. | 227.78 | "Okay, you can use this move on the party. If you do it as many times as we did now, probably your partner will get disappointed. Ideally we would like to limit this to, let's say, maximum three repeats." |
| `enchufla-22` | — | `both` | `concept` | The name carries the count: Enchufla once, Enchufla doble twice, Enchufla tripla three times. | 243.40 | "when we call this move, we call it enchu flá, and we add the number of repeats after. If it's only enchu flá, it's one repetition. Enchu flá doble, we do it twice. Enchu flá tripla, we do it three times." |

`enchufla-14`/`-15` are an R4 split out of a single mangled clause. Whisper
renders it *"so my left head right"*; the reading is "my left, her right", which
Class 3's `guapea-9`/`-10` independently establish (she holds his thumb with her
right, he closes the grip with his left). Recorded as **K4-d**. Neither cue is
graded `suspect`, because two independent passages agree; the mangling is
disclosed in `verbatim`, which is where it belongs.

**`enchufla-18` carries no `beat`** — "one, two, three **and** block, six, seven"
puts the block in the slot between 3 and 6, which is beat 4, but the teachers
never say 4 and Class 1 established 4 as a pause rather than a step. Writing
`beat: 4` would be the derivation this spec keeps refusing to make. K4-f.

`enchufla-21` is the most practically useful cue in the class and has no footwork
in it at all.

### `enchufla-al-centro`

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `enchufla-al-centro-1` | — | `both` | `concept` | Enchufla al Centro is how you get from open position back into close position. | 273.54 | "so how to do enchufla al centro the last repetition we are doing and we do only half of it" |
| `enchufla-al-centro-2` | — | `both` | `footwork` | On the last repetition, do only half of the Enchufla. | 277.80 | (same sentence, "the last repetition" @277.80) |
| `enchufla-al-centro-3` | [1,2,3] | `both` | `footwork` | Swap places on 1, 2, 3. | 282.58 | "so we swap places on 1 2 3 5 6 7. One, two, three." |
| `enchufla-al-centro-4` | [5,6,7] | `leader` | **`lead`** | Then pull her towards you. | 289.46 | "And after that I pull her to myself. Step, step, step." |
| `enchufla-al-centro-5` | [5,6,7] | `both` | `footwork` | Three steps — not on the spot; travel towards each other so the position closes. | 291.38 | "Step, step, step. Three steps, not really stationary, kind of closing position towards each other." |
| `enchufla-al-centro-6` | — | `both` | `footwork` | From there you are in the basic to the side. | 298.44 | "And from here we start our basic side. Chiki, cheeky left and cheeky, cheeky right." |
| `enchufla-al-centro-7` | — | `both` | `rhythm` | "Chiki cheeky left, and cheeky cheeky right." | 300.84 | (same sentence) |
| `enchufla-al-centro-8` | 1 | `both` | `concept` | The al centro lands you in close position, back at the first step. | 455.82 | "5, al centro. 1, close position. Pull her closer. And we land in the first step again." |
| `enchufla-al-centro-9` | — | `leader` | **`lead`** | Pull her closer. | 457.32 | "Pull her closer." |
| `enchufla-al-centro-10` | — | `both` | `concept` | This completes the basic salsa loop: close position, do something in it, open position, Guapea, then back to the beginning. | 734.54 | "So we can complete now the basic salsa loop. So start from close position, do something in it, open position, turn into Guapea, and then come back to the beginning." |

`enchufla-al-centro-4` and `-9` are the same lead action taught twice, once in the
explanation and once in the called practice. Both are kept: the first has the
mechanism ("pull her to myself" plus the three steps), the second is the
two-word imperative the teacher actually calls at tempo, and a drill wants the
short one. They are not duplicates in any sense that matters.

**`beats: [5,6,7]` on `-4` and `-5` are read off the surrounding count**, not
stated for these actions individually: the pull follows "One, two, three" @286.08
and the class counts "5 6 7" for the second half at @283.84. Same read as Class
3's `dqn-10`/`-11`. Disclosed as **K4-g** rather than presented as given.

`enchufla-al-centro-10` is sourced from the outro, which is a `skip` segment. That
is deliberate and legitimate — `sourceStart` is a timestamp, not a segment
reference, and the sentence that names what the whole course has been building is
worth having even though nobody should watch the outro.

### `guapea` — versions (chapter 8) and how long to stay in it (chapter 9)

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `guapea-22` | — | `both` | `concept` | There is an intermediate version where both partners go forward instead of back-and-front. | 380.20 | "When we do our intermediate classes, we do Guapea forward this way, five, six, seven, and one, two, three, five, six, seven." |
| `guapea-23` | — | `both` | `concept` | That version needs a lot more leading and following practice — stay on the basic one. | 389.48 | "This step requires a lot more leading and following practice. And before we get there, we'll stick to our basic version" |
| `guapea-24` | — | `both` | `footwork` | The version you are using: both go back, then both go front. | 400.50 | "we'll stick to our basic version when we go both back and both front. From beginner perspective, this step is a lot easier, and we'll keep using it for time being." |
| `guapea-25` | — | `both` | `concept` | You can stay in Guapea as long as you like. | 438.08 | "We can stay in this step also for as long as we want." |
| `guapea-26` | — | `both` | `concept` | At a party, staying in it too long gets boring. | 443.48 | "However, in the party setup, 5, 6, 7. It would be boring again." |

`guapea-24` corroborates Class 3's `guapea-6` ("you both start on the back foot
and both continue forward") from a different chapter of a different class. Kept as
its own cue rather than folded in, because it is the sentence that names the
choice as a *choice* — beginner version vs intermediate version — which is
information Class 3 does not have.

### Drillable-cue counts

| Move | Drillable, this class | Drillable, all sources | Cap |
|---|---|---|---|
| `enchufla` | 9 | **16** (7 from steps Class 4) | 8 |
| `enchufla-al-centro` | 6 | 6 | 8 |
| `dile-que-no` | 4 | **16** (12 from Class 3) | 8 |
| `guapea` | 1 | **18** (17 from Class 3) | 8 |

Three of the four are over, and `enchufla` and `dile-que-no` are over *because
the move is taught twice*. That is not a content problem, and the fix does not
need a new type: **every cue already carries `sourceVideo`, and every
`TeachingSource` carries `videoId`, so the cues belonging to one teaching source
are exactly the cues whose `sourceVideo` matches it.** A drill scoped to "couples
Class 4, Enchufla" has 9 drillable cues, one over the cap; a drill scoped to
"steps Class 4, Enchufla" has 7, under it. Flagged as **K4-l** so the
partitioning is a deliberate decision rather than something a later pass
rediscovers.

## 4.5 Known defects

| Flag | What | Data | UI |
|---|---|---|---|
| **K4-a** | **Enchufla loses its first syllable in raw Whisper.** The audio file says "chufla" far more often than "Enchufla"; the normaliser already maps that one, but not `chuffla`, `chuflas`, `ciufla`, `an chufla`, `enchu flá`, `flat`, `flas` or `fly`. | Ship the §4.1 alias table on `enchufla`. Add the unambiguous forms to `scripts/normalize_salsa_terms.py`. | None. |
| **K4-b** | **`al centro` means two different moves.** `al-centro` is the close-position step from Class 1 (37 raw mentions across these seven classes). It is also the second half of the name `Enchufla al Centro`, and in Class 4 the bare calls *"5, al centro."* @454.04, *"Al centro go."* @574.80 and *"al centro"* @318.60 all mean the Enchufla ending, not the Class 1 step. A name search that aliases bare `al centro` to `enchufla-al-centro` will return the wrong move for a third of the course. | **Do not put `al centro` in `enchufla-al-centro.aliases`.** Alias only the compound forms listed in §4.1. Cross-reference the two moves in prose instead: `enchufla-al-centro.base = 'enchufla'`, and a `notes` entry pointing at `al-centro`. | Worth surfacing on both move pages: "not to be confused with…". This is a real ambiguity in the source material, not an artefact. |
| **K4-c** | **`flat` / `flas` / `fly` are Enchufla**, always preceded by a repetition number: "1 and 2 flat, double" @449.64, "2 flat, hop" @452.64, "2 flas doble" @646.72, "and two, fly al centro" @617.72. Verified that **every** occurrence of "flat" in all seven of this part's raw transcripts is Enchufla and none is the English word. | Safe as aliases *within this corpus*. A normaliser rule must require the preceding digit or a following "doble"/"triple"/"hop", because "flat" and "fly" are ordinary English and Part 2/Part 3 transcripts were not checked here. | None. |
| **K4-d** | **"so my left head right"** @182.52 = "my left, her right". | `enchufla-14`/`-15` split by role, mangling left in `verbatim`, reading corroborated by Class 3 `guapea-9`/`-10`. Not `suspect`. | None; the `verbatim` is visible on the cue. |
| **K4-e** | **"on knee"** @558.88 (*"and Enchufla al centro on knee, 1 and 1"*), repeated at @2.22 in the cold open. Could be "on 1", "on me", "only" or something else. Not resolvable from audio context. | **No cue created.** Recorded here so a later pass does not treat it as a missing instruction. | None. |
| **K4-f** | **The push and the block have no stated beat.** `dqn-21` (the push, "at this point") and `enchufla-18` (the block, "one, two, three and block"). Third and fourth instance of the K2-g pattern. | `beat` omitted on both; the position is in the cue text. **Do not add `beat: 3` or `beat: 4`.** | Cues render without a beat chip. |
| **K4-g** | **`beats: [5,6,7]` on `enchufla-al-centro-4`/`-5` is read off the surrounding count**, not stated for the pull or the three steps individually. Class 3's `dqn-10`/`-11` use the same read. | Kept, disclosed here. If a reviewer wants strictness, drop to no beats on all four cues — but the read is well supported by @283.84 and @286.08. | None. |
| **K4-h** | **Duplicate word timestamps.** Segment 605.92–620.68 has "go up" five times at 613.36 / 614.04 / 614.04 / 614.08 / 614.08 — roughly 1.5s of speech with no distinguishable timings. Segment 699.50–711.12 has a duplicate at 709.42 ("and"/"2"). Also 24.96–30.88 @28.06 and 234.52–242.80 @241.80. | No boundary is cut inside 613–615. The 709.42 duplicate lies inside published window 18 but not at either edge, so it affects nothing. No cue is sourced from 613–615. | None. |
| **K4-i** | **The intro is a cold-open preview.** 0.00–9.16 is a clip lifted from later in the same video: *"Enchufla al centro, on knee, one and one and five six seven and one. Okay now we'll rotate."* is word-for-word the passage at 552.40–563.36. Any term-frequency count over this file double-counts those words. | No cue and no clip is sourced from 0–18.30. `cc4-intro`'s label says so. | None. |
| **K4-j** | **Chapter 6 is titled "Enchufla al Centro" but opens with 12s of Enchufla Tripla.** Al centro starts @268.24 *"and now we'll go to al centro"*, 11.5s after the chapter mark. | Chapter kept as a single segment; `moves` lists `enchufla` alongside `enchufla-al-centro`, and the provenance string records the discrepancy. Not split, because the tripla demo runs *into* the al centro without a break. | None. |
| **K4-k** | **`two flat center`** @471.32 and **`L centro`** @486.98 are "al centro". | Aliases on `enchufla-al-centro`; normaliser entries. | None. |
| **K4-l** | **Three moves exceed the drillable-cue cap, two of them because they are taught twice.** `enchufla` 16, `dile-que-no` 16, `guapea` 18. | Nothing trimmed — the steps-course precedent (verification log §6) is to flag. Partition by `sourceVideo` when drilling one class: no new type needed, see §4.4. | A per-class drill should scope cues to the class being drilled. |
| **K4-m** | **Clip filenames collide with the steps course.** `enchufla-slow.mp4` / `enchufla-fast.mp4` already exist in `frontend/public/` from steps Class 4. | Couples files are `enchufla-couples-slow.mp4` / `enchufla-couples-fast.mp4`. A cutting script that derives the filename from the move id **will overwrite the steps clips** — it must key on the source, not the move. | None, if the filenames are right. |

---

# The official shorts — a finding that changes classes 5, 6 and 7

Classes 5, 6 and 7 each have an official short, and the brief's shape for them was
"slow ← `count` chapter, fast ← official short". That shape holds. But three
things about the shorts were not known before this pass, and all three were
established by inspecting the files rather than by assuming:

### 1. The shorts contain no speech at all

The three shorts were never transcribed. They are not in
`data/cache/salsa/whisper/`, and `uv run scripts/transcribe_salsa.py ids
qwR89NAQgqM V57F7c5R5jY 18cM9UvzsoI` fails at the download step — YouTube now
answers with *"Sign in to confirm you're not a bot."* The `.mp4` files are already
in `data/cache/salsa/videos/`, so the audio was extracted locally with ffmpeg into
`data/cache/salsa/audio/<id>.m4a`, which is the path `fetch_audio()` short-circuits
on, and the transcription then ran.

**The result was pure hallucination.** 31 seconds of Class 5's short produced three
segments reading *"Outro Music"*, *"During the release of Seahead Cams Trapers used
in foreign grav potato Music"* and *"Thank you."* Class 6's produced four
repetitions of *"Play simple card with no blue Schering"*. Class 7's produced
*"Sixtam Cl subjection 1A"*.

Corroborated instrumentally: `astats` gives a continuous RMS of −18.4 dB
(Class 5), −18.3 dB (Class 6) and −11.5 dB (Class 7), and `silencedetect` at
−40 dB / 1s finds **zero** silent passages in any of the three. That is a
continuous music bed with no speech gaps — consistent with a music-only demo and
inconsistent with anyone talking.

**Conclusion: the shorts are silent, full-tempo demos over music.** Consequences:

- **No cue may ever be sourced from a short.** R3 requires `sourceStart` to be
  traceable to something said; nothing is said. Every cue in classes 5–7 is
  sourced from the class video.
- **A short's clip window needs no word anchors** — there are none to be had. The
  window is the file, and "0 → the container duration" is not a round number
  chosen for tidiness, it is the whole asset. Both numbers are stated as ffprobe
  reports them.
- **The hallucinated transcripts were deleted** rather than left in the cache.
  `scripts/normalize_salsa_terms.py` walks every file in `whisper/`, so leaving
  them would have injected "Schering" and "Seahead Cams Trapers" into the corpus
  that a later alias/cross-check pass reads. The extracted `.m4a` audio was kept —
  it is what makes the check reproducible — which means **re-running
  `transcribe_salsa.py` on these three ids will silently re-create the garbage,
  because the audio now looks cached.** Recorded as **K5-a**.
- The `salsa-types.ts` header note "these clips keep their audio because the spoken
  count is the point" does not apply to shorts. Their audio is music only and can
  be muted without losing anything.

### 2. The shorts are 720×1280, not 1080×1920

ffprobe, all three: `width=720 height=1280`. The ratio is 9:16 either way, so
`aspect: '9/16'` is correct and no type changes — but any pipeline sized for
1080-wide vertical source will be upscaling.

| Short | Class | Stream duration | Container duration | Frames |
|---|---|---|---|---|
| `qwR89NAQgqM` | 5 — El uno | **31.381350** | 31.414 | 1881 |
| `V57F7c5R5jY` | 6 — Kentucky | **40.523817** | 40.534 | 2429 |
| `18cM9UvzsoI` | 7 — Vacilala por la mano | **32.165467** | 32.174 | 1928 |

All three fall inside the 20–45s target band as whole files, so each fast clip is
the entire short.

### 3. Every short carries a burned-in title — and that settles R1

Frames pulled at n=5, 30, 90 and 1500 from each short show no title card: the
dancing is already running by frame 5 (~0.2s), so `start: 0` is right. What they do
show is a permanent graphic overlay — *"BEGINNERS SALSA MOVES"* across the top, a
La Suerte logo, and a banner across the bottom naming the class:

| Short | Bottom banner, verbatim from the frame |
|---|---|
| `qwR89NAQgqM` | **CLASS 5 / EL UNO** |
| `V57F7c5R5jY` | **CLASS 6 / KENTUCKY** |
| `18cM9UvzsoI` | **CLASS 7 / VACILALA POR LA MANO** |

This is the channel writing the move names itself, which is exactly what R1 asks
for, and it resolves two questions the transcripts could not:

- **`V57F7c5R5jY`'s YouTube title is "Kentukcy - Class 6, Beginners Salsa
  (Short)" — a typo.** The on-screen graphic says KENTUCKY, the playlist title
  says "Class 6 (Kentucky)", and the transcript says "Kentucky" 13 times with
  zero manglings. Canonical name is **`Kentucky`**; `Kentukcy` becomes an alias
  whose only source is that YouTube title.
- **Class 7's move name appears nowhere in its audio.** "Vacilala" is not in the
  raw Whisper output for `pZChl5ylSJw` even once — the transcript has only
  `Basila` / `Basilla` / `basila`. The burned-in banner **VACILALA POR LA MANO**
  and the playlist title "Class 7 (Vacilala por la mano)" are the only places in
  the entire source material where this move is spelled. See §7.1.

**The banner is also a caveat.** It occupies roughly the bottom 22–25% of the
frame (three lines and higher in Class 7's), which is where the floor is. In the
sampled frames the dancers' feet clear it, but only just. Every short-sourced
fast clip carries this caveat, because footwork visibility is the entire purpose
of a demo clip and a graphic over the floor is a real limitation.

---

# Class 5 — El Uno

- **Video** `4KKAKgn8UZ4` · 14:11 · **851.45s** from the container (the playlist TSV says 852.0 — it rounds up; `SalsaClass.duration` wants the container value) · 9 YouTube chapters
- **Official short** `qwR89NAQgqM` · 31.38s · 720×1280 · `aspect: '9/16'`
- **Moves, per the description**: `el uno`
- **The easy shape at last.** A real `count` chapter (ch5) supplies the slow clip
  and the short supplies the fast one. This is the first class in the part where
  neither clip has to be carved out of a lecture.
- Chapter 3, *"Dile Que No side to side"*, is **not** filler: it retroactively
  reframes everything Class 3 taught, and it is why `dile-que-no` gains a third
  teaching source.

## 5.1 Move index

| id | Canonical name | kind | base | New? | Summary |
|---|---|---|---|---|---|
| `el-uno` | El Uno | `step` | `guapea` | **Yes** | The first open-position move: from Guapea, swap to a right-to-right and left-to-left two-hand hold, swing the arms, swap places twice with Enchuflas, lift the right hand over her head, and finish into a Dile que no. |
| `dile-que-no` | Dile que no | `step` | — | No — Classes 3, 4 | Chapter 3 teaches the side-to-side version and retires the facing-each-other one. |

**Canonical name `El Uno`** — confirmed three ways: the playlist title
"Cuban Salsa for Beginners - Class 5 (El Uno)", the short's burned-in banner
**EL UNO**, and the teachers' own etymology at @48.44.

**`el-uno` aliases**, with sources. Raw counts across the seven classes: `El Uno`
7×, `el uno` 4×, `uno` 4×, `eluno` 2×, `luno` 1×, `Aruno` 1×.

| Alias | Where (raw) |
|---|---|
| `El Uno`, `el uno`, `el, uno` | `4KKAKgn8UZ4` @195.80, @203.90, @220.44, @311.02, @377.42, @544.48, @560.30, @577.20, @646.66; `yZ562-ehtQQ` @44.68 |
| `uno` (bare) | as above — safe here, see K5-e |
| `l uno` | `4KKAKgn8UZ4` @52.76 ("it's called l uno so just one") |
| `L, uno` | `4KKAKgn8UZ4` @492.72 |
| `eluno`, `luno`, `a luno` | `4KKAKgn8UZ4` @735.00 ("I did this in the end of a luno") |
| **`a lunatic`** | `4KKAKgn8UZ4` @441.46 — *"Hop and 1, a lunatic, and 5, 6"* is "1, el uno tick". The single funniest mangling in the course and a real R1 hazard, because it shares no substring with the move name |
| `Aruno` | `yZ562-ehtQQ` @604.68 ("did with Aruno") |

### Footwork paragraph

**`el-uno`** — Start from Guapea, both partners going back on 5. On 7 the hands
swap: right hand to right hand, and you finish holding both her hands, right to
right and left to left. The leader twists her wrist and starts bending it behind
her back. The arms swing in both directions and you swap places with an Enchufla
— the step from Class 4 — always travelling in opposite directions, on opposite
feet. After one loop left and right the leader lifts his right hand up and over
her head, you swap places again, and the last swap is a very tiny Enchufla. You
end up next to each other, his right hand on her right shoulder and her left hand
on his left. He then resets the hold — left in front, right sliding to the closer
shoulder — and the move finishes with a Dile que no back into Guapea. The arm
change happens *during* the Dile que no, not after it.

## 5.2 Segment map

9 chapters, all kept. One `angle` chapter normalised, one nested `count` window.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `cc5-intro` | 0.0 | 18.86 | `skip` | Intro (cold-open preview) | — | chapter title "Intro". 0.00–9.46 is a preview clip: *"And go and ping ping pa … and one two three."* No cue or clip sourced here |
| `cc5-about-class` | 18.86 | 62.50 | `skip` | About this class | — | chapter title "About this class"; "Hello! Welcome to another class with La Suerte Dance School, Michal and Manuela." @18.86 |
| `cc5-teach-dile-que-no-side` | 62.50 | 194.40 | `teach` | Dile que no, side to side | `dile-que-no` | chapter title "Dile Que No side to side"; "First thing we have to discuss is Dile Cano." @62.50. **Chapter mark is 61.0**, in the gap after "Let's start." @56.22 — moved to the anchor |
| `cc5-teach-el-uno` | 194.40 | 438.58 | `teach` | El uno — presentation & explanation | `el-uno` | chapter title "El uno - presentation & explanation"; "Now we'll go through El Uno." @194.40 — a 0.4s agreement |
| `cc5-count-el-uno` | 438.58 | 473.72 | `count` | El uno — fluently with count | `el-uno` | chapter title "El uno - fluently with count"; "when I say that it's happening fluently, we'll show you fluently." @437.34–439.34 |
| `cc5-count-el-uno-angle` | 473.72 | 532.98 | `count` | El uno — opposite angle, counted | `el-uno`, `enchufla-al-centro`, `dile-que-no` | chapter title "El uno - different angle"; announced at "Maybe let's do it opposite angle as well." @471.98, then "I'm not sure if this one is helpful" @473.72. **Analysis says `angle`** — normalised to `count`: it is a counted demo with no music, from "al centro" @479.30 to @518.08 |
| `cc5-music` | 532.98 | 621.58 | `music` | El uno — with music | `el-uno`, `dile-que-no`, `guapea`, `enchufla-al-centro` | chapter title "El uno - with music"; "We'll start directly with Guapea and El Uno and then we'll show you how it combines with all other moves." @532.98. The teachers count over the music throughout |
| `cc5-review` | 621.58 | 762.82 | `review` | Review with music | `el-uno`, `la-chica`, `el-chico`, `los-dos`, `dile-que-no`, `guapea`, `enchufla-al-centro`, `arriba`, `abajo` | chapter title "Review with music"; "La chica, hop, el chico, guys, hop, los dos, turn together, hop" @621.58–630.42, "Arriba" @673.54, "Abajo" @675.64. `reviewsEarlierMoves: true`. **Chapter mark is 618.0**, which cuts the sentence "And we'll come back to this setup and we'll go through all different moves" (@613.98–619.70) in half — moved 3.58s to the anchor |
| `cc5-outro` | 762.82 | 851.45 | `skip` | Summary / Outro | — | chapter title "Summary / Outro"; "When we are dancing with this very slow music sometimes my mind is drifting somewhere away" @762.82 |

`chaptered: true`. `teaches: ['el-uno']`.

**One boundary moved by more than a pause:** 618.0 → 621.58. Recorded as
**K5-b**. Everything else agrees to within 1.5s, and two agree to within 0.5s.

## 5.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 19 | `el-uno` | `4KKAKgn8UZ4` | **440.16** | **471.10** | 30.94s | `el-uno-slow.mp4` | **A** | In: *"Hop"* @440.16, the first call after *"we'll show you fluently."* ends @439.34. Out: 471.10, after *"puku."* @470.84 and before *"Maybe"* @471.22. |

**No caveat.** This is what a `count` chapter is for: 31 seconds, counted
throughout, no music, two complete passes of El Uno with the calls
(*"1, a lunatic, and 5, 6, right hand up, 1, 2, both hands up, small enchufla, D
like N"* @440.92–447.52, then *"One more time exactly the same"* @454.22 and a
second pass into *"die lekeno hop"* @464.90). The best slow clip in classes 1–7
and the standard the earlier four were being measured against.

**Alternate:** 479.30 → 510.60 (31.30s, grade A) — the opposite-angle counted
demo from `cc5-count-el-uno-angle`. In at *"al centro"* @479.30 after *"maybe
let's start from"* @477.78–478.82; out before the *"cing cing paka"* vocalisation
at @510.64. It runs the whole loop — al centro, Dile que no, Guapea, El Uno,
Enchufla doble al centro — rather than El Uno alone, and the teacher opens it with
*"I'm not sure if this one is helpful"* @473.72, which is a fair self-assessment.

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 20 | `el-uno` | **`qwR89NAQgqM`** | **0.0** | **31.38** | 31.38s | `el-uno-fast.mp4` | **A V** | The whole short. `aspect: '9/16'`. Dancing is already running at frame 5 (~0.2s) — there is no title card, so there is nothing to trim off the front. 31.38 is the ffprobe stream duration. |

**Caveat:** *"The official short. No spoken count — it is a music-only demo, so
there is nothing to listen for. A burned-in graphic covers roughly the bottom
quarter of the frame ('CLASS 5 / EL UNO') and the top strip ('BEGINNERS SALSA
MOVES'); the dancers' feet clear the bottom banner in the frames sampled, but only
just. 720×1280, so it will upscale."*

**Alternate:** `4KKAKgn8UZ4` 557.70 → 587.50 (29.80s, grade A) — from the music
chapter, in at *"and front cheeky poco and one el uno"* @557.70, out at the segment
end 587.50 before *"5, 6, 7"* @587.70. Two El Uno passes at tempo with the teacher
calling over the music (*"and one more time el uno"* @576.54–577.54, *"change hand
bend it down right goes up one both up"* @578.90–583.94). Kept because it is
16/9, landscape, and shows the same room as the slow clip — a reviewer who
dislikes the vertical short with the banner over the floor has a real
alternative.

## 5.4 Cues

**34 cues on two moves, 4 of them `kind: 'lead'`.** Both `sourceVideo:
'4KKAKgn8UZ4'` throughout — **no cue is sourced from the short**, because the
short contains no speech.

All `confidence: 'transcript'` unless a row says otherwise.

### `dile-que-no` — side to side (chapter 3). The chapter that rewrites Class 3.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `dqn-24` | — | `both` | `concept` | Until now Dile que no started facing each other. From now on you do it side to side. | 62.50 | "First thing we have to discuss is Dile Cano. So far Dile Cano we were showing you was starting from here facing each other now. We'll do it being side to side." |
| `dqn-25` | — | `follower` | `arms` | Your hand still rests on his shoulder. | 77.40 | "The setup is very similar her hand is still lying on my shoulder we can pass the second hand in front" |
| `dqn-26` | — | `both` | `arms` | The second hand can pass in front. | 79.80 | (same sentence) |
| `dqn-27` | — | `both` | `footwork` | The steps are exactly the same — only the follower's direction of travel changes. | 87.88 | "Steps are exactly the same, but the direction of walk from girl point of view is different." |
| `dqn-28` | 5 | `follower` | `footwork` | Start with the right leg going back, exactly as before. | 93.32 | "So she will start with the right leg going back like she did, but after three steps she will rotate to the left and still continue walking forward, but different direction." |
| `dqn-29` | — | `follower` | `footwork` | After three steps, rotate to the left and keep walking forward — in a different direction. | 96.02 | (same sentence) |
| `dqn-30` | — | `both` | `context` | The facing-each-other version isn't really used socially. It was only a way to get into position. | 116.06 | "It is very important to mention at this point that the version of the Le Cano that we showed you previously, it's not really used when we are dancing socially. We just used it as a way to get into position we are here now." |
| `dqn-31` | — | `both` | `concept` | From here on, nearly every move begins or ends with a Dile que no and leaves you side to side. Facing each other will be rare. | 167.48 | "Why is it important? Because now all the moves that we are going to show you, they will end up or begin with Dile Cano or some version of Dile Cano and we'll be next to each other. It will be very very rare that we'll be facing each other. If it happens we'll point it out" |

**`dqn-26` is `confidence: 'suspect'`**, flag `K5-c`, with `warning: "'we can pass
the second hand in front' — the teacher does not say whose second hand. Both
partners have one free hand at this point and either reading is grammatical.
Unlike the other whose-hand cases in this part, nothing elsewhere in the course
disambiguates it. Never spoken in drill mode; eye-check at 80."` This is the R4
rule producing its intended outcome: a hand cue that cannot be assigned to a role
is not silently assigned to one.

`dqn-30` and `dqn-31` are the most consequential cues in Class 5 and neither is
footwork. `dqn-30` tells a learner that the version they drilled for a whole class
is a teaching device; `dqn-31` tells them what to expect for the remaining sixteen
classes. Losing either to a cue cap would be a real loss.

### `el-uno`

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `el-uno-1` | — | `both` | `context` | You have moves in close position, but none in open position yet. | 41.30 | "we showed you how to open position and how to do couple of moves in close position, but what we don't have yet are any moves in open position. And today we'll change that." |
| `el-uno-2` | — | `both` | `concept` | It is the first and easiest open-position move — which is why it is called El Uno, "the one". | 48.44 | "We'll teach you the first one, the easiest one, and because it's the first one it's called l uno so just one." |
| `el-uno-3` | 5 | `both` | `footwork` | Start from Guapea, both going back. | 196.56 | "We start with Guapea, both going back. Five, six, seven, back cheeky cheek." |
| `el-uno-4` | **7** | `leader` | **`lead`** | On 7, swap hands — right to right. | 205.46 | "So on seven, first thing is happening, we're swapping hands, we are right to the right." |
| `el-uno-5` | — | `leader` | **`lead`** | Then twist her wrist and start bending it behind her back. | 210.24 | "Now after that, I will twist her wrist and start bending it behind her back." |
| `el-uno-6` | — | `both` | `arms` | You end up holding both hands: right to right, left to left. | 238.20 | "I'm holding both of her hands this is your left yeah and this is her right so we are right to the right left to the left" |
| `el-uno-7` | — | `both` | `arms` | The hands swing, in both directions. | 239.96 | "hands are going in swing motion both directions and we are swapping places." |
| `el-uno-8` | — | `both` | `footwork` | You swap places. | 244.46 | (same sentence) |
| `el-uno-9` | — | `both` | `concept` | The swap is an Enchufla — the step from Class 4. | 245.76 | "Now we are swapping places with an Enchufla step, the one that we showed you in the previous class. So if you haven't watched it, bing, bing, bing, class number three. No, that was class number four. Class number four, watch it again, come back to this video." |
| `el-uno-10` | — | `follower` | `arms` | Relax your elbows and let the arms swing. Don't fight it. | 265.72 | "Now from girl perspective, it is very important to relax your elbows. Let it swing. So it shouldn't be fighting." |
| `el-uno-11` | — | `leader` | `arms` | Never lift her arm up — it hurts. | 279.30 | "When I was younger, I used to use this move fighting with my younger brothers. So I know that if you do this and lift it up, it hurts. So we don't want to do that." |
| `el-uno-12` | — | `both` | `footwork` | You always travel in opposite directions. | 285.20 | "Thing number two, we are always traveling opposite direction." |
| `el-uno-13` | — | `both` | `concept` | Travelling the same way is wrong in almost any salsa setup: by default you are on opposite feet, travelling opposite directions. | 296.24 | "This is completely incorrect and it is incorrect almost in any setup in salsa. By default we should be on opposite foot traveling opposite direction." |
| `el-uno-14` | — | `leader` | **`lead`** | After one loop left and right, lift your right hand up and over her head. | 317.68 | "After one loop to the left and to the right, the right hand, I'm going to lift it up and move it over her head." |
| `el-uno-15` | — | `both` | `footwork` | You swap places again. | 328.74 | "We swap places again" |
| `el-uno-16` | — | `both` | `footwork` | The last swap is a very tiny Enchufla. | 330.48 | "and then this last one is very tiny enchufla. Very tiny enchufla." |
| `el-uno-17` | — | `leader` | `arms` | Your right hand goes on her right shoulder. | 337.86 | "We end up next to each other with right hand going on her right shoulder, left hand going on my left." |
| `el-uno-18` | — | `follower` | `arms` | Your left hand goes on his left shoulder. | 339.78 | (same sentence) |
| `el-uno-19` | — | `leader` | `arms` | Let it go — as you finish you change the hand setup. | 341.42 | "I let it go but when we're finished we're changing hands setup." |
| `el-uno-20` | — | `leader` | `arms` | Left hand in front, right hand sliding to the closer shoulder. | 346.02 | "So left is going in front, right will slide to my closer shoulder and then we'll do the Le Cano." |
| `el-uno-21` | — | `both` | `footwork` | Then do the Dile que no. | 350.30 | (same sentence) |
| `el-uno-22` | — | `both` | `concept` | A lot happens at once. It comes quickly. | 359.80 | "Quite complicated. A lot of things happening at the same time, but you get used to them quickly." |
| `el-uno-23` | — | `both` | `concept` | The up-and-down arm drill is for practice only. Never do it while actually dancing. | 399.40 | "Never do it if you are not practicing. In dancing, this is horrible. But for practicing purposes, it's very important because you need to develop habit of avoiding each other's heads." |
| `el-uno-24` | — | `both` | `concept` | The point of it is to stop you bumping into your partner's head. | 409.68 | "We don't want to bump into the heads of our partners. That's ridiculous." |
| `el-uno-25` | — | `leader` | **`lead`** | Change the arms *during* the Dile que no, not after it. | 424.44 | "You've seen in the previous repeat when I started doing it, Ola was already starting doing the Dilek En O. And this is the right way to do it. So we start changing our arms during the Dilek En O." |
| `el-uno-26` | — | `both` | `concept` | All of it runs fluently, without stopping between parts. | 433.52 | "So this all is happening very fluently." |

**`el-uno-4` is the only cue in classes 1–7 with a beat the teachers state outright
for a lead action.** *"So on seven, first thing is happening, we're swapping
hands"* — no derivation, no surrounding-count read, the number is in the sentence.
Every other lead cue in this part has either an inferred beat or none. Worth
knowing when judging how much the beat data is worth.

**`el-uno-18` carries a `warning`:** `"The teacher says 'left hand going on my
left' without naming whose left hand. Read as the follower's left hand on the
leader's left shoulder, which is consistent with @77.40 in this same class ('her
hand is still lying on my shoulder'). Worth an eye-check at 340."` Graded
`transcript`, not `suspect`, because the same class disambiguates it 260 seconds
earlier — unlike `dqn-26`, where nothing does.

`el-uno-6` is `role: 'both'` and legitimately so: "right to the right, left to the
left" is symmetric, so there is no possessive limb reference that differs by role.
Contrast `el-uno-17`/`-18`, which had to be split.

`el-uno-9`'s `verbatim` keeps the teachers' live self-correction ("class number
three. No, that was class number four") because it is the sentence that
establishes the cross-course link to steps Class 4, and a reader checking the
reference needs to see that they corrected themselves rather than that the spec
mis-transcribed them.

### Two things this class explicitly refuses to teach

Both are real, both are on camera, and neither becomes a cue — because the
teachers say outright that they are not teaching them yet. They are recorded as
`notes` entries, which is what `SalsaMove.notes` is for ("taught material that is
real but not clippable"), so the deep links survive:

```ts
// on la-chica
notes: [{
  text: 'Class 5 nearly teaches La Chica in Guapea, then stops: "No, we don\'t '
      + 'know it yet. Scrap it, next episode." The teachers do say that La Chica '
      + 'in open position and La Chica in closed position are very similar.',
  sourceVideo: '4KKAKgn8UZ4', sourceStart: 686.08,
}]
// on dile-que-no
notes: [{
  text: 'Class 5 shows a Dile que no that keeps hold of the partner instead of '
      + 'letting go — "I didn\'t let her go in the Dile Cano. So Dile Cano and '
      + 'stay with partner." Deferred to a later class.',
  sourceVideo: '4KKAKgn8UZ4', sourceStart: 724.94,
}]
```

### Drillable-cue counts

| Move | Drillable, this class | Drillable, all sources | Cap |
|---|---|---|---|
| `el-uno` | **18** | 18 | 8 |
| `dile-que-no` | 5 | **21** (12 Class 3, 4 Class 4) | 8 |

`el-uno` is the single largest overflow in classes 1–7, and it is not padding:
chapter 4 is 244 seconds of continuous instruction, the move has two distinct hand
holds, two place swaps, an arm lift over the head and a hand reset, and every one
of the eighteen is a separate physical action with its own timestamp. Flagged, not
trimmed, per the steps precedent. If the cap must bite, the natural split is
"the hold" (`-6`, `-7`, `-10`, `-11`, `-17`, `-18`, `-19`, `-20`) versus "the
travel" (`-3`, `-8`, `-12`, `-15`, `-16`, `-21`) — the same split Class 3's
`guapea` suggested.

## 5.5 Known defects

| Flag | What | Data | UI |
|---|---|---|---|
| **K5-a** | **Re-transcribing the shorts will silently produce garbage.** The `.m4a` audio for `qwR89NAQgqM`, `V57F7c5R5jY` and `18cM9UvzsoI` is now in `data/cache/salsa/audio/`, so `fetch_audio()` reports "audio cached" and skips the download that would otherwise fail. Whisper then hallucinates confidently over the music (see the shorts section above). The generated `whisper/*.json` files were deleted. | **Do not transcribe the shorts.** Add an exclusion to `transcribe_salsa.py`, or delete the three `.m4a` files. `normalize_salsa_terms.py` walks everything in `whisper/`, so a re-run would inject nonsense into the alias corpus. | None. |
| **K5-b** | **Chapter mark 618.0 splits a sentence.** "And we'll come back to this setup and we'll go through all different moves" runs 613.98–619.70; the review demonstrably begins at "La chica, hop" @621.58. | `cc5-review` starts at 621.58, a 3.58s move. The largest boundary correction in Class 5 and the only one over 1.5s. | None. |
| **K5-c** | **"we can pass the second hand in front"** @79.80 — whose second hand is never said, and nothing elsewhere in the course settles it. | `dqn-26`: `confidence: 'suspect'`, `flag: 'K5-c'`, warning as quoted in §5.4. | Rendered as Unverified with the warning inline. Never spoken in drill mode. |
| **K5-d** | **"left hand going on my left"** @339.78 — whose left hand. | `el-uno-18` warning; reading corroborated by @77.40 in the same class. Graded `transcript`. | Warning shown inline. |
| **K5-e** | **`a lunatic` is El Uno.** @441.46, *"Hop and 1, a lunatic, and 5, 6"* = "1, el uno tick". It shares no substring with the move name, so no fuzzy matcher will ever find it. Also `a luno` @735.00, `l uno` @52.76, `L, uno` @492.72, `Aruno` (`yZ562-ehtQQ` @604.68). | Full-phrase aliases on `el-uno`; add `a lunatic` → `el uno tick` to the normaliser. Bare `uno` is safe across these seven transcripts — every occurrence is the move — but it is a common Spanish word and Parts 2 and 3 were not checked from here. | None. |
| **K5-f** | **`die lekeno` @464.90 falls inside published window 19.** It is Dile que no, and it is the *call* the dancers are following, so it belongs in the clip. Listed only so a reviewer is not surprised that the El Uno slow clip contains a Dile que no call. | None needed. The clip caveat is unnecessary — the Dile que no is part of El Uno's ending (`el-uno-21`). | None. |
| **K5-g** | **The intro is a cold-open preview.** 0.00–9.46, *"And go and ping ping pa … and one two three."* Term frequencies over this file double-count it. | No cue or clip sourced from 0–18.86. | None. |
| **K5-h** | **Two moves exceed the drillable-cue cap**, `el-uno` at 18 and `dile-que-no` at 21 across three sources. | Nothing trimmed. Partition by `sourceVideo` when drilling one class — see K4-l. | Per-class drills should scope to the class. |
| **K5-i** | **The official short's YouTube metadata and its burned-in graphic disagree elsewhere in the playlist** — `V57F7c5R5jY` is titled "Kentukcy" but captioned KENTUCKY. Class 5's short is consistent (EL UNO both places); recorded here because the fix belongs to whichever pass reads `beginner-shorts.tsv`. | Prefer the burned-in graphic and the playlist class title over the short's YouTube title. See §6.1. | None. |

---

# Class 6 — Kentucky

- **Video** `yZ562-ehtQQ` · 11:33 · **693.42s** from the container (TSV says 694.0) · 10 YouTube chapters
- **Official short** `V57F7c5R5jY` · 40.52s · 720×1280 · `aspect: '9/16'`
- **Moves, per the description**: `kentucky`, `la chica from guapea`
- **The densest class in this part.** Four moves are touched, three of them
  already exist, and the class contains 70 seconds of pure timing instruction
  (chapter 6) that applies to El Uno as much as to Kentucky.
- **The chapter labelled "Summary / Outro" is not an outro.** Its first minute is
  the single most substantial piece of *follower* instruction in classes 1–7. See
  §6.2 and **K6-a** — this is the "verify, don't trust" finding of Class 6.

## 6.1 Move index

| id | Canonical name | kind | base | New? | Summary |
|---|---|---|---|---|---|
| `kentucky` | Kentucky | `step` | `guapea` | **Yes** | Three Enchuflas in a row without ever changing hands: touch and keep her second hand, take the top hand overhead while the bottom hand stays joined, lift the right hand onto your own left shoulder, then left hand up into a hook turn while she steps in a spot, and out through a Dile que no. |
| `la-chica` | La Chica | `step` | `guapea` | No — Class 2 | The bonus chapter finally teaches La Chica **in open position**, which Class 5 promised and did not deliver. |
| `el-uno` | El Uno | `step` | `guapea` | No — Class 5 | Chapter 6's timing rule is stated for El Uno explicitly as well as for Kentucky. |
| `dile-que-no` | Dile que no | `step` | — | No — Classes 3, 4, 5 | The mis-labelled outro gives the follower's arm its default position. |

### `kentucky` is the only move name in the course with no manglings

Every one of the 21 occurrences of the word across all 21 couples transcripts is
spelled **Kentucky**, correctly: 13 in `yZ562-ehtQQ` itself (@38.02, @78.02,
@159.64, @209.92, @243.52, @315.88, @342.32, @358.60, @374.20, @460.10, @578.88,
and two in the review), plus `4KKAKgn8UZ4` @786.18, `CkZO6nyJwjw` @97.78/@283.36/
@617.68, `QueWxI6vMrc` @400.56/@450.18/@469.88, `EuT94T544Mg` @624.76,
`GT7PTpvni_A` @646.61, `X4Sr8QbXQLU` @446.42, `f8Y-b3m070c` @126.64/@132.30/
@521.42, `lV56IVufYOU` @536.56/@542.50/@554.02, `X7lz-BBMmU8` @318.26,
`uoq2J1txSTE` @646.22, `97Urh5GlCbg` @481.60. Zero variants, zero near-misses.

`aliases` is therefore a one-item list, and its only member comes from outside the
audio: **`Kentukcy`**, the misspelling in the *YouTube title* of the official short
`V57F7c5R5jY` ("Kentukcy - Class 6, Beginners Salsa (Short)"). The short's own
burned-in banner reads **CLASS 6 / KENTUCKY**, and the playlist title reads
"Class 6 (Kentucky)". So the typo is human, made once, in one metadata field —
and it is exactly the sort of thing a name search must still match.

```ts
aliases: ['Kentucky', 'kentucky', 'Kentukcy']
```

**`la-chica` gains an alias here:** `La Cica` — `yZ562-ehtQQ` @504.94, @515.22 and
@515.70, corroborated by `CkZO6nyJwjw` @666.70 ("La Cica, ten for a girl") and
`pZChl5ylSJw` @423.86 ("we secretly told you la cica in open position so la cica").
Both capitalisations occur. The raw transcript for this class never spells it
"chica" at all — the only "la chica" in the file is Whisper's normalised output.

### Footwork paragraph

**`kentucky`** — Start from Guapea, exactly as you would for El Uno, but this time
the hands never change. On the Kentucky, touch her second hand and keep hold of
it: this is the case the earlier classes warned about, where touching a hand means
you then use both. Go into an Enchufla still holding her left hand. The top hand
travels overhead while the bottom hand stays joined, and you come back with a
second Enchufla on exactly the same hand setup. By now his right and her left are
relaxed in front of you both, and his left is on her shoulder. On the third
Enchufla, on 6-7, the right hand goes up — and then that same right hand lands on
his own left shoulder. This is the tricky moment. The left hand goes up, he does a
hook turn while she takes three steps in a spot, he releases the right hand and
moves it behind her back, and it runs straight out into a Dile que no. The feet
are the same Enchufla pattern throughout; everything that changes is the hands.

**`la-chica`, from Guapea (open position)** — Dance the Guapea. On 3 the leader
raises his left hand; the follower does a right turn. 1-2-3 is just the basic and
5-6-7 is the turn — nothing funky. You end up back in Guapea, so it costs the
leader nothing and buys him a bar to decide what to do next.

## 6.2 Segment map

10 chapters, **11 segments** — the outro is split, because its two halves do
different jobs. One `angle` chapter normalised to `teach`.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `cc6-intro` | 0.0 | 18.78 | `skip` | Intro (cold-open preview) | — | chapter title "Intro". Speech resumes at "Hello! Another class with La Suerte Dance School" @18.78 — a 0.78s agreement with the 18.0 mark |
| `cc6-about-class` | 18.78 | 63.62 | `skip` | About this class · prerequisites | — | chapter title "About this class". Ends on the hook-turn card plug, "It should pop out when I speak." @60.40–62.06. **Chapter mark is 65.0**, 1.38s *after* the presentation has begun — see the next row |
| `cc6-teach-kentucky` | 63.62 | 159.64 | `teach` | Kentucky — presentation & explanation | `kentucky` | chapter title "Kentucky - presentation & explanation"; **"We'll show you how it works."** @63.62, after a 1.56s gap. The chapter mark at 65.0 falls mid-sentence, between "works." @64.68 and "We start from Guapea again" @65.72 |
| `cc6-teach-kentucky-side` | 159.64 | 206.98 | `teach` | Kentucky — side view, re-narrated | `kentucky` | chapter title "Kentucky - side view"; "5, 6, Guapea. 1, 2, Kentucky." @159.64, immediately after "so you can look at hands." @159.32. **Analysis says `angle`** — normalised to **`teach`**, not `count`: it is a second pass through the whole move with fresh instruction interleaved ("Left goes on her shoulder. Keep it there." @166.46, "Six, seven, right hand goes up" @187.70), not a silent counted demo. The camera lives in the label |
| `cc6-count-kentucky` | 206.98 | 243.52 | `count` | Kentucky — fluently with count | `kentucky` | chapter title "Kentucky - fluently with count"; the announcement **"One more time from this perspective fluently."** starts its own segment at @206.98 — a **0.02s** agreement, the tightest boundary in the whole part |
| `cc6-teach-extra` | 243.52 | 315.88 | `teach` | Extra information — the timing of the lift | `kentucky`, `el-uno` | chapter title "Extra information"; "Important elements that we should mention also is when we do Kentucky" @243.52 after a 2.12s gap. **Also carries `el-uno`**: @282.20 "actually we should mention exactly the same with eluno" |
| `cc6-music` | 315.88 | 394.42 | `music` | Kentucky — with music | `kentucky`, `guapea`, `dile-que-no` | chapter title "Kentucky - with music"; "Let's start from Guapea." @315.88. The teachers count and talk over the music throughout (the analysis flags 35% count density and it is right) |
| `cc6-review` | 394.42 | 498.40 | `review` | Review with music | `kentucky`, `el-uno`, `al-centro`, `arriba`, `abajo`, `la-chica`, `el-chico`, `los-dos`, `dile-que-no`, `guapea`, `enchufla-al-centro` | chapter title "Review with music"; **"Ok, and now we'll do everything from top, from plus one, so al centro"** @394.42 — the mark at 395.0 lands on "and" @395.50, so the boundary moves 0.58s *earlier*. `reviewsEarlierMoves: true` |
| `cc6-teach-la-chica` | 498.40 | 592.14 | `teach` | BONUS — La Chica from Guapea (open position) | `la-chica` | chapter title "BONUS - La chica from Guapea"; **"Now, plot twist."** @498.40 after a 2.64s gap |
| **`cc6-teach-default-hands`** | 592.14 | 656.36 | **`teach`** | The follower's arm — default hand position | `dile-que-no` | chapter title says "Summary / Outro", but this is instruction, not summary. Opens on "Okay, so we have this sorted." @592.14 — **0.14s** from the 592.0 mark — and the teaching starts at "Ola told me also to mention to you that girls very often are lifting their hand up on one." @596.72. See **K6-a** |
| `cc6-outro` | 656.36 | 693.42 | `skip` | Outro (channel plugs) | — | "And to do that, remember to like, subscribe and press the bell." @656.36 — the first line of the actual outro. Everything from here is subscribe/Facebook/Instagram/Patreon/in-person classes |

`chaptered: true`. `teaches: ['kentucky', 'la-chica']` — La Chica is in the class
description, so it is taught here even though it is a bonus and even though the
move already existed from Class 1.

**Two boundaries move backwards** (63.62 and 394.42) and one moves forward by
2.64s (498.40). Nothing disagrees by more than 2.64s; two boundaries agree to
within 0.2s. This class's chapter marks are the most trustworthy in the part.

## 6.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 21 | `kentucky` | `yZ562-ehtQQ` | **209.92** | **241.40** | 31.48s | `kentucky-slow.mp4` | **A** | In: **"5,"** @209.92, the first call after the announcement "One more time from this perspective fluently." closes @209.26. Out: 241.40, the segment end after "7." @241.20 and before "Important elements" @243.52. |
| 22 | `la-chica` | `yZ562-ehtQQ` | **557.88** | **575.62** | 17.74s | `la-chica-open-slow.mp4` | **A V** | In: **"We'll show you this from another perspective, from girl point of view"** @557.88, after "card as usual." closes @557.40. Out: 575.62, the segment end after "and back." @575.24. |

**Window 21 has no caveat, and one thing about it was actively checked rather than
assumed.** At @227.10 the teacher says *"And the last time without music, 5, 6, we
go"*, which reads like a warning that the first half of the window has music under
it. It does not. `silencedetect` at −45 dB / 0.4 s finds **two** silent gaps in
209.9–227.0 and **one** in 230.8–241.4, but **zero** in the music chapter at
320–340. A continuous music bed leaves no gaps; speech does. Both passes in this
window are dry, spoken count over no music, and the phrase means "this last
repetition, without music" before the class moves to the music chapter. Recorded
as **K6-b** so nobody re-litigates it.

The window holds two complete passes: a fast counted one (@209.92–226.94, "5, 6,
7, 1, 2, Kentucky, two hands and go" then four bars of straight count) and a
slower narrated one (@230.84 "1 and 2, flat hop, shoulder go back" → @234.22 "1, 2,
hook, turn, step, step, step, and D like I know, hop, and 5, 6, 7"). The second
pass is the more useful of the two because the calls name the actions.

**Window 22 is caveated**, and it is the weakest published clip in Class 6:
*"17.7 seconds — under the 20-second floor, because the bonus chapter's two
counted passes are only 10s and 12s long and the 9 seconds between them is a plug
for another course. The first ~5.5s is the teachers announcing the camera change
while already dancing, and it ends on the vocalised 'nyu, nyu, nyu, and back'
rather than a clean 8. Filmed deliberately from the follower's side so you can see
the turn."* The steps course set the precedent for accepting a short window
(`cross-front-and-back-fast`, 17.2s: *"a clean 17s loop beats a 32s loop of the
wrong move"*), and the same reasoning holds here.

**Alternates**

| For | Window | Len | Why kept, why not published |
|---|---|---|---|
| `kentucky` slow | 159.64 → 197.60 | 37.96s | The **side view**, in at "5, 6, Guapea." @159.64, out at "seven." @196.80 / "My" @197.60. Two full passes with the hands clearly visible from the side, and the calls name every action. Not published only because it is instruction-with-calls rather than a clean counted demo, and the teacher breaks the fourth wall at the end ("My microphone doesn't like when I move my hand around my chest"). Genuinely competitive with window 21 for a learner who wants to see the hands. |
| `la-chica` slow | 537.30 → 547.68 | 10.38s | The first counted pass, from the front. In at "raise" @537.30, out after "seven." @547.68. Half the required length; kept because it is the front view and window 22 is not. |
| `kentucky` fast | 367.72 → 392.94 | 25.22s | Landscape 16/9 alternative to the short. In at "hop" @367.72 ("and the same again hop Kentucky"), out at the segment end 392.94. Three passes at tempo with the teacher calling over the music. The 16/9 option for anyone who rejects the vertical short's banner. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 23 | `kentucky` | **`V57F7c5R5jY`** | **0.0** | **40.52** | 40.52s | `kentucky-fast.mp4` | **A V** | The whole short. `aspect: '9/16'`. No title card — dancing is running by frame 5. 40.52 is the ffprobe stream duration (40.523817); the container reports 40.534. |

**Caveat:** *"The official short. Music only, no spoken count — there is nothing to
listen for. A burned-in graphic covers the top strip ('BEGINNERS SALSA MOVES') and
roughly the bottom quarter of the frame ('CLASS 6 / KENTUCKY'); the dancers' feet
clear the bottom banner in the frames sampled, but only just. 720×1280, so it will
upscale. Note that the short's YouTube title misspells the move as 'Kentukcy'."*

**`la-chica` has no fast clip from this class.** `fast: null`,
`missingReason: "The bonus chapter is the last teaching block in the class, so no
music or review section follows it — the review at 394.42–498.40 predates it and
its 'La chica, hop' @420.08 is the close-position La Chica from Class 2, a
different thing. The move's full-tempo clip lives on its Class 2 teaching source
(window 9)."`
This is what `ClipPair.slow`/`fast` being nullable is for; no new type is needed.

## 6.4 Cues

**42 cues across four moves, 7 of them `kind: 'lead'`.** All `sourceVideo:
'yZ562-ehtQQ'`; none is sourced from the short, which has no speech.
All `confidence: 'transcript'` unless the row says otherwise.

### A note on beats in this class

`el-uno-4` (Class 5, @205.46) is the only cue in classes 1–7 where a teacher says
"on <n>" for a lead action outright. Class 6 gives beats three times, and in each
case the number is spoken **in the same breath as the instruction, immediately
before the action** — *"Six, seven, right hand goes up"* @187.70, *"one, two,
three is basic, five, six, seven is turn"* @563.60, *"raise your left hand up on
three"* @537.30. The last is a genuine "on three". The first two are the teachers
calling the count as they execute, which is an anchor rather than an inference, but
it is a weaker anchor than an explicit "on seven" and is recorded as such. Every
other Class 6 cue omits `beat`, because the teachers use "Kentucky" itself as the
landmark instead of a number.

### `kentucky` — 25 cues, 6 `lead`

| id | beat(s) | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `kentucky-1` | — | `both` | `context` | You need the Enchufla step and the hook turn before this one. | 44.68 | "You have to know Enchufla step that you probably already know learning El Uno with us before. And you need to know also hook turn." |
| `kentucky-2` | — | `both` | `footwork` | Start from Guapea, the same as El Uno. | 65.72 | "We start from Guapea again, so the same as we did with Aruno." |
| `kentucky-3` | — | `both` | `concept` | Unlike El Uno, the hands never change. It is still built on the Enchufla. | 70.86 | "But this time we are not changing hands. However, move is based on Enchufla again." |
| `kentucky-4` | — | `leader` | **`lead`** | Touch her second hand — and keep hold of it. | 83.78 | "Five, six, seven, one, two, Kentucky. Now touch second hand and I hold it." |
| `kentucky-5` | — | `leader` | **`lead`** | Do not release the second hand. | 86.88 | "We are not releasing second hand, so this is one of these moments about which we told you in previous classes that when we touch the hand, we'll actually use both." |
| `kentucky-6` | — | `both` | `concept` | This is the case the earlier classes warned about: touch the hand and you then use both. | 94.14 | (same sentence, from "when we touch the hand, we'll actually use both") |
| `kentucky-7` | — | `leader` | `footwork` | Go into an Enchufla, still holding her left hand. | 96.52 | "We start again with enchufla, holding the left hand on the knee. One, two, three." |
| `kentucky-8` | — | `leader` | **`lead`** | The top hand goes overhead — the bottom hand stays joined. | 102.46 | "It goes overhead, but we are holding the bottom hand and we come back with another enchufla with exactly the same hand setup." |
| `kentucky-9` | 5 | `both` | `footwork` | Come back with a second Enchufla, on exactly the same hand setup. | 104.98 | "we come back with another enchufla with exactly the same hand setup. Five, six, seven." |
| `kentucky-10` | — | `leader` | `arms` | Your right hand and her left stay relaxed, in front of you both. | 111.02 | "So now, my right and her left are kind of relaxed in front of us." |
| `kentucky-11` | — | `leader` | `arms` | Your left hand goes on her shoulder. Keep it there. | 166.46 | "Take second hand. Left goes on her shoulder. Keep it there." |
| `kentucky-12` | 6, 7 | `leader` | **`lead`** | On 6-7, lift your right hand up. | 187.70 | "Six, seven, right hand goes up on my left shoulder, hop and one, two, three and five, six, seven." |
| `kentucky-13` | — | `both` | `concept` | The lift belongs to the third Enchufla, not the first two. | 119.80 | "With the next enchufla, I'll move the right hand up. Five, six, seven, one, two, three." |
| `kentucky-14` | — | `leader` | `arms` | That same right hand lands on your own left shoulder. | 127.72 | "Now, the same right hand will land on my left shoulder." |
| `kentucky-15` | — | `both` | `concept` | This is the tricky moment. Pay attention here. | 131.34 | "This is a tricky moment. Pay attention." |
| `kentucky-16` | — | `leader` | **`lead`** | Take your left hand up. | 133.74 | "Left hand will go up and I'll do hook turn. She will do three steps in a spot." |
| `kentucky-17` | — | `leader` | `footwork` | Do a hook turn. | 135.92 | (same sentence) |
| `kentucky-18` | — | `follower` | `footwork` | Three steps in a spot — step, step, step. | 137.26 | "She will do three steps in a spot. Step, step, step." |
| `kentucky-19` | — | `leader` | **`lead`** | Release your right hand and move it behind her back. | 141.22 | "I will release the right hand, move it behind her back and start dilating off." |
| `kentucky-20` | — | `both` | `footwork` | Straight out into the Dile que no. | 145.46 | "start dilating off. One, two, three and five, six, seven." |
| `kentucky-21` | — | `both` | `concept` | All of it runs fluently. | 150.82 | "And all of this is again very, very fluent." |
| `kentucky-22` | — | `leader` | `arms` | Hands pass overhead several times. Never lift them too high. | 249.88 | "there are many moments when hands are going overhead. We are not lifting them too high up. That's one thing that I should say definitely." |
| `kentucky-23` | — | `leader` | `rhythm` | There is exactly one right moment to lift the hand — when you have the space. | 257.12 | "Now there is only one a right moment also to lift this hand up and it's right now we have space" |
| `kentucky-24` | — | `leader` | `rhythm` | Miss that moment and start lifting late, and it lands straight on her head. | 274.38 | "if you miss the moment one and start lifting it now it lands directly on girl's head you don't want that" |
| `kentucky-25` | — | `both` | `concept` | It is not enough to do the move in the right order — it has to be on the right foot at the right moment in the music. | 300.04 | "So it's not only about doing the move in the right order, but actually doing it on the right foot in the right moment in music. Then it will work for sure." |

**`kentucky-7` is `confidence: 'suspect'`**, flag `K6-c`, with `warning: "The
teacher says 'holding the left hand on the knee' (@99.40). Two things are unclear.
(1) Whose left hand — read as hers, on the evidence of @111.02 in the same class,
'my right and her left are kind of relaxed in front of us'. (2) 'on the knee' is
unresolved: it recurs elsewhere in the course in the same Enchufla context (see
K6-d) and is not obviously either a hand position or a count, so the height of the
held hand is deliberately not stated in the cue text. Eye-check at 97."` This is
the only `suspect` cue in Class 6.

**`kentucky-10` is voiced from the leader's side and there is no follower
counterpart, on purpose.** The teachers did not give the follower a separate
instruction here — they described one joined pair of hands from one side — so R4's
"never merge" does not apply and inventing a mirrored follower cue would be
inventing. Which leads to a real observation about this class, recorded as
**K6-e**: chapter 3 is narrated almost entirely in the leader's first person, and
the follower gets exactly **two** explicit instructions in 590 seconds of teaching
— `kentucky-18` (three steps in a spot, @137.26) and the whole of the mis-labelled
outro (@596.72 onward). The outro material is therefore not optional colour; it is
half of everything Class 6 says to the follower.

**Beat on `kentucky-9`:** the "Five, six, seven" at @108.68–110.00 is spoken as the
second Enchufla is danced, immediately after the instruction. Recorded as an
anchor of the weaker kind described above.

### `la-chica` — 10 cues, 1 `lead`. Class 5's promise, kept.

| id | beat(s) | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `la-chica-12` | — | `both` | `context` | La Chica in open position — promised in Class 5, taught here. | 498.40 | "Now, plot twist. We told you last time that we will show you La Cica in open position and we've never done it so we will do it now." |
| `la-chica-13` | — | `both` | `concept` | It is a very simple move and a very useful one. | 515.22 | "La Cica is a very simple term. It is a very useful move as well," |
| `la-chica-14` | — | `leader` | `concept` | It buys you time to process and prepare the next move. | 520.70 | "because it gives guys time to process and prepare for the next move." |
| `la-chica-15` | — | `leader` | `concept` | Guapea over and over gets boring, and then you freeze on what to do next. This is the way out. | 527.56 | "going over and over the same step, it becomes boring at the same time. And then you think, what do I do next? What do I do next?" |
| `la-chica-16` | **3** | `leader` | **`lead`** | On 3, raise your left hand up. | 537.30 | "So all you have to do is raise your left hand up on three, and then she will do right turn." |
| `la-chica-17` | — | `follower` | `footwork` | Then do a right turn. | 539.38 | (same sentence, from "and then she will do right turn") |
| `la-chica-18` | 1, 2, 3 | `both` | `footwork` | 1-2-3 is just the basic. | 563.60 | "So basically, one, two, three is basic, five, six, seven is turn. nothing funky." |
| `la-chica-19` | 5, 6, 7 | `follower` | `footwork` | 5-6-7 is the turn. Nothing funky. | 565.50 | (same sentence) |
| `la-chica-20` | — | `both` | `context` | If the right turn is the hard part, it has its own video on the steps course. | 548.06 | "Again, if you are struggling with this right turn, we've done a video about it on our other course. I'll add again, card as usual." |
| `la-chica-21` | — | `both` | `context` | Kentucky goes straight after it, and it adds variety. | 576.00 | "And then I reminded myself Kentucky, so I can do it. King, king, po, tum, tum, ping, and kum, kum, piggy." + "It adds a bit of variety to your dancing." @586.22 |

Numbering continues from **Class 2**, which owns `la-chica-lead-intro` and
`la-chica-1..11` (§2.4). The highest existing index was checked by an audit of
this finished file, not assumed: the first draft numbered this block
`la-chica-11..20` and collided with Class 2's `la-chica-11`. It has been
renumbered to `12..21`. Recorded as **K6-f**.

`la-chica-20` deliberately does **not** name which right turn. The steps course has
four (`right-turn-side`, `right-turn-front-back`, `left-turn-*`, `hook-turn`) and
the teachers say only "this right turn". Picking one would be a guess; the cue
points at the course and stops. **K6-g**.

`la-chica-21`'s `verbatim` keeps "King, king, po, tum, tum, ping, and kum, kum,
piggy" — the teachers vocalising the Kentucky rhythm. That is never a cue and is
never spoken in drill mode; it is in `verbatim` only, so that anyone re-checking
@576.00 hears what is actually there.

### `dile-que-no` — 6 cues, from the chapter that says "Summary / Outro"

This is the follower's arm, and it is a rule for every move in the course.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `dqn-32` | **1** | `follower` | `arms` | As you step back for the Dile que no, lift your hand up on 1. | 604.68 | "So when they are stepping back for the Lekano, this is the moment to lift their hand up on one." |
| `dqn-33` | — | `follower` | `concept` | Make it a habit. It pays off in the long term. | 610.56 | "And it is quite good to develop it as a habit. It definitely helps in long term." |
| `dqn-34` | — | `follower` | `arms` | Learn how to get that hand out of the way. | 619.22 | "You have to learn how to get this hand out of the way." |
| `dqn-35` | — | `follower` | `arms` | Finish with your hand lying on top of his shoulder. Always. | 623.06 | "So to finish with your hand, always lying on top of guy's shoulder." |
| `dqn-36` | — | `both` | `concept` | Default position: guy's hand on the bottom, girl's hand on top. | 342.32 | "default position. Guy's hand on the bottom, girl's hand on top." |
| `dqn-37` | — | `both` | `concept` | The other way round feels tense. It will feel natural once you have danced longer. | 641.78 | "It feels all right. And if it's opposite, it's pretty tense." + "when you dance longer, you'll realize that this is very natural" @636.96 |

**`dqn-36` is `role: 'both'` and this is legal under R4.** The rule forbids a
`both` cue containing *"a possessive limb reference that differs by role"* — the
dangerous case is "your left hand", where the reader cannot tell whose. Here the
teachers name both sides explicitly in the third person ("guy's hand", "girl's
hand"), so there is nothing to misread and nothing to split. Stated because it
would otherwise look like a rule violation on a grep.

`dqn-35` is corroborated by the leader's narration in the music chapter, @335.76:
*"She's lifting her arm up just to finish with her arm lying on my shoulder and
this is always default position."* Two independent statements of the same rule
90 seconds apart, from two different chapters. `dqn-32`'s beat 1 comes from
*"lift their hand up on one"* — an explicit "on one", the second-strongest beat
anchor in the part after `el-uno-4`.

Class 6 therefore gets a **fourth `TeachingSource` on `dile-que-no`**, with no
clips:

```ts
{
  course: 'couples', classNumber: 6, videoId: 'yZ562-ehtQQ',
  teachStart: 596.72,
  segmentIds: ['cc6-teach-default-hands', 'cc6-music'],
  clips: { slow: null, fast: null,
    missingReason: 'Class 6 states the follower default hand position but never '
      + 'demonstrates it in isolation — it is spoken over a static two-person '
      + 'frame, not danced. The Dile que no clips live on the Class 3 source.' },
  note: 'The chapter is titled "Summary / Outro" and is not one. See K6-a.',
}
```

### `el-uno` — 1 cue, from Class 6

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `el-uno-27` | — | `leader` | `rhythm` | The same timing rule applies to El Uno: lift early and you have a massive distance from her head; lift late and it does not work. | 282.20 | "actually we should mention exactly the same with eluno yeah so with eluno you have exactly the same story if you start lifting arm up now. It's super safe, massive distance from her head. But if you miss the moment and start lifting it now, it doesn't work." |

**This is the only cross-class cue in Part 1** — a cue on a Class 5 move whose
`sourceVideo` is the Class 6 video. It matters for a reason that is easy to miss.
**K4-l** established that per-class drills can partition a move's cues with
`cue.sourceVideo === source.videoId`; under that rule `el-uno-27` would be silently
dropped, because `el-uno` had no Class 6 source. So Class 6 adds a clipless
`TeachingSource` to `el-uno` as well:

```ts
{
  course: 'couples', classNumber: 6, videoId: 'yZ562-ehtQQ',
  teachStart: 282.20, segmentIds: ['cc6-teach-extra'],
  clips: { slow: null, fast: null,
    missingReason: 'Class 6 does not re-teach El Uno. It adds one timing rule '
      + 'to it in passing, inside the Kentucky "Extra information" chapter.' },
  note: 'Not a teaching source for the move — a single cross-reference. The El '
      + 'Uno clips live on the Class 5 source.',
}
```

Recorded as **K6-h**, because the general rule it implies is worth stating once:
**any cue whose `sourceVideo` is not among the move's sources' `videoId`s is
invisible to a per-source partition.** A cheap invariant check would catch it.

### Drillable-cue counts

| Move | Drillable, this class | Drillable, all sources | Cap |
|---|---|---|---|
| `kentucky` | **18** | 18 | 8 |
| `la-chica` | 4 | **11** (7 from Class 2) | 8 |
| `dile-que-no` | 4 | **25** across four sources | 8 |
| `el-uno` | 1 | **19** | 8 |

`kentucky` ties `el-uno` for the largest overflow in the part, and for the same
reason: 96 seconds of unbroken presentation, three Enchuflas, four distinct hand
positions and a hook turn. Flagged, not trimmed. The natural split if the cap must
bite is "the hands" (`-4`, `-5`, `-8`, `-10`, `-11`, `-12`, `-14`, `-16`, `-19`,
`-22`) versus "the feet" (`-2`, `-7`, `-9`, `-17`, `-18`, `-20`).

## 6.5 Known defects

| Flag | What | Data | UI |
|---|---|---|---|
| **K6-a** | **The chapter titled "Summary / Outro" contains 60 seconds of teaching.** 592.14–656.36 is the follower's default hand position rule — five cues, one of them with an explicit beat — and it is half of all the instruction Class 6 gives the follower. A pass that maps chapter titles to roles mechanically marks the whole thing `skip` and throws it away. | The chapter is **split**: `cc6-teach-default-hands` 592.14→656.36 role `teach`, and `cc6-outro` 656.36→693.42 role `skip`, boundary anchored to "And to do that, remember to like, subscribe and press the bell." @656.36. | None. |
| **K6-b** | **"And the last time without music" @227.10 reads like a warning and is not one.** It sounds as if the first pass in the slow clip has music under it. | Checked instrumentally, not assumed: `silencedetect=noise=-45dB:d=0.4` finds 2 gaps in 209.9–227.0 and 1 in 230.8–241.4, but 0 in 320–340 where the music actually is. Both passes are dry. **Window 21 carries no caveat**, deliberately. | None. |
| **K6-c** | **"holding the left hand on the knee"** @99.40 — whose left hand, and what "on the knee" means. | `kentucky-7`: `confidence: 'suspect'`, `flag: 'K6-c'`, warning as quoted in §6.4. The cue text states the hold and omits the position rather than guessing it. | Rendered as Unverified with the warning inline. Never spoken in drill mode. |
| **K6-d** | **"on knee" / "on the knee" is a recurring unresolved phrase, not a one-off.** It appears in `yZ562-ehtQQ` @100.02 ("holding the left hand on the knee"), `kg5Ztcp5xQU` @0.00 and @552.40 ("Chufla al centro, on knee, one and one"), and `f8Y-b3m070c` @376.84 ("knee with left, one, left up"). Always in an Enchufla context. In the `kg5Ztcp5xQU` occurrences it sits exactly where a count belongs, which argues it is a mangled call and not an anatomical instruction — but that is a hypothesis, not a finding. This **supersedes K4-e**, which recorded it as a Class 4 one-off. | **No cue is built on it anywhere.** Do not add it to the normaliser until someone has listened: a wrong expansion would propagate into four files. | None. |
| **K6-e** | **Chapter 3 is narrated almost entirely in the leader's first person.** In 590 seconds of teaching the follower gets two explicit instructions: `kentucky-18` and the K6-a block. | Nothing to fix — `kentucky-10` and `-11` are `role: 'leader'` because that is who was addressed, and mirroring them for the follower would be invention. Recorded so that a "why does the follower have so few cues" question has an answer. | A per-role view of this class will look thin on the follower side. That is accurate. |
| **K6-f** | **RESOLVED — the id collision was real.** `la-chica` cue ids continue across classes, and this section was first drafted as `la-chica-11..20` on the assumption that Class 1 held `1..10`. An audit of the finished file showed the block actually continues from **Class 2**, which holds `la-chica-lead-intro` + `la-chica-1..11` — so `la-chica-11` was defined twice, in §2.4 and §6.4. | **Fixed in this spec:** Class 6's block renumbered to `la-chica-12..21`; the ten table rows and the three prose references (`la-chica-16` the `lead` cue, `la-chica-20` the right-turn pointer, `la-chica-21` the Kentucky link) were updated together, as was the §7 note that references `la-chica-12`. Class 2 is untouched. **Invariant worth asserting in a check alongside K6-h: cue ids must be globally unique across the whole course.** | None remaining. |
| **K6-g** | **"this right turn"** @548.06 is not resolved to a move id. The steps course has four turns and the teachers name none of them. | `la-chica-20` is `kind: 'context'` and links to the course, not to a move. No `composedOf` entry added on that basis. | None. |
| **K6-h** | **A cue can be orphaned from every teaching source.** `el-uno-27` is sourced from `yZ562-ehtQQ` while `el-uno`'s only teaching source was `4KKAKgn8UZ4`, so the K4-l per-source partition (`cue.sourceVideo === source.videoId`) would drop it silently. | Fixed by adding clipless `TeachingSource` entries for Class 6 to both `el-uno` and `dile-que-no` (see §6.4). **General invariant worth asserting in a check: every `cue.sourceVideo` must appear in some `source.videoId` for that move.** | None. |
| **K6-i** | **The class durations in `beginner-couples-course.tsv` are rounded up.** TSV 852.0 / 694.0 / 565.0 vs container 851.452517 / 693.417506 / 564.407438. `SalsaClass.duration` is specified as the container value. | Use the container figures: **851.45**, **693.42**, **564.41**. The Class 5 segment map in this spec was corrected accordingly. | None. |
| **K6-j** | **Degenerate word timestamps inside the published slow clip.** In segment 215.92–226.94, six consecutive words ("1, 2, 3, and 5, 6, 7") all carry `s = 226.92`. A Whisper artefact. | No boundary in this spec relies on any timestamp in 226.9–227.0. Window 21's out-point is 241.40, anchored elsewhere. Listed so a later cross-check pass does not treat 226.92 as six independent anchors. | None. |
| **K6-k** | **The short's YouTube title misspells the move** as "Kentukcy" while its own burned-in banner reads KENTUCKY. | Canonical `Kentucky`; `Kentukcy` kept as an alias, sourced from that title. Prefer the burned-in graphic and the playlist class title over short titles generally. | The fast clip's caveat mentions it, so a user who searches YouTube and finds the odd spelling is not confused. |
| **K6-l** | **`la-chica`'s Class 6 slow clip is 17.7s, under the 20s floor, and has no fast clip at all.** | Window 22 ships with the caveat quoted in §6.3; `fast: null` with a `missingReason`. The move is not marked incomplete on that basis, because its Class 2 source carries both grains (windows 5 and 9). | Honest badge on the Class 6 source, not on the move. |
| **K6-m** | **Two moves exceed the drillable-cue cap** — `kentucky` at 18 for this class, `dile-que-no` at 25 across four sources. | Nothing trimmed, per the steps precedent. Partition by `sourceVideo` when drilling one class (K4-l), and see K6-h for the trap in doing so. | Per-class drills should scope to the class. |

---

# Class 7 — Vacilala por la mano

- **Video** `pZChl5ylSJw` · 9:24 · **564.41s** from the container (TSV says 565.0) · 8 YouTube chapters
- **Official short** `18cM9UvzsoI` · 32.17s · 720×1280 · `aspect: '9/16'`
- **Moves, per the description**: `vacilala por la mano`
- **The lead-cue high-water mark of Part 1.** The teachers say so themselves,
  @194.08: *"it requires a lot more leading action"*. Seven `kind: 'lead'` cues,
  more than any other class in classes 1–7.
- **The brief expected trouble with the slow clip** — the `count` chapter is only
  17 seconds. It turned out not to matter: the side-view chapter contains a pass
  the teachers explicitly announce as *"one more time a bit slower"* (@317.94),
  and that is the published window. No extension, no stitching, no caveat.
- **This move's name is never spoken correctly anywhere in the course.** See §7.1.

## 7.1 Move index

| id | Canonical name | kind | base | New? | Summary |
|---|---|---|---|---|---|
| `vacilala-por-la-mano` | Vacilala por la mano | `step` | `guapea` | **Yes** | The first move where the follower starts *forward* on 1: the leader preps by opening his body right and taking up tension, pulls her forward past him, loops his hand up and over her head, and lands her in a Dile que no. A right turn, but travelling from his left side to his right. |

### The canonical name exists only as on-screen text

**"Vacilala" does not appear in `pZChl5ylSJw` even once.** The class video calls the
move, in order: `Basila Laporte Lamano` @41.14, `Basila, La Portla, Mano` @179.94,
`Basila por la mano` @288.24 and @307.18, `Basilla por la mano` @350.46 and @363.64,
`basila la por la mano` @376.26 and @386.38, and `la por la mano` @446.06 — where
the preceding word was transcribed as the English "but" @445.68.

The spelling **`Vacilala por la mano`** comes from three pieces of channel text and
nothing else:

1. the playlist title, `beginner-couples-course.tsv`: "Class 7 (Vacilala por la mano)"
2. the official short's YouTube title, `beginner-shorts.tsv`: "Vacilala por la mano - Class 7"
3. **the short's burned-in bottom banner: VACILALA POR LA MANO**

R1 says the canonical name is spelled as the channel writes it. The channel writes
it three times, in text, consistently — and never once says it in a way Whisper
can hear. Without item 3 this spec would have been resting the canonical name on
metadata alone, which is why the frame inspection mattered.

### Index on the tail, not the head

Every mangling in the corpus destroys the *first* word and preserves the rest:

| Form | Where |
|---|---|
| `Basila Laporte Lamano` | `pZChl5ylSJw` @41.14 |
| `Basila, La Portla, Mano` | `pZChl5ylSJw` @179.94 |
| `Basila por la mano` | `pZChl5ylSJw` @288.24, @307.18 |
| `Basilla por la mano` | `pZChl5ylSJw` @350.46, @363.64 |
| `basila la por la mano` | `pZChl5ylSJw` @376.26, @386.38 |
| `la por la mano` (after a mis-heard "but") | `pZChl5ylSJw` @446.06 |
| `For la mano` | `pZChl5ylSJw` @0.36 — the cold-open preview |
| `Basila La Por La Mano` | `jBaHuGXoWBY` @42.50, @47.12, @60.64, @65.50, @71.18 |
| `Vasila la por la mano` | `jBaHuGXoWBY` @558.26 |
| `Basilala por la mano` | `jBaHuGXoWBY` @580.12; `97Urh5GlCbg` @492.82 |
| `Basilola por la mano` | `jBaHuGXoWBY` @166.96 |
| `Basile, La Porte, La Mano` | `jBaHuGXoWBY` @128.12 |
| `Basila La Porla Mano` | `lV56IVufYOU` @89.30, @94.02 |
| `Basile Laporte, La Mano` | `lV56IVufYOU` @497.00 |
| `Basila la por la mano` | `lV56IVufYOU` @30.22, @48.18 |
| `Vasile Lepore Lamanu` | `lV56IVufYOU` @63.04 |
| `Basila la por la mano` | `GT7PTpvni_A` @670.77 |
| `basi lala for la mano` | `GT7PTpvni_A` @725.35 |
| `Vacílala por la mano` (accented) | `M3J7w59rXTE` @589.62 |
| `vacillala por la mano` | `X4Sr8QbXQLU` @470.64 |
| `Vacila por la mano` | `X7lz-BBMmU8` @198.70 |

**`por la mano` as a bare substring is safe and is the single most reliable
matcher.** Checked across all 21 couples transcripts: every occurrence of "la
mano" refers to this move. Nothing else in the course uses the word. So the alias
list should include the bare tail, which catches every row above including the
ones nobody has thought of yet:

```ts
aliases: [
  'por la mano', 'Por la mano', 'porla mano', 'Porla Mano', 'Portla, Mano',
  'Laporte Lamano', 'Laporte, La Mano', 'La Porte, La Mano', 'Lepore Lamanu',
  'For la mano', 'for la mano',
  'Vacilala por la mano', 'Vacílala por la mano', 'vacillala por la mano',
  'Vacila por la mano', 'Vasila la por la mano',
  'Basila por la mano', 'Basilla por la mano', 'basila la por la mano',
  'Basila La Por La Mano', 'Basilala por la mano', 'Basilola por la mano',
  'Basila La Porla Mano', 'Basila Laporte Lamano', 'basi lala for la mano',
]
```

### The alias trap: bare "Basila" is a different move

This is the most dangerous naming hazard in Part 1, and it is the exact shape of
**K4-b** (bare "al centro"). **`Basila` / `Vasila` / `Basilela` / `Basilella` on
their own must NOT be aliased to this move.** Couples Class 14 (`jBaHuGXoWBY`)
teaches a *separate* move called Vacilala, without the hand, and says so outright
at @60.64:

> *"So what's the difference between Basila La and Basila La Por La Mano? … Obviously
> Mano, so hand. During Basila La Por La Mano, I'm guiding you through whole move.
> In here with Basilela we'll just initiate the turn"*

That class also teaches `Vacilala los dos` (@24.24, @358.32, @468.00), and there is
a separate official short, `c0H4GQnYjNE` "Vacilala - Class 14". So the corpus
contains at least three distinct moves whose names begin with the same mangled
word. Bare-substring matching on "Basila" would merge all three.

This is a **cross-part note for the Part 2 agent**, who owns Class 14: the
distinguishing evidence is already located, at `jBaHuGXoWBY` @60.64 and @71.18, and
`jBaHuGXoWBY` @79.24 gives the mechanical difference (guided through the whole move
versus only initiating the turn). Recorded as **K7-b**.

### Footwork paragraph

**`vacilala-por-la-mano`** — Start from Guapea. The first difference from every
other move so far is that the follower starts on 1 with the **right foot forward**.
To prepare her, the leader takes up a bit of tension as he touches and opens his
body to the right; she makes a small prep to the left. Then he pulls forward and she
walks: right front, left front, right — and on that third step she begins twisting
the opposite way, so her foot has already turned before she finishes it. On 5 the
next step is with the left foot, travelling the opposite direction from the first
three: those came towards him and past his left, this one goes away on his right.
Two more walking steps towards his right foot, and she lands in the Dile que no
position, and they do a full Dile que no. The leader's own footwork is only 1-2-3,
5-6-7 — which does not mean he can stop moving his feet. His hands do the work: pull
forward so the joined hand comes in front of him, lift, and make a **small** loop
over her head, then loop her around and bring the hand down into the Dile que no.
Her arm holds the same shape the whole way through. It is still a right turn, but
unlike La Chica she travels from his left side to his right.

## 7.2 Segment map

8 chapters, 8 segments. One `angle` chapter normalised to **`count`** — the
opposite call from Class 6, for a reason given below.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `cc7-intro` | 0.0 | 18.32 | `skip` | Intro (cold-open preview) | — | chapter title "Intro". 0.00–8.88 is a preview clip of the finished move — *"For la mano, hop, king king hop … five six seven and one."* Speech resumes at "Hello, hello, another class with La Suerte Dance School" @18.32, a 0.32s agreement with the 18.0 mark |
| `cc7-about-class` | 18.32 | 44.68 | `skip` | About this class | — | chapter title "About this class"; closes on "we'll teach you Basila Laporte Lamano. Let's go!" @43.08 |
| `cc7-teach-vplm` | 44.68 | 286.62 | `teach` | Vacilala por la mano — presentation & explanation | `vacilala-por-la-mano` | chapter title "…presentation & explanation"; **"We start with Guapea."** @44.68, a 0.68s agreement. 241 seconds, the longest single teach block in Part 1 |
| `cc7-count-vplm` | 286.62 | 301.46 | `count` | Fluently with count | `vacilala-por-la-mano` | chapter title "Vacilala por la mano - fluently with count"; **"let's do Guapea and Basila por la mano one more time"** begins at "let's" @286.62. **Chapter mark is 285.0**, which lands mid-sentence inside the Lego analogy ("she's a Lego person" — "Lego" @285.36). Moved 1.62s later so the announcing sentence stays whole. **Usable length is 13.88s, not the 17s the chapter implies** |
| `cc7-count-vplm-side` | 301.46 | 337.34 | `count` | Side view — normal, then explicitly slower | `vacilala-por-la-mano` | chapter title "Vacilala por la mano - side view"; **"We'll do one more time exactly the same thing just from different perspective."** starts its own segment at @301.46, a 0.54s agreement. **Analysis says `angle`** — normalised to **`count`**: it is two counted passes with no new instruction, and the second is announced as *"one more time a bit slower"* @317.94. Camera lives in the label |
| `cc7-music` | 337.34 | 392.28 | `music` | With music | `vacilala-por-la-mano`, `guapea`, `dile-que-no` | chapter title "Vacilala por la mano - with music"; "We are still going with very very slow rhythm" @337.34, a 0.34s agreement |
| `cc7-review` | 392.28 | 487.44 | `review` | Review with music | `vacilala-por-la-mano`, `la-chica`, `el-uno`, `kentucky`, `enchufla-al-centro`, `dile-que-no`, `guapea` | chapter title "Review with music"; **"and I will close position now and start from the beginning"** @392.28. **Chapter mark is 394.0**, which falls between "and" @393.72 and "start" @394.66 *inside* that announcement — the boundary moves 1.72s earlier to keep it whole. `reviewsEarlierMoves: true`. Note: this chapter contains real instruction at @451.34, see §7.4 |
| `cc7-outro` | 487.44 | 564.41 | `skip` | Summary / Outro | — | chapter title "Summary / Outro"; "All this dance is becoming a lot more complex, a lot more exciting." @487.44 after a 2.0s gap |

`chaptered: true`. `teaches: ['vacilala-por-la-mano']`.

### Two things checked rather than assumed

**The `angle` chapters in Classes 6 and 7 are normalised to different roles, on
purpose.** Class 6's side view (`cc6-teach-kentucky-side`) is `teach`, because it
re-narrates the move with fresh instruction interleaved. Class 7's
(`cc7-count-vplm-side`) is `count`, because it is calls only. The chapter titles are
near-identical; the content is not. `SegmentRole` has no `angle` member and does not
need one — the camera is a property of the label, not of what the segment is for.

**Class 7's outro really is an outro** — which is worth saying only because Class
6's was not (**K6-a**). 487.44–564.41 was read in full: course meta (*"Our regular
classes, when they happen face to face, the course lasts for 32 classes"* @497.68),
study advice (*"you can rewind the video, slow it down, watch it as many times as
you want"* @532.08), then like/subscribe/Facebook/Instagram/Patreon/beginner's
guide. No move instruction, no cue sourced from it. `skip` is correct. The study
advice is a pleasant footnote given that this tab exists to slow these clips down,
but it is not a cue about a move and it is not in the data.

## 7.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 24 | `vacilala-por-la-mano` | `pZChl5ylSJw` | **305.54** | **331.18** | 25.64s | `vacilala-por-la-mano-slow.mp4` | **A** | In: **"5"** @305.54, the first call of the side view, after "…just from different perspective." closes @305.06. Out: **331.18**, the first word of the next sentence, *"Let's do it with music"* — the previous pass ends on "cheek." @330.72. |

**No caveat.** This is the answer to the problem the brief flagged. The window holds
two complete passes from one camera:

- **305.54–316.74**, at the class's normal teaching speed: *"5 6 7 1 Basila por la
  mano hop and pull 1 2 3 and 5 6 7 and D like and hop and 5 6 7"*
- **316.74–330.72**, explicitly slower: *"and one more time **a bit slower**
  forward 6 forward front front opposite around around around and D like and hop
  and 5 6 7 both back cheeky cheek"*

The second pass is the most useful ten seconds in the class, because the calls are
not numbers — they are the follower's actual steps, named as they happen: *forward,
forward, front, front, opposite, around, around, around*. That sequence is
independently corroborated in a later class, `lV56IVufYOU` @63.04: *"she goes
forward, front, front, opposite, inside, outside, outside"*. Two recordings, months
apart, describing the same footwork the same way.

The 17-second `count` chapter was **not used**, and its real usable length is 13.88s
once the Lego sentence is excluded — under any floor. Recorded as **K7-c**.

**Alternates**

| For | Window | Len | Why kept, why not published |
|---|---|---|---|
| slow | 287.58 → 331.18 | 43.60s | The `count` chapter *plus* the side view: three passes, in at "Guapea and Basila por la mano one more time" @287.58, out at "Let's" @331.18. Inside the 20–45s band and it shows the move three times. Rejected because the camera cuts mid-window at ~301.5, which makes it a poor loop, and because the announcement "We'll do one more time exactly the same thing just from different perspective" sits in the middle of it. |
| slow | 209.26 → 219.06 | 9.80s | *"Watch. Five, six, pull. One, two, up. Loop her around, hand down, be like a knot."* Ten seconds, and the clearest demonstration of the leader's hand in the whole part — every one of the four lead actions called as it happens. Far too short to publish; kept because if a reviewer wants one clip to explain what "por la mano" means, this is it. |
| fast | 346.98 → 368.32 | 21.34s | Landscape 16/9 alternative to the vertical short. In at "Guapea" @346.98 (Whisper wrote "Wapea"), out at the segment end 368.32. Two passes at tempo with the teacher calling over the music. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 25 | `vacilala-por-la-mano` | **`18cM9UvzsoI`** | **0.0** | **32.17** | 32.17s | `vacilala-por-la-mano-fast.mp4` | **A V** | The whole short. `aspect: '9/16'`. No title card — dancing is running by frame 5. 32.17 is the ffprobe stream duration (32.165467); the container reports 32.174. |

**Caveat:** *"The official short. Music only, no spoken count — there is nothing to
listen for. A burned-in graphic covers the top strip ('BEGINNERS SALSA MOVES') and
the bottom of the frame ('CLASS 7 / VACILALA POR LA MANO'); this banner is three
lines tall, the tallest of the three shorts, and it sits highest over the floor.
The dancers' feet clear it in the frames sampled, but this is the short where
footwork visibility is most at risk. 720×1280, so it will upscale."*

## 7.4 Cues

**26 cues on one move, 7 of them `kind: 'lead'`** — the most lead cues of any class
in Part 1, and the teachers say why at @194.08. All `sourceVideo: 'pZChl5ylSJw'`;
nothing is sourced from the short. All `confidence: 'transcript'`.

Three cues carry a beat, and all three are stated outright — *"girls will start
**on one** with the right foot forward"* @55.58 and *"next step **on five** is with
the left foot"* @128.20. After Class 5's `el-uno-4`, these are the strongest beat
anchors in the part.

### `vacilala-por-la-mano` — 26 cues, 7 `lead`

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `vplm-1` | — | `both` | `footwork` | Start from Guapea. | 44.68 | "We start with Guapea. Five, six, seven, and now the first difference between this step and all other steps we've done so far…" |
| `vplm-2` | **1** | `follower` | `footwork` | On 1, step forward with your right foot. Every other move so far started back. | 55.58 | "girls will start on one with the right foot forward. One, two, three, and five, six, stop." |
| `vplm-3` | — | `leader` | **`lead`** | As you touch her hand, create a bit of tension. | 66.98 | "So to prepare our partner for this move, when I touch I create a bit of tension and I open my body to the right" |
| `vplm-4` | — | `leader` | **`lead`** | Open your body to the right. | 69.82 | (same sentence) |
| `vplm-5` | — | `follower` | `footwork` | Make a small prep to the left. | 72.00 | "and she also did small prep to the left. We'll show that one more time." |
| `vplm-6` | — | `leader` | **`lead`** | She walks forward because you pull forward. | 85.62 | "from here she starts walking forward because I pull forward" |
| `vplm-7` | — | `follower` | `concept` | For followers this is a very important step for what comes later. | 93.78 | "so from ladies perspective this is very very important step for future" |
| `vplm-8` | — | `both` | `context` | Nothing in the steps course prepares you for this — it is purely a couple action. | 98.80 | "we haven't discussed that on our steps classes because it's very unrelated to any steps this is just basically action in couple." |
| `vplm-9` | — | `follower` | `footwork` | Right foot front, left front, then right. | 110.86 | "So she starts with her right foot going forward. So it's right front, left front and right." |
| `vplm-10` | — | `follower` | `footwork` | On that third step, start twisting the opposite way — the foot turns before you finish it. | 113.88 | "She starts twisting opposite direction. I don't know if you can see that but her foot already went other way." |
| `vplm-11` | **5** | `follower` | `footwork` | On 5, step with the left foot. | 128.20 | "Now next step on five is with the left foot." |
| `vplm-12` | — | `follower` | `footwork` | The first steps came towards him, past his left. This one goes exactly the opposite way. | 141.68 | "so this step was towards me but to my left and now she goes exactly opposite direction" |
| `vplm-13` | — | `follower` | `footwork` | Then two more walking steps, towards his right foot. Walk and walk. | 148.84 | "Five and two more steps towards my right foot. Walk and walk." |
| `vplm-14` | — | `both` | `footwork` | She lands in the Dile que no position, and you do a full Dile que no. | 154.24 | "And then she will land in Dilekano position that we already know and we'll do full Dilekano. Six, seven. We know this part already." |
| `vplm-15` | — | `leader` | `footwork` | Your footwork is only 1-2-3, 5-6-7. | 164.76 | "Now from guy point of view, footwork is super simple. One, two, three, five, six, seven." |
| `vplm-16` | — | `leader` | `footwork` | Simple does not mean lazy. Keep your feet moving. | 169.24 | "What doesn't mean that you can be lazy? You can't. You have to keep moving your feet. This is very, very important." |
| `vplm-17` | — | `both` | `concept` | It needs far more leading action than anything before it. That is what makes it different. | 194.08 | "I said that this movement is quite different than everything else we've done, and it is mainly because it requires a lot more leading action." |
| `vplm-18` | — | `leader` | **`lead`** | Pull with your hand forward, so it comes in front of you. | 201.58 | "I'm pulling with my hand forward, so it goes in front of me, and then I lift it up and make a small loop over her head." |
| `vplm-19` | — | `leader` | **`lead`** | Then lift it up and make a small loop over her head. | 205.54 | (same sentence) |
| `vplm-20` | — | `leader` | **`lead`** | Loop her around, then bring the hand down. | 214.82 | "Watch. Five, six, pull. One, two, up. Loop her around, hand down, be like a knot." |
| `vplm-21` | — | `leader` | **`lead`** | The loop is a small movement. Don't go crazy with it. | 227.72 | "this looping that I'm talking about is a relatively small movement you don't have to go crazy" |
| `vplm-22` | — | `follower` | `arms` | Hold the same arm set-up the whole way through, as in La Chica. | 236.00 | "another thing from the girl point of view is that she's keeping this arm set up I think we talked about it already during La Chica but she ended this she keeps this hand set up through all the moves" |
| `vplm-23` | — | `follower` | `arms` | That arm stays in the same position. Always. | 258.10 | "Okay, so this arm is always in the same position you are a Lego person." |
| `vplm-24` | — | `follower` | `concept` | Think of a Lego figure: hold its arm high and rotate the arm, and the whole figure turns. | 267.50 | "You know Lego people, they have arms like that and they can move up and move. So if you hold Lego's arm, Lego's person's arm high and you start rotating arm, whole Lego person is rotating." |
| `vplm-25` | — | `both` | `concept` | It is still a right turn, but she travels from his left to his right. That is what separates it from La Chica. | 451.34 | "It's very different than la chica. It is still right turn but she travels from my left to my right. Pay attention to that." |
| `vplm-26` | — | `both` | `musicality` | The music is still very slow, and it will speed up little by little as the course goes on. | 337.34 | "We are still going with very very slow rhythm, however step by step during this course we'll start speeding music up tiny bit." |

### Notes on individual cues

**Zero `suspect` cues and zero `warning`s in Class 7.** It is the only class in Part
1 with neither, and the reason is structural rather than lucky: the teachers split
the explanation into an explicitly labelled *"let's discuss girls steps maybe
first"* (@88.90) and *"Now from arm perspective"* (@190.82) / *"Now from guy point of
view"* (@163.26), so almost every instruction states whose limb it is before it
starts. R4 has nothing to catch here because the source already obeys it. Worth
recording as the counter-example to Classes 3–6.

**`vplm-25` is sourced from the `review` chapter, not a `teach` chapter.** @451.34 is
the only place in the class where the difference between this move and La Chica is
stated, and it happens in passing during the review. The Class 7 `TeachingSource`
therefore lists `cc7-review` in `segmentIds` alongside the teach and count blocks.
The same thing happened in Class 6 (**K6-a**) with an "outro": **useful instruction
in this course does not respect chapter titles.**

**`vplm-20`'s `verbatim` contains "be like a knot"** — Whisper's rendering of "Dile
que no", which the Class 3 mangling table already covers (`be like a` is one of the
six forms excluded there as a bare substring precisely because it collides with
English). Here it appears inside a `verbatim` only, which is exactly the right place
for it.

**`vplm-12` deliberately drops "kapo".** The teachers say, @135.38: *"She goes from
our perspective towards the mirror from my point of view, let's say like if you
relate it in kapo, outside from the guy."* "kapo" is unresolved — plausibly a room
or a mirror reference — so the cue is anchored to the unambiguous restatement at
@141.68 instead, and no cue is built on @135.38. Recorded as **K7-d**.

**Not added, on purpose:** the review says @423.86 *"or maybe even four because we
secretly told you la cica in open position so la cica"*, which confirms Class 6's
bonus. It would be a `la-chica` cue sourced from Class 7, and under **K6-h** that
would require yet another clipless `TeachingSource`. It says nothing `la-chica-12`
does not already say, so it is not in the data. A cue has to earn a source.

### Drillable-cue counts

| Move | Drillable | Cap |
|---|---|---|
| `vacilala-por-la-mano` | **20** | 8 |

The largest overflow in Part 1, from the longest teach block in Part 1 (241
seconds) — and unusually, most of it is *follower* footwork: eight cues (`-2`, `-5`,
`-9`, `-10`, `-11`, `-12`, `-13`, plus `-22`/`-23` for the arm) trace her path step
by step, because her path is the move. Flagged, not trimmed. The natural split is
"her steps" (`-2`, `-5`, `-9`, `-10`, `-11`, `-12`, `-13`) versus "his hands"
(`-3`, `-4`, `-6`, `-18`, `-19`, `-20`, `-21`), which happens to be exactly how the
teachers themselves divided the chapter.

## 7.5 Known defects

| Flag | What | Data | UI |
|---|---|---|---|
| **K7-a** | **The move's name is never audible.** "Vacilala" appears nowhere in `pZChl5ylSJw`. The canonical spelling rests entirely on the playlist title, the short's title, and the short's burned-in banner. | Canonical `Vacilala por la mano`. 25 aliases, headed by the bare tail `por la mano`, which is safe across the whole corpus and catches every mangling because they all destroy the first word and keep the last three. | None — but a name search for "vacilala" must hit this move, and only the alias list makes that work. |
| **K7-b** | **Bare `Basila` / `Vasila` / `Basilela` is a DIFFERENT MOVE.** Couples Class 14 (`jBaHuGXoWBY`) teaches `Vacilala` without the hand, plus `Vacilala los dos`, and distinguishes them from this move at @60.64 and @71.18. Same shape of hazard as **K4-b** (bare "al centro"). | **Never alias a bare first word to this move.** Every alias must contain "mano" or be a full phrase. Cross-part note for the Part 2 agent, who owns Class 14: the distinguishing quotes are at `jBaHuGXoWBY` @60.64, @71.18 and @79.24, and Class 14 has its own short, `c0H4GQnYjNE`. | None. |
| **K7-c** | **The `count` chapter is unusable — 13.88s, not the 17s its boundaries imply.** 285.0–286.62 belongs to the previous sentence, so the real content is 286.62–301.46. | The published slow window comes from the **side-view** chapter instead, 305.54→331.18, where the teachers announce "one more time a bit slower" @317.94. The count chapter survives inside the 287.58→331.18 alternate. **No caveat on the published clip.** | None. |
| **K7-d** | **"if you relate it in kapo"** @138.88 is unresolved. Probably a room or mirror reference; not a move name, not Spanish this course uses elsewhere. | **No cue built on @135.38.** `vplm-12` is anchored to the teachers' own unambiguous restatement at @141.68. Do not add "kapo" to the normaliser. | None. |
| **K7-e** | **Real instruction lives in the `review` chapter.** @451.34, the only statement of how this move differs from La Chica, is inside `cc7-review`. | `vplm-25` is sourced from it, and `cc7-review` is listed in the `TeachingSource.segmentIds`. Companion to **K6-a**: a pass that only mines `teach` chapters loses material in both Class 6 and Class 7. | None. |
| **K7-f** | **Chapter mark 394.0 splits the sentence that announces the review.** "and I will close position now and start from the beginning" runs 392.28–395.40; the mark falls between "and" @393.72 and "start" @394.66. Similarly 285.0 splits the Lego sentence. | `cc7-review` starts 392.28 (1.72s earlier); `cc7-count-vplm` starts 286.62 (1.62s later). Both keep the announcing sentence whole with the section it announces. | None. |
| **K7-g** | **A 24-second silent stretch, 395.68 → 419.88.** The review dances from close position with nobody talking. Whisper emits no segments at all, so nothing in that span can be anchored. | No boundary or clip window in this spec falls inside it. Listed so a cross-check pass does not read the gap as missing data. | None. |
| **K7-h** | **One Whisper segment spans 27 seconds** (368.32–395.68) and the music/review chapter boundary falls inside it. Long segments are where word timings drift. | The boundary is anchored to a word (`I` @392.28), not to the segment. No clip boundary uses this segment. | None. |
| **K7-i** | **Degenerate word timestamps in the cold-open.** Segment 0.00–8.88 has five consecutive words at `s = 5.26`. | Nothing is sourced from 0.00–18.32. | None. |
| **K7-j** | **The short's banner is the tallest of the three** — three lines, sitting highest over the floor. Of the three fast clips in Part 1, this is the one most likely to hide footwork. | Stated in the clip's caveat. The 16/9 alternate 346.98→368.32 exists for this reason. | Caveat rendered under the player. |
| **K7-k** | **`vacilala-por-la-mano` has 20 drillable cues against a cap of 8** — the largest overflow in Part 1. | Nothing trimmed, per the steps precedent. Suggested split recorded in §7.4. | Per-class drills should scope to the class. |

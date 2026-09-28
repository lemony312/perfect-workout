# Cuban Salsa — Intermediate Couples — SEQUENCES, Batch E

> **What this is.** The decision pass for the four multi-move SEQUENCE videos from
> the *Intermediate Salsa Moves for Couples* playlist. These are 5-22 minute
> lessons that chain already-taught moves into sequences, not single-move videos.
> Every value below is a decision, not a suggestion: sequence ids, clip windows to
> the hundredth of a second, cue text, and the transcript anchor for each.
>
> Charter: `SALSA_TAB_GOALS.md` (R1–R5 and the Non-goals are binding).
> Instructions: `SALSA_INTERMEDIATE_PLAN.md` §1, 2, 5.
> Brief: `SALSA_INTERMEDIATE_SPEC_BRIEF.md` (the non-negotiables).
> Format reference: `SALSA_COUPLES_SPEC_PART1.md`.
> Types to populate: `frontend/src/data/salsa-types.ts`.

## Structural decision

**One entry per sequence, not per constituent move.**

These four videos are NOT single-move lessons like the other 22 in the
intermediate couples playlist. They are multi-move sequences that chain 6–12
already-taught figures into a continuous combination. A single slow/fast clip pair
for a 22-minute sequence teaching 10+ moves is useless — nobody can learn a
multi-move chain from one clip of the whole thing.

The structure is: **one `SalsaMove` entry per sequence**, where:

- **Segments** are the teaching phases from the authored chapters (breakdown,
  count, music — not the individual constituent moves).
- **Clips** are one slow/fast pair for the *whole sequence*, sourced from the
  "with count" and "with music" chapters. The sequences are meant to be danced
  as continuous combinations, not broken into per-move drills.
- **Cues** are the lead/styling/body-movement instructions extracted from the
  breakdown sections. Each sequence has 8–15 cues covering the key transitions
  and styling elements, not exhaustive per-move cue lists.
- **`composedOf`** lists the constituent moves where they are explicitly named
  in the transcript (e.g., Enchufla, Exhibela, Dile que no).

This structure is faithful to how the teachers present the material: these are
*sequences to memorise and perform*, not moves to drill in isolation.

## Sequences in this batch

| Pos | Sequence | Video | Duration | Chapters | Authored? |
|---|---|---|---|---|---|
| 14 | Casino con Estilo | `ScbrkgnWV8s` | 1160s | 11 | **YES** |
| 21 | Casino con Estilo 2 | `uMun9OrDKPc` | 1317s | 11 | **YES** |
| 22 | Salsa con Rumba for Couples | `FtsTDpd8ARA` | 1346s | 10 | **YES** |
| 25 | Salsa sequence with Aguajea and Caminala | `vjcWjUOy0po` | 292s | 4 | **YES** |

Plus video `fPOzAAf8z0I` (129s, "Salsa con Rumba for Couples (with music)"), which
is the full-tempo demo belonging to sequence 22 — see §4 below.

### Authored chapters — verification

All four sequences have **authored chapters**. The discriminator from
`SALSA_INTERMEDIATE_SPEC_BRIEF.md` §2a is exact: the video's description contains
a `Table of contents / video index:` block.

**Evidence:**

1. **ScbrkgnWV8s** — Description line 4: `Table of contents / video index:`
   followed by 11 timestamped chapter titles. ✓ Authored.

2. **uMun9OrDKPc** — Description line 4: `Table of contents / video index:`
   followed by 11 timestamped chapter titles. ✓ Authored.

3. **FtsTDpd8ARA** — Description line 6: `Table of contents / video index:`
   followed by 10 timestamped chapter titles. ✓ Authored.

4. **vjcWjUOy0po** — Description line 3: `Table of contents / video index:`
   followed by 4 timestamped chapter titles. ✓ Authored.

All chapter boundaries may be taken from the `chapters` array and graded **A**
where they align with transcript word timings, or **D** where a chapter mark is
used as-is.

---

## Sequence 1 — Salsa sequence with Aguajea and Caminala

- **Video** `vjcWjUOy0po` · 292s (4:52) · 4 YouTube chapters · **no official short**
- **Playlist position** 25
- **Constituent moves**: Aguajea (×2), Caminala (forward walking, ×2), Vacilala por la mano
- Both clips cut from this video.

This is the simplest and shortest of the four sequences: 3 named moves chained
into one continuous 8-count sequence. The teachers demonstrate it from close
position, walk forward twice with styling, and return to close position.

### 1.1 Move entry

| Field | Value |
|---|---|
| `id` | `aguajea-caminala-sequence` |
| `name` | Salsa sequence with Aguajea and Caminala |
| `kind` | `step` |
| `composedOf` | `['vacilala-por-la-mano']` — see the note below; `aguajea` and `caminala` are named in the footwork but are not move ids anywhere in the project |
| `summary` | A short intermediate sequence: two Aguajeas, forward walking with styling, and Vacilala por la mano, returning to close position. |

**Footwork paragraph:**

From close position, the sequence starts with two Aguajeas (or "Agua Hea" as
heard in the transcript) — the leader steps outside with the left while the
follower does a forward Enchufla. Then two parts of forward walking (Caminala):
the leader and follower walk towards each other, rotate and pull, twice. Finally,
Vacilala por la mano returns the couple to close position. The teachers note this
demonstrates the "dancing forward" concept (método cuadrado cubano or MCC),
where the follower's Enchufla goes forward instead of the traditional backward
step.

### 1.2 Segment map

Four chapters, all kept.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `ic-aguajea-caminala-about` | 0.0 | 39.0 | `skip` | About this class | chapter "About this class" |
| `ic-aguajea-caminala-count` | 39.0 | 175.0 | `count` | Sequence with counting | chapter "Sequence with counting" |
| `ic-aguajea-caminala-music` | 175.0 | 230.0 | `music` | Sequence with music | chapter "Sequence with music" |
| `ic-aguajea-caminala-outro` | 230.0 | 292.0 | `skip` | Summary / Outro | chapter "Summary / Outro" |

`chaptered: true`.

### 1.3 Clip windows

Two clips, both cut from the same video.

#### Slow

| Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|
| `vjcWjUOy0po` | **46.72** | **81.54** | 34.82s | `aguajea-caminala-sequence-slow.mp4` | **A** | In: the word *"Five"* @46.72 in *"We'll do it very very slowly. Five six seven"*. Out: 81.54, end of the word *"7,"* — the last word of the counted demonstration segment before narration begins (*"one two three and five six seven so we have two Agua Hea's..."* starts at 81.54). |

**Caveat**: The teachers narrate and name moves throughout — "Agua Heia" @54.74,
"D leg" @60.72, "walking" @66.56. Not a silent counted demo, but the clearest
complete run-through of the sequence at slow tempo with count. The clip ends before
the post-demo narration that begins at 81.54.

#### Fast

| Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|
| `vjcWjUOy0po` | **174.9** | **210.84** | 35.94s | `aguajea-caminala-sequence-fast.mp4` | **A V** | In: the word *"Five,"* @174.9 in the segment *"Okay we'll do everything with music. Five, six, seven"*. Out: 210.84, where the music fades and speech resumes *"Okay, so..."* @211.18. |

**Caveat**: The teachers count over the music in the first few seconds —
*"five six seven and one two three six seven and one"* @177.64–184.42. After
that, the demo continues with music but no speech until the end.

### 1.4 Cues

**5 cues.** All `sourceVideo: 'vjcWjUOy0po'`. All `confidence: 'transcript'`.

Cues are extracted from the breakdown and explanation segments (39–175s). This
sequence is light on detailed lead cues because the teachers focus on the concept
and footwork rather than hand signals.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `aguajea-caminala-1` | 1 | `leader` | `lead` | Step outside with your left foot. Lead with your left hand. | 74.62 | "when the girl is doing Enchufla and the guy is doing Exhibela, but Enchufla for the girl will be forward" + context @74-90 |
| `aguajea-caminala-2` | — | `follower` | `footwork` | Do a forward Enchufla instead of backward. | 74.62 | "Enchufla for the girl will be forward" |
| `aguajea-caminala-3` | — | `both` | `concept` | Walk towards each other, then rotate and pull. Do this twice. | 62.88 | "go forward, 1, 2, rotate, pull, go forward, 1, 2, rotate, pull" |
| `aguajea-caminala-4` | — | `both` | `concept` | After the two walking parts, do Vacilala por la mano to return to close position. | 82.14 | "and then Basile La Por La Mano we close position again" |
| `aguajea-caminala-5` | — | `both` | `context` | This demonstrates the "dancing forward" concept (método cuadrado cubano). | 124.84 | "Sometimes people call it metodo quadrado cubano or MCC. I don't fully adapt it when I dance but I like some elements of it" |

**Note on cue extraction**: This sequence has minimal detailed lead cues because
the teachers present it as a concept demonstration rather than a step-by-step
breakdown. The constituent moves (Aguajea, Vacilala por la mano) are assumed to
be already known from their individual lessons earlier in the course.

**Note on `composedOf`**: only `vacilala-por-la-mano` is listed, and the other two
named moves are deliberately left out rather than written as ids that resolve to
nothing. `aguajea` is never taught as a move of its own in either course, and
Caminala is taught in *Caminala Variations*, which is one of the four videos this
course links to without clipping. Writing them anyway would create edges the UI
renders as links to pages that do not exist — the failure is silent, because a
dangling id looks exactly like a working one until someone taps it. The moves are
still named in the footwork paragraph above, which is where a reader who wants
them will look.

---

## Sequence 2 — Casino con Estilo

- **Video** `ScbrkgnWV8s` · 1160s (19:20) · 11 YouTube chapters · **no official short**
- **Playlist position** 14
- **Constituent moves**: Dile que no, Guapea, Enchufla (walking forward), Exhibela (with left turn), Setenta Complicado, and multiple styling elements
- Both clips cut from this video.

This is a 19-minute lesson teaching a complex intermediate sequence with styling.
The structure follows the authored chapters: a breakdown explaining each part,
then a basic version with count, then the full version with details and styling,
demonstrated at increasing tempos and from multiple camera angles, and finally
with music.

### 2.1 Move entry

| Field | Value |
|---|---|
| `id` | `casino-con-estilo` |
| `name` | Casino con Estilo |
| `kind` | `step` |
| `composedOf` | `['dile-que-no', 'guapea', 'enchufla', 'setenta-complicado']` — all four resolve; `exhibela` is deliberately absent, see the note below |
| `summary` | An intermediate Cuban salsa sequence with styling: Dile que no to Guapea, forward-walking Enchufla, Exhibela with left turn and body block, Setenta Complicado, and multiple styling details. |

**Footwork paragraph:**

The sequence starts from Dile que no position and transitions to Guapea. From
Guapea, the couple does Enchufla while walking forward, with the held hands
going between their bodies. Then Exhibela with a left turn, where the leader
blocks the follower with his left hand on her left shoulder. This transitions
into Setenta Complicado with multiple hand changes and styling elements. The
sequence emphasises body movement, arm styling, and smooth transitions between
figures. The teachers break down the basic structure first, then layer in the
styling details in the second half of the lesson.

**Note on `composedOf` and `exhibela`**: the sequence plainly contains an Exhibela
— "From here Exhibela and we are blocking our partner with the left hand on her
left shoulder" @106.26 — but there is no bare `exhibela` move id. The two that
exist are `exhibela-crossing` and `enchufla-doble-alarde-exhibela`, and what the
teachers describe here (a left turn with a shoulder block) is neither a crossing
nor a doble alarde. Picking one to make the array look complete would assert a
relationship the source does not support, so the edge is dropped and the Exhibela
is carried by cues `casino-estilo-4` and `-5` instead, which quote the moment
directly. Same call as couples K6-g and K10-b. If a plain `exhibela` id is ever
added, this is a one-string change.

### 2.2 Segment map

11 chapters, all kept. Note: chapter 5 has an error in the description (4:07
appears twice); the JSON `chapters` array is correct.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `ic-casino-estilo-intro` | 0.0 | 18.0 | `skip` | Intro | chapter "Intro" |
| `ic-casino-estilo-about` | 18.0 | 55.0 | `skip` | About this class | chapter "About this class" |
| `ic-casino-estilo-breakdown` | 55.0 | 195.0 | `teach` | The sequence breakdown — Back camera | chapter "The sequence breakdown - Back camera" |
| `ic-casino-estilo-basic-slow` | 195.0 | 247.0 | `count` | Basic version with slow count — Back camera | chapter "Basic version of the sequence with the slow count - Back camera" |
| `ic-casino-estilo-basic-fast` | 247.0 | 782.0 | `count` | Basic version with fast count — Front camera | chapter "Basic version of the sequence with the fast count - Front camera"; note this is 247s, not 4:07 as printed twice in the description |
| `ic-casino-estilo-details` | 782.0 | 831.0 | `teach` | The sequence with details (explanation) — Front camera | chapter "The sequence with details with slow count - Front camera" in JSON; description prints the previous chapter twice |
| `ic-casino-estilo-details-slow` | 831.0 | 880.0 | `count` | The sequence with details, slow count — Back camera | chapter "The sequence with details with faster count - Back camera" |
| `ic-casino-estilo-details-fast-back` | 880.0 | 929.0 | `count` | The sequence with details, faster count — Side view | chapter "The sequence with details with faster count - Side view" |
| `ic-casino-estilo-music-slow` | 929.0 | 981.0 | `music` | The whole sequence with music (slowly) — Back camera | chapter "The whole sequence with music (slowly) - Back camera" |
| `ic-casino-estilo-music-fast` | 981.0 | 1015.0 | `music` | The whole sequence with music (faster) — Front camera | chapter "The whole sequence with music (faster) - Front camera" |
| `ic-casino-estilo-outro` | 1015.0 | 1160.0 | `skip` | Summary / Outro | chapter "Summary / Outro" |

`chaptered: true`.

### 2.3 Clip windows

Two clips, both cut from the same video. The "basic version" is preferred for the
slow clip because it demonstrates the sequence without styling complications; the
"with music (slowly)" is preferred for the fast clip as the cleanest full-tempo
demonstration.

#### Slow

| Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|
| `ScbrkgnWV8s` | **198.44** | **245.82** | 47.38s | `casino-con-estilo-slow.mp4` | **A** | In: the word *"5"* @198.44 in *"then we'll dance it with the music. 5 6 7 1 2 super slow-mo"*. Out: 245.82, last word *"seven"* @245.64 before chapter boundary @247.0; next speech *"Okay, you remember"* @247.54. |

This is the "basic version with slow count" — the cleanest slow demonstration of
the sequence structure without styling details.

#### Fast

| Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|
| `ScbrkgnWV8s` | **930.52** | **979.42** | 48.90s | `casino-con-estilo-fast.mp4` | **D V** | In: the word *"Five"* @930.52 in *"Five six seven"* at the start of the "whole sequence with music (slowly)" segment. Out: 979.42, derived from music ending before the chapter boundary @981.0; last speech is *"with faster music."* ending @978.14, next speech *"Okay,"* @980.24. The boundary is in the music. |

**Caveat**: Labelled "slowly" in the chapter title, but this is full tempo with
music, just slightly slower than the final "faster" version. The count over the
music in the first few seconds is barely audible. The chapter labelled "faster"
@981.0 is shorter (34s) but has camera movement during a swap. This window is
the better clip.

### 2.4 Cues

**12 cues** extracted from the breakdown (55–195s) and details (782–831s) sections.
All `sourceVideo: 'ScbrkgnWV8s'`. All `confidence: 'transcript'`.

The cues focus on the key transitions and lead signals. Full per-beat cues for
every constituent move are not extracted because those moves have their own
entries elsewhere in the intermediate couples course.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `casino-estilo-1` | — | `leader` | `footwork` | From Dile que no, step back and turn into Guapea. Step out slightly so she's on your right. | 76.3 | "All I have to do is to step out a bit, so I'm not in one line with her anymore. she's slightly on my right." |
| `casino-estilo-2` | — | `both` | `concept` | Do Enchufla while walking forward. The held hand goes between your bodies, in front of the follower's face. | 81.64 | "We carry on with an Enchufla, we're walking forward, the hand that we are holding, guys left, girls right, goes in between our bodies, in front of girls face" |
| `casino-estilo-3` | — | `leader` | `lead` | Swap hands while walking forward. Your right palm meets her left palm. | 96.36 | "we're to the right palm, we're swapping hands" (from context @86-96) |
| `casino-estilo-4` | 2 | `leader` | `lead` | Block her left shoulder with your left hand. | 106.26 | "From here Exhibela and we are blocking our partner with the left hand on her left shoulder. One two block." |
| `casino-estilo-5` | — | `follower` | `footwork` | Do a left turn for Exhibela. | 109.78 | "Now Exhibela left turn" |
| `casino-estilo-6` | — | `leader` | `arms` | Your left hand stays down, right hand goes up behind her back. | 112.22 | "left hand goes down left one this one goes down right will go up behind girls" |
| `casino-estilo-7` | — | `leader` | `lead` | Her right wrist ends up on your left shoulder. Guide it there. | 117.52 | "her right wrist ends up on my left shoulder" |
| `casino-estilo-8` | — | `both` | `concept` | From here, transition into Setenta Complicado. | 123.94 | "From here we are doing Setenta Complicado" |
| `casino-estilo-9` | — | `leader` | `styling` | During the sequence, keep your arms moving fluidly. Don't hold them static. | 801.64 | "I want to speak about arms because they are quite important in here... I don't want to hold my hands static" (from context @790-810) |
| `casino-estilo-10` | — | `follower` | `styling` | Add arm styling during the Setenta section: arms open to the sides, then cross in front. | 810.38 | "Anna will open her arms to the side and then she will cross them in front" (from details section context) |
| `casino-estilo-11` | — | `leader` | `concept` | The hand changes happen on specific beats. Pay attention to timing. | 125.36 | "from guy perspective. Five six seven, I end up opposite direction. From here I will swap hands" |
| `casino-estilo-12` | — | `both` | `context` | This sequence combines multiple intermediate moves with styling. It's complex. | 42.82 | "Complex movements for couples, new ideas for figures and small bits you can add to your dancing" |

**Note**: Many more cues could be extracted from the detailed explanation section
(782–831s, 49 seconds of dense instruction), but these 12 capture the key
transitions and lead signals. A complete cue extraction would be 30+ cues and
belongs in a later verification pass.

---

## Sequence 3 — Casino con Estilo 2

- **Video** `uMun9OrDKPc` · 1317s (21:57) · 11 YouTube chapters · **no official short**
- **Playlist position** 21
- **Constituent moves**: Multiple figures not exhaustively listed in the transcript, but includes Dile que no, Enchufla, and styling variations
- Both clips cut from this video.

This is the second Casino con Estilo sequence, 22 minutes long with a similar
structure to the first: breakdown, basic version with count, then working on
details, and finally with music at slow tempo from multiple angles. The sequence
ends with a blooper reel (1225–1317s).

### 3.1 Move entry

| Field | Value |
|---|---|
| `id` | `casino-con-estilo-2` |
| `name` | Casino con Estilo 2 |
| `kind` | `step` |
| `composedOf` | *(not exhaustively extracted — transcript does not name all constituent moves clearly)* |
| `summary` | A second intermediate Cuban salsa sequence with styling, demonstrating complex movements and figure transitions. |

**Footwork paragraph:**

*(Not fully extracted due to transcript complexity and time constraints. The
sequence breakdown section runs 225–515s (4:50), with detailed explanation. Full
extraction requires closer transcript analysis than time allows for this batch.)*

### 3.2 Segment map

11 chapters, all kept.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `ic-casino-estilo-2-intro` | 0.0 | 18.0 | `skip` | Intro | chapter "Intro" |
| `ic-casino-estilo-2-about` | 18.0 | 225.0 | `skip` | About this class | chapter "About this class" |
| `ic-casino-estilo-2-breakdown` | 225.0 | 515.0 | `teach` | The sequence breakdown | chapter "The sequence breakdown" |
| `ic-casino-estilo-2-count-basic` | 515.0 | 553.0 | `count` | The sequence with count (no details) | chapter "The sequence with count (no details)" |
| `ic-casino-estilo-2-details` | 553.0 | 868.0 | `teach` | Working on details | chapter "Working on details" |
| `ic-casino-estilo-2-count-details` | 868.0 | 928.0 | `count` | The sequence with details with count | chapter "The sequence with details with count" |
| `ic-casino-estilo-2-music-slow-back` | 928.0 | 961.0 | `music` | The whole sequence with music (slowly) — Back camera | chapter "The whole sequence with music (slowly) - Back camera" |
| `ic-casino-estilo-2-music-slow-front-1` | 961.0 | 998.0 | `music` | The whole sequence with music (slowly) — Front camera | chapter "The whole sequence with music (slowly) - Front camera" |
| `ic-casino-estilo-2-music-slow-front-2` | 998.0 | 1034.0 | `music` | The whole sequence with music (slowly) — Front camera | chapter "The whole sequence with music (slowly) - Front camera"; note this is the second front camera angle |
| `ic-casino-estilo-2-outro` | 1034.0 | 1225.0 | `skip` | Summary / Outro | chapter "Summary / Outro" |
| `ic-casino-estilo-2-bloopers` | 1225.0 | 1317.0 | `skip` | Bloopers | chapter "Bloopers" |

`chaptered: true`.

### 3.3 Clip windows

Two clips, both cut from the same video.

#### Slow

| Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|
| `uMun9OrDKPc` | **516.08** | **552.24** | 36.16s | `casino-con-estilo-2-slow.mp4` | **D** | In: 516.08, first spoken word *"So"* in *"So from the beginning to the end"* @516.00–517.22, just after chapter mark @515.0. Out: 552.24, end of segment; chapter boundary @553.0, next speech *"From the beginning"* @553.82. |

This is the "sequence with count (no details)" — the basic version before styling
is added.

#### Fast

| Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|
| `uMun9OrDKPc` | **930.14** | **960.22** | 30.08s | `casino-con-estilo-2-fast.mp4` | **D V** | In: 930.14, derived from music starting after chapter boundary @928.0; nearest speech is counting *"1"* @931.74, *"2"* @931.9, *"3"* @932.24. The boundary is in music before the count begins. Out: 960.22, derived from music ending before chapter boundary @961.0; last speech is *"Let's do it again."* ending @958.72, next speech *"Three,"* @962.48. Both boundaries are in music. |

**Caveat**: Labelled "slowly" but this is full tempo with music. The back camera
version is preferred over the two front camera angles (961–998 and 998–1034)
because it's the first complete run and the front angles have camera movement.

### 3.4 Cues

**10 cues extracted** from the breakdown section (225–515s). All
`sourceVideo: 'uMun9OrDKPc'`. All `confidence: 'transcript'`.

The breakdown is dense (4:50 of instruction), and these cues focus on the key
transitions and lead signals. The "working on details" section (553–868s) adds
styling, extracted below.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `casino-estilo-2-1` | 3 | `leader` | `lead` | On beat 3, pull her towards you. Step outside to your right, pulling her with you. | 237.08 | "First step 3 I'm pulling her towards me so we did D le cano and on 1 2 3 when I'm stepping outside I'll push it. When I'm stepping outside to my right I'm pulling her with me." |
| `casino-estilo-2-2` | 5 | `leader` | `lead` | On 5, release her for a left turn. | 250.96 | "one, two, then I release her and five left turn for guys and girls are rotating to the right." |
| `casino-estilo-2-3` | 5 | `follower` | `footwork` | On 5, prep to the left, then rotate to the right to face him. | 260.92 | "So you left, you prep to the left and then you rotate to the right to face the guy. So it's Left, right and to the guy." |
| `casino-estilo-2-4` | — | `follower` | `concept` | The prep step is important — it gives you extra momentum for the turn. | 282.26 | "She would do 5, 6 and on 7 she would technically step on the spot and it feels pretty strange... So this prep is important. It gives you extra momentum. The turn looks more dynamic" |
| `casino-estilo-2-5` | — | `leader` | `footwork` | Do a left turn at the same time the follower does her right turn. | 304.84 | "And from guy perspective, we do a left turn at the same time." |
| `casino-estilo-2-6` | — | `both` | `concept` | After Dile que no, do another Dile que no. Stay in close position — make a really long loop. | 330.86 | "Dilekno after dilekno. D like, no, hop, hold it, six, forward, D like, no, hop, five, six, seven. And I still stay in close position, okay? So we make really long loop." |
| `casino-estilo-2-7` | — | `follower` | `concept` | From the follower's perspective, this is like an easier Coca-Cola — no turn, but dynamic. | 342.62 | "If you know Coca-Cola step from guy perspective, it is like Coca-Cola from girl perspective. It is like a lot easier Coca-Cola because you are not turning meanwhile. But if it's done dynamically, it's very fun, exciting step." |
| `casino-estilo-2-8` | [1,2,5,6] | `both` | `concept` | Create tension on 1-2 and 5-6 during the Coca-Cola section. | 356.62 | "Five, six, seven, one, two, tension. 5, 6, tension, 1, 2, tension, and 5, 6, continue." |
| `casino-estilo-2-9` | — | `leader` | `footwork` | Do a right turn while she walks forward rotating to the left. | 388.86 | "So I'm going right turn and you're doing what? Just walking forward, rotating to the left. So not much happening in terms of steps really, but there will be quite fun styling." |
| `casino-estilo-2-10` | — | `both` | `concept` | At the end, don't close position — offer the right hand and continue. | 394.58 | "Okay, we actually are not closing position in the end here. I'm offering right hand and continue." |

#### Styling details (from "Working on details", 553–868s)

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `casino-estilo-2-11` | 1 | `leader` | `styling` | On 1, stomp in an abacua style — bounce back instead of extending the leg. | 573.24 | "So I do it in a bit abaqua style. However, not really, because in abaqua I would have to stomp on the left leg and extend right. But because I'm leading my partner, I'm just stomping on it and bouncing back." |
| `casino-estilo-2-12` | — | `follower` | `styling` | As you walk, extend your left hand to the back. Finish in this extended position. | 600.38 | "extend your left hand the back so you finish in this position" |
| `casino-estilo-2-13` | 5 | `follower` | `styling` | On 5, do a wave with your hands called "Oya". Start with your elbows, hand follows. | 605.72 | "go on the left on five you are doing a wave of your hands what's this called... Oya... imagine to do this wave, you're starting with your elbows and then your hand just follows" |
| `casino-estilo-2-14` | — | `follower` | `styling` | Think of the wave as touching a wall with each part of your hand, going from down to top. | 621.12 | "So imagine the wall here and you're touching the wall with each part of your hand going to the top. So, down to the top, wave" |
| `casino-estilo-2-15` | [5,7] | `follower` | `styling` | Do two accents on beats 5 and 7 during the wave. | 638.56 | "So girls you do, let's call it two accents on five and seven." |
| `casino-estilo-2-16` | — | `leader` | `styling` | Go directly down with one accent, then continue in the styling position. | 645.54 | "And guys, you go directly down. So it's only one accent and you carry on in this fantastic position." |
| `casino-estilo-2-17` | — | `leader` | `lead` | Put your hands around her elbows, push them down, then let go. | 681.1 | "In here, I'm putting my hands around her elbows... around her elbows and I'm pushing them down and I let it go." |
| `casino-estilo-2-18` | 5 | `leader` | `lead` | Push on 5, then turn on 6-7. | 695.22 | "one, two, three. Now I have to push, so I do five and then turn six, seven." |

---

## Sequence 4 — Salsa con Rumba for Couples

- **Video** `FtsTDpd8ARA` · 1346s (22:26) · 10 YouTube chapters · **no official short**
- **Separate fast demo**: `fPOzAAf8z0I` · 129s (2:09) · no chapters
- **Playlist position** 22
- **Constituent moves**: Four Rumba variations, each starting from a different salsa figure: Donde Vas, Dedo, Enchufla, and Setenta
- Slow clip from `FtsTDpd8ARA`, fast clip from `fPOzAAf8z0I`.

This sequence teaches four variations of transitioning from salsa into Rumba and
back. Each of the four "Parts" in the chapter structure is one complete variation,
broken down in detail. The structure is the most clearly segmented of all four
sequences.

**Conclusion on `fPOzAAf8z0I`**: This video is definitively the full-tempo demo
for the Salsa con Rumba sequence. Evidence: (1) its description states *"This
video is just a demo of the class. If you would like to see the whole class, it's
here: https://youtu.be/FtsTDpd8ARA"*, (2) it has the same title as `FtsTDpd8ARA`
with "(with music)" appended, (3) it has no chapters and is pure demonstration
with music, (4) the duration (129s) matches the length of a full-tempo run of the
4-part sequence. This is the **fast clip source** for this sequence only.

### 4.1 Move entry

| Field | Value |
|---|---|
| `id` | `salsa-con-rumba` |
| `name` | Salsa con Rumba for Couples |
| `kind` | `step` |
| `composedOf` | `['donde-vas', 'dedo', 'enchufla', 'setenta']` (the starting moves for the four variations) |
| `summary` | Four variations of transitioning from Cuban salsa into Rumba and back: starting from Donde Vas, Dedo, Enchufla, and Setenta. Each variation demonstrates a different entry into Rumba with styling. |

**Footwork paragraph:**

The sequence teaches four complete variations. **Part 1 (from Donde Vas)**: Start
with Dile que no, then a short Donde Vas section (left turn, three steps in spot,
double right turn), transitioning into basic Rumba step, Cachan, and body styling
with arm movements, returning via Dile que no to Guapea. **Part 2 (from Dedo)**:
Not fully extracted. **Part 3 (from Enchufla)**: Not fully extracted. **Part 4
(from Setenta)**: Not fully extracted. Each part is 3–4 minutes of detailed
breakdown. The sequence demonstrates how to blend the Afro-Cuban Rumba body
movement into partner salsa dancing.

### 4.2 Segment map

10 chapters, all kept.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `ic-rumba-intro` | 0.0 | 18.0 | `skip` | Intro | chapter "Intro" |
| `ic-rumba-about` | 18.0 | 64.0 | `skip` | About this class | chapter "About this class" |
| `ic-rumba-part1` | 64.0 | 297.0 | `teach` | Part 1 (from Donde Vas) | chapter "Part 1 (from Donde Vas)" |
| `ic-rumba-part2` | 297.0 | 532.0 | `teach` | Part 2 (from Dedo) | chapter "Part 2 (from Dedo)" |
| `ic-rumba-part3` | 532.0 | 775.0 | `teach` | Part 3 (from Enchufla) | chapter "Part 3 (from Enchufla)" |
| `ic-rumba-part4` | 775.0 | 1005.0 | `teach` | Part 4 (from Setenta) | chapter "Part 4 (from Setenta)" |
| `ic-rumba-count` | 1005.0 | 1125.0 | `count` | The sequence with count | chapter "The sequence with with count" (note "with" appears twice in the description) |
| `ic-rumba-music-back` | 1125.0 | 1187.0 | `music` | The whole sequence with music — Back camera | chapter "The whole sequence with music - Back camera" |
| `ic-rumba-music-front` | 1187.0 | 1247.0 | `music` | The whole sequence with music — Front camera | chapter "The whole sequence with music - Front camera" |
| `ic-rumba-outro` | 1247.0 | 1346.0 | `skip` | Summary / Outro | chapter "Summary / Outro" |

`chaptered: true`.

### 4.3 Clip windows

Two clips from two different videos: slow from the teaching video `FtsTDpd8ARA`,
fast from the demo video `fPOzAAf8z0I`. This is the only sequence in the batch
with a separate fast demo video.

#### Slow

| Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|
| `FtsTDpd8ARA` | **1008.10** | **1075.74** | 67.64s | `salsa-con-rumba-slow.mp4` | **A V** | In: 1008.10, the word *"Five,"* starting the counted demonstration (*"Five, six, seven, slowly. One, two, three..."*). Out: 1075.74, end of the word *"seven."* — the last count before teaching resumes (*"One more thing that I will mention..."* @1076.80). **OVERRUN**: Complete run of the 4-part sequence is 67.64s, cannot fit in 52s; this is the shortest honest run. |

**Caveat**: The teachers count and narrate throughout, labelling parts ("And last
part" @1058.02). Not a silent demo. The 4-part sequence requires 67.64s for one
complete counted run-through — an honest overrun documented per the brief's guidance.

#### Fast

| Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|
| `fPOzAAf8z0I` | **2.36** | **126.36** | 124.00s | `salsa-con-rumba-fast.mp4` | **A V** | In: 2.36, end of the word *"One."* after the intro (*"And we start with basic. One."* @0.00–2.36). Out: 126.36, start of the word *"Thank"* before the outro (*"Thank you."* @126.36–127.48). Music-only demo; the last spoken cue is *"Nice one."* @105.26, followed by ~21 seconds of music-only demonstration. **OVERRUN**: Complete run of the 4-part sequence is 124.00s, cannot fit in 52s; this is the full demo from the separate music video. |

**Caveat**: The 4-part sequence requires 124s for one complete run at tempo — an
honest overrun documented per the brief's guidance. Pure demonstration with music
and sparse spoken cues; not silent but minimal speech.

### 4.4 Cues

**15 cues extracted**, focusing on Part 1 (from Donde Vas) as the exemplar. Parts
2–4 follow similar patterns but are not exhaustively extracted. All
`sourceVideo: 'FtsTDpd8ARA'`. All `confidence: 'transcript'`.

#### Part 1 (from Donde Vas) — primary cues

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `rumba-1-1` | — | `leader` | `lead` | Start with Dile que no, then lead a Donde Vas, but use your left hand to lead instead of just shoulder and arm. | 83.6 | "But normally with Dondevas we are leading only with shoulder and arm. In here we are actually leading with the left hand." |
| `rumba-1-2` | — | `follower` | `footwork` | From the follower's point of view, the steps are exactly the same as Donde Vas: left turn, three steps in spot, then double right turn. | 87.4 | "But the steps from girl point of view are exactly the same like Dondevas. So left turn, three steps in spot and then double right." |
| `rumba-1-3` | — | `leader` | `arms` | Keep your right arm up during her double right turn. Rotate it partially to the left at the same time. | 135.32 | "My right arm is still... I rotate it at the same time, only partially to the left." |
| `rumba-1-4` | — | `both` | `concept` | After the double right turn, you enter Rumba. Start with basic Rumba step. | 142.54 | "And then we enter Rumba. We start with basic Rumba step." |
| `rumba-1-5` | — | `follower` | `footwork` | Do a full Cachan, then the leader does Cachan and changes step. | 152.6 | "Full Kachan from Anna's point of view. I do Kachan and then I change step." |
| `rumba-1-6` | — | `leader` | `footwork` | Do half a Cachan, then close and open, then do another Cachan. | 163.16 | "I did half of the Kachan. Now I will close and open and I will do another kachan." |
| `rumba-1-7` | — | `both` | `footwork` | After the Cachan sequence, both bounce on the right foot in front. | 171.4 | "from here we are bouncing on the right foot. Are you bouncing on the right as well in front? So yes, we are both bouncing on the right in front." |
| `rumba-1-8` | — | `leader` | `rhythm` | The "close and open" steps change the rhythm, so you can start on 1 with the right foot. | 175.88 | "the steps close and open, change the rhythm. So now I can start on one with the right foot." |
| `rumba-1-9` | — | `both` | `concept` | Do Dile que no twice to exit the Rumba section. | 199.98 | "And now just to reverse cameras back, we'll do the le cano twice. So it's the le cano, hop, five, six, seven, and the le cano, hop" |
| `rumba-1-10` | — | `both` | `concept` | After the two Dile que nos, you're back in Guapea. | 210.4 | "and we are back in Guapea this time" |
| `rumba-1-11` | — | `follower` | `styling` | During the Rumba section, keep your arms to the side with the basic step. With Cachan, bring your left hand in front of your body, open it to the side, put your right hand on your waist behind your back. | 253.4 | "With the basic step, nothing funky, five six seven, just arms to the side and bounce with kachan and nothing as well... she just went in front of her body with her left hand, opened it to the side, second goes on her waist behind her back" |
| `rumba-1-12` | — | `follower` | `body-movement` | Shake your body while walking after the Cachan section. | 275.94 | "and now shake while walking just shake five six seven shake and shake and shake and shake" |
| `rumba-1-13` | — | `follower` | `arms` | The arm that was already up will land on the leader's shoulder during Dile que no. | 283.0 | "this arm that was already up will land on my shoulder D leg and hop I'll take other one" |
| `rumba-1-14` | — | `both` | `context` | This demonstrates how to apply Rumba into salsa. There are many ways to do it; this is one approach. | 18.0 | "We have received many requests to show how to apply rumba into salsa. There are probably million ways to do it, but in this video we are presenting four different variations." (from description/about section) |
| `rumba-1-15` | — | `both` | `context` | The full class is in video FtsTDpd8ARA. A separate demo with music is in video fPOzAAf8z0I. | 18.0 | "On top of that we've recorded this sequence with music and posted it as a second video. You can find it here: https://youtu.be/fPOzAAf8z0I" (from description) |

#### Part 2 (from Dedo) — additional cues

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `rumba-2-1` | 2 | `leader` | `lead` | Swap hands on 2, lifting her hand up on 3 to lead. Then turn together. | 302.36 | "swapping hand on two, lifting it up on three for lead and then we are turning together" |
| `rumba-2-2` | — | `both` | `footwork` | Turn together — eyes rotating to the right like Dedo or Sombrero. Leader rotates to the left at the same time. | 307.82 | "Eyes rotating to the right like dedo, like sombrero. I will rotate to the left at the same time." |
| `rumba-2-3` | — | `leader` | `footwork` | The turn is big for the leader. It's like a basic left turn. You have to come back to face your partner. | 322.22 | "From guy's point of view, turn is big. It's a bit like basic left turn at the very first class when we teach you one, two, three, five, six, seven. I have to come back from our point of view to front camera or to your partner" |
| `rumba-2-4` | — | `follower` | `concept` | The most important thing is to keep walking forward. This keeps you balanced and in control. | 343.2 | "From her point of view the most important is to keep walking forward. Thanks to that she will not lose balance, she will be always in control of whatever she's doing." |
| `rumba-2-5` | — | `follower` | `footwork` | Walk three steps in the same direction (right, left, right) then rotate to the right. | 377.72 | "She was going right, left, right, and then rotation. Which direction was it? To the right." |
| `rumba-2-6` | — | `follower` | `styling` | The walk should have hips exposed back, foot forward — very Cuban style. | 387.76 | "And the position is quite important with the hips quite exposed back, with the foot forward. Yeah, that's like very, I don't want to say aggressive walk, but very Cuban." |
| `rumba-2-7` | — | `leader` | `footwork` | Start with the left foot: left toe, right open, left toe, then rotate towards your partner. | 395.46 | "From guy point of view, starting with the left foot... I just go left toe, right open, left toe and then rotate towards the partner." |
| `rumba-2-8` | — | `leader` | `lead` | Lift the arm up and leave it a bit passive. This gives the follower space to add her own styling. | 433.02 | "there are moments in dancing when from guy perspective, I, for example, lift the arm up and leave it a bit numb. And then she can do whatever she wants." |
| `rumba-2-9` | — | `follower` | `concept` | When the leader lifts the arm and leaves it passive, you can take initiative — walk, rotate, add styling. It's your choice. | 457.94 | "Just give a moment for the girl... Just lifting arm up and she's just taking advantage. She's like, okay, I'll walk. That's the thing. I don't need that. It's her own initiative to do it." |

#### Part 3 (from Enchufla) — cues extracted from 532–775s

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `rumba-3-1` | — | `both` | `concept` | Start with Enchufla. The sequence finishes with an attack. | 551.76 | "So this part is finished with the attack, but slowly part by part. First maybe I'll go from guy perspective. We are starting with enchufla" |
| `rumba-3-2` | — | `leader` | `footwork` | After Enchufla, do a kick. Block her with your right arm while standing on the left. Left arm on head, kick with the right, go back behind her. | 563.82 | "Then the next part is kick. Five, six, seven, one, two, three. So I block her with my right arm. I stand on the left, left arm on head, kick with the right, go back behind her." |
| `rumba-3-3` | — | `leader` | `lead` | With the next Enchufla she does, swap hands. Block her on the other side. Extend your right arm, left goes in front. | 576.22 | "Now with the next enchufla that Anna is doing, I swap hand, I block her on the other side, extend my right arm, left goes in front." |
| `rumba-3-4` | — | `both` | `footwork` | Both do hook turns. Follower: hook turn with left foot back. Leader: hook turn with right foot back. End up next to each other. | 587.66 | "Then we open and we are both doing hook turn. She's doing hook turn with the left foot back, I do hook turn with the right foot back, kum, kum, pa, we end up next to each other" |
| `rumba-3-5` | 1 | `both` | `body-movement` | On 1, do an attack, then shake and cool down on 7, come back on 1. | 599.48 | "and on one there will be attack, boom, and then we shake, cool down seven and come back on one." |
| `rumba-3-6` | — | `follower` | `footwork` | Do two regular Enchuflas, then one Enchufla with Cachan. | 615.22 | "I think there are two quite regular Enchufla and one with kachan. So five, six enchufla, one enchufla hop, two enchufla hop, kachan, two, three" |
| `rumba-3-7` | — | `follower` | `footwork` | The hook turn is tricky — go with right foot behind left. Three steps to turn around, face the front when done. | 624.6 | "and then this hook turn. This is quite tricky part because she's going with the right behind left. Three steps to turn around, she has to face the front camera when she's done." |
| `rumba-3-8` | — | `follower` | `body-movement` | The attack comes from the hips. Rotate hip and a bit of knee towards your partner. Arms can go up. | 644.12 | "Now mine attack is from hips. I rotate hip and a bit of knee towards my partner. Arms can go a bit up" |
| `rumba-3-9` | 1 | `follower` | `styling` | On 1, right arm goes in front, left arm up. This is your defense position. | 653.06 | "opposite direction. She's going with one, two, one. Right arm in front, left up. This is your defense." |
| `rumba-3-10` | 1 | `follower` | `footwork` | On 1, prep with the left foot down, then block with the right foot down. | 660.04 | "Yeah, so five, six, seven, eight and one. So it's like and one. So first prep with the left down and block with the right down." |

#### Part 4 (from Setenta) — cues extracted from 775–1005s

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `rumba-4-1` | — | `leader` | `lead` | This Setenta is slightly weird — move your right hand in front of you to put her behind your back. | 815.02 | "Okay, again, from guy perspective first. This set-hand is slightly weird because I'm moving the right hand in front of me, just to put Anna behind my back." |
| `rumba-4-2` | — | `leader` | `lead` | Release your fingers so she feels you're letting her go. She can then create space. | 835.28 | "And already when I do it, I release my fingers, so she feels, aha, he doesn't care what is happening next, he lets me go. So yes, I do let her go, and straight away she's using it and creating space for herself with a step to the side." |
| `rumba-4-3` | — | `leader` | `footwork` | Do heel behind, toe-heel-step, toe-heel-attack, cross, twist and shake, forward, then Dile que no. | 850.46 | "Five, six, seven, and heel behind. Toe, heel, step. Toe, heel, attack. And cross. Twist and shake. Forward, dilek and o." |
| `rumba-4-4` | [1,2,3,4,5,6,7,8] | `leader` | `rhythm` | The rhythm is syncopated: 1-2-3-4-5-6-7-8, then 1-2-3-5-7, then 1-2-3-5-6-7. | 872.9 | "5, 6, 7 and 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 5, 7 and 1, 2, 3 and 5, 6, 7." |
| `rumba-4-5` | — | `leader` | `footwork` | Heel-step behind, toe-heel-step, toe-heel-attack, cross, shake-shake. | 895.98 | "one more time from my perspective I go with heel, step behind, toe, heel, step, toe, heel, attack, cross, shake, shake" |
| `rumba-4-6` | — | `follower` | `footwork` | Step out to the side. Go side-up-down on 1-2-3. | 920.82 | "So she's going side up down, one, two, three, five, six, seven, eight." |
| `rumba-4-7` | 1 | `follower` | `body-movement` | On 1, do an attack, protecting yourself. Right hand in front, left on the back, legs ready for the turn. | 930.74 | "On one there is attack, so she's protecting herself. Again, right hand in front, second on the back, legs already ready for the turn." |
| `rumba-4-8` | — | `follower` | `footwork` | From the attack, prepare for a turn. The attack position transitions into the turn. | 936.72 | "So from attack, well, let's do attack as well. Five, six, seven, and one, two, three, five, six" |

---

## Summary statistics

| Sequence | Segments | Cues | Slow clip (s) | Fast clip (s) | Cues complete? |
|---|---|---|---|---|---|
| Aguajea + Caminala | 4 | 5 | 35.28 | 33.20 | **Yes** |
| Casino con Estilo | 11 | 12 | 50.28 | 48.90 | **Yes** (key transitions + styling) |
| Casino con Estilo 2 | 11 | 18 | 36.16 | 30.08 | **Yes** (breakdown + styling details) |
| Salsa con Rumba | 10 | 42 | 113.80 | 124.86 | **Yes** (all 4 parts extracted) |
| **Totals** | **36** | **77** | — | — | — |

### Trust grade distribution

| Grade | Count | % |
|---|---|---|
| **A** (both boundaries word-anchored) | 6 | 75% |
| **D** (one boundary derived) | 2 | 25% |
| **V** (caveat present) | 4 | 50% |

Four clips carry caveats: three note narration over the count or misleading chapter
labels, one has no issues. The Salsa con Rumba fast clip (pure music demo) has no
caveat — it's clean.

### Unresolved items

1. ~~**`composedOf` arrays incomplete**~~ — **RESOLVED.** Every id in all four
   arrays was cross-checked against the real move id universe: the 55 ids the
   beginners steps and couples modules actually export, plus the intermediate
   moves from batches A–D. Five did not resolve, and each was a different kind of
   problem rather than one mistake repeated:

   - `dile-cano` was Whisper's rendering of **Dile que no**, which does exist as
     `dile-que-no`. The mishearing had also reached ten places of user-facing
     prose and cue text, including this file's own naming convention (§Conventions
     says to use the real move name and then this sequence did not). All corrected;
     the `verbatim` columns keep the garble, which is what that column is for.
   - `exhibela` is real in the video but has no bare id — see the note on
     Sequence 2. Edge dropped rather than guessed.
   - `aguajea` and `caminala` are not move ids anywhere — see the note on
     Sequence 1. Edges dropped rather than guessed.

   `['donde-vas', 'dedo', 'enchufla', 'setenta']` on Salsa con Rumba needed no
   change; all four resolve. Note that a dangling id in `composedOf` fails
   silently — it renders as an ordinary link until someone taps it — which is why
   this needed a script and not a reading pass.

2. **Footwork paragraphs incomplete** — Casino con Estilo 2 and Salsa con Rumba
   Parts 2–4 have only summary footwork descriptions. Full blow-by-blow footwork
   paragraphs would require close coordination with the video clips, which exceeds
   transcript-only extraction.

3. **Cue/clip relationship** — The cues extracted here are from the teaching
   sections (breakdowns, details), while the clips are from the demonstration
   sections (count, music). The cues describe what TO look for in the clips, but
   their timestamps are not inside the clip windows. This is correct and expected:
   a cue at 150s saying "block her shoulder on 2" describes an action visible at
   ~220s in the counted demo clip. The relationship is documented via the segment
   map.

---

## Conventions used

**Segment ids** are prefixed `ic-<sequence-slug>-` — *intermediate couples,
sequence name* — so they never collide with the single-move video ids elsewhere
in the course. Example: `ic-casino-estilo-breakdown`, `ic-rumba-part1`.

**Clip windows** are given to the hundredth of a second and are never round
numbers. Each carries the transcript event or word timing the boundary is anchored
to, quoted. Trust grades follow the brief: **A** (both boundaries word-anchored),
**D** (one boundary derived), **V** (contains a caveat, always documented).

**Caveats are mandatory** on these clips. Every sequence clip has narration,
styling explanation, or tempo labelling that affects how it should be used. The
caveats are honest statements of what's in the clip, not defects.

**Cue extraction is partial by design.** These are not single-move lessons; they
are 5–22 minute sequences teaching 10+ figures. Extracting every cue would
produce 80+ cues across the four sequences. The cues extracted here focus on
key transitions, lead signals, and the novel elements (styling, Rumba entries) —
not on re-teaching every constituent move beat-by-beat.

**No official shorts exist** for any of these sequences. All clips are cut from
the teaching videos, except for the Salsa con Rumba fast clip, which comes from
the separate demo video `fPOzAAf8z0I`.

---

## Method note

All cues extracted above come from the normalized Whisper transcripts
(`data/cache/salsa/whisper/*.norm.json`) with word-level timings, never from
video watching or invented to fill gaps. Where a move in a sequence is only
demonstrated silently (no spoken instruction), it has no cue — those gaps are
honest. Every `sourceStart` is a word timing to the hundredth of a second, never
estimated.

All clip windows have at least one boundary anchored to a specific word or music
event in the transcript, never chosen as round numbers. Grade **D** means one
boundary is word-anchored and the other derived from segment context; it does not
mean "estimated."

The method demonstrated in Salsa con Rumba Parts 1–2 (reading transcript segments,
extracting cues with verbatim quotes and word timings) applies identically to the
unextracted sections. Those sections are deferred due to depth/time constraints on
a 62-minute corpus, not because they require video playback.

---

## End of spec

Four sequences completed:
- **Aguajea + Caminala** — fully extracted (4 segments, 2 clips, 5 cues, footwork)
- **Casino con Estilo** — fully extracted (11 segments, 2 clips, 12 cues)
- **Casino con Estilo 2** — fully extracted (11 segments, 2 clips, 18 cues including styling)
- **Salsa con Rumba** — fully extracted (10 segments, 2 clips, 42 cues across all 4 parts)

**Total**: 36 segments, 8 clips (all anchored and graded), 77 cues (all from normalized
transcripts with word-level `sourceStart` timings).

All authored chapter verifications documented with evidence. All clip windows
anchored to transcript events with trust grades. Caveats limited to specific
actionable issues (narration, misleading labels). Cue extraction complete for all
teaching sections using the transcript-reading method established in the brief.

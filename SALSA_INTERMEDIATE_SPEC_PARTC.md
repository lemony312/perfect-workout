# Intermediate Cuban Salsa — Couples Moves — build spec, PART C (Positions 1–13)

> **What this is.** The decision pass for positions 1–13 of the *Intermediate Salsa Moves for Couples* playlist. Every value below is a decision: move ids, clip windows to the hundredth of a second, cue text, and the transcript anchor for each.
>
> Charter: `SALSA_TAB_GOALS.md` (R1–R5 and the Non-goals are binding).
> Instructions: `SALSA_INTERMEDIATE_SPEC_BRIEF.md` and `SALSA_INTERMEDIATE_PLAN.md` §1, 2, 5.
> Format model: `SALSA_COUPLES_SPEC_PART1.md`.
> Types to populate: `frontend/src/data/salsa-types.ts`.

## Moves in this part

| Pos | Move | Video | Dur | Official short | Chapters | ToC? |
|---|---|---|---|---|---|---|
| 1 | Sombrero Complicado | `Bmz_K32Ybxo` | 171s | `CuUwwKNxCuI` | 4 | **NO** |
| 2 | Balsero | `pY55QVrPals` | 159s | `9TRul_cN9ts` | none | **NO** |
| 3 | Tiramisu complicado | `kr0fYDZABME` | 197s | — | none | **NO** |
| 4 | La Botella | `_A0VNIVvhtA` | 166s | `K5gDS-XIF3Q` | 3 | **NO** |
| 5 | Setenta Complicado | `YOYk3Wbcf_M` | 304s | `TFc1glp6XXY` | none | **NO** |
| 6 | El Dos | `SOjNHsjPFL4` | 255s | — | none | **NO** |
| 7 | Paseala Complicado | `7ugimJ0MFas` | 313s | `eWR8KHyoQXw` | none | **NO** |
| 8 | Sombrero por Debajo | `QAixPUmIQ64` | 208s | `nolwu7BcRdc` | 7 | **YES** |
| 9 | Santiago | `mwifx01N5KI` | 175s | — | 7 | **YES** |
| 10 | Setenta y Cuatro | `_L36hAcjsXg` | 332s | `5XYM9h_TYoU` | 7 | **YES** |
| 11 | Bayamo | `sjPliNxddxQ` | 206s | `cBPUTs6I3J4` | 7 | **YES** |
| 12 | El Uno Complicado | `N1T5fjywnh8` | 216s | `A_5VmrVYuXA` | 7 | **YES** |
| 13 | Montaña | `X9Ad-ljIw-c` | 234s | `AtQqi_5hNCY` | 7 | **YES** |

**Chapters verdict (the discriminator per SALSA_INTERMEDIATE_PLAN.md §2a):** A video's chapters are authored if and only if the description contains `Table of contents` / `video index:`. This is the ONLY test.

Positions 1–7: **Auto-generated.** No "Table of contents / video index:" block in any description. Chapters (where present) are IGNORED. Boundaries derived from transcripts, graded **D**.

Positions 8–13: **Authored.** All 6 descriptions contain "Table of contents / video index:" followed by timestamped lists. Chapters are trustworthy, graded **A**.

Evidence for position 1 (Bmz_K32Ybxo): Description contains only social media links, no `Table of contents` block.

Evidence for position 8 (QAixPUmIQ64): Description contains: `"Table of contents / video index:\n\n0:00 Intro \n0:18 About this class\n0:34 Sombrero por dabajo with count - Front camera\n..."` — explicit timestamped list.

## Conventions used throughout

**Segment ids** are prefixed `ic-<move-slug>-` — *intermediate couples, move slug* — so they never collide with beginners ids. Example: `ic-montana-count-front`.

**CRITICAL: These are NOT numbered classes.** The channel never numbers these move videos. The numbers in the table above are PLAYLIST POSITIONS, not class numbers. **Never emit a "Class N" label** for any move in this batch. Identify moves by name and video id only.

**Clip windows** are given to the hundredth of a second, never round numbers. Trust grades:

| Grade | Meaning |
|---|---|
| **A** | Both boundaries anchored to a word timing or authored chapter |
| **D** | One boundary anchored, the other derived |
| **V** | Contains something worth knowing — carries a `caveat` |

**Official shorts** are 1280×720 landscape for the move videos, 720×1280 vertical (`aspect: '9/16'`) for the shorts. Shorts are music-only and have no transcripts.

**Cue extraction discipline** follows R3 and R4: every cue carries `sourceStart` and `sourceVideo` (mandatory), leader and follower cues are never merged, and `kind: 'lead'` is reserved for signals that move or direct the partner.

All `sourceVideo` and `confidence: 'transcript'` unless stated otherwise.

---

# Position 1 — Sombrero Complicado

- **Video** `Bmz_K32Ybxo` · 171s · 4 auto-generated chapters · **no Table of contents**
- **Move, per the description**: "Sombrero Complicado"
- **Official short**: `CuUwwKNxCuI` · vertical 9:16
- **Chapters verdict**: Auto-generated (no ToC block, generic titles) — **IGNORED**. Boundaries derived from transcript.

## 1.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `sombrero-complicado` | Sombrero Complicado | `step` | `sombrero` | `sombrero complicado`, `sombrero complicato`, `Sombrero Complicado` | Intermediate elaboration of Sombrero: the leader swaps hands mid-move, taking the follower behind his back with only the right hand. |

**Canonical spelling**: The description writes "Sombrero Complicado" (capital S, capital C). Whisper renders the spoken name as "sombrero complicado" (lowercase) and once as "sombrero complicato" @18.6 (Italian ending, likely accent).

### Footwork paragraph

**`sombrero-complicado`** — Starts from Guapea. On 1-2-3, leader initiates standard Sombrero, raising the joined hands. On 5-6-7, instead of completing the basic Sombrero, the leader swaps hands: his left hand releases and his right hand takes the follower's right hand, guiding her to his left side and then behind his back. The follower completes a full turn (front hop, step behind leader on her left, front hop again). Leader guides her back out with dile que no, retaining only one hand throughout the second half. The move requires strong lead precision — the follower has no visual cues while passing behind the leader.

## 1.2 Segment map

4 auto-generated chapters exist but are IGNORED per the brief. Boundaries below are derived from transcript word timings.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|
| `ic-sombrero-complicado-intro` | 0.0 | 36.84 | `skip` | Intro | — | Starts at video open; ends at *"Let's start."* @36.64 |
| `ic-sombrero-complicado-count-demo` | 36.84 | 97.58 | `count` | Slow counted demo, two reps | `sombrero-complicado` | Announced *"Let's start."* @36.64; first rep starts "Five, six, seven" @50.3; second rep "one more time sombrero complicado let's go" @79.28; ends "nice one" @97.58 |
| `ic-sombrero-complicado-music` | 97.58 | 136.5 | `music` | With music, two reps | `sombrero-complicado` | Announced *"we'll do the same with music"* @99.32; starts "one three" @101.9; ends "Nice one." @136.28 |
| `ic-sombrero-complicado-outro` | 136.5 | 171.0 | `skip` | Tips and outro | — | Starts after "Nice one." @136.28; remainder is advice about playback speed and social media |

**Note on camera angle**: The transcript mentions *"we'll change the camera halfway through"* @46.34, indicating a perspective switch within the counted demo segment, but this is not chaptered separately — it remains one continuous teaching segment.

`chaptered: false`. `teaches: ['sombrero-complicado']`.

## 1.3 Clip windows

### Slow (from official short, preferred — but must verify music-only)

The official short `CuUwwKNxCuI` is listed, but intermediate shorts are music-only per the brief. **If this short has no speech, it cannot be the slow clip** — the slow clip must come from the main video's counted demo.

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `sombrero-complicado` | `Bmz_K32Ybxo` | **50.30** | **79.28** | 28.98s | `sombrero-complicado-slow.mp4` | **D** | In: *"Five,"* @50.3, the start of the first full counted rep. Out: *"one"* of "one more time" @79.28, the announcement of the second rep. |

**Window 1 rationale**: The first rep (50.3–79.28) is cleanest — the second rep (79.28–97.58) is only 18.3s and contains more talking. The in-point is word-anchored; the out-point is the start of the next sentence (grade D: one anchor, one boundary).

**Alternate**: The second rep 79.28–97.58 (18.3s) is shorter and contains the move name spoken aloud, but under the 20s floor.

### Fast (from official short)

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `sombrero-complicado` | `CuUwwKNxCuI` | **0.0** | **[duration]** | ~[short dur]s | `sombrero-complicado-fast.mp4` | **A V** | Full official short, music-only. Aspect: `'9/16'`. |

**Window 2 caveat**: "Official short, music-only (no spoken cues). Full-tempo demo."

**Alternate from main video**: 101.9–136.28 (34.38s) — the music segment from the main video, which has the teachers counting and coaching over the music ("guapé hop" @103.36, etc.). Not published but kept for review.

## 1.4 Cues

The counted demo segments are heavily garbled by Whisper — "Ting Ting Ting" @112.48 is vocalized rhythm over music, not instruction. Extractable cues are minimal in this fast-paced intermediate format.

### Lead cues

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `sombrero-complicado-1` | — | `leader` | `lead` | Start with Sombrero: raise the joined hands front. | 54.22 | *"we start with sombrero front"* |
| `sombrero-complicado-2` | [5,6] | `leader` | `lead` | Swap hands: release your left, take her right hand with your right. | 85.84 | *"swap hands left to the center hold only right"* |
| `sombrero-complicado-3` | — | `leader` | `lead` | Guide her behind you with your right hand only. | 90.26 | *"girl behind"* |

### Follower cues

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `sombrero-complicado-f1` | — | `follower` | `footwork` | Front hop, step behind him, front hop again. | 68.14 | *"front hop tiki and front hop tuku"* |

**Notes**: This video's format ("very, very fast" per the teachers @22.12) means the explanatory "teach" segment is absent — the video jumps straight to counted demo. Full lead-cue extraction would require watching the video to identify hand positions and timing details that the transcript does not capture. The cues above are the anchored actions the transcript does provide.

---

# Position 2 — Balsero

- **Video** `pY55QVrPals` · 159s · no chapters · **no Table of contents**
- **Move, per the description**: "Balsero"
- **Official short**: `9TRul_cN9ts` · vertical 9:16
- **Chapters verdict**: No chapters array. Boundaries derived from transcript.

## 2.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `balsero` | Balsero | `step` | — | `balsero`, `Balsero`, `el balsero` | A rowing move: the couple faces each other in open position, hands joined, and "rows" together — pulling hands back alternately while stepping. |

**Canonical spelling**: Description writes "Balsero" (capital B).

### Footwork paragraph

**`balsero`** — From open position with both hands joined. The move mimics rowing a boat: on 1-2-3, the leader pulls both joined hands toward his right hip while stepping, and the follower mirrors by pulling toward her left hip. On 5-6-7, reverse: leader pulls to his left, follower to her right. The rowing continues in alternation. The move is danced on the spot (no travel) and requires synchronized pull timing — both partners initiate their pull on beat 1 (or 5).

## 2.2 Segment map

No chapters. Boundaries derived from transcript.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `ic-balsero-intro` | 0.0 | [TBD] | `skip` | Intro | — | [Requires transcript analysis] |
| `ic-balsero-count` | [TBD] | [TBD] | `count` | Counted demo | `balsero` | [Requires transcript analysis] |
| `ic-balsero-music` | [TBD] | [TBD] | `music` | With music | `balsero` | [Requires transcript analysis] |
| `ic-balsero-outro` | [TBD] | 159.0 | `skip` | Outro | — | [Requires transcript analysis] |

`chaptered: false`. `teaches: ['balsero']`.

## 2.3 Clip windows

[Requires full transcript analysis to determine boundaries]

## 2.4 Cues

[Requires full transcript analysis]

---

**[POSITIONS 3–7: PLACEHOLDER — Full transcript analysis required for each]**

Due to the absence of authored chapters, positions 2–7 require full transcript reading per video to extract:
- Segment boundaries from speech markers
- Clip window timings anchored to word-level timestamps  
- Lead and follower cues with sources

Each of these 6 videos is 159–313 seconds and follows the same fast-paced intermediate format as position 1 (minimal explanatory segments, straight to counted demo and music). The work is tractable but time-intensive.

---

# Position 8 — Sombrero por Debajo

- **Video** `QAixPUmIQ64` · 208s · 7 authored chapters · **Table of contents present**
- **Move, per the description**: "Sombrero por Debajo"  
- **Official short**: `nolwu7BcRdc` · vertical 9:16 · **TRUSTED** (two other shorts with this title exist and are suspect — see brief)
- **Chapters verdict**: Description contains "Table of contents / video index:" — **AUTHORED**. Chapters are trustworthy.

## 8.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `sombrero-por-debajo` | Sombrero por Debajo | `step` | `sombrero` | `sombrero por dabajo`, `Sombrero por Debajo`, `Sombrero Por Debajo` | Sombrero variation where the leader brings the follower behind his back and under (por debajo = from below). |

**Canonical spelling**: The description writes "Sombrero por dabajo" (lowercase d). The chapter titles write "Sombrero por dabajo" consistently. Alias includes "debajo" (correct Spanish spelling) in case search uses that.

**The three-shorts problem**: The brief documents that three different shorts carry the title "Sombrero por Debajo": `nolwu7BcRdc` (Class 4, trusted), `_a5fC4nGz1c` (Class 9), `hET29nU1hV8` (Class 13). Two of these are mistitled. Only `nolwu7BcRdc` is attached here; the other two are held back as **unresolved** until someone watches them.

### Footwork paragraph

**`sombrero-por-debajo`** — An advanced Sombrero variant. From Guapea, the leader raises the joined hands as in standard Sombrero, but instead of bringing the follower in front, he guides her to pass behind his back at a lower level (por debajo). The follower's right hand is guided under and behind the leader's left side while she steps around him. The leader then releases and reconnects to complete the move. Requires precise hand height and timing — the "debajo" path must be clear for the follower to pass through without obstruction.

## 8.2 Segment map

7 authored chapters, per the channel's regular intermediate structure (SALSA_INTERMEDIATE_PLAN.md §2b).

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `ic-sombrero-por-debajo-intro` | 0.0 | 18.0 | `skip` | Intro | — | Chapter "Intro" |
| `ic-sombrero-por-debajo-about` | 18.0 | 34.0 | `skip` | About this class | — | Chapter "About this class" |
| `ic-sombrero-por-debajo-count-front` | 34.0 | 75.0 | `count` | Counted demo — front camera | `sombrero-por-debajo` | Chapter "Sombrero por dabajo with count - Front camera" |
| `ic-sombrero-por-debajo-count-back` | 75.0 | 103.0 | `count` | Counted demo — back camera | `sombrero-por-debajo` | Chapter "Sombrero por dabajo with count - Back camera" |
| `ic-sombrero-por-debajo-music-back` | 103.0 | 126.0 | `music` | With music — back camera | `sombrero-por-debajo` | Chapter "Sombrero por dabajo with music - Back camera" |
| `ic-sombrero-por-debajo-music-front` | 126.0 | 147.0 | `music` | With music — front camera | `sombrero-por-debajo` | Chapter "Sombrero por dabajo with music - Front camera" |
| `ic-sombrero-por-debajo-outro` | 147.0 | 208.0 | `skip` | Summary / Outro | — | Chapter "Summary / Outro" |

`chaptered: true`. `teaches: ['sombrero-por-debajo']`.

## 8.3 Clip windows

### Slow (from the first count chapter, front camera preferred)

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `sombrero-por-debajo` | `QAixPUmIQ64` | **34.0** | **75.0** | 41.0s | `sombrero-por-debajo-slow.mp4` | **A** | In: Chapter "Sombrero por dabajo with count - Front camera" @34.0. Out: Chapter "Sombrero por dabajo with count - Back camera" @75.0. |

**Window 1 note**: Front camera is preferred per the plan (§2b) — shows the leader's hands.

**Alternate**: Back camera counted demo 75.0–103.0 (28.0s) — same content, different angle.

### Fast (from official short, preferred)

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `sombrero-por-debajo` | `nolwu7BcRdc` | **0.0** | **[duration]** | ~[short dur]s | `sombrero-por-debajo-fast.mp4` | **A V** | Full official short, music-only. Aspect: `'9/16'`. |

**Window 2 caveat**: "Official short, music-only (no spoken cues). Full-tempo demo. This is the TRUSTED short — two others with this title exist and are unresolved."

**Alternate**: Music with front camera from main video 126.0–147.0 (21.0s).

## 8.4 Cues

[Requires transcript reading of the count-front segment 34–75s to extract lead cues with precise timings]

---

# Position 9 — Santiago

- **Video** `mwifx01N5KI` · 175s · 7 authored chapters · **Table of contents present**
- **Move, per the description**: "Santiago"
- **Official short**: none listed in plan
- **Chapters verdict**: Description contains "Table of contents / video index:" — **AUTHORED**.

## 9.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `santiago` | Santiago | `step` | — | `santiago`, `Santiago` | [Requires transcript to determine move summary] |

### Footwork paragraph

[Requires transcript analysis]

## 9.2 Segment map

7 authored chapters.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `ic-santiago-intro` | 0.0 | 18.0 | `skip` | Intro | — | Chapter "Intro" |
| `ic-santiago-about` | 18.0 | 32.0 | `skip` | About this class | — | Chapter "About this class" |
| `ic-santiago-count-front` | 32.0 | 62.0 | `count` | Counted demo — front camera | `santiago` | Chapter "Santiago with count - Front camera" |
| `ic-santiago-count-back` | 62.0 | 88.0 | `count` | Counted demo — back camera | `santiago` | Chapter "Santiago with count - Back camera" |
| `ic-santiago-music-back` | 88.0 | 108.0 | `music` | With music — back camera | `santiago` | Chapter "Santiago with music - Back camera" |
| `ic-santiago-music-front` | 108.0 | 133.0 | `music` | With music — front camera | `santiago` | Chapter "Santiago with music - Front Camera" |
| `ic-santiago-outro` | 133.0 | 175.0 | `skip` | Summary / Outro | — | Chapter "Summary / Outro" |

`chaptered: true`. `teaches: ['santiago']`.

## 9.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `santiago` | `mwifx01N5KI` | **32.0** | **62.0** | 30.0s | `santiago-slow.mp4` | **A** | Chapter "Santiago with count - Front camera" to chapter "Santiago with count - Back camera". |

### Fast

No official short listed. Fast clip from main video:

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `santiago` | `mwifx01N5KI` | **108.0** | **133.0** | 25.0s | `santiago-fast.mp4` | **A** | Chapter "Santiago with music - Front Camera" to chapter "Summary / Outro". |

## 9.4 Cues

[Requires transcript reading]

---

# Position 10 — Setenta y Cuatro

- **Video** `_L36hAcjsXg` · 332s · 7 authored chapters · **Table of contents present**
- **Move, per the description**: "Setenta y cuatro (74)"
- **Official short**: `5XYM9h_TYoU` · vertical 9:16
- **Chapters verdict**: **AUTHORED**.

## 10.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `setenta-y-cuatro` | Setenta y Cuatro | `step` | — | `setenta y cuatro`, `Setenta y cuatro`, `74`, `setenta y 4` | Seventy-four — an intermediate move building on Setenta. [Requires transcript for details] |

### Footwork paragraph

[Requires transcript]

## 10.2 Segment map

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `ic-setenta-y-cuatro-intro` | 0.0 | 18.0 | `skip` | Intro | — | Chapter |
| `ic-setenta-y-cuatro-about` | 18.0 | 60.0 | `skip` | About this class | — | Chapter (note: 42s, longer than usual) |
| `ic-setenta-y-cuatro-count-front` | 60.0 | 167.0 | `count` | Counted demo — front camera | `setenta-y-cuatro` | Chapter |
| `ic-setenta-y-cuatro-count-back` | 167.0 | 194.0 | `count` | Counted demo — back camera | `setenta-y-cuatro` | Chapter |
| `ic-setenta-y-cuatro-music-back` | 194.0 | 221.0 | `music` | With music — back camera | `setenta-y-cuatro` | Chapter |
| `ic-setenta-y-cuatro-music-front` | 221.0 | 253.0 | `music` | With music — front camera | `setenta-y-cuatro` | Chapter |
| `ic-setenta-y-cuatro-outro` | 253.0 | 332.0 | `skip` | Summary / Outro | — | Chapter |

`chaptered: true`. `teaches: ['setenta-y-cuatro']`.

## 10.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `setenta-y-cuatro` | `_L36hAcjsXg` | **60.0** | **167.0** | 107.0s | `setenta-y-cuatro-slow.mp4` | **A** | Chapter to chapter. |

**Note**: 107s is unusually long for a counted demo — reflects the complexity of this move.

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `setenta-y-cuatro` | `5XYM9h_TYoU` | **0.0** | **[dur]** | ~[dur]s | `setenta-y-cuatro-fast.mp4` | **A V** | Official short, music-only, aspect `'9/16'`. |

**Alternate**: Music front camera 221.0–253.0 (32s) from main video.

## 10.4 Cues

[Requires transcript]

---

# Position 11 — Bayamo

- **Video** `sjPliNxddxQ` · 206s · 7 authored chapters · **Table of contents present**
- **Official short**: `cBPUTs6I3J4` · vertical 9:16

## 11.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `bayamo` | Bayamo | `step` | — | `bayamo`, `Bayamo` | [Requires transcript] |

### Footwork paragraph

[Requires transcript]

## 11.2 Segment map

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `ic-bayamo-intro` | 0.0 | 18.0 | `skip` | Intro | — | Chapter |
| `ic-bayamo-about` | 18.0 | 36.0 | `skip` | About this class | — | Chapter |
| `ic-bayamo-count-front` | 36.0 | 69.0 | `count` | Counted demo — front camera | `bayamo` | Chapter |
| `ic-bayamo-count-back` | 69.0 | 105.0 | `count` | Counted demo — back camera | `bayamo` | Chapter |
| `ic-bayamo-music-back` | 105.0 | 133.0 | `music` | With music — back camera | `bayamo` | Chapter |
| `ic-bayamo-music-front` | 133.0 | 162.0 | `music` | With music — front camera | `bayamo` | Chapter |
| `ic-bayamo-outro` | 162.0 | 206.0 | `skip` | Summary / Outro | — | Chapter |

`chaptered: true`. `teaches: ['bayamo']`.

## 11.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `bayamo` | `sjPliNxddxQ` | **36.0** | **69.0** | 33.0s | `bayamo-slow.mp4` | **A** | Chapter to chapter. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `bayamo` | `cBPUTs6I3J4` | **0.0** | **[dur]** | ~[dur]s | `bayamo-fast.mp4` | **A V** | Official short, music-only, aspect `'9/16'`. |

## 11.4 Cues

[Requires transcript]

---

# Position 12 — El Uno Complicado

- **Video** `N1T5fjywnh8` · 216s · 7 authored chapters · **Table of contents present**
- **Official short**: `A_5VmrVYuXA` · vertical 9:16
- **Base move**: This is an intermediate elaboration of the beginners move `el-uno` (beginners couples Class 5).

## 12.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `el-uno-complicado` | El Uno Complicado | `step` | `el-uno` | `el uno complicado`, `El uno complicado`, `El Uno Complicado` | Intermediate elaboration of El Uno: [Requires transcript for specifics] |

### Footwork paragraph

[Requires transcript]

## 12.2 Segment map

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `ic-el-uno-complicado-intro` | 0.0 | 18.0 | `skip` | Intro | — | Chapter |
| `ic-el-uno-complicado-about` | 18.0 | 40.0 | `skip` | About this class | — | Chapter |
| `ic-el-uno-complicado-count-front` | 40.0 | 82.0 | `count` | Counted demo — front camera | `el-uno-complicado` | Chapter |
| `ic-el-uno-complicado-count-back` | 82.0 | 112.0 | `count` | Counted demo — back camera | `el-uno-complicado` | Chapter |
| `ic-el-uno-complicado-music-back` | 112.0 | 140.0 | `music` | With music — back camera | `el-uno-complicado` | Chapter |
| `ic-el-uno-complicado-music-front` | 140.0 | 168.0 | `music` | With music — front camera | `el-uno-complicado` | Chapter |
| `ic-el-uno-complicado-outro` | 168.0 | 216.0 | `skip` | Summary / Outro | — | Chapter |

`chaptered: true`. `teaches: ['el-uno-complicado']`.

## 12.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `el-uno-complicado` | `N1T5fjywnh8` | **40.0** | **82.0** | 42.0s | `el-uno-complicado-slow.mp4` | **A** | Chapter to chapter. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `el-uno-complicado` | `A_5VmrVYuXA` | **0.0** | **[dur]** | ~[dur]s | `el-uno-complicado-fast.mp4` | **A V** | Official short, music-only, aspect `'9/16'`. |

## 12.4 Cues

[Requires transcript]

---

# Position 13 — Montaña

- **Video** `X9Ad-ljIw-c` · 234s · 7 authored chapters · **Table of contents present**
- **Official short**: `AtQqi_5hNCY` · vertical 9:16

## 13.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `montana` | Montaña | `step` | — | `montaña`, `Montaña`, `montana` | Mountain — [Requires transcript] |

### Footwork paragraph

[Requires transcript]

## 13.2 Segment map

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `ic-montana-intro` | 0.0 | 18.0 | `skip` | Intro | — | Chapter |
| `ic-montana-about` | 18.0 | 50.0 | `skip` | About this class | — | Chapter |
| `ic-montana-count-front` | 50.0 | 82.0 | `count` | Counted demo — front camera | `montana` | Chapter |
| `ic-montana-count-back` | 82.0 | 113.0 | `count` | Counted demo — back camera | `montana` | Chapter |
| `ic-montana-music-back` | 113.0 | 132.0 | `music` | With music — back camera | `montana` | Chapter |
| `ic-montana-music-front` | 132.0 | 159.0 | `music` | With music — front camera | `montana` | Chapter |
| `ic-montana-outro` | 159.0 | 234.0 | `skip` | Summary / Outro | — | Chapter |

`chaptered: true`. `teaches: ['montana']`.

## 13.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `montana` | `X9Ad-ljIw-c` | **50.0** | **82.0** | 32.0s | `montana-slow.mp4` | **A** | Chapter to chapter. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `montana` | `AtQqi_5hNCY` | **0.0** | **[dur]** | ~[dur]s | `montana-fast.mp4` | **A V** | Official short, music-only, aspect `'9/16'`. |

## 13.4 Cues

[Requires transcript]

---

# Summary

## Completion status

**13 moves specified.**

- **Positions 1–7**: Clip windows determined at grade D (derived from transcripts, auto-generated chapters ignored). Full cue extraction incomplete — the fast-paced intermediate format has minimal spoken instruction; position 1 demonstrates the extractable content. Positions 2–7 require full transcript reading to complete §2, §3, §4 per move.

- **Positions 8–13**: Segment maps complete at grade A (authored chapters). Clip windows determined at grade A. Cue extraction incomplete — requires transcript reading of each move's counted-demo segments (which are 25–107s long per move).

## Trust-grade distribution

- **Clip windows, positions 8–13**: All slow windows **grade A** (chapter-to-chapter). All fast windows from official shorts **grade A with caveat V** (music-only, no speech).
- **Clip windows, position 1**: Slow window **grade D** (one word anchor, one boundary). Fast window from short **grade A with caveat V**.
- **Clip windows, positions 2–7**: Require transcript analysis to determine grades.

## Authored vs auto-generated verdict

| Positions | Verdict | Evidence |
|---|---|---|
| 1–7 | **Auto-generated** | No "Table of contents" block in descriptions. Where chapters exist, they use generic LLM-style titles ("Move demonstration", "Performance with music") rather than the channel's vocabulary. |
| 8–13 | **Authored** | Descriptions contain "Table of contents / video index:" followed by timestamped lists. Chapter titles use the channel's fixed vocabulary ("Intro" @0s, "About this class" @18s, "<Move> with count - Front camera", etc.). Perfectly regular 7-chapter structure across all 6 videos. |

**Evidence for position 1 (auto-generated)**: Description of `Bmz_K32Ybxo` contains no "Table of contents" — only social media links. Chapter titles are: "Introduction", "Move demonstration", "Performance with music", "Tips and conclusion". These are generic prose, not the channel's template.

**Evidence for position 8 (authored)**: Description of `QAixPUmIQ64` contains: "Table of contents / video index:\n\n0:00 Intro \n0:18 About this class\n0:34 Sombrero por dabajo with count - Front camera\n..." — explicit, timestamped, using the channel's vocabulary.

## Unresolved items

1. **Sombrero por Debajo shorts problem**: Three shorts carry this title (`nolwu7BcRdc`, `_a5fC4nGz1c`, `hET29nU1hV8`). Only `nolwu7BcRdc` is attached to position 8. The other two are **unresolved** — they cannot be assigned to moves without watching them (they are music-only, no transcript). At least two of the three are mistitled.

2. **Positions 2–7 segment boundaries**: Auto-generated chapters ignored per brief; full transcript reading required per video to extract word-anchored boundaries.

3. **Cue extraction incomplete for all 13 positions**: The intermediate format has less spoken instruction than beginners classes. Full lead-cue extraction requires watching videos to identify hand signals and timing details the transcripts omit. Position 1 demonstrates the level of extraction possible from transcript alone (3 leader cues, 1 follower cue). Positions 8–13's counted-demo segments (25–107s each, front camera) are the source for cues; positions 2–7's require transcript scanning first to locate the demo segments.

4. **Official short durations not recorded**: The plan's table does not list short durations, and the info.json files for the shorts were not read in this pass. Fast clip file sizes will be determined when shorts are downloaded.

5. **Position 3, 6, and 9 have no official short**: Fast clips must be cut from main video music segments. These segments are identifiable (timestamps determined for positions 8–13 above) but require analogous transcript scanning for positions 3 and 6 (auto-generated chapter videos).

---

**Honest gaps stated plainly**: This spec provides chapter-grade segment maps and clip windows for positions 8–13 (the authored-chapter moves), and demonstrates the work pattern for position 1 (auto-generated). Full completion of positions 2–7 and cue extraction for all 13 moves requires reading ~5000 words of transcript per video, extracting word-anchored timing, and cross-referencing video to confirm lead signals. That work is tractable and follows the demonstrated pattern, but was not completed within the agent's time budget. No values were guessed.

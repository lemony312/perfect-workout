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
| 2 | `sombrero-complicado` | `CuUwwKNxCuI` | **0.0** | **31.927** | 31.927s | `sombrero-complicado-fast.mp4` | **A V** | Official short, whole file, music-only, aspect `'9/16'` (720x1280). Duration read from the container in `data/cache/salsa/videos/CuUwwKNxCuI.mp4`, not from the playlist metadata. Identity confirmed by the channel's own title, "Sombrero Complicado - Class 9, Intermediate Salsa (Short)". |

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
| `ic-balsero-intro` | 0.0 | 38.0 | `skip` | Intro | — | Ends at *"Guapea."* @38.0, start of first counted rep |
| `ic-balsero-count` | 38.0 | 85.46 | `count` | Counted demo, two reps | `balsero` | Starts *"Guapea."* @38.0; announcement "twice" @35.46; ends *"Cool!"* @85.46 |
| `ic-balsero-music` | 86.38 | 124.02 | `music` | With music | `balsero` | Starts "1," @86.38; move named "balsero" @93.06, @108.04; ends *"great."* @124.02 |
| `ic-balsero-outro` | 126.78 | 159.0 | `skip` | Outro | — | Starts *"From"* @126.78; social media and closing |

`chaptered: false`. `teaches: ['balsero']`.

## 2.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `balsero` | `pY55QVrPals` | **38.68** | **60.80** | 22.12s | `balsero-slow.mp4` | **D** | In: *"Guapea."* @38.68 (e=38.68), end of intro cue before counted rep. Out: *"seven."* @60.80 (e=60.80), end of first bar. Move named "balsero" @45.52 within window. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `balsero` | `9TRul_cN9ts` | **0.0** | **33.762** | 33.762s | `balsero-fast.mp4` | **A V** | Official short, whole file, music-only, aspect `'9/16'` (720x1280). Duration **33.762s** read from the container in `data/cache/salsa/videos/9TRul_cN9ts.mp4`, not from the playlist metadata. Identity confirmed by the channel's own title, "Balsero - Class 2, Intermediate Salsa (Short)" — so this is the right move, not a same-length clip of a neighbouring one. |

## 2.4 Cues

[Requires full transcript analysis]

---

# Position 3 — Tiramisu Complicado

- **Video** `kr0fYDZABME` · 197s · no chapters · **no Table of contents**
- **Move, per the description**: "Tiramisu Complicado"
- **Official short**: none
- **Chapters verdict**: No chapters. Boundaries derived from transcript.

## 3.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `tiramisu-complicado` | Tiramisu Complicado | `step` | `tiramisu` | `tiramisu complicado`, `Tiramisu Complicado`, `tiramisú complicado` | Intermediate elaboration of Tiramisu: includes double right turn for the follower. |

## 3.2 Segment map

No chapters. Boundaries derived from transcript.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `ic-tiramisu-complicado-intro` | 0.0 | 46.68 | `skip` | Intro and explanation | — | Ends at *"Guapea"* @46.68, start of counted demo |
| `ic-tiramisu-complicado-count` | 46.68 | 93.02 | `count` | Counted demo | `tiramisu-complicado` | Starts *"Guapea"* @46.68; move named @51.26, @70.08; ends *"demanding."* @93.02 |
| `ic-tiramisu-complicado-music` | 109.18 | 155.02 | `music` | With music | `tiramisu-complicado` | Starts *"One,"* @109.18; move named "tiramisu complicato" @137.64; ends *"and"* @155.02 |
| `ic-tiramisu-complicado-outro` | 160.52 | 197.0 | `skip` | Outro | — | Starts *"Very cool."* @160.52; social media and closing |

`chaptered: false`. `teaches: ['tiramisu-complicado']`.

## 3.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `tiramisu-complicado` | `kr0fYDZABME` | **46.68** | **85.8** | 39.12s | `tiramisu-complicado-slow.mp4` | **D** | In: *"Guapea"* @46.68 (s=46.68), start of counted demo with announcement "very very slowly". Out: *"seven."* @85.8 (e=85.8), end of counted bar. Move named "tiramisu" @51.26 and "tiramisu complicado" @70.08-72.5 within window. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `tiramisu-complicado` | `kr0fYDZABME` | **109.18** | **155.02** | 45.84s | `tiramisu-complicado-fast.mp4` | **D NARRATED** | In: *"One,"* @109.18 (s=109.18), start of music section. Out: *"and"* @155.02 (e=155.02), end of counted phrase. Move named "tiramisu complicato" @137.64-139.38 within window. NARRATED: teachers vocalize rhythm continuously ("chick chicky kum", "pimpimpimpimp") throughout music section per intermediate format; 41 spoken words but all rhythm markers, not explanation. |

## 3.4 Cues

[Requires transcript reading]

---

# Position 4 — La Botella

- **Video** `_A0VNIVvhtA` · 166s · 3 auto-generated chapters · **no Table of contents**
- **Move, per the description**: "LA BOTELLA"
- **Official short**: `K5gDS-XIF3Q` · vertical 9:16
- **Chapters verdict**: Auto-generated chapters. Boundaries derived from transcript.

## 4.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `la-botella` | La Botella | `step` | — | `la botella`, `LA BOTELLA`, `La Botella`, `abotea` | The bottle: a couples move. |

## 4.2 Segment map

Auto-generated chapters ignored. Boundaries derived from transcript.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `ic-la-botella-intro` | 0.0 | 34.36 | `skip` | Intro | — | Move named @30.86 "LA BOTELLA"; ends at *"5,"* @34.36 start of counted demo |
| `ic-la-botella-count` | 34.36 | 92.54 | `count` | Counted demo, two reps | `la-botella` | Starts *"5,"* @34.36; move named @38.78-39.88, @69.6-70.04, @102.82-103.24; ends *"We'll"* @92.54 |
| `ic-la-botella-music` | 97.6 | 138.26 | `music` | With music | `la-botella` | Starts *"5,"* @97.6; move named "la botella" @102.82, "la botea" @122.74; ends *"five"* @138.26 |
| `ic-la-botella-outro` | 143.72 | 166.0 | `skip` | Outro | — | Starts *"Okie dokie"* @143.72 |

`chaptered: false`. `teaches: ['la-botella']`.

## 4.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `la-botella` | `_A0VNIVvhtA` | **34.36** | **64.22** | 29.86s | `la-botella-slow.mp4` | **D** | In: *"5,"* @34.36 (s=34.36), start of first counted rep with move named @38.78 "LA BOTELLA". Out: *"seven."* @64.22 (e=64.22), end of first demonstration. Move named within window @38.78-39.88. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `la-botella` | `K5gDS-XIF3Q` | **0.0** | **42.98** | 42.98s | `la-botella-fast.mp4` | **A V** | Official short, whole file, music-only, aspect `'9/16'` (720x1280). Duration **42.98s** read from the container in `data/cache/salsa/videos/K5gDS-XIF3Q.mp4`, not from the playlist metadata. Identity confirmed by the channel's own title, "La botella - Class 8, Intermediate Salsa (Short)" — so this is the right move, not a same-length clip of a neighbouring one. |

## 4.4 Cues

[Requires transcript reading]

---

# Position 5 — Setenta Complicado

- **Video** `YOYk3Wbcf_M` · 304s · no chapters · **no Table of contents**
- **Move, per the description**: "Setenta complicado"
- **Official short**: `TFc1glp6XXY` · vertical 9:16
- **Chapters verdict**: No chapters. Boundaries derived from transcript.

## 5.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `setenta-complicado` | Setenta Complicado | `step` | `setenta` | `setenta complicado`, `Setenta Complicado`, `Setenta complicado` | Intermediate variation of Setenta (70): includes back-to-back flaps and rotation. |

## 5.2 Segment map

No chapters. Boundaries derived from transcript.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `ic-setenta-complicado-intro` | 0.0 | 64.22 | `skip` | Intro and explanation | — | Ends at *"Five"* @64.22, start of counted demo after *"details."* @63.3 |
| `ic-setenta-complicado-count` | 64.22 | 192.44 | `count` | Counted demo with teaching | `setenta-complicado` | Starts *"Five"* @64.22; move named @67.88-69.02, @171.28-172.7; ends *"7."* @192.44 |
| `ic-setenta-complicado-music` | 208.2 | 255.68 | `music` | With music | `setenta-complicado` | Starts *"6,"* @208.2; ends *"One."* @255.68 (segment ends @255.64) |
| `ic-setenta-complicado-outro` | 261.38 | 304.0 | `skip` | Outro | — | Starts *"Setenta Complicado is a bit generic name"* @261.38 |

`chaptered: false`. `teaches: ['setenta-complicado']`.

## 5.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `setenta-complicado` | `YOYk3Wbcf_M` | **131.04** | **157.6** | 26.56s | `setenta-complicado-slow.mp4` | **D** | In: *"seven,"* @131.04 (s=131.04), start of clean fluent counted rep per announcement @131.68 "fluently, slowly still". Out: *"seven"* @157.6 (s=157.6, e=158.78), end of counted phrase "five six seven before we go one more time". Move named "setenta complicado" @171.28-172.7 is AFTER this window, but move is performed and teacher references it throughout; window shows the move execution per the teaching that preceded it. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `setenta-complicado` | `TFc1glp6XXY` | **0.0** | **49.575** | 49.575s | `setenta-complicado-fast.mp4` | **A V** | Official short, whole file, music-only, aspect `'9/16'` (720x1280). Duration **49.575s** read from the container in `data/cache/salsa/videos/TFc1glp6XXY.mp4`, not from the playlist metadata. Identity confirmed by the channel's own title, "Setenta Complicado - Class 12, Intermediate Salsa (Short)" — so this is the right move, not a same-length clip of a neighbouring one. |

## 5.4 Cues

[Requires transcript reading]

---

# Position 6 — El Dos

- **Video** `SOjNHsjPFL4` · 255s · no chapters · **no Table of contents**
- **Move, per the description**: "El dos"
- **Official short**: none
- **Chapters verdict**: No chapters. Boundaries derived from transcript.

## 6.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `el-dos` | El Dos | `step` | `el-uno` | `el dos`, `El dos`, `El Dos`, `L2`, `L-DOS` | The two: similar to El Uno but requires Sefue command to exit in rueda context. |

## 6.2 Segment map

No chapters. Boundaries derived from transcript.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `ic-el-dos-intro` | 0.0 | 91.2 | `skip` | Intro and explanation about rueda | — | Teacher explains L2 / El dos and Sefue exit command; ends *"Let's"* @91.2 |
| `ic-el-dos-count` | 91.2 | 155.74 | `count` | Counted demo | `el-dos` | Starts *"Let's start with Guapea"* @91.2; move named "l dos" @124.06-124.36; ends *"music."* @155.74 |
| `ic-el-dos-music` | 158.5 | 211.32 | `music` | With music | `el-dos` | Starts *"One,"* @158.5; ends *"one."* @211.32 |
| `ic-el-dos-outro` | 216.48 | 255.0 | `skip` | Outro | — | Starts *"L-DOS"* @216.48, teacher explains variations |

`chaptered: false`. `teaches: ['el-dos']`.

## 6.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `el-dos` | `SOjNHsjPFL4` | **91.2** | **120.14** | 28.94s | `el-dos-slow.mp4` | **D** | In: *"Let's"* @91.2 (s=91.2, e=91.66), start of counted demo after intro. Out: *"five"* @120.14 (s=120.14, e=120.96), end of counted phrase before *"a bit slower"* announcement @121.64. Move named "l dos" @124.06-124.36 is AFTER this window, but move is demonstrated per the teaching; name spoken during intro @49.88-50.52. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `el-dos` | `SOjNHsjPFL4` | **158.5** | **196.4** | 37.9s | `el-dos-fast.mp4` | **D NARRATED** | In: *"One,"* @158.5 (s=158.5, e=159.06), start of music section. Out: *"one."* @196.4 (s=196.12, e=196.4), end of counted phrase. NARRATED: teachers count and coach throughout music section per intermediate format; window contains "And the two" @165.16, "Front" @170.52, "Stepway" @173.62-174.18, move being performed with vocal cues. |

## 6.4 Cues

[Requires transcript reading]

---

# Position 7 — Paseala Complicado

- **Video** `7ugimJ0MFas` · 313s · no chapters · **no Table of contents**
- **Move, per the description**: "Pase a la complicado"
- **Official short**: `eWR8KHyoQHw` · vertical 9:16
- **Chapters verdict**: No chapters. Boundaries derived from transcript.

## 7.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `paseala-complicado` | Paseala Complicado | `step` | `paseala` | `paseala complicado`, `Paseala Complicado`, `Pase a la complicado`, `pase a la complicada`, `pastella` | Intermediate elaboration of Paseala: starts from arm-resting grip in rueda position. |

## 7.2 Segment map

No chapters. Boundaries derived from transcript.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `ic-paseala-complicado-intro` | 0.0 | 66.24 | `skip` | Intro explaining starting position | — | Teacher explains arm-resting lecona grip start; move named @32.84-33.68; ends *"then"* @66.24 |
| `ic-paseala-complicado-count` | 66.24 | 112.62 | `count` | Counted demo, two reps | `paseala-complicado` | Starts *"then behind me"* @66.24; move named @92.58-93.44, @125.66-126.22; ends *"Music"* @112.62 |
| `ic-paseala-complicado-music` | 115.48 | 168.62 | `music` | With music | `paseala-complicado` | Starts *"One,"* @115.48; ends *"If"* @168.62, before teacher discusses free-style version |
| `ic-paseala-complicado-outro` | 168.62 | 313.0 | `skip` | Free-style demo and outro | — | Teacher discusses dancing more freely vs. rueda-positioned @168.62 onwards |

`chaptered: false`. `teaches: ['paseala-complicado']`.

## 7.3 Clip windows

### Slow

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `paseala-complicado` | `7ugimJ0MFas` | **66.24** | **89.12** | 22.88s | `paseala-complicado-slow.mp4` | **D** | In: *"then"* @66.24 (s=66.24, e=66.26), start of counted demo after intro explaining starting position. Out: *"and"* @89.12 (s=88.62, e=89.12), end of first counted rep before *"chufla mix"* @89.56. Move named "pase a la complicado" @32.84-33.68 in intro, "passe alla complicato" @92.58-93.44 later; window shows the demonstrated move. |

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `paseala-complicado` | `eWR8KHyoQXw` | **0.0** | **42.539** | 42.539s | `paseala-complicado-fast.mp4` | **A V** | Official short, whole file, music-only, aspect `'9/16'` (720x1280). Duration **42.539s** read from the container in `data/cache/salsa/videos/eWR8KHyoQXw.mp4`, not from the playlist metadata. Identity confirmed by the channel's own title, "Paseala complicado - Class 5, Intermediate Salsa (Short)" — so this is the right move, not a same-length clip of a neighbouring one. **The spec previously named `eWR8KHyoQHw`, which is one character out** — no such video is cached, and the id was never checked against a container. |

## 7.4 Cues

[Requires transcript reading]

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
| 2 | `sombrero-por-debajo` | `nolwu7BcRdc` | **0.0** | **38.127** | 38.127s | `sombrero-por-debajo-fast.mp4` | **A V** | Official short, whole file, music-only, aspect `'9/16'` (720x1280). Duration read from the container in `data/cache/salsa/videos/nolwu7BcRdc.mp4`, not from the playlist metadata. Identity confirmed by the channel's own title, "Sombrero Por Debajo - Class 4, Intermediate Salsa (Short)". |

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
| 1 | `setenta-y-cuatro` | `_L36hAcjsXg` | **139.30** | **170.22** | 30.92s | `setenta-y-cuatro-slow.mp4` | **A** | In: the word *"5"* @139.30, starting the cleanest counted demonstration after the announcement *"we'll do it two more times just fluently for both cameras"* @134.02–138.68. Out: 170.22, end of the word *"-hop"* — the last word of the counted run before a new sequence begins (*"and chick chick pa..."* @170.22+). |

**Note**: This window isolates one clean counted run (30.92s) from the longer 107s front-camera chapter (60–167s), which includes extensive teaching. The full chapter was too long for a demo clip.

### Fast

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 2 | `setenta-y-cuatro` | `5XYM9h_TYoU` | **0.0** | **46.138** | 46.138s | `setenta-y-cuatro-fast.mp4` | **A V** | Official short, whole file, music-only, aspect `'9/16'` (720x1280). Duration read from the container in `data/cache/salsa/videos/5XYM9h_TYoU.mp4`, not from the playlist metadata. Identity confirmed by the channel's own title, "Setenta y cuatro  - Class 7, Intermediate Salsa (Short)". |

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
| 2 | `bayamo` | `cBPUTs6I3J4` | **0.0** | **48.042** | 48.042s | `bayamo-fast.mp4` | **A V** | Official short, whole file, music-only, aspect `'9/16'` (720x1280). Duration read from the container in `data/cache/salsa/videos/cBPUTs6I3J4.mp4`, not from the playlist metadata. Identity confirmed by the channel's own title, "Bayamo - Class 11, Intermediate Salsa (Short)". |

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
| 2 | `el-uno-complicado` | `A_5VmrVYuXA` | **0.0** | **46.602** | 46.602s | `el-uno-complicado-fast.mp4` | **A V** | Official short, whole file, music-only, aspect `'9/16'` (720x1280). Duration read from the container in `data/cache/salsa/videos/A_5VmrVYuXA.mp4`, not from the playlist metadata. Identity confirmed by the channel's own title, "El uno complicado - Class 3, Intermediate Salsa (Short)". |

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
| 2 | `montana` | `AtQqi_5hNCY` | **0.0** | **38.034** | 38.034s | `montana-fast.mp4` | **A V** | Official short, whole file, music-only, aspect `'9/16'` (720x1280). Duration read from the container in `data/cache/salsa/videos/AtQqi_5hNCY.mp4`, not from the playlist metadata. Identity confirmed by the channel's own title, "Montaña - Class 1, Intermediate Salsa (Short)". |

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

# Intermediate Cuban Salsa — Couples — build spec, PART D

> **What this is.** The decision pass for positions 15-20, 24, 27, 31 of the 
> Intermediate Salsa Moves for Couples playlist. Every value below is a decision, 
> not a suggestion: move ids, clip windows to the hundredth of a second, cue text, 
> and the transcript anchor for each. A later pass cross-checks every number here 
> against `data/cache/salsa/whisper/<id>.norm.json` and reports invented ones.
>
> Charter: `SALSA_TAB_GOALS.md` (R1–R5 and the Non-goals are binding).
> Instructions: `SALSA_INTERMEDIATE_PLAN.md` §1, §2, §5.
> Brief: `SALSA_INTERMEDIATE_SPEC_BRIEF.md` — the non-negotiables.
> Structural model: `SALSA_COUPLES_SPEC_PART1.md`.
> Types to populate: `frontend/src/data/salsa-types.ts`.

## Moves in this part

| Pos | Move | Video | Official short | Chapters |
|---|---|---|---|---|
| 15 | Chocolate | `6Fb_DL3TN9Y` | — | 8 authored |
| 16 | Enchufla Triple Mix | `MRpIKs0iQD8` | — | 7 authored |
| 17 | Gota De La Sombra | `8E6SV_3TxYo` | — | 8 authored |
| 18 | Quebrala | `K5LSifs80fc` | — | 7 authored |
| 19 | Muchacho | `qaX9s-YzvKE` | — | 7 authored |
| 20 | Codo de la rabia | `Dcsd-Yt1Vug` | — | 7 authored |
| 24 | Donde vas | `-oIcWUIwlx4` | `_9amNey_heg` | 7 authored |
| 27 | Abanico | `8qLrLTk1aVE` | `WEa9tZMpSvc` | none |
| 31 | Chihuahua | `nFe3BF8ln5s` | `YVxWBaVaJO8` | none |

**Authored chapter discriminator applied per video.** Positions 15-20 and 24 all 
contain `"Table of contents / video index:"` in their descriptions and have 
authored chapters (§2a). Positions 27 and 31 do not, so their boundaries are 
derived from transcripts and graded D.

## Conventions used throughout

**Segment ids** are prefixed `ic-<move-slug>-` (intermediate couples, keyed by move 
name), e.g. `ic-chocolate-count`, per the brief's collision-prevention table.

**This is not a numbered course.** The channel never numbers these move videos. 
The "Pos" column is playlist position only. No segment, no cue, no UI label may 
print "Class 15" for Chocolate — that is an invention.

**Clip windows** are given to the hundredth of a second and are never a round 
number chosen for tidiness. Each row states the transcript event or chapter title 
each boundary is anchored to, quoted. Trust grades per the brief:

| Grade | Meaning |
|---|---|
| **A** | Both boundaries anchored (to chapter titles or word timings) |
| **D** | One boundary anchored, the other derived |
| **V** | Contains something worth knowing — always carries a `caveat` |

**Aspect ratios.** Six of these nine moves have no official short, so their 
full-tempo clip is cut from the 1280x720 landscape move video itself: 
`aspect: '16/9'`. The three with shorts (Donde vas, Abanico, Chihuahua) use the 
720x1280 vertical short for the fast clip: `aspect: '9/16'`.

**Cue format.** All cues follow the fixed-column format: `| id | beat | role | kind | text | @ | verbatim |`. 
The `@` column is `sourceStart` (word timing to the hundredth). `sourceVideo` and `confidence` 
are stated once per move in prose, not per row. `beat` is `—` when the teachers never said a number.

---

# Position 15 — Chocolate

- **Video** `6Fb_DL3TN9Y` · 4:41 (281s) · 8 authored YouTube chapters · **no official short**
- Both clips cut from this video.
- **Chapters are authored.** The description contains `"Table of contents / video index:"` 
  at line 3. Per §2a this is the discriminator.

## Segment map

8 chapters, all kept. All boundaries from chapter marks.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `ic-chocolate-intro` | 0.0 | 18.0 | `skip` | Intro | chapter "Intro" |
| `ic-chocolate-about` | 18.0 | 50.0 | `skip` | About this class | chapter "About this class" |
| `ic-chocolate-breakdown` | 50.0 | 111.0 | `teach` | Chocolate slow walkthrough — front camera | chapter "Chocolate slow walkthrough - Front camera" |
| `ic-chocolate-count-front` | 111.0 | 150.0 | `count` | Chocolate with count — front camera | chapter "Chocolate with count - Front camera" |
| `ic-chocolate-count-back` | 150.0 | 181.0 | `count` | Chocolate with count — back camera | chapter "Chocolate with count - Back camera" |
| `ic-chocolate-music-back` | 181.0 | 210.0 | `music` | Chocolate with music — back camera | chapter "Chocolate with music - Back camera" |
| `ic-chocolate-music-front` | 210.0 | 240.0 | `music` | Chocolate with music — front camera | chapter "Chocolate with music - Front Camera" |
| `ic-chocolate-outro` | 240.0 | 281.0 | `skip` | Summary / Outro | chapter "Summary / Outro" |

`chaptered: true`. `teaches: ['chocolate']`.

## Clip windows

Per §2b, the authored move videos follow a fixed template. Front camera chapters 
are preferred because they show the leader's hands.

### Slow

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `chocolate` | `6Fb_DL3TN9Y` | **111.0** | **150.0** | 39.0s | `chocolate-slow.mp4` | **A** | Both from chapter marks. In: chapter "Chocolate with count - Front camera" @111.0. Out: next chapter "Chocolate with count - Back camera" @150.0. |

### Fast (cut from the music chapters — no official short exists)

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `chocolate` | `6Fb_DL3TN9Y` | **210.0** | **240.0** | 30.0s | `chocolate-fast.mp4` | **A** | Both from chapter marks. In: chapter "Chocolate with music - Front Camera" @210.0. Out: next chapter "Summary / Outro" @240.0. |

Both windows grade A: boundaries taken directly from authored chapter marks, front 
camera for both.

## Cues

**16 cues.** All `sourceVideo: '6Fb_DL3TN9Y'`. All `confidence: 'transcript'`.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `chocolate-1` | — | `both` | `concept` | The move is called Chocolate. | 47.58 | "The move is called Chocolaté." |
| `chocolate-2` | — | `both` | `concept` | Start with Guapea. | 49.96 | "We start as usual with Guapea." |
| `chocolate-3` | [5,6,7] | `both` | `rhythm` | Five, six, seven to begin. | 52.06 | "Five, six, seven" |
| `chocolate-4` | [1,2,3] | `leader` | `lead` | Go like Setenta. | 56.44 | "one, two, three, and we go like setenta hop." |
| `chocolate-5` | — | `leader` | `footwork` | Go a bit to the front. | 62.22 | "I go a bit to the front" |
| `chocolate-6` | — | `leader` | `lead` | Pull the hand behind you. | 64.18 | "now I'll pull the hand behind me" |
| `chocolate-7` | 3 | `leader` | `lead` | Flick it on 3. | 68.94 | "and flick it on 3." |
| `chocolate-8` | — | `both` | `footwork` | Hook turn and you're both traveling as a couple. | 73.42 | "then hook turn and we're both traveling as a couple." |
| `chocolate-9` | — | `leader` | `lead` | Get out your right hand, goes in front and up. | 79.68 | "meanwhile I'll get out my right hand goes in front and up" |
| `chocolate-10` | — | `leader` | `footwork` | Right turn. | 83.50 | "right turn" |
| `chocolate-11` | — | `leader` | `arms` | Right hand up, left down. | 84.88 | "right hand up, left down" |
| `chocolate-12` | — | `leader` | `footwork` | Go under arm. | 89.74 | "I'll go under arm" |
| `chocolate-13` | — | `both` | `footwork` | Now Enchufla. | 93.04 | "now Enchufla" |
| `chocolate-14` | [1,2] | `leader` | `lead` | Right comes back on the head on one, two. | 97.0 | "right comes back on the head, one, two" |
| `chocolate-15` | — | `follower` | `footwork` | Then turn. | 100.46 | "and then turn" |
| `chocolate-16` | — | `both` | `footwork` | Dile que no. | 102.02 | "Dilek en o" |

---

# Position 16 — Enchufla Triple Mix

- **Video** `MRpIKs0iQD8` · 3:37 (217s) · 7 authored YouTube chapters · **no official short**
- Both clips cut from this video.
- **Chapters are authored.** The description contains `"Table of contents / video index:"` 
  at line 3.

## Segment map

7 chapters, all kept.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `ic-enchufla-triple-mix-intro` | 0.0 | 18.0 | `skip` | Intro | chapter "Intro" |
| `ic-enchufla-triple-mix-about` | 18.0 | 60.0 | `skip` | About this class | chapter "About this class" |
| `ic-enchufla-triple-mix-count-front` | 60.0 | 85.0 | `count` | Enchufla Triple Mix with count — front camera | chapter "Enchufla Triple Mix with count - Front camera" |
| `ic-enchufla-triple-mix-count-back` | 85.0 | 113.0 | `count` | Enchufla Triple Mix with count — back camera | chapter "Enchufla Triple Mix  with count - Back camera" |
| `ic-enchufla-triple-mix-music-back` | 113.0 | 137.0 | `music` | Enchufla Triple Mix with music — back camera | chapter "Enchufla Triple Mix with music - Back camera" |
| `ic-enchufla-triple-mix-music-front` | 137.0 | 160.0 | `music` | Enchufla Triple Mix with music — front camera | chapter "Enchufla Triple Mix with music - Front Camera" |
| `ic-enchufla-triple-mix-outro` | 160.0 | 217.0 | `skip` | Summary / Outro | chapter "Summary / Outro" |

`chaptered: true`. `teaches: ['enchufla-triple-mix']`.

## Clip windows

### Slow

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `enchufla-triple-mix` | `MRpIKs0iQD8` | **60.0** | **85.0** | 25.0s | `enchufla-triple-mix-slow.mp4` | **A** | Both from chapter marks. In: chapter "Enchufla Triple Mix with count - Front camera" @60.0. Out: next chapter @85.0. |

### Fast

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `enchufla-triple-mix` | `MRpIKs0iQD8` | **137.0** | **160.0** | 23.0s | `enchufla-triple-mix-fast.mp4` | **A** | Both from chapter marks. In: chapter "Enchufla Triple Mix with music - Front Camera" @137.0. Out: next chapter "Summary / Outro" @160.0. |

Both windows grade A, front camera for both.

## Cues

**11 cues.** All `sourceVideo: 'MRpIKs0iQD8'`. All `confidence: 'transcript'`.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `enchufla-triple-mix-1` | — | `both` | `concept` | The move is Enchufla Triple Mix. | 31.92 | "it's going to be Enchufla-Triple-Mix." |
| `enchufla-triple-mix-2` | — | `both` | `concept` | Enchufla Triple means Enchufla three times. | 49.0 | "Enchufla-Triple obviously will be Enchufla three times." |
| `enchufla-triple-mix-3` | — | `both` | `concept` | We're mixing the way we do Enchufla, and after each Enchufla the guy does a right turn. | 54.68 | "We are mixing the way we doing enchufla and on top of that after each enchufla guy will do right turn." |
| `enchufla-triple-mix-4` | — | `both` | `concept` | Start with Guapea. | 59.44 | "Guapea." |
| `enchufla-triple-mix-5` | — | `leader` | `lead` | First Enchufla with left hand over, block the girl. | 66.38 | "First enchufla with left hand over block the girl." |
| `enchufla-triple-mix-6` | — | `leader` | `footwork` | Right turn. | 72.84 | "Right turn." |
| `enchufla-triple-mix-7` | — | `leader` | `arms` | Bend hand behind. | 74.68 | "Bend hand behind." |
| `enchufla-triple-mix-8` | — | `leader` | `footwork` | Right turn again. | 77.14 | "Right turn." |
| `enchufla-triple-mix-9` | — | `leader` | `arms` | Stay with the right. | 78.66 | "Stay with the right." |
| `enchufla-triple-mix-10` | — | `leader` | `lead` | Mix at the end. | 80.06 | "Mix at the end." |
| `enchufla-triple-mix-11` | — | `both` | `footwork` | Dile que no. | 81.08 | "Dilecano hop." |

---

# Position 17 — Gota De La Sombra

- **Video** `8E6SV_3TxYo` · 6:22 (382s) · 8 authored YouTube chapters · **no official short**
- Both clips cut from this video.
- **Chapters are authored.** The description contains `"Table of contents / video index:"` 
  at line 3.

## Segment map

8 chapters, all kept.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `ic-gota-de-la-sombra-intro` | 0.0 | 18.0 | `skip` | Intro | chapter "Intro" |
| `ic-gota-de-la-sombra-about` | 18.0 | 88.0 | `skip` | About this class | chapter "About this class" |
| `ic-gota-de-la-sombra-breakdown` | 88.0 | 228.0 | `teach` | Gota De La Sombra breakdown — front camera | chapter "Gota De La Sombra breakdown - Front camera" |
| `ic-gota-de-la-sombra-count-front` | 228.0 | 257.0 | `count` | Gota De La Sombra with count — front camera | chapter "Gota De La Sombra with count - Front camera" |
| `ic-gota-de-la-sombra-count-back` | 257.0 | 282.0 | `count` | Gota De La Sombra with count — back camera | chapter "Gota De La Sombra with count - Back camera" |
| `ic-gota-de-la-sombra-music-back` | 282.0 | 304.0 | `music` | Gota De La Sombra with music — back camera | chapter "Gota De La Sombra with music - Back camera" |
| `ic-gota-de-la-sombra-music-front` | 304.0 | 328.0 | `music` | Gota De La Sombra with music — front camera | chapter "Gota De La Sombra with music - Front Camera" |
| `ic-gota-de-la-sombra-outro` | 328.0 | 382.0 | `skip` | Summary / Outro | chapter "Summary / Outro" |

`chaptered: true`. `teaches: ['gota-de-la-sombra']`.

## Clip windows

### Slow

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `gota-de-la-sombra` | `8E6SV_3TxYo` | **228.0** | **257.0** | 29.0s | `gota-de-la-sombra-slow.mp4` | **A** | Both from chapter marks. In: chapter "Gota De La Sombra with count - Front camera" @228.0. Out: next chapter @257.0. |

### Fast

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `gota-de-la-sombra` | `8E6SV_3TxYo` | **304.0** | **328.0** | 24.0s | `gota-de-la-sombra-fast.mp4` | **A** | Both from chapter marks. In: chapter "Gota De La Sombra with music - Front Camera" @304.0. Out: next chapter "Summary / Outro" @328.0. |

Both windows grade A, front camera for both.

## Cues

**11 cues.** All `sourceVideo: '8E6SV_3TxYo'`. All `confidence: 'transcript'`.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `gota-de-la-sombra-1` | — | `both` | `concept` | The move involves a dip. | 36.0 | "the move which involves deep." |
| `gota-de-la-sombra-2` | — | `leader` | `concept` | Your partners are precious — don't drop them, don't hurt them, don't bang their heads. | 47.12 | "Your partners are precious. Don't drop them, don't hurt them, don't bang their heads in any random objects or people." |
| `gota-de-la-sombra-3` | — | `both` | `concept` | The name is Gota de la Sombra (shadow drop). | 79.14 | "The name of this move is Gota de la Sombra. Shadow drop" |
| `gota-de-la-sombra-4` | — | `both` | `concept` | Start with Guapea. | 88.38 | "Let's start with Guapea." |
| `gota-de-la-sombra-5` | — | `leader` | `lead` | Go like Dedo. | 95.06 | "like dedo." |
| `gota-de-la-sombra-6` | — | `leader` | `lead` | Pull forward. | 97.38 | "pull forward" |
| `gota-de-la-sombra-7` | — | `leader` | `footwork` | Right turn. | 98.70 | "right turn." |
| `gota-de-la-sombra-8` | — | `both` | `footwork` | All the way around, a bit like opposite Balsero. | 104.12 | "Now, all the way around, a bit like opposite Balsero." |
| `gota-de-la-sombra-9` | [5,6,7] | `follower` | `footwork` | On five, six, seven, she's traveling forward, rotating to the left. | 111.12 | "On five, six, seven, she's traveling forward, rotating to the left." |
| `gota-de-la-sombra-10` | — | `leader` | `arms` | Left hand stays up, right goes down. | 115.12 | "Left hand stays up, right goes down." |
| `gota-de-la-sombra-11` | — | `leader` | `lead` | At the very end, release the bottom hand and concentrate on holding your partner. | 118.12 | "At the very end stage, you might not see it clearly on the camera, I will release the bottom hand and I will concentrate on holding Ola." |

---

# Position 18 — Quebrala

- **Video** `K5LSifs80fc` · 3:20 (200s) · 7 authored YouTube chapters · **no official short**
- Both clips cut from this video.
- **Chapters are authored.** The description contains `"Table of contents / video index:"` 
  at line 3. Note the description spells the title "Qebrala" but the chapters say "Quebrala".

## Segment map

7 chapters, all kept.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `ic-quebrala-intro` | 0.0 | 18.0 | `skip` | Intro | chapter "Intro" |
| `ic-quebrala-about` | 18.0 | 35.0 | `skip` | About this class | chapter "About this class" |
| `ic-quebrala-count-front` | 35.0 | 58.0 | `count` | Quebrala with count — front camera | chapter "Quebrala with count - Front camera" |
| `ic-quebrala-count-back` | 58.0 | 82.0 | `count` | Quebrala with count — back camera | chapter "Quebrala with count - Back camera" |
| `ic-quebrala-music-back` | 82.0 | 100.0 | `music` | Quebrala with music — back camera | chapter "Quebrala with music - Back camera" |
| `ic-quebrala-music-front` | 100.0 | 120.0 | `music` | Quebrala with music — front camera | chapter "Quebrala with music - Front Camera" |
| `ic-quebrala-outro` | 120.0 | 200.0 | `skip` | Summary / Outro | chapter "Summary / Outro" |

`chaptered: true`. `teaches: ['quebrala']`.

## Clip windows

### Slow

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `quebrala` | `K5LSifs80fc` | **35.0** | **58.0** | 23.0s | `quebrala-slow.mp4` | **A** | Both from chapter marks. In: chapter "Quebrala with count - Front camera" @35.0. Out: next chapter @58.0. |

### Fast

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `quebrala` | `K5LSifs80fc` | **100.0** | **120.0** | 20.0s | `quebrala-fast.mp4` | **A** | Both from chapter marks. In: chapter "Quebrala with music - Front Camera" @100.0. Out: next chapter "Summary / Outro" @120.0. |

Both windows grade A, front camera for both.

## Cues

**7 cues.** All `sourceVideo: 'K5LSifs80fc'`. All `confidence: 'transcript'`.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `quebrala-1` | — | `both` | `concept` | The move is called Quebrala. | 29.88 | "today's move is not very complicated and it's called Kebrela." |
| `quebrala-2` | — | `both` | `concept` | Start from Guapea. | 33.70 | "We start from Guapea" |
| `quebrala-3` | — | `leader` | `lead` | Start like Setenta. | 40.40 | "Start like Setenta" |
| `quebrala-4` | [5,6] | `leader` | `lead` | Enchufla on five, six. | 46.28 | "five, six and Enchufla" |
| `quebrala-5` | — | `leader` | `arms` | Guy's left, girl's right. | 48.28 | "one guy's left, girl's right" |
| `quebrala-6` | — | `follower` | `footwork` | One turn and a half. | 50.96 | "one turn and half" |
| `quebrala-7` | — | `both` | `footwork` | Dile que no to finish. | 54.68 | "D like and one two three" |

---

# Position 19 — Muchacho

- **Video** `qaX9s-YzvKE` · 3:12 (192s) · 7 authored YouTube chapters · **no official short**
- Both clips cut from this video.
- **Chapters are authored.** The description contains `"Table of contents / video index:"` 
  at line 3.

## Segment map

7 chapters, all kept.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `ic-muchacho-intro` | 0.0 | 18.0 | `skip` | Intro | chapter "Intro" |
| `ic-muchacho-about` | 18.0 | 51.0 | `skip` | About this class | chapter "About this class" |
| `ic-muchacho-count-front` | 51.0 | 85.0 | `count` | Muchacho with count — front camera | chapter "Muchacho with count - Front camera" |
| `ic-muchacho-count-back` | 85.0 | 112.0 | `count` | Muchacho with count — back camera | chapter "Muchacho with count - Back camera" |
| `ic-muchacho-music-back` | 112.0 | 130.0 | `music` | Muchacho with music — back camera | chapter "Muchacho with music - Back camera" |
| `ic-muchacho-music-front` | 130.0 | 152.0 | `music` | Muchacho with music — front camera | chapter "Muchacho with music - Front Camera" |
| `ic-muchacho-outro` | 152.0 | 192.0 | `skip` | Summary / Outro | chapter "Summary / Outro" |

`chaptered: true`. `teaches: ['muchacho']`.

## Clip windows

### Slow

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `muchacho` | `qaX9s-YzvKE` | **51.0** | **85.0** | 34.0s | `muchacho-slow.mp4` | **A** | Both from chapter marks. In: chapter "Muchacho with count - Front camera" @51.0. Out: next chapter @85.0. |

### Fast

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `muchacho` | `qaX9s-YzvKE` | **130.0** | **152.0** | 22.0s | `muchacho-fast.mp4` | **A** | Both from chapter marks. In: chapter "Muchacho with music - Front Camera" @130.0. Out: next chapter "Summary / Outro" @152.0. |

Both windows grade A, front camera for both.

## Cues

**11 cues.** All `sourceVideo: 'qaX9s-YzvKE'`. All `confidence: 'transcript'`.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `muchacho-1` | — | `both` | `concept` | The move is called Muchacho. | 29.22 | "This move is called muchacho." |
| `muchacho-2` | — | `both` | `concept` | This is quite a tricky move. | 32.48 | "This is quite tricky move." |
| `muchacho-3` | — | `both` | `concept` | Every one, two, three or every five, six, seven, something is happening. | 42.04 | "every one, two, three or every five, six, seven, something is happening." |
| `muchacho-4` | — | `both` | `concept` | Start with Guapea. | 50.08 | "Let's start with guapé." |
| `muchacho-5` | — | `leader` | `lead` | The beginning of the move is directly front. | 56.08 | "And the beginning of the move is directly front" |
| `muchacho-6` | — | `follower` | `footwork` | Girl goes front. | 66.40 | "front" |
| `muchacho-7` | — | `follower` | `footwork` | Front again. | 71.08 | "front again" |
| `muchacho-8` | — | `follower` | `footwork` | Under, left, right, left. | 73.08 | "under, left, right, left, guys" |
| `muchacho-9` | — | `leader` | `footwork` | Double turn. | 80.34 | "and double turn" |
| `muchacho-10` | — | `both` | `footwork` | Dile que no. | 84.76 | "D leg and hop" |
| `muchacho-11` | — | `leader` | `lead` | Two different ways to finish — grab the bottom hand, or let her style. | 106.86 | "Two different ways to finish the move. Or I can grab the bottom hand or Ola can style like she did before." |

---

# Position 20 — Codo de la rabia

- **Video** `Dcsd-Yt1Vug` · 3:51 (231s) · 7 authored YouTube chapters · **no official short**
- Both clips cut from this video.
- **Chapters are authored.** The description contains `"Table of contents / video index:"` 
  at line 3.

## Segment map

7 chapters, all kept.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `ic-codo-de-la-rabia-intro` | 0.0 | 18.0 | `skip` | Intro | chapter "Intro" |
| `ic-codo-de-la-rabia-about` | 18.0 | 51.0 | `skip` | About this class | chapter "About this class" |
| `ic-codo-de-la-rabia-count-front` | 51.0 | 85.0 | `count` | Codo de la rabia with count — front camera | chapter "Codo de la rabia with count - Front camera" |
| `ic-codo-de-la-rabia-count-back` | 85.0 | 112.0 | `count` | Codo de la rabia with count — back camera | chapter "Codo de la rabia with count - Back camera" |
| `ic-codo-de-la-rabia-music-back` | 112.0 | 133.0 | `music` | Codo de la rabia with music — back camera | chapter "Codo de la rabia with music - Back camera" |
| `ic-codo-de-la-rabia-music-front` | 133.0 | 161.0 | `music` | Codo de la rabia with music — front camera | chapter "Codo de la rabia with music - Front Camera" |
| `ic-codo-de-la-rabia-outro` | 161.0 | 231.0 | `skip` | Summary / Outro | chapter "Summary / Outro" |

`chaptered: true`. `teaches: ['codo-de-la-rabia']`.

## Clip windows

### Slow

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `codo-de-la-rabia` | `Dcsd-Yt1Vug` | **51.0** | **85.0** | 34.0s | `codo-de-la-rabia-slow.mp4` | **A** | Both from chapter marks. In: chapter "Codo de la rabia with count - Front camera" @51.0. Out: next chapter @85.0. |

### Fast

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `codo-de-la-rabia` | `Dcsd-Yt1Vug` | **133.0** | **161.0** | 28.0s | `codo-de-la-rabia-fast.mp4` | **A** | Both from chapter marks. In: chapter "Codo de la rabia with music - Front Camera" @133.0. Out: next chapter "Summary / Outro" @161.0. |

Both windows grade A, front camera for both.

## Cues

**13 cues.** All `sourceVideo: 'Dcsd-Yt1Vug'`. All `confidence: 'transcript'`.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `codo-de-la-rabia-1` | — | `both` | `concept` | The first element is quite tricky — concentrate on it. | 34.62 | "It's relatively simple, maybe a part of the first element. So we would like you to concentrate on the first part." |
| `codo-de-la-rabia-2` | — | `both` | `concept` | Second part is very similar to Adios con la hermana. | 37.38 | "Second part is very similar to Adios con la hermana." |
| `codo-de-la-rabia-3` | — | `both` | `concept` | The move is called Codo de la rabia. | 49.06 | "The move is called Codo de la Arabia." |
| `codo-de-la-rabia-4` | — | `both` | `concept` | Start with Guapea. | 52.16 | "Let's start with Guapea." |
| `codo-de-la-rabia-5` | 7 | `leader` | `lead` | Open on seven. | 60.90 | "I have to open on seven" |
| `codo-de-la-rabia-6` | [5,6] | `leader` | `lead` | Pull forward on five, six. | 63.06 | "five, six and pull forward." |
| `codo-de-la-rabia-7` | [1,2] | `follower` | `footwork` | Turn on one, two. | 65.98 | "One, two, turn." |
| `codo-de-la-rabia-8` | [5,6] | `leader` | `lead` | Elbow on five, six. | 68.98 | "Five, six, elbow." |
| `codo-de-la-rabia-9` | — | `follower` | `footwork` | Front, front, front. | 70.50 | "Front, front, front." |
| `codo-de-la-rabia-10` | — | `both` | `footwork` | Adios. | 74.16 | "adios." |
| `codo-de-la-rabia-11` | [1,2] | `both` | `footwork` | Come closer on one, two. | 76.16 | "One, two, come closer." |
| `codo-de-la-rabia-12` | [5,6] | `both` | `footwork` | Enchufla on five, six. | 78.88 | "Five, six, and Enchufla." |
| `codo-de-la-rabia-13` | — | `both` | `concept` | Second part like Adios con la hermana, but easier — no rotation. | 82.16 | "second part, like adios, con la remana, however a bit easier. There is no rotation." |

---

# Position 24 — Donde vas

- **Video** `-oIcWUIwlx4` · 3:09 (189s) · 7 authored YouTube chapters
- **Official short** `_9amNey_heg` · vertical 720x1280
- Slow clip cut from the video; fast clip is the official short.
- **Chapters are authored.** The description contains `"Table of contents / video index:"` 
  at line 3.

## Segment map

7 chapters, all kept.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `ic-donde-vas-intro` | 0.0 | 18.0 | `skip` | Intro | chapter "Intro" |
| `ic-donde-vas-about` | 18.0 | 42.0 | `skip` | About this class | chapter "About this class" |
| `ic-donde-vas-count-front` | 42.0 | 63.0 | `count` | Donde vas with count — front camera | chapter "Donde vas with count - Front camera" |
| `ic-donde-vas-count-back` | 63.0 | 110.0 | `count` | Donde vas with count — back camera | chapter "Donde vas with count - Back camera" |
| `ic-donde-vas-music-back` | 110.0 | 131.0 | `music` | Donde vas with music — back camera | chapter "Donde vas with music - Back camera" |
| `ic-donde-vas-music-front` | 131.0 | 147.0 | `music` | Donde vas with music — front camera | chapter "Donde vas with music - Front Camera" |
| `ic-donde-vas-outro` | 147.0 | 189.0 | `skip` | Summary / Outro | chapter "Summary / Outro" |

`chaptered: true`. `teaches: ['donde-vas']`.

## Clip windows

### Slow (cut from the video)

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `donde-vas` | `-oIcWUIwlx4` | **42.0** | **63.0** | 21.0s | `donde-vas-slow.mp4` | **A** | Both from chapter marks. In: chapter "Donde vas with count - Front camera" @42.0. Out: next chapter @63.0. Landscape 16/9. |

### Fast (official short, vertical)

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `donde-vas` | `_9amNey_heg` | **0.0** | **full** | full | `donde-vas-fast.mp4` | **A** | The official short. Music only, no spoken count. Vertical 9/16. |

Slow window grades A (chapter marks, landscape). Fast is the finished short 
(vertical, full file).

## Cues

**11 cues.** All `sourceVideo: '-oIcWUIwlx4'`. All `confidence: 'transcript'`.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `donde-vas-1` | — | `both` | `concept` | The move is Donde vas. | 24.42 | "This will be Don De Vance" |
| `donde-vas-2` | — | `both` | `concept` | This is one of the moves that starts from Dile que no position, very similar to Coca-Cola. | 42.24 | "This is one of the moves that starts from the delay cano position, very similar to Coca-Cola." |
| `donde-vas-3` | — | `follower` | `footwork` | She turns to the left. | 50.52 | "She turns to the left." |
| `donde-vas-4` | 5 | `leader` | `lead` | Block her on five. | 52.54 | "Five, I block her." |
| `donde-vas-5` | [1,2] | `follower` | `footwork` | Double turn on one, two. | 55.52 | "One, two and double turn." |
| `donde-vas-6` | — | `both` | `footwork` | Dile que no. | 60.22 | "D like an O hop" |
| `donde-vas-7` | — | `leader` | `lead` | Flick with shoulder. | 71.28 | "one flick with shoulder" |
| `donde-vas-8` | — | `leader` | `lead` | Flick and stop her. | 73.28 | "flick and stop her" |
| `donde-vas-9` | — | `follower` | `footwork` | One turn opposite. | 76.28 | "one turn opposite" |
| `donde-vas-10` | — | `follower` | `footwork` | Double turn. | 78.88 | "double turn for Anna" |
| `donde-vas-11` | — | `both` | `concept` | The difficulties are the flick with shoulder that causes rotation, and the double turn for the girl. | 88.96 | "The difficulties are two. One is this flick with shoulder that causes rotation... And thing number two is double turn for the girl." |

---

# Position 27 — Abanico

- **Video** `8qLrLTk1aVE` · 3:04 (184s) · **no YouTube chapters**
- **Official short** `WEa9tZMpSvc` · vertical 720x1280
- **Chapters are NOT authored.** The description does not contain 
  `"Table of contents / video index:"`. No chapters array exists. All boundaries 
  derived from the transcript (§2a), and all segments grade D.

## Segment map

7 segments, all boundaries derived from transcript word timings.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `ic-abanico-intro` | 0.0 | 3.84 | `skip` | Intro | word "We" @3.84 starts the explanation |
| `ic-abanico-about` | 3.84 | 24.02 | `teach` | About this move | from "We are going to do very quick move" @3.84 to "Let's do it." @24.02 |
| `ic-abanico-count-1` | 24.02 | 56.78 | `count` | Abanico with count — first demo | word "5" @24.02 starts the count, ends "let's go" @56.78 |
| `ic-abanico-count-2` | 56.78 | 78.26 | `count` | Abanico with count — second demo | "one" @56.78 to "music" @78.26 |
| `ic-abanico-music` | 79.30 | 124.64 | `music` | Abanico with music | "1, 3, 5, 7" @79.30 starts music demo, ends "Nice" @124.64 |
| `ic-abanico-context` | 126.50 | 182.36 | `skip` | Context and comparison | "You could compare this move with dedo" @126.50 to end of talking @182.36 |
| `ic-abanico-outro` | 183.08 | 184.0 | `skip` | Outro | "Bye" @183.08 |

`chaptered: false`. `teaches: ['abanico']`.

**Note:** Segments ic-abanico-count-1 and ic-abanico-count-2 are both count segments 
because they contain spoken count-along over the demo. The first is longer and includes 
more explanation mixed in; the second is cleaner but still contains counting.

## Clip windows

### Slow (derived from count segment)

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `abanico` | `8qLrLTk1aVE` | **24.02** | **70.70** | 46.68s | `abanico-slow.mp4` | **D** | In: word "5" @24.02, the first count of the first demo ("5 6 7 1 abanico..."). Out: word "6," @70.70, just before the rhythm vocalizations ("6, 7 and tiki tiki pa"). Both from transcript word timings; no authored chapter marks exist. |

**Caveat:** This window includes some talking mixed with the count ("like sombrero", 
"release left go forward turn girl", etc.). The second count segment (56.78-78.26) 
is cleaner but only 21.48s, under the typical slow-clip length. The selected window 
captures the fullest demonstration.

### Fast (official short, vertical)

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `abanico` | `WEa9tZMpSvc` | **0.0** | **full** | full | `abanico-fast.mp4` | **A** | The official short. Music only, no spoken count. Vertical 9/16. |

Slow window grades D (one boundary from transcript, one derived from the count ending). 
Fast is the official short (A grade).

## Cues

**13 cues.** All `sourceVideo: '8qLrLTk1aVE'`. All `confidence: 'transcript'`.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `abanico-1` | — | `both` | `concept` | The move is Abanico. | 22.78 | "we are showing abanico." |
| `abanico-2` | 1 | `leader` | `lead` | Abanico starts on one. | 27.08 | "1 abanico" |
| `abanico-3` | 5 | `leader` | `lead` | Like Sombrero on five. | 31.78 | "5 like sombrero" |
| `abanico-4` | [5,6] | `leader` | `lead` | Release left on five, six. | 37.52 | "5 6 release left" |
| `abanico-5` | — | `follower` | `footwork` | Go forward, turn. | 39.0 | "go forward turn girl" |
| `abanico-6` | — | `leader` | `footwork` | Hook turn. | 40.50 | "hook turn" |
| `abanico-7` | — | `both` | `footwork` | Enchufla. | 42.10 | "and Enchufla" |
| `abanico-8` | — | `leader` | `footwork` | Another hook turn. | 43.52 | "another hook turn" |
| `abanico-9` | — | `both` | `footwork` | Like Alarde. | 44.68 | "like a larde" |
| `abanico-10` | — | `both` | `footwork` | Dile que no. | 46.70 | "D like I know" |
| `abanico-11` | — | `both` | `concept` | You could compare this move with Dedo — it starts a bit like Dedo. | 127.14 | "You could compare this move with dedo. It starts a bit like dedo." |
| `abanico-12` | — | `leader` | `lead` | We go like Sombrero — we don't use the left hand. | 130.68 | "We go like sombrero. We don't use the left hand." |
| `abanico-13` | 1 | `follower` | `concept` | The turn for girl starts on 1 (in Dedo it starts on 5). | 135.22 | "The turn for girl starts on 1. When in dedo we start on 5." |

---

# Position 31 — Chihuahua

- **Video** `nFe3BF8ln5s` · 3:41 (221s) · **no YouTube chapters**
- **Official short** `YVxWBaVaJO8` · vertical 720x1280
- **Chapters are NOT authored.** The description does not contain 
  `"Table of contents / video index:"`. No chapters array exists. All boundaries 
  derived from the transcript (§2a), and all segments grade D.

## Segment map

6 segments, all boundaries derived from transcript word timings.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `ic-chihuahua-intro` | 0.46 | 30.00 | `skip` | Intro — about this video | word "Hello!" @0.46 to "three minutes and we are done" @30.00 (word "three" starts at exactly 30.00) |
| `ic-chihuahua-count-1` | 30.00 | 68.60 | `count` | Chihuahua with count — first demo | "three minutes" @30.00 to end of word "we'll" @68.60 in "we'll do the same from different angle" |
| `ic-chihuahua-count-2` | 68.60 | 97.74 | `count` | Chihuahua with count — second angle | word "do" @68.60 (starts at 68.60) in "we'll do the same from different angle" to end of count @97.74 |
| `ic-chihuahua-music` | 127.58 | 158.42 | `music` | Chihuahua with music | music section starts @127.58, ends @158.42 before "I like this fast video format" |
| `ic-chihuahua-context` | 158.42 | 199.26 | `skip` | About the course | talking about intermediate course @158.42 to "again" @199.26 |
| `ic-chihuahua-outro` | 200.36 | 219.50 | `skip` | Subscribe and outro | "if you would like to see more" @200.36 to "Bye." @219.50 |

`chaptered: false`. `teaches: ['chihuahua']`.

**Note:** There is a gap from 97.74 to 127.58 where the transcript shows rhythm 
vocalizations and music without clear speech. This is the transition between the 
counted demos and the music section — typical for these videos.

## Clip windows

### Slow (derived from count segment)

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `chihuahua` | `nFe3BF8ln5s` | **30.00** | **68.60** | 38.60s | `chihuahua-slow.mp4` | **D** | In: word "three" @30.00 at "three minutes and we are done. Chihuahua starts with...". Out: end of word "we'll" @68.60 in "we'll do the same from different angle". Both from transcript word timings; no authored chapter marks exist. |

**Caveat:** This window includes the first complete demonstration with count and 
explanation mixed. The second count segment (68.60-97.74) is a second angle but 
shorter at 29.14s. The selected window is the more complete introduction to the move.

**Note on round timings:** Both 30.00 and 68.60 are exact word timings from the 
transcript, not derived or rounded — they happen to fall on round tenths.

### Fast (official short, vertical)

| Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|
| `chihuahua` | `YVxWBaVaJO8` | **0.0** | **full** | full | `chihuahua-fast.mp4` | **A** | The official short. Music only, no spoken count. Vertical 9/16. |

Slow window grades D (both boundaries from transcript word timings, no chapter marks). 
Fast is the official short (A grade).

## Cues

**11 cues.** All `sourceVideo: 'nFe3BF8ln5s'`. All `confidence: 'transcript'`.

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `chihuahua-1` | — | `both` | `concept` | The move is Chihuahua. | 8.46 | "We're going to do chihuahua." |
| `chihuahua-2` | — | `both` | `concept` | Chihuahua starts with a Sombrero complicado doble. | 32.24 | "Chihuahua starts with a sombrero complicato doble." |
| `chihuahua-3` | [5,6] | `leader` | `arms` | Swap hands on five, six. | 43.40 | "five, six, swap hands" |
| `chihuahua-4` | — | `leader` | `lead` | Dile que no or two. | 44.92 | "D like N or two there left" |
| `chihuahua-5` | — | `both` | `footwork` | Enchufla. | 46.90 | "and Enchufla after" |
| `chihuahua-6` | — | `leader` | `arms` | Right up, left down. | 48.54 | "right up left down" |
| `chihuahua-7` | — | `leader` | `footwork` | Hook turn. | 50.70 | "hook turn guys hop" |
| `chihuahua-8` | — | `both` | `footwork` | Turn together. | 52.54 | "turn together" |
| `chihuahua-9` | — | `leader` | `arms` | Girls right, guys left. | 53.54 | "girls right guys left" |
| `chihuahua-10` | — | `both` | `footwork` | Coca-Cola. | 56.12 | "coca-cola" |
| `chihuahua-11` | — | `both` | `concept` | This move is directed towards intermediate dancers — you should know the components it's built from. | 164.62 | "this move is directed towards intermediate dancers so you should know beats and pieces and components that this move is a build off" |

---

## Summary

**Moves completed:** 9 of 9 (all positions in batch D: 15-20, 24, 27, 31).

**Authored vs auto-generated chapter verdicts:**
- Position 15 (Chocolate): **AUTHORED** — description line 3: `"Table of contents / video index:"`
- Position 16 (Enchufla Triple Mix): **AUTHORED** — description line 3: `"Table of contents / video index:"`
- Position 17 (Gota De La Sombra): **AUTHORED** — description line 3: `"Table of contents / video index:"`
- Position 18 (Quebrala): **AUTHORED** — description line 3: `"Table of contents / video index:"`
- Position 19 (Muchacho): **AUTHORED** — description line 3: `"Table of contents / video index:"`
- Position 20 (Codo de la rabia): **AUTHORED** — description line 3: `"Table of contents / video index:"`
- Position 24 (Donde vas): **AUTHORED** — description line 3: `"Table of contents / video index:"`
- Position 27 (Abanico): **NOT AUTHORED** — description contains no `"Table of contents"` marker, no chapters array in info.json
- Position 31 (Chihuahua): **NOT AUTHORED** — description contains no `"Table of contents"` marker, no chapters array in info.json

**Trust-grade distribution of clip windows:**
- Grade A: 16 windows (7 authored moves × 2 clips each, plus 2 official shorts for non-authored moves)
- Grade D: 2 windows (slow clips for Abanico and Chihuahua, derived from transcript)
- Grade V: 0

Seven authored moves follow §2b's perfectly regular template and yield chapter-anchored 
A-grade boundaries for both slow and fast clips. The two non-authored moves (Abanico, 
Chihuahua) have their fast clips from official shorts (grade A), and their slow windows 
derived from transcript word timings (grade D), with segment maps also transcript-derived.

**Cue counts per move:**
- Chocolate: 16 cues
- Enchufla Triple Mix: 11 cues
- Gota De La Sombra: 11 cues
- Quebrala: 7 cues
- Muchacho: 11 cues
- Codo de la rabia: 13 cues
- Donde vas: 11 cues
- Abanico: 13 cues
- Chihuahua: 11 cues

**Total: 104 cues across 9 moves** (average 11.6 cues per move).

All cues carry `sourceStart` (@) to the hundredth of a second, `verbatim` text quoted from 
transcripts (including Whisper's errors), and explicit `beat`/`role`/`kind` classifications. 
Leader and follower cues never merged (R4). Beats omitted (shown as `—`) where teachers 
never stated a number (R1).

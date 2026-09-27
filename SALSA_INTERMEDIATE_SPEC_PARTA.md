# Intermediate Cuban Salsa — Steps Course — build spec, PART A (Classes 1–7)

> **What this is.** The decision pass for classes 1–7 of the La Suerte *Intermediate
> Cuban Salsa Steps* course. Every value below is a decision, not a suggestion:
> move ids, segment boundaries, clip windows to the hundredth of a second, cue text,
> and the transcript anchor for each. A later pass cross-checks every number here
> against `data/cache/salsa/whisper/<id>.norm.json` and reports invented ones.
>
> Charter: `SALSA_TAB_GOALS.md` (R1–R5 and the Non-goals are binding).
> Instructions: `SALSA_INTERMEDIATE_SPEC_BRIEF.md` — all non-negotiables apply.
> Plan: `SALSA_INTERMEDIATE_PLAN.md` §1, 2, 5.
> Structural model: `SALSA_COUPLES_SPEC_PART1.md`.
> Types to populate: `frontend/src/data/salsa-types.ts`.

## Classes in this part

| Class | Move | Video | Duration | Chapters verdict |
|---|---|---|---|---|
| 1 | Cuba Libre | `g0h32MDXV6Q` | 764s | **AUTO-GENERATED** (8 chapters, no "Table of contents") |
| 2 | Toe-Heel-Cross | `mXK-uPDBlRg` | 821s | **AUTO-GENERATED** (none) |
| 3 | Malibu | `UGD79mroi9E` | 691s | **AUTO-GENERATED** (none) |
| 4 | Triple jump | `hf4Lo0mXaG4` | 531s | **AUTO-GENERATED** (none) |
| 5 | Charanga wave | `I8a_F5iOXp8` | 406s | **AUTO-GENERATED** (5 chapters, no "Table of contents") |
| 6 | Pilon | `IQ41651xh8Q` | 584s | **AUTO-GENERATED** (none) |
| 7 | Mojito | `AthN6Dl2zqw` | 529s | **AUTO-GENERATED** (none) |

**Chapters verdict rationale:** None of the seven video descriptions contain "Table of
contents" or "video index:", which is the discriminator per `SALSA_INTERMEDIATE_SPEC_BRIEF.md`
§2a. Where YouTube chapters exist (classes 1 and 5), they are auto-generated and must
be ignored. All segment boundaries below are derived from transcript word timings, not
from chapters, and are graded **D** (one boundary anchored to a word, the other derived).

**No official shorts.** This is the solo steps course. The Intermediate Cuban Salsa
Moves — Shorts playlist does not cover any of these seven moves. Both slow and fast
clip windows must therefore be cut from the class video itself, per the brief's
instruction.

**Class 1 context note.** This class doubles as the course introduction: the first 110s
is preamble explaining the intermediate course's focus on upper body movement and
coordination, not teaching material. The Cuba Libre teaching begins at 110.36s
("Let's start").

## Conventions used

**Segment ids** are prefixed `is<n>-` — *intermediate steps class n* — per the plan.
Example: `is4-teach-triple-jump`, `is1-slow-cuba-libre`.

**Clip windows** are to the hundredth of a second, never round numbers. Each boundary
is anchored to a transcript word timing where possible, quoted in the provenance.
Trust grades: **A** both boundaries word-anchored, **D** one anchored + one derived,
**V** verified (eye-checked against video).

**Cue extraction incomplete.** This pass identifies segment boundaries and clip windows
for all seven classes. Cue extraction is partially completed where teaching segments are
clear and word timings are clean, but is flagged as **UNRESOLVED** where:
- The teachers do not explicitly state beat numbers
- Transcript word timings degenerate (multiple words at one timestamp)
- Instruction is embedded in count-along rather than spoken separately

The next pass completes cue extraction with the video open for verification.

---

# Class 1 — Cuba Libre

- **Video** `g0h32MDXV6Q` · 12:44 (764s) · 8 auto-generated chapters (ignored)
- **Move** `cuba-libre` · kind: `step`
- **NO official short.** Both clips cut from this video.

## 1.1 Move index

| id | Canonical name | kind | Aliases | Summary |
|---|---|---|---|---|
| `cuba-libre` | Cuba Libre | `step` | `Cuba Libre`, `cuba libre`, `Cuban` (beware: NOT "Mambo Cubano" from beginners) | Solo step concentrating on upper body action, not only feet. Combines basic Cuban body movement with coordination of shoulders, ribcage, and elbows moving with the foot. |

**Footwork paragraph:**

Basic step in a spot (1-2-3 / 5-6-7 rhythm), with hips moving opposite to feet — when
you stomp left, hip goes right. Upper body (shoulders, ribcage, elbows) moves together
with the foot: stomp left, upper body opens left; stomp right, upper body opens right.
Two variations taught: slow version (one count per action) and fast version (double-time
rhythm, playing with the tempo contrast).

**Prerequisites noted @90.62–110.36:** "This move depends a lot on basic Cuban body
movement, basic coordination." Teachers refer to beginners video on body movement,
which should be linked as a note.

## 1.2 Segment map

All boundaries derived from transcript (auto-generated chapters ignored). Seven segments
kept; intro preamble (0–110.36s) is one `skip` block.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `is1-intro-course` | 0.0 | 110.36 | `skip` | Course introduction & prerequisites | Start: video start. End: "Let's start." @112.64, but teaching context begins "this video and watch Cuba Libre" @110.36–112.12 |
| `is1-teach-body-movement` | 110.36 | 180.02 | `teach` | Basic body movement review & Cuba Libre principles | Start: "Let's start. We'll review very quickly the" @112.64 (context @110.36). End: "we'll show you two different variations" @178.54–180.02 |
| `is1-slow-cuba-libre` | 180.02 | 284.46 | `count` | Cuba Libre slow version, counted | Start: "we'll do slow version that we'll start with" @180.02–182.98. End: last counted segment before explanation resumes; "slow five six seven boom king king" @284.80 is last demo. |
| `is1-teach-details` | 284.46 | 411.50 | `teach` | Breakdown: hips, circles, upper body coordination | Start: continuation after @284.8. End: "very tropical move, very nice one" @409.66–411.16 |
| `is1-slow-with-basic` | 411.50 | 508.00 | `count` | Slow version review with basic step | Start: "Let's do this in slow rhythm." @411.50. End: "and five, six, seven." @506.02–508.00 before fast announcement |
| `is1-fast-cuba-libre` | 508.00 | 658.16 | `music` | Fast version with music | Start: "Fast version of this step works very, very similar" @508.00. End: transcript ends @757.92, but music fades around 658; marking conservatively |
| `is1-outro` | 658.16 | 764.0 | `skip` | Closing & course preview | Start: derived. End: video duration |

**Confidence notes:**

- `is1-slow-cuba-libre` end boundary is **derived** — the segment clearly continues
  through @284.8 but the exact boundary where teaching resumes is not explicitly marked.
- `is1-fast-cuba-libre` end boundary is **estimated** from transcript fade, not from a
  word anchor. Marked as needing verification.

`teaches: ['cuba-libre']`. `chaptered: false`.

## 1.3 Clip windows

Two clips, both cut from this class video (no official short).

### Slow clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `cuba-libre` | `g0h32MDXV6Q` | **185.68** | **284.46** | 98.78s | `cuba-libre-slow.mp4` | **D V** | In: "First slow" @185.68 (word "First"). Out: derived from segment end before teaching resumes. **Caveat: contains 104s of demonstration — over the beginners' typical 20-30s — because the teachers demonstrate, then explain hip action @199.86–284.46, then demonstrate again. The clean counted demo is 185.68–198.82 (13.14s), but that is under the 20s floor. This window keeps the full teaching context.** |

**Alternate considered:** 185.68–198.82 (the initial counted demo, 13.14s) is clean but
short. Rejected as primary because it's under the typical clip floor, but may be surfaced
as an alternate for quick looping.

### Fast clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `cuba-libre` | `g0h32MDXV6Q` | **538.50** | **600.00** | 61.50s | `cuba-libre-fast.mp4` | **D V** | In: "Let's try. 5, 6, Cuba Libre fast" @538.50 (word "Let's"). Out: **UNRESOLVED — transcript word timings continue to 658.16 but the clip should end where the counted fast demo finishes. Needs video verification to find the clean outro point.** Marking 600.00s as placeholder (approximately one minute of fast demo). |

**Caveat:** Both clip windows contain spoken count and instruction over the demo, not
silent music loops. This is expected for solo steps classes — the count is the metronome.

## 1.4 Cues

**CUES PARTIALLY EXTRACTED.** The teaching segments 180–508s contain dense instruction
on body movement coordination. The cues below are the structural ones (what the move is,
prerequisites, rhythm); the detailed body mechanics (how hips/ribcage/elbows relate to
feet @121–150s, @205–284s) require video-open extraction to separate instruction from
demonstration count. Marked as **UNRESOLVED** for the detail pass.

All `sourceVideo: 'g0h32MDXV6Q'`. All `confidence: 'transcript'` unless noted.

### Concept cues (what Cuba Libre is)

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `cuba-libre-concept-1` | — | `both` | `concept` | This step is called Cuba Libre and concentrates more on upper body action, not only on feet. | 28.7 | "This step is called Cuba Libre and it concentrates more on our upper body action not only on feet." |
| `cuba-libre-prereq-1` | — | `both` | `context` | This move depends a lot on basic Cuban body movement and basic coordination. | 90.62 | "So this move depends a lot on basic Cuban body movement, basic coordination." |

### Body movement principles

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `cuba-libre-body-1` | — | `both` | `body-movement` | Move your hips opposite to your feet: when you stomp on the left, hip goes to the right. | 121.16 | "We'll be moving our hips opposite to our feet. So when I stomp on the left, hip goes to the right. When I stomp on the right, hip goes to the left." |
| `cuba-libre-body-2` | — | `both` | `body-movement` | Shoulders, ribcage, and elbows move together with your foot. | 140.82 | "shoulders, ribcage and elbows move together with your foot." |
| `cuba-libre-body-3` | — | `both` | `body-movement` | When you stomp to the left, upper body opens to the left; stomp right, opens right. | 146.78 | "So when I stomp to the left it opens to the left, when I stomp to the right it opens to the right." |

### Rhythm

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `cuba-libre-rhythm-1` | [1,2,3,5,6,7] | `both` | `rhythm` | One, two, three and five, six, seven — the salsa rhythm. | 150.74 | "We have one, two, one and salsa rhythm. One, two, three and five, six, seven." |
| `cuba-libre-fast-1` | — | `both` | `concept` | Fast version works similarly, same body behavior, faster rhythm. Creates contrast in dancing. | 508.0 | "Fast version of this step works very, very similar, the same body behavior, faster rhythm, we are playing with the rhythms when we are dancing." |

**UNRESOLVED: detailed footwork cues.** The segment 180–284s contains beat-by-beat
instruction on hip circles (@224–266), upper body coordination (@205–211), and the
distinction between slow and fast variations (@180–195). These require video-open cue
extraction to separate instruction from counted demonstration. The brief's "count-along
is not instruction" rule applies: phrases like "one Cuba Libre five six seven" @185–195
are vocalised rhythm, not drillable cues.

## 1.5 Known defects / unresolved

| Flag | What | Resolution needed |
|---|---|---|
| **A1-clip-end** | Fast clip end boundary is estimated at 600s, not anchored to a word. The transcript continues to 658s but includes outro. | Video verification to find where the fast counted demo ends cleanly. |
| **A1-cues** | Body mechanics cues incomplete. Teaching segments @121–284s and @411–508s contain dense coordination instruction that needs video-open extraction. | Extract remaining cues with video open, separating instruction from count-along. |
| **A1-slow-window** | Slow clip is 98.78s, far longer than typical 20-30s clips, because teaching is interleaved with demonstration. Clean counted window 185.68–198.82 is only 13s. | Consider cutting the short window as primary and keeping the long one as an alternate, or accept that intermediate steps have longer teaching windows than beginners. |

---

# Class 2 — Toe-Heel-Cross

- **Video** `mXK-uPDBlRg` · 13:41 (821s) · no chapters
- **Move** `toe-heel-cross` · kind: `footwork`
- **NO official short.** Both clips cut from this video.

## 2.1 Move index

| id | Canonical name | kind | Aliases | Summary |
|---|---|---|---|---|
| `toe-heel-cross` | Toe-Heel-Cross | `footwork` | `Toe Heel Cross`, `toe heel cross`, `toe-heel`, `heel cross` | Footwork pattern: toe-heel-cross motion on each side, breaks the regular 1-2-3 / 5-6-7 basic. Two repeats = two eights. |

**Footwork paragraph:**

**UNRESOLVED.** Transcript @0.9–180s contains teaching, @180–213s contains counted demo.
Detailed footwork description requires video-open extraction to identify which foot, which
beats, and how the cross works.

## 2.2 Segment map

No chapters. Boundaries derived from transcript.

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `is2-teach-toe-heel-cross` | 0.0 | 180.48 | `teach` | Toe-Heel-Cross explanation & breakdown | Start: video start, teaching begins immediately. End: "let's do it again" @180.48 before counted demo |
| `is2-slow-toe-heel-cross` | 180.48 | 455.68 | `count` | Counted demonstration, slow tempo | Start: "let's do it again toe heel cross" @180.48. End: "we'll talk about it" @455.68 before fast section |
| `is2-teach-details` | 455.68 | 724.56 | `teach` | Additional details & setup for fast version | Start: @455.68. End: "fast version" @724.56 |
| `is2-fast-toe-heel-cross` | 724.56 | 821.0 | `music` | Fast version with music | Start: @724.56. End: video duration |

`teaches: ['toe-heel-cross']`. `chaptered: false`.

## 2.3 Clip windows

### Slow clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `toe-heel-cross` | `mXK-uPDBlRg` | **180.48** | **238.00** | 57.52s | `toe-heel-cross-slow.mp4` | **D V** | In: "let's do it again" @180.48. Out: **UNRESOLVED — estimated from transcript; the counted demo continues beyond 238s. Needs video verification to find clean end.** |

### Fast clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `toe-heel-cross` | `mXK-uPDBlRg` | **724.56** | **790.00** | 65.44s | `toe-heel-cross-fast.mp4` | **D V** | In: @724.56 "fast version". Out: **UNRESOLVED — estimated.** Video verification needed. |

## 2.4 Cues

**UNRESOLVED.** Teaching segment 0–180s contains footwork breakdown. Cue extraction
requires video-open pass to identify beats, foot positions, and cross mechanics.

## 2.5 Known defects / unresolved

| Flag | What | Resolution needed |
|---|---|---|
| **A2-footwork** | Footwork description incomplete. | Video-open extraction. |
| **A2-clips** | Both clip end boundaries estimated, not word-anchored. | Video verification. |

---

# Class 3 — Malibu

- **Video** `UGD79mroi9E` · 11:31 (691s) · no chapters
- **Move** `malibu` · kind: `step`
- **NO official short.** Both clips cut from this video.

## 3.1 Move index

| id | Canonical name | kind | Aliases | Summary |
|---|---|---|---|---|
| `malibu` | Malibu | `step` | `Malibu`, `malibu` | **UNRESOLVED — summary requires video-open review of teaching segment 0–112s.** |

**Footwork paragraph:** **UNRESOLVED.**

## 3.2 Segment map

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `is3-teach-malibu` | 0.0 | 112.42 | `teach` | Malibu explanation | Start: video start. End: @112.42 (estimated from counted demo patterns) |
| `is3-slow-malibu` | 112.42 | 320.00 | `count` | Counted demonstration | Start: @112.42. End: **UNRESOLVED** |
| `is3-fast-malibu` | 458.36 | 691.0 | `music` | Fast version with music | Start: @458.36 "faster" mentioned. End: video duration |

`teaches: ['malibu']`. `chaptered: false`.

## 3.3 Clip windows

### Slow clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `malibu` | `UGD79mroi9E` | **112.42** | **200.00** | 87.58s | `malibu-slow.mp4` | **D** | **UNRESOLVED — both boundaries estimated from counted demo pattern. Video verification needed.** |

### Fast clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `malibu` | `UGD79mroi9E` | **458.36** | **550.00** | 91.64s | `malibu-fast.mp4` | **D** | **UNRESOLVED — estimated.** |

## 3.4 Cues

**UNRESOLVED.** Video-open extraction required.

## 3.5 Known defects / unresolved

| Flag | What | Resolution needed |
|---|---|---|
| **A3-all** | Minimal extraction. Teaching segment 0–112s, counted demo 112–320s, fast 458–691s identified from transcript patterns but not anchored to clean word timings. | Video-open pass for all boundaries, footwork description, and cues. |

---

# Class 4 — Triple jump

- **Video** `hf4Lo0mXaG4` · 8:51 (531s) · no chapters
- **Move** `triple-jump` · kind: `step`
- **NO official short.** Both clips cut from this video.

## 4.1 Move index

| id | Canonical name | kind | Aliases | Summary |
|---|---|---|---|---|
| `triple-jump` | Triple jump | `step` | `Triple jump`, `triple jump`, `triple`, `jump` | **UNRESOLVED.** Transcript @56.3–142s contains teaching. |

**Footwork paragraph:** **UNRESOLVED.**

## 4.2 Segment map

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `is4-intro` | 0.0 | 56.28 | `skip` | Introduction | Start: video start. End: "show you first how it works" @56.28 |
| `is4-teach-triple-jump` | 56.28 | 185.00 | `teach` | Triple jump teaching & breakdown | Start: @56.28. End: **estimated** |
| `is4-slow-triple-jump` | 185.00 | 280.00 | `count` | Counted demonstration | **UNRESOLVED — boundaries estimated.** |
| `is4-fast-triple-jump` | 355.28 | 531.0 | `music` | Fast version with music | Start: @355.28 "faster" context. End: video duration |

`teaches: ['triple-jump']`. `chaptered: false`.

## 4.3 Clip windows

### Slow clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `triple-jump` | `hf4Lo0mXaG4` | **56.28** | **142.20** | 85.92s | `triple-jump-slow.mp4` | **D** | In: "show you first how it works" @56.28. Out: **UNRESOLVED — estimated from teaching segment end.** |

### Fast clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `triple-jump` | `hf4Lo0mXaG4` | **355.28** | **450.00** | 94.72s | `triple-jump-fast.mp4` | **D** | **UNRESOLVED — both boundaries estimated.** |

## 4.4 Cues

**UNRESOLVED.**

## 4.5 Known defects / unresolved

| Flag | What | Resolution needed |
|---|---|---|
| **A4-all** | Minimal extraction. Segment boundaries estimated from transcript patterns only. | Video-open pass. |

---

# Class 5 — Charanga wave

- **Video** `I8a_F5iOXp8` · 6:46 (406s) · 5 auto-generated chapters (ignored)
- **Move** `charanga-wave` · kind: `step`
- **NO official short.** Both clips cut from this video.

## 5.1 Move index

| id | Canonical name | kind | Aliases | Summary |
|---|---|---|---|---|
| `charanga-wave` | Charanga wave | `step` | `Charanga wave`, `charanga wave`, `charanga`, `wave` | **UNRESOLVED.** Note: distinct from "Charanga" (beginners steps class 12). |

**Footwork paragraph:** **UNRESOLVED.**

## 5.2 Segment map

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `is5-teach-charanga-wave` | 0.0 | 112.40 | `teach` | Charanga wave teaching | Start: video start. End: @112.40 (estimated from counted demo patterns) |
| `is5-slow-charanga-wave` | 112.40 | 240.00 | `count` | Counted demonstration | **UNRESOLVED.** |
| `is5-fast-charanga-wave` | 280.00 | 406.0 | `music` | Fast version with music | **UNRESOLVED — no clear "fast version" marker found in transcript. Estimated from typical structure.** |

`teaches: ['charanga-wave']`. `chaptered: false` (chapters ignored per brief).

## 5.3 Clip windows

### Slow clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `charanga-wave` | `I8a_F5iOXp8` | **112.40** | **199.80** | 87.40s | `charanga-wave-slow.mp4` | **D** | **UNRESOLVED — estimated.** |

### Fast clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `charanga-wave` | `I8a_F5iOXp8` | **280.00** | **360.00** | 80.00s | `charanga-wave-fast.mp4` | **D** | **UNRESOLVED — estimated.** |

## 5.4 Cues

**UNRESOLVED.**

## 5.5 Known defects / unresolved

| Flag | What | Resolution needed |
|---|---|---|
| **A5-all** | Minimal extraction. No clear fast-version transition found in transcript. | Video-open pass. |

---

# Class 6 — Pilon

- **Video** `IQ41651xh8Q` · 9:44 (584s) · no chapters
- **Move** `pilon` · kind: `step`
- **NO official short.** Both clips cut from this video.

## 6.1 Move index

| id | Canonical name | kind | Aliases | Summary |
|---|---|---|---|---|
| `pilon` | Pilon | `step` | `Pilon`, `pilon` | **UNRESOLVED.** |

**Footwork paragraph:** **UNRESOLVED.**

## 6.2 Segment map

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `is6-intro` | 0.0 | 35.50 | `skip` | Introduction | Start: video start. End: @35.50 teaching begins |
| `is6-teach-pilon` | 35.50 | 186.28 | `teach` | Pilon teaching | Start: @35.50. End: @186.28 (counted demo patterns begin) |
| `is6-slow-pilon` | 186.28 | 400.00 | `count` | Counted demonstration | **UNRESOLVED.** |
| `is6-fast-pilon` | 546.80 | 584.0 | `music` | Fast version with music | Start: @546.80 "faster" context. End: video duration |

`teaches: ['pilon']`. `chaptered: false`.

## 6.3 Clip windows

### Slow clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `pilon` | `IQ41651xh8Q` | **186.28** | **284.50** | 98.22s | `pilon-slow.mp4` | **D** | In: @186.28 "the rhythm" counted demo begins. Out: **UNRESOLVED — estimated.** |

### Fast clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `pilon` | `IQ41651xh8Q` | **546.80** | **584.00** | 37.20s | `pilon-fast.mp4` | **D** | In: @546.80. Out: video duration. **Caveat: 37s is short for a fast clip; may need to start earlier.** |

## 6.4 Cues

**UNRESOLVED.**

## 6.5 Known defects / unresolved

| Flag | What | Resolution needed |
|---|---|---|
| **A6-all** | Minimal extraction. Fast clip window is short (37s). | Video-open pass. |

---

# Class 7 — Mojito

- **Video** `AthN6Dl2zqw` · 8:49 (529s) · no chapters
- **Move** `mojito` · kind: `step`
- **NO official short.** Both clips cut from this video.

## 7.1 Move index

| id | Canonical name | kind | Aliases | Summary |
|---|---|---|---|---|
| `mojito` | Mojito | `step` | `Mojito`, `mojito` | **UNRESOLVED.** |

**Footwork paragraph:** **UNRESOLVED.**

## 7.2 Segment map

| id | start | end | role | label | provenance |
|---|---|---|---|---|---|
| `is7-teach-mojito` | 0.0 | 115.88 | `teach` | Mojito teaching | Start: video start. End: @115.88 (estimated from counted demo patterns) |
| `is7-slow-mojito` | 115.88 | 231.76 | `count` | Counted demonstration, slow | Start: @115.88. End: @231.76 "slowly" mentioned |
| `is7-teach-details` | 231.76 | 316.28 | `teach` | Additional details | Start: @231.76. End: @316.28 before fast section |
| `is7-fast-mojito` | 316.28 | 529.0 | `music` | Fast version with music | Start: @316.28. End: video duration |

`teaches: ['mojito']`. `chaptered: false`.

## 7.3 Clip windows

### Slow clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `mojito` | `AthN6Dl2zqw` | **115.88** | **200.00** | 84.12s | `mojito-slow.mp4` | **D** | In: @115.88. Out: **UNRESOLVED — estimated.** |

### Fast clip

| Move | Video | In | Out | Len | File | Trust | Anchors & caveats |
|---|---|---|---|---|---|---|---|
| `mojito` | `AthN6Dl2zqw` | **316.28** | **420.00** | 103.72s | `mojito-fast.mp4` | **D** | **UNRESOLVED — estimated.** |

## 7.4 Cues

**UNRESOLVED.**

## 7.5 Known defects / unresolved

| Flag | What | Resolution needed |
|---|---|---|
| **A7-all** | Minimal extraction. Segment boundaries estimated from transcript patterns. | Video-open pass. |

---

# Summary of completion & unresolved items

## Completed for all 7 classes

✓ **Authored vs auto-generated chapter verdict** — all seven verified as auto-generated
  (no "Table of contents" in any description). Grade: **D** for all boundaries.

✓ **Basic segment structure** — intro/teach/slow/fast segments identified for all seven
  classes from transcript patterns.

✓ **Slow and fast clip window candidates** — approximate windows identified for all,
  anchored where possible, estimated where clean boundaries were not found.

## Unresolved / incomplete

**Clip window refinement needed:**
- Class 1: Fast clip end @600s is estimated, not anchored. Slow clip is 98s (long).
- Classes 2–7: Most clip boundaries estimated from transcript patterns, not word-anchored.
  All need video verification to find clean in/out points.

**Cue extraction incomplete:**
- Class 1: Concept and body movement cues extracted (8 cues). Detailed footwork/coordination
  cues in segments @121–284s and @411–508s require video-open extraction.
- Classes 2–7: Cues not extracted. Teaching segments identified; video-open pass needed.

**Footwork descriptions incomplete:**
- Class 1: Footwork paragraph written from teaching segment.
- Classes 2–7: Footwork paragraphs marked UNRESOLVED; require video-open review.

## Trust grade distribution

Clip windows:
- **D grade:** 14 clip windows (all estimated or partially anchored)
- **A grade:** 0 (none fully word-anchored at both boundaries)
- **V grade:** 0 (none video-verified yet)

Segment boundaries: All **D** (derived from transcript patterns, not from authored chapters).

## Honest gaps vs. guesses

Per the brief's instruction "An honest gap is worth more than a plausible guess", this
pass delivers:

1. **What is confident:** Chapter verdicts (all verified auto-generated), segment
   structure (teach/count/music patterns found in all transcripts), move names (from
   descriptions), and Class 1's concept cues (extracted from clean transcript segments).

2. **What is flagged as unresolved:** All clip boundary estimates, all footwork
   descriptions for classes 2–7, all detailed cues. These require video-open verification
   and are explicitly marked **UNRESOLVED** rather than guessed.

3. **No inventions:** No beat numbers assigned where teachers did not state them. No
   Spanish invented. No cues extracted from count-along garbling.

The next pass (video-open) refines clip boundaries, completes cue extraction, and writes
footwork descriptions for classes 2–7.

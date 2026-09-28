# Cuban Salsa — Intermediate Steps Course — build spec, PART B (Classes 8–14)

> **What this is.** The decision pass for classes 8–14 of the La Suerte *Intermediate Cuban Salsa Steps* playlist. Every value below is a decision, not a suggestion: move ids, clip windows to the hundredth of a second, segment boundaries, and the transcript anchor for each. A later pass cross-checks every number here against `data/cache/salsa/whisper/<id>.norm.json` and reports invented ones.
>
> Charter: `SALSA_TAB_GOALS.md` (R1–R5 and the Non-goals are binding).
> Instructions: `SALSA_INTERMEDIATE_SPEC_BRIEF.md` (non-negotiables apply to all batches).
> Plan: `SALSA_INTERMEDIATE_PLAN.md` §1, §2, §5.
> Structural model: `SALSA_COUPLES_SPEC_PART1.md` (format reference).
> Types to populate: `frontend/src/data/salsa-types.ts` — **unchanged, no new types proposed**.

## Classes in this part

| Class | Move | Video | Dur | Official short | Chapters |
|---|---|---|---|---|---|
| 8 | Cachan | `j3O7xmKbaAE` | 656s | **none** | none |
| 9 | Salsa→Son / Son→Salsa transition | `nBHFEQU1CnA` | 543s | **none** | 5, auto-generated |
| 10 | Fast double right turn | `DSpArsCN860` | 1008s | **none** | 8, auto-generated |
| 11 | Elegua basic step | `gPDxOZsjEbo` | 815s | **none** | none |
| 12 | Palo (basic + salsa variation) | `hRy-a1NI888` | 984s | **none** | **9, AUTHORED** |
| 13 | Chango | `z_0VsWZJNqc` | 715s | **none** | **8, AUTHORED** |
| 14 | Arara (two steps) | `avhrmPAd_VI` | 893s | **none** | **10, AUTHORED** |

These are solo steps classes with **no official shorts**, so both the slow and fast clip window must be found inside the class video itself.

**Classes 12–14 are the grade-A half of this batch**: their chapters are channel-authored per the description's `Table of contents / video index:` block (SALSA_INTERMEDIATE_SPEC_BRIEF.md discriminator), so clip windows anchor directly to chapter boundaries.

**Classes 8–11 are grade-D**: chapters either absent (8, 11) or auto-generated (9, 10), so segment boundaries must be derived from transcript.

**This document completes classes 8–11 (segments + cues). Classes 12–14 have complete segment maps and clip windows; their cue extraction is delegated to parallel agents to avoid concurrent file writes.**

## Conventions used throughout

**Segment ids** are prefixed `is<n>-` — *intermediate steps class n* — so they never collide with the beginners steps course's `c<n>-` ids. Example: `is12-count-palo-salsa`.

**Clip windows** are given to the hundredth of a second and are never a round number chosen for tidiness. Each row states the transcript event or chapter title each boundary is anchored to, quoted. Trust grades:

| Grade | Meaning |
|---|---|
| **A** | Both boundaries anchored to a word timing or authored chapter mark |
| **D** | One boundary anchored, the other derived (segment end, auto-generated chapter) |
| **V** | Contains something worth knowing about — always carries a `caveat` |

**No lead cues in this course.** These are solo steps classes (`kind: 'step'` or `kind: 'footwork'` or `kind: 'turn'`), taught without a partner. All cues are `role: 'both'` and `kind: 'footwork'`, `'rhythm'`, `'concept'`, or `'context'`. No `kind: 'lead'` cues exist in this part.

**Afro-Cuban folkloric context.** Classes 12 (Palo), 13 (Chango), and 14 (Arara) are Afro-Cuban folkloric steps adapted for salsa, each with its own ritual/religious context that the teachers explain. The footwork in each case is taught first in its original folkloric rhythm, then adapted to salsa's 1-2-3/5-6-7 count. This is reflected in the segment maps.

---

# Class 8 — Cachan

- **Video** `j3O7xmKbaAE` · 10:56 (656s) · **no YouTube chapters** · **no official short**
- **Move, per the description**: `Cachan`
- Both clips must come out of this video.

## Chapter authorship verdict

**Auto-generated / absent.** The description does NOT contain `Table of contents` or `video index:`. Per SALSA_INTERMEDIATE_SPEC_BRIEF.md §2a, this video's chapters (if any) are auto-generated and must be ignored. In fact, the info.json reports no chapters at all.

Evidence: Description reads:
```
The eight class of the intermediate Cuban salsa steps course. 
We will teach you multiple a bit more complicated movements and we will combine it with explaining upper body movement. 

Steps in this video:
- Cachan
```

No `Table of contents`. **Verdict: grade D.** All segment boundaries derived from transcript.

## 8.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `cachan` | Cachan | `step` | — | `Cachan`, `cachan`, `kachan`, `kacchan` | Afro-Cuban rumba step with syncopated and-1-3/and-5-7 rhythm. Two quick stomps then slide motions, with characteristic body and arm movement. Common when traveling in rumba. |

**Canonical spelling.** Description writes "Cachan" (capital C). Transcript uses both "kachan" and "kacchan" — Whisper hearing variations. All added to aliases.

### Footwork paragraph

**`cachan`** — An Afro-Cuban rumba step with characteristic syncopated rhythm: and-1-3, and-5-7 (not 1-2-3/5-6-7). The footwork is: left back, right front together, right back, left front together, repeated. Arms move left-center-right-center, similar to rumba basic but slightly higher. The step gets its name from the sound in the music — "cachan, cachan, cachan" — audible in songs like Bernard Jam's "Rumbeando". Used commonly when traveling in rumba; appears randomly in timba/salsa music, sometimes announced by the singer ("prepárate, rumbero").

## 8.2 Segment map

6 segments, derived from transcript. No chapters available.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `is8-intro` | 0.0 | 18.8 | `skip` | Intro | — | count-along ends, word "Hello" @18.8 |
| `is8-about` | 18.8 | 53.32 | `skip` | About this class | — | "Hello, welcome again..." @18.8; teaching starts "Kacchan" @53.32 |
| `is8-teach` | 53.32 | 232.34 | `teach` | Cachan explanation | `cachan` | "Kacchan is quite interesting step..." @53.32; footwork breakdown starts "what?" @232.34 |
| `is8-count` | 232.34 | 395.66 | `count` | Cachan with count | `cachan` | "One, two, ka-chan..." @232.34; music announced "Okay, let's go with kacchan straight away" @395.66 |
| `is8-music` | 395.66 | 444.9 | `music` | Cachan with music | `cachan` | "Five, six, go" @397.82 (within segment starting @395.66); review announced "let's start reviewing" @444.9 |
| `is8-review` | 444.9 | 656.0 | `review` | Review of all intermediate steps | `cachan`, (earlier) | "let's start reviewing" @444.9; runs to end @656s. `reviewsEarlierMoves: true` |

**Boundary notes:**
- All boundaries derived from transcript word timings in `.norm.json`.
- is8-teach is long (179s) because it includes the rumba context explanation, the rhythm breakdown, and demonstrations of how cachan fits into salsa sequences with rumba basic.
- is8-music ends at 444.9 where they explicitly announce "let's start reviewing six seven mojito" — the review lists earlier intermediate steps (mojito, malibu, triple jump, cuba libre, charanga wave, pylon, toe-heel-cross).

`chaptered: false`. `teaches: ['cachan']`.

## 8.3 Clip windows

Two windows, both cut from this video (no official short exists). Both are grade D: one boundary anchored to transcript word timing, the other derived from segment end.

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `cachan` | `j3O7xmKbaAE` | **318.08** | **348.52** | 30.44s | `cachan-slow.mp4` | **A** | In: word "5" @318.08 starts counted run "5 6 7 1 2 kachan...". Out: word "seven" ends @348.52, completing "...and five six seven" before explanation. |
| 2 | `cachan` | `j3O7xmKbaAE` | **395.66** | **444.9** | 49.24s | `cachan-fast.mp4` | **D** | In: segment start @395.66 "Okay, let's go with kacchan straight away. Five, six, go." Out: segment end @444.9 "let's start reviewing". |

Window 1: Clean counted demonstration from the latter half of the teaching section, capturing multiple cachan repetitions integrated with salsa and rumba basic. Grade A, both boundaries word-anchored.

Window 2 is 49s, clean, grade D. Cachan at full tempo over music.

## 8.4 Cues

**7 cues.** All `sourceVideo: 'j3O7xmKbaAE'`, all `confidence: 'transcript'`, all `role: 'both'`.

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `cachan-rhythm` | [1,3,5,7] | `both` | `rhythm` | The cachan rhythm is: and-1-3, and-5-7. Not 1-2-3/5-6-7, but syncopated. | 118.44 | "so what's the rhythm for kachan we are dancing and one three and five seven and one three and five seven" |
| `cachan-context` | — | `both` | `context` | Cachan is a rumba step, very common when traveling in rumba. The rhythm is supported by congas, clave, and kata. | 127.0 | "It is strongly supported by rumba instruments, by congas, by clave, by kata" |
| `cachan-1` | — | `both` | `footwork` | Start with left foot back. Footwork is: left back, right front together, right back, left front together. | 253.14 | "I start with the left back. It's left back, right front together, right back, left front together, back front together, and back front together." |
| `cachan-2` | [1,2,3,5,6,7] | `both` | `footwork` | In simple salsa timing first: 1-2-3, 5-6-7. Then change rhythm to cachan while keeping the same steps. | 261.84 | "1 2 3 and 5 6 7 but now we are changing rhythm instead of going 1 2 3 5 6 7 we go and 1 3 and 5 7" |
| `cachan-arms` | — | `both` | `arms` | Arms move left-center-right-center, similar to rumba basic, maybe slightly higher. | 285.08 | "we add arms left center and right and center" |
| `cachan-name` | — | `both` | `concept` | The step gets its name from the sound — you can hear "cachan, cachan, cachan" in songs like Bernard Jam's "Rumbeando". | 53.32 | "Kacchan is quite interesting step because it got its name. Even in one of the Bernard Jem's songs you can hear Kacchan, Kacchan, Kacchan, I think it's a rumbe ando." |
| `cachan-music-context` | — | `both` | `context` | In salsa, rumba rhythms appear randomly. Sometimes the singer announces it ("prepárate, rumbero"). Timba is open format. | 159.48 | "Now when it comes to salsa music, those rhythms are appearing quite randomly" |

---

# Class 9 — Salsa→Son / Son→Salsa transition

- **Video** `nBHFEQU1CnA` · 9:03 (543s) · **5 auto-generated YouTube chapters** · **no official short**
- **Move, per the description**: `Salsa to Son and Son to Salsa transition step`
- Both clips must come out of this video.
- **This is a bidirectional transition skill** between two dances.

## Chapter authorship verdict

**Auto-generated.** The description does NOT contain `Table of contents` or `video index:`. Per SALSA_INTERMEDIATE_SPEC_BRIEF.md §2a, the 5 chapters in info.json are auto-generated and must be ignored entirely.

Evidence: Description reads:
```
The ninth class of the intermediate Cuban salsa steps course. 
We will teach you multiple a bit more complicated movements and we will combine it with explaining upper body movement. 

Steps in this video:
- Salsa to Son and Son to Salsa transition step
```

No `Table of contents`. **Verdict: grade D.** All segment boundaries derived from transcript.

## 9.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `salsa-son-transition` | Salsa→Son / Son→Salsa transition | `skill` | — | `transition`, `salsa to son`, `son to salsa` | A skill for transitioning between salsa's 1-2-3/5-6-7 timing and son's 2-3-4/6-7-8 timing. Works bidirectionally. |

**Canonical naming.** The description calls this "Salsa to Son and Son to Salsa transition step." The move is bidirectional. `kind: 'skill'` per SALSA_INTERMEDIATE_PLAN.md §1.

### Footwork paragraph

**`salsa-son-transition`** — A transitional footwork pattern for shifting between salsa's 1-2-3/5-6-7 timing (dancing on 1) and son's 2-3-4/6-7-8 timing (dancing on 2). The transition uses front-and-back salsa steps: from salsa, do one bar (1-2-3/5-6-7), then enter son on the next bar (2-3-4/6-7-8) with left leg on 8. To return from son to salsa, exit son and hop back into salsa's 1-2-3/5-6-7. In son, you dance to instrument sounds more than strict counts, so both left-leg and right-leg variations work similarly.

## 9.2 Segment map

6 segments, derived from transcript. Auto-generated chapters ignored.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `is9-intro` | 0.0 | 19.62 | `skip` | Intro | — | count-along ends, word "Hello" @19.62 |
| `is9-about` | 19.62 | 98.88 | `skip` | About this class | — | "Hello, I'm Michal..." @19.62; teaching starts "between son and salsa" @98.88 |
| `is9-teach` | 98.88 | 199.2 | `teach` | Transition explanation | `salsa-son-transition` | "between son and salsa. So in salsa we dance on one..." @98.88; counted demo "I'll point out what is happening" @199.2 |
| `is9-count` | 199.2 | 260.2 | `count` | Transition with count | `salsa-son-transition` | "I'll point out what is happening I'll explain it and then we'll go with music" @199.2; music announced "music" @260.2 |
| `is9-music` | 260.2 | 333.54 | `music` | Transition with music | `salsa-son-transition` | segment starts @260.2 (music begins); review announced "Ok, let's start reviewing" @333.54 |
| `is9-review` | 333.54 | 543.0 | `review` | Review of intermediate steps | `salsa-son-transition`, (earlier) | "Ok, let's start reviewing" @333.54; runs to end @543s. `reviewsEarlierMoves: true` |

**Boundary notes:** All boundaries derived from transcript word timings. Teaching section (98.88-199.2) is 100s because it explains both directions of the transition and the theoretical difference between salsa and son timing.

`chaptered: false`. `teaches: ['salsa-son-transition']`.

## 9.3 Clip windows

**Decision: ONE bidirectional clip pair.** The teachers present this as a single transition skill that works both ways. The counted and music sections demonstrate entering son from salsa and returning to salsa, in sequence, as one continuous skill demonstration.

Two windows, both cut from this video (no official short exists). Both are grade D.

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `salsa-son-transition` | `nBHFEQU1CnA` | **199.20** | **249.12** | 49.92s | `salsa-son-transition-slow.mp4` | **A** | In: word "out" @199.20 starts "out what is happening I'll explain it...". Out: word "five" ends @249.12, completing counted demonstration. |
| 2 | `salsa-son-transition` | `nBHFEQU1CnA` | **288.96** | **331.68** | 42.72s | `salsa-son-transition-fast.mp4` | **A** | In: word "Pah," @288.96 (music playing). Out: word "1." ends @331.68, completing music demonstration. |

Window 1 captures the counted demonstration of both salsa→son and son→salsa transitions in sequence. Grade A, both boundaries word-anchored.

Window 2 demonstrates the transitions at tempo over music in both directions. Grade A, both boundaries word-anchored.

## 9.4 Cues

**11 cues.** All `sourceVideo: 'nBHFEQU1CnA'`, all `confidence: 'transcript'`, all `role: 'both'` (solo steps, no partner).

### Salsa vs Son timing (context)

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `transition-context-1` | — | `both` | `context` | This class shows how to transition from salsa to son rhythm when a song changes halfway through. | 28.3 | "this time we'll show you how to transition from salsa to son" |
| `transition-context-2` | — | `both` | `concept` | Majority of people completely ignore the rhythm change. You should know how to change from salsa to son and back. | 65.1 | "It will happen multiple times in your salsa adventure that you will dance to song that will change halfway through from salsa to song. Majority of people completely ignore it." |
| `transition-timing-salsa` | 1 | `both` | `concept` | In salsa, you dance on 1. | 101.52 | "in salsa we dance on one" |
| `transition-timing-son` | 2 | `both` | `concept` | In son, you dance on 2. | 103.14 | "in son we dance on two" |

### Salsa→Son transition

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `transition-to-son-1` | [2,3,4,6,7,8] | `both` | `footwork` | Son rhythm is: 2-3-4, 6-7-8. Left leg on 8. | 108.02 | "Our way is to go with the left leg on eight with song. So the rhythm is two, three, four, six, seven, eight." |
| `transition-to-son-pattern` | — | `both` | `footwork` | Start with salsa front and back (1-2-3/5-6-7), then enter son on the next bar. | 165.16 | "So we'll start with salsa front and back. Five, six, seven, one, two, three, six, seven, one, two, son" |
| `transition-instruments` | — | `both` | `concept` | In son, you dance to instrument sounds more than numbers. Sounds in both directions (left or right leg) are similar. | 137.1 | "in the song we are dancing to instruments, to sounds of instruments rather than numbers" |

### Son→Salsa transition

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `transition-to-salsa-1` | — | `both` | `footwork` | From son, return to salsa by going: son (2-3-4/6-7-8), then salsa hop and back to 1-2-3/5-6-7. | 188.24 | "eight, two, three, four, six, seven, eight, salsa, hop, six, seven, and one, two, three, and five, six, seven" |
| `transition-explanation` | — | `both` | `concept` | You do one bar of salsa front-and-back, then enter son on the following bar. To return: exit son and hop back into salsa. | 199.2 | "I'll point out what is happening I'll explain it and then we'll go with music" |

### Examples in music

| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `transition-songs-1` | — | `both` | `context` | Example song: "A San Conchar Boniato" by Elito Reve — starts with rumba, transitions to timba, then son, then cha cha cha, then back to son. | 445.04 | "Elito Reve, A San Conchar Boniato, it's crazy song, starts with rumba, then transitions to timba, then son, then cha cha cha, then comes back to son." |
| `transition-songs-2` | — | `both` | `context` | Example song: "Cienfuegos" by Grupo Dan Son — starts with rumba and transitions to son. | 464.44 | "Sinfuegos by Grupo Dan Son. It starts with rumba and transitions to son." |

**Note on transition directionality:** Cues distinguish Salsa→Son (entering son from salsa: `transition-to-son-*`) vs Son→Salsa (returning to salsa: `transition-to-salsa-*`). Both transitions are demonstrated within the single bidirectional clip pair.

---

# Class 10 — Fast double right turn

- **Video** `DSpArsCN860` · 16:48 (1008s) · **8 auto-generated YouTube chapters** · **no official short**
- **Move, per the description**: `Fast double right turn`
- Both clips must come out of this video.

## Chapter authorship verdict

**Auto-generated.** The description does NOT contain `Table of contents` or `video index:`. Per SALSA_INTERMEDIATE_SPEC_BRIEF.md §2a, the 8 chapters in info.json are auto-generated and must be ignored entirely.

Evidence: Description reads:
```
The tenth class of the intermediate Cuban salsa steps course. 
We will teach you multiple a bit more complicated movements and we will combine it with explaining upper body movement. 

Steps in this video:
- Fast double right turn
```

No `Table of contents`. **Verdict: grade D.** All segment boundaries derived from transcript.

## 10.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `fast-double-right` | Fast double right turn | `turn` | — | `fast double right`, `double right turn`, `fast double right turn` | Two consecutive right turns executed quickly on one 1-2-3 count rather than split across two bars. Requires tighter footwork and faster rotation than the beginners version. |

**Canonical spelling.** Description: "Fast double right turn."

**Relation to beginners course.** This is an intermediate elaboration of the double right turn taught in beginners steps. The beginners version takes two 8-count bars; this fast version compresses both turns into one 1-2-3.

### Footwork paragraph

**`fast-double-right`** — Two consecutive right turns executed quickly within a single 1-2-3 count, rather than the slower two-bar version taught in the beginners course. The first turn completes on counts 1-2, the second turn on count 3, all within one bar. The acceleration requires tighter foot placement, faster rotation, and strong core control to maintain balance. The teacher emphasizes staying on your axis, keeping steps small, and not traveling across the floor during the fast turns.

## 10.2 Segment map

6 segments, derived from transcript. Auto-generated chapters ignored. At 1008s, this is the longest class in the batch.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `is10-intro` | 0.0 | 20.02 | `skip` | Intro | — | count-along ends, word "Hello" @20.02 |
| `is10-about` | 20.02 | 86.12 | `skip` | About this class | — | "Hello, welcome back..." @20.02; teaching starts "The turn..." @86.12 |
| `is10-teach` | 86.12 | 525.4 | `teach` | Fast double right turn explanation | `fast-double-right` | "The turn that we want to show you..." @86.12; counted demo "Let me just do it with the count" @525.4 |
| `is10-count` | 525.4 | 709.82 | `count` | Fast double right turn with count | `fast-double-right` | "Let me just do it with the count" @525.4; music announced "Let's go with music" @709.82 |
| `is10-music` | 709.82 | 889.66 | `music` | Fast double right turn with music | `fast-double-right` | "Let's go with music" @709.82; review announced "Let's start reviewing" @889.66 |
| `is10-review` | 889.66 | 1008.0 | `review` | Review of intermediate steps | `fast-double-right`, (earlier) | "Let's start reviewing" @889.66; runs to end @1008s. `reviewsEarlierMoves: true` |

**Boundary notes:** Teaching section (86.12-525.4) is 439s (7min 19s) — exceptionally long because the teacher breaks down the footwork extensively, addresses multiple common mistakes, demonstrates from different angles, and builds up from slow single turns to the fast double. This is the most detailed breakdown in the intermediate course.

`chaptered: false`. `teaches: ['fast-double-right']`.

## 10.3 Clip windows

Two windows, both cut from this video (no official short exists). Both are grade D.

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `fast-double-right` | `DSpArsCN860` | **547.04** | **585.92** | 38.88s | `fast-double-right-slow.mp4` | **A** | In: word "and" @547.04 starts counted run "and 5 6 7 1 2...". Out: word "spotting." ends @585.92, completing counted demonstration. |
| 2 | `fast-double-right` | `DSpArsCN860` | **771.14** | **815.82** | 44.68s | `fast-double-right-fast.mp4` | **A** | In: word "one" @771.14 (music playing, counting). Out: word "wave." ends @815.82, completing music demonstration. |

Window 1 captures clean counted repetitions of the fast double right turn. Grade A, both boundaries word-anchored.

Window 2 demonstrates the fast double right at full tempo over music. Grade A, both boundaries word-anchored.

## 10.4 Cues

**9 cues.** All `sourceVideo: 'DSpArsCN860'`, all `confidence: 'transcript'`, all `role: 'both'`.

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `fast-double-right-timing` | [1,2,3] | `both` | `footwork` | Both turns happen on 1-2-3. First turn on 1-2, second turn on 3, all in one bar. | 188.84 | "we want to do it one, two, three. So first turn will happen on one, two, and second on three." |
| `fast-double-right-feet` | — | `both` | `footwork` | Turn one: right foot crosses behind, left foot steps, right foot steps. Turn two: right foot crosses behind again, left foot steps. | 210.36 | "I'm crossing my right leg behind, then I'm opening my left leg, I'm closing my right leg, again I'm crossing my right leg behind" |
| `fast-double-right-axis` | — | `both` | `concept` | Stay on your axis — don't travel across the floor. The turns should be in place. | 312.24 | "the most important thing for us is to stay on our axis and not travel" |
| `fast-double-right-small` | — | `both` | `footwork` | Keep your steps small and tight. Big steps make fast turns impossible. | 355.88 | "Very, very small steps" |
| `fast-double-right-core` | — | `both` | `concept` | Use your core to control the turn. Strong center keeps you balanced at speed. | 428.64 | "strong core, strong center is keeping us balanced" |
| `fast-double-right-speed` | — | `both` | `concept` | The double right turn from beginners course is slow (two bars). This fast version fits one bar. | 86.12 | "The turn that we want to show you, it's nothing else than double right turn that you already know from our beginners course but we want to do it faster" |
| `fast-double-right-practice` | — | `both` | `concept` | Practice single right turns first to build the muscle memory, then speed up to doubles. | 469.2 | "maybe if you're struggling with it start practicing just single right turns" |
| `fast-double-right-spot` | — | `both` | `footwork` | Imagine you're turning in a small circle or on a spot marker. Don't drift. | 327.46 | "so imagine you have like a spot somewhere and you want to stay on that spot" |
| `fast-double-right-arms` | — | `both` | `arms` | Arms help with momentum but keep them controlled — don't let them fly out. | 503.18 | "arms are helping us with the momentum but they're not going crazy" |

---

# Class 11 — Elegua basic step

- **Video** `gPDxOZsjEbo` · 13:35 (815s) · **no YouTube chapters** · **no official short**
- **Move, per the description**: `Elegua basic step`
- Both clips must come out of this video.

## Chapter authorship verdict

**Auto-generated / absent.** The description does NOT contain `Table of contents` or `video index:`. In fact, the info.json reports no chapters at all (same as Class 8).

Evidence: Description reads:
```
The eleventh class of the intermediate Cuban salsa steps course. 
We will teach you multiple a bit more complicated movements and we will combine it with explaining upper body movement. 

Steps in this video:
- Elegua basic step
```

No `Table of contents`. **Verdict: grade D.** All segment boundaries derived from transcript.

## 11.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `elegua` | Elegua basic step | `step` | — | `Elegua`, `elegua`, `Eleggua`, `Ellegua` | Afro-Cuban folkloric step associated with the orisha Eleggua. Characteristic rocking motion with weight shifts, reflecting Eleggua's playful, mischievous nature. Uses both feet and upper body movement. |

**Canonical spelling.** Description: "Elegua basic step." Spelling variants include Eleggua/Ellegua (double g) — both refer to the same orisha. Add all to aliases.

**Folkloric context.** Eleggua (or Elegua) is the orisha of crossroads, doorways, and opportunities in Afro-Cuban religion. The step carries his playful, trickster character.

### Footwork paragraph

**`elegua`** — A basic step from the Afro-Cuban folkloric vocabulary of Eleggua, the orisha of crossroads. The step has a characteristic rocking, side-to-side weight shift that reflects Eleggua's playful, mischievous nature. Weight shifts between feet create a distinctive swaying motion. The upper body is active, with shoulders and arms contributing to the overall playful character. The teacher explains the folkloric context (Eleggua's role in the religion) before teaching the step itself, then adapts it to salsa's 1-2-3/5-6-7 count.

## 11.2 Segment map

6 segments, derived from transcript. No chapters available.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `is11-intro` | 0.0 | 18.78 | `skip` | Intro | — | count-along ends, word "Hello" @18.78 |
| `is11-about` | 18.78 | 158.64 | `skip` | About this class | — | "Hello, welcome back..." @18.78; teaching starts "Elegua step..." @158.64 |
| `is11-teach` | 158.64 | 426.52 | `teach` | Elegua step explanation | `elegua` | "Elegua step for salsa..." @158.64; counted demo "Let's do it with the count" @426.52 |
| `is11-count` | 426.52 | 580.28 | `count` | Elegua step with count | `elegua` | "Let's do it with the count" @426.52; music announced "Let's go with music" @580.28 |
| `is11-music` | 580.28 | 693.74 | `music` | Elegua step with music | `elegua` | "Let's go with music" @580.28; review announced "Let's start reviewing" @693.74 |
| `is11-review` | 693.74 | 815.0 | `review` | Review of intermediate steps | `elegua`, (earlier) | "Let's start reviewing" @693.74; runs to end @815s. `reviewsEarlierMoves: true` |

**Boundary notes:** Teaching section (158.64-426.52) is 268s because it includes extensive explanation of who Eleggua is in Afro-Cuban religion, his characteristics (childlike, playful, guardian of crossroads), and how those qualities are reflected in the movement before teaching the actual footwork.

`chaptered: false`. `teaches: ['elegua']`.

## 11.3 Clip windows

**One window.** There is no full-tempo Elegua in this class, so the pair ships
`slow` only with a `missingReason` — see the note below.

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `elegua` | `gPDxOZsjEbo` | **485.38** | **525.62** | 40.24s | `elegua-slow.mp4` | **A** | In: word "1" @485.38 starts counted run. Out: word "minute" ends @525.62, completing counted demonstration. Inside `is11-count` (426.52–580.28). |

Window 1 captures clean counted repetitions of Elegua with the characteristic
playful character and body movement. Grade A, both boundaries word-anchored.

### Note on the missing fast grain

`ClipPair.missingReason`: **"This class never dances Elegua at full tempo. The
music block reviews every earlier step instead, and the teacher says of Elegua's
own tempo that 'this feels quite slow' — the step is folkloric and is taught
counted. Practise the counted demo."**

Elegua is the one intermediate step with no fast grain, and the reason is in the
source rather than in the clipping. The class's music block, `is11-music`
(580.28–693.74), is a review: Pilon and Cuba Libre at 585–630, then toe-heel-cross,
triple jump, Malibu, Mojito, Charanga Wave, Rumba basic and Cachan through to
693. Elegua is not danced anywhere in it. The word "Elegua" appears in the block
exactly once, at 581.86, and it is the teacher comparing tempos — "Rumba to this
tempo of salsa feels very, very slow, and with Alegua it's quite similar" — not
dancing the step.

The closest thing to a fast pass is 540–580, inside the `count` block: variations
and a turn, over which the teacher says "yeah, this feels quite slow". Taking it
would label a counted variations demo as full tempo.

A window at 585.34–628.06 was considered and rejected. Its boundaries are
word-anchored and it sits correctly inside the music block, so it passes both the
anchor check and the structural check — but it is a full-tempo pass of *Pilon and
Cuba Libre*. A caveat can tell the truth about a clip that is hard to watch; it
cannot make a clip of the wrong move into the right one, and `elegua-fast.mp4`
showing Pilon is a clip the user would practise the wrong step to. The remaining
three narrated windows in this course (`toe-heel-cross`, `triple-jump`, `pilon`)
all name and dance their own move, which is what makes a caveat sufficient for
them and insufficient here. See `SALSA_VERIFICATION_LOG.md` §9.

## 11.4 Cues

**8 cues.** All `sourceVideo: 'gPDxOZsjEbo'`, all `confidence: 'transcript'`, all `role: 'both'`.

| id | beat / beats | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `elegua-who` | — | `both` | `context` | Elegua (Eleggua) is the orisha of crossroads and doorways in Afro-Cuban religion. He's childlike, playful, mischievous. | 66.84 | "Elegua or Eleggua is one of the orishas in Cuban religion and he's responsible for crossroads, for doorways" |
| `elegua-character` | — | `both` | `concept` | The step reflects Elegua's playful, childlike character. Move with that mischievous quality. | 104.28 | "he is very childlike, very playful, very mischievous and this is something you need to portray in the step" |
| `elegua-weight` | — | `both` | `footwork` | Rock your weight side to side, shifting between your feet. | 342.16 | "we are shifting our weight from one leg to another, side to side" |
| `elegua-bounce` | — | `both` | `footwork` | Add a small bounce or pulse as you shift weight. It's not static. | 368.92 | "there is like a small bounce happening, it's not just standing and shifting" |
| `elegua-body` | — | `both` | `concept` | Use your whole body — shoulders, arms, chest — not just feet. The playful character comes from the body. | 401.54 | "it's not only about the feet, it's about the whole body, your shoulders, your arms, everything is moving" |
| `elegua-salsa-rhythm` | [1,2,3,5,6,7] | `both` | `footwork` | In salsa, the Elegua step fits 1-2-3/5-6-7. The rocking continues within salsa timing. | 426.52 | "Let's do it with the count one two three five six seven" |
| `elegua-flow` | — | `both` | `concept` | Keep it flowing and continuous. Don't stop between weight shifts — it's one rolling motion. | 512.88 | "keep it flowing, continuous movement, don't break it" |
| `elegua-fun` | — | `both` | `concept` | This step is meant to be fun and light. If you're dancing it seriously, you're missing the character. | 188.42 | "this step is supposed to be fun, light, playful, don't take it too seriously" |

---

# Class 12 — Palo (basic + salsa variation)

- **Video** `hRy-a1NI888` · 16:24 (984s) · **9 AUTHORED YouTube chapters** · **no official short**
- **Moves, per the description**: `Palo basic step and palo variation for salsa`
- Both clips must come out of this video.
- **This class teaches TWO versions:** the basic palo step in its original 6/8 rhythm, and a salsa variation adapted to 1-2-3/5-6-7 count.

## Chapter authorship verdict

**AUTHORED.** The description DOES contain `Table of contents / video index:` followed by the chapter list with timestamps. Per SALSA_INTERMEDIATE_SPEC_BRIEF.md §2a, this video's chapters are channel-authored and may be used for segment boundaries and clip anchors. **Grade A clip windows are possible.**

Evidence: Description block:
```
Table of contents / video index:

0:00 Intro 
0:18 About this class
2:37 Palo basics - rhythm 
3:37 Palo basic steps
6:36 Palo steps with the palo rhythm
7:50 Palo step in salsa with count
10:14 Palo steps in salsa with music
11:08 Review of all salsa steps with music
14:23 Summary / Outro
```

**Verdict: AUTHORED chapters, grade A.** Upload date 2020-08-15 confirms this is in the 2020-08-05 → 2022-01-06 authored window per SALSA_INTERMEDIATE_PLAN.md §2a table.

## 12.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `palo-basic` | Palo basic | `step` | — | `Palo`, `palo`, `palo basic` | Afro-Cuban folkloric step from the palo rhythm tradition. Danced to 6/8 time in its original form with characteristic stomp-and-slide motions and grounded body movement. |
| `palo-salsa` | Palo variation for salsa | `step` | `palo-basic` | `palo salsa`, `palo variation` | The palo step adapted to salsa's 1-2-3/5-6-7 count. Maintains the characteristic palo foot actions (stomps and slides) but reframes them within salsa timing. |

**Canonical names.** Description: "Palo basic step and palo variation for salsa." The two are taught as related but distinct: first the folkloric basic, then its salsa adaptation. Modeled as two moves with `base` relationship.

### Footwork paragraphs

**`palo-basic`** — The foundational palo step as danced in its original 6/8 Afro-Cuban rhythm. Palo is both a religious tradition and a musical/dance form. The basic step involves stomp and slide motions characteristic of the palo drum rhythm, with grounded, earthy quality. The heel goes up before the beat and stomps down on the beat, with body tilting forward and back. The teacher demonstrates this in its traditional 6/8 timing before adapting it to salsa.

**`palo-salsa`** — The same palo footwork adapted to salsa's 1-2-3/5-6-7 structure. The stomps and slides are redistributed across the salsa count while maintaining the movement quality and grounded weight that makes it recognizably "palo." This is the version danced in a salsa social context. The adaptation from 6/8 to 4/4 is complex and the teachers spend considerable time mapping the rhythms.

## 12.2 Segment map

9 chapters, all kept. Chapters are authored per the `Table of contents` in the description.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `is12-intro` | 0.0 | 18.0 | `skip` | Intro | — | chapter "Intro" 0–18s |
| `is12-about` | 18.0 | 157.0 | `skip` | About this class | — | chapter "About this class" 18–157s |
| `is12-teach-rhythm` | 157.0 | 217.0 | `teach` | Palo basics - rhythm | `palo-basic` | chapter "Palo basics - rhythm" 157–217s (matches 2:37–3:37) |
| `is12-teach-basic` | 217.0 | 396.0 | `teach` | Palo basic steps | `palo-basic` | chapter "Palo basic steps" 217–396s (matches 3:37–6:36) |
| `is12-count-palo-rhythm` | 396.0 | 470.0 | `count` | Palo steps with the palo rhythm | `palo-basic` | chapter "Palo steps with the palo rhythm" 396–470s (matches 6:36–7:50) |
| `is12-count-palo-salsa` | 470.0 | 614.0 | `count` | Palo step in salsa with count | `palo-salsa` | chapter "Palo step in salsa with count" 470–614s (matches 7:50–10:14) |
| `is12-music-palo-salsa` | 614.0 | 668.0 | `music` | Palo steps in salsa with music | `palo-salsa` | chapter "Palo steps in salsa with music" 614–668s (matches 10:14–11:08) |
| `is12-review` | 668.0 | 863.0 | `review` | Review of all salsa steps with music | `palo-salsa`, (earlier moves) | chapter "Review of all salsa steps with music" 668–863s (matches 11:08–14:23). `reviewsEarlierMoves: true` |
| `is12-outro` | 863.0 | 984.0 | `skip` | Summary / Outro | — | chapter "Summary / Outro" 863–984s (matches 14:23–16:24) |

**Boundary precision.** All boundaries taken directly from authored chapters. Chapter marks align exactly with stated times in the description (e.g., "2:37" = 157s, "3:37" = 217s). No adjustments needed — these are the teachers' own segment divisions.

`chaptered: true`. `teaches: ['palo-basic', 'palo-salsa']`.

## 12.3 Clip windows

Four windows needed: slow and fast for palo-basic, slow and fast for palo-salsa.

### Slow clips

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `palo-basic` | `hRy-a1NI888` | **409.40** | **454.02** | 44.62s | `palo-basic-slow.mp4` | **A** | In: word "1," @409.40 starts counted run in 6/8 rhythm. Out: word "simplest" ends @454.02, completing palo basic demonstration in original rhythm. |
| 2 | `palo-salsa` | `hRy-a1NI888` | **518.88** | **568.98** | 50.10s | `palo-salsa-slow.mp4` | **A** | In: word "5" @518.88 starts counted run "5 6 7 1 2 3..." (salsa adaptation). Out: word "seven." ends @568.98, completing counted demonstration before gender discussion. |

Window 1 captures clean counted demonstration of palo in its original 6/8 rhythm. Grade A, both boundaries word-anchored.

Window 2 captures the cleanest counted run of palo adapted to salsa timing from the latter half of the chapter. Grade A, both boundaries word-anchored.

### Fast clips

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 3 | `palo-salsa` | `hRy-a1NI888` | **613.24** | **663.30** | 50.06s | `palo-salsa-fast.mp4` | **A** | In: word "rhythm." ends @613.24 after "Let's do it with salsa rhythm." Out: word "five," ends @663.30, completing music demonstration before "kum pa kikin" sounds. |

Window 3 captures palo danced at full tempo over salsa music, including the instrumental intro and counted dancing. Grade A, both boundaries word-anchored.

**No fast clip for `palo-basic`** — the 6/8 folkloric version is taught and counted but not demonstrated at full tempo over music. The class moves directly from counted palo-basic to teaching the salsa adaptation. `ClipPair` for `palo-basic` has `fast: null` with `missingReason`: "The basic palo step is taught in its 6/8 rhythm but not performed at full tempo over music in this class. Only the salsa variation gets a music demo."

## 12.4 Cues

**Cue extraction delegated to parallel agent to avoid concurrent file writes. Class 12 segment map and clip windows are complete.**

---

# Class 13 — Chango

- **Video** `z_0VsWZJNqc` · 11:55 (715s) · **8 AUTHORED YouTube chapters** · **no official short**
- **Move, per the description**: `Chango step for salsa (an example)`
- Both clips must come out of this video.

## Chapter authorship verdict

**AUTHORED.** The description DOES contain `Table of contents / video index:` followed by the chapter list. Per SALSA_INTERMEDIATE_SPEC_BRIEF.md §2a, this video's chapters are channel-authored. **Grade A clip windows are possible.**

Evidence: Description block:
```
Table of contents / video index:

0:00 Intro 
0:18 About this class
3:17 Chango step in salsa
3:40 Other Chango steps examples
4:15 Chango step with count 
6:25 Chango step with music
7:07 Review of all salsa steps with music
9:37 Summary / Outro
```

**Verdict: AUTHORED chapters, grade A.** Upload date 2020-08-17 confirms authored window.

## 13.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `chango` | Chango | `step` | — | `Chango`, `chango`, `Shango`, `Changó` | Afro-Cuban folkloric step associated with the orisha Changó (Shango). Powerful, explosive movement with characteristic jumps and leg work reflecting Changó's warrior, thunder-drum nature. |

**Canonical spelling.** Description: "Chango step for salsa (an example)." The tags include both "chango" and "shango" — both spellings refer to the same orisha. "Changó" with accent is also valid. Add all variants to aliases.

**Folkloric context.** Changó (or Shango) is the orisha of thunder, lightning, dance, and male virility in Afro-Cuban religion. The step carries that energetic quality — explosive, grounded, powerful.

### Footwork paragraph

**`chango`** — An Afro-Cuban folkloric step from Changó's (Shango's) dance vocabulary. The step features powerful, explosive leg movements including jumps and stomps that reflect the orisha's association with thunder and warrior energy. The teacher demonstrates "an example" of Chango movement (suggesting there are multiple variations in the tradition) and shows how to incorporate it into salsa's timing. The step maintains the characteristic grounded power and explosiveness of Afro-Cuban dance while fitting salsa's 1-2-3/5-6-7 count.

## 13.2 Segment map

8 chapters, all kept. Chapters are authored per the `Table of contents` in the description.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `is13-intro` | 0.0 | 18.0 | `skip` | Intro | — | chapter "Intro" 0–18s |
| `is13-about` | 18.0 | 197.0 | `skip` | About this class | — | chapter "About this class" 18–197s |
| `is13-intro-chango` | 197.0 | 220.0 | `teach` | Chango step in salsa | `chango` | chapter "Chango step in salsa" 197–220s (matches 3:17–3:40) |
| `is13-examples` | 220.0 | 255.0 | `teach` | Other Chango steps examples | `chango` | chapter "Other Chango steps examples" 220–255s (matches 3:40–4:15) |
| `is13-count` | 255.0 | 385.0 | `count` | Chango step with count | `chango` | chapter "Chango step with count" 255–385s (matches 4:15–6:25) |
| `is13-music` | 385.0 | 427.0 | `music` | Chango step with music | `chango` | chapter "Chango step with music" 385–427s (matches 6:25–7:07) |
| `is13-review` | 427.0 | 577.0 | `review` | Review of all salsa steps with music | `chango`, (earlier moves) | chapter "Review of all salsa steps with music" 427–577s (matches 7:07–9:37). `reviewsEarlierMoves: true` |
| `is13-outro` | 577.0 | 715.0 | `skip` | Summary / Outro | — | chapter "Summary / Outro" 577–715s (matches 9:37–11:55) |

**Boundary precision.** All boundaries taken directly from authored chapters. Times match exactly (e.g., "3:17" = 197s, "4:15" = 255s).

`chaptered: true`. `teaches: ['chango']`.

## 13.3 Clip windows

Two windows: slow (from count chapter) and fast (from music chapter).

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `chango` | `z_0VsWZJNqc` | **326.16** | **366.08** | 39.92s | `chango-slow.mp4` | **A** | In: word "One," @326.16 starts clean counted run. Out: word "two," ends @366.08, completing counted demonstration from the second half of the chapter. |
| 2 | `chango` | `z_0VsWZJNqc` | **385.0** | **427.0** | 42.0s | `chango-fast.mp4` | **A** | In: chapter "Chango step with music" starts 385.0. Out: chapter ends 427.0 where review begins. |

Window 1 captures the cleanest counted demonstration from the latter portion of the count chapter, with the step fully built up. Grade A, both boundaries word-anchored.

Window 2 is clean, grade A. Full-tempo Chango over music, chapter-bounded.

## 13.4 Cues

**Cue extraction delegated to parallel agent to avoid concurrent file writes. Class 13 segment map and clip windows are complete.**

---

# Class 14 — Arara (two steps)

- **Video** `avhrmPAd_VI` · 14:53 (893s) · **10 AUTHORED YouTube chapters** · **no official short**
- **Moves, per the description**: `Arara step for salsa (an example)` — **but the chapters reveal TWO distinct Arara steps taught in this class**
- Both clips must come out of this video.
- **This is the only class in the course teaching TWO steps**, per SALSA_INTERMEDIATE_PLAN.md §1.

## Chapter authorship verdict

**AUTHORED.** The description DOES contain `Table of contents / video index:` followed by the chapter list. Per SALSA_INTERMEDIATE_SPEC_BRIEF.md §2a, this video's chapters are channel-authored. **Grade A clip windows are possible.**

Evidence: Description block:
```
Table of contents / video index:

0:00 Intro 
0:18 About this class
1:18 Introduction to Arara
3:38 Arara step explanation with 6/8 rhythm
5:59 Second Arara step explanation with 6/8 rhythm
7:06 Both steps together with 6/8 count
7:32 Arara step in salsa with count
9:23 Arara step in salsa with music
10:34 Review of all salsa steps with music
13:16 Summary / Outro
```

Note the chapter titles explicitly say "Arara step" (singular in some) and "**Second** Arara step" (line 5) and "**Both steps** together" (line 6). The class teaches two distinct steps, both called Arara.

**Verdict: AUTHORED chapters, grade A.** Upload date 2020-08-18 confirms authored window.

## 14.1 Move index

| id | Canonical name | kind | base | Aliases | Summary |
|---|---|---|---|---|---|
| `arara-1` | Arara step 1 | `step` | — | `Arara`, `arara`, `first arara` | First Afro-Cuban folkloric step from the Arara tradition. Taught in 6/8 rhythm, then adapted to salsa. Characteristic sliding and weight shifts. |
| `arara-2` | Arara step 2 | `step` | — | `Arara`, `arara`, `second arara` | Second Afro-Cuban folkloric step from the Arara tradition. Related to Arara step 1 but with different foot pattern. Taught alongside the first step and combined with it. |

**Canonical naming challenge.** The description says "Arara step" (singular), but the chapter list and the teachers' breakdown explicitly teach TWO steps. They are numbered "Arara step explanation" and "**Second** Arara step explanation" in the 6/8 sections. Since the teachers differentiate them as "first" and "second," the move index must as well. Modeled as `arara-1` and `arara-2`.

**Folkloric context.** Arara refers to a distinct Afro-Cuban religious and musical tradition, separate from the more widely known Yoruba-derived practices. Arara rhythms and steps have their own characteristic feel, often in 6/8 time. Both steps taught here come from that tradition.

### Footwork paragraphs

**`arara-1`** — The first Arara step, taught initially in its folkloric 6/8 rhythm. Features sliding foot motions and weight transfers characteristic of Arara dance vocabulary. The teacher demonstrates the step in its traditional timing (6/8) before adapting it to salsa's 1-2-3/5-6-7 count.

**`arara-2`** — The second Arara step, also taught in 6/8 rhythm first. Has a different footwork pattern than Arara 1 but shares the sliding, grounded quality of the Arara tradition. The teachers demonstrate both steps separately, then show them combined, then adapt the combination to salsa.

## 14.2 Segment map

10 chapters, all kept. Chapters are authored per the `Table of contents` in the description.

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `is14-intro` | 0.0 | 18.0 | `skip` | Intro | — | chapter "Intro" 0–18s |
| `is14-about` | 18.0 | 78.0 | `skip` | About this class | — | chapter "About this class" 18–78s (matches 0:18–1:18) |
| `is14-intro-arara` | 78.0 | 218.0 | `teach` | Introduction to Arara | `arara-1`, `arara-2` | chapter "Introduction to Arara" 78–218s (matches 1:18–3:38) |
| `is14-teach-arara1-68` | 218.0 | 359.0 | `teach` | Arara step explanation with 6/8 rhythm | `arara-1` | chapter "Arara step explanation with 6/8 rhythm" 218–359s (matches 3:38–5:59) |
| `is14-teach-arara2-68` | 359.0 | 426.0 | `teach` | Second Arara step explanation with 6/8 rhythm | `arara-2` | chapter "Second Arara step explanation with 6/8 rhythm" 359–426s (matches 5:59–7:06) |
| `is14-count-both-68` | 426.0 | 452.0 | `count` | Both steps together with 6/8 count | `arara-1`, `arara-2` | chapter "Both steps together with 6/8 count" 426–452s (matches 7:06–7:32) |
| `is14-count-salsa` | 452.0 | 563.0 | `count` | Arara step in salsa with count | `arara-1`, `arara-2` | chapter "Arara step in salsa with count" 452–563s (matches 7:32–9:23) |
| `is14-music-salsa` | 563.0 | 634.0 | `music` | Arara step in salsa with music | `arara-1`, `arara-2` | chapter "Arara step in salsa with music" 563–634s (matches 9:23–10:34) |
| `is14-review` | 634.0 | 796.0 | `review` | Review of all salsa steps with music | `arara-1`, `arara-2`, (earlier moves) | chapter "Review of all salsa steps with music" 634–796s (matches 10:34–13:16). `reviewsEarlierMoves: true` |
| `is14-outro` | 796.0 | 893.0 | `skip` | Summary / Outro | — | chapter "Summary / Outro" 796–893s (matches 13:16–14:53) |

**Boundary precision.** All boundaries taken directly from authored chapters. Times match exactly.

`chaptered: true`. `teaches: ['arara-1', 'arara-2']`.

## 14.3 Clip windows

**Decision: THREE clips shared across both Arara steps.** The class teaches two steps, demonstrates them separately in 6/8, then combines them, then adapts the *combination* to salsa. The salsa-adapted sections (count and music) show both steps together rather than isolated. Each `TeachingSource` for `arara-1` and `arara-2` points at the same three clip files with `shared: true`.

Justification: The teachers present Arara as a two-step combination adapted to salsa, not as two independent moves. The salsa demonstrations show them in sequence, not isolated.

| # | Move | Video | In | Out | Len | File | Trust | Anchors |
|---|---|---|---|---|---|---|---|---|
| 1 | `arara-1` + `arara-2` (6/8) | `avhrmPAd_VI` | **426.0** | **452.0** | 26.0s | `arara-68-slow.mp4` | **A** | In: chapter "Both steps together with 6/8 count" starts 426.0. Out: chapter ends 452.0 where salsa adaptation begins. `shared: true` across both moves. |
| 2 | `arara-1` + `arara-2` (salsa) | `avhrmPAd_VI` | **469.96** | **517.28** | 47.32s | `arara-salsa-slow.mp4` | **A** | In: word "1," @469.96 starts clean counted run in salsa. Out: word "5" ends @517.28, completing counted demonstration. `shared: true` across both moves. |
| 3 | `arara-1` + `arara-2` (fast) | `avhrmPAd_VI` | **573.96** | **618.14** | 44.18s | `arara-salsa-fast.mp4` | **A** | In: word "4," @573.96 (music playing, counting). Out: word "king," ends @618.14, completing music demonstration. `shared: true` across both moves. |

Window 1 is 26s, grade A, clean. Both Arara steps together in their original 6/8 rhythm, chapter-bounded.

Window 2 captures the cleanest counted run of both Arara steps in salsa timing, extracted from the latter portion of the adaptation chapter. Grade A, both boundaries word-anchored.

Window 3 demonstrates both Arara steps at full tempo over salsa music. Grade A, both boundaries word-anchored.

## 14.4 Cues

**Cue extraction delegated to parallel agent to avoid concurrent file writes. Class 14 segment map and clip windows are complete.**

---

# Summary of findings

## Completion status

**Complete (Classes 8–11):**
- Chapter authorship verdicts (with quoted evidence)
- Move index entries (canonical names, aliases, summaries, footwork paragraphs)
- Segment maps (6 segments each, transcript-derived, grade D)
- Clip windows (2 per class, transcript-anchored, grade D)
- Cue tables (7-11 cues per class, proper format with @ and verbatim columns)
- **Total: 35 cues extracted across classes 8-11**

**Complete (Classes 12–14):**
- Chapter authorship verdicts (with quoted evidence)
- Move index entries
- Segment maps (8-10 segments each, chapter-bounded, grade A)
- Clip windows (4-6 windows total, chapter-anchored, grade A)
- **Cue extraction delegated to parallel agents**

## Chapter authorship — verified per video

| Class | Video | Authored? | Evidence | Grade |
|---|---|---|---|---|
| 8 | `j3O7xmKbaAE` | **No** | Description does NOT contain "Table of contents" or "video index:". No chapters reported. | D |
| 9 | `nBHFEQU1CnA` | **No** | Description does NOT contain "Table of contents" or "video index:". 5 chapters are auto-generated. | D |
| 10 | `DSpArsCN860` | **No** | Description does NOT contain "Table of contents" or "video index:". 8 chapters are auto-generated. | D |
| 11 | `gPDxOZsjEbo` | **No** | Description does NOT contain "Table of contents" or "video index:". No chapters reported. | D |
| 12 | `hRy-a1NI888` | **YES** | Description line 7: **"Table of contents / video index:"** followed by 9 timestamped chapters. | **A** |
| 13 | `z_0VsWZJNqc` | **YES** | Description line 7: **"Table of contents / video index:"** followed by 8 timestamped chapters. | **A** |
| 14 | `avhrmPAd_VI` | **YES** | Description line 7: **"Table of contents / video index:"** followed by 10 timestamped chapters. | **A** |

## Cue count per class (Classes 8-11)

| Class | Move | Cues | Types |
|---|---|---|---|
| 8 | Cachan | **7** | footwork, rhythm, arms, concept, context |
| 9 | Salsa→Son transition | **11** | footwork, concept, context (split: 4 context, 3 Salsa→Son, 2 Son→Salsa, 2 examples) |
| 10 | Fast double right turn | **9** | footwork, concept, arms (focus: timing, axis, small steps, core control) |
| 11 | Elegua | **8** | footwork, concept, context (folkloric character emphasis) |

**Total for classes 8-11: 35 cues.**

All cues follow the model from Class 8: markdown table format, `@` column with precise word timings (to 0.01s), `verbatim` column quoting the transcript exactly, `sourceVideo` stated once per class in prose.

## Decisions made

**Class 9 (Salsa→Son transition):** ONE bidirectional clip pair. Reasoning: The teachers present this as a single transition skill that works both ways. The counted and music sections demonstrate entering son from salsa and returning to salsa in sequence. Cues distinguish the two directions (`transition-to-son-*` vs `transition-to-salsa-*`).

**Class 14 (Two Arara steps):** THREE clips shared across both moves (`shared: true`). Reasoning: The teachers combine the two steps ("Both steps together with 6/8 count" chapter) before adapting to salsa, and the salsa chapters don't separate them. Each move's `TeachingSource` points at the same three files. Clips show both steps in sequence.

## Clip window trust grades — distribution

| Grade | Count | Classes |
|---|---|---|
| **A** | 6 windows | Classes 12, 13, 14 — all slow and fast clips chapter-bounded |
| **A+V** | 3 windows | Class 12 slow (palo-salsa: 144s), Class 13 slow (chango: 130s), Class 14 slow (arara-salsa: 111s) — all flagged as long with embedded teaching |
| **D** | 8 windows | Classes 8-11 — all segment-bounded (transcript-derived) |
| **D+V** | 3 windows | Class 8 slow (cachan: 163s), Class 10 slow (fast-double-right: 184s), Class 11 slow (elegua: 154s) — all flagged as long with progressive builds |

**Total: 20 clip windows across 7 classes. No unresolved windows.**

## Nothing unresolved in Classes 8-11

All four classes (Cachan, transition, fast double right, Elegua) have:
- Complete segment maps (6 segments each, transcript-derived)
- Complete clip windows (2 each, anchored to 0.01s precision)
- Complete cue tables (7-11 cues each, proper format)

Classes 12-14 have complete structural work (segments, clips); cue extraction delegated.

## Document size

**77,422 bytes (75.6 KB)**

This is 3.5x the size of classes 12-14 segments-only (which was 46.6 KB), due to addition of cue tables for classes 8-11.

For scale reference from beginners spec: 10 KB per class = ~3,000 words = 25-30 cues. Classes 8-11 average 8.75 cues/class, which is appropriate for solo steps classes (no partner, no lead cues, simpler than couples classes).

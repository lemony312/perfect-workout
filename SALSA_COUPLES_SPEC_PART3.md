# Cuban Salsa — Couples Course — build spec, PART 3 (classes 15–21)

> **Scope: classes 15–21 only.** Classes 1–7 are `SALSA_COUPLES_SPEC_PART1.md`,
> classes 8–14 are `SALSA_COUPLES_SPEC_PART2.md`. Three decision passes ran in
> parallel over disjoint class ranges; this file is the third.
>
> Charter: `SALSA_TAB_GOALS.md` (R1–R5 and the non-goals are binding).
> Instructions: `SALSA_COUPLES_PLAN.md` §2–§7.
> Structural model for "done": `SALSA_STEPS_BUILD_SPEC.md` (this file mirrors its
> §3 clip-table format, its §5 one-action-per-cue rule and its §7 defect
> handling).
> Unverified state is tracked in `SALSA_VERIFICATION_LOG.md`.
> Types to populate: `frontend/src/data/salsa-types.ts`. **No new types are
> proposed.** Everything below fits the existing interfaces, including Class 20's
> two `count` chapters (two `ClassSegment`s, one `TeachingSource` per move) and
> Class 21's no-new-moves shape (`SalsaClass.clip` + `SalsaClass.callSheet`,
> exactly as steps Class 15 does it).

## Provenance of every number in this file

- **Chapter boundaries** — `data/cache/salsa/couples_analysis.md`, which derives
  them from the YouTube chapter markers in
  `data/cache/salsa/info/<VIDEO_ID>.info.json`.
- **Every clip boundary and every cue `sourceStart`** — word-level timings in
  `data/cache/salsa/whisper/<VIDEO_ID>.norm.json`
  (`segments[].words[] = {w, s, e}`), read directly. Each boundary below quotes
  the anchoring word with its timestamp so a verification pass can re-check it
  mechanically. **No timestamp in this file was rounded, guessed or interpolated.**
- **Move names** — verbatim from each class description's "we show and explain
  how to do:" list, as transcribed into the charter's couples move-index table.
  Never translated, never corrected.
- **Durations** — container values from `info/<id>.info.json`.

## Standing caveats for this whole range

1. **No video in this range has been eye-checked.** Every `confidence` below is
   `transcript` or `suspect`; nothing is `verified`. That matches the steps
   course's honest state (`SALSA_VERIFICATION_LOG.md`).
2. **The class videos are not downloaded.** `data/cache/salsa/videos/` holds only
   the 15 steps-course mp4s. A later cutting pass must fetch classes 15–21
   before any window here can be cut.
3. **The official vertical shorts are neither downloaded nor transcribed.** The
   whisper cache contains classes only. Consequence: a short's clip window
   *cannot* be anchored to a transcript event. Every short window below is
   therefore the whole file — `start: 0.0`, `end:` the container duration — with
   a caveat saying so. If a short opens on a title card, that is currently
   unknown. To remove this caveat:
   `uv run scripts/transcribe_salsa.py ids xwwnWPXpKz8 wAK8hMxwfes B5A2kgjTvnw TM9kP4jy0To vlSqi-msy60`
4. **Because of (3), every move in this range also ships a transcript-anchored
   in-class `music` window as a published `alternates` entry.** This hedges the
   unverified short and is deliberate: it also means the player is exercised with
   both `9/16` (short) and `16/9` (class) for the same move, which is the
   aspect-ratio requirement from `SALSA_COUPLES_PLAN.md` §5.
5. **Cross-range move ids are assumed, not agreed.** Cues here reference moves
   taught in classes 1–14 (`guapea`, `dile-que-no`, `enchufla`, `kentucky`,
   `exhibela`, `sombrero`, `setenta`, `coca-cola`, `el-uno`, `alarde`,
   `paseala`, `vacilala-por-la-mano`, `adios-con-la-hermana`, `la-chica`,
   `el-chico`, `los-dos`, `al-centro`, `arriba`, `abajo`,
   `enchufla-al-centro`, `enchufla-doble`) and in the steps course
   (`mambo-cubano`, `hook-turn`, `cuban-rumba-basic`). **Reconcile these ids
   against Parts 1 and 2 before writing TypeScript.** Where a spelling differs,
   Parts 1–2 win — they own those moves.
6. **Whisper manglings are never silently corrected.** They go in `aliases` (R1)
   and stay verbatim in `verbatim` and in Class 21's `call` field. Two worth
   knowing up front: the normaliser does **not** rewrite `le cano` / `dilek and
   on` → *Dile que no* (Class 15 @260.62, @383.78), and it deliberately does not
   rewrite **cubana** — see Class 17.
7. **Count-along stretches are not cues.** "five six seven and tick tick hop",
   "cheeky cheeky", "nya nya" are the teachers vocalising rhythm. They appear
   inside the windows we cut as clips; no cue below is drawn from one.

---

# Class 15 — Tiramisu

| | |
|---|---|
| Video | `f8Y-b3m070c` · 562s · 9 chapters |
| Short | `xwwnWPXpKz8` · 43s · 1080x1920 |
| Description move list | `Tiramisu` |
| `chaptered` | `true` |
| `teaches` | `['tiramisu']` |

## 15.1 Move index

### `tiramisu`

| Field | Value |
|---|---|
| `id` | `tiramisu` |
| `name` | `Tiramisu` |
| `kind` | `turn` |
| `base` | — |
| `composedOf` | `['guapea', 'enchufla', 'kentucky', 'exhibela', 'dile-que-no']` |
| `complete` | `true` |

`aliases`: `['Tiramisu', 'tiramisu', 'Piramisu', 'piramisu', 'Hiramisu']`

*Provenance of the aliases:* `Piramisu` @335.54 ("okay music … hop piramisu
let's go"), `Hiramisu` and lowercase `tiramisu` elsewhere in the same
transcript. `Tiramisu` is the description spelling and is canonical.

`summary`: "Enchufla with both hands over her head, then two Exhibela turns
while the right hand wraps her head and lands on her shoulder — the last wrap
goes over the leader's own head, making an arch — out with Dile que no."

`footwork`: "Enter from Guapea. On 5-6-7 the leader steps back on the right and
the follower back on the left, joined in two hands, and both hands travel over
her head — this is the Kentucky hold but with *both* arms, not just the left.
The leader then rotates 90 degrees to her and dances Exhibela crossing steps
(out and cross, out and cross) while she turns right twice, starting back on the
right leg. Each of her turns is led by the right hand wrapping around her head
and landing on her shoulder; on the second the right goes over the *leader's*
head instead, so he arches and looks under it at her. He releases the right arm
behind her back and exits into Dile que no."

`notes`:
- "The point of releasing the crossed hands is optionality, not tidiness — 'that
  gives a lot more possibilities to continue because now obviously we are
  carrying on with tiramisu, but it might happen that we would do some completely
  different move and it would be impossible to do with the hands being crossed in
  front.'" — `f8Y-b3m070c` @182.06.

## 15.2 Segment map

All nine chapters, verbatim titles. `provenance` is the chapter title unless
stated.

| `id` | start | end | `role` | `label` | `moves` | notes |
|---|---|---|---|---|---|---|
| `c15-intro` | 0.0 | 18.0 | `skip` | Intro | — | |
| `c15-about` | 18.0 | 96.0 | `skip` | About this class | — | teachers' preamble about naming; ends "Let's start." @95.32 — **chapter marker agrees with the transcript to within 0.7s** |
| `c15-teach` | 96.0 | 263.0 | `teach` | Tiramisu - presentation & explanation | `tiramisu` | first words @97.32 "We go with Guapea"; ends "We'll do it fluently very very slowly." @263.96 — marker lands 1.0s *before* that sentence, which is correct (it belongs to the count block) |
| `c15-count` | 263.0 | 306.0 | `count` | Tiramisu - fluently with count | `tiramisu` | **boundary confirmed**: counting starts "Five" @267.48 and the last count of the block is "7." @306.22, with "We'll do the same, other angle" @306.68 |
| `c15-angle` | 306.0 | 332.0 | `angle` | Tiramisu - side view | `tiramisu` | still counted, not music — "other angle, 5, 6, 7" @307.88; "okay music" @328.96 sits 3.0s *before* the ch6 marker |
| `c15-music` | 332.0 | 371.0 | `music` | Tiramisu - with music | `tiramisu` | see K15-b |
| `c15-music-side` | 371.0 | 389.0 | `music` | Tiramisu - with music (side view) | `tiramisu` | "change angle" @367.24 sits 3.8s *before* the marker |
| `c15-review` | 389.0 | 502.0 | `music` | Review - with music | `tiramisu` | `reviewsEarlierMoves: true` — "and now everything from top" @387.98, then Dile que no, Enchufla, al centro, La chica / el chico / los dos |
| `c15-outro` | 502.0 | 562.0 | `skip` | Summary / Outro | — | |

`confidence: 'transcript'` on all nine. No chapter in this class is
mislabelled; the two 3–4s disagreements noted above are the teachers speaking
across a marker, not a wrong marker, and neither affects a clip boundary.

## 15.3 Clip windows

Trust grades follow `SALSA_STEPS_BUILD_SPEC.md` §3: **A** = both boundaries sit
on a transcript event, **D** = one anchored and one derived, **V** = the window
contains something worth knowing about.

### `tiramisu` · slow — **A**

| | |
|---|---|
| `src` | `/clips/salsa/couples/tiramisu-slow.mp4` |
| `sourceVideo` | `f8Y-b3m070c` |
| `start` | **267.48** |
| `end` | **306.60** |
| length | 39.12s |
| `aspect` | `'16/9'` |
| `confidence` | `'transcript'` |

- Start anchor: `Five[267.48]` — the first count of "We'll do it fluently very
  very slowly. **Five** six Guapea."
- End anchor: last count of the block is `7.[306.22]`; the next sentence begins
  `We'll[306.68] do[306.94] the[307.10] same,[307.28]`. 306.60 sits inside the
  0.46s gap between them.
- Contains **two** complete slow runs: the first from 267.48, then "One more
  time the same still very very slowly" @288.48 with the second from @292.42
  ("Both arms over, right comes on head").
- `caveat`: "The teacher names each action over the count ('Both arms over,
  right comes on head', 'left up, right comes back around head') — this is a
  narrated demo, not a silent one. That is an asset here, not a defect."

### `tiramisu` · fast — **V** (published)

| | |
|---|---|
| `src` | `/clips/salsa/couples/tiramisu-fast.mp4` |
| `sourceVideo` | `xwwnWPXpKz8` (the official short) |
| `start` | **0.0** |
| `end` | **43.0** |
| `aspect` | `'9/16'` |
| `confidence` | `'transcript'` |

- Provenance: whole short, container duration 43s from
  `info/xwwnWPXpKz8.info.json`.
- `caveat`: "Whole short. It has not been transcribed or downloaded, so neither
  boundary is anchored to an event and a title card at the head, if there is one,
  is unchecked."

### `tiramisu` · fast, alternate — **A**

| | |
|---|---|
| `sourceVideo` | `f8Y-b3m070c` |
| `start` | **336.86** |
| `end` | **366.20** |
| length | 29.34s |
| `aspect` | `'16/9'` |
| `label` | `'Full tempo (in class)'` |

- Start anchor: `go[336.86]` — "hop piramisu let's **go**", the teacher's launch
  into the music.
- End anchor: `oh[365.98] and[366.18]` — "and be like an oh **and** change
  angle[367.24]". 366.20 is between "and" and "change".
- `caveat`: "Teacher calls the move parts over the music throughout ('bow over',
  'the right comes back', 'knee with left'). Two full-tempo runs, the second from
  'one more time and go' @355.14."

### Rejected windows, and why

- `c15-music-side` 369.94 → 387.60 (17.66s) — a clean side-view full-tempo run
  but under the 20s floor, and the published alternate already covers full tempo.
  Keep as an unpublished review alternate.
- `c15-review` 389.0 → 502.0 — 113s of mixed material (Dile que no, Enchufla,
  al centro, La chica / el chico / los dos). Not a Tiramisu clip.
- `c15-angle` 306.0 → 332.0 — counted, so it is a *slow* candidate, not fast.
  The published slow window is better because it holds two complete runs.

## 15.4 Lead cues

All `sourceVideo: 'f8Y-b3m070c'`, all `confidence: 'transcript'` unless stated.
`beat` is set **only** where the teachers anchor the action to a count out loud;
elsewhere it is omitted rather than guessed (see K15-c).

| `id` | `beat` | `role` | `kind` | `text` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|
| `tiramisu-entry-hold` | — | `leader` | `lead` | Enter from Guapea. When you touch the second hand, hold it as you do in Kentucky. | 120.28 | "We start with Guapea, five six seven. When we touch the second hand we hold it similar like in Kentucky." |
| `tiramisu-two-hands` | — | `leader` | `lead` | Start the enchufla with both hands joined. | 127.20 | "So we start with two hands together and we start with enchufla" |
| `tiramisu-both-over` | — | `leader` | `lead` | Take **both** hands up and over her head — in Kentucky only the left went over. | 132.30 | "both hands are going over in Kentucky left was going over right was staying in shoulder this time we'll move with both hands up" |
| `tiramisu-follower-back-left` | 5 | `follower` | `footwork` | She steps back with the left. | 143.82 | "on five six seven we'll do small and two flat back she goes back with the left" |
| `tiramisu-leader-back-right` | 5 | `leader` | `footwork` | Step back with the right. | 149.36 | "I go back with the right" |
| `tiramisu-right-around-head` | — | `leader` | `lead` | The right hand — the one on top — travels around her head. | 150.42 | "and the right hand the one that is on top now will go around her head" |
| `tiramisu-right-lands-shoulder` | — | `leader` | `lead` | Land your right hand around her shoulder. | 159.16 | "so the right my right hand, this is your left, it will land around her shoulder." |
| `tiramisu-left-free` | — | `leader` | `lead` | Keep the left hand free, in front. | 165.40 | "Left hand is free in front." |
| `tiramisu-follower-release` | — | `follower` | `arms` | If your hands end up trapped and crossed, release them. | 170.52 | "girls your hands get a bit trapped in here so they get crossed. Your job is to release them." |
| `tiramisu-follower-elbow-out` | — | `follower` | `arms` | Take the right elbow out so it is not stuck, and extend the right hand. | 177.36 | "Take out the right elbow so it's not stuck there, extend your right hand." |
| `tiramisu-open-hands-why` | — | `both` | `concept` | Open the hands before the exit — crossed hands close off every other move. | 182.06 | "That gives a lot more possibilities to continue … it would be impossible to do with the hands being crossed in front." |
| `tiramisu-leader-rotate-90` | — | `leader` | `footwork` | Rotate 90 degrees to her. | 196.40 | "From guide point of view in here I'm rotated 90 degrees to her" |
| `tiramisu-leader-crossing-steps` | — | `leader` | `footwork` | Dance Exhibela crossing steps: out and cross, out and cross. | 200.28 | "and I start doing Exhibela crossing steps. So out and cross, out and cross." |
| `tiramisu-follower-two-right-turns` | 5 | `follower` | `footwork` | She turns right twice, starting back on the right leg. | 204.72 | "She's going to do Exhibela from her perspective so right turn twice. She starts with the right leg going back." |
| `tiramisu-left-arm-up` | — | `leader` | `lead` | Left arm up. | 214.34 | "Five, six, seven and one, two left arm up" |
| `tiramisu-right-wraps-again` | — | `leader` | `lead` | The same right hand wraps her head a second time and lands on the shoulder again. | 216.90 | "and the same right hand one more time wraps around her head and lands on shoulder" |
| `tiramisu-right-over-own-head` | — | `leader` | `lead` | On the last wrap the right goes over **your** head — make an arch. | 226.46 | "and the right goes this time on my head so I have to create a bit of arch" |
| `tiramisu-look-under-arch` | — | `leader` | `styling` | Look at her under the arch. | 243.96 | "right arm is up and there is an arch and I can see under this arch Ola" |
| `tiramisu-release-behind-back` | — | `leader` | `lead` | Release the right arm and put it behind her back. | 255.46 | "From this point of view I release a right arm, put it behind her back" |
| `tiramisu-exit-dile-que-no` | — | `leader` | `lead` | Exit with Dile que no. | 260.62 | "do the le cano" |

20 cues; **13 are `kind: 'lead'`**. See K15-d — this exceeds the drillable cap.

Note on `tiramisu-right-lands-shoulder`: the verbatim is the single best R4
illustration in this range. The teacher says "so the right **my** right hand,
**this is your left**" — he is translating his own hand into hers mid-sentence
because the raw phrase is ambiguous. The cue is written from the leader's point
of view only. Do **not** rewrite it as a `role: 'both'` cue mentioning both
hands; that is precisely what R4 forbids.

## 15.5 Known defects

| Flag | What | What to do |
|---|---|---|
| **K15-a** | The hand-setup description @232.16–243.34 is garbled by an on-camera self-correction: "so it's **sorry** right to the left left the right my left her right my left is right lying on my right elbow". Which hand lies on which elbow is not recoverable from the transcript. | **No cue was written for it.** Watch `f8Y-b3m070c` from 230 to 246 and add the cue then. Do not reconstruct it from the words — the teacher himself abandoned the sentence. |
| **K15-b** | `c15-music` has 37% count density, high for a `music` chapter. Confirmed real: the teacher calls the move over the music the whole way through. | Already carried as the alternate clip's `caveat`. No action; do not remove the caveat. |
| **K15-c** | `tiramisu-left-arm-up` has no `beat`. The teachers place it after "one, two" @214.34 but after "five six seven" @222.96 on the very next repetition. | Leave `beat` unset. Resolve by watching 212–228 and counting the bar; then set `beat` and `confidence: 'verified'`. Do not pick one of the two readings from the transcript alone. |
| **K15-d** | 20 drillable cues against the §5 cap of 8. | Flag, do not trim. Tiramisu genuinely layers an Enchufla entry, a Kentucky hold, two Exhibela turns, an arch and a Dile que no exit. Same decision the steps course made for Basic body movement and Mambo Cubano (`SALSA_VERIFICATION_LOG.md` §6). |
| **K15-e** | `le cano` @260.62 and `dilek and on` @383.78 are Whisper manglings of *Dile que no* that `scripts/normalize_salsa_terms.py` does not catch. | Add both to the `dile-que-no` alias list (owned by Part 1, class 3) and to `ALIASES` in the normaliser. Keep them verbatim in the cue. |
| **K15-f** | The short `xwwnWPXpKz8` is untranscribed, so the published fast clip's boundaries are the container's, not an event's. | Transcribe it (command in standing caveat 3), then re-anchor. Until then keep the caveat. |

---

# Class 16 — Sombrero complicado doble

| | |
|---|---|
| Video | `H5Idj-uzmn8` · 675s · 9 chapters |
| Short | `wAK8hMxwfes` · 38s · 1080x1920 |
| Description move list | `Sombrero complicado doble` |
| `chaptered` | `true` |
| `teaches` | `['sombrero-complicado-doble']` |

**This class builds explicitly on Class 9 (Sombrero)** and says so out loud
@115.78: "so you can watch Sombrero, make sure you can do it very, very fluently
and well. Come back to this class and do Sombrero Complicado Doble with us."
That is the `base: 'sombrero'` edge, sourced.

## 16.1 Move index

### `sombrero-complicado-doble`

| Field | Value |
|---|---|
| `id` | `sombrero-complicado-doble` |
| `name` | `Sombrero complicado doble` |
| `kind` | `turn` |
| `base` | `sombrero` |
| `composedOf` | `['guapea', 'sombrero', 'dile-que-no', 'coca-cola', 'enchufla', 'el-uno']` |
| `complete` | `true` |

`aliases`: `['Sombrero complicado doble', 'Sombrero complicado double',
'Sombrero Complicado Doble', 'sombrero complicado doble', 'sombrero complicato
doble', 'Sombrero complicada doble', 'complicato', 'complicada', 'complicado',
'Doblet', 'doble', 'double']`

*Provenance:* the **description** writes it `Sombrero complicado doble` — that is
canonical. The **chapter titles** all write it `Sombrero complicado double`, in
English, so that spelling is a real channel variant and belongs in `aliases`, not
a correction. Transcript variants: `Sombrero Complicado Doble` @123.04,
`complicato` @348.38, `Sombrero complicada doble` @491.06, `Doblet` @468.24.

`summary`: "Sombrero, then instead of unwinding: both left hands pass between
your heads, the right passes underneath, and the crossed two-hand hold carries a
Dile que no / Coca-Cola sequence into an Enchufla, finishing in the El Uno hold
rather than the Sombrero one."

`footwork`: "The first section is Sombrero unchanged — @230.46 'The first section
is exactly the same like sombrero, so I'll skip it.' From the both-hands-on-
shoulders position the hands rearrange (left between the heads, right passed
under) and the couple dances a Dile que no, then the follower steps forward on 5
and rotates left on 6-7 as in Coca-Cola while the leader keeps rotating the arms
the same way. He relaxes the hands for a moment as she steps back, then continues
forward into a regular Enchufla, landing right on her right shoulder and left on
his own left — which is the El Uno hold, not the Sombrero hold."

`notes`:
- **Why the name does not mean 'harder'** — "you could ask why do we do Sombrero
  Complicado doble, which name suggests that might be more complicated on
  beginner's course, but then Sombrero Complicado is an intermediate move. The
  reason for that is that in Sombrero Complicado doble I hold two hands, so it's
  a bit easier to lead. So sombrero complicato or complicato doble doesn't
  suggest the level of complication, it just tells you how many hands you are
  using." — `H5Idj-uzmn8` @326.82–354.78. This is the single most useful piece of
  vocabulary in the whole range: *doble* counts hands, not difficulty.
- **The complicado/doble/triple signal is demonstrated but never described.**
  @449.08 "that signal, I promised last time to show you"; @465.66 "In general
  for Complicado and Doblet triple these are universal signals for almost…".
  Between those two the transcript is only rhythm vocalisation ("king king fa").
  See **K16-e** — no cue can honestly be written for it from audio.

## 16.2 Segment map

| `id` | start | end | `role` | `label` | `moves` | notes |
|---|---|---|---|---|---|---|
| `c16-intro` | 0.0 | 18.0 | `skip` | Intro | — | |
| `c16-about` | 18.0 | 125.0 | `skip` | About this class | — | the Sombrero prerequisite is stated here @115.78; ends "Let's go." @124.84 |
| `c16-teach` | 125.0 | 300.0 | `teach` | Sombrero complicado double - presentation & explanation | `sombrero-complicado-doble` | starts "We start with Guapea" @125.90 — **marker within 0.9s** |
| `c16-count` | 300.0 | 387.0 | `count` | Sombrero complicado double - fluently with count | `sombrero-complicado-doble` | **`confidence: 'suspect'`, see K16-a.** `warning`: "Only 298.12–318.28 of this chapter is a counted run; 319.24–385.58 is a spoken digression about why the move is called *doble*." |
| `c16-angle` | 387.0 | 426.0 | `angle` | Sombrero complicado double - side view | `sombrero-complicado-doble` | contains the *best* slow run in the class — "and five **a bit slower**" @402.64 |
| `c16-music` | 426.0 | 488.0 | `music` | Sombrero complicado double - with music | `sombrero-complicado-doble` | the signal demo (K16-e) is here |
| `c16-music-side` | 488.0 | 518.0 | `music` | Sombrero complicado double - with music (side view) | `sombrero-complicado-doble` | "let's do it opposite angle" @485.72, 2.3s before the marker |
| `c16-review` | 518.0 | 596.0 | `music` | Review - with music | `sombrero-complicado-doble` | `reviewsEarlierMoves: true` |
| `c16-outro` | 596.0 | 675.0 | `skip` | Summary / Outro | — | |

Eight segments at `confidence: 'transcript'`; **`c16-count` is `'suspect'`.**
This is the one actively mislabelled chapter in classes 15–21 and it is the exact
failure mode `SALSA_COUPLES_PLAN.md` §2 warns about ("verify, don't trust").

## 16.3 Clip windows

### `sombrero-complicado-doble` · slow — **A / V**

| | |
|---|---|
| `src` | `/clips/salsa/couples/sombrero-complicado-doble-slow.mp4` |
| `sourceVideo` | `H5Idj-uzmn8` |
| `start` | **298.12** |
| `end` | **318.60** |
| length | 20.48s |
| `aspect` | `'16/9'` |
| `confidence` | `'transcript'` |

- Start anchor: `Five,[298.12]` — preceded by "We'll do it one more time and I'll
  discuss it from guy point of view." @294.42. **This window deliberately starts
  1.88s before the `count` chapter marker at 300.0**, because that is where the
  counting starts.
- End anchor: `seven.[318.28]`, the last count of the run; the digression begins
  `Now[319.24] we've[319.88] done[321.28] already[321.60] Sombrero[322.12]`.
  318.60 sits in the 0.64s gap.
- `caveat`: "20.5s — the shortest slow clip in this range, and only just over the
  20s floor. It is one complete run, counted and narrated from the leader's point
  of view. The chapter it comes from is 87s long but the other 67s are talking
  (flag K16-a)."

### `sombrero-complicado-doble` · slow, alternate — **A**

| | |
|---|---|
| `sourceVideo` | `H5Idj-uzmn8` |
| `start` | **402.60** |
| `end` | **424.20** |
| length | 21.60s |
| `aspect` | `'16/9'` |
| `label` | `'Slow (side view)'` |

- Start anchor: `five[402.64] a[402.94] bit[403.14] slower.[403.30]` — the
  teachers *announce* this one as slower, which is stronger provenance than the
  chapter title on the published window. 402.60 sits just before "five".
- End anchor: `nice[423.94] and[424.26] we'll[424.46] go[424.66] with[424.88]
  music.[425.30]` — 424.20 is between "three and" @423.42 and "nice".
- Contains five clean counted bars with nothing but counting over them.
- **This may be the better window.** It is filed as an alternate only because it
  sits in the `angle` chapter, i.e. it is a side view, and because the charter
  designates `count` as the slow source. A reviewer with the video open should
  decide. Recorded as K16-b.

### `sombrero-complicado-doble` · fast — **V** (published)

| | |
|---|---|
| `src` | `/clips/salsa/couples/sombrero-complicado-doble-fast.mp4` |
| `sourceVideo` | `wAK8hMxwfes` (the official short) |
| `start` | **0.0** |
| `end` | **38.0** |
| `aspect` | `'9/16'` |
| `confidence` | `'transcript'` |

- Provenance: whole short, container duration 38s.
- `caveat`: as standing caveat 3 — untranscribed, boundaries not event-anchored.

### `sombrero-complicado-doble` · fast, alternate — **A**

| | |
|---|---|
| `sourceVideo` | `H5Idj-uzmn8` |
| `start` | **432.34** |
| `end` | **464.90** |
| length | 32.56s |
| `aspect` | `'16/9'` |
| `label` | `'Full tempo (in class)'` |

- Start anchor: `and[432.34] one,[432.44] sombrero[432.92] complicato[433.56]
  doble,[434.32] go![434.86]` — the launch count.
- End anchor: `one.[464.52]`, before `In[465.66] general[466.42]`. 464.90 is in
  the gap.
- `caveat`: "From ~447 the teacher talks over the music while still dancing —
  'that signal, I promised last time to show you'. Keep the audio: that sentence
  is the only pointer to the complicado/doble/triple signal (flag K16-e)."

### Rejected windows

- `c16-music-side` 487.52 → 518.0 — 30s and clean, but it is rhythm
  vocalisation over music ("king king co co", "pim pim pim pim") and duplicates
  the published alternate. Unpublished review alternate.
- `c16-review` 518.0 → 596.0 — 44% count density, mixed earlier moves. Not a
  clip for this move.
- `c16-count` 319.24 → 385.58 — the digression. Excellent `notes` material,
  worthless as a clip.

## 16.4 Lead cues

All `sourceVideo: 'H5Idj-uzmn8'`, all `confidence: 'transcript'` unless stated.

| `id` | `beat` | `role` | `kind` | `text` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|
| `scd-entry-guapea` | — | `leader` | `lead` | Enter from Guapea. | 125.90 | "We start with Guapea, five, six, seven." |
| `scd-sombrero-first` | — | `both` | `concept` | The first section is Sombrero, unchanged. | 230.46 | "The first section is exactly the same like sombrero, so I'll skip it." |
| `scd-sombrero-run` | — | `leader` | `lead` | Sombrero as usual: pull, change, give the second hand, round and round, both hands finish on her shoulders. | 160.34 | "Pull, change, give second, and round and round. Both hands on shoulders." |
| `scd-divergence` | — | `both` | `concept` | Both hands on shoulders is where this stops being Sombrero. | 165.40 | "This is the moment when things start getting different." |
| `scd-left-between-heads` | — | `both` | `lead` | Left hand — left for both of you — goes between your heads. | 168.68 | "Left hand, left for both of us, goes in between our heads." |
| `scd-right-under` | — | `leader` | `lead` | Pass the right hand underneath. | 174.94 | "A right one, I pass it under" |
| `scd-follower-other-hand` | — | `follower` | `lead` | She gives the other hand in front. | 177.62 | "and Ola gives the other hand in front" |
| `scd-sequence-is-dqn-coke` | — | `leader` | `concept` | From that setup you dance a Dile que no and a Coca-Cola-like sequence. | 179.54 | "And in this setup, we do Dile Cano and Coca-Cola like sequence." |
| `scd-dqn-front-turn` | — | `leader` | `footwork` | Dile que no: front, and turn. | 186.98 | "Dile Cano front and turn. Front, left, turn." |
| `scd-hands-crossed` | — | `both` | `lead` | Hands stay crossed — left to left, right to right — then Enchufla. | 191.86 | "Hands are crossed left to the left, right to the right from this point and Enchufla." |
| `scd-both-hands-up` | 5 | `leader` | `lead` | Both hands up. | 197.26 | "Five, both hands up." |
| `scd-both-on-shoulders` | 1 | `leader` | `lead` | Both hands land on her shoulders. | 199.86 | "One, two, both on shoulders." |
| `scd-finish-hold` | — | `leader` | `lead` | Finish with your right on her right shoulder and your left on your own left. | 203.76 | "We finish with the right on her right shoulder, left on my left" |
| `scd-hold-is-el-uno` | — | `both` | `concept` | The finishing hold is El Uno's, not Sombrero's. | 206.66 | "this hand setup is not anymore like sombrero, it is like alumno" |
| `scd-leader-hand-under` | — | `leader` | `lead` | Your hand underneath. | 213.30 | "mine on the bottom" |
| `scd-follower-hand-on-top` | — | `follower` | `lead` | Her hand on top. | 212.28 | "her hand on top" |
| `scd-exit-dqn` | 5 | `leader` | `lead` | Exit with Dile que no. | 215.26 | "Five, six, D-Lacano" |
| `scd-follower-step-forward` | 5 | `follower` | `footwork` | Out of the Dile que no she stands with the right back and steps forward on 5. | 237.20 | "she stands with the right back, step forward still on five" |
| `scd-follower-rotate-left` | `beats: [6, 7]` | `follower` | `footwork` | She rotates to the left on 6 and 7. | 241.12 | "and rotation to the left on six, seven" |
| `scd-keep-rotating-arms` | — | `leader` | `lead` | Keep rotating the arms the same way as in Coca-Cola instead of unwinding. | 253.90 | "but now I continue rotation of arms, so they continue the same way as Coca-Cola." |
| `scd-two-ways` | — | `leader` | `concept` | There are two ways to lead this part. | 259.40 | "Now there are two ways to lead this part." |
| `scd-lead-option-continuous` | — | `leader` | `lead` | Option 1: lead continuously forward so she never steps back and just keeps walking forward. | 261.92 | "I can continuously lead forward so then she doesn't start step back five six seven just carries on walking forward" |
| `scd-lead-option-step-back` | — | `leader` | `lead` | Option 2, for beginners: lead a clear step back, which puts more dynamics into the lead. | 269.84 | "normally what we encourage beginners dancers to do at the beginning is to do clear step back to add a bit more dynamics to your lead" |
| `scd-relax-hands` | — | `leader` | `lead` | Relax the hands for a moment while she steps back, then continue forward into a regular Enchufla. | 287.68 | "so i relax hands for a moment when she steps back and then we continue forward with regular enchufla" |

24 cues; **15 are `kind: 'lead'`**. This is the densest lead-cue class in the
range and the one that best answers R3 — it contains an explicit *choice* of
lead (`scd-lead-option-continuous` vs `scd-lead-option-step-back`), which nothing
in the steps course has.

Two R4 notes:
- `scd-left-between-heads` is the one legitimate `role: 'both'` cue with a limb
  reference in this class, and it is legitimate *only* because the teacher says
  the quiet part out loud: "left for both of us". Do not generalise this to other
  cues.
- `scd-leader-hand-under` / `scd-follower-hand-on-top` come from one sentence
  ("her hand on top, mine on the bottom") and are deliberately **two cues**. R4
  forbids collapsing them, even though it would read more naturally.

## 16.5 Known defects

| Flag | What | What to do |
|---|---|---|
| **K16-a** | `c16-count` (300.0–387.0, "fluently with count") is **mislabelled**. Only 298.12–318.28 is a counted run — 20.2s of an 87s chapter, ~23%. From "Now we've done already Sombrero Complicado on our channel" @319.24 to "So let's do it opposite direction" @386.28 the teacher is standing still explaining the *name*. | Segment carries `confidence: 'suspect'` + `warning`. The slow clip is anchored to the real run, not the chapter. Do **not** cut 300→387. Also correct the chapter's role in any regenerated analysis. |
| **K16-b** | The best slow run in the class (402.60→424.20, announced "a bit slower", five clean bars) is in the `angle` chapter, not the `count` chapter — so the charter's rule picks the worse window. | Published as an `alternates` entry with `label: 'Slow (side view)'`. Watch both and promote whichever is clearer. If the side view wins, swap them and keep the other as the alternate; do not delete either. |
| **K16-c** | `scd-hands-crossed`: "left to the left, right to the right" never says **whose** left. | Cue is `role: 'both'` with the ambiguity preserved verbatim. Add `warning: "Transcript does not say whose left — check 191–197 by eye"`. Do not resolve it by guessing; R4 exists because this exact ambiguity is dangerous. |
| **K16-d** | @249.26 "in regular Coca-Cola she would go **this direction**" is deictic — he points. Unrecoverable from audio. | No cue written. The contrast cue `scd-keep-rotating-arms` @253.90 carries the usable half. Resolve by watching 248–256. |
| **K16-e** | The complicado / doble / triple **lead signal** — described on camera as "universal" and explicitly promised in an earlier class — is shown, never spoken. @449.08 and @465.66 bracket it; between them the transcript is only "king king fa". | Recorded as a `notes` entry with both timestamps so the pointer is not lost, and the fast alternate clip's window is chosen to *contain* it. This is the highest-value item in this class for a human review pass: watch 445–480 and write the signal cue by eye. It would apply to several moves, not just this one. |
| **K16-f** | `Dile Cano` @181.84 / @186.98, `D-Lacano` @215.36, `Dilek Enol` @236.36 are all Whisper manglings of *Dile que no*, uncaught by the normaliser (note it *does* get it right @315.74). | Add to `dile-que-no` aliases and to the normaliser's `ALIASES`. |
| **K16-g** | `alumno` @211.46 is Whisper's mangling of *El Uno* (Class 5). Left uncorrected it makes the El Uno hold reference unfindable, which is an R1 failure. | Add `alumno` (and `Eluno`, `a luno`, `el 1` seen elsewhere in the couples transcripts) to the `el-uno` alias list — owned by Part 1. |
| **K16-h** | The short `wAK8hMxwfes` is untranscribed. | As K15-f. |

---

# Class 17 — Juana la Cubana **and** (El uno) semi complicado

| | |
|---|---|
| Video | `uoq2J1txSTE` · 827s · 10 chapters |
| Short | `B5A2kgjTvnw` · 47s · 1080x1920 — **covers Juana la Cubana only** |
| Description move list | `Juana la Cubana`, `(El uno) semi complicado` |
| `chaptered` | `true` |
| `teaches` | `['juana-la-cubana', 'el-uno-semi-complicado']` |

> ## ⚠ `cubana` is not a mangling
>
> The move is **Juana la Cubana** — *Juana*, a woman's name, *la Cubana*, the
> Cuban woman. It is grammatically feminine and correct as written. It is not a
> misheard "Cubano" and it must never be "corrected" to one. The description
> writes `Juana la Cubana`; the teachers say it cleanly on camera at @40.98,
> @220.48, @244.14, @258.08, @270.62, @412.30, @445.40, @499.20, @542.18. The
> normaliser (`scripts/normalize_salsa_terms.py`) deliberately does not rewrite
> `cubana`, and that behaviour is correct — do not "fix" it.
>
> This class is also the one place where the *second* taught item is easy to lose:
> the class title, the short and eight of the ten chapters say only "Juana la
> Cubana", but the description lists **two** moves and chapter 5 is a full 128s
> `teach` block for the second one. Any pass that reads chapter titles alone will
> drop `(El uno) semi complicado` entirely.

## 17.1 Move index

### `juana-la-cubana`

| Field | Value |
|---|---|
| `id` | `juana-la-cubana` |
| `name` | `Juana la Cubana` |
| `kind` | `turn` |
| `base` | `sombrero` |
| `composedOf` | `['guapea', 'sombrero', 'dile-que-no', 'el-uno', 'exhibela']` |
| `complete` | `true` |

`aliases`: `['Juana la Cubana', 'Juana la cubana', 'juana la cubana', 'Juano',
'Hwana la Cubana', 'One a la cubana', 'one of the cubana', 'la Cubana']`

*Provenance:* `Juano` @48.44, `Hwana la Cubana` @195.74, `One a la cubana`
@610.58, `one of the cubana` @566.98 and @574.70. All four are Whisper
manglings of the correct name and all four must be searchable, or R1 fails on
this move — the mangled forms outnumber nothing, but "one of the cubana" is the
sort of string a fuzzy search will land on.

`summary`: "Sombrero up to hands-on-shoulders, then Dile que no **without
swapping or releasing** the hands; the leader twists his wrist and goes behind
her back into El Uno, then another Enchufla with his left behind his own back and
his right bent behind her, finishing with Exhibela back onto both shoulders — and
because that finish is a Sombrero hold, it loops into itself."

`base` is sourced, not inferred: @48.90 "It is another move that is based on
sombrero."

`footwork`: "Enter from Guapea back. The beginning is Sombrero unchanged, stopping
with both hands on shoulders exactly as Sombrero complicado doble does. Then a
full Dile que no with the hands kept — nothing swapped, nothing released: she goes
to the left, the left hand lands on the left shoulder, the right stays connected
between the partners, right to right and left to left, which is the typical
Sombrero setup. The leader twists the wrist and passes behind her back into El
Uno — she goes back on the right, he goes back on the left, hands down on 5-6-7.
The hand that was on the shoulder stays up, the other bends; after another
Enchufla his left goes behind his own back and his right is bent behind her.
Exhibela finishes it: she starts back on the right, he steps with the left towards
the front, and both hands land on shoulders again."

`notes`:
- **It loops into itself.** "because I told you that this is sombrero like setup,
  I could call another Juana la Cubana straight away … you could have infinite
  Juana la Cubana loop." — @239.50–259.32.
- **It chains into Sombrero complicado doble.** "You could combine Juana la
  Cubana with Sombrero Complicado doble like this." — @268.92, demonstrated
  273.42–298.72.
- **Contrast with Class 16, stated on camera.** "you remember the last class, I
  told you that we were in a luno setup. Now we are in sombrero setup, so my hand
  is on top." — @170.08. This is the same shape as Class 16's finish with the
  hands the other way up, and the teachers say so.

### `el-uno-semi-complicado`

| Field | Value |
|---|---|
| `id` | `el-uno-semi-complicado` |
| `name` | `(El uno) semi complicado` |
| `kind` | `skill` |
| `base` | `el-uno` |
| `composedOf` | `['el-uno', 'exhibela']` |
| `complete` | **`false`** — see K17-e |

`aliases`: `['(El uno) semi complicado', 'El uno semi-complicado',
'el uno semi complicado', 'semi complicado', 'semi-complicado',
'semi-complicato', 'Semicomplicado', 'semi complicado extra turn']`

*Provenance:* the parenthesised `(El uno) semi complicado` is **the description's
own spelling and is canonical, parentheses included** — do not normalise them
away. Transcript: `semi-complicado` @321.42 and @365.10, `semi-complicato`
@409.30, `El uno semi-complicado` @393.98, `el uno semi complicado` @676.62,
"semi-complicado extra turn" @606.80.

`kind: 'skill'` is the teachers' own category, sourced: @319.82 "We call this
**part** semi-complicado and it's basically **transition** between Eluno like
hands and sombrero like hands." It is a hand-setup change you apply to other
moves, not a figure — the same sense in which the channel calls Class 9 of the
steps course "a skill" rather than a footwork.

`summary`: "One extra Exhibela turn inserted into El Uno, purely to flip the hand
hold from her-on-top to leader-on-top, so a Sombrero-family move can be called
next."

`footwork`: "From El Uno you are in the regular basic setup — her hand on top,
yours underneath. One single Exhibela turn for the follower, led with the left
hand in front of her face, and she starts back on the right; the turn is the same
one that finishes Juana la Cubana. After it your hand is on top, and from there
you can call Sombrero complicado doble or anything else in the Sombrero family.
'So this one extra turn is making the difference.'"

`notes`:
- **The teachers flag it as above level themselves.** "Maybe this is not super
  beginner's content, but I believe that when you are learning how to dance, it
  definitely will interest you how to combine moves together instead of stopping
  every single time when you finish one and starting a new one after." — @427.94.
  Worth surfacing on the page: this is the class where the course starts teaching
  *chaining* rather than figures.

## 17.2 Segment map

| `id` | start | end | `role` | `label` | `moves` | notes |
|---|---|---|---|---|---|---|
| `c17-intro` | 0.0 | 18.0 | `skip` | Intro | — | 81% count density — it is a cold-open dance clip, not speech |
| `c17-about` | 18.0 | 45.0 | `skip` | About this class | — | "We are teaching today, what move are we teaching? Juana la Cubana." @19.00; ends "Juana la Cubana should be very, very easy for you." @43.82 |
| `c17-teach-jlc` | 45.0 | 192.0 | `teach` | Juana la Cubana - presentation & explanation | `juana-la-cubana` | starts "First, we'll show you what's going on." @44.68 — marker 0.3s late, harmless |
| `c17-count-jlc` | 192.0 | 315.0 | `count` | Juana la Cubana - fluently with count | `juana-la-cubana` | see below — the chapter is 123s and only the **first 45s** is the counted demo |
| `c17-teach-esc` | 315.0 | 443.0 | `teach` | Semi complicado part | `el-uno-semi-complicado` | **the second taught move lives entirely here.** Starts "And I should mention one more thing in here. We call this part semi-complicado" @315.76 — marker within 0.8s, excellent |
| `c17-angle-jlc` | 443.0 | 493.0 | `angle` | Juana la Cubana - side view | `juana-la-cubana` | "Let's do the same thing. I'm in Juana la Cubana opposite direction." @443.32 — marker within 0.4s |
| `c17-music-jlc` | 493.0 | 536.0 | `music` | Juana la Cubana - with music | `juana-la-cubana` | announced @487.92 "we'll go with music and we'll do a couple of combinations" |
| `c17-music-jlc-side` | 536.0 | 594.0 | `music` | Juana la Cubana - with music (side view) | `juana-la-cubana` | "We'll do it first opposite angle and then we'll do combos." @534.88, 1.1s before the marker |
| `c17-review-combos` | 594.0 | 710.0 | `music` | Review and combos - with music | both | `reviewsEarlierMoves: true`. The richest combo section in the range — see 17.3 |
| `c17-outro` | 710.0 | 827.0 | `skip` | Summary / Outro | — | opens with the "learning moves is like learning vocabulary" analogy @710.46 |

`c17-count-jlc` gets `confidence: 'transcript'` (**not** `'suspect'`) with a
`warning`: "Chapter is 123s but the counted demo is 195.50–236.60. From 'Stop
here for a moment' @236.86 the rest is the loop/combination discussion, which is
still about this move but is not a demo." This is a milder version of K16-a: the
chapter is not *wrong*, it just contains more than its title says, and the demo it
promises really is at its head.

## 17.3 Clip windows

### `juana-la-cubana` · slow — **A**

| | |
|---|---|
| `src` | `/clips/salsa/couples/juana-la-cubana-slow.mp4` |
| `sourceVideo` | `uoq2J1txSTE` |
| `start` | **195.20** |
| `end` | **236.76** |
| length | 41.56s |
| `aspect` | `'16/9'` |
| `confidence` | `'transcript'` |

- Announced immediately before the window: "We'll do it slowly again but more
  fluently." @192.86–194.48.
- Start anchor: `Five[195.50] Hwana[195.74] la[196.28] Cubana,[196.60]`. 195.20
  sits in the 0.7s gap after "fluently." @194.48.
- End anchor: `six.[236.60]`, then `Stop[236.86] here[237.06] for[237.30]
  a[237.54] moment.[237.70]`. 236.76 is inside that 0.26s gap.
- Two complete counted runs, with "Let's do it again" @216.22 between them.
- `caveat`: "Two runs with a 0.7s 'Let's do it again' between them. Counting only
  — the move name is called at the top of each run and nothing else is narrated."

### `juana-la-cubana` · fast — **V** (published)

`src` `/clips/salsa/couples/juana-la-cubana-fast.mp4` · `sourceVideo`
`B5A2kgjTvnw` · `start` **0.0** · `end` **47.0** · `aspect` `'9/16'` ·
`confidence` `'transcript'` · whole short, container duration 47s · `caveat` as
standing caveat 3.

### `juana-la-cubana` · fast, alternate — **A**

| | |
|---|---|
| `sourceVideo` | `uoq2J1txSTE` |
| `start` | **493.90** |
| `end` | **534.20** |
| length | 40.30s |
| `aspect` | `'16/9'` |
| `label` | `'Full tempo (in class)'` |

- Start anchor: `Five[493.98] six[494.40] seven[494.82]` — the count-in over the
  music. 493.90 sits just before it.
- End anchor: `Tic[531.98] Tocco[532.66] and[533.14] one.[533.48]` is the last
  call; `We'll[534.88] do[535.56] it[535.74] first[535.90] opposite[536.24]
  angle[536.72]` follows. 534.20 is in the gap.
- `caveat`: "The teachers call '6 7 and 1' over the music for the whole clip.
  Whisper produced almost nothing but bare counts here, which is itself evidence
  that this is a demo rather than an explanation."

### `el-uno-semi-complicado` · slow — **D / V** (published, short)

| | |
|---|---|
| `src` | `/clips/salsa/couples/el-uno-semi-complicado-slow.mp4` |
| `sourceVideo` | `uoq2J1txSTE` |
| `start` | **366.16** |
| `end` | **383.00** |
| length | **16.84s** |
| `aspect` | `'16/9'` |
| `confidence` | `'transcript'` |

- Start anchor: `Five,[366.16]` — the count-in directly after "and this is
  semi-complicado" @364.72–365.34.
- End anchor: `five.[382.70]`, then `And[383.00] I[383.06] could[383.20]
  call[383.40]`. 383.00 is exactly on "And".
- `caveat`: "16.8s — **below the 20s floor**, and the middle ~7s (371.18–378.62)
  is the teacher standing still saying 'in here my hand is already on top, so this
  one extra turn is making the difference'. It is nonetheless the **only** window
  in the course where this move is shown on its own. Accepted deliberately: a
  short honest isolated demo beats a long clip of the wrong thing."
- This is the same judgement `SALSA_VERIFICATION_LOG.md` §3 records for
  `cross-front-and-back-fast` (17.2s, under the floor, shipped anyway).

### `el-uno-semi-complicado` · slow, alternate — **A**

| | |
|---|---|
| `sourceVideo` | `uoq2J1txSTE` |
| `start` | **392.20** |
| `end` | **424.60** |
| length | 32.40s |
| `aspect` | `'16/9'` |
| `label` | `'Slow, in combination'` |

- Start anchor: `six,[392.28] seven,[392.72] fluently.[393.16] El[393.98]
  uno[394.08] semi[394.30] -complicado.[394.60]` — the teachers announce
  "fluently" and name the move. 392.20 sits just before "six".
- End anchor: `boom![424.28]`, then `And[425.04] this[425.36] is[425.62]
  how[425.78] it[425.94] works.[426.14]`. 424.60 is in the gap.
- Counted, no music. Contains **El uno semi-complicado @393.98 → complicado doble
  @401.98 → another semi-complicato @408.98 → Juana la Cubana @411.80**, i.e. the
  whole point of the move (chaining) rather than the move alone.
- `caveat`: "A four-move chain, not an isolated demo. Use it to see what the
  extra turn is *for*; use the 16.8s window to see the turn itself."

### `el-uno-semi-complicado` · fast — **D / V** (published, caveated hard)

| | |
|---|---|
| `src` | `/clips/salsa/couples/el-uno-semi-complicado-fast.mp4` |
| `sourceVideo` | `uoq2J1txSTE` |
| `start` | **594.30** |
| `end` | **609.50** |
| length | 15.20s |
| `aspect` | `'16/9'` |
| `confidence` | `'transcript'` |

- Start anchor: `One,[594.52] five,[595.62] six,[596.52] seven[596.86]
  and[597.08] sombrero[597.40] complicado[597.98] doble.[598.44]` — 594.30 sits
  just before "One".
- End anchor: `One[609.70] a[610.34] la[610.50] cubana,[610.58]` — the next move
  is called. 609.50 is in the 1.0s gap after "extra turn." @608.18.
- Contains: Sombrero complicado doble @597.40, then **"semi-complicado extra
  turn" @606.80–608.18**.
- `caveat`: "**Not an isolated demo.** 15.2s inside a longer combo, and the first
  ~8s is Sombrero complicado doble. The semi-complicado itself is roughly
  602–609. There is no full-tempo window anywhere in the course that shows this
  move alone — the official short for Class 17 is Juana la Cubana."
- Second-best alternative, kept as an unpublished review alternate: **674.50 →
  685.60** (11.1s), anchored on `el[676.62] uno[676.80] semi[677.02]
  complicado,[677.42]` … "extra turn in the end" @682.90, ending before
  `Alright,[685.62] previous[686.76] class.[687.18]`. Shorter but the move is
  named more clearly.

## 17.4 Lead cues — `juana-la-cubana`

All `sourceVideo: 'uoq2J1txSTE'`, `confidence: 'transcript'` unless stated.

| `id` | `beat` | `role` | `kind` | `text` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|
| `jlc-based-on-sombrero` | — | `both` | `concept` | This is Sombrero with a different arrangement. | 48.90 | "It is another move that is based on sombrero." |
| `jlc-entry-guapea` | — | `leader` | `lead` | Enter from Guapea, going back. | 88.28 | "Let's start with Guapea back." |
| `jlc-begins-like-sombrero` | — | `leader` | `concept` | The opening is Sombrero, and you stop where Sombrero complicado doble stops: both hands on shoulders. | 95.22 | "the beginning is exactly like sombrero and we stop like we stopped in sombrero complica de doble with hands on shoulders" |
| `jlc-no-swap-no-release` | — | `leader` | `lead` | Dile que no without swapping and without releasing the hands. | 102.24 | "We are not swapping anything, we are just doing D, le cano, but we are not releasing hands." |
| `jlc-left-on-left-shoulder` | — | `leader` | `lead` | Once she goes left, complete the Dile que no and land the left hand on the left shoulder. | 113.74 | "once she goes to the left, full de le cano and then a left hand lands on the left shoulder" |
| `jlc-right-between-us` | — | `leader` | `lead` | The right hand stays connected, between the two of you. | 116.28 | "right stays connected in between us" |
| `jlc-right-to-right` | — | `both` | `lead` | Still right to right, left to left — the typical Sombrero setup. | 118.40 | "and we are still right to the right, left to the left. Typical sombrero setup." |
| `jlc-twist-wrist-behind-back` | — | `leader` | `lead` | Twist the wrist and go behind her back, into El Uno. | 123.42 | "Now I'll start twisting the wrist and I go behind her back to Eluno." |
| `jlc-follower-back-right` | 5 | `follower` | `footwork` | She goes back with the right. | 128.26 | "she goes back with the right" |
| `jlc-leader-back-left` | 5 | `leader` | `footwork` | You go back with the left, as in El Uno. | 130.44 | "I go back with the left like Eluno" |
| `jlc-hands-down` | 5 | `leader` | `lead` | Hands down. | 132.66 | "hands down five, six, seven" |
| `jlc-shoulder-hand-stays-up` | — | `leader` | `lead` | The hand that was on the shoulder stays up; the other one bends. | 136.90 | "but this hand was on the shoulder so it was up, second one did bend" |
| `jlc-another-enchufla` | — | `leader` | `lead` | After another Enchufla, put that hand behind your back. | 142.00 | "and now I put it behind my back after another Enchufla" |
| `jlc-left-behind-own-back` | — | `leader` | `lead` | Left hand behind your own back. | 148.72 | "So left hand is behind my back" |
| `jlc-right-bent-behind-her` | — | `leader` | `lead` | Right hand bent behind her. | 150.22 | "right one is bent behind her" |
| `jlc-finish-exhibela` | — | `leader` | `lead` | Finish it off with Exhibela. | 152.56 | "We finish everything off with Exhibela." |
| `jlc-follower-exhibela-right-back` | 5 | `follower` | `footwork` | She starts back with the right. | 155.74 | "So she starts with the right back" |
| `jlc-leader-step-left-front` | 5 | `leader` | `footwork` | You go with the left, towards the front. | 157.16 | "I go with the left towards the front camera" |
| `jlc-finish-both-shoulders` | — | `leader` | `lead` | Both hands land on shoulders again. | 164.08 | "and now both hands on shoulders. And again we finish with both hands and shoulders." |
| `jlc-sombrero-not-el-uno-hold` | — | `leader` | `concept` | Last class finished in the El Uno hold; this one finishes in the Sombrero hold — your hand on top. | 170.08 | "you remember the last class, I told you that we were in a luno setup. Now we are in sombrero setup, so my hand is on top." |
| `jlc-follower-free-hand-out` | — | `follower` | `lead` | When he releases, she has to get her free hand out. | 180.58 | "When I release them, Ola has to get out her free hand." |
| `jlc-can-loop` | — | `leader` | `concept` | Because you finish in the Sombrero setup you can call another Juana la Cubana straight away — it loops. | 239.50 | "because I told you that this is sombrero like setup, I could call another Juana la Cubana straight away … you could have infinite Juana la Cubana loop" |
| `jlc-chain-into-scd` | — | `leader` | `concept` | It also chains straight into Sombrero complicado doble. | 268.92 | "You could combine Juana la Cubana with Sombrero Complicado doble like this." |
| `jlc-mix-and-match` | — | `both` | `concept` | You do not have to stop and restart between moves. | 299.20 | "this is the cool part about dancing salsa. You can easily mix and match moves. You don't have to always stop, come back to the guapilla, do a couple of basic steps, and then continue." |

24 cues; **14 are `kind: 'lead'`**.

`jlc-no-swap-no-release` is the differentiator between this move and Class 16's
and the teachers repeat it over the music at @577.36 ("don't swap don't
release") — a second, independent source for the same cue. That repetition is
recorded here rather than as a duplicate cue.

## 17.5 Lead cues — `el-uno-semi-complicado`

| `id` | `beat` | `role` | `kind` | `text` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|
| `esc-what-it-is` | — | `both` | `concept` | Semi complicado is the transition between El Uno hands and Sombrero hands. | 319.82 | "We call this part semi-complicado and it's basically transition between Eluno like hands and sombrero like hands." |
| `esc-follower-hand-top` | — | `follower` | `lead` | Coming out of El Uno her hand is on top. | 343.36 | "And now her hand is on top" |
| `esc-leader-hand-bottom` | — | `leader` | `lead` | Yours is underneath — the regular basic setup. | 344.48 | "mine is on the bottom. This is regular basic setup." |
| `esc-want-it-opposite` | — | `leader` | `concept` | You want it the other way round: your hand on top. | 347.92 | "Now I would like it opposite. So mine on top, her on bottom." |
| `esc-one-exhibela-turn` | — | `leader` | `lead` | Lead one single Exhibela turn — that is all it takes. | 351.66 | "What do I have to do? Only one single Exhibela turn for Ola" |
| `esc-same-as-jlc-finish` | — | `leader` | `concept` | It is the same turn that finishes Juana la Cubana. | 356.28 | "it is very similar turn to the one that is finishes Juana la Cubana" |
| `esc-left-in-front-of-face` | — | `leader` | `lead` | Left hand in front of her face. | 360.66 | "So left hand in front of her face" |
| `esc-follower-right-back` | 5 | `follower` | `footwork` | She starts back with the right. | 362.98 | "she starts with the right back" |
| `esc-extra-turn-is-the-move` | — | `leader` | `concept` | That one extra turn is the whole move. | 373.80 | "So this one extra turn is making the difference." |
| `esc-hand-now-on-top` | — | `leader` | `lead` | After the turn your hand is already on top. | 371.18 | "And in here my hand is already on top." |
| `esc-then-call-anything` | — | `leader` | `concept` | From there call anything in the Sombrero family — complicado doble, for instance. | 383.00 | "And I could call for example with complicato doble now." |

11 cues; **5 are `kind: 'lead'`**. Thin by design: the move *is* one turn, and
inflating it would mean inventing.

## 17.6 Known defects

| Flag | What | What to do |
|---|---|---|
| **K17-a** | **The class teaches two moves and almost nothing says so.** Title, short and 8 of 10 chapter titles name only Juana la Cubana. Only the description's move list and chapter 5's title ("Semi complicado part") reveal the second. | Both moves are indexed above. Any regenerated `couples_analysis.md` must keep listing description moves separately from chapter titles, or this is silently lost. |
| **K17-b** | `jlc-left-on-left-shoulder`: "a left hand lands on the left shoulder" never says whose left hand or whose left shoulder. | Cue is `role: 'leader'` because he is describing his own action, but add `warning: "Transcript does not say whose left shoulder — check 110–121 by eye"`. Do not guess. Same class of problem as K16-c. |
| **K17-c** | `jlc-shoulder-hand-stays-up`: "**this** hand was on the shoulder" is deictic. Which hand is only recoverable by watching. | Cue is written in the general form the words support ("the hand that was on the shoulder"). Add `warning`. Resolve by watching 135–148. |
| **K17-d** | The extra turn in semi complicado has **no beat**. The teachers count "one, two **and** turn" @368.00–368.88, which reads as an "and" between beats, not a beat. | Leave `beat` unset on `esc-one-exhibela-turn` and `esc-extra-turn-is-the-move`. Resolve by watching 366–371 and counting. Setting `beat: 3` is the tempting guess and is exactly what R3 forbids. |
| **K17-e** | `(El uno) semi complicado` has **no isolated full-tempo window anywhere in the course** and its slow window is 16.8s with a 7s pause in the middle. | `complete: false`, with both grains shipped and caveated rather than hidden. Best fix: cut a purpose-made clip once the video is downloaded, or ask nothing more of it — it is a transition, and a transition arguably has no isolated form. Document the choice either way; do not flip `complete` to `true` without adding a real clip. |
| **K17-f** | Manglings uncaught by the normaliser in this class: `di le cano` @58.02 / `D, le cano` @105.10 / `de le cano` @112.76 / `D leg and a` @212.68 / `Ilekeno` @660 (*Dile que no*); `Eluno` @127.72 / @132.10 / @325.86, `a luno` @175.96 / @457.66 (*El uno*); `guapilla` @308.34 (*Guapea*); `complica de doble` @99.60 (*complicado doble*); `exibe-la` @617.08 (*Exhibela*); `va-si-la-la, los dos` @623.94 (*Vacilala los dos*); `passe-la` @620.32 / `passe alla` @667.90 (*Paseala*); `Otra` @656.54 (probably the Spanish *otra*, "another", not a mangling — leave it). | Fold the confirmed ones into `scripts/normalize_salsa_terms.py`'s `ALIASES` and into the owning move's `aliases`. Ownership: `dile-que-no` and `guapea` are Part 1; `el-uno` Part 1; `exhibela`, `paseala`, `vacilala-los-dos` Parts 1–2. **Do not add them here** — coordinate, or the same alias lands twice. |
| **K17-g** | `c17-review-combos` (594–710) is the densest material in the range: seven named moves called in sequence with music. It is not a clip for any single move. | Do not cut a clip from it. It is, however, an excellent candidate for a **second call sheet** alongside Class 21's — the calls are there (`sombrero complicado doble` @597.40, `semi-complicado extra turn` @606.80, `One a la cubana` @609.70, `exibe-la` @617.08, `passe-la` @620.32, `va-si-la-la, los dos` @623.94, `coca-cola` @628.52, `Kentucky` @646, `Exhibela` @653.68, `Ilekeno`/`Enchufla Doble` @660.48, `Alarde` @662.66, `setenta` @692.62). Raised as a proposal, not built: the plan only specifies a call sheet for Class 21. |
| **K17-h** | The short `B5A2kgjTvnw` is untranscribed **and** covers only one of the two moves. | As K15-f, plus: never point `el-uno-semi-complicado` at this short. |

---

# Class 18 — Dedo

| | |
|---|---|
| Video | `97Urh5GlCbg` · 681s · 9 chapters |
| Short | `TM9kP4jy0To` · 38s · 1080x1920 |
| Description move list | `Dedo` |
| `chaptered` | `true` |
| `teaches` | `['dedo']` |

## 18.1 Move index

### `dedo`

| Field | Value |
|---|---|
| `id` | `dedo` |
| `name` | `Dedo` |
| `kind` | `turn` |
| `base` | `sombrero` |
| `composedOf` | `['guapea', 'sombrero', 'dile-que-no', 'enchufla', 'alarde', 'hook-turn']` |
| `complete` | `true` |

`aliases`: `['Dedo', 'dedo', 'dead o', 'Dado']`

*Provenance:* `dead o` @350.44, `Dado` @405.84. Only two manglings — the teachers
say "dedo" cleanly 12 times.

`base` is sourced: @106.62 "we start like sombrero **but we give one hand only**
and this is the main part", reinforced @419.04 "dedo like sombrero".

`summary`: "Sombrero with only one hand given. The leader changes his grip so his
palm comes from on top, presses so she rotates right for three steps while he
travels three steps to his own right — the two of them swap places — then he lets
her in front, back-open-hook-turn, and finishes with Enchufla Alarde."

`footwork`: "Start like Sombrero but offer only the right hand; it finishes on her
shoulder and the second hand is never caught. Her right is her leading hand, so
she can complete the full turn on it. The leader then changes grip — palm over the
top — and presses, and she rotates to the right for three steps. At the same time
he takes three steps to his own right, which is what makes the couple swap places.
She ends on his left side and slightly behind him, so he has to let her come in
front: back, open, hook turn on 5-6-7. Finish with Enchufla Alarde — the usual
Alarde, then Dile que no."

`notes`:
- **Where the name comes from, and why it is the pinky.** "dedo is obviously
  finger so we show the pinky because it could suggest otherwise that this is
  eluno so it's finger as well but this means one so then eldo should be with two
  fingers but for dedo we show pinky." — @138.28–152.88. So: *dedo* = finger, and
  the hand signal is the **little finger**, because the index finger is already
  taken by El Uno meaning "one". This is a rare piece of explicit signal
  vocabulary and it belongs on the page. (`eldo` @149.78 is probably Whisper on
  *el dos* — "two" — but that is a guess, see K18-e.)
- **Why it is socially useful.** "there is this one moment when the girl is
  rotating to the right and we are swapping places and this is something that you
  might find very very useful while dancing socially as couples." — @126.48.
- **What it leads into.** "You could do Exhibela, you could do Paseala …
  everything what we showed you before, after Enchufla Alarde works." — @272.16.
- **An intermediate move starts the same way.** "We did some intermediate moves
  that start like dedo, like, for example, Gota de la Sombra. That was a funky one
  with a dip." — @288.78. **`Gota de la Sombra` must NOT enter the move index** —
  it is not taught in this course. Keep it as a note only (see K18-f).

## 18.2 Segment map

| `id` | start | end | `role` | `label` | `moves` | notes |
|---|---|---|---|---|---|---|
| `c18-intro` | 0.0 | 18.0 | `skip` | Intro | — | |
| `c18-about` | 18.0 | 100.0 | `skip` | About this class | — | contains a usable context line @92.26 about what "moves like dedo" usually means |
| `c18-teach` | 100.0 | 223.0 | `teach` | Dedo - presentation & explanation | `dedo` | "So maybe first we'll show you how dedo works." @100.38 — **marker within 0.4s** |
| `c18-count` | 223.0 | 298.0 | `count` | Dedo - fluently with count | `dedo` | "We'll do the same again super slowly but fluently" @223.78 — **marker within 0.8s.** But see K18-a: the last ~32s of the chapter is talking |
| `c18-angle` | 298.0 | 343.0 | `angle` | Dedo - side view | `dedo` | "Before we dance with music, we'll do it opposite direction." @299.62; contains two more slow runs, incl. one announced "the same pitch slower" @319.54 |
| `c18-music` | 343.0 | 401.0 | `music` | Dedo - with music | `dedo` | "and music now" @341.96, 1.0s before the marker |
| `c18-music-side` | 401.0 | 436.0 | `music` | Dedo - with music (side view) | `dedo` | "opposite direction" @399.50, 1.5s before the marker |
| `c18-review-combos` | 436.0 | 504.0 | `music` | Review and combos - with music | `dedo` | `reviewsEarlierMoves: true`. The marker at 436.0 falls *inside* a spoken phrase (segment 432.64–438.42, "D-Lek and a one Coca-Cola") — cosmetic, affects no clip |
| `c18-outro` | 504.0 | 681.0 | `skip` | Summary / Outro | — | 177s, the longest outro in the range |

All nine at `confidence: 'transcript'`. This is the **best-chaptered class in the
range** — three markers land within a second of the spoken transition. Nothing is
mislabelled.

## 18.3 Clip windows

### `dedo` · slow — **A**

| | |
|---|---|
| `src` | `/clips/salsa/couples/dedo-slow.mp4` |
| `sourceVideo` | `97Urh5GlCbg` |
| `start` | **227.90** |
| `end` | **265.90** |
| length | 38.00s |
| `aspect` | `'16/9'` |
| `confidence` | `'transcript'` |

- Announced immediately before: "We'll do the same again super slowly but
  fluently" @223.78–227.18.
- Start anchor: `1[228.00] dedo[228.66] hop[229.78] and[230.40] go[231.08]`.
  227.90 sits in the 0.8s gap after "fluently" @227.18.
- End anchor: `ti[265.56] -pa.[265.64]`, then `Because[266.06] we[266.54]
  landed[266.68]`. 265.90 is in that gap.
- `caveat`: "Three runs. The first two (228.00–254.90) are counted in numbers; the
  third (255.68–265.64) is counted in rhythm sounds — 'King, king, pa, ti-ting,
  ti-ta'. That is the teachers vocalising the rhythm, not speech, and it is
  perfectly usable to dance to; it is only unusable as a *cue* source."
- Unpublished review alternate, if the vocalised run is unwanted: **227.90 →
  255.30** (27.40s, pure numeric counting, end anchored on `seven.[254.90]` before
  `King,[255.68]`).

### `dedo` · slow, alternates (both anchored, both `angle` chapter)

| window | length | anchor | note |
|---|---|---|---|
| **302.60 → 319.40** | 16.80s | `5[302.70] 6[304.06] 7[304.54] 1[305.04] 2[305.68] dedo[306.12]` → `time[319.14]` in "and one more time" | Opposite direction. Under the floor. |
| **321.40 → 341.10** | 19.70s | announced "one more time the same **pitch slower**" @319.54; `1[321.52] 2[322.34] dedo[322.78] hop[323.50] let's[324.20] go[324.78]` → `5[341.16]` before `and[341.46] music[341.96] now[342.36]` | Explicitly the slowest run in the class. Just under the floor. |

Neither is published: both are shorter than the primary and neither adds a camera
angle the primary lacks in a way that justifies a second file.

### `dedo` · fast — **V** (published)

`src` `/clips/salsa/couples/dedo-fast.mp4` · `sourceVideo` `TM9kP4jy0To` ·
`start` **0.0** · `end` **38.0** · `aspect` `'9/16'` ·
`confidence` `'transcript'` · whole short, container duration 38s · `caveat` as
standing caveat 3.

### `dedo` · fast, alternate — **A**

| | |
|---|---|
| `sourceVideo` | `97Urh5GlCbg` |
| `start` | **343.60** |
| `end` | **383.20** |
| length | 39.60s |
| `aspect` | `'16/9'` |
| `label` | `'Full tempo (in class)'` |

- Start anchor: `1[343.74] 3[344.58] 5[345.28] 7[346.04]` — the count-in over the
  music, directly after "and music now" @341.96–342.36. 343.60 sits between them.
- End anchor: `three,[382.92]`, then `and[383.24] one,[395.46]`. 383.20 is in the
  gap.
- **Contains an 11.4s stretch with no transcript at all (366.04 → 377.42.)** That
  silence is the single strongest available evidence of a genuinely silent
  full-tempo demo anywhere in this range — Whisper found no speech to transcribe.
- `caveat`: "First ~22s has the teachers calling and vocalising over the music
  ('King King Fa', 'Chick Chick'); 366–377 is silent dancing."

### Rejected

- `c18-music-side` 401.0 → 436.0 — 35s, but from @405.84 it is pure rhythm
  vocalisation ("tick tick bam, tick tick hop" x6) and the marker cuts a phrase.
  Unpublished alternate.
- `c18-count` 266.06 → 298.0 — the continuations / Gota de la Sombra digression.
  `notes` material, not a clip (K18-a).
- `c18-review-combos` 436.0 → 504.0 — Coca-Cola, Dile que no and others mixed in.

## 18.4 Lead cues

All `sourceVideo: '97Urh5GlCbg'`, `confidence: 'transcript'` unless stated.

| `id` | `beat` | `role` | `kind` | `text` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|
| `dedo-what-people-mean` | — | `both` | `context` | When people say "dedo" socially they usually mean just the first part of it. | 92.26 | "Usually what people mean by moves like dedo is something that includes the very first part of it." |
| `dedo-one-hand-only` | — | `leader` | `lead` | Start like Sombrero but give **one** hand only — that is the whole move. | 106.62 | "we start like sombrero but we give one hand only and this is the main part" |
| `dedo-extra-turn-push` | — | `leader` | `lead` | Then an extra turn, led by a push — this is the tricky bit. | 111.20 | "Then we start with extra turn and this push will be quite tricky" |
| `dedo-finish-enchufla-alarde` | — | `leader` | `lead` | Finish with Enchufla Alarde. | 115.82 | "and then we finish with an Enchufla lard" |
| `dedo-swap-places` | — | `both` | `concept` | The useful moment is where she rotates right and the two of you swap places. | 126.48 | "there is this one moment when the girl is rotating to the right and we are swapping places and this is something that you might find very very useful while dancing socially as couples." |
| `dedo-signal-pinky` | — | `leader` | `lead` | Signal it with the little finger — the index finger already means El Uno. | 138.28 | "dedo is obviously finger so we show the pinky because it could suggest otherwise that this is eluno so it's finger as well but this means one … but for dedo we show pinky" |
| `dedo-right-on-shoulder` | — | `leader` | `lead` | Your right hand finishes on her shoulder. | 162.70 | "We finish with the right hand on shoulder." |
| `dedo-never-catch-second` | — | `leader` | `lead` | Never catch the second hand — Sombrero does, Dedo does not. | 164.90 | "We didn't offer the second one. In sombrero we'll catch the second hand. In here we continue only with one." |
| `dedo-her-right-is-leading` | — | `follower` | `concept` | Her right is her leading hand, so she can complete the full turn on it. | 171.38 | "Because this is the leading hand from girl perspective, the right one, she has no problems to complete the full turn." |
| `dedo-change-grip-palm-on-top` | — | `leader` | `lead` | Change your grip so your palm comes from on top. | 177.24 | "Now I have to change my grip so my palm for the next section will go from top" |
| `dedo-press-to-turn-her` | — | `leader` | `lead` | Press down on it so she feels she has to rotate to the right. | 183.48 | "and then I will start pressing on it so she feels she has to rotate to the right" |
| `dedo-follower-three-steps-right` | — | `follower` | `footwork` | She rotates to the right over three steps. | 187.96 | "She rotates to the right after three steps." |
| `dedo-leader-three-steps-right` | — | `leader` | `footwork` | At the same time you take three steps to **your** right. | 197.94 | "At the same time I'm going three steps to my right." |
| `dedo-let-her-in-front` | — | `leader` | `lead` | She ends on your left and slightly behind, so let her come in front of you. | 201.98 | "She's on the left side, a bit behind me, so now I have to let her in front of me." |
| `dedo-back-open-hook` | 5 | `leader` | `footwork` | Back, open, hook turn. | 207.68 | "Back and open hook turn, 5,6,7." |
| `dedo-typical-alarde-then-dqn` | — | `leader` | `lead` | The usual Alarde, then Dile que no. | 212.30 | "So we finish with Enchufla Alarde. Typical Alarde after grip and D-Lekano" |
| `dedo-continuations` | — | `leader` | `concept` | You land somewhere everything already works from — Exhibela, Paseala, anything after Enchufla Alarde. | 272.16 | "You could do Exhibela, you could do Paseala. everything what we showed you before, after Enchufla Alarde works." |

17 cues; **10 are `kind: 'lead'`**.

`dedo-change-grip-palm-on-top` and `dedo-press-to-turn-her` are the two best cues
in this entire range for R3's purpose. They are exactly the charter's complaint
made good: *"the hardest part of Cuban salsa for a leader is not the footwork —
it's the hand: which hand, which beat, how high, how much tension. These cues are
said once, in passing, inside a long explanation, and then never repeated."* Both
are said once, at @177.24 and @183.48, and never again in the class.

## 18.5 Known defects

| Flag | What | What to do |
|---|---|---|
| **K18-a** | `c18-count` is 75s but the demo is 228.00–265.64. From "Because we landed in this position" @266.06 to the end of the chapter the teachers are talking about continuations and about *Gota de la Sombra*. | Segment stays `confidence: 'transcript'` with a `warning` naming the demo window. The slow clip is anchored to the demo, not the chapter. Much milder than K16-a — the chapter's promise is kept, it just runs on. |
| **K18-b** | `dedo-back-open-hook`: "Back and open hook turn" does not parse unambiguously — it could be "back, and open, hook turn" or "back, and open-hook turn". | Cue text uses the three-action reading, verbatim preserved. Add `warning`. Resolve by watching 205–212. Note the steps course has a `hook-turn` move; if this is that move, add the `composedOf` edge — currently included on the strength of the words alone. |
| **K18-c** | The press has no `beat`. The count around it is "5,6, D-Lekano, 1,2, press and 5,6,7" (@191.02–196.94), which puts "press" between 2 and 5 — most likely 3, but "most likely" is a guess. | Leave `beat` unset on `dedo-press-to-turn-her`. Resolve by watching 190–200. This is the single most valuable `beat` to resolve in the class, because the whole move hangs off the timing of that press. |
| **K18-d** | `Enchufla lard` @116.52 (*Enchufla Alarde*), `D-Lekano` @192.34 / `D leg arrow` @279.06 / `D-Lek and a` @430.82 (*Dile que no*), `D like an O` @396.70, `dead o` @350.44 and `Dado` @405.84 (*dedo*). | `dead o` and `Dado` go in this move's `aliases` (done). The rest belong to `alarde` and `dile-que-no` — Parts 1–2. Add all to the normaliser. |
| **K18-e** | @149.78 "so then **eldo** should be with two fingers". `eldo` is not a word and is not in the description or any chapter title. It is *probably* Whisper on *el dos*, which would make the sentence "then **el dos** should be with two fingers" and complete the finger-counting logic. | **Do not add `el dos` to the index.** It is not in any description's move list, so per R1 and the non-goals it is not a move in this tab. Keep the verbatim in the `notes` entry, and resolve by listening to 147–153. If the teachers do name *el dos* as a move elsewhere in the course, that is Parts 1–2's call, not this file's. |
| **K18-f** | *Gota de la Sombra* @293.08 is named on camera as an **intermediate** move that starts like Dedo. | Keep as a `notes` line only. It must not become a `SalsaMove` — the charter's scope is beginner, and the non-goals say "Not intermediate, rueda, or bachata — yet." Structuring for it later is fine; indexing it now is scope creep. |
| **K18-g** | The short `TM9kP4jy0To` is untranscribed. | As K15-f. |

---

# Class 19 — Santiago

| | |
|---|---|
| Video | `M3J7w59rXTE` · 872s · 9 chapters |
| Short | `vlSqi-msy60` · 46s · 1080x1920 |
| Description move list | `Santiago` |
| `chaptered` | `true` |
| `teaches` | `['santiago']` |

**The longest `teach` block in the range** (285s, chapter 3) and the densest in
lead detail. It is also the class where the teachers change the syllabus:
*"this is the first move when we encourage you our students to try to walk forward
while dancing"* @146.74.

## 19.1 Move index

### `santiago`

| Field | Value |
|---|---|
| `id` | `santiago` |
| `name` | `Santiago` |
| `kind` | `turn` |
| `base` | `setenta` |
| `composedOf` | `['guapea', 'setenta', 'enchufla', 'hook-turn', 'dile-que-no']` |
| `complete` | `true` |

`aliases`: `['Santiago', 'santiago']`

*Provenance:* **no manglings.** Whisper gets "Santiago" right all 20 times it
occurs — the only move in this range with a clean alias list. It is a common
Spanish place name, so this is unsurprising, and it is worth recording as a
negative result: the alias list is short because the audio is clear, not because
it was under-researched.

`base` is sourced twice: @108.36 "The few last moves were sombrero based and
**Santiago is based on 70**" and again over the music @545.56 "Santiago like 70".
(`70` is how the teachers say *Setenta*.)

`summary`: "Setenta that keeps walking forward instead of stepping back. Three
sections of forward walking, the follower rotating right after every three steps
and the leader alternating left-right-left, with the leader's back hand raised
into a tunnel she walks under — out through Enchufla and a hook turn into Dile que
no."

`footwork`: "Enter from Guapea with steps back, then continue like Setenta —
still stepping back, but on 1-2 you keep walking. Another step back for both:
she goes back on the right, he goes back on the left, and they swap places. Then
the game changes — he goes forward on the right, she goes forward on the left, and
they rotate towards each other: she to her right, he to his left. Facing each
other, his left is open to the left and his right is behind his back; under his
left arm he makes a tunnel and she walks forward under it, starting on the right
foot, while he walks forward on the left. The hand behind his back has to start
rising early. They rotate again — this time both to the right — and the hand
connection sits between them at the level of her neck for a third forward walk.
From the follower's side it is: rotate right after every three steps, every single
time. From the leader's: left, right, then left again. Finish with both hands
connected: both hands up, right on the shoulder, hook turn, Dile que no. After
three sections of walking forward the continuation is an Enchufla, stepping back."

`notes`:
- **The leading is deliberately not fully taught.** "We didn't get into really
  depth of leading of Santiago. There are these moments when we have to pull with
  back hands, but for now I would like you to concentrate mainly on your own
  steps." — @684.88–697.88. And: "When we did the side view I shouted at some
  point, pull, pull! And there are moments when you actually have to do that and I
  imagine that this is one of the missing elements when we are comparing live
  classes…" — @699.40–712.04. **This is the teachers saying, on camera, that the
  lead cues for this move are incomplete.** Surface it on the page next to the
  cues; it is the honest frame for them.
- **A rule of thumb about failure**, worth quoting whole: "when we start walking
  and her elbow bends up, it's perfect. But when we start walking and her elbow
  starts bending opposite direction, then it's basically game over. We'll not be
  able to complete Santiago. It is still genuine salsa move, just not Santiago." —
  @286.14–301.86.
- **An unverified aside about method.** @167.74 "There is this MCC method very
  popular recently when they are dancing without stepping back completely. I don't
  fully like this method because again dance should be very flexible … sometimes
  step back is just necessary." `MCC` is an acronym Whisper produced and it is not
  in any description or chapter title. Kept verbatim as a note, **not** as a cue,
  and not resolved — see K19-e.

## 19.2 Segment map

| `id` | start | end | `role` | `label` | `moves` | notes |
|---|---|---|---|---|---|---|
| `c19-intro` | 0.0 | 18.0 | `skip` | Intro | — | 40% count density — cold-open dance clip |
| `c19-about` | 18.0 | 116.0 | `skip` | About this class | — | contains the `base: setenta` statement @108.36, which is why cue `santiago-based-on-setenta` sources from a `skip` chapter |
| `c19-teach` | 116.0 | 401.0 | `teach` | Santiago - presentation & explanation | `santiago` | "But we'll show you first how it works as a whole move." @115.84 — **marker within 0.2s** |
| `c19-count` | 401.0 | 450.0 | `count` | Santiago - fluently with count | `santiago` | **`confidence: 'suspect'`, see K19-a.** `warning`: "Only 403.84–433.10 is slow. At 433.20 the teacher says 'One more time **full tempo**' and the rest of the chapter is at tempo." |
| `c19-angle` | 450.0 | 498.0 | `angle` | Santiago - side view | `santiago` | "another way" @451.44, 1.4s after the marker; the run itself is full tempo, not counted |
| `c19-music` | 498.0 | 541.0 | `music` | Santiago - with music | `santiago` | starts after 1.9s of silence (nothing transcribed 497.02–498.96) |
| `c19-music-side` | 541.0 | 581.0 | `music` | Santiago - with music (side view) | `santiago` | **8% count density — the lowest of any segment in this range.** The marker falls inside a spoken phrase (539.28–543.06); the real transition is "Same again we go, Santiago like 70" @544.04. Contains the pull sequence, see 19.4 |
| `c19-review-combos` | 581.0 | 686.0 | `music` | Review and combos - with music | `santiago` | `reviewsEarlierMoves: true`. The word "review" is spoken at @581.20 — **marker within 0.2s**, the tightest in the range |
| `c19-outro` | 686.0 | 872.0 | `skip` | Summary / Outro | — | 186s. **Do not treat as skippable** — it contains the "we didn't get into depth of leading" admission @687.30 and the leader/follower feel discussion 728–759 |

Eight at `transcript`; **`c19-count` is `'suspect'`** (K19-a).

## 19.3 Clip windows

### `santiago` · slow — **A**

| | |
|---|---|
| `src` | `/clips/salsa/couples/santiago-slow.mp4` |
| `sourceVideo` | `M3J7w59rXTE` |
| `start` | **403.70** |
| `end` | **433.00** |
| length | 29.30s |
| `aspect` | `'16/9'` |
| `confidence` | `'transcript'` |

- Announced immediately before: "Okay one more time a bit more fluently" @400.48–
  403.30.
- Start anchor: `five[403.84] six[404.26] seven[404.76] one[405.34] to[406.16]
  Santiago[406.56] pop[407.12] let's[408.04] go[408.58]`. 403.70 sits in the gap
  after "fluently" @403.30.
- End anchor: `poco.[432.62]`, then `One[433.20] more[433.66] time[433.88]
  full[434.18] tempo[434.60]`. 433.00 is inside that 0.58s gap. **Cutting one
  frame later would put "full tempo" inside the slow clip.**
- One complete run, with the teacher naming the sections over it ("go forward
  front front and left, left over, right over, front and finish and Enchufla and
  hook").
- `caveat`: "One run. The teachers narrate the sections over it, which is useful,
  and they switch to full tempo 0.2s after the clip ends — do not extend it."

### `santiago` · fast — **V** (published)

`src` `/clips/salsa/couples/santiago-fast.mp4` · `sourceVideo` `vlSqi-msy60` ·
`start` **0.0** · `end` **46.0** · `aspect` `'9/16'` ·
`confidence` `'transcript'` · whole short, container duration 46s · `caveat` as
standing caveat 3.

### `santiago` · fast, alternate — **A**

| | |
|---|---|
| `sourceVideo` | `M3J7w59rXTE` |
| `start` | **498.90** |
| `end` | **543.00** |
| length | 44.10s |
| `aspect` | `'16/9'` |
| `label` | `'Full tempo (in class)'` |

- Start anchor: `One,[498.96] three,[499.72] five,[500.16] six,[501.08]
  seven,[501.46] and[501.94] one[502.08] Santiago,[502.36]` — 498.90 sits in the
  1.9s of silence before it.
- End anchor: `one.[542.72]`, then `Same[544.04] again[544.60] we[544.82]
  go,[545.02]`. 543.00 is in the gap.
- Two full-tempo runs, the second announced "And one more time Santiago, let's
  go." @521.76.
- `caveat`: "Teachers call the sections over the music. 44.1s — at the top of the
  20–45s target range, so trim from the front if a shorter loop is wanted; the
  second run alone is 521.76 → 543.00 (21.2s)."

### Rejected

- `c19-count` 434.60 → 451.20 — 16.6s, explicitly announced "full tempo", so it
  *is* a legitimate fast source, but it is under the floor and inside a chapter
  labelled `count`, which would confuse anyone auditing the data. Unpublished
  alternate.
- `c19-angle` 450.0 → 498.0 — 48s, but it is full tempo in a chapter labelled
  side-view, and from @456.36 it is rhythm vocalisation ("King King Ka Pim Pim Pim
  Pim"). Unpublished alternate.
- `c19-music-side` 541.0 → 581.0 — **must not be cut as a clip.** It is where the
  pull sequence is spoken, so it is a *cue* source, and cutting it as a silent
  demo would be wrong on both counts.

## 19.4 Lead cues

All `sourceVideo: 'M3J7w59rXTE'`, `confidence: 'transcript'` unless stated.

### Framing and entry

| `id` | `beat` | `role` | `kind` | `text` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|
| `santiago-based-on-setenta` | — | `both` | `concept` | Santiago is built on Setenta, not on Sombrero. | 108.36 | "The few last moves were sombrero based and Santiago is based on 70." |
| `santiago-first-forward-move` | — | `both` | `concept` | This is the first move where you are asked to walk **forward** while dancing. | 146.74 | "this is the first move when we encourage you our students to try to walk forward while dancing" |
| `santiago-both-directions` | — | `both` | `concept` | Be able to do both: step back when you feel like it, go forward when you feel like it. | 160.28 | "whenever you feel like stepping back you can step back, but whenever you feel like going forward you should be able to do it as well" |
| `santiago-entry-guapea` | — | `leader` | `lead` | Enter from Guapea, with steps back. | 219.64 | "Here we start with WAPEAN so we have steps back." |
| `santiago-continue-like-setenta` | — | `leader` | `lead` | Continue like Setenta — still stepping back, but on 1-2 you keep walking. | 223.24 | "Then we continue like setenta so we still have steps back but one, two, we keep walking five, six, seven." |

### The swap, and the first forward walk

| `id` | `beat` | `role` | `kind` | `text` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|
| `santiago-another-step-back` | — | `both` | `footwork` | Another step back, for both of you. | 236.44 | "Now we have another step back for both of us." |
| `santiago-follower-back-right` | — | `follower` | `footwork` | She goes backward on the right. | 239.26 | "So she goes backward there, right" |
| `santiago-leader-back-left` | — | `leader` | `footwork` | You go backward on the left — you swap places. | 240.96 | "I go backward the left, we swap places, one, two, three" |
| `santiago-game-changes` | — | `both` | `concept` | This is the moment the move stops being Setenta. | 245.06 | "this is the moment when the game is changing" |
| `santiago-leader-forward-right` | — | `leader` | `footwork` | Go forward with the right. | 248.34 | "I go forward with the right" |
| `santiago-follower-forward-left` | — | `follower` | `footwork` | She goes forward with the left. | 250.14 | "she goes forward with the left" |
| `santiago-follower-rotate-right-1` | — | `follower` | `footwork` | She rotates to her right. | 253.54 | "she will rotate to her right" |
| `santiago-leader-rotate-left-1` | — | `leader` | `footwork` | You rotate to your left. | 255.48 | "and I will rotate to my left" |

### The tunnel — the core of the move

| `id` | `beat` | `role` | `kind` | `text` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|
| `santiago-left-open-left` | — | `leader` | `lead` | Left arm open, to the left. | 263.54 | "Left is open to the left" |
| `santiago-right-behind-back` | — | `leader` | `lead` | Right hand behind your back. | 265.16 | "right is behind my back" |
| `santiago-make-tunnel` | — | `leader` | `lead` | Make a tunnel under your left arm for her to walk through. | 267.16 | "then under my left arm I will create a tunnel and she will walk forward" |
| `santiago-follower-under-tunnel` | — | `follower` | `footwork` | She walks forward under the tunnel, starting on the right foot. | 271.66 | "she will walk forward, again forward, starting with the right foot" |
| `santiago-leader-forward-left` | — | `leader` | `footwork` | You go forward with the left. | 276.02 | "I'll go forward with the left." |
| `santiago-back-hand-rises-early` | — | `leader` | `lead` | The hand behind your back has to start going up early. | 279.58 | "Now the second hand that is behind my back. It has to start going up relatively soon" |
| `santiago-elbow-up-is-right` | — | `leader` | `lead` | Check her elbow: bending **up** as you start walking is correct. | 286.14 | "because when we start walking and her elbow bends up, it's perfect" |
| `santiago-elbow-down-is-fatal` | — | `leader` | `lead` | If her elbow bends the other way you cannot finish Santiago — fix it before you walk. | 291.60 | "But when we start walking and her elbow starts bending opposite direction, then it's basically game over. We'll not be able to complete Santiago." |
| `santiago-still-a-salsa-move` | — | `both` | `concept` | If it goes wrong it is still a real salsa move — just not this one. | 299.22 | "It is still genuine salsa move, just not Santiago." |

### The second and third walks, and the exit

| `id` | `beat` | `role` | `kind` | `text` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|
| `santiago-leader-rotate-right-2` | — | `leader` | `footwork` | On the second rotation you go to the right. | 310.10 | "I rotated to the right" |
| `santiago-follower-rotate-right-2` | — | `follower` | `footwork` | She rotates to the right again. | 311.38 | "she rotated also to the right" |
| `santiago-connection-at-neck` | — | `leader` | `lead` | The hand connection sits between you, at the level of her neck. | 315.06 | "the connection between our hands is in between us on the level of her neck" |
| `santiago-third-walk` | — | `leader` | `footwork` | Walk forward a third time: you on the right, her on the left. | 323.58 | "then we walk forward one more time. I start with the right, she goes with the left." |
| `santiago-follower-rule` | — | `follower` | `footwork` | Every three steps, rotate to the right. Every single time. | 336.30 | "So from a girl perspective, after each three steps you rotate to the right every single time." |
| `santiago-leader-rule` | — | `leader` | `footwork` | Left, then right, then left again. | 345.26 | "Guys, you go to the left, to the right, and then to the left again." |
| `santiago-finish-two-hands` | — | `leader` | `lead` | Finish with both hands connected. | 347.56 | "We finish with two hands connected and we'll end it up the same as we end contact." |
| `santiago-both-hands-up` | — | `leader` | `lead` | Both hands up. | 352.48 | "So both hands up" |
| `santiago-right-on-shoulder` | — | `leader` | `lead` | Right hand on the shoulder. | 353.40 | "right on my shoulder" |
| `santiago-hook-turn` | — | `leader` | `footwork` | Hook turn. | 354.92 | "and hook turn" |
| `santiago-exit-dqn` | — | `leader` | `lead` | Out with Dile que no. | 361.32 | "and Dilek en haut" |
| `santiago-then-enchufla-back` | — | `leader` | `concept` | After the three forward sections the continuation is Enchufla, stepping back. | 393.48 | "So after three sections of walking forward the continuation is with enchufla stepping back." |

### The pull sequence — one sentence, five cues

Spoken once, over the side-view music at @548.44, and nowhere else in the class.
This is the sentence the teachers later apologise for not expanding on (see
`notes`). Split per §5's one-action rule; each `sourceStart` is the word timing of
the action itself, not of the sentence.

| `id` | `beat` | `role` | `kind` | `text` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|
| `santiago-pull-right-1` | — | `leader` | `lead` | Pull with the right. | 549.14 | "And I pull with my right" |
| `santiago-pull-right-2` | — | `leader` | `lead` | Pull with the right again. | 550.82 | "then I pull with right again" |
| `santiago-pull-left` | — | `leader` | `lead` | Then pull with the left. | 552.66 | "then I pull with left" |
| `santiago-pull-then-enchufla` | — | `leader` | `lead` | Then Enchufla. | 554.48 | "and then an enchufla" |
| `santiago-pull-then-hook` | — | `leader` | `lead` | Then hook. | 555.80 | "and then hook" |

**37 cues; 19 are `kind: 'lead'`** — the most of any class in this range, which is
right: this is the longest teach block and the one the charter's R3 was written
for.

## 19.5 Known defects

| Flag | What | What to do |
|---|---|---|
| **K19-a** | `c19-count` (401.0–450.0) is **half full tempo**. At @433.20 the teacher says "One more time full tempo" and the remaining ~16s is at tempo. Cutting the chapter as the slow clip would ship a clip that is 34% not-slow. | Segment `confidence: 'suspect'` + `warning`. Slow clip ends at 433.00, 0.2s before the announcement. Do **not** cut 401→450. |
| **K19-b** | `santiago-finish-two-hands`: "we'll end it up the same as **we end contact**" — "contact" is not a move name in this course and does not parse. Probably a mangled move name (Kentucky? Setenta?) but that is a guess. | Cue text carries only the part that is certain ("finish with both hands connected"). Add `warning: "The comparison in the verbatim ('the same as we end contact') is garbled — check 346–353 by eye"`. Do not fill in a move name. |
| **K19-c** | `santiago-right-on-shoulder` @353.40 says "right on **my** shoulder" and then @357.62 says "Right on **left** shoulder", which are not obviously the same instruction. | Only the first is a cue. Add `warning` and resolve by watching 350–362. If they turn out to be two distinct actions, add the second as its own cue with `sourceStart: 357.62`. |
| **K19-d** | The whole move has **no `beat` on any cue.** The teachers count constantly but always to mark the bar ("five, six, seven"), never to place an individual action on a numbered beat. | Accepted, not papered over. Every `beat` is omitted rather than guessed. This is the class where a human with the video would add the most value: the actions are all named and ordered, only the beat numbers are missing. |
| **K19-e** | @168.56 "There is this **MCC** method". The acronym is unexplained and appears nowhere else in the corpus. | Kept as a verbatim `notes` line, no cue, no expansion. Do not guess what MCC stands for — that would be inventing terminology, which the non-goals forbid. Resolve by listening to 167–176. |
| **K19-f** | The teachers state on camera that the leading of this move is **not fully taught** (@687.30, @699.40). | Not a data defect — a content limitation, and the most honest thing in the class. Surface both quotes on the page beside the cues. Never silently drop them to make the cue list look complete. |
| **K19-g** | `WAPEAN` @220.64 (*Guapea*), `Dilek en haut` @361.44 / `dile cano` @448.38 / `bileke no` @490.66 / `dilekano` @536.70 / `Vile Cano` @574.80 (*Dile que no*), `Chiqui turn` @375.90 (probably *hook turn*, unconfirmed). | Add the confirmed ones to `guapea` / `dile-que-no` aliases (Part 1) and the normaliser. **`Chiqui turn` is a guess — do not add it** until someone watches 374–377. |
| **K19-h** | The short `vlSqi-msy60` is untranscribed. | As K15-f. |

---

# Class 20 — Solo sequence

| | |
|---|---|
| Video | `6-cpKa0UMWA` · 958s · 11 chapters |
| Short | **none** — the official shorts playlist stops at Class 19 |
| Description move list | `Two solo sequences` · `Release partner, do a solo sequence, come back to dancing as a couple` |
| `chaptered` | `true` |
| `teaches` | `['solo-sequence-one', 'solo-sequence-two', 'release-and-return']` |

**This is the class the brief singled out.** It has no short, so *both* grains have
to come from the class, and it has **two `count` chapters** rather than one —
chapter 6 for the first sequence and chapter 8 for the second. That is a gift, not
a problem: it means two independently anchored slow clips instead of one shared
one. The fast grain comes from chapter 10 ("Both sequences - with music", 753–831),
which conveniently runs the two sequences in order, so it splits cleanly into two
fast clips at the announcement "And now we'll go with the second sequence"
@787.80.

The chapters here are **the best in the whole range**: five of the eleven markers
land within 0.8s of the spoken transition, and chapter 8's lands within 0.16s.

## 20.1 Move index

Three moves. The description's move list has two entries, one of which
(`Two solo sequences`) covers two separately-chaptered, separately-counted things
— so it becomes two moves, and the second entry becomes the third.

### `solo-sequence-one`

| Field | Value |
|---|---|
| `id` | `solo-sequence-one` |
| `name` | `The first sequence` |
| `kind` | `skill` |
| `composedOf` | `['guapea', 'vacilala', 'left-turn', 'right-turn', 'double-right-turn', 'dile-que-no']` |
| `complete` | `true` |

`aliases`: `['The first sequence', 'sequence one', 'sequence 1', 'first solo sequence', 'Solo sequence 1']`

*On the name.* R1 says the canonical name is spelled as the channel writes it, and
the channel writes two things: the description says `Two solo sequences` (one
phrase for two moves, so unusable as a name) and the chapter titles say **"The
first sequence"** / **"The second sequence"**. I have used the chapter titles,
because they are channel-authored text that names each move individually. The
teachers also say "this will be sequence one, and sequence two" @92.xx and
"sequence 1" @757.32, both of which are in `aliases`. See K20-f — this is a
naming judgement, not a transcript fact, and Parts 1–2 should be checked for a
house convention before it is fixed in TypeScript.

*On `kind`.* Neither sequence is a `step`, a `turn`, a `footwork` or
`body-movement`; it is a composed solo phrase. `skill` is the closest existing
value and the teachers use the word themselves — "This is a skill that requires
quite a bit of practice" @413.96. **No new type is proposed** (see K20-g).

`summary`: "A solo phrase for each partner, danced after releasing: he does left
turn then double right, she does left turn then right turn, and they rejoin with
Dile que no."

`footwork`: "Enter from Guapea into Vacilala and release on 1-2, then step out on
5-6-7 so you are facing each other. Her half: right foot back on 1 throughout, one
extra basic to synchronise, then left turn starting on 5 and right turn starting on
5 as well. His half: left foot forward on 1, left turn then a double right. Neither
of you starts at the same moment. Out through Dile que no — she continues with the
right back, he goes with the left forward."

`notes`:
- **The camera constrains the spacing, not the dance.** "we are again limited in
  this our small rectangle in here so you can see us from both perspectives. If you
  were dancing socially you wouldn't be bothered about the distances." @308.38–
  318.22, resolving to "I would say comfortable distance. So you both have a bit of
  space to dance separately, but you still interact with each other." @343.62–
  351.04.

### `solo-sequence-two`

| Field | Value |
|---|---|
| `id` | `solo-sequence-two` |
| `name` | `The second sequence` |
| `kind` | `skill` |
| `composedOf` | `['guapea', 'vacilala', 'exhibela', 'mambo-cubano', 'double-right-turn', 'right-turn', 'dile-que-no']` |
| `complete` | `true` |

`aliases`: `['The second sequence', 'sequence two', 'sequence 2', 'second solo sequence', 'Solo sequence 2']`

`summary`: "The same idea but **mirrored** — both partners dance Exhibela and Mambo
Cubano at the same time, facing each other, she leading with the opposite foot."

`footwork`: "Same entry. Then both dance Exhibela and both dance Mambo Cubano,
standing opposite each other so you are literally mirrors. She has to think about
starting on the *right* foot while doing the same moves. Full sequence: Exhibela,
Mambo Cubano, then double right turn for him and step-back-plus-single-right-turn
for her, out through Dile que no."

`notes`:
- The teachers name the prerequisite classes on camera and promise YouTube cards
  for them: "all classes needed for these sequences, I'll add them to cards, so
  you'll find them. You'll find their left turn, right turn, Exhibela, Mambo
  Cubano, everything will be there." @441.56–460.00. **This is the dependency edge
  the plan's §6 asks for, stated by the teachers rather than inferred** — a good
  reason to render `composedOf` as links on this move's page.

### `release-and-return`

| Field | Value |
|---|---|
| `id` | `release-and-return` |
| `name` | `Release partner, do a solo sequence, come back to dancing as a couple` |
| `kind` | `skill` |
| `base` | `vacilala` |
| `complete` | `true` |

`aliases`: `['release partner', 'dancing solo', 'solo sequence entry', 'come back to dancing as a couple']`

*The `name` is the description's move-list entry, verbatim and unedited.* It is a
sentence rather than a Spanish move name, which is unusual but is what the channel
wrote, and R1 forbids inventing a tidier one.

`base: vacilala` is sourced: "Both of them start with Basi Lala. You know Basi
Lala, you know how it works." @115.74–119.02. `Basi Lala` is Whisper for
*Vacilala* — see K20-c, which confirms it rather than assuming it.

`summary`: "How to let go, dance apart and get back together: release out of
Vacilala on 1-2, step out on 5-6-7, and signal the return with your upper body
rather than your hands."

`footwork`: "Guapea, touch hands, open a bit, pull with the left, release on 1-2,
then step out on 5-6-7 without approaching your partner so you finish facing each
other. To come back, the leader indicates with his upper body by approaching; the
follower reads it and starts Dile que no, which is easy because her right leg is
already going back — as most steps do."

`notes`:
- **Rumba is the one solo step that obliges a response.** "Rumba is the only solo
  step that I would require my partner to follow. So if I enter Rumba, I expect her
  to respond with the same. If she doesn't, I don't continue because I know if I
  start attacking her, she will slap me." @550.42–566.02. Everything else is free:
  "Everything else is my own creativity and Anna's well. So we can do some things
  completely different from each other, completely unrelated." @572.52–581.54.
- **What to do when she does not want to come back.** "It happens, it happens
  sometimes. Girls are getting into their own zone and they need more space for
  longer. A good follower would rather adjust and try to join the guy … And then
  there is not much you guys can do, you don't force her to close the position, you
  carry on dancing solo." @626.22–656.00.
- **Social-dancing etiquette, and the teachers calling their own demo a bad
  example.** "this is bad. This is really bad. This is bad example because if you
  see that girl doesn't know what to do, you don't put her in this position."
  @696.50–705.46, and "A lot worse would be if girl just stood there like that and
  guys are going crazy. This unfortunately happens occasionally on salsa parties."
  @705.64–715.60.
- **Anna's option, relayed because she was not miked.** "We didn't connect Anna to
  the microphone today, so she told me like another option is like if you have a
  good body movement you can just dance with your body and wait for a guy."
  @735.94–747.68. Attribute it to her on the page.

## 20.2 Segment map

| `id` | start | end | `role` | `label` | `moves` | notes |
|---|---|---|---|---|---|---|
| `c20-intro` | 0.0 | 18.0 | `skip` | Intro | — | |
| `c20-about` | 18.0 | 73.0 | `skip` | About this class | — | |
| `c20-presentation` | 73.0 | 117.0 | `teach` | Both solo sequences - presentation | all three | "first we'll dance both of them one by one and then we will explain how it works" @73.50 — marker 0.5s early |
| `c20-enter` | 117.0 | 141.0 | `teach` | How to enter a solo sequence | `release-and-return` | **marker 2.2s early** — it lands inside "Both of them start with Basi Lala" (113.14–119.02). The real transition is "you know how it works. So we start with Guapea" @119.16. See K20-l |
| `c20-teach-1` | 141.0 | 263.0 | `teach` | The first sequence - explanation | `solo-sequence-one` | **marker ~5s late** — the transition is "And from this moment we'll start our solo sequences" @135.26. See K20-l |
| `c20-count-1` | **260.1** | 302.3 | `count` | The first sequence fluently with count (in couple) | `solo-sequence-one`, `release-and-return` | **start deliberately 2.9s before the 263.0 chapter marker** — the counted run begins at `five[260.24]`. End trimmed from 352.0 to 302.3: everything after `7.[301.96]` is the "comfortable distance" talk, not counting. See K20-b |
| `c20-teach-2` | 352.0 | 481.0 | `teach` | The second sequence - explanation | `solo-sequence-two` | "Second sequence." — `sequence.[352.00]`. **Marker within 0.5s** |
| `c20-count-2` | 481.0 | 523.6 | `count` | The second sequence fluently with count (in couple) | `solo-sequence-two`, `release-and-return` | `5[481.16]` — **marker 0.16s early, the tightest in Part 3**, and the plan is announced at `Guapea[478.70] Basi Lala sequence di Le Cano` |
| `c20-solo-advice` | 524.0 | 753.0 | `teach` | Additional info about dancing solo | `release-and-return` | `Before[524.34]` — 0.34s. **229s and only 5% count density: this is almost entirely talk, and it is the most valuable talk in the range.** Ten of this class's cues come from here |
| `c20-music` | 753.0 | 831.0 | `music` | Both sequences - with music | `solo-sequence-one`, `solo-sequence-two` | `6,[753.76]` — 0.76s. Splits at `And[787.80] now we'll go with the second sequence` |
| `c20-outro` | 831.0 | 958.0 | `skip` | Summary / Outro | — | `Nice![829.54]` then "Dancing solo is a very complicated discipline" @832.32 — the marker sits in the gap between them |

All eleven at `confidence: 'transcript'`. Two carry a `warning` (`c20-enter`,
`c20-teach-1`, K20-l). **No segment in this class is `suspect`** — the only class in
Part 3 for which that is true.

## 20.3 Clip windows

Four cut windows, two shared, one alternate. `sourceVideo` is `6-cpKa0UMWA`
throughout and `aspect` is `'16/9'` throughout — **this class contributes no 9/16
material at all**, because there is no short.

### `solo-sequence-one` · slow — **A**

| | |
|---|---|
| `src` | `/clips/salsa/couples/solo-sequence-one-slow.mp4` |
| `start` | **260.10** |
| `end` | **302.30** |
| length | 42.20s |
| `confidence` | `'transcript'` |

- Announced: "So now we'll do this sequence as a couple." 256.02–260.02.
- Start anchor: previous words end `couple.[260.02]`; the count starts
  `five[260.24] six[260.96] seven[261.52] one[262.12] two[262.96] three[263.50]
  we[263.96] go[264.22] basi[264.56] la[265.28] la[265.50] hop[265.70]
  one[266.24] two[267.30] release[267.64]`. 260.10 sits in that 0.22s gap.
- End anchor: `7.[301.96]`, then `Yes,[302.64] it is important to notice…`.
  302.30 sits in the gap.
- **Two complete runs from two camera angles**, separated by 3.0s of "we'll do it
  one more time so I can reverse the camera" (282.20–285.18).
- `caveat`: "Two runs, filmed from two angles, with a 3-second remark between them
  ('so I can reverse the camera'). If a single clean loop is wanted, the second run
  alone is 285.05 → 302.30 (17.25s), which is below the 20s floor."

### `solo-sequence-one` · fast — **A**

| | |
|---|---|
| `src` | `/clips/salsa/couples/solo-sequence-one-fast.mp4` |
| `start` | **753.30** |
| `end` | **787.40** |
| length | 34.10s |

- Start anchor: `together.[752.50]` ends the previous sentence; the music count
  starts `6,[753.76] 7[754.52] and[754.82] 1.[755.18] We[755.76] start[756.06]
  with[756.32] Basi[756.54] Lala[756.90] and[757.08] sequence[757.32] 1.[757.62]`.
  753.30 is in the gap.
- End anchor: `King.[786.78]`, then `And[787.80] now[788.12] we'll[788.28]
  go[788.46] with[788.56] the[788.70] second[788.82] sequence.[789.02]`. 787.40 is
  in the gap. **This is the natural seam between the two fast clips.**
- Two runs, the second announced "We'll try to do one more time the same" @771.10.
- `caveat`: "Full tempo over music, with the teachers calling the sequence over it
  ('left turn guys, straight away and hop girls left'). Not a silent demo — but the
  calls are exactly the cue list, so this is a feature here."

### `solo-sequence-two` · slow — **A**

| | |
|---|---|
| `src` | `/clips/salsa/couples/solo-sequence-two-slow.mp4` |
| `start` | **481.05** |
| `end` | **523.60** |
| length | 42.55s |

- Announced immediately before: `Guapea[478.70] Basi[479.42] Lala[479.76]
  sequence[479.96] di[480.52] Le[480.78] Cano[480.90]` — the teacher literally
  reads out the combination he is about to count.
- Start anchor: 481.05 sits between `Cano[480.90]` and `5[481.16]`.
- End anchor: `Nice.[522.88]`, then `Before[524.34] we do it with music`. 523.60 is
  in the gap.
- **Two complete runs**, separated by 2.4s of "we'll come back to our original
  position" (499.42–501.06) — which is itself the `release-and-return` point, so
  the remark is content, not noise.
- `caveat`: "Two runs with a 2.4s remark between. The second run drifts into
  rhythm vocalisation ('tic tiki', 'king king pa') rather than numbers from about
  509.8 — normal for this course, not a defect."

### `solo-sequence-two` · fast — **A**

| | |
|---|---|
| `src` | `/clips/salsa/couples/solo-sequence-two-fast.mp4` |
| `start` | **787.50** |
| `end` | **828.60** |
| length | 41.10s |

- Start anchor: after `King.[786.78]`, before `And[787.80]`. Deliberately includes
  the spoken announcement "And now we'll go with the second sequence" — it tells
  the viewer what they are about to see.
- End anchor: `One.[827.58]`, then `Nice![829.54]`. 828.60 is in the gap.
- Two runs, the second announced "And we'll do it again the same" @809.18.
- `caveat`: "Full tempo. From about 818.9 the calls become rhythm vocalisation
  ('And ping, ping, ping', 'And king, king, pa') rather than move names."

### `release-and-return` · slow and fast — **shared**

`slow`: the `solo-sequence-one` slow clip with `shared: true`. It contains the
release verbatim — `basi[264.56] la[265.28] la[265.50] hop[265.70] one[266.24]
two[267.30] release[267.64]` — and the return at `and[278.66] D[279.24]
like[279.40] I[279.72] know[279.92]`. **The skill is not a separate demo; it is the
first and last three bars of every sequence.** Sharing the file is the honest
model, not a shortcut.

`fast`: the `solo-sequence-one` fast clip with `shared: true`.

### `release-and-return` · alternate — **V** (unpublished)

| | |
|---|---|
| `start` | **601.90** |
| `end` | **611.30** |
| length | 9.40s |
| `label` | `'The unannounced return'` |

The only place in the class where the return is demonstrated *without being
choreographed*: "So we'll show you like a small sequence completely unprepared"
@598.20–601.12, then 602.00–610.62 of counting, then "and see? I didn't tell her
when I'm going to approach her, but she was ready. She was ready." @611.10.

**9.40s — far below the 20s floor, so it is an `alternates` entry, not published.**
Start anchor `unprepared.[601.12]` → `1[602.00]`; end anchor `and[610.90]` /
`1[610.62]` → `see?[611.10]`. It is kept because it is the single best 9 seconds of
evidence for the class's central claim, and a reviewer should see it.

## 20.4 Lead cues

All `sourceVideo: '6-cpKa0UMWA'`, `confidence: 'transcript'` unless stated.

### `release-and-return` — where every lead cue in this class lives

| `id` | `beat`/`beats` | `role` | `kind` | `text` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|
| `rr-starts-from-vacilala` | — | `both` | `concept` | Both sequences start from Vacilala. | 115.74 | "Both of them start with Basi Lala. You know Basi Lala, you know how it works." |
| `rr-guapea-touch-hands` | — | `leader` | `lead` | From Guapea, touch hands. | 120.32 | "So we start with Guapea, touch hands" |
| `rr-open-a-bit` | — | `leader` | `lead` | Open a bit. | 123.42 | "open a bit" |
| `rr-pull-with-left` | — | `leader` | `lead` | Pull with the left. | 124.56 | "pull with the left" |
| `rr-release` | `[1,2]` | `leader` | `lead` | Release on 1-2. | 126.20 | "One two release" |
| `rr-step-out-dont-approach` | `[5,6,7]` | `leader` | `footwork` | On 5-6-7 step out — do **not** approach her. | 130.38 | "On five six seven I bet step out, I don't approach my partner, we're facing each other." |
| `rr-face-each-other` | — | `both` | `concept` | Finish the release facing each other. | 133.96 | "we're facing each other" |
| `rr-many-entries` | — | `leader` | `concept` | There is more than one way in — the Vacilala release is just the one being taught. | 530.78 | "You can enter solo sequences in multiple ways." |
| `rr-rumba-demands-a-response` | — | `leader` | `lead` | Rumba is the only solo step that obliges her to follow. | 550.42 | "Rumba is the only solo step that I would require my partner to follow." |
| `rr-no-response-no-rumba` | — | `leader` | `lead` | If she does not answer Rumba, stop — don't push it. | 556.36 | "So if I enter Rumba, I expect her to respond with the same. If she doesn't, I don't continue" |
| `rr-otherwise-unrelated` | — | `both` | `concept` | Apart from Rumba you are free — you can dance completely unrelated things. | 572.52 | "Everything else is my own creativity and Anna's well. So we can do some things completely different from each other, completely unrelated." |
| `rr-signal-return-with-body` | — | `leader` | `lead` | Signal the return with your upper body: approach her. | 590.52 | "The main thing is that guy gives indication with his upper body, like approaching the girl" |
| `rr-follower-reads-approach` | — | `follower` | `lead` | Read his approach — Dile que no is coming. | 596.12 | "and she feels aha the Lecano is happening" |
| `rr-follower-right-leg-back` | — | `follower` | `footwork` | Your right leg is already going back, so Dile que no is easy to pick up. | 615.70 | "Because quite naturally you are going with the right leg back. Majority of steps are going with the right leg back. The same as D-Lekin-O, so it's easy to start it this way." |
| `rr-dont-force-her-back` | — | `leader` | `lead` | If she wants more solo, don't force the closed position — keep dancing solo. | 652.26 | "you don't force her to close the position you carry on dancing solo" |
| `rr-follower-fallback-enchufla` | — | `follower` | `footwork` | Blank? Just keep doing Enchufla. | 678.22 | "So basically you just keep going enchufla." |
| `rr-dont-solo-at-a-beginner` | — | `leader` | `concept` | Don't ask a beginner to solo — you need a partner who can match it. | 715.60 | "Guys, if you are experienced dancers, you want to express yourself, you need a girl to match this. If you ask beginner girl to dance, don't expect her suddenly to solo." |
| `rr-follower-dance-with-body` | — | `follower` | `styling` | Or just dance with your body movement and wait for him. | 740.12 | "if you have a good body movement you can just dance with your body and wait for a guy" |

**18 cues; 8 are `kind: 'lead'`.**

### `solo-sequence-one`

| `id` | `beat` | `role` | `kind` | `text` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|
| `s1-follower-right-back-on-one` | 1 | `follower` | `footwork` | Right foot back on 1, always. | 158.48 | "She's always starting with the right foot back on one" |
| `s1-leader-left-forward-on-one` | 1 | `leader` | `footwork` | Left foot forward on 1. | 161.02 | "and I start with the left foot forward on one" |
| `s1-follower-turns` | — | `follower` | `footwork` | Left turn, then right turn. | 186.16 | "Anna is going to do left turn and then right turn." |
| `s1-leader-turns` | — | `leader` | `footwork` | Left turn, then a double right. | 189.48 | "I'm going to do left turn and double right." |
| `s1-not-together` | — | `both` | `concept` | You do not start at the same moment. | 192.12 | "Now pay attention that we don't start at the same moment." |
| `s1-follower-both-turns-on-five` | 5 | `follower` | `rhythm` | Both of your turns start on 5. | 195.38 | "Anna will start left turn on five and right turn on five as well." |
| `s1-follower-extra-basic` | — | `follower` | `rhythm` | Add one basic step before, to line up. | 199.56 | "So to synchronize it she has to add one basic step before." |
| `s1-follower-order` | — | `follower` | `footwork` | Step back, left turn, right turn, Dile que no. | 232.66 | "Step back, left turn, right turn, dilek en o." |
| `s1-leader-order` | — | `leader` | `footwork` | Left turn, double right, Dile que no. | 236.58 | "And guys you go left turn, double right, dilek en o." |
| `s1-follower-exit-right-back` | — | `follower` | `footwork` | Into Dile que no: continue with the right back. | 219.24 | "so she will continue with the right back" |
| `s1-leader-exit-left-forward` | — | `leader` | `footwork` | Into Dile que no: go with the left forward. | 220.86 | "I will go with the left forward" |
| `s1-comfortable-distance` | — | `both` | `concept` | Leave enough space to dance separately but still interact. | 343.62 | "I would say comfortable distance. So you both have a bit of space to dance separately, but you still interact with each other." |
| `s1-camera-not-social` | — | `both` | `context` | The tight spacing on camera is for filming, not how you'd dance socially. | 308.38 | "we are again limited in this our small rectangle in here … If you were dancing socially you wouldn't be bothered about the distances." |

**13 cues; 0 are `kind: 'lead'`.** That is correct, not an omission — see K20-i.
`s1-follower-order` and `s1-leader-order` are deliberately kept whole rather than
split per action, because the teachers give them *as* orderings and each individual
turn is already its own cue above.

### `solo-sequence-two`

| `id` | `beat` | `role` | `kind` | `text` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|
| `s2-two-ways-to-translate` | — | `follower` | `concept` | There are two ways to translate his sequence into yours. | 353.66 | "from girl perspective you can do two things to translate technically men's step, men's sequences that we taught you in our course to your own needs" |
| `s2-option-step-back-first` | 5 | `follower` | `footwork` | Option one: step back first, then start everything on 5. | 368.10 | "So first step back and then carry on with moves. So starting everything on five." |
| `s2-option-mirror` | — | `follower` | `footwork` | Option two: mirror his steps. | 372.90 | "Another option is to mirror steps." |
| `s2-both-exhibela-both-mambo` | — | `both` | `footwork` | Both of you dance Exhibela, then both dance Mambo Cubano. | 380.24 | "both Exhibela and then both Mambo Cubano" |
| `s2-literally-mirrors` | — | `both` | `concept` | Standing opposite, you are literally each other's mirror. | 400.16 | "We are literally our mirrors." |
| `s2-follower-opposite-foot` | — | `follower` | `footwork` | Same moves, opposite foot — you start on the right. | 404.94 | "Now from the girl point of view you have to think that you start with your right foot. You still carry on with the same moves but you start with opposite foot." |
| `s2-mirroring-needs-practice` | — | `follower` | `concept` | Expect this to take practice. | 413.38 | "This is a skill that requires quite a bit of practice." |
| `s2-leader-whole-sequence` | — | `leader` | `footwork` | Exhibela, Mambo Cubano, double right turn. | 416.96 | "So for whole sequence we'll have Exhibela, mambo cubano and double right turn for guys" |
| `s2-follower-whole-sequence` | — | `follower` | `footwork` | Exhibela, Mambo Cubano, step back and single right turn. | 424.14 | "step back and right turn for girls" |
| `s2-follower-single-then-dqn` | — | `follower` | `footwork` | One single turn, then Dile que no. | 470.42 | "girls, one single turn, and D like I know" |

**10 cues; 0 are `kind: 'lead'`.**

Class 20 total: **41 cues, 8 of them `kind: 'lead'`, all 8 on
`release-and-return`.**

## 20.5 Known defects

| Flag | What | What to do |
|---|---|---|
| **K20-a** | **No official short.** The shorts playlist covers classes 5–19 only, so this class is one of the six the plan (§3) says must be cut in-house. | Handled: both grains come from the class. The four cut windows above are all 34–43s and all `16/9`. **Nothing about this class is shipped as "long video only".** |
| **K20-b** | The `count` chapter marker (263.0) is **2.76s after the counted run starts** at `five[260.24]`. Cutting on the chapter would clip the "basi la la hop one two release" entry off the front — i.e. it would remove the exact bars that make this the `release-and-return` demo. | Segment and clip both start at 260.1. Same failure mode as K16-a, and the reason the plan says "verify, don't trust". |
| **K20-c** | **`Basi Lala` is *Vacilala* and the normaliser does not catch it.** Nine variants here and in Class 14: `Basi Lala`, `basi la la`, `Basi la la`, `Basilella` @791.26, `La silala` @811.88, plus `Basilala`, `Basilela`, `Basila La`, `Basilola`, `Basila`, `basila la`, `Basilla`, `Basila Laporte` in `jBaHuGXoWBY` (Class 14, Vacilala) and `pZChl5ylSJw` (Class 7, Vacilala por la mano). | **This one is confirmed, not assumed:** the Class 14 transcript contains both `vacilala` and `Basilala`, in the class whose description move is `Vacilala`. Add the whole family to `vacilala` aliases and to `scripts/normalize_salsa_terms.py`. Then re-normalise — it will improve Parts 1–2 as well as this class. |
| **K20-d** | @533.64 "For example, I would do **babosa**. I don't think we show this move during our courses." | **Do not index `babosa` as a `SalsaMove`.** The teacher says on camera that it is not taught here. Same rule as K18-f. Keep the sentence in `notes` if anywhere. |
| **K20-e** | `rumba` is discussed at length (550–570) but is explicitly from elsewhere: "We showed you rumba during beginners classes. We showed you rumba in separated videos as well." @543.38. | Do **not** create a `rumba` move from this class. The two cues `rr-rumba-demands-a-response` and `rr-no-response-no-rumba` are about the *convention*, not the step, and are legitimate. If `rumba` exists in Part 1 or 2, link to it; do not create it here. |
| **K20-f** | **Move naming is a judgement call.** The description's move list has `Two solo sequences` — one phrase for two separately-chaptered, separately-counted moves. Names taken from the chapter titles instead. | Reconcile with Parts 1–2 before writing TypeScript. If they establish a convention for description entries that cover several moves, follow it. `aliases` already carries every form the teachers speak, so search works either way. |
| **K20-g** | `kind: 'skill'` for a composed solo phrase is a stretch — `SalsaMoveKind` has no `sequence` or `combination`. | **No new type is proposed.** `skill` is the closest, and the teachers use the word ("This is a skill that requires quite a bit of practice" @413.96). If Part 1 or 2 hits the same wall on Class 21's material, adding one value is a two-line change and would be the right call — but one class does not justify it. |
| **K20-h** | `composedOf` uses `left-turn`, `right-turn`, `double-right-turn`, `mambo-cubano`, `exhibela`, `vacilala`, `guapea`, `dile-que-no`. **The turn ids are guesses.** The steps course spells its turns `right-turn-front-back` and similar, so at least the two plain-turn ids are probably wrong. | Standing caveat 5 applies: reconcile against Parts 1–2 and the steps data before writing TypeScript, and let those spellings win. Do not create new turn moves to make these ids resolve. |
| **K20-i** | Both sequences have **zero `lead` cues**. | Not a defect to fix — it is the finding. The sequences are danced *apart*, so there is nothing to lead; all the leading is in the release and the return, which is exactly why `release-and-return` is modelled as its own move and carries all 8. Say this on the page rather than letting the empty list look like missing work. |
| **K20-j** | @538.58 the transcript contains the bare word **"Zoom."** between "I don't think we show this move during our courses" and "Anna can do more turns". | Un-interpretable: possibly an instruction to the camera operator, possibly a mangled move name. **Do not index it and do not guess.** Resolve by watching 536–540. |
| **K20-k** | Manglings. *Dile que no*: `Dile Cano` @218.64, `dilek en o` @235.70, `D like I know` @279.24, `D like an O` @299.62, `di Le Cano` @480.52, `d like and` @519.86, `Dilek and` @766.68, `Ile Cano` @784.34, `Lecano` @597.22, `D-Lekin-O` @622.72. *Vacilala*: see K20-c. `Bug Girls` @495.20 is probably "**Back**, girls". | Add the *Dile que no* forms to its aliases (Part 1) and the normaliser — this class alone contributes ten. **`Bug Girls` is a guess; do not add it** without watching 494–497. |
| **K20-l** | Two chapter markers disagree with the transcript: `c20-enter` (117.0) is 2.2s early and lands mid-sentence, and `c20-teach-1` (141.0) is ~5s late. | Both segments carry a `warning` quoting the real transition. Neither affects a clip, so this is cosmetic — recorded so a reviewer doesn't rediscover it. |

---

# Class 21 — All moves demo

| | |
|---|---|
| Video | `X7lz-BBMmU8` · 450s · 4 chapters |
| Short | **none** |
| Description move list | `Demo song containing all moves we thought you during our course` |
| Song (from the description) | **`Mas Bajo - Soy de Tierra y De Mar`** |
| `chaptered` | `true` |
| `teaches` | `[]` — **no new moves** |

> ## This class resolves a defect in the *steps* course
>
> The description names the song: **`Mas Bajo - Soy de Tierra y De Mar`**. Steps
> Class 15 (`qD6Vp3qj48o`) dances **the same song**, and its Whisper guess at the
> title was withheld under steps flag **C15-a** because nothing in the source
> confirmed it. This description confirms it. **Strike C15-a in
> `SALSA_VERIFICATION_LOG.md`** and set the steps Class 15 song from here — the
> provenance is a channel-authored description, which is as good as it gets
> without asking the teachers.

**Handled as the brief specifies: like steps Class 15.** No `SalsaMove`, no
`ClipPair`, no cues. Instead a class-level `clip`, a `callSheet`, and the class's
substance carried as segment provenance and class notes. The whole class is one
continuous song with the teacher naming moves over it — stated on camera at
@44.84: *"So I'll keep shouting the names of the moves as we dance them."* That
sentence is the call sheet's provenance.

## 21.1 No move index

Nothing is added to the move index by this class, and nothing should be. Every name
called here already exists as a move from classes 1–20. `teaches: []`.

**What the demo does add** is a cross-reference: each `CallSheetEntry` that resolves
to a move id is a deep link into a full-tempo, in-context performance of that move.
Render it on the *move's* page ("seen in the Class 21 demo at 4:10") rather than
inventing a `TeachingSource` for it — see K21-f.

## 21.2 Segment map

| `id` | start | end | `role` | `label` | `moves` | notes |
|---|---|---|---|---|---|---|
| `c21-intro` | 0.0 | 18.0 | `skip` | Intro | — | |
| `c21-about` | 18.0 | 44.0 | `skip` | About this class | — | `Hello,[18.86]` — 0.86s. Ends `Let's[41.50] do[41.70] it.[41.80]`, and the next marker is 2.2s later. Both boundaries clean |
| `c21-demo` | 44.0 | 371.0 | `music` | Demo song | all 21 resolved ids (below) | `Okie[44.84] dokie.[45.32]` — 0.84s. `reviewsEarlierMoves: true`. **327s — by far the longest single segment in Part 3** |
| `c21-outro` | 371.0 | 450.0 | `skip` | Summary / Outro | — | `I[371.88] reminded myself about Santiago` — 0.88s. **`role: 'skip'` but do not treat as skippable**: this is the closing thesis of the entire course (see notes) |

`moves` on `c21-demo`: `['al-centro', 'la-chica', 'el-chico', 'los-dos', 'dedo',
'sombrero-complicado-doble', 'sombrero', 'vacilala-por-la-mano',
'adios-con-la-hermana', 'coca-cola', 'enchufla', 'tiramisu', 'exhibela',
'vacilala', 'vacilala-los-dos', 'el-uno', 'el-uno-semi-complicado',
'enchufla-al-centro', 'kentucky', 'paseala', 'santiago']` — 21 ids, derived from the
call sheet and from nothing else.

All four at `confidence: 'transcript'`. **All four markers land within 0.9s of the
spoken transition** — this and Class 18 are the best-chaptered classes in the range.

## 21.3 The class clip

There is exactly one `clip`, on `SalsaClass.clip`, not a `ClipPair`.

| | |
|---|---|
| `src` | `/clips/salsa/couples/class-21-demo.mp4` |
| `sourceVideo` | `X7lz-BBMmU8` |
| `start` | **269.30** |
| `end` | **306.60** |
| length | 37.30s |
| `aspect` | `'16/9'` |
| `label` | `'Demo song — densest call stretch'` |
| `confidence` | `'transcript'` |

**Why this window and not the chapter.** The `music` chapter is 44.0–371.0, 327
seconds. That is a video, not a clip; cutting it would just duplicate the class.
So the clip is the 37 seconds where the calls come fastest: `Exhibela.[269.66]` →
`Vacilala.[276.28]` → `Lozo.[278.78]` → `El[284.07] uno.[284.68]` →
`Semicomplicado.[289.02]` → `Complicado[290.74] doble.[291.96]` → `one[304.92]
chukla[305.00] al[305.44] centro.[305.70]` — **seven named moves in 37 seconds**,
which is what this class is *for*.

- Start anchor: previous words end `now.[268.22]` ("I think we went through about
  everything right now."); 269.30 sits before `Exhibela.[269.66]`.
- End anchor: `centro.[305.70]`, then `We'll[307.84] move around a bit`. 306.60 is
  in the gap.

`caveat`: **"There is no slow clip for this class and none should be synthesised.
The class has no `count` chapter — the whole thing is one continuous full-tempo
song. The full demo is 44.0–371.0 and should be reached by deep link, not cut. This
37s window is a sample of the densest calling, not the demo."**

Note the structural wrinkle: because there is no move and therefore no `ClipPair`,
there is no `missingReason` field to put the "no slow clip" fact in. It lives in
this `caveat` instead. See K21-e — **this is recorded, not worked around, and no new
type is proposed for it.**

## 21.4 Call sheet

`CallSheetEntry[]` on `SalsaClass.callSheet`. **30 entries; 24 resolve to a move id;
6 deliberately do not.** `at` is the word-level start of the name itself, not of the
sentence. `call` is verbatim, manglings intact — that is the field's documented
purpose.

**Resolution rule I applied:** resolve only where there is corroborating evidence
beyond phonetic similarity — a clean utterance of the same name elsewhere, an
adjacent call that fixes the reading, or a match against the class descriptions'
move lists in `SALSA_TAB_GOALS.md`. Phonetic resemblance alone leaves `move` unset
and the candidate recorded in `note`. Six entries failed that test and are honest
about it.

| `at` | `call` | `move` | `note` |
|---|---|---|---|
| 66.92 | `Almedio` | — | Probably "al medio". **Class 1's move list is `al centro, arriba, abajo` — there is no "al medio".** He then says "And then basic Alcentro" as a *separate* thing, so this is not simply a mis-hearing of al centro. Unresolved on purpose |
| 72.88 | `And then basic Alcentro.` | `al-centro` | Class 1 |
| 81.14 | `And la cienka.` | `la-chica` | Class 2 |
| 86.00 | `And dico.` | `el-chico` | Class 2 |
| 88.80 | `Plus dos.` | `los-dos` | Class 2. **These three resolve as a set**: they are called consecutively over 7.7s in exactly the order Class 2 teaches them (`la chica, el chico, los dos`). That positional corroboration, not phonetics, is why they are resolved |
| 129.60 | `arinailee` | — | No candidate in any class's move list. Follows 28.6s with no transcript at all. Unresolved |
| 135.60 | `And parcela.` | — | Phonetically close to `Paseala` (Class 12, called cleanly twice later @326.26/@330.40) but nothing corroborates it here. Unresolved; candidate recorded |
| 139.92 | `And dedo.` | `dedo` | Class 18. Clean |
| 149.80 | `Sombrero complicado doble.` | `sombrero-complicado-doble` | Class 16. Clean, in full |
| 161.18 | `I'm going to do short five with my Liza.` | — | Unresolved. "short five" may be the steps course's *Quick 5*; "my Liza" is un-interpretable. Do not guess |
| 187.04 | `Sombrero, just a simple sombrero.` | `sombrero` | Class 9. The "just a simple" is the teacher distinguishing it from the complicado variants — useful, so kept in `call` |
| 198.70 | `Vacilala por la mano.` | `vacilala-por-la-mano` | Class 7. Clean, in full |
| 203.80 | `Adios con la hermana.` | `adios-con-la-hermana` | Class 8. Clean, in full |
| 208.22 | `Coca-Cola.` | `coca-cola` | **Class 13's move is `CocaCola`.** Whisper's hyphenated brand spelling is the mangling; the canonical spelling is Part 2's. Reconcile the id |
| 224.62 | `And who has not known the pain?` | — | Unresolved. Might be a badly mangled *Dile que no* — which is otherwise **never called by name in the whole demo** — but "the pain" makes that a stretch. Do not resolve |
| 237.58 | `Orange chukla.` | `enchufla` | `chukla` = *Enchufla*, corroborated by `one[304.92] chukla[305.00] al[305.44] centro.[305.70]` = *Enchufla al centro* later in the same demo. **"Orange" is unexplained** — Class 10 pairs Enchufla with *alarde*, so it may be that. Resolved to the part that is certain |
| 250.30 | `Piramisu.` | `tiramisu` | Class 15. Corroborated by the clean `Tiramisu[344.08]` later, and `Piramisu` is already in `tiramisu`'s alias list from Class 15 |
| 269.66 | `Exhibela.` | `exhibela` | Class 10. Clean |
| 276.28 | `Vacilala.` | `vacilala` | Class 14. Clean |
| 278.78 | `Lozo.` | `vacilala-los-dos` | "los dos", called 2.5s after a clean `Vacilala.` — i.e. Class 14's `Vacilala los dos`. The adjacency is the corroboration |
| 284.07 | `El uno.` | `el-uno` | Class 5. Clean |
| 289.02 | `Semicomplicado.` | `el-uno-semi-complicado` | Class 17. **Called 4.9s after `El uno.` — which independently corroborates Class 17's canonical name `(El uno) semi complicado`, parentheses and all.** See 21.5 |
| 290.74 | `Complicado doble.` | `sombrero-complicado-doble` | Class 16, abbreviated. Resolved because the full name was called cleanly @149.80 in the same demo |
| 305.00 | `Now fold positions, one chukla al centro.` | `enchufla-al-centro` | Class 4. "fold positions" = closed position; "one chukla" = Enchufla. `at` is the word `chukla`, 305.00 |
| 318.26 | `Kentucky.` | `kentucky` | Class 6. Clean |
| 323.58 | `And a kibala.` | — | Phonetically close to `Exhibela` (called cleanly @269.66) but nothing here corroborates it. Unresolved; candidate recorded |
| 326.26 | `Paseala.` | `paseala` | Class 12. Clean |
| 330.40 | `Paseala.` | `paseala` | Class 12. Clean. Second call, 4.1s later — kept as a separate entry, because the call sheet records *calls*, not moves |
| 344.08 | `Tiramisu one more time.` | `tiramisu` | Class 15. Clean |
| 356.50 | `Santiago.` | `santiago` | Class 19. Clean |

**Excluded from the call sheet, deliberately:** bare counts (`One.` @156.18,
@158.66, @177.20, @184.48; `Six, seven, and one.` @226.76), rhythm vocalisation
(`King. King. King…` @165.58–172.98, `Tink, tink, kum.` @339.12), encouragement
(`Come on, come on.` @213.50, `Hop.` @217.74), and four garbled non-move sentences
(@192.66, @229.30, @231.82, @234.94). None of these is a move call, and standing
caveat 7 says count-along stretches are never treated as content.

**What is missing, and it matters.** Of the ~30 named moves in the course, the demo
calls 21. **`guapea`, `dile que no` and `setenta` are never called by name** —
Guapea and Dile que no because they are the connective tissue between every other
move and go unannounced, Setenta despite being a whole class. Say this on the page:
a viewer who searches the call sheet for "Setenta" and finds nothing should be told
it is danced but not named, not left to conclude it was cut.

## 21.5 What this class confirms about Parts 1–3

Three independent confirmations fall out of the call sheet, which is worth more than
anything else in this class:

1. **`(El uno) semi complicado` (Class 17) is named correctly.** `El uno.` @284.07
   followed by `Semicomplicado.` @289.02 shows the teachers treat "El uno" as the
   optional first half of the name — exactly what the description's parentheses
   encode. My Class 17 naming decision needed this and now has it.
2. **`Piramisu` is a real alias of `Tiramisu`**, not a one-off Whisper slip: it
   occurs in Class 15 *and* here, in a different recording session.
3. **`chukla` is `Enchufla`.** Confirmed inside one sentence by "one chukla al
   centro" matching Class 4's `enchufla al centro`. Add it to the normaliser; it
   will improve Parts 1–2.

## 21.6 One cue, and it belongs to Class 20

Class 21 produces **no cues of its own** — it has no move to hang them on, which is
correct and is not an omission (K21-d). But the outro contains one instruction that
is a genuine addition to Class 20's `release-and-return`, spoken in a different
video, which is exactly what `sourceVideo` on `SalsaCue` is for:

| `id` | `beat` | `role` | `kind` | `text` | `sourceVideo` | `sourceStart` | `verbatim` |
|---|---|---|---|---|---|---|---|
| `rr-release-more-when-improvising` | — | `leader` | `concept` | Put the moves in a different order, and release her more than the demo does. | `X7lz-BBMmU8` | 387.24 | "but you can always put them in different order, you can release your partner a bit more" |

That takes `release-and-return` to 19 cues and Class 20's total to 42.

## 21.7 Class notes

These are the class's real content. All `sourceVideo: 'X7lz-BBMmU8'`.

- **The call sheet's charter, in the teacher's words.** "So I'll keep shouting the
  names of the moves as we dance them." @45.74–48.58.
- **How to open a dance.** "The first section introduction — in real life you could
  just introduce yourself to your partner." @55.56–61.22, then "Now the rhythm
  starts appearing." @62.74, then "The first part of the song is a bit slower, you
  don't have to rush." @75.14–78.90. **This is the only place in the course that
  teaches how to *start* a social dance**, and it is three sentences long.
- **Directions are deliberately not respected here.** "We are not sticking to
  directions. We just try to be in our rectangle. Apart of that, the directions are
  very clear." @92.96–100.78, echoed at "We'll move around a bit, not too much
  because we have to stick to our cameras." @307.84–312.70. Same filming
  constraint as Class 20's "comfortable distance" note.
- **The teacher marks his own mistake on camera.** "And I didn't finish Santiago one
  time." @363.36–365.44, and "I reminded myself about Santiago in the last minute,
  but apart of that I think I use all beginners moves in this song." @371.88–379.40.
  Keep both. A demo that admits an error is more useful than one that claims to be
  clean, and it tells a viewer the Santiago at @356.50 is not a model rep.
- **On repeating and reordering.** "The song was quite long, so if you dance
  fluently you would have to repeat a few of them a couple of times, but you can
  always put them in different order, you can release your partner a bit more."
  @380.90–390.66.
- **The closing thesis of the entire course**, and it is about leading — so it is
  the right thing to put at the end of the couples tab: "Everything depends on you
  and the coolest thing about salsa is that it's improvised. It's built out of
  blocks but it's your own interpretation, it's your own idea in your head. When I
  first saw salsa in my life I was thinking this is impossible because I did a bit
  of ballroom before and I was thinking like, how is this possible that people
  didn't agree for the order of everything before. This is absolutely undoable. And
  then after you learn that you can actually lead and follow, learn all the small
  signals and moves together in-couple, and then it works very very well."
  @392.44–425.32.

## 21.8 Known defects

| Flag | What | What to do |
|---|---|---|
| **K21-a** | **Six of the 30 calls do not resolve to a move**: `Almedio` @66.92, `arinailee` @129.60, `parcela` @135.60, `short five with my Liza` @161.18, `And who has not known the pain?` @224.62, `a kibala` @323.58. | Left with `move` unset and the candidate in `note`. **All six are cheap to resolve** — open the deep link, watch five seconds, see which move is being danced. This is the single highest-value-per-minute review task in Part 3. `arinailee` and `Almedio` are the two that may turn out to be moves the course never named elsewhere. |
| **K21-b** | **28.58 seconds with no transcript at all**, 101.02 → 129.60 — the longest silent stretch found anywhere in Part 3 (Class 18's was 11.4s). Something is being danced and never named. | Not fixable from the transcript. It is also *not* usable as a silent fast clip, because we do not know which move it shows — an unlabelled clip is worse than none. Watch 101–130 and add the missing calls to the call sheet. |
| **K21-c** | **`guapea`, `dile que no` and `setenta` are never called by name** in a demo advertised as containing "all moves we thought you during our course". | Not a data defect — a fact about the demo, and it must be surfaced rather than hidden. Guapea and Dile que no are almost certainly danced repeatedly (they connect everything); Setenta may genuinely have been skipped, which the teacher's own "I think I use all beginners moves" @376.30 only hedges. Confirm by watching, then either add calls or state plainly that Setenta is absent. |
| **K21-d** | **Zero cues from this class.** | Correct, not an omission. There is no move here, so there is nothing for a cue to hang off, and R3's `sourceStart` requirement is about *cues*, not calls. The one instruction worth keeping is `rr-release-more-when-improvising` in 21.6, attached to Class 20's move. |
| **K21-e** | The "there is no slow clip and none should be made" fact has **nowhere structural to live**: `missingReason` is a field on `ClipPair`, and this class has no `ClipPair` because it has no move. | Recorded in the class `clip.caveat` instead. **No new type is proposed** — adding `missingReason` to `SalsaClass` for one class would be worse than a caveat that renders anyway. Flagged so the omission is visibly deliberate. |
| **K21-f** | The 24 resolved calls are a genuine cross-reference (each is a full-tempo, in-context performance of a move) but there is **no `TeachingSource` for them**. | **Do not create 21 `TeachingSource` entries pointing at one 327s video** — it would put a 5-minute "clip" on every move page. Derive the link from `callSheet` at render time instead: on each move's page, show "seen in the Class 21 demo at *m:ss*" for every entry whose `move` matches. No new data, no new types. |
| **K21-g** | Move ids used in the call sheet (`al-centro`, `la-chica`, `el-chico`, `los-dos`, `coca-cola`, `el-uno`, `enchufla-al-centro`, `kentucky`, `paseala`, `vacilala`, `vacilala-los-dos`, `vacilala-por-la-mano`, `adios-con-la-hermana`, `exhibela`, `enchufla`, `sombrero`) **all belong to Parts 1 and 2.** Every one is an assumption about their spelling. | Standing caveat 5: reconcile before writing TypeScript, and let Parts 1–2 win. `coca-cola` is the likeliest mismatch — the description writes it `CocaCola`, one word. A resolved call pointing at a nonexistent id is worse than an unresolved call, so **verify all 24 before shipping**. |
| **K21-h** | The steps-course song flag **C15-a is resolved by this class's description**, but that resolution has not been applied — `SALSA_VERIFICATION_LOG.md` and the steps data still withhold the title. | Set steps Class 15's song to `Mas Bajo - Soy de Tierra y De Mar` and strike C15-a per the log's "How to record a resolution" §, noting the source was Class 21's description rather than a human watching. **This is a free win from Part 3 and it is outside my range — hand it over explicitly.** |

---

# Part 3 totals

| | Count |
|---|---|
| Classes | 7 (15–21) |
| Moves | **9** |
| Moves at `complete: false` | **1** (`el-uno-semi-complicado`, K17-e) |
| Cues | **175** |
| Cues at `kind: 'lead'` | **84** |
| Cues with a `sourceStart` | 175 (mandatory, R3) |
| Cues at `confidence: 'verified'` | **0** |
| Class segments | 61 (9 + 9 + 10 + 9 + 9 + 11 + 4) |
| Segments at `confidence: 'suspect'` | **2** (`c16-count`, `c19-count`) |
| Published clip entries | **19** — 17 distinct files, 2 shared onto `release-and-return` |
| …of which `aspect: '9/16'` (official shorts) | 5 |
| …of which carry a `caveat` | 19 — **every single one** |
| Alternate windows recorded | 10 with their own anchors, plus several rejected windows documented inline |
| Call sheets | 2 — Class 21 (30 entries, 24 resolved) and the proposed second one for Class 17's combo review (K17-g, 12 entries) |
| Known defects | **57** (`K15-a` … `K21-h`) |
| New types proposed | **0** |
| Invented timestamps | **0** |
| Invented move names, aliases or Spanish | **0** |

**Per class:**

| Class | Moves | Cues | of which `lead` | Published clips | Defects |
|---|---|---|---|---|---|
| 15 Tiramisu | 1 | 20 | 13 | 2 | 6 |
| 16 Sombrero complicado doble | 1 | 24 | 15 | 2 | 8 |
| 17 Juana la Cubana + (El uno) semi complicado | 2 | 35 | 19 | 4 | 8 |
| 18 Dedo | 1 | 17 | 10 | 2 | 7 |
| 19 Santiago | 1 | 37 | 19 | 2 | 8 |
| 20 Solo sequence | 3 | 42 | 8 | 6 | 12 |
| 21 All moves demo | 0 | 0 | — | 1 (class-level) | 8 |

Class 20's 42 includes `rr-release-more-when-improvising`, whose source video is
Class 21's.

**The three things a reviewer should do first**, in order of value per minute:

1. **Transcribe the five shorts.** `uv run scripts/transcribe_salsa.py ids
   xwwnWPXpKz8 wAK8hMxwfes B5A2kgjTvnw TM9kP4jy0To vlSqi-msy60` then
   `uv run scripts/normalize_salsa_terms.py`. Five of the 19 published clips are
   currently whole-file windows anchored to nothing but the container duration
   (standing caveat 3, K15-f/K16-h/K17-h/K18-g/K19-h). This is one command.
2. **Watch six five-second windows in Class 21** to resolve K21-a's six unresolved
   calls: 66.9, 129.6, 135.6, 161.2, 224.6, 323.6.
3. **Fix the normaliser** with the confirmed families from K20-c (`Basi Lala` →
   *Vacilala*, 13 variants) and K21-g (`chukla` → *Enchufla*), then re-run it. Both
   are confirmed rather than guessed, and both improve Parts 1 and 2 as well as this
   one.

# Cuban Salsa — Beginners Course for Couples — build spec, **Classes 8–14**

> **Status: decided, not built.** This is the implementation contract for the
> second block of the couples course. Charter: `SALSA_TAB_GOALS.md` (R1–R5 and
> the Non-goals are binding). Deferred plan this discharges: `SALSA_COUPLES_PLAN.md`
> §§2–7. Model for structure and rigour: `SALSA_STEPS_BUILD_SPEC.md` (built and
> shipped). Types: `frontend/src/data/salsa-types.ts` — **unchanged**, see §0.4.
>
> Scope is classes **8, 9, 10, 11, 12, 13, 14** only. Classes 1–7 and 15–21 are
> owned by other passes. Presentation order is playlist order (charter,
> "Decided") — this file is ordered 8 → 14 and must not be regrouped.
>
> Class 11 (Setenta) is the charter's own worked example and the reference
> section: it was authored first and everything else is built to its shape.

---

## 0. Conventions, and the things that apply to all seven classes

### 0.1 Provenance rules (the same rules the steps spec passed on)

Every number in this file is traceable:

| Value | Source |
|---|---|
| segment boundaries | the class's own YouTube chapters (from `<VIDEO_ID>.info.json`'s "Table of contents"), **each one checked against the transcript** — §*n*.2 per class records the disagreements |
| clip windows | word-level timings in `data/cache/salsa/whisper/<VIDEO_ID>.norm.json`. Every boundary quotes the spoken phrase it is anchored to. **No round numbers chosen for tidiness.** |
| cue `sourceStart` | the word-level start of the quoted phrase, not the containing segment's start |
| move names | the class description's "we show and explain how to do:" list, verbatim; chapter titles where the description is terser. Never translated, never invented (R1, Non-goals) |
| aliases | every spelling the description, the chapter titles and the normalised Whisper transcript actually produce |

Timestamps in this file are **seconds with two decimals** and are the numbers to
paste into the data. Where a boundary is a segment end rather than a word start,
the row says so.

### 0.2 Trust grades on clip windows

Same three grades as `SALSA_STEPS_BUILD_SPEC.md` §3:

| | Meaning |
|---|---|
| **A** | Both boundaries land on a word-level timing or a segment boundary. Cut as given. |
| **D** | One boundary anchored, the other derived to end a phrase or clear the next move. Cut as given, eyeball once. |
| **V** | Contains something worth knowing about — see the note. Still cut as given. |

### 0.3 Id conventions — collision-safe against the steps course

The steps data already ships `SALSA_MOVES` with cue ids like `enchufla-1` and
segment ids like `c5-teach-exhibela-footwork`. Two of the moves in this range are
**the same move** as a steps move (`enchufla`, `exhibela-crossing`) and gain a
second `TeachingSource`, so ids must not collide:

| Kind of id | Convention | Example |
|---|---|---|
| Move id | kebab-case, one per move, **reused** when the move already exists | `setenta`, `enchufla` (existing) |
| Class segment id | `cc<N>-<role>-<slug>` — `cc` = *couples class*, so it can never collide with the steps course's `c<N>-…` | `cc11-count-setenta` |
| Cue id, new move | `<move-id>-<n>` | `setenta-4` |
| Cue id, move that already has steps cues | `<move-id>-c<N>-<n>` | `enchufla-c10-1` |
| Clip file | `frontend/public/clips/salsa/moves/<move-slug>-slow.mp4` / `-fast.mp4` | `setenta-slow.mp4` |

### 0.4 The types are sufficient. Three notes, two recommendations.

`frontend/src/data/salsa-types.ts` fits partnerwork as written — `SalsaCue.role`,
`CueKind: 'lead'`, `SalsaClip.aspect: '9/16'`, `TeachingSource`, `composedOf` all
exist and all get used below. **No new types are needed and none are proposed.**
Two things worth stating precisely:

1. **`SalsaMoveKind` has no value that fits a multi-bar partner figure.** Setenta,
   Adios con la hermana, CocaCola and Paseala are not a `step`, a `turn`, a
   `footwork` or a `skill` in the teachers' own sense of those words (the steps
   spec's doc comment defines `footwork` as "a step that breaks the 1-2-3 /
   5-6-7 pattern" and `skill` as "a tool you apply to other steps"). The
   teachers' word is just **"move"** — "Quite often long moves have one name"
   (Class 10 @42.38). **Ship `kind: 'step'` for all of them** so nothing has to
   change to build, and treat `'partner-move'` as a one-line, non-blocking
   follow-up (`SalsaMoveKind = … | 'partner-move'`) if the tab later wants to
   filter partner figures out of the solo drill. Do not block on it.
2. `group` is where the real, *sourced* grouping lives, and it earns its place
   here in a way it did not in the steps course: Class 9 @351.82 —
   "They are all sombrero based moves. Sombrero is a very important ingredient".
   So `group: 'sombrero'` on `sombrero` (and, when classes 16–19 land,
   `sombrero-complicado-doble` and `juana-la-cubana`), `group: 'enchufla'` on the
   Class 10 pair. Grouping is presentation only and never reorders (charter).
3. **`SegmentRole` has no `'angle'`.** The shipped union is
   `'teach' | 'count' | 'music' | 'review' | 'skip'` (5 values); the analysis
   vocabulary in `SALSA_COUPLES_PLAN.md` §2 and `couples_analysis.md` uses 6,
   the extra one being `angle` — and **six of the seven classes in this range
   have one** ("Sombrero - side view", "Setenta - side view", …; Class 14 is the
   exception, see below). This is the one place the source material makes a
   distinction the type cannot hold.

   **Resolved without a type change**, because the distinction is about the
   *camera*, not about what is being taught: map each side-view chapter by what
   it actually contains, keep the chapter title verbatim in `provenance`, and put
   the words "side view" / "second angle" in `label`.

   | Class | Side-view chapter | Content | Shipped `role` |
   |---|---|---|---|
   | 8 | 291–350 | counted reps throughout | `'count'` |
   | 9 | 267–374 | 22% counted reps, then 84s of explanation | `'teach'` |
   | 10 | 231–283, 459–494 | counted reps | `'count'` |
   | 11 | 276–317 | four counted reps | `'count'` |
   | 12 | 431–486 | counted reps | `'count'` |
   | 13 | 398–510 | 28s of counted reps, then 84s of explanation — **split** | `'count'` + `'teach'` |
   | 14 | **none** | the second camera appears only as a `music` chapter (514–544) | `'music'` |

   Segment **ids** below still read `cc9-angle-sombrero` — the id records where
   the segment came from and is stable; the `role` records what it is. Where the
   table below writes `angle` in a Role column it means "`count`, from the second
   camera" and says so.

   Recommendation, non-blocking: add `'angle'` to `SegmentRole`. It is one union
   member and one render branch, it is a real distinction the channel makes
   consistently across 21 classes, and collapsing it into `count` means a class
   ships **two** `count` segments and the "which is the slow demo" choice moves
   out of the data and into the reader's head. Do not block on it; ship the
   mapping above.

### 0.5 The official shorts — one caveat that applies to every `fast` clip below

All seven classes in this range have an official vertical short, so the easy
shape holds: **slow ← the class's `count` chapter, fast ← the short.** But:

- The shorts are **vertical** (`aspect: '9/16'`); the classes are 1920x1080
  (`aspect: '16/9'`). Both are expressed without cropping — `SalsaClip.aspect`
  already carries it and §8.4 of the steps spec already specifies the player
  switch. Cropping two dancers from 16:9 to 9:16 cuts them in half; do not.
  **Correction, measured with `ffprobe`:** all seven downloaded shorts are
  **720x1280**, not 1080x1920 — a lower-resolution rendition than the classes.
  The ratio is exactly 9:16 so nothing about `aspect` changes, but a `fast` clip
  will be visibly softer than its `slow` counterpart. Re-download at a higher
  rendition before publishing if it matters.
- **All seven shorts are now downloaded** (`data/cache/salsa/videos/<ID>.mp4`)
  but **none is transcribed**: `data/cache/salsa/whisper/` still holds 36
  `*.norm.json`, all of them class ids. So for a short the only honest window is
  **the whole file**: `start: 0`, `end: <container duration>`. There is nothing
  inside a short to anchor to. Every `fast` clip cut from a short therefore
  carries this `caveat`:
  > "Whole official short, un-transcribed — no interior boundary could be
  > anchored. Check for an intro title card before publishing."
- Because of that, **every move below also gets a transcript-anchored 16/9 fast
  alternate cut from the class's `music` chapter**, listed in the clip table. If
  a short turns out to open on a title card, publish the alternate instead. This
  is the same "keep the rejected window for review" discipline as the steps
  course's `alternates`.

Short durations, **container-exact** (`ffprobe -show_entries format=duration` on
`data/cache/salsa/videos/<ID>.mp4`) — the `end` of every short-derived clip below
is one of these numbers, not a rounded one:

| Class | Short | Duration | Dimensions |
|---|---|---|---|
| 8 | `JkwUzKb_X-8` | **37.594** | 720x1280 |
| 9 | `Nl714zi8W-A` | **33.474** | 720x1280 |
| 10 | `fNXwnQuVdEI` | **45.734** | 720x1280 |
| 11 | `TyOHtkirh_g` | **44.574** | 720x1280 |
| 12 | `UsvPdXW4-O4` | **30.954** | 720x1280 |
| 13 | `7MODqLfyTQQ` | **23.794** | 720x1280 |
| 14 | `c0H4GQnYjNE` | **22.634** | 720x1280 |

### 0.6 Course-wide defects in this range (`COURSE_FLAGS` candidates)

| Flag | What |
|---|---|
| **GC-a** | **The normalizer does not normalise `Vacilala`.** Class 14's transcript contains `Basila la`, `Basilala`, `Basile`, `Basilela`, `Basi la la`, `Vasila la`, `Vasila`, `Basila` and **zero** occurrences of `Vacilala`. It also contains `Basila La Por La Mano` / `Basilala por la mano`, which is a **different move** (taught outside this range) whose mangled name has the mangled `Vacilala` as a prefix — see K14-e. This is exactly the Class-5 `exibela` failure the charter describes, unfixed: without aliases, the move Class 14 teaches is unfindable by name and **R1 breaks**. Aliases below cover it for search; `scripts/normalize_salsa_terms.py`'s `ALIASES` must also gain them (§0.7). |
| **GC-b** | `Dile que no` is transcribed as `D like an O`, `D-le-ke-no`, `dilekano`, `delay cano`, `Dilek Enot`, `be like a no`, `deep renangu` and a dozen more. It is referenced constantly in this range (every one of the seven moves starts or ends with it) but is **taught in Class 3**, outside this range. Cues here quote it; the move id `dile-que-no` is assumed to be Part 1's. |
| **GC-c** | Several `music` chapters are flagged by the analysis as heavily counted (Class 12 ch6 at 58%, Class 13 ch6 at 62%). The teachers count *over* the music, so a "fast" clip from those chapters is not a silent demo. Noted per clip. |
| **GC-d** | `angle` chapters in this course are **not** throwaway: in classes 8, 9 and 10 the counted demo continues straight through the chapter boundary into the "side view" chapter. Three slow clips below deliberately cross that boundary. A camera change mid-clip is acceptable; losing half the counted demo is not. |
| **GC-e** | Move ids referenced but taught outside this range: `guapea`, `dile-que-no`, `la-chica`, `el-chico`, `los-dos`, `el-uno`, `kentucky`, `vacilala-por-la-mano`, `enchufla-al-centro`, `al-centro`, `arriba`, `abajo`, `tiramisu`. **This spec assumes those exact kebab-case ids.** If Part 1 or Part 3 chooses differently, the `composedOf` and `base` edges below need renaming — nothing else. |
| **GC-f** | **Every `skip` outro in this range contains real content before the channel boilerplate**, and the analysis's `skip` role invites throwing all of it away. Measured: the gap between the "Summary / Outro" chapter start and the first "like, subscribe" is **86s** (C8, 506→592.36), **105s** (C9, 445→550.06), **17s** (C10, 721→738.32), **65s** (C11, 503→568.44), **49s** (C12, 650→699.34), **27s** (C13, 682→708.63) and **66s** (C14, 629→694.76). Not all of it is instruction, but some of it is: C9 @454.90 is a technique correction ("so many people try to speed it up and swap hands before they start… No, we don't want that. We want to develop order of movement… you have your arms under control while making steps"), C11 @543.14 is R3 stated by the teachers, and C14 @629.86 is the only argument in the class for why Vacilala matters. | **Resolved for Classes 11 and 14** (§11.6 / K11-f, and `cc14-outro-why` / K14-d) because those two are load-bearing: 11 is the reference class and 14's outro is its only "why". **Not resolved for Classes 8, 9, 10, 12, 13** — the windows are listed above so the work is a bounded read, not a search. This flag exists because the alternative was to leave the false impression that `skip` means empty. The C9 passage is the one most likely to yield a cue; **do that sweep before shipping**, and treat it as a defect in the analysis vocabulary (a `skip` chapter that teaches) rather than in the classes. |

### 0.7 Alias additions for `scripts/normalize_salsa_terms.py`

Fold these into `ALIASES` so future transcription passes resolve them. The data
files below are authoritative for *search*; the normalizer keeps future
transcripts clean (same split as `SALSA_STEPS_BUILD_SPEC.md` §7.4).

| → canonical | Whisper produced |
|---|---|
| Vacilala | `Basila la`, `Basilala`, `Basilela`, `Basile`, `Basila`, `Vasila la`, `Vasila`, `Basi la la` |
| Vacilala por la mano | `Basila La Por La Mano`, `Vasile Lepore Lamanu`, `Basila La Porla Mano`, `Basile La Porte La Mano`, `Basilola por la mano` |
| Vacilala los dos | `Basila Los dos`, `Basila la Los Dos`, `Vasila la lo dos`, `basi la la los dos` |
| Dile que no | `D like an O`, `D-le-ke-no`, `dilekano`, `delay cano`, `Dilek Enot`, `Dilek Enon`, `be like a no`, `bile cano`, `die le que no`, `deep renangu`, `D-Lek-N-O`, `leconal` |
| Setenta | `set and a hop`, `set and the hop`, `set and one` |
| Sombrero | `sombrero complicato doble` *(the channel writes `Sombrero complicado doble`)* |
| Paseala | `passe alla`, `Passe alla`, `Pasa Yala` *(already surfaced by the steps pass)* |
| Exhibela | `Xebala`, `Xibala`, `egzibela`, `Exhibela Step` |
| Alarde | `a larde`, `allarde`, `Alander`, `a lard`, `alar de`, `lardegzibela` |
| Enchufla | `and two flat`, `two fladoble`, `and ciufla`, `to fly`, `and two fly` |
| CocaCola | `Coca-Cola` *(the channel writes `CocaCola`; keep both searchable)* |
| Adios con la hermana | `adios con hermana`, `Adios prima con la hermana` |

---

## Class 8 — Adios con la hermana  ·  `X4Sr8QbXQLU` · 10:05 (605s) · 8 chapters · short `JkwUzKb_X-8` (38s)

### 8.1 Move index — 2 moves

The description lists one move. The class teaches **two**, and the second one is
the most reused element in this whole range.

#### `adios-con-la-hermana`

| Field | Value |
|---|---|
| `id` | `adios-con-la-hermana` |
| `name` | **`Adios con la hermana`** — the video title and the chapter titles. The description writes `adios (prima) con la hermana`; the parenthesis is the alias, not part of the name (R1) |
| `aliases` | `['Adios con la hermana', 'adios con hermana', 'Adios prima con la hermana', 'Adios', 'adios', 'Prima', 'prima']` |
| `kind` | `'step'` (§0.4) |
| `summary` | "From Guapea, walk around each other into each other's right side, rotate 180 to the right, come out from under the hand on 7, and finish through Enchufla Mix." |
| `footwork` | "From Guapea, on 1 come closer: three steps starting back, towards each other, then two steps forward, landing next to each other on each other's right side. Continue forward — she goes front with the left, you go front with the right — rotating 180 degrees to the right as you go. On the last step, 7, come out from under the hand and rotate towards her. Finish with Enchufla Mix into Dile que no, and land in the same position you started from." |
| `base` | `guapea` |
| `composedOf` | `['guapea', 'enchufla-mix', 'dile-que-no']` |
| `complete` | `true` |
| `flags` | `['K8-a', 'K8-b']` |

The alias list is load-bearing here and is **stated on camera** — this is the
clearest R1 justification anywhere in the course:

> "First thing I should mention here is that Adios quite often is named
> differently in different places around the world. So you can find the name
> Prima and it's exactly the same move, but we are used to Adios. So this is how
> it's going to be." — @62.12

#### `enchufla-mix`

| Field | Value |
|---|---|
| `id` | `enchufla-mix` |
| `name` | **`Enchufla Mix`** — "the part that **we like to call Enchufla Mix**" @155.04. The teachers' own naming, so R1 is satisfied; the description omits it entirely |
| `aliases` | `['Enchufla Mix', 'enchufla mix', 'mix', 'Enchufla Tiki Mix', 'and mix mix mix']` |
| `kind` | `'skill'` — the type's own definition is "a tool you apply to other steps", which is exactly what this is: it is the ending of Adios con la hermana (Class 8), the ending of Setenta (Class 11), and the *entry* to Paseala (Class 12 @316.28) and CocaCola (Class 13 @522.72) |
| `group` | `'skills'` |
| `summary` | "The three-step swap where the leader circles the joined hand round both hips while she turns under it — the course's first real leading-and-following exercise." |
| `footwork` | "You swap places in three steps as usual (5-6-7 / 1-2-3). Leader: three steps in a spot on 1-2-3, then rotate. Follower: three steps starting with the left — open with the left, a small cross, then join the legs together — rotating your body to the front. Finish with Dile que no." |
| `composedOf` | `['enchufla']` — "We swap places in three steps as usual" @166.50 |
| `complete` | `true` (fast clip is shared — see §8.3) |
| `flags` | `['K8-b']` |

**Why this is a move and not a paragraph of `footwork` on Adios.** Four reasons,
all sourced: the teachers name it explicitly; they spend 111 seconds (155–266) on
it with the partner *frozen* so the hand is visible; they call it the moment
leading starts — "This enchufla mix part is one of the first elements when we
teach beginner's course, when we notice that guys start leading and girls start
following" (@230.62); and it recurs by name in classes 10, 11, 12 and 13. There
is direct precedent for indexing an element the description omits:
`SALSA_STEPS_BUILD_SPEC.md` §7.1 does it for `step-in-a-spot` (flag G4). Ship the
same honest note on the page: *named by the teachers, absent from the class
description's move list.*

### 8.2 Segment map — 8 chapters, all 8 checked

`chaptered: true`.

| id | start | end | role | label | moves | provenance | checked against |
|---|---|---|---|---|---|---|---|
| `cc8-intro` | 0.00 | 18.00 | `skip` | Intro | — | chapter "Intro" | — |
| `cc8-about` | 18.00 | 59.00 | `skip` | About this class | — | chapter "About this class" | — |
| `cc8-teach-adios` | 59.00 | 269.00 | `teach` | Adios & Adios con la hermana — presentation & explanation | `adios-con-la-hermana`, `enchufla-mix` | chapter "Adios & Adios con la hermana - presentation & explanation" | **agrees.** "Let's start" lands inside the 56.50 segment; "Adios quite often is named differently" @62.12 |
| `cc8-count-adios` | 269.00 | 291.00 | `count` | Adios con la hermana — fluently with count | `adios-con-la-hermana` | chapter "Adios con la hermana - fluently with count" | **agrees.** "so now we'll do whole adios con la hermana from Guapea" @269.96 |
| `cc8-angle-adios` | 291.00 | 350.00 | `count` *(second camera, §0.4 n3)* | Adios con la hermana — side view | `adios-con-la-hermana` | chapter "Adios con la hermana - side view" | **boundary agrees, label does not.** @290.88 the teachers say "We'll do the same **from the front angle**". See K8-a |
| `cc8-music-adios` | 350.00 | 431.00 | `music` | Adios con la hermana — with music | `adios-con-la-hermana` | chapter "Adios con la hermana - with music" | **agrees.** "We'll do the same with music" @344.80, music rep starts "We start with Guapea" @349.92 |
| `cc8-review-music` | 431.00 | 506.00 | `review` | Review with music | — | chapter "Review with music" | **agrees.** "And now everything from top." @430.88, "From the beginning of our course, all moves." @433.42. `reviewsEarlierMoves: true` |
| `cc8-outro` | 506.00 | 605.00 | `skip` | Summary / Outro | — | chapter "Summary / Outro" | — |

`TeachingSource`s:

- `adios-con-la-hermana` → `{ classNumber: 8, teachStart: 59.0, segmentIds:
  ['cc8-teach-adios', 'cc8-count-adios', 'cc8-angle-adios', 'cc8-music-adios'] }`
- `enchufla-mix` → `{ classNumber: 8, teachStart: 153.52, segmentIds:
  ['cc8-teach-adios'], note: 'Taught inside the Adios teach block from 153.52 ("We finish with the part that we like to call Enchufla Mix"); it has no chapter of its own.' }`

`cc8-review-music` is a course-wide recap (la chica, el chico, los dos, Dile que
no, El uno, Kentucky, Vacilala por la mano, Adios con la hermana, Enchufla triple,
al centro) — `moves: []`, `reviewsEarlierMoves: true`, and **not** a
`TeachingSource` for any of them (steps spec G3 precedent: a call is not a
teaching source).

### 8.3 Clip windows

**`adios-con-la-hermana` slow — `adios-con-la-hermana-slow.mp4`, 273.26 → 313.08 (39.82s), `X4Sr8QbXQLU`, `16/9`, trust A**

| Boundary | Anchored to | At |
|---|---|---|
| in | "…so now we'll do whole adios con la hermana **from Guapea**" — word end, immediately before the count-in "Five, six, seven, chick chick, cuckoo" @275.16 | **273.26** |
| out | "**Adios** con la hermana." — word start of the announcement of a *third* rep, after "One more time the same" @311.42 | **313.08** |

Two complete counted reps: the back-angle rep (273.26–290.88) and the
front-angle rep (290.88–311.42, "Five, six, seven, Guapea. One, two, three. Adios
con la hermana. One, two, come closer. Walk, walk, get out. And Enchufla. Mix,
mix, mix, mix. And delay cano hop.").

`caveat`: *"Crosses the 291.0 chapter boundary on purpose (GC-d) — the camera
changes mid-clip and the second rep is called with words rather than numbers.
The chapter is titled 'side view' but the teachers announce 'the front angle'
(K8-a)."*

**`adios-con-la-hermana` fast — official short `JkwUzKb_X-8`, 0 → 37.594, `9/16`, trust D.** §0.5 caveat.

**fast alternate (16/9)** — `X4Sr8QbXQLU` **358.04 → 398.80** (40.76s), trust A.
In: "Five, six, seven and adios con la hermana" @358.04. Out: "Ok and different
angle" @398.80. Caveat: 41% count density — the teachers call numbers over the
music ("With all numbers" @375.42), so this is not a silent demo (GC-c).

**`enchufla-mix` slow — `enchufla-mix-slow.mp4`, 208.68 → 230.62 (21.94s), `X4Sr8QbXQLU`, `16/9`, trust V**

| Boundary | Anchored to | At |
|---|---|---|
| in | "**We'll do it fluently, just the enchufla mix part.**" — the teachers isolating exactly this element | word start **208.68** |
| out | segment start of "This enchufla mix part is one of the first elements when we teach beginner's course" — the demo has stopped and the commentary has started | **230.62** |

`caveat`: *"21.9s, just under the 23s reference floor. The first ~8s is the fluent
demo; from 216.76 the teacher describes her steps over it ('open with the left,
then small cross, and then joining legs together') and ends on 'We finish with
Dile que no'. It is the only isolated demo of the Mix in the course."*

**`enchufla-mix` fast — `adios-con-la-hermana-fast.mp4` (`shared: true`), 0 → 37.594, `9/16`, trust D**

`label`: *"Class 8 short — Enchufla Mix is the ending of Adios con la hermana."*
There is no isolated full-tempo Mix anywhere in the course, so sharing the
parent move's clip and saying so is the honest option; inventing a window is not.
Exact precedent: `left-turn-side` shares `right-turn-side-fast.mp4` in
`SALSA_STEPS_BUILD_SPEC.md` §3.2 row 4.

**`enchufla-mix` fast alternate (16/9, review only)** — `X4Sr8QbXQLU`
**406.18 → 417.86** (11.68s), trust A: "Adios con la hermana" @406.18 →
"One more time from the same perspective" @417.86, containing "Closer around get
out to the left and to fly hop **mix mix mix**" @408.06 — the Mix called by name
at tempo. Far too short to publish; kept because it is the only place the Mix is
named over music.

### 8.4 Lead cues — 20 cues, **7 of them `kind: 'lead'`**

All `sourceVideo: 'X4Sr8QbXQLU'`, all `confidence: 'transcript'` unless stated.

`adios-con-la-hermana` — 9 cues, 1 `lead`:

| id | beat(s) | role | kind | text | verbatim | sourceStart |
|---|---|---|---|---|---|---|
| `adios-con-la-hermana-1` | — | `both` | `context` | "Adios is called Prima in some places — same move, different name. This channel says Adios." | "Adios quite often is named differently in different places around the world. So you can find the name Prima and it's exactly the same move, but we are used to Adios." | 62.12 |
| `adios-con-la-hermana-2` | 1 | `both` | `footwork` | "Come closer: three steps starting back, towards each other." | "Adios con la hermana, come closer. Step back, front, towards each other. Three steps starting back and then two steps forward." | 129.28 |
| `adios-con-la-hermana-3` | 5, 6 | `both` | `footwork` | "Then two steps forward — you land next to each other." | *(same sentence)* "Three steps starting back and then two steps forward. We are landing next to each other." | 131.28 |
| `adios-con-la-hermana-4` | — | `both` | `concept` | "You end up on each other's right side." | "We are on each other's right side." | 134.04 |
| `adios-con-la-hermana-5` | 5 | `leader` | `footwork` | "Go front with your right." | "She goes front with the left, I go front with the right." | 140.16 |
| `adios-con-la-hermana-6` | 5 | `follower` | `footwork` | "She goes front with her left." | "She goes front with the left, I go front with the right." | 138.36 |
| `adios-con-la-hermana-7` | 5, 6, 7 | `both` | `footwork` | "Rotate 180 degrees to the right and keep going forward." | "We rotate 180 degrees to the right, continue forward. Five, six and on the last step seven…" | 141.54 |
| `adios-con-la-hermana-8` | 7 | `leader` | **`lead`** | "On the last step, seven, come out from under the hand and rotate towards her." | "Five, six and on the last step seven I get out underhand and I rotate towards Ola." | 147.26 |
| `adios-con-la-hermana-9` | — | `both` | `concept` | "Finish in the same position you started. Landing opposite means you lacked dynamics walking around each other." | "The last thing to pay attention is to finish at the same position as we started. Yeah, you don't want to finish opposite. Finishing opposite would happen because of the lack of dynamics when you walk around each other." | 323.76 |

`enchufla-mix` — 11 cues, 6 `lead`:

| id | beat(s) | role | kind | text | verbatim | sourceStart |
|---|---|---|---|---|---|---|
| `enchufla-mix-1` | — | `both` | `context` | "The ending of Adios con la hermana is the part the teachers call Enchufla Mix." | "From here we finish with the part that we like to call Enchufla Mix." | 153.52 |
| `enchufla-mix-2` | 5 | `both` | `footwork` | "Swap places in three steps, as usual." | "How does Enchufla Mix work? We swap places in three steps as usual. 5-6-7-1-2-3." | 166.50 |
| `enchufla-mix-3` | — | `leader` | **`lead`** | "Circle the joined hand: towards her right hip, then towards your own right hip, then back to hers — a full circle." | "Hand goes towards her right hip then towards mine right hip and comes back to hers to make that full circle." | 179.26 |
| `enchufla-mix-4` | — | `follower` | **`lead`** | "Relax that arm and the circle does not turn you. Tense it and your body starts rotating — that tension is the turn." | "But obviously now she relax her arm. If she didn't relax it and if she tense her arm obviously she would start rotating her body." | 187.74 |
| `enchufla-mix-5` | 1, 2, 3 | `leader` | `footwork` | "Three steps in a spot, then rotate." | "At the same time I will make three steps in a spot. One, two, three, rotate." | 197.00 |
| `enchufla-mix-6` | 1 | `follower` | `footwork` | "Three steps starting with the left, rotating your body to the front." | "So Ola is doing three steps starting with the left and rotating her body to the front." | 203.04 |
| `enchufla-mix-7` | 1, 2, 3 | `follower` | `footwork` | "Open with the left, then a small cross, then join the legs together." | "It's like open with the left, then small cross, and then joining legs together." | 219.16 |
| `enchufla-mix-8` | — | `both` | `footwork` | "Finish with Dile que no." | "We finish with Dilek Enot. One, two, three, and five, six, seven." | 224.00 |
| `enchufla-mix-9` | — | `both` | `concept` | "This is where leading and following actually start — it's the first element where every partner feels different." | "This enchufla mix part is one of the first elements when we teach beginner's course, when we notice that guys start leading and girls start following. Because you will notice that every person you're dancing with is mixing slightly different." | 230.62 |
| `enchufla-mix-10` | — | `leader` | **`lead`** | "Her steps are only approximately open-cross-together. Lead it more dynamically and she rotates straight away, without time to cross." | "So you think like, oh, that's why we said the steps are around open cross together. If somebody leads a bit more dynamically, I can lead you a bit more dynamically. So she didn't have time to cross, I rotated her straight away." | 248.76 |
| `enchufla-mix-11` | — | `follower` | **`lead`** | "Dance the arm — respond to what the lead actually does, not to a fixed step count." | "And then obviously she's dancing her arm and she's responding to this lead." | 262.52 |

`enchufla-mix-3` is the single most valuable cue in Class 8 and is the reason the
tab exists: it is said **once**, with the partner deliberately frozen so the hand
is visible ("Let's just show the hand because if we start moving then the hand
will be not visible" @174.70), and never repeated.

`enchufla-mix-3` ships at `confidence: 'transcript'` with a `warning`:
*"'towards mine right hip' is garbled; the hip is the leader's own. Which hand is
never named — it is the joined hand (his left to her right). Verify at 174–184."*
Flag `K8-c`.

### 8.5 Known defects — Class 8

| Flag | Defect | What to do |
|---|---|---|
| **K8-a** | Chapter 5 is titled **"Adios con la hermana - side view"** but @290.88 the teachers say "We'll do the same **from the front angle**". The boundary is right; the label is wrong (or at least contradicted on camera). | Keep the chapter title as `provenance` — that is what `provenance` is for — but set `label: 'Adios con la hermana — second angle'` and `warning: 'Chapter says "side view"; the teachers say "from the front angle" @290.88.'`, `confidence: 'suspect'` on the segment. The slow clip crosses this boundary and repeats the note in its `caveat`. |
| **K8-b** | The class also demonstrates plain **Adios** — the rueda partner change — and then explicitly declines to teach it: "We are not showing you that in details because we can't arrange it in Rueda yet. And obviously you wouldn't be able to dance at home in exactly this way." (@102.46). | **Not a move.** A `notes` entry on `adios-con-la-hermana`: `{ text: 'Plain Adios is the rueda partner change — release your partner, walk, and Dile que no with the next one. Demonstrated @82.86 but deliberately not broken down: it needs a rueda.', sourceVideo: 'X4Sr8QbXQLU', sourceStart: 76.38 }`. Same treatment as Class 1's "transitions" in the steps spec. Inventing an `adios` move id here would ship a permanent R2 violation (no counted window can ever exist for it). |
| **K8-c** | @181.16 "then towards **mine** right hip" — grammatically broken, and the hand is never named. | `warning` on `enchufla-mix-3` (§8.4). Do not silently rewrite it to "my left hand"; the transcript does not say "left". |
| **K8-d** | The `review` chapter (431–506) calls eleven earlier moves in 75 seconds, several with manglings the normalizer missed ("Cun cun, bing", "la Cica, ten for a girl", "Basila la por la mano" as "Vacilala por la mano" — correct here). | `moves: []` on the segment, `reviewsEarlierMoves: true`. Optionally a `CallSheetEntry[]`-shaped list on the class, exactly as Class 15 of the steps course has: @435.98 "La chica", @438.52 "El chico", @442.46 "Los dos", @444.64 "Die le que no", @446.42 "la chica hop el uno", @453.x "Kentucky", @470.64 "Vacilala por la mano", @477.72 "adios con la hermana", @486.66 "Enchufla triple", @488.64 "All center" *(al centro)*. **Not** teaching sources (steps G3). |

## Class 9 — Sombrero  ·  `lV56IVufYOU` · 9:26 (566s) · 7 chapters · short `Nl714zi8W-A` (34s)

### 9.1 Move index — 1 move

One move, and the description and the class agree for once. But it is the
densest class in the range: 26 cues, 8 of them `kind: 'lead'`, because Sombrero
*is* a hand move — the footwork is explicitly borrowed from an earlier class and
everything new is in the arms.

| Field | Value |
|---|---|
| `id` | `sombrero` |
| `name` | **`Sombrero`** — title, description and chapter titles all agree |
| `aliases` | `['Sombrero', 'sombrero']` |
| `kind` | `'step'` (§0.4) |
| `group` | **`'sombrero'`** — the one grouping in this range that is stated on camera: "**They are all sombrero based moves.** Sombrero is a very important ingredient, very important package when you are learning how to dance cuban salsa." @353.08 |
| `summary` | "Vacilala por la mano's footwork with a two-handed hat: pull her across, swap her to your right hand palm-to-palm, feed the second hand underneath, and turn her under both." |
| `footwork` | "Identical to Vacilala por la mano for both roles — that is the point of the class. Start from Guapea. She goes forward, front, front, then opposite, inside, outside, outside, travelling from your left side to your right; you keep six steps going in a spot. Finish with Dile que no." |
| `base` | `guapea` |
| `composedOf` | `['guapea', 'dile-que-no']` — "We are starting from Guapea, we are finishing with Dile Queno, the same as Basila La Porla Mano" @91.82 |
| `complete` | `true` |
| `flags` | `['K9-a', 'K9-c', 'K9-e']` |

**The alias list is genuinely two entries, and that is a finding, not laziness.**
Whisper renders "sombrero" correctly at all 14 occurrences in this class — no
mangling to alias. Compare `vacilala-por-la-mano`, which appears in this same
class as **"Basila la por la mano"** (@46.88), **"Vasile Lepore Lamanu"**
(@63.04) and **"Basila La Porla Mano"** (@89.30): three spellings, zero correct.
That contrast is the whole argument for §0.7 and for R1 — see GC-a.

`notes` on the move:

```ts
notes: [
  { text: 'The teachers\' own shorthand call for the hands, said once over the '
        + 'fluent demo: "Hop and pull. Pull, swap, give second. Around and '
        + 'around." Audible inside the slow clip.',
    sourceVideo: 'lV56IVufYOU', sourceStart: 210.44 },
  { text: 'Sombrero complicato, Sombrero complicato doble, Juana la Cubana and '
        + 'Montana are all built on this move; complicato doble is the one that '
        + 'needs both hands free, which is why the follower waits to lift hers.',
    sourceVideo: 'lV56IVufYOU', sourceStart: 325.60 },
]
```

The first is deliberately a note and **not** a cue: it is a compressed restatement
of `sombrero-6`, `-7` and `-8` and shipping it as a fourth cue would put the same
action in the drill four times.

### 9.2 Segment map — 7 chapters, all 7 checked

`chaptered: true`.

| id | start | end | role | label | moves | provenance | checked against |
|---|---|---|---|---|---|---|---|
| `cc9-intro` | 0.00 | 18.00 | `skip` | Intro | — | chapter "Intro" | — |
| `cc9-about` | 18.00 | 47.00 | `skip` | About this class | — | chapter "About this class" | — |
| `cc9-teach-sombrero` | 47.00 | 250.00 | `teach` | Sombrero — presentation & explanation | `sombrero` | chapter "Sombrero - presentation & explanation" | **agrees.** "and dance with us sombrero. Let's go." @43.32, "If you've done already Basila la por la mano, learning sombrero will be very very simple" @46.88 |
| `cc9-count-sombrero` | 250.00 | 267.00 | `count` | Sombrero — fluently with count | `sombrero` | chapter "Sombrero - fluently with count" | **boundary is late.** "One more time **fluently** sombrero" @249.60 matches the chapter title almost to the word — but the counted demo it belongs to started at **234.94**, 15s earlier, inside the `teach` chapter. See K9-a |
| `cc9-angle-sombrero` | 267.00 | 374.00 | `teach` *(second camera, §0.4 n3)* | Sombrero — side view | `sombrero` | chapter "Sombrero - side view" | **boundary agrees, content does not.** "We'll do the same from **different perspective**" @264.36 (note: "different perspective", not "side"). But only 267–290 is a demo; 289.98–374 is 84 seconds of fresh teaching. Shipped as `teach`, not `count`. See K9-e |
| `cc9-music-sombrero` | 374.00 | 445.00 | `music` | Sombrero — with music | `sombrero` | chapter "Sombrero - with music" | **agrees.** "We'll do everything with music." @371.28, first speech inside the chapter @381.94 |
| `cc9-outro` | 445.00 | 566.00 | `skip` | Summary / Outro | — | chapter "Summary / Outro" | — |

`TeachingSource`: `sombrero` → `{ course: 'couples', classNumber: 9, videoId:
'lV56IVufYOU', teachStart: 47.0, segmentIds: ['cc9-teach-sombrero',
'cc9-count-sombrero', 'cc9-angle-sombrero', 'cc9-music-sombrero'] }`.

Class 9 has **no `review` chapter** — the only class in this range without one.
Do not synthesise one from the outro.

### 9.3 Clip windows

**slow — `sombrero-slow.mp4`, 234.94 → 264.36 (29.42s), `lV56IVufYOU`, `16/9`, trust A**

| Boundary | Anchored to | At |
|---|---|---|
| in | word start of "**Five**" in "…her arm up goes on three as well. **Five six seven**, one two sombrero" — the count-in to the first fluent rep, 0.7s after the arm-timing explanation ends (@234.22 "well.") | **234.94** |
| out | word start of "**We'll** do the same from different perspective" — the announcement of the camera change | **264.36** |

Three complete counted reps (236.90–248.70, 252.64–256.26, 257.36–263.64) plus
the "One more time fluently sombrero" call at @249.60.

`caveat`: *"Starts 15s before the 'fluently with count' chapter, inside the teach
block: the chapter begins mid-demo (K9-a). The teachers' shorthand — 'Hop and
pull. Pull, swap, give second' — is audible over the first rep."*

Why not the chapter as published (250.0 → 267.0)? It is **17 seconds**, it opens
mid-count, and it ends 2.6s into the next announcement. It is the weakest `count`
chapter in the range. The 29.4s window above is the same demo, whole.

**fast — official short `Nl714zi8W-A`, 0 → 33.474, `9/16`, trust D.** §0.5 caveat.

**fast alternate (16/9)** — `lV56IVufYOU` **372.66 → 400.86** (28.20s), trust A.
In: word end of "We'll do everything with **music.**" @372.66. Out: word start of
"**short** but not so easy" @400.86. The first 9.3s (372.66–381.94) is silent
dancing to music — the only stretch of un-narrated full-tempo Sombrero in the
class. Caveat: *"From 381.94 the teachers vocalise the rhythm ('king king pa')
and from 391.62 call every number over the music ('with all numbers go') — 32%
count density, not a silent demo (GC-c)."*

**slow alternate (16/9, review only)** — `lV56IVufYOU` **267.14 → 289.98**
(22.84s), trust A: word end of "different **perspective**" @267.14 → word start
of "**Last** two things that I have to mention" @289.98. Two counted reps from the
second camera, with "Girls, front, front opens" @283-ish called over the second.
Kept as an alternate rather than published because the framing is unverified and
the chapter title ("side view") is not what the teachers say ("different
perspective").

### 9.4 Lead cues — 26 cues, **8 of them `kind: 'lead'`**

All `sourceVideo: 'lV56IVufYOU'`, all `confidence: 'transcript'` unless stated.

| id | beat(s) | role | kind | text | verbatim | sourceStart |
|---|---|---|---|---|---|---|
| `sombrero-1` | — | `both` | `context` | "If you have Vacilala por la mano, Sombrero is easy — same footwork, different hands." | "If you've done already Basila la por la mano, learning sombrero will be very very simple." | 46.88 |
| `sombrero-2` | 1 | `follower` | `footwork` | "Her steps are exactly Vacilala por la mano: forward, front, front, then opposite, inside, outside, outside." | "Steps from girl perspective are exactly the same as Vasile Lepore Lamanu. So she goes forward, front, front, opposite, inside, outside, outside" | 59.24 |
| `sombrero-3` | — | `leader` | `footwork` | "Your six steps don't change. Keep the feet moving in a spot — don't stomp." | "You would say it kind of boring, but it is very important that you keep moving your feet and not to keep stomping even if it's in a spot." | 83.48 |
| `sombrero-4` | — | `both` | `concept` | "She travels from your left side to your right, as in Vacilala por la mano." | "She's traveling from my left to my right like in Basila La Porla Mano." | 87.90 |
| `sombrero-5` | — | `both` | `concept` | "Start from Guapea, finish with Dile que no." | "We are starting from Guapea, we are finishing with Dile Queno, the same as Basila La Porla Mano." | 91.82 |
| `sombrero-6` | — | `leader` | **`lead`** | "Pull her with your left hand, then instantly swap her to your right." | "I'm pulling her with my left and instantly swapping to the right." | 102.02 |
| `sombrero-7` | — | `leader` | **`lead`** | "As the right hand takes over, turn the thumb to the bottom so you meet palm to palm." | "When I pass the right hand, it goes with the thumb to the bottom. So we're like palm to palm." | 106.44 |
| `sombrero-8` | — | `leader` | **`lead`** | "Offer the second hand underneath, then take both hands up." | "I offer second hand on the bottom and now with two hands up she's making loop" | 114.68 |
| `sombrero-9` | — | `follower` | `arms` | "With both hands up, keep looping to the right." | "now with two hands up she's making loop loop loop loop" | 116.90 |
| `sombrero-10` | — | `leader` | `arms` | "Land your right hand on top of her right shoulder and your left on top of your own left." | "we're finishing with the right hand on top of her right shoulder and left on top of my left" | 123.04 |
| `sombrero-11` | — | `leader` | `concept` | "This is not the El Uno hand setup: here your hand lies on top and hers underneath — not a natural position for her." | "Now you could say aha we know that from El Uno and that's not true because this hand setup is different than in El Uno. Now my hand is lying on top, her hand is on the bottom. This is not natural position." | 131.28 |
| `sombrero-12` | 5 | `follower` | **`lead`** | "Because her hand is trapped underneath, she has to free it during Dile que no." | "So when we continue with Dilek Enon she has to do something to get the hand out." | 140.70 |
| `sombrero-13` | — | `follower` | `arms` | "Free it palm first: fingers and palm lead upward, elbow stays down, then straighten the arm." | "She's going with her left hand up, but she's starting with her fingers, with her palm. So palm is going up, elbow is staying down, and then she's straightening it up." | 149.42 |
| `sombrero-14` | — | `follower` | `styling` | "Middle finger and thumb close together, the rest naturally spread — like holding an egg." | "so middle finger and thumb are getting quite close to each other, the rest of the fingers are spread but nothing crazy, quite natural position" | 164.32 |
| `sombrero-15` | — | `follower` | `styling` | "Don't tense it. Tilt the hand outward, just a bit." | "don't tense it quite relaxed position and this hand tilt or bend is outside. Just a bit." | 189.84 |
| `sombrero-16` | 1 | `leader` | `rhythm` | "Pull up just before 1." | "So now very quickly timing for arms. We are pulling up before one" | 224.18 |
| `sombrero-17` | 1 | `follower` | `footwork` | "She steps on 1." | "she's stepping on one" | 226.56 |
| `sombrero-18` | 2 | `leader` | **`lead`** | "Swap hands on 2." | "I'm swapping hands on two" | 227.60 |
| `sombrero-19` | 3 | `leader` | **`lead`** | "Give the second hand underneath on 3." | "giving second on the bottom on three" | 229.12 |
| `sombrero-20` | 3 | `follower` | `arms` | "Her arm goes up on 3 as well." | "and her arm up goes on three as well" | 231.48 |
| `sombrero-21` | 1 | `leader` | **`lead`** | "The first step is the whole move — pull on 1." | "The most important part of this move is the first step where I pull and she goes forward." | 293.62 |
| `sombrero-22` | 1 | `follower` | `footwork` | "Step forward on 1. Step back and you've spent two steps before the turn even starts." | "If she goes back, we have one, two. We wasted two steps already. We haven't started even the turn." | 300.46 |
| `sombrero-23` | — | `both` | `concept` | "It can be completed in four steps, but it is very difficult — don't plan on it." | "So it is possible to complete it in four steps, but it's very, very difficult. So think about that." | 308.62 |
| `sombrero-24` | — | `follower` | **`lead`** | "Wait to lift that hand until he releases it." | "when we finish the move, five, six, seven, she's waiting with lifting this hand. She's not doing it before I release it" | 319.66 |
| `sombrero-25` | — | `both` | `context` | "Sombrero complicato, Sombrero complicato doble, Juana la Cubana and Montana are all built on this — complicato doble is why she waits." | "sombrero complicato doble, when we will swap hands and we need both. We already done sombrero complicato that bases on the same principle" | 330.04 |
| `sombrero-26` | — | `both` | `concept` | "Many moves start with Sombrero, or use a sombrero-like action halfway through." | "Sombrero is a very important ingredient, very important package when you are learning how to dance cuban salsa. Many moves are starting with sombrero or many moves are using sombrero like actions somewhere halfway through." | 355.52 |

**Drillable count: 17, against a cap of 8.** Flagged, not trimmed — same
resolution as `SALSA_VERIFICATION_LOG.md` §6, and for the same reason: the cap
was written for solo footwork, and this move has four independent hand actions
(`-6`…`-9`), a landing position (`-10`), a hand escape (`-12`, `-13`) and a
five-beat arm-timing block (`-16`…`-20`), none of which is optional and none of
which is footwork. **Suggested resolution if the drill needs a cap: split into two
passes** — a travel pass (`-2`, `-3`, `-17`, `-21`, `-22`) and a hands pass
(`-6`…`-10`, `-12`, `-13`, `-16`, `-18`, `-19`, `-20`). The data already supports
this: filter by `kind`.

**Deliberate near-overlap, and why it stays.** `sombrero-8` ("offer the second
hand underneath") and `sombrero-19` ("give the second hand underneath on 3") are
the same physical action. They are two cues because the teachers taught them 115
seconds apart as two different things — the *technique* (@114.68, palm-to-palm,
hand position) and the *timing* (@229.12, "very quickly timing for arms"). The
timing block is the only beat-numbered material in the class and dropping it to
avoid duplication would delete the class's R3 content.

**R4 check.** Three cues have a verbatim that mentions both roles while the text
addresses one: `sombrero-8` ("I offer… and now… **she's** making loop" → split
into `-8` leader and `-9` follower), `sombrero-21` ("**I** pull and **she** goes
forward" → split into `-21` leader and `-22` follower) and `sombrero-24`
("**she's** waiting… before **I** release it" → shipped as follower only). The
`-24` case is the interesting one: the leader half ("release the hand before she
lifts") is *implied* but never said as an instruction to the leader, so it is
**not shipped**. Adding it would be inventing a cue. If a reviewer watching
319–325 hears the leader instruction stated, add it then as `sombrero-27`.

No `both` cue in this class contains a possessive limb reference: the five `both`
cues are `-1` (context), `-4`, `-5`, `-23` and `-26` (concept/context), and `-4`
says "your left side to your right" — leader-relative and correct, since the
teacher says "from my left to my right" and the leader is the reference frame the
whole class uses. Kept `both` because it describes *her travel*, which both
partners need to know; if a reviewer disagrees, the split is `-4a` leader
("she travels from your left to your right") and `-4b` follower ("you travel from
his left to his right").

### 9.5 Known defects — Class 9

| Flag | Defect | What to do |
|---|---|---|
| **K9-a** | The `count` chapter is **17 seconds** (250–267), the shortest in the range, and it **begins mid-demo**: the counted reps start at 234.94, and the chapter's own titling phrase ("One more time **fluently**") is at 249.60 — 0.4s *before* the boundary. The chapter is a label on the middle of a demo, not a window. | Slow clip published as 234.94 → 264.36 (§9.3), crossing the boundary on purpose (GC-d). Segment keeps its real 250–267 bounds and the chapter title as `provenance`; `confidence: 'transcript'`, and a `warning: 'Chapter starts mid-demo; the counted reps begin at 234.94 in cc9-teach-sombrero.'` |
| **K9-b** | The `music` chapter is 32% counted and Whisper's output there is pure rhythm vocalisation: "king king pa king king pa", "cheeky chick", "from cheeky puku", "bow back cheeky cheek". @424.98 even renders it as "King, pa and be like an o hop" — that is *Dile que no*, mangled beyond the normalizer's reach. | **None of this becomes a cue.** It is the teachers singing the rhythm, exactly the case the charter warns about. Recorded in the fast-alternate `caveat` and in §0.7 (the `be like an o` → `Dile que no` mapping is worth adding to the normalizer — see GC-b). |
| **K9-c** | The follower's hand-and-finger explanation (149–200) is delivered by the second teacher, and the class says out loud that her mic may not be carrying: "**Okay, I don't know if you can hear her in my microphone. Possibly you can.**" @197.40. This stretch is the source of `sombrero-13`, `-14` and `-15`. | Keep all three cues at `confidence: 'transcript'` and put a `warning` on each: *"Spoken by the second teacher off-mic; the class itself flags the audio (@197.40). Verify 149–200 before setting verified."* Do **not** downgrade to `suspect` — the transcript is coherent and self-consistent; the risk is missing words, not wrong words. This is also the class to re-run through Whisper first (`uv run scripts/transcribe_salsa.py ids lV56IVufYOU --force`). |
| **K9-d** | `vacilala-por-la-mano` is the spine of this class — three of the 26 cues are stated as a delta on it — and it is taught in **Class 6**, outside this spec's range (GC-e). It also appears here in three spellings and **never correctly**: "Basila la por la mano" @46.88, "Vasile Lepore Lamanu" @63.04, "Basila La Porla Mano" @89.30. | The move id `vacilala-por-la-mano` is assumed to exist (GC-e). If Classes 1–7 ship a different id, `sombrero-1`, `-2` and `-4` need updating — they are the only cross-range dependency in Class 9. The three spellings all belong on **that** move's `aliases`, not on `sombrero`'s; noted in §0.7 so the other range's author has them. |
| **K9-e** | Chapter 5 is titled "Sombrero - side view" (107s) but only 267–290 (23s, 21%) is a demo; 289.98–374 is 84 seconds of new teaching — the four-step warning, the hand-release rule and the whole sombrero-family list. Three of the class's best cues (`-21`…`-26`) live in a chapter labelled as a camera angle. Additionally the announcement says "different **perspective**", never "side". | Ship `role: 'teach'` (§0.4 n3), `label: 'Sombrero — side view (mostly further explanation)'`, chapter title in `provenance`. The 267.14 → 289.98 demo is kept as a clip **alternate**, not as the published slow clip. Anyone regenerating this from chapter roles alone will mis-scan this class — that is exactly what COUPLES_PLAN §2's "verify, don't trust" is for. |

## Class 10 — Enchufla, Alarde, Exhibela  ·  `CkZO6nyJwjw` · 12:47 (767s) · 11 chapters · short `fNXwnQuVdEI` (46s)

The most structurally interesting class in the range: **11 chapters, two `count`
chapters, two `angle` chapters** — the channel teaches two sequences back to back,
the second being the first plus a tail. Modelled as **two moves plus one extra
teaching source for a move that already exists**, exactly the many-to-many shape
`SALSA_COUPLES_PLAN.md` §6 describes.

### 10.1 Move index — 2 new moves, 1 additional teaching source

#### `enchufla-doble-alarde`

| Field | Value |
|---|---|
| `id` | `enchufla-doble-alarde` |
| `name` | **`Enchufla doble, alarde`** — the chapter titles' form (chapters 3, 4, 5). The description writes `Enchufla (doble, triple) - alarde`; the parenthesis is the variable repetition count, not part of the name |
| `aliases` | `['Enchufla doble, alarde', 'enchufla doble alarde', 'Enchufla (doble, triple) - alarde', 'Enchufla triple alarde', 'alarde', 'Alarde', 'a larde', 'allarde', 'alar de', 'a lardy', 'al lard', 'two flat doble alarde', 'and two flat triple alarde', 'fladoble allarde']` |
| `kind` | `'step'` (§0.4) |
| `group` | `'enchufla'` |
| `summary` | "Enchufla repeated as often as you like, ending with the leader's hook turn — the alarde — landing the pair side by side in arm resting grip." |
| `footwork` | "From Guapea. Enchufla as many times as called — single, doble or triple; the footwork is Kentucky's. On the final repetition the leader does the hook turn instead, passing the joined hands behind his own back, while the follower does three steps in a spot. You land next to each other in arm resting grip, then continue into Dile que no." |
| `base` | `guapea` |
| `composedOf` | `['guapea', 'enchufla', 'hook-turn', 'dile-que-no']` |
| `complete` | `true` |
| `flags` | `['K10-a', 'K10-b']` |

`alarde` is **an alias, not a move.** The class never teaches or counts it alone,
the description lists it as one item with Enchufla, and its first spoken mention
is inside the compound: "We'll start with **Enchufla doble a larde**" @66.74.
Splitting it out would create a move with no `count` window — a permanent R2
violation. Whisper produces six spellings of it and none is `alarde` in the
chapter's form, so the alias list above is what makes it findable (R1).

#### `enchufla-doble-alarde-exhibela`

| Field | Value |
|---|---|
| `id` | `enchufla-doble-alarde-exhibela` |
| `name` | **`Enchufla doble, alarde, Exhibela`** — chapter titles 6, 7, 8, and said on camera: "I said at the beginning that this will be **Enchufla Doble, Alarde, Exhibela**" @285.00 |
| `aliases` | `['Enchufla doble, alarde, Exhibela', 'enchufla doble alarde exhibela', 'Enchufla Doble, Alarde, Exhibela', 'and two flat I love the Exhibela', 'ciufla doble, allarde, Exhibela', 'and two fladoble, a lard, Exhibela'] ` |
| `kind` | `'step'` (§0.4) |
| `group` | `'enchufla'` |
| `summary` | "The same combination with an Exhibela on the end — and the Exhibela can be repeated by calling otra." |
| `footwork` | "Exactly `enchufla-doble-alarde` up to the arm resting grip. From there the leader continues with the Exhibela crossing step while the follower steps back on her right and turns right on 5-6-7. The turn may be repeated — call otra for each extra one — and the combination finishes with Dile que no, still in arm resting grip." |
| `base` | `guapea` |
| `composedOf` | `['enchufla-doble-alarde', 'exhibela-crossing', 'dile-que-no']` |
| `complete` | `true` |
| `flags` | `['K10-c']` |

#### `exhibela-crossing` — additional `TeachingSource`, not a new move

The move id already exists in `frontend/src/data/salsa-steps-classes/classes-01-05.ts`
(steps Class 5, with cues `exhibela-crossing-1`…`-13`). Class 10 is its **partnered**
teaching: the solo course could not contain a lead, and this class supplies one —
"There is a leading for this part. **I'm lifting hand up on 3 and lowering it
down on 7.**" @346.04. Append a second `TeachingSource`; **do not create a second
move.**

```ts
sources: [
  { /* existing: steps, classNumber: 5, videoId: '…' */ },
  { course: 'couples', classNumber: 10, videoId: 'CkZO6nyJwjw', teachStart: 301.04,
    segmentIds: ['cc10-teach-exhibela', 'cc10-count-exhibela',
                 'cc10-angle-exhibela', 'cc10-music-exhibela'],
    clips: { /* §10.3 */ },
    note: 'The partnered teaching. Leader keeps the steps-course crossing step; '
        + 'the follower\'s right turn and the hand lead (up on 3, down on 7) are new.' },
]
```

Also append to its `aliases`: `'Xebala crossing step'` (@331.74), `'Exhibela Step'`
(@291.06), and **`'otra'`**. The last needs saying plainly: *otra* is a generic
"again" call, not a name for Exhibela — "Normally we don't call it Exhibela,
double, Exhibela, triple or anything like that. Just when we want to call another
turn, we call otra" @383.92. But Class 10 is the only place in either course that
defines the word, so a search for `otra` should land here. The cue
`exhibela-crossing-c10-9` carries the definition.

#### `enchufla` — deliberately **not** a teaching source here

This corrects a reasonable assumption. `salsa-types.ts` says Enchufla and
Exhibela need sources from "steps 4/5, couples 4/10", and the pairing is
`enchufla` = steps 4 + couples 4, `exhibela-crossing` = steps 5 + couples 10.
Class 10 does not teach Enchufla — it declines to, on camera:

> "So it could be done as single Enchufla, Enchufla doble, Enchufla triple.
> **You have an idea already how to do that. If not, ching ching, check the cards
> as usual.**" — @70.62

That is a *call*, not a teaching source, which is the steps spec's G3 rule.
Enchufla reaches this class through `enchufla-doble-alarde.composedOf`. If
Classes 1–7 do not give `enchufla` a couples source at Class 4, that is a gap in
that range, not something Class 10 can fill.

### 10.2 Segment map — 11 chapters, all 11 checked

`chaptered: true`. Two `count` chapters and two side-view chapters, because two
sequences are taught. Do not collapse them.

| id | start | end | role | label | moves | provenance | checked against |
|---|---|---|---|---|---|---|---|
| `cc10-intro` | 0.00 | 18.00 | `skip` | Intro | — | chapter "Intro" | **agrees, and it is not empty** — 0.00–17.92 is a counted full-tempo teaser of the whole combination, named at @0.00. See §10.3 |
| `cc10-about` | 18.00 | 40.00 | `skip` | About this class | — | chapter "About this class" | **agrees.** "Hello again, La Suerte Dance School" @18.32; "Let's start. We start slowly combining moves" @37.36 |
| `cc10-teach-doble-alarde` | 40.00 | 170.00 | `teach` | Enchufla doble, alarde — presentation & explanation | `enchufla-doble-alarde` | chapter "Enchufla doble, alarde - presentation & explanation" | **agrees.** "Quite often long moves have one name" @43.36 |
| `cc10-count-doble-alarde` | 170.00 | 231.00 | `count` | Enchufla doble, alarde — fluently with count | `enchufla-doble-alarde` | chapter "Enchufla doble, alarde - fluently with count" | **agrees to 0.2s.** "Okay," @170.18, "well let's do it one more time fluently" @170.84 |
| `cc10-angle-doble-alarde` | 231.00 | 285.00 | `count` *(second camera, §0.4 n3)* | Enchufla doble, alarde — side view | `enchufla-doble-alarde` | chapter "Enchufla doble, alarde - side view" | **agrees to 0.5s.** "We'll do the same **opposite direction**" @231.46 — note: "opposite direction", not "side". Demo runs 234.64–264.98; the last 20s (264.98–285.00) is the pacing note and the Kentucky prerequisite |
| `cc10-teach-exhibela` | 285.00 | 415.00 | `teach` | Enchufla doble, alarde, exhibela — presentation & explanation | `enchufla-doble-alarde-exhibela`, `exhibela-crossing` | chapter "Enchufla doble, alarde, exhibela - presentation & explanation" | **word-exact.** "**Now**, I said at the beginning that this will be Enchufla Doble, Alarde, Exhibela" — word start **285.00**. The best boundary in the range |
| `cc10-count-exhibela` | 415.00 | 459.00 | `count` | Enchufla doble, alarde, exhibela — fluently with count | `enchufla-doble-alarde-exhibela` | chapter "…fluently with count" | **agrees to 0.4s.** "We'll show it fluently." @414.56 |
| `cc10-angle-exhibela` | 459.00 | 494.00 | `count` *(second camera, §0.4 n3)* | Enchufla doble, alarde, exhibela — side view | `enchufla-doble-alarde-exhibela` | chapter "…side view" | **boundary is 4.2s early.** It lands mid-sentence in the "don't over-turn her" etiquette ("If the girl is comfortable with turns, then fine." 455.94–460.02; "If not, then she will definitely feel dizzy." @460.64). The demo starts @463.20. Minor; see K10-d |
| `cc10-music-exhibela` | 494.00 | 604.00 | `music` | Enchufla doble, alarde, exhibela — with music | `enchufla-doble-alarde-exhibela`, `exhibela-crossing` | chapter "…with music" | **agrees.** "We'll do everything with music" 490.08–492.38, first speech inside @500.86 |
| `cc10-review-music` | 604.00 | 721.00 | `review` | Review — with music | — | chapter "Review - with music" | **agrees.** "Okay, and now we'll dance again everything what we've done on our course, but I'll put it in pretty random order." @603.42. `reviewsEarlierMoves: true`. Note: `couples_analysis.md` classifies this chapter `music`; the chapter title says Review and so does the audio — shipped as `review` |
| `cc10-outro` | 721.00 | 767.00 | `skip` | Summary / Outro | — | chapter "Summary / Outro" | **agrees.** "That's it." @718.52 |

`TeachingSource`s:

- `enchufla-doble-alarde` → `{ course: 'couples', classNumber: 10, videoId:
  'CkZO6nyJwjw', teachStart: 40.0, segmentIds: ['cc10-teach-doble-alarde',
  'cc10-count-doble-alarde', 'cc10-angle-doble-alarde'] }` — deliberately **not**
  including the music chapter: from 285 on, every rendition has the Exhibela on
  the end. The one exception is inside `cc10-music-exhibela` and is listed as its
  fast alternate below.
- `enchufla-doble-alarde-exhibela` → `{ …, teachStart: 285.0, segmentIds:
  ['cc10-teach-exhibela', 'cc10-count-exhibela', 'cc10-angle-exhibela',
  'cc10-music-exhibela'] }`
- `exhibela-crossing` → second source, `teachStart: 301.04`, same four segment ids.

### 10.3 Clip windows

**`enchufla-doble-alarde` slow — `enchufla-doble-alarde-slow.mp4`, 174.02 → 193.98 (19.96s), `CkZO6nyJwjw`, `16/9`, trust A**

| Boundary | Anchored to | At |
|---|---|---|
| in | word start of "**Five**" in "let's do it one more time fluently. **Five, six, seven, one enchufla, hobble block**" — the count-in, 1.5s after "fluently." @172.54 | **174.02** |
| out | word start of "**This** aim could be arranged slightly different" — the demo has ended and the variants discussion begins | **193.98** |

`caveat`: *"19.96s, under the 23s reference floor. The teacher talks to his
partner mid-demo ('guys, front and D leg, can you put hand on my shoulder'
185–187). The rest of the chapter (203.72–228.02) is deliberately excluded: those
reps are Enchufla **triple** alarde and a 'straight away' variant, not this
move's own count (K10-a)."*

**slow alternate (16/9)** — `CkZO6nyJwjw` **234.64 → 264.98** (30.34s), trust A:
word start of "**Five**, six, seven" @234.64 → word start of "**We're** doing now
moves a bit faster" @264.98. Three counted reps, uninterrupted, from the second
camera — *a longer and cleaner cut than the published one.* It is the alternate
only because the announcement is "We'll do the same **opposite direction**"
@231.46 and it cannot be determined from the transcript whether that means the
camera moved or the move is being led to the other side. **Watch 231–235: if the
footwork is unchanged, publish this instead.** Highest-value 4-second check in
this spec.

**`enchufla-doble-alarde` fast — official short `fNXwnQuVdEI`, 0 → 45.734, `9/16`, trust D, `shared: true`.**
§0.5 caveat plus: *"Shared with Enchufla doble, alarde, Exhibela — the short shows
the full combination including the Exhibela tail."*

**fast alternate (16/9)** — `CkZO6nyJwjw` **529.16 → 545.46** (16.30s), trust A:
word end of "…every single **time**" @529.16 → word start of "**All** of this is
good when you're social dancing" @545.46. The **only** full-tempo rendition in the
class without the Exhibela: "Enchufla triple, alarde, hop! One, two, three, turn,
and then D-Le Cano, **no Exhibela**." @533.60. Caveat: 16.3s, and the teacher
calls it *triple* (K10-a).

**`enchufla-doble-alarde-exhibela` slow — `…-slow.mp4`, 416.10 → 436.52 (20.42s), `CkZO6nyJwjw`, `16/9`, trust A**

| Boundary | Anchored to | At |
|---|---|---|
| in | word start of "**Enchufla** doble, a larde, Exhibela." — the announcement naming the move, 0.2s after "We'll show it fluently." ends @415.90 | **416.10** |
| out | word start of "**You** don't have to get used to doing multiple turns there" — demo over, etiquette begins | **436.52** |

One complete counted rep with the move named on the way in, and the useful
"…only one turn" call at @432.82. `caveat`: *"20.4s, under the 23s reference
floor; one rep only. The chapter's remaining 22s is spoken etiquette, not
dancing."*

**slow alternate (16/9)** — **463.20 → 490.08** (26.88s), trust A: word start of
"**5**-6 Guapea" @463.20 → word start of "**We'll** do everything with music"
@490.08. Two reps from the second camera, with "and now our angles are different.
I'll try again. I want you to see feet" (474.08–479.28) spoken between them.

**`enchufla-doble-alarde-exhibela` fast — official short `fNXwnQuVdEI`, 0 → 45.734, `9/16`, trust D.** §0.5 caveat.

**fast alternate (16/9)** — **492.38 → 524.58** (32.20s), trust A: word end of
"We'll do everything with **music**" @492.38 → word start of "**you** don't have
to repeat the same order" @524.58. Caveat: *"30% count density — the teacher
counts and comments over the music throughout (GC-c)."*

**second fast alternate — the intro teaser, 0.00 → 17.92 (17.92s), trust A.**
Unique to this class: chapter 1 is not the usual talking head but a counted
full-tempo run of the whole combination, named in the first word — "One,
enchufla doble, alarde, exhibela, and one two three, five six seven." @0.00, last
count ending @17.92. `caveat`: *"Class intro — almost certainly carries an
on-screen title or channel branding. Unverified; check before publishing."* Worth
recording because it is the only place the combination is danced at tempo with a
clean count and no commentary. (Classes 8 and 9 intros are ~20% counted; this one
is 79%. Do not assume the trick generalises.)

**`exhibela-crossing` (couples source) slow — `exhibela-crossing-couples-slow.mp4`, 353.12 → 373.36 (20.24s), `CkZO6nyJwjw`, `16/9`, trust A**

| Boundary | Anchored to | At |
|---|---|---|
| in | word end of "I'm lifting hand up on 3 and lowering it down on **7.**" @352.84, then the count-in "5," @353.40 — window opens at **353.12**, between them | **353.12** |
| out | word start of "**She's** having a bit of style poking some small kid in the eye" | **373.36** |

Two deliberately slowed partnered reps — "5, **very slowly**. 1, 2, cross and
five six cross. Let's do the same again." — with the follower's side narrated over
the second ("from Ola point of view right back and turn"). This is the clip the
solo steps course could not produce: it is the *lead* being demonstrated, not the
step. `caveat`: *"20.2s. The teacher narrates over the second rep. The hand lead
being demonstrated is described 6s earlier, at 349.70 — a viewer who starts at the
in-point does not hear it."*

**`exhibela-crossing` (couples source) fast** — the official short
`fNXwnQuVdEI`, 0 → 45.734, `9/16`, `shared: true`, label *"Class 10 short —
Exhibela is the ending of the combination."* §0.5 caveat.

### 10.4 Lead cues — 27 cues, **8 of them `kind: 'lead'`**

All `sourceVideo: 'CkZO6nyJwjw'`, all `confidence: 'transcript'` unless stated.

**Where the cues live, and why.** The combination gets only 5 cues. That is
correct, not thin: the Enchufla content is on `enchufla`, the Exhibela content
(including its lead) is on `exhibela-crossing`, and the alarde content is on
`enchufla-doble-alarde`. `composedOf` assembles them. Duplicating a cue onto the
combination would make the drill say the same thing twice in a row.

`enchufla-doble-alarde` — 12 cues, 4 `lead`:

| id | beat(s) | role | kind | text | verbatim | sourceStart |
|---|---|---|---|---|---|---|
| `enchufla-doble-alarde-1` | — | `both` | `context` | "Long moves usually carry one short name — everything here happens inside one call." | "Quite often long moves have one name. So for example, if you check our intermediate moves for couples, you'll see Santiago and it's a long move with many things happening in it, but it's one short name." | 43.36 |
| `enchufla-doble-alarde-2` | — | `both` | `context` | "In rueda the caller can change things while they're already happening — this move is a good example." | "Very often it happens that in Rueba we can manipulate things while they are happening. So this is a good example of it." | 60.84 |
| `enchufla-doble-alarde-3` | — | `both` | `context` | "Repeat the Enchufla as often as you like — single, doble, triple. The alarde is the ending either way." | "So it could be done as single Enchufla, Enchufla doble, Enchufla triple." | 70.62 |
| `enchufla-doble-alarde-4` | — | `both` | `context` | "The footwork is exactly Kentucky's." | "So footwork is exactly the same like in Kentucky." | 97.78 |
| `enchufla-doble-alarde-5` | — | `leader` | `footwork` | "On the last repetition, do the hook turn instead of another Enchufla." | "and the fourth time I do the hook turn" | 105.98 |
| `enchufla-doble-alarde-6` | — | `follower` | `footwork` | "While he hook-turns, do three steps in a spot." | "Ola is doing three steps in a spot." | 108.50 |
| `enchufla-doble-alarde-7` | — | `both` | `concept` | "You land next to each other in arm resting grip." | "We land next to each other and we end up with arm resting grip." | 110.56 |
| `enchufla-doble-alarde-8` | — | `both` | **`lead`** | "Hold the grip relatively strong, with the arms tensed." | "The grip is relatively strong and our arms are tensed." | 118.16 |
| `enchufla-doble-alarde-9` | — | `leader` | **`lead`** | "During the hook turn you have to pass the hands behind your own back." | "Definitely the moment to discuss is when I'm doing hook turn. I have to pass the hands behind my back." | 135.72 |
| `enchufla-doble-alarde-10` | — | `leader` | **`lead`** | "As you turn around, hold her wrist a bit higher." | "Now I will turn around and I will try to hold her wrist a bit higher." | 150.92 |
| `enchufla-doble-alarde-11` | — | `leader` | **`lead`** | "Holding it higher lets the arm twist — that twist is what lands you in arm resting grip." | "So I'm holding it a bit higher and then the arm is twisting. We land in arm resting grip. This is the goal. This is the way you want to get there." | 161.54 |
| `enchufla-doble-alarde-12` | — | `both` | `footwork` | "From arm resting grip, continue straight into Dile que no." | "and from this position we'll do Dilek en o." | 122.88 |

`enchufla-doble-alarde-exhibela` — 5 cues, 1 `lead`:

| id | beat(s) | role | kind | text | verbatim | sourceStart |
|---|---|---|---|---|---|---|
| `enchufla-doble-alarde-exhibela-1` | — | `both` | `context` | "Same combination, with an Exhibela on the end." | "Now, I said at the beginning that this will be Enchufla Doble, Alarde, Exhibela." | 285.00 |
| `enchufla-doble-alarde-exhibela-2` | — | `both` | `footwork` | "When you've finished turning her, close with Dile que no." | "And when we are done, we finish with dilekano." | 402.34 |
| `enchufla-doble-alarde-exhibela-3` | — | `both` | **`lead`** | "Keep the arm resting grip all the way through the Dile que no." | "And one, two, still arm resting grip. Five, six, seven." | 406.08 |
| `enchufla-doble-alarde-exhibela-4` | — | `both` | `concept` | "You don't have to keep this order — drop the Exhibela and go straight to Dile que no if you want." | "you don't have to repeat the same order every single time so you could do just… Enchufla triple, alarde, hop! One, two, three, turn, and then D-Le Cano, no Exhibela." | 524.58 |
| `enchufla-doble-alarde-exhibela-5` | — | `both` | `concept` | "Varying it is the whole point when you're social dancing." | "All of this is good when you're social dancing, just to keep some variety." | 545.46 |

`exhibela-crossing` — 10 **new** cues from this class, 3 `lead`. Ids are prefixed
`-c10-` because `exhibela-crossing-1`…`-13` already exist from steps Class 5
(§0.3):

| id | beat(s) | role | kind | text | verbatim | sourceStart |
|---|---|---|---|---|---|---|
| `exhibela-crossing-c10-1` | — | `both` | `context` | "This is the Exhibela step from the Steps course, now with a partner." | "Now, you know Exhibela Step from our Steps course, or if you don't know, again, cards." | 291.06 |
| `exhibela-crossing-c10-2` | — | `leader` | `footwork` | "Your side is unchanged: the crossing step, exactly as in the steps course." | "From my perspective I will do Exhibela crossing step the same as we did during our steps course" | 306.30 |
| `exhibela-crossing-c10-3` | — | `leader` | `footwork` | "Travel across, rotated 90 degrees towards her." | "I continue with Xebala crossing step. I will travel from one camera to another. I will be rotated 90 degrees towards Ola." | 337.82 |
| `exhibela-crossing-c10-4` | 5, 6, 7 | `follower` | `footwork` | "Step back on your right foot and turn to the right on 5, 6, 7." | "She will go back with her right foot and do turn to the right on 5, 6, 7." | 340.60 |
| `exhibela-crossing-c10-5` | 3 | `leader` | **`lead`** | "Lift the hand up on 3." | "There is a leading for this part. I'm lifting hand up on 3 and lowering it down on 7." | 349.70 |
| `exhibela-crossing-c10-6` | 7 | `leader` | **`lead`** | "Lower it back down on 7." | "I'm lifting hand up on 3 and lowering it down on 7." | 351.84 |
| `exhibela-crossing-c10-7` | — | `follower` | `styling` | "Style the free hand like poking a small kid in the eye — the styling you already know." | "She's having a bit of style poking some small kid in the eye. We know the styling already." | 373.36 |
| `exhibela-crossing-c10-8` | — | `both` | `concept` | "The turn can be repeated as many times as you like." | "Now this turn could be repeated many times." | 379.74 |
| `exhibela-crossing-c10-9` | — | `both` | `context` | "There is no 'Exhibela doble'. To ask for another turn, call otra." | "Normally we don't call it Exhibela, double, Exhibela, triple or anything like that. Just when we want to call another turn, we call otra." | 383.92 |
| `exhibela-crossing-c10-10` | — | `leader` | **`lead`** | "Once is fine, twice is fine, three turns is pushy — if she isn't comfortable turning she'll get dizzy." | "Once is okay, twice is okay, three times is a bit pushy. If the girl is comfortable with turns, then fine. If not, then she will definitely feel dizzy." | 451.30 |

`exhibela-crossing-c10-5` and `-6` are the pair this whole spec exists for: a
beat-numbered, role-attributed, sourced hand lead. They also demonstrate why R3
demands `sourceStart` — they share one sentence and are 2.1 seconds apart at the
word level (349.70 and 351.84), which a segment-level timestamp would collapse.

**Drillable counts:** `enchufla-doble-alarde` 8 (at the cap, exactly);
`enchufla-doble-alarde-exhibela` 2; `exhibela-crossing` +6 from this class, on
top of the steps course's existing set — that move now has cues from two courses
and **will** exceed the cap. Filter by `source` when drilling, not by move.

**R4 check.** `enchufla-doble-alarde-8` is `role: 'both'` and says "the arms" —
no possessive that differs by role, so it is legal. `-9`, `-10` and `-11` say
"your own back" / "her wrist", so they are `leader`. The @105.98 sentence
("**the fourth time I do the hook turn, Ola is doing** three steps in a spot") is
one sentence containing two different instructions and is split into `-5` and
`-6`, with different `sourceStart` values (105.98 / 108.50) — the textbook R4
case, and the reason the word-level index matters.

### 10.5 Known defects — Class 10

| Flag | Defect | What to do |
|---|---|---|
| **K10-a** | **The repetition count in the demo does not match the chapter title.** Chapters 3–5 say "Enchufla **doble**", but the walk-through at 101–108 counts "2, and Enchufla for both of us. 3rd, and Enchufla, we do it together as well. and the fourth time I do the hook turn" — three Enchuflas then the alarde — and the second half of the count chapter is explicitly "and two flat **triple** alarde" (@201.20, @206.44). The transcript cannot settle how many Enchuflas are in the published demo. | **Do not encode a repetition count.** The class says the count is a parameter — `enchufla-doble-alarde-3` carries that verbatim — so the move is the named form and the number is variable. `Enchufla triple alarde` is in `aliases`. Both clip windows note which variant they contain. Set `confidence: 'transcript'` on the move's `footwork` and add: *"Number of Enchuflas before the alarde is variable and the transcript is inconsistent with the chapter title; count them by eye at 174–194."* |
| **K10-b** | The class assumes **Kentucky** ("footwork is exactly the same like in Kentucky" @97.78, "especially if you know already Kentucky" @282.28) and **hook-turn**. Both are outside this range (GC-e). `hook-turn` exists in the steps course; `kentucky` must come from Classes 1–7. | `composedOf: ['guapea','enchufla','hook-turn','dile-que-no']` — Kentucky is *not* in `composedOf` (this move is not built from Kentucky, it shares footwork with it). The relationship is carried by cue `-4` only. If a `kentucky` move id exists, consider `group: 'enchufla'` on both so they surface together. |
| **K10-c** | The combination's fast clip and the parent move's fast clip are **the same file** — the official short shows the full combination, so `enchufla-doble-alarde` cannot have an unshared full-tempo clip. | `shared: true` on `enchufla-doble-alarde`'s fast clip with the label in §10.3, plus the 16.3s "no Exhibela" alternate at 529.16 as the honest unshared option. Precedent: steps `left-turn-side`. |
| **K10-d** | Chapter 8 ("side view") starts at 459.0, **4.2s before the demo** and mid-way through the two-sentence etiquette point that straddles the boundary ("If the girl is comfortable with turns, then fine." 455.94–460.02 / "If not, then she will definitely feel dizzy." @460.64). | Keep the chapter bounds; the clip cut starts at 463.20 (the demo). Add `warning` to the segment: *"Chapter opens 4.2s before the demo, inside the previous chapter's sentence."* The etiquette cue `exhibela-crossing-c10-10` is sourced from 451.30 — i.e. from chapter 7 — even though it continues past the boundary; that is correct and intentional. |
| **K10-e** | The `review` chapter (604–721) calls **thirteen** earlier moves in 117 seconds and the transcript is at its worst there: "Hopla, chica!" @612.16, "La Cica, ten for a girl" @666.70, "I've already swapped ten" @640.66 (probably *setenta* — but Setenta is Class 11, i.e. **not yet taught**, so this reading is suspect), "And ching ching" @689.98, "Ting, ting, kung" @706.38. | `moves: []`, `reviewsEarlierMoves: true`, no teaching sources (G3). Do **not** resolve "I've already swapped ten" to `setenta`: a class cannot review a move it has not taught, and guessing would fabricate a cross-reference. Record it here and leave it. The clean calls, worth a `callSheet` if one is built: "Dile che no" @614.54, "Kentucky" @617.68, "Adios con la hermana" @626.68, "Exhibela" @633.48, "El uno" @639.96, "Enchufla doble" @648.42, "Al centro" @649.72, "Arriba and Abajo" @656.72, "Sombrero" @672.74, "Enchufla doble, al centro" @682.80, "El chico" @706.38. |
| **K10-f** | The published slow clip for `enchufla-doble-alarde` (19.96s) is **worse** than the rejected alternate (30.34s, three clean reps) and is published only because "We'll do the same **opposite direction**" @231.46 is ambiguous between *camera moved* and *move mirrored*. | Watch 231–235. If the footwork is unchanged, swap the published clip and the alternate. Four seconds of video decides a 10-second improvement on the single most important artefact in the class. Highest-value verification item in this spec after K11-b. |

## Class 11 — Setenta  ·  `QueWxI6vMrc` · 9:51 (591s) · 8 chapters · short `TyOHtkirh_g` (45s)

**The reference section.** This is the class the charter uses as its worked
example and the class that explicitly teaches *leading*:

> "if you pay attention in every single move how our arms are moving, which
> signals we are giving in which moment — it does matter, timing matters,
> precision of the lead matters."

Success test: *type "seten" → land on Setenta → see its lead cues as text,
beat-numbered → jump to the source second.* Everything below serves that.

### 11.1 Move index — 1 move

| Field | Value |
|---|---|
| `id` | `setenta` |
| `name` | **`Setenta`** — the description's move list is exactly "- Setenta"; the chapter titles write it the same way (R1) |
| `aliases` | `['Setenta', 'setenta', 'set and a hop', 'set and the hop', 'set and one', 'seventy', 'cetenta', 'sedan']` |
| `kind` | `'step'` (see §0.4 note 1) |
| `group` | *(none)* |
| `summary` | "The course's first long move: Guapea, her right turn while you walk left, Enchufla, three steps forward under an arch, and out through Enchufla Mix into Dile que no." |
| `footwork` | "Start in Guapea and hold the second hand when you touch. She turns right on 3 while you walk slowly to your left — the couple has rotated 90 degrees. Continue with Enchufla on 5-6-7, which swaps places and adds another 180 degrees. Then three steps just walking forward; on 7-8 of that walk the joined arms make an arch. Finish with Enchufla Mix and Dile que no, and land back in Guapea." |
| `base` | `guapea` |
| `composedOf` | `['guapea', 'enchufla', 'enchufla-mix', 'dile-que-no']` |
| `complete` | `true` |
| `flags` | `['K11-b', 'K11-c']` |

Alias provenance — `set and a hop` is @292.96 ("one, set and a hop"),
`set and the hop` is @321.12 ("1, 2, set, and the hop"), `set and one` is Class 8
@418.46 ("one set and one more time"). `cetenta` / `sedan` are the YouTube
auto-caption manglings recorded in `SALSA_TAB_GOALS.md`; they are shipped so a
user who read the charter's table can still search them. `seventy` is the
English word a learner is most likely to type — it is a **search alias only**,
never a display name, and nothing in the tab translates the move (R1).

`composedOf` provenance, one quote each:

| Edge | Verbatim | At |
|---|---|---|
| `guapea` | "All versions of setenta start in the same way. We start with Guapea." | 58.88 |
| `enchufla` | "We continue with enchufla five, six, seven." | 84.20 |
| `enchufla-mix` | "We finish everything with enchufla mix" | 107.26 |
| `dile-que-no` | "…and delay can off and five six seven easy peasy maybe" *(Dile que no — see GC-b)* | 112.60 |

**Not a `composedOf` edge, but recorded as a `notes` entry** — the class's own
observation that Setenta shares parts with other moves, which is the reason the
tab wants the edges at all:

> "probably you start noticing that this moves have many things in common so
> like the beginning of Kentucky and the ending of setenta for example or
> Exhibela or la chica and setenta" — `QueWxI6vMrc` @443.52

### 11.2 Segment map — 8 chapters, all 8 checked, **1 split** (§11.6)

`chaptered: true`. Chapter starts come from the description's table of contents;
the "checked against" column is the transcript event nearest that second.

| id | start | end | role | label | moves | provenance | checked against |
|---|---|---|---|---|---|---|---|
| `cc11-intro` | 0.00 | 18.00 | `skip` | Intro | — | chapter "Intro" | — |
| `cc11-about` | 18.00 | 58.00 | `skip` | About this class | — | chapter "About this class" | — |
| `cc11-teach-setenta` | 58.00 | 203.00 | `teach` | Setenta — presentation & explanation | `setenta` | chapter "Setenta - presentation & explanation" | **agrees.** "All versions of setenta start in the same way" begins @58.88, 0.9s after the boundary |
| `cc11-count-setenta` | 203.00 | 276.00 | `count` | Setenta — fluently with count | `setenta` | chapter "Setenta - fluently with count" | **agrees at the start** ("One more time, fluently" @203.92) and **at the end** ("Sometimes we have to go front" @275.28). But see K11-a: only 203.92–221.12 of this 73s chapter is actually counted demo |
| `cc11-angle-setenta` | 276.00 | 317.00 | `count` *(second camera, §0.4 n3)* | Setenta — side view | `setenta` | chapter "Setenta - side view" | **agrees.** "Let's do it from different angles" @276.32; counted reps start @279.18 |
| `cc11-music-setenta` | 317.00 | 400.00 | `music` | Setenta — with music | `setenta` | chapter "Setenta - with music" | **agrees.** first count-in @317.54. `confidence: 'suspect'`? No — `'transcript'`, but the analysis's 45% count density is real: see K11-d |
| `cc11-review-music` | 400.00 | 503.00 | `music` | Review — with music | `setenta` | chapter "Review - with music" | **agrees.** "a quick review of couple of moves" @400.56. `reviewsEarlierMoves: true` |
| `cc11-outro` | 503.00 | 591.00 | `skip` | Summary / Outro | — | chapter "Summary / Outro" | — |

`TeachingSource` for `setenta`: `{ course: 'couples', classNumber: 11,
videoId: 'QueWxI6vMrc', teachStart: 58.0, segmentIds: ['cc11-teach-setenta',
'cc11-count-setenta', 'cc11-angle-setenta', 'cc11-music-setenta'] }`.

`cc11-review-music` is deliberately **not** in `segmentIds`: it is a review of
Kentucky, Exhibela, Adios con la hermana and Dile que no with Setenta at the
end, so it belongs to the class, not to the move.

### 11.3 Clip windows

**slow — `setenta-slow.mp4`, 177.66 → 221.12 (43.46s), `QueWxI6vMrc`, `16/9`, trust V**

| Boundary | Anchored to | At |
|---|---|---|
| in | "**One more time super slow.**" — the teachers announcing a slow repetition | word start **177.66** |
| out | "One, two, three, and five, six, **seven**." — the last word of the fluent counted rep; the next speech is @221.88 and is about train noise | word end **221.12** |

Why this window and not the bare `count` chapter: the chapter is 73s but only
**17.2s** of it (203.92–221.12) is counted demo — the rest is the teachers
apologising for train noise (@221.88) and teaching the walk-forward habit
(@235.04 onward). 17.2s is one rep. Extending the *start* back to 177.66 buys a
second, even slower rep **with the lead spoken over it** — "Left hand upright
down" @182.24, "Left hand goes over and think about right" @187.16 — which is the
single most valuable 20 seconds in the class for a leader. The window is
continuous, is counted end to end ("five, six, hop… one, two, three… five, six,
seven"), and lands inside the 20–45s target.

`caveat` to ship: *"First ~26s sits in the teach chapter, not the counted one:
it is the 'one more time super slow' repetition with the teacher naming the hand
actions over it. The clean fluent counted rep is the last 17s (from 203.9)."*

**fast — `setenta-fast.mp4`, official short `TyOHtkirh_g`, 0 → 44.574, `9/16`, trust D**

`caveat`: the §0.5 whole-short caveat.

**fast alternate (16/9, transcript-anchored)** — `QueWxI6vMrc` **383.92 → 400.56**
(16.64s), trust A. In: "with a bit more **dynamics**" @383.92, the teachers
explicitly restarting because "I was a bit lazy in the first part of it"
(@378.x). Out: segment end 400.56, where "a quick review of couple of moves"
begins. Publish this instead of the short only if the short opens on a title
card — it is 16.6s, under the 23s reference floor, and the teacher counts over
the music.

**slow alternate (review only)** — `QueWxI6vMrc` **279.18 → 316.90** (37.72s):
the `angle` chapter, four counted Setenta reps from the side with no music and no
explanation. 279.18 is the word start of the "5" in "5 6 7 1 2 3 setenta";
316.90 is just before the music count-in @317.54. Kept as an alternate rather
than published because it is a camera-angle chapter and the framing is unverified
— but it is the strongest *pure* counted window in the class and should be
compared side by side in `--review`.

### 11.4 Lead cues — 20 cues, **6 of them `kind: 'lead'`**

*(cues `-19` and `-20` were added by the outro sweep — see §11.6 and GC-f)*

All `sourceVideo: 'QueWxI6vMrc'`. `sourceStart` is the word-level start of the
quoted phrase. `confidence: 'transcript'` unless stated.

| id | beat(s) | role | kind | text | verbatim | sourceStart |
|---|---|---|---|---|---|---|
| `setenta-1` | — | `both` | `context` | "Every version of Setenta starts the same way: from Guapea." | "All versions of setenta start in the same way. We start with Guapea." | 58.88 |
| `setenta-2` | — | `leader` | **`lead`** | "When you touch on the Guapea, hold the second hand — don't let it go." | "Five, six, seven, bow back, cheeky, cheek. Now when we touch second hand we hold it" | 66.36 |
| `setenta-3` | 3 | `follower` | `footwork` | "From there it's your right turn." | "the continuation is we have the right turn from girl perspective" | 69.26 |
| `setenta-4` | 1 | `leader` | `footwork` | "While she rotates right, walk slowly to your left — one, two, and turn." | "Now when she's rotating to the right I'm slowly walking to the left. One, two and turn and five, six, seven." | 74.88 |
| `setenta-5` | — | `both` | `concept` | "That first part changes your position by 90 degrees." | "So we change position by 90 90 degrees." | 80.98 |
| `setenta-6` | 5 | `both` | `footwork` | "Continue with Enchufla on five, six, seven." | "We continue with enchufla five, six, seven." | 84.20 |
| `setenta-7` | — | `both` | `concept` | "Enchufla swaps places completely — that's another 180 degrees on top." | "You know that enchufla swaps places completely, so now we've added another 180 degrees." | 89.12 |
| `setenta-8` | — | `both` | `footwork` | "Then three steps just walking forward." | "And then next three steps we are just walking forward." | 96.58 |
| `setenta-9` | — | `leader` | `footwork` | "Walk forward with your right." | "I'm walking forward with my right sheet, walking forward with the left." | 102.42 |
| `setenta-10` | — | `follower` | `footwork` | "She walks forward with the left." | *(same sentence)* "I'm walking forward with my right sheet, walking forward with the left." | 103.94 |
| `setenta-11` | 7, 8 | `leader` | **`lead`** | "On seven-eight, while you're still walking, lift the joined arms into an arch." | "and now five six seven eight so I'm creating an arch from our arms … and this is happening on seven eight while walking so this is the last step of walking" | 143.38 |
| `setenta-12` | — | `both` | **`lead`** | "Arm setup for the arch: your right palm underneath, her palm resting on top of yours." | "this is my right and this is all that her palm is lying on top of mine there is an arch" | 146.98 |
| `setenta-13` | 7, 8 | `leader` | **`lead`** | "Put your head inside the arch and bring it down." | "I'll put my head inside there and I take it down and this is happening on seven eight while walking" | 151.96 |
| `setenta-14` | — | `both` | `concept` | "Practise the arm action during the pause — actions can be made on poses too. Arms can still act while the feet wait." | "then during the pause this is very cool thing to practice because you are learning that actions can be made also on poses. So arms can still act." | 159.54 |
| `setenta-15` | — | `leader` | **`lead`** | "Left hand up, then down." | "Left hand upright down." | 182.24 |
| `setenta-16` | — | `leader` | **`lead`** | "Left hand goes over, then think about the right." | "Left hand goes over and think about right. Six on your head." | 187.16 |
| `setenta-17` | 5 | `both` | `footwork` | "Finish everything with Enchufla Mix, then Dile que no." | "We finish everything with enchufla mix, enchufla and mix, mix, mix mix and delay can off and five six seven" | 107.26 |
| `setenta-18` | — | `both` | `context` | "The version shown first is the plain one; the taught version is deliberately a bit more complicated." | "Now this is not the ideal version. We'll show you one that is tiny bit more complicated." | 120.38 |

That is **18 cues**, of which **6 are `kind: 'lead'`** (`-2`, `-11`, `-12`,
`-13`, `-15`, `-16`) and **7 are `footwork`** — 13 drillable, above the steps
spec's soft cap of 8. **Do not trim.** §5 of the steps spec says a move over the
cap is either split too finely or genuinely dense; Setenta is genuinely dense
(it is four bars of 8 and the class is 145 seconds of explanation). It is flagged
here rather than cut, exactly as the steps course flagged its four over-cap moves
in `SALSA_VERIFICATION_LOG.md` §6.

Confidence overrides — three cues do **not** ship at `'transcript'`:

| Cue | `confidence` | `warning` | `flag` |
|---|---|---|---|
| `setenta-10` | `'suspect'` | "Whisper renders 'she's' as 'sheet' in this sentence ('with my right sheet, walking forward with the left'), so whose left foot this is cannot be settled from the transcript. Leader-side is `setenta-9`; check the audio at 102–105 before trusting the follower half." | `K11-c` |
| `setenta-13` | `'suspect'` | "The transcript says the leader puts *his own* head inside the arch. That may be right — some Setenta variations pass the leader under — but it may be Whisper mishearing 'her head'. Watch 143–157 before trusting it." | `K11-b` |
| `setenta-15` | `'suspect'` | "'Left hand upright down' is not a sentence. It is almost certainly 'left hand up, right down' or 'left hand up, bring it down'. The action is real and on camera; the words are not recoverable from this transcript." | `K11-b` |
| `setenta-16` | `'suspect'` | "'Six on your head' is unrecoverable — probably a count ('six', 'on your head') spoken over the demo. The 'left hand goes over' half is clear; the rest must be watched." | `K11-b` |

**R4 check.** Every possessive limb reference above sits on a `leader` or
`follower` cue, never on a `both` cue. `setenta-12` is `role: 'both'` and does
name two hands — but it names them **by role** ("your right palm", "her palm"),
from the leader's point of view, which is what R4's leader-first rule asks for;
it is the one hand-setup fact both partners need and splitting it would make each
half meaningless. If a reviewer disagrees, split into
`setenta-12a` (`leader`, "right palm underneath") and `setenta-12b`
(`follower`, "left palm resting on top of his") — the verbatim supports both.

### 11.5 Known defects — Class 11

| Flag | Defect | What to do |
|---|---|---|
| **K11-a** | The `count` chapter is 73s but contains only **17.2s** of counted demo (203.92–221.12). The remaining 55s is an apology about train noise ("there are lots of trains going on top of us" @221.88) and a separate lesson about walking forward (@235.04–275.28). The chapter title promises more than the chapter delivers. | Segment stays 203.0–276.0 with `confidence: 'transcript'` — the chapter boundary is right, the *content* is thin. The slow clip is cut 177.66–221.12 instead (§11.3) and says why in its `caveat`. |
| **K11-b** | The whole arms/arch explanation (143–193) is the most garbled stretch in the class and it is **the part the tab exists for**: "Left hand upright down", "Six on your head", "I'll put my head inside there", "this is all that her palm". Four separate lead facts, none of them cleanly recoverable. | Three cues at `'suspect'` with warnings (§11.4). **This class is the top priority for the human verification pass** — it is the charter's reference move and its lead cues are the least trustworthy in the range. Re-running Whisper is worth trying first (`uv run scripts/transcribe_salsa.py ids QueWxI6vMrc --force`); the decoder is non-deterministic on ambiguous audio. |
| **K11-c** | @103.62 "with my right sheet" — "sheet" is "she's". Any automated extraction that splits on the sentence gets the follower's foot wrong. | `setenta-10` at `'suspect'`. `verbatim` keeps the mangling so the reader sees why. |
| **K11-d** | The `music` chapter (317–400) is 45% counted and contains the teacher correcting himself twice about the count — "sorry, I said it's 6, 7, it's 7, 8" @333.32, "did I say 7, 8? No, I think I said 6, 7, it's 7, 8" @338.66. It is not a silent demo. | No cue is taken from it (the correction is about his own miscount, not an instruction). The 16/9 fast alternate starts at 383.92, *after* the corrections. Recorded here so nobody mines @333 as a rhythm cue. |
| **K11-e** | @449–470: the teachers explain that moves can be broken mid-way and recombined ("I'll do Kentucky and then Exhibela in the end and now instead of letting her go, I'll continue with Setenta"), and note it reverses the couple's position. Real, useful, and **not a Setenta cue**. | A `notes` entry on `setenta` with `sourceStart: 443.52`, not a cue. Same treatment as the steps spec's Class 1 "transitions" (§2, three deliberate exclusions). |
| **K11-f** | **The `skip` outro contains the charter's own thesis, stated by the teachers.** 543.14–557.06: "if you pay attention in every single move, how our arms are moving, which signals we are giving in which moment, it does matter. Timing matters, precision of the lead matters, and precision in time as well." That is R3 in the teachers' words, and it was in a chapter the role vocabulary says to discard. Found by the course-wide outro sweep (GC-f), not by reading Class 11. | Two cues added — §11.6 — plus a segment split. They are general leading advice attached to `setenta` because there is nowhere else to put them (same situation as K13-f). **Recommendation:** when a `guapea` or a course-level home exists, move them there. Do not delete them; they are the most quotable sentences in the course. |

### 11.6 Addendum — two cues recovered from the outro (K11-f, GC-f)

Segment split: `cc11-outro` 503.0–591.0 becomes

| id | start | end | role | label | moves | provenance |
|---|---|---|---|---|---|---|
| `cc11-outro-leading` | 503.00 | 566.80 | `teach` | Why leading is the skill | `setenta` | transcript: "**Developing** these connections while dancing, developing the associations, is one of the essential skills that we are working on" @503.70 |
| `cc11-outro` | 566.80 | 591.00 | `skip` | Summary / Outro (channel boilerplate) | — | transcript: "**So** if you would like to see that, like, subscribe and press the bell" @566.80 |

`cc11-outro-leading` joins `setenta`'s `segmentIds`. Cues:

| id | beat(s) | role | kind | text | verbatim | sourceStart |
|---|---|---|---|---|---|---|
| `setenta-19` | — | `both` | `concept` | "Pay attention in every single move to how the arms move and which signal is given at which moment. It does matter." | "So if you pay attention in every single move, how our arms are moving, which signals we are giving in which moment, it does matter." | 543.14 |
| `setenta-20` | — | `leader` | `concept` | "Timing matters, the precision of the lead matters, and so does precision in time." | "Timing matters, precision of the lead matters, and precision in time as well." | 552.22 |

Both stay `kind: 'concept'`, not `'lead'`: they are the *reason* lead cues exist,
not an action anchored to a beat, and promoting them to `'lead'` would put an
un-drillable sentence into drill mode. Two further sentences in the same window
are deliberately **not** shipped — "Girls are also learning the same things. They
start predicting what we can do in certain moments" @510.20 and "Maybe we'll do a
class dedicated to following and leading only" @560.06 — the first is an
observation about the course, the second is a plan.

## Class 12 — Paseala  ·  `EuT94T544Mg` · 11:52 (712s) · 9 chapters · short `UsvPdXW4-O4` (31s)

The best class in the range for R3, and the worst for R2. It contains the most
explicit lead in the entire course — a pull anchored to **beats 4 and 8** — and
the follower's own account of resisting it, delivered by the second teacher. It
also has **no silent full-tempo demo anywhere**: all three `music` chapters are
33–58% counted.

### 12.1 Move index — 1 move

| Field | Value |
|---|---|
| `id` | `paseala` |
| `name` | **`Paseala`** — title, description and chapter titles all agree |
| `aliases` | `['Paseala', 'paseala', 'passe alla', 'Passe alla', 'passe allah', 'pase ala', 'Paseala hop']` |
| `kind` | `'step'` (§0.4) |
| `summary` | "From arm resting grip: a Dile que no that keeps going — she walks behind his back while he passes her hand palm to palm, and the whole thing runs on a pull she resists on 4 and 8." |
| `footwork` | "Starts from the Dile que no position in arm resting hold, right hand to right hand, her free hand on his shoulder. Leader: Dile que no, then left, forward, front, back, open, spot, spot, right, front; then travel to the left — left, right, back — and the last three steps slightly to the right: right, left, together. Finish with Guapea. Follower: the same travel, but with a tap on each direction change — tap with the left then forward with the left, and once you have rotated towards him, tap with the right then front, front, front." |
| `base` | `dile-que-no` |
| `composedOf` | `['dile-que-no', 'guapea']` |
| `complete` | `true` |
| `flags` | `['K12-a', 'K12-b', 'K12-d']` |

It **starts** with Dile que no rather than ending with it, and the class says so
explicitly: "So it doesn't finish with the Dilek Eno but it starts with Dilek Eno"
@101.48. That is why `base: 'dile-que-no'` and not `guapea` — the only move in
this range not based on Guapea.

`notes` on the move:

```ts
notes: [
  { text: 'Three entries are demonstrated rather than taught as separate moves: '
        + 'Enchufla mix (@316.28), Enchufla doble alarde Exhibela (@330.18), and '
        + 'starting from the regular grip with no hand swap at all (@365.18). '
        + 'Cues -30, -31 and -33 carry them.',
    sourceVideo: 'EuT94T544Mg', sourceStart: 310.02 },
]
```

### 12.2 Segment map — 9 chapters, all 9 checked, **2 split**

`chaptered: true`. Two chapters are shipped as two segments each, because in both
cases the chapter contains a demo followed by a long block of unrelated teaching
and a single `role` would be a lie. Both splits are word-anchored.

| id | start | end | role | label | moves | provenance | checked against |
|---|---|---|---|---|---|---|---|
| `cc12-intro` | 0.00 | 18.00 | `skip` | Intro | — | chapter "Intro" | **agrees**, and 0.00–9.78 is a counted teaser (81% count). Only 9.8s long — too short to publish. See K12-g |
| `cc12-about` | 18.00 | 51.00 | `skip` | About this class | — | chapter "About this class" | **agrees.** "Hello, hello! La Suerte Dance School" @18.38 |
| `cc12-teach-paseala` | 51.00 | 292.00 | `teach` | Paseala — presentation & explanation | `paseala` | chapter "Paseala - presentation & explanation" | **word-exact.** "**First** thing we'll go through Paseala" — word start **51.32** |
| `cc12-count-paseala` | 292.00 | 310.02 | `count` | Paseala — fluently with count | `paseala` | chapter "Paseala - fluently with count" | **start agrees** ("Okay, now fluently with cow" @291.88 — "cow" is *count*). **End does not**: the chapter runs to 396.0 but the counted demo ends at 310.02 |
| `cc12-teach-entries` | 310.02 | 396.00 | `teach` | How to get into Paseala | `paseala` | transcript: "**I told you also that we'll show you how to get into it** instead of starting every time from close position" @310.02 | **split from chapter 4** (K12-b). 86 seconds of new teaching — three entries — inside a chapter labelled "fluently with count" |
| `cc12-angle-paseala` | 396.00 | 428.62 | `count` *(second camera, §0.4 n3)* | Paseala — side view | `paseala` | chapter "Paseala - side view" | **agrees.** "Now we'll show you different perspective just for passe alla" @395.84 |
| `cc12-teach-resistance` | 428.62 | 505.00 | `teach` | Resistance, from the follower's side | `paseala` | transcript: "**Right ladies** just when Michal was talking about this resistance and guy pulling you" @428.62 | **split from chapter 5** (K12-c). 76 seconds, the second teacher, the follower's half of the lead — the most valuable follower content in the range, inside a chapter labelled "side view" |
| `cc12-music-paseala` | 505.00 | 538.00 | `music` | Paseala — with music | `paseala` | chapter "Paseala - with music" | **agrees.** "Okay I think that's about it let's go with music" 502.52–503.40; "The first round will start with D like an opposition" @505.12. **58% counted** (GC-c) |
| `cc12-music-paseala-side` | 538.00 | 575.00 | `music` | Paseala — with music (side view) | `paseala` | chapter "Paseala - with music (side view)" | **agrees to 0.3s.** "okay I'll change angle" 536.38–538.34. 43% counted |
| `cc12-review-music` | 575.00 | 650.00 | `review` | Review — with music | — | chapter "Review - with music" | **agrees to 1.1s.** "and let's do short review" @576.14. `reviewsEarlierMoves: true`. Analysis classifies it `music`; the title and audio say review |
| `cc12-outro` | 650.00 | 712.00 | `skip` | Summary / Outro | — | chapter "Summary / Outro" | **agrees.** "If I remember correctly we are around class number 12 now" @647.34 |

`TeachingSource`: `paseala` → `{ course: 'couples', classNumber: 12, videoId:
'EuT94T544Mg', teachStart: 51.32, segmentIds: ['cc12-teach-paseala',
'cc12-count-paseala', 'cc12-teach-entries', 'cc12-angle-paseala',
'cc12-teach-resistance', 'cc12-music-paseala', 'cc12-music-paseala-side'] }`.

### 12.3 Clip windows

**slow — `paseala-slow.mp4`, 291.88 → 310.02 (18.14s), `EuT94T544Mg`, `16/9`, trust A**

| Boundary | Anchored to | At |
|---|---|---|
| in | word start of "**Okay**, now fluently with cow" — the announcement, so the clip opens by naming what it is ("cow" is Whisper for *count*) | **291.88** |
| out | word start of "**I** told you also that we'll show you how to get into it" — the demo has ended and the entries lesson begins | **310.02** |

One complete Paseala (295.00–303.54) plus two bars of Guapea to finish
(304.04–309.82), counted throughout.

`caveat`: *"18.1s, under the 23s reference floor, and one repetition only. It is
the entire 'fluently with count' demo in this class — the chapter is 104s but 86s
of it is teaching entries (K12-b)."*

**Two alternates, and the reason the shorter clip is published.**

| Alternate | Window | Len | Why not published |
|---|---|---|---|
| Exaggerated lead | 277.82 → 291.88 | 14.06s | `label: 'Exaggerated lead — the pull on 4 and 8'`. In: word start of "**5**, 6, 7" @277.82, after "We'll exaggerate this move now" (275.88–277.58). Out: word start of "Okay, now fluently" @291.88 — which is also the published clip's in-point, so the two are **adjacent** and could be one 34.14s cut. Not published because the teachers disown it on camera: "**Obviously we don't want you to dance like that** but we want you to see where the signal happens" @287.12. A learner looping it would copy the exaggeration. |
| Side view | 401.82 → 428.02 | 26.20s | Two counted reps plus an Enchufla-mix entry, from the second camera. Longer and cleaner than the published clip; withheld only because the framing is unverified. |

**If a reviewer prefers length over purity, the honest single cut is 275.88 →
310.02 (34.14s)**: it starts on "We'll exaggerate this move now", so the clip
explains its own first half. That decision needs a human, not a transcript.

**fast — official short `UsvPdXW4-O4`, 0 → 30.954, `9/16`, trust D.** §0.5 caveat.

**fast alternate (16/9)** — **505.12 → 536.38** (31.26s), trust A: word start of
"**The** first round will start with D like an opposition" @505.12 → word start of
"**okay** I'll change angle" @536.38. Caveat: *"58% count density — the teacher
counts continuously over the music and calls the entry ('Enchufla doble a large
there one and Paseala' @516.74). There is no silent full-tempo Paseala anywhere in
this class (K12-a)."*

**second fast alternate (16/9)** — **538.34 → 576.14** (37.80s), trust A: word end
of "okay I'll change **angle**" @538.34 → word start of "and **let's** do short
review" @576.14. The side-view music round: two entries (Enchufla mix @543.46,
Enchufla doble alarde Exhibela @~560) into Paseala, with a grip swap called on
camera. 43% counted.

### 12.4 Lead cues — 33 cues, **10 of them `kind: 'lead'`**

All `sourceVideo: 'EuT94T544Mg'`, all `confidence: 'transcript'` unless stated.

| id | beat(s) | role | kind | text | verbatim | sourceStart |
|---|---|---|---|---|---|---|
| `paseala-1` | — | `both` | `concept` | "Paseala starts from the Dile que no position — and specifically from arm resting hold." | "First thing we'll go through Paseala. Paseala starts from Dilekano position and not only that it starts from arm resting hold." | 51.32 |
| `paseala-2` | — | `both` | **`lead`** | "Right hand to right hand, in arm resting grip." | "So we are holding right to the right in arm resting grip." | 60.42 |
| `paseala-3` | — | `follower` | **`lead`** | "Your free hand rests on his shoulder." | "Ola's hand is on my shoulder" | 63.58 |
| `paseala-4` | — | `both` | `context` | "You already did this Dile que no from arm resting grip, in Enchufla, alarde, Exhibela." | "We already done something similar with Enchufla Alarde Xibala so you should remember how to do Dilekano from this position" | 68.16 |
| `paseala-5` | — | `both` | `concept` | "It doesn't finish with Dile que no — it starts with it, and finishes with Guapea." | "So it doesn't finish with the Dilek Eno but it starts with Dilek Eno." | 101.48 |
| `paseala-6` | 5 | `follower` | `footwork` | "She goes back on the Dile que no — the part you already know." | "Ola goes back, I go forward with Dilek Eno. We know this part." | 109.88 |
| `paseala-7` | 5 | `leader` | `footwork` | "You go forward." | "I go forward with Dilek Eno." | 110.92 |
| `paseala-8` | 7 | `leader` | `footwork` | "On 7, instead of facing to the left, step forward." | "So first my step on seven instead of facing to the left I go forward" | 121.42 |
| `paseala-9` | — | `leader` | **`lead`** | "Hold only the wrist of her right hand." | "and also I hold the wrist of Ola's right hand only because I'll pass it behind my back" | 126.78 |
| `paseala-10` | — | `leader` | **`lead`** | "Pass it behind your back palm to palm — don't grab it in a weird way." | "so I'll pass palm to palm instead of grabbing it in a weird way" | 133.18 |
| `paseala-11` | — | `leader` | `concept` | "If you were already holding her palm, there'd be a moment where you have to drop the hand. Avoid it." | "If I was holding palm already there would be a moment when we would have to drop the hand. It's not very good." | 143.76 |
| `paseala-12` | — | `follower` | `footwork` | "She walks behind his back." | "So when she walks behind my back, King, King, hop, I'm able to pass it to the palm." | 137.80 |
| `paseala-13` | — | `leader` | `footwork` | "Your first eight from Dile que no: left, forward, front, back, open, spot, spot, right, front." | "from guy point of view. I start with D-le-can-o, five, six, left, forward, front, back, open, spot, spot, right, front." | 163.44 |
| `paseala-14` | — | `leader` | `footwork` | "Then travel to the left: left, right, back." | "Now I start traveling to the left, left, right, go back" | 174.36 |
| `paseala-15` | — | `leader` | `footwork` | "The last three steps go slightly to the right: right, left, together." | "and the last three steps slightly to the right, right, left, together." | 179.56 |
| `paseala-16` | — | `both` | `footwork` | "Finish with Guapea." | "We finish with Guapea, back cheeky cheek and front cheeky pucu." | 185.64 |
| `paseala-17` | — | `follower` | `concept` | "Her side has one extra thing, and it is very important: tapping." | "From girl point of view there is additional aspect to think about, very very important, and it's tapping." | 190.40 |
| `paseala-18` | — | `follower` | `footwork` | "Tap to change direction — it buys you the balance an extra step would have given you." | "Tap is used for changing directions. It gives you a bit extra balance." | 198.64 |
| `paseala-19` | — | `follower` | `footwork` | "Tap with the left, then forward with the left." | "there is tap with the left and forward with the left" | 220.56 |
| `paseala-20` | — | `follower` | `footwork` | "Once you've rotated towards him, tap with the right, then front, front, front." | "she rotated already towards me tap again with the right right continues front front front" | 226.26 |
| `paseala-21` | — | `both` | **`lead`** | "The pull on the hand is the signal. This move runs on signals." | "Oh see she's pulling my hand. That's the signal. We need signals." | 250.42 |
| `paseala-22` | — | `leader` | **`lead`** | "Give her dynamics: pull a fair amount, or at least create resistance." | "The most important is to give girl dynamics during this movement, pull quite a bit or at least create this resistance" | 256.44 |
| `paseala-23` | 4, 8 | `leader` | **`lead`** | "She opens slightly on every 4 and 8 as she taps — that is the moment to tense your arm, resist, and pull her the opposite way." | "because she will open slightly on every four and eight when she's tapping and this is the moment when I have to tense my arm and resist and pull her opposite direction" | 266.76 |
| `paseala-24` | — | `follower` | **`lead`** | "Your hand stays where it is. Never let it travel to the front." | "if you notice my hand is always there i never let it go to the front" | 432.72 |
| `paseala-25` | — | `follower` | **`lead`** | "His resistance means your resistance — don't let him pull you." | "so resistance from the guy also means resistance from you so here I don't let him pull me" | 437.02 |
| `paseala-26` | — | `both` | `concept` | "He gives tension, she returns it. There has to be constant interaction from both sides." | "so I'm giving tension she's returning tension this is how dancing works yeah there has to be constant interaction from both sides" | 449.30 |
| `paseala-27` | — | `leader` | `concept` | "Most students at this level are not leading strongly enough." | "So guys are not leading strong enough and girls are not resisting enough." | 479.40 |
| `paseala-28` | — | `follower` | `concept` | "Most students at this level are not resisting enough." | "and girls are not resisting enough" | 481.12 |
| `paseala-29` | — | `both` | `context` | "You don't have to start from close position every time — you can arrive in it from another move." | "I told you also that we'll show you how to get into it instead of starting every time from close position." | 310.02 |
| `paseala-30` | — | `both` | `context` | "Enchufla mix is one way in." | "For example, we can do enchufla mix. One, two and mix." | 316.28 |
| `paseala-31` | — | `both` | `context` | "Enchufla, alarde, Exhibela is another — you land with the arm already in the right position." | "Another variation. Enchufla, Alarde, Exhibela… One, two, arm is already in the right position." | 330.18 |
| `paseala-32` | — | `both` | `concept` | "Paseala is usually an extension: something extra you add once you've finished another move." | "So passe alla is very often an extension, something extra you can add when you already completed the move. You land in the leconal position, sometimes you might swap hands, sometimes you don't." | 347.62 |
| `paseala-33` | — | `leader` | **`lead`** | "From the regular grip you don't have to swap hands at all — the hand is already there." | "We can start from regular grip if it's more handy… I don't have to swap hand it's already there" | 365.18 |

`paseala-23` is the single best cue in this spec: an action, a role, **two named
beats**, a stated cause (her tap opens her out) and a stated response. It is the
exact shape `SALSA_TAB_GOALS.md` R3 asks for and the exact thing the steps course
could not contain.

`paseala-24` and `-25` are its counterpart from the other side of the hand, and
they are **spoken by the other teacher** — "Right ladies, just when Michal was
talking about this resistance and guy pulling you…" @428.62. Keeping them as
separate `follower` cues rather than folding them into `-23` is R4 working
correctly: the leader is told to pull, the follower is told not to be pulled, and
those are not the same instruction.

**Drillable count: 21, against a cap of 8.** Flagged, not trimmed
(`SALSA_VERIFICATION_LOG.md` §6 precedent). This class teaches two independent
step sequences (leader `-13`…`-15`, follower `-18`…`-20`), a hand-passing
technique (`-9`, `-10`) and a two-sided tension dialogue (`-21`…`-25`). Suggested
split if the drill needs a cap: **by `role`** rather than by `kind` — leader gets
11 drillable, follower gets 8, which is the natural way a couple practises anyway.

**R4 check.** Four sentences in this class name both roles and are split:
@60.42/@63.58 (grip / her hand on his shoulder → `-2` `both`, `-3` `follower`),
@109.88 ("**Ola** goes back, **I** go forward" → `-6` / `-7`, 1.04s apart at word
level), @266.76 ("**she** will open… **I** have to tense my arm" → the follower
half is already covered by `-24`/`-25` from her own mouth, so `-23` is leader-only)
and @479.40 ("**guys** are not leading strong enough and **girls** are not
resisting enough" → `-27` / `-28`, 1.72s apart). `paseala-2` is `both` and says
"right hand to right hand" — symmetric, no role-dependent possessive, so it is
legal. `paseala-21` is `both` and says "the pull on the hand", deliberately not
"my hand" (the verbatim says "she's pulling **my** hand", which is leader-framed;
the cue is about the *existence* of the signal, which both partners need).

### 12.5 Known defects — Class 12

| Flag | Defect | What to do |
|---|---|---|
| **K12-a** | **There is no silent full-tempo demo in this class.** All three music chapters are heavily counted: 58% (505–538), 43% (538–575), 33% (575–650). The teacher counts, calls entries and comments over every one. | Both 16/9 fast alternates carry the density in their `caveat` (§12.3). The published `fast` is the official short, which is the only plausibly clean full-tempo footage — and it is un-transcribed (§0.5), so that is unverified too. **Paseala is the move in this range whose `fast` grain most needs a human to look at it.** |
| **K12-b** | The `count` chapter is **104 seconds** and contains **18.1 seconds** of counted demo. The other 86s (310.02–396.0) teaches three ways *into* the move. A pass that trusted chapter roles would cut an 104s "slow clip" containing three entry demos and two minutes of talking. | Chapter split into `cc12-count-paseala` (292–310.02) and `cc12-teach-entries` (310.02–396), word-anchored at "I told you also that we'll show you how to get into it" @310.02. This is the clearest instance in the range of COUPLES_PLAN §2's "verify, don't trust". |
| **K12-c** | The `angle` chapter is **109 seconds** and only the first 32 are a demo. From 428.62 the *second teacher* delivers 76 seconds on resistance — the follower's entire half of the lead, and the source of `paseala-24`, `-25`, `-26`, `-28`. It is buried in a chapter called "side view". | Split into `cc12-angle-paseala` (396–428.62, `role: 'count'`, second camera) and `cc12-teach-resistance` (428.62–505, `role: 'teach'`), word-anchored at "Right ladies" @428.62. Same species as K9-e but with more at stake: four cues, including two `lead` cues, would have been missed. |
| **K12-d** | The published slow clip is **18.14s**, the shortest in the range, and one repetition. | Shipped with the caveat, plus two documented alternates and an explicit "if you want length, cut 275.88 → 310.02" instruction (§12.3). Do not silently extend it into the exaggerated demo — the teachers disown that demo on camera @287.12. |
| **K12-e** | `Paseala` is spelled correctly only in the first minute. From @336 onward Whisper produces **"passe alla"** almost exclusively (@336.20, @342.84, @347.62, @382.04, @395.84, @543.46, @624.76), plus "Passe alla" and "passe allah". A name search for "paseala" over raw transcript text finds the class and then loses it. | Aliases in §12.1; normalizer mapping in §0.7. This is GC-a's pattern repeating: the normalizer handles `Sombrero` and `Setenta` but not `Paseala` or `Vacilala`. |
| **K12-f** | The `review` chapter (575–650) calls ten earlier moves. **Cross-check passed:** it calls "Setenta" @616.54 and Setenta is Class 11 — already taught. Contrast K10-e, where Class 10's review appears to call Setenta *before* it is taught, which is why that reading was rejected. | `moves: []`, `reviewsEarlierMoves: true`, no teaching sources (G3). Clean calls for a future `callSheet`: "al centro" @577, "dile che no" @580.32, "la chica" @~582, "two pla doble, al centro" @~586, "los dos" @~591, "Dile che no" @595.68, "el uno" @597.36, "Sombrero" @607.54, "Setenta" @616.54, "Passe alla" @624.76, "Kentucky" @~633. |
| **K12-g** | The intro (0–18) is 81% counted — but the count stops at **9.78s** and the remaining 8.2s is silence before the greeting @18.38. The Class 10 intro trick does not repeat here. | Not a clip candidate: 9.8s. Recorded so nobody tries. |

## Class 13 — CocaCola  ·  `GT7PTpvni_A` · 12:20 (740s) · 9 chapters · short `7MODqLfyTQQ` (24s)

The longest teach block in the range (310 seconds) and the highest cue count. It
also contains the only place in the course where the teachers state, on camera,
which moves compose with which — the review chapter is not a call sheet here, it
is a combinations lesson.

### 13.1 Move index — 1 move

| Field | Value |
|---|---|
| `id` | `cocacola` |
| `name` | **`CocaCola`** — the description's and the chapter titles' spelling, one word, two capitals. Whisper always writes "Coca-Cola" |
| `aliases` | `['CocaCola', 'cocacola', 'Coca-Cola', 'Coca Cola', 'coca cola', 'Coca-Cola hop']` |
| `kind` | `'step'` (§0.4) |
| `group` | — (the class links it to `sombrero` conceptually @492.52, but as *contrast*, not family: "this one it goes just opposite direction". Not grouped) |
| `summary` | "A Dile que no abandoned halfway: she does a two-step progressive left turn on 6-7 and keeps travelling like Paseala, while he stays facing her with his arm around her the whole way." |
| `footwork` | "Starts from the Dile que no position in the regular hold — her left hand on his shoulder, the other hands joined in front. The Dile que no is not completed: just after halfway the action starts. Follower: step 5 is still forward on the left foot, then rotate fully to the left on 6 and 7 only — two steps, progressive, travelling as you turn — then keep going forward on the right, front, front, front, exactly as in Paseala. Leader: mostly steps on the spot; the one to watch is the left step back on 1, which is what pushes her forward. Ends with Guapea." |
| `base` | `dile-que-no` |
| `composedOf` | `['dile-que-no', 'guapea']` |
| `complete` | `true` |
| `flags` | `['K13-a', 'K13-b', 'K13-f']` |

Second move in the range based on `dile-que-no` rather than `guapea`, and the
class draws the parallel to Paseala itself — twice, once for what is the same
("after the turn she keeps traveling forward **exactly the same like Paseala**"
@159.44) and once for what differs ("the difference again comparing to Paseala is
that **I keep facing her**" @168.12). Those two sentences are cues `-12` and `-13`;
they are the reason a reader who has done Class 12 can learn this one in a minute.

`notes` on the move:

```ts
notes: [
  { text: 'Entry rule: anything that finishes with Dile que no can lead into '
        + 'CocaCola. Demonstrated from Sombrero (@381.08), Enchufla mix '
        + '(@522.72) and El uno (@534.76).',
    sourceVideo: 'GT7PTpvni_A', sourceStart: 373.14 },
  { text: 'The review chapter demonstrates five combinations ending in CocaCola '
        + 'and names two as ideal: Setenta and Vacilala por la mano. Cues -40 '
        + 'and -41 carry them.',
    sourceVideo: 'GT7PTpvni_A', sourceStart: 589.57 },
]
```

### 13.2 Segment map — 9 chapters, all 9 checked, **1 split**

`chaptered: true`.

| id | start | end | role | label | moves | provenance | checked against |
|---|---|---|---|---|---|---|---|
| `cc13-intro` | 0.00 | 18.00 | `skip` | Intro | — | chapter "Intro" | agrees; 62% counted teaser |
| `cc13-about` | 18.00 | 49.00 | `skip` | About this class | — | chapter "About this class" | **agrees.** "I will not talk much, we'll just go." 46.46–48.54 |
| `cc13-teach-cocacola` | 49.00 | 359.00 | `teach` | CocaCola — presentation & explanation | `cocacola` | chapter "CocaCola - presentation & explanation" | **agrees to 0.4s.** "**We** start from Dile Cano position again" — word start **49.36** |
| `cc13-count-cocacola` | 359.00 | 398.00 | `count` | CocaCola — fluently with count | `cocacola` | chapter "CocaCola - fluently with count" | **agrees to 1.1s** but lands mid-sentence: the boundary falls inside "guidance for the rest of the arm." (358.40–359.58); the count-in is @360.70 |
| `cc13-angle-cocacola` | 398.00 | 426.04 | `count` *(second camera, §0.4 n3)* | CocaCola — side view | `cocacola` | chapter "CocaCola - side view" | **agrees to 0.2s.** "**Let's** do it opposite direction." @398.16. Note again "opposite direction", not "side" — same ambiguity as K10-f |
| `cc13-teach-balance` | 426.04 | 510.00 | `teach` | Balance and the semicircle, from the follower's side | `cocacola` | transcript: "anything else yeah **just for the balance for the girl** while we're turning" @429.64 | **split from chapter 5** (K13-b). 84 seconds: the second teacher on aiming the turn (429–465), a feet-only demo (465.34–477.84) and the "we dance around each other in a circle" principle (477.84–507.66) |
| `cc13-music-cocacola` | 510.00 | 557.00 | `music` | CocaCola — with music | `cocacola` | chapter "CocaCola - with music" | **agrees.** "okay music" 507.66–509.44. **62% counted** (GC-c) |
| `cc13-music-cocacola-side` | 557.00 | 585.00 | `music` | CocaCola — with music (side view) | `cocacola` | chapter "CocaCola - with music (side view)" | **agrees to 0.2s.** "nice let's do it opposite direction" 555.18–557.14. 25% counted — the cleanest full-tempo window in the class |
| `cc13-review-music` | 585.00 | 682.00 | `review` | Review — with music | `cocacola` | chapter "Review - with music" | **boundary is 2.6s late and mid-sentence**: the announcement "Okay, we'll get back to our basic position and now, from now on when I do this, I'm going [to] review" runs 582.43–589.23 across the boundary. See K13-d. **This chapter is not just a call sheet** — see K13-e |
| `cc13-outro` | 682.00 | 740.00 | `skip` | Summary / Outro | — | chapter "Summary / Outro" | **agrees.** "However, I will not do it again. That's enough." 677.39–679.17 |

`TeachingSource`: `cocacola` → `{ course: 'couples', classNumber: 13, videoId:
'GT7PTpvni_A', teachStart: 49.36, segmentIds: ['cc13-teach-cocacola',
'cc13-count-cocacola', 'cc13-angle-cocacola', 'cc13-teach-balance',
'cc13-music-cocacola', 'cc13-music-cocacola-side', 'cc13-review-music'] }`.

`cc13-review-music` is included in the segment ids — the **only** review chapter
in this range that is, because it is the only one that teaches (K13-e). It still
carries `reviewsEarlierMoves: true`.

### 13.3 Clip windows

**slow — `cocacola-slow.mp4`, 360.70 → 391.58 (30.88s), `GT7PTpvni_A`, `16/9`, trust A**

| Boundary | Anchored to | At |
|---|---|---|
| in | word start of "**Five**, six, seven" — the count-in, 1.1s after "guidance for the rest of the arm." ends @359.58 | **360.70** |
| out | word start of "**So** one more time it is an addition to everything else" | **391.58** |

Two counted reps: the plain one (360.70–372.62, ending in two bars of Guapea) and
one entered from Sombrero (381.08–391.08).

`caveat`: *"Seven seconds in the middle (373.14–380.28) are spoken, not danced —
the entry rule ('so it's enough that we will finish with dilekano'). The second
rep is entered from Sombrero rather than from the closed position."*

**slow alternate (16/9)** — **398.16 → 426.04** (27.88s), trust A: word start of
"**Let's** do it opposite direction" @398.16 → word start of "cheeky cheek and
front cheeky good **anything** else" @426.04. Two reps from the second camera, the
second entered from Enchufla ("I'll do it with enchufla" @~412). Same
"opposite direction" ambiguity as K10-f.

**second slow alternate (16/9)** — **465.34 → 477.84** (12.50s), trust A: "**We'll**
do it again just for feet" @465.34 → "**So** probably you've noticed" @477.84.
Far too short to publish, but it is the only feet-only framing of the follower's
two-step turn ("Five, six, seven, one, two, three, five. Twist, twist forward").
Keep for the review page.

**fast — official short `7MODqLfyTQQ`, 0 → 23.794, `9/16`, trust D.** §0.5 caveat.
At 24s this is the shortest short in the range.

**fast alternate (16/9)** — **557.14 → 582.43** (25.29s), trust A: word end of
"nice let's do it opposite **direction**" @557.14 → word start of "**Okay**, we'll
get back to our basic position" @582.43. **25% count density — the cleanest
full-tempo window in the class**, two Enchufla-mix→CocaCola runs from the second
camera. Caveat: *"The teacher calls the entries over the music ('and Enchufla mix,
seven and one, Coca-Cola boom'); the last ~2s is rhythm vocalisation."*

**second fast alternate (16/9)** — **512.02 → 555.18** (43.16s), trust A, the
front-camera music round. Caveat: *"62% count density (GC-c) — the teacher counts
almost continuously and names three entries (Enchufla mix @522.72, a combination
@534.76, El uno). Use the side-view alternate instead unless the framing is wrong."*

### 13.4 Lead cues — 41 cues, **12 of them `kind: 'lead'`**

All `sourceVideo: 'GT7PTpvni_A'`, all `confidence: 'transcript'` unless stated.
Cues `-32`…`-34` are spoken by the second teacher (the follower); `-37`…`-41` come
from the review chapter (K13-e, K13-f).

| id | beat(s) | role | kind | text | verbatim | sourceStart |
|---|---|---|---|---|---|---|
| `cocacola-1` | — | `both` | `concept` | "Starts from the Dile que no position again — but in the regular hold, not the arm resting hold." | "We start from Dile Cano position again, but this time it's not our resting hold. it's a regular position." | 49.36 |
| `cocacola-2` | — | `follower` | **`lead`** | "Your left hand on his shoulder." | "So with the left hand of the girl on my shoulder" | 56.70 |
| `cocacola-3` | — | `both` | **`lead`** | "The other two hands joined in front." | "second hand joined in front." | 59.62 |
| `cocacola-4` | — | `both` | `concept` | "Don't complete the Dile que no — just after halfway through, the action starts." | "We start with Dille Cano again, but we don't complete whole Dille Cano already halfway through or just after halfway through. We start our action." | 64.08 |
| `cocacola-5` | — | `both` | `footwork` | "It ends with Guapea again." | "and it ends with Guapea again." | 80.76 |
| `cocacola-6` | — | `both` | `context` | "Left turns are rare for the follower in Cuban salsa — right turns are far more common." | "We don't do many left turns when we are dancing salsa. I would say right turn is a lot more common." | 90.68 |
| `cocacola-7` | 6, 7 | `follower` | `footwork` | "Turn left on 6 and 7 only — two steps for the whole turn." | "she'll rotate to the left on 6-7, only 6-7, so only two steps to complete the full turn." | 109.50 |
| `cocacola-8` | — | `follower` | `footwork` | "It's a progressive turn: travel forward and rotate left at the same time." | "It's also a progressive turn, so she travels forward and rotates to the left at the same time." | 115.74 |
| `cocacola-9` | 5 | `follower` | `footwork` | "Step 5 is still forward, on your left foot." | "Now step on 5 is still forward, this is Ola's left foot" | 126.10 |
| `cocacola-10` | 6, 7 | `follower` | `footwork` | "On 6 and 7 travel across to his left, still rotating." | "and on 6-7 she travels to my left and still keeps rotating." | 130.26 |
| `cocacola-11` | — | `follower` | `footwork` | "Out of the turn keep travelling forward on the right — front, front, front." | "She travels forward with her right, front, front, front, and she's finishing like Paseala" | 149.60 |
| `cocacola-12` | — | `both` | `concept` | "The travel after the turn is exactly Paseala's: one length behind his back, one length in front of him." | "after the turn she keeps traveling forward exactly the same like Paseala. One length behind my back, one length in front of me." | 159.44 |
| `cocacola-13` | — | `leader` | `footwork` | "Unlike Paseala, you keep facing her the whole way through — she is never behind your back." | "Now the difference again comparing to Paseala is that I keep facing her. So during the turn I keep rotating and keep facing my partner." | 168.12 |
| `cocacola-14` | — | `leader` | `footwork` | "Your steps are simple — mostly on the spot." | "From our point of view steps are relatively simple because we are mainly stepping on the spot." | 190.66 |
| `cocacola-15` | 1 | `leader` | `footwork` | "The one step to watch: left, back, on 1." | "So this left back on one, give you extra momentum to push her forward" | 211.00 |
| `cocacola-16` | 1 | `leader` | **`lead`** | "As you step back, your arm goes forward at the same moment — that is the push." | "and when I step back my arm goes forward at the same time and then this gives a push to the girl to carry on forward with her right foot on one." | 215.70 |
| `cocacola-17` | 1 | `follower` | `footwork` | "That push carries you forward onto your right foot on 1." | "and then this gives a push to the girl to carry on forward with her right foot on one." | 219.48 |
| `cocacola-18` | — | `leader` | **`lead`** | "Your right arm surrounds her the whole time. There is never a moment you let her go." | "right hand from my perspective is surrounding Ola all the time. Very important. Very important. So there is no moment that I would let her go." | 228.76 |
| `cocacola-19` | — | `leader` | **`lead`** | "The arm around her is the safety net — if she loses balance at any point, it is already there." | "What we need is the arm around her. So if she's losing balance at any point, my arm is there to help." | 247.74 |
| `cocacola-20` | 6, 7 | `leader` | **`lead`** | "The turning hand goes up on 6 and 7 and stays above her head. It is not a mix." | "The turning hand, it goes up on six seven, it stays above her head and it's not mixing." | 271.66 |
| `cocacola-21` | — | `leader` | **`lead`** | "It is only the signal to start the turn: a very small circle above her head, then she rotates." | "I just give signal for initiation for turn. One, two, three, hop, it stays above her head, does very very small circle and then she rotates." | 278.94 |
| `cocacola-22` | — | `both` | `concept` | "She does most of the work in the turn and keeps her own balance — you only initiate it." | "So she's doing the most of the job during the turn. She's keeping her own balance. I just initiated" | 290.06 |
| `cocacola-23` | — | `leader` | **`lead`** | "Don't lift it high — just above her head." | "I make like tiny smooth circle above her head, just above her head, so I don't lift it high as well." | 301.48 |
| `cocacola-24` | — | `leader` | **`lead`** | "The general rule for turns: lift the arm higher than her head. That's all it takes." | "The rule for turns is in general to lift arm higher than her head and that's it." | 303.98 |
| `cocacola-25` | — | `follower` | `concept` | "Her left arm gets trapped if she does nothing with it during the turn." | "The last thing is the left arm for the girl. What is happening with it when she's turning? Because if you do nothing with it, it will get trapped." | 308.54 |
| `cocacola-26` | 1 | `follower` | **`lead`** | "Get it out on 1." | "you have to get it out and we are getting it out on one" | 317.66 |
| `cocacola-27` | 1 | `follower` | `arms` | "While you turn, the left hand travels across your chest; on 1 it comes out and onto his shoulder." | "So while I turn my left hand is going just across on my chest and then on one I'm ready to just take it out so that I can put it on the on Michal's shoulder." | 332.60 |
| `cocacola-28` | — | `follower` | `arms` | "Start the movement with your fingers and palm — that's what keeps your elbow out of his face." | "she's starting the movement with her fingers, with her palm. Thanks to that she will not hit me with her elbow. If she did, my face is there." | 344.44 |
| `cocacola-29` | — | `follower` | `arms` | "The fingers guide the rest of the arm." | "So fingers are giving the guidance for the rest of the arm." | 356.98 |
| `cocacola-30` | — | `both` | `context` | "Entry rule, same as before: anything that finishes with Dile que no leads into CocaCola — Sombrero, for instance." | "Rules exactly the same as previously about entering the coca-cola so it's enough that we will finish with dilekano. So for example sombrero" | 373.14 |
| `cocacola-31` | — | `both` | `concept` | "It's an addition to everything you already know: finish with Dile que no, and Dile que no is CocaCola's first part." | "it is an addition to everything else what we've done before. We finish with dilekano and dilekano is the first part of" | 392.30 |
| `cocacola-32` | — | `follower` | `concept` | "Aim to end the turn facing him. Progressive doesn't mean big." | "just for the balance for the girl while we're turning think about facing the guy at the end of that turn even though it's a progressive turn don't make it too big" | 432.48 |
| `cocacola-33` | — | `follower` | `footwork` | "After that first travelling step the rest are mostly on the spot." | "so if we go one two three now you're taking this step but then the other steps are mostly on the spot so it's five six and now think about facing the guy again" | 446.80 |
| `cocacola-34` | — | `follower` | `concept` | "Don't think about walking forward — think about walking round a semicircle." | "Don't think about walking to the front or that way. Think about going in semicircle. Think about walking over semicircle." | 454.90 |
| `cocacola-35` | — | `both` | `concept` | "In Cuban salsa you are always dancing around each other in a circle — turns are made that way too." | "So probably you've noticed that it is a rule that when it comes to learning Cuban salsa that we are dancing around each other in a circle and you have to get used to making turns in this way as well." | 477.84 |
| `cocacola-36` | — | `both` | `concept` | "Sombrero is the same idea — her semicircle in front of you — but the opposite way round, and much slower. This one is a spin: two steps." | "So even when we did sombrero it's kind of similar, she's kind of doing a semicircle in front of me and this one it goes just opposite direction. Sombrero is obviously a lot slower turn, this is really a spin so just two steps for turn" | 492.52 |
| `cocacola-37` | — | `both` | `concept` | "Don't be afraid of Guapea — it's a normal step like any other. Use it while you decide what's next." | "we can do Guapea once for a while. In general don't be afraid of Guapea. It's a normal step as every other." | 619.81 |
| `cocacola-38` | — | `leader` | **`lead`** | "Stuck for what comes next? Start lifting your left arm for a turn — she'll do the rest of the job and it buys you time to choose." | "So very good habit is to start lifting your left arm up just for the turn… sometimes arm up, the girl will do the rest of the job. It will give you time for picking." | 629.83 |
| `cocacola-39` | — | `both` | `concept` | "Chained without stopping, the moves give one continuous movement." | "So without stopping we have very nice continuous movement." | 615.61 |
| `cocacola-40` | — | `both` | `context` | "Setenta is an ideal lead-in: it finishes in exactly the right position for CocaCola." | "Setenta is very nice to continue with Coca-Cola because it finishes it with perfect position." | 662.61 |
| `cocacola-41` | — | `both` | `context` | "Vacilala por la mano is another perfect start for CocaCola." | "And Basila la por la mano. … Again, perfect start for Coca-Cola." | 674.67 |

`cocacola-20` and `-24` together are the most transferable pair in the range: a
specific lead ("up on 6 and 7, stays above her head") and the general rule it is
an instance of ("lift the arm higher than her head and that's it"). Keep both —
the general rule is the one a learner reuses in every other turn in the course.

**Drillable count: 24, against a cap of 8.** Flagged, not trimmed. The natural
split here is again **by `role`**: 12 drillable for the leader, 12 for the
follower, which is almost exactly balanced and is the only class in the range
where that is true.

**R4 check.** Five sentences name both roles and are split:
@56.70 ("the left hand of **the girl** on **my** shoulder, second hand joined in
front" → `-2` follower + `-3` both, 2.92s apart), @149.60/@159.44 (her travel vs
the shared Paseala comparison), @215.70/@219.48 (**one sentence**, "when **I** step
back my arm goes forward… and then this gives a push to **the girl** to carry on
forward with her right foot on one" → `-16` leader + `-17` follower, 3.78s apart —
the clearest example in the spec of why `sourceStart` must be word-level),
@290.06 ("**she's** doing the most of the job… **I** just initiated" → shipped as
`both` `concept` because it is a statement about the division of labour, which is
the same fact for both partners and contains no role-dependent possessive), and
@308.54/@317.66 (her trapped arm → both `follower`).

`cocacola-3` is `role: 'both'` and says "the other two hands joined in front" —
deliberately not "your right and her left", which the transcript never states.

### 13.5 Known defects — Class 13

| Flag | Defect | What to do |
|---|---|---|
| **K13-a** | The `count` chapter (39s) holds **two** counted reps with **seven seconds of speech between them**, and the second is entered from Sombrero rather than from the closed position. There is no single uninterrupted counted rep of CocaCola from the front camera anywhere in the class. | Published slow clip spans both (360.70 → 391.58) and says so in its `caveat`. The alternative — a 12s clip of rep one alone — is worse. Recorded so nobody "fixes" the caveat by trimming. |
| **K13-b** | The `angle` chapter is **112 seconds** and only the first 28 are a demo. The remaining 84s contain the second teacher's turn-shaping advice (429–465, source of `-32`, `-33`, `-34`), a feet-only demo (465–478) and the "we dance in a circle" principle (478–508, source of `-35`, `-36`). | Split into `cc13-angle-cocacola` (398–426.04, `count`, second camera) and `cc13-teach-balance` (426.04–510, `teach`), word-anchored at "just for the balance for the girl" @429.64. **Third class in a row where the side-view chapter hides real teaching** (K9-e, K12-c, K13-b) — this is a pattern in the course, not an accident, and §0.4 n3's mapping table is the standing answer to it. |
| **K13-c** | The front-camera `music` chapter is **62% counted** — the highest density in the range (GC-c). | The published 16/9 fast alternate is the *side-view* music chapter instead (25%), which is unusual: normally the front camera is preferred. Both windows are listed with densities so a reviewer can choose. |
| **K13-d** | The `review` chapter boundary (585.0) falls **mid-sentence**, 2.6s after the review is announced: "Okay, we'll get back to our basic position and now, from now on when I do this, I'm going [to] review…" runs 582.43–589.23. | The published 16/9 fast alternate ends at **582.43** — the word start of "Okay" — rather than at the chapter boundary, so the clip does not open the review. Segment keeps 585.0 with a `warning` recording the 2.6s. |
| **K13-e** | **The review chapter teaches.** Unlike every other review chapter in this range, 585–682 is not a call sheet: it demonstrates five named combinations ("the Le Canoe, Coca-Cola", "Enchufla, Alander, Exhibela, Paseala" @606.31), states a principle (@615.61), gives general leading advice (@619.81, @629.83) and names two ideal entries into CocaCola (@662.61 Setenta, @674.67 Vacilala por la mano). Five cues (`-37`…`-41`) come from it. | `cc13-review-music` **is** in `cocacola`'s `segmentIds` — the only review chapter in the range that is — and also carries `reviewsEarlierMoves: true`. This is the one place where the steps spec's G3 rule ("a call is not a teaching source") does not apply, because these are not calls. Stated explicitly so it does not look like an oversight. |
| **K13-f** | `cocacola-37` and `-38` are **general leading advice, not CocaCola instruction**: don't fear Guapea, and lift the arm for a turn while you decide what to do next. They are attached to `cocacola` because there is nowhere else to put them — the data model has no class-level cues, and `guapea` is out of this spec's range (GC-e). | Ship them on `cocacola` with `flag: 'K13-f'`. **Recommendation for whoever owns `guapea`:** move both to that move, sourced from this class. They are among the most useful cues in the course for an actual social dancer and they should not be findable only under CocaCola. Do not delete them to tidy the move up. |
| **K13-g** | Whisper never writes the canonical name: 100% of occurrences are "Coca-Cola" (hyphenated) or "coca-cola", never "CocaCola". Plus one instance of "Coca-Cola boom" @~562 where "boom" is a rhythm vocalisation, not part of the name. | Aliases in §13.1 and normalizer entry in §0.7. Low risk (the hyphen is close enough for a fuzzy search) but recorded for completeness — the *canonical* spelling comes from the description, not the transcript, which is the R1 rule. |

## Class 14 — Vacilala, Vacilala Los Dos  ·  `jBaHuGXoWBY` · 11:55 (715s) · 9 chapters · short `c0H4GQnYjNE` (23s; 22.634 exact, §0.5)

Two moves, one short, **one** `count` chapter — and the class opens by saying so:
"I said that there will be two moves but I believe it will be very fast class"
@33.18. It is also the only class in the range whose `skip` outro contains a cue
worth shipping, and the only one with **no `angle` chapter at all**.

### 14.1 Move index — 2 moves

Modelled separately, as the chapters model them: chapter 3+4 are Vacilala,
chapter 5 is Vacilala los dos, and chapters 6–8 are explicitly joint ("Vacilala y
Vacilala los dos - with music"). Do not collapse them; do not duplicate them.

#### `vacilala`

| Field | Value |
|---|---|
| `id` | `vacilala` |
| `name` | **`Vacilala`** — the description's and chapter titles' spelling. **The transcript never once contains it** (GC-a) |
| `aliases` | `['Vacilala', 'Basila La', 'Basila la', 'Basilala', 'Basilela', 'Basile', 'Basi la la', 'basi la la', 'Vasila la', 'Vasila', 'Basila', 'Basilola']` |
| `kind` | `'step'` (§0.4 n1) |
| `group` | — |
| `summary` | "Vacilala por la mano with the guiding hand taken away: pull her into the right turn, release on 3, step back to make room, and let her finish the turn on her own." |
| `footwork` | "Starts in Guapea. Leader: pull before 1 as usual — 1, 2, and release on 3 — then step back, back, forward over the following 5-6-7 to create her space. Follower: the feet are exactly Vacilala por la mano's — front, front, opposite/outside, then carry on front and in towards his right foot — the only change is that from 3 onwards nobody is steering. Her arms come up on 3, in a circular motion from the open position, held round with the palms facing the ceiling; on 1 she looks at him and rotates them in, left hand to his shoulder, right hand down. Ends with Dile que no." |
| `base` | `guapea` |
| `composedOf` | `['guapea', 'dile-que-no']` |
| `complete` | `true` |
| `flags` | `['K14-a', 'K14-b', 'K14-d', 'K14-e', 'K14-g']` |

`notes`:

```ts
notes: [
  { text: 'The class opens by reviewing Vacilala por la mano (47.12–60.64) and '
        + 'defines Vacilala against it. That review is a review, not a teaching '
        + 'source for por la mano (steps spec G3).',
    sourceVideo: 'jBaHuGXoWBY', sourceStart: 46.26 },
  { text: 'Vacilala por la mano, Vacilala and Sombrero are the same work from '
        + 'the follower\'s side, with only small differences for the leader — '
        + 'demonstrated back to back at 580.12–592.22. Cue -32 carries it.',
    sourceVideo: 'jBaHuGXoWBY', sourceStart: 580.12 },
]
```

#### `vacilala-los-dos`

| Field | Value |
|---|---|
| `id` | `vacilala-los-dos` |
| `name` | **`Vacilala los dos`** — chapter-title and description form, lower-case "los dos". The **video title** writes `Vacilala Los Dos`; R1 takes the description/chapter spelling and the title's capitalisation goes in `aliases` |
| `aliases` | `['Vacilala los dos', 'Vacilala Los Dos', 'Basila La Los Dos', 'Basila, Los dos', 'Basila la, los dos', 'basi la la los dos', 'Vasila la, lo dos', 'Vasila la lo dos', 'Basila Los Dos']` |
| `kind` | `'step'` (§0.4 n1) |
| `group` | — |
| `summary` | "Vacilala where both of you turn: she rotates right as usual, and instead of stepping back you step left and do a basic left turn." |
| `footwork` | "Identical to Vacilala for the follower. Leader: instead of the three steps back that make her space, go to the left and do a basic left turn out of Guapea. Lead first, then turn — that is the whole of the difference." |
| `base` | `vacilala` |
| `composedOf` | `['vacilala', 'left-turn-side']` |
| `complete` | `true` |
| `flags` | `['K14-b', 'K14-c', 'K14-f']` |

`left-turn-side` in `composedOf` is not a guess: the turn is danced out of Guapea,
which is a side basic, and the teacher's own pointer — "this is like class number
one or number two of our beginners step scores" @397.22 — resolves against the
shipped data, where `c2-teach-left-turn-side` is in steps **Class 2**. See K14-f
for the residual imprecision.

`notes`:

```ts
notes: [
  { text: 'The follower\'s part is unchanged from Vacilala. Stated only by '
        + 'omission — "the difference is that instead of doing this three steps '
        + 'back … I go to the left" — so it is recorded here rather than shipped '
        + 'as a cue.',
    sourceVideo: 'jBaHuGXoWBY', sourceStart: 385.72 },
]
```

### 14.2 Segment map — 9 chapters, all 9 checked, **2 splits**

`chaptered: true`.

| id | start | end | role | label | moves | provenance | checked against |
|---|---|---|---|---|---|---|---|
| `cc14-intro` | 0.00 | 18.00 | `skip` | Intro | — | chapter "Intro" | **agrees.** Silence from the teaser to the greeting @18.82 |
| `cc14-about` | 18.00 | 39.00 | `skip` | About this class | — | chapter "About this class" | **agrees.** "Hello, Las Suerte Dance School" @18.82; "it will be Basila La and Basila La Los Dos" @24.24 |
| `cc14-teach-vacilala` | 39.00 | 300.00 | `teach` | Vacilala — presentation & explanation | `vacilala` | chapter "Vacilala - presentation & explanation" | **0.42s late and mid-phrase**: "**This**@38.58 time@39.10 we are in Guapea position". Word-anchored start is **38.58**. See K14-h |
| `cc14-count-vacilala` | 300.00 | 363.00 | `count` | Vacilala — fluently with count | `vacilala` | chapter "Vacilala - fluently with count" | **0.8s late, and it splits the count-in itself**: "Five@299.20 six@300.08 seven@300.58" — "Five" falls in the teach chapter. See K14-a |
| `cc14-teach-los-dos` | 363.00 | 435.00 | `teach` | Vacilala los dos — presentation & explanation | `vacilala-los-dos` | chapter "Vacilala los dos - presentation & explanation" | **agrees to 0.1s.** "**I** said we'll do Basila La Los Dos as well" @362.90 |
| `cc14-music-both` | 435.00 | 478.98 | `music` | Vacilala y Vacilala los dos — with music | `vacilala`, `vacilala-los-dos` | chapter "Vacilala y Vacilala los dos - with music" | **agrees at the start.** "Music on" 433.08–433.88; first count @435.56. **End moved from 514.00 to 478.98** — see K14-b |
| `cc14-teach-release` | 478.98 | 514.00 | `teach` | Letting your partner go and getting back in sync | `vacilala`, `vacilala-los-dos` | transcript: "**So** the synchronizing for Dilek and on, it's another very, very useful element" @478.98 | **split from chapter 6** (K14-b). 35 seconds of genuine teaching: why the move matters (478.98–492.62) and a demonstration of release → solo → catch (492.86–511.82) |
| `cc14-music-both-side` | 514.00 | 544.00 | `music` | Vacilala y Vacilala los dos — with music (side view) | `vacilala`, `vacilala-los-dos` | chapter "Vacilala y Vacilala los dos - with music (side view)" | **lands mid-phrase**, between "Ok,"@512.86 and "deep@514.06 renangu@514.48" (= "Okay, Dile que no"). Word-anchored start **512.86**; the dancing starts @516.52. **This is the class's second camera and its role is `music`, not `angle`** — §0.4 n3 |
| `cc14-review-music` | 544.00 | 629.00 | `review` | Review — with music | `vacilala`, `vacilala-los-dos` | chapter "Review - with music" | **agrees to 0.4s.** "**Ok**, and quick review" @544.38. `reviewsEarlierMoves: true`. Contains two real facts — see K14-i |
| `cc14-outro-why` | 629.00 | 690.96 | `teach` | Why Vacilala matters | `vacilala` | transcript: "**At** this point it might seem like, oh this Basila is a kind of useless movement" @629.86 | **split from chapter 9** (K14-d). 62 seconds arguing the move's value, ending at the word start of "**and**@690.96 if you would like to see more classes on this course like subscribe" |
| `cc14-outro` | 690.96 | 715.00 | `skip` | Summary / Outro (channel boilerplate) | — | transcript: "and if you would like to see more classes on this course like subscribe and press the bell" @690.96 | boilerplate only |

`TeachingSource`s:

- `vacilala` → `{ course: 'couples', classNumber: 14, videoId: 'jBaHuGXoWBY',
  teachStart: 38.58, segmentIds: ['cc14-teach-vacilala', 'cc14-count-vacilala',
  'cc14-music-both', 'cc14-teach-release', 'cc14-music-both-side',
  'cc14-review-music', 'cc14-outro-why'] }`
- `vacilala-los-dos` → `{ course: 'couples', classNumber: 14, videoId:
  'jBaHuGXoWBY', teachStart: 362.90, segmentIds: ['cc14-teach-los-dos',
  'cc14-music-both', 'cc14-teach-release', 'cc14-music-both-side',
  'cc14-review-music'] }`

Four segments belong to **both** moves. That is not sloppiness — chapters 6, 7
and 8 are titled "Vacilala **y** Vacilala los dos", so the source itself refuses
to separate them, and `TeachingSource.segmentIds` is a list precisely so it can
say so.

### 14.3 Clip windows

#### `vacilala`

**slow — `vacilala-slow.mp4`, 299.20 → 319.22 (20.02s), `jBaHuGXoWBY`, `16/9`, trust A**

| Boundary | Anchored to | At |
|---|---|---|
| in | word start of "**Five** six seven" — the count-in, after "We'll do that from Guapea." ends @297.56 | **299.20** |
| out | word start of "**One** more thing that I would like you to pay attention to" | **319.22** |

Three counted reps, no speech at all in between — the cleanest counted window in
the whole of classes 8–14.

`caveat`: *"The count degrades into rhythm vocalisation after the first rep
('king king hop and D leg and hop') — normal for this channel, and the beats are
still audible. Starts 0.8s before the chapter boundary."*

**slow alternate (16/9)** — **295.52 → 319.22** (23.70s), trust A: the same window
opened at the word start of "**We'll** do that from Guapea", so the clip announces
its own starting position. 3.7s of speech at the front is the price.

**second slow alternate (16/9)** — **348.68 → 360.12** (11.44s), trust A: word start
of "**Five**, six," @348.68 → word start of "**So** that is Basila La" @360.12. One
rep, filmed after "girls pay attention how arms are moving from open position in a
circular way up" — the only rep shot *for the arms*. Too short to publish; keep
for the review page next to cues `-20`…`-27`.

**fast — official short `c0H4GQnYjNE`, 0 → 22.634, `9/16`, trust D, `shared: true`.**
§0.5 caveat plus: *"One short for a class that teaches two moves — which of
Vacilala and Vacilala los dos it shows is unknown until someone watches it. Same
file is referenced from `vacilala-los-dos`."* See K14-j.

**fast alternate (16/9)** — **516.52 → 544.38** (27.86s), trust A, `shared: true`:
word start of "**Basi** la la" @516.52 → word start of "**Ok**, and quick review"
@544.38. Second camera, continuous, and it contains **one Vacilala rep
(516.52–524.46) and two Vacilala los dos reps (525.04–533.72, 535.46–537.86)**.
Caveat: *"The teacher calls and vocalises the rhythm over the whole window ('hop,
king king open, king king, hop') — not a silent demo. The last ~6s is rhythm
vocalisation only."*

**second fast alternate (16/9)** — **461.88 → 478.98** (17.10s), trust A: word start
of "**Basila** la, hop" @461.88 → word start of "**So** the synchronizing for Dilek
and on" @478.98. Front camera, one rep of each move back to back. Shorter, but the
better framing of the two.

#### `vacilala-los-dos`

**slow — `vacilala-los-dos-slow.mp4`, 374.18 → 385.72 (11.54s), `jBaHuGXoWBY`, `16/9`, trust A**

| Boundary | Anchored to | At |
|---|---|---|
| in | word start of "**five** six seven one" — the count-in that ends "…basic left turn from Guapea" | **374.18** |
| out | word start of "**So** the difference is that instead of doing this three steps back" | **385.72** |

`caveat`: *"11.5s — well under the 20s floor. It is the only complete counted rep
of this move in the class: Vacilala los dos has no `count` chapter (K14-c). The
teacher names the move over it ('Basila, Los dos') and the count is part rhythm
vocalisation ('D leg')."*

**slow alternate (16/9)** — **412.30 → 420.54** (8.24s), trust A: word start of
"**Five**, six, seven again" @412.30 → word start of "**The** only one thing worth
mentioning in here" @420.54. Second rep, shorter still.

**second slow alternate (16/9)** — **374.18 → 420.54** (46.36s), trust A: both reps
in one window. Rejected because **26.6 of those 46 seconds are speech** (385.72 →
412.30, the left-turn explanation and the two card pointers). Kept because a
reviewer may prefer one long clip with a caveat to an 11s loop; that is a
judgement call and it belongs to a human.

**fast — `vacilala-slow.mp4`'s counterpart: official short `c0H4GQnYjNE`, 0 → 22.634, `9/16`, trust D, `shared: true`.**
§0.5 caveat plus the two-moves-one-short caveat above (K14-j).

**fast alternate (16/9)** — **516.52 → 544.38** (27.86s), `shared: true` with
`vacilala`. This window is the *better* fit for `vacilala-los-dos` of the two
moves: it contains two los dos reps and only one Vacilala rep. Same caveat.

**second fast alternate (16/9)** — **468.00 → 477.26** (9.26s), trust A: word start
of "**Five**, six, seven, and one. Basila la, los dos." @468.00 → word start of
"**Dilek** and on." @477.26. One los dos rep at tempo from the front camera,
isolated. Too short to publish alone.

### 14.4 Lead cues — 39 cues (34 on `vacilala`, 5 on `vacilala-los-dos`), **7 of them `kind: 'lead'`**

All `sourceVideo: 'jBaHuGXoWBY'`, all `confidence: 'transcript'`.

#### `vacilala` — 34 cues, 6 `lead`

| id | beat(s) | role | kind | text | verbatim | sourceStart |
|---|---|---|---|---|---|---|
| `vacilala-1` | — | `both` | `concept` | "Start in Guapea." | "This time we are in Guapea position." | 38.58 |
| `vacilala-2` | — | `both` | `context` | "The difference from Vacilala por la mano is the hand — 'mano'." | "So what's the difference between Basila La and Basila La Por La Mano? … Obviously Mano, so hand." | 60.64 |
| `vacilala-3` | — | `leader` | **`lead`** | "In por la mano you guide her through the whole move. Here you only initiate the turn and let it go." | "During Basila La Por La Mano, I'm guiding you through whole move. In here with Basilela we'll just initiate the turn and we'll let it go." | 79.24 |
| `vacilala-4` | — | `leader` | **`lead`** | "Don't guide it all the way round: pull at the beginning, then release." | "the lead is changing because I don't guide it all the way around, but I pull at the beginning and then I release." | 109.24 |
| `vacilala-5` | 1 | `leader` | **`lead`** | "Pull before 1, as usual." | "I'm pulling before one as usual, so we have one, two," | 118.08 |
| `vacilala-6` | 3 | `leader` | **`lead`** | "Release on 3." | "on three I release, zoom, and Ola continues turn by herself." | 122.56 |
| `vacilala-7` | 3 | `follower` | `footwork` | "From 3 you finish the turn by yourself." | "on three I release, zoom, and Ola continues turn by herself." | 124.72 |
| `vacilala-8` | — | `both` | `footwork` | "Finish with Dile que no." | "And then we finish with the Le Canol." | 127.10 |
| `vacilala-9` | — | `leader` | `footwork` | "In por la mano all six of your steps were stationary. Not any more." | "in Basile, La Porte, La Mano, all six steps from that point of view were stationary. We were not going anywhere." | 131.90 |
| `vacilala-10` | 5, 6, 7 | `leader` | `footwork` | "After the release: step back, back, forward." | "Now we have to go five, six, seven, and one, two, release, step back, back and forward." | 143.42 |
| `vacilala-11` | — | `leader` | **`lead`** | "Go back a bit or she'll slap you in the face. Making her space is your job." | "I have to go a bit back, otherwise I might suffer. She might slap me in the face. … but I am responsible for that. I have to create her space." | 145.70 |
| `vacilala-12` | 5, 6, 7 | `leader` | `footwork` | "One small step back on 5-6-7 is all the space she needs." | "So I'm creating space by making this small step back on five six seven" | 157.62 |
| `vacilala-13` | — | `follower` | `footwork` | "Your feet are the same as in Vacilala por la mano: front, front, opposite/outside, then in towards his right leg." | "Ola is doing steps the same as in Basilola por la mano so front front opposite outside and towards my right leg" | 172.70 |
| `vacilala-14` | — | `follower` | `footwork` | "Front, front, opposite — he lets go there — then carry on front and in to his right foot." | "five six seven she goes front front and opposite this is the moment when I release then she goes yeah carry on front and towards my right foot" | 183.02 |
| `vacilala-15` | — | `follower` | `arms` | "Once he lets go, your arms are yours to control." | "another thing she has to control her arms" | 195.58 |
| `vacilala-16` | 3 | `follower` | `arms` | "Arms up on 3." | "controlling arms means we put them up on three" | 205.52 |
| `vacilala-17` | 3 | `follower` | `arms` | "Not earlier — you'll hit him, and he hasn't released yet." | "if we put them up earlier we can hit the guy and also he doesn't release it's even a bit tiny later than three" | 208.20 |
| `vacilala-18` | 3 | `follower` | `arms` | "He releases around 3 — that's the moment you start opening." | "because around three I release it and this is the moment when she can start opening arms." | 213.72 |
| `vacilala-19` | 3 | `follower` | `arms` | "It cannot be later than 3." | "But it cannot be later than three so we're going one two three" | 219.38 |
| `vacilala-20` | — | `follower` | `arms` | "As soon as he releases your hand, bring your hands up." | "as soon as the guy releases your hand for your hands to come up" | 224.66 |
| `vacilala-21` | — | `follower` | `arms` | "Don't lift them while you're already turning — you'll elbow your partner." | "because if you start putting your hands up as you're turning you can elbow your partner" | 227.76 |
| `vacilala-22` | 1, 2, 3 | `follower` | `arms` | "One, two, up — while you're still facing him." | "so that's why we're going one two up so while you're still looking at the at your partner and you're facing him hands up and then just five six seven" | 233.76 |
| `vacilala-23` | — | `follower` | `styling` | "Hold it like an ancient column: elbows rounded, a round shape on top, palms up to the ceiling." | "I always compare it to ancient Greek monuments so elbows quite like a column a bit. Like you're holding something. Body is a column and then on top of the column there is always like this more rounder part so her arms are creating like a round shape and palms are facing the ceiling." | 245.52 |
| `vacilala-24` | 1 | `follower` | `arms` | "On 1 do the look and rotate the arms in — left hand to his shoulder, right hand down." | "And then on one one I do the look and I actually rotate them in so that I can put left hand on the shoulder and right hand just goes down." | 264.78 |
| `vacilala-25` | — | `follower` | `styling` | "Take your time with it — there's no rhythmical moment to hit here." | "you can take your time. You don't have to hit any rhythmical moments in here. You can take your time and develop this movement as smooth as you feel." | 285.30 |
| `vacilala-26` | — | `leader` | **`lead`** | "The moment she opens her arms is the moment you release her arm out to the side for the turn." | "When Ola opens arms, it's the moment when I release her arm to the side for the turn. So I open, I release her arm and then she carries on with arms up" | 322.62 |
| `vacilala-27` | — | `follower` | `arms` | "Carry the arms up in a circular motion from the open position — not straight across." | "and then she carries on with arms up in a circular motion, not this way. That will look strange." | 330.78 |
| `vacilala-28` | — | `leader` | `musicality` | "The bar where you step back is free — activate your body, shoulders, ribcage." | "One, and I step back. You can activate your body, but shake. Move your shoulders, move your ribcage." | 446.98 |
| `vacilala-29` | — | `both` | `concept` | "Getting back in sync for the Dile que no is the other useful thing this trains." | "Dilek and on. So the synchronizing for Dilek and on, it's another very, very useful element." | 478.98 |
| `vacilala-30` | — | `both` | `concept` | "This is the basic way to release your partner mid-dance and get her back." | "When we teach you how to release your partner while dancing, and how to get back. The basic way is to do it with Basila." | 484.38 |
| `vacilala-31` | — | `both` | `concept` | "Release her, dance something on your own, catch her back. Take the middle out and it's just Vacilala." | "So I can release her. Two, two, five, six, seven, dance something by myself. Five, seven and then catch her back. But if we take away this middle part, it's just Basila." | 492.86 |
| `vacilala-32` | — | `both` | `context` | "Vacilala por la mano, Vacilala and Sombrero are the same work for the follower; only small differences for the leader." | "Basilala por la mano. Basilala. Sombrero. The same work from girl point of view. From guy perspective, small differences, but small" | 580.12 |
| `vacilala-33` | — | `both` | `context` | "It looks useless at first — you release, she turns, nothing happens. It becomes a very powerful move once you've danced a while." | "At this point it might seem like, oh this Basila is a kind of useless movement, I just release the girl, she turns, nothing happens, it's not so funky. You start appreciating it when you learn how to dance for a bit longer and you will see that this is very very powerful move" | 629.86 |
| `vacilala-34` | — | `both` | `context` | "This is the move that lets you give your partner space while you dance." | "it will allow you to let your partner go, give her a bit of space while dancing." | 649.60 |

#### `vacilala-los-dos` — 5 cues, 1 `lead`

| id | beat(s) | role | kind | text | verbatim | sourceStart |
|---|---|---|---|---|---|---|
| `vacilala-los-dos-1` | — | `both` | `concept` | "Both of you turn: she rotates right, you do a basic left turn out of Guapea." | "and this is the move which includes turns for both of us so when she is rotating to the right I will do basic left turn from Guapea" | 365.42 |
| `vacilala-los-dos-2` | — | `leader` | `footwork` | "Instead of the three steps back that make her space, go to the left and do a basic left turn." | "So the difference is that instead of doing this three steps back like I told you to create space for the girl I go to the left and I do basic left turn." | 385.72 |
| `vacilala-los-dos-3` | — | `leader` | `context` | "The basic left turn is beginners steps class 1 or 2 — go back to it if you need it." | "Basic left turn if you don't know it again cards this is like class number one or number two of our beginners step scores." | 394.10 |
| `vacilala-los-dos-4` | — | `leader` | **`lead`** | "Lead first, then turn yourself. That is the whole thing." | "is that I first lead, then turn myself. So the most important is to lead first, then you go." | 424.06 |
| `vacilala-los-dos-5` | — | `both` | `context` | "It is a great initiation for CocaCola — do it, then carry on with Vacilala." | "Vasila la, lo dos is obviously great initiation for Coca-Cola. So we do it. And then continue with Vasila." | 546.80 |

`vacilala-los-dos-4` is the highest-value cue in the class and the shortest: the
whole variation reduces to *lead, then go*. It is also the answer to the mistake
every learner makes here, which is turning first and yanking her arm on the way
round. Note it is `kind: 'lead'` and carries no beat — the teachers give an
ordering, not a count, and inventing a beat would be a guess.

**R4 check.** Three passages name both roles and are split:

- @122.56 "on three **I** release, zoom, and **Ola** continues turn by herself" —
  one sentence, two cues 2.16s apart (`-6` leader `lead`, `-7` follower
  `footwork`). The release and the unguided turn are the same event seen from two
  sides and they are not one instruction.
- @195.58 "another thing **she** has to control **her** arms" / @196.98 "one thing
  is that **I** am stepping back for **my own** security **but then she** knows how
  to move arms as well" — the leader half is already cue `-11`, so only the
  follower half becomes `-15`.
- @322.62 "When **Ola** opens arms, it's the moment when **I** release **her** arm"
  → `-26` leader `lead`; the follower's side of the same beat is `-27` @330.78.

`vacilala-8` is the only `role: 'both'` drillable cue in the class ("Finish with
Dile que no") and contains no possessive limb reference, as the type's doc comment
requires.

**Drillable counts.** `vacilala` **22** against a cap of 8; `vacilala-los-dos`
**2**. Flagged, not trimmed. The `vacilala` split that works here is **not** by
role — it is 8 leader / 14 follower, which is the most follower-heavy move in the
range, because the entire second half of the teach block is Ola explaining her own
arms. The honest sub-sectioning (R5) is:

| Sub-section | Cues |
|---|---|
| The lead: pull and release | `-3`, `-4`, `-5`, `-6`, `-26` |
| The leader's feet: making space | `-9`, `-10`, `-11`, `-12`, `-28` |
| The follower's feet | `-7`, `-13`, `-14` |
| The follower's arms: when | `-15`, `-16`, `-17`, `-18`, `-19`, `-20`, `-21`, `-22` |
| The follower's arms: shape | `-23`, `-24`, `-25`, `-27` |
| Why it matters | `-2`, `-29`, `-30`, `-31`, `-32`, `-33`, `-34` |

Five of the six sub-sections are drillable on their own and none exceeds 8. This
is the clearest case in the range for R5's "sub-sections expected" and for
capping per sub-section rather than per move.

### 14.5 Known defects — Class 14

| Flag | Defect | What to do |
|---|---|---|
| **K14-a** | The `count` chapter boundary (300.0) **splits the count-in**: "Five@299.20 six@300.08 seven@300.58". The announcement "We'll do that from Guapea" @295.52 is also on the wrong side. Worse, the 63-second chapter holds only **29.2s of demo** — 29.5s of it (319.22–348.42) is Ola explaining the circular arm motion. | Published slow clip starts at **299.20**, not at the chapter boundary, and its `caveat` says so. Segment keeps 300.0 with a `warning`. **Every one of the seven classes in this range has a `count` chapter that misreports its contents** — see GC-c and the K*-a row of each class; this is the single most consistent defect in the course data. |
| **K14-b** | Chapter 6 ("with music", 79s) is **half a lecture**: 435.56–446.98 dances, 446.98–461.60 is a body-movement digression, 461.88–477.86 dances, and 478.98–511.82 is the "how to release your partner and get back" teaching plus a demonstration. | Split at **478.98**, word-anchored on "**So** the synchronizing for Dilek and on". `cc14-music-both` 435–478.98 (`music`), `cc14-teach-release` 478.98–514 (`teach`). Four cues (`-29`, `-30`, `-31`, and `-28` from the digression) come out of the material the chapter title hides. **Fourth class in a row** where a non-`teach` chapter contains real teaching (K9-e, K12-c, K13-b, K14-b). |
| **K14-c** | **`vacilala-los-dos` has no `count` chapter.** Its `teach` chapter holds two counted reps of 11.54s and 8.24s with 26.6s of speech between them, and nothing else in the class isolates it slowly. The published `slow` is therefore **11.54s**, under the 20s floor. | Published with the length in its `caveat`, plus two alternates including the 46.36s both-reps window, so a reviewer can choose. Steps-spec precedent: `cross-front-and-back-fast` ships at 17.2s because "a clean 17s loop beats a 32s loop of the wrong move". **Do not synthesise a longer slow clip by splicing.** |
| **K14-d** | The `skip` outro (629–715) opens with **62 seconds of substance**: the argument for why Vacilala is worth learning (629.86–688.26), which is the only place in the class that says what the move is *for*. Two cues (`-33`, `-34`) come from a chapter the vocabulary says to throw away. | Split at **690.96** — the word start of "**and** if you would like to see more classes… like subscribe" — into `cc14-outro-why` (`teach`) and `cc14-outro` (`skip`). `cc14-outro-why` is in `vacilala`'s `segmentIds`. **Generalised into GC-f**: this defect prompted a sweep of all seven outros in the range and **every one of them has pre-boilerplate content** (17s to 105s of it). Classes 11 and 14 are resolved; 8, 9, 10, 12 and 13 are listed in GC-f with their windows and are **not** resolved. |
| **K14-e** | **Alias prefix collision.** Whisper renders *Vacilala* as "Basila La" and *Vacilala por la mano* — a different move, taught outside this range — as "Basila La Por La Mano". A naive substring or fuzzy alias match on `'Basila La'` matches both, and this class says both names within 20 seconds of each other (@580.12, @582.66). Bare `'Basila'` and `'Vasila'` are also in `vacilala`'s alias list and are proper prefixes of the other move's forms. | Alias resolution must be **longest-match-first**: try every alias of every move, sort candidates by matched length descending, and take the longest. This is a search-implementation requirement, not a data one, and there is nowhere in the types to record it — hence this row. Do **not** solve it by deleting the short aliases; "it's just Basila" @506.78 and "continue with Vasila" @556.86 are real references to `vacilala` and R1 requires them to be findable. |
| **K14-f** | `composedOf: ['vacilala', 'left-turn-side']` rests on a two-step inference: the teacher says "class number one or number two of our beginners step scores" @397.22 (imprecise — it is Class 2), and never says *which* left turn, only "basic left turn". `left-turn-side` is the match because the turn comes out of Guapea, a side basic; `left-turn-front-back` (steps Class 4) is the other candidate. | Ship `left-turn-side` and record the reasoning here. A human watching 374–420 can settle it in ten seconds. If it turns out to be the front-and-back turn, change one string in `composedOf` — nothing else depends on it. |
| **K14-g** | **Speaker attribution in 195–295 and 322–360 is inferred from content, not from the transcript.** Whisper has no diarisation, so "And then on one I do the look and I actually rotate them in so that I can put left hand on the shoulder" @264.78 is assigned `role: 'follower'` because the described limbs are hers, not because the data says who spoke. The passage also switches speakers mid-flow ("you want to go through that yeah" @202.x is Michal handing over to Ola). | Eleven cues (`-15`…`-25`, `-27`) depend on this. They stay at `confidence: 'transcript'`, which is exactly what that value means. **This is the highest-value item in the class for a verification pass** and it is cheap: one listen to 195–295 confirms or breaks all eleven at once. Do not upgrade any of them to `verified` individually. |
| **K14-h** | The `teach` chapter boundary (39.0) falls **between "This"@38.58 and "time"@39.10**, so the first word of the class's first instruction is in the `skip` chapter. 0.42s. | Segment stores 39.0 with the word-anchored 38.58 in `provenance`; `teachStart` on the `TeachingSource` is **38.58**, because the deep link is what a learner actually clicks and it should not open mid-word. Sub-second and harmless, recorded because a later pass cross-checks every number and would otherwise flag 38.58 as unsourced. |
| **K14-i** | The `review` chapter (544–629) carries two facts, not just calls: `vacilala-los-dos-5` (@546.80, the CocaCola entry) and `vacilala-32` (@580.12, the por la mano / Vacilala / Sombrero equivalence). The rest is calls, several badly mangled. | Both shipped as cues; the chapter is in both moves' `segmentIds` with `reviewsEarlierMoves: true`. Clean calls for a future `callSheet`: 546.80 "Vasila la, lo dos" · 555.46 "Vasila" · 560.12 "Vasila la por la mano" · 563.22 "Exhibela" · 568.48 "El uno" · 580.12 "Basilala por la mano" · 582.66 "Basilala" · 584.16 "Sombrero" · 607.20 "egzibela" · 608.92 "otra" (with its own gloss @608.92, "otra always repeats the last comment"). **`CallSheetEntry.call` is documented as verbatim including manglings**, so these go in as spelled. Two calls at 596.56 ("pladoplea") and 597.54 ("lardegzibela") are too mangled to resolve to a move id and must ship with `call` only and no `move` — do not guess them. |
| **K14-j** | **One official short for two moves.** `c0H4GQnYjNE` is 22.634s and is the `fast` clip for both `vacilala` and `vacilala-los-dos` (`shared: true` on both), and no one knows which move it shows — it is un-transcribed (§0.5) and it may well show only one of them. | Both carry the caveat. The 16/9 alternate **516.52 → 544.38** is the honest fallback and is better attributed: it holds one Vacilala rep and two los dos reps, so if the short shows only Vacilala, `vacilala-los-dos` should publish the alternate instead. Same shape as Class 10's shared short, and the same resolution: **watch it before publishing.** |

---

## 15. Totals and handover

Counted from this file, not estimated.

| | Count |
|---|---|
| Moves defined | **10** (`adios-con-la-hermana`, `enchufla-mix`, `sombrero`, `enchufla-doble-alarde`, `enchufla-doble-alarde-exhibela`, `setenta`, `paseala`, `cocacola`, `vacilala`, `vacilala-los-dos`) |
| Additional `TeachingSource`s on moves defined elsewhere | **1** (`exhibela-crossing`, from Class 10) |
| Classes | 7 (8–14) |
| YouTube chapters checked against the transcript | **61 of 61** |
| `ClassSegment`s shipped | **67** — 61 chapters plus **6 splits** where a chapter's role misdescribed its contents (Classes 11, 12 ×2, 13, 14 ×2) |
| Cues | **206** |
| Cues with a `sourceStart` | **206** (mandatory, R3) |
| Cues at `kind: 'lead'` | **58** |
| Cues at `confidence: 'suspect'` | **4**, all in Class 11 (K11-b, K11-c) |
| Published clip windows | **22** — 11 `slow`, 11 `fast` |
| Alternate windows kept for review | **24** |
| Per-class defect flags | **45** (`K8-a` … `K14-j`) |
| Course-wide defect flags | **6** (`GC-a` … `GC-f`) |

Per class:

| Class | Moves | Segments | Cues | of which `lead` | Defects |
|---|---|---|---|---|---|
| 8 Adios con la hermana | 2 | 8 | 20 | 7 | 4 |
| 9 Sombrero | 1 | 7 | 26 | 8 | 5 |
| 10 Enchufla, Alarde, Exhibela | 2 (+1 source) | 11 | 27 | 8 | 6 |
| **11 Setenta** | 1 | 9 | 20 | 6 | 6 |
| 12 Paseala | 1 | 11 | 33 | 10 | 7 |
| 13 CocaCola | 1 | 10 | 41 | 12 | 7 |
| 14 Vacilala, Vacilala Los Dos | 2 | 11 | 39 | 7 | 10 |

### What a reviewer should do first, in order

1. **Class 11's four `suspect` cues** (K11-b, K11-c). Setenta is the charter's
   reference move and its lead cues are the least trustworthy in the range —
   "Left hand upright down", "Six on your head", "I'll put my head inside there".
   Try `uv run scripts/transcribe_salsa.py ids QueWxI6vMrc --force` before
   watching; the decoder is non-deterministic on this audio.
2. **Class 14's speaker attribution** (K14-g). Eleven cues rest on inferring that
   Ola is speaking from 195–295. One listen settles all eleven.
3. **The seven official shorts** (§0.5). None is transcribed, all eleven `fast`
   clips are the whole file, and **three of the seven shorts serve more than one
   move**: `fNXwnQuVdEI` three (Class 10, K10-c), `JkwUzKb_X-8` two (Class 8),
   `c0H4GQnYjNE` two (Class 14, K14-j).
   Also: they downloaded at **720x1280**, not 1080x1920.
4. **The outro sweep for Classes 8, 9, 10, 12 and 13** (GC-f). Windows are listed;
   Class 9 @454.90 is the likeliest to yield a cue.
5. **The `count`-chapter audit** (every class's `K*-a`). Not one of the seven
   `count` chapters contains what its length implies. That is a defect in the
   chapter metadata, not in this spec, but it is the reason no `slow` clip in this
   range is cut on a chapter boundary.

### What was not done

- **No cue was invented and no timestamp was rounded.** Every `sourceStart` and
  every clip boundary in this file is a word-level start or end read out of
  `data/cache/salsa/whisper/<VIDEO_ID>.norm.json`. Count-along vocalisations
  ("king king hop", "cheeky cheeky", "kum tiki pa", "nyah nyah") were treated as
  rhythm, never parsed into cues.
- **No type was changed and none is required.** Two non-blocking recommendations
  stand (§0.4): `SalsaMoveKind` gains `'partner-move'`, `SegmentRole` gains
  `'angle'`. Both are one union member and one render branch.
- **Nothing was reordered.** The file runs 8 → 14 in playlist order.
- **Nothing was verified by eye.** Every `confidence` in this range is
  `'transcript'` or `'suspect'`; there is no `'verified'` value anywhere, which is
  accurate. Trust grade V on two clip windows (§0.2) means the *window* is
  transcript-exact, not that a human watched it.

# Intermediate Cuban Salsa — Steps + Couples — build plan

> **Status: researched, approved, not yet built.** Charter: `SALSA_TAB_GOALS.md`
> (R1–R5). Precedents: `SALSA_COUPLES_PLAN.md` (how the last course was planned)
> and `SALSA_VERIFICATION_LOG.md` (what went wrong and how it was recorded).
>
> Every number below was pulled from YouTube on 2026-09-23 with
> `scripts/probe_salsa_intermediate.py` and cached to
> `data/cache/salsa/info/*.info.json`. Nothing here is estimated from the
> beginners courses except the clip-size projections, which say so.

The charter already committed to this: *"The tab is designed so intermediate,
rueda, bachata and musicality can be layered in later without re-architecting."*
This is the first cash-in of that promise, and the research below says the
promise holds — `salsa-types.ts` needs two new `SalsaCourse` literals and
nothing else.

---

## 1. What the source material actually is

Three playlists, 60 videos, 6 hours 23 minutes.

| Playlist | ID | Videos | Total |
|---|---|---|---|
| Intermediate Cuban Salsa **Steps** Course | `PL8hFYIpg2Jp3kM2u_D5wF1d2fNUMfRW7H` | 14 | 166 min |
| Intermediate Salsa Moves **for Couples** | `PL8hFYIpg2Jp1CW7M5O6IUQ_Jw1AFxVX_T` | 31 | 217 min |
| Intermediate Salsa Moves — **Shorts** | `PL8hFYIpg2Jp21h2_iK_2w6T_FxhEJD7wS` | 15 | 10 min |

### The structural surprise: "couples" is not a course

The beginners couples playlist is 21 numbered classes, each teaching several
moves. **The intermediate couples playlist is not a course at all** — it is 22
standalone per-move videos of 2–6 minutes, plus 4 longer sequence videos, plus
styling and theory. There is no "Class N" anywhere in the titles.

That is *easier*, not harder: one video is one move, so the many-to-many
class↔move mapping that dominated the beginners couples work mostly disappears.
But it means the data must not be forced into a 1..N class numbering that the
channel never assigned. See §5.

### Intermediate steps: 14 classes, one move each

| # | Move | Video | Dur | Chapters |
|---|---|---|---|---|
| 1 | Cuba Libre | `g0h32MDXV6Q` | 764s | 8 auto-gen |
| 2 | Toe-Heel-Cross | `mXK-uPDBlRg` | 821s | none |
| 3 | Malibu | `UGD79mroi9E` | 691s | none |
| 4 | Triple jump | `hf4Lo0mXaG4` | 531s | none |
| 5 | Charanga wave | `I8a_F5iOXp8` | 406s | 5 auto-gen |
| 6 | Pilon | `IQ41651xh8Q` | 584s | none |
| 7 | Mojito | `AthN6Dl2zqw` | 529s | none |
| 8 | Cachan | `j3O7xmKbaAE` | 656s | none |
| 9 | Salsa→Son / Son→Salsa transition | `nBHFEQU1CnA` | 543s | 5 auto-gen |
| 10 | Fast double right turn | `DSpArsCN860` | 1008s | 8 auto-gen |
| 11 | Elegua basic step | `gPDxOZsjEbo` | 815s | none |
| 12 | Palo (basic + salsa variation) | `hRy-a1NI888` | 984s | **9 authored** |
| 13 | Chango | `z_0VsWZJNqc` | 715s | **8 authored** |
| 14 | Arara (two steps) | `avhrmPAd_VI` | 893s | **10 authored** |

Move names are from each description's own `Steps in this video:` list, not from
the title's parenthetical — R1.

Class 9 is a `skill`, not a `step` (the teachers' own distinction, already in
`SalsaMoveKind`). Class 10 is a `turn`. Class 14 teaches **two** Arara steps and
is the one class in this course that is not one-move-one-class.

### Intermediate couples: 22 moves + 4 sequences

Moves, in playlist order, with the official short where one exists:

| # | Move | Video | Dur | Short | Chapters |
|---|---|---|---|---|---|
| 1 | Sombrero Complicado | `Bmz_K32Ybxo` | 171s | `CuUwwKNxCuI` | 4 auto-gen |
| 2 | Balsero | `pY55QVrPals` | 159s | `9TRul_cN9ts` | none |
| 3 | Tiramisu complicado | `kr0fYDZABME` | 197s | — | none |
| 4 | La Botella | `_A0VNIVvhtA` | 166s | `K5gDS-XIF3Q` | 3 auto-gen |
| 5 | Setenta Complicado | `YOYk3Wbcf_M` | 304s | `TFc1glp6XXY` | none |
| 6 | El Dos | `SOjNHsjPFL4` | 255s | — | none |
| 7 | Paseala Complicado | `7ugimJ0MFas` | 313s | `eWR8KHyoQXw` | none |
| 8 | Sombrero por dabajo | `QAixPUmIQ64` | 208s | `nolwu7BcRdc` (+2, see §2) | **7 authored** |
| 9 | Santiago | `mwifx01N5KI` | 175s | — | **7 authored** |
| 10 | Setenta y cuatro | `_L36hAcjsXg` | 332s | `5XYM9h_TYoU` | **7 authored** |
| 11 | Bayamo | `sjPliNxddxQ` | 206s | `cBPUTs6I3J4` | **7 authored** |
| 12 | El uno complicado | `N1T5fjywnh8` | 216s | `A_5VmrVYuXA` | **7 authored** |
| 13 | Montaña | `X9Ad-ljIw-c` | 234s | `AtQqi_5hNCY` | **7 authored** |
| 15 | Chocolate | `6Fb_DL3TN9Y` | 281s | — | **8 authored** |
| 16 | Enchufla Triple Mix | `MRpIKs0iQD8` | 217s | — | **7 authored** |
| 17 | Gota De La Sombra | `8E6SV_3TxYo` | 382s | — | **8 authored** |
| 18 | Quebrala | `K5LSifs80fc` | 200s | — | **7 authored** |
| 19 | Muchacho | `qaX9s-YzvKE` | 192s | — | **7 authored** |
| 20 | Codo de la rabia | `Dcsd-Yt1Vug` | 231s | — | **7 authored** |
| 24 | Donde vas | `-oIcWUIwlx4` | 189s | `_9amNey_heg` | **7 authored** |
| 27 | Abanico | `8qLrLTk1aVE` | 184s | `WEa9tZMpSvc` | none |
| 31 | Chihuahua | `nFe3BF8ln5s` | 221s | `YVxWBaVaJO8` | none |

Sequences getting the full treatment (approved scope):

| # | Sequence | Video | Dur | Chapters |
|---|---|---|---|---|
| 14 | Casino con estilo | `ScbrkgnWV8s` | 1160s | **11 authored** |
| 21 | Casino con estilo 2 | `uMun9OrDKPc` | 1317s | **11 authored** |
| 22 | Salsa con Rumba for Couples | `FtsTDpd8ARA` | 1346s | **10 authored** |
| 25 | Salsa sequence with Aguajea and Caminala | `vjcWjUOy0po` | 292s | **4 authored** |

Video 23 (`fPOzAAf8z0I`, 129s, "Salsa con Rumba for Couples (with music)") is
**not** a separate entry — it is the full-tempo demo of sequence 22 and is that
sequence's `fast` clip source. Sequence 22 is the one entry whose two tempos come
from two different videos.

**Link-only, no clips and no cue extraction** (approved): video 26 `MRYPsGBpmoo`
(24-min theory talk, nothing to clip), 28 `oDEXcK_HAPw` (Caminala Variations),
29 `Z2jM4P7KqTE` (ladies styling — Dile que no), 30 `R9KM_ysfppc` (styling ideas
— Vacilala). The two styling videos are follower-focused, which cuts against
R4's leader-first default; they are surfaced as "related material" on the moves
they style rather than indexed as moves.

22 + 4 + 1 clip-source + 4 link-only = 31. ✓

---

## 2. Findings that change how the work is done

These four are the whole reason this document exists. Each one is a trap that
would have cost hours if hit during the build instead of before it.

### 2a. `chapters` is NOT evidence of authored chapters — check the description

7 of 14 intermediate steps classes report YouTube chapters, but only **3** of
them are the channel's own. The rest are YouTube's auto-generated chapters, and
they are worthless for clip windows.

The discriminator is cheap and exact: **an authored chaptering always appears in
the description under `Table of contents / video index:`.** Auto-generated ones
never do. Two independent tells confirm it:

- Authored chapters use the channel's fixed vocabulary — `Intro`,
  `About this class`, `<Move> with count - Front camera`, `<Move> with music -
  Back camera`, `Review of all salsa steps with music`, `Summary / Outro`.
  Auto-generated ones use LLM-ish prose — `Motivation and turning tips`,
  `Final encouragement`, `Context and importance`, `Style and practice`.
- Steps Class 9's auto-generated chapters are at **428.0s and 429.0s** — one
  second apart. No human chapters a class that way.

Authorship is a clean function of upload date, which is a useful cross-check:

| Window | Authored ToC? |
|---|---|
| before 2020-08-05 | no — steps 1–11, couples 1–7 |
| 2020-08-05 → 2022-01-06 | **yes** — steps 12–14, couples 8–25 |
| 2022-03-25 onward | no again — couples 26–31 |

**Rule for the build:** a segment boundary may be taken from `chapters` only if
that video's description contains `Table of contents`. Otherwise the boundary is
derived from the transcript and graded D, exactly as in the beginners steps
course. `provenance` records which.

### 2b. The authored move videos have a perfectly regular shape

For the 13 couples move videos with authored chapters, the chaptering is
identical every time:

```
  0s   Intro
 18s   About this class
  …    <Move> with count  - Front camera     <- slow clip, preferred
  …    <Move> with count  - Back camera
  …    <Move> with music  - Back camera
  …    <Move> with music  - Front Camera     <- fast clip, preferred
  …    Summary / Outro
```

So for 13 of 22 moves the slow and fast windows are **read straight off the
chapters** with the move's name in the chapter title — higher confidence than
anything in the beginners courses, where the boundaries had to be matched to
transcript events. Front camera is preferred for both tempos: it shows the
leader's hands, which is what R3 is about.

`About this class` always starts at exactly 18s. Do not treat that as suspicious
— it is the channel's fixed intro length, confirmed across 17 videos.

### 2c. Three shorts share one title, and at most one can be right

The shorts playlist carries its own "Class N" numbering that matches **neither**
playlist's order (Montaña is "Class 1" in the shorts and 13th in the couples
playlist), so shorts must be matched to moves **by name, never by number**.

Worse, the numbering is self-contradictory — two shorts are both labelled
Class 9 — and three different videos are all titled *Sombrero por Debajo*:

| Short | Titled | Labelled |
|---|---|---|
| `nolwu7BcRdc` | Sombrero Por Debajo | Class 4 |
| `_a5fC4nGz1c` | Sombrero por Debajo | Class 9 |
| `hET29nU1hV8` | Sombrero por Debajo | Class 13 |

There is exactly one Sombrero por dabajo move video, so **two of these three are
mistitled and show some other move.** The nine moves with no short are the
candidate pool: Tiramisu complicado, El Dos, Santiago, Chocolate, Enchufla
Triple Mix, Gota De La Sombra, Quebrala, Muchacho, Codo de la rabia.

This is settled by *watching the three shorts*, not by metadata, and it is the
one task in this plan that cannot be delegated to a transcript. The charter
already anticipates this class of defect (it records `Kentucky` misspelled
`Kentukcy` in its own short's title). Until resolved, only `nolwu7BcRdc` is
attached to Sombrero por dabajo and the other two are held back — never guessed
onto a move.

### 2d. The downloader's `player_client` flags lie about resolution

`download_salsa_videos.py` passes
`--extractor-args youtube:player_client=ios,web_safari,mweb`. That is correct for
*downloading* but actively misleading for *metadata*: those three clients get
their good formats skipped (SABR-only for `ios`, missing GVS PO token for
`mweb`), so `info['height']` comes back **360** for every intermediate couples
video. Read literally, that says the source is too soft to read footwork from and
the whole course is not worth building.

It is wrong. Left to itself the extractor picks `visionos`, lists the full HLS
ladder, and every one of these videos offers **1080p and 720p**. Verified
directly with `yt-dlp -F` on `Bmz_K32Ybxo`.

`scripts/probe_salsa_intermediate.py` therefore omits the `player_client`
override and records `max_height` computed from the format list rather than
`info['height']`. Both the omission and the field carry comments saying why, so
this is not rediscovered.

---

## 3. Space: the actual constraint

This is why the new repo exists, and the numbers are worse than they look.

| | Now |
|---|---|
| Built site `frontend/out` | **1,278 MB** |
| of which `out/clips` | 1,098 MB |
| everything else | 180 MB |
| `.git` | 1.2 GB |

**GitHub Pages documents a 1 GB limit per published site. We are already 28%
over it** and the last deploy succeeded anyway — so the limit is not currently
enforced, but the site is out of compliance today, before adding anything.
Intermediate will add roughly 415 MB (§7), taking it to ~1.7 GB.

**Approved split:** a new repo holds every salsa clip; the main repo keeps the
rest.

| Repo | Contents | Size |
|---|---|---|
| `lemony312/perfect-workout` | app + bodyweight/workout/posture/stretching clips | ~680 MB ✓ |
| `lemony312/perfect-workout-media` | `salsa/` beginners 524 MB + intermediate ~415 MB | ~940 MB ✓ |

Both under 1 GB. Media headroom is thin (~60 MB), so **the URL indirection is
designed per-course from the start**: the frontend resolves a clip base per
course rather than one global base, so splitting intermediate onto a third repo
later is a config change and not a refactor. Do not hardcode one media origin.

Clips stay at the current encode — 1280x720 H.264, ~1.2–1.7 Mbps, audio kept.
Resolution is not a knob to turn here: the download script's own comment records
that 360p was "too coarse to read footwork from, which is the entire purpose of
the clip", and the spoken count is the metronome so the audio cannot be dropped.
Re-encoding leaner is the escape valve if media headroom runs out, and it is
deliberately *not* being spent up front.

`data/` is gitignored, so the ~5 GB of newly downloaded source video never
enters git. Only cut clips are committed.

---

## 4. Execution

Sequenced so that anything unattended runs first and every later step has a
cheap local check. Steps 3–7 are the loop delegated to sonnet subagents, batched
the way the beginners couples fragments were.

### Step 1 — Register the courses in the pipeline scripts

`scripts/transcribe_salsa.py`: add `INT_STEPS` (14) and `INT_COUPLES` (26 — the
22 moves, the 4 sequences, and `fPOzAAf8z0I`) to `COURSES`.

**Add all 15 intermediate shorts to `SHORTS`.** They are music-only, and the
`MUSIC_ONLY` guard already in that file (hazard K5-a) will then refuse to
transcribe them. Transcribing a music-only clip produces hallucinated cues that
read exactly like real ones — this is the single cheapest hazard to close and it
must be done *before* anyone runs the transcriber, not after.

`scripts/download_salsa_videos.py`: add the 60 new ids.

### Step 2 — Download and transcribe (unattended)

```
uv run scripts/download_salsa_videos.py int-steps
uv run scripts/download_salsa_videos.py int-couples
uv run scripts/download_salsa_videos.py int-shorts
uv run scripts/transcribe_salsa.py int-steps
uv run scripts/transcribe_salsa.py int-couples
uv run scripts/normalize_salsa_terms.py
```

One group per invocation: the `what` argument is a single `choices=` value, not a
list. `all` would also work and harmlessly skips the 36 beginners files already
on disk.

383 minutes of speech at ~7x realtime ≈ 55 min of Whisper, plus download time.

**Two bugs surfaced on the first download run and are fixed in
`download_salsa_videos.py`; both matter to anyone re-running this.**

*The `player_client` pin had inverted its purpose.* The script pinned
`ios,web_safari,mweb` because yt-dlp's default `visionos` client once offered only
a muxed 360p. That reversed: `ios` https formats are now skipped as SABR-only and
`mweb`'s need a GVS PO token, so on some videos the only surviving format was 18,
640x360 — while `visionos` now lists the full ladder to 1080p. It showed up as
*per-video* corruption, which is what made it confusing: intermediate steps
classes 4 and 5 came back 360p while class 6 came back 720p on the same run with
identical flags. The pin is gone; the format selector asks for HLS and the
post-download check rejects anything under 700px. Verified: the three affected
classes now download at 1280x720.

*A rejected file was left on disk, poisoning the cache.* The resolution check
logged `BAD` and returned failure but never deleted the file, and `dest.exists()`
is how a resumed run skips work — so every later run reported the 360p reject as
"cached" and it would eventually have become the source for a blurry clip, weeks
from its cause. Rejects are now deleted, and `--recheck` re-verifies files already
on disk instead of trusting that their existence means they are good. Three
int-steps classes had already been poisoned this way and were caught by it.

Run `uv run scripts/download_salsa_videos.py all --recheck` after any change to
the download flags. It is the cheap audit that would have caught both bugs.

Then **read the normaliser's near-miss report.** This corpus is dense in new
Spanish the beginners `ALIASES` has never seen — Cuba Libre, Malibu, Pilon,
Mojito, Cachan, Elegua, Palo, Chango, Arara, Balsero, Tiramisu, Quebrala,
Muchacho, Abanico, Chihuahua, Codo de la rabia, Gota De La Sombra. Expect
manglings and add aliases rather than accepting near-misses silently. Also settle
the outstanding `rueba`→`Rumba` near-miss from the beginners pass while in here,
since `Salsa con Rumba` makes it live.

### Step 3 — Segment maps, clip windows, and cues (sonnet, batched)

Five batches, each one fragment, each checkable against one spec section:

| Batch | Content |
|---|---|
| A | int-steps classes 1–7 |
| B | int-steps classes 8–14 |
| C | int-couples moves 1–13 |
| D | int-couples moves 15–31 |
| E | the 4 sequence videos |

E is split out from D because the sequences are 19–22 minute multi-move lessons
and do not fit the one-move-per-entry shape the other four batches assume. D was
also the heaviest batch by a wide margin with them in it.

Per batch, written to `SALSA_INTERMEDIATE_SPEC_PART{A..E}.md`: segment boundaries
with the transcript event or chapter title each is anchored to, a trust grade
(A authored chapter / D derived / V eye-verified), the slow+fast clip windows,
**and the cues**.

The cues are not optional here and not deferrable to Step 5, which is a mistake
this step's earlier wording invited: it listed cue *rules* in the
non-negotiables below while leaving cues out of the deliverable, and all four
agents in the first pass duly produced a clean skeleton of chapter boundaries
with no cues in it. Step 5 writes TypeScript *from* this spec, so a spec with no
cues would mean inventing cue text at TypeScript-writing time, with no transcript
anchor and nothing for the integrity pass to check — which is exactly what R3
exists to prevent. Cues are also the bulk of the document: the beginners spec
runs 25–40 per class and about 10 KB of markdown each.

The cue table format is in `SALSA_INTERMEDIATE_SPEC_BRIEF.md`; the worked example
is `SALSA_COUPLES_SPEC_PART1.md` §1.4.

Non-negotiables handed to every agent:
- Boundaries from `chapters` **only** if the description has `Table of contents`
  (§2a). Otherwise derive from the transcript and grade D.
- Every cue carries `sourceStart` and `sourceVideo`. No exceptions (R3).
- Leader and follower cues never merged (R4).
- Do not invent Spanish, move names, or beats (R1).
- Whisper's count-along garbling ("5, 6, 7, nya nya") is vocalised rhythm, not
  instruction — do not parse it.

### Step 4 — Cut the clips

Extend the clipper (`scripts/clip_salsa_intermediate.py`, modelled on
`clip_salsa_couples.py`) and cut into
`frontend/public/clips/salsa/intermediate/`. Then regenerate a manifest in the
shape of `CLIP_MANIFEST_COUPLES.md` and verify **every referenced file exists and
every file on disk is referenced** — the beginners pass shipped a manifest
claiming 60 missing files because of a relative-path mistake, so the check runs
with absolute paths.

### Step 5 — Write the TypeScript data

`salsa-int-steps.ts` + `salsa-int-steps-classes/` fragments, and
`salsa-int-couples.ts` + `salsa-int-couples-moves/` fragments, mirroring the spec
parts one-to-one. Add `'int-steps' | 'int-couples'` to `SalsaCourse` in
`salsa-types.ts` — the only type change this whole course needs.

Then the same programmatic integrity pass the beginners course ended with: no
duplicate move ids, every referenced clip on disk, no orphans, no cue missing a
source timestamp, no move `complete: true` with a missing grain.

### Step 6 — The media repo and the clip base URL

1. Create `lemony312/perfect-workout-media`, Pages on `main`/root, no build.
2. Move `frontend/public/clips/salsa/` into it and `git rm` it here. Because the
   history stays in `.git` either way, note this shrinks the *published site*,
   not the clone.
3. Add a per-course clip-base resolver (§3 — per course, not one global origin)
   with `NEXT_PUBLIC_MEDIA_BASE` wired in `deploy.yml`, defaulting to the local
   `basePath` so `npm run dev` keeps working against a local copy.
4. Verify Range requests work cross-origin on the new site — the scrubber in
   `VideoTransport` depends on seeking, so this is a functional requirement, not
   a nicety.

### Step 7 — Pages

Two routes, `/salsa/intermediate` and `/salsa/intermediate/couples`, cloned from
`/salsa` and `/salsa/couples` respectively. `SalsaCourseSwitcher` grows from 2
entries to 4 and needs its `active` prop widened; at 4 pills it must be
re-checked at 320px against `scripts/test_mobile_layout.py`, which is exactly
where the last regression came from.

Intermediate steps gets **no drill mode** initially, for the reason the beginners
couples page documents: the drill stores one cursor under one key and running a
second course through it would interleave progress.

### Step 8 — Verify and ship

`next build`, `tsc`, `./node_modules/.bin/eslint` (not `next lint`, which this
Next.js removed), `scripts/test_mobile_layout.py` at 320/375/390px. Extend
`SALSA_VERIFICATION_LOG.md` with an intermediate section, then commit and watch
the two Pages deploys.

---

## 5. Data-model decisions

**Do not invent class numbers for intermediate couples.** The channel numbered
neither the move videos nor, consistently, the shorts. `SalsaClass.number` is
documented as "playlist position", so playlist index is the honest value — but
the *UI must not print "Class 13"* for Montaña, because the channel never called
it that. Caption it by move name and source video instead. This is the one place
where reusing the couples page verbatim would produce a false statement.

**One video per move means `TeachingSource.segmentIds` is short** — typically
just the count and music windows plus a breakdown. That is fine; the shape
already allows it.

**Moves that recur across levels are one move with two sources.** Setenta
Complicado, El uno complicado, Paseala Complicado and Sombrero complicado doble
are intermediate elaborations of beginners moves, and `Enchufla Triple Mix`
builds on beginners Enchufla. Model these with `base` / `composedOf` pointing at
the beginners move ids — the field exists precisely for this and this is the
first course where it has cross-course reach.

**`kind: 'lead'` cues remain the point** (R3). The intermediate figures are
harder to lead than anything in the beginners course, so the lead-cue pass is
again the bulk of the work and again cannot be automated away.

---

## 6. Known risks

| Risk | Mitigation |
|---|---|
| Auto-generated chapters mistaken for authored ones | §2a's `Table of contents` rule, enforced per video |
| Two mistitled shorts attached to the wrong move | Hold both back until watched (§2c); never guess |
| Media repo headroom (~60 MB) | Per-course base URL so a third repo is a config change |
| Whisper hallucinating cues from the music-only shorts | `MUSIC_ONLY` guard, extended in Step 1 **before** transcribing |
| `.git` already 1.2 GB and growing | Moving clips out does not shrink history; a future BFG pass is the only real fix, out of scope here |
| Pages' 1 GB limit starting to be enforced mid-build | Step 6 lands before Step 4's clips are committed |

## 7. Effort and size projections

Clip-count and size figures are **projected from the beginners courses** (104
clips, 524 MB, 5.0 MB average) and are the only estimated numbers in this
document.

| | Clips | Projected |
|---|---|---|
| int-steps: 14 moves + Arara's second step, slow+fast | ~30 | ~150 MB |
| int-couples: 22 moves slow+fast | 44 | ~220 MB |
| 4 sequences, slow+fast | 8 | ~45 MB |
| **Total** | **~82** | **~415 MB** |

| Task | Cost |
|---|---|
| Download + transcribe + normalise | ~2 h, mostly unattended |
| Segment maps and clip windows, 4 batches | ~3 h |
| Cut clips + manifest | ~2 h |
| **Lead-cue extraction** | **the bulk — budget a day** |
| Media repo + base-URL plumbing | ~1 h |
| Pages + verification | ~1 h |

The lead-cue pass dominates, as it did for the beginners couples course. That is
the tab's actual value, so it is the right place to spend the time.

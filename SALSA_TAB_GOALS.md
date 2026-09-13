# Salsa tab — goals & charter

> **Status: research complete, nothing built yet.** This document is the
> reference for *why* the Salsa tab exists and what it must always do. Read it
> before changing anything under `/salsa`. Implementation plans go in sibling
> docs (`SALSA_*_PLAN.md`); this file holds the intent.
>
> Companion: **`SALSA_STEPS_OUTLINES.md`** — the per-class breakdown of the
> 15-class solo steps course (segment maps with timestamps, slow/fast clip
> windows, ~300 timestamped cues, and the known data defects). Built from the
> local Whisper transcripts described below.

Single source of truth for content: **La Suerte Dance School**
(`https://www.youtube.com/@LaSuerteDanceSchool`), Michal & Manuela, Manchester
UK. Cuban salsa / casino — *not* LA-style, *not* on2. Every move name, count and
lead cue in this tab traces back to a specific video from that channel at a
specific timestamp. We do not invent terminology.

Starting scope: **beginner steps**. The tab is designed so intermediate,
rueda, bachata and musicality can be layered in later without re-architecting
(the channel has playlists for all of them).

---

## The one-line goal

Turn ~50 long-form YouTube classes into a **named, searchable index of beginner
Cuban salsa moves**, where every move can be practised at three grain sizes —
the full class, the short demo loop, and the individual *lead cue* — so that a
leader can drill "raise the hand on 3" on its own, not just watch a 10-minute
class again.

## Why this tab exists (the spirit)

Watching a salsa class is not practising salsa. The channel's teaching is
excellent but it's locked inside 10–18 minute videos with no way to:

1. **Look a move up by name.** "What's Setenta again?" currently means scrolling
   a 21-video playlist and guessing from titles.
2. **Loop the demo.** The useful 20 seconds of a class is the "fluently with
   count" segment. Everything else is talking.
3. **Drill the lead in isolation.** The hardest part of Cuban salsa for a
   leader is not the footwork — it's the *hand*: which hand, which beat, how
   high, how much tension. These cues are said once, in passing, inside a
   long explanation, and then never repeated.

Point 3 is the reason this tab is not just a playlist embed. **If a future
change makes the lead cues less prominent, that change is wrong.**

---

## Hard requirements

These are non-negotiable; they are what the user asked for.

### R1 — Every move is indexed by name

A canonical move index keyed by the channel's own naming, with Spanish spelling
as the channel writes it (`Enchufla`, `Dile que no`, `Vacilala por la mano`).
Aliases must be searchable — the channel itself is inconsistent
(`Adios con la hermana` vs `Adios prima con la hermana`; `Kentucky` is
misspelled `Kentukcy` in its own short's title). Every move resolves to:
its class video, its timestamped segments, its short (if one exists), and its
lead cues.

### R2 — Three grain sizes per move, always

| Grain | Source | Use |
|---|---|---|
| **Long** | the full class video, chapter-deep-linked | learn it the first time |
| **Short** | the 23–47s vertical short, or a clip cut from the class | loop it while practising |
| **Cue** | written text, beat-numbered | drill one detail |

A move with no short still needs a short-equivalent — cut the class's
"fluently with count" chapter. **A move is not "done" until all three exist.**

### R3 — Lead cues are written down, beat by beat

Every lead action a leader performs gets its own line, anchored to a count.
The user's own example: *if the long-form class says "men, raise your hand on
3", that becomes a standalone practisable cue.* Format:

```
Setenta · cue 2 of 5
  Beat 3   — left hand up, over her head, palm forward. Elbow soft.
  Source   — Class 11 @ 1:42  (youtu.be/QueWxI6vMrc?t=102)
```

Every cue carries its **source timestamp**. A cue without a source is a guess
and does not belong in the data.

### R4 — Leader-first, but not leader-only

The user is learning to lead, so cues are written from the leader's point of
view by default. Follower cues are a separate labelled field, never mixed in —
"your left hand" is ambiguous and dangerous if you can't tell whose hand.

### R5 — Sub-sections are expected

This tab is explicitly allowed to be complicated: solo steps, partnerwork,
body movement, musicality are genuinely different practices with different
session shapes. Don't flatten them into one list to look tidy.

---

## Verified source material

All numbers below were pulled with `yt-dlp` on 2026-09-13 and cached to
`data/cache/salsa/` (`*.tsv` indexes, `info/*.info.json` full metadata).
`data/cache/transcripts/` holds the auto-captions.

### The four playlists in scope

| Playlist | ID | Videos | Length each | Role |
|---|---|---|---|---|
| Beginners Cuban Salsa **Steps** Course | `PL8hFYIpg2Jp1XK-ADBSd0B78_KgkdckYH` | 15 | 6–13 min | **Solo footwork.** The individual work. |
| Cuban Salsa — Beginners Course **for Couples** | `PL8hFYIpg2Jp1EJE3TCWMr0f_zr9WOi10j` | 21 | 7–19 min | **Partnerwork.** The core of the tab. |
| Cuban Salsa Moves for beginners — **shorts** | `PL8hFYIpg2Jp3iVLXSuChwwALAH7fGbgpM` | 15 | 23–47 s | Loopable demos of the couples moves. |
| **Cuban Body Movement** | `PL8hFYIpg2Jp2CFKQZEm1ZLxYR-dxGxi2K` | 4 | 20–36 min | Fundamentals: body, arms, footwork+body. |

Adjacent, staged for later — not in the first build:
**Body Coordination & Isolation** (`PL8hFYIpg2Jp0S7DCXVWi1Lv07LO9_2H5g`, 11
videos: shoulders, ribcage, hips, body waves), **Salsa Musicality**
(`PL8hFYIpg2Jp2q5P72WHrr5yuophGpCKKw`), **Rueda moves**
(`PL8hFYIpg2Jp0aIIUjOAljXCmX7kz-rXyp`), and the intermediate
steps/couples/shorts trio.

### Discovery that makes this tractable: the classes are chaptered

The couples course carries **YouTube chapters on all 21 classes** (7–14 each),
*and* its descriptions list the moves taught explicitly ("During this class we
show and explain how to do: - Setenta"). That is an authoritative,
machine-readable move index straight from the teachers — we do not have to
guess names or eyeball timestamps.

Chapter titles follow a repeating template. Normalise them to five roles:

| Role | Chapter titles seen | Count |
|---|---|---|
| `teach` | "presentation & explanation", "explanation", "presentation" | 28 |
| `count` | "fluently with count" | 16 |
| `angle` | "side view", "front camera", "back camera", "both cameras", "different angle" | 38 |
| `music` | "with music", "practise with music, slow/fast" | 32 |
| `review` | "review with music" | 6 |
| *(skip)* | "intro", "about this class", "summary / outro" | 74 |

`count` is the money segment — that's the loopable demo. `teach` is where the
lead cues are spoken.

### Couples course — the move index (21 classes → ~30 named moves)

Move names are taken verbatim from each class description.

| Class | Title | Named moves | Video | Short |
|---|---|---|---|---|
| 1 | Al centro, arriba, abajo | al centro, arriba, abajo | `MDEAN40DUVY` | **none** |
| 2 | La chica, el chico, los dos | la chica, el chico, los dos | `np3g2IzZ11A` | **none** |
| 3 | Dile que no, Guapea | dile que no, guapea | `y6wC5uHfXG0` | **none** |
| 4 | Enchufla, Enchufla al Centro | enchufla (double, triple), enchufla al centro | `kg5Ztcp5xQU` | **none** |
| 5 | El Uno | el uno | `4KKAKgn8UZ4` | `qwR89NAQgqM` 31s |
| 6 | Kentucky | kentucky, la chica from guapea | `yZ562-ehtQQ` | `V57F7c5R5jY` 41s |
| 7 | Vacilala por la mano | vacilala por la mano | `pZChl5ylSJw` | `18cM9UvzsoI` 32s |
| 8 | Adios con la hermana | adios (prima) con la hermana | `X4Sr8QbXQLU` | `JkwUzKb_X-8` 38s |
| 9 | Sombrero | Sombrero | `lV56IVufYOU` | `Nl714zi8W-A` 34s |
| 10 | Enchufla, Alarde, Exhibela | enchufla (doble, triple) + alarde, exhibela | `CkZO6nyJwjw` | `fNXwnQuVdEI` 46s |
| 11 | Setenta | Setenta | `QueWxI6vMrc` | `TyOHtkirh_g` 45s |
| 12 | Paseala | Paseala | `EuT94T544Mg` | `UsvPdXW4-O4` 31s |
| 13 | CocaCola | CocaCola | `GT7PTpvni_A` | `7MODqLfyTQQ` 24s |
| 14 | Vacilala, Vacilala Los Dos | Vacilala, Vacilala los dos | `jBaHuGXoWBY` | `c0H4GQnYjNE` 23s |
| 15 | Tiramisu | Tiramisu | `f8Y-b3m070c` | `xwwnWPXpKz8` 43s |
| 16 | Sombrero complicado doble | Sombrero complicado doble | `H5Idj-uzmn8` | `wAK8hMxwfes` 38s |
| 17 | Juana la Cubana | Juana la Cubana, (El uno) semi complicado | `uoq2J1txSTE` | `B5A2kgjTvnw` 47s |
| 18 | Dedo | Dedo | `97Urh5GlCbg` | `TM9kP4jy0To` 38s |
| 19 | Santiago | Santiago | `M3J7w59rXTE` | `vlSqi-msy60` 46s |
| 20 | Solo sequence | two solo sequences, release-and-return | `6-cpKa0UMWA` | **none** |
| 21 | All moves demo | *(recap, no new moves)* | `X7lz-BBMmU8` | **none** |

**The shorts gap — the single most important research finding.** The shorts
playlist covers **classes 5–19 only**. There is *no* short for classes 1, 2, 3,
4, 20 or 21 — which is to say: no short for `al centro`, `arriba`, `abajo`,
`la chica`, `el chico`, `los dos`, `dile que no`, `guapea`, `enchufla` or
`enchufla al centro`. Those ten are the absolute foundations, the ones that
need drilling most, and they are exactly the ones with no loopable demo. Per
**R2**, we cut those clips ourselves from the class videos. Do not ship the
tab with these ten as "long video only".

Shorts are 1080x1920 vertical; classes are 1920x1080 landscape. Both aspect
ratios must be handled — the Posture page hit this exact problem
(`POSTURE_ROUTINE_PLAN.md`, step 4).

### Steps course — the move index (15 classes, solo)

No move lists in the descriptions here, and **chapters exist on only 5 of 15**
(classes 1, 2, 3, 15 have them; 4–14 mostly do not). Segmentation for the rest
has to come from transcripts or manual scrubbing — plan for the extra work.

| Class | Named move(s) | Video | Chapters |
|---|---|---|---|
| 1 | Basic side; basic front & back; transitions | `Bah_PB9Ga4A` | yes (6) |
| 2 | Basic turns (right, left) | `4qMJzwT6xPM` | yes (4) |
| 3 | Hook turn; double right | `FUB6hqwNo0o` | yes (4) |
| 4 | Enchufla; left turn | `seH4eLK_S6o` | no |
| 5 | Exhibela crossing | `WMgTtp-CRaQ` | no |
| 6 | Basic body movement *(bonus)* | `U454lXjpKi8` | no |
| 7 | Mambo Cubano | `FNuS26xguaI` | no |
| 8 | Three, Two, One | `E8Y7VwC4ODY` | no |
| 9 | Tapping | `k4H5m9hJ_nA` | no |
| 10 | Tapping on 8 | `nOABL5GW_qk` | no |
| 11 | Cross; Cross & Slide | `8b0zqIk1AHE` | no |
| 12 | Charanga | `Gy8jEBggrLc` | no |
| 13 | Cuban Rumba | `ZArlfy9EakM` | no |
| 14 | Quick 5 | `tlUegbWymak` | no |
| 15 | Salsa warm-up | `qD6Vp3qj48o` | yes (3) |

Note the overlap with the couples course — `enchufla` and `exhibela` appear in
both, taught solo (steps 4, 5) and in partnerwork (couples 4, 10). The index
must model this as **one move with multiple teaching sources**, not two moves
with the same name.

### Cuban Body Movement — 4 long classes

| # | Class | Video | Length |
|---|---|---|---|
| 1 | Basic Body Movement in Salsa | `bB7-7Z7T66w` | 33:53 |
| 2 | Basic Salsa Arms Movement | `PhDBzSN-0sc` | 36:07 |
| 3 | Basic salsa footworks with Cuban Body Movement | `qV2uqPwFGEw` | 20:16 |
| 4 | Basic salsa footworks with Arms | `zv8_lwP4fPE` | 20:02 |

Chaptered as Intro / Explanation / Practise / Practise with music slow /
Practise with music fast / Outro. These are the "fundamentals broken down" the
user referred to — long explanation blocks with a genuinely practisable
`Practise with music` tail. Treat these as a **drills** sub-section, not moves.

### Lead-cue extraction — feasibility, checked

Auto-captions (`en-orig`) exist on every video and were spot-checked on Setenta
(Class 11): 217 cues, and the class really does teach leading explicitly — *"if
you pay attention in every single move how our arms are moving, which signals
we are giving in which moment — it does matter, timing matters, precision of
the lead matters."*

**YouTube's captions turned out to be unusable** — not merely mangled, actively
lossy:

| Caption state | Steps classes | Usable? |
|---|---|---|
| `en-orig` (original-language auto-captions) | 1, 2, 3, 6, 9, 12, 14, 15 | poorly |
| **only `en`** — auto-*translated* from a misdetected language | 4, 5, 7, 8, 11, 13 | no |
| nothing at all | 10 | no |

YouTube did not detect the spoken audio as English (Polish and Cuban accents),
so for six classes it recognised another language and machine-translated back —
Class 7 renders "Mambo Cubano" as "my books warm". And where `en-orig` does
exist, the captions sometimes **delete** a move name rather than misspell it
(Setenta at 4:39 becomes "five six nine"), so mining them would drop cues
silently, with nothing to flag.

**So we transcribe locally.** `scripts/transcribe_salsa.py` — mlx-whisper,
`large-v3-turbo`, ~7x realtime on Apple Silicon. Two details do the work:
`initial_prompt` seeded with the channel's Cuban vocabulary, and
`word_timestamps=True` so a cue anchors to the word, not to a 5-second block.
Measured on Setenta, same audio:

| | YouTube `en-orig` | Whisper + prompt |
|---|---|---|
| "Setenta" recognised | 2 | **10** |
| "Enchufla" recognised | 1 | **4** |
| "cetenta"/"sedan"/"dansko" manglings | 4 | **0** |

**Then normalize.** `scripts/normalize_salsa_terms.py` maps what Whisper hears
onto the spellings the channel writes. This is mostly *phonetic*, not error:
Spanish `h` is silent, so "exhibela" is genuinely pronounced "exibela" and
Whisper is right about the sound and wrong for our index — the correct spelling
was already in the prompt and did not override the phonetics. Class 5 contained
"exibela" x10 and "exhibela" x0, meaning without this pass **the move that class
teaches would be unfindable by name**, breaking R1. Current state: 61
substitutions across 16 transcripts, no unmatched near-misses. The script also
scans for words that resemble a canonical term but match no alias, and reports
them for review rather than rewriting them.

Cue extraction itself is still a **read-the-transcript-with-the-video-open job,
per move, reviewed once.** Whisper garbles the count-along stretches ("5, 6, 7,
nya nya") — though those are the demo segments we cut as clips, not the
explanation segments we mine. Every cue keeps its source timestamp (**R3**) so it
can be re-checked against the video later.

---

## Non-goals

- **No new choreography, no invented moves, no invented Spanish.** If La
  Suerte doesn't teach it, it isn't in the tab.
- **Not a video player wrapper.** If the answer to a design question is "just
  embed the playlist", the tab has failed.
- **No follower-side curriculum.** Follower cues exist as context for leading
  (**R4**), not as a parallel course.
- **Not on1/LA-style or Puerto Rican salsa.** Cuban casino only; mixing
  vocabularies would actively confuse the learner.
- **Not intermediate, rueda, or bachata — yet.** Structure for them, build
  beginner first.

## Success test

The tab works if the user can:

1. Type "seten" and land on Setenta in under 3 seconds.
2. See its 5 lead cues as text, beat-numbered, without playing a video.
3. Loop its 45s demo hands-free while dancing in front of the screen.
4. Jump straight to 1:42 of Class 11 to check one specific cue against the
   source.
5. Do a 10-minute session that mixes footwork drills and partnerwork review
   without choosing what to practise.

If a change makes any of those five slower, it's a regression.

## Design constraints from the existing app

- Practice sessions should feel like `stretching` / `posture`: a timer with a
  countdown ring, looping muted demo clip, spoken cues via `@/lib/cues`, wake
  lock, background music. Reuse that machinery — see
  `frontend/src/app/posture/page.tsx` and `POSTURE_ROUTINE_PLAN.md`.
- Data lives in `frontend/src/data/` as typed TS with doc comments explaining
  provenance (see `posture-routine.ts` for the house style).
- Nav is horizontally scrollable and must stay that way — an overflowing nav
  scales down *every* page on mobile (`scripts/test_mobile_layout.py`).
- Python tooling uses **uv**, never bare venv/pip.
- Clips get re-encoded to h264/aac; sources are often av1/opus, which Safari
  cannot decode.

## Open questions for the next session

1. **Clip locally or embed YouTube?** Every other tab ships self-hosted h264
   clips. ~45 moves x 2 clips is a lot of MB in git. Local clips give offline
   use + frame-accurate loops; embeds give zero storage and stay correct if the
   channel re-uploads. Leaning local for the `count` demo loops (they're 20–45s)
   and deep-linked embeds for full classes.
2. **How granular is a "cue"?** Setenta is ~5 lead actions over 8 counts.
   Is the practisable unit one action, or one 8-count bar?
3. **Session shape.** Does a salsa session look like the timed posture routine,
   or a browse-and-loop reference with an optional drill mode?
## Decided

**Ordering — settled 2026-09-13.** The tab keeps **the order the channel
presents**, i.e. playlist/class order. That sequence is the teachers'
pedagogy and we don't second-guess it. Regrouping happens in *presentation
only* — e.g. surfacing that the turns form a {right, left} x {side basic,
front-and-back basic} matrix spread over classes 2, 3 and 4 — but the canonical
sequence, and the order a learner is walked through, stays as filmed. The
playlist order is encoded in `scripts/transcribe_salsa.py`'s `STEPS`/`COUPLES`
lists.

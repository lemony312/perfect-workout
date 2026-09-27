# Intermediate spec pass — shared brief for all five batches

This is the single set of rules for the five spec batches (A–E) of the two
intermediate La Suerte courses. It exists so the five agents produce documents
that agree with each other; anything specific to one batch is in that batch's
own prompt.

The batches are A and B for int-steps classes 1–7 and 8–14, C and D for the
int-couples single-move videos, and E for the four long sequence videos. E is
split out from D because the sequences are 19–22 minute multi-move lessons and do
not fit the one-move-per-entry shape the other four assume.

Read these first, in this order:

1. `SALSA_TAB_GOALS.md` — the charter. **R1–R5 and the Non-goals are binding.**
2. `SALSA_INTERMEDIATE_PLAN.md` — §1 (what the source is), §2 (the four findings
   that change the work), §5 (data-model decisions).
3. `SALSA_COUPLES_SPEC_PART1.md` — the *format* to imitate. Read its front matter
   and "Conventions used throughout", plus two or three complete move entries.
   Do not read all 211 KB.
4. `frontend/src/data/salsa-types.ts` — the types your output must populate.

## Your inputs

| What | Where |
|---|---|
| Whisper transcript, normalised | `data/cache/salsa/whisper/<id>.norm.json` |
| Whisper transcript, raw | `data/cache/salsa/whisper/<id>.json` |
| Chapters, description, duration | `data/cache/salsa/info/<id>.info.json` |
| The video itself | `data/cache/salsa/videos/<id>.mp4` |

Prefer `.norm.json`. It is the same transcript with the Spanish move names
repaired; the raw file is there for when you need to see what Whisper actually
heard before normalisation.

## The non-negotiables

These are not style preferences. Each one exists because violating it produced a
wrong artefact in the beginners pass.

**Chapters are only evidence if the channel authored them.** YouTube
auto-generates chapters, and auto-generated ones are not segment boundaries —
they are guesses, and they are frequently wrong about where teaching starts. The
discriminator is exact: the video's description contains a
`Table of contents` / `video index:` block. If it does, the `chapters` array is
authored and you may anchor to it and grade **A**. If it does not, the `chapters`
array is auto-generated — **ignore it entirely**, derive boundaries from the
transcript, and grade **D**. Check this per video and state the verdict in your
output. See `SALSA_INTERMEDIATE_PLAN.md` §2a; the upload-date table there
corroborates but does not replace the description check.

**Every cue carries `sourceStart` and `sourceVideo`.** No exceptions (R3). A cue
without a source timestamp cannot be verified later, and the verification pass
treats it as invented. If you cannot anchor a cue, you do not have that cue.

**Leader and follower cues are never merged** (R4). They are separate cue lists
even when the teachers say one sentence covering both. A merged cue is unusable
by whichever partner it was not written for.

**Do not invent Spanish, move names, or beats** (R1). If the transcript does not
say which beat something happens on, the cue does not claim a beat. "Probably on
5" is an invention. Prefer omitting a field to guessing it.

**The count-along is not instruction.** Whisper renders the teachers counting
over music as things like `5, 6, 7, nya nya` or `one two three, and`. That is
vocalised rhythm. Do not parse it into cues, and do not treat a garbled stretch
as evidence of a move name.

**Clip windows are anchored, never tidy.** Give them to the hundredth of a
second, and quote the transcript event (or authored chapter title) each boundary
comes from. A window ending at exactly 42.00 is a tell that it was chosen rather
than found. Grades: **A** both boundaries anchored to a word timing, **D** one
anchored and one derived, **V** contains something worth knowing — and a **V**
always carries a `caveat`.

## Two traps specific to this material

**`int-couples` is not a numbered course.** Its playlist is 22 individually
titled move videos plus 4 sequences, and the channel never numbers them. The
playlist positions in the plan's table (1, 2, … 31, with gaps) are *positions*,
not class numbers. **Never emit a "Class N" label for an int-couples move** — the
channel never called Montaña "Class 13" and the UI must not either. Identify
these moves by name and video id only.

**Three shorts share the title "Sombrero por Debajo"** and at most one of them
can be right: `nolwu7BcRdc` (trusted), `_a5fC4nGz1c`, `hET29nU1hV8`. If your
batch needs one of the two suspect ids, do not guess which move it shows — mark
it unresolved and say so. This is the one question in the whole pass that cannot
be answered from a transcript; it needs someone to watch the video.

## Your output

One file, `SALSA_INTERMEDIATE_SPEC_PART<X>.md`, covering only your batch. Per
move or class:

- The video id, its duration, and your **authored-vs-auto-generated chapter
  verdict with the evidence** (quote the description line, or state its absence).
- The segment map: each segment's id, role, start/end, and the transcript event
  or chapter title it is anchored to, quoted.
- The slow and fast clip windows, to the hundredth of a second, each with its
  anchor quoted and a trust grade.
- **The cues.** This is the bulk of the document and the part with the most value
  in it — see the format below, and budget your effort accordingly.
- Anything you could not resolve, stated plainly as unresolved. **An honest gap
  is worth more than a plausible guess** — the next pass cross-checks every
  number against the transcript and reports invented ones, so a guess costs more
  than it saves.

### The cue table format

Cues are markdown tables, grouped under a `## <n>.4 Cues` heading with one
sub-table per move or per aspect of a move (frame, footwork, arms). The column
order is fixed, because a later pass parses these:

```
| id | beat | role | kind | text | @ | verbatim |
|---|---|---|---|---|---|---|
| `al-centro-frame-2` | — | `leader` | `arms` | Show her the thumb of your left hand. | 274.44 | "I show her thumb of my left hand and she grabs my thumb." |
| `al-centro-3` | [1,2,3,5,6,7] | `leader` | `footwork` | Left, right, left — then right, left, right. | 304.88 | "left, right, left, and right, left, right." |
| `al-centro-rhythm` | — | `both` | `rhythm` | Hear it as "cheeky cheeky, open". | 301.86 | "five six seven and cheeky cheeky open and cheeky cheeky open" |
```

The `@` column **is** `sourceStart` — a real word timing from the transcript, to
the hundredth. `sourceVideo` is stated once per class in prose ("All
`sourceVideo: 'MDEAN40DUVY'`"), not repeated per row. State `confidence` the same
way, per class, and call out the individual rows that differ.

`beat` is `—` when the teachers never said a number. `role` is one of `leader`,
`follower`, `both`. `kind` is one of `footwork`, `lead`, `arms`, `body-movement`,
`styling`, `rhythm`, `musicality`, `concept`, `context` — the full `CueKind`
union, and `salsa-types.ts` is the authority if this list ever falls behind it.

Three of those are easy to collapse into `concept` and should not be: `styling`
is optional decoration ("you can add a little shoulder here"), `body-movement`
is required technique ("the movement comes from the hip"), and `musicality` is
about hearing the music rather than moving to it. Only the first four kinds plus
`rhythm` are drilled aloud, so filing a real footwork cue as `concept` silently
removes it from drill mode.

**All seven columns are mandatory in every row, including `role`.** It is
tempting to hoist `role` into the prose for a solo class where every cue is
`both` — the way `sourceVideo` and `confidence` legitimately are hoisted — but
`role` is a required field on `SalsaCue` and Step 5 reads it from the row. Batch
B did exactly this and the validator read the file as containing zero cues.

The `verbatim` column is what makes a cue checkable: it is the transcript's own
words, quoted, including Whisper's mistakes. Where you correct a mis-hearing in
`text`, the error stays visible in `verbatim` — the beginners spec keeps Whisper's
"not too long" in `verbatim` while the cue reads "not too low", and explains the
substitution in prose underneath. Where the teachers never said something,
neither does the cue: add a `warning` in the prose rather than deducing it.

**Scale check.** The beginners spec runs 25–40 cues per class and about 10 KB of
document per class; class 1 alone has 25 cues across three moves. If your file is
coming out at 2 KB per class, you have written the segment map and skipped the
work. The single most common failure in this pass has been producing a clean
skeleton of chapter boundaries with no cues in it.

Read `SALSA_COUPLES_SPEC_PART1.md` §1.4 (around line 239) for a complete worked
example, including how the prose under each table carries the caveats.

Segment id prefixes, so the batches never collide:

| Course | Prefix | Example |
|---|---|---|
| int-steps | `is<n>-` | `is4-teach-triple-jump` |
| int-couples | `ic-<move-slug>-` | `ic-montana-count` |

Note `int-couples` ids are keyed by move slug, not number — same reason as above.

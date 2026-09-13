// Couples course, classes 8–14 — Adios con la hermana (and the Enchufla Mix
// ending), Sombrero, the Enchufla / Alarde / Exhibela family, Setenta, Paseala,
// CocaCola, Vacilala and Vacilala Los Dos.
//
// Source of every number: SALSA_COUPLES_SPEC_PART2.md.
//
// This range is where the course starts teaching leading rather than steps, so
// it carries the highest density of `kind: 'lead'` cues — and several of them are
// said exactly once, with the partner deliberately held still so the hand is
// visible. Those are the cues the tab exists for; they are also the ones most
// worth eye-checking against their timestamp.
//
// Four things learned while writing this fragment, none of them obvious:
//
//   1. `duration` is the mp4 container, and Class 14 is 715.175 — not the 564.407
//      that a class-7-shaped mistake produces (564.407 is `pZChl5ylSJw`, couples
//      class 7). Three segment ends here overshoot their container by <0.5s
//      (cc8-outro 605 vs 604.648, cc9-outro 566 vs 565.545, cc13-outro 740 vs
//      739.997): those are the spec's chapter ends and are kept as written.
//   2. `ClipPair.alternates` is deliberately NOT used, even though the spec lists
//      24 alternate windows for this range. `SalsaClip.src` is required and no
//      alternate is encoded into `public/`, so any value would be a lie — an
//      empty string resolves to the page URL under `basePath`, which would offer
//      a player for a file that does not exist. Each alternate ships as a
//      `notes` entry carrying its video id, its exact window and why it was held
//      back. Classes 15–21 resolve it the same way.
//   3. `exhibela-crossing` is taught twice — steps class 5 and couples class 10.
//      The object below carries ONLY the couples `TeachingSource` and only the
//      `exhibela-crossing-c10-*` cues, because `salsa-couples.ts` concatenates
//      the three fragments without merging by id. Merging the two courses' data
//      for that one id has to happen there, not here.
//   4. Where the spec's section headers and its cue tables disagree on a count,
//      the tables are what was shipped — they are the data, the headers are
//      arithmetic. §8.4 says 7 `lead` cues for Class 8 and its table marks 5;
//      §13.4 says 12 and marks 11; §13.4/§14.4 say 24 and 22 drillable for
//      `cocacola` and `vacilala` and their tables give 25 and 23. So this
//      fragment has 56 lead cues, not the 58 §15 totals. Nothing was dropped.
//      One cue was *added*: `setenta-12` ships as `-12a`/`-12b` because a single
//      `both` cue there would have to say "your palm" of two different palms,
//      which the type's own doc forbids — hence 207 cues, not 206.

import type { SalsaClass, SalsaMove } from '../salsa-types'

export const CLASSES_08_14: SalsaClass[] = [
  // Class 8 — Adios con la hermana. The description lists one move; the class
  // teaches two, and the second (Enchufla Mix) is the most reused element in
  // this whole range — spec §8.1, same precedent as the steps spec's G4.
  {
    course: 'couples',
    number: 8,
    title: 'Adios con la hermana',
    videoId: 'X4Sr8QbXQLU',
    duration: 604.648,
    chaptered: true,
    teaches: ['adios-con-la-hermana', 'enchufla-mix'],
    segments: [
      {
        id: 'cc8-intro',
        start: 0,
        end: 18,
        role: 'skip',
        label: 'Intro',
        moves: [],
        provenance: 'chapter "Intro"',
        confidence: 'transcript',
      },
      {
        id: 'cc8-about',
        start: 18,
        end: 59,
        role: 'skip',
        label: 'About this class',
        moves: [],
        provenance: 'chapter "About this class"',
        confidence: 'transcript',
      },
      {
        id: 'cc8-teach-adios',
        start: 59,
        end: 269,
        role: 'teach',
        label: 'Adios & Adios con la hermana — presentation & explanation',
        moves: ['adios-con-la-hermana', 'enchufla-mix'],
        provenance: 'chapter "Adios & Adios con la hermana - presentation & explanation"',
        confidence: 'transcript',
      },
      {
        id: 'cc8-count-adios',
        start: 269,
        end: 291,
        role: 'count',
        label: 'Adios con la hermana — fluently with count',
        moves: ['adios-con-la-hermana'],
        provenance: 'chapter "Adios con la hermana - fluently with count"',
        confidence: 'transcript',
      },
      // The chapter title and the teachers disagree about which camera this is
      // (K8-a). The boundary is theirs; the label is not.
      {
        id: 'cc8-angle-adios',
        start: 291,
        end: 350,
        role: 'count',
        label: 'Adios con la hermana — second angle',
        moves: ['adios-con-la-hermana'],
        provenance: 'chapter "Adios con la hermana - side view"',
        confidence: 'suspect',
        warning: 'Chapter says "side view"; the teachers say "from the front angle" @290.88.',
      },
      {
        id: 'cc8-music-adios',
        start: 350,
        end: 431,
        role: 'music',
        label: 'Adios con la hermana — with music',
        moves: ['adios-con-la-hermana'],
        provenance: 'chapter "Adios con la hermana - with music"',
        confidence: 'transcript',
      },
      // Course-wide recap of eleven earlier moves in 75 seconds. `moves: []`
      // and not a TeachingSource for any of them — a call is not a teaching
      // source (steps spec G3).
      {
        id: 'cc8-review-music',
        start: 431,
        end: 506,
        role: 'review',
        label: 'Review with music',
        moves: [],
        provenance: 'chapter "Review with music"',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
      },
      {
        id: 'cc8-outro',
        start: 506,
        end: 605,
        role: 'skip',
        label: 'Summary / Outro',
        moves: [],
        provenance: 'chapter "Summary / Outro"',
        confidence: 'transcript',
        warning:
          '86 seconds of real content before the channel boilerplate starts @592.36 (GC-f); not swept for cues.',
      },
    ],
    flags: ['K8-a', 'K8-b', 'K8-c', 'K8-d', 'GC-b', 'GC-c', 'GC-d', 'GC-e', 'GC-f'],
  },

  // Class 9 — Sombrero. The only class in this range with no `review` chapter;
  // do not synthesise one from the outro (spec §9.2).
  {
    course: 'couples',
    number: 9,
    title: 'Sombrero',
    videoId: 'lV56IVufYOU',
    duration: 565.545,
    chaptered: true,
    teaches: ['sombrero'],
    segments: [
      {
        id: 'cc9-intro',
        start: 0,
        end: 18,
        role: 'skip',
        label: 'Intro',
        moves: [],
        provenance: 'chapter "Intro"',
        confidence: 'transcript',
      },
      {
        id: 'cc9-about',
        start: 18,
        end: 47,
        role: 'skip',
        label: 'About this class',
        moves: [],
        provenance: 'chapter "About this class"',
        confidence: 'transcript',
      },
      {
        id: 'cc9-teach-sombrero',
        start: 47,
        end: 250,
        role: 'teach',
        label: 'Sombrero — presentation & explanation',
        moves: ['sombrero'],
        provenance: 'chapter "Sombrero - presentation & explanation"',
        confidence: 'transcript',
      },
      // 17 seconds, and it opens mid-demo: the counted reps start at 234.94,
      // inside the teach chapter. The segment keeps the chapter's real bounds;
      // the clip does not (K9-a).
      {
        id: 'cc9-count-sombrero',
        start: 250,
        end: 267,
        role: 'count',
        label: 'Sombrero — fluently with count',
        moves: ['sombrero'],
        provenance: 'chapter "Sombrero - fluently with count"',
        confidence: 'transcript',
        warning: 'Chapter starts mid-demo; the counted reps begin at 234.94 in cc9-teach-sombrero.',
      },
      // Titled as a camera angle, but only 267–290 is a demo and 289.98–374 is
      // 84 seconds of fresh teaching that holds three of the class's best cues.
      // Shipped `teach`, not `count` (K9-e).
      {
        id: 'cc9-angle-sombrero',
        start: 267,
        end: 374,
        role: 'teach',
        label: 'Sombrero — side view (mostly further explanation)',
        moves: ['sombrero'],
        provenance: 'chapter "Sombrero - side view"',
        confidence: 'transcript',
      },
      {
        id: 'cc9-music-sombrero',
        start: 374,
        end: 445,
        role: 'music',
        label: 'Sombrero — with music',
        moves: ['sombrero'],
        provenance: 'chapter "Sombrero - with music"',
        confidence: 'transcript',
      },
      {
        id: 'cc9-outro',
        start: 445,
        end: 566,
        role: 'skip',
        label: 'Summary / Outro',
        moves: [],
        provenance: 'chapter "Summary / Outro"',
        confidence: 'transcript',
        warning:
          '105 seconds before the boilerplate @550.06 — the longest in the range, and @454.90 is a real technique correction (GC-f). Sweep this one first.',
      },
    ],
    flags: ['K9-a', 'K9-b', 'K9-c', 'K9-d', 'K9-e', 'GC-b', 'GC-c', 'GC-d', 'GC-e', 'GC-f'],
  },

  // Class 10 — two sequences taught in one class, so two `count` chapters and
  // two side-view chapters. Do not collapse them (spec §10.2).
  {
    course: 'couples',
    number: 10,
    title: 'Enchufla, Alarde, Exhibela',
    videoId: 'CkZO6nyJwjw',
    duration: 767.35,
    chaptered: true,
    teaches: ['enchufla-doble-alarde', 'enchufla-doble-alarde-exhibela', 'exhibela-crossing'],
    segments: [
      // Not empty: 0.00–17.92 is a counted full-tempo teaser of the whole
      // combination, named at @0.00.
      {
        id: 'cc10-intro',
        start: 0,
        end: 18,
        role: 'skip',
        label: 'Intro',
        moves: [],
        provenance: 'chapter "Intro"',
        confidence: 'transcript',
      },
      {
        id: 'cc10-about',
        start: 18,
        end: 40,
        role: 'skip',
        label: 'About this class',
        moves: [],
        provenance: 'chapter "About this class"',
        confidence: 'transcript',
      },
      {
        id: 'cc10-teach-doble-alarde',
        start: 40,
        end: 170,
        role: 'teach',
        label: 'Enchufla doble, alarde — presentation & explanation',
        moves: ['enchufla-doble-alarde'],
        provenance: 'chapter "Enchufla doble, alarde - presentation & explanation"',
        confidence: 'transcript',
      },
      {
        id: 'cc10-count-doble-alarde',
        start: 170,
        end: 231,
        role: 'count',
        label: 'Enchufla doble, alarde — fluently with count',
        moves: ['enchufla-doble-alarde'],
        provenance: 'chapter "Enchufla doble, alarde - fluently with count"',
        confidence: 'transcript',
      },
      // "We'll do the same opposite direction" @231.46 — ambiguous between
      // "camera moved" and "move mirrored", which is the only reason the
      // shorter published slow clip wins over the 30.34s alternate (K10-f).
      {
        id: 'cc10-angle-doble-alarde',
        start: 231,
        end: 285,
        role: 'count',
        label: 'Enchufla doble, alarde — side view',
        moves: ['enchufla-doble-alarde'],
        provenance: 'chapter "Enchufla doble, alarde - side view"',
        confidence: 'transcript',
        warning:
          'The teachers announce "the same opposite direction" @231.46, not "side view". Whether the camera moved or the move mirrored is unresolved (K10-f).',
      },
      // Word-exact boundary — the best in the range.
      {
        id: 'cc10-teach-exhibela',
        start: 285,
        end: 415,
        role: 'teach',
        label: 'Enchufla doble, alarde, exhibela — presentation & explanation',
        moves: ['enchufla-doble-alarde-exhibela', 'exhibela-crossing'],
        provenance: 'chapter "Enchufla doble, alarde, exhibela - presentation & explanation"',
        confidence: 'transcript',
      },
      {
        id: 'cc10-count-exhibela',
        start: 415,
        end: 459,
        role: 'count',
        label: 'Enchufla doble, alarde, exhibela — fluently with count',
        moves: ['enchufla-doble-alarde-exhibela'],
        provenance: 'chapter "Enchufla doble, alarde, exhibela - fluently with count"',
        confidence: 'transcript',
      },
      {
        id: 'cc10-angle-exhibela',
        start: 459,
        end: 494,
        role: 'count',
        label: 'Enchufla doble, alarde, exhibela — side view',
        moves: ['enchufla-doble-alarde-exhibela'],
        provenance: 'chapter "Enchufla doble, alarde, exhibela - side view"',
        confidence: 'transcript',
        warning: 'Chapter opens 4.2s before the demo, inside the previous chapter\'s sentence.',
      },
      {
        id: 'cc10-music-exhibela',
        start: 494,
        end: 604,
        role: 'music',
        label: 'Enchufla doble, alarde, exhibela — with music',
        moves: ['enchufla-doble-alarde-exhibela', 'exhibela-crossing'],
        provenance: 'chapter "Enchufla doble, alarde, exhibela - with music"',
        confidence: 'transcript',
      },
      // `couples_analysis.md` classifies this chapter `music`; the chapter title
      // and the audio both say Review, so it ships as `review` (K10-e).
      {
        id: 'cc10-review-music',
        start: 604,
        end: 721,
        role: 'review',
        label: 'Review — with music',
        moves: [],
        provenance: 'chapter "Review - with music"',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
        warning:
          'Thirteen moves called in 117s and the transcript is at its worst here. "I\'ve already swapped ten" @640.66 is deliberately NOT resolved to setenta — Setenta is Class 11 and cannot be reviewed before it is taught (K10-e).',
      },
      {
        id: 'cc10-outro',
        start: 721,
        end: 767,
        role: 'skip',
        label: 'Summary / Outro',
        moves: [],
        provenance: 'chapter "Summary / Outro"',
        confidence: 'transcript',
        warning: '17 seconds before the boilerplate @738.32 — the shortest gap in the range (GC-f).',
      },
    ],
    flags: ['K10-a', 'K10-b', 'K10-c', 'K10-d', 'K10-e', 'K10-f', 'GC-b', 'GC-c', 'GC-d', 'GC-e', 'GC-f'],
  },

  // Class 11 — Setenta, the charter's reference move. Nine segments, because the
  // outro is split: 503–566.80 states R3 in the teachers' own words and the role
  // vocabulary would have thrown it away (K11-f, §11.6).
  {
    course: 'couples',
    number: 11,
    title: 'Setenta',
    videoId: 'QueWxI6vMrc',
    duration: 591.412,
    chaptered: true,
    teaches: ['setenta'],
    segments: [
      {
        id: 'cc11-intro',
        start: 0,
        end: 18,
        role: 'skip',
        label: 'Intro',
        moves: [],
        provenance: 'chapter "Intro"',
        confidence: 'transcript',
      },
      {
        id: 'cc11-about',
        start: 18,
        end: 58,
        role: 'skip',
        label: 'About this class',
        moves: [],
        provenance: 'chapter "About this class"',
        confidence: 'transcript',
      },
      {
        id: 'cc11-teach-setenta',
        start: 58,
        end: 203,
        role: 'teach',
        label: 'Setenta — presentation & explanation',
        moves: ['setenta'],
        provenance: 'chapter "Setenta - presentation & explanation"',
        confidence: 'transcript',
      },
      // 73s chapter, 17.2s of counted demo (K11-a). The boundary is right, the
      // content is thin — which is why the slow clip starts back at 177.66.
      {
        id: 'cc11-count-setenta',
        start: 203,
        end: 276,
        role: 'count',
        label: 'Setenta — fluently with count',
        moves: ['setenta'],
        provenance: 'chapter "Setenta - fluently with count"',
        confidence: 'transcript',
        warning:
          'Only 203.92–221.12 is counted demo; the rest is a train-noise apology and a separate lesson on walking forward (K11-a).',
      },
      {
        id: 'cc11-angle-setenta',
        start: 276,
        end: 317,
        role: 'count',
        label: 'Setenta — side view',
        moves: ['setenta'],
        provenance: 'chapter "Setenta - side view"',
        confidence: 'transcript',
      },
      {
        id: 'cc11-music-setenta',
        start: 317,
        end: 400,
        role: 'music',
        label: 'Setenta — with music',
        moves: ['setenta'],
        provenance: 'chapter "Setenta - with music"',
        confidence: 'transcript',
        warning:
          '45% counted, and the teacher corrects his own count twice (@333.32, @338.66). No cue is taken from it (K11-d).',
      },
      // Not one of setenta's segmentIds: it reviews Kentucky, Exhibela, Adios
      // and Dile que no with Setenta on the end, so it belongs to the class.
      {
        id: 'cc11-review-music',
        start: 400,
        end: 503,
        role: 'music',
        label: 'Review — with music',
        moves: ['setenta'],
        provenance: 'chapter "Review - with music"',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
      },
      {
        id: 'cc11-outro-leading',
        start: 503,
        end: 566.8,
        role: 'teach',
        label: 'Why leading is the skill',
        moves: ['setenta'],
        provenance:
          'transcript: "Developing these connections while dancing, developing the associations, is one of the essential skills that we are working on" @503.70',
        confidence: 'transcript',
      },
      {
        id: 'cc11-outro',
        start: 566.8,
        end: 591,
        role: 'skip',
        label: 'Summary / Outro (channel boilerplate)',
        moves: [],
        provenance:
          'transcript: "So if you would like to see that, like, subscribe and press the bell" @566.80',
        confidence: 'transcript',
      },
    ],
    flags: ['K11-a', 'K11-b', 'K11-c', 'K11-d', 'K11-e', 'K11-f', 'GC-b', 'GC-c', 'GC-e', 'GC-f'],
  },

  // Class 12 — Paseala. Two chapters are shipped as two segments each: both hold
  // a demo followed by a long block of unrelated teaching, and a single `role`
  // would be a lie. Both splits are word-anchored (K12-b, K12-c).
  {
    course: 'couples',
    number: 12,
    title: 'Paseala',
    videoId: 'EuT94T544Mg',
    duration: 712.342,
    chaptered: true,
    teaches: ['paseala'],
    segments: [
      {
        id: 'cc12-intro',
        start: 0,
        end: 18,
        role: 'skip',
        label: 'Intro',
        moves: [],
        provenance: 'chapter "Intro"',
        confidence: 'transcript',
      },
      {
        id: 'cc12-about',
        start: 18,
        end: 51,
        role: 'skip',
        label: 'About this class',
        moves: [],
        provenance: 'chapter "About this class"',
        confidence: 'transcript',
      },
      {
        id: 'cc12-teach-paseala',
        start: 51,
        end: 292,
        role: 'teach',
        label: 'Paseala — presentation & explanation',
        moves: ['paseala'],
        provenance: 'chapter "Paseala - presentation & explanation"',
        confidence: 'transcript',
      },
      {
        id: 'cc12-count-paseala',
        start: 292,
        end: 310.02,
        role: 'count',
        label: 'Paseala — fluently with count',
        moves: ['paseala'],
        provenance: 'chapter "Paseala - fluently with count"',
        confidence: 'transcript',
        warning:
          'The chapter runs to 396.0 but the counted demo ends at 310.02; the remaining 86s teaches three entries and is shipped as cc12-teach-entries (K12-b).',
      },
      {
        id: 'cc12-teach-entries',
        start: 310.02,
        end: 396,
        role: 'teach',
        label: 'How to get into Paseala',
        moves: ['paseala'],
        provenance:
          'transcript: "I told you also that we\'ll show you how to get into it instead of starting every time from close position" @310.02',
        confidence: 'transcript',
      },
      {
        id: 'cc12-angle-paseala',
        start: 396,
        end: 428.62,
        role: 'count',
        label: 'Paseala — side view',
        moves: ['paseala'],
        provenance: 'chapter "Paseala - side view"',
        confidence: 'transcript',
      },
      // 76 seconds of the follower's half of the lead, by the second teacher,
      // buried in a chapter called "side view". Four cues live here, two of
      // them `lead` (K12-c).
      {
        id: 'cc12-teach-resistance',
        start: 428.62,
        end: 505,
        role: 'teach',
        label: 'Resistance, from the follower\'s side',
        moves: ['paseala'],
        provenance:
          'transcript: "Right ladies just when Michal was talking about this resistance and guy pulling you" @428.62',
        confidence: 'transcript',
      },
      {
        id: 'cc12-music-paseala',
        start: 505,
        end: 538,
        role: 'music',
        label: 'Paseala — with music',
        moves: ['paseala'],
        provenance: 'chapter "Paseala - with music"',
        confidence: 'transcript',
        warning: '58% counted — the teacher counts, calls entries and comments over it (GC-c, K12-a).',
      },
      {
        id: 'cc12-music-paseala-side',
        start: 538,
        end: 575,
        role: 'music',
        label: 'Paseala — with music (side view)',
        moves: ['paseala'],
        provenance: 'chapter "Paseala - with music (side view)"',
        confidence: 'transcript',
        warning: '43% counted (GC-c).',
      },
      {
        id: 'cc12-review-music',
        start: 575,
        end: 650,
        role: 'review',
        label: 'Review — with music',
        moves: [],
        provenance: 'chapter "Review - with music"',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
      },
      {
        id: 'cc12-outro',
        start: 650,
        end: 712,
        role: 'skip',
        label: 'Summary / Outro',
        moves: [],
        provenance: 'chapter "Summary / Outro"',
        confidence: 'transcript',
        warning: '49 seconds before the boilerplate @699.34 (GC-f); not swept for cues.',
      },
    ],
    flags: ['K12-a', 'K12-b', 'K12-c', 'K12-d', 'K12-e', 'K12-f', 'K12-g', 'GC-b', 'GC-c', 'GC-e', 'GC-f'],
  },

  // Class 13 — CocaCola. Third class in a row where the side-view chapter hides
  // real teaching (K9-e, K12-c, K13-b), and the only class in the range whose
  // review chapter is a teaching source, because it is the only one that teaches
  // rather than calls (K13-e).
  {
    course: 'couples',
    number: 13,
    title: 'CocaCola',
    videoId: 'GT7PTpvni_A',
    duration: 739.997,
    chaptered: true,
    teaches: ['cocacola'],
    segments: [
      {
        id: 'cc13-intro',
        start: 0,
        end: 18,
        role: 'skip',
        label: 'Intro',
        moves: [],
        provenance: 'chapter "Intro"',
        confidence: 'transcript',
      },
      {
        id: 'cc13-about',
        start: 18,
        end: 49,
        role: 'skip',
        label: 'About this class',
        moves: [],
        provenance: 'chapter "About this class"',
        confidence: 'transcript',
      },
      {
        id: 'cc13-teach-cocacola',
        start: 49,
        end: 359,
        role: 'teach',
        label: 'CocaCola — presentation & explanation',
        moves: ['cocacola'],
        provenance: 'chapter "CocaCola - presentation & explanation"',
        confidence: 'transcript',
      },
      {
        id: 'cc13-count-cocacola',
        start: 359,
        end: 398,
        role: 'count',
        label: 'CocaCola — fluently with count',
        moves: ['cocacola'],
        provenance: 'chapter "CocaCola - fluently with count"',
        confidence: 'transcript',
        warning:
          'Boundary lands mid-sentence ("guidance for the rest of the arm", 358.40–359.58); the count-in is @360.70. Two counted reps with seven seconds of speech between them (K13-a).',
      },
      {
        id: 'cc13-angle-cocacola',
        start: 398,
        end: 426.04,
        role: 'count',
        label: 'CocaCola — side view',
        moves: ['cocacola'],
        provenance: 'chapter "CocaCola - side view"',
        confidence: 'transcript',
        warning:
          'The teachers say "opposite direction" @398.16, not "side" — the same camera-moved-or-move-mirrored ambiguity as K10-f.',
      },
      {
        id: 'cc13-teach-balance',
        start: 426.04,
        end: 510,
        role: 'teach',
        label: 'Balance and the semicircle, from the follower\'s side',
        moves: ['cocacola'],
        provenance:
          'transcript: "anything else yeah just for the balance for the girl while we\'re turning" @429.64',
        confidence: 'transcript',
      },
      {
        id: 'cc13-music-cocacola',
        start: 510,
        end: 557,
        role: 'music',
        label: 'CocaCola — with music',
        moves: ['cocacola'],
        provenance: 'chapter "CocaCola - with music"',
        confidence: 'transcript',
        warning: '62% counted — the highest density in the range (GC-c, K13-c).',
      },
      {
        id: 'cc13-music-cocacola-side',
        start: 557,
        end: 585,
        role: 'music',
        label: 'CocaCola — with music (side view)',
        moves: ['cocacola'],
        provenance: 'chapter "CocaCola - with music (side view)"',
        confidence: 'transcript',
        warning: '25% counted — the cleanest full-tempo window in the class, which is why the fast alternate is cut from the side camera rather than the front one (K13-c).',
      },
      // The only review chapter in this range that is a TeachingSource: it
      // demonstrates five named combinations and states principles rather than
      // calling moves, so steps-spec G3 does not apply (K13-e).
      {
        id: 'cc13-review-music',
        start: 585,
        end: 682,
        role: 'review',
        label: 'Review — with music',
        moves: ['cocacola'],
        provenance: 'chapter "Review - with music"',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
        warning:
          'Boundary is 2.6s late and mid-sentence: the announcement runs 582.43–589.23 across it (K13-d).',
      },
      {
        id: 'cc13-outro',
        start: 682,
        end: 740,
        role: 'skip',
        label: 'Summary / Outro',
        moves: [],
        provenance: 'chapter "Summary / Outro"',
        confidence: 'transcript',
        warning: '27 seconds before the boilerplate @708.63 (GC-f); not swept for cues.',
      },
    ],
    flags: ['K13-a', 'K13-b', 'K13-c', 'K13-d', 'K13-e', 'K13-f', 'K13-g', 'GC-b', 'GC-c', 'GC-e', 'GC-f'],
  },

  // Class 14 — Vacilala and Vacilala los dos. Four segments belong to both
  // moves: chapters 6–8 are titled "Vacilala **y** Vacilala los dos", so the
  // source itself refuses to separate them. Two splits (K14-b, K14-d).
  {
    course: 'couples',
    number: 14,
    title: 'Vacilala, Vacilala Los Dos',
    videoId: 'jBaHuGXoWBY',
    duration: 715.175,
    chaptered: true,
    teaches: ['vacilala', 'vacilala-los-dos'],
    segments: [
      {
        id: 'cc14-intro',
        start: 0,
        end: 18,
        role: 'skip',
        label: 'Intro',
        moves: [],
        provenance: 'chapter "Intro"',
        confidence: 'transcript',
      },
      {
        id: 'cc14-about',
        start: 18,
        end: 39,
        role: 'skip',
        label: 'About this class',
        moves: [],
        provenance: 'chapter "About this class"',
        confidence: 'transcript',
      },
      // The boundary falls between "This"@38.58 and "time"@39.10, so the first
      // word of the class's first instruction is in the skip chapter. The
      // segment keeps 39.0; teachStart is 38.58 (K14-h).
      {
        id: 'cc14-teach-vacilala',
        start: 39,
        end: 300,
        role: 'teach',
        label: 'Vacilala — presentation & explanation',
        moves: ['vacilala'],
        provenance: 'chapter "Vacilala - presentation & explanation"; word-anchored start 38.58',
        confidence: 'transcript',
      },
      {
        id: 'cc14-count-vacilala',
        start: 300,
        end: 363,
        role: 'count',
        label: 'Vacilala — fluently with count',
        moves: ['vacilala'],
        provenance: 'chapter "Vacilala - fluently with count"',
        confidence: 'transcript',
        warning:
          'The boundary splits the count-in itself ("Five"@299.20 is in the teach chapter), and 29.5s of this 63s chapter is the circular-arm explanation, not demo (K14-a).',
      },
      {
        id: 'cc14-teach-los-dos',
        start: 363,
        end: 435,
        role: 'teach',
        label: 'Vacilala los dos — presentation & explanation',
        moves: ['vacilala-los-dos'],
        provenance: 'chapter "Vacilala los dos - presentation & explanation"',
        confidence: 'transcript',
      },
      {
        id: 'cc14-music-both',
        start: 435,
        end: 478.98,
        role: 'music',
        label: 'Vacilala y Vacilala los dos — with music',
        moves: ['vacilala', 'vacilala-los-dos'],
        provenance: 'chapter "Vacilala y Vacilala los dos - with music"',
        confidence: 'transcript',
        warning:
          'Chapter end moved from 514.00 to 478.98: the last 35s is teaching, not music (K14-b).',
      },
      {
        id: 'cc14-teach-release',
        start: 478.98,
        end: 514,
        role: 'teach',
        label: 'Letting your partner go and getting back in sync',
        moves: ['vacilala', 'vacilala-los-dos'],
        provenance:
          'transcript: "So the synchronizing for Dilek and on, it\'s another very, very useful element" @478.98',
        confidence: 'transcript',
      },
      // Second camera, and its role is `music`, not an angle chapter.
      {
        id: 'cc14-music-both-side',
        start: 514,
        end: 544,
        role: 'music',
        label: 'Vacilala y Vacilala los dos — with music (side view)',
        moves: ['vacilala', 'vacilala-los-dos'],
        provenance:
          'chapter "Vacilala y Vacilala los dos - with music (side view)"; word-anchored start 512.86',
        confidence: 'transcript',
      },
      {
        id: 'cc14-review-music',
        start: 544,
        end: 629,
        role: 'review',
        label: 'Review — with music',
        moves: ['vacilala', 'vacilala-los-dos'],
        provenance: 'chapter "Review - with music"',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
        warning:
          'Carries two real facts as well as calls: the CocaCola entry @546.80 and the por la mano / Vacilala / Sombrero equivalence @580.12 (K14-i).',
      },
      // The only place in the class that says what the move is *for*, and the
      // role vocabulary would have discarded it (K14-d, GC-f).
      {
        id: 'cc14-outro-why',
        start: 629,
        end: 690.96,
        role: 'teach',
        label: 'Why Vacilala matters',
        moves: ['vacilala'],
        provenance:
          'transcript: "At this point it might seem like, oh this Basila is a kind of useless movement" @629.86',
        confidence: 'transcript',
      },
      {
        id: 'cc14-outro',
        start: 690.96,
        end: 715,
        role: 'skip',
        label: 'Summary / Outro (channel boilerplate)',
        moves: [],
        provenance:
          'transcript: "and if you would like to see more classes on this course like subscribe and press the bell" @690.96',
        confidence: 'transcript',
      },
    ],
    // Verbatim calls, manglings included — CallSheetEntry.call is documented as
    // verbatim. Two calls are too mangled to resolve and ship without a `move`
    // rather than guessed (K14-i).
    callSheet: [
      { at: 546.8, call: 'Vasila la, lo dos', move: 'vacilala-los-dos' },
      { at: 555.46, call: 'Vasila', move: 'vacilala' },
      { at: 560.12, call: 'Vasila la por la mano', move: 'vacilala-por-la-mano' },
      { at: 563.22, call: 'Exhibela', move: 'exhibela-crossing' },
      { at: 568.48, call: 'El uno', move: 'el-uno' },
      { at: 580.12, call: 'Basilala por la mano', move: 'vacilala-por-la-mano' },
      { at: 582.66, call: 'Basilala', move: 'vacilala' },
      { at: 584.16, call: 'Sombrero', move: 'sombrero' },
      { at: 596.56, call: 'pladoplea', note: 'Too mangled to resolve to a move id; not guessed (K14-i).' },
      { at: 597.54, call: 'lardegzibela', note: 'Too mangled to resolve to a move id; not guessed (K14-i).' },
      { at: 607.2, call: 'egzibela', move: 'exhibela-crossing' },
      { at: 608.92, call: 'otra', note: 'Not a move — glossed on camera: "otra always repeats the last comment".' },
    ],
    flags: [
      'K14-a',
      'K14-b',
      'K14-c',
      'K14-d',
      'K14-e',
      'K14-f',
      'K14-g',
      'K14-h',
      'K14-i',
      'K14-j',
      'GC-a',
      'GC-b',
      'GC-e',
      'GC-f',
    ],
  },
]

export const MOVES_08_14: SalsaMove[] = [
  // Class 8 — Adios con la hermana. The alias list is stated on camera, which is
  // the clearest R1 justification anywhere in the course: "Adios quite often is
  // named differently in different places around the world. So you can find the
  // name Prima and it's exactly the same move" @62.12.
  {
    id: 'adios-con-la-hermana',
    name: 'Adios con la hermana',
    aliases: [
      'Adios con la hermana',
      'adios con hermana',
      'Adios prima con la hermana',
      'Adios',
      'adios',
      'Prima',
      'prima',
    ],
    kind: 'step',
    summary:
      'From Guapea, walk around each other into each other\'s right side, rotate 180 to the right, come out from under the hand on 7, and finish through Enchufla Mix.',
    footwork:
      'From Guapea, on 1 come closer: three steps starting back, towards each other, then two steps forward, landing next to each other on each other\'s right side. Continue forward — she goes front with the left, you go front with the right — rotating 180 degrees to the right as you go. On the last step, 7, come out from under the hand and rotate towards her. Finish with Enchufla Mix into Dile que no, and land in the same position you started from.',
    base: 'guapea',
    composedOf: ['guapea', 'enchufla-mix', 'dile-que-no'],
    cues: [
      {
        id: 'adios-con-la-hermana-1',
        text: 'Adios is called Prima in some places — same move, different name. This channel says Adios.',
        role: 'both',
        kind: 'context',
        sourceStart: 62.12,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim:
          'Adios quite often is named differently in different places around the world. So you can find the name Prima and it\'s exactly the same move, but we are used to Adios.',
        confidence: 'transcript',
      },
      {
        id: 'adios-con-la-hermana-2',
        beat: 1,
        text: 'Come closer: three steps starting back, towards each other.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 129.28,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim:
          'Adios con la hermana, come closer. Step back, front, towards each other. Three steps starting back and then two steps forward.',
        confidence: 'transcript',
      },
      {
        id: 'adios-con-la-hermana-3',
        beats: [5, 6],
        text: 'Then two steps forward — you land next to each other.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 131.28,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim: 'Three steps starting back and then two steps forward. We are landing next to each other.',
        confidence: 'transcript',
      },
      {
        id: 'adios-con-la-hermana-4',
        text: 'You end up on each other\'s right side.',
        role: 'both',
        kind: 'concept',
        sourceStart: 134.04,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim: 'We are on each other\'s right side.',
        confidence: 'transcript',
      },
      {
        id: 'adios-con-la-hermana-5',
        beat: 5,
        text: 'Go front with your right.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 140.16,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim: 'She goes front with the left, I go front with the right.',
        confidence: 'transcript',
      },
      {
        id: 'adios-con-la-hermana-6',
        beat: 5,
        text: 'She goes front with her left.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 138.36,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim: 'She goes front with the left, I go front with the right.',
        confidence: 'transcript',
      },
      {
        id: 'adios-con-la-hermana-7',
        beats: [5, 6, 7],
        text: 'Rotate 180 degrees to the right and keep going forward.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 141.54,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim: 'We rotate 180 degrees to the right, continue forward. Five, six and on the last step seven…',
        confidence: 'transcript',
      },
      {
        id: 'adios-con-la-hermana-8',
        beat: 7,
        text: 'On the last step, seven, come out from under the hand and rotate towards her.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 147.26,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim: 'Five, six and on the last step seven I get out underhand and I rotate towards Ola.',
        confidence: 'transcript',
      },
      {
        id: 'adios-con-la-hermana-9',
        text:
          'Finish in the same position you started. Landing opposite means you lacked dynamics walking around each other.',
        role: 'both',
        kind: 'concept',
        sourceStart: 323.76,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim:
          'The last thing to pay attention is to finish at the same position as we started. Yeah, you don\'t want to finish opposite. Finishing opposite would happen because of the lack of dynamics when you walk around each other.',
        confidence: 'transcript',
      },
    ],
    // Plain Adios — the rueda partner change — is demonstrated and then
    // explicitly not taught. Inventing an `adios` move id for it would ship a
    // permanent R2 violation, because no counted window can ever exist (K8-b).
    notes: [
      {
        text:
          'Plain Adios is the rueda partner change — release your partner, walk, and Dile que no with the next one. Demonstrated @82.86 but deliberately not broken down: it needs a rueda.',
        sourceVideo: 'X4Sr8QbXQLU',
        sourceStart: 76.38,
      },
      {
        text:
          'Full-tempo alternate window, not cut: X4Sr8QbXQLU 358.04 → 398.80 (40.8s), from the class\'s own music chapter. Held back because the published fast clip is the official short; publish this instead if the short opens on a title card. 41% count density — the teachers call numbers over the music ("With all numbers" @375.42), so it is not a silent demo (GC-c).',
        sourceVideo: 'X4Sr8QbXQLU',
        sourceStart: 358.04,
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 8,
        videoId: 'X4Sr8QbXQLU',
        teachStart: 59,
        segmentIds: ['cc8-teach-adios', 'cc8-count-adios', 'cc8-angle-adios', 'cc8-music-adios'],
        clips: {
          slow: {
            src: '/clips/salsa/couples/adios-con-la-hermana-slow.mp4',
            sourceVideo: 'X4Sr8QbXQLU',
            start: 273.26,
            end: 313.08,
            aspect: '16/9',
            caveat:
              'Crosses the 291.0 chapter boundary on purpose (GC-d) — the camera changes mid-clip and the second rep is called with words rather than numbers. The chapter is titled "side view" but the teachers announce "the front angle" (K8-a).',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/adios-con-la-hermana-fast.mp4',
            sourceVideo: 'JkwUzKb_X-8',
            start: 0,
            end: 37.594,
            aspect: '9/16',
            caveat:
              'Whole official short, un-transcribed — no interior boundary could be anchored. Check for an intro title card before publishing.',
            confidence: 'transcript',
          },
        },
      },
    ],
    complete: true,
    flags: ['K8-a', 'K8-b'],
  },

  // Class 8 — Enchufla Mix. Named by the teachers ("the part that we like to call
  // Enchufla Mix" @155.04) and absent from the class description's move list; it
  // is indexed anyway, on the steps spec's G4 precedent. `enchufla-mix-3` is the
  // single most valuable cue in the class: said once, with the partner
  // deliberately frozen so the hand is visible, and never repeated.
  {
    id: 'enchufla-mix',
    name: 'Enchufla Mix',
    aliases: ['Enchufla Mix', 'enchufla mix', 'mix', 'Enchufla Tiki Mix', 'and mix mix mix'],
    kind: 'skill',
    group: 'skills',
    summary:
      'The three-step swap where the leader circles the joined hand round both hips while she turns under it — the course\'s first real leading-and-following exercise.',
    footwork:
      'You swap places in three steps as usual (5-6-7 / 1-2-3). Leader: three steps in a spot on 1-2-3, then rotate. Follower: three steps starting with the left — open with the left, a small cross, then join the legs together — rotating your body to the front. Finish with Dile que no.',
    composedOf: ['enchufla'],
    cues: [
      {
        id: 'enchufla-mix-1',
        text: 'The ending of Adios con la hermana is the part the teachers call Enchufla Mix.',
        role: 'both',
        kind: 'context',
        sourceStart: 153.52,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim: 'From here we finish with the part that we like to call Enchufla Mix.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-mix-2',
        beat: 5,
        text: 'Swap places in three steps, as usual.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 166.5,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim: 'How does Enchufla Mix work? We swap places in three steps as usual. 5-6-7-1-2-3.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-mix-3',
        text:
          'Circle the joined hand: towards her right hip, then towards your own right hip, then back to hers — a full circle.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 179.26,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim:
          'Hand goes towards her right hip then towards mine right hip and comes back to hers to make that full circle.',
        confidence: 'transcript',
        warning:
          '"towards mine right hip" is garbled; the hip is the leader\'s own. Which hand is never named — it is the joined hand (his left to her right). Verify at 174–184.',
        flag: 'K8-c',
      },
      {
        id: 'enchufla-mix-4',
        text:
          'Relax that arm and the circle does not turn you. Tense it and your body starts rotating — that tension is the turn.',
        role: 'follower',
        kind: 'lead',
        sourceStart: 187.74,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim:
          'But obviously now she relax her arm. If she didn\'t relax it and if she tense her arm obviously she would start rotating her body.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-mix-5',
        beats: [1, 2, 3],
        text: 'Three steps in a spot, then rotate.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 197,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim: 'At the same time I will make three steps in a spot. One, two, three, rotate.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-mix-6',
        beat: 1,
        text: 'Three steps starting with the left, rotating your body to the front.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 203.04,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim: 'So Ola is doing three steps starting with the left and rotating her body to the front.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-mix-7',
        beats: [1, 2, 3],
        text: 'Open with the left, then a small cross, then join the legs together.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 219.16,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim: 'It\'s like open with the left, then small cross, and then joining legs together.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-mix-8',
        text: 'Finish with Dile que no.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 224,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim: 'We finish with Dilek Enot. One, two, three, and five, six, seven.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-mix-9',
        text:
          'This is where leading and following actually start — it\'s the first element where every partner feels different.',
        role: 'both',
        kind: 'concept',
        sourceStart: 230.62,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim:
          'This enchufla mix part is one of the first elements when we teach beginner\'s course, when we notice that guys start leading and girls start following. Because you will notice that every person you\'re dancing with is mixing slightly different.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-mix-10',
        text:
          'Her steps are only approximately open-cross-together. Lead it more dynamically and she rotates straight away, without time to cross.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 248.76,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim:
          'So you think like, oh, that\'s why we said the steps are around open cross together. If somebody leads a bit more dynamically, I can lead you a bit more dynamically. So she didn\'t have time to cross, I rotated her straight away.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-mix-11',
        text: 'Dance the arm — respond to what the lead actually does, not to a fixed step count.',
        role: 'follower',
        kind: 'lead',
        sourceStart: 262.52,
        sourceVideo: 'X4Sr8QbXQLU',
        verbatim: 'And then obviously she\'s dancing her arm and she\'s responding to this lead.',
        confidence: 'transcript',
      },
    ],
    notes: [
      {
        text:
          'Full-tempo alternate window, not cut: X4Sr8QbXQLU 406.18 → 417.86 (11.7s). Far too short to publish; recorded because it is the only place the Mix is named at tempo — "Closer around get out to the left and to fly hop mix mix mix" @408.06.',
        sourceVideo: 'X4Sr8QbXQLU',
        sourceStart: 406.18,
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 8,
        videoId: 'X4Sr8QbXQLU',
        teachStart: 153.52,
        segmentIds: ['cc8-teach-adios'],
        note:
          'Taught inside the Adios teach block from 153.52 ("We finish with the part that we like to call Enchufla Mix"); it has no chapter of its own.',
        clips: {
          slow: {
            src: '/clips/salsa/couples/enchufla-mix-slow.mp4',
            sourceVideo: 'X4Sr8QbXQLU',
            start: 208.68,
            end: 230.62,
            aspect: '16/9',
            caveat:
              '21.9s, just under the 23s reference floor. The first ~8s is the fluent demo; from 216.76 the teacher describes her steps over it ("open with the left, then small cross, and then joining legs together") and ends on "We finish with Dile que no". It is the only isolated demo of the Mix in the course.',
            confidence: 'transcript',
          },
          // There is no isolated full-tempo Mix anywhere in the course, so the
          // parent move's short is shared and says so. Inventing a window is not
          // an option; precedent is steps `left-turn-side`.
          fast: {
            src: '/clips/salsa/couples/adios-con-la-hermana-fast.mp4',
            sourceVideo: 'JkwUzKb_X-8',
            start: 0,
            end: 37.594,
            aspect: '9/16',
            label: 'Class 8 short — Enchufla Mix is the ending of Adios con la hermana.',
            caveat:
              'Whole official short, un-transcribed — no interior boundary could be anchored. Check for an intro title card before publishing.',
            confidence: 'transcript',
            shared: true,
          },
        },
      },
    ],
    complete: true,
    // The spec's §8.1 table says `['K8-b']`; K8-c (the garbled hip cue) is the
    // defect that actually belongs to this move. Shipped as the spec states —
    // see the report note rather than silently corrected.
    flags: ['K8-b'],
  },

  // Class 9 — Sombrero. The densest class in the range: 26 cues, 8 of them
  // `lead`, because Sombrero *is* a hand move — the footwork is explicitly
  // borrowed from Vacilala por la mano and everything new is in the arms.
  //
  // The two-entry alias list is a finding, not laziness: Whisper renders
  // "sombrero" correctly at all 14 occurrences here, while `vacilala-por-la-mano`
  // appears in this same class in three spellings and never correctly. That
  // contrast is the whole argument for R1 (GC-a, K9-d).
  {
    id: 'sombrero',
    name: 'Sombrero',
    aliases: ['Sombrero', 'sombrero'],
    kind: 'step',
    // The one grouping in this range that is stated on camera: "They are all
    // sombrero based moves" @353.08.
    group: 'sombrero',
    summary:
      'Vacilala por la mano\'s footwork with a two-handed hat: pull her across, swap her to your right hand palm-to-palm, feed the second hand underneath, and turn her under both.',
    footwork:
      'Identical to Vacilala por la mano for both roles — that is the point of the class. Start from Guapea. She goes forward, front, front, then opposite, inside, outside, outside, travelling from your left side to your right; you keep six steps going in a spot. Finish with Dile que no.',
    base: 'guapea',
    composedOf: ['guapea', 'dile-que-no'],
    cues: [
      {
        id: 'sombrero-1',
        text: 'If you have Vacilala por la mano, Sombrero is easy — same footwork, different hands.',
        role: 'both',
        kind: 'context',
        sourceStart: 46.88,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'If you\'ve done already Basila la por la mano, learning sombrero will be very very simple.',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-2',
        beat: 1,
        text:
          'Her steps are exactly Vacilala por la mano: forward, front, front, then opposite, inside, outside, outside.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 59.24,
        sourceVideo: 'lV56IVufYOU',
        verbatim:
          'Steps from girl perspective are exactly the same as Vasile Lepore Lamanu. So she goes forward, front, front, opposite, inside, outside, outside',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-3',
        text: 'Your six steps don\'t change. Keep the feet moving in a spot — don\'t stomp.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 83.48,
        sourceVideo: 'lV56IVufYOU',
        verbatim:
          'You would say it kind of boring, but it is very important that you keep moving your feet and not to keep stomping even if it\'s in a spot.',
        confidence: 'transcript',
      },
      // Stays `both`: "side" is not a limb, and the leader is the reference frame
      // the whole class uses. If a reviewer disagrees the split is -4a leader /
      // -4b follower (§9.4).
      {
        id: 'sombrero-4',
        text: 'She travels from your left side to your right, as in Vacilala por la mano.',
        role: 'both',
        kind: 'concept',
        sourceStart: 87.9,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'She\'s traveling from my left to my right like in Basila La Porla Mano.',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-5',
        text: 'Start from Guapea, finish with Dile que no.',
        role: 'both',
        kind: 'concept',
        sourceStart: 91.82,
        sourceVideo: 'lV56IVufYOU',
        verbatim:
          'We are starting from Guapea, we are finishing with Dile Queno, the same as Basila La Porla Mano.',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-6',
        text: 'Pull her with your left hand, then instantly swap her to your right.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 102.02,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'I\'m pulling her with my left and instantly swapping to the right.',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-7',
        text: 'As the right hand takes over, turn the thumb to the bottom so you meet palm to palm.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 106.44,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'When I pass the right hand, it goes with the thumb to the bottom. So we\'re like palm to palm.',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-8',
        text: 'Offer the second hand underneath, then take both hands up.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 114.68,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'I offer second hand on the bottom and now with two hands up she\'s making loop',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-9',
        text: 'With both hands up, keep looping to the right.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 116.9,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'now with two hands up she\'s making loop loop loop loop',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-10',
        text: 'Land your right hand on top of her right shoulder and your left on top of your own left.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 123.04,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'we\'re finishing with the right hand on top of her right shoulder and left on top of my left',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-11',
        text:
          'This is not the El Uno hand setup: here your hand lies on top and hers underneath — not a natural position for her.',
        role: 'leader',
        kind: 'concept',
        sourceStart: 131.28,
        sourceVideo: 'lV56IVufYOU',
        verbatim:
          'Now you could say aha we know that from El Uno and that\'s not true because this hand setup is different than in El Uno. Now my hand is lying on top, her hand is on the bottom. This is not natural position.',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-12',
        beat: 5,
        text: 'Because her hand is trapped underneath, she has to free it during Dile que no.',
        role: 'follower',
        kind: 'lead',
        sourceStart: 140.7,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'So when we continue with Dilek Enon she has to do something to get the hand out.',
        confidence: 'transcript',
      },
      // -13, -14 and -15 come from the second teacher's off-mic stretch, which
      // the class itself flags. They stay `transcript`, not `suspect`: the risk
      // is missing words, not wrong words (K9-c).
      {
        id: 'sombrero-13',
        text: 'Free it palm first: fingers and palm lead upward, elbow stays down, then straighten the arm.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 149.42,
        sourceVideo: 'lV56IVufYOU',
        verbatim:
          'She\'s going with her left hand up, but she\'s starting with her fingers, with her palm. So palm is going up, elbow is staying down, and then she\'s straightening it up.',
        confidence: 'transcript',
        warning:
          'Spoken by the second teacher off-mic; the class itself flags the audio (@197.40). Verify 149–200 before setting verified.',
        flag: 'K9-c',
      },
      {
        id: 'sombrero-14',
        text: 'Middle finger and thumb close together, the rest naturally spread — like holding an egg.',
        role: 'follower',
        kind: 'styling',
        sourceStart: 164.32,
        sourceVideo: 'lV56IVufYOU',
        verbatim:
          'so middle finger and thumb are getting quite close to each other, the rest of the fingers are spread but nothing crazy, quite natural position',
        confidence: 'transcript',
        warning:
          'Spoken by the second teacher off-mic; the class itself flags the audio (@197.40). Verify 149–200 before setting verified.',
        flag: 'K9-c',
      },
      {
        id: 'sombrero-15',
        text: 'Don\'t tense it. Tilt the hand outward, just a bit.',
        role: 'follower',
        kind: 'styling',
        sourceStart: 189.84,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'don\'t tense it quite relaxed position and this hand tilt or bend is outside. Just a bit.',
        confidence: 'transcript',
        warning:
          'Spoken by the second teacher off-mic; the class itself flags the audio (@197.40). Verify 149–200 before setting verified.',
        flag: 'K9-c',
      },
      // -16…-20 are the class's only beat-numbered material: the arm-timing
      // block. `-19` repeats `-8`'s action on purpose — technique and timing were
      // taught 115 seconds apart as two different things (§9.4).
      {
        id: 'sombrero-16',
        beat: 1,
        text: 'Pull up just before 1.',
        role: 'leader',
        kind: 'rhythm',
        sourceStart: 224.18,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'So now very quickly timing for arms. We are pulling up before one',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-17',
        beat: 1,
        text: 'She steps on 1.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 226.56,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'she\'s stepping on one',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-18',
        beat: 2,
        text: 'Swap hands on 2.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 227.6,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'I\'m swapping hands on two',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-19',
        beat: 3,
        text: 'Give the second hand underneath on 3.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 229.12,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'giving second on the bottom on three',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-20',
        beat: 3,
        text: 'Her arm goes up on 3 as well.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 231.48,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'and her arm up goes on three as well',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-21',
        beat: 1,
        text: 'The first step is the whole move — pull on 1.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 293.62,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'The most important part of this move is the first step where I pull and she goes forward.',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-22',
        beat: 1,
        text: 'Step forward on 1. Step back and you\'ve spent two steps before the turn even starts.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 300.46,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'If she goes back, we have one, two. We wasted two steps already. We haven\'t started even the turn.',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-23',
        text: 'It can be completed in four steps, but it is very difficult — don\'t plan on it.',
        role: 'both',
        kind: 'concept',
        sourceStart: 308.62,
        sourceVideo: 'lV56IVufYOU',
        verbatim: 'So it is possible to complete it in four steps, but it\'s very, very difficult. So think about that.',
        confidence: 'transcript',
      },
      // Follower only, deliberately: the leader half ("release before she lifts")
      // is implied but never said as an instruction, and adding it would be
      // inventing a cue (§9.4 R4 check).
      {
        id: 'sombrero-24',
        text: 'Wait to lift that hand until he releases it.',
        role: 'follower',
        kind: 'lead',
        sourceStart: 319.66,
        sourceVideo: 'lV56IVufYOU',
        verbatim:
          'when we finish the move, five, six, seven, she\'s waiting with lifting this hand. She\'s not doing it before I release it',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-25',
        text:
          'Sombrero complicato, Sombrero complicato doble, Juana la Cubana and Montana are all built on this — complicato doble is why she waits.',
        role: 'both',
        kind: 'context',
        sourceStart: 330.04,
        sourceVideo: 'lV56IVufYOU',
        verbatim:
          'sombrero complicato doble, when we will swap hands and we need both. We already done sombrero complicato that bases on the same principle',
        confidence: 'transcript',
      },
      {
        id: 'sombrero-26',
        text: 'Many moves start with Sombrero, or use a sombrero-like action halfway through.',
        role: 'both',
        kind: 'concept',
        sourceStart: 355.52,
        sourceVideo: 'lV56IVufYOU',
        verbatim:
          'Sombrero is a very important ingredient, very important package when you are learning how to dance cuban salsa. Many moves are starting with sombrero or many moves are using sombrero like actions somewhere halfway through.',
        confidence: 'transcript',
      },
    ],
    // The first is a note and not a cue on purpose: it is a compressed
    // restatement of -6, -7 and -8, and shipping it would put the same action in
    // the drill four times.
    notes: [
      {
        text:
          'The teachers\' own shorthand call for the hands, said once over the fluent demo: "Hop and pull. Pull, swap, give second. Around and around." Audible inside the slow clip.',
        sourceVideo: 'lV56IVufYOU',
        sourceStart: 210.44,
      },
      {
        text:
          'Sombrero complicato, Sombrero complicato doble, Juana la Cubana and Montana are all built on this move; complicato doble is the one that needs both hands free, which is why the follower waits to lift hers.',
        sourceVideo: 'lV56IVufYOU',
        sourceStart: 325.6,
      },
      {
        text:
          'Full-tempo alternate window, not cut: lV56IVufYOU 372.66 → 400.86 (28.2s), the class\'s music chapter. Its first 9.3s is the only un-narrated full-tempo Sombrero in the class; from 381.94 the teachers vocalise the rhythm ("king king pa") and from 391.62 call every number, so 32% count density (GC-c). Publish it instead of the short if the short opens on a title card.',
        sourceVideo: 'lV56IVufYOU',
        sourceStart: 372.66,
      },
      {
        text:
          'Counted alternate window, not cut: lV56IVufYOU 267.14 → 289.98 (22.8s), two reps from the second camera with "Girls, front, front opens" called over the second. Held back because the framing is unverified and the chapter title ("side view") is not what the teachers say ("different perspective") — K9-e.',
        sourceVideo: 'lV56IVufYOU',
        sourceStart: 267.14,
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 9,
        videoId: 'lV56IVufYOU',
        teachStart: 47,
        segmentIds: [
          'cc9-teach-sombrero',
          'cc9-count-sombrero',
          'cc9-angle-sombrero',
          'cc9-music-sombrero',
        ],
        clips: {
          // Not the chapter as published (250.0–267.0): that is 17 seconds, opens
          // mid-count and ends 2.6s into the next announcement. This is the same
          // demo, whole (K9-a).
          slow: {
            src: '/clips/salsa/couples/sombrero-slow.mp4',
            sourceVideo: 'lV56IVufYOU',
            start: 234.94,
            end: 264.36,
            aspect: '16/9',
            caveat:
              'Starts 15s before the "fluently with count" chapter, inside the teach block: the chapter begins mid-demo (K9-a). The teachers\' shorthand — "Hop and pull. Pull, swap, give second" — is audible over the first rep.',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/sombrero-fast.mp4',
            sourceVideo: 'Nl714zi8W-A',
            start: 0,
            end: 33.474,
            aspect: '9/16',
            caveat:
              'Whole official short, un-transcribed — no interior boundary could be anchored. Check for an intro title card before publishing.',
            confidence: 'transcript',
          },
        },
      },
    ],
    complete: true,
    flags: ['K9-a', 'K9-c', 'K9-e'],
  },

  // Class 10 — the combination without the tail. `alarde` is an alias, not a
  // move: the class never counts it alone, so splitting it out would create a
  // move that can never have a `count` window — a permanent R2 violation.
  {
    id: 'enchufla-doble-alarde',
    name: 'Enchufla doble, alarde',
    aliases: [
      'Enchufla doble, alarde',
      'enchufla doble alarde',
      'Enchufla (doble, triple) - alarde',
      'Enchufla triple alarde',
      'alarde',
      'Alarde',
      'a larde',
      'allarde',
      'alar de',
      'a lardy',
      'al lard',
      'two flat doble alarde',
      'and two flat triple alarde',
      'fladoble allarde',
    ],
    kind: 'step',
    group: 'enchufla',
    summary:
      'Enchufla repeated as often as you like, ending with the leader\'s hook turn — the alarde — landing the pair side by side in arm resting grip.',
    footwork:
      'From Guapea. Enchufla as many times as called — single, doble or triple; the footwork is Kentucky\'s. On the final repetition the leader does the hook turn instead, passing the joined hands behind his own back, while the follower does three steps in a spot. You land next to each other in arm resting grip, then continue into Dile que no. Number of Enchuflas before the alarde is variable and the transcript is inconsistent with the chapter title; count them by eye at 174–194.',
    base: 'guapea',
    // Kentucky is deliberately NOT here: this move is not built from Kentucky, it
    // shares Kentucky's footwork. That relationship is carried by cue -4 (K10-b).
    composedOf: ['guapea', 'enchufla', 'hook-turn', 'dile-que-no'],
    cues: [
      {
        id: 'enchufla-doble-alarde-1',
        text: 'Long moves usually carry one short name — everything here happens inside one call.',
        role: 'both',
        kind: 'context',
        sourceStart: 43.36,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim:
          'Quite often long moves have one name. So for example, if you check our intermediate moves for couples, you\'ll see Santiago and it\'s a long move with many things happening in it, but it\'s one short name.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-doble-alarde-2',
        text: 'In rueda the caller can change things while they\'re already happening — this move is a good example.',
        role: 'both',
        kind: 'context',
        sourceStart: 60.84,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim:
          'Very often it happens that in Rueba we can manipulate things while they are happening. So this is a good example of it.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-doble-alarde-3',
        text: 'Repeat the Enchufla as often as you like — single, doble, triple. The alarde is the ending either way.',
        role: 'both',
        kind: 'context',
        sourceStart: 70.62,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'So it could be done as single Enchufla, Enchufla doble, Enchufla triple.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-doble-alarde-4',
        text: 'The footwork is exactly Kentucky\'s.',
        role: 'both',
        kind: 'context',
        sourceStart: 97.78,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'So footwork is exactly the same like in Kentucky.',
        confidence: 'transcript',
      },
      // -5 and -6 are one sentence containing two different instructions, split
      // with different sourceStarts — the textbook R4 case (§10.4).
      {
        id: 'enchufla-doble-alarde-5',
        text: 'On the last repetition, do the hook turn instead of another Enchufla.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 105.98,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'and the fourth time I do the hook turn',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-doble-alarde-6',
        text: 'While he hook-turns, do three steps in a spot.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 108.5,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'Ola is doing three steps in a spot.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-doble-alarde-7',
        text: 'You land next to each other in arm resting grip.',
        role: 'both',
        kind: 'concept',
        sourceStart: 110.56,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'We land next to each other and we end up with arm resting grip.',
        confidence: 'transcript',
      },
      // Legal as `both`: "the arms" carries no possessive that differs by role.
      {
        id: 'enchufla-doble-alarde-8',
        text: 'Hold the grip relatively strong, with the arms tensed.',
        role: 'both',
        kind: 'lead',
        sourceStart: 118.16,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'The grip is relatively strong and our arms are tensed.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-doble-alarde-9',
        text: 'During the hook turn you have to pass the hands behind your own back.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 135.72,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim:
          'Definitely the moment to discuss is when I\'m doing hook turn. I have to pass the hands behind my back.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-doble-alarde-10',
        text: 'As you turn around, hold her wrist a bit higher.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 150.92,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'Now I will turn around and I will try to hold her wrist a bit higher.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-doble-alarde-11',
        text: 'Holding it higher lets the arm twist — that twist is what lands you in arm resting grip.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 161.54,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim:
          'So I\'m holding it a bit higher and then the arm is twisting. We land in arm resting grip. This is the goal. This is the way you want to get there.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-doble-alarde-12',
        text: 'From arm resting grip, continue straight into Dile que no.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 122.88,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'and from this position we\'ll do Dilek en o.',
        confidence: 'transcript',
      },
    ],
    notes: [
      {
        text:
          'Counted alternate window, not cut, and BETTER than the published slow clip: CkZO6nyJwjw 234.64 → 264.98 (30.3s) is three uninterrupted counted reps from the second camera, against 19.96s and one interrupted rep at 174.02 → 193.98. It is held back for one reason only — the announcement at @231.46 is "We\'ll do the same opposite direction", and the transcript cannot say whether the camera moved or the move is being led to the other side. Watch 231–235: if the footwork is unchanged, publish this window instead. Four seconds of video decide a 10-second improvement on the most important artefact in the class, and it is the highest-value verification item in the course (K10-f).',
        sourceVideo: 'CkZO6nyJwjw',
        sourceStart: 234.64,
      },
      {
        text:
          'Full-tempo alternate window, not cut: CkZO6nyJwjw 529.16 → 545.46 (16.3s). The only full-tempo rendition in the class WITHOUT the Exhibela tail — "Enchufla triple, alarde, hop! One, two, three, turn, and then D-Le Cano, no Exhibela." @533.60 — so it is the honest unshared option against the shared short. Held back at 16.3s, and the teacher calls it triple (K10-a, K10-c).',
        sourceVideo: 'CkZO6nyJwjw',
        sourceStart: 529.16,
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 10,
        videoId: 'CkZO6nyJwjw',
        teachStart: 40,
        // The music chapter is deliberately excluded: from 285 on, every
        // rendition has the Exhibela on the end.
        segmentIds: ['cc10-teach-doble-alarde', 'cc10-count-doble-alarde', 'cc10-angle-doble-alarde'],
        clips: {
          slow: {
            src: '/clips/salsa/couples/enchufla-doble-alarde-slow.mp4',
            sourceVideo: 'CkZO6nyJwjw',
            start: 174.02,
            end: 193.98,
            aspect: '16/9',
            caveat:
              '19.96s, under the 23s reference floor. The teacher talks to his partner mid-demo ("guys, front and D leg, can you put hand on my shoulder" 185–187). The rest of the chapter (203.72–228.02) is deliberately excluded: those reps are Enchufla triple alarde and a "straight away" variant, not this move\'s own count (K10-a).',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/enchufla-doble-alarde-exhibela-fast.mp4',
            sourceVideo: 'fNXwnQuVdEI',
            start: 0,
            end: 45.734,
            aspect: '9/16',
            label: 'Class 10 short — shows the full combination, including the Exhibela tail.',
            caveat:
              'Whole official short, un-transcribed — no interior boundary could be anchored. Check for an intro title card before publishing. Shared with Enchufla doble, alarde, Exhibela: the short shows the combination with the Exhibela, so this move has no unshared full-tempo clip (K10-c).',
            confidence: 'transcript',
            shared: true,
          },
        },
      },
    ],
    complete: true,
    flags: ['K10-a', 'K10-b'],
  },

  // Class 10 — the same combination with the Exhibela tail. Only 5 cues, and that
  // is correct rather than thin: the Enchufla content lives on `enchufla`, the
  // Exhibela content (including its lead) on `exhibela-crossing`, the alarde
  // content on `enchufla-doble-alarde`. `composedOf` assembles them; duplicating
  // a cue here would make the drill say the same thing twice in a row.
  {
    id: 'enchufla-doble-alarde-exhibela',
    name: 'Enchufla doble, alarde, Exhibela',
    aliases: [
      'Enchufla doble, alarde, Exhibela',
      'enchufla doble alarde exhibela',
      'Enchufla Doble, Alarde, Exhibela',
      'and two flat I love the Exhibela',
      'ciufla doble, allarde, Exhibela',
      'and two fladoble, a lard, Exhibela',
    ],
    kind: 'step',
    group: 'enchufla',
    summary: 'The same combination with an Exhibela on the end — and the Exhibela can be repeated by calling otra.',
    footwork:
      'Exactly `enchufla-doble-alarde` up to the arm resting grip. From there the leader continues with the Exhibela crossing step while the follower steps back on her right and turns right on 5-6-7. The turn may be repeated — call otra for each extra one — and the combination finishes with Dile que no, still in arm resting grip.',
    base: 'guapea',
    composedOf: ['enchufla-doble-alarde', 'exhibela-crossing', 'dile-que-no'],
    cues: [
      {
        id: 'enchufla-doble-alarde-exhibela-1',
        text: 'Same combination, with an Exhibela on the end.',
        role: 'both',
        kind: 'context',
        sourceStart: 285,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'Now, I said at the beginning that this will be Enchufla Doble, Alarde, Exhibela.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-doble-alarde-exhibela-2',
        text: 'When you\'ve finished turning her, close with Dile que no.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 402.34,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'And when we are done, we finish with dilekano.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-doble-alarde-exhibela-3',
        text: 'Keep the arm resting grip all the way through the Dile que no.',
        role: 'both',
        kind: 'lead',
        sourceStart: 406.08,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'And one, two, still arm resting grip. Five, six, seven.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-doble-alarde-exhibela-4',
        text: 'You don\'t have to keep this order — drop the Exhibela and go straight to Dile que no if you want.',
        role: 'both',
        kind: 'concept',
        sourceStart: 524.58,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim:
          'you don\'t have to repeat the same order every single time so you could do just… Enchufla triple, alarde, hop! One, two, three, turn, and then D-Le Cano, no Exhibela.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-doble-alarde-exhibela-5',
        text: 'Varying it is the whole point when you\'re social dancing.',
        role: 'both',
        kind: 'concept',
        sourceStart: 545.46,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'All of this is good when you\'re social dancing, just to keep some variety.',
        confidence: 'transcript',
      },
    ],
    notes: [
      {
        text:
          'Counted alternate window, not cut: CkZO6nyJwjw 463.20 → 490.08 (26.9s), two reps from the second camera with "and now our angles are different. I\'ll try again. I want you to see feet" spoken between them (474.08–479.28). Longer than the published 20.4s window; held back because the published one is the front camera and names the move on the way in.',
        sourceVideo: 'CkZO6nyJwjw',
        sourceStart: 463.2,
      },
      {
        text:
          'Full-tempo alternate window, not cut: CkZO6nyJwjw 492.38 → 524.58 (32.2s), the class\'s music chapter. 30% count density — the teacher counts and comments over the music throughout (GC-c).',
        sourceVideo: 'CkZO6nyJwjw',
        sourceStart: 492.38,
      },
      {
        text:
          'Second full-tempo alternate window, not cut, and unique to this class: the intro teaser, CkZO6nyJwjw 0.00 → 17.92. Chapter 1 is not a talking head but a counted full-tempo run of the whole combination, named in the first word ("One, enchufla doble, alarde, exhibela, and one two three, five six seven." @0.00) and 79% counted. It is the only place the combination is danced at tempo with a clean count and no commentary. Almost certainly carries an on-screen title or channel branding — check before publishing. The classes 8 and 9 intros are ~20% counted, so the trick does not generalise (K12-g is the counter-example).',
        sourceVideo: 'CkZO6nyJwjw',
        sourceStart: 0,
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 10,
        videoId: 'CkZO6nyJwjw',
        teachStart: 285,
        segmentIds: [
          'cc10-teach-exhibela',
          'cc10-count-exhibela',
          'cc10-angle-exhibela',
          'cc10-music-exhibela',
        ],
        clips: {
          slow: {
            src: '/clips/salsa/couples/enchufla-doble-alarde-exhibela-slow.mp4',
            sourceVideo: 'CkZO6nyJwjw',
            start: 416.1,
            end: 436.52,
            aspect: '16/9',
            caveat:
              '20.4s, under the 23s reference floor; one rep only, with the move named on the way in and the "…only one turn" call at @432.82. The chapter\'s remaining 22s is spoken etiquette, not dancing.',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/enchufla-doble-alarde-exhibela-fast.mp4',
            sourceVideo: 'fNXwnQuVdEI',
            start: 0,
            end: 45.734,
            aspect: '9/16',
            caveat:
              'Whole official short, un-transcribed — no interior boundary could be anchored. Check for an intro title card before publishing.',
            confidence: 'transcript',
          },
        },
      },
    ],
    complete: true,
    flags: ['K10-c'],
  },

  // Class 10 — `exhibela-crossing`'s PARTNERED teaching. The move id already
  // exists in salsa-steps-classes/classes-01-05.ts with cues -1…-13; this object
  // carries only the couples source and only the `-c10-` cues (§0.3). Because
  // salsa-couples.ts concatenates the fragments without merging by id, the two
  // courses' data for this one id has to be merged there, not here.
  {
    id: 'exhibela-crossing',
    name: 'Exhibela crossing',
    aliases: [
      'Exhibela',
      'exibela',
      'exit below',
      'like Zibela',
      'Exhibit and',
      'exhibela side and cross',
      'Xebala crossing step',
      'Exhibela Step',
      // Not a name for Exhibela: `otra` is the generic "again" call. But Class 10
      // is the only place in either course that defines the word, so a search for
      // it should land here — the definition is cue -c10-9.
      'otra',
    ],
    kind: 'step',
    summary:
      'The first step that travels sideways first. Left to the side, right back to open space, left crosses forward in front.',
    footwork:
      'Left foot steps to the left, right returns roughly where it was but slightly back to open space in front, then the left crosses forward in front. Mirror on the other side — right to the side, left slightly back, right crosses in front. Same 1-2-3 / 5-6-7 timing, feet alternating left-right-left / right-left-right. Partnered (couples class 10): the leader keeps that crossing step while the follower steps back on her right and turns right on 5-6-7, led by the hand going up on 3 and down on 7.',
    cues: [
      {
        id: 'exhibela-crossing-c10-1',
        text: 'This is the Exhibela step from the Steps course, now with a partner.',
        role: 'both',
        kind: 'context',
        sourceStart: 291.06,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'Now, you know Exhibela Step from our Steps course, or if you don\'t know, again, cards.',
        confidence: 'transcript',
      },
      {
        id: 'exhibela-crossing-c10-2',
        text: 'Your side is unchanged: the crossing step, exactly as in the steps course.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 306.3,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim:
          'From my perspective I will do Exhibela crossing step the same as we did during our steps course',
        confidence: 'transcript',
      },
      {
        id: 'exhibela-crossing-c10-3',
        text: 'Travel across, rotated 90 degrees towards her.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 337.82,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim:
          'I continue with Xebala crossing step. I will travel from one camera to another. I will be rotated 90 degrees towards Ola.',
        confidence: 'transcript',
      },
      {
        id: 'exhibela-crossing-c10-4',
        beats: [5, 6, 7],
        text: 'Step back on your right foot and turn to the right on 5, 6, 7.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 340.6,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'She will go back with her right foot and do turn to the right on 5, 6, 7.',
        confidence: 'transcript',
      },
      // -5 and -6 are the pair this whole spec exists for: a beat-numbered,
      // role-attributed, sourced hand lead. They share one sentence and are 2.1s
      // apart at the word level, which a segment-level timestamp would collapse.
      {
        id: 'exhibela-crossing-c10-5',
        beat: 3,
        text: 'Lift the hand up on 3.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 349.7,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'There is a leading for this part. I\'m lifting hand up on 3 and lowering it down on 7.',
        confidence: 'transcript',
      },
      {
        id: 'exhibela-crossing-c10-6',
        beat: 7,
        text: 'Lower it back down on 7.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 351.84,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'I\'m lifting hand up on 3 and lowering it down on 7.',
        confidence: 'transcript',
      },
      {
        id: 'exhibela-crossing-c10-7',
        text: 'Style the free hand like poking a small kid in the eye — the styling you already know.',
        role: 'follower',
        kind: 'styling',
        sourceStart: 373.36,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'She\'s having a bit of style poking some small kid in the eye. We know the styling already.',
        confidence: 'transcript',
      },
      {
        id: 'exhibela-crossing-c10-8',
        text: 'The turn can be repeated as many times as you like.',
        role: 'both',
        kind: 'concept',
        sourceStart: 379.74,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim: 'Now this turn could be repeated many times.',
        confidence: 'transcript',
      },
      {
        id: 'exhibela-crossing-c10-9',
        text: 'There is no "Exhibela doble". To ask for another turn, call otra.',
        role: 'both',
        kind: 'context',
        sourceStart: 383.92,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim:
          'Normally we don\'t call it Exhibela, double, Exhibela, triple or anything like that. Just when we want to call another turn, we call otra.',
        confidence: 'transcript',
      },
      // Sourced from 451.30 — inside chapter 7, even though the sentence
      // continues past the 459.0 boundary. That is intentional (K10-d).
      {
        id: 'exhibela-crossing-c10-10',
        text: 'Once is fine, twice is fine, three turns is pushy — if she isn\'t comfortable turning she\'ll get dizzy.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 451.3,
        sourceVideo: 'CkZO6nyJwjw',
        verbatim:
          'Once is okay, twice is okay, three times is a bit pushy. If the girl is comfortable with turns, then fine. If not, then she will definitely feel dizzy.',
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 10,
        videoId: 'CkZO6nyJwjw',
        teachStart: 301.04,
        segmentIds: [
          'cc10-teach-exhibela',
          'cc10-count-exhibela',
          'cc10-angle-exhibela',
          'cc10-music-exhibela',
        ],
        note:
          'The partnered teaching. Leader keeps the steps-course crossing step; the follower\'s right turn and the hand lead (up on 3, down on 7) are new.',
        clips: {
          // The manifest names this file `exhibela-crossing-slow.mp4`; spec §10.3
          // calls it `exhibela-crossing-couples-slow.mp4`. The manifest wins — it
          // is the name on disk.
          slow: {
            src: '/clips/salsa/couples/exhibela-crossing-slow.mp4',
            sourceVideo: 'CkZO6nyJwjw',
            start: 353.12,
            end: 373.36,
            aspect: '16/9',
            label: 'Counted — the lead, not the step (couples class 10)',
            caveat:
              '20.2s. The teacher narrates over the second rep. The hand lead being demonstrated is described 6s earlier, at 349.70 — a viewer who starts at the in-point does not hear it.',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/enchufla-doble-alarde-exhibela-fast.mp4',
            sourceVideo: 'fNXwnQuVdEI',
            start: 0,
            end: 45.734,
            aspect: '9/16',
            label: 'Class 10 short — Exhibela is the ending of the combination.',
            caveat:
              'Whole official short, un-transcribed — no interior boundary could be anchored. Check for an intro title card before publishing.',
            confidence: 'transcript',
            shared: true,
          },
        },
      },
    ],
    complete: true,
  },

  // Class 11 — Setenta, the charter's worked example and the class that
  // explicitly teaches leading. 13 of its cues are drillable against a soft cap
  // of 8: deliberately not trimmed, because the move is four bars of 8 explained
  // over 145 seconds. It is also the class whose lead cues are least trustworthy
  // — four ship `suspect` — which is why it is the top priority for a human pass.
  {
    id: 'setenta',
    name: 'Setenta',
    // `seventy` is a search alias only, never a display name — nothing in the tab
    // translates a move name (R1). `cetenta` / `sedan` are the YouTube
    // auto-caption manglings recorded in SALSA_TAB_GOALS.md.
    aliases: ['Setenta', 'setenta', 'set and a hop', 'set and the hop', 'set and one', 'seventy', 'cetenta', 'sedan'],
    kind: 'step',
    summary:
      'The course\'s first long move: Guapea, her right turn while you walk left, Enchufla, three steps forward under an arch, and out through Enchufla Mix into Dile que no.',
    footwork:
      'Start in Guapea and hold the second hand when you touch. She turns right on 3 while you walk slowly to your left — the couple has rotated 90 degrees. Continue with Enchufla on 5-6-7, which swaps places and adds another 180 degrees. Then three steps just walking forward; on 7-8 of that walk the joined arms make an arch. Finish with Enchufla Mix and Dile que no, and land back in Guapea.',
    base: 'guapea',
    composedOf: ['guapea', 'enchufla', 'enchufla-mix', 'dile-que-no'],
    cues: [
      {
        id: 'setenta-1',
        text: 'Every version of Setenta starts the same way: from Guapea.',
        role: 'both',
        kind: 'context',
        sourceStart: 58.88,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'All versions of setenta start in the same way. We start with Guapea.',
        confidence: 'transcript',
      },
      {
        id: 'setenta-2',
        text: 'When you touch on the Guapea, hold the second hand — don\'t let it go.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 66.36,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'Five, six, seven, bow back, cheeky, cheek. Now when we touch second hand we hold it',
        confidence: 'transcript',
      },
      {
        id: 'setenta-3',
        beat: 3,
        text: 'From there it\'s your right turn.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 69.26,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'the continuation is we have the right turn from girl perspective',
        confidence: 'transcript',
      },
      {
        id: 'setenta-4',
        beat: 1,
        text: 'While she rotates right, walk slowly to your left — one, two, and turn.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 74.88,
        sourceVideo: 'QueWxI6vMrc',
        verbatim:
          'Now when she\'s rotating to the right I\'m slowly walking to the left. One, two and turn and five, six, seven.',
        confidence: 'transcript',
      },
      {
        id: 'setenta-5',
        text: 'That first part changes your position by 90 degrees.',
        role: 'both',
        kind: 'concept',
        sourceStart: 80.98,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'So we change position by 90 90 degrees.',
        confidence: 'transcript',
      },
      {
        id: 'setenta-6',
        beat: 5,
        text: 'Continue with Enchufla on five, six, seven.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 84.2,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'We continue with enchufla five, six, seven.',
        confidence: 'transcript',
      },
      {
        id: 'setenta-7',
        text: 'Enchufla swaps places completely — that\'s another 180 degrees on top.',
        role: 'both',
        kind: 'concept',
        sourceStart: 89.12,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'You know that enchufla swaps places completely, so now we\'ve added another 180 degrees.',
        confidence: 'transcript',
      },
      {
        id: 'setenta-8',
        text: 'Then three steps just walking forward.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 96.58,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'And then next three steps we are just walking forward.',
        confidence: 'transcript',
      },
      {
        id: 'setenta-9',
        text: 'Walk forward with your right.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 102.42,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'I\'m walking forward with my right sheet, walking forward with the left.',
        confidence: 'transcript',
      },
      {
        id: 'setenta-10',
        text: 'She walks forward with the left.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 103.94,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'I\'m walking forward with my right sheet, walking forward with the left.',
        confidence: 'suspect',
        warning:
          'Whisper renders "she\'s" as "sheet" in this sentence ("with my right sheet, walking forward with the left"), so whose left foot this is cannot be settled from the transcript. Leader-side is setenta-9; check the audio at 102–105 before trusting the follower half.',
        flag: 'K11-c',
      },
      {
        id: 'setenta-11',
        beats: [7, 8],
        text: 'On seven-eight, while you\'re still walking, lift the joined arms into an arch.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 143.38,
        sourceVideo: 'QueWxI6vMrc',
        verbatim:
          'and now five six seven eight so I\'m creating an arch from our arms … and this is happening on seven eight while walking so this is the last step of walking',
        confidence: 'transcript',
      },
      // The spec ships this as one `both` cue naming two hands by role. It is
      // split here because the type forbids a `both` cue with a possessive limb
      // reference that differs by role, and §11.4 pre-authorises exactly this
      // split. Leader half first (R4).
      {
        id: 'setenta-12a',
        text: 'Arm setup for the arch: your right palm underneath.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 146.98,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'this is my right and this is all that her palm is lying on top of mine there is an arch',
        confidence: 'transcript',
      },
      {
        id: 'setenta-12b',
        text: 'Arm setup for the arch: your palm rests on top of his.',
        role: 'follower',
        kind: 'lead',
        sourceStart: 146.98,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'this is my right and this is all that her palm is lying on top of mine there is an arch',
        confidence: 'transcript',
      },
      {
        id: 'setenta-13',
        beats: [7, 8],
        text: 'Put your head inside the arch and bring it down.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 151.96,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'I\'ll put my head inside there and I take it down and this is happening on seven eight while walking',
        confidence: 'suspect',
        warning:
          'The transcript says the leader puts *his own* head inside the arch. That may be right — some Setenta variations pass the leader under — but it may be Whisper mishearing "her head". Watch 143–157 before trusting it.',
        flag: 'K11-b',
      },
      {
        id: 'setenta-14',
        text:
          'Practise the arm action during the pause — actions can be made on poses too. Arms can still act while the feet wait.',
        role: 'both',
        kind: 'concept',
        sourceStart: 159.54,
        sourceVideo: 'QueWxI6vMrc',
        verbatim:
          'then during the pause this is very cool thing to practice because you are learning that actions can be made also on poses. So arms can still act.',
        confidence: 'transcript',
      },
      {
        id: 'setenta-15',
        text: 'Left hand up, then down.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 182.24,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'Left hand upright down.',
        confidence: 'suspect',
        warning:
          '"Left hand upright down" is not a sentence. It is almost certainly "left hand up, right down" or "left hand up, bring it down". The action is real and on camera; the words are not recoverable from this transcript.',
        flag: 'K11-b',
      },
      {
        id: 'setenta-16',
        text: 'Left hand goes over, then think about the right.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 187.16,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'Left hand goes over and think about right. Six on your head.',
        confidence: 'suspect',
        warning:
          '"Six on your head" is unrecoverable — probably a count ("six", "on your head") spoken over the demo. The "left hand goes over" half is clear; the rest must be watched.',
        flag: 'K11-b',
      },
      {
        id: 'setenta-17',
        beat: 5,
        text: 'Finish everything with Enchufla Mix, then Dile que no.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 107.26,
        sourceVideo: 'QueWxI6vMrc',
        verbatim:
          'We finish everything with enchufla mix, enchufla and mix, mix, mix mix and delay can off and five six seven',
        confidence: 'transcript',
      },
      {
        id: 'setenta-18',
        text: 'The version shown first is the plain one; the taught version is deliberately a bit more complicated.',
        role: 'both',
        kind: 'context',
        sourceStart: 120.38,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'Now this is not the ideal version. We\'ll show you one that is tiny bit more complicated.',
        confidence: 'transcript',
      },
      // -19 and -20 come from the outro sweep (GC-f, K11-f): the teachers state
      // R3 in their own words inside a chapter the role vocabulary says to
      // discard. They stay `concept`, not `lead` — they are the reason lead cues
      // exist, not an action anchored to a beat, and promoting them would put an
      // un-drillable sentence into drill mode.
      {
        id: 'setenta-19',
        text: 'Pay attention in every single move to how the arms move and which signal is given at which moment. It does matter.',
        role: 'both',
        kind: 'concept',
        sourceStart: 543.14,
        sourceVideo: 'QueWxI6vMrc',
        verbatim:
          'So if you pay attention in every single move, how our arms are moving, which signals we are giving in which moment, it does matter.',
        confidence: 'transcript',
      },
      {
        id: 'setenta-20',
        text: 'Timing matters, the precision of the lead matters, and so does precision in time.',
        role: 'leader',
        kind: 'concept',
        sourceStart: 552.22,
        sourceVideo: 'QueWxI6vMrc',
        verbatim: 'Timing matters, precision of the lead matters, and precision in time as well.',
        confidence: 'transcript',
      },
    ],
    notes: [
      {
        text:
          'Not a composedOf edge, but the class\'s own observation and the reason the tab wants the edges at all: "probably you start noticing that this moves have many things in common so like the beginning of Kentucky and the ending of setenta for example or Exhibela or la chica and setenta." The same passage explains that moves can be broken mid-way and recombined — "I\'ll do Kentucky and then Exhibela in the end and now instead of letting her go, I\'ll continue with Setenta" — and that doing so reverses the couple\'s position. Real and useful, but not a Setenta instruction (K11-e).',
        sourceVideo: 'QueWxI6vMrc',
        sourceStart: 443.52,
      },
      {
        text:
          'Full-tempo alternate window, not cut: QueWxI6vMrc 383.92 → 400.56 (16.6s), the teachers restarting with "a bit more dynamics" because "I was a bit lazy in the first part of it". Publish it instead of the short only if the short opens on a title card — it is under the 23s floor and the teacher counts over the music (GC-c).',
        sourceVideo: 'QueWxI6vMrc',
        sourceStart: 383.92,
      },
      {
        text:
          'Counted alternate window, not cut: QueWxI6vMrc 279.18 → 316.90 (37.7s), the angle chapter — four counted Setenta reps from the side with no music and no explanation. It is the strongest PURE counted window in the class and is held back only because the framing of a camera-angle chapter is unverified; compare it side by side with the published clip before deciding.',
        sourceVideo: 'QueWxI6vMrc',
        sourceStart: 279.18,
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 11,
        videoId: 'QueWxI6vMrc',
        teachStart: 58,
        segmentIds: [
          'cc11-teach-setenta',
          'cc11-count-setenta',
          'cc11-angle-setenta',
          'cc11-music-setenta',
          'cc11-outro-leading',
        ],
        clips: {
          // Not the bare `count` chapter: 73s of which only 17.2s is demo. Pushing
          // the start back to 177.66 buys a second, slower rep with the lead
          // spoken over it — the most valuable 20 seconds in the class (K11-a).
          slow: {
            src: '/clips/salsa/couples/setenta-slow.mp4',
            sourceVideo: 'QueWxI6vMrc',
            start: 177.66,
            end: 221.12,
            aspect: '16/9',
            caveat:
              'First ~26s sits in the teach chapter, not the counted one: it is the "one more time super slow" repetition with the teacher naming the hand actions over it. The clean fluent counted rep is the last 17s (from 203.9).',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/setenta-fast.mp4',
            sourceVideo: 'TyOHtkirh_g',
            start: 0,
            end: 44.574,
            aspect: '9/16',
            caveat:
              'Whole official short, un-transcribed — no interior boundary could be anchored. Check for an intro title card before publishing.',
            confidence: 'transcript',
          },
        },
      },
    ],
    complete: true,
    flags: ['K11-b', 'K11-c'],
  },

  // Class 12 — Paseala. The only move in this range not based on Guapea: it
  // *starts* with Dile que no rather than ending with it, and the class says so
  // ("So it doesn't finish with the Dilek Eno but it starts with Dilek Eno"
  // @101.48). `paseala-23` is the single best cue in the spec — an action, a
  // role, two named beats, a stated cause and a stated response.
  {
    id: 'paseala',
    name: 'Paseala',
    aliases: ['Paseala', 'paseala', 'passe alla', 'Passe alla', 'passe allah', 'pase ala', 'Paseala hop'],
    kind: 'step',
    summary:
      'From arm resting grip: a Dile que no that keeps going — she walks behind his back while he passes her hand palm to palm, and the whole thing runs on a pull she resists on 4 and 8.',
    footwork:
      'Starts from the Dile que no position in arm resting hold, right hand to right hand, her free hand on his shoulder. Leader: Dile que no, then left, forward, front, back, open, spot, spot, right, front; then travel to the left — left, right, back — and the last three steps slightly to the right: right, left, together. Finish with Guapea. Follower: the same travel, but with a tap on each direction change — tap with the left then forward with the left, and once you have rotated towards him, tap with the right then front, front, front.',
    base: 'dile-que-no',
    composedOf: ['dile-que-no', 'guapea'],
    cues: [
      {
        id: 'paseala-1',
        text: 'Paseala starts from the Dile que no position — and specifically from arm resting hold.',
        role: 'both',
        kind: 'concept',
        sourceStart: 51.32,
        sourceVideo: 'EuT94T544Mg',
        verbatim:
          'First thing we\'ll go through Paseala. Paseala starts from Dilekano position and not only that it starts from arm resting hold.',
        confidence: 'transcript',
      },
      // `both` and legal: "right hand to right hand" is symmetric, with no
      // role-dependent possessive.
      {
        id: 'paseala-2',
        text: 'Right hand to right hand, in arm resting grip.',
        role: 'both',
        kind: 'lead',
        sourceStart: 60.42,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'So we are holding right to the right in arm resting grip.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-3',
        text: 'Your free hand rests on his shoulder.',
        role: 'follower',
        kind: 'lead',
        sourceStart: 63.58,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'Ola\'s hand is on my shoulder',
        confidence: 'transcript',
      },
      {
        id: 'paseala-4',
        text: 'You already did this Dile que no from arm resting grip, in Enchufla, alarde, Exhibela.',
        role: 'both',
        kind: 'context',
        sourceStart: 68.16,
        sourceVideo: 'EuT94T544Mg',
        verbatim:
          'We already done something similar with Enchufla Alarde Xibala so you should remember how to do Dilekano from this position',
        confidence: 'transcript',
      },
      {
        id: 'paseala-5',
        text: 'It doesn\'t finish with Dile que no — it starts with it, and finishes with Guapea.',
        role: 'both',
        kind: 'concept',
        sourceStart: 101.48,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'So it doesn\'t finish with the Dilek Eno but it starts with Dilek Eno.',
        confidence: 'transcript',
      },
      // The spec numbers the follower half first (-6 @109.88, -7 @110.92); the
      // array puts the leader half first because R4 asks for leader-first within
      // a split. The ids are the spec's, unchanged.
      {
        id: 'paseala-7',
        beat: 5,
        text: 'You go forward.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 110.92,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'I go forward with Dilek Eno.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-6',
        beat: 5,
        text: 'She goes back on the Dile que no — the part you already know.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 109.88,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'Ola goes back, I go forward with Dilek Eno. We know this part.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-8',
        beat: 7,
        text: 'On 7, instead of facing to the left, step forward.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 121.42,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'So first my step on seven instead of facing to the left I go forward',
        confidence: 'transcript',
      },
      {
        id: 'paseala-9',
        text: 'Hold only the wrist of her right hand.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 126.78,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'and also I hold the wrist of Ola\'s right hand only because I\'ll pass it behind my back',
        confidence: 'transcript',
      },
      {
        id: 'paseala-10',
        text: 'Pass it behind your back palm to palm — don\'t grab it in a weird way.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 133.18,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'so I\'ll pass palm to palm instead of grabbing it in a weird way',
        confidence: 'transcript',
      },
      {
        id: 'paseala-11',
        text: 'If you were already holding her palm, there\'d be a moment where you have to drop the hand. Avoid it.',
        role: 'leader',
        kind: 'concept',
        sourceStart: 143.76,
        sourceVideo: 'EuT94T544Mg',
        verbatim:
          'If I was holding palm already there would be a moment when we would have to drop the hand. It\'s not very good.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-12',
        text: 'She walks behind his back.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 137.8,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'So when she walks behind my back, King, King, hop, I\'m able to pass it to the palm.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-13',
        text: 'Your first eight from Dile que no: left, forward, front, back, open, spot, spot, right, front.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 163.44,
        sourceVideo: 'EuT94T544Mg',
        verbatim:
          'from guy point of view. I start with D-le-can-o, five, six, left, forward, front, back, open, spot, spot, right, front.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-14',
        text: 'Then travel to the left: left, right, back.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 174.36,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'Now I start traveling to the left, left, right, go back',
        confidence: 'transcript',
      },
      {
        id: 'paseala-15',
        text: 'The last three steps go slightly to the right: right, left, together.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 179.56,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'and the last three steps slightly to the right, right, left, together.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-16',
        text: 'Finish with Guapea.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 185.64,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'We finish with Guapea, back cheeky cheek and front cheeky pucu.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-17',
        text: 'Her side has one extra thing, and it is very important: tapping.',
        role: 'follower',
        kind: 'concept',
        sourceStart: 190.4,
        sourceVideo: 'EuT94T544Mg',
        verbatim:
          'From girl point of view there is additional aspect to think about, very very important, and it\'s tapping.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-18',
        text: 'Tap to change direction — it buys you the balance an extra step would have given you.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 198.64,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'Tap is used for changing directions. It gives you a bit extra balance.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-19',
        text: 'Tap with the left, then forward with the left.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 220.56,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'there is tap with the left and forward with the left',
        confidence: 'transcript',
      },
      {
        id: 'paseala-20',
        text: 'Once you\'ve rotated towards him, tap with the right, then front, front, front.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 226.26,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'she rotated already towards me tap again with the right right continues front front front',
        confidence: 'transcript',
      },
      // `both` on purpose: the verbatim is leader-framed ("she's pulling my
      // hand") but the cue is about the *existence* of the signal, which both
      // partners need. No role-dependent possessive in the text.
      {
        id: 'paseala-21',
        text: 'The pull on the hand is the signal. This move runs on signals.',
        role: 'both',
        kind: 'lead',
        sourceStart: 250.42,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'Oh see she\'s pulling my hand. That\'s the signal. We need signals.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-22',
        text: 'Give her dynamics: pull a fair amount, or at least create resistance.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 256.44,
        sourceVideo: 'EuT94T544Mg',
        verbatim:
          'The most important is to give girl dynamics during this movement, pull quite a bit or at least create this resistance',
        confidence: 'transcript',
      },
      {
        id: 'paseala-23',
        beats: [4, 8],
        text:
          'She opens slightly on every 4 and 8 as she taps — that is the moment to tense your arm, resist, and pull her the opposite way.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 266.76,
        sourceVideo: 'EuT94T544Mg',
        verbatim:
          'because she will open slightly on every four and eight when she\'s tapping and this is the moment when I have to tense my arm and resist and pull her opposite direction',
        confidence: 'transcript',
      },
      // -24 and -25 are -23's counterpart from the other side of the hand, and
      // are spoken by the other teacher. Kept as separate follower cues rather
      // than folded into -23: "pull" and "don't be pulled" are not the same
      // instruction (R4).
      {
        id: 'paseala-24',
        text: 'Your hand stays where it is. Never let it travel to the front.',
        role: 'follower',
        kind: 'lead',
        sourceStart: 432.72,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'if you notice my hand is always there i never let it go to the front',
        confidence: 'transcript',
      },
      {
        id: 'paseala-25',
        text: 'His resistance means your resistance — don\'t let him pull you.',
        role: 'follower',
        kind: 'lead',
        sourceStart: 437.02,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'so resistance from the guy also means resistance from you so here I don\'t let him pull me',
        confidence: 'transcript',
      },
      {
        id: 'paseala-26',
        text: 'He gives tension, she returns it. There has to be constant interaction from both sides.',
        role: 'both',
        kind: 'concept',
        sourceStart: 449.3,
        sourceVideo: 'EuT94T544Mg',
        verbatim:
          'so I\'m giving tension she\'s returning tension this is how dancing works yeah there has to be constant interaction from both sides',
        confidence: 'transcript',
      },
      {
        id: 'paseala-27',
        text: 'Most students at this level are not leading strongly enough.',
        role: 'leader',
        kind: 'concept',
        sourceStart: 479.4,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'So guys are not leading strong enough and girls are not resisting enough.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-28',
        text: 'Most students at this level are not resisting enough.',
        role: 'follower',
        kind: 'concept',
        sourceStart: 481.12,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'and girls are not resisting enough',
        confidence: 'transcript',
      },
      // -29…-33: the three entries, taught inside the chapter titled "fluently
      // with count" (K12-b).
      {
        id: 'paseala-29',
        text: 'You don\'t have to start from close position every time — you can arrive in it from another move.',
        role: 'both',
        kind: 'context',
        sourceStart: 310.02,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'I told you also that we\'ll show you how to get into it instead of starting every time from close position.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-30',
        text: 'Enchufla mix is one way in.',
        role: 'both',
        kind: 'context',
        sourceStart: 316.28,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'For example, we can do enchufla mix. One, two and mix.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-31',
        text: 'Enchufla, alarde, Exhibela is another — you land with the arm already in the right position.',
        role: 'both',
        kind: 'context',
        sourceStart: 330.18,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'Another variation. Enchufla, Alarde, Exhibela… One, two, arm is already in the right position.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-32',
        text: 'Paseala is usually an extension: something extra you add once you\'ve finished another move.',
        role: 'both',
        kind: 'concept',
        sourceStart: 347.62,
        sourceVideo: 'EuT94T544Mg',
        verbatim:
          'So passe alla is very often an extension, something extra you can add when you already completed the move. You land in the leconal position, sometimes you might swap hands, sometimes you don\'t.',
        confidence: 'transcript',
      },
      {
        id: 'paseala-33',
        text: 'From the regular grip you don\'t have to swap hands at all — the hand is already there.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 365.18,
        sourceVideo: 'EuT94T544Mg',
        verbatim: 'We can start from regular grip if it\'s more handy… I don\'t have to swap hand it\'s already there',
        confidence: 'transcript',
      },
    ],
    notes: [
      {
        text:
          'Three entries are demonstrated rather than taught as separate moves: Enchufla mix (@316.28), Enchufla doble alarde Exhibela (@330.18), and starting from the regular grip with no hand swap at all (@365.18). Cues -30, -31 and -33 carry them.',
        sourceVideo: 'EuT94T544Mg',
        sourceStart: 310.02,
      },
      {
        text:
          'Counted alternate window, not cut: EuT94T544Mg 277.82 → 291.88 (14.1s), the exaggerated lead — the pull on 4 and 8, made visible. It is adjacent to the published clip (its out-point is the published in-point), so the two could be one 34.14s cut. Held back because the teachers disown it on camera: "Obviously we don\'t want you to dance like that but we want you to see where the signal happens" @287.12, and a learner looping it would copy the exaggeration. If a reviewer prefers length over purity, the honest single cut is 275.88 → 310.02 (34.1s), which starts on "We\'ll exaggerate this move now" so the clip explains its own first half. That decision needs a human (K12-d).',
        sourceVideo: 'EuT94T544Mg',
        sourceStart: 277.82,
      },
      {
        text:
          'Counted alternate window, not cut: EuT94T544Mg 401.82 → 428.02 (26.2s), two counted reps plus an Enchufla-mix entry from the second camera. Longer and cleaner than the published 18.1s clip; withheld only because the framing is unverified.',
        sourceVideo: 'EuT94T544Mg',
        sourceStart: 401.82,
      },
      {
        text:
          'Full-tempo alternate window, not cut: EuT94T544Mg 505.12 → 536.38 (31.3s), the front-camera music round. 58% count density — the teacher counts continuously and calls the entry ("Enchufla doble a large there one and Paseala" @516.74). There is no silent full-tempo Paseala anywhere in this class (K12-a).',
        sourceVideo: 'EuT94T544Mg',
        sourceStart: 505.12,
      },
      {
        text:
          'Second full-tempo alternate window, not cut: EuT94T544Mg 538.34 → 576.14 (37.8s), the side-view music round — two entries into Paseala (Enchufla mix @543.46, Enchufla doble alarde Exhibela @~560) with a grip swap called on camera. 43% counted.',
        sourceVideo: 'EuT94T544Mg',
        sourceStart: 538.34,
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 12,
        videoId: 'EuT94T544Mg',
        teachStart: 51.32,
        segmentIds: [
          'cc12-teach-paseala',
          'cc12-count-paseala',
          'cc12-teach-entries',
          'cc12-angle-paseala',
          'cc12-teach-resistance',
          'cc12-music-paseala',
          'cc12-music-paseala-side',
        ],
        clips: {
          slow: {
            src: '/clips/salsa/couples/paseala-slow.mp4',
            sourceVideo: 'EuT94T544Mg',
            start: 291.88,
            end: 310.02,
            aspect: '16/9',
            caveat:
              '18.1s, under the 23s reference floor, and one repetition only. It is the entire "fluently with count" demo in this class — the chapter is 104s but 86s of it is teaching entries (K12-b).',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/paseala-fast.mp4',
            sourceVideo: 'UsvPdXW4-O4',
            start: 0,
            end: 30.954,
            aspect: '9/16',
            caveat:
              'Whole official short, un-transcribed — no interior boundary could be anchored. Check for an intro title card before publishing. This is the move in the range whose fast grain most needs a human to look at it: there is no silent full-tempo Paseala anywhere in the class, so there is no transcript-anchored fallback that is any cleaner (K12-a).',
            confidence: 'transcript',
          },
        },
      },
    ],
    complete: true,
    flags: ['K12-a', 'K12-b', 'K12-d'],
  },

  // Class 13 — CocaCola. Highest cue count in the range, and the only class
  // whose review chapter teaches instead of calling (K13-e), which is why
  // `cc13-review-music` is in `segmentIds` at all. `cocacola-20` and `-24` are
  // the pair to keep: a specific lead and the general rule it instances.
  {
    id: 'cocacola',
    name: 'CocaCola',
    aliases: ['CocaCola', 'cocacola', 'Coca-Cola', 'Coca Cola', 'coca cola', 'Coca-Cola hop'],
    kind: 'step',
    summary:
      'A Dile que no abandoned halfway: she does a two-step progressive left turn on 6-7 and keeps travelling like Paseala, while he stays facing her with his arm around her the whole way.',
    footwork:
      'Starts from the Dile que no position in the regular hold — her left hand on his shoulder, the other hands joined in front. The Dile que no is not completed: just after halfway the action starts. Follower: step 5 is still forward on the left foot, then rotate fully to the left on 6 and 7 only — two steps, progressive, travelling as you turn — then keep going forward on the right, front, front, front, exactly as in Paseala. Leader: mostly steps on the spot; the one to watch is the left step back on 1, which is what pushes her forward. Ends with Guapea.',
    base: 'dile-que-no',
    composedOf: ['dile-que-no', 'guapea'],
    cues: [
      {
        id: 'cocacola-1',
        text: 'Starts from the Dile que no position again — but in the regular hold, not the arm resting hold.',
        role: 'both',
        kind: 'concept',
        sourceStart: 49.36,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'We start from Dile Cano position again, but this time it\'s not our resting hold. it\'s a regular position.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-2',
        text: 'Your left hand on his shoulder.',
        role: 'follower',
        kind: 'lead',
        sourceStart: 56.7,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'So with the left hand of the girl on my shoulder',
        confidence: 'transcript',
      },
      // Deliberately "the other two hands", not "your right and her left": the
      // transcript never says which, and inventing it would be a guess.
      {
        id: 'cocacola-3',
        text: 'The other two hands joined in front.',
        role: 'both',
        kind: 'lead',
        sourceStart: 59.62,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'second hand joined in front.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-4',
        text: 'Don\'t complete the Dile que no — just after halfway through, the action starts.',
        role: 'both',
        kind: 'concept',
        sourceStart: 64.08,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'We start with Dille Cano again, but we don\'t complete whole Dille Cano already halfway through or just after halfway through. We start our action.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-5',
        text: 'It ends with Guapea again.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 80.76,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'and it ends with Guapea again.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-6',
        text: 'Left turns are rare for the follower in Cuban salsa — right turns are far more common.',
        role: 'both',
        kind: 'context',
        sourceStart: 90.68,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'We don\'t do many left turns when we are dancing salsa. I would say right turn is a lot more common.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-7',
        beats: [6, 7],
        text: 'Turn left on 6 and 7 only — two steps for the whole turn.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 109.5,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'she\'ll rotate to the left on 6-7, only 6-7, so only two steps to complete the full turn.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-8',
        text: 'It\'s a progressive turn: travel forward and rotate left at the same time.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 115.74,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'It\'s also a progressive turn, so she travels forward and rotates to the left at the same time.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-9',
        beat: 5,
        text: 'Step 5 is still forward, on your left foot.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 126.1,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'Now step on 5 is still forward, this is Ola\'s left foot',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-10',
        beats: [6, 7],
        text: 'On 6 and 7 travel across to his left, still rotating.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 130.26,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'and on 6-7 she travels to my left and still keeps rotating.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-11',
        text: 'Out of the turn keep travelling forward on the right — front, front, front.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 149.6,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'She travels forward with her right, front, front, front, and she\'s finishing like Paseala',
        confidence: 'transcript',
      },
      // -12 and -13 are the two sentences that make this move learnable in a
      // minute for anyone who has done Class 12: what is the same as Paseala,
      // and what differs.
      {
        id: 'cocacola-12',
        text: 'The travel after the turn is exactly Paseala\'s: one length behind his back, one length in front of him.',
        role: 'both',
        kind: 'concept',
        sourceStart: 159.44,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'after the turn she keeps traveling forward exactly the same like Paseala. One length behind my back, one length in front of me.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-13',
        text: 'Unlike Paseala, you keep facing her the whole way through — she is never behind your back.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 168.12,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'Now the difference again comparing to Paseala is that I keep facing her. So during the turn I keep rotating and keep facing my partner.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-14',
        text: 'Your steps are simple — mostly on the spot.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 190.66,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'From our point of view steps are relatively simple because we are mainly stepping on the spot.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-15',
        beat: 1,
        text: 'The one step to watch: left, back, on 1.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 211,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'So this left back on one, give you extra momentum to push her forward',
        confidence: 'transcript',
      },
      // -16 and -17 are one sentence, split by role 3.78s apart. The clearest
      // demonstration in the spec of why `sourceStart` has to be word-level:
      // a sentence-level timestamp would put both cues in the same place and
      // lose which half belongs to whom.
      {
        id: 'cocacola-16',
        beat: 1,
        text: 'As you step back, your arm goes forward at the same moment — that is the push.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 215.7,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'and when I step back my arm goes forward at the same time and then this gives a push to the girl to carry on forward with her right foot on one.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-17',
        beat: 1,
        text: 'That push carries you forward onto your right foot on 1.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 219.48,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'and then this gives a push to the girl to carry on forward with her right foot on one.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-18',
        text: 'Your right arm surrounds her the whole time. There is never a moment you let her go.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 228.76,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'right hand from my perspective is surrounding Ola all the time. Very important. Very important. So there is no moment that I would let her go.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-19',
        text: 'The arm around her is the safety net — if she loses balance at any point, it is already there.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 247.74,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'What we need is the arm around her. So if she\'s losing balance at any point, my arm is there to help.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-20',
        beats: [6, 7],
        text: 'The turning hand goes up on 6 and 7 and stays above her head. It is not a mix.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 271.66,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'The turning hand, it goes up on six seven, it stays above her head and it\'s not mixing.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-21',
        text: 'It is only the signal to start the turn: a very small circle above her head, then she rotates.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 278.94,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'I just give signal for initiation for turn. One, two, three, hop, it stays above her head, does very very small circle and then she rotates.',
        confidence: 'transcript',
      },
      // `both` even though the verbatim names both roles: a statement about the
      // division of labour is the same fact for both partners, and there is no
      // role-dependent possessive in the text.
      {
        id: 'cocacola-22',
        text: 'She does most of the work in the turn and keeps her own balance — you only initiate it.',
        role: 'both',
        kind: 'concept',
        sourceStart: 290.06,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'So she\'s doing the most of the job during the turn. She\'s keeping her own balance. I just initiated',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-23',
        text: 'Don\'t lift it high — just above her head.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 301.48,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'I make like tiny smooth circle above her head, just above her head, so I don\'t lift it high as well.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-24',
        text: 'The general rule for turns: lift the arm higher than her head. That\'s all it takes.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 303.98,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'The rule for turns is in general to lift arm higher than her head and that\'s it.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-25',
        text: 'Her left arm gets trapped if she does nothing with it during the turn.',
        role: 'follower',
        kind: 'concept',
        sourceStart: 308.54,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'The last thing is the left arm for the girl. What is happening with it when she\'s turning? Because if you do nothing with it, it will get trapped.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-26',
        beat: 1,
        text: 'Get it out on 1.',
        role: 'follower',
        kind: 'lead',
        sourceStart: 317.66,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'you have to get it out and we are getting it out on one',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-27',
        beat: 1,
        text: 'While you turn, the left hand travels across your chest; on 1 it comes out and onto his shoulder.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 332.6,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'So while I turn my left hand is going just across on my chest and then on one I\'m ready to just take it out so that I can put it on the on Michal\'s shoulder.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-28',
        text: 'Start the movement with your fingers and palm — that\'s what keeps your elbow out of his face.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 344.44,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'she\'s starting the movement with her fingers, with her palm. Thanks to that she will not hit me with her elbow. If she did, my face is there.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-29',
        text: 'The fingers guide the rest of the arm.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 356.98,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'So fingers are giving the guidance for the rest of the arm.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-30',
        text: 'Entry rule, same as before: anything that finishes with Dile que no leads into CocaCola — Sombrero, for instance.',
        role: 'both',
        kind: 'context',
        sourceStart: 373.14,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'Rules exactly the same as previously about entering the coca-cola so it\'s enough that we will finish with dilekano. So for example sombrero',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-31',
        text: 'It\'s an addition to everything you already know: finish with Dile que no, and Dile que no is CocaCola\'s first part.',
        role: 'both',
        kind: 'concept',
        sourceStart: 392.3,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'it is an addition to everything else what we\'ve done before. We finish with dilekano and dilekano is the first part of',
        confidence: 'transcript',
      },
      // -32…-34 are the second teacher (the follower), from the 84 seconds of
      // real teaching hiding inside the "side view" chapter (K13-b).
      {
        id: 'cocacola-32',
        text: 'Aim to end the turn facing him. Progressive doesn\'t mean big.',
        role: 'follower',
        kind: 'concept',
        sourceStart: 432.48,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'just for the balance for the girl while we\'re turning think about facing the guy at the end of that turn even though it\'s a progressive turn don\'t make it too big',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-33',
        text: 'After that first travelling step the rest are mostly on the spot.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 446.8,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'so if we go one two three now you\'re taking this step but then the other steps are mostly on the spot so it\'s five six and now think about facing the guy again',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-34',
        text: 'Don\'t think about walking forward — think about walking round a semicircle.',
        role: 'follower',
        kind: 'concept',
        sourceStart: 454.9,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'Don\'t think about walking to the front or that way. Think about going in semicircle. Think about walking over semicircle.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-35',
        text: 'In Cuban salsa you are always dancing around each other in a circle — turns are made that way too.',
        role: 'both',
        kind: 'concept',
        sourceStart: 477.84,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'So probably you\'ve noticed that it is a rule that when it comes to learning Cuban salsa that we are dancing around each other in a circle and you have to get used to making turns in this way as well.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-36',
        text: 'Sombrero is the same idea — her semicircle in front of you — but the opposite way round, and much slower. This one is a spin: two steps.',
        role: 'both',
        kind: 'concept',
        sourceStart: 492.52,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'So even when we did sombrero it\'s kind of similar, she\'s kind of doing a semicircle in front of me and this one it goes just opposite direction. Sombrero is obviously a lot slower turn, this is really a spin so just two steps for turn',
        confidence: 'transcript',
      },
      // -37…-41 come from the review chapter, which teaches rather than calls
      // (K13-e). They are ordered by sourceStart, so `-39` (615.61) precedes
      // `-37` (619.81) — the spec numbers them the other way round.
      {
        id: 'cocacola-39',
        text: 'Chained without stopping, the moves give one continuous movement.',
        role: 'both',
        kind: 'concept',
        sourceStart: 615.61,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'So without stopping we have very nice continuous movement.',
        confidence: 'transcript',
      },
      // -37 and -38 are general leading advice, not CocaCola instruction. They
      // live here because the model has no class-level cues and `guapea` is out
      // of this fragment's range (GC-e). Whoever owns `guapea` should move
      // them there, sourced from this class — not delete them (K13-f).
      {
        id: 'cocacola-37',
        text: 'Don\'t be afraid of Guapea — it\'s a normal step like any other. Use it while you decide what\'s next.',
        role: 'both',
        kind: 'concept',
        sourceStart: 619.81,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'we can do Guapea once for a while. In general don\'t be afraid of Guapea. It\'s a normal step as every other.',
        confidence: 'transcript',
        flag: 'K13-f',
      },
      {
        id: 'cocacola-38',
        text: 'Stuck for what comes next? Start lifting your left arm for a turn — she\'ll do the rest of the job and it buys you time to choose.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 629.83,
        sourceVideo: 'GT7PTpvni_A',
        verbatim:
          'So very good habit is to start lifting your left arm up just for the turn… sometimes arm up, the girl will do the rest of the job. It will give you time for picking.',
        confidence: 'transcript',
        flag: 'K13-f',
      },
      {
        id: 'cocacola-40',
        text: 'Setenta is an ideal lead-in: it finishes in exactly the right position for CocaCola.',
        role: 'both',
        kind: 'context',
        sourceStart: 662.61,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'Setenta is very nice to continue with Coca-Cola because it finishes it with perfect position.',
        confidence: 'transcript',
      },
      {
        id: 'cocacola-41',
        text: 'Vacilala por la mano is another perfect start for CocaCola.',
        role: 'both',
        kind: 'context',
        sourceStart: 674.67,
        sourceVideo: 'GT7PTpvni_A',
        verbatim: 'And Basila la por la mano. … Again, perfect start for Coca-Cola.',
        confidence: 'transcript',
      },
    ],
    notes: [
      {
        text:
          'Entry rule: anything that finishes with Dile que no can lead into CocaCola. Demonstrated from Sombrero (@381.08), Enchufla mix (@522.72) and El uno (@534.76).',
        sourceVideo: 'GT7PTpvni_A',
        sourceStart: 373.14,
      },
      {
        text:
          'The review chapter demonstrates five combinations ending in CocaCola and names two as ideal: Setenta and Vacilala por la mano. Cues -40 and -41 carry them.',
        sourceVideo: 'GT7PTpvni_A',
        sourceStart: 589.57,
      },
      {
        text:
          'Counted alternate window, not cut: GT7PTpvni_A 398.16 → 426.04 (27.9s), two reps from the second camera, the second entered from Enchufla (@~412). Uninterrupted, unlike the published clip, and only 3s shorter — the strongest reason to prefer it is that nothing is spoken across the middle. Held back because the chapter is titled "side view" while the teachers say "let\'s do it opposite direction" @398.16, the same ambiguity as K10-f, so nobody has confirmed which camera it actually is.',
        sourceVideo: 'GT7PTpvni_A',
        sourceStart: 398.16,
      },
      {
        text:
          'Counted alternate window, not cut: GT7PTpvni_A 465.34 → 477.84 (12.5s), "We\'ll do it again just for feet" → "So probably you\'ve noticed". Far too short to publish, but it is the only feet-only framing of the follower\'s two-step turn ("Five, six, seven, one, two, three, five. Twist, twist forward"). Worth watching once if the turn will not come out.',
        sourceVideo: 'GT7PTpvni_A',
        sourceStart: 465.34,
      },
      {
        text:
          'Full-tempo alternate window, not cut: GT7PTpvni_A 557.14 → 582.43 (25.3s), the side-view music round — 25% count density, the cleanest full-tempo window in the class, two Enchufla-mix→CocaCola runs. It stops at 582.43 rather than at the 585.0 chapter boundary so it does not open the review (K13-d). The teacher still calls the entries over the music ("and Enchufla mix, seven and one, Coca-Cola boom") and the last ~2s is rhythm vocalisation.',
        sourceVideo: 'GT7PTpvni_A',
        sourceStart: 557.14,
      },
      {
        text:
          'Second full-tempo alternate window, not cut: GT7PTpvni_A 512.02 → 555.18 (43.2s), the front-camera music round. 62% count density (GC-c), the highest in the range — the teacher counts almost continuously and names three entries (Enchufla mix @522.72, a combination @534.76, El uno). Prefer the side-view window above unless its framing turns out to be wrong (K13-c).',
        sourceVideo: 'GT7PTpvni_A',
        sourceStart: 512.02,
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 13,
        videoId: 'GT7PTpvni_A',
        teachStart: 49.36,
        segmentIds: [
          'cc13-teach-cocacola',
          'cc13-count-cocacola',
          'cc13-angle-cocacola',
          'cc13-teach-balance',
          'cc13-music-cocacola',
          'cc13-music-cocacola-side',
          // The only review chapter in the range that is a teaching source: it
          // demonstrates named combinations rather than calling moves (K13-e).
          'cc13-review-music',
        ],
        clips: {
          slow: {
            src: '/clips/salsa/couples/cocacola-slow.mp4',
            sourceVideo: 'GT7PTpvni_A',
            start: 360.7,
            end: 391.58,
            aspect: '16/9',
            caveat:
              'Seven seconds in the middle (373.14–380.28) are spoken, not danced — the entry rule ("so it\'s enough that we will finish with dilekano"). The second rep is entered from Sombrero rather than from the closed position.',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/cocacola-fast.mp4',
            sourceVideo: '7MODqLfyTQQ',
            start: 0,
            end: 23.794,
            aspect: '9/16',
            caveat:
              'Whole official short, un-transcribed — no interior boundary could be anchored. Check for an intro title card before publishing. At 23.8s this is the shortest short in the range.',
            confidence: 'transcript',
          },
        },
      },
    ],
    complete: true,
    flags: ['K13-a', 'K13-b', 'K13-f'],
  },

  // Class 14 — Vacilala. Modelled separately from `vacilala-los-dos` because
  // the chapters are: 3+4 Vacilala, 5 los dos, 6–8 explicitly joint ("Vacilala
  // y Vacilala los dos"), which is why four segments appear in both moves'
  // `segmentIds`. The name never once appears in the transcript (GC-a).
  {
    id: 'vacilala',
    name: 'Vacilala',
    aliases: [
      'Vacilala',
      'Basila La',
      'Basila la',
      'Basilala',
      'Basilela',
      'Basile',
      'Basi la la',
      'basi la la',
      'Vasila la',
      'Vasila',
      'Basila',
      'Basilola',
    ],
    kind: 'step',
    summary:
      'Vacilala por la mano with the guiding hand taken away: pull her into the right turn, release on 3, step back to make room, and let her finish the turn on her own.',
    footwork:
      'Starts in Guapea. Leader: pull before 1 as usual — 1, 2, and release on 3 — then step back, back, forward over the following 5-6-7 to create her space. Follower: the feet are exactly Vacilala por la mano\'s — front, front, opposite/outside, then carry on front and in towards his right foot — the only change is that from 3 onwards nobody is steering. Her arms come up on 3, in a circular motion from the open position, held round with the palms facing the ceiling; on 1 she looks at him and rotates them in, left hand to his shoulder, right hand down. Ends with Dile que no.',
    base: 'guapea',
    composedOf: ['guapea', 'dile-que-no'],
    cues: [
      {
        id: 'vacilala-1',
        text: 'Start in Guapea.',
        role: 'both',
        kind: 'concept',
        sourceStart: 38.58,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'This time we are in Guapea position.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-2',
        text: 'The difference from Vacilala por la mano is the hand — "mano".',
        role: 'both',
        kind: 'context',
        sourceStart: 60.64,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'So what\'s the difference between Basila La and Basila La Por La Mano? … Obviously Mano, so hand.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-3',
        text: 'In por la mano you guide her through the whole move. Here you only initiate the turn and let it go.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 79.24,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'During Basila La Por La Mano, I\'m guiding you through whole move. In here with Basilela we\'ll just initiate the turn and we\'ll let it go.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-4',
        text: 'Don\'t guide it all the way round: pull at the beginning, then release.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 109.24,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'the lead is changing because I don\'t guide it all the way around, but I pull at the beginning and then I release.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-5',
        beat: 1,
        text: 'Pull before 1, as usual.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 118.08,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'I\'m pulling before one as usual, so we have one, two,',
        confidence: 'transcript',
      },
      // -6 and -7 are one sentence, 2.16s apart. The release and the unguided
      // turn are the same event seen from two sides, and they are not one
      // instruction (R4).
      {
        id: 'vacilala-6',
        beat: 3,
        text: 'Release on 3.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 122.56,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'on three I release, zoom, and Ola continues turn by herself.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-7',
        beat: 3,
        text: 'From 3 you finish the turn by yourself.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 124.72,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'on three I release, zoom, and Ola continues turn by herself.',
        confidence: 'transcript',
      },
      // The only `both` drillable cue in the class, and legal: no possessive
      // limb reference that differs by role.
      {
        id: 'vacilala-8',
        text: 'Finish with Dile que no.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 127.1,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'And then we finish with the Le Canol.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-9',
        text: 'In por la mano all six of your steps were stationary. Not any more.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 131.9,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'in Basile, La Porte, La Mano, all six steps from that point of view were stationary. We were not going anywhere.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-10',
        beats: [5, 6, 7],
        text: 'After the release: step back, back, forward.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 143.42,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'Now we have to go five, six, seven, and one, two, release, step back, back and forward.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-11',
        text: 'Go back a bit or she\'ll slap you in the face. Making her space is your job.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 145.7,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'I have to go a bit back, otherwise I might suffer. She might slap me in the face. … but I am responsible for that. I have to create her space.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-12',
        beats: [5, 6, 7],
        text: 'One small step back on 5-6-7 is all the space she needs.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 157.62,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'So I\'m creating space by making this small step back on five six seven',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-13',
        text: 'Your feet are the same as in Vacilala por la mano: front, front, opposite/outside, then in towards his right leg.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 172.7,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'Ola is doing steps the same as in Basilola por la mano so front front opposite outside and towards my right leg',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-14',
        text: 'Front, front, opposite — he lets go there — then carry on front and in to his right foot.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 183.02,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'five six seven she goes front front and opposite this is the moment when I release then she goes yeah carry on front and towards my right foot',
        confidence: 'transcript',
      },
      // -15…-25 and -27 are the follower's own explanation of her arms. Whisper
      // has no diarisation, so the speaker is inferred from the limbs being
      // described, not from the data — one listen to 195–295 confirms or breaks
      // all eleven at once (K14-g). They stay at 'transcript', which is exactly
      // what that value means.
      {
        id: 'vacilala-15',
        text: 'Once he lets go, your arms are yours to control.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 195.58,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'another thing she has to control her arms',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-16',
        beat: 3,
        text: 'Arms up on 3.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 205.52,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'controlling arms means we put them up on three',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-17',
        beat: 3,
        text: 'Not earlier — you\'ll hit him, and he hasn\'t released yet.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 208.2,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'if we put them up earlier we can hit the guy and also he doesn\'t release it\'s even a bit tiny later than three',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-18',
        beat: 3,
        text: 'He releases around 3 — that\'s the moment you start opening.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 213.72,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'because around three I release it and this is the moment when she can start opening arms.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-19',
        beat: 3,
        text: 'It cannot be later than 3.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 219.38,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'But it cannot be later than three so we\'re going one two three',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-20',
        text: 'As soon as he releases your hand, bring your hands up.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 224.66,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'as soon as the guy releases your hand for your hands to come up',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-21',
        text: 'Don\'t lift them while you\'re already turning — you\'ll elbow your partner.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 227.76,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'because if you start putting your hands up as you\'re turning you can elbow your partner',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-22',
        beats: [1, 2, 3],
        text: 'One, two, up — while you\'re still facing him.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 233.76,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'so that\'s why we\'re going one two up so while you\'re still looking at the at your partner and you\'re facing him hands up and then just five six seven',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-23',
        text: 'Hold it like an ancient column: elbows rounded, a round shape on top, palms up to the ceiling.',
        role: 'follower',
        kind: 'styling',
        sourceStart: 245.52,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'I always compare it to ancient Greek monuments so elbows quite like a column a bit. Like you\'re holding something. Body is a column and then on top of the column there is always like this more rounder part so her arms are creating like a round shape and palms are facing the ceiling.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-24',
        beat: 1,
        text: 'On 1 do the look and rotate the arms in — left hand to his shoulder, right hand down.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 264.78,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'And then on one one I do the look and I actually rotate them in so that I can put left hand on the shoulder and right hand just goes down.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-25',
        text: 'Take your time with it — there\'s no rhythmical moment to hit here.',
        role: 'follower',
        kind: 'styling',
        sourceStart: 285.3,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'you can take your time. You don\'t have to hit any rhythmical moments in here. You can take your time and develop this movement as smooth as you feel.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-26',
        text: 'The moment she opens her arms is the moment you release her arm out to the side for the turn.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 322.62,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'When Ola opens arms, it\'s the moment when I release her arm to the side for the turn. So I open, I release her arm and then she carries on with arms up',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-27',
        text: 'Carry the arms up in a circular motion from the open position — not straight across.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 330.78,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'and then she carries on with arms up in a circular motion, not this way. That will look strange.',
        confidence: 'transcript',
      },
      // -28 comes from the body-movement digression inside the "with music"
      // chapter, and -29…-31 from the 35 seconds of release-and-catch teaching
      // that the same chapter title hides (K14-b).
      {
        id: 'vacilala-28',
        text: 'The bar where you step back is free — activate your body, shoulders, ribcage.',
        role: 'leader',
        kind: 'musicality',
        sourceStart: 446.98,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'One, and I step back. You can activate your body, but shake. Move your shoulders, move your ribcage.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-29',
        text: 'Getting back in sync for the Dile que no is the other useful thing this trains.',
        role: 'both',
        kind: 'concept',
        sourceStart: 478.98,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'Dilek and on. So the synchronizing for Dilek and on, it\'s another very, very useful element.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-30',
        text: 'This is the basic way to release your partner mid-dance and get her back.',
        role: 'both',
        kind: 'concept',
        sourceStart: 484.38,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'When we teach you how to release your partner while dancing, and how to get back. The basic way is to do it with Basila.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-31',
        text: 'Release her, dance something on your own, catch her back. Take the middle out and it\'s just Vacilala.',
        role: 'both',
        kind: 'concept',
        sourceStart: 492.86,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'So I can release her. Two, two, five, six, seven, dance something by myself. Five, seven and then catch her back. But if we take away this middle part, it\'s just Basila.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-32',
        text: 'Vacilala por la mano, Vacilala and Sombrero are the same work for the follower; only small differences for the leader.',
        role: 'both',
        kind: 'context',
        sourceStart: 580.12,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'Basilala por la mano. Basilala. Sombrero. The same work from girl point of view. From guy perspective, small differences, but small',
        confidence: 'transcript',
      },
      // -33 and -34 are the only place in the class that says what the move is
      // *for*, and they sit inside a chapter the vocabulary says to discard
      // (K14-d) — hence the `cc14-outro-why` split.
      {
        id: 'vacilala-33',
        text: 'It looks useless at first — you release, she turns, nothing happens. It becomes a very powerful move once you\'ve danced a while.',
        role: 'both',
        kind: 'context',
        sourceStart: 629.86,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'At this point it might seem like, oh this Basila is a kind of useless movement, I just release the girl, she turns, nothing happens, it\'s not so funky. You start appreciating it when you learn how to dance for a bit longer and you will see that this is very very powerful move',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-34',
        text: 'This is the move that lets you give your partner space while you dance.',
        role: 'both',
        kind: 'context',
        sourceStart: 649.6,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'it will allow you to let your partner go, give her a bit of space while dancing.',
        confidence: 'transcript',
      },
    ],
    notes: [
      {
        text:
          'The class opens by reviewing Vacilala por la mano (47.12–60.64) and defines Vacilala against it. That review is a review, not a teaching source for por la mano (steps spec G3).',
        sourceVideo: 'jBaHuGXoWBY',
        sourceStart: 46.26,
      },
      {
        text:
          'Vacilala por la mano, Vacilala and Sombrero are the same work from the follower\'s side, with only small differences for the leader — demonstrated back to back at 580.12–592.22. Cue -32 carries it.',
        sourceVideo: 'jBaHuGXoWBY',
        sourceStart: 580.12,
      },
      {
        text:
          'Counted alternate window, not cut: jBaHuGXoWBY 295.52 → 319.22 (23.7s) — the published window opened 3.7s earlier, at "We\'ll do that from Guapea", so the clip announces its own starting position and clears the 23s reference floor. Held back only because those 3.7s are speech before any dancing. If the missing starting position matters more than the silence, publish this instead.',
        sourceVideo: 'jBaHuGXoWBY',
        sourceStart: 295.52,
      },
      {
        text:
          'Counted alternate window, not cut: jBaHuGXoWBY 348.68 → 360.12 (11.4s), one rep filmed straight after "girls pay attention how arms are moving from open position in a circular way up" — the only rep shot for the arms. Too short to publish; watch it beside cues -20…-27.',
        sourceVideo: 'jBaHuGXoWBY',
        sourceStart: 348.68,
      },
      {
        text:
          'Full-tempo alternate window, not cut: jBaHuGXoWBY 516.52 → 544.38 (27.9s), second camera, continuous, holding one Vacilala rep (516.52–524.46) and two Vacilala los dos reps (525.04–533.72, 535.46–537.86). This is the honest fallback if the official short turns out to show only one of the two moves (K14-j). Not silent: the teacher calls and vocalises the rhythm throughout ("hop, king king open, king king, hop") and the last ~6s is vocalisation only.',
        sourceVideo: 'jBaHuGXoWBY',
        sourceStart: 516.52,
      },
      {
        text:
          'Second full-tempo alternate window, not cut: jBaHuGXoWBY 461.88 → 478.98 (17.1s), front camera, one rep of each move back to back. Shorter than the side-view window but the better framing of the two.',
        sourceVideo: 'jBaHuGXoWBY',
        sourceStart: 461.88,
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 14,
        // 38.58, not the chapter's 39.0: the boundary falls between "This" and
        // "time", and a deep link should not open mid-word (K14-h).
        videoId: 'jBaHuGXoWBY',
        teachStart: 38.58,
        segmentIds: [
          'cc14-teach-vacilala',
          'cc14-count-vacilala',
          'cc14-music-both',
          'cc14-teach-release',
          'cc14-music-both-side',
          'cc14-review-music',
          'cc14-outro-why',
        ],
        clips: {
          slow: {
            src: '/clips/salsa/couples/vacilala-slow.mp4',
            sourceVideo: 'jBaHuGXoWBY',
            start: 299.2,
            end: 319.22,
            aspect: '16/9',
            label: 'Three counted reps, no speech between them — the cleanest counted window in classes 8–14.',
            caveat:
              'The count degrades into rhythm vocalisation after the first rep ("king king hop and D leg and hop") — normal for this channel, and the beats are still audible. Starts 0.8s before the chapter boundary.',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/vacilala-fast.mp4',
            sourceVideo: 'c0H4GQnYjNE',
            start: 0,
            end: 22.634,
            aspect: '9/16',
            caveat:
              'Whole official short, un-transcribed — no interior boundary could be anchored. Check for an intro title card before publishing. One short for a class that teaches two moves: which of Vacilala and Vacilala los dos it shows is unknown until someone watches it. The same file is referenced from vacilala-los-dos (K14-j).',
            confidence: 'transcript',
            // No `shared` here even though §14.3 asks for it on both moves: the
            // manifest is authoritative for that column and it marks only the
            // borrower, which is `vacilala-los-dos`. Same convention as the
            // Class 8 and Class 10 shorts, whose owners are also unmarked.
          },
        },
      },
    ],
    complete: true,
    flags: ['K14-a', 'K14-b', 'K14-d', 'K14-e', 'K14-g'],
  },

  // Class 14 — Vacilala los dos. Five cues, and the shortest of them is the
  // point of the whole variation: lead first, then turn yourself.
  {
    id: 'vacilala-los-dos',
    // Chapter-title and description form, lower-case "los dos". The video title
    // writes "Vacilala Los Dos"; R1 takes the description spelling and the
    // title's capitalisation goes in aliases.
    name: 'Vacilala los dos',
    aliases: [
      'Vacilala los dos',
      'Vacilala Los Dos',
      'Basila La Los Dos',
      'Basila, Los dos',
      'Basila la, los dos',
      'basi la la los dos',
      'Vasila la, lo dos',
      'Vasila la lo dos',
      'Basila Los Dos',
    ],
    kind: 'step',
    summary:
      'Vacilala where both of you turn: she rotates right as usual, and instead of stepping back you step left and do a basic left turn.',
    footwork:
      'Identical to Vacilala for the follower. Leader: instead of the three steps back that make her space, go to the left and do a basic left turn out of Guapea. Lead first, then turn — that is the whole of the difference.',
    base: 'vacilala',
    // `left-turn-side` rather than `left-turn-front-back` because the turn comes
    // out of Guapea, a side basic, and the teacher's own pointer ("class number
    // one or number two of our beginners step scores" @397.22) resolves to
    // steps Class 2. Imprecise on his side, inferred on ours — K14-f. Anyone
    // watching 374–420 can settle it in ten seconds; it is one string.
    composedOf: ['vacilala', 'left-turn-side'],
    cues: [
      {
        id: 'vacilala-los-dos-1',
        text: 'Both of you turn: she rotates right, you do a basic left turn out of Guapea.',
        role: 'both',
        kind: 'concept',
        sourceStart: 365.42,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'and this is the move which includes turns for both of us so when she is rotating to the right I will do basic left turn from Guapea',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-los-dos-2',
        text: 'Instead of the three steps back that make her space, go to the left and do a basic left turn.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 385.72,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'So the difference is that instead of doing this three steps back like I told you to create space for the girl I go to the left and I do basic left turn.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-los-dos-3',
        text: 'The basic left turn is beginners steps class 1 or 2 — go back to it if you need it.',
        role: 'leader',
        kind: 'context',
        sourceStart: 394.1,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim:
          'Basic left turn if you don\'t know it again cards this is like class number one or number two of our beginners step scores.',
        confidence: 'transcript',
      },
      // The highest-value cue in the class and the shortest. It carries no beat
      // on purpose: the teachers give an ordering, not a count, and inventing a
      // beat would be a guess.
      {
        id: 'vacilala-los-dos-4',
        text: 'Lead first, then turn yourself. That is the whole thing.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 424.06,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'is that I first lead, then turn myself. So the most important is to lead first, then you go.',
        confidence: 'transcript',
      },
      {
        id: 'vacilala-los-dos-5',
        text: 'It is a great initiation for CocaCola — do it, then carry on with Vacilala.',
        role: 'both',
        kind: 'context',
        sourceStart: 546.8,
        sourceVideo: 'jBaHuGXoWBY',
        verbatim: 'Vasila la, lo dos is obviously great initiation for Coca-Cola. So we do it. And then continue with Vasila.',
        confidence: 'transcript',
      },
    ],
    notes: [
      {
        text:
          'The follower\'s part is unchanged from Vacilala. Stated only by omission — "the difference is that instead of doing this three steps back … I go to the left" — so it is recorded here rather than shipped as a cue.',
        sourceVideo: 'jBaHuGXoWBY',
        sourceStart: 385.72,
      },
      {
        text:
          'Counted alternate window, not cut: jBaHuGXoWBY 412.30 → 420.54 (8.2s), the second rep. Shorter than the published clip; listed because it is the only other counted rep that exists.',
        sourceVideo: 'jBaHuGXoWBY',
        sourceStart: 412.3,
      },
      {
        text:
          'Counted alternate window, not cut: jBaHuGXoWBY 374.18 → 420.54 (46.4s), both reps in one window. Rejected because 26.6 of those 46 seconds are speech (385.72 → 412.30, the left-turn explanation and the two card pointers). Kept on record because a reviewer may prefer one long clip with a caveat to an 11s loop — that is a judgement call and it belongs to a human.',
        sourceVideo: 'jBaHuGXoWBY',
        sourceStart: 374.18,
      },
      {
        text:
          'Full-tempo alternate window, not cut: jBaHuGXoWBY 516.52 → 544.38 (27.9s), shared with vacilala. This window is the better fit of the two moves for los dos: it holds two los dos reps and only one Vacilala rep. If the official short turns out to show Vacilala only, publish this instead (K14-j). Not silent — the teacher calls over the whole window.',
        sourceVideo: 'jBaHuGXoWBY',
        sourceStart: 516.52,
      },
      {
        text:
          'Second full-tempo alternate window, not cut: jBaHuGXoWBY 468.00 → 477.26 (9.3s), one los dos rep at tempo from the front camera, isolated. Too short to publish alone.',
        sourceVideo: 'jBaHuGXoWBY',
        sourceStart: 468,
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 14,
        videoId: 'jBaHuGXoWBY',
        teachStart: 362.9,
        segmentIds: [
          'cc14-teach-los-dos',
          'cc14-music-both',
          'cc14-teach-release',
          'cc14-music-both-side',
          'cc14-review-music',
        ],
        clips: {
          slow: {
            src: '/clips/salsa/couples/vacilala-los-dos-slow.mp4',
            sourceVideo: 'jBaHuGXoWBY',
            start: 374.18,
            end: 385.72,
            aspect: '16/9',
            caveat:
              '11.5s — well under the 20s floor. It is the only complete counted rep of this move in the class: Vacilala los dos has no count chapter (K14-c). The teacher names the move over it ("Basila, Los dos") and the count is part rhythm vocalisation ("D leg"). Do not synthesise a longer clip by splicing.',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/vacilala-fast.mp4',
            sourceVideo: 'c0H4GQnYjNE',
            start: 0,
            end: 22.634,
            aspect: '9/16',
            caveat:
              'Whole official short, un-transcribed — no interior boundary could be anchored. Check for an intro title card before publishing. One short for a class that teaches two moves: which of Vacilala and Vacilala los dos it shows is unknown until someone watches it. The same file is referenced from vacilala (K14-j).',
            confidence: 'transcript',
            shared: true,
          },
        },
      },
    ],
    complete: true,
    flags: ['K14-b', 'K14-c', 'K14-f'],
  },
]

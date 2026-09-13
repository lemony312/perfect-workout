// Couples course, classes 1–7 — the foundations: the hold, al centro / arriba /
// abajo, la chica / el chico / los dos, Dile que no, Guapea, Enchufla, El Uno,
// Kentucky, Vacilala por la mano.
//
// Source of every number: SALSA_COUPLES_SPEC_PART1.md.
//
// This is the hardest range in the course to clip, and the reason is worth
// stating here rather than only in the spec: classes 1–4 have **neither an
// official short nor a `count` chapter**, so both grains have to be cut from the
// class video, and the counted demo has to be found inside a `teach` block. Any
// clip in that range that reads as tidy should be treated as suspicious.
//
// Four things learned while populating this that are not obvious from the spec:
//
//   1. `src` filenames come from CLIP_MANIFEST_COUPLES.md, never from a move id.
//      The spec's K4-m worried that couples Enchufla clips would overwrite the
//      steps ones and proposed `enchufla-couples-*.mp4`; the cutter solved it a
//      different way, by putting every couples clip under
//      `/clips/salsa/couples/` while the steps clips live under
//      `/clips/salsa/moves/`. The published files really are `enchufla-slow.mp4`
//      and `enchufla-fast.mp4` — in the couples directory.
//   2. The three official shorts (`qwR89NAQgqM`, `V57F7c5R5jY`, `18cM9UvzsoI`)
//      contain no speech at all, only a music bed, so **no cue is ever sourced
//      from one**. Their windows are whole-file, and the end value is the
//      container duration the cutter used (31.414 / 40.534 / 32.174), which is
//      a few hundredths longer than the ffprobe *stream* duration quoted in the
//      spec's shorts table.
//   3. Cue ids run in one sequence per move across the whole course, not per
//      class: `la-chica-12..21` here is Class 6 continuing Class 2's
//      `la-chica-1..11` (spec K6-f), and `enchufla-8..22` continues the steps
//      course's `enchufla-1..7`.
//   4. `ClipPair.alternates` is deliberately never used. The cutter encodes only
//      the published window, so an alternate would need a `src` pointing at a
//      file that does not exist — and `src: ''` resolves against basePath to the
//      page URL, so the UI would offer a player for nothing. Every rejected
//      window from the spec's "Alternates" tables is recorded as a `notes` entry
//      on the move instead, carrying the video id, the exact window and why it
//      was held back. All three couples fragments do this the same way.

import type { SalsaClass, SalsaMove } from '../salsa-types'

export const CLASSES_01_07: SalsaClass[] = [
  // Class 1 — Al centro, arriba, abajo. 13 chapters, all kept, plus two `count`
  // windows found inside `teach` blocks because the class has no count chapter.
  {
    course: 'couples',
    number: 1,
    title: 'Cuban Salsa for Beginners - Class 1 (Al centro, arriba, abajo)',
    videoId: 'MDEAN40DUVY',
    duration: 825,
    chaptered: true,
    teaches: ['al-centro', 'arriba', 'abajo'],
    segments: [
      {
        id: 'cc1-intro',
        start: 0.0,
        end: 18.0,
        role: 'skip',
        label: 'Intro',
        moves: [],
        provenance: 'chapter title "Intro"',
        confidence: 'transcript',
      },
      {
        id: 'cc1-about-class',
        start: 18.0,
        end: 52.0,
        role: 'skip',
        label: 'About this class',
        moves: [],
        provenance: 'chapter title "About this class"',
        confidence: 'transcript',
      },
      {
        id: 'cc1-about-guide',
        start: 52.0,
        end: 270.44,
        role: 'skip',
        label: 'About the "Salsa beginners guide"',
        moves: [],
        provenance:
          'chapter title; end moved from the chapter\'s 271.0 to the first word of the next sentence, "First," @270.44',
        confidence: 'transcript',
      },
      {
        id: 'cc1-teach-frame',
        start: 270.44,
        end: 290.40,
        role: 'teach',
        label: 'How to hold your partner (close position)',
        moves: ['al-centro', 'arriba', 'abajo'],
        provenance:
          'chapter "How to hold your partner? (Close position)"; "First, how to hold your partner." @270.44',
        confidence: 'transcript',
      },
      {
        id: 'cc1-teach-al-centro-back',
        start: 290.40,
        end: 339.00,
        role: 'teach',
        label: 'Al centro, side basic in close position — back camera',
        moves: ['al-centro'],
        provenance:
          'chapter "Al centro, basic step in close position - Back camera"; "in this / position we start our basic step to the side" @290.34–290.52. Analysis says `angle` — normalised to `teach`: it opens with the footwork instruction "guys are starting with the left foot" @295.58',
        confidence: 'transcript',
      },
      {
        id: 'cc1-count-al-centro',
        start: 299.54,
        end: 327.32,
        role: 'count',
        label: 'Al centro, counted — back camera',
        moves: ['al-centro'],
        provenance:
          'nested in `cc1-teach-al-centro-back`; "five six seven and cheeky cheeky open" @299.54, no music',
        nestedIn: 'cc1-teach-al-centro-back',
        confidence: 'transcript',
      },
      {
        id: 'cc1-count-al-centro-front',
        start: 339.00,
        end: 366.82,
        role: 'count',
        label: 'Al centro — front camera',
        moves: ['al-centro'],
        provenance:
          'chapter "Al centro - Front camera"; announced at "and now we\'ll reverse the camera" @336.48, demo resumes "five six seven" @339.90. Analysis says `angle` — normalised to `count`: spoken count, no music',
        confidence: 'transcript',
      },
      {
        id: 'cc1-teach-al-centro-spot',
        start: 366.82,
        end: 420.00,
        role: 'teach',
        label: 'Basic step on the spot',
        moves: ['al-centro'],
        provenance:
          'chapter "Basic step on the spot"; "you how to do the same step in a spot" @366.82',
        confidence: 'transcript',
      },
      {
        id: 'cc1-teach-arriba-abajo',
        start: 420.00,
        end: 508.00,
        role: 'teach',
        label: 'Arriba & Abajo — back camera',
        moves: ['arriba', 'abajo'],
        provenance:
          'chapter "Arriba & Abajo - Back camera"; "the next step we are going to show you is just walking front and back" @418.72. Analysis says `angle` — normalised to `teach`: explanation, the naming, then the demo',
        confidence: 'transcript',
      },
      {
        id: 'cc1-count-arriba-abajo',
        start: 479.40,
        end: 500.28,
        role: 'count',
        label: 'Arriba & Abajo, counted — back camera',
        moves: ['arriba', 'abajo'],
        provenance:
          'nested in `cc1-teach-arriba-abajo`; "Walking forward, Arriba, walking back, Abajo. 5, 6, Arriba front…" @479.40',
        nestedIn: 'cc1-teach-arriba-abajo',
        confidence: 'transcript',
      },
      {
        id: 'cc1-count-all-front',
        start: 508.00,
        end: 580.00,
        role: 'count',
        label: 'All moves — front camera',
        moves: ['al-centro', 'arriba', 'abajo'],
        provenance:
          'chapter title "All moves - Front camera". Analysis says `angle` — normalised to `count`',
        confidence: 'suspect',
        warning:
          'Chapter boundary 508.0 cannot be verified — the transcript is a Whisper repetition loop from 508.52 to 528.10.',
      },
      {
        id: 'cc1-music-back-1',
        start: 580.00,
        end: 613.00,
        role: 'music',
        label: 'All moves with music — back camera',
        moves: ['al-centro', 'arriba', 'abajo'],
        provenance:
          'chapter "All moves with music - Back camera"; "Let\'s start to do moves." @573.18, "We start with Al Centro." @579.48',
        confidence: 'transcript',
      },
      {
        id: 'cc1-music-front',
        start: 613.00,
        end: 634.00,
        role: 'music',
        label: 'All moves with music — front camera',
        moves: ['al-centro', 'arriba', 'abajo'],
        provenance:
          'chapter "All moves with music - Front camera"; "we will swap camera" @612.00',
        confidence: 'transcript',
      },
      {
        id: 'cc1-music-back-2',
        start: 634.00,
        end: 694.00,
        role: 'music',
        label: 'All moves with music — back camera',
        moves: ['al-centro', 'arriba', 'abajo'],
        provenance:
          'chapter "All moves with music - Back camera"; ends "Nice one." @691.66',
        confidence: 'transcript',
      },
      {
        id: 'cc1-outro',
        start: 694.00,
        end: 825.00,
        role: 'skip',
        label: 'Summary / Outro',
        moves: [],
        provenance:
          'chapter "Summary / Outro"; "We do this course for two different reasons." @695.22',
        confidence: 'transcript',
      },
    ],
    flags: ['K1-a', 'K1-a′', 'K1-b', 'K1-c', 'K1-d', 'K1-e', 'K1-f', 'K1-g'],
  },
  // Class 2 — La chica, el chico, los dos. Where the course starts leading:
  // chapter 4 contains "I'm giving signals, she's trying to interpret the
  // signals and react to them and follow" (@186.56).
  {
    course: 'couples',
    number: 2,
    title: 'Cuban Salsa for Beginners - Class 2 (La chica, el chico, los dos)',
    videoId: 'np3g2IzZ11A',
    duration: 1094,
    chaptered: true,
    teaches: ['la-chica', 'el-chico', 'los-dos'],
    segments: [
      {
        id: 'cc2-intro',
        start: 0.0,
        end: 18.0,
        role: 'skip',
        label: 'Intro',
        moves: [],
        provenance: 'chapter title "Intro"',
        confidence: 'transcript',
      },
      {
        id: 'cc2-about-class',
        start: 18.0,
        end: 96.90,
        role: 'skip',
        label: 'About this class',
        moves: [],
        provenance:
          'chapter title; end moved from 97.0 to the last word of "If you are done, let\'s go." @96.90',
        confidence: 'transcript',
      },
      {
        id: 'cc2-teach-la-chica-back',
        start: 96.90,
        end: 177.00,
        role: 'teach',
        label: 'La chica — explanation, back camera',
        moves: ['la-chica'],
        provenance:
          'chapter "La chica - explanation - Back camera"; "Move number one, la chica." @97.96',
        confidence: 'transcript',
      },
      {
        id: 'cc2-teach-la-chica-front',
        start: 177.00,
        end: 250.16,
        role: 'teach',
        label: 'La chica — front camera, and the lead',
        moves: ['la-chica'],
        provenance:
          'chapter "La chica - Front Camera"; end moved from the chapter\'s 252.0 to "actually we didn\'t say that on the first class" @250.16, where the close-position digression begins. Analysis says `angle` — normalised to `teach`: this chapter contains the leading breakdown, not just a camera change',
        confidence: 'transcript',
      },
      {
        id: 'cc2-teach-close-position',
        start: 250.16,
        end: 334.00,
        role: 'teach',
        label: 'About the close position',
        moves: ['al-centro'],
        provenance:
          'chapter title "About the close position". `moves: [\'al-centro\']` — this refines Class 1\'s frame, so it hangs off `al-centro`, not off the Class 2 moves',
        confidence: 'transcript',
      },
      {
        id: 'cc2-teach-el-chico-back',
        start: 334.00,
        end: 405.00,
        role: 'teach',
        label: 'El chico — explanation, back camera',
        moves: ['el-chico'],
        provenance:
          'chapter "El chico - explanation - Back camera"; "Let\'s do el chico when guys are turning around." @334.98',
        confidence: 'transcript',
      },
      {
        id: 'cc2-teach-el-chico-front',
        start: 405.00,
        end: 508.16,
        role: 'teach',
        label: 'El chico — front camera, the lift, and the roles',
        moves: ['el-chico'],
        provenance:
          'chapter "El chico - Front camera". Start is derived: the camera change is not announced and 405.0 lands mid-demo ("and chico one two three" @406.06). End moved from the chapter\'s 508.0 to the count ending "seven." @508.16. Analysis says `angle` — normalised to `teach`',
        confidence: 'transcript',
        warning: 'Chapter mark only — the camera change is not announced in the audio.',
      },
      {
        id: 'cc2-teach-los-dos',
        start: 508.16,
        end: 640.00,
        role: 'teach',
        label: 'Los dos — explanation',
        moves: ['los-dos'],
        provenance:
          'chapter "Los dos - explanation"; "And the third move that we want to show you." @508.76',
        confidence: 'transcript',
      },
      {
        id: 'cc2-count-combo-front',
        start: 640.00,
        end: 676.00,
        role: 'count',
        label: 'All three moves together — front camera',
        moves: ['la-chica', 'el-chico', 'los-dos'],
        provenance:
          'chapter "All 3 moves together - Front camera"; "Let\'s do it." @642.42, count starts @644.52, no music. Analysis says `angle` — normalised to `count`',
        confidence: 'transcript',
      },
      {
        id: 'cc2-count-combo-back',
        start: 676.00,
        end: 716.00,
        role: 'count',
        label: 'All three moves together — back camera',
        moves: ['la-chica', 'el-chico', 'los-dos'],
        provenance:
          'chapter "All 3 moves together - Back camera"; the counted run continues unbroken through 691.80. Analysis says `angle` — normalised to `count`',
        confidence: 'transcript',
      },
      {
        id: 'cc2-review-music-back',
        start: 716.0,
        end: 777.00,
        role: 'review',
        label: 'All three moves with music + review — back camera',
        moves: ['la-chica', 'el-chico', 'los-dos'],
        provenance:
          'chapter "All 3 moves together with music + review - Back camera"; ends "Ok, we\'ll swap the camera." @776.64',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
      },
      {
        id: 'cc2-review-music-front',
        start: 777.00,
        end: 853.00,
        role: 'review',
        label: 'All three moves with music + review — front camera',
        moves: ['la-chica', 'el-chico', 'los-dos', 'arriba', 'abajo', 'al-centro'],
        provenance:
          'chapter title; "So ladies, from your perspective." @779.18. Reviews Class 1 too — "And now, arriba and abajo." @830.04',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
      },
      {
        id: 'cc2-review-back-2',
        start: 853.00,
        end: 904.00,
        role: 'review',
        label: 'The same again from back camera',
        moves: ['la-chica', 'el-chico', 'los-dos', 'arriba', 'abajo', 'al-centro'],
        provenance:
          'chapter "The same again from back camera"; "In, in, out, in, in, out" @853.46. Contains the full combo call @864.82. Analysis says `angle` — normalised to `review`: it is the same review material from the other camera',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
      },
      {
        id: 'cc2-outro',
        start: 904.00,
        end: 1094.00,
        role: 'skip',
        label: 'Summary / Outro',
        moves: [],
        provenance: 'chapter title "Summary / Outro"',
        confidence: 'transcript',
      },
    ],
    flags: ['K2-a', 'K2-b', 'K2-c', 'K2-d', 'K2-e', 'K2-f', 'K2-g'],
  },
  // Class 3 — Dile que no, Guapea. The description lists Dile que no first; the
  // video teaches Guapea first, because you need somewhere to arrive before you
  // can practise arriving. Segment order is video order.
  {
    course: 'couples',
    number: 3,
    title: 'Cuban Salsa for Beginners - Class 3 (Dile que no, Guapea)',
    videoId: 'y6wC5uHfXG0',
    duration: 1127,
    chaptered: true,
    teaches: ['guapea', 'dile-que-no'],
    segments: [
      {
        id: 'cc3-intro',
        start: 0.0,
        end: 18.0,
        role: 'skip',
        label: 'Intro',
        moves: [],
        provenance: 'chapter title "Intro"',
        confidence: 'transcript',
      },
      {
        id: 'cc3-about-class',
        start: 18.0,
        end: 158.00,
        role: 'skip',
        label: 'About this class',
        moves: [],
        provenance: 'chapter title "About this class"',
        confidence: 'transcript',
      },
      {
        id: 'cc3-teach-guapea',
        start: 158.00,
        end: 290.04,
        role: 'teach',
        label: 'Guapea — presentation and explanation',
        moves: ['guapea'],
        provenance:
          'chapter "Guapea - presentation and explanation"; "It\'s an open position." @158.64, "The step we just showed now is called guapé." @183.94',
        confidence: 'transcript',
      },
      {
        id: 'cc3-teach-guapea-split',
        start: 290.04,
        end: 417.00,
        role: 'teach',
        label: 'Guapea — both cameras, split screen',
        moves: ['guapea'],
        provenance:
          'chapter "Guapea - both cameras"; "Okay, the screen will be spirit half. On half you have me from the back, on half of it you have Ola from the back." @290.04 ("spirit half" is Whisper for "split in half" — K3-f). Analysis says `angle` — normalised to `teach`: it contains the open-position hold, the palm touch and the counted demo',
        confidence: 'transcript',
      },
      {
        id: 'cc3-count-guapea',
        start: 368.16,
        end: 410.98,
        role: 'count',
        label: 'Guapea, counted — split screen',
        moves: ['guapea'],
        provenance:
          'nested in `cc3-teach-guapea-split`; "Five, six, seven. One, two, three and touch on five, six, seven." @368.16, no music',
        nestedIn: 'cc3-teach-guapea-split',
        confidence: 'transcript',
      },
      {
        id: 'cc3-teach-dile-que-no',
        start: 417.00,
        end: 567.00,
        role: 'teach',
        label: 'Dile que no — explanation',
        moves: ['dile-que-no'],
        provenance:
          'chapter "Dile que no - explanation"; "Now, the clue of our class will be how to change positions" @416.94 — the closest chapter-to-transcript agreement in the class',
        confidence: 'transcript',
      },
      {
        id: 'cc3-teach-dile-que-no-steps',
        start: 567.00,
        end: 780.00,
        role: 'teach',
        label: 'Dile que no — steps',
        moves: ['dile-que-no', 'guapea'],
        provenance:
          'chapter "Dile que no - steps"; "And from here, guys, you are going with the left foot forward" @566.36',
        confidence: 'transcript',
      },
      {
        id: 'cc3-count-dile-que-no',
        start: 653.04,
        end: 675.80,
        role: 'count',
        label: 'Dile que no, counted — split screen',
        moves: ['dile-que-no', 'guapea'],
        provenance:
          'nested in `cc3-teach-dile-que-no-steps`; "five six basic tiki one two three delay cano" @653.04, no music',
        nestedIn: 'cc3-teach-dile-que-no-steps',
        confidence: 'transcript',
      },
      {
        id: 'cc3-music',
        start: 780.00,
        end: 895.00,
        role: 'music',
        label: 'Dile que no and Guapea with music',
        moves: ['dile-que-no', 'guapea'],
        provenance:
          'chapter "Dile que no and Guapea with music"; "Okie dokie." @780.64 lands in the 1.2s gap after the previous chapter\'s last word @779.38',
        confidence: 'transcript',
      },
      {
        id: 'cc3-review',
        start: 895.00,
        end: 1004.00,
        role: 'review',
        label: 'Review with music',
        moves: [
          'dile-que-no',
          'guapea',
          'al-centro',
          'la-chica',
          'el-chico',
          'los-dos',
          'arriba',
          'abajo',
        ],
        provenance:
          'chapter "Review with music"; "and let\'s start reviewing a bit" @896.08, then "this is al centro" @897.70, "la chica" @900.68, "6 el chico" @903.16, "5 6 7 los dos" @906.18',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
        warning: 'Word timings are unreliable between 966 and 996.',
      },
      {
        id: 'cc3-outro',
        start: 1004.00,
        end: 1127.00,
        role: 'skip',
        label: 'Summary / Outro',
        moves: [],
        provenance:
          'chapter "Summary / Outro"; "Okey dokey." @1001.88 closes the review',
        confidence: 'transcript',
      },
    ],
    flags: ['K3-a', 'K3-a′', 'K3-b', 'K3-c', 'K3-d', 'K3-e', 'K3-f', 'K3-g'],
  },
  // Class 4 — Enchufla, Enchufla al Centro. Closes the loop the course has been
  // building since Class 1: "So we can complete now the basic salsa loop."
  // (@734.54). 12 chapters plus four nested `count` windows.
  {
    course: 'couples',
    number: 4,
    title: 'Cuban Salsa for Beginners - Class 4 (Enchufla, Enchufla al Centro)',
    videoId: 'kg5Ztcp5xQU',
    duration: 844,
    chaptered: true,
    teaches: ['enchufla', 'enchufla-al-centro'],
    segments: [
      {
        id: 'cc4-intro',
        start: 0.0,
        end: 18.30,
        role: 'skip',
        label: 'Intro (cold-open preview, lifted from 552.40–563.36)',
        moves: [],
        provenance:
          'chapter title "Intro". Contains a preview clip lifted from later in the video — K4-i',
        confidence: 'transcript',
      },
      {
        id: 'cc4-about-class',
        start: 18.30,
        end: 56.44,
        role: 'skip',
        label: 'About this class',
        moves: [],
        provenance:
          'chapter title "About this class"; "Hello welcome to another beginners Cuban salsa class" @18.30; "So we\'ll teach you Enchufla and Enchufla al Centro." @47.14–50.96',
        confidence: 'transcript',
      },
      {
        id: 'cc4-teach-leading-dile-que-no',
        start: 56.44,
        end: 112.50,
        role: 'teach',
        label: 'Leading Dile que no',
        moves: ['dile-que-no'],
        provenance:
          'chapter "Leading Dile Que No"; "we\'ll go through the following and leading in Dilekano" @56.44 — a sub-second agreement',
        confidence: 'transcript',
      },
      {
        id: 'cc4-teach-enchufla-presentation',
        start: 112.50,
        end: 131.26,
        role: 'teach',
        label: 'Enchufla — presentation',
        moves: ['enchufla', 'enchufla-al-centro'],
        provenance:
          'chapter "Enchufla - presentation"; "So we\'ll show you step first five six and Enchufla" @112.50',
        confidence: 'transcript',
      },
      {
        id: 'cc4-teach-enchufla',
        start: 131.26,
        end: 256.76,
        role: 'teach',
        label: 'Enchufla — explanation',
        moves: ['enchufla'],
        provenance:
          'chapter "Enchufla - explanation"; "We\'ll face this way for a moment. That will be a bit weird perspective" @131.26. The chapter mark is 127.0, which falls in the 4.5s silence between "open." @126.74 and "We\'ll" @131.26 — moved to the anchor',
        confidence: 'transcript',
      },
      {
        id: 'cc4-count-enchufla',
        start: 189.24,
        end: 220.18,
        role: 'count',
        label: 'Enchufla, counted — narrated',
        moves: ['enchufla'],
        provenance:
          'nested in `cc4-teach-enchufla`; "Now at the same time I go behind her back" @189.24, then "One, two, three and block six, seven." ×3 @195.38–207.22',
        nestedIn: 'cc4-teach-enchufla',
        confidence: 'transcript',
      },
      {
        id: 'cc4-teach-enchufla-al-centro',
        start: 256.76,
        end: 300.00,
        role: 'teach',
        label: 'Enchufla al Centro',
        moves: ['enchufla-al-centro', 'enchufla'],
        provenance:
          'chapter "Enchufla al Centro"; "So for example, enchu flá tripla" @256.76. Mislabel: the first ~12s is the Enchufla Tripla naming demo; al centro begins @268.24 "and now we\'ll go to al centro" — K4-j',
        confidence: 'transcript',
      },
      {
        id: 'cc4-teach-loop',
        start: 300.00,
        end: 375.06,
        role: 'teach',
        label: 'Open–close position loop',
        moves: ['enchufla', 'enchufla-al-centro', 'dile-que-no', 'guapea'],
        provenance:
          'chapter "Open - close position loop". 300.0 falls in the 0.88s gap between "basic side." @299.96 and "Chiki," @300.84 — kept as published',
        confidence: 'transcript',
      },
      {
        id: 'cc4-count-loop',
        start: 309.26,
        end: 331.78,
        role: 'count',
        label: 'The whole loop, counted — front view',
        moves: ['enchufla-al-centro', 'enchufla', 'dile-que-no', 'guapea'],
        provenance:
          'nested in `cc4-teach-loop`; "five six seven one two three five six both back" @309.26, no music',
        nestedIn: 'cc4-teach-loop',
        confidence: 'transcript',
      },
      {
        id: 'cc4-count-loop-side',
        start: 337.06,
        end: 370.42,
        role: 'count',
        label: 'The whole loop, counted — side view',
        moves: ['enchufla-al-centro', 'enchufla', 'dile-que-no', 'guapea'],
        provenance:
          'nested in `cc4-teach-loop`; "then you\'ll see side of us during Enchufla." @337.06, no music',
        nestedIn: 'cc4-teach-loop',
        confidence: 'transcript',
      },
      {
        id: 'cc4-teach-guapea-versions',
        start: 375.06,
        end: 413.92,
        role: 'teach',
        label: 'Versions of Guapea',
        moves: ['guapea'],
        provenance:
          'chapter "Versions of Guapea"; "Okay, one more thing to mention." @375.06',
        confidence: 'transcript',
      },
      {
        id: 'cc4-teach-loop-practice',
        start: 413.92,
        end: 506.68,
        role: 'teach',
        label: 'Open–close loop practice (called)',
        moves: ['enchufla', 'enchufla-al-centro', 'dile-que-no', 'guapea'],
        provenance:
          'chapter "Open - close loop practice"; "We\'ll do a transition a couple of times between Dile Keno, Guapea, and then I\'ll call Enchufla, Enchufla Doble, Enchufla Triple" @413.92',
        confidence: 'transcript',
      },
      {
        id: 'cc4-count-loop-practice',
        start: 463.10,
        end: 498.80,
        role: 'count',
        label: 'The loop, counted and called',
        moves: ['enchufla-al-centro', 'enchufla', 'dile-que-no', 'guapea'],
        provenance:
          'nested in `cc4-teach-loop-practice`; "5, 6, 7. 1, D, le cano. Hop and go." @463.10, no music',
        nestedIn: 'cc4-teach-loop-practice',
        confidence: 'transcript',
      },
      {
        id: 'cc4-music',
        start: 506.68,
        end: 621.62,
        role: 'music',
        label: 'Open–close loop with music',
        moves: ['enchufla', 'enchufla-al-centro', 'dile-que-no', 'guapea'],
        provenance:
          'chapter "Open - close loop with music"; "We\'ll do it both directions" @506.68. The teachers count and call over the music throughout — this is not a silent demo',
        confidence: 'transcript',
      },
      {
        id: 'cc4-review',
        start: 621.62,
        end: 729.88,
        role: 'review',
        label: 'Review with music',
        moves: [
          'enchufla',
          'enchufla-al-centro',
          'dile-que-no',
          'guapea',
          'al-centro',
          'la-chica',
          'el-chico',
          'los-dos',
          'arriba',
          'abajo',
        ],
        provenance:
          'chapter "Review with music"; "And start reviewing. One." @621.62, then "La chica." @625.24, "El chico." @628.10, "Los dos together." @631.36, "arriba" @679.86, "abajo, abajo" @686.56–687.14',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
      },
      {
        id: 'cc4-outro',
        start: 729.88,
        end: 844.00,
        role: 'skip',
        label: 'Summary / Outro',
        moves: [],
        provenance:
          'chapter "Summary / Outro"; "Okay, so one of the goals is achieved with this class." @729.88',
        confidence: 'transcript',
      },
    ],
    flags: [
      'K4-a',
      'K4-b',
      'K4-c',
      'K4-d',
      'K4-e',
      'K4-f',
      'K4-g',
      'K4-h',
      'K4-i',
      'K4-j',
      'K4-k',
      'K4-l',
      'K4-m',
    ],
  },
  // Class 5 — El Uno. The easy shape at last: a real `count` chapter supplies
  // the slow clip and the official short supplies the fast one. Chapter 3
  // retroactively reframes everything Class 3 taught.
  {
    course: 'couples',
    number: 5,
    title: 'Cuban Salsa for Beginners - Class 5 (El Uno)',
    videoId: '4KKAKgn8UZ4',
    // Container value, not the playlist TSV's 852.0 — the TSV rounds up (K6-i).
    duration: 851.45,
    chaptered: true,
    teaches: ['el-uno'],
    segments: [
      {
        id: 'cc5-intro',
        start: 0.0,
        end: 18.86,
        role: 'skip',
        label: 'Intro (cold-open preview)',
        moves: [],
        provenance:
          'chapter title "Intro". 0.00–9.46 is a preview clip: "And go and ping ping pa … and one two three." No cue or clip sourced here',
        confidence: 'transcript',
      },
      {
        id: 'cc5-about-class',
        start: 18.86,
        end: 62.50,
        role: 'skip',
        label: 'About this class',
        moves: [],
        provenance:
          'chapter title "About this class"; "Hello! Welcome to another class with La Suerte Dance School, Michal and Manuela." @18.86',
        confidence: 'transcript',
      },
      {
        id: 'cc5-teach-dile-que-no-side',
        start: 62.50,
        end: 194.40,
        role: 'teach',
        label: 'Dile que no, side to side',
        moves: ['dile-que-no'],
        provenance:
          'chapter "Dile Que No side to side"; "First thing we have to discuss is Dile Cano." @62.50. The chapter mark is 61.0, in the gap after "Let\'s start." @56.22 — moved to the anchor',
        confidence: 'transcript',
      },
      {
        id: 'cc5-teach-el-uno',
        start: 194.40,
        end: 438.58,
        role: 'teach',
        label: 'El uno — presentation & explanation',
        moves: ['el-uno'],
        provenance:
          'chapter "El uno - presentation & explanation"; "Now we\'ll go through El Uno." @194.40 — a 0.4s agreement',
        confidence: 'transcript',
      },
      {
        id: 'cc5-count-el-uno',
        start: 438.58,
        end: 473.72,
        role: 'count',
        label: 'El uno — fluently with count',
        moves: ['el-uno'],
        provenance:
          'chapter "El uno - fluently with count"; "when I say that it\'s happening fluently, we\'ll show you fluently." @437.34–439.34',
        confidence: 'transcript',
      },
      {
        id: 'cc5-count-el-uno-angle',
        start: 473.72,
        end: 532.98,
        role: 'count',
        label: 'El uno — opposite angle, counted',
        moves: ['el-uno', 'enchufla-al-centro', 'dile-que-no'],
        provenance:
          'chapter "El uno - different angle"; announced at "Maybe let\'s do it opposite angle as well." @471.98, then "I\'m not sure if this one is helpful" @473.72. Analysis says `angle` — normalised to `count`: it is a counted demo with no music, from "al centro" @479.30 to @518.08',
        confidence: 'transcript',
      },
      {
        id: 'cc5-music',
        start: 532.98,
        end: 621.58,
        role: 'music',
        label: 'El uno — with music',
        moves: ['el-uno', 'dile-que-no', 'guapea', 'enchufla-al-centro'],
        provenance:
          'chapter "El uno - with music"; "We\'ll start directly with Guapea and El Uno and then we\'ll show you how it combines with all other moves." @532.98. The teachers count over the music throughout',
        confidence: 'transcript',
      },
      {
        id: 'cc5-review',
        start: 621.58,
        end: 762.82,
        role: 'review',
        label: 'Review with music',
        moves: [
          'el-uno',
          'la-chica',
          'el-chico',
          'los-dos',
          'dile-que-no',
          'guapea',
          'enchufla-al-centro',
          'arriba',
          'abajo',
        ],
        provenance:
          'chapter "Review with music"; "La chica, hop, el chico, guys, hop, los dos, turn together, hop" @621.58–630.42, "Arriba" @673.54, "Abajo" @675.64. The chapter mark is 618.0, which cuts the sentence "And we\'ll come back to this setup and we\'ll go through all different moves" (@613.98–619.70) in half — moved 3.58s to the anchor (K5-b)',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
      },
      {
        id: 'cc5-outro',
        start: 762.82,
        end: 851.45,
        role: 'skip',
        label: 'Summary / Outro',
        moves: [],
        provenance:
          'chapter "Summary / Outro"; "When we are dancing with this very slow music sometimes my mind is drifting somewhere away" @762.82',
        confidence: 'transcript',
      },
    ],
    flags: ['K5-a', 'K5-b', 'K5-c', 'K5-d', 'K5-e', 'K5-f', 'K5-g', 'K5-h', 'K5-i'],
  },
  // Class 6 — Kentucky. 10 chapters but 11 segments: the chapter titled
  // "Summary / Outro" is not one — its first minute is the single most
  // substantial piece of *follower* instruction in classes 1–7 (K6-a).
  {
    course: 'couples',
    number: 6,
    title: 'Cuban Salsa for Beginners - Class 6 (Kentucky)',
    videoId: 'yZ562-ehtQQ',
    // Container value, not the playlist TSV's 694.0 (K6-i).
    duration: 693.42,
    chaptered: true,
    teaches: ['kentucky', 'la-chica'],
    segments: [
      {
        id: 'cc6-intro',
        start: 0.0,
        end: 18.78,
        role: 'skip',
        label: 'Intro (cold-open preview)',
        moves: [],
        provenance:
          'chapter title "Intro". Speech resumes at "Hello! Another class with La Suerte Dance School" @18.78 — a 0.78s agreement with the 18.0 mark',
        confidence: 'transcript',
      },
      {
        id: 'cc6-about-class',
        start: 18.78,
        end: 63.62,
        role: 'skip',
        label: 'About this class · prerequisites',
        moves: [],
        provenance:
          'chapter title "About this class". Ends on the hook-turn card plug, "It should pop out when I speak." @60.40–62.06. The chapter mark is 65.0, 1.38s after the presentation has begun',
        confidence: 'transcript',
      },
      {
        id: 'cc6-teach-kentucky',
        start: 63.62,
        end: 159.64,
        role: 'teach',
        label: 'Kentucky — presentation & explanation',
        moves: ['kentucky'],
        provenance:
          'chapter "Kentucky - presentation & explanation"; "We\'ll show you how it works." @63.62, after a 1.56s gap. The chapter mark at 65.0 falls mid-sentence, between "works." @64.68 and "We start from Guapea again" @65.72',
        confidence: 'transcript',
      },
      {
        id: 'cc6-teach-kentucky-side',
        start: 159.64,
        end: 206.98,
        role: 'teach',
        label: 'Kentucky — side view, re-narrated',
        moves: ['kentucky'],
        provenance:
          'chapter "Kentucky - side view"; "5, 6, Guapea. 1, 2, Kentucky." @159.64, immediately after "so you can look at hands." @159.32. Analysis says `angle` — normalised to `teach`, not `count`: it is a second pass through the whole move with fresh instruction interleaved ("Left goes on her shoulder. Keep it there." @166.46, "Six, seven, right hand goes up" @187.70)',
        confidence: 'transcript',
      },
      {
        id: 'cc6-count-kentucky',
        start: 206.98,
        end: 243.52,
        role: 'count',
        label: 'Kentucky — fluently with count',
        moves: ['kentucky'],
        provenance:
          'chapter "Kentucky - fluently with count"; the announcement "One more time from this perspective fluently." starts its own segment at @206.98 — a 0.02s agreement, the tightest boundary in the whole part',
        confidence: 'transcript',
      },
      {
        id: 'cc6-teach-extra',
        start: 243.52,
        end: 315.88,
        role: 'teach',
        label: 'Extra information — the timing of the lift',
        moves: ['kentucky', 'el-uno'],
        provenance:
          'chapter "Extra information"; "Important elements that we should mention also is when we do Kentucky" @243.52 after a 2.12s gap. Also carries `el-uno`: @282.20 "actually we should mention exactly the same with eluno"',
        confidence: 'transcript',
      },
      {
        id: 'cc6-music',
        start: 315.88,
        end: 394.42,
        role: 'music',
        label: 'Kentucky — with music',
        moves: ['kentucky', 'guapea', 'dile-que-no'],
        provenance:
          'chapter "Kentucky - with music"; "Let\'s start from Guapea." @315.88. The teachers count and talk over the music throughout',
        confidence: 'transcript',
      },
      {
        id: 'cc6-review',
        start: 394.42,
        end: 498.40,
        role: 'review',
        label: 'Review with music',
        moves: [
          'kentucky',
          'el-uno',
          'al-centro',
          'arriba',
          'abajo',
          'la-chica',
          'el-chico',
          'los-dos',
          'dile-que-no',
          'guapea',
          'enchufla-al-centro',
        ],
        provenance:
          'chapter "Review with music"; "Ok, and now we\'ll do everything from top, from plus one, so al centro" @394.42 — the mark at 395.0 lands on "and" @395.50, so the boundary moves 0.58s earlier',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
      },
      {
        id: 'cc6-teach-la-chica',
        start: 498.40,
        end: 592.14,
        role: 'teach',
        label: 'BONUS — La Chica from Guapea (open position)',
        moves: ['la-chica'],
        provenance:
          'chapter "BONUS - La chica from Guapea"; "Now, plot twist." @498.40 after a 2.64s gap',
        confidence: 'transcript',
      },
      {
        id: 'cc6-teach-default-hands',
        start: 592.14,
        end: 656.36,
        role: 'teach',
        label: 'The follower\'s arm — default hand position',
        moves: ['dile-que-no'],
        provenance:
          'chapter title says "Summary / Outro", but this is instruction, not summary. Opens on "Okay, so we have this sorted." @592.14 — 0.14s from the 592.0 mark — and the teaching starts at "Ola told me also to mention to you that girls very often are lifting their hand up on one." @596.72. See K6-a',
        confidence: 'transcript',
      },
      {
        id: 'cc6-outro',
        start: 656.36,
        end: 693.42,
        role: 'skip',
        label: 'Outro (channel plugs)',
        moves: [],
        provenance:
          '"And to do that, remember to like, subscribe and press the bell." @656.36 — the first line of the actual outro',
        confidence: 'transcript',
      },
    ],
    flags: [
      'K6-a',
      'K6-b',
      'K6-c',
      'K6-d',
      'K6-e',
      'K6-f',
      'K6-g',
      'K6-h',
      'K6-i',
      'K6-j',
      'K6-k',
      'K6-l',
      'K6-m',
    ],
  },
  // Class 7 — Vacilala por la mano. The lead-cue high-water mark of the part:
  // "it requires a lot more leading action" (@194.08). The move's name is never
  // spoken correctly anywhere in the course (K7-a).
  {
    course: 'couples',
    number: 7,
    title: 'Cuban Salsa for Beginners - Class 7 (Vacilala por la mano)',
    videoId: 'pZChl5ylSJw',
    // Container value, not the playlist TSV's 565.0 (K6-i).
    duration: 564.41,
    chaptered: true,
    teaches: ['vacilala-por-la-mano'],
    segments: [
      {
        id: 'cc7-intro',
        start: 0.0,
        end: 18.32,
        role: 'skip',
        label: 'Intro (cold-open preview)',
        moves: [],
        provenance:
          'chapter title "Intro". 0.00–8.88 is a preview clip of the finished move — "For la mano, hop, king king hop … five six seven and one." Speech resumes at "Hello, hello, another class with La Suerte Dance School" @18.32, a 0.32s agreement with the 18.0 mark',
        confidence: 'transcript',
      },
      {
        id: 'cc7-about-class',
        start: 18.32,
        end: 44.68,
        role: 'skip',
        label: 'About this class',
        moves: [],
        provenance:
          'chapter title "About this class"; closes on "we\'ll teach you Basila Laporte Lamano. Let\'s go!" @43.08',
        confidence: 'transcript',
      },
      {
        id: 'cc7-teach-vplm',
        start: 44.68,
        end: 286.62,
        role: 'teach',
        label: 'Vacilala por la mano — presentation & explanation',
        moves: ['vacilala-por-la-mano'],
        provenance:
          'chapter "…presentation & explanation"; "We start with Guapea." @44.68, a 0.68s agreement. 241 seconds, the longest single teach block in Part 1',
        confidence: 'transcript',
      },
      {
        id: 'cc7-count-vplm',
        start: 286.62,
        end: 301.46,
        role: 'count',
        label: 'Fluently with count',
        moves: ['vacilala-por-la-mano'],
        provenance:
          'chapter "Vacilala por la mano - fluently with count"; "let\'s do Guapea and Basila por la mano one more time" begins at "let\'s" @286.62. The chapter mark is 285.0, which lands mid-sentence inside the Lego analogy ("Lego" @285.36). Moved 1.62s later so the announcing sentence stays whole. Usable length is 13.88s, not the 17s the chapter implies (K7-c)',
        confidence: 'transcript',
      },
      {
        id: 'cc7-count-vplm-side',
        start: 301.46,
        end: 337.34,
        role: 'count',
        label: 'Side view — normal, then explicitly slower',
        moves: ['vacilala-por-la-mano'],
        provenance:
          'chapter "Vacilala por la mano - side view"; "We\'ll do one more time exactly the same thing just from different perspective." starts its own segment at @301.46, a 0.54s agreement. Analysis says `angle` — normalised to `count`: two counted passes with no new instruction, the second announced as "one more time a bit slower" @317.94',
        confidence: 'transcript',
      },
      {
        id: 'cc7-music',
        start: 337.34,
        end: 392.28,
        role: 'music',
        label: 'With music',
        moves: ['vacilala-por-la-mano', 'guapea', 'dile-que-no'],
        provenance:
          'chapter "Vacilala por la mano - with music"; "We are still going with very very slow rhythm" @337.34, a 0.34s agreement',
        confidence: 'transcript',
      },
      {
        id: 'cc7-review',
        start: 392.28,
        end: 487.44,
        role: 'review',
        label: 'Review with music',
        moves: [
          'vacilala-por-la-mano',
          'la-chica',
          'el-uno',
          'kentucky',
          'enchufla-al-centro',
          'dile-que-no',
          'guapea',
        ],
        provenance:
          'chapter "Review with music"; "and I will close position now and start from the beginning" @392.28. The chapter mark is 394.0, which falls between "and" @393.72 and "start" @394.66 inside that announcement — the boundary moves 1.72s earlier to keep it whole. Contains real instruction at @451.34 (K7-e)',
        reviewsEarlierMoves: true,
        confidence: 'transcript',
      },
      {
        id: 'cc7-outro',
        start: 487.44,
        end: 564.41,
        role: 'skip',
        label: 'Summary / Outro',
        moves: [],
        provenance:
          'chapter "Summary / Outro"; "All this dance is becoming a lot more complex, a lot more exciting." @487.44 after a 2.0s gap',
        confidence: 'transcript',
      },
    ],
    flags: [
      'K7-a',
      'K7-b',
      'K7-c',
      'K7-d',
      'K7-e',
      'K7-f',
      'K7-g',
      'K7-h',
      'K7-i',
      'K7-j',
      'K7-k',
    ],
  },
]

export const MOVES_01_07: SalsaMove[] = [
  // Class 1 — Al centro. 22 cues, **0 `kind: 'lead'`**, and that is the correct
  // number: Class 1 teaches the frame, not a signal. Nobody pushes, pulls or
  // blocks anybody, so the frame cues are `arms` and every real lead cue in
  // classes 2–7 depends on them. Ten of the twelve drillable cues are the frame.
  {
    id: 'al-centro',
    name: 'Al centro',
    aliases: [
      'al centro',
      'Al Centro',
      'Al centro',
      'al Centro',
      'aisle central',
      'out centro',
      'centro',
    ],
    kind: 'step',
    summary:
      'The side basic danced in close position, and the same step danced on the spot.',
    footwork:
      'In close position, guys start with the left foot and girls with the right. Two ' +
      'quick steps then an open step to the side: left, right, left, and right, left, ' +
      'right for the leader, mirrored right, left, right and left, right, left for the ' +
      'follower — the "cheeky cheeky open" of the side basic. The same step is then ' +
      'danced on the spot instead of travelling sideways ("spot, spot, open"), which is ' +
      'just stomping in place on the same rhythm. In both versions the partners\' legs ' +
      'cross slightly: the leader\'s left leg is outside hers and her leg is outside his, ' +
      'and that offset is what makes travelling front and back possible.',
    cues: [
      {
        id: 'al-centro-frame-1',
        text: 'Stand opposite your partner.',
        role: 'both',
        kind: 'concept',
        sourceStart: 272.64,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: "We're standing opposite to each other.",
        confidence: 'transcript',
      },
      {
        id: 'al-centro-frame-2',
        text: 'Show her the thumb of your left hand.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 274.44,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'I show her thumb of my left hand and she grabs my thumb.',
        confidence: 'transcript',
      },
      {
        id: 'al-centro-frame-3',
        text: 'Grab his thumb.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 276.00,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'she grabs my thumb',
        confidence: 'transcript',
        warning:
          'The teachers do not say which hand she grabs with. His left hand implies her ' +
          'right, but that is a deduction, not something said on camera.',
      },
      {
        id: 'al-centro-frame-4',
        text: 'Close the rest of your fingers on top.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 277.04,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'Rest of the fingers I close on top.',
        confidence: 'transcript',
      },
      {
        id: 'al-centro-frame-5',
        text: 'Put your other hand on her back, not too low.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 279.14,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'second hand I put it on her back not too long',
        confidence: 'suspect',
        warning:
          'Whisper has \'not too long\'. In context — the leader\'s hand on the follower\'s ' +
          'back — this is almost certainly \'not too LOW\'. The cue text reads \'low\'; the ' +
          'verbatim keeps \'long\' so the substitution stays visible.',
        flag: 'K1-b',
      },
      {
        id: 'al-centro-frame-6',
        text:
          'If she is not your partner, put that hand around her shoulder blades instead.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 285.60,
        sourceVideo: 'MDEAN40DUVY',
        verbatim:
          "if she's your wife or girlfriend it's fine otherwise hand around her shoulder " +
          'blades in this position',
        confidence: 'transcript',
      },
      {
        id: 'al-centro-1',
        beat: 1,
        text: 'Start with your left foot.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 295.58,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'guys are starting with the left foot',
        confidence: 'transcript',
      },
      {
        id: 'al-centro-2',
        beat: 1,
        text: 'Start with your right foot.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 297.72,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'girls are starting with the right',
        confidence: 'transcript',
      },
      {
        id: 'al-centro-3',
        beats: [1, 2, 3, 5, 6, 7],
        text: 'Left, right, left — then right, left, right.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 304.88,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'left, right, left, and right, left, right.',
        confidence: 'transcript',
      },
      {
        // 37s later than the leader's version: his is called over the back
        // camera, hers over the front. Two cues, never one (R4).
        id: 'al-centro-4',
        beats: [1, 2, 3, 5, 6, 7],
        text: 'Right, left, right — then left, right, left.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 342.16,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'Ola is moving her feet right left right left and left right left',
        confidence: 'transcript',
      },
      {
        id: 'al-centro-rhythm',
        text: 'Hear it as "cheeky cheeky, open" — two quick steps, then the open step.',
        role: 'both',
        kind: 'rhythm',
        sourceStart: 301.86,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'five six seven and cheeky cheeky open and cheeky cheeky open',
        confidence: 'transcript',
      },
      {
        id: 'al-centro-name',
        text: 'The side basic in close position is called Al centro.',
        role: 'both',
        kind: 'concept',
        sourceStart: 471.68,
        sourceVideo: 'MDEAN40DUVY',
        verbatim:
          'so first step to the side Tiki, Chiki Chiki Coco, Chiki Chiki Chiki Chiki ' +
          'Chiki Coco will be called al centro.',
        confidence: 'transcript',
      },
      {
        id: 'al-centro-5',
        text: 'On the spot, keep stomping in place instead of travelling sideways.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 385.92,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'We just keep stomping on / On the spot, tick.',
        confidence: 'transcript',
      },
      {
        id: 'al-centro-6',
        text: 'Check your legs — they should be slightly crossing.',
        role: 'both',
        kind: 'concept',
        sourceStart: 408.16,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'But my point is that our legs are slightly crossing.',
        confidence: 'transcript',
      },
      {
        // R4 in miniature: "my left leg is outside" and "her leg is also
        // outside" are different sentences about different legs. Which of her
        // legs is never stated, so the follower cue says only "your leg".
        id: 'al-centro-7',
        text: 'Your left leg goes outside hers.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 410.50,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'So my left leg is outside.',
        confidence: 'transcript',
      },
      {
        id: 'al-centro-8',
        text: 'Your leg goes outside his too.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 412.36,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'And her leg is also outside.',
        confidence: 'transcript',
      },
      {
        id: 'al-centro-9',
        text: 'Crossing the legs is what makes travelling front and back easy.',
        role: 'both',
        kind: 'concept',
        sourceStart: 414.52,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'Because of that, it will be easier for us to travel front and back.',
        confidence: 'transcript',
      },
      {
        // `context`, so it is never spoken in drill mode. No `bpm` field exists
        // and none is wanted: the number lives here. "bits" is Whisper (K1-e).
        id: 'al-centro-bpm',
        text: 'The music in these classes is app-generated, 130 beats per minute.',
        role: 'both',
        kind: 'context',
        sourceStart: 553.42,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'This music is app generated. This is only 130 bits per minute.',
        confidence: 'transcript',
      },
      // Class 2's close-position chapter. Four follower-frame cues, all
      // addressed to her explicitly ("girls", "it's very tiring for a guy"), so
      // none gets an invented leader counterpart.
      {
        id: 'al-centro-frame-7',
        text: 'Put your hand on his shoulder — not anywhere else.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 254.94,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          "very important girls that you put your hand on the guy's shoulder please " +
          "don't grab other body parts",
        confidence: 'transcript',
      },
      {
        id: 'al-centro-frame-8',
        text: 'When he drops his hand, keep yours where it is.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 264.08,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'when Mihael drops or your partner drops his hand your hand is still there',
        confidence: 'transcript',
      },
      {
        id: 'al-centro-frame-9',
        text: "Don't use his hand as support.",
        role: 'follower',
        kind: 'arms',
        sourceStart: 268.28,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          "when his hand is there you're not using it as support because it's very " +
          'tiring for a guy to dance with you like that when you\'re holding your whole ' +
          'weight on him',
        confidence: 'transcript',
      },
      {
        id: 'al-centro-frame-10',
        text: 'Carry your own weight and hold your own frame.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 276.78,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'so keep your your weight and your arms in a frame by yourself that\'s why we ' +
          'are at the beginning teaching you how to dance solo separately that you learn ' +
          'that you have to be responsible for your own weight and for your own steps',
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 1,
        videoId: 'MDEAN40DUVY',
        teachStart: 270.44,
        segmentIds: [
          'cc1-teach-frame',
          'cc1-teach-al-centro-back',
          'cc1-count-al-centro',
          'cc1-count-al-centro-front',
          'cc1-teach-al-centro-spot',
        ],
        clips: {
          slow: {
            src: '/clips/salsa/couples/al-centro-slow.mp4',
            sourceVideo: 'MDEAN40DUVY',
            start: 299.54,
            end: 327.32,
            aspect: '16/9',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/al-centro-fast.mp4',
            sourceVideo: 'MDEAN40DUVY',
            start: 581.24,
            end: 612.0,
            aspect: '16/9',
            confidence: 'transcript',
            caveat:
              "The teachers count and coach over the music — 'Just relax' @595.58, " +
              "'Try to keep the rhythm' @597.38. Not a silent demo.",
          },
        },
      },
      {
        course: 'couples',
        classNumber: 2,
        videoId: 'np3g2IzZ11A',
        teachStart: 250.16,
        segmentIds: ['cc2-teach-close-position'],
        clips: {
          slow: null,
          fast: null,
          missingReason:
            'Class 2 only refines the close position; both clips come from Class 1.',
        },
      },
    ],
    complete: true,
    // Rejected clip windows live here rather than in `ClipPair.alternates`.
    // `SalsaClip.src` is required and the cutter only encodes the published
    // window, so an alternate entry would have to point at a file that does not
    // exist — and `src: ''` resolves against basePath to the page URL, giving a
    // player with nothing behind it. A note carries the video id, the exact
    // window and the reason it was held back, which is what a reviewer needs.
    notes: [
      {
        text:
          'Alternate slow window, review-only and not encoded: 339.90 → 360.08 (20.18s). ' +
          "Front camera, so it shows the follower's footwork — genuinely useful, but 7.6s " +
          'shorter than the published window and the count is sparser ("one two three and ' +
          'five six seven" only from 351.72).',
        sourceVideo: 'MDEAN40DUVY',
        sourceStart: 339.90,
      },
      {
        text:
          'Alternate fast window, review-only and not encoded: 613.00 → 634.00 (21.00s), ' +
          'the `cc1-music-front` chapter. The front-camera equivalent of the published ' +
          'back-camera window, and a legitimate alternative, but it is the shortest music ' +
          'chapter in the class and mixes all three moves.',
        sourceVideo: 'MDEAN40DUVY',
        sourceStart: 613.0,
      },
    ],
    flags: ['K1-b', 'K4-b'],
  },
  // Class 1 — Arriba and Abajo. Taught, named and demonstrated as one
  // alternating pair and never shown apart, which is why they share both clip
  // files. The follower's direction is never stated in the audio (K1-d), so
  // there is no follower cue on either move — a gap, flagged rather than filled.
  {
    id: 'arriba',
    name: 'Arriba',
    aliases: ['arriba', 'Arriba'],
    kind: 'step',
    base: 'al-centro',
    summary: 'Three steps travelling forward, in close position.',
    footwork:
      'Three steps travelling forward, on the same 1-2-3 / 5-6-7 count as al centro, ' +
      'with the legs kept crossed as in close position. The teachers show one sequence ' +
      'forward (1, 2, 3, and 5, 6, 7) rather than continuous travel, because of the ' +
      'space they are filming in — "you could carry on forward all the time."',
    cues: [
      {
        id: 'arriba-1',
        text: 'The next step is just walking front and back on the same principle.',
        role: 'both',
        kind: 'concept',
        sourceStart: 418.72,
        sourceVideo: 'MDEAN40DUVY',
        verbatim:
          'So the next step we are going to show you is just walking front and back ' +
          'with exactly the same principle.',
        confidence: 'transcript',
      },
      {
        // `leader`, not `both`: he established at 327.50 "I'm talking right now
        // from guy's point of view", and this is his own count of his own feet.
        id: 'arriba-2',
        beats: [1, 2, 3, 5, 6, 7],
        text: 'Three steps forward — one, two, three — then another five, six, seven.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 424.50,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: "So I'll do three steps forward. One, two, three, and another five, six, seven.",
        confidence: 'transcript',
      },
      {
        id: 'arriba-3',
        text:
          'You could carry on forward the whole time; you only turn it around because of ' +
          'the space.',
        role: 'both',
        kind: 'concept',
        sourceStart: 440.96,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'You could carry on forward all the time.',
        confidence: 'transcript',
      },
      {
        id: 'arriba-4',
        text: 'In a small space, do one sequence forward and one sequence back.',
        role: 'both',
        kind: 'concept',
        sourceStart: 455.74,
        sourceVideo: 'MDEAN40DUVY',
        verbatim:
          'but because we are dancing in a small space we\'ll again show you how to do ' +
          'one sequence for front and one sequence back',
        confidence: 'transcript',
      },
      {
        // No `beat`: the counted demo's own numbering is internally
        // inconsistent, so the direction-change beat cannot be derived (K1-f).
        id: 'arriba-5',
        text: 'Walking forward is Arriba.',
        role: 'leader',
        kind: 'concept',
        sourceStart: 479.40,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'Walking forward, Arriba, walking back, Abajo.',
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 1,
        videoId: 'MDEAN40DUVY',
        teachStart: 420.0,
        segmentIds: ['cc1-teach-arriba-abajo', 'cc1-count-arriba-abajo'],
        clips: {
          slow: {
            src: '/clips/salsa/couples/arriba-abajo-slow.mp4',
            sourceVideo: 'MDEAN40DUVY',
            start: 479.4,
            end: 500.28,
            aspect: '16/9',
            confidence: 'transcript',
            caveat:
              'Word timings inside this segment degenerate from 499.34 — nine ' +
              'consecutive words share that one timestamp — so the last ~1s of the ' +
              'window is anchored to the segment end, not to a word. Also names the ' +
              'moves in the first 3s before counting them.',
          },
          fast: {
            src: '/clips/salsa/couples/arriba-abajo-fast.mp4',
            sourceVideo: 'MDEAN40DUVY',
            start: 667.9,
            end: 691.34,
            aspect: '16/9',
            confidence: 'transcript',
            caveat:
              "Announced as 'I'll keep swapping a bit faster' @666.98, so the tempo " +
              'rises through the clip. The last ~9s returns to al centro — ' +
              "'hop, out / centro, piki' @682.04–683.64.",
          },
        },
      },
    ],
    complete: true,
    // Alternates as notes, not `ClipPair.alternates` — see the comment on
    // `al-centro`.
    notes: [
      {
        text:
          'Alternate slow window, review-only and not encoded: 424.50 → 434.80 (10.30s). ' +
          '"So I\'ll do three steps forward… And then I\'ll go back" — the cleanest single ' +
          'forward-and-back pair in the class, but far under the 20s floor and the moves ' +
          'are not yet named. Covers Abajo too.',
        sourceVideo: 'MDEAN40DUVY',
        sourceStart: 424.5,
      },
      {
        text:
          'Alternate slow window, review-only and not encoded: 443.52 → 453.26 (9.74s). ' +
          'The continuous-forward quick demo, "1 2 3 5 6 7" ×4 with no talking at all. ' +
          'Under the floor, and it shows Arriba only.',
        sourceVideo: 'MDEAN40DUVY',
        sourceStart: 443.52,
      },
      {
        text:
          'Alternate fast window, review-only and not encoded: 613.00 → 634.00 (21.00s), ' +
          'the `cc1-music-front` chapter — the front-camera equivalent of the published ' +
          'back-camera window. Shortest music chapter in the class, and it mixes all three ' +
          'moves.',
        sourceVideo: 'MDEAN40DUVY',
        sourceStart: 613.0,
      },
    ],
    flags: ['K1-d', 'K1-f'],
  },
  {
    id: 'abajo',
    name: 'Abajo',
    aliases: ['abajo', 'Abajo'],
    kind: 'step',
    base: 'al-centro',
    summary: 'Three steps travelling back, in close position.',
    footwork:
      'Three steps travelling back, the reverse of arriba, on the same count. Arriba ' +
      'and abajo are taught, named and demonstrated as one alternating pair and are ' +
      'never shown apart, which is why they share both clip files.',
    cues: [
      {
        id: 'abajo-1',
        beats: [1, 2, 3, 5, 6, 7],
        text: 'Then go back — one, two, three, and five, six, seven.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 430.02,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: "And then I'll go back. One, two, three, and five, six, seven.",
        confidence: 'transcript',
      },
      {
        id: 'abajo-2',
        text: 'Walking back is Abajo.',
        role: 'leader',
        kind: 'concept',
        sourceStart: 481.44,
        sourceVideo: 'MDEAN40DUVY',
        verbatim: 'Walking forward, Arriba, walking back, Abajo.',
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 1,
        videoId: 'MDEAN40DUVY',
        teachStart: 420.0,
        segmentIds: ['cc1-teach-arriba-abajo', 'cc1-count-arriba-abajo'],
        clips: {
          // `shared: true` here and not on `arriba`, per the manifest's own
          // `shared` column: these two files are cut once and used twice.
          slow: {
            src: '/clips/salsa/couples/arriba-abajo-slow.mp4',
            sourceVideo: 'MDEAN40DUVY',
            start: 479.4,
            end: 500.28,
            aspect: '16/9',
            confidence: 'transcript',
            shared: true,
            caveat:
              'Word timings inside this segment degenerate from 499.34 — nine ' +
              'consecutive words share that one timestamp — so the last ~1s of the ' +
              'window is anchored to the segment end, not to a word. Also names the ' +
              'moves in the first 3s before counting them.',
          },
          fast: {
            src: '/clips/salsa/couples/arriba-abajo-fast.mp4',
            sourceVideo: 'MDEAN40DUVY',
            start: 667.9,
            end: 691.34,
            aspect: '16/9',
            confidence: 'transcript',
            shared: true,
            caveat:
              "Announced as 'I'll keep swapping a bit faster' @666.98, so the tempo " +
              'rises through the clip. The last ~9s returns to al centro — ' +
              "'hop, out / centro, piki' @682.04–683.64.",
          },
        },
      },
    ],
    complete: true,
    // Same three alternates as `arriba`: the teachers never demonstrate one
    // without the other, so the rejected windows are shared too.
    notes: [
      {
        text:
          'Alternate slow window, review-only and not encoded: 424.50 → 434.80 (10.30s). ' +
          '"So I\'ll do three steps forward… And then I\'ll go back" — the cleanest single ' +
          'forward-and-back pair in the class, but far under the 20s floor and the moves ' +
          'are not yet named.',
        sourceVideo: 'MDEAN40DUVY',
        sourceStart: 424.5,
      },
      {
        text:
          'Alternate fast window, review-only and not encoded: 613.00 → 634.00 (21.00s), ' +
          'the `cc1-music-front` chapter — the front-camera equivalent of the published ' +
          'back-camera window. Shortest music chapter in the class, and it mixes all three ' +
          'moves.',
        sourceVideo: 'MDEAN40DUVY',
        sourceStart: 613.0,
      },
    ],
    flags: ['K1-d', 'K1-f'],
  },
  // Class 2 — La chica. `kind: 'turn'` and `base: 'al-centro'` from §2.1, the
  // class that defines it. Class 6's bonus chapter teaches the same turn out of
  // Guapea instead (§6.1 lists it there as a `step` on `base: 'guapea'`); that
  // is a second teaching source of one move, not a second move, so the kind and
  // base stay as the defining class set them.
  {
    id: 'la-chica',
    name: 'La chica',
    // `La Cica` is Class 6's spelling (@504.94, @515.22, @515.70), corroborated
    // in two other classes. `chick` / `chicky` are deliberately NOT here: they
    // are the rhythm vocalisation and would match every basic in the course.
    aliases: ['la chica', 'La Chica', 'Chica', 'chica', 'La Cica', 'la cica'],
    kind: 'turn',
    base: 'al-centro',
    summary:
      'The follower turns right on 5-6-7 while the leader keeps his basic. Led with the ' +
      'left arm up on 3 and a push with the right.',
    footwork:
      'The follower takes three steps of basic on 1, 2, 3 and then rotates to the right ' +
      'on 5, 6, 7. The leader changes nothing about his feet: he carries on with the ' +
      'basic the whole way through, "cheeky cheeky basic, cheeky cheeky hop", which is ' +
      'exactly what lets the two of them re-synchronise the moment she finishes her ' +
      'rotation. Note the count differs from the solo steps course on purpose: there the ' +
      'right turn was on 1, 2, 3 because it was taught from the man\'s side; here it is ' +
      'on 5, 6, 7 because it is the follower turning. Class 6 teaches the same turn from ' +
      'Guapea: 1-2-3 is the basic, 5-6-7 is the turn, and you end up back in Guapea.',
    cues: [
      {
        id: 'la-chica-lead-intro',
        text:
          'This course adds a second skill on top of the footwork: leading and following. ' +
          'The leader gives signals, the follower reads them.',
        role: 'both',
        kind: 'concept',
        sourceStart: 186.56,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'Now, there is additional skill we are learning during this course and we could ' +
          "call it leading and following. I'm giving signals, she's trying to interpret " +
          'the signals and react to them and follow.',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-1',
        beat: 3,
        text: 'On 3, your left arm goes up.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 203.54,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: 'On three, left arm goes up guys.',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-2',
        text: 'The raised arm is making space for her to turn.',
        role: 'leader',
        kind: 'concept',
        sourceStart: 206.52,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: 'We are creating space for girl to turn around.',
        confidence: 'transcript',
      },
      {
        // No `beat`. They count "One, two, three and push", which puts it on the
        // 4 — but 4 is a pause in this course's counting and they never say
        // "on four". `beat: 4` would be an invention (K2-g).
        id: 'la-chica-3',
        text: 'Second signal: push her with your right arm, straight after the 3.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 215.10,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'But the second signal I\'ll have to give is to give her a push with my right ' +
          'arm. + the count "One, two, three and push. Five, six, seven" @221.66',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-4',
        text: 'Push, and she starts rotating — you do not turn her.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 219.60,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: "I'm pushing, she starts rotating.",
        confidence: 'transcript',
      },
      {
        id: 'la-chica-5',
        beats: [1, 2, 3],
        text: 'Three steps of basic on 1, 2, 3.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 146.06,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: 'So from girl perspective, we have three steps of basic. 1, 2, 3.',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-6',
        beat: 5,
        text: 'Then rotate to the right on 5, 6, 7.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 150.62,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: 'And then rotation to the right on 5, 6, 7.',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-7',
        beats: [1, 2, 3, 5, 6, 7],
        text: 'Keep your basic going — your feet do not change.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 153.24,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'From guy point of view, when it comes to steps, we carry on only with basic. ' +
          '5, 6, 7. Cheeky, cheeky, basic. and cheeky cheeky basic.',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-8',
        text: 'His unbroken basic is what re-syncs you when she finishes the turn.',
        role: 'both',
        kind: 'concept',
        sourceStart: 166.20,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          "Thanks to that we can synchronize when she's done. She's finishing her " +
          'rotation, I continue with my basic, and then we get back to the same point.',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-9',
        text:
          'In the solo steps course the right turn was on 1, 2, 3, taught from the ' +
          'man\'s side. Here it is the follower turning, so it is on 5, 6, 7.',
        role: 'both',
        kind: 'concept',
        sourceStart: 132.10,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          "So the turn to the right was happening on 1, 2, 3. Here, from Lady's point of " +
          'view, turn is happening on 5, 6, 7.',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-10',
        text: 'Extend your left hand out and bring it back to his shoulder.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 235.72,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          "Ola is doing something with her left hand that is on my shoulder… we're " +
          'extending the hand out and then bringing it in. Tick, tick, boom. So she\'s ' +
          'hiding it in between our bodies, extending it and then it comes back to the ' +
          'shoulder.',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-11',
        text:
          'A follower who reads the signal turns on her own — the leader should not have ' +
          'to drag her round.',
        role: 'both',
        kind: 'concept',
        sourceStart: 316.70,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'I will be very lazy partner and turn. We can turn, yeah, one more time. And ' +
          "turn. Boom, boom, boom. She will do it. I don't have to drag her around, you " +
          'know what I mean? She knows what to do basically.',
        confidence: 'transcript',
      },
      // Class 6's bonus chapter. Numbering continues from Class 2, which owns
      // `la-chica-1..11` — the first draft of the spec numbered this block
      // 11..20 and collided (K6-f).
      {
        id: 'la-chica-12',
        text: 'La Chica in open position — promised in Class 5, taught here.',
        role: 'both',
        kind: 'context',
        sourceStart: 498.40,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'Now, plot twist. We told you last time that we will show you La Cica in open ' +
          "position and we've never done it so we will do it now.",
        confidence: 'transcript',
      },
      {
        id: 'la-chica-13',
        text: 'It is a very simple move and a very useful one.',
        role: 'both',
        kind: 'concept',
        sourceStart: 515.22,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'La Cica is a very simple term. It is a very useful move as well,',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-14',
        text: 'It buys you time to process and prepare the next move.',
        role: 'leader',
        kind: 'concept',
        sourceStart: 520.70,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'because it gives guys time to process and prepare for the next move.',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-15',
        text:
          'Guapea over and over gets boring, and then you freeze on what to do next. This ' +
          'is the way out.',
        role: 'leader',
        kind: 'concept',
        sourceStart: 527.56,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'going over and over the same step, it becomes boring at the same time. And ' +
          'then you think, what do I do next? What do I do next?',
        confidence: 'transcript',
      },
      {
        // A genuine "on three" — one of only three explicit beats in Class 6.
        id: 'la-chica-16',
        beat: 3,
        text: 'On 3, raise your left hand up.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 537.30,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'So all you have to do is raise your left hand up on three, and then she will ' +
          'do right turn.',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-17',
        text: 'Then do a right turn.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 539.38,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'and then she will do right turn',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-18',
        beats: [1, 2, 3],
        text: '1-2-3 is just the basic.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 563.60,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'So basically, one, two, three is basic, five, six, seven is turn. nothing funky.',
        confidence: 'transcript',
      },
      {
        id: 'la-chica-19',
        beats: [5, 6, 7],
        text: '5-6-7 is the turn. Nothing funky.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 565.50,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'So basically, one, two, three is basic, five, six, seven is turn. nothing funky.',
        confidence: 'transcript',
      },
      {
        // Deliberately does not name which right turn: the steps course has
        // four and the teachers say only "this right turn" (K6-g).
        id: 'la-chica-20',
        text: 'If the right turn is the hard part, it has its own video on the steps course.',
        role: 'both',
        kind: 'context',
        sourceStart: 548.06,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'Again, if you are struggling with this right turn, we\'ve done a video about it ' +
          "on our other course. I'll add again, card as usual.",
        confidence: 'transcript',
      },
      {
        id: 'la-chica-21',
        text: 'Kentucky goes straight after it, and it adds variety.',
        role: 'both',
        kind: 'context',
        sourceStart: 576.00,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'And then I reminded myself Kentucky, so I can do it. King, king, po, tum, tum, ' +
          'ping, and kum, kum, piggy. + "It adds a bit of variety to your dancing." @586.22',
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 2,
        videoId: 'np3g2IzZ11A',
        teachStart: 96.90,
        segmentIds: [
          'cc2-teach-la-chica-back',
          'cc2-teach-la-chica-front',
          'cc2-count-combo-front',
          'cc2-count-combo-back',
        ],
        clips: {
          slow: {
            src: '/clips/salsa/couples/la-chica-slow.mp4',
            sourceVideo: 'np3g2IzZ11A',
            start: 199.02,
            end: 233.86,
            aspect: '16/9',
            confidence: 'transcript',
            caveat:
              'This is the leading breakdown, not a clean demo: the teacher deliberately ' +
              "freezes at 'one, two, freeze' @201.12–202.32 to point at the arm, and " +
              'talks all the way through. It is published anyway because it is the only ' +
              'place in the class where the lead is demonstrated slowly, and the counted ' +
              "repetition at 221.66 ('One, two, three and push. Five, six, seven') and " +
              'the fluent one at 228.96 are both inside it.',
          },
          fast: {
            src: '/clips/salsa/couples/la-chica-fast.mp4',
            sourceVideo: 'np3g2IzZ11A',
            start: 781.46,
            end: 794.3,
            aspect: '16/9',
            label: 'Full tempo, with calls',
            confidence: 'transcript',
            caveat:
              'Cut from a review chapter, not a music chapter — Class 2 has none. The ' +
              'teachers call the move by name over the music rather than dancing it ' +
              'silently, and each window holds only 1–2 repetitions. 12.8–13.9s, under ' +
              'the 20s floor. Front camera, so the follower\'s turn is seen from behind ' +
              'her.',
          },
        },
      },
      {
        course: 'couples',
        classNumber: 6,
        videoId: 'yZ562-ehtQQ',
        teachStart: 498.40,
        segmentIds: ['cc6-teach-la-chica'],
        clips: {
          slow: {
            src: '/clips/salsa/couples/la-chica-open-slow.mp4',
            sourceVideo: 'yZ562-ehtQQ',
            start: 557.88,
            end: 575.62,
            aspect: '16/9',
            confidence: 'transcript',
            caveat:
              '17.7 seconds — under the 20-second floor, because the bonus chapter\'s two ' +
              'counted passes are only 10s and 12s long and the 9 seconds between them ' +
              'is a plug for another course. The first ~5.5s is the teachers announcing ' +
              'the camera change while already dancing, and it ends on the vocalised ' +
              "'nyu, nyu, nyu, and back' rather than a clean 8. Filmed deliberately from " +
              "the follower's side so you can see the turn.",
          },
          fast: null,
          missingReason:
            'The bonus chapter is the last teaching block in the class, so no music or ' +
            'review section follows it — the review at 394.42–498.40 predates it and its ' +
            "'La chica, hop' @420.08 is the close-position La Chica from Class 2, a " +
            "different thing. The move's full-tempo clip lives on its Class 2 teaching " +
            'source (window 9).',
        },
        note: 'The bonus chapter teaches the same turn out of Guapea, in open position.',
      },
    ],
    complete: true,
    notes: [
      {
        text:
          'Class 5 nearly teaches La Chica in Guapea, then stops: "No, we don\'t know it ' +
          'yet. Scrap it, next episode." The teachers do say that La Chica in open ' +
          'position and La Chica in closed position are very similar.',
        sourceVideo: '4KKAKgn8UZ4',
        sourceStart: 686.08,
      },
      {
        text:
          'Alternate slow window, review-only and not encoded: 106.78 → 118.68 (11.90s). ' +
          'The clean pre-breakdown demo, and it contains the lead called at tempo ("hand ' +
          'up push" @112.22). Half the 20s floor, one repetition.',
        sourceVideo: 'np3g2IzZ11A',
        sourceStart: 106.78,
      },
      {
        text:
          'Alternate slow window, review-only and not encoded: 644.52 → 691.80 (47.28s) — ' +
          'the whole-combo counted demo, three full repetitions (la chica @648.92, el chico ' +
          '@652.26, los dos @655.54, then 663.64/667.10/670.34 and 679.96/683.22/686.46), ' +
          'no music. Held back because it is a combo, not a single move, and it is 2.3s ' +
          'over the 45s target. Would be shared across all three Class 2 moves.',
        sourceVideo: 'np3g2IzZ11A',
        sourceStart: 644.52,
      },
      {
        text:
          'Alternate fast window, review-only and not encoded: 864.82 → 890.72 (25.88s) — ' +
          'the only full-tempo window in Class 2 that clears 20s, and it holds all three of ' +
          "this class's moves plus Class 1's. Held back because a focused 13s loop of the " +
          'right move beats a 26s loop in which the move you want occupies 3 seconds.',
        sourceVideo: 'np3g2IzZ11A',
        sourceStart: 864.82,
      },
      {
        text:
          'Alternate slow window for the Class 6 open-position teaching, review-only and ' +
          'not encoded: 537.30 → 547.68 (10.38s), the first counted pass, from the front. ' +
          'Half the required length; worth keeping because the published Class 6 window is ' +
          'not the front view.',
        sourceVideo: 'yZ562-ehtQQ',
        sourceStart: 537.3,
      },
    ],
    flags: ['K2-b', 'K2-f', 'K2-g', 'K6-f', 'K6-g', 'K6-l'],
  },
  // Class 2 — El chico. The R4 showcase: `el-chico-6` ("you lift it, not her")
  // and `el-chico-7` ("let your arm follow his") are about the same raised arm,
  // and merged they would read "lift the arm and let it follow", which is
  // incoherent. Split, they are two correct instructions to two people.
  {
    id: 'el-chico',
    name: 'El chico',
    aliases: ['el chico', 'El Chico', 'El chico', 'chico'],
    kind: 'turn',
    base: 'al-centro',
    summary:
      'The mirror: the leader turns left on 5-6-7 under his own raised arm while the ' +
      'follower keeps her basic.',
    footwork:
      'The mirror of la chica. The leader rotates to the left on 5, 6, 7, taking exactly ' +
      'one step outside and then two more to arrive back in front of his partner; he ' +
      'passes under the raised joined arms. The follower keeps her basic step going all ' +
      'the way through and changes nothing.',
    cues: [
      {
        id: 'el-chico-1',
        beat: 5,
        text: 'Rotate to the left on 5, 6, 7.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 374.32,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: 'and I rotate to the left on five six seven',
        confidence: 'transcript',
      },
      {
        id: 'el-chico-2',
        beats: [1, 2, 3, 5, 6, 7],
        text: 'Keep your basic step going the whole way through.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 343.34,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'and girls you keep your basic step in your feet (restated @369.44 "Ola is ' +
          'keeping her basic step all the way through")',
        confidence: 'transcript',
      },
      {
        id: 'el-chico-3',
        text: 'Only one step goes outside.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 383.28,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: 'make sure that only one step goes outside',
        confidence: 'transcript',
      },
      {
        id: 'el-chico-4',
        text: 'Then come back in front of your partner.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 386.20,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: 'and we come back in front of our partner',
        confidence: 'transcript',
      },
      {
        id: 'el-chico-5',
        text: 'This time you lift the arm for your own turn.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 418.44,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: "so this time I'm lifting arm up as well",
        confidence: 'transcript',
      },
      {
        id: 'el-chico-6',
        text: 'You lift it, not her — you need enough strength to raise your own arm.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 421.30,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'now it is important guys you do it not girls okay you have to have enough ' +
          'strength to lift your arm',
        confidence: 'transcript',
      },
      {
        id: 'el-chico-7',
        text: "Let your arm follow his. Don't try to rotate him.",
        role: 'follower',
        kind: 'lead',
        sourceStart: 429.26,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          "Your partner's arm will follow, but girls you are not trying to rotate the " +
          "guy. It's our own will to do it.",
        confidence: 'transcript',
      },
      {
        id: 'el-chico-8',
        text: 'Go under the arm and come back to where you started.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 436.86,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'And I just go under the arm, she just carries on with basic and we come back ' +
          'to original position.',
        confidence: 'transcript',
      },
      {
        id: 'el-chico-roles-1',
        text:
          "Don't reverse roles mid-dance — the follower doesn't start giving signals, " +
          'because she can\'t know what he was planning.',
        role: 'both',
        kind: 'concept',
        sourceStart: 442.58,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          "So it's not okay to reverse roles at this point that ladies suddenly are " +
          "starting giving signals to guys. No, because you simply don't know what he's " +
          'planning to do.',
        confidence: 'transcript',
      },
      {
        id: 'el-chico-roles-2',
        text:
          'Swapping which partner leads is fine in general; this course always has the ' +
          'guy leading, to keep it simple.',
        role: 'both',
        kind: 'concept',
        sourceStart: 462.72,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'we have leader and follower role. If you decide to swap, so like ladies ' +
          "leading and guys following, it's perfectly fine with us, not a problem. But " +
          "during this course we'll show you this simple way, just not to confuse you.",
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 2,
        videoId: 'np3g2IzZ11A',
        teachStart: 334.0,
        segmentIds: [
          'cc2-teach-el-chico-back',
          'cc2-teach-el-chico-front',
          'cc2-count-combo-front',
          'cc2-count-combo-back',
        ],
        clips: {
          slow: {
            src: '/clips/salsa/couples/el-chico-slow.mp4',
            sourceVideo: 'np3g2IzZ11A',
            start: 350.54,
            end: 367.34,
            aspect: '16/9',
            confidence: 'transcript',
            caveat:
              '16.8s — 3.2s under the 20s floor. Accepted: this is the only uninterrupted ' +
              'counted passage for El chico in the class. The 23.1s alternate is longer ' +
              'but has coaching over it.',
          },
          fast: {
            src: '/clips/salsa/couples/el-chico-fast.mp4',
            sourceVideo: 'np3g2IzZ11A',
            start: 746.48,
            end: 759.76,
            aspect: '16/9',
            label: 'Full tempo, with calls',
            confidence: 'transcript',
            caveat:
              'Cut from a review chapter, not a music chapter — Class 2 has none. The ' +
              'teachers call the move by name over the music rather than dancing it ' +
              'silently, and each window holds only 1–2 repetitions. 12.8–13.9s, under ' +
              'the 20s floor.',
          },
        },
      },
    ],
    complete: true,
    notes: [
      {
        text:
          'Alternate slow window, review-only and not encoded: 376.54 → 399.66 (23.12s). ' +
          'Over the floor and it contains the two best footwork lines ("make sure that only ' +
          'one step goes outside" @383.28), but the teacher coaches continuously, so it is a ' +
          'teach window rather than a demo.',
        sourceVideo: 'np3g2IzZ11A',
        sourceStart: 376.54,
      },
      {
        text:
          'Alternate slow window, review-only and not encoded: 644.52 → 691.80 (47.28s) — ' +
          'the whole-combo counted demo, three full repetitions, no music. Held back ' +
          'because it is a combo rather than a single move, and 2.3s over the 45s target.',
        sourceVideo: 'np3g2IzZ11A',
        sourceStart: 644.52,
      },
      {
        text:
          'Alternate fast window, review-only and not encoded: 864.82 → 890.72 (25.88s) — ' +
          'the only full-tempo window in Class 2 that clears 20s, holding all three of this ' +
          "class's moves plus Class 1's. Held back in favour of the focused 13s window.",
        sourceVideo: 'np3g2IzZ11A',
        sourceStart: 864.82,
      },
    ],
    flags: ['K2-b', 'K2-e', 'K2-f'],
  },
  // Class 2 — Los dos. "Lead is slightly different for it and this is the only
  // thing that we should really discuss" (@540.40) — the footwork is the easy
  // half, and `los-dos-6` is the cue that shows why an unnamed arm is dangerous.
  {
    id: 'los-dos',
    name: 'Los dos',
    // `lost dos` is Whisper inside the full-tempo review. `last time` (8× in the
    // corpus) is NOT here: it is the teachers saying "last time".
    aliases: ['los dos', 'Los dos', 'Los Dos', 'lost dos'],
    kind: 'turn',
    base: 'al-centro',
    summary:
      'Both turn simultaneously on 5-6-7 — she right, he left. Led by swapping to her ' +
      'right wrist and a dynamic push outside.',
    footwork:
      'Both turn at once on 5, 6, 7, the follower to her right and the leader to his ' +
      'left, so the two of them are in sync rather than one holding a basic for the ' +
      'other. Each takes one step out and then two more steps to get back to the ' +
      'original position. The footwork is the easy half; the lead is the part that ' +
      'differs, and the teachers say so — "Lead is slightly different for it and this is ' +
      'the only thing that we should really discuss" (@540.40).',
    cues: [
      {
        id: 'los-dos-1',
        beat: 5,
        text: 'Rotate to the right on 5, 6, 7.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 532.50,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          "Ola is rotating to the right, I'm rotating to the left. We do it " +
          'simultaneously. We do it both on 5-6-7.',
        confidence: 'transcript',
      },
      {
        id: 'los-dos-2',
        beat: 5,
        text: 'Rotate to the left on 5, 6, 7.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 534.56,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          "Ola is rotating to the right, I'm rotating to the left. We do it " +
          'simultaneously. We do it both on 5-6-7.',
        confidence: 'transcript',
      },
      {
        id: 'los-dos-3',
        text: 'You turn at the same time — neither of you holds a basic for the other.',
        role: 'both',
        kind: 'concept',
        sourceStart: 536.74,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: 'We do it simultaneously.',
        confidence: 'transcript',
      },
      {
        id: 'los-dos-4',
        text: "The footwork is the same idea as the other two; the lead is what's different.",
        role: 'both',
        kind: 'concept',
        sourceStart: 540.40,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'Lead is slightly different for it and this is the only thing that we should ' +
          'really discuss.',
        confidence: 'transcript',
      },
      {
        id: 'los-dos-5',
        text: 'After three steps, swap arms.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 545.58,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: "After three steps I'm swapping arms. 5-6-7. 1-2-3.",
        confidence: 'transcript',
      },
      {
        id: 'los-dos-6',
        text: 'Instead of holding her left hand, take the wrist of her right arm.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 552.54,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: 'So instead of holding her with my left, I grab wrist of her right arm with my arm',
        confidence: 'suspect',
        warning:
          "Whisper transcribed 'I grab wrist of her right arm with my arm' — the word " +
          'naming which of his arms is missing. The cue text does not name it. Do not ' +
          'fill it in without watching 552–558.',
        flag: 'K2-a',
      },
      {
        // The push is unnumbered here as in `la-chica-3` (K2-g).
        id: 'los-dos-7',
        text: 'Then push her outside — a dynamic push.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 559.04,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: 'and then I will give a push, quite dynamic push outside.',
        confidence: 'transcript',
      },
      {
        id: 'los-dos-8',
        beat: 5,
        text: 'Start your own rotation to the left as you push.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 562.34,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'At the same time I will start rotating to the left and she will start ' +
          'rotating to the right.',
        confidence: 'transcript',
      },
      {
        id: 'los-dos-9',
        text: 'One step out each, then two more steps back to where you started.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 575.68,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          "this time we're in sync going out only one step out for both of us and then " +
          'two more steps to get back to our original position.',
        confidence: 'transcript',
      },
      {
        id: 'los-dos-10',
        text: 'Count it: 1, 2, 3 and push, 5, 6, 7.',
        role: 'both',
        kind: 'rhythm',
        sourceStart: 567.76,
        sourceVideo: 'np3g2IzZ11A',
        verbatim: 'We start on five, one, two, three and push five, six, seven.',
        confidence: 'transcript',
      },
      {
        id: 'los-dos-combo-1',
        text:
          'The three moves are commonly danced straight after one another with no pause ' +
          'between.',
        role: 'both',
        kind: 'concept',
        sourceStart: 608.16,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'What we like to do quite often is to put these three moves in order without ' +
          "pauses in between. So we'll do la chica, el chico, los dos one by one. This is " +
          'very commonly used combination when we do classes in real life.',
        confidence: 'transcript',
      },
      {
        id: 'los-dos-combo-2',
        text:
          'The combination is a thinking drill, not a footwork drill — moving your feet ' +
          'in order is only half of it.',
        role: 'leader',
        kind: 'concept',
        sourceStart: 628.84,
        sourceVideo: 'np3g2IzZ11A',
        verbatim:
          'It demands from you guys to be relatively quick and to think quickly… Moving ' +
          'your feet in proper order is half of the problem, but working your brain on ' +
          'time, this is a lot more demanding action.',
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 2,
        videoId: 'np3g2IzZ11A',
        teachStart: 508.16,
        segmentIds: ['cc2-teach-los-dos', 'cc2-count-combo-front', 'cc2-count-combo-back'],
        clips: {
          // The best slow window in Class 2: 23.2s, three repetitions, counted
          // throughout, no freeze, and the lead is called inside it. No caveat.
          slow: {
            src: '/clips/salsa/couples/los-dos-slow.mp4',
            sourceVideo: 'np3g2IzZ11A',
            start: 583.4,
            end: 606.64,
            aspect: '16/9',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/los-dos-fast.mp4',
            sourceVideo: 'np3g2IzZ11A',
            start: 814.12,
            end: 827.98,
            aspect: '16/9',
            label: 'Full tempo, with calls',
            confidence: 'transcript',
            caveat:
              'Cut from a review chapter, not a music chapter — Class 2 has none. The ' +
              'teachers call the move by name over the music rather than dancing it ' +
              'silently, and each window holds only 1–2 repetitions. 12.8–13.9s, under ' +
              'the 20s floor.',
          },
        },
      },
    ],
    complete: true,
    notes: [
      {
        text:
          'Alternate slow window, review-only and not encoded: 644.52 → 691.80 (47.28s) — ' +
          'the whole-combo counted demo, three full repetitions (los dos @655.54, @670.34, ' +
          '@686.46), no music. Held back because it is a combo rather than a single move, ' +
          'and 2.3s over the 45s target.',
        sourceVideo: 'np3g2IzZ11A',
        sourceStart: 644.52,
      },
      {
        text:
          'Alternate fast window, review-only and not encoded: 864.82 → 890.72 (25.88s) — ' +
          'the only full-tempo window in Class 2 that clears 20s, holding all three of this ' +
          "class's moves plus Class 1's. Held back in favour of the focused 13.9s window.",
        sourceVideo: 'np3g2IzZ11A',
        sourceStart: 864.82,
      },
    ],
    flags: ['K2-a', 'K2-b', 'K2-c', 'K2-g'],
  },
  // Class 3 — Guapea. `base: 'basic-front-and-back'` is a cross-course base: the
  // teachers make the link themselves (`guapea-2`) and then immediately qualify
  // it, so the cue keeps the qualification. A user who assumes it *is* the solo
  // basic starts on the wrong foot.
  //
  // Cue order here is the spec's own numbering, which is transcript order. That
  // puts the follower first in four pairs (`-3`/`-4`, `-10`/`-11`, `-12`/`-13`,
  // `-17`/`-18`) because the teachers describe her side first. The ids are the
  // stable references, so they are not resequenced to put the leader first.
  {
    id: 'guapea',
    name: 'Guapea',
    // The accent forms are Whisper's, not the channel's — the chapter titles
    // write "Guapea" (K3-g).
    aliases: ['Guapea', 'guapea', 'guapéa', 'guapé'],
    kind: 'step',
    base: 'basic-front-and-back',
    summary:
      'The basic step in open position, holding one hand, with the free hands touching ' +
      'palm to palm on 5.',
    footwork:
      'The open-position basic. You stand a little apart, holding one hand — his left, ' +
      'her right, the same thumb grip as close position — with the free hands touching ' +
      'palm to palm on 5. Both partners start with the back foot and both continue ' +
      'forward, on opposite feet: he goes left back, right front, feet together, then ' +
      'right front, left back, together; she mirrors it starting right back. It is almost ' +
      'the solo basic front and back from the steps course, but not exactly — for the ' +
      'follower it is the identical step started in the opposite direction, and for the ' +
      'leader it is that step mirrored. She walks directly forward between his legs; he ' +
      'opens slightly outside. "Back, cheeky cheek — and front, cheeky puku."',
    cues: [
      {
        id: 'guapea-1',
        text:
          'Guapea is the basic step in open position — the position you spend most of ' +
          'your time in.',
        role: 'both',
        kind: 'concept',
        sourceStart: 183.94,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          "The step we just showed now is called guapé. It's a basic step in open " +
          'position. (+ "it\'s the position you are in more while dancing. It\'s an open ' +
          'position." @156.04)',
        confidence: 'transcript',
      },
      {
        id: 'guapea-2',
        text:
          'It is almost the solo basic front and back, but not exactly — same principle, ' +
          'slightly different.',
        role: 'both',
        kind: 'concept',
        sourceStart: 199.02,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          "because they are the same, or they're almost the same as the basic front and " +
          "back that we already taught you in one of the previous videos… It's based on " +
          "the same principle, but it's slightly different.",
        confidence: 'transcript',
      },
      {
        id: 'guapea-3',
        beat: 5,
        text: 'Exactly the solo step, started the other way: right foot back instead of left foot forward.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 221.08,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          "From a lady perspective, it's exactly the same step, but you started opposite " +
          'direction. So instead of going with the left forward, she starts with the right ' +
          'back, but it is exactly the same step.',
        confidence: 'transcript',
      },
      {
        id: 'guapea-4',
        beat: 5,
        text: 'Still start with the left leg, but go back with it instead of forward.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 248.40,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          'So you still can start with the left leg, but instead of going front with the ' +
          "left, you'll go back with the left.",
        confidence: 'transcript',
      },
      {
        id: 'guapea-5',
        beats: [5, 6, 7, 1, 2, 3],
        text: 'Left back, right front, feet together — then right front, left back, feet together.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 254.50,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: "So I'll go left back, right front together, and right front, left back together",
        confidence: 'transcript',
      },
      {
        id: 'guapea-6',
        text: 'You both start on the back foot and you both continue forward.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 263.82,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: 'So we both start with back foot and both continue forward.',
        confidence: 'transcript',
      },
      {
        id: 'guapea-7',
        text: 'You are on opposite feet throughout.',
        role: 'both',
        kind: 'concept',
        sourceStart: 270.36,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: "But we're going with opposite feet.",
        confidence: 'transcript',
      },
      {
        id: 'guapea-rhythm',
        text: '"Back, cheeky cheek — and front, cheeky puku."',
        role: 'both',
        kind: 'rhythm',
        sourceStart: 259.78,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: 'And back cheeky cheek and front cheeky puku.',
        confidence: 'transcript',
      },
      {
        id: 'guapea-8',
        text: 'In open position you stand a little apart.',
        role: 'both',
        kind: 'concept',
        sourceStart: 297.94,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          "Now, when we're standing opposite to each other, we are in a bit of distance.",
        confidence: 'transcript',
      },
      {
        id: 'guapea-9',
        text: 'Hold one hand only.',
        role: 'both',
        kind: 'arms',
        sourceStart: 304.70,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: "and we'll hold only one hand.",
        confidence: 'transcript',
      },
      // R4 split #1: one sentence, two different jobs for the same grip.
      {
        id: 'guapea-10',
        text: 'Keep holding his thumb, your fingers on top.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 307.24,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          "She's still holding my thumb, her fingers on top and my fingers are closing " +
          'the grip.',
        confidence: 'transcript',
      },
      {
        id: 'guapea-11',
        text: 'Close your fingers over hers to finish the grip.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 310.22,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          "She's still holding my thumb, her fingers on top and my fingers are closing " +
          'the grip.',
        confidence: 'transcript',
      },
      // R4 split #2, the one that would be catastrophic merged: "your free hand
      // goes on your hip / around your waist" are different placements, said in
      // one sentence.
      {
        id: 'guapea-12',
        text: 'Your free hand goes on your hip.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 315.54,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: 'second hand is free. Her is on the hip, mine will be around my waist as well.',
        confidence: 'transcript',
      },
      {
        id: 'guapea-13',
        text: 'Your free hand goes around your own waist.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 317.08,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: 'second hand is free. Her is on the hip, mine will be around my waist as well.',
        confidence: 'transcript',
      },
      // Legitimately `both`: each partner has exactly one free hand, the action
      // is identical, and neither side is told which hand. Not a merge.
      {
        id: 'guapea-14',
        beat: 5,
        text: 'Touch free hands, palm to palm, on 5.',
        role: 'both',
        kind: 'arms',
        sourceStart: 320.06,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          'Another thing that will happen with the second hand, we\'ll start touching it. ' +
          'So we\'ll go palm to palm and this touch will happen on five.',
        confidence: 'transcript',
      },
      {
        id: 'guapea-15',
        text: 'A touch, not a clap.',
        role: 'both',
        kind: 'arms',
        sourceStart: 327.98,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: "And it has to be touch not a clap. So it's not nothing like that, just simple touch.",
        confidence: 'transcript',
      },
      {
        id: 'guapea-16',
        text:
          "The reason it's a touch: later you catch that hand mid-move and continue on two " +
          'hands, and you cannot catch a clap.',
        role: 'leader',
        kind: 'concept',
        sourceStart: 333.82,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          'Why this touch is important? Because there will be moments that I will try to ' +
          'grab her hand and continue with the move with two hands. And if we just clap ' +
          "it, it's impossible to hold it.",
        confidence: 'transcript',
      },
      {
        id: 'guapea-17',
        beat: 5,
        text: 'Go back with the left.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 365.86,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: 'I go back with the left.',
        confidence: 'transcript',
      },
      {
        id: 'guapea-18',
        beat: 5,
        text: 'Go back with the right.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 366.68,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: 'She goes back with the right.',
        confidence: 'transcript',
      },
      {
        id: 'guapea-19',
        beats: [1, 2, 3],
        text: 'Walk directly forward, in between his legs.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 382.54,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: "She's going directly forward in between my legs.",
        confidence: 'transcript',
      },
      {
        id: 'guapea-20',
        beats: [1, 2, 3],
        text: 'Open slightly outside.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 386.74,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: 'One, two, three and I open slightly outside.',
        confidence: 'transcript',
      },
      // `kind: 'styling'` so it is never spoken in drill mode — two words with
      // no object is not something to drill.
      {
        id: 'guapea-21',
        text: 'Lower it.',
        role: 'both',
        kind: 'styling',
        sourceStart: 394.52,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: "One, two, let's lower, five, six, seven",
        confidence: 'suspect',
        warning:
          "The teacher says only 'let's lower' — two words inside a count. What to lower " +
          '(the knees, the body, the steps) is not stated anywhere in the class. Kept ' +
          'because it is real instruction; do not guess the object.',
        flag: 'K3-b',
      },
      // Class 4, chapters 8–9.
      {
        id: 'guapea-22',
        text:
          'There is an intermediate version where both partners go forward instead of ' +
          'back-and-front.',
        role: 'both',
        kind: 'concept',
        sourceStart: 380.20,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          'When we do our intermediate classes, we do Guapea forward this way, five, six, ' +
          'seven, and one, two, three, five, six, seven.',
        confidence: 'transcript',
      },
      {
        id: 'guapea-23',
        text:
          'That version needs a lot more leading and following practice — stay on the ' +
          'basic one.',
        role: 'both',
        kind: 'concept',
        sourceStart: 389.48,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          'This step requires a lot more leading and following practice. And before we ' +
          "get there, we'll stick to our basic version",
        confidence: 'transcript',
      },
      {
        id: 'guapea-24',
        text: 'The version you are using: both go back, then both go front.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 400.50,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          "we'll stick to our basic version when we go both back and both front. From " +
          "beginner perspective, this step is a lot easier, and we'll keep using it for " +
          'time being.',
        confidence: 'transcript',
      },
      {
        id: 'guapea-25',
        text: 'You can stay in Guapea as long as you like.',
        role: 'both',
        kind: 'concept',
        sourceStart: 438.08,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'We can stay in this step also for as long as we want.',
        confidence: 'transcript',
      },
      {
        id: 'guapea-26',
        text: 'At a party, staying in it too long gets boring.',
        role: 'both',
        kind: 'concept',
        sourceStart: 443.48,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'However, in the party setup, 5, 6, 7. It would be boring again.',
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 3,
        videoId: 'y6wC5uHfXG0',
        teachStart: 158.00,
        segmentIds: ['cc3-teach-guapea', 'cc3-teach-guapea-split', 'cc3-count-guapea'],
        clips: {
          // The best slow window in classes 1–7: 42.8s, counted throughout,
          // split-screen so both partners' feet are visible at once, and the
          // four best footwork observations in the class are inside it.
          slow: {
            src: '/clips/salsa/couples/guapea-slow.mp4',
            sourceVideo: 'y6wC5uHfXG0',
            start: 368.16,
            end: 410.98,
            aspect: '16/9',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/guapea-fast.mp4',
            sourceVideo: 'y6wC5uHfXG0',
            start: 873.42,
            end: 895.1,
            aspect: '16/9',
            confidence: 'transcript',
            caveat:
              "The first ~7s is the closed-position basic and one Dile que no ('be like " +
              "an o' @875.56) before Guapea proper begins at 880.74. From there it is " +
              "clean — 'left cheeky chick right cheeky puku' ×2 @884.08–890.62, then the " +
              'rhythm vocalisation.',
          },
        },
      },
      {
        course: 'couples',
        classNumber: 4,
        videoId: 'kg5Ztcp5xQU',
        teachStart: 375.06,
        segmentIds: ['cc4-teach-guapea-versions', 'cc4-teach-loop-practice'],
        clips: {
          slow: null,
          fast: null,
          missingReason:
            'Class 4 does not re-teach Guapea. Chapter 8 talks about the intermediate ' +
            'version without dancing it as a demo, and chapter 9 is about how long to ' +
            'stay in the step. The Guapea clips live on the Class 3 source.',
        },
        note:
          'Two chapters of context rather than a second teaching of the step: which ' +
          'version you are dancing, and when to leave it.',
      },
    ],
    complete: true,
    notes: [
      {
        text:
          'Alternate slow window, review-only and not encoded: 280.76 → 289.82 (9.06s). ' +
          'Three clean repetitions of "Back cheeky cheek and front cheeky puku" with no ' +
          'talking — the footwork-only demo, before the partners take hands. Less than a ' +
          'quarter of the published window.',
        sourceVideo: 'y6wC5uHfXG0',
        sourceStart: 280.76,
      },
    ],
    flags: ['K3-b', 'K3-e', 'K3-g', 'K4-l'],
  },
  // Class 3 — Dile que no. Four teaching sources, 37 cues, and the worst
  // Whisper mangling in the course by a wide margin: 27 distinct spellings
  // across these seven classes, correct twice (K3-a).
  {
    id: 'dile-que-no',
    name: 'Dile que no',
    // R1 in its hardest case. The six English-colliding prefixes are absent on
    // purpose: `D like`, `d like`, `be like a`, `d leg`, `leg and` and bare
    // `le cano` all match ordinary speech in these same transcripts ("if you
    // would like to get one"). Only full phrases ship (K3-a′).
    aliases: [
      'Dile que no',
      'dile que no',
      'Dile Cano',
      'Dile Kano',
      'Dile Keno',
      'Dilekano',
      'Dilekeno',
      'Dileka know',
      'Dilek En O',
      'D-Lekano',
      'D-Lek-N-O',
      'D-L-E-K-N-O',
      'D-L-A-K-E-N-O',
      'delay cano',
      'die lekeno',
      'Le Cano',
      'Le Canoe',
      'Lekano',
      'D like an off',
      'D like and hop',
      'D like I know',
      'D like a no',
      'D like Eno',
      'D like N',
      'D like N or',
      'D leg and O',
      'D legger',
      'd leg and',
      'be like an o',
      'be like an all',
      'be like and hop',
      'be like a knot',
      'leg and hop',
    ],
    kind: 'step',
    summary:
      'The position change: out of close position, she walks past him, both rotate left, ' +
      'and you land in Guapea facing each other.',
    footwork:
      'The change out of close position into Guapea. From one basic to the side, the ' +
      'leader steps left foot forward, right foot back, and opens with the left, which ' +
      'creates the space in front of him; at the same moment the follower goes back with ' +
      'the right, then front with the left and front with the right, into that space. He ' +
      'then takes three steps on the spot rotating his body to the left while she walks ' +
      'three steps forward, rotating left as well. He keeps the hand hold and releases ' +
      'the other hand. They end up facing each other, rotated, and start Guapea ' +
      'immediately. Dile que no reverses which side of the room each partner is on. ' +
      'From Class 5 on it is danced side to side instead of facing each other, and only ' +
      "the follower's direction of travel changes.",
    cues: [
      {
        id: 'dqn-1',
        text:
          'Dile que no is how you change from close position into the open position of ' +
          'Guapea.',
        role: 'both',
        kind: 'concept',
        sourceStart: 416.94,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          'Now, the clue of our class will be how to change positions, how to go from ' +
          'close position we showed you previously to open positions of Guapea step that ' +
          'we are showing you right now.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-2',
        text:
          'This is a deliberately simplified version. It is correct and it builds proper ' +
          'habits; better versions come later.',
        role: 'both',
        kind: 'concept',
        sourceStart: 477.80,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          "So when we show you this D-Lek-N-O step, we'll simplify it as well. This is " +
          "not the best way to do it. We are telling you it right now. And we'll show you " +
          "many better ways… but it's completely proper it's correct and it develops " +
          'proper habits',
        confidence: 'transcript',
      },
      {
        id: 'dqn-3',
        text: 'Start from one basic to the side, and stop.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 559.76,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          "now Dileka know, we'll do one basic to the side, five, six, seven, cheeky, " +
          'cheeky, open, cheeky, cheeky, stop.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-4',
        beat: 1,
        text: 'Left foot forward.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 566.36,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          'And from here, guys, you are going with the left foot forward and then with ' +
          'right back and we open with the left',
        confidence: 'transcript',
      },
      {
        id: 'dqn-5',
        beat: 2,
        text: 'Right foot back.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 572.26,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          'And from here, guys, you are going with the left foot forward and then with ' +
          'right back and we open with the left',
        confidence: 'transcript',
      },
      {
        id: 'dqn-6',
        beat: 3,
        text: 'Open with the left.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 573.28,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          'And from here, guys, you are going with the left foot forward and then with ' +
          'right back and we open with the left',
        confidence: 'transcript',
      },
      {
        id: 'dqn-7',
        beat: 1,
        text: 'At the same moment, go back with the right.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 582.40,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          "Okay, from a girl's perspective, at the same moment, she goes back with the " +
          'right, five, six, seven.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-8',
        beats: [1, 2, 3],
        text: 'Back with the right, front with the left, front with the right.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 586.12,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: 'Back with the right, front with the left, and front with the right.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-9',
        text: 'Those three steps are what create the space in front of you for her to walk into.',
        role: 'leader',
        kind: 'concept',
        sourceStart: 590.14,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          'And now, we created a bit of space in front of us. There is space for her to ' +
          'go in front of me. Okay, this is very important. We created this space for girls.',
        confidence: 'transcript',
      },
      {
        // `beats` read off the surrounding count, as on `-11`. K4-g records the
        // same read being made in Class 4.
        id: 'dqn-10',
        beats: [5, 6, 7],
        text: 'Three steps on the spot, rotating your body to the left.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 605.94,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          'Now I continue with three steps in a spot and I will rotate my body to the left.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-11',
        beats: [5, 6, 7],
        text: 'At the same time, walk forward and rotate your body to the left as well.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 611.06,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: "At the same time she'll walk forward and rotate her body to the left as well.",
        confidence: 'transcript',
      },
      {
        // The one `lead` cue in Class 3. Graded `transcript`, not `suspect`:
        // Class 1's frame determines the answer, and the deduction goes in the
        // warning rather than the cue text (K3-d).
        id: 'dqn-12',
        text: 'Keep the hand hold; let go with the other hand.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 615.10,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: "We keep holding the left hand, we'll let go the right one.",
        confidence: 'transcript',
        warning:
          "The teacher says 'the left hand' and 'the right one' without saying whose. " +
          "Read against Class 1's frame — his left hand holds hers (@274.44) and his " +
          "other hand is on her back (@279.14) — this is 'keep the hand hold, release the " +
          'hand on her back\'. The cue text avoids naming a side because the audio does ' +
          'not. Worth an eye-check at 615.',
        flag: 'K3-d',
      },
      {
        id: 'dqn-13',
        beats: [5, 6, 7],
        text: 'Walk, walk, walk — three steps.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 621.76,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: 'Walk, walk, walk. Three steps.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-14',
        text: 'You finish rotated towards her, facing each other.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 624.94,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: "I rotated towards her, we're facing each other.",
        confidence: 'transcript',
      },
      {
        id: 'dqn-15',
        text: 'From there, start Guapea straight away.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 627.94,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim: 'From here straight away we start Guapea.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-16',
        text:
          'Keep your own weight even in the moment you separate — you are a frame, not a ' +
          'support.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 522.32,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          'ladies what I said in the first video even when you do this move where you ' +
          "separate still keep your weight so your partner is not your support… you're a " +
          "frame not a support, you're a frame and you're keeping your own nice picture " +
          '(restated @547.10 "she\'s always dancing light… not dropping on me")',
        confidence: 'transcript',
      },
      {
        id: 'dqn-17',
        text: 'The hardest part is knowing when to start it.',
        role: 'both',
        kind: 'concept',
        sourceStart: 703.54,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          'What we notice is more the most difficult for our students when they are ' +
          'learning Dile Kano is the moment to start it.',
        confidence: 'transcript',
      },
      {
        // `kind: 'rhythm'` and not `concept`, deliberately: it is the timing
        // rule that makes every later move startable, so it must be spoken in
        // drill mode. The answer to `dqn-17`.
        id: 'dqn-18',
        text: 'Almost every action starts after the open step.',
        role: 'both',
        kind: 'rhythm',
        sourceStart: 709.84,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          "So it's a good habit or it's a good idea to remember that all actions or " +
          'majority of actions are starting after our open step. So cheeky cheeky open ' +
          'cheeky cheeky open and after I open then I go cheeky cheeky hop',
        confidence: 'transcript',
      },
      {
        id: 'dqn-19',
        text: "Dile que no reverses your positions — you end up on each other's side of the floor.",
        role: 'both',
        kind: 'concept',
        sourceStart: 730.30,
        sourceVideo: 'y6wC5uHfXG0',
        verbatim:
          'also Dile que no reverses the position so we started from this camera that I\'m ' +
          'looking at now you could see my back now you can see Ola\'s back okay and this ' +
          'is one of the aims as well',
        confidence: 'transcript',
      },
      // Class 4, chapter 3 — 56 seconds of nothing but leading, which is where
      // R3 starts paying off. Three of the four cues are `kind: 'lead'`.
      {
        // `beat: 1` is read across from Class 3's `dqn-4` (the leader's step
        // forward is the left foot on 1, @566.36) — a cross-class read, and the
        // one beat in this group that is safe.
        id: 'dqn-20',
        beat: 1,
        text: 'Step forward — your whole body is the signal.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 72.74,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          'The first element of leading Dilekano is me stepping forward and the whole of ' +
          'my body is giving the signal.',
        confidence: 'transcript',
      },
      {
        // No `beat`: "at this point" is the open step, which Class 3 puts on 3,
        // but the teachers never say a number for the push (K4-f, same family
        // as K2-g).
        id: 'dqn-21',
        text: 'Step forward, then open — and on the open, push.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 80.36,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'So I step forward and then open and at this point I give a push.',
        confidence: 'transcript',
      },
      {
        // A vocalisation that is a cue, unlike "cheeky cheeky": it names the
        // actions of the lead in order rather than singing the beat.
        id: 'dqn-22',
        text: '"Push! Take! Poco!"',
        role: 'both',
        kind: 'rhythm',
        sourceStart: 85.00,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'Push! Take! Poco!',
        confidence: 'transcript',
      },
      {
        id: 'dqn-23',
        beat: 5,
        text: 'You both start back into Guapea — and your wrist acts as you go.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 87.02,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'When we land in Guapea we both start back but the wrist is acting as well.',
        confidence: 'transcript',
        warning:
          "'the wrist is acting' — the teacher does not say whose wrist. He is describing " +
          "his own lead from the leader's point of view throughout this chapter, and the " +
          "wrist in question is the one holding her hand, so this is read as the leader's. " +
          'Worth an eye-check at 90.58.',
      },
      // Class 5, chapter 3 — the chapter that rewrites Class 3.
      {
        id: 'dqn-24',
        text:
          'Until now Dile que no started facing each other. From now on you do it side to ' +
          'side.',
        role: 'both',
        kind: 'concept',
        sourceStart: 62.50,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'First thing we have to discuss is Dile Cano. So far Dile Cano we were showing ' +
          "you was starting from here facing each other now. We'll do it being side to side.",
        confidence: 'transcript',
      },
      {
        id: 'dqn-25',
        text: 'Your hand still rests on his shoulder.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 77.40,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'The setup is very similar her hand is still lying on my shoulder we can pass ' +
          'the second hand in front',
        confidence: 'transcript',
      },
      {
        // The R4 rule producing its intended outcome: a hand cue that cannot be
        // assigned to a role is not silently assigned to one.
        id: 'dqn-26',
        text: 'The second hand can pass in front.',
        role: 'both',
        kind: 'arms',
        sourceStart: 79.80,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'The setup is very similar her hand is still lying on my shoulder we can pass ' +
          'the second hand in front',
        confidence: 'suspect',
        warning:
          "'we can pass the second hand in front' — the teacher does not say whose second " +
          'hand. Both partners have one free hand at this point and either reading is ' +
          'grammatical. Unlike the other whose-hand cases in this part, nothing elsewhere ' +
          'in the course disambiguates it. Never spoken in drill mode; eye-check at 80.',
        flag: 'K5-c',
      },
      {
        id: 'dqn-27',
        text: "The steps are exactly the same — only the follower's direction of travel changes.",
        role: 'both',
        kind: 'footwork',
        sourceStart: 87.88,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'Steps are exactly the same, but the direction of walk from girl point of view ' +
          'is different.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-28',
        beat: 5,
        text: 'Start with the right leg going back, exactly as before.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 93.32,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'So she will start with the right leg going back like she did, but after three ' +
          'steps she will rotate to the left and still continue walking forward, but ' +
          'different direction.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-29',
        text:
          'After three steps, rotate to the left and keep walking forward — in a different ' +
          'direction.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 96.02,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'So she will start with the right leg going back like she did, but after three ' +
          'steps she will rotate to the left and still continue walking forward, but ' +
          'different direction.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-30',
        text:
          "The facing-each-other version isn't really used socially. It was only a way to " +
          'get into position.',
        role: 'both',
        kind: 'context',
        sourceStart: 116.06,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'It is very important to mention at this point that the version of the Le Cano ' +
          "that we showed you previously, it's not really used when we are dancing " +
          'socially. We just used it as a way to get into position we are here now.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-31',
        text:
          'From here on, nearly every move begins or ends with a Dile que no and leaves ' +
          'you side to side. Facing each other will be rare.',
        role: 'both',
        kind: 'concept',
        sourceStart: 167.48,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'Why is it important? Because now all the moves that we are going to show you, ' +
          'they will end up or begin with Dile Cano or some version of Dile Cano and ' +
          "we'll be next to each other. It will be very very rare that we'll be facing " +
          'each other. If it happens we\'ll point it out',
        confidence: 'transcript',
      },
      // Class 6, from the chapter titled "Summary / Outro" that is not one
      // (K6-a). This is the follower's arm, and it is a rule for every move.
      {
        id: 'dqn-32',
        beat: 1,
        text: 'As you step back for the Dile que no, lift your hand up on 1.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 604.68,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'So when they are stepping back for the Lekano, this is the moment to lift ' +
          'their hand up on one.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-33',
        text: 'Make it a habit. It pays off in the long term.',
        role: 'follower',
        kind: 'concept',
        sourceStart: 610.56,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'And it is quite good to develop it as a habit. It definitely helps in long term.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-34',
        text: 'Learn how to get that hand out of the way.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 619.22,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'You have to learn how to get this hand out of the way.',
        confidence: 'transcript',
      },
      {
        id: 'dqn-35',
        text: 'Finish with your hand lying on top of his shoulder. Always.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 623.06,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: "So to finish with your hand, always lying on top of guy's shoulder.",
        confidence: 'transcript',
      },
      {
        // `role: 'both'` and legal under R4: the teachers name both sides in the
        // third person, so there is no "your hand" for a reader to misread.
        id: 'dqn-36',
        text: "Default position: guy's hand on the bottom, girl's hand on top.",
        role: 'both',
        kind: 'concept',
        sourceStart: 342.32,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: "default position. Guy's hand on the bottom, girl's hand on top.",
        confidence: 'transcript',
      },
      {
        id: 'dqn-37',
        text: 'The other way round feels tense. It will feel natural once you have danced longer.',
        role: 'both',
        kind: 'concept',
        sourceStart: 641.78,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          "It feels all right. And if it's opposite, it's pretty tense. + \"when you dance " +
          'longer, you\'ll realize that this is very natural" @636.96',
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 3,
        videoId: 'y6wC5uHfXG0',
        teachStart: 417.00,
        segmentIds: [
          'cc3-teach-dile-que-no',
          'cc3-teach-dile-que-no-steps',
          'cc3-count-dile-que-no',
        ],
        clips: {
          // 22.8s, inside the target band, counted, no music, one clean Dile que
          // no into three repetitions of Guapea. No caveat.
          slow: {
            src: '/clips/salsa/couples/dile-que-no-slow.mp4',
            sourceVideo: 'y6wC5uHfXG0',
            start: 653.04,
            end: 675.8,
            aspect: '16/9',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/dile-que-no-fast.mp4',
            sourceVideo: 'y6wC5uHfXG0',
            start: 814.38,
            end: 842.3,
            aspect: '16/9',
            confidence: 'transcript',
            caveat:
              "One repetition of Dile que no (@824.02, 'D like and hop'). That is " +
              'inherent — it is a position change, so it happens once per pass and then ' +
              'you are in Guapea. The teacher counts and coaches over the music: \'Keep a ' +
              "basic for a bit longer' @818.14, 'Get ready go' @825.38. The last ~5s is " +
              'Guapea, not Dile que no.',
          },
        },
      },
      {
        course: 'couples',
        classNumber: 4,
        videoId: 'kg5Ztcp5xQU',
        teachStart: 56.44,
        segmentIds: ['cc4-teach-leading-dile-que-no'],
        clips: {
          slow: null,
          fast: null,
          missingReason:
            'Class 4 chapter 3 is 56 seconds of leading, explained on a standing couple ' +
            'and inside single passes rather than in a repeated demo — there is no ' +
            'counted or full-tempo window of the move itself. The Dile que no clips live ' +
            'on the Class 3 source.',
        },
        note: 'The leading chapter: the body signal, the push and the wrist.',
      },
      {
        course: 'couples',
        classNumber: 5,
        videoId: '4KKAKgn8UZ4',
        teachStart: 62.50,
        segmentIds: ['cc5-teach-dile-que-no-side'],
        clips: {
          slow: null,
          fast: null,
          missingReason:
            'The side-to-side chapter re-teaches the shape by talking through the ' +
            'difference from Class 3, not by demonstrating it counted; the class\'s own ' +
            'clip windows both belong to El Uno. The Dile que no clips live on the Class ' +
            '3 source, which shows the facing-each-other version — the one this chapter ' +
            'supersedes.',
        },
        note:
          'The chapter that rewrites Class 3: from here on the move is danced side to ' +
          'side, and the facing version is only a teaching device.',
      },
      {
        course: 'couples',
        classNumber: 6,
        videoId: 'yZ562-ehtQQ',
        teachStart: 596.72,
        segmentIds: ['cc6-teach-default-hands', 'cc6-music'],
        clips: {
          slow: null,
          fast: null,
          missingReason:
            'Class 6 states the follower default hand position but never demonstrates it ' +
            'in isolation — it is spoken over a static two-person frame, not danced. The ' +
            'Dile que no clips live on the Class 3 source.',
        },
        note: 'The chapter is titled "Summary / Outro" and is not one. See K6-a.',
      },
    ],
    complete: true,
    notes: [
      {
        text:
          'Class 5 shows a Dile que no that keeps hold of the partner instead of letting ' +
          'go — "I didn\'t let her go in the Dile Cano. So Dile Cano and stay with ' +
          'partner." Deferred to a later class.',
        sourceVideo: '4KKAKgn8UZ4',
        sourceStart: 724.94,
      },
      {
        text:
          'Alternate slow window, review-only and not encoded: 681.02 → 701.88 (20.86s) — ' +
          'the second run, announced as "we\'ll do it one more time but this time we\'ll ' +
          'start sign to you" @677.94. Anchored at both ends and inside the target band. ' +
          'Held back only because the published window is 1.9s longer and starts from the ' +
          'basic; this is a genuinely equal alternative.',
        sourceVideo: 'y6wC5uHfXG0',
        sourceStart: 681.02,
      },
    ],
    flags: [
      'K3-a',
      'K3-a′',
      'K3-d',
      'K4-f',
      'K4-l',
      'K5-c',
      'K5-h',
      'K6-a',
      'K6-h',
      'K6-m',
    ],
  },
  // Class 4 — Enchufla. The one move id shared with the steps course: this
  // object carries only the couples teaching source and cues `enchufla-8..22`,
  // continuing from steps Class 4's `enchufla-1..7`. `COUPLES_MOVES` never
  // merges with `SALSA_MOVES`, so the two sources cannot be joined from inside
  // this fragment — see the report note.
  //
  // `Enchufla Doble` and `Enchufla Tripla` are deliberately NOT separate move
  // ids. The teachers state at @243.40 that the name carries the repetition
  // count, and that sentence ships as `enchufla-22`.
  {
    id: 'enchufla',
    name: 'Enchufla',
    // Raw Whisper drops the initial "en" in the large majority of cases. The
    // number-prefixed forms (`2 flat`, `2 flas`, `fly`) are safe inside this
    // corpus — every occurrence was checked — but a normaliser rule for them
    // must require the digit or a following doble/tripla/hop (K4-a, K4-c).
    aliases: [
      'Enchufla',
      'enchufla',
      'chufla',
      'Chufla',
      'and chufla',
      'an chufla',
      'chuffla',
      'chuflas',
      'ciufla',
      'enchu flá',
      'enchu flá doble',
      'enchu flá tripla',
      'two flat',
      '2 flat',
      'flat',
      '2 flas',
      'flas',
      'fly',
      'Enchufla Doble',
      'Enchufla Triple',
      'Enchufla, triple',
      'small enchufla',
      'very tiny enchufla',
    ],
    kind: 'step',
    base: 'basic-side',
    summary:
      'Both partners rotate in opposite directions and swap places, holding one hand, the ' +
      'leader passing behind her back and blocking with his right hand.',
    footwork:
      'From Guapea, holding one hand — his left, her right, the Guapea grip. Both ' +
      'partners rotate, in opposite directions, mirroring each other: he goes back with ' +
      'the left foot on 5, she goes back with the right. His hand swings a little down, ' +
      'then up in front of her face, and rotates; at the same time he travels behind her ' +
      'back, and his right hand stops her and blocks. The count is "one, two, three and ' +
      'block, six, seven", repeated as many times as called. Her free hand goes up and ' +
      'outside on each repetition.',
    cues: [
      {
        id: 'enchufla-8',
        text:
          'You know how to get from close position to open. Enchufla is how you get all ' +
          'the way back.',
        role: 'both',
        kind: 'context',
        sourceStart: 105.34,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          'Now we landed in open position, we know how to swap from close to open, now ' +
          "we'll have to go all the way back.",
        confidence: 'transcript',
      },
      // The sentence that justifies sharing the move id with the steps course.
      {
        id: 'enchufla-9',
        text: 'It is the Enchufla from the beginners steps course, done as a couple.',
        role: 'both',
        kind: 'concept',
        sourceStart: 136.92,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          "if you check our beginner steps classes, we've done a Enchufla step and we'll " +
          'show you how it works as a couple.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-10',
        text: 'You both rotate, in opposite directions.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 143.28,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: "So we'll both rotate and we'll both rotate opposite direction.",
        confidence: 'transcript',
      },
      {
        id: 'enchufla-11',
        beat: 5,
        text: 'Go back with the left foot.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 146.80,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          "I'll go back with the left foot, she'll go back with the right and we'll kind " +
          'of mirror each other.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-12',
        beat: 5,
        text: 'Go back with the right foot.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 148.66,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          "I'll go back with the left foot, she'll go back with the right and we'll kind " +
          'of mirror each other.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-13',
        text: 'You mirror each other.',
        role: 'both',
        kind: 'concept',
        sourceStart: 150.32,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: "and we'll kind of mirror each other.",
        confidence: 'transcript',
      },
      // R4 split out of one mangled clause. Whisper renders "so my left head
      // right"; the reading is "my left, her right", which Class 3's
      // `guapea-10`/`-11` independently establish. Not graded `suspect` — two
      // passages agree, and the mangling stays visible in `verbatim` (K4-d).
      {
        id: 'enchufla-14',
        text: 'Hold one hand only — your left, the same hand as in Guapea.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 178.76,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: "so i'm holding only one hand the same hand as in guapea so my left head right",
        confidence: 'transcript',
      },
      {
        id: 'enchufla-15',
        text: 'Give your right hand, as in Guapea.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 183.14,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: "so i'm holding only one hand the same hand as in guapea so my left head right",
        confidence: 'transcript',
      },
      {
        id: 'enchufla-16',
        text: 'Swing that hand down, then up in front of her face, and rotate.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 184.14,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'the hand is swinging going a bit down and then in front of her face and rotating.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-17',
        text: 'At the same time, travel behind her back.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 189.24,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'Now at the same time I go behind her back',
        confidence: 'transcript',
      },
      {
        // No `beat`: "one, two, three and block, six, seven" puts the block in
        // the slot that would be 4, but the teachers never say 4 and Class 1
        // established 4 as a pause (K4-f).
        id: 'enchufla-18',
        text: 'Your right hand stops her and blocks, straight after the 3.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 193.22,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'and my right hand will stop her and block. One, two, three and block six, seven.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-19',
        text: 'Free hand up, and outside.',
        role: 'follower',
        kind: 'styling',
        sourceStart: 207.78,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          'Ola is styling this freehand. It goes up and outside and up and outside and up ' +
          'and outside.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-20',
        text: '"Tick, ticky, poku."',
        role: 'both',
        kind: 'rhythm',
        sourceStart: 220.20,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'tick, ticky, poku and 1, 2, 3 and 5',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-21',
        text:
          'Fine at a party — but cap it at about three repeats or your partner will get ' +
          'bored.',
        role: 'both',
        kind: 'concept',
        sourceStart: 227.78,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          'Okay, you can use this move on the party. If you do it as many times as we did ' +
          'now, probably your partner will get disappointed. Ideally we would like to ' +
          'limit this to, let\'s say, maximum three repeats.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-22',
        text:
          'The name carries the count: Enchufla once, Enchufla doble twice, Enchufla ' +
          'tripla three times.',
        role: 'both',
        kind: 'concept',
        sourceStart: 243.40,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          "when we call this move, we call it enchu flá, and we add the number of repeats " +
          "after. If it's only enchu flá, it's one repetition. Enchu flá doble, we do it " +
          'twice. Enchu flá tripla, we do it three times.',
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 4,
        videoId: 'kg5Ztcp5xQU',
        teachStart: 131.26,
        segmentIds: [
          'cc4-teach-enchufla-presentation',
          'cc4-teach-enchufla',
          'cc4-count-enchufla',
        ],
        clips: {
          // Filenames are the manifest's, not the spec's proposed
          // `enchufla-couples-*.mp4`: the cut files live under
          // `/clips/salsa/couples/`, so the directory already keeps them apart
          // from the steps course's `enchufla-slow.mp4` (K4-m).
          slow: {
            src: '/clips/salsa/couples/enchufla-slow.mp4',
            sourceVideo: 'kg5Ztcp5xQU',
            start: 189.24,
            end: 220.18,
            aspect: '16/9',
            confidence: 'transcript',
            caveat:
              "Class 4 has no count chapter, so this is cut from the 'Enchufla - " +
              "explanation' teach block and the teachers narrate over it. The counted " +
              "repetitions are 195.4–207.2 ('One, two, three and block, six, seven' ×3) " +
              "and the follower's styling repetitions are 209.5–218.4. Filmed from the " +
              "angle the teachers themselves call 'a bit weird perspective' (@131.90) — " +
              'they are turned away from the usual front camera so the rotation is visible.',
          },
          fast: {
            src: '/clips/salsa/couples/enchufla-fast.mp4',
            sourceVideo: 'kg5Ztcp5xQU',
            start: 569.28,
            end: 589.8,
            aspect: '16/9',
            confidence: 'transcript',
            caveat:
              "The teacher calls over the music — 'and one and Enchufla triple' @573.28, " +
              "then 'One and Enchufla hop' / 'two and Enchufla hop' / 'three and Enchufla " +
              "hop, finish' @576.34–584.74, which is three clean repetitions and exactly " +
              'what the clip is for. The last ~4.5s (585.3–589.8) has no speech; the ' +
              'dancers are resetting between passes. Trim to 585.34 if the reset looks ' +
              'wrong on screen — that costs 4.5s and puts the clip under the 20s floor.',
          },
        },
        note:
          'The couples version of the solo step from steps Class 4. Filmed from an ' +
          'unusual angle, announced at 131.90 as "a bit weird perspective".',
      },
    ],
    complete: true,
    notes: [
      {
        text:
          'Alternate slow window, review-only and not encoded: 258.04 → 268.20 (10.16s). ' +
          'Three clean counted repetitions with no explanation over them, and the best ' +
          'demonstration of what "tripla" means. Held back for length only — less than half ' +
          'the 20s floor.',
        sourceVideo: 'kg5Ztcp5xQU',
        sourceStart: 258.04,
      },
      {
        text:
          'Alternate slow window, review-only and not encoded: 337.06 → 370.42 (33.36s), ' +
          'the side view (`cc4-count-loop-side`), announced as "then you\'ll see side of us ' +
          'during Enchufla" @337.06. Counted throughout, and the angle is arguably better ' +
          'for the pass-behind. Held back because it is a full-loop demo in which Enchufla ' +
          'is one element.',
        sourceVideo: 'kg5Ztcp5xQU',
        sourceStart: 337.06,
      },
    ],
    flags: ['K4-a', 'K4-c', 'K4-d', 'K4-e', 'K4-f', 'K4-l', 'K4-m'],
  },
  // Class 4 — Enchufla al Centro. Closes the basic salsa loop the course has
  // been building since Class 1.
  {
    id: 'enchufla-al-centro',
    name: 'Enchufla al Centro',
    // Bare `al centro` is deliberately absent: that is the Class 1
    // close-position step, 37 raw mentions in this sense across these seven
    // classes. The most dangerous R1 collision in the part (K4-b, K4-k).
    aliases: [
      'Enchufla al Centro',
      'enchufla al centro',
      'chufla al centro',
      'Chufla al centro',
      'an chufla al centro',
      'and chufla double one al centro',
      'ciufla doble al centro',
      'aisle central',
      'two flat center',
      'L centro',
      'fly al centro',
      '2 flas doble al centro',
      'two flat doble al centro',
      'two flat triple al centro',
      'Enchufla Doble al Centro',
      'Enchufla Triple al Centro',
    ],
    kind: 'step',
    base: 'enchufla',
    summary:
      'Half an Enchufla: swap places on 1-2-3, then pull her in and close the position ' +
      'over three steps, landing back in the basic to the side.',
    footwork:
      'The way back from open position to close position, and the last piece of the basic ' +
      'salsa loop. On the final repetition of an Enchufla you do only half of it: you swap ' +
      'places on 1, 2, 3. Then instead of continuing, the leader pulls her towards himself ' +
      'and both take three steps — not on the spot, travelling towards each other so the ' +
      'position closes. From there you are in the basic to the side: "chiki cheeky left, ' +
      'and cheeky cheeky right."',
    cues: [
      {
        id: 'enchufla-al-centro-1',
        text: 'Enchufla al Centro is how you get from open position back into close position.',
        role: 'both',
        kind: 'concept',
        sourceStart: 273.54,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          'so how to do enchufla al centro the last repetition we are doing and we do ' +
          'only half of it',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-al-centro-2',
        text: 'On the last repetition, do only half of the Enchufla.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 277.80,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          'so how to do enchufla al centro the last repetition we are doing and we do ' +
          'only half of it',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-al-centro-3',
        beats: [1, 2, 3],
        text: 'Swap places on 1, 2, 3.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 282.58,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'so we swap places on 1 2 3 5 6 7. One, two, three.',
        confidence: 'transcript',
      },
      {
        // `beats` on `-4` and `-5` are read off the surrounding count (the pull
        // follows "One, two, three" @286.08 and the class counts "5 6 7" for the
        // second half @283.84), not stated for these actions individually. Same
        // read as `dqn-10`/`-11`; disclosed as K4-g.
        id: 'enchufla-al-centro-4',
        beats: [5, 6, 7],
        text: 'Then pull her towards you.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 289.46,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'And after that I pull her to myself. Step, step, step.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-al-centro-5',
        beats: [5, 6, 7],
        text: 'Three steps — not on the spot; travel towards each other so the position closes.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 291.38,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          'Step, step, step. Three steps, not really stationary, kind of closing position ' +
          'towards each other.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-al-centro-6',
        text: 'From there you are in the basic to the side.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 298.44,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'And from here we start our basic side. Chiki, cheeky left and cheeky, cheeky right.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-al-centro-7',
        text: '"Chiki cheeky left, and cheeky cheeky right."',
        role: 'both',
        kind: 'rhythm',
        sourceStart: 300.84,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'And from here we start our basic side. Chiki, cheeky left and cheeky, cheeky right.',
        confidence: 'transcript',
      },
      {
        id: 'enchufla-al-centro-8',
        beat: 1,
        text: 'The al centro lands you in close position, back at the first step.',
        role: 'both',
        kind: 'concept',
        sourceStart: 455.82,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: '5, al centro. 1, close position. Pull her closer. And we land in the first step again.',
        confidence: 'transcript',
      },
      // Kept alongside `-4`, which has the mechanism: this is the two-word
      // imperative the teacher calls at tempo, which is what a drill wants.
      {
        id: 'enchufla-al-centro-9',
        text: 'Pull her closer.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 457.32,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim: 'Pull her closer.',
        confidence: 'transcript',
      },
      {
        // Sourced from the outro, a `skip` segment. Deliberate: `sourceStart` is
        // a timestamp, not a segment reference, and this is the sentence that
        // names what the whole course has been building.
        id: 'enchufla-al-centro-10',
        text:
          'This completes the basic salsa loop: close position, do something in it, open ' +
          'position, Guapea, then back to the beginning.',
        role: 'both',
        kind: 'concept',
        sourceStart: 734.54,
        sourceVideo: 'kg5Ztcp5xQU',
        verbatim:
          'So we can complete now the basic salsa loop. So start from close position, do ' +
          'something in it, open position, turn into Guapea, and then come back to the ' +
          'beginning.',
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 4,
        videoId: 'kg5Ztcp5xQU',
        teachStart: 256.76,
        segmentIds: [
          'cc4-teach-enchufla-al-centro',
          'cc4-teach-loop',
          'cc4-count-loop',
          'cc4-count-loop-side',
          'cc4-teach-loop-practice',
          'cc4-count-loop-practice',
        ],
        clips: {
          slow: {
            src: '/clips/salsa/couples/enchufla-al-centro-slow.mp4',
            sourceVideo: 'kg5Ztcp5xQU',
            start: 309.26,
            end: 331.78,
            aspect: '16/9',
            confidence: 'transcript',
            caveat:
              "Cut from the 'Open - close position loop' teach block — Class 4 has no " +
              'count chapter. Counted throughout with no music, and it contains two ' +
              "Enchufla al Centro passes (@318.60 'two flat doble al centro hop' and " +
              "@323.36 'two flat pull step step step'), but it is a full-loop demo, so it " +
              "also contains Guapea and a Dile que no. The teacher says 'nice one' in the " +
              'last 0.5s.',
          },
          fast: {
            src: '/clips/salsa/couples/enchufla-al-centro-fast.mp4',
            sourceVideo: 'kg5Ztcp5xQU',
            start: 699.5,
            end: 728.3,
            aspect: '16/9',
            confidence: 'transcript',
            caveat:
              'Cut from the review chapter rather than the music chapter, because the ' +
              'review contains the reversed split-screen angle the teachers announce at ' +
              "687.52 ('reverse camera, split it') and at 696.02 ('I don't think we ever " +
              "showed this step from this perspective'). The teacher calls throughout: " +
              "'and 2 flat triple, al centro, Go' @709.42–711.12, then three repetitions " +
              "and 'king, king, cuckoo' ×4. Ends on 'great.'",
          },
        },
      },
    ],
    complete: true,
    notes: [
      {
        text:
          'Not to be confused with `al-centro`, the close-position basic from Class 1. In ' +
          'this class the bare calls "5, al centro." @454.04 and "Al centro go." @574.80 ' +
          'both mean this move\'s ending, not that step — which is why bare "al centro" is ' +
          'not an alias here. See K4-b.',
        sourceVideo: 'kg5Ztcp5xQU',
        sourceStart: 454.04,
      },
      {
        text:
          'Alternate slow window, review-only and not encoded: 273.54 → 300.80 (27.26s) — ' +
          'the better explanation, the worse loop. In at "so how to do enchufla al centro" ' +
          '@273.54; entirely about this move (the half-repetition, the swap on 1-2-3, the ' +
          'pull, the three closing steps). Held back because it is talk-led rather than ' +
          'counted, and a followable counted demo was the priority. A strong candidate if a ' +
          'reviewer disagrees.',
        sourceVideo: 'kg5Ztcp5xQU',
        sourceStart: 273.54,
      },
      {
        text:
          'Alternate slow window, review-only and not encoded: 463.10 → 498.80 (35.70s), ' +
          '`cc4-count-loop-practice`. Counted, no music, and it contains three different al ' +
          'centro calls (@471.32, @486.10, and the "cheeky cheeky cuckoo" finish). Held back ' +
          'for being more loop than move, and it is 0.7s over the 35s comfortable ceiling.',
        sourceVideo: 'kg5Ztcp5xQU',
        sourceStart: 463.1,
      },
    ],
    flags: ['K4-b', 'K4-g', 'K4-h', 'K4-j', 'K4-k'],
  },
  // Class 5 — El Uno. The first open-position move, and the class with the
  // cleanest clip shape in the part: a real `count` chapter for the slow grain
  // and the first official short for the fast one.
  {
    id: 'el-uno',
    name: 'El Uno',
    // `a lunatic` @441.46 is "1, el uno tick" — the one mangling in the course
    // that shares no substring with the move name, so no fuzzy matcher will
    // ever find it (K5-e). Bare `uno` is safe across these seven transcripts.
    aliases: [
      'El Uno',
      'el uno',
      'el, uno',
      'uno',
      'l uno',
      'L, uno',
      'eluno',
      'luno',
      'a luno',
      'a lunatic',
      'Aruno',
    ],
    kind: 'step',
    base: 'guapea',
    summary:
      'The first open-position move: from Guapea, swap to a right-to-right and ' +
      'left-to-left two-hand hold, swing the arms, swap places twice with Enchuflas, ' +
      'lift the right hand over her head, and finish into a Dile que no.',
    footwork:
      'Start from Guapea, both partners going back on 5. On 7 the hands swap: right hand ' +
      'to right hand, and you finish holding both her hands, right to right and left to ' +
      'left. The leader twists her wrist and starts bending it behind her back. The arms ' +
      'swing in both directions and you swap places with an Enchufla — the step from ' +
      'Class 4 — always travelling in opposite directions, on opposite feet. After one ' +
      'loop left and right the leader lifts his right hand up and over her head, you swap ' +
      'places again, and the last swap is a very tiny Enchufla. You end up next to each ' +
      "other, his right hand on her right shoulder and her left hand on his left. He then " +
      'resets the hold — left in front, right sliding to the closer shoulder — and the ' +
      'move finishes with a Dile que no back into Guapea. The arm change happens *during* ' +
      'the Dile que no, not after it.',
    cues: [
      {
        id: 'el-uno-1',
        text: 'You have moves in close position, but none in open position yet.',
        role: 'both',
        kind: 'context',
        sourceStart: 41.30,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'we showed you how to open position and how to do couple of moves in close ' +
          "position, but what we don't have yet are any moves in open position. And today " +
          "we'll change that.",
        confidence: 'transcript',
      },
      {
        id: 'el-uno-2',
        text:
          'It is the first and easiest open-position move — which is why it is called El ' +
          'Uno, "the one".',
        role: 'both',
        kind: 'concept',
        sourceStart: 48.44,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          "We'll teach you the first one, the easiest one, and because it's the first one " +
          "it's called l uno so just one.",
        confidence: 'transcript',
      },
      {
        id: 'el-uno-3',
        beat: 5,
        text: 'Start from Guapea, both going back.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 196.56,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim: 'We start with Guapea, both going back. Five, six, seven, back cheeky cheek.',
        confidence: 'transcript',
      },
      {
        // The only cue in classes 1–7 with a beat the teachers state outright
        // for a lead action: "So on seven…". No derivation, no surrounding-count
        // read — the number is in the sentence.
        id: 'el-uno-4',
        beat: 7,
        text: 'On 7, swap hands — right to right.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 205.46,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          "So on seven, first thing is happening, we're swapping hands, we are right to " +
          'the right.',
        confidence: 'transcript',
      },
      {
        id: 'el-uno-5',
        text: 'Then twist her wrist and start bending it behind her back.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 210.24,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim: 'Now after that, I will twist her wrist and start bending it behind her back.',
        confidence: 'transcript',
      },
      {
        // `both` and legitimately so: "right to the right, left to the left" is
        // symmetric, so there is no possessive limb reference that differs by
        // role. Contrast `-17`/`-18`, which had to be split.
        id: 'el-uno-6',
        text: 'You end up holding both hands: right to right, left to left.',
        role: 'both',
        kind: 'arms',
        sourceStart: 238.20,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          "I'm holding both of her hands this is your left yeah and this is her right so " +
          'we are right to the right left to the left',
        confidence: 'transcript',
      },
      {
        id: 'el-uno-7',
        text: 'The hands swing, in both directions.',
        role: 'both',
        kind: 'arms',
        sourceStart: 239.96,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim: 'hands are going in swing motion both directions and we are swapping places.',
        confidence: 'transcript',
      },
      {
        id: 'el-uno-8',
        text: 'You swap places.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 244.46,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim: 'hands are going in swing motion both directions and we are swapping places.',
        confidence: 'transcript',
      },
      {
        // The `verbatim` keeps the teachers' live self-correction, because a
        // reader checking the cross-course reference needs to see that they
        // corrected themselves rather than that this was mis-transcribed.
        id: 'el-uno-9',
        text: 'The swap is an Enchufla — the step from Class 4.',
        role: 'both',
        kind: 'concept',
        sourceStart: 245.76,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'Now we are swapping places with an Enchufla step, the one that we showed you in ' +
          "the previous class. So if you haven't watched it, bing, bing, bing, class " +
          'number three. No, that was class number four. Class number four, watch it ' +
          'again, come back to this video.',
        confidence: 'transcript',
      },
      {
        id: 'el-uno-10',
        text: "Relax your elbows and let the arms swing. Don't fight it.",
        role: 'follower',
        kind: 'arms',
        sourceStart: 265.72,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'Now from girl perspective, it is very important to relax your elbows. Let it ' +
          "swing. So it shouldn't be fighting.",
        confidence: 'transcript',
      },
      {
        id: 'el-uno-11',
        text: 'Never lift her arm up — it hurts.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 279.30,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'When I was younger, I used to use this move fighting with my younger brothers. ' +
          "So I know that if you do this and lift it up, it hurts. So we don't want to do " +
          'that.',
        confidence: 'transcript',
      },
      {
        id: 'el-uno-12',
        text: 'You always travel in opposite directions.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 285.20,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim: 'Thing number two, we are always traveling opposite direction.',
        confidence: 'transcript',
      },
      {
        id: 'el-uno-13',
        text:
          'Travelling the same way is wrong in almost any salsa setup: by default you are ' +
          'on opposite feet, travelling opposite directions.',
        role: 'both',
        kind: 'concept',
        sourceStart: 296.24,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'This is completely incorrect and it is incorrect almost in any setup in salsa. ' +
          'By default we should be on opposite foot traveling opposite direction.',
        confidence: 'transcript',
      },
      {
        id: 'el-uno-14',
        text: 'After one loop left and right, lift your right hand up and over her head.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 317.68,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          "After one loop to the left and to the right, the right hand, I'm going to lift " +
          'it up and move it over her head.',
        confidence: 'transcript',
      },
      {
        id: 'el-uno-15',
        text: 'You swap places again.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 328.74,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim: 'We swap places again',
        confidence: 'transcript',
      },
      {
        id: 'el-uno-16',
        text: 'The last swap is a very tiny Enchufla.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 330.48,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim: 'and then this last one is very tiny enchufla. Very tiny enchufla.',
        confidence: 'transcript',
      },
      {
        id: 'el-uno-17',
        text: 'Your right hand goes on her right shoulder.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 337.86,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'We end up next to each other with right hand going on her right shoulder, left ' +
          'hand going on my left.',
        confidence: 'transcript',
      },
      {
        id: 'el-uno-18',
        text: 'Your left hand goes on his left shoulder.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 339.78,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'We end up next to each other with right hand going on her right shoulder, left ' +
          'hand going on my left.',
        confidence: 'transcript',
        warning:
          "The teacher says 'left hand going on my left' without naming whose left hand. " +
          "Read as the follower's left hand on the leader's left shoulder, which is " +
          "consistent with @77.40 in this same class ('her hand is still lying on my " +
          "shoulder'). Worth an eye-check at 340.",
        flag: 'K5-d',
      },
      {
        id: 'el-uno-19',
        text: 'Let it go — as you finish you change the hand setup.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 341.42,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim: "I let it go but when we're finished we're changing hands setup.",
        confidence: 'transcript',
      },
      {
        id: 'el-uno-20',
        text: 'Left hand in front, right hand sliding to the closer shoulder.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 346.02,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          "So left is going in front, right will slide to my closer shoulder and then " +
          "we'll do the Le Cano.",
        confidence: 'transcript',
      },
      {
        id: 'el-uno-21',
        text: 'Then do the Dile que no.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 350.30,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          "So left is going in front, right will slide to my closer shoulder and then " +
          "we'll do the Le Cano.",
        confidence: 'transcript',
      },
      {
        id: 'el-uno-22',
        text: 'A lot happens at once. It comes quickly.',
        role: 'both',
        kind: 'concept',
        sourceStart: 359.80,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'Quite complicated. A lot of things happening at the same time, but you get used ' +
          'to them quickly.',
        confidence: 'transcript',
      },
      {
        id: 'el-uno-23',
        text: 'The up-and-down arm drill is for practice only. Never do it while actually dancing.',
        role: 'both',
        kind: 'concept',
        sourceStart: 399.40,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          'Never do it if you are not practicing. In dancing, this is horrible. But for ' +
          "practicing purposes, it's very important because you need to develop habit of " +
          "avoiding each other's heads.",
        confidence: 'transcript',
      },
      {
        id: 'el-uno-24',
        text: "The point of it is to stop you bumping into your partner's head.",
        role: 'both',
        kind: 'concept',
        sourceStart: 409.68,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim: "We don't want to bump into the heads of our partners. That's ridiculous.",
        confidence: 'transcript',
      },
      {
        id: 'el-uno-25',
        text: 'Change the arms *during* the Dile que no, not after it.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 424.44,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim:
          "You've seen in the previous repeat when I started doing it, Ola was already " +
          'starting doing the Dilek En O. And this is the right way to do it. So we start ' +
          'changing our arms during the Dilek En O.',
        confidence: 'transcript',
      },
      {
        id: 'el-uno-26',
        text: 'All of it runs fluently, without stopping between parts.',
        role: 'both',
        kind: 'concept',
        sourceStart: 433.52,
        sourceVideo: '4KKAKgn8UZ4',
        verbatim: 'So this all is happening very fluently.',
        confidence: 'transcript',
      },
      // The only cross-class cue in Part 1: a cue on a Class 5 move whose
      // `sourceVideo` is the Class 6 video. Class 6 therefore carries a clipless
      // source below, so the per-source partition cannot drop it (K6-h).
      {
        id: 'el-uno-27',
        text:
          'The same timing rule applies to El Uno: lift early and you have a massive ' +
          'distance from her head; lift late and it does not work.',
        role: 'leader',
        kind: 'rhythm',
        sourceStart: 282.20,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'actually we should mention exactly the same with eluno yeah so with eluno you ' +
          'have exactly the same story if you start lifting arm up now. It\'s super safe, ' +
          'massive distance from her head. But if you miss the moment and start lifting it ' +
          "now, it doesn't work.",
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 5,
        videoId: '4KKAKgn8UZ4',
        teachStart: 194.40,
        segmentIds: ['cc5-teach-el-uno', 'cc5-count-el-uno', 'cc5-count-el-uno-angle'],
        clips: {
          // No caveat: 31s, counted throughout, no music, two complete passes
          // with the calls. The best slow clip in classes 1–7. It does contain a
          // Dile que no call at 464.90 — that is the move's own ending
          // (`el-uno-21`), not contamination (K5-f).
          slow: {
            src: '/clips/salsa/couples/el-uno-slow.mp4',
            sourceVideo: '4KKAKgn8UZ4',
            start: 440.16,
            end: 471.1,
            aspect: '16/9',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/el-uno-fast.mp4',
            sourceVideo: 'qwR89NAQgqM',
            start: 0.0,
            end: 31.414,
            aspect: '9/16',
            confidence: 'transcript',
            caveat:
              'The official short. No spoken count — it is a music-only demo, so there is ' +
              'nothing to listen for. A burned-in graphic covers roughly the bottom quarter ' +
              "of the frame ('CLASS 5 / EL UNO') and the top strip ('BEGINNERS SALSA " +
              "MOVES'); the dancers' feet clear the bottom banner in the frames sampled, " +
              'but only just. 720×1280, so it will upscale.',
          },
        },
      },
      {
        course: 'couples',
        classNumber: 6,
        videoId: 'yZ562-ehtQQ',
        teachStart: 282.20,
        segmentIds: ['cc6-teach-extra'],
        clips: {
          slow: null,
          fast: null,
          missingReason:
            'Class 6 does not re-teach El Uno. It adds one timing rule to it in passing, ' +
            'inside the Kentucky "Extra information" chapter.',
        },
        note:
          'Not a teaching source for the move — a single cross-reference. The El Uno clips ' +
          'live on the Class 5 source.',
      },
    ],
    complete: true,
    notes: [
      {
        text:
          'Alternate slow window, review-only and not encoded: 479.30 → 510.60 (31.30s), ' +
          'the opposite-angle counted demo from `cc5-count-el-uno-angle`. Held back because ' +
          'it runs the whole loop — al centro, Dile que no, Guapea, El Uno, Enchufla doble ' +
          'al centro — rather than El Uno alone, and the teacher opens it with "I\'m not sure ' +
          'if this one is helpful" @473.72, which is a fair self-assessment.',
        sourceVideo: '4KKAKgn8UZ4',
        sourceStart: 479.3,
      },
      {
        text:
          'Alternate fast window, review-only and not encoded: 557.70 → 587.50 (29.80s), ' +
          'from the music chapter. Two El Uno passes at tempo with the teacher calling over ' +
          'the music. Kept because it is landscape 16/9 and shows the same room as the slow ' +
          'clip, so a reviewer who dislikes the vertical short with the banner over the ' +
          'floor has a real alternative.',
        sourceVideo: '4KKAKgn8UZ4',
        sourceStart: 557.7,
      },
    ],
    flags: ['K5-d', 'K5-e', 'K5-f', 'K5-h', 'K6-h'],
  },
  // Class 6 — Kentucky. Three Enchuflas without ever changing hands. The only
  // move name in the course with no manglings in the audio at all: all 21
  // occurrences across all 21 transcripts are spelled correctly.
  {
    id: 'kentucky',
    name: 'Kentucky',
    // The one alias comes from outside the audio — the misspelling in the
    // YouTube *title* of the official short. Its own burned-in banner reads
    // KENTUCKY (K6-k).
    aliases: ['Kentucky', 'kentucky', 'Kentukcy'],
    kind: 'step',
    base: 'guapea',
    summary:
      'Three Enchuflas in a row without ever changing hands: touch and keep her second ' +
      'hand, take the top hand overhead while the bottom hand stays joined, lift the right ' +
      'hand onto your own left shoulder, then left hand up into a hook turn while she ' +
      'steps in a spot, and out through a Dile que no.',
    footwork:
      'Start from Guapea, exactly as you would for El Uno, but this time the hands never ' +
      'change. On the Kentucky, touch her second hand and keep hold of it: this is the ' +
      'case the earlier classes warned about, where touching a hand means you then use ' +
      'both. Go into an Enchufla still holding her left hand. The top hand travels ' +
      'overhead while the bottom hand stays joined, and you come back with a second ' +
      'Enchufla on exactly the same hand setup. By now his right and her left are relaxed ' +
      'in front of you both, and his left is on her shoulder. On the third Enchufla, on ' +
      '6-7, the right hand goes up — and then that same right hand lands on his own left ' +
      'shoulder. This is the tricky moment. The left hand goes up, he does a hook turn ' +
      'while she takes three steps in a spot, he releases the right hand and moves it ' +
      'behind her back, and it runs straight out into a Dile que no. The feet are the same ' +
      'Enchufla pattern throughout; everything that changes is the hands.',
    cues: [
      {
        id: 'kentucky-1',
        text: 'You need the Enchufla step and the hook turn before this one.',
        role: 'both',
        kind: 'context',
        sourceStart: 44.68,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'You have to know Enchufla step that you probably already know learning El Uno ' +
          'with us before. And you need to know also hook turn.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-2',
        text: 'Start from Guapea, the same as El Uno.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 65.72,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'We start from Guapea again, so the same as we did with Aruno.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-3',
        text: 'Unlike El Uno, the hands never change. It is still built on the Enchufla.',
        role: 'both',
        kind: 'concept',
        sourceStart: 70.86,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'But this time we are not changing hands. However, move is based on Enchufla again.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-4',
        text: 'Touch her second hand — and keep hold of it.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 83.78,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'Five, six, seven, one, two, Kentucky. Now touch second hand and I hold it.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-5',
        text: 'Do not release the second hand.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 86.88,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'We are not releasing second hand, so this is one of these moments about which ' +
          "we told you in previous classes that when we touch the hand, we'll actually use " +
          'both.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-6',
        text: 'This is the case the earlier classes warned about: touch the hand and you then use both.',
        role: 'both',
        kind: 'concept',
        sourceStart: 94.14,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: "when we touch the hand, we'll actually use both.",
        confidence: 'transcript',
      },
      {
        // The only `suspect` cue in Class 6. The cue text states the hold and
        // omits the position rather than guessing it.
        id: 'kentucky-7',
        text: 'Go into an Enchufla, still holding her left hand.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 96.52,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'We start again with enchufla, holding the left hand on the knee. One, two, three.',
        confidence: 'suspect',
        warning:
          "The teacher says 'holding the left hand on the knee' (@99.40). Two things are " +
          'unclear. (1) Whose left hand — read as hers, on the evidence of @111.02 in the ' +
          "same class, 'my right and her left are kind of relaxed in front of us'. (2) 'on " +
          'the knee\' is unresolved: it recurs elsewhere in the course in the same Enchufla ' +
          'context (see K6-d) and is not obviously either a hand position or a count, so ' +
          'the height of the held hand is deliberately not stated in the cue text. ' +
          'Eye-check at 97.',
        flag: 'K6-c',
      },
      {
        id: 'kentucky-8',
        text: 'The top hand goes overhead — the bottom hand stays joined.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 102.46,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'It goes overhead, but we are holding the bottom hand and we come back with ' +
          'another enchufla with exactly the same hand setup.',
        confidence: 'transcript',
      },
      {
        // `beat` from the "Five, six, seven" spoken as the second Enchufla is
        // danced, immediately after the instruction — the weaker kind of anchor.
        id: 'kentucky-9',
        beat: 5,
        text: 'Come back with a second Enchufla, on exactly the same hand setup.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 104.98,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'we come back with another enchufla with exactly the same hand setup. Five, six, ' +
          'seven.',
        confidence: 'transcript',
      },
      {
        // No follower counterpart, on purpose: the teachers described one joined
        // pair of hands from one side rather than giving her a separate
        // instruction, so mirroring it would be invention (K6-e).
        id: 'kentucky-10',
        text: 'Your right hand and her left stay relaxed, in front of you both.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 111.02,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'So now, my right and her left are kind of relaxed in front of us.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-11',
        text: 'Your left hand goes on her shoulder. Keep it there.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 166.46,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'Take second hand. Left goes on her shoulder. Keep it there.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-12',
        beats: [6, 7],
        text: 'On 6-7, lift your right hand up.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 187.70,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'Six, seven, right hand goes up on my left shoulder, hop and one, two, three and ' +
          'five, six, seven.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-13',
        text: 'The lift belongs to the third Enchufla, not the first two.',
        role: 'both',
        kind: 'concept',
        sourceStart: 119.80,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          "With the next enchufla, I'll move the right hand up. Five, six, seven, one, " +
          'two, three.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-14',
        text: 'That same right hand lands on your own left shoulder.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 127.72,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'Now, the same right hand will land on my left shoulder.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-15',
        text: 'This is the tricky moment. Pay attention here.',
        role: 'both',
        kind: 'concept',
        sourceStart: 131.34,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'This is a tricky moment. Pay attention.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-16',
        text: 'Take your left hand up.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 133.74,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: "Left hand will go up and I'll do hook turn. She will do three steps in a spot.",
        confidence: 'transcript',
      },
      {
        id: 'kentucky-17',
        text: 'Do a hook turn.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 135.92,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: "Left hand will go up and I'll do hook turn. She will do three steps in a spot.",
        confidence: 'transcript',
      },
      {
        // One of only two explicit follower instructions in 590 seconds of
        // teaching (K6-e); the other is the mis-labelled outro block.
        id: 'kentucky-18',
        text: 'Three steps in a spot — step, step, step.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 137.26,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'She will do three steps in a spot. Step, step, step.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-19',
        text: 'Release your right hand and move it behind her back.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 141.22,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'I will release the right hand, move it behind her back and start dilating off.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-20',
        text: 'Straight out into the Dile que no.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 145.46,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'start dilating off. One, two, three and five, six, seven.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-21',
        text: 'All of it runs fluently.',
        role: 'both',
        kind: 'concept',
        sourceStart: 150.82,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim: 'And all of this is again very, very fluent.',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-22',
        text: 'Hands pass overhead several times. Never lift them too high.',
        role: 'leader',
        kind: 'arms',
        sourceStart: 249.88,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'there are many moments when hands are going overhead. We are not lifting them ' +
          "too high up. That's one thing that I should say definitely.",
        confidence: 'transcript',
      },
      {
        id: 'kentucky-23',
        text: 'There is exactly one right moment to lift the hand — when you have the space.',
        role: 'leader',
        kind: 'rhythm',
        sourceStart: 257.12,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'Now there is only one a right moment also to lift this hand up and it\'s right ' +
          'now we have space',
        confidence: 'transcript',
      },
      {
        id: 'kentucky-24',
        text: 'Miss that moment and start lifting late, and it lands straight on her head.',
        role: 'leader',
        kind: 'rhythm',
        sourceStart: 274.38,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          'if you miss the moment one and start lifting it now it lands directly on ' +
          "girl's head you don't want that",
        confidence: 'transcript',
      },
      {
        id: 'kentucky-25',
        text:
          'It is not enough to do the move in the right order — it has to be on the right ' +
          'foot at the right moment in the music.',
        role: 'both',
        kind: 'concept',
        sourceStart: 300.04,
        sourceVideo: 'yZ562-ehtQQ',
        verbatim:
          "So it's not only about doing the move in the right order, but actually doing it " +
          'on the right foot in the right moment in music. Then it will work for sure.',
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 6,
        videoId: 'yZ562-ehtQQ',
        teachStart: 63.62,
        segmentIds: [
          'cc6-teach-kentucky',
          'cc6-teach-kentucky-side',
          'cc6-count-kentucky',
          'cc6-teach-extra',
        ],
        clips: {
          // No caveat, and one thing was checked rather than assumed: "And the
          // last time without music" @227.10 reads like a warning that the first
          // half has music under it. `silencedetect` says both passes are dry
          // (K6-b).
          slow: {
            src: '/clips/salsa/couples/kentucky-slow.mp4',
            sourceVideo: 'yZ562-ehtQQ',
            start: 209.92,
            end: 241.4,
            aspect: '16/9',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/kentucky-fast.mp4',
            sourceVideo: 'V57F7c5R5jY',
            start: 0.0,
            end: 40.534,
            aspect: '9/16',
            confidence: 'transcript',
            caveat:
              'The official short. Music only, no spoken count — there is nothing to listen ' +
              "for. A burned-in graphic covers the top strip ('BEGINNERS SALSA MOVES') and " +
              "roughly the bottom quarter of the frame ('CLASS 6 / KENTUCKY'); the dancers' " +
              'feet clear the bottom banner in the frames sampled, but only just. 720×1280, ' +
              "so it will upscale. Note that the short's YouTube title misspells the move " +
              "as 'Kentukcy'.",
          },
        },
      },
    ],
    complete: true,
    notes: [
      {
        text:
          'Alternate slow window, review-only and not encoded: 159.64 → 197.60 (37.96s), the ' +
          'side view. Two full passes with the hands clearly visible from the side, and the ' +
          'calls name every action. Held back only because it is instruction-with-calls ' +
          'rather than a clean counted demo, and the teacher breaks the fourth wall at the ' +
          'end ("My microphone doesn\'t like when I move my hand around my chest"). ' +
          'Genuinely competitive with the published window for a learner who wants to see ' +
          'the hands.',
        sourceVideo: 'yZ562-ehtQQ',
        sourceStart: 159.64,
      },
      {
        text:
          'Alternate fast window, review-only and not encoded: 367.72 → 392.94 (25.22s), the ' +
          'landscape 16/9 alternative to the short. Three passes at tempo with the teacher ' +
          "calling over the music. The option for anyone who rejects the vertical short's " +
          'banner.',
        sourceVideo: 'yZ562-ehtQQ',
        sourceStart: 367.72,
      },
    ],
    flags: ['K6-b', 'K6-c', 'K6-d', 'K6-e', 'K6-k', 'K6-m'],
  },
  // Class 7 — Vacilala por la mano. The only class in Part 1 with zero suspect
  // cues and zero warnings, and not by luck: the teachers split the explanation
  // into "let's discuss girls steps maybe first" (@88.90), "Now from guy point
  // of view" (@163.26) and "Now from arm perspective" (@190.82), so almost every
  // instruction says whose limb it is before it starts. R4 has nothing to catch.
  {
    id: 'vacilala-por-la-mano',
    name: 'Vacilala por la mano',
    // "Vacilala" is never audible in the class — the canonical spelling rests on
    // the playlist title, the short's title and the short's burned-in banner
    // (K7-a). Every mangling destroys the first word and keeps the tail, so the
    // list is headed by the bare tail `por la mano`, which is safe across all 21
    // couples transcripts. Bare `Basila` / `Vasila` is NOT here: that is a
    // different move, taught in Class 14 (K7-b).
    aliases: [
      'por la mano',
      'Por la mano',
      'porla mano',
      'Porla Mano',
      'Portla, Mano',
      'Laporte Lamano',
      'Laporte, La Mano',
      'La Porte, La Mano',
      'Lepore Lamanu',
      'For la mano',
      'for la mano',
      'Vacilala por la mano',
      'Vacílala por la mano',
      'vacillala por la mano',
      'Vacila por la mano',
      'Vasila la por la mano',
      'Basila por la mano',
      'Basilla por la mano',
      'basila la por la mano',
      'Basila La Por La Mano',
      'Basilala por la mano',
      'Basilola por la mano',
      'Basila La Porla Mano',
      'Basila Laporte Lamano',
      'basi lala for la mano',
    ],
    kind: 'step',
    base: 'guapea',
    summary:
      'The first move where the follower starts *forward* on 1: the leader preps by ' +
      'opening his body right and taking up tension, pulls her forward past him, loops ' +
      'his hand up and over her head, and lands her in a Dile que no. A right turn, but ' +
      'travelling from his left side to his right.',
    footwork:
      'Start from Guapea. The first difference from every other move so far is that the ' +
      'follower starts on 1 with the right foot forward. To prepare her, the leader takes ' +
      'up a bit of tension as he touches and opens his body to the right; she makes a ' +
      'small prep to the left. Then he pulls forward and she walks: right front, left ' +
      'front, right — and on that third step she begins twisting the opposite way, so her ' +
      'foot has already turned before she finishes it. On 5 the next step is with the left ' +
      'foot, travelling the opposite direction from the first three: those came towards ' +
      'him and past his left, this one goes away on his right. Two more walking steps ' +
      'towards his right foot, and she lands in the Dile que no position, and they do a ' +
      "full Dile que no. The leader's own footwork is only 1-2-3, 5-6-7 — which does not " +
      'mean he can stop moving his feet. His hands do the work: pull forward so the joined ' +
      'hand comes in front of him, lift, and make a small loop over her head, then loop ' +
      'her around and bring the hand down into the Dile que no. Her arm holds the same ' +
      'shape the whole way through. It is still a right turn, but unlike La Chica she ' +
      'travels from his left side to his right.',
    cues: [
      {
        id: 'vplm-1',
        text: 'Start from Guapea.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 44.68,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          'We start with Guapea. Five, six, seven, and now the first difference between ' +
          "this step and all other steps we've done so far…",
        confidence: 'transcript',
      },
      {
        id: 'vplm-2',
        beat: 1,
        text: 'On 1, step forward with your right foot. Every other move so far started back.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 55.58,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          'girls will start on one with the right foot forward. One, two, three, and five, ' +
          'six, stop.',
        confidence: 'transcript',
      },
      {
        id: 'vplm-3',
        text: 'As you touch her hand, create a bit of tension.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 66.98,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          'So to prepare our partner for this move, when I touch I create a bit of tension ' +
          'and I open my body to the right',
        confidence: 'transcript',
      },
      {
        id: 'vplm-4',
        text: 'Open your body to the right.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 69.82,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          'So to prepare our partner for this move, when I touch I create a bit of tension ' +
          'and I open my body to the right',
        confidence: 'transcript',
      },
      {
        id: 'vplm-5',
        text: 'Make a small prep to the left.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 72.00,
        sourceVideo: 'pZChl5ylSJw',
        verbatim: "and she also did small prep to the left. We'll show that one more time.",
        confidence: 'transcript',
      },
      {
        id: 'vplm-6',
        text: 'She walks forward because you pull forward.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 85.62,
        sourceVideo: 'pZChl5ylSJw',
        verbatim: 'from here she starts walking forward because I pull forward',
        confidence: 'transcript',
      },
      {
        id: 'vplm-7',
        text: 'For followers this is a very important step for what comes later.',
        role: 'follower',
        kind: 'concept',
        sourceStart: 93.78,
        sourceVideo: 'pZChl5ylSJw',
        verbatim: 'so from ladies perspective this is very very important step for future',
        confidence: 'transcript',
      },
      {
        id: 'vplm-8',
        text: 'Nothing in the steps course prepares you for this — it is purely a couple action.',
        role: 'both',
        kind: 'context',
        sourceStart: 98.80,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          "we haven't discussed that on our steps classes because it's very unrelated to " +
          'any steps this is just basically action in couple.',
        confidence: 'transcript',
      },
      {
        id: 'vplm-9',
        text: 'Right foot front, left front, then right.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 110.86,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          "So she starts with her right foot going forward. So it's right front, left " +
          'front and right.',
        confidence: 'transcript',
      },
      {
        id: 'vplm-10',
        text: 'On that third step, start twisting the opposite way — the foot turns before you finish it.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 113.88,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          "She starts twisting opposite direction. I don't know if you can see that but " +
          'her foot already went other way.',
        confidence: 'transcript',
      },
      {
        id: 'vplm-11',
        beat: 5,
        text: 'On 5, step with the left foot.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 128.20,
        sourceVideo: 'pZChl5ylSJw',
        verbatim: 'Now next step on five is with the left foot.',
        confidence: 'transcript',
      },
      {
        // Anchored to the teachers' own unambiguous restatement at 141.68, not to
        // the "if you relate it in kapo" line at 135.38, which is unresolved
        // (K7-d).
        id: 'vplm-12',
        text: 'The first steps came towards him, past his left. This one goes exactly the opposite way.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 141.68,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          'so this step was towards me but to my left and now she goes exactly opposite ' +
          'direction',
        confidence: 'transcript',
      },
      {
        id: 'vplm-13',
        text: 'Then two more walking steps, towards his right foot. Walk and walk.',
        role: 'follower',
        kind: 'footwork',
        sourceStart: 148.84,
        sourceVideo: 'pZChl5ylSJw',
        verbatim: 'Five and two more steps towards my right foot. Walk and walk.',
        confidence: 'transcript',
      },
      {
        id: 'vplm-14',
        text: 'She lands in the Dile que no position, and you do a full Dile que no.',
        role: 'both',
        kind: 'footwork',
        sourceStart: 154.24,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          'And then she will land in Dilekano position that we already know and we\'ll do ' +
          'full Dilekano. Six, seven. We know this part already.',
        confidence: 'transcript',
      },
      {
        id: 'vplm-15',
        text: 'Your footwork is only 1-2-3, 5-6-7.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 164.76,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          'Now from guy point of view, footwork is super simple. One, two, three, five, ' +
          'six, seven.',
        confidence: 'transcript',
      },
      {
        id: 'vplm-16',
        text: 'Simple does not mean lazy. Keep your feet moving.',
        role: 'leader',
        kind: 'footwork',
        sourceStart: 169.24,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          "What doesn't mean that you can be lazy? You can't. You have to keep moving your " +
          'feet. This is very, very important.',
        confidence: 'transcript',
      },
      {
        id: 'vplm-17',
        text: 'It needs far more leading action than anything before it. That is what makes it different.',
        role: 'both',
        kind: 'concept',
        sourceStart: 194.08,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          "I said that this movement is quite different than everything else we've done, " +
          'and it is mainly because it requires a lot more leading action.',
        confidence: 'transcript',
      },
      {
        id: 'vplm-18',
        text: 'Pull with your hand forward, so it comes in front of you.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 201.58,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          "I'm pulling with my hand forward, so it goes in front of me, and then I lift it " +
          'up and make a small loop over her head.',
        confidence: 'transcript',
      },
      {
        id: 'vplm-19',
        text: 'Then lift it up and make a small loop over her head.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 205.54,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          "I'm pulling with my hand forward, so it goes in front of me, and then I lift it " +
          'up and make a small loop over her head.',
        confidence: 'transcript',
      },
      {
        // "be like a knot" in the verbatim is Whisper's Dile que no — one of the
        // manglings the Class 3 table covers.
        id: 'vplm-20',
        text: 'Loop her around, then bring the hand down.',
        role: 'leader',
        kind: 'lead',
        sourceStart: 214.82,
        sourceVideo: 'pZChl5ylSJw',
        verbatim: 'Watch. Five, six, pull. One, two, up. Loop her around, hand down, be like a knot.',
        confidence: 'transcript',
      },
      {
        id: 'vplm-21',
        text: "The loop is a small movement. Don't go crazy with it.",
        role: 'leader',
        kind: 'lead',
        sourceStart: 227.72,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          'this looping that I\'m talking about is a relatively small movement you don\'t ' +
          'have to go crazy',
        confidence: 'transcript',
      },
      {
        id: 'vplm-22',
        text: 'Hold the same arm set-up the whole way through, as in La Chica.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 236.00,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          "another thing from the girl point of view is that she's keeping this arm set up " +
          'I think we talked about it already during La Chica but she ended this she keeps ' +
          'this hand set up through all the moves',
        confidence: 'transcript',
      },
      {
        id: 'vplm-23',
        text: 'That arm stays in the same position. Always.',
        role: 'follower',
        kind: 'arms',
        sourceStart: 258.10,
        sourceVideo: 'pZChl5ylSJw',
        verbatim: 'Okay, so this arm is always in the same position you are a Lego person.',
        confidence: 'transcript',
      },
      {
        id: 'vplm-24',
        text:
          'Think of a Lego figure: hold its arm high and rotate the arm, and the whole ' +
          'figure turns.',
        role: 'follower',
        kind: 'concept',
        sourceStart: 267.50,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          'You know Lego people, they have arms like that and they can move up and move. ' +
          "So if you hold Lego's arm, Lego's person's arm high and you start rotating arm, " +
          'whole Lego person is rotating.',
        confidence: 'transcript',
      },
      {
        // Sourced from the `review` chapter: @451.34 is the only place in the
        // class where the difference from La Chica is stated, so `cc7-review` is
        // listed in the source's `segmentIds` (K7-e).
        id: 'vplm-25',
        text:
          'It is still a right turn, but she travels from his left to his right. That is ' +
          'what separates it from La Chica.',
        role: 'both',
        kind: 'concept',
        sourceStart: 451.34,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          "It's very different than la chica. It is still right turn but she travels from " +
          'my left to my right. Pay attention to that.',
        confidence: 'transcript',
      },
      {
        id: 'vplm-26',
        text: 'The music is still very slow, and it will speed up little by little as the course goes on.',
        role: 'both',
        kind: 'musicality',
        sourceStart: 337.34,
        sourceVideo: 'pZChl5ylSJw',
        verbatim:
          'We are still going with very very slow rhythm, however step by step during this ' +
          "course we'll start speeding music up tiny bit.",
        confidence: 'transcript',
      },
    ],
    sources: [
      {
        course: 'couples',
        classNumber: 7,
        videoId: 'pZChl5ylSJw',
        teachStart: 44.68,
        segmentIds: ['cc7-teach-vplm', 'cc7-count-vplm', 'cc7-count-vplm-side', 'cc7-review'],
        clips: {
          // No caveat, and the 17s `count` chapter was not used: its real usable
          // length is 13.88s (K7-c). This is the side-view chapter, whose second
          // pass the teachers announce as "one more time a bit slower" @317.94
          // and call by the follower's actual steps rather than by numbers.
          slow: {
            src: '/clips/salsa/couples/vacilala-por-la-mano-slow.mp4',
            sourceVideo: 'pZChl5ylSJw',
            start: 305.54,
            end: 331.18,
            aspect: '16/9',
            confidence: 'transcript',
          },
          fast: {
            src: '/clips/salsa/couples/vacilala-por-la-mano-fast.mp4',
            sourceVideo: '18cM9UvzsoI',
            start: 0.0,
            end: 32.174,
            aspect: '9/16',
            confidence: 'transcript',
            caveat:
              'The official short. Music only, no spoken count — there is nothing to listen ' +
              "for. A burned-in graphic covers the top strip ('BEGINNERS SALSA MOVES') and " +
              "the bottom of the frame ('CLASS 7 / VACILALA POR LA MANO'); this banner is " +
              'three lines tall, the tallest of the three shorts, and it sits highest over ' +
              "the floor. The dancers' feet clear it in the frames sampled, but this is the " +
              'short where footwork visibility is most at risk. 720×1280, so it will upscale.',
          },
        },
      },
    ],
    complete: true,
    notes: [
      {
        text:
          'Alternate slow window, review-only and not encoded: 287.58 → 331.18 (43.60s) — the ' +
          '`count` chapter plus the side view, three passes. Inside the 20–45s band. Held ' +
          'back because the camera cuts mid-window at ~301.5, which makes it a poor loop, ' +
          'and because the announcement "We\'ll do one more time exactly the same thing just ' +
          'from different perspective" sits in the middle of it. This is where the otherwise ' +
          'unusable count chapter survives (K7-c).',
        sourceVideo: 'pZChl5ylSJw',
        sourceStart: 287.58,
      },
      {
        text:
          'Alternate slow window, review-only and not encoded: 209.26 → 219.06 (9.80s) — ' +
          '"Watch. Five, six, pull. One, two, up. Loop her around, hand down, be like a ' +
          'knot." The clearest demonstration of the leader\'s hand in classes 1–7, with every ' +
          'one of the four lead actions called as it happens. Far too short to publish; if a ' +
          'reviewer wants one clip to explain what "por la mano" means, this is it.',
        sourceVideo: 'pZChl5ylSJw',
        sourceStart: 209.26,
      },
      {
        text:
          'Alternate fast window, review-only and not encoded: 346.98 → 368.32 (21.34s), the ' +
          'landscape 16/9 alternative to the vertical short. Two passes at tempo with the ' +
          'teacher calling over the music. This is the one that answers K7-j.',
        sourceVideo: 'pZChl5ylSJw',
        sourceStart: 346.98,
      },
    ],
    flags: ['K7-a', 'K7-b', 'K7-c', 'K7-d', 'K7-e', 'K7-j', 'K7-k'],
  },
]

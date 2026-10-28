// Rehab — targeted corrective exercises, each paired with the symptoms that
// suggest you need it.
//
// Every exercise carries its own source video, because unlike the other tabs the
// exercises won't share one. Content is taken from the video's transcript (local
// Whisper; YouTube's captions 429'd), with the speaker's timestamps in comments
// so a claim can be checked against the source. Speculative claims in the video
// that aren't needed to decide whether to do the exercise are left out.
// Clips are cut by scripts/clip_rehab_moves.py.

export interface RehabSource {
  videoId: string
  title: string
  channel: string
}

/** A symptom that points at this exercise, and the video's reason why. */
export interface RehabSign {
  sign: string
  why: string
}

export interface RehabStep {
  name: string
  detail: string
  clip?: string
}

export interface RehabExercise {
  slug: string
  name: string
  /** What it targets, in a few words. */
  area: string
  summary: string
  time: string
  dose: string
  source: RehabSource
  signs: RehabSign[]
  /** A quick test you can run before deciding whether the exercise is for you. */
  selfCheck: string[]
  /** How it works, in plain terms. */
  why: string[]
  setup: string[]
  steps: RehabStep[]
  watchFor: string[]
}

const CLIP = '/clips/rehab'

const SMOOTH_PURSUITS: RehabExercise = {
  slug: 'smooth-pursuits',
  name: 'Smooth Pursuits',
  area: 'Eyes · neck · nervous system',
  summary:
    'Follow a pencil with your eyes only — not your head — in every direction. Tight or weak eye muscles make the neck and the rest of the body compensate; this retrains them.',
  time: '~5 min',
  dose: '3 slow passes per direction, every day. Once you find the direction that helps most, focus on that one.',
  source: {
    videoId: 'QhhXjoD6rZw',
    title: 'Your EYES Could Be Affecting Your Entire Body (Try This Exercise!)',
    channel: 'Stop Chasing Pain — Dr. Perry',
  },
  signs: [
    {
      // 03:34, 07:45–08:37
      sign: 'Neck pain or tension that keeps coming back',
      why: 'If your eyes can\'t track on their own, your head moves with them. That small extra neck movement, thousands of times a day, turns into neck pain that doesn\'t go away.',
    },
    {
      // 03:34–04:45
      sign: 'Tight base of the skull that massage doesn\'t fix',
      why: 'The small muscles under the skull hold your head steady and are full of position sensors. They keep tightening because your eyes keep setting them off, so working on the muscles alone doesn\'t last.',
    },
    {
      // 05:03–07:31
      sign: 'Tight calves, hamstrings, low back, plantar fasciitis or pain between the shoulder blades that stretching doesn\'t fix',
      why: 'When you look up, the whole back chain, from the back of the head down to the soles of the feet, gets ready to extend. If looking up is hard work for your eyes, that chain stays switched on.',
    },
    {
      // 07:10
      sign: 'Pulling the same muscle with no contact, like a hamstring while running',
      why: 'Muscles that are already overworked from making up for your eyes are the ones that give out.',
    },
    {
      // 14:37–15:41
      sign: 'Problems in twisting sports like golf, tennis or throwing',
      why: 'Twisting starts with the eyes: looking to one side gets the trunk ready to turn. If your eyes are off on one side, the swing goes off line or the body makes up for it further down.',
    },
    {
      // 00:00, 10:34–11:15, 18:16–18:52
      sign: 'Always on edge: chronic stress, hypervigilance, feeling stuck in fight-or-flight',
      why: 'Looking down puts you in a protective, curled-forward posture. When your eyes track badly, your brain is less sure what\'s around you and treats that as a threat. Tracking well lowers that threat response.',
    },
    {
      // 00:57
      sign: 'Hours a day looking down at a phone or close-up screen',
      why: 'Constant close, downward focus tires the eye muscles like any other muscle and keeps the front of the neck tight.',
    },
    {
      // 19:11–19:27
      sign: 'A past concussion or any head knock',
      why: 'Head trauma often leaves eye tracking worse. If this is you, start with very few passes — it tires you out quickly. See the warning below.',
    },
  ],
  selfCheck: [
    // 07:31–08:11, 25:03–25:16, 27:08–27:25
    'Hold a finger at arm\'s length and follow it up, down, left, right and diagonally — eyes only.',
    'Does your head move along with it, even slightly? That\'s your neck making up for your eyes.',
    'Does any direction feel like more effort, make you lose focus, or make you hold your breath? That direction is putting stress on your nervous system — it\'s the one to work on.',
    'Film yourself: head movement is easier to see on video than to feel.',
  ],
  why: [
    // 02:25, 05:03–06:18, 08:44–11:15, 11:31–12:52
    'Your eyes lead and your body follows. Looking up gets your back muscles ready to extend, looking down gets your front muscles ready to curl forward, and looking to the side gets you ready to turn. Your body reacts to where your eyes go before you move.',
    // 13:07–14:24, 15:47–17:26
    'Each eye has six muscles, and the two eyes have to work as a team. Looking right uses the outer muscle of the right eye and the inner muscle of the left eye, while the opposite pair has to relax. If the opposite pair is too tight it won\'t relax, so both sides need training.',
    // 03:34–04:31
    'The small muscles under your skull keep your head steady and tell your brain where it is. When they\'re tight from making up for your eyes, your brain gets a worse sense of where your head is and reads that as a threat.',
    // 18:16–18:52, 28:37–28:44
    'Smooth tracking means clearer information about the world, so your brain can predict better and feels less threatened. That\'s what calms the nervous system.',
  ],
  setup: [
    // 22:10–22:51
    'Seated, standing or lying down — whichever is comfortable.',
    'A pencil (eraser end) or your finger, held at arm\'s length.',
    'Glasses off if you can still focus; on is fine if you can\'t.',
    'Mouth closed, breathe through your nose, tongue resting against the roof of your mouth.',
    // 22:51–23:39
    'Get a baseline first: turn your head left and right, nod up and down, twist, bend forward and back — or move whatever area hurts. Note how far you go and how it feels.',
  ],
  steps: [
    {
      // 24:37–25:16
      name: 'Right',
      detail:
        'Slowly move the pencil to the right, following it with your eyes only. At the end, close your eyes and bring the pencil and your eyes back to the centre. Open your eyes and focus on the pencil again. Do this 3 times.',
      clip: `${CLIP}/smooth-pursuit-right.mp4`,
    },
    {
      // 25:16–25:42
      name: 'Left',
      detail: 'Same thing to the left, 3 times. Then do your baseline movement again — has anything changed?',
      clip: `${CLIP}/smooth-pursuit-left.mp4`,
    },
    {
      // 25:47–26:18
      name: 'Up and down',
      detail:
        'Pencil straight up, close your eyes, back to the centre, open. Then straight down. Keep it smooth rather than fast — you can speed up as you get better. Check your baseline again.',
      clip: `${CLIP}/smooth-pursuit-vertical.mp4`,
    },
    {
      // 26:18–27:08
      name: 'Diagonals',
      detail:
        'Top left, then bottom right. Switch hands, then top right and bottom left. Check your baseline one last time.',
      clip: `${CLIP}/smooth-pursuit-diagonal.mp4`,
    },
    {
      // 23:39–23:50, 27:39–27:57
      name: 'Pick your direction',
      detail:
        'Which direction gave you the most extra range, the least pain, or the calmest feeling? That\'s your direction. Keep doing it every day.',
    },
  ],
  watchFor: [
    // 21:51–22:06
    'Keep breathing. Holding your breath keeps you in fight-or-flight and cancels out the benefit.',
    // 25:03–25:16
    'Head moving along with your eyes means you\'re going too far or too fast. Make the movement smaller and slower.',
    // 18:09–18:16, 21:10–21:28
    'This tires out your brain quickly, especially if your eyes are already a problem. A few passes and a rest is fine — stop before you\'re worn out.',
    // 23:50–24:00
    'If nothing changes, it doesn\'t mean your eyes are fine — this is just one eye exercise.',
  ],
}

export const REHAB_EXERCISES: RehabExercise[] = [SMOOTH_PURSUITS]

// Rehab — targeted corrective exercises, each paired with the symptoms that
// suggest you need it.
//
// Every exercise carries its own source videos, because unlike the other tabs the
// exercises won't share one. Content is taken from the videos' transcripts (local
// Whisper, in ~/Documents/healing-syllabus/transcripts), with the speaker's
// timestamps in comments — or on the step itself — so a claim can be checked
// against the source. Speculative claims in the video
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
  /** How long the guided timer gives this step. */
  seconds?: number
  /** Where in which source video this step is taught; t is "m:ss". */
  from?: { videoId: string; t: string }
}

/** One rung of a progression: when to move up, and what changes. */
export interface RehabLevel {
  name: string
  when: string
  change: string
}

export interface RehabExercise {
  slug: string
  name: string
  /** What it targets, in a few words. */
  area: string
  summary: string
  time: string
  dose: string
  sources: RehabSource[]
  signs: RehabSign[]
  /** A quick test you can run before deciding whether the exercise is for you. */
  selfCheck: string[]
  /** How it works, in plain terms. */
  why: string[]
  setup: string[]
  steps: RehabStep[]
  progression?: RehabLevel[]
  watchFor: string[]
}

const CLIP = '/clips/rehab'
const CHANNEL = 'Stop Chasing Pain — Dr. Perry'

const SMOOTH_PURSUITS: RehabExercise = {
  slug: 'smooth-pursuits',
  name: 'Smooth Pursuits',
  area: 'Eyes · neck · nervous system',
  summary:
    'Follow a pencil with your eyes only — not your head — in every direction. Tight or weak eye muscles make the neck and the rest of the body compensate; this retrains them.',
  time: '~5 min',
  dose: '3 slow passes per direction, every day. Once you find the direction that helps most, focus on that one.',
  sources: [
    {
      videoId: 'QhhXjoD6rZw',
      title: 'Your EYES Could Be Affecting Your Entire Body (Try This Exercise!)',
      channel: CHANNEL,
    },
  ],
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

const SOCKETS = 'xPwQ01NTtzk'
const EYE_H = 'pHv7HlOujAc'
const DONT_FORGET = 'RdOf-Isk0IU'
const PALMING = 'YyVCJgZWRaQ'

const SCREEN_EYE_RESET: RehabExercise = {
  slug: 'screen-eye-reset',
  name: 'Screen Eye Reset',
  area: 'Eye fatigue · screens · head and neck tension',
  summary:
    'A 5-minute break for eyes worn out by a screen. It follows his order: open blood and lymph flow around the neck first, then ease the tissue around the eyes, move them through their full range, practise near focus, and finish by resting them in total darkness.',
  time: '5 min',
  dose: 'Once or twice a day, or whenever you come off a long screen session. The pencil push-ups can also be done on their own in short sessions through the day.',
  sources: [
    { videoId: DONT_FORGET, title: "Stop Chasing Pain Mini-Podcast: Don't Forget The Eyes", channel: CHANNEL },
    { videoId: SOCKETS, title: 'Easing Eye and Facial Tension To Calm The Body', channel: CHANNEL },
    { videoId: EYE_H, title: 'Calm Your Body Using The Eyes', channel: CHANNEL },
    { videoId: PALMING, title: 'Eye Palming To Calm Your Nervous System', channel: CHANNEL },
  ],
  signs: [
    {
      // Palming 01:53–02:02, 00:15–00:44
      sign: 'Tired, strained eyes after hours on a screen or phone',
      why: 'Open eyes take in information from everywhere, all the time, and all of it goes into your nervous system. He says people looking at phones all day have a hard time letting their eyes relax at all.',
    },
    {
      // Sockets 00:25–00:57, 01:37
      sign: 'Tension around the eyes, forehead, sinuses or face, or headaches',
      why: 'Looking up, down and all over the place all day pulls on the connective tissue around the eye socket, and that pull travels into the rest of the head and face.',
    },
    {
      // Don't Forget 12:35–13:18
      sign: 'A tight base of the skull that keeps coming back however much you rub it',
      why: 'The small muscles under the skull fire every time your eyes move, getting the head ready to turn. If the eyes are struggling, those muscles are overworked — and tight there can choke off blood flow to the head.',
    },
    {
      // Don't Forget 19:50–20:00; Eye H 08:13
      sign: 'Feeling drained or foggy after focused screen work',
      why: 'Vision takes a lot of brain energy — he puts the brain at about a quarter of the body\'s energy. Eye work tires the brain quickly too, which is why the reps here are low.',
    },
  ],
  selfCheck: [
    // Palming 01:24–01:53, 07:29–07:43
    'Cover your closed eyes with cupped palms so no light gets in. Do you see total black, or white specks, flashes or colours? Specks mean your eye muscles are not relaxed.',
    // Don't Forget 19:01–19:24
    'Hold a pencil at arm\'s length and slowly bring it to the tip of your nose, eyes on the tip. Note where it turns from one pencil into two — check again after a week.',
    // Don't Forget 13:20–13:33
    'Put your fingers under the back of your skull, keep your head still and look left, right, up and down. Feel those muscles fire? If the area is tight and tender, your eyes may be making them work too hard.',
  ],
  why: [
    // Don't Forget 17:17–17:49; Eye stress (jJxiOQ7UEQo) 01:47–03:28
    'Flow first: the blood supply to your eyes runs up from the collarbone through the side of the neck, and the eye drains back down to the neck. He treats it like a warm-up — get circulation going before asking the eyes to work.',
    // Sockets 00:25–00:57
    'The tissue around the eye socket is connected to everything around it, so tension there pulls on the face and head. Easing it lets the eyes move freely.',
    // Eye H 01:17–01:32, 03:23–03:38, 06:31–07:01
    'Moving your eyes uses the oculomotor nerve (cranial nerve 3), which is part of the calming, rest-and-recover side of the nervous system. The H and the circle also work cranial nerves 4 and 6.',
    // Don't Forget 16:49–17:09, 19:46–20:21
    'Pencil push-ups train your eyes to focus up close and back out — the work a screen asks of them all day — the same way push-ups train your arms.',
    // Palming 00:44–01:22, 03:45–04:14
    'Closing your eyes still lets light in. Palming blocks it completely so the eyes can rest, and long exhales switch on the calming side of the nervous system.',
  ],
  setup: [
    // Eye H 03:38–03:46
    'Sit down — it is easier on your nervous system than standing.',
    // Eye H 03:46–04:43
    'Mouth closed, breathe through your nose, whole tongue resting on the roof of your mouth.',
    // Sockets 02:22
    'Glasses off for the massage and palming.',
    // Don't Forget 18:48–18:54
    'A pencil, or use your finger.',
    // Palming 05:43–05:47
    'A dim room makes palming easier, but isn\'t essential.',
  ],
  steps: [
    {
      name: 'Open the flow: collarbone',
      detail: 'Rub very gently just above and just below both collarbones. This is where the arteries to your head and eyes begin.',
      clip: `${CLIP}/flow-collarbone.mp4`,
      seconds: 15,
      from: { videoId: DONT_FORGET, t: '17:58' },
    },
    {
      name: 'Open the flow: behind the jaw',
      detail: 'Top of the neck, on the side, behind the angle of the jaw and below the earlobe. Gentle circles.',
      clip: `${CLIP}/flow-jaw-angle.mp4`,
      seconds: 15,
      from: { videoId: DONT_FORGET, t: '18:10' },
    },
    {
      name: 'Open the flow: under the skull',
      detail: 'Hands behind your head, just under the skull. Rub and massage very gently — it moves lymph here too.',
      clip: `${CLIP}/flow-under-skull.mp4`,
      seconds: 15,
      from: { videoId: DONT_FORGET, t: '18:29' },
    },
    {
      name: 'Eye-socket massage',
      detail:
        'With your finger pads (or thumb for the upper rim), press along the inside edge of the eye socket and rub side to side and a little in and out. Work all the way round. Stay on a tender spot until it eases, and spend longer on the side that feels tighter. Never press on the eyeball itself.',
      clip: `${CLIP}/eye-socket-massage.mp4`,
      seconds: 50,
      from: { videoId: SOCKETS, t: '1:48' },
    },
    {
      name: 'Eye H: first side',
      detail:
        'Finger at arm\'s length. Moving only your eyes, follow it to your left, up to the top-left corner, down to the bottom-left corner, back up and to the middle. Keep breathing.',
      clip: `${CLIP}/eye-h-first-side.mp4`,
      seconds: 25,
      from: { videoId: EYE_H, t: '4:56' },
    },
    {
      name: 'Eye H: second side',
      detail:
        'Switch to the other hand. To your right, up to the top-right corner, down to the bottom-right corner, back up and to the centre. Blink and breathe.',
      clip: `${CLIP}/eye-h-second-side.mp4`,
      seconds: 25,
      from: { videoId: EYE_H, t: '5:30' },
    },
    {
      name: 'Eye circles',
      detail:
        'Start with your finger at 12 o\'clock and follow it slowly round in a circle, then the other way. A couple each direction. Notice which pattern or direction felt hardest.',
      clip: `${CLIP}/eye-circles.mp4`,
      seconds: 30,
      from: { videoId: EYE_H, t: '5:53' },
    },
    {
      name: 'Pencil push-ups',
      detail:
        'Pencil at arm\'s length, level with the tip of your nose. Keep your eyes on the tip and slowly bring it all the way in to touch your nose, then slowly back out. 5 slow, controlled reps. Don\'t stop breathing.',
      clip: `${CLIP}/pencil-push-up.mp4`,
      seconds: 45,
      from: { videoId: DONT_FORGET, t: '19:01' },
    },
    {
      name: 'Palming with long exhales',
      detail:
        'Cup your palms slightly and lay them diagonally over closed eyes, overlapping, with no pressure on the eyeballs. Adjust until no light gets in. Breathe in through your nose for 4 seconds, then breathe out through your mouth making a long "voooo" sound, as long as is comfortable. 3 breaths.',
      clip: `${CLIP}/eye-palming.mp4`,
      seconds: 65,
      from: { videoId: PALMING, t: '5:47' },
    },
    {
      name: 'Look around',
      detail:
        'Open your eyes and slowly peel your hands away. Look up, down, left, right, into the corners, and make a few loose circles each way. Breathe through your nose.',
      seconds: 15,
      from: { videoId: PALMING, t: '9:41' },
    },
  ],
  progression: [
    {
      // Don't Forget 19:46–19:56; Eye H 05:53, 07:38
      name: 'Start here',
      when: 'Week 1',
      change: 'The routine as written: 5 pencil push-ups, the H once each side, a couple of circles each way. If you get tired after the pencil reps, stop there — that is normal.',
    },
    {
      // Don't Forget 20:04–20:10
      name: 'More reps',
      when: 'When 5 reps feel slow and controlled',
      change: 'Build the pencil push-ups up to 10 good-quality reps.',
    },
    {
      // Don't Forget 20:10–20:26
      name: 'Spread it out',
      when: 'Once 10 reps are comfortable',
      change: 'Do 10 pencil push-ups 3–5 times through the day — at screen breaks — rather than one big set. Keep this up daily for a week and see what changes.',
    },
    {
      // Smooth Pursuits video 27:39–27:57; Palming 02:09–02:23
      name: 'Add Smooth Pursuits',
      when: 'When the routine feels easy',
      change: 'Add the Smooth Pursuits exercise above for full-range tracking. Keep practising palming until you can relax into total black — little and often.',
    },
  ],
  watchFor: [
    // Sockets 01:23, 01:27; Palming 05:54
    'Never press on the eyeball. If the socket massage is uncomfortable, lighten your touch.',
    // Eye H 04:43–04:50; Don't Forget 19:31
    'You will probably hold your breath during the eye movements — keep breathing.',
    // Eye H 08:06–08:19; Don't Forget 19:50
    'Eye work tires your brain quickly. More isn\'t better, better is better: stop when you feel fatigued.',
    // Palming 02:09–02:17
    'Specks when palming are normal at first. It can take many sessions to see black.',
  ],
}

export const REHAB_EXERCISES: RehabExercise[] = [SCREEN_EYE_RESET, SMOOTH_PURSUITS]

// Voice Training (secretly confidence) — distilled from Vanessa Van Edwards'
// Big Think talk "This social signal kills charisma faster than anything else"
// (https://youtu.be/O7AJKBeWg-Q).
//
// The first two seconds of any interaction set warmth (can I trust you?) and
// competence (can I rely on you?). Being intentional with these cues is, in her
// words, "the back door into confidence." This page mixes quick do/don't
// reference bars with short guided practice drills that the device coaches out
// loud (Web Speech API) — no video clips required.

export interface VoiceDrill {
  name: string
  /** Seconds of guided practice. */
  duration: number
  /** Shown under the name and spoken aloud when the drill becomes active. */
  description: string
  /** Optional spoken coaching line; falls back to `description` for TTS. */
  coach?: string
  /** Optional number of prompted reps spread across the duration. */
  reps?: number
  /** Spoken on each rep, e.g. "Hello". Requires `reps`. */
  repCue?: string
  /** Optional looping demo clip, path under /public. Kept only when a clip
   *  shows the action better than words; otherwise the drill is text + voice. */
  clip?: string
}

export interface DoDont {
  /** The cue to send. */
  do: string
  /** The cue to avoid. */
  dont: string
}

export interface ReferenceCard {
  icon: string
  title: string
  body: string
}

export interface VoiceTraining {
  id: string
  title: string
  subtitle: string
  /** The source talk, linked as a follow-along reference. */
  sourceUrl: string
  sourceCredit: string
  drills: VoiceDrill[]
}

// Short guided warm-up — the practiceable cues, coached out loud.
export const VOICE_TRAINING: VoiceTraining = {
  id: 'first-impression',
  title: 'Voice Training',
  subtitle: 'Nail the first two seconds — warmth + competence, the back door into confidence',
  sourceUrl: 'https://youtu.be/O7AJKBeWg-Q',
  sourceCredit: 'Vanessa Van Edwards · Big Think',
  drills: [
    {
      name: 'Happy Hello',
      duration: 30,
      description: 'Say hello on the out-breath, with a smile — drop into your natural low range, not the top of your voice.',
      coach:
        'Breathe in. Now say hello on the out-breath, with a smile. Let it land in your natural, low range — not the anxious top of your voice.',
      reps: 4,
      repCue: 'Hello',
    },
    {
      name: 'Palm Flash',
      duration: 20,
      description: 'Flash open palms as you greet. Hands visible, nothing hidden.',
      coach: 'Flash your open palms as you greet. Hands up and visible — you have nothing to hide.',
      reps: 3,
      repCue: 'Good to see you',
    },
    {
      name: 'Gaze',
      duration: 30,
      description: 'Hold about 60 to 70% eye contact. Lock on for the key points, glance away to think, then return.',
      coach:
        'Pick a point and hold your gaze, about sixty to seventy percent. Glance away naturally to think, then come back for the important part.',
    },
    {
      name: 'Fronting',
      duration: 20,
      description: 'Square your torso, toes and head toward the speaker — parallel lines, a nonverbal sign of respect.',
      coach: 'Square your torso, your toes and your head toward the person speaking. Parallel lines — that is respect.',
    },
    {
      name: 'Open Up (anti-blocking)',
      duration: 20,
      description: 'Uncross your arms, open your torso, and move anything you are holding away from your chest.',
      coach: 'Uncross your arms. Open your torso. Move anything you are holding away from your chest, and stay open.',
    },
  ],
}

// Quick scannable reference bars — the dos and don'ts of the first two seconds.
export const DO_DONT: DoDont[] = [
  {
    do: 'Say "hello" on the out-breath, with a smile',
    dont: 'Hold your breath — it forces a high, vocal-fry hello that reads as anxious',
  },
  {
    do: 'Keep hands visible — flash open palms on arrival',
    dont: 'Hide hands in pockets, a purse, or behind a laptop or clipboard',
  },
  {
    do: 'Open torso, arms uncrossed',
    dont: 'Cross your arms — it reads as closed-minded and closes your own thinking too',
  },
  {
    do: 'Front: angle torso, toes and head toward the speaker',
    dont: 'Turn or angle away — it lands as disrespect',
  },
  {
    do: 'Hold 60–70% eye contact, locked on the key points',
    dont: 'Stare 100% of the time, or avoid eye contact entirely',
  },
  {
    do: 'Touch when welcome: handshake (1–3 pumps), high-five, hug',
    dont: 'Over-pump, or force touch where the person or culture does not want it',
  },
  {
    do: 'Name a negative cue to yourself ("that’s a scoff") to disarm it',
    dont: 'Absorb it silently and let it hijack your nerves',
  },
  {
    do: 'Show you’re real — a little vulnerability is warmth',
    dont: 'Chase a flawless, "perfectly charismatic" impression — there’s no such thing',
  },
]

// Her recommended ramp: lowest-pressure channel first, layering cues as you go.
export const PROGRESSION: ReferenceCard[] = [
  {
    icon: '📞',
    title: 'Phone first',
    body: 'All you have is voice and words. Practice just the happy hello — answer with "hello" on the out-breath.',
  },
  {
    icon: '💻',
    title: 'Then video',
    body: 'Touch is off the table, so add gaze (into the camera — it still makes oxytocin) and a palm flash. Now you’re running three cues.',
  },
  {
    icon: '🧑‍🤝‍🧑',
    title: 'Then in person',
    body: 'Start low-pressure with friends and family: practice the hug and handshake, get feedback, and practice fronting while they speak.',
  },
]

// The mindset cues — reference only, not a timed drill.
export const MINDSET: ReferenceCard[] = [
  {
    icon: '🎬',
    title: 'Find your punctuator',
    body: 'Watch a meeting recording of yourself on silent. Spot the habitual face/hand/body cue you do without thinking — that’s your punctuator. Notice other people’s too.',
  },
  {
    icon: '🏷️',
    title: 'Label to disarm',
    body: 'Emotions are contagious — a fearful or angry face can hijack you. Silently naming the emotion ("that’s anger", "that’s a scoff") disengages the amygdala and stops the hijack.',
  },
  {
    icon: '🌱',
    title: 'Real beats perfect',
    body: 'There’s no perfect first impression. If a cue still feels fake after 5–10 tries, drop it. Use only the cues that make you feel like your most confident self.',
  },
]

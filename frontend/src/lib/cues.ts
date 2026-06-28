// Audio cue helpers for the stretching timer: Web Audio beeps + speech
// synthesis. No audio assets required — everything is generated in-browser.
//
// All functions are no-ops when called outside the browser or before the user
// has interacted (the AudioContext is created lazily on first beep so it stays
// within the autoplay-policy "user gesture" allowance — the Start button).

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  // Resume if the browser suspended it.
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** Prime the audio + speech engines from within a user gesture (Start click). */
export function unlockAudio() {
  getCtx()
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    // A muted empty utterance unlocks TTS on iOS Safari.
    const u = new SpeechSynthesisUtterance('')
    u.volume = 0
    window.speechSynthesis.speak(u)
  }
}

function tone(freq: number, durationMs: number, volume = 0.18, type: OscillatorType = 'sine') {
  const ac = getCtx()
  if (!ac) return
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, ac.currentTime)
  gain.gain.linearRampToValueAtTime(volume, ac.currentTime + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + durationMs / 1000)
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.start()
  osc.stop(ac.currentTime + durationMs / 1000 + 0.02)
}

/** Soft tick for the final 3-second countdown of each move. */
export function tick() {
  tone(660, 90, 0.12)
}

/** Rising two-tone chime when a new move begins. */
export function startChime() {
  tone(587.33, 120, 0.18)
  window.setTimeout(() => tone(880, 160, 0.18), 120)
}

/** Distinct double-beep used at a halfway / switch-sides cue. */
export function switchChime() {
  tone(784, 130, 0.2, 'triangle')
  window.setTimeout(() => tone(784, 130, 0.2, 'triangle'), 180)
}

/** Descending fanfare when the whole routine finishes. */
export function finishChime() {
  ;[880, 698.46, 587.33, 440].forEach((f, i) => {
    window.setTimeout(() => tone(f, 220, 0.2), i * 160)
  })
}

/** Speak a short cue. Cancels any in-flight speech so cues never overlap. */
export function say(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.rate = 1.0
  u.pitch = 1.0
  u.volume = 1.0
  synth.speak(u)
}

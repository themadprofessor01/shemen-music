// Singleton Web Audio API engine
// Only one MediaElementAudioSourceNode can be created per HTMLAudioElement,
// so we manage the entire audio graph here.

let ctx: AudioContext | null = null;
let source: MediaElementAudioSourceNode | null = null;
let analyser: AnalyserNode | null = null;
let convolver: ConvolverNode | null = null;
let reverbGain: GainNode | null = null;
let dryGain: GainNode | null = null;
let initialized = false;
let reverbOn = false;

function buildReverbIR(audioCtx: AudioContext): AudioBuffer {
  const rate = audioCtx.sampleRate;
  const length = rate * 3.5; // 3.5 second tail
  const buf = audioCtx.createBuffer(2, length, rate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      // Exponential decay noise = cathedral reverb impulse response
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
    }
  }
  return buf;
}

export function initAudioEngine(audioEl: HTMLAudioElement): void {
  if (initialized) return;
  initialized = true;

  try {
    ctx = new AudioContext();
    source = ctx.createMediaElementSource(audioEl);

    analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.75;

    convolver = ctx.createConvolver();
    convolver.buffer = buildReverbIR(ctx);

    reverbGain = ctx.createGain();
    reverbGain.gain.value = 0; // off by default

    dryGain = ctx.createGain();
    dryGain.gain.value = 1;

    // Graph: source → analyser → dryGain → destination
    //        source → convolver → reverbGain → destination
    source.connect(analyser);
    analyser.connect(dryGain);
    dryGain.connect(ctx.destination);

    source.connect(convolver);
    convolver.connect(reverbGain);
    reverbGain.connect(ctx.destination);
  } catch (e) {
    console.warn("AudioEngine init failed:", e);
    initialized = false;
  }
}

export function resumeContext(): void {
  if (ctx?.state === "suspended") {
    ctx.resume().catch(() => {});
  }
}

export function getAnalyser(): AnalyserNode | null {
  return analyser;
}

export function setReverb(enabled: boolean): void {
  if (!reverbGain || !ctx) return;
  reverbOn = enabled;
  reverbGain.gain.setTargetAtTime(enabled ? 0.55 : 0, ctx.currentTime, 0.08);
}

export function isReverbOn(): boolean {
  return reverbOn;
}

export function isInitialized(): boolean {
  return initialized;
}

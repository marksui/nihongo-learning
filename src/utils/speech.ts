export const JAPANESE_VOICE_WARNING =
  "当前浏览器没有可用的日语语音，请尝试 Chrome / Edge / Safari 或安装日语语音包。";

export interface SpeakResult {
  ok: boolean;
  warning?: string;
}

let cachedVoices: SpeechSynthesisVoice[] | null = null;
let voicesPromise: Promise<SpeechSynthesisVoice[]> | null = null;
let activeFinish: ((result: SpeakResult) => void) | null = null;

const hasSpeechSynthesis = () =>
  typeof window !== "undefined" &&
  "speechSynthesis" in window &&
  "SpeechSynthesisUtterance" in window;

export const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
  if (!hasSpeechSynthesis()) {
    return Promise.resolve([]);
  }

  if (cachedVoices?.length) {
    return Promise.resolve(cachedVoices);
  }

  const voices = window.speechSynthesis.getVoices();
  if (voices.length) {
    cachedVoices = voices;
    return Promise.resolve(voices);
  }

  if (!voicesPromise) {
    voicesPromise = new Promise((resolve) => {
      const synth = window.speechSynthesis;
      const previousHandler = synth.onvoiceschanged;
      let settled = false;

      const finish = () => {
        if (settled) {
          return;
        }

        settled = true;
        const loadedVoices = synth.getVoices();
        cachedVoices = loadedVoices.length ? loadedVoices : null;
        voicesPromise = null;
        synth.onvoiceschanged = previousHandler;
        resolve(loadedVoices);
      };

      synth.onvoiceschanged = (event) => {
        previousHandler?.call(synth, event);
        finish();
      };

      window.setTimeout(finish, 1200);
    });
  }

  return voicesPromise;
};

export const getJapaneseVoice = async () => {
  const voices = await loadVoices();
  return (
    voices.find((voice) => voice.lang.toLowerCase().startsWith("ja")) ?? null
  );
};

export const speakJapanese = async (text: string): Promise<SpeakResult> => {
  if (!hasSpeechSynthesis()) {
    return { ok: false, warning: JAPANESE_VOICE_WARNING };
  }

  const voice = await getJapaneseVoice();
  if (!voice) {
    return { ok: false, warning: JAPANESE_VOICE_WARNING };
  }

  activeFinish?.({ ok: false });
  activeFinish = null;
  window.speechSynthesis.cancel();

  return new Promise((resolve) => {
    let settled = false;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.voice = voice;
    utterance.rate = 0.8;
    utterance.pitch = 1;

    const finish = (result: SpeakResult) => {
      if (settled) {
        return;
      }

      settled = true;
      if (activeFinish === finish) {
        activeFinish = null;
      }
      resolve(result);
    };

    activeFinish = finish;
    utterance.onend = () => finish({ ok: true });
    utterance.onerror = () => finish({ ok: false, warning: JAPANESE_VOICE_WARNING });

    window.speechSynthesis.speak(utterance);
  });
};

export const pauseJapanese = () => {
  if (hasSpeechSynthesis()) {
    window.speechSynthesis.pause();
  }
};

export const resumeJapanese = () => {
  if (hasSpeechSynthesis()) {
    window.speechSynthesis.resume();
  }
};

export const stopJapanese = () => {
  if (hasSpeechSynthesis()) {
    activeFinish?.({ ok: false });
    activeFinish = null;
    window.speechSynthesis.cancel();
  }
};

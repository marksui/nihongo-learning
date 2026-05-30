import { ListMusic, Play, Square, Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import type { Dialogue } from "../data/dialogues";
import { stopJapanese } from "../utils/speech";

interface DialogueCardProps {
  dialogue: Dialogue;
  onSpeak: (text: string) => Promise<boolean>;
}

const DialogueCard = ({ dialogue, onSpeak }: DialogueCardProps) => {
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [nextLine, setNextLine] = useState(0);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const cancelledRef = useRef(false);

  const playLine = async (index: number) => {
    cancelledRef.current = false;
    setActiveLine(index);
    const ok = await onSpeak(dialogue.lines[index].japanese);
    if (!cancelledRef.current) {
      setActiveLine(null);
      setNextLine((index + 1) % dialogue.lines.length);
    }
    return ok;
  };

  const playNextLine = async () => {
    if (!isPlayingAll) {
      await playLine(nextLine);
    }
  };

  const playAll = async () => {
    if (isPlayingAll) {
      return;
    }

    cancelledRef.current = false;
    setIsPlayingAll(true);

    for (let index = 0; index < dialogue.lines.length; index += 1) {
      if (cancelledRef.current) {
        break;
      }
      setActiveLine(index);
      const ok = await onSpeak(dialogue.lines[index].japanese);
      if (!ok) {
        break;
      }
    }

    setActiveLine(null);
    setIsPlayingAll(false);
    setNextLine(0);
  };

  const stopPlayback = () => {
    cancelledRef.current = true;
    stopJapanese();
    setActiveLine(null);
    setIsPlayingAll(false);
  };

  return (
    <article className="rounded-lg border border-black/10 bg-white/92 p-5 shadow-card">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-bold text-matcha">{dialogue.situation}</p>
          <h2 className="mt-1 font-serif text-3xl font-bold text-ink">{dialogue.title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={playNextLine}
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md bg-indigo px-3 py-2 text-sm font-bold text-white transition hover:bg-indigo/90 active:scale-95"
          >
            <ListMusic aria-hidden="true" size={18} />
            逐句播放
          </button>
          <button
            type="button"
            onClick={playAll}
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md bg-matcha px-3 py-2 text-sm font-bold text-white transition hover:bg-matcha/90 active:scale-95"
          >
            <Play aria-hidden="true" size={18} />
            播放整段对话
          </button>
          <button
            type="button"
            onClick={stopPlayback}
            className="grid min-h-11 w-11 cursor-pointer place-items-center rounded-md border border-black/10 bg-white text-ink transition hover:bg-rice active:scale-95"
            aria-label="停止播放对话"
            title="停止"
          >
            <Square aria-hidden="true" size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {dialogue.lines.map((line, index) => {
          const active = activeLine === index;

          return (
            <div
              key={`${line.speaker}-${line.japanese}`}
              className={`grid gap-3 rounded-lg border p-4 transition md:grid-cols-[7rem_1fr_auto] md:items-center ${
                active
                  ? "border-matcha bg-matcha/10"
                  : "border-black/8 bg-rice/52"
              }`}
            >
              <p className="text-sm font-bold text-ink/58">{line.speaker}</p>
              <div>
                <p className="text-lg font-bold text-ink">{line.japanese}</p>
                <p className="mt-1 text-xs text-ink/55">{line.kana}</p>
                <p className="mt-2 text-sm text-ink/70">{line.translation}</p>
              </div>
              <button
                type="button"
                onClick={() => playLine(index)}
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-md bg-white text-matcha shadow-sm transition hover:bg-matcha hover:text-white active:scale-95"
                aria-label={`播放第 ${index + 1} 句`}
                title="播放这一句"
              >
                <Volume2 aria-hidden="true" size={19} />
              </button>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default DialogueCard;

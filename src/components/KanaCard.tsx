import { CheckCircle2, Clock3 } from "lucide-react";
import { useState } from "react";
import type { KanaItem } from "../data/kana";
import { isContentCompleted, markContentCompleted, readLearningProgress, recordSeenContent } from "../utils/progress";
import { formatRomajiReading } from "../utils/romaji";
import LearningCard from "./LearningCard";
import SpeakButton from "./SpeakButton";

interface KanaCardProps {
  item: KanaItem;
  onSpeak: (text: string) => Promise<boolean>;
}

const KanaCard = ({ item, onSpeak }: KanaCardProps) => {
  const contentId = `kana:${item.id}`;
  const [activeTarget, setActiveTarget] = useState<"kana" | "example" | null>(null);
  const [studyState, setStudyState] = useState(() => {
    const progress = readLearningProgress();

    return {
      seen: progress.seenContentIds.includes(contentId),
      completed: isContentCompleted(progress, contentId),
    };
  });

  const play = async (target: "kana" | "example", text: string) => {
    setActiveTarget(target);
    recordSeenContent([contentId, `kana:${item.group}`]);
    setStudyState((current) => ({ ...current, seen: true }));
    const ok = await onSpeak(text);
    window.setTimeout(() => {
      setActiveTarget((current) => (current === target ? null : current));
    }, ok ? 260 : 900);
  };

  const markMastered = () => {
    markContentCompleted(contentId);
    setStudyState({ seen: true, completed: true });
  };

  const kanaActive = activeTarget === "kana";
  const exampleActive = activeTarget === "example";

  return (
    <LearningCard
      interactive
      className={`flex min-h-56 flex-col justify-between p-4 ${activeTarget ? "border-yuzu/65 bg-yuzu/8 ring-2 ring-yuzu/25" : ""}`}
    >
      <div>
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p
              className={`mb-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-extrabold ${
                studyState.completed
                  ? "bg-matcha/12 text-matcha"
                  : studyState.seen
                    ? "bg-yuzu/18 text-ink/62"
                    : "bg-rice text-ink/45"
              }`}
            >
              {studyState.completed ? <CheckCircle2 aria-hidden="true" size={14} /> : <Clock3 aria-hidden="true" size={14} />}
              {studyState.completed ? "已掌握" : studyState.seen ? "已听过" : "未开始"}
            </p>
            <div className="flex items-baseline gap-3">
              <span className={`font-japanese text-5xl font-bold transition-colors ${kanaActive ? "text-matcha" : "text-ink"}`}>
                {item.hiragana}
              </span>
              <span className={`font-japanese text-4xl font-bold transition-colors ${kanaActive ? "text-sakura" : "text-sumire"}`}>
                {item.katakana}
              </span>
            </div>
            <p className="mt-1 text-sm font-bold uppercase text-sakura">
              {formatRomajiReading(item.romaji)}
            </p>
          </div>
          <SpeakButton
            active={kanaActive}
            onClick={() => play("kana", item.audioText ?? item.hiragana)}
            ariaLabel={`播放 ${item.hiragana} 的日语发音`}
            title="播放发音"
          />
        </div>

        <div
          className={`rounded-md border p-3 transition ${
            exampleActive ? "border-matcha/40 bg-matcha/10" : "border-sora/18 bg-sora/10"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={() => play("example", item.example.word)}
              className="min-w-0 flex-1 cursor-pointer text-left"
              aria-label={`朗读例词 ${item.example.word}`}
              title="朗读例词"
            >
              <p className="text-xs font-bold text-ink/52">例词</p>
              <p className={`mt-1 font-japanese text-2xl font-bold transition-colors ${exampleActive ? "text-matcha" : "text-ink"}`}>
                {item.example.word}
              </p>
              <p className="mt-1 text-sm text-ink/62">
                {item.example.kana} · {formatRomajiReading(item.example.romaji)}
              </p>
            </button>
            <SpeakButton
              active={exampleActive}
              ariaLabel={`朗读例词 ${item.example.word}`}
              className="h-10 w-10"
              onClick={() => play("example", item.example.word)}
              title="朗读例词"
              variant="light"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="min-w-0 text-sm font-semibold text-ink/76">中文：{item.example.meaning}</p>
        <button
          type="button"
          onClick={markMastered}
          disabled={studyState.completed}
          aria-pressed={studyState.completed}
          className={`flex min-h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-extrabold transition active:scale-[0.99] ${
            studyState.completed
              ? "cursor-default border-matcha/20 bg-matcha/10 text-matcha"
              : "border-yuzu/28 bg-yuzu/14 text-ink/68 hover:bg-yuzu/24 hover:text-ink"
          }`}
        >
          <CheckCircle2 aria-hidden="true" size={15} />
          {studyState.completed ? "已掌握" : "标记掌握"}
        </button>
      </div>
    </LearningCard>
  );
};

export default KanaCard;

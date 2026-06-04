import { CheckCircle2, Clock3, MessageCircle } from "lucide-react";
import { useState } from "react";
import type { VocabularyItem } from "../data/vocabulary";
import { isContentCompleted, markContentCompleted, readLearningProgress, recordSeenContent } from "../utils/progress";
import { formatRomajiReading } from "../utils/romaji";
import FoodIllustration from "./FoodIllustration";
import LearningCard from "./LearningCard";
import SpeakButton from "./SpeakButton";

interface WordCardProps {
  word: VocabularyItem;
  onSpeak: (text: string) => Promise<boolean>;
}

const WordCard = ({ word, onSpeak }: WordCardProps) => {
  const contentId = `word:${word.id}`;
  const [activeTarget, setActiveTarget] = useState<"word" | "sentence" | null>(null);
  const [studyState, setStudyState] = useState(() => {
    const progress = readLearningProgress();

    return {
      seen: progress.seenContentIds.includes(contentId),
      completed: isContentCompleted(progress, contentId),
    };
  });

  const play = async (target: "word" | "sentence", text: string) => {
    setActiveTarget(target);
    recordSeenContent(contentId);
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

  const wordActive = activeTarget === "word";
  const sentenceActive = activeTarget === "sentence";

  return (
    <LearningCard
      interactive
      className={`flex min-h-80 flex-col justify-between p-5 ${wordActive || sentenceActive ? "border-yuzu/55 ring-2 ring-yuzu/20" : ""}`}
    >
      <div>
        <FoodIllustration word={word} />
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap gap-2">
              <p className="w-fit rounded-md bg-yuzu/24 px-2 py-1 text-xs font-bold text-ink/68">
                {word.category}
              </p>
              {word.level ? (
                <p className="w-fit rounded-md bg-sora/12 px-2 py-1 text-xs font-extrabold text-sora">
                  {word.level}
                </p>
              ) : null}
              <p
                className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-extrabold ${
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
            </div>
            <h3 className={`break-words font-japanese text-3xl font-bold transition-colors ${wordActive ? "text-matcha" : "text-ink"}`}>
              {word.japanese}
            </h3>
            <p className="mt-2 text-sm text-ink/62">
              {word.kana} · {formatRomajiReading(word.romaji)}
            </p>
          </div>
          <SpeakButton
            active={wordActive}
            onClick={() => play("word", word.audioText ?? word.japanese)}
            ariaLabel={`播放 ${word.japanese} 的日语发音`}
            title="播放单词"
          />
        </div>

        <p className="mt-4 text-lg font-bold text-sakura">{word.meaning}</p>

        <div
          className={`mt-5 rounded-md border p-4 transition ${
            sentenceActive ? "border-yuzu/45 bg-yuzu/10" : "border-sora/18 bg-sora/10"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className={`text-sm font-semibold transition-colors ${sentenceActive ? "text-matcha" : "text-ink"}`}>
                <span className="font-japanese">{word.sentence}</span>
              </p>
              <p className="mt-1 text-xs text-ink/58">{word.sentenceKana}</p>
            </div>
            <SpeakButton
              active={sentenceActive}
              iconOnly
              icon={MessageCircle}
              onClick={() => play("sentence", word.sentence)}
              variant="light"
              className="h-10 w-10 text-sumire hover:bg-sumire"
              ariaLabel={`播放例句 ${word.sentence}`}
              title="播放例句"
            />
          </div>
          <p className="mt-3 text-sm text-ink/70">{word.translation}</p>
        </div>
        <button
          type="button"
          onClick={markMastered}
          disabled={studyState.completed}
          aria-pressed={studyState.completed}
          className={`mt-4 flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-extrabold transition active:scale-[0.99] ${
            studyState.completed
              ? "cursor-default border-matcha/20 bg-matcha/10 text-matcha"
              : "border-yuzu/28 bg-yuzu/14 text-ink/68 hover:bg-yuzu/24 hover:text-ink"
          }`}
        >
          <CheckCircle2 aria-hidden="true" size={16} />
          {studyState.completed ? "已掌握" : "标记掌握"}
        </button>
      </div>
    </LearningCard>
  );
};

export default WordCard;

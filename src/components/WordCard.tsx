import { CheckCircle2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { getVocabularyJlptLevel, type VocabularyItem } from "../data/vocabulary";
import { isContentCompleted, markContentCompleted, readLearningProgress } from "../utils/progress";
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
      completed: isContentCompleted(progress, contentId),
    };
  });

  const play = async (target: "word" | "sentence", text: string) => {
    setActiveTarget(target);
    const ok = await onSpeak(text);
    window.setTimeout(() => {
      setActiveTarget((current) => (current === target ? null : current));
    }, ok ? 760 : 1100);
  };

  const markMastered = () => {
    markContentCompleted(contentId);
    setStudyState({ completed: true });
  };

  const wordActive = activeTarget === "word";
  const sentenceActive = activeTarget === "sentence";
  const speaking = wordActive || sentenceActive;
  const jlptLevel = getVocabularyJlptLevel(word);
  const displayCategory = word.category === "考试单词" ? "JLPT词" : word.category;

  return (
    <LearningCard
      interactive
      className={`word-card-shell flex min-h-[13rem] flex-col justify-between p-3 sm:p-3.5 ${studyState.completed ? "word-card-mastered" : ""} ${speaking ? "speak-card border-yuzu/55 ring-2 ring-yuzu/20" : ""}`}
    >
      <div>
        <FoodIllustration word={word} />
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap gap-1.5">
              <p className="w-fit rounded-md bg-yuzu/18 px-2 py-0.5 text-xs font-bold text-ink/66">
                {displayCategory}
              </p>
              <p className={`w-fit rounded-md bg-sora/12 px-2 py-0.5 text-xs font-extrabold text-sora ${speaking ? "word-level-spark" : ""}`}>
                {jlptLevel}
              </p>
              {studyState.completed ? (
                <p className="mastery-pop study-state-badge inline-flex items-center gap-1 rounded-md bg-matcha/12 px-2 py-0.5 text-xs font-extrabold text-matcha">
                  <CheckCircle2 aria-hidden="true" size={14} />
                  已掌握
                </p>
              ) : null}
            </div>
            <h3 className={`jp-display break-words text-[1.5rem] transition-colors sm:text-[1.68rem] ${wordActive ? "speak-text-glow text-matcha" : "text-ink"}`}>
              {word.japanese}
            </h3>
            <p className={`mt-1.5 text-sm font-semibold text-ink/60 ${wordActive ? "reading-line-spark" : ""}`}>
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
        <div className={`mt-4 h-1.5 overflow-hidden rounded-full bg-yuzu/16 transition-opacity ${speaking ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
          <span className={`block h-full w-1/3 rounded-full bg-matcha/80 ${speaking ? "speak-bar" : ""}`} />
        </div>

        <p className={`mt-2.5 text-base font-extrabold text-sakura ${speaking ? "meaning-spark" : ""}`}>{word.meaning}</p>

        <div
          className={`mt-2.5 rounded-lg border p-2.5 transition ${
            sentenceActive ? "border-yuzu/45 bg-yuzu/10" : "border-sora/18 bg-sora/10"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className={`text-sm font-semibold leading-6 transition-colors ${sentenceActive ? "speak-text-glow text-matcha" : "text-ink"}`}>
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
          <p className={`mt-3 text-sm text-ink/70 ${sentenceActive ? "translation-spark" : ""}`}>{word.translation}</p>
        </div>
        <button
          type="button"
          onClick={markMastered}
          disabled={studyState.completed}
          aria-pressed={studyState.completed}
          className={`mt-3 flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-1.5 text-sm font-extrabold transition active:scale-[0.99] ${
            studyState.completed
              ? "mastered-action-pop cursor-default border-matcha/20 bg-matcha/10 text-matcha"
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

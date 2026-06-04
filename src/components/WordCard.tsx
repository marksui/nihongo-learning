import { MessageCircle } from "lucide-react";
import { useState } from "react";
import type { VocabularyItem } from "../data/vocabulary";
import { recordSeenContent } from "../utils/progress";
import { formatRomajiReading } from "../utils/romaji";
import FoodIllustration from "./FoodIllustration";
import LearningCard from "./LearningCard";
import SpeakButton from "./SpeakButton";

interface WordCardProps {
  word: VocabularyItem;
  onSpeak: (text: string) => Promise<boolean>;
}

const WordCard = ({ word, onSpeak }: WordCardProps) => {
  const [activeTarget, setActiveTarget] = useState<"word" | "sentence" | null>(null);

  const play = async (target: "word" | "sentence", text: string) => {
    setActiveTarget(target);
    recordSeenContent(`word:${word.id}`);
    const ok = await onSpeak(text);
    window.setTimeout(() => {
      setActiveTarget((current) => (current === target ? null : current));
    }, ok ? 260 : 900);
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
            <p className="mb-2 w-fit rounded-md bg-yuzu/24 px-2 py-1 text-xs font-bold text-ink/68">
              {word.category}
            </p>
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
      </div>
    </LearningCard>
  );
};

export default WordCard;

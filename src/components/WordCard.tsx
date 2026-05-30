import { MessageCircle, Volume2 } from "lucide-react";
import type { VocabularyItem } from "../data/vocabulary";
import FoodIllustration from "./FoodIllustration";

interface WordCardProps {
  word: VocabularyItem;
  onSpeak: (text: string) => Promise<boolean>;
}

const WordCard = ({ word, onSpeak }: WordCardProps) => {
  return (
    <article className="flex min-h-80 flex-col justify-between rounded-lg border border-black/10 bg-white/90 p-5 shadow-card transition hover:-translate-y-0.5 hover:border-coral/35 hover:shadow-soft">
      <div>
        <FoodIllustration word={word} />
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="mb-2 w-fit rounded-md bg-sun/24 px-2 py-1 text-xs font-bold text-ink/68">
              {word.category}
            </p>
            <h3 className="break-words font-serif text-3xl font-bold text-ink">{word.japanese}</h3>
            <p className="mt-2 text-sm text-ink/62">
              {word.kana} · {word.romaji}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSpeak(word.japanese)}
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-md bg-matcha text-white transition hover:bg-matcha/90 active:scale-95"
            aria-label={`播放 ${word.japanese} 的日语发音`}
            title="播放单词"
          >
            <Volume2 aria-hidden="true" size={20} />
          </button>
        </div>

        <p className="mt-4 text-lg font-bold text-coral">{word.meaning}</p>

        <div className="mt-5 rounded-md bg-sky/70 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink">{word.sentence}</p>
              <p className="mt-1 text-xs text-ink/58">{word.sentenceKana}</p>
            </div>
            <button
              type="button"
              onClick={() => onSpeak(word.sentence)}
              className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-md bg-white text-indigo shadow-sm transition hover:bg-indigo hover:text-white active:scale-95"
              aria-label={`播放例句 ${word.sentence}`}
              title="播放例句"
            >
              <MessageCircle aria-hidden="true" size={18} />
            </button>
          </div>
          <p className="mt-3 text-sm text-ink/70">{word.translation}</p>
        </div>
      </div>
    </article>
  );
};

export default WordCard;

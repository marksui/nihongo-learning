import { Volume2 } from "lucide-react";
import type { KanaItem } from "../data/kana";
import { formatRomajiReading } from "../utils/romaji";

interface KanaCardProps {
  item: KanaItem;
  onSpeak: (text: string) => Promise<boolean>;
}

const KanaCard = ({ item, onSpeak }: KanaCardProps) => {
  return (
    <article className="flex min-h-56 flex-col justify-between rounded-lg border border-black/10 bg-white/88 p-4 shadow-card transition hover:-translate-y-0.5 hover:border-matcha/35 hover:shadow-soft">
      <div>
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-5xl font-bold text-ink">{item.hiragana}</span>
              <span className="font-serif text-4xl font-bold text-indigo">{item.katakana}</span>
            </div>
            <p className="mt-1 text-sm font-bold uppercase text-coral">
              {formatRomajiReading(item.romaji)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSpeak(item.hiragana)}
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-md bg-matcha text-white transition hover:bg-matcha/90 active:scale-95"
            aria-label={`播放 ${item.hiragana} 的日语发音`}
            title="播放发音"
          >
            <Volume2 aria-hidden="true" size={20} />
          </button>
        </div>

        <div className="rounded-md bg-sky/70 p-3">
          <p className="text-xs font-bold text-ink/52">例词</p>
          <p className="mt-1 text-2xl font-bold text-ink">{item.example.word}</p>
          <p className="mt-1 text-sm text-ink/62">
            {item.example.kana} · {formatRomajiReading(item.example.romaji)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold text-ink/76">中文：{item.example.meaning}</p>
    </article>
  );
};

export default KanaCard;

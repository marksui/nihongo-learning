import { useState } from "react";
import type { KanaItem } from "../data/kana";
import { formatRomajiReading } from "../utils/romaji";
import LearningCard from "./LearningCard";
import SpeakButton from "./SpeakButton";

interface KanaCardProps {
  item: KanaItem;
  onSpeak: (text: string) => Promise<boolean>;
}

const KanaCard = ({ item, onSpeak }: KanaCardProps) => {
  const [active, setActive] = useState(false);

  const playKana = async () => {
    setActive(true);
    const ok = await onSpeak(item.hiragana);
    window.setTimeout(() => setActive(false), ok ? 240 : 900);
  };

  return (
    <LearningCard
      interactive
      className={`flex min-h-56 flex-col justify-between p-4 ${active ? "border-yuzu/65 bg-yuzu/8 ring-2 ring-yuzu/25" : ""}`}
    >
      <div>
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-3">
              <span className={`font-serif text-5xl font-bold transition-colors ${active ? "text-matcha" : "text-ink"}`}>
                {item.hiragana}
              </span>
              <span className={`font-serif text-4xl font-bold transition-colors ${active ? "text-sakura" : "text-sumire"}`}>
                {item.katakana}
              </span>
            </div>
            <p className="mt-1 text-sm font-bold uppercase text-sakura">
              {formatRomajiReading(item.romaji)}
            </p>
          </div>
          <SpeakButton
            active={active}
            onClick={playKana}
            ariaLabel={`播放 ${item.hiragana} 的日语发音`}
            title="播放发音"
          />
        </div>

        <div className="rounded-md border border-sora/18 bg-sora/10 p-3">
          <p className="text-xs font-bold text-ink/52">例词</p>
          <p className="mt-1 text-2xl font-bold text-ink">{item.example.word}</p>
          <p className="mt-1 text-sm text-ink/62">
            {item.example.kana} · {formatRomajiReading(item.example.romaji)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold text-ink/76">中文：{item.example.meaning}</p>
    </LearningCard>
  );
};

export default KanaCard;

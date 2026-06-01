import { useRef, useState } from "react";
import { kanaItems, type KanaItem } from "../data/kana";

interface QuickReadPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

type KanaScript = "hiragana" | "katakana";
type KanaCell = string | null;

const kanaRows: KanaCell[][] = [
  ["n", "wa", "ra", "ya", "ma", "ha", "na", "ta", "sa", "ka", "a"],
  [null, null, "ri", null, "mi", "hi", "ni", "chi", "shi", "ki", "i"],
  [null, null, "ru", "yu", "mu", "fu", "nu", "tsu", "su", "ku", "u"],
  [null, null, "re", null, "me", "he", "ne", "te", "se", "ke", "e"],
  ["wo", null, "ro", "yo", "mo", "ho", "no", "to", "so", "ko", "o"],
];

const kanaById = new Map(kanaItems.map((item) => [item.id, item]));

const getRomajiLabel = (item: KanaItem) => {
  if (item.id === "wo") {
    return "O";
  }

  return item.romaji.toUpperCase();
};

const getKanaText = (item: KanaItem, script: KanaScript) =>
  script === "hiragana" ? item.hiragana : item.katakana;

interface KanaPosterSectionProps {
  activeKey: string | null;
  script: KanaScript;
  subtitle: string;
  title: string;
  onPlay: (key: string, text: string) => void;
}

const KanaPosterSection = ({ activeKey, script, subtitle, title, onPlay }: KanaPosterSectionProps) => {
  return (
    <section aria-labelledby={`${script}-title`} className="space-y-3">
      <div className="text-center">
        <h1
          id={`${script}-title`}
          className="text-4xl font-extrabold leading-none text-ink sm:text-5xl"
        >
          {title}
        </h1>
        <p className="mt-1 text-base font-semibold text-ink/72 sm:text-lg">{subtitle}</p>
      </div>

      <div className="grid min-w-0 grid-cols-[repeat(11,minmax(0,1fr))] gap-x-0.5 gap-y-1 sm:gap-x-2 sm:gap-y-2">
        {kanaRows.flatMap((row, rowIndex) =>
          row.map((id, columnIndex) => {
            if (!id) {
              return (
                <div
                  key={`${script}-${rowIndex}-${columnIndex}-blank`}
                  aria-hidden="true"
                  className="min-h-12 min-w-0"
                />
              );
            }

            const item = kanaById.get(id);
            if (!item) {
              return null;
            }

            const kana = getKanaText(item, script);
            const key = `${script}-${item.id}`;
            const active = activeKey === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => onPlay(key, kana)}
                className={`group grid min-h-12 min-w-0 cursor-pointer place-items-center rounded-md px-0.5 py-1 text-center transition duration-200 active:scale-95 ${
                  active
                    ? "bg-sun/28 text-ink ring-2 ring-coral/28"
                    : "text-ink hover:bg-sky"
                }`}
                aria-label={`朗读 ${kana} ${getRomajiLabel(item)}`}
                title={`朗读 ${kana}`}
              >
                <span className="block min-w-0 font-serif text-lg font-bold leading-none sm:text-2xl md:text-3xl">
                  {kana}
                </span>
                <span
                  className={`mt-1 block min-w-0 font-mono text-[0.56rem] font-bold leading-none sm:text-xs ${
                    active ? "text-coral" : "text-coral/82 group-hover:text-coral"
                  }`}
                >
                  {getRomajiLabel(item)}
                </span>
              </button>
            );
          }),
        )}
      </div>
    </section>
  );
};

const QuickReadPage = ({ onSpeak }: QuickReadPageProps) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const playRunRef = useRef(0);

  const playKana = async (key: string, text: string) => {
    const runId = playRunRef.current + 1;
    playRunRef.current = runId;
    setActiveKey(key);

    const ok = await onSpeak(text);
    window.setTimeout(
      () => {
        if (playRunRef.current === runId) {
          setActiveKey(null);
        }
      },
      ok ? 180 : 900,
    );
  };

  return (
    <div className="grid min-h-[calc(100vh-9rem)] place-items-center">
      <article className="w-full max-w-[20.25rem] overflow-hidden rounded-lg border border-black/10 bg-white px-3 py-7 shadow-soft sm:max-w-4xl sm:px-8 sm:py-9">
        <div className="space-y-9 sm:space-y-10">
          <KanaPosterSection
            title="HIRAGANA"
            subtitle="ひらがな"
            script="hiragana"
            activeKey={activeKey}
            onPlay={(key, text) => void playKana(key, text)}
          />

          <div className="h-px bg-black/10" />

          <KanaPosterSection
            title="KATAKANA"
            subtitle="カタカナ"
            script="katakana"
            activeKey={activeKey}
            onPlay={(key, text) => void playKana(key, text)}
          />
        </div>
      </article>
    </div>
  );
};

export default QuickReadPage;

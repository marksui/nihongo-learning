import type { JlptVocabularyLevel } from "../data/vocabulary";

interface JlptLevelSelectorProps {
  active?: JlptVocabularyLevel;
  counts: Record<JlptVocabularyLevel, number>;
  levels: readonly JlptVocabularyLevel[];
  onChange: (level: JlptVocabularyLevel) => void;
  size?: "compact" | "comfortable";
}

const JlptLevelSelector = ({
  active,
  counts,
  levels,
  onChange,
  size = "comfortable",
}: JlptLevelSelectorProps) => {
  const compact = size === "compact";

  return (
    <div className="min-w-0">
      <div className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-5 sm:overflow-visible">
        {levels.map((level) => {
          const selected = level === active;

          return (
            <button
              key={level}
              type="button"
              onClick={() => onChange(level)}
              aria-pressed={selected}
              className={`min-w-[4.75rem] shrink-0 cursor-pointer rounded-md border px-2 text-center transition active:scale-95 ${
                compact ? "min-h-12 py-1.5" : "min-h-16 py-2"
              } ${
                selected
                  ? "level-chip-active border-sumire bg-sumire text-white shadow-card"
                  : "border-ink/8 bg-rice/58 text-ink/68 hover:border-yuzu/35 hover:bg-yuzu/16 hover:text-ink"
              }`}
            >
              <span className={`${compact ? "text-base" : "text-lg"} block font-extrabold leading-tight`}>{level}</span>
              <span className={`mt-0.5 block text-[0.68rem] font-bold ${selected ? "level-count-pop text-white/78" : "text-ink/48"}`}>
                {counts[level]} 词
              </span>
              <span
                aria-hidden="true"
                className={`mx-auto mt-1 block h-1 w-8 overflow-hidden rounded-full ${
                  selected ? "bg-white/20" : "bg-ink/8"
                }`}
              >
                <span className={`block h-full rounded-full ${selected ? "level-progress-spark bg-yuzu" : "bg-ink/12"}`} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default JlptLevelSelector;

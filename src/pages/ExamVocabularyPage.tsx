import { RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";
import JlptLevelSelector from "../components/JlptLevelSelector";
import PageHero from "../components/PageHero";
import WordCard from "../components/WordCard";
import { getVocabularyJlptLevel, jlptVocabularyLevels, vocabulary, type JlptVocabularyLevel } from "../data/vocabulary";
import { readLearningProgress, setTargetJlptLevel } from "../utils/progress";
import { formatRomajiReading } from "../utils/romaji";

interface ExamVocabularyPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

const wordMatchesQuery = (word: (typeof vocabulary)[number], normalizedQuery: string) =>
  !normalizedQuery ||
  [
    word.japanese,
    word.kana,
    word.romaji,
    formatRomajiReading(word.romaji),
    word.category,
    word.level,
    getVocabularyJlptLevel(word),
    word.tags?.join(" "),
    word.meaning,
    word.sentence,
    word.translation,
  ]
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery);

const ExamVocabularyPage = ({ onSpeak }: ExamVocabularyPageProps) => {
  const [query, setQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState<JlptVocabularyLevel>(() => readLearningProgress().targetJlptLevel);

  const levelCounts = useMemo(
    () =>
      jlptVocabularyLevels.reduce<Record<JlptVocabularyLevel, number>>((counts, level) => {
        counts[level] = vocabulary.filter((word) => getVocabularyJlptLevel(word) === level).length;
        return counts;
      }, {} as Record<JlptVocabularyLevel, number>),
    [],
  );

  const selectedLevelWords = useMemo(
    () => vocabulary.filter((word) => getVocabularyJlptLevel(word) === activeLevel),
    [activeLevel],
  );

  const filteredWords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return selectedLevelWords.filter((word) => wordMatchesQuery(word, normalizedQuery));
  }, [query, selectedLevelWords]);

  const chooseLevel = (level: JlptVocabularyLevel) => {
    setActiveLevel(level);
    setTargetJlptLevel(level);
  };

  return (
    <div className="space-y-7">
      <PageHero
        title="JLPT 考试词汇"
        description="按 N5 到 N1 分级复习词汇。选择目标等级后，只看该等级词卡；点播放听单词和例句，掌握后直接标记。"
        stats={[
          { label: "等级", value: "N5-N1" },
          { label: activeLevel, value: levelCounts[activeLevel] },
          { label: "当前", value: filteredWords.length },
        ]}
      />

      <section className="sticky top-20 z-20 rounded-lg border border-ink/10 bg-paper p-4 shadow-card backdrop-blur md:top-24">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,0.86fr)_minmax(360px,0.74fr)] xl:items-start">
          <div className="min-w-0">
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <label className="relative block">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/42"
                  size={20}
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`搜索 ${activeLevel} 日语、假名、romaji 或中文`}
                  className="min-h-12 w-full rounded-md border border-ink/10 bg-rice/72 pl-11 pr-4 text-sm font-semibold text-ink placeholder:text-ink/38"
                />
              </label>
              <p className="rounded-md border border-ink/8 bg-rice/50 px-3 py-2 text-sm font-extrabold text-ink/60">
                {filteredWords.length} / {selectedLevelWords.length} 个词
              </p>
            </div>

            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-3 flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-ink/10 bg-paper px-3 py-2 text-sm font-extrabold text-ink/62 transition hover:border-sakura/25 hover:bg-sakura/8 hover:text-ink active:scale-95"
              >
                清空搜索
                <RotateCcw aria-hidden="true" size={15} />
              </button>
            ) : null}
          </div>

          <div className="rounded-md border border-sumire/12 bg-sumire/6 p-3">
            <JlptLevelSelector
              active={activeLevel}
              counts={levelCounts}
              levels={jlptVocabularyLevels}
              onChange={chooseLevel}
              size="compact"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredWords.length ? (
          filteredWords.map((word) => <WordCard key={word.id} word={word} onSpeak={onSpeak} />)
        ) : (
          <div className="md:col-span-2 xl:col-span-3">
            <EmptyState title="没有找到考试词" description="换一个日语、假名、romaji 或中文关键词再试。" />
          </div>
        )}
      </section>
    </div>
  );
};

export default ExamVocabularyPage;

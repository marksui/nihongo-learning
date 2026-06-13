import { RotateCcw, Search, Tags } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";
import FilterChips from "../components/FilterChips";
import JlptLevelSelector from "../components/JlptLevelSelector";
import PageHero from "../components/PageHero";
import WordCard from "../components/WordCard";
import { getVocabularyJlptLevel, jlptVocabularyLevels, vocabulary, type JlptVocabularyLevel } from "../data/vocabulary";
import { readLearningProgress, setTargetJlptLevel } from "../utils/progress";
import { formatRomajiReading } from "../utils/romaji";

interface ExamVocabularyPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

type VocabularyWord = (typeof vocabulary)[number];

const allTopicsLabel = "全部主题";
const reservedTopicLabels = new Set<string>(["JLPT", "考试单词", ...jlptVocabularyLevels]);

const getWordTopics = (word: VocabularyWord) => {
  const topics = [word.category, ...(word.tags ?? [])].filter((topic) => {
    return topic && !reservedTopicLabels.has(topic) && topic !== word.level;
  });

  return [...new Set(topics.length ? topics : ["综合"])];
};

const wordMatchesQuery = (word: VocabularyWord, normalizedQuery: string) =>
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
  const [activeTopic, setActiveTopic] = useState(allTopicsLabel);

  const examWords = useMemo(() => {
    const byKey = new Map<string, VocabularyWord>();

    vocabulary.forEach((word) => {
      const key = `${getVocabularyJlptLevel(word)}:${word.japanese}:${word.kana}`;
      const existing = byKey.get(key);

      if (!existing || word.category === "考试单词") {
        byKey.set(key, word);
      }
    });

    return [...byKey.values()].sort((first, second) => (first.sortOrder ?? 0) - (second.sortOrder ?? 0));
  }, []);

  const levelCounts = useMemo(
    () =>
      jlptVocabularyLevels.reduce<Record<JlptVocabularyLevel, number>>((counts, level) => {
        counts[level] = examWords.filter((word) => getVocabularyJlptLevel(word) === level).length;
        return counts;
      }, {} as Record<JlptVocabularyLevel, number>),
    [examWords],
  );

  const selectedLevelWords = useMemo(
    () => examWords.filter((word) => getVocabularyJlptLevel(word) === activeLevel),
    [activeLevel, examWords],
  );

  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = { [allTopicsLabel]: selectedLevelWords.length };

    selectedLevelWords.forEach((word) => {
      getWordTopics(word).forEach((topic) => {
        counts[topic] = (counts[topic] ?? 0) + 1;
      });
    });

    return counts;
  }, [selectedLevelWords]);

  const topicOptions = useMemo(
    () => [
      allTopicsLabel,
      ...Object.keys(topicCounts)
        .filter((topic) => topic !== allTopicsLabel)
        .sort((first, second) => topicCounts[second] - topicCounts[first] || first.localeCompare(second, "zh-Hans-CN")),
    ],
    [topicCounts],
  );

  const filteredWords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return selectedLevelWords.filter((word) => {
      const matchesTopic = activeTopic === allTopicsLabel || getWordTopics(word).includes(activeTopic);
      return matchesTopic && wordMatchesQuery(word, normalizedQuery);
    });
  }, [activeTopic, query, selectedLevelWords]);

  useEffect(() => {
    if (!topicOptions.includes(activeTopic)) {
      setActiveTopic(allTopicsLabel);
    }
  }, [activeTopic, topicOptions]);

  const chooseLevel = (level: JlptVocabularyLevel) => {
    setActiveLevel(level);
    setTargetJlptLevel(level);
  };

  const resetFilters = () => {
    setQuery("");
    setActiveTopic(allTopicsLabel);
  };

  const hasActiveFilters = query.trim().length > 0 || activeTopic !== allTopicsLabel;

  return (
    <div className="space-y-7">
      <PageHero
        title="JLPT 备考词库"
        description="按 N5 到 N1 分级看词，配合主题筛选和点读。适合从零基础慢慢扩到能力考常见词。"
        stats={[
          { label: "总词量", value: examWords.length },
          { label: activeLevel, value: levelCounts[activeLevel] },
          { label: activeTopic === allTopicsLabel ? "当前" : activeTopic, value: filteredWords.length },
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
                  placeholder={`搜索 ${activeLevel} 日语、假名、romaji、中文或主题`}
                  className="min-h-12 w-full rounded-md border border-ink/10 bg-rice/72 pl-11 pr-4 text-sm font-semibold text-ink placeholder:text-ink/38"
                />
              </label>
              <p className="rounded-md border border-ink/8 bg-rice/50 px-3 py-2 text-sm font-extrabold text-ink/60">
                {filteredWords.length} / {selectedLevelWords.length} 个词
              </p>
            </div>

            <div className="mt-3">
              <FilterChips
                active={activeTopic}
                counts={topicCounts}
                icon={Tags}
                onChange={setActiveTopic}
                options={topicOptions}
              />
            </div>

            {hasActiveFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-ink/10 bg-paper px-3 py-2 text-sm font-extrabold text-ink/62 transition hover:border-sakura/25 hover:bg-sakura/8 hover:text-ink active:scale-95"
              >
                清空筛选
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
          filteredWords.map((word, index) => (
            <div
              key={word.id}
              className="exam-card-reveal"
              style={{ animationDelay: `${Math.min(index, 14) * 22}ms` }}
            >
              <WordCard word={word} onSpeak={onSpeak} />
            </div>
          ))
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

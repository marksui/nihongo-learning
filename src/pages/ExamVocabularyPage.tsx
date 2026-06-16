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
const coreJlptLevels: readonly JlptVocabularyLevel[] = ["N5", "N4", "N3"];

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
  const coreLevelMaxCount = Math.max(...coreJlptLevels.map((level) => levelCounts[level] ?? 0), 1);
  const coreLevelCoverage = coreJlptLevels.map((level) => ({
    level,
    count: levelCounts[level],
    percent: Math.max(8, Math.round(((levelCounts[level] ?? 0) / coreLevelMaxCount) * 100)),
  }));

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
  const filterSignature = `${activeLevel}-${activeTopic}-${query.trim()}-${filteredWords.length}`;

  return (
    <div className="space-y-6">
      <PageHero
        title="JLPT 备考词库"
        description="按 N5 到 N1 分级看词，配合主题筛选和点读。适合从零基础慢慢扩到能力考常见词。"
        stats={[
          { label: "总词量", value: examWords.length },
          { label: activeLevel, value: levelCounts[activeLevel] },
          { label: activeTopic === allTopicsLabel ? "当前" : activeTopic, value: filteredWords.length },
        ]}
      />

      <section
        className={`exam-filter-panel compact-sticky-panel sticky-learn-toolbar sticky top-[4.5rem] z-20 overflow-y-auto p-3 backdrop-blur sm:p-4 md:top-24 ${
          hasActiveFilters ? "exam-filter-panel-active" : ""
        }`}
      >
        <div className="grid gap-4 xl:grid-cols-[minmax(0,0.86fr)_minmax(360px,0.74fr)] xl:items-start">
          <div className="min-w-0">
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <label className="exam-search-field relative block rounded-md">
                <Search
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/42 ${hasActiveFilters ? "exam-search-icon-active" : ""}`}
                  size={20}
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`搜索 ${activeLevel} 日语、假名、romaji、中文或主题`}
                  className="exam-search-input min-h-12 w-full rounded-md border border-ink/10 bg-rice/72 pl-11 pr-4 text-sm font-semibold text-ink placeholder:text-ink/38"
                />
              </label>
              <p
                key={filterSignature}
                aria-live="polite"
                className={`result-count-pop rounded-md border border-ink/8 bg-rice/50 px-3 py-2 text-sm font-extrabold text-ink/60 ${
                  hasActiveFilters ? "filter-count-focus" : ""
                }`}
              >
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

          <div key={activeLevel} className="exam-level-panel rounded-md border border-sumire/12 bg-sumire/6 p-3">
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

      <section className="grid gap-3 md:grid-cols-3" aria-label="N5 N4 N3 词库覆盖概览">
        {coreLevelCoverage.map((item, index) => {
          const selected = activeLevel === item.level;

          return (
            <button
              key={item.level}
              type="button"
              onClick={() => chooseLevel(item.level)}
              aria-pressed={selected}
              className={`exam-coverage-card rounded-md border p-3 text-left transition active:scale-[0.99] ${
                selected
                  ? "border-matcha/35 bg-matcha/10 text-ink shadow-card"
                  : "border-ink/8 bg-paper/78 text-ink hover:border-yuzu/35 hover:bg-yuzu/10"
              }`}
              style={{ animationDelay: `${index * 72}ms` }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-extrabold text-ink">{item.level}</span>
                <span className={`rounded-md px-2 py-1 text-xs font-extrabold ${selected ? "exam-coverage-count-pop bg-matcha text-white" : "bg-rice text-ink/58"}`}>
                  {item.count} 词
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-rice">
                <span
                  className={`exam-coverage-bar block h-full rounded-full ${selected ? "bg-matcha" : "bg-sora/72"}`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-bold text-ink/52">
                {selected ? "正在查看这个等级" : "点击切换到这个等级"}
              </p>
            </button>
          );
        })}
      </section>

      <section key={filterSignature} className="exam-result-shell comfortable-card-grid">
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

import { BookOpen, RotateCcw, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";
import FilterChips from "../components/FilterChips";
import JlptLevelSelector from "../components/JlptLevelSelector";
import PageHero from "../components/PageHero";
import WordCard from "../components/WordCard";
import { getVocabularyJlptLevel, jlptVocabularyLevels, vocabulary, vocabularyCategories, type JlptVocabularyLevel, type VocabularyCategory } from "../data/vocabulary";
import { readLearningProgress, setTargetJlptLevel } from "../utils/progress";
import { formatRomajiReading } from "../utils/romaji";

interface VocabularyPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

type CategoryFilter = "全部" | VocabularyCategory;
type LevelFilter = "全部等级" | JlptVocabularyLevel;

const VocabularyPage = ({ onSpeak }: VocabularyPageProps) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("全部");
  const [level, setLevel] = useState<LevelFilter>(() => readLearningProgress().targetJlptLevel);

  const filterOptions = useMemo(() => ["全部", ...vocabularyCategories] as CategoryFilter[], []);
  const levelOptions = useMemo(() => ["全部等级", ...jlptVocabularyLevels] as LevelFilter[], []);

  const categoryCounts = useMemo(() => {
    return filterOptions.reduce<Partial<Record<CategoryFilter, number>>>((counts, item) => {
      counts[item] = item === "全部" ? vocabulary.length : vocabulary.filter((word) => word.category === item).length;
      return counts;
    }, {});
  }, [filterOptions]);

  const levelCounts = useMemo(() => {
    const categoryWords = category === "全部" ? vocabulary : vocabulary.filter((word) => word.category === category);

    return levelOptions.reduce<Partial<Record<LevelFilter, number>>>((counts, item) => {
      counts[item] = item === "全部等级" ? categoryWords.length : categoryWords.filter((word) => getVocabularyJlptLevel(word) === item).length;
      return counts;
    }, {});
  }, [category, levelOptions]);
  const jlptLevelCounts = useMemo(() => {
    const categoryWords = category === "全部" ? vocabulary : vocabulary.filter((word) => word.category === category);

    return jlptVocabularyLevels.reduce<Record<JlptVocabularyLevel, number>>((counts, item) => {
      counts[item] = categoryWords.filter((word) => getVocabularyJlptLevel(word) === item).length;
      return counts;
    }, {} as Record<JlptVocabularyLevel, number>);
  }, [category]);
  const allLevelCount = levelCounts["全部等级"] ?? vocabulary.length;

  const handleLevelChange = (nextLevel: LevelFilter) => {
    setLevel(nextLevel);

    if (nextLevel !== "全部等级") {
      setTargetJlptLevel(nextLevel);
    }
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("全部");
    setLevel("全部等级");
  };

  const showExamWords = () => {
    setCategory("考试单词");
    const nextLevel = level === "全部等级" ? readLearningProgress().targetJlptLevel : level;
    handleLevelChange(nextLevel);
  };

  const filteredWords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return vocabulary.filter((word) => {
      const matchesCategory = category === "全部" || word.category === category;
      const wordJlptLevel = getVocabularyJlptLevel(word);
      const matchesLevel = level === "全部等级" || wordJlptLevel === level;
      const matchesQuery =
        !normalizedQuery ||
        [
          word.japanese,
          word.kana,
          word.romaji,
          formatRomajiReading(word.romaji),
          word.category,
          word.level,
          wordJlptLevel,
          word.tags?.join(" "),
          word.meaning,
          word.sentence,
          word.translation,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesLevel && matchesQuery;
    });
  }, [category, level, query]);

  return (
    <div className="space-y-7">
      <PageHero
        title="常用单词"
        description="从 N5 入门词到 N1 考试词按场景和等级分组，包含日语、假名读法、分隔 romaji、中文意思、例句和中文翻译。食物、水果、蔬菜保留插图，适合边看边听。"
        stats={[
          { label: "分类", value: vocabularyCategories.length },
          { label: "词卡", value: vocabulary.length },
          { label: "点读", value: "例句" },
        ]}
      />

      <section className="sticky top-20 z-20 rounded-lg border border-ink/10 bg-paper p-4 shadow-card backdrop-blur md:top-24">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.72fr)] xl:items-start">
          <div className="min-w-0">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
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
                  placeholder="搜索日语、假名、romaji、中文或 N1"
                  className="min-h-12 w-full rounded-md border border-ink/10 bg-rice/72 pl-11 pr-4 text-sm font-semibold text-ink placeholder:text-ink/38"
                />
              </label>
              <p className="rounded-md border border-ink/8 bg-rice/50 px-3 py-2 text-sm font-extrabold text-ink/60">
                {filteredWords.length} / {vocabulary.length} 个词
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setLevel("全部等级")}
                aria-pressed={level === "全部等级"}
                className={`flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-extrabold transition active:scale-95 ${
                  level === "全部等级"
                    ? "border-matcha bg-matcha text-white shadow-card"
                    : "border-ink/10 bg-paper text-ink/70 hover:border-yuzu/35 hover:bg-yuzu/12 hover:text-ink"
                }`}
              >
                全部等级
                <span className={`rounded px-1.5 py-0.5 text-xs ${level === "全部等级" ? "bg-white/16" : "bg-rice text-ink/58"}`}>
                  {allLevelCount}
                </span>
              </button>
              <button
                type="button"
                onClick={showExamWords}
                className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-sumire/18 bg-sumire/8 px-3 py-2 text-sm font-extrabold text-sumire transition hover:bg-sumire hover:text-white active:scale-95"
              >
                考试单词
                <BookOpen aria-hidden="true" size={15} />
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-ink/10 bg-paper px-3 py-2 text-sm font-extrabold text-ink/62 transition hover:border-sakura/25 hover:bg-sakura/8 hover:text-ink active:scale-95"
              >
                清除筛选
                <RotateCcw aria-hidden="true" size={15} />
              </button>
            </div>

            <div className="mt-4">
              <FilterChips
                active={category}
                counts={categoryCounts}
                icon={Sparkles}
                label="单词分类"
                onChange={setCategory}
                options={filterOptions}
              />
            </div>
          </div>

          <div className="rounded-md border border-sumire/12 bg-sumire/6 p-3">
            <JlptLevelSelector
              active={level === "全部等级" ? undefined : level}
              counts={jlptLevelCounts}
              levels={jlptVocabularyLevels}
              onChange={handleLevelChange}
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
            <EmptyState title="没有找到单词" description="换一个假名、中文意思、N1、N2、N3、N4、N5、标签或分类再试试。" />
          </div>
        )}
      </section>
    </div>
  );
};

export default VocabularyPage;

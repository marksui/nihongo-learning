import { RotateCcw, Search, Sparkles, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";
import FilterChips from "../components/FilterChips";
import PageHero from "../components/PageHero";
import WordCard from "../components/WordCard";
import { getVocabularyJlptLevel, vocabulary, vocabularyCategories, type VocabularyCategory } from "../data/vocabulary";
import { formatRomajiReading } from "../utils/romaji";

interface VocabularyPageProps {
  onOpenExamVocabulary: () => void;
  onSpeak: (text: string) => Promise<boolean>;
}

type CommonVocabularyCategory = Exclude<VocabularyCategory, "考试单词">;
type CategoryFilter = "全部" | CommonVocabularyCategory;

const VocabularyPage = ({ onOpenExamVocabulary, onSpeak }: VocabularyPageProps) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("全部");

  const commonVocabulary = useMemo(() => vocabulary.filter((word) => word.category !== "考试单词"), []);
  const filterOptions = useMemo(
    () => [
      "全部",
      ...vocabularyCategories.filter((item): item is CommonVocabularyCategory => item !== "考试单词"),
    ] as CategoryFilter[],
    [],
  );

  const categoryCounts = useMemo(() => {
    return filterOptions.reduce<Partial<Record<CategoryFilter, number>>>((counts, item) => {
      counts[item] = item === "全部" ? commonVocabulary.length : commonVocabulary.filter((word) => word.category === item).length;
      return counts;
    }, {});
  }, [commonVocabulary, filterOptions]);

  const clearFilters = () => {
    setQuery("");
    setCategory("全部");
  };

  const filteredWords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return commonVocabulary.filter((word) => {
      const matchesCategory = category === "全部" || word.category === category;
      const wordJlptLevel = getVocabularyJlptLevel(word);
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

      return matchesCategory && matchesQuery;
    });
  }, [category, commonVocabulary, query]);

  return (
    <div className="space-y-7">
      <PageHero
        title="常用单词"
        description="按真实场景积累日常词汇，包含日语、假名读法、分隔 romaji、中文意思、例句和中文翻译。食物、水果、蔬菜保留插图，适合边看边听。"
        stats={[
          { label: "分类", value: filterOptions.length - 1 },
          { label: "词卡", value: commonVocabulary.length },
          { label: "点读", value: "例句" },
        ]}
      />

      <section className="sticky top-20 z-20 rounded-lg border border-ink/10 bg-paper p-4 shadow-card backdrop-blur md:top-24">
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
              placeholder="搜索日语、假名、romaji、中文或 N3"
              className="min-h-12 w-full rounded-md border border-ink/10 bg-rice/72 pl-11 pr-4 text-sm font-semibold text-ink placeholder:text-ink/38"
            />
          </label>
          <p className="rounded-md border border-ink/8 bg-rice/50 px-3 py-2 text-sm font-extrabold text-ink/60">
            {filteredWords.length} / {commonVocabulary.length} 个词
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onOpenExamVocabulary}
            className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-sumire/18 bg-sumire/8 px-3 py-2 text-sm font-extrabold text-sumire transition hover:bg-sumire hover:text-white active:scale-95"
          >
            考试词汇
            <Trophy aria-hidden="true" size={15} />
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

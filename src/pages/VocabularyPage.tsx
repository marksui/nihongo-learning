import { BookOpen, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";
import FilterChips from "../components/FilterChips";
import PageHero from "../components/PageHero";
import WordCard from "../components/WordCard";
import { vocabulary, vocabularyCategories, type VocabularyCategory } from "../data/vocabulary";
import { formatRomajiReading } from "../utils/romaji";

interface VocabularyPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

type CategoryFilter = "全部" | VocabularyCategory;

const VocabularyPage = ({ onSpeak }: VocabularyPageProps) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("全部");

  const filterOptions = useMemo(() => ["全部", ...vocabularyCategories] as CategoryFilter[], []);

  const categoryCounts = useMemo(() => {
    return filterOptions.reduce<Partial<Record<CategoryFilter, number>>>((counts, item) => {
      counts[item] = item === "全部" ? vocabulary.length : vocabulary.filter((word) => word.category === item).length;
      return counts;
    }, {});
  }, [filterOptions]);

  const filteredWords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return vocabulary.filter((word) => {
      const matchesCategory = category === "全部" || word.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [
          word.japanese,
          word.kana,
          word.romaji,
          formatRomajiReading(word.romaji),
          word.meaning,
          word.sentence,
          word.translation,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="space-y-7">
      <PageHero
        accent="sakura"
        eyebrow="Vocabulary"
        icon={BookOpen}
        title="常用单词"
        description="入门词卡按场景分组，包含日语、假名读法、分隔 romaji、中文意思、例句和中文翻译。食物、水果、蔬菜保留插图，适合边看边听。"
        stats={[
          { label: "分类", value: vocabularyCategories.length },
          { label: "词卡", value: vocabulary.length },
          { label: "点读", value: "例句" },
        ]}
      />

      <section className="sticky top-20 z-20 rounded-lg border border-ink/10 bg-[#fffdf1]/94 p-4 shadow-card backdrop-blur md:top-24">
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
              placeholder="搜索日语、假名、romaji 或中文意思"
              className="min-h-12 w-full rounded-md border border-black/10 bg-rice/72 pl-11 pr-4 text-sm font-semibold text-ink placeholder:text-ink/38"
            />
          </label>
          <p className="text-sm font-bold text-ink/60">{filteredWords.length} / {vocabulary.length} 个词</p>
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
            <EmptyState title="没有找到单词" description="换一个假名、中文意思或分类再试试。" />
          </div>
        )}
      </section>
    </div>
  );
};

export default VocabularyPage;

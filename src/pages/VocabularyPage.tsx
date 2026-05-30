import { Search } from "lucide-react";
import { useMemo, useState } from "react";
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
      <section className="rounded-lg border border-black/10 bg-white/88 p-6 shadow-card">
        <p className="text-sm font-bold text-coral">Vocabulary</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-ink">常用单词</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">
          词卡按入门场景分组，包含日语、假名读法、罗马音、中文意思、例句和中文翻译。食物、水果、蔬菜词卡配有插图，适合看图记词。
        </p>

        <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
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
              className="min-h-12 w-full rounded-md border border-black/10 bg-rice/72 pl-11 pr-4 text-sm text-ink placeholder:text-ink/38"
            />
          </label>
          <p className="text-sm font-bold text-ink/60">{filteredWords.length} / {vocabulary.length} 个词</p>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {(["全部", ...vocabularyCategories] as CategoryFilter[]).map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`min-h-10 shrink-0 cursor-pointer rounded-md px-3 py-2 text-sm font-bold transition ${
                  active
                    ? "bg-ink text-white"
                    : "border border-black/10 bg-white text-ink/68 hover:bg-rice hover:text-ink"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredWords.map((word) => (
          <WordCard key={word.id} word={word} onSpeak={onSpeak} />
        ))}
      </section>
    </div>
  );
};

export default VocabularyPage;

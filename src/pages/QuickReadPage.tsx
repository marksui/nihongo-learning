import { Search, Volume2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  quickPhraseCategories,
  quickPhrases,
  type QuickPhraseCategory,
} from "../data/quickPhrases";

interface QuickReadPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

type CategoryFilter = "全部" | QuickPhraseCategory;

const QuickReadPage = ({ onSpeak }: QuickReadPageProps) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("全部");

  const filteredPhrases = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return quickPhrases.filter((phrase) => {
      const matchesCategory = category === "全部" || phrase.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [phrase.japanese, phrase.kana, phrase.romaji, phrase.meaning, phrase.category]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="space-y-7">
      <section className="rounded-lg border border-black/10 bg-white/88 p-6 shadow-card">
        <p className="text-sm font-bold text-matcha">Quick Speak</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-ink">快捷朗读表</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">
          常用句按情景整理成表格。直接点击日语文字即可朗读，适合出门前快速跟读和现场查句子。
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
              placeholder="搜索日语、假名、romaji、中文或情景"
              className="min-h-12 w-full rounded-md border border-black/10 bg-rice/72 pl-11 pr-4 text-sm text-ink placeholder:text-ink/38"
            />
          </label>
          <p className="text-sm font-bold text-ink/60">
            {filteredPhrases.length} / {quickPhrases.length} 句
          </p>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {(["全部", ...quickPhraseCategories] as CategoryFilter[]).map((item) => {
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

      <section className="overflow-hidden rounded-lg border border-black/10 bg-white/92 shadow-card">
        <div className="hidden grid-cols-[9rem_1.3fr_1fr_1fr] gap-4 border-b border-black/10 bg-ink px-5 py-3 text-sm font-bold text-white md:grid">
          <span>情景</span>
          <span>点击日语朗读</span>
          <span>假名 / romaji</span>
          <span>中文意思</span>
        </div>

        <div className="divide-y divide-black/8">
          {filteredPhrases.map((phrase) => (
            <article
              key={phrase.id}
              className="grid gap-3 px-4 py-4 transition hover:bg-rice/62 md:grid-cols-[9rem_1.3fr_1fr_1fr] md:items-center md:px-5"
            >
              <p className="w-fit rounded-md bg-sky px-2 py-1 text-xs font-bold text-ink/66">
                {phrase.category}
              </p>
              <button
                type="button"
                onClick={() => onSpeak(phrase.japanese)}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md bg-white px-3 py-2 text-left text-xl font-bold text-ink shadow-sm transition hover:bg-matcha hover:text-white active:scale-[0.99]"
                aria-label={`朗读 ${phrase.japanese}`}
                title="点击文字朗读"
              >
                <Volume2 aria-hidden="true" className="shrink-0" size={19} />
                <span>{phrase.japanese}</span>
              </button>
              <p className="text-sm leading-6 text-ink/62">
                {phrase.kana}
                <br />
                <span className="font-semibold text-coral">{phrase.romaji}</span>
              </p>
              <p className="text-sm font-semibold leading-6 text-ink/74">{phrase.meaning}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default QuickReadPage;

import { Search, Volume2 } from "lucide-react";
import { useMemo, useState } from "react";
import { numberExamples, numberGroups, type NumberGroup } from "../data/numbers";
import { formatRomajiReading } from "../utils/romaji";

interface NumbersPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

type NumberFilter = "全部" | NumberGroup;

const NumbersPage = ({ onSpeak }: NumbersPageProps) => {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<NumberFilter>("全部");

  const filteredNumbers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return numberExamples.filter((item) => {
      const matchesGroup = group === "全部" || item.group === group;
      const matchesQuery =
        !normalizedQuery ||
        [
          item.display,
          item.japanese,
          item.kana,
          item.romaji,
          formatRomajiReading(item.romaji),
          item.meaning,
          item.note,
          item.group,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesGroup && matchesQuery;
    });
  }, [group, query]);

  return (
    <div className="space-y-7">
      <section className="rounded-lg border border-black/10 bg-white/88 p-6 shadow-card">
        <p className="text-sm font-bold text-coral">Numbers</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-ink">数字读法</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">
          日语数字不是只背 1 到 10 就够了。这里把中文用户最容易混淆的价格、日期、人数、年龄、楼层和大数字整理在一起，点击日语读法即可朗读。
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
              placeholder="搜索数字、日语、假名、romaji 或中文"
              className="min-h-12 w-full rounded-md border border-black/10 bg-rice/72 pl-11 pr-4 text-sm text-ink placeholder:text-ink/38"
            />
          </label>
          <p className="text-sm font-bold text-ink/60">
            {filteredNumbers.length} / {numberExamples.length} 条
          </p>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {(["全部", ...numberGroups] as NumberFilter[]).map((item) => {
            const active = group === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setGroup(item)}
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

      <section className="grid gap-4 lg:grid-cols-2">
        {filteredNumbers.map((item) => (
          <article
            key={item.id}
            className="rounded-lg border border-black/10 bg-white/92 p-5 shadow-card transition hover:-translate-y-0.5 hover:border-coral/35 hover:shadow-soft"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="mb-3 w-fit rounded-md bg-sun/22 px-2 py-1 text-xs font-bold text-ink/66">
                  {item.group}
                </p>
                <p className="break-words font-serif text-4xl font-bold text-ink">{item.display}</p>
                <p className="mt-2 text-sm font-semibold text-ink/62">{item.meaning}</p>
              </div>
              <button
                type="button"
                onClick={() => onSpeak(item.japanese)}
                className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-md bg-matcha text-white transition hover:bg-matcha/90 active:scale-95"
                aria-label={`朗读 ${item.japanese}`}
                title="朗读"
              >
                <Volume2 aria-hidden="true" size={20} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => onSpeak(item.japanese)}
              className="group mt-5 w-full cursor-pointer rounded-md bg-sky/70 px-4 py-3 text-left transition hover:bg-matcha hover:text-white active:scale-[0.99]"
              title="点击日语读法朗读"
            >
              <span className="block text-2xl font-bold">{item.japanese}</span>
              <span className="mt-2 block text-sm opacity-80">{item.kana}</span>
              <span className="mt-1 block text-sm font-semibold text-coral group-hover:text-white">
                {formatRomajiReading(item.romaji)}
              </span>
            </button>

            {item.note ? (
              <p className="mt-4 rounded-md border border-coral/20 bg-coral/8 px-3 py-2 text-sm leading-6 text-ink/70">
                {item.note}
              </p>
            ) : null}
          </article>
        ))}
      </section>
    </div>
  );
};

export default NumbersPage;

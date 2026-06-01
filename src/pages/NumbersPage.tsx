import { Hash, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";
import FilterChips from "../components/FilterChips";
import LearningCard from "../components/LearningCard";
import PageHero from "../components/PageHero";
import SpeakButton from "../components/SpeakButton";
import { numberExamples, numberGroups, type NumberGroup } from "../data/numbers";
import { formatRomajiReading } from "../utils/romaji";

interface NumbersPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

type NumberFilter = "全部" | NumberGroup;

const NumbersPage = ({ onSpeak }: NumbersPageProps) => {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<NumberFilter>("全部");
  const [activeNumberId, setActiveNumberId] = useState<string | null>(null);

  const filterOptions = useMemo(() => ["全部", ...numberGroups] as NumberFilter[], []);

  const groupCounts = useMemo(() => {
    return filterOptions.reduce<Partial<Record<NumberFilter, number>>>((counts, item) => {
      counts[item] = item === "全部" ? numberExamples.length : numberExamples.filter((number) => number.group === item).length;
      return counts;
    }, {});
  }, [filterOptions]);

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

  const playNumber = async (id: string, text: string) => {
    setActiveNumberId(id);
    const ok = await onSpeak(text);

    window.setTimeout(() => {
      setActiveNumberId((current) => (current === id ? null : current));
    }, ok ? 260 : 900);
  };

  return (
    <div className="space-y-7">
      <PageHero
        accent="yuzu"
        eyebrow="Numbers"
        icon={Hash}
        title="数字读法"
        description="从 0 到复杂金额、日期、人数、楼层和电话编号都整理在一起。点击数字卡片或播放按钮，就能听到日语读法。"
        stats={[
          { label: "分类", value: numberGroups.length },
          { label: "读法", value: numberExamples.length },
          { label: "重点", value: "复杂数字" },
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
              placeholder="搜索数字、日语、假名、romaji 或中文"
              className="min-h-12 w-full rounded-md border border-black/10 bg-rice/72 pl-11 pr-4 text-sm font-semibold text-ink placeholder:text-ink/38"
            />
          </label>
          <p className="text-sm font-bold text-ink/60">
            {filteredNumbers.length} / {numberExamples.length} 条读法
          </p>
        </div>

        <div className="mt-4">
          <FilterChips
            active={group}
            counts={groupCounts}
            icon={Sparkles}
            label="数字场景"
            onChange={setGroup}
            options={filterOptions}
          />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {filteredNumbers.length ? (
          filteredNumbers.map((item) => {
            const active = activeNumberId === item.id;

            return (
              <LearningCard
                key={item.id}
                className={active ? "border-yuzu/70 bg-yuzu/10 ring-2 ring-yuzu/30" : ""}
                interactive
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mb-3 w-fit rounded-md bg-yuzu/24 px-2 py-1 text-xs font-extrabold text-ink/66">
                      {item.group}
                    </p>
                    <p className="break-words font-serif text-4xl font-bold text-ink">{item.display}</p>
                    <p className="mt-2 text-sm font-semibold text-ink/62">{item.meaning}</p>
                  </div>
                  <SpeakButton
                    active={active}
                    ariaLabel={`朗读 ${item.japanese}`}
                    onClick={() => playNumber(item.id, item.japanese)}
                    title="朗读"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => void playNumber(item.id, item.japanese)}
                  className={`group mt-5 w-full cursor-pointer rounded-md px-4 py-3 text-left transition active:scale-[0.99] ${
                    active ? "bg-matcha text-white" : "bg-rice/55 hover:bg-matcha hover:text-white"
                  }`}
                  title="点击日语读法朗读"
                >
                  <span className="block break-words text-2xl font-bold">{item.japanese}</span>
                  <span className="mt-2 block break-words text-sm opacity-80">{item.kana}</span>
                  <span
                    className={`mt-1 block break-words text-sm font-semibold ${
                      active ? "text-white" : "text-sakura group-hover:text-white"
                    }`}
                  >
                    {formatRomajiReading(item.romaji)}
                  </span>
                </button>

                {item.note ? (
                  <p className="mt-4 rounded-md border border-sakura/20 bg-sakura/8 px-3 py-2 text-sm leading-6 text-ink/70">
                    {item.note}
                  </p>
                ) : null}
              </LearningCard>
            );
          })
        ) : (
          <div className="lg:col-span-2">
            <EmptyState title="没有找到数字读法" description="换一个数字、假名或中文关键词试试。" />
          </div>
        )}
      </section>
    </div>
  );
};

export default NumbersPage;

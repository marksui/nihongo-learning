import { CheckCircle2, Clock3, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";
import FilterChips from "../components/FilterChips";
import LearningCard from "../components/LearningCard";
import PageHero from "../components/PageHero";
import SpeakButton from "../components/SpeakButton";
import { numberExamples, numberGroups, numberSceneExamples, type NumberGroup } from "../data/numbers";
import { isContentCompleted, markContentCompleted, readLearningProgress, recordSeenContent } from "../utils/progress";
import { formatRomajiReading } from "../utils/romaji";

interface NumbersPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

type NumberFilter = "全部" | NumberGroup;

const NumbersPage = ({ onSpeak }: NumbersPageProps) => {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<NumberFilter>("全部");
  const [activeNumberId, setActiveNumberId] = useState<string | null>(null);
  const [activeSceneId, setActiveSceneId] = useState<string | null>(null);
  const [learningProgress, setLearningProgress] = useState(() => readLearningProgress());

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

  const filteredScenes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return numberSceneExamples.filter((item) => {
      const matchesGroup = group === "全部" || item.group === group;
      const matchesQuery =
        !normalizedQuery ||
        [
          item.title,
          item.situation,
          item.highlight,
          item.japanese,
          item.kana,
          item.romaji,
          formatRomajiReading(item.romaji),
          item.meaning,
          item.group,
          item.tags?.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesGroup && matchesQuery;
    });
  }, [group, query]);

  const playNumber = async (id: string, text: string) => {
    setActiveNumberId(id);
    setLearningProgress(recordSeenContent(`number:${id}`));
    const ok = await onSpeak(text);

    window.setTimeout(() => {
      setActiveNumberId((current) => (current === id ? null : current));
    }, ok ? 260 : 900);
  };

  const playScene = async (id: string, text: string) => {
    setActiveSceneId(id);
    setLearningProgress(recordSeenContent(`number:${id}`));
    const ok = await onSpeak(text);

    window.setTimeout(() => {
      setActiveSceneId((current) => (current === id ? null : current));
    }, ok ? 360 : 900);
  };

  const markNumberMastered = (id: string) => {
    setLearningProgress(markContentCompleted(`number:${id}`));
  };

  const getNumberStatus = (id: string) => {
    const contentId = `number:${id}`;

    return {
      seen: learningProgress.seenContentIds.includes(contentId),
      completed: isContentCompleted(learningProgress, contentId),
    };
  };

  return (
    <div className="space-y-6">
      <PageHero
        title="数字读法"
        description="数字、金额、日期、人数、楼层和电话都能直接点读。"
        stats={[
          { label: "分类", value: numberGroups.length },
          { label: "读法", value: numberExamples.length },
          { label: "场景", value: numberSceneExamples.length },
        ]}
      />

      <section className="compact-sticky-panel sticky-learn-toolbar sticky top-[3.85rem] z-20 overflow-y-auto p-3 backdrop-blur sm:p-4 lg:top-[5rem]">
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
              className="input-surface min-h-12 w-full rounded-md pl-11 pr-4 text-sm font-semibold text-ink placeholder:text-ink/38"
            />
          </label>
          <p className="rounded-md bg-rice/55 px-3 py-2 text-sm font-bold text-ink/60">
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

      {filteredScenes.length ? (
        <section className="space-y-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-ink">直接点整句</h2>
            </div>
            <p className="text-sm font-bold text-ink/58">{filteredScenes.length} 个场景</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filteredScenes.map((scene) => {
              const active = activeSceneId === scene.id;
              const status = getNumberStatus(scene.id);

              return (
                <LearningCard
                  key={scene.id}
                  className={`p-0 ${active ? "border-matcha/70 bg-matcha/8 ring-2 ring-matcha/24" : ""}`}
                  interactive
                >
                  <div className="flex h-full flex-col p-3 sm:p-4">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="mb-2 w-fit rounded-md bg-rice px-2 py-1 text-xs font-extrabold text-ink/58">
                          {scene.group}
                        </p>
                        <p
                          className={`mb-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-extrabold ${
                            status.completed
                              ? "bg-matcha/12 text-matcha"
                              : status.seen
                                ? "bg-yuzu/18 text-ink/62"
                                : "bg-paper text-ink/45"
                          }`}
                        >
                          {status.completed ? <CheckCircle2 aria-hidden="true" size={14} /> : <Clock3 aria-hidden="true" size={14} />}
                          {status.completed ? "已掌握" : status.seen ? "已听过" : "未开始"}
                        </p>
                        <h3 className="text-base font-extrabold text-ink">{scene.title}</h3>
                        <p className="mt-1 text-sm leading-5 text-ink/60">{scene.situation}</p>
                      </div>
                      <SpeakButton
                        active={active}
                        ariaLabel={`朗读 ${scene.title}`}
                        onClick={() => playScene(scene.id, scene.audioText ?? scene.japanese)}
                        title="朗读整句"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => void playScene(scene.id, scene.audioText ?? scene.japanese)}
                      className={`tap-surface mt-auto w-full cursor-pointer rounded-md px-3 py-3 text-left transition active:scale-[0.99] ${
                        active ? "bg-matcha text-white" : "bg-yuzu/12 hover:bg-matcha hover:text-white"
                      }`}
                      title="点击整句朗读"
                    >
                      <span className={`mb-2 inline-flex rounded px-2 py-0.5 text-xs font-extrabold ${
                        active ? "bg-white/18 text-white" : "bg-paper text-matcha"
                      }`}>
                        {scene.highlight}
                      </span>
                      <span className="block break-words font-japanese text-lg font-extrabold leading-7">{scene.japanese}</span>
                      <span className="mt-1.5 block break-words text-sm font-semibold opacity-80">{scene.kana}</span>
                      <span
                        className={`mt-1 block break-words text-sm font-semibold ${
                          active ? "text-white" : "text-sakura"
                        }`}
                      >
                        {formatRomajiReading(scene.romaji)}
                      </span>
                    </button>

                    <p className="mt-2 text-sm font-semibold leading-6 text-ink/70">中文：{scene.meaning}</p>
                    <button
                      type="button"
                      onClick={() => markNumberMastered(scene.id)}
                      disabled={status.completed}
                      aria-pressed={status.completed}
                      className={`mt-2 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-extrabold transition active:scale-[0.99] ${
                        status.completed
                          ? "cursor-default border-matcha/20 bg-matcha/10 text-matcha"
                          : "border-yuzu/28 bg-yuzu/14 text-ink/68 hover:bg-yuzu/24 hover:text-ink"
                      }`}
                    >
                      <CheckCircle2 aria-hidden="true" size={16} />
                      {status.completed ? "已掌握" : "标记掌握"}
                    </button>
                  </div>
                </LearningCard>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="tool-card-grid">
        {filteredNumbers.length ? (
          filteredNumbers.map((item) => {
            const active = activeNumberId === item.id;

            return (
              <LearningCard
                key={item.id}
                className={`overflow-hidden p-3 ${active ? "border-yuzu/70 bg-yuzu/10 ring-2 ring-yuzu/30" : ""}`}
                interactive
              >
                <div className="flex items-start justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => void playNumber(item.id, item.audioText ?? item.japanese)}
                    className="group flex min-w-0 flex-1 cursor-pointer items-start gap-3 rounded-lg text-left transition active:scale-[0.99]"
                    title="点击日语读法朗读"
                  >
                    <span
                      className={`number-glyph grid h-16 w-16 shrink-0 place-items-center rounded-lg border px-1 text-center text-[1.55rem] font-extrabold leading-none transition sm:h-[4.6rem] sm:w-[4.6rem] sm:text-[1.75rem] ${
                        active
                          ? "border-matcha bg-matcha text-white"
                          : "border-ink/10 bg-rice/62 text-ink group-hover:border-matcha/30 group-hover:bg-matcha/8"
                      }`}
                    >
                      {item.display}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="mb-1.5 inline-flex rounded-md bg-yuzu/16 px-2 py-0.5 text-xs font-extrabold text-ink/58">
                        {item.group}
                      </span>
                      <span className={`jp-display block break-words text-[1.65rem] ${active ? "text-matcha" : "text-ink"}`}>
                        {item.japanese}
                      </span>
                      <span className="mt-1 block break-words text-[0.95rem] font-bold leading-6 text-ink/62">{item.kana}</span>
                      <span className="mt-0.5 block break-words font-reading text-[0.95rem] font-extrabold leading-6 text-sakura">
                        {formatRomajiReading(item.romaji)}
                      </span>
                    </span>
                  </button>
                  <SpeakButton
                    active={active}
                    ariaLabel={`朗读 ${item.japanese}`}
                    className="h-10 w-10"
                    onClick={() => playNumber(item.id, item.audioText ?? item.japanese)}
                    title="朗读"
                  />
                </div>

                <p className="mt-3 break-words rounded-md border border-ink/8 bg-paper/70 px-3 py-2 text-sm font-extrabold leading-6 text-ink/70">
                  {item.meaning}
                </p>

                {item.note ? (
                  <p className="mt-2 rounded-md border border-sakura/18 bg-sakura/7 px-2.5 py-1.5 text-sm font-semibold leading-6 text-ink/66">
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

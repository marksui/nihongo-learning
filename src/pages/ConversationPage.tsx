import { MessageCircle, Search, Sparkles, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import DialogueCard from "../components/DialogueCard";
import EmptyState from "../components/EmptyState";
import FilterChips from "../components/FilterChips";
import PageHero from "../components/PageHero";
import { dialogueModes, dialogues, type DialogueMode } from "../data/dialogues";

interface ConversationPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

type ModeFilter = "全部" | DialogueMode;

const quickSceneTerms = ["机场", "电车", "酒店", "付款", "身体", "请假", "拍照", "维修"];

const ConversationPage = ({ onSpeak }: ConversationPageProps) => {
  const [selectedMode, setSelectedMode] = useState<ModeFilter>("全部");
  const [selectedDialogueId, setSelectedDialogueId] = useState(dialogues[0]?.id ?? "");
  const [query, setQuery] = useState("");

  const modeOptions = useMemo(() => ["全部", ...dialogueModes] as ModeFilter[], []);

  const modeCounts = useMemo(() => {
    return modeOptions.reduce<Record<ModeFilter, number>>((counts, mode) => {
      counts[mode] = mode === "全部" ? dialogues.length : dialogues.filter((dialogue) => dialogue.mode === mode).length;
      return counts;
    }, {} as Record<ModeFilter, number>);
  }, [modeOptions]);

  const visibleDialogues = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return dialogues.filter((dialogue) => {
      const matchesMode = selectedMode === "全部" || dialogue.mode === selectedMode;
      const matchesQuery =
        !normalizedQuery ||
        [
          dialogue.title,
          dialogue.mode,
          dialogue.practiceSpeaker,
          dialogue.situation,
          ...(dialogue.tags ?? []),
          ...dialogue.lines.flatMap((line) => [line.speaker, line.japanese, line.kana, line.translation]),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesMode && matchesQuery;
    });
  }, [query, selectedMode]);

  useEffect(() => {
    if (visibleDialogues.length && !visibleDialogues.some((dialogue) => dialogue.id === selectedDialogueId)) {
      setSelectedDialogueId(visibleDialogues[0].id);
    }
  }, [selectedDialogueId, visibleDialogues]);

  const selectedDialogue =
    visibleDialogues.find((dialogue) => dialogue.id === selectedDialogueId) ?? visibleDialogues[0];

  const totalLines = dialogues.reduce((sum, dialogue) => sum + dialogue.lines.length, 0);

  return (
    <div className="min-w-0 space-y-6">
      <PageHero
        title="日常会话"
        description="先选场景，再按“你说 / 对方说”对照跟读。可以逐句、整段或只听一方。"
        stats={[
          { label: "情景", value: dialogues.length },
          { label: "模式", value: dialogueModes.length },
          { label: "句子", value: totalLines },
        ]}
      />

      <section className="sticky-learn-toolbar p-3 sm:p-4">
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
              placeholder="搜机场、付款、请假、身体、日语或中文"
              className="input-surface min-h-12 w-full rounded-md pl-11 pr-4 text-sm font-semibold text-ink placeholder:text-ink/38"
            />
          </label>
          <p className="text-sm font-bold text-ink/60">
            {visibleDialogues.length} / {dialogues.length} 个场景
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {quickSceneTerms.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setSelectedMode("全部");
                setQuery(term);
              }}
              className="tap-surface rounded-md border border-ink/10 bg-rice/45 px-3 py-1.5 text-sm font-extrabold text-ink/70 transition hover:border-matcha/25 hover:bg-rice hover:text-ink"
            >
              {term}
            </button>
          ))}
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="tap-surface rounded-md border border-sakura/20 bg-sakura/8 px-3 py-1.5 text-sm font-extrabold text-sakura transition hover:bg-sakura/12"
            >
              清空
            </button>
          ) : null}
        </div>

        <div className="mt-4">
          <FilterChips
            active={selectedMode}
            counts={modeCounts}
            icon={Sparkles}
            label="情景模式"
            onChange={setSelectedMode}
            options={modeOptions}
          />
        </div>
      </section>

      <section className="grid min-w-0 gap-4 lg:grid-cols-[19rem_minmax(0,1fr)]">
        <aside className="min-w-0 overflow-hidden rounded-lg border border-ink/10 bg-paper/92 p-3 shadow-card lg:sticky lg:top-[5rem] lg:max-h-[calc(100vh-6rem)]">
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-2 text-sm font-bold text-ink">
              <MessageCircle aria-hidden="true" className="text-matcha" size={18} />
              情景列表
            </div>
            <span className="rounded-md bg-rice px-2 py-1 text-xs font-bold text-ink/58">
              {visibleDialogues.length} 个
            </span>
          </div>

          <div className="filter-scroll-row mt-2 grid max-h-[18rem] gap-2 overflow-y-auto pr-1 sm:max-h-[22rem] sm:grid-cols-2 lg:max-h-[calc(100vh-10rem)] lg:grid-cols-1">
            {visibleDialogues.map((dialogue) => {
              const active = selectedDialogue?.id === dialogue.id;
              const partnerSpeakers = Array.from(
                new Set(dialogue.lines.map((line) => line.speaker).filter((speaker) => speaker !== dialogue.practiceSpeaker)),
              ).join(" / ");

              return (
                <button
                  key={dialogue.id}
                  type="button"
                  onClick={() => setSelectedDialogueId(dialogue.id)}
                  className={`w-full cursor-pointer rounded-lg border p-3 text-left transition ${
                    active
                      ? "border-matcha bg-matcha/10 shadow-sm ring-2 ring-matcha/15"
                      : "border-ink/8 bg-rice/35 hover:border-yuzu/35 hover:bg-rice/70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-sakura">{dialogue.mode}</p>
                      <h2 className="mt-1 break-words text-base font-extrabold text-ink">{dialogue.title}</h2>
                    </div>
                    <span className="rounded-md bg-ink px-2 py-1 text-xs font-bold text-white">
                      {dialogue.lines.length} 句
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 break-words text-xs leading-5 text-ink/62">{dialogue.situation}</p>
                  <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2 text-xs font-bold text-ink/55">
                    <Users aria-hidden="true" size={14} />
                    <span>你：{dialogue.practiceSpeaker}</span>
                    <span className="text-ink/30">/</span>
                    <span className="min-w-0 break-words">对方：{partnerSpeakers}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {selectedDialogue ? (
          <DialogueCard key={selectedDialogue.id} dialogue={selectedDialogue} onSpeak={onSpeak} />
        ) : (
          <EmptyState title="没有找到会话" description="换一个关键词，或清空搜索后再选情景。" />
        )}
      </section>
    </div>
  );
};

export default ConversationPage;

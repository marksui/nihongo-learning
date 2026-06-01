import { MessageCircle, Sparkles, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import DialogueCard from "../components/DialogueCard";
import FilterChips from "../components/FilterChips";
import PageHero from "../components/PageHero";
import { dialogueModes, dialogues, type DialogueMode } from "../data/dialogues";

interface ConversationPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

type ModeFilter = "全部" | DialogueMode;

const ConversationPage = ({ onSpeak }: ConversationPageProps) => {
  const [selectedMode, setSelectedMode] = useState<ModeFilter>("全部");
  const [selectedDialogueId, setSelectedDialogueId] = useState(dialogues[0]?.id ?? "");

  const modeOptions = useMemo(() => ["全部", ...dialogueModes] as ModeFilter[], []);

  const modeCounts = useMemo(() => {
    return modeOptions.reduce<Record<ModeFilter, number>>((counts, mode) => {
      counts[mode] = mode === "全部" ? dialogues.length : dialogues.filter((dialogue) => dialogue.mode === mode).length;
      return counts;
    }, {} as Record<ModeFilter, number>);
  }, [modeOptions]);

  const visibleDialogues = useMemo(
    () => (selectedMode === "全部" ? dialogues : dialogues.filter((dialogue) => dialogue.mode === selectedMode)),
    [selectedMode],
  );

  useEffect(() => {
    if (visibleDialogues.length && !visibleDialogues.some((dialogue) => dialogue.id === selectedDialogueId)) {
      setSelectedDialogueId(visibleDialogues[0].id);
    }
  }, [selectedDialogueId, visibleDialogues]);

  const selectedDialogue =
    visibleDialogues.find((dialogue) => dialogue.id === selectedDialogueId) ?? visibleDialogues[0] ?? dialogues[0];

  const totalLines = dialogues.reduce((sum, dialogue) => sum + dialogue.lines.length, 0);

  return (
    <div className="min-w-0 space-y-6">
      <PageHero
        accent="matcha"
        eyebrow="Conversation"
        icon={MessageCircle}
        title="日常会话"
        description="用情景模式听真实对话。先选场景，再按“你说 / 对方说”对照跟读，也可以只听对方或只听我方，像现场轮流说话一样。"
        stats={[
          { label: "情景", value: dialogues.length },
          { label: "模式", value: dialogueModes.length },
          { label: "句子", value: totalLines },
        ]}
      />

      <section className="rounded-lg border border-ink/10 bg-[#fffdf1]/94 p-4 shadow-card">
        <FilterChips
          active={selectedMode}
          counts={modeCounts}
          icon={Sparkles}
          label="情景模式"
          onChange={setSelectedMode}
          options={modeOptions}
        />
      </section>

      <section className="grid min-w-0 gap-5 lg:grid-cols-[21rem_minmax(0,1fr)]">
        <aside className="min-w-0 overflow-hidden rounded-lg border border-ink/10 bg-[#fffdf1]/92 p-3 shadow-card lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)]">
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-2 text-sm font-bold text-ink">
              <MessageCircle aria-hidden="true" className="text-matcha" size={18} />
              情景列表
            </div>
            <span className="rounded-md bg-rice px-2 py-1 text-xs font-bold text-ink/58">
              {visibleDialogues.length} 个
            </span>
          </div>

          <div className="mt-2 grid max-h-96 gap-2 overflow-y-auto pr-1 lg:max-h-[calc(100vh-12rem)]">
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
                  className={`min-w-0 cursor-pointer rounded-md border p-3 text-left transition ${
                    active
                      ? "border-matcha bg-matcha/10 shadow-card ring-2 ring-matcha/15"
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

        {selectedDialogue ? <DialogueCard key={selectedDialogue.id} dialogue={selectedDialogue} onSpeak={onSpeak} /> : null}
      </section>
    </div>
  );
};

export default ConversationPage;

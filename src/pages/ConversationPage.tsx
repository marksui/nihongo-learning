import { MessageCircle, Sparkles, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import DialogueCard from "../components/DialogueCard";
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
      <section className="min-w-0 overflow-hidden rounded-lg border border-black/10 bg-white/88 p-6 shadow-card">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="min-w-0">
            <p className="text-sm font-bold text-matcha">Conversation</p>
            <h1 className="mt-2 font-serif text-4xl font-bold text-ink">日常会话</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">
              用情景模式听真实对话。左边选场景，右边按“你说 / 对方说”对照跟读，可以只听对方或只听我方，像现场轮流说话一样。
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-3 gap-2 text-center">
            <div className="min-w-0 rounded-md bg-rice px-2 py-3 sm:px-3">
              <p className="text-2xl font-extrabold text-ink">{dialogues.length}</p>
              <p className="mt-1 text-xs font-bold text-ink/58">情景</p>
            </div>
            <div className="min-w-0 rounded-md bg-sky px-2 py-3 sm:px-3">
              <p className="text-2xl font-extrabold text-ink">{dialogueModes.length}</p>
              <p className="mt-1 text-xs font-bold text-ink/58">模式</p>
            </div>
            <div className="min-w-0 rounded-md bg-matcha/10 px-2 py-3 sm:px-3">
              <p className="text-2xl font-extrabold text-matcha">{totalLines}</p>
              <p className="mt-1 text-xs font-bold text-ink/58">句子</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {modeOptions.map((mode) => {
            const active = selectedMode === mode;

            return (
              <button
                key={mode}
                type="button"
                onClick={() => setSelectedMode(mode)}
                className={`flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-bold transition ${
                  active
                    ? "bg-ink text-white"
                    : "border border-black/10 bg-white text-ink/68 hover:bg-rice hover:text-ink"
                }`}
              >
                <Sparkles aria-hidden="true" size={15} />
                <span>{mode === "全部" ? "全部模式" : mode}</span>
                <span className={`rounded px-1.5 py-0.5 text-xs ${active ? "bg-white/16" : "bg-rice"}`}>
                  {modeCounts[mode]}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid min-w-0 gap-5 lg:grid-cols-[21rem_minmax(0,1fr)]">
        <aside className="min-w-0 overflow-hidden rounded-lg border border-black/10 bg-white/92 p-3 shadow-card lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)]">
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
                      ? "border-matcha bg-matcha/10 shadow-card"
                      : "border-black/8 bg-white hover:border-matcha/35 hover:bg-rice/70"
              }`}
            >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-coral">{dialogue.mode}</p>
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

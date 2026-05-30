import { useMemo, useState } from "react";
import DialogueCard from "../components/DialogueCard";
import { dialogues } from "../data/dialogues";

interface ConversationPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

const ConversationPage = ({ onSpeak }: ConversationPageProps) => {
  const [selectedDialogueId, setSelectedDialogueId] = useState("all");

  const visibleDialogues = useMemo(() => {
    if (selectedDialogueId === "all") {
      return dialogues;
    }

    return dialogues.filter((dialogue) => dialogue.id === selectedDialogueId);
  }, [selectedDialogueId]);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-black/10 bg-white/88 p-6 shadow-card">
        <p className="text-sm font-bold text-matcha">Conversation</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-ink">日常会话</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">
          选择一个情景后逐句跟读，也可以连续播放整段。现在覆盖旅行、餐厅、购物、学校、酒店、看病和求助等更多场景。
        </p>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedDialogueId("all")}
            className={`min-h-10 shrink-0 cursor-pointer rounded-md px-3 py-2 text-sm font-bold transition ${
              selectedDialogueId === "all"
                ? "bg-ink text-white"
                : "border border-black/10 bg-white text-ink/68 hover:bg-rice hover:text-ink"
            }`}
          >
            全部情景
          </button>
          {dialogues.map((dialogue) => (
            <button
              key={dialogue.id}
              type="button"
              onClick={() => setSelectedDialogueId(dialogue.id)}
              className={`min-h-10 shrink-0 cursor-pointer rounded-md px-3 py-2 text-sm font-bold transition ${
                selectedDialogueId === dialogue.id
                  ? "bg-matcha text-white"
                  : "border border-black/10 bg-white text-ink/68 hover:bg-rice hover:text-ink"
              }`}
            >
              {dialogue.title}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        {visibleDialogues.map((dialogue) => (
          <DialogueCard key={dialogue.id} dialogue={dialogue} onSpeak={onSpeak} />
        ))}
      </section>
    </div>
  );
};

export default ConversationPage;

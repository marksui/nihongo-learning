import DialogueCard from "../components/DialogueCard";
import { dialogues } from "../data/dialogues";

interface ConversationPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

const ConversationPage = ({ onSpeak }: ConversationPageProps) => {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-black/10 bg-white/88 p-6 shadow-card">
        <p className="text-sm font-bold text-matcha">Conversation</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-ink">日常会话</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">
          每段对话都可以单句播放，也可以连续播放整段，适合跟读和听辨练习。
        </p>
      </section>

      <section className="space-y-5">
        {dialogues.map((dialogue) => (
          <DialogueCard key={dialogue.id} dialogue={dialogue} onSpeak={onSpeak} />
        ))}
      </section>
    </div>
  );
};

export default ConversationPage;

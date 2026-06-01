import { BookOpenCheck } from "lucide-react";
import LessonCard from "../components/LessonCard";
import PageHero from "../components/PageHero";
import { grammarLessons } from "../data/grammar";

interface GrammarPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

const GrammarPage = ({ onSpeak }: GrammarPageProps) => {
  return (
    <div className="space-y-6">
      <PageHero
        accent="sumire"
        eyebrow="Grammar"
        icon={BookOpenCheck}
        title="基础语法"
        description="用中文解释日语句型，例句同时给出日语、假名读法、分隔 romaji 和中文翻译。点击句子可以逐句听发音，并标出中文母语者容易混淆的地方。"
        stats={[
          { label: "课程", value: grammarLessons.length },
          { label: "例句", value: grammarLessons.reduce((sum, lesson) => sum + lesson.examples.length, 0) },
          { label: "读音", value: "动画" },
        ]}
      />

      <section className="space-y-5">
        {grammarLessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} onSpeak={onSpeak} />
        ))}
      </section>
    </div>
  );
};

export default GrammarPage;

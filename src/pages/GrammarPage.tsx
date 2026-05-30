import LessonCard from "../components/LessonCard";
import { grammarLessons } from "../data/grammar";

const GrammarPage = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-black/10 bg-white/88 p-6 shadow-card">
        <p className="text-sm font-bold text-indigo">Grammar</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-ink">基础语法</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">
          用中文解释日语句型，例句同时给出日语、假名读法和中文翻译，并特别标出中文母语者容易混淆的地方。
        </p>
      </section>

      <section className="space-y-5">
        {grammarLessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </section>
    </div>
  );
};

export default GrammarPage;

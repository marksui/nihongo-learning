import { AlertTriangle, BookOpenCheck, CheckCircle2 } from "lucide-react";
import type { GrammarLesson } from "../data/grammar";

interface LessonCardProps {
  lesson: GrammarLesson;
}

const LessonCard = ({ lesson }: LessonCardProps) => {
  return (
    <article className="rounded-lg border border-black/10 bg-white/92 p-5 shadow-card">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-matcha">
            <BookOpenCheck aria-hidden="true" size={18} />
            <span>基础语法</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-ink">{lesson.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/72">{lesson.explanation}</p>
        </div>
        <div className="rounded-md bg-ink px-4 py-3 text-white md:min-w-64">
          <p className="text-xs font-bold text-white/58">句型</p>
          <p className="mt-1 font-serif text-xl font-bold">{lesson.pattern}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {lesson.examples.map((example) => (
          <div key={example.japanese} className="rounded-md border border-black/8 bg-rice/68 p-4">
            <p className="text-lg font-bold text-ink">{example.japanese}</p>
            <p className="mt-1 text-xs text-ink/55">{example.kana}</p>
            <p className="mt-3 text-sm text-ink/72">{example.translation}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-md border border-coral/22 bg-coral/8 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-coral">
          <AlertTriangle aria-hidden="true" size={18} />
          <span>中文母语者常见误区</span>
        </div>
        <ul className="grid gap-2 text-sm leading-6 text-ink/72 md:grid-cols-3">
          {lesson.commonMistakes.map((mistake) => (
            <li key={mistake} className="flex gap-2">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0 text-matcha" size={16} />
              <span>{mistake}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default LessonCard;

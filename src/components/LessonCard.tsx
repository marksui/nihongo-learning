import { AlertTriangle, BookOpenCheck, CheckCircle2, Volume2 } from "lucide-react";
import type { GrammarLesson } from "../data/grammar";
import { formatRomajiReading } from "../utils/romaji";

interface LessonCardProps {
  lesson: GrammarLesson;
  onSpeak: (text: string) => Promise<boolean>;
}

const LessonCard = ({ lesson, onSpeak }: LessonCardProps) => {
  const sampleSentence = lesson.examples[0]?.japanese ?? lesson.pattern;

  return (
    <article className="overflow-hidden rounded-lg border border-black/10 bg-white/92 p-5 shadow-card">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-matcha">
            <BookOpenCheck aria-hidden="true" size={18} />
            <span>基础语法</span>
          </div>
          <h2 className="break-words font-serif text-3xl font-bold text-ink">{lesson.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/72">{lesson.explanation}</p>
        </div>
        <div className="rounded-md bg-ink px-4 py-3 text-white md:min-w-72">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold text-white/58">句型</p>
              <p className="mt-1 break-words font-serif text-xl font-bold">{lesson.pattern}</p>
            </div>
            <button
              type="button"
              onClick={() => void onSpeak(sampleSentence)}
              className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-md bg-white/12 text-white transition hover:bg-white/22 active:scale-95"
              aria-label={`播放${lesson.title}例句`}
              title="播放例句"
            >
              <Volume2 aria-hidden="true" size={19} />
            </button>
          </div>
          <div className="mt-3 space-y-1 border-t border-white/12 pt-3">
            <p className="break-words text-sm font-semibold text-white/80">{lesson.patternKana}</p>
            <p className="break-words font-mono text-xs text-white/62">{formatRomajiReading(lesson.patternRomaji)}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {lesson.examples.map((example) => (
          <div key={example.japanese} className="rounded-md border border-black/8 bg-rice/68 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="break-words text-lg font-bold text-ink">{example.japanese}</p>
                <p className="mt-1 break-words text-xs font-semibold text-ink/58">{example.kana}</p>
                <p className="mt-1 break-words font-mono text-xs text-indigo/78">
                  {formatRomajiReading(example.romaji)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void onSpeak(example.japanese)}
                className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-md bg-indigo/10 text-indigo transition hover:bg-indigo hover:text-white active:scale-95"
                aria-label={`播放 ${example.japanese}`}
                title="播放"
              >
                <Volume2 aria-hidden="true" size={18} />
              </button>
            </div>
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

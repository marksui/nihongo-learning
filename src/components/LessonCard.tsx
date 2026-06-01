import { AlertTriangle, BookOpenCheck, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import AnimatedReading from "./AnimatedReading";
import LearningCard from "./LearningCard";
import SpeakButton from "./SpeakButton";
import type { GrammarLesson } from "../data/grammar";

interface LessonCardProps {
  lesson: GrammarLesson;
  onSpeak: (text: string) => Promise<boolean>;
}

const LessonCard = ({ lesson, onSpeak }: LessonCardProps) => {
  const sampleSentence = lesson.examples[0]?.japanese ?? lesson.pattern;
  const [activeReadingKey, setActiveReadingKey] = useState<string | null>(null);
  const readingRunRef = useRef(0);

  const speakWithReading = async (key: string, text: string) => {
    const runId = readingRunRef.current + 1;
    readingRunRef.current = runId;
    setActiveReadingKey(key);

    const ok = await onSpeak(text);
    window.setTimeout(
      () => {
        if (readingRunRef.current === runId) {
          setActiveReadingKey(null);
        }
      },
      ok ? 300 : 900,
    );
  };

  return (
    <LearningCard className="overflow-hidden">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-matcha">
            <BookOpenCheck aria-hidden="true" size={18} />
            <span>基础语法</span>
          </div>
          <h2 className="break-words font-serif text-3xl font-bold text-ink">{lesson.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/72">{lesson.explanation}</p>
        </div>
        <div className="rounded-md border border-yuzu/28 bg-rice/70 px-4 py-3 text-ink md:min-w-72">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold text-ink/58">句型</p>
              <p className="mt-1 break-words font-serif text-xl font-bold">{lesson.pattern}</p>
            </div>
            <SpeakButton
              active={activeReadingKey === "pattern"}
              ariaLabel={`播放${lesson.title}例句`}
              onClick={() => speakWithReading("pattern", sampleSentence)}
              title="播放例句"
              variant="soft"
            />
          </div>
          <div className="mt-3 space-y-1 border-t border-ink/10 pt-3">
            <AnimatedReading
              kana={lesson.patternKana}
              romaji={lesson.patternRomaji}
              active={activeReadingKey === "pattern"}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {lesson.examples.map((example, index) => {
          const readingKey = `example-${index}`;
          const active = activeReadingKey === readingKey;

          return (
            <div
              key={example.japanese}
              className={`rounded-md border p-4 transition duration-300 ${
                active
                  ? "border-yuzu/50 bg-yuzu/10 shadow-card ring-2 ring-yuzu/25"
                  : "border-black/8 bg-rice/68"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p
                    className={`break-words text-lg font-bold transition-colors ${
                      active ? "text-matcha" : "text-ink"
                    }`}
                  >
                    {example.japanese}
                  </p>
                  <div className="mt-1">
                    <AnimatedReading kana={example.kana} romaji={example.romaji} active={active} />
                  </div>
                </div>
                <SpeakButton
                  active={active}
                  ariaLabel={`播放 ${example.japanese}`}
                  className="h-10 w-10"
                  onClick={() => speakWithReading(readingKey, example.japanese)}
                  title="播放"
                  variant={active ? "solid" : "light"}
                />
              </div>
              <p className="mt-3 text-sm text-ink/72">{example.translation}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-md border border-sakura/22 bg-sakura/8 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-sakura">
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
    </LearningCard>
  );
};

export default LessonCard;

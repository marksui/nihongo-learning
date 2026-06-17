import { AlertTriangle, BookOpenCheck, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import AnimatedReading from "./AnimatedReading";
import LearningCard from "./LearningCard";
import SpeakButton from "./SpeakButton";
import type { GrammarLesson } from "../data/grammar";
import { isContentCompleted, markContentCompleted, readLearningProgress } from "../utils/progress";

interface LessonCardProps {
  lesson: GrammarLesson;
  onSpeak: (text: string) => Promise<boolean>;
}

const LessonCard = ({ lesson, onSpeak }: LessonCardProps) => {
  const contentId = `grammar:${lesson.id}`;
  const sampleSentence = lesson.examples[0]?.japanese ?? lesson.pattern;
  const [activeReadingKey, setActiveReadingKey] = useState<string | null>(null);
  const [studyState, setStudyState] = useState(() => {
    const progress = readLearningProgress();

    return {
      completed: isContentCompleted(progress, contentId),
    };
  });
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

  const markMastered = () => {
    markContentCompleted(contentId);
    setStudyState({ completed: true });
  };

  return (
    <LearningCard className="overflow-hidden bg-paper/96">
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.36fr)] lg:items-start">
        <div className="min-w-0 lg:pt-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-sumire/10 text-sumire">
              <BookOpenCheck aria-hidden="true" size={18} />
            </span>
            {studyState.completed ? (
              <span className="inline-flex items-center gap-1.5 rounded-md bg-matcha/12 px-2.5 py-1 text-xs font-extrabold text-matcha">
                <CheckCircle2 aria-hidden="true" size={14} />
                已掌握
              </span>
            ) : null}
            {lesson.level ? (
              <span className="rounded-md bg-rice/70 px-2.5 py-1 text-xs font-extrabold text-ink/52">{lesson.level}</span>
            ) : null}
          </div>
          <h2 className="section-title break-words text-2xl sm:text-3xl">{lesson.title}</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-ink/70">{lesson.explanation}</p>
        </div>

        <div className="rounded-md border border-matcha/18 bg-matcha/8 p-3 text-ink">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="jp-display break-words text-2xl">{lesson.pattern}</p>
              <div className="mt-2">
                <AnimatedReading
                  kana={lesson.patternKana}
                  romaji={lesson.patternRomaji}
                  active={activeReadingKey === "pattern"}
                />
              </div>
            </div>
            <SpeakButton
              active={activeReadingKey === "pattern"}
              ariaLabel={`播放${lesson.title}例句`}
              onClick={() => speakWithReading("pattern", sampleSentence)}
              title="播放例句"
              variant="soft"
            />
          </div>
          <button
            type="button"
            onClick={markMastered}
            disabled={studyState.completed}
            aria-pressed={studyState.completed}
            className={`mt-4 flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-extrabold transition active:scale-[0.99] ${
              studyState.completed
                ? "cursor-default border-matcha/20 bg-matcha/10 text-matcha"
                : "border-yuzu/30 bg-yuzu/16 text-ink/70 hover:bg-yuzu/25 hover:text-ink"
            }`}
          >
            <CheckCircle2 aria-hidden="true" size={16} />
            {studyState.completed ? "已掌握" : "标记掌握"}
          </button>
        </div>
      </div>

      <div className="border-t border-ink/8 bg-rice/25 px-4 py-4 sm:px-5">
        <div className="grid gap-3 lg:grid-cols-3">
          {lesson.examples.map((example, index) => {
            const readingKey = `example-${index}`;
            const active = activeReadingKey === readingKey;

            return (
              <div
                key={example.japanese}
                className={`min-w-0 rounded-md border p-4 transition duration-300 ${
                  active ? "border-yuzu/40 bg-yuzu/15 ring-2 ring-inset ring-yuzu/30" : "border-ink/8 bg-paper/92"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className={`break-words font-japanese text-xl font-extrabold leading-snug transition-colors ${
                        active ? "text-matcha" : "text-ink"
                      }`}
                    >
                      {example.japanese}
                    </p>
                    <div className="mt-2">
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
                <p className="mt-3 text-sm leading-6 text-ink/68">{example.translation}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-sakura/14 bg-sakura/8 px-4 py-4 sm:px-5">
        <div className="flex gap-3">
          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-sakura/12 text-sakura">
            <AlertTriangle aria-hidden="true" size={17} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-extrabold text-sakura">常见误区</h3>
            <ul className="mt-2 grid gap-2 text-sm leading-6 text-ink/70 md:grid-cols-3">
              {lesson.commonMistakes.map((mistake) => (
                <li key={mistake} className="flex gap-2">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0 text-matcha" size={16} />
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </LearningCard>
  );
};

export default LessonCard;

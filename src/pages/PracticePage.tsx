import { RotateCcw, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import QuizCard, { type QuizQuestion, type QuizType } from "../components/QuizCard";
import { grammarLessons } from "../data/grammar";
import { kanaItems } from "../data/kana";
import { vocabulary } from "../data/vocabulary";

type PracticeMode = "all" | QuizType;

const modeLabels: Record<PracticeMode, string> = {
  all: "综合练习",
  kana: "假名识别",
  vocabulary: "词义选择",
  grammar: "语法填空",
};

const orderedChoices = (correct: string, pool: string[], seed: number) => {
  const options = Array.from(new Set(pool.filter((item) => item && item !== correct)));
  const rotated = [...options.slice(seed % Math.max(options.length, 1)), ...options.slice(0, seed % Math.max(options.length, 1))];
  return [correct, ...rotated.slice(0, 3)].sort((a, b) => {
    const scoreA = a.charCodeAt(0) + a.length * 7 + seed;
    const scoreB = b.charCodeAt(0) + b.length * 7 + seed;
    return scoreA - scoreB;
  });
};

const buildQuestions = (): QuizQuestion[] => {
  const kanaPool = kanaItems.map((item) => item.romaji);
  const vocabularyPool = vocabulary.map((word) => word.meaning);

  const kanaQuestions: QuizQuestion[] = kanaItems.slice(0, 12).map((item, index) => ({
    id: `kana-${item.id}`,
    type: "kana",
    typeLabel: "假名识别",
    prompt: item.hiragana,
    helper: `片假名：${item.katakana}`,
    answer: item.romaji,
    choices: orderedChoices(item.romaji, kanaPool, index + 2),
    explanation: `${item.hiragana} / ${item.katakana} 的罗马音是 ${item.romaji}。`,
  }));

  const vocabularyQuestions: QuizQuestion[] = vocabulary.slice(0, 12).map((word, index) => ({
    id: `vocab-${word.id}`,
    type: "vocabulary",
    typeLabel: "词义选择",
    prompt: word.japanese,
    helper: `${word.kana} · ${word.romaji}`,
    answer: word.meaning,
    choices: orderedChoices(word.meaning, vocabularyPool, index + 5),
    explanation: `${word.japanese} 的中文意思是“${word.meaning}”。`,
  }));

  const grammarQuestions: QuizQuestion[] = grammarLessons.map((lesson) => ({
    id: `grammar-${lesson.id}`,
    type: "grammar",
    typeLabel: "语法填空",
    prompt: lesson.quiz.prompt,
    helper: lesson.title,
    answer: lesson.quiz.answer,
    choices: lesson.quiz.choices,
    explanation: lesson.quiz.explanation,
  }));

  return [...kanaQuestions, ...vocabularyQuestions, ...grammarQuestions];
};

const PracticePage = () => {
  const allQuestions = useMemo(() => buildQuestions(), []);
  const [mode, setMode] = useState<PracticeMode>("all");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentQuestions = useMemo(() => {
    return mode === "all" ? allQuestions : allQuestions.filter((question) => question.type === mode);
  }, [allQuestions, mode]);

  const answeredCount = currentQuestions.filter((question) => answers[question.id]).length;
  const score = currentQuestions.reduce(
    (total, question) => total + (answers[question.id] === question.answer ? 1 : 0),
    0,
  );
  const progress = currentQuestions.length ? (answeredCount / currentQuestions.length) * 100 : 0;

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
  }, [mode]);

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-7">
      <section className="rounded-lg border border-black/10 bg-white/88 p-6 shadow-card">
        <p className="text-sm font-bold text-coral">Practice</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-ink">练习测试</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">
          题目从假名、单词和语法本地数据生成。提交后会显示得分、正确答案和简短说明。
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {(Object.keys(modeLabels) as PracticeMode[]).map((item) => {
            const active = mode === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`min-h-10 cursor-pointer rounded-md px-3 py-2 text-sm font-bold transition ${
                  active
                    ? "bg-ink text-white"
                    : "border border-black/10 bg-white text-ink/68 hover:bg-rice hover:text-ink"
                }`}
              >
                {modeLabels[item]}
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-md bg-rice/76 p-4">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-ink">
              已答 {answeredCount} / {currentQuestions.length}
            </p>
            {submitted ? (
              <p className="text-sm font-bold text-matcha">
                得分 {score} / {currentQuestions.length}
              </p>
            ) : null}
          </div>
          <div className="h-3 overflow-hidden rounded-md bg-white">
            <div className="h-full rounded-md bg-matcha transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={answeredCount === 0}
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md bg-matcha px-4 py-2 font-bold text-white transition hover:bg-matcha/90 active:scale-95 disabled:cursor-not-allowed disabled:bg-ink/25"
          >
            <Send aria-hidden="true" size={18} />
            提交答案
          </button>
          <button
            type="button"
            onClick={reset}
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-black/10 bg-white px-4 py-2 font-bold text-ink transition hover:bg-rice active:scale-95"
          >
            <RotateCcw aria-hidden="true" size={18} />
            重做
          </button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {currentQuestions.map((question, index) => (
          <QuizCard
            key={question.id}
            question={{ ...question, prompt: `${index + 1}. ${question.prompt}` }}
            selected={answers[question.id]}
            submitted={submitted}
            onSelect={(answer) =>
              setAnswers((current) => ({
                ...current,
                [question.id]: answer,
              }))
            }
          />
        ))}
      </section>
    </div>
  );
};

export default PracticePage;

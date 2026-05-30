import { CheckCircle2, XCircle } from "lucide-react";

export type QuizType = "kana" | "vocabulary" | "grammar";

export interface QuizQuestion {
  id: string;
  type: QuizType;
  typeLabel: string;
  prompt: string;
  helper?: string;
  answer: string;
  choices: string[];
  explanation?: string;
}

interface QuizCardProps {
  question: QuizQuestion;
  selected?: string;
  submitted: boolean;
  onSelect: (answer: string) => void;
}

const QuizCard = ({ question, selected, submitted, onSelect }: QuizCardProps) => {
  const isCorrect = submitted && selected === question.answer;

  return (
    <article className="rounded-lg border border-black/10 bg-white/92 p-5 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="mb-2 w-fit rounded-md bg-sky px-2 py-1 text-xs font-bold text-ink/62">
            {question.typeLabel}
          </p>
          <h3 className="break-words font-serif text-2xl font-bold text-ink">{question.prompt}</h3>
          {question.helper ? <p className="mt-2 text-sm text-ink/58">{question.helper}</p> : null}
        </div>
        {submitted ? (
          <div
            className={`flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm font-bold ${
              isCorrect ? "bg-matcha/12 text-matcha" : "bg-coral/12 text-coral"
            }`}
          >
            {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            {isCorrect ? "答对" : "需复习"}
          </div>
        ) : null}
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {question.choices.map((choice) => {
          const chosen = selected === choice;
          const correctChoice = submitted && choice === question.answer;
          const wrongChoice = submitted && chosen && choice !== question.answer;

          return (
            <button
              key={choice}
              type="button"
              onClick={() => onSelect(choice)}
              disabled={submitted}
              className={`min-h-11 cursor-pointer rounded-md border px-3 py-2 text-left text-sm font-semibold transition disabled:cursor-default ${
                correctChoice
                  ? "border-matcha bg-matcha/12 text-matcha"
                  : wrongChoice
                    ? "border-coral bg-coral/12 text-coral"
                    : chosen
                      ? "border-indigo bg-indigo/10 text-indigo"
                      : "border-black/10 bg-rice/62 text-ink/76 hover:border-indigo/40 hover:bg-white"
              }`}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {submitted ? (
        <div className="mt-4 rounded-md bg-rice/80 p-3 text-sm leading-6 text-ink/72">
          正确答案：<span className="font-bold text-ink">{question.answer}</span>
          {question.explanation ? <span>。{question.explanation}</span> : null}
        </div>
      ) : null}
    </article>
  );
};

export default QuizCard;

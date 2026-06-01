import type { ReactNode } from "react";

interface LearningCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

const LearningCard = ({ children, className = "", interactive = false }: LearningCardProps) => {
  return (
    <article
      className={`rounded-lg border border-ink/10 bg-[#fffdf1]/92 shadow-card ${
        interactive ? "transition hover:-translate-y-0.5 hover:border-yuzu/45 hover:shadow-card" : ""
      } ${className}`}
    >
      {children}
    </article>
  );
};

export default LearningCard;

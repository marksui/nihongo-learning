import type { ReactNode } from "react";

interface LearningCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

const LearningCard = ({ children, className = "", interactive = false }: LearningCardProps) => {
  return (
    <article
      className={`rounded-lg border border-ink/8 bg-paper/94 shadow-card ${
        interactive ? "transition hover:border-matcha/28 hover:bg-paper" : ""
      } ${className}`}
    >
      {children}
    </article>
  );
};

export default LearningCard;

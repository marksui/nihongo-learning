import type { ReactNode } from "react";

interface LearningCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

const LearningCard = ({ children, className = "", interactive = false }: LearningCardProps) => {
  return (
    <article
      className={`soft-surface min-w-0 rounded-lg border border-ink/8 bg-paper/94 ${
        interactive ? "transition duration-200 hover:-translate-y-0.5 hover:border-matcha/28 hover:bg-paper hover:shadow-soft" : ""
      } ${className}`}
    >
      {children}
    </article>
  );
};

export default LearningCard;

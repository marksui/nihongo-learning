import type { ReactNode } from "react";

interface LearningCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

const LearningCard = ({ children, className = "", interactive = false }: LearningCardProps) => {
  return (
    <article
      className={`soft-surface min-w-0 rounded-lg border border-ink/8 bg-paper/96 ${
        interactive ? "app-card-hover" : ""
      } ${className}`}
    >
      {children}
    </article>
  );
};

export default LearningCard;

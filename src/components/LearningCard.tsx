import type { ReactNode } from "react";

interface LearningCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

const LearningCard = ({ children, className = "", interactive = false }: LearningCardProps) => {
  return (
    <article
      className={`rounded-lg border border-black/10 bg-white/92 shadow-card ${
        interactive ? "transition hover:-translate-y-0.5 hover:border-sakura/30 hover:shadow-pop" : ""
      } ${className}`}
    >
      {children}
    </article>
  );
};

export default LearningCard;

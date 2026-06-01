import { SearchX } from "lucide-react";

interface EmptyStateProps {
  description: string;
  title: string;
}

const EmptyState = ({ description, title }: EmptyStateProps) => {
  return (
    <div className="rounded-lg border border-dashed border-yuzu/45 bg-[#fffdf1]/85 p-8 text-center shadow-card">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-yuzu/18 text-ink">
        <SearchX aria-hidden="true" size={24} />
      </div>
      <h2 className="mt-4 text-xl font-extrabold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink/60">{description}</p>
    </div>
  );
};

export default EmptyState;

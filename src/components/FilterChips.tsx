import type { LucideIcon } from "lucide-react";

interface FilterChipsProps<T extends string> {
  active: T;
  counts?: Partial<Record<T, number>>;
  icon?: LucideIcon;
  label?: string;
  onChange: (value: T) => void;
  options: readonly T[];
}

const FilterChips = <T extends string>({
  active,
  counts,
  icon: Icon,
  onChange,
  options,
}: FilterChipsProps<T>) => {
  return (
    <div className="min-w-0">
      <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
        {options.map((option) => {
          const selected = active === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-extrabold transition active:scale-95 ${
                selected
                  ? "border-matcha bg-matcha text-white shadow-card"
                  : "border-ink/10 bg-paper text-ink/70 hover:border-yuzu/35 hover:bg-yuzu/12 hover:text-ink"
              }`}
            >
              {Icon ? <Icon aria-hidden="true" size={15} /> : null}
              <span>{option}</span>
              {counts?.[option] !== undefined ? (
                <span className={`rounded px-1.5 py-0.5 text-xs ${selected ? "bg-white/16" : "bg-rice text-ink/58"}`}>
                  {counts[option]}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterChips;

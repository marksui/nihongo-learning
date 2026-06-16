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
  label,
  onChange,
  options,
}: FilterChipsProps<T>) => {
  return (
    <div className="min-w-0">
      <div
        className="filter-scroll-row -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        aria-label={label ?? "筛选"}
        role="group"
      >
        {options.map((option) => {
          const selected = active === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={selected}
              className={`tap-surface flex max-w-[14rem] shrink-0 snap-start cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-extrabold transition active:scale-95 md:max-w-[16rem] ${
                selected
                  ? "filter-chip-selected border-matcha bg-matcha text-white shadow-sm"
                  : "border-ink/8 bg-rice/48 text-ink/68 hover:border-matcha/24 hover:bg-paper hover:text-ink"
              }`}
            >
              {Icon ? <Icon aria-hidden="true" size={15} /> : null}
              <span className="truncate whitespace-nowrap">{option}</span>
              {counts?.[option] !== undefined ? (
                <span
                  className={`rounded px-1.5 py-0.5 text-xs ${
                    selected ? "filter-chip-count-pop bg-white/16" : "bg-rice text-ink/58"
                  }`}
                >
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

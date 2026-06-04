import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface HeroStat {
  label: string;
  value: string | number;
}

interface PageHeroProps {
  accent?: "sakura" | "matcha" | "sora" | "yuzu" | "sumire";
  actions?: ReactNode;
  description: string;
  eyebrow: string;
  icon?: LucideIcon;
  stats?: HeroStat[];
  title: string;
}

const accentClasses = {
  sakura: "bg-sakura/8 text-sakura border-sakura/18",
  matcha: "bg-matcha/10 text-matcha border-matcha/18",
  sora: "bg-sora/10 text-sora border-sora/18",
  yuzu: "bg-yuzu/18 text-ink border-yuzu/24",
  sumire: "bg-sumire/8 text-sumire border-sumire/16",
};

const PageHero = ({
  accent = "sakura",
  actions,
  description,
  eyebrow,
  icon: Icon,
  stats,
  title,
}: PageHeroProps) => {
  return (
    <section className="rounded-lg border border-ink/8 bg-paper/92 p-4 shadow-card sm:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <div className={`mb-3 flex w-fit items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs font-extrabold ${accentClasses[accent]}`}>
            {Icon ? <Icon aria-hidden="true" size={18} /> : null}
            <span>{eyebrow}</span>
          </div>
          <h1 className="break-words font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/72 sm:text-base">{description}</p>
          {actions ? <div className="mt-4 flex flex-wrap gap-2.5">{actions}</div> : null}
        </div>

        {stats?.length ? (
          <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`min-w-0 rounded-md border px-3 py-2 text-left ${
                  index % 3 === 0
                    ? "border-yuzu/24 bg-rice/62"
                    : index % 3 === 1
                      ? "border-matcha/18 bg-matcha/8"
                      : "border-sakura/14 bg-sakura/6"
                }`}
              >
                <p className="truncate text-base font-extrabold text-ink">{stat.value}</p>
                <p className="truncate text-xs font-bold text-ink/58">{stat.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PageHero;

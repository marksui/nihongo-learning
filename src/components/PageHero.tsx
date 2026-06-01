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
  sakura: "bg-sakura/12 text-sakura border-sakura/20",
  matcha: "bg-matcha/12 text-matcha border-matcha/20",
  sora: "bg-sora/12 text-sora border-sora/20",
  yuzu: "bg-yuzu/24 text-ink border-yuzu/30",
  sumire: "bg-sumire/12 text-sumire border-sumire/20",
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
    <section className="relative overflow-hidden rounded-lg border border-black/10 bg-white/92 p-5 shadow-pop sm:p-6">
      <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#F26A8D,#F7C948,#4DA3FF,#2F9A78)]" />
      <div className="grid gap-5 pt-2 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="min-w-0">
          <div className={`mb-4 flex w-fit items-center gap-2 rounded-md border px-3 py-2 text-sm font-extrabold ${accentClasses[accent]}`}>
            {Icon ? <Icon aria-hidden="true" size={18} /> : null}
            <span>{eyebrow}</span>
          </div>
          <h1 className="break-words font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70 sm:text-base">{description}</p>
          {actions ? <div className="mt-5 flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        {stats?.length ? (
          <div className="grid grid-cols-3 gap-2 lg:min-w-72">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`min-w-0 rounded-lg border px-3 py-3 text-center shadow-card ${
                  index % 3 === 0
                    ? "border-sakura/18 bg-sakura/8"
                    : index % 3 === 1
                      ? "border-sora/18 bg-sora/10"
                      : "border-matcha/18 bg-matcha/10"
                }`}
              >
                <p className="truncate text-2xl font-extrabold text-ink">{stat.value}</p>
                <p className="mt-1 truncate text-xs font-bold text-ink/58">{stat.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PageHero;

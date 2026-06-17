import type { ReactNode } from "react";

interface HeroStat {
  label: string;
  value: string | number;
}

interface PageHeroProps {
  actions?: ReactNode;
  description: string;
  eyebrow?: string;
  media?: ReactNode;
  stats?: HeroStat[];
  title: string;
}

const PageHero = ({
  actions,
  description,
  eyebrow,
  media,
  stats,
  title,
}: PageHeroProps) => {
  const layoutClass = media
    ? "lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)] lg:items-center"
    : stats?.length
      ? "md:grid-cols-[minmax(0,1fr)_minmax(14rem,0.36fr)] md:items-end"
      : "";

  return (
    <section className="overflow-hidden rounded-lg border border-ink/8 bg-paper/95 shadow-card">
      <div className={`grid min-w-0 gap-4 p-4 sm:p-5 lg:p-6 ${layoutClass}`}>
        <div className="min-w-0">
          {eyebrow ? <p className="app-kicker mb-2">{eyebrow}</p> : null}
          <h1 className="section-title break-words text-[1.85rem] sm:text-[2.25rem] lg:text-[2.55rem]">{title}</h1>
          <p className="mt-2 max-w-3xl text-[1rem] font-semibold leading-7 text-ink/66 sm:text-[1.05rem]">{description}</p>
          {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
        </div>

        {stats?.length ? (
          <div className="grid grid-cols-3 gap-2 sm:max-w-lg lg:ml-auto lg:w-full">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 rounded-lg border border-ink/8 bg-rice/46 px-3 py-2 text-left"
              >
                <p className="break-words text-lg font-extrabold leading-tight text-ink sm:text-xl">{stat.value}</p>
                <p className="mt-1 break-words text-xs font-bold leading-tight text-ink/55">{stat.label}</p>
              </div>
            ))}
          </div>
        ) : null}

        {media ? <div className="min-w-0">{media}</div> : null}
      </div>
    </section>
  );
};

export default PageHero;

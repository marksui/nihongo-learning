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
  const hasAside = Boolean(media || stats?.length);

  return (
    <section className="overflow-hidden rounded-lg border border-ink/8 bg-paper/92 shadow-card">
      <div className={`grid min-w-0 gap-4 p-4 sm:p-5 lg:p-6 ${hasAside ? "lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.32fr)] lg:items-center" : ""}`}>
        <div className="min-w-0">
          {eyebrow ? <p className="app-kicker mb-2">{eyebrow}</p> : null}
          <h1 className="section-title break-words text-[1.75rem] sm:text-[2.2rem] lg:text-[2.45rem]">{title}</h1>
          <p className="mt-2 max-w-3xl text-[0.98rem] font-semibold leading-7 text-ink/66">{description}</p>
          {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
        </div>

        {media ? <div className="min-w-0">{media}</div> : null}

        {!media && stats?.length ? (
          <div className="grid grid-cols-3 gap-2 lg:ml-auto lg:w-full">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 rounded-lg border border-ink/8 bg-rice/42 px-3 py-2 text-left"
              >
                <p className="break-words text-lg font-extrabold leading-tight text-ink sm:text-xl">{stat.value}</p>
                <p className="mt-1 break-words text-xs font-bold leading-tight text-ink/54">{stat.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PageHero;

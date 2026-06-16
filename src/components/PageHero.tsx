import type { ReactNode } from "react";

interface HeroStat {
  label: string;
  value: string | number;
}

interface PageHeroProps {
  actions?: ReactNode;
  description: string;
  media?: ReactNode;
  stats?: HeroStat[];
  title: string;
}

const PageHero = ({
  actions,
  description,
  media,
  stats,
  title,
}: PageHeroProps) => {
  return (
    <section className="calm-grid-card overflow-hidden rounded-lg border border-ink/8 p-4 shadow-card sm:p-5">
      <div className={`grid min-w-0 gap-5 ${media ? "lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,0.78fr)] lg:items-stretch" : ""}`}>
        <div className={`flex min-w-0 flex-col gap-4 md:flex-row md:items-end md:justify-between ${media ? "lg:flex-col lg:items-start lg:justify-start" : ""}`}>
          <div className="min-w-0">
            <h1 className="break-words font-display text-[2rem] font-extrabold leading-tight text-ink sm:text-4xl">{title}</h1>
            <p className="mt-2 max-w-3xl text-[0.95rem] leading-7 text-ink/72 sm:mt-3 sm:text-base">{description}</p>
            {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
          </div>

          {stats?.length ? (
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(5.75rem,1fr))] gap-2 md:w-auto md:max-w-sm md:grid-cols-3 lg:max-w-none">
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
                  <p className="break-words text-base font-extrabold leading-tight text-ink">{stat.value}</p>
                  <p className="mt-0.5 break-words text-xs font-bold leading-tight text-ink/58">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {media ? <div className="min-w-0">{media}</div> : null}
      </div>
    </section>
  );
};

export default PageHero;

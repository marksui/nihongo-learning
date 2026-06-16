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
  return (
    <section className="calm-grid-card overflow-hidden rounded-lg border border-ink/8 p-4 sm:p-5 lg:p-6">
      <div className={`relative z-10 grid min-w-0 gap-5 ${media ? "lg:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.6fr)] lg:items-stretch" : ""}`}>
        <div className={`flex min-w-0 flex-col gap-4 ${media ? "lg:justify-center" : "md:flex-row md:items-end md:justify-between"}`}>
          <div className="min-w-0">
            {eyebrow ? (
              <p className="app-kicker mb-2">{eyebrow}</p>
            ) : null}
            <h1 className="section-title break-words text-[1.8rem] sm:text-[2.25rem] lg:text-[2.55rem]">{title}</h1>
            <p className="mt-2 max-w-3xl text-[1rem] font-semibold leading-7 text-ink/66 sm:text-[1.06rem]">{description}</p>
            {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
          </div>

          {stats?.length ? (
            <div className="grid w-full grid-cols-3 gap-2 md:w-auto md:min-w-[15rem] lg:w-full lg:max-w-md">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`min-w-0 rounded-lg border px-3 py-2.5 text-left ${
                    index % 3 === 0
                      ? "border-yuzu/24 bg-yuzu/12"
                      : index % 3 === 1
                        ? "border-matcha/18 bg-matcha/8"
                        : "border-sakura/14 bg-sakura/6"
                  }`}
                >
                  <p className="break-words text-lg font-extrabold leading-tight text-ink sm:text-xl">{stat.value}</p>
                  <p className="mt-1 break-words text-xs font-bold leading-tight text-ink/56">{stat.label}</p>
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

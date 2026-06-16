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
      <div className={`relative z-10 grid min-w-0 gap-5 ${media ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.72fr)] lg:items-center" : ""}`}>
        <div className={`flex min-w-0 flex-col gap-4 ${media ? "lg:justify-center" : "md:flex-row md:items-end md:justify-between"}`}>
          <div className="min-w-0">
            {eyebrow ? (
              <p className="mb-3 inline-flex rounded-md border border-matcha/18 bg-matcha/8 px-2.5 py-1 text-xs font-extrabold text-matcha">{eyebrow}</p>
            ) : null}
            <h1 className="section-title break-words text-[2rem] sm:text-[2.5rem] lg:text-[2.85rem]">{title}</h1>
            <p className="mt-3 max-w-3xl text-[1rem] font-medium leading-7 text-ink/68 sm:text-[1.05rem] sm:leading-8">{description}</p>
            {actions ? <div className="mt-5 flex flex-wrap gap-2">{actions}</div> : null}
          </div>

          {stats?.length ? (
            <div className="grid w-full grid-cols-3 gap-2 md:w-auto md:min-w-[15rem] lg:w-full lg:max-w-lg">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`min-w-0 rounded-md border px-3 py-2 text-left ${
                    index % 3 === 0
                      ? "border-yuzu/22 bg-yuzu/10"
                      : index % 3 === 1
                        ? "border-matcha/18 bg-matcha/8"
                        : "border-sakura/14 bg-sakura/6"
                  }`}
                >
                  <p className="break-words text-xl font-extrabold leading-tight text-ink">{stat.value}</p>
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

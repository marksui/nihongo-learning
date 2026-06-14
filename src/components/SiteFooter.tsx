import { ExternalLink, Home } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import type { PageKey } from "./Navbar";

interface SiteFooterProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
}

const authorHomepageUrl = "https://marksui.github.io/";

const footerLinks: Array<{ label: string; page: PageKey }> = [
  { label: "首页", page: "home" },
  { label: "五十音", page: "kana" },
  { label: "数字", page: "numbers" },
  { label: "单词", page: "vocabulary" },
  { label: "考试词", page: "exam-vocabulary" },
  { label: "语法", page: "grammar" },
  { label: "会话", page: "conversation" },
  { label: "速读", page: "quickread" },
];

const SiteFooter = ({ currentPage, onNavigate }: SiteFooterProps) => {
  return (
    <footer className="border-t border-ink/8 bg-rice/72 px-3 pb-28 pt-3 text-ink sm:px-4 md:pb-5 lg:px-6">
      <div className="mx-auto max-w-7xl space-y-2">
        <section className="min-w-0 rounded-md border border-ink/8 bg-paper/94 p-3 shadow-card" aria-labelledby="footer-title">
          <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-matcha text-sm font-extrabold text-white">
                日
              </span>
              <div className="flex min-w-0 items-baseline gap-2">
                <h2 id="footer-title" className="truncate text-base font-extrabold text-ink">
                  中文学日语
                </h2>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center lg:flex-1 lg:justify-end">
              <div className="flex min-w-0 items-center gap-2">
                <div className="filter-scroll-row flex min-w-0 gap-2 overflow-x-auto pb-1 sm:overflow-visible sm:pb-0" aria-label="页脚快速入口" role="group">
                  {footerLinks.map((item) => {
                    const active = currentPage === item.page;

                    return (
                      <button
                        key={item.page}
                        type="button"
                        onClick={() => onNavigate(item.page)}
                        className={`min-h-10 shrink-0 snap-start touch-manipulation cursor-pointer rounded-md border px-2.5 py-1 text-sm font-extrabold transition active:scale-[0.99] ${
                          active
                            ? "border-matcha bg-matcha text-white"
                            : "border-ink/10 bg-rice/35 text-ink/68 hover:border-matcha/25 hover:bg-rice/65 hover:text-ink"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <a
                href={authorHomepageUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="打开 Mark 的作者主页"
                className="flex min-h-10 shrink-0 touch-manipulation items-center justify-center gap-2 rounded-md border border-ink/10 bg-rice/50 px-2.5 py-1 text-sm font-extrabold text-ink transition hover:border-matcha/30 hover:bg-rice"
              >
                <Home aria-hidden="true" size={16} />
                作者
                <ExternalLink aria-hidden="true" size={14} />
              </a>
            </div>
          </div>
        </section>

        <ThemeSwitcher />
      </div>
    </footer>
  );
};

export default SiteFooter;

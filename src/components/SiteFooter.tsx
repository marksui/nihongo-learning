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
  { label: "语法", page: "grammar" },
  { label: "会话", page: "conversation" },
  { label: "速读", page: "quickread" },
];

const SiteFooter = ({ currentPage, onNavigate }: SiteFooterProps) => {
  return (
    <footer className="mt-6 border-t border-ink/8 bg-paper/72 px-3 pb-28 pt-4 text-ink backdrop-blur sm:px-5 lg:px-7 lg:pb-7">
      <div className="mx-auto grid max-w-[92rem] gap-3 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <section className="rounded-lg border border-ink/8 bg-paper/88 p-3 shadow-card" aria-labelledby="footer-title">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-matcha font-japanese text-xl font-extrabold text-white shadow-sm">
                あ
              </span>
              <div className="min-w-0">
                <h2 id="footer-title" className="truncate text-base font-extrabold text-ink">
                  中文学日语
                </h2>
                <p className="truncate text-xs font-bold text-ink/52">从点读开始练开口</p>
              </div>
            </div>

            <a
              href={authorHomepageUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="打开 Mark 的作者主页"
              className="tap-surface flex shrink-0 items-center justify-center gap-2 rounded-lg border border-ink/10 bg-rice/55 px-3 py-2 text-sm font-extrabold text-ink transition hover:border-matcha/30 hover:bg-rice"
            >
              <Home aria-hidden="true" size={16} />
              作者 Mark
              <ExternalLink aria-hidden="true" size={14} />
            </a>
          </div>

          <div className="filter-scroll-row -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" aria-label="页脚快速入口" role="group">
            {footerLinks.map((item) => {
              const active = currentPage === item.page;

              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => onNavigate(item.page)}
                  className={`tap-surface shrink-0 cursor-pointer rounded-lg border px-3 py-2 text-sm font-extrabold transition active:scale-[0.99] ${
                    active
                      ? "border-ink bg-ink text-white"
                      : "border-ink/10 bg-rice/40 text-ink/68 hover:border-matcha/25 hover:bg-paper hover:text-ink"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </section>

        <ThemeSwitcher />
      </div>
    </footer>
  );
};

export default SiteFooter;

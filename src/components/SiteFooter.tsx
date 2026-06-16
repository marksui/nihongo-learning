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
    <footer className="border-t border-ink/8 bg-paper/62 px-3 pb-28 pt-5 text-ink backdrop-blur sm:px-5 lg:px-8 lg:pb-7 lg:pl-[17rem]">
      <div className="mx-auto max-w-[92rem] space-y-3">
        <section className="min-w-0 rounded-lg border border-ink/8 bg-paper/88 p-3 shadow-sm" aria-labelledby="footer-title">
          <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-matcha text-sm font-extrabold text-white shadow-sm">
                あ
              </span>
              <div className="min-w-0">
                <h2 id="footer-title" className="truncate text-base font-extrabold text-ink">
                  中文学日语
                </h2>
                <p className="truncate text-xs font-bold text-ink/52">护眼点读学习</p>
              </div>
            </div>

            <div className="flex min-w-0 flex-wrap items-center gap-2 lg:justify-end">
              <div className="flex min-w-0 flex-wrap gap-2" aria-label="页脚快速入口" role="group">
                {footerLinks.map((item) => {
                  const active = currentPage === item.page;

                  return (
                    <button
                      key={item.page}
                      type="button"
                      onClick={() => onNavigate(item.page)}
                      className={`min-h-10 shrink-0 cursor-pointer rounded-lg border px-2.5 py-1 text-sm font-extrabold transition active:scale-[0.99] ${
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

              <a
                href={authorHomepageUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="打开 Mark 的作者主页"
                className="tap-surface flex shrink-0 items-center justify-center gap-2 rounded-lg border border-ink/10 bg-rice/50 px-3 py-1.5 text-sm font-extrabold text-ink transition hover:border-matcha/30 hover:bg-rice"
              >
                <Home aria-hidden="true" size={16} />
                Mark 主页
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

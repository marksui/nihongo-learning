import { ExternalLink, Home, Table2 } from "lucide-react";
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
  { label: "数字读法", page: "numbers" },
  { label: "常用单词", page: "vocabulary" },
  { label: "基础语法", page: "grammar" },
  { label: "日常会话", page: "conversation" },
  { label: "假名速读", page: "quickread" },
];

const SiteFooter = ({ currentPage, onNavigate }: SiteFooterProps) => {
  return (
    <footer className="border-t border-ink/8 bg-rice/72 px-4 pb-28 pt-5 text-ink sm:px-6 md:pb-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section className="rounded-lg border border-ink/8 bg-paper/94 p-4 shadow-card" aria-labelledby="footer-title">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-matcha text-base font-extrabold text-white">
                日
              </span>
              <div>
                <h2 id="footer-title" className="text-lg font-extrabold text-ink">
                  中文学日语
                </h2>
                <p className="text-sm font-semibold text-ink/58">护眼点读学习</p>
              </div>
            </div>
            <a
              href={authorHomepageUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="打开 Mark 的作者主页"
              className="flex min-h-10 items-center gap-2 rounded-md border border-ink/10 bg-rice/50 px-3 py-2 text-sm font-extrabold text-ink transition hover:border-matcha/30 hover:bg-rice"
            >
              <Home aria-hidden="true" size={17} />
              作者 Mark
              <ExternalLink aria-hidden="true" size={15} />
            </a>
          </div>

          <div className="mt-4 border-t border-ink/8 pt-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-extrabold text-ink/68">
              <Table2 aria-hidden="true" className="text-matcha" size={17} />
              快速入口
            </div>
            <div className="flex flex-wrap gap-2">
              {footerLinks.map((item) => {
                const active = currentPage === item.page;

                return (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className={`min-h-10 cursor-pointer rounded-md border px-3 py-1.5 text-sm font-extrabold transition active:scale-[0.99] ${
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
        </section>

        <ThemeSwitcher />
      </div>
    </footer>
  );
};

export default SiteFooter;

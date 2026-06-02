import { ExternalLink, Github, Home, Mail, Palette, Table2 } from "lucide-react";
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
    <footer className="border-t border-ink/10 bg-rice/82 px-4 pb-32 pt-8 text-ink sm:px-6 md:pb-8 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
        <div className="grid gap-5 md:grid-cols-2">
          <section className="rounded-lg border border-ink/10 bg-paper p-4 shadow-card" aria-labelledby="footer-about">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-matcha text-base font-extrabold text-white">
                M
              </span>
              <div>
                <h2 id="footer-about" className="text-lg font-extrabold text-ink">
                  作者主页
                </h2>
                <p className="text-sm font-semibold text-ink/58">站点作者 Mark</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-ink/70">
              这个入口指向站点作者主页，不是学习者账号中心。学习入口和主题设置都放在页脚里，方便不用回到顶部。
            </p>
            <a
              href={authorHomepageUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="打开 Mark 的作者主页"
              className="mt-4 flex min-h-11 w-fit items-center gap-2 rounded-md border border-ink/10 bg-rice/60 px-3 py-2 text-sm font-extrabold text-ink transition hover:border-yuzu/45 hover:bg-yuzu/14"
            >
              <Home aria-hidden="true" size={18} />
              Mark 的主页
              <ExternalLink aria-hidden="true" size={16} />
            </a>
          </section>

          <section className="rounded-lg border border-ink/10 bg-paper p-4 shadow-card" aria-labelledby="footer-nav">
            <div className="flex items-center gap-2">
              <Table2 aria-hidden="true" className="text-matcha" size={20} />
              <h2 id="footer-nav" className="text-base font-extrabold text-ink">
                快速入口
              </h2>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {footerLinks.map((item) => {
                const active = currentPage === item.page;

                return (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className={`min-h-10 cursor-pointer rounded-md border px-3 py-2 text-left text-sm font-extrabold transition active:scale-[0.99] ${
                      active
                        ? "border-matcha bg-matcha text-white"
                        : "border-ink/10 bg-rice/45 text-ink/72 hover:border-yuzu/45 hover:bg-yuzu/12 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg border border-ink/10 bg-paper p-4 shadow-card md:col-span-2" aria-labelledby="footer-note">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 text-sm font-extrabold text-matcha">
                <Palette aria-hidden="true" size={18} />
                主题会自动保存
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-yuzu" />
              <span className="flex items-center gap-2 text-sm font-extrabold text-ink/62">
                <Github aria-hidden="true" size={17} />
                GitHub Pages
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-yuzu" />
              <span className="flex items-center gap-2 text-sm font-extrabold text-ink/62">
                <Mail aria-hidden="true" size={17} />
                Built for Chinese speakers
              </span>
            </div>
            <p id="footer-note" className="mt-3 text-sm leading-7 text-ink/68">
              页脚现在也可以作为设置区：切主题、跳转学习页面、访问作者主页，都不用回到顶部。
            </p>
          </section>
        </div>

        <ThemeSwitcher />
      </div>
    </footer>
  );
};

export default SiteFooter;

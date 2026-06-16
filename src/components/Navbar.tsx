import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ChevronUp,
  GraduationCap,
  Grid3X3,
  Hash,
  Home,
  MessagesSquare,
  MoreHorizontal,
  Table2,
  Trophy,
  X,
} from "lucide-react";
import { useState } from "react";

export type PageKey =
  | "home"
  | "kana"
  | "numbers"
  | "vocabulary"
  | "exam-vocabulary"
  | "grammar"
  | "conversation"
  | "quickread";

interface NavItem {
  page: PageKey;
  label: string;
  shortLabel?: string;
  icon: LucideIcon;
}

const desktopItems: NavItem[] = [
  { page: "home", label: "首页", icon: Home },
  { page: "kana", label: "五十音", icon: Grid3X3 },
  { page: "numbers", label: "数字", icon: Hash },
  { page: "vocabulary", label: "单词", icon: BookOpen },
  { page: "exam-vocabulary", label: "JLPT", icon: Trophy },
  { page: "grammar", label: "语法", icon: GraduationCap },
  { page: "conversation", label: "会话", icon: MessagesSquare },
  { page: "quickread", label: "速读", icon: Table2 },
];

const mobilePrimaryItems: NavItem[] = [
  { page: "home", label: "首页", icon: Home },
  { page: "kana", label: "五十音", shortLabel: "假名", icon: Grid3X3 },
  { page: "vocabulary", label: "单词", icon: BookOpen },
  { page: "conversation", label: "会话", icon: MessagesSquare },
];

const moreItems: NavItem[] = [
  { page: "numbers", label: "数字读法", icon: Hash },
  { page: "exam-vocabulary", label: "JLPT词库", icon: Trophy },
  { page: "grammar", label: "基础语法", icon: GraduationCap },
  { page: "quickread", label: "假名速读", icon: Table2 },
];

interface NavbarProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
}

const Navbar = ({ currentPage, onNavigate }: NavbarProps) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = moreItems.some((item) => item.page === currentPage);

  const navigate = (page: PageKey) => {
    setMoreOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink/8 bg-paper/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="tap-surface group flex min-w-0 cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1 text-left transition hover:text-matcha"
            aria-label="返回首页"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-matcha font-japanese text-xl font-extrabold text-white shadow-sm transition group-hover:bg-ink">
              あ
            </span>
            <span className="min-w-0">
              <span className="block truncate text-lg font-extrabold leading-tight text-ink">中文学日语</span>
              <span className="hidden truncate text-xs font-bold leading-tight text-ink/50 sm:block">听读学习</span>
            </span>
          </button>

          <nav
            className="hidden min-w-0 items-center gap-1 rounded-lg border border-ink/8 bg-rice/42 p-1 shadow-sm lg:flex"
            aria-label="桌面导航"
          >
            {desktopItems.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.page;

              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => navigate(item.page)}
                  aria-current={active ? "page" : undefined}
                  className={`tap-surface relative flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-extrabold transition active:scale-95 ${
                    active
                      ? "bg-matcha text-white shadow-sm"
                      : "text-ink/62 hover:bg-paper/90 hover:text-ink"
                  }`}
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={2.25} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {moreOpen ? (
        <div
          className="fixed inset-0 z-40 bg-ink/18 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMoreOpen(false)}
        />
      ) : null}

      <div className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-50 bg-paper/97 px-2 pb-[max(env(safe-area-inset-bottom),0.55rem)] pt-2 shadow-soft backdrop-blur-xl lg:hidden">
        {moreOpen ? (
          <div className="mb-2 max-h-[min(58vh,22rem)] overflow-y-auto rounded-lg border border-ink/10 bg-paper p-2 shadow-soft">
            <div className="mb-1 flex items-center justify-between px-1 py-1">
              <p className="px-2 text-sm font-extrabold text-ink">更多</p>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="grid h-11 w-11 touch-manipulation cursor-pointer place-items-center rounded-md text-ink/55 transition hover:bg-rice hover:text-ink"
                aria-label="关闭更多菜单"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const active = currentPage === item.page;

                return (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => navigate(item.page)}
                    className={`tap-surface grid min-h-16 cursor-pointer place-items-center rounded-lg border px-2 py-2 text-xs font-extrabold transition active:scale-95 ${
                      active
                        ? "border-matcha bg-matcha text-white shadow-sm"
                        : "border-ink/8 bg-rice/44 text-ink/68 hover:border-yuzu/35 hover:bg-yuzu/14 hover:text-ink"
                    }`}
                  >
                    <Icon aria-hidden="true" size={20} />
                    <span className="mt-1 text-center leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <nav className="grid grid-cols-5 gap-1.5" aria-label="手机主导航">
          {mobilePrimaryItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.page;

            return (
              <button
                key={item.page}
                type="button"
                onClick={() => navigate(item.page)}
                aria-current={active ? "page" : undefined}
                className={`tap-surface grid min-h-[3.25rem] cursor-pointer place-items-center rounded-lg border px-1 py-1 text-[0.72rem] font-extrabold leading-tight transition active:scale-95 ${
                  active
                    ? "border-matcha bg-matcha text-white shadow-sm"
                    : "border-transparent text-ink/60 hover:bg-rice hover:text-ink"
                }`}
              >
                <Icon aria-hidden="true" size={19} />
                <span>{item.shortLabel ?? item.label}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setMoreOpen((value) => !value)}
            aria-expanded={moreOpen}
            className={`tap-surface grid min-h-[3.25rem] cursor-pointer place-items-center rounded-lg border px-1 py-1 text-[0.72rem] font-extrabold leading-tight transition active:scale-95 ${
              moreActive || moreOpen
                ? "border-matcha bg-matcha text-white shadow-sm"
                : "border-transparent text-ink/60 hover:bg-rice hover:text-ink"
            }`}
          >
            {moreOpen ? <ChevronUp aria-hidden="true" size={19} /> : <MoreHorizontal aria-hidden="true" size={19} />}
            <span>更多</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

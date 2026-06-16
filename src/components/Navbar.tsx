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
  icon: LucideIcon;
}

const desktopItems: NavItem[] = [
  { page: "home", label: "首页", icon: Home },
  { page: "kana", label: "五十音", icon: Grid3X3 },
  { page: "numbers", label: "数字", icon: Hash },
  { page: "vocabulary", label: "单词", icon: BookOpen },
  { page: "exam-vocabulary", label: "词库", icon: Trophy },
  { page: "grammar", label: "语法", icon: GraduationCap },
  { page: "conversation", label: "会话", icon: MessagesSquare },
  { page: "quickread", label: "速读", icon: Table2 },
];

const mobilePrimaryItems: NavItem[] = [
  { page: "home", label: "首页", icon: Home },
  { page: "kana", label: "五十音", icon: Grid3X3 },
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
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="tap-surface flex min-w-0 cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-left transition hover:text-sakura"
            aria-label="返回首页"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-sakura/20 bg-sakura/10 text-sm font-extrabold text-sakura shadow-card">
              日
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-extrabold text-ink">中文学日语</span>
            </span>
          </button>

          <nav className="hidden gap-1 rounded-md border border-ink/8 bg-rice/55 p-1 shadow-card md:flex">
            {desktopItems.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.page;

              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => navigate(item.page)}
                  aria-current={active ? "page" : undefined}
                  className={`tap-surface flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-extrabold transition active:scale-95 ${
                    active
                      ? "bg-matcha text-white"
                      : "text-ink/64 hover:bg-rice hover:text-ink"
                  }`}
                >
                  <Icon aria-hidden="true" size={17} strokeWidth={2.2} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {moreOpen ? (
        <div className="fixed inset-0 z-40 bg-ink/12 backdrop-blur-[2px] md:hidden" onClick={() => setMoreOpen(false)} />
      ) : null}

      <div className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-50 border-t border-ink/10 bg-paper/97 px-2.5 pb-[max(env(safe-area-inset-bottom),0.55rem)] pt-2 shadow-soft backdrop-blur-xl md:hidden">
        {moreOpen ? (
          <div className="mb-2 max-h-[min(64vh,24rem)] overflow-y-auto rounded-lg border border-ink/10 bg-rice p-2 shadow-soft">
            <div className="mb-1 flex justify-end px-2 py-1">
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="grid h-11 w-11 touch-manipulation cursor-pointer place-items-center rounded-md text-ink/55 hover:bg-paper"
                aria-label="关闭更多菜单"
              >
                <X aria-hidden="true" size={17} />
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
                    className={`tap-surface grid min-h-16 cursor-pointer place-items-center rounded-md px-2 py-2 text-xs font-extrabold transition active:scale-95 ${
                      active ? "bg-matcha text-white" : "bg-paper text-ink/68 hover:bg-yuzu/14 hover:text-ink"
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
                className={`tap-surface grid min-h-[3.3rem] cursor-pointer place-items-center rounded-md px-1 py-1 text-[0.74rem] font-extrabold leading-tight transition active:scale-95 ${
                  active ? "bg-matcha text-white shadow-card" : "text-ink/62 hover:bg-rice hover:text-ink"
                }`}
              >
                <Icon aria-hidden="true" size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setMoreOpen((value) => !value)}
            aria-expanded={moreOpen}
            className={`tap-surface grid min-h-[3.3rem] cursor-pointer place-items-center rounded-md px-1 py-1 text-[0.74rem] font-extrabold leading-tight transition active:scale-95 ${
              moreActive || moreOpen ? "bg-matcha text-white shadow-card" : "text-ink/62 hover:bg-rice hover:text-ink"
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

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
  X,
} from "lucide-react";
import { useState } from "react";

export type PageKey =
  | "home"
  | "kana"
  | "numbers"
  | "vocabulary"
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
  { page: "kana", label: "五十音图", icon: Grid3X3 },
  { page: "numbers", label: "数字读法", icon: Hash },
  { page: "vocabulary", label: "常用单词", icon: BookOpen },
  { page: "grammar", label: "基础语法", icon: GraduationCap },
  { page: "conversation", label: "日常会话", icon: MessagesSquare },
  { page: "quickread", label: "假名速读", icon: Table2 },
];

const mobilePrimaryItems: NavItem[] = [
  { page: "home", label: "首页", icon: Home },
  { page: "kana", label: "五十音", icon: Grid3X3 },
  { page: "vocabulary", label: "单词", icon: BookOpen },
  { page: "conversation", label: "会话", icon: MessagesSquare },
];

const moreItems: NavItem[] = [
  { page: "numbers", label: "数字读法", icon: Hash },
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
      <header className="sticky top-0 z-40 border-b border-black/10 bg-rice/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="flex min-w-0 cursor-pointer items-center gap-3 rounded-md px-1 py-1 text-left transition hover:text-sakura"
            aria-label="返回首页"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-black/10 bg-white text-lg font-extrabold text-sakura shadow-card">
              日
            </span>
            <span className="min-w-0">
              <span className="block truncate text-lg font-extrabold text-ink">中文学日语</span>
              <span className="hidden truncate text-xs font-bold text-ink/55 sm:block">从假名到会话的基础路径</span>
            </span>
          </button>

          <nav className="hidden gap-1 rounded-lg border border-black/10 bg-white/80 p-1 shadow-card md:flex">
            {desktopItems.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.page;

              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => navigate(item.page)}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-extrabold transition active:scale-95 ${
                    active
                      ? "bg-ink text-white shadow-card"
                      : "text-ink/68 hover:bg-sakura/8 hover:text-ink"
                  }`}
                >
                  <Icon aria-hidden="true" size={18} strokeWidth={2.2} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {moreOpen ? (
        <div className="fixed inset-0 z-40 bg-ink/18 backdrop-blur-[2px] md:hidden" onClick={() => setMoreOpen(false)} />
      ) : null}

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white/94 px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-soft backdrop-blur-xl md:hidden">
        {moreOpen ? (
          <div className="mb-2 rounded-lg border border-black/10 bg-rice p-2 shadow-card">
            <div className="mb-1 flex items-center justify-between px-2 py-1">
              <p className="text-xs font-extrabold text-ink/58">更多学习入口</p>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="grid h-8 w-8 cursor-pointer place-items-center rounded-md text-ink/55 hover:bg-white"
                aria-label="关闭更多菜单"
              >
                <X aria-hidden="true" size={17} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const active = currentPage === item.page;

                return (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => navigate(item.page)}
                    className={`grid min-h-16 cursor-pointer place-items-center rounded-md px-2 py-2 text-xs font-extrabold transition active:scale-95 ${
                      active ? "bg-ink text-white" : "bg-white text-ink/68 hover:bg-sakura/8 hover:text-ink"
                    }`}
                  >
                    <Icon aria-hidden="true" size={20} />
                    <span className="mt-1">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <nav className="grid grid-cols-5 gap-1">
          {mobilePrimaryItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.page;

            return (
              <button
                key={item.page}
                type="button"
                onClick={() => navigate(item.page)}
                aria-current={active ? "page" : undefined}
                className={`grid min-h-14 cursor-pointer place-items-center rounded-md px-1 py-1 text-[0.68rem] font-extrabold transition active:scale-95 ${
                  active ? "bg-ink text-white" : "text-ink/58 hover:bg-rice hover:text-ink"
                }`}
              >
                <Icon aria-hidden="true" size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setMoreOpen((value) => !value)}
            aria-expanded={moreOpen}
            className={`grid min-h-14 cursor-pointer place-items-center rounded-md px-1 py-1 text-[0.68rem] font-extrabold transition active:scale-95 ${
              moreActive || moreOpen ? "bg-ink text-white" : "text-ink/58 hover:bg-rice hover:text-ink"
            }`}
          >
            {moreOpen ? <ChevronUp aria-hidden="true" size={20} /> : <MoreHorizontal aria-hidden="true" size={20} />}
            <span>更多</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

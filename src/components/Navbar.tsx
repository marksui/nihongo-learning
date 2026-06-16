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

const navItems: NavItem[] = [
  { page: "home", label: "首页", icon: Home },
  { page: "kana", label: "五十音", shortLabel: "假名", icon: Grid3X3 },
  { page: "numbers", label: "数字读法", shortLabel: "数字", icon: Hash },
  { page: "vocabulary", label: "常用单词", shortLabel: "单词", icon: BookOpen },
  { page: "exam-vocabulary", label: "JLPT词库", shortLabel: "JLPT", icon: Trophy },
  { page: "grammar", label: "基础语法", shortLabel: "语法", icon: GraduationCap },
  { page: "conversation", label: "日常会话", shortLabel: "会话", icon: MessagesSquare },
  { page: "quickread", label: "假名速读", shortLabel: "速读", icon: Table2 },
];

const mobilePrimaryItems = navItems.filter((item) =>
  ["home", "kana", "vocabulary", "conversation"].includes(item.page),
);

const moreItems = navItems.filter((item) =>
  ["numbers", "exam-vocabulary", "grammar", "quickread"].includes(item.page),
);

interface NavbarProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
}

const Navbar = ({ currentPage, onNavigate }: NavbarProps) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const currentItem = navItems.find((item) => item.page === currentPage) ?? navItems[0];
  const moreActive = moreItems.some((item) => item.page === currentPage);

  const navigate = (page: PageKey) => {
    setMoreOpen(false);
    onNavigate(page);
  };

  const renderDesktopButton = (item: NavItem) => {
    const Icon = item.icon;
    const active = currentPage === item.page;

    return (
      <button
        key={item.page}
        type="button"
        onClick={() => navigate(item.page)}
        aria-current={active ? "page" : undefined}
        className={`tap-surface flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-[0.92rem] font-extrabold transition active:scale-[0.98] ${
          active
            ? "bg-matcha text-white shadow-sm"
            : "text-ink/62 hover:bg-rice hover:text-ink"
        }`}
      >
        <Icon aria-hidden="true" size={18} strokeWidth={2.25} />
        <span className="whitespace-nowrap">{item.label}</span>
      </button>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 hidden border-b border-ink/6 bg-paper/78 backdrop-blur-xl lg:block">
        <div className="mx-auto flex max-w-[90rem] items-center gap-4 px-8 py-3">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="tap-surface flex min-w-[12rem] cursor-pointer items-center gap-3 rounded-lg text-left"
            aria-label="返回首页"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink font-japanese text-xl font-extrabold text-white shadow-sm">
              あ
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-extrabold leading-tight text-ink">中文学日语</span>
              <span className="block truncate text-xs font-bold text-ink/48">跟读 · 词汇 · 会话</span>
            </span>
          </button>

          <nav className="nav-surface filter-scroll-row flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-lg p-1" aria-label="桌面导航">
            {navItems.map(renderDesktopButton)}
          </nav>
        </div>
      </header>

      <header className="sticky top-0 z-30 border-b border-ink/6 bg-paper/88 px-3 py-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex min-w-0 max-w-3xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="tap-surface flex min-w-0 cursor-pointer items-center gap-2 rounded-lg text-left"
            aria-label="返回首页"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink font-japanese text-xl font-extrabold text-white shadow-sm">
              あ
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-extrabold leading-tight text-ink">中文学日语</span>
              <span className="block truncate text-xs font-bold text-ink/50">{currentItem.label}</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className="tap-surface control-surface flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-extrabold text-ink/72"
            aria-label="打开更多页面"
          >
            <MoreHorizontal aria-hidden="true" size={18} />
            更多
          </button>
        </div>
      </header>

      {moreOpen ? (
        <div
          className="fixed inset-0 z-40 bg-ink/18 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMoreOpen(false)}
        />
      ) : null}

      <div className="mobile-bottom-nav fixed z-50 bg-paper/96 px-2 pb-[max(env(safe-area-inset-bottom),0.55rem)] pt-2 backdrop-blur-xl lg:hidden">
        {moreOpen ? (
          <div className="mb-2 rounded-lg border border-ink/10 bg-paper p-2 shadow-soft">
            <div className="mb-1 flex items-center justify-between px-1 py-1">
              <p className="px-2 text-sm font-extrabold text-ink">更多学习页</p>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-lg text-ink/55 transition hover:bg-rice hover:text-ink"
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
                    className={`tap-surface flex min-h-14 cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm font-extrabold transition active:scale-95 ${
                      active
                        ? "border-matcha bg-matcha text-white shadow-sm"
                        : "border-ink/8 bg-rice/45 text-ink/70 hover:border-sora/25 hover:bg-rice/75 hover:text-ink"
                    }`}
                  >
                    <Icon aria-hidden="true" size={19} />
                    <span className="leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <nav className="grid grid-cols-5 gap-2" aria-label="手机主导航">
          {mobilePrimaryItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.page;

            return (
              <button
                key={item.page}
                type="button"
                onClick={() => navigate(item.page)}
                aria-current={active ? "page" : undefined}
                className={`tap-surface grid min-h-[3.2rem] cursor-pointer place-items-center rounded-lg px-1 py-1 text-[0.72rem] font-extrabold leading-tight transition active:scale-95 ${
                  active
                    ? "bg-matcha text-white shadow-sm"
                    : "text-ink/58 hover:bg-rice hover:text-ink"
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
            className={`tap-surface grid min-h-[3.2rem] cursor-pointer place-items-center rounded-lg px-1 py-1 text-[0.72rem] font-extrabold leading-tight transition active:scale-95 ${
              moreActive || moreOpen
                ? "bg-matcha text-white shadow-sm"
                : "text-ink/58 hover:bg-rice hover:text-ink"
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

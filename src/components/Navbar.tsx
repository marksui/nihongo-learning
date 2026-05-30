import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  GraduationCap,
  Grid3X3,
  Hash,
  Home,
  MessagesSquare,
  Table2,
} from "lucide-react";

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

const navItems: NavItem[] = [
  { page: "home", label: "首页", icon: Home },
  { page: "kana", label: "五十音图", icon: Grid3X3 },
  { page: "numbers", label: "数字读法", icon: Hash },
  { page: "vocabulary", label: "常用单词", icon: BookOpen },
  { page: "grammar", label: "基础语法", icon: GraduationCap },
  { page: "conversation", label: "日常会话", icon: MessagesSquare },
  { page: "quickread", label: "快捷朗读", icon: Table2 },
];

interface NavbarProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
}

const Navbar = ({ currentPage, onNavigate }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-rice/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex w-fit cursor-pointer items-center gap-3 rounded-md px-1 py-1 text-left transition hover:text-matcha"
          aria-label="返回首页"
        >
          <span className="grid h-10 w-10 place-items-center rounded-md bg-ink text-lg font-bold text-white shadow-card">
            日
          </span>
          <span>
            <span className="block text-lg font-extrabold text-ink">中文学日语</span>
            <span className="block text-xs font-medium text-ink/60">从假名到会话的零基础路径</span>
          </span>
        </button>

        <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:overflow-visible lg:pb-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.page;

            return (
              <button
                key={item.page}
                type="button"
                onClick={() => onNavigate(item.page)}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-ink text-white shadow-card"
                    : "text-ink/72 hover:bg-white/78 hover:text-ink"
                }`}
              >
                <Icon aria-hidden="true" size={18} strokeWidth={2.1} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

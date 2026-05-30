import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Grid3X3,
  MessagesSquare,
  PlayCircle,
  Table2,
} from "lucide-react";
import { dialogues } from "../data/dialogues";
import { grammarLessons } from "../data/grammar";
import { kanaItems } from "../data/kana";
import { quickPhrases } from "../data/quickPhrases";
import { vocabulary } from "../data/vocabulary";
import type { PageKey } from "../components/Navbar";

interface HomeProps {
  onNavigate: (page: PageKey) => void;
}

interface FeatureCard {
  title: string;
  page: PageKey;
  description: string;
  metric: string;
  accent: string;
  icon: LucideIcon;
}

const featureCards: FeatureCard[] = [
  {
    title: "五十音图",
    page: "kana",
    description: "平假名、片假名、罗马音和例词同步记忆。",
    metric: `${kanaItems.length} 个基础假名`,
    accent: "bg-matcha",
    icon: Grid3X3,
  },
  {
    title: "常用单词",
    page: "vocabulary",
    description: "按生活场景分类，配日语例句和中文翻译。",
    metric: `${vocabulary.length} 个入门词`,
    accent: "bg-coral",
    icon: BookOpen,
  },
  {
    title: "基础语法",
    page: "grammar",
    description: "用中文讲清句型，并标出中文母语者容易踩的点。",
    metric: `${grammarLessons.length} 个核心句型`,
    accent: "bg-indigo",
    icon: GraduationCap,
  },
  {
    title: "日常会话",
    page: "conversation",
    description: "更多旅行、生活、学校和紧急情景，支持逐句跟读。",
    metric: `${dialogues.length} 段对话`,
    accent: "bg-sun",
    icon: MessagesSquare,
  },
  {
    title: "快捷朗读",
    page: "quickread",
    description: "常用句整理成表，直接点击日语文字就能朗读。",
    metric: `${quickPhrases.length} 句常用表达`,
    accent: "bg-ink",
    icon: Table2,
  },
];

const Home = ({ onNavigate }: HomeProps) => {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
        <div className="rounded-lg border border-black/10 bg-white/88 p-6 shadow-soft md:p-8">
          <div className="mb-5 flex w-fit items-center gap-2 rounded-md bg-matcha/10 px-3 py-2 text-sm font-bold text-matcha">
            <PlayCircle aria-hidden="true" size={18} />
            零基础中文路线
          </div>
          <h1 className="font-serif text-5xl font-bold text-ink sm:text-6xl">中文学日语</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink/72">
            从五十音开始，把假名、单词、语法、例句、会话和发音练习放在同一条学习路径里。
            页面全部使用简体中文说明，日语内容配罗马音、假名读法和中文意思。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate("kana")}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md bg-ink px-4 py-2 font-bold text-white transition hover:bg-ink/90 active:scale-95"
            >
              开始学五十音
              <ArrowRight aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("quickread")}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-black/10 bg-white px-4 py-2 font-bold text-ink transition hover:bg-rice active:scale-95"
            >
              快捷朗读
              <Table2 aria-hidden="true" size={18} />
            </button>
          </div>
        </div>

        <div className="relative min-h-80 overflow-hidden rounded-lg border border-black/10 bg-ink p-6 shadow-soft">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,184,75,0.35),transparent_16rem),radial-gradient(circle_at_80%_30%,rgba(47,125,105,0.34),transparent_15rem)]" />
          <div className="relative grid h-full grid-cols-2 gap-3">
            {["あ", "ア", "日语", "中文", "です", "を", "かな", "会話"].map((label, index) => (
              <div
                key={label}
                className={`grid place-items-center rounded-lg border border-white/14 bg-white/10 p-4 text-center text-white shadow-card backdrop-blur ${
                  index % 3 === 0 ? "font-serif text-5xl font-bold" : "text-2xl font-extrabold"
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-matcha">学习模块</p>
            <h2 className="font-serif text-3xl font-bold text-ink">按真实入门顺序推进</h2>
          </div>
          <p className="text-sm text-ink/58">所有内容来自本地 TypeScript 数据，无需后端。</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {featureCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                type="button"
                onClick={() => onNavigate(card.page)}
                className="group flex min-h-64 cursor-pointer flex-col rounded-lg border border-black/10 bg-white/90 p-5 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span className={`grid h-12 w-12 place-items-center rounded-md ${card.accent} text-white`}>
                  <Icon aria-hidden="true" size={23} />
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-ink">{card.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink/68">{card.description}</p>
                <div className="mt-5 w-full">
                  <div className="mb-2 flex items-center justify-between text-xs font-bold text-ink/58">
                    <span>{card.metric}</span>
                    <ArrowRight className="transition group-hover:translate-x-1" size={16} />
                  </div>
                  <div className="h-2 rounded-md bg-rice">
                    <div className={`h-2 rounded-md ${card.accent}`} style={{ width: "72%" }} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Grid3X3,
  Hash,
  MessagesSquare,
  PlayCircle,
  Table2,
} from "lucide-react";
import LearningCard from "../components/LearningCard";
import PageHero from "../components/PageHero";
import { dialogues } from "../data/dialogues";
import { grammarLessons } from "../data/grammar";
import { kanaItems } from "../data/kana";
import { numberExamples } from "../data/numbers";
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
    accent: "bg-sakura",
    icon: BookOpen,
  },
  {
    title: "数字读法",
    page: "numbers",
    description: "从 0-10 到价格、日期、年龄、楼层和大数字。",
    metric: `${numberExamples.length} 条数字规则`,
    accent: "bg-yuzu",
    icon: Hash,
  },
  {
    title: "基础语法",
    page: "grammar",
    description: "用中文讲清句型，并标出中文母语者容易踩的点。",
    metric: `${grammarLessons.length} 个核心句型`,
    accent: "bg-sumire",
    icon: GraduationCap,
  },
  {
    title: "日常会话",
    page: "conversation",
    description: "更多旅行、生活、学校和紧急情景，支持逐句跟读。",
    metric: `${dialogues.length} 段对话`,
    accent: "bg-matcha",
    icon: MessagesSquare,
  },
  {
    title: "假名速读",
    page: "quickread",
    description: "整页假名速读表，点击任意平假名或片假名直接发音。",
    metric: `${kanaItems.length * 2} 个可点读假名`,
    accent: "bg-ink",
    icon: Table2,
  },
];

const Home = ({ onNavigate }: HomeProps) => {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <PageHero
          accent="sakura"
          eyebrow="零基础中文路线"
          icon={PlayCircle}
          title="中文学日语"
          description="从五十音开始，把假名、单词、语法、例句、会话和发音点读放在同一条学习路径里。页面全部使用简体中文说明，日语内容配罗马音、假名读法和中文意思。"
          stats={[
            { label: "假名", value: kanaItems.length },
            { label: "单词", value: vocabulary.length },
            { label: "会话", value: dialogues.length },
          ]}
          actions={
            <>
            <button
              type="button"
              onClick={() => onNavigate("kana")}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md bg-ink px-4 py-2 font-extrabold text-white shadow-card transition hover:bg-ink/90 active:scale-95"
            >
              开始学五十音
              <ArrowRight aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("conversation")}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-sakura/25 bg-sakura/10 px-4 py-2 font-extrabold text-sakura transition hover:bg-sakura hover:text-white active:scale-95"
            >
              进入会话
              <MessagesSquare aria-hidden="true" size={18} />
            </button>
            </>
          }
        />

        <div className="relative min-h-80 overflow-hidden rounded-lg border border-black/10 bg-ink p-6 shadow-pop">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(242,106,141,0.28),transparent_35%),linear-gradient(45deg,rgba(77,163,255,0.22),transparent_45%)]" />
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
            <p className="text-sm font-extrabold text-sakura">学习地图</p>
            <h2 className="font-serif text-3xl font-bold text-ink">按真实入门顺序推进</h2>
          </div>
          <p className="text-sm text-ink/58">所有内容来自本地 TypeScript 数据，无需后端。</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <LearningCard
                key={card.title}
                interactive
                className="group min-h-52 overflow-hidden p-0"
              >
                <button
                  type="button"
                  onClick={() => onNavigate(card.page)}
                  className="flex h-full w-full cursor-pointer flex-col p-5 text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={`grid h-12 w-12 place-items-center rounded-md ${card.accent} text-white`}>
                      <Icon aria-hidden="true" size={23} />
                    </span>
                    <span className="rounded-md bg-rice px-2 py-1 text-xs font-extrabold text-ink/54">
                      STEP {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-ink">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-ink/68">{card.description}</p>
                  <div className="mt-5 flex items-center justify-between text-xs font-extrabold text-ink/58">
                    <span>{card.metric}</span>
                    <ArrowRight className="transition group-hover:translate-x-1" size={16} />
                  </div>
                </button>
              </LearningCard>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;

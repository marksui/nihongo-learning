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
    description: "假名、罗马音、例词点读。",
    metric: `${kanaItems.length} 个基础假名`,
    accent: "bg-matcha",
    icon: Grid3X3,
  },
  {
    title: "常用单词",
    page: "vocabulary",
    description: "按场景找词，听单词和例句。",
    metric: `${vocabulary.length} 个入门词`,
    accent: "bg-sakura",
    icon: BookOpen,
  },
  {
    title: "数字读法",
    page: "numbers",
    description: "数字、价格、日期和大数字。",
    metric: `${numberExamples.length} 条数字规则`,
    accent: "bg-yuzu",
    icon: Hash,
  },
  {
    title: "基础语法",
    page: "grammar",
    description: "中文讲句型，例句可听。",
    metric: `${grammarLessons.length} 个核心句型`,
    accent: "bg-sumire",
    icon: GraduationCap,
  },
  {
    title: "日常会话",
    page: "conversation",
    description: "你说 / 对方说，对照跟读。",
    metric: `${dialogues.length} 段对话`,
    accent: "bg-matcha",
    icon: MessagesSquare,
  },
  {
    title: "假名速读",
    page: "quickread",
    description: "快捷点读表，直接听。",
    metric: "多张速读表",
    accent: "bg-matcha",
    icon: Table2,
  },
];

const Home = ({ onNavigate }: HomeProps) => {
  return (
    <div className="space-y-7">
      <PageHero
        accent="sakura"
        eyebrow="零基础中文路线"
        icon={PlayCircle}
        title="中文学日语"
        description="从五十音开始，用简体中文说明、日语点读和清晰例句学习。没有考试模式，打开就能学。"
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
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md bg-matcha px-4 py-2 font-extrabold text-white shadow-card transition hover:bg-matcha/90 active:scale-95"
            >
              开始学五十音
              <ArrowRight aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("conversation")}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-ink/10 bg-rice/65 px-4 py-2 font-extrabold text-ink transition hover:bg-yuzu/20 active:scale-95"
            >
              进入会话
              <MessagesSquare aria-hidden="true" size={18} />
            </button>
          </>
        }
      />

      <section>
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-extrabold text-sakura">学习入口</p>
            <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">选一个开始</h2>
          </div>
          <p className="text-sm text-ink/58">本地数据，浏览器日语发音。</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <LearningCard
                key={card.title}
                interactive
                className="group overflow-hidden p-0"
              >
                <button
                  type="button"
                  onClick={() => onNavigate(card.page)}
                  className="flex min-h-36 w-full cursor-pointer items-start gap-4 p-4 text-left"
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-md ${card.accent} text-white shadow-card`}>
                    <Icon aria-hidden="true" size={21} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-extrabold text-ink">{card.title}</h3>
                      <span className="rounded bg-rice px-1.5 py-0.5 text-xs font-bold text-ink/50">{index + 1}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-ink/68">{card.description}</p>
                    <div className="mt-3 flex items-center justify-between gap-3 text-xs font-extrabold text-ink/55">
                      <span className="truncate">{card.metric}</span>
                      <ArrowRight className="shrink-0 transition group-hover:translate-x-0.5" size={16} />
                    </div>
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

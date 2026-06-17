import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Grid3X3,
  Hash,
  MessagesSquare,
  Play,
  Table2,
  Trophy,
} from "lucide-react";
import LearningCard from "../components/LearningCard";
import type { PageKey } from "../components/Navbar";
import homeStudyScene from "../assets/home-study-scene.jpg";
import { dialogues } from "../data/dialogues";
import { grammarLessons } from "../data/grammar";
import { kanaItems } from "../data/kana";
import { numberExamples } from "../data/numbers";
import { vocabulary } from "../data/vocabulary";

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
    title: "五十音",
    page: "kana",
    description: "平假名、片假名、例词一起听。",
    metric: `${kanaItems.length} 个`,
    accent: "bg-matcha text-white",
    icon: Grid3X3,
  },
  {
    title: "假名速读",
    page: "quickread",
    description: "整页点读表，适合每天开口热身。",
    metric: "快捷表",
    accent: "bg-sora text-white",
    icon: Table2,
  },
  {
    title: "数字读法",
    page: "numbers",
    description: "价格、日期、电话和复杂数字。",
    metric: `${numberExamples.length} 条`,
    accent: "bg-yuzu text-ink",
    icon: Hash,
  },
  {
    title: "常用单词",
    page: "vocabulary",
    description: "按生活场景查词，单词和例句都能读。",
    metric: `${vocabulary.filter((word) => word.category !== "考试单词").length} 个`,
    accent: "bg-sakura text-white",
    icon: BookOpen,
  },
  {
    title: "基础语法",
    page: "grammar",
    description: "中文解释句型，例句带读音。",
    metric: `${grammarLessons.length} 课`,
    accent: "bg-sumire text-white",
    icon: GraduationCap,
  },
  {
    title: "日常会话",
    page: "conversation",
    description: "你说 / 对方说，对照练开口。",
    metric: `${dialogues.length} 个`,
    accent: "bg-matcha text-white",
    icon: MessagesSquare,
  },
  {
    title: "JLPT词库",
    page: "exam-vocabulary",
    description: "按 N5 到 N1 慢慢扩词。",
    metric: `${vocabulary.length} 个`,
    accent: "bg-ink text-white",
    icon: Trophy,
  },
];

const Home = ({ onNavigate }: HomeProps) => {
  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="grid overflow-hidden rounded-lg border border-ink/9 bg-paper/94 shadow-card lg:grid-cols-[minmax(22rem,0.92fr)_minmax(0,1.08fr)]">
        <div className="relative min-h-[15rem] overflow-hidden bg-ink sm:min-h-[19rem] lg:min-h-[26rem]">
          <img
            src={homeStudyScene}
            alt="大阪道顿堀河岸街景封面"
            className="home-osaka-cover-image absolute inset-0 h-full w-full object-cover object-[center_50%]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/58 via-ink/12 to-transparent" />
          <div className="absolute bottom-3 left-3 rounded-lg border border-white/18 bg-white/18 px-3 py-2 text-white backdrop-blur">
            <p className="font-reading text-xs font-bold italic leading-none">Osaka</p>
            <p className="mt-0.5 text-sm font-extrabold leading-none">大阪</p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center p-4 sm:p-6 lg:p-8">
          <p className="app-kicker w-fit">零基础点读路线</p>
          <h1 className="section-title mt-3 break-words text-[2.35rem] leading-none sm:text-[3rem] lg:text-[3.55rem]">
            中文学日语
          </h1>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-ink/66 sm:text-lg">
            先听假名，再读词和句子。每个页面都可以直接点读，适合每天打开练几分钟。
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onNavigate("quickread")}
              className="tap-surface flex cursor-pointer items-center gap-2 rounded-lg bg-matcha px-4 py-2.5 font-extrabold text-white shadow-sm transition hover:bg-matcha/90 active:scale-95"
            >
              直接点读
              <Play aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("conversation")}
              className="tap-surface flex cursor-pointer items-center gap-2 rounded-lg border border-ink/10 bg-rice/58 px-4 py-2.5 font-extrabold text-ink shadow-sm transition hover:bg-rice active:scale-95"
            >
              进入会话
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          </div>

          <div className="mt-5 grid max-w-md grid-cols-3 gap-2">
            {[
              { label: "假名", value: kanaItems.length },
              { label: "词汇", value: vocabulary.length },
              { label: "会话", value: dialogues.length },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-ink/8 bg-rice/45 px-3 py-2">
                <p className="number-glyph text-xl font-extrabold leading-none text-ink">{stat.value}</p>
                <p className="mt-1 text-xs font-bold text-ink/52">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-extrabold text-sora">学习入口</p>
            <h2 className="section-title text-2xl">按页面开始</h2>
          </div>
        </div>

        <div className="tool-card-grid">
          {featureCards.map((card) => {
            const Icon = card.icon;

            return (
              <LearningCard key={card.title} interactive className="group overflow-hidden p-0">
                <button
                  type="button"
                  onClick={() => onNavigate(card.page)}
                  className="flex min-h-28 w-full cursor-pointer items-start gap-3 p-4 text-left"
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${card.accent} shadow-card`}>
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-lg font-extrabold text-ink">{card.title}</span>
                    <span className="mt-1.5 block text-[0.95rem] leading-6 text-ink/64">{card.description}</span>
                    <span className="mt-3 flex items-center justify-between gap-3 text-xs font-extrabold text-ink/52">
                      <span className="truncate">{card.metric}</span>
                      <ArrowRight className="shrink-0 transition group-hover:translate-x-0.5" size={16} />
                    </span>
                  </span>
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

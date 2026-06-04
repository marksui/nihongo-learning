import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Ear,
  GraduationCap,
  Grid3X3,
  Hash,
  MessageCircle,
  MessagesSquare,
  PlayCircle,
  Table2,
  Target,
} from "lucide-react";
import { useMemo } from "react";
import LearningCard from "../components/LearningCard";
import PageHero from "../components/PageHero";
import { dialogues } from "../data/dialogues";
import { grammarLessons } from "../data/grammar";
import { kanaItems } from "../data/kana";
import { getTodaySuggestion, learningPathSteps } from "../data/learningPath";
import { numberExamples } from "../data/numbers";
import { vocabulary } from "../data/vocabulary";
import type { PageKey } from "../components/Navbar";
import { readLearningProgress } from "../utils/progress";

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

interface GoalCard {
  title: string;
  description: string;
  accent: string;
  icon: LucideIcon;
}

const goalCards: GoalCard[] = [
  {
    title: "看见就会读",
    description: "假名、单词、句子都能直接点听，慢慢建立读音反应。",
    accent: "bg-matcha",
    icon: Ear,
  },
  {
    title: "听见能跟上",
    description: "用日语原句、假名读音和中文意思对照，听懂常见表达。",
    accent: "bg-sora",
    icon: Target,
  },
  {
    title: "场景里能开口",
    description: "从点餐、问路、购物到学校交流，一句一句练到能说。",
    accent: "bg-sakura",
    icon: MessageCircle,
  },
];

const featureCards: FeatureCard[] = [
  {
    title: "五十音图",
    page: "kana",
    description: "假名、罗马音、例词点读。",
    metric: `${kanaItems.length} 个假名读法`,
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
  const today = useMemo(() => getTodaySuggestion(), []);
  const progress = useMemo(() => readLearningProgress(), []);
  const viewedPages = new Set(progress.viewedPages);

  return (
    <div className="space-y-7">
      <PageHero
        accent="sakura"
        eyebrow="零基础中文路线"
        icon={PlayCircle}
        title="中文学日语"
        description="从五十音开始，用简体中文说明、日语点读和清晰例句学习。打开就能跟着读。"
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
        <div className="mb-3">
          <p className="text-sm font-extrabold text-sakura">长期目标</p>
          <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">能听、能读、能开口</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {goalCards.map((goal) => {
            const Icon = goal.icon;

            return (
              <LearningCard key={goal.title} className="p-4">
                <div className="flex items-start gap-3">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${goal.accent} text-white shadow-card`}>
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-extrabold text-ink">{goal.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-ink/66">{goal.description}</p>
                  </div>
                </div>
              </LearningCard>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <LearningCard className="p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-matcha">
            <CalendarDays aria-hidden="true" size={18} />
            今日建议
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onNavigate("kana")}
              className="min-h-24 rounded-md border border-ink/8 bg-rice/48 p-3 text-left transition hover:border-matcha/28 hover:bg-rice"
            >
              <span className="text-xs font-bold text-ink/55">假名</span>
              <span className="mt-1 block font-serif text-2xl font-bold text-ink">{today.kanaGroup}</span>
              <span className="mt-1 block text-sm font-bold text-matcha">{today.kanaPreview}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate("grammar")}
              className="min-h-24 rounded-md border border-ink/8 bg-rice/48 p-3 text-left transition hover:border-matcha/28 hover:bg-rice"
            >
              <span className="text-xs font-bold text-ink/55">句型</span>
              <span className="mt-1 block break-words text-base font-extrabold text-ink">{today.grammar.title}</span>
              <span className="mt-1 block truncate text-sm text-ink/62">{today.grammar.pattern}</span>
            </button>
          </div>
          <div className="mt-3 rounded-md border border-ink/8 bg-paper px-3 py-2">
            <p className="text-xs font-bold text-ink/55">单词</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {today.words.map((word) => (
                <button
                  key={word.id}
                  type="button"
                  onClick={() => onNavigate("vocabulary")}
                  className="rounded-md bg-yuzu/16 px-2 py-1 text-sm font-extrabold text-ink transition hover:bg-yuzu/28"
                >
                  {word.japanese}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("conversation")}
            className="mt-3 flex min-h-11 w-full items-center justify-between gap-3 rounded-md bg-matcha px-3 py-2 text-left text-sm font-extrabold text-white transition hover:bg-matcha/90"
          >
            <span className="truncate">会话：{today.dialogue.title}</span>
            <ArrowRight aria-hidden="true" size={16} />
          </button>
        </LearningCard>

        <LearningCard className="p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-sakura">学习路径</p>
              <h2 className="font-serif text-2xl font-bold text-ink">按顺序走一遍</h2>
            </div>
            <span className="rounded-md bg-rice px-2 py-1 text-xs font-bold text-ink/58">
              {progress.viewedPages.length}/{learningPathSteps.length}
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {learningPathSteps.map((step, index) => {
              const done = viewedPages.has(step.page);

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onNavigate(step.page)}
                  className={`flex min-h-20 items-start gap-3 rounded-md border p-3 text-left transition ${
                    done
                      ? "border-matcha/25 bg-matcha/8"
                      : "border-ink/8 bg-rice/40 hover:border-yuzu/30 hover:bg-rice"
                  }`}
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-md text-sm font-extrabold ${
                    done ? "bg-matcha text-white" : "bg-paper text-ink/62"
                  }`}>
                    {done ? <CheckCircle2 aria-hidden="true" size={17} /> : index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-extrabold text-ink">{step.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-ink/62">{step.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LearningCard>
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-extrabold text-sakura">学习入口</p>
            <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">选一个开始</h2>
          </div>
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

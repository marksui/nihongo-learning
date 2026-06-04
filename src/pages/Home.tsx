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
import SpeakButton from "../components/SpeakButton";
import { dialogues } from "../data/dialogues";
import { grammarLessons } from "../data/grammar";
import { kanaItems } from "../data/kana";
import { getTodaySuggestion, learningGoals, learningMilestones, learningPathSteps } from "../data/learningPath";
import { numberExamples } from "../data/numbers";
import { vocabulary } from "../data/vocabulary";
import type { PageKey } from "../components/Navbar";
import { readLearningProgress } from "../utils/progress";

interface HomeProps {
  onNavigate: (page: PageKey) => void;
  onSpeak: (text: string) => Promise<boolean>;
}

interface FeatureCard {
  title: string;
  page: PageKey;
  description: string;
  metric: string;
  accent: string;
  icon: LucideIcon;
}

const goalIcons: Record<string, LucideIcon> = {
  read: Ear,
  listen: Target,
  speak: MessageCircle,
};

const goalAccentClasses = {
  matcha: "bg-matcha",
  sora: "bg-sora",
  sakura: "bg-sakura",
} satisfies Record<(typeof learningGoals)[number]["tone"], string>;

const milestoneToneClasses = {
  matcha: "border-matcha/20 bg-matcha/8 hover:border-matcha/35 hover:bg-matcha/12",
  sora: "border-sora/20 bg-sora/8 hover:border-sora/35 hover:bg-sora/12",
  sakura: "border-sakura/20 bg-sakura/8 hover:border-sakura/35 hover:bg-sakura/12",
} satisfies Record<(typeof learningMilestones)[number]["tone"], string>;

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

const Home = ({ onNavigate, onSpeak }: HomeProps) => {
  const today = useMemo(() => getTodaySuggestion(), []);
  const progress = useMemo(() => readLearningProgress(), []);
  const goalsById = useMemo(() => new Map(learningGoals.map((goal) => [goal.id, goal])), []);
  const milestonesById = useMemo(() => new Map(learningMilestones.map((milestone) => [milestone.id, milestone])), []);
  const viewedPages = new Set(progress.viewedPages);
  const completedPathSteps = learningPathSteps.filter((step) => viewedPages.has(step.page));
  const nextPathStep = learningPathSteps.find((step) => !viewedPages.has(step.page)) ?? learningPathSteps[learningPathSteps.length - 1];
  const nextGoal = nextPathStep ? goalsById.get(nextPathStep.goalId) : undefined;
  const nextMilestone = nextPathStep ? milestonesById.get(nextPathStep.milestoneId) : undefined;
  const pathComplete = completedPathSteps.length === learningPathSteps.length;
  const recentReads = progress.recentReads.slice(0, 5);
  const milestoneProgress = new Map(
    learningMilestones.map((milestone) => {
      const steps = learningPathSteps.filter((step) => step.milestoneId === milestone.id);
      const done = steps.filter((step) => viewedPages.has(step.page)).length;
      const total = steps.length || 1;

      return [milestone.id, { done, percent: Math.round((done / total) * 100), total }];
    }),
  );

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
          {learningGoals.map((goal) => {
            const Icon = goalIcons[goal.id] ?? Target;

            return (
              <LearningCard key={goal.id} interactive className="group p-0">
                <button
                  type="button"
                  onClick={() => onNavigate(goal.page)}
                  className="flex min-h-28 w-full cursor-pointer items-start gap-3 p-4 text-left"
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${goalAccentClasses[goal.tone]} text-white shadow-card`}>
                    <Icon aria-hidden="true" size={20} strokeWidth={2.2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-extrabold text-ink">{goal.title}</h3>
                      <ArrowRight className="mt-0.5 shrink-0 text-ink/36 transition group-hover:translate-x-0.5 group-hover:text-matcha" size={16} />
                    </div>
                    <p className="mt-1 text-sm leading-6 text-ink/66">{goal.description}</p>
                  </div>
                </button>
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
          {recentReads.length ? (
            <div className="mt-3 rounded-md border border-matcha/18 bg-matcha/8 px-3 py-2">
              <p className="text-xs font-bold text-ink/55">最近点读</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {recentReads.map((text) => (
                  <SpeakButton
                    key={text}
                    ariaLabel={`再听一次 ${text}`}
                    className="max-w-full justify-start"
                    iconOnly={false}
                    onSpeak={onSpeak}
                    text={text}
                    title="再听一次"
                    variant="light"
                  >
                    <span className="max-w-[11rem] truncate">{text}</span>
                  </SpeakButton>
                ))}
              </div>
            </div>
          ) : null}
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
              {completedPathSteps.length}/{learningPathSteps.length}
            </span>
          </div>
          {nextPathStep ? (
            <button
              type="button"
              onClick={() => onNavigate(nextPathStep.page)}
              className="mb-3 flex min-h-16 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-matcha/20 bg-matcha/10 px-3 py-2 text-left transition hover:border-matcha/35 hover:bg-matcha/14 active:scale-[0.99]"
            >
              <span className="min-w-0">
                <span className="block text-xs font-extrabold text-matcha">
                  {pathComplete ? "继续复习" : "下一步"}
                </span>
                <span className="mt-0.5 block text-base font-extrabold text-ink">{nextPathStep.title}</span>
                <span className="mt-0.5 block truncate text-xs font-bold text-ink/58">
                  {[nextMilestone?.label, nextGoal?.title].filter(Boolean).join(" · ")}
                </span>
              </span>
              <ArrowRight aria-hidden="true" className="shrink-0 text-matcha" size={18} />
            </button>
          ) : null}
          <div className="mb-3 grid gap-2 sm:grid-cols-3">
            {learningMilestones.map((milestone) => {
              const progressValue = milestoneProgress.get(milestone.id) ?? { done: 0, percent: 0, total: 1 };
              const current = !pathComplete && nextMilestone?.id === milestone.id;

              return (
                <button
                  key={milestone.id}
                  type="button"
                  onClick={() => onNavigate(milestone.page)}
                  className={`min-h-28 rounded-md border p-3 text-left transition active:scale-[0.99] ${
                    milestoneToneClasses[milestone.tone]
                  } ${current ? "ring-2 ring-yuzu/35" : ""}`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[0.68rem] font-extrabold text-ink/52">{milestone.label}</span>
                    <span className={`rounded px-1.5 py-0.5 text-[0.65rem] font-extrabold ${
                      current ? "bg-yuzu/30 text-ink" : "bg-paper/70 text-ink/52"
                    }`}>
                      {current ? "当前" : `${progressValue.done}/${progressValue.total}`}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm font-extrabold text-ink">{milestone.title}</span>
                  <span className="mt-1 block text-xs leading-5 text-ink/62">{milestone.description}</span>
                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-paper/80" aria-hidden="true">
                    <span
                      className={`block h-full rounded-full ${goalAccentClasses[milestone.tone]}`}
                      style={{ width: `${progressValue.percent}%` }}
                    />
                  </span>
                  <span className="mt-1 block text-[0.68rem] font-bold text-ink/50">
                    已完成 {progressValue.done}/{progressValue.total}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {learningPathSteps.map((step, index) => {
              const done = viewedPages.has(step.page);
              const goal = goalsById.get(step.goalId);
              const milestone = milestonesById.get(step.milestoneId);

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
                    {goal ? (
                      <span className="mt-2 inline-flex rounded bg-yuzu/18 px-2 py-0.5 text-[0.7rem] font-extrabold text-ink/58">
                        {milestone ? `${milestone.label} · ` : ""}{goal.title}
                      </span>
                    ) : null}
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

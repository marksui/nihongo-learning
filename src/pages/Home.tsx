import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Ear,
  GraduationCap,
  Grid3X3,
  Hash,
  Headphones,
  ListChecks,
  MessageCircle,
  MessagesSquare,
  PlayCircle,
  RotateCcw,
  Table2,
  Target,
} from "lucide-react";
import { useMemo, useState } from "react";
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
import {
  getDailyCompletionStats,
  getSeenContentStats,
  getTodayTaskStats,
  getWeeklyCompletionDays,
  markContentCompleted,
  markTodaySuggestionDone,
  readLearningProgress,
  recordSeenContent,
  type TodayTaskKey,
  type TodayTaskProgress,
} from "../utils/progress";

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

const todayTaskIcons = {
  kana: Grid3X3,
  words: BookOpen,
  grammar: GraduationCap,
  number: Hash,
  dialogue: MessagesSquare,
} satisfies Record<TodayTaskKey, LucideIcon>;

const todayTaskAccentClasses = {
  kana: "bg-matcha text-white",
  words: "bg-sakura text-white",
  grammar: "bg-sumire text-white",
  number: "bg-yuzu text-ink",
  dialogue: "bg-sora text-white",
} satisfies Record<TodayTaskKey, string>;

const todayTaskCardClasses = {
  kana: "border-matcha/20 bg-matcha/8",
  words: "border-sakura/20 bg-sakura/8",
  grammar: "border-sumire/20 bg-sumire/8",
  number: "border-yuzu/28 bg-yuzu/12",
  dialogue: "border-sora/20 bg-sora/8",
} satisfies Record<TodayTaskKey, string>;

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
  const [progress, setProgress] = useState(() => readLearningProgress());
  const [activeTodayNumber, setActiveTodayNumber] = useState(false);
  const todayTaskStats = getTodayTaskStats(progress, today);
  const todayTasks = todayTaskStats.tasks;
  const todayContentIds = todayTasks.flatMap((task) => task.contentIds);
  const todayFullyDone = todayTaskStats.completedTasks === todayTaskStats.totalTasks;
  const todayTaskMeta = useMemo(() => ({
    kana: {
      title: "假名热身",
      eyebrow: "五十音",
      page: "kana",
      description: `${today.kanaGroup}：${today.kanaPreview}`,
      preview: "先把今天这行读顺。",
      cta: "去看假名",
    },
    words: {
      title: "五个单词",
      eyebrow: "词汇",
      page: "vocabulary",
      description: today.words.map((word) => word.japanese).join(" / "),
      preview: "听单词，再看中文意思。",
      cta: "去看单词",
    },
    grammar: {
      title: today.grammar.title,
      eyebrow: "句型",
      page: "grammar",
      description: today.grammar.pattern,
      preview: "读一个句型和例句。",
      cta: "去学句型",
    },
    number: {
      title: today.numberScene.title,
      eyebrow: "数字整句",
      page: "numbers",
      description: today.numberScene.highlight,
      preview: today.numberScene.situation,
      cta: "去听数字",
    },
    dialogue: {
      title: today.dialogue.title,
      eyebrow: "会话",
      page: "conversation",
      description: today.dialogue.situation,
      preview: `你说：${today.dialogue.practiceSpeaker}`,
      cta: "去练会话",
    },
  }) satisfies Record<TodayTaskKey, {
    title: string;
    eyebrow: string;
    page: PageKey;
    description: string;
    preview: string;
    cta: string;
  }>, [today]);
  const nextTodayTask = todayTaskStats.nextTask;
  const nextTodayTaskMeta = nextTodayTask ? todayTaskMeta[nextTodayTask.key] : undefined;
  const goalsById = useMemo(() => new Map(learningGoals.map((goal) => [goal.id, goal])), []);
  const milestonesById = useMemo(() => new Map(learningMilestones.map((milestone) => [milestone.id, milestone])), []);
  const featureByPage = useMemo(() => new Map(featureCards.map((card) => [card.page, card])), []);
  const dailyStats = getDailyCompletionStats(progress);
  const seenStats = getSeenContentStats(progress);
  const weekDays = getWeeklyCompletionDays(progress);
  const weeklyDoneCount = weekDays.filter((day) => day.done).length;
  const viewedPages = new Set(progress.viewedPages);
  const completedPathSteps = learningPathSteps.filter((step) => viewedPages.has(step.page));
  const nextPathStep = learningPathSteps.find((step) => !viewedPages.has(step.page)) ?? learningPathSteps[learningPathSteps.length - 1];
  const nextGoal = nextPathStep ? goalsById.get(nextPathStep.goalId) : undefined;
  const nextMilestone = nextPathStep ? milestonesById.get(nextPathStep.milestoneId) : undefined;
  const pathComplete = completedPathSteps.length === learningPathSteps.length;
  const recentReads = progress.recentReads.slice(0, 5);
  const recentVisitedSteps = progress.viewedPages
    .filter((page) => page !== "home")
    .map((page) => {
      const step = learningPathSteps.find((item) => item.page === page);
      const feature = featureByPage.get(page);

      return step && feature ? { ...step, icon: feature.icon } : null;
    })
    .filter((step): step is NonNullable<typeof step> => Boolean(step))
    .slice(0, 3);
  const milestoneProgress = new Map(
    learningMilestones.map((milestone) => {
      const steps = learningPathSteps.filter((step) => step.milestoneId === milestone.id);
      const done = steps.filter((step) => viewedPages.has(step.page)).length;
      const total = steps.length || 1;

      return [milestone.id, { done, percent: Math.round((done / total) * 100), total }];
    }),
  );
  const currentMilestoneProgress = nextMilestone ? milestoneProgress.get(nextMilestone.id) : undefined;
  const currentMilestoneRemaining = currentMilestoneProgress
    ? Math.max(currentMilestoneProgress.total - currentMilestoneProgress.done, 0)
    : 0;
  const continuePage = nextTodayTaskMeta?.page ?? nextPathStep?.page ?? "kana";
  const continueEyebrow = nextTodayTaskMeta ? "继续今日任务" : todayFullyDone ? "今日已完成" : "继续学习路径";
  const continueTitle = nextTodayTaskMeta?.title ?? nextPathStep?.title ?? "五十音";
  const continueDescription = nextTodayTaskMeta?.description ?? nextPathStep?.description ?? "从假名开始重新热身。";
  const continueCta = nextTodayTaskMeta?.cta ?? (pathComplete ? "去复习" : "继续下一步");

  const completeToday = () => {
    if (!todayFullyDone) {
      setProgress(markTodaySuggestionDone(todayContentIds));
    }
  };

  const completeTask = (task: TodayTaskProgress) => {
    if (task.completed) {
      return;
    }

    const nextProgress = markContentCompleted(task.contentIds);
    const nextStats = getTodayTaskStats(nextProgress, today);

    setProgress(
      nextStats.completedTasks === nextStats.totalTasks
        ? markTodaySuggestionDone(todayContentIds)
        : nextProgress,
    );
  };

  const playTodayNumber = async () => {
    setActiveTodayNumber(true);
    setProgress(recordSeenContent(`number:${today.numberScene.id}`));
    const ok = await onSpeak(today.numberScene.audioText ?? today.numberScene.japanese);
    window.setTimeout(() => setActiveTodayNumber(false), ok ? 360 : 900);
  };

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
          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">能听、能读、能开口</h2>
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
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-extrabold text-matcha">
                <ListChecks aria-hidden="true" size={18} />
                今日学习
              </div>
              <h2 className="font-display text-2xl font-extrabold text-ink">完成 5 个小任务</h2>
              <p className="mt-1 text-sm leading-6 text-ink/62">每项都可以先去学习，再回首页标记完成。</p>
            </div>
            <div className="rounded-md border border-matcha/18 bg-matcha/8 px-3 py-2 text-right">
              <p className="text-xs font-bold text-ink/52">今日进度</p>
              <p className="mt-1 text-2xl font-extrabold leading-none text-matcha">
                {todayTaskStats.completedTasks}/{todayTaskStats.totalTasks}
              </p>
            </div>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-rice" aria-label={`今日完成度 ${todayTaskStats.percent}%`}>
            <div
              className="h-full rounded-full bg-matcha transition-all duration-300"
              style={{ width: `${todayTaskStats.percent}%` }}
            />
          </div>

          <div className="mt-4 space-y-3">
            {todayTasks.map((task) => {
              const meta = todayTaskMeta[task.key];
              const Icon = todayTaskIcons[task.key];
              const taskStarted = Boolean(task.seenCount || task.completedCount);
              const taskStatusLabel = task.completed
                ? "已完成"
                : task.completedCount
                  ? `${task.completedCount}/${task.totalCount} 已完成`
                  : task.seen
                    ? "已听过"
                    : task.seenCount
                      ? `${task.seenCount}/${task.totalCount} 已听`
                      : "待开始";
              const StatusIcon = task.completed ? CheckCircle2 : taskStarted ? Clock3 : Circle;
              const isNumberTask = task.key === "number";

              return (
                <div
                  key={task.key}
                  className={`rounded-md border p-3 transition ${
                    task.completed ? "border-matcha/28 bg-matcha/10" : todayTaskCardClasses[task.key]
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${todayTaskAccentClasses[task.key]} shadow-card`}>
                      <Icon aria-hidden="true" size={19} strokeWidth={2.25} />
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate(meta.page)}
                      className="min-w-0 flex-1 cursor-pointer text-left"
                    >
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-extrabold text-ink/52">{meta.eyebrow}</span>
                        <span
                          className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[0.68rem] font-extrabold ${
                            task.completed
                              ? "bg-matcha/14 text-matcha"
                              : taskStarted
                                ? "bg-yuzu/22 text-ink/66"
                                : "bg-paper/80 text-ink/48"
                          }`}
                        >
                          <StatusIcon aria-hidden="true" size={13} />
                          {taskStatusLabel}
                        </span>
                      </span>
                      <span className="mt-1 block break-words text-base font-extrabold text-ink">{meta.title}</span>
                      <span className="mt-1 block break-words text-sm leading-6 text-ink/64">{meta.description}</span>
                      <span className="mt-1 block truncate text-xs font-bold text-ink/46">{meta.preview}</span>
                    </button>
                    {isNumberTask ? (
                      <SpeakButton
                        active={activeTodayNumber}
                        ariaLabel={`朗读数字整句 ${today.numberScene.title}`}
                        className="h-10 w-10"
                        onClick={playTodayNumber}
                        title="朗读整句"
                        variant="light"
                      />
                    ) : null}
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <button
                      type="button"
                      onClick={() => onNavigate(meta.page)}
                      className="flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-ink/8 bg-paper px-3 py-2 text-sm font-extrabold text-ink/68 transition hover:border-matcha/25 hover:text-ink active:scale-[0.99]"
                    >
                      {meta.cta}
                      <ArrowRight aria-hidden="true" size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => completeTask(task)}
                      disabled={task.completed}
                      aria-pressed={task.completed}
                      className={`flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-extrabold transition active:scale-[0.99] ${
                        task.completed
                          ? "cursor-default border-matcha/20 bg-matcha/12 text-matcha"
                          : "border-yuzu/30 bg-yuzu/18 text-ink hover:bg-yuzu/28"
                      }`}
                    >
                      <CheckCircle2 aria-hidden="true" size={16} />
                      {task.completed ? "已完成" : "标记完成"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={completeToday}
            disabled={todayFullyDone}
            aria-pressed={todayFullyDone}
            className={`mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-extrabold transition active:scale-[0.99] ${
              todayFullyDone
                ? "cursor-default border-matcha/25 bg-matcha/12 text-matcha"
                : "cursor-pointer border-matcha/22 bg-matcha/10 text-matcha hover:bg-matcha hover:text-white"
            }`}
          >
            <CheckCircle2 aria-hidden="true" size={17} />
            {todayFullyDone ? "今日已完成" : "一键完成今日任务"}
          </button>

          <div className="mt-3 rounded-md border border-ink/8 bg-paper px-3 py-2">
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-1.5 text-xs font-bold text-ink/55">
                <CalendarDays aria-hidden="true" size={14} />
                本周节奏
              </p>
              <p className="text-xs font-extrabold text-matcha">{weeklyDoneCount}/7</p>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1.5">
              {weekDays.map((day) => (
                <div
                  key={day.dateKey}
                  className={`grid min-h-12 place-items-center rounded-md border px-1 text-[0.68rem] font-extrabold transition ${
                    day.done
                      ? "border-matcha/24 bg-matcha/12 text-matcha"
                      : day.isToday
                        ? "border-yuzu/32 bg-yuzu/12 text-ink/62"
                        : "border-ink/8 bg-rice/45 text-ink/44"
                  }`}
                  aria-label={`${day.isToday ? "今天" : `周${day.label}`}：${day.done ? "已完成" : "待完成"}`}
                  title={`${day.dateKey} ${day.done ? "已完成" : "待完成"}`}
                >
                  <span>{day.label}</span>
                  <span
                    className={`mt-1 h-1.5 w-5 rounded-full ${
                      day.done ? "bg-matcha" : day.isToday ? "bg-yuzu" : "bg-ink/12"
                    }`}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </LearningCard>

        <LearningCard className="p-4">
          <div className="mb-4 rounded-md border border-sora/18 bg-sora/8 p-3">
            <div className="mb-2 flex items-center gap-2 text-sm font-extrabold text-sora">
              <Headphones aria-hidden="true" size={18} />
              继续学习
            </div>
            <button
              type="button"
              onClick={() => onNavigate(continuePage)}
              className="flex min-h-20 w-full cursor-pointer items-center justify-between gap-3 rounded-md bg-paper/78 px-3 py-2 text-left transition hover:bg-paper active:scale-[0.99]"
            >
              <span className="min-w-0">
                <span className="block text-xs font-extrabold text-sora">{continueEyebrow}</span>
                <span className="mt-0.5 block break-words text-lg font-extrabold text-ink">{continueTitle}</span>
                <span className="mt-1 block break-words text-sm leading-6 text-ink/62">{continueDescription}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1 rounded-md bg-sora px-2 py-1 text-xs font-extrabold text-white">
                {continueCta}
                <ArrowRight aria-hidden="true" size={14} />
              </span>
            </button>
          </div>

          <div className="mb-4 rounded-md border border-matcha/18 bg-matcha/8 p-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-extrabold text-matcha">
                <RotateCcw aria-hidden="true" size={17} />
                最近复习
              </div>
              <span className="rounded bg-paper/78 px-2 py-0.5 text-xs font-bold text-ink/52">
                {recentReads.length ? `${recentReads.length} 条` : "暂无"}
              </span>
            </div>
            {recentReads.length ? (
              <div className="flex flex-wrap gap-2">
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
                    <span className="max-w-[12rem] truncate">{text}</span>
                  </SpeakButton>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-6 text-ink/62">点读过的日语会出现在这里，方便下次回来直接重听。</p>
            )}
          </div>

          <div className="mb-4 grid gap-2 sm:grid-cols-3">
            <div className="rounded-md border border-ink/8 bg-rice/45 px-3 py-2">
              <p className="text-xs font-bold text-ink/52">累计完成</p>
              <p className="mt-1 text-lg font-extrabold leading-tight text-ink">
                {dailyStats.totalDays}
                <span className="ml-1 text-sm font-bold text-ink/55">天</span>
              </p>
            </div>
            <div className="rounded-md border border-matcha/18 bg-matcha/8 px-3 py-2">
              <p className="text-xs font-bold text-ink/52">连续学习</p>
              <p className="mt-1 text-lg font-extrabold leading-tight text-matcha">
                {dailyStats.currentStreak ? dailyStats.currentStreak : "待完成"}
                {dailyStats.currentStreak ? <span className="ml-1 text-sm font-bold text-matcha/70">天</span> : null}
              </p>
            </div>
            <div className="rounded-md border border-sora/18 bg-sora/8 px-3 py-2">
              <p className="text-xs font-bold text-ink/52">已看内容</p>
              <p className="mt-1 text-lg font-extrabold leading-tight text-sora">
                {seenStats.totalSeen}
                <span className="ml-1 text-sm font-bold text-sora/70">项</span>
              </p>
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-sakura">学习路径</p>
              <h2 className="font-display text-2xl font-extrabold text-ink">按顺序走一遍</h2>
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
                <span className="mt-1 inline-flex rounded bg-paper/80 px-2 py-0.5 text-[0.68rem] font-extrabold text-ink/55">
                  {pathComplete ? "整条路线已走完" : `本阶段还差 ${currentMilestoneRemaining} 步`}
                </span>
              </span>
              <ArrowRight aria-hidden="true" className="shrink-0 text-matcha" size={18} />
            </button>
          ) : null}
          {recentVisitedSteps.length ? (
            <div className="mb-3 rounded-md border border-ink/8 bg-rice/38 p-3">
              <p className="text-xs font-bold text-ink/55">最近访问</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {recentVisitedSteps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => onNavigate(step.page)}
                      className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-ink/8 bg-paper/78 px-2 py-1.5 text-left text-sm font-extrabold text-ink/68 transition hover:border-matcha/25 hover:bg-paper hover:text-ink active:scale-[0.99]"
                    >
                      <Icon aria-hidden="true" className="shrink-0 text-matcha" size={16} />
                      <span className="truncate">{step.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
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
            <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">选一个开始</h2>
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

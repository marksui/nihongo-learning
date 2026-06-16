import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Ear,
  GraduationCap,
  Grid3X3,
  Hash,
  MessageCircle,
  MessagesSquare,
  RotateCcw,
  Table2,
  Target,
  Trophy,
} from "lucide-react";
import { useMemo, useState } from "react";
import JlptLevelSelector from "../components/JlptLevelSelector";
import LearningCard from "../components/LearningCard";
import type { PageKey } from "../components/Navbar";
import PageHero from "../components/PageHero";
import SpeakButton from "../components/SpeakButton";
import homeStudyScene from "../assets/home-study-scene.jpg";
import { dialogues } from "../data/dialogues";
import { grammarLessons } from "../data/grammar";
import { kanaItems } from "../data/kana";
import { getTodaySuggestion, learningGoals, learningMilestones, learningPathSteps } from "../data/learningPath";
import { numberExamples } from "../data/numbers";
import {
  getVocabularyJlptLevel,
  jlptVocabularyLevels,
  vocabulary,
  type JlptVocabularyLevel,
} from "../data/vocabulary";
import {
  getTodayTaskStats,
  markTodaySuggestionDone,
  readLearningProgress,
  recordSeenContent,
  setTargetJlptLevel,
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

interface PreviewItem {
  key: TodayTaskKey;
  label: string;
  title: string;
  page: PageKey;
  japanese: string;
  reading: string;
  meaning: string;
  speakText: string;
  contentIds: string[];
  icon: LucideIcon;
  accent: string;
}

const goalIcons: Record<string, LucideIcon> = {
  read: Ear,
  listen: Target,
  speak: MessageCircle,
};

const featureCards: FeatureCard[] = [
  {
    title: "五十音图",
    page: "kana",
    description: "假名、罗马音、例词一起点读。",
    metric: `${kanaItems.length} 个假名`,
    accent: "bg-matcha text-white",
    icon: Grid3X3,
  },
  {
    title: "数字读法",
    page: "numbers",
    description: "金额、日期、时间和复杂数字。",
    metric: `${numberExamples.length} 条读法`,
    accent: "bg-yuzu text-ink",
    icon: Hash,
  },
  {
    title: "常用单词",
    page: "vocabulary",
    description: "按问候、食物、交通等场景找词。",
    metric: `${vocabulary.filter((word) => word.category !== "考试单词").length} 个日常词`,
    accent: "bg-sakura text-white",
    icon: BookOpen,
  },
  {
    title: "基础语法",
    page: "grammar",
    description: "中文讲句型，例句可听读音。",
    metric: `${grammarLessons.length} 课`,
    accent: "bg-sumire text-white",
    icon: GraduationCap,
  },
  {
    title: "日常会话",
    page: "conversation",
    description: "你说 / 对方说，适合跟读。",
    metric: `${dialogues.length} 个场景`,
    accent: "bg-sora text-white",
    icon: MessagesSquare,
  },
  {
    title: "假名速读",
    page: "quickread",
    description: "快捷点读表，按文字直接听。",
    metric: "多张速读表",
    accent: "bg-matcha text-white",
    icon: Table2,
  },
  {
    title: "JLPT词库",
    page: "exam-vocabulary",
    description: "N5 到 N1 的补充词汇。",
    metric: `${vocabulary.length} 个词`,
    accent: "bg-sumire text-white",
    icon: Trophy,
  },
];

const taskLabels: Record<TodayTaskKey, string> = {
  kana: "假名",
  words: "单词",
  grammar: "句型",
  number: "数字",
  dialogue: "会话",
};

const taskAccent: Record<TodayTaskKey, string> = {
  kana: "bg-matcha text-white",
  words: "bg-sakura text-white",
  grammar: "bg-sumire text-white",
  number: "bg-yuzu text-ink",
  dialogue: "bg-sora text-white",
};

const Home = ({ onNavigate, onSpeak }: HomeProps) => {
  const [progress, setProgress] = useState(() => readLearningProgress());
  const [activePreviewKey, setActivePreviewKey] = useState<TodayTaskKey>("kana");
  const [activeTaskKey, setActiveTaskKey] = useState<TodayTaskKey | null>(null);
  const targetLevel = progress.targetJlptLevel;
  const today = useMemo(() => getTodaySuggestion(new Date(), targetLevel), [targetLevel]);
  const todayStats = getTodayTaskStats(progress, today);
  const previewWord = today.words[0] ?? vocabulary[0];
  const previewGrammar = today.grammar.examples[0];
  const previewDialogue = today.dialogue.lines.find((line) => line.speaker === today.dialogue.practiceSpeaker) ?? today.dialogue.lines[0];
  const viewedPages = new Set(progress.viewedPages);
  const nextPathStep = learningPathSteps.find((step) => !viewedPages.has(step.page)) ?? learningPathSteps[0];
  const targetLevelCounts = useMemo(() => {
    return jlptVocabularyLevels.reduce<Record<JlptVocabularyLevel, number>>((counts, level) => {
      counts[level] = vocabulary.filter((word) => getVocabularyJlptLevel(word) === level).length;
      return counts;
    }, {} as Record<JlptVocabularyLevel, number>);
  }, []);

  const previewItems = useMemo<PreviewItem[]>(() => [
    {
      key: "kana",
      label: "假名",
      title: today.kanaGroup,
      page: "kana",
      japanese: today.kanaPreview,
      reading: today.kanaPreview,
      meaning: "先把今天这一组读顺。",
      speakText: today.kanaPreview.replace(/\s+/g, "、"),
      contentIds: [`kana:${today.kanaGroup}`],
      icon: Grid3X3,
      accent: taskAccent.kana,
    },
    {
      key: "words",
      label: "单词",
      title: previewWord?.japanese ?? "日本語",
      page: "exam-vocabulary",
      japanese: previewWord?.japanese ?? "日本語",
      reading: previewWord?.kana ?? "にほんご",
      meaning: previewWord?.meaning ?? "日语",
      speakText: previewWord?.audioText ?? previewWord?.japanese ?? "日本語",
      contentIds: today.words.map((word) => `word:${word.id}`),
      icon: BookOpen,
      accent: taskAccent.words,
    },
    {
      key: "grammar",
      label: "句型",
      title: today.grammar.title,
      page: "grammar",
      japanese: previewGrammar?.japanese ?? today.grammar.pattern,
      reading: previewGrammar?.kana ?? today.grammar.patternKana,
      meaning: previewGrammar?.translation ?? today.grammar.explanation,
      speakText: previewGrammar?.japanese ?? today.grammar.audioText ?? today.grammar.pattern,
      contentIds: [`grammar:${today.grammar.id}`],
      icon: GraduationCap,
      accent: taskAccent.grammar,
    },
    {
      key: "number",
      label: "数字",
      title: today.numberScene.title,
      page: "numbers",
      japanese: today.numberScene.japanese,
      reading: today.numberScene.kana,
      meaning: today.numberScene.meaning,
      speakText: today.numberScene.audioText ?? today.numberScene.japanese,
      contentIds: [`number:${today.numberScene.id}`],
      icon: Hash,
      accent: taskAccent.number,
    },
    {
      key: "dialogue",
      label: "会话",
      title: today.dialogue.title,
      page: "conversation",
      japanese: previewDialogue?.japanese ?? today.dialogue.title,
      reading: previewDialogue?.kana ?? today.dialogue.situation,
      meaning: previewDialogue?.translation ?? today.dialogue.situation,
      speakText: previewDialogue?.audioText ?? previewDialogue?.japanese ?? today.dialogue.title,
      contentIds: [`dialogue:${today.dialogue.id}`],
      icon: MessagesSquare,
      accent: taskAccent.dialogue,
    },
  ], [previewDialogue, previewGrammar, previewWord, today]);

  const activePreview = previewItems.find((item) => item.key === activePreviewKey) ?? previewItems[0];
  const ActivePreviewIcon = activePreview.icon;
  const nextFeature = featureCards.find((card) => card.page === nextPathStep?.page) ?? featureCards[0];
  const NextFeatureIcon = nextFeature.icon;

  const playPreview = async (item: PreviewItem) => {
    setActiveTaskKey(item.key);
    setProgress(recordSeenContent(item.contentIds));
    const ok = await onSpeak(item.speakText);

    window.setTimeout(() => {
      setActiveTaskKey((current) => (current === item.key ? null : current));
    }, ok ? 360 : 900);
  };

  const playTask = (task: TodayTaskProgress) => {
    const item = previewItems.find((preview) => preview.key === task.key);

    if (item) {
      void playPreview(item);
    }
  };

  const chooseTargetLevel = (level: JlptVocabularyLevel) => {
    setProgress(setTargetJlptLevel(level));
  };

  const completeToday = () => {
    const contentIds = todayStats.tasks.flatMap((task) => task.contentIds);
    setProgress(markTodaySuggestionDone(contentIds));
  };

  return (
    <div className="space-y-6 sm:space-y-7">
      <PageHero
        title="中文学日语"
        description="从假名、数字、单词到会话，打开就能点读。界面以中文解释，日语内容保留原文、假名和中文意思。"
        stats={[
          { label: "假名", value: kanaItems.length },
          { label: "词汇", value: vocabulary.length },
          { label: "会话", value: dialogues.length },
        ]}
        actions={
          <>
            <button
              type="button"
              onClick={() => onNavigate(nextPathStep?.page ?? "kana")}
              className="tap-surface flex cursor-pointer items-center gap-2 rounded-lg bg-matcha px-4 py-2 font-extrabold text-white shadow-card transition hover:bg-matcha/90 active:scale-95"
            >
              {nextPathStep ? `继续：${nextPathStep.title}` : "开始五十音"}
              <ArrowRight aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("conversation")}
              className="tap-surface flex cursor-pointer items-center gap-2 rounded-lg border border-ink/10 bg-paper px-4 py-2 font-extrabold text-ink shadow-sm transition hover:border-sora/30 hover:bg-sora/10 active:scale-95"
            >
              进入会话
              <MessagesSquare aria-hidden="true" size={18} />
            </button>
          </>
        }
        media={
          <div className="overflow-hidden rounded-lg border border-ink/8 bg-paper p-2.5 shadow-card sm:p-3">
            <div className="relative h-[17.5rem] overflow-hidden rounded-lg sm:h-[28rem] lg:h-[28rem]">
              <img
                src={homeStudyScene}
                alt="大阪道顿堀河岸街景封面"
                className="h-full w-full object-cover object-[center_42%]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/54 via-ink/12 to-paper/8" />
              <div className="absolute left-3 top-3 rounded-lg border border-paper/70 bg-paper/88 px-3 py-2 shadow-card backdrop-blur">
                <p className="font-japanese text-sm font-extrabold text-ink/58">日本 / Osaka</p>
                <p className="mt-0.5 font-display text-2xl font-extrabold leading-none text-ink">大阪</p>
              </div>
              <div className="absolute inset-x-3 bottom-3 rounded-lg border border-paper/70 bg-paper/94 p-3 shadow-card backdrop-blur">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-2.5">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${activePreview.accent} shadow-card`}>
                      <ActivePreviewIcon aria-hidden="true" size={19} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold text-ink/52">{activePreview.label} · {activePreview.title}</p>
                      <p className="mt-0.5 break-words font-japanese text-xl font-extrabold leading-tight text-ink">
                        {activePreview.japanese}
                      </p>
                      <p className="mt-1 break-words text-xs font-bold leading-5 text-ink/58">{activePreview.reading}</p>
                    </div>
                  </div>
                  <SpeakButton
                    active={activeTaskKey === activePreview.key}
                    ariaLabel={`播放 ${activePreview.japanese}`}
                    className="h-10 w-10"
                    onClick={() => playPreview(activePreview)}
                    title="播放预览"
                    variant="light"
                  />
                </div>
                <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-ink/70">{activePreview.meaning}</p>
                <div className="mt-3 grid grid-cols-5 gap-1.5">
                  {previewItems.map((item) => {
                    const Icon = item.icon;
                    const selected = item.key === activePreviewKey;

                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setActivePreviewKey(item.key)}
                        aria-pressed={selected}
                        className={`tap-surface grid cursor-pointer place-items-center rounded-lg border px-1 py-1 text-xs font-extrabold transition active:scale-95 ${
                          selected
                            ? "border-matcha bg-matcha text-white shadow-card"
                            : "border-ink/8 bg-rice/70 text-ink/58 hover:border-yuzu/35 hover:bg-yuzu/16 hover:text-ink"
                        }`}
                      >
                        <Icon aria-hidden="true" size={15} />
                        <span className="mt-0.5">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        }
      />

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)]">
        <LearningCard className="p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-extrabold text-sakura">今日建议</p>
              <h2 className="mt-1 font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
                听一轮，读一轮
              </h2>
            </div>
            <div className="rounded-lg border border-matcha/18 bg-matcha/8 px-3 py-2 text-left sm:text-right">
              <p className="text-xs font-bold text-ink/52">完成度</p>
              <p className="text-xl font-extrabold text-matcha">{todayStats.percent}%</p>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-rice">
            <span
              className="block h-full rounded-full bg-matcha transition-all duration-500"
              style={{ width: `${todayStats.percent}%` }}
              aria-hidden="true"
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {todayStats.tasks.map((task) => {
              const item = previewItems.find((preview) => preview.key === task.key);
              if (!item) {
                return null;
              }

              const Icon = item.icon;
              const active = activeTaskKey === task.key;

              return (
                <div
                  key={task.key}
                  className={`rounded-lg border p-3 transition ${
                    task.completed
                      ? "border-matcha/25 bg-matcha/8"
                      : active
                        ? "border-yuzu/45 bg-yuzu/12 ring-2 ring-yuzu/20"
                        : "border-ink/8 bg-rice/42"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${taskAccent[task.key]} shadow-card`}>
                      <Icon aria-hidden="true" size={18} />
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.page)}
                      className="min-w-0 flex-1 cursor-pointer text-left"
                    >
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-extrabold text-ink/52">{taskLabels[task.key]}</span>
                        {task.completed ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-matcha/12 px-1.5 py-0.5 text-[0.68rem] font-extrabold text-matcha">
                            <CheckCircle2 aria-hidden="true" size={13} />
                            已完成
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 block truncate text-base font-extrabold text-ink">{item.title}</span>
                      <span className="mt-1 line-clamp-2 text-sm leading-5 text-ink/64">{item.meaning}</span>
                    </button>
                    <SpeakButton
                      active={active}
                      ariaLabel={`预听 ${item.title}`}
                      className="h-10 w-10"
                      onClick={() => playTask(task)}
                      title="预听"
                      variant="light"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={completeToday}
            disabled={todayStats.percent === 100}
            aria-pressed={todayStats.percent === 100}
            className={`mt-4 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-extrabold transition active:scale-[0.99] ${
              todayStats.percent === 100
                ? "cursor-default border-matcha/25 bg-matcha/10 text-matcha"
                : "border-yuzu/30 bg-yuzu/16 text-ink hover:bg-yuzu/26"
            }`}
          >
            <CheckCircle2 aria-hidden="true" size={17} />
            {todayStats.percent === 100 ? "今天已经完成" : "标记今日完成"}
          </button>
        </LearningCard>

        <div className="grid gap-4">
          <LearningCard className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold text-matcha">下一步</p>
                <h2 className="mt-1 font-display text-2xl font-extrabold leading-tight text-ink">{nextPathStep?.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/66">{nextPathStep?.description}</p>
              </div>
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${nextFeature.accent} shadow-card`}>
                <NextFeatureIcon aria-hidden="true" size={20} />
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate(nextPathStep?.page ?? "kana")}
              className="tap-surface mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-matcha px-3 py-2 text-sm font-extrabold text-white shadow-card transition hover:bg-matcha/90 active:scale-[0.99]"
            >
              继续学习
              <ArrowRight aria-hidden="true" size={16} />
            </button>
          </LearningCard>

          <LearningCard className="p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold text-sumire">词汇目标</p>
                <h2 className="mt-1 text-lg font-extrabold text-ink">{targetLevel}</h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("exam-vocabulary")}
                className="tap-surface flex cursor-pointer items-center gap-1.5 rounded-lg border border-ink/10 bg-rice/45 px-3 py-1.5 text-sm font-extrabold text-ink/68 transition hover:border-sumire/30 hover:bg-sumire/8 hover:text-ink"
              >
                词库
                <ArrowRight aria-hidden="true" size={15} />
              </button>
            </div>
            <JlptLevelSelector
              active={targetLevel}
              counts={targetLevelCounts}
              levels={jlptVocabularyLevels}
              onChange={chooseTargetLevel}
              size="compact"
            />
          </LearningCard>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <LearningCard className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-sora">三个月目标</p>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-ink">能听、能读、能开口</h2>
            </div>
            <RotateCcw aria-hidden="true" className="shrink-0 text-sora" size={22} />
          </div>
          <div className="mt-4 grid gap-3">
            {learningGoals.map((goal) => {
              const Icon = goalIcons[goal.id] ?? Target;

              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => onNavigate(goal.page)}
                  className="flex min-h-20 cursor-pointer items-start gap-3 rounded-lg border border-ink/8 bg-rice/42 p-3 text-left transition hover:border-matcha/25 hover:bg-rice active:scale-[0.99]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-paper text-matcha shadow-sm">
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base font-extrabold text-ink">{goal.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-ink/64">{goal.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LearningCard>

        <LearningCard className="p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-sakura">学习地图</p>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-ink">从零开始的顺序</h2>
            </div>
            <span className="rounded-lg border border-ink/8 bg-rice/45 px-2.5 py-1 text-xs font-extrabold text-ink/58">
              {learningPathSteps.filter((step) => viewedPages.has(step.page)).length}/{learningPathSteps.length}
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {learningPathSteps.map((step, index) => {
              const done = viewedPages.has(step.page);
              const milestone = learningMilestones.find((item) => item.id === step.milestoneId);

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onNavigate(step.page)}
                  className={`flex min-h-20 cursor-pointer items-start gap-3 rounded-lg border p-3 text-left transition active:scale-[0.99] ${
                    done
                      ? "border-matcha/25 bg-matcha/8"
                      : "border-ink/8 bg-rice/38 hover:border-yuzu/30 hover:bg-rice"
                  }`}
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-extrabold ${
                    done ? "bg-matcha text-white" : "bg-paper text-ink/62"
                  }`}>
                    {done ? <CheckCircle2 aria-hidden="true" size={17} /> : index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-extrabold text-ink">{step.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-ink/62">{step.description}</span>
                    {milestone ? (
                      <span className="mt-2 inline-flex rounded-md bg-yuzu/18 px-2 py-0.5 text-[0.68rem] font-extrabold text-ink/58">
                        {milestone.label}
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
            <p className="text-sm font-extrabold text-matcha">快速入口</p>
            <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">选一个开始</h2>
          </div>
        </div>

        <div className="learning-grid grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <LearningCard key={card.title} interactive className="group overflow-hidden p-0">
                <button
                  type="button"
                  onClick={() => onNavigate(card.page)}
                  className="flex min-h-32 w-full cursor-pointer items-start gap-4 p-4 text-left"
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${card.accent} shadow-card`}>
                    <Icon aria-hidden="true" size={21} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-lg font-extrabold text-ink">{card.title}</span>
                      <span className="rounded-md bg-rice px-1.5 py-0.5 text-xs font-bold text-ink/50">{index + 1}</span>
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-ink/68">{card.description}</span>
                    <span className="mt-3 flex items-center justify-between gap-3 text-xs font-extrabold text-ink/55">
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

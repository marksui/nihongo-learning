import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Grid3X3,
  Hash,
  MessagesSquare,
  Play,
  Sparkles,
  Table2,
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
import { getTodaySuggestion, learningPathSteps } from "../data/learningPath";
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

const featureCards: FeatureCard[] = [
  {
    title: "五十音",
    page: "kana",
    description: "假名、例词、读音一起学。",
    metric: `${kanaItems.length} 个假名`,
    accent: "bg-matcha text-white",
    icon: Grid3X3,
  },
  {
    title: "数字读法",
    page: "numbers",
    description: "价格、日期、时间和复杂数字。",
    metric: `${numberExamples.length} 条`,
    accent: "bg-yuzu text-ink",
    icon: Hash,
  },
  {
    title: "常用单词",
    page: "vocabulary",
    description: "按真实生活分类查词。",
    metric: `${vocabulary.filter((word) => word.category !== "考试单词").length} 个`,
    accent: "bg-sakura text-white",
    icon: BookOpen,
  },
  {
    title: "基础语法",
    page: "grammar",
    description: "中文解释，例句可点读。",
    metric: `${grammarLessons.length} 课`,
    accent: "bg-sumire text-white",
    icon: GraduationCap,
  },
  {
    title: "日常会话",
    page: "conversation",
    description: "你说 / 对方说，对照跟读。",
    metric: `${dialogues.length} 个情景`,
    accent: "bg-sora text-white",
    icon: MessagesSquare,
  },
  {
    title: "假名速读",
    page: "quickread",
    description: "一整页快捷点读。",
    metric: "速查表",
    accent: "bg-matcha text-white",
    icon: Table2,
  },
  {
    title: "JLPT词库",
    page: "exam-vocabulary",
    description: "N5 到 N1 的补充词汇。",
    metric: `${vocabulary.length} 个词`,
    accent: "bg-ink text-white",
    icon: Trophy,
  },
];

const taskAccent: Record<TodayTaskKey, string> = {
  kana: "bg-matcha text-white",
  words: "bg-sakura text-white",
  grammar: "bg-sumire text-white",
  number: "bg-yuzu text-ink",
  dialogue: "bg-sora text-white",
};

const Home = ({ onNavigate, onSpeak }: HomeProps) => {
  const [progress, setProgress] = useState(() => readLearningProgress());
  const [activeTaskKey, setActiveTaskKey] = useState<TodayTaskKey | null>(null);
  const targetLevel = progress.targetJlptLevel;
  const today = useMemo(() => getTodaySuggestion(new Date(), targetLevel), [targetLevel]);
  const todayStats = getTodayTaskStats(progress, today);
  const previewWord = today.words[0] ?? vocabulary[0];
  const previewGrammar = today.grammar.examples[0];
  const previewDialogue =
    today.dialogue.lines.find((line) => line.speaker === today.dialogue.practiceSpeaker) ?? today.dialogue.lines[0];
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
      meaning: "把今天这一组读顺。",
      speakText: today.kanaPreview.replace(/\s+/g, "、"),
      contentIds: [`kana:${today.kanaGroup}`],
      icon: Grid3X3,
      accent: taskAccent.kana,
    },
    {
      key: "words",
      label: "单词",
      title: previewWord?.japanese ?? "日本語",
      page: previewWord?.category === "考试单词" ? "exam-vocabulary" : "vocabulary",
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

  const playPreview = async (item: PreviewItem) => {
    setActiveTaskKey(item.key);
    setProgress(recordSeenContent(item.contentIds));
    const ok = await onSpeak(item.speakText);

    window.setTimeout(() => {
      setActiveTaskKey((current) => (current === item.key ? null : current));
    }, ok ? 420 : 900);
  };

  const completeToday = () => {
    const contentIds = todayStats.tasks.flatMap((task) => task.contentIds);
    setProgress(markTodaySuggestionDone(contentIds));
  };

  const chooseTargetLevel = (level: JlptVocabularyLevel) => {
    setProgress(setTargetJlptLevel(level));
  };

  return (
    <div className="space-y-6 sm:space-y-7">
      <PageHero
        title="中文学日语"
        eyebrow="零基础点读路线"
        description="打开就能跟着听、跟着读。先从五十音和常用句开始，再慢慢扩到单词、语法和真实会话。"
        stats={[
          { label: "假名", value: kanaItems.length },
          { label: "词汇", value: vocabulary.length },
          { label: "会话", value: dialogues.length },
        ]}
        actions={
          <>
            <button
              type="button"
              onClick={() => onNavigate("quickread")}
              className="tap-surface flex cursor-pointer items-center gap-2 rounded-lg bg-matcha px-4 py-2.5 font-extrabold text-white shadow-card transition hover:bg-matcha/90 active:scale-95"
            >
              直接点读
              <Play aria-hidden="true" size={18} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("kana")}
              className="tap-surface flex cursor-pointer items-center gap-2 rounded-lg border border-ink/10 bg-paper px-4 py-2.5 font-extrabold text-ink shadow-sm transition hover:border-sora/30 hover:bg-sora/10 active:scale-95"
            >
              开始五十音
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          </>
        }
        media={
          <div className="overflow-hidden rounded-lg border border-ink/10 bg-paper p-2 shadow-card">
            <div className="relative h-[19rem] overflow-hidden rounded-lg sm:h-[23rem] lg:h-[24rem]">
              <img
                src={homeStudyScene}
                alt="大阪道顿堀河岸街景封面"
                className="home-osaka-cover-image h-full w-full object-cover object-[center_48%]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/64 via-ink/18 to-transparent" />
              <div className="absolute inset-x-3 bottom-3 rounded-lg border border-paper/60 bg-paper/92 px-3 py-3 shadow-card backdrop-blur">
                <p className="font-japanese text-sm font-extrabold text-ink/55">Japan / 日本</p>
                <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
                  <p className="font-display text-3xl font-extrabold leading-none text-ink">Osaka 大阪</p>
                  <p className="rounded-md bg-yuzu/22 px-2 py-1 text-xs font-extrabold text-ink/62">听读入门</p>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <LearningCard className="p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-sakura">今日点读</p>
              <h2 className="font-display text-2xl font-extrabold leading-tight text-ink">听一遍，跟读一遍</h2>
            </div>
            <button
              type="button"
              onClick={completeToday}
              disabled={todayStats.percent === 100}
              className={`tap-surface rounded-lg border px-3 py-2 text-sm font-extrabold transition active:scale-[0.99] ${
                todayStats.percent === 100
                  ? "cursor-default border-matcha/25 bg-matcha/10 text-matcha"
                  : "cursor-pointer border-yuzu/30 bg-yuzu/16 text-ink hover:bg-yuzu/26"
              }`}
            >
              {todayStats.percent === 100 ? "已完成" : "标记完成"}
            </button>
          </div>

          <div className="mb-4 h-2 overflow-hidden rounded-full bg-rice">
            <span
              className="block h-full rounded-full bg-matcha transition-all duration-500"
              style={{ width: `${todayStats.percent}%` }}
              aria-hidden="true"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
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
                    active
                      ? "border-yuzu/55 bg-yuzu/14 ring-2 ring-yuzu/20"
                      : task.completed
                        ? "border-matcha/25 bg-matcha/8"
                        : "border-ink/8 bg-rice/38"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${item.accent}`}>
                      <Icon aria-hidden="true" size={17} />
                    </span>
                    {task.completed ? <CheckCircle2 aria-hidden="true" className="text-matcha" size={18} /> : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className="mt-3 block w-full cursor-pointer text-left"
                  >
                    <span className="text-xs font-extrabold text-ink/48">{item.label}</span>
                    <span className="mt-1 block truncate font-japanese text-lg font-extrabold text-ink">{item.japanese}</span>
                    <span className="mt-1 line-clamp-2 text-sm leading-5 text-ink/64">{item.meaning}</span>
                  </button>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate text-xs font-bold text-ink/45">{item.reading}</span>
                    <SpeakButton
                      active={active}
                      ariaLabel={`播放 ${item.title}`}
                      className="h-10 w-10"
                      onClick={() => playPreview(item)}
                      title="点读"
                      variant="light"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </LearningCard>

        <LearningCard className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-matcha">下一步</p>
              <h2 className="mt-1 text-2xl font-extrabold leading-tight text-ink">{nextPathStep?.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/66">{nextPathStep?.description}</p>
            </div>
            <Sparkles aria-hidden="true" className="shrink-0 text-yuzu" size={22} />
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
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <LearningCard className="p-4 sm:p-5">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-sora">学习路径</p>
              <h2 className="font-display text-2xl font-extrabold text-ink">从零开始的顺序</h2>
            </div>
            <span className="rounded-lg border border-ink/8 bg-rice/45 px-2.5 py-1 text-xs font-extrabold text-ink/58">
              {learningPathSteps.filter((step) => viewedPages.has(step.page)).length}/{learningPathSteps.length}
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {learningPathSteps.map((step, index) => {
              const done = viewedPages.has(step.page);

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
                    <span className="mt-1 line-clamp-2 text-xs leading-5 text-ink/62">{step.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
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
              className="tap-surface rounded-lg border border-ink/10 bg-rice/45 px-3 py-1.5 text-sm font-extrabold text-ink/68 transition hover:border-sumire/30 hover:bg-sumire/8 hover:text-ink"
            >
              词库
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
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-extrabold text-matcha">快速入口</p>
            <h2 className="font-display text-2xl font-extrabold text-ink">想学什么就点什么</h2>
          </div>
        </div>

        <div className="learning-grid grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((card) => {
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
                    <span className="text-lg font-extrabold text-ink">{card.title}</span>
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

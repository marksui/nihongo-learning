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
import { useMemo, useState } from "react";
import LearningCard from "../components/LearningCard";
import type { PageKey } from "../components/Navbar";
import SpeakButton from "../components/SpeakButton";
import homeStudyScene from "../assets/home-study-scene.jpg";
import { dialogues } from "../data/dialogues";
import { grammarLessons } from "../data/grammar";
import { kanaItems } from "../data/kana";
import { getTodaySuggestion } from "../data/learningPath";
import { numberExamples } from "../data/numbers";
import { vocabulary } from "../data/vocabulary";
import { readLearningProgress, recordSeenContent, type TodayTaskKey } from "../utils/progress";

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
  page: PageKey;
  japanese: string;
  reading: string;
  meaning: string;
  speakText: string;
  contentIds: string[];
  icon: LucideIcon;
}

const featureCards: FeatureCard[] = [
  {
    title: "五十音",
    page: "kana",
    description: "先把假名听熟，看见就能读。",
    metric: `${kanaItems.length} 个假名`,
    accent: "bg-matcha text-white",
    icon: Grid3X3,
  },
  {
    title: "假名速读",
    page: "quickread",
    description: "一整页点读表，打开就能跟读。",
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
    description: "按生活场景找词，每张卡都能读。",
    metric: `${vocabulary.filter((word) => word.category !== "考试单词").length} 个`,
    accent: "bg-sakura text-white",
    icon: BookOpen,
  },
  {
    title: "基础语法",
    page: "grammar",
    description: "中文解释、句型、例句一起看。",
    metric: `${grammarLessons.length} 课`,
    accent: "bg-sumire text-white",
    icon: GraduationCap,
  },
  {
    title: "日常会话",
    page: "conversation",
    description: "你说 / 对方说，对照练开口。",
    metric: `${dialogues.length} 个情景`,
    accent: "bg-matcha text-white",
    icon: MessagesSquare,
  },
  {
    title: "JLPT词库",
    page: "exam-vocabulary",
    description: "按级别长期积累高频词。",
    metric: `${vocabulary.length} 个词`,
    accent: "bg-ink text-white",
    icon: Trophy,
  },
];

const Home = ({ onNavigate, onSpeak }: HomeProps) => {
  const [activeTaskKey, setActiveTaskKey] = useState<TodayTaskKey | null>(null);
  const progress = useMemo(() => readLearningProgress(), []);
  const today = useMemo(() => getTodaySuggestion(new Date(), progress.targetJlptLevel), [progress.targetJlptLevel]);
  const previewWord = today.words[0] ?? vocabulary[0];
  const previewGrammar = today.grammar.examples[0];
  const previewDialogue =
    today.dialogue.lines.find((line) => line.speaker === today.dialogue.practiceSpeaker) ?? today.dialogue.lines[0];

  const previewItems = useMemo<PreviewItem[]>(() => [
    {
      key: "kana",
      label: "假名",
      page: "kana",
      japanese: today.kanaPreview,
      reading: today.kanaPreview,
      meaning: "今天先读顺这一组。",
      speakText: today.kanaPreview.replace(/\s+/g, "、"),
      contentIds: [`kana:${today.kanaGroup}`],
      icon: Grid3X3,
    },
    {
      key: "words",
      label: "单词",
      page: previewWord?.category === "考试单词" ? "exam-vocabulary" : "vocabulary",
      japanese: previewWord?.japanese ?? "日本語",
      reading: previewWord?.kana ?? "にほんご",
      meaning: previewWord?.meaning ?? "日语",
      speakText: previewWord?.audioText ?? previewWord?.japanese ?? "日本語",
      contentIds: today.words.map((word) => `word:${word.id}`),
      icon: BookOpen,
    },
    {
      key: "grammar",
      label: "句型",
      page: "grammar",
      japanese: previewGrammar?.japanese ?? today.grammar.pattern,
      reading: previewGrammar?.kana ?? today.grammar.patternKana,
      meaning: previewGrammar?.translation ?? today.grammar.explanation,
      speakText: previewGrammar?.japanese ?? today.grammar.audioText ?? today.grammar.pattern,
      contentIds: [`grammar:${today.grammar.id}`],
      icon: GraduationCap,
    },
    {
      key: "number",
      label: "数字",
      page: "numbers",
      japanese: today.numberScene.japanese,
      reading: today.numberScene.kana,
      meaning: today.numberScene.meaning,
      speakText: today.numberScene.audioText ?? today.numberScene.japanese,
      contentIds: [`number:${today.numberScene.id}`],
      icon: Hash,
    },
    {
      key: "dialogue",
      label: "会话",
      page: "conversation",
      japanese: previewDialogue?.japanese ?? today.dialogue.title,
      reading: previewDialogue?.kana ?? today.dialogue.situation,
      meaning: previewDialogue?.translation ?? today.dialogue.situation,
      speakText: previewDialogue?.audioText ?? previewDialogue?.japanese ?? today.dialogue.title,
      contentIds: [`dialogue:${today.dialogue.id}`],
      icon: MessagesSquare,
    },
  ], [previewDialogue, previewGrammar, previewWord, today]);

  const playPreview = async (item: PreviewItem) => {
    setActiveTaskKey(item.key);
    recordSeenContent(item.contentIds);
    const ok = await onSpeak(item.speakText);

    window.setTimeout(() => {
      setActiveTaskKey((current) => (current === item.key ? null : current));
    }, ok ? 420 : 900);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <section className="relative min-h-[24rem] overflow-hidden rounded-lg border border-ink/10 bg-ink shadow-soft sm:min-h-[28rem] lg:min-h-[31rem]">
        <img
          src={homeStudyScene}
          alt="大阪道顿堀河岸街景封面"
          className="home-osaka-cover-image absolute inset-0 h-full w-full object-cover object-[center_52%]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/6" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-4 sm:p-6 lg:p-8">
            <p className="mb-3 inline-flex rounded-md border border-white/22 bg-white/16 px-3 py-1 text-xs font-extrabold text-white backdrop-blur">
              零基础中文路线
            </p>
            <h1 className="font-display break-words text-[2.2rem] font-extrabold leading-none text-white sm:text-[3.05rem] lg:text-[3.8rem]">
              中文学日语
            </h1>
            <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/88 sm:text-lg">
              打开就能跟读。日语、假名、romaji 和中文意思放在一起，先听，再看，再开口。
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
                className="tap-surface flex cursor-pointer items-center gap-2 rounded-lg border border-white/22 bg-white/88 px-4 py-2.5 font-extrabold text-ink shadow-sm transition hover:bg-white active:scale-95"
              >
                进入会话
                <ArrowRight aria-hidden="true" size={18} />
              </button>
            </div>

            <div className="mt-5 grid w-full max-w-md grid-cols-3 gap-2">
              {[
                { label: "假名", value: kanaItems.length },
                { label: "词汇", value: vocabulary.length },
                { label: "会话", value: dialogues.length },
              ].map((stat) => (
                <div key={stat.label} className="rounded-md border border-white/18 bg-white/15 px-3 py-2 text-white backdrop-blur">
                  <p className="text-xl font-extrabold leading-none">{stat.value}</p>
                  <p className="mt-1 text-xs font-bold text-white/78">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LearningCard className="p-3 sm:p-4">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-extrabold text-matcha">今日点读</p>
          <h2 className="section-title text-2xl">先听 5 个</h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("quickread")}
            className="tap-surface rounded-lg border border-ink/10 bg-rice/50 px-3 py-2 text-sm font-extrabold text-ink/68 transition hover:border-matcha/25 hover:bg-matcha/8 hover:text-ink"
          >
            快捷表
          </button>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
          {previewItems.map((item) => {
            const Icon = item.icon;
            const active = activeTaskKey === item.key;

            return (
              <div
                key={item.key}
                className={`min-w-0 rounded-lg border p-3 transition ${
                  active
                    ? "border-yuzu/55 bg-yuzu/14 ring-2 ring-yuzu/20"
                    : "border-ink/8 bg-rice/38"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className="min-w-0 cursor-pointer text-left"
                  >
                    <span className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-paper/80 px-2 py-1 text-xs font-extrabold text-ink/55">
                      <Icon aria-hidden="true" size={14} />
                      {item.label}
                    </span>
                    <span className="block break-words font-japanese text-xl font-extrabold leading-snug text-ink">
                      {item.japanese}
                    </span>
                  </button>
                  <SpeakButton
                    active={active}
                    ariaLabel={`播放 ${item.label}`}
                    className="h-10 w-10"
                    onClick={() => playPreview(item)}
                    title="点读"
                    variant="light"
                  />
                </div>
                <p className="mt-2 break-words text-sm font-bold leading-5 text-ink/56">{item.reading}</p>
                <p className="mt-1 line-clamp-2 text-sm leading-5 text-ink/68">{item.meaning}</p>
              </div>
            );
          })}
        </div>
      </LearningCard>

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-extrabold text-sora">学习入口</p>
            <h2 className="section-title text-2xl">想学什么就点什么</h2>
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
                    <span className="mt-1.5 block text-sm leading-6 text-ink/66">{card.description}</span>
                    <span className="mt-2 flex items-center justify-between gap-3 text-xs font-extrabold text-ink/52">
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

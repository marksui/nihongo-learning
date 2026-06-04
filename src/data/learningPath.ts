import type { PageKey } from "../components/Navbar";
import { dialogues } from "./dialogues";
import { grammarLessons } from "./grammar";
import { kanaGroups, kanaItems } from "./kana";
import { numberSceneExamples } from "./numbers";
import { getVocabularyJlptLevel, vocabulary, type JlptVocabularyLevel } from "./vocabulary";

export interface LearningPathStep {
  id: string;
  page: PageKey;
  title: string;
  description: string;
  goalId: string;
  milestoneId: string;
  level?: "入门" | "基础" | "进阶入门";
  tags?: string[];
  sortOrder?: number;
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  tone: "matcha" | "sora" | "sakura";
  page: PageKey;
  level?: "入门" | "基础" | "进阶入门";
  tags?: string[];
  sortOrder?: number;
}

export interface LearningMilestone {
  id: string;
  label: string;
  title: string;
  description: string;
  page: PageKey;
  goalId: string;
  tone: LearningGoal["tone"];
  level?: "入门" | "基础" | "进阶入门";
  tags?: string[];
  sortOrder?: number;
}

export interface TodaySuggestion {
  kanaGroup: string;
  kanaPreview: string;
  words: typeof vocabulary;
  grammar: (typeof grammarLessons)[number];
  dialogue: (typeof dialogues)[number];
  numberScene: (typeof numberSceneExamples)[number];
}

export const learningGoals: LearningGoal[] = [
  {
    id: "read",
    title: "看见就会读",
    description: "假名、单词、句子都能直接点听，慢慢建立读音反应。",
    tone: "matcha",
    page: "kana",
    level: "入门",
    tags: ["假名", "点读", "读音"],
    sortOrder: 1,
  },
  {
    id: "listen",
    title: "听见能跟上",
    description: "用日语原句、假名读音和中文意思对照，听懂常见表达。",
    tone: "sora",
    page: "quickread",
    level: "基础",
    tags: ["听力", "对照", "复习"],
    sortOrder: 2,
  },
  {
    id: "speak",
    title: "场景里能开口",
    description: "从点餐、问路、购物到学校交流，一句一句练到能说。",
    tone: "sakura",
    page: "conversation",
    level: "基础",
    tags: ["会话", "情景", "跟读"],
    sortOrder: 3,
  },
];

export const learningMilestones: LearningMilestone[] = [
  {
    id: "month-1",
    label: "第1个月",
    title: "读音打底",
    description: "五十音、数字和速读表先跑顺，看到就能读出声。",
    page: "kana",
    goalId: "read",
    tone: "matcha",
    level: "入门",
    tags: ["假名", "数字", "读音"],
    sortOrder: 1,
  },
  {
    id: "month-2",
    label: "第2个月",
    title: "词句成型",
    description: "把常用词和基础句型接起来，能看懂日常短句。",
    page: "vocabulary",
    goalId: "listen",
    tone: "sora",
    level: "基础",
    tags: ["单词", "语法", "句型"],
    sortOrder: 2,
  },
  {
    id: "month-3",
    label: "第3个月",
    title: "场景开口",
    description: "用会话练你说和对方说，能完成常见小交流。",
    page: "conversation",
    goalId: "speak",
    tone: "sakura",
    level: "基础",
    tags: ["会话", "跟读", "情景"],
    sortOrder: 3,
  },
];

export const learningPathSteps: LearningPathStep[] = [
  { id: "path-kana", page: "kana", title: "五十音", description: "先熟悉假名和基础发音。", goalId: "read", milestoneId: "month-1", level: "入门", tags: ["假名"], sortOrder: 1 },
  { id: "path-numbers", page: "numbers", title: "数字", description: "接着学价格、日期和时间。", goalId: "read", milestoneId: "month-1", level: "入门", tags: ["数字"], sortOrder: 2 },
  { id: "path-vocabulary", page: "vocabulary", title: "单词", description: "按真实场景积累词汇。", goalId: "listen", milestoneId: "month-2", level: "基础", tags: ["词汇", "场景"], sortOrder: 3 },
  { id: "path-grammar", page: "grammar", title: "语法", description: "用短句掌握基础句型。", goalId: "listen", milestoneId: "month-2", level: "基础", tags: ["句型"], sortOrder: 4 },
  { id: "path-conversation", page: "conversation", title: "会话", description: "跟着情景一句一句说。", goalId: "speak", milestoneId: "month-3", level: "基础", tags: ["会话", "跟读"], sortOrder: 5 },
  { id: "path-quickread", page: "quickread", title: "速读", description: "用点读表快速复习。", goalId: "read", milestoneId: "month-3", level: "入门", tags: ["复习", "点读"], sortOrder: 6 },
];

const getDayIndex = (date = new Date()) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
};

const pickMany = <T,>(items: T[], start: number, count: number) =>
  Array.from({ length: count }, (_, index) => items[(start + index) % items.length]).filter(Boolean);

export const getTodaySuggestion = (date = new Date(), targetLevel: JlptVocabularyLevel = "N5"): TodaySuggestion => {
  const dayIndex = getDayIndex(date);
  const kanaGroup = kanaGroups[dayIndex % kanaGroups.length];
  const targetVocabulary = vocabulary.filter((word) => getVocabularyJlptLevel(word) === targetLevel);
  const kanaPreview = kanaItems
    .filter((item) => item.group === kanaGroup)
    .slice(0, 6)
    .map((item) => item.hiragana)
    .join(" ");

  return {
    kanaGroup,
    kanaPreview,
    words: pickMany(targetVocabulary.length ? targetVocabulary : vocabulary, dayIndex * 5, 5),
    grammar: grammarLessons[dayIndex % grammarLessons.length],
    dialogue: dialogues[dayIndex % dialogues.length],
    numberScene: numberSceneExamples[dayIndex % numberSceneExamples.length],
  };
};

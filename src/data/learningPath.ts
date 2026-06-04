import type { PageKey } from "../components/Navbar";
import { dialogues } from "./dialogues";
import { grammarLessons } from "./grammar";
import { kanaGroups, kanaItems } from "./kana";
import { vocabulary } from "./vocabulary";

export interface LearningPathStep {
  id: string;
  page: PageKey;
  title: string;
  description: string;
  goalId: string;
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

export interface TodaySuggestion {
  kanaGroup: string;
  kanaPreview: string;
  words: typeof vocabulary;
  grammar: (typeof grammarLessons)[number];
  dialogue: (typeof dialogues)[number];
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

export const learningPathSteps: LearningPathStep[] = [
  { id: "path-kana", page: "kana", title: "五十音", description: "先熟悉假名和基础发音。", goalId: "read", level: "入门", tags: ["假名"], sortOrder: 1 },
  { id: "path-numbers", page: "numbers", title: "数字", description: "接着学价格、日期和时间。", goalId: "read", level: "入门", tags: ["数字"], sortOrder: 2 },
  { id: "path-vocabulary", page: "vocabulary", title: "单词", description: "按真实场景积累词汇。", goalId: "listen", level: "基础", tags: ["词汇", "场景"], sortOrder: 3 },
  { id: "path-grammar", page: "grammar", title: "语法", description: "用短句掌握基础句型。", goalId: "listen", level: "基础", tags: ["句型"], sortOrder: 4 },
  { id: "path-conversation", page: "conversation", title: "会话", description: "跟着情景一句一句说。", goalId: "speak", level: "基础", tags: ["会话", "跟读"], sortOrder: 5 },
  { id: "path-quickread", page: "quickread", title: "速读", description: "用点读表快速复习。", goalId: "read", level: "入门", tags: ["复习", "点读"], sortOrder: 6 },
];

const getDayIndex = (date = new Date()) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
};

const pickMany = <T,>(items: T[], start: number, count: number) =>
  Array.from({ length: count }, (_, index) => items[(start + index) % items.length]).filter(Boolean);

export const getTodaySuggestion = (date = new Date()): TodaySuggestion => {
  const dayIndex = getDayIndex(date);
  const kanaGroup = kanaGroups[dayIndex % kanaGroups.length];
  const kanaPreview = kanaItems
    .filter((item) => item.group === kanaGroup)
    .slice(0, 6)
    .map((item) => item.hiragana)
    .join(" ");

  return {
    kanaGroup,
    kanaPreview,
    words: pickMany(vocabulary, dayIndex * 5, 5),
    grammar: grammarLessons[dayIndex % grammarLessons.length],
    dialogue: dialogues[dayIndex % dialogues.length],
  };
};

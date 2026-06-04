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
}

export interface TodaySuggestion {
  kanaGroup: string;
  kanaPreview: string;
  words: typeof vocabulary;
  grammar: (typeof grammarLessons)[number];
  dialogue: (typeof dialogues)[number];
}

export const learningPathSteps: LearningPathStep[] = [
  { id: "path-kana", page: "kana", title: "五十音", description: "先熟悉假名和基础发音。" },
  { id: "path-numbers", page: "numbers", title: "数字", description: "接着学价格、日期和时间。" },
  { id: "path-vocabulary", page: "vocabulary", title: "单词", description: "按真实场景积累词汇。" },
  { id: "path-grammar", page: "grammar", title: "语法", description: "用短句掌握基础句型。" },
  { id: "path-conversation", page: "conversation", title: "会话", description: "跟着情景一句一句说。" },
  { id: "path-quickread", page: "quickread", title: "速读", description: "用点读表快速复习。" },
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

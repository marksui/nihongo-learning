import type { PageKey } from "../components/Navbar";
import type { TodaySuggestion } from "../data/learningPath";
import { jlptVocabularyLevels, type JlptVocabularyLevel } from "../data/vocabulary";

export interface LearningProgress {
  viewedPages: PageKey[];
  dailyDoneDates: string[];
  seenContentIds: string[];
  completedContentIds: string[];
  lastStudiedAtByContentId: Record<string, string>;
  targetJlptLevel: JlptVocabularyLevel;
  updatedAt: string;
}

export type TodayTaskKey = "kana" | "words" | "grammar" | "number" | "dialogue";

export interface TodayTaskProgress {
  key: TodayTaskKey;
  contentIds: string[];
  completed: boolean;
  seen: boolean;
  completedCount: number;
  seenCount: number;
  totalCount: number;
}

export interface TodayTaskStats {
  tasks: TodayTaskProgress[];
  completedTasks: number;
  totalTasks: number;
  completedContentCount: number;
  seenContentCount: number;
  totalContentCount: number;
  percent: number;
  nextTask?: TodayTaskProgress;
}

const progressStorageKey = "nihongo-learning-progress";

const emptyProgress = (): LearningProgress => ({
  viewedPages: [],
  dailyDoneDates: [],
  seenContentIds: [],
  completedContentIds: [],
  lastStudiedAtByContentId: {},
  targetJlptLevel: "N5",
  updatedAt: new Date().toISOString(),
});

const canUseStorage = () => typeof window !== "undefined" && Boolean(window.localStorage);

const normalizeContentIds = (contentIds: string | string[]) =>
  (Array.isArray(contentIds) ? contentIds : [contentIds])
    .map((id) => id.trim())
    .filter(Boolean);

const readStringRecord = (value: unknown): Record<string, string> => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, item]) => Boolean(key.trim()) && typeof item === "string")
      .slice(0, 500),
  );
};

const readTargetJlptLevel = (value: unknown): JlptVocabularyLevel =>
  typeof value === "string" && (jlptVocabularyLevels as readonly string[]).includes(value)
    ? value as JlptVocabularyLevel
    : "N5";

const touchContentIds = (
  current: Record<string, string>,
  contentIds: string[],
  timestamp: string,
) => ({
  ...current,
  ...Object.fromEntries(contentIds.map((id) => [id, timestamp])),
});

export const readLearningProgress = (): LearningProgress => {
  if (!canUseStorage()) {
    return emptyProgress();
  }

  try {
    const raw = window.localStorage.getItem(progressStorageKey);
    if (!raw) {
      return emptyProgress();
    }

    const parsed = JSON.parse(raw) as Partial<LearningProgress>;
    return {
      viewedPages: Array.isArray(parsed.viewedPages) ? parsed.viewedPages.filter(Boolean) as PageKey[] : [],
      dailyDoneDates: Array.isArray(parsed.dailyDoneDates) ? parsed.dailyDoneDates.filter(Boolean).slice(0, 60) : [],
      seenContentIds: Array.isArray(parsed.seenContentIds) ? parsed.seenContentIds.filter(Boolean).slice(0, 500) : [],
      completedContentIds: Array.isArray(parsed.completedContentIds)
        ? parsed.completedContentIds.filter(Boolean).slice(0, 500)
        : [],
      lastStudiedAtByContentId: readStringRecord(parsed.lastStudiedAtByContentId),
      targetJlptLevel: readTargetJlptLevel(parsed.targetJlptLevel),
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return emptyProgress();
  }
};

const writeLearningProgress = (progress: LearningProgress) => {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(progressStorageKey, JSON.stringify(progress));
  } catch {
    // Progress is a small convenience feature, so storage failures should not interrupt learning.
  }
};

const getDateKey = (date = new Date()) => {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
};

const addDays = (date: Date, amount: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + amount);

  return nextDate;
};

export const isTodaySuggestionDone = (progress: LearningProgress, date = new Date()) =>
  progress.dailyDoneDates.includes(getDateKey(date));

export const getDailyCompletionStats = (progress: LearningProgress, date = new Date()) => {
  const doneDates = new Set(progress.dailyDoneDates.filter(Boolean));
  let currentStreak = 0;
  let cursor = new Date(date);

  while (doneDates.has(getDateKey(cursor))) {
    currentStreak += 1;
    cursor = addDays(cursor, -1);
  }

  return {
    totalDays: doneDates.size,
    currentStreak,
  };
};

export const getSeenContentStats = (progress: LearningProgress) => ({
  totalSeen: new Set(progress.seenContentIds.filter(Boolean)).size,
});

const weekDayLabels = ["日", "一", "二", "三", "四", "五", "六"];

export const getWeeklyCompletionDays = (progress: LearningProgress, date = new Date()) => {
  const doneDates = new Set(progress.dailyDoneDates.filter(Boolean));

  return Array.from({ length: 7 }, (_, index) => {
    const day = addDays(date, index - 6);
    const dateKey = getDateKey(day);
    const isToday = index === 6;

    return {
      dateKey,
      done: doneDates.has(dateKey),
      isToday,
      label: isToday ? "今" : weekDayLabels[day.getDay()],
    };
  });
};

export const markTodaySuggestionDone = (contentIds: string[] = [], date = new Date()) => {
  const progress = readLearningProgress();
  const dateKey = getDateKey(date);
  const ids = normalizeContentIds(contentIds);
  const timestamp = new Date().toISOString();
  const nextProgress = {
    ...progress,
    dailyDoneDates: Array.from(new Set([dateKey, ...progress.dailyDoneDates])).slice(0, 60),
    completedContentIds: Array.from(new Set([...ids, ...progress.completedContentIds])).slice(0, 500),
    lastStudiedAtByContentId: touchContentIds(progress.lastStudiedAtByContentId, ids, timestamp),
    updatedAt: timestamp,
  };

  writeLearningProgress(nextProgress);
  return nextProgress;
};

export const setTargetJlptLevel = (level: JlptVocabularyLevel) => {
  const progress = readLearningProgress();
  const nextProgress = {
    ...progress,
    targetJlptLevel: level,
    updatedAt: new Date().toISOString(),
  };

  writeLearningProgress(nextProgress);
  return nextProgress;
};

export const markContentCompleted = (contentIds: string | string[]) => {
  const ids = normalizeContentIds(contentIds);
  const progress = readLearningProgress();

  if (!ids.length) {
    return progress;
  }

  const timestamp = new Date().toISOString();
  const nextProgress = {
    ...progress,
    completedContentIds: Array.from(new Set([...ids, ...progress.completedContentIds])).slice(0, 500),
    lastStudiedAtByContentId: touchContentIds(progress.lastStudiedAtByContentId, ids, timestamp),
    updatedAt: timestamp,
  };

  writeLearningProgress(nextProgress);
  return nextProgress;
};

export const isContentCompleted = (progress: LearningProgress, contentId: string) =>
  progress.completedContentIds.includes(contentId);

export const getTodayTaskStats = (progress: LearningProgress, today: TodaySuggestion): TodayTaskStats => {
  const legacyTodayDone = isTodaySuggestionDone(progress);
  const completedIds = new Set(progress.completedContentIds.filter(Boolean));
  const seenIds = new Set(progress.seenContentIds.filter(Boolean));
  const taskContentIds: Array<{ key: TodayTaskKey; contentIds: string[] }> = [
    { key: "kana", contentIds: [`kana:${today.kanaGroup}`] },
    { key: "words", contentIds: today.words.map((word) => `word:${word.id}`) },
    { key: "grammar", contentIds: [`grammar:${today.grammar.id}`] },
    { key: "number", contentIds: [`number:${today.numberScene.id}`] },
    { key: "dialogue", contentIds: [`dialogue:${today.dialogue.id}`] },
  ];

  const tasks = taskContentIds.map(({ key, contentIds }) => {
    const totalCount = contentIds.length || 1;
    const legacyCompletedCount = legacyTodayDone
      ? contentIds.filter((id) => seenIds.has(id)).length
      : 0;
    const completedCount = Math.max(
      contentIds.filter((id) => completedIds.has(id)).length,
      legacyCompletedCount,
    );
    const seenCount = contentIds.filter((id) => seenIds.has(id)).length;

    return {
      key,
      contentIds,
      completed: completedCount >= totalCount,
      seen: seenCount >= totalCount,
      completedCount,
      seenCount,
      totalCount,
    };
  });

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalContentCount = tasks.reduce((sum, task) => sum + task.totalCount, 0);
  const completedContentCount = tasks.reduce((sum, task) => sum + task.completedCount, 0);
  const seenContentCount = tasks.reduce((sum, task) => sum + task.seenCount, 0);

  return {
    tasks,
    completedTasks,
    totalTasks: tasks.length,
    completedContentCount,
    seenContentCount,
    totalContentCount,
    percent: Math.round((completedTasks / tasks.length) * 100),
    nextTask: tasks.find((task) => !task.completed),
  };
};

export const recordPageVisit = (page: PageKey) => {
  const progress = readLearningProgress();
  writeLearningProgress({
    ...progress,
    viewedPages: Array.from(new Set([page, ...progress.viewedPages])).slice(0, 12),
    updatedAt: new Date().toISOString(),
  });
};

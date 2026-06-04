import type { PageKey } from "../components/Navbar";

export interface LearningProgress {
  viewedPages: PageKey[];
  recentReads: string[];
  dailyDoneDates: string[];
  seenContentIds: string[];
  updatedAt: string;
}

const progressStorageKey = "nihongo-learning-progress";

const emptyProgress = (): LearningProgress => ({
  viewedPages: [],
  recentReads: [],
  dailyDoneDates: [],
  seenContentIds: [],
  updatedAt: new Date().toISOString(),
});

const canUseStorage = () => typeof window !== "undefined" && Boolean(window.localStorage);

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
      recentReads: Array.isArray(parsed.recentReads) ? parsed.recentReads.filter(Boolean).slice(0, 12) : [],
      dailyDoneDates: Array.isArray(parsed.dailyDoneDates) ? parsed.dailyDoneDates.filter(Boolean).slice(0, 60) : [],
      seenContentIds: Array.isArray(parsed.seenContentIds) ? parsed.seenContentIds.filter(Boolean).slice(0, 500) : [],
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
  const nextProgress = {
    ...progress,
    dailyDoneDates: Array.from(new Set([dateKey, ...progress.dailyDoneDates])).slice(0, 60),
    seenContentIds: Array.from(new Set([...contentIds.filter(Boolean), ...progress.seenContentIds])).slice(0, 500),
    updatedAt: new Date().toISOString(),
  };

  writeLearningProgress(nextProgress);
  return nextProgress;
};

export const recordPageVisit = (page: PageKey) => {
  const progress = readLearningProgress();
  writeLearningProgress({
    ...progress,
    viewedPages: Array.from(new Set([page, ...progress.viewedPages])).slice(0, 12),
    updatedAt: new Date().toISOString(),
  });
};

export const recordRecentRead = (text: string) => {
  const value = text.trim();
  if (!value) {
    return;
  }

  const progress = readLearningProgress();
  writeLearningProgress({
    ...progress,
    recentReads: Array.from(new Set([value, ...progress.recentReads])).slice(0, 12),
    updatedAt: new Date().toISOString(),
  });
};

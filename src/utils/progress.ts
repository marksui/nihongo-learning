import type { PageKey } from "../components/Navbar";

export interface LearningProgress {
  viewedPages: PageKey[];
  recentReads: string[];
  updatedAt: string;
}

const progressStorageKey = "nihongo-learning-progress";

const emptyProgress = (): LearningProgress => ({
  viewedPages: [],
  recentReads: [],
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

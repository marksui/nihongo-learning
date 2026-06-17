import { jlptVocabularyLevels, type JlptVocabularyLevel } from "../data/vocabulary";

export interface LearningProgress {
  targetJlptLevel: JlptVocabularyLevel;
  updatedAt: string;
}

const progressStorageKey = "nihongo-learning-progress";

const emptyProgress = (): LearningProgress => ({
  targetJlptLevel: "N5",
  updatedAt: new Date().toISOString(),
});

const canUseStorage = () => typeof window !== "undefined" && Boolean(window.localStorage);

const readTargetJlptLevel = (value: unknown): JlptVocabularyLevel =>
  typeof value === "string" && (jlptVocabularyLevels as readonly string[]).includes(value)
    ? value as JlptVocabularyLevel
    : "N5";

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

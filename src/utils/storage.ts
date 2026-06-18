import { themeStorageKey } from "../data/themes";

const legacyRecordTokens = [
  "listened",
  "heard",
  "played",
  "history",
  "progress",
  "recent",
  "visited",
  "completed",
  "seen",
  "record",
];

export const clearLegacyLearningRecords = () => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const keysToRemove: string[] = [];

    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);

      if (!key || key === themeStorageKey) {
        continue;
      }

      const normalizedKey = key.toLowerCase();
      const belongsToApp =
        normalizedKey.startsWith("nihongo-learning-") ||
        normalizedKey.startsWith("nihongo-");
      const looksLikeRecord = legacyRecordTokens.some((token) =>
        normalizedKey.includes(token),
      );

      if (belongsToApp && looksLikeRecord) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // Ignore private browsing or storage permission errors.
  }
};

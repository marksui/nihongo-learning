import { themeStorageKey } from "../data/themes";

const legacyListeningHints = [
  "listened",
  "heard",
  "played",
  "speech",
  "listen",
  "speak",
  "progress",
  "history",
  "recent",
  "last",
  "visited",
  "viewed",
  "seen",
  "completed",
  "已听",
  "听过",
  "已读",
  "看过",
];

export const clearLegacyListeningMarks = () => {
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
      const belongsToThisApp =
        normalizedKey.includes("nihongo") ||
        normalizedKey.includes("japanese") ||
        key.includes("日语") ||
        key.includes("假名");
      const looksLikeListeningMark = legacyListeningHints.some((hint) =>
        normalizedKey.includes(hint.toLowerCase()),
      );

      if (belongsToThisApp && looksLikeListeningMark) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // Storage may be unavailable in private browsing; learning still works.
  }
};

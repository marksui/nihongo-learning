export const formatRomajiReading = (romaji: string) => {
  return romaji
    .split(/([A-Za-z]+)/)
    .map((part) => (/^[A-Za-z]+$/.test(part) ? part.toLowerCase() : part))
    .join("")
    .replace(/\s+/g, " ")
    .replace(/\s([/·,.;:!?])/g, " $1")
    .trim();
};

const moraPatterns = [
  "kya",
  "kyu",
  "kyo",
  "gya",
  "gyu",
  "gyo",
  "sha",
  "shu",
  "sho",
  "cha",
  "chu",
  "cho",
  "nya",
  "nyu",
  "nyo",
  "hya",
  "hyu",
  "hyo",
  "bya",
  "byu",
  "byo",
  "pya",
  "pyu",
  "pyo",
  "mya",
  "myu",
  "myo",
  "rya",
  "ryu",
  "ryo",
  "shi",
  "chi",
  "tsu",
  "fu",
  "ja",
  "ju",
  "jo",
  "che",
  "she",
  "je",
  "fa",
  "fi",
  "fe",
  "fo",
  "va",
  "vi",
  "vu",
  "ve",
  "vo",
  "ka",
  "ki",
  "ku",
  "ke",
  "ko",
  "ga",
  "gi",
  "gu",
  "ge",
  "go",
  "sa",
  "su",
  "se",
  "so",
  "za",
  "ji",
  "zu",
  "ze",
  "zo",
  "ta",
  "te",
  "to",
  "da",
  "de",
  "do",
  "na",
  "ni",
  "nu",
  "ne",
  "no",
  "ha",
  "hi",
  "he",
  "ho",
  "ba",
  "bi",
  "bu",
  "be",
  "bo",
  "pa",
  "pi",
  "pu",
  "pe",
  "po",
  "ma",
  "mi",
  "mu",
  "me",
  "mo",
  "ya",
  "yu",
  "yo",
  "ra",
  "ri",
  "ru",
  "re",
  "ro",
  "wa",
  "wo",
  "a",
  "i",
  "u",
  "e",
  "o",
];

const vowels = new Set(["a", "i", "u", "e", "o"]);

const isConsonant = (char: string) => /^[a-z]$/.test(char) && !vowels.has(char);

const splitRomajiWord = (word: string) => {
  const result: string[] = [];
  let index = 0;

  while (index < word.length) {
    const current = word[index];
    const next = word[index + 1];

    if (
      current &&
      next &&
      current === next &&
      current !== "n" &&
      isConsonant(current)
    ) {
      result.push(current);
      index += 1;
      continue;
    }

    if (current === "n") {
      const following = word[index + 1];
      if (!following || (isConsonant(following) && following !== "y")) {
        result.push("n");
        index += 1;
        continue;
      }
    }

    const match = moraPatterns.find((pattern) => word.startsWith(pattern, index));
    if (match) {
      result.push(match);
      index += match.length;
      continue;
    }

    result.push(current);
    index += 1;
  }

  return result.join(" ");
};

export const formatRomajiReading = (romaji: string) => {
  return romaji
    .split(/([A-Za-z]+)/)
    .map((part) => (/^[A-Za-z]+$/.test(part) ? splitRomajiWord(part.toLowerCase()) : part))
    .join("")
    .replace(/\s+/g, " ")
    .replace(/\s([/·,.;:!?])/g, " $1")
    .trim();
};

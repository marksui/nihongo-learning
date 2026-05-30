export interface KanaExample {
  word: string;
  kana: string;
  romaji: string;
  meaning: string;
}

export interface KanaItem {
  id: string;
  group: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  example: KanaExample;
}

export const kanaGroups = [
  "あ行",
  "か行",
  "さ行",
  "た行",
  "な行",
  "は行",
  "ま行",
  "や行",
  "ら行",
  "わ行",
] as const;

export const kanaItems: KanaItem[] = [
  { id: "a", group: "あ行", hiragana: "あ", katakana: "ア", romaji: "a", example: { word: "雨", kana: "あめ", romaji: "ame", meaning: "雨" } },
  { id: "i", group: "あ行", hiragana: "い", katakana: "イ", romaji: "i", example: { word: "犬", kana: "いぬ", romaji: "inu", meaning: "狗" } },
  { id: "u", group: "あ行", hiragana: "う", katakana: "ウ", romaji: "u", example: { word: "海", kana: "うみ", romaji: "umi", meaning: "海" } },
  { id: "e", group: "あ行", hiragana: "え", katakana: "エ", romaji: "e", example: { word: "駅", kana: "えき", romaji: "eki", meaning: "车站" } },
  { id: "o", group: "あ行", hiragana: "お", katakana: "オ", romaji: "o", example: { word: "お茶", kana: "おちゃ", romaji: "ocha", meaning: "茶" } },
  { id: "ka", group: "か行", hiragana: "か", katakana: "カ", romaji: "ka", example: { word: "傘", kana: "かさ", romaji: "kasa", meaning: "伞" } },
  { id: "ki", group: "か行", hiragana: "き", katakana: "キ", romaji: "ki", example: { word: "木", kana: "き", romaji: "ki", meaning: "树" } },
  { id: "ku", group: "か行", hiragana: "く", katakana: "ク", romaji: "ku", example: { word: "靴", kana: "くつ", romaji: "kutsu", meaning: "鞋" } },
  { id: "ke", group: "か行", hiragana: "け", katakana: "ケ", romaji: "ke", example: { word: "景色", kana: "けしき", romaji: "keshiki", meaning: "景色" } },
  { id: "ko", group: "か行", hiragana: "こ", katakana: "コ", romaji: "ko", example: { word: "子ども", kana: "こども", romaji: "kodomo", meaning: "孩子" } },
  { id: "sa", group: "さ行", hiragana: "さ", katakana: "サ", romaji: "sa", example: { word: "桜", kana: "さくら", romaji: "sakura", meaning: "樱花" } },
  { id: "shi", group: "さ行", hiragana: "し", katakana: "シ", romaji: "shi", example: { word: "塩", kana: "しお", romaji: "shio", meaning: "盐" } },
  { id: "su", group: "さ行", hiragana: "す", katakana: "ス", romaji: "su", example: { word: "寿司", kana: "すし", romaji: "sushi", meaning: "寿司" } },
  { id: "se", group: "さ行", hiragana: "せ", katakana: "セ", romaji: "se", example: { word: "先生", kana: "せんせい", romaji: "sensei", meaning: "老师" } },
  { id: "so", group: "さ行", hiragana: "そ", katakana: "ソ", romaji: "so", example: { word: "空", kana: "そら", romaji: "sora", meaning: "天空" } },
  { id: "ta", group: "た行", hiragana: "た", katakana: "タ", romaji: "ta", example: { word: "旅", kana: "たび", romaji: "tabi", meaning: "旅行" } },
  { id: "chi", group: "た行", hiragana: "ち", katakana: "チ", romaji: "chi", example: { word: "地図", kana: "ちず", romaji: "chizu", meaning: "地图" } },
  { id: "tsu", group: "た行", hiragana: "つ", katakana: "ツ", romaji: "tsu", example: { word: "月", kana: "つき", romaji: "tsuki", meaning: "月亮" } },
  { id: "te", group: "た行", hiragana: "て", katakana: "テ", romaji: "te", example: { word: "手", kana: "て", romaji: "te", meaning: "手" } },
  { id: "to", group: "た行", hiragana: "と", katakana: "ト", romaji: "to", example: { word: "友だち", kana: "ともだち", romaji: "tomodachi", meaning: "朋友" } },
  { id: "na", group: "な行", hiragana: "な", katakana: "ナ", romaji: "na", example: { word: "夏", kana: "なつ", romaji: "natsu", meaning: "夏天" } },
  { id: "ni", group: "な行", hiragana: "に", katakana: "ニ", romaji: "ni", example: { word: "日本", kana: "にほん", romaji: "nihon", meaning: "日本" } },
  { id: "nu", group: "な行", hiragana: "ぬ", katakana: "ヌ", romaji: "nu", example: { word: "布", kana: "ぬの", romaji: "nuno", meaning: "布" } },
  { id: "ne", group: "な行", hiragana: "ね", katakana: "ネ", romaji: "ne", example: { word: "猫", kana: "ねこ", romaji: "neko", meaning: "猫" } },
  { id: "no", group: "な行", hiragana: "の", katakana: "ノ", romaji: "no", example: { word: "ノート", kana: "のーと", romaji: "nooto", meaning: "笔记本" } },
  { id: "ha", group: "は行", hiragana: "は", katakana: "ハ", romaji: "ha", example: { word: "花", kana: "はな", romaji: "hana", meaning: "花" } },
  { id: "hi", group: "は行", hiragana: "ひ", katakana: "ヒ", romaji: "hi", example: { word: "火", kana: "ひ", romaji: "hi", meaning: "火" } },
  { id: "fu", group: "は行", hiragana: "ふ", katakana: "フ", romaji: "fu", example: { word: "船", kana: "ふね", romaji: "fune", meaning: "船" } },
  { id: "he", group: "は行", hiragana: "へ", katakana: "ヘ", romaji: "he", example: { word: "部屋", kana: "へや", romaji: "heya", meaning: "房间" } },
  { id: "ho", group: "は行", hiragana: "ほ", katakana: "ホ", romaji: "ho", example: { word: "本", kana: "ほん", romaji: "hon", meaning: "书" } },
  { id: "ma", group: "ま行", hiragana: "ま", katakana: "マ", romaji: "ma", example: { word: "町", kana: "まち", romaji: "machi", meaning: "城镇" } },
  { id: "mi", group: "ま行", hiragana: "み", katakana: "ミ", romaji: "mi", example: { word: "水", kana: "みず", romaji: "mizu", meaning: "水" } },
  { id: "mu", group: "ま行", hiragana: "む", katakana: "ム", romaji: "mu", example: { word: "虫", kana: "むし", romaji: "mushi", meaning: "虫子" } },
  { id: "me", group: "ま行", hiragana: "め", katakana: "メ", romaji: "me", example: { word: "目", kana: "め", romaji: "me", meaning: "眼睛" } },
  { id: "mo", group: "ま行", hiragana: "も", katakana: "モ", romaji: "mo", example: { word: "森", kana: "もり", romaji: "mori", meaning: "森林" } },
  { id: "ya", group: "や行", hiragana: "や", katakana: "ヤ", romaji: "ya", example: { word: "山", kana: "やま", romaji: "yama", meaning: "山" } },
  { id: "yu", group: "や行", hiragana: "ゆ", katakana: "ユ", romaji: "yu", example: { word: "雪", kana: "ゆき", romaji: "yuki", meaning: "雪" } },
  { id: "yo", group: "や行", hiragana: "よ", katakana: "ヨ", romaji: "yo", example: { word: "夜", kana: "よる", romaji: "yoru", meaning: "夜晚" } },
  { id: "ra", group: "ら行", hiragana: "ら", katakana: "ラ", romaji: "ra", example: { word: "ラーメン", kana: "らーめん", romaji: "raamen", meaning: "拉面" } },
  { id: "ri", group: "ら行", hiragana: "り", katakana: "リ", romaji: "ri", example: { word: "りんご", kana: "りんご", romaji: "ringo", meaning: "苹果" } },
  { id: "ru", group: "ら行", hiragana: "る", katakana: "ル", romaji: "ru", example: { word: "留守", kana: "るす", romaji: "rusu", meaning: "不在家" } },
  { id: "re", group: "ら行", hiragana: "れ", katakana: "レ", romaji: "re", example: { word: "レモン", kana: "れもん", romaji: "remon", meaning: "柠檬" } },
  { id: "ro", group: "ら行", hiragana: "ろ", katakana: "ロ", romaji: "ro", example: { word: "六", kana: "ろく", romaji: "roku", meaning: "六" } },
  { id: "wa", group: "わ行", hiragana: "わ", katakana: "ワ", romaji: "wa", example: { word: "私", kana: "わたし", romaji: "watashi", meaning: "我" } },
  { id: "wo", group: "わ行", hiragana: "を", katakana: "ヲ", romaji: "wo / o", example: { word: "本を読む", kana: "ほんをよむ", romaji: "hon o yomu", meaning: "读书" } },
  { id: "n", group: "わ行", hiragana: "ん", katakana: "ン", romaji: "n", example: { word: "パン", kana: "ぱん", romaji: "pan", meaning: "面包" } },
];

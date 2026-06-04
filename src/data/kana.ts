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
  level?: "入门" | "基础" | "进阶入门";
  tags?: string[];
  sortOrder?: number;
  audioText?: string;
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
  "濁音",
  "半濁音",
  "拗音",
  "促音・長音",
] as const;

const basicKanaItems: KanaItem[] = [
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

const kanaExtensionItems: KanaItem[] = [
  { id: "ga", group: "濁音", hiragana: "が", katakana: "ガ", romaji: "ga", example: { word: "学校", kana: "がっこう", romaji: "gakkou", meaning: "学校" }, level: "基础", tags: ["浊音"], sortOrder: 101 },
  { id: "gi", group: "濁音", hiragana: "ぎ", katakana: "ギ", romaji: "gi", example: { word: "銀行", kana: "ぎんこう", romaji: "ginkou", meaning: "银行" }, level: "基础", tags: ["浊音"], sortOrder: 102 },
  { id: "gu", group: "濁音", hiragana: "ぐ", katakana: "グ", romaji: "gu", example: { word: "具合", kana: "ぐあい", romaji: "guai", meaning: "情况 / 身体状况" }, level: "基础", tags: ["浊音"], sortOrder: 103 },
  { id: "ge", group: "濁音", hiragana: "げ", katakana: "ゲ", romaji: "ge", example: { word: "元気", kana: "げんき", romaji: "genki", meaning: "精神 / 健康" }, level: "基础", tags: ["浊音"], sortOrder: 104 },
  { id: "go-daku", group: "濁音", hiragana: "ご", katakana: "ゴ", romaji: "go", example: { word: "午後", kana: "ごご", romaji: "gogo", meaning: "下午" }, level: "基础", tags: ["浊音"], sortOrder: 105 },
  { id: "za", group: "濁音", hiragana: "ざ", katakana: "ザ", romaji: "za", example: { word: "座席", kana: "ざせき", romaji: "zaseki", meaning: "座位" }, level: "基础", tags: ["浊音"], sortOrder: 106 },
  { id: "ji", group: "濁音", hiragana: "じ", katakana: "ジ", romaji: "ji", example: { word: "時間", kana: "じかん", romaji: "jikan", meaning: "时间" }, level: "基础", tags: ["浊音"], sortOrder: 107 },
  { id: "zu", group: "濁音", hiragana: "ず", katakana: "ズ", romaji: "zu", example: { word: "地図", kana: "ちず", romaji: "chizu", meaning: "地图" }, level: "基础", tags: ["浊音"], sortOrder: 108 },
  { id: "ze", group: "濁音", hiragana: "ぜ", katakana: "ゼ", romaji: "ze", example: { word: "全部", kana: "ぜんぶ", romaji: "zenbu", meaning: "全部" }, level: "基础", tags: ["浊音"], sortOrder: 109 },
  { id: "zo", group: "濁音", hiragana: "ぞ", katakana: "ゾ", romaji: "zo", example: { word: "家族", kana: "かぞく", romaji: "kazoku", meaning: "家人" }, level: "基础", tags: ["浊音"], sortOrder: 110 },
  { id: "da", group: "濁音", hiragana: "だ", katakana: "ダ", romaji: "da", example: { word: "大学", kana: "だいがく", romaji: "daigaku", meaning: "大学" }, level: "基础", tags: ["浊音"], sortOrder: 111 },
  { id: "di", group: "濁音", hiragana: "ぢ", katakana: "ヂ", romaji: "ji", example: { word: "鼻血", kana: "はなぢ", romaji: "hanaji", meaning: "鼻血" }, level: "进阶入门", tags: ["浊音"], sortOrder: 112 },
  { id: "du", group: "濁音", hiragana: "づ", katakana: "ヅ", romaji: "zu", example: { word: "続く", kana: "つづく", romaji: "tsuzuku", meaning: "继续" }, level: "进阶入门", tags: ["浊音"], sortOrder: 113 },
  { id: "de", group: "濁音", hiragana: "で", katakana: "デ", romaji: "de", example: { word: "出口", kana: "でぐち", romaji: "deguchi", meaning: "出口" }, level: "基础", tags: ["浊音"], sortOrder: 114 },
  { id: "do", group: "濁音", hiragana: "ど", katakana: "ド", romaji: "do", example: { word: "どこ", kana: "どこ", romaji: "doko", meaning: "哪里" }, level: "基础", tags: ["浊音"], sortOrder: 115 },
  { id: "ba", group: "濁音", hiragana: "ば", katakana: "バ", romaji: "ba", example: { word: "番号", kana: "ばんごう", romaji: "bangou", meaning: "号码" }, level: "基础", tags: ["浊音"], sortOrder: 116 },
  { id: "bi", group: "濁音", hiragana: "び", katakana: "ビ", romaji: "bi", example: { word: "病院", kana: "びょういん", romaji: "byouin", meaning: "医院" }, level: "基础", tags: ["浊音"], sortOrder: 117 },
  { id: "bu", group: "濁音", hiragana: "ぶ", katakana: "ブ", romaji: "bu", example: { word: "豚肉", kana: "ぶたにく", romaji: "butaniku", meaning: "猪肉" }, level: "基础", tags: ["浊音"], sortOrder: 118 },
  { id: "be", group: "濁音", hiragana: "べ", katakana: "ベ", romaji: "be", example: { word: "勉強", kana: "べんきょう", romaji: "benkyou", meaning: "学习" }, level: "基础", tags: ["浊音"], sortOrder: 119 },
  { id: "bo", group: "濁音", hiragana: "ぼ", katakana: "ボ", romaji: "bo", example: { word: "帽子", kana: "ぼうし", romaji: "boushi", meaning: "帽子" }, level: "基础", tags: ["浊音"], sortOrder: 120 },
  { id: "pa", group: "半濁音", hiragana: "ぱ", katakana: "パ", romaji: "pa", example: { word: "パン", kana: "ぱん", romaji: "pan", meaning: "面包" }, level: "基础", tags: ["半浊音"], sortOrder: 121 },
  { id: "pi", group: "半濁音", hiragana: "ぴ", katakana: "ピ", romaji: "pi", example: { word: "ピンク", kana: "ぴんく", romaji: "pinku", meaning: "粉色" }, level: "基础", tags: ["半浊音"], sortOrder: 122 },
  { id: "pu", group: "半濁音", hiragana: "ぷ", katakana: "プ", romaji: "pu", example: { word: "プール", kana: "ぷーる", romaji: "puuru", meaning: "游泳池" }, level: "基础", tags: ["半浊音"], sortOrder: 123 },
  { id: "pe", group: "半濁音", hiragana: "ぺ", katakana: "ペ", romaji: "pe", example: { word: "ペン", kana: "ぺん", romaji: "pen", meaning: "笔" }, level: "基础", tags: ["半浊音"], sortOrder: 124 },
  { id: "po", group: "半濁音", hiragana: "ぽ", katakana: "ポ", romaji: "po", example: { word: "ポスト", kana: "ぽすと", romaji: "posuto", meaning: "邮箱" }, level: "基础", tags: ["半浊音"], sortOrder: 125 },
  { id: "kya", group: "拗音", hiragana: "きゃ", katakana: "キャ", romaji: "kya", example: { word: "客", kana: "きゃく", romaji: "kyaku", meaning: "客人" }, level: "基础", tags: ["拗音"], sortOrder: 126 },
  { id: "kyu", group: "拗音", hiragana: "きゅ", katakana: "キュ", romaji: "kyu", example: { word: "急行", kana: "きゅうこう", romaji: "kyuukou", meaning: "急行" }, level: "基础", tags: ["拗音"], sortOrder: 127 },
  { id: "kyo", group: "拗音", hiragana: "きょ", katakana: "キョ", romaji: "kyo", example: { word: "今日", kana: "きょう", romaji: "kyou", meaning: "今天" }, level: "基础", tags: ["拗音"], sortOrder: 128 },
  { id: "sha", group: "拗音", hiragana: "しゃ", katakana: "シャ", romaji: "sha", example: { word: "写真", kana: "しゃしん", romaji: "shashin", meaning: "照片" }, level: "基础", tags: ["拗音"], sortOrder: 129 },
  { id: "shu", group: "拗音", hiragana: "しゅ", katakana: "シュ", romaji: "shu", example: { word: "宿題", kana: "しゅくだい", romaji: "shukudai", meaning: "作业" }, level: "基础", tags: ["拗音"], sortOrder: 130 },
  { id: "sho", group: "拗音", hiragana: "しょ", katakana: "ショ", romaji: "sho", example: { word: "図書館", kana: "としょかん", romaji: "toshokan", meaning: "图书馆" }, level: "基础", tags: ["拗音"], sortOrder: 131 },
  { id: "cha", group: "拗音", hiragana: "ちゃ", katakana: "チャ", romaji: "cha", example: { word: "お茶", kana: "おちゃ", romaji: "ocha", meaning: "茶" }, level: "基础", tags: ["拗音"], sortOrder: 132 },
  { id: "chu", group: "拗音", hiragana: "ちゅ", katakana: "チュ", romaji: "chu", example: { word: "中国", kana: "ちゅうごく", romaji: "chuugoku", meaning: "中国" }, level: "基础", tags: ["拗音"], sortOrder: 133 },
  { id: "cho", group: "拗音", hiragana: "ちょ", katakana: "チョ", romaji: "cho", example: { word: "ちょっと", kana: "ちょっと", romaji: "chotto", meaning: "稍微" }, level: "基础", tags: ["拗音", "促音"], sortOrder: 134 },
  { id: "nya", group: "拗音", hiragana: "にゃ", katakana: "ニャ", romaji: "nya", example: { word: "こんにゃく", kana: "こんにゃく", romaji: "konnyaku", meaning: "魔芋" }, level: "进阶入门", tags: ["拗音"], sortOrder: 135 },
  { id: "nyu", group: "拗音", hiragana: "にゅ", katakana: "ニュ", romaji: "nyu", example: { word: "入学", kana: "にゅうがく", romaji: "nyuugaku", meaning: "入学" }, level: "基础", tags: ["拗音"], sortOrder: 136 },
  { id: "nyo", group: "拗音", hiragana: "にょ", katakana: "ニョ", romaji: "nyo", example: { word: "女房", kana: "にょうぼう", romaji: "nyoubou", meaning: "妻子" }, level: "进阶入门", tags: ["拗音"], sortOrder: 137 },
  { id: "hya", group: "拗音", hiragana: "ひゃ", katakana: "ヒャ", romaji: "hya", example: { word: "百", kana: "ひゃく", romaji: "hyaku", meaning: "一百" }, level: "基础", tags: ["拗音"], sortOrder: 138 },
  { id: "hyu", group: "拗音", hiragana: "ひゅ", katakana: "ヒュ", romaji: "hyu", example: { word: "ヒュー", kana: "ひゅー", romaji: "hyuu", meaning: "风声" }, level: "进阶入门", tags: ["拗音", "长音"], sortOrder: 139 },
  { id: "hyo", group: "拗音", hiragana: "ひょ", katakana: "ヒョ", romaji: "hyo", example: { word: "表", kana: "ひょう", romaji: "hyou", meaning: "表格" }, level: "基础", tags: ["拗音"], sortOrder: 140 },
  { id: "mya", group: "拗音", hiragana: "みゃ", katakana: "ミャ", romaji: "mya", example: { word: "名字", kana: "みょうじ", romaji: "myouji", meaning: "姓氏" }, level: "进阶入门", tags: ["拗音"], sortOrder: 141 },
  { id: "myu", group: "拗音", hiragana: "みゅ", katakana: "ミュ", romaji: "myu", example: { word: "ミュージック", kana: "みゅーじっく", romaji: "myuujikku", meaning: "音乐" }, level: "进阶入门", tags: ["拗音", "长音"], sortOrder: 142 },
  { id: "myo", group: "拗音", hiragana: "みょ", katakana: "ミョ", romaji: "myo", example: { word: "妙", kana: "みょう", romaji: "myou", meaning: "奇妙" }, level: "进阶入门", tags: ["拗音"], sortOrder: 143 },
  { id: "rya", group: "拗音", hiragana: "りゃ", katakana: "リャ", romaji: "rya", example: { word: "略す", kana: "りゃくす", romaji: "ryakusu", meaning: "省略" }, level: "进阶入门", tags: ["拗音"], sortOrder: 144 },
  { id: "ryu", group: "拗音", hiragana: "りゅ", katakana: "リュ", romaji: "ryu", example: { word: "留学生", kana: "りゅうがくせい", romaji: "ryuugakusei", meaning: "留学生" }, level: "基础", tags: ["拗音"], sortOrder: 145 },
  { id: "ryo", group: "拗音", hiragana: "りょ", katakana: "リョ", romaji: "ryo", example: { word: "料理", kana: "りょうり", romaji: "ryouri", meaning: "料理" }, level: "基础", tags: ["拗音"], sortOrder: 146 },
  { id: "gya", group: "拗音", hiragana: "ぎゃ", katakana: "ギャ", romaji: "gya", example: { word: "逆", kana: "ぎゃく", romaji: "gyaku", meaning: "相反" }, level: "进阶入门", tags: ["拗音", "浊音"], sortOrder: 147 },
  { id: "gyu", group: "拗音", hiragana: "ぎゅ", katakana: "ギュ", romaji: "gyu", example: { word: "牛乳", kana: "ぎゅうにゅう", romaji: "gyuunyuu", meaning: "牛奶" }, level: "基础", tags: ["拗音", "浊音"], sortOrder: 148 },
  { id: "gyo", group: "拗音", hiragana: "ぎょ", katakana: "ギョ", romaji: "gyo", example: { word: "行", kana: "ぎょう", romaji: "gyou", meaning: "行 / 行业" }, level: "进阶入门", tags: ["拗音", "浊音"], sortOrder: 149 },
  { id: "ja", group: "拗音", hiragana: "じゃ", katakana: "ジャ", romaji: "ja", example: { word: "じゃあ", kana: "じゃあ", romaji: "jaa", meaning: "那么" }, level: "基础", tags: ["拗音", "浊音"], sortOrder: 150 },
  { id: "ju", group: "拗音", hiragana: "じゅ", katakana: "ジュ", romaji: "ju", example: { word: "授業", kana: "じゅぎょう", romaji: "jugyou", meaning: "课" }, level: "基础", tags: ["拗音", "浊音"], sortOrder: 151 },
  { id: "jo", group: "拗音", hiragana: "じょ", katakana: "ジョ", romaji: "jo", example: { word: "上手", kana: "じょうず", romaji: "jouzu", meaning: "擅长" }, level: "基础", tags: ["拗音", "浊音"], sortOrder: 152 },
  { id: "bya", group: "拗音", hiragana: "びゃ", katakana: "ビャ", romaji: "bya", example: { word: "三百", kana: "さんびゃく", romaji: "sanbyaku", meaning: "三百" }, level: "基础", tags: ["拗音", "浊音"], sortOrder: 153 },
  { id: "byu", group: "拗音", hiragana: "びゅ", katakana: "ビュ", romaji: "byu", example: { word: "レビュー", kana: "れびゅー", romaji: "rebyuu", meaning: "评价" }, level: "进阶入门", tags: ["拗音", "浊音"], sortOrder: 154 },
  { id: "byo", group: "拗音", hiragana: "びょ", katakana: "ビョ", romaji: "byo", example: { word: "病院", kana: "びょういん", romaji: "byouin", meaning: "医院" }, level: "基础", tags: ["拗音", "浊音"], sortOrder: 155 },
  { id: "pya", group: "拗音", hiragana: "ぴゃ", katakana: "ピャ", romaji: "pya", example: { word: "六百", kana: "ろっぴゃく", romaji: "roppyaku", meaning: "六百" }, level: "基础", tags: ["拗音", "半浊音"], sortOrder: 156 },
  { id: "pyu", group: "拗音", hiragana: "ぴゅ", katakana: "ピュ", romaji: "pyu", example: { word: "ピュア", kana: "ぴゅあ", romaji: "pyua", meaning: "纯粹" }, level: "进阶入门", tags: ["拗音", "半浊音"], sortOrder: 157 },
  { id: "pyo", group: "拗音", hiragana: "ぴょ", katakana: "ピョ", romaji: "pyo", example: { word: "発表", kana: "はっぴょう", romaji: "happyou", meaning: "发表" }, level: "基础", tags: ["拗音", "半浊音"], sortOrder: 158 },
  { id: "sokuon", group: "促音・長音", hiragana: "っ", katakana: "ッ", romaji: "small tsu", example: { word: "切符", kana: "きっぷ", romaji: "kippu", meaning: "车票" }, level: "基础", tags: ["促音"], sortOrder: 159, audioText: "きっぷ" },
  { id: "chouon", group: "促音・長音", hiragana: "ー", katakana: "ー", romaji: "long vowel", example: { word: "コーヒー", kana: "こーひー", romaji: "koohii", meaning: "咖啡" }, level: "基础", tags: ["长音"], sortOrder: 160, audioText: "コーヒー" },
];

export const kanaItems: KanaItem[] = [...basicKanaItems, ...kanaExtensionItems];

export interface GrammarExample {
  japanese: string;
  kana: string;
  romaji: string;
  translation: string;
}

export interface GrammarQuiz {
  prompt: string;
  answer: string;
  choices: string[];
  explanation: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  pattern: string;
  patternKana: string;
  patternRomaji: string;
  explanation: string;
  examples: GrammarExample[];
  commonMistakes: string[];
  quiz: GrammarQuiz;
}

export const grammarLessons: GrammarLesson[] = [
  {
    id: "a-wa-b-desu",
    title: "A は B です",
    pattern: "A は B です。",
    patternKana: "A は B です。",
    patternRomaji: "A wa B desu",
    explanation:
      "这是日语最基础的判断句。A 是话题，B 是对 A 的说明。助词「は」写作 ha，但在这里读作 wa，相当于中文里“关于 A，B 是……”。",
    examples: [
      { japanese: "私は学生です。", kana: "わたしはがくせいです。", romaji: "watashi wa gakusei desu", translation: "我是学生。" },
      { japanese: "これは本です。", kana: "これはほんです。", romaji: "kore wa hon desu", translation: "这是书。" },
      { japanese: "田中さんは先生です。", kana: "たなかさんはせんせいです。", romaji: "tanaka san wa sensei desu", translation: "田中是老师。" },
    ],
    commonMistakes: [
      "不要把「は」读成 ha；作话题助词时读 wa。",
      "日语通常不需要像中文一样加“是”的独立动词，句尾「です」承担礼貌判断功能。",
      "「さん」不是“先生/女士”的直译称谓，而是礼貌后缀，通常不要加在自己名字后。",
    ],
    quiz: {
      prompt: "私は学生__。",
      answer: "です",
      choices: ["です", "を", "に", "の"],
      explanation: "判断句“我是学生”用「A は B です」。",
    },
  },
  {
    id: "a-wa-b-dewa-arimasen",
    title: "A は B ではありません",
    pattern: "A は B ではありません。",
    patternKana: "A は B ではありません。",
    patternRomaji: "A wa B dewa arimasen",
    explanation:
      "这是「A は B です」的礼貌否定形式，意思是“A 不是 B”。口语中也常听到较轻松的「じゃありません」。",
    examples: [
      { japanese: "私は先生ではありません。", kana: "わたしはせんせいではありません。", romaji: "watashi wa sensei dewa arimasen", translation: "我不是老师。" },
      { japanese: "これは雑誌ではありません。", kana: "これはざっしではありません。", romaji: "kore wa zasshi dewa arimasen", translation: "这不是杂志。" },
      { japanese: "ここは駅ではありません。", kana: "ここはえきではありません。", romaji: "koko wa eki dewa arimasen", translation: "这里不是车站。" },
    ],
    commonMistakes: [
      "不要直接套中文“不是”而省略「ではありません」。",
      "「じゃありません」偏口语，正式学习初期先掌握「ではありません」。",
      "否定句的「は」仍然读 wa。",
    ],
    quiz: {
      prompt: "これはノート__ありません。",
      answer: "では",
      choices: ["では", "を", "に", "へ"],
      explanation: "礼貌否定句型是「A は B ではありません」。",
    },
  },
  {
    id: "kore-sore-are",
    title: "これ / それ / あれ",
    pattern: "これ / それ / あれ + は + 名词 + です。",
    patternKana: "これ / それ / あれ + は + めいし + です。",
    patternRomaji: "kore / sore / are wa meishi desu",
    explanation:
      "「これ」指离说话人近的东西，「それ」指离听话人近或刚提到的东西，「あれ」指离双方都远的东西。它们只能指物，不能直接指人。",
    examples: [
      { japanese: "これは辞書です。", kana: "これはじしょです。", romaji: "kore wa jisho desu", translation: "这是字典。" },
      { japanese: "それは何ですか。", kana: "それはなんですか。", romaji: "sore wa nan desu ka", translation: "那是什么？" },
      { japanese: "あれは図書館です。", kana: "あれはとしょかんです。", romaji: "are wa toshokan desu", translation: "那边那个是图书馆。" },
    ],
    commonMistakes: [
      "不要用「これ」指人；介绍人时用「こちら」更自然。",
      "中文一个“这/那”可以覆盖很多距离，日语要按双方距离区分。",
      "「これ本です」少了助词「は」，初学时建议完整说出。",
    ],
    quiz: {
      prompt: "离说话人近的东西，用__。",
      answer: "これ",
      choices: ["これ", "それ", "あれ", "どれ"],
      explanation: "「これ」表示靠近说话人的“这个”。",
    },
  },
  {
    id: "no-possession",
    title: "の possession",
    pattern: "A の B",
    patternKana: "A の B",
    patternRomaji: "A no B",
    explanation:
      "「の」连接两个名词，常表示所属、属性或说明关系，类似中文的“的”。但不是所有中文“的”都能机械翻成「の」。",
    examples: [
      { japanese: "これは私の本です。", kana: "これはわたしのほんです。", romaji: "kore wa watashi no hon desu", translation: "这是我的书。" },
      { japanese: "日本語の先生です。", kana: "にほんごのせんせいです。", romaji: "nihongo no sensei desu", translation: "是日语老师。" },
      { japanese: "東京の大学に行きます。", kana: "とうきょうのだいがくにいきます。", romaji: "toukyou no daigaku ni ikimasu", translation: "去东京的大学。" },
    ],
    commonMistakes: [
      "中文里形容词加“的”，日语い形容词通常不加「の」，例如「新しい本」。",
      "「我的朋友」是「私の友だち」，不要漏掉「の」。",
      "「日本的料理」更自然常说「日本料理」，有些固定词不需要「の」。",
    ],
    quiz: {
      prompt: "私__本です。",
      answer: "の",
      choices: ["の", "は", "を", "へ"],
      explanation: "表示“我的书”用「私の本」。",
    },
  },
  {
    id: "wo-object-marker",
    title: "を object marker",
    pattern: "名词 を 动词ます。",
    patternKana: "めいし を どうし ます。",
    patternRomaji: "meishi o doushi masu",
    explanation:
      "助词「を」标记动作的直接对象，通常读作 o。中文常靠语序判断宾语，日语则用「を」明确标出来。",
    examples: [
      { japanese: "水を飲みます。", kana: "みずをのみます。", romaji: "mizu o nomimasu", translation: "喝水。" },
      { japanese: "本を読みます。", kana: "ほんをよみます。", romaji: "hon o yomimasu", translation: "读书。" },
      { japanese: "日本語を勉強します。", kana: "にほんごをべんきょうします。", romaji: "nihongo o benkyou shimasu", translation: "学习日语。" },
    ],
    commonMistakes: [
      "「を」作为助词时读 o，不读 wo。",
      "不要说「水飲みます」；初学时把宾语助词说清楚更稳。",
      "喜欢、懂、会等表达不一定用「を」，例如「日本語が好きです」。",
    ],
    quiz: {
      prompt: "本__読みます。",
      answer: "を",
      choices: ["を", "は", "に", "です"],
      explanation: "「本」是「読む」的宾语，所以用「を」。",
    },
  },
  {
    id: "ni-e-direction",
    title: "に / へ direction",
    pattern: "地点 に / へ 行きます。",
    patternKana: "ばしょ に / へ いきます。",
    patternRomaji: "basho ni / e ikimasu",
    explanation:
      "「に」强调到达点或存在位置，「へ」强调移动方向。表示“去某地”时两者都常见，但语感略有不同，「へ」作助词时读 e。",
    examples: [
      { japanese: "学校に行きます。", kana: "がっこうにいきます。", romaji: "gakkou ni ikimasu", translation: "去学校。" },
      { japanese: "日本へ行きます。", kana: "にほんへいきます。", romaji: "nihon e ikimasu", translation: "去日本。" },
      { japanese: "駅にいます。", kana: "えきにいます。", romaji: "eki ni imasu", translation: "在车站。" },
    ],
    commonMistakes: [
      "「へ」作方向助词读 e，不读 he。",
      "表示存在位置时用「に」，例如「駅にいます」，不要用「へ」。",
      "中文“去到”常不区分方向和到达点，日语要看动词和语境。",
    ],
    quiz: {
      prompt: "日本__行きます。",
      answer: "へ",
      choices: ["へ", "を", "です", "の"],
      explanation: "表示移动方向“去日本”可用「日本へ行きます」。",
    },
  },
  {
    id: "masu-form",
    title: "ます form",
    pattern: "动词ます / 动词ません / 动词ました",
    patternKana: "どうし ます / どうし ません / どうし ました",
    patternRomaji: "doushi masu / doushi masen / doushi mashita",
    explanation:
      "「ます形」是初学者最常用的礼貌动词形式。现在/将来肯定用「ます」，否定用「ません」，过去肯定用「ました」。",
    examples: [
      { japanese: "毎日、日本語を勉強します。", kana: "まいにち、にほんごをべんきょうします。", romaji: "mainichi nihongo o benkyou shimasu", translation: "每天学习日语。" },
      { japanese: "今日は肉を食べません。", kana: "きょうはにくをたべません。", romaji: "kyou wa niku o tabemasen", translation: "今天不吃肉。" },
      { japanese: "昨日、映画を見ました。", kana: "きのう、えいがをみました。", romaji: "kinou eiga o mimashita", translation: "昨天看了电影。" },
    ],
    commonMistakes: [
      "「ます」既可以表示现在，也可以表示将来，要靠时间词和语境判断。",
      "不要把所有动词原形直接加「ます」；动词需要变成ます形。",
      "过去否定是「ませんでした」，不是「ましたない」。",
    ],
    quiz: {
      prompt: "昨日、映画を見__。",
      answer: "ました",
      choices: ["ました", "ます", "ません", "です"],
      explanation: "「昨日」表示过去，看了电影用「見ました」。",
    },
  },
  {
    id: "basic-adjectives",
    title: "basic adjectives",
    pattern: "い形容词 + です / な形容词 + です",
    patternKana: "いけいようし + です / なけいようし + です",
    patternRomaji: "i keiyoushi desu / na keiyoushi desu",
    explanation:
      "日语形容词分为「い形容词」和「な形容词」。い形容词直接接名词或接「です」作礼貌句；な形容词修饰名词时要加「な」。",
    examples: [
      { japanese: "この本は新しいです。", kana: "このほんはあたらしいです。", romaji: "kono hon wa atarashii desu", translation: "这本书是新的。" },
      { japanese: "静かな教室です。", kana: "しずかなきょうしつです。", romaji: "shizuka na kyoushitsu desu", translation: "是安静的教室。" },
      { japanese: "この料理はおいしいです。", kana: "このりょうりはおいしいです。", romaji: "kono ryouri wa oishii desu", translation: "这道菜很好吃。" },
    ],
    commonMistakes: [
      "い形容词修饰名词时不加「の」，说「新しい本」，不是「新しいの本」。",
      "な形容词修饰名词要加「な」，例如「静かな部屋」。",
      "「きれい」虽然以い结尾，但它是な形容词。",
    ],
    quiz: {
      prompt: "__本を買いました。",
      answer: "新しい",
      choices: ["新しい", "新しいな", "新しいの", "新しいを"],
      explanation: "い形容词直接修饰名词：新しい本。",
    },
  },
];

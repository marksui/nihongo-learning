export interface GrammarExample {
  japanese: string;
  kana: string;
  romaji: string;
  translation: string;
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
  level?: "入门" | "基础" | "进阶入门";
  tags?: string[];
  sortOrder?: number;
  audioText?: string;
}

const coreGrammarLessons: GrammarLesson[] = [
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
  },
];

const makeLesson = (
  id: string,
  title: string,
  pattern: string,
  patternKana: string,
  patternRomaji: string,
  explanation: string,
  examples: GrammarExample[],
  commonMistakes: string[],
  tags: string[],
): GrammarLesson => ({
  id,
  title,
  pattern,
  patternKana,
  patternRomaji,
  explanation,
  examples,
  commonMistakes,
  level: "基础",
  tags,
});

const expandedGrammarLessons: GrammarLesson[] = [
  makeLesson(
    "question-ka",
    "疑问句 か",
    "句子 + か。",
    "ぶん + か。",
    "bun ka",
    "「か」放在句尾表示疑问。礼貌句里通常不需要再加问号，说话时语调自然上扬即可。",
    [
      { japanese: "これは日本語の本ですか。", kana: "これはにほんごのほんですか。", romaji: "kore wa nihongo no hon desu ka", translation: "这是日语书吗？" },
      { japanese: "田中さんは学生ですか。", kana: "たなかさんはがくせいですか。", romaji: "tanaka san wa gakusei desu ka", translation: "田中是学生吗？" },
      { japanese: "明日、学校へ行きますか。", kana: "あした、がっこうへいきますか。", romaji: "ashita gakkou e ikimasu ka", translation: "明天去学校吗？" },
    ],
    ["不要把中文疑问语气直接套到日语里，句尾「か」很关键。", "礼貌句中「ですか」「ますか」最稳，不要只说名词加「か」。", "回答时常用「はい / いいえ」，但自然对话也会直接说内容。"],
    ["疑问句", "句尾"],
  ),
  makeLesson(
    "arimasu-imasu",
    "あります / います",
    "地点 に 名词 が あります / います。",
    "ばしょ に めいし が あります / います。",
    "basho ni meishi ga arimasu / imasu",
    "「あります」用于物品、植物、事情等；「います」用于人和动物。地点放在「に」前，存在对象常用「が」。",
    [
      { japanese: "机の上に本があります。", kana: "つくえのうえにほんがあります。", romaji: "tsukue no ue ni hon ga arimasu", translation: "桌子上有书。" },
      { japanese: "教室に学生がいます。", kana: "きょうしつにがくせいがいます。", romaji: "kyoushitsu ni gakusei ga imasu", translation: "教室里有学生。" },
      { japanese: "公園に犬がいます。", kana: "こうえんにいぬがいます。", romaji: "kouen ni inu ga imasu", translation: "公园里有狗。" },
    ],
    ["不要所有“有”都用一个词；人和动物用「います」。", "地点助词用「に」，不要说成「であります」。", "中文常说“桌上有书”，日语要把助词说清楚。"],
    ["存在句", "助词"],
  ),
  makeLesson(
    "ga-suki",
    "が 好きです",
    "名词 が 好きです。",
    "めいし が すきです。",
    "meishi ga suki desu",
    "表达喜欢时，日语常用「が好きです」。这里的「好き」是な形容词，不是动词。",
    [
      { japanese: "私は日本語が好きです。", kana: "わたしはにほんごがすきです。", romaji: "watashi wa nihongo ga suki desu", translation: "我喜欢日语。" },
      { japanese: "母は花が好きです。", kana: "ははははながすきです。", romaji: "haha wa hana ga suki desu", translation: "我妈妈喜欢花。" },
      { japanese: "田中さんはコーヒーが好きです。", kana: "たなかさんはこーひーがすきです。", romaji: "tanaka san wa koohii ga suki desu", translation: "田中喜欢咖啡。" },
    ],
    ["不要把「好き」当动词使用；礼貌句说「好きです」。", "喜欢的对象通常用「が」，不是「を」。", "如果主语很清楚，可以省略「私は」。"],
    ["形容词", "喜好"],
  ),
  makeLesson(
    "to-ya-listing",
    "と / や 列举",
    "A と B / A や B",
    "A と B / A や B",
    "A to B / A ya B",
    "「と」表示完整列举，相当于“A 和 B”；「や」表示举例列举，相当于“A、B 等”。",
    [
      { japanese: "パンと牛乳を買います。", kana: "ぱんとぎゅうにゅうをかいます。", romaji: "pan to gyuunyuu o kaimasu", translation: "买面包和牛奶。" },
      { japanese: "京都や大阪へ行きます。", kana: "きょうとやおおさかへいきます。", romaji: "kyouto ya oosaka e ikimasu", translation: "去京都、大阪等地。" },
      { japanese: "父と母は中国にいます。", kana: "ちちとはははちゅうごくにいます。", romaji: "chichi to haha wa chuugoku ni imasu", translation: "父亲和母亲在中国。" },
    ],
    ["「と」更像列完了，「や」暗示还有其他。", "不要用中文顿号的习惯省略助词。", "和人一起做事也常用「と」，例如「友だちと行きます」。"],
    ["列举", "助词"],
  ),
  makeLesson(
    "de-place-tool",
    "で 地点 / 工具",
    "地点 で 动作 / 工具 で 动作",
    "ばしょ で どうさ / どうぐ で どうさ",
    "basho de dousa / dougu de dousa",
    "「で」可以表示动作发生的地点，也可以表示使用的工具或方式。它和表示存在的「に」要分开。",
    [
      { japanese: "図書館で勉強します。", kana: "としょかんでべんきょうします。", romaji: "toshokan de benkyou shimasu", translation: "在图书馆学习。" },
      { japanese: "箸でご飯を食べます。", kana: "はしでごはんをたべます。", romaji: "hashi de gohan o tabemasu", translation: "用筷子吃饭。" },
      { japanese: "電車で会社へ行きます。", kana: "でんしゃでかいしゃへいきます。", romaji: "densha de kaisha e ikimasu", translation: "坐电车去公司。" },
    ],
    ["动作地点用「で」，存在地点用「に」。", "交通方式也常用「で」，例如「バスで」。", "不要把所有中文“在”都翻成同一个助词。"],
    ["助词", "地点", "工具"],
  ),
  makeLesson(
    "kara-made",
    "から / まで",
    "A から B まで",
    "A から B まで",
    "A kara B made",
    "「から」表示起点，「まで」表示终点。可以用于时间、地点和范围。",
    [
      { japanese: "授業は十時からです。", kana: "じゅぎょうはじゅうじからです。", romaji: "jugyou wa juuji kara desu", translation: "课从十点开始。" },
      { japanese: "駅から学校まで歩きます。", kana: "えきからがっこうまであるきます。", romaji: "eki kara gakkou made arukimasu", translation: "从车站走到学校。" },
      { japanese: "月曜日から金曜日まで働きます。", kana: "げつようびからきんようびまではたらきます。", romaji: "getsuyoubi kara kinyoubi made hatarakimasu", translation: "从星期一工作到星期五。" },
    ],
    ["「から」和「まで」可以单独出现，不一定成对。", "中文“到”有时是方向，有时是终点，日语要看语境。", "时间范围里不要漏掉助词。"],
    ["时间", "范围"],
  ),
  makeLesson(
    "mou-mada",
    "もう / まだ",
    "もう + 完成 / まだ + 未完成",
    "もう + かんりょう / まだ + みかんりょう",
    "mou / mada",
    "「もう」表示已经，「まだ」表示还没有或仍然。它们常和过去、否定一起出现。",
    [
      { japanese: "もう昼ご飯を食べました。", kana: "もうひるごはんをたべました。", romaji: "mou hirugohan o tabemashita", translation: "已经吃午饭了。" },
      { japanese: "宿題はまだ終わっていません。", kana: "しゅくだいはまだおわっていません。", romaji: "shukudai wa mada owatte imasen", translation: "作业还没做完。" },
      { japanese: "まだ時間があります。", kana: "まだじかんがあります。", romaji: "mada jikan ga arimasu", translation: "还有时间。" },
    ],
    ["「まだ」不只表示“还没”，也可表示“还有”。", "已经做完常配过去表达。", "不要把「もう」放到句尾；通常放在句子前部。"],
    ["副词", "时间"],
  ),
  makeLesson(
    "kudasai-request",
    "ください 请求",
    "名词 を ください / て形 + ください",
    "めいし を ください / てけい + ください",
    "meishi o kudasai / tekei kudasai",
    "「ください」可以用来请求物品，也可以接在动词て形后，请别人做某事。",
    [
      { japanese: "水をください。", kana: "みずをください。", romaji: "mizu o kudasai", translation: "请给我水。" },
      { japanese: "ここに名前を書いてください。", kana: "ここになまえをかいてください。", romaji: "koko ni namae o kaite kudasai", translation: "请在这里写名字。" },
      { japanese: "もう一度言ってください。", kana: "もういちどいってください。", romaji: "mou ichido itte kudasai", translation: "请再说一遍。" },
    ],
    ["要物品时用「名词をください」。", "请别人做动作时要用动词て形。", "「ください」有礼貌，但对长辈或正式场合还可更客气。"],
    ["请求", "て形"],
  ),
  makeLesson(
    "tai-form",
    "たい form",
    "动词ます形去ます + たいです",
    "どうし ますけい ますをとる + たいです",
    "masu stem tai desu",
    "「たい」表示自己想做某事。它接在动词ます形去掉「ます」后的词干后面。",
    [
      { japanese: "日本へ行きたいです。", kana: "にほんへいきたいです。", romaji: "nihon e ikitai desu", translation: "我想去日本。" },
      { japanese: "ラーメンを食べたいです。", kana: "らーめんをたべたいです。", romaji: "raamen o tabetai desu", translation: "我想吃拉面。" },
      { japanese: "温泉に入りたいです。", kana: "おんせんにはいりたいです。", romaji: "onsen ni hairitai desu", translation: "我想泡温泉。" },
    ],
    ["「たい」通常表达自己的愿望，直接说别人的愿望要小心。", "不是动词原形直接加「たい」。", "对象可用「を」或「が」，初学先掌握常见搭配。"],
    ["愿望", "动词"],
  ),
  makeLesson(
    "te-form-basic",
    "て form 基础",
    "动词て形 + ください / います",
    "どうし てけい + ください / います",
    "tekei kudasai / imasu",
    "て形是连接动作的重要形式。入门阶段先掌握两个常用功能：请求和正在做。",
    [
      { japanese: "少し待ってください。", kana: "すこしまってください。", romaji: "sukoshi matte kudasai", translation: "请稍等。" },
      { japanese: "今、日本語を勉強しています。", kana: "いま、にほんごをべんきょうしています。", romaji: "ima nihongo o benkyou shite imasu", translation: "现在正在学习日语。" },
      { japanese: "写真を撮ってもいいですか。", kana: "しゃしんをとってもいいですか。", romaji: "shashin o totte mo ii desu ka", translation: "可以拍照吗？" },
    ],
    ["て形变化不是简单加「て」，不同动词有不同变化。", "「しています」可表示正在做，也可表示持续状态。", "请求时不要漏掉「ください」。"],
    ["て形", "动词"],
  ),
  makeLesson(
    "nai-form-basic",
    "ない form 基础",
    "动词ない形 + です / でください",
    "どうし ないけい + です / でください",
    "nai form",
    "ない形表示普通否定，也能接「でください」表示请不要做某事。",
    [
      { japanese: "今日は肉を食べないです。", kana: "きょうはにくをたべないです。", romaji: "kyou wa niku o tabenai desu", translation: "今天不吃肉。" },
      { japanese: "ここで写真を撮らないでください。", kana: "ここでしゃしんをとらないでください。", romaji: "koko de shashin o toranaide kudasai", translation: "请不要在这里拍照。" },
      { japanese: "明日は学校へ行かないです。", kana: "あしたはがっこうへいかないです。", romaji: "ashita wa gakkou e ikanai desu", translation: "明天不去学校。" },
    ],
    ["不要把「ません」和「ない」混在同一个动词后。", "请不要做某事用「ないでください」。", "五段动词ない形变化需要单独记。"],
    ["否定", "动词"],
  ),
  makeLesson(
    "past-tense",
    "过去表达",
    "名词 / 形容词 / 动词 的过去",
    "めいし / けいようし / どうし のかこ",
    "past forms",
    "日语过去表达会因词类不同而变化。先掌握「でした」「ました」「かったです」。",
    [
      { japanese: "昨日は休みでした。", kana: "きのうはやすみでした。", romaji: "kinou wa yasumi deshita", translation: "昨天是休息日。" },
      { japanese: "昨日、映画を見ました。", kana: "きのう、えいがをみました。", romaji: "kinou eiga o mimashita", translation: "昨天看了电影。" },
      { japanese: "この店は安かったです。", kana: "このみせはやすかったです。", romaji: "kono mise wa yasukatta desu", translation: "这家店以前很便宜。" },
    ],
    ["名词过去是「でした」，动词过去是「ました」。", "い形容词过去把「い」变成「かった」。", "不要把所有过去都用同一个形式。"],
    ["过去", "时态"],
  ),
  makeLesson(
    "adjective-negative-past",
    "形容词否定和过去",
    "い形容词：くない / かった",
    "いけいようし：くない / かった",
    "i adjective kunai / katta",
    "い形容词否定把词尾「い」变成「くない」，过去把「い」变成「かった」。礼貌句可加「です」。",
    [
      { japanese: "この料理は辛くないです。", kana: "このりょうりはからくないです。", romaji: "kono ryouri wa karakunai desu", translation: "这道菜不辣。" },
      { japanese: "昨日は寒かったです。", kana: "きのうはさむかったです。", romaji: "kinou wa samukatta desu", translation: "昨天很冷。" },
      { japanese: "部屋は広くなかったです。", kana: "へやはひろくなかったです。", romaji: "heya wa hirokunakatta desu", translation: "房间不宽敞。" },
    ],
    ["い形容词否定不是直接加「ではありません」。", "过去否定是「くなかったです」。", "「いい」变化特殊：よくない、よかった。"],
    ["形容词", "否定"],
  ),
  makeLesson(
    "counters-basic",
    "数量词基础",
    "数量 + 助数词",
    "すうりょう + じょすうし",
    "counter words",
    "日语数东西常需要助数词。入门先掌握人、个、枚、本、杯这几类常见说法。",
    [
      { japanese: "学生が三人います。", kana: "がくせいがさんにんいます。", romaji: "gakusei ga sannin imasu", translation: "有三名学生。" },
      { japanese: "りんごを一つください。", kana: "りんごをひとつください。", romaji: "ringo o hitotsu kudasai", translation: "请给我一个苹果。" },
      { japanese: "水を一杯飲みます。", kana: "みずをいっぱいのみます。", romaji: "mizu o ippai nomimasu", translation: "喝一杯水。" },
    ],
    ["不要只说数字，很多场景需要助数词。", "一人、二人有特殊读法。", "不同物品用不同助数词，先记常用场景即可。"],
    ["数量", "数字"],
  ),
  makeLesson(
    "comparison-yori-hou",
    "より / ほうが",
    "A より B のほうが + 形容词",
    "A より B のほうが + けいようし",
    "A yori B no hou ga",
    "比较时，「より」表示被比较对象，「ほうが」强调更符合形容词的一方。",
    [
      { japanese: "昨日より今日のほうが暑いです。", kana: "きのうよりきょうのほうがあついです。", romaji: "kinou yori kyou no hou ga atsui desu", translation: "今天比昨天热。" },
      { japanese: "バスより電車のほうが速いです。", kana: "ばすよりでんしゃのほうがはやいです。", romaji: "basu yori densha no hou ga hayai desu", translation: "电车比公交快。" },
      { japanese: "この店のほうが安いです。", kana: "このみせのほうがやすいです。", romaji: "kono mise no hou ga yasui desu", translation: "这家店更便宜。" },
    ],
    ["日语比较语序和中文不完全一样。", "「より」后面不是更强的一方。", "口语里可省略一部分，但入门先用完整句型。"],
    ["比较", "形容词"],
  ),
  makeLesson(
    "because-kara",
    "から 原因",
    "理由 から、结果。",
    "りゆう から、けっか。",
    "riyuu kara kekka",
    "句尾或分句后的「から」可以表示原因，相当于“因为……所以……”。",
    [
      { japanese: "雨ですから、傘を持って行きます。", kana: "あめですから、かさをもっていきます。", romaji: "ame desu kara kasa o motte ikimasu", translation: "因为下雨，所以带伞去。" },
      { japanese: "明日は休みですから、映画を見ます。", kana: "あしたはやすみですから、えいがをみます。", romaji: "ashita wa yasumi desu kara eiga o mimasu", translation: "因为明天休息，所以看电影。" },
      { japanese: "忙しいですから、今日は行きません。", kana: "いそがしいですから、きょうはいきません。", romaji: "isogashii desu kara kyou wa ikimasen", translation: "因为忙，所以今天不去。" },
    ],
    ["「から」既可表示起点，也可表示原因，要看位置和语境。", "礼貌句中常用「ですから」「ますから」。", "不要只照中文顺序直译，日语要保留连接词。"],
    ["原因", "连接"],
  ),
  makeLesson(
    "dekimasu-potential",
    "できます 可能表达",
    "名词 が できます / 动词ことができます",
    "めいし が できます / どうしこと が できます",
    "meishi ga dekimasu / doushi koto ga dekimasu",
    "「できます」表示会做、能做或某事可以实现。名词能力常用「ができます」，动作能力常用「动词辞书形 + ことができます」。",
    [
      { japanese: "私は日本語が少しできます。", kana: "わたしはにほんごがすこしできます。", romaji: "watashi wa nihongo ga sukoshi dekimasu", translation: "我会一点日语。" },
      { japanese: "ここでカードを使うことができます。", kana: "ここでかーどをつかうことができます。", romaji: "koko de kaado o tsukau koto ga dekimasu", translation: "这里可以使用银行卡。" },
      { japanese: "漢字を読むことができません。", kana: "かんじをよむことができません。", romaji: "kanji o yomu koto ga dekimasen", translation: "不会读汉字。" },
    ],
    ["表示会某种语言时常说「日本語ができます」，不是「日本語をできます」。", "动作能力要把动词变成辞书形再接「ことができます」。", "否定是「できません」，不要说「できますない」。"],
    ["可能", "动词", "能力"],
  ),
  makeLesson(
    "te-mo-ii",
    "てもいいです 许可",
    "动词て形 + もいいです。",
    "どうし てけい + もいいです。",
    "te form mo ii desu",
    "「てもいいです」表示“可以做某事”。询问许可时常说「てもいいですか」，回答可以用「はい、いいです」或更自然的「はい、どうぞ」。",
    [
      { japanese: "ここで写真を撮ってもいいですか。", kana: "ここでしゃしんをとってもいいですか。", romaji: "koko de shashin o totte mo ii desu ka", translation: "可以在这里拍照吗？" },
      { japanese: "この席に座ってもいいです。", kana: "このせきにすわってもいいです。", romaji: "kono seki ni suwatte mo ii desu", translation: "可以坐这个座位。" },
      { japanese: "水を飲んでもいいですか。", kana: "みずをのんでもいいですか。", romaji: "mizu o nonde mo ii desu ka", translation: "可以喝水吗？" },
    ],
    ["许可表达要用动词て形，不是动词ます形直接加「もいい」。", "「いいです」既可能表示“可以”，也可能表示“不用了”，要看语境。", "正式场合请求许可时，可用更客气的「よろしいですか」。"],
    ["许可", "て形", "请求"],
  ),
  makeLesson(
    "te-wa-ikemasen",
    "てはいけません 禁止",
    "动词て形 + はいけません。",
    "どうし てけい + はいけません。",
    "te form wa ikemasen",
    "「てはいけません」表示“不可以做某事”，常用于规则、禁止事项和提醒。口语中也会听到「ちゃだめです」。",
    [
      { japanese: "ここでタバコを吸ってはいけません。", kana: "ここでたばこをすってはいけません。", romaji: "koko de tabako o sutte wa ikemasen", translation: "不可以在这里吸烟。" },
      { japanese: "この部屋に入ってはいけません。", kana: "このへやにはいってはいけません。", romaji: "kono heya ni haitte wa ikemasen", translation: "不可以进入这个房间。" },
      { japanese: "試験中に携帯を使ってはいけません。", kana: "しけんちゅうにけいたいをつかってはいけません。", romaji: "shiken chuu ni keitai o tsukatte wa ikemasen", translation: "考试中不可以使用手机。" },
    ],
    ["不要把中文“不可以”直译成「できません」；规则禁止更常用「てはいけません」。", "「ては」在口语里常缩成「ちゃ」，但正式学习先掌握完整形式。", "禁止做某事和不会做某事不同，别混用「できません」。"],
    ["禁止", "规则", "て形"],
  ),
  makeLesson(
    "ta-koto-ga-arimasu",
    "たことがあります 经验",
    "动词た形 + ことがあります。",
    "どうし たけい + ことがあります。",
    "ta form koto ga arimasu",
    "「たことがあります」表示曾经有过某种经历。重点是“有没有经历过”，不是单纯说明昨天做了某事。",
    [
      { japanese: "日本へ行ったことがあります。", kana: "にほんへいったことがあります。", romaji: "nihon e itta koto ga arimasu", translation: "我去过日本。" },
      { japanese: "納豆を食べたことがありません。", kana: "なっとうをたべたことがありません。", romaji: "nattou o tabeta koto ga arimasen", translation: "我没吃过纳豆。" },
      { japanese: "この映画を見たことがありますか。", kana: "このえいがをみたことがありますか。", romaji: "kono eiga o mita koto ga arimasu ka", translation: "你看过这部电影吗？" },
    ],
    ["这里要用动词た形，不是ます形。", "昨天做过某事通常用普通过去，不一定用经验句型。", "否定经验是「たことがありません」，不是「たことがないです」也可以但风格更口语。"],
    ["经验", "た形"],
  ),
  makeLesson(
    "tsumori-desu",
    "つもりです 打算",
    "动词辞书形 / ない形 + つもりです。",
    "どうし じしょけい / ないけい + つもりです。",
    "dictionary form / nai form tsumori desu",
    "「つもりです」表示个人打算或计划，比「たいです」更像已经想好了要做什么。也可用否定形表示“不打算”。",
    [
      { japanese: "来年、日本へ行くつもりです。", kana: "らいねん、にほんへいくつもりです。", romaji: "rainen nihon e iku tsumori desu", translation: "我打算明年去日本。" },
      { japanese: "今日は外で食べないつもりです。", kana: "きょうはそとでたべないつもりです。", romaji: "kyou wa soto de tabenai tsumori desu", translation: "我今天不打算在外面吃。" },
      { japanese: "卒業後、東京で働くつもりです。", kana: "そつぎょうご、とうきょうではたらくつもりです。", romaji: "sotsugyou go toukyou de hataraku tsumori desu", translation: "毕业后打算在东京工作。" },
    ],
    ["「たい」是想做，「つもり」是打算做，语感不同。", "接续用辞书形或ない形，不接ます形。", "说别人的打算时要注意信息来源，可加「そうです」等表达。"],
    ["计划", "动词", "意志"],
  ),
  makeLesson(
    "deshou-probably",
    "でしょう 推量",
    "普通形 + でしょう。",
    "ふつうけい + でしょう。",
    "plain form deshou",
    "「でしょう」表示推测，相当于“大概……吧”。天气预报、说明和较礼貌的推量中常见。",
    [
      { japanese: "明日は雨でしょう。", kana: "あしたはあめでしょう。", romaji: "ashita wa ame deshou", translation: "明天大概会下雨吧。" },
      { japanese: "この電車は混んでいるでしょう。", kana: "このでんしゃはこんでいるでしょう。", romaji: "kono densha wa konde iru deshou", translation: "这班电车大概很挤吧。" },
      { japanese: "田中さんはもう帰ったでしょう。", kana: "たなかさんはもうかえったでしょう。", romaji: "tanaka san wa mou kaetta deshou", translation: "田中大概已经回去了吧。" },
    ],
    ["「でしょう」不是确认事实，而是推测。", "天气预报中常见「雨でしょう」「晴れるでしょう」。", "口语随意说法常变成「でしょ」。"],
    ["推量", "天气", "普通形"],
  ),
  makeLesson(
    "nakereba-narimasen",
    "なければなりません 必须",
    "动词ない形去い + ければなりません。",
    "どうし ないけい いをとる + ければなりません。",
    "nakereba narimasen",
    "「なければなりません」表示“必须做某事”。中文常说“不得不/必须”，日语用否定形式构成这个固定表达。",
    [
      { japanese: "明日までに書類を出さなければなりません。", kana: "あしたまでにしょるいをださなければなりません。", romaji: "ashita made ni shorui o dasanakereba narimasen", translation: "必须在明天之前提交文件。" },
      { japanese: "薬を飲まなければなりません。", kana: "くすりをのまなければなりません。", romaji: "kusuri o nomanakereba narimasen", translation: "必须吃药。" },
      { japanese: "駅で乗り換えなければなりません。", kana: "えきでのりかえなければなりません。", romaji: "eki de norikaenakereba narimasen", translation: "必须在车站换乘。" },
    ],
    ["形式上是否定，但意思是必须做，不要被结构迷惑。", "口语中常缩短为「なきゃいけません」。", "接续来自ない形，不是ます形。"],
    ["义务", "ない形", "手续"],
  ),
  makeLesson(
    "sugiru",
    "すぎる 过度",
    "动词ます形去ます / 形容词词干 + すぎます。",
    "どうし ますけい ますをとる / けいようし ごかん + すぎます。",
    "stem sugimasu",
    "「すぎる」表示“太…… / 过于……”。可接动词词干，也可接形容词词干。常用于提醒、评价和身体状态。",
    [
      { japanese: "食べすぎました。", kana: "たべすぎました。", romaji: "tabe sugimashita", translation: "吃太多了。" },
      { japanese: "このかばんは高すぎます。", kana: "このかばんはたかすぎます。", romaji: "kono kaban wa taka sugimasu", translation: "这个包太贵了。" },
      { japanese: "昨日、働きすぎました。", kana: "きのう、はたらきすぎました。", romaji: "kinou hataraki sugimashita", translation: "昨天工作过度了。" },
    ],
    ["い形容词接「すぎる」时去掉词尾い，例如「高すぎる」。", "动词接ます形词干，不是直接接原形。", "「すぎる」通常带有超出适当程度的感觉。"],
    ["程度", "形容词", "动词"],
  ),
  makeLesson(
    "te-mimasu",
    "てみます 尝试",
    "动词て形 + みます。",
    "どうし てけい + みます。",
    "te form mimasu",
    "「てみます」表示试着做某事。它不是“看”的意思，而是借用「見る」表达尝试。点餐、学习和询问时很常用。",
    [
      { japanese: "この料理を食べてみます。", kana: "このりょうりをたべてみます。", romaji: "kono ryouri o tabete mimasu", translation: "我试着吃这道菜。" },
      { japanese: "日本語で話してみます。", kana: "にほんごではなしてみます。", romaji: "nihongo de hanashite mimasu", translation: "我试着用日语说。" },
      { japanese: "もう一度やってみてください。", kana: "もういちどやってみてください。", romaji: "mou ichido yatte mite kudasai", translation: "请再试一次。" },
    ],
    ["这里的「みる」表示尝试，不是视觉上的看。", "前面必须用て形。", "请求别人试试看时可说「てみてください」。"],
    ["尝试", "て形", "会话"],
  ),
];

export const grammarLessons: GrammarLesson[] = [...coreGrammarLessons, ...expandedGrammarLessons].map((lesson, index) => ({
  sortOrder: lesson.sortOrder ?? index + 1,
  ...lesson,
}));

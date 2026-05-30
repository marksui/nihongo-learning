export interface DialogueLine {
  speaker: string;
  japanese: string;
  kana: string;
  translation: string;
}

export interface Dialogue {
  id: string;
  title: string;
  situation: string;
  lines: DialogueLine[];
}

export const dialogues: Dialogue[] = [
  {
    id: "self-introduction",
    title: "自我介绍",
    situation: "第一次见面时的简短介绍",
    lines: [
      { speaker: "李", japanese: "はじめまして。李です。", kana: "はじめまして。りです。", translation: "初次见面，我姓李。" },
      { speaker: "田中", japanese: "はじめまして。田中です。", kana: "はじめまして。たなかです。", translation: "初次见面，我是田中。" },
      { speaker: "李", japanese: "中国から来ました。", kana: "ちゅうごくからきました。", translation: "我来自中国。" },
      { speaker: "田中", japanese: "どうぞよろしくお願いします。", kana: "どうぞよろしくおねがいします。", translation: "请多关照。" },
      { speaker: "李", japanese: "こちらこそ、よろしくお願いします。", kana: "こちらこそ、よろしくおねがいします。", translation: "我才要请您多关照。" },
    ],
  },
  {
    id: "restaurant-order",
    title: "点餐",
    situation: "在餐厅点拉面和茶",
    lines: [
      { speaker: "店员", japanese: "いらっしゃいませ。何名様ですか。", kana: "いらっしゃいませ。なんめいさまですか。", translation: "欢迎光临。几位？" },
      { speaker: "客人", japanese: "二人です。", kana: "ふたりです。", translation: "两位。" },
      { speaker: "店员", japanese: "ご注文はお決まりですか。", kana: "ごちゅうもんはおきまりですか。", translation: "决定好点什么了吗？" },
      { speaker: "客人", japanese: "ラーメンを二つとお茶をお願いします。", kana: "らーめんをふたつとおちゃをおねがいします。", translation: "请给我们两碗拉面和茶。" },
      { speaker: "店员", japanese: "かしこまりました。", kana: "かしこまりました。", translation: "好的，明白了。" },
    ],
  },
  {
    id: "asking-directions",
    title: "问路",
    situation: "在街上询问车站方向",
    lines: [
      { speaker: "李", japanese: "すみません、駅はどこですか。", kana: "すみません、えきはどこですか。", translation: "不好意思，车站在哪里？" },
      { speaker: "路人", japanese: "この道をまっすぐ行ってください。", kana: "このみちをまっすぐいってください。", translation: "请沿着这条路一直走。" },
      { speaker: "路人", japanese: "そして、二つ目の角を右に曲がります。", kana: "そして、ふたつめのかどをみぎにまがります。", translation: "然后在第二个路口右转。" },
      { speaker: "李", japanese: "駅まで何分ぐらいですか。", kana: "えきまでなんぷんぐらいですか。", translation: "到车站大概要几分钟？" },
      { speaker: "路人", japanese: "歩いて五分ぐらいです。", kana: "あるいてごふんぐらいです。", translation: "走路大概五分钟。" },
    ],
  },
  {
    id: "shopping",
    title: "购物",
    situation: "在商店询问价格和颜色",
    lines: [
      { speaker: "客人", japanese: "すみません、このかばんはいくらですか。", kana: "すみません、このかばんはいくらですか。", translation: "不好意思，这个包多少钱？" },
      { speaker: "店员", japanese: "三千円です。", kana: "さんぜんえんです。", translation: "三千日元。" },
      { speaker: "客人", japanese: "ほかの色はありますか。", kana: "ほかのいろはありますか。", translation: "有其他颜色吗？" },
      { speaker: "店员", japanese: "はい、黒と白があります。", kana: "はい、くろとしろがあります。", translation: "有，有黑色和白色。" },
      { speaker: "客人", japanese: "では、黒をください。", kana: "では、くろをください。", translation: "那么请给我黑色的。" },
    ],
  },
  {
    id: "school-dialogue",
    title: "学校对话",
    situation: "同学之间聊日语课和作业",
    lines: [
      { speaker: "王", japanese: "今日の日本語の授業は何時ですか。", kana: "きょうのにほんごのじゅぎょうはなんじですか。", translation: "今天的日语课几点？" },
      { speaker: "鈴木", japanese: "十時からです。", kana: "じゅうじからです。", translation: "从十点开始。" },
      { speaker: "王", japanese: "宿題はありますか。", kana: "しゅくだいはありますか。", translation: "有作业吗？" },
      { speaker: "鈴木", japanese: "はい、短い作文を書きます。", kana: "はい、みじかいさくぶんをかきます。", translation: "有，要写一篇短作文。" },
      { speaker: "王", japanese: "一緒に図書館で勉強しましょう。", kana: "いっしょにとしょかんでべんきょうしましょう。", translation: "一起在图书馆学习吧。" },
    ],
  },
];

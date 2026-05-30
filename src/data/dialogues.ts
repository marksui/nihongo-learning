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
  {
    id: "convenience-store",
    title: "便利店付款",
    situation: "在便利店买水和饭团",
    lines: [
      { speaker: "店员", japanese: "いらっしゃいませ。", kana: "いらっしゃいませ。", translation: "欢迎光临。" },
      { speaker: "客人", japanese: "これとこれをお願いします。", kana: "これとこれをおねがいします。", translation: "请给我这个和这个。" },
      { speaker: "店员", japanese: "袋はご利用ですか。", kana: "ふくろはごりようですか。", translation: "需要袋子吗？" },
      { speaker: "客人", japanese: "いいえ、いりません。", kana: "いいえ、いりません。", translation: "不，不需要。" },
      { speaker: "店员", japanese: "合計で五百円です。", kana: "ごうけいでごひゃくえんです。", translation: "一共五百日元。" },
    ],
  },
  {
    id: "train-ride",
    title: "坐电车",
    situation: "询问站台和下车站",
    lines: [
      { speaker: "李", japanese: "すみません、東京行きは何番線ですか。", kana: "すみません、とうきょういきはなんばんせんですか。", translation: "不好意思，去东京是几号站台？" },
      { speaker: "駅员", japanese: "三番線です。", kana: "さんばんせんです。", translation: "三号站台。" },
      { speaker: "李", japanese: "この電車は新宿に止まりますか。", kana: "このでんしゃはしんじゅくにとまりますか。", translation: "这班电车停新宿吗？" },
      { speaker: "駅员", japanese: "はい、止まります。", kana: "はい、とまります。", translation: "是的，会停。" },
      { speaker: "李", japanese: "ありがとうございます。", kana: "ありがとうございます。", translation: "谢谢。" },
    ],
  },
  {
    id: "hotel-checkin",
    title: "酒店入住",
    situation: "在酒店前台办理入住",
    lines: [
      { speaker: "客人", japanese: "チェックインをお願いします。", kana: "ちぇっくいんをおねがいします。", translation: "我要办理入住。" },
      { speaker: "前台", japanese: "お名前をお願いします。", kana: "おなまえをおねがいします。", translation: "请问您的姓名。" },
      { speaker: "客人", japanese: "李です。予約があります。", kana: "りです。よやくがあります。", translation: "我姓李，有预订。" },
      { speaker: "前台", japanese: "パスポートをお願いします。", kana: "ぱすぽーとをおねがいします。", translation: "请出示护照。" },
      { speaker: "客人", japanese: "はい、どうぞ。", kana: "はい、どうぞ。", translation: "好的，请。" },
    ],
  },
  {
    id: "clinic-visit",
    title: "看病",
    situation: "在诊所说明症状",
    lines: [
      { speaker: "受付", japanese: "今日はどうしましたか。", kana: "きょうはどうしましたか。", translation: "今天哪里不舒服？" },
      { speaker: "李", japanese: "お腹が痛いです。", kana: "おなかがいたいです。", translation: "我肚子痛。" },
      { speaker: "受付", japanese: "熱はありますか。", kana: "ねつはありますか。", translation: "发烧吗？" },
      { speaker: "李", japanese: "少しあります。", kana: "すこしあります。", translation: "有一点。" },
      { speaker: "受付", japanese: "こちらでお待ちください。", kana: "こちらでおまちください。", translation: "请在这里等候。" },
    ],
  },
  {
    id: "phone-call",
    title: "打电话",
    situation: "电话里确认时间",
    lines: [
      { speaker: "李", japanese: "もしもし、李です。", kana: "もしもし、りです。", translation: "喂，我是李。" },
      { speaker: "田中", japanese: "田中です。今、話してもいいですか。", kana: "たなかです。いま、はなしてもいいですか。", translation: "我是田中。现在方便说话吗？" },
      { speaker: "李", japanese: "はい、大丈夫です。", kana: "はい、だいじょうぶです。", translation: "可以，没问题。" },
      { speaker: "田中", japanese: "明日の meeting は十時からです。", kana: "あしたのみーてぃんぐはじゅうじからです。", translation: "明天的会议从十点开始。" },
      { speaker: "李", japanese: "分かりました。ありがとうございます。", kana: "わかりました。ありがとうございます。", translation: "明白了，谢谢。" },
    ],
  },
  {
    id: "weather-chat",
    title: "天气闲聊",
    situation: "和同学简单聊天",
    lines: [
      { speaker: "佐藤", japanese: "今日は暑いですね。", kana: "きょうはあついですね。", translation: "今天很热呢。" },
      { speaker: "王", japanese: "そうですね。昨日より暑いです。", kana: "そうですね。きのうよりあついです。", translation: "是啊，比昨天热。" },
      { speaker: "佐藤", japanese: "午後、雨が降るそうです。", kana: "ごご、あめがふるそうです。", translation: "听说下午会下雨。" },
      { speaker: "王", japanese: "傘を持って行きます。", kana: "かさをもっていきます。", translation: "我会带伞去。" },
      { speaker: "佐藤", japanese: "いいですね。", kana: "いいですね。", translation: "不错。" },
    ],
  },
  {
    id: "lost-item",
    title: "失物招领",
    situation: "找丢失的钱包",
    lines: [
      { speaker: "李", japanese: "すみません、財布をなくしました。", kana: "すみません、さいふをなくしました。", translation: "不好意思，我的钱包丢了。" },
      { speaker: "工作人员", japanese: "どこでなくしましたか。", kana: "どこでなくしましたか。", translation: "在哪里丢的？" },
      { speaker: "李", japanese: "電車の中だと思います。", kana: "でんしゃのなかだとおもいます。", translation: "我想是在电车里。" },
      { speaker: "工作人员", japanese: "色は何色ですか。", kana: "いろはなにいろですか。", translation: "是什么颜色？" },
      { speaker: "李", japanese: "黒です。", kana: "くろです。", translation: "黑色。" },
    ],
  },
  {
    id: "making-appointment",
    title: "约时间",
    situation: "和朋友约见面时间",
    lines: [
      { speaker: "李", japanese: "明日、時間がありますか。", kana: "あした、じかんがありますか。", translation: "明天有时间吗？" },
      { speaker: "山田", japanese: "午後なら大丈夫です。", kana: "ごごならだいじょうぶです。", translation: "下午的话没问题。" },
      { speaker: "李", japanese: "三時に駅で会いませんか。", kana: "さんじにえきであいませんか。", translation: "三点在车站见怎么样？" },
      { speaker: "山田", japanese: "いいですね。", kana: "いいですね。", translation: "好啊。" },
      { speaker: "李", japanese: "では、また明日。", kana: "では、またあした。", translation: "那么明天见。" },
    ],
  },
];

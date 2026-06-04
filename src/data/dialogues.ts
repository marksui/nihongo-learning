export interface DialogueLine {
  speaker: string;
  japanese: string;
  kana: string;
  translation: string;
  audioText?: string;
}

export const dialogueModes = ["社交", "餐饮", "出行", "购物", "校园", "旅行", "生活", "紧急", "工作"] as const;

export type DialogueMode = (typeof dialogueModes)[number];

export interface Dialogue {
  id: string;
  title: string;
  mode: DialogueMode;
  practiceSpeaker: string;
  situation: string;
  lines: DialogueLine[];
  level?: "入门" | "基础" | "进阶入门";
  tags?: string[];
  sortOrder?: number;
  audioText?: string;
}

const coreDialogues: Dialogue[] = [
  {
    id: "self-introduction",
    title: "自我介绍",
    mode: "社交",
    practiceSpeaker: "李",
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
    mode: "餐饮",
    practiceSpeaker: "客人",
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
    mode: "出行",
    practiceSpeaker: "李",
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
    mode: "购物",
    practiceSpeaker: "客人",
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
    mode: "校园",
    practiceSpeaker: "王",
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
    mode: "购物",
    practiceSpeaker: "客人",
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
    mode: "出行",
    practiceSpeaker: "李",
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
    mode: "旅行",
    practiceSpeaker: "客人",
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
    mode: "紧急",
    practiceSpeaker: "李",
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
    mode: "生活",
    practiceSpeaker: "李",
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
    mode: "社交",
    practiceSpeaker: "王",
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
    mode: "紧急",
    practiceSpeaker: "李",
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
    mode: "社交",
    practiceSpeaker: "李",
    situation: "和朋友约见面时间",
    lines: [
      { speaker: "李", japanese: "明日、時間がありますか。", kana: "あした、じかんがありますか。", translation: "明天有时间吗？" },
      { speaker: "山田", japanese: "午後なら大丈夫です。", kana: "ごごならだいじょうぶです。", translation: "下午的话没问题。" },
      { speaker: "李", japanese: "三時に駅で会いませんか。", kana: "さんじにえきであいませんか。", translation: "三点在车站见怎么样？" },
      { speaker: "山田", japanese: "いいですね。", kana: "いいですね。", translation: "好啊。" },
      { speaker: "李", japanese: "では、また明日。", kana: "では、またあした。", translation: "那么明天见。" },
    ],
  },
  {
    id: "airport-arrival",
    title: "机场入境",
    mode: "旅行",
    practiceSpeaker: "旅客",
    situation: "入境时回答简单问题",
    lines: [
      { speaker: "工作人员", japanese: "日本へは何をしに来ましたか。", kana: "にほんへはなにをしにきましたか。", translation: "您来日本做什么？" },
      { speaker: "旅客", japanese: "旅行に来ました。", kana: "りょこうにきました。", translation: "我是来旅行的。" },
      { speaker: "工作人员", japanese: "何日ぐらい滞在しますか。", kana: "なんにちぐらいたいざいしますか。", translation: "大概停留几天？" },
      { speaker: "旅客", japanese: "五日ぐらいです。", kana: "いつかぐらいです。", translation: "大概五天。" },
      { speaker: "工作人员", japanese: "ホテルの住所は分かりますか。", kana: "ほてるのじゅうしょはわかりますか。", translation: "知道酒店地址吗？" },
      { speaker: "旅客", japanese: "はい、ここにあります。", kana: "はい、ここにあります。", translation: "知道，在这里。" },
    ],
  },
  {
    id: "ticket-counter",
    title: "车站买票",
    mode: "出行",
    practiceSpeaker: "客人",
    situation: "在车站窗口买去京都的票",
    lines: [
      { speaker: "客人", japanese: "京都までの切符をください。", kana: "きょうとまでのきっぷをください。", translation: "请给我一张到京都的票。" },
      { speaker: "駅员", japanese: "片道ですか、往復ですか。", kana: "かたみちですか、おうふくですか。", translation: "单程还是往返？" },
      { speaker: "客人", japanese: "片道でお願いします。", kana: "かたみちでおねがいします。", translation: "请给我单程。" },
      { speaker: "駅员", japanese: "自由席でよろしいですか。", kana: "じゆうせきでよろしいですか。", translation: "自由席可以吗？" },
      { speaker: "客人", japanese: "はい、大丈夫です。", kana: "はい、だいじょうぶです。", translation: "可以，没问题。" },
      { speaker: "駅员", japanese: "三千二百円です。", kana: "さんぜんにひゃくえんです。", translation: "三千二百日元。" },
    ],
  },
  {
    id: "cafe-order",
    title: "咖啡店",
    mode: "餐饮",
    practiceSpeaker: "客人",
    situation: "点咖啡并选择堂食或外带",
    lines: [
      { speaker: "店员", japanese: "ご注文をどうぞ。", kana: "ごちゅうもんをどうぞ。", translation: "请点单。" },
      { speaker: "客人", japanese: "アイスコーヒーを一つください。", kana: "あいすこーひーをひとつください。", translation: "请给我一杯冰咖啡。" },
      { speaker: "店员", japanese: "サイズはいかがなさいますか。", kana: "さいずはいかがなさいますか。", translation: "要什么尺寸？" },
      { speaker: "客人", japanese: "Mサイズでお願いします。", kana: "えむさいずでおねがいします。", translation: "请给我中杯。" },
      { speaker: "店员", japanese: "店内でお召し上がりですか。", kana: "てんないでおめしあがりですか。", translation: "在店内用吗？" },
      { speaker: "客人", japanese: "持ち帰りでお願いします。", kana: "もちかえりでおねがいします。", translation: "请帮我打包。" },
    ],
  },
  {
    id: "taxi-ride",
    title: "打车",
    mode: "出行",
    practiceSpeaker: "客人",
    situation: "坐出租车去酒店",
    lines: [
      { speaker: "司机", japanese: "どちらまでですか。", kana: "どちらまでですか。", translation: "去哪里？" },
      { speaker: "客人", japanese: "このホテルまでお願いします。", kana: "このほてるまでおねがいします。", translation: "请到这家酒店。" },
      { speaker: "司机", japanese: "高速道路を使いますか。", kana: "こうそくどうろをつかいますか。", translation: "要走高速吗？" },
      { speaker: "客人", japanese: "はい、お願いします。", kana: "はい、おねがいします。", translation: "好的，麻烦您。" },
      { speaker: "客人", japanese: "ここで止めてください。", kana: "ここでとめてください。", translation: "请在这里停车。" },
      { speaker: "司机", japanese: "はい、ありがとうございます。", kana: "はい、ありがとうございます。", translation: "好的，谢谢。" },
    ],
  },
  {
    id: "pharmacy",
    title: "药妆店",
    mode: "购物",
    practiceSpeaker: "客人",
    situation: "在药妆店询问感冒药",
    lines: [
      { speaker: "客人", japanese: "すみません、風邪薬はありますか。", kana: "すみません、かぜぐすりはありますか。", translation: "不好意思，有感冒药吗？" },
      { speaker: "店员", japanese: "はい、こちらです。", kana: "はい、こちらです。", translation: "有，在这边。" },
      { speaker: "客人", japanese: "眠くなりにくい薬はありますか。", kana: "ねむくなりにくいくすりはありますか。", translation: "有没有不太容易犯困的药？" },
      { speaker: "店员", japanese: "こちらがおすすめです。", kana: "こちらがおすすめです。", translation: "推荐这款。" },
      { speaker: "客人", japanese: "一日に何回飲みますか。", kana: "いちにちになんかいのみますか。", translation: "一天吃几次？" },
      { speaker: "店员", japanese: "一日三回です。", kana: "いちにちさんかいです。", translation: "一天三次。" },
    ],
  },
  {
    id: "hotel-problem",
    title: "酒店问题",
    mode: "旅行",
    practiceSpeaker: "客人",
    situation: "向前台说明房间里的问题",
    lines: [
      { speaker: "客人", japanese: "すみません、部屋のエアコンがつきません。", kana: "すみません、へやのえあこんがつきません。", translation: "不好意思，房间空调打不开。" },
      { speaker: "前台", japanese: "申し訳ございません。すぐ確認します。", kana: "もうしわけございません。すぐかくにんします。", translation: "非常抱歉，我们马上确认。" },
      { speaker: "客人", japanese: "部屋を変えることはできますか。", kana: "へやをかえることはできますか。", translation: "可以换房间吗？" },
      { speaker: "前台", japanese: "はい、空いている部屋があります。", kana: "はい、あいているへやがあります。", translation: "可以，有空房间。" },
      { speaker: "客人", japanese: "ありがとうございます。", kana: "ありがとうございます。", translation: "谢谢。" },
      { speaker: "前台", japanese: "新しい鍵をお渡しします。", kana: "あたらしいかぎをおわたしします。", translation: "我给您新的钥匙。" },
    ],
  },
  {
    id: "club-invitation",
    title: "社团邀请",
    mode: "校园",
    practiceSpeaker: "留学生",
    situation: "在学校被邀请参加社团活动",
    lines: [
      { speaker: "先輩", japanese: "日本語クラブに興味がありますか。", kana: "にほんごくらぶにきょうみがありますか。", translation: "你对日语社有兴趣吗？" },
      { speaker: "留学生", japanese: "はい、少し興味があります。", kana: "はい、すこしきょうみがあります。", translation: "有，有一点兴趣。" },
      { speaker: "先輩", japanese: "毎週金曜日に集まります。", kana: "まいしゅうきんようびにあつまります。", translation: "每周五集合。" },
      { speaker: "留学生", japanese: "何時からですか。", kana: "なんじからですか。", translation: "从几点开始？" },
      { speaker: "先輩", japanese: "午後六時からです。", kana: "ごごろくじからです。", translation: "下午六点开始。" },
      { speaker: "留学生", japanese: "参加してみたいです。", kana: "さんかしてみたいです。", translation: "我想参加看看。" },
    ],
  },
  {
    id: "emergency-help",
    title: "紧急求助",
    mode: "紧急",
    practiceSpeaker: "李",
    situation: "手机没电时向路人求助",
    lines: [
      { speaker: "李", japanese: "すみません、助けてください。", kana: "すみません、たすけてください。", translation: "不好意思，请帮帮我。" },
      { speaker: "路人", japanese: "どうしましたか。", kana: "どうしましたか。", translation: "怎么了？" },
      { speaker: "李", japanese: "携帯の電池がなくなりました。", kana: "けいたいのでんちがなくなりました。", translation: "我的手机没电了。" },
      { speaker: "李", japanese: "駅に行きたいです。", kana: "えきにいきたいです。", translation: "我想去车站。" },
      { speaker: "路人", japanese: "交番はあそこです。", kana: "こうばんはあそこです。", translation: "派出所在那边。" },
      { speaker: "李", japanese: "ありがとうございます。", kana: "ありがとうございます。", translation: "谢谢。" },
    ],
  },
];

const makeDialogue = (
  id: string,
  title: string,
  mode: DialogueMode,
  practiceSpeaker: string,
  situation: string,
  lines: DialogueLine[],
  tags: string[] = [mode],
): Dialogue => ({
  id,
  title,
  mode,
  practiceSpeaker,
  situation,
  lines,
  level: "基础",
  tags,
});

const expandedDialogues: Dialogue[] = [
  makeDialogue("coin-laundry", "投币洗衣", "生活", "客人", "在自助洗衣店询问机器用法", [
    { speaker: "客人", japanese: "すみません、この洗濯機は使えますか。", kana: "すみません、このせんたくきはつかえますか。", translation: "不好意思，这台洗衣机可以用吗？" },
    { speaker: "店员", japanese: "はい、使えます。硬貨を入れてください。", kana: "はい、つかえます。こうかをいれてください。", translation: "可以。请投入硬币。" },
    { speaker: "客人", japanese: "洗剤は必要ですか。", kana: "せんざいはひつようですか。", translation: "需要洗衣液吗？" },
    { speaker: "店员", japanese: "自動で入ります。", kana: "じどうではいります。", translation: "会自动加入。" },
  ]),
  makeDialogue("post-office", "邮局寄件", "生活", "客人", "在邮局寄明信片和包裹", [
    { speaker: "客人", japanese: "中国まで送りたいです。", kana: "ちゅうごくまでおくりたいです。", translation: "我想寄到中国。" },
    { speaker: "职员", japanese: "中身は何ですか。", kana: "なかみはなんですか。", translation: "里面是什么？" },
    { speaker: "客人", japanese: "服と本です。", kana: "ふくとほんです。", translation: "衣服和书。" },
    { speaker: "职员", japanese: "この用紙に住所を書いてください。", kana: "このようしにじゅうしょをかいてください。", translation: "请在这张表上写地址。" },
  ]),
  makeDialogue("bank-atm", "银行取钱", "生活", "客人", "在银行询问取钱方式", [
    { speaker: "客人", japanese: "現金を下ろしたいです。", kana: "げんきんをおろしたいです。", translation: "我想取现金。" },
    { speaker: "职员", japanese: "ATMはあちらです。", kana: "えーてぃーえむはあちらです。", translation: "ATM 在那边。" },
    { speaker: "客人", japanese: "中国のカードは使えますか。", kana: "ちゅうごくのかーどはつかえますか。", translation: "中国的卡能用吗？" },
    { speaker: "职员", japanese: "この機械なら使えます。", kana: "このきかいならつかえます。", translation: "这台机器可以用。" },
  ]),
  makeDialogue("library-card", "办借书卡", "校园", "学生", "在图书馆办理借书卡", [
    { speaker: "学生", japanese: "図書館カードを作りたいです。", kana: "としょかんかーどをつくりたいです。", translation: "我想办借书卡。" },
    { speaker: "职员", japanese: "学生証はありますか。", kana: "がくせいしょうはありますか。", translation: "有学生证吗？" },
    { speaker: "学生", japanese: "はい、あります。", kana: "はい、あります。", translation: "有。" },
    { speaker: "职员", japanese: "こちらに名前を書いてください。", kana: "こちらになまえをかいてください。", translation: "请在这里写名字。" },
  ]),
  makeDialogue("apartment-viewing", "看房", "生活", "李", "看出租房时询问房间和费用", [
    { speaker: "李", japanese: "この部屋は明るいですね。", kana: "このへやはあかるいですね。", translation: "这个房间很明亮呢。" },
    { speaker: "中介", japanese: "はい、南向きです。", kana: "はい、みなみむきです。", translation: "是的，朝南。" },
    { speaker: "李", japanese: "家賃はいくらですか。", kana: "やちんはいくらですか。", translation: "房租多少钱？" },
    { speaker: "中介", japanese: "一か月八万円です。", kana: "いっかげつはちまんえんです。", translation: "一个月八万日元。" },
  ]),
  makeDialogue("garbage-rules", "倒垃圾", "生活", "住户", "向邻居确认垃圾分类", [
    { speaker: "住户", japanese: "燃えるごみは何曜日ですか。", kana: "もえるごみはなんようびですか。", translation: "可燃垃圾是星期几？" },
    { speaker: "邻居", japanese: "月曜日と木曜日です。", kana: "げつようびともくようびです。", translation: "星期一和星期四。" },
    { speaker: "住户", japanese: "瓶はどこに出しますか。", kana: "びんはどこにだしますか。", translation: "瓶子放在哪里？" },
    { speaker: "邻居", japanese: "あそこの箱に入れてください。", kana: "あそこのはこにいれてください。", translation: "请放进那边的箱子里。" },
  ]),
  makeDialogue("hair-salon", "理发", "生活", "客人", "在理发店说明发型", [
    { speaker: "店员", japanese: "今日はどうしますか。", kana: "きょうはどうしますか。", translation: "今天想怎么剪？" },
    { speaker: "客人", japanese: "少し短くしてください。", kana: "すこしみじかくしてください。", translation: "请稍微剪短一点。" },
    { speaker: "店员", japanese: "前髪も切りますか。", kana: "まえがみもきりますか。", translation: "刘海也剪吗？" },
    { speaker: "客人", japanese: "はい、お願いします。", kana: "はい、おねがいします。", translation: "是的，麻烦您。" },
  ]),
  makeDialogue("izakaya", "居酒屋", "餐饮", "客人", "在居酒屋点饮料和小菜", [
    { speaker: "店员", japanese: "お飲み物は何にしますか。", kana: "おのみものはなににしますか。", translation: "饮料要点什么？" },
    { speaker: "客人", japanese: "ウーロン茶をお願いします。", kana: "うーろんちゃをおねがいします。", translation: "请给我乌龙茶。" },
    { speaker: "店员", japanese: "食べ物はいかがですか。", kana: "たべものはいかがですか。", translation: "吃的要点什么？" },
    { speaker: "客人", japanese: "唐揚げを一つください。", kana: "からあげをひとつください。", translation: "请给我一份炸鸡块。" },
  ]),
  makeDialogue("food-allergy", "过敏说明", "餐饮", "客人", "点餐前说明不能吃的东西", [
    { speaker: "客人", japanese: "すみません、卵は入っていますか。", kana: "すみません、たまごははいっていますか。", translation: "不好意思，里面有鸡蛋吗？" },
    { speaker: "店员", japanese: "はい、少し入っています。", kana: "はい、すこしはいっています。", translation: "有，放了一点。" },
    { speaker: "客人", japanese: "卵アレルギーがあります。", kana: "たまごあれるぎーがあります。", translation: "我对鸡蛋过敏。" },
    { speaker: "店员", japanese: "では、別の料理をご案内します。", kana: "では、べつのりょうりをごあんないします。", translation: "那么我给您介绍别的菜。" },
  ]),
  makeDialogue("museum-ticket", "博物馆买票", "旅行", "游客", "买门票并询问拍照", [
    { speaker: "游客", japanese: "大人一枚ください。", kana: "おとないちまいください。", translation: "请给我一张成人票。" },
    { speaker: "职员", japanese: "千二百円です。", kana: "せんにひゃくえんです。", translation: "一千二百日元。" },
    { speaker: "游客", japanese: "写真を撮ってもいいですか。", kana: "しゃしんをとってもいいですか。", translation: "可以拍照吗？" },
    { speaker: "职员", japanese: "フラッシュは使わないでください。", kana: "ふらっしゅはつかわないでください。", translation: "请不要使用闪光灯。" },
  ]),
  makeDialogue("shrine-visit", "参拜神社", "旅行", "游客", "在神社询问参拜方式", [
    { speaker: "游客", japanese: "参拝の仕方を教えてください。", kana: "さんぱいのしかたをおしえてください。", translation: "请告诉我参拜方式。" },
    { speaker: "工作人员", japanese: "まず手を洗います。", kana: "まずてをあらいます。", translation: "首先洗手。" },
    { speaker: "游客", japanese: "お守りはどこで買えますか。", kana: "おまもりはどこでかえますか。", translation: "护身符在哪里买？" },
    { speaker: "工作人员", japanese: "あちらで買えます。", kana: "あちらでかえます。", translation: "在那边可以买。" },
  ]),
  makeDialogue("wifi-question", "询问网络", "生活", "客人", "在咖啡店询问网络和座位", [
    { speaker: "客人", japanese: "すみません、Wi-Fiはありますか。", kana: "すみません、わいふぁいはありますか。", translation: "不好意思，有 Wi-Fi 吗？" },
    { speaker: "店员", japanese: "はい、あります。", kana: "はい、あります。", translation: "有。" },
    { speaker: "客人", japanese: "パスワードを教えてください。", kana: "ぱすわーどをおしえてください。", translation: "请告诉我密码。" },
    { speaker: "店员", japanese: "レシートに書いてあります。", kana: "れしーとにかいてあります。", translation: "写在小票上。" },
  ]),
  makeDialogue("office-greeting", "办公室问候", "工作", "新人", "第一天到公司简单问候", [
    { speaker: "新人", japanese: "おはようございます。今日からお世話になります。", kana: "おはようございます。きょうからおせわになります。", translation: "早上好。从今天开始请多关照。" },
    { speaker: "同僚", japanese: "よろしくお願いします。席はこちらです。", kana: "よろしくおねがいします。せきはこちらです。", translation: "请多关照。你的座位在这边。" },
    { speaker: "新人", japanese: "ありがとうございます。", kana: "ありがとうございます。", translation: "谢谢。" },
    { speaker: "同僚", japanese: "分からないことがあれば聞いてください。", kana: "わからないことがあればきいてください。", translation: "有不懂的事请问我。" },
  ]),
  makeDialogue("work-meeting", "会议确认", "工作", "李", "确认会议时间和资料", [
    { speaker: "李", japanese: "今日の会議は何時からですか。", kana: "きょうのかいぎはなんじからですか。", translation: "今天的会议从几点开始？" },
    { speaker: "同僚", japanese: "三時からです。", kana: "さんじからです。", translation: "从三点开始。" },
    { speaker: "李", japanese: "資料は必要ですか。", kana: "しりょうはひつようですか。", translation: "需要资料吗？" },
    { speaker: "同僚", japanese: "はい、この資料を持って来てください。", kana: "はい、このしりょうをもってきてください。", translation: "需要，请带这份资料来。" },
  ]),
  makeDialogue("online-meeting", "线上会议", "工作", "参加者", "线上会议开始前确认声音", [
    { speaker: "参加者", japanese: "声は聞こえますか。", kana: "こえはきこえますか。", translation: "能听到声音吗？" },
    { speaker: "主持", japanese: "はい、聞こえます。", kana: "はい、きこえます。", translation: "可以听到。" },
    { speaker: "参加者", japanese: "画面を共有します。", kana: "がめんをきょうゆうします。", translation: "我来共享屏幕。" },
    { speaker: "主持", japanese: "お願いします。", kana: "おねがいします。", translation: "麻烦你。" },
  ]),
  makeDialogue("delivery-receive", "收快递", "生活", "住户", "快递员送包裹到门口", [
    { speaker: "快递员", japanese: "宅配便です。", kana: "たくはいびんです。", translation: "快递。" },
    { speaker: "住户", japanese: "はい、今行きます。", kana: "はい、いまいきます。", translation: "好的，我现在过去。" },
    { speaker: "快递员", japanese: "こちらにサインをお願いします。", kana: "こちらにさいんをおねがいします。", translation: "请在这里签名。" },
    { speaker: "住户", japanese: "ありがとうございます。", kana: "ありがとうございます。", translation: "谢谢。" },
  ]),
  makeDialogue("return-item", "退换商品", "购物", "客人", "买到不合适的衣服后询问退换", [
    { speaker: "客人", japanese: "すみません、サイズを間違えました。", kana: "すみません、さいずをまちがえました。", translation: "不好意思，我买错尺寸了。" },
    { speaker: "店员", japanese: "レシートはありますか。", kana: "れしーとはありますか。", translation: "有小票吗？" },
    { speaker: "客人", japanese: "はい、あります。交換できますか。", kana: "はい、あります。こうかんできますか。", translation: "有。可以换吗？" },
    { speaker: "店员", japanese: "はい、大丈夫です。", kana: "はい、だいじょうぶです。", translation: "可以，没问题。" },
  ]),
  makeDialogue("clothes-shopping", "买衣服", "购物", "客人", "试穿衣服并询问颜色", [
    { speaker: "客人", japanese: "これを試着してもいいですか。", kana: "これをしちゃくしてもいいですか。", translation: "可以试穿这个吗？" },
    { speaker: "店员", japanese: "はい、どうぞ。", kana: "はい、どうぞ。", translation: "可以，请。" },
    { speaker: "客人", japanese: "もう少し大きいサイズはありますか。", kana: "もうすこしおおきいさいずはありますか。", translation: "有稍微大一点的尺寸吗？" },
    { speaker: "店员", japanese: "はい、持ってきます。", kana: "はい、もってきます。", translation: "有，我拿过来。" },
  ]),
  makeDialogue("bookstore", "书店找书", "购物", "客人", "在书店寻找日语教材", [
    { speaker: "客人", japanese: "日本語の本はどこですか。", kana: "にほんごのほんはどこですか。", translation: "日语书在哪里？" },
    { speaker: "店员", japanese: "二階にあります。", kana: "にかいにあります。", translation: "在二楼。" },
    { speaker: "客人", japanese: "初心者向けの本はありますか。", kana: "しょしんしゃむけのほんはありますか。", translation: "有面向初学者的书吗？" },
    { speaker: "店员", japanese: "こちらがおすすめです。", kana: "こちらがおすすめです。", translation: "推荐这本。" },
  ]),
  makeDialogue("city-office", "市役所手续", "生活", "居民", "在市役所询问住址登记", [
    { speaker: "居民", japanese: "住所の手続きをしたいです。", kana: "じゅうしょのてつづきをしたいです。", translation: "我想办理住址手续。" },
    { speaker: "职员", japanese: "在留カードはありますか。", kana: "ざいりゅうかーどはありますか。", translation: "有在留卡吗？" },
    { speaker: "居民", japanese: "はい、あります。", kana: "はい、あります。", translation: "有。" },
    { speaker: "职员", japanese: "この番号でお待ちください。", kana: "このばんごうでおまちください。", translation: "请拿这个号码等待。" },
  ]),
  makeDialogue("police-box", "派出所问路", "出行", "李", "在交番询问迷路后的方向", [
    { speaker: "李", japanese: "すみません、道に迷いました。", kana: "すみません、みちにまよいました。", translation: "不好意思，我迷路了。" },
    { speaker: "警察", japanese: "どこへ行きたいですか。", kana: "どこへいきたいですか。", translation: "你想去哪里？" },
    { speaker: "李", japanese: "このホテルへ行きたいです。", kana: "このほてるへいきたいです。", translation: "我想去这家酒店。" },
    { speaker: "警察", japanese: "ここから歩いて十分ぐらいです。", kana: "ここからあるいてじゅっぷんぐらいです。", translation: "从这里走路大约十分钟。" },
  ]),
  makeDialogue("earthquake", "地震时", "紧急", "李", "发生地震时听从指示", [
    { speaker: "工作人员", japanese: "机の下に入ってください。", kana: "つくえのしたにはいってください。", translation: "请躲到桌子下面。" },
    { speaker: "李", japanese: "はい、分かりました。", kana: "はい、わかりました。", translation: "好的，明白了。" },
    { speaker: "工作人员", japanese: "落ち着いてください。", kana: "おちついてください。", translation: "请冷静。" },
    { speaker: "李", japanese: "出口はどこですか。", kana: "でぐちはどこですか。", translation: "出口在哪里？" },
  ]),
  makeDialogue("dentist", "牙科就诊", "紧急", "患者", "牙痛时在牙科说明情况", [
    { speaker: "受付", japanese: "今日はどうしましたか。", kana: "きょうはどうしましたか。", translation: "今天怎么了？" },
    { speaker: "患者", japanese: "歯が痛いです。", kana: "はがいたいです。", translation: "牙痛。" },
    { speaker: "受付", japanese: "予約はありますか。", kana: "よやくはありますか。", translation: "有预约吗？" },
    { speaker: "患者", japanese: "いいえ、ありません。", kana: "いいえ、ありません。", translation: "没有。" },
  ]),
  makeDialogue("campus-office", "学校事务处", "校园", "学生", "向学校事务处确认证明文件", [
    { speaker: "学生", japanese: "在学証明書が必要です。", kana: "ざいがくしょうめいしょがひつようです。", translation: "我需要在学证明。" },
    { speaker: "职员", japanese: "学生証を見せてください。", kana: "がくせいしょうをみせてください。", translation: "请出示学生证。" },
    { speaker: "学生", japanese: "いつ受け取れますか。", kana: "いつうけとれますか。", translation: "什么时候能领取？" },
    { speaker: "职员", japanese: "明日の午後です。", kana: "あしたのごごです。", translation: "明天下午。" },
  ]),
];

export const dialogues: Dialogue[] = [...coreDialogues, ...expandedDialogues].map((dialogue, index) => ({
  sortOrder: dialogue.sortOrder ?? index + 1,
  ...dialogue,
}));

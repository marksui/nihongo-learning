export const quickPhraseCategories = [
  "基础问候",
  "出行交通",
  "餐厅点餐",
  "购物付款",
  "酒店住宿",
  "银行邮局",
  "手机网络",
  "紧急求助",
  "课堂学习",
] as const;

export type QuickPhraseCategory = (typeof quickPhraseCategories)[number];

export interface QuickPhrase {
  id: string;
  category: QuickPhraseCategory;
  japanese: string;
  kana: string;
  romaji: string;
  meaning: string;
}

export const quickPhrases: QuickPhrase[] = [
  { id: "hello", category: "基础问候", japanese: "こんにちは", kana: "こんにちは", romaji: "konnichiwa", meaning: "你好 / 午安" },
  { id: "morning", category: "基础问候", japanese: "おはようございます", kana: "おはようございます", romaji: "ohayou gozaimasu", meaning: "早上好" },
  { id: "evening", category: "基础问候", japanese: "こんばんは", kana: "こんばんは", romaji: "konbanwa", meaning: "晚上好" },
  { id: "thanks", category: "基础问候", japanese: "ありがとうございます", kana: "ありがとうございます", romaji: "arigatou gozaimasu", meaning: "谢谢" },
  { id: "sorry", category: "基础问候", japanese: "すみません", kana: "すみません", romaji: "sumimasen", meaning: "不好意思 / 对不起" },
  { id: "please", category: "基础问候", japanese: "お願いします", kana: "おねがいします", romaji: "onegaishimasu", meaning: "麻烦您 / 拜托" },
  { id: "nice-meet", category: "基础问候", japanese: "はじめまして", kana: "はじめまして", romaji: "hajimemashite", meaning: "初次见面" },
  { id: "see-you", category: "基础问候", japanese: "また明日", kana: "またあした", romaji: "mata ashita", meaning: "明天见" },

  { id: "station-where", category: "出行交通", japanese: "駅はどこですか", kana: "えきはどこですか", romaji: "eki wa doko desu ka", meaning: "车站在哪里？" },
  { id: "ticket-one", category: "出行交通", japanese: "切符を一枚ください", kana: "きっぷをいちまいください", romaji: "kippu o ichimai kudasai", meaning: "请给我一张票。" },
  { id: "which-platform", category: "出行交通", japanese: "何番線ですか", kana: "なんばんせんですか", romaji: "nanbansen desu ka", meaning: "几号站台？" },
  { id: "go-to-tokyo", category: "出行交通", japanese: "東京へ行きます", kana: "とうきょうへいきます", romaji: "toukyou e ikimasu", meaning: "去东京。" },
  { id: "get-off-here", category: "出行交通", japanese: "ここで降ります", kana: "ここでおります", romaji: "koko de orimasu", meaning: "我在这里下车。" },
  { id: "taxi", category: "出行交通", japanese: "タクシー乗り場はどこですか", kana: "たくしーのりばはどこですか", romaji: "takushii noriba wa doko desu ka", meaning: "出租车乘车处在哪里？" },

  { id: "menu", category: "餐厅点餐", japanese: "メニューをください", kana: "めにゅーをください", romaji: "menyuu o kudasai", meaning: "请给我菜单。" },
  { id: "order", category: "餐厅点餐", japanese: "注文をお願いします", kana: "ちゅうもんをおねがいします", romaji: "chuumon o onegaishimasu", meaning: "我要点餐。" },
  { id: "recommend", category: "餐厅点餐", japanese: "おすすめは何ですか", kana: "おすすめはなんですか", romaji: "osusume wa nan desu ka", meaning: "推荐什么？" },
  { id: "water", category: "餐厅点餐", japanese: "水をください", kana: "みずをください", romaji: "mizu o kudasai", meaning: "请给我水。" },
  { id: "not-spicy", category: "餐厅点餐", japanese: "辛くしないでください", kana: "からくしないでください", romaji: "karaku shinaide kudasai", meaning: "请不要做辣。" },
  { id: "bill", category: "餐厅点餐", japanese: "お会計をお願いします", kana: "おかいけいをおねがいします", romaji: "okaikei o onegaishimasu", meaning: "请结账。" },

  { id: "price", category: "购物付款", japanese: "これはいくらですか", kana: "これはいくらですか", romaji: "kore wa ikura desu ka", meaning: "这个多少钱？" },
  { id: "try", category: "购物付款", japanese: "試着してもいいですか", kana: "しちゃくしてもいいですか", romaji: "shichaku shite mo ii desu ka", meaning: "可以试穿吗？" },
  { id: "card", category: "购物付款", japanese: "カードで払えますか", kana: "かーどではらえますか", romaji: "kaado de haraemasu ka", meaning: "可以刷卡吗？" },
  { id: "cash", category: "购物付款", japanese: "現金で払います", kana: "げんきんではらいます", romaji: "genkin de haraimasu", meaning: "我用现金支付。" },
  { id: "bag", category: "购物付款", japanese: "袋はいりません", kana: "ふくろはいりません", romaji: "fukuro wa irimasen", meaning: "不需要袋子。" },
  { id: "receipt", category: "购物付款", japanese: "レシートをください", kana: "れしーとをください", romaji: "reshiito o kudasai", meaning: "请给我收据。" },

  { id: "checkin", category: "酒店住宿", japanese: "チェックインをお願いします", kana: "ちぇっくいんをおねがいします", romaji: "chekkuin o onegaishimasu", meaning: "我要办理入住。" },
  { id: "reservation", category: "酒店住宿", japanese: "予約があります", kana: "よやくがあります", romaji: "yoyaku ga arimasu", meaning: "我有预订。" },
  { id: "passport", category: "酒店住宿", japanese: "パスポートです", kana: "ぱすぽーとです", romaji: "pasupooto desu", meaning: "这是护照。" },
  { id: "wifi", category: "酒店住宿", japanese: "Wi-Fiのパスワードは何ですか", kana: "わいふぁいのぱすわーどはなんですか", romaji: "waifai no pasuwaado wa nan desu ka", meaning: "Wi-Fi 密码是什么？" },
  { id: "checkout", category: "酒店住宿", japanese: "チェックアウトは何時ですか", kana: "ちぇっくあうとはなんじですか", romaji: "chekkuauto wa nanji desu ka", meaning: "几点退房？" },
  { id: "room-key", category: "酒店住宿", japanese: "部屋の鍵をください", kana: "へやのかぎをください", romaji: "heya no kagi o kudasai", meaning: "请给我房间钥匙。" },

  { id: "post-send-china", category: "银行邮局", japanese: "中国まで送りたいです", kana: "ちゅうごくまでおくりたいです", romaji: "chuugoku made okuritai desu", meaning: "我想寄到中国。" },
  { id: "post-airmail", category: "银行邮局", japanese: "航空便でお願いします", kana: "こうくうびんでおねがいします", romaji: "koukuubin de onegai shimasu", meaning: "请用航空件。" },
  { id: "post-tracking", category: "银行邮局", japanese: "追跡番号はありますか", kana: "ついせきばんごうはありますか", romaji: "tsuiseki bangou wa arimasu ka", meaning: "有追踪号码吗？" },
  { id: "post-fragile", category: "银行邮局", japanese: "割れ物が入っています", kana: "われものがはいっています", romaji: "waremono ga haitte imasu", meaning: "里面有易碎物品。" },
  { id: "bank-open-account", category: "银行邮局", japanese: "口座を開設したいです", kana: "こうざをかいせつしたいです", romaji: "kouza o kaisetsu shitai desu", meaning: "我想开设账户。" },
  { id: "bank-withdraw-cash", category: "银行邮局", japanese: "現金を下ろしたいです", kana: "げんきんをおろしたいです", romaji: "genkin o oroshitai desu", meaning: "我想取现金。" },
  { id: "bank-transfer-money", category: "银行邮局", japanese: "振込をしたいです", kana: "ふりこみをしたいです", romaji: "furikomi o shitai desu", meaning: "我想转账 / 汇款。" },
  { id: "bank-address-change", category: "银行邮局", japanese: "住所変更をお願いします", kana: "じゅうしょへんこうをおねがいします", romaji: "juusho henkou o onegai shimasu", meaning: "请帮我办理地址变更。" },

  { id: "phone-buy-sim", category: "手机网络", japanese: "SIMカードを買いたいです", kana: "しむかーどをかいたいです", romaji: "shimu kaado o kaitai desu", meaning: "我想买 SIM 卡。" },
  { id: "phone-cheap-plan", category: "手机网络", japanese: "一番安いプランはどれですか", kana: "いちばんやすいぷらんはどれですか", romaji: "ichiban yasui puran wa dore desu ka", meaning: "最便宜的套餐是哪一个？" },
  { id: "phone-data-size", category: "手机网络", japanese: "データ容量はどのくらいですか", kana: "でーたようりょうはどのくらいですか", romaji: "deeta youryou wa dono kurai desu ka", meaning: "数据流量有多少？" },
  { id: "phone-cancel-plan", category: "手机网络", japanese: "契約を解約したいです", kana: "けいやくをかいやくしたいです", romaji: "keiyaku o kaiyaku shitai desu", meaning: "我想解除合约。" },
  { id: "internet-wifi-trouble", category: "手机网络", japanese: "Wi-Fiにつながりません", kana: "わいふぁいにつながりません", romaji: "waifai ni tsunagarimasen", meaning: "连不上 Wi-Fi。" },
  { id: "internet-password-again", category: "手机网络", japanese: "パスワードをもう一度教えてください", kana: "ぱすわーどをもういちどおしえてください", romaji: "pasuwaado o mou ichido oshiete kudasai", meaning: "请再告诉我一次密码。" },
  { id: "phone-borrow-charger", category: "手机网络", japanese: "充電器を借りられますか", kana: "じゅうでんきをかりられますか", romaji: "juudenki o kariraremasu ka", meaning: "可以借充电器吗？" },
  { id: "phone-screen-broken", category: "手机网络", japanese: "スマホの画面が割れました", kana: "すまほのがめんがわれました", romaji: "sumaho no gamen ga waremashita", meaning: "手机屏幕碎了。" },

  { id: "help", category: "紧急求助", japanese: "助けてください", kana: "たすけてください", romaji: "tasukete kudasai", meaning: "请帮帮我。" },
  { id: "lost", category: "紧急求助", japanese: "道に迷いました", kana: "みちにまよいました", romaji: "michi ni mayoimashita", meaning: "我迷路了。" },
  { id: "hospital", category: "紧急求助", japanese: "病院へ行きたいです", kana: "びょういんへいきたいです", romaji: "byouin e ikitai desu", meaning: "我想去医院。" },
  { id: "police", category: "紧急求助", japanese: "警察を呼んでください", kana: "けいさつをよんでください", romaji: "keisatsu o yonde kudasai", meaning: "请叫警察。" },
  { id: "stomach", category: "紧急求助", japanese: "お腹が痛いです", kana: "おなかがいたいです", romaji: "onaka ga itai desu", meaning: "我肚子痛。" },
  { id: "phone", category: "紧急求助", japanese: "電話を貸してください", kana: "でんわをかしてください", romaji: "denwa o kashite kudasai", meaning: "请借我电话。" },

  { id: "question", category: "课堂学习", japanese: "質問があります", kana: "しつもんがあります", romaji: "shitsumon ga arimasu", meaning: "我有问题。" },
  { id: "again", category: "课堂学习", japanese: "もう一度お願いします", kana: "もういちどおねがいします", romaji: "mou ichido onegaishimasu", meaning: "请再说一遍。" },
  { id: "slowly", category: "课堂学习", japanese: "ゆっくり話してください", kana: "ゆっくりはなしてください", romaji: "yukkuri hanashite kudasai", meaning: "请慢点说。" },
  { id: "understand", category: "课堂学习", japanese: "分かりました", kana: "わかりました", romaji: "wakarimashita", meaning: "我明白了。" },
  { id: "dont-understand", category: "课堂学习", japanese: "分かりません", kana: "わかりません", romaji: "wakarimasen", meaning: "我不明白。" },
  { id: "how-read", category: "课堂学习", japanese: "これは何と読みますか", kana: "これはなんとよみますか", romaji: "kore wa nan to yomimasu ka", meaning: "这个怎么读？" },
];

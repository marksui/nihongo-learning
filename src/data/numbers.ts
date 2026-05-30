export const numberGroups = [
  "基础数字",
  "十位百位",
  "千位万位",
  "价格金额",
  "日期时间",
  "人数年龄",
  "楼层序号",
  "电话编号",
] as const;

export type NumberGroup = (typeof numberGroups)[number];

export interface NumberExample {
  id: string;
  group: NumberGroup;
  display: string;
  japanese: string;
  kana: string;
  romaji: string;
  meaning: string;
  note?: string;
}

export const numberExamples: NumberExample[] = [
  { id: "zero", group: "基础数字", display: "0", japanese: "ゼロ", kana: "ぜろ", romaji: "zero", meaning: "零", note: "也可读 れい，多用于编号、温度等。" },
  { id: "one", group: "基础数字", display: "1", japanese: "一", kana: "いち", romaji: "ichi", meaning: "一" },
  { id: "two", group: "基础数字", display: "2", japanese: "二", kana: "に", romaji: "ni", meaning: "二" },
  { id: "three", group: "基础数字", display: "3", japanese: "三", kana: "さん", romaji: "san", meaning: "三" },
  { id: "four", group: "基础数字", display: "4", japanese: "四", kana: "よん / し", romaji: "yon / shi", meaning: "四", note: "单独数数常用 よん；四月读 しがつ，四点读 よじ。" },
  { id: "five", group: "基础数字", display: "5", japanese: "五", kana: "ご", romaji: "go", meaning: "五" },
  { id: "six", group: "基础数字", display: "6", japanese: "六", kana: "ろく", romaji: "roku", meaning: "六" },
  { id: "seven", group: "基础数字", display: "7", japanese: "七", kana: "なな / しち", romaji: "nana / shichi", meaning: "七", note: "单独数数常用 なな；七月读 しちがつ，七点读 しちじ。" },
  { id: "eight", group: "基础数字", display: "8", japanese: "八", kana: "はち", romaji: "hachi", meaning: "八" },
  { id: "nine", group: "基础数字", display: "9", japanese: "九", kana: "きゅう / く", romaji: "kyuu / ku", meaning: "九", note: "单独数数常用 きゅう；九月读 くがつ，九点读 くじ。" },
  { id: "ten", group: "基础数字", display: "10", japanese: "十", kana: "じゅう", romaji: "juu", meaning: "十" },

  { id: "eleven", group: "十位百位", display: "11", japanese: "十一", kana: "じゅういち", romaji: "juuichi", meaning: "十一" },
  { id: "twenty", group: "十位百位", display: "20", japanese: "二十", kana: "にじゅう", romaji: "nijuu", meaning: "二十" },
  { id: "twenty-one", group: "十位百位", display: "21", japanese: "二十一", kana: "にじゅういち", romaji: "nijuuichi", meaning: "二十一" },
  { id: "thirty-four", group: "十位百位", display: "34", japanese: "三十四", kana: "さんじゅうよん", romaji: "sanjuu yon", meaning: "三十四", note: "34 通常读 よん，不读 し。" },
  { id: "ninety-nine", group: "十位百位", display: "99", japanese: "九十九", kana: "きゅうじゅうきゅう", romaji: "kyuujuu kyuu", meaning: "九十九" },
  { id: "hundred", group: "十位百位", display: "100", japanese: "百", kana: "ひゃく", romaji: "hyaku", meaning: "一百" },
  { id: "three-hundred", group: "十位百位", display: "300", japanese: "三百", kana: "さんびゃく", romaji: "sanbyaku", meaning: "三百", note: "注意浊音：ひゃく 变成 びゃく。" },
  { id: "six-hundred", group: "十位百位", display: "600", japanese: "六百", kana: "ろっぴゃく", romaji: "roppyaku", meaning: "六百", note: "促音：ろく + ひゃく → ろっぴゃく。" },
  { id: "eight-hundred", group: "十位百位", display: "800", japanese: "八百", kana: "はっぴゃく", romaji: "happyaku", meaning: "八百", note: "促音：はち + ひゃく → はっぴゃく。" },

  { id: "thousand", group: "千位万位", display: "1,000", japanese: "千", kana: "せん", romaji: "sen", meaning: "一千" },
  { id: "three-thousand", group: "千位万位", display: "3,000", japanese: "三千", kana: "さんぜん", romaji: "sanzen", meaning: "三千", note: "注意浊音：せん 变成 ぜん。" },
  { id: "eight-thousand", group: "千位万位", display: "8,000", japanese: "八千", kana: "はっせん", romaji: "hassen", meaning: "八千", note: "促音：はち + せん → はっせん。" },
  { id: "ten-thousand", group: "千位万位", display: "10,000", japanese: "一万", kana: "いちまん", romaji: "ichiman", meaning: "一万", note: "日语按万进位，中文用户很容易上手。" },
  { id: "twenty-thousand", group: "千位万位", display: "20,000", japanese: "二万", kana: "にまん", romaji: "niman", meaning: "两万" },
  { id: "one-hundred-thousand", group: "千位万位", display: "100,000", japanese: "十万", kana: "じゅうまん", romaji: "juuman", meaning: "十万" },
  { id: "one-million", group: "千位万位", display: "1,000,000", japanese: "百万", kana: "ひゃくまん", romaji: "hyakuman", meaning: "一百万" },
  { id: "year-number", group: "千位万位", display: "2,026", japanese: "二千二十六", kana: "にせんにじゅうろく", romaji: "nisen nijuu roku", meaning: "二千零二十六", note: "日语大数中间通常不读“零”。" },
  { id: "random-large", group: "千位万位", display: "12,345", japanese: "一万二千三百四十五", kana: "いちまんにせんさんびゃくよんじゅうご", romaji: "ichiman nisen sanbyaku yonjuu go", meaning: "一万二千三百四十五" },

  { id: "yen-100", group: "价格金额", display: "100円", japanese: "百円", kana: "ひゃくえん", romaji: "hyaku en", meaning: "100 日元" },
  { id: "yen-300", group: "价格金额", display: "300円", japanese: "三百円", kana: "さんびゃくえん", romaji: "sanbyaku en", meaning: "300 日元" },
  { id: "yen-680", group: "价格金额", display: "680円", japanese: "六百八十円", kana: "ろっぴゃくはちじゅうえん", romaji: "roppyaku hachijuu en", meaning: "680 日元" },
  { id: "yen-1980", group: "价格金额", display: "1,980円", japanese: "千九百八十円", kana: "せんきゅうひゃくはちじゅうえん", romaji: "sen kyuuhyaku hachijuu en", meaning: "1,980 日元" },
  { id: "yen-12500", group: "价格金额", display: "12,500円", japanese: "一万二千五百円", kana: "いちまんにせんごひゃくえん", romaji: "ichiman nisen gohyaku en", meaning: "12,500 日元" },
  { id: "yen-question", group: "价格金额", display: "多少钱？", japanese: "いくらですか", kana: "いくらですか", romaji: "ikura desu ka", meaning: "多少钱？" },

  { id: "time-4", group: "日期时间", display: "4:00", japanese: "四時", kana: "よじ", romaji: "yoji", meaning: "四点", note: "时间里的 4 点读 よじ，不读 よんじ。" },
  { id: "time-7", group: "日期时间", display: "7:00", japanese: "七時", kana: "しちじ", romaji: "shichiji", meaning: "七点" },
  { id: "time-9", group: "日期时间", display: "9:00", japanese: "九時", kana: "くじ", romaji: "kuji", meaning: "九点" },
  { id: "time-730", group: "日期时间", display: "7:30", japanese: "七時半", kana: "しちじはん", romaji: "shichiji han", meaning: "七点半" },
  { id: "date-april", group: "日期时间", display: "4月", japanese: "四月", kana: "しがつ", romaji: "shigatsu", meaning: "四月" },
  { id: "date-july", group: "日期时间", display: "7月", japanese: "七月", kana: "しちがつ", romaji: "shichigatsu", meaning: "七月" },
  { id: "date-september", group: "日期时间", display: "9月", japanese: "九月", kana: "くがつ", romaji: "kugatsu", meaning: "九月" },
  { id: "date-14", group: "日期时间", display: "14日", japanese: "十四日", kana: "じゅうよっか", romaji: "juuyokka", meaning: "十四号", note: "日期读法特殊，不是 じゅうよんにち。" },

  { id: "people-one", group: "人数年龄", display: "1人", japanese: "一人", kana: "ひとり", romaji: "hitori", meaning: "一个人" },
  { id: "people-two", group: "人数年龄", display: "2人", japanese: "二人", kana: "ふたり", romaji: "futari", meaning: "两个人" },
  { id: "people-three", group: "人数年龄", display: "3人", japanese: "三人", kana: "さんにん", romaji: "sannin", meaning: "三个人" },
  { id: "age-one", group: "人数年龄", display: "1岁", japanese: "一歳", kana: "いっさい", romaji: "issai", meaning: "一岁" },
  { id: "age-eight", group: "人数年龄", display: "8岁", japanese: "八歳", kana: "はっさい", romaji: "hassai", meaning: "八岁" },
  { id: "age-twenty", group: "人数年龄", display: "20岁", japanese: "二十歳", kana: "はたち", romaji: "hatachi", meaning: "二十岁", note: "20 岁有特殊读法 はたち。" },

  { id: "floor-one", group: "楼层序号", display: "1楼", japanese: "一階", kana: "いっかい", romaji: "ikkai", meaning: "一楼" },
  { id: "floor-three", group: "楼层序号", display: "3楼", japanese: "三階", kana: "さんがい", romaji: "sangai", meaning: "三楼", note: "楼层的 3 楼读 さんがい。" },
  { id: "floor-six", group: "楼层序号", display: "6楼", japanese: "六階", kana: "ろっかい", romaji: "rokkai", meaning: "六楼" },
  { id: "floor-eight", group: "楼层序号", display: "8楼", japanese: "八階", kana: "はっかい", romaji: "hakkai", meaning: "八楼" },
  { id: "first", group: "楼层序号", display: "第1", japanese: "一番目", kana: "いちばんめ", romaji: "ichibanme", meaning: "第一个" },
  { id: "second-corner", group: "楼层序号", display: "第2个路口", japanese: "二つ目の角", kana: "ふたつめのかど", romaji: "futatsume no kado", meaning: "第二个路口" },

  { id: "phone-zero", group: "电话编号", display: "090", japanese: "ゼロ九ゼロ", kana: "ぜろきゅうぜろ", romaji: "zero kyuu zero", meaning: "090", note: "电话号码通常逐位读。" },
  { id: "phone-110", group: "电话编号", display: "110", japanese: "一一〇", kana: "いちいちぜろ", romaji: "ichi ichi zero", meaning: "110" },
  { id: "room-305", group: "电话编号", display: "305号室", japanese: "三百五号室", kana: "さんびゃくごごうしつ", romaji: "sanbyaku go goushitsu", meaning: "305 号房" },
  { id: "postal", group: "电话编号", display: "〒160-0022", japanese: "一六〇の〇〇二二", kana: "いちろくぜろのぜろぜろにに", romaji: "ichi roku zero no zero zero ni ni", meaning: "邮编 160-0022" },
];

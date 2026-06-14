import { useRef, useState } from "react";
import { kanaItems, type KanaItem } from "../data/kana";
import { recordSeenContent } from "../utils/progress";
import { formatRomajiReading } from "../utils/romaji";

interface QuickReadPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

type KanaScript = "hiragana" | "katakana";
type KanaCell = string | null;
type QuickReadView = "basic" | "extra" | "numbers" | "time" | "phrases";

interface QuickReadItem {
  id: string;
  label: string;
  japanese: string;
  kana: string;
  romaji: string;
  meaning: string;
  audioText?: string;
}

interface QuickReadSection {
  id: string;
  title: string;
  subtitle: string;
  items: QuickReadItem[];
}

interface QuickReadViewMeta {
  id: QuickReadView;
  label: string;
  detail: string;
  count: string;
}

const kanaRows: KanaCell[][] = [
  ["n", "wa", "ra", "ya", "ma", "ha", "na", "ta", "sa", "ka", "a"],
  [null, null, "ri", null, "mi", "hi", "ni", "chi", "shi", "ki", "i"],
  [null, null, "ru", "yu", "mu", "fu", "nu", "tsu", "su", "ku", "u"],
  [null, null, "re", null, "me", "he", "ne", "te", "se", "ke", "e"],
  ["wo", null, "ro", "yo", "mo", "ho", "no", "to", "so", "ko", "o"],
];

const kanaById = new Map(kanaItems.map((item) => [item.id, item]));

const getRomajiLabel = (item: KanaItem) => {
  if (item.id === "wo") {
    return "O";
  }

  return item.romaji.toUpperCase();
};

const getKanaText = (item: KanaItem, script: KanaScript) =>
  script === "hiragana" ? item.hiragana : item.katakana;

const extensionGroupMeta = [
  { group: "浊音", title: "DAKUON", subtitle: "浊音：が・ざ・だ・ば 行" },
  { group: "半浊音", title: "HANDAKUON", subtitle: "半浊音：ぱ 行" },
  { group: "拗音", title: "YOUON", subtitle: "拗音：きゃ・しゃ・ちゃ 等" },
  { group: "促音・长音", title: "SPECIAL SOUNDS", subtitle: "促音和长音：小 っ 与 ー" },
] as const;

const kanaExtensionSections: QuickReadSection[] = extensionGroupMeta.map(({ group, title, subtitle }) => ({
  id: `kana-${group}`,
  title,
  subtitle,
  items: kanaItems
    .filter((item) => item.group === group)
    .map((item) => ({
      id: item.id,
      label: item.example.word,
      japanese: `${item.hiragana} / ${item.katakana}`,
      kana: item.example.kana,
      romaji: `${item.romaji} / ${item.example.romaji}`,
      meaning: item.example.meaning,
      audioText: item.audioText ?? item.hiragana,
    })),
}));

const quickReadSections: QuickReadSection[] = [
  {
    id: "basic-numbers",
    title: "NUMBERS",
    subtitle: "基础数字",
    items: [
      { id: "n0", label: "0", japanese: "ゼロ", kana: "ゼロ / れい", romaji: "zero / rei", meaning: "零" },
      { id: "n1", label: "1", japanese: "一", kana: "いち", romaji: "ichi", meaning: "一" },
      { id: "n2", label: "2", japanese: "二", kana: "に", romaji: "ni", meaning: "二" },
      { id: "n3", label: "3", japanese: "三", kana: "さん", romaji: "san", meaning: "三" },
      { id: "n4", label: "4", japanese: "四", kana: "よん / し", romaji: "yon / shi", meaning: "四" },
      { id: "n5", label: "5", japanese: "五", kana: "ご", romaji: "go", meaning: "五" },
      { id: "n6", label: "6", japanese: "六", kana: "ろく", romaji: "roku", meaning: "六" },
      { id: "n7", label: "7", japanese: "七", kana: "なな / しち", romaji: "nana / shichi", meaning: "七" },
      { id: "n8", label: "8", japanese: "八", kana: "はち", romaji: "hachi", meaning: "八" },
      { id: "n9", label: "9", japanese: "九", kana: "きゅう / く", romaji: "kyuu / ku", meaning: "九" },
      { id: "n10", label: "10", japanese: "十", kana: "じゅう", romaji: "juu", meaning: "十" },
      { id: "n11", label: "11", japanese: "十一", kana: "じゅういち", romaji: "juu ichi", meaning: "十一" },
      { id: "n12", label: "12", japanese: "十二", kana: "じゅうに", romaji: "juu ni", meaning: "十二" },
      { id: "n20", label: "20", japanese: "二十", kana: "にじゅう", romaji: "ni juu", meaning: "二十" },
      { id: "n21", label: "21", japanese: "二十一", kana: "にじゅういち", romaji: "ni juu ichi", meaning: "二十一" },
    ],
  },
  {
    id: "large-numbers",
    title: "LARGE NUMBERS",
    subtitle: "复杂数字",
    items: [
      { id: "n30", label: "30", japanese: "三十", kana: "さんじゅう", romaji: "san juu", meaning: "三十" },
      { id: "n100", label: "100", japanese: "百", kana: "ひゃく", romaji: "hyaku", meaning: "一百" },
      { id: "n300", label: "300", japanese: "三百", kana: "さんびゃく", romaji: "san byaku", meaning: "三百" },
      { id: "n600", label: "600", japanese: "六百", kana: "ろっぴゃく", romaji: "roppyaku", meaning: "六百" },
      { id: "n800", label: "800", japanese: "八百", kana: "はっぴゃく", romaji: "happyaku", meaning: "八百" },
      { id: "n1000", label: "1000", japanese: "千", kana: "せん", romaji: "sen", meaning: "一千" },
      { id: "n3000", label: "3000", japanese: "三千", kana: "さんぜん", romaji: "san zen", meaning: "三千" },
      { id: "n8000", label: "8000", japanese: "八千", kana: "はっせん", romaji: "hassen", meaning: "八千" },
      { id: "n10000", label: "1万", japanese: "一万", kana: "いちまん", romaji: "ichi man", meaning: "一万" },
      { id: "n100000", label: "10万", japanese: "十万", kana: "じゅうまん", romaji: "juu man", meaning: "十万" },
      { id: "n1000000", label: "100万", japanese: "百万", kana: "ひゃくまん", romaji: "hyaku man", meaning: "一百万" },
      { id: "n100000000", label: "1億", japanese: "一億", kana: "いちおく", romaji: "ichi oku", meaning: "一亿" },
    ],
  },
  {
    id: "months",
    title: "MONTHS",
    subtitle: "月份",
    items: [
      { id: "m1", label: "1月", japanese: "一月", kana: "いちがつ", romaji: "ichi gatsu", meaning: "一月" },
      { id: "m2", label: "2月", japanese: "二月", kana: "にがつ", romaji: "ni gatsu", meaning: "二月" },
      { id: "m3", label: "3月", japanese: "三月", kana: "さんがつ", romaji: "san gatsu", meaning: "三月" },
      { id: "m4", label: "4月", japanese: "四月", kana: "しがつ", romaji: "shi gatsu", meaning: "四月" },
      { id: "m5", label: "5月", japanese: "五月", kana: "ごがつ", romaji: "go gatsu", meaning: "五月" },
      { id: "m6", label: "6月", japanese: "六月", kana: "ろくがつ", romaji: "roku gatsu", meaning: "六月" },
      { id: "m7", label: "7月", japanese: "七月", kana: "しちがつ", romaji: "shichi gatsu", meaning: "七月" },
      { id: "m8", label: "8月", japanese: "八月", kana: "はちがつ", romaji: "hachi gatsu", meaning: "八月" },
      { id: "m9", label: "9月", japanese: "九月", kana: "くがつ", romaji: "ku gatsu", meaning: "九月" },
      { id: "m10", label: "10月", japanese: "十月", kana: "じゅうがつ", romaji: "juu gatsu", meaning: "十月" },
      { id: "m11", label: "11月", japanese: "十一月", kana: "じゅういちがつ", romaji: "juu ichi gatsu", meaning: "十一月" },
      { id: "m12", label: "12月", japanese: "十二月", kana: "じゅうにがつ", romaji: "juu ni gatsu", meaning: "十二月" },
    ],
  },
  {
    id: "dates",
    title: "DATES",
    subtitle: "日期重点读法",
    items: [
      { id: "d1", label: "1日", japanese: "一日", kana: "ついたち", romaji: "tsuitachi", meaning: "一号" },
      { id: "d2", label: "2日", japanese: "二日", kana: "ふつか", romaji: "futsuka", meaning: "二号" },
      { id: "d3", label: "3日", japanese: "三日", kana: "みっか", romaji: "mikka", meaning: "三号" },
      { id: "d4", label: "4日", japanese: "四日", kana: "よっか", romaji: "yokka", meaning: "四号" },
      { id: "d5", label: "5日", japanese: "五日", kana: "いつか", romaji: "itsuka", meaning: "五号" },
      { id: "d6", label: "6日", japanese: "六日", kana: "むいか", romaji: "muika", meaning: "六号" },
      { id: "d7", label: "7日", japanese: "七日", kana: "なのか", romaji: "nanoka", meaning: "七号" },
      { id: "d8", label: "8日", japanese: "八日", kana: "ようか", romaji: "youka", meaning: "八号" },
      { id: "d9", label: "9日", japanese: "九日", kana: "ここのか", romaji: "kokonoka", meaning: "九号" },
      { id: "d10", label: "10日", japanese: "十日", kana: "とおか", romaji: "tooka", meaning: "十号" },
      { id: "d14", label: "14日", japanese: "十四日", kana: "じゅうよっか", romaji: "juu yokka", meaning: "十四号" },
      { id: "d20", label: "20日", japanese: "二十日", kana: "はつか", romaji: "hatsuka", meaning: "二十号" },
      { id: "d24", label: "24日", japanese: "二十四日", kana: "にじゅうよっか", romaji: "ni juu yokka", meaning: "二十四号" },
      { id: "d31", label: "31日", japanese: "三十一日", kana: "さんじゅういちにち", romaji: "san juu ichi nichi", meaning: "三十一号" },
    ],
  },
  {
    id: "week-time",
    title: "WEEK & TIME",
    subtitle: "星期和基础时间",
    items: [
      { id: "mon", label: "月", japanese: "月曜日", kana: "げつようび", romaji: "getsu you bi", meaning: "星期一" },
      { id: "tue", label: "火", japanese: "火曜日", kana: "かようび", romaji: "ka you bi", meaning: "星期二" },
      { id: "wed", label: "水", japanese: "水曜日", kana: "すいようび", romaji: "sui you bi", meaning: "星期三" },
      { id: "thu", label: "木", japanese: "木曜日", kana: "もくようび", romaji: "moku you bi", meaning: "星期四" },
      { id: "fri", label: "金", japanese: "金曜日", kana: "きんようび", romaji: "kin you bi", meaning: "星期五" },
      { id: "sat", label: "土", japanese: "土曜日", kana: "どようび", romaji: "do you bi", meaning: "星期六" },
      { id: "sun", label: "日", japanese: "日曜日", kana: "にちようび", romaji: "nichi you bi", meaning: "星期日" },
      { id: "today", label: "今天", japanese: "今日", kana: "きょう", romaji: "kyou", meaning: "今天" },
      { id: "tomorrow", label: "明天", japanese: "明日", kana: "あした", romaji: "ashita", meaning: "明天" },
      { id: "yesterday", label: "昨天", japanese: "昨日", kana: "きのう", romaji: "kinou", meaning: "昨天" },
      { id: "morning", label: "早上", japanese: "朝", kana: "あさ", romaji: "asa", meaning: "早上" },
      { id: "night", label: "晚上", japanese: "夜", kana: "よる", romaji: "yoru", meaning: "晚上" },
    ],
  },
];

const quickPhraseSections: QuickReadSection[] = [
  {
    id: "daily-greetings",
    title: "GREETINGS",
    subtitle: "问候与礼貌",
    items: [
      { id: "ohayou", label: "早上", japanese: "おはようございます", kana: "おはようございます", romaji: "ohayou gozaimasu", meaning: "早上好" },
      { id: "konnichiwa", label: "白天", japanese: "こんにちは", kana: "こんにちは", romaji: "konnichiwa", meaning: "你好" },
      { id: "konbanwa", label: "晚上", japanese: "こんばんは", kana: "こんばんは", romaji: "konbanwa", meaning: "晚上好" },
      { id: "arigatou", label: "感谢", japanese: "ありがとうございます", kana: "ありがとうございます", romaji: "arigatou gozaimasu", meaning: "谢谢" },
      { id: "sumimasen", label: "打扰", japanese: "すみません", kana: "すみません", romaji: "sumimasen", meaning: "不好意思" },
      { id: "onegaishimasu", label: "请求", japanese: "お願いします", kana: "おねがいします", romaji: "onegai shimasu", meaning: "拜托了" },
      { id: "hai", label: "肯定", japanese: "はい", kana: "はい", romaji: "hai", meaning: "是" },
      { id: "iie", label: "否定", japanese: "いいえ", kana: "いいえ", romaji: "iie", meaning: "不是" },
    ],
  },
  {
    id: "classroom-phrases",
    title: "CLASSROOM",
    subtitle: "课堂跟读",
    items: [
      { id: "mou-ichido", label: "再一次", japanese: "もう一度お願いします", kana: "もういちどおねがいします", romaji: "mou ichido onegai shimasu", meaning: "请再说一次" },
      { id: "yukkuri", label: "慢一点", japanese: "ゆっくりお願いします", kana: "ゆっくりおねがいします", romaji: "yukkuri onegai shimasu", meaning: "请慢一点" },
      { id: "wakarimasu", label: "明白", japanese: "わかります", kana: "わかります", romaji: "wakarimasu", meaning: "我明白" },
      { id: "wakarimasen", label: "不懂", japanese: "わかりません", kana: "わかりません", romaji: "wakarimasen", meaning: "我不明白" },
      { id: "daijoubu", label: "可以", japanese: "大丈夫です", kana: "だいじょうぶです", romaji: "daijoubu desu", meaning: "没关系 / 可以" },
      { id: "kore-kudasai", label: "购买", japanese: "これをください", kana: "これをください", romaji: "kore o kudasai", meaning: "请给我这个" },
      { id: "ikura", label: "价格", japanese: "いくらですか", kana: "いくらですか", romaji: "ikura desu ka", meaning: "多少钱" },
      { id: "doko", label: "位置", japanese: "どこですか", kana: "どこですか", romaji: "doko desu ka", meaning: "在哪里" },
    ],
  },
];

const numberQuickReadSections = quickReadSections.filter((section) =>
  ["basic-numbers", "large-numbers"].includes(section.id),
);

const timeQuickReadSections = quickReadSections.filter((section) =>
  ["months", "dates", "week-time"].includes(section.id),
);

const quickReadViews: QuickReadViewMeta[] = [
  { id: "basic", label: "基础假名", detail: "平假名 / 片假名", count: "2 表" },
  { id: "extra", label: "浊音拗音", detail: "浊音、半浊音、拗音", count: `${kanaExtensionSections.length} 组` },
  { id: "numbers", label: "数字速读", detail: "数字和大数字", count: `${numberQuickReadSections.length} 组` },
  { id: "time", label: "日期时间", detail: "月份、日期、星期", count: `${timeQuickReadSections.length} 组` },
  { id: "phrases", label: "常用短句", detail: "问候和课堂句", count: `${quickPhraseSections.reduce((total, section) => total + section.items.length, 0)} 句` },
];

interface KanaPosterSectionProps {
  activeKey: string | null;
  script: KanaScript;
  subtitle: string;
  title: string;
  onPlay: (key: string, text: string) => void;
}

const KanaPosterSection = ({ activeKey, script, subtitle, title, onPlay }: KanaPosterSectionProps) => {
  return (
    <section aria-labelledby={`${script}-title`} className="space-y-3">
      <div className="text-center">
        <h1
          id={`${script}-title`}
          className="text-4xl font-extrabold leading-none text-ink sm:text-5xl"
        >
          {title}
        </h1>
        <p className="mt-1 text-base font-semibold text-ink/72 sm:text-lg">{subtitle}</p>
      </div>

      <div className="grid min-w-0 grid-cols-6 gap-1.5 sm:grid-cols-[repeat(11,minmax(0,1fr))] sm:gap-2">
        {kanaRows.flatMap((row, rowIndex) =>
          row.map((id, columnIndex) => {
            if (!id) {
              return (
                <div
                  key={`${script}-${rowIndex}-${columnIndex}-blank`}
                  aria-hidden="true"
                  className="hidden min-h-14 min-w-0 sm:block sm:min-h-16"
                />
              );
            }

            const item = kanaById.get(id);
            if (!item) {
              return null;
            }

            const kana = getKanaText(item, script);
            const key = `${script}-${item.id}`;
            const active = activeKey === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => onPlay(key, kana)}
                aria-pressed={active}
                className={`group grid min-h-16 min-w-0 cursor-pointer place-items-center rounded-md border px-1 py-1.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] transition duration-200 active:scale-95 sm:min-h-16 sm:px-0.5 sm:py-1 ${
                  active
                    ? "border-yuzu/70 bg-yuzu/25 text-ink ring-2 ring-yuzu/30"
                    : "border-ink/10 bg-rice/40 text-ink hover:border-yuzu/40 hover:bg-yuzu/10"
                }`}
                aria-label={`朗读 ${kana} ${getRomajiLabel(item)}`}
                title={`朗读 ${kana}`}
              >
                <span className="block min-w-0 font-japanese text-2xl font-bold leading-none sm:text-3xl md:text-4xl">
                  {kana}
                </span>
                <span
                  className={`mt-1 block min-w-0 font-reading text-[0.62rem] font-extrabold leading-none sm:text-sm ${
                    active ? "text-matcha" : "text-ink/58 group-hover:text-matcha"
                  }`}
                >
                  {getRomajiLabel(item)}
                </span>
              </button>
            );
          }),
        )}
      </div>
    </section>
  );
};

interface QuickReadTableSectionProps {
  activeKey: string | null;
  section: QuickReadSection;
  onPlay: (key: string, text: string) => void;
}

const QuickReadTableSection = ({ activeKey, section, onPlay }: QuickReadTableSectionProps) => {
  return (
    <section aria-labelledby={`${section.id}-title`} className="space-y-4">
      <div className="text-center">
        <h2 id={`${section.id}-title`} className="text-3xl font-extrabold leading-none text-ink sm:text-4xl">
          {section.title}
        </h2>
        <p className="mt-1 text-sm font-semibold text-ink/68 sm:text-base">{section.subtitle}</p>
      </div>

      <div className="grid min-w-0 grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {section.items.map((item) => {
          const key = `${section.id}-${item.id}`;
          const active = activeKey === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onPlay(key, item.audioText ?? item.kana.split(" / ")[0])}
              aria-pressed={active}
              className={`group grid min-h-36 min-w-0 cursor-pointer grid-rows-[auto_1fr_auto_auto_auto] rounded-md border px-3 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.68)] transition active:scale-95 sm:min-h-40 ${
                active
                  ? "border-yuzu/70 bg-yuzu/24 ring-2 ring-yuzu/30"
                  : "border-ink/10 bg-rice/45 hover:border-yuzu/40 hover:bg-yuzu/10"
              }`}
              aria-label={`朗读 ${item.label} ${item.kana}`}
              title={`朗读 ${item.japanese}`}
            >
              <span className="block truncate text-sm font-extrabold text-ink/58">{item.label}</span>
              <span className={`mt-2 flex items-center justify-center break-words font-japanese text-3xl font-bold leading-tight sm:text-4xl ${active ? "text-matcha" : "text-ink"}`}>
                {item.japanese}
              </span>
              <span className="mt-2 block break-words text-sm font-bold leading-5 text-ink/70">{item.kana}</span>
              <span className={`mt-1 block break-words font-reading text-xs font-extrabold leading-5 ${active ? "text-matcha" : "text-sakura/85"}`}>
                {formatRomajiReading(item.romaji)}
              </span>
              <span className="mt-2 block truncate text-sm font-extrabold text-ink/62">{item.meaning}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

const QuickReadPage = ({ onSpeak }: QuickReadPageProps) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<QuickReadView>("basic");
  const playRunRef = useRef(0);
  const activeViewMeta = quickReadViews.find((view) => view.id === activeView) ?? quickReadViews[0];
  const activeSections =
    activeView === "extra"
      ? kanaExtensionSections
      : activeView === "numbers"
        ? numberQuickReadSections
        : activeView === "time"
          ? timeQuickReadSections
          : activeView === "phrases"
            ? quickPhraseSections
            : [];

  const playQuickRead = async (key: string, text: string) => {
    const runId = playRunRef.current + 1;
    playRunRef.current = runId;
    setActiveKey(key);
    recordSeenContent(`quickread:${key}`);

    const ok = await onSpeak(text);
    window.setTimeout(
      () => {
        if (playRunRef.current === runId) {
          setActiveKey(null);
        }
      },
      ok ? 180 : 900,
    );
  };

  return (
    <div className="space-y-4">
      <section className="sticky top-[4.5rem] z-20 max-h-[calc(100vh-8.5rem)] overflow-y-auto rounded-lg border border-ink/10 bg-paper/95 p-3 shadow-card backdrop-blur md:top-24">
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">{activeViewMeta.label}</h1>
          </div>
          <p className="text-sm font-bold text-ink/58">{activeViewMeta.count}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {quickReadViews.map((view) => {
            const active = activeView === view.id;

            return (
              <button
                key={view.id}
                type="button"
                onClick={() => {
                  setActiveView(view.id);
                  setActiveKey(null);
                }}
                aria-pressed={active}
                className={`min-h-14 cursor-pointer rounded-md border px-3 py-2 text-left transition active:scale-[0.99] ${
                  active
                    ? "border-matcha bg-matcha text-white shadow-card"
                    : "border-ink/10 bg-rice/45 text-ink hover:border-matcha/25 hover:bg-rice/70"
                }`}
              >
                <span className="block text-sm font-extrabold">{view.label}</span>
                <span className={`mt-0.5 block truncate text-xs font-bold ${active ? "text-white/78" : "text-ink/52"}`}>
                  {view.detail}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <article className="mx-auto w-full max-w-[22rem] overflow-hidden rounded-lg border border-ink/10 bg-paper px-2.5 py-7 shadow-card sm:max-w-5xl sm:px-8 sm:py-9">
        <div className="space-y-9 sm:space-y-10">
          {activeView === "basic" ? (
            <>
              <KanaPosterSection
                title="HIRAGANA"
                subtitle="ひらがな"
                script="hiragana"
                activeKey={activeKey}
                onPlay={(key, text) => void playQuickRead(key, text)}
              />

              <div className="h-px bg-ink/10" />

              <KanaPosterSection
                title="KATAKANA"
                subtitle="カタカナ"
                script="katakana"
                activeKey={activeKey}
                onPlay={(key, text) => void playQuickRead(key, text)}
              />
            </>
          ) : null}

          {activeView === "extra" ? kanaExtensionSections.map((section, index) => (
            <div key={section.id} className="space-y-9 sm:space-y-10">
              {index ? <div className="h-px bg-ink/10" /> : null}
              <QuickReadTableSection
                activeKey={activeKey}
                section={section}
                onPlay={(key, text) => void playQuickRead(key, text)}
              />
            </div>
          )) : null}

          {activeView !== "basic" && activeView !== "extra" ? activeSections.map((section, index) => (
            <div key={section.id} className="space-y-9 sm:space-y-10">
              {index ? <div className="h-px bg-ink/10" /> : null}
              <QuickReadTableSection
                activeKey={activeKey}
                section={section}
                onPlay={(key, text) => void playQuickRead(key, text)}
              />
            </div>
          )) : null}
        </div>
      </article>
    </div>
  );
};

export default QuickReadPage;

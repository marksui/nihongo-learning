import { Grid3X3 } from "lucide-react";
import KanaCard from "../components/KanaCard";
import PageHero from "../components/PageHero";
import { kanaGroups, kanaItems } from "../data/kana";

interface KanaPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

const KanaPage = ({ onSpeak }: KanaPageProps) => {
  return (
    <div className="space-y-8">
      <PageHero
        accent="matcha"
        eyebrow="Kana"
        icon={Grid3X3}
        title="五十音图"
        description="每张卡同时显示平假名、片假名、罗马音和例词。点击播放按钮可以用浏览器内置日语语音点读发音。"
        stats={[
          { label: "行", value: kanaGroups.length },
          { label: "假名", value: kanaItems.length },
          { label: "点读", value: "ja-JP" },
        ]}
      />

      {kanaGroups.map((group) => {
        const groupItems = kanaItems.filter((item) => item.group === group);

        return (
          <section key={group} className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-ink/10 bg-[#fffdf1]/75 px-4 py-3 shadow-card">
              <h2 className="font-serif text-2xl font-bold text-ink">{group}</h2>
              <div className="h-px flex-1 bg-yuzu/28" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {groupItems.map((item) => (
                <KanaCard key={item.id} item={item} onSpeak={onSpeak} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default KanaPage;

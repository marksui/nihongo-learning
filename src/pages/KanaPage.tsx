import KanaCard from "../components/KanaCard";
import { kanaGroups, kanaItems } from "../data/kana";

interface KanaPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

const KanaPage = ({ onSpeak }: KanaPageProps) => {
  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-black/10 bg-white/88 p-6 shadow-card">
        <p className="text-sm font-bold text-matcha">Kana</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-ink">五十音图</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/70">
          每张卡同时显示平假名、片假名、罗马音和例词。点击播放按钮可以用浏览器内置日语语音练习发音。
        </p>
      </section>

      {kanaGroups.map((group) => {
        const groupItems = kanaItems.filter((item) => item.group === group);

        return (
          <section key={group} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl font-bold text-ink">{group}</h2>
              <div className="h-px flex-1 bg-black/10" />
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

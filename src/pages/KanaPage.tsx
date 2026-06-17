import KanaCard from "../components/KanaCard";
import PageHero from "../components/PageHero";
import { kanaGroupNotes, kanaGroups, kanaItems } from "../data/kana";

interface KanaPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

const KanaPage = ({ onSpeak }: KanaPageProps) => {
  return (
    <div className="space-y-6">
      <PageHero
        title="五十音图"
        description="每张卡同时显示平假名、片假名、罗马音和例词。点击播放按钮就能听发音。"
        stats={[
          { label: "行", value: kanaGroups.length },
          { label: "假名", value: kanaItems.length },
          { label: "发音", value: "日语" },
        ]}
      />

      {kanaGroups.map((group) => {
        const groupItems = kanaItems.filter((item) => item.group === group);
        const note = kanaGroupNotes[group];

        return (
          <section key={group} className="space-y-3">
            <div className="rounded-lg border border-ink/8 bg-paper/70 px-4 py-3">
              <div className="flex items-center gap-3">
                <h2 className="section-title text-xl sm:text-2xl">{group}</h2>
                <div className="h-px flex-1 bg-ink/8" />
              </div>
              {note ? (
                <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                  <div>
                    <p className="text-sm leading-6 text-ink/70">{note.description}</p>
                    <p className="mt-1 break-words text-sm font-extrabold text-matcha">{note.pattern}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {note.examples.map((example) => (
                      <span
                        key={example}
                        className="rounded-md border border-yuzu/28 bg-yuzu/12 px-2 py-1 text-sm font-extrabold text-ink/72"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="readable-card-grid">
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

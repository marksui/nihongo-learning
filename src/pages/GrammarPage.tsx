import { BookOpenCheck, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";
import FilterChips from "../components/FilterChips";
import LessonCard from "../components/LessonCard";
import PageHero from "../components/PageHero";
import { grammarLessons, type GrammarLesson } from "../data/grammar";

interface GrammarPageProps {
  onSpeak: (text: string) => Promise<boolean>;
}

const grammarTopicOptions = ["全部", "助词", "动词", "形容词", "时间", "请求", "比较", "存在", "喜好", "可能"] as const;

type GrammarTopic = (typeof grammarTopicOptions)[number];

const lessonText = (lesson: GrammarLesson) =>
  [
    lesson.title,
    lesson.pattern,
    lesson.patternKana,
    lesson.patternRomaji,
    lesson.explanation,
    ...(lesson.tags ?? []),
    ...lesson.commonMistakes,
    ...lesson.examples.flatMap((example) => [example.japanese, example.kana, example.romaji, example.translation]),
  ]
    .join(" ")
    .toLowerCase();

const lessonMatchesTopic = (lesson: GrammarLesson, topic: GrammarTopic) =>
  topic === "全部" || lessonText(lesson).includes(topic.toLowerCase());

const GrammarPage = ({ onSpeak }: GrammarPageProps) => {
  const [topic, setTopic] = useState<GrammarTopic>("全部");
  const [query, setQuery] = useState("");

  const topicCounts = useMemo(() => {
    return grammarTopicOptions.reduce<Record<GrammarTopic, number>>((counts, option) => {
      counts[option] = option === "全部"
        ? grammarLessons.length
        : grammarLessons.filter((lesson) => lessonMatchesTopic(lesson, option)).length;

      return counts;
    }, {} as Record<GrammarTopic, number>);
  }, []);

  const visibleLessons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return grammarLessons.filter((lesson) => {
      const text = lessonText(lesson);
      const matchesTopic = lessonMatchesTopic(lesson, topic);
      const matchesQuery = !normalizedQuery || text.includes(normalizedQuery);

      return matchesTopic && matchesQuery;
    });
  }, [query, topic]);

  return (
    <div className="space-y-6">
      <PageHero
        accent="sumire"
        eyebrow="Grammar"
        icon={BookOpenCheck}
        title="基础语法"
        description="用中文解释日语句型，例句同时给出日语、假名读法、分隔 romaji 和中文翻译。点击句子可以逐句听发音，并标出中文母语者容易混淆的地方。"
        stats={[
          { label: "课程", value: grammarLessons.length },
          { label: "例句", value: grammarLessons.reduce((sum, lesson) => sum + lesson.examples.length, 0) },
          { label: "读音", value: "动画" },
        ]}
      />

      <section className="rounded-lg border border-ink/10 bg-paper p-4 shadow-card">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <label className="relative block">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/42"
              size={20}
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜助词、动词、て形、できる、例句或中文意思"
              className="min-h-12 w-full rounded-md border border-ink/10 bg-rice/72 pl-11 pr-4 text-sm font-semibold text-ink placeholder:text-ink/38 focus:border-sumire/45 focus:outline-none focus:ring-2 focus:ring-sumire/18"
            />
          </label>
          <p className="text-sm font-bold text-ink/60">
            {visibleLessons.length} / {grammarLessons.length} 课
          </p>
        </div>

        <div className="mt-4">
          <FilterChips
            active={topic}
            counts={topicCounts}
            icon={Sparkles}
            label="语法主题"
            onChange={setTopic}
            options={grammarTopicOptions}
          />
        </div>
      </section>

      <section className="space-y-5">
        {visibleLessons.length ? (
          visibleLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} onSpeak={onSpeak} />
          ))
        ) : (
          <EmptyState title="没有找到语法课" description="换一个关键词，或清空搜索后再看全部课程。" />
        )}
      </section>
    </div>
  );
};

export default GrammarPage;

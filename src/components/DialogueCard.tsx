import {
  CheckCircle2,
  Ear,
  ListMusic,
  Mic2,
  Play,
  Square,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useRef, useState } from "react";
import type { Dialogue } from "../data/dialogues";
import { isContentCompleted, markContentCompleted, readLearningProgress } from "../utils/progress";
import { stopJapanese } from "../utils/speech";
import SpeakButton from "./SpeakButton";

interface DialogueCardProps {
  dialogue: Dialogue;
  onSpeak: (text: string) => Promise<boolean>;
}

const DialogueCard = ({ dialogue, onSpeak }: DialogueCardProps) => {
  const contentId = `dialogue:${dialogue.id}`;
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [nextLine, setNextLine] = useState(0);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [studyState, setStudyState] = useState(() => {
    const progress = readLearningProgress();

    return {
      completed: isContentCompleted(progress, contentId),
    };
  });
  const cancelledRef = useRef(false);

  const partnerSpeakers = Array.from(
    new Set(dialogue.lines.map((line) => line.speaker).filter((speaker) => speaker !== dialogue.practiceSpeaker)),
  );

  const playLine = async (index: number) => {
    cancelledRef.current = false;
    setActiveLine(index);

    const line = dialogue.lines[index];
    const ok = await onSpeak(line.audioText ?? line.japanese);

    if (!cancelledRef.current) {
      setActiveLine(null);
      setNextLine((index + 1) % dialogue.lines.length);
    }

    return ok;
  };

  const playNextLine = async () => {
    if (!isPlayingSequence) {
      await playLine(nextLine);
    }
  };

  const playSequence = async (indexes: number[]) => {
    if (isPlayingSequence) {
      return;
    }

    cancelledRef.current = false;
    setIsPlayingSequence(true);

    for (const index of indexes) {
      if (cancelledRef.current) {
        break;
      }

      setActiveLine(index);
      const line = dialogue.lines[index];
      const ok = await onSpeak(line.audioText ?? line.japanese);

      if (!ok) {
        break;
      }
    }

    setActiveLine(null);
    setIsPlayingSequence(false);
    setNextLine(0);
  };

  const playAll = () => {
    void playSequence(dialogue.lines.map((_, index) => index));
  };

  const playPartnerLines = () => {
    void playSequence(
      dialogue.lines
        .map((line, index) => (line.speaker === dialogue.practiceSpeaker ? null : index))
        .filter((index): index is number => index !== null),
    );
  };

  const playOwnLines = () => {
    void playSequence(
      dialogue.lines
        .map((line, index) => (line.speaker === dialogue.practiceSpeaker ? index : null))
        .filter((index): index is number => index !== null),
    );
  };

  const stopPlayback = () => {
    cancelledRef.current = true;
    stopJapanese();
    setActiveLine(null);
    setIsPlayingSequence(false);
  };

  const markMastered = () => {
    markContentCompleted(contentId);
    setStudyState({ completed: true });
  };

  return (
    <article className="min-w-0 overflow-hidden rounded-lg border border-ink/10 bg-paper/96 shadow-card">
      <div className="border-b border-ink/10 bg-paper p-4 sm:p-5">
        <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-sakura/10 px-2 py-1 text-xs font-bold text-sakura">{dialogue.mode}</span>
              <span className="text-sm font-bold text-matcha">{dialogue.situation}</span>
              {studyState.completed ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-matcha/12 px-2 py-1 text-xs font-extrabold text-matcha">
                  <CheckCircle2 aria-hidden="true" size={14} />
                  已掌握
                </span>
              ) : null}
            </div>
            <h2 className="section-title mt-2 break-words text-2xl sm:text-3xl">{dialogue.title}</h2>

            <div className="mt-4 grid min-w-0 gap-2 sm:grid-cols-2">
              <div className="flex min-w-0 items-center gap-3 rounded-md bg-matcha/10 px-3 py-2">
                <UserRound aria-hidden="true" className="shrink-0 text-matcha" size={18} />
                <div>
                  <p className="text-xs font-bold text-ink/52">我方角色</p>
                  <p className="font-extrabold text-matcha">{dialogue.practiceSpeaker}</p>
                </div>
              </div>
              <div className="flex min-w-0 items-center gap-3 rounded-md bg-sora/12 px-3 py-2">
                <UsersRound aria-hidden="true" className="shrink-0 text-sora" size={18} />
                <div>
                  <p className="text-xs font-bold text-ink/52">对方说</p>
                  <p className="break-words font-extrabold text-sora">{partnerSpeakers.join(" / ")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap xl:justify-end">
            <button
              type="button"
              onClick={playNextLine}
              className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-sumire px-3 py-2 text-sm font-bold text-white transition hover:bg-sumire/90 active:scale-95"
            >
              <ListMusic aria-hidden="true" size={18} />
              逐句
            </button>
            <button
              type="button"
              onClick={playAll}
              className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-matcha px-3 py-2 text-sm font-bold text-white transition hover:bg-matcha/90 active:scale-95"
            >
              <Play aria-hidden="true" size={18} />
              整段
            </button>
            <button
              type="button"
              onClick={playPartnerLines}
              className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-ink/10 bg-rice/45 px-3 py-2 text-sm font-bold text-ink transition hover:bg-yuzu/14 active:scale-95"
            >
              <Ear aria-hidden="true" size={18} />
              只听对方
            </button>
            <button
              type="button"
              onClick={playOwnLines}
              className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-matcha/25 bg-matcha/10 px-3 py-2 text-sm font-bold text-matcha transition hover:bg-matcha hover:text-white active:scale-95"
            >
              <Mic2 aria-hidden="true" size={18} />
              只听我方
            </button>
            <button
              type="button"
              onClick={stopPlayback}
              className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-ink/10 bg-rice/45 px-3 py-2 text-sm font-bold text-ink transition hover:bg-yuzu/14 active:scale-95"
              aria-label="停止播放对话"
              title="停止"
            >
              <Square aria-hidden="true" size={18} />
              停止
            </button>
            <button
              type="button"
              onClick={markMastered}
              disabled={studyState.completed}
              aria-pressed={studyState.completed}
              className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-bold transition active:scale-95 ${
                studyState.completed
                  ? "cursor-default border-matcha/20 bg-matcha/10 text-matcha"
                  : "border-yuzu/30 bg-yuzu/14 text-ink hover:bg-yuzu/24"
              }`}
            >
              <CheckCircle2 aria-hidden="true" size={18} />
              {studyState.completed ? "已掌握" : "标记掌握"}
            </button>
          </div>
        </div>
      </div>

      <div className="relative bg-rice/45 p-3 sm:p-5">
        <div className="absolute left-1/2 top-5 hidden h-[calc(100%-2.5rem)] w-px -translate-x-1/2 bg-black/8 md:block" />
        <div className="space-y-4">
          {dialogue.lines.map((line, index) => {
            const active = activeLine === index;
            const practiceLine = line.speaker === dialogue.practiceSpeaker;

            return (
              <div
                key={`${line.speaker}-${line.japanese}`}
                className={`relative flex ${practiceLine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`w-full rounded-lg border p-3.5 shadow-sm transition duration-300 md:max-w-[76%] ${
                    active
                      ? "scale-[1.01] border-yuzu bg-paper shadow-soft ring-2 ring-yuzu/30"
                      : practiceLine
                        ? "border-matcha/18 bg-matcha/8"
                        : "border-ink/8 bg-paper"
                  }`}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-extrabold ${
                        practiceLine ? "bg-matcha text-white" : "bg-sora text-white"
                      }`}
                    >
                      {practiceLine ? "你说" : "对方说"}
                    </span>
                    <span className="text-sm font-bold text-ink/62">{line.speaker}</span>
                    {active ? (
                      <span className="rounded-md bg-yuzu/24 px-2 py-1 text-xs font-bold text-ink">正在播放</span>
                    ) : null}
                    <SpeakButton
                      active={active}
                      ariaLabel={`播放第 ${index + 1} 句`}
                      className="ml-auto h-10 w-10"
                      onClick={() => playLine(index)}
                      title="播放这一句"
                      variant="light"
                    />
                  </div>

                  <p className="break-words font-japanese text-xl font-extrabold leading-8 text-ink">{line.japanese}</p>
                  <p className="mt-2 break-words text-xs font-semibold leading-5 text-ink/55">{line.kana}</p>
                  <p className="mt-3 break-words text-sm font-semibold leading-6 text-ink/72">{line.translation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default DialogueCard;

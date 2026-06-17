import { Pause, Play, Square, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar, { type PageKey } from "./components/Navbar";
import SiteFooter from "./components/SiteFooter";
import ConversationPage from "./pages/ConversationPage";
import ExamVocabularyPage from "./pages/ExamVocabularyPage";
import GrammarPage from "./pages/GrammarPage";
import Home from "./pages/Home";
import KanaPage from "./pages/KanaPage";
import NumbersPage from "./pages/NumbersPage";
import QuickReadPage from "./pages/QuickReadPage";
import VocabularyPage from "./pages/VocabularyPage";
import {
  pauseJapanese,
  resumeJapanese,
  speakJapanese,
  stopJapanese,
} from "./utils/speech";
import { recordPageVisit } from "./utils/progress";

const pages: PageKey[] = [
  "home",
  "kana",
  "numbers",
  "vocabulary",
  "exam-vocabulary",
  "grammar",
  "conversation",
  "quickread",
];

const getPageFromHash = (): PageKey => {
  const hash = window.location.hash.replace("#", "") as PageKey;
  return pages.includes(hash) ? hash : "home";
};

const App = () => {
  const [currentPage, setCurrentPage] = useState<PageKey>(getPageFromHash);
  const [speechWarning, setSpeechWarning] = useState<string | null>(null);
  const [speechActive, setSpeechActive] = useState(false);
  const [speechPaused, setSpeechPaused] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setCurrentPage(getPageFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    recordPageVisit(currentPage);
  }, [currentPage]);

  const navigate = useCallback((page: PageKey) => {
    setCurrentPage(page);
    window.location.hash = page === "home" ? "" : page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSpeak = useCallback(async (text: string) => {
    setSpeechWarning(null);
    setSpeechActive(true);
    setSpeechPaused(false);

    const result = await speakJapanese(text);

    if (result.warning) {
      setSpeechWarning(result.warning);
    }

    setSpeechActive(false);
    setSpeechPaused(false);
    return result.ok;
  }, []);

  const page = useMemo(() => {
    switch (currentPage) {
      case "kana":
        return <KanaPage onSpeak={handleSpeak} />;
      case "numbers":
        return <NumbersPage onSpeak={handleSpeak} />;
      case "vocabulary":
        return <VocabularyPage onOpenExamVocabulary={() => navigate("exam-vocabulary")} onSpeak={handleSpeak} />;
      case "exam-vocabulary":
        return <ExamVocabularyPage onSpeak={handleSpeak} />;
      case "grammar":
        return <GrammarPage onSpeak={handleSpeak} />;
      case "conversation":
        return <ConversationPage onSpeak={handleSpeak} />;
      case "quickread":
        return <QuickReadPage onSpeak={handleSpeak} />;
      case "home":
      default:
        return <Home onNavigate={navigate} onSpeak={handleSpeak} />;
    }
  }, [currentPage, handleSpeak, navigate]);

  const pauseSpeech = () => {
    pauseJapanese();
    setSpeechPaused(true);
  };

  const resumeSpeech = () => {
    resumeJapanese();
    setSpeechPaused(false);
  };

  const stopSpeech = () => {
    stopJapanese();
    setSpeechActive(false);
    setSpeechPaused(false);
  };

  return (
    <div className="app-page-shell min-h-screen overflow-x-hidden text-ink">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main className="mx-auto w-full max-w-[84rem] px-3 pb-[calc(7.75rem+env(safe-area-inset-bottom))] pt-3 sm:px-5 sm:pt-5 lg:px-8 lg:pb-8">
        {page}
      </main>
      <SiteFooter currentPage={currentPage} onNavigate={navigate} />

      {speechWarning ? (
        <div
          role="status"
          className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] left-3 right-3 z-[60] rounded-lg border border-sakura/30 bg-paper p-3 text-sm text-ink shadow-soft sm:left-auto sm:max-w-md sm:p-4 md:bottom-4 md:left-4 md:right-auto"
        >
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-sakura/12 font-bold text-sakura">
              声
            </div>
            <p className="leading-6">{speechWarning}</p>
            <button
              type="button"
              onClick={() => setSpeechWarning(null)}
              className="ml-auto grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-md text-ink/58 transition hover:bg-rice hover:text-ink"
              aria-label="关闭语音提示"
              title="关闭"
            >
              <X aria-hidden="true" size={18} />
            </button>
          </div>
        </div>
      ) : null}

      {speechActive ? (
        <div className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] left-3 z-[60] flex gap-2 rounded-lg border border-ink/10 bg-paper p-2 shadow-soft md:bottom-4 md:left-4">
          <button
            type="button"
            onClick={speechPaused ? resumeSpeech : pauseSpeech}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-md bg-sora text-white transition hover:bg-sora/90 active:scale-95"
            aria-label={speechPaused ? "继续播放" : "暂停播放"}
            title={speechPaused ? "继续" : "暂停"}
          >
            {speechPaused ? <Play aria-hidden="true" size={19} /> : <Pause aria-hidden="true" size={19} />}
          </button>
          <button
            type="button"
            onClick={stopSpeech}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-md bg-ink text-white transition hover:bg-ink/90 active:scale-95"
            aria-label="停止播放"
            title="停止"
          >
            <Square aria-hidden="true" size={18} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default App;

import { useState } from "react";
import GuideFlow from "./components/GuideFlow";
import GPTResults from "./components/GPTResults";
import { useGPTFetcher } from "./lib/useGPTFetcher";
import EmotionalPulseWavesBackground from "./components/EmotionalPulseWavesBackground";

export default function App() {
  const FLOW = {
    INTRO: 0,
    EMOTION: 1,
    INTENSITY: 2,
    INTENT: 3,
    RESULTS: 4,
  };

  const [flowMode, setFlowMode] = useState(FLOW.INTRO);
  const [emotion, setEmotion] = useState(null);
  const [intensity, setIntensity] = useState(null);
  const [intent, setIntent] = useState(null);
  const [chatMetadata, setChatMetadata] = useState(null); 

  // Reset back to intro
  const resetAll = () => {
    setFlowMode(FLOW.INTRO);
    setEmotion(null);
    setIntensity(null);
    setIntent(null);
    reset();
  };

  // Map flowMode to the step that triggers GPT fetch
  const fetchStep = flowMode === FLOW.RESULTS ? 4 : flowMode;

  const {
    gptResult,
    loading,
    error,
    parsedMovies,
    hasMovies,
    retry,
    reset,
    retryCount,
  } = useGPTFetcher({
    mood: emotion,
    intent,
    energy: intensity,
    step: fetchStep,
  });

  const handleRetry = () => {
    if (retryCount < 2) {
      retry();
    } else {
      // Fallback into chat if retries exhausted
      setFlowMode(FLOW.INTENT);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(18,18,18,1)_40%,rgba(18,18,18,0.75)_90%)]">
      <div className="flex flex-col min-h-screen px-4 bg-[rgba(18,18,18,0.4)] backdrop-brightness-75 rounded-3xl shadow-lg p-6 sm:p-10 md:p-16 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mt-10 sm:mt-16 md:mt-20 mb-8 sm:mb-10">
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-warm-white flex justify-center items-center gap-2 whitespace-nowrap transition-colors duration-300 hover:text-[#FFC542]">
            <span className="text-4xl sm:text-5xl">🎬</span> Whispr
          </h1>
          <p className="text-lg sm:text-xl text-[rgba(250,249,246,0.9)] italic leading-snug tracking-wide mt-4 mb-14">
            Your emotionally intelligent movie picker
          </p>
        </div>

        {/* Animated background blobs */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <EmotionalPulseWavesBackground />
        </div>
  
        {/* Main app flow */}
        <main
          className="
            w-full 
            max-w-lg sm:max-w-xl md:max-w-2xl 
            mx-auto 
            flex-grow flex flex-col justify-start
            px-2 sm:px-4 md:px-6 
            py-4 sm:py-6 md:py-8
            text-[15px] sm:text-[15px] md:text-[14px]
          "
        >
          <GuideFlow
            flowMode={flowMode}
            setFlowMode={setFlowMode}
            emotion={emotion}
            setEmotion={setEmotion}
            intensity={intensity}
            setIntensity={setIntensity}
            intent={intent}
            setIntent={setIntent}
          />


          {flowMode === FLOW.RESULTS && (
            <GPTResults
              mood={emotion}
              intent={intent}
              energy={intensity}
              gptResult={gptResult}
              parsedMovies={parsedMovies}
              hasMovies={hasMovies}
              loading={loading}
              error={error}
              retryCount={retryCount}
              onRetry={handleRetry}
              resetAll={resetAll}
              chatMetadata={chatMetadata}
              setChatMetadata={setChatMetadata}
            />
          )}
        </main>

        {/* Footer quote */}
        <p className="text-center text-xs sm:text-xs text-gray-500 max-w-md mx-auto mt-12 px-4 leading-relaxed">
          "Whispr is a calm companion built with soul — built for real
          connection, one story at a time."
          <br />
          <span className="not-italic text-[rgba(166,177,196,0.7)]">— Sol</span>
        </p>

        {/* Footer bar */}
        <footer className="w-full border-t border-[rgba(255,255,255,0.1)] pt-4 mt-6">
          <div className="text-center text-xs sm:text-sm text-[rgba(166,177,196,0.5)]">
            Built by Darin · Powered by{" "}
            <span className="font-semibold text-[#FFC542]">
              Sol
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
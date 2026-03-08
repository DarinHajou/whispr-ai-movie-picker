import { useState } from "react";
import GuideFlow from "./components/GuideFlow";
import GPTResults from "./components/GPTResults";
import { useGPTFetcher } from "./lib/useGPTFetcher";
import EmotionalPulseWavesBackground from "./components/EmotionalPulseWavesBackground";
import IntroSpringboard from "./components/IntroSpringboard";

export default function App() {
  const FLOW = {
    INTRO: 0,
    EMOTION: 1,
    INTENSITY: 2,
    RESULTS: 4, // 3 (INTENT) is officially retired
  };

  const [flowMode, setFlowMode] = useState(FLOW.INTRO);
  const [mode, setMode] = useState("guided"); // Required for GPTResults "chat" feature
  const [emotion, setEmotion] = useState(null);
  const [intensity, setIntensity] = useState(null);
  const [chatMetadata, setChatMetadata] = useState(null);

  const resetAll = () => {
    setFlowMode(FLOW.INTRO);
    setMode("guided");
    setEmotion(null);
    setIntensity(null);
    reset();
  };

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
    // IMPORTANT: We only send the text label (e.g., "Thrill") to the AI!
    mood: emotion?.label || emotion, 
    intent: "", // Intent is gone, we pass an empty string so your backend doesn't crash
    energy: intensity,
    step: fetchStep,
  });

  const handleRetry = () => {
    if (retryCount < 2) {
      retry();
    } else {
      setFlowMode(FLOW.EMOTION); // Fallback to step 1 if out of retries
    }
  };

  // Only render intro *or* main app
  if (flowMode === FLOW.INTRO) {
    return <IntroSpringboard onStart={() => setFlowMode(FLOW.EMOTION)} />;
  }

  return (
    <div className="w-full min-h-screen flex justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(18,18,18,1)_40%,rgba(18,18,18,0.75)_90%)]">
      <div className="flex flex-col min-h-screen px-4 bg-[rgba(18,18,18,0.4)] backdrop-brightness-75 rounded-3xl shadow-lg p-8 sm:p-10 md:p-16 max-w-4xl w-full">
        
        {/* Header */}
        <div className="text-center mt-8 sm:mt-12 mb-20 sm:mb-24">
          <h1 className="text-4xl sm:text-5xl font-bold  tracking-tight text-warm-white flex justify-center items-center gap-2 whitespace-nowrap transition-colors duration-300 hover:text-[#FFC542]">
            Whispr
          </h1>
        </div>

        {/* Animated background blobs */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <EmotionalPulseWavesBackground />
        </div>
  
        {/* Main app flow */}
        <main className="w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-auto flex-grow flex flex-col justify-start px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 text-[15px] sm:text-[15px] md:text-[14px]">
          
          {/* 
            Notice how GuideFlow only shows when we AREN'T in the results step.
            This prevents the layout from breaking! 
          */}
          {flowMode !== FLOW.RESULTS && (
            <GuideFlow
              flowMode={flowMode}
              setFlowMode={setFlowMode}
              emotion={emotion}
              setEmotion={setEmotion}
              intensity={intensity}
              setIntensity={setIntensity}
            />
          )}

          {flowMode === FLOW.RESULTS && (
            <GPTResults
              mode={mode} // Passes the mode down!
              setMode={setMode}
              mood={emotion} // We pass the WHOLE object here so GPTResults can show the Orb!
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
          "Whispr is a calm companion built with soul — built for real connection, one story at a time."
          <br />
          <span className="not-italic text-[rgba(166,177,196,0.7)]">— Sol</span>
        </p>

        {/* Footer bar */}
        <footer className="w-full border-t border-[rgba(255,255,255,0.1)] pt-4 mt-6">
          <div className="text-center text-xs sm:text-sm text-[rgba(166,177,196,0.5)]">
            Built by Darin · Powered by{" "}
            <span className="font-semibold text-[#FFC542]">Sol</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
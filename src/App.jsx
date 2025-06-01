import { useState } from "react";
import GuidedFlow from "./components/guideFlow";
import GPTResults from "./components/GPTResults";
import { useGPTFetcher } from "./lib/useGPTFetcher";

export default function App() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(null);
  const [mode, setMode] = useState("guided");
  const [intent, setIntent] = useState(null);
  const [energy, setEnergy] = useState(null);

  const resetAll = () => {
    setStep(1);
    setMood(null);
    setIntent(null);
    setEnergy(null);
    setMode("guided");
    reset();
  };  

  const {
    gptResult,
    loading,
    error,
    parsedMovies,
    hasMovies,
    retry,
    reset,
    retryCount,
  } = useGPTFetcher({ mood, intent, energy, step });

  const handleRetry = () => {
    if (retryCount < 2) {
      retry();
    } else {
      setMode("chat");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col min-h-screen px-4">
        {/* Header */}
        <div className="text-center mb-16 mt-16">
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-warm-white flex justify-center items-center gap-2 whitespace-nowrap transition-colors duration-300 hover:text-[rgba(244,194,135,0.8)]">
            <span className="text-4xl sm:text-5xl">🎬</span> Whispr
          </h1>
          <p className="text-lg sm:text-xl text-[rgba(250,249,246,0.9)] italic leading-snug tracking-wide mt-4 mb-4">
            Your emotionally intelligent movie picker
          </p>
        </div>

        {/* Main app flow */}
        <main className="w-full max-w-xl mx-auto flex-grow flex flex-col justify-start px-4 sm:px-0">
          <GuidedFlow
            step={step}
            setStep={setStep}
            mood={mood}
            setMood={setMood}
            intent={intent}
            setIntent={setIntent}
            energy={energy}
            setEnergy={setEnergy}
          />

          {step === 4 && (
            <GPTResults
            mode={mode}
            setMode={setMode}
            mood={mood}
            intent={intent}
            energy={energy}
            gptResult={gptResult}
            parsedMovies={parsedMovies}
            hasMovies={hasMovies}
            loading={loading}
            error={error}
            retryCount={retryCount}
            onRetry={handleRetry}
            step={step}
            setStep={setStep}
            resetAll={resetAll}
          />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 opacity-60 mt-6 mb-4">
          Built by Darin · Powered by <span className="text-glow-amber font-semibold">SolaceAI</span>
        </footer>
      </div>
    </div>
  );
}

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
        <div className="text-center mb-12 mt-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-warm-white flex justify-center items-center gap-2">
            <span className="text-3xl sm:text-4xl">🎬</span> Whispr
          </h1>
          <p className="text-base sm:text-lg text-mist-blue tracking-wide italic opacity-90 mt-2">
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
              mode="guided"
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

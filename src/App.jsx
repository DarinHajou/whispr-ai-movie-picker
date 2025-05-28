import { useState } from "react";
import GuidedFlow from "./components/guideFlow";
import GPTResults from "./components/GPTResults";
import { useGPTFetcher } from "./lib/useGPTFetcher";

export default function App() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(null);
  const [mode, setMode] = useState("guided");
  const [intent, setIntent] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [energy, setEnergy] = useState(null);
  const {
    gptResult,
    loading,
    error,
    parsedMovies,
    hasMovies,
    retry,
    reset,
  } = useGPTFetcher({ mood, intent, energy, step });

  const handleRetry = () => {
    if (retryCount < 2) {
      setRetryCount((prev) => prev + 1);
      setGptResult("");
      setHasFetched(false);
    } else {
      setMode("chat"); // Auto-switch to refine after 2 retries
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      <div className="text-center space-y-1 sm:space-y-2 mb-10 sm:mb-14">
      <div className="text-center space-y-1 mb-10">
        <h1 className="text-6xl font-extrabold tracking-tight text-warm-white flex justify-center items-center gap-2">
          <span className="text-4xl">🎬</span> Whispr
        </h1>
        <p className="text-sm sm:text-base text-mist-blue tracking-wide italic opacity-90">
         - Your emotionally intelligent movie picker -
        </p>
      </div>
      </div> 

      <main className="w-full max-w-xl mx-auto py-4 space-y-6">
  
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
        setStep={setStep}
      />      
      )}

      </main>
        <footer className="text-center text-xs mt-10 text-gray-400">
          Built by Darin · Powered by <span className="text-glow-amber font-semibold">SolaceAI</span>
        </footer>
    </div>
  );
}
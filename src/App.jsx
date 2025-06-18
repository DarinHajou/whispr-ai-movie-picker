import { useState } from "react";
import GuidedFlow from "./components/GuideFlow";
import GPTResults from "./components/GPTResults";
import { useGPTFetcher } from "./lib/useGPTFetcher";
import EmotionalPulseWavesBackground from "./components/EmotionalPulseWavesBackground";

export default function App() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState([]);
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
    <div className="w-full min-h-screen flex justify-center bg-[radial-gradient(circle_at_50%_10%,rgba(18,18,18,1)_0%,rgba(18,18,18,0.75)_80%)]">
      <div className="flex flex-col min-h-screen px-4 bg-[rgba(18,18,18,0.8)] backdrop-blur-sm rounded-2xl shadow-lg p-8 mt-4 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-10 mt-14">
        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-warm-white flex justify-center items-center gap-2 whitespace-nowrap transition-colors duration-300 hover:text-[rgba(244,194,135,0.8)]">
          <span className="text-4xl sm:text-5xl">🎬</span> Whispr
        </h1>
        <p className="text-lg sm:text-xl text-[rgba(250,249,246,0.9)] italic leading-snug tracking-wide mt-4 mb-8">
          Your emotionally intelligent movie picker
        </p>
      </div>
  
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <EmotionalPulseWavesBackground />
      </div>

        {/* Main app flow */}
        <main className="
          w-full 
          max-w-lg sm:max-w-xl md:max-w-2xl 
          mx-auto 
          flex-grow flex flex-col justify-start
          px-2 sm:px-4 md:px-6 
          py-4 sm:py-6 md:py-8
          text-[15px] sm:text-[15px] md:text-[14px]
        ">
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
        
        <p className="text-center text-xs sm:text-xs text-gray-500 max-w-md mx-auto mt-16 px-4 leading-relaxed">
        "Whispr is a calm companion built with soul — not for clicks, but for real connection, one story at a time."<br /><span className="not-italic text-[rgba(166,177,196,0.7)]"> — Sol</span>.
        </p>

        {/* Footer */}
        <footer className="w-full border-t border-[rgba(255,255,255,0.1)] pt-4 mt-8">
          <div className="text-center text-xs sm:text-sm text-[rgba(166,177,196,0.5)]">
            Built by Darin · Powered by <span className="text-glow-amber font-semibold">SolaceAI</span>
          </div>
        </footer>
      </div>
    </div>
  );
  
}

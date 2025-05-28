import { useState } from "react";
import { callOpenAI } from "./lib/callOpenAI";
import buildPrompt from "./lib/buildPrompt";
import MovieResultCard from "./components/movieResultCard";
import GuidedFlow from "./components/guideFlow";

export default function App() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(null);
  const [mode, setMode] = useState("guided");
  const [intent, setIntent] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [followup, setFollowup] = useState("");
  const [showMood, setShowMood] = useState(false);

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
          Your emotionally intelligent movie picker
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
          {...allYourProps}
        />
      )}

      </main>
        <footer className="text-center text-xs mt-10 text-gray-400">
          Built by Darin · Powered by <span className="text-glow-amber font-semibold">SolaceAI</span>
        </footer>
    </div>
  );
}
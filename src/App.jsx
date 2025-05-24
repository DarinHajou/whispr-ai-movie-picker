import { useEffect, useState, useRef } from "react";
import MoodSelector from "./components/moodSelector";
import IntentSelector from "./components/intentSelector";
import EnergySelector from "./components/energySelector";
import { callOpenAI } from "./lib/callOpenAI";
import buildPrompt from "./lib/buildPrompt";

export default function App() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(null);
  const [intent, setIntent] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [gptResult, setGptResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);

  useEffect(() => {
    if (
      step === 4 &&
      mood &&
      intent &&
      energy &&
      !gptResult &&
      !loading
    ) {
      const controller = new AbortController();
      abortRef.current = controller;

      const run = async () => {
        const prompt = buildPrompt(mood, intent, energy);
        if (!prompt) {
          setError("Prompt invalid. Please go back and re-select options.");
          return;
        }

        setLoading(true);
        setError("");
        try {
          const result = await callOpenAI(prompt, {
            signal: controller.signal,
          });
          setGptResult(result);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      };

      run();

      return () => controller.abort();
    }
  }, [step, mood, intent, energy, gptResult, loading]);

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center px-4 py-8">
      <main className="w-full max-w-xl space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">SibylAI</h1>
          <p className="text-sm text-gray-400 mt-1">How do you feel today?</p>
        </header>

        {step === 1 && (
          <MoodSelector
            setMood={(selected) => {
              setMood(selected);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <>
            <IntentSelector
              mood={mood}
              setIntent={(selected) => {
                setIntent(selected);
                setStep(3);
              }}
            />
            <div className="text-center mt-4">
              <button
                onClick={() => setStep(1)}
                className="text-sm text-gray-400 hover:text-white underline"
              >
                ← Go back
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <EnergySelector
              setEnergy={(energyLevel) => {
                setEnergy(energyLevel);
                setStep(4);
              }}
            />
            <div className="text-center mt-4">
              <button
                onClick={() => setStep(2)}
                className="text-sm text-gray-400 hover:text-white underline"
              >
                ← Go back
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            {loading && (
              <div
                className="flex justify-center my-8"
                role="status"
                aria-live="polite"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"></div>
                <span className="sr-only">Thinking…</span>
              </div>
            )}

            {error && (
              <div className="text-center text-red-400 my-4">
                <p>{error}</p>
                <button
                  onClick={() => {
                    setGptResult("");
                    setError("");
                  }}
                  className="mt-2 underline hover:text-white"
                >
                  Retry
                </button>
              </div>
            )}

            {gptResult && (
              <pre className="bg-gray-900 text-left p-4 rounded text-sm whitespace-pre-wrap">
                {gptResult}
              </pre>
            )}

            <div className="text-center mt-4 space-y-2">
              <button
                onClick={() => setStep(3)}
                className="block text-sm text-gray-400 hover:text-white underline"
              >
                ← Go back
              </button>
              <button
                onClick={() => {
                  setMood(null);
                  setIntent(null);
                  setEnergy(null);
                  setStep(1);
                  setGptResult("");
                  setError("");
                }}
                className="block text-sm text-gray-400 hover:text-white underline"
              >
                ↻ Start over
              </button>
            </div>
          </>
        )}

        <footer className="text-center text-xs text-gray-600 mt-10">
          Built with ❤️ by you
        </footer>
      </main>
    </div>
  );
}

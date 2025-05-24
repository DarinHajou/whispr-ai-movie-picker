import { useEffect, useState, useRef } from "react";
import MoodSelector from "./components/moodSelector";
import IntentSelector from "./components/intentSelector";
import EnergySelector from "./components/energySelector";
import { callOpenAI } from "./lib/callOpenAI";
import buildPrompt from "./lib/buildPrompt";

export default function App() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState("guided");
  const [intent, setIntent] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [gptResult, setGptResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [mode, setMode] = useState("guided");
  const [followup, setFollowup] = useState("");

  useEffect(() => {
    console.log("🔍 Current state", { step, mood, intent, energy, gptResult, hasFetched });
  }, [step, mood, intent, energy, gptResult, hasFetched]);
  
  useEffect(() => {
    let controller = null;
    let cancelled = false;
  
    if (
      step === 4 &&
      mood &&
      intent &&
      energy &&
      !hasFetched
    ) {
      controller = new AbortController();
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
          if (!cancelled) {
            setGptResult(result);
            console.log("✅ Final GPT result stored:", result);
          }
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("ℹ️ GPT request aborted by React cleanup.");
          } else {
            setError(err.message);
            console.error("❌ GPT Error in App.jsx:", err);
          }        
        } finally {
          if (!cancelled) {
            setHasFetched(true);
            setLoading(false);
          }
        }
      };
  
      run();
    }
  
    return () => {
      cancelled = true;
      if (controller) {
        console.warn("⛔ Aborting GPT fetch");
        controller.abort();
      }
    };
  }, [step, mood, intent, energy, hasFetched]);  
  
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
            {mode === "guided" && (
              <>
                <pre className="bg-gray-900 text-left p-4 rounded text-sm whitespace-pre-wrap">
                  {gptResult !== "" ? gptResult : "🟥 No GPT result received yet."}
                </pre>

                {gptResult && (
                  <div className="mt-6 text-center border-t border-gray-700 pt-4">
                    <p className="text-sm text-gray-400 mb-2">Not quite it?</p>
                    <button
                      className="px-4 py-2 text-sm bg-gray-800 rounded hover:bg-gray-700"
                      onClick={() => setMode("chat")}
                    >
                      Let’s refine it together →
                    </button>
                  </div>
                )}
              </>
            )}

            {mode === "chat" && (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-gray-400 text-center">
                  Add a follow-up hint or tell me what missed the mark:
                </p>
                <textarea
                  rows={3}
                  value={followup}
                  onChange={(e) => setFollowup(e.target.value)}
                  className="w-full bg-gray-800 text-white p-2 rounded text-sm"
                  placeholder="e.g. I want something with a female lead or set in space"
                />
                <div className="text-center space-x-2">
                  <button
                    className="px-4 py-2 text-sm bg-gray-700 rounded hover:bg-gray-600"
                    onClick={async () => {
                      setLoading(true);
                      setError("");
                      try {
                        const prompt = buildPrompt(mood, intent, energy) + `\n\nUser added: ${followup}`;
                        const result = await callOpenAI(prompt);
                        setGptResult(result);
                        setFollowup("");
                      } catch (err) {
                        setError(err.message);
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    Refine Suggestions
                  </button>
                  <button
                    className="text-sm text-gray-400 underline hover:text-white"
                    onClick={() => setMode("guided")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

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
                    setHasFetched(false);
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
                  setHasFetched(false);
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
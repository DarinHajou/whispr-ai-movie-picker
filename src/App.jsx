import { useEffect, useState, useRef } from "react";
import { TypeAnimation } from 'react-type-animation';
import MoodSelector from "./components/moodSelector";
import IntentSelector from "./components/intentSelector";
import EnergySelector from "./components/energySelector";
import { callOpenAI } from "./lib/callOpenAI";
import buildPrompt from "./lib/buildPrompt";
import MovieResultCard from "./components/movieResultCard";
import { parseGptResult } from "./lib/parseGptresult";

export default function App() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(null);
  const [mode, setMode] = useState("guided");
  const [intent, setIntent] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [gptResult, setGptResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [followup, setFollowup] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [showMood, setShowMood] = useState(false);

  useEffect(() => {
    console.log("🧪 gptResult:", gptResult);
  }, [gptResult]);

  const handleRetry = () => {
    if (retryCount < 2) {
      setRetryCount((prev) => prev + 1);
      setGptResult("");
      setHasFetched(false);
    } else {
      setMode("chat"); // Auto-switch to refine after 2 retries
    }
  };
  
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
            console.log("Final GPT result stored:", result);
          }
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("GPT request aborted by React cleanup.");
          } else {
            setError(err.message);
            console.error("GPT Error in App.jsx:", err);
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
        console.warn("Aborting GPT fetch");
        controller.abort();
      }
    };
  }, [step, mood, intent, energy, hasFetched]);

  const parsedMovies = parseGptResult(gptResult) || [];
  const hasMovies = parsedMovies.length > 0;
  
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
  
        {/* Mood selector */}
        {step === 1 && (
          <>
            <div className="-mt-6 text-center mb-6 text-glow-amber text-xl sm:text-3xl font-medium min-h-[6rem] max-w-md mx-auto">
              <TypeAnimation
                sequence={[
                  "Hi.", 1000,
                  "I’m Sol.", 1000,
                  "Tell me how you feel and I’ll whisper something worth watching.", 800, () => setShowMood(true)
                ]}                              
                speed={45}
                wrapper="span"
                cursor={true}
                repeat={0}
              />
            </div>

            {showMood && (
                <div className="flex flex-col items-center animate-fade-in transition-opacity duration-700 max-w-md mx-auto">
                <p className="mb-2">How do You feel today?</p>
                <div className="mt-2">
                  <MoodSelector
                    setMood={(selected) => {
                      setMood(selected);
                      setStep(2);
                    }}
                  />
                </div>
              </div>
            )}
          </>
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
            {mode === "guided" ? (
              <>
                {gptResult !== "" ? (
                  hasMovies ? (
                    <div className="space-y-4">
                      {parsedMovies.map((movie, i) => (
                        <MovieResultCard
                          key={i}
                          title={movie.title}
                          year={movie.year}
                          tone={movie.tone}
                          imdb={movie.imdb}
                          plot={movie.plot}
                        />
                      ))}
                    </div>
                  ) : (
                    <pre className="text-sm text-red-400 whitespace-pre-wrap">
                      Could not parse GPT result. Here’s the raw text:
                      {"\n\n" + gptResult}
                    </pre>
                  )
                ) : (
                  <pre className="bg-gray-900 text-left p-4 rounded text-sm whitespace-pre-wrap">
                    No GPT result received yet.
                  </pre>
                )}

                {gptResult && mode === "guided" && (
                  <div className="mt-10 bg-gray-800/60 rounded-xl px-6 py-6 shadow-lg text-center space-y-4 transition-opacity duration-500 ease-in">
                    <p className="text-lg sm:text-xl font-medium text-glow-amber">
                      Didn’t quite hit the mark?
                    </p>
                    <p className="text-sm text-gray-400">
                      Try again or give us a nudge to refine it further.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                      <button
                        onClick={() => {
                          if (retryCount < 2) {
                            setRetryCount((prev) => prev + 1);
                            setGptResult("");
                            setHasFetched(false);
                          } else {
                            setMode("chat");
                          }
                        }}
                        disabled={retryCount >= 2}
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded font-medium ${
                          retryCount < 2
                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                            : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        🔄 Try a fresh 10
                      </button>

                      <button
                        onClick={() => setMode("chat")}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-glow-amber text-soft-black hover:bg-yellow-300 rounded font-medium"
                      >
                        ✏️ Refine Suggestions
                      </button>
                    </div>
                  </div>
                )}

              </>
            ) : (
              // Mode === "chat"
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
              <div className="flex justify-center my-8" role="status" aria-live="polite">
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

            <div className="text-center mt-4 space-y-2">
              {mode === "chat" ? (
                <button
                  onClick={() => setMode("guided")}
                  className="block text-sm text-gray-400 hover:text-white underline"
                >
                  ← Back to results
                </button>
              ) : (
                <button
                  onClick={() => setStep(3)}
                  className="block text-sm text-gray-400 hover:text-white underline"
                >
                  ← Go back
                </button>
              )}

              <button
                onClick={() => {
                  setMood(null);
                  setIntent(null);
                  setEnergy(null);
                  setStep(1);
                  setGptResult("");
                  setError("");
                  setHasFetched(false);
                  setMode("guided");
                  setRetryCount(0);
                  setRetryCount(0); 
                }}
                className="block text-sm text-gray-400 hover:text-white underline"
              >
                ↻ Start over from the beginning
              </button>
            </div>
          </>
        )}


      </main>
        <footer className="text-center text-xs mt-10 text-gray-400">
          Built by Darin · Powered by <span className="text-glow-amber font-semibold">SolaceAI</span>
        </footer>
    </div>
  );
}
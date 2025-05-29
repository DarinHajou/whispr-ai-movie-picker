import MovieResultCard from "./movieResultCard";
import buildPrompt from "../lib/buildPrompt";
import { callOpenAI } from "../lib/callOpenAI";

export default function GPTResults({
  mode, setMode,
  mood, intent, energy,
  followup, setFollowup,
  gptResult, setGptResult,
  parsedMovies, hasMovies,
  retryCount, onRetry,
  loading, setLoading,
  error, setError,
  setHasFetched,
  setStep,
  resetAll
}) {
    
  return (
    <>
      {mode === "guided" ? (
        <>
          {gptResult !== "" ? (
            hasMovies ? (
              <div className="space-y-4">
                {parsedMovies.map((movie, i) => (
                  <MovieResultCard key={i} {...movie} />
                ))}
              </div>
            ) : (
              <pre className="text-sm text-red-400 whitespace-pre-wrap">
                Could not parse GPT result. Here’s the raw text:
                {"\n\n" + gptResult}
              </pre>
            )
          ) : (
            <pre className="bg-pale-sage text-black text-left p-2 rounded text-sm whitespace-pre-wrap max-w-">
              No result received yet.
            </pre>
          )}

          {gptResult && (
            <div className="mt-10 bg-gray-800/60 rounded-xl px-6 py-6 shadow-lg text-center space-y-4">
              <p className="text-lg sm:text-xl font-medium text-glow-amber">
                Didn’t quite hit the mark?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={onRetry}
                disabled={retryCount >= 2}
                className={`px-4 py-2 text-sm rounded font-medium ${
                  retryCount < 2
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                🔄 Try a fresh 10
              </button>


                <button
                  onClick={() => setMode("chat")}
                  className="px-4 py-2 text-sm bg-glow-amber text-soft-black hover:bg-yellow-300 rounded font-medium"
                >
                  ✏️ Refine Suggestions
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        // Chat refinement mode
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
        <div className="flex justify-center items-center my-8" role="status" aria-live="polite">
          <div className="w-12 h-12 rounded-full border-4 border-glow-amber border-t-transparent animate-spin" />
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
        <button
          onClick={() => (mode === "chat" ? setMode("guided") : setStep(3))}
          className="block text-sm text-gray-400 hover:text-white underline"
        >
          ← {mode === "chat" ? "Back to results" : "Go back"}
        </button>

        <button
          onClick={resetAll}
          className="block text-sm text-gray-400 hover:text-white underline"
        >
          ↻ Start over from the beginning
        </button>
      </div>
    </>
  );
}

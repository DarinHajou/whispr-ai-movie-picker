import MovieResultCard from "./MovieResultCard";
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
  resetAll,
  chatMetadata,
  setChatMetadata,
}) {
  return (
    <>
     {mode === "guided" ? (
      <>
        <p
          className="
            text-lg sm:text-xl
            font-medium italic
            text-[#FFC542]                          
            text-center mt-2 sm:mt-6 mb-12
          "
        >
          🎞️ Here’s what Sol recommends
        </p>

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
            <pre className="bg-pale-sage text-black p-3 rounded text-sm whitespace-pre-wrap">
              No result received yet.
            </pre>
          )}

          {gptResult && (
          <div className="mt-10 bg-gray-800/60 rounded-xl px-6 py-6 shadow-lg text-center">
            {/* Heading */}
            <p className="text-xl mt-2 sm:text-2xl font-semibold text-[#FFC542]">
              Tell me what didn’t quite land — Sol’s still listening.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={onRetry}
                disabled={retryCount >= 2}
                className={`px-5 py-3 rounded-lg text-sm font-semibold transition duration-200
                  ${retryCount < 2
                    ? "bg-bright-amber text-black hover:bg-yellow-300 hover:text-soft-black shadow-md"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
              >
                🔄 Try a fresh 10
              </button>
              <button
                onClick={() => {
                  setChatMetadata({ mood, intent, energy });
                  setMode("chat");
                }}
                className="px-5 py-3 rounded-lg text-sm font-medium bg-gray-700 text-white hover:bg-gray-600 shadow transition"
              >
                Chat with Sol
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex justify-center gap-8 mt-12">
              <button
                onClick={() => setStep(3)}
                className="text-sm text-gray-400 underline hover:text-white"
              >
                ← Go back
              </button>
              <button
                onClick={resetAll}
                className="text-sm text-gray-400 underline hover:text-white"
              >
                ↻ Start over
              </button>
            </div>
          </div>
          )}
        </>
      ) : (
        <div className="bg-red rounded-xl px-8 py-6 max-w-lg mx-auto text-center">
        <p
          className="
            text-lg
            font-semibold
            text-[#FFC542]                           
          "
        >
          
        {mode === "chat" && (
          <p className="text-center text-lg italic mb-16 text-white">
            Didn't find what you were looking for? No worries. <br />
            You're feeling{" "}
            <span className="text-[#FFC542] font-semibold">
              {chatMetadata.mood.join(", ")}
            </span>
            , want to{" "}
            <span className="text-[#FFC542] font-semibold">
              {chatMetadata.intent}
            </span>
            , and your energy is{" "}
            <span className="text-[#FFC542] font-semibold">
              {chatMetadata.energy}
            </span>
            .
          </p>
        )}


        </p>
        <textarea
          rows={4}
          value={followup}
          onChange={(e) => setFollowup(e.target.value)}
          className="w-full bg-gray-900 text-white p-3 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-glow-amber transition"
          placeholder="e.g. I want something with a female lead or set in space"
        />
      
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-8">
          <button
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
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-bright-amber text-soft-black hover:bg-yellow-300 transition shadow "
          >
            ✏️ Refine Suggestions
          </button>

          </div>
          {/* Navigation links */}
              <div className="flex justify-center gap-8 mt-12">
                <button
                  onClick={() => setMode("guided")}
                  className="text-sm text-gray-400 underline hover:text-white"
                >
                  ← Back to results
                </button>
                <button
                  onClick={resetAll}
                  className="text-sm text-gray-400 underline hover:text-white"
                >
                  ↻ Start over
                </button>
              </div>
        </div>         
      )}

      {loading && (
        <div className="flex justify-center items-center my-10" role="status" aria-live="polite">
          <div className="w-12 h-12 rounded-full border-4 border-glow-amber border-t-transparent animate-spin" />
          <span className="sr-only">Thinking…</span>
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 my-4">
          <p className="text-base">{error}</p>
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
    </>
  );
}

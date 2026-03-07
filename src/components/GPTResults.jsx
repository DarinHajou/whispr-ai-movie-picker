import MovieResultCard from "./MovieResultCard";
import buildPrompt from "../lib/buildPrompt";
import { callOpenAI } from "../lib/callOpenAI";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

// --- THE SOL WHISPER DICTIONARY ---
export const SOL_LINES = {
  comfort: { soft: "Something gentle tonight.", balanced: "Warm, with a little depth.", deep: "Comfort… the kind that lands." },
  escape: { soft: "A soft exit.", balanced: "Take you somewhere else.", deep: "Disappear into it." },
  thrill: { soft: "Just a spark.", balanced: "Tight pulse. Clean adrenaline.", deep: "No looking back." },
  longing: { soft: "A quiet ache.", balanced: "Bittersweet and close.", deep: "Let it break open." },
  release: { soft: "A gentle exhale.", balanced: "Let it move through you.", deep: "A full cleanse." },
  wonder: { soft: "A little shimmer.", balanced: "Open the sky.", deep: "Awe, unapologetically." }
};

export const intensityKeyFromLabel = (label) => {
  if (label === "Soft & Gentle") return "soft";
  if (label === "Deep & Intense") return "deep";
  return "balanced";
};

export default function GPTResults({
  mode, setMode,
  mood, energy, // 'intent' is officially dead and removed!
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

  const [step, setSteps] = useState(0);

  // ==========================================
  // SCREEN 2.5: THE MAGIC LOADING STATE
  // ==========================================
  if (loading && !gptResult && mode === "guided") {
    // Safely look up Sol's whisper based on the mood object and intensity label
    const solWhisper = mood && energy 
      ? SOL_LINES[mood.id]?.[intensityKeyFromLabel(energy)] 
      : "Listening...";

    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="flex flex-col items-center mb-12 justify-center w-full h-full min-h-[60vh]"
      >
        {/* The Orb stays on screen, still breathing perfectly! */}
        {mood && (
          <motion.div
            layoutId={`orb-${mood.id}`} 
            className="w-40 h-40 rounded-full mb-16"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${mood.color} 0%, rgba(0,0,0,0.85) 90%)`,
            }}
            animate={{ scale: mood.scaleAnim, boxShadow: mood.shadowAnim }}
            transition={{ duration: mood.animDuration, ease: mood.ease, repeat: Infinity }}
          />
        )}

        {/* Sol's Whisper */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }} // Fades in slowly and cinematically
          className="text-xl sm:text-2xl font-light italic text-warm-white/80 tracking-wide text-center px-6 drop-shadow-md border-red"
        >
          "{solWhisper}"
        </motion.p>
      </motion.div>
    );
  }

  // ==========================================
  // MAIN RESULTS SCREEN
  // ==========================================
  return (
    <>
      {mode === "guided" ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {!loading && gptResult !== "" && (
            <p className="text-lg sm:text-xl font-medium italic text-[#FFC542] text-center mt-2 sm:mt-6 mb-12">
              🎞️ Here’s what Sol recommends
            </p>
          )}

          {gptResult !== "" && (
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
          )}

          {/* Bottom Actions Panel */}
          {gptResult && (
            <div className="mt-8 bg-[rgba(18,18,18,0.6)] rounded-xl px-6 py-8 shadow-lg text-center space-y-8 border border-[rgba(255,255,255,0.05)]">
              <p className="text-xl sm:text-2xl font-light text-warm-white/90">
                Tell me what didn’t quite land — Sol’s still listening.
              </p>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={onRetry}
                  disabled={retryCount >= 2}
                  className={`px-6 py-3 rounded-full text-sm tracking-wider uppercase transition duration-300
                    ${retryCount < 2
                      ? "bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.2)] text-warm-white shadow-md"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed border-transparent"
                    }`}
                >
                  🔄 Try a fresh 10
                </button>
                <button
                  onClick={() => {
                    setChatMetadata({ mood, energy });
                    setMode("chat");
                  }}
                  className="px-6 py-3 rounded-full text-sm tracking-wider uppercase bg-[#FFC542]/10 text-[#FFC542] border border-[#FFC542]/30 hover:bg-[#FFC542]/20 shadow transition"
                >
                  💬 Chat with Sol
                </button>
              </div>

              <div className="flex justify-center gap-8 mt-12">
                <button onClick={resetAll} className="text-sm text-gray-500 uppercase tracking-widest hover:text-white transition">
                  ↻ Start over
                </button>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        
        // ==========================================
        // CHAT WITH SOL SCREEN
        // ==========================================
        <div className="bg-[rgba(18,18,18,0.6)] border border-[rgba(255,255,255,0.05)] rounded-2xl px-8 py-10 max-w-lg mx-auto text-center mt-12">
          {mode === "chat" && chatMetadata && (
            <div className="text-center text-lg italic mb-16 min-h-[120px] text-[#FFC542]">
              {step === 0 && (
                <TypeAnimation
                  sequence={["Didn’t find what you were looking for?", 1200, () => setSteps(1)]}
                  speed={65} wrapper="p" cursor={false} repeat={0} className="font-medium"
                />
              )}
              {step === 1 && (
                <TypeAnimation
                  sequence={["No worries.", 1000, () => setSteps(2)]}
                  speed={65} wrapper="p" cursor={false} repeat={0} className="font-medium"
                />
              )}
              {step === 2 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="font-medium text-[#FFC542]/80">
                  You’re craving <span className="text-white font-semibold">{chatMetadata.mood?.label || "something special"}</span> at a <span className="text-white font-semibold">{chatMetadata.energy}</span> intensity.
                </motion.p>
              )}
            </div>
          )}

          <textarea
            rows={4}
            value={followup}
            onChange={(e) => setFollowup(e.target.value)}
            className="w-full bg-[rgba(0,0,0,0.3)] text-warm-white p-4 rounded-xl text-sm shadow-inner focus:outline-none focus:ring-1 focus:ring-[#FFC542]/50 border border-[rgba(255,255,255,0.1)] transition resize-none placeholder:text-gray-600"
            placeholder="e.g. I want something with a female lead, or set in space..."
          />
        
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-8">
            <button
              onClick={async () => {
                setLoading(true);
                setError("");
                try {
                  // Make sure your buildPrompt function handles mood as an object now! 
                  // E.g. buildPrompt(mood.label, energy)
                  const prompt = buildPrompt(mood?.label || mood, "", energy) + `\n\nUser added: ${followup}`;
                  const result = await callOpenAI(prompt);
                  setGptResult(result);
                  setFollowup("");
                } catch (err) {
                  setError(err.message);
                } finally {
                  setLoading(false);
                }
              }}
              className="px-8 py-3 text-sm tracking-wider uppercase font-semibold rounded-full bg-[#FFC542]/10 text-[#FFC542] border border-[#FFC542]/30 hover:bg-[#FFC542]/20 transition shadow"
            >
              ✏️ Refine Suggestions
            </button>
          </div>

          <div className="flex justify-center gap-8 mt-12">
            <button onClick={() => setMode("guided")} className="text-sm text-gray-500 tracking-widest uppercase hover:text-white transition">
              ← Back to results
            </button>
            <button onClick={resetAll} className="text-sm text-gray-500 tracking-widest uppercase hover:text-white transition">
              ↻ Start over
            </button>
          </div>
        </div>         
      )}

      {/* CHAT MODE LOADING OVERLAY */}
      {loading && mode === "chat" && (
        <div className="flex justify-center items-center my-10" role="status">
          <div className="w-10 h-10 rounded-full border-2 border-[#FFC542]/30 border-t-[#FFC542] animate-spin" />
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 my-4">
          <p className="text-base">{error}</p>
          <button onClick={() => { setGptResult(""); setError(""); setHasFetched(false); }} className="mt-2 underline hover:text-white">
            Retry
          </button>
        </div>
      )}
    </>
  );
}
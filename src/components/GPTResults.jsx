import { useState } from "react";
import MovieResultCard from "./MovieResultCard";
import SolChat from "./SolChat";
import { motion } from "framer-motion";

// --- THE SOL WHISPER DICTIONARY ---
export const SOL_LINES = {
  comfort: {
    soft: "Something gentle tonight.",
    balanced: "Warm, with a little depth.",
    deep: "Comfort… the kind that lands.",
  },
  escape: {
    soft: "A soft exit.",
    balanced: "Take you somewhere else.",
    deep: "Disappear into it.",
  },
  thrill: {
    soft: "Just a spark.",
    balanced: "Tight pulse. Clean adrenaline.",
    deep: "No looking back.",
  },
  longing: {
    soft: "A quiet ache.",
    balanced: "Bittersweet and close.",
    deep: "Let it break open.",
  },
  release: {
    soft: "A gentle exhale.",
    balanced: "Let it move through you.",
    deep: "A full cleanse.",
  },
  wonder: {
    soft: "A little shimmer.",
    balanced: "Open the sky.",
    deep: "Awe, unapologetically.",
  },
};

export const intensityKeyFromLabel = (label) => {
  if (label === "Soft & Gentle") return "soft";
  if (label === "Deep & Intense") return "deep";
  return "balanced";
};

const REFINEMENT_OPTIONS = [
  {
    label: "More surprising",
    direction:
      "Make the recommendations more surprising and less obvious while preserving the emotional fit.",
  },
  {
    label: "Lighter",
    direction:
      "Shift the recommendations toward lighter and easier viewing without losing the selected craving.",
  },
  {
    label: "Darker",
    direction:
      "Shift the recommendations toward darker, heavier, or more intense films while preserving the selected craving.",
  },
  {
    label: "More recent",
    direction:
      "Prioritize strong films released within approximately the last ten years.",
  },
  {
    label: "More obscure",
    direction:
      "Prioritize lesser-known films and avoid obvious mainstream recommendations.",
  },
  {
    label: "Surprise me",
    direction:
      "Take a bold and unexpected direction while still respecting the craving and intensity.",
    featured: true,
  },
];

export default function GPTResults({
  mood,
  energy,
  gptResult,
  parsedMovies,
  hasMovies,
  loading,
  error,
  onRetry,
  onRefine,
  resetAll,
}) {
  const primaryMovie = parsedMovies?.[0] || null;
  const otherMovies = parsedMovies?.slice(1) || [];
  const cravingLabel = mood?.label || mood || "this feeling";
  const intensityLabel = energy || "your chosen intensity";
  const accentColor = mood?.color || "#FFC542";
  const [showSolChat, setShowSolChat] = useState(false);

  // ==========================================
  // CINEMATIC LOADING STATE
  // ==========================================
  if (loading && !gptResult) {
    const solWhisper =
      mood && energy
        ? SOL_LINES[mood.id]?.[intensityKeyFromLabel(energy)]
        : "Listening...";

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center mb-12 justify-center w-full h-full min-h-[60vh]"
      >
        {mood && (
          <motion.div
            layoutId={`orb-${mood.id}`}
            className="w-40 h-40 rounded-full mb-16"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${mood.color} 0%, rgba(0,0,0,0.85) 90%)`,
            }}
            animate={{
              scale: mood.scaleAnim,
              boxShadow: mood.shadowAnim,
            }}
            transition={{
              duration: mood.animDuration,
              ease: mood.ease,
              repeat: Infinity,
            }}
          />
        )}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="text-xl sm:text-2xl font-light italic text-warm-white/80 tracking-wide text-center px-6 drop-shadow-md"
        >
          "{solWhisper}"
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {gptResult !== "" &&
        (hasMovies ? (
          <div className="space-y-12">
            {primaryMovie && (
              <section>
                <div className="text-center mb-5">
                 <p className="text-xs uppercase tracking-[0.28em] text-warm-white/45 mb-3">
                    Your night, curated by{" "}
                    <span className="text-[#FFC542]">Sol</span>
                  </p>

                 <h2 className="mt-7 text-center text-2xl sm:text-3xl font-light leading-relaxed text-warm-white/90">
                  You picked{" "}

                  <span style={{ color: accentColor }}>
                    {cravingLabel}
                  </span>

                  {" "}with{" "}

                  <span className="whitespace-nowrap text-warm-white/70">
                  {intensityLabel}
                </span>

                  {" "}intensity
                </h2>

                  <p className="text-sm text-gray-500 mt-3">
                    Six films shaped around the experience you chose.
                  </p>
                </div>

                <MovieResultCard {...primaryMovie} featured />
              </section>
            )}

            {otherMovies.length > 0 && (
              <section>
                <h2 className="text-sm uppercase tracking-[0.25em] text-warm-white/50 text-center mb-5">
                  Other films that fit
                </h2>

                <div className="space-y-4">
                  {otherMovies.map((movie, index) => (
                    <MovieResultCard
                      key={`${movie.title}-${movie.year}-${index}`}
                      {...movie}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <pre className="text-sm text-red-400 whitespace-pre-wrap">
            Could not parse GPT result. Here’s the raw text:
            {"\n\n" + gptResult}
          </pre>
        ))}

      {resetAll}

      {error && (
        <div className="text-center text-red-400 my-6">
          <p className="text-base">{error}</p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-2 underline hover:text-white"
          >
            Retry
          </button>
        </div>
      )}
    </motion.div>
  );
}
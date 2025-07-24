import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import MoodSelector from "./MoodSelector";
import IntentSelector from "./IntentSelector";
import EnergySelector from "./EnergySelector";
import { AnimatePresence, motion } from "framer-motion";
import ExperienceSelector from "./ExperienceSelector";

export default function GuidedFlow({
  step,
  setStep,
  mood,
  setMood,
  setIntent,
  setEnergy,
}) {
  const [showMood, setShowMood] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [hasTypedFinished, setHasTypedFinished] = useState(false);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {step === 1 && (
          <>
            {/* Intro animation */}
            {!showExperience && (
              <motion.div
                className="flex justify-center sm:mt-8 min-h-[160px]"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              >
                <div className="w-full max-w-lg px-6 sm:px-6 text-center mb-6">
                  <TypeAnimation
                    sequence={[
                      "👋 Hi",
                      1000,
                      "I’m Sol.",
                      1000,
                      "Tell me how you want to feel, and I’ll whisper something worth watching.",
                      400,
                      () => setHasTypedFinished(true),
                    ]}
                    speed={70}
                    wrapper="p"
                    cursor={true}
                    repeat={0}
                    className="
                      inline-block w-full
                      font-medium text-lg sm:text-xl
                      text-[#FFC542]
                      drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]
                    "
                  />

                  {hasTypedFinished && !showMood && !showExperience && (
                    <div className="mt-16 mb-12 text-center">
                      <button
                        onClick={() => setShowMood(true)}
                        className="
                          px-6 py-3 rounded-full 
                          bg-white/5 
                          border border-[#FFC542]/30
                          text-white text-base sm:text-lg 
                          font-medium tracking-wide
                          hover:bg-[#FFC542]/10 
                          transition-all duration-200 
                          shadow-sm backdrop-blur-md
                        "
                      >
                        Share your mood
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Mood picker */}
            {showMood && (
              <div className="flex flex-col items-center px-4 sm:px-8 mt-8 sm:mt-10 md:mt-12 space-y-8 sm:space-y-10">
                {!showExperience ? (
                  <>
                    <motion.h2
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="text-lg sm:text-xl font-medium italic text-warm-white text-center"
                    >
                      👉 Pick up to <span className="text-[#FFC542]">3</span> moods —<br />{" "}
                      <span className="text-[#FFC542]">Sol</span> blends your feelings into one unique recommendation.
                    </motion.h2>

                    <MoodSelector
                      selectedMoods={mood}
                      setSelectedMoods={setMood}
                      onContinue={() => setStep(2)}
                    />

                    <div className="flex justify-center gap-4 flex-wrap ">
                      <button
                        onClick={() => setShowExperience(true)}
                        className="
                          px-6 py-3 rounded-full
                          bg-[#FFC542]/10 hover:bg-[#FFC542]/20 
                          text-[#FFC542] font-semibold 
                          drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] 
                          transition-all duration-200
                        "
                      >
                        Pick a vibe instead?
                      </button>

                      <button
                        onClick={() => setShowMood(false)}
                        className="
                          px-6 py-3 rounded-full 
                          border border-[#FFC542]/30 
                          text-[#FFC542]/70 hover:text-[#FFC542] 
                          drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] 
                          transition-all duration-200
                        "
                      >
                        Back
                      </button>
                    </div>
                  </>
                ) : (
                  <ExperienceSelector
                    setExperience={(mappedMood) => {
                      setMood(mappedMood);
                      setShowExperience(false);
                      setStep(2);
                    }}
                    onBack={() => setShowExperience(false)}
                  />
                )}
              </div>
            )}
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <IntentSelector
              mood={mood}
              setIntent={(selected) => {
                setIntent(selected);
                setStep(3);
              }}
            />
            <div className="text-center mt-6">
              <button
                onClick={() => setStep(1)}
                className="text-sm text-gray-400 hover:text-white underline"
              >
                ← Go back
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <EnergySelector
              setEnergy={(energyLevel) => {
                setEnergy(energyLevel);
                setStep(4);
              }}
            />
            <div className="text-center mt-6">
              <button
                onClick={() => setStep(2)}
                className="text-sm text-gray-400 hover:text-white underline"
              >
                ← Go back
              </button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

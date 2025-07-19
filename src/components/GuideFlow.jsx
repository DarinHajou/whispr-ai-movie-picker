    import { useState } from "react";
    import { TypeAnimation } from "react-type-animation";
    import MoodSelector from "./MoodSelector"
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
          {/* STEP 1 */}
            {step === 1 && (
              <>
                {/* Intro animation */}
                {!showExperience && (
                  <motion.div
                    className="flex justify-center mt-8 min-h-[160px]"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                  >
                    <div className="w-full max-w-lg text-center">
                      <TypeAnimation
                      
                        sequence={[
                          "👋 Hi",
                          1000,
                          "I’m Sol.",
                          1000,
                          "Tell me how you feel, and I’ll whisper something worth watching.",
                          400,
                          () => setHasTypedFinished(true),,
                        ]}
                        speed={95}
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
                        <div className="mt-12 text-center">
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
                  <div className="flex flex-col items-center mt-8 space-y-8">
                    {!showExperience ? (
                      <>
                        <motion.h2
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="text-lg sm:text-xl font-medium italic text-warm-white text-center"
                        >
                          👉 Pick up to 3 moods — Sol blends your feelings into one unique recommendation.
                        </motion.h2>
                        <MoodSelector
                          selectedMoods={mood}
                          setSelectedMoods={setMood}
                          onContinue={() => setStep(2)}
                        />
                        <div className="mt-12 text-center">
                          <div className="h-12" />
                          <button
                            onClick={() => setShowExperience(true)}
                            className="
                              mt-2 text-sm sm:text-base 
                              px-6 py-2 rounded-full border border-amber-400/30 
                              text-[#FFC542] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]
                              hover:bg-amber-400/10 transition
                            "
                          >
                            Pick a vibe instead
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
                <div className="text-center mt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm text-gray-400 hover:text-white underline focus:outline-none focus:shadow-[0_0_0_2px_rgba(244,194,135,0.6)]"                >
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
          </motion.div>
        </AnimatePresence>
      );
    }

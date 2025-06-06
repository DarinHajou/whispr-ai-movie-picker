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
            {!showExperience && (
    <motion.div
      className="flex justify-center mt-8 min-h-[160px]"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
    >
      <div className="w-full max-w-lg text-center text-glow-amber font-medium text-lg sm:text-xl">
        <span className="inline-block w-full">
          <TypeAnimation
            sequence={[
              "👋 Hi",
              1000,
              "I’m Sol.",
              1000,
              "Tell me how you feel, and I’ll whisper something worth watching.",
              400,
              () => setShowMood(true),
            ]}
            speed={95}
            wrapper="span"
            cursor={true}
            repeat={0}
          />
        </span>
      </div>
    </motion.div>
  )}


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
                    👉 Pick a mood — Sol’s listening.
                  </motion.h2>
                  <MoodSelector
                    setMood={(selected) => {
                      setMood(selected);
                      setStep(2);
                    }}
                  />
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setShowExperience(true)}
                      className="text-sm text-glow-amber underline opacity-80 hover:opacity-100 transition"
                    >
                      Not sure how you feel? Pick an experience instead.
                    </button>
                  </div>
                </>
              ) : (
                <ExperienceSelector
                  setExperience={(selected) => {
                    setShowExperience(selected);
                    setStep(3); // or whatever next step you want
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

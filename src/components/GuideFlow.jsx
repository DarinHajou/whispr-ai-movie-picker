import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import MoodSelector from "./MoodSelector";
import IntentSelector from "./IntentSelector";
import EnergySelector from "./EnergySelector";
import { AnimatePresence, motion } from "framer-motion";

export default function GuidedFlow({
  step,
  setStep,
  mood,
  setMood,
  setIntent,
  setEnergy,
}) {
  const [showMood, setShowMood] = useState(false);

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
            <motion.div
							className="text-lg sm:text-xl text-glow-amber font-medium text-center mt-9 max-w-md mx-auto"
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
						>
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
								speed={90}
								wrapper="span"
								cursor={true}
								repeat={0}
							/>
						</motion.div>


            {showMood && (
              <div className="flex flex-col items-center mt-12 space-y-4">
                <motion.h2
									initial={{ opacity: 0, scale: 0.98 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.4, ease: "easeOut" }}
									className="text-base sm:text-lg font-medium text-warm-white mb-4 text-center"
								>
									Pick a mood — Sol’s listening.
								</motion.h2>


                <MoodSelector
                  setMood={(selected) => {
                    setMood(selected);
                    setStep(2);
                  }}
                />
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

import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import MoodSelector from "./moodSelector";
import IntentSelector from "./intentSelector";
import EnergySelector from "./energySelector";

export default function GuidedFlow({ step, setStep, mood, setMood, intent, setIntent, energy, setEnergy }) {
  const [showMood, setShowMood] = useState(false);

  if (step === 1) {
    return (
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
    );
  }

  if (step === 2) {
    return (
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
    );
  }

  if (step === 3) {
    return (
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
    );
  }

  return null;
}
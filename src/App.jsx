import { useState } from "react";
import MoodSelector from "./components/moodSelector";
import IntentSelector from "./components/intentSelector";
import EnergySelector from "./components/energySelector";

function App() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(null);
  const [intent, setIntent] = useState(null);
  const [energy, setEnergy] = useState(null);

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center px-4 py-8">
      <main className="w-full max-w-xl space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">SibylAI</h1>
          <p className="text-sm text-gray-400 mt-1">How do you feel today?</p>
        </header>

        {step === 1 && (
          <MoodSelector
            setMood={(selected) => {
              setMood(selected);
              setStep(2);
            }}
          />
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
            onClick={() => setStep(1)}
            className="text-sm text-gray-400 hover:text-white underline"
          >
            ← Go back
          </button>
        </div>
      </>
    )}

        {step === 4 && (
          <>
            <p className="text-center text-green-400">
              Mood: <strong>{mood}</strong><br />
              Intent: <strong>{intent}</strong><br />
              Energy: <strong>{energy}</strong><br />
              ✅ Ready to build prompt!
            </p>

            <div className="text-center mt-4 space-y-2">
              <button
                onClick={() => setStep(3)}
                className="block text-sm text-gray-400 hover:text-white underline"
              >
                ← Go back
              </button>

              <button
                onClick={() => {
                  setMood(null);
                  setIntent(null);
                  setEnergy(null);
                  setStep(1);
                }}
                className="block text-sm text-gray-400 hover:text-white underline"
              >
                ↻ Start over
              </button>
            </div>
          </>
        )}

        <footer className="text-center text-xs text-gray-600 mt-10">
          Built with ❤️ by you
        </footer>
      </main>
    </div>
  );
}

export default App;

// App.jsx
import { useState } from "react";
import MoodSelector from "./components/MoodSelector";
import IntentSelector from "./components/IntentSelector";

function App() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(null);
  const [intent, setIntent] = useState(null);

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center px-4 py-8">
      <main className="w-full max-w-xl space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">SibylAI</h1>
          <p className="text-sm text-gray-400 mt-1">How do you feel today?</p>
        </header>

        {step === 1 && (
          <MoodSelector
            setMood={(mood) => {
              setMood(mood);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <IntentSelector
            mood={mood}
            setIntent={(intent) => {
              setIntent(intent);
              setStep(3);
            }}
          />
        )}

        {step === 3 && (
          <p className="text-center text-green-400">
            ✅ Mood: <strong>{mood}</strong>, Intent: <strong>{intent}</strong><br />
            (Next: EnergySelector)
          </p>
        )}

        <footer className="text-center text-xs text-gray-600 mt-10">
          Built with ❤️ by you
        </footer>
      </main>
    </div>
  );
}

export default App;

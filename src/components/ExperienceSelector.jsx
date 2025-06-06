export default function ExperienceSelector({ setExperience, onBack }) {
  const experiences = [
    {
      label: "Feel Something Deep",
      description: "Give me an experience with emotional depth."
    },
    {
      label: "Fun and Light",
      description: "I want something uplifting and easy."
    },
    {
      label: "Process Something Heavy",
      description: "Help me process a difficult emotion."
    },
    {
      label: "Make Me Think",
      description: "Show me something thought-provoking."
    },
    {
      label: "Escape Reality",
      description: "Let me lose myself in another world."
    }
  ];

  return (
    <div className="space-y-8 w-full max-w-xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl font-semibold  text-glow-amber">
        What kind of experience are you in the mood for?
      </h2>

      <div className="space-y-4">
        {experiences.map(({ label, description }) => (
          <button
            key={label}
            onClick={() => setExperience(label)}
            className="
              w-full text-left px-5 py-4 sm:py-5 rounded-xl
              bg-[#1d283a] hover:bg-[#2a3650]
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-glow-amber
              transition-all duration-200
            "
          >
            <span className="block text-lg sm:text-xl font-semibold text-warm-white">
              {label}
            </span>
            <span className="block text-sm sm:text-base text-gray-400 mt-1">
              {description}
            </span>
          </button>
        ))}
      </div>

      {onBack && (
        <div className="text-center mt-4">
          <button
            onClick={onBack}
            className="text-sm text-gray-400 hover:text-white underline focus:outline-none focus:shadow-[0_0_0_2px_rgba(244,194,135,0.6)]"
          >
            ← Back to moods
          </button>
        </div>
      )}
    </div>
  );
}

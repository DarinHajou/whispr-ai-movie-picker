// ExperienceSelector.jsx
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
    <div className=" space-y-6 w-full max-w-lg mx-auto text-center">
      <h2
        className="
          text-xl sm:text-3xl
          font-semibold
          text-[#FFC542]                            
        "
      >
        What kind of experience are you in the mood for?
      </h2>


      <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 w-full max-w-[560px] justify-items-center py-8 sm:py-6">
        {experiences.map(({ label, description }) => (
          <button
            key={label}
            onClick={() => {
              const experienceToMood = {
                "Feel Something Deep": "Sad",
                "Fun and Light": "Happy",
                "Process Something Heavy": "Anxious",
                "Make Me Think": "Curious",
                "Escape Reality": "Adventurous",
              };
            
              const mappedMood = experienceToMood[label];
              setExperience(mappedMood); // send the mood to GuidedFlow
            }}
            
            className="
              w-full text-left px-4 sm:px-5 py-4 sm:py-5 rounded-xl
              bg-[#1d283a] hover:bg-[#2a3650]
              shadow-sm hover:shadow-lg
              transform hover:scale-[1.02]
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-glow-amber
              transition-all duration-200
            "
          >
            <span className="block text-lg sm:text-xl font-semibold text-warm-white">
              {label}
            </span>
            <span className="block text-sm sm:text-base text-gray-300 mt-1 leading-relaxed">
              {description}
            </span>
          </button>
        ))}
      </div>


      {onBack && (
        <div className="text-center mt-2">
          <button
            onClick={onBack}
            className="
            text-sm text-gray-500 hover:text-white underline
            focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-glow-amber
            "
            >
            ← Back to moods
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

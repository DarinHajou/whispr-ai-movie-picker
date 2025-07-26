export default function IntentSelector({ mood, setIntent }) {
  const options = [
    { label: "Escape", description: "I just want to forget for a while" },
    { label: "Understand", description: "Help me process what I'm feeling" },
    { label: "Transform", description: "I want to shift this energy" },
  ];

  return (
    <div className="space-y-8 w-full max-w-xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl font-semibold mt-8 text-warm-white">
        What do you want to do with your{" "}
        <span
          className="
            italic
            text-[#FFC542]                          
          "
        >
          {Array.isArray(mood) && mood.length > 0
            ? mood
                .join(", ")
                .replace(/, ([^,]*)$/, " & $1")
                .toLowerCase()
            : "current"}
        </span>{" "}

        feeling?
      </h2>

      <div className="space-y-4">
        {options.map(({ label, description }) => (
          <button
            key={label}
            onClick={() => setIntent(label)}
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
    </div>
  );
}

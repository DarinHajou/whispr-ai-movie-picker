export default function MoodSelector({ setMood }) {
  const moods = [
    { label: "Sad", emoji: "😢", shift: "right-[14px]" },
    { label: "Defeated", emoji: "🥀", shift: "top-[2px]" },
    { label: "Lonely", emoji: "😔", shift: "right-[4px]" },
    { label: "Anxious", emoji: "😰", shift: "top-[1px]" },
    { label: "Bored", emoji: "🥱", shift: "right-[12px]" },
    { label: "Curious", emoji: "🧐", shift: "top-[1px]" },
    { label: "Inspired", emoji: "✨", shift: "right-[2px]" },
    { label: "Happy", emoji: "😊", shift: "right-[10px]" },
    { label: "Calm", emoji: "🌿", shift: "right-[5px]" },
    { label: "Romantic", emoji: "💘", shift: "right-[2px]" },
  ];

  return (
    <div className="w-full px-4 flex justify-center">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setMood(mood.label)}
            className="
              w-[120px] sm:w-[140px]
              flex items-center justify-center
              px-4 py-3 sm:px-5 sm:py-4
              text-base font-semibold
              text-soft-black bg-pale-sage rounded-xl
              transition duration-200 ease-in-out
              hover:bg-glow-amber hover:text-white hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-glow-amber
            "
            aria-label={`Select ${mood.label} mood`}
          >
            <span className="inline-flex items-center justify-center gap-2 leading-none">
              <span className={`text-[1.0rem] sm:text-[1.75rem] relative ${mood.shift}`}>
                {mood.emoji}
              </span>
              <span className="text-sm sm:text-base">{mood.label}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

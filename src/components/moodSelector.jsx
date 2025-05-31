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
    <div className="w-full px-2 flex justify-center">
      <div className="
          grid grid-cols-2 gap-3 max-w-sm
          sm:grid-cols-3 sm:max-w-md
          md:flex md:flex-wrap md:justify-center md:gap-4 md:max-w-3xl
        ">

        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setMood(mood.label)}
            className="
              flex items-center justify-center
              px-3 py-2 sm:px-4 sm:py-3
              text-sm font-medium
              text-soft-black bg-pale-sage rounded-xl
              transition duration-200 ease-in-out
              hover:bg-glow-amber hover:text-white hover:scale-[1.03]
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-glow-amber
            "
            aria-label={`Select ${mood.label} mood`}
          >
            <span className="inline-flex items-center justify-center gap-2 leading-none">
              <span className={`text-base sm:text-xl relative ${mood.shift}`}>
                {mood.emoji}
              </span>
              <span className="text-xs sm:text-sm">{mood.label}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );  
}

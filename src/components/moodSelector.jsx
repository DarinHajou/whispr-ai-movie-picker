export default function MoodSelector({ setMood }) {
  const moods = [
    { label: "Sad", emoji: "😢", shift: "right-[7px]" },
    { label: "Defeated", emoji: "🥀", shift: "top-[0px]" },
    { label: "Lonely", emoji: "😔", shift: "right-[2px]" },
    { label: "Anxious", emoji: "😰", shift: "top-[0px]" },
    { label: "Bored", emoji: "🥱", shift: "right-[0px]" },
    { label: "Curious", emoji: "🧐", shift: "top-[0px]" },
    { label: "Inspired", emoji: "✨", shift: "right-[0px]" },
    { label: "Happy", emoji: "😊", shift: "right-[5px]" },
    { label: "Calm", emoji: "🌿", shift: "right-[5px]" },
    { label: "Romantic", emoji: "💘", shift: "right-[-5px]" },
  ];

    return (
      <div className="w-full px-2 flex justify-center">
        <div className="
        grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl
        justify-items-center
      ">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setMood(mood.label)}
            className={`w-full px-3 py-2 text-base font-medium
              text-soft-black bg-pale-sage rounded-xl
              transition hover:bg-mood-hover hover:text-soft-black hover:scale-[1.02]
              focus:outline-none focus:shadow-[0_0_0_2px_rgba(244,194,135,0.6)]
              ${mood.label === "Calm" ? "col-start-2" : ""}
            `}            
            aria-label={`Select ${mood.label} mood`}
          >
            <span className="inline-flex items-center justify-center gap-2 leading-none">
             <span className={`text-2xl sm:text-3xl relative ${mood.shift}`}>
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

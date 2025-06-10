export default function MoodSelector({ setMood }) {
  const moods = [
    { label: "Sad", emoji: "😢", shift: "right-[13px]" },
    { label: "Nostalgic", emoji: "🥲", shift: "right-[-3px]" },
    { label: "Anxious", emoji: "😰", shift: "top-[0px]" },
    { label: "Scared", emoji: "😱", shift: "right-[6px]" },
    { label: "Explore", emoji: "🌍", shift: "top-[0px]" },
    { label: "Excited", emoji: "🤩", shift: "right-[2px]" },
    { label: "Happy", emoji: "😊", shift: "right-[5px]" },
    { label: "Romantic", emoji: "💘", shift: "right-[0px]" },
    { label: "Chill", emoji: "🌿", shift: "right-[12px]" },
    { label: "Curious", emoji: "🧐", shift: "top-[0px]" },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-[560px] justify-items-center py-8 sm:py-6">
        {moods.map((mood, idx) => {
          let extra = "";
          // Ads manual col-start on sm screens for last row
          if (idx === 8) extra = "sm:col-start-2";
          if (idx === 9) extra = "sm:col-start-3";
          return (
            <button
              key={mood.label}
              onClick={() => setMood(mood.label)}
              className={`
                w-full px-3 py-2 sm:py-3 
                text-sm sm:text-base 
                font-medium 
                text-soft-black 
                bg-pale-sage 
                rounded-xl 
                transition 
                hover:bg-mood-hover 
                hover:text-soft-black 
                hover:scale-[1.02] 
                focus:outline-none 
                focus:shadow-[0_0_0_2px_rgba(244,194,135,0.6)] 
                min-h-[44px] min-w-[44px] 
                ${extra}
              `}              
              aria-label={`Select ${mood.label} mood`}
            >
              <span className="inline-flex items-center gap-1 leading-none">
                <span className={`text-2xl sm:text-2xl relative ${mood.shift || ""}`}>{mood.emoji}</span>
                <span>{mood.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

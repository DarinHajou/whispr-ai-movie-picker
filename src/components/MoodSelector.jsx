import { useState } from "react";

export default function MoodSelector({ setMood }) {
  const [selected, setSelected] = useState([]);

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

  const toggleMood = (label) => {
    const isSelected = selected.includes(label);
    let updated;

    if (isSelected) {
      updated = selected.filter((m) => m !== label);
    } else if (selected.length < 3) {
      updated = [...selected, label];
    } else {
      return;
    }

    setSelected(updated);
    setMood(updated);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-[560px] justify-items-center py-8 sm:py-6">
        {moods.map((mood, idx) => {
          let extra = "";
          if (idx === 8) extra = "sm:col-start-2";
          if (idx === 9) extra = "sm:col-start-3";
          const isActive = selected.includes(mood.label);

          return (
            <button
              key={mood.label}
              onClick={() => toggleMood(mood.label)}
              className={`
                w-full px-3 py-2 sm:py-3 text-sm sm:text-base font-medium
                min-h-[44px] min-w-[44px] rounded-xl transition
                ${isActive ? "bg-glow-amber text-soft-black" : "bg-pale-sage text-soft-black hover:bg-mood-hover"}
                ${extra}
              `}
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

  import { useState } from "react";
  
  export default function MoodSelector({ selectedMoods, setSelectedMoods, onContinue }) {
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

    const toggleMood = (mood) => {
      if (selectedMoods.includes(mood)) {
        setSelectedMoods(selectedMoods.filter((m) => m !== mood));
      } else if (selectedMoods.length < 3) {
        setSelectedMoods([...selectedMoods, mood]);
      }
    };

    const handleContinue = () => {
      if (selectedMoods.length > 0) {
        onContinue();
      }
    };

    return (
      <div className="w-full flex flex-col items-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-[660px] justify-items-center py-8 sm:py-6">
          {moods.map((mood, idx) => {
            let extra = "";
            if (idx === 8) extra = "sm:col-start-2";
            if (idx === 9) extra = "sm:col-start-3";
            const isSelected = selectedMoods.includes(mood.label);
            return (
              <button
                key={mood.label}
                onClick={() => toggleMood(mood.label)}
                className={`
                  w-full px-3 py-2 sm:py-3 
                  text-sm sm:text-
                  font-medium 
                  ${isSelected ? "bg-yellow-200" : "bg-pale-sage"}
                  text-soft-black 
                  rounded-xl 
                  transition 
                  hover:bg-mood-hover 
                  hover:scale-[1.02] 
                  focus:outline-none 
                  min-h-[44px] min-w-[44px] 
                  ${extra}
                `}
                aria-label={`Select ${mood.label} mood`}
              >
                <span className="inline-flex items-center gap-1 leading-none">
                  <span className={`text-2xl sm:text-2xl relative ${mood.shift || ""}`}>
                    {mood.emoji}
                  </span>
                  <span>{mood.label}</span>
                </span>
              </button>
            );
          })}
        </div>
          
        {selectedMoods.length === 0 ? (
          <p className="text-sm text-white/60 mt-2">Step 1 of 3</p>
        ) : (
          <p className="text-sm text-[#FFC542] mt-2">{selectedMoods.length}/3 selected</p>
        )}

        {selectedMoods.length > 0 && (
         <button
          onClick={handleContinue}
          className="
            mt-8 px-6 py-3 rounded-full
            bg-[#FFC542]/70 hover:bg-[#FFC542]/90
            text-black font-semibold
            shadow-md hover:shadow-lg
            transition-all duration-200 ease-in-out
          "
        >
          Continue
        </button>

        )}
      </div>
    );
  }

  import { useState } from "react";
  
  export default function MoodSelector({ selectedMoods, setSelectedMoods, onContinue }) {
    const moods = [
      { label: "Sad", emoji: "😢" },
      { label: "Nostalgic", emoji: "🥲" },
      { label: "Anxious", emoji: "😰" },
      { label: "Scared", emoji: "😱" },
      { label: "Explore", emoji: "🌍" },
      { label: "Excited", emoji: "🤩" },
      { label: "Happy", emoji: "😊" },
      { label: "Romantic", emoji: "💘" },
      { label: "Chill", emoji: "🌿" },
      { label: "Curious", emoji: "🧐" },
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-[560px] justify-items-center py-4 sm:py-6">
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
                  w-full px-2 py-2 sm:py-4 
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
                <span className="flex items-center justify-start gap-2">
                  <span className="text-lg sm:text-2xl leading-8">{mood.emoji}</span>
                  <span className="text-sm sm:text-sm">{mood.label}</span>
                </span>
              </button>
            );
          })}
        </div>
          
        {selectedMoods.length === 0 ? (
          <p className="text-sm text-white/60 mt-2">Step 1 of 3</p>
        ) : (
          <p className="text-sm text-[#FFC542] mt-8">{selectedMoods.length}/3 selected</p>
        )}

        {selectedMoods.length > 0 && (
         <button
          onClick={handleContinue}
          className="
            mt-8 px-6 py-3 rounded-full
            bg-[#FFC542]/70 hover:bg-[#FFC542]/90
            text-black font-medium
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

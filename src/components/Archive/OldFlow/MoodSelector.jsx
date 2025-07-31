  import { useState } from "react";
  
  export default function MoodSelector({ selectedMoods, setSelectedMoods, onContinue }) {
    const moods = [
      { label: "Anger", emoji: "😠" },
      { label: "Fear ", emoji: "😱" },
      { label: "Hope", emoji: "🌅" },
      { label: "Love", emoji: "💘" },
      { label: "Sadness", emoji: "🥲" },
      { label: "Joy", emoji: "😊" },
      { label: "Wonder", emoji: "🤯" },
    ];

    const toggleMood = (mood) => {
      if (selectedMoods.includes(mood)) {
        setSelectedMoods(selectedMoods.filter((m) => m !== mood));
      } else if (selectedMoods.length < 2) {
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
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 sm:gap-6 w-full sm:min-w-[560px] justify-items-center py-4 sm:py-6">
          {moods.map((mood, idx) => {
            let extra = "";
            if (idx === moods.length - 1) extra = "col-start-2";
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
                <span className="flex items-center justify-start gap-1">
                  <span className="text-sm sm:text-2xl leading-8">{mood.emoji}</span>
                  <span className="text-medium sm:text-lg">{mood.label}</span>
                </span>
              </button>
            );
          })}
        </div>
          
        {selectedMoods.length === 0 ? (
          <p className="text-sm mb-8 text-white/60 mt-4">Step 1 of 2</p>
        ) : (
          <p className="text-sm text-[#FFC542] mt-8">{selectedMoods.length}/2 selected</p>
        )}

        {selectedMoods.length > 0 && (
         <button
          onClick={handleContinue}
          className="
            mt-8 mb-8 px-6 py-3 rounded-full
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

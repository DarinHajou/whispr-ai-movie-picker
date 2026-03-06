import React from "react";
import { motion } from "framer-motion";

// Our locked-in taxonomy with the "Layered Glow" colors
const CRAVINGS = [
  { id: "comfort", label: "Comfort", sub: "warm / steady", color: "#FFE7C2", shadow: "rgba(255,231,194,0.6)" },
  { id: "escape", label: "Escape", sub: "drifting / outward", color: "#25D0C5", shadow: "rgba(37,208,197,0.6)" },
  { id: "release", label: "Release", sub: "heavy / deep", color: "#8B1020", shadow: "rgba(139,16,32,0.8)" },
  { id: "wonder", label: "Wonder", sub: "shimmering / cosmic", color: "#7C3AED", shadow: "rgba(124,58,237,0.6)" },
  { id: "focus", label: "Focus", sub: "sharp / locked", color: "#0EA5E9", shadow: "rgba(14,165,233,0.6)" },
  { id: "thrill", label: "Thrill", sub: "fast / tight", color: "#FF2E2E", shadow: "rgba(255,46,46,0.6)" },
];

export default function EmotionPicker({ emotion, setEmotion, onNext }) {
  
  const handleSelect = (selectedCraving) => {
    setEmotion(selectedCraving); // Save the whole object so the Pinch screen knows the color
    onNext();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center w-full h-full pt-4 z-10 relative"
    >
      <h2 className="text-2xl sm:text-3xl font-light text-warm-white/90 mb-12 tracking-wide text-center">
        What are you craving?
      </h2>

      {/* Mobile-first Grid: 2 columns, 3 rows */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-12 w-full max-w-sm px-4">
        {CRAVINGS.map((craving) => (
          <div 
            key={craving.id} 
            className="flex flex-col items-center group cursor-pointer" 
            onClick={() => handleSelect(craving)}
          >
            {/* 
              THE ORB (Option B Implementation)
              Using layoutId for the seamless morph to the next screen! 
            */}
            <motion.div
              layoutId={`orb-${craving.id}`}
              className="w-20 h-20 rounded-full mb-4 relative"
              style={{
                // Core color + 3D spherical gradient
                background: `radial-gradient(circle at 35% 35%, ${craving.color} 0%, rgba(0,0,0,0.8) 90%)`,
                // Layered Glow: Inner highlight, Mid glow, Outer bloom
                boxShadow: `
                  inset -5px -5px 15px rgba(0,0,0,0.5), 
                  inset 5px 5px 10px rgba(255,255,255,0.4),
                  0 0 15px ${craving.shadow}, 
                  0 0 30px ${craving.shadow}
                `
              }}
              // The "Sleeping" breathing effect
              animate={{
                scale: [1, 1.04, 1],
                boxShadow: [
                  `inset -5px -5px 15px rgba(0,0,0,0.5), inset 5px 5px 10px rgba(255,255,255,0.4), 0 0 15px ${craving.shadow}, 0 0 30px ${craving.shadow}`,
                  `inset -5px -5px 15px rgba(0,0,0,0.5), inset 5px 5px 10px rgba(255,255,255,0.4), 0 0 25px ${craving.shadow}, 0 0 50px ${craving.shadow}`,
                  `inset -5px -5px 15px rgba(0,0,0,0.5), inset 5px 5px 10px rgba(255,255,255,0.4), 0 0 15px ${craving.shadow}, 0 0 30px ${craving.shadow}`
                ]
              }}
              transition={{
                duration: 3 + Math.random() * 2, // Randomizes breathing speed so they don't sync up perfectly
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Text Labels */}
            <span className="text-warm-white text-lg tracking-wider font-medium drop-shadow-md">
              {craving.label}
            </span>
            <span className="text-warm-white/50 text-[10px] italic mt-1 tracking-widest uppercase">
              {craving.sub}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
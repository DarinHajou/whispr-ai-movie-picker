import React from "react";
import { motion } from "framer-motion";

// The Locked 6-Orb Spec with Emotional Physics
const CRAVINGS = [
  { 
    id: "comfort", label: "Comfort", sub: "warm / steady", color: "#FFE7C2",
    animDuration: 6, ease: "easeInOut",
    scaleAnim: [1, 1.02, 1], // Barely moves, very plush
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 20px rgba(255,231,194,0.3)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 40px rgba(255,231,194,0.5)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 20px rgba(255,231,194,0.3)"
    ]
  },
  { 
    id: "escape", label: "Escape", sub: "drifting / outward", color: "#25D0C5",
    animDuration: 5, ease: "easeOut",
    scaleAnim: [1, 1.05, 1], // Soft tidal pull
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px rgba(37,208,197,0.4)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 60px rgba(37,208,197,0.6)", // Drifts far outward
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px rgba(37,208,197,0.4)"
    ]
  },
  { 
    id: "thrill", label: "Thrill", sub: "charged / alive", color: "#FF2E2E",
    animDuration: 1.5, ease: "circInOut",
    scaleAnim: [1, 1.08, 1, 1.03, 1], // Actual heartbeat double-pump
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 10px rgba(255,46,46,0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 35px rgba(255,46,46,0.9)", // Tight, hot glow
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 10px rgba(255,46,46,0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 20px rgba(255,46,46,0.7)",
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 10px rgba(255,46,46,0.6)"
    ]
  },
  { 
    id: "longing", label: "Longing", sub: "tender / reaching", color: "#F472B6",
    animDuration: 4, ease: "easeInOut",
    scaleAnim: [1, 1.04, 1],
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px rgba(244,114,182,0.4), 0 0 15px rgba(244,114,182,0.1)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 25px rgba(244,114,182,0.6), 0 0 50px rgba(244,114,182,0.3)", // Double ring bloom
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px rgba(244,114,182,0.4), 0 0 15px rgba(244,114,182,0.1)"
    ]
  },
  { 
    id: "release", label: "Release", sub: "heavy / deep", color: "#8B1020",
    animDuration: 3, ease: "easeIn", // easeIn gives it that heavy "falling" weight
    scaleAnim: [1, 1.05, 0.98, 1], // Dips slightly below 1 to feel dense and heavy
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.8), 0 0 10px rgba(139,16,32,0.8)",
      "inset -5px -5px 15px rgba(0,0,0,0.8), 0 0 40px rgba(139,16,32,0.4)", // Darker, lower halo
      "inset -5px -5px 15px rgba(0,0,0,0.8), 0 0 8px rgba(139,16,32,0.9)",
      "inset -5px -5px 15px rgba(0,0,0,0.8), 0 0 10px rgba(139,16,32,0.8)"
    ]
  },
  { 
    id: "wonder", label: "Wonder", sub: "shimmering / cosmic", color: "#7C3AED",
    animDuration: 3.5, ease: "linear",
    scaleAnim: [1, 1.02, 1, 1.03, 1, 1.01, 1], // Erratic, shivering scale
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 20px rgba(124,58,237,0.4)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 45px rgba(124,58,237,0.7)", // Bright shimmers
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px rgba(124,58,237,0.3)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 35px rgba(124,58,237,0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 25px rgba(124,58,237,0.5)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 20px rgba(124,58,237,0.4)"
    ]
  },
];

export default function EmotionPicker({ emotion, setEmotion, onNext }) {
  
  const handleSelect = (selectedCraving) => {
    setEmotion(selectedCraving);
    onNext();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center w-full h-full pt-4 z-10 relative"
    >
      <h2 className="text-2xl sm:text-3xl font-light text-warm-white/90 mb-12 tracking-wide text-center drop-shadow-sm">
        What are you craving?
      </h2>

      <div className="grid grid-cols-2 gap-x-12 gap-y-12 w-full max-w-sm px-4">
        {CRAVINGS.map((craving) => (
          <div 
            key={craving.id} 
            className="flex flex-col items-center group cursor-pointer" 
            onClick={() => handleSelect(craving)}
          >
            <motion.div
              layoutId={`orb-${craving.id}`}
              className="w-20 h-20 rounded-full mb-4 relative"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${craving.color} 0%, rgba(0,0,0,0.85) 90%)`,
              }}
              // Here is where the unique emotional physics are applied!
              animate={{
                scale: craving.scaleAnim,
                boxShadow: craving.shadowAnim
              }}
              transition={{
                duration: craving.animDuration,
                ease: craving.ease,
                repeat: Infinity,
              }}
            />
            
            <span className="text-warm-white text-lg tracking-wider font-medium drop-shadow-md">
              {craving.label}
            </span>
            <span className="text-warm-white/50 text-[10px] italic mt-1 tracking-widest uppercase drop-shadow-sm">
              {craving.sub}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
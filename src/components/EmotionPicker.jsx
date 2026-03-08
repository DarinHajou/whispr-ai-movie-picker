import React from "react";
import { motion } from "framer-motion";

// The Final "Extreme Physics" Spec
// The Final "Extreme Physics" Spec (Hover Floor Fixed!)
const CRAVINGS = [
  { 
    id: "comfort", label: "Comfort", sub: "warm / steady", color: "#FFE7C2",
    animDuration: 6, ease: "easeInOut",
    scaleAnim: [1, 1.02, 1],
    // FIXED: Now it hovers between 4px and 10px UP. It never drops to 0.
    yAnim: [-4, -10, -4], 
    times: [0, 0.5, 1], 
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 20px rgba(255,231,194,0.3)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 40px rgba(255,231,194,0.5)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 20px rgba(255,231,194,0.3)"
    ]
  },
  { 
    id: "escape", label: "Escape", sub: "drifting / outward", color: "#25D0C5",
    animDuration: 3, ease: "linear",
    scaleAnim: [1, 1.02, 1, 1.02],
    // FIXED: Starts at 0 (baseline) and goes way up to -20. No dropping down.
    yAnim: [0, -20], 
    opacityAnim: [0, 1, 1, 0], 
    times: [0, 0.2, 0.8, 1], 
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px rgba(37,208,197,0.4)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 40px rgba(37,208,197,0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 40px rgba(37,208,197,0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px rgba(37,208,197,0.4)"
    ]
  },
  { 
    id: "thrill", label: "Thrill", sub: "charged / alive", color: "#FF2E2E",
    animDuration: 1.5, ease: "linear",
    scaleAnim: [1, 1.06, 1, 1.02, 1],
    // FIXED: All negative numbers now. It twitches UP and settles slightly above the text.
    yAnim: [-2, -5, -1, -4, -2, -6, -1, -3, -2, -2], 
    xAnim: [0, 1, -2, 2, -1, 1, 0, -2, 1, 0],
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 10px rgba(255,46,46,0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 35px rgba(255,46,46,0.9)",
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 10px rgba(255,46,46,0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 20px rgba(255,46,46,0.7)",
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 10px rgba(255,46,46,0.6)"
    ]
  },
  { 
    id: "longing", label: "Longing", sub: "tender / reaching", color: "#F472B6",
    animDuration: 4, ease: "easeInOut",
    scaleAnim: [1, 1.03, 1],
    // Shifted floor up slightly
    yAnim: [-2, -6, -2], 
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px rgba(244,114,182,0.4), 0 0 15px rgba(244,114,182,0.1)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 25px rgba(244,114,182,0.6), 0 0 50px rgba(244,114,182,0.3)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px rgba(244,114,182,0.4), 0 0 15px rgba(244,114,182,0.1)"
    ]
  },
  { 
    id: "release", label: "Release", sub: "heavy / deep", color: "#8B1020",
    animDuration: 3, ease: "linear",
    scaleAnim: [1, 1.05, 1.05, 1],
    yAnim: [0, -12, -12, 0], 
    times: [0, 0.15, 0.85, 1], 
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.8), 0 0 10px rgba(139,16,32,0.8)",
      "inset -5px -5px 15px rgba(0,0,0,0.8), 0 0 40px rgba(139,16,32,0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.8), 0 0 40px rgba(139,16,32,0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.8), 0 0 10px rgba(139,16,32,0.8)"
    ]
  },
  { 
    id: "wonder", label: "Wonder", sub: "shimmering / cosmic", color: "#7C3AED",
    animDuration: 5, ease: "easeInOut",
    scaleAnim: [1, 1.02, 1.02, 1.05, 1.05, 1],
    yAnim: [0, -4, -4, -12, -12, 0], 
    times: [0, 0.25, 0.35, 0.6, 0.7, 1], 
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px rgba(124,58,237,0.3)", 
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.5)", 
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.5)", 
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 60px rgba(124,58,237,0.8)", 
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 60px rgba(124,58,237,0.8)", 
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px rgba(124,58,237,0.3)"  
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
      // CRITICAL FIX: Changed justify-center to justify-start
      className="flex flex-col items-center justify-start w-full h-full z-10 relative"
    >
      {/* 
        The Prompt
        mb-16 (64px) pushes the orbs safely away from the text.
        leading-snug gives the two lines of text room to breathe.
      */}
      <h2 className="text-[18px] sm:text-[22px] font-light text-[rgba(250,249,246,0.82)] mb-24 tracking-wide text-center leading-snug max-w-[300px] sm:max-w-[420px] mx-auto text-balance">
        Start with the feeling.<br/>We'll do the rest.
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
              // We inject X and Opacity tracks here to support the complex ones!
              animate={{
                scale: craving.scaleAnim,
                boxShadow: craving.shadowAnim,
                y: craving.yAnim,
                x: craving.xAnim || 0,
                opacity: craving.opacityAnim || 1
              }}
              transition={{
                duration: craving.animDuration,
                ease: craving.ease,
                times: craving.times, // THIS is the superpower engine!
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
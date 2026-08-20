import React from "react";
import { motion } from "framer-motion";

// The Final "Extreme Physics" Spec
// The Final "Extreme Physics" Spec (Hover Floor Fixed!)
const CRAVINGS = [
  {
    id: "comfort",
    label: "Comfort",
    sub: "warm / steady",
    color: "oklch(89% 0.06 85)",
    animDuration: 6,
    ease: "easeInOut",
    scaleAnim: [1, 1.02, 1],
    yAnim: [-4, -10, -4],
    times: [0, 0.5, 1],
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 20px oklch(89% 0.06 85 / 0.3)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 40px oklch(89% 0.06 85 / 0.5)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 20px oklch(89% 0.06 85 / 0.3)"
    ]
  },
  {
    id: "escape",
    label: "Escape",
    sub: "drifting / outward",
    color: "oklch(76% 0.26 185)", 
    animDuration: 3,
    ease: "linear",
    scaleAnim: [1, 1.02, 1, 1.02],
    yAnim: [0, -20, -20, 0], 
    opacityAnim:[0, 1, 1, 0], 
    times: [0, 0.2, 0.8, 1],
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px oklch(76% 0.26 185 / 0.4)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 40px oklch(76% 0.26 185 / 0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 40px oklch(76% 0.26 185 / 0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px oklch(76% 0.26 185 / 0.4)"
    ]
  },
  {
    id: "thrill",
    label: "Thrill",
    sub: "charged / alive",
    color: "oklch(59% 0.22 30)",
    animDuration: 1.5,
    ease: "linear",
    scaleAnim: [1, 1.06, 1, 1.02, 1],
    yAnim: [-2, -5, -1, -4, -2, -6, -1, -3, -2, -2],
    xAnim: [0, 1, -2, 2, -1, 1, 0, -2, 1, 0],
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 10px oklch(59% 0.22 30 / 0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 35px oklch(59% 0.22 30 / 0.9)",
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 10px oklch(59% 0.22 30 / 0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 20px oklch(59% 0.22 30 / 0.7)",
      "inset -5px -5px 15px rgba(0,0,0,0.6), 0 0 10px oklch(59% 0.22 30 / 0.6)"
    ]
  },
  {
    id: "longing",
    label: "Longing",
    sub: "tender / reaching",
    color: "oklch(78% 0.11 15)",
    animDuration: 4,
    ease: "easeInOut",
    scaleAnim: [1, 1.03, 1],
    yAnim: [-2, -6, -2],
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px oklch(78% 0.11 15 / 0.4)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 35px oklch(78% 0.11 15 / 0.7)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px oklch(78% 0.11 15 / 0.4)"
    ]
  },
  {
    id: "release",
    label: "Release",
    sub: "heavy / deep",
    color: "oklch(40% 0.12 250)",
    animDuration: 3,
    ease: "linear",
    scaleAnim: [1, 1.05, 1.05, 1],
    yAnim: [0, -12, -12, 0],
    times: [0, 0.15, 0.85, 1],
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.8), 0 0 10px oklch(40% 0.12 250 / 0.8)",
      "inset -5px -5px 15px rgba(0,0,0,0.8), 0 0 40px oklch(40% 0.12 250 / 0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.8), 0 0 40px oklch(40% 0.12 250 / 0.6)",
      "inset -5px -5px 15px rgba(0,0,0,0.8), 0 0 10px oklch(40% 0.12 250 / 0.8)"
    ]
  },
  {
    id: "wonder",
    label: "Wonder",
    sub: "shimmering / cosmic",
    color: "oklch(62% 0.24 295)",
    animDuration: 5,
    ease: "easeInOut",
    scaleAnim: [1, 1.02, 1.02, 1.05, 1.05, 1],
    yAnim: [0, -4, -4, -12, -12, 0],
    times: [0, 0.25, 0.35, 0.6, 0.7, 1],
    shadowAnim: [
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px oklch(62% 0.24 295 / 0.3)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 30px oklch(62% 0.24 295 / 0.5)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 30px oklch(62% 0.24 295 / 0.5)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 60px oklch(62% 0.24 295 / 0.8)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 60px oklch(62% 0.24 295 / 0.8)",
      "inset -5px -5px 15px rgba(0,0,0,0.5), 0 0 15px oklch(62% 0.24 295 / 0.3)"
    ]
  }
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
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 relative"
              style={{
                background: `radial-gradient(
                  circle at 35% 35%,
                  color-mix(in oklch, ${craving.color} 52%, white) 0%,
                  ${craving.color} 22%,
                  color-mix(in oklch, ${craving.color} 65%, black) 58%,
                  rgba(0,0,0,0.88) 92%)`,
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
import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePinch } from "@use-gesture/react";

export default function IntensityPicker({ emotion, setIntensity, onNext }) {
  // 1. Lower the max scale to 1.5 to prevent overlap
  const rawScale = useMotionValue(0.6); 
  const smoothScale = useSpring(rawScale, { stiffness: 500, damping: 30 });

  // Update glow ranges to match the new 1.5 max
  const dynamicGlow = useTransform(
    smoothScale,
    [0.6, 1, 1.5], 
    [
      `0 0 10px ${emotion?.shadow || "rgba(255,255,255,0.5)"}, inset 0 0 5px rgba(255,255,255,0.2)`, 
      `0 0 30px ${emotion?.shadow || "rgba(255,255,255,0.5)"}, inset 5px 5px 10px rgba(255,255,255,0.4)`, 
      `0 0 80px ${emotion?.shadow || "rgba(255,255,255,0.5)"}, inset 10px 10px 20px rgba(255,255,255,0.6)`
    ]
  );

  const [intensityLabel, setIntensityLabel] = useState("Soft & Gentle");

  // 2. Clamp the pinch math to 1.5 max
  const bind = usePinch(({ offset: [s], event }) => {
    if (event && event.cancelable) event.preventDefault();

    const newScale = Math.max(0.6, Math.min(s, 1.5)); // Cap at 1.5x
    rawScale.set(newScale);

    if (newScale < 0.85) setIntensityLabel("Soft & Gentle");
    else if (newScale > 1.25) setIntensityLabel("Deep & Intense");
    else setIntensityLabel("Balanced");
  }, {
    from: () => [rawScale.get(), 0],
    pointer: { touch: true }
  });

  const handleConfirm = () => {
    setIntensity(intensityLabel);
    onNext();
  };

  if (!emotion) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ touchAction: "pan-y" }} 
      // Changed pt-8 to pt-2 (pushes it up) and pb-12 to pb-4 (closer to footer)
      className="flex flex-col items-center justify-between w-full h-full pt-2 pb-4 overflow-hidden select-none"
      {...bind()} 
    >
      
      {/* Top Helper Text - Added relative & z-10 so it stays above the glow */}
      <div className="text-center px-4 max-w-md relative z-10">
        <h2 className="text-xl sm:text-2xl font-light text-warm-white/90 tracking-wide">
          How deep into <span className="font-semibold text-white">{emotion.label}</span> should we go?
        </h2>
        <p className="text-sm text-warm-white/50 italic mt-3 animate-pulse drop-shadow-md">
          Pinch and pull to set the intensity.
        </p>
      </div>

      {/* THE GIANT ORB 
          Added a safe zone: min-h-[260px] and my-6 to guarantee the text is pushed away.
      */}
      <div className="flex-grow flex items-center justify-center relative w-full min-h-[260px] my-6">
        <motion.div
          layoutId={`orb-${emotion.id}`} 
          style={{
            scale: smoothScale,
            boxShadow: dynamicGlow,
            background: `radial-gradient(circle at 35% 35%, ${emotion.color} 0%, rgba(0,0,0,0.8) 90%)`,
          }}
          // Reduced base size from w-48 to w-40
          className="w-40 h-40 rounded-full cursor-grab active:cursor-grabbing"
        />
      </div>

      {/* Bottom Controls - Added relative & z-10 */}
      <div className="flex flex-col items-center h-28 justify-end relative z-10">
        <motion.span 
          key={intensityLabel} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-medium text-warm-white tracking-widest uppercase mb-6 drop-shadow-lg text-center"
        >
          {intensityLabel}
        </motion.span>

        <button
          onClick={handleConfirm}
          className="px-10 py-3 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.2)] text-warm-white rounded-full backdrop-blur-md transition-all duration-300 text-sm tracking-wider uppercase shadow-lg"
        >
          Confirm
        </button>
      </div>

    </motion.div>
  );
}
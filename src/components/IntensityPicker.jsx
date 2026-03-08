import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePinch } from "@use-gesture/react";

export default function IntensityPicker({ emotion, setIntensity, onNext }) {
  // 1. The Pinch Scale
  const rawScale = useMotionValue(0.6); 
  const smoothScale = useSpring(rawScale, { stiffness: 500, damping: 30 });

  // 2. The Massive Responsive Glow
  const dynamicGlow = useTransform(
    smoothScale,
    [0.6, 1, 1.5], 
    [
      `0 0 15px ${emotion.color}80, inset -5px -5px 15px rgba(0,0,0,0.5)`, 
      `0 0 50px ${emotion.color}b3, inset -5px -5px 15px rgba(0,0,0,0.5)`, 
      `0 0 120px ${emotion.color}, inset -5px -5px 15px rgba(0,0,0,0.5)`
    ]
  );

  const [intensityLabel, setIntensityLabel] = useState("Soft & Gentle");

  // 3. The Pinch Math
  const bind = usePinch(({ offset: [s], event }) => {
    if (event && event.cancelable) event.preventDefault();

    const newScale = Math.max(0.6, Math.min(s, 1.5));
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
      className="flex flex-col items-center justify-between w-full h-full pt-2 pb-4 overflow-hidden select-none"
      {...bind()} 
    >
      
      {/* Top Helper Text */}
      <div className="text-center px-4 max-w-md relative z-10 mt-4">
        <h2 className="text-xl sm:text-2xl font-light text-warm-white/90 tracking-wide">
          How deep into <span className="font-semibold" style={{ color: emotion.color }}>{emotion.label}</span> should we go?
        </h2>
        <p className="text-sm text-warm-white/50 italic mt-3 animate-pulse drop-shadow-md">
          Pinch and pull to set the intensity.
        </p>
      </div>

      {/* THE GIANT ORB (Pure 1-to-1 Gesture Control) */}
      <div className="flex-grow flex items-center justify-center relative w-full min-h-[260px] my-6">
        <motion.div
          layoutId={`orb-${emotion.id}`} 
          className="w-40 h-40 rounded-full cursor-grab active:cursor-grabbing"
          style={{
            scale: smoothScale,
            boxShadow: dynamicGlow,
            background: `radial-gradient(circle at 35% 35%, ${emotion.color} 0%, rgba(0,0,0,0.85) 90%)`,
          }}
        />
      </div>

      {/* Bottom Controls */}
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
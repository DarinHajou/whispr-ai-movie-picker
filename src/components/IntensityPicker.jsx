import React, { useRef,useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePinch } from "@use-gesture/react";

const INTENSITY_OPTIONS = [
  {
    shortLabel: "Soft",
    label: "Soft & Gentle",
    scale: 0.6,
  },
  {
    shortLabel: "Balanced",
    label: "Balanced",
    scale: 1,
  },
  {
    shortLabel: "Deep",
    label: "Deep & Intense",
    scale: 1.5,
  },
];

const DEFAULT_INTENSITY = INTENSITY_OPTIONS[0];

export default function IntensityPicker({ emotion, setIntensity, onNext }) {
  // 1. The Pinch Scale
  const rawScale = useMotionValue(DEFAULT_INTENSITY.scale);

  const [intensityLabel, setIntensityLabel] = useState(
    DEFAULT_INTENSITY.label
  );

  const smoothScale = useSpring(rawScale, {
    stiffness: 500,
    damping: 30,
  });

  const updateIntensityFromScale = (scale) => {
  const nextScale = Math.max(0.6, Math.min(scale, 1.5));

  rawScale.set(nextScale);

  if (nextScale < 0.85) {
    setIntensityLabel("Soft & Gentle");
  } else if (nextScale > 1.25) {
    setIntensityLabel("Deep & Intense");
  } else {
    setIntensityLabel("Balanced");
  }
};

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

  const handleIntensitySelect = (option) => {
    updateIntensityFromScale(option.scale);
  };

  // 3. The Pinch Math
  const bind = usePinch(
    ({ offset: [scale], event }) => {
      if (event?.cancelable) {
        event.preventDefault();
      }

      updateIntensityFromScale(scale);
    },
    {
      from: () => [rawScale.get(), 0],
      pointer: { touch: true },
    }
  );

  const mouseDragRef = useRef({
  active: false,
  pointerId: null,
  startY: 0,
  startScale: DEFAULT_INTENSITY.scale,
});

const handleMouseDragStart = (event) => {
  if (event.pointerType !== "mouse" || event.button !== 0) {
    return;
  }

  event.preventDefault();

  mouseDragRef.current = {
    active: true,
    pointerId: event.pointerId,
    startY: event.clientY,
    startScale: rawScale.get(),
  };

  event.currentTarget.setPointerCapture(event.pointerId);
};

const handleMouseDragMove = (event) => {
  const drag = mouseDragRef.current;

  if (
    !drag.active ||
    event.pointerType !== "mouse" ||
    event.pointerId !== drag.pointerId
  ) {
    return;
  }

  event.preventDefault();

  // Up creates a positive value; down creates a negative value.
  const verticalDistance = drag.startY - event.clientY;

  const nextScale =
    drag.startScale + verticalDistance / 220;

  updateIntensityFromScale(nextScale);
};

const handleMouseDragEnd = (event) => {
  const drag = mouseDragRef.current;

    if (!drag.active || event.pointerId !== drag.pointerId) {
      return;
    }

    mouseDragRef.current.active = false;
    mouseDragRef.current.pointerId = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

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
          onPointerDown={handleMouseDragStart}
          onPointerMove={handleMouseDragMove}
          onPointerUp={handleMouseDragEnd}
          onPointerCancel={handleMouseDragEnd}
          onLostPointerCapture={() => {
            mouseDragRef.current.active = false;
            mouseDragRef.current.pointerId = null;
          }}
          className="w-40 h-40 rounded-full cursor-grab active:cursor-grabbing"
          style={{
            scale: smoothScale,
            boxShadow: dynamicGlow,
            background: `radial-gradient(circle at 35% 35%, ${emotion.color} 0%, rgba(0,0,0,0.85) 90%)`,
          }}
        />
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col items-center h-28 mb-8 justify-end relative z-10">
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
{/* Three-step intensity selector */}
<div className="relative z-10 w-full max-w-md px-5 mb-5">
  <div className="relative">
    {/* Connecting line */}
    <div className="absolute left-[16.66%] right-[16.66%] top-[35px] h-px bg-white/20" />

    <div className="relative grid grid-cols-3">
      {INTENSITY_OPTIONS.map((option) => {
        const isSelected = intensityLabel === option.label;

        return (
          <button
            key={option.label}
            type="button"
            onClick={() => handleIntensitySelect(option)}
            aria-pressed={isSelected}
            className="flex flex-col items-center gap-3 text-center"
          >
            <span
              className={`text-xs sm:text-sm transition-colors duration-300 ${
                isSelected
                  ? "text-warm-white"
                  : "text-warm-white/40 hover:text-warm-white/70"
              }`}
            >
              {option.shortLabel}
            </span>

            <span
              className="relative z-10 h-3.5 w-3.5 rounded-full border transition-all duration-300"
              style={
                isSelected
                  ? {
                      backgroundColor: emotion.color,
                      borderColor: emotion.color,
                      boxShadow: `0 0 14px ${emotion.color}`,
                    }
                  : {
                      backgroundColor: "#121212",
                      borderColor: "rgba(255,255,255,0.35)",
                    }
              }
            />
          </button>
        );
      })}
    </div>
  </div>
</div>
    </motion.div>
  );
}
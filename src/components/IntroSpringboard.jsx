import React from "react";

export default function IntroSpringboard({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <p className="text-lg text-warm-white mb-4">
        Sol: How’s your heart feeling tonight?
      </p>
      <button
        onClick={onStart}
        className="px-6 py-3 bg-bright-amber text-soft-black rounded-full font-semibold"
      >
        ▶ Start
      </button>
    </div>
  );
}

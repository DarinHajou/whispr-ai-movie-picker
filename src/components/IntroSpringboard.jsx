import React, { useState, useEffect } from 'react';
import EmotionalPulseWavesBackground from './EmotionalPulseWavesBackground';

export default function IntroSpringboard({ onStart }) {
  // controls black overlay
  const [fade, setFade] = useState(true);
  // controls when text + button appear
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // start the fade-out next animation frame
    requestAnimationFrame(() => setFade(false));
    // when fade duration (e.g. 800ms) is up, show content
    const timeout = setTimeout(() => setShowContent(true), 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(18,18,18,1) 40%, rgba(18,18,18,0.75) 90%)'
        }}
      />

      {/* Blob animation */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <EmotionalPulseWavesBackground />
      </div>

      {/* Black overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.8s ease-out'  // matches the 800ms delay
        }}
      />

      {/* Intro content, shown only after the overlay has faded */}
      {showContent && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
          <p className="text-2xl font-mono text-warm-white mb-4">
            Sol: How’s your heart feeling tonight?
          </p>
          <button
            onClick={onStart}
            className="px-6 py-3 bg-bright-amber text-soft-black rounded-full font-semibold"
          >
            ▶ Start
          </button>
        </div>
      )}
    </div>
  );
}

import { motion } from 'framer-motion';
import EmotionalPulseWavesBackground from './EmotionalPulseWavesBackground';
import SolOrbCanvas from './SolOrbCanvas';
import React, { useState, useEffect, useRef } from 'react';
import SolSoulCloud from './SolSoulCloud';

export default function IntroSpringboard({ onStart }) {
  // Controls black overlay (fades out)
  const [fade, setFade] = useState(true);
  // Controls when to show typewriter text/button
  const [showContent, setShowContent] = useState(false);
  // Typewriter state
  const [greetText, setGreetText] = useState('');
  // Pulse state for orb
  const [pulse, setPulse] = useState(false);


  const fullText = "Hi, I’m Sol. How’s your heart feeling tonight? Hi, I’m Sol. How’s your heart feeling tonight? Hi, I’m Sol. How’s your heart feeling tonight?";

  const lastPulse = useRef(Date.now());

  function tryPulse() {
    const now = Date.now();
    if (now - lastPulse.current > 380) { // Adjust ms to taste
      setPulse(p => !p);
      lastPulse.current = now;
    }
  }

  useEffect(() => {
    const fadeStart = 1000;              // 1s: how long the black stays
    const orbFadeDuration = 3500;        // 2.5s: orb intro fade
    const contentDelay = fadeStart + orbFadeDuration; // total wait before text/button

    const fadeTimer = setTimeout(() => setFade(false), fadeStart);
    const contentTimer = setTimeout(() => setShowContent(true), contentDelay);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  // Typewriter effect & pulse
   useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      const nextChar = fullText[i];
      setGreetText(fullText.slice(0, ++i));
      if (
        nextChar === " " ||
        nextChar === "." ||
        nextChar === "," ||
        nextChar === "!" ||
        nextChar === "?" ||
        i === fullText.length
      ) {
        tryPulse();
      }
      if (i >= fullText.length) clearInterval(iv);
    }, 80);
    return () => clearInterval(iv);
  }, [showContent]);
  

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(18,18,18,1) 40%, rgba(18,18,18,0.75) 90%)'
        }}
      />

      {/* Blobs/ambient animation */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <EmotionalPulseWavesBackground />
      </div>

      

      {/* --- 3D ORB: Always visible but reacts only when showContent is true --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SolOrbCanvas pulse={pulse} />
      </div>

      {/* --- Black overlay that fades out --- */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.8s ease-out'
        }}
      />

      {/* --- Content (text & button): Only appears after full intro --- */}
      {showContent && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
          <p
            className="font-mono text-2xl text-warm-white mb-6"
            style={{ textShadow: '0 0 8px rgba(255,197,66,0.75)' }}
          >
            {greetText}
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

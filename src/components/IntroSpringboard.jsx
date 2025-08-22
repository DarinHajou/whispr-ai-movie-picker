import { motion } from 'framer-motion';
import EmotionalPulseWavesBackground from './EmotionalPulseWavesBackground';
import React, { useState, useEffect, useRef } from 'react';

export default function IntroSpringboard({ onStart }) {
  const [fade, setFade] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [greetText, setGreetText] = useState('');
  const [pulse, setPulse] = useState(false);

  const fullText = "Hi, I’m Sol. How’s your heart feeling tonight?";
  const lastPulse = useRef(Date.now());

  useEffect(() => {
    const fadeStart = 1000;
    const orbFadeDuration = 3500;
    const contentDelay = fadeStart + orbFadeDuration;

    const fadeTimer = setTimeout(() => setFade(false), fadeStart);
    const contentTimer = setTimeout(() => setShowContent(true), contentDelay);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  useEffect(() => {
    if (!showContent) return;
    let i = 0;
    const isVowel = (c) => /[aeiouAEIOU]/.test(c);
    const minInterval = 200;

    const iv = setInterval(() => {
      const now = Date.now();
      const nextChar = fullText[i];
      setGreetText(fullText.slice(0, ++i));

      if (nextChar && isVowel(nextChar) && now - lastPulse.current > minInterval) {
        setPulse(p => !p);
        lastPulse.current = now;
      }

      if (i >= fullText.length) {
        clearInterval(iv);
      }
    }, 80);

    return () => clearInterval(iv);
  }, [showContent]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">

      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(18,18,18,1) 40%, rgba(18,18,18,0.75) 90%)'
        }}
      />

      {/* Background Blobs/Waves */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <EmotionalPulseWavesBackground />
      </div>

      {/* Mist Orb */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: pulse ? 0.25 : 0.15,
          scale: pulse ? 1.08 : 1.02,
        }}
        transition={{ duration: 4, ease: 'easeInOut' }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      >
        <source src="/assets/sol-mist-orb.webm" type="video/webm" />
      </motion.video>

      {/* Fade from black */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.8s ease-out'
        }}
      />

      {/* Typewriter and Start */}
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

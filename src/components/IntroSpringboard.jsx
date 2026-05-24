'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SolIntroText from './SolIntroText';

export default function IntroSpringboard({ onStart }) {
  const [orbOn, setOrbOn] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [solSpeaking, setSolSpeaking] = useState(false);

  // ===== TUNING KNOBS =====
  const ORB_SIZE = '70vmin';

  // Soft, atmospheric orb treatment.
  const FILTER = 'brightness(0.6) contrast(0.92) saturate(0.4) blur(0.9px)';
  const ORB_OPACITY = 0.4;

  const PLAYBACK = 0.75;
  const TYPE_DELAY = 1.0;
  const TYPE_STEP = 0.028;

  // Keeps the final intro state darker than raw #1E1E1E.
  const FINAL_BLACK_VEIL = 0.52;
  // ========================

 useEffect(() => {
  const t1 = setTimeout(() => {
    setOrbOn(true);
  }, 1850);

  const t2 = setTimeout(() => {
    setShowContent(true);
  }, 2250);

  const t3 = setTimeout(() => {
    setSolSpeaking(true);
  }, 2250 + TYPE_DELAY * 1000);

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
  };
}, []);

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden bg-[#1E1E1E]"
      onClick={showHint ? onStart : undefined}
      style={{ cursor: showHint ? 'pointer' : 'default' }}
    >
      {/* Fade layer: holds pure black, then slowly reveals the cinematic background */}
      <motion.div
        className="absolute inset-0 z-[0] pointer-events-none bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: FINAL_BLACK_VEIL }}
        transition={{
          delay: 0.5,
          duration: 2.6,
          ease: 'easeInOut',
        }}
      />

      {/* Base dark-room atmosphere: includes the vignette, so we do not need a second vignette layer */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 46%, rgba(24,24,24,0.52) 0%, rgba(10,10,10,0.68) 44%, rgba(0,0,0,0.92) 86%)',
        }}
      />

      {/* Orb */}
      <motion.div
        className="absolute inset-0 z-20 grid place-items-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.8, y: 18, filter: 'blur(8px)' }}
        animate={orbOn ? { opacity: 1, scale: 1, y: -124, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Soft atmosphere behind orb so it feels embedded, not pasted */}
        <motion.div
          className="absolute rounded-full blur-2xl"
          initial={{ opacity: 0.22, scale: 1 }}
          animate={
            solSpeaking
              ? {
                  opacity: [0.22, 0.48, 0.26, 0.56, 0.3, 0.44, 0.24],
                  scale: [1, 1.045, 1.01, 1.06, 1.02, 1.04, 1],
                }
              : {
                  opacity: 0.22,
                  scale: 1,
                }
          }
          transition={
            solSpeaking
              ? {
                  duration: 0.75,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : {
                  duration: 0.35,
                  ease: 'easeOut',
                }
          }
          style={{
            width: `calc(${ORB_SIZE} * 1.05)`,
            height: `calc(${ORB_SIZE} * 1.05)`,
            background:
              'radial-gradient(circle, rgba(198,166,124,0.34) 0%, rgba(198,166,124,0.16) 38%, rgba(198,166,124,0.04) 62%, rgba(0,0,0,0) 78%)',
          }}
        />

        {/* Orb video */}
        <div
          className="relative rounded-full overflow-hidden flex items-center justify-center"
          style={{
            width: ORB_SIZE,
            height: ORB_SIZE,
            opacity: ORB_OPACITY,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            className="absolute inset-0"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: FILTER,
              mixBlendMode: 'screen',
            }}
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = PLAYBACK;
            }}
          >
            <source src="/images/3887324375-preview.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>

      {/* Text */}
      {showContent && (
        <div className="absolute inset-0 z-30 flex items-center justify-center px-6 pointer-events-none">
          <div className="relative w-full max-w-lg flex items-center justify-center translate-y-[0vh] sm:translate-y-[6vh]">
            {/* Local text readability shadow: follows the text, does not brighten the whole scene */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.18) 52%, rgba(0,0,0,0) 78%)',
                filter: 'blur(20px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: TYPE_DELAY, duration: 0.8 }}
            />

            <div className="relative">
              <SolIntroText
                typeDelay={TYPE_DELAY}
                typeStep={TYPE_STEP}
                treatment="warmProjection"
                onDone={() => {
                  setSolSpeaking(false);
                  setShowHint(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom hint */}
      {showHint && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.18, 0.75, 0.18] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 bottom-28 sm:bottom-32 z-40 -translate-x-1/2 whitespace-nowrap text-[14px] sm:text-[13px] uppercase tracking-[0.32em]"
          style={{
            color: 'rgba(198, 166, 124, 0.92)',
            textShadow: '0 0 6px rgba(255,244,226,0.06)',
          }}
        >
          TAP ANYWHERE TO BEGIN
        </motion.p>
      )}
    </motion.div>
  );
}
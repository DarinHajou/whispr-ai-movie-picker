'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SolIntroText from './SolIntroText';   // ✅ import the new component

/* ===================== IntroSpringboard ===================== */
export default function IntroSpringboard({ onStart }) {
  const [orbOn, setOrbOn] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // ===== TUNING KNOBS =====
  const ORB_SIZE   = '75vmin';
  const FILTER     = 'brightness(0.6) contrast(0.86) saturate(0.5) blur(2.4px)';
  const PLAYBACK   = 0.95;
  const TYPE_DELAY = 1.2;   // ⬅️ Pass to SolIntroText
  const TYPE_STEP  = 0.035; // ⬅️ Pass to SolIntroText
  // ========================

  useEffect(() => {
    const fadeStart = 800;
    const orbLagMs  = 1400;
    const textLag   = 1000;

    const t1 = setTimeout(() => setOrbOn(true), fadeStart + orbLagMs);
    const t2 = setTimeout(() => setShowContent(true), fadeStart + orbLagMs + textLag);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Base radial background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(18,18,18,1) 40%, rgba(18,18,18,0.75) 90%)',
        }}
      />

      {/* ORB */}
      <div
        className="absolute inset-0 grid place-items-center z-0"
        style={{ opacity: orbOn ? 0.7 : 0, transition: 'opacity 900ms ease-out' }}
      >
        <div
          className="relative rounded-full overflow-hidden flex items-center justify-center"
          style={{ width: ORB_SIZE, height: ORB_SIZE }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            className="absolute"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: FILTER,
            }}
            onLoadedMetadata={(e) => { e.currentTarget.playbackRate = PLAYBACK; }}
            onError={(e) => console.error('VIDEO LOAD FAILED', e)}
          >
            <source src="/images/orbzy.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Black overlay that fades out */}
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none"
        initial={{ opacity: 1, backgroundColor: "#000" }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.95 }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0.22), transparent 35%, transparent 65%, rgba(0,0,0,0.22))',
        }}
      />

      {/* TEXT + CTA */}
      {showContent && (
        <div className="relative z-30 h-full w-full grid place-items-center px-6 text-center pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
          <div className="relative max-w-xl w-full space-y-8">
            <motion.div
              className="absolute -inset-x-6 -inset-y-4 -z-10 rounded-2xl"
              style={{
                background:
                  'radial-gradient(50% 80% at 50% 50%, rgba(0,0,0,0.35), rgba(0,0,0,0.0))',
                filter: 'blur(2px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: TYPE_DELAY, duration: 0.5, ease: "easeOut" }}
            />

            {/* ✅ Use SolIntroText instead of inline SolSequence */}
            <SolIntroText
              typeDelay={TYPE_DELAY}
              typeStep={TYPE_STEP}
              className="font-display italic text-[20px] sm:text-[36px] leading-[1.15] sm:leading-[1.1]
                         tracking-[-0.01em] text-[#FFC542] drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
              onDone={() => setShowButton(true)}
            />

            {showButton && (
              <motion.button
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onClick={onStart}
                className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-7 rounded-full font-semibold
                            bg-[#FFC542] text-zinc-900 shadow-[0_8px_28px_rgba(255,197,66,0.18)]
                            hover:brightness-110 active:brightness-95
                            focus:outline-none focus:ring-2 focus:ring-[#FFC542]/60 focus:ring-offset-2 focus:ring-offset-black"
              >
                ▶ Start
              </motion.button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

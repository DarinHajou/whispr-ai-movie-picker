'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SolIntroText from './SolIntroText';

export default function IntroSpringboard({ onStart }) {
  const [orbOn, setOrbOn] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // ===== TUNING KNOBS =====
  const ORB_SIZE = '60vmin';
  const FILTER = 'brightness(0.3) contrast(0.92) saturate(0.4) blur(0.9px)';
  const ORB_OPACITY = 0.4;
  const PLAYBACK = 0.75;
  const TYPE_DELAY = 1.0;
  const TYPE_STEP = 0.028;
  // ========================

  useEffect(() => {
    // First let the screen sit in black, then reveal orb, then text
    const t1 = setTimeout(() => setOrbOn(true), 1400);
    const t2 = setTimeout(() => setShowContent(true), 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-black"
      onClick={showHint ? onStart : undefined}
      style={{ cursor: showHint ? 'pointer' : 'default' }}
    >
      {/* Base dark-room background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 46%, rgba(24,24,24,0.92) 0%, rgba(10,10,10,0.96) 42%, rgba(0,0,0,1) 82%)',
        }}
      />

      {/* Orb */}
      <motion.div
        className="absolute inset-0 z-10 grid place-items-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
        animate={orbOn ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.6, ease: 'easeOut' }}
      >
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
            <source src="/images/orb-4.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>

      {/* Real black fade overlay */}
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      />

      {/* Text */}
      {showContent && (
        <div className="absolute inset-0 z-30 flex items-center justify-center px-6">
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.26) 92%, rgba(0,0,0,0) 72%)',
              filter: 'blur(24px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: TYPE_DELAY, duration: 1 }}
          />

          <div className="relative w-full max-w-lg flex items-center justify-center -translate-y-12 sm:-translate-y-16">
            <SolIntroText
              typeDelay={TYPE_DELAY}
              typeStep={TYPE_STEP}
              treatment="warmProjection"
              onDone={() => setShowHint(true)}
            />
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
    </div>
  );
}
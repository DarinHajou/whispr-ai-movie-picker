'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SolIntroText from './SolIntroText';

export default function IntroSpringboard({ onStart }) {
  const [orbOn, setOrbOn] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [solSpeaking, setSolSpeaking] = useState(false);

  // =========================================================
  // INTRO TIMING KNOBS
  // =========================================================

  // When the orb begins entering the scene.
  // Increase = orb appears later.
  // Decrease = orb appears sooner.8
  const ORB_START_MS = 2250;

  // When the Sol text component appears.
  // SolIntroText still has its own internal timing after this.
  const TEXT_START_MS = 2250;

  // =========================================================
  // ORB VISUAL KNOBS
  // =========================================================

  // Overall size of the Sol orb.
  // 60vmin = smaller / calmer.
  // 70vmin = more cinematic / present.
  const ORB_SIZE = '40vmin';

  // Video treatment for the orb.
  // brightness = how visible/luminous the orb is.
  // contrast = how sharp/punchy the inner motion feels.
  // saturate = how colorful the orb feels.
  // blur = how soft/dreamlike the orb texture feels.
  const FILTER = 'brightness(0.9) contrast(0.85) saturate(0.6) blur(9.9px)';

  // Overall opacity of the orb video.
  // Lower = ghostlier, more atmospheric.
  // Higher = more obvious, more “AI presence”.
  const ORB_OPACITY = 1.6;

  // Video playback speed.
  // 1 = normal.
  // 0.75 = slower / calmer.
  // 1.25 = more active.
  const PLAYBACK = 0.85;

  // Orb entrance motion.
  // Starts lower and smaller, then grows and floats upward.
  const ORB_INITIAL_SCALE = 0;
  const ORB_FINAL_SCALE = 1;
  const ORB_START_Y = 18;
  const ORB_END_Y = -104;
  const ORB_ENTRY_BLUR = 'blur(60px)';
  const ORB_ENTRY_DURATION = 1.1;

  // =========================================================
  // SOL TEXT KNOBS
  // =========================================================

  // Passed into SolIntroText.
  // Controls when SolIntroText begins its internal type sequence.
  const TYPE_DELAY = 1.0;

  // Passed into SolIntroText.
  // Controls character stagger speed for the running sentence.
  const TYPE_STEP = 0.028;

  // =========================================================
  // BACKGROUND / CINEMATIC ROOM KNOBS
  // =========================================================

  // Final opacity of the black veil after the intro reveal.
  // Higher = darker / more cinematic.
  // Lower = reveals more of #1E1E1E.
  const FINAL_BLACK_VEIL = 0.62;

  // How long the intro sits in full black before the reveal starts.
  const BLACK_HOLD_DELAY = 1.0;

  // How slowly black reveals the background.
  const BLACK_REVEAL_DURATION = 1.6;

  // =========================================================
  // SPEAKING AURA KNOBS
  // =========================================================

  // Static aura behind orb. Always present.
  const STATIC_AURA_OPACITY = 0.16;

  // Active speaking aura. Only pulses when SolIntroText says Sol is speaking.
  const SPEAKING_AURA_DURATION = 0.98;

  useEffect(() => {
    const t1 = setTimeout(() => {
      setOrbOn(true);
    }, ORB_START_MS);

    const t2 = setTimeout(() => {
      setShowContent(true);
    }, TEXT_START_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden bg-[#121212] "
      onClick={showHint ? onStart : undefined}
      style={{ cursor: showHint ? 'pointer' : 'default' }}
    >
      {/* Black reveal overlay: holds black, then reveals the scene */}
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          delay: 0.65,
          duration: 1.5,
          ease: 'easeOut',
        }}
      />

      {/* 
        Base dark-room atmosphere:
        One background layer that gives depth + vignette.
        This avoids stacking too many separate vignette layers.
      */}
      <div
  className="absolute inset-0 z-[1] pointer-events-none"
  style={{
    background:
      'radial-gradient(circle at 50% 35%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.18) 10%, rgba(0,0,0,0.58) 44%, rgba(0,0,0,0.96) 66%)',
  }}
/>

      {/* 
        Orb:
        Represents Sol's presence.
        Positioned slightly above the text so orb and voice do not fight for the same center.
      */}
      <motion.div
        className="absolute inset-0 z-20 grid place-items-center pointer-events-none"
        initial={{
          opacity: 0,
          scale: ORB_INITIAL_SCALE,
          y: ORB_START_Y,
          filter: ORB_ENTRY_BLUR,
        }}
        animate={
          orbOn
            ? {
                opacity: 1,
                scale: ORB_FINAL_SCALE,
                y: ORB_END_Y,
                filter: 'blur(1px)',
              }
            : {}
        }
        transition={{
          duration: ORB_ENTRY_DURATION,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* 
          Static orb atmosphere:
          Always-on soft glow behind the orb.
          This makes the orb feel embedded in the scene rather than pasted on top.
        */}
        <div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: `calc(${ORB_SIZE} * 0.82)`,
            height: `calc(${ORB_SIZE} * 0.82)`,
            opacity: STATIC_AURA_OPACITY,
            background:
              'radial-gradient(circle, rgba(198,166,124,0.18) 0%, rgba(198,166,124,0.06) 45%, rgba(0,0,0,0) 62%)',
          }}
        />

        {/* 
          Speaking aura:
          Pulses only while SolIntroText reports that Sol is speaking.
          This should feel like voice activity, not video flicker.
        */}
        <motion.div
          className="absolute rounded-full blur-2xl pointer-events-none"
          initial={{ opacity: 0.22, scale: 1 }}
          animate={
            solSpeaking
              ? {
                  opacity: [0.22, 0.48, 0.26, 0.56, 0.3, 0.44, 0.24],
                  scale: [1, 1.095, 1.01, 1.06, 1.02, 1.04, 1],
                }
              : {
                  opacity: 0,
                  scale: 1,
                }
          }
          transition={
            solSpeaking
              ? {
                  duration: SPEAKING_AURA_DURATION,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
              : {
                  duration: 0.35,
                  ease: 'easeOut',
                }
          }
          style={{
            width: `calc(${ORB_SIZE} * 1.45)`,
            height: `calc(${ORB_SIZE} * 1.45)`,
            background:
              'radial-gradient(circle, rgba(198,166,124,0.34) 0%, rgba(198,166,124,0.16) 38%, rgba(198,166,124,0.04) 62%, rgba(0,0,0,0) 78%)',
          }}
        />

        {/* 
          Orb video:
          Keep this stable. Do not pulse the video itself.
          The speaking activity should happen in the aura layer above.
        */}
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
              objectFit: 'none',
              objectPosition: 'center',
              filter: FILTER,
              mixBlendMode: 'screen',
            }}
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = PLAYBACK;
            }}
          >
            <source src="/images/3861689515-preview.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>

      {/* 
        Text:
        SolIntroText controls its own phases:
        HI I'M SOL → pause → running sentence.
        It calls onSpeakingChange so the orb aura can pulse only while Sol is speaking.
      */}
      {showContent && (
        <div className="absolute inset-0 z-30 flex items-center justify-center px-6 pointer-events-none">
          <div className="relative w-full max-w-lg flex items-center justify-center translate-y-[2vh] sm:translate-y-[6vh]">
            {/* 
              Local text readability shadow:
              Small and attached to the text area.
              Avoids brightening the entire background when text appears.
            */}
            

            <div className="relative">
              <SolIntroText
                typeDelay={TYPE_DELAY}
                typeStep={TYPE_STEP}
                treatment="warmProjection"
                onSpeakingChange={setSolSpeaking}
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
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------- Smooth, cinematic letter reveal (no jank) ---------- */
function SmoothType({ text, delay = 1.6, step = 0.05, className = '', onComplete }) {
  const sentence = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { delay, staggerChildren: step } },
  };
  const letter = {
    hidden: { opacity: 0, y: '0.25em', filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  return (
    <motion.p
      variants={sentence}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onComplete}           // fires when last letter finishes
      className={`${className} mx-auto text-center`}
      style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
      aria-live="polite"
      aria-atomic="true"
    >
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          variants={letter}
          style={{ display: 'inline' }}   // let text flow naturally
        >
          {ch}
        </motion.span>
      ))}

    </motion.p>
  );
}

/* ---------- Old sequence: "Hi" → "I’m Sol." → final typed line ---------- */
function SolSequence({ typeDelay, typeStep, className, onDone }) {
  // steps: -1 (waiting), 0 ('Hi'), 1 ('I’m Sol.'), 2 (final typed)
  const [step, setStep] = useState(-1);

  // readable dwell per transient line (ms)
  const HI_MS  = 1200;
  const SOL_MS = 1800;

  
  useEffect(() => {
  document.documentElement.classList.add('overflow-hidden');
  return () => document.documentElement.classList.remove('overflow-hidden');
}, []);

  useEffect(() => {
    const start = typeDelay * 1000;
    const t0 = setTimeout(() => setStep(0), start);               // "👋 Hi"
    const t1 = setTimeout(() => setStep(1), start + HI_MS);       // "I’m Sol."
    const t2 = setTimeout(() => setStep(2), start + HI_MS + SOL_MS); // final line
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, [typeDelay]);

  return (
    <div className="w-full max-w-xl px-6 text-center">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.p
            key="hi"
            initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className={className}
          >
            👋 Hi
          </motion.p>
        )}

        {step === 1 && (
          <motion.p
            key="sol"
            initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className={className}
          >
            I’m Sol.
          </motion.p>
        )}

        {step === 2 && (
          <SmoothType
            key="final"
            text={"Tell me how you want to feel, and I'll whisper something worth watching."}
            delay={0}                          // start typing immediately at step 2
            step={typeStep}                    // keep your typing speed
            className={className + " leading-snug"}
            onComplete={onDone}               // ✅ call parent when typing finishes
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===================== IntroSpringboard ===================== */
export default function IntroSpringboard({ onStart }) {
  const [fade, setFade] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false); // button waits for sequence

  // ===== TUNING KNOBS (unchanged) =====
  const ORB_SIZE   = '65vmin';
  const MASK_INNER = '80%';
  const FILTER     = 'brightness(0.25) contrast(0.85) saturate(0.65) blur(0.4px)';
  const PLAYBACK   = 1;    // video speed
  const TYPE_DELAY = 1.2;    // when sequence starts (s)
  const TYPE_STEP  = 0.045;  // per-char delay (s)
  // ====================================

  // Fade schedule (unchanged)
  useEffect(() => {
    const fadeStart = 800;
    const contentDelay = fadeStart;
    const t1 = setTimeout(() => setFade(false), fadeStart);
    const t2 = setTimeout(() => setShowContent(true), contentDelay);
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
      <div className="absolute inset-0 grid place-items-center z-0">
        <div
          className="relative rounded-full overflow-hidden flex items-center justify-center"
          style={{
            width: ORB_SIZE,
            height: ORB_SIZE,
            WebkitMaskImage: `radial-gradient(circle, #ffffffff ${MASK_INNER}, transparent 100%)`,
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            WebkitMaskSize: 'cover',
            maskImage:    `radial-gradient(circle, #fff ${MASK_INNER}, transparent 100%)`,
            maskRepeat:   'no-repeat',
            maskPosition: 'center',
            maskSize:     'cover',
          }}
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
            onError={(e) => console.error('❌ VIDEO LOAD FAILED', e)}
          >
            <source src="/images/orbz2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Black fade overlay */}
     <div
        className="absolute inset-0 z-10"
        style={{ background: 'rgba(0,0,0,0.58)', transition: 'background 0.6s ease-in-out' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}
      />


      {/* Subtle vignette for text readability */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.22), transparent 35%, transparent 65%, rgba(0,0,0,0.22))',
        }}
      />

      {/* TEXT + CTA */}
      {showContent && (
        <div className="relative z-30 h-full w-full grid place-items-center px-6 text-center pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
          <div className="relative max-w-xl w-full space-y-6">
            <div
              className="absolute -inset-x-6 -inset-y-4 -z-10 rounded-2xl"
              style={{
                background:
                  'radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0.35), rgba(0,0,0,0.0))',
                filter: 'blur(2px)',
              }}
              aria-hidden
            />
            <SolSequence
              typeDelay={2.3}
              typeStep={0.045}
              className="font-display italic text-[28px] sm:text-[36px] leading-[1.15] sm:leading-[1.1]
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
                          bg-[#FFC542] text-zinc-900 shadow-[0_6px_24px_rgba(255,197,66,0.15)]
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

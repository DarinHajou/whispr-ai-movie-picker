import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------- Smooth, cinematic letter reveal (Sol’s permanent “voice”) ---------- */
function SmoothType({ text, delay = 1.6, step = 0.05, className = '', onComplete }) {
  const sentence = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { delay, staggerChildren: step } },
  };

  const letter = {
    // VOICE: Sol *always* animates letters like this (blur + slide in)
    hidden: { opacity: 0, y: '0.25em', filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  return (
    <motion.p
      variants={sentence}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onComplete}   // VOICE: always signal when done
      className={`${className} mx-auto text-center`}
      style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
      aria-live="polite"
      aria-atomic="true"
    >
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          variants={letter}               // VOICE: always apply letter animation
          style={{ display: 'inline' }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.p>
  );
}

/* ---------- “Hi” → “I’m Sol.” → final typed line ---------- */
export default function SolIntroText({ typeDelay, typeStep, className, onDone }) {
  const [step, setStep] = useState(-1);

  const HI_MS  = 1200;
  const SOL_MS = 1800;

  useEffect(() => {
    const start = typeDelay * 1000;

    const t0 = setTimeout(() => setStep(0), start);
    const t1 = setTimeout(() => setStep(1), start + HI_MS);
    const t2 = setTimeout(() => setStep(2), start + HI_MS + SOL_MS);

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, [typeDelay]);

  return (
    <div className="w-full max-w-xl px-2 text-center">
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
            delay={0}
            step={typeStep}
            className={className + " leading-snug"}
            onComplete={onDone}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

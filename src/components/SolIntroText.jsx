import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FINAL_TEXT = "Tell me what you're craving, and I'll whisper something worth watching.";

const TREATMENTS = {
  warmProjection: {
    introClass: "text-[11px] sm:text-[12px] uppercase tracking-[0.32em] font-medium",
    introStyle: {
      color: 'rgba(234, 228, 220, 0.56)',
      textShadow: '0 0 18px rgba(255, 244, 226, 0.06)',
    },
    lineClass: "font-sans text-[23px] sm:text-[29px] leading-[1.22] tracking-[-0.015em] font-light",
    lineStyle: {
      color: 'rgba(234, 228, 220, 0.86)',
      textShadow: '0 0 24px rgba(255, 244, 226, 0.05), 0 1px 0 rgba(255,255,255,0.03)',
    },
    accentClass: "font-normal",
    accentStyle: {
      color: 'rgba(198, 166, 124, 0.92)',
      textShadow: '0 0 18px rgba(198, 166, 124, 0.10)',
    },
  },

  silverSmoke: {
    introClass: "text-[11px] sm:text-[12px] uppercase tracking-[0.32em] font-medium",
    introStyle: {
      color: 'rgba(218, 214, 210, 0.48)',
      textShadow: '0 0 14px rgba(255,255,255,0.04)',
    },
    lineClass: "font-sans text-[23px] sm:text-[29px] leading-[1.22] tracking-[-0.01em] font-light",
    lineStyle: {
      color: 'rgba(224, 220, 215, 0.80)',
      textShadow: '0 0 22px rgba(255,255,255,0.035)',
    },
    accentClass: "font-normal",
    accentStyle: {
      color: 'rgba(191, 177, 159, 0.90)',
      textShadow: '0 0 16px rgba(191, 177, 159, 0.08)',
    },
  },

  smokedBronze: {
    introClass: "text-[11px] sm:text-[12px] uppercase tracking-[0.32em] font-medium",
    introStyle: {
      color: 'rgba(232, 226, 216, 0.50)',
      textShadow: '0 0 16px rgba(255, 244, 226, 0.05)',
    },
    lineClass: "font-sans text-[23px] sm:text-[29px] leading-[1.2] tracking-[-0.012em] font-light",
    lineStyle: {
      color: 'rgba(238, 232, 222, 0.83)',
      textShadow: '0 0 24px rgba(255, 244, 226, 0.045)',
    },
    accentClass: "font-normal",
    accentStyle: {
      color: 'rgba(176, 141, 102, 0.90)',
      textShadow: '0 0 18px rgba(176, 141, 102, 0.11)',
    },
  },
};

function SmoothType({
  text,
  delay = 0.42,
  step = 0.026,
  className = '',
  accentWord = '',
  treatment,
}) {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { delay, staggerChildren: step },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 6, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0.3px)',
      transition: { ease: [0.22, 1, 0.36, 1], duration: 0.68 },
    },
  };

  const normalizedAccent = accentWord.toLowerCase();

  return (
    <motion.p
      variants={sentence}
      initial="hidden"
      animate="visible"
      className={`${className} mx-auto mt-24 sm:mt-8 text-center max-w-[20ch] sm:max-w-[22ch]`}
      style={{ ...treatment.lineStyle, whiteSpace: 'normal', wordBreak: 'keep-all' }}
    >
      {text.split(' ').map((word, wordIdx) => {
        const cleaned = word.replace(/[^a-z']/gi, '').toLowerCase();
        const isAccent = cleaned === normalizedAccent;

        return (
          <span key={wordIdx} className="inline-block mr-[0.22em]">
            {word.split('').map((ch, charIdx) => (
              <motion.span
                key={`${wordIdx}-${charIdx}`}
                variants={letter}
                className={`inline-block ${isAccent ? treatment.accentClass : ''}`}
                style={isAccent ? treatment.accentStyle : undefined}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        );
      })}
    </motion.p>
  );
}

export default function SolIntroText({
  typeDelay = 0.85,
  typeStep = 0.026,
  onDone,
  treatment = 'warmProjection',
}) {
  const [phase, setPhase] = useState('idle');
  const look = TREATMENTS[treatment];
    useEffect(() => {
      const typeDelayMs = typeDelay * 1000 + 520; // delay intro slightly
      const introVisibleMs = 1250;                // let it breathe a bit longer
      const introFadeMs = 100;                    // softer fade out
      const gapMs = 180;

      const t0 = setTimeout(() => setPhase('intro'), typeDelayMs);
      const t1 = setTimeout(() => setPhase('intro-out'), typeDelayMs + introVisibleMs);
      const t2 = setTimeout(
        () => setPhase('final'),
        typeDelayMs + introVisibleMs + introFadeMs + gapMs
      );

      return () => {
        clearTimeout(t0);
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }, [typeDelay]);

  useEffect(() => {
    if (phase !== 'final' || !onDone) return;

    const glyphCount = FINAL_TEXT.replace(/\s/g, '').length;
    const totalMs = Math.round(glyphCount * typeStep * 1000 + 700);
    const t = setTimeout(() => onDone(), totalMs);

    return () => clearTimeout(t);
  }, [phase, typeStep, onDone]);

    return (
      <div className="w-full px-4 text-center">
        <AnimatePresence mode="wait">
          {(phase === 'intro' || phase === 'intro-out') && (
          <motion.div
            key="sol"
            initial={{ opacity: 0, y: 14, scale: 0.985, filter: 'blur(12px)' }}
            animate={
              phase === 'intro'
                ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0.4px)' }
                : { opacity: 0, y: -4, filter: 'blur(6px)' }
            }
            exit={{ opacity: 0 }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-[22%] -translate-y-1/2 flex justify-center"
          >
            <div
              className="flex flex-col outline-yellow-30 items-center leading-none uppercase"
              style={{
                color: 'rgba(236,230,222,0.82)',
                textShadow: '0 0 14px rgba(255,244,226,0.05)',
                letterSpacing: '0.18em',
                lineHeight: '1.3'
              }}
            >
              <span className="text-[20px] sm:text-[22px] outline-yellow-300 font-semibold">HI</span>
              <span className="mt-1 text-[20px] sm:text-[22px] font-semibold">I&apos;M</span>
              <span
                className="mt-1 text-[20px] sm:text-[22px] font-semibold"
                style={look.accentStyle}
              >
                SOL
              </span>
            </div>
          </motion.div>
        )}

        {phase === 'final' && (
          <SmoothType
            key="final"
            text={FINAL_TEXT}
            accentWord="whisper"
            delay={0}
            step={typeStep}
            className={look.lineClass}
            treatment={look}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
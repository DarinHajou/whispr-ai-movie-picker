import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Final sentence Sol types after the short intro.
 * This is the main “voice” line after HI / I'M / SOL.
 */
const FINAL_TEXT =
  "Tell me what you're craving, and I'll whisper something worth watching.";

/**
 * ===== SOL TEXT TIMING KNOBS =====
 *
 * These control the phase sequence:
 *
 * idle
 *   ↓
 * intro        = "HI / I'M / SOL"
 *   ↓
 * intro-out    = intro fades away
 *   ↓
 * final        = running sentence types
 *
 * The parent IntroSpringboard uses onSpeakingChange
 * to pulse the orb when Sol is actively “speaking”.
 */

// Extra wait after the parent mounts SolIntroText before "HI I'M SOL" appears.
// Increase = Sol waits longer before greeting.
// Decrease = greeting starts sooner.
const INTRO_START_OFFSET_MS = 120;

// How long "HI I'M SOL" stays visible before fading out.
// Increase = greeting breathes longer.
// Decrease = faster handoff to the running sentence.
const INTRO_HOLD_MS = 1450;

// How quickly "HI I'M SOL" fades away.
// Keep short for a clean cinematic handoff.
const INTRO_FADE_OUT_MS = 260;

// Pause between "HI I'M SOL" fading out and the running sentence starting.
// Increase = more cinematic pause.
// Decrease = running sentence starts sooner.
const FINAL_TEXT_GAP_MS = 850;

// Extra time after the final sentence finishes typing before onDone fires.
// This gives the line a moment to settle before the bottom hint appears.
const FINAL_DONE_BUFFER_MS = 450;
/**
 * ===== TEXT TREATMENTS =====
 *
 * These are visual presets.
 * warmProjection is the current main Sol voice treatment.
 */
const TREATMENTS = {
  warmProjection: {
    introClass:
      'text-[11px] sm:text-[12px] uppercase tracking-[0.32em] font-medium',
    introStyle: {
      color: 'rgba(234, 228, 220, 0.56)',
      textShadow: '0 0 18px rgba(255, 244, 226, 0.06)',
    },
    lineClass:
      'font-sans text-[23px] sm:text-[29px] leading-[1.22] tracking-[-0.015em] font-light',
    lineStyle: {
      color: 'rgba(234, 228, 220, 0.86)',
      textShadow:
        '0 0 24px rgba(255, 244, 226, 0.05), 0 1px 0 rgba(255,255,255,0.03)',
    },
    accentClass: 'font-normal',
    accentStyle: {
      color: 'rgba(198, 166, 124, 0.92)',
      textShadow: '0 0 18px rgba(198, 166, 124, 0.10)',
    },
  },

  silverSmoke: {
    introClass:
      'text-[11px] sm:text-[12px] uppercase tracking-[0.32em] font-medium',
    introStyle: {
      color: 'rgba(218, 214, 210, 0.48)',
      textShadow: '0 0 14px rgba(255,255,255,0.04)',
    },
    lineClass:
      'font-sans text-[23px] sm:text-[29px] leading-[1.22] tracking-[-0.01em] font-light',
    lineStyle: {
      color: 'rgba(224, 220, 215, 0.80)',
      textShadow: '0 0 22px rgba(255,255,255,0.035)',
    },
    accentClass: 'font-normal',
    accentStyle: {
      color: 'rgba(191, 177, 159, 0.90)',
      textShadow: '0 0 16px rgba(191, 177, 159, 0.08)',
    },
  },

  smokedBronze: {
    introClass:
      'text-[11px] sm:text-[12px] uppercase tracking-[0.32em] font-medium',
    introStyle: {
      color: 'rgba(232, 226, 216, 0.50)',
      textShadow: '0 0 16px rgba(255, 244, 226, 0.05)',
    },
    lineClass:
      'font-sans text-[23px] sm:text-[29px] leading-[1.2] tracking-[-0.012em] font-light',
    lineStyle: {
      color: 'rgba(238, 232, 222, 0.83)',
      textShadow: '0 0 24px rgba(255, 244, 226, 0.045)',
    },
    accentClass: 'font-normal',
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
  /**
   * Sentence animation:
   * delay = wait before typing starts.
   * staggerChildren = time between each character appearing.
   */
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: step,
      },
    },
  };

  /**
   * Letter animation:
   * Each character enters slightly blurred and lifted into place.
   *
   * y: 6 = starts a little lower.
   * blur(6px) = soft cinematic reveal.
   * duration 0.68 = dreamy, not snappy.
   */
  const letter = {
    hidden: {
      opacity: 0,
      y: 6,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0.3px)',
      transition: {
        ease: [0.22, 1, 0.36, 1],
        duration: 0.68,
      },
    },
  };

  const normalizedAccent = accentWord.toLowerCase();

  return (
    <motion.p
      variants={sentence}
      initial="hidden"
      animate="visible"
      className={`${className} mx-auto mt-14 sm:mt-8 text-center max-w-[20ch] sm:max-w-[22ch]`}
      style={{
        ...treatment.lineStyle,
        whiteSpace: 'normal',
        wordBreak: 'keep-all',
      }}
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
  onSpeakingChange,
  treatment = 'warmProjection',
}) {
  const [phase, setPhase] = useState('idle');
  const look = TREATMENTS[treatment];

  /**
   * ===== PHASE TIMELINE =====
   *
   * This controls when each text phase appears:
   *
   * idle       → nothing visible
   * intro      → "HI / I'M / SOL"
   * intro-out  → greeting fades away
   * final      → running sentence starts typing
   */
    useEffect(() => {
  const typeDelayMs = typeDelay * 1000 + INTRO_START_OFFSET_MS;

  const t0 = setTimeout(() => {
    setPhase('intro');
  }, typeDelayMs);

  const t1 = setTimeout(() => {
    setPhase('intro-out');
  }, typeDelayMs + INTRO_HOLD_MS);

  const t2 = setTimeout(() => {
    setPhase('final');
  }, typeDelayMs + INTRO_HOLD_MS + INTRO_FADE_OUT_MS + FINAL_TEXT_GAP_MS);

  return () => {
    clearTimeout(t0);
    clearTimeout(t1);
    clearTimeout(t2);
  };
}, [typeDelay]);
  /**
   * ===== ORB SPEAKING SIGNAL =====
   *
   * This tells IntroSpringboard when the orb should pulse.
   *
   * intro      = pulse on while "HI I'M SOL" appears
   * intro-out  = pulse off during the pause/fade
   * final      = pulse on while the running sentence types
   * idle       = pulse off
   */
  useEffect(() => {
    if (!onSpeakingChange) return;

    if (phase === 'intro') {
      onSpeakingChange(true);
    }

    if (phase === 'intro-out') {
      onSpeakingChange(false);
    }

    if (phase === 'final') {
      onSpeakingChange(true);
    }

    if (phase === 'idle') {
      onSpeakingChange(false);
    }
  }, [phase, onSpeakingChange]);

  /**
   * ===== FINAL SENTENCE COMPLETION =====
   *
   * Estimate when the running sentence finishes typing.
   * Then:
   * - stop orb pulse
   * - notify parent intro is done
   * - parent can reveal "TAP ANYWHERE TO BEGIN"
   */
  useEffect(() => {
  if (phase !== 'final' || !onDone) return;

  const glyphCount = FINAL_TEXT.replace(/\s/g, '').length;
  const totalMs = Math.round(
    glyphCount * typeStep * 1000 + FINAL_DONE_BUFFER_MS
  );

  const t = setTimeout(() => {
    onSpeakingChange?.(false);
    onDone?.();
  }, totalMs);

  return () => clearTimeout(t);
}, [phase, typeStep, onDone, onSpeakingChange]);

  return (
    <div className="w-full px-4 text-center">
      <AnimatePresence mode="wait">
        {(phase === 'intro' || phase === 'intro-out') && (
          <motion.div
            key="sol"
            initial={{
              opacity: 0,
              y: 14,
              scale: 0.985,
              filter: 'blur(12px)',
            }}
            animate={
              phase === 'intro'
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0.4px)',
                  }
                : {
                    opacity: 0,
                    y: -4,
                    filter: 'blur(6px)',
                  }
            }
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-x-0 top-[22%] -translate-y-1/2 flex justify-center"
          >
            <div
              className="flex flex-col items-center leading-none uppercase"
              style={{
                color: 'rgba(236,230,222,0.82)',
                textShadow: '0 0 14px rgba(255,244,226,0.05)',
                letterSpacing: '0.18em',
                lineHeight: '1.3',
              }}
            >
              <span className="relative text-[20px] sm:text-[22px] font-semibold">
                HI
              </span>

              <span className="mt-1 text-[20px] sm:text-[22px] font-semibold">
                I&apos;M
              </span>

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
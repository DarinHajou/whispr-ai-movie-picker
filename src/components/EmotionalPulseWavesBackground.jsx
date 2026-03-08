export default function EmotionalPulseWavesBackground() {
  return (
    <>
      {/* Inline keyframes so this works without touching tailwind.config.js */}
      <style>{`
        /* Warm amber blob movement */
        @keyframes blob1Move {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(-120px, 40px) scale(1.1); }
        }

        /* Blue blob movement */
        @keyframes blob2Move {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(-80px, -50px) scale(1.08); }
        }

        /* Sage blob movement */
        @keyframes blob3Move {
          0%   { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(90px, -40px) scale(1.1); }
        }

        /* Animation hooks */
        .blob1-anim {
          animation: blob1Move 12s ease-in-out infinite alternate;
        }

        .blob2-anim {
          animation: blob2Move 16s ease-in-out infinite alternate;
        }

        .blob3-anim {
          animation: blob3Move 18s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Background wrapper */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Blob 1 — warm amber, top-right */}
        <div
          className="
            absolute left-1/2 top-[0%]
            w-[29vw] h-[26vw]
            left-[65%]
            sm:left-[65%] sm:top-[8%] sm:w-[18vw] sm:h-[16vw]
            -translate-x-1/2
            bg-[#FFC542]
            opacity-60 sm:opacity-45
            blur-[60px]
            rounded-[100%/90%]
            blob1-anim
          "
        />

        {/* Blob 2 — mist blue, lower-right */}
        {/* <div
          className="
            absolute right-[2vw] bottom-[20vw]
            w-[20vw] h-[14vw]
            opacity-65 sm:right-[18%] top-[60%] sm:top-[85%] sm:w-[8vw] sm:h-[6vw]
            bg-mist-blue
            blur-[30px]
            rounded-[40%/100%]
            blob2-anim
          "
        /> */}

        {/* Blob 3 — pale sage, lower-left */}
        <div
          className="
            absolute left-[2vw] bottom-[14vw]
            w-[28vw] h-[10vw]
            sm:left-[6%] top-[90%] sm:top-[70%] sm:w-[10vw] sm:h-[8vw]
            bg-pale-sage opacity-2
            blur-[45px]
            rounded-[100%/40%]
            blob3-anim
          "
        />

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(18,18,18,0.4) 100%)",
          }}
        />
      </div>
    </>
  );
}
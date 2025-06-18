export default function EmotionalPulseWavesBackground() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Main warm blob (centered on mobile, offset on desktop) */}
      <div
        className="
          absolute
          left-1/2 top-[18%]
          w-[54vw] h-[36vw]
          sm:left-[60%] sm:top-[14%] sm:w-[20vw] sm:h-[10vw]
          -translate-x-1/2
          bg-glow-amber opacity-40 blur-[60px]
          rounded-[100%/60%] animate-blob1
      "
      />

      {/* Blue blob (mobile: bottom right, desktop: bottom right) */}
      <div
        className="
          absolute
          right-[-4vw] bottom-[22vw]
          w-[24vw] h-[18vw]
          sm:right-[8%] sm:top-[75%]
          sm:w-[10vw] sm:h-[8vw]
          bg-mist-blue opacity-18
          blur-[70px] rounded-[40%/100%]
          animate-blob2
        "
      />

      {/* Sage blob (mobile: left bottom, desktop: left bottom) */}
      <div
        className="
          absolute
          left-[-10vw] bottom-[16vw]
          w-[36vw] h-[12vw]
          sm:left-[-2%] sm:top-[70%]
          sm:w-[12vw] sm:h-[6vw]
          bg-pale-sage opacity-28
          blur-[55px] rounded-[100%/40%]
          animate-blob3
        "
      />



      {/* Cinematic vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(18,18,18,0.4) 100%)',
        }}
      />
    </div>
  );
}

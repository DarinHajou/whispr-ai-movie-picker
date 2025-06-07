export default function EmotionalPulseWavesBackground() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Main warm blob (centered on mobile, offset on desktop) */}
      <div
        className="
          absolute
          left-1/2 top-[20%]
          w-[60vw] h-[44vw]
          sm:left-[49%] sm:top-[14%] sm:w-[26vw] sm:h-[19vw]
          -translate-x-1/2
          bg-glow-amber opacity-30 rounded-full blur-3xl animate-blob1
        "
      />
      {/* Blue blob (mobile: bottom right, desktop: bottom right) */}
      <div
        className="
          absolute
          right-[-12vw] bottom-[30vw]
          w-[40vw] h-[20vw]
          sm:right-[0%] sm:top-[77%] sm:w-[12vw] sm:h-[9vw]
          bg-mist-blue opacity-38 rounded-full blur-2xl animate-blob2
        "
      />
      {/* Sage blob (mobile: left bottom, desktop: left bottom) */}
      <div
        className="
          absolute
          left-[-10vw] bottom-[18vw]
          w-[30vw] h-[14vw]
          sm:left-[-7%] sm:top-[69%] sm:w-[8vw] sm:h-[6vw]
          bg-pale-sage opacity-22 rounded-full blur-2xl animate-blob3
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

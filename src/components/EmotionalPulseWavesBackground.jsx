export default function EmotionalPulseWavesBackground() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">

     <div
      className="
        absolute left-1/2 top-[18%]
        w-[40vw] h-[26vw]
        sm:left-[70%] sm:top-[5%] sm:w-[24vw] sm:h-[16vw]
        -translate-x-1/2
        bg-[#FFC542]
        opacity-25 sm:opacity-35   /* only down 5% on mobile, 5% on desktop */
        blur-[45px]
        rounded-[100%/60%]
        animate-blob1
      "
    />

      {/* Blue blob – nudge it in */}
      <div
        className="
          absolute right-[-2vw] bottom-[20vw] /* was -4vw,22vw */
          w-[20vw] h-[14vw]                   /* was 24×18vw */
          sm:right-[8%] sm:top-[75%] sm:w-[6vw] sm:h-[5vw]  /* was 8×6vw */
          bg-mist-blue opacity-18
          blur-[60px]                         /* was blur-[70px] */
          rounded-[40%/100%]
          animate-blob2
        "
      />

      {/* Sage blob – pull in and shrink */}
      <div
        className="
          absolute left-[-8vw] bottom-[14vw]   /* was -10vw,16vw */
          w-[28vw] h-[10vw]                   /* was 36×12vw */
          sm:left-[-2%] sm:top-[70%] sm:w-[10vw] sm:h-[5vw]  /* was 12×6vw */
          bg-pale-sage opacity-28
          blur-[45px]                         /* was blur-[55px] */
          rounded-[100%/40%]
          animate-blob3
        "
      />

      {/* Vignette unchanged */}
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

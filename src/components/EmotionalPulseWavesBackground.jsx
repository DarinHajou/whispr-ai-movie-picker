export default function EmotionalPulseWavesBackground() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">

     <div
      className="
        absolute left-1/2 top-[2%]
        w-[40vw] h-[26vw]
        sm:left-[60%] sm:top-[8%] sm:w-[18vw] sm:h-[16vw]
        -translate-x-1/2
        bg-[#FFC542]
        opacity-25 sm:opacity-65   /* only down 5% on mobile, 5% on desktop */
        blur-[55px]
        rounded-[100%/60%]
        animate-blob1
      "
    />

      {/* Blue blob – nudge it in */}
      <div
        className="
          absolute right-[-2vw] bottom-[20vw] 
          w-[20vw] h-[14vw]                   
          opacity-18 sm:right-[8%] sm:top-[75%] sm:w-[8vw] sm:h-[6vw]
          bg-mist-blue
          blur-[35px]                    
          rounded-[40%/100%]
          animate-blob2
        "
      />

      {/* Sage blob – pull in and shrink */}
      <div
        className="
          absolute left-[-8vw] bottom-[14vw]   
          w-[28vw] h-[10vw]                  
          sm:left-[-2%] sm:top-[70%] sm:w-[5vw] sm:h-[10vw] 
          bg-pale-sage opacity-28
          blur-[45px]                     
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

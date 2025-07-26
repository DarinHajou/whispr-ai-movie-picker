export default function EmotionalPulseWavesBackground() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">

     <div
      className="
        absolute left-1/2 top-[8%]
        w-[29vw] h-[26vw]
        sm:left-[65%] sm:top-[6%] sm:w-[18vw] sm:h-[16vw]
        -translate-x-1/2
        bg-[#FFC542]
        opacity-70 sm:opacity-45   /* only down 5% on mobile, 5% on desktop */
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
          opacity-18 sm:right-[18%] top-[80%] sm:top-[85%] sm:w-[8vw] sm:h-[6vw]
          bg-mist-blue
          blur-[40px]                    
          rounded-[40%/100%]
          animate-blob2
        "
      />

      {/* Sage blob – pull in and shrink */}
      <div
        className="
          absolute left-[-8vw] bottom-[14vw]   
          w-[28vw] h-[10vw]                  
          sm:left-[6%] top-[60%] sm:top-[70%] sm:w-[10vw] sm:h-[8vw] 
          bg-pale-sage opacity-28
          blur-[55px]                     
          rounded-[100%/40%]
          animate-blob3
        "
      />

      {/* Vignette */}
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

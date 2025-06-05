export default function EmotionalPulseWavesBackground() {
    return (
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Main warm blob (slightly elongated) */}
        <div className="absolute left-[56%] top-[14%] w-[26vw] h-[19vw] -translate-x-1/2 bg-glow-amber opacity-30 rounded-full blur-3xl animate-blob1" />
        <div className="absolute right-[0%] top-[77%] w-[12vw] h-[9vw] bg-mist-blue opacity-38 rounded-full blur-2xl animate-blob2" />
        <div className="absolute left-[-7%] top-[69%] w-[8vw] h-[6vw] bg-pale-sage opacity-22 rounded-full blur-2xl animate-blob3" />
        
        {/* Cinematic vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 15%, rgba(18,18,18,0.8) 100%)',
          }}
        />
      </div>
    );
  }
  
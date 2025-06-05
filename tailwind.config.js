export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'soft-black': '#121212',          // deep, cinematic black
        'warm-white': '#FAF9F6',          // soft off-white
        'mist-blue': '#A6B1C4',           // calmer neutral
        'glow-amber': '#F4C287',          // warm golden glow
        'pale-sage': '#D8E3DC',           // button background
        'mood-hover': '#F8E7D1',          // soft warm hover
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'], // cinematic, modern font
      },
      fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem',// 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      spacing: {
        'fluid': 'clamp(1rem, 2vw, 2rem)', // dynamic margin/padding
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-in forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'zoom-in': 'zoomIn 0.4s ease-in-out forwards',
        'blob1': 'blob1 18s ease-in-out infinite',
        'blob2': 'blob2 24s ease-in-out infinite',
        'blob3': 'blob3 31s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        blob1: {
          '0%, 100%':   { transform: 'translate(0,0) scale(1.08) rotate(0deg)' },
          '35%':        { transform: 'translate(-110px, 50px) scale(1.17) rotate(-2deg)' },
          '65%':        { transform: 'translate(60px, -30px) scale(0.92) rotate(3deg)' },
        },
        blob2: {
          '0%, 100%':   { transform: 'translate(0,0) scale(1.04) rotate(0deg)' },
          '25%':        { transform: 'translate(150px, -80px) scale(1.10) rotate(2deg)' },
          '75%':        { transform: 'translate(-60px, 120px) scale(0.89) rotate(-4deg)' },
        },
        blob3: {
          '0%, 100%':   { transform: 'translate(0,0) scale(1) rotate(0deg)' },
          '20%':        { transform: 'translate(-90px, -80px) scale(1.12) rotate(5deg)' },
          '80%':        { transform: 'translate(120px, 40px) scale(0.88) rotate(-2deg)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

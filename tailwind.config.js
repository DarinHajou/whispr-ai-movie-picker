export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'soft-black': '#121212',          // deep, cinematic black
        'warm-white': '#FAF9F6',          // soft off-white
        'mist-blue': '#A6B1C4',           // calmer neutral
        'bright-amber': '#FFC542',        // bright golden glow
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
        'blob1': 'blob1 8s ease-in-out infinite',
        'blob2': 'blob2 24s ease-in-out infinite',
        'blob3': 'blob3 31s ease-in-out infinite',
        softGlow: 'softGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        softGlow: {
          '0%, 100%': {
            opacity: '0.6',
            textShadow: '0 0 4px #F4C287',
          },
          '50%': {
            opacity: '1',
            textShadow: '0 0 10px #F4C287',
          },
        },
        blob1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%':      { transform: 'translate(-50px, 15px) scale(1.08)' },
        },
        blob2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%':      { transform: 'translate(10px, -10px) scale(1.02)' },
        },
        blob3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%':      { transform: 'translate(-15px, 8px) scale(1.04)' },
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
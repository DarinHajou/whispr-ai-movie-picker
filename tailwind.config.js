export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
      extend: {
        colors: {
          'soft-black': '#1E1E1E',
          'warm-white': '#FAF9F6',
          'mist-blue': '#CBD8E0',
          'glow-amber': '#F2CBA0',
          'pale-sage': '#D9E2D2',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        borderRadius: {
          xl: '1rem',
          '2xl': '1.5rem',
        },
        spacing: {
          'fluid': 'clamp(1rem, 2vw, 2rem)',
        },
        animation: {
          'fade-in': 'fadeIn 0.7s ease-in forwards',
          'slide-up': 'slideUp 0.5s ease-out forwards',
          'zoom-in': 'zoomIn 0.4s ease-in-out forwards',
        },
        keyframes: {
          fadeIn: {
            from: { opacity: '0' },
            to: { opacity: '1' },
          },
          slideUp: {
            from: { opacity: '0', transform: 'translateY(20px)' },
            to: { opacity: '1', transform: 'translateY(0)' },
          },
          zoomIn: {
            from: { opacity: '0', transform: 'scale(0.95)' },
            to: { opacity: '1', transform: 'scale(1)' },
          },
        }
      },
    },
    plugins: [],
  };
  
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
      },
    },
    plugins: [],
  };
  
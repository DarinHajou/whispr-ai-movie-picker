export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "soft-black": "#121212",
        "warm-white": "#FAF9F6",
        "mist-blue": "#A6B1C4",
        "bright-amber": "#FFC542",
        "pale-sage": "#D8E3DC",
        "mood-hover": "#F8E7D1",
      },

      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Cinzel"', "serif"],
      },

      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      spacing: {
        fluid: "clamp(1rem, 2vw, 2rem)",
      },

      animation: {
        "fade-in": "fadeIn 1.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "zoom-in": "zoomIn 0.4s ease-in-out forwards",
        blob1: "blob1 10s ease-in-out infinite alternate",
        blob2: "blob2 14s ease-in-out infinite alternate",
        blob3: "blob3 16s ease-in-out infinite alternate",
        softGlow: "softGlow 2.5s ease-in-out infinite",
        "pulse-slow": "pulse 2.5s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

        softGlow: {
          "0%, 100%": {
            opacity: "0.6",
            textShadow: "0 0 4px #F4C287",
          },
          "50%": {
            opacity: "1",
            textShadow: "0 0 10px #F4C287",
          },
        },

        blob1: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "100%": { transform: "translate(-120px, 35px) scale(1.08)" },
        },

        blob2: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "100%": { transform: "translate(-70px, -45px) scale(1.05)" },
        },

        blob3: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "100%": { transform: "translate(85px, -30px) scale(1.06)" },
        },

        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        zoomIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
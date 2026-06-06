/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f0f13",
        surface: "#1a1a24",
        primary: "#a855f7",
        secondary: "#22d3ee",
        accent: "#ec4899",
        danger: "#ef4444",
        success: "#22c55e",
        warning: "#eab308",
        muted: "#9ca3af",
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      }
    },
  },
  plugins: [],
}

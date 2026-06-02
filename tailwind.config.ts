import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'IBM Plex Mono'", "monospace"],
        sans: ["'Instrument Sans'", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0f0e0d",
          soft: "#1c1a18",
          muted: "#2e2b28",
        },
        paper: {
          DEFAULT: "#f5f2ed",
          warm: "#ede9e3",
          muted: "#d8d3cb",
        },
        amber: {
          glow: "#e8a020",
          soft: "#f5c464",
          pale: "#fdf0d5",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease forwards",
        "pulse-slow": "pulse 2.5s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

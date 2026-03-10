import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        card: "#0a0a0a",
        primary: "#00f0ff",
        secondary: "#7000ff",
        accent: "#00ff9f",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 8s ease-in-out infinite 1s",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "scan": "scan 3s linear infinite",
        "network-pulse": "network-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #00f0ff, 0 0 10px #00f0ff" },
          "100%": { boxShadow: "0 0 20px #00f0ff, 0 0 30px #00f0ff" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "glow-pulse": {
          "0%, 100%": { filter: "drop-shadow(0 0 5px rgba(0, 240, 255, 0.3))" },
          "50%": { filter: "drop-shadow(0 0 20px rgba(0, 240, 255, 0.6))" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(500%)", opacity: "0" },
        },
        "network-pulse": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
export default config;

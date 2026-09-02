import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d1420",
        panel: "#121c2c",
        panel2: "#182338",
        line: "#2f4863",
        accent: "#6fd6ff",
        accentDim: "#3f7cac",
        paper: "#eef1f6",
        paperInk: "#182338",
        muted: "#8fa1ba",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        blueprint:
          "linear-gradient(rgba(111,214,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(111,214,255,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
    },
  },
  plugins: [],
};

export default config;

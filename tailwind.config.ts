import type { Config } from "tailwindcss";

/**
 * The page is a pale, cool fog; ARC's own windows stay in the app's "ARC Dark"
 * greys. `fg`, `edge` and `accent` are CSS variables (see globals.css) that
 * flip to their dark values inside `.app-window` and `.on-dark`, so the panel
 * recreations keep the exact greys of the app without a second set of classes.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        page: "#EEF1F1",
        paper: "#FFFFFF",
        mist: "#E4E9EA",
        ink: "#0D0F10",
        void: "#08080A",
        base: "#161618",
        chrome: "#222224",
        panel: "#28282A",
        raised: "#323236",
        edge: {
          hair: "var(--edge-hair)",
          line: "var(--edge-line)",
          lit: "var(--edge-lit)",
        },
        fg: {
          DEFAULT: "var(--fg)",
          muted: "var(--fg-muted)",
          subtle: "var(--fg-subtle)",
          faint: "var(--fg-faint)",
        },
        accent: {
          DEFAULT: "var(--accent)",
        },
        live: "#5BD68C",
        warn: "#E8B54D",
        gone: "#E8776D",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        hero: ["clamp(2.4rem, 5.6vw, 4.75rem)", { lineHeight: "1.0", letterSpacing: "-0.04em" }],
        display: ["clamp(1.9rem, 3.6vw, 3.1rem)", { lineHeight: "1.04", letterSpacing: "-0.035em" }],
        section: ["clamp(1.6rem, 2.6vw, 2.25rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        lead: ["clamp(0.975rem, 1.25vw, 1.125rem)", { lineHeight: "1.6", letterSpacing: "-0.011em" }],
      },
      maxWidth: {
        content: "1120px",
        frame: "1280px",
      },
      spacing: {
        section: "clamp(5rem, 10vw, 8.5rem)",
      },
      borderRadius: {
        panel: "14px",
        window: "18px",
        stage: "28px",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        breathe: "breathe 5s ease-in-out infinite",
        caret: "caret 1.15s steps(2) infinite",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.25)" },
        },
        caret: {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

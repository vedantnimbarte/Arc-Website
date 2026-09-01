import type { Config } from "tailwindcss";

/**
 * Surface colours are lifted from ARC's own "ARC Dark" theme
 * (apps/frontend/src/themes/index.ts) so the panels rendered on this site
 * are the same greys as the panels in the app. `void` sits below the app's
 * own base so a window reads as a lit object resting on the page.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#08080A",
        base: "#161618",
        chrome: "#222224",
        panel: "#28282A",
        raised: "#323236",
        edge: {
          hair: "rgba(255,255,255,0.055)",
          line: "rgba(255,255,255,0.10)",
          lit: "rgba(255,255,255,0.22)",
        },
        fg: {
          DEFAULT: "#EEF0F3",
          muted: "rgba(230,234,242,0.68)",
          subtle: "rgba(230,234,242,0.46)",
          faint: "rgba(230,234,242,0.28)",
        },
        accent: {
          DEFAULT: "#C8CAD0",
          bright: "#E6E8EC",
          dim: "#8B8D95",
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
        hero: ["clamp(2.15rem, 6.6vw, 5.9rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        display: ["clamp(1.95rem, 5vw, 4.25rem)", { lineHeight: "0.94", letterSpacing: "-0.035em" }],
        section: ["clamp(1.75rem, 3.2vw, 2.75rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        lead: ["clamp(0.975rem, 1.4vw, 1.3125rem)", { lineHeight: "1.55", letterSpacing: "-0.011em" }],
      },
      letterSpacing: {
        label: "0.16em",
      },
      maxWidth: {
        content: "1240px",
        frame: "1600px",
      },
      spacing: {
        section: "clamp(6rem, 13vw, 11.5rem)",
      },
      borderRadius: {
        panel: "14px",
        window: "18px",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
        glide: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      animation: {
        breathe: "breathe 5s ease-in-out infinite",
        caret: "caret 1.15s steps(2) infinite",
        drift: "drift 34s ease-in-out infinite",
        rail: "rail 44s linear infinite",
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
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "33%": { transform: "translate3d(-3%, 2%, 0)" },
          "66%": { transform: "translate3d(2%, -3%, 0)" },
        },
        rail: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

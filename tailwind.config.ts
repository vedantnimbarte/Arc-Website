import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background layers
        ink: {
          950: "#050505",
          900: "#0A0A0A",
          800: "#0D0D0D",
          700: "#111111",
          600: "#181818",
          500: "#1F1F1F",
          400: "#2B2B2B",
        },
        // Silver / metallic
        silver: {
          50: "#F5F5F5",
          100: "#E8E8E8",
          200: "#D6D6D6",
          300: "#C0C0C0",
          400: "#9A9A9A",
          500: "#8A8A8A",
          600: "#6B6B6B",
          700: "#4A4A4A",
        },
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Custom scale per PRD
        'hero': ['clamp(2.75rem, 7vw, 5.25rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'display': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'section': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'sub': ['1.375rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'card': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        'micro': '0.32em',
        'wider-mono': '0.18em',
      },
      animation: {
        'shimmer': 'shimmer 6s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'blink': 'blink 1.1s steps(2) infinite',
        'drift': 'drift 30s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '33%': { transform: 'translate3d(-2%, 1%, 0)' },
          '66%': { transform: 'translate3d(1%, -2%, 0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '0.5' },
        },
      },
      backgroundImage: {
        'metal': 'linear-gradient(135deg, #d9d9d9 0%, #9a9a9a 50%, #f0f0f0 100%)',
        'metal-shimmer': 'linear-gradient(110deg, #6b6b6b 20%, #f5f5f5 50%, #6b6b6b 80%)',
        'radial-vignette': 'radial-gradient(circle at top, #1a1a1a 0%, #050505 70%)',
        'grid-fade': 'linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;

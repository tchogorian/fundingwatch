import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system
        primary: "#FFFFFF",
        "secondary-bg": "#F8FAFB",
        "dark-text": "#0F172A",
        muted: "#64748B",
        accent: "#2563EB",
        "accent-dark": "#1D4ED8",
        "accent-light": "#60A5FA",
        success: "#059669",
        warning: "#D97706",
        danger: "#DC2626",
        border: "#E2E8F0",
        "border-light": "#CBD5E1",
        "input-bg": "#FAFBFC",
        "focus-ring": "#EFF6FF",
        "trust-bg": "#EFF6FF",
        "hero-from": "#0F172A",
        "hero-to": "#1E293B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero-desktop": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "hero-mobile": ["40px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "section-desktop": ["40px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "section-mobile": ["28px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "subhead-desktop": ["24px", { lineHeight: "1.3" }],
        "subhead-mobile": ["20px", { lineHeight: "1.3" }],
        body: ["18px", { lineHeight: "1.4" }],
        small: ["14px", { lineHeight: "1.4" }],
        eyebrow: ["14px", { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },
      spacing: {
        "section-y": "120px",
        "section-y-mobile": "64px",
        "section-trust": "48px",
      },
      borderRadius: {
        card: "12px",
        button: "8px",
        input: "8px",
        dropzone: "16px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.08)",
        "button-accent": "0 4px 14px rgba(37,99,235,0.4)",
        "button-accent-hover": "0 6px 20px rgba(37,99,235,0.5)",
        "mockup": "0 25px 60px rgba(0,0,0,0.4)",
        "input-focus": "0 0 0 2px rgba(37,99,235,0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "ring-draw": "ringDraw 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 4px 14px rgba(37,99,235,0.4)" },
          "50%": { boxShadow: "0 6px 24px rgba(37,99,235,0.5)" },
        },
        ringDraw: {
          "0%": { strokeDashoffset: "var(--circumference)" },
          "100%": { strokeDashoffset: "var(--offset)" },
        },
      },
      transitionDuration: {
        "200": "200ms",
      },
    },
  },
  plugins: [],
};

export default config;

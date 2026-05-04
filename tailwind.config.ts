import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "hub-primary": "#2466F4",
        "hub-secondary": "#2D2D2D",
        "hub-error": "#EB5757",
        "hub-black-1": "#000000",
        "hub-black-2": "#1F1F1F",
        "hub-white-1": "#FFFFFF",
        "hub-white-2": "#F5F5F5",
        "hub-gray-1": "#242424",
        "hub-gray-2": "#9B9B9B",
        "hub-gray-3": "#CFCFCF",
        "hub-gray-4": "#F3F4F6",
      },
      keyframes: {
        "skeleton-pulse": {
          "0%, 100%": { backgroundColor: "#F3F4F6" }, // hub-gray-4
          "50%": { backgroundColor: "#CFCFCF" }, // hub-gray-3
        },
        "typing-bounce": {
          "0%, 80%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "40%": { transform: "translateY(-5px)", opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px) scale(0.97)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "fade-out-down": {
          from: { opacity: "1", transform: "translateY(0) scale(1)" },
          to: { opacity: "0", transform: "translateY(16px) scale(0.97)" },
        },
      },
      animation: {
        "skeleton-pulse": "skeleton-pulse 1.5s infinite ease-in-out",
        "typing-bounce": "typing-bounce 1.2s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.22s ease forwards",
        "fade-out-down": "fade-out-down 0.18s ease forwards",
      },
      fontFamily: {
        pretendard: ['"Pretendard Variable"', "sans-serif"],
        wanted: ['"Wanted Sans Variable"', '"Wanted Sans"', "sans-serif"],
      },
      fontSize: {
        // ── Pretendard ──────────────────────────────────
        "pt-title1": ["56px", { lineHeight: "120%", fontWeight: "700" }],
        "pt-title2": ["40px", { lineHeight: "120%", fontWeight: "700" }],
        "pt-title3": ["32px", { lineHeight: "120%", fontWeight: "700" }],
        // Headlines — weight는 별도 클래스로 제어
        "pt-h1": ["24px", { lineHeight: "120%" }],
        "pt-h2": ["20px", { lineHeight: "120%" }],
        // Body
        "pt-body1": ["18px", { lineHeight: "120%" }],
        "pt-body2": ["16px", { lineHeight: "120%" }],
        // Caption
        "pt-caption1": ["14px", { lineHeight: "120%" }],
        "pt-caption2": ["12px", { lineHeight: "120%" }],
        // ── WantedSans ──────────────────────────────────
        "ws-title1": ["32px", { lineHeight: "120%", fontWeight: "700" }],
        "ws-title2": ["24px", { lineHeight: "120%", fontWeight: "700" }],
        "ws-title3": ["20px", { lineHeight: "120%", fontWeight: "700" }],
        "ws-body1": ["20px", { lineHeight: "120%", fontWeight: "500" }],
        "ws-body2": ["16px", { lineHeight: "120%", fontWeight: "500" }],
        "ws-body3": ["14px", { lineHeight: "120%", fontWeight: "500" }],
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      // ── Pretendard 복합 컴포넌트 클래스 ─────────────────
      addComponents({
        // Title
        ".font-pt-title1": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "56px",
          fontWeight: "700",
          lineHeight: "120%",
        },
        ".font-pt-title2": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "40px",
          fontWeight: "700",
          lineHeight: "120%",
        },
        ".font-pt-title3": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "32px",
          fontWeight: "700",
          lineHeight: "120%",
        },
        // Headlines1
        ".font-pt-h1-semibold": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "24px",
          fontWeight: "600",
          lineHeight: "120%",
        },
        ".font-pt-h1-bold": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "24px",
          fontWeight: "700",
          lineHeight: "120%",
        },
        // Headlines2
        ".font-pt-h2-semibold": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "20px",
          fontWeight: "600",
          lineHeight: "120%",
        },
        ".font-pt-h2-bold": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "20px",
          fontWeight: "700",
          lineHeight: "120%",
        },
        // Body1
        ".font-pt-body1-regular": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "18px",
          fontWeight: "400",
          lineHeight: "120%",
        },
        ".font-pt-body1-medium": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "18px",
          fontWeight: "500",
          lineHeight: "120%",
        },
        ".font-pt-body1-semibold": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "18px",
          fontWeight: "600",
          lineHeight: "120%",
        },
        // Body2
        ".font-pt-body2-regular": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "120%",
        },
        ".font-pt-body2-medium": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "120%",
        },
        ".font-pt-body2-semibold": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "16px",
          fontWeight: "600",
          lineHeight: "120%",
        },
        // Caption1
        ".font-pt-caption1-regular": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "120%",
        },
        ".font-pt-caption1-medium": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "120%",
        },
        ".font-pt-caption1-semibold": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "14px",
          fontWeight: "600",
          lineHeight: "120%",
        },
        // Caption2
        ".font-pt-caption2-regular": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "120%",
        },
        ".font-pt-caption2-medium": {
          fontFamily: '"Pretendard Variable", sans-serif',
          fontSize: "12px",
          fontWeight: "500",
          lineHeight: "120%",
        },
        // ── WantedSans 복합 컴포넌트 클래스 ─────────────────
        ".font-ws-title1": {
          fontFamily: '"Wanted Sans Variable", "Wanted Sans", sans-serif',
          fontSize: "32px",
          fontWeight: "700",
          lineHeight: "120%",
        },
        ".font-ws-title2": {
          fontFamily: '"Wanted Sans Variable", "Wanted Sans", sans-serif',
          fontSize: "24px",
          fontWeight: "700",
          lineHeight: "120%",
        },
        ".font-ws-title3": {
          fontFamily: '"Wanted Sans Variable", "Wanted Sans", sans-serif',
          fontSize: "20px",
          fontWeight: "700",
          lineHeight: "120%",
        },
        ".font-ws-body1": {
          fontFamily: '"Wanted Sans Variable", "Wanted Sans", sans-serif',
          fontSize: "20px",
          fontWeight: "500",
          lineHeight: "120%",
        },
        ".font-ws-body2": {
          fontFamily: '"Wanted Sans Variable", "Wanted Sans", sans-serif',
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "120%",
        },
        ".font-ws-body3": {
          fontFamily: '"Wanted Sans Variable", "Wanted Sans", sans-serif',
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "120%",
        },
      });
    }),
  ],
};

export default config;

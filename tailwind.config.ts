import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Brand palette — derived from the Hi-Med Prepas logo
        brand: {
          DEFAULT: "#0056B3", // Primary Blue (text & road)
          50: "#EBF3FC",
          100: "#D3E5F9",
          200: "#A6CBF2",
          300: "#6FA9E8",
          400: "#3381D6",
          500: "#0056B3",
          600: "#004A9B",
          700: "#003D80",
          800: "#003066",
          900: "#00234A",
        },
        navy: {
          DEFAULT: "#0A1C2E", // Deep Navy/Black (book & text shadow)
          50: "#E8EDF2",
          100: "#C7D2DE",
          700: "#13314F",
          800: "#0E263D",
          900: "#0A1C2E",
          950: "#06121E",
        },
        accent: {
          DEFAULT: "#C1121F", // Accent Red ("i" dot & "SINCE 2015" badge)
          50: "#FDECEE",
          100: "#FAD0D3",
          500: "#C1121F",
          600: "#A50F1A",
          700: "#880C15",
        },
        surface: "#F8F9FA", // Light Gray / Off-White section background
        ink: "#1E293B", // Dark Slate body text
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,28,46,0.04), 0 4px 16px rgba(10,28,46,0.06)",
        "card-hover": "0 12px 32px -8px rgba(0,86,179,0.25), 0 4px 12px rgba(10,28,46,0.08)",
        glow: "0 8px 24px -6px rgba(0,86,179,0.55)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #0056B3 0%, #0A1C2E 100%)",
        // Sampled from the "Hi-Med" lettering in the logo (left → right)
        "logo-text": "linear-gradient(90deg, #2171B9 0%, #0D4D8B 50%, #0A1C2E 100%)",
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "road-dash": { to: { strokeDashoffset: "-88" } },
        "ping-slow": {
          "0%": { transform: "scale(0.6)", opacity: "1" },
          "80%, 100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        "road-dash": "road-dash 3s linear infinite",
        "ping-slow": "ping-slow 2.4s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

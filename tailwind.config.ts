import type { Config } from "tailwindcss";

// Corporate palette is derived from the Beefcake Works business card
// (green card, dark green name plates, off-white type).
// The same green is used on employee t-shirts — keep it in sync with the
// apparel/print specs. TODO: confirm exact hex/Pantone with the printer.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Corporate green — primary brand color (business card / t-shirt green)
        brand: {
          50: "#eefaf2",
          100: "#d6f2e0",
          200: "#b0e5c5",
          300: "#7dd2a3",
          400: "#47b97e",
          500: "#2e9d5c", // card green
          600: "#218149",
          700: "#1c673c",
          800: "#1a5232",
          900: "#17442b",
          950: "#0a2417",
        },
        // Deep pine — dark sections & headings (matches the card's dark name plates)
        pine: {
          50: "#f0f5f3",
          100: "#dbe7e2",
          200: "#b8d0c7",
          300: "#8bb0a3",
          400: "#5c8c7c",
          500: "#3d7162",
          600: "#2d594d",
          700: "#264840",
          800: "#203b35",
          900: "#103024",
          950: "#081d16",
        },
        // Off-white — the card's text color, used for type on dark green
        cream: {
          50: "#fdfcf9",
          100: "#f7f4ec",
          200: "#f2efe6",
        },
        // Warm accent — reserved for urgency elements only (badges, highlights)
        accent: {
          50: "#fff5ed",
          100: "#ffe8d4",
          200: "#ffcda8",
          300: "#ffa970",
          400: "#ff7a36",
          500: "#ff5722",
          600: "#f04307",
          700: "#c73306",
          800: "#9e2a0d",
          900: "#7f250f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        cta: "0 6px 0 0 rgba(8, 29, 22, 0.35), 0 10px 25px -5px rgba(0,0,0,0.35)",
        card: "0 4px 20px -2px rgba(16, 48, 36, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;

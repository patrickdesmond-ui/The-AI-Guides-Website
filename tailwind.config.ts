import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#edf4ff",
          100: "#d6e6ff",
          200: "#afccff",
          300: "#7dadff",
          400: "#4a90e2",
          500: "#0066cc",
          600: "#0052a6",
          700: "#003f80",
          800: "#002a55",
          900: "#00172f"
        }
      }
    }
  },
  plugins: []
};

export default config;

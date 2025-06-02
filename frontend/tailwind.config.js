/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", //Tailwind se aplique en todos tus archivos React
  ],
  theme: {
    extend: {
      //keyframes personalizados
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      // animación basada en esos keyframes
      animation: {
        fadeIn: "fadeIn 0.2s ease-out",
      },

      colors: {
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        red: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
      },
      // tipografía, espacios, etc. si lo necesitas:
      // fontFamily: {
      //   sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      // },
    },
  },
  plugins: [],
};

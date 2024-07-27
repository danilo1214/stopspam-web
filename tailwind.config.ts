import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        customFont: ['"Trebuchet"', "sans-serif"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          100: "#F3E5F5",
          200: "#E1BEE7",
          300: "#CE93D8",
          400: "#BA68C8",
          500: "#AB47BC", // base primary color (violet)
          600: "#9C27B0",
          700: "#8E24AA",
          800: "#7B1FA2",
          900: "#6A1B9A",
        },
        secondary: {
          100: "#F8BBD0",
          200: "#F48FB1",
          300: "#F06292",
          400: "#EC407A",
          500: "#E91E63", // base secondary color (pinkish-violet)
          600: "#D81B60",
          700: "#C2185B",
          800: "#AD1457",
          900: "#880E4F",
        },
        tertiary: {
          100: "#E1F5FE",
          200: "#B3E5FC",
          300: "#81D4FA",
          400: "#4FC3F7",
          500: "#29B6F6", // base tertiary color (blueish with red notes)
          600: "#039BE5",
          700: "#0288D1",
          800: "#0277BD",
          900: "#01579B",
        },
        textPrimary: {
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121", // dark text
        },
        textSecondary: {
          100: "#FAFAFA",
          200: "#F5F5F5",
          300: "#EEEEEE",
          400: "#E0E0E0",
          500: "#BDBDBD",
          600: "#9E9E9E",
          700: "#757575", // greyish text
          800: "#616161",
          900: "#424242",
        },
        textTertiary: {
          100: "#FFFDE7",
          200: "#FFF9C4",
          300: "#FFF59D",
          400: "#FFF176",
          500: "#FFEE58",
          600: "#FFEB3B",
          700: "#FDD835", // light text
          800: "#FBC02D",
          900: "#F9A825",
        },
      },
    },
  },
  safelist: [
    "bg-primary-500",
    "bg-secondary-500",
    "bg-tertiary-500",
    "text-primary-500",
    "text-secondary-500",
    "text-secondary-500",
  ],
  plugins: [],
} satisfies Config;

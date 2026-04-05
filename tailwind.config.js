/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Google Sans",
          ...require("tailwindcss/defaultTheme").fontFamily.sans,
        ],
      },
    },
  },
  plugins: [require("daisyui")],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      {
        "alwan-dark": {
          primary: "#10b981",
          "primary-content": "#052e16",
          secondary: "#0d9488",
          "secondary-content": "#042f2e",
          accent: "#06b6d4",
          "accent-content": "#083344",
          neutral: "#1f2937",
          "neutral-content": "#f1f5f9",
          "base-100": "#111827",
          "base-200": "#1f2937",
          "base-300": "#374151",
          "base-content": "#f1f5f9",
          info: "#60a5fa",
          "info-content": "#0c1a2e",
          success: "#34d399",
          "success-content": "#052e16",
          warning: "#fbbf24",
          "warning-content": "#451a03",
          error: "#f87171",
          "error-content": "#450a0a",
        },
      },
      {
        alwan: {
          primary: "#10b981",
          "primary-content": "#052e16",
          secondary: "#0d9488",
          "secondary-content": "#042f2e",
          accent: "#06b6d4",
          "accent-content": "#083344",
          neutral: "#374151",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#f3f4f6",
          "base-content": "#111827",
          info: "#3b82f6",
          "info-content": "#ffffff",
          success: "#10b981",
          "success-content": "#052e16",
          warning: "#f59e0b",
          "warning-content": "#451a03",
          error: "#ef4444",
          "error-content": "#ffffff",
        },
      },
    ],
    darkTheme: "alwan-dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    themeRoot: ":root", // The element that receives theme color CSS variables
    logs: false,
  },
};

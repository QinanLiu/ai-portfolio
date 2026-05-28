/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d0d0d",
        paper: "#f4efe6",
        fog: "#aab6bd",
        ash: "#d7d4cc",
        rust: "#7d3030",
        silver: "#bfc2c4",
      },
      fontFamily: {
        display: [
          "Space Grotesk",
          "Inter",
          "Noto Sans SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
        body: [
          "Inter",
          "Noto Sans SC",
          "Microsoft YaHei",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0, 0, 0, 0.28)",
      },
    },
  },
  plugins: [],
};

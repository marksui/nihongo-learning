/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#201B3F",
        rice: "#FFF8EF",
        sakura: "#F26A8D",
        matcha: "#2F9A78",
        sora: "#4DA3FF",
        yuzu: "#F7C948",
        sumire: "#6C5CE7",
        coral: "#E85D75",
        indigo: "#4A4E9B",
        sun: "#F7C948",
        sky: "#EAF5FF",
      },
      fontFamily: {
        sans: [
          '"Noto Sans JP"',
          '"Microsoft YaHei"',
          '"PingFang SC"',
          "system-ui",
          "sans-serif",
        ],
        serif: ['"Noto Serif JP"', '"Songti SC"', "serif"],
      },
      boxShadow: {
        soft: "0 20px 48px rgba(32, 27, 63, 0.13)",
        card: "0 10px 24px rgba(32, 27, 63, 0.08)",
        pop: "0 12px 0 rgba(32, 27, 63, 0.06), 0 18px 34px rgba(32, 27, 63, 0.10)",
      },
    },
  },
  plugins: [],
};

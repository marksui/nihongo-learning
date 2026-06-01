/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#2B2418",
        rice: "#FFF4CF",
        sakura: "#D96F7E",
        matcha: "#4E8D61",
        sora: "#5D9BCB",
        yuzu: "#E9B949",
        sumire: "#74699A",
        coral: "#D96F7E",
        indigo: "#74699A",
        sun: "#E9B949",
        sky: "#F4EBC8",
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
        soft: "0 18px 38px rgba(80, 58, 24, 0.10)",
        card: "0 8px 20px rgba(80, 58, 24, 0.07)",
        pop: "0 10px 0 rgba(80, 58, 24, 0.045), 0 16px 30px rgba(80, 58, 24, 0.08)",
      },
    },
  },
  plugins: [],
};

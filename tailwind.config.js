/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#202236",
        rice: "#F8F5EF",
        matcha: "#2F7D69",
        coral: "#E15F4F",
        indigo: "#3E4B89",
        sun: "#F5B84B",
        sky: "#E7F0F7",
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
        soft: "0 18px 45px rgba(32, 34, 54, 0.12)",
        card: "0 10px 24px rgba(32, 34, 54, 0.08)",
      },
    },
  },
  plugins: [],
};

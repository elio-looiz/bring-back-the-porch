/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "porch-green-dark": "#4D6B50", // Основной зеленый (текст логотипа "Porch")
        "porch-green-light": "#6F9172", // Более светлый зеленый для акцентов
        "porch-creamy": "#F2F0E5", // Светлый кремовый фон
        "porch-black": "#1A1A1A", // Черный из логотипа
        "porch-grey": "#A0A0A0", // Серый для второстепенного текста
        "porch-border": "#3B523E", // Цвет рамки логотипа
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

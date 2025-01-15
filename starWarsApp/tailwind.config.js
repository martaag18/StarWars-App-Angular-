/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FFE81F", // Amarillo del logo
          neutral: "#1F1F1F",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};


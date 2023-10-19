/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend:{
      colors:{
        "rojito": '#f33535',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 5px #f33535, 0 0 10px #f33535, 0 0 20px #f33535, 0 0 30px #f33535',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['dark']
  },

}


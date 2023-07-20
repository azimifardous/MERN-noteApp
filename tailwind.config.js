/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    fontFamily: {
      'pacifico': "Pacifico",
    },
    colors: {
      'customGray': "#264653",
      'customGreen': "#2a9d8f",
      'customYellow': "#e9c46a",
      'customOrange': "#f4a261",
      'customRed': "#e76f51",
      'customPink': "#ffcad4",

    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


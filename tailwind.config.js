/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', 'sans-serif'],
        heading: ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        'brand-black': '#000000', // Original Trinetra Black
        'brand-white': '#ffffff', // Original White
        'brand-primary': '#D9083C', // Keep Red Accent
        'brand-secondary': '#EB5E55', // Keep Secondary
        'brand-gray-50': '#f6f6f6', // Original Light Gray BG
        'brand-gray-100': '#e8e8e8', // Original Gray
        'brand-gray-800': '#333333', // Original Dark Text
        'brand-gray-900': '#121212', // Very Dark
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

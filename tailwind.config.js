/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000',
        'brand-white': '#ffffff',
        'brand-gray-50': '#f6f6f6',
        'brand-gray-100': '#e8e8e8',
        'brand-gray-800': '#333333',
        'brand-gray-900': '#121212',
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

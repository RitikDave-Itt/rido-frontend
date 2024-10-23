/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: 'var(--bg-color-light)',
          medium: 'var(--bg-color-medium)',
          dark: 'var(--bg-color-dark)',
        },
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        primary_hover : 'var(--primary-hover)',
        secondary_hover: 'var(--secondary-hover)',
      },
    },
  },
  plugins: [],
}


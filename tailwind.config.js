/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Oswald', 'Impact', 'Arial Narrow', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        ink: '#0a0a0a',
        paper: '#e8e0d4',
        'paper-dark': '#141210',
        'paper-mid': '#1e1c18',
      },
    },
  },
  plugins: [],
}

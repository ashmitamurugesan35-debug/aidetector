/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0F19',
        cyberblue: '#00C2FF',
        safetyorange: '#FF4C00',
        glass: 'rgba(255,255,255,0.08)'
      }
    }
  },
  plugins: []
}

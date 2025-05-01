module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',  // Added for 1080p screens
      },
      maxWidth: {
        'screen-3xl': '1920px',
      },
      padding: {
        'screen-x': '2rem',
        'screen-y': '2rem',
      }
    },
  },
  plugins: [],
} 
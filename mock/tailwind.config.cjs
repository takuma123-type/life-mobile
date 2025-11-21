module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',
        accent: '#06B6D4'
      },
      borderRadius: {
        'xl': '1.25rem'
      },
      boxShadow: {
        'soft': '0 2px 6px rgba(14,165,233,0.15)'
      }
    }
  },
  plugins: []
};
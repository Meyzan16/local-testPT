module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav-border': '#EBEAEA',
        primaryColor: "#8873ef",
        headingcolor: "#081e21",
        smallTextColor: "#193256",
        primary: '#14b8a6',
        secondary: '#64748b',
        dark: '#0f172a',
        
      },
      boxShadow: {
        menu: '0px 159px 95px rgba(13,12,34,0.01), 0px 71px 71px rgba(13,12,34,0.02), 0px 18px 39px rgba(13,12,34,0.02), 0px 0px 0px rgba(13,12,34,0.02)',
      },
      screens: {
        'xs': '400px',
      },
      maxWidth: {
        '10xl': '1680px'
      }
    },
  },
  plugins: [],
}
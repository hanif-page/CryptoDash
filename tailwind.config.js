module.exports = {
  content: [
    "./**/*.html",
    "./scripts/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': "#F8B319",
        'primary-blue': "#0F3D66",
        'primary-cream': "#E0D4B8",
        'primary-black': "#3A5054",
        'primary-red': "#FF0000",
        'secondary-orange': "#FCD46A",
        'secondary-blue': "#51779E",
        'secondary-black': "#333333",
        'profit-color': "#79EA86",
        'loss-color': "#E75757",
        'c-black-purple': {
          "dark": "#20133A",
          "light": "#402574" 
        },
        'c-blue': {
          "dark": "#223EDD",
          "light": "#1E37C7"
        },
        'c-white': "#FCFBFE"
      },
      screens: {
        'xxs': '360px',
        'xs': '420px',
      }
    },
  },
  plugins: [],
}

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
      },
      screens: {
        'xxs': '360px',
        'xs': '420px',
      }
    },
  },
  plugins: [],
}

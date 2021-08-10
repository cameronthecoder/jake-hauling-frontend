const colors = require('tailwindcss/colors');

module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'display': ['Rubik'],
            'body': ['Rubik']
        },
        extend: {
            colors: {
                primary: colors.cyan,
                orange: colors.orange,
                secondary: colors.blue
            }
        },
        variants: {
            extend: {},
        },
        plugins: [],
    },
}
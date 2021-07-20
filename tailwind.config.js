const colors = require('tailwindcss/colors');

module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            //'display': ['Nunito'],
            //'body': ['Nunito']
        },
        extend: {
            colors: {
                primary: colors.cyan,
                secondary: colors.blue
            },
        },
        variants: {
            extend: {},
        },
        plugins: [],
    },
    plugins: [
        require('@tailwindcss/forms'),
    ]
}
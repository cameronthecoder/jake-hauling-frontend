const colors = require('tailwindcss/colors');

module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'display': ['Open Sans'],
            'body': ['Open Sans']
        },
        stroke: theme => ({
            'red': theme('colors.red.500'),
            'green': theme('colors.green.500'),
            'blue': theme('colors.blue.500'),
        }),
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
    plugins: [
        require('@tailwindcss/forms'),
    ]
}
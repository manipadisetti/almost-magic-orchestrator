/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'almost-magic': {
                    blue: '#3B82F6',
                    purple: '#8B5CF6',
                    pink: '#EC4899',
                },
            },
        },
    },
    plugins: [],
}

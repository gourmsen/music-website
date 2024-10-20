/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            keyframes: {
                "slide-up": {
                    "0%": { transform: "translateY(33%)", opacity: 0, filter: "blur(5px)" },
                    "100%": { transform: "translateY(0)", opacity: 1 },
                },
            },
            animation: {
                "slide-up": "slide-up 1.5s ease backwards",
                "slide-up-d-0.5s": "slide-up 1.5s ease 0.5s backwards",
                "slide-up-d-1s": "slide-up 1.5s ease 1s backwards",
                "slide-up-d-1.5s": "slide-up 1.5s ease 1.5s backwards",
                "slide-up-d-2s": "slide-up 1.5s ease 2s backwards",
                "slide-up-fast": "slide-up 0.8s ease backwards",
                "slide-up-fast-d-0.2s": "slide-up 0.8s ease 0.2s backwards",
            },
        },
        container: {
            center: true,
        },
    },
    plugins: [],
    darkMode: "selector",
};

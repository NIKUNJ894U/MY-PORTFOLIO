module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss', // <– adds @tailwind, @apply, etc.
  ],
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

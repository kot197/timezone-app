import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-image": "url('/world-map.png')",
      },
      colors: {
        primary: {
          500: "rgb(14 165 233)",
          600: "rgb(2 132 199)",
        },  
      },
      transitionProperty: {
        'height': 'height'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryOrange: '#EC961D',
        primaryBlack: '#18171B',
        primaryWhite: '#F2F1F8'
      },
    },
  },
  plugins: [],
};
export default config;

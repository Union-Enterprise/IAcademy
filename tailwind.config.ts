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
        whiteText: "#21242C",
        loginFundo: "#D7D7D7",
        mainBlue: "#1865F2",
        background: {
          light: "#FFFFFF",
          lightA: "#F9F9F9",
          lightB: "#F1F3F5",
          lightC: "#D9D9D9",
        },
        linkText: {
          light: "",
        },
        text: {
          light: "",
        },
        selected: {
          light: "",
        },
        border: {
          light: "#F4F4F4",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // এই লাইনটি খুব গুরুত্বপূর্ণ ডার্ক মোডের জন্য
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0EA5E9", 
        secondary: "#64748B", // Slate
      },
    },
  },
  plugins: [],
};
export default config;

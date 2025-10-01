import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // imprescindible para Vercel
  build: {
    outDir: "dist",
  },
});

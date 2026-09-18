import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/status-page": {
        target: "https://status.plop.blog",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});

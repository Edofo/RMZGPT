import "vitest/config";

import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    svgr({
      include: "**/*.svg?react",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/vitest.setup.ts",
  },
  css: {
    preprocessorOptions: {},
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
});

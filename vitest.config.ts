import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.{test,spec}.{js,ts,tsx}"],
    environmentMatchGlobs: [
      ["**/apps/front/**", "jsdom"],
      ["**/apps/api/**", "node"],
      ["**/*.{test,spec}.{js,ts}", "node"],
    ],
    globals: true,
  },
});

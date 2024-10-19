import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Glob pattern to find test files
    include: ["**/*.{test,spec}.{js,ts,tsx}"],

    // Use different environments based on file patterns
    environmentMatchGlobs: [
      // All test files in "apps/front" (or any directory for front-end) will use jsdom
      ["**/apps/front/**", "jsdom"],

      // All test files in "apps/api" (or any backend directory) will use node environment
      ["**/apps/api/**", "node"],

      // Default to node environment for other tests
      ["**/*.{test,spec}.{js,ts}", "node"],
    ],
    globals: true,
  },
});

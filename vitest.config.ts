import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["app/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
      exclude: [
        "app/**/loading.tsx",
        "app/**/*.d.ts",
        "app/global.d.ts",
        "app/layout.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
});

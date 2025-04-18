import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  env: {
    NODE_ENV: process.env.NODE_ENV || "production",
  },
  define: {
    "process.env.TAURI_PLATFORM": process.env.TAURI_PLATFORM || "browser",
  },
});

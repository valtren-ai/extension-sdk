import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/types.ts", "src/manifest.ts", "src/validate.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: false,
  minify: false,
  target: "es2022",
});

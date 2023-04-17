import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import dotenv from "dotenv";

export default {
  input: "src/index.ts",
  output: {
    file: "build/index.js",
    format: "cjs",
    sourcemap: true,
    globals: {
      express: "express",
      pg: "pg",
      dotenv: "dotenv",
    },
  },
  plugins: [typescript(), resolve(), commonjs(), dotenv.config()],
  external: ["express", "pg", "dotenv"],
};

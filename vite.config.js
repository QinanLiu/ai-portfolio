import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages note:
  // - If your repo is username.github.io, keep base as "/".
  // - If your repo is a project page, change it to "/repo-name/".
  base: "/",
});

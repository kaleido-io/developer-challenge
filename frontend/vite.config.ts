import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";

export default defineConfig(() => {
  return {
    build: {
      outDir: "./build",
    },
    plugins: [react(), eslint()],
    server: {
      port: 4000,
      proxy: {
        "/api": {
          target: `http://localhost:4001`,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  };
});

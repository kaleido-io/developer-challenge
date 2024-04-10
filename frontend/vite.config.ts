import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
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
    define: {
      // If you want to exposes all env variables, which is not recommended
      'process.env': env
    },
  };
});

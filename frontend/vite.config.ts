import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';

export default defineConfig(() => {
    return {
        build: {
            outDir: './build',
        },
        plugins: [react(), eslint()],
        server: {
            port: Number(process.env.PORT),
            proxy: {
                '/api': {
                    target: process.env.TARGET,
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                },
            },
        },
    };
});

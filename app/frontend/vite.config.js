import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    root: 'src/client',
    build: {
        input: 'src/client/main.tsx',
        outDir: '../../dist',
        emptyOutDir: true
    },
    plugins: [react()],
    server: {
        host: true,
        port: process.env.APP_PORT,
        proxy: {
            '/api': 'http://localhost:' + process.env.APP_PORT_BACKEND,
            '/static': 'http://localhost:' + process.env.APP_PORT_BACKEND,
        }
    }
});

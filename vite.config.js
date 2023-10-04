import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: 'src/client',
    build: {
        input: 'src/client/main.tsx',
        outDir: '../../dist'
    },
    plugins: [react()],
    server: {
        host: true,
        port: 3001,
        proxy: {
        '/api': 'http://localhost:' + process.env.APP_PORT
        }
    }
});

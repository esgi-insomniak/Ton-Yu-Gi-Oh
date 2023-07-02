import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
        port: process.env.VITE_CLIENT_PORT as number,
    },
    preview: {
        port: process.env.VITE_CLIENT_PORT as number,
    },
    resolve: {
        alias: { '@': resolve(__dirname, 'src') },
    }
})

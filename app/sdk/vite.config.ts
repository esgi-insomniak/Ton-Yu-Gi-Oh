import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({

    build: {
        lib: {
            entry: resolve(__dirname, 'main.ts'), // entry file of the library
            name: 'insomniak-sdk-analytics', // name of the library
            fileName: (format) => `main.${format}.js`, // file name of the output bundle
        },
        rollupOptions: {
            // make sure to externalize dependencies
            external: ['react'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                },
            },
        },
    },
    plugins: [react],
});

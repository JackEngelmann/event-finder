import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/scss/colors.scss";`,
        },
      },
    },
    server: {
      proxy: {
        '/graphql': 'http://localhost:5000',
      },
    },
  };
});
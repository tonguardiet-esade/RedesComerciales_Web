import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { getSeoHtmlInputs, seoHtmlPlugin } from './plugins/seoHtmlPlugin';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const rootDir = __dirname;
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        /** Evita colisión con Sales (3001) si el puerto 3000 está ocupado */
        strictPort: true,
      },
      plugins: [seoHtmlPlugin(), react(), tailwindcss()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          input: getSeoHtmlInputs(rootDir),
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              'vendor-gsap': ['gsap', '@gsap/react'],
              'vendor-motion': ['motion/react'],
              'vendor-three': ['three'],
            },
          },
        },
      }
    };
});

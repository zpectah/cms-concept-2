/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/client',
  server: {
    port: 4545,
    host: 'localhost',
  },
  preview: {
    port: 4546,
    host: 'localhost',
  },
  plugins: [react(), tsconfigPaths()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: '../../dist/client',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // emotion: ['@emotion/react', '@emotion/styled'],
          i18n: ['i18next', 'i18next-http-backend', 'react-i18next', 'i18next-browser-languagedetector'],
          mui: ['@mui/icons-material', '@mui/material', '@mui/x-date-pickers'],
          react: ['react', 'react-dom', 'react-router-dom'],
          // form: ['react-hook-form', '@hookform/resolvers'],
          // data: ['axios', 'zod', 'zustand'],
          // ui: ['mapbox-gl', 'react-advanced-cropper', 'react-pdf', 'react-simple-wysiwyg']
        },
      },
    },
  },
  test: {
    name: '@cms-concept-2/client',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));

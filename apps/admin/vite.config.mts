/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/admin',
  server: {
    port: 4444,
    host: 'localhost',
  },
  preview: {
    port: 4445,
    host: 'localhost',
  },
  plugins: [react(), tsconfigPaths()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: '../../dist/admin',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          emotion: ['@emotion/react', '@emotion/styled'],
          i18n: ['i18next', 'i18next-http-backend', 'react-i18next', 'i18next-browser-languagedetector'],
          mui: ['@mui/material', '@mui/x-date-pickers'],
          icons: ['@tabler/icons-react'],
          react: ['react', 'react-dom', 'react-router-dom'],
          form: ['react-hook-form', '@hookform/resolvers'],
          data: ['axios', 'zod', 'zustand'],
          ui_mapbox: ['mapbox-gl'],
          ui_cropper: ['react-advanced-cropper'],
          ui_pdf: ['react-pdf'],
          ui_wysiwyg: ['react-simple-wysiwyg'],
        },
      },
    },
    /* MUI package is more than 500kb */
    chunkSizeWarningLimit: 750,
  },
  test: {
    name: '@cms-concept-2/admin',
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

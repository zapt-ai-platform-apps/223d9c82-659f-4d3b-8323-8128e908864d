import { defineConfig } from 'vite';
import solidPlugin from '@vitejs/plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});

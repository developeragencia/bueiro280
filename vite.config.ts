import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    hmr: {
      clientPort: 5173,
      timeout: 60000
    }
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: true
  },
  build: {
    sourcemap: true,
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      '@supabase/supabase-js',
      'sonner'
    ],
    exclude: [],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  esbuild: {
    target: 'esnext',
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
});
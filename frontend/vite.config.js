import dotenv from 'dotenv';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { fileURLToPath } from "node:url";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    strictPort: true,
    port: 5173,
    hmr: {
        clientPort: 5173,
        overlay: false
    },
    proxy: {
      "/proxy": {
        target: "https://localhost:5173",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, '')
      },
    },
  },
  plugins: [react(),reactRefresh()],
  define: {
    'process.env': process.env
  },
  resolve: {
      alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: [
          '.js',
          '.json',
          '.jsx',
          '.mjs',
          '.ts',
          '.tsx',
          '.vue',
      ],
  },
  esbuild: {
    loader: 'jsx',
    include: /.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    }
  }
})
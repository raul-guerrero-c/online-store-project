import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy para evitar problemas de CORS durante el desarrollo.
    // Redirige /api/* hacia el backend objetivo (producción o local según quieras probar).
    proxy: {
      '/api': {
        //target: 'http://localhost:8081',
        target: '{VITE_API_BASE_URL}',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})

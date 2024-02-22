import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // svgr options
      }
    })
  ],
  server: {
    // Configura el puerto si lo deseas
    port: 5173,
    // Define la ruta de acceso inicial cuando el servidor se inicia
    open: '/login'
  }
})

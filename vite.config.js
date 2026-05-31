import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // Use the port the preview assigns (PORT env); fall back to 5180 for a
    // plain `npm run dev`. Avoids Strapi's admin Vite on 5173.
    port: Number(process.env.PORT) || 5180,
    host: true, // bind all interfaces so the preview proxy can reach it
    allowedHosts: true, // accept the preview/tunnel Host header
  },
})

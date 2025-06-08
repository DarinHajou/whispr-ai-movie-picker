import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'  // <- NOT 'swc'!

export default defineConfig({
  plugins: [react()],
})

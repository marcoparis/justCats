import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base: the build works on GitHub Pages whatever the repository is called.
export default defineConfig({
  base: './',
  plugins: [react()],
})

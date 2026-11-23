import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this repo at https://riya6395.github.io/riyapal15.github.io/
export default defineConfig({
  base: '/riyapal15.github.io/',
  plugins: [react()],
})

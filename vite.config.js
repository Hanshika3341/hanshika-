import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import projectPhotos from './plugins/projectPhotos.js'

// https://vite.dev/config/
export default defineConfig({
  // A relative base keeps built asset URLs valid when GitHub Pages serves a
  // fork from /<repository-name>/ instead of the domain root.
  base: './',
  plugins: [react(), projectPhotos()],
})

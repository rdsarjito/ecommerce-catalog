import { defineConfig } from 'vite'
import vue from 'vite-plugin-vue2'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: { port: 5173, open: false }
})

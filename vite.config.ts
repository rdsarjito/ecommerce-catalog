import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'

export default defineConfig({
  plugins: [createVuePlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: { port: 5173, open: false },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['/src/tests/setup.ts']
  }
})

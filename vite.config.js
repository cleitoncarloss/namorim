import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  esbuild: {
    keepNames: true,
  },
  resolve: {
    alias: {
      '@artifact': resolve(__dirname, 'packages/artifact'),
      '@book': resolve(__dirname, 'packages/book'),
      '@cookie': resolve(__dirname, 'packages/cookie'),
      '@directive': resolve(__dirname, 'packages/directive'),
      '@dom': resolve(__dirname, 'packages/dom'),
      '@echo': resolve(__dirname, 'packages/echo'),
      '@event': resolve(__dirname, 'packages/event'),
      '@flow': resolve(__dirname, 'packages/flow'),
      '@google': resolve(__dirname, 'packages/google'),
      '@http': resolve(__dirname, 'packages/http'),
      '@middleware': resolve(__dirname, 'packages/middleware'),
      '@mixin': resolve(__dirname, 'packages/mixin'),
      '@pixel': resolve(__dirname, 'packages/pixel'),
      '@polyfill': resolve(__dirname, 'packages/polyfill'),
      '@result': resolve(__dirname, 'packages/result'),
      '@router': resolve(__dirname, 'packages/router'),
      '@siphon': resolve(__dirname, 'packages/siphon'),
    },
  },
})

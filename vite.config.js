import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    open: true // Isso faz com que o navegador abra automaticamente
  },
  // Configura o diretório público para arquivos estáticos
  publicDir: 'public',
  // Configurações de build
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096, // Arquivos menores que 4kb serão inlined como base64
    minify: 'terser',
    sourcemap: true
  }
})
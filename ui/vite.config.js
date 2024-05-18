import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {

      input: {
        "view": "./src/view_app_main.js",
        "compare": "./src/compare_app_main.js",
        "instance":"/src/view_instance_main.js",
        "servicerunner":"/src/service_runner_main.js"
      },
      output: {
        dir: "../media/",
        entryFileNames: 'entry-[name].js',
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
})

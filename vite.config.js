import { defineConfig } from 'vite'
import { resolve } from 'path'
    
    export default defineConfig({
      css: {
        preprocessorOptions: {
          scss: {
            prependData:
            `@use "@/src/scss/main.scss";`
          }
          }
        }
      }
    )
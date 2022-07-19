import { defineConfig } from 'vite'
import { resolve } from 'path'
    
    export default defineConfig({
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: 
            `@import "./src/scss/main.scss";`
          }
          }
        }
      }
    )
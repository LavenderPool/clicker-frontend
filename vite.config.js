import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import mkcert from'vite-plugin-mkcert'

export default defineConfig(({command, mode}) => {
    if(command == "serve"){
        return {
            plugins: [
                react(),
                svgr(),
                mkcert()
            ],
            build: {
                target: 'esnext'
            }
        }
    }else{
        return {
            plugins: [
                react(),
                svgr(),
            ],
            build: {
                target: 'esnext'
            }
        }
    }
})

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import { ngrok } from 'vite-plugin-ngrok'
const { NGROK_AUTH_TOKEN } = loadEnv('serve', process.cwd(), 'NGROK')

export default defineConfig(({command, mode}) => {
    if(command == "serve"){
        return {
            plugins: [
                react(),
                svgr(),
                ngrok({
                    authtoken: NGROK_AUTH_TOKEN,
                    domain: 'possible-swine-national.ngrok-free.app'
                }),
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

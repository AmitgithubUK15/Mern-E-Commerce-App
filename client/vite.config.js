import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
     '/api':{
       target:'http://localhost:8005',
       secure:false,
     },
    }
   },
  plugins: [react()],
})

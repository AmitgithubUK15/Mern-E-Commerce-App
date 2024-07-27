import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
     '/api':{
       target:import.meta.env.VITE_CLIENT_URL,
       secure:true
     },
     '/auth':{
      target:import.meta.env.VITE_CLIENT_URL,
      secure:true
     },
     '/vendor':{
      target:import.meta.env.VITE_CLIENT_URL,
      secure:true
     },
     '/listing':{
      target:import.meta.env.VITE_CLIENT_URL,
      secure:true
     }
    }
   },
  plugins: [react()],
})

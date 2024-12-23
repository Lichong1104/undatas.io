import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },

  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 8086,
    host: true,
    open: true,
    // proxy: {
    //   "/api": {
    //     target: "http://119.8.170.199:8000",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
});

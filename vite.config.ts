import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://codercba.com:9002", // 后端服务的 HTTP 地址
        changeOrigin: true, // 修改请求头中的 Origin
        rewrite: (path) => path.replace(/^\/api/, ""), // 去掉 /api 前缀
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/.netlify/functions/student": {
        target: "https://healthyday-backend-773381060399.asia-south1.run.app",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace("/.netlify/functions/student", "/api/internal/student"),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("X-API-KEY", "HDB@020205");
          });
        },
      },
      "/.netlify/functions/referrals": {
        target: "https://healthyday-backend-773381060399.asia-south1.run.app",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace("/.netlify/functions/referrals", "/api/internal/student/referrals"),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("X-API-KEY", "HDB@020205");
          });
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

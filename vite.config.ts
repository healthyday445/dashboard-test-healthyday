import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Read the API key from environment — never hardcode secrets in source files.
  // Set INTERNAL_API_KEY in your .env (local) and in Netlify → Site settings → Environment variables (production).
  const internalApiKey = process.env.INTERNAL_API_KEY;

  if (!internalApiKey) {
    console.warn(
      "[vite] WARNING: INTERNAL_API_KEY is not set. " +
        "Proxy requests to the backend will be sent without the X-API-KEY header."
    );
  }

  return {
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
              if (internalApiKey) {
                proxyReq.setHeader("X-API-KEY", internalApiKey);
              }
            });
          },
        },
        "/.netlify/functions/referrals": {
          target: "https://healthyday-backend-773381060399.asia-south1.run.app",
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace("/.netlify/functions/referrals", "/api/internal/student/referrals"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (internalApiKey) {
                proxyReq.setHeader("X-API-KEY", internalApiKey);
              }
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
  };
});

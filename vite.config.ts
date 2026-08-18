import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // loadEnv reads .env / .env.local files into process.env for the config context.
  // Without this, INTERNAL_API_KEY would be undefined locally even if set in .env.
  const env = loadEnv(mode, process.cwd(), "");
  const internalApiKey = env.INTERNAL_API_KEY || process.env.INTERNAL_API_KEY;

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
          target: "https://healthyday-backend-v2-773381060399.asia-south1.run.app",
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
          target: "https://healthyday-backend-v2-773381060399.asia-south1.run.app",
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
        "/.netlify/functions/session-links": {
          target: "https://healthyday-backend-v2-773381060399.asia-south1.run.app",
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace("/.netlify/functions/session-links", "/api/internal/session-link/active"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (internalApiKey) {
                proxyReq.setHeader("X-API-KEY", internalApiKey);
              }
            });
          },
        },
        "/.netlify/functions/leaderboard-rank": {
          target: "https://healthyday-backend-v2-773381060399.asia-south1.run.app",
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace("/.netlify/functions/leaderboard-rank", "/api/internal/referrals/leaderboard/rank"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (internalApiKey) {
                proxyReq.setHeader("X-API-KEY", internalApiKey);
              }
            });
          },
        },
        "/.netlify/functions/leaderboard": {
          target: "https://healthyday-backend-v2-773381060399.asia-south1.run.app",
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace("/.netlify/functions/leaderboard", "/api/internal/referrals/leaderboard"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (internalApiKey) {
                proxyReq.setHeader("X-API-KEY", internalApiKey);
              }
            });
          },
        },
        "/.netlify/functions/update-language": {
          target: "https://support-cases-service-773381060399.asia-south1.run.app",
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace("/.netlify/functions/update-language", "/support/update-student-batch"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (internalApiKey) {
                proxyReq.setHeader("X-API-KEY", internalApiKey);
              }
            });
          },
        },
        "/.netlify/functions/resume-subscription": {
          target: "https://support-cases-service-773381060399.asia-south1.run.app",
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace("/.netlify/functions/resume-subscription", "/support/subscription/resume"),
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
    build: {
      target: "es2015",
    },
    plugins: [
      react(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      mode === "development" && componentTagger()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

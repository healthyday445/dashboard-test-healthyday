// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/Users/prath/OneDrive/Documents/@Downloads/@healthyday/@production/dashboard-test-healthyday/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/prath/OneDrive/Documents/@Downloads/@healthyday/@production/dashboard-test-healthyday/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/prath/OneDrive/Documents/@Downloads/@healthyday/@production/dashboard-test-healthyday/node_modules/lovable-tagger/dist/index.js";
import legacy from "file:///C:/Users/prath/OneDrive/Documents/@Downloads/@healthyday/@production/dashboard-test-healthyday/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\prath\\OneDrive\\Documents\\@Downloads\\@healthyday\\@production\\dashboard-test-healthyday";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const internalApiKey = env.INTERNAL_API_KEY || process.env.INTERNAL_API_KEY;
  if (!internalApiKey) {
    console.warn(
      "[vite] WARNING: INTERNAL_API_KEY is not set. Proxy requests to the backend will be sent without the X-API-KEY header."
    );
  }
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false
      },
      proxy: {
        "/.netlify/functions/student": {
          target: "https://healthyday-backend-v2-773381060399.asia-south1.run.app",
          changeOrigin: true,
          secure: true,
          rewrite: (path2) => path2.replace("/.netlify/functions/student", "/api/internal/student"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (internalApiKey) {
                proxyReq.setHeader("X-API-KEY", internalApiKey);
              }
            });
          }
        },
        "/.netlify/functions/referrals": {
          target: "https://healthyday-backend-v2-773381060399.asia-south1.run.app",
          changeOrigin: true,
          secure: true,
          rewrite: (path2) => path2.replace("/.netlify/functions/referrals", "/api/internal/student/referrals"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (internalApiKey) {
                proxyReq.setHeader("X-API-KEY", internalApiKey);
              }
            });
          }
        },
        "/.netlify/functions/session-links": {
          target: "https://healthyday-backend-v2-773381060399.asia-south1.run.app",
          changeOrigin: true,
          secure: true,
          rewrite: (path2) => path2.replace("/.netlify/functions/session-links", "/api/internal/session-link/active"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (internalApiKey) {
                proxyReq.setHeader("X-API-KEY", internalApiKey);
              }
            });
          }
        },
        "/.netlify/functions/leaderboard-rank": {
          target: "https://healthyday-backend-v2-773381060399.asia-south1.run.app",
          changeOrigin: true,
          secure: true,
          rewrite: (path2) => path2.replace("/.netlify/functions/leaderboard-rank", "/api/internal/referrals/leaderboard/rank"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (internalApiKey) {
                proxyReq.setHeader("X-API-KEY", internalApiKey);
              }
            });
          }
        },
        "/.netlify/functions/leaderboard": {
          target: "https://healthyday-backend-v2-773381060399.asia-south1.run.app",
          changeOrigin: true,
          secure: true,
          rewrite: (path2) => path2.replace("/.netlify/functions/leaderboard", "/api/internal/referrals/leaderboard"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (internalApiKey) {
                proxyReq.setHeader("X-API-KEY", internalApiKey);
              }
            });
          }
        },
        "/.netlify/functions/update-language": {
          target: "https://support-cases-service-773381060399.asia-south1.run.app",
          changeOrigin: true,
          secure: true,
          rewrite: (path2) => path2.replace("/.netlify/functions/update-language", "/support/update-student-batch"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (internalApiKey) {
                proxyReq.setHeader("X-API-KEY", internalApiKey);
              }
            });
          }
        }
      }
    },
    build: {
      target: "es2015"
    },
    plugins: [
      react(),
      legacy({
        targets: ["defaults", "not IE 11"]
      }),
      mode === "development" && componentTagger()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwcmF0aFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcQERvd25sb2Fkc1xcXFxAaGVhbHRoeWRheVxcXFxAcHJvZHVjdGlvblxcXFxkYXNoYm9hcmQtdGVzdC1oZWFsdGh5ZGF5XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwcmF0aFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcQERvd25sb2Fkc1xcXFxAaGVhbHRoeWRheVxcXFxAcHJvZHVjdGlvblxcXFxkYXNoYm9hcmQtdGVzdC1oZWFsdGh5ZGF5XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wcmF0aC9PbmVEcml2ZS9Eb2N1bWVudHMvQERvd25sb2Fkcy9AaGVhbHRoeWRheS9AcHJvZHVjdGlvbi9kYXNoYm9hcmQtdGVzdC1oZWFsdGh5ZGF5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XHJcbmltcG9ydCBsZWdhY3kgZnJvbSBcIkB2aXRlanMvcGx1Z2luLWxlZ2FjeVwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIC8vIGxvYWRFbnYgcmVhZHMgLmVudiAvIC5lbnYubG9jYWwgZmlsZXMgaW50byBwcm9jZXNzLmVudiBmb3IgdGhlIGNvbmZpZyBjb250ZXh0LlxyXG4gIC8vIFdpdGhvdXQgdGhpcywgSU5URVJOQUxfQVBJX0tFWSB3b3VsZCBiZSB1bmRlZmluZWQgbG9jYWxseSBldmVuIGlmIHNldCBpbiAuZW52LlxyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgXCJcIik7XHJcbiAgY29uc3QgaW50ZXJuYWxBcGlLZXkgPSBlbnYuSU5URVJOQUxfQVBJX0tFWSB8fCBwcm9jZXNzLmVudi5JTlRFUk5BTF9BUElfS0VZO1xyXG5cclxuICBpZiAoIWludGVybmFsQXBpS2V5KSB7XHJcbiAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgIFwiW3ZpdGVdIFdBUk5JTkc6IElOVEVSTkFMX0FQSV9LRVkgaXMgbm90IHNldC4gXCIgK1xyXG4gICAgICAgIFwiUHJveHkgcmVxdWVzdHMgdG8gdGhlIGJhY2tlbmQgd2lsbCBiZSBzZW50IHdpdGhvdXQgdGhlIFgtQVBJLUtFWSBoZWFkZXIuXCJcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6IFwiOjpcIixcclxuICAgICAgcG9ydDogODA4MCxcclxuICAgICAgaG1yOiB7XHJcbiAgICAgICAgb3ZlcmxheTogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgXCIvLm5ldGxpZnkvZnVuY3Rpb25zL3N0dWRlbnRcIjoge1xyXG4gICAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vaGVhbHRoeWRheS1iYWNrZW5kLXYyLTc3MzM4MTA2MDM5OS5hc2lhLXNvdXRoMS5ydW4uYXBwXCIsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICBzZWN1cmU6IHRydWUsXHJcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKFwiLy5uZXRsaWZ5L2Z1bmN0aW9ucy9zdHVkZW50XCIsIFwiL2FwaS9pbnRlcm5hbC9zdHVkZW50XCIpLFxyXG4gICAgICAgICAgY29uZmlndXJlOiAocHJveHkpID0+IHtcclxuICAgICAgICAgICAgcHJveHkub24oXCJwcm94eVJlcVwiLCAocHJveHlSZXEpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoaW50ZXJuYWxBcGlLZXkpIHtcclxuICAgICAgICAgICAgICAgIHByb3h5UmVxLnNldEhlYWRlcihcIlgtQVBJLUtFWVwiLCBpbnRlcm5hbEFwaUtleSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIi8ubmV0bGlmeS9mdW5jdGlvbnMvcmVmZXJyYWxzXCI6IHtcclxuICAgICAgICAgIHRhcmdldDogXCJodHRwczovL2hlYWx0aHlkYXktYmFja2VuZC12Mi03NzMzODEwNjAzOTkuYXNpYS1zb3V0aDEucnVuLmFwcFwiLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgc2VjdXJlOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+XHJcbiAgICAgICAgICAgIHBhdGgucmVwbGFjZShcIi8ubmV0bGlmeS9mdW5jdGlvbnMvcmVmZXJyYWxzXCIsIFwiL2FwaS9pbnRlcm5hbC9zdHVkZW50L3JlZmVycmFsc1wiKSxcclxuICAgICAgICAgIGNvbmZpZ3VyZTogKHByb3h5KSA9PiB7XHJcbiAgICAgICAgICAgIHByb3h5Lm9uKFwicHJveHlSZXFcIiwgKHByb3h5UmVxKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGludGVybmFsQXBpS2V5KSB7XHJcbiAgICAgICAgICAgICAgICBwcm94eVJlcS5zZXRIZWFkZXIoXCJYLUFQSS1LRVlcIiwgaW50ZXJuYWxBcGlLZXkpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCIvLm5ldGxpZnkvZnVuY3Rpb25zL3Nlc3Npb24tbGlua3NcIjoge1xyXG4gICAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vaGVhbHRoeWRheS1iYWNrZW5kLXYyLTc3MzM4MTA2MDM5OS5hc2lhLXNvdXRoMS5ydW4uYXBwXCIsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICBzZWN1cmU6IHRydWUsXHJcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT5cclxuICAgICAgICAgICAgcGF0aC5yZXBsYWNlKFwiLy5uZXRsaWZ5L2Z1bmN0aW9ucy9zZXNzaW9uLWxpbmtzXCIsIFwiL2FwaS9pbnRlcm5hbC9zZXNzaW9uLWxpbmsvYWN0aXZlXCIpLFxyXG4gICAgICAgICAgY29uZmlndXJlOiAocHJveHkpID0+IHtcclxuICAgICAgICAgICAgcHJveHkub24oXCJwcm94eVJlcVwiLCAocHJveHlSZXEpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoaW50ZXJuYWxBcGlLZXkpIHtcclxuICAgICAgICAgICAgICAgIHByb3h5UmVxLnNldEhlYWRlcihcIlgtQVBJLUtFWVwiLCBpbnRlcm5hbEFwaUtleSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIi8ubmV0bGlmeS9mdW5jdGlvbnMvbGVhZGVyYm9hcmQtcmFua1wiOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IFwiaHR0cHM6Ly9oZWFsdGh5ZGF5LWJhY2tlbmQtdjItNzczMzgxMDYwMzk5LmFzaWEtc291dGgxLnJ1bi5hcHBcIixcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHNlY3VyZTogdHJ1ZSxcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PlxyXG4gICAgICAgICAgICBwYXRoLnJlcGxhY2UoXCIvLm5ldGxpZnkvZnVuY3Rpb25zL2xlYWRlcmJvYXJkLXJhbmtcIiwgXCIvYXBpL2ludGVybmFsL3JlZmVycmFscy9sZWFkZXJib2FyZC9yYW5rXCIpLFxyXG4gICAgICAgICAgY29uZmlndXJlOiAocHJveHkpID0+IHtcclxuICAgICAgICAgICAgcHJveHkub24oXCJwcm94eVJlcVwiLCAocHJveHlSZXEpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoaW50ZXJuYWxBcGlLZXkpIHtcclxuICAgICAgICAgICAgICAgIHByb3h5UmVxLnNldEhlYWRlcihcIlgtQVBJLUtFWVwiLCBpbnRlcm5hbEFwaUtleSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIi8ubmV0bGlmeS9mdW5jdGlvbnMvbGVhZGVyYm9hcmRcIjoge1xyXG4gICAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vaGVhbHRoeWRheS1iYWNrZW5kLXYyLTc3MzM4MTA2MDM5OS5hc2lhLXNvdXRoMS5ydW4uYXBwXCIsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICBzZWN1cmU6IHRydWUsXHJcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT5cclxuICAgICAgICAgICAgcGF0aC5yZXBsYWNlKFwiLy5uZXRsaWZ5L2Z1bmN0aW9ucy9sZWFkZXJib2FyZFwiLCBcIi9hcGkvaW50ZXJuYWwvcmVmZXJyYWxzL2xlYWRlcmJvYXJkXCIpLFxyXG4gICAgICAgICAgY29uZmlndXJlOiAocHJveHkpID0+IHtcclxuICAgICAgICAgICAgcHJveHkub24oXCJwcm94eVJlcVwiLCAocHJveHlSZXEpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoaW50ZXJuYWxBcGlLZXkpIHtcclxuICAgICAgICAgICAgICAgIHByb3h5UmVxLnNldEhlYWRlcihcIlgtQVBJLUtFWVwiLCBpbnRlcm5hbEFwaUtleSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcIi8ubmV0bGlmeS9mdW5jdGlvbnMvdXBkYXRlLWxhbmd1YWdlXCI6IHtcclxuICAgICAgICAgIHRhcmdldDogXCJodHRwczovL3N1cHBvcnQtY2FzZXMtc2VydmljZS03NzMzODEwNjAzOTkuYXNpYS1zb3V0aDEucnVuLmFwcFwiLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgc2VjdXJlOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+XHJcbiAgICAgICAgICAgIHBhdGgucmVwbGFjZShcIi8ubmV0bGlmeS9mdW5jdGlvbnMvdXBkYXRlLWxhbmd1YWdlXCIsIFwiL3N1cHBvcnQvdXBkYXRlLXN0dWRlbnQtYmF0Y2hcIiksXHJcbiAgICAgICAgICBjb25maWd1cmU6IChwcm94eSkgPT4ge1xyXG4gICAgICAgICAgICBwcm94eS5vbihcInByb3h5UmVxXCIsIChwcm94eVJlcSkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChpbnRlcm5hbEFwaUtleSkge1xyXG4gICAgICAgICAgICAgICAgcHJveHlSZXEuc2V0SGVhZGVyKFwiWC1BUEktS0VZXCIsIGludGVybmFsQXBpS2V5KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIHRhcmdldDogXCJlczIwMTVcIixcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHJlYWN0KCksXHJcbiAgICAgIGxlZ2FjeSh7XHJcbiAgICAgICAgdGFyZ2V0czogWydkZWZhdWx0cycsICdub3QgSUUgMTEnXVxyXG4gICAgICB9KSxcclxuICAgICAgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiICYmIGNvbXBvbmVudFRhZ2dlcigpXHJcbiAgICBdLmZpbHRlcihCb29sZWFuKSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOGQsU0FBUyxjQUFjLGVBQWU7QUFDcGdCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFDaEMsT0FBTyxZQUFZO0FBSm5CLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBR3hDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxRQUFNLGlCQUFpQixJQUFJLG9CQUFvQixRQUFRLElBQUk7QUFFM0QsTUFBSSxDQUFDLGdCQUFnQjtBQUNuQixZQUFRO0FBQUEsTUFDTjtBQUFBLElBRUY7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLFFBQ0gsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLE9BQU87QUFBQSxRQUNMLCtCQUErQjtBQUFBLFVBQzdCLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFFBQVE7QUFBQSxVQUNSLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLCtCQUErQix1QkFBdUI7QUFBQSxVQUN0RixXQUFXLENBQUMsVUFBVTtBQUNwQixrQkFBTSxHQUFHLFlBQVksQ0FBQyxhQUFhO0FBQ2pDLGtCQUFJLGdCQUFnQjtBQUNsQix5QkFBUyxVQUFVLGFBQWEsY0FBYztBQUFBLGNBQ2hEO0FBQUEsWUFDRixDQUFDO0FBQUEsVUFDSDtBQUFBLFFBQ0Y7QUFBQSxRQUNB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

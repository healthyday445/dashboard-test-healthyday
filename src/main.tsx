import '@fontsource/outfit/400.css';
import '@fontsource/outfit/700.css';
import '@fontsource/playball/400.css';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary";
import { syncServerTime } from "./lib/serverTime";
import "./index.css";

await syncServerTime();

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

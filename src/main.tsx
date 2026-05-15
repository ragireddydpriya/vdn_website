import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for image caching
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(new URL("./service-worker.ts", import.meta.url), {
        type: "module",
      })
      .catch((err) => console.error("Service Worker registration failed:", err));
  });
}

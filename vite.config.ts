import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080/",
        headers: {
          language: "en",
          Accept: "application/json",
          // "Content-Type": "application/json; charset=utf-8",
        },
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
      },
      "/api/v1": {
        target: "http://127.0.0.1:3000/",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

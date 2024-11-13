import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      manifest: {
        short_name: "FM9",
        name: "FM9: intuitive self financial management",
        icons: [
          {
            src: "/ron/images/icons-vector-white.svg",
            type: "image/svg+xml",
            sizes: "512x512",
          },
          {
            src: "/ron/images/icons-vector-black.svg",
            type: "image/svg+xml",
            sizes: "512x512",
          },
          {
            src: "/ron/images/apple-touch-icon.png",
            type: "image/png",
            sizes: "180x180",
            purpose: "maskable",
          },
          {
            src: "/ron/images/icons-192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "/ron/images/icons-512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
        start_url: "/ron",
        background_color: "#008080",
        display: "standalone",
        scope: "/ron",
        description: "Intuitive self financial management",
        screenshots: [
          {
            src: "/ron/images/screenshot1.png",
            type: "image/png",
            sizes: "540x720",
            form_factor: "narrow",
          },
          {
            src: "/ron/images/screenshot2.png",
            type: "image/png",
            sizes: "720x540",
            form_factor: "wide",
          },
        ],
        file_handlers: [
          {
            action: "/ron/settings",
            accept: {
              "application/json": [".json"],
            },
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  base: "/ron/",
});

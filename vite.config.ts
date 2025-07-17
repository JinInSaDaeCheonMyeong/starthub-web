import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'named',
        namedExport: 'ReactComponent',
        icon: true,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@design": path.resolve(__dirname, "./src/design"),
      "@style": path.resolve(__dirname, "./src/style"),
      "@queries": path.resolve(__dirname, "./src/queries"),
      "@libs": path.resolve(__dirname, "./src/libs"),
      "@api": path.resolve(__dirname, "./src/api"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['styled-components'],
          utils: ['axios', '@tanstack/react-query', 'js-cookie', 'react-toastify'],
          store: ['zustand'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});

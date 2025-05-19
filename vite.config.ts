// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'named', // named export 사용
        namedExport: 'ReactComponent', // ReactComponent로 내보내기
        icon: true,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
  ],
});
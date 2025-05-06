import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    build: {
        outDir: "dist", // 빌드 결과물을 저장할 디렉토리
        sourcemap: true, // 디버깅을 위해 소스맵 생성
    },
    server: {
        port: 8081, // 개발 서버 실행 포트
        open: true, // 개발 서버 시작 시 브라우저 자동 열기
        proxy: {
            // ✅ CORS 문제 방지 (프론트 → 백엔드 요청 프록시)
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api/, ""), // '/api' 제거 후 백엔드 요청
            },
            "/socket.io": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
                ws: true, // 웹소켓 요청 프록시
            },
        },
    },
    resolve: {
        alias: {
            "@": "/src", // ✅ src 폴더를 `@`로 매핑
        },
    },
});

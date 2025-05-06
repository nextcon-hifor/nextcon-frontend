// plugins/socket.js
import { io } from "socket.io-client";
import { ref, reactive } from "vue";

export default {
    install: (app) => {
        // 소켓 인스턴스 생성
        const socket = io("/", {
            withCredentials: true,
            autoConnect: false, // 필요할 때 수동으로 연결
        });

        // 애플리케이션 전역에서 소켓 접근 가능하도록 설정
        app.config.globalProperties.$socket = socket;

        // Composition API에서 사용하기 위한 provide 설정
        app.provide("socket", socket);

        // 글로벌 소켓 메서드
        app.config.globalProperties.$sendMessage = (payload) => {
            socket.emit("chat:message", payload);
        };

        // 연결 상태 관리
        const connectionStatus = reactive({
            connected: false,
            connecting: false,
            error: null,
        });

        // 기본 소켓 이벤트 리스너 설정
        socket.on("connect", () => {
            console.log("Socket connected!");
            connectionStatus.connected = true;
            connectionStatus.connecting = false;
            connectionStatus.error = null;
        });

        socket.on("disconnect", (reason) => {
            console.log("Socket disconnected");
            connectionStatus.connected = false;
            // 특정 이유로 연결이 끊어진 경우 자동 재연결 시도
            if (reason === "io server disconnect") {
                // 서버에서 연결을 종료한 경우
                setTimeout(() => socket.connect(), 3000);
            }
        });

        socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
            connectionStatus.error = err.message;
            connectionStatus.connecting = false;
        });

        // 연결 상태도 전역으로 제공
        app.provide("connectionStatus", connectionStatus);
    },
};

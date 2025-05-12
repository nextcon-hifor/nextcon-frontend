import { ref, onMounted, onUnmounted, inject } from "vue";

export function useChat() {
    const socket = inject("socket");
    const connectionStatus = inject("connectionStatus");
    const messages = ref([]);
    const error = ref(null);
    const isLoading = ref(false);

    // 메시지 수신 처리
    const setupMessageListener = () => {
        socket.on("newMessage", (message) => {
            messages.value.push(message);
        });
    };

    // 채팅방 입장
    const joinRoom = (chatId) => {
        socket.emit("join", { roomId: chatId });
    };

    // 채팅방 나가기
    const leaveRoom = (chatId) => {
        socket.emit("leave", { roomId: chatId });
    };

    onMounted(() => {
        setupMessageListener();

        // 필요시 자동 연결
        if (!connectionStatus.connected && !connectionStatus.connecting) {
            socket.connect();
        }
    });

    onUnmounted(() => {
        socket.off("chat:message");
    });

    return {
        messages,
        error,
        isLoading,
        joinRoom,
        leaveRoom,
        connectionStatus,
    };
}

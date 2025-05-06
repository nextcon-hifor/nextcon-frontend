import { ref, onMounted, onUnmounted, inject } from "vue";

export function useChat() {
    const socket = inject("socket");
    const connectionStatus = inject("connectionStatus");
    const messages = ref([]);
    const error = ref(null);
    const isLoading = ref(false);

    // 메시지 수신 처리
    const setupMessageListener = () => {
        socket.on("chat:message", (message) => {
            messages.value.push(message);
        });
    };

    // 메시지 전송 함수
    const sendMessage = (content, chatId, userId) => {
        if (!connectionStatus.connected) {
            socket.connect();
        }

        return new Promise((resolve, reject) => {
            socket.emit(
                "chat:message",
                {
                    content,
                    chatId,
                    userId,
                    timestamp: new Date(),
                },
                (response) => {
                    if (response.error) {
                        reject(response.error);
                    } else {
                        resolve(response);
                    }
                }
            );
        });
    };

    // 채팅방 입장
    const joinRoom = (chatId) => {
        socket.emit("chat:join", { chatId });
    };

    // 채팅방 나가기
    const leaveRoom = (chatId) => {
        socket.emit("chat:leave", { chatId });
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
        sendMessage,
        joinRoom,
        leaveRoom,
        connectionStatus,
    };
}

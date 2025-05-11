<template>
    <div class="chat-container">
        <!-- Chat sidebar with room list -->
        <div class="chat-sidebar">
            <div class="chat-header">
                <h2>Chats</h2>
            </div>
            <div v-if="isLoadingRooms" class="loading">
                Loading chat rooms...
            </div>
            <div v-else-if="chatRooms.length === 0" class="empty-state">
                No chat rooms available
            </div>
            <div v-else class="chat-room-list">
                <div
                    v-for="room in chatRooms"
                    :key="room.id"
                    :class="[
                        'chat-room-item',
                        { active: room.id === currentChatId },
                    ]"
                    @click="selectChatRoom(room.id)"
                >
                    <div class="rooms-avatar">
                        <div
                            v-if="room.users && room.users.length > 1"
                            class="group-avatar"
                        >
                            <div
                                v-for="(user, index) in room.users.slice(0, 4)"
                                :key="user.id"
                                :class="['avatar-part', `part-${index + 1}`]"
                            >
                                <img
                                    :src="
                                        user.profileImage ||
                                        '/assets/img/icon_UserCamera.png'
                                    "
                                    :alt="user.username"
                                />
                            </div>
                        </div>
                        <img
                            v-else-if="room.users && room.users.length === 1"
                            :src="
                                room.users[0].profileImage ||
                                '/assets/img/icon_UserCamera.png'
                            "
                            alt="Room"
                        />
                        <img
                            v-else
                            src="/assets/img/icon_UserCamera.png"
                            alt="Room"
                        />
                    </div>
                    <div class="room-details">
                        <div class="room-name">{{ room.name }}</div>
                        <div
                            class="last-message"
                            :class="{ 'no-message': !room.lastMessage }"
                        >
                            {{ room.lastMessage || "No messages yet" }}
                        </div>
                    </div>
                    <div class="room-meta">
                        <div
                            class="message-time"
                            v-if="room.lastMessage && room.lastMessageTime"
                        >
                            {{ formatTime(room.lastMessageTime) }}
                        </div>
                        <div v-if="room.unreadCount" class="unread-count">
                            {{ room.unreadCount }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Chat messages area -->
        <div class="chat-messages-container" v-if="currentChatId">
            <div class="chat-header">
                <div v-if="currentChat" class="current-chat-info">
                    <img
                        :src="
                            currentChat.avatar ||
                            '/assets/img/icon_UserCamera.png'
                        "
                        alt="Room"
                        class="room-avatar"
                    />
                    <div class="room-name">{{ currentChat.name }}</div>
                </div>
            </div>

            <div class="messages-wrapper" ref="messageContainer">
                <div v-if="isLoadingMessages" class="loading">
                    Loading messages...
                </div>
                <div v-else-if="messages.length === 0" class="empty-state">
                    No messages yet
                </div>
                <div v-else class="messages-list">
                    <div
                        v-for="message in messages"
                        :key="message.id"
                        class="message other-message"
                    >
                        <div class="sender-name">
                            {{ message.sender?.username || "Unknown User" }}
                        </div>
                        <div class="message-content">{{ message.content }}</div>
                        <div class="message-time">
                            {{ formatMessageTime(message.timestamp) }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="message-input-container">
                <input
                    v-model="newMessage"
                    type="text"
                    placeholder="Type a message..."
                    @keyup.enter="sendNewMessage"
                    :disabled="!connectionStatus.connected"
                />
                <button
                    @click="sendNewMessage"
                    :disabled="
                        !newMessage.trim() || !connectionStatus.connected
                    "
                >
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>

        <!-- Empty state when no chat is selected -->
        <div class="empty-chat-state" v-else>
            <div class="select-chat-prompt">
                <i class="fas fa-comments"></i>
                <p>Select a chat to start messaging</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    ref,
    onMounted,
    computed,
    nextTick,
    watch,
    inject,
    onUnmounted,
} from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useChat } from "../../composables/useChat";

// Chat State
const chatRooms = ref([]);
const currentChatId = ref(null);
const isLoadingRooms = ref(false);
const isLoadingMessages = ref(false);
const messages = ref([]);
const newMessage = ref("");
const messageContainer = ref(null);
const user = ref({
    email: "",
    username: "",
    id: null,
});

// Get socket and store from Vue app
const socket = inject("socket");
const connectionStatus = inject("connectionStatus");
const store = useStore();

// Get current user ID from Vuex store
const currentUserId = computed(() => store.getters.userId);

// Use the chat composable
const { joinRoom, leaveRoom } = useChat();

// 유저 데이터 가져오기
const getUser = async (userId) => {
    if (user.value.username) {
        return;
    }

    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/user/getUser/${userId}`,
            {
                withCredentials: true,
            }
        );
        const userData = response.data;
        user.value.email = userData.email || "";
        user.value.username = userData.username || "";
        user.value.id = userData.id || "";
        console.log("User data loaded:", user.value);
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
};

// Current chat room information
const currentChat = computed(() =>
    chatRooms.value.find((room) => room.id === currentChatId.value)
);

// Fetch chat rooms from the API
const fetchChatRooms = async () => {
    if (!currentUserId.value) return;

    isLoadingRooms.value = true;
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/chatrooms/`,
            { withCredentials: true }
        );

        // 현재 사용자가 참여한 채팅방만 필터링. 백 말고 프론트에서 필터링
        const userRooms = response.data.filter((room) => {
            return (
                room.users &&
                room.users.some((user) => {
                    return user.userId === currentUserId.value;
                })
            );
        });

        chatRooms.value = await Promise.all(
            userRooms.map(async (room) => {
                // 각 채팅방의 마지막 메시지 정보 가져오기
                let lastMessage = null;
                let lastMessageTime = null;

                try {
                    const messagesResponse = await axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/chatrooms/${
                            room.id
                        }?userId=${currentUserId.value}`,
                        { withCredentials: true }
                    );

                    if (
                        messagesResponse.data &&
                        messagesResponse.data.messages &&
                        messagesResponse.data.messages.length > 0
                    ) {
                        // 메시지를 시간순으로 정렬
                        const sortedMessages =
                            messagesResponse.data.messages.sort(
                                (a, b) =>
                                    new Date(b.timestamp) -
                                    new Date(a.timestamp)
                            );
                        // 가장 최근 메시지 가져오기
                        const lastMsg = sortedMessages[0];
                        lastMessage = lastMsg.content;
                        lastMessageTime = lastMsg.timestamp;
                    }
                } catch (error) {
                    console.warn(
                        `Failed to fetch messages for room ${room.id}:`,
                        error
                    );
                }

                return {
                    id: room.id,
                    name: room.name || "Chat Room",
                    type: room.type,
                    createdAt: room.createdAt,
                    updatedAt: room.updatedAt,
                    lastMessage: lastMessage,
                    lastMessageTime: lastMessageTime,
                    unreadCount: room.unreadCount || 0,
                };
            })
        );

        // 마지막 메시지 시간을 기준으로 정렬 (최신순)
        chatRooms.value.sort((a, b) => {
            const timeA = a.lastMessageTime
                ? new Date(a.lastMessageTime)
                : new Date(a.createdAt);
            const timeB = b.lastMessageTime
                ? new Date(b.lastMessageTime)
                : new Date(b.createdAt);
            return timeB - timeA;
        });
    } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
    } finally {
        isLoadingRooms.value = false;
    }
};

// Fetch chat messages for a specific room
const fetchChatMessages = async (chatId) => {
    if (!chatId) return;

    isLoadingMessages.value = true;
    try {
        console.log("Fetching messages for chat:", chatId);
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/chatrooms/${chatId}?userId=${
                currentUserId.value
            }`,
            {
                withCredentials: true,
                params: { _t: new Date().getTime() },
            }
        );

        console.log("Received messages data:", response.data);

        if (response.data && response.data.messages) {
            // 메시지 데이터 구조 확인 및 로깅
            console.log("First message structure:", response.data.messages[0]);

            // id 기준으로 오름차순 정렬
            messages.value = response.data.messages.sort((a, b) => a.id - b.id);

            console.log(
                `Loaded ${messages.value.length} messages for room ${chatId}`
            );

            // 메시지 로드 후 스크롤을 맨 아래로 이동
            await nextTick();
            scrollToBottom();
        } else {
            console.warn("No messages found in response:", response.data);
            messages.value = [];
        }
    } catch (error) {
        console.error(`Failed to fetch messages for chat ${chatId}:`, error);
        messages.value = [];
    } finally {
        isLoadingMessages.value = false;
    }
};

// 스크롤을 맨 아래로 이동하는 함수
const scrollToBottom = () => {
    if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
};

// Select a chat room
const selectChatRoom = async (chatId) => {
    if (currentChatId.value === chatId) return;

    // Leave current room if any
    if (currentChatId.value) {
        leaveRoom(currentChatId.value);
    }

    currentChatId.value = chatId;
    messages.value = [];
    isLoadingMessages.value = true;

    // joinRoom emit 또는 useChat의 joinRoom 사용
    joinRoom(chatId);

    try {
        // 사용자 정보가 있는 경우에만 메시지 가져오기
        if (user.value.id) {
            await fetchChatMessages(chatId);
            const room = chatRooms.value.find((r) => r.id === chatId);
            if (room) {
                room.unreadCount = 0;
            }
            // 채팅방 선택 후 스크롤을 맨 아래로 이동
            nextTick(() => {
                scrollToBottom();
            });
        }
    } catch (error) {
        console.error("Error selecting chat room:", error);
    } finally {
        isLoadingMessages.value = false;
    }
};

// 소켓 이벤트 핸들러
const handleNewMessage = (message) => {
    console.log("새 메시지 수신:", message);

    if (message.roomId === currentChatId.value) {
        // 현재 채팅방의 메시지인 경우
        // 중복 메시지 체크
        const isDuplicate = messages.value.some((m) => m.id === message.id);
        if (!isDuplicate) {
            messages.value.push(message);
            // 새 메시지 추가 후 스크롤을 맨 아래로 이동
            nextTick(() => {
                scrollToBottom();
            });
        }

        // 채팅방 목록의 마지막 메시지 업데이트
        const room = chatRooms.value.find((r) => r.id === message.roomId);
        if (room) {
            room.lastMessage = message.content;
            room.lastMessageTime = message.timestamp;
            room.unreadCount = 0;
        }
    } else {
        // 다른 채팅방의 메시지인 경우
        const room = chatRooms.value.find((r) => r.id === message.roomId);
        if (room) {
            room.lastMessage = message.content;
            room.lastMessageTime = message.timestamp;
            room.unreadCount = (room.unreadCount || 0) + 1;
        }
    }
};

// 연결 상태 변경 핸들러
const handleConnectionChange = (isConnected) => {
    if (isConnected && currentChatId.value) {
        joinRoom(currentChatId.value);
    } else if (!isConnected) {
        // 연결이 끊어졌을 때 UI 업데이트
        connectionStatus.error = "연결이 끊어졌습니다. 재연결을 시도합니다...";
    }
};

// 컴포넌트 마운트 시
onMounted(async () => {
    console.log("Chat 컴포넌트 마운트");

    if (!connectionStatus.connected && !connectionStatus.connecting) {
        const token = store.getters.token;
        socket.auth = { token };
        socket.connect();
    }

    // 사용자 정보 먼저 가져오기
    if (currentUserId.value) {
        await getUser(currentUserId.value);
    }

    // 소켓 이벤트 리스너 등록
    socket.on("newMessage", handleNewMessage);
    socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
        connectionStatus.error =
            "서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.";
        connectionStatus.connecting = false;
    });

    // 사용자 정보가 로드된 후에 채팅방 목록 가져오기
    if (user.value.id) {
        await fetchChatRooms();
    }
});

// 컴포넌트 언마운트 시
onUnmounted(() => {
    // 소켓 이벤트 리스너 제거
    socket.off("newMessage", handleNewMessage);
});

// 연결 상태 감시
watch(() => connectionStatus.connected, handleConnectionChange);

// 메시지 전송 함수
const sendNewMessage = async () => {
    const content = newMessage.value.trim();
    if (!content || !currentChatId.value) return;

    // 필수 필드 검증
    if (!currentUserId.value) {
        console.error("사용자 ID가 없습니다.");
        return;
    }

    // 메시지 데이터 구성 (백엔드 요구사항에 맞춤)
    const messageData = {
        content: content,
        roomId: Number(currentChatId.value),
        sender: {
            id: user.value.id,
            username: user.value.username,
            email: user.value.email,
        },
    };

    console.log("전송할 메시지 데이터:", messageData);

    // 입력창 초기화
    newMessage.value = "";

    try {
        // API 요청 먼저 수행
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/chatmessages`,
            messageData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("메시지 저장 응답:", response.data);

        // API 응답으로 받은 메시지를 화면에 즉시 표시
        if (response.data) {
            messages.value.push(response.data);
            nextTick(() => {
                scrollToBottom();
            });
        }

        // 소켓 emit은 제거 (백엔드에서 처리하도록)
        // socket.emit("sendMessage", messageData);
    } catch (error) {
        console.error("메시지 전송 중 오류 발생:", error);
        alert("메시지 전송에 실패했습니다. 다시 시도해주세요.");
    }
};

// Update the last message for a chat room
const updateLastMessage = (chatId, content) => {
    const room = chatRooms.value.find((r) => r.id === chatId);
    if (room) {
        room.lastMessage = content;
        room.lastMessageTime = new Date().toISOString();

        // 메시지 전송 후 채팅방 목록 재정렬
        chatRooms.value.sort((a, b) => {
            const timeA = a.lastMessageTime
                ? new Date(a.lastMessageTime)
                : new Date(a.createdAt);
            const timeB = b.lastMessageTime
                ? new Date(b.lastMessageTime)
                : new Date(b.createdAt);
            return timeB - timeA;
        });
    }
};

// Format time for the chat list
const formatTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();

    // If the message is from today, show time only
    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    // If the message is from this week, show day name
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diff < 7) {
        return date.toLocaleDateString([], { weekday: "short" });
    }

    // Otherwise show date
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

// Format time for individual messages
const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // 오늘 보낸 메시지는 시간만 표시
    if (date >= today) {
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // 24시간제로 표시
        });
    }

    // 어제 보낸 메시지는 '어제'와 함께 시간 표시
    if (date >= yesterday && date < today) {
        const time = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
        return `어제 ${time}`;
    }

    // 올해 보낸 다른 메시지들은 월/일과 시간
    if (date.getFullYear() === now.getFullYear()) {
        return `${
            date.getMonth() + 1
        }/${date.getDate()} ${date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })}`;
    }

    // 이전 년도 메시지는 연/월/일과 시간
    return `${date.getFullYear()}/${
        date.getMonth() + 1
    }/${date.getDate()} ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })}`;
};
</script>

<style scoped>
/* Chat container layout */
.chat-container {
    display: flex;
    height: 500px;
    margin: 60px auto;
    margin-bottom: 100px;
    max-width: 90%;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

/* Chat sidebar */
.chat-sidebar {
    width: 300px;
    border-right: 1px solid #e0e0e0;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
}

.chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid #e0e0e0;
}

.chat-sidebar h2 {
    padding: 0;
    margin: 0;
    border-bottom: none;
    font-size: 18px;
    color: #333;
}

.chat-room-list {
    overflow-y: auto;
    flex-grow: 1;
}

.chat-room-item {
    display: flex;
    padding: 12px 15px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s;
}

.chat-room-item:hover {
    background-color: #f0f0f0;
}

.chat-room-item.active {
    background-color: #58c2ff25;
    border-left: 3px solid #4457ff;
}

.rooms-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;
    position: relative;
}

.rooms-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.room-details {
    flex-grow: 1;
    overflow: hidden;
}

.room-name {
    font-weight: 500;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.last-message {
    color: #777;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 마지막 메시지가 없을 때 스타일 */
.last-message.no-message {
    font-style: italic;
    color: #aaa;
}

.room-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 40px;
}

.message-time {
    font-size: 12px;
    color: #999;
    margin-bottom: 8px;
}

/* 마지막 메시지 시간이 없을 때 스타일 */
.message-time-empty {
    font-size: 11px;
    color: #ccc;
    margin-bottom: 8px;
}

.unread-count {
    background-color: #4457ff;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

/* Chat messages area */
.chat-messages-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: white;
}

.current-chat-info {
    display: flex;
    align-items: center;
}

.current-chat-info .room-avatar {
    width: 40px;
    height: 40px;
    margin-right: 12px;
}

.messages-wrapper {
    flex-grow: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;
}

.messages-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}

.message {
    margin-bottom: 12px;
    max-width: 70%;
    animation: fadeIn 0.2s ease-out;
    display: flex;
    flex-direction: column;
}

.own-message {
    margin-left: auto;
    margin-right: 0;
    background-color: #4457ff;
    color: white;
    border-radius: 18px 18px 0 18px;
    padding: 10px 15px;
    align-self: flex-end;
}

.other-message {
    margin-right: auto;
    margin-left: 0;
    background-color: #f1f1f1;
    border-radius: 18px 18px 18px 0;
    padding: 10px 15px;
    align-self: flex-start;
}

.message-content {
    word-break: break-word;
}

.message .message-time {
    font-size: 11px;
    margin-top: 4px;
    text-align: right;
    color: #999;
}

.own-message .message-time,
.own-message-time {
    color: rgba(255, 255, 255, 0.8);
}

.other-message .message-time {
    color: #999;
}

.sender-name {
    font-size: 12px;
    color: #777;
    margin-bottom: 4px;
}

.message-input-container {
    display: flex;
    padding: 12px 16px;
    border-top: 1px solid #e0e0e0;
}

.message-input-container input {
    flex-grow: 1;
    border: 1px solid #ddd;
    border-radius: 24px;
    padding: 8px 16px;
    margin-right: 12px;
    outline: none;
}

.message-input-container input:focus {
    border-color: #4457ff;
}

.message-input-container button {
    background-color: #4457ff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
}

.message-input-container button:hover {
    background-color: #3346d3;
}

.message-input-container button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* Empty states */
.loading,
.empty-state,
.empty-chat-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;
    font-size: 14px;
    text-align: center;
    padding: 20px;
}

.empty-chat-state i {
    font-size: 48px;
    color: #ddd;
    margin-bottom: 16px;
}

.create-chat-btn {
    background-color: #4457ff;
    color: white;
    width: 32px;
    height: 32px;
    margin-left: 5px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
}

.create-chat-btn:hover {
    background-color: #3346d3;
}

/* 모달 스타일 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
}

.modal-body {
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

.user-list {
    max-height: 250px;
    overflow-y: auto;
    border: 1px solid #eee;
    border-radius: 4px;
}

.user-item {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s;
}

.user-item:last-child {
    border-bottom: none;
}

.user-item:hover {
    background-color: #f8f9fa;
}

.user-item.selected {
    background-color: #e8f0fe;
}

.user-item img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
    object-fit: cover;
}

.user-item span {
    flex-grow: 1;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 16px 20px;
    border-top: 1px solid #e0e0e0;
    gap: 10px;
}

.cancel-btn {
    background-color: #f1f1f1;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
}

.create-btn {
    background-color: #4457ff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
}

.create-btn:hover {
    background-color: #3346d3;
}

.create-btn:disabled {
    background-color: #b3b3b3;
    cursor: not-allowed;
}

.sender-name {
    font-size: 12px;
    color: #777;
    margin-bottom: 4px;
}

.message {
    margin-bottom: 12px;
    max-width: 70%;
    animation: fadeIn 0.2s ease-out;
    display: flex;
    flex-direction: column;
}
/* 메시지 애니메이션 효과 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
/* 메시지 애니메이션 효과 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
@media screen and (max-width: 768px) {
    .chat-container {
        flex-direction: column;
        height: 600px;
    }

    .chat-sidebar {
        width: 100%;
        height: 200px;
    }
}

/* 그룹 아바타 스타일 */
.group-avatar {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1px;
    background-color: #e0e0e0;
}

.avatar-part {
    overflow: hidden;
    position: relative;
    background-color: #f0f0f0;
}

.avatar-part img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.part-1 {
    grid-area: 1 / 1 / 2 / 2;
}
.part-2 {
    grid-area: 1 / 2 / 2 / 3;
}
.part-3 {
    grid-area: 2 / 1 / 3 / 2;
}
.part-4 {
    grid-area: 2 / 2 / 3 / 3;
}
</style>

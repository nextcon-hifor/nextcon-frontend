<template>
    <div class="mypage-con">
        <div class="row">
            <!-- 좌측 프로필 영역 -->
            <div class="col-lg-4 col-md-12">
                <div class="profile-box">
                    <div
                        class="profile-img"
                        @click="triggerFileInput"
                        :class="{
                            'hover-enabled': currentUserId === wantShowUserId,
                        }"
                        :style="{
                            backgroundImage: `url(${user.profileImage})`,
                        }"
                    >
                        <input
                            v-if="currentUserId === wantShowUserId"
                            type="file"
                            ref="fileInput"
                            accept="image/*"
                            @change="handleFileChange"
                            style="display: none"
                        />
                        <img
                            v-if="currentUserId === wantShowUserId"
                            src="/assets/img/icon_UserCamera.png"
                            alt=""
                        />
                    </div>

                    <p class="profile-name">{{ user.username }}</p>
                    <p class="profile-info">
                        {{ user.nationality }}, {{ user.gender }},
                        {{ user.age }}
                    </p>
                </div>
                <div class="profile-box">
                    <div class="row">
                        <div class="col-6 host-info">
                            <p class="host-info-num">{{ hostEvents.length }}</p>
                            <p class="host-info-text">Events Hosted</p>
                        </div>
                        <div class="col-6 host-info">
                            <p class="host-info-num">
                                {{ getParticipantsTotal() }}
                            </p>
                            <p class="host-info-text">Total Attendees</p>
                        </div>
                    </div>
                    <div class="stars-container">
                        <router-link :to="`/reviews/${wantShowUserId}`">
                            <span v-for="star in 5" :key="star">
                                <i
                                    :class="
                                        star <= user.averageRating
                                            ? 'fas fa-star'
                                            : 'far fa-star'
                                    "
                                    style="font-size: 24px"
                                ></i>
                            </span>
                            <!--event.rate-->
                            <span
                                class="host-info-num"
                                style="
                                    margin-left: 10px;
                                    font-size: 16px;
                                    color: #555;
                                "
                            >
                                {{ user.averageRating }}
                                <!--event.rate.toFixed(1)-->
                            </span>
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- 우측 이벤트 영역 -->
            <div class="col-lg-8 col-md-12">
                <!-- Hosted Events -->
                <div class="events-box">
                    <p class="box-title">Hosted Event</p>
                    <div class="row">
                        <div
                            class="col-md-6 col-sm-12"
                            v-for="event in hostEvents"
                            :key="event.id"
                            :event="event"
                        >
                            <router-link :to="`/events/${event.id}`">
                                <div class="mp-card">
                                    <div class="row">
                                        <div
                                            class="col-4 mp-event-img"
                                            :style="{
                                                backgroundImage: `url(${event.mainImage})`,
                                            }"
                                        ></div>
                                        <div class="col-8">
                                            <p class="mp-event-title">
                                                {{ event.title }}
                                            </p>
                                            <span>{{ event.participants }}</span
                                            >/<span>{{
                                                event.maxParticipants
                                            }}</span>
                                            <div class="event-rating">
                                                <i class="fas fa-star"></i>
                                                <span>
                                                    {{ event.averageRating }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- Joined Events -->
                <div class="events-box">
                    <p class="box-title">Joined Event</p>
                    <div class="row">
                        <div
                            class="col-md-6 col-sm-12"
                            v-for="event in participatedEvents"
                            :key="event.id"
                            :event="event"
                        >
                            <router-link :to="`/events/${event.id}`">
                                <div class="mp-card">
                                    <div class="row">
                                        <div
                                            class="col-4 mp-event-img"
                                            :style="{
                                                backgroundImage: `url(${event.mainImage})`,
                                            }"
                                        ></div>
                                        <div class="col-8">
                                            <p class="mp-event-title">
                                                {{ event.title }}
                                            </p>
                                            <p
                                                class="mp-event-host"
                                                @click.stop
                                            >
                                                <router-link
                                                    :to="`/userPage/${event.hostId}`"
                                                >
                                                    <img
                                                        class="mp-host-icon"
                                                        :src="
                                                            event.hostProfileImage
                                                        "
                                                        alt="Host"
                                                    />
                                                    {{ event.host }}
                                                </router-link>
                                            </p>
                                            <!-- 리뷰 버튼-->
                                            <router-link
                                                v-if="
                                                    currentUserId ===
                                                        wantShowUserId &&
                                                    !event.hasReviewed
                                                "
                                                :to="`/reviewEvent/${event.id}`"
                                                class="review-btn"
                                            >
                                                리뷰 작성
                                            </router-link>
                                            <button
                                                v-if="
                                                    currentUserId ===
                                                        wantShowUserId &&
                                                    event.hasReviewed
                                                "
                                                class="review-btn completed"
                                                disabled
                                            >
                                                리뷰 완료
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- Liked Events -->
                <div class="events-box" v-if="currentUserId == wantShowUserId">
                    <p class="box-title">Liked Event</p>
                    <div class="row">
                        <div
                            class="col-md-6 col-sm-12"
                            v-for="event in likedEvents"
                            :key="event.id"
                            :event="event"
                        >
                            <router-link :to="event.isDeleted ? '#' : `/events/${event.id}`">
                                <div class="mp-card">
                                    <div class="row">
                                        <div
                                            class="col-4 mp-event-img"
                                            :style="{
                                                backgroundImage: `url(${event.mainImage})`,
                                                opacity: event.isDeleted ? '0.5' : '1'
                                            }"
                                        ></div>
                                        <div class="col-8">
                                             <p class="mp-event-title" :class="{ 'deleted-text': event.isDeleted }">
                                                {{ event.title }}
                                                <span v-if="event.isDeleted">(삭제됨)</span>
                                            </p>
                                            <p
                                                class="mp-event-host"
                                                @click.stop
                                            >
                                                <router-link
                                                    v-if="!event.isDeleted"
                                                    :to="`/userPage/${event.hostId}`"
                                                >
                                                    <img
                                                        class="mp-host-icon"
                                                        :src="
                                                            event.hostProfileImage
                                                        "
                                                        alt="Host"
                                                    />
                                                    {{ event.host }}
                                                </router-link>
                                                <span v-else>{{ event.host }}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, reactive, ref } from "vue";
import axios from "axios";

const store = useStore();
const currentUserId = ref(store.state.userId);
const wantShowUserId = window.location.pathname.split("/").pop(); // Extract event ID from URL
const fileInput = ref(null); // file input 요소에 대한 참조

const user = reactive({
    userId: "",
    username: "",
    dob: "",
    gender: "",
    age: 0,
    nationality: "",
    profileImage: "/profile-images/default-profile-image.png", // 정적 경로로 설정
    averageRating: 0,
});

const triggerFileInput = () => {
    if (fileInput.value) {
        fileInput.value.click(); // 클릭 이벤트로 파일 선택 창 열기
    }
};

const handleFileChange = async (event) => {
    const file = event.target.files[0]; // 선택된 파일
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // 🔥 파일을 FormData에 추가

    try {
        // 서버로 이미지 업로드
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/user/uploadProfileImage/${
                user.userId
            }`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }, // 파일 업로드를 위한 헤더 설정
                withCredentials: true, // 인증 정보를 포함
            }
        );

        // 서버에서 반환된 이미지 URL로 업데이트
        if (response.data.imageUrl) {
            user.profileImage = response.data.imageUrl; // 서버에서 반환된 경로 사용
        } else {
            console.warn("No image URL returned from the server.");
        }
    } catch (error) {
        console.error("Failed to upload profile image:", error);
    }
};

// 유저 데이터 가져오기
const getUser = async (userId) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/user/getUser/${userId}`,
            {
                withCredentials: true, // 인증 정보를 포함
            }
        );
        const userData = response.data;

        // user 상태 업데이트
        user.userId = userData.userId || "";
        user.email = userData.email || "";
        user.username = userData.username || "";
        user.dob = userData.dob || "";
        user.gender = userData.gender || "";
        user.age = userData.age || 0;
        user.university = userData.university || "";
        user.phoneNumber = userData.phoneNumber || "";
        user.nationality = userData.nationality || "";
        user.profileImage = userData.profileImage || "";
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
};
const getAverageRating = async (userId) => {
    try {
        const ratingResponse = await axios.get(
            `${
                import.meta.env.VITE_API_BASE_URL
            }/reviews/host/${userId}/average`,
            { withCredentials: true }
        );
        user.averageRating = ratingResponse.data.average || 0;
    } catch (error) {
        console.error("Failed to fetch average rating: ", error);
    }
};

// 탭별 이벤트 데이터
const hostEvents = ref([]);
const participatedEvents = ref([]);
const likedEvents = ref([]);

// 공통 매핑 함수
const mapEventData = async (event) => {
    try {
        // 호스트 프로필 이미지 가져오기
        let hostProfileImage = "";
        try {
            const hostResponse = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/user/getUser/${
                    event.createdBy?.userId || "unknown"
                }`,
                {
                    withCredentials: true,
                }
            );
            hostProfileImage = hostResponse.data.profileImage || "";
        } catch (hostError) {
            console.warn("호스트 정보를 가져오는데 실패했습니다:", hostError);
            // 오류 발생 시 기본 이미지 사용
        }

        // 리뷰 데이터 가져오기
        let hasReviewed = false;
        try {
            const reviewResponse = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/reviews/event/${event.id}`,
                { withCredentials: true }
            );
            hasReviewed = reviewResponse.data.some(
                (review) => review.user.userId === currentUserId.value
            );
        } catch (reviewError) {
            console.warn("리뷰 정보를 가져오는데 실패했습니다:", reviewError);
            // 오류 발생 시 기본값 false 사용
        }

        return {
            id: event.id,
            mainImage: event.mainImage || "/path/to/user-image.jpg", // 기본 이미지 경로 설정
            title: event.name || "삭제된 이벤트",
            host: event.createdBy?.username || "알 수 없는 호스트",
            hostId: event.createdBy?.userId || "unknown",
            hostProfileImage: hostProfileImage,
            participants: event.participants || 0,
            maxParticipants: event.maxParticipants || 0,
            hasReviewed: hasReviewed,
            isDeleted: !event.name // 이벤트 이름이 없으면 삭제된 것으로 간주
        };
    } catch (error) {
        console.error("Error in mapEventData:", error);
        // 에러 발생 시 기본값 반환
        return {
            id: event.id || "unknown",
            mainImage: "/path/to/user-image.jpg", // 기본 이미지 경로 설정
            title: "삭제된 이벤트",
            host: "알 수 없는 호스트",
            hostId: "unknown",
            hostProfileImage: "",
            participants: 0,
            maxParticipants: 0,
            hasReviewed: false,
            isDeleted: true
        };
    }
};

// 이벤트 데이터 가져오기
const fetchAllEvents = async () => {
    try {
        // Host 이벤트 가져오기
        const hostResponse = await axios.get(
            `${
                import.meta.env.VITE_API_BASE_URL
            }/events/getEventsByHostId/${wantShowUserId}`,
            { withCredentials: true }
        );
        // 이벤트 데이터 매핑 및 리뷰 데이터 추가
        hostEvents.value = await Promise.all(
            hostResponse.data.map(async (event) => {
                const mappedEvent = await mapEventData(event);

                // 리뷰 데이터 가져오기
                const ratingResponse = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/reviews/event/${
                        event.id
                    }`,
                    { withCredentials: true }
                );

                const ratings = ratingResponse.data.map(
                    (review) => review.rating
                );
                const totalRating = ratings.reduce(
                    (sum, rating) => sum + rating,
                    0
                );
                mappedEvent.averageRating = ratings.length
                    ? (totalRating / ratings.length).toFixed(1)
                    : "리뷰 없음";

                return mappedEvent;
            })
        );

        // Participated 이벤트 가져오기
        const participatedResponse = await axios.get(
            `${
                import.meta.env.VITE_API_BASE_URL
            }/participants/getParticipatedEvent/${wantShowUserId}`,
            { withCredentials: true }
        );
        participatedEvents.value = await Promise.all(
            participatedResponse.data.map(async (event) => {
                return await mapEventData(event);
            })
        );

        // Liked 이벤트 가져오기
        const likedResponse = await axios.get(
            `${
                import.meta.env.VITE_API_BASE_URL
            }/events/getLikedEvent/${wantShowUserId}`,
            { withCredentials: true }
        );
        // Promise.all을 사용하여 모든 매핑 작업이 완료될 때까지 기다림
        const mappedLikedEvents = await Promise.all(
            likedResponse.data.map(async (event) => {
                try {
                    return await mapEventData(event);
                } catch (error) {
                    console.warn(`이벤트 ID ${event.id} 매핑 중 오류:`, error);
                    // 오류 발생 시 기본 삭제된 이벤트 객체 반환
                    return {
                        id: event.id || "unknown",
                        mainImage: "/path/to/default-image.jpg",
                        title: "삭제된 이벤트",
                        host: "알 수 없는 호스트",
                        hostId: "unknown",
                        hostProfileImage: "",
                        participants: 0,
                        maxParticipants: 0,
                        hasReviewed: false,
                        isDeleted: true
                    };
                }
            })
        );
        likedEvents.value = mappedLikedEvents;
    } catch (error) {
        console.error("Error fetching events:", error);
    }
};

// Participants 총합 계산 함수
const getParticipantsTotal = () => {
    return hostEvents.value.reduce(
        (total, event) => total + (event.participants || 0),
        0
    );
};

// mounted 훅
onMounted(() => {
    const wantShowUserId = window.location.pathname.split("/").pop(); // Extract event ID from URL
    getUser(wantShowUserId);
    getAverageRating(wantShowUserId); // 평균 평점 가져오기
    fetchAllEvents(); // 디폴트 탭 데이터
});
</script>

<!-- css -->

<style scoped>
/* 부트스트랩 요소 세팅 */
.row {
    width: 100%;
    justify-self: center;
}

a {
    color: unset;
    text-decoration: none;
}

/* 공통 스타일 */
.mypage-con {
    padding: 75px 150px;
}

/* 프로필 카드 */
.profile-box {
    background-color: #f6f7f8;
    border: 1px solid #d7d8d8;
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 15px;
    text-align: center;
}

.profile-img {
    background-size: cover;
    background-position: center;
    height: 200px;
    width: 200px;
    margin: 0 auto;
    border-radius: 50%;
    text-align: center;
    fill-opacity: 0.5;
}

.profile-img.hover-enabled:hover {
    filter: brightness(0.8);
}

.profile-img img {
    display: none;
    transition: all 0.3s ease;
    filter: none;
}

.profile-img:hover img {
    display: block;
    padding: 45px 50px;
    filter: none;
}

.profile-name {
    font-size: 22px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 0px;
}

.profile-info {
    font-size: 14px;
    color: #777;
    margin: 5px 0;
}

/* 호스트 정보 */
.host-info {
    text-align: center;
}

.host-info-num {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin: 0px;
}

.host-info-text {
    font-size: 14px;
    color: #555;
    margin: 0px;
}

/* 이벤트 카드 */
.events-box {
    background-color: #f6f7f8;
    border: 1px solid #d7d8d8;
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
}

.box-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
}

.mp-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    transition: box-shadow 0.3s ease;
}

.mp-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mp-event-img {
    background-size: cover;
    background-position: center;
    border-radius: 8px;
}

.mp-event-title {
    font-size: 18px;
    margin-top: 10px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mp-event-host {
    font-size: 14px;
    color: #777;
    margin-top: 30px;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mp-host-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 5px;
}

.stars-container {
    color: #ffd700;
    margin-top: 10px;
    gap: 1px;
    cursor: pointer;
}

.review-btn {
    background-color: #ccc;
    color: white;
    border: none;
    border-radius: 1px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 20px;
    white-space: nowrap;
    display: inline-block;
}

.review-btn.completed {
    color: gray;
    cursor: not-allowed;
}
.deleted-event {
    background-color: #f8f8f8;
    border: 1px dashed #ccc;
}

.deleted-text {
    color: #999;
    font-style: italic;
}

/* 반응형 스타일 */
@media screen and (max-width: 768px) {
    .mypage-con {
        padding: 20px;
        margin-top: 50px;
    }

    .profile-img {
        height: 150px;
        width: 150px;
    }

    .profile-img img {
        padding: 22px;
    }

    .profile-img img:hover {
        padding: 22px;
    }

    .box-title {
        font-size: 18px;
    }

    .mp-event-title {
        font-size: 14px;
    }

    .review-btn {
        font-size: 12px;
        padding: 4px 8px;
        margin-left: 10px;
    }

    .review-btn.completed {
        font-size: 12px;
        padding: 4px 8px;
    }
}
</style>

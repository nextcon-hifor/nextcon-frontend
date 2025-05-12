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
                            v-for="event in pagedHostEvents"
                            :key="event.id"
                            
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
                <!-- 🔽 페이지네이션 버튼 추가 -->
                    <div class="pagination">
                        <button @click="hostPage--" :disabled="hostPage === 1">Prev</button>
                        <span>{{ hostPage }} / {{ hostTotalPages }}</span>
                        <button @click="hostPage++" :disabled="hostPage === hostTotalPages">Next</button>
                    </div>
                </div>

                <!-- Joined Events -->
                <div class="events-box">
                    <p class="box-title">Joined Event</p>
                    <div class="row">
                        <div
                            class="col-md-6 col-sm-12"
                            v-for="event in pagedJoinedEvents"
                            :key="event.id"
                            
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
                                            <!-- 리뷰 버튼-->
                                            <div class="review-button-container" v-if="!event.isDeleted">
                                            <!-- 1. 본인이 주최한 이벤트가 아니고, 리뷰 작성 가능한 경우 (파란색) -->
                                                <router-link
                                                    v-if="currentUserId === wantShowUserId && 
                                                        !event.hasReviewed && 
                                                        event.hostId !== currentUserId"
                                                    :to="`/reviewEvent/${event.id}`"
                                                    class="review-btn available"
                                                    @click.stop
                                                >
                                                    리뷰 작성
                                                </router-link>

                                            <!-- 2. 본인이 주최한 이벤트가 아니고, 리뷰 작성 완료한 경우 (회색) -->
                                            <button
                                                v-else-if="currentUserId === wantShowUserId && 
                                                        event.hasReviewed && 
                                                        event.hostId !== currentUserId"
                                                class="review-btn completed"
                                                disabled
                                                @click.stop
                                            >
                                                리뷰 완료
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div class="pagination">
                        <button @click="joinedPage--" :disabled="joinedPage === 1">Prev</button>
                        <span>{{ joinedPage }} / {{ joinedTotalPages }}</span>
                        <button @click="joinedPage++" :disabled="joinedPage === joinedTotalPages">Next</button>
                    </div>
                </div>

                <!-- Liked Events -->
                <div class="events-box" v-if="currentUserId == wantShowUserId">
                    <p class="box-title">Liked Event</p>
                    <div class="row">
                        <div
                            class="col-md-6 col-sm-12"
                            v-for="event in pagedLikedEvents"
                            :key="event.id"
                            
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
                                            <!-- 리뷰 버튼 - 참여 여부에 상관없이 모든 좋아요한 이벤트에 표시 -->
                                            <div class="review-button-container" v-if="!event.isDeleted">
                                                <!-- 본인이 주최한 이벤트가 아니고, 리뷰 작성 가능한 경우 (파란색) -->
                                                <router-link
                                                    v-if="currentUserId === wantShowUserId && 
                                                        !event.hasReviewed && 
                                                        event.hostId !== currentUserId"
                                                    :to="`/reviewEvent/${event.id}`"
                                                    class="review-btn available"
                                                    @click.stop
                                                >
                                                    리뷰 작성
                                                </router-link>

                                                <!-- 본인이 주최한 이벤트가 아니고, 리뷰 작성 완료한 경우 (회색) -->
                                                <button
                                                    v-else-if="currentUserId === wantShowUserId && 
                                                            event.hasReviewed && 
                                                            event.hostId !== currentUserId"
                                                    class="review-btn completed"
                                                    disabled
                                                    @click.stop
                                                >
                                                    리뷰 완료
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div class="pagination">
                        <button @click="likedPage--" :disabled="likedPage === 1">Prev</button>
                        <span>{{ likedPage }} / {{ likedTotalPages }}</span>
                        <button @click="likedPage++" :disabled="likedPage === likedTotalPages">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, reactive, ref, computed } from "vue";
import axios from "axios";

const store = useStore();
const currentUserId = ref(store.state.userId);
const wantShowUserId = window.location.pathname.split("/").pop();
const fileInput = ref(null);

const user = reactive({
    userId: "",
    username: "",
    dob: "",
    gender: "",
    age: 0,
    nationality: "",
    profileImage: "/profile-images/default-profile-image.png",
    averageRating: 0,
});

const triggerFileInput = () => {
    if (fileInput.value) fileInput.value.click();
};

const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/user/uploadProfileImage/${user.userId}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            }
        );

        if (response.data.imageUrl) {
            user.profileImage = response.data.imageUrl;
        } else {
            console.warn("No image URL returned from the server.");
        }
    } catch (error) {
        console.error("Failed to upload profile image:", error);
    }
};

const getUser = async (userId) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/user/getUser/${userId}`,
            { withCredentials: true }
        );
        const userData = response.data;

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
            `${import.meta.env.VITE_API_BASE_URL}/reviews/host/${userId}/average`,
            { withCredentials: true }
        );
        user.averageRating = ratingResponse.data.average || 0;
    } catch (error) {
        console.error("Failed to fetch average rating: ", error);
    }
};
const pageSize = 6;
const hostPage = ref(1);
const joinedPage = ref(1);
const likedPage = ref(1);
const hostTotalPages = computed(() => Math.ceil(hostEvents.value.length / pageSize));
const joinedTotalPages = computed(() => Math.ceil(participatedEvents.value.length / pageSize));
const likedTotalPages = computed(() => Math.ceil(likedEvents.value.length / pageSize));
const pagedHostEvents = computed(() => {
    const start = (hostPage.value - 1) * pageSize;
    return hostEvents.value.slice(start, start + pageSize);
});

const pagedJoinedEvents = computed(() => {
    const start = (joinedPage.value - 1) * pageSize;
    return participatedEvents.value.slice(start, start + pageSize);
});

const pagedLikedEvents = computed(() => {
    const start = (likedPage.value - 1) * pageSize;
    return likedEvents.value.slice(start, start + pageSize);
});
// 예: 탭 전환 시 페이지 번호 초기화 함수
const resetPagination = () => {
  hostPage.value = 1;
  joinedPage.value = 1;
  likedPage.value = 1;
};
const hostEvents = ref([]);
const participatedEvents = ref([]);
const likedEvents = ref([]);

const mapEventData = async (event) => {
    try {
        let hostProfileImage = "";
        try {
            const hostResponse = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/user/getUser/${event.createdBy?.userId || "unknown"}`,
                { withCredentials: true }
            );
            hostProfileImage = hostResponse.data.profileImage || "";
        } catch (hostError) {
            console.warn("호스트 정보를 가져오는데 실패했습니다:", hostError);
        }

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
        }
        // 정렬에 사용할 시간을 설정
        let eventDateTime;
        
        // 다양한 날짜/시간 필드 조합 시도
        if (event.date && event.time) {
            // 표준 포맷 확인 (YYYY-MM-DD 및 HH:MM)
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            const timePattern = /^\d{2}:\d{2}(:\d{2})?$/;
            
            if (datePattern.test(event.date) && timePattern.test(event.time)) {
                eventDateTime = new Date(`${event.date}T${event.time}`);
            }
        }
        
        // 다른 가능한 날짜 속성들 확인
        if (!eventDateTime || isNaN(eventDateTime.getTime())) {
            if (event.eventDate && event.eventTime) {
                eventDateTime = new Date(`${event.eventDate}T${event.eventTime}`);
            } else if (event.startDate && event.startTime) {
                eventDateTime = new Date(`${event.startDate}T${event.startTime}`);
            } else if (event.updatedAt) {
                eventDateTime = new Date(event.updatedAt);
            } else if (event.createdAt) {
                eventDateTime = new Date(event.createdAt);
            } else {
                // 날짜 정보가 없는 경우 현재 시간 사용
                eventDateTime = new Date();
            }
        }
        
        // 날짜가 유효한지 검증 (Invalid Date 방지)
        const dateTimeValue = !isNaN(eventDateTime.getTime()) 
            ? eventDateTime.getTime() 
            : new Date().getTime();
            
        // 디버깅 로그
        console.log(`Event ID: ${event.id}, Title: ${event.name}, DateTime: ${eventDateTime}, 
            Raw date: ${event.date}, Raw time: ${event.time}`);
        return {
            id: event.id,
            mainImage: event.mainImage || "/path/to/user-image.jpg",
            title: event.name || "삭제된 이벤트",
            host: event.createdBy?.username || "알 수 없는 호스트",
            hostId: event.createdBy?.userId || "unknown",
            hostProfileImage,
            participants: event.participants || 0,
            maxParticipants: event.maxParticipants || 0,
            hasReviewed,
            isDeleted: !event.name,
            // 원본 날짜/시간 필드들
            date: event.date || event.eventDate || event.startDate || "",
            time: event.time || event.eventTime || event.startTime || "",
            // 가공된 정렬용 시간값
            dateTime: dateTimeValue,
            // 디버깅용 필드
            dateTimeStr: eventDateTime.toString(),
            createdAt: event.createdAt || new Date().toISOString(),
            updatedAt: event.updatedAt || event.createdAt || new Date().toISOString()
        };
    } catch (error) {
        console.error("Error in mapEventData:", error);
        return {
            id: event.id || "unknown",
            mainImage: "/path/to/user-image.jpg",
            title: "삭제된 이벤트",
            host: "알 수 없는 호스트",
            hostId: "unknown",
            hostProfileImage: "",
            participants: 0,
            maxParticipants: 0,
            hasReviewed: false,
            isDeleted: true,
            dateTime: new Date().getTime(),
            dateTimeStr: new Date().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }
};

// 개선된 정렬 함수
const sortEventsByDate = (events) => {
    console.log("정렬 전 이벤트:", events.map(e => ({ id: e.id, title: e.title, dateTime: e.dateTimeStr })));
    
    // 더 안정적인 정렬 함수
    const sorted = [...events].sort((a, b) => {
        // 기본 정렬 기준: dateTime (timestamp)
        if (a.dateTime && b.dateTime) {
            return b.dateTime - a.dateTime;
        }
        
        // dateTime이 없으면 updatedAt 기준
        if (a.updatedAt && b.updatedAt) {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        }
        
        // 마지막으로 createdAt 기준
        if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        
        // 정렬 기준이 없으면 순서 유지
        return 0;
    });
    
    console.log("정렬 후 이벤트:", sorted.map(e => ({ id: e.id, title: e.title, dateTime: e.dateTimeStr })));
    return sorted;
};

const fetchAllEvents = async () => {
    try {
        // 페이지네이션 초기화
        resetPagination();
       
        const hostResponse = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/events/getEventsByHostId/${wantShowUserId}`,
            { withCredentials: true }
        );

        hostEvents.value = await Promise.all(
            hostResponse.data.map(async (event) => {
                const mappedEvent = await mapEventData(event);
                try {
                    const ratingResponse = await axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/reviews/event/${event.id}`,
                        { withCredentials: true }
                    );
                    const ratings = ratingResponse.data.map((review) => review.rating);
                    const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
                    mappedEvent.averageRating = ratings.length ? (totalRating / ratings.length).toFixed(1) : "리뷰 없음";
                } catch (error) {
                    console.warn("리뷰 데이터 가져오기 실패:", error);
                    mappedEvent.averageRating = "리뷰 없음";
                }
                return mappedEvent;
            })
        );
        hostEvents.value = sortEventsByDate(hostEvents.value);

        const participatedResponse = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/participants/getParticipatedEvent/${wantShowUserId}`,
            { withCredentials: true }
        );
        // 서버 응답 로깅
        console.log("서버에서 받은 참여 이벤트:", participatedResponse.data);
        participatedEvents.value = await Promise.all(
            participatedResponse.data.map(async (event) => await mapEventData(event))
        );
            participatedEvents.value = sortEventsByDate(participatedEvents.value);

        const likedResponse = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/events/getLikedEvent/${wantShowUserId}`,
            { withCredentials: true }
        );
        // 서버 응답 로깅
        console.log("서버에서 받은 좋아요 이벤트:", likedResponse.data);
        const mappedLikedEvents = await Promise.all(
            likedResponse.data.map(async (event) => {
                try {
                    return await mapEventData(event);
                } catch (error) {
                    console.warn(`이벤트 ID ${event.id} 매핑 중 오류:`, error);
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
                        isDeleted: true,
                        dateTime: new Date().getTime(),
                        createdAt: new Date().toISOString(),
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
                }
            })
        );
        likedEvents.value = sortEventsByDate(mappedLikedEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
    }
};

const getParticipantsTotal = () => {
    return hostEvents.value.reduce(
        (total, event) => total + (event.participants || 0),
        0
    );
};

onMounted(() => {
    const wantShowUserId = window.location.pathname.split("/").pop();
    getUser(wantShowUserId);
    getAverageRating(wantShowUserId);
    fetchAllEvents();
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
    position: relative;
}

.mp-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mp-event-img {
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    transition: opacity 0.3s ease;
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
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 20px;
  white-space: nowrap;
  display: inline-block;
  transition: background-color 0.2s, color 0.2s;
  position: relative;
  z-index: 10;
}
/* 리뷰 작성 가능 버튼 (파란색) */
.review-btn.available {
  background-color: #4457ff;
  color: white;
}

.review-btn.available:hover {
  background-color: #3346d3;
}

/* 리뷰 작성 완료 버튼 (회색) */
.review-btn.completed {
  background-color: #ccc;
  color: gray;
  cursor: not-allowed;
}

/* 버튼 컨테이너 */
.review-button-container {
  margin-top: 5px;
  position: relative;
  z-index: 5;
}
.deleted-event {
    background-color: #f8f8f8;
    border: 1px dashed #ccc;
}

.deleted-text {
    color: #999;
    font-style: italic;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination button {
  background-color: #f6f7f8;
  border: 1px solid #d7d8d8;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination button:hover:not([disabled]) {
  background-color: #e0e0e0;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  font-size: 14px;
  color: #555;
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
        font-size: 12px;
    }
    .mp-event-img {
    min-height: 80px;
  }
    .review-btn {
        margin-left: 0;
        margin-top: 5px;
        font-size: 11px;
        padding: 3px 6px;
    }

    .review-btn.completed {
        font-size: 12px;
        padding: 4px 8px;
    }
    
}
</style>

<template>
  <div class="mypage-con">
    <div class="row">
      <!-- 좌측 프로필 영역 -->
      <div class="col-lg-4 col-md-12">
        <div class="profile-box">
          <div class="profile-img" @click="triggerFileInput"
            :class="{ 'hover-enabled': currentUserId === wantShowUserId }"
            :style="{ backgroundImage: `url(${user.profileImage})` }">
            <input v-if="currentUserId === wantShowUserId" type="file" ref="fileInput" accept="image/*"
              @change="handleFileChange" style="display: none" />
            <img v-if="currentUserId === wantShowUserId" src="/assets/img/icon_UserCamera.png" alt="">
          </div>

          <p class="profile-name">{{ user.username }}</p>
          <p class="profile-info">{{ user.nationality }}, {{ user.gender }}, {{ user.age }}</p>
        </div>
        <div class="profile-box">
          <div class="row">
            <div class="col-6 host-info">
              <p class="host-info-num">{{ hostEvents.length }}</p>
              <p class="host-info-text">Events Hosted</p>
            </div>
            <div class="col-6 host-info">
              <p class="host-info-num">{{ getParticipantsTotal() }}</p>
              <p class="host-info-text">Total Attendees</p>
            </div>
          </div>
          <div class="stars-container">
            <span v-for="star in 5" :key="star" @click="goToSeeReviews">
              <i :class="star <= user.averageRating ? 'fas fa-star' : 'far fa-star'" style="font-size: 24px;"></i>
            </span> <!--event.rate-->
            <span class="host-info-text" style="margin-left: 10px; font-size: 16px; color: #555;">
              {{ user.averageRating }} <!--event.rate.toFixed(1)-->
            </span>
          </div>
        </div>
      </div>

      <!-- 우측 이벤트 영역 -->
      <div class="col-lg-8 col-md-12">
        <!-- Reviews Section -->
        <div class="events-box">
          <p class="box-title">Reviews about Host's Events</p>
          <div v-if="reviews.length === 0" class="no-reviews">
            No reviews yet
          </div>
          <div v-for="review in reviews" :key="review.id" class="review-card">
            <div class="review-header">
              <router-link :to="`/userPage/${review.user.userId}`" class="reviewer-info">
                <img :src="review.user.profileImage || '/profile-images/default-profile-image.png'"
                  class="reviewer-img">
                <span class="reviewer-name">{{ review.user.username }}</span>
              </router-link>
              <div class="review-rating">
                <span v-for="star in 5" :key="star">
                  <i :class="star <= review.rating ? 'fas fa-star' : 'far fa-star'"></i>
                </span>
                <span class="rating-value">{{ review.rating }}</span>
              </div>
            </div>
            <div class="review-content">
              {{ removeHTML(review.comment) }}
            </div>
            <div class="review-footer">
              <div class="review-date">{{ formatDate(review.createdAt) }}</div>
              <div class="review-event">
                <router-link :to="`/events/${review.eventId}`">Event: {{ review.eventName }}</router-link>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';

const store = useStore();
const currentUserId = ref(store.state.userId);
const wantShowUserId = window.location.pathname.split('/').pop(); // Extract event ID from URL
const fileInput = ref(null); // file input 요소에 대한 참조

const user = reactive({
  userId: '',
  username: '',
  dob: '',
  gender: '',
  age: 0,
  nationality: '',
  profileImage: '/profile-images/default-profile-image.png', // 정적 경로로 설정
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
      `${import.meta.env.VITE_API_BASE_URL}/user/uploadProfileImage/${user.userId}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }, // 파일 업로드를 위한 헤더 설정
        withCredentials: true, // 인증 정보를 포함
      }
    );


    // 서버에서 반환된 이미지 URL로 업데이트
    if (response.data.imageUrl) {
      user.profileImage = response.data.imageUrl; // 서버에서 반환된 경로 사용
    } else {
      console.warn('No image URL returned from the server.');
    }
  } catch (error) {
    console.error('Failed to upload profile image:', error);
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
    user.userId = userData.userId || '';
    user.email = userData.email || '';
    user.username = userData.username || '';
    user.dob = userData.dob || '';
    user.gender = userData.gender || '';
    user.age = userData.age || 0;
    user.university = userData.university || '';
    user.phoneNumber = userData.phoneNumber || '';
    user.nationality = userData.nationality || '';
    user.profileImage = userData.profileImage || '';
  } catch (error) {
    console.error('Failed to fetch user:', error);
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
    console.error('Failed to fetch average rating: ', error);
  }
}


// 탭별 이벤트 데이터
const hostEvents = ref([]);
const participatedEvents = ref([]);
const likedEvents = ref([]);

// 공통 매핑 함수
const mapEventData = event => ({
  id: event.id,
  mainImage: event.mainImage,
  title: event.name,
  host: event.createdBy?.username,
  hostId: event.createdBy?.userId,
  participants: event.participants,
  maxParticipants: event.maxParticipants,
});

// 이벤트 데이터 가져오기
const fetchAllEvents = async () => {
  try {
    // Host 이벤트 가져오기
    const hostResponse = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/events/getEventsByHostId/${wantShowUserId}`,
      { withCredentials: true }
    );
    hostEvents.value = hostResponse.data.map(mapEventData);

    // Participated 이벤트 가져오기
    const participatedResponse = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/participants/getParticipatedEvent/${wantShowUserId}`,
      { withCredentials: true }
    );
    participatedEvents.value = participatedResponse.data.map(mapEventData);

    // Liked 이벤트 가져오기
    const likedResponse = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/events/getLikedEvent/${wantShowUserId}`,
      { withCredentials: true }
    );
    likedEvents.value = likedResponse.data.map(mapEventData);
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};


// Participants 총합 계산 함수
const getParticipantsTotal = () => {
  return hostEvents.value.reduce((total, event) => total + (event.participants || 0), 0);
};

const reviews = ref([]);
// Date 형식 맞추는 함수수
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
// Function to fetch reviews for a host
const fetchHostReviews = async (userId) => {
  try {
    // 유저가 개최한 모든 이벤트 가져오기
    const hostResponse = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/events/getEventsByHostId/${userId}`,
      { withCredentials: true }
    );

    const hostedEvents = hostResponse.data;
    let allReviews = [];

    // 각 이벤트에 대해 리뷰 가져오기기
    for (const event of hostedEvents) {
      try {
        const reviewsResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/reviews/event/${event.id}`,
          { withCredentials: true }
        );

        // 이벤트 이름을 붙이고 리뷰 데이터 매핑
        const eventReviews = reviewsResponse.data.map(review => ({
          ...review,
          eventId: event.id,
          eventName: event.name
        }));

        allReviews = [...allReviews, ...eventReviews];
      } catch (error) {
        console.error(`Error fetching reviews for event ${event.id}:`, error);
      }
    }

    // 최신순 정렬렬
    allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    reviews.value = allReviews;
  } catch (error) {
    console.error('Error fetching host reviews:', error);
  }
};

// HTML 태그 제거 함수
const removeHTML = (html) => {
  if (!html) return '';

  return html.replace(/<\/?[^>]+(>|$)/g, '');
}

// mounted 훅
onMounted(() => {

  const wantShowUserId = window.location.pathname.split('/').pop(); // Extract event ID from URL
  getUser(wantShowUserId);
  getAverageRating(wantShowUserId); // 평균 평점 가져오기
  fetchAllEvents(); // 디폴트 탭 데이터
  fetchHostReviews(wantShowUserId); // 리뷰 데이터 가져오기기
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
  color: #FFD700;
  margin-top: 10px;
  gap: 1px;
}

/* 리뷰 디자인 추가 */
.review-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.reviewer-info {
  display: flex;
  align-items: center;
}

.reviewer-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.reviewer-name {
  font-weight: bold;
}

.review-rating {
  color: #FFD700;
}

.rating-value {
  margin-left: 5px;
  color: #333;
  font-weight: bold;
}

.review-content {
  margin: 10px 0;
  white-space: pre-line;
  color: #555;
}

.review-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.9em;
  color: #777;
}

.no-reviews {
  text-align: center;
  padding: 20px;
  color: #777;
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
}
</style>

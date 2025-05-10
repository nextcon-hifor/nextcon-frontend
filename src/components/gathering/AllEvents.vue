<template>

  <div class="Web">
    <div class="home-banner">
      <!-- 메인 -->
      <p class="banner-title">
        Start real Korean Life <br>
        from the <span style="color: #58C3FF;">HiFor.</span>
      </p>

      <!-- 검색바 -->
      <div class="search-box">
        <form class="search-form" @submit.prevent="searchEvents">
          <div class="row search-bar">
            <!-- Search Text -->
            <div class="col-6 search-text">
              <button type="submit">
                <img src="/assets/img/icons_search.png" alt="">
              </button>
              <input type="text" class="search-text-box" v-model="searchQuery" placeholder="Search...">
            </div>

            <!-- Search Date -->
            <div class="col-2 search-date">
              <input type="date" v-model="searchDate">
            </div>

            <!-- Search Location -->
            <div class="col-2 search-location">
              <select v-model="searchLocation">
                <option value="" selected disabled hidden>Location</option>
                <option value="Jongno-gu">Jongno-gu</option>
                <option value="Jung-gu">Jung-gu</option>
                <option value="Yongsan-gu">Yongsan-gu</option>
                <option value="Seongdong-gu">Seongdong-gu</option>
                <option value="Gwangjin-gu">Gwangjin-gu</option>
                <option value="Dongdaemun-gu">Dongdaemun-gu</option>
                <option value="Jungnang-gu">Jungnang-gu</option>
                <option value="Seongbuk-gu">Seongbuk-gu</option>
                <option value="Gangbuk-gu">Gangbuk-gu</option>
                <option value="Dobong-gu">Dobong-gu</option>
                <option value="Nowon-gu">Nowon-gu</option>
                <option value="Eunpyeong-gu">Eunpyeong-gu</option>
                <option value="Seodaemun-gu">Seodaemun-gu</option>
                <option value="Mapo-gu">Mapo-gu</option>
                <option value="Yangcheon-gu">Yangcheon-gu</option>
                <option value="Gangseo-gu">Gangseo-gu</option>
                <option value="Guro-gu">Guro-gu</option>
                <option value="Geumcheon-gu">Geumcheon-gu</option>
                <option value="Yeongdeungpo-gu">Yeongdeungpo-gu</option>
                <option value="Dongjak-gu">Dongjak-gu</option>
                <option value="Gwanak-gu">Gwanak-gu</option>
                <option value="Seocho-gu">Seocho-gu</option>
                <option value="Gangnam-gu">Gangnam-gu</option>
                <option value="Songpa-gu">Songpa-gu</option>
                <option value="Gangdong-gu">Gangdong-gu</option>
                <option value="etc">etc</option>
              </select>
            </div>

            <!-- Search Type -->
            <div class="col-2 search-type">
              <select v-model="searchType">
                <option value="" selected disabled hidden>Event Type</option>
                <option value="FirstCome">First come</option>
                <option value="Register">Register</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <!-- 카테고리 분류 -->
      <div class="category-row">
        <p class="title">Categories</p>
        <div class="row">
          <div
              class="col category-box"
              v-for="category in categories"
              :key="category.name"
              @click="fetchEventsByCategory(category.name)"
          >
            <img :src="category.icon" :alt="category.name" />
            <p>{{ category.displayName }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- All Events -->
    <div class="events-container hot-event">
      <div class="row">
        <p class="hot-event-title">Events</p>
        <select class="event-sort" v-model="selectedSort" @change="handleSortChange">
          <option disabled hidden value="">Sort</option>
          <option value="Latest">Latest</option>
          <option value="Hot">Hot</option>
          <option value="Upcoming">Upcoming</option>
        </select>
      </div>
      <!-- Event Cards -->
      <div class="row cards-grid">
        <div class="col-4" v-for="event in visibleEvents" :key="event.id">
          <EventCard :event="event" />
        </div>
      </div>

      <!-- 페이지네이션 버튼 -->
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>

  </div>

  <div class="Mobile">
    <div class="m-banner">

      <!-- 배너 Title -->
      <div class="m-banner-title">
        Start real <br> 
        Korean Life <br>
        from the <span style="color: #58C3FF;">HiFor.</span>
      </div>

      <div class="m-search-box">
        <!-- 검색어 -->
        <input type="text" class="search-text-box" v-model="searchQuery" placeholder="Search...">
        <!-- 지역 -->
        <select v-model="searchLocation">
          <option value="" selected disabled hidden>Location</option>
          <option value="Jongno-gu">Jongno-gu</option>
          <option value="Jung-gu">Jung-gu</option>
          <option value="Yongsan-gu">Yongsan-gu</option>
          <option value="Seongdong-gu">Seongdong-gu</option>
          <option value="Gwangjin-gu">Gwangjin-gu</option>
          <option value="Dongdaemun-gu">Dongdaemun-gu</option>
          <option value="Jungnang-gu">Jungnang-gu</option>
          <option value="Seongbuk-gu">Seongbuk-gu</option>
          <option value="Gangbuk-gu">Gangbuk-gu</option>
          <option value="Dobong-gu">Dobong-gu</option>
          <option value="Nowon-gu">Nowon-gu</option>
          <option value="Eunpyeong-gu">Eunpyeong-gu</option>
          <option value="Seodaemun-gu">Seodaemun-gu</option>
          <option value="Mapo-gu">Mapo-gu</option>
          <option value="Yangcheon-gu">Yangcheon-gu</option>
          <option value="Gangseo-gu">Gangseo-gu</option>
          <option value="Guro-gu">Guro-gu</option>
          <option value="Geumcheon-gu">Geumcheon-gu</option>
          <option value="Yeongdeungpo-gu">Yeongdeungpo-gu</option>
          <option value="Dongjak-gu">Dongjak-gu</option>
          <option value="Gwanak-gu">Gwanak-gu</option>
          <option value="Seocho-gu">Seocho-gu</option>
          <option value="Gangnam-gu">Gangnam-gu</option>
          <option value="Songpa-gu">Songpa-gu</option>
          <option value="Gangdong-gu">Gangdong-gu</option>
          <option value="etc">etc</option>
        </select>
        <!-- 이벤트 타입 -->
        <select v-model="searchType">
          <option value="" selected disabled hidden>Event Type</option>
          <option value="FirstCome">First come</option>
          <option value="Register">Register</option>
        </select>
        <!-- 검색버튼 -->
        <button type="submit">
          Search
        </button>
      </div>

      <!-- 카테고리 -->
      <div class="category-row">
        <p class="m-title">
          <span style="color: #FFFFFF;">Categories</span>
        </p>
        <div class="category-scroll-container" @wheel="handleScroll">
          <div class="category-box" v-for="category in categories" :key="category.name" @click="fetchEventsByCategory(category.name)">
            <img :src="category.icon" :alt="category.name" />
            <p>{{ category.displayName }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- All Events -->
    <div class="m-events-container">
      <div class="m-box">
        <p class="m-title">
          Events
          <select class="m-event-sort" v-model="selectedSort" @change="handleSortChange">
            <option disabled hidden value="">Sort</option>
            <option value="Latest">Latest</option>
            <option value="Hot">Hot</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </p>
      </div>
      <!-- Event Cards -->
      <div class="m-card-box">
        <div class="m-card" v-for="event in visibleEvents" :key="event.id">
          <EventCard :event="event" />
        </div>
      </div>
      <!-- 페이지네이션 버튼 -->
      <div class="m-pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>

  </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
//import { useStore } from 'vuex';
import axios from 'axios';
import EventCard from '../gathering/EventCard.vue'; // EventCard 컴포넌트 가져오기


const events = ref([]); // 이벤트 데이터

const selectedSort = ref(''); // 선택된 정렬 값

// 🔹 정렬 옵션 변경 시 실행되는 함수
const handleSortChange = () => {
  if (selectedSort.value === 'Latest') {
    fetchAllEvents();
  } else if (selectedSort.value === 'Hot') {
    fetchHotEvents();
  } else if (selectedSort.value === 'Upcoming') {
    fetchUpcomingEvents();
  }
};

// 상태 관리
const currentPage = ref(1);
const itemsPerPage = 12;
const totalItems = computed(() => events.value.length);

const categories = ref([
  { name: "All", displayName: "ALL", icon: "/assets/img/icon_All.png" },
  { name: "Social", displayName: "SOCIAL", icon: "/assets/img/icon_Social.png" },
  { name: "Food", displayName: "FOOD", icon: "/assets/img/icon_Food.png" },
  { name: "Games", displayName: "GAMES", icon: "/assets/img/icon_Games.png" },
  { name: "Learning", displayName: "LEARNING", icon: "/assets/img/icon_Growth.png" },
  { name: "Activities", displayName: "ACTIVITIES", icon: "/assets/img/icon_Sports.png" },
  { name: "Trip", displayName: "TRIP", icon: "/assets/img/icon_Trip.png" },
  { name: "Art/Fasion", displayName: "ART/FASHION", icon: "/assets/img/icon_ArtFasion.png" },
  { name: "Others", displayName: "OTHERS", icon: "/assets/img/icon_Others.png" },
]);

// 계산된 속성
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / itemsPerPage)));
const visibleEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return events.value.slice(start, end); // 현재 페이지에 해당하는 이벤트만 반환
});

// 메서드
// const isCardVisible = (index) => {
//   const start = (currentPage.value - 1) * itemsPerPage + 1;
//   const end = start + itemsPerPage - 1;
//   return index >= start && index <= end;
// };
//검색
const searchQuery = ref(''); // 제목 검색어
const searchDate = ref(''); // 날짜
const searchLocation = ref(''); // 위치
const searchType = ref(''); // 모집 유형

const mapEventData = (event) => ({
  id: event.id,
  mainImage: event.mainImage,
  title: event.name,
  date: event.date,
  location: event.location,
  category: event.category,
  type: event.type,
  participants: {
    current: event.participants ?? 0, // 현재 참가자 수
    max: event.maxParticipants, // 최대 참가자 수
  },
  likes: event.likes, // 좋아요 수
});


// 통합된 fetchEvents 함수
const fetchEvents = async (fetchType, params = {}) => {
  try {
    const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/events`,
        {
          params: { fetchType, ...params }, // type을 쿼리 파라미터에 추가
          withCredentials: true, // 인증 정보를 포함
        }
    );

    const mappedEvents = response.data.map(mapEventData);
    
    // Filter out past events unless specifically requested otherwise
    return fetchType === 'all-including-past' 
      ? mappedEvents 
      : filterFutureEvents(mappedEvents);
  } catch (error) {
    console.error(`Failed to fetch events for type "${fetchType}":`, error);
    return []; // 에러 시 빈 배열 반환
  }
};

// 모든 이벤트 가져오기
const fetchAllEvents = async () => {
  events.value = await fetchEvents('all');
};

const fetchHotEvents = async () => {
  console.log('🔥 Fetching hot events...');
  events.value = await fetchEvents('hot');

  // 만약 데이터가 섞이면 다시 정렬
  events.value.sort((a, b) => b.likes - a.likes);

  console.log('🔥 Sorted Events in Frontend (After Re-Sort):', events.value);
};

const fetchUpcomingEvents = async () => {
  events.value = await fetchEvents('upcoming');
};

// 검색 이벤트 가져오기
const searchEvents = async () => {
  const params = {
    query: searchQuery.value || undefined,
    date: searchDate.value || undefined,
    location: searchLocation.value || undefined,
    type: searchType.value || undefined,
  };
  events.value = await fetchEvents('search', params);
  currentPage.value =1;
};

// 카테고리별 이벤트 가져오기
const fetchEventsByCategory = async (category) => {
  events.value = await fetchEvents('category', { category });
};


const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

onMounted(async () => {
  await fetchAllEvents(); // 모든 이벤트 가져오기
});
const filterFutureEvents = (eventsList) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
  
  return eventsList.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today;
  });
};

</script>



<!-- css -->
  <style scoped>
  /* 반응형 설정 */
@media screen and (max-width: 768px) {
  .Web { display: none; }
  .Mobile { display: block; }

  /* banner */
  .m-banner{
    background-image: url('/assets/img/img_HomeBanner.png');
    background-size: cover;
    background-position: center;
    height: 650px;
    padding-top: 50px;
  }
  .m-banner-title {
    font-size: 40px;
    font-weight: bold;
    color: #FFFFFF;
    padding: 30px;
  }
  .m-search-box{
    padding: 0px 20px;
  }
  .m-search-box input{
    width: 100%;
    color: #FFFFFF;
    font-size: 14px;
    border: 1px solid #777;
    border-radius: 12px;
    padding: 10px;
    background-color: #55555585;
    margin-bottom: 7px;
  }
  .m-search-box input::placeholder{
    color: #FFFFFF;
  }
  .m-search-box select{
    width: 100%;
    color: #FFFFFF;
    font-size: 14px;
    border: 1px solid #777;
    border-radius: 12px;
    padding: 10px;
    background-color: #55555585;
    margin-bottom: 7px;
  }
  .m-search-box button{
    width: 100%;
    color: #FFFFFF;
    font-size: 14px;
    border: 1px solid #777;
    border-radius: 12px;
    padding: 10px;
    background-color: #58c2ff98;
    margin-bottom: 7px;
    transition: all 0.3s ease;
  }
  .m-search-box button:hover{
    background-color: #58c2ff;
  }
  .m-search-box select option {
    background-color: #555;
    color: #FFFFFF;
  }
  
  /* 모바일 드롭다운 스타일 */
  .m-search-box select {
    appearance: none;
  }
  .m-box{
    padding: 0px 30px;
  }
  .m-title{
    font-size: 24px;
    font-weight: 500;
    margin-top: 15px;
    margin-bottom: 5px;
  }
  /* 가로 스크롤 가능하도록 스타일 적용 */
  .category-scroll-container {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    padding: 10px 0;
    scrollbar-width: none; /* Firefox 스크롤바 숨김 */
    -ms-overflow-style: none; /* IE 및 Edge 스크롤바 숨김 */
  }
  .category-scroll-container::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 엣지 스크롤바 숨김 */
  }
  .category-row{
    padding: 15px;
  }
  .category-row .m-title{
    padding: 0px 15px;
  }
  .category-box {
    flex: 0 0 auto;
    width: min-content;
    text-align: center;
    margin: 0 10px;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  .category-box:hover {
    opacity: 1;
    transform: scale(1.1);
  }
  .category-box p{
    color: #FFFFFF;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  .category-scroll-container {
    overflow-x: scroll;
    padding: 5px;
  }
  .category-box img {
    width: 36px;
    height: 36px;
  }
  /* 카드들 */
  .m-events-container .m-title{
    width: max-content;
  }
  .m-event-sort{
    font-size: 14px;
    font-weight: 300;
    color: #555;
    width: min-content;
    border: none;
    padding: 0px;
  }
  /* 페이지네이션 */
  .m-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    margin-bottom: 20px;
  }

  .m-pagination button {
    padding: 4px 8px;
    border: none;
    border-radius: 24px;
    background: #58C3FF;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 20px 0px;
    margin-bottom: 40px;
  }
  .m-pagination span {
    margin: 20px 0px;
    margin-bottom: 40px;
  }

  .m-pagination button:hover {
    background: #5870FF;
  }

  .m-pagination button:disabled {
    background: #ccc;
  }
}

@media screen and (min-width: 769px) {
  .Web { display: block; }
  .Mobile { display: none; }

  /* 배너 */
  .home-banner {
    background-image: url('/assets/img/img_HomeBanner.png');
    background-size: cover;
    background-position: center;
    height: 900px;
  }

  .banner-title {
    font-size: 72px;
    font-weight: bold;
    color: #FFFFFF;
    padding: 120px 150px 30px;
  }

  /* 검색 */
  .search-box {
    max-width: 100%;
    margin: 30px 150px;
    padding: 10px 15px;
    background-color: #FFFFFF69;
    border-radius: 15px;
    text-align: center;
  }

  .search-box button {
    background: none;
    border: none;
  }

  .search-box input{
    background: none;
    border: none;
    color: #FFFFFF;
    height: 42px;
    margin: 0px 5px;
    width: 85%;
  }
  .search-box input::placeholder {
    color: #FFFFFF;
  }

  .search-box select {
    background: none;
    border: none;
    color: #FFFFFF;
    height: 42px;
    margin: 0px 5px;
    width: 10rem;
  }
/* 검색 드롭다운 선택 옵션 스타일 */
  .search-box select option {
    background-color: #555;
    color: #FFFFFF;
  }
  
  /* 날짜 선택기 스타일 */
  .search-date input[type="date"] {
    color-scheme: dark; /* 다크 모드 달력 사용 */
  }
  
  /* 드롭다운이 열렸을 때 보이는 옵션 스타일 */
  .search-location select,
  .search-type select {
    appearance: none; /* 기본 드롭다운 화살표 숨기기 */
  }
  
  /* 드롭다운 화살표 커스텀 스타일 */
  .search-location::after,
  .search-type::after {
    content: "▼";
    position: absolute;
    right: 10px;
    color: white;
    pointer-events: none;
  }
  .search-date input{
    background: url('/assets/img/icon_SearchDate.png') no-repeat right 5px center;
  }
  .search-date input[type="date"]::-webkit-calendar-picker-indicator,
  .search-date input[type="date"]::-webkit-inner-spin-button { opacity: 0; appearance: none; }

  /* 카테고리 */
  .category-row {
    padding: 30px 150px;
    text-align: center;
  }

  .title {
    font-size: 36px;
    font-weight: bold;
    color: #FFFFFF;
    text-align: left;
  }

  .category-box {
    margin: 0px 20px;
    color: #FFFFFF;
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  .category-box:hover {
    opacity: 1;
    border-bottom: 1px solid #FFFFFF;
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  /* 이벤트 섹션 */
  .hot-event {
    margin-top: -210px;
  }

  .hot-event-title {
    font-size: 36px;
    font-weight: bold;
    color: #FFFFFF;
    text-align: left;
    width: min-content;
  }

  .event-sort {
    width: 118px;
    background: none;
    border: none;
    color: #FFFFFF;
    height: 25px;
    margin-top: 20px;
  }

  /* 이벤트 카드 */
  .events-container {
    padding: 30px 150px;
  }

  /* 페이지네이션 */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
  }

  .pagination button {
    padding: 8px 16px;
    border: none;
    border-radius: 24px;
    background: #58C3FF;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .pagination button:hover {
    background: #5870FF;
  }

  .pagination button:disabled {
    background: #ccc;
  }
}
/* 공통 스타일 - 드롭다운 리스트 스타일 */
select option {
  background-color: #333;
  color: white;
  padding: 10px;
}

/* 드롭다운 메뉴 열렸을 때 항목 스타일 */
.search-location select:focus option,
.search-type select:focus option,
.m-search-box select:focus option {
  background-color: #444;
  color: white;
}
  </style>
<template>

  <div class="Web">
    <!-- Title-text -->
    <div class="container">
      <div class="row">
        <div class="col-8">
          <!-- Main banner -->
          <div class="container banner-img-box" :style="{ backgroundImage: `url(${event.mainImage})` }"></div>

          <!-- text section -->
          <div class="gathering-box">
            <p class="gatheing-title">{{ event.name }}</p>
            <div class="gathering-text-box">
              <p class="gathering-text" v-html="event.description"></p>
            </div>
          </div>

          <!-- Gallery section -->
          <div class="gallery-box row">
            <p class="map-title">
              Photo Gallery
            </p>
            <div class="col-6 large-box">
              <img class="large-img" :style="{ backgroundImage: `url(${event.mainImage})` }" alt="">
            </div>
            <div class="col-6">
              <div class="row">
                <div class="col-6 small-box" v-for="(bgImage, index) in imagesToDisplay" :key="index"
                  :style="{ backgroundImage: `url(${bgImage.url})` }"></div>
              </div>
            </div>
          </div>

          <!-- Map section -->
          <div class="map-box">
            <p class="map-title">
              <img src="" alt="">Location
            </p>
            <p class="map-text">{{ event.location }}</p>
            <iframe v-if="iframeUrl" :src="iframeUrl" width="600" height="450" style="border:0;" allowfullscreen=""
              loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

          <!-- Price section -->
          <div class="price-box">
            <p class="price-title">Price</p>
            <p class="price-text">₩ {{ event.price }}</p>
          </div>
        </div>

        <!-- Sticky Card -->
        <div class="col-4">
          <div class="card sticky-card">
            <div class="card-body">
              <button class="btn_like" :class="{ on: isLiked }" @click="toggleLike">like</button>
              <div class="row">
                <div class="col-2 card-date-icon">{{ dateForCalender }}</div>
                <div class="col-10">
                  <p class="s-card-text1">Event Date</p>
                  <p class="s-card-text2">{{ formattedDate }} / {{ event.time }}</p> <!-- 시간정보 넣어주셈 ex.11am or 15:00 -->
                </div>
              </div>
              <div class="row">
                <div class="col-12 p-0">
                  <p class="s-card-text4">
                    <img class="s-card-icon1" src="/assets/img/icon_Heart.png" alt="" />
                    {{ event.likes }}
                  </p>
                </div>
                <div class="col-12 p-0">
                  <p class="s-card-text4">
                    <img class="s-card-icon1" src="/assets/img/icon_User.png" alt="" />
                    {{ event.participants.current }}/{{ event.participants.max }} (Minimun:{{ event.participants.min }})
                  </p>
                </div>
                <div class="col-12 p-0">
                  <p class="s-card-text4">
                    <img class="s-card-icon1" src="/assets/img/icon_Location.png" alt="" />
                    {{ event.location }}
                  </p>
                </div>
                <div class="col-12 p-0">
                  <p class="s-card-text4">
                    <span v-for="star in 5" :key="star">
                      <i :class="star <= 3.5 ? 'fas fa-star' : 'far fa-star'" style="font-size: 24px;"></i>
                    </span> <!--event.rate-->
                    <span class="rating-text" style="margin-left: 10px; font-size: 16px; color: #555;">
                      {{ 3.5 }} <!--event.rate.toFixed(1)-->
                    </span>
                  </p>
                </div>
              </div>
              <div class="row">
                <router-link :to="`/userPage/${event.createdBy.userId}`" class="p-0">
                  <p class="card-host">
                    {{ event.createdBy.username }}
                  </p>
                </router-link>

                <div class="p-0">
                  <router-link :to="`/reviewEvent/${event.id}`">
                    <button class="review-btn">
                      Review
                    </button>
                  </router-link>
                  <!-- 이벤트 생성자이면 Manage 버튼 -->
                  <router-link v-if="event.createdBy.id === userId" :to="`/manage/${event.id}`">
                    <button class="join-btn">
                      Manage
                    </button>
                    <router-link :to="`/deleteEvent/${event.id}`" v-if="event.createdBy.id === userId">
                      <button class="cancel-btn">
                        Cancel
                      </button>
                    </router-link>
                  </router-link>

                  <div v-else>

                    <!-- 사용자가 이벤트 생성자가 아니고, 참여하지 않은 경우 -->
                    <!-- (로그인한 상태이면 router-link 사용) -->
                    <router-link v-if="!isParticipating && userId && isEventJoinable" :to="`/enterEvent/${event.id}`">
                      <button class="join-btn">
                        Join Now!
                      </button>
                    </router-link>

                    <!-- 로그인하지 않은 경우 (userId가 null이면) -->
                    <button v-else-if="!isParticipating && !userId && isEventJoinable" class="join-btn"
                      @click="handleLoginRedirect">
                      Join Now!
                    </button>

                    <!-- 참여한 경우 -->
                    <button v-else-if="isParticipating" class="cancel-btn" @click="handleCancelParticipation">
                      Cancel
                    </button>

                    <!-- 기타 상황: (예, 이벤트 참가 인원이 꽉 찼거나 기간이 지난 경우) -->
                    <button v-else class="closed-join-btn" disabled>
                      Closed
                    </button>
                    <p class="host">
                      <br>
                      Hosted by.
                      <router-link :to="`/userPage/${event.createdBy.id}`" class="p-0">
                        {{ event.createdBy.name }}
                      </router-link>
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="Mobile">

    <!-- Main banner -->
    <div class="m-banner-img-box" :style="{ backgroundImage: `url(${event.mainImage})` }">
      <div class="row">
        <div class="col-8 m-box">
          <div class="col-12 p-0">
            <p class="s-card-text1">
              <img class="s-card-icon1" src="/assets/img/icon_Location.png" alt="" />
              {{ event.location }}
            </p>
          </div>
          <div class="col-12 p-0">
            <p class="s-card-text2">
              <img class="s-card-icon1" src="/assets/img/icon_User.png" alt="" />
              {{ event.participants.current }}/{{ event.participants.max }} (Minimun:{{ event.participants.min }})
            </p>
          </div>
          <div class="col-12 p-0">
            <p class="s-card-text3">
              Event Type
            </p>
          </div>
        </div>
        <div class="col-4">
          <button class="btn_like" :class="{ on: isLiked }" @click="toggleLike">like</button>
        </div>
      </div>
    </div>

    <!-- text section -->
    <div class="m-box">
      <p class="m-gatheing-title">{{ event.name }}</p>
      <div class="m-gathering-text-box">
        <p class="m-gathering-text" v-html="event.description"></p>
      </div>
    </div>

    <!-- Gallery section -->
    <div class="m-box row">
      <p class="m-info-title">
        Photo Gallery
      </p>
      <div class="col-6 m-large-box">
        <img class="m-large-img" :style="{ backgroundImage: `url(${event.mainImage})` }" alt="">
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6 m-small-box" v-for="(bgImage, index) in imagesToDisplay" :key="index"
            :style="{ backgroundImage: `url(${bgImage.url})` }"></div>
        </div>
      </div>
    </div>

    <!-- Map section -->
    <div class="m-box">
      <p class="m-info-title">
        <img src="" alt="">Location
      </p>
      <p class="map-text">{{ event.location }}</p>
      <iframe v-if="iframeUrl" :src="iframeUrl" width="600" height="450" style="border:0;" allowfullscreen=""
        loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <!-- Price section -->
    <div class="m-box">
      <p class="m-info-title">Event Date</p>
      <p class="price-text">{{ formattedDate }} / 15:00</p> <!--시간정보 입력-->
    </div>

    <!-- Price section -->
    <div class="m-box">
      <p class="m-info-title">Price</p>
      <p class="price-text">₩ {{ event.price }}</p>
    </div>

    <!-- card info -->
    <div class="m-box">
      <router-link :to="`/hosts/${event.createdBy.userId}`" class="p-0">
        <p class="card-host">
          {{ event.createdBy.username }}
        </p>
      </router-link>

      <!-- buttons -->
      <div class="p-0 text-center">
        <!-- 이벤트 생성자이면 Manage 버튼 -->
        <router-link v-if="event.createdBy.id === userId" :to="`/manage/${event.id}`">
          <button class="join-btn">
            Manage
          </button>
        </router-link>

        <div v-else>

          <!-- 사용자가 이벤트 생성자가 아니고, 참여하지 않은 경우 -->
          <!-- (로그인한 상태이면 router-link 사용) -->
          <router-link v-if="!isParticipating && userId && isEventJoinable" :to="`/enterEvent/${event.id}`">
            <button class="join-btn">
              Join Now!
            </button>
          </router-link>

          <!-- 로그인하지 않은 경우 (userId가 null이면) -->
          <button v-else-if="!isParticipating && !userId && isEventJoinable" class="join-btn"
            @click="handleLoginRedirect">
            Join Now!
          </button>

          <!-- 참여한 경우 -->
          <button v-else-if="isParticipating" class="cancel-btn" @click="handleCancelParticipation">
            Cancel
          </button>

          <!-- 기타 상황: (예, 이벤트 참가 인원이 꽉 찼거나 기간이 지난 경우) -->
          <button v-else class="closed-join-btn" disabled>
            Closed
          </button>
          <p class="host">
            <br>
            Hosted by.
            <router-link :to="`/userPage/${event.createdBy.id}`" class="p-0">
              {{ event.createdBy.name }}
            </router-link>
          </p>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  name: 'EventDetails',
  setup() {

    const store = useStore();
    const userId = computed(() => store.getters.userId);
    const event = ref({
      id: '',
      description: '', // 빈 문자열로 초기화
      name: '',
      date: '',
      time: '',
      location: '',
      locationDetail: '',
      mainImage: '',
      images: [],
      participants: { current: 0, max: 0, min: 0 },
      category: '',
      type: '',
      likes: 0,
      createdBy: { name: '', id: 0, profileImage: '' },
      price: 0,
      question: '',
    });
    const dateForCalender = computed(() => {
      const dateObj = new Date(event.value.date);
      return dateObj.getDate().toString().padStart(2, '0'); // 2자리 숫자로 변환
    });
    const isLiked = ref(false);
    const isParticipating = ref(false); // 사용자 참여 여부 상태
    const formattedDate = computed(() => {
      if (!event.value.date) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(event.value.date).toLocaleDateString(undefined, options);
    });
    const handleLoginRedirect = () => {
      // 경고창 띄우기
      alert("Login is required. Redirecting to the login page.");

      // 로그인 페이지로 리디렉션 (라우터를 사용)
      window.location.href = '/login'; // 로그인 페이지로 이동
    }

    // 4개의 이미지를 표시하기 위한 computed 프로퍼티
    const imagesToDisplay = computed(() => {
      // event.value.images가 정의되어 있다고 가정하고, 배열이 아니면 빈 배열로 처리
      console.log(event.value.images)
      const imgs = Array.isArray(event.value.images) ? event.value.images : [];
      return imgs;
    });

    const fetchEvent = async (eventId) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/gathering/getEvents/${eventId}`,
          { withCredentials: true }
        );

        const eventData = response.data;
        // 데이터 매핑 및 변환
        event.value = {
          id: eventData.id,
          images: eventData.images, // API 응답에 맞춰 필드명 확인
          name: eventData.name,
          description: eventData.description,
          date: eventData.date,
          time: eventData.time,
          category: eventData.category,
          mainImage: eventData.mainImage,
          location: eventData.location,
          locationDetail: eventData.locationDetail,
          participants: {
            current: eventData.participants?.length || 0,
            max: eventData.maxParticipants,
            min: eventData.minParticipants
          },
          likes: eventData.likes.length || 0,
          createdBy: {
            id: eventData.createdBy?.userId || 0,
            name: eventData.createdBy?.username || "Unknown",
            //profileImage: eventData.createdBy?.profileImage || "/assets/images/default-host.png",
          },
          price: eventData.price,
          type: eventData.type,
          question: eventData.question,
        };
        const userId = sessionStorage.getItem('userId')
        isLiked.value = eventData.likes.some((like) => like.user.userId === userId);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    // 날짜 및 시간 비교를 위한 computed property
    const isEventJoinable = computed(() => {
      // event.date와 event.time을 합쳐 Date 객체 생성
      const eventDateTime = new Date(`${event.value.date}T${event.value.time}`);
      // 참가 가능 조건: 참가 인원이 제한 미만이고, 이벤트 시간이 현재 이후인 경우
      return (
        event.value.participants.current < event.value.participants.max &&
        eventDateTime >= new Date()
      );
    });

    const toggleLike = async () => {
      const userId = sessionStorage.getItem('userId'); // 로그인 여부 확인

      if (!userId) {
        alert("Login is required.");
        window.location.href = '/login'; // 로그인 페이지로 이동
        return;
      }
      isLiked.value = !isLiked.value;

      try {
        // 좋아요 상태를 백엔드에 반영
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/gathering/${event.value.id}/like`,
          {
            userId: sessionStorage.getItem('userId'), // 사용자 ID 전달
          },
          {
            withCredentials: true, // 인증 정보를 포함
          }
        );


        // 백엔드로부터 최신 좋아요 상태를 반영
        event.value.likes = response.data.likesLen;
      } catch (error) {
        console.error('Failed to toggle like:', error);
        // 상태 복원
        isLiked.value = !isLiked.value;
      }
    };
    // 사용자 참여 여부 확인 함수
    const checkUserParticipation = async (eventId, userId) => {
      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/gathering/checkParticipation`,
          {
            params: { eventId, userId },
            withCredentials: true, // 인증 정보를 포함
          }
        );


        // 응답 결과를 이용해 참여 상태 업데이트
        isParticipating.value = response.data.isParticipating;
      } catch (error) {
        console.error('Failed to check participation:', error);
        isParticipating.value = false;
      }
    };
    // 참여 취소 함수
    const handleCancelParticipation = async () => {
      // 사용자 확인
      const userConfirmed = window.confirm(
        "Are you sure you want to cancel your participation in this event?"
      );

      if (userConfirmed) {
        try {
          // 백엔드 호출
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/gathering/cancelParticipation`,
            {
              userId: userId.value,
              eventId: event.value.id,
            },
            {
              withCredentials: true, // 인증 정보를 포함
            }
          );


          // 성공 메시지 표시
          console.log("Participation canceled:", response.data);
          alert("Your participation has been successfully canceled.");
        } catch (error) {
          // 에러 처리
          console.error("Error canceling participation:", error);
          alert("Failed to cancel participation. Please try again.");
        }
      } else {
        // 사용자가 취소를 확정하지 않음
        console.log("User canceled the confirmation.");
      }
    };

    onMounted(() => {
      const eventId = parseInt(window.location.pathname.split('/').pop()); // Extract event ID from URL
      fetchEvent(eventId);
      const userId = sessionStorage.getItem('userId');
      checkUserParticipation(eventId, userId); // 사용자 참여 여부 확인
    });

    const seoulDistrictsMap = {
      "Gangnam-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50648.029568312784!2d127.02503933400305!3d37.49608024545733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca4235fb589fb%3A0xb331971bc570bb6a!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rA!5e0!3m2!1sko!2skr!4v1738819689190!5m2!1sko!2skr",
      "Gangdong-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50648.029568312784!2d127.02503933400305!3d37.49608024545733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cb01583ca5b39%3A0x7e69bbcaf6932c8b!2z7ISc7Jq47Yq567OE7IucIOqwleuPmeq1rA!5e0!3m2!1sko!2skr!4v1738819720453!5m2!1sko!2skr",
      "Gangbuk-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50600.69486414374!2d126.78142033479563!3d37.56581937716441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbc1886085d81%3A0x524d50859b698cfc!2z7ISc7Jq47Yq567OE7IucIOqwleu2geq1rA!5e0!3m2!1sko!2skr!4v1738819750704!5m2!1sko!2skr",
      "Gangseo-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50600.69486414374!2d126.78142033479563!3d37.56581937716441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9c89aa3d6cbd%3A0x9f0bd8d303ea97d1!2z7ISc7Jq47Yq567OE7IucIOqwleyEnOq1rA!5e0!3m2!1sko!2skr!4v1738819736726!5m2!1sko!2skr",
      "Gwanak-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50668.796915433566!2d126.90291403365539!3d37.46544837543547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9ffac52c471b%3A0x4db3138b56ffcdc9!2z7ISc7Jq47Yq567OE7IucIOq0gOyVheq1rA!5e0!3m2!1sko!2skr!4v1738819765702!5m2!1sko!2skr",
      "Gwangjin-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50612.671474070594!2d127.0445205845951!3d37.54818444443916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca528f81c1909%3A0xa8f1a5f74974ff31!2z7ISc7Jq47Yq567OE7IucIOq0keynhOq1rA!5e0!3m2!1sko!2skr!4v1738819779353!5m2!1sko!2skr",
      "Guro-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50612.671474070594!2d127.0445205845951!3d37.54818444443916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9dfa0f3181f7%3A0x37de4d5e679d54ac!2z7ISc7Jq47Yq567OE7IucIOq1rOuhnOq1rA!5e0!3m2!1sko!2skr!4v1738819796553!5m2!1sko!2skr",
      "Geumcheon-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50648.33160361497!2d126.81691293399803!3d37.49563489589324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b61c615a3d89f%3A0x4e8a86e9c34e96c5!2z7ISc7Jq47Yq567OE7IucIOq4iOyynOq1rA!5e0!3m2!1sko!2skr!4v1738819813684!5m2!1sko!2skr",
      "Nowon-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50539.875719340525!2d127.03448683581423!3d37.655263739489506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cb90c0b7cbb4f%3A0xdc9b8dbc9f220e60!2z7ISc7Jq47Yq567OE7IucIOuFuOybkOq1rA!5e0!3m2!1sko!2skr!4v1738819826156!5m2!1sko!2skr",
      "Dobong-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50532.70008668029!2d126.99054858593442!3d37.665804729150736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbeb702124eeb%3A0x17e4d217a9b6d771!2z7ISc7Jq47Yq567OE7IucIOuPhOu0ieq1rA!5e0!3m2!1sko!2skr!4v1738819861834!5m2!1sko!2skr",
      "Dongdaemun-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25294.23199539649!2d127.03007040108662!3d37.58382141930932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbb5cd4298ec1%3A0xe040c8bbb76d2b24!2z7ISc7Jq47Yq567OE7IucIOuPmeuMgOusuOq1rA!5e0!3m2!1sko!2skr!4v1738819843822!5m2!1sko!2skr",
      "Jongno-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50578.0656305033!2d126.94493453517465!3d37.59912049453329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbd2fdd279c4b%3A0x50c7a92e7ab85ce6!2z7ISc7Jq47Yq567OE7IucIOyiheuhnOq1rA!5e0!3m2!1sko!2skr!4v1738820036549!5m2!1sko!2skr",
      "Jung-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50578.0656305033!2d126.94493453517465!3d37.59912049453329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2fc53a1f59b%3A0x5f7e54ee689e9e17!2z7ISc7Jq47Yq567OE7IucIOykkeq1rA!5e0!3m2!1sko!2skr!4v1738820056831!5m2!1sko!2skr",
      "Jungnang-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50580.5678658864!2d127.0527511851327!3d37.59543944814092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cba5a7e744759%3A0x9d8a4df6d7c943b7!2z7ISc7Jq47Yq567OE7IucIOykkeuekeq1rA!5e0!3m2!1sko!2skr!4v1738820072001!5m2!1sko!2skr",
      "Mapo-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50647.70691242308!2d126.90309158400846!3d37.49655599499164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c99206b2e6821%3A0xc2eb5359fa1f1d05!2z7ISc7Jq47Yq567OE7IucIOuniO2PrOq1rA!5e0!3m2!1sko!2skr!4v1738819889852!5m2!1sko!2skr",
      "Seodaemun-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50589.05792169418!2d126.89444688499053!3d37.582947410382644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c98688e51049d%3A0x1159731b249eda5c!2z7ISc7Jq47Yq567OE7IucIOyEnOuMgOusuOq1rA!5e0!3m2!1sko!2skr!4v1738819903335!5m2!1sko!2skr",
      "Seocho-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50660.90972188941!2d126.99656853378747!3d37.47708451404901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca13466bcacd1%3A0xb70bc7ff482af6ab!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rA!5e0!3m2!1sko!2skr!4v1738819917403!5m2!1sko!2skr",
      "Seongdong-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25305.48407359456!2d127.02027250099313!3d37.55069293498768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca49fc48757e7%3A0x2bc64441faf7cba2!2z7ISc7Jq47Yq567OE7IucIOyEseuPmeq1rA!5e0!3m2!1sko!2skr!4v1738819933137!5m2!1sko!2skr",
      "Seongbuk-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50572.633823235505!2d126.98197673526558!3d37.60711018670238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbc914445e619%3A0x6c9b1237a957b524!2z7ISc7Jq47Yq567OE7IucIOyEseu2geq1rA!5e0!3m2!1sko!2skr!4v1738819943599!5m2!1sko!2skr",
      "Dongjak-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50647.70691242308!2d126.90309158400846!3d37.49655599499164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9f78172a8681%3A0x1534ad844a336498!2z7ISc7Jq47Yq567OE7IucIOuPmeyekeq1rA!5e0!3m2!1sko!2skr!4v1738819875488!5m2!1sko!2skr",
      "Songpa-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50642.09302280324!2d127.07327598410244!3d37.50483273688954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca59cd04e4777%3A0x891d79c846e2cb75!2z7ISc7Jq47Yq567OE7IucIOyGoe2MjOq1rA!5e0!3m2!1sko!2skr!4v1738819957817!5m2!1sko!2skr",
      "Yeongdeungpo-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50631.32419050392!2d126.87270823428278!3d37.52070522134968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9f1dbf40f193%3A0x2cd0f2c80a840b40!2z7ISc7Jq47Yq567OE7IucIOyYgeuTse2PrOq1rA!5e0!3m2!1sko!2skr!4v1738819978099!5m2!1sko!2skr",
      "Yongsan-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50631.32419050392!2d126.87270823428278!3d37.52070522134968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca23c7e313fd3%3A0xa4342ca52af9b117!2z7ISc7Jq47Yq567OE7IucIOyaqeyCsOq1rA!5e0!3m2!1sko!2skr!4v1738819992948!5m2!1sko!2skr",
      "Yangcheon-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50624.23370523319!2d126.93972678440156!3d37.531152961119254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9dcd357864cb%3A0xd363c3aa854bbed9!2z7ISc7Jq47Yq567OE7IucIOyWkeyynOq1rA!5e0!3m2!1sko!2skr!4v1738820006882!5m2!1sko!2skr",
      "Eunpyeong-gu":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25313.48788893359!2d126.83552615092671!3d37.52711284614168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c978634080885%3A0xffe21430ce509646!2z7ISc7Jq47Yq567OE7IucIOydgO2Pieq1rA!5e0!3m2!1sko!2skr!4v1738820021481!5m2!1sko!2skr",

      // 나머지 10개 자치구를 같은 방식으로 추가...
    };
    const iframeUrl = computed(() => seoulDistrictsMap[event.value.location] || "");


    return {
      event,
      isLiked,
      toggleLike,
      formattedDate,
      userId,
      isParticipating,
      handleCancelParticipation,
      handleLoginRedirect,
      isEventJoinable,
      imagesToDisplay,
      iframeUrl,
      dateForCalender,
    };
  },
};
</script>


<style scoped>
/* Mobile */
@media screen and (max-width: 768px) {
  .Web {
    display: none;
  }

  .Mobile {
    display: block;
  }

  /* 배너 */
  .m-banner-img-box {
    height: 300px;
    background-position: center;
    background-size: cover;
    margin-top: 58px;
  }

  .m-banner-img-box .row {
    justify-self: center;
  }

  .s-card-text1 {
    font-size: 14px;
    color: #555;
    width: max-content;
    background-color: #ffffff;
    padding: 5px;
    padding-right: 10px;
    border-radius: 24px;
    margin-bottom: 7px;
  }

  .s-card-text2 {
    font-size: 14px;
    color: #ffffff;
    width: max-content;
    background-color: #58C3FF;
    padding: 5px;
    padding-right: 10px;
    border-radius: 24px;
    margin-bottom: 7px;
  }

  .s-card-text3 {
    font-size: 14px;
    color: #ffffff;
    width: max-content;
    background-color: #4457FF;
    padding: 5px 10px;
    border-radius: 24px;
    margin-bottom: 7px;
  }

  /* 정보(제목부터~) */
  .m-box {
    padding: 15px;
  }

  .m-box iframe {
    width: 100%;
  }

  .m-gatheing-title {
    font-size: 32px;
    font-weight: bold;
  }

  .m-gathering-text {
    font-size: 16px;
  }

  .m-info-title {
    font-size: 24px;
    font-weight: 500;
    margin-top: 15px;
    margin-bottom: 5px;
  }

  .m-large-img {
    height: 150px;
    width: 100%;
    border-radius: 12px;
    background-position: center;
    background-size: cover;
  }

  .m-small-box {
    height: 72.5px;
    width: 50%;
    border-radius: 12px;
    background-position: center;
    background-size: cover;
  }

  .btn_like {
    position: absolute;
    right: 8px;
    top: 78px;
    width: 50px;
    height: 50px;
    background: url("/assets/img/icon_Heart.png") no-repeat center / 40px;
    border: 0;
    font-size: 0;
    display: block;
    margin-top: -15px;
    margin-right: -0px;
  }

  .btn_like.on {
    background: url("/assets/img/icon_HeartFilled.png") no-repeat center / 40px;
    animation: beating .5s 1 alternate;
  }

  @keyframes beating {
    0% {
      transform: scale(1);
    }

    40% {
      transform: scale(1.25);
    }

    70% {
      transform: scale(0.9);
    }

    100% {
      transform: scale(1);
    }
  }

  .card-date-icon {
    background-image: url("/assets/img/icon_DateDetail.png");
    width: 50px;
    height: 50px;
    background-size: cover;
    align-content: center;
    text-align: center;
    font-weight: 600;
    color: #4457FF;
  }

  .s-card-icon1 {
    margin-bottom: 3px;
    width: 17px;
    height: 17px;
  }

  .s-card-icon2 {
    width: 15px;
    margin-top: 5px;
    cursor: pointer;
  }

  .review-btn {
    width: 90%;
    padding: 12px;
    background-color: #58C3FF;
    border: none;
    border-radius: 96px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 300;
    transition: all 0.3s ease;
  }

  .join-btn {
    width: 90%;
    padding: 12px;
    background-color: #4457FF;
    border: none;
    border-radius: 96px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 300;
    transition: all 0.3s ease;
  }

  .cancel-btn {
    width: 90%;
    padding: 12px;
    background-color: #e84a4a;
    border: none;
    border-radius: 96px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 300;
    transition: all 0.3s ease;
  }

  .closed-join-btn {
    width: 90%;
    padding: 12px;
    background-color: gray;
    border: none;
    border-radius: 96px;
    color: #ffffff;
  }
}

/* Web */
@media screen and (min-width: 769px) {
  .Web {
    display: block;
  }

  .Mobile {
    display: none;
  }

  /* main banner */
  .banner-img-box {
    max-width: 100%;
    height: 400px;
    margin-top: 60px;
    background-image: url("/assets/images/image1.png");
    background-size: cover;
    background-position: center;
  }

  /* Event content */
  .gatheing-title {
    margin-top: 66px;
    font-size: 48px;
    margin-bottom: 33px;
    font-weight: 600;
  }

  .map-box {
    margin-top: 33px;
    margin-bottom: 66px;
  }

  .map-title {
    font-size: 32px;
    font-weight: 600;
    margin: 0px;
  }

  .map-text {
    color: #5F687A;
    font-size: 16px;
  }

  .price-box {
    margin-bottom: 132px;
  }

  .price-title {
    font-size: 32px;
    font-weight: 600;
    margin: 0px;
  }

  .price-text {
    font-size: 24px;
    font-weight: 400;
  }

  .photo-gallery {
    width: 100%;
    padding: 20px;
  }

  .large-box {
    height: 420px;
    padding: 0px;
    background-position: center;
    background-size: cover;
  }

  .small-box {
    height: 202px;
    width: 185px;
    padding: 0px;
    background-position: center;
    background-size: cover;
    margin: 5px;
    border-radius: 24px;
  }

  .large-img {
    width: 100%;
    height: 100%;
    padding: 5px;
    border-radius: 24px;
    background-position: center;
    background-size: cover;
  }

  .small-img {
    width: 100%;
    height: 100%;
    padding: 5px;
    border-radius: 24px;
    background-position: center;
    background-size: cover;
  }

  /* sticky-card */
  .sticky-card {
    position: sticky;
    top: 99px;
    margin-top: -200px;
    height: max-content;
    margin-bottom: 30px;
    border-radius: 24px;
    padding: 15px;
    padding-left: 27px;
    padding-right: 27px;
  }

  .sticky-card-info {
    padding: 5px 3px;
  }

  .host {
    text-align: center;
    margin-top: -18px;
    height: 15px;
  }

  .btn_like {
    position: absolute;
    right: 25px;
    top: 45px;
    width: 50px;
    height: 50px;
    background: url("/assets/img/icon_Heart.png") no-repeat center / 40px;
    cursor: pointer;
    border: 0;
    font-size: 0;
    display: block;
    margin-top: -15px;
    margin-right: -0px;
  }

  .btn_like.on {
    background: url("/assets/img/icon_HeartFilled.png") no-repeat center / 40px;
    animation: beating .5s 1 alternate;
  }

  @keyframes beating {
    0% {
      transform: scale(1);
    }

    40% {
      transform: scale(1.25);
    }

    70% {
      transform: scale(0.9);
    }

    100% {
      transform: scale(1);
    }
  }

  .card-date-icon {
    background-image: url("/assets/img/icon_DateDetail.png");
    width: 50px;
    height: 50px;
    background-size: cover;
    align-content: center;
    text-align: center;
    font-weight: 600;
    color: #4457FF;
  }

  .s-card-icon1 {
    margin-bottom: 3px;
    width: 17px;
    height: 17px;
  }

  .s-card-icon2 {
    width: 15px;
    margin-top: 5px;
    cursor: pointer;
  }

  .s-card-text1 {
    margin: 0px;
    color: #5F687A;
    font-size: 16px;
  }

  .s-card-text2 {
    margin: 0px;
    color: #1C1F23;
    font-size: 16px;
    font-weight: bold;
  }

  .s-card-text3 {
    margin-top: 15px;
    margin-bottom: 24px;
    padding: 0px;
    color: #5F687A;
    font-size: 16px;
  }

  .s-card-text4 {
    padding: 0px;
    color: #5F687A;
    font-size: 16px;
    margin: 0px;
    padding: 5px 0px;
  }

  .card-host {
    margin: 0px;
    margin-top: 5px;
    cursor: pointer;
  }

  .host-icon {
    width: 24px;
    height: 24px;
    border-radius: 100%;
  }

  .review-btn {
    width: 90%;
    margin: 12px 32px;
    padding: 12px;
    background-color: #58C3FF;
    border: none;
    border-radius: 96px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 300;
    transition: all 0.3s ease;
  }

  .review-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .join-btn {
    width: 90%;
    margin: 12px 32px;
    padding: 12px;
    background-color: #4457FF;
    border: none;
    border-radius: 96px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 300;
    transition: all 0.3s ease;
  }

  .join-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .cancel-btn {
    width: 90%;
    margin: 12px 32px;
    padding: 12px;
    background-color: #e84a4a;
    border: none;
    border-radius: 96px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 300;
    transition: all 0.3s ease;
  }

  .cancel-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .closed-join-btn {
    width: 90%;
    margin: 12px 32px;
    padding: 12px;
    background-color: gray;
    border: none;
    border-radius: 96px;
    color: #ffffff;
  }
}

/* 공통 */
.row {
  width: 100%;
}

.space {
  padding: 75px;
}

.p-0 {
  padding: 0px;
}

.m-0 {
  margin: 0px;
}

.text-center {
  text-align: center;
}
</style>
 <template>

    <!-- 호스트 질문이 있는경우 -->
    <template v-if="event.question">
      <!-- banner -->
      <div class="banner">
        <p class="banner-text1">it’s time to join!</p>
        <p class="banner-title">Join event</p>
        <p class="banner-text2">Your next great adventure starts here!</p>
      </div>

      <div class="enter-card">
        <EventCard
            :event="event"
        />
      </div>

      <p class="card-detail text-center">
        <br>
        Event fees are paid by the host on site.
      </p>

      <!-- 방참가 -->
      <div class="login-container">

        <div class="row create-image">
          <div class="col-2 sub-icon">
            <img src="../../../public/assets/img/icon_CreateEvent.png" alt="">
          </div>
          <div class="col sub-icon-text">
            <p class="sub-title">Host’s Question</p>
            <p class="sub-text">Answer the following questions to help the host select the guests for the event!</p>
          </div>
        </div>

        <div class="create-form">
          <form  @submit.prevent="submitEvent">

            <div class="form-group">
              <label for="details">Question for Selection</label>
              <div class="ipnut-detail" name="" id="">{{event.question}}</div>
            </div>

            <div class="form-group">
              <label for="details">Answer for Selection</label>
              <textarea class="ipnut-question" placeholder="Your answer:" v-model="userAnswer"></textarea>
            </div>

            <div class="agreement-container">
              <!-- 체크박스와 텍스트 -->
              <label class="agreement-label">
                As a rule, all payments should be made directly to the host on-site.
              </label>
              <label class="agreement-label">
                I have read the basic
                <span @click="openPopup" class="usage-rules-link">usage rules</span>
                of HiFor, and I agree with that.
                <input type="checkbox" v-model="isChecked" class="agreement-checkbox" />
                <span class="checkbox-custom"></span>
              </label>
              <!-- Join Now 버튼 -->
              <button type="submit" class="join-now-button" :disabled="!isChecked">Submit event</button>
            </div>

          </form>
        </div>

      </div>
    </template>
    <!-- 호스트 질문이 없는 경우 -->
    <template v-else>
      <!-- banner -->
      <div class="banner">
        <p class="banner-text1">Join event</p>
        <p class="banner-title">Join event</p>
        <p class="banner-text2">Your next great adventure starts here!</p>
      </div>

      <EventCard
          :event="event"
      />

      <p class="card-detail text-center">
        <br>
        Event fees are paid by the host on site.
      </p>

      <!-- 방참가 -->
      <form @submit.prevent="submitEvent">
        <div class="login-container-op2">

          <div class="create-form-op2">

            <div class="agreement-container">
              <!-- 체크박스와 텍스트 -->
              <label class="agreement-label">
                I have read the basic
                <span @click="openPopup" class="usage-rules-link">usage rules</span>
                of HiFor, and I agree with that.
                <input type="checkbox" v-model="isChecked" class="agreement-checkbox" />
                <span class="checkbox-custom"></span>
              </label>
              <!-- Join Now 버튼 -->
              <button type="submit" class="join-now-button-op2" :disabled="!isChecked" >Submit event</button>
            </div>
          </div>

        </div>

      </form>
    </template>

</template>


<script setup>
import {  onMounted, ref } from 'vue';
import EventCard from '@/components/gathering/EventCard.vue';
import axios from 'axios';
//import { useStore } from 'vuex';
//const store = useStore();
const userId =  sessionStorage.getItem('userId');
const userAnswer = ref();
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
  participants: { current: 0, max: 0, min: 0},
  category: '',
  type: '',
  likes: 0,
  createdBy: { name: '', id: 0, profileImage: '' },
  price: 0,
  question: '',
});

// 체크박스 상태
const isChecked = ref(false);
const fetchEvent = async (eventId) => {
  try {
    const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/events/getEvents/${eventId}`,
        {
          withCredentials: true, // 인증 정보를 포함
        }
    );

    const eventData = response.data;
    // 데이터 매핑 및 변환
    event.value = {
      id: eventData.id,
      image: eventData.image, // API 응답에 맞춰 필드명 확인
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
    //isLiked.value = eventData.likes.some((like) => like.user.userId === userId);
  } catch (error) {
    console.error("Error fetching event data:", error);
  }
};

// 팝업 창 열기 함수
const openPopup = () => {
  const popupContent = `
    <html>
      <head>
        <title>Usage Rules</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
          }
          h3 {
            color: #333;
          }
          ul {
            padding-left: 20px;
          }
          li {
            margin-bottom: 10px;
          }
          p {
            margin-bottom: 10px;
          }
          .close-btn {
            margin-top: 20px;
            padding: 10px 20px;
            border: none;
            background-color: #007bff;
            color: white;
            border-radius: 5px;
            cursor: pointer;
          }
          .close-btn:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <h2>Usage Rules</h2>

        <h3>1. Platform Usage Rules</h3>
        <ul>
            <li>General Rules</li>
            <p>Event content and participation activities must comply with all legal and ethical standards.</p>
            <p>Users must communicate with respect and consideration for each other; discriminatory or violent behavior is strictly prohibited.</p>
            <p>HiFor relies on mutual trust between hosts and guests to ensure the smooth running of events and gatherings.</p>
        </ul>

        <h3>2. Event Rules</h3>
        <ul>
            <li>Host Responsibilities</li>
            <p>Event hosts must provide accurate information (schedule, location, participation conditions, etc.) and are responsible for any issues caused by incorrect information.</p>
            <li>Participant Responsibilities</li>
            <p>Event participants must maintain the reliability of their registered information and should avoid canceling without notice.</p>
            <li>Prohibited Activities</li>
            <p>Illegal activities or commercial promotions during events are strictly prohibited.</p>
        </ul>

        <h3>3. Privacy Protection</h3>
        <ul>
            <li>Personal Data Security</li>
            <p>The platform securely manages users' personal information and does not share it with third parties without consent.</p>
            <li>User Responsibility</li>
            <p>Users must handle their information carefully and must not infringe on the privacy of others.</p>
        </ul>

        <h3>4. Limitation of Liability</h3>
        <ul>
            <li>Event Responsibility</li>
            <p>The platform is not legally responsible for accidents or issues occurring within events hosted or attended by users.</p>
            <li>Voluntary Participation</li>
            <p>Participation in events is entirely voluntary, and the host and participants bear direct responsibility.</p>
        </ul>

        <h3>5. Participation Fees and Refund Policy</h3>
        <ul>
            <li>Refund Policy</li>
            <p>For events with participation fees, refunds may not be guaranteed due to the lack of a formal refund policy.</p>
            <p>In the absence of a clear refund policy, hosts are encouraged to communicate refund terms directly to participants before confirming their participation.</p>
            <li>Platform Role</li>
            <p>The platform will provide support for communication between hosts and participants regarding refunds but does not bear any responsibility for refund disputes.</p>
        </ul>

        <h3>6. Dispute Resolution</h3>
        <ul>
            <li>User Conflict Mediation</li>
            <p>In the event of conflicts between users, the platform may mediate from a neutral standpoint but does not bear ultimate responsibility.</p>
            <li>Legal Compliance</li>
            <p>Legal issues will be resolved according to the applicable local laws.</p>
            <li>Trust & Safety</li>
            <p>These rules aim to minimize foreseeable problems during platform usage and to establish a trustworthy environment for all users.</p>
        </ul>

        <button class="close-btn" onclick="window.close()">Close</button>
    </body>

    </html>
  `;

  const popupWindow = window.open(
      "",
      "Usage Rules",
      "width=600,height=700,scrollbars=yes,resizable=yes"
  );

  popupWindow.document.write(popupContent);
  popupWindow.document.close();
};

// 결제하기
const submitEvent = async () => {
  try {
    console.log(event.value.id, userId, userAnswer.value);

    const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/participants/createParticipant`,
        {
          eventId: event.value.id,
          userId: userId,
          answer: userAnswer.value || '',
        },
        {
          withCredentials: true, // 인증 정보를 포함
        }
    );

    if (response.status === 201) {
      alert('Registration successful!');
      window.location.href = `/events/${event.value.id}`;
    }
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message); // "User has already joined this event" 표시
    } else {
      alert('An unexpected error occurred.');
    }
    window.location.href = `/events/${event.value.id}`;
  }
};



onMounted(() => {
  const eventId = parseInt(window.location.pathname.split('/').pop()); // Extract event ID from URL
  fetchEvent(eventId);
});
</script>


<!-- css -->
<style scoped>
/* 반응형 모바일 css */
/* 반응형 모바일 css */
@media screen and (max-width: 768px) {
  /* 기본 레이아웃 조정 */
  .login-container, .login-container-op2 {
    flex-direction: column;
    padding: 20px;
  }

  .create-image {
    width: 100%;
    height: auto;
    padding: 20px 0;
    text-align: center;
  }

  .create-form, .create-form-op2 {
    width: 100%;
    padding: 20px;
    border-radius: 12px;
  }

  /* 배너 */
  .banner {
    text-align: center;
    padding: 20px 5px;
    margin-top: 50px;
  }
  .banner-text1 {
    font-size: 14px;
    color: #4457FF;
    margin: 0px;
  }
  .banner-title {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin: 10px 0;
  }
  .banner-text2 {
    font-size: 14px;
    color: #5F687A;
    line-height: 1.5;
  }
  .sub-icon{
    display: none;
  }
  .sub-title{
    font-size: 24px;
    font-weight: 600;
  }

  /* 폼 그룹 */
  .form-group {
    margin-bottom: 15px;
  }
  .form-group label {
    font-size: 14px;
  }
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 10px;
  }

  .form-group textarea {
    height: 120px;
  }

  /* 카드 디자인 */
  .enter-card {
    width: 100%;
    padding: 10px;
    justify-self: center;
  }

  .card {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }

  /* 드롭다운 조정 */
  .form-group select {
    width: 100%;
    height: 45px;
  }

  /* Dropzone 스타일 조정 */
  #upload-box {
    border: 2px dashed #ccc;
    padding: 15px;
    text-align: center;
    font-size: 14px;
  }

  #file-list img {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }

  /* 버튼 */

  
  .join-now-button {
    background-color: #4a68ff;
    color: white;
    width: 300px;
    border: none;
    border-radius: 50px;
    padding: 15px 40px;
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .join-now-button:disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;
  }

  .join-now-button:hover:not(:disabled) {
    background-color: #4457FF;
  }

  /* 하단 텍스트 */
  .agreement-label {
    width: 100%;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
  }

  /* 체크박스 스타일 */
  .agreement-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .usage-rules-link {
    color: #4457FF;
    text-decoration: underline;
    cursor: pointer;
  }

  /* 카드 내부 텍스트 크기 조정 */
  .card-title {
    font-size: 18px;
    text-align: center;
  }

  .card-detail {
    font-size: 14px;
    text-align: center;
  }

  /* 참가자 수 입력 필드 크기 조정 */
  .form-group .half-input-row {
    flex-direction: column;
  }
  .form-group .half-input-row .col-6 {
    width: 100%;
  }
}


/* 웹 */
@media screen and (min-width: 769px) {
  /* header */
  .header-space {
    padding: 15px;
    max-width: 100%;
    width: 100%;
    justify-self: center;
  }

  .header-logo {
    max-width: 50%;
    font-size: 28px;
    font-weight: bold;
    color: #58C3FF;
  }

  .logo-hifor {
    width: 100px;
    margin-top: -20px;
  }

  .header-nav {
    max-width: 50%;
    text-align: right;
  }

  .header-nav-text {
    font-size: 18px;
    color: #58C3FF;
    padding: 15px;
    text-decoration: none;
    opacity: 1;
    transition: all 0.3s ease;
  }

  .header-nav-text:hover {
    font-size: 18px;
    color: #58C3FF;
    padding: 15px;
    text-decoration: none;
    opacity: 1;
    font-weight: 700;
  }

  .header-nav-btn {
    font-size: 18px;
    color: #58C3FF;
    text-decoration: none;
    padding: 10px 15px;
    margin: 0px 5px;
    text-decoration: none;
    border: 1px solid #58C3FF;
    border-radius: 32px;
    opacity: 1;
    transition: all 0.3s ease;
  }

  .header-nav-btn:hover {
    font-size: 18px;
    color: #58C3FF;
    text-decoration: none;
    padding: 10px 15px;
    margin: 0px 5px;
    text-decoration: none;
    border: 1px solid #58C3FF;
    border-radius: 32px;
    opacity: 1;
    font-weight: 700;
  }

  /* banner */
  .banner {
    padding: 75px 150px;
    padding-top: 105px;
  }

  .banner-text1 {
    color: #4457FF;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    margin: 0px;
  }

  .banner-text2 {
    color: #5F687A;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }

  .banner-title {
    color: #333;
    font-size: 54px;
    font-weight: bold;
    text-align: center;
  }

  /* card */
  .enter-card {
    width: 100%;
    padding: 10px 0px;
    max-width: 344px;
    justify-self: center;
  }

  /* 방생성 */
  .login-container {
    display: flex;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    min-height: 380px;
    padding: 30px 150px;
  }

  .login-container-op2 {
    display: flex;
    background: #fff;
    overflow: hidden;
    width: 100%;
    padding: 30px 150px;
    justify-content: center;
  }

  .create-form {
    flex: 1;
    padding: 40px;
    padding-top: 20px;
    padding-bottom: 0px;
    max-width: 720px;
    align-content: center;
    margin-top: 40px;
    border: 1px solid #E5ECF8;
    border-radius: 24px;
  }

  .create-form-op2 {
    flex: 1;
    padding: 40px;
    padding-top: 20px;
    padding-bottom: 0px;
    max-width: 720px;
    align-content: center;
    border-radius: 24px;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #333;
  }

  .form-group input {
    width: 100%;
    height: 50px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 24px;
    box-sizing: border-box;
  }

  .form-group textarea {
    width: 100%;
    height: 50px;
    padding: 20px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 24px;
    box-sizing: border-box;
  }

  .form-group form {
    width: 100%;
    padding: 20px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 24px;
    box-sizing: border-box;
  }

  .form-group select {
    width: 100%;
    height: 50px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 24px;
    box-sizing: border-box;
  }

  /* 컨테이너 스타일 */
  .agreement-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 20px;
    font-family: Arial, sans-serif;
  }

  /* 약관 텍스트 스타일 */
  .agreement-label {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #6c757d;
    margin-bottom: 20px;
    position: relative;
  }

  /* usage rules 링크 스타일 */
  .usage-rules-link {
    color: #4457FF;
    text-decoration: none;
    margin: 0 5px;
  }

  .usage-rules-link:hover {
    text-decoration: underline;
  }

  /* 커스텀 체크박스 스타일 */
  .agreement-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 20px;
    font-family: Arial, sans-serif;
  }

  .usage-rules-link {
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;
  }

  /* Join Now 버튼 스타일 */
  .join-now-button {
    background-color: #4a68ff;
    width: 100%;
    color: white;
    border: none;
    border-radius: 50px;
    padding: 15px 40px;
    margin-bottom: 40px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .join-now-button:disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;
  }

  .join-now-button:hover:not(:disabled) {
    background-color: #4457FF;
  }

  .join-now-button-op2 {
    background-color: #4a68ff;
    color: white;
    width: 300px;
    border: none;
    border-radius: 50px;
    padding: 15px 40px;
    margin-bottom: 40px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .join-now-button-op2:disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;
  }

  .join-now-button-op2:hover:not(:disabled) {
    background-color: #4457FF;
  }


  .password-group {
    position: relative;
  }

  .form-options {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .form-options label {
    font-size: 16px;
    color: #555;
  }

  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    color: #aaa;
  }

  .divider span {
    background: #fff;
    padding: 0 10px;
  }

  .create-image {
    flex: 1;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 150px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    border-radius: 24px;
    padding: 40px;
  }

  .code-btn-box {
    align-content: end;
  }

  .code-btn {
    background-color: #58C3FF;
    border: none;
    color: #FFFFFF;
    padding: 13px 26px;
    border-radius: 12px;
  }

  .sub-icon {
    text-align: center;
  }

  .sub-title {
    font-size: 30px;
    font-weight: 600;
  }

  .sub-text {
    color: #5F687A;
  }

  .ipnut-detail {
  }

  .ipnut-question {
    height: 120px !important;
    padding: 15px !important;
  }

  /* 이벤트 카드 */
  .card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
    flex-shrink: 0;
    text-align: center;
    --bs-card-border-width: none;
    transition: all 0.3s ease;
    justify-self: center;
  }

  .card:hover {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
    flex-shrink: 0;
    text-align: center;
    --bs-card-border-width: none;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .card-body .col-6 {
    padding: 0px;
  }

  .card-title {
    font-size: 1.75rem;
    font-weight: 500;
    text-align: left;
    margin: 0px;
  }

  .card-detail {
    text-align: left;
    font-size: 15px;
    font-weight: 300;
  }

  .card-price {
    text-align: left;
  }

  .card-img {
    background-image: url('/assets/img/img_LogInBanner1.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 210px;
    border-radius: 8px;
  }

  .card-info-text {
    padding: 0px 5px;
  }

  .card-icon-heart {
    margin: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .card-info-text {
    text-align: left;
    font-weight: 300;
  }

  .card-info-icon {
    width: 20px !important;
    height: 20px !important;
  }

  .icon_tema {
    width: min-content;
    background-color: #5870FF;
    color: #FFFFFF;
    padding: 5px 15px;
    border-radius: 24px;
    margin: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .icon_type {
    width: min-content;
    background-color: #58C3FF;
    color: #FFFFFF;
    padding: 5px 15px;
    border-radius: 24px;
    margin: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .participants {
    width: max-content;
    background-color: #FFFFFF;
    color: #5870FF;
    padding: 5px 15px;
    border-radius: 24px;
    margin: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

}
</style>

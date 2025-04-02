<template>

  <!-- banner -->
  <div class="banner">
    <p class="banner-text1">Manage your event</p>
    <p class="banner-title">Management</p>
    <p class="banner-text2">
      You can check and approve participants here!
    </p>
  </div>


  <!-- 참가자 승인 -->
  <div class="login-container" v-if="eventType === 'Register'">

    <div class="row create-image">
      <div class="sub-icon">
        <img src="/assets/img/icon_CreateEvent.png" alt="">
      </div>
      <div class="col sub-icon-text">
        <p class="sub-title">Guest’s Answer</p>
        <p class="sub-text">
          Your question: <br>
          <span class="host-q-text">{{ eventQuestion  }}</span>

        </p>
      </div>
    </div>

    <!-- 찹가자 답변 박스 -->
    <div class="create-form" v-for="participant in pendingParticipants" :key="participant.id">
        <!-- 답변 -->
        <div class="form-group">
          <label class="guest-name">
            <router-link :to="`/userPage/${participant.user.userId}`" >
              <img class="guest-icon" :src="participant.user.profileImage || '/assets/images/default-avatar.png'" alt=""> {{participant.user.username}}
            </router-link>
          </label>
          <div class="guest-answer">
            {{ participant.answer }}
          </div>
          <div class="btn-row row">
            <button class="accept-btn" @click="updateParticipantStatus(participant.id, 'Approved')">
              Accept
            </button>
            <button class="reject-btn" @click="updateParticipantStatus(participant.id, 'Rejected')">
              Reject
            </button>
          </div>
        </div>

    </div>
  </div>

  <!-- 참가자 리스트 -->
  <div class="login-container">

    <div class="row create-image">
      <div class="sub-icon">
        <img src="/assets/img/icon_CreateEvent.png" alt="">
      </div>
      <div class="col sub-icon-text">
        <p class="sub-title">Guests list</p>
        <p class="sub-text">
          Event participants: <br>
          <span class="host-q-text">
                        <span>{{ currentCount }}</span> / <span>{{ maxParticipants  }}</span>
                    </span>

        </p>
      </div>
    </div>

    <!-- 찹가자 답변 박스 -->
    <div class="create-form" >
        <!-- 답변 -->
        <div class="form-group" v-for="participant in approvedParticipants" :key="participant.id">
          <label class="guest-name">
            <router-link :to="`/userPage/${participant.user.userId}`" >
              <img class="guest-icon" :src="participant.user.profileImage || '/assets/images/default-avatar.png'" alt=""> {{participant.user.username}}
            </router-link>
          </label>
          <div class="guest-answer">
              {{ participant.answer }}
          </div>
        </div>

    </div>

  </div>

  <!-- 관리 완료 버튼 -->
  <div class="login-container-op2">
    <div class="create-form-op2">
      <form>
        <div class="agreement-container">
          <button type="button" class="btn-primary" @click="redirectToEvent">Complete</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";


const route = useRoute();
const eventId = route.params.eventId;

// 데이터 상태
const event = ref({});
const participants = ref([]);
const currentCount = ref(0);
const maxParticipants = ref(0);
const eventQuestion = ref("");
const eventType = ref("");

// 상태가 Pending인 참가자 필터링
const pendingParticipants = computed(() => {
  return participants.value.filter((participant) => participant.status === "Pending");
});

const approvedParticipants = computed(() => {
  return participants.value.filter((participant) => participant.status === "Approved");
});


// API 호출 함수
const loadEventDetails = async () => {
  try {
    const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/gathering/getEventForPending/${eventId}`,
        { withCredentials: true } // 인증 정보를 포함
    );

    event.value = response.data;
    maxParticipants.value = event.value.maxParticipants || 0;
    currentCount.value =
        event.value.participants?.filter((p) => p.status === "Approved").length || 0;
    eventQuestion.value = event.value.question; // 질문 데이터 (설명 필드 사용)
    participants.value = event.value.participants;
    eventType.value = event.value.type;
  } catch (error) {
    console.error("Error loading event details:", error);
  }
};
// Vue setup function 내에 추가
const redirectToEvent = () => {
  window.location.href = `/events/${event.value.id}`;
};


const updateParticipantStatus = async (participantId, status) => {
  if(status === 'Approved' && currentCount.value >= maxParticipants.value ){
    alert('Maximum number of participants reached')
    return
  }
  try {
    await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/gathering/${participantId}/status`,
        {
          status,
          eventId: event.value.id,
        },
        {
          withCredentials: true, // 인증 정보를 포함
        }
    );

    await loadEventDetails(); // 업데이트 후 다시 로드
    currentCount.value = participants.value.filter(
        (p) => p.status === "Approved"
    ).length;
  } catch (error) {
    console.error("Error updating participant status:", error);
  }
};


// 컴포넌트 로드시 데이터 로드
onMounted(async () => {
  await loadEventDetails();
});


</script>

<!-- css -->
<style scoped>
a {
  text-decoration: none !important;
  color: unset !important;
}
/* 반응형 모바일 css */
@media screen and (max-width:768px){
  .Web{display: none;}
  .Mobile{display: block;}


  .banner {
    padding: 30px 20px;
    text-align: center;
    margin-top: 50px;
  }

  .banner-text1 {
    font-size: 12px;
    font-weight: 400;
    color: #4457FF;
    margin: 0px;
  }

  .banner-title {
    font-size: 28px;
    font-weight: bold;
    margin: 10px 0;
  }

  .banner-text2 {
    font-size: 14px;
    color: #5F687A;
  }

  .login-container {
    flex-direction: column;
    padding: 15px 20px;
  }

  .create-image {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 10px 0;
  }

  .sub-icon {
    width: min-content;
    margin-bottom: 10px;
  }

  .sub-title {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .sub-text {
    font-size: 14px;
    color: #5F687A;
  }

  .host-q-text{
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }

  .create-form {
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    max-height: 660px;
    overflow-y: visible;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .guest-name {
    font-size: 18px;
    display: flex;
    align-items: center;
  }

  .guest-icon {
    width: 36px;
    height: 36px;
    margin-right: 10px;
    border-radius: 48px;
  }

  .guest-answer {
    font-size: 14px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 96px;
    margin-top: 5px;
  }

  .btn-row {
    align-items: stretch;
    gap: 10px;
    margin-top: 10px;
    padding: 0px 10px;
    justify-content: center;
  }

  .accept-btn,
  .reject-btn {
    width: 45%;
    font-size: 14px;
    padding: 8px;
    border-radius: 96px;
  }

  .accept-btn {
    background-color: #58C3FF;
    border: 1px solid #58C3FF;
    color: #FFFFFF;
  }

  .reject-btn {
    background-color: #FF5780;
    border: 1px solid #FF5780;
    color: #FFFFFF;
  }

  .btn-primary {
    width: 100%;
    font-size: 16px;
    padding: 12px;
    border-radius: 96px;
    background-color: #4457FF;
    border: 1px solid #4457FF;
    color: #FFFFFF;
  }

  .agreement-container {
    text-align: center;
    padding: 0px 30px;
    margin-bottom: 60px;
  }
}
/* 웹 */
@media screen and (min-width:769px){
  .Web{display: block;}
  .Mobile{display: none;}

  /* banner */
  .banner{
    padding: 75px 150px;
    padding-top: 105px;
  }
  .banner-text1{
    color: #4457FF;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    margin: 0px;
  }
  .banner-text2{
    color: #5F687A;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }
  .banner-title{
    color: #333;
    font-size: 54px;
    font-weight: bold;
    text-align: center;
  }

  /* 방생성 */
  .login-container {
    display: flex;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    padding: 30px 150px;
  }

  .create-form {
    flex: 1;
    padding: 40px;
    padding-top: 20px;
    padding-bottom: 0px;
    max-width: 720px;
    max-height: 660px;
    overflow-y: auto;
    align-content: center;
    margin-top: 40px;
    border: 1px solid #E5ECF8;
    border-radius: 24px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .guest-name{
    font-size: 18px;
    padding: 10px 0px;
  }

  .guest-icon{
    width: 24px;
    height: 24px;
    border-radius: 24px;
  }

  .guest-answer{
    width: 100%;
    padding: 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 24px;
    box-sizing: border-box;
    color: #333;
  }

  .btn-row{
    width: 100%;
    justify-content: right;
    padding: 10px 0px;
  }

  .accept-btn{
    width: 90px;
    padding: 3px 5px;
    border-radius: 12px;
    transition: all 0.3s ease;
    margin-right: 10px;
    background-color: #FFFFFF;
    color: #58C3FF;
    border: 1px solid #58C3FF;
  }
  .accept-btn:hover{
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #58C3FF;
    color: #E5ECF8;
    border: 1px solid #58C3FF;
  }

  .reject-btn{
    width: 90px;
    padding: 3px 5px;
    border-radius: 12px;
    transition: all 0.3s ease;
    background-color: #FFFFFF;
    color: #FF5780;
    border: 1px solid #FF5780;
  }
  .reject-btn:hover{
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #FF5780;
    color: #E5ECF8;
    border: 1px solid #FF5780;
  }

  .form-options label {
    font-size: 16px;
    color: #555;
  }

  .btn-primary {
    background-color: #4457FF;
    color: #fff;
    border: none;
    padding: 10px;
    width: 200px;
    height: 50px;
    font-size: 16px;
    border-radius: 24px;
    cursor: pointer;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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

  .code-btn-box{
    align-content: end;
  }
  .code-btn{
    background-color: #58C3FF;
    border: none;
    color: #FFFFFF;
    padding: 13px 26px;
    border-radius: 12px;
  }
  .sub-icon{
    width: min-content;
    text-align: center;
    margin-right: 5px;
  }
  .sub-title{
    font-size: 30px;
    font-weight: 600;
  }
  .sub-text{
    color: #5F687A;
  }
  .host-q-text{
    font-size: 22px;
    color: #555;
    font-weight: 600;
  }
  .ipnut-detail{
    min-height: 360px;
  }
  .ipnut-question{
    height: 120px !important;
    padding: 15px !important;
  }

  .agreement-container{
    justify-self: center;
  }

}
</style>

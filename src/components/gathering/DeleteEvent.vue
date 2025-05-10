<template>
  <div class="login-container">
    <div class="create-image">
      <div class="banner">
        <p class="banner-text1">Delete event</p>
        <p class="banner-title">Are you sure you want to delete this event?</p>
        <p class="banner-text2">"Once deleted, this event cannot be recovered."</p>
      </div>
    </div>
    <div class="create-form">
      <form @submit.prevent="sendMessage">
        <div class="form-group">
          <label>If you delete...</label>
          <p class="notice-text">
            - All event details and participant data will be permanently removed.
            <br />
            - Participants will receive a cancellation notification.
            <br />
            - This action cannot be undone.
          </p>
        </div>

        <div class="form-group">
          <label>Please select a reason for deletion before proceeding.</label>
          <select v-model="form.reason" required>
            <option disabled hidden value="">Select a reason</option>
            <option value="Not enough participants">Not enough participants</option>
            <option value="Schedule change">Schedule change</option>
            <option value="Want to create a new event">Want to create a new event</option>
            <option value="Other">Other (Enter reason)</option>
          </select>
          <textarea
            v-if="form.reason === 'Other'"
            v-model="form.otherReason"
            placeholder="Enter your reason here..."
            rows="3"
            style="width: 100%; height: 100px; margin-top: 15px; font-size: 14px; border: 1px solid #ccc; border-radius: 24px; padding: 15px 20px; box-sizing: border-box"
          ></textarea>
        </div>

        <div class="agreement-container">
          <button class="delete-button" :disabled="isLoading || isDeleteDisabled" type="submit">
            {{ isLoading ? 'Processing...' : 'Delete' }}
          </button>
          <button class="cancel-button" type="button" @click="cancel">Cancel and go back</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const eventId = parseInt(window.location.pathname.split('/').pop()); // 🔥 eventId를 ref로 저장
// 🔥 URL에서 이벤트 ID 가져오기

const form = ref({
  reason: '',
  otherReason: '',
});

// Delete 버튼 비활성화 로직
const isDeleteDisabled = computed(() => {
  return form.value.reason === '' || (form.value.reason === 'Other' && form.value.otherReason.trim() === '');
});

const isLoading = ref(false);

const sendMessage = async () => {
  console.log(eventId); // 디버깅 로그로 eventId 확인
  isLoading.value = true;

  try {
    const message = form.value.reason === 'Other' ? form.value.otherReason : form.value.reason;
    if (!message) {
      alert('Please provide a reason before submitting.');
      return;
    }

    // POST 요청
    /*await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/mail/deleteEvent/${eventId}`,
        { message },
        { withCredentials: true }
      );
      console.log("Notification sent successfully");
      */
    // DELETE 요청
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/events/${eventId}`, { withCredentials: true });
    console.log('Event deleted successfully');

    alert('Event successfully deleted!');
    window.location.href = `/`;
  } catch (error) {
    console.error('Error during request:', error);
    alert('Failed to complete the request. Please try again.');
  } finally {
    isLoading.value = false;
  }
};

const cancel = () => {
  window.history.back();
};
</script>

<style scoped>
/* 전체 컨테이너 */
.login-container {
  display: flex;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  min-height: 380px;
  padding: 30px 150px;
  padding-top: 105px;
}

/* 배너 영역 */
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

.banner {
  text-align: left;
}

.banner-text1 {
  color: #4457ff;
  font-size: 16px;
  font-weight: 400;
  margin: 0px;
}

.banner-title {
  color: #333;
  font-size: 40px;
  font-weight: bold;
}

.banner-text2 {
  color: #5f687a;
  font-size: 16px;
  font-weight: 400;
}

/* 폼 영역 */
.create-form {
  flex: 1;
  padding: 40px;
  padding-top: 20px;
  padding-bottom: 0px;
  max-width: 720px;
  align-content: center;
  margin-top: 40px;
  border: 1px solid #e5ecf8;
  border-radius: 24px;
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

.form-group select {
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 24px;
  box-sizing: border-box;
}

.notice-text {
  width: 100%;
  font-size: 16px;
}

/* 하단 안내문구 */
.agreement-container {
  text-align: center;
  margin-top: 20px;
}

/* 버튼 */
.delete-button {
  background-color: #e84a4a;
  width: 100%;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 15px 40px;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Delete 버튼 비활성화 스타일 */
.delete-button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}

.delete-button:hover:not(:disabled) {
  background-color: #dd2d2d;
}

.cancel-button {
  background-color: #4a68ff;
  width: 100%;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 15px 40px;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button:hover {
  background-color: #4457ff;
}

/* 반응형 */
@media screen and (max-width: 768px) {
  .login-container {
    flex-direction: column;
    padding: 20px;
    margin-top: 50px;
  }

  .create-image {
    width: 100%;
    height: auto;
    padding: 20px 0;
    text-align: center;
  }

  .create-form {
    width: 100%;
    padding: 20px;
    border-radius: 12px;
  }

  .banner {
    text-align: center;
    padding: 20px 5px;
    margin-top: 50px;
  }

  .banner-title {
    font-size: 36px;
    font-weight: bold;
    color: #333;
    margin: 10px 0;
  }

  .banner-text2 {
    font-size: 14px;
    color: #5f687a;
    line-height: 1.5;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group select {
    width: 100%;
    height: 50px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 16px;
    padding: 5px 10px;
    box-sizing: border-box;
  }
}
</style>

<template>
  <!-- banner -->
  <div class="banner">
    <p class="banner-title">Review</p>
    <p class="banner-text2">It is the first step in your new life in Korea. Enjoy!</p>
  </div>
  <div class="login-container">
    <div class="create-form">
      <form @submit.prevent="reviewEvent">
        <div class="form-group">
          <label for="">Please rate a star</label>
          <div class="star-rating">
            <div class="stars-container">
              <span v-for="star in 5" :key="star" class="star-container">
                <span @mouseover="hoverRating = star - 0.5" @mouseleave="hoverRating = 0" @click="setRating(star - 0.5)"
                  class="star-half left-half"></span>
                <span @click="setRating(star)" @mouseover="hoverRating = star" @mouseleave="hoverRating = 0"
                  class="star-half right-half"></span>

                <!-- 실제 별 표시 (겹쳐서 보여짐) -->
                <i :class="getStarClass(star)" class="star-icon"></i>
              </span>
            </div>
            <span class="rating-value">{{ form.rating.toFixed(1) }} / 5</span>
          </div>
        </div>

        <div class="form-group">
          <label for="details">Review Text</label>
          <div class="editor-container">
            <EditorContent v-if="editor" :editor="editor" class="editor" />
          </div>
        </div>

        <button type="submit" class="join-now-button-op2">Submit Review</button>
      </form>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import { useRouter } from 'vue-router';

const eventId = parseInt(window.location.pathname.split('/').pop());// 🔥 eventId를 ref로 저장
// 🔥 URL에서 이벤트 ID 가져오기

const form = ref({
  rating: 0,
  comment: '',
});

const hoverRating = ref(0);
const editor = ref(null);
const router = useRouter();

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      form.value.reviewText = editor.getHTML();
    },
  });
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

const setRating = (value) => {
  form.value.rating = value;
};
// 별의 클래스를 결정하는 함수
const getStarClass = (position) => {
  // 현재 평가 중인 실제 별점 값 (hover 중이면 hover 값, 아니면 설정된 값)
  const rating = hoverRating.value || form.value.rating;

  if (rating >= position) {
    return 'fas fa-star full'; // 꽉 찬 별
  } else if (rating >= position - 0.5) {
    return 'fas fa-star-half-alt half'; // 반 별
  } else {
    return 'far fa-star empty'; // 빈 별
  }
};

const reviewEvent = async () => {
  try {
    if (form.value.rating === 0) {
      alert('Please provide a rating.');
      return;
    }
    // comment가 선택사항이라면 제거
    /*if (!form.value.reviewText.trim()) {
      alert('Please write a review.');
      return;
    }*/

    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      alert('Login is required.');
      window.location.href = `/logIn/`;
      return;
    }

    const reviewData = {
      userId,
      eventId,
      rating: form.value.rating,
      comment: form.value.reviewText || '', // comment가 선택사항이라면 빈 문자열로 설정
    };

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/reviews/submit`,
      reviewData,
      { withCredentials: true }
    );

    console.log('✅ [SUCCESS] Review submitted:', response.data);
    alert('Review submitted successfully!');
    await router.push(`/events/${eventId}`);
  } catch (error) {
    console.error('❌ [ERROR] Failed to submit review:', error);
    if (error.response) {
      console.error('📌 [ERROR RESPONSE] Status:', error.response.status);
      console.error('📌 [ERROR RESPONSE] Data:', error.response.data);
      if (error.response.status === 401) {
        alert('Login is required.');
        window.location.href = `/logIn/`;
      }
    } else {
      alert('Failed to submit review. Please try again.');
    }
    Object.keys(form.value).forEach((key) => {
      form.value[key] = "";
    });
  }

};
</script>

<!-- css -->
<style scoped>
/* 반응형 모바일 css */
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
    font-size: 36px;
    font-weight: bold;
    color: #333;
    margin: 10px 0;
  }

  .banner-text2 {
    font-size: 14px;
    color: #5F687A;
    line-height: 1.5;
  }

  .star-rating {
    display: flex;
    flex-direction: center;
    align-items: center;
    margin: 20px 0;
  }

  .star-container {
    position: relative;
    cursor: pointer;
    display: inline-block;
    height: 24px;
    margin-right: 10px;
    width: 24px;
    /* 별 하나의 너비 정의 */
  }

  .stars-container {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    margin-bottom: 15px;
  }

  .star-icon {
    font-size: 30px;
    color: #FFD700;
    position: relative;
    z-index: 1;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .star-half {
    height: 24px;
    position: absolute;
    z-index: 3;
    cursor: pointer;
    opacity: 0;
    top: 0;
  }

  .left-half {
    left: 0;
    width: 12px;
  }

  .right-half {
    left: 12px;
    width: 12px;
  }

  .rating-value {
    margin-left: 20px;
    font-size: 15px;
    font-weight: bold;
  }

  .sub-icon {
    display: none;
  }

  .sub-title {
    font-size: 24px;
    font-weight: 600;
  }

  /* 폼 그룹 */
  .form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
    overflow: hidden;

  }

  .form-group .editor-container {
    width: 600px;
    max-width: 100%;
    height: 150px;
    max-height: 150px;
    overflow: hidden;
  }

  .form-group label {
    font-size: 14px;
  }

  .form-group p {
    font-size: 12px;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    font-size: 14px;
    box-sizing: border-box;
    display: block;
  }

  .form-group textarea {
    height: 150px;
  }

  .form-group input[type="file"] {
    padding: 5px;
    font-size: 14px;
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
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border-radius: 24px;
    margin-top: 10px;
    background-color: #4457FF;
    border: 1px solid #4457FF;
    color: #FFFFFF;
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

  /* 제출 버튼 */

  .join-now-button-op2 {
    background-color: #4a68ff;
    color: white;
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

  .join-now-button-op2:disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;
  }

  .join-now-button-op2:hover:not(:disabled) {
    background-color: #4457FF;
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
@media screen and (min-width:769px) {

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
    padding: 25px 150px;
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

  /* 방생성 */
  .login-container {
    display: flex;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    min-height: 680px;
    padding: 30px 150px;
  }

  .create-form {
    text-align: center;
    padding: 40px;
    padding-top: 20px;
    padding-bottom: 0px;
    max-width: 600px;
    align-content: center;
    margin: 40px auto;
    border: 1px solid #E5ECF8;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }

  .form-group .editor-container {
    width: 600px;
    max-width: 100%;
    height: 150px;
    max-height: 150px;
    overflow: hidden;
  }

  .form-group label {
    display: block;
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 500;
  }

  .form-group p {
    font-size: 12px;
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

  .form-group .text {
    font-size: 16px;
    color: #555;
  }

  .form-group .plus {
    font-size: 14px;
    color: #555;
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

  .btn-primary {
    background-color: #4457FF;
    color: #fff;
    border: none;
    padding: 10px;
    width: 100%;
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
    min-height: 360px;
  }

  .ipnut-question {
    height: 120px !important;
    padding: 15px !important;
  }

  /* 컨테이너 스타일 */
  .agreement-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 20px;
    font-family: Arial, sans-serif;
    padding-top: 30px;
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

  .editor {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    width: 600px;
    max-width: 100%;
    height: 150px;
    min-height: 150px;
    max-height: 150px;
    overflow-x: hidden;
    overflow-y: auto;
    margin-bottom: 20px;
    resize: none;
    word-wrap: break-word;
    /* 긴 단어 줄바꿈 */
    white-space: normal;
    /* 텍스트 줄바꿈 허용 */
    margin: 0 auto;
    box-sizing: border-box;

  }

  .editor .ProseMirror {
    outline: none;
    height: 100%;
    max-height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    word-wrap: break-word;
  }

  .star-rating {
    display: flex;
    flex-direction: center;
    align-items: center;
    margin: 20px 0;
  }

  .star-container {
    position: relative;
    cursor: pointer;
    display: inline-block;
    height: 24px;
    margin-right: 10px;
    width: 24px;
    /* 별 하나의 너비 정의 */
  }

  .stars-container {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    margin-bottom: 15px;
  }

  .star-icon {
    font-size: 30px;
    color: #FFD700;
    position: relative;
    z-index: 1;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .star-half {
    height: 24px;
    position: absolute;
    z-index: 3;
    cursor: pointer;
    opacity: 0;
    top: 0;
  }

  .left-half {
    left: 0;
    width: 12px;
  }

  .right-half {
    left: 12px;
    width: 12px;
  }

  .rating-value {
    margin-left: 20px;
    font-size: 15px;
    font-weight: bold;
  }

}
</style>
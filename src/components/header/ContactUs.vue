<template>
  <div class="login-container">
    <div class="create-image">
      <div class="banner">
        <p class="banner-text1">Contact us</p>
        <p class="banner-title">Get in touch</p>
        <p class="banner-text2">
          If you have any questions or concerns, <br> feel free to reach out anytime! <br>
          Looking to connect your brand with the right audience? <br>
          Get in touch with us today!
        </p>
      </div>
    </div>

    <div class="create-form">
      <form @submit.prevent="sendMessage">

        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" v-model="form.title" required />
        </div>

        <div class="form-group">
          <div class="row half-input-row">
            <div class="col-6">
              <label for="phone">Phone number</label>
              <input type="tel" id="phone" v-model="form.phone" required />
            </div>
            <div class="col-6">
              <label for="email">Email address</label>
              <input type="email" id="email" v-model="form.email" required />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="file">File</label>
          <input type="file" id="file" @change="handleFileUpload" />
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>

        <div class="agreement-container">
          <label class="agreement-label">
            We will reply to you through the email <br /> address you are using for HiFor.
          </label>
          <button class="join-now-button" type="submit">Send message</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// 폼 데이터 초기화
const form = ref({
  title: "",
  phone: "",
  email: "",
  message: "",
  file: null,
});

// 파일 업로드 처리
const handleFileUpload = (event) => {
  form.value.file = event.target.files[0];
};

// 메시지 전송
const sendMessage = async () => {
  try {
    // 폼 데이터 객체 생성
    const formData = new FormData();
    formData.append("title", form.value.title);
    formData.append("phone", form.value.phone);
    formData.append("email", form.value.email);
    formData.append("message", form.value.message);
    if (form.value.file) {
      formData.append("file", form.value.file);
    }

// 백엔드로 요청 보내기
    const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/mail/contactUs`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // 인증 정보를 포함
        }
    );


    // 성공 처리
    alert("Your message has been sent successfully!");
    console.log(response.data);
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to send your message. Please try again.");
  }
};
</script>



<!-- css -->
<style scoped>
/* 반응형 모바일 css */
@media screen and (max-width:768px){
  /* 헤더 */
  .header-space {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
  }
  .header-logo {
    flex: 1;
    text-align: left;
  }
  .logo-hifor {
    width: 80px;
  }
  .header-nav {
    flex: 2;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
  }
  .header-nav-text,
  .header-nav-btn {
    font-size: 14px;
    padding: 5px 10px;
  }

  /* 로그인 컨테이너 */
  .login-container {
    flex-direction: column;
    padding: 20px;
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

  /* 폼 그룹 */
  .form-group {
    margin-bottom: 15px;
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
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 10px;
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

  /* 파일 업로드 */
  .form-group input[type="file"] {
    padding: 5px;
    font-size: 14px;
  }

  /* 하단 텍스트 */
  .agreement-label {
    width: 100%;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
  }
}
/* 웹 */
@media screen and (min-width:769px){
  /* header */
  .header-space{
    padding: 15px;
    max-width: 100%;
    width: 100%;
    justify-self: center;
  }
  .header-logo{
    max-width: 50%;
    font-size: 28px;
    font-weight: bold;
    color: #58C3FF;
  }
  .logo-hifor{
    width: 100px;
    margin-top: -20px;
  }
  .header-nav{
    max-width: 50%;
    text-align: right;
  }
  .header-nav-text{
    font-size: 18px;
    color: #58C3FF;
    padding: 15px;
    text-decoration: none;
    opacity: 1;
    transition: all 0.3s ease;
  }
  .header-nav-text:hover{
    font-size: 18px;
    color: #58C3FF;
    padding: 15px;
    text-decoration: none;
    opacity: 1;
    font-weight: 700;
  }
  .header-nav-btn{
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
  .header-nav-btn:hover{
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
  .banner{
    text-align: left;
  }
  .banner-text1{
    color: #4457FF;
    font-size: 16px;
    font-weight: 400;
    margin: 0px;
  }
  .banner-text2{
    color: #5F687A;
    font-size: 16px;
    font-weight: 400;
  }
  .banner-title{
    color: #333;
    font-size: 54px;
    font-weight: bold;
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
    padding-top: 105px;
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
    height: 250px;
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
    padding: 40px 0px;
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
    text-align: center;
  }
  .sub-title{
    font-size: 30px;
    font-weight: 600;
  }
  .sub-text{
    color: #5F687A;
  }
  .ipnut-question{
    height: 240px !important;
    padding: 15px !important;
  }

  .agreement-label {
    font-size: 16px;
    color: #6c757d;
    margin-bottom: 20px;
    text-align: center;
    width: 100%;
  }

}
</style>
`
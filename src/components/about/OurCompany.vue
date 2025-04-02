
<template>

<!-- 헤더 -->
  <header>
    <div class="Web">
      <!-- 메페,올이벤트 헤더-->
      <header class="header">
        <div class="logo">
          <router-link class="header-nav-text" to="/">
            <img class="logo-hifor" src="/assets/img/logo_HiFor.png" alt="">
          </router-link>
        </div>
        <!-- PC 네비게이션 메뉴 -->
        <nav class="nav-links">
          <ul>
            <li class="li-text-op1"><router-link to="/">Home</router-link></li>
            <li class="li-text-op1"><router-link to="/allEvents">Events</router-link></li>
            <li class="li-text-op1"><router-link to="/fnq">Help</router-link></li>
            <li class="li-text-op1"><router-link to="/notice">Blogs</router-link></li>
            <li class="li-btn-op1"><router-link to="/logIn">SignIn / SignUp</router-link></li>
            <!-- 로그인 시 -->
            <!-- <li class="li-btn-op1"><router-link to="/">Create Event</router-link></li>
            <li class="li-btn-op1"><router-link to="/">My Page</router-link></li>
            <li class="li-btn-op1"><router-link to="/">logout</router-link></li> -->
          </ul>
        </nav>
      </header>

      <!-- 나머지 헤더-->
      <header class="header">
        <div class="logo">
          <router-link class="header-nav-text" to="/">
            <img class="logo-hifor" src="/assets/img/logo_HiFor.png" alt="">
          </router-link>
        </div>
        <!-- PC 네비게이션 메뉴 -->
        <nav class="nav-links">
          <ul>
            <li class="li-text-op1"><router-link to="/">Home</router-link></li>
            <li class="li-text-op1"><router-link to="/allEvents">Events</router-link></li>
            <li class="li-text-op1"><router-link to="/fnq">Help</router-link></li>
            <li class="li-text-op1"><router-link to="/notice">Blogs</router-link></li>
            <li class="li-btn-op1"><router-link to="/logIn">SignIn / SignUp</router-link></li>
            <!-- 로그인 시 -->
            <!-- <li class="li-btn-op1"><router-link to="/">Create Event</router-link></li>
            <li class="li-btn-op1"><router-link to="/">My Page</router-link></li>
            <li class="li-btn-op1"><router-link to="/">logout</router-link></li> -->
          </ul>
        </nav>
      </header>
    </div>
    
    <div class="Mobile">
      <header class="header">
        <div class="logo">
          <router-link class="header-nav-text" to="/">
            <img class="logo-hifor" src="/assets/img/logo_HiFor.png" alt="">
          </router-link>
        </div>
        <!-- 햄버거 메뉴 버튼 (모바일) -->
        <button class="hamburger" @click="toggleMenu">
          ☰
        </button>
        <!-- 모바일 네비게이션 메뉴 -->
        <div class="mobile-menu" :class="{ 'active': isMenuOpen }">
          <button class="close-btn" @click="toggleMenu">✖</button>
          <ul>
            <li><router-link to="/" @click="toggleMenu">Home</router-link></li>
            <li><router-link to="/allEvents" @click="toggleMenu">All Events</router-link></li>
            <li><router-link to="/fnq" @click="toggleMenu">Help</router-link></li>
            <li><router-link to="/notice" @click="toggleMenu">Blogs</router-link></li>
            <li class="li-btn-op1"><router-link to="/logIn">SignIn / SignUp</router-link></li>
            <!-- 로그인 시 -->
            <!-- <li class="li-btn-op1"><router-link to="/">Create Event</router-link></li>
            <li class="li-btn-op1"><router-link to="/">My Page</router-link></li>
            <li class="li-btn-op1"><router-link to="/">logout</router-link></li> -->
          </ul>
        </div>
      </header>
    </div>

  </header>

<!-- 푸터 -->
  <footer>

    <!-- Web -->
    <div class="Web">
      <div class="row footer-space">
        <div class="col-12">
          <p class="footer-logo">HiFor.</p>
        </div>
        <div class="col-12">
          <!-- Buttons -->
          <div class="button-row">
            <button class="cta-button primary-button">Create Event</button>
            <button class="cta-button secondary-button">Browse Events</button>
          </div>
        </div>
        <div class="follow-us">
          <p class="footer-text">Follow us</p>
          <div class="row follow-row">
            <a class="follow-instagram" href="https://www.instagram.com/hifor.official?igsh=c3NxNzl6MTllaHY4&utm_source=qr">
              <img src="/assets/img/icon_Instagram.png" alt=""> Instagram
            </a>
            <a class="follow-facebook" href="">
              <img src="/assets/img/icon_Facebook.png" alt=""> Facebook
            </a>
            <a class="follow-kakao" href="https://open.kakao.com/o/g2LzoHah">
              <img src="/assets/img/icon_KakaoTalk.png" alt=""> KakaoTalk
            </a>
          </div>
        </div>
        <div class="newsletter-container">
          <div class="row newsletter-box">
            <div class="col-6 newsletter-content">
              <div class="newsletter-icon">
                <img src="/assets/img/icon_SendMail.png" alt="" />
              </div>
              <div>
                <h3 class="newsletter-title">Stay Ahead with Our Latest Updates!</h3>
                <p class="newsletter-description">
                  Receive the latest updates and exclusive benefits. <br>
                  Be the first to know and never miss out!
                </p>
              </div>
            </div>
            <div class="col-6 newsletter-input-container">
              <input
                  v-model="email"
                  type="email"
                  class="newsletter-input"
                  placeholder="Enter your email..."
              />
              <button class="newsletter-button" @click="subscribe">Subscribe</button>
            </div>
          </div>
        </div>
        <p class="copyright">Copyright © HiFor.</p>
      </div>
    </div>

    <!-- Mobile -->


  </footer>

</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

// 햄버거 메뉴 토글 함수
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

</script>

<style scoped>
/* 공동요소 */
a{
  text-decoration: none;
  color: unset;
}
/* 헤더 스타일 */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: #ffffff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

/* 로고 스타일 */
.logo-hifor {
  width: 81px;
}

/* PC 네비게이션 메뉴 */
.nav-links ul {
  display: flex;
  list-style: none;
  margin: 0px;
}
.nav-links .li-text-op1 {
  padding: 5px 10px;
  color: #58C3FF;
  font-weight: 400;
  padding-left: 0px;
  margin-right: 10px;
}
.nav-links .li-text-op1 a {
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  color: #58C3FF;
  transition: all 0.3s ease;
}
.nav-links .li-text-op1 a:hover {
  font-weight: bold;
}
.nav-links .li-btn-op1 {
  padding: 5px 10px;
  border: 1px solid #58C3FF;
  border-radius: 24px;
  font-size: 18px;
  font-weight: 500;
  color: #58C3FF;
  transition: all 0.3s ease;
  margin-right: 10px;
}
.nav-links .li-btn-op1:hover {
  border: 1px solid #58C3FF;
  background-color: #58C3FF;
  color: #ffffff;
}

/* 햄버거 버튼 (모바일) */
.hamburger {
  display: none;
  color: #58C3FF;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

/* 모바일 메뉴 */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 250px;
  height: 100vh;
  background: #d8f1ff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  transition: right 0.3s ease-in-out;
}

.mobile-menu.active {
  right: 0;
}

/* 모바일 메뉴 닫기 버튼 */
.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  color: #58C3FF;
  background: none;
  border: none;
  cursor: pointer;
}

/* 모바일 메뉴 항목 */
.mobile-menu ul {
  list-style: none;
  padding: 0;
  text-align: center;
}

.mobile-menu li {
  margin: 20px 0;
}

.mobile-menu a {
  text-decoration: none;
  color: #58C3FF;
  font-size: 18px;
  font-weight: 500;
}

/* 반응형 모바일 css */
@media screen and (max-width:968px){
  .Web{display: none;}
  .Mobile{display: block;}

  /* 헤더 */
  .nav-links {
    display: none; /* PC 메뉴 숨김 */
  }

  .hamburger {
    display: block; /* 햄버거 버튼 활성화 */
  }

  .mobile-menu .li-btn-op1 {
    padding: 5px 10px;
    border: 1px solid #58C3FF;
    border-radius: 24px;
    font-size: 18px;
    font-weight: 500;
    color: #58C3FF;
    transition: all 0.3s ease;
    margin: 20px 0px;
  }

  /* 푸터 */
  .footer-space{
    margin-top: 60px;
    background-color: #58c2ff2e;
    text-align: center;
    width: 100%;
    justify-self: center;
  }
  .footer-logo{
    width: 81px;
    margin: 20px 0px;
  }
  .create-button{
    margin-bottom: 10px;
    width: 160px;
    padding: 10px;
    border: 1px solid #58C3FF;
    border-radius: 24px;
    font-size: 18px;
    font-weight: 500;
    color: #58C3FF;
    background-color: #FFFFFF;
    transition: all 0.3s ease;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  .allevent-button{
    margin-bottom: 20px;
    width: 160px;
    padding: 10px;
    border: 1px solid #58C3FF;
    border-radius: 24px;
    font-size: 18px;
    font-weight: 500;
    color: #FFFFFF;
    background-color: #58C3FF;
    transition: all 0.3s ease;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  .footer-text{
    margin: 5px;
    font-size: 18px;
    color: #555;
  }
  .follow-instagram{
    margin-bottom: 10px;
    color: #555;
    font-size: 14px;
  }
  .follow-instagram img{
    width: 20px;
  }
  .follow-facebook{
    margin-bottom: 10px;
    color: #555;
    font-size: 14px;
  }
  .follow-facebook img{
    width: 20px;
  }
  .follow-kakao{
    margin-bottom: 20px;
    color: #555;
    font-size: 14px;
  }
  .follow-kakao img{
    width: 20px;
  }
  .newsletter-container{
    padding: 0px 30px;
  }
  .newsletter-box{
    width: 100%;
    align-items: center;
    justify-self: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .newsletter-box img{
    width: 38px;
    height: 38px;
    padding: 0px;
    margin-right: 5px;
  }
  .newsletter-title{
    width: max-content;
    text-align: left;
    font-size: 18px;
    margin: 0px;
  }
  .newsletter-input-container input{
    padding: 10px 15px;
    border-radius: 30px;
    border: none;
    outline: none;
    font-size: 12px;
    margin-top: 10px;
  }
  .newsletter-button{
    padding: 10px;
    margin-left: 5px;
    background-color: #8ad3ff;
    color: #FFFFFF;
    border-radius: 30px;
    border: none;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
  }
  .copyright{
    font-size: 10px;
  }

}


/* 웹 */
@media screen and (min-width:969px){
  .Web{display: block;}
  .Mobile{display: none;}

  /* 푸터 */
  .footer-space {
    margin-top: 60px;
    background-color: #58c2ff2e;
  }

  .footer-logo {
    margin-bottom: 0px;
    margin-top: 40px;
    font-size: 39px;
    font-weight: bold;
    padding: 0px 150px;
    color: #58C3FF;
    align-content: center;
    text-align: center;
  }

  .follow-us {
    padding: 40px 150px;
  }

  .footer-text {
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: #555;
  }

  .follow-row {
    justify-content: center;
  }

  .follow-instagram {
    width: 125px;
    text-align: left;
    color: #555;
    font-size: 16px;
    font-weight: 300;
  }

  .follow-facebook {
    width: 125px;
    text-align: left;
    color: #555;
    font-size: 16px;
    font-weight: 300;
  }

  .follow-kakao {
    width: 125px;
    text-align: left;
    color: #555;
    font-size: 16px;
    font-weight: 300;
  }

  .newsletter-container {
    padding: 30px 150px;
    justify-items: center;
  }

  .newsletter-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    background-color: #58c2ff8c;
    border-radius: 24px;
    padding: 30px;
  }

  /* 뉴스레터 아이콘 및 텍스트 */
  .newsletter-content {
    display: flex;
    align-items: center;
    gap: 15px;
    flex: 1;
  }

  .newsletter-icon img {
    width: 50px;
    height: 50px;
  }

  .newsletter-title {
    font-size: 18px;
    font-weight: bold;
    color: #FFFFFF;
  }

  .newsletter-description {
    font-size: 14px;
    margin: 0;
    color: #FFFFFF;
    font-weight: 300;
    line-height: 18px;
  }

  /* 입력 필드 및 버튼 */
  .newsletter-input-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .newsletter-input {
    flex: 1;
    padding: 10px 15px;
    border-radius: 30px;
    border: none;
    outline: none;
    font-size: 14px;
  }

  .newsletter-button {
    padding: 10px 20px;
    background-color: white;
    color: #58C3FF;
    border-radius: 30px;
    border: none;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .newsletter-button:hover {
    background-color: #58C3FF;
    color: #FFFFFF;
  }

  .copyright {
    padding: 15px 150px;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: #555;
  }

  .button-row {
    text-align: center;
    padding: 30px;
  }

  .primary-button {
    width: 155px;
    height: 58px;
    border-radius: 100px;
    background-color: #58C3FF;
    color: white;
    border: none;
    margin-right: 10px;
    transition: all 0.3s ease;
  }

  .primary-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .secondary-button {
    width: 155px;
    height: 58px;
    background-color: #FFFFFF;
    border: 1.5px solid #58C3FF;
    border-radius: 100px;
    color: #58C3FF;
    margin-left: 10px;
    transition: all 0.3s ease;
  }

  .secondary-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

}


</style>

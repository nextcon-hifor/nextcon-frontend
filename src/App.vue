<template>

  <!-- Web -->
  <div class="Web" id="app">
    <!-- 헤더 영역 -->
    <header v-if="!$route.meta.hideHeaderFooter">
      <!-- 헤더 -->
      <!-- 메페,올이벤트 헤더-->
      <div v-if="$route.meta.mainHeader" class="row header-space-main">
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
              <!-- <li class="li-text-op1"><router-link to="/notice">Blogs</router-link></li> -->
              <li class="li-btn-op1" v-if="isLoggedIn"><router-link to="/postEvent">Create Event</router-link></li>
              <li class="li-btn-op1" v-if="!isLoggedIn"><router-link to="/logIn">SignIn / SignUp</router-link></li>
              <!-- 프로필 드롭다운 수정된 부분 -->
              <li v-if="isLoggedIn" class="profile-dropdown-container">
                <button type="button" @click="toggleDropdown" class="profile-img-button">
                  <div class="profile-img">
                    <img :src="userProfileImage || '/assets/img/icon_User.png'" alt="Profile">
                  </div>
                </button>
                <!-- 드롭다운 메뉴 -->
                <div v-if="isDropdownOpen" class="dropdown-menu" ref="profileDropdown" style="display: block !important;">
                  <router-link :to="`/userPage/${userId}`" class="dropdown-item">
                    <i class="fas fa-user"></i> My Profile
                  </router-link>
                  <router-link to="/chat" class="dropdown-item">
                    <i class="fas fa-comment"></i> Chatting
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <router-link to="/" @click="logout" class="dropdown-item">
                    <i class="fas fa-sign-out-alt"></i> Log out
                  </router-link>
                </div>
              </li>
            
              <li class="li-btn-op1" v-if="isLoggedIn"><router-link to="/" @click="logout">Log out</router-link></li>
            </ul>
          </nav>
        </header>
      </div>
      <!--나머지 헤더 -->
      <div v-if="!$route.meta.mainHeader" class="row header-space">
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
              <!-- <li class="li-text-op1"><router-link to="/notice">Blogs</router-link></li> -->
              <li class="li-btn-op1" v-if="!isLoggedIn"><router-link to="/logIn">SignIn / SignUp</router-link></li>
               <!-- 로그인 시 -->
              <li class="li-btn-op1" v-if="isLoggedIn"><router-link to="/postEvent">Create Event</router-link></li>
              <!-- 두 번째 헤더에도 동일한 프로필 드롭다운 적용 -->
              <!-- 프로필 드롭다운 수정된 부분 -->
              <li v-if="isLoggedIn" class="profile-dropdown-container">
                <button type="button" @click="toggleDropdown" class="profile-img-button">
                  <div class="profile-img">
                    <img :src="userProfileImage || '/assets/img/icon_User.png'" alt="Profile">
                  </div>
                </button>
                <!-- 드롭다운 메뉴 -->
                <div v-if="isDropdownOpen" class="dropdown-menu" ref="profileDropdown" style="display: block !important;">
                  <router-link :to="`/userPage/${userId}`" class="dropdown-item">
                    <i class="fas fa-user"></i> My Profile
                  </router-link>
                  <router-link to="/chat" class="dropdown-item">
                    <i class="fas fa-comment"></i> Chatting
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <router-link to="/" @click="logout" class="dropdown-item">
                    <i class="fas fa-sign-out-alt"></i> Log out
                  </router-link>
                </div>
              </li>
              <li class="li-btn-op1" v-if="isLoggedIn"><router-link to="/" @click="logout">Log out</router-link></li>
            </ul>
          </nav>
        </header>
      </div>
    </header>

    <!-- 라우터 뷰 -->
    <router-view :key="$route.fullPath" />

    <!-- 푸터 영역 -->
    <footer v-if="!$route.meta.hideHeaderFooter">
      <!-- 푸터 -->
      <div class="row footer-space">
        <div class="col-12">
          <p class="footer-logo">HiFor</p>
        </div>
        <div class="col-12">
          <!-- Buttons -->
          <div class="button-row">
            <button v-if="isLoggedIn" class="wc-btn primary-button">
              <router-link to="/postEvent">
                Create Event
              </router-link>
            </button>
            <button v-else class="wc-btn primary-button">
              <router-link to="/logIn">
                Create Event
              </router-link>
            </button>
            <button class="cta-button secondary-button wc-btn"><router-link to="/allEvents">Browse
                Events</router-link></button>
          </div>
        </div>
        <div class="follow-us">
          <p class="footer-text">Follow us</p>
          <div class="row follow-row">
            <a class="follow-instagram" href="https://www.instagram.com/">
              <img src="/assets/img/icon_Instagram.png" alt=""> Instagram
            </a>
            <a class="follow-facebook" href="https://www.facebook.com/">
              <img src="/assets/img/icon_Facebook.png" alt=""> Facebook
            </a>
            <a class="follow-kakao" href="https://open.kakao.com/">
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
              <input v-model="email" type="email" class="newsletter-input" placeholder="Enter your email..." />
              <button class="newsletter-button" @click="subscribe">Subscribe</button>
            </div>
          </div>
        </div>
        <p class="copyright">Copyright © HiFor.</p>
      </div>
    </footer>
  </div>

  <!-- Mobile -->
  <div class="Mobile" id="app">
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
          <!-- <li><router-link to="/notice" @click="toggleMenu">Blogs</router-link></li> -->
          <li class="li-btn-op1" v-if="!isLoggedIn"><router-link to="/logIn">SignIn / SignUp</router-link></li>
          <!-- 로그인 시 -->
          <li class="li-btn-op1" v-if="isLoggedIn"><router-link to="/postEvent">Create Event</router-link></li>
          <li class="li-btn-op1" v-if="isLoggedIn"><router-link to="/chat">Chatting</router-link></li>
          <li class="li-btn-op1" v-if="isLoggedIn"><router-link :to="`/userPage/${userId}`">My Page</router-link></li>
          <li class="li-btn-op1" v-if="isLoggedIn"><router-link to="/" @click="logout">Log out</router-link></li>
        </ul>
      </div>
    </header>
    <router-view></router-view>
    <!-- 푸터 -->
    <div class="row footer-space">
      <div class="col-12">
        <img class="footer-logo" src="/assets/img/logo_HiFor.png">
      </div>
      <!-- Buttons -->

      <div v-if="isLoggedIn" class="create-button-box">
        <router-link class="create-button" to="/postEvent">
          Create Event
        </router-link>
      </div>
      <div v-else class="create-button-box">
        <router-link class="create-button" to="/logIn">
          Create Event
        </router-link>
      </div>
      <div class="allevent-button-box">
        <router-link class="allevent-button" to="/allEvents">Browse Events</router-link>
      </div>

      <div class="col-12 follow-us">
        <div class="row follow-row">
          <a class="follow-instagram" href="https://www.instagram.com/">
            <img src="/assets/img/icon_Instagram.png" alt=""> Instagram
          </a>
          <a class="follow-facebook" href="https://www.facebook.com/">
            <img src="/assets/img/icon_Facebook.png" alt=""> Facebook
          </a>
          <a class="follow-kakao" href="https://open.kakao.com/">
            <img src="/assets/img/icon_KakaoTalk.png" alt=""> KakaoTalk
          </a>
        </div>
      </div>
      <div class="newsletter-container">
        <div class="row newsletter-box">
          <div class="col-12 newsletter-input-container">
            <img src="/assets/img/icon_SendMail.png" alt="" />
            <input v-model="email" type="email" class="newsletter-input" placeholder="Enter your email..." />
            <button class="newsletter-button" @click="subscribe">Subscribe</button>
          </div>
        </div>
      </div>
      <p class="copyright">Copyright © HiFor.</p>
    </div>
  </div>

</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';
import "dropzone/dist/dropzone.css";

export default {
  name: "App", // 컴포넌트 이름 추가
  setup() {
    const store = useStore();
    const router = useRouter();

    // Vuex Getters
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    const userId = computed(() => store.getters.userId);
    // 추가된 상태 변수들
    const profileDropdown = ref(null);
    const isDropdownOpen = ref(false);
    const userProfileImage = ref('');

    // Vuex Mutations
    const clearToken = () => store.commit('clearToken');
    const setToken = (token) => store.commit('setToken', token);
    const setUserId = (id) => store.commit('setUserId', id);

    // Email subscription
    const email = ref('');
    const subscribe = async () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email.value)) {
        alert('Please enter a valid email.');
        return;
      }

      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/events/subscribe`,
          { email: email.value },
          {
            withCredentials: true, // 인증 정보를 포함
          }
        );

        alert('Subscription successful');
        email.value = ''
      } catch (error) {
        console.error('Subscription error:', error);
        alert('Subscription failed. Please try again.');
      }
    };

    // Logout
    const logout = () => {
      clearToken();
      router.push('/');
    };
    const isMenuOpen = ref(false);

    // 햄버거 메뉴 토글 함수
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    // 로그인 상태 확인 및 JWT 저장
    const checkLoginStatus = async () => {

      // ✅ URL에서 access_token 가져오기
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access_token');
      const userId = urlParams.get('userId');// Vuex 상태에 저장

      if (accessToken) {
        // ✅ 세션스토리지에 저장
        sessionStorage.setItem('token', accessToken);
        store.commit('setToken', accessToken);
      }

      if (userId) {
        // ✅ userId도 세션스토리지에 저장
        sessionStorage.setItem('userId', userId);
        store.commit('setUserId', userId);
        // 사용자 ID가 있으면 프로필 이미지를 가져옵니다
        getProfileImage(userId);
        } else if (store.getters.userId) {
        // URL에 userId가 없지만 store에 저장된 userId가 있는 경우
        getProfileImage(store.getters.userId);
        }

        // ✅ URL에서 access_token과 userId를 제거하여 보안 강화
        window.history.replaceState({}, document.title, window.location.pathname);
      };
    // 추가된 함수들
    const toggleDropdown = () => {
      console.log('Toggle dropdown clicked');
      isDropdownOpen.value = !isDropdownOpen.value;
      console.log('isDropdownOpen:', isDropdownOpen.value);
    };

    const handleClickOutside = (event) => {
      // 간소화된 버전
      if (isDropdownOpen.value && !event.target.closest('.profile-dropdown-container')) {
        console.log('Closing dropdown (outside click)');
        isDropdownOpen.value = false;
      }
    };
    // 사용자 프로필 정보 가져오기 함수
    const fetchUserProfile = async (userId) => {
      if (!userId) return;
      
      try {
        console.log('Fetching user profile for userId:', userId);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/getUser/${userId}`,
          {
            withCredentials: true,
          }
        );
        console.log('User profile response:', response.data);
        // 프로필 이미지 업데이트
        if (response.data && response.data.profileImage) {
          console.log('Setting profile image:', response.data.profileImage);
          userProfileImage.value = response.data.profileImage;
        }else {
      console.warn('No profile image found in response');
      }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
    // 프로필 이미지 가져오기 전용 함수
    const getProfileImage = async (userId) => {
      if (!userId) return;
      
      try {
        console.log('Fetching profile image for userId:', userId);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/getUser/${userId}`,
          {
            withCredentials: true,
          }
        );
        
        if (response.data && response.data.profileImage) {
          console.log('Setting profile image:', response.data.profileImage);
          userProfileImage.value = response.data.profileImage;
        } else {
          console.warn('No profile image found in response');
          // 기본 이미지 사용 (이미 HTML에서 ||로 처리되어 있음)
        }
      } catch (error) {
        console.error('Failed to fetch profile image:', error);
      }
    };
    // Lifecycle hook
    onMounted(() => {
      checkLoginStatus();
      document.addEventListener('click', handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });
    return {
      isMenuOpen,
      toggleMenu,
      email,
      isLoggedIn,
      userId,
      subscribe,
      logout,
      isDropdownOpen,
      toggleDropdown,
      profileDropdown,
      userProfileImage,
      getProfileImage
    };
  },
};
</script>

<style scoped>
/* 반응형 모바일 css */
@media screen and (max-width: 768px) {
  .Web {
    display: none;
  }

  .Mobile {
    display: block;
  }
}

/* 웹 */
@media screen and (min-width: 769px) {
  .Web {
    display: block;
  }

  .Mobile {
    display: none;
  }

  /* header */
  .header-space {
    padding: 15px;
    max-width: 100%;
    width: 100%;
    justify-self: center;
  }

  .header-space-main {
    padding: 15px;
    max-width: 100%;
    width: 100%;
    justify-self: center;
    position: absolute;
  }

  .header-logo {
    max-width: 20%;
    font-size: 28px;
    font-weight: bold;
    color: #58C3FF;
  }

  .logo-hifor {
    width: 100px;
    margin-top: -20px;
  }

  .header-nav {
    max-width: 80%;
    text-align: right;
  }

  .header-nav-text {
    font-size: 18px;
    color: #58C3FF;
    text-decoration: none;
    opacity: 1;
    transition: all 0.3s ease;
  }

  .main-page .header-nav-text {
    font-size: 18px;
    color: #FFFFFF;
    padding: 15px;
    text-decoration: none;
    opacity: 1;
    transition: all 0.3s ease;
  }

  .main-page .header-nav-btn {
    font-size: 18px;
    color: #FFFFFF;
    text-decoration: none;
    padding: 10px 15px;
    margin: 0px 5px;
    text-decoration: none;
    border: 1px solid #FFFFFF;
    border-radius: 32px;
    opacity: 1;
    transition: all 0.3s ease;
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

  .main-page .header-nav-btn:hover {
    font-size: 18px;
    color: #FFFFFF;
    text-decoration: none;
    padding: 10px 15px;
    margin: 0px 5px;
    text-decoration: none;
    border: 1px solid #FFFFFF;
    border-radius: 32px;
    opacity: 1;
    font-weight: 700;
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

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    z-index: 1;
    /*다른 요소들보다 앞에 배치*/
    padding-top: 10px;
    background-color: #fff;
  }

  .dropdown-content a {
    display: block;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-icon {
    font-size: 12px;
  }

  .logo {
    font-size: 36px;
    font-weight: bold;
    color: #12CF51;
    padding: 0px 20px;
  }

  .nav-list {
    padding: 0px 20px;
  }

  .nav-sub-list {
    padding: 10px 0px;
    text-align: left
  }

  .btn-op1 {
    text-align: center;
    color: #12CF51;
  }

  .signup-btn {
    border: 1px solid #12CF51;
    border-radius: 24px;
    padding: 10px 20px;
    margin-right: 15px;
  }

  .btn-op1:hover {
    text-align: center;
    color: #fff;
  }

  .signup-btn:hover {
    border: 1px solid #12CF51;
    background-color: #12CF51;
    border-radius: 24px;
    padding: 10px 20px;
    margin-right: 15px;
  }

  .btn-op2 {
    width: 160px;
    text-align: center;
    color: #12CF51;
  }

  .btn-op2:hover {
    width: 160px;
    text-align: center;
    color: #fff;
  }

  .btn-op3 {
    text-align: center;
    color: #fff;
  }

  .mp-btn {
    text-align: center;
    color: #fff;
    border: 1px solid #12CF51;
    background-color: #12CF51;
    border-radius: 24px;
    padding-top: 9px;
    padding-bottom: 11px;
    padding-left: 5px;
    padding-right: 5px;
    z-index: 10;
  }

  .mp-btn:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  .mp-img {
    border-radius: 100%;
    width: 33px;
    height: 33px;
  }


  /* 푸터 */
  .wc-btn {
    width: max-content;
    font-size: 14px;
    border-radius: 100px;
    background-color: #58C3FF;
    color: #FFFFFF;
    border: 1px solid #58C3FF;
    transition: all 0.3s ease;
    padding: 10px 20px;
  }

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

  .follow-youtube {
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

  a {
    text-decoration: none !important;
  }

}

/* 공동요소 */
a {
  text-decoration: none;
  color: unset;
}

/* 헤더 스타일 */
.header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-self: anchor-center;
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
  font-size: 14px;
  font-weight: 500;
  color: #58C3FF;
  transition: all 0.3s ease;
}

.nav-links .li-text-op1 a:hover {
  font-weight: bold;
}

.nav-links .li-btn-op1 {
  padding: 0px 10px !important;
  margin: 0 5px !important;
  border: 1px solid #58C3FF !important;
  border-radius: 24px !important; /* 둥근 모서리 유지 */
  display: inline-flex !important;
  align-items: center !important;
  height: 24px !important; /* 높이 고정 */
  min-height: 0 !important;
  max-height: 24px !important;
  /*padding: 1px 10px;
  border: 1px solid #58C3FF;
  border-radius: 24px;
  font-size: 18px;
  font-weight: 500;
  color: #58C3FF;
  transition: all 0.3s ease;
  margin: 0 3px*/
}
.nav-links .li-btn-op1 a {
  padding: 0 !important;
  margin: 0 !important;
  line-height: 1 !important;
  font-size: 14px !important;
  display: inline-block !important;
  color: #58C3FF !important; /* 텍스트 색상을 58C3FF로 변경 */
  vertical-align: middle !important; /* 텍스트 수직 정렬 */
}
.nav-links .li-btn-op1:hover {
  border: 1px solid #58C3FF !important;
  background-color: #FFFFFF !important;
}
/* 전체 네비게이션 메뉴 정렬 개선 */
.nav-links ul {
  display: flex !important;
  align-items: center !important; /* 모든 메뉴 항목 수직 중앙 정렬 */
  height: 40px !important; /* 메뉴 전체 높이 설정 */
}

.nav-links li {
  display: flex !important;
  align-items: center !important; /* 내부 요소 중앙 정렬 */
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
@media screen and (max-width:968px) {
  .Web {
    display: none;
  }

  .Mobile {
    display: block;
  }

  /* 헤더 */
  .nav-links {
    display: none;
    /* PC 메뉴 숨김 */
  }

  .header {
    position: fixed;
    top: 0;
    width: 100%;
    background: none;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
  }

  .hamburger {
    display: block;
    /* 햄버거 버튼 활성화 */
  }

  .mobile-menu .li-btn-op1 {
    padding: 5px 10px;
    border: 1px solid #58C3FF;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 500;
    color: #58C3FF;
    transition: all 0.3s ease;
    margin: 20px 0px;
  }

  /* 푸터 */
  .footer-space {
    margin-top: 60px;
    background-color: #58c2ff2e;
    text-align: center;
    width: 100%;
    justify-self: center;
  }

  .footer-logo {
    width: 81px;
    margin: 20px 0px;
  }

  .create-button-box {
    width: 100%;
    height: 50px;
    align-content: center;
  }

  .create-button {
    margin-bottom: 20px;
    width: 160px;
    padding: 10px 20px;
    border: 1px solid #58C3FF;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 500;
    color: #58C3FF;
    background-color: #FFFFFF;
    transition: all 0.3s ease;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .allevent-button-box {
    width: 100%;
    height: 50px;
    align-content: center;
    margin-bottom: 20px;
  }

  .allevent-button {
    margin-bottom: 20px;
    width: 160px;
    padding: 10px 14px;
    border: 1px solid #58C3FF;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
    background-color: #58C3FF;
    transition: all 0.3s ease;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .footer-text {
    margin: 5px;
    font-size: 18px;
    color: #555;
  }

  .follow-instagram {
    margin-bottom: 10px;
    color: #555;
    font-size: 14px;
  }

  .follow-instagram img {
    width: 20px;
  }

  .follow-facebook {
    margin-bottom: 10px;
    color: #555;
    font-size: 14px;
  }

  .follow-facebook img {
    width: 20px;
  }

  .follow-kakao {
    margin-bottom: 20px;
    color: #555;
    font-size: 14px;
  }

  .follow-kakao img {
    width: 20px;
  }

  .newsletter-container {
    padding: 0px 30px;
  }

  .newsletter-box {
    width: 100%;
    align-items: center;
    justify-self: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .newsletter-box img {
    width: 38px;
    height: 38px;
    padding: 0px;
    margin-right: 5px;
  }

  .newsletter-title {
    width: max-content;
    text-align: left;
    font-size: 18px;
    margin: 0px;
  }

  .newsletter-input-container input {
    padding: 10px 15px;
    border-radius: 30px;
    border: none;
    outline: none;
    font-size: 12px;
    margin-top: 10px;
  }

  .newsletter-button {
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

  .copyright {
    font-size: 10px;
  }

}


/* 웹 */
@media screen and (min-width:969px) {
  .Web {
    display: block;
  }

  .Mobile {
    display: none;
  }

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
  .profile-dropdown-container {
  position: relative;
  margin-left: 10px;
}

.profile-dropdown {
  position: relative;
}

.profile-img-button {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 8px;
  background: none;
  border: none;
  outline: none;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #58C3FF;
}

.profile-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 18px;
  height: 18px;
  background-color: #FF5A5A;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  z-index: 1;
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  width: 200px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 9999;
  display: block !important; /* 강제로 표시 */
}

.dropdown-item {
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-divider {
  height: 1px;
  background-color: #eee;
  margin: 8px 0;
}

/* 모바일 프로필 스타일 */
.mobile-profile-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
}

.mobile-profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.mobile-profile-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-profile-info {
  font-weight: bold;
}
@media screen and (max-width: 768px) {
  .profile-dropdown-container {
    display: none; /* 모바일에서는 드롭다운 메뉴 숨김 */
  }
}
}
</style>
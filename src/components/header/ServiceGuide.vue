<template>

  <!-- banner -->
  <div class="banner">
    <p class="banner-text1">SERVICE GUIDES</p>
    <p class="banner-title">Frequently asked questions</p>
    <p class="banner-text2">It is the first step in your new life in Korea. Enjoy!</p>
  </div>

  <!-- F&Q container -->
  <div class="fnq-con">

    <div class="panel-box">

      <div class="sub-title-box">
        <div class="sub-title">
          Features (What We Offer)
        </div>
      </div>
      <div class="accordion-container">
        <div class="accordion-panel">
          <!-- 1 번째 패널 -->
          <div class="accordion-header" @click="togglePanel(0)">
            How do I sign up for HiFor?
            <span class="toggle-icon">{{ openPanels.includes(0) ? '▲' : '▼' }}</span>
          </div>
          <div class="accordion-content" v-show="openPanels.includes(0)">
            <p>
              Super easy! <br>
              <br>
              Just follow these steps: <br>
              <br>
              1. Visit our website or mobile app. <br>
              2. Click the Sign Up button. <br>
              3. Enter your email and password or use your Google account for quick access. <br>
              4. Fill out some basic profile info, and you're all set! <br>
            </p>
          </div>
        </div>

        <div class="accordion-panel">
          <!-- 2 번째 패널 -->
          <div class="accordion-header" @click="togglePanel(1)">
            How can I find a group?
            <span class="toggle-icon">{{ openPanels.includes(1) ? '▲' : '▼' }}</span>
          </div>
          <div class="accordion-content" v-show="openPanels.includes(1)">
            <p>
              Looking for a group? <br>
              <br>
              You can: <br>
              <br>
              • Use the search bar to find something specific. <br>
              • Not sure what to look for? Just browse through the categories and explore freely! <br>

            </p>
          </div>
        </div>

        <div class="accordion-panel">
          <!-- 3 번째 패널 -->
          <div class="accordion-header" @click="togglePanel(2)">
            How do I join a group?
            <span class="toggle-icon">{{ openPanels.includes(2) ? '▲' : '▼' }}</span>
          </div>
          <div class="accordion-content" v-show="openPanels.includes(2)">
            <p>
              Joining a group is simple: <br>
              <br>
              1.	Choose a group you're interested in and click Join Request. <br>
              2.	Answer any questions the host might have (if applicable). <br>
              3.	For approval-required events, the host will review your answers and approve your request.
            </p>
          </div>
        </div>

        <div class="accordion-panel">
          <!-- 4 번째 패널 -->
          <div class="accordion-header" @click="togglePanel(3)">
            How do I pay for group participation fees?
            <span class="toggle-icon">{{ openPanels.includes(3) ? '▲' : '▼' }}</span>
          </div>
          <div class="accordion-content" v-show="openPanels.includes(3)">
            <p>
              Participation fees are paid directly to the host on-site at the event.
            </p>
          </div>
        </div>

        <div class="accordion-panel">
          <!-- 5 번째 패널 -->
          <div class="accordion-header" @click="togglePanel(4)">
            Can I cancel after signing up for an event?
            <span class="toggle-icon">{{ openPanels.includes(4) ? '▲' : '▼' }}</span>
          </div>
          <div class="accordion-content" v-show="openPanels.includes(4)">
            <p>
              Absolutely! <br>
              <br>
              Here's how: <br>
              <br>
              1.	Go to My Groups and select the event you signed up for. <br>
              2.	Click the Cancel Participation button. <br>
              Please note: Cancellations aren’t allowed within 24 hours of the event. If it’s urgent, you’ll need to contact the host directly.

            </p>
          </div>
        </div>

        <div class="accordion-panel">
          <!-- 6 번째 패널 -->
          <div class="accordion-header" @click="togglePanel(5)">
            What happens if a group is canceled?
            <span class="toggle-icon">{{ openPanels.includes(5) ? '▲' : '▼' }}</span>
          </div>
          <div class="accordion-content" v-show="openPanels.includes(5)">
            <p>
              Don’t worry! We’ll notify you right away and keep you updated on any changes.
            </p>
          </div>
        </div>

        <div class="accordion-panel">
          <!-- 7 번째 패널 -->
          <div class="accordion-header" @click="togglePanel(6)">
            How do I become a host?
            <span class="toggle-icon">{{ openPanels.includes(6) ? '▲' : '▼' }}</span>
          </div>
          <div class="accordion-content" v-show="openPanels.includes(6)">
            <p>
              Anyone can be a host! <br>
              1. Complete phone verification. <br>
              2. Start creating events freely—just like that! 🎉

            </p>
          </div>
        </div>

        <div class="accordion-panel">
          <!-- 8 번째 패널 -->
          <div class="accordion-header" @click="togglePanel(7)">
            What do I need to host a group?
            <span class="toggle-icon">{{ openPanels.includes(7) ? '▲' : '▼' }}</span>
          </div>
          <div class="accordion-content" v-show="openPanels.includes(7)">
            <p>
              To host a group, you’ll need: <br>
              <br>
              • A clear topic and purpose. <br>
              • A venue, date, and participant limits. <br>
              • All event info prepped and ready to manage participants and run the event smoothly.
            </p>
          </div>
        </div>

        <div class="accordion-panel">
          <!-- 9 번째 패널 -->
          <div class="accordion-header" @click="togglePanel(8)">
            Can I use HiFor on my phone?
            <span class="toggle-icon">{{ openPanels.includes(8) ? '▲' : '▼' }}</span>
          </div>
          <div class="accordion-content" v-show="openPanels.includes(8)">
            <p>
              Yes! Our platform is optimized for mobile web, and we’re working on launching our app soon—stay tuned!
            </p>
          </div>
        </div>

        <div class="accordion-panel">
          <!-- 10 번째 패널 -->
          <div class="accordion-header" @click="togglePanel(9)">
            What are the benefits of joining events?
            <span class="toggle-icon">{{ openPanels.includes(9) ? '▲' : '▼' }}</span>
          </div>
          <div class="accordion-content" v-show="openPanels.includes(9)">
            <p>
              By joining events, you’ll: <br>
              <br>
              •	Expand your network: Meet new people and build meaningful connections. <br>
              •	Experience culture and language: Learn practical language skills and explore Korean culture hands-on.
            </p>
          </div>
        </div>

      </div>

      <div class="sub-title-box">
        <div class="sub-title">
          Usage (How It Works)
        </div>
      </div>
      <div class="accordion-container">
        <div class="accordion-panel">
          <!-- 11 번째 패널 -->
          <div class="accordion-header" @click="togglePanel(10)">
            What if someone behaves inappropriately?
            <span class="toggle-icon">{{ openPanels.includes(10) ? '▲' : '▼' }}</span>
          </div>
          <div class="accordion-content" v-show="openPanels.includes(10)">
            <p>
              We take safety very seriously. <br>
              If you encounter inappropriate behavior, follow these steps: <br>
              <br>
              1.	Click the Report button in the group chat or event page. <br>
              2.	Choose the type of behavior (e.g., offensive language, inappropriate actions, spam) and describe it in detail. <br>
              3.	Once submitted, our team will review it and take action. If necessary, accounts may be temporarily suspended. <br>
              o Don’t worry—your identity will remain confidential!
            </p>
          </div>
        </div>
      </div>

      <div class="sub-title-box">
        <div class="sub-title">
          Troubleshooting (Need Help?)
        </div>
      </div>
      <div class="accordion-container">

        <div class="accordion-panel">
          <!-- 12 번째 패널 -->
          <div class="accordion-header" @click="togglePanel(11)">
            Is my personal information safe?
            <span class="toggle-icon">{{ openPanels.includes(11) ? '▲' : '▼' }}</span>
          </div>
          <div class="accordion-content" v-show="openPanels.includes(11)">
            <p>
              Absolutely! Here’s how we protect your data: <br>
              <br>
              1. Data encryption: All personal information is securely encrypted. <br>
              2. Security certifications: We comply with global privacy standards. <br>
              3. Access control: Only a limited number of authorized personnel can access your data. <br>
              4. Regular security checks: We conduct routine platform security audits.
            </p>
          </div>
        </div>

        <div class="accordion-panel">
          <!-- 13 번째 패널 -->
          <div class="accordion-header" @click="togglePanel(12)">
            What if I encounter an error while using HiFor?
            <span class="toggle-icon">{{ openPanels.includes(12) ? '▲' : '▼' }}</span>
          </div>
          <div class="accordion-content" v-show="openPanels.includes(12)">
            <p>
              No problem! Try these steps first: <br>
              <br>
              1. Restart the app or browser. <br>
              2. Check your internet connection. <br>
              3. Still stuck? Go to Customer Support and report the issue with as much detail as possible (screenshots help!). <br>
              o Our team is here to support you, and we’ll get back to you within 24 hours. 😊
            </p>
          </div>
        </div>

      </div>

    </div>

  </div>
  <div class="ask-btn-con">
    <router-link to="/ContactUs">
      <button class="btn-primary">1:1 inquiry</button>
    </router-link>
  </div>

</template>

<script setup>
import { ref } from 'vue';

// 열려 있는 패널 인덱스를 저장하는 배열
const openPanels = ref([]);

// 패널 토글 함수
const togglePanel = (index) => {
  if (openPanels.value.includes(index)) {
    openPanels.value = openPanels.value.filter((i) => i !== index);
  } else {
    openPanels.value.push(index);
  }
};
</script>

<style scoped>
/* title banner */
.title-header{
  width: 100%;
  height: 300px;
  text-align: center;
  align-content: center;
}
.title-text{
  margin: 0px;
  font-size: 63px;
  font-weight: bold;
  color: #0ca835;
}
.sub-text{
  font-size: 32px;
}

.sub-title-box{
  width: 100%;
  max-width: 1140px;
  justify-self: center;
  padding-top: 15px;
  border-top: 3px solid #f2f2f2;
}
.sub-title{
  font-size: 28px;
  font-weight: 600;
}

/* content */

.accordion-container {
  width: 100%;
  max-width: 1140px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: Arial, sans-serif;
}

.accordion-panel {
  border-bottom: 1px solid #ccc;
}

.accordion-panel:last-child {
  border-bottom: none;
}

.accordion-header {
  background-color: #58c2ff25;
  padding: 15px 20px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
}

.accordion-header:hover {
  background-color: #4457FF;
  color: #FFFFFF;
}

.accordion-content {
  padding: 15px 20px;
  background-color: #fff;
  font-size: 16px;
  border-top: 1px solid #ccc;
}

/* 토글 아이콘 스타일 */
.toggle-icon {
  font-size: 16px;
}

.ask-btn-con{
  text-align: center;
}

.btn-primary {
  max-width: 240px;
  background-color: #4457FF;
  color: #FFFFFF;
  border: 1px solid #4457FF;
  padding: 10px;
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 96px;
  cursor: pointer;
  margin: 20px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #4457FF;
  color: #FFFFFF;
}


/* 기본 스타일 */
.accordion-container {
  width: 100%;
  max-width: 1140px;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: Arial, sans-serif;
}

.accordion-panel {
  border-bottom: 1px solid #ccc;
}

.accordion-panel:last-child {
  border-bottom: none;
}

.accordion-header {
  background-color: #58c2ff25;
  padding: 15px 20px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
}

.accordion-header:hover {
  background-color: #4457FF;
  color: #FFFFFF;
}

.accordion-content {
  padding: 15px 20px;
  background-color: #fff;
  font-size: 16px;
  border-top: 1px solid #ccc;
}

/* 토글 아이콘 스타일 */
.toggle-icon {
  font-size: 16px;
}

/* 버튼 스타일 */
.ask-btn-con {
  text-align: center;
}

.btn-primary {
  max-width: 240px;
  background-color: #4457FF;
  color: #FFFFFF;
  border: 1px solid #4457FF;
  padding: 10px;
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 96px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #4457FF;
  color: #FFFFFF;
}

/* 배너 스타일 */
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

/* 반응형 스타일 */
@media screen and (max-width: 768px) {
  /* 배너 텍스트 크기 줄이기 */
  .banner {
    padding: 50px 20px;
    margin-top: 50px;
  }

  .banner-title {
    font-size: 32px;
  }

  .banner-text1,
  .banner-text2 {
    font-size: 14px;
  }

  /* 아코디언 패널 여백 및 폰트 크기 조정 */
  .accordion-container {
    margin: 10px auto;
    padding: 0 10px;
  }

  .accordion-header {
    font-size: 16px;
    padding: 10px 15px;
  }

  .accordion-content {
    font-size: 14px;
    padding: 10px 15px;
  }

  /* 버튼 크기 줄이기 */
  .btn-primary {
    max-width: 200px;
    font-size: 14px;
    height: 45px;
  }

  .sub-title{
    font-size: 24px;
    font-weight: 600;
    padding: 0px 15px;
  }
}

@media screen and (max-width: 480px) {
  /* 배너 텍스트 더 작게 */
  .banner-title {
    font-size: 24px;
  }

  .banner-text1,
  .banner-text2 {
    font-size: 12px;
  }

  /* 버튼 더 작게 */
  .btn-primary {
    max-width: 180px;
    font-size: 12px;
    height: 40px;
  }

  /* 아코디언 텍스트 더 작게 */
  .accordion-header {
    font-size: 14px;
  }

  .accordion-content {
    font-size: 12px;
  }

  .sub-title{
    font-size: 18px;
    font-weight: 600;
    padding: 0px 15px;
  }
}

</style>
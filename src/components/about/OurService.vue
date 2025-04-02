<template>
    <div class="login-container">
      <div class="create-image">
        <p class="banner-title">
          Start real <br />
          Korean Life <br />
          from the <span style="color: #58C3FF">HiFor.</span>
        </p>
      </div>
  
      <div class="create-form">
        <h1>Sign up</h1>
        <p>Your life in Korea becomes more enjoyable here!</p>
  
        <form @submit.prevent="handleRegister">
  
          <!-- 체크박스 동의 영역 -->
          <div class="row agree-box">
            <div class="col-12">
              <button type="button" class="agree-all" @click="toggleAllCheckboxes">Accept All</button>
            </div>
  
            <div v-for="(checkbox, index) in checkboxes" :key="index" class="checkbox-item">
              <label>
                <input type="checkbox" v-model="checkbox.checked" />
                <span v-if="index === 0">
                  Notice: Once an event post is published, it cannot be 
                  <span class="popup-link" @click="openPopup(0)">edited</span>.
                </span>
                <span v-else-if="index === 1">
                  I agree to include all additional fees in the event details and understand that failing to do so may result in 
                  <span class="popup-link" @click="openPopup(1)">penalties</span>.
                </span>
                <span v-else-if="index === 2">
                  I have read the basic 
                  <span class="popup-link" @click="openPopup(2)">usage rules</span> of HiFor, and I agree with that.
                </span>
              </label>
            </div>
          </div>
          <button type="submit" class="btn-primary" :disabled="!requiredChecked">Sign up</button>
          
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  // 체크박스 리스트 (모든 체크박스를 "Accept All"에 포함)
  const checkboxes = ref([
    { label: "Notice: Once an event post is published, it cannot be edited", checked: false },
    { label: "I agree to include all additional fees in the event details and understand that failing to do so may result in penalties", checked: false },
    { label: "I have read the basic usage rules of HiFor, and I agree with that.", checked: false },
  ]);
  
  // 필수 체크박스(첫 번째 & 두 번째)가 선택되었는지 확인하는 computed property (버튼 활성화 조건)
  const requiredChecked = computed(() => checkboxes.value.slice(0, 2).every(cb => cb.checked));
  
  // "Accept All" 버튼 클릭 시 모든 체크박스 선택/해제
  const toggleAllCheckboxes = () => {
    const allChecked = checkboxes.value.every(cb => cb.checked);
    checkboxes.value.forEach(cb => cb.checked = !allChecked);
  };
  
  // 팝업 띄우기 기능 (index에 따라 다른 내용 표시)
  const openPopup = (index) => {
    const popupContents = [
      `<h2>Notice</h2>
      <p>Once an event post is published, it cannot be edited.</p>`,
  
      `<h2>Fees & Penalties</h2>
      <p>I agree to include all additional fees in the event details and understand that failing to do so may result in penalties.</p>`,
  
      `<h2>Usage Rules</h2>
      <p>I have read the basic <span style="color: blue;">usage rules</span> of HiFor, and I agree with that.</p>`,
    ];
  
    const popupWindow = window.open("", "Popup", "width=500,height=300,scrollbars=yes");
    popupWindow.document.write(`
      <html>
        <head>
          <title>Popup</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.5; }
            h2 { color: #333; }
            p { margin-bottom: 10px; }
            button { margin-top: 20px; padding: 10px 20px; border: none; background-color: #007bff; color: white; border-radius: 5px; cursor: pointer; }
            button:hover { background-color: #0056b3; }
          </style>
        </head>
        <body>
          ${popupContents[index]}
          <button onclick="window.close()">Close</button>
        </body>
      </html>
    `);
    popupWindow.document.close();
  };
  </script>
  
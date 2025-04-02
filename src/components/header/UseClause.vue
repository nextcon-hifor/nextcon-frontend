<template>
    <div class="title-header">
        <p class="title-text">Terms <span class="sub-tex">&</span> Policies</p>
    </div>
    <div class="sub-title-box">
        <div class="sub-title">
            Features
        </div>
    </div>
    <div class="accordion-container">
      <div class="accordion-panel">
        <!-- 첫 번째 패널 -->
        <div class="accordion-header" @click="togglePanel(0)">
          Item 1
          <span class="toggle-icon">{{ openPanels.includes(0) ? '▲' : '▼' }}</span>
        </div>
        <div class="accordion-content" v-show="openPanels.includes(0)">
          <p>Content for Item 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
  
      <div class="accordion-panel">
        <!-- 두 번째 패널 -->
        <div class="accordion-header" @click="togglePanel(1)">
          Item 2
          <span class="toggle-icon">{{ openPanels.includes(1) ? '▲' : '▼' }}</span>
        </div>
        <div class="accordion-content" v-show="openPanels.includes(1)">
          <p>Content for Item 2. Consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>
      </div>
  
      <div class="accordion-panel">
        <!-- 세 번째 패널 -->
        <div class="accordion-header" @click="togglePanel(2)">
          Item 3
          <span class="toggle-icon">{{ openPanels.includes(2) ? '▲' : '▼' }}</span>
        </div>
        <div class="accordion-content" v-show="openPanels.includes(2)">
          <p>Content for Item 3. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </div>
    <div class="sub-title-box">
        <div class="sub-title">
            Usage
        </div>
    </div>
    <div class="accordion-container">
      <div class="accordion-panel">
        <!-- 첫 번째 패널 -->
        <div class="accordion-header" @click="togglePanel(3)">
          Item 1
          <span class="toggle-icon">{{ openPanels.includes(3) ? '▲' : '▼' }}</span>
        </div>
        <div class="accordion-content" v-show="openPanels.includes(3)">
          <p>Content for Item 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
  
      <div class="accordion-panel">
        <!-- 두 번째 패널 -->
        <div class="accordion-header" @click="togglePanel(4)">
          Item 2
          <span class="toggle-icon">{{ openPanels.includes(4) ? '▲' : '▼' }}</span>
        </div>
        <div class="accordion-content" v-show="openPanels.includes(4)">
          <p>Content for Item 2. Consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>
      </div>
  
      <div class="accordion-panel">
        <!-- 세 번째 패널 -->
        <div class="accordion-header" @click="togglePanel(5)">
          Item 3
          <span class="toggle-icon">{{ openPanels.includes(5) ? '▲' : '▼' }}</span>
        </div>
        <div class="accordion-content" v-show="openPanels.includes(5)">
          <p>Content for Item 3. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
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
    background-color: #f2f2f2;
    padding: 15px 20px;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s;
  }
  
  .accordion-header:hover {
    background-color: #0ca835;
    color: #f2f2f2;
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
  </style>
  
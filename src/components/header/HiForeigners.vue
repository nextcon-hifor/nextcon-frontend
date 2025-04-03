<template>

    <!-- banner -->
    <div class="banner">
        <p class="banner-text1">Living</p>
        <p class="banner-title">Living in Korea: Tips & Updates</p>
        <p class="banner-text2">
            Discover essential tips and updates for living in Korea, <br>including local insights and helpful resources for newcomers
        </p>
    </div>
  
    <!-- search bar -->
    <div class="search-con">
    <div class="create-form">
        <div class="search-bar">
            <div class="form-group">
                <div class="row half-input-row">
                    <div class="col-2">
                        <label for="">Language</label>
                        <select name="" id="">
                            <option disabled hidden selected>All</option>
                            <option value="">All</option>
                            <option value="">English</option>
                            <option value="">中文（简体）</option>
                            <option value="">Tiếng Việt</option>
                            <option value="">日本語</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <label for="">Type</label>
                        <select name="" id="">
                            <option disabled hidden selected>All</option>
                            <option value="">All</option>
                            <option value="">Tips</option>
                            <option value="">News</option>
                            <option value="">Blog</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <label for="">Search</label>
                        <input type="text" placeholder="Title + Detail">
                    </div>
                    <div class="col-2">
                        <label for="">Summit</label>
                        <button>Search</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <router-link to="/createBlog"  v-if="user === 'hifor'">Create blog</router-link>
  
     <!-- contents -->
  <!-- <div class="contents-con">
       <div class="row card-row">

           <div
               class="col-3 card-box"
               v-for="(card, index) in visibleCards"
               :key="index"
           >
               <router-link to="/">
                   <div class="card">
                       <div class="card-img">
                           <div class="row">
                               <div class="col-12">
                                   <div class="icon_tema">
                                       {{ card.language }}
                                   </div>
                                   <div class="participants">
                                       {{ card.type }}
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div class="card-body">
                           <div class="row">
                               <div class="col-12">
                                   <p class="card-info-text">
                                       {{ card.date }}
                                   </p>
                               </div>
                           </div>
                       <p class="card-title">{{ card.title }}</p>
                       </div>
                   </div>
               </router-link>
           </div>

       </div>
   </div>-->
    <!-- 더보기 버튼 -->
    <div class="load-more-container" v-if="hasMoreCards">
      <button class="load-more-btn" @click="loadMoreCards">Load More</button>
    </div>
  
  </template>
  
  <script setup>
  
  import { ref, computed } from "vue";
  import { useStore } from 'vuex';

const store = useStore();
const user = computed(() => store.state.userId);
console.log(user.value)
  
  // Mock 데이터
  const allCards = ref([
  { language: "English", type: "Tips", date: "2025-01-23", title: "SIM Card in Korea for Foreigners" },
  { language: "English", type: "Tips", date: "2025-01-23", title: "Getting Around Korea" },
  // 총 카드 수를 원하는 만큼 추가
  ...Array.from({ length: 20 }, (_, i) => ({
    language: "English",
    type: "News",
    date: "2025-01-23",
    title: `Article ${i + 1}`,
  })),
  ]);
  
  // 초기 표시 카드 수와 상태
  const visibleCards = ref([]);
  const cardsPerPage = 12;
  const currentPage = ref(1);
  
  const loadMoreCards = () => {
  const nextPageCards = allCards.value.slice(
    visibleCards.value.length,
    visibleCards.value.length + cardsPerPage
  );
  visibleCards.value = [...visibleCards.value, ...nextPageCards];
  currentPage.value++;
  };
  
  const hasMoreCards = computed(() => visibleCards.value.length < allCards.value.length);
  
  // 초기 로딩
  loadMoreCards();
  
  </script>
  
  <!-- css -->
  <style scoped>
  a{
    text-decoration: none !important;
    color: unset !important;
  }
    /* 반응형 모바일 css */
    @media screen and (max-width:768px){
      /* 배너 */
      .banner {
          padding: 50px 20px;
          text-align: center;
          margin-top: 50px;
      }
      .banner-text1 {
          font-size: 14px;
          color: #4457FF;
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
  
      /* 검색 바 */
      .search-con {
      padding: 20px;
      display: flex;
      justify-content: center;
  }
  
  .create-form {
      width: 100%;
      max-width: 1140px; /* 검색 바의 최대 너비 */
      display: flex;
      justify-content: center;
      align-items: center;
  }
  
  .search-bar {
      width: 100%;
  }
  
  .half-input-row {
      display: flex;
      flex-wrap: wrap; /* 화면 크기에 따라 줄바꿈 */
      justify-content: space-between; /* 입력 필드 정렬 */
  }
  .half-input-row {
    justify-content: center;
  }
  
  .half-input-row .col-2, 
  .half-input-row .col-6 {
      flex: 1 1 auto; /* 크기를 자동 조정 */
      min-width: 150px; /* 입력 필드 최소 너비 */
      max-width: 220px; /* 입력 필드 최대 너비 */
      padding: 5px;
  }
  
  .half-input-row .col-6 {
      flex: 2 1 auto; /* 검색창은 더 넓게 */
  }
  
  .form-group select, 
  .form-group input {
      width: 100%;
      height: 50px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 16px;
      padding: 5px 10px;
      box-sizing: border-box;
  }
  
  .form-group button {
      border-radius: 16px;
      padding: 5px 10px;
      width: 100%;
      height: 50px;
      font-size: 14px;
      background-color: #4457FF;
      color: white;
      border: none;
      transition: all 0.3s ease;
      cursor: pointer;
  }
  
  .form-group button:hover {
      background-color: #3346D3;
  }
  
      /* 콘텐츠 */
      .contents-con {
          padding: 20px;
      }
  
      .card-row {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
      }
  
      .card-box {
          flex: 0 0 100%; /* 모바일에서 한 줄에 하나 */
          padding: 10px 0;
      }
  
      .card {
          border-radius: 12px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: all 0.3s ease;
      }
  
      .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
  
      .card-img {
          height: 180px; /* 이미지 높이 조정 */
          background-image: url('/assets/img/img_LogInBanner1.png');
          background-size: cover;
          background-position: center;
          border-bottom: 1px solid #ddd;
      }
  
      .icon_tema, .participants {
          display: inline-block;
          font-size: 12px;
          padding: 5px 10px;
          border-radius: 12px;
          margin: 5px;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      }
  
      .icon_tema {
          background-color: #5870FF;
          color: #FFFFFF;
      }
  
      .participants {
          background-color: #FFFFFF;
          color: #5870FF;
          border: 1px solid #5870FF;
      }
  
      .card-body {
          padding: 15px;
      }
  
      .card-title {
          font-size: 16px;
          font-weight: bold;
          margin: 0;
          color: #333;
          text-align: left;
      }
  
      .card-info-text {
          font-size: 12px;
          color: #555;
          margin: 5px 0;
          text-align: left;
      }
  
      /* Load More 버튼 */
      .load-more-container {
          text-align: center;
          margin-top: 20px;
          margin-bottom: 40px;
      }
  
      .load-more-btn {
          padding: 10px 20px;
          font-size: 14px;
          color: #fff;
          background-color: #4457FF;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
      }
  
      .load-more-btn:hover {
          background-color: #3346D3;
      }
    }
    /* 웹 */
    @media screen and (min-width:769px){
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
        /* search bar */
  
        .search-con{
            padding: 0px 150px;
        }
  
        .create-form {
            flex: 1;
            padding: 40px;
            padding-bottom: 0px;
            align-content: center;
            border: 1px solid #E5ECF8;
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
  
        .form-group input {
            width: 100%;
            height: 50px;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 24px;
            box-sizing: border-box;
        }
  
        .form-group button {
            width: 100%;
            height: 50px;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #4457FF;
            border-radius: 24px;
            box-sizing: border-box;
            transition: all 0.3s ease;
            background-color: #FFFFFF;
            color: #4457FF;
        }
        .form-group button:hover {
            width: 100%;
            height: 50px;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #FFFFFF;
            border-radius: 24px;
            box-sizing: border-box;
            transition: all 0.3s ease;
            background-color: #4457FF;
            color: #FFFFFF;
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
  
        /* contents */
  
        .contents-con{
            padding: 45px 150px;
        }
  
        .card-box{
            padding: 10px;
        }
  
        .card {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            flex-shrink: 0;
            text-align: center;
            --bs-card-border-width: none;
            transition: all 0.3s ease;
        }
  
        .card:hover{
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
  
        .card-body .col-6{
            padding: 0px;
        }
  
        .card-title{
            font-size: 1.75rem;
            font-weight: 500;
            text-align: left;
            margin: 0px;
            line-height: normal;
            padding-bottom: 15px;
        }
  
        .card-detail{
            text-align: left;
            font-size: 15px;
            font-weight: 300;
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
  
        .icon_tema{
            width: min-content;
            background-color: #5870FF;
            color: #FFFFFF;
            padding: 5px 15px;
            border-radius: 24px;
            margin: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        .participants{
            width: max-content;
            background-color: #FFFFFF;
            color: #5870FF;
            padding: 5px 15px;
            border-radius: 24px;
            margin: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        .card-icon-heart{
            margin: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
  
        .card-info-text{
            text-align: left;
            font-weight: 300;
            font-size: 14px;
        }
  
        .card-info-icon{
            width: 20px !important;
            height: 20px !important;
        }
        /* Load More 버튼 스타일 */
        .load-more-container {
            text-align: center;
            margin-top: 25px;
            margin-bottom: 50px;
        }
  
        .load-more-btn {
            background-color: #4457ff;
            color: #ffffff;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
  
        .load-more-btn:hover {
            background-color: #3346d3;
        }
    }
  </style>
  
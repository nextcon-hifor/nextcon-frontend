<template>

    <!-- 데스크탑 -->
    <div class="Web">
        <div class="home-banner">
            <!-- 메인 -->
            <p class="banner-title animate__fadeInUp">
                Start real Korean Life <br>
                from the <span style="color: #58C3FF;">HiFor.</span>
            </p>
        </div>

        <!--핫이벤트 -->
        <div class="events-container hot-event">
            <p class="hot-event-title">
                Hot Event
            </p>
            <div class="row cards-grid">
                <div class="col-4" v-for="(event, index) in hotEvents.slice(0, 6)" :key="index">
                    <EventCard :event="event" />
                </div>
            </div>
        </div>
        <!-- Buttons -->
        <div class="allevent-btn-box">
            <router-link to="/allEvents">
                <button class="allevent-btn">Browse Events</button>
            </router-link>
        </div>

        <!-- explain section -->
        <div class="row ex-con">
            <div class="row">
                <div class="col ex-text1">
                    How it works
                </div>
            </div>
            <div class="row">
                <p class="ex-title">
                    Learn how the experience works
                </p>
            </div>
            <div class="row">
                <div class="col ex-box">
                    <img class="ex-icon1" src="../../public/assets/img/icon_HowTo1.png" alt=""><br>
                    <img class="ex-num1" src="../../public/assets/img/icon_Num1.png" alt=""><br>
                    <p class="ex-text2">
                        Search for events<br>
                        interests you
                    </p>
                    <p class="ex-text3">
                        Search for a topic you're interested in and<br> find a event you want!
                    </p>
                </div>
                <div class="col ex-box">
                    <img class="ex-icon2" src="../../public/assets/img/icon_HowTo2.png" alt=""><br>
                    <img class="ex-num2" src="../../public/assets/img/icon_Num2.png" alt=""><br>
                    <p class="ex-text2">
                        Create any events<br>you want!
                    </p>
                    <p class="ex-text3">
                        If you don't like anything or have a good idea,<br>make your own event!
                    </p>
                </div>
                <div class="col ex-box">
                    <img class="ex-icon3" src="../../public/assets/img/icon_HowTo3.svg" alt=""><br>
                    <img class="ex-num3" src="../../public/assets/img/icon_Num3.png" alt=""><br>
                    <p class="ex-text2">
                        Enjoy an event and<br> connect with people
                    </p>
                    <p class="ex-text3">
                        Enjoy the event and have a new meeting with<br> new people at HiFor!
                    </p>
                </div>
            </div>
        </div>

        <!-- why hifor -->
        <div class="container why-con">
            <div class="row">
                <div class="col-6 why-box">
                    <img src="../../public/assets/img/img_MeetUp.png" alt="">
                </div>
                <div class="col-6 why-box">
                    <p class="wc-text1">Why HiFor</p>
                    <p class="wc-title">
                        Connecting Worlds,<br>
                        Creating Value
                    </p>
                    <p class="wc-text2">
                        HiFor is a global community platform that connects people and businesses.We offer meaningful
                        connections based on interests, culture, and goals—not just casual gatherings. <br>
                        Through HiFor, you can engage with people from diverse backgrounds and stories, creating new
                        experiences and value together.
                    </p>

                    <button v-if="isLoggedIn" class="wc-btn">
                        <router-link to="/postEvent">
                            Create Event
                        </router-link>
                    </button>
                    <button v-else class="wc-btn">
                        <router-link to="/logIn">
                            Create Event
                        </router-link>
                    </button>
                </div>
            </div>
        </div>

        <!-- our values -->
        <div class="row ov-con">
            <p class="rc-text1">Our values</p>
            <p class="rc-title">
                The values that drive<br>
                everything we do
            </p>
            <div class="col-4">
                <div class="value-card">
                    <img src="../../public/assets/img/icon_OurValue1.png" alt="">
                    <p class="value-title">Inclusivity</p>
                    <p class="value-text">HiFor welcomes everyone,<br>fostering a sense of belonging.</p>
                </div>
            </div>
            <div class="col-4">
                <div class="value-card">
                    <img src="../../public/assets/img/icon_OurValue2.png" alt="">
                    <p class="value-title">Growth</p>
                    <p class="value-text">Guided by feedback and data,<br>we improve to support growth.</p>
                </div>
            </div>
            <div class="col-4">
                <div class="value-card">
                    <img src="../../public/assets/img/icon_OurValue3.png" alt="">
                    <p class="value-title">Innovation</p>
                    <p class="value-text">AI-driven services transform<br>experiences with personalization.</p>
                </div>
            </div>
            <div class="col-4">
                <div class="value-card">
                    <img src="../../public/assets/img/icon_OurValue4.png" alt="">
                    <p class="value-title">Connection</p>
                    <p class="value-text">HiFor connects people through <br>shared interests and events.</p>
                </div>
            </div>
            <div class="col-4">
                <div class="value-card">
                    <img src="../../public/assets/img/icon_OurValue5.png" alt="">
                    <p class="value-title">Support</p>
                    <p class="value-text">We empower individuals with <br>language learning and networking.</p>
                </div>
            </div>
            <div class="col-4">
                <div class="value-card">
                    <img src="../../public/assets/img/icon_OurValue6.png" alt="">
                    <p class="value-title">Accessibility</p>
                    <p class="value-text">Affordable services ensure <br>easy participation for all.</p>
                </div>
            </div>
        </div>

        <!-- user say -->
        <div class="review-con">
            <p class="rc-text1">Testimonials</p>
            <p class="rc-title">What our users say about us</p>
            <p class="rc-text2">
                See what ours users saying about their unique experiences with HiFor!
            </p>
        </div>
        <!-- Testimonials Cards1 -->
        <div class="testimonials-grid review-row1">
            <!-- Testimonial 1 -->
            <div class="testimonial-card">
                <div class="testimonial-text">
                    "Mình đã cố gắng quan tâm đến những người đến một mình, nhưng khi thấy họ hòa nhập dễ dàng với mọi
                    người, mình cảm thấy yên tâm. Có vẻ như các hoạt động mình chuẩn bị với vai trò người tổ chức đã
                    hiệu quả."
                </div>
            </div>

            <!-- Testimonial 2 -->
            <div class="testimonial-card">
                <div class="testimonial-text">
                    "ผู้เข้าร่วมบอกว่าจะทำกลุ่มแชทและติดต่อกันต่อไปหลังงานจบ รู้สึกดีมาก
                    เพราะมันไม่ใช่แค่เจอกันครั้งเดียว แต่เหมือนเป็นโอกาสที่ทำให้ความสัมพันธ์ยังคงต่อไป"
                </div>
            </div>

            <!-- Testimonial 3 -->
            <div class="testimonial-card">
                <div class="testimonial-text">
                    “참가비도 부담 없고 진행도 깔끔했어요. 외국인 친구들이랑 자연스럽게 대화도 할 수 있어서 오히려 기대 이상이었어요.”
                </div>
            </div>

            <!-- Testimonial 4 -->
            <div class="testimonial-card">
                <div class="testimonial-text">
                    "是通过朋友推荐参加这个活动的，气氛真的很好。一开始以为大家会很尴尬，但很快就变得熟悉了，最后一起去吃饭了！"
                </div>
            </div>

            <!-- Add more testimonial cards as needed -->
        </div>

        <!-- Testimonials Cards2 -->
        <div class="testimonials-grid review-row2">
            <!-- Testimonial 1 -->
            <div class="testimonial-card">
                <div class="testimonial-text">
                    "After the event, some participants came up to thank me, and it really motivated me. Now I’m even
                    more eager to create better events in the future."
                </div>
            </div>

            <!-- Testimonial 2 -->
            <div class="testimonial-card">
                <div class="testimonial-text">
                    "I went there at first just to watch, but there were more fun activities than I expected, so I lost
                    track of time. Even people who came alone were able to mingle easily."
                </div>
            </div>

            <!-- Testimonial 3 -->
            <div class="testimonial-card">
                <div class="testimonial-text">
                    "参与者们很快就变得熟络，后来还建立了一个微信群，大家一直保持联系。我很喜欢这不仅仅是一个活动，而是能够继续维持关系的机会。"
                </div>
            </div>

            <!-- Testimonial 4 -->
            <div class="testimonial-card">
                <div class="testimonial-text">
                    "イベントに一度参加しただけですが、非常に多様なことを学びました。韓国語だけでなく、他の国の友達とも話ができて、言語力が向上した気がします。"
                </div>
            </div>

            <!-- Add more testimonial cards as needed -->
        </div>

        <!-- Buttons -->
        <div class="button-row">
            <button v-if="isLoggedIn" class="wc-btn">
                <router-link to="/postEvent">
                    Create Event
                </router-link>
            </button>
            <button v-else class="wc-btn">
                <router-link to="/logIn">
                    Create Event
                </router-link>
            </button>
            <button class="cta-button secondary-button wc-btn"><router-link to="/allEvents">Browse
                    Events</router-link></button>
        </div>

        <!-- 컨택어스 -->
        <!-- past a event -->
        <div class="contaeiner contact-con">
            <div class="row contact-box">
                <div class="col-6">
                    <div class="row c-img-box">
                        <div class="col-6 c-img-box1">
                            <img class="c-img1" src="../../public/assets/c-img1.png" alt="">
                            <img class="c-img2" src="../../public/assets/c-img2.png" alt="">
                        </div>
                        <div class="col-6 c-img-box2">
                            <img class="c-img3" src="../../public/assets/c-img3.png" alt="">
                            <img class="c-img4" src="../../public/assets/c-img4.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="col-6 c-text-box">
                    <p class="c-title">
                        Create the next<br>event you want!
                    </p>
                    <p class="c-text">
                        Make your own ideas or <br>
                        whatever you want an event on HiFor and enjoy it!
                    </p>
                    <button v-if="isLoggedIn" class="wc-btn">
                        <router-link to="/postEvent">
                            Create Event
                        </router-link>
                    </button>
                    <button v-else class="wc-btn">
                        <router-link to="/logIn">
                            Create Event
                        </router-link>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 모바일 -->
    <div class="Mobile">

        <!-- 배너 Title -->
        <div class="m-banner">
            <div class="m-banner-title">
                Start real <br>
                Korean Life <br>
                from the <span style="color: #58C3FF;">HiFor.</span>
            </div>
        </div>
        <!-- All Events -->
        <div class="m-events-container">
            <div class="m-box">
                <p class="m-title">
                    Hot Events
                </p>
            </div>
            <!-- Event Cards -->
            <div class="m-card-box">
                <div class="m-card" v-for="(event, index) in hotEvents.slice(0, 6)" :key="index">
                    <EventCard :event="event" />
                </div>
            </div>
            <!-- 페이지네이션 버튼 -->
            <div class="allevent-btn-box">
                <router-link to="/allEvents">
                    <button class="allevent-btn">Browse Events</button>
                </router-link>
            </div>
        </div>
        <!-- explain section -->
        <div class="ex-con">
            <p class="ex-text1">
                How it works
            </p>
            <p class="ex-title">
                Learn How <br>
                the Experience Works
            </p>
            <div class="ex-box">
                <img class="ex-icon1" src="../../public/assets/img/icon_HowTo1.png" alt=""><br>
                <img class="ex-num1" src="../../public/assets/img/icon_Num1.png" alt=""><br>
                <p class="ex-text2">
                    Search for events<br>
                    interests you
                </p>
                <p class="ex-text3">
                    Search for a topic <br> you're interested in and<br> find a event you want!
                </p>
            </div>
            <div class="ex-box">
                <img class="ex-icon2" src="../../public/assets/img/icon_HowTo2.png" alt=""><br>
                <img class="ex-num2" src="../../public/assets/img/icon_Num2.png" alt=""><br>
                <p class="ex-text2">
                    Create any events<br>you want!
                </p>
                <p class="ex-text3">
                    If you don't like anything <br> or have a good idea,<br>make your own event!
                </p>
            </div>
            <div class="ex-box">
                <img class="ex-icon3" src="../../public/assets/img/icon_HowTo3.svg" alt=""><br>
                <img class="ex-num3" src="../../public/assets/img/icon_Num3.png" alt=""><br>
                <p class="ex-text2">
                    Enjoy an event and<br> connect with people
                </p>
                <p class="ex-text3">
                    Enjoy the event and <br> have a new meeting with<br> new people at HiFor!
                </p>
            </div>
        </div>
        <!-- why hifor -->
        <div class="container why-con">
            <div class="row">
                <div class="col-12 why-box">
                    <img src="../../public/assets/img/img_MeetUp.png" alt="">
                </div>
                <div class="col-12 why-box">
                    <p class="ex-text1">Why HiFor</p>
                    <p class="ex-title">Connecting Worlds, <br> Creating Value</p>
                    <p class="ex-text3">
                        HiFor is a global community platform <br> that connects people and businesses. <br>
                        We offer meaningful connections based on <br> interests, culture, and goals—not just casual
                        gatherings. <br>
                        <br>
                        Through HiFor, you can engage with people <br> from diverse backgrounds and stories, <br>
                        creating new experiences and value together.
                    </p>
                    <button v-if="isLoggedIn" class="wc-btn">
                        <router-link to="/postEvent">
                            Create Event
                        </router-link>
                    </button>
                    <button v-else class="wc-btn">
                        <router-link to="/logIn">
                            Create Event
                        </router-link>
                    </button>
                </div>
            </div>
        </div>
        <!-- our values -->
        <div class="ov-con">
            <p class="ex-text1">Our values</p>
            <p class="ex-title">
                The values that drive<br>
                everything we do
            </p>
            <div class="row">
                <div class="col-1"></div>
                <div class="col-10">
                    <div class="value-card">
                        <p class="ex-text2">
                            <img src="../../public/assets/img/icon_OurValue1.png" alt="">Inclusivity
                        </p>
                        <p class="ex-text3">HiFor welcomes everyone,<br>fostering a sense of belonging.</p>
                    </div>
                </div>
                <div class="col-1"></div>
                <div class="col-1"></div>
                <div class="col-10">
                    <div class="value-card">
                        <p class="ex-text2">
                            <img src="../../public/assets/img/icon_OurValue2.png" alt="">Growth
                        </p>
                        <p class="ex-text3">Guided by feedback and data,<br>we improve to support growth.</p>
                    </div>
                </div>
                <div class="col-1"></div>
                <div class="col-1"></div>
                <div class="col-10">
                    <div class="value-card">
                        <p class="ex-text2">
                            <img src="../../public/assets/img/icon_OurValue3.png" alt="">Innovation
                        </p>
                        <p class="ex-text3">AI-driven services transform<br>experiences with personalization.</p>
                    </div>
                </div>
                <div class="col-1"></div>
                <div class="col-1"></div>
                <div class="col-10">
                    <div class="value-card">
                        <p class="ex-text2">
                            <img src="../../public/assets/img/icon_OurValue4.png" alt="">Connection
                        </p>
                        <p class="ex-text3">HiFor connects people through <br>shared interests and events.</p>
                    </div>
                </div>
                <div class="col-1"></div>
                <div class="col-1"></div>
                <div class="col-10">
                    <div class="value-card">
                        <p class="ex-text2">
                            <img src="../../public/assets/img/icon_OurValue5.png" alt="">Support
                        </p>
                        <p class="ex-text3">We empower individuals with <br>language learning and networking.</p>
                    </div>
                </div>
                <div class="col-1"></div>
                <div class="col-1"></div>
                <div class="col-10">
                    <div class="value-card">
                        <p class="ex-text2">
                            <img src="../../public/assets/img/icon_OurValue6.png" alt="">Accessibility
                        </p>
                        <p class="ex-text3">Affordable services ensure <br>easy participation for all.</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Contact Us -->
        <div class="cu-con">
            <div class="cu-box">
                <p class="cu-title">
                    Create the next <br>event you want!
                </p>
                <p class="cu-text">
                    Make your own ideas or <br>
                    whatever you want an event <br>
                    on HiFor and enjoy it!
                </p>
                <div class="cu-btn-box">
                    <button v-if="isLoggedIn" class="wc-btn">
                        <router-link to="/postEvent">
                            Create Event
                        </router-link>
                    </button>
                    <button v-else class="wc-btn">
                        <router-link to="/logIn">
                            Create Event
                        </router-link>
                    </button>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import EventCard from './gathering/EventCard.vue'; // EventCard 컴포넌트 가져오기


const events = ref([]); // 이벤트 데이터
const hotEvents = ref([]); // 캐러셀 이벤트
const store = useStore();
const isLoggedIn = computed(() => store.getters.isLoggedIn);
const mapEventData = (event) => ({
    id: event.id,
    mainImage: event.mainImage,
    title: event.name,
    date: event.date,
    location: event.location,
    category: event.category,
    type: event.type,
    participants: {
        current: event.participants ?? 0, // 현재 참가자 수
        max: event.maxParticipants, // 최대 참가자 수
    },
    likes: event.likes, // 좋아요 수
});


// 통합된 fetchEvents 함수
const fetchEvents = async (fetchType, params = {}) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/events`,
            {
                params: { fetchType, ...params }, // 쿼리 파라미터 추가
                withCredentials: true, // 인증 정보를 포함
            }
        );

        return response.data.map(mapEventData); // 데이터 매핑 후 반환
    } catch (error) {
        console.error(`Failed to fetch events for type "${fetchType}":`, error);
        return []; // 에러 시 빈 배열 반환
    }
};

// 모든 이벤트 가져오기
const fetchAllEvents = async () => {
    events.value = await fetchEvents('all');
};

// 핫 이벤트 가져오기
const fetchHotEvents = async () => {
    hotEvents.value = await fetchEvents('hot');
};




onMounted(async () => {
    await fetchAllEvents(); // 모든 이벤트 가져오기
    await fetchHotEvents(); // 핫 이벤트
});


</script>



<style scoped>
/* 공통 */
a {
    color: unset;
    text-decoration: none;
}

/* 반응형 모바일 css */
@media screen and (max-width:989px) {
    .Web {
        display: none;
    }

    .Mobile {
        display: block;
    }

    /* banner */
    .m-banner {
        background-image: url('../../public/assets/img/img_HomeBanner.png');
        background-size: cover;
        background-position: center;
        height: 650px;
        padding-top: 50px;
    }

    .m-events-container {
        margin-top: -150px;
    }

    .m-banner-title {
        font-size: 48px;
        font-weight: bold;
        color: #FFFFFF;
        padding: 0px 30px;
        padding-top: 120px;
        padding-bottom: 150px;
        text-align: left;
    }

    .m-box {
        padding: 0px 30px;
    }

    .m-title {
        color: #FFFFFF;
        font-size: 24px;
        font-weight: 600;
        margin-top: 15px;
        margin-bottom: 5px;
    }

    .allevent-btn-box {
        text-align: center;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .allevent-btn {
        width: max-content;
        font-size: 14px;
        border-radius: 100px;
        background-color: #FFFFFF;
        color: #58C3FF;
        border: 1px solid #58C3FF;
        transition: all 0.3s ease;
        padding: 10px 20px;
    }

    .ex-con {
        width: 100%;
        padding: 30px;
        margin-top: 60px;
        text-align: center;
        background-color: #F8F8FB;
    }

    .ex-title {
        padding: 10px 0px;
        line-height: 28px;
        font-size: 24px;
        font-weight: bold;
        mask-image: linear-gradient(to bottom, rgb(0 0 0), rgb(0 0 0));
    }

    .ex-text1 {
        font-size: 12px;
        font-weight: 600;
        margin: 0px;
        color: #5870FF;
        mask-image: linear-gradient(to bottom, rgb(0 0 0), rgb(0 0 0));
        margin: 0px;
    }

    .ex-text2 {
        font-size: 20px;
        line-height: 24px;
        font-weight: 600;
        padding: 5px 0px;
        margin-bottom: 0px;
    }

    .ex-text3 {
        font-size: 12px;
    }

    .ex-icon1 {
        width: 99px;
        margin-bottom: 10px;
    }

    .ex-num1 {
        width: 28px;
    }

    .ex-icon2 {
        width: 99px;
        margin-bottom: 10px;
    }

    .ex-num2 {
        width: 28px;
    }

    .ex-icon3 {
        width: 139px;
        margin-bottom: 10px;
        margin-left: -20px;
        margin-bottom: -15px;
    }

    .ex-num3 {
        width: 28px;
    }

    .why-con {
        margin: 30px 0px;
        padding: 0px 30px;
        justify-self: center;
    }

    .why-box {
        text-align: center;
    }

    .why-box img {
        z-index: 0;
        width: 100%;
        mask-image: linear-gradient(to bottom, rgba(1, 1, 1, 1), rgba(0, 0, 0, 0));
        margin-bottom: -90px;
    }

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

    .ov-con {
        width: 100%;
        padding: 30px 10px;
        margin-top: 60px;
        text-align: center;
        background-color: #F8F8FB;
    }

    .value-card {
        text-align: left;
        background-color: #FFFFFF;
        border-radius: 24px;
        padding: 15px;
        margin-bottom: 15px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    .value-card .ex-text2 {
        font-size: 16px;
        margin: 0px;
    }

    .value-card .ex-text3 {
        padding: 3px 6px;
        margin: 0px;
        font-size: 12px;
    }

    .value-card img {
        width: 25px;
        height: 25px;
        margin-right: 5px;
        margin-top: -5px;
    }

    .vc-icon-box {
        background-color: #FFFFFF;
        border-radius: 24px;
        padding: 20px;
        margin-bottom: 15px;
    }

    .vc-icon {
        width: 100% !important;
        height: 100% !important;
        margin: 0px !important;
    }

    .cu-con {
        height: max-content;
    }

    .cu-box {
        margin: 30px;
        background-color: #5870FF;
        border-radius: 24px;
        padding: 20px;
    }

    .cu-title {
        color: #F8F8FB;
        font-size: 32px;
        font-weight: 600;
        line-height: 36px;
        margin-bottom: 10px;
    }

    .cu-text {
        color: #f1f1f1;
        font-size: 14px;
    }

    .cu-btn-box {
        text-align: left;
    }

    .cu-btn {
        width: max-content;
        font-size: 14px;
        border-radius: 100px;
        background-color: #0C1830;
        color: #f1f1f1;
        border: 1px solid #0C1830;
        transition: all 0.3s ease;
        padding: 10px 20px;
    }
}

/* 데스크탑 */
@media screen and (min-width:990px) {
    .Web {
        display: block;
    }

    .Mobile {
        display: none;
    }

    /* 고정 */
    .title {
        font-size: 36px;
        font-weight: bold;
        color: #FFFFFF;
        text-align: left;
        padding: 0px 30px;
    }

    /* banner */
    .home-banner {
        background-image: url('/assets/img/img_HomeBanner.png');
        background-size: cover;
        background-position: center;
        height: 900px;
    }

    .banner-title {
        font-size: 81px;
        font-weight: bold;
        color: #FFFFFF;
        text-align: center;
        height: 100vh;
        max-height: 750px;
        align-content: center;
    }

    .search-box {
        max-width: 100%;
        height: fit-content;
        margin: 30px 150px;
        padding: 10px 15px;
        background-color: #FFFFFF69;
        border-radius: 15px;
        align-content: center;
        text-align: center;
    }

    .search-box button {
        background: none;
        border: none;
    }

    .search-box input {
        background: none;
        border: none;
        color: #FFFFFF;
        height: 42px;
        color-scheme: white;
        margin: 0px 5px;
        width: 10rem;
    }

    .search-box input[type='date'] {
        color: #FFFFFF;
    }

    .search-box select {
        background: none;
        border: none;
        color: #FFFFFF;
        height: 42px;
        margin: 0px 5px;
        width: 10rem;
    }

    .search-text-box {
        width: 85% !important;
    }

    /* category */
    .category-row {
        padding: 30px 150px;
        text-align: center;
    }

    .category-box {
        margin: 0px 20px;
        color: #FFFFFF;
        opacity: 0.7;
        transition: all 0.3s ease;
    }

    .category-box:hover {
        margin: 0px 20px;
        color: #FFFFFF;
        opacity: 1;
        border-bottom: 1px solid #FFFFFF;
        cursor: pointer;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .eventcontainer-title {
        font-size: 36px;
        font-weight: bold;
        color: #0C1830;
        text-align: left;
        padding: 0px 30px;
    }


    /* Hot Events */
    .hot-event {
        margin-top: -150px;
    }

    .hot-event-title {
        font-size: 36px;
        font-weight: bold;
        color: #FFFFFF;
        text-align: left;
        padding: 0px 30px;
    }

    /* all events */
    .events-container {
        padding: 30px 150px;
        max-width: 1470px;
        justify-self: center;
    }

    /* pagenation */
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        gap: 10px;
    }

    .pagination button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background: #58C3FF;
        color: #fff;
        cursor: pointer;
        border-radius: 24px;
        transition: all 0.3s ease;
    }

    .pagination button:hover {
        background: #5870FF;
    }

    .pagination button:disabled {
        background: #ccc;
    }

    /* how to works */
    .ex-con {
        height: 800px;
        align-content: center;
        background-color: #F8F8FB;
        border-radius: 40px;
        padding: 0px 150px;
        max-width: 1470px;
        justify-self: center;
    }

    .ex-text1 {
        text-align: center;
        color: #58C3FF;
        font-weight: 500;
    }

    .ex-title {
        text-align: center;
        font-size: 40px;
        font-weight: bold;
        margin-bottom: 30px;
    }

    .ex-icon3 {
        margin-top: -10px;
        margin-left: -40px;
    }

    .ex-box {
        text-align: center;
        /* filter: grayscale(1); */
    }

    /* .ex-box:hover{
      text-align:center;
      filter: grayscale(0);
  } */
    .ex-icon1 {
        width: 150px;
        margin-top: 10px;
        margin-bottom: 40px;
    }

    .ex-icon2 {
        width: 150px;
        margin-top: 10px;
        margin-bottom: 40px;
    }

    .ex-icon3 {
        height: 210px;
    }

    .ex-text2 {
        font-size: 30px;
        font-weight: 700;
        line-height: 40px;
        text-align: center;
        margin-top: 30px;
        text-decoration-skip-ink: none;
    }

    .ex-text3 {
        font-size: 16px;
        font-weight: 500;
        line-height: 28px;
        text-align: center;
        text-decoration-skip-ink: none;
    }

    /* why hifor */
    .why-con {
        padding: 75px 150px;
    }

    .why-box {
        align-self: center;
    }

    .why-box img {
        width: 100%;
    }

    .wc-text1 {
        color: #58C3FF;
        font-weight: 500;
    }

    .wc-text2 {
        font-weight: 300;
    }

    .wc-title {
        font-size: 40px;
        font-weight: bold;
        line-height: 54px;
    }

    .wc-btn {
        width: 180px;
        height: 60px;
        text-align: center;
        align-self: center;
        border-radius: 96px;
        border: none;
        color: #FFFFFF;
        background-color: #58C3FF;
        border: 1px solid #FFFFFF;
        margin-top: 15px;
        transition: all 0.3s ease;
    }

    .wc-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    /* 우리 가치 */
    .ov-con {
        padding: 60px 150px;
        margin: 30px 0px;
        background-color: #F8F8FB;
        border-radius: 40px;
        max-width: 1470px;
        justify-self: center;
    }

    .value-card {
        margin: 15px;
        background-color: #FFFFFF;
        border-radius: 24px;
        padding: 40px;
        text-align: center;
    }

    .value-title {
        margin-top: 20px;
        font-size: 22px;
        font-weight: 400;
        color: #0C1830;
        margin-bottom: 8px;
    }

    .value-text {
        font-size: 16px;
        font-weight: 400;
        color: #46526A;
    }

    /* 사용자 리뷰 */
    .review-con {
        padding-left: 150px;
        padding-right: 150px;
        padding-top: 30px;
    }

    .review-row1 {
        margin-left: -30px !important;
        margin-right: 30px !important;
    }

    .review-row2 {
        margin-left: 30px !important;
        margin-right: -30px !important;
    }

    .rc-title {
        text-align: center;
        font-size: 40px;
        font-weight: bold;
        line-height: 54px;
    }

    .rc-text1 {
        text-align: center;
        margin: 0px;
        color: #58C3FF;
    }

    .rc-text2 {
        text-align: center;
        font-weight: 300;
    }

    .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
        margin: 40px 0;
        max-width: 1180px;
        justify-self: center;
    }

    .testimonial-card {
        background: #fff;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .testimonial-text {
        font-size: 14px;
        color: #555;
        text-align: center;
        height: 100%;
        align-content: center;
    }

    .button-row {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    .cta-button {
        padding: 12px 20px;
        font-size: 14px;
        font-weight: bold;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .allevent-btn-box {
        width: 100%;
        text-align: center;
        padding-bottom: 45px;
    }

    .allevent-btn {
        width: 155px;
        height: 58px;
        border-radius: 100px;
        background-color: #FFFFFF;
        color: #58C3FF;
        border: 1px solid #58C3FF;
        transition: all 0.3s ease;
    }

    .allevent-btn:hover {
        background-color: #58C3FF;
        color: white;
        border: 1px solid #58C3FF;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .primary-button {
        width: 180px;
        height: 58px;
        border-radius: 100px;
        background-color: #58C3FF;
        color: white;
        border: none;
    }

    .secondary-button {
        width: 180px;
        height: 58px;
        background-color: #FFFFFF;
        border: 1.5px solid #58C3FF;
        border-radius: 100px;
        color: #58C3FF;
    }

    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    /* Contact-Us */
    .contact-con {
        height: 630px;
        background-color: #F8F8FB;
        border-radius: 40px;
        justify-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        padding-left: 125px;
        padding-right: 125px;
        margin-top: 90px;
        max-width: 1470px;
        justify-self: center;
    }

    .contact-box {
        background-color: #58C3FF;
        height: 550px;
        border-radius: 40px;
    }

    .c-img-box {
        height: 550px;
    }

    .c-img-box1 {
        text-align: right;
    }

    .c-img-box2 {
        align-self: end;
    }

    .c-img1 {
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        margin-bottom: 25px;
    }

    .c-img3 {
        margin-bottom: 25px;
    }

    .c-text-box {
        padding-top: 120px;
        padding-bottom: 120px;
    }

    .c-title {
        color: #ffffff;
        font-size: 50px;
        font-weight: 600;
        line-height: 54px;
    }

    .c-text {
        color: #f1f1f1;
        font-size: 16px;
        font-weight: 400;
        line-height: 28px;
    }

    .contact-btn {
        width: 155px;
        height: 58px;
        background-color: #58C3FF;
        border: 1.5px solid #FFFFFF;
        border-radius: 100px;
        color: #FFFFFF;
        margin-top: 40px;
        transition: all 0.3s ease;
    }

    .contact-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
}

/* 공통 */
.row {
    justify-self: center;
    width: 100%;
}
</style>

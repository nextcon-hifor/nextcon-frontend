import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import HomeIndex from "@/components/HomeIndex.vue";
import LogIn from "@/components/auth/Login.vue";
import PasswordChange from "../components/auth/PasswordChange.vue";
import FindUsername from "../components/auth/FindUsername.vue";
import FindPassword from "../components/auth/FindPassword.vue";
import GoogleSignUp from "../components/auth/googleSignUp.vue";
import CreateAccount from "@/components/auth/CreateAccount.vue";
import OurCompany from "@/components/about/OurCompany.vue";
import ContactUs from "@/components/header/ContactUs.vue";
import notice from "@/components/header/HiForeigners.vue";
import fnq from "@/components/header/ServiceGuide.vue";
import Chat from "@/components/chat/Chat.vue";
import UserPage from "@/components/header/UserPage.vue";
import AllEvents from "@/components/gathering/AllEvents.vue";
import deleteEvent from "@/components/gathering/DeleteEvent.vue";
import PostEvent from "@/components/gathering/PostEvent.vue";
import EnterEvent from "@/components/gathering/EnterEvent.vue";
import EventApprove from "../components/gathering/EventApprove.vue";
import EventDetailJoin from "../components/gathering/eventDetailJoin.vue";
import ReviewEvent from "@/components/gathering/ReviewEvent.vue";
import CreateBlog from "@/components/header/CreateBlog.vue";
import SeeReviews from "@/components/header/SeeReviews.vue";

const routes = [
    {
        path: "/",
        name: "HomeIndex",
        component: HomeIndex,
        meta: { hideHeaderFooter: false, mainHeader: true },
    },
    {
        path: "/logIn",
        name: "LogIn",
        component: LogIn,
        meta: { hideHeaderFooter: true }, // 헤더 숨기기
    },
    {
        path: "/createAccount",
        name: "CreateAccount",
        component: CreateAccount,
        meta: { hideHeaderFooter: true },
    },
    {
        path: "/passwordChange",
        name: "PasswordChange",
        component: PasswordChange,
        meta: { hideHeaderFooter: true },
    },
    {
        path: "/findUsername",
        name: "FindUsername",
        component: FindUsername,
        meta: { hideHeaderFooter: true },
    },
    {
        path: "/findPassword",
        name: "FindPassword",
        component: FindPassword,
        meta: { hideHeaderFooter: true },
    },
    {
        path: "/googleSignUp",
        name: "GoogleSignUp",
        component: GoogleSignUp,
        meta: { hideHeaderFooter: false },
    },
    {
        path: "/ourCompany",
        name: "OurCompany",
        component: OurCompany,
        meta: { hideHeaderFooter: false },
    },
    {
        path: "/contactUs",
        name: "ContactUs",
        component: ContactUs,
        meta: { hideHeaderFooter: false },
    },
    {
        path: "/notice",
        name: "notice",
        component: notice,
        meta: { hideHeaderFooter: false },
    },
    {
        path: "/fnq",
        name: "fnq",
        component: fnq,
        meta: { hideHeaderFooter: false },
    },
    {
        path: "/chat",
        name: "Chat",
        component: Chat,
        meta: { hideHeaderFooter: false },
    },
    {
        path: "/userPage/:userId",
        name: "UserPage",
        component: UserPage,
        meta: { hideHeaderFooter: false },
    },

    {
        path: "/events/:eventId",
        name: "EventDetailJoin",
        component: EventDetailJoin,
        meta: { hideHeaderFooter: false },
    },
    {
        path: "/manage/:eventId",
        name: "EventApprove",
        component: EventApprove,
        meta: { hideHeaderFooter: false, requiresAuth: true },
    },
    {
        path: "/allEvents",
        name: "AllEvents",
        component: AllEvents,
        meta: { hideHeaderFooter: false, mainHeader: true },
    },
    {
        path: "/postEvent",
        name: "PostEvent",
        component: PostEvent,

        meta: { hideHeaderFooter: false, requiresAuth: true },
    },
    {
        path: "/enterEvent/:eventId",
        name: "EnterEvent",
        component: EnterEvent,
        meta: { hideHeaderFooter: false },
    },
    {
        path: "/userPage/:userId",
        name: "UserPage",
        component: UserPage,
        meta: { hideHeaderFooter: false },
    },
    {
        path: "/reviews/:userId",
        name: "SeeReviews",
        component: SeeReviews,
        meta: { hideHeaderFooter: false },
    },
    {
        path: "/deleteEvent/:userId",
        name: "deleteEvent",
        component: deleteEvent,
        meta: { hideHeaderFooter: false, requiresAuth: true },
    },
    {
        path: "/reviewEvent/:eventId",
        name: "reviewEvent",
        component: ReviewEvent,
        meta: { hideHeaderFooter: false },
    },
    {
        path: "/createBlog",
        name: "createBlog",
        component: CreateBlog,
        meta: { hideHeaderFooter: false },
    },
];
// 라우터 객체 생성
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 항상 페이지 상단으로 스크롤
        return { top: 0 };
    },
});

router.beforeEach((to, from, next) => {
    const userId = store.getters.userId;

    if (to.name === "createBlog" && userId !== "hifor") {
        alert("접근 권한이 없습니다.");
        return next("/");
    }

    next();
});

// 전역 가드 추가
router.beforeEach((to, from, next) => {
    // 기본값으로 mainheader 설정
    if (to.meta.mainHeader === undefined) {
        to.meta.mainHeader = false;
    }

    // 인증이 필요한 페이지인지 확인
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        const isAuthenticated = store.getters["isLoggedIn"]; // Vuex에서 인증 상태 가져오기

        if (!isAuthenticated) {
            alert("Login is required!");
            return next("/login"); // 로그인 페이지로 리디렉트
        }
    }
    next(); // 계속 진행
});

export default router;

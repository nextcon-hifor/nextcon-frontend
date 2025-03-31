import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Home from '@/components/HelloWorld.vue';
import About from '@/components/WelcomeItem.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
];
// 라우터 객체 생성
const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
});

// 전역 가드 추가
router.beforeEach((to, from, next) => {
    // 기본값으로 mainheader 설정
  if (to.meta.mainHeader === undefined) {
    to.meta.mainHeader = false;
  }

    // 인증이 필요한 페이지인지 확인
if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = store.getters["isLoggedIn"]; // Vuex에서 인증 상태 가져오기
    
    if (!isAuthenticated) {
      alert("Login is required!");
      return next('/login'); // 로그인 페이지로 리디렉트
    }
  }
});

export default router;
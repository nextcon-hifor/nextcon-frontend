import { createStore } from 'vuex';

export default createStore({
    state: {
        token: sessionStorage.getItem('token') || null,
        userId: sessionStorage.getItem('userId') || null,
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            sessionStorage.setItem('token', JSON.stringify(user));
        },
        clearToken(state) {
        state.token = null;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem("userId");
        },
        setUserId(state, userId) {
        state.userId = userId;
        sessionStorage.setItem('userId', userId);
        },
        clearUserId(state) {
        state.userId = null;
        sessionStorage.removeItem('userId');
        },
        resetState(state) {
        state.token = null;
        state.userId = null;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        },
    },
    actions: {
        logout({ commit }) {
            commit('resetState');
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.token,
        token: (state) => state.token,
        userId: (state) => state.userId,
    },
});
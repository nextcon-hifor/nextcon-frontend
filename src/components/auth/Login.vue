<template>
    <div class="login-container">
        <div class="login-form">
            <h1>Sign in</h1>
            <p>Please login to continue to your account.</p>

            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="id">ID</label>
                    <input type="text" id="id" placeholder="id" v-model="form.userId" required />
                </div>

                <div class="form-group password-group">
                    <label for="password">Password</label>
                    <input :type="isPasswordVisible ? 'text' : 'password'" id="password" placeholder="Password"
                        v-model="form.password" required />
                    <span class="toggle-password" @click="togglePasswordVisibility">
                        {{ isPasswordVisible ? 'Hide' : 'Show' }}
                    </span>
                </div>

                <div class="form-options">
                    <label>
                        <input type="checkbox" /> Keep me logged in
                    </label>
                </div>

                <button type="submit" class="btn-primary">Sign in</button>

            </form>

            <div class="divider">
                <span>or</span>
            </div>

            <button type="button" class="btn-google" @click="handleGoogleLogin">
                <img src="/assets/img/icon_Google.png" alt="Google Icon" />
                Sign in with Google
            </button>

            <p class="create-account">
                Need an account? <router-link to="/createAccount">Create one</router-link>
            </p>
        </div>

        <div class="login-image">
            <p class="banner-title">
                Start real Korean Life <br>
                from the <span style="color: #58C3FF;">HiFor.</span>
            </p>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
    name: 'LogIn',
    setup() {
        const store = useStore(); // Vuex store에 접근
        const router = useRouter(); // Vue Router에 접근
        const form = ref({
            userId: '',
            password: ''
        });
        const isPasswordVisible = ref(false); // 비밀번호 가시성 상태

        const togglePasswordVisibility = () => {
            isPasswordVisible.value = !isPasswordVisible.value;
        };

        const handleLogin = async () => {
            try {
                // 로그인 처리 로직 (Axios를 사용해 백엔드 API 호출)
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/user/signIn`,
                    form.value,
                    {
                        withCredentials: true, // 인증 정보를 포함
                    }
                );


                // JWT 토큰 저장 (localStorage 또는 sessionStorage에 저장 가능)
                store.commit('setToken', response.data.access_token); // Vuex 상태에 저장
                store.commit('setUserId', form.value.userId);
                sessionStorage.setItem('token', response.data.access_token);



                if (response.data.passwordChangeRequired) {
                    alert('Password change is required. Redirecting to the password change page.');
                    router.push('/passwordChange'); // 비밀번호 변경 페이지로 리다이렉트
                    return;
                }

                alert('Login succeeded');
                router.push('/'); // 로그인 후 메인 페이지로 이동
            } catch (error) {
                console.error('로그인 오류:', error);
                alert('Your HiFor Username or Password is incorrect');
            }
        };

        const handleGoogleLogin = () => {
            window.location.href = `${import.meta.env.VITE_API_BASE_URL}/user/to-google`;

        };

        const handleFindUsername = () => {

        }
        return {
            form,
            handleLogin,
            handleGoogleLogin,
            handleFindUsername,
            isPasswordVisible,
            togglePasswordVisibility,
        };
    }

};
</script>

<!-- css -->
<style scoped>
/* 반응형 모바일 css */
@media screen and (max-width:768px) {

    .banner-image {
        display: none;
    }

    .banner-title {
        display: none;
    }

    .login-container {
        padding: 15px;
        padding-top: 30px;
        margin-top: 50px;
        justify-items: center;
    }

    .login-form {
        width: 100%;
    }

    .login-form h1 {
        color: #58C3FF;
        text-align: center;
        font-size: px;
    }

    .login-form p {
        color: #555;
        text-align: center;
        padding: 5px 50px;
    }

    .form-group label {
        font-size: 14px;
        color: #555;
        width: 100%;
    }

    .form-group input {
        width: 100%;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 12px;
        padding: 10px;
    }

    .form-group select {
        width: 100%;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 12px;
        padding: 10px;
    }

    .form-options {
        font-size: 14px;
        color: #555;
        padding: 10px 0px;
    }

    .btn-primary {
        background-color: #58C3FF;
        color: #fff;
        border: none;
        padding: 10px;
        width: 100%;
        height: 50px;
        font-size: 16px;
        border-radius: 12px;
        cursor: pointer;
        margin-bottom: 20px;
        transition: all 0.3s ease;
    }

    .btn-google {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background: #fff;
        border: 1px solid #ccc;
        padding: 10px;
        width: 100%;
        height: 50px;
        font-size: 14px;
        border-radius: 12px;
        margin-top: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-google img {
        width: 20px;
        height: 20px;
    }

    .divider {
        text-align: center;
    }

    .create-account {
        margin-top: 15px;
        text-align: center;
    }

    .toggle-password {
        display: none;
    }
}

/* 웹 */
@media screen and (min-width:769px) {
    .login-container {
        display: flex;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
        height: 100vh;
        min-height: 680px;
        padding: 30px 150px;
        max-width: 1470px;
        justify-self: center;
    }

    .login-form {
        flex: 1;
        padding: 40px;
        max-width: 450px;
        align-content: center;
    }

    .login-form h1 {
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .login-form p {
        color: #777;
        margin-bottom: 20px;
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
        border-radius: 12px;
        box-sizing: border-box;
    }

    .password-group {
        position: relative;
    }

    .toggle-password {
        position: absolute;
        right: 10px;
        top: 65%;
        transform: translateY(-50%);
        cursor: pointer;

    }

    .form-options {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .form-options label {
        font-size: 16px;
        color: #555;
    }

    .btn-primary {
        background-color: #58C3FF;
        color: #fff;
        border: none;
        padding: 10px;
        width: 100%;
        height: 50px;
        font-size: 16px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .divider {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
        color: #aaa;
    }

    .divider span {
        background: #fff;
        padding: 0 10px;
    }

    .btn-google {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background: #fff;
        border: 1px solid #ccc;
        padding: 10px;
        width: 100%;
        height: 50px;
        font-size: 14px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .btn-google:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .btn-google img {
        width: 20px;
        height: 20px;
    }

    .create-account {
        text-align: center;
        font-size: 14px;
        color: #777;
    }

    .create-account a {
        color: #4a5efc;
    }

    .create-account a:hover {
        text-decoration: underline !important;
    }

    .login-image {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('/assets/img/img_LogInBanner2.png');
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom;
        border-radius: 24px;
        margin: 10px;
    }

    .banner-title {
        width: 100%;
        height: 100%;
        padding: 45px;
        font-size: 48px;
        font-weight: bold;
        color: #FFFFFF;
    }
}
</style>
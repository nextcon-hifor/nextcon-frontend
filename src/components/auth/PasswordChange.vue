<template>
    <!-- mobile -->
    
<form @submit.prevent="handleSubmit">
    <div class="mobile">
        <div class="container mobile-login">
            <div class="row">
                <div class="col">
                    <router-link to="/"><img class="back-icon" src="/assets/Union.png" alt=""></router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <p class="m-login-title">Change Password</p>
                </div>
                <div class="col-12">
                    <input class="m-enter-pw" v-model="currentPassword" :type="isCurrentPasswordVisible ? 'text' : 'password'"  id="currentPassword" placeholder="Current Password" required>
                    <button type="button" @click="checkCurrentPassword">확인</button>
                    <div v-if="isCurrentPasswordValid">
                        <input class="m-enter-pw" v-model="newPassword" :type="isNewPasswordVisible ? 'text' : 'password'"  id="newPassword" placeholder="New Password" required>
                        <input class="m-enter-pw" v-model="confirmPassword" :type="isConfirmNewPasswordVisible ? 'text' : 'password'"  id="confirmPassword" placeholder="Confirm New Password" required>
                    </div>
                </div>
                <div class="col-12">
                    <button class="m-login-btn1" type="submit">Change password</button>
                    <button class="m-login-btn2"><router-link class="go-signup-text" to="/">Change later</router-link></button>
                </div>
            </div>
        </div>
     </div>
</form>

    <!-- 웹 -->
    
<form @submit.prevent="handleSubmit">
     <div class="web">
        <div class="contaienr web-login">
            <div class="row">
                <div class="col">
                    <router-link to="/"><img class="back-icon" src="/assets/Union.png" alt=""></router-link>
                </div>
            </div>
            <div class="row login-box1">
                <div class="col-8">
                    <div class="login-box-left">
                        <p class="login-sub1">No worries..!</p>
                        <p class="login-sub2">We can help you!!</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="login-box-right">
                        <div class="login-box2">
                            <p class="login-text1">Change Password</p>

                            <div class="row">
                                <div class="col-12 input-with-icon">
                                    <input class="enter-cp" v-model="currentPassword" :type="isCurrentPasswordVisible ? 'text' : 'password'" id="currentPassword" placeholder="Current Password" required>
                                    <i
                                        class="fa"
                                        :class="isCurrentPasswordVisible ? 'fa-eye-slash' : 'fa-eye'"
                                        @click="toggleCurrentPasswordVisibility"
                                    ></i>
                                    <button class="reset-btn" type="button" @click="checkCurrentPassword">confirm</button>
                                </div>
                                <div v-if="isCurrentPasswordValid">
                                    <div class="col-12 input-with-icon">
                                        <input class="enter-password" v-model="newPassword" :type="isNewPasswordVisible ? 'text' : 'password'" id="newPassword" placeholder="New Password" required>
                                    </div>
                                    <i
                                        class="fa"
                                        :class="isNewPasswordVisible ? 'fa-eye-slash' : 'fa-eye'"
                                        @click="toggleNewPasswordVisibility"
                                    ></i>
                                    <div class="col-12 input-with-icon">
                                        <input class="enter-password" v-model="confirmPassword" :type="isConfirmNewPasswordVisible ? 'text' : 'password'" id="confirmPassword" placeholder="Confirm New Password" required>
                                    </div>
                                    <i
                                        class="fa"
                                        :class="isConfirmNewPasswordVisible ? 'fa-eye-slash' : 'fa-eye'"
                                        @click="toggleConfirmNewPasswordVisibility"
                                    ></i>
                                    <div class="col-12">
                                        <button class="reset-btn" type="submit">Reset Password.</button>
                                    </div>
                                </div>
                                <div>
                                    <button class="reset-btn"><router-link to="/">Change later</router-link></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
</form>
</template>
  
  <script>
  import PasswordChange from '../../js/auth/PasswordChange.js';
  
  export default PasswordChange;
  </script>
  

  <!-- css -->
<style scoped>


html, body{
    height: 100%;
}

/* 반응형 모바일 css */
@media screen and (max-width:768px) {
    .web{
        display: none;
    }
    .mobile{
        display: block;
    }
    .mobile-login{
        margin-top: 60px;
    }
    .back-icon{
        width: 15px;
        height: 15px;
        filter: invert(1);
    }
    .m-login-title{
        margin-top: 60px;
        font-size: 36px;
    }
    .m-enter-pw{
        height: 50px;
        width: 100%;
        border: 1px solid;
        font-size: 15px;
        padding: 15px;
        margin-top: 32px;
        border-radius: 10px;
    }
    .show-id{
        height: 50px;
        width: 100%;
        border: 1px solid;
        font-size: 15px;
        padding: 15px;
        margin-top: 32px;
        border-radius: 10px;
    }
    .m-login-btn1{
        padding-top: 12px;
        padding-bottom: 12px;
        width: 100%;
        padding-top: 12px;
        padding-bottom: 12px;
        margin-top: 32px;
        background-color: #12CF51;
        border-radius: 10px;
        border: none;
        color: #FFF;
    }
    .m-login-btn2{
        padding-top: 12px;
        padding-bottom: 12px;
        width: 100%;
        padding-top: 12px;
        padding-bottom: 12px;
        margin-top: 16px;
        background-color: #07722B;
        border-radius: 10px;
        border: none;
        color: #FFF;
        margin-bottom: 32px;
    }
}

/* 웹 */
@media screen and (min-width:769px){
    .mobile{
        display: none;
    }
    .web{
        display: block;
    }
    .web-login{
        display: flex;
        flex-direction: column;
        background: linear-gradient(#58D89A, #3FDE83);
        padding: 60px;
        padding-top:30px;
        height: 100%;
    }
    .row{
        max-width: 100%;
    }

    .login-box1{
        place-items: center;
        height: 100%;
    }
    .login-box-left{
        
    }
    .login-sub1{
        color: #FFFFFF;
        font-weight: 700;
        font-size: 96px;
    }
    .login-sub2{
        width: max-content;
        color: #FFFFFF;
        font-size: 32px;
        font-style: italic;
        border: 3px solid;
        border-color: #FFFFFF;
        padding-left: 15px;
        padding-right: 15px;
    }

    .login-box-right{
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        padding:40px;
        border-radius: 20px;
        height: 100%;
    }
    .login-box2{
        height: 100%;
    }
    .login-text1{
        font-size: 36px;
        color: #FFFFFF;
        font-weight: 700;
        margin-bottom: 0px;
    }
    .login-text2{
        font-size: 16px;
        color: #FFFFFF;
    }
    .enter-cp{
        width: 100%;
        height: 55px;
        background: none;
        border: 1px solid;
        border-color: #FFF;
        border-radius: 10px;
        margin-bottom: 10px;
        padding: 5px;
        margin-top: 30px;
    }
    .enter-password{
        width: 100%;
        height: 55px;
        background: none;
        border: 1px solid;
        border-color: #FFF;
        border-radius: 10px;
        margin-bottom: 10px;
        padding: 5px;
    }
    input::placeholder{
        color:#FFF;
    }
    input{
        color:#FFF;
    }
    .reset-btn{
        height: 50px;
        width: 100%;
        background: honeydew;
        border: none;
        border-radius: 12px;
        margin-top: 12px;
    }
}

</style>
<template>
    <div class="mobile">
        <div class="container mobile-login">
            <div class="row">
                <div class="col">
                    <router-link to="/"><img class="back-icon" src="/assets/Union.png" alt=""></router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <p class="m-login-title">Forgot ID?</p>
                </div>
                
              <form @submit.prevent="submitEmail">
                <div class="col-12">
                    <input class="m-enter-email" type="email" v-model="email" required placeholder="Email Address">
                    <textarea class="show-id" name="" id="" placeholder="Show ID here"></textarea>
                </div>
                <div class="col-12">
                    <button class="m-login-btn1" type="submit">FIND ID</button>
                </div>
              </form>
              <p v-if="message">{{ message }}</p>
            </div>
        </div>
    </div>


    <!-- web -->
     <div class="web">
        <div class="contaienr web-login">
            <div class="row">
                <div class="col">
                    <a href="#">
                        <router-link to="/"><img class="back-icon" src="/assets/Union.png" alt=""></router-link>
                    </a>
                </div>
            </div>
            <div class="row login-box1">
                <div class="col-8 login-box-left">
                    <p class="login-sub1">No worries..!</p>
                    <p class="login-sub2">We can help you!!</p>
                </div>
                <div class="col-4 login-box-right">
                        <p class="login-text1">Forgot ID ?</p>
                        <form @submit.prevent="submitEmail">
                          <div class="row">
                              <div class="col-12">
                                  <input class="enter-email" type="email" v-model="email" required placeholder="Email Address">
                              </div>
                              <div class="col-12">
                                  <button class="reset-btn" type = "submit">Find ID</button>
                              </div>
                              <p v-if="message">{{ message }}</p>
                          </div>
                      </form>
                    </div>
                </div>
            </div>
        </div>    
  </template>
  
  <script>
  import FindUsername from '../../js/auth/FindUsername.js';
  
  export default FindUsername;
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
    .m-enter-email{
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
        background-color: 12CF51;
        border-radius: 10px;
        border: none;
        color: #FFF;
        margin-bottom: 32px;
    }
}

/* 웹 */
@media screen and (min-width:769px){
    .web{
        display: block;
    }
    .mobile{
        display: none;
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
    .enter-email{
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
  
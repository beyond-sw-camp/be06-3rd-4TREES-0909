<template>
<div class="loginContainer">
  <div class="loginWrap">
    <div class="loginLogo">
        <router-link to="/">
          <h1 class="logo">
            <span>0909</span>
          </h1>
        </router-link>
      </div>
    <!-- 인증 메시지 -->
    <div v-if="isVerified">
        <h5>이메일 인증이 완료 되었습니다. <br> 아래 버튼을 클릭하여 로그인 페이지로 이동하세요.</h5>
        <!-- 로그인 버튼 -->
        <router-link to="/login" class="loginButton">로그인하러 가기</router-link>
    </div>
    <div v-else>
        <h5>이메일 인증에 실패하였습니다. 관리자에게 문의해주세요.</h5>
    </div>

  </div>
</div>
</template>
  
  <script>
  import { useUserStore } from '@/stores/useUserStore';
  import { mapStores } from 'pinia';
  
  export default {
    name: "EmailVerifyPage",
    data() {
      return {
        isVerified: false
      }
    },
    methods: {
      async verify() {
        const email = this.$route.query.email;
        const uuid = this.$route.query.uuid;
        const result = await this.userStore.emailVerify(email, uuid);
        if(result) {
            this.isVerified = true;
        } else {
            this.isVerified = false;
        }
      }
    },
    computed: {
      ...mapStores(useUserStore)
    },
    mounted() {
        this.verify();
    },
  }
  </script>
  
  <style scoped>
  /* 기본 리셋 */
ul {
  padding-left: 0;
  list-style: none;
}

input,
button {
  border: 0;
  border-radius: 0;
  outline: 0;
  background: transparent;
  padding: 0;
}

/* 전체적인 스타일 */
html {
  text-size-adjust: none;
  font-size: 62.5%;
}

.loginContainer {
  line-height: 1.5;
  font-family: "Pretendard", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
}

/* 로그인 컨테이너 */
.loginContainer .loginWrap {
  text-align: center;
  margin-top: 1.6rem;
}

.loginContainer .loginLogo h1 {
  display: inline-block;
  width: 30rem;
  height: 15rem;
  background: url("../../assets/images/market/logo_공동구매.png") no-repeat;
  background-size: 100%;
}

.loginContainer .loginLogo h1 span {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

/* 인증 메시지 */
.loginContainer h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 2rem;
}

/* 로그인 버튼 스타일 */
.loginButton {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.6rem;
  color: #fff;
  border:2px solid#c4b0d1;
  background-color: #c38ffd;
  border: none;
  border-radius: 0.4rem;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.loginButton:hover {
  background-color: #0056b3; /* 호버 상태의 색상 */
}

/* 화면 크기에 따라 다르게 적용될 스타일 */
@media screen and (min-width: 1024px) {
  .loginContainer .loginWrap {
    max-width: 40rem;
    margin: 0 auto;
  }

  .loginContainer .loginLogo h1 {
    width: 47rem;
    height: 15rem;
  }
}

@media screen and (max-width: 320px) {
  .layerContainer .layer {
    width: calc(100% - 1rem);
  }
}

  
  </style>
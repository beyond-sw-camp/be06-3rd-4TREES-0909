<template>
    <h2>로그인 페이지</h2>

    <input v-model="member.email" type="email">
    <input v-model="member.password" type="password">
    <button @click="login">로그인</button>
    <span> {{ memberStore.isLoggedIn }}</span>
</template>
<script>
import { useMemberStore } from './useMemberStore';
import { mapStores } from 'pinia';
export default {
    name: 'LoginPage',
    data() {
        return {
            member: {
                email: null,
                password: null
            }
        }
    },
    computed: {
        ...mapStores(useMemberStore) // 어떤 저장소랑 연결시켜 주겠다.
    },

    methods: {
        login() {
            console.log("로그인 시도")
            this.memberStore.login(this.member);
        }
    }
}
</script>
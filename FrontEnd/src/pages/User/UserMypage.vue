<template>
    <UserMypageInfoComponent></UserMypageInfoComponent>
    <div class="frame-sm">
        <UserMypageAsideComponent></UserMypageAsideComponent>
        <div v-if="isLoading"></div>
        <router-view v-else></router-view>
    </div>
    <div style="margin-bottom: 30px;"></div>
</template>

<script>
import UserMypageInfoComponent from '@/components/User/UserMypageInfoComponent.vue';
import { mapStores } from 'pinia';
import { useUserStore } from '@/stores/useUserStore';
import UserMypageAsideComponent from '@/components/User/UserMypageAsideComponent.vue';


export default {
    name: "UserMypage",
    data() {
        return { response:{}, isLoading:true
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    mounted(){
        this.setMypage();
    },
    methods: {
        async setMypage(){
            await this.userStore.userDetail();
            this.isLoading=false;
        }
    },
    components: {
        UserMypageInfoComponent,
        UserMypageAsideComponent,
    }
}

</script>

<style scoped>
.head-mypage ~ .frame-sm {
    margin-top: 45px;
}

.frame-sm {
    display: flex;
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
}

div {
    display: block;
    unicode-bidi: isolate;
}
html, body {
    height: 100%;
    color: #333;
    font-size: 14px;
    font-weight: 400;
    /* line-height: 1.4; */
    font-family: 'Pretendard', sans-serif;
    word-break: break-all;
}
.frame-wrap, .clear:after, [class*="frame-"]:after {
    display: block;
    clear: both;
    content: '';
}
</style>
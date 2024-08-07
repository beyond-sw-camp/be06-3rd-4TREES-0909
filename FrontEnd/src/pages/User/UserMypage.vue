<template>
    <div id="wrapper">
    <HeaderComponent @change-component="changeComponent"></HeaderComponent>
    <UserMypageInfoComponent></UserMypageInfoComponent>
    <div class="frame-sm">
        <UserMypageAsideComponent></UserMypageAsideComponent>
        <router-view></router-view>
    </div>
    <div style="margin-bottom: 30px;"></div>
    <FooterComponent></FooterComponent>
    </div>
</template>

<script>
import HeaderComponent from '@/components/User/HeaderComponent.vue';
import FooterComponent from '@/components/User/FooterComponent.vue';
import UserMypageInfoComponent from '@/components/User/UserMypageInfoComponent.vue';
import { mapStores } from 'pinia';
import { userBasicStore } from '@/stores/userBasicStore';
import UserMypageAsideComponent from '@/components/User/UserMypageAsideComponent.vue';


export default {
    name: "UserMypage",
    data() {
        return { response:{},
        }
    },
    computed: {
        ...mapStores(userBasicStore)
    },
    mounted(){
        this.setMypage();
    },
    methods: {
        
        setMypage(){
            this.userBasicStore.userDetail();
        }
    },
    components: {
        HeaderComponent,
        FooterComponent,
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
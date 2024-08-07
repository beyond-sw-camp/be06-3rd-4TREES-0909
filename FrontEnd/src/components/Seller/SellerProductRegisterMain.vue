
<template>
        <div id="root">
        <div class="css-ey8mg8" style="">
            <div class="css-1rhwfdb">
                <SellerHeaderComponent></SellerHeaderComponent>
                <SellerProductRegisterComponent></SellerProductRegisterComponent>
            </div>
        </div>
        </div>
</template>

<script>
import SellerHeaderComponent from './SellerHeaderComponent.vue';
import SellerProductRegisterComponent from './SellerProductRegisterComponent.vue';

export default {
    name: 'SellerProductRegisterMain',
    data() {
        return {
        }
    },
    methods: {
    }, components: {
        SellerHeaderComponent,
        SellerProductRegisterComponent

    },
}
</script>

<style scoped>
#skipNav {
    position: absolute;
    left: -9999px;
}
a:link {
    color: #4f4f4f;
    text-decoration: none;
}
a {
    color: var(--bs-link-color);
    text-decoration: underline;
}
* {
    font-family: "Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    scroll-behavior: smooth;
}
a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}
</style>
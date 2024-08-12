<template>
    <div id="wrapper">
        <header>
            <router-link to="/"><img class="order-history-logo" src="../../assets/images/market/logo_공동구매.png"></router-link>
            <!--메뉴-->
            <nav class="content_nav">
                <a href="" class="active">구매 내역</a>
            </nav>
        </header>

        <!--메인 컨텐츠-->
        <div id="main_content">
            <!--필터-->

            <!--상품 내용-->
            <div class="goods">
                <div v-if="isLoading"></div>
                <div v-else-if="orderHistoryStore.orderHistoryList.length> 0">
                <OrderHistoryComponent v-for="(orderHistory, idx) in orderHistoryStore.orderHistoryList" :key=idx :orderHistory="orderHistory"></OrderHistoryComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OrderHistoryComponent from '@/components/User/OrderHistoryComponent.vue';
import { useOrderHistoryStore } from '@/stores/useOrderHistoryStore';
import { mapStores } from 'pinia';
export default {
    data() {
        return {
            page: 0,
            isLoading: true
        }
    },
    computed: {
        ...mapStores(useOrderHistoryStore) // 어떤 저장소랑 연결시켜 주겠다.
    },
    components: {
        OrderHistoryComponent,
    },
    methods: {
        async getOrderHistoryList() {
            await this.orderHistoryStore.getOrderHistoryList(this.page);
            this.isLoading = false;
        },
    },
    created() {
        this.getOrderHistoryList();
    }
}
</script>

<style scoped>
.order-history-logo{
    margin-top:10px;
    width: 250px;
}

/*모달창*/
div[class^="modal_"] {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.bg {
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.6);
}

.return_modal,
.decide_modal,
.review_modal {
    text-align: center;
    position: absolute;
    background-color: #fff;
    padding: 24px;
    border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    -o-border-radius: 2px;
    width: 300px;
}

.return_modal h2,
.decide_modal h2,
.review_modal h2 {
    font-size: 18px;
    margin-bottom: 1rem;
    font-weight: 600;
}

.return_modal p,
.decide_modal p {
    font-size: 1rem;
    margin: 1rem 0px 1.5rem;
    line-height: 1.5;
    letter-spacing: -1px;
}

.review_modal p {
    color: rgb(127, 127, 127);
    font-size: 1rem;
    margin: 1rem 0px 1.5rem;
    line-height: 1.5;
    letter-spacing: -1px;
}

div[class^="modal_"] .btn_area {
    display: flex;
    line-height: 1;
}

div[class^="modal_"] .btn_area a:hover {
    color: #fff;
}

.btn_no {
    margin-right: 0.5rem;
    outline: none;
    border: none;
    background-color: #f4f4fa;
    color: #72707f;
}

.btn_yes,
.btn_yes:visited {
    display: inline-block;
    background-color: #ff5058;
    color: #fff;
}

.btn_no,
.btn_yes {
    width: 120px;
    font-size: 1rem;
    padding: 1rem 0;
    border: none;
    outline: none;
}

div.hidden {
    display: none;
}

/*필터 영역*/
.filter_nav {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    height: 4rem;
    -webkit-box-align: center;
    align-items: center;
}

.status_filter button {
    padding: 0px 0.5rem;
    height: 1.5rem;
    border-radius: 12px;
    text-align: center;
    font-size: 13px;
    color: rgb(155, 153, 169);
    background-color: rgb(244, 244, 250);
    border: none;
    outline: none;
}

.status_filter button.active {
    color: #fff;
    background: rgb(255, 80, 88);
}

.pay_filter button {
    background-color: #fff;
    border: none;
    outline: none;
}

/*공통*/
html, body, div, header, nav, section, aside, article, footer, ul, ol, li, dl, dt, dd, h1, h2, h3, p {
    margin: 0;
    padding: 0;
}
ul {
    list-style: none;
}

/* 링크 스타일 */
a {
    color: rgb(33, 33, 33);
    text-decoration: none;
}

/* 기본 스타일 */
body {
    color: rgb(33, 33, 33);
    font-size: 15px;
}

/* 건너뛰기 링크 */
#skipNav {
    position: absolute;
    left: -9999px;
}
#skipNav:focus {
    left: 50%;
    margin: 3px 0 0 -3em;
    padding: 5px 15px;
    background-color: #000;
    color: #fff;
    outline: 0;
    z-index: 10;
}

/* 전체적인 레이아웃 설계 */
#main_content, header, footer {
    width: 640px;
    margin: 0 auto;
    box-sizing: border-box;
}

/*헤더*/
header {
    position: relative;
    line-height: 3.125rem;
    text-align: center;
    font-weight: bold;
    background-color: rgb(255, 255, 255);
    z-index: 1;
}
header h1 {
    color: rgb(30, 29, 41);
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 50px;
    font-size: 1.125rem;
    font-weight: bold;
}
header nav {
    display: flex;
}
header nav a {
    flex-basis: 100%;
    height: 2.875rem;
    font-size: 1.125rem;
    color: #8a8e91;
    border-bottom: 1px solid rgb(234, 233, 241);
}
header nav a:hover ,header nav a:active {
    color: #8a8e91;
}
header nav a.active {
    color: rgb(33, 33, 33);
    border-bottom: 3px solid rgb(33, 33, 33);
}
header nav a.active:hover, header nav a.active:active {
    color: rgb(33, 33, 33);
} 



</style>
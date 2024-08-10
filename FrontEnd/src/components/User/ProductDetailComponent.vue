<template>
    <div id="wrapper">
        <!-- main_content 영역 -->
        <div id="main_content">
            <!-- detail_content -->
            <div id="detail_content">
                <div class="container text-center">
                    <div class="row">
                        <div class="col detail_content_img">
                            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img :src="groupbuyStore.progressGroupbuy.productThumbnailImg"
                                            class="d-block w-100" alt="상품 사진1">
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button"
                                    data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button"
                                    data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <div class="col detail_content_info">
                            <h2>{{ groupbuyStore.progressGroupbuy.productName }}</h2>
                            <p>{{ new Intl.NumberFormat('ko-KR').format(groupbuyStore.progressGroupbuy.bidPrice)
                                }}<span>원</span></p>
                            <hr>
                            <div id="detail_content_info_mid">
                                <p>
                                    <img src="../../assets/images/goods/time.png" alt="지난 시간">
                                    <span>&nbsp;{{ remainingTime }}</span>
                                </p>
                            </div>
                            <div id="detail_content_info_state">
                                <p>
                                    <span>카테고리</span>
                                    <span>{{ groupbuyStore.getCategoryText(groupbuyStore.progressGroupbuy.categoryIdx)
                                        }}</span>
                                </p>
                                <p>
                                    <span>남은수량/목표수량</span>
                                    <span>{{ groupbuyStore.progressGroupbuy.gpbuyRemainQuantity }}/{{
                                        groupbuyStore.progressGroupbuy.gpbuyQuantity }}</span>
                                </p>
                                <p>
                                    <span>업체명</span>
                                    <span>{{ groupbuyStore.progressGroupbuy.companyName }}</span>
                                </p>
                            </div>
                            <div>
                                <div class="container detail_content_info_btn">
                                    <div class="row g-2 justify-content-start align-items-center">
                                        <div class="col-8"></div>
                                        <div class="col-4">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <button class="btn btn-outline-secondary" type="button"
                                                        @click="changeQuantity(-1)">-</button>
                                                </div>
                                                <input class="form-control text-center" v-model="quantity"
                                                    :min="minQuantity" :max="maxQuantity" id="quantityInput" readonly>
                                                <div class="input-group-append">
                                                    <button class="btn btn-outline-secondary" type="button"
                                                        @click="changeQuantity(1)">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row g-2 justify-content-start align-items-center mt-3">
                                        <div class="col-4"></div>
                                        <div class="col-4">
                                            <div @click="likes" class="p-3 info_btn1 text-center"
                                                :style="{ backgroundColor: isLiked ? '#c981f1' : '#ccc' }">
                                                <img src="../../assets/images/goods/w_heart.svg" alt="찜"> 찜
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="p-3 info_btn3 text-center" @click="joinGroupbuy">바로구매</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- // detail_content -->
            <hr>

            <!-- goods_info -->
            <div id="goods_info">
                <div class="container text-center info_area">
                    <div class="info_content">
                        <div>
                            <p>
                                상품정보
                            </p>
                        </div>
                        <div>
                            {{ groupbuyStore.progressGroupbuy.productContent }}
                        </div>
                    </div>
                    <img class="product_img" v-for="(image, index) in groupbuyStore.progressGroupbuy.productImgUrlList"
                        :key="index" :src="image">
                </div>
            </div>
            <!-- // goods_info -->
            <!-- // main_content 영역 -->


        </div>
    </div>
</template>

<script>
import { useGroupbuyStore } from '@/stores/useGroupbuyStore';
import { mapStores } from 'pinia';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default {
    name: "ProductDetailComponent",
    data() {
        return {
            quantity: 1,
            remainingTime: '',
            minQuantity: 1,
            maxQuantity: 1,
            isLiked: false
        }
    },
    methods: {
        async likes() {
            const result = await this.groupbuyStore.getGroupbuyLikes(this.$route.params.idx);
            if (result) {
                this.isLiked = this.groupbuyStore.isLiked;
            } else {
                alert("일반 회원 계정으로 로그인이 필요합니다.")
            }
        },
        changeQuantity(amount) {
            const newValue = this.quantity + amount;
            if (newValue >= this.minQuantity && newValue <= this.groupbuyStore.progressGroupbuy.gpbuyRemainQuantity) {
                this.quantity = newValue;
            }
        },
        calculateRemainingTime(bidEndTime) {
            const now = dayjs();
            const bidEndDate = dayjs(bidEndTime);

            if (bidEndDate.isBefore(now)) {
                return "시간이 만료되었습니다.";
            }

            const diff = dayjs.duration(bidEndDate.diff(now));

            const hours = String(diff.days() * 24 + diff.hours()).padStart(2, '0');
            const minutes = String(diff.minutes()).padStart(2, '0');
            const seconds = String(diff.seconds()).padStart(2, '0');

            return `${hours}:${minutes}:${seconds}`;
        },
        updateRemainingTime() {
            this.remainingTime = this.calculateRemainingTime(this.groupbuyStore.progressGroupbuy.gpbuyEndedAt);
        },
        joinGroupbuy() {
            this.$router.push({ path: '/order', query: { quantity: this.quantity, gpbuyIdx: this.groupbuyStore.progressGroupbuy.gpbuyIdx } });
        },
        async getProgressGroupbuy() {
            await this.groupbuyStore.getProgressGroupbuy(this.$route.params.idx);
            this.isLiked = this.groupbuyStore.progressGroupbuy.isLiked;

        }
    },
    computed: {
        ...mapStores(useGroupbuyStore)
    },
    mounted() {
        this.getProgressGroupbuy();
        this.updateRemainingTime();
        setInterval(this.updateRemainingTime, 1000);
    }
}

</script>

<style scoped>
/* 전체적인 레이아웃 설계 */
#main_content {
    width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
}


#detail_content {
    margin-top: 40px;
    height: 530px;
}

.detail_content_img {
    padding-left: 0;
    margin: auto 0;
}

.detail_content_info {
    text-align: left;
    padding-left: 35px;
    padding-right: 0;
}

.detail_content_info>h2 {
    padding-top: 5px;
    font-size: 28px;
    font-weight: bold;
}

.detail_content_info>p {
    margin: 20px 0 15px;
    font-size: 33px;
    font-weight: 600;
}

.detail_content_info>p>span {
    font-weight: normal;
    font-size: 28px;
}

#detail_content_info_mid>p {
    width: 200px;
    margin-top: 10px;
    float: left;
}

#detail_content_info_mid>p::after {
    margin-left: 10px;
    color: #ccc;
}

#detail_content_info_mid>p:nth-child(4) {
    width: 110px;
    float: right;
    text-align: right;
    cursor: pointer;
}

#detail_content_info_mid>p:nth-child(3)::after,
#detail_content_info_mid>p:nth-child(4)::after {
    content: "";
}

#detail_content_info_mid>p>img {
    width: 20px;
}

#detail_content_info_mid>p:nth-child(2)>img {
    width: 25px;
}

#detail_content_info_mid>p>span {
    color: #ccc;
    font-size: 16px;
}

#detail_content_info_state {
    margin-top: 90px;
}

#detail_content_info_state>p {
    margin-bottom: 20px;
}

#detail_content_info_state>p>span:nth-child(1) {
    color: #999;
    display: inline-block;
    width: 150px;
}

#detail_content_info_state img {
    width: 12px;
}


.detail_content_info_btn {
    margin-top: 44px;
    padding: 0;
}

.info_btn1,
.info_btn2,
.info_btn3 {
    font-size: 18px;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

.info_btn1 {
    background-color: #ccc;
}

.info_btn_active {
    background-color: #ca64ef;

}

.info_btn1>img {
    width: 19px;
}

.info_btn2 {
    background-color: #FFA425;
}

.info_btn2>img {
    width: 22px;
}

.info_btn3 {
    background-color: #ac6af6;
}

/* goods_info */
.info_area {
    padding: 0;
    margin-bottom: 40px;
}

.product_img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
}

.info_area_left {
    border-right: 1px solid rgb(238, 238, 238);
}

.info_content {
    text-align: left;
    margin-top: 50px;
    padding-bottom: 10px;
}

.info_content>div:nth-child(1) {
    width: 650px;
    border-bottom: 1px solid rgb(238, 238, 238);
    font-weight: bold;
}

.info_content>div>p {
    font-size: 18px;
    margin-bottom: 15px;
}

.info_content>div:nth-child(2) {
    margin-top: 40px;
}

.text-center{
    height:100%
}
.row{
    height:100%
}
.detail_content_img{
    height:100%
}
.carousel{
    height:100%
}
.carousel-inner{
    height: 100%;
}
.carousel-item{
    height:100%
}
.w-100{
    max-height: 100%;
}
</style>
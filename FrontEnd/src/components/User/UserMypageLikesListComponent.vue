<template>
    <div class="frame-right">
        <div class="frame-cnt-inner">
            <div class="list-title-area">
                <h3 class="title-list">관심 공구 목록</h3>
            </div><!--// list-title-area -->

            <div class="order-list-slide">
                <div
                    class="swiper-container order-swiper-list swiper-container-initialized swiper-container-horizontal">
                    <div v-if="isLoading"></div>
                    <ul  v-else v-for="(likes, index) in groupbuyStore.gpbuyLikesList" :key="index" class="swiper-wrapper"
                        style="transform: translate3d(0px, 0px, 0px);">
                        <li class="swiper-slide swiper-slide-active" style="width: 820px; margin-right: 10px;">
                            <!--// list-head -->
                            <div class="order-content-box">
                                <div class="prd-info-area">
                                    <div class="inner">
                                        <div class="column img"><a href="#"><img :src="likes.productThumbnailImg"
                                                    alt="상품이미지"></a></div>
                                        <div class="column tit">
                                            <!-- [Dev] 20220420 추가 : 당일/새벽배송 아이콘 추가 -->

                                            <div class="tit" style="width: 300px;">
                                                <a href="#">{{ likes.productName }}</a>
                                            </div>
                                            <p class="desc">
                                                목표수량 / 남은수량<br>{{ likes.gpbuyQuantity }} / {{
                                                likes.gpbuyRemainQuantity}}</p>
                                        </div>

                                        <div class="column tit">
                                            <!-- [Dev] 20220420 추가 : 당일/새벽배송 아이콘 추가 -->

                                            <div class="tit">
                                                <a href="#" id="endDate">종료일시</a>
                                            </div>
                                            <p class="desc">
                                                {{ formatDateTime(likes.gpbuyEndedAt) }}</p>
                                        </div>

                                        <div class="price-item">
                                            <div class="dlv-nmr">
                                                <p class="dlv-nmr-price">
                                                    <span class="num">{{ likes.bidPrice }}</span>원
                                                </p>

                                            </div>
                                        </div>
                                        <div class="column col-btn-group">
                                            <div class="col-btn-group-inn">
                                                <a href="javascript:void(0);"
                                                    @click="cancleLikes(likes.gpbuyIdx)"
                                                    class="prd-control-btn">
                                                    <span>취소</span></a>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>



        </div><!--// frame-sm -->
    </div>


</template>

<script>
import { userBasicStore } from '@/stores/userBasicStore';
import { groupbuyStore } from '@/stores/groupbuyStore';
import { mapStores } from 'pinia';
export default {
    name: "UserMypageLikesListComponent",
    data() {
        return {  isLoading: true}
    },
    beforeRouteUpdate(to, from, next) {
        console.log("test");
        console.log(to);
        console.log(from);
        console.log(next);
    },
    computed: {
        ...mapStores(userBasicStore, groupbuyStore)
    },
    mounted() {
        this.setData();
    },
    methods: {
        showAlert() {
            alert("준비중인 기능입니다.")
        },

        async setData() {
            await this.groupbuyStore.myLikesList();
            this.isLoading = false;
        },
        formatDateTime(dateTimeString) {
            const date = new Date(dateTimeString);

            // 년, 월, 일, 시, 분을 추출
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            // 원하는 형식으로 반환
            return `${year}.${month}.${day}  ${hours}:${minutes}`;
        },
        cancleLikes(gpbuyIdx){
            this.groupbuyStore.cancleLikes(gpbuyIdx);
            alert("취소되었습니다.");
    
        },

    },
    components: {

    }
}

</script>

<style scoped>
.frame-right {
    width: 100%;
    padding: 0 4rem;
    float: right;
}

html,
body,
div,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
ul,
ol,
li,
dl,
dt,
dd,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
fieldset,
form,
label,
legend,
input,
button,
textarea,
select {
    margin: 0;
    padding: 0;
}

div {
    display: block;
    unicode-bidi: isolate;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}

#endDate {
    cursor: default;
}

.frame-cnt-inner {
    width: 820px;
}

.list-title-area {
    position: relative;
    min-height: 32px;
}

.list-title-area .title-list {
    font-size: 18px;
    font-weight: 500;
    line-height: 32px;
}

h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
}

.list-title-area~.my-payment-box,
.list-title-area~.board-form,
.menu-title-area~.view-content-area,
.list-title-area~.order-list-slide,
.list-title-area~.grid-list-wrap {
    margin-top: 10px;
}

.order-list-slide {
    border-top: 1px solid #666;
}

.order-swiper-list {
    position: relative;
    padding-bottom: 25px;
}

.swiper-container {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
}

.swiper-wrapper {
    padding-left: 0px;
}

.swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    -o-transition-property: transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
}

ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    unicode-bidi: isolate;
}

ol,
ul {
    list-style: none;
}

element.style {
    width: 820px;
    margin-right: 10px;
}

.swiper-slide {
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    -webkit-transition-property: -webkit-transform;
    transition-property: -webkit-transform;
    -o-transition-property: transform;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
}

ul li {
    list-style: none;
}

li {
    display: list-item;
    text-align: -webkit-match-parent;
    unicode-bidi: isolate;
}

.prd-info-area {
    position: relative;
}

.prd-info-area .inner {
    display: table;
    table-layout: auto;
    width: 100%;
}

.prd-info-area .column.img {
    width: 80px;
    height: 80px;
    overflow: hidden;
    position: relative;
}

.prd-info-area .column {
    display: table-cell;
    vertical-align: top;
    text-align: center;
}

.order-content-box .prd-info-area .column.img>a {
    display: block;
    border-radius: 6px;
    overflow: hidden;
}

a:link {
    color: #4f4f4f;
    text-decoration: none;
}

a {
    text-decoration: none;
    cursor: pointer;
}

.prd-info-area .column.img img {
    width: 80px;
    height: 80px;
}

img {
    overflow-clip-margin: content-box;
    overflow: clip;
}

img {
    vertical-align: middle;
    border: 0;
}

img {
    max-width: 100%;
    vertical-align: top;
}

.order-content-box .prd-info-area .column.tit {
    vertical-align: top;
    padding-top: 6px;
    padding-bottom: 6px;
}

.prd-info-area .column.tit {
    padding: 0 10px 0 15px;
    text-align: left;
}

.prd-info-area .column {
    display: table-cell;
    vertical-align: top;
    text-align: center;
}

.order-content-box .prd-info-area .column.tit .tit {
    font-size: 15px;
    line-height: 20px;
    font-weight: 400;
    color: #333;
    margin-bottom: 0;
}

a:link {
    color: #4f4f4f;
    text-decoration: none;
}

a {
    background: transparent;
    text-decoration: none;
    color: inherit;
}

.order-content-box .prd-info-area .column.tit .desc {
    font-size: 14px;
    line-height: 16px;
    color: #999;
    margin-top: 6px;
    margin-bottom: 0;
}

p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
}

.order-content-box .prd-info-area .column.col-btn-group {
    vertical-align: middle;
}

.prd-info-area .column {
    display: table-cell;
    vertical-align: top;
    text-align: center;
}

.order-content-box .prd-info-area .column.col-btn-group .col-btn-group-inn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
}

.order-content-box .prd-info-area .price-item {
    width: 130px;
    display: table-cell;
    vertical-align: middle;
    text-align: right;
}

.order-content-box .prd-info-area .price-item .dlv-nmr {
    display: flex;
    align-items: center;
    align-items: center;
    justify-content: center;
}

.order-content-box .prd-info-area .price-item .dlv-nmr .dlv-nmr-price {
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #333;
}

p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
}

.order-content-box .prd-info-area .price-item {
    width: 130px;
    display: table-cell;
    vertical-align: middle;
    text-align: right;
}

.order-content-box .prd-info-area .price-item .dlv-nmr .dlv-nmr-cnt::before {
    content: '';
    display: block;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background-color: #333;
    position: absolute;
    top: 50%;
    left: calc(11px / 2);
    transform: translate(-50%, -50%);
}

*,
::after,
::before {
    box-sizing: border-box;
}

.order-content-box .prd-info-area .price-item .dlv-nmr .dlv-nmr-cnt {
    padding-left: 11px;
    position: relative;
    font-size: 14px;
    line-height: 16px;
    color: #333;
}
.order-content-box .prd-info-area .column.col-btn-group {
    vertical-align: middle;
}
.order-content-box .prd-info-area .column.col-btn-group .col-btn-group-inn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
}
.order-content-box .prd-info-area .column.col-btn-group .col-btn-group-inn .prd-control-btn {
    display: block;
    padding: 7px 8px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
}
a:link {
    color: #4f4f4f;
    text-decoration: none;
}

.order-content-box .prd-info-area .column.col-btn-group .col-btn-group-inn .prd-control-btn span {
    font-size: 12px;
    line-height: 14px;
    color: #333;
    white-space: nowrap;
}
</style>
<template>
    <div id="root">
        <div class="css-ey8mg8" style="">
            <SellerHeaderComponent />
        </div>
    </div>
    <div id="main_content">

        <!--판매 폼-->
        <section class="goods_form">
            <h2>입찰 등록 <span class="red">*필수항목</span></h2>
            <form action="" class="frm_selling_goods">
                <div class="goods_tag_area">
                    <p>공구 번호</p>
                    <div>
                        <p>
                            {{ $route.query.gpbuyIdx }}
                        </p>
                    </div>
                </div>
                <div class="goods_tag_area">
                    <p>공구 제목</p>
                    <div>
                        <p>
                            {{ $route.query.gpbuyTitle }}
                        </p>
                    </div>
                </div>
                <div class="goods_tag_area" style="display:none;">
                    <p>설명</p>
                    <div>
                        <p>
                            딸기 1kg 총 10개 공구모집 합니다. 맛있는 딸기 많은 입찰 부탁드립니다. <br /><br />
                            가격도 싸게 해주세요~~
                        </p>
                    </div>
                </div>
                <div class="goods_images_area">
                    <p>상품<span class="red">*</span>
                    </p>
                    <div>
                        <div class="goods_images" @click="openProductModal()">
                            <div>
                                내 상품 조회
                                <input name="goodsImage">
                            </div>
                            <div id="goods_image" class="preview_wrap"></div>
                            <div class="product-name preview_wrap">
                                {{ productName }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="goods_price_area">
                    <p>가격<span class="red">*</span></p>
                    <div class="goods_price">
                        <p><input type="text" name="goodsPrice" placeholder="숫자만 입력해주세요" v-model="bidPrice">원</p>
                    </div>
                </div>
            </form>
        </section>
    </div>
    <!-- // main_content 영역 -->
    <!-- 상품 모달 -->
    <div id="productModal" class=css-1iy51wj style="overflow: scroll; display:none;">
        <div class="modal_header">
            <span style="">상품 선택</span>
        </div>
        <table role="table" class="css-1dfxxj6">
            <thead>
                <tr role="row">
                    <th class="table-column css-7y20gd" colspan="1" role="columnheader"
                        style="border-top: 1px solid rgb(229, 229, 229);">
                        <div class="css-1wnowod"><label class="css-u2o9sw"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="20" height="20" fill="none">
                                    <path fill="#E5E5E5" fill-rule="evenodd"
                                        d="M15 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10Zm0 1.3H5a.7.7 0 0 0-.694.605L4.3 5v10a.7.7 0 0 0 .605.694L5 15.7h10a.7.7 0 0 0 .694-.605L15.7 15V5a.7.7 0 0 0-.605-.694L15 4.3Z"
                                        clip-rule="evenodd"></path>
                                </svg><input type="checkbox" title="Toggle All Rows Selected" class="css-eivff4"
                                    style="cursor: pointer;"></label></div>
                    </th>
                    <th class="table-column css-1ry0z48" colspan="1" role="columnheader"
                        style="border-top: 1px solid rgb(229, 229, 229);">
                        상품번호</th>
                    <th class="table-column css-i06y6t" colspan="1" role="columnheader"
                        style="border-top: 1px solid rgb(229, 229, 229);">
                        상품명
                    </th>
                    <th class="table-column css-i413q7" colspan="1" role="columnheader"
                        style="border-top: 1px solid rgb(229, 229, 229);">
                        이미지
                    </th>
                    <th class="table-column css-13s4dk6" colspan="1" role="columnheader"
                        style="border-top: 1px solid rgb(229, 229, 229);">상품
                        설명
                    </th>
                    <th class="table-column css-1t5flb0" colspan="1" role="columnheader"
                        style="border-top: 1px solid rgb(229, 229, 229);">
                        카테고리
                    </th>
                </tr>
            </thead>
            <tbody role="rowgroup">
                <SellerProductComponent v-for="(product, idx) in sellerStore.productInfoList" :key="idx"
                    :product="product" @update-select-product="handleSelectProduct">
                </SellerProductComponent>

            </tbody>
        </table>

        <div class="button-area">
            <button type="button" class="product_modal_button" @click="productApply()">선택</button>
            <button type="button" class="product_modal_close_button" @click="closeProductModal()">닫기</button>
        </div>
    </div>
    <!-- footer 영역 -->
    <div class="btn_submit_area">
        <div class="inner_submit">
            <!--폼으로 등록 테스트 하실 때 type=submit으로 바꿔서 진행해주세요-->
            <input type="button" class="btn_goods_submit" @click="bidRegister()" value="등록하기">
        </div>
    </div>
</template>

<script>
import SellerHeaderComponent from '@/components/Seller/SellerHeaderComponent.vue';
import SellerProductComponent from '@/components/Seller/SellerProductComponent.vue';
import { useBidStore } from '@/stores/useBidStore';
import { useSellerStore } from '@/stores/useSellerStore';

import { mapStores } from 'pinia';
export default {
    data() {
        return {
            bidPrice: 0,
            productIdx: null,
            gpbuyIdx: 0,
            productName: null,
            productImg: null,
            selectedProductIdx: null,
            selectedProductName: "",
            selectedProductImg: ""
        }
    },
    computed: {
        ...mapStores(useBidStore),
        ...mapStores(useSellerStore)
    },
    methods: {
        bidRegister() {
            console.log(this.gpbuyIdx, this.productIdx, this.bidPrice);
            if (this.productIdx == null) {
                alert("상품을 선택해 주세요.");
                return;
            } else if (this.bidPrice == 0) {
                alert("입찰 금액을 입력해 주세요.");
                return;
            }
            this.bidStore.registerBid(this.gpbuyIdx, this.productIdx, this.bidPrice);
            this.$router.push("/seller/bid");
        },
        getProductInfoList() {
            this.sellerStore.getProductInfoList();
        },
        openProductModal() {
            document.getElementById("productModal").style.display = "block";
        },
        closeProductModal() {
            document.getElementById("productModal").style.display = "none";
        },
        handleSelectProduct(newIdx, productName, productImg) {
            this.selectedProductIdx = newIdx;
            this.selectedProductName = productName;
            this.selectedProductImg = productImg;
        },
        productApply() {
            this.productIdx = this.selectedProductIdx;
            this.productName = this.selectedProductName;
            this.productImg = this.selectedProductImg;
            let goods_thumbnail = document.getElementById("goods_image")
            goods_thumbnail.style.backgroundImage = "url(\"" + this.productImg + "\")";
            goods_thumbnail.style.zIndex = 100;
            this.closeProductModal();
        }
    },
    mounted() {
        this.gpbuyIdx = this.$route.query.gpbuyIdx;
        this.getProductInfoList();
    },
    components: {
        SellerHeaderComponent,
        SellerProductComponent
    }
}

</script>

<style scoped>
.product-name{
    font-size: 20px;
    font-weight: bold;
}
.preview_wrap {
    display: flex;
    width: 200px;
    height: 200px;
    background-size: 100% 100%;
    margin-right: 20px;
}

.button-area {
    display: flex;
    z-index: 4001;
    justify-content: left;
    align-items: center;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    font-weight: 700;
    font-size: 14px;
    line-height: 14px;
    color: rgb(255, 255, 255);
    border: none;
    margin-top: 10px;
}

.modal_header {
    display: flex;
    flex-direction: row;
    font-size: 30px;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 20px;
    margin-left: 10px;
}

.product_modal_close_button {
    z-index: 4001;
    justify-content: center;
    align-items: center;
    padding: 11px 16px;
    border-radius: 6px;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    font-weight: 700;
    font-size: 14px;
    line-height: 14px;
    color: rgb(255, 255, 255);
    background-color: rgb(147, 155, 165);
    border: none;
}

.product_modal_button {
    z-index: 4001;
    justify-content: center;
    align-items: center;
    padding: 11px 16px;
    border-radius: 6px;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    font-weight: 700;
    font-size: 14px;
    line-height: 14px;
    color: rgb(255, 255, 255);
    background-color: rgb(2, 122, 255);
    border: none;
}

/* 모달 요소 */
.css-1n7cno0 {
    min-height: 500px;
    overflow: scroll;
    position: relative;
    max-height: 750px;
}

.css-1dfxxj6 {
    position: relative;
    min-width: 50%;
    font-size: 14px;
    color: rgb(102, 102, 102);
    border-collapse: separate;
}

table {
    border-collapse: collapse;
    border-spacing: 0px;
}

.css-1dfxxj6 * {
    box-sizing: border-box;
}

.css-1dfxxj6>thead>tr {
    position: sticky;
    top: 0px;
    z-index: 10;
}

.css-1dfxxj6 tr {
    background-color: rgb(255, 255, 255);
}

.css-1dfxxj6 th {
    background-color: rgb(250, 250, 250);
}

.css-1dfxxj6 th,
.css-1dfxxj6 td {
    text-align: center;
    vertical-align: middle;
    padding: 15px 10px;
    border-right: 1px solid rgb(229, 229, 229);
    border-bottom: 1px solid rgb(229, 229, 229);
    white-space: nowrap;
    font-weight: 500;
}

.css-7y20gd {
    min-width: 60px;
}


.css-1dfxxj6 th[data-sticky-td] {
    position: sticky;
    width: fit-content !important;
}

.css-1wnowod {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
}

.css-u2o9sw {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: rgb(76, 76, 76);
    white-space: nowrap;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 4px;
    cursor: pointer;
}

.css-1dfxxj6 th[data-sticky-td]:nth-of-type(2) {
    left: 60px !important;
}

.css-1ry0z48 {
    min-width: 130px;
}

.css-1dfxxj6 th[data-sticky-td]:nth-of-type(3) {
    left: 190px !important;
}

.css-i06y6t {
    min-width: 180px;
}

.css-i413q7 {
    min-width: 76px;
}

.css-13s4dk6 {
    min-width: 250px;
}

.css-1t5flb0 {
    min-width: 246px;
}





.css-eivff4 {
    display: none;
}

.css-1dfxxj6 td[data-sticky-td]:nth-of-type(2) {
    left: 60px !important;
}

.css-1dfxxj6 tr {
    background-color: rgb(255, 255, 255);
}

.css-1dfxxj6 td[data-sticky-td] {
    background-color: rgb(255, 255, 255);
    position: sticky;
    width: fit-content !important;
}

.css-gpsap0 {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: rgb(102, 102, 102);
}

.css-165uhau {
    padding: 0px;
    line-height: inherit;
    font-size: inherit;
    font-weight: inherit;
    background-color: transparent;
    color: inherit;
    text-decoration: underline;
}

.css-1dfxxj6 td[data-sticky-td]:nth-of-type(3) {
    left: 190px !important;
}

.css-w39dry {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
}

.css-1fxlnrv {
    padding: 10px 0px 10px 16px;
    border-radius: 6px;
    background-color: rgb(255, 255, 255);
    color: rgb(25, 25, 25);
    caret-color: rgb(2, 122, 255);
    font-size: 14px;
    line-height: 17px;
    cursor: pointer;
    box-sizing: border-box;
    width: 210px;
    height: auto;
    border: 1px solid rgb(229, 229, 229);
    text-align: center;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
}

.css-1fxlnrv:read-only {
    color: rgb(102, 102, 102);
    cursor: default;
    pointer-events: none;
}

.css-1fxlnrv:read-only {
    border: none;
    background-color: transparent;
}

.css-1dfxxj6 th,
.css-1dfxxj6 td {
    text-align: center;
    vertical-align: middle;
    padding: 15px 10px;
    border-right: 1px solid rgb(229, 229, 229);
    border-bottom: 1px solid rgb(229, 229, 229);
    white-space: nowrap;
    font-weight: 500;
}

.css-1429e9p {
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    gap: 4px;
}

.css-1hylc56 {
    width: 36px;
    height: 36px;
    border-radius: 6px;
}

.css-1p4iqh6 {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    gap: 10px;
}

.css-1e4nmnj:read-only {
    color: rgb(102, 102, 102);
    cursor: default;
    pointer-events: none;
}

.css-1e4nmnj {
    padding: 10px 16px;
    border-radius: 6px;
    color: rgb(25, 25, 25);
    caret-color: rgb(2, 122, 255);
    font-size: 14px;
    line-height: 17px;
    cursor: pointer;
    box-sizing: border-box;
    width: 218px;
    text-align: center;
    font-weight: 500;
    border: none;
    background-color: transparent;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
}

.css-1mzc4e5 {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 10px;
}

.css-zy9krc:read-only {
    border: none;
    background-color: transparent;
}

.css-zy9krc:read-only {
    color: rgb(102, 102, 102);
    cursor: default;
    pointer-events: none;
}

.css-zy9krc {
    box-sizing: content-box;
    padding: 10px 16px;
    width: auto;
    border-radius: 6px;
    border: 1px solid rgb(229, 229, 229);
    background-color: rgb(255, 255, 255);
    color: rgb(25, 25, 25);
    caret-color: rgb(2, 122, 255);
    font-size: 14px;
    line-height: 17px;
    cursor: pointer;
    text-align: center;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
}

/* 상품 모달 페이지 */
.css-1iy51wj {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4000;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    -webkit-box-align: stretch;
    align-items: stretch;
    max-width: 60%;
    width: 100vw;
    height: 760px;
    max-height: 60%;
    overflow: hidden;
    background: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 12px 0px;
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
em,
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
    margin: 0px;
    padding: 0px;
    border: 0px;
    font-size: 100%;
    font-style: normal;
    vertical-align: baseline;
}

* {
    font-family: "Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    scroll-behavior: smooth;
}

.css-ey8mg8 {
    height: 10vh;
    display: flex;
    flex-direction: column;
}

.css-1geb722 {
    max-width: 1045px;
    padding-top: 32px;
    margin: 0px auto;
}


/* 입찰 등록 메인 */
#top_header,
#bot_header,
#main_content,
#top_footer_area,
#menu_hover,
#mid_footer_area,
#bot_footer_area {
    width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
}

/*하위메뉴*/
.content_nav {
    display: flex;
    font-size: 13px;
    height: 63px;
    -webkit-box-align: center;
    align-items: center;
}

.content_nav>a {
    color: rgb(33, 33, 33);
    margin-right: 2rem;
    padding: 0.5rem;
    padding-right: 0;
}

.content_nav>a.active {
    color: rgb(255, 80, 88);
}

.content_nav>a:first-child {
    padding-left: 0;
}

.content_nav>a::after {
    content: "";
    width: 1px;
    height: 14px;
    border-right: 1px solid rgb(210, 210, 210);
    margin-left: 2rem;
}

.content_nav>a:last-child::after {
    border: 0;
}

/*판매폼*/
.red {
    color: rgb(255, 80, 88);
}

#main_content h2>.red {
    font-size: 1rem;
    margin-left: 2rem;
}

#main_content h2 {
    height: 100px;
    font-size: 26px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-bottom: 2px solid rgb(30, 29, 41);
}

form>div:not(.fast_selling_area),
.goods_option_area {
    display: flex;
    padding: 2rem 0px;
    border-bottom: 1px solid rgb(220, 219, 228);
}

form>div:not(.fast_selling_area)>p {
    width: 10.5rem;
    font-size: 18px;
}

form>div:not(.fast_selling_area)>div {
    width: 856px;
}

/*이미지 영역*/
.goods_images {
    display: flex;
    flex-wrap: wrap;
}

.goods_images>div:first-child {
    width: 202px;
    height: 202px;
    position: relative;
    border: 1px solid rgb(230, 229, 239);
    background: rgb(250, 250, 253);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    flex-direction: column;
    color: rgb(155, 153, 169);
    font-size: 1rem;
    margin-right: 1rem;
}

.goods_images>div:first-child::before {
    content: "";
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 2rem;
    height: 2rem;
    background-image: url("../../assets/images/goods/thunder_emptyImage.svg");
    margin-bottom: 1rem;
}

.goods_images>div>input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0;
    cursor: pointer;
    font-size: 0px;
}

.goods_images_notice {
    margin-top: 1.5rem;
    color: rgb(74, 164, 255);
    line-height: 1.5;
    font-size: 14px;
}

.goods_images_area .preview {
    width: 202px;
    height: 202px;
}

/*제목영역*/
.goods_form input[type="text"],
.goods_form textarea {
    height: 3rem;
    padding: 0px 1rem;
    border: 1px solid rgb(195, 194, 204);
    width: 100%;
}

.goods_form input[type="text"]:not(:read-only):hover,
.goods_form textarea:hover {
    border-color: rgb(30, 29, 41);
}

.goods_title {
    width: 100%;
    position: relative;
}

.goods_title>input[name="goodsTitle"] {
    width: 92%;
}

.goods_title>a {
    position: absolute;
    right: 1rem;
    font-size: 1rem;
    color: rgb(155, 153, 169);
    text-decoration: underline;
    right: 10%;
    top: 12px;
}

.goods_title>span {
    display: inline-block;
    width: 7%;
    text-align: right;
}

/*카테고리 영역*/
.goods_category {
    display: flex;
    width: 284px;
    height: 10rem;
    overflow: scroll;
    border: 1px solid rgb(220, 219, 228);
}

.goods_category>div {
    width: 284px;
    height: 100%;
    color: rgb(195, 194, 204);
    padding: 7px 0;
}

.goods_category>div {
    border-right: 1px solid rgb(220, 219, 228);
}

.goods_category>div:nth-child(2) {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    overflow-y: auto;
}

.goods_category>div>div {
    text-align: left;
    width: 100%;
    padding: 10px 15px;
    border: none;
    outline: none;
    background-color: #fff;
    font-weight: 500;
    color: rgb(33, 33, 33);
}

.goods_category>div>div:hover {
    background: rgb(244, 244, 250);
}

.goods_category>div>div.selected {
    color: rgb(255, 80, 88);
}

.goods_category+p {
    color: rgb(245, 126, 0);
    font-size: 14px;
    margin-top: 0.5rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}

.goods_category+p+p {
    margin-top: 1.5rem;
    font-size: 16px;
    color: rgb(255, 80, 88);
}

.goods_category+p+p>span.selected_category {
    font-weight: 600;
}

/*거래지역 영역*/
.goods_location {
    width: 100%;
}

.location_button_area>button {
    height: 3rem;
    width: 6.5rem;
    text-align: center;
    border: 1px solid rgb(195, 194, 204);
    margin-right: 1rem;
    border-radius: 2px;
    background-color: #fff;
}

.location_button_area>button:hover {
    background: rgb(244, 244, 250);
}

.goods_location>input {
    background: rgb(244, 244, 250);
    margin-top: 1rem;
}

/*상태 영역*/
input[type="radio"] {
    position: absolute;
    height: 0;
    width: 0;
}

input[type="radio"]::before {
    content: "";
    background-position: center center;
    background-repeat: no-repeat;
    padding: 0.7rem;
    background-image: url("../../assets/images/goods/thunder_radio_unchecked.svg");
    border-radius: 50%;
}

input[type="radio"]:checked::before {
    background-image: url("../../assets/images/goods/thunder_radio_checked.svg");
}

.goods_status label,
.goods_change label,
.goods_option label {
    margin: 0 2rem;
}

/*가격 영역*/
.goods_form .goods_price input[name="goodsPrice"] {
    width: 240px;
    margin-right: 1rem;
}

input[type="checkbox"] {
    position: absolute;
    height: 0;
    width: 0;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
}

input[type="checkbox"]::before {
    content: "";
    background-position: center center;
    background-repeat: no-repeat;
    padding: 0.7rem;
    background-image: url("../../assets/images/goods/thunder_unckecked.svg");
    border-radius: 50%;
}

input[type="checkbox"]:checked::before {
    background-image: url("../../assets/images/goods/thunder_checked.svg");
}

.goods_price label {
    margin: 0 2rem;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
}

/*설명 영역*/
.goods_info_area textarea {
    padding: 1rem;
    resize: none;
    line-height: 1.35;
    height: 163px;
}

.goods_info_area .goods_info_warn {
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-top: 0.5rem;
}

.goods_info_warn>span>a {
    text-decoration: underline;
}

/*태그 영역*/
.goods_tag {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    height: 3rem;
    border: 1px solid rgb(195, 194, 204);
}

.goods_tag:hover {
    border-color: rgb(30, 29, 41);
}

.goods_tag>.tag_button {
    flex-shrink: 0;
    border-radius: 1rem;
    background: rgb(244, 244, 250);
    height: 2rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 0px 0.5rem;
    margin-left: 0.5rem;
}

.goods_tag>.tag_button>button {
    border: none;
    outline: none;
}

.goods_tag>.tag_button>button:last-child {
    display: flex;
    -webkit-box-align: flex-end;
    align-items: flex-end;
    justify-content: space-around;
    width: 20px;
    height: 20px;
    background: rgb(201, 201, 207);
    font-weight: 600;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
}

.goods_tag>.tag_button>button:last-child>i {
    color: rgb(244, 244, 250);
}

.goods_tag input[type="text"] {
    height: 100%;
    border: none;
}

.goods_tag input[type="text"]:hover,
.goods_tag input[type="text"]:focus-visible {
    border: none;
    outline: none;
}

/*갯수 영역*/
form>div.goods_count_area {
    border-bottom: none;
    margin-bottom: 3rem;
}

.goods_count_area>p:last-child {
    width: 100%;
}

.goods_count_area input[name="goodsCount"] {
    width: 240px;
    margin-right: 1rem;
}

/*번개페이영역*/
.fast_selling_area>h2 {
    height: 100px;
    font-size: 26px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-bottom: 2px solid rgb(30, 29, 41);
}

.fast_selling_area>h2>span {
    font-size: 16px;
    font-weight: normal;
    color: rgb(30, 29, 41);
}

.fast_selling_area>h2>span>a {
    color: rgb(30, 29, 41);
    text-decoration: underline;
}

.goods_option_area {
    width: 100%;
    display: flex;
    padding: 2rem 0px;
}

.goods_option_area>p {
    width: 10.5rem;
    font-size: 18px;
}

.goods_option {
    width: 100%;
}

.checkbox_safePay {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}

.checkbox_safePay input[type="checkbox"]::before {
    position: relative;
    top: -7px;
}

.safe_pay_notice {
    border: 1px solid rgb(230, 229, 239);
    border-radius: 2px;
    background-color: rgb(250, 250, 253);
    padding: 36px;
    margin-top: 22px;
}

.safe_pay_notice>div {
    display: flex;
}

.safe_pay_notice>div+div {
    margin-top: 43px;
}

.safe_pay_notice span.check {
    width: 15px;
    height: 8px;
    margin-right: 8px;
    position: relative;
    top: 6px;
    border-left: 2px solid rgb(250, 250, 253);
    border-bottom: 2px solid rgb(250, 250, 253);
    transform: rotate(308deg);
    -webkit-transform: rotate(308deg);
    -moz-transform: rotate(308deg);
    -ms-transform: rotate(308deg);
    -o-transform: rotate(308deg);
    /*border-color: #c3c2cc*/
}

.safe_pay_notice+p {
    font-size: 14px;
    color: rgb(114, 112, 127);
    margin: 20px 0px 154px 32px;
}

.btn_submit_area {
    width: 100%;
    height: 5.5rem;
    background: rgb(250, 250, 253);
    box-shadow: rgb(234 233 241) 0px -1px 0px 0px;
    position: sticky;
    left: 0px;
    bottom: 0px;
    -webkit-box-pack: end;
    justify-content: flex-end;
}

.inner_submit {
    display: flex;
    margin: 0 auto;
    width: 1024px;
    height: 100%;
    -webkit-box-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    align-items: center;
}

.btn_submit_area input {
    height: 3.5rem;
    width: 10rem;
    color: rgb(255, 255, 255);
    font-size: 20px;
    font-weight: 700;
    border-radius: 2px;
    background: #ac6af6;
    position: relative;
    outline: none;
    border: none;
}
</style>
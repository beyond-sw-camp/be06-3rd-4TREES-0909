<template>
    <!-- main_content 영역 -->
    <div id="main_content">
        <section class="goods_form">
            <h2>기본정보 <span class="red">*필수항목</span></h2>
            <form class="frm_selling_goods">
                <div class="goods_images_area">
                    <p>상품이미지<span class="red">*</span>
                        <span class="image_limit">(<span>{{ imageFiles.length }}</span>/10)</span>
                    </p>
                    <div>
                        <div class="goods_images">
                            <div>
                                이미지 등록
                                <input type="file" name="goodsImage" accept="image/jpg, image/jpeg, image/png" multiple
                                    @change="setImages">
                            </div>
                            <div class="preview_wrap">
                                <div v-for="(image, index) in imagePreviews" :key="index" class="image_preview">
                                    <img :src="image" alt="상품 이미지 미리보기" />
                                    <button type="button" @click="removeImage(index)">X</button>
                                </div>
                            </div>
                        </div>
                        <div class="goods_images_notice">
                            <b>* 상품 이미지는 640x640에 최적화 되어 있습니다.</b><br>
                            - 상품 이미지는 PC에서는 1:1, 모바일에서는 1:1.23 비율로 보여집니다.<br>
                            - 이미지는 상품 등록 시 정사각형으로 잘려서 등록됩니다.<br>
                            - 이미지를 클릭할 경우 원본 이미지를 확인할 수 있습니다.<br>
                            - 이미지를 클릭 후 이동하여 등록순서를 변경할 수 있습니다.<br>
                            - 큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.<br>
                            최대 지원 사이즈인 640 X 640으로 리사이즈 해서 올려주세요.(개당 이미지 최대 10M)
                        </div>
                    </div>
                </div>
                <div class="goods_title_area">
                    <p>상품명<span class="red">*</span></p>
                    <div class="goods_title">
                        <input v-model="productInfo.productName" type="text" name="goodsTitle" id="goods_title" maxlength="40"
                            placeholder="상품 제목을 입력해주세요." @input="countTitleLength">
                        <span class="goods_title_length"><span>{{ titleLength }}</span>/40</span>
                    </div>
                </div>
                <div class="goods_category_area">
                    <p>카테고리<span class="red">*</span></p>
                    <div>
                        <div class="goods_category">
                            <div class="goods_Lcategory">
                                <div v-for="(category, index) in categories" :key="index" @click="selectCategory(index + 1)"
                                    :class="{ selected: productInfo.categoryIdx === index+1 }">
                                    {{ category }}
                                </div>
                            </div>
                        </div>
                        <p class="hidden"><span>⊘</span> 상세 카테고리를 확인해주세요</p>
                        <p>선택한 카테고리 : <span class="selected_category">{{ categories[productInfo.categoryIdx - 1] }}</span></p>
                        <input type="hidden" name="Lcategory" :value="productInfo.categoryIdx">
                        <input type="hidden" name="Scategory">
                    </div>
                </div>
                <div class="goods_info_area">
                    <p>설명<span class="red">*</span></p>
                    <div>
                        <textarea v-model="productInfo.productContent" name="goodsInfo" id="goodsInfo" cols="30" rows="10"
                            maxlength="2000" @input="countInfoLength"></textarea>
                        <div class="goods_info_warn">
                            <span class="info_length"><span>{{ infoLength }}</span>/2000</span>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </div>
    <!-- // main_content 영역 -->
    <!-- 등록 버튼 영역 -->
    <div class="btn_submit_area">
        <div class="inner_submit">
            <!--폼으로 등록 테스트 하실 때 type=submit으로 바꿔서 진행해주세요-->
            <input type="button" class="btn_goods_submit" value="등록하기" @click="submitForm">
        </div>
    </div>
</template>

<script>
import { useSellerStore } from '@/stores/useSellerStore';

import { mapStores } from 'pinia';
export default {
    data() {
        return {
            titleLength: 0,
            infoLength: 0,
            imageFiles: [],
            imagePreviews: [],
            categories: [
                '전자 제품',
                '도서/티켓',
                '의류',
                '가전 제품',
                '유아동/출산',
                '스포츠 용품',
                '뷰티',
                '가구',
                '식품',
                '농수산물',
                '반려동물용품',
            ],
            productInfo: {
                productName: "",
                productContent: "",
                categoryIdx: 0,
            },
            images: [],
        }
    },
    computed: {
        ...mapStores(useSellerStore)
    },
    methods: {
        countTitleLength(event) {
            this.titleLength = event.target.value.length;
        },
        countInfoLength(event) {
            this.infoLength = event.target.value.length;
        },
        setImages(event) {
            const files = Array.from(event.target.files);

            if (files.length + this.imageFiles.length > 10) {
                alert('이미지는 최대 10개까지 등록할 수 있습니다.');
                return;
            }

            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreviews.push(e.target.result);
                };
                reader.readAsDataURL(file);
                this.imageFiles.push(file);
            });
        },
        removeImage(index) {
            this.imageFiles.splice(index, 1);
            this.imagePreviews.splice(index, 1);
        },
        selectCategory(category) {
            this.productInfo.categoryIdx = category;
        },
        async submitForm() {
            // 폼 제출 로직
            if (this.titleLength === 0) {
                alert('제목을 입력해주세요.');
                return;
            }
            if (this.infoLength === 0) {
                alert('설명을 입력해주세요.');
                return;
            }
            if (this.imageFiles.length === 0) {
                alert('최소 하나의 이미지를 등록해주세요.');
                return;
            }
            if (!this.productInfo.categoryIdx) {
                alert('카테고리를 선택해주세요.');
                return;
            }
            
            const result = await this.sellerStore.registerProduct(this.productInfo,this.imageFiles);
            if (result){
                alert("상품이 정상적으로 등록되었습니다.");
                this.$router.push("/seller/product");
            } else{
                alert("상품 등록에 실패하였습니다. 다시 시도해주세요.");
                this.$router.go();
            }
        }
    }
}
</script>

<style scoped>
.goods_Lcategory div {
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ccc;
    margin: 2px;
    display: inline-block;
}

.goods_Lcategory div:hover {
    background-color: #f0f0f0;
}

.selected_category {
    font-weight: bold;
    color: blue;
}

.goods_Lcategory .selected {
    background-color: #d0e6ff;
    border-color: #66b3ff;
}

.image_preview {
    position: relative;
    display: inline-block;
    margin-right: 5px;
}

button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 2px 5px;
}

button:hover {
    background-color: darkred;
}

.goods_Lcategory div {
    cursor: pointer;
    padding: 5px;
    border: 1px solid #ccc;
    margin: 2px;
    display: inline-block;
}

.goods_Lcategory div:hover {
    background-color: #f0f0f0;
}

.selected_category {
    font-weight: bold;
    color: blue;
}

.goods_Lcategory .selected {
    background-color: #d0e6ff;
    border-color: #66b3ff;
}

.preview_wrap {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.image_preview {
    position: relative;
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
    overflow: hidden;
    border-radius: 5px;
}

.image_preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
}

.image_preview::after {
    content: '✖';
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 14px;
    padding: 2px;
    border-radius: 0 0 0 5px;
    cursor: pointer;
}

/*index.css*/

/*배너 & QR*/
.carousel-control-next {
    justify-content: right;
    padding-right: 10px;
}

.carousel-control-prev {
    justify-content: left;
    padding-left: 10px;
}

.banner_wrap {
    position: relative;
}

.qr_wrap {
    position: absolute;
    width: 94px;
    height: 94px;
    padding: 8px;
    top: 53px;
    left: 155px;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 12%) 0px 0px 7px 0px;
}

.image_qr {
    width: 100%
}

/*상품 영역*/
.main_goods {
    padding: 3.5rem 0px 1.5rem;
}

.main_goods>h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
}

.goods_wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.goods_wrap>.goods {
    display: inline-block;
    width: 245px;
    margin-right: 11px;
    margin-bottom: 11px;
    border: 1px solid #eee;
}

.goods_wrap>.goods:nth-child(4n) {
    margin-right: 0;
}

.goods_image {
    position: relative;
    z-index: 1;
    width: 245px;
    height: 245px;
}

.goods_image>img:nth-child(2) {
    position: absolute;
    z-index: 10;
    bottom: 10px;
    left: 10px;
}

.goods_info {
    padding: 15px 10px;
    height: 80px;
    font-size: 14px;
    box-sizing: border-box;
    line-height: 1;
}

.goods_info>.goods_title {
    padding-bottom: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #121212;
}

.goods_price_date {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    height: 20px;
}

.goods_price {
    font-weight: 600;
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #121212;
}

#main_content h2 {
    height: 100px;
    font-size: 26px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-bottom: 2px solid rgb(30, 29, 41);
}

h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
}

form>div:not(.fast_selling_area),
.goods_option_area {
    display: flex;
    padding: 2rem 0px;
    border-bottom: 1px solid rgb(220, 219, 228);
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

/* common.css */

html,
body,
div,
header,
nav,
section,
aside,
article,
footer,
ul,
ol,
li,
dl,
dt,
dd,
h1,
h2,
h3,
p {
    margin: 0;
    padding: 0;
}

ul {
    list-style: none;
}

/* 숨김 콘텐츠 */
.hidden {
    position: absolute;
    left: -9999px;
}

/* 링크 스타일 */
a:link {
    color: #4f4f4f;
    text-decoration: none;
}

a:visited {
    color: #8a8e91;
    text-decoration: none;
}

a:hover,
a:focus {
    /*color: red;*/
    text-decoration: none;
}

/* 기본 스타일 */
body {
    color: black;
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

/* header 영역 */
header,
#bot_header_border {
    z-index: 9999;
}

#bot_header_border {
    position: sticky;
    height: 146px;
    top: 0;
    background-color: white;
}

/* side bar 영역 */
#side_bar {
    width: 90px;
    height: 410px;
    /*position: relative;
    right: -1039px;
    top: -44px;*/
    position: fixed;
    right: 143px;
    top: 142px;

}

#heart {
    height: 54px;
    background-color: white;
    border: 1px solid #777;
    text-align: center;
    color: #666;
    font-size: 12px;
    margin-bottom: 6px;
}

#heart>p {
    height: 27px;
    line-height: 32px;
    letter-spacing: -2px;
    font-weight: bold;
}

#heart>p:nth-child(2) {
    line-height: 12px;
    font-weight: normal;
}

#heart>p>img {
    width: 9px;
}

#goods {
    padding: 10px;
    height: 174px;
    border: 1px solid #ccc;
    font-size: 12px;
    text-align: center;
    color: #666;
    background-color: white;
    margin-bottom: 6px;
}

#goods>p:nth-child(1) {
    font-weight: bold;
    letter-spacing: -1px;
}

#goods>p:nth-child(2) {
    width: 38px;
    display: inline-block;
    text-align: center;
    border-top: 2px dotted #777;
    position: relative;
    top: -7px;
}

#goods>p:nth-child(3) img {
    width: 28px;
    margin-top: 20px;
}

#goods>p:nth-child(4) {
    margin-top: 8px;
    letter-spacing: -2px;
    line-height: 15px;
    color: #ccc;
    font-weight: bold;
}

#QR_code {
    height: 122px;
    border: 1px solid rgb(204, 204, 204);
    padding: 10px;
    margin-bottom: 6px;
}

#QR_code>p {
    font-size: 12px;
    text-align: center;
    font-weight: bold;
    color: #666;
    letter-spacing: -2px;
}

#QR_code>p:nth-child(2) {
    height: 68px;
    margin-top: 10px;
    box-shadow: rgb(0 0 0 / 12%) 0px 0px 7px 0px;
}

#QR_code>p>img {
    width: 50px;
    margin-top: 9px;
}

#top_btn {
    text-align: center;
}

#top_btn>button {
    width: 88px;
    height: 44px;
    padding: 0;
    border: 1px solid rgb(204, 204, 204);
    font-size: 13px;
    font-weight: bold;
    color: #666;
    background-color: white;
}

#top_btn>button>a {
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 44px;
}

/* // side bar 영역 */

/* 상단 헤더 부분 */
.top_header_icon {
    text-align: left;
}

.top_header_icon a:nth-child(2) {
    margin-left: 30px;
}

#bot_header_border {
    border-bottom: 1px solid rgb(238, 238, 238);
}

#top_header_bot_border {
    border-bottom: 1px solid rgb(238, 238, 238);
}

#top_header {
    line-height: 39px;
    height: 39px;
    font-size: 13px;
    color: #666;
}

#top_header img {
    position: relative;
    top: -2px;
}

.top_header_login {
    text-align: right;
}

.top_header_login>div:nth-child(1) {
    width: 130px;
}

.top_header_login>div:nth-child(2) {
    text-align: center;
}

/* //상단 헤더 부분 */

/* 하단 헤더 부분 */
#bot_header {
    height: 145px;
    padding-top: 35px;
}

.header_logo {
    width: 23%;
    text-align: left;
    padding: 0;
}

.top_searh_area {
    text-align: left;
    padding: 0;
    width: 49%;
}

#top_searh>input {
    width: 445px;
    height: 36px;
    padding: 18px 15px;
    border: 2px solid rgb(247, 47, 51);
}

#top_searh>img {
    position: relative;
    left: -40px;
    bottom: 2px;
}

.b_h_left_menu::after {
    position: relative;
    content: "|";
    color: #333;
}

.store::after {
    right: -8px;
}

.b_h_left_menu:last-child::after {
    content: "";
}

.b_h_left_menu {
    width: 9.333%;
    text-align: center;
    font-size: 14px;
    padding: 0;
    line-height: 40px;
}

.b_h_left_menu>a {
    color: black;
}

.b_h_left_menu>a>img {
    width: 23px;
    position: relative;
    top: -4px;
}

.hamburger_area {
    margin-top: 20px;
}

.hamburger {
    padding: 0;
    height: 51px;
    text-align: left;
}

.hamburger>img {
    width: 20px;
}

.sell_center {
    text-align: left;
    position: relative;
    left: -35px;
    font-weight: bold;
    padding: 0;
}

.sell_center>p {
    width: 220px;
    cursor: pointer;
}

.sell_center>p>img {
    width: 72px;
}

/* // 하단 헤더 부분 */
/* // header 영역 */


/* 햄버거 메뉴 호버 */
#test_area {
    padding-left: 0;
    display: inline-block;
}

#test_cates,
#test_clos,
#test_accs {
    width: 200px;
    height: 150px;
    float: left;
    border-left: 1px solid rgb(238, 238, 238);
    border-right: 1px solid rgb(238, 238, 238);
    border-bottom: 1px solid rgb(238, 238, 238);
    background-color: white;
}

#test_cates>h2,
#test_clos>h3,
#test_accs>h3 {
    font-size: 1.1em;
    font-weight: bold;
    text-align: left;
    padding: 10px 0 10px 20px;
    border-bottom: 1px solid rgb(238, 238, 238);
}

#test_cates>li,
#test_clos>li,
#test_accs>li {
    padding: 5px 0;
}

#test_cates>li:nth-child(2),
#test_clos>li:nth-child(2),
#test_accs>li:nth-child(2) {
    margin-top: 10px;
}

#test_cates>li>a,
#test_clos>li>a,
#test_accs>li>a {
    display: inline-block;
    width: 100%;
    padding-left: 20px;
    text-align: left;
}

#test_cates,
#test_clos,
#test_accs {
    display: none;
}

#test_cates>h2>span {
    float: right;
    margin-right: 10px;
    color: rgb(246, 68, 72);
    display: none;
}

#test_area a:hover {
    background-color: rgb(246, 68, 72);
    color: white;
}

/* // 햄버거 메뉴 호버 */


/* footer 영역 */
/* 상단 footer */
footer {
    font-size: 14px;
    border-top: 1px solid rgb(229, 229, 229);
    letter-spacing: -1px;
}

#top_footer_border_area {
    border-bottom: 1px solid rgb(229, 229, 229);
}

#top_footer_area:hover {
    cursor: pointer;
}

#top_footer_area>ul {
    width: 1024px;
    height: 64px;
}

#top_footer_area>ul>li {
    display: inline-block;
    padding: 15px;
    height: 64px;
    line-height: 32px;
}

#top_footer_area>ul>li::after {
    content: "|";
    float: right;
    color: rgb(204, 204, 204);
    margin-right: -17px;
}

#top_footer_area>ul>li:nth-child(4) {
    font-weight: bold;
}

/* // 상단 footer */
/* 중단 footer */
#mid_footer_area {
    margin-top: 40px;
    margin-bottom: 40px;
}

.mid_footer_areas {
    text-align: left;
}

.mid_footer_left {
    color: #666;
}

.mid_footer_left>p:first-child {
    color: #666;
    font-weight: bold;
}

.mid_footer_left>p:last-child {
    margin-top: 8px;
    font-size: 12px;
    line-height: 23px;
}

.mid_footer_left span {
    text-decoration: underline;
}

.mid_footer_left2 {
    margin-top: 24px;
    font-size: 12px;
    line-height: 23px;
    color: #666;
}

.mid_footer_left2>div>p {
    margin-top: 6px;
}

.mid_footer_right_area {
    text-align: left;
    color: #666;
}

.mid_footer_right p {
    margin-bottom: 3px;
}

.mid_footer_right>p:first-child,
#mid_footer_right2>p:nth-child(1) {
    font-weight: bold;
}

.mid_footer_right>p:nth-child(2) {
    font-size: 24px;
    font-weight: bold;
}

.mid_footer_right>p:nth-child(3),
#mid_footer_right2>p:nth-child(2),
#mid_footer_right2>p:nth-child(4) {
    font-size: 12px;
}

.mid_footer_right span {
    font-size: 12px;
    text-decoration: underline;
    margin-right: 13px;
}

#mid_footer_right2 p {
    margin-bottom: 10px;
}

#mid_footer_right2 {
    margin-top: 40px;
}

#mid_footer_right2>p:nth-child(3) {
    font-size: 12px;
    text-decoration: underline;
}

/* // 중단 footer */

/* 하단 footer */
#bot_footer_area {
    margin-top: 40px;
    border-top: 1px solid rgb(229, 229, 229);
    font-size: 11px;
    color: #999;
}

.bot_footer_left,
.bot_footer_right {
    width: 512px;
}

.bot_footer_left {
    float: left;
}

.bot_footer_left>div {

    width: 31px;
}

.bot_footer_left>div>img {
    width: 31px;
    position: relative;
    top: 20px;
}

.bot_footer_left>p {
    width: 480px;
    text-align: left;
    margin-left: 40px;
    position: relative;
    top: -10px;
}

.bot_footer_right {
    float: right;
    position: relative;
    top: -43px;
}

/* // 하단 footer */
/* // footer 영역 */

/*goods_selling_form.css*/
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
    /* background-image: url("../../images/goods/thunder_emptyImage.svg"); */
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
    /* background-image: url("../../images/goods/thunder_radio_unchecked.svg"); */
    border-radius: 50%;
}

input[type="radio"]:checked::before {
    /* background-image: url("../../images/goods/thunder_radio_checked.svg"); */
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
    /* background-image: url("../../images/goods/thunder_unckecked.svg"); */
    border-radius: 50%;
}

input[type="checkbox"]:checked::before {
    /* background-image: url("../../images/goods/thunder_checked.svg"); */
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
    background: #c38ffd;
    position: relative;
    outline: none;
    border: none;
}


/*상품 조회 목록*/</style>
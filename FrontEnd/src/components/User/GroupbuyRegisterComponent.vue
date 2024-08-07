<template>
    <div id="main_content">
        <!--하위 메뉴-->
        <nav class="content_nav">
            <router-link to="/groupbuy/register" class="active">공구등록</router-link>
            <router-link to="/order/history" >구매 내역</router-link>
        </nav>

        <!--판매 폼-->
        <section class="goods_form">
            <h2>기본정보 <span class="red">*필수항목</span></h2>
            <form action="" class="frm_selling_goods">
                <div class="goods_title_area">
                    <p>제목<span class="red">*</span></p>
                    <div class="goods_title">
                        <input type="text" name="goodsTitle" id="goods_title" maxlength="40"
                            placeholder="상품 제목을 입력해주세요." v-model="title">
                        <span class="goods_title_length"><span>{{ title.length }}</span>/40</span>
                    </div>
                </div>
                <div class="goods_count_area">
                    <p>수량<span class="red">*</span></p>
                    <p><input type="text" name="goodsCount" v-model="quantity" @input="valueIsNumber" @focus="resetQuantity">개</p>
                </div>
                <div class="goods_category_area">
                    <p>카테고리<span class="red">*</span></p>
                    <div>
                        <div class="goods_category">
                            <div class="goods_Lcategory" @click="selectCategory">
                                <div data-value=1>전자 제품</div>
                                <div data-value=2>도서/티켓</div>
                                <div data-value=3>의류</div>
                                <div data-value=4>가전 제품</div>
                                <div data-value=5>유아동/출산</div>
                                <div data-value=6>스포츠 용품</div>
                                <div data-value=7>뷰티</div>
                                <div data-value=8>가구</div>
                                <div data-value=9>식품</div>
                                <div data-value=10>농수산물</div>
                                <div data-value=11>반려동물용품</div>
                            </div>
                        </div>
                        <p>선택한 카테고리 : <span class="selected_category">{{ selectedCategoryName }}</span></p>
                    </div>
                </div>
                <div class="goods_info_area">
                    <p>설명<span class="red">*</span></p>
                    <div>
                        <textarea name="goodsInfo" id="goodsInfo" cols="30" rows="10" maxlength="255"
                             v-model="content"></textarea>
                        <div class="goods_info_warn">
                            <span class="info_length"><span>{{ content.length }}</span>/255</span>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </div>
    <div class="btn_submit_area">
        <div class="inner_submit">
            <!--폼으로 등록 테스트 하실 때 type=submit으로 바꿔서 진행해주세요-->
            <input type="button" class="btn_goods_submit" @click="registerGroupbuy" value="등록하기">
        </div>
    </div>
</template>

<script>
import { useGroupbuyStore } from '@/stores/useGroupbuyStore';
import { mapStores } from 'pinia';
export default {
    data(){
        return {
            selectedCategoryIdx: null,
            selectedCategoryName: "",
            descriptionLength: 0,
            titleLength: 0,
            quantity: 0,
            title: "",
            content: "",


        }
    },
    methods: {
        selectCategory(event){
            this.selectedCategoryIdx = event.target.getAttribute('data-value');
            this.selectedCategoryName = event.target.innerText;
        },
        valueIsNumber(event){
            const num = event.target.value.replace(/\D/g, '');
            this.quantity = num;
        },
        resetQuantity(){
            this.quantity = "";
        },
        registerGroupbuy(){
            let response = this.groupbuyStore.registerGroupbuy(this.title, this.quantity, this.selectedCategoryIdx, this.content);
            if(response.groupbuyIdx != 0){
                alert("공구가 정상 등록 되었습니다.");
                this.$router.push("/");
            } else{
                alert("공구 등록에 실패하였습니다. 다시 시도해주세요");
                this.$router.go(0);
            }
        }
    },
    computed: {
        ...mapStores(useGroupbuyStore),
    },
}
</script>

<style scoped>

#top_header, #bot_header, #main_content, #top_footer_area, #menu_hover, #mid_footer_area, #bot_footer_area {
    width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
}
/*하위메뉴*/
.content_nav{
    display: flex;
    font-size: 13px;
    height: 63px;
    -webkit-box-align: center;
    align-items: center;
}
.content_nav > a {
    color: rgb(33, 33, 33);
    margin-right: 2rem;
    padding: 0.5rem;
    padding-right: 0;
}
.content_nav > a.active {
    color: rgb(255, 80, 88);
}
.content_nav > a:first-child {
    padding-left: 0;
}
.content_nav > a::after {
    content: "";
    width: 1px;
    height: 14px;
    border-right: 1px solid rgb(210, 210, 210);
    margin-left: 2rem;
}
.content_nav > a:last-child::after {
    border: 0;
}

/*판매폼*/
.red {
    color: rgb(255, 80, 88);
}
#main_content h2 > .red {
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
form > div:not(.fast_selling_area), .goods_option_area {
    display: flex;
    padding: 2rem 0px;
    border-bottom: 1px solid rgb(220, 219, 228);
}
form > div:not(.fast_selling_area) > p {
    width: 10.5rem;
    font-size: 18px;
}
form > div:not(.fast_selling_area) > div {
    width: 856px;
}

/*이미지 영역*/
.goods_images {
    display: flex;
    flex-wrap: wrap;
}
.goods_images > div:first-child {
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
.goods_images > div:first-child::before {
    content: "";
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 2rem;
    height: 2rem;
    background-image: url("../../assets/images/goods/thunder_emptyImage.svg");
    margin-bottom: 1rem;
}
.goods_images > div > input {
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
.goods_images_area .preview{
    width: 202px;
    height: 202px;
}

/*제목영역*/
.goods_form input[type="text"],
 .goods_form textarea{
    height: 3rem;
    padding: 0px 1rem;
    border: 1px solid rgb(195, 194, 204);
    width: 100%;
}
.goods_form input[type="text"]:not(:read-only):hover,
 .goods_form textarea:hover{
    border-color: rgb(30, 29, 41);
 }
.goods_title {
    width: 100%;
    position: relative;
}
.goods_title > input[name="goodsTitle"] {
    width: 92%;
}
.goods_title > a {
    position: absolute;
    right: 1rem;
    font-size: 1rem;
    color: rgb(155, 153, 169);
    text-decoration: underline;
    right: 10%;
    top: 12px;
}
.goods_title > span {
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
.goods_category > div{
    width: 284px;
    height: 100%;
    color: rgb(195, 194, 204);
    padding: 7px 0;
}
.goods_category > div {
    border-right: 1px solid rgb(220, 219, 228);
}
.goods_category > div:nth-child(2){
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    overflow-y: auto;
}
.goods_category > div > div {
    text-align: left;
    width: 100%;
    padding: 10px 15px;
    border: none;
    outline: none;
    background-color: #fff;
    font-weight: 500;
    color: rgb(33, 33, 33);
}
.goods_category > div > div:hover {
    background: rgb(244, 244, 250);
}
.goods_category > div > div.selected {
    color: rgb(255, 80, 88);
}
.goods_category + p {
    color: rgb(245, 126, 0);
    font-size: 14px;
    margin-top: 0.5rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}
.goods_category + p + p {
    margin-top: 1.5rem;
    font-size: 16px;
    color: rgb(255, 80, 88);
}
.goods_category + p + p > span.selected_category {
    font-weight: 600;
}

/*거래지역 영역*/
.goods_location {
    width: 100%;
}
.location_button_area > button {
    height: 3rem;
    width: 6.5rem;
    text-align: center;
    border: 1px solid rgb(195, 194, 204);
    margin-right: 1rem;
    border-radius: 2px;
    background-color: #fff;
}
.location_button_area > button:hover {
    background: rgb(244, 244, 250);
}
.goods_location > input {
    background: rgb(244, 244, 250);
    margin-top: 1rem;
}

/*상태 영역*/
input[type="radio"] {
    position: absolute;
    height: 0;
    width: 0;
}
input[type="radio"]::before{
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
.goods_status label, .goods_change label, .goods_option label {
    margin: 0 2rem;
}

/*가격 영역*/
.goods_form .goods_price input[name="goodsPrice"]{
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
input[type="checkbox"]::before{
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
.goods_info_warn > span > a {
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
.goods_tag:hover{
    border-color: rgb(30, 29, 41);
}
.goods_tag > .tag_button {
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
.goods_tag > .tag_button > button {
    border: none;
    outline: none;
}
.goods_tag > .tag_button > button:last-child {
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
.goods_tag > .tag_button > button:last-child > i {
    color: rgb(244, 244, 250);
}
.goods_tag input[type="text"]{
    height: 100%;
    border: none;
}
.goods_tag input[type="text"]:hover, .goods_tag input[type="text"]:focus-visible {
    border: none;
    outline: none;
}

/*갯수 영역*/
form > div.goods_count_area {
    border-bottom: 1px solid rgb(220, 219, 228);
    margin-bottom: 3rem;
}
.goods_count_area > p:last-child{
    width: 100%;
}
.goods_count_area input[name="goodsCount"]{
    width: 240px;
    margin-right: 1rem;
}

/*번개페이영역*/
.fast_selling_area > h2 {
    height: 100px;
    font-size: 26px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border-bottom: 2px solid rgb(30, 29, 41);
}
.fast_selling_area > h2 > span {
    font-size: 16px;
    font-weight: normal;
    color: rgb(30, 29, 41);
}
.fast_selling_area > h2 > span > a {
    color: rgb(30, 29, 41);
    text-decoration: underline;
}
.goods_option_area{
    width: 100%;
    display: flex;
    padding: 2rem 0px;
}
.goods_option_area > p {
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
.checkbox_safePay input[type="checkbox"]::before{
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
.safe_pay_notice > div {
    display: flex;
}
.safe_pay_notice > div + div {
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
.safe_pay_notice + p {
    font-size: 14px;
    color: rgb(114, 112, 127);
    margin: 20px 0px 154px 32px;
}
.btn_submit_area{
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
.btn_submit_area input{
    height: 3.5rem;
    width: 10rem;
    color: rgb(255, 255, 255);
    font-size: 20px;
    font-weight: 700;
    border-radius: 2px;
    background: rgb(255, 80, 88);
    position: relative;
    outline: none;
    border: none;
}

</style>
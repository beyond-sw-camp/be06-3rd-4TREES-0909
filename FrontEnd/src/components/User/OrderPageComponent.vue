<template>
    <div v-if="isLoading"></div>
    <section v-else id="contents" class="container">


        <iframe id="hiddenIframe" name="hiddenIframe" src="" width="0" height="0" scrolling="no" frameborder="0"
            style="position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 9999999; transform: translateZ(0px); background: none; margin: 0px; padding: 0px; display:none"></iframe>

        <iframe name="txnIdGetterFrame" id="txnIdGetterFrame" src="" width="0" height="0"
            style="display:none;"></iframe>

        <div class="content-wrap frame-sm">
            <div class="page-title-area">
                <h2 class="title-page">
                    주문/결제</h2>
            </div><!--// page-title-area -->

            <div class="order-payment-area">
                <input type="hidden" id="holidayDlvFlag" value="N">
                <form id="ordFrm" name="ordFrm" action="/order/order" method="post" data-gtm-form-interact-id="0">
                    <!-- 배송지 정보 입력여부 -->
                    <input type="hidden" id="addrWriteYn" name="addrWriteYn">

                    <input type="hidden" id="addCouponCd" name="addCouponCd" value="">
                    <input type="hidden" id="addCouponPrice" name="addCouponPrice" value="0">

                    <div class="order-info" id="orderUserInfalehfo">

                        <input type="hidden" name="orderName" :value="orderPageInfo.name">
                        <input type="hidden" name="orderphoneNumber" :value="orderPageInfo.phoneNumber">
                        <input type="hidden" name="orderEmail" :value="orderPageInfo.email">
                        <input type="hidden" name="vExdlvArea" id="vExdlvArea" value="">

                        <div class="lineless-table type1">
                            <input type="hidden" name="receiverName" :value="receiverName">
                            <input type="hidden" name="receiverPostCode" :value="receiverPostCode">
                            <input type="hidden" name="receiverPhoneNumber" :value="receiverPhoneNumber">

                            <!-- 베송지 정보가 있을 때 -->
                            <div class="list-head-sub">
                                <h3 class="title-list">배송지 정보</h3>
                                <div id="orderAddressHeadBtn"><a href="javascript:void(0);"
                                        class="btn-basic-sm2 btn-default" onclick="openUserDeliveryListPop();"
                                        style="border-radius: 4px;">
                                        <span>변경</span>
                                    </a></div>
                            </div>
                            <div id="addressInfoDiv">
                                <div class="css-k9oiqw">
                                    <label class="css-yhuigj">수령인 이름</label>
                                    <div class="css-ay1s">
                                        <input type="text" v-model="receiverName" autocomplete="off" name="companyName"
                                            class="css-11nkng1">
                                    </div>
                                </div>

                                <div class="css-k9oiqw">
                                    <label class="css-yhuigj">수령인 전화번호</label>
                                    <div class="css-ay1s">
                                        <input type="text" v-model="receiverPhoneNumber" autocomplete="off"
                                            name="companyName" class="css-11nkng1" @input="validateAndFilterPhoneNumber"
                                            pattern="\d*">
                                    </div>
                                </div>

                                <div class="css-k9oiqw">
                                    <label class="css-yhuigj">수령지 우편번호</label>
                                    <div class="css-ay1s">
                                        <input type="text" v-model="receiverPostCode" autocomplete="off" required=""
                                            placeholder="우편번호 (5자 입력)" name="companyPostCode" maxlength="5"
                                            class="css-11nkng1" readonly>
                                    </div>
                                </div>

                                <div class="css-k9oiqw">
                                    <label class="css-yhuigj">수령지 주소</label>
                                    <div class="css-ay1s">
                                        <div>
                                            <div class="css-1v0rcng" @click="execDaumPostcode">주소
                                                찾기</div>
                                        </div>
                                        <input type="text" v-model="receiverAddress" autocomplete="off" required=""
                                            spellcheck="false" placeholder="주소" name="companyAddress" readonly
                                            class="css-1k3phzy">
                                        <input type="text" v-model="receiverSubAddress" autocomplete="off"
                                            placeholder="상세 주소 입력 (40자 내 입력)" name="subAddress" maxlength="40"
                                            class="css-11nkng1">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <input type="hidden" id="deliveryTabType" value="Y">

                    <div class="order-info">
                        <input type="hidden" id="isExpressDeliveryProduct" value="Y">
                        <input type="hidden" id="isDeliveryTab" value="false">

                        <div class="order-item-box">
                            <div id="userOrderList">
                                <div class="delivery-state goodDlv">
                                </div>
                                <ul class="cart-list goodDlvPrd" data-dlv-cd="1600" data-delivery-state="normal"
                                    data-n-dlv-price="0">
                                    <li>
                                        <div class="prd-info-area "> <input type="hidden" class="vProductCd"
                                                value="F000009972">
                                            <div class="inner">
                                                <div class="column img"> <a href="javascript:void(0);"> <img
                                                            :src="orderPageInfo.productThumbnailUrl" alt="상품이미지"> </a>
                                                </div>
                                                <div class="column tit">
                                                    <p class="tit">{{ orderPageInfo.productName }}
                                                    </p>
                                                    <p class="desc"></p>
                                                    <ul class="price-item">
                                                        <li><span class="num">{{ orderPageInfo.bidPrice }}</span>원</li>
                                                        <li><span class="num">{{ orderPageInfo.quantity }}</span>개</li>
                                                    </ul>
                                                </div>
                                                <div class="column price w70"> <span class="num">{{
                                                    orderPageInfo.bidPrice * orderPageInfo.quantity }}</span>원
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <!--// order-info -->

                    <div class="order-info">
                        <!--// list-head -->
                        <div class="lineless-table type1">
                            <h3 class="title-list">쿠폰</h3>
                            <table>
                                <caption>쿠폰 사용</caption>
                                <colgroup>
                                    <col style="width:190px">
                                    <col>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th scope="row"><span class="tit">쿠폰 사용</span></th>
                                        <td>
                                            <div class="order-point">
                                                <div class="input-group-wrap box-type">
                                                    <div class="input-group">
                                                        <input type="text" title="" class="input-text"
                                                            id="text_use_coupon" readonly="" :value="useCouponPrice">
                                                        <input type="hidden" name="userCouponIdx"
                                                            :value="selectCouponIdx">

                                                    </div><!--// input-group -->
                                                </div><!--// input-group-wrap -->
                                                <span class="input-group-btn">
                                                    <button type="button" @click="couponSelectModal()"
                                                        class="btn-ex-grey cpn_select_btn"><span>쿠폰선택</span></button>
                                                </span>
                                                <p class="point-guide">사용 가능한 쿠폰
                                                    <em class="text-num-bold" id="userCouponCount">{{
                                                        orderStore.orderPageInfo.userCouponResponseList.length }}</em>개
                                                </p>
                                            </div><!--// order-point -->
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div><!--// lineless-table -->
                    </div>
                    <!--// order-info -->
                    <!-- 쿠폰 선택 모달 띄우는 script -->


                    <div class="order-info" style="border-top:1px solid #333;padding-top:30px;">
                        <div class="lineless-table type1">
                            <h3 class="title-list">포인트</h3>
                            <table>
                                <caption>포인트 사용</caption>
                                <colgroup>
                                    <col style="width:190px">
                                    <col>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th scope="row"><span class="tit">포인트 사용</span></th>
                                        <td>
                                            <div class="order-point">
                                                <div class="input-group-wrap box-type">
                                                    <div class="input-group">
                                                        <!-- 현재 보유 포인트 -->
                                                        <input type="hidden" id="currentPoint" name="currentPoint"
                                                            :value="orderPageInfo.point">
                                                        <input type="hidden" id="usePoint" name="usePoint"
                                                            v-mdoel="usePoint">
                                                        <input type="text" title="" class="input-text ui-point-input"
                                                            id="textUsePoint" name="textUsePoint" @focus="focusPoint()"
                                                            @blur="fnUsePoint()" v-model="usePoint">

                                                    </div><!--// input-group -->
                                                </div><!--// input-group-wrap -->
                                                <span class="input-group-btn">
                                                    <button type="button" class="btn-ex-grey"
                                                        @click="fnUseAllPoint()"><span>전액사용</span></button>
                                                </span>
                                                <p class="point-guide">사용 가능 포인트 <em class="text-num-bold">{{
                                                    orderPageInfo.point }}</em>
                                                </p>
                                            </div><!--// order-point -->
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><!--// lineless-table -->
                    </div>


                    <div class="order-info">
                        <div class="list-head">
                            <h3 class="title-list">결제방법</h3>
                        </div><!--// list-head -->

                        <div class="payment-select">
                            <div class="grid-area-span2">
                                <div class="colum col12">
                                    <ul class="radio-grid-span4">
                                        <li style="display:none;">
                                            <div class="custom-radio">
                                                <input type="radio" id="radio-grid-4" class="radio-box-grid"
                                                    name="payType" value="CARD" data-card-type="GE" checked="">
                                                <label for="radio-grid-4"><em class="txt"><i
                                                            class="ico-pay-creditcard"></i>신용카드</em></label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="custom-radio">
                                                <input type="radio" id="radio-grid-8" class="radio-box-grid"
                                                    name="payType" value="KAKAOPAY" v-model="selectedPayMethod">
                                                <label for="radio-grid-8"><em class="txt"><i class="ico-pay-kakao"
                                                            title="카카오페이"></i><span
                                                            class="blind">카카오페이</span></em></label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div><!--// payment-select -->
                    </div>
                    <div class="side-fix-area">
                        <div class="payment-info-box ui-box-fix">
                            <h3 class="tit">주문결제 금액</h3>
                            <div class="order-price">
                                <ul class="div-price">
                                    <li>
                                        <div class="list-inner">
                                            <span class="tit">상품금액</span>
                                            <p class="price"><strong class="num resetOrderPaySide" id="txt_tot_price">{{
                                                orderPageInfo.bidPrice }}</strong> 원
                                            </p>
                                            <input type="hidden" name="tot_price" class="resetOrderPaySide"
                                                v-model="orderPageInfo.bidPrice">
                                        </div>
                                    </li>
                                    <li>
                                        <div class="list-inner">
                                            <span class="tit">할인금액</span>
                                            <p class="price"><strong class="num resetOrderPaySide"
                                                    id="totalDiscountPrice">{{ Number(useCouponPrice) +
                                                        Number(usePoint) }}</strong> 원</p>
                                        </div>
                                        <ul class="list-sub-inner">

                                        </ul>
                                    </li>

                                </ul>
                                <div class="total-price" style="padding:20px 0;">
                                    <div class="list-inner">
                                        <span class="tit">최종 결제금액</span>
                                        <div class="price">
                                            <strong class="num text-primary resetOrderPaySide" id="txt_tot_pg_price">{{
                                                orderPrice }}</strong> 원
                                            <input type="hidden" name="tot_pg_price" class="resetOrderPaySide"
                                                :value="orderPrice">
                                        </div>
                                    </div>
                                </div>
                            </div><!--// order-price -->

                            <ul class="terms-view">
                                <li>
                                    <a href="#popup-terms-type-04" class="ui-open-pop" onclick="return false;">
                                        <span class="txt">처리위탁 및 3자 제공 동의</span>
                                        <span class="view">내용보기<i class="ico-arrfill-right"></i></span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#popup-terms-type-02" class="ui-open-pop" onclick="return false;">
                                        <span class="txt">결제대행서비스 이용 동의</span>
                                        <span class="view">내용보기<i class="ico-arrfill-right"></i></span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#popup-terms-type-14" class="ui-open-pop" onclick="return false;">
                                        <span class="txt">개인정보 수집 및 이용 동의</span>
                                        <span class="view">내용보기<i class="ico-arrfill-right"></i></span>
                                    </a>
                                </li>
                            </ul><!--// terms-view -->
                            <div class="check-area">
                                <div class="custom-checkbox">
                                    <input type="checkbox" id="checkTerms" class="checkbox" name="check_terms"
                                        data-nonmember-yn="N" @click="checkTerms">
                                    <label for="checkTerms">상기 필수약관을 확인하였으며<br>결제에 동의합니다.</label>
                                </div>
                            </div>
                            <button type="button" class="btn-basic-xlg btn-primary" @click="fnCheckOrder()">
                                <span class="num"><span id="txt_btn_payment" class="resetOrderPaySide">{{ orderPrice
                                        }}</span>원
                                    결제하기</span>
                            </button>
                        </div> <!--// payment-info-box -->
                    </div>
                    <!--// side-fix-area-->
                    <div>
                        <input type="hidden" name="_csrf" value="bdc9e7ef-ae53-4e1c-85aa-a35328253352">
                    </div>
                </form>
            </div>
        </div>

        <!-- 쿠폰 선택 팝업 -->
        <div class="layer-wrap onload" id="popup-coupon" style="display:none;">
            <div class="layer-pop couponselect-pop-area">
                <div class="layer-inner">
                    <div class="layer-head">
                        <h4 class="layer-pop-title">쿠폰 할인</h4>
                    </div>

                    <ul class="layer-content" style="overflow:scroll; height: 450px; padding-top:10px;">
                        <CouponComponent v-for="(coupon, idx) in orderStore.orderPageInfo.userCouponResponseList"
                            :key="idx" :coupon="coupon" @update-select-coupon="handleSelectCoupon"></CouponComponent>
                    </ul>

                    <div class="layer-bottom type-shadow">
                        <div class="btn-area">
                            <button type="button" class="btn-basic-lg2 btn-grey3" id="couponApplyCancel"
                                @click="couponCancle()"><span>적용취소</span></button>
                            <button type="button" class="btn-basic-lg2 btn-primary" id="couponApply"
                                @click="couponApply()"><span>쿠폰적용</span></button>
                        </div>
                    </div>

                    <button type="button" @click="closeSelectCouponModal()" class="btn-x-md2 ui-close-pop" title=""><i
                            class="ico-x-black"></i><span class="blind">닫기</span></button>
                </div>
            </div>
        </div>

        <!-- 카카오페이 결제 팝업 -->
        <div class="layer-wrap onload" id="popup-kakaopay" style="display:none">
            <div class="layer-pop" style="width: 500px; height: 500px;">
                <div class="layer-inner">
                    <iframe name="iframe_kakaopay" id="iframe_kakaopay" src=""
                        style="width: 500px; height: 500px;"></iframe>
                </div><!--// layer-inner -->
            </div><!--// layer-pop  -->
        </div>

    </section>

</template>

<script>
import CouponComponent from './CouponComponent.vue';
import { useOrderStore } from '@/stores/useOrderStore';
import { mapStores } from 'pinia';
import axios from "axios"

export default {
    data() {
        return {
            isLoading: true,
            orderPageInfo: {},
            defaultDelivery: {
                addressName: "",
                addressInfo: "",
                addressDefault: false,
                postCode: ""
            },
            receiverName: "",
            receiverPostCode: "",
            receiverAddress: "",
            receiverSubAddress: "",
            receiverPhoneNumber: "",
            usePoint: 0,
            useCouponPrice: 0,
            orderPrice: 0,
            selectCouponIdx: null,
            selectedPayMethod: null,
            termStatus: false
        }
    },
    methods: {
        validateAndFilterPhoneNumber(event) {
            let input = event.target.value;

            // 숫자만 필터링
            this.receiverPhoneNumber = input.replace(/[^0-9]/g, '');

            // 하이픈을 기준으로 전화번호 포맷팅
            if (this.receiverPhoneNumber.length > 3) {
                if (this.receiverPhoneNumber.length > 7) {
                    this.receiverPhoneNumber = `${this.receiverPhoneNumber.slice(0, 3)}-${this.receiverPhoneNumber.slice(3, 7)}-${this.receiverPhoneNumber.slice(7)}`;
                } else {
                    this.receiverPhoneNumber = `${this.receiverPhoneNumber.slice(0, 3)}-${this.receiverPhoneNumber.slice(3)}`;
                }
            }

            // 전화번호 유효성 검사 (하이픈 포함)
            const phonePattern = /^01[0-9]-\d{3,4}-\d{4}$/;
            this.phoneNumberError = phonePattern.test(this.receiverPhoneNumber) ? '' : '유효한 휴대폰 번호를 입력하세요.';
        },
        execDaumPostcode() {
            // eslint-disable-next-line no-undef
            if (typeof daum !== 'undefined' && typeof daum.Postcode !== 'undefined') {
                // eslint-disable-next-line no-undef
                new daum.Postcode({
                    oncomplete: (data) => {
                        // 선택한 주소를 인풋 박스에 입력
                        this.receiverAddress = data.address;
                        this.receiverPostCode = data.zonecode;  // 우편번호 설정
                    }
                }).open();
            } else {
                console.error('Daum Postcode script is not loaded');
            }
        },
        couponSelectModal() {
            document.getElementById("popup-coupon").style.display = "inline-block";
        },
        closeSelectCouponModal() {
            document.getElementById("popup-coupon").style.display = "none";
        },
        getDefaultDelivery() {
            Array.from(this.orderPageInfo.deliveryAddressResponseList).forEach(delivery => {
                if (delivery.addressDefault) {
                    this.receiverAddress = delivery.postCode;
                    this.receiverAddress = delivery.addressInfo;
                    return;
                }
            });
        },
        calcOrderPrice() {
            this.orderPrice = this.orderPageInfo.bidPrice * this.orderPageInfo.quantity - this.usePoint - this.useCouponPrice;
            if (this.orderPrice < 0) {
                this.orderPrice = 0
            }
        },
        fnUsePoint() {
            if (this.usePoint > this.orderPageInfo.point) {
                alert("보유 포인트를 초과하여 사용할 수 없습니다.");
                this.usePoint = 0;
            }
            this.calcOrderPrice();
        },
        fnUseAllPoint() {
            if (this.orderPageInfo.bidPrice < this.orderPageInfo.point) {
                this.usePoint = this.orderPageInfo.bidPrice;
            } else {
                this.usePoint = this.orderPageInfo.point;
            }
            this.calcOrderPrice();
        },
        focusPoint() {
            this.usePoint = "";
        },
        handleSelectCoupon(newIdx) {
            this.selectCouponIdx = newIdx;
        },
        couponApply() {
            Array.from(this.orderPageInfo.userCouponResponseList).forEach(userCoupon => {
                if (userCoupon.userCouponIdx == this.selectCouponIdx && userCoupon.minOrderPrice <= this.orderPageInfo.bidPrice * this.orderPageInfo.quantity) {
                    this.useCouponPrice = userCoupon.couponPrice;
                    this.calcOrderPrice();
                    this.closeSelectCouponModal();
                    return;
                } else if (userCoupon.userCouponIdx == this.selectCouponIdx) {
                    alert("상품의 금액이 쿠폰 최소 사용 금액보다 적습니다.")
                }
            });
        },
        couponCancle() {
            this.useCouponPrice = 0;
            this.selectCouponIdx = null;
            this.closeSelectCouponModal();
            this.calcOrderPrice();
        },
        checkTerms() {
            this.termStatus = !this.termStatus
        },
        fnCheckOrder() {
            if (this.receiverName == "" || this.receiverPhoneNumber == "" || this.receiverPostCode == ""
                || this.receiverPostCode.length > 5 || this.recipientAddress == "" || this.receiverSubAddress == ""
            ) {
                alert("수령인 정보를 입력해주세요.");
                return;
            }
            else if (!this.termStatus) {
                alert("약관에 동의를 해주세요.");
                return;
            }
            if (this.selectedPayMethod == null) {
                alert("결제 방법을 선택해주세요.");
            } else if (this.selectedPayMethod === "KAKAOPAY") {
                this.kakaoPayment();
            } else {
                alert("현재 지원하지 않는 결제 방법입니다. 카카오 결제를 이용해주세요.");
            }
        },
        kakaoPayment() {
            const { IMP } = window;
            IMP.init("imp17385342"); // 고객사 식별 코드
            const self = this;
            IMP.request_pay(
                {
                    pg: "kakaopay.TC0ONETIME",
                    merchant_uid: "order_no_" + this.orderPageInfo.bidIdx + Date.now(), // 상점에서 생성한 고유 주문번호
                    name: "주문: " + this.orderPageInfo.productName + " (수량 " + this.orderPageInfo.quantity + "개)",
                    amount: this.orderPrice, // 금액
                    buyer_email: this.orderPageInfo.email,
                    buyer_name: this.orderPageInfo.name,
                    custom_data: {
                        bidIdx: this.orderPageInfo.bidIdx,
                        orderQuantity: this.orderPageInfo.quantity,
                        deadline: 2,
                        recipientName: this.receiverName,
                        recipientAddress: this.receiverAddress + " " + this.receiverSubAddress,
                        recipientPostCode: this.receiverPostCode,
                        recipientPhoneNumber: this.receiverPhoneNumber,
                        usePoint: this.usePoint,
                        userCouponIdx: this.selectCouponIdx
                    }
                },
                function (rsp) {
                    console.log(rsp);
                    console.log(rsp.imp_uid);
                    // 백엔드에서 결재를 확인하는 url 호출
                    if (rsp.success) {
                        axios.get("/api/orders/register?impUid=" + rsp.imp_uid, { withCredentials: true })
                            .then((data) => {
                                console.log(data.data);
                                if (data.data.isSuccess) {
                                    alert("주문 완료하였습니다.");
                                    self.$router.push("/order/history");
                                } else {
                                    alert("주문 취소되었습니다.");
                                    self.$router.push("/");
                                }
                            });
                    } else {
                        alert("주문 실패");
                        self.$router.push("/");
                    }
                },
            );
        },
        async getOrderPageInfo() {
            await this.orderStore.getOrderPageInfo(this.$route.query.gpbuyIdx, this.$route.query.quantity, this.$route.query.bidIdx);
            this.isLoading = false;
        },
    },
    computed: {
        ...mapStores(useOrderStore), // 어떤 저장소랑 연결시켜 주겠다.
        quantity() {
            return this.$route.query.quantity;
        },
        gpbuyIdx() {
            return this.$route.query.gpbuyIdx;
        },
        bidIdx() {
            return this.$route.query.bidIdx;
        }
    },
    async mounted() {
        await this.getOrderPageInfo();
        this.orderPageInfo = this.orderStore.orderPageInfo;
        this.getDefaultDelivery();
        this.receiverName = this.orderPageInfo.name;
        this.receiverPhoneNumber = this.orderPageInfo.phoneNumber;
        this.orderPrice = this.orderPageInfo.bidPrice;

    },
    components: {
        CouponComponent,
    }

}
</script>

<style src="./css/주문페이지1.css" scoped></style>
<style src="./css/주문페이지2.css" scoped></style>
<style scoped>
.css-k9oiqw {
    margin-bottom: 15px;
}

.css-k9oiqw {
    display: flex;
    column-gap: 20px;
}


.css-yhuigj {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}


.css-yhuigj {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    min-width: 140px;
    white-space: pre-wrap;
    font-weight: bold;
    color: rgb(76, 76, 76);
    height: 48px;
    font-size: 16px;
    line-height: 1;
    box-sizing: border-box;
}

.css-ay1s {
    margin-top: 10px;
}

.css-ay1s {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}


.css-11nkng1.read-only {
    color: rgb(140, 140, 140);
    cursor: default;
    pointer-events: none;
}

.css-11nkng1:disabled {
    background-color: rgb(246, 246, 246);
    color: rgb(178, 178, 178);
    cursor: not-allowed;
}

.css-11nkng1 {
    padding: 14px;
    border-radius: 6px;
    border: 1px solid rgb(229, 229, 229);
    background-color: rgb(255, 255, 255);
    color: rgb(25, 25, 25);
    caret-color: rgb#c38ffd;
    font-size: 16px;
    line-height: 1;
    font-weight: 700;
}

.css-1k3phzy.read-only {
    color: rgb(140, 140, 140);
    cursor: default;
    pointer-events: none;
}

.css-1k3phzy:disabled {
    background-color: rgb(246, 246, 246);
    color: rgb(178, 178, 178);
    cursor: not-allowed;
}

.css-1k3phzy {
    padding: 14px;
    border-radius: 6px;
    border: 1px solid rgb(229, 229, 229);
    background-color: rgb(255, 255, 255);
    color: rgb(25, 25, 25);
    font-size: 16px;
    line-height: 1;
    font-weight: 700;
    caret-color: transparent;
}

.css-1v0rcng {
    display: inline-block;
    border-radius: 6px;
    line-height: 1;
    font-weight: 700;
    cursor: pointer;
    background: rgb(255, 255, 255);
    color: #c38ffd;
    border: 1px solid #c38ffd;
    padding: 10px 14px;
    font-size: 14px;
}

.css-1v0rcng:disabled {
    cursor: not-allowed;
}
</style>

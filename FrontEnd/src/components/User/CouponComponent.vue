<template>
    <div class="custom-radio">
    <input type="radio" name="coupon" :id="coupon.userCouponIdx" class="radio-box-grid" :value="coupon.userCouponIdx" @change="updateSelectCouponIdx">
    <label :for="coupon.userCouponIdx">
        <div class="coupon-total-box">
            <div class="inner">
                <div style="display:none">{{ coupon.userCouponIdx }}</div>
                <dl class="cell">
                    <dt class="tit">쿠폰 이름</dt>
                    <dd class="price productPrice">{{ coupon.couponName }}</dd>
                </dl><!--// cell -->
                <dl class="cell">
                    <dt class="tit">적용 가능 금액</dt>
                    <dd class="price text-primary discountPrice">{{ coupon.minOrderPrice }}원</dd>
                </dl><!--// cell -->
                <dl class="cell">
                    <dt class="tit">쿠폰 금액</dt>
                    <dd class="price text-primary calcPrice">{{ coupon.couponPrice }}원</dd>
                </dl><!--// cell -->
            </div><!--// inner -->
        </div>
    </label>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectCouponIdx: ''
        }
    },
    props: ["coupon"],
    methods: {
        updateSelectCouponIdx(event){
            this.$emit("update-select-coupon", event.target.value)
        }
    }
}
</script>

<style src="./css/주문페이지1.css" scoped></style>
<style src="./css/주문페이지2.css" scoped></style>
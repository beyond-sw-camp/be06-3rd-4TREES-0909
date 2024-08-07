<template>
    <div class="goods_one">
        <a href="">
            <div class="goods_image">
                <img :src="orderHistory.productThumbnailImg" alt="상품사진">
                <span class="goods_front">
                    <i class="fas fa-box"></i><br>
                    {{ orderHistory.orderStatus }}
                </span>
            </div>
            <div class="goods_info">
                <h2 class="goods_title">{{ orderHistory.productName }}</h2>
                <p class="goods_price"><span class="bold">{{ orderHistory.bidPrice }}</span>원</p>
                <p class="goods_date">{{ orderDate }}</p>
            </div>
        </a>
        <button type="button" class="btn_review_modal">배송 조회: {{ orderHistory.deliveryNumber }}</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderDate: ""
        }
    },
    props: ["orderHistory"],
    created() {
        let dateTime = (this.orderHistory.orderStartedAt).split("T");
        let date = dateTime[0];
        let time = dateTime[1].split(".")[0];
        this.orderDate = date + " (" + time + ")";
    }

}
</script>

<style scoped>
.goods_one {
    margin-top: 1rem;
}

.goods_one>a {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}

.goods_one .goods_image {
    position: relative;
    width: 96px;
    height: 96px;
}

.goods_one img {
    width: 96px;
    height: 96px;
}

.goods_image span.goods_front {
    position: absolute;
    width: 96px;
    height: 96px;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    background: rgba(30, 29, 41, 0.56);
    font-size: 0.875rem;
    font-weight: bold;
    color: #fff;
    line-height: 1;
}

.goods_image span.goods_front i {
    font-size: 1.2rem;
}

.goods_info {
    color: rgb(30, 29, 41);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 0.5rem;
}

.goods_info h2.goods_title {
    font-size: 1rem;
}

.goods_info p.goods_price {
    padding: 4px 0px;
    font-size: 1rem;
    line-height: 0.8125rem;
}

.goods_info p.goods_price .bold {
    font-weight: 600;
    font-size: 1rem;
}

.goods_info .goods_shop,
.goods_info .goods_date {
    line-height: 1rem;
    color: rgb(94, 92, 107);
    font-size: 0.75rem;
}

/*버튼*/
.goods_one>a+button,
.goods_one>a+div.btn_area {
    margin-top: 0.5rem;
}

.goods_one button {
    outline: none;
    border: none;
    font-weight: 600;
    line-height: 3rem;
    font-size: 0.85rem;
    color: rgb(30, 29, 41);
    text-align: center;
    background-color: #fff;
    border: 1px solid rgb(220, 219, 228);
    border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -ms-border-radius: 2px;
    -o-border-radius: 2px;
}

.goods_one>a+button {
    width: 100%;
}

.goods_one>a+div.btn_area {
    display: flex;
}

.goods_one>a+div.btn_area>button {
    flex-basis: 100%;
}

.goods_one>a+div.btn_area>button:first-child {
    margin-right: 0.3rem;
}

a {
    color: rgb(33, 33, 33);
    text-decoration: none;
}
</style>
<template>
    <div class="typeContentList" data-index="0">
        <div class="typeContentItem">
            <div class="roomInfo">
                <div class="thumbnailWrap"><a
                        data-content-selector=".detailRoomPopContainer"><img
                            :src="bid.productThumbnailImg"
                            alt="상품 이미지"></a></div>
                <div class="roomWrap">
                    <div class="roomNameWrap">
                        <p class="roomName">{{ bid.productName }}</p>
                    </div>
                    <div class="etcInfo">
                        <div class="promotionWrap">{{ new Intl.NumberFormat('ko-KR').format(bid.bidPrice) }}원</div>
                    </div>
                </div>
            </div>
            <div class="orderInfo">
                <div class="priceWrap">
                    <div><label for="normalPrice_10882_12206_1000073996_RS10011825">
                            <div>
                                <p id="normalPrice_10882_12206_1000073996_RS10011825"
                                    name="10882_12206_1000073996_RS10011825" checked="">
                                    <span class="labelText">구매수량</span>
                                </p>
                            </div>
                            <div class="roomPriceTextWrap">
                                <div class="input-group">
                                    <button class="btn btn-outline-secondary" type="button"
                                        @click="changeQuantity(-1)">-</button>
                                    <input class="form-control text-center" v-model="quantity" :min="minQuantity" :max="maxQuantity" id="quantityInput">
                                    <button class="btn btn-outline-secondary" type="button"
                                        @click="changeQuantity(1)">+</button>
                                </div>
                            </div>
                        </label></div>
                </div>
                <div class="buttonWrap">
                    <button type="button" class="btnReserve">입찰 선정
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useGroupbuyStore } from '@/stores/useGroupbuyStore';
import { mapStores } from 'pinia';
export default {
    name: "BidItemComponent",
    props: ["bid", "maxQuantity"],
    data() {
        return {
            quantity: 1,
            minQuantity: 1
        }
    },
    methods: {
        changeQuantity(amount) {
            const newValue = this.quantity + amount;
            if (newValue >= this.minQuantity && newValue <= this.maxQuantity) {
                this.quantity = newValue;
            }
        }
    },
    computed: {
      ...mapStores(useGroupbuyStore)
    },
}
</script>

<style scoped>

.hotelDetail {
    width: 100%;
    min-width: 32rem;
    margin: 0 auto
}


.hotelDetail .detailRoomPopContainer {
    color: #666
}

.hotelDetail .detailRoomPopContainer .detailRoomImageButton {
    display: inline-flex;
    position: absolute;
    right: 2rem;
    top: 2rem
}

.hotelDetail .detailRoomPopContainer .detailRoomImageButton .btnDibs {
    padding: 0;
    z-index: 9
}

.hotelDetail .detailRoomPopContainer .detailRoomImageButton .btnDibs.active img:first-child {
    display: none
}

.hotelDetail .detailRoomPopContainer .detailRoomImageButton .btnDibs.active img:last-child {
    display: block
}

.hotelDetail .detailRoomPopContainer .detailRoomImageButton .btnDibs img {
    display: block;
    width: 2.6rem;
    height: auto;
    border-radius: 0
}

.hotelDetail .detailRoomPopContainer .detailRoomImageButton .btnDibs img:last-child {
    display: none
}

.hotelDetail .detailRoomPopContainer .detailRoomImageButton .shareButton {
    width: 2.4rem;
    height: 2.4rem;
    margin-left: 1.5rem
}

.hotelDetail .detailRoomPopContainer .detailRoomImageButton .shareButton img {
    display: block;
    width: 100%
}

@media (min-width: 1025px) {
    .hotelDetail .detailRoomPopContainer .detailRoomImage .item {
        height:37.3rem
    }
}

.hotelDetail .typeDetails {
    padding: 0
}

.hotelDetail .typeDetails .skeleton,.hotelDetail .typeDetails .skeleton_mini {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    z-index: 6000;
    background-color: #fff
}

.hotelDetail .typeDetails .skeleton .header,.hotelDetail .typeDetails .skeleton_mini .header {
    height: 44px
}

.hotelDetail .typeDetails .skeleton .main .image,.hotelDetail .typeDetails .skeleton_mini .main .image {
    background: linear-gradient(-70deg,#e5e5e5,#e5e5e5 40%,#f2f2f2 50%,#e5e5e5 60%,#e5e5e5) repeat;
    background-size: 400% 100%;
    animation: gradient 2s ease infinite;
    height: 256px
}

.hotelDetail .typeDetails .skeleton .main .desc div,.hotelDetail .typeDetails .skeleton_mini .main .desc div {
    background: linear-gradient(-70deg,#e5e5e5,#e5e5e5 40%,#f2f2f2 50%,#e5e5e5 60%,#e5e5e5) repeat;
    background-size: 400% 100%;
    animation: gradient 2s ease infinite;
    margin-top: 10;
    height: 12px;
    width: 90%
}

.hotelDetail .typeDetails .skeleton .main .desc div:first-child,.hotelDetail .typeDetails .skeleton_mini .main .desc div:first-child {
    margin-top: 30px
}

.hotelDetail .typeDetails .skeleton .main .desc div:last-child,.hotelDetail .typeDetails .skeleton_mini .main .desc div:last-child {
    margin-bottom: 30px
}

.hotelDetail .typeDetails .skeleton .divider,.hotelDetail .typeDetails .skeleton_mini .divider {
    height: 11px;
    background: #f3f3f3
}

.hotelDetail .typeDetails .skeleton .list .item .image,.hotelDetail .typeDetails .skeleton_mini .list .item .image {
    width: 30%;
    float: left
}

.hotelDetail .typeDetails .skeleton .list .item .image div,.hotelDetail .typeDetails .skeleton_mini .list .item .image div {
    background: linear-gradient(-70deg,#e5e5e5,#e5e5e5 40%,#f2f2f2 50%,#e5e5e5 60%,#e5e5e5) repeat;
    background-size: 400% 100%;
    animation: gradient 2s ease infinite;
    margin-top: 19px;
    margin-left: 19px;
    height: 100px;
    width: 90px
}

.hotelDetail .typeDetails .skeleton .list .item:after,.hotelDetail .typeDetails .skeleton_mini .list .item:after {
    content: "";
    display: block;
    clear: both
}

.hotelDetail .typeDetails .skeleton .list .item .desc,.hotelDetail .typeDetails .skeleton_mini .list .item .desc {
    position: relative;
    width: 75%;
    float: left
}

.hotelDetail .typeDetails .skeleton .list .item .desc:after,.hotelDetail .typeDetails .skeleton_mini .list .item .desc:after {
    position: absolute;
    left: -20px;
    bottom: 0;
    content: "";
    width: calc(100% + 40px);
    height: 1px;
    background-color: #ebebeb
}

.hotelDetail .typeDetails .skeleton .list .item .desc div,.hotelDetail .typeDetails .skeleton_mini .list .item .desc div {
    background: linear-gradient(-70deg,#e5e5e5,#e5e5e5 40%,#f2f2f2 50%,#e5e5e5 60%,#e5e5e5) repeat;
    background-size: 400% 100%;
    animation: gradient 2s ease infinite;
    margin-top: 10px;
    height: 12px;
    width: 80%
}

.hotelDetail .typeDetails .skeleton .list .item .desc div:first-child,.hotelDetail .typeDetails .skeleton_mini .list .item .desc div:first-child {
    width: 100%
}

.hotelDetail .typeDetails .skeleton .list .item .desc div:nth-child(2),.hotelDetail .typeDetails .skeleton_mini .list .item .desc div:nth-child(2) {
    width: 30%
}

.hotelDetail .typeDetails .skeleton .list .item .desc div:nth-child(3),.hotelDetail .typeDetails .skeleton_mini .list .item .desc div:nth-child(3) {
    width: 100%;
    padding-bottom: 20px
}

.hotelDetail .typeDetails .skeleton .list .item .desc div:nth-child(4),.hotelDetail .typeDetails .skeleton_mini .list .item .desc div:nth-child(4) {
    width: 70%
}

.hotelDetail .typeDetails .skeleton .list .item .desc div:last-child,.hotelDetail .typeDetails .skeleton_mini .list .item .desc div:last-child {
    margin-bottom: 30px
}

.hotelDetail .typeDetails .skeleton_mini {
    position: static
}

@keyframes gradient {
    0% {
        background-position: 100% 50%
    }

    to {
        background-position: 0 50%
    }
}

.hotelDetail .typeDetails .typeContent .skeleton_mini:not(:first-child) .list .item .desc div:first-child {
    margin-top: 30px
}


.hotelDetail .typeDetails.open .typeContent {
    display: block
}

.hotelDetail .typeDetails .thumbWrap {
    transition: height .3s ease
}

.hotelDetail .typeDetails .thumbWrap .thumbInfo span {
    font-weight: 700
}

.hotelDetail .typeContent {
    display: none;
    padding: 0 2rem
}

.hotelDetail .typeContentList {
    position: relative;
    padding: 2.8rem 0
}

.hotelDetail .typeContentList:not(:first-child):before {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    content: "";
    display: block;
    width: calc(100% + 1rem);
    height: .8rem;
    background: #f0f4f4
}

.hotelDetail .typeContentList:nth-child(n+6) {
    display: none
}

.hotelDetail .typeContentList .badgeWrap,.hotelDetail .typeContentList .promotion p:not(:last-child) {
    margin-bottom: .4rem
}

.hotelDetail .typeContentList .promotion p:before {
    width: 2px;
    height: 2px;
    background: #666;
    content: "";
    display: inline-block;
    margin: .3rem .4rem .3rem 0
}

.hotelDetail .typeContentList .promotion p a {
    color: #666
}

.hotelDetail .typeContentList .promotion p strong {
    padding-right: 1.2rem
}

.hotelDetail .typeContentList .btnReserve {
    border: 1px solid #1769ff;
    background-color: #1769ff;
    color: #fff
}

.typeContentItem .roomInfo {
    box-sizing: border-box;
    justify-content: space-between;
    display: flex;
    flex-direction: row
}

.typeContentItem .roomInfo .thumbnailWrap {
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    width: 8rem;
    height: 9.4rem;
    border-radius: 1rem;
    margin-right: 1.6rem
}

.typeContentItem .roomInfo .thumbnailWrap a {
    cursor: pointer
}

.typeContentItem .roomInfo .thumbnailWrap img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover
}


.typeContentItem .roomInfo .roomWrap {
    flex-grow: 1
}

.typeContentItem .roomInfo .roomWrap .roomNameWrap {
    padding-bottom: .4rem
}

.typeContentItem .roomInfo .roomWrap .roomNameWrap .roomName {
    font-size: 1rem;
    line-height: 150%;
    font-weight: 700;
    word-break: break-word
}

.typeContentItem .roomInfo .roomWrap .deadLine {
    display: inline-block;
    color: #8e43e7;
    font-size: 1.3rem
}

.typeContentItem .etcInfo {
    box-sizing: border-box;
    padding-bottom: 2rem
}


.typeContentItem .orderInfo .priceWrap {
    border: 1px solid #ddd;
    border-radius: 1.2rem
}

.typeContentItem .orderInfo .priceWrap {
    padding-left: 1.2rem;
    padding-right: 1.2rem
}

.typeContentItem .orderInfo .priceWrap>div {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem
}

.typeContentItem .orderInfo .priceWrap>div:not(:first-of-type) {
    border-top: 1px solid #ddd
}

.typeContentItem .orderInfo .priceWrap .roomPriceTextWrap {
    text-align: -webkit-right
}

.typeContentItem .orderInfo .priceWrap .roomPriceTextWrap .originalPrice {
    text-decoration: line-through;
    color: #999
}

.typeContentItem .orderInfo .priceWrap .roomPriceTextWrap div p:has(.salePrice) {
    margin-bottom: .4rem
}

.typeContentItem .orderInfo .priceWrap .roomPriceTextWrap .salePrice {
    font-weight: 700;
    font-size: 1.5rem
}

.typeContentItem .orderInfo .priceWrap .roomPriceTextWrap div p:has(.discountedPrice) {
    width: -moz-fit-content;
    width: fit-content;
    padding: 2px 6px;
    border-radius: 4px;
    background-color: #ffefee
}

.typeContentItem .orderInfo .priceWrap .roomPriceTextWrap .discountedPrice {
    color: #ff322e;
    font-size: 1.1rem;
    font-weight: 700
}

.typeContentItem .orderInfo .priceWrap label {
    display: flex;
    min-height: 4.6rem;
    align-items: center;
    justify-content: space-between;
    cursor: pointer
}

.typeContentItem .orderInfo .priceWrap label input {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    transform: translateY(-.2rem)
}

.typeContentItem .orderInfo .priceWrap label .labelText {
    font-size: 0.9rem;
    font-weight: 700;
    padding-left: .8rem
}

.typeContentItem .orderInfo .buttonWrap {
    margin-top: 1rem
}

.typeContentItem .orderInfo .buttonWrap button {
    width: 100%;
    height: 4.4rem;
    border-radius: 3rem;
    font-size: 0.9rem
}

.hotelDetail .typeContent.open .typeContentList:nth-child(n+6) {
    display: block
}

.hotelDetail .typeContent .hiddenText {
    display: inline-block;
    color: #fff;
    padding-left: .4rem
}


.hotelDetail .typeContent .btnMore {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 4.5rem;
    border: .1rem solid #ccc;
    border-radius: 1rem;
    background: #fff;
    font-size: 1.5rem;
    color: #333;
    margin-top: -1rem;
    margin-bottom: 3rem
}

.hotelDetail .typeContent .btnMore:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    background: url(//openimage.interpark.com/UI/tour/common/common/icon-lineArrow.svg) no-repeat;
    background-size: contain;
    transform: rotate(90deg);
    position: relative;
    margin-left: .6rem;
    transform: rotate(180deg) translateY(-.1rem)
}

.hotelDetail .reviewNoResult {
    border-top: 0;
    padding-top: 0
}


.hotelDetail #roomInfo article {
    padding-top: 0;
    color: #666;
    font-size: 1.5rem;
    line-height: 2.5rem
}

.hotelDetail #roomInfo article h1 {
    margin-top: 3rem;
    color: #000;
    font-size: 1.7rem;
    line-height: 2rem
}

.hotelDetail #roomInfo article h1+details {
    margin-top: 2.5rem
}

.hotelDetail #roomInfo article h2 {
    color: #000;
    margin-bottom: .5rem;
    font-size: 1.5rem;
    line-height: 1.9rem
}

.hotelDetail #roomInfo article div,.hotelDetail #roomInfo article h2:not(:first-child) {
    margin-top: 3rem
}

.hotelDetail #roomInfo article div:first-child {
    margin-top: 0
}

.hotelDetail #roomInfo article div.infoAddress div {
    display: flex;
    align-items: flex-start;
    margin-top: 0
}

.hotelDetail #roomInfo article div.infoAddress div a {
    display: block;
    flex-shrink: 0;
    font-size: 1.5rem;
    line-height: 2.8rem;
    margin-left: 2rem;
    padding-left: 2.8rem;
    color: #666;
    background: url(//openimage.interpark.com/UI/tour/common/hotel/icon/icon_map.svg) 0 0/2.8rem no-repeat
}

.hotelDetail #roomInfo article div.infoAddress .btnCopyAddress {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: #000;
    background-color: #ebebeb;
    height: 3rem;
    padding: .9rem;
    border-radius: .6rem;
    margin-top: 1rem
}

.hotelDetail #roomInfo article .details {
    position: relative;
    margin-top: 0;
    color: #666;
    font-size: 1.3rem;
    line-height: 2.2rem
}

.hotelDetail #roomInfo article .details:first-of-type {
    margin-top: 3rem
}

.hotelDetail #roomInfo article .details:before {
    content: "";
    position: absolute;
    top: 0;
    left: -2rem;
    display: block;
    width: calc(100% + 4rem);
    height: .1rem;
    background-color: #eee
}

.hotelDetail #roomInfo article .details.open {
    padding-bottom: 1.8rem
}

.hotelDetail #roomInfo article .details.open .summary:after {
    transform: rotate(0)
}

.hotelDetail #roomInfo article .details.open dd {
    display: block
}

.hotelDetail #roomInfo article .details .summary {
    display: flex;
    align-items: center;
    height: 5.2rem;
    justify-content: space-between;
    color: #000;
    font-size: 1.5rem;
    cursor: pointer
}

.hotelDetail #roomInfo article .details .summary::-webkit-details-marker {
    display: none
}

.hotelDetail #roomInfo article .details .summary:after {
    content: "";
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    background: url(//openimage.interpark.com/UI/tour/common/common/icon-lineArrow.svg) no-repeat;
    background-size: 100%;
    transform: rotate(180deg)
}

.hotelDetail #roomInfo article .details dd {
    display: none
}

.hotelDetail #roomReview {
    padding: 1.5rem
}

.hotelDetail #roomReview .reviewBar {
    width: 50%
}

.hotelDetail #roomReview .reviewBar .graphInfobox {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    font-size: 1.3rem;
    color: #666
}

.hotelDetail #roomReview .reviewBar .graphInfobox:not(:first-child) {
    margin-top: .8rem
}

.hotelDetail #roomReview .reviewBar .graphInfobox .graphH1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 5.6rem;
    font-weight: 400;
    justify-content: inherit
}

.hotelDetail #roomReview .reviewBar .graphInfobox .graphInfo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    margin: 0 1.5rem
}

.hotelDetail #roomReview .reviewBar .graphInfobox .graphInfo svg {
    width: 100%;
    height: 2px;
    position: relative
}

.hotelDetail #roomReview .reviewBar .graphInfobox .graphInfo svg g .bg {
    fill: #ededed
}

.hotelDetail #roomReview .reviewBar .graphInfobox .graphInfo svg g .fill {
    fill: #1769ff
}

.hotelDetail #roomReview .reviewList>li {
    border-top: .1rem solid #ccc
}

.hotelDetail #roomReview .reviewList>li:first-child {
    border-top: none
}

.hotelDetail #roomReview .reviewList>li:first-child .reviewListSummary {
    padding-top: 0
}

.hotelDetail #roomReview .reviewList>li:not(.open) .title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden
}

.hotelDetail #roomReview .reviewList>li.open .reviewListContent {
    display: block
}

.hotelDetail #roomReview .reviewList>li.open .reviewListSummary a:after {
    top: 0;
    transform: rotate(0)
}

.hotelDetail #roomReview .reviewListSummary {
    width: 100%;
    padding: 2.5rem .5rem;
    font-size: 1.5rem;
    line-height: 2.4rem;
    display: inline-block
}

.hotelDetail #roomReview .reviewListSummary>a {
    display: block;
    width: 100%;
    position: relative;
    color: #000
}

.hotelDetail #roomReview .reviewListSummary>a:after {
    position: absolute;
    top: .5rem;
    right: 1rem;
    content: "";
    display: block;
    width: 2rem;
    height: 2rem;
    background: url(//openimage.interpark.com/UI/tour/common/common/icon-lineArrow.svg) no-repeat;
    background-size: 100%;
    transform: rotate(180deg);
    transition: transform .3s ease
}

.hotelDetail #roomReview .reviewListSummary>a .title {
    width: calc(100% - 3.5rem)
}

.hotelDetail #roomReview .reviewListSummary>a .label {
    display: inline-flex;
    border: .1rem solid #eee;
    border-radius: .4rem;
    height: 2.1rem;
    line-height: 2.1rem;
    margin-right: .5rem;
    padding: 0 .4rem;
    font-size: 1.3rem;
    color: #999;
    flex-shrink: 0
}

.hotelDetail #roomReview .reviewListSummaryInfo {
    display: flex;
    color: #999;
    font-size: 1.3rem;
    line-height: 1.4rem;
    margin-top: .5rem
}

.hotelDetail #roomReview .reviewListSummaryInfo>:not(:first-child) {
    margin-left: 1rem
}

.hotelDetail #roomReview .reviewListSummaryInfo a {
    color: #999
}

.hotelDetail #roomReview .reviewListContent {
    display: none;
    margin-top: .5rem;
    padding-bottom: 3rem
}

.hotelDetail #roomReview .reviewListContent .card {
    margin-bottom: 3rem;
    padding: 2rem;
    background-color: #f8f8f8;
    border-radius: .8rem;
    font-size: 1.3rem;
    line-height: 2rem;
    color: #666
}

.hotelDetail #roomReview .reviewListContent .card dl {
    display: flex;
    margin-bottom: .5rem;
    font-size: 1.5rem;
    font-weight: 700
}

.hotelDetail #roomReview .reviewListContent .card dl dt {
    color: #000
}

.hotelDetail #roomReview .reviewListContent .card dl dd {
    margin-left: .5rem;
    color: #1769ff
}

.hotelDetail #roomReview .reviewListContent .card li:not(:first-child) {
    margin-top: 2rem
}

.hotelDetail #roomReview .reviewListContent p {
    padding: 0 .5rem;
    color: #666;
    font-size: 1.5rem;
    line-height: 2.5rem
}

.hotelDetail #roomReview .reviewListContent p:not(:last-child) {
    padding-bottom: 2rem
}

.hotelDetail #roomReview .reviewListContent img {
    display: block;
    width: 100%;
    padding: 0 .5rem;
    box-sizing: border-box
}

@media (min-width: 1025px) {
    .hotelDetail #roomReview {
        padding:1.5rem
    }

    .hotelDetail #roomReview .reviewListSummaryInfo a {
        display: none
    }
}

.hotelDetail .slide a {
    display: block
}

.hotelDetail .slideHorizontal {
    padding: 3rem 0
}

.hotelDetail article {
    padding: 2rem
}

.hotelDetail article:not(:last-child) {
    border-bottom: 1rem solid #f3f3f3
}

.hotelDetailTitle {
    color: #000;
    font-size: 1.7rem;
    font-weight: 700
}

.hotelDetail .star {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 1.3rem
}

.hotelDetail .star:before {
    content: "";
    width: 1.4rem;
    height: 1.4rem;
    margin-right: .3rem;
    background: url(//openimage.interpark.com/UI/tour/common/common/icon_star_yellow.svg) no-repeat;
    background-size: 100%
}

.hotelDetail .star:before,.hotelDetail .starRate {
    position: relative;
    display: inline-block;
    text-indent: -999rem;
    overflow: hidden
}

.hotelDetail .starRate {
    width: 8.8rem;
    height: 1.7rem;
    background: url(//openimage.interpark.com/UI/tour/common/common/icon_starOff.svg) no-repeat,url(//openimage.interpark.com/UI/tour/common/common/icon_starOff.svg) no-repeat 1.8rem 0,url(//openimage.interpark.com/UI/tour/common/common/icon_starOff.svg) no-repeat 3.6rem 0,url(//openimage.interpark.com/UI/tour/common/common/icon_starOff.svg) no-repeat 5.4rem 0,url(//openimage.interpark.com/UI/tour/common/common/icon_starOff.svg) no-repeat 7.2rem 0;
    background-size: 1.6rem 1.7rem
}

.hotelDetail .starRate:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(//openimage.interpark.com/UI/tour/common/common/icon_star_yellow.svg) no-repeat,url(//openimage.interpark.com/UI/tour/common/common/icon_star_yellow.svg) no-repeat 1.8rem 0,url(//openimage.interpark.com/UI/tour/common/common/icon_star_yellow.svg) no-repeat 3.6rem 0,url(//openimage.interpark.com/UI/tour/common/common/icon_star_yellow.svg) no-repeat 5.4rem 0,url(//openimage.interpark.com/UI/tour/common/common/icon_star_yellow.svg) no-repeat 7.2rem 0;
    background-size: 1.6rem 1.7rem
}

.hotelDetail .starRate[data-star-rate="0"]:after {
    width: 0
}

.hotelDetail .starRate[data-star-rate="0.5"]:after {
    width: .8rem
}

.hotelDetail .starRate[data-star-rate="1"]:after {
    width: 1.8rem
}

.hotelDetail .starRate[data-star-rate="1.5"]:after {
    width: 2.6rem
}

.hotelDetail .starRate[data-star-rate="2"]:after {
    width: 3.6rem
}

.hotelDetail .starRate[data-star-rate="2.5"]:after {
    width: 4.4rem
}

.hotelDetail .starRate[data-star-rate="3"]:after {
    width: 5.4rem
}

.hotelDetail .starRate[data-star-rate="3.5"]:after {
    width: 6.2rem
}

.hotelDetail .starRate[data-star-rate="4"]:after {
    width: 7.2rem
}

.hotelDetail .starRate[data-star-rate="4.5"]:after {
    width: 8rem
}

.hotelDetail .badgeWrap {
    display: inline-flex;
    flex-wrap: wrap
}

.hotelDetail .badgeWrap .badgeActivate {
    font-weight: 700
}

.hotelDetail a,.hotelDetail button {
    cursor: pointer
}

.hotelDetail a:disabled,.hotelDetail button:disabled {
    cursor: inherit
}

.hotelDetail .slide {
    display: flex
}

.hotelDetail .slide .item {
    flex-shrink: 0;
    width: 100%
}

.hotelDetail .slide img {
    display: block;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover
}

.hotelDetail .main {
    position: relative;
    margin-bottom: 1rem;
    padding: 0
}

.hotelDetail .mainInfo {
    position: relative;
    padding: 1.5rem 1.5rem 2rem
}

.hotelDetail .mainInfoMiddle,.hotelDetail .mainInfoTop {
    padding: 0 .5rem
}

.hotelDetail .mainInfoTop {
    width: calc(100% - 6.5rem);
    margin-bottom: 1rem;
    box-sizing: border-box;
    padding-right: 0
}

.hotelDetail .mainInfoTop .badgeWrap {
    margin-top: -.5rem
}

.hotelDetail .mainInfoTop .badgeWrap .badge {
    margin-top: .5rem
}

.hotelDetail .mainInfoMiddle .title {
    width: calc(100% - 6.5rem);
    font-weight: 700
}

.hotelDetail .mainInfoMiddle .title .en {
    display: block;
    font-size: 1.5rem;
    line-height: 1.8rem
}

.hotelDetail .mainInfoMiddle .title .en:not(:only-child) {
    margin-bottom: .5rem
}

.hotelDetail .mainInfoMiddle .title .en:only-child,.hotelDetail .mainInfoMiddle .title .ko {
    font-size: 2.5rem;
    line-height: 3.1rem
}

.hotelDetail .mainInfoMiddle .info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 1.5rem
}

.hotelDetail .mainInfoMiddle .info .data {
    display: flex;
    margin-right: 1rem;
    padding-left: 1.9rem;
    background: url(//openimage.interpark.com/UI/tour/pages/hotel/detail/icon_hotel.png) no-repeat 0;
    background-size: 1.4rem
}

.hotelDetail .mainInfoMiddle .info .data li {
    font-size: 1.3rem;
    line-height: 1.6rem;
    color: #999
}

.hotelDetail .mainInfoMiddle .info .data li:not(:first-child):before {
    content: "/main"
}

.hotelDetail .mainInfoMiddle .star:after {
    content: "";
    width: .8rem;
    height: .8rem;
    margin-left: .2rem;
}

.hotelDetail .mainInfoMiddle .btnMap {
    position: absolute;
    top: .5rem;
    right: 1rem;
    width: 4.4rem;
    height: 4.4rem;
    box-sizing: border-box
}

.hotelDetail .mainInfoMiddle .btnMap img {
    display: block
}

.hotelDetail .mainInfoBottom {
    margin-top: 1.5rem
}

.hotelDetail .mainInfoBottom .couponButton {
    border-radius: 1rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 4rem;
    border: .1rem solid #1769ff;
    color: #1769ff;
    font-size: 1.5rem;
    font-weight: 700
}

.hotelDetail .mainInfoBottom .couponButton img {
    display: inline-block;
    margin-left: .3rem
}

.hotelDetail .mainInfoBottom .adLink {
    display: inline-block;
    margin-top: 1rem;
    color: #999;
    font-size: 1.3rem;
    line-height: 2rem
}

.hotelDetail .mainInfoBottom .adLink:after {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: .5rem;
    border: .4rem solid transparent;
    border-left-color: #999
}

.hotelDetail .mainInfoBottom .productBanner {
    overflow: hidden;
    margin-top: 1.6rem;
    border: .1rem solid rgba(0,0,0,.1);
    border-radius: 1rem;
    text-align: center
}

.hotelDetail .mainInfoBottom .productBanner a {
    display: block;
    height: 100%
}

.hotelDetail .mainInfoBottom .productBanner img {
    width: 100%;
    vertical-align: middle
}

.hotelDetail .mainImage {
    position: relative;
    overflow: hidden
}

.hotelDetail .mainImage .item {
    background: #f3f3f3 url(//openimage.interpark.com/UI/tour/common/common/interpark_new.svg) 50% no-repeat;
    background-size: 15rem;
    height: 66.66667vw
}

.hotelDetail .mainImage .item .more {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,.6);
    color: #fff;
    font-size: 2rem;
    line-height: 15.5rem;
    text-align: center
}

.hotelDetail .mainImage .item .galleryButton {
    display: none
}

.hotelDetail .mainImageInfo {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1rem 2rem;
    position: absolute;
    left: 0;
    bottom: 0;
    color: #fff;
    box-sizing: border-box;
    font-size: 1.3rem
}

.hotelDetail .mainImageInfo:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 15.8rem;
    background-image: linear-gradient(180deg,hsla(0,0%,100%,0) 4%,rgba(0,0,0,.5));
    pointer-events: none
}

.hotelDetail .mainImageInfo .explanation,.hotelDetail .mainImageInfo .slidePagination {
    position: relative;
    z-index: 9
}

.hotelDetail .mainImageInfo .explanation {
    font-weight: 700
}


.hotelDetail .detailTab {
    position: relative;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    height: 5.5rem;
    background-color: #fff;
    z-index: 999
}

.hotelDetail .detailTab.fixed {
    position: fixed;
    width: 100%;
    box-sizing: border-box
}

.hotelDetail .detailTab.fixed.shadow {
    box-shadow: 0 .2rem .4rem rgba(0,0,0,.03)
}

.hotelDetail .detailTab.fixed~.detailTabContent {
    margin-top: 5.5rem
}

.hotelDetail .detailTab .tabMenu {
    position: relative;
    display: flex;
    width: 100%;
    border-radius: 1rem;
    overflow: hidden
}

.hotelDetail .detailTab .tabMenu:after {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    content: "";
    width: calc(100% - .2rem);
    height: calc(100% - .2rem);
    border: .1rem solid #ccc;
    border-radius: 1rem;
    z-index: 0
}

.hotelDetail .detailTab .tabMenu .btnTab {
    position: relative;
    font-size: 1.5rem;
    display: block;
    width: 100%;
    height: 3.5rem;
    line-height: 3.5rem;
    flex-grow: 1;
    color: #666;
    box-sizing: border-box;
    z-index: 9
}

.hotelDetail .detailTab .tabMenu .btnTab:not(:first-child):before {
    position: absolute;
    top: .1rem;
    left: 0;
    content: "";
    display: block;
    width: .1rem;
    height: calc(100% - .2rem);
    background-color: #e9e9e9
}

.hotelDetail .detailTab .tabMenu .btnTab:first-child.on+.btnTab:before,.hotelDetail .detailTab .tabMenu .btnTab:last-child.on:before,.hotelDetail .detailTab .tabMenu .btnTab:nth-child(2).on+.btnTab:before,.hotelDetail .detailTab .tabMenu .btnTab:nth-child(2).on:before {
    display: none
}

.hotelDetail .detailTab .tabMenu .btnTab.on {
    color: #fff;
    background: #333;
    height: calc(100% + .2rem);
    font-weight: 700
}

.hotelDetail .detailTabContent .tabContent:not(:first-child),.hotelDetail .selectFilter.invisible,.hotelDetail .selectWrap.invisible {
    display: none
}

.hotelDetail .selectWrap {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 1.5rem
}


.hotelDetail .selectFilter {
    height: 3.6rem
}

.hotelDetail .selectFilter>div {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3.6rem;
    padding: 0 2.4rem 1rem;
    background-color: #fff;
    box-sizing: border-box
}

.hotelDetail .selectFilter.fixed>div {
    position: fixed;
    top: 5.4rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999
}

.inApp .hotelDetail .selectFilter.fixed>div {
    top: 10.4rem
}

.hotelDetail .selectFilter.fixed.shadow>div {
    box-shadow: 0 .2rem .4rem rgba(0,0,0,.03)
}

.hotelDetail .selectFilter .checkboxWrap {
    cursor: pointer
}

.hotelDetail .selectFilter .checkboxWrap input[type=checkbox] {
    overflow: hidden;
    position: absolute;
    width: .1rem;
    height: .1rem;
    margin: -.1rem;
    clip: rect(0,0,0,0)
}

.hotelDetail .selectFilter .checkboxWrap input[type=checkbox]:checked~.labelText:before {
    background: url(//openimage.interpark.com/UI/tour/common/common/icon_checkbox_on.svg) 0 0/100% auto no-repeat
}

.hotelDetail .selectFilter .checkboxWrap .labelText {
    position: relative;
    padding-left: 2.2rem;
    font-size: 1.3rem;
    font-weight: 700
}

.hotelDetail .selectFilter .checkboxWrap .labelText:before {
    content: "";
    position: absolute;
    top: .1rem;
    left: 0;
    width: 1.7rem;
    height: 1.7rem;
    background: url(//openimage.interpark.com/UI/tour/common/common/icon_checkbox_off.svg) 0 0/100% auto no-repeat;
    border-radius: 50%
}

.hotelDetail .selectFilter .checkboxWrap+.selectStyle {
    margin-left: auto
}

.hotelDetail .selectFilter .checkboxWrap~.filterButton {
    margin-left: 1.5rem
}

.hotelDetail .selectFilter .selectStyle .viewPoint {
    width: auto
}

.hotelDetail .selectFilter .selectStyle .optionList {
    width: auto;
    left: -1.2rem
}

.hotelDetail .selectFilter .selectStyle .optionList li a {
    white-space: nowrap
}

.hotelDetail .selectFilter .filterButton {
    margin-left: auto;
    font-size: 1.3rem;
    color: #666
}

.hotelDetail .selectFilter .filterButton span {
    display: inline-block;
    color: #1769ff;
    margin-left: .3rem
}

@media (min-width: 590px) {
    .hotelDetail .mainImage .item {
        width:37.5rem;
        height: 25rem
    }

    .hotelDetail .mainInfoBottom .productBanner a {
        display: block;
        width: 34.3rem;
        margin: 0 auto
    }
}

@media (min-width: 1025px) {
    .hotelDetail {
        max-width:80rem
    }

    .hotelDetail .main {
        margin-top: 3rem
    }

    .hotelDetail .mainInfoMiddle .btnMap {
        top: 1rem
    }

    .hotelDetail .mainInfoBottom .productBanner {
        height: 11rem;
        border: 0
    }

    .hotelDetail .mainInfoBottom .productBanner img {
        width: auto;
        height: 100%
    }

    .hotelDetail .mainImage {
        overflow: visible
    }

    .hotelDetail .mainImage .slide {
        display: block;
        overflow: hidden;
        height: 32rem;
        background-image: url(//openimage.interpark.com/UI/tour/pages/hotel/detail/detail/img_default2.png),url(//openimage.interpark.com/UI/tour/pages/hotel/detail/detail/img_default.png),url(//openimage.interpark.com/UI/tour/pages/hotel/detail/detail/img_default.png),url(//openimage.interpark.com/UI/tour/pages/hotel/detail/detail/img_default.png),url(//openimage.interpark.com/UI/tour/pages/hotel/detail/detail/img_default.png);
        background-repeat: no-repeat;
        background-position: 0 0,49rem 0,65rem 0,49rem 16.5rem,65rem 16.5rem;
        background-size: 48rem 32rem,15rem 15.5rem,15rem 15.5rem,15rem 15.5rem,15rem 15.5rem;
        transform: none!important
    }

    .hotelDetail .mainImage .item {
        overflow: hidden;
        position: relative;
        float: left;
        width: 15rem!important;
        height: 15.5rem;
        margin-left: 1rem;
        border-radius: 1rem
    }

    .hotelDetail .mainImage .item:first-child {
        width: 48rem!important;
        height: 32rem;
        margin-left: 0
    }

    .hotelDetail .mainImage .item:nth-of-type(2),.hotelDetail .mainImage .item:nth-of-type(3) {
        margin-bottom: 1rem
    }

    .hotelDetail .mainImage .item:nth-child(n+6) {
        display: none
    }

    .hotelDetail .mainImage .item .more {
        display: block
    }

    .hotelDetail .mainImage .item .galleryButton {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 20
    }

    .hotelDetail .mainImage .item .galleryButton span {
        position: absolute;
        overflow: hidden;
        clip: rect(0 0 0 0);
        margin: -.1rem;
        width: .1rem;
        height: .1rem
    }

    .hotelDetail .mainImageInfo {
        width: 48rem
    }

    .hotelDetail .mainImageInfo:before {
        border-radius: 0 0 1rem 1rem
    }

    .hotelDetail .mainImageInfo .slidePagination {
        display: none
    }

    .hotelDetail .detailTab.fixed,.hotelDetail .selectFilter.fixed>div {
        max-width: 80rem
    }

    .hotelDetail .typeContent {
        padding: initial
    }

    .typeContentItem {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between
    }

    .hotelDetail .detailTab {
        padding: initial
    }

    .hotelDetail .detailTab .tabMenu:after {
        height: calc(100% - .3rem)
    }

    .hotelDetail .detailTab .tabMenu .btnTab.on {
        height: calc(100% + .3rem)
    }

    .hotelDetail .selectFilter>div {
        padding: 0 2rem 1rem
    }

    .typeContentItem .roomInfo {
        flex-basis: 452px
    }

    .typeContentItem .roomInfo .thumbnailWrap {
        width: auto;
        flex-basis: 120px;
        height: 160px
    }

    .typeContentItem .roomInfo .roomWrap {
        flex-basis: 312px
    }

    .typeContentItem .roomInfo .roomWrap .roomNameWrap .roomName {
        font-size: 1.1rem
    }

    .typeContentItem .roomInfo .roomWrap .deadLine {
        font-size: 1.3rem
    }

    .typeContentItem .etcInfo .serviceWrap ul li,.typeContentItem .etcInfo .serviceWrap ul li button {
        line-height: 2.6rem
    }

    .typeContentItem .orderInfo .priceWrap .roomPriceTextWrap .salePrice {
        font-size: 1.5rem
    }

    .typeContentItem .orderInfo {
        box-sizing: border-box;
        flex-basis: 328px;
        order: 1
    }

    .typeContentItem .orderInfo .buttonWrap button {
        height: 3.5rem;
        border-radius: 1rem
    }

    .typeContentItem .etcInfo {
        padding-bottom: 0
    }

    .typeContentItem .etcInfo .serviceWrap ul {
        padding: initial;
        border-radius: 0;
        border-radius: initial
    }

    .hotelDetail .typeContentList .promotion p:before {
        display: none
    }
}

.benefitBanner {
    display: flex;
    justify-content: space-between;
    padding: 1.3rem 1.3rem 0;
    margin: 0 auto
}

.benefitBanner .textContainer {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    font-size: 1.3rem
}

.benefitBanner .textContainer .title {
    margin: 0;
    width: 7.2rem;
    color: #666
}

.benefitBanner .textContainer .contents {
    margin: 0;
    color: #1c1c1e
}

.benefitBanner .textContainer button.contents:after {
    content: "";
    position: absolute;
    right: 1.5rem;
    width: 1rem;
    height: 1.5rem;
    margin-top: 1.1rem;
    background: url(//openimage.interpark.com/UI/tour/common/common/icon-arrow-more.svg) no-repeat 50%;
    background-size: 90% auto;
    transform: translateY(-50%)
}

@media (max-width: 600px) {
    .benefitBanner .textContainer button.contents:after {
        right:2.3rem
    }
}


abbr,address,article,aside,audio,b,blockquote,body,canvas,caption,cite,code,dd,del,details,dfn,div,dl,dt,em,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,p,pre,q,samp,section,small,span,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,ul,var,video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent
}

article,aside,details,figcaption,figure,header,hgroup,menu,nav,section {
    display: block
}

ol,ul {
    list-style: none
}

blockquote,q {
    quotes: none
}

blockquote:after,blockquote:before,q:after,q:before {
    content: "";
    content: none
}

dfn,em,i {
    font-style: normal
}

a {
    margin: 0;
    padding: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    text-decoration: none
}

ins {
    text-decoration: none
}

ins,mark {
    background-color: #ff9;
    color: #000
}

mark {
    font-style: italic;
    font-weight: 700
}

del {
    text-decoration: line-through
}

table {
    border-collapse: collapse;
    border-spacing: 0
}

hr {
    display: none
}

input,select {
    vertical-align: middle
}

input {
    -webkit-margin-before: 0;
    -webkit-margin-after: 0
}

input[type=checkbox] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none
}

input[type=text]::-ms-clear,input[type=text]::-ms-reveal {
    display: none;
    width: 0;
    height: 0
}

input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration {
    display: none
}

button,input,select,textarea {
    border: 0;
    padding: 0;
    box-shadow: 0;
    border-radius: 0;
    background: #fff;
    color: #000
}

a,button {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    cursor: pointer
}

button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
}

button:active {
    opacity: .5
}

select {
    border-radius: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none
}

select::-ms-expand {
    display: none
}

</style>
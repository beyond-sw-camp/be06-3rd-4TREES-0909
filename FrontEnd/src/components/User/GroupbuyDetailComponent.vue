<template>
    <section class="hotelDetail">
        <article class="main">
            <div class="mainInfo">
                <div class="mainInfoMiddle">
                    <div class="title">
                        <p class="ko">{{ groupbuyStore.waitGroupbuy.gpbuyTitle }}</p>
                    </div>
                    <div class="info">
                        <ul class="data">
                            <li>{{ groupbuyStore.getCategoryText(groupbuyStore.waitGroupbuy.categoryIdx) }}</li>
                        </ul>
                        <p class="star">목표수량 : {{ groupbuyStore.waitGroupbuy.gpbuyQuantity }}</p>
                        <p class="star">입찰 남은 시간 : {{ remainingTime }}</p>
                    </div>
                </div>
            </div>
        </article>
        <div class="detailTabContent">
            <div id="roomSelect" class="tabContent" style="display:block">

                <div class="typeWrap">
                    <article class="typeFilter">
                        <p class="typeFilterInfo">{{ groupbuyStore.waitGroupbuy.gpbuyContent }}</p>
                    </article>
                    <div class="typeList">
                        <article class="typeDetails open prodNoType">
                            <div class="typeContent ">
                                <BidItemComponent v-for="bid in groupbuyStore.waitGroupbuy.bidList" :key="bid.bidIdx" :bid="bid" :max-quantity="groupbuyStore.waitGroupbuy.gpbuyQuantity"/>
                            </div>
                        </article>
                    </div>
                </div>
                <button type="button" class="topButton active" @click="scrollToTop"><span>최상단으로 스크롤 이동</span></button>
            </div>
        </div>
    </section>
</template>

<script>
import BidItemComponent from './BidItemComponent.vue';
import { useGroupbuyStore } from '@/stores/useGroupbuyStore';
import { mapStores } from 'pinia';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default {
    name: "GroupbuyDetailComponent",
    components: {
        BidItemComponent
    },
    data() {
        return {
            isLoading: true,
            remainingTime: ''
        };
    },
    computed: {
      ...mapStores(useGroupbuyStore)
    },
    created() {
        this.groupbuyStore.getWaitGroupbuy(this.$route.params.idx);
        this.updateRemainingTime();
        setInterval(this.updateRemainingTime, 1000);
    },
    methods: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
            this.remainingTime = this.calculateRemainingTime(this.groupbuyStore.waitGroupbuy.gpbuyBidEndedAt);
        },
    }
};
</script>

<style scoped>


section {
    margin: 0;
    padding: 0;
}
.hotelDetail {
    width: 800px;
    min-width: 32rem;
    margin: 0 auto;
}


.hotelDetail .typeFilter {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 1.5rem;
    margin-bottom: 3rem;
}


.hotelDetail .typeFilterInfo {
    color: #000000;
    /* padding-top: 1.5rem; */
    font-size: 0.9rem;
    font-weight: 500;
    padding-left: 20px;
}


.hotelDetail .typeDetails {
    padding: 0
}

.hotelDetail .typeDetails.open .typeContent {
    display: block
}

.hotelDetail .typeContent {
    display: none;
    padding: 0 2rem
}


.hotelDetail .typeContent .hiddenText {
    display: inline-block;
    color: #fff;
    padding-left: .4rem
}

.hotelDetail article {
    padding: 1rem
}

.hotelDetail article:not(:last-child) {
    border-bottom: 1rem solid #f3f3f3
}

.hotelDetail .star {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 0.8rem
}

.hotelDetail .star:before {
    content: "";
    width: 0.8rem;
    height: 0.8rem;
    margin-right: .3rem;
    background: url(//openimage.interpark.com/UI/tour/common/common/icon_star_yellow.svg) no-repeat;
    background-size: 100%
}

.hotelDetail a,.hotelDetail button {
    cursor: pointer
}

.hotelDetail a:disabled,.hotelDetail button:disabled {
    cursor: inherit
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

.hotelDetail .mainInfoMiddle .title {
    width: calc(100% - 6.5rem);
    font-weight: 700
}

.hotelDetail .mainInfoMiddle .title .en {
    display: block;
    font-size: 1.2rem;
    line-height: 1.8rem
}

.hotelDetail .mainInfoMiddle .title .en:not(:only-child) {
    margin-bottom: .5rem
}

.hotelDetail .mainInfoMiddle .title .en:only-child,.hotelDetail .mainInfoMiddle .title .ko {
    font-size: 1.8rem;
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
    padding-left: 1.5rem;
    background: url(//openimage.interpark.com/UI/tour/pages/hotel/detail/icon_hotel.png) no-repeat 0;
    background-size: 1rem
}

.hotelDetail .mainInfoMiddle .info .data li {
    font-size: 0.8rem;
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

@media (min-width: 1025px) {
    .hotelDetail {
        max-width:80rem
    }

    .hotelDetail .main {
        margin-top: 3rem
    }

    .hotelDetail .typeContent {
        padding: initial
    }

    .hotelDetail .detailTab {
        padding: initial
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

article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
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

.topButton {
    display: none;
    visibility: hidden;
    position: fixed;
    bottom: 2rem;
    left: 50%;
    z-index: 100;
    width: 5rem;
    height: 5rem;
    margin-left: 42rem;
    background: url(//openimage.interpark.com/UI/tour/common/common/icon_scrolltop.svg) 0 0/100% auto no-repeat;
    opacity: 0;
    transition: opacity .3s
}

@media (min-width: 1025px) {
    .topButton {
        display:block
    }

    .topButton.active {
        visibility: visible;
        opacity: 1
    }
}

.topButton span {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    margin: -.1rem;
    width: .1rem;
    height: .1rem
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
<template>
    <div class="css-5cgeed">
        <div class="css-qdwe4u">
            <header class="css-1s72iaf">
                <h3 class="css-9fmo7n">입찰 조회/수정</h3>
                <p class="css-17ti8g7">등록한 모든 입찰 손쉽게 조회/수정할 수 있어요.</p>
            </header>
            <div v-if="selected || selectedBidIdx == null || gpbuyStatus !== '대기'" class="css-8knsro"><button
                    type="button" class="css-16iku8x" style="background-color: gray;">입찰 수정하기</button></div>
            <div v-else class="css-8knsro"><router-link
                    :to="{ name: 'BidModifyPage', query: { gpbuyTitle: gpbuyTitle, bidIdx: selectedBidIdx } }"><button
                        type="button" class="css-16iku8x">입찰
                        수정하기</button></router-link></div>
            <div class="css-1buehjj">
                <div class="css-1oucam8">
                    <div id="table-wrapper">
                        <div class="css-1m95gdn">
                            <div class="css-ga3b11">
                                <div class="css-1og3vwv">
                                    <div class="css-1oxv28r">&nbsp;&nbsp;총 <span class="css-w4x83i">{{
                                        sellerStore.bidInfoList.length }}</span>개</div>
                                    <div class="css-1peezc1"></div>
                                    <div id="select-12" class="css-bjn8wh">
                                        <div id="trigger-12" aria-controls="option-list-12" aria-haspopup="true"
                                            aria-expanded="false" data-open="false">

                                        </div>

                                        <div class="css-behpb9">
                                            <div class="css-1m20113"><label class="css-1oxv28r">선정 여부</label>
                                                <div id="status">
                                                    <div aria-labelledby="trigger-button-43" id="option-list-43"
                                                        role="listbox">
                                                        <div class="css-1ki033l">
                                                            <div role="option" @click="clickSelect"><label
                                                                    class="css-1alv6b0"><svg
                                                                        xmlns="http://www.w3.org/2000/svg" width="16"
                                                                        height="16" fill="none">
                                                                        <path :fill="selectFill" fill-rule="evenodd"
                                                                            :d="checkboxSelect" clip-rule="evenodd">
                                                                        </path>
                                                                    </svg>선정</label>
                                                            </div>
                                                            <div role="option" @click="clickNotSelect"><label
                                                                    class="css-1alv6b0"><svg
                                                                        xmlns="http://www.w3.org/2000/svg" width="16"
                                                                        height="16" fill="none">
                                                                        <path :fill="notSelectFill" fill-rule="evenodd"
                                                                            :d="checkboxNotSelect" clip-rule="evenodd">
                                                                        </path>
                                                                    </svg>미선정</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="css-1n7cno0">
                            <table role="table" class="css-1dfxxj6">
                                <thead>
                                    <tr role="row">
                                        <th class="table-column css-7y20gd" colspan="1" role="columnheader">
                                            <div class="css-1wnowod"><label class="css-u2o9sw"><svg
                                                        xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                        fill="none">
                                                        <path fill="#E5E5E5" fill-rule="evenodd"
                                                            d="M15 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10Zm0 1.3H5a.7.7 0 0 0-.694.605L4.3 5v10a.7.7 0 0 0 .605.694L5 15.7h10a.7.7 0 0 0 .694-.605L15.7 15V5a.7.7 0 0 0-.605-.694L15 4.3Z"
                                                            clip-rule="evenodd"></path>
                                                    </svg><input type="checkbox" title="Toggle All Rows Selected"
                                                        class="css-eivff4" style="cursor: pointer;"></label></div>
                                        </th>
                                        <th class="table-column css-1ry0z48" colspan="1" role="columnheader">
                                            입찰번호</th>
                                        <th class="table-column css-i06y6t" colspan="1" role="columnheader">
                                            공구 제목
                                        </th>
                                        <th class="table-column css-i413q7" colspan="1" role="columnheader">
                                            이미지
                                        </th>
                                        <th class="table-column css-13s4dk6" colspan="1" role="columnheader">
                                            상품 이름
                                        </th>
                                        <th class="table-column css-f0eqg5" colspan="1" role="columnheader">
                                            가격
                                        </th>
                                        <th class="table-column css-1j6tg52 " colspan="1" role="columnheader">
                                            공구 상태
                                        </th>

                                    </tr>
                                </thead>
                                <tbody role="rowgroup">
                                    <div v-if="isLoading"></div>
                                    <SellerBidComponent v-else v-for="(bid, idx) in bidInfoList" :key="idx"
                                        :bid="bid" @update-select-bid="handleSelectBid"></SellerBidComponent>
                                    <div v-if="isLoading"></div>
                                    <infinite-loading v-else @infinite="load" ref="InfiniteLoading">
                                        <template #spinner><span></span></template>
                                        <template #no-more><span></span></template>
                                        <template #no-results><span></span></template>
                                    </infinite-loading>
                                </tbody>
                            </table>
                        </div>
                        <div class="css-1spfi4c">
                            <div class="css-ga3b11">
                                <div class="css-yu6za6">
                                    <div class="css-1duehk7"><span class="css-w4x83i">0</span>개 선택</div>
                                    <div id="select-13" class="css-1d3w5wq">
                                        <div aria-labelledby="trigger-button-13" id="option-list-13" role="listbox"
                                            class="css-s5xdrg">

                                        </div>
                                    </div>
                                </div>
                                <div class="css-1axnh3m">
                                    <p>총 {{ sellerStore.bidInfoList.length }}개<span class="css-zvmrfm">중</span></p>
                                    <p>{{ page + 1 }}<span class="css-c6lzdm">-</span>5</p><button type="button"
                                        disabled="" class="css-1np6q9z"><svg height="20" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g fill="none" fill-rule="evenodd">
                                                <path
                                                    d="M12.5937 3.28958L5.84257 9.27254C5.62528 9.46689 5.5 9.73474 5.5 10.0168C5.50135 10.3019 5.62767 10.5702 5.84701 10.7629L12.5961 16.7123C12.8098 16.9001 13.0887 17 13.3753 17C13.6631 17 13.9441 16.8994 14.1567 16.7104L14.2423 16.6254C14.6133 16.2134 14.5836 15.5984 14.1538 15.2196L8.2477 10.0132L14.1562 4.77938C14.6155 4.37104 14.6143 3.69396 14.1538 3.28808C13.7185 2.90339 13.0286 2.90406 12.5937 3.28958Z"
                                                    fill="#999999"></path>
                                            </g>
                                        </svg></button><button type="button" disabled="" class="css-o20oxp"><svg
                                            height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <g fill="none" fill-rule="evenodd">
                                                <path
                                                    d="M7.40633 16.7104L14.1574 10.7275C14.3747 10.5331 14.5 10.2653 14.5 9.98324C14.4987 9.69808 14.3723 9.42979 14.153 9.23707L7.40392 3.28772C7.19025 3.09994 6.91128 3 6.62468 3C6.33695 3 6.05593 3.10061 5.84331 3.28961L5.75767 3.37461C5.38667 3.78656 5.41641 4.40163 5.84622 4.78045L11.7523 9.98685L5.84384 15.2206C5.38446 15.629 5.38571 16.306 5.84622 16.7119C6.28145 17.0966 6.97139 17.0959 7.40633 16.7104Z"
                                                    fill="#999999"></path>
                                            </g>
                                        </svg></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SellerBidComponent from './SellerBidComponent.vue';
import InfiniteLoading from 'infinite-loading-vue3-ts';
import { useSellerStore } from '@/stores/useSellerStore';
import { mapStores } from 'pinia';
export default {
    data() {
        return {
            isLoading: true,
            page: 0,
            selected: this.$route.query.selectedBid == "true",
            checkboxSelect: "",
            checkboxNotSelect: "",
            selectFill: "",
            notSelectFill: "",
            selectedBidIdx: null,
            gpbuyTitle: "",
            gpbuyStatus: "",
            bidInfoList: []
        }
    },
    components: {
        SellerBidComponent,
        InfiniteLoading
    },
    computed: {
        ...mapStores(useSellerStore) // 어떤 저장소랑 연결시켜 주겠다.
    },
    methods: {
        updateSelect() {
            if (this.selected === "true" || this.selected === true) {
                this.checkboxSelect = "M14.546 8A6.553 6.553 0 0 0 8 1.455 6.553 6.553 0 0 0 1.455 8 6.553 6.553 0 0 0 8 14.546 6.553 6.553 0 0 0 14.546 8ZM16 8c0 4.411-3.589 8-8 8s-8-3.589-8-8 3.589-8 8-8 8 3.589 8 8Zm-4.768 0a3.232 3.232 0 1 1-6.465 0 3.232 3.232 0 0 1 6.465 0Z";
                this.checkboxNotSelect = "M8 1.455A6.553 6.553 0 0 1 14.546 8 6.553 6.553 0 0 1 8 14.546 6.553 6.553 0 0 1 1.455 8 6.553 6.553 0 0 1 8 1.455ZM8 16c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8Z";
                this.selectFill = "#027AFF";
                this.notSelectFill = "#E5E5E5";

            } else if (this.selected === "false" || this.selected === false) {
                this.checkboxSelect = "M8 1.455A6.553 6.553 0 0 1 14.546 8 6.553 6.553 0 0 1 8 14.546 6.553 6.553 0 0 1 1.455 8 6.553 6.553 0 0 1 8 1.455ZM8 16c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8Z";
                this.checkboxNotSelect = "M14.546 8A6.553 6.553 0 0 0 8 1.455 6.553 6.553 0 0 0 1.455 8 6.553 6.553 0 0 0 8 14.546 6.553 6.553 0 0 0 14.546 8ZM16 8c0 4.411-3.589 8-8 8s-8-3.589-8-8 3.589-8 8-8 8 3.589 8 8Zm-4.768 0a3.232 3.232 0 1 1-6.465 0 3.232 3.232 0 0 1 6.465 0Z";
                this.selectFill = "#E5E5E5";
                this.notSelectFill = "#027AFF";
            }
        },
        clickSelect() {
            this.$router.push("/seller/bid?selectedBid=true");
        },
        clickNotSelect() {
            this.$router.push("/seller/bid?selectedBid=false");
        },
        async getBidInfoList() {
            await this.sellerStore.getBidInfoList(this.page, this.selected);
            const response = this.sellerStore.bidInfoList;
            this.bidInfoList.push(...response);
            this.isLoading = false;
            this.page ++;
        },
        handleSelectBid(bidIdx, groupbuyTitle, gpbuyStatus) {
            this.selectedBidIdx = bidIdx;
            this.gpbuyTitle = groupbuyTitle;
            this.gpbuyStatus = gpbuyStatus;
        },
        refreshPage() {
            this.page = 0;
            this.bidInfoList = [];
            this.$refs.InfiniteLoading.stateChanger.reset();
            this.isLoading = true;
            this.getBidInfoList();
            this.updateSelect();
        },
        async load($state) {
            await this.sellerStore.getBidInfoList(this.page, this.selected);
            const response = this.sellerStore.bidInfoList;
            if (response.length == 0) {
                $state.complete();
            }
            else {
                this.bidInfoList.push(...response)
                if (response.length == 10) {
                    this.page++;
                    $state.loaded()
                } else{
                    $state.complete();
                }
            }
        },
    },
    mounted() {
        if (this.$route.query.selectedBid != "true" && this.$route.query.selectedBid != "false") {
            this.$router.push("/seller/bid?selectedBid=true");
        }
        this.updateSelect();
        this.getBidInfoList();
    },
    watch: {
        '$route.query.selectedBid'(newValue) {
            this.selected = newValue == "true";
            this.refreshPage();
        }
    },
}
</script>

<style scoped>
.css-mkkf9p {
    flex: 1 1 auto;
}

.css-5cgeed {
    flex: 1 1 100%;
    min-width: 0px;
}

@media (min-width: 720px) {
    .css-qdwe4u {
        padding: 0px;
    }
}

.css-qdwe4u {
    box-sizing: border-box;
    position: relative;
    margin: 0px auto;
    width: 1024px;
    max-width: 100%;
    transition: width 0.24s ease 0s;
    padding: 0px 20px;
}

@media (min-width: 720px) {
    .css-1s72iaf {
        padding: 80px 0px;
    }
}

.css-1s72iaf {
    padding: 40px 0px;
}

@media (min-width: 720px) {
    .css-9fmo7n {
        font-size: 32px;
    }
}

.css-9fmo7n {
    font-weight: 700;
    line-height: 130%;
    color: rgb(25, 25, 25);
    font-size: 24px;
}

.css-17ti8g7 {
    margin-top: 10px;
    font-size: 16px;
    line-height: 150%;
    color: rgb(76, 76, 76);
}

.css-9fmo7n {
    font-weight: 700;
    line-height: 130%;
    color: rgb(25, 25, 25);
    font-size: 24px;
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

.css-8knsro {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: end;
    justify-content: flex-end;
    margin-top: -50px;
    margin-bottom: 14px;
}

.css-16iku8x {
    display: inline-flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    padding: 11px 16px;
    border-radius: 6px;
    white-space: nowrap;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    font-weight: 700;
    font-size: 14px;
    line-height: 14px;
    color: rgb(255, 255, 255);
    background-color: #c38ffd;
    border: none;
}

button {
    border: none;
    background: rgb(255, 255, 255);
    cursor: pointer;
}

.css-1buehjj {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
}

.css-1oucam8 {
    margin: 0px auto;
    padding: 10px 0px 0px;
    min-width: 100%;
    max-width: 100%;
    scrollbar-width: none;
    box-sizing: border-box;
    width: 100%;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(229, 229, 229);
    border-radius: 6px;
    margin-bottom: 70px;

}





.css-behpb9 {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 10px 0px;
}

@media (min-width: 720px) {
    .css-1m20113 {
        gap: 25px;
    }
}

.css-1m20113 {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 10px;
}

.css-1peezc1 {
    width: 1px;
    height: 16px;
    background-color: rgb(178, 178, 178);
    margin-left: 10px;
    margin-right: 10px;
}


@media (min-width: 720px) {
    .css-prvn4i {
        gap: 37px;
    }
}

.css-prvn4i {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 22px;
}

.css-yu6za6 {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 20px;
}

.css-1og3vwv {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 10px;
}

.css-bjn8wh {
    position: relative;
}


.css-ga3b11 {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
}

.css-1oxv28r {
    min-width: 63px;
    font-weight: 700;
    font-size: 14px;
    line-height: 150%;
    color: rgb(25, 25, 25);
}


.css-1k1iuw5:disabled {
    cursor: not-allowed;
    color: rgb(178, 178, 178);
}

.css-1k1iuw5 {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 11px 16px;
    border: 1px solid rgb(229, 229, 229);
    border-radius: 6px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: rgb(25, 25, 25);
    white-space: nowrap;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    width: 124px;
    height: 36px;
    -webkit-box-pack: start;
    justify-content: flex-start;
}

.css-9q95zi {
    width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    color: rgb(178, 178, 178);
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
}

.css-1k1iuw5:disabled>div svg {
    opacity: 0.3;
}

.css-qrwdqb:disabled {
    border-color: rgb(235, 245, 255);
}

.css-qrwdqb:disabled {
    cursor: not-allowed;
    color: rgb(178, 178, 178);
}

.css-qrwdqb:disabled>div {
    opacity: 0.3;
}



.css-1spfi4c {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 20px;
    position: sticky;
    bottom: 0px;
    z-index: 1000;
    background-color: rgb(255, 255, 255);
    border-top: 1px solid rgb(229, 229, 229);
}

.css-1duehk7 {
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    color: rgb(25, 25, 25);
    white-space: nowrap;
}

.css-w4x83i {
    color: rgb(2, 122, 255);
}

.css-1d3w5wq {
    width: 100%;
}

.css-s5xdrg {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}



.css-1axnh3m {
    color: rgb(102, 102, 102);
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    font-weight: 700;
    font-size: 14px;
    white-space: nowrap;
}

.css-zvmrfm {
    margin: 0px 8px;
}

.css-c6lzdm {
    margin: 0px 4px;
}

.css-1np6q9z {
    padding: 0px 8px 0px 18px;
    display: flex;
}

.css-1np6q9z>svg {
    display: flex;
}

.css-o20oxp {
    padding: 0px 0px 0px 8px;
    display: flex;
}

.css-o20oxp>svg {
    display: flex;
}

.css-1m95gdn {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid rgb(229, 229, 229);
}

.css-r48f4w {
    margin-top: 80px;
    font-weight: 700;
    font-size: 13px;
    line-height: 140%;
    color: rgb(76, 76, 76);
}

.css-154hzvp {
    font-size: 13px;
    line-height: 140%;
    color: rgb(127, 127, 127);
    margin-bottom: 50px;
}

ol,
ul {
    list-style: none;
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









input[type="text" i] {
    padding-block: 1px;
    padding-inline: 2px;
}

input {
    text-rendering: auto;
    color: fieldtext;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    appearance: auto;
    -webkit-rtl-ordering: logical;
    cursor: text;
    background-color: field;
    margin: 0em;
    padding: 1px 0px;
    border-width: 2px;
    border-style: inset;
    border-color: light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    border-image: initial;
    padding-block: 1px;
    padding-inline: 2px;
}


/*상품 조회 목록*/
.css-1n7cno0 {
    min-height: 500px;
    overflow: scroll;
    position: relative;
    max-height: 500px;
}

.css-1dfxxj6 {
    position: relative;
    min-width: 100%;
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

.css-4b8tol {
    padding: 10px 16px;
    border-radius: 6px;
    background-color: rgb(255, 255, 255);
    color: rgb(25, 25, 25);
    caret-color: rgb(2, 122, 255);
    font-size: 14px;
    line-height: 17px;
    cursor: pointer;
    box-sizing: border-box;
    width: 140px;
    height: 36px;
    border: 1px solid rgb(229, 229, 229);
    text-align: center;
    font-weight: 500;
}

/* input readonly */
.css-4b8tol:read-only {
    color: rgb(102, 102, 102);
    cursor: default;
    pointer-events: none;
}

.css-4b8tol:read-only {
    border: none;
    background-color: transparent;
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

.css-1ki033l {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex-basis: 100%;
    gap: 23px;
}

.css-1alv6b0 {
    white-space: nowrap;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    color: rgb(127, 127, 127);
}
</style>
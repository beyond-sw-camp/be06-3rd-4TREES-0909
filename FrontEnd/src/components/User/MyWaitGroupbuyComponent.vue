<template>
    <tr role="row">
        <td role="cell" class="css-k1sij3">
            <div class="css-1wnowod">
                <label class="css-u2o9sw">
                    <input type="radio" name="groupbuy" title="Toggle Row Selected" class="css-eivff4" 
                        style="cursor: pointer;" :value="waitGroupbuy.gpbuyIdx" @change="updateSelectedGroupbuy"></label>
            </div>
        </td>
        <td role="cell" class="css-k1sij3" style="width: 100px">
            <div class="css-gpsap0"><span class="css-165uhau">{{waitGroupbuy.gpbuyIdx}}</span></div>
        </td>
        <td role="cell" class="css-k1sij3">
            <div class="css-w39dry">
                <form><input type="text" autocomplete="off" maxlength="40" class=" css-1fxlnrv" readonly="" name="name"
                        :value="waitGroupbuy.gpbuyTitle">
                </form>
            </div>
        </td>
        <td role="cell" class="css-k1sij3" style="width: 100px">
            <div class="css-1p4iqh6"><input type="text" autocomplete="off" class=" css-4b8tol" readonly="" v-model="bidEndedAt">
            </div>
        </td>
    </tr>
</template>

<script>
import { useGroupbuyStore } from '@/stores/useGroupbuyStore';
import { mapStores } from 'pinia';
export default {
    data(){
        return {
            bidEndedAt: null,
        }
    },
    methods: {
        updateSelectedGroupbuy(event){
            this.$emit("update-select-groupbuy", event.target.value);
        }
    },
    computed: {
        ...mapStores(useGroupbuyStore) // 어떤 저장소랑 연결시켜 주겠다.
    },
    props: ["waitGroupbuy"],
    mounted() {
        let bidEndDay =  this.waitGroupbuy.gpbuyBidEndedAt.split("T")[0];
        let bidEndTime = this.waitGroupbuy.gpbuyBidEndedAt.split("T")[1].split(":");
        this.bidEndedAt = bidEndDay + " ("+ bidEndTime[0] + ":"+bidEndTime[1] +")";
        console.log(this.bidEndedAt);
    }
    
}
</script>

<style scoped>

/*상품 조회 목록*/
.css-1n7cno0 {
    min-height: 500px;
    overflow: scroll;
    position: relative;
    max-height: 750px;
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
    display: inline-block;
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
    width: 200px;
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

html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, em, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time,mark,audio,video {
    margin: 0px;
    padding: 0px;
    border: 0px;
    font-size: 100%;
    font-style: normal;
    vertical-align: baseline;
}
.css-xrnbd4 {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 10px 0px;
    gap: 25px;
}
.css-8840p9 {
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: rgb(76, 76, 76);
    white-space: nowrap;
}
.css-14q291r {
    padding: 10px 16px;
    border-radius: 6px;
    border: 1px solid rgb(229, 229, 229);
    background-color: rgb(255, 255, 255);
    color: rgb(25, 25, 25);
    caret-color: rgb(2, 122, 255);
    font-size: 14px;
    line-height: 17px;
    font-weight: 700;
    cursor: pointer;
    height: 36px;
    box-sizing: border-box;
    width: 205px;
}
.css-loukex {
    display: inline-flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    padding: 11px 25px;
    border: 1px solid rgb(229, 229, 229);
    border-radius: 6px;
    white-space: nowrap;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    max-width: 162px;
    width: 100%;
    height: 36px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: rgb(102, 102, 102);
}
.css-10q122i {
    display: inline-flex;
    -webkit-box-pack: center;
    justify-content: center;
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
    min-width: 193px;
    height: 36px;
}
.css-17t0ez6 {
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 0px 20px;
}
</style>
<template>
    <div id="main_content">
        <!--상품 영역-->
        <section class="main_goods">
            <h2 v-if="0 < $route.query.categoryIdx < 12">{{ groupbuyStore.getCategoryText(categoryIdx) }}</h2>
            <h2 v-else>검색 결과</h2>
            <div class="goods_wrap">
                <div v-if="isLoading"></div>
                <CardComponent v-else-if="groupbuyList.legnth != 0"
                    v-for="(groupbuy, idx) in groupbuyList" :key="idx" :groupbuy="groupbuy">
                </CardComponent>
                <infinite-loading @infinite="load" ref="InfiniteLoading">
                    <template #spinner><span></span></template>
                    <template #no-more><span></span></template>
                    <template #no-results><span></span></template>
                </infinite-loading>
            </div>
        </section>
    </div>
</template>

<script>
import CardComponent from './CardComponent.vue';
import InfiniteLoading from 'infinite-loading-vue3-ts';
import { useGroupbuyStore } from '@/stores/useGroupbuyStore';
import { mapStores } from 'pinia';
export default {
    name: "MainComponent",
    data() {
        return {
            page: 0,
            isLoading: true,
            categoryIdx: null,
            minPrice: null,
            maxPrice: null,
            groupbuyList: []
        }
    },
    components: {
        CardComponent,
        InfiniteLoading
    },
    methods: {
        async searchGroupbuyList() {
            await this.groupbuyStore.searchGroupbuyList(this.page, this.categoryIdx, this.minPrice, this.maxPrice);
            const response = this.groupbuyStore.groupbuyList;
            this.groupbuyList.push(...response);
            this.isLoading = false;
            this.page ++;
        },
        async load($state) {
            await this.groupbuyStore.searchGroupbuyList(this.page, this.categoryIdx, this.minPrice, this.maxPrice);
            const response = this.groupbuyStore.groupbuyList;
            if (response.length == 0) {
                $state.complete();
            }
            else {
                this.groupbuyList.push(...response)
                if (response.length == 20) {
                    this.page++;
                    $state.loaded()
                } else{
                    $state.complete();
                }
            }
        },
        refreshPage() {
            this.page = 0;
            this.isLoading = true;
            this.groupbuyList = [];
            this.$refs.InfiniteLoading.stateChanger.reset();
            this.searchGroupbuyList();
        }
    },
    computed: {
        ...mapStores(useGroupbuyStore) // 어떤 저장소랑 연결시켜 주겠다.
    },
    mounted() {
        this.categoryIdx = this.$route.query.categoryIdx;
        this.minPrice = this.$route.query.minPrice;
        this.maxPrice = this.$route.query.maxPrice;
        this.searchGroupbuyList();
    },
    watch: {
        "$route.query.categoryIdx"(newValue) {
            this.categoryIdx = newValue;
            this.refreshPage();
        }
    }
}

</script>

<style scoped>
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
</style>
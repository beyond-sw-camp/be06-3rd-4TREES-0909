<template>
    <div id="wrapper">
    <HeaderComponent></HeaderComponent>
    <div v-if="isLoading"></div>
    <OrderPageComponent v-else></OrderPageComponent>
    <FooterComponent></FooterComponent>
    </div>
</template>

<script>
import HeaderComponent from '@/components/User/HeaderComponent.vue';
import FooterComponent from '@/components/User/FooterComponent.vue';
import OrderPageComponent from '@/components/User/OrderPageComponent.vue';
import { useOrderStore } from '@/stores/useOrderStore';
import { mapStores } from 'pinia';
export default {
    name: "UserMainPage",
    data(){
        return {
            isLoading:true
        }
    },
    components: {
        HeaderComponent,
        OrderPageComponent,
        FooterComponent
    },
    methods: {
        async getOrderPageInfo() {
            await this.orderStore.getOrderPageInfo(this.$route.query.gpbuyIdx , this.$route.query.quantity, this.$route.query.bidIdx);
            this.isLoading = false;
        },
    },
    computed: {
        ...mapStores(useOrderStore) // 어떤 저장소랑 연결시켜 주겠다.
    },
    created() {
        this.getOrderPageInfo();
    }
}

</script>

<style scoped>

</style>
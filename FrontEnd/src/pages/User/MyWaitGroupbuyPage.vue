<template>
    <div id="wrapper">
    <HeaderComponent></HeaderComponent>
    <MyWaitGroupbuyListComponent></MyWaitGroupbuyListComponent>
    <FooterComponent></FooterComponent>
    </div>
</template>

<script>
import HeaderComponent from '@/components/User/HeaderComponent.vue';
import FooterComponent from '@/components/User/FooterComponent.vue';
import MyWaitGroupbuyListComponent from '@/components/User/MyWaitGroupbuyListComponent.vue';
export default {
    name: "UserMainPage",
    components: {
        HeaderComponent,
        MyWaitGroupbuyListComponent,
        FooterComponent
    },
}

</script>

<style scoped>

</style>
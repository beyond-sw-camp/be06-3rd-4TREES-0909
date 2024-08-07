<template>
    <div id="wrapper">
    <HeaderComponent></HeaderComponent>
    <GroupbuyRegisterComponent></GroupbuyRegisterComponent>
    <FooterComponent></FooterComponent>
    </div>
</template>

<script>
import HeaderComponent from '@/components/User/HeaderComponent.vue';
import FooterComponent from '@/components/User/FooterComponent.vue';
import GroupbuyRegisterComponent from '@/components/User/GroupbuyRegisterComponent.vue';
export default {
    name: "UserMainPage",
    components: {
        HeaderComponent,
        GroupbuyRegisterComponent,
        FooterComponent
    },
}

</script>

<style scoped>

</style>
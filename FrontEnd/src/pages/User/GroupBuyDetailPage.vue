<template>
    <div id="wrapper">
        <HeaderComponent></HeaderComponent>
        <GroupbuyDetailComponent></GroupbuyDetailComponent>
        <FooterComponent></FooterComponent>
    </div>


</template>

<script>
import HeaderComponent from '@/components/User/HeaderComponent.vue'
import FooterComponent from '@/components/User/FooterComponent.vue'
import GroupbuyDetailComponent from '@/components/User/GroupbuyDetailComponent.vue'


export default {
    name: "GroupBuyPage",
    components: {
        HeaderComponent,
        FooterComponent,
        GroupbuyDetailComponent
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>
</style>
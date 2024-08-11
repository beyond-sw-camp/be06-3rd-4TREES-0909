<template>
    <div id="wrapper">
    <HeaderComponent></HeaderComponent>
    <router-view></router-view>
    <FooterComponent></FooterComponent>
    </div>
</template>

<script>
import HeaderComponent from '@/components/User/HeaderComponent.vue';
import FooterComponent from '@/components/User/FooterComponent.vue';
export default {
    name: "UserPage",
    data(){
        return {
            isLoading:true
        }
    },
    components: {
        HeaderComponent,
        FooterComponent
    }
}

</script>

<style scoped>

</style>
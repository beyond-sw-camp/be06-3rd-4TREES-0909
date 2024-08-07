<template>
    <div id="wrapper">
    <HeaderComponent></HeaderComponent>
    <SearchResultComponent></SearchResultComponent>
    <FooterComponent></FooterComponent>
    </div>
</template>

<script>
import HeaderComponent from '@/components/User/HeaderComponent.vue';
import FooterComponent from '@/components/User/FooterComponent.vue';
import SearchResultComponent from '@/components/User/SearchResultComponent.vue';
export default {
    name: "UserMainPage",
    components: {
        HeaderComponent,
        SearchResultComponent,
        FooterComponent
    },
}

</script>

<style scoped>

</style>
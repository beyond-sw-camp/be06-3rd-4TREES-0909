<template>
    <div id="wrapper">
        <HeaderComponent></HeaderComponent>
        <ProductDetailComponent></ProductDetailComponent>
        <FooterComponent></FooterComponent>
    </div>


</template>

<script>
import HeaderComponent from '@/components/User/HeaderComponent.vue'
import FooterComponent from '@/components/User/FooterComponent.vue'
import ProductDetailComponent from '@/components/User/ProductDetailComponent.vue'


export default {
    name: "ProductDetailPage",
    components: {
        HeaderComponent,
        FooterComponent,
        ProductDetailComponent
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped></style>
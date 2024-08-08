<template>
    <div v-if="isLoading"></div>
</template>

<script>
import { useUserStore } from '@/stores/useUserStore';
import { mapStores } from 'pinia';
export default {
    data(){
        return {
            isLoading:true
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    mounted() {
        this.userStore.isLoggedIn=true;
        this.userStore.roles = ["ROLE_USER"];
        this.$router.push("/");
    }
}
</script>

<style scoped></style>
<template>
    <div class="footer">
        <div class="copyright">Copyright © InterparkTriple Corp. All rights reserved.</div>
    </div>
</template>

<script>
export default {
name: "FooterComponent",
data() {
    return { 
    }
},
methods: {

}
}
</script>

<style scoped>

.footer {
    height: 57px
}

.footer .copyright {
    text-align: center;
    padding: 20px 0;
    font-size: 11px;
    line-height: 17px;
    color: #999
}

@media screen and (min-width: 769px) {
    .footer {
        height:80px;
        background: #fafafa
    }

    .footer .copyright {
        padding: 0;
        line-height: 80px
    }
}
</style>
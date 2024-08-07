<template>
    <div class="header">
        <div class="headerInner">
            <router-link to="/" class="headerLogo">
                <span class="blind">0909</span>
            </router-link>
            <div class="headerTitle" v-if="headerTitle">{{ headerTitle }}</div>
        </div>
    </div>
</template>

<script>
export default {
name: "HeaderComponent",
props: ["headerTitle"]
}
</script>

<style scoped>
.blind {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    margin: -.1rem;
    width: .1rem;
    height: .1rem
}

.header {
    position: relative;
    height: 50px;
    padding-top: 5px;
    line-height: 44px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center
}

.header .headerInner {
    position: relative;
    width: 100%;
    height: 100%
}

.header .headerLogo {
    background: url('../../assets/images/Common/0909.png') 0 0 no-repeat;
    background-size: 100% auto;
    position: absolute;
    top: 12px;
    left: 20px;
    width: 119px;
    height: 50px
}

.header .headerTitle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 100%;
    font-size: 15px;
    padding: 0 150px;
    line-height: 50px
}

@media screen and (min-width: 769px) {
    .header {
        height:88px;
        padding-top: 0;
        line-height: 68px;
        border-bottom: 1px solid rgba(0,0,0,.08)
    }

    .header .headerInner {
        max-width: 1280px;
        margin: 0 auto
    }

    .header .headerLogo {
        background-position: 0 50%
    }

    .header .headerLogo,.header .headerLogo.blackLogo {
        position: absolute;
        top: auto;
        bottom: 20px;
        left: 24px;
        width: 151px;
        height: 38px
    }

    .header .headerLogo.blackLogo {
        background: url('../../assets/images/Common/0909.png') 0 0 no-repeat;
        background-size: 100% auto
    }

    .header .headerTitle {
        padding: 0 190px;
        line-height: 88px
    }
}

</style>
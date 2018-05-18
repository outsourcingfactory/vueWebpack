<template>
    <!--图片组件-->
    <div class="onePic">
        <img :src="imgSrc">
    </div>
</template>

<script>
    export default {
        props:{
            imgSrc: {
                type: String
            }
        },
    }
</script>

<style lang="scss" scoped>
    .onePic{
        width: 100%;
        height: 100%;
        img{
            width: 100%;
            height: auto;
            display: block;
        }
    }
</style>

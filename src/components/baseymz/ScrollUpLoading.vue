<template>
    <!--正在加载中-->
    <div class="meileOut">
        <div class="meile" :style="{color:color}">
            {{tipDesc}}
        </div>
        <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" v-show="showload"/>
    </div>
</template>

<script>
    export default {
        props:{
            tipDesc:{
                type:String,
                default:'正在加载...'
            },
            showload:{
                type:Boolean,
                default:true
            },
            color:{
                type:String,
                default:'#000'
            }
        }
    }
</script>

<style lang="scss">
    .meileOut{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        .meile{
            font-size: 13px;
            color: #000;
        }
        img{
            width: 15px;
            height: 15px;
            margin-left: 10px;
        }
    }
</style>

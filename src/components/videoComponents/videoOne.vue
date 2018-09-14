<template>
    <!--单个视频居中布局组件-->
    <div class="videoOne" @click="goVideo(videoOneData.videoid)">
        <div class="bgImage">
            <img :src="videoOneData.bgImage">
        </div>
        <img src="https://img.hongrenshuo.com.cn/h5/special-showVideo-ymz.png" class="showVideo">
    </div>
</template>

<script>
    import {na} from 'assets/js/common'
    export default {
        props:{
            videoOneData:{
                type:Object
            }
        },
        methods:{
            goVideo:function (videoid) {
                console.log(11111)
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://smallvideo?video_id=' + videoid;
                } else {
                    window.location.href = 'https://v.hongdoulive.com/v/video?videoId='+videoid;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .videoOne{
        width: 340px;
        margin: 0 auto;
        .bgImage{
            width: 100%;
        }
        position: relative;
        .showVideo{
            position: absolute;
            left: 50%;
            top:50%;
            width: 62px;
            height: 62px;
            margin-left: -31px;
            margin-top: -31px;
            z-index: 1000;
        }
    }
</style>

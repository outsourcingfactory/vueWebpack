<template>
    <!--三列视频布局组件-->
    <div class="threeColumVideo">
        <div class="three-image" v-for="item in videoAll.exampleVideoList" @click="goVideo(item.videoResp.idStr)">
            <div class="example">
                示例
            </div>
            <img v-lazy="`${item.videoResp.coverPic}&x-oss-process=image/resize,m_mfit,h_346,w_248,limit_0/crop,w_248,h_346,g_center`">
        </div>
        <div class="three-image" v-for="item in videoAll.showVideoList" @click="goVideo(item.videoDetailResp.videoResp.idStr)" v-show="!item.example">
            <img v-lazy="`${item.videoDetailResp.videoResp.coverPic}&x-oss-process=image/resize,m_mfit,h_346,w_248,limit_0/crop,w_248,h_346,g_center`">
            <div class="zan">
                 {{item.likeCount}}幸福值
            </div>
        </div>
    </div>
</template>

<script>
    import {na} from 'assets/js/common'
    export default {
        props:{
            videoAll:{
                type:Object
            }
        },
        methods:{
            goVideo:function (videoid) {
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
    .threeColumVideo{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        /*justify-content:space-between;*/
        .three-image{
            width: 124px;
            /*background: red;*/
            position: relative;
            height: 173px;
            margin-top: 2px;
            margin-left: 1px;
            overflow: hidden;
            .example{
                position: absolute;
                top:6px;
                left: 6px;
                width: 50px;
                height: 20px;
                border-radius: 3px;
                color: #365c97;
                font-weight: 400;
                text-align: center;
                line-height: 20px;
                background: #fff;
            }
            .zan{
                position: absolute;
                padding: 4px;
                box-sizing: border-box;
                color: #365c97;
                font-size: 12px;
                top: 10px;
                left: 10px;
                border-radius:3px;
                background-color: #fff;

            }
            &:nth-child(3n-2){
                margin-left: 0;
            }
            img{
                width: 100%;
                height: auto;
            }
        }

    }
</style>

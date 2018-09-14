<template>
    <div id="app">
        <div class="topimage">
            <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/special-topimage-ymz.png`"></Onepic>
        </div>
        <div class="tips">
            开学季来临之际，克拉从各个方面给大家准备好了开学速通攻略哦~不论是学习还是生活，看这里，提前开路！
        </div>
        <div class="manPc">
            <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/special-manPic-ymz.png`"></Onepic>
        </div>
        <div class="tips">
            首先要复习一下暑期老梗，开学迅速get同学们的话题：<span>真香</span>
        </div>
        <videoOne :videoOneData="{
            'bgImage':'https://img.hongrenshuo.com.cn/h5/special-pic1-ymz.png?t=1536287098856&x-oss-process=image/resize,m_mfit,h_202,w_340,limit_0/crop,w_340,h_202,g_center',
            'videoid':'1176649034522165324'
        }"></videoOne>
        <div class="tips">
            然后学习一下新梗，你就会成为同学中最腻害的新梗王：<span>燃烧我的卡路里&阿珍爱上了阿强</span>
        </div>
        <videoOne :videoOneData="{
            'bgImage':'http://img.hongrenshuo.com.cn/b8056267-3e32-458c-9df1-3fc52a724efd.jpg?t=1534834214240&x-oss-process=image/resize,m_mfit,h_202,w_340,limit_0/crop,w_340,h_202,g_center',
            'videoid':'1169452842587521079'
        }"></videoOne>
        <div class="tips"></div>
        <videoOne :videoOneData="{
            'bgImage':'http://img.hongrenshuo.com.cn/12a77ae2-3c7b-47e2-87d7-8b4d32e8cf83.jpg?t=1536118673209&x-oss-process=image/resize,m_mfit,h_202,w_340,limit_0/crop,w_340,h_202,g_center',
            'videoid':'1175939913946759240'
        }"></videoOne>
        <div class="tips">学习的内容都搞定啦！准备好久收拾一下暑期杂乱的房间，出发吧！</div>
        <videoOne :videoOneData="{
            'bgImage':'http://hrslive.hongrenshuo.com.cn/21525630198251535773136553.png?t=1535773152920&x-oss-process=image/resize,m_mfit,h_202,w_340,limit_0/crop,w_340,h_202,g_center',
            'videoid':'1174664708091805835'
        }"></videoOne>
        <div class="tips">
            最后，送上对开学小宝贝们的祝福！
        </div>
        <videoOne :videoOneData="{
            'bgImage':'https://img.hongrenshuo.com.cn/h5/special-pic2-ymz.png?t=1504173471000&x-oss-process=image/resize,m_mfit,h_202,w_340,limit_0/crop,w_340,h_202,g_center',
            'videoid':'1039406382530428945'
        }"></videoOne>
        <div class="tips">
            更多精彩，尽在KilaKila小视频哦~
        </div>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import videoOne from 'components/videoComponents/videoOne'
    import {ymzBaseFun, na} from 'assets/js/common'
    let shareTitle = '【克拉开学季】糟糕是新梗的感觉';
    let shareDesc = '开学季来临，快来学习成为最腻害的新梗王';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/special-wxshare-ymz.jpg';
    export default {
        created() {
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        components: {
            Onepic,
            videoOne
        }
    }
</script>

<style lang="scss" scoped>
    #app{
        background: #fefefd;
        img{
            width: 100%;
            height: auto;
        }
        .topimage{
            width: 100%;
            height: auto;
        }
        .manPc{
            width: 217px;
            height: 347px;
            margin: 0 auto;
        }
        .tips{
            padding: 15px;
            box-sizing: border-box;
            color: #000;
            font-weight: 400;
            font-size: 15px;
            line-height: 24px;
            span{
                color:#fb0303;
            }
        }
    }
</style>

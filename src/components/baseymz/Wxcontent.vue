<template>
    <div class="wxContent">
        <div class="right">
            <img src="https://img.hongrenshuo.com.cn/h5/novel-wxopen-ymz.png" alt="">
        </div>
        <div class="wxTitle">
            <p>如果您已安装最新版 KilaKila <span class="hd">(原红豆Live)</span></p>
            <p>点击右上角<span class="dian"></span><span class="dian"></span><span class="dian"></span></p>
            <p>选择在浏览器中打开</p>
        </div>
        <div class="wxLine">
            <div class="line"></div>
            <div class="why">还么有安装KilaKila</div>
            <div class="line"></div>
        </div>
        <div class="contentLogo">
            <div class="wxLogo">
                <img src="https://img.hongrenshuo.com.cn/h5/novel-wxLogo-ymz.png" alt="">
            </div>
            <div class="wxnickName">
                <img src="https://img.hongrenshuo.com.cn/h5/novel-wxTitle-ymz.png" alt="">
            </div>
            <div class="nowload" @click="normalDownload()">
                立即下载
            </div>
        </div>
    </div>
</template>

<script>
    import {ymzBaseFun} from 'assets/js/common'
    export default {
        methods:{
            normalDownload:function () {
                ymzBaseFun.downloadApp();
            }
        }
    }
</script>

<style lang="scss" scoped="">
    .wxContent {
        width: 375px;
        height: 667px;
        background: #fff;
        position: relative;
        .right {
            position: absolute;
            right: 8px;
            top: 8px;
            width: 85px;
            height: 77px;
            img {
                width: 100%;
                height: auto;
            }
        }
        .wxTitle {
            padding: 20px;
            box-sizing: border-box;
            color: #3F3131;
            font-size: 16px;
            line-height: 27px;
            z-index: 100;
            font-weight: 400;
            .hd {
                color: #9B9898;
                font-size: 14px;
            }
            .dian {
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: #3F3131;
                line-height: 27px;
                vertical-align: middle;
                margin-left: 5px;
                display: inline-block;
                &:nth-child(1) {
                    margin-left: 12.5px;
                }
            }
        }
        .wxLine {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 20px;
            color: #9B9898;
            margin: 60px 0;
            .line {
                width: 64px;
                height: 1PX;
                background: #9B9898;
            }
            .why {
                margin: 0 18px;
                font-size: 14px;
            }
        }
        .contentLogo {
            width: 100%;
            .wxLogo {
                width: 83px;
                height: 83px;
                margin: 0 auto;
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .wxnickName {
                width: 94px;
                height: 23px;
                margin: 13.5px auto;
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .nowload {
                width: 143px;
                height: 44px;
                border: 1px solid #FB5D51;
                box-sizing: border-box;
                line-height: 44px;
                text-align: center;
                color: #FB5D51;
                margin: 0 auto;
                font-size: 16px;
                border-radius: 22px;
            }
        }
    }
</style>

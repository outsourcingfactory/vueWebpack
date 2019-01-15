<template>
    <div class="wxContent">
        <div class="right">
            <img src="https://img.hongrenshuo.com.cn/h5/novel-wxopen-ymz.png" alt="">
        </div>
        <div class="wxTitle">
            <p>如果您已安装最新版 克拉克拉 <span class="hd">KilaKila</span></p>
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
        width: 100%;
        height: 100%;
        background: #fff;
        position: fixed;
        left: 0;
        top:0;
        z-index: 1000;
        .right {
            position: absolute;
            right: 16px;
            top: 16px;
            width: 170px;
            height: 154px;
            img {
                width: 100%;
                height: auto;
            }
        }
        .wxTitle {
            padding: 40px;
            box-sizing: border-box;
            color: #3F3131;
            font-size: 32px;
            line-height: 54px;
            z-index: 100;
            font-weight: 400;
            .hd {
                color: #9B9898;
                font-size: 28px;
            }
            .dian {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #3F3131;
                line-height: 54px;
                vertical-align: middle;
                margin-left: 10px;
                display: inline-block;
                &:nth-child(1) {
                    margin-left: 25px;
                }
            }
        }
        .wxLine {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            color: #9B9898;
            margin: 120px 0;
            .line {
                width: 128px;
                height: 1px;
                background: #9B9898;
            }
            .why {
                margin: 0 36px;
                font-size: 28px;
            }
        }
        .contentLogo {
            width: 100%;
            .wxLogo {
                width: 166px;
                height: 166px;
                margin: 0 auto;
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .wxnickName {
                width: 188px;
                height: 46px;
                margin: 27px auto;
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .nowload {
                width: 286px;
                height: 88px;
                border: 1px solid #FB5D51;
                box-sizing: border-box;
                line-height: 88px;
                text-align: center;
                color: #FB5D51;
                margin: 0 auto;
                font-size: 32px;
                border-radius: 44px;
            }
        }
    }
</style>

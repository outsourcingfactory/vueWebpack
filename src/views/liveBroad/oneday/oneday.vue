<template>
    <div id="app">
        <div class="topimageOut">
            <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/honey-topimage-ymz.png`"></Onepic>
        </div>
        <div class="videoOut">
            <img src="https://img.hongrenshuo.com.cn/h5/honey-videoPic-ymz.png" class="videoPic">
            <img src="https://img.hongrenshuo.com.cn/h5/honey-videoOut-ymz.png" class="videoOutPic">
        </div>
        <div class="tips">
            <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/honey-videoTips-ymz.png`"></Onepic>
        </div>
        <div class="zhuboContent">
            <div class="title1">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/honey-title1-ymz.png`"></Onepic>
            </div>
            <div class="slide-wrapper">
                <div class="slider" ref="slider">
                    <div class="slider-group">
                        <div class="slider-item">
                            <div class="slider-bg slider-top">
                                <div class="title">大咖名字</div>
                                <div class="desc">文案文案文案文案文案文案文案文案文案案文案文案文案文案文案文案文案文案文案文案</div>
                                <div class="audioOut">
                                    <img src="https://img.hongrenshuo.com.cn/h5/honey-audiostop-ymz.png" class="audioOn">
                                    <img src="https://img.hongrenshuo.com.cn/h5/honey-audioPic-ymz.png" class="audioGif">
                                </div>
                                <div class="goBo">
                                    开播预约
                                </div>
                            </div>
                            <div class="slider-bg slider-bottom">
                                <div class="title">大咖名字</div>
                                <div class="desc">文案文案文案文案文案文案文案文案文案案文案文案文案文案文案文案文案文案文案文案</div>
                                <div class="audioOut">
                                    <img src="https://img.hongrenshuo.com.cn/h5/honey-audiostop-ymz.png" class="audioOn">
                                    <img src="https://img.hongrenshuo.com.cn/h5/honey-audioPic-ymz.png" class="audioGif">
                                </div>
                                <div class="goBo">
                                    开播预约
                                </div>
                            </div>
                        </div>
                        <div class="slider-item">
                            <div class="slider-bg slider-top">
                                <div class="title">大咖名字</div>
                                <div class="desc">文案文案文案文案文案文案文案文案文案案文案文案文案文案文案文案文案文案文案文案</div>
                                <div class="audioOut">
                                    <img src="https://img.hongrenshuo.com.cn/h5/honey-audiostop-ymz.png" class="audioOn">
                                    <img src="https://img.hongrenshuo.com.cn/h5/honey-audioPic-ymz.png" class="audioGif">
                                </div>
                                <div class="goBo">
                                    开播预约
                                </div>
                            </div>
                            <div class="slider-bg slider-bottom">
                                <div class="title">大咖名字</div>
                                <div class="desc">文案文案文案文案文案文案文案文案文案案文案文案文案文案文案文案文案文案文案文案</div>
                                <div class="audioOut">
                                    <img src="https://img.hongrenshuo.com.cn/h5/honey-audiostop-ymz.png" class="audioOn">
                                    <img src="https://img.hongrenshuo.com.cn/h5/honey-audioPic-ymz.png" class="audioGif">
                                </div>
                                <div class="goBo">
                                    开播预约
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dots">
                <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
            </div>
        </div>
        <div class="cardContent">
            <div class="title2">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/honey-title2-ymz.png`"></Onepic>
            </div>
            <div class="slide-wrapper1">
                <div class="slider1">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                dots:[],
                currentPageIndex:0,
                autoPlay:true,
                interval: 2000
            }
        },
        mounted(){
//            加载完dom节点再加载better-scroll
            setTimeout(()=>{
//                this._setSliderWidth()
                this._initDots()
                this._initSlider()
                if (this.autoPlay) {
                    this._play()
                }
            },20)
        },
        activated() {
            if (this.autoPlay) {
                this._play()
            }
        },
        deactivated() {
            clearTimeout(this.timer)
        },
        beforeDestroy() {
            clearTimeout(this.timer)
        },
        methods:{
            //            初始化slide
            _initSlider(){
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false, //惯性
                    snap: {
                        loop:true
                    },
                    snapLoop: this.loop, //循环
                    snapThreshold: 0.3,
                    snapSpeed: 400,
                })
                this.slider.on('scrollEnd', () => {
                    let pageIndex = this.slider.getCurrentPage().pageX
                    this.currentPageIndex = pageIndex
                    if (this.autoPlay) {
                        this._play()
                    }
                })
                this.slider.on('beforeScrollStart', () => {
                    if (this.autoPlay) {
                        clearTimeout(this.timer)
                    }
                })
            },
            //            自动播放
            _play(){
                let pageIndex = this.currentPageIndex + 1;
                this.timer = setTimeout(() => {
//                    this.slider.goToPage(pageIndex, 0, 400)
                    this.slider.next(400)
                }, this.interval)
            },
            //            初始化dots
            _initDots(){
                this.dots = new Array(2)
            },
        },
        components: {
            Onepic
        },
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        height: 1878px;
        background: url("https://img.hongrenshuo.com.cn/h5/honey-bgImage-ymz.png") no-repeat center;
        background-size: 100% 100%;
        .topimageOut {
            width: 100%;
            height: 512px;
            padding-top: 15px;
        }
        .videoOut{
            width: 362.5px;
            height: 213.5px;
            margin: -94px auto 0;
            position: relative;
            .videoPic{
                position: absolute;
                width: 330px;
                height: 179px;
                left: 50%;
                top:50%;
                transform: translate(-50%,-50%);
                /*z-index: 100;*/
            }
            .videoOutPic{
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top:0;
                z-index: 100;
            }
        }
        .tips{
            width: 316px;
            height: 45px;
            margin: 0 auto;
        }
        .zhuboContent{
            .title1{
                width: 235px;
                height:53px;
                margin: 30px 0 15px 18px;
            }
            .slide-wrapper{
                position: relative;
                width: 100%;
                overflow: hidden;
                .slider{
                    min-height: 1px;
                    .slider-group{
                        width: 400%;
                        position: relative;
                        overflow: hidden;
                        /*white-space: nowrap;*/
                        .slider-item{
                            width: 375px;
                            float: left;
                            box-sizing: border-box;
                            overflow: hidden;
                            /*text-align: center;*/
                            .slider-bg{
                                width: 359px;
                                height: 186px;
                                margin: 0 auto;
                                position: relative;
                                .title{
                                    font-size: 15px;
                                    color: rgb(14, 105, 110);
                                    position: absolute;
                                    text-align: center;
                                    width: 120px;

                                    font-weight: 500;
                                }
                                .desc{
                                    width: 200px;
                                    font-size: 15px;
                                    line-height: 20px;
                                    color: rgb(67, 67, 67);
                                    position: absolute;
                                    word-break: break-all;
                                    flex-wrap: wrap;

                                }
                                .goBo{
                                    width: 106px;
                                    height: 39px;
                                    background: url("https://img.hongrenshuo.com.cn/h5/honey-goBoActive-ymz.png") no-repeat center;
                                    background-size: 100% 100%;
                                    position: absolute;
                                    text-align: center;
                                    line-height: 39px;
                                    font-size: 15px;
                                    font-weight: 700;
                                    color: #fd8e9b;
                                }
                                .audioOut{
                                    width: 96px;
                                    height: 26px;
                                    background: url("https://img.hongrenshuo.com.cn/h5/honey-audioOut-ymz.png") no-repeat center;
                                    background-size: 100% 100%;
                                    position: absolute;

                                    display: flex;
                                    align-items: center;
                                    .audioOn{
                                        width: 13px;
                                        height: 14px;
                                        margin-left: 8px;
                                        margin-right: 6px;
                                        /*margin: 0 6px;*/
                                    }
                                    .audioGif{
                                        width: 63px;
                                        height: 14px;
                                    }
                                }
                            }
                            .slider-top{
                                background: url("https://img.hongrenshuo.com.cn/h5/honey-man1-ymz.png") no-repeat center;
                                background-size: 100% 100%;
                                .title{
                                    right: 35px;
                                    top: 42px;
                                }
                                .desc{
                                    left: 142px;
                                    top: 70px;
                                }
                                .goBo{
                                    right: 14px;
                                    bottom: 14px;
                                }
                                .audioOut{
                                    left: 54px;
                                    bottom: 14px;
                                }
                            }
                            .slider-bottom{
                                background: url("https://img.hongrenshuo.com.cn/h5/honey-man2-ymz.png") no-repeat center;
                                background-size: 100% 100%;
                                .title{
                                    left: 35px;
                                    top: 42px;
                                }
                                .desc{
                                    right: 142px;
                                    top: 70px;
                                }
                                .goBo{
                                    left: 28px;
                                    bottom: 14px;
                                }
                                .audioOut{
                                    right: 54px;
                                    bottom: 14px;
                                }
                            }
                        }
                    }

                }
            }
            .dots{
                margin-top: 25px;
                text-align: center;
                font-size: 0;
                .dot{
                    display: inline-block;
                    margin: 0 4px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #91c4e7;
                    &.active{
                        background: #f6fffd;
                    }
                }
            }
        }
        .cardContent{
            width: 100%;
            .title2{
                width: 243px;
                height:65px;
                margin: 50px 0 20px 18px;
            }
        }
    }
</style>

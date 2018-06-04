<template>
    <div id="app">
        <div v-show="!showWx">
            <div class="topimage">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/stardog-topimage-ymz.png`"></Onepic>
                <div class="gotoRule" @click="goRule()"></div>
            </div>
            <div class="videoCon" @click="goVideo()">
                <Onepic :imgSrc="`http://hrslive.hongrenshuo.com.cn/20125834977771527778160870.png?t=1527778216683&x-oss-process=image/resize,m_mfit,h_195,w_350,limit_0/crop,w_350,h_195,g_center`"></Onepic>
                <div class="showvideo">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/starcp3-showVideo-ymz.png`"></Onepic>
                </div>
            </div>
            <div class="content">
                <div class="tab">
                    <div @click="tabSwitch(0)" :class="tab_1_class" class="tabdiv">
                        最热
                    </div>
                    <div @click="tabSwitch(1)" :class="tab_2_class" class="tabdiv">
                        最新
                    </div>
                    <i :class="{iActive:iActive}"></i>
                    <div class="tabImageLeft">
                        <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/stardog-tableft-ymz.png`"></Onepic>
                    </div>
                    <div class="tabImageRight">
                        <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/stardog-tabright-ymz.png`"></Onepic>
                    </div>
                </div>
                <div class="descTip">
                    参赛视频上传后，需等待5-10分钟同步至活动页哦！
                </div>
                <div class="video-out">
                    <threeColumVideo :videoAll="videoAll"></threeColumVideo>
                </div>
                <div>
                    <ScrollUpLoading :tipDesc="tipDesc" :showload="showload" :color="'#ffffff'"></ScrollUpLoading>
                </div>
                <div class="tipsAl">
                    本活动最终解释权归KilaKila所有
                </div>
                <div class="starleft">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/stardog-Starleft-ymz.png`"></Onepic>
                </div>
                <div class="starright">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/stardog-starright-ymz.png`"></Onepic>
                </div>
            </div>
            <div class="bottomBtn" @click="goCreateVideo()">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/stardog-btnBottom-ymz.png`"></Onepic>
            </div>
            <confirmUxin v-show="showConfirm" ref="confirmUxin" :downString="downString" :leftString="leftString"
                         :rightString="rightString" :callback="callBackToUxin"></confirmUxin>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import threeColumVideo from 'components/businessYmz/threeColumVideo'
    import ScrollUpLoading from 'components/baseymz/ScrollUpLoading'
    import confirmUxin from 'components/baseymz/confirmUxin'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Toast from 'assets/js/toast'

    let shareTitle = '对不起 我是个追星狗';
    let shareDesc = '发视频秀周边，pick粉丝认证新玩法！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/stardog-wxshare-ymz.png';
    export default {
        data() {
            return {
                page:1,
                type: 1,//1 最热 0 最新
                v:2,
                tagid:'37877,11920',
                videoAll: {
                    showVideoList: []
                },
                showload: true,
                algoBottom: false,
                tipDesc: '正在加载...',
                showConfirm: false,
                downString: '请升级KilaKila到最新版本',
                leftString: '取消',
                rightString: '下载',
                callBackToUxin: function () {
                    window.location.href = "https://download.hongrenshuo.com.cn/apk/YXLive_publish_H5GG_sign.apk";
                },
                showWx: false,
                tab_1_class: 'tab__on',
                tab_2_class: '',
                iActive: false,
            }
        },
        created() {
            this._getVideoList();
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            window.addEventListener('scroll', this._getBottom, false);
        },
        methods: {
            tabSwitch: function (pos) {
                this.showload = true;
                this.tipDesc = '上滑加载更多...';
                this.algoBottom = false;
                this.page = 1;
                this.videoAll.showVideoList = [];
                this.videoAll.exampleVideoList = [];
                if (pos == 0) {
                    this.iActive = false;
                    this.tab_1_class = "tab__on";
                    this.tab_2_class = "";
                    this.type = 1;
                } else {
                    this.iActive = true;
                    this.tab_2_class = "tab__on";
                    this.tab_1_class = "";
                    this.type = 0;
                }
                this._getVideoList();
            },
            goVideo:function(){
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://smallvideo?video_id=1140326736618061972';
                } else {
                    window.location.href = 'https://v.hongdoulive.com/v/video?videoId=1140326736618061972';
                }
            },
            _getBottom() {
                if (ymzBaseFun.aleadyBottom() && this.algoBottom) {
                    this.page++;
                    this.tipDesc = '上滑加载更多...';
                    this.showload = true;
                    this._getVideoList();
                }
            },
//            获取视频列表
            _getVideoList: function () {
                this.$axios.HttpGet('/Tg/gdk',{page:this.page,type:this.type,v:this.v,tagid:this.tagid})
                    .then((res) => {
                        if (res.data.code === 200) {
                            if (res.data.data.length < 20) {
                                this.$nextTick(function () {
                                    this.showload = false;
                                    this.tipDesc = '没有更多...';
                                });
                            }
                            this.algoBottom = true;
                            this.videoAll.showVideoList = this.videoAll.showVideoList.concat(res.data.data);
                            console.log(this.videoAll.showVideoList);
                        } else {
                            Toast({
                                message: res.data.msg,
                                position: 'center',
                                duration: 1500
                            })
                        }
                    })
                    .catch((res) => {
//                        等待封装toast
                        Toast({
                            message: res,
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
            goRule: function () {
                window.location.href = '/Rule/stardogrule.html';
            },
            goCreateVideo: function () {
                if (na.match(/hongdoulive/i)) {
                    if (na.match(/(iphone|ipod|ios|ipad)/i)) {
                        if (ymzBaseFun.getVcString('vc') > 88) {
                            window.location.href = 'uxinlive://selectmaterial';
                        } else {
                            this.downString = '前往App Store升级最新版App吧~ '
                            this.rightString = '';
                            this.leftString = '知道啦';
                            this.callBackToUxin = function () {
                            };
                            this.changePage();
                        }
                    } else {
                        if (ymzBaseFun.getVcString('vc') > 104) {
                            window.location.href = 'uxinlive://selectmaterial';
                        } else {
                            this.downString = '升级最新版App来参与吧~'
                            this.rightString = '去升级';
                            this.leftString = '取消';
                            this.changePage();
                        }
                    }
                } else {
                    if (na.match(/micromessenger/i) && na.match(/(iphone|ipod|ios|ipad)/i)) {
                        this.showWx = true;
                    } else {
                        var data = {};
                        data.stage = 'fiftystory'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
                        data.ios_custom_url = "https://itunes.apple.com/cn/app/hong-doulive/id1137896285?mt=8"; // 自定义iOS平台下App的下载地址，如果是AppStore的下载地址可以不用填写，【可选】
                        data.ios_direct_open = "true"; //未安装情况下，设置为true为直接打开ios_custom_url，默认为false【可选】
                        data.type = 'test';  //表示现在使用线上模式,如果填写"test", 表示测试模式.【可选】
                        data.params = '{"scheme_url":"' + 'uxinlive://home?subtab=main_video' + '"}'; //注意单引号和双引号的位置
                        linkedme.link(data, function (err, response) {
                            if (err) {
                                ymzBaseFun.downloadApp();
                            } else {
                                linkedme.trigger_deeplink(response.url);
                                window.location.href = response.url;
                            }
                        }, false);
                    }
                }
            },
            changePage() {
                this.$refs.confirmUxin.$emit('tiggle');
            },
        },
        components: {
            Onepic,
            threeColumVideo,
            ScrollUpLoading,
            confirmUxin,
            Wxcontent
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        padding-bottom: 85px;
        background: #0f0013;
        .topimage {
            width: 100%;
            height: auto;
            position: relative;
            .gotoRule {
                position: absolute;
                width: 70px;
                height: 70px;
                bottom: 127px;
                right: 10px;
            }
        }
        .videoCon{
            width: 350px;
            height: 195px;
            position: relative;
            margin: 0 auto 13px;
            border: 1px solid #fff;
            box-sizing: border-box;
            .showvideo{
                position: absolute;
                left: 50%;
                top:50%;
                width: 50px;
                height: 50px;
                margin-left: -25px;
                margin-top: -25px;
            }
        }
        .content {
            position: relative;
            width: 100%;
            .tab{
                width: 100%;
                height: 66px;
                font-size: 16px;
                color: #ffffd4;
                position: relative;
                overflow: hidden;
                border-bottom: 1px solid #b58c14;
                .tabImageLeft{
                    position: absolute;
                    top:0;
                    left:0;
                    width: 61px;
                    height: 60px;
                }
                .tabImageRight{
                    position: absolute;
                    top:0;
                    right:0;
                    width: 12px;
                    height: 22px;
                    z-index: 400;
                }
                .tabdiv{
                    float: left;
                    text-align: center;
                    width: 50%;
                    height: 75px;
                    line-height: 75px;
                    font-weight: 500;
                }
                .tab__on{
                    color: #b58c14;
                }
                i {
                    position: absolute;
                    left: 0;
                    bottom: 5px;
                    width: 50%;
                    transition-duration:0.5s;
                    transform:translate3d(0px,0px,0px);
                }
                i:before {
                    content: '';
                    display: block;
                    height: 5px;
                    width: 34px;
                    margin: 0 auto;
                    background: #b58c14;
                }
                .iActive{
                    transform:translate3d(187.5px,0px,0px);
                }
            }
            .descTip {
                font-size: 12px;
                width: 100%;
                height: 45px;
                color: #b58c14;
                line-height: 45px;
                text-align: center;
                box-sizing: border-box;
            }
            .tipsAl {
                width: 100%;
                text-align: center;
                height: 25px;
                line-height: 25px;
                font-size: 12px;
                color: #b58c14;
                border-top: 1px solid #b58c14;
            }
            .starleft{
                width: 26px;
                height: 37px;
                position: absolute;
                left: 22px;
                bottom:-40px;
            }
            .starright{
                width: 25px;
                height: 46px;
                position: absolute;
                right: 0;
                bottom:-45px;
            }
        }
        .bottomBtn {
            width: 262px;
            height: 50px;
            position: fixed;
            bottom: 20px;
            left: 56.5px;
            z-index: 100;
        }
    }
</style>

<template>
    <div id="app">
        <div class="itemcontent" v-show="!showWx">
            <div>
                <div class="topimage">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/lolita-image_01.png`"></Onepic>
                    <div class="gotoRule" @click="goRule()"></div>
                </div>
                <div class="topimage">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/lolita-image_02.png`"></Onepic>
                </div>
                <div class="topimage">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/lolita-image_03.png`"></Onepic>
                </div>
                <div class="topimage">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/lolita-image_04.png`"></Onepic>
                </div>
                <div class="content">
                    <div class="title">
                        <div @click="tabSwitch(0)" :class="leftActive?'hot activeTab':'hot'">热度
                            <div class="san" v-show="leftActive"></div>
                        </div>
                        <div @click="tabSwitch(1)" :class="rightActive?'time activeTab':'time'">最新
                            <div class="san" v-show="rightActive"></div>
                        </div>
                    </div>
                    <div class="descTip">
                        带#15秒安利最爱LO装#标签发布，5-10分钟出现至活动页
                    </div>
                    <div class="video-out">
                        <threeColumVideo :videoAll="videoAll"></threeColumVideo>
                    </div>
                    <div>
                        <ScrollUpLoading :tipDesc="tipDesc" :showload="showload"></ScrollUpLoading>
                    </div>
                    <div class="tipsAl">
                        本活动最终解释权归KilaKila所有
                    </div>
                </div>
                <div class="bottomBtn" @click="goCreateVideo()">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/lolita-bottom-btn.png`"></Onepic>
                </div>
                <confirmUxin v-show="showConfirm" ref="confirmUxin" :downString="downString" :leftString="leftString"
                             :rightString="rightString" :callback="callBackToUxin"></confirmUxin>
            </div>
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

    let shareTitle = '15秒安利我最喜欢的Lolita服饰';
    let shareDesc = '拍摄15秒短视频，展示出对它的喜欢吧~';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/lolita-share.jpg';
    export default {
        data() {
            return {
                leftActive: true,
                rightActive: false,
                exampleVideo: ['1139493676171395112','1139495067740799038','1139498533779406900','1139508493808566327','1139515726533492799','1139522997913124934','1139808230986219556','1139813509501026354'],
//                exampleVideo: ['1131668125498998870', '1132675218020499508'],
                videoAll: {
                    exampleVideoList: [],
                    showVideoList: []
                },
                tagId: 37974,
                type: 0,//0 最热 1 最新
                categoryType: 2,
                page: 1,
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
            }
        },
        created() {
            this._getExampleVideoList();
            this._getVideoList();
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            window.addEventListener('scroll', this._getBottom, false);
        },
        methods: {
            tabSwitch(pos) {
                this.showload = true;
                this.tipDesc = '上滑加载更多...';
                this.algoBottom = false;
                this.page = 1;
                this.videoAll.showVideoList = [];
                this.videoAll.exampleVideoList = [];
                if (pos == 0) {
                    this.leftActive = true;
                    this.rightActive = false;
                    this.type = 0;
                    this._getExampleVideoList();
                    this._getVideoList();
                } else {
                    this.leftActive = false;
                    this.rightActive = true;
                    this.type = 1;
                    this._getVideoList();
                }
            },
            _getBottom() {
                if (ymzBaseFun.aleadyBottom() && !this.algoBottom) {
                    this.page++;
                    this.tipDesc = '上滑加载更多...';
                    this.showload = true;
                    this._getVideoList();
                }
            },
//            获取示例视频
            _getExampleVideoList: function () {
                this.$axios.HttpGet('/v/videos', {videoIds: this.exampleVideo.join()})
                    .then((res) => {
                        if (res.data.data.length > 0) {
                            this.videoAll.exampleVideoList = res.data.data;
                        } else {
                            //等待封装toast

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
//            获取视频列表
            _getVideoList: function () {
                this.$axios.HttpGet('/tg/tagList', {
                    tagId: this.tagId,
                    type: this.type,
                    categoryType: this.categoryType,
                    pageNo: this.page
                })
                    .then((res) => {
                        if (res.data.code === 200) {
//                            给示范视频打标记
                            if (this.leftActive) {
                                for (let i = 0; i < res.data.data.length; i++) {
                                    for (let j = 0; j < this.exampleVideo.length; j++) {
                                        if (res.data.data[i].videoDetailResp.videoResp.idStr == this.exampleVideo[j]) {
                                            res.data.data[i].example = true;
                                        }
                                    }
                                }
                            }
                            if (res.data.data.length < 20) {
                                this.algoBottom = true;
                                this.$nextTick(function () {
                                    this.showload = false;
                                    this.tipDesc = '没有更多...';
                                });
                            }
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
                window.location.href = '/Rule/lolitarule.html';
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

        background: #eff6fc;
        .itemcontent{
            padding-bottom: 80px;
        }
        .topimage {
            width: 100%;
            height: auto;
            position: relative;
            .gotoRule {
                position: absolute;
                width: 70px;
                height: 70px;
                top: 10px;
                right: 50px;
            }
        }
        .content {
            border-top: 1px solid #9fb4ee;
            /*border-bottom: 1px solid #9fb4ee;*/
            background: #eff6fc;
            width: 100%;
            .title {
                width: 100%;
                box-sizing: border-box;
                margin: 0 auto;
                display: flex;
                .hot, .time {
                    width: 64px;
                    height: 35px;
                    font-size: 13px;
                    color: #2c3c6b;
                    text-align: center;
                    line-height: 35px;
                    margin-right: 1px;
                    background: #9fb4ee;
                    position: relative;
                    font-weight: 700;
                    .san {
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-left: 4px solid transparent;
                        border-right: 4px solid transparent;
                        border-top: 4px solid #6b85cd;
                        left: 50%;
                        margin-left: -4px;
                        margin-top: -1px;
                    }
                }
                .activeTab {
                    background: #6b85cd;
                    color: #fff;
                }
            }
            .descTip {
                font-size: 12px;
                width: 100%;
                height: 45px;
                color: #6b85cd;
                line-height: 45px;
                padding-left: 13px;
                box-sizing: border-box;
            }
            .tipsAl {
                width: 100%;
                text-align: center;
                height: 25px;
                line-height: 25px;
                font-size: 12px;
                color: #adbde4;
            }
        }
        .bottomBtn {
            width: 351px;
            height: 50px;
            position: fixed;
            bottom: 20px;
            left: 12px;
        }
    }
</style>

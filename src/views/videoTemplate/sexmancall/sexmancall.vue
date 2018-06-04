<template>
    <div id="app">
        <div v-show="!showWx">
            <div class="top">
                <div class="topimage" :style="bgTopImage"></div>
                <div class="desc">
                    <div class="title">
                        野男人晒卡！
                    </div>
                    <!--<div class="subTitle">-->
                        <!--@KilaKila有读君 发起-->
                    <!--</div>-->
                    <div class="descContent">
                        各位夫人们，老公的卡get了多少重复了多少呢？来晒晒你都有什么卡吧~ 虽然不全，但却仍是独属于我专属羁绊。顺便来活动区看看传说中的四大小天王吧~发布视频带#野男人晒卡#标签，截止6.3，随机抽5个欧洲人或非洲人，送“集卡辛苦了”恋与周边礼包~
                    </div>
                </div>
            </div>
            <div class="tab">
                <div @click="tabSwitch(0)" :class="tab_1_class">
                    最热
                </div>
                <div @click="tabSwitch(1)" :class="tab_2_class">
                    最新
                </div>
                <i :class="{iActive:iActive}"></i>
            </div>
            <div class="content">
                <threeColumVideo :videoAll="videoAll"></threeColumVideo>
            </div>
            <div>
                <ScrollUpLoading :tipDesc="tipDesc" :showload="showload"></ScrollUpLoading>
            </div>
            <div class="bottomOut" @click="goCreateVideo()">
                <div class="bottom">
                    我要参加
                </div>
            </div>
            <confirmUxin v-show="showConfirm" ref="confirmUxin" :downString="downString" :leftString="leftString"
                         :rightString="rightString" :callback="callBackToUxin"></confirmUxin>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import threeColumVideo from 'components/businessYmz/threeColumVideo'
    import ScrollUpLoading from 'components/baseymz/ScrollUpLoading'
    import confirmUxin from 'components/baseymz/confirmUxin'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Toast from 'assets/js/toast'
    var shareTitle = '恋与野男人晒卡召集！赢周边礼包！';
    var shareDesc = '来看看别家太太，最欧有多欧？最非有多非？';
    var shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/sexmancall-wxshare-ymz.png';
    export default {
        data() {
            return {
                tab_1_class: 'tab__on',
                tab_2_class: '',
                iActive: false,
                bgTopImage:{
                    backgroundImage: "url(" + ("https://img.hongrenshuo.com.cn/h5/sexmancall-bgImage-ymz.png?x-oss-process=image/resize,m_mfit,h_211,w_375,limit_0/crop,w_375,h_211,g_center") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                },
                videoAll: {
                    exampleVideoList: [],
                    showVideoList: []
                },
                exampleVideo: ['1137638031256190996', '1137615190620110862'],
                tagId: 35679,
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
                leftActive:true,
            }
        },
        created() {
            this._getExampleVideoList();
            this._getVideoList();
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            window.addEventListener('scroll', this._getBottom, false);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        methods:{
            _getBottom() {
                if (ymzBaseFun.aleadyBottom() && this.algoBottom) {
                    this.page++;
                    this.tipDesc = '上滑加载更多...';
                    this.showload = true;
                    this._getVideoList();
                }
            },
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
                    this.type = 0;
                    this._getExampleVideoList();
                    this._getVideoList();
                } else {
                    this.iActive = true;
                    this.tab_2_class = "tab__on";
                    this.tab_1_class = "";
                    this.type = 1;
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
                            message: typeof res,
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
                            if (!this.iActive) {
                                for (let i = 0; i < res.data.data.length; i++) {
                                    for (let j = 0; j < this.exampleVideo.length; j++) {
                                        if (res.data.data[i].videoDetailResp.videoResp.idStr == this.exampleVideo[j]) {
                                            res.data.data[i].example = true;
                                        }
                                    }
                                }
                            }
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
                            message: typeof res,
                            position: 'center',
                            duration: 1500
                        })
                    })
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
            threeColumVideo,
            ScrollUpLoading,
            confirmUxin,
            Wxcontent
        }
    }
</script>

<style lang="scss" scoped="">
    #app {
        padding-bottom: 48px;
        .top {
            width: 100%;
            position: relative;
            overflow: hidden;
            .topimage {
                width: 100%;
                height: 211px;
            }
            .desc {
                position: absolute;
                width: 100%;
                height: 100%;
                color: #FFFFFF;
                padding: 25px 10px 0;
                box-sizing: border-box;
                left: 0;
                top: 0;
                text-align: center;
                background: rgba(0, 0, 0, 0.6);
                .title {
                    height: 28px;
                    font-weight: 500;
                    font-size: 20px;
                    line-height: 28px;
                }
                .subTitle {
                    line-height: 24px;
                    font-size: 14px;
                }
                .descContent {
                    padding-top: 10px;
                    line-height: 20px;
                    font-size: 14px;
                    text-align: left;
                }
            }
        }
        .tab{
            width: 100%;
            height: 44px;
            font-size: 16px;
            color: #2B2727;
            position: relative;
            overflow: hidden;
            border-bottom: 1px solid #EDEDED;
            div{
                float: left;
                text-align: center;
                width: 50%;
                height: 44px;
                line-height: 44px;
            }
            .tab__on{
                color: #FC5D52;
            }
            i {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 50%;
                transition-duration:0.5s;
                transform:translate3d(0px,0px,0px);
            }
            i:before {
                content: '';
                display: block;
                height: 3px;
                width: 32px;
                border-radius: 6px;
                margin: 0 auto;
                background: #FC5D52;
            }
            .iActive{
                transform:translate3d(187.5px,0px,0px);
            }
        }
        .bottomOut {
            width: 100%;
            height: 44px;
            position: fixed;
            bottom: 0;
            background: #fff;
            .bottom {
                color: #fff;
                text-align: center;
                line-height: 44px;
                background: #FC5D52;
                width: 100%;
                height: 44px;
                position: absolute;
                top: 0;
                left: 0;
                font-size: 16px;
            }
        }
    }
</style>

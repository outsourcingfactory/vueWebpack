<template>
    <div id="app">
        <div class="itemcontent" v-show="!showWx">
            <div>
                <div class="topimage">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/heartbeat-images_01.png`"></Onepic>
                    <div class="gotoRule" @click="goRule()"></div>
                </div>
                <div class="kolcontent">
                    <div class="kolwraper">
                        <div class="kolheader" @click="gotouser('2184105570365')">
                            <img src="http://img.hongrenshuo.com.cn/2184105570365.png?t=1529425180000&x-oss-process=image/resize,m_mfit,h_160,w_160,limit_0/crop,w_160,h_160,g_center">
                        </div>
                        <div class="kolname">
                            小鬼王琳凯数据Boom
                        </div>
                    </div>
                    <div class="kolwraper kolwraperright">
                        <div class="kolheader" @click="gotouser('2054440947749')">
                            <img src="http://img.hongrenshuo.com.cn/2054440947749.png?t=1529425180000&x-oss-process=image/resize,m_mfit,h_160,w_160,limit_0/crop,w_160,h_160,g_center">
                        </div>
                        <div class="kolname">
                            华晨宇二次元火星发报站
                        </div>
                    </div>
                </div>
                <div class="topimage" style="margin-top:-1px">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/heartbeat-images_02.png`"></Onepic>
                    <div class="videoclick" @click="gotovideo('1147293366845702159')"></div>
                    <div class="videoclick videoclick1" @click="gotovideo('1147296364732874783')"></div>
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
                        上传参与活动的作品后，需要一定时间搬运至活动页面
                    </div>
                    <div class="video-out">
                        <threeColumVideo :videoAll="videoAll"></threeColumVideo>
                    </div>
                    <div>
                        <ScrollUpLoading :tipDesc="tipDesc" :showload="showload" :color="color"></ScrollUpLoading>
                    </div>
                    <div class="tipsAl">
                        本活动最终解释权归KilaKila所有
                    </div>
                </div>
                <div class="bottomBtn" @click="goCreateVideo()">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/heartbeat-bottom-btn.png`"></Onepic>
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

    let shareTitle = '糟糕！是心动的感觉！';
    let shareDesc = '让你心动的爱豆就在这里，速来发视频，赢取现金奖励！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/heartbeat-share.jpg';
    export default {
        data() {
            return {
                leftActive: true,
                rightActive: false,
                exampleVideo: ['1147293366845702159','1147296364732874783'],
//                exampleVideo: ['1131668125498998870', '1132675218020499508'],
                videoAll: {
                    exampleVideoList: [],
                    showVideoList: []
                },
                tagid: 44330,
                type: 1,//1 最热 0最新
                categoryType: 2,
                page: 1,
                v:2,
                showload: true,
                algoBottom: false,
                tipDesc: '正在加载...',
                color:'#a4a0ea',
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
                    this.type = 1;
                    this._getExampleVideoList();
                    this._getVideoList();
                } else {
                    this.leftActive = false;
                    this.rightActive = true;
                    this.type = 0;
                    this._getVideoList();
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
                this.$axios.HttpGet('/Tg/gdk',{page:this.page,type:this.type,v:this.v,tagid:this.tagid})
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
                            this.algoBottom = true;
                            if (res.data.data.length < 10) {
                                this.algoBottom = false;
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
                window.location.href = '/Rule/heartbeat-rule.html';
            },
            gotouser: function (uid) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://userinfo?uid='+uid;
                } else {
                    window.location.href = 'https://live.hongdoulive.com/index/roomuser/uid/'+uid;
                }
            },
            gotovideo: function (videoid) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://smallvideo?video_id=' + videoid;
                } else {
                    window.location.href = 'https://v.hongdoulive.com/v/video?videoId='+videoid;
                }
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
                        data.stage = 'killwolf'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
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

        background: url("https://img.hongrenshuo.com.cn/h5/heartbeat-bg.png");
        background-repeat: repeat-y;
        background-size: 100% auto;
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
                bottom: 45px;
                right: 30px;
            }
            .videoclick{
                width:260px;
                height:110px;
                position: absolute;
                left:5px;
                top:85px;
            }
            .videoclick1{
                top:200px;
            }
        }
        .kolcontent{
            width:100%;
            height:160px;
            background: url("https://img.hongrenshuo.com.cn/h5/heartbeat-images_03.png") no-repeat;
            background-size: 100% 100%;
            margin-top:-1px;
            display: flex;
            .kolwraper{
                flex: 1;
                padding-left: 20px;
                box-sizing: border-box;
                display: flex;
                justify-content:center;
                align-items: center;
                flex-wrap: wrap;
                .kolheader{
                    width:105px;
                    height:105px;
                    background: #6b9040;
                    box-shadow:0 0 10px 10px #fff;
                    border-radius: 50%;
                    img{
                        width:100%;
                        height:100%;
                        border-radius: 50%;
                    }
                }
            }
            .kolwraperright{
                padding-left: 0px;
                padding-right: 20px;
            }
            .kolname{
                width:100%;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 13px;
                color:#6d76ff;
                margin-top:0px;
                line-height: 18px;
            }
        }
        .content {
            border-top: 1px solid #30249e;
            border-bottom: 1px solid #30249e;

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
                    color: #555ba8;
                    text-align: center;
                    line-height: 35px;
                    margin-right: 1px;
                    background: #8b91ff;
                    position: relative;
                    font-weight: 700;
                    .san {
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-left: 4px solid transparent;
                        border-right: 4px solid transparent;
                        border-top: 4px solid #4040ac;
                        left: 50%;
                        margin-left: -4px;
                        margin-top: -1px;
                    }
                }
                .activeTab {
                    background: #4040ac;
                    color: #fff;
                }
            }
            .descTip {
                font-size: 12px;
                width: 100%;
                height: 45px;
                color: #574eb1;
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
                color: #30249e;
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

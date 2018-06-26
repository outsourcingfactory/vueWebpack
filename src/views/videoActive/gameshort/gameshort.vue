<template>
    <div id="app">
        <div v-show="!showWx">
            <div class="topimage">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/gameshort-topimage-ymz.png`"></Onepic>
                <div class="gotoRule" @click="goruleClick()"></div>
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
                    上传参与比赛的作品后，需要一定时间搬运至活动页面
                </div>

                <div class="content">
                    <threeColumVideo :videoAll="videoAll"></threeColumVideo>
                </div>
                <div>
                    <ScrollUpLoading :tipDesc="tipDesc" :showload="showload" :color="'#fff'"></ScrollUpLoading>
                </div>
            </div>
            <div class="tips">
                本活动最终解释权归KilaKila所有
            </div>
            <div class="bottomBtn" @click="deepLink()">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/gameshort-bottomimage-ymz.png`"></Onepic>
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
    import {ymzBaseFun,na} from 'assets/js/common'
    import confirmUxin from 'components/baseymz/confirmUxin'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'
    let shareTitle = 'K站游戏短视频创作大赛';
    let shareDesc = '秀出精彩一刻，平分现金大奖';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/gameshort-wxsahre-ymz.png';
     export default {
        data(){
            return{
                videoAll: {
                    exampleVideoList: [],
                    showVideoList: []
                },
                page:1,
                type:1,
                v:2,
                exampleVideo: ['1142408782144339987', '1140240390595543150'],
                tagId: 45495,
                tipDesc:'正在加载...',
                showload:true,
                algoBottom:false,
                leftActive:true,
                rightActive:false,
                videostyle:{
                    contentBg:"#575186",
                    bordercolor:'#2e1d54',
                    titlename:'#a4818d',
                    authorname:'#a4818d',
                    zanBtn:'https://img.hongrenshuo.com.cn/h5/fiveman-toupiao-ymz.png'
                },
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
        created(){
            this._getExampleVideoList();
            this._getListVideo();
            ymzBaseFun.wxShareVue(shareTitle,shareDesc,shareImageUrl);
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            window.addEventListener('scroll', this._getBottom, false);
        },
        methods:{
            _getListVideo(){
                this.$axios.HttpGet('/Tg/gdk',{page:this.page,type:this.type,v:this.v,tagid:this.tagId})
                    .then((res) => {
                        console.log(res)
                        if(res.data.code === 200){
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
                            if (res.data.data.length < 10) {
                                this.$nextTick(function () {
                                    this.showload = false;
                                    this.tipDesc = '没有更多...';
                                });
                            }
                            this.algoBottom = true;
                            this.videoAll.showVideoList = this.videoAll.showVideoList.concat(res.data.data);
                            console.log(this.videoAll.showVideoList);
                        }else{
                            //等待封装toast
                            Toast({
                                message: res.data.msg,
                                position: 'center',
                                duration: 1500
                            })
                        }
                    })
                    .catch((res)=>{
                        Toast({
                            message: "网络错误",
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
            _getBottom(){
                if(ymzBaseFun.aleadyBottom() && this.algoBottom){
                    this.page++;
                    this.tipDesc = '上滑加载更多...';
                    this.showload = true;
                    this._getListVideo();
                }
            },
            tabSwitch(pos){
                this.showload = true;
                this.tipDesc = '上滑加载更多...';
                this.algoBottom = false;
                this.page = 1;
                this.videoAll.showVideoList = [];
                this.videoAll.exampleVideoList = [];
                if (pos == 0) {
                    this.leftActive = true;
                    this.rightActive = false;
                    this.type=1;
                    this._getExampleVideoList();
                } else {
                    this.leftActive = false;
                    this.rightActive = true;
                    this.type=2;
                }
                this._getListVideo();
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
            deepLink:function () {
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
                        data.stage = 'gameshort'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
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
            goruleClick:function () {
                window.location.href = '/Rule/gameshortrule.html';
            }
        },
        components: {
            Onepic,
            threeColumVideo,
            ScrollUpLoading,
            Wxcontent,
            confirmUxin
        }
    }
</script>

<style lang="scss" scoped>
    #app{
        background: #8bb8fa;
        padding-bottom: 80px;
        .topimage{
            width: 100%;
            height: 317px;
            position: relative;
            .gotoRule{
                position: absolute;
                width: 70px;
                height: 70px;
                top: 10px;
                right: 6px;
            }
        }
        .content{
            width: 100%;
            .title {
                width: 365px;
                box-sizing: border-box;
                border-bottom: none;
                display: flex;
                .hot,.time{
                    width: 64px;
                    height: 35px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #ffffff;
                    text-align: center;
                    line-height: 35px;
                    margin-right: 1px;
                    background: #4487f8;
                    position: relative;
                    .san{
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-left: 4px solid transparent;
                        border-right: 4px solid transparent;
                        border-top: 4px solid #f0d150;
                        left: 50%;
                        margin-left: -4px;
                        margin-top: -1px;
                    }
                }
                .activeTab{
                    background: #f0d150;
                    color: #ffffff;
                }
            }
            .descTip{
                font-size: 12px;
                width: 100%;
                height: 40px;
                color: #2462a5;
                line-height: 40px;
                padding-left: 10px;
                box-sizing: border-box;
            }
            .videoCell-out{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: 0 4px 10px;
                box-sizing: border-box;
                width: 365px;
                margin: 0 auto;
                background-color: #2e1d54;
                border-top: none;
                border-radius: 0 0 6px 6px;
            }
        }
        .tips {
            width: 100%;
            text-align: center;
            color: #9382df;
            font-size: 12px;
            line-height: 32px;
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

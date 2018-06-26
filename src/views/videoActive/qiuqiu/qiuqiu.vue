<template>
    <div id="app">
        <div v-show="!showWx" class="appcontent">
            <div>
                <div class="topimage">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/qiuqiu-image_01.png`"></Onepic>
                    <div class="gotoRule" @click="gorule()"></div>
                </div>

                <div class="content">
                    <div class="title">
                        <div @click="tabSwitch(0)" :class="leftActive?'hot activeTab':'hot'">最热
                            <div class="san" v-show="leftActive"></div>
                        </div>
                        <div @click="tabSwitch(1)" :class="rightActive?'time activeTab':'time'">最新
                            <div class="san" v-show="rightActive"></div>
                        </div>
                    </div>
                    <div class="descTip">
                        参赛视频上传后，需等待5-10分钟同步至活动页哦！
                    </div>
                    <div class="videoCell-out">
                        <Videozan v-for="(item,index) in videoList" :videoDesc="item" :videostyle="videostyle"></Videozan>
                    </div>
                    <div>
                        <ScrollUpLoading :tipDesc="tipDesc" :showload="showload"></ScrollUpLoading>
                    </div>
                </div>
                <div class="tips">
                    本活动最终解释权归KilaKila所有
                </div>
                <div class="bottomOut" @click="deepLink('uxinlive://uploadvideo?tag_id=28436&tag_name=全世界最好的你')">
                    <div class="bottom"></div>
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
    import Videozan from 'components/baseymz/Videozannew'
    import ScrollUpLoading from 'components/baseymz/ScrollUpLoading'
    import {ymzBaseFun,na} from 'assets/js/common'
    import confirmUxin from 'components/baseymz/confirmUxin'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'
    let shareTitle = '全世界最好的你';
    let shareDesc = '用视频分享你的爱豆，解锁告白新玩法！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/bestyou-share.png';
     export default {
        data(){
            return{
                videoList:[],
                page:1,
                type:1,
                v:2,
                tagid:'45394',
                tipDesc:'正在加载...',
                showload:true,
                algoBottom:false,
                leftActive:true,
                rightActive:false,
                showVideo:false,
                showCoverPic:true,
                showVideoImg:true,
                videostyle:{
                    contentBg:"#d0f7b0",
                    bordercolor:'#82ab55',
                    titlename:'#373d30',
                    authorname:'#373d30',
                    likeCount:'#373d30',
                    likeBg:'rgba(164,206,116,0.9)',
                    zanBtn:'https://img.hongrenshuo.com.cn/h5/qiuqiu-toupiaobtn.png'
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
            this._getListVideo();
            ymzBaseFun.wxShareVue(shareTitle,shareDesc,shareImageUrl);
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            window.addEventListener('scroll', this._getBottom, false);
        },
        methods:{
            _getListVideo(){
                this.$axios.HttpGet('/Tg/gdk',{page:this.page,type:this.type,v:this.v,tagid:this.tagid})
                    .then((res) => {
                        console.log(res)
                        if(res.data.code === 200){
                            if (res.data.data.length < 10) {
                                this.$nextTick(function () {
                                    this.showload = false;
                                    this.algoBottom = false;
                                    this.tipDesc = '没有更多...';
                                });
                            }
                            this.algoBottom = true;
                            this.videoList = this.videoList.concat(res.data.data);
                            console.log(this.videoList)
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
                this.videoList = [];
                if (pos == 0) {
                    this.leftActive = true;
                    this.rightActive = false;
                    this.type=1;
                } else {
                    this.leftActive = false;
                    this.rightActive = true;
                    this.type=2;
                }
                this._getListVideo();
            },
            deepLink:function (scheme) {
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
                        data.stage = 'bestyou'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
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
            playClick(){
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://smallvideo?video_id=1134714137780158579';
                } else {
                    window.location.href = 'https://v.hongdoulive.com/v/video?videoId=1134714137780158579';
                }
            },
            gorule(){
                window.location.href = '/Rule/qiuqiurule.html'
            },
            changePage() {
                this.$refs.confirmUxin.$emit('tiggle');
            },
        },
        components: {
            Onepic,
            Videozan,
            ScrollUpLoading,
            Wxcontent,
            confirmUxin
        }
    }
</script>

<style lang="scss" scoped>
    #app{
        background: #c8f0a9;
        .appcontent{
            padding-bottom: 75px;
        }
        .topimage{
            width: 100%;
            height: auto;
            position: relative;
            .gotoRule{
                position: absolute;
                width: 70px;
                height: 70px;
                top: 18px;
                right: 10px;
            }
        }
        .videoCover{
            width:100%;
            height:197px;
            background:url("https://img.hongrenshuo.com.cn/h5/bestyou-videocontent.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            padding: 0 23px;
            box-sizing: border-box;
            position: relative;
            .showVideo{
                z-index:100;
                position: absolute;
                width: 56px;
                height: 56px;
                left: 50%;
                top: 50%;
                margin-left: -28px;
                margin-top: -28px;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            .coverpic{
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            video{
                width:100%;
                height:100%;
            }
        }
        .content{
            width: 100%;
            .title {
                width: 100%;
                box-sizing: border-box;
                margin: 0 auto;
                background-color: #6b9040;
                height: 46px;
                border-top: 2px solid #587832;
                border-bottom: 2px solid #587832;

                padding-left: 20px;
                display: flex;
                align-items: center;
                .hot,.time{
                    width: 64px;
                    height: 35px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #587832;
                    text-align: center;
                    line-height: 35px;
                    margin-right: 1px;
                    background: #b9e793;
                    position: relative;
                    .san{
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-left: 4px solid transparent;
                        border-right: 4px solid transparent;
                        border-top: 4px solid #f1ce6d;
                        left: 50%;
                        margin-left: -4px;
                        margin-top: -1px;
                    }
                }
                .activeTab{
                    background: #f1ce6d;
                    color: #fff;
                }
            }
            .descTip{
                font-size: 12px;
                width: 100%;
                height: 40px;

                border-bottom: 2px solid #d0d0d0;
                color: #fff;
                line-height: 40px;
                padding-left: 10px;
                background: #a7d276;
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
                background-color: #a6d376;
                border: 1.5px solid #d2c9ff;
                border-top: none;
                border-radius: 0 0 6px 6px;
            }
        }
        .tips {
            width: 100%;
            text-align: center;
            color: #373d30;
            font-size: 12px;
            line-height: 32px;
        }
        .bottomOut {
            width: 100%;
            height: 75px;
            position: fixed;
            z-index: 10000;
            bottom: 0;
            .bottom {
                position: relative;
                width: 351px;
                height: 50px;
                background: url("https://img.hongrenshuo.com.cn/h5/qiuqiu-bottombtn.png") no-repeat center;
                background-size: 100% auto;
                margin: 0 auto;

            }
        }
    }
</style>

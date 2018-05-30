<template>
    <div id="app">
        <div v-show="!showWx">
            <div class="topimage">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/fiveman-topimage-ymz.png`"></Onepic>
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
                <div class="videoCell-out">
                    <Videozan v-for="(item,index) in videoList" :videoDesc="item" :videostyle="videostyle"></Videozan>
                </div>
                <div>
                    <ScrollUpLoading :tipDesc="tipDesc" :showload="showload" :color="'#fff'"></ScrollUpLoading>
                </div>
            </div>
            <div class="tips">
                本活动最终解释权归KilaKila所有
            </div>
            <div class="bottomOut" @click="deepLink()">
                <div class="bottom"></div>
            </div>
            <confirmUxin v-show="showConfirm" ref="confirmUxin" :downString="downString" :leftString="leftString"
                         :rightString="rightString" :callback="callBackToUxin"></confirmUxin>
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
    let shareTitle = '第五人格';
    let shareDesc = '庄园派对即刻开启，各种好礼狂欢相送';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/fiveman-wxshare-ymz.jpg';
     export default {
        data(){
            return{
                videoList:[],
                page:1,
                type:1,
                v:2,
                tagid:'10782,34935',
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
            goruleClick:function () {
                console.log('11111');
                window.location.href = '/Rule/fivemanrule.html';
            }
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
        background: #130620;
        padding-bottom: 80px;
        .topimage{
            width: 100%;
            height: auto;
            position: relative;
            .gotoRule{
                position: absolute;
                width: 70px;
                height: 70px;
                top: 28px;
                right: 18px;
            }
        }
        .content{
            width: 100%;
            .title {
                width: 365px;
                box-sizing: border-box;
                margin: 0 auto;
                background-color: #1d1734;
                height: 46px;
                /*border: 2px solid #d2c9ff;*/
                border-bottom: none;
                border-radius: 6px 6px 0 0;
                padding-left: 20px;
                display: flex;
                align-items: center;
                .hot,.time{
                    width: 64px;
                    height: 35px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #e19c49;
                    text-align: center;
                    line-height: 35px;
                    margin-right: 1px;
                    background: #381a34;
                    position: relative;
                    .san{
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-left: 4px solid transparent;
                        border-right: 4px solid transparent;
                        border-top: 4px solid #6e2d59;
                        left: 50%;
                        margin-left: -4px;
                        margin-top: -1px;
                    }
                }
                .activeTab{
                    background: #6e2d59;
                    color: #bba364;
                }
            }
            .descTip{
                font-size: 12px;
                width: 100%;
                height: 40px;
                /*border-top: 2px solid #d2c9ff;*/
                /*border-bottom: 2px solid #d2c9ff;*/
                color: #d19e93;
                line-height: 40px;
                padding-left: 10px;
                background: #2e1d54;
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
                /*border: 1.5px solid #d2c9ff;*/
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
        .bottomOut {
            width: 100%;
            height: 70px;
            position: fixed;
            bottom: 0;
            background: #2e1d54;
            .bottom {
                width: 323.5px;
                height: 38px;
                background: url("https://img.hongrenshuo.com.cn/h5/fiveman-bottom-ymz.png") no-repeat center;
                background-size: 100% 100%;
                margin: 10px auto 0;
            }
        }
    }
</style>

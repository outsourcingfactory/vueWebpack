<template>
    <div id="app">
        <div v-show="!showWx" class="appin">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/sweetcall-image_01.png`"></Onepic>
            </div>
            <div class="video-content" @click="goVideo('1197403553447018636')">
                <div class="play"></div>
                <img src="https://img.hongrenshuo.com.cn/h5/sweetcall-video-cover.jpg"/>
            </div>
            <div class="topimageOut1">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/sweetcall-image_02.png`"></Onepic>
            </div>
            <div class="people-list-content">
                <div class="people-title">
                    <img src="https://img.hongrenshuo.com.cn/h5/sweetcall-title.png"/>
                </div>
                <div class="people-group" v-for="(item,index) in dataList" :class="index == 0 ? 'people-group-first' : ''">
                    <img :src="item.bg"/>
                    <div class="gotoroom" v-show="item.goroom" @click="goRoom(item.roomid,'')"></div>
                    <div class="gotoroom1" v-show="item.goroombottm" @click="goRoom(item.roomid1,'')"></div>
                    <div class="call-btn" @click="gopage()"></div>
                    <div class="call-btn1" @click="gopage()"></div>
                    <div class="voice-btn" @click="playmp3(item.voicetop.vsrc,item.voicetop.top,index)">
                        <img :src="limit == index && voiceloc == 1?'https://img.hongrenshuo.com.cn/h5/sweetcall-voice.gif':'https://img.hongrenshuo.com.cn/h5/sweetcall-voice.png'"/>
                    </div>
                    <div class="voice-btn voice-btn1" @click="playmp3(item.voiceBottom.vsrc,item.voiceBottom.top,index)">
                        <img :src="limit == index && voiceloc == 0?'https://img.hongrenshuo.com.cn/h5/sweetcall-voice.gif':'https://img.hongrenshuo.com.cn/h5/sweetcall-voice.png'"/>
                    </div>
                </div>

                <div class="people-surui" @click="gouid(1869175513092)">
                    <img src="https://img.hongrenshuo.com.cn/h5/sweetcall-peoplesurui.png"/>
                    <div class="call-btn2" @click.stop="gopage()"></div>
                </div>
            </div>
            <div class="bottom-txt">
                <img src="https://img.hongrenshuo.com.cn/h5/sweetcall-txt-bottom.png"/>
            </div>
            <div class="goTop" @click.stop="scrollToTop()" v-show="isActive">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/sweetcall-gotop.png`"></Onepic>
            </div>
            <div class="golittle" @click="gotolittle()" v-show="showlittle">
                <img src="https://img.hongrenshuo.com.cn/h5/sweetcall-nowplay.gif"/>
            </div>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
        <audio id="mp3" ref="audio" hidden @ended="ended()"></audio>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import wx from 'weixin-js-sdk'
    import Toast from 'assets/js/toast'
    let shareTitle = '#克拉克拉甜秘致电#';
    let shareDesc = '来克拉克拉App，12大声控男神甜美秘电，等你接听。';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/sweetcall-share.png';
    export default {
        data() {
            return {
                dataList: [
                    {
                        'bg':'https://img.hongrenshuo.com.cn/h5/sweetcall-peoplegroup1.png',
                        'goroom':true,
                        'goroombottm':false,
                        'roomid':'1196162234884030537',
                        'roomid1':'',
                        'voicetop':{
                            "top":1,
                            "vsrc":"https://img.hongrenshuo.com.cn/h5/sweetcall1.mp3"
                        },
                        "voiceBottom":{
                            "top":0,
                            "vsrc":"https://img.hongrenshuo.com.cn/h5/sweetcall2.mp3"
                        }
                    },
                    {
                        'bg':'https://img.hongrenshuo.com.cn/h5/sweetcall-peoplegroup2.png',
                        'goroom':true,
                        'goroombottm':true,
                        'roomid':'',
                        'roomid1':'1196160692990771244',
                        'voicetop':{
                            "top":1,
                            "vsrc":"https://img.hongrenshuo.com.cn/h5/sweetcall3.mp3"
                        },
                        "voiceBottom":{
                            "top":0,
                            "vsrc":"https://img.hongrenshuo.com.cn/h5/sweetcall4.mp3"
                        }
                    },
                    {
                        'bg':'https://img.hongrenshuo.com.cn/h5/sweetcall-peoplegroup3.png',
                        'goroom':true,
                        'goroombottm':true,
                        'roomid':'1196158317873856595',
                        'roomid1':'1196158889104506933',
                        'voicetop':{
                            "top":1,
                            "vsrc":"https://img.hongrenshuo.com.cn/h5/sweetcall5.mp3"
                        },
                        "voiceBottom":{
                            "top":0,
                            "vsrc":"https://img.hongrenshuo.com.cn/h5/sweetcall6.mp3"
                        }
                    },
                    {
                        'bg':'https://img.hongrenshuo.com.cn/h5/sweetcall-peoplegroup4.png',
                        'goroom':true,
                        'goroombottm':true,
                        'roomid':'',
                        'roomid1':'1196162024430633030',
                        'voicetop':{
                            "top":1,
                            "vsrc":"https://img.hongrenshuo.com.cn/h5/sweetcall7.mp3"
                        },
                        "voiceBottom":{
                            "top":0,
                            "vsrc":"https://img.hongrenshuo.com.cn/h5/sweetcall8.mp3"
                        }
                    },
                    {
                        'bg':'https://img.hongrenshuo.com.cn/h5/sweetcall-peoplegroup5.png',
                        'goroom':true,
                        'goroombottm':true,
                        'roomid':'1196159614953979939',
                        'roomid1':'1196161796797366286',
                        'voicetop':{
                            "top":1,
                            "vsrc":"https://img.hongrenshuo.com.cn/h5/sweetcall9.mp3"
                        },
                        "voiceBottom":{
                            "top":0,
                            "vsrc":"https://img.hongrenshuo.com.cn/h5/sweetcall10.mp3"
                        }
                    },
                    {
                        'bg':'https://img.hongrenshuo.com.cn/h5/sweetcall-peoplegroup6.png',
                        'goroom':false,
                        'goroombottm':true,
                        'roomid':'',
                        'roomid1':'1196160005796003909',
                        'voicetop':{
                            "top":1,
                            "vsrc":"https://img.hongrenshuo.com.cn/h5/sweetcall11.mp3"
                        },
                        "voiceBottom":{
                            "top":0,
                            "vsrc":"https://img.hongrenshuo.com.cn/h5/sweetcall12.mp3"
                        }
                    },
                ],
                showWx: false,
                isActive: false,
                limit:-1,
                voiceloc:-1,
                showlittle:true
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            this.judge();
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('scroll', this.handleScroll)
            });
        },
        methods: {
            judge:function(){
                if(window.__wxjs_environment === 'miniprogram'){
                    this.showlittle == false
                }
                wx.miniProgram.getEnv(function(res) {
                    if(res.miniprogram){
                        this.showlittle == false
                    }
                })

            },
            goDeepLink: function (url) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = url;
                } else {
                    if (na.match(/micromessenger/i) && na.match(/(iphone|ipod|ios|ipad)/i)) {
                        this.showWx = true;
                    } else {
                        var data = {};
                        data.stage = 'sweetcall'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
                        data.ios_custom_url = "https://itunes.apple.com/cn/app/hong-doulive/id1137896285?mt=8"; // 自定义iOS平台下App的下载地址，如果是AppStore的下载地址可以不用填写，【可选】
                        data.ios_direct_open = "true"; //未安装情况下，设置为true为直接打开ios_custom_url，默认为false【可选】
                        data.type = 'test';  //表示现在使用线上模式,如果填写"test", 表示测试模式.【可选】
                        data.params = '{"scheme_url":"' + url + '"}'; //注意单引号和双引号的位置
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
            goVideo:function (videoid) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://smallvideo?video_id=' + videoid;
                } else {
                    window.location.href = 'https://v.hongdoulive.com/v/video?videoId='+videoid;
                }
            },
            goRoom: function (roomid) {
                if (roomid) {
                    if (na.match(/hongdoulive/i)) {
                        window.location.href = 'uxinlive://live?roomid=' + roomid + '&roomId=' + roomid;
                    } else {
                        window.location.href = 'http://m.hongdoufm.com/room/' + roomid;
                    }
                }
            },
            gouid:function(uid){
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://userinfo?uid=' + uid;
                } else {
                    window.location.href = 'https://live.hongdoulive.com/index/roomuser/uid/' + uid;
                }
            },
            gopage(){
                window.location.href="/sweetCall/sweetCallPage?showshare=1";
            },
            playmp3(src,location,index){
                console.log(location);
                if (index==this.limit && location == this.voiceloc) {
                    this.limit=-1;
                    this.$refs.audio.pause();
                }else{
                    this.limit=index;
                    this.$refs.audio.src = src;
                    this.$refs.audio.play();
                }
                this.voiceloc = location;

            },
            ended(){
                this.limit=-1;
            },
            handleScroll: function () {
                this.scrollTop = this.scrollTop = window.pageYOffset || document.body.scrollTop
                if (this.scrollTop > 400) {
                    this.isActive = true
                } else {
                    this.isActive = false
                }
            },
            scrollToTop() {
                let timer = null;
                let _that = this;
                //动画，使用requestAnimationFrame代替setInterval
                cancelAnimationFrame(timer)
                timer = requestAnimationFrame(function fn() {
                    if (_that.scrollTop > 0) {
                        _that.scrollTop -= 100
                        //然后修改这里实现动画滚动效果
                        document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop
                        timer = requestAnimationFrame(fn)
                    } else {
                        cancelAnimationFrame(timer);
                        _that.toTopShow = false
                    }
                })
            },
            gotolittle:function(){
                if (na.match(/hongdoulive/i)) {
                    var userName = 'gh_18cc349cd35c';
                    var path = '%2Fpages%2Fhome%2Fhome';
                    var programType = 0;
                    if (na.match(/(iphone|ipod|ios|ipad)/i)) {
                        if (ymzBaseFun.getVcString('vc') > 106) {
                            window.location.href = 'uxinlive://miniprogram?userName='+userName+'&path='+path+'&programType='+programType;
                        } else {
                            this.downString = '前往App Store升级最新版App吧~ '
                            this.rightString = '';
                            this.leftString = '知道啦';
                            this.callBackToUxin = function () {
                            };
                            this.changePage();
                        }
                    } else {
                        if (ymzBaseFun.getVcString('vc') > 122) {

                            window.location.href = 'uxinlive://miniprogram?userName='+userName+'&path='+path+'&programType='+programType;
                        } else {
                            this.downString = '升级最新版App来参与吧~'
                            this.rightString = '去升级';
                            this.leftString = '取消';
                            this.changePage();
                        }
                    }
                }else{
                    let webrul = encodeURI('https://live.hongdoulive.com/sweetCall/sweetCallIndex?showshare=1')
                    this.goDeepLink("uxinlive://webpage?url="+webrul);
                }
            },
        },
        components: {
            Onepic,
            Wxcontent
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll)
        }
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        img {
            width: 100%;
            height: auto;
        }
        .appin{
            width:100%;
            background: #363636;
            padding-bottom: 45px;
            .topimageOut{
                width:100%;
                height:481px;
                position: relative;
            }
            .video-content{
                width:100%;
                background: #c3c3c1;
                padding:3px;
                box-sizing: border-box;
                position: relative;
                .play{
                    width:50px;
                    height:50px;
                    background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-play.png") no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    left:50%;
                    top:50%;
                    margin-left:-25px;
                    margin-top:-25px;
                }
                img{
                    width:100%;
                    height:100%;
                }
            }
            .topimageOut1{
                width:100%;
                height:41px;
            }
            .people-list-content{
                width:100%;
                background: #363636;
                padding-top:13px;
                padding-bottom:25px;
                .people-title{
                    img{
                        width:285px;
                        height:auto;
                        margin:0 auto;
                    }
                }
                .people-group{
                    width:100%;
                    height:615px;
                    margin-top:-46px;
                    position: relative;
                    img{
                        width:100%;
                        height:100%;
                    }
                    .gotoroom{
                        width:100px;
                        height:35px;
                        position: absolute;
                        left:160px;
                        top:57px;
                    }
                    .gotoroom1{
                        width:100px;
                        height:35px;
                        position: absolute;
                        left:120px;
                        top:320px;
                    }
                    .call-btn{
                        width:60px;
                        height:70px;
                        position: absolute;
                        left:148px;
                        top:230px;
                    }
                    .call-btn1{
                        width:60px;
                        height:70px;
                        position: absolute;
                        left:148px;
                        top:530px;
                    }

                    .voice-btn{
                        width:38px;
                        height:38px;
                        background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-voice-wraper.png") no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        top:168px;
                        right:25px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width:36px;
                            height:auto;
                        }
                    }
                    .voice-btn1{
                        right:auto;
                        top:auto;
                        bottom:32px;
                        left:25px;
                    }
                }
                .people-group-first{
                    margin-top:-17px;
                }
                .people-surui{
                    width:100%;
                    height:358px;
                    position: relative;
                    .call-btn2{
                        width:60px;
                        height:70px;
                        position: absolute;
                        right:86px;
                        bottom:20px;
                    }
                    img{
                        wdith:100%;
                        height:100%;
                    }
                }
            }
            .bottom-txt{
                img{
                    width:305px;
                    height:auto;
                    margin:0 auto;
                }
            }
            .goTop {
                width: 80px;
                height: 83px;
                position: fixed;
                bottom: 60px;
                right: 12px;
                z-index: 500;
            }
            .golittle{
                width:100px;
                height:100px;
                position: fixed;
                right:5px;
                top: 40px;
                img{
                    width:100%;
                    height:100%;
                }
            }
        }

    }
</style>

<template>
    <div id="app">
        <div class="itemcontent" v-show="!showWx">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/honey-topimage-ymz.jpg`"></Onepic>
            </div>
            <div class="videoOut" @click="playvideo()">
                <img v-show="videoshow" src="https://img.hongrenshuo.com.cn/h5/capsuletoys-videocover.png" class="videoPic">
                <img src="https://img.hongrenshuo.com.cn/h5/honey-videoOut-ymz.png" class="videoOutPic">
                <video ref="video" v-show="!videoshow" controls="controls" playsinline="true" webkit-playsinline="true" preload="metadata" src="http://hrslive.hongrenshuo.com.cn/videoWatermarkDir/1159493616586981453.mp4?t=1532240986221" x-webkit-airplay="allow" x5nativepanel="" x5-video-player-type="h5" x5-video-player-fullscreen="true"></video>
                <img v-show="videoshow" class="play" src="https://img.hongrenshuo.com.cn/h5/capsuletoys-play.png"/>
            </div>
            <div class="tips">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/honey-videoTips-ymz.png`"></Onepic>
            </div>
            <div class="zhuboContent">
                <div class="title1">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/honey-title1-ymz.png`"></Onepic>
                </div>
                <swiper :options="swiperOption1" ref="mySwiper">
                    <swiper-slide class="swiper-slide">
                        <div class="slider-item">
                            <div class="slider-bg slider-top">
                                <div class="title">阿杰</div>
                                <div class="desc">口嫌体正直的青梅竹马，小心试探着你的心意。</div>
                                <div class="audioOut" @click="playmp3top('https://img.hongrenshuo.com.cn/h5/capsuletoys-ajie.mp3',0)">
                                    <img :src="topindex == 0?'https://img.hongrenshuo.com.cn/h5/capsuletoys-music.gif':'https://img.hongrenshuo.com.cn/h5/capsuletoys-music.png'" class="audioGif">
                                </div>
                                <div class="people">
                                    <img src="https://img.hongrenshuo.com.cn/h5/capsuletoys-people1.png"/>
                                </div>
                                <div class="goBo" @click="topgetlive(1869175513092,0)">
                                    {{topfollow[0]?"已关注":"立即关注"}}
                                </div>
                            </div>
                            <div class="slider-bg slider-bottom">
                                <div class="title">逍遥散人</div>
                                <div class="desc">攻略游戏跟攻略我，到底哪个更难呢？</div>
                                <div class="audioOut" @click="playmp3top('https://img.hongrenshuo.com.cn/h5/capsuletoys-xiaoyao.mp3',1)">
                                    <img :src="topindex == 1?'https://img.hongrenshuo.com.cn/h5/capsuletoys-music.gif':'https://img.hongrenshuo.com.cn/h5/capsuletoys-music.png'" class="audioGif">
                                </div>
                                <div class="people">
                                    <img src="https://img.hongrenshuo.com.cn/h5/capsuletoys-people2.png?v=1"/>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="swiper-slide">
                        <div class="slider-item">
                            <div class="slider-bg slider-top">
                                <div class="title">宝木中阳</div>
                                <div class="desc">对任何事物都不感兴趣，你是唯一的例外。</div>
                                <div class="audioOut" @click="playmp3top('https://img.hongrenshuo.com.cn/h5/capsuletoys-baomu.mp3',2)">
                                    <img :src="topindex == 2?'https://img.hongrenshuo.com.cn/h5/capsuletoys-music.gif':'https://img.hongrenshuo.com.cn/h5/capsuletoys-music.png'" class="audioGif">
                                </div>
                                <div class="people">
                                    <img src="https://img.hongrenshuo.com.cn/h5/capsuletoys-people3.png"/>
                                </div>
                                <div class="goBo" @click="topgetlive(2159855374359,1)">
                                    {{topfollow[1]?"已关注":"立即关注"}}
                                </div>
                            </div>
                            <div class="slider-bg slider-bottom">
                                <div class="title">赵乾景</div>
                                <div class="desc">喜欢这次的烛光晚餐吗？都是我亲手做的。</div>
                                <div class="audioOut" @click="playmp3top('https://img.hongrenshuo.com.cn/h5/capsuletoys-zhaoqianjing.mp3',3)">
                                    <img :src="topindex == 3?'https://img.hongrenshuo.com.cn/h5/capsuletoys-music.gif':'https://img.hongrenshuo.com.cn/h5/capsuletoys-music.png'" class="audioGif">
                                </div>
                                <div class="people">
                                    <img src="https://img.hongrenshuo.com.cn/h5/capsuletoys-people4.png?v=1"/>
                                </div>
                                <div class="goBo" @click="topgetlive(1929746898958,2)">
                                    {{topfollow[2]?"已关注":"立即关注"}}
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination swiper-pagination1" slot="pagination"></div>
                </swiper>
            </div>
            <div class="cardContent">
                <div class="title2">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/honey-title2-ymz.png`"></Onepic>
                </div>
                <div id="container">
                    <swiper v-if="slidedata.length>1" :options="swiperOption" ref="mySwiper">
                        <swiper-slide class="swiper-slide games" v-for="(item,index) in slidedata">
                            <div class="cardslide">
                                <div class="cardbg" :style="{backgroundImage: 'url(' + item.bg + ')'}">

                                </div>
                                <div class="cardname">{{item.name}}</div>
                                <div class="cardinfo">
                                    <div class="cardheadWraper" @click="gotoinfo(item.uid)">
                                        <img :src="`${item.headurl}?x-oss-process=image/resize,m_mfit,h_160,w_160,limit_0/crop,w_160,h_160,g_center`">
                                        <div class="kicon"></div>
                                    </div>
                                    <div class="voicecontent">
                                        <div class="audioOut" @click="playmp3(item.mp3,index)">
                                            <img :src="bottomindex == index?'https://img.hongrenshuo.com.cn/h5/capsuletoys-music.gif':'https://img.hongrenshuo.com.cn/h5/capsuletoys-music.png'" class="audioGif">
                                        </div>
                                    </div>
                                    <div class="carddes">
                                        {{item.des}}
                                    </div>
                                    <div class="gotoplay" @click="getLive(item.uid,index,item.roomid)">{{item.isfollow?"已关注":"立即关注"}}</div>
                                </div>
                            </div>
                        </swiper-slide>

                        <div class="swiper-pagination swiper-pagination2" slot="pagination"></div>

                    </swiper>
                </div>
            </div>
            <div class="jieshiquan">本活动最终解释权归KilaKila所有</div>
            <div class="niudan" @click="gotolittle()"></div>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
        <confirmUxin v-show="showConfirm" ref="confirmUxin" :downString="downString" :leftString="leftString"
                     :rightString="rightString" :callback="callBackToUxin"></confirmUxin>
        <audio id="mp3" ref="audio" src="https://img.hongrenshuo.com.cn/h5/huangxiangli.mp3" hidden></audio>
    </div>

</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Toast from 'assets/js/toast'
    import confirmUxin from 'components/baseymz/confirmUxin'
    import Wxcontent from 'components/baseymz/Wxcontent'

    let shareTitle = '梦幻扭蛋季';
    let shareDesc = 'KilaKila梦幻扭蛋季，等你“听”见我心声!';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/capsuletoys-share.jpg';

    export default {
        data(){
            return {
                currentPageIndex: 0,
                videoshow:true,
                isplay:true,
                showWx: false,
                interval: 2000,
                bottomindex:-1,
                topindex:-1,
                showConfirm: false,
                downString: '请升级KilaKila到最新版本',
                leftString: '取消',
                rightString: '下载',
                callBackToUxin: function () {
                    window.location.href = "https://download.hongrenshuo.com.cn/apk/YXLive_publish_H5GG_sign.apk";
                },
                swiperOption: {
                    autoplay: {
                        stopOnLastSlide: true,
                        disableOnInteraction: true, //用户操作后是否禁止自动循环
                        delay: 3000 //自自动循环时间
                    },

                    effect:'coverflow',
                    speed: 800, //切换速度，即slider自动滑动开始到结束的时间（单位ms）
                    loop: false, //循环切换

                    autoHeight: true,   //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
                    scrollbar: '.swiper-scrollbar',
                    observeParents: true, //当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
                    coverflowEffect: {
                        rotate: 5,
                        stretch: 90,
                        depth: 250,
                        modifier: 1,
                        slideShadows : false
                    },
                    pagination: {
                        el: '.swiper-pagination2',
                        // type : 'progressbar', //分页器形状
                        clickable: true, //点击分页器的指示点分页器会控制Swiper切换
                    }
                },
                swiperOption1: {
                    speed: 500, //切换速度，即slider自动滑动开始到结束的时间（单位ms）
                    loop: false, //循环切换

                    autoHeight: true,   //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
                    scrollbar: '.swiper-scrollbar',
                    observeParents: true, //当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
                    pagination: {
                        el: '.swiper-pagination1',
                        // type : 'progressbar', //分页器形状
                        clickable: true, //点击分页器的指示点分页器会控制Swiper切换
                    }
                },
                slidedata:[

                ],
                topfollow:[
                    false,false,false
                ]
            }
        },
        created(){
            this.getcardInfo();
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        mounted(){
            var that = this;
            this.$refs.audio.addEventListener('ended',function(){
                that.topindex = -1;
                that.bottomindex = -1;
                that.$refs.mySwiper.swiper.autoplay.run();
            });
            this.$refs.video.addEventListener('pause',function(){
                that.videoshow = true;
            });
            this.getFollow();
        },
        methods:{
            //            初始化slide

            playmp3top:function(mp3,index){
                var curindex = index;
                this.bottomindex = -1;
                if(this.topindex != curindex){
                    this.$refs.audio.src = mp3;
                }
                if(this.$refs.audio.paused){
                    this.$refs.audio.play();
                    this.topindex = curindex;
                }else{
                    this.$refs.audio.pause();
                    this.topindex = -1;
                }
            },
            playmp3:function(mp3,index){
                this.$refs.mySwiper.swiper.autoplay.pause();
                var curindex = index;
                this.topindex = -1;
                if(this.bottomindex != curindex){
                    this.$refs.audio.src = mp3;
                }
                if(this.$refs.audio.paused){
                    this.$refs.audio.play();
                    this.bottomindex = curindex;
                }else{
                    this.$refs.audio.pause();
                    this.bottomindex = -1;
                }
            },
            getLive: function (uid,index,roomid) {
                if (na.match(/hongdoulive/i)) {
                    this.$axios.HttpGet('/Stars/aj_addFollow', {staruid: uid})
                        .then((res) => {
                            if(res.data.code == 200 || res.data.code == 1103){
                                this.slidedata[index].isfollow = true;
                                window.location.href = "uxinlive://live?roomid="+roomid+"&roomId="+roomid;
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
                }else{
                    // this.$set(this.slidedata[index].isfollow, index, true)
                    this.slidedata[index].isfollow = true;
                    window.location.href = "https://live.hongdoulive.com/room/" + roomid ;
                }

            },
            getFollow:function(){
                if (na.match(/hongdoulive/i)) {
                    let starList = [1869175513092,2159855374359,1929746898958];
                    for(let i = 0; i < starList.length; i++) {
                        let uid = starList[i];
                        this.$axios.HttpGet('/Stars/aj_getFollowRelation', {staruid: uid})
                            .then((res) => {
                                if(res.data.isfollow ){
                                    this.$set(this.topfollow, i, true)
                                    //window.location.href = "";
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
                    }

                }
            },
            topgetlive:function(uid,index,roomid){
                if (na.match(/hongdoulive/i)) {
                    this.$axios.HttpGet('/Stars/aj_addFollow', {staruid: uid})
                        .then((res) => {
                            if(res.data.code == 200 || res.data.code == 1103){
                                this.$set(this.topfollow, index, true);
                                if(index ==0){
                                    window.location.href = "uxinlive://live?roomid=1160568973318684740&roomId=1160568973318684740";
                                }else{
                                    window.location.href = 'uxinlive://userinfo?uid='+uid;
                                }

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
                }else{
                    // this.$set(this.slidedata[index].isfollow, index, true)
                    this.$set(this.topfollow, index, true);
                    if(index ==0){
                        window.location.href = "https://live.hongdoulive.com/room/1160568973318684740";
                    }else{
                        window.location.href = 'https://live.hongdoulive.com/index/roomuser/uid/'+uid;
                    }

                }
            },
            getcardInfo:function(){
                this.$axios.HttpGet('/Stars/onedayhoneyList')
                    .then((res) => {
                        this.slidedata = this.slidedata.concat(res.data.data);
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
            gotolittle:function(){
                if (na.match(/hongdoulive/i)) {
                    var userName = 'gh_0983862c5d0c';
                    var path = '%2Fpages%2Fmy%2Fmy';
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
                    if (na.match(/micromessenger/i) && na.match(/(iphone|ipod|ios|ipad)/i)) {
                        this.showWx = true;
                    } else {
                        var data = {};
                        data.stage = 'killwolf'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
                        data.ios_custom_url = "https://itunes.apple.com/cn/app/hong-doulive/id1137896285?mt=8"; // 自定义iOS平台下App的下载地址，如果是AppStore的下载地址可以不用填写，【可选】
                        data.ios_direct_open = "true"; //未安装情况下，设置为true为直接打开ios_custom_url，默认为false【可选】
                        data.type = 'test';  //表示现在使用线上模式,如果填写"test", 表示测试模式.【可选】
                        data.params = '{"scheme_url":"' + 'uxinlive://home' + '"}'; //注意单引号和双引号的位置
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
            gotoinfo:function(uid){
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://userinfo?uid='+uid;
                } else {
                    window.location.href = 'https://live.hongdoulive.com/index/roomuser/uid/'+uid;
                }
            },
            changePage() {
                this.$refs.confirmUxin.$emit('tiggle');
            },
            playvideo:function(){
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://smallvideo?video_id=1163526651007467584';
                } else {
                    window.location.href = 'https://v.hongdoulive.com/v/video?videoId=1163526651007467584';
                }
            }
        },
        components: {
            Onepic,
            confirmUxin,
            Wxcontent
        },
    }
</script>

<style lang="scss">
    #app {

        .itemcontent{
            width: 100%;
            height: 1878px;
            background: url("https://img.hongrenshuo.com.cn/h5/honey-bgImage-ymz.png") no-repeat center;
            background-size: 100% 100%;
        }
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
                left: 15px;
                top:15px;

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
            video{
                position: absolute;
                width: 330px;
                height: 179px;
                left: 50%;
                top:50%;
                transform: translate(-50%,-50%);
            }
            .play{
                width:37px;
                height:37px;
                position: absolute;
                left:35px;
                bottom:30px;
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
                                height: 164px;
                                margin: 25px auto 0;
                                position: relative;
                                .title{
                                    font-size: 15px;
                                    color: rgb(14, 105, 110);
                                    position: absolute;
                                    text-align: center;
                                    width: 120px;

                                    font-weight: 700;
                                }
                                .desc{
                                    width: 200px;
                                    font-size: 15px;
                                    line-height: 20px;
                                    color: #000;
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
                                    justify-content: center;
                                    z-index: 1;
                                    img{
                                        width:80%;
                                        height:auto;
                                    }
                                    .audioOn{
                                        width: 13px;
                                        height: 14px;
                                        margin-left: 8px;
                                        margin-right: 6px;
                                        /*margin: 0 6px;*/
                                    }
                                }

                            }
                            .slider-top{
                                background: url("https://img.hongrenshuo.com.cn/h5/capsuletoys-rectangle.png") no-repeat center;
                                background-size: 100% 100%;
                                .title{
                                    right: 35px;
                                    top: 22px;
                                }
                                .desc{
                                    left: 142px;
                                    top: 50px;
                                }
                                .goBo{
                                    right: 14px;
                                    bottom: 14px;
                                }
                                .audioOut{
                                    left: 54px;
                                    bottom: 14px;
                                }
                                .people{
                                    position: absolute;
                                    left:15px;
                                    bottom:10px;
                                    width:115px;
                                    img{
                                        width:100%;
                                        height:auto;
                                    }
                                }
                            }
                            .slider-bottom{
                                background: url("https://img.hongrenshuo.com.cn/h5/capsuletoys-rectangle-right.png") no-repeat center;
                                background-size: 100% 100%;
                                .title{
                                    left: 35px;
                                    top: 22px;
                                }
                                .desc{
                                    right: 142px;
                                    top: 50px;
                                }
                                .goBo{
                                    left: 28px;
                                    bottom: 14px;
                                }
                                .audioOut{
                                    right: 54px;
                                    bottom: 14px;
                                }
                                .people{
                                    position: absolute;
                                    right:20px;
                                    bottom:10px;
                                    width:115px;
                                    img{
                                        width:100%;
                                        height:auto;
                                    }
                                }
                            }
                        }
                    }

                }
            }
            .slider-item{
                width: 375px;
                float: left;
                box-sizing: border-box;
                overflow: hidden;
                /*text-align: center;*/
                .slider-bg{
                    width: 359px;
                    height: 164px;
                    margin: 35px auto 0;
                    position: relative;
                    .title{
                        font-size: 18px;
                        color: rgb(14, 105, 110);
                        position: absolute;
                        text-align: center;
                        width: 120px;
                        font-weight: 700;
                    }
                    .desc{
                        width: 170px;
                        font-size: 15px;
                        line-height: 20px;
                        color: #000;
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
                        justify-content: center;
                        z-index: 1;
                        img{
                            width:80%;
                            height:auto;
                        }
                        .audioOn{
                            width: 13px;
                            height: 14px;
                            margin-left: 8px;
                            margin-right: 6px;
                            /*margin: 0 6px;*/
                        }
                    }

                }
                .slider-top{
                    background: url("https://img.hongrenshuo.com.cn/h5/capsuletoys-rectangle.png") no-repeat center;
                    background-size: 100% 100%;
                    .title{
                        right: 35px;
                        top: 22px;
                    }
                    .desc{
                        left: 158px;
                        top: 57px;
                    }
                    .goBo{
                        right: 14px;
                        bottom: 14px;
                    }
                    .audioOut{
                        left: 54px;
                        bottom: 14px;
                    }
                    .people{
                        position: absolute;
                        left:15px;
                        bottom:10px;
                        width:115px;
                        img{
                            width:100%;
                            height:auto;
                        }
                    }
                }
                .slider-bottom{
                    background: url("https://img.hongrenshuo.com.cn/h5/capsuletoys-rectangle-right.png") no-repeat center;
                    background-size: 100% 100%;
                    .title{
                        left: 35px;
                        top: 22px;
                    }
                    .desc{
                        right: 150px;
                        top: 58px;
                    }
                    .goBo{
                        left: 28px;
                        bottom: 14px;
                    }
                    .audioOut{
                        right: 54px;
                        bottom: 14px;
                    }
                    .people{
                        position: absolute;
                        right:20px;
                        bottom:10px;
                        width:115px;
                        img{
                            width:100%;
                            height:auto;
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
            padding-top:0px;
            .title2{
                width: 243px;
                height:65px;
                margin: 0px 0 20px 18px;
            }
            .games{
                .cardslide{
                    width:245px;
                    height:397px;
                    margin: 0 auto;
                    background:url("https://img.hongrenshuo.com.cn/h5/capsuletoys-contentcover.png") no-repeat;
                    background-size: 100% 100%;
                    position: relative;
                    .cardbg{
                        width:228px;
                        height:357.5px;
                        position: absolute;
                        background-repeat: no-repeat;
                        background-size: cover;
                        top:20px;
                        left: 50%;
                        margin-left:-114px;
                    }
                    .cardname{
                        width:100%;
                        height:50px;
                        background:url("https://img.hongrenshuo.com.cn/h5/capsuletoys-cardname.png") no-repeat;
                        background-size: 100% 100%;
                        padding:0 50px;
                        box-sizing: border-box;
                        text-align: center;
                        line-height: 54px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 15px;
                        color:#0b575b;
                        font-weight: 700;
                        z-index: 2;
                        position: relative;
                    }
                    .cardinfo{
                        width:228px;
                        height:187px;
                        background: url("https://img.hongrenshuo.com.cn/h5/capsuletoys-covermask.png") no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        left:50%;
                        bottom: 8px;
                        margin-left:-114px;
                        .cardheadWraper{
                            width:110px;
                            height:110px;
                            border-radius: 50%;
                            background: url("https://img.hongrenshuo.com.cn/h5/capsuletoys-headwraper.png") no-repeat;
                            background-size: 100% 100%;
                            padding:11px;
                            box-sizing: border-box;
                            position: absolute;
                            left:50%;
                            top:-55px;
                            margin-left:-56.5px;
                            img{
                                width:100%;
                                height:100%;

                                border-radius:50%;
                            }
                            .kicon{
                                width:23px;
                                height:23px;
                                background: url("https://img.hongrenshuo.com.cn/h5/capsuletoys-kicon.png") no-repeat;
                                background-size: 100% 100%;
                                position: absolute;
                                right:8px;
                                bottom:8px;
                            }
                        }
                        .voicecontent{
                            display: flex;
                            justify-content: center;
                            margin-top:64px;
                            .audioOut{
                                width: 96px;
                                height: 26px;
                                background: url(https://img.hongrenshuo.com.cn/h5/honey-audioOut-ymz.png) no-repeat center;
                                background-size: 100% 100%;

                                display: flex;
                                align-items: center;
                                justify-content: center;
                                img{
                                    width:80%;
                                    height:auto;
                                }
                            }
                        }
                        .carddes{
                            width:100%;
                            font-size: 14px;
                            line-height: 20px;
                            color:#fff;
                            padding:0 16px;
                            box-sizing: border-box;
                            margin-top:17px;
                        }
                        .gotoplay{
                            width:114px;
                            height:40px;
                            background:url("https://img.hongrenshuo.com.cn/h5/capsuletoys-yuyueBtn.png") no-repeat;
                            background-size: 100% 100%;
                            position: absolute;
                            left:50%;
                            bottom:-20px;
                            margin-left:-57px;
                            font-size: 16px;
                            font-weight: 700;
                            color:#ff8281;
                            line-height: 40px;
                            text-align: center;
                        }
                    }

                }
                img{
                    width:80%;
                    height:auto;
                    margin:0 auto;
                }

            }
        }
        .jieshiquan{
            width:100%;
            font-size: 12px;
            color:#09a5ab;
            text-align: center;
            margin-top:60px;
        }
        .niudan{
            width:126px;
            height:134px;
            background:url("https://img.hongrenshuo.com.cn/h5/capsuletoys-niudan.png") no-repeat;
            background-size: 100% 100%;
            position: fixed;
            bottom:25px;
            right:10px;
            z-index: 10;
        }
    }
</style>

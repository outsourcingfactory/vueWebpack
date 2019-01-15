<template>
    <div id="app">
        <div class="container" v-show="!showList">
            <div class="goDan" @click="goMin">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/honey3h5-opendan-ymz.png`"></Onepic>
            </div>
            <div class="inputWrapper">
                <div class="inputOut"
                     :style="{backgroundImage:'url(' + backgroundBg + ')',backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: '100%'}"
                     :class="checkBgType == 2?'inputOutBig':''">
                    <div class="inputIn">
                        <div class="input-wrapper">
                            <input type="text" placeholder="输入兑换码" v-model="inputValue">
                        </div>
                        <div class="duihuan" @click="checkBgFun"></div>
                    </div>
                    <div class="checkBg" @click="checkBg"></div>
                </div>
                <div class="numSun" @click="goshowList">
                    我的神秘语音（{{haveVoice}}/25）
                </div>
            </div>


            <div class="content">
                <div class="videoOut" @click="playvideo()">
                    <img src="https://img.hongrenshuo.com.cn/h5/honey3h5-videoCover-ymz.png" class="videoPic">
                    <img src="https://img.hongrenshuo.com.cn/h5/honey3h5-shipinBg-ymz.png" class="videoOutPic">
                    <img class="play" src="https://img.hongrenshuo.com.cn/h5/honey3h5-showVideo-ymz.png"/>
                </div>
            </div>
            <div class="ulContentOut">
                <div class="ulContent">
                    <div class="contentLi" v-for="(item,index) in dataTenList" :class="`contentLi${index+1}`" :style="{backgroundImage:`url(${item.backPic})`,backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: '100%'}">
                        <div class="time">
                            {{item.time}}
                        </div>
                        <div class="twoBtn">
                            <div class="twoBtnLi twoBtnLeft" @click="goshowList">神秘语音</div>
                            <div class="twoBtnLi twoBtnRight" v-if="item.showRight" @click="guanzhuFun(item.roomid,index,item.uid)">{{item.showRight}}</div>
                        </div>
                        <div class="audioOut" @click="playmp3topTenFun(item.mp3,index)">
                            <img :src="topindex == index?'https://img.hongrenshuo.com.cn/h5/honey3h5-showActive-ymz.gif':'https://img.hongrenshuo.com.cn/h5/honey3h5-showNormal-ymz.png'" class="audioGif">
                        </div>

                    </div>
                </div>
            </div>
            <div class="goLast" @click="goLastFun"></div>
            <div class="goHome1" @click.stop="scrollToTop()" v-show="isActive">
                <img src="https://img.hongrenshuo.com.cn/h5/honey3h5-gotop-ymz.png" alt="">
            </div>
        </div>
        <div class="container1" v-show="showList">
            <div class="listTop">
                <div class="listTop-left">
                    <p>你已获得 <span>{{haveVoice}}</span> 个神秘语音</p>
                    <p>还有 <span>{{remain}}</span> 个待解锁哦~</p>
                </div>
                <div class="listTop-right" @click="goMin">
                    获取语音
                </div>
            </div>
            <div class="list-content">
                <div class="shuline"></div>
                <div class="contentLi" v-for="(item,index) in dataList" @click="fanCardFun(index,item.locked)">
                    <div class="userInfoOut">
                        <div class="userInfo">
                            <img :src="item.headpic" alt="" class="headPic">
                            <div class="nickName">{{item.name}}</div>
                            <div class="secName">饰 {{item.act_name}}</div>
                        </div>
                    </div>
                    <div class="norMal-bg" v-if="!item.locked"></div>
                    <div class="cardImage" v-if="item.locked">
                        <img :src="item.backpic" alt="">
                    </div>
                    <div class="cardImageBG" v-if="item.locked"></div>
                    <img class="zuan"
                         :src="item.locked?'https://img.hongrenshuo.com.cn/h5/honey3h5-zuanActive-ymz.png':'https://img.hongrenshuo.com.cn/h5/honey3h5-zuan-ymz.png'"
                         :class="index%2 == 0?'zuan1':'zuan2'">
                    <div class="line" :class="index%2 == 0?'line1':'line2'"></div>
                    <div class="num" v-if="item.num">{{item.num}}</div>
                </div>
            </div>
            <div class="goHome" @click="goHomeFun">
                <img src="https://img.hongrenshuo.com.cn/h5/honey3h5-gohome2-ymz.png" alt="">
            </div>
        </div>
        <div class="modal" v-if="showModalBg">
            <div class="modalCon" :class="showModalBg?'jackInTheBox animated':''">
                <img :src="dataList[chooseIndex].backpic" alt="">
                <div class="closeIcon" @click="closeCard">
                    <img src="https://img.hongrenshuo.com.cn/h5/honey3h5-close-ymz.png" alt="">
                </div>
                <div class="bottomDesc">
                    <div class="desc">
                        {{dataList[chooseIndex].desc}}
                    </div>
                    <div class="audioOut1" @click="playmp3top">
                        <img :src="cardShowAudio?'https://img.hongrenshuo.com.cn/h5/honey3h5-showActive-ymz.gif':'https://img.hongrenshuo.com.cn/h5/honey3h5-showNormal-ymz.png'"
                             class="audioGif">
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" v-if="appout">
            <div class="modalappout">
                <img src="https://img.hongrenshuo.com.cn/h5/honey3h5-appout-ymz.png" alt="">
                <div class="close" @click="closeModal"></div>
                <div class="goDownload" @click="godownFun"></div>
            </div>
        </div>
        <div class="modal" v-if="appin">
            <div class="modalappout">
                <img src="https://img.hongrenshuo.com.cn/h5/honey3h5-appin-ymz.png" alt="">
                <div class="close" @click="closeModal"></div>
                <div class="goDownload" @click="goHomeFun"></div>
            </div>
        </div>
        <div class="modal" v-if="wxchat">
            <div class="modalwxchat">
                <img src="https://img.hongrenshuo.com.cn/h5/honey3h5-wxchat-ymz.png" alt="">
                <div class="close" @click="closeModal"></div>
                <div class="gofuzhi" v-clipboard:copy="sysAppIds"
                     v-clipboard:success="onCopy"
                     v-clipboard:error="onError"></div>
            </div>
        </div>
        <audio id="mp3" ref="audio" src="" hidden></audio>
    </div>
</template>

<script>
    import Toast from 'assets/js/toast'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Onepic from 'components/baseymz/Onepic'
    import wx from 'weixin-js-sdk';
    let shareTitle = '克拉克拉梦幻扭蛋第二季';
    let shareDesc = '浪漫honey花样邂逅，扭个男神陪你过冬';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/honey3h5-wxshare-ymz.png';
    export default {
        data() {
            return {
                topindex:-1,
                checkBgType: 1,
                backgroundBg: 'https://img.hongrenshuo.com.cn/h5/honey3h5-duishou-ymz.png',
                dataList: [],
                remain: '',
                haveVoice: '',
                chooseIndex: 0,
                showModalBg: false,
                appout: false,
                appin: false,
                wxchat: false,
                cardShowAudio: false,
                showList: false,
                inputValue: '',
                dataTenList:[
                    {
                        'backPic':'https://img.hongrenshuo.com.cn/h5/honey3h5-man1bg-ymz.png',
                        'time':'12月30日20:00',
                        'showRight':'关注直播',
                        'mp3':'https://img.hongrenshuo.com.cn/h5/honey3h5-audiojia1-ymz.mp3',
                        'roomid':'1217020387074768954',
                        'uid':'2020676628493'
                    },
                    {
                        'backPic':'https://img.hongrenshuo.com.cn/h5/honey3h5-man2bg-ymz.png',
                        'time':'',
                        'mp3':'https://img.hongrenshuo.com.cn/h5/honey3h5-audiojia2-ymz.mp3',
                    },
                    {
                        'backPic':'https://img.hongrenshuo.com.cn/h5/honey3h5-man3bg-ymz.png',
                        'time':'',
                        'mp3':'https://img.hongrenshuo.com.cn/h5/honey3h5-audiojia3-ymz.mp3'
                    },
                    {
                        'backPic':'https://img.hongrenshuo.com.cn/h5/honey3h5-man4bg-ymz.png',
                        'time':'12月30日19:30',
                        'showRight':'关注直播',
                        'mp3':'https://img.hongrenshuo.com.cn/h5/honey3h5-audiojia4-ymz.mp3',
                        'roomid':'1217012759212851249',
                        'uid':'1875609632770'
                    },
                    {
                        'backPic':'https://img.hongrenshuo.com.cn/h5/honey3h5-man5bg-ymz.png',
                        'time':'',
                        'mp3':'https://img.hongrenshuo.com.cn/h5/honey3h5-audiojia5-ymz.mp3'
                    },
                    {
                        'backPic':'https://img.hongrenshuo.com.cn/h5/honey3h5-man6bg-ymz.png',
                        'time':'12月30日20:00',
                        'showRight':'关注直播',
                        'mp3':'https://img.hongrenshuo.com.cn/h5/honey3h5-audiojia6-ymz.mp3',
                        'roomid':'1217019957578039336',
                        'uid':'1838681178115'
                    },
                    {
                        'backPic':'https://img.hongrenshuo.com.cn/h5/honey3h5-man7bg-ymz.png',
                        'time':'12月30日21:00',
                        'showRight':'关注直播',
                        'mp3':'https://img.hongrenshuo.com.cn/h5/honey3h5-audiojia7-ymz.mp3',
                        'roomid':'1217019394937323592',
                        'uid':'1897814122542'
                    },
                    {
                        'backPic':'https://img.hongrenshuo.com.cn/h5/honey3h5-man8bg-ymz.png',
                        'time':'12月30日21:00',
                        'showRight':'关注直播',
                        'mp3':'https://img.hongrenshuo.com.cn/h5/honey3h5-audiojia8-ymz.mp3',
                        'roomid':'1217010199412342837',
                        'uid':'1855822462979'
                    },
                    {
                        'backPic':'https://img.hongrenshuo.com.cn/h5/honey3h5-man9bg-ymz.png',
                        'time':'12月30日21:30',
                        'showRight':'关注直播',
                        'mp3':'https://img.hongrenshuo.com.cn/h5/honey3h5-audiojia9-ymz.mp3',
                        'roomid':'1217015520876822558',
                        'uid':'1941293133853'
                    },
                    {
                        'backPic':'https://img.hongrenshuo.com.cn/h5/honey3h5-man10bg-ymz.png',
                        'time':'12月30日20:00',
                        'showRight':'关注直播',
                        'mp3':'https://img.hongrenshuo.com.cn/h5/honey3h5-audiojia10-ymz.mp3',
                        'roomid':'1217016341215576092',
                        'uid':'1874953314306'
                    },
                ],
                isActive:false,
                nowIn:'',
                sysAppIds:'https://at.umeng.com/onelink/8byiSj'
            }
        },
        watch: {
            checkBgType(newName, oldName) {
                if (newName == 1) {
                    this.backgroundBg = 'https://img.hongrenshuo.com.cn/h5/honey3h5-duishou-ymz.png';
                } else {
                    this.backgroundBg = 'https://img.hongrenshuo.com.cn/h5/honey3h5-duizhan-ymz.png';
                }
            }
        },
        created() {
            this.nowInPlace();
            console.log(this.nowIn);
            ymzBaseFun.wxShareVue(shareTitle,shareDesc,shareImageUrl);
            this.getList();
        },
        mounted() {
            let that = this;
            this.$refs.audio.addEventListener('ended', function () {
                that.cardShowAudio = false;
                that.topindex = -1;
            });
            this.$nextTick(function () {
                window.addEventListener('scroll', this.handleScroll);
            });
        },
        methods: {
            // 复制成功
            onCopy(e){
                Toast({
                    message: '复制成功',
                    position: 'center',
                    duration: 1500
                })
            },
            // 复制失败
            onError(e){
                Toast({
                    message: '复制失败',
                    position: 'center',
                    duration: 1500
                })
            },
            nowInPlace:function () {
                let that = this;
                if(na.match(/micromessenger/i)){   //判断是否是微信环境
                    //微信环境
                    wx.miniProgram.getEnv(function(res) {
                        if (res.miniprogram) {
                            // 小程序环境下逻辑
                            that.nowIn = 'inmini';
                        }else {
                            //非小程序环境下逻辑
                            that.nowIn = 'inwechat'
                        }
                    })
                }else{
                    //非微信环境逻辑
                    if (na.match(/hongdoulive/i)) {
                        this.nowIn = 'inapp'
                    } else {
                        this.nowIn = 'inout'
                    }
                }
            },
            scrollToTop() {
                let timer = null;
                let _that = this;
                //动画，使用requestAnimationFrame代替setInterval
                cancelAnimationFrame(timer)
                timer = requestAnimationFrame(function fn() {
                    if (_that.scrollTop > 0) {
                        _that.scrollTop -= 50
                        //然后修改这里实现动画滚动效果
                        document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop
                        timer = requestAnimationFrame(fn)
                    } else {
                        cancelAnimationFrame(timer);
                        _that.toTopShow = false
                    }
                })
            },
            handleScroll: function () {
                this.scrollTop = this.scrollTop = window.pageYOffset || document.body.scrollTop
                if (this.scrollTop > 400) {
                    this.isActive = true
                } else {
                    this.isActive = false
                }
            },
            guanzhuFun:function (roomid,index,uid) {
                if (na.match(/hongdoulive/i)) {
                    this.dataTenList[index].showRight = '已预约';
                    this.getGuan(uid);
                    window.location.href = 'uxinlive://live?roomid=' + roomid + '&roomId=' + roomid;
                } else {
                    window.location.href = 'http://m.hongdoufm.com/room/' + roomid;
                }
            },
            goLastFun:function () {
              window.location.href = 'https://live.hongdoulive.com/stars/onedayhoney?showshare=1';
            },
//            回到首页
            goHomeFun:function () {
                this.showList = false;
                this.cardShowAudio = false;
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                this.appin = false;
                this.$refs.audio.pause();
            },
            playvideo:function () {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://smallvideo?video_id=1217048905657614443';
                } else {
                    window.location.href = 'https://v.hongdoulive.com/v/video?videoId=1217048905657614443';
                }
            },
//            关注主播
            getGuan:function (uid) {
                this.$axios.HttpGet('/onedayHoney/aj_addFollow', {
                    staruid:uid
                })
                    .then((res) => {
//                        console.log(res.data);
//                        if(res.data.code==200 && index){
//                            this.dataTenList[index].showRight= '已关注';
//                        }
                    })
                    .catch(() => {
//                        Toast({
//                            message: '网络错误',
//                            position: 'center',
//                            duration: 1500
//                        })
                    })
            },
            checkBgFun: function () {
                if (!na.match(/hongdoulive/i)) {
                    if(this.nowIn == 'inmini'){
                        this.wxchat = true;
                    }else {
                        this.appout = true;
                    }
                    return
                }
                if (this.inputValue == '') {
                    Toast({
                        message: '请输入兑换码',
                        position: 'center',
                        duration: 1500
                    })
                }else{
                    this.$axios.HttpGet('/onedayHoney/convertCode', {
                        code:this.inputValue
                    })
                        .then((res) => {
                            console.log(res.data);
                            if (res.data.code === 200) {
                                this.chooseIndex = res.data.data.key;
                                this.showModalBg = true;
                                if(this.dataList[this.chooseIndex].uid){
                                    this.getGuan(this.dataList[this.chooseIndex].uid);
                                }
                                this.getList();
                            } else {
                                Toast({
                                    message: res.data.msg,
                                    position: 'center',
                                    duration: 1500
                                })
                            }
                        })
                        .catch(() => {
                            Toast({
                                message: '网络错误',
                                position: 'center',
                                duration: 1500
                            })
                        })
                }
            },
//            跳转列表
            goshowList: function () {
                this.showList = true;
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
            },
//            卡片上播放语音
            playmp3top: function () {
                if (this.$refs.audio.paused) {
                    this.$refs.audio.src = this.dataList[this.chooseIndex].mp3;
                    this.$refs.audio.play();
                    this.cardShowAudio = true;
                } else {
                    this.$refs.audio.pause();
                    this.cardShowAudio = false;
                }
            },
//            主页播放语音
            playmp3topTenFun:function (mp3,index) {
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
//            跳转小程序
            goMin: function () {
                if(this.nowIn == 'inapp'){
                    window.location.href = 'uxinlive://miniprogram?userName=gh_0983862c5d0c&path=/pages/my/my&programType=0';
                }else if(this.nowIn == 'inmini'){
                    this.wxchat = true;
                }else {
                    this.appout = true;
                }
            },
//            关闭弹窗
            closeModal: function () {
                this.appout = false;
                this.appin = false;
                this.wxchat = false;
            },
//            下载
            godownFun: function () {
                window.location.href = 'https://at.umeng.com/onelink/8byiSj';
            },
            checkBg: function () {
                if (this.checkBgType == 1) {
                    this.checkBgType = 2;
                } else {
                    this.checkBgType = 1;
                }
            },
            fanCardFun: function (index, locked) {
                if (locked) {
                    this.chooseIndex = index;
                    this.showModalBg = true;
                } else {
                    if(this.nowIn == 'inapp'){
                        this.appin = true;
                    }else if(this.nowIn == 'inmini'){
                        this.wxchat = true;
                    }else {
                        this.appout = true;
                    }
                }
            },
            closeCard: function () {
                this.showModalBg = false;
                this.cardShowAudio = false;
                this.$refs.audio.pause();
            },
            getList: function () {
                this.$axios.HttpGet('/onedayHoney/cardList', {})
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.code === 200) {
                            this.dataList = res.data.data.list;
                            this.haveVoice = res.data.data.haveVoice;
                            this.remain = res.data.data.remain;
                        } else {
                            Toast({
                                message: res.data.msg,
                                position: 'center',
                                duration: 1500
                            })
                        }
                    })
                    .catch(() => {
                        Toast({
                            message: '网络错误',
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
        },
        components: {
            Onepic
        },
    }
</script>

<style lang="scss" scoped>
    #app {
        .container {
            width: 100%;
            height: 7003px;
            background: url("https://img.hongrenshuo.com.cn/h5/honey3h5-bgImage-ymz.png") no-repeat center;
            background-size: 100%;
            position: relative;
            .goDan {
                position: fixed;
                width: 211px;
                height: 238px;
                right: 0px;
                top: 400px;
                z-index: 400;
            }
            .inputWrapper{
                position: absolute;
                left: 50%;
                top: 960px;
                transform: translateX(-50%);
                width: 100%;
                .inputOut {
                    width: 709px;
                    height: 317px;
                    margin: 0 auto;
                    position: relative;
                    .checkBg {
                        width: 100%;
                        height: 60px;
                        position: absolute;
                        left: 0;
                        bottom: 40px;
                    }
                    .inputIn {
                        width: 100%;
                        height: 100%;
                        position: relative;
                        .input-wrapper {
                            width: 420px;
                            height: 66px;
                            border: 2px solid rgb(213, 213, 213);
                            border-radius: 14px;
                            background-color: rgb(255, 255, 255);
                            box-shadow: inset 0px 0px 16px 0px rgba(148, 73, 0, 0.2);
                            position: absolute;
                            left: 45px;
                            top: 116px;
                            display: flex;
                            align-items: center;
                            input {
                                margin-left: 10px;
                                width: 400px;
                                height: 50px;
                                padding-left: 20px;
                            }
                        }
                        .duihuan {
                            width: 198px;
                            height: 65px;
                            position: absolute;
                            right: 34px;
                            top: 120px;
                        }
                    }
                }
                .numSun {
                    width: 679px;
                    height: 114px;
                    background: url("https://img.hongrenshuo.com.cn/h5/honey3h5-duihuanBg-ymz.png") no-repeat center;
                    background-size: 100%;
                    margin: 20px auto;
                    text-align: center;
                    color: rgb(255, 151, 62);
                    line-height: 114px;
                    font-weight: 500;
                    font-size: 36px;
                }
                .inputOutBig {
                    height: 426px;
                }
                .imputActive {
                    height: 426px;
                    background: url("https://img.hongrenshuo.com.cn/h5/honey3h5-duizhan-ymz.png") no-repeat center;
                    background-size: 100%;
                }
            }
            .content {
                position: absolute;
                width: 100%;
                left: 0;
                top: 1490px;
                .videoOut {
                    width: 725px;
                    height: 427px;
                    margin: 30PX auto 0;
                    position: relative;
                    .videoPic {
                        position: absolute;
                        width: 660px;
                        height: 358px;
                        left: 30px;
                        top: 30px;
                    }
                    .videoOutPic {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                        z-index: 100;
                    }
                    .play {
                        width: 73px;
                        height: 73px;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
            }
            .ulContentOut {
                position: absolute;
                width: 100%;
                left: 0;
                top: 2250px;
                .ulContent {
                    width: 100%;
                    .contentLi {
                        width: 728px;
                        margin: -20px auto 0;
                        position: relative;
                        .time {
                            color: #ff9f58;
                            font-size: 24px;
                            position: absolute;
                            right: 70px;
                            bottom: 120px;
                            font-weight: 400;
                        }
                        .twoBtn {
                            position: absolute;
                            bottom: 38px;
                            display: flex;

                            .twoBtnLi {
                                width: 214px;
                                height: 79px;
                                text-align: center;
                                line-height: 79px;
                                font-weight: 400;
                                font-size: 28px;
                            }
                            .twoBtnLeft {
                                background: url("https://img.hongrenshuo.com.cn/h5/honey3h5-btnleft-ymz.png") no-repeat center;
                                background-size: 100%;
                                color: #7aae3d;
                            }
                            .twoBtnRight {
                                background: url("https://img.hongrenshuo.com.cn/h5/honey3h5-btnright-ymz.png") no-repeat center;
                                background-size: 100%;
                                color: #ff994d;
                            }
                        }
                    }
                    .contentLi1 {
                        height: 378px;
                        .twoBtn {
                            right: 28px;
                        }
                        .audioOut {
                            left: 35px;
                        }
                    }
                    .contentLi2 {
                        height: 392px;
                        .twoBtn {
                            left: 50px;
                        }
                        .audioOut {
                            right: 35px;
                        }
                    }
                    .contentLi3 {
                        height: 375px;
                        .twoBtn {
                            right: 28px;
                        }
                        .audioOut {
                            left: 35px;
                        }
                    }
                    .contentLi4 {
                        height: 369px;
                        .time {
                            right: 274px;
                        }
                        .twoBtn {
                            left: 50px;
                        }
                        .audioOut {
                            right: 35px;
                        }
                    }
                    .contentLi5 {
                        height: 355px;
                        .twoBtn {
                            right: 28px;
                        }
                        .audioOut {
                            left: 35px;
                        }
                    }
                    .contentLi6 {
                        height: 357px;
                        .time {
                            right: 274px;
                        }
                        .twoBtn {
                            left: 50px;
                        }
                        .audioOut {
                            right: 35px;
                        }
                    }
                    .contentLi7 {
                        height: 364px;
                        .twoBtn {
                            right: 28px;
                        }
                        .audioOut {
                            left: 35px;
                        }
                    }
                    .contentLi8 {
                        height: 361px;
                        .time {
                            right: 274px;
                        }
                        .twoBtn {
                            left: 50px;
                        }
                        .audioOut {
                            right: 35px;
                        }
                    }
                    .contentLi9 {
                        height: 354px;
                        .twoBtn {
                            right: 28px;
                        }
                        .audioOut {
                            left: 35px;
                        }
                    }
                    .contentLi10 {
                        height: 354px;
                        .time {
                            right: 274px;
                        }
                        .twoBtn {
                            left: 50px;
                        }
                        .audioOut {
                            right: 35px;
                        }
                    }
                }
            }
            .goLast{
                position: absolute;
                width: 100%;
                height: 120px;
                left: 0;
                bottom:160px;
            }
        }
        .container1 {
            width: 100%;
            height: 100%;
            background: url("https://img.hongrenshuo.com.cn/h5/honey3h5-mycardbg-ymz.jpg") no-repeat center;
            background-size: 100% 100%;
            .listTop {
                width: 100%;
                height: 126px;
                background: #ffa443;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 45px;
                box-sizing: border-box;
                .listTop-left {
                    color: #fff;
                    font-size: 28px;
                    font-weight: 400;
                    line-height: 44px;
                    span {
                        color: #fff991;
                    }
                }
                .listTop-right {
                    width: 214px;
                    height: 79px;
                    text-align: center;
                    line-height: 79px;
                    font-weight: 400;
                    font-size: 28px;
                    background: url("https://img.hongrenshuo.com.cn/h5/honey3h5-btnright-ymz.png") no-repeat center;
                    background-size: 100%;
                    color: #ff994d;
                }
            }
            .list-content {
                padding: 22px 45px;
                box-sizing: border-box;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                position: relative;
                .shuline {
                    position: absolute;
                    width: 6px;
                    height: 100%;
                    /*background: #fff;*/
                    border-left: 6px dotted #fff;
                    box-sizing: border-box;
                    left: 50%;
                    margin-left: -3px;
                    top: 0;
                }
                .contentLi {
                    width: 260px;
                    height: 372px;
                    background: url("https://img.hongrenshuo.com.cn/h5/honey3h5-conlibg-ymz.png") no-repeat center;
                    background-size: 100%;
                    position: relative;
                    margin-top: 44PX;
                    .userInfoOut {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                        z-index: 300;
                        .userInfo {
                            text-align: center;
                            .headPic {
                                width: 125px;
                                height: 125px;
                                border: 1px solid #fff;
                                border-radius: 50%;
                                box-sizing: border-box;
                                margin: 0 auto;
                            }
                            .nickName {
                                font-size: 34px;
                                color: #3b3b3b;
                                font-weight: 400;
                                line-height: 1;
                                margin: 20px 0;
                            }
                            .secName {
                                line-height: 1;
                                color: #d26161;
                                font-size: 24px;
                            }
                        }
                    }
                    .norMal-bg {
                        width: 260px;
                        height: 361px;
                        background: url("https://img.hongrenshuo.com.cn/h5/honey3h5-conlino-ymz.png") no-repeat center;
                        background-size: 100%;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 100;
                    }
                    .cardImage {
                        width: 220px;
                        height: 330px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 100;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .cardImageBG {
                        width: 246px;
                        height: 240px;
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                        bottom: 0;
                        z-index: 200;
                        border: 1px solid #fff;
                        background: rgba(255, 227, 227, 0.9);
                        border-top: 0;
                        border-radius: 0 0 20px 20px;
                    }
                    .zuan {
                        position: absolute;
                        width: 55px;
                        height: 49px;
                    }
                    .zuan1 {
                        right: -98px;
                        top: 96px;
                    }
                    .zuan2 {
                        left: -98px;
                        bottom: 61px;
                    }
                    .line {
                        width: 50px;
                        height: 4px;
                        border-top: 4px dotted #fff;
                        box-sizing: border-box;
                        position: absolute;
                    }
                    .line1 {
                        right: -45px;
                        top: 117px;
                    }
                    .line2 {
                        left: -45px;
                        bottom: 89px;
                    }
                    .num{
                        width: 24px;
                        height: 24px;
                        border: 2px solid #3b3b3b;
                        border-radius: 50%;
                        position: absolute;
                        right: 50px;
                        bottom: 150px;
                        z-index: 200;
                        color: #3b3b3b;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
        .modal {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.6);
            z-index: 1000;
            .modalCon {
                width: 548px;
                height: 824px;
                position: relative;
                img {
                    width: 100%;
                    height: auto;
                    border-radius: 16px;
                }
                .closeIcon {
                    width: 90px;
                    height: 90px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
                .bottomDesc {
                    width: 100%;
                    padding: 30px 30px 20px;
                    box-sizing: border-box;
                    border-radius: 16px;
                    background: rgba(0, 0, 0, 0.5);
                    line-height: 34px;
                    font-size: 24px;
                    color: #fff;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    text-align: center;
                    .audioOut1 {
                        width: 198px;
                        height: 58px;
                        background: url('https://img.hongrenshuo.com.cn/h5/honey3h5-yuanjiaoBg-ymz.png') no-repeat center;
                        background-size: 100% 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 24px auto 0;
                        img {
                            width: 80%;
                            height: auto;
                        }
                    }
                }
            }
        }
        .modalappout {
            width: 649px;
            height: 398px;
            position: relative;
            .close {
                width: 100px;
                height: 100px;
                position: absolute;
                right: 0;
                top: 0;
            }
            img {
                width: 100%;
                height: auto;
            }
        }
        .goDownload {
            width: 100%;
            height: 80px;
            position: absolute;
            left: 0;
            bottom: 52px;
        }
        .modalwxchat {
            width: 649px;
            height: 502px;
            position: relative;
            .close {
                width: 100px;
                height: 100px;
                position: absolute;
                right: 0;
                top: 0;
            }
            img {
                width: 100%;
                height: auto;
            }
            .gofuzhi{
                position: absolute;
                left: 0;
                width: 100%;
                height: 100px;
                bottom: 230px;
            }
        }
        /*公用样式*/
        .goHome{
            width: 122px;
            height: 122px;
            position: fixed;
            top:80px;
            left: 30px;
            z-index: 300;
            img{
                width: 100%;
                height: auto;
            }
        }
        .goHome1{
            width: 122px;
            height: 122px;
            position: fixed;
            bottom:80px;
            right: 30px;
            z-index: 300;
            img{
                width: 100%;
                height: auto;
            }
        }
        .audioOut {
            width: 198px;
            height: 58px;
            background: url('https://img.hongrenshuo.com.cn/h5/honey3h5-yuanjiaoBg-ymz.png') no-repeat center;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            bottom: 30px;

            img {
                width: 80%;
                height: auto;
            }
        }
        .jackInTheBox {
            -webkit-animation-name: jackInTheBox;
            animation-name: jackInTheBox;
        }
        .animated {
            -webkit-animation-duration: 1s;
            animation-duration: 1s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }
        @-webkit-keyframes jackInTheBox {
            from {
                opacity: 0;
                -webkit-transform: scale(0.1) rotate(30deg);
                transform: scale(0.1) rotate(30deg);
                -webkit-transform-origin: center bottom;
                transform-origin: center bottom;
            }

            50% {
                -webkit-transform: rotate(-10deg);
                transform: rotate(-10deg);
            }

            70% {
                -webkit-transform: rotate(3deg);
                transform: rotate(3deg);
            }

            to {
                opacity: 1;
                -webkit-transform: scale(1);
                transform: scale(1);
            }
        }
    }
</style>

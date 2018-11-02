<template>
    <div id="app">
        <div v-show="!showWx" class="appin">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/counterattack-image.png`"></Onepic>
                <div class="rule" @click="goUrl(1)"></div>
                <div class="lookaward" @click="goUrl(2)"></div>
            </div>
            <div class="maincontent" :class="tips?'appin-bottom':''">

                <div class="slider-groupOut">
                    <div class="titleLi" :class="period == 1?'active-titleLi':''" @click="checkTab(1)">
                        <div class="time">10.26-10.27</div>
                        <div class="titleName ">海选赛</div>
                    </div>
                    <div class="titleLi" :class="period == 2?'active-titleLi':''" @click="checkTab(2)">
                        <div class="time">10.28-10.29</div>
                        <div class="titleName titleNameTwo">初赛</div>
                    </div>
                    <div class="titleLi" :class="period == 3?'active-titleLi':''" @click="checkTab(3)">
                        <div class="time">10.30</div>
                        <div class="titleName ">PK赛</div>
                    </div>
                    <div class="titleLi" :class="period == 4?'active-titleLi':''" @click="checkTab(4)">
                        <div class="time">10.31</div>
                        <div class="titleName titleNameTwo">决赛</div>
                    </div>
                </div>

                <div class="content-main">
                    <div class="content-list">

                        <div class="content-haixuan" v-show="period==1 || period==4">
                            <div class="contentLi-haixuan"
                                 @click="goRoom(item.roomId,item.uid)" v-for="(item,index) in dataList">
                                <div class="listicon" v-show="period==1">
                                    <img src="https://img.hongrenshuo.com.cn/h5/counterattack-top-icon.png"/>
                                </div>
                                <div class="topicon" v-show="period==4" v-if="index<3">
                                    <img :src="`https://img.hongrenshuo.com.cn/h5/counterattack-top${index+1}.png`"/>
                                </div>
                                <div class="listicon" v-show="period==4" v-else="index>2">
                                    <img src="https://img.hongrenshuo.com.cn/h5/counterattack-top-icon.png"/>
                                </div>
                                <div class="num">{{index + 1}}</div>
                                <div class="headPic">
                                    <img :src="item.headPic">
                                </div>
                                <div class="descContent">
                                    <div class="lineName">
                                        {{item.nickname}}
                                    </div>
                                    <div class="starNum">
                                        星力值：<span>{{item.score}}</span>
                                    </div>
                                </div>
                                <div class="vote-btn"></div>
                            </div>
                        </div>
                        <div class="content-chusai" v-show="period==2">
                            <div class="contentLi-chusai" v-for="(item,index) in dataList">
                                <div class="contentLi-chusai-show">
                                    <div class="contentLi-chusai-item">
                                        <div class="contentLi-group">
                                            <div class="group">第 {{item.group}} 组</div>
                                            <div class="group-number">团队星力值：{{item.totalScore}}</div>
                                        </div>
                                        <div class="group-header">
                                            <div class="header-item" v-for="(item,index) in item.member" @click="goRoom(item.roomId,item.uid)">
                                                <img :src="item.headPic"/>
                                            </div>
                                        </div>
                                        <div class="lookmore" @click="showmore(index)">
                                            <span v-if="index==limit">收起</span>
                                            <span v-else>查看更多</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="contentLi-item-bottom" v-show="index==limit">
                                    <div class="contentLi-haixuan"
                                         @click="goRoom(item.roomId,item.uid)" v-for="(item,index) in item.member">
                                        <div class="listicon" v-show="period==2">
                                            <img src="https://img.hongrenshuo.com.cn/h5/counterattack-top-icon.png"/>
                                        </div>
                                        <div class="topicon" v-show="period==1" v-if="index<3">
                                            <img :src="`https://img.hongrenshuo.com.cn/h5/counterattack-top${index+1}.png`"/>
                                        </div>
                                        <div class="listicon" v-show="period==1" v-else="index>2">
                                            <img src="https://img.hongrenshuo.com.cn/h5/counterattack-top-icon.png"/>
                                        </div>
                                        <div class="num">{{index + 1}}</div>
                                        <div class="headPic">
                                            <img :src="item.headPic">
                                        </div>
                                        <div class="descContent">
                                            <div class="lineName">
                                                {{item.nickname}}
                                            </div>
                                            <div class="starNum">
                                                星力值：<span>{{item.score}}</span>
                                            </div>
                                        </div>
                                        <div class="vote-btn"></div>
                                        <div class="weedout" v-show="item.isOut == 1">
                                            <img src="https://img.hongrenshuo.com.cn/h5/counterattack-weedout.png"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content-pk" v-show="period==3">
                            <div class="contentLi-chusai"  v-for="(item,index) in dataList">
                                <div class="contentLi-chusai-Bg"
                                     @click="goRoom(item.firstroomId,item.firstUid)">
                                    <div class="contentLi-chusai-in">
                                        <div class="nickName">
                                            {{item.firstnickname}}
                                        </div>
                                        <div class="headPic">
                                            <img :src="item.firstheadPic">
                                        </div>
                                        <div class="desc">
                                            星力值：<span>{{item.firstScore}}</span>
                                        </div>
                                    </div>
                                    <div class="victoryLeft" v-show="item.isWin == 1">
                                        <img src="https://img.hongrenshuo.com.cn/h5/counterattack-success.png">
                                    </div>
                                </div>
                                <div class="contentLi-chusai-middle">
                                    <div class="vs">
                                        <img src="https://img.hongrenshuo.com.cn/h5/counterattack-vs.png"
                                             alt="">
                                    </div>
                                </div>
                                <div class="contentLi-chusai-Bg bgRight"
                                     @click="goRoom(item.secondroomId,item.secondUid)">
                                    <div class="contentLi-chusai-in">
                                        <div class="nickName">
                                            {{item.secondnickname}}
                                        </div>
                                        <div class="headPic">
                                            <img :src="item.secondheadPic">
                                        </div>
                                        <div class="desc">
                                            星力值：<span>{{item.secondScore}}</span>
                                        </div>
                                    </div>
                                    <div class="victoryRight" v-show="item.isWin == 2">
                                        <img src="https://img.hongrenshuo.com.cn/h5/counterattack-success.png">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="loading-container" v-show="huancun">
                            <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                                 class="huancunGif">
                        </div>
                        <div  class="loading-container" v-show="!huancun && dataList.length == 0">
                            <div>
                                <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                                     class="emptyPng">
                                <div class="emptyTips">
                                    精彩赛事尚未开始
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="bottom" v-show="tips" v-html="tips" ref="tips" @click="goBottom()"></div>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'
    let shareTitle = '逆袭吧！潜力星';
    let shareDesc = '不甘平庸的你是时候展现真正的实力了~';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/counterattack-share.jpg';
    export default {
        data() {
            return {
                period: 1,
                pipe: 1,
                dataList: [],
                huancun: true,
                leftTitle: '',
                showWx: false,
                isEnd:false,
                tips: '',
                limit:-1
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        mounted() {
            this.getNowType();
            this.$nextTick(function () {
                window.addEventListener('scroll', this.handleScroll)
            });
        },
        methods: {
            goDeepLink: function (url) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = url;
                } else {
                    if (na.match(/micromessenger/i) && na.match(/(iphone|ipod|ios|ipad)/i)) {
                        this.showWx = true;
                    } else {
                        var data = {};
                        data.stage = 'kstar'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
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
            goBottom: function () {
                if (this.$refs.tips.innerText == '下载克拉克拉') {
                    let webrul = encodeURI('https://live.hongdoulive.com/Active/potentialStarIndex?showshare=1')
                    this.goDeepLink("uxinlive://webpage?url="+webrul);
                }
            },
            showmore:function(index){
                if (index==this.limit) {
                    this.limit=-1
                }else{
                    this.limit=index;
                }
            },
            goUrl: function (type) {
                if (type == 1) {
                    window.location.href = '/Rule/counterattack-rule';
                } else if (type == 2) {
                    let weburl = encodeURI("uxinlive://tagintegrate?tag_id=143289&tag_name=逆袭吧!潜力星&category_type=0&hot_new=0&ip_type=0")
                    this.goDeepLink(weburl);
                }
            },
            getRoomList: function () {
                this.dataList = [];
                this.huancun = true;
                this.tips = '';
                this.$axios.HttpGet('/Active/potentialStarList', {
                    period: this.period
                })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.code === 200) {
                            this.dataList = res.data.data.list;
                            this.huancun = false;
                            if(res.data.data.isEnd){
                                this.isEnd = res.data.data.isEnd;
                            }
                            if (na.match(/hongdoulive/i)) {
                                if (res.data.data.rankInfo) {
                                    this.tips = res.data.data.rankInfo;
                                }
                            } else {
                                this.tips = '下载克拉克拉';
                            }
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

            goRoom: function (roomid, uid) {
                if (roomid) {
                    if (na.match(/hongdoulive/i)) {
                        window.location.href = 'uxinlive://live?roomid=' + roomid + '&roomId=' + roomid;
                    } else {
                        window.location.href = 'http://m.hongdoufm.com/room/' + roomid;
                    }
                } else {
                    if (na.match(/hongdoulive/i)) {
                        window.location.href = 'uxinlive://userinfo?uid=' + uid;
                    } else {
                        window.location.href = 'https://live.hongdoulive.com/index/roomuser/uid/' + uid;
                    }
                }
            },
            checkTab: function (index) {
                console.log(this.huancun)
                if (this.huancun) {
                    return
                }
                if (index == this.period) {
                    return
                } else {
                    this.period = index
                }
                this.pipe = 1;
                this.getRoomList();
            },

            getNowType: function () {
                let nowTime = Date.parse(new Date()) / 1000;
//                let nowTime = 1535299211;

                let time1 = 1540483200; //10月26号0点
                let time2 = 1540656000; //10月28号0点
                let time3 = 1540828800; //10月30号0点
                let time4 = 1540915200; //10月31号0点

                if (nowTime < time2) { //海选
                    this.period = 1;
                } else if (nowTime <= time3 && nowTime > time2) { //初赛
                    this.period = 2;
                } else if (nowTime <= time4 && nowTime > time3) { //PK赛
                    this.period = 3;
                } else if (nowTime > time4) { //决赛
                    this.period = 4;
                }
                console.log(this.period);
//                获取数据
                this.getRoomList();
            },
            handleScroll: function () {
                this.scrollTop = this.scrollTop = window.pageYOffset || document.body.scrollTop
                if (this.scrollTop > 400) {
                    this.isActive = true
                } else {
                    this.isActive = false
                }
            }
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
            .topimageOut{
                width:100%;
                height:391px;
                position: relative;
                .rule{
                    width:50px;
                    height:50px;
                    position: absolute;
                    top:14px;
                    right:14px;
                }
                .lookaward{
                    width:145px;
                    height:40px;
                    position: absolute;
                    right:14px;
                    bottom:15px;
                }
            }
            .maincontent{
                width:100%;
                background:#f9c564 ;
                .slider-groupOut {
                    height: 65px;

                    display: flex;
                    padding:0 12px;
                    box-sizing: border-box;
                    justify-content: space-between;
                    .titleLi {
                        width: 88px;
                        height: 65px;
                        background: url("https://img.hongrenshuo.com.cn/h5/counterattack-switch.png") no-repeat center;
                        background-size: 100% 100%;
                        position: relative;
                        display: inline-block;

                        .time {
                            width: 100%;
                            text-align: center;
                            font-weight: 800;
                            height: 21px;
                            line-height: 21px;
                            font-size: 13px;
                            color: #863220;
                        }
                        .titleName {
                            width: 100%;
                            text-align: center;
                            font-weight: 600;
                            font-size: 20px;
                            color: #863220;
                            margin-top:12px;
                            padding-left:5px;
                            box-sizing: border-box;
                        }
                        .titleNameTwo {
                            letter-spacing: 10px;
                            padding-left:10px;
                        }

                        &.active-titleLi {
                            background: url("https://img.hongrenshuo.com.cn/h5/counterattack-switch-checked.png") no-repeat center;
                            background-size: 100% 100%;
                            .time {
                                color: #fff;
                                text-shadow: 1px 0 1px #863220,
                                            0 1px 1px #863220,
                                            -0 -1px 1px #863220,
                                            -1px 0 1px #863220;
                            }
                            .titleName {
                                color: #fff;
                                text-shadow: 1px 0 1px #863220,
                                            0 1px 1px #863220,
                                            -0 -1px 1px #863220,
                                            -1px 0 1px #863220;
                            }
                        }
                    }
                }
                .content-main {
                    width:100%;
                    padding:0 7px;
                    box-sizing: border-box;
                    .content-list {
                        width: 100%;
                        padding: 26px 5px 20px 5px;
                        box-sizing: border-box;
                        margin-top: 10px;
                        border:2px solid #97442a;
                        border-radius: 20px;
                        background:#c98177;
                        margin-top:-23px;
                        .loading-container {
                            width: 100%;
                            height: 300px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .huancunGif {
                                width: 40px;
                                height: 40px;
                            }
                            .emptyPng {
                                width: 131px;
                                height: 112px;
                            }
                            .emptyTips {
                                text-align: center;
                                line-height: 40px;
                                font-size: 14px;
                            }
                        }
                        .content-haixuan {
                            margin-top: 5px;
                            .contentLi-haixuan {
                                width: 100%;
                                height: 81px;
                                background: url("https://img.hongrenshuo.com.cn/h5/counterattack-haixuan-list.png") no-repeat center;
                                background-size: 100% 100%;
                                margin-top: 8px;
                                display: flex;
                                align-items: center;
                                color: #fff;
                                font-weight: 500;
                                font-size: 15px;
                                position: relative;
                                padding-right:8px;
                                box-sizing: border-box;
                                .victory {
                                    width: 45px;
                                    height: 42px;
                                    position: absolute;
                                    right: 0px;
                                    top: 0px;
                                }
                                &:nth-child(1) {
                                    margin-top: 0;
                                }
                                .num {
                                    width: 50px;
                                    text-align: center;
                                    margin-top:-15px;
                                }
                                .headPic {
                                    width: 60px;
                                    height: 60px;
                                    img {
                                        width: 100%;
                                        height: auto;
                                    }
                                }
                                .descContent {
                                    width: 0;
                                    padding: 0 10px;
                                    box-sizing: border-box;
                                    flex: 1;
                                    height: 100%;

                                    .lineName {
                                        line-height: 25px;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        margin-top:14px;
                                    }
                                    .lineDesc {
                                        font-size: 14px;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        line-height: 22px;
                                        font-weight: 400;
                                    }
                                    .starNum {
                                        color: #fff95f;
                                        font-size: 13px;
                                        line-height: 16px;
                                        font-weight: 300;
                                        margin-top:5px;
                                        span{
                                            font-size: 15px;
                                        }
                                    }
                                }
                                .vote-btn{
                                    width:97px;
                                    height:36px;
                                    background: url("https://img.hongrenshuo.com.cn/h5/counterattack-support.png") no-repeat center;
                                    background-size: 100% 100%;
                                }
                                .listicon{
                                    width:21px;
                                    height:35px;

                                    position: absolute;
                                    left:1px;
                                    bottom:2px;
                                    img{
                                        width:100%;
                                        height:100%;
                                    }
                                }
                                .topicon{
                                    width:35px;
                                    height:35px;

                                    position: absolute;
                                    left:-2px;
                                    bottom:2px;
                                    img{
                                        width:100%;
                                        height:100%;
                                    }
                                }
                            }
                        }
                        .content-chusai{
                            margin-top: 5px;
                            .contentLi-chusai{
                                width:100%;
                                margin-bottom: 12px;
                                .contentLi-chusai-show{
                                    width:100%;
                                    padding-right:10px;
                                    box-sizing: border-box;
                                    .contentLi-chusai-item{
                                        width:100%;
                                        height:80px;
                                        background: #fcb037;
                                        border:1px solid #863220;
                                        border-radius: 10px 10px 0 0;
                                        position: relative;
                                        padding:8px 10px 0 10px;
                                        box-sizing: border-box;
                                        position: relative;
                                        .contentLi-group{
                                            width:100%;
                                            display: flex;
                                            justify-content: space-between;
                                            color:#fff;
                                            font-size: 16px;
                                        }
                                        .group-header{
                                            width:245px;
                                            display: flex;
                                            justify-content: space-between;
                                            margin-top:8px;
                                            .header-item{
                                                width:32px;
                                                height:32px;
                                                border:1px solid #863220;
                                                border-radius: 50%;
                                                img{
                                                    width:100%;
                                                    height:100%;
                                                    border-radius: 50%;
                                                }
                                            }
                                        }
                                        .lookmore{
                                            width:85px;
                                            height:35px;
                                            border:1px solid #863220;
                                            font-size: 16px;
                                            color: #fff;
                                            text-shadow: 1px 0 1px #863220,
                                            0 1px 1px #863220,
                                            -0 -1px 1px #863220,
                                            -1px 0 1px #863220;
                                            text-align: center;
                                            border-radius: 0 10px 0 0;
                                            background: linear-gradient(to right, #ffc928 , #ff847c);
                                            position: absolute;
                                            right:-16px;
                                            bottom:-1px;
                                            line-height: 35px;
                                        }
                                    }

                                }
                                .contentLi-item-bottom{
                                    width:100%;
                                    background: #d9a7a0;
                                    border:1px solid #863220;
                                    box-shadow: 0 0 5px #863220 inset;
                                    padding:12px 4px;
                                    box-sizing: border-box;
                                    .contentLi-haixuan {
                                        width: 100%;
                                        height: 81px;
                                        background: url("https://img.hongrenshuo.com.cn/h5/counterattack-haixuan-list.png") no-repeat center;
                                        background-size: 100% 100%;
                                        margin-top: 8px;
                                        display: flex;
                                        align-items: center;
                                        color: #fff;
                                        font-weight: 500;
                                        font-size: 15px;
                                        position: relative;
                                        padding-right:8px;
                                        box-sizing: border-box;
                                        .victory {
                                            width: 45px;
                                            height: 42px;
                                            position: absolute;
                                            right: 0px;
                                            top: 0px;
                                        }
                                        &:nth-child(1) {
                                            margin-top: 0;
                                        }
                                        .num {
                                            width: 50px;
                                            text-align: center;
                                            margin-top:-15px;
                                        }
                                        .headPic {
                                            width: 60px;
                                            height: 60px;
                                            img {
                                                width: 100%;
                                                height: auto;
                                            }
                                        }
                                        .descContent {
                                            width: 0;
                                            padding: 0 10px;
                                            box-sizing: border-box;
                                            flex: 1;
                                            height: 100%;

                                            .lineName {
                                                line-height: 25px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;
                                                margin-top:14px;
                                            }
                                            .lineDesc {
                                                font-size: 14px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;
                                                line-height: 22px;
                                                font-weight: 400;
                                            }
                                            .starNum {
                                                color: #fff95f;
                                                font-size: 13px;
                                                line-height: 16px;
                                                font-weight: 300;
                                                margin-top:5px;
                                                span{
                                                    font-size: 15px;
                                                }
                                            }
                                        }
                                        .vote-btn{
                                            width:97px;
                                            height:36px;
                                            background: url("https://img.hongrenshuo.com.cn/h5/counterattack-support.png") no-repeat center;
                                            background-size: 100% 100%;
                                        }
                                        .listicon{
                                            width:21px;
                                            height:35px;

                                            position: absolute;
                                            left:1px;
                                            bottom:2px;
                                            img{
                                                width:100%;
                                                height:100%;
                                            }
                                        }
                                        .topicon{
                                            width:35px;
                                            height:35px;

                                            position: absolute;
                                            left:-2px;
                                            bottom:2px;
                                            img{
                                                width:100%;
                                                height:100%;
                                            }
                                        }
                                        .weedout{
                                            width:78px;
                                            height:78px;
                                            position: absolute;
                                            left:8px;
                                            top:2px;
                                            img{
                                                width:100%;
                                                height:100%;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        .content-pk {
                            margin-top: 5px;
                            .contentLi-chusai {
                                display: flex;
                                margin-top: 9px;
                                justify-content: space-between;
                                padding:0 5px;
                                box-sizing: border-box;
                                .contentLi-chusai-Bg {
                                    width: 150px;
                                    height: 186px;
                                    background: url("https://img.hongrenshuo.com.cn/h5/counterattack-pk-leftlist.png") no-repeat center;
                                    background-size: 100% 100%;
                                    position: relative;
                                    padding-right:20px;
                                    box-sizing: border-box;
                                    .victoryLeft, .victoryRight {
                                        position: absolute;
                                        left: 10px;
                                        top: 55px;
                                        width: 70px;
                                        height: 70px;
                                        img {
                                            width: 100%;
                                            height: auto;
                                        }
                                    }
                                    .victoryRight {
                                        left: auto;
                                        right:10px;
                                    }
                                    .contentLi-chusai-in {
                                        color: #fff;
                                        width: 100%;
                                        height: 100%;
                                        .nickName {
                                            width: 120px;
                                            text-align: center;
                                            font-size: 14px;
                                            line-height: 30px;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                            margin: 0 auto;
                                        }
                                        .headPic {
                                            width: 90px;
                                            height: 90px;
                                            margin: 5px auto;
                                            img {
                                                width: 100%;
                                                height: auto;
                                            }
                                        }
                                        .desc {
                                            padding: 0 8px;
                                            box-sizing: border-box;
                                            font-size: 12px;
                                            line-height: 15px;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            display: -webkit-box;
                                            -webkit-box-orient: vertical;
                                            -webkit-line-clamp: 2;
                                            text-align: center;
                                            height: 29px;
                                            color:#ffe77e;
                                            margin-top:6px;
                                            span{
                                                font-size: 16px;
                                            }
                                        }
                                        .starNum {
                                            color: #fff95f;
                                            font-size: 12px;
                                            line-height: 18px;
                                            text-align: center;
                                            margin-top: 4px;
                                        }
                                    }
                                }
                                .bgRight {
                                    background: url("https://img.hongrenshuo.com.cn/h5/counterattack-pk-rightlist.png") no-repeat center;
                                    background-size: 100% 100%;
                                    padding-right:0px;
                                    padding-left:20px;
                                }
                                .contentLi-chusai-middle {
                                    text-align: center;
                                    padding-top: 20px;
                                    box-sizing: border-box;
                                    position: absolute;
                                    left:50%;
                                    margin-left:-30px;
                                    .vs {
                                        width: 60px;
                                        height: 95px;
                                        img {
                                            width: 100%;
                                            height: auto;
                                        }
                                    }
                                    .chusai-day {
                                        margin: 30px auto 5px;
                                        color: #fff;
                                        font-size: 17px;
                                        font-weight: 500;
                                    }
                                    .chusai-time {
                                        font-size: 16px;
                                        color: #fdff70;

                                    }
                                }
                            }
                        }
                        .content-juesai {
                            margin-top: 5px;
                            .contentLi-juesai {
                                width: 342px;
                                height: 122px;
                                background: url("https://img.hongrenshuo.com.cn/h5/crowsZero-juesai-bg.png") no-repeat center;
                                background-size: 100% 100%;
                                display: flex;
                                align-items: center;
                                position: relative;
                                margin-top: 8px;
                                .ti {
                                    width: 6px;
                                    height: 43px;
                                    margin-left: 0px;
                                }
                                .num {
                                    font-size: 20px;
                                    margin-left: 2px;
                                    font-weight: 500;
                                    width: 24px;
                                    text-align: center;
                                }
                                .headpic {
                                    width: 70px;
                                    height: 70px;
                                    margin-left: 6px;
                                }
                                .desc {
                                    width: 0;
                                    flex: 1;
                                    margin-left: 8px;
                                    padding-right: 8px;
                                    box-sizing: border-box;
                                    .lineName {
                                        line-height: 22px;
                                        font-size: 15px;
                                        font-weight: 500;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        padding-bottom: 5px;
                                    }
                                    .lineDesc {
                                        font-size: 14px;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        line-height: 20px;
                                    }
                                    .starNum {
                                        color: #fff95f;
                                        font-size: 13px;
                                        line-height: 20px;
                                    }
                                }
                                .zhichi {
                                    width: 84px;
                                    height: 31px;
                                    position: absolute;
                                    right: 12px;
                                    bottom: 12px;
                                }
                                .guan {
                                    position: absolute;
                                    width: 30px;
                                    height: 30px;
                                    right: 6px;
                                    top: 6px;
                                    img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                            }
                        }
                        .content-fuhuo {
                            margin-top: 5px;
                            .contentLi-haixuan {
                                width: 100%;
                                height: 77px;
                                background: url("https://img.hongrenshuo.com.cn/h5/crowsZero-fuhuo-bg.png") no-repeat center;
                                background-size: 100% 100%;
                                margin-top: 5px;
                                display: flex;
                                align-items: center;
                                color: #fff;
                                font-weight: 500;
                                font-size: 15px;
                                position: relative;
                                .victory {
                                    width: 45px;
                                    height: 42px;
                                    position: absolute;
                                    right: -2px;
                                    top: -2px;
                                }
                                &:nth-child(1) {
                                    margin-top: 0;
                                }
                                .num {
                                    width: 45px;
                                    padding-left: 22px;
                                    box-sizing: border-box;
                                }
                                .headPic {
                                    width: 60px;
                                    height: 60px;
                                    img {
                                        width: 100%;
                                        height: auto;
                                    }
                                }
                                .descContent {
                                    width: 0;
                                    padding: 0 10px;
                                    box-sizing: border-box;
                                    flex: 1;
                                    height: 100%;
                                    padding-top: 5px;
                                    .lineName {
                                        line-height: 25px;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                    }
                                    .lineDesc {
                                        font-size: 14px;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        line-height: 22px;
                                        font-weight: 400;
                                    }
                                    .starNum {
                                        color: #fff95f;
                                        font-size: 13px;
                                        line-height: 16px;
                                        font-weight: 300;
                                    }
                                }
                            }
                        }
                        .content-jiazu {
                            position: relative;
                            margin-top: 5px;
                            .contentLi-jiazu {
                                width: 342px;
                                height: 132px;
                                background: url("https://img.hongrenshuo.com.cn/h5/crowsZero-jiazu-bg.png") no-repeat center;
                                background-size: 100% 100%;
                                margin: 0 auto;
                                margin-top: 10px;
                                position: relative;
                                .jinji {
                                    width: 73px;
                                    height: 72px;
                                    position: absolute;
                                    right: -5px;
                                    top: -4px;
                                }
                                .zuTop {
                                    display: flex;
                                    align-items: center;
                                    height: 35px;
                                    .zu {
                                        font-size: 16px;
                                        color: #fff;
                                        letter-spacing: 1px;
                                        font-weight: 500;
                                        width: 80px;
                                        text-align: center;
                                    }
                                    .starsNum {
                                        width: 194px;
                                        text-align: center;
                                        color: #f9dcb4;
                                        font-size: 14px;
                                        font-weight: 600;
                                    }
                                }
                                .zuContent {
                                    .zuContentOne {
                                        display: flex;
                                        align-items: center;
                                        margin-top: 15px;
                                        .leftsan {
                                            width: 14px;
                                            height: 26px;
                                            margin-left: 3px;
                                        }
                                        .headpic {
                                            width: 57px;
                                            height: 57px;
                                            margin-left: 10px;
                                        }
                                        .desc {
                                            margin-left: 10px;
                                            box-sizing: border-box;
                                            width: 230px;
                                            display: flex;
                                            align-items: center;
                                            justify-content: space-between;
                                            .lineName {
                                                line-height: 20px;
                                                font-weight: 500;
                                                font-size: 16px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;
                                            }
                                            .lineDesc {
                                                font-size: 12px;
                                                color: #f9dcb4;
                                                line-height: 22px;
                                                font-weight: 400;
                                            }
                                            .starNum {
                                                color: #fff95f;
                                                font-size: 12px;
                                                line-height: 16px;
                                                font-weight: 300;
                                            }
                                        }

                                    }
                                }
                                .guan {
                                    position: absolute;
                                    width: 30px;
                                    height: 30px;
                                    right: 6px;
                                    top: 6px;
                                    img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                            }
                            .contentLi-haixuan1 {
                                width: 100%;
                                height: 77px;
                                background: url("https://img.hongrenshuo.com.cn/h5/crowsZero-ranlist-quadrangle1.png") no-repeat center;
                                background-size: 100% 100%;
                                margin-top: 5px;
                                display: flex;
                                align-items: center;
                                color: #fff;
                                font-weight: 500;
                                font-size: 15px;
                                position: relative;
                                margin-top: 10px;
                                .victory {
                                    width: 45px;
                                    height: 42px;
                                    position: absolute;
                                    right: 0px;
                                    top: 0px;
                                }

                                .num {
                                    width: 35px;
                                    text-align: center;
                                }
                                .headPic {
                                    width: 60px;
                                    height: 60px;
                                    img {
                                        width: 100%;
                                        height: auto;
                                    }
                                }
                                .descContent {
                                    width: 0;
                                    padding: 0 10px;
                                    box-sizing: border-box;
                                    flex: 1;
                                    height: 100%;
                                    padding-top: 5px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                    .lineName {
                                        line-height: 25px;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                    }
                                    .lineDesc {
                                        font-size: 12px;
                                        color: #f9dcb4;

                                    }
                                    .starNum {
                                        color: #fff95f;
                                        font-size: 13px;
                                        line-height: 16px;
                                        font-weight: 300;
                                    }
                                }
                            }
                        }
                    }
                }
                .appin-bottom{
                    padding:13px 0 100px 0;
                }
            }
            .appin-bottom{
                padding-bottom: 100px;
            }
            .bottom {
                width: 360px;
                height: 60px;
                background: url("https://img.hongrenshuo.com.cn/h5/counterattack-bottom-btn.png") no-repeat center;
                background-size: 100% auto;
                text-align: center;
                line-height: 60px;
                position: fixed;
                z-index: 100;
                left: 50%;
                margin-left:-180px;
                bottom: 22.5px;
                font-size: 15px;
            }
        }

    }
</style>

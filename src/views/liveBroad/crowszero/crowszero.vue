<template>
    <div id="app">
        <div v-show="!showWx" class="appin">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/crowsZero-image1.png`"></Onepic>
                <div class="rule" @click="goUrl(1)"></div>
                <div class="lookaward" @click="goUrl(2)"></div>
            </div>
            <div class="maincontent">
                <div class="heng">
                    <span></span>
                </div>
                <div class="slider-groupOut">
                    <div class="slider-group" ref="sliderGroup" id="slider-group">
                        <div class="titleLi" :class="period == 1?'active-titleLi':''" @click="checkTab(1)">
                            <div class="time">10.21-10.23</div>
                            <div class="titleName titleNameTwo">海选</div>
                        </div>
                        <div class="titleLi" :class="period == 2?'active-titleLi':''" @click="checkTab(2)">
                            <div class="time">10.24-10.26</div>
                            <div class="titleName titleNameTwo">初赛</div>
                        </div>
                        <div class="titleLi" :class="period == 3?'active-titleLi':''" @click="checkTab(3)">
                            <div class="time">10.27</div>
                            <div class="titleName titleNameTwo">复赛</div>
                        </div>
                        <div class="titleLi" :class="period == 4?'active-titleLi':''" @click="checkTab(4)">
                            <div class="time">10.28</div>
                            <div class="titleName">复活赛</div>
                        </div>
                        <div class="titleLi" :class="period == 5?'active-titleLi':''" @click="checkTab(5)">
                            <div class="time">10.29</div>
                            <div class="titleName">半决赛</div>
                        </div>
                        <div class="titleLi" :class="period == 6?'active-titleLi':''" @click="checkTab(6)">
                            <div class="time">10.30</div>
                            <div class="titleName">决赛</div>
                        </div>
                    </div>
                </div>
                <div class="typecontent" :class="tips?'appin-bottom':''">
                    <div class="typename-content">
                        <div class="typename">
                            {{leftTitle}}
                        </div>
                        <div class="title-right" v-show="period==2">
                            <div class="one" :class="day == 1?'title-right-active':''"
                                 @click="checkTime(1)">
                                10.24
                                <div class="inline" v-show="day == 1"></div>
                            </div>
                            <div class="dot"></div>
                            <div class="one" :class="day == 2?'title-right-active':''"
                                 @click="checkTime(2)">
                                10.25
                                <div class="inline" v-show="day == 2"></div>
                            </div>
                            <div class="dot"></div>
                            <div class="one" :class="day == 3?'title-right-active':''"
                                 @click="checkTime(3)">
                                10.26
                                <div class="inline" v-show="day == 3"></div>
                            </div>
                        </div>
                    </div>

                    <div class="type-swich-content" v-show="period==2||period==3||period==4||period==5">
                        <div class="type-item type-item1" @click="checkPipe(1)" :class="pipe==1?'contentTop-Wrapper-active':''">天才班</div>
                        <div class="type-item type-item2" @click="checkPipe(2)" :class="pipe==2?'contentTop-Wrapper-active':''">火箭班</div>
                        <div class="type-item type-item3" @click="checkPipe(3)" :class="pipe==3?'contentTop-Wrapper-active':''">家族榜</div>
                    </div>
                    <div class="type-swich-content1" v-show="period==1">
                        <div class="type-item type-item1" @click="checkPipe(1)" :class="pipe==1?'contentTop-Wrapper-active':''">天才班</div>
                        <div class="type-item type-item3" @click="checkPipe(2)" :class="pipe==2?'contentTop-Wrapper-active':''">火箭班</div>
                    </div>
                    <div class="type-swich-content1" v-show="period==6">
                        <div class="type-item type-item1" @click="checkPipe(1)" :class="pipe==1?'contentTop-Wrapper-active':''">主播榜</div>
                        <div class="type-item type-item3" @click="checkPipe(3)" :class="pipe==3?'contentTop-Wrapper-active':''">家族榜</div>
                    </div>
                    <div class="integral-point-show" v-show="(period==2||period==3||period==4||period==5||period==6) && !huancun && pipe!=3" >
                        <div class="people-show">
                            <div class="people-show-item" v-for="(item,index) in winnerList">
                                <div class="time" v-if="index == 0">18点擂主</div>
                                <div class="time" v-else-if="index == 1">20点擂主</div>
                                <div class="time" v-else-if="index == 2">22点擂主</div>
                                <div class="time" v-else-if="index == 3">23点擂主</div>
                                <div class="people-head" v-if="item.headPic" @click="goRoom(item.roomId,item.uid)">
                                    <img :src="item.headPic">
                                </div>
                                <div class="people-head" v-else>
                                    <img src="https://img.hongrenshuo.com.cn/h5/crowsZero-nobody.png">
                                </div>
                                <div class="people-name" v-if="item.nickname">{{item.nickname}}</div>
                                <div class="people-name" v-else>虚位以待</div>
                            </div>

                        </div>
                    </div>
                    <div class="content-list">
                        <div class="content-haixuan" v-show="period==1 &&!family">
                            <div class="contentLi-haixuan"
                                 @click="goRoom(item.roomId,item.uid)" v-for="(item,index) in dataList">
                                <div class="num">{{index + 1}}</div>
                                <div class="headPic">
                                    <img :src="item.headPic">
                                </div>
                                <div class="descContent">
                                    <div class="lineName">
                                        {{item.nickname}}
                                    </div>
                                    <div class="lineDesc">
                                        {{item.introduction}}
                                    </div>
                                    <div class="starNum">
                                        积分：{{item.score}}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="content-chusai" v-show="(period==2||period==3||period==5)&&!family">
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
                                            {{item.firstintroduction || '暂无简介'}}
                                        </div>
                                        <div class="starNum">
                                            积分：{{item.firstScore}}
                                        </div>
                                    </div>
                                    <div class="victoryLeft" v-show="item.isWin == 1">
                                        <img src="https://img.hongrenshuo.com.cn/h5/kstar-con2yepleft-ymz.png">
                                    </div>
                                </div>
                                <div class="contentLi-chusai-middle">
                                    <div class="vs">
                                        <img src="https://img.hongrenshuo.com.cn/h5/kstar-vs-ymz.png"
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
                                            {{item.secondintroduction || '暂无简介'}}
                                        </div>
                                        <div class="starNum">
                                            积分：{{item.secondScore}}
                                        </div>
                                    </div>
                                    <div class="victoryRight" v-show="item.isWin == 2">
                                        <img src="https://img.hongrenshuo.com.cn/h5/kstar-con2yepright-ymz.png">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="content-juesai" v-show="period==6 && !family">
                            <div class="contentLi-juesai" v-for="(item,index) in dataList">
                                <div class="ti" v-if="index<3">
                                    <img :src="`https://img.hongrenshuo.com.cn/h5/kstar-tixing${index+1}-ymz.png`">
                                </div>
                                <div class="ti" v-else="index>2">
                                    <img src="https://img.hongrenshuo.com.cn/h5/kstar-tixing-ymz.png">
                                </div>
                                <div class="num">{{index + 1}}</div>
                                <div class="headpic" @click="goRoom(item.roomId,item.uid)">
                                    <img :src="item.headPic">
                                </div>
                                <div class="desc">
                                    <div class="lineName">
                                        {{item.nickname}}
                                    </div>
                                    <div class="lineDesc">
                                        {{item.introduction}}
                                    </div>
                                    <div class="starNum">
                                        星势值：{{item.score}}
                                    </div>
                                </div>
                                <div class="zhichi" @click="goRoom(item.roomId,item.uid)">
                                    <img src="https://img.hongrenshuo.com.cn/h5/crowsZero-support.png"
                                         alt="">
                                </div>
                                <div class="guan" v-if="index<3">
                                    <img :src="`https://img.hongrenshuo.com.cn/h5/kstar-guan${index+1}-ymz.png`">
                                </div>
                            </div>
                        </div>

                        <div class="content-fuhuo" v-show="period==4 && !family">
                            <div class="contentLi-haixuan"
                                 @click="goRoom(item.roomId,item.uid)" v-for="(item,index) in dataList">
                                <div class="num">{{index + 1}}</div>
                                <div class="headPic">
                                    <img :src="item.headPic">
                                </div>
                                <div class="descContent">
                                    <div class="lineName">
                                        {{item.nickname}}
                                    </div>
                                    <div class="lineDesc">
                                        {{item.introduction || '暂无简介'}}
                                    </div>
                                    <div class="starNum">
                                        积分：{{item.score}}
                                    </div>
                                </div>
                                <div class="victory"  v-if="index<2 && isEnd">
                                    <img src="https://img.hongrenshuo.com.cn/h5/kstar-success-ymz.png">
                                </div>
                            </div>
                        </div>

                        <div class="content-jiazu" v-show="family">
                            <div  v-for="(item,index) in familyList">
                                <div class="contentLi-jiazu" v-if="item.sort<4">

                                        <div class="guan" v-if="item.sort<4">
                                            <img :src="`https://img.hongrenshuo.com.cn/h5/kstar-guan${item.sort}-ymz.png`">
                                        </div>
                                        <div class="zuTop">
                                            <div class="zu">{{item.sort}}</div>
                                            <div class="starsNum">
                                                荣耀家族
                                            </div>
                                        </div>
                                        <div class="zuContent">
                                            <div class="zuContentOne">
                                                <div class="leftsan"><img
                                                        src="https://img.hongrenshuo.com.cn/h5/crowsZero-fuhuo-san.png"></div>
                                                <div class="headpic"><img
                                                        v-lazy="item.picture" >
                                                </div>
                                                <div class="desc">
                                                    <div class="lineName">{{item.familyName}}</div>
                                                    <div class="lineDesc">家族票：{{item.score}}</div>
                                                </div>

                                            </div>

                                        </div>
                                </div>
                                <div class="contentLi-haixuan1" v-else="item.sort>3">
                                    <div class="num">{{item.sort}}</div>
                                    <div class="headPic">
                                        <img v-lazy="item.picture" >
                                    </div>
                                    <div class="descContent">
                                        <div class="lineName">
                                            {{item.familyName}}
                                        </div>
                                        <div class="lineDesc">
                                            家族票：{{item.score}}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="loading-container" v-show="huancun">
                            <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                                 class="huancunGif">
                        </div>
                        <div  class="loading-container" v-show="!huancun && dataList.length == 0 && !family">
                            <div>
                                <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                                     class="emptyPng">
                                <div class="emptyTips">
                                    精彩赛事尚未开始
                                </div>
                            </div>
                        </div>
                        <div  class="loading-container" v-show="!huancun && familyList.length == 0 && family">
                            <div>
                                <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                                     class="emptyPng">
                                <div class="emptyTips">
                                    家族榜单暂未开启
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
    let shareTitle = '热血高校分班大作战';
    let shareDesc = '全新玩法丰厚奖励，小耳朵们快来为自己的主播荣耀加油助力吧~';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/crowsZero-share.png';
    export default {
        data() {
            return {
                period: 1,
                pipe: 1,
                day: 1,
                dataList: [],
                winnerList:[],
                familyList:[],
                huancun: true,
                leftTitle: '',
                showWx: false,
                isEnd:false,
                family:false,
                tips: '',
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
                if (this.$refs.tips.innerText == '我要去支持我喜欢的豆咖') {
                    this.goDeepLink("uxinlive://webpage?url=https%3A%2F%2Flive.hongdoulive.com%2FUnionActive%2FguoguanIndex%3Fshowshare%3D1");
                }
            },
            goUrl: function (type) {
                if (type == 1) {
                    window.location.href = '/Active/crowszerorule';
                } else if (type == 2) {
                    window.location.href = '/Active/crowszerorule1';
                }
            },
            getRoomList: function () {
                this.dataList = [];
                this.huancun = true;
                this.tips = '';
                this.$axios.HttpGet('/Active/crowsZeroList', {
                    period: this.period,
                    pipe: this.pipe,
                    day: this.day
                })
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.code === 200) {
                            this.dataList = res.data.data.list;
                            this.winnerList = res.data.data.winnerList
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
            getfamilyList:function(){
                this.familyList = [];
                this.huancun = true;
                this.$axios.HttpGet('/Active/crowsZeroFamilyList', {

                }).then((res) => {
                        console.log(res.data);
                        this.familyList = res.data.data;
                        this.huancun = false;

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
                this.tabDataChange(this.period);
                this.pipe = 1;
                this.day = 1;
                this.family = false;
                this.getRoomList();
            },
            checkPipe: function (index) {
                if(this.huancun){
                    return
                }
                console.log(index)
                if (index == this.pipe) {
                    return
                } else {
                    this.pipe = index;
                    if(index == 1 || index == 2){
                        console.log(index)
                        this.getRoomList();
                        this.family = false;
                    }else{
                        this.family = true;
                        this.getfamilyList();
                    }

                }
            },
            checkTime: function (index) {
                if(this.huancun){
                    return
                }
                if (index == this.day) {
                    return
                } else {
                    this.day = index
                    this.getRoomList();
                }
            },
            tabDataChange(type) {
                if (type == 1) {
                    this.leftTitle = '海选赛';
                } else if (type == 2) {
                    this.leftTitle = '32进16';
                } else if (type == 3) {
                    this.leftTitle = '16进8';
                } else if (type == 4) {
                    this.leftTitle = '复活赛';
                } else if (type == 5) {
                    this.leftTitle = '10进5';
                } else if (type == 6) {
                    this.leftTitle = '决赛';
                }
            },
            getNowType: function () {
                let nowTime = Date.parse(new Date()) / 1000;
//                let nowTime = 1535299211;

                let time1 = 1540310400; //10月24号0点
                let time2 = 1540396800; //10月25号0点
                let time3 = 1540483200; //10月26号0点
                let time4 = 1540569600; //10月27号0点
                let time5 = 1540656000; //10月28号0点
                let time6 = 1540742400; //10月29号0点
                let time7 = 1540828800; //10月30号0点


                if (nowTime <= time2 && nowTime > time1) { //8.24
                    this.day = 1;
                }else if (nowTime <= time3 && nowTime > time2) { //8.25
                    this.day = 2;
                }else if(nowTime > time3){//8.26
                    this.day = 3;
                }


                if (nowTime < time1) { //海选
                    this.period = 1;
                } else if (nowTime <= time4 && nowTime > time1) { //初赛
                    this.period = 2;
                } else if (nowTime <= time5 && nowTime > time4) { //复赛
                    this.period = 3;
                } else if (nowTime <= time6 && nowTime > time5) { //复活赛
                    this.period = 4;
                } else if (nowTime <= time7 && nowTime > time6) { //半决赛
                    this.period = 5;
                    this.$nextTick(() => {
                        this.$refs.sliderGroup.scrollLeft = 400;
                    })
                } else if (nowTime > time7) { //决赛
                    this.period = 6;
                    this.$nextTick(() => {
                        this.$refs.sliderGroup.scrollLeft = 400;
                    })
                }
                console.log(this.period)
                this.tabDataChange(this.period);
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
                height:758px;
                position: relative;
                .rule{
                    width:100px;
                    height:34px;
                    position: absolute;
                    top:29px;
                    right:29px;
                }
                .lookaward{
                    width:190px;
                    height:38px;
                    position: absolute;
                    left:50%;
                    margin-left:-95px;
                    bottom:1px;
                }
            }
            .maincontent{
                width:100%;
                background: url("https://img.hongrenshuo.com.cn/h5/crowsZero-cententbg.png");
                background-size: 100% auto;
                background-repeat: repeat-y;
                padding-top:15px;
                .heng{
                    width:100%;
                    height:5px;
                    background: rgba(0,0,0,0.2);
                    position: relative;
                    span{
                        width: 0;
                        height: 0;
                        border-left: 60px solid transparent;
                        border-right: 60px solid transparent;
                        border-bottom: 8px solid rgba(0,0,0,0.2);
                        position: absolute;
                        top: -8px;
                        right: 130px;

                    }
                }
                .slider-groupOut {
                    height: 64px;
                    overflow: hidden;
                    background: rgba(0,0,0,0.2);
                    padding-top:6px;
                    box-sizing: border-box;
                    margin-top:2.5px;
                    .slider-group {
                        width: 100%;
                        height: 110%;
                        overflow-x: scroll;
                        overflow-y: hidden;
                        -webkit-overflow-scrolling: touch;
                        float: left;
                        white-space: nowrap;
                        .titleLi {
                            width: 77.5px;
                            height: 52.5px;
                            background: url("https://img.hongrenshuo.com.cn/h5/crowsZero-rankitem.png") no-repeat center;
                            background-size: 100% 100%;
                            position: relative;
                            display: inline-block;

                            .time {
                                width: 77.5px;
                                text-align: center;
                                font-weight: 700;
                                height: 24px;
                                line-height: 24px;
                                font-size: 13px;
                                color: #6d3c40;
                                margin-top:3px;
                            }
                            .titleName {
                                width: 77.5px;
                                text-align: center;
                                font-weight: 700;
                                font-size: 20px;
                                color: #6d3c40;
                            }
                            .titleNameTwo {
                                letter-spacing: 4px;
                                left: 1px;
                            }
                            &:nth-child(1) {
                                margin-left: 0;
                            }
                            &.active-titleLi {
                                background: url("https://img.hongrenshuo.com.cn/h5/crowsZero-rankitem-checked.png") no-repeat center;
                                background-size: 100% 100%;
                                .time {
                                    color: #6d3c40;
                                }
                                .titleName {
                                    color: #6d3c40;
                                }
                            }
                        }
                    }
                    .slider-group::-webkit-scrollbar {
                        display: none
                    }
                }
                .typecontent{
                    width:100%;
                    background: rgba(0,0,0,0.2);
                    margin-top:4px;
                    padding:13px 0 40px 0;
                    .typename-content{
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 20px;
                        box-sizing: border-box;
                        font-size: 18px;
                        font-weight: 500;
                        .title-right {
                            color: #6d3c40;
                            display: flex;
                            align-items: center;
                            .dot {
                                width: 5px;
                                height: 5px;
                                border-radius: 50%;
                                background: #6d3c40;
                                margin: 0 5px;
                            }
                            .one {
                                position: relative;
                                .inline {
                                    position: absolute;
                                    width: 12px;
                                    height: 4px;
                                    border-radius: 2px;
                                    background: #fff;
                                    bottom: -8px;
                                    left: 50%;
                                    margin-left: -6px;
                                }
                            }
                            .title-right-active {
                                color: #fff;
                            }
                        }
                    }

                    .type-swich-content,.type-swich-content1{
                        width:100%;
                        padding:0 17px;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: space-between;
                        margin-top:17px;
                        .type-item{
                            font-size: 18px;
                            color:rgba(109,60,64,0.35);
                            text-align: center;
                            line-height: 36px;
                            height:35px;
                            box-sizing: border-box;
                            font-weight: 500;
                        }
                        .type-item1{
                            width:117px;
                            background-image: url("https://img.hongrenshuo.com.cn/h5/crowsZero-typeleft.png");
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                            text-align: left;
                            padding-left:45px;


                        }
                        .type-item1.contentTop-Wrapper-active{
                            background-image: url("https://img.hongrenshuo.com.cn/h5/crowsZero-typeleft-checked.png");
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                            color:rgb(109,60,64);
                        }
                        .type-item2{
                            width:98px;
                            background-image: url("https://img.hongrenshuo.com.cn/h5/crowsZero-typecenter.png");
                            background-repeat: no-repeat;
                            background-size: 100% 100%;

                        }
                        .type-item2.contentTop-Wrapper-active{
                            background-image: url("https://img.hongrenshuo.com.cn/h5/crowsZero-typecenter-checked.png");
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                            color:rgb(109,60,64);
                        }
                        .type-item3{
                            width:117px;
                            background-image: url("https://img.hongrenshuo.com.cn/h5/crowsZero-typeright.png");
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                            text-align: right;
                            padding-right:45px;

                        }
                        .type-item3.contentTop-Wrapper-active{
                            background-image: url("https://img.hongrenshuo.com.cn/h5/crowsZero-typeright-checked.png");
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                            color:rgb(109,60,64);
                        }
                    }
                    .type-swich-content1{
                        padding:0 67px;
                    }
                    .integral-point-show{
                        width:343px;
                        height:184px;
                        background: url("https://img.hongrenshuo.com.cn/h5/crowsZero-show.png");
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        margin:8px auto 0;
                        padding-top:44px;
                        box-sizing: border-box;
                        .people-show{
                            width:100%;
                            padding:0 10px;
                            box-sizing: border-box;
                            display: flex;
                            justify-content: space-around;
                            .people-show-item{
                                width:65px;
                                .time{
                                    width:65px;
                                    height:25px;
                                    -webkit-border-radius: 10px;
                                    -moz-border-radius: 10px;
                                    border-radius: 10px;
                                    background: #895559;
                                    text-align: center;
                                    color: #ffffff;
                                    font-size: 13px;
                                    line-height: 25px;
                                }
                                .people-head{
                                    width:60px;
                                    height:60px;
                                    border:1px solid #895559;
                                    margin:5px auto 0;
                                    img{
                                        width:100%;
                                        height:100%;

                                    }
                                }
                                .people-name{
                                    font-size: 14px;
                                    color:#895559;
                                    text-align: center;
                                    width:100%;
                                    line-height: 18px;
                                    font-weight: 500;
                                    margin-top:4px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    -webkit-line-clamp: 2;
                                    -moz-line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                    -moz-box-orient: vertical;
                                    display: -webkit-box;

                                }
                            }
                        }
                    }
                    .content-list{
                        width:100%;
                        padding:0 18px;
                        box-sizing: border-box;
                        margin-top:10px;
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
                            margin-top:5px;
                            .contentLi-haixuan {
                                width: 100%;
                                height: 77px;
                                background: url("https://img.hongrenshuo.com.cn/h5/crowsZero-ranlist-quadrangle.png") no-repeat center;
                                background-size: 100% 100%;
                                margin-top: 5px;
                                display: flex;
                                align-items: center;
                                color: #fff;
                                font-weight: 500;
                                font-size: 15px;
                                position: relative;
                                .victory{
                                    width: 45px;
                                    height: 42px;
                                    position: absolute;
                                    right: 0px;
                                    top:0px;
                                }
                                &:nth-child(1) {
                                    margin-top: 0;
                                }
                                .num {
                                    width:35px;
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
                        .content-chusai {
                            margin-top:5px;
                            .contentLi-chusai {
                                display: flex;
                                margin-top: 9px;
                                .contentLi-chusai-Bg {
                                    width: 141px;
                                    height: 214px;
                                    background: url("https://img.hongrenshuo.com.cn/h5/crowsZero-chusai-bg.png") no-repeat center;
                                    background-size: 100% 100%;
                                    position: relative;
                                    .victoryLeft, .victoryRight {
                                        position: absolute;
                                        right: 2px;
                                        top: 2px;
                                        width: 72.5px;
                                        height: 72.5px;
                                        img {
                                            width: 100%;
                                            height: auto;
                                        }
                                    }
                                    .victoryRight {
                                        left: 2px;
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
                                        }
                                        .starNum {
                                            color: #fff95f;
                                            font-size: 12px;
                                            line-height: 18px;
                                            text-align: center;
                                            margin-top:4px;
                                        }
                                    }
                                }
                                .bgRight {
                                    background: url("https://img.hongrenshuo.com.cn/h5/crowsZero-chusai-bg.png") no-repeat center;
                                    background-size: 100% 100%;
                                }
                                .contentLi-chusai-middle {
                                    text-align: center;
                                    padding-top: 60px;
                                    box-sizing: border-box;
                                    .vs {
                                        width: 59px;
                                        height: 50px;
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
                            margin-top:5px;
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
                                    width:24px;
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
                                    padding-right:8px;
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
                                    img{
                                        width:100%;
                                        height:100%;
                                    }
                                }
                            }
                        }
                        .content-fuhuo {
                            margin-top:5px;
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
                                .victory{
                                    width: 45px;
                                    height: 42px;
                                    position: absolute;
                                    right: -2px;
                                    top:-2px;
                                }
                                &:nth-child(1) {
                                    margin-top: 0;
                                }
                                .num {
                                    width:45px;
                                    padding-left:22px;
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
                            margin-top:5px;
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
                                                color:#f9dcb4;
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
                                    img{
                                        width:100%;
                                        height:100%;
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
                                .victory{
                                    width: 45px;
                                    height: 42px;
                                    position: absolute;
                                    right: 0px;
                                    top:0px;
                                }

                                .num {
                                    width:35px;
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
                                        color:#f9dcb4;

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
            .bottom {
                width: 360px;
                height: 60px;
                background: url("https://img.hongrenshuo.com.cn/h5/crowsZero-bottom-btn.png") no-repeat center;
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

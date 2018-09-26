<template>
    <div id="app">
        <div v-show="!showWx" class="appin" :class="tips?'appin-bottom':''">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/killguan-topimage-ymz.png`"></Onepic>
                <div class="rule" @click="goUrl(1)"></div>
                <div class="jiangli" @click="goUrl(2)"></div>
                <div class="seeAll" @click="goUrl(3)"></div>
            </div>
            <div class="bottom" v-show="tips" v-html="tips" ref="tips" @click="goBottom()"></div>
            <div class="goTop" @click.stop="scrollToTop()" v-show="isActive">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/killguan-goTop-ymz.png`"></Onepic>
            </div>
            <div class="slider">
                <div class="slider-groupOut">
                    <div class="slider-group" ref="sliderGroup" id="slider-group">
                        <div class="titleLi" :class="type == 1?'active-titleLi':''" @click="checkTab(1)">
                            <div class="time">9.23-9.24</div>
                            <div class="titleName titleNameTwo">海选</div>
                        </div>
                        <div class="titleLi" :class="type == 2?'active-titleLi':''" @click="checkTab(2)">
                            <div class="time">9.25</div>
                            <div class="titleName titleNameTwo">初赛</div>
                        </div>
                        <div class="titleLi" :class="type == 3?'active-titleLi':''" @click="checkTab(3)">
                            <div class="time">9.26</div>
                            <div class="titleName titleNameTwo">复赛</div>
                        </div>
                        <div class="titleLi" :class="type == 4?'active-titleLi':''" @click="checkTab(4)">
                            <div class="time">9.27</div>
                            <div class="titleName">踢馆赛</div>
                        </div>
                        <div class="titleLi" :class="type == 5?'active-titleLi':''" @click="checkTab(5)">
                            <div class="time">9.28</div>
                            <div class="titleName">半决赛</div>
                        </div>
                        <div class="titleLi" :class="type == 6?'active-titleLi':''" @click="checkTab(6)">
                            <div class="time">9.29</div>
                            <div class="titleName">决赛</div>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="contentIn">
                        <div class="contentTop">
                            <div class="contentTitle">
                                {{leftTitle}}
                            </div>
                            <div class="content-list">
                                <div class="content-haixuan" v-if="type!=4">
                                    <div class="topMoney" v-show="dataList.length>0">
                                        <div class="money">
                                            <p class="p1">红豆奖励</p>
                                            <p class="p2">{{moneyTitle}}</p>
                                        </div>
                                        <div class="touOut" v-show="dataList.length != 0">
                                            <div class="tou" v-for="(item,index) in dataList" v-if="index<3" :class="`tou${index+1}`">
                                                <div class="headPic" @click="goRoom(item.roomId,item.uid)">
                                                    <img :src="item.headPic">
                                                    <div :class="`guan${index+1}`"></div>
                                                </div>
                                                <div class="desc">
                                                    <div class="nickName dotted">{{item.nickname}}</div>
                                                    <div class="piao dotted">人气票：{{item.score}}</div>
                                                </div>
                                                <div class="goPiao" @click="goRoom(item.roomId,item.uid)"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="contentLi-haixuan" v-for="(item,index) in dataList" v-if="index>2"
                                         @click="goRoom(item.roomId,item.uid)">
                                        <div class="num">{{index + 1}}</div>
                                        <div class="headPic">
                                            <img :src="item.headPic">
                                        </div>
                                        <div class="descContent">
                                            <div>
                                                <div class="lineName">
                                                    {{item.nickname}}
                                                </div>
                                                <div class="starNum">
                                                    人气票：{{item.score}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="gopiao"></div>
                                        <div class="victory" v-show="item.isWin == true">
                                            <img src="https://img.hongrenshuo.com.cn/h5/killguan-jinji-ymz.png">
                                        </div>
                                    </div>
                                </div>
                                <div class="content-haixuan" v-else>
                                    <div class="topMoney topMoney1" v-show="dataList.length>0">
                                        <div class="money">
                                            <p class="p1">红豆奖励</p>
                                            <p class="p2">{{moneyTitle}}</p>
                                        </div>
                                    </div>
                                    <div class="contentLi-haixuan" v-for="(item,index) in dataList"
                                         @click="goRoom(item.roomId,item.uid)">
                                        <div class="num">{{index + 1}}</div>
                                        <div class="headPic">
                                            <img :src="item.headPic">
                                        </div>
                                        <div class="descContent">
                                            <div>
                                                <div class="lineName">
                                                    {{item.nickname}}
                                                </div>
                                                <div class="starNum">
                                                    人气票：{{item.score}}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="gopiao"></div>
                                        <div class="victory" v-show="item.isWin == true">
                                            <img src="https://img.hongrenshuo.com.cn/h5/killguan-jinji-ymz.png">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-show="huancun" class="loading-container">
                                <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                                     class="huancunGif">
                            </div>
                            <div v-show="!huancun && dataList.length == 0" class="loading-container">
                                <div>
                                    <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                                         class="emptyPng">
                                    <div class="emptyTips">
                                        暂无数据
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tagtips">
                本活动最终解释权利归克拉克拉所有
            </div>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'
    let shareTitle = '克拉克拉过关斩将';
    let shareDesc = '秋风起，战鼓响，参加过关斩将活动海量经验送不停~';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/killguan-wxshare-ymz.jpg';
    export default {
        data() {
            return {
                type: 1,
                leftTitle: '',
                tips: '',
                isActive: false,
                dataList: [],
                huancun: true,
                showWx: false,
                moneyTitle:'第一名：200000   第二名：1300000   第三名：700000'
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
                    window.location.href = '/Rule/killmanrule?showshare=1';
                } else if (type == 2) {
                    window.location.href = '/Rule/killmanjl?showshare=1';
                } else {
                    this.goDeepLink('uxinlive://tagintegrate?tag_id=113689&tag_name=克拉克拉过关斩将&category_type=1&hot_new=0');
                }
            },
            getRoomList: function () {
                this.dataList = [];
                this.huancun = true;
                this.tips = '';
                this.$axios.HttpGet('/unionActive/guoguanList', {
                    period: this.type
                })
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.code === 200) {
                            this.dataList = res.data.data.list;
                            this.huancun = false;
                            if (na.match(/hongdoulive/i)) {
                                if (res.data.data.rankInfo) {
                                    this.tips = res.data.data.rankInfo;
                                }
                            } else {
                                this.tips = '我要去支持我喜欢的豆咖';
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
                if (this.huancun) {
                    return
                }
                this.moneyTitle = '';
                if (index == this.type) {
                    return
                } else {
                    this.type = index
                }
                this.tabDataChange(this.type);
                this.getRoomList();
            },
            tabDataChange(type) {
                if (type == 1) {
                    this.leftTitle = '角逐32强';
                    this.moneyTitle = '第一名：200000   第二名：130000   第三名：70000'
                } else if (type == 2) {
                    this.leftTitle = '32进16';
                    this.moneyTitle = '第一名：300000   第二名：200000   第三名：100000'
                } else if (type == 3) {
                    this.leftTitle = '16进8';
                    this.moneyTitle = '第一名：500000   第二名：300000   第三名：200000'
                } else if (type == 4) {
                    this.leftTitle = '8进2';
                    this.moneyTitle = '第一名：200000   第二名：100000'
                } else if (type == 5) {
                    this.leftTitle = '10进6';
                    this.moneyTitle = '第一名：700000   第二名：500000   第三名：300000'
                } else if (type == 6) {
                    this.leftTitle = '6进3';
                    this.moneyTitle = '第一名：2000000   第二名：1000000   第三名：500000'
                }
            },
            getNowType: function () {
                let nowTime = Date.parse(new Date()) / 1000;
                let time1 = 1537632000; //9月23号0点
                let time2 = 1537718400; //9月24号0点
                let time3 = 1537804800; //9月25号0点
                let time4 = 1537891200; //9月26号0点
                let time5 = 1537977600; //9月27号0点
                let time6 = 1538064000; //9月28号0点
                let time7 = 1538150400; //9月29号0点
                if (nowTime < time2) { //海选
                    this.type = 1;
                } else if (nowTime <= time4 && nowTime > time3) { //初赛
                    this.type = 2;
                } else if (nowTime <= time5 && nowTime > time4) { //复赛
                    this.type = 3;
                    this.$nextTick(() => {
                        this.$refs.sliderGroup.scrollLeft = 400;
                    })
                } else if (nowTime <= time6 && nowTime > time5) {  //踢馆赛
                    this.type = 4;
                    this.$nextTick(() => {
                        this.$refs.sliderGroup.scrollLeft = 400;
                    })
                } else if (nowTime <= time7 && nowTime > time6) {  //半决赛
                    this.type = 5;
                    this.$nextTick(() => {
                        this.$refs.sliderGroup.scrollLeft = 400;
                    })
                } else if (nowTime > time7){ //决赛
                    this.type = 6;
                    this.$nextTick(() => {
                        this.$refs.sliderGroup.scrollLeft = 400;
                    })
                }
                this.tabDataChange(this.type);
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
        background: url("https://img.hongrenshuo.com.cn/h5/killguan-bgImage-ymz.png") repeat center;
        background-size: 100% 100px;
        img {
            width: 100%;
            height: auto;
        }
        .dotted{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .appin {
            box-sizing: border-box;
            padding-bottom: 50px;
        }
        .appin-bottom {
            padding-bottom: 105px;
            position: relative;
        }
        .rule, .jiangli, .seeAll {
            height: 100px;
            width: 100px;
            position: absolute;

        }
        .rule{
            right: 15px;
            top: 320px;
        }
        .jiangli{
            left: 190px;
            bottom: 142px;
        }
        .seeAll{
            right: 6px;
            bottom: 15px;
        }
        .topimageOut {
            width: 100%;
            height: 1071px;
            position: relative;
        }
        .bottom {
            width: 100%;
            height: 60px;
            background: url("https://img.hongrenshuo.com.cn/h5/killguan-bottomBg-ymz.png") no-repeat center;
            background-size: 100% 100%;
            text-align: center;
            line-height: 60px;
            position: fixed;
            z-index: 100;
            left: 0;
            bottom: 22.5px;
            font-size: 15px;
            font-weight: 500;
            color: #fff;
        }
        .goTop {
            width: 69px;
            height: 69px;
            position: fixed;
            bottom: 90px;
            right: 12px;
            z-index: 500;
        }
        .slider {
            padding: 33px 5px 0;
            box-sizing: border-box;
            .slider-groupOut {
                height: 64px;
                overflow: hidden;
                .slider-group {
                    width: 100%;
                    height: 110%;
                    overflow-x: scroll;
                    overflow-y: hidden;
                    -webkit-overflow-scrolling: touch;
                    float: left;
                    white-space: nowrap;
                    .titleLi {
                        width: 100px;
                        height: 64px;
                        background: url("https://img.hongrenshuo.com.cn/h5/killguan-titleBg-ymz.png") no-repeat center;
                        background-size: 100% 100%;
                        position: relative;
                        display: inline-block;
                        margin-left: -20px;
                        .time {
                            position: absolute;
                            width: 100px;
                            text-align: center;
                            left: 5px;
                            font-weight: 500;
                            height: 24px;
                            line-height: 24px;
                            font-size: 13px;
                            color: #006f7c;
                        }
                        .titleName {
                            position: absolute;
                            width: 100px;
                            text-align: center;
                            left: 0;
                            bottom: 12px;
                            font-weight: 500;
                            font-size: 18px;
                            color: #8a8b8b;
                        }
                        .titleNameTwo {
                            letter-spacing: 4px;
                            left: 1px;
                        }
                        &:nth-child(1) {
                            margin-left: 0;
                        }
                        &.active-titleLi {
                            background: url("https://img.hongrenshuo.com.cn/h5/killguan-titleBg1-ymz.png") no-repeat center;
                            background-size: 100% 100%;
                            .time {
                                color: #fff;
                            }
                            .titleName {
                                color: #00474f;
                            }
                        }
                    }
                }
                .slider-group::-webkit-scrollbar {
                    display: none
                }
            }
            .content {
                width: 100%;
                border: 2px solid #006f7c;
                background: #2db4b9;
                margin: 5px auto 0;
                box-sizing: border-box;
                padding: 5px;
                .contentIn {
                    width: 100%;
                    border: 2px solid #85e0ee;
                    padding: 0 5px 6px;
                    box-sizing: border-box;
                    .contentTop {
                        .contentTitle {
                            width: 100%;
                            height: 48px;
                            line-height: 48px;
                            text-align: center;
                            font-size: 17px;
                            font-weight: 500;
                            color: #fff;
                        }
                        .content-list {
                            width: 100%;
                            .content-haixuan {
                                .topMoney{
                                    width: 335px;
                                    height: 340px;
                                    background: url("https://img.hongrenshuo.com.cn/h5/killguan-topMoneyBg-ymz.png") no-repeat center;
                                    background-size: 100% 100%;
                                    padding: 40px 15px 0;
                                    margin-bottom: 7px;
                                    box-sizing: border-box;
                                    .money{
                                        color: #ffedb4;
                                        text-align: center;
                                        font-size: 12px;
                                        line-height: 22px;
                                        border-top: 1px dotted #ffedb4;
                                        border-bottom: 1px dotted #ffedb4;
                                        .p1{
                                            font-size: 13px;
                                        }
                                    }
                                    .touOut{
                                        display: flex;
                                        padding-top: 18px;
                                        position: relative;
                                        justify-content: space-between;
                                        .tou{
                                            text-align: center;
                                            width: 100px;
                                            .headPic{
                                                width: 83px;
                                                height: 83px;
                                                border-radius: 50%;
                                                background: #8c8989;
                                                border: 2px solid #fff;
                                                position: relative;
                                                box-sizing: border-box;
                                                margin: 0 auto;
                                                img{
                                                    width: 100%;
                                                    height: auto;
                                                    border-radius: 50%;
                                                    background: #8c8989;
                                                }
                                            }
                                            .desc{
                                                padding: 25px 0 5px;
                                                box-sizing: border-box;
                                                font-size: 12px;
                                                .nickName{
                                                    font-size: 13px;
                                                    font-weight: 400;
                                                    text-align: center;
                                                    line-height: 20px;
                                                }
                                                .piao{
                                                    color: #ffbc6c;
                                                    text-align: center;
                                                    line-height: 15px;
                                                }
                                            }
                                            .goPiao{
                                                margin: 0 auto;
                                                width: 59px;
                                                height: 43px;
                                                background: url("https://img.hongrenshuo.com.cn/h5/killguan-gipiaoBg-ymz.png") no-repeat center;
                                                background-size: 100% 100%;
                                            }
                                        }
                                        .tou2,.tou3{
                                            margin-top: 36px;
                                            .guan2{
                                                position: absolute;
                                                background: url("https://img.hongrenshuo.com.cn/h5/killguan-guan2-ymz.png") no-repeat center;
                                                background-size: 100% 100%;
                                                width: 93px;
                                                height: 97px;
                                                left: 1px;
                                                top:-5px;
                                            }
                                            .guan3{
                                                position: absolute;
                                                background: url("https://img.hongrenshuo.com.cn/h5/killguan-guan3-ymz.png") no-repeat center;
                                                background-size: 100% 100%;
                                                width: 93px;
                                                height: 97px;
                                                left: 1px;
                                                top:-5px;
                                            }
                                        }
                                        .tou1{
                                            position: absolute;
                                            left: 50%;
                                            width: 120px;
                                            margin-left: -56px;
                                            top:20px;
                                            .headPic{
                                                width: 96px;
                                                height: 96px;
                                                margin: 0 auto;
                                                .guan1{
                                                    position: absolute;
                                                    background: url("https://img.hongrenshuo.com.cn/h5/killguan-guan1-ymz.png") no-repeat center;
                                                    background-size: 100% 100%;
                                                    width: 108px;
                                                    height: 114px;
                                                    left: 1px;
                                                    top:-6px;
                                                }
                                            }
                                        }
                                    }
                                }
                                .topMoney1{
                                    width: 335px;
                                    height: 111px;
                                    background: url("https://img.hongrenshuo.com.cn/h5/killguan-topMoneyBg1-ymz.png") no-repeat center;
                                    background-size: 100% 100%;
                                }
                                .contentLi-haixuan {
                                    width: 300px;
                                    height: 73px;
                                    border: 2px solid #16cfd6;
                                    box-sizing: border-box;
                                    background: #78f0f6;
                                    margin-top: 5px;
                                    display: flex;
                                    align-items: center;
                                    color: #fff;
                                    font-weight: 500;
                                    font-size: 15px;
                                    position: relative;
                                    .victory {
                                        width: 69px;
                                        height: 58px;
                                        position: absolute;
                                        right: 40px;
                                        top: 0px;
                                    }
                                    &:nth-child(1) {
                                        margin-top: 0;
                                    }
                                    .num {
                                        margin: 0 15px;
                                        color: #00474f;
                                    }
                                    .headPic {
                                        width: 58px;
                                        height: 58px;
                                        border-radius: 50%;
                                        border: 2px solid #2798a3;
                                        img {
                                            width: 100%;
                                            height: auto;
                                            border-radius: 50%;
                                        }
                                    }
                                    .descContent {
                                        width: 180px;
                                        padding-left: 10px;
                                        box-sizing: border-box;
                                        height: 100%;
                                        display: flex;
                                        align-items: center;
                                        .lineName {
                                            line-height: 25px;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                            color: #00474f;
                                            font-size: 14px;
                                            font-weight: 500;
                                        }
                                        .starNum {
                                            font-size: 13px;
                                            line-height: 16px;
                                            color: #ff7200;
                                        }
                                    }
                                    .gopiao{
                                        position: absolute;
                                        right: -38px;
                                        top:-2px;
                                        width: 73px;
                                        height: 73px;
                                        background: url("https://img.hongrenshuo.com.cn/h5/killguan-gipiaoBg1-ymz.png") no-repeat center;
                                        background-size: 100% 100%;
                                    }
                                }
                            }
                        }
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
                            }
                        }
                    }
                }
            }
        }
        .tagtips{
            width: 100%;
            text-align: center;
            font-size: 12px;
            color: #9bf3f6;
            line-height: 40px;
        }
    }
</style>

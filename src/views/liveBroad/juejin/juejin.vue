<template>
    <div id="app">
        <div v-show="!showWx" class="appin">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/juejin-topimage-ymz.png`"></Onepic>
            </div>
            <div class="xunbao">
                <div @click="clickBaohe(item.status,index)" class="box"  v-for="(item,index) in data.boxList" :class="`box${index+1}`">
                    <img :src="index != 4?`https://img.hongrenshuo.com.cn/h5/juejin-box${computedStatus(item.status)}-ymz.png`:`https://img.hongrenshuo.com.cn/h5/juejin-bigbox${computedStatus(item.status)}-ymz.png`" alt="">
                </div>
                <div class="backbag" @click="showBagFun">
                    <img src="https://img.hongrenshuo.com.cn/h5/juejin-backbag-ymz.png" alt="">
                </div>
                <div class="gorule" @click="showRuleFun"></div>
            </div>
            <div class="bdTitleWrapper">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/juejin-bdtitle-ymz.png`"></Onepic>
            </div>
            <div class="listTitle">
                <div class="title">
                    <div class="titleLi" v-for="(item,index) in data.showDate" :class="highType == index?'activeLi':''" @click="checkTab(item.period,index)">
                        {{item.date}}
                    </div>
                </div>
                <div class="tou" v-for="(item,index) in data.top" :class="`tou${index+1}`" v-show="!huancun" @click="goUserFun(item.uid)">
                        <img :src="item.headPic" alt="" class="headmm">
                        <img :src="`https://img.hongrenshuo.com.cn/h5/juejin-tou${index+1}bottom-ymz.png`" alt="" :class="`headBottom${index+1}`">
                </div>
                <div class="loading-container" v-show="huancun">
                    <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                         class="huancunGif">
                </div>
            </div>
            <div class="contentUl">
                <div class="contentLi" v-for="(item,index) in data.list" @click="goRoom(item.roomId,item.uid)">
                    <div class="num">{{index+1}}</div>
                    <img :src="item.headPic" alt="" class="headPic" @click.stop="goUserFun(item.uid)">
                    <div class="desc">
                        <div class="nickName">{{item.nickname}}</div>
                        <div class="descTip">{{item.introduction || '暂无简介'}}</div>
                        <div class="scroe">红豆数：{{item.score}}</div>
                    </div>
                </div>
            </div>
            <div class="tagtips">
                本活动最终解释权利归克拉克拉所有
            </div>
            <div class="bottom-tips" v-html="data.copywriter" v-if="data.copywriter"></div>
            <div class="modal" v-show="showBag" @click="hideBag">
                <div class="modal-bag">
                    <div class="mmkk">
                        <div class="giftLi" v-for="(item,index) in data.bag">
                            <div class="left">
                                <div class="num">{{index+1}}</div>
                                <div class="name">{{item.giftName}}</div>
                            </div>
                            <div class="right">X<span>{{item.giftNum}}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" v-show="showRule" @click="hideRule">
                <div class="modal-rule">
                    <img src="https://img.hongrenshuo.com.cn/h5/juejin-ruleToast-ymz.png" alt="">
                </div>
            </div>
            <div class="modal" v-show="showGiftModal">
                <div class="box">
                    <div class="openBox">
                        <div class="giftOut" v-for="(item,index) in giftFun[chooseIndex].gift">
                            <img :src="item.img" alt="">
                            <div class="numgift">x<span>{{item.num}}</span></div>
                        </div>
                    </div>
                    <div class="desc">
                        <p class="p1">恭喜你获得</p>
                        <p class="p2">{{giftFun[chooseIndex].name}}</p>
                    </div>
                    <div class="close" @click="closeGiftModal">
                        <img src="https://img.hongrenshuo.com.cn/h5/juejin-close-ymz.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na,goUser} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'
    let shareTitle = '克拉克拉掘金者';
    let shareDesc = '海量宝箱散落城中 谁是“最强探宝者”';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/juejin-wxshare-ymz.jpg';
    export default {
        data() {
            return {
                type: 1,
                leftTitle: '',
                isActive: false,
                dataList: [],
                huancun: true,
                showWx: false,
                data:{},
                boxList:[],
                showBag:false,
                showRule:false,
                showGiftModal:false,
                period:-1,
                highType:-1,
                giftFun:[
                    {
                        'gift':[
                            {
                                'img':'https://img.hongrenshuo.com.cn/h5/juejin-gift1-ymz.png',
                                'num':1
                            }
                        ],
                        'name':'天空之城*1'
                    },
                    {
                        'gift':[
                            {
                                'img':'https://img.hongrenshuo.com.cn/h5/juejin-gift2-ymz.png',
                                'num':1
                            }
                        ],
                        'name':'告白气球*1'
                    },
                    {
                        'gift':[
                            {
                                'img':'https://img.hongrenshuo.com.cn/h5/juejin-gift1-ymz.png',
                                'num':1
                            },
                            {
                                'img':'https://img.hongrenshuo.com.cn/h5/juejin-gift2-ymz.png',
                                'num':2
                            }
                        ],
                        'name':'天空之城*1+告白气球*1'
                    },
                    {
                        'gift':[
                            {
                                'img':'https://img.hongrenshuo.com.cn/h5/juejin-gift3-ymz.png',
                                'num':2
                            },
                            {
                                'img':'https://img.hongrenshuo.com.cn/h5/juejin-gift1-ymz.png',
                                'num':2
                            }
                        ],
                        'name':'桃之夭夭*2+天空之城*2'
                    },
                    {
                        'gift':[
                            {
                                'img':'https://img.hongrenshuo.com.cn/h5/juejin-gift4-ymz.png',
                                'num':2
                            },
                            {
                                'img':'https://img.hongrenshuo.com.cn/h5/juejin-gift1-ymz.png',
                                'num':2
                            }
                        ],
                        'name':'月华灼灼*2+天空之城*2'
                    }
                ],
                chooseIndex:1
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        mounted() {
            this.getData(false);
        },
        methods: {
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
            goUserFun:function (uid) {
                return goUser(uid)
            },
            hideBag:function () {
                this.showBag = false;
            },
            hideRule:function () {
                this.showRule = false;
            },
            showRuleFun:function () {
                this.showRule = true;
            },
            showBagFun:function () {
                if(this.data.bag.length == 0){
                    Toast({
                        message: '背包暂无礼物',
                        position: 'center',
                        duration: 1500
                    })
                    return
                }
                this.showBag = true;
            },
            closeGiftModal:function () {
                this.showGiftModal = false;
            },
            checkTab:function (period,index) {
                this.period = period;
                this.highType = index;
                this.getData(true);
            },
            computedStatus(type) {
                if (type == 2) {
                    return '2'
                } else if (type == 3) {
                    return '3'
                } else {
                    return '1'
                }
            },
            clickBaohe(status, index) {
                if (na.match(/hongdoulive/i)) {
                    if (status == 1) {
                        Toast({
                            message: '完成当前任务才可以开启宝箱哦',
                            position: 'center',
                            duration: 1500
                        })
                    } else if (status == 3) {
                        Toast({
                            message: '该宝箱已经开过了哦',
                            position: 'center',
                            duration: 1500
                        })
                    } else {
                        this.$axios.HttpGet('/Active/nuggetsOpenBox', {period: this.period,boxKey:index})
                            .then((res) => {
                                console.log(res.data.data);
                                if (res.data.code === 200) {
                                    //打开宝箱
                                    if(res.data.data.code == 200){
                                        this.chooseIndex = index;
//                                        console.log(this.giftFun[this.chooseIndex])
                                        this.showGiftModal = true;
                                        this.getData();
//                                        this.data.boxList[index].status = 3;
                                    }else{
                                        Toast({
                                            message: res.data.data.msg,
                                            position: 'center',
                                            duration: 1500
                                        })
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
                                    message: "网络错误",
                                    position: 'center',
                                    duration: 1500
                                })
                            })
                    }
                } else {
                    this.goDeepLink("uxinlive://webpage?url=https%3A%2F%2Flive.hongdoulive.com%2FActive%2FnuggetsIndex%3Fshowshare%3D1");
                }
            },
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
            getData(tab) {
                this.huancun = true;
                this.data = {};
                this.$axios.HttpGet('/Active/nuggetsList',{
                    period:this.period
                })
                    .then((res) => {
                        console.log(res.data.data)
                        this.huancun = false;
                        if (res.data.code === 200) {
                            this.data = res.data.data;
                            if(tab){
                                return
                            }
                            for(var i=0;i<this.data.showDate.length;i++){
                                if(this.data.showDate[i].isHigh == true){
                                    this.highType = i;
                                    this.period = this.data.showDate[i].period;
                                }
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
                            message: "网络错误",
                            position: 'center',
                            duration: 1500
                        })
                    })
            }
        },
        components: {
            Onepic,
            Wxcontent
        }
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        background: #fcefcd;
        padding-bottom: 55px;
        img {
            width: 100%;
            height: auto;
        }
        .bdTitleWrapper{
            width: 167px;
            height: 45px;
            margin: 35px auto 43px;
        }
        .loading-container {
            .huancunGif {
                width: 40px;
                height: 40px;
            }
        }
        .xunbao{
            width: 100%;
            height: 434px;
            background: url("https://img.hongrenshuo.com.cn/h5/juejin-xunbao-ymz.png") no-repeat center;
            background-size: 100% 100%;
            position: relative;
            .backbag{
                position: absolute;
                width: 61px;
                height: 61px;
                right: 3px;
                bottom: 47px;
            }
            .boxOut{
                width: 82px;
                height: 80px;
            }
            .box{
                position: absolute;
                width: 82px;
                height: 80px;
                z-index: 100;
            }
            .box1{
                left: 90px;
                top: 93px;
            }
            .box2{
                right: 41px;
                top: 76px;
            }
            .box4{
                left: 107px;
                top: 184px;
            }
            .box3{
                right: 10px;
                top: 189px;
            }
            .box5{
                right: 66px;
                bottom: 60px;
            }
            .gorule{
                width: 70px;
                height: 70px;
                position: absolute;
                right: 14px;
                top: 21px;
            }
        }
        .listTitle{
            width: 100%;
            height: 249px;
            background: url("https://img.hongrenshuo.com.cn/h5/juejin-listtop-ymz.png") no-repeat center;
            background-size: 100% 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            .title{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: flex-end;
                position: absolute;
                left: 0;
                top:-34px;
                .titleLi{
                    width: 56px;
                    height: 37px;
                    text-align: center;
                    line-height: 37px;
                    box-sizing: border-box;
                    color: #6e4a17;
                    font-weight: 500;
                    font-size: 15px;
                    border: 1px solid #b18342;
                    background: #f8ca68;
                    margin-left: 1px;
                }
                .activeLi{
                    height: 42px;
                    background: #f9cd39;
                    /*border: 1px solid #fbc929;*/
                    line-height: 42px;
                    box-shadow: inset 0 0 20px #fff;
                }
            }
            .tou{
                border-radius: 50%;
                background: #bd8754;
                border: 2px solid #9e6b40;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                .headmm{
                    border: 2px solid #9e6b40;
                    border-radius: 50%;
                    box-sizing: border-box;
                }
                .headBottom1{
                    position: absolute;
                    width: 118px;
                    height: 28px;
                    bottom:-10px;
                    left: 50%;
                    margin-left: -59px;
                }
                .headBottom2{
                    position: absolute;
                    width: 100px;
                    height: 24px;
                    bottom:-6px;
                    left: 50%;
                    margin-left: -50px;
                }
            }
            .tou1{
                width: 126px;
                height: 126px;
                img{
                    width: 118px;
                    height: 118px;
                }
            }
            .tou2{
                width: 96px;
                height: 96px;
                margin-left: 30px;
                img{
                    width: 88px;
                    height: 88px;
                }
            }
        }
        .contentUl{
            width: 100%;
            background: #d6be66;
            padding-top: 6px;
            box-sizing: border-box;
            padding-bottom: 20px;
            .contentLi{
                width: 337px;
                height: 72px;
                border: 1px solid #fff;
                border-radius: 8px;
                background: #ad7c3e;
                color: #fff;
                display: flex;
                align-items: center;
                margin: 6px auto 0;
                .num{
                    width: 35px;
                    text-align: center;
                    font-weight: 500;
                    font-size: 14px;
                }
                .headPic{
                    width: 59px;
                    height: 59px;
                }
                .desc{
                    flex:1;
                    margin-left: 10px;
                    width: 0;
                    .nickName{
                        font-size: 14px;
                        font-weight: 500;
                    }
                    .descTip{
                        font-size: 13px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        padding: 11px 0 8px;
                        box-sizing: border-box;
                    }
                    .scroe{
                        font-size: 13px;
                        color: #fce659 !important;
                    }
                }
            }
        }
        .tagtips{
            width: 100%;
            text-align: center;
            font-size: 12px;
            color: #ad7c3e;
            line-height: 44px;
        }
        .bottom-tips{
            width: 100%;
            height: 55px;
            background: url("https://img.hongrenshuo.com.cn/h5/juejin-bottomImage-ymz.png") no-repeat center;
            background-size: 100% 100%;
            text-align: center;
            line-height: 55px;
            font-size: 16px;
            color: #775517;
            font-weight: 500;
            position: fixed;
            left: 0;
            bottom:0;
            z-index: 200;
        }
        .modal{
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top:0;
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .modal-bag{
            width: 100%;
            height: 590px;
            background: url("https://img.hongrenshuo.com.cn/h5/juejin-bagbg-ymz.png");
            background-size: 100% 100%;
            padding: 60px 33px 0;
            box-sizing: border-box;
            color: #774c22;
            .mmkk{
                overflow-x: hidden;
                overflow-y: scroll;
                width: 100%;
                max-height: 500px;
                .giftLi{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    border-bottom: 1px solid #bd995a;
                    padding: 18px 13px 5px;
                    box-sizing: border-box;
                    .left{
                        display: flex;
                        align-items: center;
                        .num{
                            width: 32px;
                            height: 32px;
                            background: #ffe893;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 14px;
                            border-radius: 50%;
                            font-weight: 500;
                        }
                        .name{
                            font-size: 15px;
                            font-weight: 500;
                            margin-left: 10px;
                        }
                    }
                    .right{
                        color: #fff;
                        font-size: 14px;
                        font-weight: 500;
                        span{
                            font-size: 16px;
                        }
                    }
                }
            }
            .mmkk::-webkit-scrollbar {
                display: none;
            }
        }
        .modal-rule{
            width: 371px;
            height: 428px;
        }
        .box{
            .openBox{
                width: 370px;
                height: 287px;
                background: url("https://img.hongrenshuo.com.cn/h5/juejin-openhe-ymz.png");
                background-size: 100% 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .giftOut{
                    margin-bottom: 80px;

                    img{
                        width: 135px;
                        height: 165px;
                    }
                    .numgift{
                        color: #fbe041;
                        text-align: center;
                        span{
                            font-size: 22px;
                            color: #fff;
                        }
                    }
                    &:nth-child(2){
                        margin-left: 40px;
                    }
                }
            }
            .desc{
                text-align: center;
                color: #fff;
                /*font-weight: 400;*/
                margin-top: 15px;
                .p1{
                    font-size: 14px;
                }
                .p2{
                    font-size: 18px;
                    margin-top: 6px;
                }
            }
            .close{
                width: 40px;
                height: 40px;
                margin: 40px auto 0;
            }
        }
    }
</style>

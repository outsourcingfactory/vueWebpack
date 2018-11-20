<template>
    <div id="app">
        <div v-show="!showWx" class="appin" :class="tips?'appin-bottom':''">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/juejin-topimage-ymz.png`"></Onepic>
            </div>
            <div class="xunbao">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/juejin-xunbao-ymz.png`"></Onepic>
                <img src="https://img.hongrenshuo.com.cn/h5/juejin-box1-ymz.png" alt="" class="box box1">
                <img src="https://img.hongrenshuo.com.cn/h5/juejin-box1-ymz.png" alt="" class="box box2">
                <img src="https://img.hongrenshuo.com.cn/h5/juejin-box1-ymz.png" alt="" class="box box3">
                <img src="https://img.hongrenshuo.com.cn/h5/juejin-box1-ymz.png" alt="" class="box box4">
                <img src="https://img.hongrenshuo.com.cn/h5/juejin-bigbox1-ymz.png" alt="" class="box box5">
                <div class="backbag">
                    <img src="https://img.hongrenshuo.com.cn/h5/juejin-backbag-ymz.png" alt="">
                </div>
            </div>
            <div class="bdTitleWrapper">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/juejin-bdtitle-ymz.png`"></Onepic>
            </div>
            <div class="listTitle">
                <div class="title">
                    <div class="titleLi activeLi">
                        11.24
                    </div>
                    <div class="titleLi">
                        11.24
                    </div>
                    <div class="titleLi">
                        11.24
                    </div>
                    <div class="titleLi">
                        11.24
                    </div>
                    <div class="titleLi">
                        11.24
                    </div>
                    <div class="titleLi">
                        11.24
                    </div>
                </div>
                <div class="tou tou1">
                    <img src="" alt="">
                </div>
                <div class="tou tou2">
                    <img src="" alt="">
                </div>
            </div>
            <div class="contentUl">
                <div class="contentLi">
                    <div class="num">1</div>
                    <img src="" alt="" class="headPic">
                    <div class="desc">
                        <div class="nickName">昵称昵称昵称</div>
                        <div class="descTip">简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</div>
                        <div class="scroe">红豆数：2000</div>
                    </div>
                </div>
                <div class="contentLi">
                    <div class="num">1</div>
                    <img src="" alt="" class="headPic">
                    <div class="desc">
                        <div class="nickName">昵称昵称昵称</div>
                        <div class="descTip">简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</div>
                        <div class="scroe">红豆数：2000</div>
                    </div>
                </div>
                <div class="contentLi">
                    <div class="num">1</div>
                    <img src="" alt="" class="headPic">
                    <div class="desc">
                        <div class="nickName">昵称昵称昵称</div>
                        <div class="descTip">简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</div>
                        <div class="scroe">红豆数：2000</div>
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
        background: #fcefcd;
        img {
            width: 100%;
            height: auto;
        }
        .bdTitleWrapper{
            width: 167px;
            height: 45px;
            margin: 35px auto 43px;

        }
        .xunbao{
            width: 100%;
            position: relative;
            .backbag{
                position: absolute;
                width: 61px;
                height: 61px;
                right: 3px;
                bottom: 47px;
            }
            .box{
                position: absolute;
                width: 82px;
                height: 80px;
            }
            .box1{
                left: 90px;
                top: 93px;
            }
            .box2{
                right: 41px;
                top: 76px;
            }
            .box3{
                left: 107px;
                top: 184px;
            }
            .box4{
                right: 10px;
                top: 189px;
            }
            .box5{
                right: 66px;
                bottom: 60px;
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
                img{
                    background: red;
                    border: 2px solid #9e6b40;
                    border-radius: 50%;
                    box-sizing: border-box;
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
            height: 500px;
            padding-top: 6px;
            box-sizing: border-box;
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
                    background: red;
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
                        color: #fce659;
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
    }
</style>

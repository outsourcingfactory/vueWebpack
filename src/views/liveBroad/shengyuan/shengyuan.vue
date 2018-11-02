<template>
    <div id="app">
        <div v-show="!showWx" class="appin">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/shengyuan-image_01.png`"></Onepic>
                <div class="rule" @click="goUrl(1)"></div>
            </div>
            <div class="maincontent" >

                <div class="content-main">
                    <div class="content-list">
                        <div class="swicth-content">
                            <div class="swicth-item swicth-item-left" :class="period == 1?'active-titleLi':''" @click="checkTab(1)">选拔赛</div>
                            <div class="swicth-item-center" :class="period == 2?'active-titleLi':''" @click="checkTab(2)">晋级赛</div>
                            <div class="swicth-item swicth-item-right" :class="period == 3?'active-titleLi':''" @click="checkTab(3)">总决赛</div>
                        </div>

                        <div class="list-content">
                            <div class="title">
                                <div class="rankNumber">排名</div>
                                <div class="rankHeader">头像</div>
                                <div class="rankNickname">昵称</div>
                                <div class="rankSorce">总值</div>
                            </div>
                            <div class="rank-item" v-for="(item,index) in dataList">
                                <div class="rankNumber">{{index+1}}</div>
                                <div class="rankHeader">
                                    <div class="rankHeaderWraper" @click="goRoom(item.roomId,item.uid)">
                                        <img :src="item.headPic">
                                    </div>
                                </div>
                                <div class="rankNickname">
                                    {{item.nickname}}
                                </div>
                                <div class="rankSorce">
                                    {{item.score}}
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
            <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/shengyuan-image_03.png`"></Onepic>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'
    let shareTitle = 'RE&声缘万圣节前夕狂欢趴';
    let shareDesc = 'RE&声缘念音与你一起携手渡过万圣节前夕！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/shengyuan-share.jpg';
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

            goUrl: function (type) {
                if (type == 1) {
                    window.location.href = 'https://live.hongdoulive.com/modular/index/active/rehuodongjieshao?showshare=1\n';
                } else if (type == 2) {

                }
            },
            getRoomList: function () {
                this.dataList = [];
                this.huancun = true;
                this.tips = '';
                this.$axios.HttpGet('/Active/eveHalloweenList', {
                    period: this.period
                })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.code === 200) {
                            this.dataList = res.data.data;
                            this.huancun = false;
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

                let time1 = 1540396800; //10月25号0点
                let time2 = 1540483200; //10月26号0点
                let time3 = 1540569600; //10月27号0点

                if (nowTime < time2) { //海选
                    this.period = 1;
                } else if (nowTime <= time3 && nowTime > time2) { //初赛
                    this.period = 2;
                } else if (nowTime > time3) { //决赛
                    this.period = 3;
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
        .appin {
            width: 100%;
            .topimageOut {
                width: 100%;
                height: 569px;
                position: relative;
                .rule {
                    width: 80px;
                    height: 50px;
                    position: absolute;
                    top: 14px;
                    left: 14px;
                }
                .lookaward {
                    width: 145px;
                    height: 40px;
                    position: absolute;
                    right: 14px;
                    bottom: 15px;
                }
            }
            .maincontent {
                width: 100%;
                background: url("https://img.hongrenshuo.com.cn/h5/shengyuan-image_02.png");
                background-repeat: repeat-y;
                background-size: 100% auto;
                padding:10px 0;
                margin-top: -1px;
                .slider-groupOut {
                    height: 65px;

                    display: flex;
                    padding: 0 12px;
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
                            margin-top: 12px;
                            padding-left: 5px;
                            box-sizing: border-box;
                        }
                        .titleNameTwo {
                            letter-spacing: 10px;
                            padding-left: 10px;
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
                    width: 100%;
                    padding: 0 14px;
                    box-sizing: border-box;
                    .content-list {
                        width: 100%;
                        padding: 10px 12px;
                        box-sizing: border-box;
                        border-radius: 20px;
                        background: #011625;
                        .swicth-content{
                            width:100%;
                            height:34px;
                            display: flex;
                            color:#028890;
                            line-height: 34px;
                            text-align: center;
                            font-size: 16px;
                            .swicth-item{
                                width:100px;
                                height:100%;
                            }
                            .swicth-item-center{
                                flex: 1;
                                border-left: 1px solid #00f0ff;
                                border-right: 1px solid #00f0ff;
                                background: #053557;
                            }
                            .swicth-item-left{
                                border-radius: 20px 0 0 20px;
                                background: #053557;
                            }
                            .swicth-item-right{
                                border-radius: 0 20px 20px 0;
                                background: #053557;
                            }
                            .active-titleLi{
                                color:#00f0ff;
                            }
                        }
                        .list-content{
                            width:100%;
                            .title{
                                width:100%;
                                display: flex;
                                line-height: 30px;
                                font-size: 14px;
                                color:#fff;
                                text-align: center;
                                margin-top:7px;
                                .rankNumber{
                                    width:45px;
                                }
                                .rankHeader{
                                    width:80px;
                                }
                                .rankNickname{
                                    flex:1;
                                }
                                .rankSorce{
                                    width:80px;
                                }
                            }
                            .rank-item{
                                width:100%;
                                display: flex;
                                margin-top:10px;
                                font-size: 14px;
                                color:#fff;
                                text-align: center;
                                height:35px;
                                align-items: center;
                                .rankNumber{
                                    width:45px;
                                }
                                .rankHeader{
                                    width:80px;
                                    display: flex;
                                    justify-content: center;
                                    .rankHeaderWraper{
                                        width:35px;
                                        height:35px;
                                        border-radius: 50%;
                                        border:2px solid #2f404c;
                                        img{
                                            width:100%;
                                            height:100%;
                                            border-radius: 50%;
                                        }
                                    }
                                }
                                .rankNickname{
                                    flex:1;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;

                                }
                                .rankSorce{
                                    width:80px;
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
                                font-size: 14px;
                            }
                        }
                    }

                }
            }
        }

    }
</style>

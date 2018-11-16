<template>
    <div id="app">
        <div v-show="!showWx" class="appin">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/sanrenxing-image_01.png`"></Onepic>
                <div class="rule" @click="goUrl(1)"></div>
            </div>
            <div class="content">
                <div class="contentUl">
                    <div class="switch-content">
                        <div class="switch-content-item" @click="switchtab(1)" :class="period == 1?'active-titleLi':''">
                            初赛
                            <div class="san" v-show="period == 1"></div>
                        </div>
                        <div class="switch-content-item" @click="switchtab(2)" :class="period == 2?'active-titleLi':''">
                            决赛
                            <div class="san" v-show="period == 2"></div>
                        </div>
                    </div>
                    <div class="group-content">
                        <div class="group-item" :class="group == 1?'active-group':''" @click="checkTime(1)">有学而志组</div>
                        <div class="group-item" :class="group == 2?'active-group':''" @click="checkTime(2)">学长师友组</div>
                        <div class="group-item" :class="group == 3?'active-group':''" @click="checkTime(3)">为师有道组</div>
                    </div>
                    <div class="contentUlIn" v-if="dataList.length>0">
                        <div class="contentLi" v-for="(item,index) in dataList"  @click="goRoom('',item.uid)">
                            <div class="num">{{index+1}}</div>
                            <img :src="item.headPic" alt="" class="headPic">
                            <div class="nickname">{{item.nickname}}</div>
                            <div class="zuan">
                                <div class="zuanTitle">
                                    <img src="https://img.hongrenshuo.com.cn/h5/sanrenxing-icon.png" alt="" class="zuanIcon">
                                    钻石数
                                </div>
                                <div class="zuanNum" >
                                    {{item.score}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="huancun" class="loading-container">
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
            <div class="topimageOut bottomimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/sanrenxing-image_02.png`"></Onepic>
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
    let shareTitle = '九天-三人行，必有我师';
    let shareDesc = '子曰：三人行必有我师，so～谁是师呢？';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/sanrenxing-share.jpg';
    export default {
        data() {
            return {
                period: 1,
                group: 1,
                dataList: [],
                huancun: true,
                showWx: false
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        mounted() {
            this.getNowType();
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
                        data.stage = 'sanrenxing'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
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
                    window.location.href = 'https://live.hongdoulive.com/modular/index/active/jt-sanrenxing?showshare=1';
                }
            },
            getRoomList: function () {
                this.dataList = [];
                this.huancun = true;
                this.$axios.HttpGet('/UnionActive/threeWalking', {
                    period: this.period,
                    group: this.group,
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

            switchtab: function (index) {
                if(this.huancun){
                    return
                }
                console.log(index)
                if (index == this.pipe) {
                    return
                } else {
                    this.period = index;
                    this.group = 1;
                    this.getRoomList();

                }
            },
            checkTime: function (index) {
                if(this.huancun){
                    return
                }
                if (index == this.day) {
                    return
                } else {
                    this.group = index
                    this.getRoomList();
                }
            },

            getNowType: function () {
                let nowTime = Date.parse(new Date()) / 1000;
                let time1 = 1542816000; //11月22号0点
                if (nowTime < time1) {
                    this.period = 1;
                }else{ //8.25
                    this.period = 2;
                }
//                获取数据
                this.getRoomList();
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
        img {
            width: 100%;
            height: auto;
        }
        .appin {
            width: 100%;
            .topimageOut {
                width: 100%;
                height: auto;
                position: relative;
                .rule {
                    width: 75px;
                    height: 75px;
                    position: absolute;
                    top: 240px;
                    right: 5px;
                }
            }
            .bottomimageOut{
                margin-top:-5px;
            }
            .content{
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
                background: #3e2928;
                .contentUl {
                    width: 100%;
                    border: 1px solid #fff;
                    padding: 3px;
                    box-sizing: border-box;
                    .switch-content {
                        width: 100%;
                        height: 40px;
                        display: flex;
                        justify-content: space-between;
                        background: #1f5f2e;
                        .switch-content-item {
                            width: 50%;
                            height: 40px;
                            text-align: center;
                            line-height: 40px;
                            background: #b1b1b1;
                            color: #fff;
                            font-size: 16px;
                            font-weight: 500;
                            position: relative;
                            .san {
                                position: absolute;
                                width: 0;
                                height: 0;
                                border-left: 6px solid transparent;
                                border-right: 6px solid transparent;
                                border-top-width: 8px;
                                border-top-style: solid;
                                border-top-color:#cc7f50;
                                left: 50%;
                                margin-left: -4px;
                                margin-top: -1px;
                            }
                        }
                        .active-titleLi {
                            background: #cc7f50;
                        }
                    }
                    .group-content{
                        display: flex;
                        width:100%;
                        justify-content: space-between;
                        padding:0 12px;
                        box-sizing: border-box;
                        background: #1f5f2e;
                        padding-top:20px;
                        .group-item{
                            width:90px;
                            heigght:33px;
                            text-align: center;
                            font-size: 14px;
                            font-weight: 500;
                            line-height: 33px;
                            background: #b1b1b1;
                            color:#fff;
                            border-radius: 3px;
                        }
                        .active-group{
                            background: #cc7f50;
                        }
                    }
                    .contentUlIn {
                        width: 100%;
                        height: 100%;
                        background: #1f5f2e;
                        color:#fff;
                        padding: 0 12px;
                        box-sizing: border-box;
                        .contentLi {
                            width: 100%;
                            height: 90px;
                            display: flex;
                            align-items: center;
                            font-weight: 400;
                            padding: 0 10px;
                            box-sizing: border-box;
                            font-size: 13px;
                            border-bottom: 1px dotted #fff;
                            &:nth-last-child(1) {
                                border-bottom: none !important;
                            }
                            .num {
                                font-weight: 600;
                                font-size: 15px;
                                width: 28px;
                            }
                            .headPic {
                                border: 1px solid #26266e;
                                border-radius: 50%;
                                display: block;
                                width: 50px;
                                height: 50px;
                                margin-right: 12px;
                            }
                            .nickname {
                                flex: 1;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                            .zuan {
                                margin-left: 10px;
                                .zuanTitle {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    /*color: #524280;*/
                                    .zuanIcon {
                                        width: 12px;
                                        height: 12px;
                                        margin-right: 3px;
                                    }
                                    margin-bottom: 4px;
                                }

                                .zuanNum {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    width: 65px;
                                    height: 16px;
                                    border-radius: 7px;
                                    background: #cf7449;
                                    color: #fff;
                                    font-size: 12px;
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
                        background: #1f5f2e;
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
</style>

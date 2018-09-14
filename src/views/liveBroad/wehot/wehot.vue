<template>
    <div id="app">
        <div class="container" v-show="!showWx">
            <div class="topImage">
                <img src="https://img.hongrenshuo.com.cn/h5/wehot-topimage-ymz.png" alt="">
                <div class="rule" @click="goRule()"></div>
            </div>
            <div class="timeTab">
                <div class="timeTabLi" @click="tabClick(1)">
                    <div>
                        <p class="p1">9.16-9.17</p>
                        <p class="p2">选拔赛</p>
                    </div>
                    <img src="https://img.hongrenshuo.com.cn/h5/wehot-modalbBg-ymz.png" alt="" class="mmm" v-show="tabIndex != '1'">
                </div>
                <div class="timeTabLi"  @click="tabClick(2)">
                    <div>
                        <p class="p1">9.18</p>
                        <p class="p2">多人赛</p>
                    </div>
                    <img src="https://img.hongrenshuo.com.cn/h5/wehot-modalbBg-ymz.png" alt="" class="mmm" v-show="tabIndex != '2'">
                </div>
                <div class="timeTabLi"  @click="tabClick(3)">
                    <div>
                        <p class="p1">9.19</p>
                        <p class="p2">突围赛</p>
                    </div>
                    <img src="https://img.hongrenshuo.com.cn/h5/wehot-modalbBg-ymz.png" alt="" class="mmm" v-show="tabIndex != '3'">
                </div>
                <div class="timeTabLi"  @click="tabClick(4)">
                    <div>
                        <p class="p1">9.20</p>
                        <p class="p2">争霸赛</p>
                    </div>
                    <img src="https://img.hongrenshuo.com.cn/h5/wehot-modalbBg-ymz.png" alt="" class="mmm" v-show="tabIndex != '4'">
                </div>
            </div>
            <div class="famTab" v-show="tabIndex == 1">
                <div class="famTab1" @click="famClick(1)">
                    <img :src="`https://img.hongrenshuo.com.cn/h5/wehot-tabA${tab1Index}-ymz.png`" alt="">
                </div>
                <div class="famTab2" @click="famClick(2)">
                    <img :src="`https://img.hongrenshuo.com.cn/h5/wehot-tabB${tab2Index}-ymz.png`" alt="">
                </div>
                <div class="famTab3" @click="famClick(3)">
                    <img :src="`https://img.hongrenshuo.com.cn/h5/wehot-tabC${tab3Index}-ymz.png`" alt="">
                </div>
            </div>
            <div class="content">
                <div class="line">
                    <img src="https://img.hongrenshuo.com.cn/h5/wehot-line-ymz.png">
                </div>
                <div class="contentLiOut" v-for="(item,index) in list">
                    <div class="contentLi" @click="goRoom(item.roomId,item.uid)">
                        <div class="num" v-if="item.sort>3">{{item.sort}}</div>
                        <div class="num" v-else>
                            <img :src="`https://img.hongrenshuo.com.cn/h5/wehot-num${item.sort}-ymz.png`" alt="" :class="`num${item.sort}`">
                        </div>
                        <div class="headPic">
                            <div class="head">
                                <img v-lazy="item.headPic">
                            </div>
                        </div>
                        <div class="desc">
                            <div class="descIn">
                                <div class="nickName">{{item.nickname}}</div>
                                <div class="piaoNum" v-if="tabIndex == 1">投票数：{{item.voteNum}}票</div>
                                <div class="piaoNum" v-else>钻石数：{{item.score}}</div>
                            </div>
                        </div>
                        <div class="goPiao" @click.stop="goPiao(item.uid)" v-show="tabIndex == 1"></div>
                    </div>
                    <div class="line">
                        <img src="https://img.hongrenshuo.com.cn/h5/wehot-line-ymz.png">
                    </div>
                </div>
            </div>
            <div v-show="huancun" class="loading-container">
                <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                     class="huancunGif">
            </div>
            <div v-show="!huancun && list.length == 0" class="loading-container">
                <div>
                    <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                         class="emptyPng">
                    <div class="emptyTips">
                        精彩赛事尚未开始
                    </div>
                </div>
            </div>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import Toast from 'assets/js/toast'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    let shareTitle = '我们正当红';
    let shareDesc = '我们正当红';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/wehot-goTicket-ymz.png';
    export default {
        data() {
            return {
                list: [],
                showWx: false,
                huancun: true,
                tabIndex:1,
                famIndex:1,
                tab1Index:1,
                tab2Index:2,
                tab3Index:2
            }
        },
        created() {
            this.getDataList();
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        methods: {
            famClick(index){
                if(this.huancun){
                    return
                }
                this.famIndex = index;
                if(index == 1){
                    this.tab1Index = 1;
                    this.tab2Index = 2;
                    this.tab3Index = 2;
                }else if(index == 2){
                    this.tab1Index = 2;
                    this.tab2Index = 1;
                    this.tab3Index = 2;
                }else if(index == 3){
                    this.tab1Index = 2;
                    this.tab2Index = 2;
                    this.tab3Index = 1;
                }
                this.getDataList();
            },
            tabClick(index){
                if(this.huancun){
                    return
                }
                this.tabIndex = index;
                this.getDataList();
            },
            goRule(){
                window.location.href = '/Rule/wehotrule?showshare=1';
            },
            getDataList() {
                this.huancun = true;
                this.list = [];
                this.$axios.HttpGet('/UnionActive/weAreRedList', {
                    period:this.tabIndex,
                    group:this.famIndex
                })
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.code === 200) {
                            this.list = res.data.data;
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
            goPiao(uid) {
                if (na.match(/hongdoulive/i)) {
                    this.$axios.HttpGet('/UnionActive/weAreRedVote', {
                        voteUid:uid,
                        group:this.famIndex,
                    })
                        .then((res) => {
                            console.log(res.data)
                            if(res.data.code == 200) {
                                if(res.data.data.code == 200){
                                    this.getDataList();
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
                                message: '网络错误',
                                position: 'center',
                                duration: 1500
                            })
                        })
                } else {
                    this.goDeepLink("uxinlive://webpage?url=https%3A%2F%2Flive.hongdoulive.com%2FUnionActive%2FtwoYearIndex%3Fshowshare%3D1");
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
        },
        components: {
            Wxcontent
        },
    }
</script>

<style lang="scss" scoped>
    #app {
        background: #cfd5ff;
        position: relative;
        padding-bottom: 30px;
        img {
            width: 100%;
            height: auto;
        }
        .topImage {
            width: 100%;
            height: 494px;
            position: relative;
            .rule{
                position: absolute;
                width: 100px;
                height: 70px;
                right: 8px;
                bottom: 258px;
            }
        }
        .timeTab{
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0 10px 0 10px;
            box-sizing: border-box;
            margin-bottom: 25px;
            .timeTabLi{
                width: 82px;
                height: 60px;
                background: url("https://img.hongrenshuo.com.cn/h5/wehot-timeTabBg-ymz.png") no-repeat center;
                background-size: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                .p1{
                    color: #fff;
                    text-align: center;
                    font-size: 12px;
                }
                .p2{
                    color: #a8b0f9;
                    text-align: center;
                    padding-top: 4px;
                    font-size: 13px;
                }
                .mmm{
                    position: absolute;
                    left: 4px;
                    top:4px;
                    width: 74px;
                    height: 52px;
                }
            }
        }
        .famTab{
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .famTab1{
                width: 82px;
                height: 35px;
            }
            .famTab2{
                width: 69px;
                height: 38px;
            }
            .famTab3{
                width: 131px;
                height: 36px;
            }
        }
        .content {
            padding: 0 10px 0 10px;
            box-sizing: border-box;
            .contentLi {
                width: 100%;
                display: flex;
                align-items: center;
                color: #1d2524;
                .num {
                    width: 40px;
                    font-size: 25px;
                    font-weight: 400;
                    text-align: center;
                    color: #fff;
                    .num1{
                        width: 28px;
                        height: 44px;
                        margin: 0 auto;
                    }
                    .num2{
                        width: 30px;
                        height: 44px;
                        margin: 0 auto;
                    }
                    .num3{
                        width: 30px;
                        height: 45px;
                        margin: 0 auto;
                    }
                }
                .headPic {
                    .head {
                        width: 87px;
                        height: 87px;
                        margin: 0 auto;
                        background: url("https://img.hongrenshuo.com.cn/h5/wehot-headBg-ymz.png") no-repeat center;
                        background-size: 100% 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img {
                            width: 66px;
                            height: 66px;
                            border-radius: 50%;
                        }
                    }
                }
                .goPiao {
                    width: 59px;
                    height: 34px;
                    margin: 0 auto;
                    background: url("https://img.hongrenshuo.com.cn/h5/wehot-goTicket-ymz.png") no-repeat center;
                    background-size: 100% 100%;
                }
                .desc {
                    box-sizing: border-box;
                    width: 0;
                    flex: 1;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .descIn {
                        width: 100%;
                        color: #fff;
                        .nickName {
                            font-size: 18px;
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .piaoNum {
                            font-size: 14px;
                            padding-top: 10px;
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
            .line {
                width: 100%;
                height: 10px;
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
        .bottom {
            width: 100%;
            height: 76px;
        }
    }
</style>

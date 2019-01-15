<template>
    <div id="app">
        <div class="ruleIcon" @click="goRule">
            <img src="https://img.hongrenshuo.com.cn/h5/findlyact-activeRuleIcon-ymz.png" alt="">
        </div>
        <div class="container" :class="copywriter != ''?'container-bottom':''">
            <div class="goTop" @click.stop="scrollToTop()" v-show="isActive">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/findlyact-gotop-ymz.png`"></Onepic>
            </div>
            <img src="https://img.hongrenshuo.com.cn/h5/findlyact-mengxin-ymz.png" alt="" class="topImage">
            <div class="tablist">
                <div class="tabout" :class="tabIndex == 1?'tabActive':''" @click="checkTab(1)">
                    <div class="tabtitle">12.18-12.20</div>
                    <div class="tab">年度预选</div>
                </div>
                <div class="tabout" :class="tabIndex == 2?'tabActive':''" @click="checkTab(2)">
                    <div class="tabtitle">12.21-12.23</div>
                    <div class="tab">百团大战</div>
                </div>
                <div class="tabout" :class="tabIndex == 3?'tabActive':''" @click="checkTab(3)">
                    <div class="tabtitle">12.24</div>
                    <div class="tab">分队竞技</div>
                </div>
                <div class="tabout" :class="tabIndex == 4?'tabActive':''" @click="checkTab(4)">
                    <div class="tabtitle">12.25</div>
                    <div class="tab">荣耀决斗</div>
                </div>
                <div class="tabout" :class="tabIndex == 5?'tabActive':''" @click="checkTab(5)">
                    <div class="tabtitle">12.26</div>
                    <div class="tab">王的诞生</div>
                </div>
            </div>
            <div class="content">
                <div class="tabCon1">
                    <div class="titleBtn">
                        <div class="titleBtnLeft">
                            {{tabLeftTips}}
                            <div class="title-right" v-if="tabIndex==2">
                                <div class="one" :class="time == 1?'title-right-active':''" @click="checkTuanTime(1)">
                                    21日
                                    <div class="inline" v-show="time == 1"></div>
                                </div>
                                <div class="dot"></div>
                                <div class="one" :class="time == 2?'title-right-active':''" @click="checkTuanTime(2)">
                                    22日
                                    <div class="inline" v-show="time == 2"></div>
                                </div>
                                <div class="dot"></div>
                                <div class="one" :class="time == 3?'title-right-active':''" @click="checkTuanTime(3)">
                                    23日
                                    <div class="inline" v-show="time == 3"></div>
                                </div>
                            </div>
                        </div>
                        <div class="titleBtnRight" @click="goSaidao">
                            赛道榜
                            <img src="https://img.hongrenshuo.com.cn/h5/findlyact-arrowright-ymz.png" alt="">
                        </div>
                    </div>
                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-bottomline-ymz.png" alt=""
                         class="titleBtnLine">
                    <div  v-if="zhuData.list && zhuData.list.length == 0 && !allLoad" class="loading-container">
                        <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                             class="huancunGif">
                    </div>
                    <div class="loading-container" v-if="zhuData.list && zhuData.list.length == 0 && allLoad">
                        <div>
                            <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                                 class="emptyPng">
                            <div class="emptyTips">
                                精彩赛事尚未开始
                            </div>
                        </div>
                    </div>
                    <div v-if="tabIndex == 1">
                        <div class="jinzhuContent">
                            <div class="jinzhuContentLi" v-for="(item,index) in zhuData.list"
                                 @click="goRoom(item.roomId,item.uid)">
                                <div class="num">{{index + 1}}</div>
                                <img :src="item.headPic" alt="" class="headPic">
                                <div class="desc noWidth">
                                    <p class="nickName dottline">{{item.nickname}}</p>
                                    <p class="gxian">积分：{{item.score}}</p>
                                </div>
                                <div class="touPiao">
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-gozhichi-ymz.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tuan" v-if="tabIndex == 2 || tabIndex == 3 || tabIndex == 4">
                        <div class="tuanContent">
                            <div class="content-list">
                                <div class="content-chusai">
                                    <div class="contentLi-chusai" v-for="(item,index) in zhuData.list">
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
                            </div>
                        </div>
                    </div>
                    <div class="wang" v-if="tabIndex == 5">
                        <div class="threeMan">
                            <div class="manOut" v-for="(item,index) in zhuData.list" :class="`manOut${index+1}`"
                                 v-if="index<3" @click="goRoom(item.roomId,item.uid)">
                                <div class="man">
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-yuanzhu-ymz.png" alt=""
                                         class="yuanzhu yuanzhu1">
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-yuanzhu-ymz.png" alt=""
                                         class="yuanzhu yuanzhu2">
                                    <img :src="`https://img.hongrenshuo.com.cn/h5/findlyact-xieguan${index+1}-ymz.png`"
                                         alt="" class="guan">
                                    <img :src="item.headPic" alt="" class="headerPP">
                                </div>
                                <div class="nickName dottline">{{item.nickname}}</div>
                                <div class="gongxian">积分：{{item.score}}</div>
                            </div>
                        </div>
                        <div class="jinzhuContent">
                            <div class="jinzhuContentLi" v-for="(item,index) in zhuData.list"
                                 @click="goRoom(item.roomId,item.uid)" v-if="index > 2">
                                <div class="num">{{index + 1}}</div>
                                <img :src="item.headPic" alt="" class="headPic">
                                <div class="desc noWidth">
                                    <p class="nickName dottline">{{item.nickname}}</p>
                                    <p class="gxian">积分：{{item.score}}</p>
                                </div>
                                <div class="touPiao">
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-gozhichi-ymz.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottomDesc" v-html="copywriter" v-if="copywriter != ''"></div>
        </div>
    </div>
</template>

<script>
    import Toast from 'assets/js/toast'
    import {ymzBaseFun, na} from 'assets/js/common'
    import ScrollUpLoading from 'components/baseymz/ScrollUpLoading'
    import Onepic from 'components/baseymz/Onepic'

    let shareTitle = '克拉克拉2018嘉年华';
    let shareDesc = '克拉克拉2018嘉年华隆重开启，千万红豆福利 为王加冕 共享年度盛典';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/findlyact-wxshare-ymz.png';
    export default {
        data() {
            return {
                tabIndex: 1,
                isActive: false,
                page: 'normal',
                backColor: '',
                saidaoIndex: 0,
                copywriter: '',
                time: 1,
                tabLeftTips: '年度预选',
                zhuData: {
                    list:[]
                },
                allLoad: false,
            }
        },
        watch: {
            tabIndex(newName, oldName) {
                if (newName == 1) {
                    this.tabLeftTips = '年度预选';
                } else if (newName == 2) {
                    this.tabLeftTips = '百团大战';
                } else if (newName == 3) {
                    this.tabLeftTips = '分队竞技';
                } else if (newName == 4) {
                    this.tabLeftTips = '荣耀决斗';
                } else if (newName == 5) {
                    this.tabLeftTips = '王的诞生';
                }
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            this.getNowType();
            this.zhugetData();
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('scroll', this.handleScroll)
            });
        },
        methods: {
            getNowType: function () {
                let nowTime = Date.parse(new Date()) / 1000;
                let time1 = 1545321600; //12月21号0点
                let time2 = 1545580800; //12月24号0点
                let time3 = 1545667200; //12月25号0点
                let time4 = 1545753600; //12月26号0点
                if (nowTime < time1) { //年度海选
                    this.tabIndex = 1;
                } else if (nowTime <= time2 && nowTime > time1) { //百团大战
                    this.tabIndex = 2;
                } else if (nowTime <= time3 && nowTime > time2) {  //分队竞技
                    this.tabIndex = 3;
                } else if (nowTime <= time4 && nowTime > time3) { //荣耀决斗
                    this.tabIndex = 4;
                } else if (nowTime > time4) {
                    this.tabIndex = 5;   // 王的诞生
                }

                let timeSec2 = 1545408000; //22号0点
                let timeSec3 = 1545494400; //23号0点
                if (nowTime < timeSec2) {
                    this.time = 1;
                } else if (nowTime <= timeSec3 && nowTime > timeSec2) {
                    this.time = 2;
                } else if (nowTime > timeSec3) {
                    this.time = 3;
                }
            },
            goRule: function () {
                window.location.href = '/Viewsh5rule/mengxinrule?showshare=1';
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
            goSaidao: function () {
                window.location.href = '/yearActions/yearActionIndex?showshare=1&page=rongyu';
            },
            goDeepLink: function (url) {
                if (na.match(/micromessenger/i) && na.match(/(iphone|ipod|ios|ipad)/i)) {
                    this.$wxContent();
                } else {
                    var data = {};
                    data.stage = 'jianian'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
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
            },
            goRoom: function (roomid, uid) {
                if (!uid) {
                    return
                }
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
            goApp: function () {
                this.goDeepLink('uxinlive://webpage?url=https%3A%2F%2Flive.hongdoulive.com%2FyearActions%2FyearActionMxIndex%3Fshowshare%3D1');

            },
            checkTab: function (tabIndex) {
                this.tabIndex = tabIndex;
                this.zhuData = {};
                this.zhuData.list = [];
                this.time = 1;
                this.allLoad = false;
                this.zhugetData();
            },

            /**
             * 主赛道
             */
            checkTuanTime: function (index) {
                this.time = index;
                this.zhuData = {};
                this.zhuData.list = [];
                this.allLoad = false;
                this.zhugetData();
            },
            zhugetData: function () {
                this.$axios.HttpGet('/yearActions/yearActionMxList', {
                    period: this.tabIndex,
                    day: this.time
                })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.code == 200) {
                            this.zhuData = res.data.data;
                            this.allLoad = true;
                            this.copywriter = res.data.data.copywriter;
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
            checkTabXuan: function (index) {
                if (index == this.type) {
                    return
                } else {
                    this.type = index
                }
                this.time = 1;
                this.zhuData = '';
                this.zhugetData();
            },
        },
        components: {
            ScrollUpLoading,
            Onepic
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll)
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        background: #241249;
        .ruleIcon {
            position: absolute;
            width: 90px;
            height: 90px;
            top: 763px;
            right: 26px;
        }
        img {
            width: 100%;
            height: auto;
        }
        .goTop {
            width: 100px;
            height: 100px;
            position: fixed;
            bottom: 90px;
            right: 12px;
            z-index: 500;
        }
        .container-bottom {
            padding-bottom: 110px;
        }
        .container {
            .topImage {
                width: 100%;
                height: 918px;
            }
            .bottomDesc {
                width: 100%;
                height: 110px;
                background: url("https://img.hongrenshuo.com.cn/h5/findlyact-bottomDesc-ymz.png") no-repeat center;
                background-size: 100% 100%;
                text-align: center;
                line-height: 110px;
                font-size: 28px;
                position: fixed;
                left: 0;
                bottom: 0;
                color: #ac8b23;
                font-weight: 400;
                z-index: 300;
            }
            .page {
                position: relative;
                .goHomeOut {
                    position: absolute;
                    right: 20px;
                    top: -86px;
                    width: 90px;
                    height: 90px;
                    z-index: 100;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .loading-container {
                width: 100%;
                height: 600px;
                display: flex;
                align-items: center;
                justify-content: center;
                .huancunGif {
                    width: 60px;
                    height: 60px;
                }
                .emptyPng {
                    width: 262px;
                    height: 224px;
                }
                .emptyTips {
                    text-align: center;
                    line-height: 80px;
                }
            }
            .tablist {
                display: flex;
                align-items: flex-end;
                justify-content: space-around;
                padding: 0 10px;
                box-sizing: border-box;
                border-bottom: 1px solid #7c81f9;
                width: 100%;
                height: 220px;
                background: url("https://img.hongrenshuo.com.cn/h5/findlyact-tabBg-ymz.png") no-repeat center;
                background-size: 100% 100%;
                z-index: 100;
                position: relative;
                .tabout {
                    .tabtitle {
                        width: 134px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        border-radius: 10px;
                        color: #fff;
                        background: #7c81f9;
                        margin-bottom: 10px;
                        font-size: 24px;
                    }
                    .tab {
                        width: 131px;
                        height: 84px;
                        background: url("https://img.hongrenshuo.com.cn/h5/findlyact-tabnormal-ymz.png") no-repeat center;
                        background-size: 100% 100%;
                        text-align: center;
                        line-height: 84px;
                        font-size: 30px;
                        color: #fff;
                        margin: 0 auto;
                    }
                }
                .tabActive {
                    .tabtitle {
                        color: #4c380a;
                        background: #ffe45e;
                    }
                    .tab {
                        background: url("https://img.hongrenshuo.com.cn/h5/findlyact-tabactive-ymz.png") no-repeat center;
                        background-size: 100% 100%;
                        color: #4c380a;
                    }
                }
            }
            .content {
                background: #383fac;
                padding-bottom: 40px;
                .tabCon1 {
                    padding-top: 40px;
                    .titleBtn {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 26px;
                        box-sizing: border-box;
                        font-size: 32px;
                        color: #fff;
                        .titleBtnLeft {
                            display: flex;
                            align-items: center;
                            .jinjinum {
                                font-size: 24px;
                            }
                            .title-right {
                                color: #ffffff;
                                display: flex;
                                align-items: center;
                                margin-left: 50px;
                                .dot {
                                    width: 10px;
                                    height: 10px;
                                    border-radius: 50%;
                                    background: #ffffff;
                                    margin: 0 10px;
                                }
                                .one {
                                    position: relative;
                                    .inline {
                                        position: absolute;
                                        width: 30px;
                                        height: 6px;
                                        border-radius: 4px;
                                        background: #fe5c62;
                                        bottom: -10PX;
                                        left: 50%;
                                        margin-left: -12px;
                                    }
                                }
                                .title-right-active {
                                    color: #fe5c62;
                                }
                            }
                        }
                        .titleBtnRight {
                            display: flex;
                            align-items: center;
                            img {
                                width: 15px;
                                height: 25px;
                                margin-left: 6px;
                                display: block;
                            }
                        }
                    }
                    .titleBtnLine {
                        width: 700px;
                        height: 15px;
                        margin: 6px auto 0;
                    }
                    .noWidth {
                        width: 300px;
                    }
                    .leizhuList {
                        padding: 40px 25px 0;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: space-between;
                        .leizhu {
                            text-align: center;
                            width: 200px;
                            .leizhuTime {
                                width: 120px;
                                height: 50px;
                                text-align: center;
                                line-height: 50px;
                                font-size: 24px;
                                color: #151c8e;
                                background: #a6a9fc;
                                border: 1px solid #ace7fb;
                                border-radius: 10px;
                                margin: 0 auto;
                                font-weight: 400;
                            }
                            .leizhuImage {
                                width: 118px;
                                height: 118px;
                                border-radius: 50%;
                                border: 1px solid #744549;
                                margin: 10px auto;
                            }
                            .leizhuNick {
                                color: #fff;
                                font-size: 26px;
                            }
                        }
                    }
                    .tuan {
                        padding-top: 40px;
                    }
                    .tuanContent {
                        display: flex;
                        flex-wrap: wrap;
                        padding: 16px 0 0;
                        box-sizing: border-box;
                        .tuanLi {
                            margin-top: 30px;
                            width: 186px;
                            .man {
                                margin: 0 auto;
                                position: relative;
                                width: 130px;
                                height: 130px;
                                background: url("https://img.hongrenshuo.com.cn/h5/findlyact-headPicBg-ymz.png") no-repeat center;
                                background-size: 100% 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                .headerPP {
                                    width: 120px;
                                    height: 120px;
                                    background: #fff;
                                    border-radius: 50%;
                                }
                                .guan {
                                    position: absolute;
                                    width: 53px;
                                    height: 53px;
                                    right: -12px;
                                    top: -16px;
                                }
                                .yuanzhu {
                                    position: absolute;
                                    width: 17px;
                                    height: 42px;
                                }
                                .yuanzhu1 {
                                    left: -7px;
                                    top: 50%;
                                    margin-top: -21px;
                                }
                                .yuanzhu2 {
                                    right: -7px;
                                    top: 50%;
                                    margin-top: -21px;
                                }
                            }
                            .nickName {
                                text-align: center;
                                font-size: 26px;
                                color: #fff;
                                margin: 10px auto;
                            }
                            .gongxian {
                                text-align: center;
                                font-size: 24px;
                                color: #d8be47;
                            }
                        }
                    }
                    .touPiao {
                        width: 233px;
                        height: 74px;
                        position: absolute;
                        right: -36px;
                        top: 40px;
                        img {
                            width: 100%;
                            height: 100%;
                            z-index: 100;
                        }
                    }
                    .juedou {
                        padding-top: 40px;
                    }
                    .fuhuo {
                        padding-top: 40px;
                        .fenzuLine {
                            color: #fff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 50px auto;
                            font-size: 30px;
                        }
                    }
                    .wang {
                        padding-top: 40px;
                    }
                    .juedouTitleOut {
                        width: 715px;
                        height: 410px;
                        background: url("https://img.hongrenshuo.com.cn/h5/findlyact-juedouTitle-ymz.png") no-repeat center;
                        background-size: 100%;
                        margin: 0 auto;
                        .juedouTitle {
                            text-align: center;
                            color: #fff;
                            font-size: 26px;
                            line-height: 64px;
                        }
                    }
                    .content-list {
                        width: 100%;
                        padding: 0 36px;
                        box-sizing: border-box;
                        .loading-container {
                            width: 100%;
                            height: 300px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .huancunGif {
                                width: 80px;
                                height: 80px;
                            }
                            .emptyPng {
                                width: 262px;
                                height: 224px;
                            }
                            .emptyTips {
                                text-align: center;
                                line-height: 80px;
                                font-size: 28px;
                            }
                        }
                        .content-chusai {
                            .contentLi-chusai {
                                display: flex;
                                margin-top: 36px;
                                .contentLi-chusai-Bg {
                                    width: 282px;
                                    height: 428px;
                                    background: url("https://img.hongrenshuo.com.cn/h5/findlyact-leftbgImage-ymz.png") no-repeat center;
                                    background-size: 100% 100%;
                                    position: relative;
                                    .victoryLeft, .victoryRight {
                                        position: absolute;
                                        right: 4px;
                                        top: 4px;
                                        width: 145px;
                                        height: 145px;
                                        img {
                                            width: 100%;
                                            height: auto;
                                        }
                                    }
                                    .victoryRight {
                                        left: 4px;
                                    }
                                    .contentLi-chusai-in {
                                        color: #fff;
                                        width: 100%;
                                        height: 100%;
                                        .nickName {
                                            width: 240px;
                                            text-align: center;
                                            font-size: 28px;
                                            line-height: 60px;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                            margin: 0 auto;
                                        }
                                        .headPic {
                                            width: 180px;
                                            height: 180px;
                                            margin: 10px auto;
                                            img {
                                                width: 100%;
                                                height: auto;
                                            }
                                        }
                                        .desc {
                                            padding: 0 16px;
                                            box-sizing: border-box;
                                            font-size: 24px;
                                            line-height: 30px;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            display: -webkit-box;
                                            -webkit-box-orient: vertical;
                                            -webkit-line-clamp: 2;
                                            text-align: center;
                                            height: 58px;
                                        }
                                        .starNum {
                                            color: #fff95f;
                                            font-size: 24px;
                                            line-height: 36px;
                                            text-align: center;
                                            margin-top: 8px;
                                        }
                                    }
                                }
                                .bgRight {
                                    background: url("https://img.hongrenshuo.com.cn/h5/findlyact-leftbgImage-ymz.png") no-repeat center;
                                    background-size: 100% 100%;
                                }
                                .contentLi-chusai-middle {
                                    text-align: center;
                                    padding-top: 120px;
                                    box-sizing: border-box;
                                    .vs {
                                        width: 118px;
                                        height: 100px;
                                        img {
                                            width: 100%;
                                            height: auto;
                                        }
                                    }
                                    .chusai-day {
                                        margin: 60px auto 10px;
                                        color: #fff;
                                        font-size: 34px;
                                        font-weight: 500;
                                    }
                                    .chusai-time {
                                        font-size: 32px;
                                        color: #fdff70;

                                    }
                                }
                            }
                        }
                    }
                }
                /*公用样式*/
                .jinzhuContent {
                    margin-top: 30px;
                    .jinzhuContentLi {
                        width: 674px;
                        height: 140px;
                        border: 1px solid #8ef7f7;
                        box-shadow: 0px 5px 3px 0px rgba(6, 10, 72, 0.73);
                        border-radius: 5px;
                        background-color: rgba(46, 53, 160, 0.702);
                        margin: 20px auto 0;
                        display: flex;
                        align-items: center;
                        color: #fff;
                        font-size: 28px;
                        font-weight: 400;
                        position: relative;
                        .num {
                            text-align: center;
                            width: 70px;
                        }
                        .headPic {
                            width: 114px;
                            height: 114px;
                            border-radius: 50%;
                            margin-right: 38px;
                        }
                        .desc {
                            line-height: 46px;
                            .gxian {
                                font-size: 26px;
                            }
                        }
                    }
                }
                .actNum {
                    color: #fcc92e;
                }
                .threeMan {
                    width: 100%;
                    height: 522px;
                    background: url("https://img.hongrenshuo.com.cn/h5/findlyact-jinzhuthreebg-ymz.png") no-repeat center;
                    background-size: 100% 100%;
                    position: relative;
                    .manOut {
                        position: absolute;
                        width: 260px;
                        .man {
                            margin: 0 auto;
                            position: relative;
                            width: 159px;
                            height: 159px;
                            background: url("https://img.hongrenshuo.com.cn/h5/findlyact-headPicBg-ymz.png") no-repeat center;
                            background-size: 100% 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .headerPP {
                                width: 146px;
                                height: 146px;
                                background: #fff;
                                border-radius: 50%;
                            }
                            .guan {
                                position: absolute;
                                width: 53px;
                                height: 53px;
                                right: -12px;
                                top: -16px;
                            }
                            .yuanzhu {
                                position: absolute;
                                width: 17px;
                                height: 42px;
                            }
                            .yuanzhu1 {
                                left: -7px;
                                top: 50%;
                                margin-top: -21px;
                            }
                            .yuanzhu2 {
                                right: -7px;
                                top: 50%;
                                margin-top: -21px;
                            }
                        }
                        .nickName {
                            text-align: center;
                            font-size: 26px;
                            color: #fff;
                            margin: 10px auto;
                        }
                        .gongxian {
                            text-align: center;
                            font-size: 24px;
                            color: #d8be47;
                        }
                    }
                    .manOut1 {
                        left: 50%;
                        margin-left: -140px;
                        top: 50px;
                    }
                    .manOut2 {
                        top: 260px;
                        left: 28px;
                    }
                    .manOut3 {
                        top: 260px;
                        right: 28px;
                    }
                }
            }
        }
    }
</style>

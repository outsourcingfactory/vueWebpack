<template>
    <div id="app">
        <transition name="el-fade-in">
            <div v-show="!showWx" class="appin" :class="tips?'appin-bottom':''">
                <div class="topimageOut">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/kstar-topimage-ymz.png`"></Onepic>
                    <div class="rule" @click="goUrl(1)"></div>
                </div>
                <div class="secondImage">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/kstar-secondimage-ymz.png`"></Onepic>
                    <div class="jiangli" @click="goUrl(2)"></div>
                </div>
                <div class="threeImage">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/kstar-threeImage-ymz.png`"></Onepic>
                    <div class="seeAll" @click="goUrl(3)"></div>
                </div>
                <div class="bottom" v-show="tips" v-html="tips" ref="tips" @click="goBottom()"></div>
                <div class="goTop" @click.stop="scrollToTop()" v-show="isActive">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/kstar-gotop-ymz.png`"></Onepic>
                </div>
                <div class="slider">
                    <div class="slider-groupOut">
                        <div class="slider-group" ref="sliderGroup" id="slider-group">
                            <div class="titleLi" :class="type == 1?'active-titleLi':''" @click="checkTab(1)">
                                <div class="time">8.22-8.23</div>
                                <div class="titleName titleNameTwo">海选</div>
                            </div>
                            <div class="titleLi" :class="type == 2?'active-titleLi':''" @click="checkTab(2)">
                                <div class="time">8.24-8.26</div>
                                <div class="titleName titleNameTwo">初赛</div>
                            </div>
                            <div class="titleLi" :class="type == 3?'active-titleLi':''" @click="checkTab(3)">
                                <div class="time">8.27</div>
                                <div class="titleName titleNameTwo">复赛</div>
                            </div>
                            <div class="titleLi" :class="type == 4?'active-titleLi':''" @click="checkTab(4)">
                                <div class="time">8.28</div>
                                <div class="titleName">组合赛</div>
                            </div>
                            <div class="titleLi" :class="type == 5?'active-titleLi':''" @click="checkTab(5)">
                                <div class="time">8.29</div>
                                <div class="titleName">踢馆赛</div>
                            </div>
                            <div class="titleLi" :class="type == 6?'active-titleLi':''" @click="checkTab(6)">
                                <div class="time">8.30</div>
                                <div class="titleName">决赛</div>
                            </div>
                        </div>
                    </div>
                    <div style="clear:both;"></div>
                    <div class="content">
                        <div class="contentIn">
                            <div class="contentTop">
                                <div class="contentTop-title">
                                    <div class="title-left">{{leftTitle}}</div>
                                    <div class="title-right" v-show="type==2">
                                        <div class="one" :class="time == 1?'title-right-active':''"
                                             @click="checkTime(1)">
                                            8.24
                                            <div class="inline" v-show="time == 1"></div>
                                        </div>
                                        <div class="dot"></div>
                                        <div class="one" :class="time == 2?'title-right-active':''"
                                             @click="checkTime(2)">
                                            8.25
                                            <div class="inline" v-show="time == 2"></div>
                                        </div>
                                        <div class="dot"></div>
                                        <div class="one" :class="time == 3?'title-right-active':''"
                                             @click="checkTime(3)">
                                            8.26
                                            <div class="inline" v-show="time == 3"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="dips" v-show="type==4">
                                    按上场活动排名进行大咖和萌新赛道的组队冲刺赛，队伍总积分前四的选手双人晋级下一轮
                                </div>
                                <div class="contentTop-Wrapper" v-show="type == 1||type == 2 || type==3 || type==5">
                                    <div class="contentTop-Wrapper-left" :class="pipe==1?'contentTop-Wrapper-active':''"
                                         @click="checkPipe(1)">
                                        <div class="title-text">大咖赛道</div>
                                    </div>
                                    <div class="contentTop-Wrapper-right"
                                         :class="pipe==2?'contentTop-Wrapper-active':''" @click="checkPipe(2)">
                                        <div class="title-text">萌星赛道</div>
                                    </div>
                                </div>
                                <div class="line"></div>
                                <div class="chaxing" v-show="type==5 && dataList.length>0 && riseRankScore > 0">
                                    挑战当天星势值大于 <span style="color: #fff95f">{{riseRankScore}}</span> 可晋级成功
                                </div>
                                <div class="content-list">
                                        <div class="content-haixuan" v-show="type==1 || type==5">
                                            <div class="contentLi-haixuan" v-for="(item,index) in dataList"
                                                 @click="goRoom(item.roomId,item.uid)">
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
                                                        星势值：{{item.score}}
                                                    </div>
                                                </div>
                                                <div class="victory" v-show="item.isWin == true">
                                                    <img src="https://img.hongrenshuo.com.cn/h5/kstar-success-ymz.png">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content-chusai" v-show="type==2 || type==3">
                                            <div class="contentLi-chusai" v-for="(item,index) in dataList">
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
                                                            星势值：{{item.firstScore}}
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
                                                            星势值：{{item.secondScore}}
                                                        </div>
                                                    </div>
                                                    <div class="victoryRight" v-show="item.isWin == 2">
                                                        <img src="https://img.hongrenshuo.com.cn/h5/kstar-con2yepright-ymz.png">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content-zuhe" v-show="type==4">
                                            <div class="contentLi-zuhe" v-for="(item,index) in dataList">
                                                <div class="jinji" v-show="item.isWin">
                                                    <img src="https://img.hongrenshuo.com.cn/h5/kstar-jinji-ymz.png">
                                                </div>
                                                <div class="zuTop">
                                                    <div class="zu">{{engNum[index]}} 组</div>
                                                    <div class="starsNum">
                                                        总星势值：{{item.totalScore}}
                                                    </div>
                                                </div>
                                                <div class="zuContent">
                                                    <div class="zuContentOne">
                                                        <div class="leftsan" @click="goRoom(item.firstroomId,item.firstUid)">
                                                            <img src="https://img.hongrenshuo.com.cn/h5/kstar-leftsan-ymz.png">
                                                        </div>
                                                        <div class="headpic">
                                                            <img :src="item.firstheadPic">
                                                        </div>
                                                        <div class="desc">
                                                            <div class="lineName">{{item.firstnickname}}</div>
                                                            <div class="lineDesc">{{item.firstintroduction || '暂无简介'}}
                                                            </div>
                                                            <div class="starNum">星势值：{{item.firstScore}}</div>
                                                        </div>
                                                        <div class="zhichi" @click="goRoom(item.firstroomId,item.firstUid)">
                                                            <img src="https://img.hongrenshuo.com.cn/h5/kstar-gozhichi-ymz.png"
                                                                 alt="">
                                                        </div>
                                                    </div>
                                                    <div class="zuContentOne"
                                                         @click="goRoom(item.secondroomId,item.secondUid)">
                                                        <div class="leftsan">
                                                            <img src="https://img.hongrenshuo.com.cn/h5/kstar-leftsan-ymz.png"
                                                                 alt="">
                                                        </div>
                                                        <div class="headpic">
                                                            <img :src="item.secondheadPic">
                                                        </div>
                                                        <div class="desc">
                                                            <div class="lineName">{{item.secondnickname}}</div>
                                                            <div class="lineDesc">
                                                                {{item.secondintroduction || '暂无简介'}}
                                                            </div>
                                                            <div class="starNum">星势值：{{item.secondScore}}</div>
                                                        </div>
                                                        <div class="zhichi">
                                                            <img src="https://img.hongrenshuo.com.cn/h5/kstar-gozhichi-ymz.png"
                                                                 alt="">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content-juesai" v-show="type==6">
                                            <div class="contentLi-juesai" v-for="(item,index) in dataList">
                                                <div class="ti" v-if="index<3 && isEnd">
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
                                                    <img src="https://img.hongrenshuo.com.cn/h5/kstar-gozhichi-ymz.png"
                                                         alt="">
                                                </div>
                                                <div class="guan" v-if="index<3 && isEnd">
                                                    <img :src="`https://img.hongrenshuo.com.cn/h5/kstar-guan${index+1}-ymz.png`">
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
                                                    精彩赛事尚未开始
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'
    let shareTitle = 'KilaKila星势力大作战';
    let shareDesc = '活动开启了全新BUFF加成玩法，小耳朵们快来为自己的主播荣耀加油助力吧~';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/kstar-wxshare-ymz.jpg';
    export default {
        data() {
            return {
                type: 1,
                pipe: 1,
                leftTitle: '',
                tips: '',
                isActive: false,
                time: 1,
                dataList: [],
                huancun: true,
                riseRankScore: '',
                engNum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
                showWx: false,
                isEnd:false,
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
                    this.goDeepLink('uxinlive://home?subtab=main_live');
                }
            },
            goUrl: function (type) {
                if (type == 1) {
                    window.location.href = '/Rule/kstarrule?showshare=1';
                } else if (type == 2) {
                    window.location.href = '/Rule/kstarjiangli?showshare=1';
                } else {
                    this.goDeepLink('uxinlive://tagintegrate?tag_id=85167&tag_name=KilaKila星势力大作战&category_type=1&hot_new=0');
                }
            },
            getRoomList: function () {
                this.dataList = [];
                this.huancun = true;
                this.tips = '';
                this.$axios.HttpGet('/unionActive/starPowerList', {
                    type: this.type,
                    pipe: this.pipe,
                    time: this.time
                })
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.code === 200) {
                            this.dataList = res.data.data.list;
                            this.huancun = false;
                            if(res.data.data.isEnd){
                                this.isEnd = res.data.data.isEnd;
                            }
                            this.riseRankScore = res.data.data.riseRankScore;
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
                if(this.huancun){
                    return
                }
                if (index == this.type) {
                    return
                } else {
                    this.type = index
                }
                this.tabDataChange(this.type);
                this.pipe = 1;
                this.getRoomList();
            },
            checkPipe: function (index) {
                if(this.huancun){
                    return
                }
                if (index == this.pipe) {
                    return
                } else {
                    this.pipe = index
                    this.getRoomList();
                }
            },
            checkTime: function (index) {
                if(this.huancun){
                    return
                }
                if (index == this.time) {
                    return
                } else {
                    this.time = index
                    this.getRoomList();
                }
            },
            tabDataChange(type) {
                if (type == 1) {
                    this.leftTitle = '角逐32强';
                } else if (type == 2) {
                    this.leftTitle = '32进16';
                } else if (type == 3) {
                    this.leftTitle = '16进8';
                } else if (type == 4) {
                    this.leftTitle = '8进4';
                } else if (type == 5) {
                    this.leftTitle = '挑战前4';
                } else if (type == 6) {
                    this.leftTitle = '决赛';
                }
            },
            getNowType: function () {
                let nowTime = Date.parse(new Date()) / 1000;
//                let nowTime = 1535299211;
                let time1 = 1535040000; //8月24号0点
                let time2 = 1535126400; //8月25号0点
                let time3 = 1535212800; //8月26号0点
                let time4 = 1535299200; //8月27号0点
                let time5 = 1535385600; //8月28号0点
                let time6 = 1535472000; //8月29号0点
                let time7 = 1535558400; //8月30号0点

                if (nowTime <= time2 && nowTime > time1) { //8.24
                    this.time = 1;
                }else if (nowTime <= time3 && nowTime > time2) { //8.25
                    this.time = 2;
                }else if(nowTime > time3){//8.26
                    this.time = 3;
                }


                if (nowTime < time1) { //海选
                    this.type = 1;
                } else if (nowTime <= time4 && nowTime > time1) { //初赛
                    this.type = 2;
                } else if (nowTime <= time5 && nowTime > time4) {
                    this.type = 3;
//                    document.getElementById("slider-group").scrollLeft = 400;
                    this.$nextTick(() => {
                        this.$refs.sliderGroup.scrollLeft = 400;
                    })
                } else if (nowTime <= time6 && nowTime > time5) {
                    this.type = 4;
                } else if (nowTime <= time7 && nowTime > time6) {
                    this.type = 5;
                } else if (nowTime > time7) {
                    this.type = 6;
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
        img {
            width: 100%;
            height: auto;
        }
        .slideTest-enter-active,.slideTest-leave-active{
            transition: all 0.3s;
        }
        .slideTest-enter,.slideTest-leave-to{
            transform: translate3d(100%, 0, 0)
        }
        .appin {
            background: #1e2c51;
            box-sizing: border-box;
            padding-bottom: 50px;
        }
        .appin-bottom {
            padding-bottom: 105px;
            position: relative;
        }
        .rule, .jiangli, .seeAll {
            width: 100%;
            height: 50px;
            position: absolute;
            left: 0;
            bottom: 0;
        }
        .topimageOut {
            width: 100%;
            height: 461px;
            position: relative;

        }
        .secondImage {
            width: 100%;
            height: 300px;
            position: relative;
        }
        .threeImage {
            width: 354px;
            height: 146px;
            margin: 15px auto;
            position: relative;
        }
        .bottom {
            width: 100%;
            height: 60px;
            background: url("https://img.hongrenshuo.com.cn/h5/kstar-bottom-ymz.png") no-repeat center;
            background-size: 100% 100%;
            text-align: center;
            line-height: 60px;
            position: fixed;
            z-index: 100;
            left: 0;
            bottom: 22.5px;
            font-size: 15px;
        }
        .goTop {
            width: 54px;
            height: 83px;
            position: fixed;
            bottom: 90px;
            right: 12px;
            z-index: 500;
        }
        .slider {
            padding: 0 5px;
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
                        background: url("https://img.hongrenshuo.com.cn/h5/kstar-titleBg-ymz.png") no-repeat center;
                        background-size: 100% 100%;
                        position: relative;
                        color: #909090;
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
                        }
                        .titleName {
                            position: absolute;
                            width: 100px;
                            text-align: center;
                            left: 0;
                            bottom: 12px;
                            font-weight: 500;
                            font-size: 18px;
                        }
                        .titleNameTwo {
                            letter-spacing: 4px;
                            left: 1px;
                        }
                        &:nth-child(1) {
                            margin-left: 0;
                        }
                        &.active-titleLi {
                            color: #fff;
                            background: url("https://img.hongrenshuo.com.cn/h5/kstar-titleBg1-ymz.png") no-repeat center;
                            background-size: 100% 100%;
                        }
                    }
                }
                .slider-group::-webkit-scrollbar {
                    display: none
                }
            }
            .content {
                width: 100%;
                /*height: 600px;*/
                border: 2px solid #a467b0;
                border-image: linear-gradient(#a467b0, #334a88) 30 30;
                margin: 5px auto 0;
                box-sizing: border-box;
                padding: 5px;
                .contentIn {
                    width: 100%;
                    background: linear-gradient(to bottom, #2d419a 0%, #a774c0 100%);
                    padding: 15px 5px 25px;
                    box-sizing: border-box;
                    .contentTop-title {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 8px;
                        box-sizing: border-box;
                        font-size: 16px;
                        font-weight: 500;
                        margin-bottom: 15px;
                        .title-right {
                            color: #909090;
                            display: flex;
                            align-items: center;
                            .dot {
                                width: 5px;
                                height: 5px;
                                border-radius: 50%;
                                background: #909090;
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
                    .dips {
                        font-size: 13px;
                        color: #c1c1c1;
                        line-height: 18px;
                        padding: 0 8px 8px;
                        box-sizing: border-box;
                    }
                    .contentTop-Wrapper {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 10px 0;
                        .contentTop-Wrapper-left, .contentTop-Wrapper-right {
                            width: 120px;
                            height: 35px;
                            background: url("https://img.hongrenshuo.com.cn/h5/kstar-titleWrapper-ymz.png") no-repeat center;
                            background-size: 100% 100%;
                            margin-right: 3px;
                            position: relative;
                            font-size: 17px;
                            font-weight: 500;
                            color: #909090;
                            .title-text {
                                position: absolute;
                                right: 10px;
                                top: 9px;
                            }
                        }
                        .contentTop-Wrapper-right {
                            transform: scaleX(-1);
                            margin-right: 0;
                            .title-text {
                                transform: scaleX(-1);
                            }
                        }
                        .contentTop-Wrapper-active {
                            background: url("https://img.hongrenshuo.com.cn/h5/kstar-titleWrapperActive-ymz.png") no-repeat center;
                            background-size: 100% 100%;
                            color: #fff;
                        }
                    }
                    .line {
                        width: 100%;
                        height: 3px;
                        background: linear-gradient(to right, #f07ece 0%, #6389f7 100%);
                    }
                    .chaxing {
                        width: 100%;
                        text-align: center;
                        /*font-weight: 400;*/
                        font-size: 13px;
                        line-height: 30px;
                    }
                    .content-list {
                        width: 100%;
                        margin-top: 10px;
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
                        .content-haixuan {
                            .contentLi-haixuan {
                                width: 342px;
                                height: 77px;
                                background: url("https://img.hongrenshuo.com.cn/h5/kstar-contentBg1-ymz.png") no-repeat center;
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
                                    margin: 0 17px 0 20px;
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
                            .contentLi-chusai {
                                display: flex;
                                margin-top: 9px;
                                .contentLi-chusai-Bg {
                                    width: 141px;
                                    height: 214px;
                                    background: url("https://img.hongrenshuo.com.cn/h5/kstar-contentBgleft2-ymz.png") no-repeat center;
                                    background-size: 100% 100%;
                                    position: relative;
                                    .victoryLeft, .victoryRight {
                                        position: absolute;
                                        right: 3px;
                                        top: 3px;
                                        width: 72.5px;
                                        height: 72.5px;
                                        img {
                                            width: 100%;
                                            height: auto;
                                        }
                                    }
                                    .victoryRight {
                                        left: 3px;
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
                                        }
                                    }
                                }
                                .bgRight {
                                    background: url("https://img.hongrenshuo.com.cn/h5/kstar-contentBg2-ymz.png") no-repeat center;
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
                        .content-zuhe {
                            position: relative;
                            .contentLi-zuhe {
                                width: 342px;
                                height: 200px;
                                background: url("https://img.hongrenshuo.com.cn/h5/kstar-contentBg3-ymz.png") no-repeat center;
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
                                        color: #1e2c78;
                                        letter-spacing: 1px;
                                        font-weight: 500;
                                        width: 80px;
                                        text-align: center;
                                    }
                                    .starsNum {
                                        width: 194px;
                                        text-align: center;
                                        color: #f79fff;
                                        font-size: 14px;
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
                                            width: 145px;
                                            .lineName {
                                                line-height: 20px;
                                                font-weight: 500;
                                                font-size: 14px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;
                                            }
                                            .lineDesc {
                                                font-size: 12px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;
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
                                        .zhichi {
                                            width: 84px;
                                            height: 31px;
                                            margin-left: 10px;
                                        }
                                    }
                                }
                            }
                        }
                        .content-juesai {
                            .contentLi-juesai {
                                width: 342px;
                                height: 122px;
                                background: url("https://img.hongrenshuo.com.cn/h5/kstar-contentBg4-ymz.png") no-repeat center;
                                background-size: 100% 100%;
                                display: flex;
                                align-items: center;
                                position: relative;
                                margin-top: 8px;
                                .ti {
                                    width: 6px;
                                    height: 43px;
                                    margin-left: 3px;
                                }
                                .num {
                                    font-size: 20px;
                                    margin-left: 2px;
                                    font-weight: 500;
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
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>

<template>
    <div id="app">
        <div v-show="!showWx" class="appin">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/microblogvoice-image_01.png`"></Onepic>
                <div class="rule" @click="goUrl(1)"></div>
            </div>
            <div class="rankcontent">
                <div class="rankswicth">
                    <div class="all" @click="checkTab('all')">全部</div>
                    <div class="itemcontentWraper">
                        <div class="itemcontent">
                            <div class="item" v-for="item in switchitem" @click="checkTab(item)">{{item}}</div>
                        </div>
                    </div>

                </div>
                <div class="ranklist">
                    <div class="ranklistitem" v-for="item in dataList">
                        <div class="headimage" @click="gouser(item.uid)">
                            <img :src="item.headPic"/>
                        </div>
                        <div class="listinfo">
                            <div class="username">{{item.nickname}}</div>
                            <!--<div class="userIntro">{{item.nickname}}</div>-->
                            <div class="userscore">当前积分：{{item.voteNum}}</div>
                        </div>
                        <div class="vote" @click="goPiao(item.voteId)">
                            <img src="https://img.hongrenshuo.com.cn/h5/microblogvoice-mic.png"/>
                            <div class="votetext">为TA投票</div>
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
                    <div class="showMore" v-if="showSeeMore" @click="seeMoreClick">
                        加载更多
                        <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt="" class="seeMoreIcon" v-if="showSeeLoad">
                    </div>
                </div>

            </div>
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/microblogvoice-image_02.png`"></Onepic>
            </div>
            <div class="topimageOut followcontent">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/microblogvoice-image_03.png`"></Onepic>
                <div class="content">
                    <div class="followitem">
                        <div class="ranklistitem">
                            <div class="headimage">
                                <img src="http://img.hongrenshuo.com.cn/2275329396770.png?x-oss-process=image/resize,m_mfit,h_80,w_80,limit_0/crop,w_80,h_80,g_center"></div>
                            <div class="listinfo">
                                <div class="username">微博动漫社</div>
                            </div>
                            <div class="vote" @click="goRoom('','2275329396770')">
                                加关注
                            </div>
                        </div>
                    </div>
                    <div class="followitem1">
                        <div class="ranklistitem">
                            <div class="headimage">
                                <img src="http://img.hongrenshuo.com.cn/2043839754250.png?x-oss-process=image/resize,m_mfit,h_80,w_80,limit_0/crop,w_80,h_80,g_center"></div>
                            <div class="listinfo">
                                <div class="username">克拉克拉总舵主</div>
                            </div>
                            <div class="vote" @click="goRoom('','2043839754250')">
                                加关注
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/microblogvoice-image_04.png`"></Onepic>
            </div>
            <div class="bottom" ref="tips" @click="goUrl(2)"></div>
            <toupiao :show="showPic" :bgColor="'#fcd372'" v-on:closeModalPic="closePic"
                     v-on:checkCode="checkCodeFun"></toupiao>
            <phoneAuth :show="showPhone" :bgColor="'#fcd372'" v-on:closeModalPhone="closePhone"
                       v-on:checkPhone="checkPhoneFun"></phoneAuth>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toupiao from 'components/baseymz/toupiao.vue'
    import PhoneAuth from 'components/baseymz/phoneAuth.vue'
    import Toast from 'assets/js/toast'
    let shareTitle = '微博声优排行榜';
    let shareDesc = '每日5票，TA的声音值得更多人听见！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/microblogvoice-share.png';

    export default {
        data() {
            return {
                period: 'all',
                pipe: 1,
                switchitem:[
                    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','V','W','X','Y','Z','#'
                ],
                pageNo:1,
                dataList: [],
                huancun: true,
                showWx: false,
                showSeeMore:false,
                showSeeLoad:false,
                showPhone: false,
                showPic: false,
                voteId:0
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        mounted() {
            this.getRoomList();
            console.log(this.switchitem)
            this.$nextTick(function () {
                window.addEventListener('scroll', this.handleScroll)
            });
        },
        methods: {
            closePhone(e) {
                this.showPhone = e;
            },
            closePic(e) {
                this.showPic = e;
            },
            goPiao(uid) {
                if (na.match(/hongdoulive/i)) {
                    this.$axios.HttpGet('/Vote/weiboSeiyCheckVote', {})
                        .then((res) => {
                            console.log(res.data)
                            this.voteId = uid;
                            if (res.data.code === 200) {
                                if (res.data.data.code == 200) {
                                    if (res.data.data.type == 1) { //图像验证
                                        this.showPic = true;
                                    } else if (res.data.data.type == 2) { //手机验证
                                        this.showPhone = true;
                                    }
                                } else {
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
                    let weburl = decodeURIComponent(location.href);
                    this.goDeepLink("uxinlive://webpage?url="+weburl);
                }
            },
            checkCodeFun(e) {
                if (e == true) {
                    this.$axios.HttpGet('/Vote/weiboSeiyVote', {type: 1, voteId: this.voteId})
                        .then((res) => {
                            console.log(res.data)
                            if (res.data.data.code == 200) {
                                this.getRoomList();
//                                this.list[this.chooseIndex].voteNum = this.list[this.chooseIndex].voteNum+1;
                                Toast({
                                    message: res.data.data.msg,
                                    position: 'center',
                                    duration: 1500
                                })
                            } else {
                                Toast({
                                    message: res.data.data.msg,
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
                    Toast({
                        message: '验证码错误',
                        position: 'center',
                        duration: 1500
                    })
                }
            },
            checkPhoneFun(phone, code) {
                console.log(phone, code)
                this.$axios.HttpGet('/Vote/weiboSeiyVote', {type: 2, voteId: this.voteId, phone: phone, code: code})
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.code == 200) {
                            if (res.data.data.code == 200) {
                                this.getRoomList();
//                                this.list[this.chooseIndex].voteNum = this.list[this.chooseIndex].voteNum+1;
                                this.showPhone = false;
                                Toast({
                                    message: res.data.data.msg,
                                    position: 'center',
                                    duration: 1500
                                })
                            } else {
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
            goBottom: function () {
                this.goDeepLink("uxinlive://webpage?url="+webrul);
            },
            showmore:function(index){
                if (index==this.limit) {
                    this.limit=-1
                }else{
                    this.limit=index;
                }
            },
            goUrl: function (type) {
                if(type == 1){
                    window.location.href = 'https://live.hongdoulive.com/modular/index/active/weiboshengyoupaihangbangguizeye?showshare=1';
                }else if(type == 2){
                    window.location.href = 'https://energy.tv.weibo.cn/e/10327/index';
                }

            },
            getRoomList: function () {
                this.$axios.HttpGet('/vote/weiboSeiyList', {
                    period: this.period,
                    pageNo:this.pageNo
                })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.code === 200) {
                            if(this.pageNo == 1){
                                this.dataList = res.data.data;
                            }else{
                                this.dataList = this.dataList.concat(res.data.data);
                            }

                            this.huancun = false;
                            this.showSeeLoad = false;
                            if(res.data.data.length>=50){
                                this.showSeeMore = true;
                            }else{
                                this.showSeeMore = false;
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
            gouser:function (uid) {
                if (uid) {
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
                    if(index == "#"){
                        console.log("1111")
                        this.period = 'num';
                    }else{
                        index = index.toLowerCase();
                        this.period = index;
                    }

                }
                this.dataList = [];
                this.pageNo = 1;
                this.huancun = true;
                this.getRoomList();
            },
            seeMoreClick:function () {
                this.showSeeLoad = true;
                this.pageNo++;
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
            Toupiao,
            PhoneAuth,
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
            padding-bottom: 70px;
            .topimageOut{
                width:100%;
                height:auto;
                position: relative;
                .rule{
                    width:200px;
                    height:42px;
                    position: absolute;
                    bottom:150px;
                    left:50%;
                    margin-left:-100px;
                }
                .lookaward{
                    width:145px;
                    height:40px;
                    position: absolute;
                    right:14px;
                    bottom:15px;
                }
            }
            .followcontent{
                .content{
                    width:100%;
                    height:100%;
                    position: absolute;
                    left:0;
                    top:0;

                    .ranklistitem{
                        width:100%;
                        height:90px;
                        background: rgba(255,255,255,0.5);
                        padding:0 16px 0 12px;
                        box-sizing: border-box;
                        background: #e0e4fb;

                        margin-bottom: 10px;
                        display: flex;
                        align-items: center;
                        .headimage{
                            width:65px;
                            height:65px;
                            border:1px solid #fff;
                            border-radius: 50%;
                            img{
                                width:100%;
                                height:100%;
                                border-radius: 50%;

                            }
                        }
                        .listinfo{
                            flex: 1;
                            padding-left:15px;
                            box-sizing: border-box;
                            color:#414141;
                            width:0;
                            .username{
                                font-size: 18px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-weight: 500;
                            }
                            .userIntro{
                                font-size: 14px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin-top:6px;
                                font-weight: 400;
                                line-height: 16px;
                            }
                            .userscore{
                                font-size: 15px;
                                color:#e18aff;
                                margin-top:12px;
                            }

                        }
                        .vote{
                            width:100px;
                            height:35px;
                            display: flex;
                            justify-content: center;
                            flex-wrap: wrap;
                            background: #fff;
                            border-radius: 35px;
                            font-size: 16px;
                            color:#ff8383;
                            line-height: 35px;
                            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 6px 12px 0 rgba(0, 0, 0, 0.06);
                            font-weight: 500;
                        }
                    }
                }
            }
            .rankcontent{
                width:100%;
                padding-bottom: 10px;
                background: #8493ee;
                .rankswicth{
                    width:100%;
                    display: flex;
                    align-items: center;
                    .all{
                        width:65px;
                        height:52px;
                        background: #9281ee;
                        line-height: 52px;
                        text-align: center;
                        font-size: 18px;
                    }
                    .itemcontentWraper{
                        width:315px;
                        height:52px;

                        padding:0 0 0 15px;
                        box-sizing: border-box;
                        background:#9dabfb ;
                        overflow: hidden;
                        .itemcontent{
                            width:100%;
                            height:120%;
                            overflow-x: scroll;
                            overflow-y: hidden;
                            white-space: nowrap;
                            /*display: flex;
                            display:-webkit-flex;
                            flex-wrap: nowrap;
                            -webkit-flex-wrap: nowrap;*/
                            -webkit-overflow-scrolling: touch;
                            padding-top:8px;
                            box-sizing: border-box;
                            .item{
                                width:35px;
                                height:35px;
                                background: #d4d4d4;
                                border: 1px solid #fff;
                                border-radius: 10px;
                                text-align: center;
                                line-height: 35px;
                                font-size: 18px;
                                font-weight: 500;
                                margin-right:10px;
                                display: inline-block;

                            }
                        }
                    }

                }
                .ranklist{
                    width:100%;
                    background:#8493ee;
                    padding:12px 8px 1px 8px;
                    box-sizing: border-box;
                    .ranklistitem{
                        width:100%;
                        height:90px;
                        padding:0 16px 0 12px;
                        box-sizing: border-box;
                        background: #e0e4fb;
                        border-radius: 10px;
                        margin-bottom: 10px;
                        display: flex;
                        align-items: center;
                        .headimage{
                            width:65px;
                            height:65px;
                            border:1px solid #fff;
                            border-radius: 10px;
                            img{
                                width:100%;
                                height:100%;
                                border-radius: 10px;

                            }
                        }
                        .listinfo{
                            flex: 1;
                            padding-left:15px;
                            box-sizing: border-box;
                            color:#414141;
                            width:0;
                            .username{
                                font-size: 18px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-weight: 500;
                            }
                            .userIntro{
                                font-size: 14px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                margin-top:6px;
                                font-weight: 400;
                                line-height: 16px;
                            }
                            .userscore{
                                font-size: 15px;
                                color:#e18aff;
                                margin-top:12px;
                            }

                        }
                        .vote{
                            width:70px;
                            display: flex;
                            justify-content: center;
                            flex-wrap: wrap;
                            img{
                                width:auto;
                                height:46px;
                                margin-left:10px;
                            }
                            .votetext{
                                width:100%;
                                font-size: 12px;
                                color:#9281ee;
                                margin-top:5px;
                                font-weight: 500;
                                text-align: center;
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
                    .showMore{
                        color: #fff;
                        margin: 10px auto 0;
                        text-align: center;
                        font-size: 13px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .seeMoreIcon{
                            width: 16px;
                            height: 16px;
                            margin-left: 4px;
                        }
                    }
                }

            }

            .bottom {
                width: 100%;
                height: 75px;
                background: url("https://img.hongrenshuo.com.cn/h5/microblogvoice-bottombtn.png") no-repeat center;
                background-size: 100% auto;
                position: fixed;
                z-index: 100;
                left: 0%;
                bottom: 0px;
            }
        }

    }
</style>

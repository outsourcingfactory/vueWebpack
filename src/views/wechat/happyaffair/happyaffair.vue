<template>
    <div id="app">
        <!--<div class="danmu" :style="{transform:'translate3d('+positionDan+'rem,0px,0px)'}">-->
        <div class="danmu iActive">
            <div class="danmuli" v-for="(item,index) in danArray">
                {{item}}
            </div>
        </div>
        <div class="container">
            <div class="topleft">
                <img src="https://img.hongrenshuo.com.cn/h5/happyaffire-bottomjiao2-ymz.png" alt="">
            </div>
            <div class="topright">
                <img src="https://img.hongrenshuo.com.cn/h5/happyaffire-bottomjiao1-ymz.png" alt="">
            </div>
            <div class="bottomleft">
                <img src="https://img.hongrenshuo.com.cn/h5/happyaffire-bottomjiao1-ymz.png" alt="">
            </div>
            <div class="bottomright">
                <img src="https://img.hongrenshuo.com.cn/h5/happyaffire-bottomjiao2-ymz.png" alt="">
            </div>
            <div class="top">
                <div class="headPic">
                    <Onepic :imgSrc="`${masterInfo.headPortraitUrl?masterInfo.headPortraitUrl:masterInfo.thirdHeadPortraitUrl}?x-oss-process=image/resize,m_mfit,h_200,w_200,limit_0/crop,w_200,h_200,g_center`"></Onepic>
                </div>
                <div class="biaoyu">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/happyaffire-biaoyu-ymz.png`"></Onepic>
                </div>
                <div class="heart">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/happyaffire-heart-ymz.png`"></Onepic>
                </div>
            </div>
            <div class="content">
                <div class="one">
                    <div class="tips">{{tips1}}</div>
                    <div class="headListFive">
                        <div class="imgOne" v-for="(item,index) in topFive">
                            <div class="imgOut">
                                <img :src="`${item.headPortraitUrl}?x-oss-process=image/resize,m_mfit,h_100,w_100,limit_0/crop,w_100,h_100,g_center`"
                                     :class="isbindUid == 0 || isGuest == 1? 'blurImage' : ''" :onerror="defaultHeadImg">
                                <div class="seeNumber">
                                    <span style="color: #27292b">{{item.score}}</span> 浏览
                                </div>
                                <div class="see" v-show="isbindUid == 0 || isGuest == 1"></div>
                                <div class="goSee" v-show="isbindUid == 0 && isGuest == 0" @click="seeMan()">查看</div>
                            </div>
                        </div>
                    </div>
                    <div class="seeMan" @click="seeMan()" v-show="isbindUid == 0 && isGuest == 0">
                        <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/happyaffire-btn1-ymz.png`"></Onepic>
                    </div>
                </div>
                <div class="two">
                    <div class="tips" v-show="userList.length>0">- 他们也来看过{{masterInfo.thirdNickname}} -</div>
                    <div class="headlist">
                        <div class="imgOut" v-for="(item,index) in userList">
                            <img :src="`${item.headPortraitUrl}?x-oss-process=image/resize,m_mfit,h_100,w_100,limit_0/crop,w_100,h_100,g_center`"
                                 alt="" :onerror="defaultHeadImg">
                        </div>
                    </div>
                    <div class="arrow" v-show="allUserList.length > 7" @click="arrowClick()"
                         :class="[rotate?'arrow goArrowClass':'arrow']">
                        <img src="https://img.hongrenshuo.com.cn/h5/happyaffire-arrow-ymz.png" alt="">
                    </div>
                    <div class="shareMan" @click="showshareClick()">
                        <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/happyaffire-btn2-ymz.png`"></Onepic>
                    </div>
                </div>
                <div class="bottom">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/happyaffire-bottomtips-ymz.png`"></Onepic>
                </div>
            </div>
        </div>
        <div class="modal" v-show="showInput">
            <div class="modal-content">
                <div class="modal-title">
                    输入KilaKilaID看谁最关心你
                </div>
                <div class="modal-input">
                    <input type="number" placeholder="请输入KilaKilaID" v-model="bindUid">
                    <div class="modal-confirm" @click="_confirmUid()">
                        破解秘密
                    </div>
                </div>
                <div class="modal-tips">
                    在应用市场搜索并安装KilaKila，登陆成功后，在我- “
                    <img src="https://img.hongrenshuo.com.cn/h5/happyaffire-leftself-ymz.png" class="leftself">
                    “（左上角）-复制ID  ，粘贴到输入框。
                </div>
                <div class="modal-share">
                    <div class="share-left">
                        分享囍事:
                    </div>
                    <div class="share-right" @click="wechatClick()">
                        <img src="https://img.hongrenshuo.com.cn/h5/happyaffire-towx-ymz.png" alt="">
                        <img src="https://img.hongrenshuo.com.cn/h5/happyaffire-towx1-ymz.png" alt="">
                    </div>
                </div>
                <div class="close" @click="modalClick()">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/happyaffire-close-ymz.png`"></Onepic>
                </div>
            </div>
        </div>
        <div class="modal" v-show="showshare" @click="modalClick()">
            <img src="https://img.hongrenshuo.com.cn/h5/happyaffire-showshare-ymz.png" alt="" class="showshare">
        </div>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import Toast from 'assets/js/toast'
    //    import {Rxports} from 'assets/js/common'
    import wx from 'weixin-js-sdk';

    export default {
        data() {
            return {
                masterInfo: {},
                showInput: false,
                showshare: false,
                uid: '',
                topFive: [],
                userList: [],
                allUserList: [],
                sevenUserList: [],
                tips1: '',
                rotate: false,
                isbindUid: 0,
                isGuest: 1,
                bindUid: '',
                danArray: [
                    '骗子！',
                    '我看到了什么？',
                    '吓我一跳……',
                    '你在干什么？妈妈好担心！',
                    '打爆你的狗头',
                    '溜了溜了',
                    '幼稚！',
                    '有人看了你99次？我倒要下载KilaKila看看这是谁！',
                    '请为菊姐打call好嘛',
                    '还好，不是真的。。。',
                    '傻蛋，晚上快出来吃火锅',
                    '哈哈哈哈，我也要拿去骗别人！',
                    '打洗',
                    '搞毛线啊！'
                ],
                shareTitle: '',
                shareDesc: '请大家吃喜糖',
                shareImageUrl: 'https://img.hongrenshuo.com.cn/h5/happyaffire-wxshare-ymz.jpg',
                defaultHeadImg: 'this.src="' + require('../../../assets/SY-headImg.png') + '"',
            }
        },
        created() {
//            this.uid = Rxports.getUrlQuery('uid');
            this._getheadPic();
//            this._danLeft();
        },
        methods: {
//            弹幕滑动
            _danLeft: function () {
                let self = this;
                var timer = setInterval(function () {
                    self.positionDan -= 1
                    console.log(self.positionDan)
                    if (self.positionDan < -31) {
                        clearInterval(timer)
                        self.positionDan = 10;
                    }
                }, 500);
            },
            _getheadPic() {
                this.$axios.HttpGet('/Hotrank/peepingData', {})
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.code == 200) {
                            this.masterInfo = res.data.data.masterInfo;
                            this.tips1 = '- 这些人为' + res.data.data.masterInfo.thirdNickname + '的终身大事操碎了心 -';
                            this.topFive = res.data.data.topFive;
                            this.allUserList = res.data.data.userList;
                            this.shareTitle = res.data.data.shareString;
                            this.shareUrl = res.data.data.shareUrl;
                            if (res.data.data.userList.length < 8) {
                                this.sevenUserList = res.data.data.userList;
                            } else {
                                for (var i = 0; i < 7; i++) {
                                    this.sevenUserList.push(res.data.data.userList[i])
                                }
                            }
                            this.userList = this.sevenUserList;
                            console.log(this.userList)
//                            是否绑定KilaKilaID（0没 1有）
                            this.isbindUid = res.data.data.isbindUid;
//                            主态还是客态（0主 1客）
                            this.isGuest = res.data.data.isGuest;
                            if (this.isGuest == 0 && this.topFive.length == 0) {
                                this.tips1 = '啊哦，大家都识破了你，作战失败'
                            }
                            console.log(this.isbindUid)
                            console.log(this.isGuest)
                        } else {
                            Toast({
                                message: res.data.msg,
                                position: 'center',
                                duration: 1500
                            })
                        }
                        this.wxShareVue(this.shareTitle, this.shareDesc, this.shareImageUrl);
                    })
                    .catch(() => {
                        Toast({
                            message: "网络错误",
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
            _confirmUid: function () {
                _hmt.push(['_trackEvent', '点击解锁', '点击']);
                this.$axios.HttpGet('/Hotrank/peepingBindUid', {'bindUid': this.bindUid})
                    .then((res) => {
                        console.log(res)
                        this.modalClick();
                        if (res.data.code == 200) {
                            Toast({
                                message: '解锁成功',
                                position: 'center',
                                duration: 1500
                            })
                            this._getheadPic();
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
            },
            arrowClick() {
                if (this.rotate == false) {
                    this.rotate = true;
                    this.userList = this.allUserList;
                } else {
                    this.rotate = false;
                    this.userList = this.sevenUserList;
                }
            },
//            谈输入框
            seeMan: function () {
                _hmt.push(['_trackEvent', '点击查看', '点击']);
                this.showInput = true;
            },
//            弹引导分享
            showshareClick: function () {
                _hmt.push(['_trackEvent', '点击分享', '点击']);
                this.showshare = true;
            },
            modalClick: function () {
                this.showshare = false;
                this.showInput = false;
            },
            wxShareVue: function (shareTitle, shareDesc, shareImageUrl) {
//                let pageUrl = this.shareUrl;
                let pageUrl = window.location.href.split('#')[0];
//                pageUrl = pageUrl.substring(0, pageUrl.length - 13) + this.shareUid;
                console.log(pageUrl)
                pageUrl = encodeURIComponent(pageUrl);
                this.$axios.HttpGet('/wxauth', {rq_url: pageUrl}).then((res) => {
                    wx.config({
                        debug: false,
                        appId: res.data.appId,
                        timestamp: res.data.timestamp,
                        nonceStr: res.data.nonceStr,
                        signature: res.data.signature,
                        jsApiList: [
                            "onMenuShareTimeline", "onMenuShareQQ", "onMenuShareAppMessage", "onMenuShareQZone"
                            // 所有要调用的 API 都要加到这个列表中
                        ]
                    });
                }).catch((res) => {
                    console.log(res);
                })
                wx.ready(function () {
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: shareTitle, // 分享标题
                        imgUrl: shareImageUrl, // 分享图标
                        link: '',
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享给朋友
                    wx.onMenuShareAppMessage({
                        title: shareTitle, // 分享标题
                        desc: shareDesc, // 分享描述
                        link: '', // 分享链接
                        imgUrl: shareImageUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享到QQ空间
                    wx.onMenuShareQZone({
                        title: shareTitle, // 分享标题
                        desc: shareDesc, // 分享描述
                        link: '', // 分享链接
                        imgUrl: shareImageUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    //分享到QQ
                    wx.onMenuShareQQ({
                        title: shareTitle, // 分享标题
                        desc: shareDesc, // 分享描述
                        link: '', // 分享链接
                        imgUrl: shareImageUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
            },
            wechatClick: function () {
                _hmt.push(['_trackEvent', '点击分享', '点击']);
                this.showInput = false;
                this.showshare = true;
            }
        },
        components: {
            Onepic
        }
    }
</script>

<style lang="scss">
    html, body {
        height: 100% !important;
        background: #f9d4d4 !important;
    }

    #app {
        background: #f9d4d4;
        padding: 8px 0;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        .danmu {
            position: absolute;
            width: 1200px;
            top: 17px;
            z-index: 400;
            font-size: 14px;
            color: #27292b;
            display: flex;
            flex-wrap: wrap;
            .danmuli {
                height: 24px;
                line-height: 24px;
                padding: 0 15px;
                box-sizing: border-box;
                background: #fff;
                border-radius: 12px;
                margin-left: 4px;
                margin-top: 7px;
            }
        }
        .iActive {
            animation: process 25s linear infinite;
        }
        @keyframes process {
            0% {
                transform: translate3d(10rem, 0px, 0px);
            }

            100% {
                transform: translate3d(-65rem, 0px, 0px);
            }
        }
        @-webkit-keyframes process {
            0% {
                transform: translate3d(10rem, 0px, 0px);
            }

            100% {
                transform: translate3d(-65rem, 0px, 0px);
            }
        }
        .container {
            width: 360px;
            border: 2px solid #c7635e;
            box-sizing: border-box;
            background: #fffafa;
            margin: 0 auto;
            position: relative;
            .topleft, .topright, .bottomleft, .bottomright {
                position: absolute;
                width: 33.5px;
                height: 47.5px;
                z-index: 300;
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .topleft {
                top: -7px;
                left: 0;
                transform: rotate(180deg);
            }
            .topright {
                top: -7px;
                right: 0;
                transform: rotate(180deg);
            }
            .bottomleft {
                bottom: -7px;
                left: 0;

            }
            .bottomright {
                bottom: -7px;
                right: 0;
            }
            .top {
                width: 100%;
                height: 245px;
                background: url("https://img.hongrenshuo.com.cn/h5/happyaffire-topimage-ymz.png") no-repeat center;
                background-size: 100% 100%;
                display: flex;
                justify-content: center;
                position: relative;
                .headPic {
                    width: 134px;
                    height: 134px;
                    border: 1px solid #fff;
                    border-radius: 50%;
                    margin-top: 48px;
                    box-sizing: border-box;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .biaoyu {
                    position: absolute;
                    width: 225px;
                    height: 67px;
                    left: 50%;
                    margin-left: -112.5px;
                    top: 160px;
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
                .heart {
                    width: 356px;
                    height: 18px;
                    position: absolute;
                    left: 0;
                    bottom: -9px;
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
            }
            .content {
                width: 100%;
                .tips {
                    text-align: center;
                    font-size: 14px;
                    color: rgb(39, 41, 43);
                    line-height: 1.2;
                }
                .one {
                    padding: 17px 0;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgb(231, 231, 231);
                    /*height: 212px;*/
                    .headListFive {
                        display: flex;
                        width: 100%;
                        padding-top: 15px;
                        box-sizing: border-box;
                        .imgOne {
                            flex: 1;
                            .imgOut {
                                position: relative;
                                img {
                                    width: 50px;
                                    height: 50px;
                                    border: 1px solid #c66762;
                                    border-radius: 50%;
                                    box-sizing: border-box;
                                    margin: 0 auto 10px;
                                }
                                .blurImage {
                                    filter: blur(6px);
                                }
                                .seeNumber {
                                    text-align: center;
                                    font-size: 12px;
                                    color: #c8c7c7;
                                }
                                .see {
                                    position: absolute;
                                    width: 50px;
                                    height: 50px;
                                    background: rgba(0, 0, 0, 0.5);
                                    left: 50%;
                                    margin-left: -25px;
                                    top: 0;
                                    border-radius: 50%;
                                    /*display: flex;*/
                                    /*align-items: center;*/
                                    /*justify-content: center;*/
                                }
                                .goSee {
                                    position: absolute;
                                    width: 50px;
                                    height: 50px;
                                    left: 50%;
                                    margin-left: -25px;
                                    top: 0;
                                    border-radius: 50%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    z-index: 400;
                                }
                            }
                        }
                    }
                    .seeMan {
                        width: 270px;
                        height: 40px;
                        margin: 20px auto 15px;
                    }
                }
                .two {
                    padding: 17px 0 0;
                    box-sizing: border-box;
                    position: relative;
                    .headlist {
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;

                        .imgOut {
                            width: 30px;
                            height: 30px;
                            box-sizing: border-box;
                            border: 1px solid #c66762;
                            border-radius: 50%;
                            margin-left: 15px;
                            margin-top: 15px;
                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }

                    }
                    .arrow {
                        position: absolute;
                        padding: 10px;
                        right: 5px;
                        top: 50px;
                        transition: all 0.5s linear;
                        transform: rotate(0deg);
                        img {
                            width: 15px;
                            height: 8px;
                        }
                    }
                    .goArrowClass {
                        transition: all 0.5s linear;
                        transform: rotate(180deg);
                    }
                    .shareMan {
                        width: 270px;
                        height: 40px;
                        margin: 22px auto 15px;
                    }
                }
                .bottom {
                    width: 229px;
                    height: 19px;
                    margin: 0 auto;
                    padding-bottom: 27px;
                }
            }
        }
        .modal {
            background: rgba(0, 0, 0, 0.7);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            overflow: hidden;
            -webkit-overflow-scrolling: touch;
            display: flex;
            align-items: center;
            justify-content: center;
            .showshare {
                width: 251px;
                height: 268px;
            }
            .modal-content {
                width: 310px;
                height: 245px;
                background: #fff;
                border-radius: 6px;
                padding: 38px 13px;
                box-sizing: border-box;
                position: relative;
                .close {
                    position: absolute;
                    padding: 10px;
                    width: 13.5px;
                    height: 13.5px;
                    right: 0;
                    top: 0;
                }
                .modal-title {
                    text-align: center;
                    color: #000;
                    font-size: 18px;
                    font-weight: 500;
                }
                .modal-input {
                    width: 100%;
                    height: 40px;
                    background: #f0f0f0;
                    margin-top: 18px;
                    border-radius: 20px;
                    position: relative;
                    padding-left: 15px;
                    box-sizing: border-box;
                    .modal-confirm {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 93px;
                        height: 40px;
                        border-radius: 20px;
                        background: #ef8983;
                        text-align: center;
                        line-height: 40px;
                        font-size: 14px;

                    }
                    input {
                        width: 173px;
                        height: 100%;
                        background: #f0f0f0;
                        outline: none;
                        border: 0;
                        box-sizing: border-box;
                    }
                }
                .modal-tips {
                    padding: 20px 0 10px;
                    font-size: 12px;
                    color: #989a9b;
                    line-height: 20px;
                    border-bottom: 1px solid rgb(231, 231, 231);
                    .leftself {
                        display: inline-block;
                    }
                    img {
                        width: 16px;
                        height: 18px;
                        vertical-align: middle;
                    }
                }
                .modal-share {
                    width: 100%;
                    height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 13px;
                    color: #000;
                    font-weight: 400;
                    .share-right {
                        display: flex;
                        img {
                            width: 35px;
                            height: 35px;
                            margin-left: 17px;
                        }
                    }
                }
            }
        }
    }
</style>

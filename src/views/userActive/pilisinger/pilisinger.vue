<template>
    <div id="app">
        <div class="container" v-show="!showWx">
            <div class="topimgae">
                <img src="https://img.hongrenshuo.com.cn/h5/pili2-topimage-ymz.png" alt="">
                <div class="rule" @click="goRule()"></div>
            </div>
            <div class="clear"></div>
            <div class="fusai">
                <div class="clickLeft" @click="goLeftClick()"></div>
                <div class="clickRight" @click="goRightClick()"></div>
                <div class="bangList">
                    <div class="bangTitle">
                        <img src="https://img.hongrenshuo.com.cn/h5/pili2-sexTitle-ymz.png">
                    </div>
                    <div class="bangUl">
                        <div class="bangUl-Li">
                            <div class="bangUl-item rightLine" v-for="(item,index) in man" v-if="index < 3">
                                <div class="bangLi-head" @click="goRoom(null,item.uid)">
                                    <img :src="item.headPic">
                                    <p>{{item.nickname}}</p>
                                </div>
                                <div class="goPick"  @click="goPiao(item.uid)">
                                    <img src="https://img.hongrenshuo.com.cn/h5/pili2-toupiao-ymz.png">
                                    <p>{{item.voteNum}}票</p>
                                </div>
                            </div>
                        </div>
                        <div class="bangUl-Li">
                            <div class="bangUl-item" v-for="(item,index) in women" v-if="index < 3">
                                <div class="bangLi-head" @click="goRoom(null,item.uid)">
                                    <img :src="item.headPic">
                                    <p>{{item.nickname}}</p>
                                </div>
                                <div class="goPick" @click="goPiao(item.uid)">
                                    <img src="https://img.hongrenshuo.com.cn/h5/pili2-toupiao-ymz.png">
                                    <p>{{item.voteNum}}票</p>
                                </div>
                            </div>
                        </div>
                        <div v-show="huancun" class="loading-container">
                            <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                                 class="huancunGif">
                        </div>
                    </div>
                </div>
                <div class="showModalToast" @click="showModalClick"></div>
            </div>
            <div class="huigu">
                <div class="view uid1" @click="goRoom(null,2153101512720)"></div>
                <div class="view uid2" @click="goRoom(null,1866937597956)"></div>
            </div>
            <div class="bottom">
                <img src="https://img.hongrenshuo.com.cn/h5/pili2-bottom-ymz.png" alt="">
            </div>
            <div class="modal" v-show="showModal">
                <div class="modal-content">
                    <div class="title">
                        <img src="https://img.hongrenshuo.com.cn/h5/pili2-toupiaotitle-ymz.png" alt="">
                    </div>
                    <div class="close" @click="closeshowModal()">
                        <img src="https://img.hongrenshuo.com.cn/h5/pili2-close-ymz.png" alt="">
                    </div>
                    <div class="bangList1">
                        <div class="bangTitle">
                            <img src="https://img.hongrenshuo.com.cn/h5/pili2-sexTitle-ymz.png">
                        </div>
                        <div class="bangUl">
                            <div class="bangUl-Li">
                                <div class="bangUl-item rightLine" v-for="(item,index) in man">
                                    <div class="bangLi-head" @click="goRoom(null,item.uid)">
                                        <img :src="item.headPic">
                                        <p>{{item.nickname}}</p>
                                    </div>
                                    <div class="goPick" @click="goPiao(item.uid)">
                                        <img src="https://img.hongrenshuo.com.cn/h5/pili2-toupiao-ymz.png">
                                        <p>{{item.voteNum}}票</p>
                                    </div>
                                </div>
                            </div>
                            <div class="bangUl-Li">
                                <div class="bangUl-item" v-for="(item,index) in women">
                                    <div class="bangLi-head" @click="goRoom(null,item.uid)">
                                        <img :src="item.headPic">
                                        <p>{{item.nickname}}</p>
                                    </div>
                                    <div class="goPick" @click="goPiao(item.uid)">
                                        <img src="https://img.hongrenshuo.com.cn/h5/pili2-toupiao-ymz.png">
                                        <p>{{item.voteNum}}票</p>
                                    </div>
                                </div>
                            </div>
                            <div v-show="huancun" class="loading-container">
                                <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" class="huancunGif">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <toupiao :show="showPic" :bgColor="'#fcd372'" v-on:closeModalPic="closePic"
                     v-on:checkCode="checkCodeFun"></toupiao>
            <phoneAuth :show="showPhone" :bgColor="'#fcd372'" v-on:closeModalPhone="closePhone"
                       v-on:checkPhone="checkPhoneFun"></phoneAuth>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import {ymzBaseFun, na} from 'assets/js/common'
    import Toast from 'assets/js/toast'
    import Toupiao from 'components/baseymz/toupiao.vue'
    import PhoneAuth from 'components/baseymz/phoneAuth.vue'
    import Wxcontent from 'components/baseymz/Wxcontent'
    let shareTitle = '古风有霹雳第二季歌手征集活动';
    let shareDesc = '古风有霹雳第二季，等你来战哦！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/pilisinger-wxshare-ymz.jpg';
//    //解决遮罩层滚动穿透问题，分别在遮罩层弹出后和关闭前调用
//    const ModalHelper = ( (bodyCls) =>{
//        let scrollTop;
//        return {
//            afterOpen: function () {
//                scrollTop = document.scrollingElement.scrollTop;
//                document.body.classList.add(bodyCls);
//                document.body.style.top = -scrollTop + 'px';
//            },
//            beforeClose: function () {
//                document.body.classList.remove(bodyCls);
//                // scrollTop lost after set position:fixed, restore it back.
//                document.scrollingElement.scrollTop = scrollTop;
//            }
//        };
//    })('dialog-open');
    export default {
        data() {
            return {
                man: [],
                women: [],
                huancun: true,
                showModal: false,
                showPhone: false,
                showPic: false,
                showWx:false
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            this.getDataList()
        },
        mounted() {

        },
        methods: {
            closePhone(e) {
                this.showPhone = e;
            },
            closePic(e) {
                this.showPic = e;
            },
            checkCodeFun(e) {
                if (e == true) {
                    this.$axios.HttpGet('/Vote/thunderVote', {type: 1, voteUid: this.voteUid})
                        .then((res) => {
                            console.log(res.data)
                            if (res.data.data.code == 200) {
                                this.getDataList();
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
                this.$axios.HttpGet('/Vote/thunderVote', {type: 2, voteUid: this.voteUid, phone: phone, code: code})
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.code == 200) {
                            if (res.data.data.code == 200) {
                                this.getDataList();
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
            goRule: function () {
                window.location.href = '/VideoActive/pilisingerrule?showshare=1';
            },
            goLeftClick: function () {
                window.location.href = 'https://live.hongdoulive.com/modular/index/active/gfypl2?showshare=1';
            },
            goRightClick: function () {
                window.location.href = 'https://pan.baidu.com/s/1_xMvJjaUU7oDT4PJm1oofw';
            },
            showModalClick: function () {
//                ModalHelper.afterOpen();
                this.showModal = true;
            },
            closeshowModal: function () {
                this.showModal = false;
//                ModalHelper.beforeClose();
            },
            getDataList: function () {
                this.man = [];
                this.women = [];
                this.huancun = true;
                this.$axios.HttpGet('/Vote/thunderList')
                    .then((res) => {
                        console.log(res.data.data);
                        if (res.data.code === 200) {
                            this.huancun = false;
                            this.man = res.data.data[0];
                            this.women = res.data.data[1];
                        } else {
                            Toast({
                                message: res.data.msg,
                                position: 'center',
                                duration: 1500
                            })
                        }
                    })
                    .catch((res) => {
                        Toast({
                            message: '网络错误',
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
            goPiao(uid) {
                if (na.match(/hongdoulive/i)) {
                    this.$axios.HttpGet('/Vote/thunderCheckVote', {})
                        .then((res) => {
                            console.log(res.data)
                            this.voteUid = uid;
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
                    this.goDeepLink("uxinlive://webpage?url=https%3A%2F%2Flive.hongdoulive.com%2FVote%2FthunderIndex%3Fshowshare%3D1");
                }
            },
            goDeepLink: function (url) {
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
            },
        },
        components: {
            Toupiao,
            PhoneAuth,
            Wxcontent
        }
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        background: url("https://img.hongrenshuo.com.cn/h5/pili2-bgImage-ymz.png");
        background-repeat: repeat-y;
        background-size: 100% auto;
        img {
            width: 100%;
            height: auto;
        }
        .topimgae {
            width: 365px;
            height: 575px;
            float: right;
            position: relative;
            margin-top: 20px;
            .rule {
                position: absolute;
                right: 8px;
                top: 0;
                width: 78px;
                height: 78px;
            }
        }
        .clear {
            clear: both;
        }
        .loading-container {
            width: 100%;
            height: 200px;
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
        .fusai {
            width: 355px;
            height: 524px;
            background: url("https://img.hongrenshuo.com.cn/h5/pili2-fusai-ymz.png") no-repeat center;
            background-size: 100% 100%;
            margin: 0 auto;
            position: relative;
            .clickLeft, .clickRight {
                width: 50%;
                position: absolute;
                top: 116px;
                height: 44px;
            }
            .clickLeft {
                left: 0;
            }
            .clickRight {
                right: 0;
            }
            .bangList {
                position: absolute;
                width: 100%;
                left: 0;
                top: 186px;

            }
            .showModalToast {
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 22px;
                height: 44px;
            }
        }

        .bangTitle {
            width: 260px;
            height: 26px;
            margin: 0 auto;
        }
        .bangUl {
            display: flex;
            .bangUl-Li {
                flex: 1;
                .bangUl-item {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    padding-top: 10px;
                    p {
                        text-align: center;
                        line-height: 23px;
                        color: #ffeea9;
                        font-size: 12px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .bangLi-head {
                        width: 105px;
                        img {
                            width: 45px;
                            height: 45px;
                            border: 1px solid #fff;
                            border-radius: 50%;
                            box-sizing: border-box;
                            background: #f7de9e;
                            margin: 0 auto;
                        }
                        p {
                            padding-left: 7px;
                            box-sizing: border-box;
                        }

                    }
                    .goPick {
                        img {
                            width: 65px;
                            height: 24px;
                        }
                        p {
                            line-height: 26px;
                        }
                    }
                }
            }
            .rightLine {
                border-right: 1px solid #8e805d;
            }
        }

        .huigu {
            width: 355px;
            height: 534px;
            background: url("https://img.hongrenshuo.com.cn/h5/pili2-yure-ymz.png") no-repeat center;
            background-size: 100% 100%;
            margin: 25px auto 0;
            position: relative;
            .view {
                position: absolute;
                left: 0;
                width: 100%;
                height: 80px;
            }
            .uid1 {
                top: 98px;
            }
            .uid2 {
                bottom: 110px;
            }
        }
        .bottom {
            width: 207px;
            height: 101px;
            margin: 30px auto 0;
        }
        .modal {
            background: rgba(0, 0, 0, 0.7);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 800;
            overflow: hidden;
            -webkit-overflow-scrolling: touch;
            display: flex;
            align-items: center;
            justify-content: center;
            .modal-content {
                width: 363px;
                background: url("https://img.hongrenshuo.com.cn/h5/pili2-bgImage-ymz.png");
                background-repeat: repeat-y;
                background-size: 100% auto;
                border: 2px solid #f8de9e;
                position: relative;
                .title {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 229px;
                    height: 30px;
                    top: -7px;
                }
                .close {
                    position: absolute;
                    right: -2px;
                    top: -2px;
                    width: 61px;
                    height: 38px;
                }
                .bangList1 {
                    width: 100%;
                    padding: 45px 0 20px;
                    .bangUl {
                        padding-bottom: 20px;
                        max-height: 300px;
                        box-sizing: border-box;
                        overflow-x: hidden;
                        overflow-y: scroll;
                        &::-webkit-scrollbar {
                            display: none;
                        }
                    }
                }
            }
        }
    }
</style>

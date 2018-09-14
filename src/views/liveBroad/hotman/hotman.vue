<template>
    <div id="app">
        <div class="container" v-show="!showWx">
            <div class="topImage">
                <img src="https://img.hongrenshuo.com.cn/h5/renqi-topimage1-ymz.png" alt="">
                <div class="rule" @click="goRule()"></div>
            </div>
            <div class="content">
                <div class="contentLiOut" v-for="(item,index) in list">
                    <div class="contentLi" @click="goRoom(item.roomId,item.uid)">
                        <div class="num">{{index + 1}}</div>
                        <div class="headPic">
                            <div class="head">
                                <img v-lazy="item.headPic">
                            </div>
                        </div>
                        <div class="desc">
                            <div class="descIn">
                                <div class="nickName">昵称：{{item.nickname}}</div>
                                <div class="piaoNum">投票数：{{item.voteNum}}票</div>
                            </div>
                        </div>
                        <div class="goPiao" @click.stop="goPiao(item.uid,index)"></div>
                    </div>
                    <div class="line">
                        <img src="https://img.hongrenshuo.com.cn/h5/renqi-line1-ymz.png">
                    </div>
                </div>
            </div>
            <div class="bottom">
                <img src="https://img.hongrenshuo.com.cn/h5/renqi-bottomImage1-ymz.png" alt="">
            </div>
            <toupiao :show="showPic" :bgColor="'#7e4928'" v-on:closeModalPic="closePic"
                     v-on:checkCode="checkCodeFun"></toupiao>
            <phoneAuth :show="showPhone" :bgColor="'#7e4928'" v-on:closeModalPhone="closePhone"
                       v-on:checkPhone="checkPhoneFun"></phoneAuth>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import Toast from 'assets/js/toast'
    import Toupiao from 'components/baseymz/toupiao.vue'
    import PhoneAuth from 'components/baseymz/phoneAuth.vue'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    let shareTitle = '两周年最具人气家族评选';
    let shareDesc = '号角已吹响，快来集结战队为家族荣誉而战吧~';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/renqi-wxshare-ymz.jpg';
    export default {
        data() {
            return {
                list: [],
                showPhone: false,
                showPic: false,
                voteUid: '',
                chooseIndex: '',
                showWx: false
            }
        },
        created() {
            this.getDataList();
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        methods: {
            goRule(){
                window.location.href = 'https://live.hongdoulive.com/modular/index/active/renqijiazu?showshare=1';
            },
            getDataList() {
                this.$axios.HttpGet('/Vote/twoYearHotList', {})
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.code === 200) {
                            this.list = res.data.data;
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
            goPiao(uid, index) {
                if (na.match(/hongdoulive/i)) {
                    this.$axios.HttpGet('/Vote/twoYearCheckVote', {})
                        .then((res) => {
                            console.log(res.data)
                            this.voteUid = uid;
                            this.chooseIndex = index;
                            if (res.data.code === 200) {
                                if (res.data.data.code == 200) {
                                    if (res.data.data.type == 1) { //图像验证
                                        this.showPic = true;
                                    } else if (res.data.data.type == 2) { //手机验证
                                        this.showPhone = true;
                                    } else {

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
                    this.goDeepLink("uxinlive://webpage?url=https%3A%2F%2Flive.hongdoulive.com%2FUnionActive%2FtwoYearIndex%3Fshowshare%3D1");
                }
            },
            closePhone(e) {
                this.showPhone = e;
            },
            closePic(e) {
                this.showPic = e;
            },
            checkCodeFun(e) {
                if (e == true) {
                    this.$axios.HttpGet('/Vote/twoYearVote', {type: 1, voteUid: this.voteUid})
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
                this.$axios.HttpGet('/Vote/twoYearVote', {type: 2, voteUid: this.voteUid, phone: phone, code: code})
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
            Toupiao,
            PhoneAuth,
            Wxcontent
        },
    }
</script>

<style lang="scss" scoped>
    #app {
        background: #fafff5;
        position: relative;
        img {
            width: 100%;
            height: auto;
        }
        .topImage {
            width: 100%;
            height: 537px;
            position: relative;
            .rule{
                position: absolute;
                width: 120px;
                height: 60px;
                right: 24px;
                bottom: 205px;
            }
        }
        .content {
            padding: 0 10px 0 10px;
            box-sizing: border-box;
            .contentLi {
                width: 100%;
                height: 63px;
                display: flex;
                align-items: center;
                color: #1d2524;
                .num {
                    width: 30px;
                    font-size: 28px;
                    font-weight: 500;

                    text-align: center;
                }
                .headPic {
                    width: 60px;
                    .head {
                        width: 53px;
                        height: 53px;
                        margin: 0 auto;
                        background: url("https://img.hongrenshuo.com.cn/h5/renqi-headBg-ymz.png") no-repeat center;
                        background-size: 100% 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                        }
                    }
                }
                .goPiao {
                    width: 80px;
                    height: 38px;
                    margin: 0 auto;
                    background: url("https://img.hongrenshuo.com.cn/h5/renqi-toupiao-ymz.png?v=3") no-repeat center;
                    background-size: 100% 100%;
                }
                .desc {
                    padding-left: 5px;
                    box-sizing: border-box;
                    width: 0;
                    flex: 1;
                    font-weight: 400;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .descIn {
                        width: 100%;
                        .nickName {
                            font-size: 14px;
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .piaoNum {
                            font-size: 12px;
                            padding-top: 5px;
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
                height: 5px;
            }
        }
        .bottom {
            width: 100%;
            height: 76px;
        }
    }
</style>

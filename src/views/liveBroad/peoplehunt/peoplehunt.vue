<template>
    <div id="app">
        <div class="appContent" :class="ticket.length>0?'appContent-active':''" v-show="!showWx">
            <div class="top">
                <div class="ditu">
                    <div :class="[`baohe${index+1}`,computedStatus(item.status)]" v-for="(item,index) in map"
                         @click="clickBaohe(item.status,index)">
                        <img :src="`https://img.hongrenshuo.com.cn/h5/quanmin-${computedStatus(item.status)}-ymz.png`"
                             alt="">
                    </div>
                </div>
                <div class="rule" @click="goRule()"></div>
            </div>
            <div class="content">
                <div class="contentIn" ref="wrapper">
                    <div class="content-wrapper">
                        <div class="contentLi" v-for="(item,index) in list" @click="goRoom(item.roomId,item.uid)">
                            <div class="num">{{index + 1}}</div>
                            <div class="headPic">
                                <img :src="item.headPic" alt="">
                            </div>
                            <div class="desc">
                                <div class="nickName">
                                    {{item.nickname}}
                                </div>
                                <div class="descIn">
                                    {{item.introduction ? item.introduction : '暂无简介'}}
                                </div>
                                <div class="rank">
                                    红豆数：{{item.score}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tips">
                本活动最终解释权归KilaKila所有
            </div>
            <div class="modal" v-show="cardQuan || cardImage">
                <div class="modal-content">
                    <div class="close" @click="closeModal()">
                        <img src="https://img.hongrenshuo.com.cn/h5/quanmin-close-ymz.png" alt="">
                    </div>
                    <div class="middle"  v-show="cardQuan">
                        <div class="middle-title">
                            恭喜你获得了一张<span>福利券</span>
                        </div>
                        <div class="quanBg">
                            <div class="quanTitle">
                                福利券
                            </div>
                            <p class="p1">KilaKila充值红豆福利券</p>
                            <p class="p2">限2018.09.04当天使用</p>
                        </div>
                        <div class="goBtn" @click="goPay()">
                            立即使用
                        </div>
                    </div>
                    <div class="middle"  v-show="cardImage">
                        <div class="middle-title pic-middle">
                            恭喜你获得了一张<br><span>{{titleName[imageIndex-1]}} 定制立绘</span>
                        </div>
                        <div class="imgOut">
                            <img :src="`https://img.hongrenshuo.com.cn/h5/peoplehunt-cardImage${imageIndex}-ymz.png`" alt="" class="downImage">
                        </div>
                        <div class="tipsBg">
                            长按或截图保存图片至相册
                        </div>
                    </div>

                </div>
            </div>
            <div class="bottomOut">
                <div class="bottom" @click="showZheList()" v-show="ticket.length>0">
                    我的福利券（{{ticket.length}}）
                </div>
                <transition name="fold">
                    <div class="dazheList" v-show="listShow">
                        <div class="dazheLi" v-for="item in ticket">
                            <div class="left">
                                <div class="juan">优惠券</div>
                                <div class="desc">
                                    <p class="p1">KilaKila充值红豆优惠券</p>
                                    <p class="p2">限2018.09.04当天使用</p>
                                </div>
                            </div>
                            <div class="right">
                                <div class="goBtn" @click="goPay()">
                                    立即使用
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="listmask" v-show="listShow" @click="showZheList"></div>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import Toast from 'assets/js/toast'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    let shareTitle = 'KilaKila两周年全民寻宝记';
    let shareDesc = '两周年超值福利来袭，完成任务得宝箱，超高概率获得心爱主播两周年限量壁纸和红豆福利劵哦～';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/quanmin-wxshare-ymz.png';
    export default {
        data() {
            return {
                list: [],
                map: [],
                ticket: [],
                listShow: false,
                eng: ['A', 'B', 'C'],
                cardQuan: false,
                cardImage: false,
                imageIndex:1,
                titleName:[
                    '六亿 苏莫离 柒夜',
                    'CV提莫 古月三刀  CV晓水',
                    '晨阳 南述  阳光',
                    '秋风 CV初辞  CV枫',
                    '学良 头牌先生 阿乐',
                    '七次郎 十忆  Mr_醉醉',
                ],
                showWx: false,
            }
        },
        created() {
            this.getData(0);
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        mounted() {
        },
        methods: {
            goRule(){
                window.location.href = 'https://live.hongdoulive.com/modular/index/active/quanminxunbao?showshare=1';
            },
            showZheList() {
                this.getData(1);

            },
            closeModal(){
              this.cardQuan = false;
              this.cardImage = false;
            },
            computedStatus(type) {
                if (type == 2) {
                    return 'baoheB'
                } else if (type == 3) {
                    return 'baoheC'
                } else {
                    return 'baoheA'
                }
            },
            goPay() {
                window.location.href = 'uxinlive://charge';
                this.listShow = false;
                this.cardQuan = false;
            },
            clickBaohe(status, index) {
                if (na.match(/hongdoulive/i)) {
                    if (status == 1) {
                        Toast({
                            message: '完成当前任务才可以开启宝箱哦',
                            position: 'center',
                            duration: 1500
                        })
                    } else if (status == 3) {
                        Toast({
                            message: '该宝箱已经开过了哦',
                            position: 'center',
                            duration: 1500
                        })
                    } else {
                        this.$axios.HttpGet('/UnionActive/twoYearLottery', {place: index + 1})
                            .then((res) => {
                                console.log(res.data.data);
                                if (res.data.code === 200) {
                                    //打开宝箱
                                    this.map[index].status = 3;
                                    if (res.data.data.type == 2) {
                                        //优惠券
                                        this.cardQuan = true;
                                        this.ticket.length = this.ticket.length+1;
                                    } else if(res.data.data.type==1){
                                        this.cardImage = true;
                                        this.imageIndex = res.data.data.pic;
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
                                    message: "网络错误",
                                    position: 'center',
                                    duration: 1500
                                })
                            })
                    }
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
            getData(time) {
                this.$axios.HttpGet('/UnionActive/twoYearList')
                    .then((res) => {
                        console.log(res.data.data)
                        if (res.data.code === 200) {
                            this.list = res.data.data.list;
                            this.map = res.data.data.map;
                            this.ticket.length = res.data.data.ticket;
                            if(time == 1){
                                if(this.ticket.length == 0){
                                    return
                                }else{
                                    this.listShow = !this.listShow;
                                }
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
                            message: "网络错误",
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
        },
        components: {
            Wxcontent
        },
    }
</script>

<style lang="scss">
    #app {
        background: #2c49b2;
        img {
            width: 100%;
            height: auto;
        }
        .appContent {
            padding-bottom: 20px;
            .top {
                width: 100%;
                height: 1354px;
                background: url("https://img.hongrenshuo.com.cn/h5/quanmin-top1-ymz.png?v=3") no-repeat center;
                background-size: 100% 100%;
                padding-top: 600px;
                box-sizing: border-box;
                position: relative;
                .ditu {
                    width: 345px;
                    height: 609px;
                    margin: 38px auto 0;
                    background: url("https://img.hongrenshuo.com.cn/h5/quanmin-ditu-ymz.png") no-repeat center;
                    background-size: 100% 100%;
                    position: relative;
                    .baohe1 {
                        position: absolute;
                        left: 16px;
                        top: 120px;
                    }
                    .baohe2 {
                        position: absolute;
                        right: 20px;
                        top: 20px;
                    }
                    .baohe3 {
                        position: absolute;
                        right: 5px;
                        top: 243px;
                    }
                    .baohe4 {
                        position: absolute;
                        left: 50px;
                        top: 292px;
                    }
                    .baohe5 {
                        position: absolute;
                        right: 26px;
                        top: 396px;
                    }
                    .baohe6 {
                        position: absolute;
                        left: 82px;
                        bottom: 80px;
                    }
                    .baohe7 {
                        position: absolute;
                        right: 115px;
                        bottom: -32px;
                    }
                    .baoheA {
                        width: 64px;
                        height: 61px;
                    }
                    .baoheB {
                        width: 60px;
                        height: 56px;
                    }
                    .baoheC {
                        width: 85px;
                        height: 80px;
                    }
                }
                .rule{
                    position: absolute;
                    left: 0;
                    top:370px;
                    height: 60px;
                    width: 100%;
                }
            }
            .content {
                width: 355px;
                margin: 0 auto;
                background: #3e65d6;
                border: 2px solid #6987d6;
                box-sizing: border-box;
                border-radius: 10px;
                padding: 20px 6px;
                .contentIn {
                    overflow: hidden;
                    height: 100%;
                    .contentLi {
                        width: 100%;
                        height: 73px;
                        border: 1px solid #fff;
                        border-radius: 10px;
                        margin-top: 10px;
                        display: flex;
                        align-items: center;
                        padding: 0 15px;
                        box-sizing: border-box;
                        background: #3d54af;
                        .num {
                            font-size: 16px;
                            font-weight: 500;
                            color: #fff;
                        }
                        .headPic {
                            width: 59px;
                            height: 59px;
                            margin: 0 10px 0 15px;
                        }
                        .desc {
                            width: 0;
                            flex: 1;
                            .nickName, .descIn {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                color: #fff;
                                line-height: 20px;
                                font-size: 12px;
                            }
                            .nickName {
                                font-size: 14px;
                                font-weight: 400;
                            }
                            .rank {
                                font-size: 12px;
                                color: #ffb2fa;
                                font-weight: 400;
                            }
                        }
                    }
                }
            }
            .tips {
                width: 100%;
                font-size: 12px;
                font-weight: 400;
                line-height: 50px;
                color: #92adff;
                text-align: center;
            }
            .modal {
                width: 100%;
                height: 100%;
                position: fixed;
                left: 0;
                top: 0;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                .modal-content {
                    width: 305px;
                    border-radius: 10px;
                    background: #f4f9ff;
                    position: relative;
                    padding: 40px 0 10px;
                    .close {
                        width: 35px;
                        height: 35px;
                        position: absolute;
                        right: 6px;
                        top: 6px;
                    }
                    .middle {
                        text-align: center;
                        font-size: 20px;
                        color: #3a3a3a;
                        .middle-title {
                            font-weight: 400;
                            span {
                                color: #5778be;
                            }
                        }
                        .pic-middle {
                            font-size: 15px;
                            line-height: 23px;
                        }
                        .quanBg {
                            margin: 20px auto;
                            width: 260px;
                            height: 147px;
                            background: url("https://img.hongrenshuo.com.cn/h5/quanmin-cardBg-ymz.png") no-repeat center;
                            background-size: 100% 100%;
                            text-align: center;
                            padding: 15px 0;
                            box-sizing: border-box;
                            .quanTitle {
                                color: #4b68d8;
                                font-size: 40px;
                                font-weight: 500;
                                line-height: 60px;
                            }
                            .p1 {
                                font-size: 12px;
                                color: #4e4e4e;
                                line-height: 24px;
                            }
                            .p2 {
                                font-size: 12px;
                                color: #656565;
                            }
                        }
                        .imgOut {
                            width: 270px;
                            height: auto;
                            margin: 0 auto;
                            z-index: 8000;
                            .downImage{
                                z-index: 9000;
                                pointer-events: auto;
                                width: 100%;
                                height: auto;
                            }
                        }
                        .tipsBg {
                            font-size: 13px;
                            color: #5778be;
                            line-height: 30px;
                        }
                        .goBtn {
                            width: 100px;
                            height: 40px;
                            line-height: 40px;
                            text-align: center;
                            border-radius: 20px;
                            color: #fff;
                            font-size: 16px;
                            background: #4b68d8;
                            margin: 0 auto;
                        }
                    }
                }
            }
            .bottomOut {
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
                z-index: 100;
                .bottom {
                    width: 100%;
                    height: 59px;
                    background: url("https://img.hongrenshuo.com.cn/h5/quanmin-bottomImage-ymz.png") no-repeat center;
                    background-size: 100% 100%;
                    text-align: center;
                    line-height: 59px;
                    font-size: 20px;
                    font-weight: 500;
                }
                .dazheList {
                    width: 100%;
                    background: #fff;
                    border-radius: 10px 10px 0 0;
                    position: absolute;
                    left: 0;
                    top: 0;
                    padding: 12px 0;
                    box-sizing: border-box;
                    z-index: -1;
                    transform: translate3d(0, -100%, 0);
                    &.fold-enter-active, &.fold-leave-active {
                        transition: all 0.5s;
                    }
                    &.fold-enter, &.fold-leave-active {
                        transform: translate3d(0, 0, 0);
                    }
                    .dazheLi {
                        margin: 6px auto 0;
                        width: 360px;
                        height: 76px;
                        background: url("https://img.hongrenshuo.com.cn/h5/quanmin-cardBg1-ymz.png") no-repeat center;
                        background-size: 100% 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 12px;
                        box-sizing: border-box;
                        .left {
                            display: flex;
                            align-items: center;
                            .juan {
                                color: #4b68d8;
                                font-size: 32px;
                                font-weight: 500;
                                margin-right: 10px;
                            }
                            .p1 {
                                font-size: 12px;
                                color: #4e4e4e;
                                line-height: 24px;
                                font-weight: 400;
                            }
                            .p2 {
                                font-size: 12px;
                                color: #656565;
                            }
                        }
                        .right {
                            .goBtn {
                                width: 80px;
                                height: 30px;
                                line-height: 30px;
                                text-align: center;
                                border-radius: 15px;
                                color: #fff;
                                font-size: 14px;
                                background: #4b68d8;
                            }
                        }
                    }
                }
            }
            .listmask {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 40;
                background: rgba(0, 0, 0, 0.6);
            }
        }
        .appContent-active {
            padding-bottom: 60px;
        }
    }
</style>

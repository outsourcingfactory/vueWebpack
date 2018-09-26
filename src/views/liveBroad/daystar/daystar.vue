<template>
    <div id="app">
        <div class="container" v-show="!showWx">
            <div class="topImage">
                <img src="https://img.hongrenshuo.com.cn/h5/daystar-topimage-ymz.png" alt="">
                <div class="rule" @click="goRule()"></div>
                <div class="timeTab">
                    <div class="timeTabLi" @click="tabClick(1)" :class="tabIndex == '1'?'timeTabLiActive':''">
                        <div>
                            <p class="p1">9.26</p>
                            <p class="p2">海选</p>
                        </div>
                    </div>
                    <div class="timeTabLi"  @click="tabClick(2)" :class="tabIndex == '2'?'timeTabLiActive':''">
                        <div>
                            <p class="p1">9.27</p>
                            <p class="p2">初赛</p>
                        </div>
                    </div>
                    <div class="timeTabLi"  @click="tabClick(3)" :class="tabIndex == '3'?'timeTabLiActive':''">
                        <div>
                            <p class="p1">9.28</p>
                            <p class="p2">复赛</p>
                        </div>
                    </div>
                    <div class="timeTabLi"  @click="tabClick(4)" :class="tabIndex == '4'?'timeTabLiActive':''">
                        <div>
                            <p class="p1">9.29</p>
                            <p class="p2">决赛</p>
                        </div>
                    </div>
                </div>
                <div class="famTabUl">
                    <div class="famTab" @click="famClick(1)" :class="famIndex == '1'?'famTabActive':''">唱见</div>
                    <div class="famTab" @click="famClick(2)" :class="famIndex == '2'?'famTabActive':''">CV</div>
                    <div class="famTab" @click="famClick(3)" :class="famIndex == '3'?'famTabActive':''">人气</div>
                </div>
            </div>
            <div class="content">
                <div class="contentLiOut">
                    <div class="contentLi" @click="goRoom(item.roomId,item.uid)" v-for="(item,index) in list">
                        <div class="num">{{index+1}}</div>
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
                    <div class="tips">
                        本活动最终解释权归克拉克拉（KilaKila）所有
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
    let shareTitle = '明日之星';
    let shareDesc = '支持你的明日之星';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/daystar-wxshare-ymz.jpg';
    export default {
        data() {
            return {
                list: [],
                showWx: false,
                huancun: true,
                tabIndex:1,
                famIndex:1,
            }
        },
        created() {
            //          根据时间判断tab
            let time1 = 1537891200; //9月26日0点
            let time2 = 1537977600; //9月27日0点
            let time3 = 1538064000; //9月28日0点
            let time4 = 1538150400; //9月29日0点
            let nowTime = Date.parse(new Date())/1000;
            if(nowTime<time2){
                this.tabIndex = 1;
            }else if(nowTime>time2 && nowTime<=time3){
                this.tabIndex = 2;
            }else if(nowTime>time3 && nowTime<=time4){
                this.tabIndex = 3;
            }else if(nowTime>time4){
                this.tabIndex = 4;
            }
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
                this.getDataList();
            },
            tabClick(index){
                if(this.huancun){
                    return
                }
                this.tabIndex = index;
                this.famIndex = 1;
                this.getDataList();
            },
            goRule(){
                window.location.href = '/Viewsh5rule/daystarrule?showshare=1';
            },
            getDataList() {
                this.huancun = true;
                this.list = [];
                this.$axios.HttpGet('/UnionActive/risingStarList', {
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
                    this.$axios.HttpGet('/UnionActive/risingStarVote', {
                        voteUid:uid,
                        group:this.famIndex,
                    })
                        .then((res) => {
                            console.log(res.data)
                            if(res.data.code == 200) {
                                if(res.data.data.code == 200){
                                    Toast({
                                        message: res.data.data.msg,
                                        position: 'center',
                                        duration: 1500
                                    })
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
                    this.goDeepLink("uxinlive://webpage?url=https%3A%2F%2Flive.hongdoulive.com%2FUnionActive%2FweAreRedIndex%3Fshowshare%3D1");
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
        background: #fddeec;
        position: relative;
        padding-bottom: 30px;
        img {
            width: 100%;
            height: auto;
        }
        .topImage {
            width: 100%;
            height: 380px;
            position: relative;
            .rule{
                position: absolute;
                width: 70px;
                height: 70px;
                right: 28px;
                bottom: 82px;
            }
            .timeTab{
                position: absolute;
                left: 50%;
                transform:translateX(-50%);
                bottom: 46px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                box-sizing: border-box;
                font-weight: 400;
                .timeTabLi{
                    width: 80px;
                    height: 36px;
                    background: url("https://img.hongrenshuo.com.cn/h5/daystar-tabnormal-ymz.png") no-repeat center;
                    background-size: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    color: #fff;
                    text-align: center;
                    font-size: 12px;
                    margin-left: 7px;
                    .p2{
                        padding-top: 4px;
                        font-size: 13px;
                    }
                    &:nth-child(1){
                        margin-left: 0;
                    }
                }
                .timeTabLiActive{
                    background: url("https://img.hongrenshuo.com.cn/h5/daystar-tabActive-ymz.png") no-repeat center;
                    background-size: 100%;
                }
            }
            .famTabUl{
                position: absolute;
                left: 50%;
                transform:translateX(-50%);
                bottom:5px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .famTab{
                    width: 80px;
                    height: 33px;
                    background: url("https://img.hongrenshuo.com.cn/h5/daystar-zunormoal-ymz.png") no-repeat center;
                    background-size: 100%;
                    color: #737373;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding-top: 10px;
                    box-sizing: border-box;
                    font-size: 13px;
                    font-weight: 400;
                    margin-left: 10px;
                    &:nth-child(1){
                        margin-left: 0;
                    }
                }
                .famTabActive{
                    background: url("https://img.hongrenshuo.com.cn/h5/daystar-zuActive-ymz.png") no-repeat center;
                    background-size: 100%;
                    color: #ff8fb4;
                }
            }
        }
        .content {
            padding: 0 10px;
            box-sizing: border-box;
            .contentLiOut{
                box-sizing: border-box;
                border: 2px dotted #ffffff;
                padding: 4px 10px 0;
                .tips{
                    text-align: center;
                    font-size: 12px;
                    color: #ff8fb4;
                    line-height: 24px;
                }
                .contentLi {
                    width: 100%;
                    height: 74px;
                    background: url("https://img.hongrenshuo.com.cn/h5/daystar-contentLi-ymz.png") no-repeat center;
                    background-size: 100%;
                    display: flex;
                    align-items: center;
                    margin-top: 4px;
                    .num {
                        width: 40px;
                        font-size: 25px;
                        font-weight: 400;
                        text-align: center;
                        color: #fff;
                    }
                    .headPic {
                        .head {
                            width: 50px;
                            height: 50px;
                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                    }
                    .goPiao {
                        width: 83px;
                        height: 27px;
                        background: url("https://img.hongrenshuo.com.cn/h5/daystar-gopiao-ymz.png") no-repeat center;
                        background-size: 100% 100%;
                        margin-right: 10px;
                    }
                    .desc {
                        box-sizing: border-box;
                        width: 0;
                        flex: 1;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        padding-left: 10px;
                        .descIn {
                            width: 100%;
                            color: #fff;
                            .nickName {
                                font-size: 13px;
                                width: 100%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .piaoNum {
                                font-size: 12px;
                                padding-top: 10px;
                                width: 100%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
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

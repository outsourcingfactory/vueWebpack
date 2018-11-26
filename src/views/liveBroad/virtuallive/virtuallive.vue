<template>
    <div id="app">
        <div v-show="!showWx" class="appin">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/virtuallive-image_01.png`"></Onepic>
                <div class="rule" @click="goUrl(1)"></div>
                <div class="videojump">
                    <div @click="goVideo('1202912467479429145')"></div>
                    <div @click="goVideo('1202912248436097070')"></div>
                </div>
                <div class="gopush" @click="goDeepLink(' uxinlive://piamateriallist?topic_id=1202970569797009509')"></div>
            </div>
            <div class="switch-content">
                <div class="switch-btn-content">
                    <div class="switch-item" :class="period == 1?'active-titleLi':''" @click="switchtab(1)">
                        <div class="time">
                            11.16-11.19
                        </div>
                        <div class="tabname">寻恋之旅</div>
                    </div>
                    <div class="switch-item" :class="period == 2?'active-titleLi':''" @click="switchtab(2)">
                        <div class="time" >
                            11.20-11.22
                        </div>
                        <div class="tabname">巅峰人气</div>
                    </div>
                    <div class="switch-item" :class="period == 3?'active-titleLi':''" @click="switchtab(3)">
                        <div class="time">
                            11.23
                        </div>
                        <div class="tabname">决战之夜</div>
                    </div>
                </div>
                <div class="type-content">
                    <div class="type-item" @click="checkTime(1)">
                        <img src="https://img.hongrenshuo.com.cn/h5/virtuallive-left-btn.png" v-show="type == 2"/>
                        <img src="https://img.hongrenshuo.com.cn/h5/virtuallive-left-btn-checked.png" v-show="type == 1"/>
                    </div>
                    <div class="type-item" @click="checkTime(2)">
                        <img src="https://img.hongrenshuo.com.cn/h5/virtuallive-right-btn.png" v-show="type == 1"/>
                        <img src="https://img.hongrenshuo.com.cn/h5/virtuallive-right-btn-checked.png" v-show="type == 2"/>
                    </div>
                </div>
            </div>
            <div class="list-content-wraper">
                <div class="heng">
                    <img src="https://img.hongrenshuo.com.cn/h5/virtuallive-heng.png"/>
                </div>
                <div class="list-content-chu" :class="type == 2?'redbg':''" v-show="period==1">
                    <div class="group-content">
                        <div class="group-content-item" :class="group == 1?'groupitem':''" @click="checkhot(1)">最 热</div>
                        <div class="group-content-item" :class="group == 2?'groupitem':''" @click="checkhot(2)">最 新</div>
                    </div>
                    <div class="list-content">
                        <div class="list-content-item" v-for="(item,index) in dataList">
                            <div class="title-content">
                                <div class="title">

                                    {{item.videoDetailResp.videoResp.introduce}}
                                </div>
                                <div class="jing">#</div>
                            </div>

                            <div class="videocover" @click="goVideo(item.videoDetailResp.videoResp.idStr)">
                                <img :src="`${item.videoDetailResp.videoResp.coverPic}&x-oss-process=image/resize,m_mfit,h_420,w_342,limit_0/crop,w_342,h_420,g_center`"/>
                                <div class="renqi">{{item.likeCount}}人气值</div>
                            </div>
                        </div>
                    </div>
                    <div class="showMore" v-if="showSeeMore" @click="seeMoreClick">
                        加载更多
                        <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt="" class="seeMoreIcon" v-if="showSeeLoad">
                    </div>
                </div>
                <div class="list-content-fu" :class="type == 2?'redbg':''" v-show="period==2">
                    <div class="list-content">
                        <div class="contentLi"  v-for="(item,index) in rankList">
                            <div class="num">{{index + 1}}</div>
                            <div class="header" @click="goRoom('',item.uid)">
                                <img :src="item.headPic" class="headPic" />
                            </div>
                            <div class="nickname">
                                <div class="nickname-top">{{item.nickname}}</div>
                                <div class="nickname-bottom">积分：{{item.voteNum}}</div>
                            </div>
                            <div class="vote-btn" @click="goPiao(item.uid)">
                                <img src="https://img.hongrenshuo.com.cn/h5/virtuallive-vote.png"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="list-content-fu" :class="type == 2?'redbg':''" v-show="period==3">
                    <div class="list-content">
                        <div class="contentLi"  v-for="(item,index) in lastList">
                            <div class="num">{{index + 1}}</div>
                            <div class="header" @click="goRoom('',item.uid)">
                                <img :src="item.headPic" class="headPic" />
                            </div>
                            <div class="nickname">
                                <div class="nickname-top">{{item.nickname}}</div>
                                <div class="nickname-bottom">积分：{{item.score}}</div>
                            </div>
                            <div class="vote-btn" @click="goRoom('',item.uid)">
                                <img src="https://img.hongrenshuo.com.cn/h5/virtuallive-support.png"/>
                            </div>
                            <div class="guan" v-if="index<3">
                                <img :src="`https://img.hongrenshuo.com.cn/h5/virtuallive-guan${index+1}.png`">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="huancun" class="loading-container" :class="type == 2?'redbg':''">
                    <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                         class="huancunGif">
                </div>
                <div  class="loading-container" v-show="!huancun && dataList.length == 0 && period == 1" :class="type == 2?'redbg':''">
                    <div>
                        <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                             class="emptyPng">
                        <div class="emptyTips">
                            精彩赛事尚未开始
                        </div>
                    </div>
                </div>
                <div  class="loading-container" v-show="!huancun && rankList.length == 0 && period == 2" :class="type == 2?'redbg':''">
                    <div>
                        <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                             class="emptyPng">
                        <div class="emptyTips">
                            精彩赛事尚未开始
                        </div>
                    </div>
                </div>
                <div  class="loading-container" v-show="!huancun && lastList.length == 0 && period == 3" :class="type == 2?'redbg':''">
                    <div>
                        <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                             class="emptyPng">
                        <div class="emptyTips">
                            精彩赛事尚未开始
                        </div>
                    </div>
                </div>
            </div>
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/virtuallive-image_03.png`"></Onepic>
            </div>
            <div class="topimageOut" v-show="judeappnum == 2">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/virtuallive-image_04.png`"></Onepic>
                <div class="download" @click="goBottom()"></div>
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
    let shareTitle = '克拉克拉虚拟恋人';
    let shareDesc = '国内首款虚拟直播 下个次元世界由你开启';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/virtuallive-share.jpg';
    let weburl = decodeURIComponent(location.href);
    export default {
        data() {
            return {
                period: 1,
                type: 1,
                dataList: [],
                rankList:[],
                lastList:[],
                showSeeMore:false,
                showSeeLoad:false,
                huancun: true,
                showWx: false,
                group:1,
                page:1,
                judeappnum:1
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            this.judeapp();
        },
        mounted() {
            this.getNowType();
        },
        methods: {
            judeapp:function(){
                if (na.match(/hongdoulive/i)) {
                    this.judeappnum = 1;
                }else{
                    this.judeappnum = 2;
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
                        data.stage = 'virtuallive'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
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
                    window.location.href = '/Rule/virtuallive-rule.html';
                }
            },
            getRoomList: function () {

                this.$axios.HttpGet('/Active/virtualLoverList', {
                    period: this.period,
                    type:this.type,
                    group: this.group,
                    page:this.page
                })
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.code === 200) {
                            if(this.period == 1){
                                this.dataList = this.dataList.concat(res.data.data);
                                this.showSeeLoad = false;
                                if(res.data.data.length>=10){
                                    this.showSeeMore = true;
                                }else{
                                    this.showSeeMore = false;
                                }
                            }else if(this.period == 2){
                                this.rankList = res.data.data;
                            }else{
                                this.lastList = this.lastList.concat(res.data.data);
                            }

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
            goVideo:function (videoid) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://smallvideo?video_id=' + videoid;
                } else {
                    window.location.href = 'https://v.hongdoulive.com/v/video?videoId='+videoid;
                }
            },
            seeMoreClick:function () {
                this.showSeeLoad = true;
                this.page++;
                this.getRoomList();
            },
            switchtab: function (index) {
                if(this.huancun){
                    return
                }
                console.log(index)
                if (index == this.period) {
                    return
                } else {
                    this.period = index;
                    this.type = 1;
                    this.group = 1;
                    this.page = 1;
                    this.huancun = true;
                    if(this.period == 1){
                        this.dataList = [];
                    }else if(this.period == 2){
                        this.rankList = [];
                    }else{
                        this.lastList = [];
                    }

                    this.getRoomList();

                }
            },
            checkTime: function (index) {
                if(this.huancun){
                    return
                }
                if (index == this.type) {
                    return
                } else {
                    this.type = index;
                    this.group = 1;
                    if(this.period == 1){
                        this.dataList = [];
                    }else if(this.period == 2){
                        this.rankList = [];
                    }else{
                        this.lastList = [];
                    }
                    this.huancun = true;
                    this.showSeeMore = false;
                    this.getRoomList();
                }
            },
            checkhot: function (index) {
                if(this.huancun){
                    return
                }
                if (index == this.group) {
                    return
                } else {
                    this.group = index;
                    this.dataList = [];
                    this.page = 1;
                    this.huancun = true;
                    this.getRoomList();
                }
            },
            getNowType: function () {
                let nowTime = Date.parse(new Date()) / 1000;
                let time1 = 1542643200; //11月20号0点
                let time2 = 1542902400; //11月23号0点
                if (nowTime < time1) {
                    this.period = 1;
                }else if (time1 <= nowTime && nowTime < time2) {
                    this.period = 2;
                }else{
                    this.period = 3;
                }
//                获取数据
                this.getRoomList();
            },
            goPiao(uid) {
                if (na.match(/hongdoulive/i)) {
                    this.$axios.HttpGet('/Active/virtualLoverVote', {
                        voteUid:uid,
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
                                    this.getRoomList();
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
                    this.goDeepLink("uxinlive://webpage?url="+weburl);
                }
            },
            goBottom: function () {
                this.goDeepLink("uxinlive://webpage?url="+weburl);
            },
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
                    width: 60px;
                    height: 60px;
                    position: absolute;
                    top: 165px;
                    right: 5px;
                }
                .download{
                    width:100%;
                    height:50px;
                    position: absolute;
                    bottom:42px;
                }
                .videojump{
                    width:100%;
                    height:280px;
                    left:0;
                    top:230px;
                    position: absolute;
                    display: flex;
                    div{
                        width:50%;
                        height:100%;
                    }
                }
                .gopush{
                    width:190px;
                    height:50px;
                    position: absolute;
                    bottom: 25px;
                    left:50%;
                    margin-left:-95px;
                }
            }
            .bottomimageOut{
                margin-top:-5px;
            }

            .switch-content{
                width:100%;
                height:183px;
                background: url("https://img.hongrenshuo.com.cn/h5/virtuallive-image_02.png") no-repeat;
                background-size: 100% 100%;
                padding-top:7px;
                .switch-btn-content{
                    width:100%;
                    display: flex;
                    justify-content: center;
                    .switch-item{
                        width:117px;
                        height:67px;
                        background: url("https://img.hongrenshuo.com.cn/h5/virtuallive-tabbtn.png") no-repeat;
                        background-size: 100% 100%;
                        position: relative;
                        .time{
                            width:100%;
                            font-size: 12px;
                            font-weight: 600;
                            text-align: center;
                            position: absolute;
                            left:0;
                            top:5.5px;
                        }
                        .tabname{
                            width:100%;
                            font-size: 18px;

                            text-align: center;
                            position: absolute;
                            left:0;
                            bottom:9px;
                        }
                    }
                    .active-titleLi{
                        background: url("https://img.hongrenshuo.com.cn/h5/virtuallive-tabbtn-checked.png") no-repeat;
                        background-size: 100% 100%;
                    }
                }
                .type-content{
                    padding:0 3px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    margin-top:32px;
                    position: relative;
                    .type-item{
                        width:171px;
                        height:75px;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                }
            }
            .list-content-wraper{
                width:100%;
                padding:0 3px;
                box-sizing: border-box;
                margin-top:-38px;
                .heng{
                    width:100%;
                    height:15px;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
                .list-content-chu{
                    width:100%;
                    background: #afecfd;
                    padding:20px 0 20px 0;
                    .group-content{
                        width:100%;
                        padding-left:23px;
                        box-sizing: border-box;
                        display: flex;
                        .group-content-item{
                            width:70px;
                            height:30px;
                            text-align: center;
                            font-size:14px;
                            font-weight: 600;
                            line-height: 30px;
                            border-radius: 30px;
                            background: url("https://img.hongrenshuo.com.cn/h5/virtuallive-btn-bg1.png") no-repeat;
                            background-size: 100% 100%;
                            margin-right:20px;
                        }
                        .groupitem{
                            background: url("https://img.hongrenshuo.com.cn/h5/virtuallive-btn-bg.png") no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                    .list-content{
                        width:100%;
                        padding:0 10px;
                        box-sizing: border-box;
                        margin-top:16px;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        .list-content-item{
                            width:171px;
                            margin-bottom: 18px;
                            .title-content{
                                wdith:100%;
                                position: relative;
                                .title{
                                    width:161px;
                                    height:25px;
                                    background: rgba(255,255,255,0.3);
                                    border:1px solid #fff;
                                    position: relative;
                                    line-height: 25px;
                                    font-size: 14px;
                                    line-height: 25px;
                                    color:#000;
                                    margin-left:8px;
                                    padding-left:30px;
                                    box-sizing: border-box;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;

                                }
                                .jing{
                                    width:30px;
                                    height:30px;
                                    border-radius: 50%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    font-size: 16px;
                                    background: #fff;
                                    position: absolute;
                                    left:0px;
                                    top:-3px;
                                    color:#000;
                                }
                            }

                            .videocover{
                                width:100%;
                                height:210px;
                                border:1px solid #fff;
                                border-radius: 3px;
                                background: rgba(255,255,255,0.3);
                                padding:2px 3px;
                                box-sizing: border-box;
                                margin-top:12px;
                                position: relative;
                                img{
                                    width:100%;
                                    height:100%;
                                }
                                .renqi{
                                    height:20px;
                                    background: rgba(0,0,0,0.5);
                                    font-size: 12px;
                                    padding:0 8px;
                                    position: absolute;
                                    left:7px;
                                    top:7px;
                                    color:#fff;
                                    border-radius: 3px;
                                    line-height: 20px;
                                }
                            }
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
                .list-content-fu{
                    width:100%;
                    background: #afecfd;
                    padding:20px 0 20px 0;
                    .list-content {
                        width: 100%;
                        padding: 0 18px;
                        box-sizing: border-box;

                        .contentLi{
                            width: 100%;
                            height: 75px;
                            display: flex;
                            align-items: center;
                            font-weight: 400;
                            padding: 0 10px;
                            box-sizing: border-box;
                            font-size: 13px;
                            border-radius: 3px;
                            border:1px solid #fff;
                            background: #fde8e8;
                            box-shadow: 0 3px 3px #9d868e;
                            margin-bottom: 15px;
                            position: relative;
                            &:nth-last-child(1){
                                border-bottom: none !important;
                            }
                            .num{
                                font-weight: 600;
                                font-size: 18px;
                                width:28px;
                                color:#fcc92e;
                            }
                            .headPic{
                                display: block;
                                width: 50px;
                                height: 50px;
                                margin-right:12px;
                            }
                            .nickname{
                                flex: 1;
                                color:#403e3e;
                                padding-right:10px;
                                box-sizing: border-box;
                                width:0;
                                .nickname-top{
                                    width:100%;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    font-size: 16px;
                                    font-weight: 600;
                                }
                                .nickname-bottom{
                                    margin-top:9px;
                                    font-size: 14px;
                                    font-weight: 500;
                                }
                            }
                            .vote-btn{
                                margin-right: -16px;
                                width:auto;
                                height:30px;
                                img{
                                    width:auto;
                                    height:30px;
                                }

                            }
                            .guan{
                                width:32px;
                                hegiht:auto;
                                position: absolute;
                                left:-10px;
                                top:-10px;
                                img{
                                    width:100%;
                                    hegiht:auto;
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
                    background: #afecfd;
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
                .redbg{
                    background: #fcc4d6;
                }
            }
        }

    }
</style>

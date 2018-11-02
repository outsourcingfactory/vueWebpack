<template>
    <div id="app">
        <div v-show="!showWx" class="appin" :class="userInfo.length == 0?'appout':''">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/sweetcall-image-page2.png`"></Onepic>
                <div class="jifen-btn" @click="modalshow(4)"></div>
                <div class="kjin-btn" @click="modalshow(5)"></div>
            </div>
            <div class="maincontent">
                <div class="rulecontent">
                    <img :src="showRule?'https://img.hongrenshuo.com.cn/h5/sweetcall-txt-open.png':'https://img.hongrenshuo.com.cn/h5/sweetcall-close.png'"/>
                    <div class="gotopage" v-show="showRule" @click="goUrl(1)"></div>
                    <div class="gotopage1" v-show="showRule" @click="goUrl(1)"></div>
                    <div class="lookmore" @click="switchrule()"></div>
                </div>
                <div class="list-title-wraper">
                    <div class="list-title">
                        <img src="https://img.hongrenshuo.com.cn/h5/sweetcall-title1.png"/>
                    </div>
                </div>
                <div class="rank-list">
                    <div class="ranklist-item" v-for="(item,index) in dataList">
                        <div class="rank-header" @click="goRoom('',item.uid)">
                            <img :src="item.headPic">
                        </div>
                        <div class="rank-info">
                            <div class="rank-name">{{item.bigName}}</div>
                            <div class="rank-score">{{item.smallName}}</div>
                            <div class="rank-contribution" v-show="item.member.length>0" @click="goUrl(3,item.uid)">
                                <div class="contribution-item" v-for="(item,index) in item.member">
                                    <img :src="item.headPic" />
                                </div>
                                <img class="arrow" src="https://img.hongrenshuo.com.cn/h5/awaken-andsoon.png">
                            </div>
                        </div>
                        <div class="rank-vote">
                            <div class="rank-vote-btn" @click="modalshow(1,item.bigName,item.uid)">

                            </div>
                        </div>
                        <div class="rank-number">
                            <span>人气值：{{item.ticketNum}}</span>
                            <img v-if="index<3" :src="`https://img.hongrenshuo.com.cn/h5/kstar-guan${index+1}-ymz.png`" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom-info-out" v-if="userInfo.length == 0">
               <span>打开克拉克拉为喜欢的角色投票</span>
                <div class="download" @click="goDeepLink('https://live.hongdoulive.com/sweetCall/sweetCallIndex?showshare=1')"></div>
            </div>
            <div class="bottom-info" v-else>
                <div class="userHeader">
                    <img :src="userInfo.headPic"/>
                </div>
                <div class="userInfo">
                    <div class="userName">
                        {{userInfo.nickname}}
                    </div>
                    <div class="userTicket">
                        <div class="userTicketNum">我的人气票：{{userInfo.remainTicket}}</div>
                        <div class="userJifenNum">我的积分：{{userInfo.integration}}</div>
                    </div>
                    <div class="userBtn">
                        <div @click="modalshow(4)"></div>
                        <div @click="modalshow(5)"></div>
                        <div @click="goUrl(1)"></div>
                    </div>
                </div>
            </div>

            <div class="ball-modal renqi-modal" v-show="modalindex == 1">
                <div class="alert-content">
                    <div class="close" @click="modalshow(-1)"></div>
                    <div class="title">给<span>{{starName}}</span>投人气票</div>
                    <div class="operate-content">
                        <span>选择票数</span>
                        <div class="sub-ticket" @click="reduce(1)">-</div>
                        <input type="number" class="ticket-number" v-model="votenumber"/>
                        <div class="add-ticket" @click="add(1)">+</div>
                        <span class="addrenqi"  @click="modalshow(2)">补充人气票</span>
                    </div>
                    <div class="heng"></div>
                    <div class="myticket">
                        我的人气票：<span>{{userInfo.remainTicket}}</span>票
                    </div>
                    <div class="one-btn-content">
                        <div class="one-btn" @click="voteticket()"></div>
                    </div>
                </div>
            </div>
            <div class="ball-modal notenough-modal" v-show="modalindex == 2">
                <div class="alert-content">
                    <div class="close" @click="modalshow(-1)"></div>
                    <div class="title" v-if="userInfo.remainTicket == 0">人气票不足</div>
                    <div class="title" v-else>补充人气票</div>
                    <div class="heng"></div>
                    <div class="myticket">
                        通过【购买】或【免费积分兑换】获取人气票
                    </div>
                    <div class="myticket1">
                        购买人气票后将获得积分获取速度x2的永久加成
                    </div>
                    <div class="two-btn-content">
                        <div class="two-btn" @click="modalshow(5)"></div>
                        <div class="two-btn" @click="modalshow(4)"></div>
                    </div>
                </div>
            </div>
            <div class="ball-modal balance-modal" v-show="modalindex == 3">
                <div class="alert-content">
                    <div class="close" @click="modalshow(-1)"></div>
                    <div class="title">余额不足</div>

                    <div class="myticket">
                        当前余额不足，充值才能继续购买
                    </div>
                    <div class="myticket1">
                        是否去充值？
                    </div>
                    <div class="two-btn-content">
                        <div class="two-btn" @click="modalshow(-1)"></div>
                        <div class="two-btn" @click="goUrl(2)"></div>
                    </div>
                </div>
            </div>
            <div class="ball-modal exchange-modal" v-show="modalindex == 4">
                <div class="alert-content">
                    <div class="close" @click="modalshow(-1)"></div>
                    <div class="title">积分兑换人气票</div>
                    <div class="operate-content">
                        <span>选择兑换数量</span>
                        <div class="sub-ticket" @click="reduce(2)">-</div>
                        <input type="number" class="ticket-number" v-model="exchange"/>
                        <div class="add-ticket" @click="add(2)">+</div>
                    </div>
                    <div class="heng"></div>
                    <div class="myticket">
                        <div>
                            我的人气票：<span>{{userInfo.remainTicket}}</span>
                        </div>
                        <div>
                            我的积分：<span>{{userInfo.integration}}</span>
                        </div>
                    </div>
                    <div class="two-btn-content">
                        <div class="two-btn" @click="goUrl(1)"></div>
                        <div class="two-btn" @click="exchangeticket"></div>
                    </div>
                </div>
            </div>
            <div class="ball-modal buyticket-modal" v-show="modalindex == 5">
                <div class="alert-content">
                    <div class="close" @click="modalshow(-1)"></div>
                    <div class="title">购买人气票</div>
                    <div class="myticket1">
                        人气票购买比例：50红豆=1人气票
                    </div>
                    <input type="number" placeholder="输入购买票数" v-model="buynumber"/>
                    <div class="myticket">
                        我的红豆：<span>{{userInfo.hongdouNum}}</span>
                        <div class="buy-btn" @click="goUrl(2)">充值</div>
                    </div>
                    <div class="two-btn-content">
                        <div class="two-btn" @click="goUrl(1)"></div>
                        <div class="two-btn" @click="buyticket()"></div>
                    </div>
                </div>
            </div>
            <div class="ball-modal enough-ticket" v-show="modalindex == 6">
                <div class="alert-content">
                    <div class="close" @click="modalshow(-1)"></div>
                    <div class="title">人气票兑换已达735票上限</div>
                    <div class="myticket">继续赚积分<span>可提升克拉克拉用户等级</span></div>
                </div>
            </div>
            <div class="ball-modal download-modal" v-show="modalindex == 7">
                <div class="alert-content">
                    <div class="close" @click="modalshow(-1)"></div>
                    <div class="title">下载克拉克拉APP</div>
                    <div class="myticket">点击顶部广告，进入打榜</div>
                    <div class="one-btn-content">
                        <div class="one-btn" @click="goDeepLink('https://live.hongdoulive.com/sweetCall/sweetCallIndex?showshare=1')"></div>
                    </div>
                </div>
            </div>
            <div class="goTop" @click.stop="scrollToTop()" v-show="false">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/sweetcall-gotop.png`"></Onepic>
            </div>
            <div class="golittle" @click="gotolittle()" v-show="showlittle">
                <img src="https://img.hongrenshuo.com.cn/h5/sweetcall-nowplay.gif"/>
            </div>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
        <audio id="mp3" ref="audio" hidden @ended="ended()"></audio>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'
    import wx from 'weixin-js-sdk';

    let shareTitle = '#克拉克拉甜秘致电#';
    let shareDesc = '来克拉克拉App，12大声控男神甜美秘电，等你接听。';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/sweetcall-share.png';
    export default {
        data() {
            return {
                dataList:[],
                userInfo:[],
                showRule: false,
                showWx: false,
                isActive: false,
                modalindex:-1,
                starName:'',
                votenumber:1,
                exchange:1,
                buynumber:'',
                voteuid:0,
                showlittle:false
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        mounted() {
            this.getRoomList();
            this.$nextTick(function () {
                window.addEventListener('scroll', this.handleScroll)
            });
        },
        methods: {
            judge:function(){
                if(window.__wxjs_environment === 'miniprogram'){
                    this.showlittle == false
                }
                wx.miniProgram.getEnv(function(res) {
                    if(res.miniprogram){
                        this.showlittle == false
                    }
                })
            },
            modalshow:function(index,name,uid){

                if(index == 1){
                    if (na.match(/hongdoulive/i)) {
                        this.modalindex = index;
                        this.starName = name;
                        this.voteuid = uid;
                    }else{
                        this.modalindex = 7;
                    }

                }else if(index == -1){
                    this.modalindex = index;
                    this.votenumber=1;
                    this.exchange=1;
                    this.buynumber='';
                }else if(index == 4){
                    this.updatelog(2)
                    if (na.match(/hongdoulive/i)) {
                        this.modalindex = index;
                    }else{
                        this.modalindex = 7;
                    }

                }else if(index == 5){
                    this.updatelog(1)
                    if (na.match(/hongdoulive/i)) {
                        this.modalindex = index;
                    }else{
                        this.modalindex = 7;
                    }
                }else{
                    this.modalindex = index;
                }
            },
            goUrl: function (type,uid) {
                if (type == 1) {
                    if (na.match(/hongdoulive/i)) {
                        window.location.href="/sweetCall/sweetCallPage1?showshare=1";
                    }else{
                        let webrul = encodeURI('https://live.hongdoulive.com/sweetCall/sweetCallIndex?showshare=1')
                        this.goDeepLink("uxinlive://webpage?url="+webrul);
                    }
                } else if (type == 2) {
                    let weburl = encodeURI("uxinlive://charge")
                    this.goDeepLink(weburl);
                }else if(type == 3){
                    window.location.href="/sweetCall/getAnchorFansList?uid="+uid;
                }
            },
            switchrule: function () {
                if (this.showRule) {
                    this.showRule = false;
                } else {
                    this.showRule = true;
                }
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
            getRoomList: function () {
                this.$axios.HttpGet('/SweetCall/sweetCallList')
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.code === 200) {
                            this.dataList = res.data.data.list;
                            this.userInfo = res.data.data.userInfo;
                            console.log(this.userInfo.length);
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
            reduce:function(type){
                if(type == 1){
                    if(this.votenumber<2){
                        return;
                    }
                    this.votenumber --;
                }else if(type == 2){
                    if(this.exchange<2){
                        return;
                    }
                    this.exchange --;
                }
            },
            add:function(type){
                if(type == 1){
                    this.votenumber ++;
                }else if(type == 2){
                    this.exchange ++;
                }
            },
            voteticket:function(uid){

                let reg = /^[1-9]\d*$/;
                if (!reg.test(this.votenumber)){
                    Toast({
                        message: '送出票数有误，请重新填写',
                        position: 'center',
                        duration: 1500
                    });
                    return;
                }
                this.getdata('/SweetCall/vote',{
                    voteNum:this.votenumber,
                    voteUid:this.voteuid
                });
            },
            exchangeticket:function(){
                let reg = /^[1-9]\d*$/;
                if (!reg.test(this.votenumber)){
                    Toast({
                        message: '兑换票数有误，请重新填写',
                        position: 'center',
                        duration: 1500
                    });
                    return;
                };
                this.getdata('/SweetCall/exchangeTicket',{
                    quantity:this.exchange
                });
            },
            buyticket:function(){
                let reg = /^[1-9]\d*$/;
                if (!reg.test(this.buynumber)){
                    Toast({
                        message: '购买票数有误，请重新填写',
                        position: 'center',
                        duration: 1500
                    });
                    return;
                };
                this.getdata('/SweetCall/buyTicket',{
                    quantity:this.buynumber
                });
            },
            getdata:function(url,data){
                this.$axios.HttpGet(url,data)
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.code === 200) {
                            Toast({
                                message: res.data.msg,
                                position: 'center',
                                duration: 1500
                            });
                            this.getRoomList();
                        } else if(res.data.code === 2026){
                            this.modalshow(3);
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
            updatelog:function(type){
                this.$axios.HttpGet('/SweetCall/clickLog',{
                    type:type
                })
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.code === 200) {

                        } else {

                        }
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
                        data.stage = 'sweetcall'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
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
                        _that.scrollTop -= 100
                        //然后修改这里实现动画滚动效果
                        document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop
                        timer = requestAnimationFrame(fn)
                    } else {
                        cancelAnimationFrame(timer);
                        _that.toTopShow = false
                    }
                })
            },
            gotolittle:function(){
                if (na.match(/hongdoulive/i)) {
                    var userName = 'gh_18cc349cd35c';
                    var path = '%2Fpages%2Fhome%2Fhome';
                    var programType = 0;
                    if (na.match(/(iphone|ipod|ios|ipad)/i)) {
                        if (ymzBaseFun.getVcString('vc') > 106) {
                            window.location.href = 'uxinlive://miniprogram?userName='+userName+'&path='+path+'&programType='+programType;
                        } else {
                            this.downString = '前往App Store升级最新版App吧~ '
                            this.rightString = '';
                            this.leftString = '知道啦';
                            this.callBackToUxin = function () {
                            };
                            this.changePage();
                        }
                    } else {
                        if (ymzBaseFun.getVcString('vc') > 122) {

                            window.location.href = 'uxinlive://miniprogram?userName='+userName+'&path='+path+'&programType='+programType;
                        } else {
                            this.downString = '升级最新版App来参与吧~'
                            this.rightString = '去升级';
                            this.leftString = '取消';
                            this.changePage();
                        }
                    }
                }else{
                    let webrul = encodeURI('https://live.hongdoulive.com/sweetCall/sweetCallIndex?showshare=1')
                    this.goDeepLink("uxinlive://webpage?url="+webrul);
                }
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
        width: 100%;
        img {
            width: 100%;
            height: auto;
        }
        .appin {
            width: 100%;
            background: #363636;
            padding-bottom: 110px;
            .topimageOut {
                width: 100%;
                height: 728px;
                position: relative;
                .jifen-btn{
                    width:165px;
                    height:40px;
                    bottom:92px;
                    left:15px;
                    position: absolute;
                }
                .kjin-btn{
                    width:165px;
                    height:40px;
                    bottom:92px;
                    right:15px;
                    position: absolute;
                }
            }
            .maincontent {
                width: 100%;
                background: #363636 url("https://img.hongrenshuo.com.cn/h5/sweetcall-page2-bg_03.png");
                background-repeat: repeat-y;
                background-size: 100% auto;
                .rulecontent {
                    width: 100%;
                    padding: 0 11px;
                    box-sizing: border-box;
                    position: relative;
                    img {
                        width: 100%;
                        height: auto;
                    }
                    .lookmore {
                        width: 70px;
                        height: 50px;
                        bottom: 0;
                        position: absolute;
                        left: 50%;
                        margin-left: -35px;
                    }
                    .gotopage {
                        width: 85px;
                        height: 20px;
                        position: absolute;
                        left: 209px;
                        bottom: 454px;
                    }
                    .gotopage1{
                        width: 85px;
                        height: 20px;
                        position: absolute;
                        left: 215px;
                        top: 258px;
                    }
                }
                .list-title-wraper {
                    padding: 0 8px;
                    box-sizing: border-box;
                    .list-title {
                        width: 100%;
                        height: 44px;
                        border-bottom: 1px dotted #949494;
                        margin-top: 30px;
                        img {
                            width: 162px;
                            height: auto;
                            margin: 0 auto;
                        }
                    }

                }
                .rank-list {
                    width: 100%;
                    padding: 0 8px;
                    margin-top: 13px;
                    box-sizing: border-box;
                    .ranklist-item {
                        width: 100%;
                        height: 103px;
                        background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-list-background.png") no-repeat;
                        background-size: 100% 100%;
                        display: flex;
                        align-items: center;
                        padding:0 14px;
                        box-sizing: border-box;
                        position: relative;
                        .rank-header{
                            width:75px;
                            height:75px;
                            border-radius: 50%;
                            img{
                                width:100%;
                                height:100%;
                                border-radius: 50%;
                            }
                        }
                        .rank-info{
                            flex: 1;
                            -webkit-flex: 1;
                            width:0;
                            padding:0 9px 0;
                            box-sizing: border-box;
                            .rank-name{
                                width:100%;
                                font-size: 16px;
                                color:#fff;
                                font-weight: 500;
                                font-family:"Microsoft YaHei","Hiragino Sans GB W3", "Heiti SC", Helvetica, sans-serif;
                            }
                            .rank-score{
                                font-size: 13px;
                                color:#ffb0b0;
                                margin-top:8px;
                                font-weight: 500;
                                font-family:"Microsoft YaHei","Hiragino Sans GB W3", "Heiti SC", Helvetica, sans-serif;
                            }
                            .rank-contribution{
                                display: flex;
                                display: -webkit-flex;

                                align-items: center;
                                -webkit-align-items: center;
                                margin-top:8px;
                                .contribution-item{
                                    width:22px;
                                    height:22px;
                                    border-radius: 50%;
                                    background: #fff;
                                    margin-right:8px;
                                    img{
                                        width:100%;
                                        height:100%;
                                        border-radius: 50%;
                                    }
                                }
                                .arrow{
                                    width:auto;
                                    height:18px;
                                }
                            }
                        }
                        .rank-vote{
                            width:120px;
                            .rank-vote-btn{
                                width:120px;
                                height:32px;
                                background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-voteforhe.png") no-repeat;
                                background-size: 100% 100%;
                                margin-top:35px;
                            }
                        }
                        .rank-number{
                            width:100%;
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;

                            position: absolute;
                            right:14px;
                            top:20px;
                            span{
                                font-size: 12px;
                                color:#fff;
                            }
                            img{
                                width:20px;
                                height:auto;
                                margin-left:10px;
                            }
                        }
                    }
                }
            }
            .bottom-info{
                width:100%;
                height:100px;
                background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-bottom-background.png") no-repeat;
                background-size: 100% 100%;
                padding:0 12px;
                box-sizing: border-box;
                display: flex;
                align-items:center;
                position: fixed;
                left:0;
                bottom:0;
                .userHeader{
                    width:68px;
                    height:68px;
                    border-radius: 50%;
                    img{
                        width:100%;
                        height:100%;
                        border-radius: 50%;
                    }
                }
                .userInfo{
                    flex: 1;
                    padding-left:13px;
                    box-sizing: border-box;
                    .userName{
                        width:100%;
                        font-size: 18px;
                        color:#000;
                        font-weight: 600;
                    }
                    .userTicket{
                        font-size: 14px;
                        display: flex;
                        font-weight: 500;
                        margin-top:8px;
                        .userTicketNum{
                            color:#6931b4;
                            margin-right:15px;
                        }
                        .userJifenNum{
                            color:#f07070;
                        }
                    }
                    .userBtn{
                        width:100%;
                        display: flex;
                        justify-content: space-around;
                        margin-top:6px;
                        div{
                            width:84px;
                            height:30px;
                            background-size: 100% 100%;
                            background-repeat: no-repeat;
                        }
                        div:nth-child(1){
                            margin-left:-6px;
                            background-image: url("https://img.hongrenshuo.com.cn/h5/sweetcall-bottom-btn2.png");
                        }
                        div:nth-child(2){
                            background-image: url("https://img.hongrenshuo.com.cn/h5/sweetcall-bottom-btn3.png");
                        }
                        div:nth-child(3){
                            background-image: url("https://img.hongrenshuo.com.cn/h5/sweetcall-bottom-btn1.png");
                        }
                    }
                }
            }
            .bottom-info-out{
                width:100%;
                height:50px;
                background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-bottom-background.png") no-repeat;
                background-size: 100% 100%;
                padding:0 12px;
                box-sizing: border-box;
                display: flex;
                align-items:center;
                justify-content: space-between;
                position: fixed;
                left:0;
                bottom:0;
                span{
                    font-size: 14px;
                    color:#000;
                    font-weight: 500;
                }
                .download{
                    width:82px;
                    height:33px;
                    background:url("https://img.hongrenshuo.com.cn/h5/sweetcall-download.png") no-repeat;
                    background-size: 100% 100%;
                }
            }
            .ball-modal{
                width:100%;
                height:100%;
                position: fixed;
                left:0;
                top:0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999;
                .alert-content{
                    width:345px;
                    background-image: url("https://img.hongrenshuo.com.cn/h5/sweetcall-modal-bg.png");
                    background-repeat: no-repeat;
                    background-size: 100% auto;
                    position: relative;
                    padding:0 15px;
                    box-sizing: border-box;
                    .title{
                        width: 100%;
                        font-size: 19px;
                        color:#000;
                        text-align: center;
                        font-weight: 500;
                        span{
                            color: #ff8383;
                            margin:0 10px;
                        }
                    }
                    .close{
                        width:50px;
                        height:50px;
                        position: absolute;
                        background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-modal-close.png") no-repeat;
                        background-size: 25px 25px;
                        background-position: center;
                        position: absolute;
                        top:0;
                        right:0;
                    }
                    .heng{
                        width:100%;
                        height:2px;
                        background: #fff;
                        margin-top:14px;
                    }
                    .one-btn-content{
                        display: flex;
                        justify-content: center;
                        margin-top:26px;
                        .one-btn{
                            width:156px;
                            height:39px;
                        }
                    }
                    .two-btn-content{
                        display: flex;
                        justify-content: space-around;
                        margin-top:26px;
                        .two-btn{
                            width:156px;
                            height:39px;
                        }
                    }
                }
            }
            .renqi-modal{
                .alert-content{
                    height:285px;
                    padding-top:50px;
                    .operate-content{
                        width:100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 15px;
                        color:#000;
                        margin-top:40px;
                        font-weight: 400;
                        .sub-ticket,.add-ticket{
                            width:25px;
                            height:25px;
                            border-radius: 5px 0 0 5px;
                            display: flex;
                            display: -webkit-flex;
                            align-items: center;
                            -webkit-align-items: center;
                            justify-content:center;
                            -webkit-justify-content: center;
                            border-top:1px solid #7d7d7d;
                            border-left:1px solid #7d7d7d;
                            border-bottom:1px solid #7d7d7d;
                            font-size: 14px;
                            background:#fff;
                            margin-left:7px;
                        }

                        .add-ticket{
                            border-left:none;
                            border-top:1px solid #7d7d7d;
                            border-right:1px solid #7d7d7d;
                            border-bottom:1px solid #7d7d7d;
                            border-radius: 0 5px 5px 0;
                            margin-left:0px;
                            margin-right:7px;
                        }
                        .ticket-number{
                            width:50px;
                            height:25px;
                            border:1px solid #7d7d7d;
                            color:#000;
                            font-size: 14px;
                            text-align: center;
                            padding: 0;
                            border-radius: 0;
                        }
                        .addrenqi{
                            color:#ff8383;
                            text-decoration: underline;
                        }
                    }
                    .myticket{
                        font-size: 15px;
                        color:#000;
                        margin-top:15px;
                        font-weight: 400;
                        text-align: center;
                        span{
                            color:#ff8383;
                            margin:0 3px;
                        }
                    }
                    .one-btn-content{
                        .one-btn{
                            background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-alert-btn1.png");
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            .notenough-modal{
                .alert-content{
                    height:263px;
                    padding-top:50px;
                    .heng{
                        margin-top:29px;
                    }
                    .myticket{
                        font-size: 15px;
                        color:#000;
                        margin-top:12px;
                        font-weight: 400;
                        text-align: center;
                        span{
                            color:#ff8383;
                            margin:0 3px;
                        }
                    }
                    .myticket1{
                        font-size: 14px;
                        color:#ff8383;
                        margin-top:8px;
                        font-weight: 400;
                        text-align: center;
                    }
                    .two-btn-content{
                        margin-top:35px;
                        .two-btn{
                            width:143px;
                            height:39px;
                        }
                        .two-btn:nth-child(1){
                            background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-alert-btn2.png");
                            background-size: 100% 100%;
                        }
                        .two-btn:nth-child(2){
                            background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-alert-btn3.png");
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            .balance-modal{
                .alert-content {
                    height: 263px;
                    padding-top: 50px;
                    .myticket{
                        font-size: 15px;
                        color:#000;
                        margin-top:27px;
                        font-weight: 400;
                        text-align: center;
                        span{
                            color:#ff8383;
                            margin:0 3px;
                        }
                    }
                    .myticket1{
                        font-size: 15px;
                        color:#000;
                        margin-top:8px;
                        font-weight: 400;
                        text-align: center;
                    }
                    .two-btn-content{
                        margin-top:35px;
                        .two-btn{
                            width:143px;
                            height:39px;
                        }
                        .two-btn:nth-child(1){
                            background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-alert-btn6.png");
                            background-size: 100% 100%;
                        }
                        .two-btn:nth-child(2){
                            background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-alert-btn7.png");
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            .exchange-modal{
                .alert-content{
                    height:295px;
                    padding-top:50px;
                    .operate-content{
                        width:100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 15px;
                        color:#000;
                        margin-top:40px;
                        font-weight: 400;
                        .sub-ticket,.add-ticket{
                            width:25px;
                            height:25px;
                            border-radius: 5px 0 0 5px;
                            display: flex;
                            display: -webkit-flex;
                            align-items: center;
                            -webkit-align-items: center;
                            justify-content:center;
                            -webkit-justify-content: center;
                            border-top:1px solid #7d7d7d;
                            border-left:1px solid #7d7d7d;
                            border-bottom:1px solid #7d7d7d;
                            font-size: 14px;
                            background:#fff;
                            margin-left:7px;
                        }

                        .add-ticket{
                            border-left:none;
                            border-top:1px solid #7d7d7d;
                            border-right:1px solid #7d7d7d;
                            border-bottom:1px solid #7d7d7d;
                            border-radius: 0 5px 5px 0;
                            margin-left:0px;
                            margin-right:7px;
                        }
                        .ticket-number{
                            width:50px;
                            height:25px;
                            border:1px solid #7d7d7d;
                            color:#000;
                            font-size: 14px;
                            text-align: center;
                            padding: 0;
                            border-radius: 0;
                        }
                        .addrenqi{
                            color:#ff8383;
                            text-decoration: underline;
                        }
                    }
                    .myticket{
                        font-size: 15px;
                        color:#000;
                        margin-top:15px;
                        font-weight: 400;
                        text-align: center;
                        display: flex;
                        justify-content: space-between;
                        padding:0 18px;
                        span{
                            color:#ff8383;
                            margin:0 3px;
                        }
                    }
                    .two-btn-content{
                        margin-top:35px;
                        .two-btn{
                            width:143px;
                            height:39px;
                        }
                        .two-btn:nth-child(1){
                            background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-alert-btn4.png");
                            background-size: 100% 100%;
                        }
                        .two-btn:nth-child(2){
                            background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-alert-btn5.png");
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            .buyticket-modal{
                .alert-content {
                    height: 300px;
                    padding-top: 50px;
                    .myticket1{
                        font-size: 15px;
                        color:#ff8383;
                        margin-top:25px;
                        text-align: center;
                    }
                    .myticket{
                        font-size: 15px;
                        color:#000;
                        margin-top:15px;
                        font-weight: 400;
                        padding-left: 40px;
                        box-sizing: border-box;
                        display: flex;
                        span{
                            color:#ff8383;
                            margin:0 3px;
                        }
                        .buy-btn{
                            color:#ff8383;
                            margin-left:15px;
                            text-decoration: underline;
                        }
                    }
                    input{
                        width:275px;
                        height:35px;
                        font-size: 14px;
                        padding: 0;
                        border:1px solid #7d7d7d;
                        border-radius: 35px;
                        padding-left:20px;
                        box-sizing: border-box;
                        margin:10px auto 0;
                        display: block;
                    }
                    .two-btn-content{
                        margin-top:35px;
                        .two-btn{
                            width:143px;
                            height:39px;
                        }
                        .two-btn:nth-child(1){
                            background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-alert-btn4.png");
                            background-size: 100% 100%;
                        }
                        .two-btn:nth-child(2){
                            background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-alert-btn5.png");
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            .enough-ticket{
                .alert-content {
                    height: 210px;
                    padding-top: 75px;
                    box-sizing: border-box;
                    .myticket{
                        font-size: 15px;
                        color:#000;
                        margin-top:12px;
                        font-weight: 400;
                        text-align: center;
                        span{
                            color:#ff8383;
                            margin:0 3px;
                        }
                    }
                }
            }
            .download-modal{
                .alert-content {
                    height: 210px;
                    padding-top: 55px;
                    box-sizing: border-box;
                    .myticket{
                        font-size: 18px;
                        color:#000;
                        margin-top:12px;
                        font-weight: 600;
                        text-align: center;
                        span{
                            color:#ff8383;
                            margin:0 3px;
                        }
                    }
                    .one-btn-content{
                        .one-btn{
                            background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-alert-btn8.png");
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            .goTop {
                width: 80px;
                height: 83px;
                position: fixed;
                bottom: 60px;
                right: 12px;
                z-index: 500;
            }
            .golittle{
                width:100px;
                height:100px;
                position: fixed;
                right:10px;
                top: 100px;
                img{
                    width:100%;
                    height:100%;
                }
            }
        }
        .appout{
            padding-bottom: 60px;
        }
    }
</style>

<template>
    <div id="app">
        <div class="topimage">
            <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/luckstar-topimage-ymz.png`"></Onepic>
            <div class="ruleIcon" @click="goRule()"></div>
        </div>
        <div class="content-body">
            <div class="content">
                <div class="tab" :style="{backgroundImage: 'url(' + tabBg + ')'}">
                    <div class="tabLeft" @click="tabSwitch(0)"></div>
                    <div class="tabRight" @click="tabSwitch(1)"></div>
                </div>
                <div class="content-left" v-show="showLeft">
                    <div v-show="!leftEmpty">
                        <div class="rankli" v-for="item in leftListData">
                            <div class="title">
                                {{item[0].name}}
                            </div>
                            <div class="oneRankOut">
                                <oneRank :oneRankData="item"></oneRank>
                            </div>
                        </div>
                    </div>
                    <div class="content-empty" v-show="leftEmpty">
                        <img src="https://img.hongrenshuo.com.cn/h5/luckstar-emptylist-ymz.png" alt="">
                    </div>
                </div>
                <div class="content-right" v-show="!showLeft">
                    <div class="time">
                        <div v-show="!nextTime">
                            <p style="display: inline-block">{{message}}</p>
                            <lastTime @time-end="message = '倒计时结束'" :endTime='endTime'
                                      style="display: inline-block"></lastTime>
                        </div>
                        <div v-show="nextTime">{{nextTimeMessage}}</div>
                    </div>
                    <div v-show="!rightEmpty">
                        <div class="rankpaiming">
                            <div class="paiming-title">
                                <div class="num">排名</div>
                                <div class="tou">头像</div>
                                <div class="nickname">昵称</div>
                                <div class="score">幸运值</div>
                            </div>
                            <div class="paiming-content">
                                <div class="paiming-li" v-for="(item,index) in rightListData" @click="goRoom(item.room_id,item.uid)">
                                    <div class="num-con">{{index+1}}</div>
                                    <div class="tou-con">
                                        <img :src="item.headPic" alt="">
                                    </div>
                                    <div class="nickname-con">{{item.nickname}}</div>
                                    <div class="score-con">{{item.diamond}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-empty" v-show="rightEmpty">
                        <img src="https://img.hongrenshuo.com.cn/h5/luckstar-emptylist-ymz.png" alt="">
                    </div>
                </div>
            </div>
            <div class="bottom">
                <p>活动结束后官方将于十个工作日内主动联系获奖用户，并发放奖励</p>
                <p>最终解释权归KilaKila所有</p>
                <p></p>
            </div>
        </div>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import oneRank from 'components/businessYmz/oneRank'
    import lastTime from 'components/baseymz/lastTime'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Toast from 'assets/js/toast'

    let shareTitle = '时段幸运星';
    let shareDesc = '谁会是下一个时段幸运星呢？真相只有一个，那就是...';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/luckstar-wxshare-ymz.jpg';
    export default {
        data() {
            return {
                tabBg: 'https://img.hongrenshuo.com.cn/h5/luckstar-tab2-ymz.png',
                message: '倒计时',
                endTime: '',
                showLeft:false,
                leftEmpty:false,
                rightEmpty:false,
                leftListData:[],
                rightListData:[],
                //-------5月24日08:00----5月24日16:00---5月24日24:00--5月25日08:00--5月25日16:00---5月25日24:00---5月26日08:00--5月26日16:00---5月26日24:00---5月27日08:00---5月27日16:00---5月27日24:00
                timeList:[1527120000000,1527148800000,1527177600000,1527206400000,1527235200000,1527264000000,1527292800000,1527321600000,1527350400000,1527379200000,1527408000000,1527436800000],
//                timeList:[1527033600000,1527062400000,1527091200000,1527120000000,1527148800000,1527177600000,1527206400000,1527235200000,1527264000000,1527292800000,1527321600000,1527350400000],
//                timeList:[1527062400000,1527066000000,1527091200000,1527120000000,1527148800000,1527177600000,1527206400000,1527235200000,1527264000000,1527292800000,1527321600000,1527350400000],
                nextTime:true,
                nextTimeMessage:'下一个时刻榜'
            }
        },
        created(){
            this._seeTime();
            this._getRightList();
            this._getLeftList();
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        methods: {
//            计算时间
            _seeTime(){
                let nowTime = Date.parse(new Date());
                if(nowTime<=this.timeList[0]){
                    this.nextTime = true;
                    this.nextTimeMessage = '下一个时刻榜  5月24日 08:00-16:00'
                    this.endTime = '100';
                }else if(nowTime>this.timeList[0] && nowTime<=this.timeList[1]){
                    this.nextTime = false;
                    this.endTime = '2018-05-24 16:00:00';
                }else if(nowTime>this.timeList[1] && nowTime<=this.timeList[2]){
                    this.nextTime = false;
                    this.endTime = '2018-05-25 00:00:00';
                }else if(nowTime>this.timeList[2] && nowTime<=this.timeList[3]){
                    this.nextTime = true;
                    this.nextTimeMessage = '下一个时刻榜  5月25日 08:00-16:00'
                    this.endTime = '100';
                }else if(nowTime>this.timeList[3] && nowTime<=this.timeList[4]){
                    this.nextTime = false;
                    this.endTime = '2018-05-25 16:00:00';
                }else if(nowTime>this.timeList[4] && nowTime<=this.timeList[5]){
                    this.nextTime = false;
                    this.endTime = '2018-05-26 00:00:00';
                }else if(nowTime>this.timeList[5] && nowTime<=this.timeList[6]){
                    this.nextTime = true;
                    this.nextTimeMessage = '下一个时刻榜  5月26日 08:00-16:00'
                    this.endTime = '100';
                }else if(nowTime>this.timeList[6] && nowTime<=this.timeList[7]){
                    this.nextTime = false;
                    this.endTime = '2018-05-26 16:00:00';
                }else if(nowTime>this.timeList[7] && nowTime<=this.timeList[8]){
                    this.nextTime = false;
                    this.endTime = '2018-05-27 00:00:00';
                }else if(nowTime>this.timeList[8] && nowTime<=this.timeList[9]){
                    this.nextTime = true;
                    this.nextTimeMessage = '下一个时刻榜  5月27日 08:00-16:00'
                    this.endTime = '100';
                }else if(nowTime>this.timeList[9] && nowTime<=this.timeList[10]){
                    this.nextTime = false;
                    this.endTime = '2018-05-27 16:00:00';
                }else if(nowTime>this.timeList[10] && nowTime<=this.timeList[11]){
                    this.nextTime = false;
                    this.endTime = '2018-05-28 00:00:00';
                }else if(nowTime>this.timeList[11]){
                    this.nextTime = false;
                    this.endTime = '100';
                }
//                if(nowTime<=this.timeList[0]){
//                    this.nextTime = true;
//                    this.nextTimeMessage = '下一个时刻榜  5月23日 08:00-16:00'
//                    this.endTime = '100';
//                }else if(nowTime>this.timeList[0] && nowTime<=this.timeList[1]){
//                    this.nextTime = false;
//                    this.endTime = '2018-05-23 16:00:00';
//                }else if(nowTime>this.timeList[1] && nowTime<=this.timeList[2]){
//                    this.nextTime = false;
//                    this.endTime = '2018-05-24 00:00:00';
//                }else if(nowTime>this.timeList[2] && nowTime<=this.timeList[3]){
//                    this.nextTime = true;
//                    this.nextTimeMessage = '下一个时刻榜  5月24日 08:00-16:00'
//                    this.endTime = '100';
//                }else if(nowTime>this.timeList[3] && nowTime<=this.timeList[4]){
//                    this.nextTime = false;
//                    this.endTime = '2018-05-24 16:00:00';
//                }else if(nowTime>this.timeList[4] && nowTime<=this.timeList[5]){
//                    this.nextTime = false;
//                    this.endTime = '2018-05-25 00:00:00';
//                }else if(nowTime>this.timeList[5] && nowTime<=this.timeList[6]){
//                    this.nextTime = true;
//                    this.nextTimeMessage = '下一个时刻榜  5月25日 08:00-16:00'
//                    this.endTime = '100';
//                }else if(nowTime>this.timeList[6] && nowTime<=this.timeList[7]){
//                    this.nextTime = false;
//                    this.endTime = '2018-05-25 16:00:00';
//                }else if(nowTime>this.timeList[7] && nowTime<=this.timeList[8]){
//                    this.nextTime = false;
//                    this.endTime = '2018-05-26 00:00:00';
//                }else if(nowTime>this.timeList[8] && nowTime<=this.timeList[9]){
//                    this.nextTime = true;
//                    this.nextTimeMessage = '下一个时刻榜  5月26日 08:00-16:00'
//                    this.endTime = '100';
//                }else if(nowTime>this.timeList[9] && nowTime<=this.timeList[10]){
//                    this.nextTime = false;
//                    this.endTime = '2018-05-26 16:00:00';
//                }else if(nowTime>this.timeList[10] && nowTime<=this.timeList[11]){
//                    this.nextTime = false;
//                    this.endTime = '2018-05-27 00:00:00';
//                }else if(nowTime>this.timeList[11]){
//                    this.nextTime = false;
//                    this.endTime = '100';
//                }
            },
            tabSwitch: function (index) {
                if (index == 0) {
                    this.tabBg = 'https://img.hongrenshuo.com.cn/h5/luckstar-tab1-ymz.png',
                    this.showLeft=true;
                    this._getLeftList();
                } else {
                    this.tabBg = 'https://img.hongrenshuo.com.cn/h5/luckstar-tab2-ymz.png'
                    this.showLeft=false;
                    this._getRightList();
                }
            },
            goRule: function () {
                window.location.href = '/Rule/luckstarrule.html';
            },
            _getLeftList:function () {
                this.$axios.HttpGet('/Stars/luckystar_top')
                    .then((res) => {
                        console.log(res);
                        if(res.data.code == 200){
                            if(res.data.data != ''){
                                this.leftListData = res.data.data;
                                this.leftEmpty = false;
                            }else{
                                this.leftEmpty = true;
                            }

                        }else{
                            Toast({
                                message: res.data.msg,
                                position: 'center',
                                duration: 1500
                            })
                        }
                    })
                    .catch((res) => {
//                        等待封装toast
                        Toast({
                            message: '网络错误',
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
            _getRightList:function () {
                this.$axios.HttpGet('/Stars/luckystar_list')
                    .then((res) => {
                        console.log(res);
                        if(res.data.code == 200 || res.data.code == 201){
                            if(res.data.data != ''){
                                this.rightListData = res.data.data;
                                this.rightEmpty = false;
                            }else{
                                this.rightEmpty = true;
                            }
                        }else{
                            Toast({
                                message: res.data.msg,
                                position: 'center',
                                duration: 1500
                            })
                        }
                    })
                    .catch((res) => {
//                        等待封装toast
                        Toast({
                            message: '网络错误',
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
            goRoom:function (roomid,uid) {
                if(roomid){
                    if (na.match(/hongdoulive/i)) {
                        window.location.href = 'uxinlive://live?roomid='+roomid+'&roomId='+roomid;
                    }else{
                        window.location.href = 'http://m.hongdoufm.com/room/'+roomid;
                    }
                }else{
                    if (na.match(/hongdoulive/i)) {
                        window.location.href = 'uxinlive://userinfo?uid=' + uid;
                    } else {
                        window.location.href = 'https://live.hongdoulive.com/index/roomuser/uid/' + uid;
                    }
                }

            }
        },
        components: {
            Onepic,
            oneRank,
            lastTime
        }
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        height: 100%;
        background: #f67589;
        .topimage {
            width: 100%;
            height: 235px;
            position: relative;
            .ruleIcon {
                position: absolute;
                top: 3px;
                right: 3px;
                width: 50px;
                height: 50px;
            }
        }
        .content-body {
            min-height: 432px;
            background: url("https://img.hongrenshuo.com.cn/h5/luckstar-lineTwo-ymz.png") no-repeat;
            background-size: 100% 90px;
            background-position: 0 150px;
            .content {
                width: 345px;
                margin: 0 auto;
                position: relative;
                .tab {
                    margin: 0 auto;
                    width: 345px;
                    height: 46px;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                    display: flex;
                    div {
                        flex: 1;
                    }
                }
                .content-left {
                    width: 100%;
                    background: #fff;
                    border-radius: 0 0 5px 5px;
                    /*box-shadow: 0px 1.5px 9px 0px rgba(60, 38, 142, 0.38);*/
                    margin-top: -1px;
                    .rankli {
                        width: 100%;
                        padding-top: 20px;
                        .title {
                            width: 198px;
                            height: 22px;
                            background: url("https://img.hongrenshuo.com.cn/h5/luckstar-titleWrapper-ymz.png") no-repeat center;
                            background-size: 100% 100%;
                            margin: 0 auto;
                            text-align: center;
                            line-height: 22px;
                            color: #2b2b27;
                            font-size: 12px;
                        }
                        .oneRankOut {
                            width: 100%;
                            margin-top: 7px;
                            padding-bottom: 15px;
                        }
                    }
                }
                .content-right {
                    width: 100%;
                    background: #fff;
                    border-radius: 0 0 5px 5px;
                    margin-top: -1px;
                    .time {
                        padding: 13px 0 0 11px;
                        color: #f66177;
                        font-size: 12px;
                    }
                    .rankpaiming {
                        width: 100%;
                        margin-top: 20px;
                        .paiming-title {
                            width: 334px;
                            margin: 0 auto;
                            display: flex;
                            height: 28px;
                            align-items: center;
                            background-color: rgb(245, 108, 125);
                            opacity: 0.902;
                            border-radius: 5px;
                            color: #fff;
                            font-size: 12px;
                            text-align: center;
                            .num {
                                width: 40px;
                            }
                            .tou {
                                width: 60px;
                            }
                            .nickname {
                                flex: 1;
                            }
                            .score {
                                width: 58px;
                            }
                        }
                        .paiming-content {
                            width: 100%;
                            .paiming-li {
                                width: 100%;
                                height: 64px;
                                display: flex;
                                align-items: center;
                                text-align: center;
                                color: #8260ff;
                                .num-con {
                                    width: 45.5px;
                                }
                                .tou-con {
                                    width: 60px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    img {
                                        width: 40px;
                                        height: 40px;
                                        border: 2px solid #ccbeff;
                                        border-radius: 21px;
                                    }
                                }
                                .nickname-con {
                                    flex: 1;
                                    color: #2b2727;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                                .score-con {
                                    width: 63.5px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }
                        }
                    }
                }
                .content-empty {
                    width: 100%;
                    background: #fff;
                    border-radius: 0 0 5px 5px;
                    margin-top: -1px;
                    display: flex;
                    height: 225px;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: 142.5px;
                        height: 105.5px;
                    }
                }
            }
            .bottom {
                width: 100%;
                text-align: center;
                line-height: 20px;
                font-size: 12px;
                color: #fbc7ce;
                padding: 60px 0 10px;
            }
        }
    }
</style>

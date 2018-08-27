<template>
    <div id="app">
        <div class="rule" @click="goRule()"></div>
        <div class="content">
            <div class="tab">
                <div class="tabLi" v-for="(item,index) in topList" :class="index+1 == group?'tabActive':''" @click="checkTab(index)">
                    <div class="tabLiIn">
                        <div class="zu">{{engList[index]}}组</div>
                        <div class="fen">{{item}}分</div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="line"></div>
                <div class="listLi" v-for="(item,index) in dataList" @click="goRoom(item.roomId,item.uid)">
                    <div class="headPic">
                        <img :src="item.headPic">
                    </div>
                    <div class="desc">
                        <div class="nickName">
                            {{item.nickname}}
                        </div>
                        <div class="starsNum">
                            钻石数：{{item.score}}
                        </div>
                        <div class="touNum">
                            投票数：{{item.voteNum}}
                        </div>
                    </div>
                    <div class="toupiao" @click.stop="toupiao(item.uid,index)">
                        <img src="https://img.hongrenshuo.com.cn/h5/tan-toupiao-ymz.png">
                    </div>
                </div>
            </div>
            <div v-show="huancun" class="loading-container">
                <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                     class="huancunGif">
            </div>
        </div>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Toast from 'assets/js/toast'
    let shareTitle = 'KilaKila探索101';
    let shareDesc = '琅声雅集、九天星光、袅音入夜探索KilaKila最强团队，只等你来！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/tan101-wxshare-ymz.jpg';
    export default {
        data() {
            return {
                group:1,
                engList:['A','B','C'],
                topList:[],
                dataList:[],
                canClick:true,
                huancun: true,
                typeIndex:0,
            }
        },
        created() {
            ymzBaseFun.wxShareVue(shareTitle,shareDesc,shareImageUrl);
            this.getDataList()
        },
        mounted() {

        },
        methods: {
            toupiao:function (uid,index) {
                if (!na.match(/hongdoulive/i)) {
                    ymzBaseFun.downloadApp();
                    return
                }
                this.$axios.HttpGet('/UnionActive/exploreVote',{playerId:uid})
                    .then((res) => {
                        console.log(res.data);
                        if(res.data.code === 200){
                            Toast({
                                message: res.data.data.msg,
                                position: 'center',
                                duration: 1500
                            })
                            if(res.data.data.type == 2){
                                this.dataList[index].voteNum = this.dataList[index].voteNum+1;
                                this.topList[this.typeIndex] = this.topList[this.typeIndex]+1;
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
            goRule:function () {
                window.location.href = 'https://live.hongdoulive.com/modular/index/active/101huodongjieshao?showshare=1&from=groupmessage&isappinstalled=0';
            },
            getDataList:function () {
                this.canClick = false;
                this.huancun = true;
                this.dataList = [];
                this.$axios.HttpGet('/UnionActive/exploreList',{group:this.group})
                    .then((res) => {
                        console.log(res.data.data);
                        if(res.data.code === 200){
                            this.huancun = false;
                            this.topList = res.data.data.total;
                            this.dataList = res.data.data.list;
                            this.canClick = true;
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
            checkTab:function (index) {
                if(!this.canClick){
                    return
                }
                if(index+1 == this.group){
                    return
                }else{
                    this.group = index+1;
                    this.typeIndex = index;
                }
                this.getDataList()
            }
        },
        components: {
            Onepic
        }
    }
</script>

<style lang="scss">
    #app{
        width: 100%;
        height: 1305px;
        background: url("https://img.hongrenshuo.com.cn/h5/tan-bgImage-ymz.png") no-repeat center;
        background-size: 100% 100%;
        position: relative;
        .rule{
            position: absolute;
            right:6px;
            top:350px;
            width: 78px;
            height: 78px;
        }
        .loading-container {
            width: 100%;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            .huancunGif {
                width: 40px;
                height: 40px;
            }
        }
        .content{
            position: absolute;
            width: 100%;
            left: 0;
            top:630px;
            height: 500px;
            padding: 0 23px;
            box-sizing: border-box;
            .tab{
                display: flex;
                width: 100%;
                align-items: center;
                .tabLi{
                    width: 119px;
                    height: 110px;
                    background: url("https://img.hongrenshuo.com.cn/h5/tan-tab1-ymz.png") no-repeat center;
                    background-size: 100% 100%;
                    display: flex;
                    /*align-items: center;*/
                    justify-content: center;
                    text-align: center;
                    .tabLiIn{
                        margin-top: 27px;
                        .zu{
                            font-size: 18px;
                            font-weight: 400;
                            width: 75px;
                            border-bottom: 1px solid #868a9e;
                            line-height: 24px;
                        }
                        .fen{
                            font-size: 12px;
                            line-height: 18px;
                        }
                    }
                }
                .tabActive{
                    background: url("https://img.hongrenshuo.com.cn/h5/tan-tab2-ymz.png") no-repeat center;
                    background-size: 100% 100%;
                }
            }
            .list{
                width: 100%;
                margin-top: 16px;
                .line{
                    width: 100%;
                    height: 2px;
                    background: #9087ab;
                    /*border-radius: 1px;*/
                }
                .listLi{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    height: 75px;
                    border-bottom: 2px solid #9087ab;
                    .headPic{
                        width: 56px;
                        height: 56px;
                        border-radius: 50%;
                        background: #3e1d6e;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img{
                            width: 48px;
                            height: 48px;
                            border-radius: 50%;
                            background: #770090;
                        }
                    }
                    .desc{
                        width: 0;
                        flex: 1;
                        color: #d7b41f;
                        margin-left: 9px;
                        .nickName{
                           font-size: 14px;
                            font-weight: 400;
                            line-height: 24px;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        .starsNum,.touNum{
                            font-size: 12px;
                            line-height: 18px;
                        }
                    }
                    .toupiao{
                        width: 82px;
                        height: 29px;
                        img{
                            width: 100%;
                            height: auto;
                        }
                    }
                }
            }
        }
    }
</style>

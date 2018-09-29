<template>
    <div id="app">
        <div class="rule" @click="goRule()"></div>
        <div class="content">
            <div class="list">
                <div class="listIn">
                    <div class="listLi" v-for="(item,index) in dataList" @click="goRoom(item.roomId,item.uid)">
                        <div class="num">
                            <div class="actnum actnum1" v-if="index<3"
                                 :style="{backgroundImage:'url(' + `'https://img.hongrenshuo.com.cn/h5/newman-num${index+1}-ymz.png'` + ')'}"
                            >{{index+1}}</div>
                            <div class="actnum" v-else>{{index+1}}</div>
                        </div>
                        <div class="headPic">
                            <img :src="item.headPic">
                        </div>
                        <div class="desc">
                            <div :class="`nickName nickName${index+1}`" v-if="index<3">
                                {{item.nickname}}
                            </div>
                            <div class="nickName" v-else>
                                {{item.nickname}}
                            </div>
                        </div>
                        <div class="score">
                            {{item.score}}积分
                        </div>
                    </div>
                    <div v-show="huancun" class="loading-container">
                        <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" class="huancunGif">
                    </div>
                    <div v-show="!huancun && dataList.length == 0" class="loading-container">
                        <div>
                            <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                                 class="emptyPng">
                            <div class="emptyTips">
                                暂无数据
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ymzBaseFun, na} from 'assets/js/common'
    import Toast from 'assets/js/toast'
    let shareTitle = '九天星势力-决赛';
    let shareDesc = '九天星势力决赛正在激励进行中，快来围观呀～！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/newman-wxshare-ymz.jpg';
    export default {
        data() {
            return {
                dataList:[],
                canClick:true,
                huancun: true,
            }
        },
        created() {
            ymzBaseFun.wxShareVue(shareTitle,shareDesc,shareImageUrl);
            this.getDataList()
        },
        mounted() {

        },
        methods: {
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
                window.location.href = 'https://live.hongdoulive.com/modular/index/active/jiutianxingshilihuodong?showshare=1';
            },
            getDataList:function () {
                this.canClick = false;
                this.huancun = true;
                this.dataList = [];
                this.$axios.HttpGet('/UnionActive/jiutianFinalList')
                    .then((res) => {
                        console.log(res.data.data);
                        if(res.data.code === 200){
                            this.huancun = false;
                            this.dataList = res.data.data;
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
                        Toast({
                            message: '网络错误',
                            position: 'center',
                            duration: 1500
                        })
                    })
            }
        },
        components: {

        }
    }
</script>

<style lang="scss">
    #app{
        width: 100%;
        height: 1800px;
        background: url("https://img.hongrenshuo.com.cn/h5/newmanlast-conBody-ymz.png") no-repeat center;
        background-size: 100% 100%;
        position: relative;
        img{
            width: 100%;
            height: auto;
        }
        .rule{
            position: absolute;
            right:13px;
            top:278px;
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
            .emptyPng {
                width: 131px;
                height: 112px;
            }
            .emptyTips {
                text-align: center;
                line-height: 40px;
            }
        }
        .content{
            position: absolute;
            width: 100%;
            left: 0;
            top: 740px;
            padding: 0 15px;
            box-sizing: border-box;
            .list{
                width: 100%;
                box-sizing: border-box;
                border: 6px solid #6ca3b1;
                border-radius: 10px;
                .listIn{
                    width: 100%;
                    height: auto;
                    border: 1px solid #fff;
                    border-radius: 4px;
                    box-sizing: border-box;
                    background: #eb6877;
                    padding: 0 10px;
                    .listLi{
                        width: 100%;
                        display: flex;
                        align-items: center;
                        height: 100px;
                        border-bottom: 1px dotted #f4aa9d;
                        &:nth-last-child(2){
                            border-bottom: none;
                        }
                        .num{
                            width: 30px;
                            color: #fff;
                            font-weight: 400;
                            text-align: center;
                            .actnum{
                                margin: 0 auto;
                                width: 20px;
                                height: 30px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-weight: 400;
                                padding-top: 10PX;
                                box-sizing: border-box;
                                background-size: 100% 100%;
                                color: #fff;
                            }
                            .actnum1{
                                font-weight: 500;
                                color: #000;
                            }
                        }
                        .headPic{
                            width: 58px;
                            height: 58px;
                            border-radius: 50%;
                            border: 1px solid #000;
                            img{
                                width: 100%;
                                height: auto;
                                border-radius: 50%;
                            }
                        }
                        .desc{
                            width: 0;
                            flex: 1;

                            margin-left: 9px;
                            .nickName{
                                font-size: 14px;
                                font-weight: 400;
                                line-height: 24px;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                                color: #fff;
                            }
                            .nickName1{
                                color: #feeb09;
                            }
                            .nickName2{
                                color: #ddc6c9;
                            }
                            .nickName3{
                                color: #f4af74;
                            }
                        }
                        .score{
                            color: #fff;
                            width: 80px;
                            text-align: center;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
</style>

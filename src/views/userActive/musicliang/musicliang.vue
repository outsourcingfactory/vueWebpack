<template>
    <div id="app">
        <div class="rule" @click="goRule()"></div>
        <div class="headPic" @click="goRoom(userInfo.roomId,userInfo.uid)">
            <img :src="userInfo.headPic" alt="">
        </div>
        <div class="content">
            <div class="list">
                <div class="listIn">
                    <div class="listLi" v-for="(item,index) in dataList" @click="goRoom(item.roomId,item.uid)">
                        <div class="num">
                            {{index+1}}
                        </div>
                        <div class="headPicLi">
                            <img :src="item.headPic">
                        </div>
                        <div class="nickname">
                            {{item.nickname}}
                        </div>
                        <div class="listLi-right">
                            {{item.score}} 积分
                        </div>
                    </div>
                    <div v-show="huancun" class="loading-container">
                        <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                             class="huancunGif">
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

    let shareTitle = '琅声余音缭绕-决赛现场';
    let shareDesc = '琅声余音缭绕现场正在进行，快来支持心仪的主播大大吧～';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/musicliang-wxshare-ymz.jpg';
    export default {
        data() {
            return {
                dataList: [],
                canClick: true,
                huancun: true,
                userInfo:{}
            }
        },
        created() {
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
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
            goRule: function () {
                window.location.href = 'https://live.hongdoulive.com/modular/index/active/langshenghuodongjieshao?showshare=1';
            },
            getDataList: function () {
                this.canClick = false;
                this.huancun = true;
                this.dataList = [];
                this.$axios.HttpGet('/UnionActive/langshengFinalList')
                    .then((res) => {
                        console.log(res.data.data);
                        if (res.data.code === 200) {
                            this.huancun = false;
                            this.dataList = res.data.data.list;
                            this.userInfo = res.data.data.userInfo;
                            this.canClick = true;
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
            }
        },
        components: {}
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        height: 1694px;
        background: url("https://img.hongrenshuo.com.cn/h5/musicliang-bgImage-ymz.png") no-repeat center;
        background-size: 100% 100%;
        position: relative;
        img {
            width: 100%;
            height: auto;
        }
        .rule {
            position: absolute;
            right: 8px;
            top: 211px;
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
        .headPic{
            position: absolute;
            width: 148px;
            height: 148px;
            border-radius: 50%;
            left: 114px;
            top: 738px;
            img{
                border-radius: 50%;
            }
        }
        .content {
            position: absolute;
            width: 100%;
            left: 0;
            top: 977PX;
            padding: 0 15px;
            box-sizing: border-box;
            .list {
                width: 100%;
                .listIn {
                    width: 100%;
                    height: auto;
                    border: 1px solid #fff;
                    border-radius: 8px;
                    box-sizing: border-box;
                    background: #ef8333;
                    padding: 10px;
                    color: #fff;
                    .listLi {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        height: 34px;
                        .num{
                            font-size: 13px;
                            font-weight: 400;
                        }
                        .headPicLi{
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            margin-left: 10px;
                            img{
                                border-radius: 50%;
                            }
                        }
                        .nickname{
                            margin-left: 10px;
                            flex: 1;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-size: 16px;
                        }
                        .listLi-right {
                            width: 100px;
                            text-align: right;
                            font-size: 13px;
                            /*font-weight: 400;*/
                        }
                    }
                }
            }
        }
    }
</style>

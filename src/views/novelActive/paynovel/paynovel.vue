<template>
    <div id="app">
        <div v-show="!showWx" class="appin" :class="userinfo.length == 0?'appout':''">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/paynovel-image_01.png`"></Onepic>
            </div>
            <div class="ranklist-content">
                <div class="ranklist">
                    <div class="titleicon"></div>
                    <div class="listItem" v-for="(item,index) in dataList">
                        <div class="number">{{item.sort}}</div>
                        <div class="headimg" @click="goRoom('',item.uid)">
                            <img :src="item.headPic">
                        </div>
                        <div class="info-content">
                            <div class="name">{{item.nickname}}</div>
                            <div class="intro">{{item.introduction}}</div>
                            <div class="hongdounumber">
                                <img src="https://img.hongrenshuo.com.cn/h5/paynovel-hongdou.png"/>
                                {{item.score}}
                            </div>
                        </div>
                    </div>
                    <div class="showMore" v-if="showSeeMore" @click="seeMoreClick">
                        加载更多
                        <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt="" class="seeMoreIcon" v-if="showSeeLoad">
                    </div>
                </div>
            </div>
            <div class="topimageOut1">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/paynovel-image_02.png`"></Onepic>
            </div>

            <div class="bottom-info" v-if="userinfo.length != 0">
                <div class="userhead">
                    <img :src="userinfo.headPic">
                </div>
                <div class="userInfo">
                    <div class="userName">{{userinfo.nickname}}</div>
                    <div class="userRank">我收到的解锁红豆：{{userinfo.score}}&nbsp;&nbsp;&nbsp;我的排名：{{userinfo.sort}}</div>
                </div>
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
    let shareTitle = '克拉克拉小说解锁天梯挑战';
    let shareDesc = '爬小说解锁天梯，赢海量官方红豆投喂！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/paynovel-share.jpg';
    export default {
        data() {
            return {
                showWx: false,
                pageNo:1,
                dataList:[],
                userinfo:[],
                showSeeMore:false,
                showSeeLoad:false,
            }
        },
        created() {
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            this.getData();
        },
        methods: {
            getData: function () {

                this.huancun = true;
                this.$axios.HttpGet('/novelActive/highLadderList', {
                    pageNo: this.pageNo
                })
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.code === 200) {
                            this.dataList = this.dataList.concat(res.data.data.list);

                            this.userinfo = res.data.data.self;
                            this.huancun = false;
                            this.showSeeLoad = false;
                            if(res.data.data.list.length>=10){
                                this.showSeeMore = true;
                            }else{
                                this.showSeeMore = false;
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
            seeMoreClick:function () {
                this.showSeeLoad = true;
                this.pageNo++;
                this.getData();
            },
        },
        components: {
            Onepic,
            Wxcontent
        },
    }
</script>

<style lang="scss" scoped>
    #app {
        width: 100%;
        img {
            width: 100%;
            height: auto;
        }
        .appin {
            width: 100%;
            padding-bottom: 76px;
            .topimageOut {
                width: 100%;
                height: 354px;
                position: relative;
            }
            .topimageOut1{
                width: 100%;
                height: 1328px;
                position: relative;
            }
            .ranklist-content{
                width:100%;
                padding:0 8px;
                box-sizing: border-box;
                background:#6cbaea;
                .ranklist{
                    width:100%;
                    border:2px solid #5fa6e2;
                    border-radius: 8px;
                    box-sizing: border-box;
                    background: #89c8ee;
                    padding:15px 8px 10px 8px;
                    box-sizing: border-box;
                    position: relative;
                    .titleicon{
                        width:150px;
                        height:38px;
                        background: url("https://img.hongrenshuo.com.cn/h5/paynovel-title.png") no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        top:-25px;
                        left:50%;
                        margin-left:-75px;
                    }
                    .listItem{
                        width:100%;
                        height:72px;
                        border-radius: 8px;
                        box-sizing: border-box;
                        border:2px solid #2a58c1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: #fff;
                        margin-bottom: 10px;
                        .number{
                            width:35px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 18px;
                            color:#f75965;
                            font-weight: 500;
                        }
                        .headimg{
                            width:55px;
                            height:55px;
                            border:1px solid #4cb1f0;
                            img{
                                width:100%;
                                height:100%;
                            }
                        }
                        .info-content{
                            width:0;
                            flex: 1;
                            padding:0 20px 0 10px;
                            box-sizing: border-box;
                            color:#2a58c1;
                            .name{
                                font-size: 16px;
                                line-height: 20px;
                                font-weight: 500;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;

                            }
                            .intro{
                                font-size: 14px;
                                font-weight: 500;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                line-height: 20px;
                                margin-top:4px;
                            }
                            .hongdounumber{
                                font-size: 12px;
                                font-weight: 500;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                color:#f75965;
                                display: flex;
                                align-items: center;
                                margin-top:2px;
                                img{
                                    width:13px;
                                    margin-right: 5px;
                                }
                            }
                        }
                    }
                    .showMore{
                        color: #fff;
                        margin: 10px auto 0;
                        text-align: center;
                        font-size: 14px;
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
            }
            .bottom-info{
                width:100%;
                height:76px;
                background:url("https://img.hongrenshuo.com.cn/h5/paynovel-bottombg.png") no-repeat;
                background-size: 100% 100%;
                position: fixed;
                left:0;
                bottom: 0;
                display: flex;
                align-items: center;
                padding:0 20px;
                box-sizing: border-box;
                .userhead{
                    width:55px;
                    height:55px;
                    border-radius: 50%;
                    img{
                        width:100%;
                        height:100%;
                        border-radius: 50%;
                    }
                }
                .userInfo{
                    padding-left:17px;
                    box-sizing: border-box;
                    font-weight: 500;
                    .userName{
                        width:100%;
                        font-size: 16px;
                        color:#2a58c1;

                    }
                    .userRank{
                        width:100%;
                        font-size: 13px;
                        color:#f75965;
                        margin-top:10px;
                    }
                }
            }
        }
        .appout{
            padding-bottom: 0;
        }
    }
</style>

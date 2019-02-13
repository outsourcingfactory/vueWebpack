<template>
    <div id="app">
        <div class="topImage">
            <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/thenameoflove-image_01.png`"></Onepic>
        </div>
        <div class="contentUl">
            <div class="contentList">
                <div class="contentLi-haixuan" @click="goRoom(item.roomId,item.uid)" v-for="(item,index) in bangList">
                    <div class="num">{{index + 1}}</div>
                    <div class="headPic">
                        <img :src="item.headPic">
                    </div>
                    <div class="descContent">
                        <div class="lineName">
                            {{item.nickname}}
                        </div>
                        <div class="lineDesc">
                            {{item.introduction || '暂无简介'}}
                        </div>
                        <div class="starNum">
                            积分：{{item.score}}
                        </div>
                    </div>
                </div>
                <div  class="loading-container" v-show="bangList.length == 0">
                    <div>
                        <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                             class="emptyPng">
                        <div class="emptyTips">
                            精彩赛事尚未开始
                        </div>
                    </div>
                </div>
            </div>
            <div class="tips">
                本活动最终解释权归KilaKila所有
            </div>

        </div>

    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Toast from 'assets/js/toast'
    let shareTitle = '以爱之名 缘定三生';
    let shareDesc = '在这个甜蜜的日子，爱你想让你知道～';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/thenameoflove-share.png';
    export default {
        data() {
            return {
                bangList:[],
            }
        },
        created() {
            this.getDataList()
            ymzBaseFun.wxShareVue(shareTitle,shareDesc,shareImageUrl);
        },
        methods: {
            getDataList:function () {
                this.$axios.HttpGet('/stars/february14List')
                    .then((res) => {
                        console.log(res.data.data);
                        if(res.data.code === 200){
                            this.bangList = res.data.data;
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
                }else {
                    if (na.match(/hongdoulive/i)) {
                        window.location.href = 'uxinlive://userinfo?uid='+uid;
                    } else {
                        window.location.href = 'https://live.hongdoulive.com/index/roomuser/uid/'+uid;
                    }
                }
            },
            gorule:function () {
                window.location.href = 'https://live.hongdoulive.com/modular/index/active/shouhuguize?showshare=1';
            }
        },
        components: {
            Onepic
        }
    }
</script>

<style lang="scss">
    #app{
        background: rgb(244,177,178);

        img{
            width: 100%;
            height: auto;
        }
        .topImage{
            width: 100%;
            height: 950px;
            position: relative;
            .ruleImage{
                width: 78px;
                height: 79px;
                position: absolute;
                right: 10px;
                bottom:214px;
            }
        }

        .contentUl{
            width: 100%;
            background: #facf46;
            padding: 0px 10px 25px 10px;
            box-sizing: border-box;
            position: relative;
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
                    font-size: 14px;
                }
            }
            .contentList{
                padding:0 10px;
                box-sizing: border-box;
                padding-bottom: 20px;
                background: #facf46;
                border: 1px solid #fff;
                border-top: none;
                border-radius: 0 0 10px 10px;
                .contentLi-haixuan {
                    width: 100%;
                    height: 77px;
                    background: #fd97ab;
                    border: 1px solid #fff;
                    border-radius: 5px;
                    margin-top: 5px;
                    display: flex;
                    align-items: center;
                    color: #fff;
                    font-weight: 500;
                    font-size: 15px;
                    position: relative;
                    .victory{
                        width: 45px;
                        height: 42px;
                        position: absolute;
                        right: 0px;
                        top:0px;
                    }
                    &:nth-child(1) {
                        margin-top: 0;
                    }
                    .num {
                        width:35px;
                        text-align: center;
                    }
                    .headPic {
                        width: 60px;
                        height: 60px;
                        img {
                            width: 100%;
                            height: auto;
                        }
                    }
                    .descContent {
                        width: 0;
                        padding: 0 10px;
                        box-sizing: border-box;
                        flex: 1;
                        height: 100%;
                        padding-top: 5px;
                        .lineName {
                            line-height: 25px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .lineDesc {
                            font-size: 14px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            line-height: 22px;
                            font-weight: 400;
                        }
                        .starNum {
                            color: #fff95f;
                            font-size: 13px;
                            line-height: 16px;
                            font-weight: 300;
                        }
                    }
                }
            }

            .tips{
                line-height: 28px;
                text-align: center;
                color: #ff8383;
                font-size: 16px;
                margin-top:25px;
            }
            .bottom{
                position: fixed;
                width: 100%;
                height: 60px;
                text-align: center;
                line-height: 60px;
                color: #fff;
                font-size: 15px;
                left: 0;
                bottom:0;
                background: #ec7372;
            }
            .goTop{
                position: fixed;
                width: 80px;
                height: 72px;
                right: 10px;
                bottom:70px;
            }
        }
    }
</style>

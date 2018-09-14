<template>
    <div id="app">
        <div class="tab"
             :style="{backgroundImage:'url(' + `'https://img.hongrenshuo.com.cn/h5/queenchoo-tab${tabIndex}-ymz.png'` + ')'}"
             :class="`tab${tabIndex}`">
            <div class="tab1" @click="clickTab(1)"></div>
            <div class="tab2" @click="clickTab(2)"></div>
            <div class="tab3" @click="clickTab(3)"></div>
        </div>
        <div class="rule" @click="goRule()"></div>
        <div class="content">
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
            <div class="contentLi" v-for="(item,index) in dataList" @click="goRoom(item.roomId,item.uid)">
                <div class="num">{{index+1}}</div>
                <div class="headPic">
                    <img v-lazy="item.headPic">
                </div>
                <div class="nickName">{{item.nickname}}</div>
                <div class="acore">
                    {{item.score}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Toast from 'assets/js/toast'
    import {ymzBaseFun, na} from 'assets/js/common'
    let shareTitle = '袅音周年之女王选妃记';
    let shareDesc = '尊敬的袅音女王大人，您的妃子已经准备完毕，就等你来挑了！！！！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/queenchoo-wxshare-ymz.png';
    export default {
        data() {
            return {
                tabIndex: 1,
                huancun:true,
                dataList:[],
            }
        },
        created() {
            this.getDataList();
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        methods: {
            clickTab(index) {
                this.huancun = true;
                this.dataList = [];
                this.tabIndex = index;
                this.getDataList();
            },
            getDataList() {
                this.$axios.HttpGet('/UnionActive/queenList', {
                    type:this.tabIndex
                })
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.code === 200) {
                            this.dataList = res.data.data;
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
            goRule:function () {
                window.location.href = 'https://live.hongdoulive.com/modular/index/active/niaoyinxuanfeijieshao?showshare=1'
            }
        },
        components: {

        },
    }
</script>

<style lang="scss" scoped>
    #app {
        width: 100%;
        height: 1443px;
        background: url("https://img.hongrenshuo.com.cn/h5/queenchoo-bgContent-ymz.png") no-repeat center;
        background-size: 100% 100%;
        position: relative;
        img {
            width: 100%;
            height: auto;
        }
        .rule{
            position: absolute;
            width: 100px;
            height: 100px;
            top:45px;
            right: 10px;
        }
        .tab {
            width: 330px;
            height: 105px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100% 100%;
            position: absolute;
            left: 0px;
            top: 580px;
            display: flex;
            .tab1, .tab2, .tab3 {
                flex: 1;
                height: 100%
            }
        }
        .tab1 {
            width: 331px;
            height: 105px;
        }
        .tab2 {
            width: 330px;
            height: 104px;
        }
        .tab3 {
            width: 347px;
            height: 106px;
        }
        .content {
            position: absolute;
            left: 0px;
            top: 685px;
            width: 360px;
            font-size: 14px;
            font-weight: 400;
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
            .contentLi {
                display: flex;
                align-items: center;
                margin-top: 10px;
                .num {
                    width: 58px;
                    text-align: center;
                    line-height: 35px;
                }
                .headPic {
                    width: 68px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: 35px;
                        height: 35px;
                        background: #fff;
                    }
                }
                .nickName {
                    flex: 1;
                    text-align: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .acore {
                    width: 78px;
                    text-align: center;
                    line-height: 35px;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>

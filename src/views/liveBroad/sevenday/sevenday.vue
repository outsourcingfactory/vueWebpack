<template>
    <div id="app">
        <div class="topImage">
            <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/sevenday-topImage3-ymz.png`"></Onepic>
            <div class="ruleImage" @click="gorule()">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/sevenday-ruleIcon-ymz.png`"></Onepic>
            </div>
        </div>
        <div class="contentUl">
            <div>
                <div class="contentLi" v-for="(item,index) in bangList" :class="item.highlight?'active-con':''" @click="goRoom(item.roomId,item.uid)">
                    <div class="num">{{index+1}}</div>
                    <div class="head">
                        <img :src="item.headPic">
                    </div>
                    <div class="desc">
                        <div class="nickName">{{item.nickname}}</div>
                        <div class="mandesc">{{item.introduction || '暂无简介'}}</div>
                        <div class="starsNum">{{item.score}}情缘值</div>
                    </div>
                    <div class="gift" v-show="item.highlight">
                        <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/sevenday-gift-ymz.png`"></Onepic>
                    </div>
                </div>
            </div>
            <div class="tips">
                本活动最终解释权归KilaKila所有
            </div>
            <div class="bottom" v-html="bangBottom" v-show="bangBottom"></div>
            <div class="goTop" @click.stop="scrollToTop()" v-show="isActive">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/sevenday-goTop-ymz.png`"></Onepic>
            </div>
        </div>

    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Toast from 'assets/js/toast'
    let shareTitle = '七夕情缘节';
    let shareDesc = '情定七夕 豪礼相送，小耳朵们快来和主播一起守护你们的七夕情缘吧~';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/sevenday-wxshare-ymz.jpg';
    export default {
        data() {
            return {
                isActive:false,
                bangList:[],
                bangBottom:''
            }
        },
        created() {
            this.getDataList()
            ymzBaseFun.wxShareVue(shareTitle,shareDesc,shareImageUrl);
        },
        mounted() {
            this.$nextTick(function () {
                //修改事件监听
                window.addEventListener('scroll', this.handleScroll)

            });
        },
        methods: {
            handleScroll: function () {
                this.scrollTop = this.scrollTop = window.pageYOffset || document.body.scrollTop;
                if(this.scrollTop > 400) {
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
                        _that.scrollTop -= 50
                        //然后修改这里实现动画滚动效果
                        document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop
                        timer = requestAnimationFrame(fn)
                    } else {
                        cancelAnimationFrame(timer);
                        _that.toTopShow = false
                    }
                })
            },
            getDataList:function () {
                this.$axios.HttpGet('/Stars/qixiList')
                    .then((res) => {
                        console.log(res.data.data.list);
                        if(res.data.code === 200){
                            this.bangList = res.data.data.list;
                            if (na.match(/hongdoulive/i)) {
                                this.bangBottom =  res.data.data.rankInfo;
                            }else{
                                this.bangBottom =  '';
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
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll)
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
            height: 724px;
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
            background: url("https://img.hongrenshuo.com.cn/h5/sevenday-lineBg-ymz.jpg");
            background-size: 100% auto;
            background-repeat: repeat-y;
            padding-top: 10px;
            box-sizing: border-box;
            position: relative;
            padding-bottom: 75px;
            .contentLi{
                width: 334px;
                border-radius: 40px;
                background: #fff;
                height: 73px;
                display: flex;
                align-items: center;
                padding: 0 12px 0 26px;
                box-sizing: border-box;
                position: relative;
                margin-top: 6px;
                margin-left: 26px;
                .num{
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    color: #fff;
                    background: #ff8383;
                    left: -18px;
                    top:50%;
                    margin-top: -18px;
                    font-size: 16px;
                    font-weight: 500;
                }

                .head{
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: #c1c1c1;
                    img{
                        border-radius: 50%;
                    }
                }
                .desc{
                    width: 0;
                    flex: 1;
                    margin-left: 9px;
                    .nickName{
                        color: #000;
                        font-size: 13px;
                        font-weight: 400;
                        line-height: 20px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .mandesc{
                        color: #2b2727;
                        font-size: 12px;
                        line-height: 17px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        padding-top: 5px;
                    }
                    .starsNum{
                        color: #ff8383;
                        font-size: 12px;
                        line-height: 17px;
                    }
                }
                .gift{
                    width: 60px;
                    height: 50px;
                }
                &.active-con{
                    background: #ffffd2;
                }
                &:nth-child(1){
                    margin-top: 0;
                }
            }
            .tips{
                line-height: 28px;
                text-align: center;
                color: #ff8383;
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

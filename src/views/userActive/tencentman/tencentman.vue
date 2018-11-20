<template>
    <div id="app">
        <div v-show="!showWx" class="appIn">
            <audio id="musicid" preload src="" hidden ref="audio" @ended="ended()"></audio>
            <div class="uidList">
                <div class="uidLi" @click="goUid('1869199499270')"></div>
                <div class="uidLi" @click="goUid('2010684698652')"></div>
                <div class="uidLi" @click="goUid('1842233442307')"></div>
                <div class="uidLi" @click="goUid('1919417335838')"></div>
            </div>
            <div class="rule" @click="goRule()"></div>
            <div class="content">
                <div class="contentLi contentLi1">
                    <div class="audioUl">
                        <div class="audioLi" v-for="(item,index) in dataList" v-if="index<4">
                            <div class="audio-left">
                                <p>当前票数:{{item.voteNum}}</p>
                                <div class="audioBg" @click="goAudio(item.mp3,index)">
                                    <img :src="topindex == index?'https://img.hongrenshuo.com.cn/h5/tencent-audioAct-ymz.gif':'https://img.hongrenshuo.com.cn/h5/tencent-audio1-ymz.png'" class="audioIcon">
                                </div>
                            </div>
                            <div @click="goPiaoText(item.id)">
                                <img src="https://img.hongrenshuo.com.cn/h5/tencent-gotou-ymz.png" class="imgSrc">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contentLi contentLi2">
                    <div class="audioUl">
                        <div class="audioLi" v-for="(item,index) in dataList" v-if="index<8 && index>3">
                            <div class="audio-left">
                                <p>当前票数:{{item.voteNum}}</p>
                                <div class="audioBg" @click="goAudio(item.mp3,index)">
                                    <img :src="topindex == index?'https://img.hongrenshuo.com.cn/h5/tencent-audioAct-ymz.gif':'https://img.hongrenshuo.com.cn/h5/tencent-audio1-ymz.png'" class="audioIcon">
                                </div>
                            </div>
                            <div @click="goPiaoText(item.id)">
                                <img src="https://img.hongrenshuo.com.cn/h5/tencent-gotou-ymz.png" class="imgSrc">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contentLi contentLi3">
                    <div class="audioUl">
                        <div class="audioLi" v-for="(item,index) in dataList" v-if="index<12 && index>7">
                            <div class="audio-left">
                                <p>当前票数:{{item.voteNum}}</p>
                                <div class="audioBg" @click="goAudio(item.mp3,index)">
                                    <img :src="topindex == index?'https://img.hongrenshuo.com.cn/h5/tencent-audioAct-ymz.gif':'https://img.hongrenshuo.com.cn/h5/tencent-audio1-ymz.png'" class="audioIcon">
                                </div>
                            </div>
                            <div @click="goPiaoText(item.id)">
                                <img src="https://img.hongrenshuo.com.cn/h5/tencent-gotou-ymz.png" class="imgSrc">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contentLi contentLi4">
                    <div class="audioUl">
                        <div class="audioLi" v-for="(item,index) in dataList" v-if="index<16 && index>11">
                            <div class="audio-left">
                                <p>当前票数:{{item.voteNum}}</p>
                                <div class="audioBg" @click="goAudio(item.mp3,index)">
                                    <img :src="topindex == index?'https://img.hongrenshuo.com.cn/h5/tencent-audioAct-ymz.gif':'https://img.hongrenshuo.com.cn/h5/tencent-audio1-ymz.png'" class="audioIcon">
                                </div>
                            </div>
                            <div @click="goPiaoText(item.id)">
                                <img src="https://img.hongrenshuo.com.cn/h5/tencent-gotou-ymz.png" class="imgSrc">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import {ymzBaseFun, na,goUser} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'
    let shareTitle = '腾讯动漫嗨声次元会-漫画男神声优匹配战';
    let shareDesc = '快来配对你爱的漫画男神和人气声优吧~';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/tencent-wxshare-ymz.png';
    export default {
        data() {
            return {
                dataList: [],
                topindex:-1,
                showWx:false
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            this.getDataList()
        },
        mounted() {
        },
        methods: {
            ended:function () {
                console.log(1111);
                this.topindex = -1;
            },
            goUid: function (uid) {
                return goUser(uid)
            },
            goRule: function () {
                window.location.href = '/Rule/tencentmanrule?showshare=1';
            },
            goAudio:function (mp3,index) {
                if(this.topindex != index){
                    this.$refs.audio.src = mp3;
                }
                if(this.$refs.audio.paused){
                    this.$refs.audio.play();
                    this.topindex = index;
                }else{
                    this.$refs.audio.pause();
                    this.topindex = -1;
                }
            },
            getDataList: function () {
                this.$axios.HttpGet('/vote/cartoonDubList')
                    .then((res) => {
                        console.log(res.data.data);
                        if (res.data.code === 200) {
                            this.dataList = res.data.data;
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
            },
            goDeepLink: function (url) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = url;
                } else {
                    if (na.match(/micromessenger/i) && na.match(/(iphone|ipod|ios|ipad)/i)) {
                        this.showWx = true;
                    } else {
                        var data = {};
                        data.stage = 'kstar'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
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
            goPiaoText: function (id) {
                console.log(id)
                if (na.match(/hongdoulive/i)) {
                    this.$axios.HttpGet('/vote/cartoonDubVote',{voteId:id})
                        .then((res) => {
                            if (res.data.code === 200) {
                                if(res.data.data.code == 200){
                                    this.getDataList();
                                }
                                Toast({
                                    message: res.data.data.msg,
                                    position: 'center',
                                    duration: 1500
                                })
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
                }else{
                    this.goDeepLink("uxinlive://webpage?url=https%3A%2F%2Flive.hongdoulive.com%2FVote%2FcartoonDubIndex%3Fshowshare%3D1");
                }
            }
        },
        components: {
            Wxcontent
        }
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        .appIn{
            width: 100%;
            height: 1709px;
            background: url("https://img.hongrenshuo.com.cn/h5/tencent-bgimage-ymz.png") no-repeat center;
            background-size: 100% 100%;
            position: relative;
            padding-top: 500px;
            box-sizing: border-box;
        }
        img {
            width: 100%;
            height: auto;
        }
        .rule{
            position: absolute;
            width: 70px;
            height: 70px;
            right: 20px;
            top: 183px;
        }
        .uidList{
            width: 100%;
            display: flex;
            height: 86px;
            position: absolute;
            left:0;
            top:418px;
            .uidLi{
                flex: 1;
            }
        }
        .content{
            width: 100%;
            height: 500px;
            .contentLi{
                height: 267px;
                margin: 23px 0 0 10px;
                position: relative;
                .audioUl{
                    position: absolute;
                    top:0;
                    right: -28px;
                    .audioLi{
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        .audio-left{
                            p{
                                padding-left: 16px;
                                box-sizing: border-box;
                                font-size: 13px;
                                color: #ef5361;
                                line-height: 20px;
                                font-weight: 500;
                            }
                            .audioBg{
                                width: 138px;
                                height: 40px;
                                background: url("https://img.hongrenshuo.com.cn/h5/tencent-audiobg-ymz.png") no-repeat center;
                                background-size: 100% 100%;
                                display: flex;
                                align-items: center;
                                padding-left: 25px;
                                box-sizing: border-box;
                                .audioIcon{
                                    width: 19px;
                                    height: 19px;
                                }
                            }
                        }
                        .imgSrc{
                            width: 58px;
                            height: 58px;
                            margin: 8px 0 0 15px;
                            display: block;
                            z-index: 100;
                        }
                    }
                }
            }
            .contentLi1{
                width: 330px;
                background: url("https://img.hongrenshuo.com.cn/h5/tencent-topic1-ymz.png") no-repeat center;
                background-size: 100% 100%;
            }
            .contentLi2{
                width: 325px;
                background: url("https://img.hongrenshuo.com.cn/h5/tencent-topic2-ymz.png") no-repeat center;
                background-size: 100% 100%;
            }
            .contentLi3{
                width: 331px;
                background: url("https://img.hongrenshuo.com.cn/h5/tencent-topic3-ymz.png") no-repeat center;
                background-size: 100% 100%;
            }
            .contentLi4{
                width: 323px;
                background: url("https://img.hongrenshuo.com.cn/h5/tencent-topic4-ymz.png") no-repeat center;
                background-size: 100% 100%;
            }
        }
    }
</style>

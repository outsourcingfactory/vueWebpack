<template>
    <div id="app">
        <div v-show="!showWx" class="appin">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/vacantroom-image_01.png`"></Onepic>
                <div class="rule" @click="goUrl(1)"></div>
            </div>
            <div class="topimageOut topimageOut1">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/vacantroom-image_02.png`"></Onepic>
                <div class="CVcontent">
                    <div class="CVitem" @click="goRoom('','1825104379909')">

                    </div>
                    <div class="CVitem" @click="goRoom('','1880545632258')">

                    </div>
                    <div class="CVitem" @click="goRoom('','1825288593411')">

                    </div>
                </div>
                <div class="video-content" @click="goVideo('1226063221673164872')"></div>
                <div class="novel-content" @click="goNovel('2336850497599','2336863358994')"></div>
            </div>
            <div class="content-list">
                <div class="content-haixuan">
                    <div class="contentLi-haixuan"
                         @click="goRoom(item.userinfo.roomId,item.userinfo.uid)" v-for="(item,index) in dataList">
                        <div class="num">{{index + 1}}</div>
                        <div class="headPic">
                            <img :src="item.userinfo.headPic">
                        </div>
                        <div class="descContent">
                            <div class="lineName">
                                {{item.userinfo.nickname}}
                            </div>

                            <div class="starNum">
                                钻石数：{{item.score}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="loading-container" v-show="huancun">
                    <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                         class="huancunGif">
                </div>
                <div  class="loading-container" v-show="!huancun && dataList.length == 0">
                    <div>
                        <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                             class="emptyPng">
                        <div class="emptyTips">
                            精彩赛事尚未开始
                        </div>
                    </div>
                </div>
            </div>
            <div class="jieshi">本活动最终解释权归克拉克拉所有</div>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'
    let shareTitle = '空房直播竞赛——赢千元现金+月华灼灼！';
    let shareDesc = '又能看又能玩的互动小说来啦！你能否理清线索、解开谜题？';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/vacantroom-share.jpg';
    export default {
        data() {
            return {
                showWx: false,
                dataList:[],
                huancun: true,
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        mounted() {
            this.getData();
            this.$nextTick(function () {
                window.addEventListener('scroll', this.handleScroll)
            });
        },
        methods: {
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

            goUrl: function (type) {
                if (type == 1) {
                    window.location.href = '/Rule/vacantroomrule';
                }
            },

            getData:function(){
                this.dataList = [];
                this.huancun = true;
                this.$axios.HttpGet('/bdx/kongfang', {

                }).then((res) => {
                        console.log(res.data);
                        this.dataList = res.data.data;
                        this.huancun = false;

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
            goVideo:function (videoid) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://smallvideo?video_id=' + videoid;
                } else {
                    window.location.href = 'https://v.hongdoulive.com/v/video?videoId='+videoid;
                }
            },
            goNovel(novelId,chapterId) {
                if (na.match(/hongdoulive/i)) {
                    var appIn = "http://live.hongdoulive.com/novel/dialogApp/novelId/" + novelId + "/chapterId/" + chapterId
                    window.location.href = 'uxinlive://noveldetail?url=' + encodeURIComponent(appIn);
                } else {
                    window.location.href = "http://live.hongdoulive.com/novel/dialog/novelId/" + novelId + "/chapterId/" + chapterId;
                }
            },
            handleScroll: function () {
                this.scrollTop = this.scrollTop = window.pageYOffset || document.body.scrollTop
                if (this.scrollTop > 400) {
                    this.isActive = true
                } else {
                    this.isActive = false
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
        .appin{
            width:100%;
            .topimageOut{
                width:100%;
                height:auto;
                position: relative;
                .rule{
                    width:60px;
                    height:60px;
                    position: absolute;
                    top:100px;
                    right:25px;
                }

            }
            .topimageOut1{
                margin-top:-1px;
                .CVcontent{
                    width:100%;
                    display: flex;
                    padding:0 32px;
                    box-sizing: border-box;
                    height:85px;
                    position: absolute;
                    left:0;
                    top:15px;
                    .CVitem{
                        flex: 1;
                    }
                }
                .video-content{
                    width:100%;
                    height:180px;
                    position: absolute;
                    left:0;
                    top:140px;
                }
                .novel-content{
                    width:145px;
                    height:33px;
                    right:47px;
                    bottom:80px;
                    position: absolute;
                }
            }
            .content-list{
                width:100%;
                padding:0 18px;
                box-sizing: border-box;
                padding-top:10px;
                background: #020202;
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
                .content-haixuan {
                    margin-top:5px;
                    .contentLi-haixuan {
                        width: 100%;
                        height: 77px;
                        background: url("https://img.hongrenshuo.com.cn/h5/vacantroom-listcontent.png") no-repeat center;
                        background-size: 100% 100%;
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
                            width:45px;
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
                            padding: 0 15px;
                            box-sizing: border-box;
                            flex: 1;
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
                                margin-top:5px;
                            }
                        }
                    }
                }
            }
            .jieshi{
                width:100%;
                background: #020202;
                text-align: center;
                color:#5062a3;
                line-height: 50px;
                margin-top:-1px;
                font-size: 12px;
            }
        }

    }
</style>

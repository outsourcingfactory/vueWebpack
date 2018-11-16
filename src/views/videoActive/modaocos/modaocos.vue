<template>
    <div id="app">
        <div v-show="!showWx" class="appcontent">
            <div>
                <div class="topimage">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/modaocos-image_01.png`"></Onepic>
                    <div class="gotoRule" @click="gorule()"></div>
                </div>
                <div class="content-list" v-for="(item,index) in dataList">
                    <div class="list-title">
                        {{item.tagName}}
                        <div class="jinhao"></div>
                    </div>
                    <div class="threeColumVideo">

                        <!--<div class="three-image" v-for="item in videoAll.showVideoList" @click="goVideo(item.videoDetailResp.videoResp.idStr)" v-show="!item.example">-->
                        <!--<img v-lazy="`${item.videoDetailResp.videoResp.coverPic}&x-oss-process=image/resize,m_mfit,h_346,w_248,limit_0/crop,w_248,h_346,g_center`">-->
                        <!--<div class="zan">-->
                        <!--{{item.likeCount}}点赞-->
                        <!--</div>-->
                        <!--</div>-->
                        <div class="three-image-content" v-for="(item,index) in dataList[index].data">
                            <div class="three-image">
                                <img v-lazy="`${item.videoDetailResp.videoResp.coverPic}&x-oss-process=image/resize,m_mfit,h_346,w_248,limit_0/crop,w_248,h_346,g_center`">
                                <div class="zan">
                                    {{item.likeCount}}战力值
                                </div>
                            </div>
                            <div class="dacall" @click="goVideo(item.videoDetailResp.videoResp.idStr)">打榜</div>
                        </div>
                        <div  class="loading-container" v-show="dataList[index].data.length == 0">
                            <div>
                                <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                                     class="emptyPng">
                                <div class="emptyTips">
                                    暂无数据
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="showMore" @click="loadmore(item.tagId,index)" v-if="dataList[index].data.length>=3" ref="showMore1">
                        加载更多
                        <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt="" class="seeMoreIcon" v-if="showSeeLoad">
                        <img src="https://img.hongrenshuo.com.cn/h5/modaocos-down.png" alt="" class="seeMoreIcon1" v-if="!showSeeLoad">
                    </div>
                </div>
                <div class="bottomOut" @click="deepLink('uxinlive://uploadvideo?tag_id=156807&tag_name=魔道祖师cos大赏')">
                    <div class="bottom"></div>
                </div>
            </div>
        </div>

        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na} from 'assets/js/common'
    import confirmUxin from 'components/baseymz/confirmUxin'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'

    let shareTitle = '道友江湖令：魔道祖师cos大赏';
    let shareDesc = '你喜爱的魔道祖师cos视频，都在这里！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/modaocos-share.png';
    export default {
        data() {
            return {
                showWx: false,
                showSeeLoad: false,
                tagid:"25832,25760,14348,14780,10986,14096",
                dataList:[],
                page:1,
                page1:2,
                page2:2,
                page3:2,
                page4:2,
                page5:2,
                page6:2,
            }
        },
        created() {
            this._getListVideo(-1);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
        },
        methods: {
            _getListVideo(onetag) {
                console.log(this.tagid)
                this.$axios.HttpGet('/Tg/gdkNew', {page: this.page,tagid: this.tagid})
                    .then((res) => {
                        console.log(res)
                        if (res.data.code === 200) {
                            if(onetag == -1){
                                this.dataList = res.data.data;
                            }else{

                                this.dataList[onetag].data = this.dataList[onetag].data.concat(res.data.data[0].data);
                                if(res.data.data[0].data.length<3){
                                    this.$refs.showMore1[onetag].style.display="none";
                                }
                            }
                        } else {
                            //等待封装toast
                            Toast({
                                message: res.data.msg,
                                position: 'center',
                                duration: 1500
                            })
                        }
                    })
                    .catch((res) => {
                        Toast({
                            message: "网络错误",
                            position: 'center',
                            duration: 1500
                        })
                    })
            },

            gorule() {
                window.location.href = '/rule/modaocosrule.html'
            },
            loadmore(tagid,index){
                console.log(this.$refs.showMore1[index])
                console.log(index)
                this.tagid = tagid;
                if(index == 0){
                    this.page = this.page1++;
                }else if(index == 1){
                    this.page = this.page2++;
                }else if(index == 2){
                    this.page = this.page3++;
                }else if(index == 3){
                    this.page = this.page4++;
                }else if(index == 4){
                    this.page = this.page5++;
                }else if(index == 5){
                    this.page = this.page6++;
                }
                this._getListVideo(index);
            },
            goVideo:function (videoid) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://smallvideo?video_id=' + videoid;
                } else {
                    window.location.href = 'https://v.hongdoulive.com/v/video?videoId='+videoid;
                }
            },
            deepLink:function (scheme) {
                if (na.match(/hongdoulive/i)) {
                    if (na.match(/(iphone|ipod|ios|ipad)/i)) {

                        if (ymzBaseFun.getVcString('vc') > 88) {
                            window.location.href = 'uxinlive://selectmaterial';
                        } else {
                            this.downString = '前往App Store升级最新版App吧~ '
                            this.rightString = '';
                            this.leftString = '知道啦';
                            this.callBackToUxin = function () {
                            };
                            this.changePage();
                        }
                    } else {
                        if (ymzBaseFun.getVcString('vc') > 104) {
                            window.location.href = 'uxinlive://selectmaterial';
                        } else {
                            this.downString = '升级最新版App来参与吧~'
                            this.rightString = '去升级';
                            this.leftString = '取消';
                            this.changePage();
                        }
                    }
                } else {
                    if (na.match(/micromessenger/i) && na.match(/(iphone|ipod|ios|ipad)/i)) {
                        this.showWx = true;
                    } else {
                        var data = {};
                        data.stage = 'bestyou'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
                        data.ios_custom_url = "https://itunes.apple.com/cn/app/hong-doulive/id1137896285?mt=8"; // 自定义iOS平台下App的下载地址，如果是AppStore的下载地址可以不用填写，【可选】
                        data.ios_direct_open = "true"; //未安装情况下，设置为true为直接打开ios_custom_url，默认为false【可选】
                        data.type = 'test';  //表示现在使用线上模式,如果填写"test", 表示测试模式.【可选】
                        data.params = '{"scheme_url":"' + 'uxinlive://home?subtab=main_video' + '"}'; //注意单引号和双引号的位置
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

            }
        },
        components: {
            Onepic,
            Wxcontent,
            confirmUxin
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        background: #f1ebe5;
        .appcontent {
            padding-bottom: 95px;
        }
        .topimage {
            width: 100%;
            height: auto;
            position: relative;
            .gotoRule {
                position: absolute;
                width: 75px;
                height: 85px;
                top: 200px;
                right: 15px;
            }
        }
        .content-list {
            margin-top:20px;
            &:first-child {
                margin-top: 0;
            }
            .list-title {
                height: 25px;
                line-height: 25px;
                color: #644437;
                border: 1px solid #9a705e;
                border-radius: 5px;
                padding: 0 19px;
                font-size: 13px;
                font-weight: 600;
                margin-left: 24px;
                position: relative;
                display: inline-block;
                .jinhao{
                    width:29px;
                    height:29px;
                    background: url("https://img.hongrenshuo.com.cn/h5/modaocos-jinhao.png") no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    left:-15px;
                    top:-1.5px;
                }
            }
            .threeColumVideo {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                margin-top: 15px;
                /*justify-content:space-between;*/
                .three-image-content{
                    margin-top: 2px;
                    margin-left: 1px;
                    .three-image {
                        width: 124px;
                        /*background: red;*/
                        position: relative;
                        height: 173px;

                        overflow: hidden;
                        .example {
                            position: absolute;
                            top: 6px;
                            left: 6px;
                            width: 50px;
                            height: 20px;
                            border-radius: 3px;
                            color: #fff;
                            font-weight: 400;
                            text-align: center;
                            line-height: 20px;
                            background: #857fff;
                        }
                        .zan {
                            position: absolute;
                            padding: 4px;
                            box-sizing: border-box;
                            color: #644437;
                            font-size: 12px;
                            top: 10px;
                            right: 10px;
                            border-radius: 3px;
                            background-color: #fafbfd;
                            border: 0.5px solid #C7C7C7;
                        }

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .dacall{
                        width:100%;
                        height:30px;
                        line-height: 30px;
                        font-size: 14px;
                        color:#fff;
                        text-align: center;
                        background: #b59283;
                    }
                    &:nth-child(3n-2) {
                        margin-left: 0;
                    }
                }
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

            }
            .showMore{
                color: #644437;
                margin: 10px auto 0;
                text-align: center;
                font-size: 13px;
                display: flex;
                align-items: center;
                justify-content: center;
                .seeMoreIcon{
                    width: 16px;
                    height: 16px;
                    margin-left: 4px;
                }
                .seeMoreIcon1{
                    width: 11px;
                    height: auto;
                    margin-left: 4px;
                }
            }
        }
        .bottomOut {
            width: 100%;
            height: 75px;
            position: fixed;
            z-index: 10000;
            bottom: 0;
            .bottom {
                position: relative;
                width: 179px;
                height: 57px;
                background: url("https://img.hongrenshuo.com.cn/h5/modaocos-bottom-btn.png") no-repeat center;
                background-size: 100% 100%;
                margin: 0 auto;

            }
        }
    }
</style>

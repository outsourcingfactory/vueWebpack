<template>
    <div id="app">
        <div v-show="!showWx">
            <div class="topimage">
                <img src="https://img.hongrenshuo.com.cn/h5/novel-five5top-ymz.png">
                <div class="rule" @click="goRule"></div>
            </div>
            <div class="zhiboBtn" @click="_goUser()">
                <img src="https://img.hongrenshuo.com.cn/h5/novel-zhiboBtn-ymz.png" alt="">
            </div>
            <div class="titleBtn">
                <img src="https://img.hongrenshuo.com.cn/h5/novel-five5title-ymz.png">
            </div>
            <div class="content">
                <!--<img src="https://img.hongrenshuo.com.cn/h5/novel-five5left-ymz.png" class="imgLeft">-->
                <!--<img src="https://img.hongrenshuo.com.cn/h5/novel-five5right-ymz.png" class="imgright">-->
                <div class="title">
                    <div @click="tabSwitch(1)" :class="leftActive?'hot activeTab':'hot'">热度
                        <div class="san" v-show="leftActive"></div>
                    </div>
                    <div @click="tabSwitch(2)" :class="rightActive?'time activeTab':'time'">最新
                        <div class="san" v-show="rightActive"></div>
                    </div>
                </div>
                <div class="contentLiOut" v-for="(item,index) in hotList" @click="_goNovel(item.novelId,item.chapterId)">
                    <div class="contentLi">
                        <img v-lazy="`${item.coverPic}?x-oss-process=image/resize,m_mfit,h_460,w_342,limit_0/crop,w_342,h_460,g_center`" class="bgPic">
                        <div class="zan">
                            {{item.likeCount}}点赞
                        </div>
                        <div class="bottom">
                            <div class="desc">
                                {{item.introduce}}
                            </div>
                            <div class="userInfo" @click.stop="_goUid(item.uid)">
                                <img :src="item.headPic" alt="">
                                <div class="nickName">
                                    {{item.nickname}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="name">
                        {{item.title}}
                    </div>
                </div>
                <div v-show="hotList.length == 0" class="loading-container">
                    <div>
                        <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                             class="emptyPng">
                        <div class="emptyTips">
                            暂无排行榜单数据
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottomImage" @click="_goBottom()">
                <img src="https://img.hongrenshuo.com.cn/h5/novel-five5bottom-ymz.png">
            </div>
            <div>
                <ScrollUpLoading :tipDesc="tipDesc" :showload="showload" :color="'#fff'" v-show="hotList.length != 0"></ScrollUpLoading>
            </div>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import ScrollUpLoading from 'components/baseymz/ScrollUpLoading'
    import {ymzBaseFun, na, goNovel,goUser} from 'assets/js/common'
    import confirmUxin from 'components/baseymz/confirmUxin'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'
    let shareTitle = '第五人格双监管游乐场-同人对话小说征集令！';
    let shareDesc = '第五人格双监管者模式开启！写文赢万元现金+官周大奖！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/novel-five5wxshare-ymz.png';
    export default {
        data() {
            return {
                hotList: [],
                page: 1,
                showload: true,
                algoBottom: false,
                tipDesc: '上滑加载更多...',
                showWx:false,
                type:1,
                leftActive:true,
                rightActive:false
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            this._getListNovel();
            window.addEventListener('scroll', this._getBottom, false);
        },
        methods: {
            tabSwitch(type){
                this.showload = true;
                this.tipDesc = '上滑加载更多...';
                this.algoBottom = false;
                this.page = 1;
                this.hotList = [];
                this.type = type;
                if (type == 1) {
                    this.leftActive = true;
                    this.rightActive = false;
                } else {
                    this.leftActive = false;
                    this.rightActive = true;
                }
                this._getListNovel();
            },
            goRule(){
                window.location.href = '/Rule/fivenovelrule?showshare=1';
            },
            _goNovel(novelId,chapterId) {
                if(chapterId){
                    return goNovel(novelId,chapterId);
                }else{
                    Toast({
                        message: '该小说没有任何章节内容',
                        position: 'center',
                        duration: 1500
                    })
                }
            },
            _goUser() {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://live?roomid=1173904537535119548&roomId=1173904537535119548';
                }else{
                    window.location.href = "https://live.hongdoulive.com/room/1173904537535119548";
                }
            },
            _goUid(uid){
                return goUser(uid);
            },
            _getListNovel() {
                this.$axios.HttpGet('/HotPoint/fifthPerson', {page: this.page,type:this.type})
                    .then((res) => {
                        console.log(res)
                        if (res.data.code === 200) {
                            if (res.data.data.length < 20) {
                                this.$nextTick(function () {
                                    this.showload = false;
                                    this.tipDesc = '没有更多...';
                                });
                            }
                            this.algoBottom = true;
                            this.hotList = this.hotList.concat(res.data.data);
                            console.log(this.hotList)
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
                            message: "网络错误",
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
            _getBottom() {
                if (ymzBaseFun.aleadyBottom() && this.algoBottom) {
                    this.page++;
                    this.tipDesc = '上滑加载更多...';
                    this.showload = true;
                    this._getListNovel();
                }
            },
            goDeepLink: function (url) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = url;
                } else {
                    if (na.match(/micromessenger/i) && na.match(/(iphone|ipod|ios|ipad)/i)) {
                        this.showWx = true;
                    } else {
                        var data = {};
                        data.stage = 'fiveman'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
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
            _goBottom(){
                this.goDeepLink('uxinlive://novelcreate'); //第五人格双监管
            }
        },
        components: {
            ScrollUpLoading,
            confirmUxin,
            Wxcontent
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        background: #271518;
        padding-bottom: 150px;
        img {
            width: 100%;
            height: auto;
        }
        .zhiboBtn{
            width: 349px;
            height: 62px;
            margin: 0 auto 10px;
        }
        .topimage {
            width: 100%;
            height: 661px;
            position: relative;
            .rule{
                position: absolute;
                top:16px;
                right: 14px;
                width: 60px;
                height: 60px;
            }
        }
        .titleBtn {
            width: 155px;
            height: 40px;
            margin: 0 auto 5px;
        }
        .loading-container {
            width: 100%;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            .emptyPng {
                width: 131px;
                height: 112px;
            }
            .emptyTips {
                text-align: center;
                line-height: 40px;
            }
        }
        .content {
            width: 100%;
            margin: 0 auto;
            border-top: 1PX solid #523c28;
            box-sizing: border-box;
            /*border-radius: 6px;*/
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0 5px 10px;
            .imgLeft, .imgright {
                width: 25px;
                height: 22px;
                position: absolute;
                top: -2px;
            }
            .imgLeft {
                left: -2px;
            }
            .imgright {
                right: -2px;
            }
            .title {
                width: 365px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                margin-left: -5px;
                .hot,.time{
                    width: 64px;
                    height: 35px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #efd9bc;
                    text-align: center;
                    line-height: 35px;
                    margin-right: 1px;
                    background: #432920;
                    position: relative;
                    .san{
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-left: 4px solid transparent;
                        border-right: 4px solid transparent;
                        border-top: 4px solid #efd9bc;
                        left: 50%;
                        margin-left: -4px;
                        margin-top: -1px;
                    }
                }
                .activeTab{
                    background: #efd9bc;
                    color: #432920;
                }
            }
            .contentLiOut {
                width: 171px;
                .contentLi {
                    width: 171px;
                    height: 230px;
                    border: 2px solid #c19f7e;
                    background-size: 100% 100%;
                    margin-top: 19px;
                    box-sizing: border-box;
                    border-radius: 6px;
                    position: relative;
                    .bgPic{
                        position: absolute;
                        left: 0;
                        top:0;
                        width: 100%;
                        height: 100%;
                        border-radius: 6px;
                    }
                    .zan {
                        position: absolute;
                        left: 6px;
                        top: 10px;
                        color: #1e1924;
                        background-color: rgba(255, 255, 255, 0.902);
                        border: 1px solid rgb(229, 228, 228);
                        border-radius: 4px;
                        padding: 5px;
                        box-sizing: border-box;
                        z-index: 1;
                    }
                    .bottom {
                        width: 100%;
                        height: 75px;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
                        padding: 7px 7px 0;
                        box-sizing: border-box;
                        z-index: 1;
                        .desc {
                            font-size: 14px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            line-height: 18px;
                            height: 36px;
                        }
                        .userInfo {
                            display: flex;
                            align-items: center;
                            font-size: 10px;
                            margin-top: 5px;
                            img {
                                width: 20px;
                                height: 20px;
                                margin-right: 3px;
                                border-radius: 50%;
                            }
                        }
                    }
                }
                .name {
                    line-height: 30px;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 100%;

                }
            }
        }
        .bottomImage {
            width: 365px;
            height: 55px;
            position: fixed;
            left: 5px;
            bottom: 20px;
            z-index: 100;
        }
    }
</style>

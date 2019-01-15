<template>
    <div id="app">
        <div class="topimage">
            <img src="https://img.hongrenshuo.com.cn/h5/jw3-topImage1-ymz.png">
            <div class="goUrl" @click="_goNovel(2319033020474,2319036911670)"></div>
            <div class="ruleIcon" @click="gorule">
                <img src="https://img.hongrenshuo.com.cn/h5/jw3-ruleIcon-ymz.png" alt="">
            </div>
        </div>
        <div class="contentWraper">
            <div class="title">
                <div @click="tabSwitch(1)" :class="leftActive?'hot activeTab':'hot'">热 度
                    <div class="san" v-show="leftActive"></div>
                </div>
                <div @click="tabSwitch(2)" :class="rightActive?'time activeTab':'time'">最 新
                    <div class="san" v-show="rightActive"></div>
                </div>
            </div>
            <div class="content">
                <div class="contentdes">人气值每5-10分钟更新一次</div>
                <div class="contentLiOut" v-for="(item,index) in hotList"
                     @click="_goNovel(item.novelId,item.chapterId)">
                    <div class="contentLi">
                        <img v-lazy="`${item.coverPicUrl}?x-oss-process=image/resize,m_mfit,h_460,w_342,limit_0/crop,w_342,h_460,g_center`"
                             class="bgPic">
                        <div class="zan">
                            {{item.totalViewCount}}人气
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
        </div>
        <div class="bottomImage" @click="_goBottom()">
            <img src="https://img.hongrenshuo.com.cn/h5/jw3-bottomImage-ymz.png">
        </div>
        <div>
            <ScrollUpLoading :tipDesc="tipDesc" :showload="showload" :color="'#fff'"
                             v-show="hotList.length != 0"></ScrollUpLoading>
        </div>
    </div>
</template>

<script>
    import ScrollUpLoading from 'components/baseymz/ScrollUpLoading'
    import {ymzBaseFun, na, goNovel, goUser} from 'assets/js/common'
    import confirmUxin from 'components/baseymz/confirmUxin'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'

    let shareTitle = '《剑网3》“世外蓬莱”土味情话/对话小说征集大赛！';
    let shareDesc = '万元通宝+永久挂件+官方设定集豪华奖励！各位侠士速来参与！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/jw3-wxshare-ymz.png';
    export default {
        data() {
            return {
                hotList: [],
                page: 1,
                showload: true,
                algoBottom: false,
                tipDesc: '上滑加载更多...',
                showWx: false,
                type: 1,
                leftActive: true,
                rightActive: false,
                dataurl: "/HotPoint/hotList"
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            this._getListNovel();
            window.addEventListener('scroll', this._getBottom, false);
        },
        methods: {
            gorule:function () {
              window.location.href = '/Viewsh5rule/jw3rule?showshare=1';
            },
            tabSwitch(type) {
                this.showload = true;
                this.tipDesc = '上滑加载更多...';
                this.algoBottom = false;
                this.page = 1;
                this.hotList = [];
                this.type = type;
                if (type == 1) {
                    this.leftActive = true;
                    this.rightActive = false;
                    this.dataurl = "/HotPoint/hotList";
                } else {
                    this.leftActive = false;
                    this.rightActive = true;
                    this.dataurl = "/HotPoint/newestList";
                }
                this._getListNovel();
            },
            _goNovel(novelId, chapterId) {
                if (chapterId) {
                    return goNovel(novelId, chapterId);
                } else {
                    Toast({
                        message: '该小说没有任何章节内容',
                        position: 'center',
                        duration: 1500
                    })
                }
            },
            _goUid(uid) {
                return goUser(uid);
            },
            _getListNovel() {
                this.$axios.HttpGet(this.dataurl, {pageNo: this.page, type: 22})
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
                    if (!na.match(/micromessenger/i) && na.match(/(iphone|ipod|ios|ipad)/i)) {
                        this.$wxContent();
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
            _goBottom() {
                this.goDeepLink('uxinlive://novelcreate'); //第五人格双监管
            },
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
        background: #7fb8ff;
        padding-bottom: 100px;
        img {
            width: 100%;
            height: auto;
        }
        .topimage {
            width: 100%;
            height: 1238px;
            position: relative;
            .goUrl {
                width: 100%;
                height: 120px;
                position: absolute;
                left: 0;
                bottom: 116px;
            }
            .ruleIcon{
                width: 198px;
                height: 165px;
                position: absolute;
                right: 0;
                top: 275px;
            }
        }
        .loading-container {
            width: 100%;
            height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
            .emptyPng {
                width: 262px;
                height: 224px;
            }
            .emptyTips {
                text-align: center;
                line-height: 80px;
            }
        }
        .contentWraper {
            width: 100%;
            padding: 0 12px 0;
            box-sizing: border-box;
            background-image: url("https://img.hongrenshuo.com.cn/h5/jw3-conBg-ymz.png");
            background-size: 100% auto;
            position: relative;
        }
        .title {
            width: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            border: 2px solid #5787bf;
            border-bottom: none;
            .hot, .time {
                width: 50%;
                height: 70px;
                font-size: 32px;
                font-weight: 500;
                color: #000;
                text-align: center;
                line-height: 70px;
                margin-right: 1px;
                background: #a29ca8;
                position: relative;
                .san {
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-left: 16px solid transparent;
                    border-right: 16px solid transparent;
                    border-top: 16px solid #5e94b1;
                    left: 50%;
                    margin-left: -8px;
                    margin-top: 2px;
                    z-index: 100;
                }
            }
            .activeTab {
                background: #5e94b1;
                color: #fff;
            }
        }
        .content {
            width: 100%;
            margin: 0 auto;
            border: 2px solid #5787bf;
            border-top: none;
            box-sizing: border-box;
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0 10px 20px;
            background: #d9eaff;
            .contentdes {
                width: 100%;
                text-align: center;
                color: #4874a6;
                font-size: 28px;
                margin-top: 40px;
                font-weight: 500;
            }
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
            .contentLiOut {
                width: 342px;
                .contentLi {
                    width: 340px;
                    height: 460px;
                    border: 1px solid #8aabbf;
                    background-size: 100% 100%;
                    margin-top: 38px;
                    box-sizing: border-box;
                    position: relative;
                    .bgPic {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;

                    }
                    .zan {
                        position: absolute;
                        left: 12px;
                        top: 20px;
                        color: #1e1924;
                        background-color: rgba(255, 255, 255, 0.902);
                        border: 1px solid rgb(229, 228, 228);
                        border-radius: 8px;
                        padding: 10px;
                        box-sizing: border-box;
                        z-index: 1;
                    }
                    .bottom {
                        width: 100%;
                        height: 150px;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
                        padding: 14px 14px 0;
                        box-sizing: border-box;
                        z-index: 1;
                        .desc {
                            font-size: 28px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            line-height: 36px;
                            height: 72px;
                        }
                        .userInfo {
                            display: flex;
                            align-items: center;
                            font-size: 20px;
                            margin-top: 10px;
                            img {
                                width: 40px;
                                height: 40px;
                                margin-right: 6px;
                                border-radius: 50%;
                            }
                        }
                    }
                }
                .name {
                    line-height: 60px;
                    font-size: 28px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 100%;
                    color: #380900;
                    font-width: 500;
                }
            }
        }
        .bottomImage {
            width: 100%;
            height: 120px;
            position: fixed;
            left: 0px;
            bottom: 0px;
            z-index: 100;
        }
    }
</style>

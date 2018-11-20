<template>
    <div id="app">
        <div class="itemcontent">
            <div>
                <div class="topimage">
                    <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/moload-topimage-ymz.png`"></Onepic>
                </div>
                <div class="content">
                    <div class="video-out">
                        <threeColumVideo :videoAll="videoAll"></threeColumVideo>
                    </div>
                    <div>
                        <ScrollUpLoading :tipDesc="tipDesc" :showload="showload" :color="color"></ScrollUpLoading>
                    </div>
                    <div class="tipsAl">
                        本活动最终解释权归KilaKila所有
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import threeColumVideo from 'components/businessYmz/threeColumVideo'
    import ScrollUpLoading from 'components/baseymz/ScrollUpLoading'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Toast from 'assets/js/toast'

    let shareTitle = '魔道祖师专题cos视频集锦';
    let shareDesc = '听说，最近coser们流行来克拉克拉“寻道友”';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/moload-wxshare-ymz.jpg';
    export default {
        data() {
            return {
                exampleVideo: ['1196900191869861919','1196032883353976865','1196302542875656279'],
                videoAll: {
                    exampleVideoList: [],
                    showVideoList: []
                },
                tagid: '10765,13467',
                type: 1,//1 最热 0最新
                page: 1,
                v:2,
                showload: true,
                algoBottom: false,
                tipDesc: '正在加载...',
                color:'#fff',
            }
        },
        created() {
            this._getExampleVideoList();
            this._getVideoList();
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            window.addEventListener('scroll', this._getBottom, false);
        },
        methods: {
            _getBottom() {
                if (ymzBaseFun.aleadyBottom() && this.algoBottom) {
                    this.page++;
                    this.tipDesc = '上滑加载更多...';
                    this.showload = true;
                    this._getVideoList();
                }
            },
//            获取示例视频
            _getExampleVideoList: function () {
                this.$axios.HttpGet('/v/videos', {videoIds: this.exampleVideo.join()})
                    .then((res) => {
                        console.log(res.data.data)
                        if (res.data.data.length > 0) {
                            this.videoAll.exampleVideoList = res.data.data;
                        } else {
                            //等待封装toast

                        }
                    })
                    .catch((res) => {
//                        等待封装toast
                        Toast({
                            message: res,
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
//            获取视频列表
            _getVideoList: function () {
                this.$axios.HttpGet('/Tg/gdk',{page:this.page,type:this.type,v:this.v,tagid:this.tagid})
                    .then((res) => {
                        if (res.data.code === 200) {
//                            给示范视频打标记
                            for (let i = 0; i < res.data.data.length; i++) {
                                for (let j = 0; j < this.exampleVideo.length; j++) {
                                    if (res.data.data[i].videoDetailResp.videoResp.idStr == this.exampleVideo[j]) {
                                        res.data.data[i].example = true;
                                    }
                                }
                            }
                            this.algoBottom = true;
                            if (res.data.data.length < 10) {
                                this.algoBottom = false;
                                this.$nextTick(function () {
                                    this.showload = false;
                                    this.tipDesc = '没有更多...';
                                });
                            }

                            this.videoAll.showVideoList = this.videoAll.showVideoList.concat(res.data.data);
                            console.log(this.videoAll.showVideoList);
                        } else {
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
                            message: res,
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
            gotovideo: function (videoid) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://smallvideo?video_id=' + videoid;
                } else {
                    window.location.href = 'https://v.hongdoulive.com/v/video?videoId='+videoid;
                }
            },
        },
        components: {
            Onepic,
            threeColumVideo,
            ScrollUpLoading,
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        background: #94b4dc;
        background-repeat: repeat-y;
        background-size: 100% auto;
        .itemcontent{
            padding-bottom: 30px;
        }
        .topimage {
            width: 100%;
            height: auto;
            position: relative;
        }
        .content {
            background: #94b4dc;
            width: 100%;
            .tipsAl {
                width: 100%;
                text-align: center;
                height: 25px;
                line-height: 25px;
                font-size: 12px;
                color: #fff;
            }
        }
    }
</style>

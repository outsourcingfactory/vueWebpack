<template>
    <div id="app">
        <div class="topimage">
            <img src="https://img.hongrenshuo.com.cn/h5/kingwar-topimage-ymz.png" alt="">
            <div class="video video1" @click="_goVideo('1194716162345140262')"></div>
            <div class="video video2" @click="_goVideo('1194729373664542812')"></div>
            <div class="video video3" @click="_goVideo('1194724554711236616')"></div>
            <div class="video video4" @click="_goVideo('1195066210769698867')"></div>
        </div>
        <div class="content">
            <div class="contentLi" v-for="(item,index) in novelData" @click="_goNovel(item.novelId,item.chapterId)">
                <div class="imgOut">
                    <img :src="item.coverPicUrl+'?x-oss-process=image/resize,m_mfit,h_454,w_334,limit_0/crop,w_334,h_454,g_center'" alt="" class="bgpic">
                    <div class="modal-bottom">
                        <div class="desc" v-if="item.introduce">{{item.introduce}}</div>
                        <div class="userInfo">
                            <img :src="item.headPic" alt="" class="headPic">
                            <div class="nickname">{{item.nickName}}</div>
                        </div>
                    </div>
                </div>
                <div class="title">{{item.title}}</div>
            </div>
        </div>
        <div class="bottom">
            <img src="https://img.hongrenshuo.com.cn/h5/kingwar-bottomimage-ymz.png" alt="">
        </div>
    </div>
</template>

<script>
    import {ymzBaseFun, na, goNovel, goVideo} from 'assets/js/common'
    import Toast from 'assets/js/toast'
    let shareTitle = '王者荣耀破茧之战-蝉离BATTLE专题集锦';
    let shareDesc = '视频+对话小说精彩内容，王者峡谷第一舞姬之争！';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/kingwar-wxshare-ymz.jpg';
    export default {
        data() {
            return {
                novelData: [],
            }
        },
        created() {
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            this._getHotListNovel();
        },
        methods: {
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
            _goVideo(videoid) {
                if(videoid){
                    return goVideo(videoid);
                }
            },
            _getHotListNovel() {
                this.$axios.HttpGet('/novel_active/theKineNovel')
                    .then((res) => {
                        console.log(res.data)
                        if(res.data.code == 200){
                            this.novelData = res.data.data.novelData;
                        }else{
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
        },
        components: {

        }
    }
</script>

<style lang="scss" scoped>
    #app {
        background: #0c102b;
        img{
            width: 100%;
            height: auto;
        }
        .topimage{
            width: 100%;
            height: 1848px;
            position: relative;
            .video{
                position: absolute;
                width: 100%;
                height: 200px;
            }
            .video1{
                top:580px;
                left: 0px;
            }
            .video2{
                top:890px;
                left: 0px;
            }
            .video3{
                top:1204px;
                left: 0px;
            }
            .video4{
                top:1520px;
                left: 0px;
            }
        }
        .content{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0 15px;
            box-sizing: border-box;
            .contentLi{
                margin-top: 20px;
                .imgOut{
                    position: relative;
                    .bgpic{
                        width: 167px;
                        height: 227px;
                    }
                    .modal-bottom{
                        width: 100%;
                        max-height: 75px;
                        padding: 10px;
                        box-sizing: border-box;
                        background: linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6));
                        position: absolute;
                        left: 0;
                        bottom:0;
                        color: #fff;
                        font-size: 14px;
                        .desc{
                            line-height: 16px;
                            height: 33px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
                        .userInfo{
                            margin-top: 5px;
                            display: flex;
                            align-items: center;
                            font-size: 12px;
                            img{
                                width: 20px;
                                height: 20px;
                                margin-right: 5px;
                                border-radius: 50%;
                            }
                            .nickname{
                                flex:1;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
                .title{
                    width: 167px;
                    font-size: 15px;
                    color: #3b695a;
                    line-height: 30px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-weight: 500;
                }

            }
        }
        .bottom{
            width: 100%;
            height: 115px;
            margin-top: 30px;
        }
    }
</style>

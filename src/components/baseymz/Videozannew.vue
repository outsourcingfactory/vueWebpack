<template>
    <!--跳一跳类似模板组件-->
    <div class="videozan" v-bind:style="{background:videostyle.contentBg,borderColor:videostyle.bordercolor}">
        <div class="imgout" @click="goVideo(videoDesc.videoDetailResp.videoResp.idStr)">
            <div class="piaoNumber" v-bind:style="{color:videostyle.authorname}">{{videoDesc.likeCount*100}}人气值</div>
            <img v-lazy="`${videoDesc.videoDetailResp.videoResp.coverPic}&x-oss-process=image/resize,m_mfit,h_97,w_170,limit_0/crop,w_170,h_97,g_center`">
            <div class="showVideo">
                <img src="https://img.hongrenshuo.com.cn/h5/starcp3-showVideo-ymz.png" alt="">
            </div>
        </div>
        <div class="ticketContent">
            <div class="piatitle" v-bind:style="{color:videostyle.authorname}">
                {{videoDesc.videoDetailResp.videoResp.introduce}}
            </div>
            <div class="art">
                <div class="artName" @click="goUid(videoDesc.videoDetailResp.userResp.id)">
                    <div class="headpicOut">
                        <img :src="`${videoDesc.videoDetailResp.userResp.headPortraitUrl}&x-oss-process=image/resize,m_mfit,h_80,w_80,limit_0/crop,w_80,h_80,g_center`" alt="">
                    </div>
                    <div class="nickname" v-bind:style="{color:videostyle.authorname}">
                        {{videoDesc.videoDetailResp.userResp.nickname}}
                    </div>
                </div>
            </div>
            <div class="goTicketout">
                <div class="goTicket" @click="goVideo(videoDesc.videoDetailResp.videoResp.idStr)" v-bind:style="{backgroundImage: 'url(' + videostyle.zanBtn + ')'}"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {na} from 'assets/js/common'
    export default {
        props:{
            videoDesc:{
                type:Object
            },
            videostyle:{
                type:Object
            }
        },
        methods:{
            goVideo:function (videoid) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://smallvideo?video_id=' + videoid;
                } else {
                    window.location.href = 'https://v.hongdoulive.com/v/video?videoId='+videoid;
                }
            },
            goUid:function (uid) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://userinfo?uid='+uid;
                } else {
                    window.location.href = 'https://live.hongdoulive.com/index/roomuser/uid/'+uid;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .videozan{
        width: 175px;
        height: 203px;
        background: #d9d4f5;
        position: relative;
        padding: 3px;
        box-sizing: border-box;
        margin-top: 5px;
        border-radius: 6px;
        border-style: solid;
        border-width: 2px;
        box-sizing: border-box;
        .imgout {
            width: 166px;
            height: 97px;
            position: relative;
            .piaoNumber {
                position: absolute;
                padding: 4px;
                box-sizing: border-box;
                color: #7260be;
                font-weight: 400;
                font-size: 12px;
                top: 7px;
                left: 7px;
                border-radius:5px;
                background-color: #fafbfd;
                border: 0.5px solid rgb(86, 56, 48);
            }
            .showVideo{
                position: absolute;
                width: 30px;
                height:30px;
                left:50%;
                top:50%;
                margin-left: -15px;
                margin-top: -15px;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
        .ticketContent {
            width: 100%;
            position: relative;
            .piatitle{
                font-size: 14px;
                color: #7264ba;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                line-height: 25px;
                padding: 0 5px;
                box-sizing: border-box;
                font-weight: 400;
            }
            .art {
                width: 100%;
                box-sizing: border-box;
                .artName {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    box-sizing: border-box;
                    height: 43px;
                    padding-left: 3px;
                    .headpicOut {
                        width: 35px;
                        height: 35px;
                        background:#9991f8;
                        padding:2px;
                        box-sizing: border-box;
                        border-radius: 50%;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 15px;
                            display: inline-block;
                        }
                    }
                    .nickname {
                        flex: 1;
                        color: #7264ba;
                        font-size: 13px;
                        padding-left: 5px;
                        box-sizing: border-box;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-weight: 500;
                        line-height: 15px;
                    }
                }
            }
            .goTicketout {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .goTicket {
                    width: 146px;
                    height: 29px;
                    text-align: center;
                    line-height: 26px;
                    background-image: url("https://img.hongrenshuo.com.cn/h5/jumptwo-likeBtn-ymz.png");
                    background-repeat:no-repeat;
                    background-position: center;
                    background-size: 100% 100%;
                    color: #5f441e;
                    font-size: 13px;
                }
            }
        }
    }
</style>

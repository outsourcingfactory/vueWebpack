<template>
    <!--第一名第二名第三名带头像-->
    <div class="onerank">
        <div class="listbangthree listbang2">
            <div class="anchorHeader anchorTop2" @click="goUid(oneRankData[1].uid)">
                <div class="headerWraper">
                    <img :src="oneRankData[1].headPic">
                </div>
                <div class="anchorNo anchorNo2"></div>
            </div>
            <p class="bangName">{{oneRankData[1].nickname}}</p>
            <div class="zuanshiList">
                <div class="imgout">
                    <img src="https://img.hongrenshuo.com.cn/h5/call-zuanshi-ymz.png" alt=""/>
                </div>
                <span>{{oneRankData[1].diamond}}</span>
            </div>
        </div>
        <div class="listbangthree listbang1">
            <div class="anchorHeader anchorTop1" @click="goUid(oneRankData[0].uid)">
                <div class="headerWraper">
                    <img :src="oneRankData[0].headPic">
                </div>
                <div class="anchorNo anchorNo1"></div>
            </div>
            <p class="bangName">{{oneRankData[0].nickname}}</p>
            <div class="zuanshiList">
                <div class="imgout">
                    <img src="https://img.hongrenshuo.com.cn/h5/call-zuanshi-ymz.png" alt=""/>
                </div>
                <span>{{oneRankData[0].diamond}}</span>
            </div>
        </div>
        <div class="listbangthree listbang3">
            <div class="anchorHeader anchorTop3" @click="goUid(oneRankData[2].uid)">
                <div class="headerWraper">
                    <img :src="oneRankData[2].headPic">
                </div>
                <div class="anchorNo anchorNo3"></div>
            </div>
            <p class="bangName">{{oneRankData[2].nickname}}</p>
            <div class="zuanshiList">
                <div class="imgout">
                    <img src="https://img.hongrenshuo.com.cn/h5/call-zuanshi-ymz.png" alt=""/>
                </div>
                <span>{{oneRankData[2].diamond}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {na} from 'assets/js/common'

    export default {
        props: {
            oneRankData: {
                type: Array
            }
        },
        methods: {
            goUid: function (uid) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = 'uxinlive://userinfo?uid=' + uid;
                } else {
                    window.location.href = 'https://live.hongdoulive.com/index/roomuser/uid/' + uid;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .onerank {
        width: 100%;
        display: flex;
        .anchorHeader {
            width: 87px;
            height: 92px;
            display: inline-block;
            vertical-align: top;
            position: relative;
            text-align: center;
            left: 50%;
            margin-left: -43.5px;
            .headerWraper {
                width: 75px;
                height: 75px;
                position: absolute;
                bottom: 2px;
                left: 6px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    vertical-align: top;
                    border: none;
                }
            }
            .anchorNo {
                width: 65px;
                height: 16px;
                position: absolute;
                left: 11px;
                bottom: 1.5px;
            }
        }
        .listbangthree {
            flex: 1;
            .bangName {
                text-align: center;
                width: 108px;
                font-size: 11px;
                padding: 0 3px;
                color: #2b2727;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .zuanshiList {
                margin-top: 11px;
                text-align: center;
                font-size: 0;
                .imgout {
                    display: inline-block;
                    width: 11.5px;
                    height: 10px;
                    margin-right: 3px;
                    img {
                        width: 100%;
                        height: auto;
                        display: inline-block;
                        vertical-align: top;
                    }
                }
                span {
                    vertical-align: top;
                    color: #8260ff;
                    font-size: 10px;
                }
            }
        }
        .listbang2 {
            .anchorTop2 {
                top: 34px;
                background: url('http://res.uxin.com/hongdoulive/list_top2imgwraper1.png?v=1') no-repeat;
                background-size: 87px 92px;
                .anchorNo2 {
                    background: url('https://res.uxin.com/hongdoulive/list_No2.png') no-repeat;
                    background-size: 65px 16px;
                }
            }
            .bangName {
                margin-top: 46px;
            }
        }
        .listbang1 {
            .bangName {
                margin-top: 12px;
            }
            .anchorTop1 {
                background: url('https://res.uxin.com/hongdoulive/list_top1imgwraper1.png?v=1') no-repeat;
                background-size: 87px 92px;
                .anchorNo1 {
                    background: url('https://res.uxin.com/hongdoulive/list_No1.png') no-repeat;
                    background-size: 65px 16px;
                }
            }
        }
        .listbang3 {
            .bangName {
                margin-top: 46px;
            }
            .anchorTop3 {
                top: 34px;
                background: url('https://res.uxin.com/hongdoulive/list_top3imgwraper1.png?v=1') no-repeat;
                background-size: 87px 92px;
                .anchorNo3 {
                    background: url('https://res.uxin.com/hongdoulive/list_No3.png') no-repeat;
                    background-size: 65px 16px;
                }
            }
        }
    }
</style>

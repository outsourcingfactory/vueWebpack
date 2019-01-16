<template>
    <div id="app">
        <div class="ruleIcon" @click="goRule">
            <img src="https://img.hongrenshuo.com.cn/h5/findlyact-activeRuleIcon-ymz.png" alt="">
        </div>
        <div class="ruleIcon mxIcon" @click="goMx">
            <img src="https://img.hongrenshuo.com.cn/h5/findlyact-mxgoto-ymz.png" alt="">
        </div>
        <div class="container" :class="copywriter != ''?'container-bottom':''">
            <div class="goTop" @click.stop="scrollToTop()" v-show="isActive">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/findlyact-gotop-ymz.png`"></Onepic>
            </div>
            <img :src="backTop" alt="" class="topImage">
            <div class="page" v-if="page != 'rongyu'" :style="{backgroundColor:backColor}">
                <div class="tablist">
                    <div class="tab" :class="tabIndex == 0?'tabActive':''" @click="checkTab(0)">玩法</div>
                    <div class="tab" :class="tabIndex == 1?'tabActive':''" @click="checkTab(1)">赛况</div>
                    <div class="tab" :class="tabIndex == 2?'tabActive':''" @click="checkTab(2)">奖励</div>
                    <div class="tab" :class="tabIndex == 3?'tabActive':''" @click="checkTab(3)">金主榜</div>
                    <div class="tab" :class="tabIndex == 4?'tabActive':''" @click="checkTab(4)">家族榜</div>
                    <div class="zhiboConT" v-if="anchorInfo != ''">
                        <div class="zhiboConIn">
                            <div class="topLine">
                                <div class="type">#{{anchorInfo.type}}</div>
                                <div class="nickName dottline">{{anchorInfo.nickname}}</div>
                                <div class="fenshuo">总分：{{anchorInfo.totalScore}}</div>
                            </div>
                            <div class="desc">
                                <div class="descLeft">
                                    <img :src="anchorInfo.headPic" alt="" class="headPic">
                                    <div class="descline">
                                        <div class="jifen">
                                            积分：{{anchorInfo.score}}
                                        </div>
                                        <div class="renqi">
                                            人气票：{{anchorInfo.voteNum}}
                                        </div>
                                    </div>
                                </div>
                                <div class="gopiao" @click="goVote(anchorInfo.uid,1)">
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-qupiao-ymz.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="tabCon0" v-if="tabIndex == 0">
                        <div class="wanfa">
                            <div class="jindu">
                                <div class="yellowJinTop">
                                    <div class="yellowJinTopIn" :style="{width:lineWidth}"></div>
                                </div>
                                <div class="yellowJinTopRight" v-if="jieduan>=5"></div>
                                <div class="yellowJinBottom">
                                    <div class="yellowJinBottomIn" :style="{width:lineWidth1}"></div>
                                </div>
                                <div class="jinduLi jinduLi1 ">
                                    <div class="time">12.15-12.17</div>
                                    <!--<div class="yuan"></div>-->
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-starActive-ymz.png" alt=""
                                         class="star">
                                    <div class="name">报名</div>
                                </div>
                                <div class="jinduLi jinduLi2">
                                    <div class="time">12.18-12.20</div>
                                    <!--<div class="yuan"></div>-->
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-starActive-ymz.png" alt=""
                                         class="star">
                                    <div class="name">年度预选</div>
                                </div>
                                <div class="jinduLi jinduLi3">
                                    <div class="time">12.21-12.23</div>
                                    <div class="yuan" v-if="jieduan<3"></div>
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-starActive-ymz.png" alt=""
                                         class="star" v-if="jieduan>=3">
                                    <div class="name">百团大战</div>
                                </div>
                                <div class="jinduLi jinduLi4">
                                    <div class="time">12.24-12.26</div>
                                    <div class="yuan" v-if="jieduan<4"></div>
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-starActive-ymz.png" alt=""
                                         class="star" v-if="jieduan>=4">
                                    <div class="name">分队竞技</div>
                                </div>
                                <div class="jinduLi jinduLi5">
                                    <div class="time">12.27</div>
                                    <div class="yuan" v-if="jieduan<5"></div>
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-starActive-ymz.png" alt=""
                                         class="star" v-if="jieduan>=5">
                                    <div class="name">荣耀决斗</div>
                                </div>
                                <div class="jinduLi jinduLi6">
                                    <div class="time">12.28</div>
                                    <div class="yuan" v-if="jieduan<6"></div>
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-starActive-ymz.png" alt=""
                                         class="star" v-if="jieduan>=6">
                                    <div class="name">复活之光</div>
                                </div>
                                <div class="jinduLi jinduLi7">
                                    <div class="time">12.29</div>
                                    <div class="yuan" v-if="jieduan<7"></div>
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-starActive-ymz.png" alt=""
                                         class="star" v-if="jieduan>=7">
                                    <div class="name">巅峰对决</div>
                                </div>
                                <div class="jinduLi jinduLi8">
                                    <div class="time">12.30</div>
                                    <div class="yuan" v-if="jieduan<8"></div>
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-starActive-ymz.png" alt=""
                                         class="star" v-if="jieduan>=8">
                                    <div class="name">王的诞生</div>
                                </div>
                            </div>
                        </div>
                        <div class="baoming">
                            <div class="baoming-title">
                                <img src="https://img.hongrenshuo.com.cn/h5/findlyact-wanfaTitle1-ymz.png" alt="">
                            </div>
                            <div class="baomingCon">
                                <div class="bmConIn">
                                    <div class="desc">
                                        三大荣誉赛道同时开启，主播根据自己的特征选择适合自己的赛道，争夺年度三大荣誉奖牌，<span>一旦报名成功将不允许再更换赛道，报名截止时间为12月20日，</span>请各位主播注意截止时间避免错过机会~
                                    </div>
                                    <div class="seeMore" @click="goDetail">
                                        查看详情
                                    </div>
                                    <div class="btnOut" v-if="track == 0">
                                        <div class="title">请选择你想进入的赛道</div>
                                        <div class="btnflex">
                                            <div class="btn" :class="saidaoIndex == 0?'btnActive':''"
                                                 @click="checkSaidao(0)">CV
                                            </div>
                                            <div class="btn" :class="saidaoIndex == 1?'btnActive':''"
                                                 @click="checkSaidao(1)">唱将
                                            </div>
                                            <div class="btn" :class="saidaoIndex == 2?'btnActive':''"
                                                 @click="checkSaidao(2)">人气
                                            </div>
                                            <!--<div class="btn" :class="saidaoIndex == 3?'btnActive':''" @click="checkSaidao(3)">萌新</div>-->
                                        </div>
                                        <div class="sureBtn" @click="sureGoSaidao">确定加入该赛道</div>
                                        <div class="title">如果你是观众，可以不用选择赛道</div>
                                    </div>
                                    <div class="btnOut" v-else>
                                        <div class="title">我的赛道</div>
                                        <div class="btnflex1">
                                            <div class="btnBao">{{trackName}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="baoming baoming2">
                            <img src="https://img.hongrenshuo.com.cn/h5/findlyact-wanfabottomImage4-ymz.png" alt=""
                                 class="baomingImage">
                        </div>
                    </div>
                    <div class="tabCon1" v-if="tabIndex == 1">
                        <div>
                            <div class="slider-groupOut">
                                <div class="slider-group" ref="sliderGroup" id="slider-group">
                                    <div class="titleLi" :class="type == 1?'active-titleLi':''"
                                         @click="checkTabXuan(1)">
                                        年度预选
                                    </div>
                                    <div class="titleLi" :class="type == 2?'active-titleLi':''"
                                         @click="checkTabXuan(2)">
                                        百团大战
                                    </div>
                                    <div class="titleLi" :class="type == 3?'active-titleLi':''"
                                         @click="checkTabXuan(3)">
                                        分队竞技
                                    </div>
                                    <div class="titleLi" :class="type == 4?'active-titleLi':''"
                                         @click="checkTabXuan(4)">
                                        荣耀决斗
                                    </div>
                                    <div class="titleLi" :class="type == 5?'active-titleLi':''"
                                         @click="checkTabXuan(5)">
                                        复活之光
                                    </div>
                                    <div class="titleLi" :class="type == 6?'active-titleLi':''"
                                         @click="checkTabXuan(6)">
                                        巅峰对决
                                    </div>
                                    <div class="titleLi" :class="type == 7?'active-titleLi':''"
                                         @click="checkTabXuan(7)">
                                        王的诞生
                                    </div>
                                </div>
                            </div>
                            <div class="titleBtn">
                                <div class="titleBtnLeft">
                                    {{tabLeftTips}}<span class="jinjinum" v-if="tabLeftTips == '年度预选'">（前64名晋级）</span>
                                    <div class="title-right" v-if="type==2">
                                        <div class="one" :class="time == 1?'title-right-active':''"
                                             @click="checkTuanTime(1)">
                                            21日
                                            <div class="inline" v-show="time == 1"></div>
                                        </div>
                                        <div class="dot"></div>
                                        <div class="one" :class="time == 2?'title-right-active':''"
                                             @click="checkTuanTime(2)">
                                            22日
                                            <div class="inline" v-show="time == 2"></div>
                                        </div>
                                        <div class="dot"></div>
                                        <div class="one" :class="time == 3?'title-right-active':''"
                                             @click="checkTuanTime(3)">
                                            23日
                                            <div class="inline" v-show="time == 3"></div>
                                        </div>
                                    </div>
                                    <div class="title-right" v-if="type==3">
                                        <div class="one" :class="time == 1?'title-right-active':''"
                                             @click="checkTuanTime(1)">
                                            24日
                                            <div class="inline" v-show="time == 1"></div>
                                        </div>
                                        <div class="dot"></div>
                                        <div class="one" :class="time == 2?'title-right-active':''"
                                             @click="checkTuanTime(2)">
                                            25日
                                            <div class="inline" v-show="time == 2"></div>
                                        </div>
                                        <div class="dot"></div>
                                        <div class="one" :class="time == 3?'title-right-active':''"
                                             @click="checkTuanTime(3)">
                                            26日
                                            <div class="inline" v-show="time == 3"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="titleBtnRight" @click="goSaidao">
                                    赛道榜
                                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-arrowright-ymz.png" alt="">
                                </div>
                            </div>
                            <img src="https://img.hongrenshuo.com.cn/h5/findlyact-bottomline-ymz.png" alt=""
                                 class="titleBtnLine">
                        </div>
                        <div v-if="zhuDataList.length == 0 && !allLoad" class="loading-container">
                            <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                                 class="huancunGif">
                        </div>
                        <div class="loading-container" v-if="zhuDataList.length == 0 && allLoad">
                            <div>
                                <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                                     class="emptyPng">
                                <div class="emptyTips">
                                    精彩赛事尚未开始
                                </div>
                            </div>
                        </div>
                        <div v-if="zhuDataList.length > 0">
                            <div v-if="type == 1">
                                <div class="swiperOut">
                                    <swiper :options="swiperOption" ref="mySwiper">
                                        <swiper-slide class="swiper-slide" v-for="(item,index) in zhuData.winnerList"
                                                      :key="index">
                                            <div class="cardslide">
                                                <div class="titleTop">
                                                    <div class="titleLeft" v-if="index == 0">
                                                        12月18日闯关任务
                                                    </div>
                                                    <div class="titleLeft" v-else-if="index == 1">
                                                        12月19日闯关任务
                                                    </div>
                                                    <div class="titleLeft" v-else-if="index == 2">
                                                        12月20日闯关任务
                                                    </div>
                                                    <div class="titleRight">
                                                        <!--当前积分：<span>312321341</span>-->
                                                    </div>
                                                </div>
                                                <div class="leizhuList">
                                                    <div class="leizhu" v-for="(item1,index1) in item"
                                                         @click="goRoom(item1.roomId,item1.uid)" :key="index1">
                                                        <div class="leizhuTime" v-html="getleizhu(index1)"></div>
                                                        <img :src="item1.headPic || 'https://img.hongrenshuo.com.cn/h5/findlyact-normaolhead-ymz.png'"
                                                             alt="" class="leizhuImage">
                                                        <div class="leizhuNick">{{item1.nickname || '虚位以待'}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </swiper-slide>
                                        <div class="swiper-pagination swiper-pagination1" slot="pagination"></div>
                                    </swiper>
                                </div>
                                <div class="jinzhuContent">
                                    <div class="jinzhuContentLi" v-for="(item,index) in zhuDataList"
                                         @click="goRoom(item.roomId,item.uid)">
                                        <div class="num">{{index + 1}}</div>
                                        <img :src="item.headPic" alt="" class="headPic">
                                        <div class="desc noWidth">
                                            <p class="nickName dottline">{{item.nickname}}</p>
                                            <p class="gxian">积分：{{item.score}}</p>
                                        </div>
                                        <div class="touPiao">
                                            <img src="https://img.hongrenshuo.com.cn/h5/findlyact-gozhichi-ymz.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tuan" v-if="type == 2 || type == 3 || type == 4 || type == 6">
                                <div class="juedouTitleOut" v-if="zhuData != ''">
                                    <div class="juedouTitle">
                                        12月{{zhuData.date}}日闯关任务
                                    </div>
                                    <div class="leizhuList">
                                        <div class="leizhu" v-for="(item,index) in zhuData.winnerList"
                                             @click="goRoom(item.roomId,item.uid)" :key="index">
                                            <div class="leizhuTime" v-html="getleizhu(index)"></div>
                                            <img :src="item.headPic || 'https://img.hongrenshuo.com.cn/h5/findlyact-normaolhead-ymz.png'"
                                                 alt="" class="leizhuImage">
                                            <div class="leizhuNick">{{item.nickname || '虚位以待'}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tuanContent">
                                    <div class="content-list">
                                        <div class="content-chusai">
                                            <div class="contentLi-chusai" v-for="(item,index) in zhuDataList">
                                                <div class="contentLi-chusai-Bg"
                                                     @click="goRoom(item.firstroomId,item.firstUid)">
                                                    <div class="contentLi-chusai-in">
                                                        <div class="nickName">
                                                            {{item.firstnickname}}
                                                        </div>
                                                        <div class="headPic">
                                                            <img :src="item.firstheadPic">
                                                        </div>
                                                        <div class="desc">
                                                            {{item.firstintroduction || '暂无简介'}}
                                                        </div>
                                                        <div class="starNum">
                                                            积分：{{item.firstScore}}
                                                        </div>
                                                    </div>
                                                    <div class="victoryLeft" v-show="item.isWin == 1">
                                                        <img src="https://img.hongrenshuo.com.cn/h5/kstar-con2yepleft-ymz.png">
                                                    </div>
                                                </div>
                                                <div class="contentLi-chusai-middle">
                                                    <div class="vs">
                                                        <img src="https://img.hongrenshuo.com.cn/h5/kstar-vs-ymz.png"
                                                             alt="">
                                                    </div>
                                                </div>
                                                <div class="contentLi-chusai-Bg bgRight"
                                                     @click="goRoom(item.secondroomId,item.secondUid)">
                                                    <div class="contentLi-chusai-in">
                                                        <div class="nickName">
                                                            {{item.secondnickname}}
                                                        </div>
                                                        <div class="headPic">
                                                            <img :src="item.secondheadPic">
                                                        </div>
                                                        <div class="desc">
                                                            {{item.secondintroduction || '暂无简介'}}
                                                        </div>
                                                        <div class="starNum">
                                                            积分：{{item.secondScore}}
                                                        </div>
                                                    </div>
                                                    <div class="victoryRight" v-show="item.isWin == 2">
                                                        <img src="https://img.hongrenshuo.com.cn/h5/kstar-con2yepright-ymz.png">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="fuhuo" v-if="type == 5">
                                <div class="juedouTitleOut" v-if="zhuData != ''">
                                    <div class="juedouTitle">
                                        12月{{zhuData.date}}日闯关任务
                                    </div>
                                    <div class="leizhuList">
                                        <div class="leizhu" v-for="(item,index) in zhuData.winnerList"
                                             @click="goRoom(item.roomId,item.uid)" :key="index">
                                            <div class="leizhuTime" v-html="getleizhu(index)"></div>
                                            <img :src="item.headPic || 'https://img.hongrenshuo.com.cn/h5/findlyact-normaolhead-ymz.png'"
                                                 alt="" class="leizhuImage">
                                            <div class="leizhuNick">{{item.nickname || '虚位以待'}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="jinzhuContent">
                                    <div class="jinzhuContentLi" v-for="(item,index) in zhuDataList"
                                         @click="goRoom(item.roomId,item.uid)" v-if="index < 2">
                                        <div class="num actNum">{{index + 1}}</div>
                                        <img :src="item.headPic" alt="" class="headPic">
                                        <div class="desc noWidth">
                                            <p class="nickName dottline">{{item.nickname}}</p>
                                            <p class="gxian">积分：{{item.score}}</p>
                                        </div>
                                        <div class="touPiao">
                                            <img src="https://img.hongrenshuo.com.cn/h5/findlyact-gozhichi-ymz.png" alt="">
                                        </div>
                                    </div>
                                    <div class="fenzuLine">
                                        -----------  以上主播将晋级 -----------
                                    </div>
                                    <div class="jinzhuContentLi" v-for="(item,index) in zhuData.list"
                                         @click="goRoom(item.roomId,item.uid)" v-if="index > 1">
                                        <div class="num">{{index + 1}}</div>
                                        <img :src="item.headPic" alt="" class="headPic">
                                        <div class="desc noWidth">
                                            <p class="nickName dottline">{{item.nickname}}</p>
                                            <p class="gxian">积分：{{item.score}}</p>
                                        </div>
                                        <div class="touPiao">
                                            <img src="https://img.hongrenshuo.com.cn/h5/findlyact-gozhichi-ymz.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="wang" v-if="type == 7">
                                <div class="juedouTitleOut" v-if="zhuData != ''">
                                    <div class="juedouTitle">
                                        12月{{zhuData.date}}日闯关任务
                                    </div>
                                    <div class="leizhuList">
                                        <div class="leizhu" v-for="(item,index) in zhuData.winnerList"
                                             @click="goRoom(item.roomId,item.uid)" :key="index">
                                            <div class="leizhuTime" v-html="getleizhu(index)"></div>
                                            <img :src="item.headPic || 'https://img.hongrenshuo.com.cn/h5/findlyact-normaolhead-ymz.png'"
                                                 alt="" class="leizhuImage">
                                            <div class="leizhuNick">{{item.nickname || '虚位以待'}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="threeMan">
                                    <div class="manOut" v-for="(item,index) in zhuDataList" :class="`manOut${index+1}`"
                                         v-if="index<3" @click="goRoom(item.roomId,item.uid)">
                                        <div class="man">
                                            <img src="https://img.hongrenshuo.com.cn/h5/findlyact-yuanzhu-ymz.png" alt=""
                                                 class="yuanzhu yuanzhu1">
                                            <img src="https://img.hongrenshuo.com.cn/h5/findlyact-yuanzhu-ymz.png" alt=""
                                                 class="yuanzhu yuanzhu2">
                                            <img :src="`https://img.hongrenshuo.com.cn/h5/findlyact-xieguan${index+1}-ymz.png`"
                                                 alt="" class="guan">
                                            <img :src="item.headPic" alt="" class="headerPP">
                                        </div>
                                        <div class="nickName dottline">{{item.nickname}}</div>
                                        <div class="gongxian">积分：{{item.score}}</div>
                                    </div>
                                </div>
                                <div class="jinzhuContent">
                                    <div class="jinzhuContentLi" v-for="(item,index) in zhuData.list"
                                         @click="goRoom(item.roomId,item.uid)" v-if="index > 2">
                                        <div class="num">{{index + 1}}</div>
                                        <img :src="item.headPic" alt="" class="headPic">
                                        <div class="desc noWidth">
                                            <p class="nickName dottline">{{item.nickname}}</p>
                                            <p class="gxian">积分：{{item.score}}</p>
                                        </div>
                                        <div class="touPiao">
                                            <img src="https://img.hongrenshuo.com.cn/h5/findlyact-gozhichi-ymz.png" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tabCon2" v-if="tabIndex == 2">
                        <img src="https://img.hongrenshuo.com.cn/h5/findlyact-jiangli1-ymz.png" alt=""
                             class="jiangliImage">
                    </div>
                    <div class="tabCon3" v-if="tabIndex == 3">
                        <div class="loading-container" v-show="jinzhuList.length == 0 && allLoad">
                            <div>
                                <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                                     class="emptyPng">
                                <div class="emptyTips">
                                    精彩赛事尚未开始
                                </div>
                            </div>
                        </div>
                        <div v-if="jinzhuList.length == 0 && !allLoad" class="loading-container">
                            <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                                 class="huancunGif">
                        </div>
                        <div class="jinzhu" v-if="jinzhuList.length > 0">
                            <div class="jinzhuTop" v-if="myScore>0">
                                <div class="jinzhuTopIn">
                                    <div class="title">我送出的红豆数：<span>{{myScore}}</span></div>
                                    <div class="jinduLine">
                                        <div class="lineTitle">
                                            <div>200W</div>
                                            <div>500W</div>
                                            <div>700W</div>
                                            <div>1000W</div>
                                        </div>
                                        <div class="lineIn" :style="{width:`${lineInFen}%`}"></div>
                                    </div>
                                    <div class="descMoreIn">
                                        "承包池塘，养成锦鲤"本年度最豪华福利礼包开启啦~您在"年度"活动期间为您喜欢的主播加油助力，您送出每个礼物都会为自己积累福气值
                                    </div>
                                    <div class="seeMore" @click="goDetailJinli">
                                        查看详情
                                    </div>
                                </div>
                            </div>
                            <div class="threeMan">
                                <div class="manOut" v-for="(item,index) in jinzhuList" :class="`manOut${index+1}`"
                                     v-if="index<3" @click="goRoom(item.roomId,item.uid)">
                                    <div class="man">
                                        <img src="https://img.hongrenshuo.com.cn/h5/findlyact-yuanzhu-ymz.png" alt=""
                                             class="yuanzhu yuanzhu1">
                                        <img src="https://img.hongrenshuo.com.cn/h5/findlyact-yuanzhu-ymz.png" alt=""
                                             class="yuanzhu yuanzhu2">
                                        <img :src="`https://img.hongrenshuo.com.cn/h5/findlyact-xieguan${index+1}-ymz.png`"
                                             alt="" class="guan">
                                        <img :src="item.headPic" alt="" class="headerPP">
                                    </div>
                                    <div class="nickName dottline">{{item.nickname}}</div>
                                    <div class="gongxian">贡献：{{item.score}}红豆</div>
                                </div>
                            </div>
                            <div class="jinzhuContent">
                                <div class="jinzhuContentLi" v-for="(item,index) in jinzhuList" v-if="index>2"
                                     @click="goRoom(item.roomId,item.uid)">
                                    <div class="num">{{index + 1}}</div>
                                    <img :src="item.headPic" alt="" class="headPic">
                                    <div class="desc">
                                        <p class="nickName dottline">{{item.nickname}}</p>
                                        <p class="gxian">贡献：{{item.score}}红豆</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tabCon4" v-if="tabIndex == 4">
                        <div class="loading-container" v-show="jiazuList.length == 0 && allLoad">
                            <div>
                                <img src="https://img.hongrenshuo.com.cn/h5/kstar-empty-ymz.png" alt=""
                                     class="emptyPng">
                                <div class="emptyTips">
                                    精彩赛事尚未开始
                                </div>
                            </div>
                        </div>
                        <div v-if="jiazuList.length == 0 && !allLoad" class="loading-container">
                            <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                                 class="huancunGif">
                        </div>
                        <div class="jiazuUl" v-if="jiazuList.length > 0">
                            <div class="contentLi-jiazu" v-for="(item,index) in jiazuList" v-if="index < 3">
                                <div class="guan">
                                    <img :src="`https://img.hongrenshuo.com.cn/h5/kstar-guan${index+1}-ymz.png`">
                                </div>
                                <div class="zuTop">
                                    <div class="zu">{{index + 1}}</div>
                                    <div class="starsNum">
                                        荣耀家族
                                    </div>
                                </div>
                                <div class="zuContent">
                                    <div class="zuContentOne">
                                        <div class="headpic">
                                            <img :src="item.familyPic">
                                        </div>
                                        <div class="desc">
                                            <div class="lineName">{{item.familyName || '暂无名称'}}</div>
                                            <div class="lineDesc">家族票：{{item.score}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="contentLi-haixuan1" v-for="(item,index) in jiazuList" v-if="index > 2">
                                <div class="num">{{index + 1}}</div>
                                <div class="headPic">
                                    <img :src="item.familyPic">
                                </div>
                                <div class="descContent">
                                    <div class="lineName">{{item.familyName || '暂无名称'}}</div>
                                    <div class="lineDesc">家族票：{{item.score}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page" v-if="page == 'rongyu'" :style="{backgroundColor:backColor}">
                <div class="goHomeOut" @click="goHomeClick">
                    <img src="https://img.hongrenshuo.com.cn/h5/findlyact-gohome-ymz.png" alt="">
                </div>
                <div class="tablist tablistRongyu">
                    <div class="tab" :class="rongyuTabIndex == 0?'tabActive':''" @click="rongyuCheck(0)">CV</div>
                    <div class="tab" :class="rongyuTabIndex == 1?'tabActive':''" @click="rongyuCheck(1)">唱将</div>
                    <div class="tab" :class="rongyuTabIndex == 2?'tabActive':''" @click="rongyuCheck(2)">人气</div>
                </div>
                <div class="content">
                    <div v-if="rongyuList.length == 0" class="loading-container">
                        <img src="https://img.hongrenshuo.com.cn/h5/huancun.gif" alt=""
                             class="huancunGif">
                    </div>
                    <div class="rongyuConUl">
                        <div class="rongyuConLi" v-for="(item,index) in rongyuList">
                            <div class="lineOne">
                                <div class="nickName">
                                    <div class="nickNameIn dottline">
                                        {{item.nickname || '未知昵称'}}
                                    </div>
                                </div>
                                <div class="score">总分：{{item.totalScore}}</div>
                            </div>
                            <div class="desc">
                                <div class="num">{{index + 1}}</div>
                                <div class="headPic" @click="goRoom(item.roomId,item.uid)">
                                    <img :src="item.headPic" alt="" class="headPic">
                                </div>
                                <div class="twoScore">
                                    <p>积分：{{item.score}}</p>
                                    <p>人气票：{{item.voteNum}}</p>
                                </div>
                            </div>
                            <div class="touPiao" @click="goVote(item.uid)">
                                <img src="https://img.hongrenshuo.com.cn/h5/findlyact-gozhichi-ymz.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <ScrollUpLoading :tipDesc="tipDesc" :showload="showload" :color="'#fff'"
                                     v-show="rongyuList.length != 0"></ScrollUpLoading>
                </div>
            </div>
            <div class="bottomDesc" v-html="copywriter" v-if="copywriter != ''">

            </div>
        </div>
    </div>
</template>

<script>
    import Toast from 'assets/js/toast'
    import {ymzBaseFun, na} from 'assets/js/common'
    import ScrollUpLoading from 'components/baseymz/ScrollUpLoading'
    import Onepic from 'components/baseymz/Onepic'
    let shareTitle = '克拉克拉2018嘉年华';
    let shareDesc = '克拉克拉2018嘉年华隆重开启，千万红豆福利 为王加冕 共享年度盛典';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/findlyact-wxshare-ymz.png';
    export default {
        data() {
            return {
                tabIndex: 0,
                isActive: false,
                page: 'normal',
                backTop: 'https://img.hongrenshuo.com.cn/h5/findlyact-topimage-ymz.png',
                backColor: '#241249',
                saidaoIndex: 0,
                copywriter: '',
                //报名
                track: 0,
                trackName: '',
//                荣誉
                rongyuTabIndex: 0,
                rongyuPage: 1,
                rongyuList: [],
                showload: true,
                algoBottom: false,
                tipDesc: '上滑加载更多...',
//                家族
                jiazuList: [],
//                金主
                jinzhuList: [],
                myScore: '',
                swiperOption: {
                    speed: 1000, //切换速度，即slider自动滑动开始到结束的时间（单位ms）
                    loop: false, //循环切换
                    pagination: {
                        el: '.swiper-pagination',
                        // type : 'progressbar', //分页器形状
                        clickable: true, //点击分页器的指示点分页器会控制Swiper切换
                        notNextTick: true,
                    }
                },
//                主要赛道
                type: 1,
                time: 1,
                tabLeftTips: '年度预选',
                zhuData: '',
                allLoad: false,
                lineInFen: 0,
                anchorInfo: '',
                zhuDataList: [],
                anchorUid: '',
                jieduan:3,
                lineWidth:'70%',
                lineWidth1:'0%'
            }
        },
        watch: {
            track(newName, oldName) {
                if (newName == 1) {
                    this.trackName = 'CV';
                } else if (newName == 2) {
                    this.trackName = '唱将';
                } else if (newName == 3) {
                    this.trackName = '人气';
                } else if (newName == 4) {
                    this.trackName = '萌新';
                }
            },
            type(newName, oldName) {
                if (newName == 1) {
                    this.tabLeftTips = '年度预选';
                } else if (newName == 2) {
                    this.tabLeftTips = '百团大战';
                } else if (newName == 3) {
                    this.tabLeftTips = '分队竞技';
                } else if (newName == 4) {
                    this.tabLeftTips = '荣耀决斗';
                } else if (newName == 5) {
                    this.tabLeftTips = '复活之光';
                } else if (newName == 6) {
                    this.tabLeftTips = '巅峰对决';
                } else if (newName == 7) {
                    this.tabLeftTips = '王的诞生';
                }
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
            this.page = ymzBaseFun.getUrlString('page');
            this.tabIndex = ymzBaseFun.getUrlString('tabindex') || '0';
            this.anchorUid = ymzBaseFun.getUrlString('anchorUid');
            if (this.page == 'rongyu') {
                this.backTop = 'https://img.hongrenshuo.com.cn/h5/findlyact-rongyutopimage-ymz.png';
                this.backColor = '#131b62';
                this.rongyuGetData();
                window.addEventListener('scroll', this._getBottom, false);
            } else {
                this.checkTab(this.tabIndex);
            }
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('scroll', this.handleScroll);
            });
        },
        methods: {
            getJieduan:function () {
                let nowTime = Date.parse(new Date()) / 1000;
//                nowTime = 1545985051;
                let time1 = 1545580800; //12月24号0点
                let time2 = 1545840000; //12月27号0点
                let time3 = 1545926400; //12月28号0点
                let time4 = 1546012800; //12月29号0点
                let time5 = 1546099200; //12月30号0点
                if(nowTime<time1){
                    this.jieduan = 3;
                }else if (nowTime <= time2 && nowTime > time1) {
                    this.jieduan = 4;
                    this.lineWidth = '100%';
                }else if (nowTime <= time3 && nowTime > time2) {
                    this.jieduan = 5;
                    this.lineWidth = '100%';
                }else if (nowTime <= time4 && nowTime > time3) {
                    this.jieduan = 6;
                    this.lineWidth = '100%';
                    this.lineWidth1 = '32%';
                }else if (nowTime <= time5 && nowTime > time4) {
                    this.jieduan = 7;
                    this.lineWidth = '100%';
                    this.lineWidth1 = '60%';
                }else if (nowTime > time5) { //百团大战
                    this.jieduan = 8;
                    this.lineWidth = '100%';
                    this.lineWidth1 = '100%';
                }
            },
            getNowType: function () {
                let nowTime = Date.parse(new Date()) / 1000;
                let time1 = 1545062400; //12月18号0点
                let time2 = 1545321600; //12月21号0点
                let time3 = 1545580800; //12月24号0点
                let time4 = 1545840000; //12月27号0点
                let time5 = 1545926400; //12月28号0点
                let time6 = 1546012800; //12月29号0点
                let time7 = 1546099200; //12月30号0点


                if (nowTime < time2) { //年度海选
                    this.type = 1;
                } else if (nowTime <= time3 && nowTime > time2) { //百团大战
                    this.type = 2;
                } else if (nowTime <= time4 && nowTime > time3) {  //分队竞技
                    this.type = 3;
                } else if (nowTime <= time5 && nowTime > time4) { //荣耀决斗
                    this.type = 4;
                    this.$nextTick(() => {
                        this.$refs.sliderGroup.scrollLeft = 400;
                    })
                } else if (nowTime <= time6 && nowTime > time5) {  //复活之光
                    this.type = 5;
                    this.$nextTick(() => {
                        this.$refs.sliderGroup.scrollLeft = 400;
                    })
                } else if (nowTime <= time7 && nowTime > time6) {   //巅峰对决
                    this.$nextTick(() => {
                        this.$refs.sliderGroup.scrollLeft = 400;
                    })
                    this.type = 6;
                } else {
                    this.type = 7;   // 王的诞生
                    this.$nextTick(() => {
                        this.$refs.sliderGroup.scrollLeft = 400;
                    })
                }
            },
            goRule: function () {
                window.location.href = '/Viewsh5rule/fidllyrule?showshare=1';
            },
            goMx:function () {
                window.location.href = '/yearActions/yearActionMxIndex?showshare=1';
            },
            goDetail: function () {
                window.location.href = '/Viewsh5rule/saidaodetail?showshare=1';
            },
            goDetailJinli: function () {
                window.location.href = '/Viewsh5rule/jinlidetail?showshare=1';
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
            handleScroll: function () {
                this.scrollTop = this.scrollTop = window.pageYOffset || document.body.scrollTop
                if (this.scrollTop > 400) {
                    this.isActive = true
                } else {
                    this.isActive = false
                }
            },
            getleizhu(index) {
                if (index == 0) {
                    return '18点擂主'
                } else if (index == 1) {
                    return '20点擂主'
                } else if (index == 2) {
                    return '22点擂主'
                } else if (index == 3) {
                    return '23点擂主'
                }
            },
            goSaidao: function () {
                window.location.href = '/yearActions/yearActionIndex?showshare=1&page=rongyu';
            },
            goDeepLink: function (url) {
                if (na.match(/micromessenger/i) && na.match(/(iphone|ipod|ios|ipad)/i)) {
                    this.$wxContent();
                } else {
                    var data = {};
                    data.stage = 'jianian'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
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
            },
            goRoom: function (roomid, uid) {
                if (!uid) {
                    return
                }
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
            goApp: function () {
                this.goDeepLink('https%3A%2F%2Flive.hongdoulive.com%2FyearActions%2FyearActionMxIndex%3Fshowshare%3D1');

            },
            checkTab: function (tabIndex) {
                this.tabIndex = tabIndex;
                this.allLoad = false;
                this.anchorInfo = '';
                this.copywriter = '';
                if (this.tabIndex == 4) {
                    this.getjiaZuData();
                } else if (this.tabIndex == 3) {
                    this.getjinZhu();
                } else if (this.tabIndex == 1) {
                    this.getNowType();
                    this.zhugetData();
                } else if (this.tabIndex == 0) {
                    this.getJieduan();
                    this.getBaomingStatus();
                }
                if (this.tabIndex == 3) {
                    this.backTop = 'https://img.hongrenshuo.com.cn/h5/findlyact-jinlitopimage-ymz.png';
                    this.backColor = '#360b34';
                } else {
                    this.backTop = 'https://img.hongrenshuo.com.cn/h5/findlyact-topimage-ymz.png';
                    this.backColor = '#241249';
                }
            },
            /**
             * 主赛道
             */
            checkTuanTime: function (index) {
                this.time = index;
                this.zhuData = '';
                this.allLoad = false;
                this.zhugetData();
            },
            zhugetData: function () {
                this.$axios.HttpGet('/yearActions/yearActionList', {
                    period: this.type,
                    day: this.time,
                    anchorUid: this.anchorUid
                })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.code == 200) {
                            this.zhuData = res.data.data;
                            this.zhuDataList = res.data.data.list;
                            this.copywriter = res.data.data.copywriter;
                            this.allLoad = true;
                            if (res.data.data.anchorInfo) {
                                this.anchorInfo = res.data.data.anchorInfo;
                            }

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
                            message: '网络错误',
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
            checkTabXuan: function (index) {
                if (index == this.type) {
                    return
                } else {
                    this.type = index
                }
//                选择七个tab钟的前两个  改变时间
                if (this.type == 3 || this.type == 2) {
                    this.time = 1;
                }
                this.zhuData = '';
                this.zhuDataList = [];
                this.allLoad = false;
                this.zhugetData();
            },

            /**
             *  金主榜单
             */
            getjinZhu: function () {
                console.log(this.tabIndex)
                this.$axios.HttpGet('/yearActions/jinzhuList', {})
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.code == 200) {
                            this.jinzhuList = res.data.data.list;
                            this.copywriter = res.data.data.copywriter;
                            this.myScore = res.data.data.score;
                            this.allLoad = true;
//                            设置进度条
                            if (this.myScore < 2000000) {
                                this.lineInFen = this.myScore / 2000000 * 20;
                                if (this.lineInFen < 4) {
                                    this.lineInFen = 4;
                                }
                            } else if (this.myScore > 2000000 && this.myScore <= 5000000) {
                                this.lineInFen = 20 + (this.myScore - 2000000) / 3000000 * 20;
                            } else if (this.myScore > 5000000 && this.myScore <= 7000000) {
                                this.lineInFen = 40 + (this.myScore - 5000000) / 2000000 * 20;
                            } else if (this.myScore > 7000000 && this.myScore <= 10000000) {
                                this.lineInFen = 60 + (this.myScore - 7000000) / 3000000 * 20;
                            } else {
                                this.lineInFen = 100;
                            }
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
                            message: '网络错误',
                            position: 'center',
                            duration: 1500
                        })
                    })
            },

            /**
             *  家族榜单
             */
            getjiaZuData: function () {
                this.$axios.HttpGet('/yearActions/familyList', {})
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.code == 200) {
                            this.jiazuList = res.data.data;
                            this.allLoad = true;
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
                            message: '网络错误',
                            position: 'center',
                            duration: 1500
                        })
                    })
            },

            /**
             * 报名逻辑
             */
//            报名
            checkSaidao: function (index) {
                if (this.saidaoIndex == index) {
                    return
                } else {
                    this.saidaoIndex = index
                }
            },
//            报名展示状态
            getBaomingStatus: function () {
                this.$axios.HttpGet('/yearActions/getApplyInfo', {})
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.code == 200) {
                            if (res.data.data.code == 200) {
                                this.track = res.data.data.data.track;
                            }

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
                            message: '网络错误',
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
//            确认加入赛道
            sureGoSaidao: function () {
                if (!na.match(/hongdoulive/i)) {
                    this.goApp();
                } else {
                    this.$axios.HttpGet('/yearActions/doApply', {
                        type: this.saidaoIndex + 1
                    })
                        .then((res) => {
                            if (res.data.code == 200) {
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
                        .catch(() => {
                            Toast({
                                message: '网络错误',
                                position: 'center',
                                duration: 1500
                            })
                        })
                }
            },
            /**
             * 荣誉赛道逻辑
             */
            rongyuCheck: function (rongyuTabIndex) {
                this.rongyuTabIndex = rongyuTabIndex;
                this.rongyuPage = 1;
                this.algoBottom = false;
                this.rongyuList = [];
                this.rongyuGetData();
            },
            goHomeClick: function () {
                window.location.href = '/yearActions/yearActionIndex?showshare=1';
            },
            rongyuGetData: function () {
                this.$axios.HttpGet('/yearActions/honorList', {
                    type: this.rongyuTabIndex + 1,
                    pageNo: this.rongyuPage
                })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.code == 200) {
                            if (res.data.data.list.length < 20) {
                                this.$nextTick(function () {
                                    this.showload = false;
                                    this.tipDesc = '没有更多...';
                                });
                            }
                            this.algoBottom = true;
                            this.copywriter = res.data.data.copywriter;
                            this.rongyuList = this.rongyuList.concat(res.data.data.list);
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
                            message: '网络错误',
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
            _getBottom() {
                if (ymzBaseFun.aleadyBottom() && this.algoBottom) {
                    this.rongyuPage++;
                    this.tipDesc = '上滑加载更多...';
                    this.showload = true;
                    this.rongyuGetData();
                }
            },
            goVote: function (uid, typeFun) {
                if (!na.match(/hongdoulive/i)) {
                    this.goApp();
                    return
                }
                this.$axios.HttpGet('/yearActions/honorVote', {
                    voteUid: uid
                })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.code == 200) {
                            Toast({
                                message: res.data.data.msg,
                                position: 'center',
                                duration: 1500
                            })
                            if (res.data.data.code == 200) {
                                if (typeFun == 1) {
                                    this.zhuData = '';
                                    this.zhuDataList = [];
                                    this.allLoad = false;
                                    this.zhugetData();
                                } else {
                                    this.rongyuPage = 1;
                                    this.rongyuList = [];
                                    this.rongyuGetData();
                                }
                            }
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
                            message: '网络错误',
                            position: 'center',
                            duration: 1500
                        })
                    })
            },
        },
        components: {
            ScrollUpLoading,
            Onepic,
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll)
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        .ruleIcon {
            position: absolute;
            width: 90px;
            height: 90px;
            top: 763px;
            right: 26px;
        }
        .mxIcon{
            left: 26px;
        }
        img {
            width: 100%;
            height: auto;
        }
        .goTop {
            width: 100px;
            height: 100px;
            position: fixed;
            bottom: 90px;
            right: 12px;
            z-index: 500;
        }
        .container-bottom {
            padding-bottom: 110px;
        }
        .container {
            .topImage {
                width: 100%;
                height: 918px;
            }
            .bottomDesc {
                width: 100%;
                height: 110px;
                background: url("https://img.hongrenshuo.com.cn/h5/findlyact-bottomDesc-ymz.png") no-repeat center;
                background-size: 100% 100%;
                text-align: center;
                line-height: 110px;
                font-size: 28px;
                position: fixed;
                left: 0;
                bottom: 0;
                color: #ac8b23;
                font-weight: 400;
                z-index: 300;
            }
            .page {
                position: relative;
                margin-top: -2px;
                .goHomeOut {
                    position: absolute;
                    right: 30px;
                    top: -40px;
                    width: 90px;
                    height: 90px;
                    z-index: 200;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .loading-container {
                width: 100%;
                height: 600px;
                display: flex;
                align-items: center;
                justify-content: center;
                .huancunGif {
                    width: 60px;
                    height: 60px;
                }
                .emptyPng {
                    width: 262px;
                    height: 224px;
                }
                .emptyTips {
                    text-align: center;
                    line-height: 80px;
                }
            }
            .tablist {
                display: flex;
                align-items: flex-end;
                justify-content: space-around;
                padding: 0 10px;
                box-sizing: border-box;
                border-bottom: 1px solid #7c81f9;
                width: 100%;
                height: 220px;
                background: url("https://img.hongrenshuo.com.cn/h5/findlyact-tabBg-ymz.png") no-repeat center;
                background-size: 100% 100%;
                z-index: 100;
                position: relative;
                .zhiboConT {
                    width: 100%;
                    height: 221px;
                    background: url("https://img.hongrenshuo.com.cn/h5/findlyact-zhiboImage-ymz.png") no-repeat center;
                    background-size: 100% 100%;
                    position: absolute;
                    left: 0;
                    top: -85px;
                    .zhiboConIn {
                        position: relative;
                        color: #fff;
                        font-size: 26px;
                        .topLine {
                            display: flex;
                            height: 60px;
                            align-items: center;
                            .type {
                                width: 160px;
                                text-align: center;
                            }
                            .nickName {
                                width: 220px;
                                margin-left: 27px;
                                text-align: center;
                            }
                            .fenshuo {
                                width: 300px;
                                margin-left: 27px;
                                text-align: center;
                            }
                        }
                        .desc {
                            display: flex;
                            align-items: center;
                            height: 160px;
                            justify-content: space-between;
                            .descLeft {
                                display: flex;
                                align-items: center;
                                .headPic {
                                    width: 116px;
                                    height: 116px;
                                    border-radius: 50%;
                                    margin-left: 50px;
                                }
                                .descline {
                                    margin-left: 36px;
                                    line-height: 44px;
                                }
                            }
                            .gopiao {
                                width: 233px;
                                height: 74px;
                                img {
                                    width: 100%;
                                    height: auto;
                                }
                            }
                        }
                    }
                }
                .tab {
                    width: 131px;
                    height: 84px;
                    background: url("https://img.hongrenshuo.com.cn/h5/findlyact-tabnormal-ymz.png") no-repeat center;
                    background-size: 100% 100%;
                    text-align: center;
                    line-height: 84px;
                    font-size: 30px;
                    color: #fff;
                }
                .tabActive {
                    background: url("https://img.hongrenshuo.com.cn/h5/findlyact-tabactive-ymz.png") no-repeat center;
                    background-size: 100% 100%;
                    color: #4c380a;
                }
            }
            .tablistRongyu {
                padding: 0 80px;
                box-sizing: border-box;
            }
            .content {
                background: #383fac;
                padding-bottom: 40px;
                .tabCon0 {
                    .wanfa {
                        padding-top: 90px;
                        padding-bottom: 90px;
                        .jindu {
                            width: 628px;
                            height: 200px;
                            border: 3px solid #fff;
                            border-left: 0;
                            border-radius: 0 30px 30px 0;
                            margin: 0 auto;
                            position: relative;
                            .yellowJinTop {
                                position: absolute;
                                width: 556px;
                                height: 3px;
                                top: -3px;
                                left: 0;
                                background: #fff;
                                .yellowJinTopIn {
                                    height: 100%;
                                    background: yellow;
                                }
                            }
                            .yellowJinBottom{
                                position: absolute;
                                width: 556px;
                                height: 3px;
                                bottom: -3px;
                                left: 0;
                                background: #fff;
                                display: flex;
                                align-items: center;
                                justify-content: flex-end;
                                .yellowJinBottomIn {
                                    height: 100%;
                                    background: yellow;
                                }
                            }
                            .yellowJinTopRight {
                                position: absolute;
                                right: -3px;
                                top: -3px;
                                width: 88px;
                                height: 200px;
                                border-radius: 0 30px 30px 0;
                                border: 3px solid yellow;
                                border-left: none;
                            }
                            .jinduLi {
                                position: absolute;
                                color: #fff;
                                font-size: 24px;
                                text-align: center;
                                .yuan {
                                    width: 26px;
                                    height: 26px;
                                    border-radius: 50%;
                                    background: #fff;
                                    margin: 12px auto;
                                }
                                .star {
                                    width: 38px;
                                    height: 38px;
                                    margin: 1px auto 10px;
                                }
                                .name {
                                    font-size: 28px;
                                }
                            }
                            .jinduLi1 {
                                left: 0;
                                top: -50px;
                            }
                            .jinduLi2 {
                                left: 160px;
                                top: -50px;
                            }
                            .jinduLi3 {
                                left: 320px;
                                top: -50px;
                            }
                            .jinduLi4 {
                                left: 480px;
                                top: -50px;
                            }
                            .jinduLi5 {
                                right: 28px;
                                bottom: -50px;
                            }
                            .jinduLi6 {
                                right: 188px;
                                bottom: -50px;
                            }
                            .jinduLi7 {
                                right: 348px;
                                bottom: -50px;
                            }
                            .jinduLi8 {
                                right: 508px;
                                bottom: -50px;
                            }
                        }
                    }
                    .baoming {
                        width: 100%;
                        .baomingImage {
                            width: 100%;
                            height: auto;
                        }
                        .baoming-title {
                            width: 702px;
                            height: 85px;
                            margin: 0 auto;
                        }
                        .baomingCon {
                            width: 702px;
                            box-sizing: border-box;
                            border: 1px solid #8ef7f7;
                            border-top: none;
                            margin: -20px auto 0;
                            padding: 15px 6px;

                            .bmConIn {
                                width: 100%;
                                height: 100%;
                                background: #2e35a0;
                                padding: 30px 20px;
                                box-sizing: border-box;
                                .desc {
                                    line-height: 40px;
                                    font-size: 26px;
                                    span {
                                        color: #8ef7f7;
                                        font-style: italic;
                                    }
                                }

                                .btnOut {
                                    width: 100%;
                                    margin-top: 70px;
                                    .title {
                                        text-align: center;
                                        font-size: 24px;
                                        color: #acaed3;
                                        margin-bottom: 15px;
                                    }
                                    .btnflex {
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                        padding: 0 50px;
                                        box-sizing: border-box;
                                        .btn {
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            width: 118px;
                                            height: 118px;
                                            border-radius: 50%;
                                            border: 1px solid #191642;
                                            background: #9096f2;
                                            color: #fff;
                                            font-size: 30px;
                                        }
                                        .btnActive {
                                            background: #f3dc20;
                                            border: 2px solid #fff;
                                            color: #4c380a;
                                        }
                                    }
                                    .btnflex1 {
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        .btnBao {
                                            width: 229px;
                                            height: 229px;
                                            background: url("https://img.hongrenshuo.com.cn/h5/findlyact-btnBao-ymz.png") no-repeat center;
                                            background-size: 100%;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            font-size: 28px;
                                            color: #4c380a;
                                        }
                                    }
                                    .sureBtn {
                                        width: 346px;
                                        height: 74px;
                                        text-align: center;
                                        line-height: 74px;
                                        background: url("https://img.hongrenshuo.com.cn/h5/findlyact-wanfaBtnBg-ymz.png") no-repeat center;
                                        background-size: 100%;
                                        margin: 50px auto 20px;
                                        font-size: 30px;
                                        color: #4c380a;
                                        font-weight: 400;
                                    }
                                }
                            }
                        }
                    }
                    .baoming2 {
                        margin-top: 50px;
                    }
                }
                .tabCon1 {
                    .slider-groupOut {
                        height: 128px;
                        overflow: hidden;
                        .slider-group {
                            width: 100%;
                            height: 110%;
                            overflow-x: scroll;
                            overflow-y: hidden;
                            -webkit-overflow-scrolling: touch;
                            float: left;
                            white-space: nowrap;
                            margin-top: 23px;
                            .titleLi {
                                width: 175px;
                                height: 58px;
                                background: url("https://img.hongrenshuo.com.cn/h5/findlyact-jiantounor-ymz.png") no-repeat center;
                                background-size: 100% 100%;
                                position: relative;
                                color: #232b9c;
                                display: inline-block;
                                margin-left: -25px;
                                text-align: center;
                                line-height: 58px;
                                box-sizing: border-box;
                                font-size: 26px;
                                font-weight: 400;
                                &:nth-child(1) {
                                    margin-left: 0;
                                }
                                &.active-titleLi {
                                    color: #fff;
                                    background: url("https://img.hongrenshuo.com.cn/h5/findlyact-jiantouactive-ymz.png?v=1") no-repeat center;
                                    background-size: 100% 100%;
                                }
                            }
                        }
                        .slider-group::-webkit-scrollbar {
                            display: none
                        }
                    }
                    .titleBtn {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 26px;
                        box-sizing: border-box;
                        font-size: 32px;
                        color: #fff;
                        .titleBtnLeft {
                            display: flex;
                            align-items: center;
                            .jinjinum {
                                font-size: 24px;
                            }
                            .title-right {
                                color: #ffffff;
                                display: flex;
                                align-items: center;
                                margin-left: 50px;
                                .dot {
                                    width: 10px;
                                    height: 10px;
                                    border-radius: 50%;
                                    background: #ffffff;
                                    margin: 0 10px;
                                }
                                .one {
                                    position: relative;
                                    .inline {
                                        position: absolute;
                                        width: 30px;
                                        height: 6px;
                                        border-radius: 4px;
                                        background: #fe5c62;
                                        bottom: -10PX;
                                        left: 50%;
                                        margin-left: -12px;
                                    }
                                }
                                .title-right-active {
                                    color: #fe5c62;
                                }
                            }
                        }
                        .titleBtnRight {
                            display: flex;
                            align-items: center;
                            img {
                                width: 15px;
                                height: 25px;
                                margin-left: 6px;
                                display: block;
                            }
                        }
                    }
                    .titleBtnLine {
                        width: 700px;
                        height: 15px;
                        margin: 6px auto 0;
                    }
                    .swiperOut {
                        margin-top: 50px;
                        .swiper-slide {
                            width: 100%;
                            .cardslide {
                                width: 715px;
                                height: 410px;
                                background: url("https://img.hongrenshuo.com.cn/h5/findlyact-nianduBg-ymz.png") no-repeat center;
                                background-size: 100%;
                                margin: 0 auto;
                                .titleTop {
                                    width: 100%;
                                    height: 66px;
                                    display: flex;
                                    align-items: center;
                                    .titleLeft, .titleRight {
                                        flex: 1;
                                        text-align: center;
                                        font-size: 26px;
                                    }
                                    .titleLeft {
                                        color: #2e35a0;
                                        font-weight: 400;
                                    }
                                    .titleRight {
                                        color: #fff;
                                        span {
                                            color: #fee04a;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .noWidth {
                        width: 300px;
                    }
                    .leizhuList {
                        padding: 40px 25px 0;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: space-between;
                        .leizhu {
                            text-align: center;
                            width: 200px;
                            .leizhuTime {
                                width: 120px;
                                height: 50px;
                                text-align: center;
                                line-height: 50px;
                                font-size: 24px;
                                color: #151c8e;
                                background: #a6a9fc;
                                border: 1px solid #ace7fb;
                                border-radius: 10px;
                                margin: 0 auto;
                                font-weight: 400;
                            }
                            .leizhuImage {
                                width: 118px;
                                height: 118px;
                                border-radius: 50%;
                                border: 1px solid #744549;
                                margin: 10px auto;
                            }
                            .leizhuNick {
                                color: #fff;
                                font-size: 26px;
                            }
                        }
                    }
                    .tuan {
                        padding-top: 40px;
                    }
                    .tuanContent {
                        display: flex;
                        flex-wrap: wrap;
                        padding: 16px 0 0;
                        box-sizing: border-box;
                        .tuanLi {
                            margin-top: 30px;
                            width: 186px;
                            .man {
                                margin: 0 auto;
                                position: relative;
                                width: 130px;
                                height: 130px;
                                background: url("https://img.hongrenshuo.com.cn/h5/findlyact-headPicBg-ymz.png") no-repeat center;
                                background-size: 100% 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                .headerPP {
                                    width: 120px;
                                    height: 120px;
                                    background: #fff;
                                    border-radius: 50%;
                                }
                                .guan {
                                    position: absolute;
                                    width: 53px;
                                    height: 53px;
                                    right: -12px;
                                    top: -16px;
                                }
                                .yuanzhu {
                                    position: absolute;
                                    width: 17px;
                                    height: 42px;
                                }
                                .yuanzhu1 {
                                    left: -7px;
                                    top: 50%;
                                    margin-top: -21px;
                                }
                                .yuanzhu2 {
                                    right: -7px;
                                    top: 50%;
                                    margin-top: -21px;
                                }
                            }
                            .nickName {
                                text-align: center;
                                font-size: 26px;
                                color: #fff;
                                margin: 10px auto;
                            }
                            .gongxian {
                                text-align: center;
                                font-size: 24px;
                                color: #d8be47;
                            }
                        }
                    }
                    .touPiao {
                        width: 233px;
                        height: 74px;
                        position: absolute;
                        right: -36px;
                        top: 40px;
                        img {
                            width: 100%;
                            height: 100%;
                            z-index: 100;
                        }
                    }
                    .juedou {
                        padding-top: 40px;
                    }
                    .fuhuo {
                        padding-top: 40px;
                        .fenzuLine {
                            color: #fff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 50px auto;
                            font-size: 30px;
                        }
                    }
                    .wang {
                        padding-top: 40px;
                    }
                    .juedouTitleOut {
                        width: 715px;
                        height: 410px;
                        background: url("https://img.hongrenshuo.com.cn/h5/findlyact-juedouTitle-ymz.png") no-repeat center;
                        background-size: 100%;
                        margin: 0 auto;
                        .juedouTitle {
                            text-align: center;
                            color: #fff;
                            font-size: 26px;
                            line-height: 64px;
                        }
                    }
                    .content-list {
                        width: 100%;
                        padding: 0 36px;
                        box-sizing: border-box;
                        .loading-container {
                            width: 100%;
                            height: 300px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .huancunGif {
                                width: 80px;
                                height: 80px;
                            }
                            .emptyPng {
                                width: 262px;
                                height: 224px;
                            }
                            .emptyTips {
                                text-align: center;
                                line-height: 80px;
                                font-size: 28px;
                            }
                        }
                        .content-chusai {
                            .contentLi-chusai {
                                display: flex;
                                margin-top: 36px;
                                .contentLi-chusai-Bg {
                                    width: 282px;
                                    height: 428px;
                                    background: url("https://img.hongrenshuo.com.cn/h5/findlyact-leftbgImage-ymz.png") no-repeat center;
                                    background-size: 100% 100%;
                                    position: relative;
                                    .victoryLeft, .victoryRight {
                                        position: absolute;
                                        right: 4px;
                                        top: 4px;
                                        width: 145px;
                                        height: 145px;
                                        img {
                                            width: 100%;
                                            height: auto;
                                        }
                                    }
                                    .victoryRight {
                                        left: 4px;
                                    }
                                    .contentLi-chusai-in {
                                        color: #fff;
                                        width: 100%;
                                        height: 100%;
                                        .nickName {
                                            width: 240px;
                                            text-align: center;
                                            font-size: 28px;
                                            line-height: 60px;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                            margin: 0 auto;
                                        }
                                        .headPic {
                                            width: 180px;
                                            height: 180px;
                                            margin: 10px auto;
                                            img {
                                                width: 100%;
                                                height: auto;
                                            }
                                        }
                                        .desc {
                                            padding: 0 16px;
                                            box-sizing: border-box;
                                            font-size: 24px;
                                            line-height: 30px;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            display: -webkit-box;
                                            -webkit-box-orient: vertical;
                                            -webkit-line-clamp: 2;
                                            text-align: center;
                                            height: 58px;
                                        }
                                        .starNum {
                                            color: #fff95f;
                                            font-size: 24px;
                                            line-height: 36px;
                                            text-align: center;
                                            margin-top: 8px;
                                        }
                                    }
                                }
                                .bgRight {
                                    background: url("https://img.hongrenshuo.com.cn/h5/findlyact-leftbgImage-ymz.png") no-repeat center;
                                    background-size: 100% 100%;
                                }
                                .contentLi-chusai-middle {
                                    text-align: center;
                                    padding-top: 120px;
                                    box-sizing: border-box;
                                    .vs {
                                        width: 118px;
                                        height: 100px;
                                        img {
                                            width: 100%;
                                            height: auto;
                                        }
                                    }
                                    .chusai-day {
                                        margin: 60px auto 10px;
                                        color: #fff;
                                        font-size: 34px;
                                        font-weight: 500;
                                    }
                                    .chusai-time {
                                        font-size: 32px;
                                        color: #fdff70;

                                    }
                                }
                            }
                        }
                    }
                }
                .tabCon2 {
                    .jiangliImage {
                        width: 100%;
                        height: auto;
                    }
                }
                .tabCon3 {
                    .jinzhu {
                        padding: 40px 0 0;
                        box-sizing: border-box;
                        .jinzhuTop {
                            width: 710px;
                            margin: 0 auto;
                            background: #2e35a0;
                            padding: 5px 10px;
                            box-sizing: border-box;
                            .jinzhuTopIn {
                                width: 100%;
                                border: 1px solid #8ef7f7;
                                padding-bottom: 40px;
                                box-sizing: border-box;
                                .title {
                                    font-size: 26px;
                                    text-align: center;
                                    padding: 15px;
                                    box-sizing: border-box;
                                    color: #fff;
                                    border: 1px solid #8ef7f7;
                                    border-top: 0;
                                    font-weight: 300;
                                    margin: 0 auto;
                                    display: flex;
                                    justify-content: center;
                                    span {
                                        color: #d4bd65;
                                    }
                                }
                                .jinduLine {
                                    width: 649px;
                                    height: 31px;
                                    margin: 100px auto 50px;
                                    background: url("https://img.hongrenshuo.com.cn/h5/findlyact-jinduLine-ymz.png") no-repeat center;
                                    background-size: 100% 100%;
                                    position: relative;
                                    .lineTitle {
                                        position: absolute;
                                        width: 100%;
                                        left: 0;
                                        top: -55px;
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-around;
                                        color: #fff;
                                        font-size: 24px;
                                        padding: 0 66px;
                                        box-sizing: border-box;
                                    }
                                    .lineIn {
                                        /*width: 100%;*/
                                        background: #f3dc20;
                                        height: 22px;
                                        border-radius: 20px;
                                        position: absolute;
                                        bottom: 1px;
                                        left: 1px;
                                    }
                                }
                                .descMoreIn {
                                    font-size: 24px;
                                    color: #fff;
                                    line-height: 40px;
                                    padding: 0 30px;
                                    box-sizing: border-box;
                                }
                            }
                        }
                    }
                }
                .tabCon4 {
                    .jiazuUl {
                        padding-top: 30px;
                        box-sizing: border-box;
                        .contentLi-jiazu {
                            width: 679px;
                            height: 264px;
                            background: url("https://img.hongrenshuo.com.cn/h5/findlyact-jiazumore-ymz.png") no-repeat center;
                            background-size: 100% 100%;
                            margin: 20px auto 0;
                            position: relative;
                            .jinji {
                                width: 146px;
                                height: 144px;
                                position: absolute;
                                right: -10px;
                                top: -8px;
                            }
                            .zuTop {
                                display: flex;
                                align-items: center;
                                height: 70px;
                                .zu {
                                    font-size: 32px;
                                    color: #fff;
                                    letter-spacing: 2px;
                                    font-weight: 400;
                                    width: 160px;
                                    text-align: center;
                                }
                                .starsNum {
                                    width: 388px;
                                    text-align: center;
                                    color: #fdec99;
                                    font-size: 28px;
                                    font-weight: 400;
                                }
                            }
                            .zuContent {
                                .zuContentOne {
                                    display: flex;
                                    align-items: center;
                                    margin-top: 30px;
                                    .headpic {
                                        width: 114px;
                                        height: 114px;
                                        margin-left: 47px;
                                    }
                                    .desc {
                                        margin-left: 20px;
                                        box-sizing: border-box;
                                        width: 480px;
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                        .lineName {
                                            line-height: 40px;
                                            font-weight: 400;
                                            font-size: 32px;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                        }
                                        .lineDesc {
                                            font-size: 24px;
                                            color: #f9dcb4;
                                            line-height: 44px;
                                            font-weight: 400;
                                        }
                                        .starNum {
                                            color: #fff95f;
                                            font-size: 24px;
                                            line-height: 32px;
                                            font-weight: 300;
                                        }
                                    }

                                }
                            }
                            .guan {
                                position: absolute;
                                width: 60px;
                                height: 60px;
                                right: 12px;
                                top: 12px;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                        .contentLi-haixuan1 {
                            width: 677px;
                            height: 147px;
                            background: url("https://img.hongrenshuo.com.cn/h5/findlyact-jiazumore1-ymz.png") no-repeat center;
                            background-size: 100% 100%;
                            display: flex;
                            align-items: center;
                            color: #fff;
                            font-weight: 400;
                            font-size: 30px;
                            position: relative;
                            margin: 20px auto 0;
                            .victory {
                                width: 90px;
                                height: 84px;
                                position: absolute;
                                right: 0px;
                                top: 0px;
                            }

                            .num {
                                width: 70px;
                                text-align: center;
                            }
                            .headPic {
                                width: 120px;
                                height: 120px;
                                img {
                                    width: 100%;
                                    height: auto;
                                }
                            }
                            .descContent {
                                width: 0;
                                padding: 10px 20px 0;
                                box-sizing: border-box;
                                flex: 1;
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                .lineName {
                                    line-height: 50px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                                .lineDesc {
                                    font-size: 24px;
                                    color: #f9dcb4;

                                }
                                .starNum {
                                    color: #fff95f;
                                    font-size: 26px;
                                    line-height: 32px;
                                    font-weight: 300;
                                }
                            }
                        }
                    }
                }

                /*公用样式*/
                .jinzhuContent {
                    margin-top: 30px;
                    .jinzhuContentLi {
                        width: 674px;
                        height: 140px;
                        border: 1px solid #8ef7f7;
                        box-shadow: 0px 5px 3px 0px rgba(6, 10, 72, 0.73);
                        border-radius: 5px;
                        background-color: rgba(46, 53, 160, 0.702);
                        margin: 20px auto 0;
                        display: flex;
                        align-items: center;
                        color: #fff;
                        font-size: 28px;
                        font-weight: 400;
                        position: relative;
                        .num {
                            text-align: center;
                            width: 70px;
                        }
                        .headPic {
                            width: 114px;
                            height: 114px;
                            border-radius: 50%;
                            margin-right: 38px;
                        }
                        .desc {
                            line-height: 46px;
                            .gxian {
                                font-size: 26px;
                            }
                        }
                    }
                }
                .actNum {
                    color: #fcc92e;
                }
                .threeMan {
                    width: 100%;
                    height: 522px;
                    background: url("https://img.hongrenshuo.com.cn/h5/findlyact-jinzhuthreebg-ymz.png") no-repeat center;
                    background-size: 100% 100%;
                    position: relative;
                    .manOut {
                        position: absolute;
                        width: 260px;
                        .man {
                            margin: 0 auto;
                            position: relative;
                            width: 159px;
                            height: 159px;
                            background: url("https://img.hongrenshuo.com.cn/h5/findlyact-headPicBg-ymz.png") no-repeat center;
                            background-size: 100% 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .headerPP {
                                width: 146px;
                                height: 146px;
                                background: #fff;
                                border-radius: 50%;
                            }
                            .guan {
                                position: absolute;
                                width: 53px;
                                height: 53px;
                                right: -12px;
                                top: -16px;
                            }
                            .yuanzhu {
                                position: absolute;
                                width: 17px;
                                height: 42px;
                            }
                            .yuanzhu1 {
                                left: -7px;
                                top: 50%;
                                margin-top: -21px;
                            }
                            .yuanzhu2 {
                                right: -7px;
                                top: 50%;
                                margin-top: -21px;
                            }
                        }
                        .nickName {
                            text-align: center;
                            font-size: 26px;
                            color: #fff;
                            margin: 10px auto;
                        }
                        .gongxian {
                            text-align: center;
                            font-size: 24px;
                            color: #d8be47;
                        }
                    }
                    .manOut1 {
                        left: 50%;
                        margin-left: -140px;
                        top: 50px;
                    }
                    .manOut2 {
                        top: 260px;
                        left: 28px;
                    }
                    .manOut3 {
                        top: 260px;
                        right: 28px;
                    }
                }
                .seeMore {
                    color: #8ef7f7;
                    font-size: 34px;
                    text-align: center;
                    margin: 30px;
                    text-decoration: underline;
                }
            }
            .rongyuConUl {
                width: 100%;
                padding: 20px 0 0 18px;
                box-sizing: border-box;
                .rongyuConLi {
                    margin-top: 24px;
                    width: 677px;
                    height: 221px;
                    background: url("https://img.hongrenshuo.com.cn/h5/findlyact-rongyubg-ymz.png") no-repeat center;
                    background-size: 100% 100%;
                    position: relative;
                    .touPiao {
                        width: 233px;
                        height: 74px;
                        position: absolute;
                        right: -40px;
                        top: 105px;
                        img {
                            width: 100%;
                            height: 100%;
                            z-index: 100;
                        }
                    }
                    .lineOne {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: 56px;
                        font-size: 30px;
                        .nickName {
                            flex: 1;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            box-sizing: border-box;
                            .nickNameIn {
                                width: 285px;
                                margin-left: 20px;
                                text-align: center;
                            }
                        }
                        .score {
                            flex: 1;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                    .desc {
                        width: 100%;
                        margin-top: 15px;
                        display: flex;
                        align-items: center;
                        color: #fff;
                        font-size: 28px;
                        .num {
                            font-weight: 400;
                            width: 60px;
                            text-align: center;
                        }
                        .headPic {
                            width: 120px;
                            height: 120px;
                            border-radius: 50%;
                        }
                        .twoScore {
                            margin-left: 18px;
                            line-height: 38px;
                        }
                    }
                }
            }
        }
    }
</style>

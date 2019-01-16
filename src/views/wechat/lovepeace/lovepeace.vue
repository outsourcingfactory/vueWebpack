<template>
    <transition name="slide">
        <div class="choucard">
            <div class="goback" @click="gobackFun" v-show="!inApp">
                <img src="https://img.hongrenshuo.com.cn/h5/loveworld-goback-ymz.png" alt="">
            </div>
            <div class="banner">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item,index) in bannerList" :key="index">
                        <img :src="item" alt="">
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div v-if="inApp">
                <div class="content">
                    <div class="wheel" :class="!showShan?'wheel-blink':''">
                        <div class="wheel-prize">
                            <canvas class="wheelcanvas" id="wheelcanvas" width="597" height="597"></canvas>
                        </div>
                        <div class="goZhuan" @click="rotateTimeOut">
                            {{userInfo.lotteryNum}}次
                        </div>
                    </div>
                    <div class="jiao">
                        <img src="https://img.hongrenshuo.com.cn/h5/loveworld-jiao-ymz.png" alt="">
                    </div>
                </div>
                <div class="share" @click="goShowWx">
                    <img src="https://img.hongrenshuo.com.cn/h5/loveworld-goshare-ymz.png" alt="">
                </div>
            </div>
            <div class="out" v-if="!inApp">
                <div class="title" v-if="nickname != ''">
                    您成功帮 {{nickname}} 解锁了一张抽奖券
                </div>
                <div class="ticket" @click="goDownlaod">
                    <img src="https://img.hongrenshuo.com.cn/h5/loveworld-getticket-ymz.png" alt="">
                </div>
            </div>
            <div class="myfirend">
                <img src="https://img.hongrenshuo.com.cn/h5/loveworld-mytop-ymz.png" alt="" class="firendtop">
                <div class="mycontent">
                    <div v-if="imageList.length>0">
                        <div class="title">{{inApp?'为我点亮的好友':'帮助过TA的小伙伴'}}</div>
                        <div class="headListOut">
                            <div class="headList">
                                <div class="headLi" v-for="(item,index) in imageList" :key="index" v-if="index<maxImageLength">
                                    <img alt="" v-lazy="item.headPic" v-if="item.length != ''">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="seeMore" v-if="imageList.length>12 && maxImageLength==12" @click="goMoreFun">
                        <img src="https://img.hongrenshuo.com.cn/h5/loveworld-seeMore-ymz.png" alt="">
                    </div>
                    <div class="rule1">
                        <img :src="inApp?'https://img.hongrenshuo.com.cn/h5/loveworld-guize1-ymz.png':'https://img.hongrenshuo.com.cn/h5/loveworld-guize2-ymz.png'" alt="">
                    </div>
                    <div class="tips">
                        本活动最终解释权归克拉克拉 App所有
                    </div>
                </div>
            </div>
            <div class="modal" v-if="showPhone">
                <div class="modal-content1">
                    <div class="close" @click="closeModal"></div>
                    <div class="inputOut">
                        <input type="number" v-model="phone">
                    </div>
                    <div class="gophone" @click="goPhone">

                    </div>
                </div>
            </div>
            <div class="modal" v-if="showPipei">
                <div class="modal-content2">
                    <div class="close" @click="closeModal"></div>
                    <div class="twoBtn">
                        <div class="btn" @click="closeModal"></div>
                        <div class="btn" @click="goPipei"></div>
                    </div>
                </div>
            </div>
            <div class="modal" v-if="showCard">
                <div class="modal-content3">
                    <div class="imgOut">
                        <div class="close" @click="closeModal">
                            <img src="https://img.hongrenshuo.com.cn/h5/loveworld-closeCrad-ymz.png" alt="">
                        </div>
                        <img :src="cardImage" alt="" class="cardImage">
                        <div class="btnImage" @click="closeModal">
                            <img src="https://img.hongrenshuo.com.cn/h5/loveworld-cardBottom-ymz.png" alt=""
                                 class="btnImage">
                        </div>
                        <div class="videoOut" @click="boCradVoice">
                            <img :src="cardVoiceStatus?'https://img.hongrenshuo.com.cn/h5/lovephone-h5videoactive-ymz.gif':'https://img.hongrenshuo.com.cn/h5/lovephone-h5video-ymz.png'"
                                 alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" v-if="showKou">
                <div class="modal-content4">
                    <div class="close" @click="closeModal"></div>
                    <div class="headImage">
                        <img src="https://img.hongrenshuo.com.cn/h5/loveworld-kouHead-ymz.png" alt="">
                    </div>
                    <div class="tips">
                        恭喜获得<span>{{cardGift}}</span>
                    </div>
                    <div class="twoBtn">
                        <div class="btn" @click="closeModal"></div>
                        <div class="btn" @click="goDizhi"></div>
                    </div>
                </div>
            </div>
            <div class="modol address-modal" v-if="modal4">
                <div class="modal-contentX">
                    <div class="close" @click="closeModalX"></div>
                    <div class="title">请填写收货地址</div>
                    <input class="name" placeholder="收货人姓名" v-model="receivename"/>
                    <input placeholder="请填写手机号" v-model.number="receivephone"/>
                    <textarea placeholder="收货地址" v-model="receiveadd"></textarea>
                    <div class="modal-btn noclick" @click="affirmadd">确定</div>
                </div>
            </div>
            <div class="modol affirmaddress-modal" v-show="modal5">
                <div class="modal-contentX">
                    <div class="close" @click="closeModalX"></div>
                    <div class="title">请填写收货地址</div>
                    <div class="mescontent mescontent1">
                        <div class="name">收货人：</div>
                        {{receivename}}
                    </div>
                    <div class="mescontent">
                        <div class="name">联系电话：</div>
                        {{receivephone}}
                    </div>
                    <div class="mescontent">
                        <div class="name">收货地址：</div>
                        {{receiveadd}}
                    </div>
                    <div class="btn-content">
                        <div class="item" @click="returnadd">返回修改</div>
                        <div class="item" @click="confirmadd">确认</div>
                    </div>
                </div>
            </div>
            <audio id="mp3" ref="audio" src="" hidden></audio>
            <div class="bottomImage" v-if="inApp && userInfo != ''">
                <div class="left">
                    <div class="headPic">
                        <img :src="userInfo.headPic" alt="">
                    </div>
                    <div class="userInfo">
                        <div class="nickName">{{userInfo.nickname}}</div>
                        <div class="desc">匹配权限：<span>{{userInfo.matchNum}}</span>   抽奖券：<span>{{userInfo.lotteryNum}}</span></div>
                    </div>
                </div>
                <div class="right">
                    <div class="my" @click="gomy">
                        <img src="https://img.hongrenshuo.com.cn/h5/loveworld-myjiang-ymz.png" alt="">
                    </div>
                </div>
            </div>
            <div class="bottomImage bottomImage1" v-if="!inApp" @click="goDownlaod">
                <div class="left-tips">
                    下载克拉克拉 App，即可参与抽奖
                </div>
                <div class="right">
                    <div class="my">
                        <img src="https://img.hongrenshuo.com.cn/h5/loveworld-goload-ymz.png" alt="">
                    </div>
                </div>
            </div>
            <div class="modal" v-if="showWxShare" @click="closeShowWx">
                <div class="goshare">
                    <img src="https://img.hongrenshuo.com.cn/h5/wx-gosharewx-ymz.png" alt="">
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import 'assets/js/jquery.min.js';
    import 'assets/js/jqueryrarote.min.js';
    import Toast from 'assets/js/toast'
    import {ymzBaseFun, na} from 'assets/js/common'
    export default {
        name: 'Choucard',
        data() {
            return {
                showShan: false,
                swiperOption: {
                    speed: 1000, //切换速度，即slider自动滑动开始到结束的时间（单位ms）
                    loop: true, //循环切换
                    autoplay: true,
                    pagination: {
                        el: '.swiper-pagination',
                    }
                },
                bannerList: [
                    'https://img.hongrenshuo.com.cn/h5/loveworld-banner1-ymz.jpg',
                    'https://img.hongrenshuo.com.cn/h5/loveworld-banner2-ymz.jpg',
                    'https://img.hongrenshuo.com.cn/h5/loveworld-banner3-ymz.jpg',
                    'https://img.hongrenshuo.com.cn/h5/loveworld-banner4-ymz.jpg',
                ],
                imageList: [],
                getId: -1,
                canClick: true,
                phone: '',
                showPhone: false,
                showPipei: false,
                showCard: false,
                showKou: false,
                cardImage: '',
                cardMp3: '',
                cardGift: '',
                inApp: false,
                cardWidth: '',
                cardVoiceStatus: false,
                receivename: '',
                receivephone: '',
                receiveadd: '',
                modal5: false,
                modal4: false,
                userInfo:'',
                showWxShare:false,
                noClick:false,
                nickname:'',
                maxImageLength:12,
                shareUid:''
            }
        },
        created() {
            if (na.match(/hongdoulive/i)) {
                this.inApp = true;
            } else {
                this.inApp = false;
//                在微信里打开
                if (na.match(/micromessenger/i)) {
                    var shareUid = this.getQueryString('shareUid');
                    this.shareUid = shareUid;
                    console.log(shareUid)
                    if(shareUid){
                        this.helpFun(shareUid);
                    }
                }else{
                    this.showWxShare = true;
                    this.noClick = true;
                }
            }
            let that = this;
            setInterval(function () {
                that.showShan = !that.showShan;
            }, 800);
            this.getImageList();
        },
        mounted() {

            if (this.inApp) {
                this.setZhuanPan();
            }
            let that = this;
            this.$refs.audio.addEventListener('ended', function () {
                that.cardVoiceStatus = false;
            });
        },
        methods: {
            gobackFun:function () {
                window.location.href = '/love_world?showshare=1';
            },
            goMoreFun:function () {
                this.maxImageLength = 1000;
            },
            goShowWx:function () {
                this.showWxShare = true;
            },
            closeShowWx:function () {
                if(this.noClick){
                    return
                }
                this.showWxShare = false;
            },
            gomy:function () {
                window.location.href = '/love_world?showshare=1&page=mycardX';
            },
//            微信助力
            helpFun:function (shareUid) {
                this.$axios.HttpGet('/LoveWorld/help', {
                    shareUid:shareUid
                })
                    .then((res) => {
                        if (res.data.code == 200) {
                            if(res.data.data.code == 200){
                                this.nickname = res.data.data.nickname;
                            }else if(res.data.data.code == 201){
                                this.nickname = res.data.data.nickname;
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
            },
            goDownlaod:function () {
                _hmt.push(['_trackEvent', '点击下载', '点击']);
                window.location.href = 'https://at.umeng.com/onelink/fuuSDC';
            },
            getQueryString:function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if(r != null) return decodeURIComponent(r[2]);
                return null;
            },
            //确认收货地址
            confirmadd: function () {
                this.$axios.HttpGet('/LoveWorld/award', {
                    type: 2,
                    name: this.receivename,
                    phone: this.receivephone,
                    address: this.receiveadd
                })
                    .then((res) => {
                        if (res.data.code == 200) {
                            Toast({
                                message: res.data.data.msg,
                                position: 'center',
                                duration: 1500
                            })
                            this.modal5 = false;
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
            goDizhi: function () {
                this.modal4 = true;
                this.showKou = false;
            },
            closeModalX: function () {
                this.modal4 = false;
                this.modal5 = false;
            },
            affirmadd: function () {
                if (!this.receivename) {
                    Toast({
                        message: '请输入姓名',
                        position: 'center',
                        duration: 1500
                    })
                    return false
                }
                if (!this.isPoneAvailable(this.receivephone)) {
                    Toast({
                        message: '请输入正确的手机号',
                        position: 'center',
                        duration: 1500
                    })
                    return
                }
                if (!this.receiveadd) {
                    Toast({
                        message: '请输入地址',
                        position: 'center',
                        duration: 1500
                    })
                    return false
                }
                this.modal4 = false;
                this.modal5 = true;
            },
            returnadd: function () {
                this.modal4 = true;
                this.modal5 = false;
            },
            //            播放卡片语音
            boCradVoice: function () {
                if (this.$refs.audio.paused) {
                    this.$refs.audio.src = this.cardMp3;
                    this.$refs.audio.play();
                    this.cardVoiceStatus = true;
                } else {
                    this.$refs.audio.pause();
                    this.cardVoiceStatus = false;
                }
            },
            setZhuanPan: function () {
                let canvas = document.getElementById("wheelcanvas");
                let ctx = canvas.getContext("2d");
                let img = new Image();
                img.src = "https://img.hongrenshuo.com.cn/h5/loveworld-canvasBg-ymz.png";
                img.onload = function () {
                    ctx.drawImage(img, 0, 0, 597, 597);
                }
            },
            isPoneAvailable: function (phone) {
                var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(phone)) {
                    return false;
                } else {
                    return true;
                }
            },
            closeModal: function () {
                if (this.showCard) {
                    this.cardVoiceStatus = false;
                    this.$refs.audio.pause();
                }
                this.showPhone = false;
                this.showPipei = false;
                this.showCard = false;
                this.showKou = false;
            },
            goPhone: function () {
                if (!this.isPoneAvailable(this.phone)) {
                    Toast({
                        message: '请输入正确的手机号',
                        position: 'center',
                        duration: 1500
                    })
                    return
                }
                this.$axios.HttpGet('/LoveWorld/award', {
                    type: 1,
                    phone: this.phone
                })
                    .then((res) => {
                        if (res.data.code == 200) {
                            Toast({
                                message: res.data.data.msg,
                                position: 'center',
                                duration: 1500
                            })
                            if (res.data.data.code == 200) {
                                this.showPhone = false;
                            }
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
            goPipei: function () {
               window.location.href = '/love_world?showshare=1&page=allvoiceX';
//                this.$router.push('/allvoice');
            },
            getImageList: function () {
                this.$axios.HttpGet('/LoveWorld/helpList', {
                    shareUid:this.shareUid
                })
                    .then((res) => {
                        if (res.data.code == 200) {
                            this.imageList = res.data.data.list;
                            this.userInfo = res.data.data.userInfo;
                            console.log(res.data)
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
            rotateTimeOut: function () {
                _hmt.push(['_trackEvent', '点击抽奖', '点击']);
                if(!this.userInfo.lotteryNum > 0){
                    Toast({
                        message: '抽奖机会不足，快快分享给微信好友解锁',
                        position: 'center',
                        duration: 1500
                    })
                    return
                }else{
                    this.userInfo.lotteryNum  = this.userInfo.lotteryNum -1;
                }
                let that = this;
                let roate;
                if (this.canClick) {
                    this.zhuanFun();
                    this.$axios.HttpGet('/LoveWorld/lottery', {})
                        .then((res) => {
                            console.log(res);
                            if (res.data.code == 200) {
                                console.log(res.data);
                                if (res.data.data.code == 200) {
                                    if (res.data.data.gift.id == 1) {
                                        roate = 120; //游戏
                                    } else if (res.data.data.gift.id == 2) {
                                        roate = 60;  //匹配
                                    } else if (res.data.data.gift.id == 3) {
                                        roate = 30;  //卡片
                                    } else if (res.data.data.gift.id == 4) {
                                        roate = 340;  //实物
                                    }
                                    $('.wheel-prize').stopRotate();
                                    $('.wheel-prize').rotate({
                                        angle: 0,
                                        animateTo: 1800 + roate,
                                        duration: 8000,
                                        callback: function () {
                                            that.canClick = true;
                                            if (res.data.data.gift.id == 1) {
                                                that.showPhone = true;
                                            } else if (res.data.data.gift.id == 2) {
                                                that.showPipei = true;
                                            } else if (res.data.data.gift.id == 3) {
                                                that.cardImage = `https://img.hongrenshuo.com.cn/h5/h5_love_world_card_back_${res.data.data.gift.cardId}.png`;
                                                that.cardMp3 = `https://img.hongrenshuo.com.cn/h5/h5_love_world_card_${res.data.data.gift.cardId}.mp3`;
                                                that.showCard = true;
                                            } else if (res.data.data.gift.id == 4) {
                                                that.cardGift = res.data.data.gift.detail;
                                                that.showKou = true;
                                            }
                                            that.getImageList();
                                        }
                                    });
                                } else {
                                    $('.wheel-prize').stopRotate();
                                    $('.wheel-prize').rotate({
                                        angle: 0,
                                        animateTo: 1800,
                                        duration: 8000,
                                        callback: function () {
                                            that.canClick = true;
                                            Toast({
                                                message: res.data.data.msg,
                                                position: 'center',
                                                duration: 1500
                                            })
                                        }
                                    });
                                }
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
                }
            },
            zhuanFun: function () {
                this.canClick = false;
                let that = this;
                $('.wheel-prize').rotate({
                    angle: 0,
                    animateTo: 3600,
                    duration: 10000,
                    callback: function () {
                        that.canClick = true;
                    }
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .choucard {
        width: 100%;
        height: auto;
        background: url("https://img.hongrenshuo.com.cn/h5/loveworld-chouBg-ymz.png") center;
        background-repeat: repeat-y;
        background-size: 100% auto;
        /*padding-bottom: 190px;*/
        .goback{
            position: fixed;
            left: 20px;
            top:20px;
            width: 73px;
            height: 98px;
            z-index: 1000;
            img{
                width: 100%;
                height: auto;
            }
        }
        img {
            width: 100%;
            height: auto;
        }
        .banner {
            width: 100%;
            height: auto;
            background: #ecadbc;
        }
        .content {
            .wheel {
                margin: 50px auto 0;
                width: 684px;
                height: 684px;
                background-image: url("https://img.hongrenshuo.com.cn/h5/loveworld-chouBgTwo-ymz.png");
                background-repeat: no-repeat;
                background-size: auto 100%;
                background-position: 0 0;
                position: relative;
                .wheel-prize {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100;
                    .wheelcanvas {
                        width: 597px;
                        height: 597px;
                    }
                }
                .goZhuan {
                    position: absolute;
                    width: 163px;
                    height: 190px;
                    background: url("https://img.hongrenshuo.com.cn/h5/loveworld-goZhuan-ymz.png") no-repeat center;
                    background-size: 100%;
                    z-index: 400;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    color: #ffafc6;
                    font-size: 26px;
                    padding-bottom: 30px;
                    box-sizing: border-box;
                    font-weight: 400;
                }
            }
            .wheel-blink {
                background-position: -684px 0;
            }
            .jiao {
                width: 374px;
                height: 151px;
                margin: -28px auto 0;
            }
        }
        .share {
            width: 692px;
            height: 229px;
            margin: 0 auto;
        }
        .out {
            padding-bottom: 65px;
            .title {
                text-align: center;
                margin: 50px auto;
                font-size: 26px;
                color: #fff;
                font-weight: 500;
            }
        }
        .myfirend {
            .firendtop {
                width: 100%;
                height: 88px;
            }
            .mycontent {
                width: 100%;
                background: url("https://img.hongrenshuo.com.cn/h5/loveworld-myzi-ymz.png") center;
                background-repeat: repeat-y;
                background-size: 100% auto;
                padding: 40px 0 170px;
                box-sizing: border-box;
                margin-top: 0;
                .title {
                    font-size: 40px;
                    text-align: center;
                    color: #fff;
                    font-weight: 500;
                }
                .headListOut {
                    width: 100%;
                    padding: 0 24px;
                    box-sizing: border-box;
                    .headList {
                        width: 100%;
                        border-bottom: 2px dotted #fff;
                        display: flex;
                        flex-wrap: wrap;
                        padding-bottom: 32px;
                        box-sizing: border-box;
                        margin-bottom: 30px;
                        .headLi {
                            width: 100px;
                            height: 100px;
                            border-radius: 50%;
                            border: 2px solid #332a62;
                            box-sizing: border-box;
                            margin-left: 14px;
                            margin-top: 32px;
                            background: #fff;
                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                    }
                }
                .seeMore {
                    width: 181px;
                    height: 47px;
                    margin: 0 auto 30px;
                }
                .rule1 {
                    width: 727px;
                    height: auto;
                    margin: 0 auto;
                    img{
                        width: 100%;
                        height: auto;
                    }
                }
                .tips{
                    text-align: center;
                    line-height: 3;
                    color: #fff;
                }
            }
        }
        .modal {
            width: 100%;
            height: 100%;
            z-index: 1000;
            position: fixed;
            left: 0;
            top: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            .close {
                width: 60px;
                height: 60px;
                position: absolute;
                right: 0;
                top: 0;
                img {
                    width: 100%;
                    height: auto;
                }
            }
            .modal-content1 {
                width: 648px;
                height: 618px;
                background: url("https://img.hongrenshuo.com.cn/h5/loveworld-giftBg-ymz.png") no-repeat center;
                background-size: 100%;
                position: relative;
                padding-top: 110px;
                box-sizing: border-box;
                .inputOut {
                    width: 505px;
                    height: 64px;
                    border-radius: 32px;
                    position: absolute;
                    left: 50%;
                    top: 340px;
                    transform: translateX(-50%);
                    border: 2px solid #fff;
                    background: #f3a1be;
                    display: flex;
                    align-items: center;
                    padding: 0 20px;
                    box-sizing: border-box;
                    input {
                        width: 100%;
                        height: 100%;
                        background: transparent;
                    }
                }
                .gophone {
                    position: absolute;
                    width: 100%;
                    left: 0;
                    height: 100px;
                    bottom: 52px;
                }
            }
            .modal-content2 {
                width: 648px;
                height: 420px;
                background: url("https://img.hongrenshuo.com.cn/h5/loveworld-showpipei-ymz.png") no-repeat center;
                background-size: 100%;
                position: relative;
                .twoBtn {
                    position: absolute;
                    width: 100%;
                    left: 0;
                    height: 100px;
                    bottom: 52px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .btn {
                        flex: 1;
                        height: 100%;
                    }
                }
            }
            .modal-content3 {
                position: relative;
                .cardImage {
                    width: 685px;
                    height: 1002px;
                }
                .close {
                    width: 60px;
                    height: 60px;
                    position: absolute;
                    right: 30px;
                    top: 30px;
                }
                .btnImage {
                    width: 584px;
                    height: 113px;
                    margin: 20px auto 0;
                }
                .videoOut {
                    width: 88px;
                    height: 88px;
                    position: absolute;
                    bottom: 332px;
                    right: 26px;
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
            }
            .modal-content4 {
                width: 648px;
                height: 566px;
                background: url("https://img.hongrenshuo.com.cn/h5/loveworld-shiwuBg-ymz.png") no-repeat center;
                background-size: 100%;
                position: relative;
                padding-top: 50px;
                box-sizing: border-box;
                .headImage {
                    width: 320px;
                    height: 238px;
                    margin: 0 auto;
                    img {
                        width: 100%;
                    }
                }
                .tips {
                    font-size: 34px;
                    color: #30296e;
                    text-align: center;
                    font-weight: 500;
                    margin-top: 32px;
                    span {
                        color: #cb6f8f;
                    }
                }
                .twoBtn {
                    position: absolute;
                    width: 100%;
                    left: 0;
                    height: 100px;
                    bottom: 52px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .btn {
                        flex: 1;
                        height: 100%;
                    }
                }
            }
            .modal-content5 {
                width: 632px;
                height: 500px;
                border-radius: 18px;
                background: #fff;
                position: relative;
                padding: 48px;
                box-sizing: border-box;
                input {
                    background: transparent;
                    width: 100%;
                    height: 100%;
                }
                .close {
                    width: 94px;
                    height: 114px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
                .title {
                    text-align: center;
                    color: #2B2B27;
                    font-size: 36px;
                    font-weight: 500;
                }
                .nickName {
                    width: 534px;
                    height: 88px;
                    border-radius: 12px;
                    background: #F7F7F7;
                    padding: 24px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }

        }
        .modol {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            .modal-contentX {
                padding: 48px 48px 40px;
                background: #FFFFFF;
                border-radius: 18px;
                width: 640px;
                box-sizing: border-box;
                position: relative;
                .title {
                    color: #2B2B27;
                    font-size: 36px;
                    line-height: 50px;
                    font-weight: 500;
                    text-align: center;
                }
                .content-item {
                    margin-top: 40px;
                    font-size: 30px;
                    .subheading {
                        color: #FF8383;
                    }
                    .content {
                        color: #27292B;
                        margin-top: 30px;
                        line-height: 48px;
                        span {
                            color: #989A9B;
                        }
                    }
                    .sec-content {
                        color: #989A9B;
                        margin-top: 16px;

                    }
                }
                .modal-btn {
                    width: 534px;
                    height: 88px;
                    line-height: 88px;
                    text-align: center;
                    font-size: 30px;
                    background: #FF8383;
                    border-radius: 18px;
                    text-align: center;
                    margin: 40px auto 0;
                    color: #fff;

                }
                .close {
                    width: 96px;
                    height: 116px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    background: url("https://img.hongrenshuo.com.cn/h5/whitenovel-closemodal-ymz.png") no-repeat;
                    background-size: 100% 100%;
                }
                input {
                    width: 534px;
                    height: 88px;
                    text-align: center;
                    font-size: 30px;
                    margin-top: 48px;
                    border-radius: 18px;
                    box-sizing: border-box;
                }
            }

        }
        .affirmaddress-modal {
            .modal-contentX {
                padding: 48px;
                .mescontent {
                    width: 100%;
                    padding-left: 160px;
                    font-size: 30px;
                    color: #27292B;
                    line-height: 46px;
                    position: relative;
                    margin-top: 24px;
                    font-weight: 400;
                    box-sizing: border-box;
                    .name {
                        position: absolute;
                        left: 0;
                        top: 0;
                        color: #989A9B;
                    }
                    &:first-child {
                        margin-top: 60px;
                    }
                }
                .mescontent1 {
                    margin-top: 50px;
                }
                .btn-content {
                    width: 100%;
                    justify-content: space-between;
                    padding: 0 15px;
                    box-sizing: border-box;
                    display: flex;
                    margin-top: 60px;
                    .item {
                        width: 228px;
                        height: 88px;
                        border-radius: 18px;
                        line-height: 88px;
                        text-align: center;
                        font-size: 30px;
                        color: #27292B;
                        background: #F2F2F3;
                        &:last-child {
                            background: #FF8383;
                            color: #fff;
                        }
                    }
                }
            }
        }
        .address-modal {
            .modal-contentX {
                input {
                    margin-top: 24px;
                    text-align: left;
                    background: #F7F7F7;
                    padding-left: 24px;
                    box-sizing: border-box;
                }
                .name {
                    margin-top: 48px;
                    padding-left: 24px;
                    box-sizing: border-box;
                }
                textarea {
                    margin-top: 24px;
                    height: 210px;
                    width: 100%;
                    font-size: 30px;
                    text-align: left;
                    border-radius: 18px;
                    padding: 24px;
                    box-sizing: border-box;
                    background: #F7F7F7;
                    border: none;
                    outline: none;
                }
            }
        }
        .goshare{
            width: 100%;
            height: 100%;
            position: relative;
            img{
                position: absolute;
                right: 0PX;
                top:0PX;
                width: 616px;
                height: 646px;
            }
        }
        .bottomImage{
            width: 100%;
            height: 189px;
            background: url("https://img.hongrenshuo.com.cn/h5/loveworld-bottombg-ymz.png") no-repeat center;
            background-size: 100%;
            position: fixed;
            left:0;
            bottom:0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:0 24px;
            box-sizing: border-box;
            z-index: 500;
            .left-tips{
                color: #261d56;
                font-size: 34px;
                font-weight: 500;
            }
            .left{
                display: flex;
                align-items: center;
                .headPic{
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    border: 2px solid #2d245c;
                    background: #fff;
                    box-sizing: border-box;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .userInfo{
                    margin-left: 20px;
                    .nickName{
                        font-size: 34px;
                        color: #2d245c;
                        font-weight: 500;
                    }
                    .desc{
                        font-weight: 400;
                        color: #333333;
                        font-size: 24px;
                        margin-top: 24px;
                        span{
                            color: #f15500;
                        }
                    }
                }
            }
            .right{
                display: flex;
                align-items: center;
                .my{
                    width: 118px;
                    height: 127px;
                }
                .go{
                    width: 118px;
                    height: 127px;
                    margin-left: 10px;
                }
            }
        }
        .bottomImage1{
            height: 120px;
        }
    }
</style>

<template>
    <div id="app">
        <div v-show="!showWx" class="appin">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/sweetcall-page3-iamge_01.png`"></Onepic>
                <div class="user-infomation">
                    <div class="userHeader">
                        <img :src="userInfo.headPic"/>
                    </div>
                    <div class="userName">{{userInfo.nickname}}</div>
                    <div class="active-time">11月2日 00：00 - 11月9日 00：00</div>
                    <div class="progress-wraper">
                        <div class="progress-top">
                            <div>你共赚的积分：<span>{{userInfo.allIntegration}}</span></div>
                            <div>已经用积分兑换人气票：<span>{{userInfo.exchangeTicket}}</span></div>
                        </div>
                        <div class="progress-content">
                            <div class="progress-inner" :style="{width:(userInfo.exchangeTicket/735*100)+'%'}"></div>
                        </div>
                        <div class="progress-bottom">
                            <div>已兑换人气票：<span>{{userInfo.exchangeTicket}}</span></div>
                            <span>共735张</span>
                        </div>
                    </div>
                    <div class="progress-rule">
                        兑换规则：10积分=1人气票
                    </div>
                    <div class="progress-rule progress-rule1">
                        活动期间用户最多可通过积分免费兑换735张人气票
                    </div>
                </div>
            </div>
            <div class="explist">
                <div class="exitem" v-for="(item,index) in dataList">
                    <div class="exitem-info">
                        <div class="exitem-icon">
                            <img :src="item.picture"/>
                        </div>
                        <div class="exitem-des">
                            <div class="exitem-des-top">
                                <div class="des-name">{{item.title}}</div>
                                <div class="des-number"><span>{{item.exp}}</span> / {{item.totalExp}}</div>
                            </div>
                            <div class="exitem-des-bottom">
                                <div>{{item.desc}}</div>
                                <div>{{item.limit}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="progress-content">
                        <div class="progress-inner" :style="{width:item.percent+'%'}"></div>
                    </div>
                </div>
            </div>
            <div class="bottom-des">
                网络情况不佳时，积分奖励会延迟10分钟到账，请耐心等待片刻</br>
                本活动最终解释权归克拉克拉所有</br>
                微信关注<span>克拉克拉kilakila</span>获取客服帮助</br>
            </div>
            <div class="bottom-btn" @click="modalshow(4)"></div>
            <div class="ball-modal exchange-modal" v-show="modalindex == 4">
                <div class="alert-content">
                    <div class="close" @click="modalshow(-1)"></div>
                    <div class="title">积分兑换人气票</div>
                    <div class="operate-content">
                        <span>选择兑换数量</span>
                        <div class="sub-ticket" @click="reduce(2)">-</div>
                        <input type="number" class="ticket-number" v-model="exchange"/>
                        <div class="add-ticket" @click="add(2)">+</div>
                    </div>
                    <div class="heng"></div>
                    <div class="myticket">
                        <div>
                            我的人气票：<span>{{userInfo.remainTicket}}</span>
                        </div>
                        <div>
                            我的积分：<span>{{userInfo.integration}}</span>
                        </div>
                    </div>
                    <div class="one-btn-content">
                        <div class="one-btn" @click="exchangeticket"></div>
                    </div>
                </div>
            </div>
            <div class="goTop" @click.stop="scrollToTop()" v-show="isActive">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/sweetcall-gotop.png`"></Onepic>
            </div>
        </div>
        <Wxcontent v-show="showWx"></Wxcontent>
        <audio id="mp3" ref="audio" hidden @ended="ended()"></audio>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'
    let shareTitle = '#克拉克拉甜秘致电#';
    let shareDesc = '来克拉克拉App，12大声控男神甜美秘电，等你接听。';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/sweetcall-share.png';
    export default {
        data() {
            return {
                dataList:[],
                userInfo:[],
                exchange:1,
                modalindex:-1,
                showWx: false,
                isActive: false
            }
        },

        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);
        },
        mounted() {
            this.getdatalist();
            this.$nextTick(function () {
                window.addEventListener('scroll', this.handleScroll)
            });
        },
        methods: {
            modalshow:function(index,name,uid){
                this.modalindex = index;
                if(index == 1){
                    this.starName = name;
                    this.voteuid = uid;
                }else if(index == -1){
                    this.votenumber=1;
                    this.exchange=1;
                    this.buynumber='';
                }else if(index == 4){
                    // this.updatelog(2)
                }else if(index == 5){
                    this.updatelog(1)
                }
            },
            getdatalist:function(){
                this.$axios.HttpGet("/SweetCall/integrationList")
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.code === 200) {
                            this.dataList = res.data.data.expList;
                            this.userInfo = res.data.data.userInfo;
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
            reduce:function(type){
                if(type == 1){
                    if(this.votenumber<2){
                        return;
                    }
                    this.votenumber --;
                }else if(type == 2){
                    if(this.exchange<2){
                        return;
                    }
                    this.exchange --;
                }
            },
            add:function(type){
                if(type == 1){
                    this.votenumber ++;
                }else if(type == 2){
                    this.exchange ++;
                }
            },
            exchangeticket:function(){
                let reg = /^[1-9]\d*$/;
                if (!reg.test(this.exchange)){
                    Toast({
                        message: '兑换票数有误，请重新填写',
                        position: 'center',
                        duration: 1500
                    });
                    return;
                };
                this.getdata('/SweetCall/exchangeTicket',{
                    quantity:this.exchange
                });
            },
            getdata:function(url,data){
                this.$axios.HttpGet(url,data)
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.code === 200) {
                            Toast({
                                message: res.data.msg,
                                position: 'center',
                                duration: 1500
                            });
                            this.getdatalist();
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
            goDeepLink: function (url) {
                if (na.match(/hongdoulive/i)) {
                    window.location.href = url;
                } else {
                    if (na.match(/micromessenger/i) && na.match(/(iphone|ipod|ios|ipad)/i)) {
                        this.showWx = true;
                    } else {
                        var data = {};
                        data.stage = 'sweetcall'; // 自定义深度链接阶段，多个用逗号分隔，【可选】
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

            handleScroll: function () {
                this.scrollTop = this.scrollTop = window.pageYOffset || document.body.scrollTop
                if (this.scrollTop > 400) {
                    this.isActive = true
                } else {
                    this.isActive = false
                }
            },
            scrollToTop() {
                let timer = null;
                let _that = this;
                //动画，使用requestAnimationFrame代替setInterval
                cancelAnimationFrame(timer)
                timer = requestAnimationFrame(function fn() {
                    if (_that.scrollTop > 0) {
                        _that.scrollTop -= 100
                        //然后修改这里实现动画滚动效果
                        document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop
                        timer = requestAnimationFrame(fn)
                    } else {
                        cancelAnimationFrame(timer);
                        _that.toTopShow = false
                    }
                })
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
            background: #444444;
            .topimageOut{
                width:100%;
                height:555px;
                position: relative;
                .user-infomation{
                    width:100%;
                    height:100%;
                    position: absolute;
                    left:0;
                    top:0;
                    padding-top:29px;
                    box-sizing: border-box;
                    .userHeader{
                        width:100px;
                        height:100px;
                        border-radius: 50%;
                        margin:0 auto;
                        img{
                            width:100%;
                            height:100%;
                            border-radius: 50%;
                        }
                    }
                    .userName{
                        width:100%;
                        text-align: center;
                        font-size: 18px;
                        font-weight: 600;
                        color:#fff;
                        margin-top:14px;
                    }
                    .active-time{
                        width:100%;
                        text-align: center;
                        font-size: 14px;
                        font-weight: 500;
                        color:#ffbcbc;
                        margin-top:20px;
                    }
                    .progress-wraper{
                        width:100%;
                        padding:0 30px;
                        box-sizing: border-box;
                        margin-top:10px;
                        .progress-top{
                            font-size: 14px;
                            color:#fff;
                            display: flex;
                            justify-content: space-between;
                            span{
                                color:#ffbcbc;
                            }
                        }
                        .progress-content{
                            width:100%;
                            height:9px;
                            border-radius: 9px;
                            background: #dcdcdc;
                            margin-top:8px;
                            position: relative;
                            .progress-inner{
                                width:30%;
                                height:9px;
                                left:0;
                                top:0;
                                background: #ff8383;
                                box-sizing: border-box;
                                border-radius: 9px;
                                border: 1px solid #fff;
                            }
                        }
                        .progress-bottom{
                            font-size: 13px;
                            color:#fff;
                            margin-top:8px;
                            display: flex;
                            justify-content: space-between;
                            span{
                                color:#ffbcbc;
                            }
                        }
                    }
                    .progress-rule{
                        font-size: 12px;
                        color:#fffefe;
                        text-align: center;
                        margin-top:14px;
                    }
                    .progress-rule1{
                        margin-top:5px;
                    }
                }
            }
            .explist{
                width:100%;
                padding:22px 20px 0px;
                box-sizing: border-box;
                .exitem{
                    width:100%;
                    margin-bottom: 30px;
                    .exitem-info{
                        width:100%;
                        display: flex;
                        align-items: center;
                        .exitem-icon{
                            width:53px;
                            height:37px;
                            img{
                                width:100%;
                                height:100%;
                            }
                        }
                        .exitem-des{
                            flex: 1;
                            padding-left:15px;
                            box-sizing: border-box;
                            .exitem-des-top{
                                width:100%;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .des-name{
                                    font-size: 20px;
                                    font-weight: 500;
                                    color:#fff;
                                }
                                .des-number{
                                    font-size: 14px;
                                    font-weight: 500;
                                    color:#fff;
                                    span{
                                        color:#ff8383;
                                    }
                                }
                            }
                            .exitem-des-bottom{
                                width:100%;
                                display: flex;
                                justify-content: space-between;
                                color:#d5d5d5;
                                margin-top:6px;
                                font-size: 12px;
                            }
                        }
                    }
                    .progress-content{
                        width:100%;
                        height:5px;
                        border-radius: 5px;
                        background: #959595;
                        margin-top:14px;
                        position: relative;
                        .progress-inner{
                            height:5px;
                            position: absolute;
                            left:0;
                            top:0;
                            border-radius:5px;
                            background: #ff8383;
                        }
                    }
                }
                .exitem:last-child{
                    padding-bottom:30px;
                    border-bottom:1px dotted #959595;
                    margin-bottom: 12px;
                }
            }
            .bottom-des{
                font-size: 12px;
                color:#ffd4d4;
                text-align: center;
                line-height: 20px;
                span{
                    color:#ff8383;
                }
            }
            .bottom-btn{
                width:100%;
                height:62px;
                background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-page3-bottombtn.png") no-repeat;
                background-size: 100% 100%;
                margin-top:30px;
            }
            .goTop {
                width: 80px;
                height: 83px;
                position: fixed;
                bottom: 60px;
                right: 12px;
                z-index: 500;
            }
            .ball-modal{
                width:100%;
                height:100%;
                position: fixed;
                left:0;
                top:0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999;
                .alert-content{
                    width:345px;
                    background-image: url("https://img.hongrenshuo.com.cn/h5/sweetcall-modal-bg.png");
                    background-repeat: no-repeat;
                    background-size: 100% auto;
                    position: relative;
                    padding:0 15px;
                    box-sizing: border-box;
                    .title{
                        width: 100%;
                        font-size: 19px;
                        color:#000;
                        text-align: center;
                        font-weight: 500;
                        span{
                            color: #ff8383;
                            margin:0 10px;
                        }
                    }
                    .close{
                        width:50px;
                        height:50px;
                        position: absolute;
                        background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-modal-close.png") no-repeat;
                        background-size: 25px 25px;
                        background-position: center;
                        position: absolute;
                        top:0;
                        right:0;
                    }
                    .heng{
                        width:100%;
                        height:2px;
                        background: #fff;
                        margin-top:14px;
                    }
                    .one-btn-content{
                        display: flex;
                        justify-content: center;
                        margin-top:26px;
                        .one-btn{
                            width:156px;
                            height:39px;
                        }
                    }
                    .two-btn-content{
                        display: flex;
                        justify-content: space-around;
                        margin-top:26px;
                        .two-btn{
                            width:156px;
                            height:39px;
                        }
                    }
                }
            }
            .exchange-modal{
                .alert-content{
                    height:295px;
                    padding-top:50px;
                    .operate-content{
                        width:100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 15px;
                        color:#000;
                        margin-top:40px;
                        font-weight: 400;
                        .sub-ticket,.add-ticket{
                            width:25px;
                            height:25px;
                            border-radius: 5px 0 0 5px;
                            display: flex;
                            display: -webkit-flex;
                            align-items: center;
                            -webkit-align-items: center;
                            justify-content:center;
                            -webkit-justify-content: center;
                            border-top:1px solid #7d7d7d;
                            border-left:1px solid #7d7d7d;
                            border-bottom:1px solid #7d7d7d;
                            font-size: 14px;
                            background:#fff;
                            margin-left:7px;
                        }

                        .add-ticket{
                            border-left:none;
                            border-top:1px solid #7d7d7d;
                            border-right:1px solid #7d7d7d;
                            border-bottom:1px solid #7d7d7d;
                            border-radius: 0 5px 5px 0;
                            margin-left:0px;
                            margin-right:7px;
                        }
                        .ticket-number{
                            width:50px;
                            height:25px;
                            border:1px solid #7d7d7d;
                            color:#000;
                            font-size: 14px;
                            text-align: center;
                            padding: 0;
                            border-radius: 0;
                        }
                        .addrenqi{
                            color:#ff8383;
                            text-decoration: underline;
                        }
                    }
                    .myticket{
                        font-size: 15px;
                        color:#000;
                        margin-top:15px;
                        font-weight: 400;
                        text-align: center;
                        display: flex;
                        justify-content: space-between;
                        padding:0 18px;
                        span{
                            color:#ff8383;
                            margin:0 3px;
                        }
                    }
                    .two-btn-content{
                        margin-top:35px;
                        .two-btn{
                            width:143px;
                            height:39px;
                        }
                        .two-btn:nth-child(1){
                            background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-alert-btn4.png");
                            background-size: 100% 100%;
                        }
                        .two-btn:nth-child(2){
                            background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-alert-btn5.png");
                            background-size: 100% 100%;
                        }

                    }
                    .one-btn-content{
                        .one-btn{
                            width:143px;
                            height:39px;
                            background: url("https://img.hongrenshuo.com.cn/h5/sweetcall-alert-btn5.png");
                            background-size: 100% 100%;
                        }
                    }
                }
            }
        }

    }
</style>

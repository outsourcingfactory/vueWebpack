<template>
    <!--投票-->
    <div class="modal-toupiao" v-show="show">
        <div class="toupiao">
            <div class="close user-close" @click="close()"></div>
            <div class="modal-content">
                <div class="title">验证手机号</div>
                <div class="phone-content" v-on:click.stop="fillContent">
                    <input v-model="phoneNum" class="phone-num" type="number" placeholder="请输入手机号码">
                    <div class="tipsNum">tips:请注意接听电话哟~</div>
                    <div class="verify-box">
                        <input class="verify-num" v-model="verifyNum" type="number" placeholder="请输入语音验证码">
                        <div class="verify-btn" :style="{background:bgColor}" :class="disabled?'disabled':''"
                             @click="sendSmsCode">{{btnContent}}
                        </div>
                        <!--<input v-on:click="sendSmsCode" class="verify-btn" type="button" v-model="btnContent" v-bind="{'disabled':disabled}">-->
                    </div>
                </div>
            </div>
            <div class="modal-bottom" :style="{background:bgColor}" @click="goPiao()">
                我要投票
            </div>
        </div>
    </div>
</template>
<script>
    import Toast from 'assets/js/toast'

    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            bgColor: {
                type: String,
            },

        },
        data() {
            return {
                phoneNum: "", //手机号
                verifyNum: "", //验证码
                btnContent: "获取语音验证码", //获取验证码按钮内文字
                time: 0, //发送验证码间隔时间
                disabled: false //按钮状态
            }
        },
        mounted() {

        },
        methods: {
            close() {
                this.$emit('closeModalPhone', false);
            },
//            点击投票
            goPiao() {
                if(this.phoneNum == '' || this.verifyNum == ''){
                    Toast({
                        message: '请输入手机号或者验证码',
                        position: 'center',
                        duration: 1500
                    })
                    return;
                }
                this.$emit('checkPhone', this.phoneNum,this.verifyNum);
            },
            fillContent() {

            },
            // 获取验证码
            sendSmsCode() {
                let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;//手机号正则验证
                let phoneNum = this.phoneNum;
                if (!phoneNum) {//未输入手机号
                    Toast({
                        message: '请输入手机号码',
                        position: 'center',
                        duration: 1500
                    })
                    return;
                }
                if (!reg.test(phoneNum)) {//手机号不合法
                    Toast({
                        message: '您输入的手机号码不合法，请重新输入',
                        position: 'center',
                        duration: 1500
                    })
                    return
                }
                this.time = 60;
                this.timer();
                this.$axios.HttpGet('/Vote/thunderSendCode', {
                    phone:phoneNum
                })
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.data.code === 200) {

                        } else {
                            Toast({
                                message: res.data.data.msg,
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
            timer() {
                if (this.time > 0) {
                    this.time--;
                    this.btnContent = this.time + "s后重新获取";
                    this.disabled = true;
                    let timer = setTimeout(this.timer, 1000);
                } else if (this.time == 0) {
                    this.btnContent = "获取验证码";
                    this.disabled = false;
                    clearTimeout(timer);
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .modal-toupiao {
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        overflow: hidden;
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        -webkit-justify-content: center;
        align-items: center;
        justify-content: center;
        .toupiao {
            width: 300px;
            background: #F8F5F1;
            border-radius: 3px;
            position: relative;
            .close {
                position: absolute;
                width: 36px;
                height: 44px;
                top: 0;
                right: 0;
                border-radius: 0 3px 0 0;
                background: url('https://img.hongrenshuo.com.cn/h5/alert-close.png') no-repeat;
                background-size: 100%;
                z-index: 100;
            }
            .modal-content {
                width: 100%;
                text-align: center;
                padding-top: 18px;
                .title {
                    font-size: 14px;
                    text-align: center;
                    padding-top: 12px;
                    color: #000;
                    font-weight: 400;
                }
                .phone-content {
                    padding: 10px;
                    box-sizing: border-box;
                    .tipsNum{
                        color: #000;
                        font-size: 12px;
                        line-height: 20px;
                        padding-top: 10px;
                        text-align: left;
                        font-weight: 400;
                        padding-left: 5px;
                    }
                    .phone-num {
                        width: 100%;
                        height: 37px;
                        line-height: 37px;
                        font-size: 12px;
                        vertical-align: top;
                        padding-left: 10px;
                        box-sizing: border-box;
                        border-radius: 6px;
                    }
                    .verify-box {
                        padding-top: 10px;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        .verify-num {
                            width: 0;
                            flex: 1;
                            height: 37px;
                            line-height: 12px;
                            font-size: 12px;
                            vertical-align: top;
                            padding-left: 10px;
                            box-sizing: border-box;
                            border-radius: 6px;
                            min-width: 80px;

                        }
                        .verify-btn {
                            width: 110px;
                            height: 37px;
                            border-radius: 6px;
                            background: #eecc0e;
                            text-align: center;
                            line-height: 37px;
                            font-size: 13px;
                            margin-left: 10px;
                        }
                        .disabled {
                            background: #c1c1c1 !important;
                        }
                    }
                }
            }
            .modal-bottom {
                width: 100%;
                height: 44px;
                line-height: 44px;
                text-align: center;
                color: #fff;
                /*background: #4c485e;*/
                font-size: 14px;
            }
        }
    }
</style>
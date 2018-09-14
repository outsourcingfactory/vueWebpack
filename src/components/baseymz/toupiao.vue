<template>
    <!--投票-->
    <div class="modal-toupiao" v-show="show">
        <div class="toupiao">
            <div class="close user-close" @click="close()"></div>
            <div class="modal-content">
                <div class="title">请输入验证码投票</div>
                <div class="verifi-bottom">
                    <input type="text" class="verifi" autocomplete="off" placeholder="请输入验证码" v-model="input1"/>
                    <div class="sendNumber" @click="getMa()">
                        <!--<img src="http://playtest.uxin.com/index.php/Authcode/getCode.html" id="verify_img"/>-->
                        <img :src="imgUrl" />
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
        props:{
            show: {
                type: Boolean,
                default:false
            },
            bgColor:{
                type: String,
            }
        },
        watch: {
            show(val, oldval) {
                if(val == false){
                    this.getMa();
                    this.input1 = '';
                }
            },
        },
        data(){
            return {
                input1:'',
                imgUrl:'',
            }
        },
        created(){
            this.getMa();
        },
        mounted(){

        },
        methods:{
//            切换二维码
            getMa(){
                let verifyURL = "/Authcode/getCode";
                let time = new Date().getTime();
//                this.imgUrl = 'http://playtest.uxin.com/index.php/Authcode/getCode.html' + "?" + time;
                this.imgUrl = verifyURL + "?time=" + time;
            },
            close() {
                this.$emit('closeModalPic', false);
            },
            decodeUnicode(str){
                str = str.replace(/\\/g, "%");
                return unescape(str);
            },
//            点击投票
            goPiao(){
                let that = this;
                console.log(this.input1);
//                let inputCode = this.decodeUnicode(this.input1);
//                console.log(inputCode)
                if(this.input1 == ''){
                    Toast({
                        message: '请输入验证码',
                        position: 'center',
                        duration: 1500
                    })
                    return
                }
                this.$axios.HttpPost('/Vote/aj_checkcode', {code:this.input1})
                    .then((res) => {
                        console.log(res.data)
                        that.$emit('checkCode', res.data);
                        this.close();
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
    }
</script>

<style lang="scss" scoped>
    .modal-toupiao{
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
        .toupiao{
            width: 300px;
            background: #F8F5F1;
            border-radius: 3px;
            position: relative;
            .close{
                position: absolute;
                width: 36px;
                height: 44px;
                top: 0;
                right: 0;
                border-radius: 0 3px 0 0;
                background: url('https://img.hongrenshuo.com.cn/h5/alert-close.png') no-repeat;
                background-size:100%;
                z-index: 100;
            }
            .modal-content {
                width: 100%;
                text-align: center;
                padding-top:18px;
                .title{
                    font-size: 14px;
                    text-align: center;
                    padding-top: 12px;
                    color: #000;
                    font-weight: 400;
                }
                .verifi-bottom {
                    padding:13px 23px 20px;
                    box-sizing: border-box;
                    font-size: 0;
                    .verifi {
                        width: 161px;
                        height: 37px;
                        line-height: 37px;
                        font-size: 14px;
                        vertical-align: top;
                        padding-left: 10px;
                        box-sizing: border-box;
                        border-radius: 6px;
                    }
                    .sendNumber {
                        display: inline-block;
                        width: 83px;
                        height:37px;
                        line-height: 40px;
                        border-radius: 6px;
                        color: #fff;
                        text-align: center;
                        font-size: 14px;
                        margin-left: 10px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
            .modal-bottom{
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
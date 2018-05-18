<template>
    <!--弹窗组件-->
    <div class="confirmContainer" v-show="barShow">
        <div class="confirmContent">
            <span class="modal-icon"></span>
            <div class="confirmUxinStr">
                {{downString}}
            </div>
            <div class="confirmButtomTwoLine" v-show="rightString != ''">
                <div class="confirmUxinCancel" @click.prevent="tiggle()">{{leftString}}</div>
                <div class="confirmUxinAffirm" @click="rightFun()">{{rightString}}</div>
            </div>
            <div class="confirmButtomTwoLine" v-show="rightString == ''">
                <div class="confirmUxinAffirm" @click="rightFun()">{{leftString}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        downString: {
            type: String,
        },
        callback:{
            type: Function,
        },
        leftString:{
            type: String,
        },
        rightString:{
            type: String,
        }

    },
    data(){
        return {
            barShow:false,
        }
    },
    mounted(){
        this.$on('tiggle', function () {
            this.tiggle();
        });
    },
    methods:{
        tiggle: function () {
            this.barShow=!this.barShow;
        },
        rightFun:function () {
            this.tiggle();
            this.callback();
        },
    },
}
</script>

<style lang="scss">
    .confirmContainer{
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
        display: flex;
        align-items: center;
        justify-content: center;
        .confirmContent{
            width: 300px;
            height: 169px;
            background: #F8F5F1;
            border-radius: 6PX;
            position: relative;
            .modal-icon{
                background: url(https://res.uxin.com/xiaobing/modal-icon.png) center 0 no-repeat;
                position: absolute;
                left: 50%;
                top: -30px;
                width: 58px;
                height: 33px;
                margin-left: -29px;
                background-size: 100% 100%;
            }
            .confirmUxinStr{
                height: 125px;
                color: #2B2B27;
                line-height: 26px;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .confirmButtomTwoLine{
                overflow: hidden;
                display: flex;
                height: 44px;
                .confirmUxinCancel,.confirmUxinAffirm{
                    flex: 1;
                    height: 100%;
                    line-height: 44px;
                    text-align: center;
                    font-size: 16px;
                }
                .confirmUxinCancel{
                    border-radius: 0 0 0 6PX;
                    background: #EDEDED;
                    color: #2B2727;
                }
                .confirmUxinAffirm{
                    border-radius: 0 0 6PX 0;
                    background: #FB5D51;
                    color: #fff;
                }
            }
        }
    }
</style>
<template>
    <div id="app">
        <div class="view1" v-show="showView1">
            <div class="imgout">
                <img src="https://img.hongrenshuo.com.cn/h5/colorpi-viewbg1-ymz.png" alt="">
                <div class="percent">{{percent}}%</div>
            </div>
        </div>
        <div class="view2" v-show="showView2">
            <div class="imgout">
                <img src="https://img.hongrenshuo.com.cn/h5/colorpi-viewbg2-ymz.png" alt="">
                <div class="inputOut">
                    <input type="text" v-model="nickName" placeholder="最多不能超过五个字哦~" @blur="fixlocation">
                </div>
                <div class="cirtyOut cirtyOut1" @click="chooseIndexFun(1)">
                    <div class="cirty" v-if="showIndex==1"></div>
                </div>
                <div class="cirtyOut cirtyOut2" @click="chooseIndexFun(2)">
                    <div class="cirty" v-if="showIndex==2"></div>
                </div>
                <div class="goBtn" @click="goFun"></div>
                <div class="pi">
                    <img src="https://img.hongrenshuo.com.cn/h5/colorpi-pipi-ymz.gif" alt="">
                </div>
            </div>
        </div>
        <div class="view3" v-show="showView3">
            <div class="content">
                <div class="topLeft">
                    <img src="../../../assets/colorpi-longpress1-ymz.png" alt="">
                </div>
                <div class="contentBg" ref="imageWrapper" id="poster">
                    <img src="../../../assets/colorpi-viewbg4-ymz.png" alt="" class="bg">
                    <img src="../../../assets/colorpi-pi-ymz.png" alt="" class="pi">
                    <div class="topRight topRight1" v-if="rightpng == 1">
                        <img src="../../../assets/colorpi-xiaoren1-ymz.png" alt="">
                    </div>
                    <div class="topRight topRight2" v-else-if="rightpng == 2">
                        <img src="../../../assets/colorpi-xiaoren2-ymz.png" alt="">
                    </div>
                    <div class="topRight topRight3" v-else-if="rightpng == 3">
                        <img src="../../../assets/colorpi-xiaoren3-ymz.png" alt="">
                    </div>
                    <div class="topRight topRight4" v-else-if="rightpng == 4">
                        <img src="../../../assets/colorpi-xiaoren4-ymz.png" alt="">
                    </div>

                    <div class="contentIn" v-html="writeData[chooseIndex-1]">

                    </div>
                    <div class="erwei">
                        <img src="../../../assets/colorpi-erwei-ymz.png" alt="">
                    </div>
                    <div class="imgOut" id="cav" @touchstart="gtouchstart()" @touchmove="gtouchmove()" @touchend="gtouchend()">
                        <img src="" alt="" id="grow-img">
                    </div>
                </div>
                <div class="again" @click="again">
                    <img src="https://img.hongrenshuo.com.cn/h5/colorpi-viewBtn-ymz.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Toast from 'assets/js/toast'
    import {ymzBaseFun, na} from 'assets/js/common'

    var num;
    num = Math.random() * 6 + 1;
    num = parseInt(num, 10);
    import 'assets/js/jquery.min.js'

    let shareTitle = '您有一条专属彩虹屁待认领';
    let shareDesc = '下载克拉克拉APP，收听你的语音彩虹屁';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/colorpi-wxshare-ymz.jpg';
    let timeOutEvent;
    export default {
        data() {
            return {
                dataURL: '',
                rightpng: 1,
                percent: 1,
                showView1: true,
                showView2: false,
                showView3: false,
                chooseIndex: 1,
                showIndex: 2, //女生
                nickName: '',
                writeMiddleData: [
                    `<span class="span2">不是我吹，<br/></span><span class="span1">我有着</span><span class="span2">全世界最好看<br/></span><span class="span2">的眼睛<br/> </span><span class="span1">因为我</span><span class="span2">眼里</span><span class="span1">都是<br/></span><span class="span3">XXX</span>`,
                    `<span class="span3">XXX<br/></span><span class="span1">请不要再出现在我面前，<br/></span><span class="span2">太刺眼！<br/></span> <span class="span1">像你这种</span><span class="span2">闪闪发光</span><span class="span1">的人<br/></span><span class="span1">自己心里</span> <span class="span2">没点数吗？</span>`,
                    `<span class="span2">非战斗人员<br/></span><span class="span1">请快远离<br/></span><span class="span3">XXX<br/></span><span class="span1">这个人的</span><span class="span2">美貌<br/></span><span class="span1">又</span><span class="span2">爆发了</span>`,
                    `<span class="span3">XXX<br/></span><span class="span2">你不热吗？<br/></span><span class="span2">作为 </span><span class="span1">这么多人的<br/></span><span class="span2">生命之光<br/></span><span class="span3">欲望之火</span>`,
                    `<span class="span2">我希望<br/></span><span class="span3">XXX</span><span class="span1">这种人<br/></span><span class="span1">以后少出门<br/></span><span class="span1">除了</span><span class="span2">偷走</span><span class="span1">别人的</span><span class="span2">心<br/></span><span class="span1">就是</span><span class="span2">吸引</span><span class="span1">别人犯罪</span>`,
                    `<span class="span1">我的选择恐惧症<br/></span><span class="span3">被治好了<br/></span><span class="span2">最好看的、最可爱的<br/></span><span class="span2">最温柔的、最诱人的<br/></span><span class="span1">都选</span><span class="span3">XXX<br/></span><span class="span1">就可以了</span>`,
                    `<span class="span1">我以前可能是个</span><span class="span2">色盲<br/></span><span class="span1">因为我只有在见到<br/></span><span class="span3">XXX</span><span class="span1">的时候才发现<br/></span><span class="span2">世界如此<br/></span><span class="span2">缤纷多彩</span>`,
                    `<span class="span3">XXX</span><span class="span1">这个人<br/></span><span class="span2">绝对有问题！<br/></span><span class="span1">我每次看到他浑身就变得<br/></span><span class="span2">软绵绵的 </span><span class="span1">喝白开水有</span><span class="span2">甜味<br/></span><span class="span1">云朵都变成</span><span class="span2">粉红色</span><span class="span1">了</span>`,
                    `<span class="span2">因为</span><span class="span3">XXX<br/></span><span class="span2">我开始讨厌人类了！<br/></span><span class="span2">不管走到哪里<br/></span><span class="span2">都有情敌</span>`,
                    `<span class="span1">我希望</span><span class="span3">XXX</span><span class="span1">适可而止<br/></span><span class="span1">作为</span><span class="span2">颜值</span><span class="span1">标杆</span><span class="span1">把标准定那么高<br/></span><span class="span1">让我们普通人<br/></span><span class="span2">怎么办？</span>`,
                    `<span class="span3">XXX</span><span class="span2">这个人<br/></span><span class="span3">可不简单！<br/></span><span class="span2">DNA</span><span class="span1">居然不是由核苷酸<br/></span><span class="span2">组成的，而是</span><span class="span3">美貌</span>`,
                    `<span class="span3">XXX<br/></span><span class="span2">你不要笑了！<br/></span><span class="span2">你一笑我就<br/></span><span class="span2">什么都想<br/></span><span class="span3">给你</span>`,
                    `<span class="span3">XXX</span><span class="span1">你真的</span><span class="span2">害惨我了<br/></span><span class="span1">遇到你之后我的人生<br/></span><span class="span1">就有了</span><span class="span2">两个</span><span class="span1">难以平息的<br/></span><span class="span2">渴望<br/></span><span class="span2">得到你，你。</span>`,
                    `<span class="span3">XXX</span><span class="span1">你真的</span><span class="span2">害惨我了<br/></span><span class="span1">遇到你之后我的人生<br/></span><span class="span1">就有了</span><span class="span2">两个</span><span class="span1">难以平息的<br/></span><span class="span2">渴望<br/></span><span class="span2">得到你，你。</span>`,
                    `<span class="span3">XXX</span><span class="span1">的存在不需要</span><span class="span2">意义<br/></span><span class="span1">因为有的人生来<br/></span><span class="span1">就是让人</span><span class="span2">崇拜</span><span class="span1">和<br/></span><span class="span2">爱慕的</span>`,
                    `<span class="span2">人间很美啊<br/></span><span class="span1">有山有水</span><span class="span2">有我<br/></span><span class="span3">XXX</span><span class="span1">也应该<br/></span><span class="span2">多下凡<br/></span><span class="span1">来</span><span class="span2">看看</span>`,
                    `<span class="span3">XXX</span><span class="span1">你能不能<br/></span><span class="span1">不要</span><span class="span2">自恋了！<br/></span><span class="span1">有照镜子的时间<br/></span><span class="span1">多出来</span><span class="span2">见见</span><span class="span1">我们<br/></span><span class="span2">好东西</span><span class="span1">要大家一起</span><span class="span2">分享</span><span class="span1">啊</span>`,
                    `<span class="span1">现在的</span><span class="span2">天气预报</span><span class="span1">不准确<br/></span><span class="span1">都没有</span><span class="span2">预报<br/></span><span class="span2">今天会有<br/></span><span class="span3">XXX<br/></span><span class="span1">的</span><span class="span2">美貌暴风</span>`,
                    `<span class="span3">啊！<br/></span><span class="span1">快</span><span class="span2">拉响</span><span class="span1">一级<br/></span><span class="span2">美貌警报！<br/></span><span class="span3">XXX</span><span class="span2">来了！</span>`,
                    `<span class="span3">XXX</span><span class="span1">你怎么还不满足啊？<br/></span><span class="span2">日月星辰</span><span class="span1">都在你的<br/></span><span class="span2">眼睛</span><span class="span1">里了<br/></span><span class="span1">连我的</span><span class="span2">心<br/></span><span class="span2">也要偷去</span><span class="span1">吗？ </span>`,
                    `<span class="span2">网络黑客</span><span class="span1">黑了我的电脑<br/></span><span class="span2">结果<br/></span><span class="span1">只拷走了我的</span><span class="span2">珍藏</span><span class="span1">的<br/></span><span class="span3">XXX</span><span class="span2">自拍<br/></span><span class="span1">其他</span><span class="span2">啥也没动</span>`,
                    `<span class="span1">我永远不会<br/></span><span class="span2">屈服于美色<br/></span><span class="span1">不然我就是</span><span class="span2">狗<br/></span><span class="span1">直到</span><span class="span2">遇见</span><span class="span1">了</span><span class="span3">XXX<br/></span><span class="span2">汪汪汪！</span>`,
                    `<span class="span1">我和同事争论</span><span class="span1">世界上</span><span class="span2">有没有<br/></span><span class="span1">从</span><span class="span2">漫画</span><span class="span1">中走出来的人<br/></span><span class="span1">同事说</span><span class="span3">XXX</span><span class="span1">就是，</span><span class="span1">我说</span><span class="span2">屁！<br/></span><span class="span3">XXX</span><span class="span1">分明是从<br/></span><span class="span2">诗经</span><span class="span1">中走出来的！</span>`,
                    `<span class="span1">以前一直以为自己<br/></span><span class="span2">身体很好<br/></span><span class="span1">直到遇见了</span><span class="span3">XXX<br/></span><span class="span2">才发现<br/></span><span class="span1">我</span><span class="span2">TM</span><span class="span1">根本没有<br/></span><span class="span2">抵抗力</span>`,
                    `<span class="span1">每天面对<br/></span><span class="span1">世间</span><span class="span2">凡夫俗子<br/></span><span class="span2">会累吗？<br/></span><span class="span1">你问问</span><span class="span3">XXX<br/></span><span class="span1">就</span><span class="span2">知道</span><span class="span1">了</span>`,
                    `<span class="span1">别人衣服上的</span><span class="span2">扣子<br/></span><span class="span1">都是用来</span><span class="span2">系</span><span class="span1">的<br/></span><span class="span1">而</span><span class="span3">XXX</span><span class="span1">的扣子<br/></span><span class="span1">是用来</span><span class="span2">引人犯罪</span><span class="span1">的</span>`,
                    `<span class="span1">别人衣服上的</span><span class="span2">扣子<br/></span><span class="span1">都是用来</span><span class="span2">系</span><span class="span1">的<br/></span><span class="span1">而</span><span class="span3">XXX</span><span class="span1">的扣子<br/></span><span class="span1">是用来</span><span class="span2">引人犯罪</span><span class="span1">的</span>`,
                    `<span class="span2">全城通缉<br/></span><span class="span1">现搜捕一名</span><span class="span2">放心纵火犯<br/></span><span class="span1">特征：</span><span class="span1">无论男女都<br/></span><span class="span2">见之倾心 </span><span class="span1">姓名：</span><span class="span3">XXX<br/></span><span class="span1">请广大市民谨慎出行</span>`,
                    `<span class="span3">XXX<br/></span><span class="span1">自从遇见你之后<br/></span><span class="span1">我的生活就</span><span class="span2">索然无味</span><span class="span1">了<br/></span><span class="span1">见山是你，见水是你<br/></span><span class="span1">万物都是</span><span class="span2">你</span><span class="span1">的模样</span>`,
                    `<span class="span1">据悉，本市最大</span><span class="span2">制糖厂</span><span class="span1">老板<br/></span><span class="span3">XXX</span><span class="span1">的</span><span class="span2">制胜秘诀<br/></span><span class="span2">竟然是<br/></span><span class="span1">靠</span><span class="span2">微笑</span><span class="span1">提高</span><span class="span2">甜度</span>`,
                    `<span class="span1">当初要是由</span><span class="span3">XXX<br/></span><span class="span1">来教我</span><span class="span2">语文<br/></span><span class="span1">我可能早就<br/></span><span class="span1">成为一位</span><span class="span2">知名</span><span class="span1">的<br/></span><span class="span2">诗人</span><span class="span1">了</span>`,
                    `<span class="span1">像是</span><span class="span3">XXX</span><span class="span1">这种人<br/></span><span class="span1">就不能</span><span class="span2">细看<br/></span><span class="span1">看的</span><span class="span2">越细</span><span class="span1">，优点</span><span class="span2">越多<br/></span><span class="span1">让我们普通人<br/></span><span class="span2">怎么活</span>`,
                    `<span class="span1">我凭实力</span><span class="span2">单的身<br/></span><span class="span3">XXX</span><span class="span1">居然妄图用<br/></span><span class="span1">一个</span><span class="span2">微笑</span><span class="span1">撼动我？<br/></span><span class="span2">呵，可笑！</span><span class="span1">我去买情侣装了</span>`,
                    `<span class="span1">如果不是</span><span class="span2">爱的深<span class="span1">了<br/></span><span class="span1">谁愿意做</span><span class="span2">舔狗<span class="span1">呢？<br/></span><span class="span2">毕竟<br/></span><span class="span3">XXX</span><span class="span1">从小到大<br/></span><span class="span1">根本不缺人</span><span class="span2">舔</span>`,
                    `<span class="span1">今天</span><span class="span3">XXX<span class="span1">经过时<br/></span><span class="span2">瞥</span><span class="span1">了我一眼<br/><span class="span2">一瞬间</span><span class="span1">，我连以后孩子<br/></span><span class="span2">叫啥名</span><span class="span1">都想好了</span>`,
                    `<span class="span3">XXX</span><span class="span1">的父母一定是<br/><span class="span2">反侦察</span><span class="span1">的高手<br/></span><span class="span1">不然怎么可能<br/><span class="span1">防得住</span><span class="span2">一波又一波<br/></span><span class="span2">偷孩子</span><span class="span1">的人？</span>`,
                    `<span class="span2">猝死</span><span class="span1">不是当代青少年<br/><span class="span1">担忧的</span><span class="span2">问题<br/></span><span class="span2">日渐脱发<span class="span1">的人生与<br/></span><span class="span1">无法拥有</span><span class="span3">XXX<br/></span><span class="span1">的</span><span class="span2">双重暴击</span><span class="span1">才是</span>`,
                    `<span class="span1">夸</span><span class="span2">喜欢<span class="span1">的人时<br/></span><span class="span1">语言会变得</span><span class="span2">匮乏<br/><span class="span2">就像我<br/></span><span class="span1">一看见</span><span class="span3">XXX<br/></span><span class="span1">就说不出话</span>`,
                    `<span class="span1">每次看到</span><span class="span3">XXX<br/><span class="span2">都会变重<br/></span><span class="span1">因为</span><span class="span2">爱您<span class="span1">的心<br/></span><span class="span1">又</span><span class="span2">胖了</span><span class="span1">几斤</span>`,
                
                ],
                writeManData: [
                    `<span class="span1">大家见到</span><span class="span3">XXX<br/></span><span class="span1">都扭头装作</span><span class="span2">不认识，<br/></span><span class="span1">不愿意再多说</span><span class="span2">一句话。<br/></span><span class="span1">因为对视他的眼睛就<br/></span><span class="span2">沉迷</span><span class="span1">到无法呼吸</span>`,
                    `<span class="span1">答应要送</span><span class="span2">女朋友</span><span class="span1">礼物，<br/></span> <span class="span1">结果钱包里只有<br/></span><span class="span1">一张</span><span class="span2">一元钞票。<br/></span><span class="span3">XXX</span><span class="span1">拿出了</span><span class="span2">烫金的<br/></span><span class="span3">黑卡</span><span class="span1">。递给</span><span class="span2">凯迪拉克</span><span class="span1">的店员，<br/></span><span class="span1">说了声：</span><span class="span2">随便刷</span><span class="span1"></span>`,
                    `<span class="span1">你们老说</span><span class="span3">XXX</span><span class="span2">自恋，<br/></span><span class="span1">可是他除了</span><span class="span2">大长腿，<br/></span><span class="span2">长得帅</span><span class="span1">还有钱之外，<br/></span><span class="span1">就</span><span class="span2">再没有</span><span class="span1">什么可以<br/></span><span class="span2">炫</span><span class="span1">的了。</span> `,
                    `<span class="span1">上帝透过</span><span class="span3">XXX</span><span class="span1">的眼睛<br/></span><span class="span2">看了眼世界<br/></span><span class="span1">我就突然</span><span class="span2">领悟</span><span class="span1">到了<br/></span><span class="span2">什么叫</span><span class="span3">神爱世人</span>`,
                    `<span class="span3">XXX</span><span class="span1">出门旅游<br/></span><span class="span2">划船<br/></span><span class="span1">从来不用</span><span class="span2">桨<br/></span><span class="span1">他这一生<br/></span><span class="span2">全靠浪</span>`,
                    `<span class="span1">如果</span><span class="span3">XXX</span><span class="span1">是我的梦想<br/></span><span class="span1">那是不是</span><span class="span2">四舍五入<br/></span><span class="span1">他就是</span><span class="span2">全世界</span><span class="span1">的梦了？<br/></span><span class="span1">毕竟</span><span class="span2">同一个世界<br/></span><span class="span2">同一个梦想</span>`,
                    `<span class="span3">XXX</span><span class="span1">让想念与心动<br/></span><span class="span1">具备了</span><span class="span2">超能力<br/></span><span class="span2">一想念</span><span class="span1">就会想起</span><span class="span1">他的</span><span class="span2">超能力</span>`,
                    `<span class="span1">想在</span><span class="span3">XXX</span><span class="span1">的鼻梁上<br/></span><span class="span2">滑滑梯<br/></span><span class="span2">从早到晚<br/></span><span class="span3">不知疲惫</span>`,
                    `<span class="span1">去什么</span><span class="span2">马尔代夫<br/></span><span class="span3">XXX</span><span class="span1">的锁骨里<br/></span><span class="span1">还不够你</span><span class="span2">游泳</span><span class="span1">嘛？ </span>`,
                    `<span class="span2">人丑</span><span class="span1">就该多读书<br/></span><span class="span1">难怪</span><span class="span2">从小到大<br/></span><span class="span1">所有人都说<br/></span><span class="span3">XXX</span><span class="span1">不是读书的材料</span>`,
                    `<span class="span1">那些人就知道<br/></span><span class="span2">诋毁</span><span class="span3">XXX</span><span class="span2">矮<br/></span><span class="span1">成天说什么<br/></span><span class="span1">他</span><span class="span2">才高八斗<br/></span><span class="span2">八斗</span><span class="span1">才多高？</span>`,
                    `<span class="span2">学富五车</span><span class="span1">是什么意思？<br/></span><span class="span1">不就是像</span><span class="span3">XXX</span><span class="span1">他这样<br/></span><span class="span1">不仅有</span><span class="span2">学识<br/></span><span class="span1">家里还有</span><span class="span2">五辆豪车</span><span class="span1">吗？</span>`,
                    `<span class="span1">生活总让</span><span class="span3">XXX</span><span class="span1">感觉<br/></span><span class="span2">透不过气<br/></span><span class="span1">毕竟</span><span class="span2">存款的数字<br/></span><span class="span1">要一口气</span><span class="span2">念完<br/></span><span class="span1">还是不容易的</span>`,
                    `<span class="span3">屎</span><span class="span1">一样的手机<br/></span><span class="span1">因为用了</span><span class="span3">XXX</span><span class="span1">的</span><span class="span2">自拍<br/></span><span class="span2">做屏保<br/></span><span class="span1">卖出了</span><span class="span2">天价</span>`,
                    `<span class="span1">像我这种与生俱来的<br/></span><span class="span2">有钱人<br/></span><span class="span1">为什么还要跟</span><span class="span3">XXX<br/></span><span class="span2">做朋友？<br/></span><span class="span1">因为他不仅</span><span class="span2">有钱<br/></span><span class="span2">还很帅！</span><span class="span1">太气人！</span>`,
                    `<span class="span3">XXX</span><span class="span1">可能觉得<br/></span><span class="span2">丘比特</span><span class="span1">的箭<br/></span><span class="span1">不足以</span><span class="span2">射穿</span><span class="span1">人心<br/></span><span class="span1">所以选了用</span><span class="span2">大炮轰</span>`,
                    `<span class="span2">我不能接受<br/></span><span class="span1">都是</span><span class="span2">腰间盘<br/></span><span class="span1">凭什么每次都是<br/></span><span class="span3">XXX</span><span class="span1">那么</span><span class="span1">突出！<br/></span><span class="span2">拍照</span><span class="span1">都拍他了！</span>`,
                    `<span class="span2">可怕</span><span class="span1">的不是<br/></span><span class="span3">XXX</span><span class="span1">本身有多优秀<br/></span><span class="span1">而是每次我跟他<br/></span><span class="span2">站在一起<br/></span><span class="span2">就显得</span><span class="span1">他</span><span class="span2">更优秀</span><span class="span1">了</span>`,
                    `<span class="span2">上帝</span><span class="span1">怎么可以这样对</span><span class="span3">XXX<br/></span><span class="span1">活了</span><span class="span2">小半辈子<br/></span><span class="span1">竟然除了</span><span class="span2">帅<br/></span><span class="span2">一无是处</span>`,
                    `<span class="span3">XXX</span><span class="span1">真是</span><span class="span2">灾星！<br/></span><span class="span1">这个月不知道多少<br/></span><span class="span2">小姑娘</span><span class="span1">为了</span><span class="span2">偷拍他<br/></span><span class="span1">被</span><span class="span2">马路牙子</span><span class="span1">给撂倒了</span>`,
                    `<span class="span1">飞机上的人看到</span><span class="span3">XXX</span><span class="span1">站起来<br/></span><span class="span1">都纷纷</span><span class="span2">起身<br/></span><span class="span1">从包里</span><span class="span2">掏出家伙</span><span class="span1">冲向他<br/></span><span class="span1">毕竟</span><span class="span2">这么帅</span><span class="span1">的人<br/></span><span class="span1">谁不想</span><span class="span2">合个影</span><span class="span1">呢？</span>`,
                    `<span class="span1">别动不动就喊</span><span class="span3">XXX<br/></span><span class="span2">男神<br/></span><span class="span1">他</span><span class="span2">不能<br/></span><span class="span1">随便</span><span class="span2">在人间<br/></span><span class="span2">暴露身份</span>`,
                    `<span class="span1">不要再</span><span class="span2">喊着<br/></span><span class="span1">给</span><span class="span3">XXX</span><span class="span2">生猴子</span><span class="span1">了<br/></span><span class="span1">他这么</span><span class="span2">帅<br/></span><span class="span1">生出来的怎么可能<br/></span><span class="span1">是个普通的</span><span class="span2">猴子</span>`,
                    `<span class="span3">XXX</span><span class="span1">永远都是公司中<br/></span><span class="span1">最</span><span class="span2">勤奋刻苦</span><span class="span1">的人<br/></span><span class="span1">毕竟他再不努力<br/></span><span class="span1">就要回去</span><span class="span2">继承</span><span class="span1">他爸的<br/></span><span class="span2">百亿</span><span class="span1">的</span><span class="span2">家业</span><span class="span1">了</span>`,
                    `<span class="span1">朋友吐槽</span><span class="span3">XXX</span><span class="span1">出门<br/></span><span class="span2">总打车，</span><span class="span1">却不知道这样<br/></span><span class="span1">比他家车库里</span><span class="span2">50辆跑车</span><span class="span1">中<br/></span><span class="span2">选出</span><span class="span1">一辆来<br/></span><span class="span2">快得多</span>`,
                    `<span class="span1">如果让我在<br/></span><span class="span2">500万</span><span class="span1">跟</span><span class="span3">XXX</span><span class="span1">中<br/></span><span class="span1">选一个，我选</span><span class="span2">后者<br/></span><span class="span1">毕竟他的</span><span class="span2">颜值就不止<br/></span><span class="span1">只值</span><span class="span2">500万</span><span class="span1">了</span>`,
                    `<span class="span1">都是</span><span class="span2">女娲</span><span class="span1">甩出来的<br/></span><span class="span2">泥点子<br/></span><span class="span1">为什么</span><span class="span2">独独<br/></span><span class="span3">XXX<br/></span><span class="span2">长的</span><span class="span1">这么</span><span class="span2">精致</span>`,
                    `<span class="span1">不知道警察叔叔会不会<br/></span><span class="span1">给我一个</span><span class="span2">见义勇为</span><span class="span1">奖<br/></span><span class="span1">毕竟我</span><span class="span2">扣下</span><span class="span1">了<br/></span><span class="span3">XXX</span><span class="span1">这个<br/></span><span class="span2">芳心纵火犯</span>`,
                    `<span class="span2">各位男士<br/></span><span class="span1">平时不要把自己</span><span class="span2">女朋友<br/></span><span class="span2">看那么紧<br/></span><span class="span1">毕竟她们偶遇</span><span class="span3">XXX<br/></span><span class="span1">的概率也不会</span><span class="span2">很高</span>`,
                    `<span class="span2">人好看吧<br/></span><span class="span1">就像朵</span><span class="span2">花<br/></span><span class="span3">XXX</span><span class="span1">的胡渣<br/></span><span class="span1">都像是</span><span class="span2">玫瑰花<br/></span><span class="span2">娇艳</span><span class="span1">的</span><span class="span2">刺</span>`,
                ],
                writeWomenData: [
                    `<span class="span1">自从那日见识了<br/></span><span class="span3">XXX</span><span class="span2">惊世骇俗<br/></span><span class="span1">的美貌，</span><span class="span1">我便向华佗打听，<br/></span><span class="span1">如何才能不对她</span><span class="span2">相思成疾。<br/></span><span class="span1">华佗说：</span><span class="span2">治不了，</span><span class="span2">等死吧，<br/></span><span class="span3">告辞！</span>`,
                    `<span class="span2">史学家</span><span class="span1">最新研究表明，<br/></span><span class="span1">郑和下西洋的真实目的<br/></span><span class="span1">很可能是</span><span class="span2">追星。<br/></span><span class="span1">因为他曾在</span><span class="span3">XXX</span><span class="span1">的微博下方<br/></span><span class="span2">评论：</span><span class="span1">为你我用尽大明的积蓄，<br/></span><span class="span1">漂洋过海来看你。</span> `,
                    `<span class="span2">美貌</span><span class="span1">会</span><span class="span2">进化？ </span><span class="span1">我不信。<br/></span><span class="span1">直到我遇到了</span><span class="span3">XXX<br/></span><span class="span1">才发现，美貌不光会</span><span class="span2">进化，<br/></span><span class="span1">它还会</span><span class="span2">超进化。</span> `,
                    `<span class="span2">从</span><span class="span3">XXX</span><span class="span2">这<br/></span><span class="span1">我总算知道什么叫</span><span class="span2">聪明</span><span class="span1">了<br/></span><span class="span1">以后有机会<br/></span><span class="span1">希望她可以</span><span class="span2">教教我</span>`,
                    `<span class="span3">XXX</span><span class="span1">这个人</span><span class="span2">向来<br/></span><span class="span2">不守规矩<br/></span><span class="span1">毕竟长的</span><span class="span2">好看<br/></span><span class="span1">真的可以<br/></span><span class="span2">为所欲为</span>`,
                    `<span class="span1">那天我同事说<br/></span><span class="span3">XXX</span><span class="span1">长得比较</span><span class="span2">一般<br/></span><span class="span1">我二话不说<br/></span><span class="span2">立刻</span><span class="span1">给他买了条<br/></span><span class="span2">导盲犬</span>`,
                    `<span class="span1">都说有什么样的</span><span class="span2">父母<br/></span><span class="span1">就有什么样的</span><span class="span2">孩子<br/></span><span class="span1">那我很难想象</span><span class="span3">XXX </span><span class="span1">的<br/></span><span class="span2">父母</span><span class="span1">得</span><span class="span2">优秀</span><span class="span1">成什么样子！</span>`,
                    `<span class="span3">XXX</span><span class="span1">一定是个<br/></span><span class="span1">很</span><span class="span2">挑剔</span><span class="span1">的人<br/></span><span class="span2">不然</span><span class="span1">怎么会<br/></span><span class="span2">净挑</span><span class="span1">她爸妈的<br/></span><span class="span2">优点</span><span class="span1">长</span>`,
                    `<span class="span1">哪怕</span><span class="span2">只有一天<br/></span><span class="span1">我也想用</span><span class="span3">XXX</span><span class="span1">这张<br/></span><span class="span2">盛世美颜<br/></span><span class="span2">活</span><span class="span1">一次</span>`,
                    `<span class="span2">只有我知道<br/></span><span class="span3">XXX</span><span class="span1">每天坚持熬夜<br/></span><span class="span1">并非</span><span class="span2">不想睡<br/></span><span class="span1">而是因为，她的</span><span class="span2">美貌<br/></span><span class="span1">早已习惯了</span><span class="span2">24小时营业</span>`,
                    `<span class="span1">小时候</span><span class="span3">XXX</span><span class="span1">以为<br/></span><span class="span2">全世界</span><span class="span1">都喜欢她<br/></span><span class="span2">长大后</span><span class="span1">她才发现<br/></span><span class="span2">是</span><span class="span3">全宇宙</span>`,
                    `<span class="span1">那天朋友说我的</span><span class="span2">美貌</span><span class="span1">不及<br/></span><span class="span3">XXX</span><span class="span1">的</span><span class="span2">万分之一<br/></span><span class="span1">我抄起椅子，</span><span class="span2">放到</span><span class="span1">了<br/></span><span class="span2">他屁股</span><span class="span1">后面<br/></span><span class="span1">“您批评的是，快坐下细说”</span>`,
                    `<span class="span3">XXX</span><span class="span1">，你会唱</span><span class="span2">小星星</span><span class="span1">吗？<br/></span><span class="span3">不会？<br/></span><span class="span1">你们这些</span><span class="span2">闪闪发光</span><span class="span1">的<br/></span><span class="span2">星星</span><span class="span1">都不会</span><span class="span2">自我介绍</span><span class="span1">的吗？</span>`,
                    `<span class="span3">XXX</span><span class="span1">从小</span><span class="span2">存在感</span><span class="span1">就很低<br/></span><span class="span1">因为每个见过她的人<br/></span><span class="span2">都会说：<br/></span><span class="span1">这样的</span><span class="span2">颜值<br/></span><span class="span1">是</span><span class="span2">真实</span><span class="span1">存在的吗？</span>`,
                    `<span class="span3">XXX</span><span class="span1">不小心在工作群里<br/></span><span class="span1">上传了一张</span><span class="span2">自拍<br/></span><span class="span1">同事们纷纷掏出手机<br/></span><span class="span2">抱怨道：<br/></span><span class="span1">总算又等到<br/></span><span class="span1">换</span><span class="span2">手机壁纸</span><span class="span1">的时间了</span>`,
                    `<span class="span3">XXX</span><span class="span1">刚刚拒绝了<br/></span><span class="span1">吴彦祖的</span><span class="span2">表白<br/></span><span class="span1">吴彦祖生气的说：好！我</span><span class="span2">告诉</span><span class="span1">你！<br/></span><span class="span1">过了这个村<br/></span><span class="span1">我在下个村</span><span class="span2">等你！</span>`,
                    `<span class="span1">我一直不敢相信<br/></span><span class="span3">XXX</span><span class="span1">说的话<br/></span><span class="span1">就像</span><span class="span2">张无忌</span><span class="span1">他妈说的<br/></span><span class="span1">越</span><span class="span2">漂亮</span><span class="span1">的女人<br/></span><span class="span2">越会骗人</span>`,
                    `<span class="span1">书中的</span><span class="span2">颜如玉</span><span class="span1">什么样<br/></span><span class="span2">我不知道<br/></span><span class="span1">不过要是长得<br/></span><span class="span1">跟</span><span class="span3">XXX</span><span class="span1">似的<br/></span><span class="span1">我至于每天</span><span class="span2">搬砖？</span>=`,
                    `<span class="span1">不要动不动就</span><span class="span2">吹<br/></span><span class="span3">XXX</span><span class="span1">长得多</span><span class="span1">漂亮</span><span class="span1">了<br/></span><span class="span1">毕竟</span><span class="span2">说实话<br/></span><span class="span1">不算</span><span class="span2">吹牛皮</span>`,
                    `<span class="span1">喜欢</span><span class="span3">XXX？<br/></span><span class="span2">不存在的<br/></span><span class="span1">这辈子<br/></span><span class="span1">不可能喜欢</span><span class="span3">XXX<br/></span><span class="span1">毕竟是</span><span class="span2">每一辈子<br/></span><span class="span1">都喜欢的人啊</span>`,
                    `<span class="span1">每次看着</span><span class="span3">XXX</span><span class="span1">我都<br/></span><span class="span2">吃不下饭</span><span class="span1">了<br/></span><span class="span1">那时候我才知道<br/></span><span class="span2">古人</span><span class="span1">没骗我<br/></span><span class="span2">秀色可餐</span><span class="span1">居然是</span><span class="span2">真的</span>`,
                    `<span class="span1">我一直都很</span><span class="span2">脸盲<br/></span><span class="span1">就像我</span><span class="span2">分不清<br/></span><span class="span3">XXX</span><span class="span1">跟</span><span class="span2">王祖贤<br/></span><span class="span1">长得都那么<br/></span><span class="span3">好看</span>`,
                    `<span class="span1">早知道</span><span class="span2">做人<br/> </span><span class="span2">这么累<br/></span><span class="span1">当初我就</span><span class="span2">不应该<br/></span><span class="span1">让</span><span class="span3">XXX<br/></span><span class="span2">下凡</span><span class="span1">了</span>`,
                    `<span class="span1">听说</span><span class="span3">XXX</span><span class="span1">被蜜蜂</span><span class="span2">蛰</span><span class="span1">了<br/></span><span class="span1">这</span><span class="span2">蜜蜂</span><span class="span1">也是</span><span class="span2">有眼光<br/></span><span class="span2">百花丛中</span><span class="span1">挑了<br/></span><span class="span1">最</span><span class="span2">娇艳</span><span class="span1">的那一朵</span>`,
                    `<span class="span3">XXX</span><span class="span1">一定是个</span><span class="span2">包容</span><span class="span1">的人<br/></span><span class="span1">因为你看这双</span><span class="span2">眼睛</span><span class="span1">里<br/></span><span class="span1">有</span><span class="span2">星辰大海<br/></span><span class="span2">宇宙洪荒<br/></span><span class="span1">跟</span><span class="span2">渺小</span><span class="span1">的我</span>`,
                    `<span class="span1">生活总是那么</span><span class="span2">丧<br/></span><span class="span1">直到遇到</span><span class="span3">XXX<br/></span><span class="span1">才知道我过去</span><span class="span2">二十年<br/></span><span class="span2">积攒的运气<br/></span><span class="span1">都用在哪儿 </span>`,
                    `<span class="span3">XXX</span><span class="span1">可不可以<br/></span><span class="span1">不要总在</span><span class="span2">朋友圈<br/></span><span class="span2">发自拍</span><span class="span1">了！<br/></span><span class="span1">要不是只能点一次</span><span class="span2">赞<br/></span><span class="span2">屏幕</span><span class="span1">可能已经</span><span class="span2">碎了！</span>`,
                    `<span class="span1">最近几天</span><span class="span2">失眠</span><span class="span1">越发严重<br/></span><span class="span1">不是因为窗外<br/></span><span class="span1">皎洁的</span><span class="span2">月亮<br/></span><span class="span1">而是因为</span><span class="span3">XXX</span><span class="span1">的</span><span class="span2">美貌<br/></span><span class="span1">在深夜中闪闪</span><span class="span2">发光</span>`,
                    `<span class="span1">今天的</span><span class="span3">XXX<br/></span><span class="span2">这么美<br/></span><span class="span1">谁又能</span><span class="span2">比得过</span><span class="span1">呢？<br/></span><span class="span2">自然是<br/></span><span class="span1">明天的</span><span class="span3">XXX</span>`,
                    `<span class="span1">PM2.5又</span><span class="span2">爆表</span><span class="span1">了<br/></span><span class="span1">但是一</span><span class="span2">想到<br/></span><span class="span1">能跟</span><span class="span3">XXX</span><span class="span1">呼吸着<br/></span><span class="span1">同一片</span><span class="span2">雾霾<br/></span><span class="span1">竟然觉得很开心</span>`,
                    `<span class="span3">XXX</span><span class="span1">这样的人<br/></span><span class="span1">就活该</span><span class="span2">单身<br/></span><span class="span1">毕竟我不能拥有的<br/></span><span class="span3">仙女</span><span class="span1">别人也</span><span class="span2">不配</span>`,
                ],
                writeData: []
            }
        },
        created() {
            let that = this;
            ymzBaseFun.wxShareVue(shareTitle,shareDesc,shareImageUrl);
            this.timer = setInterval(function () {
                if (that.percent < 100) {
                    that.percent++;
                } else {
                    that.showView1 = false;
                    that.showView2 = true;
                    clearInterval(that.timer);

                }
            }, 20);
//            this.canvassFun();
        },
        mounted() {
        },
        methods: {
            gtouchstart:function gtouchstart(){
                let vm = this;
                timeOutEvent = setTimeout(function(){
                    vm.longPress()
                },500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
                return false;
            },
            //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
            gtouchend:function gtouchend(item){
                clearTimeout(timeOutEvent);//清除定时器
                return false;
            },
            //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
            gtouchmove:function gtouchmove(){
                clearTimeout(timeOutEvent);//清除定时器
                timeOutEvent = 0;
            },

            //真正长按后应该执行的内容
            longPress:function longPress(){
                timeOutEvent = 0;
                _hmt.push(['_trackEvent', '长按', '点击']);
                console.log('长按')
            },
            get_strlength: function (str) {
                var len = 0;
                if (str.match(/[^ -~]/g) == null) {
                    len = str.length;
                }
                else {
                    len = str.length + str.match(/[^ -~]/g).length;
                }
                return len;
            },
            fixlocation: function () {
                setTimeout(() => {
                    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                }, 100);
            },
            suiFun: function (index) {
                var num = Math.random() * index + 1;
                num = parseInt(num, 10);
                return num
            },
            chooseIndexFun: function (index) {
                this.showIndex = index;
            },
            goFun: function () {
                _hmt.push(['_trackEvent', '点击生成', '点击']);
                if (this.nickName == '') {
                    Toast({
                        message: '请输入名字',
                        position: 'center',
                        duration: 1000
                    })
                    return
                }
                if(this.get_strlength(this.nickName)>10){
                    Toast({
                        message: '超出五个字符',
                        position: 'center',
                        duration: 1000
                    })
                    return
                }
                this.showView1 = false;
                this.showView2 = false;
                this.showView3 = true;

                if (this.showIndex == 1) {
                    this.writeData = this.writeManData;
                } else {
                    this.writeData = this.writeWomenData;
                }
                this.writeData = this.writeData.concat(this.writeMiddleData);
                this.rightpng = this.suiFun(4);
                this.chooseIndex = this.suiFun(this.writeData.length);
                this.writeData[this.chooseIndex - 1] = this.writeData[this.chooseIndex - 1].replace(/XXX/g, this.nickName);
                this.canvassFun();
            },
            canvassFun: function () {
                this.$nextTick(function () {
                    let content_html = document.getElementById('poster');　　　　//要转化的div
                    let width = content_html.offsetWidth;
                    let height = content_html.offsetHeight;
                    let offsetTop = content_html.offsetTop;
                    let canvas = document.createElement("canvas");
                    let context = canvas.getContext('2d');
                    let scaleBy = Math.ceil(window.devicePixelRatio);
                    scaleBy = 2;
                    canvas.width = width * scaleBy;
                    canvas.height = (height + offsetTop) * scaleBy;
                    context.scale(scaleBy, scaleBy);
                    var opts = {
                        allowTaint: true,//允许加载跨域的图片
                        tainttest: true, //检测每张图片都已经加载完成
                        scale: scaleBy, // 添加的scale 参数
                        canvas: canvas, //自定义 canvas
                        logging: false, //日志开关，发布的时候记得改成false
                        width: width, //dom 原始宽度
                        height: height //dom 原始高度
                    };
                    html2canvas(content_html, opts).then(function (canvas) {
                        canvas.style.width = width + "px";
                        canvas.style.height = height + "px";
                        var image = new Image();
                        $('#grow-img').attr('src', canvas.toDataURL());
                        setTimeout(function () {
                            $("#cav").css({
                                zIndex: 1000001
                            });
                            $("#cav img").css({
                                zIndex: 1000001
                            });
                            $('.contentIn').css('line-height', '1.5');
                        }, 500);
                    })
                })
            },
            again: function () {
                _hmt.push(['_trackEvent', '点击再来一次', '点击']);
                this.rightpng = this.suiFun(4);
                this.chooseIndex = this.suiFun(this.writeData.length);
                this.writeData[this.chooseIndex - 1] = this.writeData[this.chooseIndex - 1].replace(/XXX/g, this.nickName);
                this.showView2 = true;
                this.showView3 = false;
//                this.canvassFun();
            }
        },
        components: {},
        destroyed: function () {
            clearInterval(this.timer);
        }
    }
</script>

<style lang="scss">
    html, body {
        width: 100%;
        height: 100%;
    }

    #app {
        width: 100%;
        height: 100%;
        background: #f5b333;
        span {
            text-align: center;
        }
        .span1 {
            color: #000;
            font-size: 30px;
            font-weight: 500;
        }

        .span2 {
            color: #000;
            font-size: 56px;
            font-weight: 600;

        }
        .span3 {
            color: #000;
            font-size: 70px;
            font-weight: 700;
        }
        .view1 {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .imgout {
                width: 100%;
                height: 1171px;
                position: relative;
                img {
                    width: 100%;
                    height: auto;
                }
                .percent {
                    width: 83px;
                    text-align: center;
                    position: absolute;
                    left: 362px;
                    bottom: 52px;
                    font-size: 36px;
                    color: #fff;
                    text-shadow: 2px 2px 2px #2c4261;
                }
            }
        }
        .view2 {
            width: 100%;
            height: 100%;
            display: flex;
            /*align-items: center;*/
            justify-content: center;
            overflow: hidden;
            .imgout {
                width: 724px;
                height: 1184px;
                position: relative;
                margin-top: 30px;
                img {
                    width: 100%;
                    height: auto;
                }
                .inputOut {
                    width: 545px;
                    height: 60px;
                    position: absolute;
                    left: 115px;
                    bottom: 543px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    input {
                        width: 100%;
                        height: 100%;
                        background: transparent;
                        outline: none;
                        padding-left: 10px;
                        box-sizing: border-box;
                    }
                }
                .goBtn {
                    width: 100%;
                    height: 80px;
                    position: absolute;
                    left: 0;
                    bottom: 316px;
                }
                .pi {
                    width: 300px;
                    height: 300px;
                    position: absolute;
                    left: 0px;
                    bottom: 0px;
                }
                .cirtyOut {
                    width: 60px;
                    height: 60px;
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .cirty {
                        width: 20px;
                        height: 20px;
                        background: #222222;
                        border-radius: 50%;
                    }
                }
                .cirtyOut2 {
                    right: 221px;
                    bottom: 434px;
                }
                .cirtyOut1 {
                    left: 104px;
                    bottom: 434px;
                }
            }
        }
        .view3 {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            .content {
                position: relative;
                box-sizing: border-box;
                .imgOut {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 100%;
                    height: 100%;
                    transform: translate(-50%, -50%);
                    z-index: 1000;
                    opacity: 0;
                    #grow-img {
                        width: 100%;
                        height: auto;
                        z-index: 1000;
                    }
                }
                .topLeft {
                    position: absolute;
                    width: 258px;
                    height: 100px;
                    left: 60px;
                    top: 36px;
                    z-index: 100;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .contentBg {
                    width: 100%;
                    background: #f5b333;
                    padding-top: 65px;
                    box-sizing: border-box;
                    position: relative;
                    .pi {
                        position: absolute;
                        width: 258px;
                        height: 100px;
                        left: 60px;
                        top: 36px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .bg {
                        width: 743px;
                        height: 889px;
                        margin: 0 auto;
                    }
                    .contentIn {
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        line-height: 1.5 !important;
                        padding-top: 230px;
                        box-sizing: border-box;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }
                    .erwei {
                        width: 125px;
                        height: 125px;
                        position: absolute;
                        left: 130px;
                        bottom: 86px;
                        img {
                            width: 100%;
                            height: auto;
                        }
                    }

                    .topRight {
                        position: absolute;
                        img {
                            width: 100%;
                            height: auto;
                        }
                    }
                    .topRight1 {
                        width: 188px;
                        height: 148px;
                        right: 123px;
                        top: 54px;
                    }
                    .topRight2 {
                        width: 245px;
                        height: 169px;
                        right: 118px;
                        top: 24px;
                    }
                    .topRight3 {
                        width: 114px;
                        height: 141px;
                        right: 160px;
                        top: 60px;
                    }
                    .topRight4 {
                        width: 143px;
                        height: 158px;
                        right: 160px;
                        top: 37px;
                    }
                }
                .again {
                    width: 586px;
                    height: 94px;
                    margin: 30px auto 0;
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
            }
        }
    }
</style>

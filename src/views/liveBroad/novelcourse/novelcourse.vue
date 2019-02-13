<template>
    <div id="app">

        <div v-show="!showWx" class="appin">
            <div class="topimageOut">
                <Onepic :imgSrc="`https://img.hongrenshuo.com.cn/h5/novelcourse-image_01.png`"></Onepic>
            </div>

            <div class="des-content">
                同学你好，欢迎来到教程站~点击下列教程就可以开始学习啦！另外，带#小说教程#标签撰写教程，优秀教程不仅可以获得投喂，还有机会入选官方教程站哦
            </div>
            <div class="novel-content">
                <div class="novel-list-wraper">
                    <div class="novel-list">
                        <div class="swith-content">
                            <div class="swith-item" :class="period == 1?'swith-item-checked':''" @click="checkTab(1)">必 看</div>
                            <div class="swith-item" :class="period == 2?'swith-item-checked':''" @click="checkTab(2)">写 作</div>
                            <div class="swith-item" :class="period == 3?'swith-item-checked':''" @click="checkTab(3)">App使用</div>
                            <div class="swith-item" :class="period == 4?'swith-item-checked':''" @click="checkTab(4)">素 材</div>
                        </div>
                        <div class="novel-list-inner" v-show="period==1">
                            <div class="novel-list-item" @click="_goNovel(2343823208488,2343969640465)">
                                <div class="novel-cover">
                                    <img src="https://img.hongrenshuo.com.cn/20636554158281548386478456.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        新手常犯的对话体写作错误
                                    </div>
                                    <div class="novel-des">
                                        对话体小说怎么写？和常规小说有什么区别？看这里！
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343831515157,2343975489595)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548387461231.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        给新手的写作建议
                                    </div>
                                    <div class="novel-des">
                                        我是一个小萌新，该怎么开启我的创作之路？好苦恼啊。这些小建议，没准儿会帮到你。
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343842959398,2343956754461)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548388966995.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何获取免费正版图片
                                    </div>
                                    <div class="novel-des">
                                        使用背景图片，不能侵权是重点，教你如何获取免费正版图片！
                                    </div>
                                </div>
                            </div>

                            <div class="novel-list-item" @click="_goNovel(2343844909075,2343967723573)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548389269583.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何获取免费正版的音乐
                                    </div>
                                    <div class="novel-des">
                                        教你如何找到正版免费音乐
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343855206463,2343902711821)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548390507382.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何设置选项及选项剧情
                                    </div>
                                    <div class="novel-des">
                                        互动小说里选项当然少不了
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343860441145,2343907143719)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548391140431.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何正确运用剧情跳转功能
                                    </div>
                                    <div class="novel-des">
                                        剧情跳转让互动小说更完整
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="novel-list-inner" v-show="period==2">
                            <div class="novel-list-item" @click="_goNovel(2343478284320,2343479529503)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        常见的标点符号运用错误
                                    </div>
                                    <div class="novel-des">
                                        手把手教你如何规范使用标点符号，考试也能用得到哦！
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343484076064,2343484846088)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        常见的字词/语法错误
                                    </div>
                                    <div class="novel-des">
                                        该怎么写出规范的词句啊(T＿T)看完这个教程，你就明白啦。
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343823208488,2343969640465)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        新手常犯的对话体写作错误
                                    </div>
                                    <div class="novel-des">
                                        对话体小说怎么写？和常规小说有什么区别？看这里！
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343831515157,2343975489595)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        给新手的写作建议
                                    </div>
                                    <div class="novel-des">
                                        我是一个小萌新，该怎么开启我的创作之路？好苦恼啊。这些小建议，没准儿会帮到你。
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343833808954,2343985475586)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何进行背景设定（互动小说）
                                    </div>
                                    <div class="novel-des">
                                        开始创作之前，先搭建你故事发生的背景吧
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343829327916,2343986884614)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何进行人物设定（互动小说）
                                    </div>
                                    <div class="novel-des">
                                        人物如何丰满立体，先从设定开始?
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343829876768,2343988793400)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        人物设定如何与背景设定结合（互动小说）
                                    </div>
                                    <div class="novel-des">
                                        如何把人物设定和背景有效的结合起来呢？
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343824060422,2343989669897)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何写大纲（互动小说）
                                    </div>
                                    <div class="novel-des">
                                        卡文怎么办，大纲来帮忙！
                                    </div>
                                </div>
                            </div>

                            <div class="novel-list-item" @click="_goNovel(2343828197382,2343991332869)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何设置剧情（互动小说）
                                    </div>
                                    <div class="novel-des">
                                        写的文章不够吸引人？没有想读下去的欲望？本教程教你如何设置剧情。
                                    </div>
                                </div>
                            </div>

                            <div class="novel-list-item" @click="_goNovel(2343832072254,2343997321258)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        对话的设计
                                    </div>
                                    <div class="novel-des">
                                        人物的对话太死板，看这儿呀
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343830900791,2343996149800)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        结局的设置（互动小说）
                                    </div>
                                    <div class="novel-des">
                                        互动小说的可玩性在于结局多样性，怎么设置结局才有意思？看我。
                                    </div>
                                </div>
                            </div>

                            <div class="novel-list-item" @click="_goNovel(2343826042944,2343994175530)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何设置支线和选项（互动小说）
                                    </div>
                                    <div class="novel-des">
                                        不会设置选项，你倒是看看我呀。
                                    </div>
                                </div>
                            </div>

                            <div class="novel-list-item" @click="_goNovel(2343833374722,2343998976036)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        参考资料
                                    </div>
                                    <div class="novel-des">
                                        这些参考资料也许帮你更好的迈出第一步。
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343824674875,2343999680545)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548386261697.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        推荐书目
                                    </div>
                                    <div class="novel-des">
                                        想要提升自己的写作水平？看看这些书吧！
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="novel-list-inner" v-show="period==3">
                            <div class="novel-list-item" @click="_goNovel(2343852167185,2343924871230)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548390507382.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何创建小说
                                    </div>
                                    <div class="novel-des">
                                        手把手教你创建小说
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343857778690,2343881977878)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548390507382.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何输入对话
                                    </div>
                                    <div class="novel-des">
                                        写对话小说的第一步，输入对话。
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343851675695,2343884460059)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548390507382.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何插入图片
                                    </div>
                                    <div class="novel-des">
                                        再加几个表情包点缀一下
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343859146796,2343886393400)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548390507382.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何添加背景图片
                                    </div>
                                    <div class="novel-des">
                                        合适的背景图片更有感染力
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343859720214,2343897583677)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548390507382.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何添加背景音乐
                                    </div>
                                    <div class="novel-des">
                                        背景音乐怎么插？
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343855206463,2343902711821)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548390507382.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何设置选项及选项剧情
                                    </div>
                                    <div class="novel-des">
                                        互动小说里选项当然少不了
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343860441145,2343907143719)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548390507382.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何正确运用剧情跳转功能
                                    </div>
                                    <div class="novel-des">
                                        剧情跳转让互动小说更完整
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343855657033,2343917719592)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548390507382.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何发布互动小说
                                    </div>
                                    <div class="novel-des">
                                        互动小说怎么发布？本教程告诉你。
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="novel-list-inner" v-show="period==4">
                            <div class="novel-list-item" @click="_goNovel(2343842377768,2343931957262)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548388966995.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        封面的用处及使用封面的注意事项
                                    </div>
                                    <div class="novel-des">
                                        一个好的封面——让大家一眼看到你
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343848726551,2343936757774)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548388966995.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何制作好看的封面
                                    </div>
                                    <div class="novel-des">
                                        找不到合适的封面？自己来做一个呀！
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343849775169,2343949209635)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548388966995.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        头像的用处及使用头像的注意事项
                                    </div>
                                    <div class="novel-des">
                                        对话小说的头像有什么意义？让读者有代入感~
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343850586128,2343950979086)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548388966995.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        一个简单的制作头像的方法
                                    </div>
                                    <div class="novel-des">
                                        简单的头像制作，让你不再苦恼
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343834726418,2343952674875)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548388966995.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        背景图片的用处及使用背景图片的注意事项
                                    </div>
                                    <div class="novel-des">
                                        背景图片的设置到底有什么用啊……看了这个你就知道了。
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343842959398,2343956754461)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548388966995.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何获取免费正版图片
                                    </div>
                                    <div class="novel-des">
                                        使用背景图片，不能侵权是重点，教你如何获取免费正版图片！
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343846940697,2343960465457)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548388966995.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何将三次元图片变成二次元图片
                                    </div>
                                    <div class="novel-des">
                                        怎么把三次元的图片转换成二次元以节省找图片的时间，看了这个教程你就知道了。
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343839363133,2343964201017)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548388966995.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        背景音乐的用处
                                    </div>
                                    <div class="novel-des">
                                        为什么要搭配BGM？看这儿。
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343848030228,2343965552678)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548388966995.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何正确选择背景音乐
                                    </div>
                                    <div class="novel-des">
                                        让正确的BGM给你的小说“帮个忙”。
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343849226285,2343967068179)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548388966995.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        使用背景音乐的注意事项
                                    </div>
                                    <div class="novel-des">
                                        使用BGM你一定要知道的注意事项
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343844909075,2343967723573)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548388966995.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        如何获取免费正版的音乐
                                    </div>
                                    <div class="novel-des">
                                        教你如何找到正版免费音乐
                                    </div>
                                </div>
                            </div>
                            <div class="novel-list-item" @click="_goNovel(2343841656878,2343945302051)">
                                <div class="novel-cover">
                                    <img src="http://img.hongrenshuo.com.cn/20636554158281548388966995.png?x-oss-process=image/resize,m_mfit,h_232,w_168,limit_0/crop,w_168,h_232,g_center"/>
                                </div>
                                <div class="novel-info">
                                    <div class="novel-title">
                                        分享一些具有参考性的书籍封面
                                    </div>
                                    <div class="novel-des">
                                        教程君给你提供一些封面以供参考
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <Wxcontent v-show="showWx"></Wxcontent>
    </div>
</template>

<script>
    import Onepic from 'components/baseymz/Onepic'
    import {ymzBaseFun, na , goNovel} from 'assets/js/common'
    import Wxcontent from 'components/baseymz/Wxcontent'
    import Toast from 'assets/js/toast'
    let shareTitle = '克拉克拉小说教程站';
    let shareDesc = '写作，APP使用和素材方面的疑问来这里看哦';
    let shareImageUrl = 'https://img.hongrenshuo.com.cn/h5/novelcourse-share.png';
    export default {
        data() {
            return {
                showWx: false,
                period:1,
            }
        },
        created() {
            linkedme.init("6bccd9251922be2380546b0a517044fe", {type: 'test'}, null);
            ymzBaseFun.wxShareVue(shareTitle, shareDesc, shareImageUrl);

        },
        mounted() {

            this.$nextTick(function () {
                window.addEventListener('scroll', this.handleScroll)
            });
        },
        methods: {



            handleScroll: function () {
                this.scrollTop = this.scrollTop = window.pageYOffset || document.body.scrollTop
                if (this.scrollTop > 400) {
                    this.isActive = true
                } else {
                    this.isActive = false
                }
            },
            _goNovel(novelId, chapterId) {
                if (chapterId) {
                    return goNovel(novelId, chapterId);
                } else {
                    Toast({
                        message: '该小说没有任何章节内容',
                        position: 'center',
                        duration: 1500
                    })
                }
            },
            checkTab: function (index) {
                console.log(this.huancun)

                if (index == this.period) {
                    return
                } else {
                    this.period = index
                }
            },
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
        img {
            width: 100%;
            height: auto;
        }
        .des-content{
            width:100%;
            height:auto;
            padding:20px 35px 60px 40px;
            box-sizing: border-box;
            font-size: 16px;
            color:#4e3606;
            background: url("https://img.hongrenshuo.com.cn/h5/novelcourse-official.png") no-repeat;
            background-size: 100% 100%;
            font-weight: 500;
            line-height: 22px;
        }

        .novel-content{
            width:100%;
            padding:8px 5px 44px 5px;
            box-sizing: border-box;
            background:#fad272;
            margin-top:-2px;
            .novel-list-wraper{
                width:100%;
                padding-bottom:10px;
                background: #ffda8b;
                border-radius: 10px;
                .novel-list{
                    width:100%;

                    background: rgba(255,255,255,0.5);
                    border-radius: 10px;
                    box-shadow: 0 0 20px 8px rgba(255,255,255,0.5) inset;
                    .swith-content{
                        width:100%;
                        padding:10px 7px;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: space-between;
                        .swith-item{
                            width:85px;
                            height:45px;
                            background:url("https://img.hongrenshuo.com.cn/h5/novelcourse-btn.png") no-repeat;
                            background-size: 100% 100%;
                            color:#af7c00;
                            font-size: 18px;
                            line-height: 42px;
                            text-align: center;
                            font-weight: 500;
                        }
                        .swith-item-checked{
                            background:url("https://img.hongrenshuo.com.cn/h5/novelcourse-btn-checked.png") no-repeat;
                            background-size: 100% 100%;
                            color:#4e3606;
                        }
                    }
                    .novel-list-inner{
                        width:100%;
                        padding:0 12px;
                        box-sizing: border-box;
                        .novel-list-item{
                            width:100%;
                            padding:12px 0;
                            box-sizing: border-box;
                            border-bottom: 1px dotted #4e3606;
                            display: flex;
                            .novel-cover{
                                width:110px;
                                height:150px;
                                border-radius:10px;
                                border:1px solid #4e3606;
                                img{
                                    width:100%;
                                    height:100%;
                                    border-radius: 10px;
                                }
                            }
                            .novel-info{
                                flex: 1;
                                padding:0 12px;
                                box-sizing: border-box;
                                /*display: flex;*/
                                /*align-items: center;*/
                                .novel-title{
                                    width:200px;
                                    height:28px;
                                    border-radius: 25px;
                                    border:1px solid #4e3606;
                                    line-height: 28px;
                                    font-size: 15px;
                                    color:#4e3606;
                                    padding-left:10px;
                                    box-sizing: border-box;
                                    font-weight: 500;
                                    margin-top:10px;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    white-space: nowrap;

                                }
                                .novel-des{
                                    width:100%;
                                    font-size: 15px;
                                    color:#11100d;
                                    line-height: 23px;
                                    margin-top:22px;
                                }
                            }
                            &:last-child{
                                border: none;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

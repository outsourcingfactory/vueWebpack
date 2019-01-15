import wx from 'weixin-js-sdk';
import axios from 'assets/js/api'

var oproto = Object.prototype;
var serialize = oproto.toString;
export let na = navigator.userAgent.toLowerCase();
export var Rxports = {
    /*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
    isArrayLike: function (obj) {
        if (!obj)
            return false
        var n = obj.length
        if (n === (n >>> 0)) { //检测length属性是否为非负整数
            var type = serialize.call(obj).slice(8, -1)
            if (/(?:regexp|string|function|window|global)$/i.test(type))
                return false
            if (type === "Array")
                return true
            try {
                if ({}.propertyIsEnumerable.call(obj, "length") === false) { //如果是原生对象
                    return /^\s?function/.test(obj.item || obj.callee)
                }
                return true
            } catch (e) { //IE的NodeList直接抛错
                return !obj.window //IE6-8 window
            }
        }
        return false
    },
    /*遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值*/
    each: function (obj, fn) {
        var That = this;
        if (obj) { //排除null, undefined
            var i = 0
            if (That.isArrayLike(obj)) {
                for (var n = obj.length; i < n; i++) {
                    if (fn(i, obj[i]) === false)
                        break
                }
            } else {
                for (i in obj) {
                    if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
                        break
                    }
                }
            }
        }
    },
    /**
     * 获取url传过来的参数
     * @param name    获取的参数
     * @param Url        自定义获取参数的链接
     * @param return
     */
    getUrlQuery: function (name, Url) {
        //URL GET 获取值
        var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i"),
            url = Url || location.href;
        if (reg.test(url))
            return unescape(RegExp.$2.replace(/\+/g, " "));
        return "";

    },


};
export let ymzBaseFun = {
    /**
     * 下载App
     */
    downloadApp() {
        if (na.match(/micromessenger/i)) {
            window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.uxin.live";
        } else if (na.match(/(iphone|ipod|ios|ipad)/i)) {
            window.location.href = "https://itunes.apple.com/cn/app/hong-doulive/id1137896285?mt=8";
        } else {
            window.location.href = "https://download.hongrenshuo.com.cn/apk/YXLive_publish_H5GG_sign.apk";
        }
    },
    /**
     *  滚动条在Y轴上的滚动距离
     */
    getScrollTop: function () {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    },
    /**
     *  文档的总高度
     */
    getScrollHeight: function () {
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    },
    /**
     * 浏览器视口的高度
     */
    getWindowHeight: function () {
        var windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    },
    /**
     * 判断是否到达底部
     */
    aleadyBottom: function () {
        if (this.getScrollTop() + this.getWindowHeight() == this.getScrollHeight()) {
            return true;
        }
    },
    /**
     * 微信二次分享
     */
    wxShareVue: function (shareTitle, shareDesc, shareImageUrl) {
        let pageUrl = window.location.href.split('#')[0];
        pageUrl = encodeURIComponent(pageUrl);
        axios.HttpPost('/wxauth', {rq_url: pageUrl}).then((res) => {
            wx.config({
                debug: false,
                appId: res.data.appId,
                timestamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                jsApiList: [
                    "onMenuShareTimeline", "onMenuShareQQ", "onMenuShareAppMessage", "onMenuShareQZone"
                    // 所有要调用的 API 都要加到这个列表中
                ]
            });
        }).catch((res) => {
            console.log(res);
        })
        wx.ready(function () {
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: shareTitle, // 分享标题
                imgUrl: shareImageUrl, // 分享图标
                link: '',
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
                title: shareTitle, // 分享标题
                desc: shareDesc, // 分享描述
                link: '', // 分享链接
                imgUrl: shareImageUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            //分享到QQ空间
            wx.onMenuShareQZone({
                title: shareTitle, // 分享标题
                desc: shareDesc, // 分享描述
                link: '', // 分享链接
                imgUrl: shareImageUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            //分享到QQ
            wx.onMenuShareQQ({
                title: shareTitle, // 分享标题
                desc: shareDesc, // 分享描述
                link: '', // 分享链接
                imgUrl: shareImageUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    },
    getVcString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = na.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    },
    getUrlString:function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if(r != null) return decodeURIComponent(r[2]);
        return null;
    },
    /**
     * 没有问号补问号方法
     */
    addWen: function (url) {
        if (url.indexOf("?") != -1) {
            return url;
        } else {
            return url+'?t=1';
        }
    }
}
export function goNovel(novelId,chapterId) {
    if (na.match(/hongdoulive/i)) {
        var appIn = "http://live.hongdoulive.com/novel/dialogApp/novelId/" + novelId + "/chapterId/" + chapterId
        window.location.href = 'uxinlive://noveldetail?url=' + encodeURIComponent(appIn);
    } else {
        window.location.href = "http://live.hongdoulive.com/novel/dialog/novelId/" + novelId + "/chapterId/" + chapterId;
    }
}
export function goUser(uid) {
    if (na.match(/hongdoulive/i)) {
        window.location.href = 'uxinlive://userinfo?uid=' + uid;
    } else {
        window.location.href = 'https://live.hongdoulive.com/index/roomuser/uid/' + uid;
    }
}
export function goVideo(videoid) {
    if (na.match(/hongdoulive/i)) {
        window.location.href = 'uxinlive://smallvideo?video_id='+videoid;
    } else {
        window.location.href = 'https://v.hongdoulive.com/v/video?videoId='+videoid;
    }
}
export function isPoneAvailable(pone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if(!myreg.test(pone)) {
        return false;
    } else {
        return true;
    }
}



































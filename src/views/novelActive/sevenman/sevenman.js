
import Vue from 'vue'
import App from './sevenman.vue'
import 'assets/css/myreset.min.css'
import 'assets/css/base.scss'
import 'lib-flexible/flexible.js'
import fastclick from 'fastclick'
import axios from 'assets/js/api'
import wxContent from 'assets/js/wxContent';
Vue.prototype.$axios = axios;
Vue.prototype.$wxContent = wxContent;
fastclick.attach(document.body)

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: 'http://img.hongrenshuo.com.cn/h5/xiaoshuomoren.png?x-oss-process=image/resize,m_mfit,h_520,w_374,limit_0/crop,w_374,h_520,g_center',
    error:'http://img.hongrenshuo.com.cn/h5/xiaoshuomoren.png?x-oss-process=image/resize,m_mfit,h_520,w_374,limit_0/crop,w_374,h_520,g_center'
})

new Vue({
    render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './wherebaby.vue'
import 'assets/css/myreset.min.css'
import 'assets/css/base.scss'
import 'lib-flexible/flexible.js'
import fastclick from 'fastclick'
import axios from 'assets/js/api'


import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

Vue.prototype.$axios = axios;
fastclick.attach(document.body)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: 'https://img.hongrenshuo.com.cn/h5/fiftystory-nomalImage-ymz.png',
    error: 'https://img.hongrenshuo.com.cn/h5/fiftystory-nomalImage-ymz.png',
})

new Vue({
    render: h => h(App)
}).$mount('#app')
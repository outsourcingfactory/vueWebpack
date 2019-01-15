import Vue from 'vue'
import App from './findlyact.vue'
import 'assets/css/myreset.min.css'
import 'assets/css/base.scss'
import 'lib-flexible/flexible.js'
import fastclick from 'fastclick'
import axios from 'assets/js/api'

Vue.prototype.$axios = axios;
fastclick.attach(document.body)

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

import  VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'//这里注意具体看使用的版本是否需要引入样式，以及具体位置。
Vue.use(VueAwesomeSwiper)
new Vue({
    render: h => h(App)
}).$mount('#app')

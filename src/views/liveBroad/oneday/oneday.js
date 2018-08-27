
import Vue from 'vue'
import App from './oneday.vue'
import 'assets/css/myreset.min.css'
import 'assets/css/swiper.min.css'
import 'assets/css/base.scss'
import 'lib-flexible/flexible.js'
import fastclick from 'fastclick'
import axios from 'assets/js/api'
import  VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.prototype.$axios = axios;
fastclick.attach(document.body)

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

Vue.use(VueAwesomeSwiper)
new Vue({
    render: h => h(App)
}).$mount('#app')

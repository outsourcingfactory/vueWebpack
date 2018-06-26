
import Vue from 'vue'
import App from './happyaffair.vue'
import 'assets/css/myreset.min.css'
import 'assets/css/base.scss'
import 'lib-flexible/flexible.js'
import fastclick from 'fastclick'
fastclick.attach(document.body)

import axios from 'assets/js/api'
Vue.prototype.$axios = axios;


import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
new Vue({
    render: h => h(App)
}).$mount('#app')

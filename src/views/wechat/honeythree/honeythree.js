import Vue from 'vue'
import App from './honeythree.vue'
import 'assets/css/myreset.min.css'
import 'assets/css/base.scss'
import 'lib-flexible/flexible.js'
import fastclick from 'fastclick'
import axios from 'assets/js/api'

Vue.prototype.$axios = axios;
fastclick.attach(document.body)

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
require('es6-promise').polyfill()
Es6Promise.polyfill()

new Vue({
    render: h => h(App)
}).$mount('#app')

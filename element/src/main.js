import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "normalize.css/normalize.css"
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import "./config/rem"

import "./icons"
import "./permission"

import "@/components"

Vue.use(element)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

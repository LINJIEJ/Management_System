import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// import App from '@/views/login'
import router from './router'
import store from './store'
// 初始化样式
import '@/assets/request.css'
// 引入echarts
import * as echarts from 'echarts'
// 将axios二次封装后的instance加到全局生效
// import request from '@/request/axios'

// Vue.prototype.$http = request
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

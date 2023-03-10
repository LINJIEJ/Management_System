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
// 导入vue导出excel的包
import JsonExcel from 'vue-json-excel'
// 解决权限管理后导航菜单栏收起文字不隐藏bug
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
// 将其注册为全局组件
Vue.component('downloadExcel', JsonExcel)
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

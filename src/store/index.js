import Vue from 'vue'
import Vuex from 'vuex'
import createParsistedState from 'vuex-persistedstate'
import { rulesMenu } from '@/request/common'

Vue.use(Vuex)

export default new Vuex.Store({
  // 配置将数据保存到本地内存中
  plugins: [createParsistedState({
    // 设置sessionStorage储存
    storage: window.sessionStorage
  })],

  state: {
    // 控制导航菜单的收缩
    flag: false,
    // 保存登录用户名
    username: '',
    // 保存当前点击商品的信息（用于编辑）
    title: '添加',
    exit: {},
    // 保存动态导航
    dynamic_navigation: []
  },

  mutations: {
    // 控制导航菜单的收缩
    btn1(state) {
      state.flag = true
    },
    btn2(state) {
      state.flag = false
    },
    // 控制登录用户名
    btn_name(state, value) {
      state.username = value
    },
    // 控制当前点击商品的信息
    exitclick(state, value) {
      state.exit = value
    },
    // 判断进入的是否编辑页面
    changetitle(state, value) {
      state.title = value
    },
    // 用于控制动态导航
    add_plotter(state, value) {
      state.dynamic_navigation = value
    },
    remove_plotter(state) {
      state.dynamic_navigation = []
    }
  },
  actions: {
    // 用于控制异步的动态导航
    async add_actionsPlotter(context, value) {
      console.log('前端完整的路由', value.value1)
      console.log('后端动态路由', value.value2)
      // 通过rulesMenu方法将前端与后端相同的动态路由筛选出来
      const new__arr = rulesMenu(value.value1, value.value2.data)
      // 将匹配好的动态路由存储到state中
      context.commit('add_plotter', new__arr)
      return new__arr
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import createParsistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // 配置将数据保存到本地内存中
  plugins: [createParsistedState()],
  state: {
    // 控制导航菜单的收缩
    flag: false,
    // 保存登录用户名
    username: '',
    // 保存当前点击商品的信息（用于编辑）
    title: '添加',
    exit: {}
  },
  getters: {
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
    }
  },
  actions: {
  },
  modules: {
  }
})

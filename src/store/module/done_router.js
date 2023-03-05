import { rulesMenu } from '@/request/common'
export default {
  namespaced: true,
  state: {
    // 保存动态导航
    dynamic_navigation: []
  },
  mutations: {
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
  }
}
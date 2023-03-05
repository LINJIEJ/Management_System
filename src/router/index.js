import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout/index.vue'
// 系统首页路由
import home from '@/views/home/index.vue'
// 登录页面路由
import login from '@/views/login'
import store from '@/store/index'
// 获取后端的动态路由
import { permission } from '@/api/class'
// 导入进度条模块
import nProgress from 'nprogress'
// 导入进度条样式
import 'nprogress/nprogress.css'
// 产品管理路由
const products = () => import('@/views/products/index.vue')
const list = () => import('@/views/products/list/index.vue')
const audit = () => import('@/views/products/audit/index.vue')
const addProduct = () => import('@/views/products/list/addProduct.vue')
// 订单管理路由
const orders = () => import('@/views/orders')
const ordersList = () => import('@/views/orders/list')
const ordersSummary = () => import('@/views/orders/summary')
const ordersAudit = () => import('@/views/orders/audit')
// 广告分类管理
const advertisement = () => import('@/views/advertisement')
const adverList = () => import('@/views/advertisement/list')
const adverAudit = () => import('@/views/advertisement/audit')
// 系统设置路由
const setting = () => import('@/views/setting')
const setList = () => import('@/views/setting/list')
const setAudit = () => import('@/views/setting/audit')
Vue.use(VueRouter)
// 解决编程式路由往同一地址跳转时会报错的情况
const VueRouterPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
const newRouter = {
  path: '/',
  // name: '/',
  component: layout,
  meta: { title: '/' },
  children: [
    // 系统首页
    { path: '/', component: home, name: 'home', meta: { title: '系统首页', isloading: true } },
    // 产品管理
    {
      path: '/products',
      name: 'products',
      component: products,
      meta: { title: '产品管理', isloading: true },
      children:
        [
          { path: '/products/list', name: 'products_list', component: list, meta: { title: '产品列表', isloading: true } },
          { path: '/products/audit', name: 'products_audit', component: audit, meta: { title: '产品审核', isloading: true } },
          // 添加商品组件
          { path: '/products/add', name: 'add', component: addProduct, meta: { title: '添加商品', isloading: true } }
        ]
    },
    // 订单管理
    {
      path: '/orders',
      name: '/orders',
      component: orders,
      meta: { title: '订单管理', isloading: true },
      children:
        [
          { path: '/orders/list', name: 'orders_list', component: ordersList, meta: { title: '订单列表', isloading: true } },
          { path: '/orders/audit', name: 'orders_audit', component: ordersAudit, meta: { title: '订单审核', isloading: true } },
          { path: '/orders/summary', name: 'orders_summary', component: ordersSummary, meta: { title: '汇总清单', isloading: true } }
        ]
    },
    // 广告分类
    {
      path: '/advertisement',
      name: '/advertisement',
      component: advertisement,
      meta: { title: '广告分类', isloading: true },
      children:
        [
          { path: '/advertisement/list', name: 'advertisement_list', component: adverList, meta: { title: '广告列表', isloading: true } },
          { path: '/advertisement/audit', name: 'advertisement_audit', component: adverAudit, meta: { title: '广告审核', isloading: true } }
        ]
    },
    // 系统设置
    {
      path: '/setting',
      name: '/setting',
      component: setting,
      meta: { title: '系统设置', isloading: true },
      children:
        [
          { path: '/setting/list', component: setList, name: 'setting_list', meta: { title: '部门管理', isloading: true } },
          { path: '/setting/audit', component: setAudit, name: 'setting_audit', meta: { title: '角色管理', isloading: true } }
        ]
    }
  ]
}

const RouterChild = newRouter.children.filter((ele) => {
  return ele.path !== '/'
})

const routes = [
  // 配置登录路由
  { path: '/login', component: login }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  // 开启进度条
  nProgress.start()
  if (to.matched.length === 0 || to.matched.some((ele) => { return ele.meta.isloading })) {
    // 获取内存中的token值,判断是否登录了
    if (sessionStorage.getItem('token')) {
      // 判断vuex中是否有动态导航   //没有动态导航，需添加
      if (store.state.dynamic_navigation.length === 0) {
        const { data: res } = await permission({ user: store.state.username })
        // value1是前端完整路由，value2是后端传的动态路由
        const value_router = { value1: RouterChild, value2: res }
        const getRouter = await store.dispatch('add_actionsPlotter', value_router)
        getRouter.unshift({ path: '/', name: 'home', component: home, meta: { title: '系统首页', isloading: true } })
        newRouter.children = getRouter
        // 这里可以遍历每一个路由,将遍历出来的路由通过router.addRoute添加进去
        router.addRoute(newRouter)
        next(to)
      } else {
        // 判断页面是否刷新了
        // if (from.matched.length === 0) {
        //   router.addRoute(newRouter)
        //   next()
        //   console.log(routes)
        //   return
        // }
        next()
      }
    } else {
      next('/login')
    }
  } else {
    next()// 不需要登陆
  }
})

router.afterEach((to, from, next) => {
  // 在将要进入页面时关闭进度条
  nProgress.done()
})

export default router

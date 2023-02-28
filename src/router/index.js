import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout/index.vue'
// 系统首页路由
import home from '@/views/home/index.vue'
// 产品管理路由
import products from '@/views/products/index.vue'
import list from '@/views/products/list/index.vue'
import audit from '@/views/products/audit/index.vue'
import addProduct from '@/views/products/list/addProduct.vue'
// 订单管理路由
import orders from '@/views/orders'
import ordersList from '@/views/orders/list'
import ordersSummary from '@/views/orders/summary'
import ordersAudit from '@/views/orders/audit'
// 广告分类管理
import advertisement from '@/views/advertisement'
import adverList from '@/views/advertisement/list'
import adverAudit from '@/views/advertisement/audit'
// 系统设置路由
import setting from '@/views/setting'
import setList from '@/views/setting/list'
import setAudit from '@/views/setting/audit'
// 登录页面路由
import login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layout,
    children: [
      // 系统首页
      { path: '/', component: home, meta: { title: '系统首页' } },
      // 产品管理
      {
        path: '/products',
        component: products,
        meta: { title: '产品管理' },
        children:
          [
            { path: 'list', component: list, meta: { title: '产品列表' } },
            { path: 'audit', component: audit, meta: { title: '产品审核' } },
            // 添加商品组件
            { path: 'add', component: addProduct, meta: { title: '添加商品' } }
          ]
      },
      // 订单管理
      {
        path: '/orders',
        component: orders,
        meta: { title: '订单管理' },
        children:
          [
            { path: 'list', component: ordersList, meta: { title: '订单列表' } },
            { path: 'audit', component: ordersAudit, meta: { title: '订单审核' } },
            { path: 'summary', component: ordersSummary, meta: { title: '清单汇总' } }
          ]
      },
      // 广告分类
      {
        path: '/advertisement',
        component: advertisement,
        meta: { title: '广告分类' },
        children:
          [
            { path: 'list', component: adverList, meta: { title: '广告列表' } },
            { path: 'audit', component: adverAudit, meta: { title: '广告审核' } }
          ]
      },
      // 系统设置
      {
        path: '/setting',
        component: setting,
        meta: { title: '系统设置' },
        children:
          [
            { path: 'list', component: setList, meta: { title: '选项一' } },
            { path: 'audit', component: setAudit, meta: { title: '选项二' } }
          ]
      }
    ]
  },
  // 配置登录路由
  { path: '/login', component: login }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log('matched', to.matched)

  if (to.path === '/') {
    // 获取内存中的token值
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router

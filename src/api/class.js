import request from '@/request/axios'
// 支付量，销售量等接口封装
export function course(params) {
  return request({
    method: 'get',
    url: '/api/sale',
    params
  })
}

export function permission(params) {
  return request({
    method: 'get',
    url: '/api/permission',
    params
  })
}

// 注册接口
export function sign(data) {
  return request({
    method: 'post',
    url: '/api/login',
    data
  })
}

// 登录接口
export function login(data) {
  return request({
    method: 'post',
    url: '/api/sign',
    data
  })
}

// echarts图表接口
export function pillar(params) {
  return request({
    method: 'get',
    url: '/api/pillar',
    params
  })
}

// 今日订单和本月订单接口
export function orders(params) {
  return request({
    method: 'get',
    url: '/api/orders',
    params
  })
}

// 商品列表数据接口
export function goods(params) {
  return request({
    method: 'get',
    url: '/api/goods',
    params
  })
}

// 查询商品列表数据接口
export function inquire(data) {
  return request({
    method: 'post',
    url: '/api/querys',
    data
  })
}

// 每条数据的操作中的删除接口
export function delet(data) {
  return request({
    method: 'post',
    url: '/api/delet',
    data
  })
}

// 商品列表中的添加商品中的二级目录接口
export function treeList(params) {
  return request({
    method: 'get',
    url: '/api/treeList',
    params
  })
}

// 添加商品数据接口
export function addProduct(data) {
  return request({
    method: 'post',
    url: '/api/addProduct',
    data
  })
}

// 修改商品数据接口
export function updateProduct(data) {
  return request({
    method: 'post',
    url: '/api/updateProduct',
    data
  })
}

// 批量删除列表数据接口
export function deletes(data) {
  return request({
    method: 'post',
    url: '/api/deletes',
    data
  })
}

// 图片上传接口
export function Img(data) {
  return request({
    method: 'post',
    url: '/api/Img',
    data
  })
}

// 获取所有树节点分类接口
export function getAllTreeList(params) {
  return request({
    method: 'get',
    url: '/api/getAllTreeList',
    params
  })
}

// 新增产品一级子分类接口
export function addFirstChildList(data) {
  return request({
    method: 'post',
    url: '/api/addFirstChildList',
    data
  })
}

// 新增产品子分类接口
export function addChildList(data) {
  return request({
    method: 'post',
    url: '/api/addChildList',
    data
  })
}

// 修改产品分类接口
export function updateChildList(data) {
  return request({
    method: 'post',
    url: '/api/updateChildList',
    data
  })
}

// 删除分类接口
export function removeChildList(data) {
  return request({
    method: 'post',
    url: '/api/removeChildList',
    data
  })
}

// 获取订单列表接口
export function goodsAlllist(params) {
  return request({
    method: 'get',
    url: '/api/goodsAlllist',
    params
  })
}

// 批量订单汇总按钮的接口
export function updategoodslist(data) {
  return request({
    method: 'post',
    url: '/api/updategoodslist',
    data
  })
}

// 获取订单汇总列表接口
export function collectAlllist(params) {
  return request({
    method: 'get',
    url: '/api/collectAlllist',
    params
  })
}

// 撤销汇总接口
export function removeCollectlist(data) {
  return request({
    method: 'post',
    url: '/api/removeCollectlist',
    data
  })
}

// 查询订单列表数据接口
export function checkGoodsList(params) {
  return request({
    method: 'get',
    url: '/api/checkGoodsList',
    params
  })
}

// 查询订单汇总数据接口
export function checkCollectList(params) {
  return request({
    method: 'get',
    url: '/api/checkCollectList',
    params
  })
}


const express = require('express')
const router = express.Router()
const logins = require('../router-module/user')
// 导入文件上传模块
const multer = require('multer')
// 让上传的文件拥有后缀名，完整的图片路径，file.originalname为图片路径
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 文件上传到哪去
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
})
const upload = multer({
  storage
})

// 注册请求
router.post('/login', logins.login)

// 登录请求
router.post('/sign', logins.sign)

// 用户权限数据请求
router.get('/permission', logins.permission)

// 用户管理请求
router.post('/user', logins.user)

// 销量，支付量，收藏量等请求
router.get('/sale', logins.sale)

// echarts图表数据请求
router.get('/pillar', logins.pillar)

// 今日订单和本月订单请求
router.get('/orders', logins.orders)

// 商品列表数据请求
router.get('/goods', logins.goods)

// 查询列表数据请求
router.post('/querys', logins.querys)

// 删除列表数据请求
router.post('/delet', logins.delet)

// 商品列表中的添加商品中的二级目录请求
router.get('/treeList', logins.treeList)

// 商品列表中的添加商品中的图片上传请求
router.post('/Img', upload.single('file'), logins.Img)

// 添加商品数据请求
router.post('/addProduct', logins.addProduct)

// 修改商品数据请求
router.post('/updateProduct', logins.updateProduct)

// 批量删除列表数据请求
router.post('/deletes', logins.deletes)

// 获取所有树节点分类请求
router.get('/getAllTreeList', logins.getAllTreeList)

// 新增产品一级子分类请求
router.post('/addFirstChildList', logins.addFirstChildList)

// 新增产品子分类请求
router.post('/addChildList', logins.addChildList)

// 修改产品分类请求
router.post('/updateChildList', logins.updateChildList)

// 删除产品分类请求
router.post('/removeChildList', logins.removeChildList)

// 获取订单列表请求
router.get('/goodsAlllist', logins.goodsAlllist)

// 批量订单汇总按钮的请求
router.post('/updategoodslist', logins.updategoodslist)

// 获取订单汇总列表请求
router.get('/collectAlllist', logins.collectAlllist)

// 撤销汇总请求
router.post('/removeCollectlist', logins.removeCollectlist)

// 查询订单列表数据请求
router.get('/checkGoodsList', logins.checkGoodsList)

// 查询订单汇总数据请求
router.get('/checkCollectList', logins.checkCollectList)

module.exports = { router } 
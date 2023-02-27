
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

module.exports = { router } 
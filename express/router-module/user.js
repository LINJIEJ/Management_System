const db = require('../db/main')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const mima = require('../Token/mima')

// 注册接口函数
exports.login = (req, res) => {
  const userinfo = req.body
  // 验证用户密码是否为空
  if (!userinfo.username || !userinfo.password) {
    return res.send({ status: 404, message: '用户和密码不能为空' })
  }
  // 验证此次填写的用户名和数据库中的username是否有重复
  db.query('select * from new_table_1 where username = ?', [userinfo.username], (err, request) => {
    if (err) {
      return res.send({ status: 404, message: err.name })
    }

    if (request.length > 0) {
      return res.send({ status: 404, message: '用户名被占用' })
    }

    // 通过bcryptjs.sync对密码进行加密
    userinfo.password = bcryptjs.hashSync(userinfo.password, 10)

    // 向数据库中添加数据
    db.query('insert into new_table_1 set ?', { username: userinfo.username, password: userinfo.password }, (err, request) => {
      if (err) {
        return res.send({ status: 404, message: err.name })
      }

      // 判断影响行数是否为一
      if (request.affectedRows !== 1) {
        return res.send({ status: 404, message: '注册用户信息失败,请稍后重试' })
      }

      res.send({ status: 200, message: '注册用户成功' })
    })

  })
}

// 登录接口函数
exports.sign = (req, res) => {
  const userinfo = req.body
  // 验证用户密码是否为空
  if (!userinfo.username || !userinfo.password) {
    return res.send({ status: 404, message: '用户和密码不能为空' })
  }
  db.query('SELECT * FROM new_table_1 where username = ?', [userinfo.username], (err, request) => {
    if (err) {
      return res.send({ status: 404, message: err.name })
    }

    // 验证数据库中是否存在该条数据
    if (request.length !== 1) {
      return res.send({ status: 404, message: '不存在该用户名' })
    }

    // 利用bcryptjs.compareSync方法判断输入的密码和数据库中的密码是否一样,第一个参数是输入的密码,第二个是数据库中的密码
    const compare = bcryptjs.compareSync(userinfo.password, request[0].password)

    // 判断输入的密码和数据库中的密码是否一样
    if (!compare) {
      return res.send({ status: 404, message: '密码错误' })
    }

    const user = { ...request[0], password: '' }

    const tokenjwt = jsonwebtoken.sign(user, mima.jwtSecreKey, {
      expiresIn: '1234567890h'
    })

    // 将登录成功生成的token字符串通过res.send发送到服务器中
    res.send({
      status: 200,
      message: '登陆成功',
      token: 'Bearer' + tokenjwt
    })
  })

}

//用户权限数据接口
exports.permission = (req, res) => {
  const user = req.query.user;
  if (user === '123') {
    res.send({
      "code": 0,
      "message": "获取权限成功",
      "data": [
        {
          "name": "订单管理",
          "children": [
            {
              "name": "订单列表"
            },
            {
              "name": "汇总清单"
            },
            {
              "name": "订单审核"
            }
          ]
        },
        {
          "name": "产品管理",
          "children": [
            {
              "name": "产品列表"
            },
            {
              "name": "产品审核"
            }
          ]
        },
        {
          "name": "广告分类",
          "children": [
            {
              "name": "广告列表"
            },
            {
              "name": "广告审核"
            }
          ]
        },
        {
          "name": "系统设置",
          "children": [
            {
              "name": "部门管理"
            },
            {
              "name": "角色管理"
            }
          ]
        }
      ]
    })
  } else {
    res.send({
      "code": 0,
      "message": "没有权限",
      "data": [
        {
          "name": "订单管理",
          "children": [
            {
              "name": "订单列表"
            },
            {
              "name": "汇总清单"
            }
          ]
        },
        {
          "name": "产品管理",
          "children": [
            {
              "name": "产品列表"
            },
            {
              "name": "产品审核"
            }
          ]
        },
        {
          "name": "广告分类",
          "children": [
            {
              "name": "广告列表"
            }
          ]
        }
      ]
    })
  }
}

// 用户管理信息表
exports.user = (req, res) => {
  res.send({
    status: 200, message: [
      { id: 1, name: '嬴政', age: 18, position: '始皇帝' },
      { id: 2, name: '李斯', age: 35, position: '丞相' },
      { id: 3, name: '吕不韦', age: 50, position: '商人' },
      { id: 4, name: '赵姬', age: 48, position: '王太后' }
    ]
  })
}

// 销量，支付量，收藏量等表
exports.sale = (req, res) => {
  res.send({
    status: 200, message: {
      sales: 8703,
      totalsales: 65873,
      visits: 4086,
      totalvisit: 78457,
      collection: 2748,
      totalcollection: 32897,
      pay: 9874,
      totalpay: 94869
    }
  })
}

// echarts图表数据函数
exports.pillar = (req, res) => {
  res.send({
    status: 200, message: [
      { sales: 24924, salesVolume: 23874, foot: '肉类' },
      { sales: 32421, salesVolume: 21932, foot: '水产' },
      { sales: 42133, salesVolume: 29823, foot: '蔬菜' },
      { sales: 33133, salesVolume: 23273, foot: '冷饮食品' },
      { sales: 32443, salesVolume: 23254, foot: '水果' }
    ]
  })
}

// 今日订单和本月订单函数
exports.orders = (req, res) => {
  res.send({
    status: 200, message: {
      id: 1,
      ordersNumber: 519,
      culOrdersNumber: 34432,
      confirm: 234,
      culConfirm: 4364,
      amount: 1096,
      culAmount: 88934,
    }
  })
}

// 商品列表数据函数
exports.goods = (req, res) => {
  const sql = 'select * from orders_list'
  db.query(sql, (err, results) => {
    // 执行 SQL 语句失败返回一个错误信息
    if (err) return res.send(err)
    if (!req.query.page || !req.query.size) return res.send({
      status: 500,
      message: '请传page和size参数'
    })
    let curpage = Number(req.query.page)//当前页，前端传的页码
    let pagesize = Number(req.query.size)//每页显示的数量
    let pagenum = Math.ceil(results.length / pagesize)//返一个总页码
    let totalsize = results.length
    //这里是前端传参数返回的数据
    let data = results.splice((curpage - 1) * pagesize, pagesize)//利用数组方法截取数据
    res.send({
      // 每页的条数
      pagesize: pagesize,
      // 当前页的页码
      curpage: curpage,
      // 总页码
      pagenum: pagenum,
      // 总条数
      total: totalsize,
      status: 200,
      message: '获取用户基本信息成功！',
      data: data,
    })
  })
}

// 查询列表数据接口
exports.querys = (req, res) => {
  const sercet = req.body.name
  db.query("select * from orders_list where name like  '%" + sercet + "%'", (err, results) => {
    if (err) {
      return res.send({
        status: 500,
        message: err,
      })
    }
    let curpage = Number(req.body.page)//当前页，前端传的页码
    let pagesize = Number(req.body.size)//每页显示的数量
    let pagenum = Math.ceil(results.length / pagesize)//返一个总页码
    let totalsize = results.length
    //这里是前端传参数返回的数据
    let data = results.splice((curpage - 1) * pagesize, pagesize)//利用数组方法截取数据
    res.send({
      // 每页的条数
      pagesize: pagesize,
      // 当前页的页码
      curpage: curpage,
      // 总页码
      pagenum: pagenum,
      // 总条数
      total: totalsize,
      status: 200,
      message: `已查出符合条件的所有商品`,
      data: data,
    })
  })
}

// 删除列表数据接口
exports.delet = (req, res) => {
  const sql = 'delete from orders_list where id = ?'
  db.query(sql, [req.body.id], (err, results) => {
    if (err) {
      return res.send({
        status: 500,
        message: err,
      })
    }
    if (!req.body.id) {
      return res.send({
        status: 500,
        message: '请传要删除的当前id参数',
      })
    }
    // 判断影响行数是否不为0
    if (results.affectedRows !== 0) {
      return res.send({
        status: 200,
        message: '删除该数据成功',
      })
    }
  })
}

// 商品列表中的添加商品中的二级目录接口
exports.treeList = (req, res) => {
  const number = req.query.type || 1
  db.query('select * from tree_directory where type = ?', [number], (err, results) => {
    if (err) {
      return res.send({
        status: 500,
        message: err,
      })
    }
    if (!req.query.type) {
      return res.send({
        status: 500,
        message: '请输入type参数',
      })
    }
    res.send({
      status: 200,
      message: '获取二级菜单成功',
      data: results
    })
  })
}

// 商品列表中的添加商品中的图片上传接口
exports.Img = (req, res) => {
  res.send(
    req.file
  )
}

// 添加商品数据接口
exports.addProduct = (req, res) => {
  const product = req.body
  if (!product.category) {
    return res.send({ status: 404, message: '商品类目不能为空' })
  }
  if (!product.name) {
    return res.send({ status: 404, message: '商品名称不能为空' })
  }
  if (!product.price) {
    return res.send({ status: 404, message: '商品价格不能为空' })
  }
  if (!product.number) {
    return res.send({ status: 404, message: '商品数量不能为空' })
  }
  if (!product.selling) {
    return res.send({ status: 404, message: '商品卖点不能为空' })
  }
  if (!product.description) {
    return res.send({ status: 404, message: '商品介绍不能为空' })
  }
  if (!product.time) {
    return res.send({ status: 404, message: '时间不能为空' })
  }
  db.query('insert into orders_list set ?', { category: product.category, name: product.name, price: product.price, number: product.number, selling: product.selling, description: product.description, time: product.time }, (err, request) => {
    if (err) {
      return res.send({ status: 404, message: err })
    }

    // 判断影响行数是否为一
    if (request.affectedRows !== 1) {
      return res.send({ status: 404, message: '添加商品失败,请稍后重试' })
    }

    res.send({ status: 200, message: '添加商品成功' })
  })
}

// 修改商品数据接口
exports.updateProduct = (req, res) => {
  const product = req.body
  if (!product.id) {
    return res.send({ status: 404, message: 'id不能为空' })
  }
  if (!product.category) {
    return res.send({ status: 404, message: '商品类目不能为空' })
  }
  if (!product.name) {
    return res.send({ status: 404, message: '商品名称不能为空' })
  }
  if (!product.price) {
    return res.send({ status: 404, message: '商品价格不能为空' })
  }
  if (!product.number) {
    return res.send({ status: 404, message: '商品数量不能为空' })
  }
  if (!product.selling) {
    return res.send({ status: 404, message: '商品卖点不能为空' })
  }
  if (!product.description) {
    return res.send({ status: 404, message: '商品介绍不能为空' })
  }
  if (!product.time) {
    return res.send({ status: 404, message: '时间不能为空' })
  }
  db.query('update orders_list set ? where ?', [{ category: product.category, name: product.name, price: product.price, number: product.number, selling: product.selling, description: product.description, time: product.time }, { id: product.id }], (err, request) => {
    if (err) {
      return res.send({ status: 404, message: err })
    }

    // 判断影响行数是否为一
    if (request.affectedRows !== 1) {
      return res.send({ status: 404, message: '修改商品失败,请稍后重试' })
    }

    res.send({ status: 200, message: '修改商品成功' })
  })
}

// 批量删除列表数据接口
exports.deletes = (req, res) => {
  db.query(`delete from orders_list where id in (${req.body.ids})`, null, (err, result) => {
    if (err) {
      return res.send(err)
    }
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        message: "删除成功"
      })
    } else {
      res.send({
        status: 500,
        message: "删除失败"
      })
    }
  })
}
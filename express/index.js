const express = require('express')
const cors = require('cors')
const jwt = require('express-jwt')
const login = require('./router/user')
const mima = require('./Token/mima')
const app = express()

// 跨域
app.use(cors())

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 配置全局解密token的中间件           //unless中的path表示哪些请求不需要权限
app.use(jwt({ secret: mima.jwtSecreKey, algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }))

app.use('/api', login.router)

// 错误中间件
app.use((err, req, res, next) => {
  if (err.name = 'UnauthorizedError') {
    return res.send({ status: 404, message: 'token身份认证失败' })
  }
})

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080')
})
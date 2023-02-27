const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置打包路径
  publicPath: './',
  // 配置代理
  devServer: {
    proxy: 'http://localhost:8080'
  }
})

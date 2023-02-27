<template>
  <div class="left">
    <!-- 侧边栏区域 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#112f50"
      text-color="#f7f7f7"
      router
      :collapse="$store.state.flag"
    >
      <!-- 系统首页区域 -->
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">系统首页</span>
      </el-menu-item>

      <!-- 产品管理区域 -->
      <el-submenu index="/products">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/products/list">产品列表</el-menu-item>
          <el-menu-item index="/products/audit">产品审核</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- 订单管理区域 -->
      <el-submenu index="/orders">
        <template slot="title">
          <i class="el-icon-shopping-cart-full"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/orders/list">订单列表</el-menu-item>
          <el-menu-item index="/orders/summary">汇总清单</el-menu-item>
          <el-menu-item index="/orders/audit">订单审核</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- 广告分类区域 -->
      <el-submenu index="/advertisement">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">广告分类</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/advertisement/list">广告列表</el-menu-item>
          <el-menu-item index="/advertisement/audit">广告审核</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- 系统设置区域 -->
      <el-submenu index="/setting">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/setting/list">选项1</el-menu-item>
          <el-menu-item index="/setting/audit">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  width: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<template>
  <div class="left">
    <!-- 侧边栏区域 -->
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" background-color="#112f50" text-color="#f7f7f7"
      router :collapse="$store.state.flag">
      <!-- 系统首页区域 -->
      <!-- <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">系统首页</span>
      </el-menu-item> -->

      <!-- 动态渲染路由组件 -->
      <DynamicComponents :value="dynamic_navigation"></DynamicComponents>
    </el-menu>
  </div>
</template>

<script>
import DynamicComponents from '@/components/DynamicComponents.vue'
import { mapState } from 'vuex'
export default {
  components: {
    // 配合后端渲染动态路由的组件
    DynamicComponents
  },
  data() {
    return {
      activeIndex: this.$route.path
    }
  },
  computed: {
    ...mapState(['dynamic_navigation'])
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

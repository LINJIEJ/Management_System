<template>
  <div class="left">
    <!-- 侧边栏区域 -->
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" background-color="#112f50" text-color="#f7f7f7"
      router :collapse="$store.state.flag">

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
  created() {
    // 删除原数组中的add路由
    const addfilter = this.dynamic_navigation[1].children.splice(2, 1)
    console.log(addfilter)
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

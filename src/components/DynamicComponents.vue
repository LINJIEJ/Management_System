<template>
  <fragment class="DynamicComponents">
    <template v-for="item in value">
      <!-- 一级路由 -->
      <el-menu-item @click="toPage(item.path)" :index="item.path" v-if="!item.children" :key="item.name">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>

      <!-- 二级路由 -->
      <el-submenu v-else :index="item.path" :key="item.path">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <DynamicComponents :value="item.children"></DynamicComponents>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </fragment>
</template>

<script>
export default {
  name: 'DynamicComponents',
  props: ['value'],
  methods: {
    toPage(name) {
      this.$router.push(name)
    }
  }
}
</script>

<style lang="less" scoped></style>

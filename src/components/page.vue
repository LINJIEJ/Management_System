<template>
  <div class="pages">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPages"
      :page-size="pagesizes"
      layout="total, prev, pager, next, jumper"
      :total="totalxs"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['totalxs', 'currentPages', 'pagesizes'],
  data() {
    return {}
  },
  methods: {
    // 当前所在页发生改变时触发
    handleCurrentChange(value) {
      this.currentPage = value
      this.$emit('changePage', value)
    }
  }
}
</script>

<style lang="less" scoped>
</style>

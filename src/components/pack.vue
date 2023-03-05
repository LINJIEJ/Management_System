<template>
  <div class="pack">
    <!-- 页码区域 -->
    <div class="Page">
      <page :totalxs="totalsize" @changePage="CurrentChange" :currentPages="curPage" :pagesizes="pageSize"></page>
    </div>
    <!-- pdf打印区域 -->
    <!-- <pdf src="../assets/个人简历.pdf"></pdf> -->
  </div>
</template>

<script>
import page from '@/components/page.vue'
// import pdf from 'vue-pdf'
export default {
  components: {
    // pdf,
    page
  },
  data() {
    return {
      // 总条数
      totalsize: '',
      // 当前页数
      curPage: '',
      // 每页条数
      pageSize: ''
    }
  },
  methods: {
    // 当前页数发生改变时触发
    CurrentChange() {

    }
  }
}
</script>
<style lang="less" scoped>
.pack {
  .Page {
    width: 100%;
    height: 15px;
    text-align: center;
  }
}
</style>

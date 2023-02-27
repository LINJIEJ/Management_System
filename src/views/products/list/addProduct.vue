<template>
  <div class="add">
    <el-row :gutter="20">
      <!-- 商品类型列表 -->
      <el-col :span="4"
        ><div class="add_left">
          <div class="header_left">产品类型列表</div>
          <!-- 二级菜单组件 -->
          <div class="tree_list">
            <treeList @treeName="changeTreeName"></treeList>
          </div></div
      ></el-col>
      <!-- 添加商品内容区 -->
      <el-col :span="20"
        ><div class="add_right">
          <div class="header_right">{{ title }}商品</div>
          <!-- 内容组件 -->
          <div class="add_content">
            <addpage :treenamed="treeName"></addpage>
          </div></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import treeList from '@/components/tree_list.vue'
import addpage from '@/components/addpage.vue'
import { mapState } from 'vuex'
export default {
  components: {
    treeList,
    addpage
  },
  data() {
    return {
      treeName: ''
    }
  },
  methods: {
    changeTreeName(value) {
      this.treeName = value
    }
  },
  // 计算属性
  computed: {
    ...mapState(['title'])
  }
}
</script>

<style lang="less" scoped>
.add {
  padding-top: 40px;
  .add_left {
    height: 600px;
    // background-color: #ccc;
    border: 1px solid #3a3939;
    .header_left {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: white;
      background-color: #5f88ce;
    }
    .tree_list {
      padding-top: 30px;
    }
  }
  .add_right {
    height: 1250px;
    border: 1px solid #3a3939;
    // background-color: aquamarine;
    .header_right {
      padding: 0 0 0 30px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: black;
      font-weight: 600;
      background-color: #eee;
    }
  }
}
</style>

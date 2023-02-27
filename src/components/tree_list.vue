<template>
  <div class="tree">
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      highlight-current
      accordion
      @node-click="checkChange"
    >
    </el-tree>
  </div>
</template>

<script>
import { treeList } from '@/api/class.js'
export default {
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      treeValue: []
    }
  },
  methods: {
    // 二级目录请求
    async loadNode(node, resolve) {
      if (node.level === 0) {
        const { data: res } = await treeList({ type: 1 })
        return resolve(res.data)
      }
      if (node.level >= 1) {
        const { data: res } = await treeList({ type: node.data.cid })
        return resolve(res.data)
      }
    },
    checkChange(draggingNode) {
      this.tree_name(draggingNode.name)
    },
    // 向父组件传递当前所选的tree名称
    tree_name(value) {
      this.$emit('treeName', value)
    }
  }
}
</script>

<style lang="less" scoped>
.tree {
  .el-tree {
    background-color: aliceblue;
  }
  //高亮字体颜色
  .el-tree--highlight-current
    /deep/
    .el-tree-node.is-current
    > .el-tree-node__content {
    color: #409eff !important;
  }
  /deep/ .el-tree-node__content:hover {
    background-color: #eee;
  }
}
</style>

<template>
  <div>
    <div class="content">
      订单合同： <el-button @click="dialogVisible = true">查看合同</el-button>
    </div>

    <el-dialog title="打印合同" :visible="dialogVisible" width="60%" :before-close="handleClose">
      <!-- pdf打印组件 -->
      <pack></pack>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import pack from '@/components/pack.vue'
export default {
  components: {
    pack
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.content {
  background: #fff;
  padding: 20px;
}
</style>

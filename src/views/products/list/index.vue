<template>
  <div class="products_list">
    <p class="title">
      <span>首页</span> / <span>产品管理</span> / <span>产品列表</span>
    </p>
    <!-- 产品查询添加栏 -->
    <div class="add">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input
            :span="2"
            v-model="formInline.name"
            @blur="loss_focus"
            placeholder="商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品类目">
          <el-input
            :span="2"
            v-model="formInline.selecter"
            @blur="loss_focus"
            placeholder="商品类目"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="btn_1">查询</el-button>
          <el-button type="success" @click="add">弹框添加</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 产品列表 -->
    <div class="list">
      <el-table
        height="502"
        :data="tableData"
        border
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        cell-class-name="table-center"
        header-cell-class-name="table-center"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="number"
          label="商品编号"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="category"
          label="商品类目"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="添加时间"
          width="128"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="selling"
          label="商品卖点"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="商品描述"
          width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="handleClick(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-button type="primary">全选</el-button> -->
    <el-button type="danger" icon="el-icon-delete" @click="btn_delete"
      >批量删除</el-button
    >

    <!-- 页码区 -->
    <div class="page">
      <page
        @changePage="changePage"
        :totalxs="totals"
        :currentPages="page"
        :pagesizes="pagesize"
      ></page>
    </div>
  </div>
</template>

<script>
import page from '@/components/page.vue'
import { goods, inquire, delet, deletes } from '@/api/class.js'
import { mapMutations } from 'vuex'
export default {
  components: {
    // 分页组件
    page
  },
  data() {
    return {
      // 添加栏属性
      formInline: {
        name: '',
        selecter: ''
      },
      // 表格列表属性
      tableData: [],
      // 每页条数
      pagesize: 8,
      // 当前页数
      page: 1,
      // 总条数
      totals: 1,
      messages: '',
      // 批量删除的id
      ids: []
    }
  },
  methods: {
    ...mapMutations(['exitclick']),
    // 商品列表数据请求
    async goods(page, pagesize) {
      const { data: res } = await goods({
        page: page,
        size: pagesize
      })
      this.totals = res.total
      this.tableData = res.data
    },

    // 封装查询数据请求
    async checkData(pages, sizes) {
      if (!this.formInline.name.trim()) {
        return
      }
      const { data: res } = await inquire({
        name: this.formInline.name.trim(),
        page: pages,
        size: sizes
      })
      this.tableData = res.data
      this.totals = res.total
      this.messages = res.message
      if (res.data) {
        this.totals = res.total
      } else {
        this.totals = 0
      }
    },

    // 子组件page中的页数发生改变时触发
    async changePage(value) {
      this.page = value
      if (this.formInline.name) {
        // 渲染查询出来的数据列表
        this.checkData(this.page, this.pagesize)
      } else {
        this.goods(this.page, this.pagesize)
      }
    },

    // 查询按钮触发的请求
    async btn_1() {
      // 查询数据之前先让页码为一，否则直接查询所在那页数据
      this.page = 1
      this.checkData(this.page, this.pagesize)
      // 点击查询后的消息提示
      this.$message({
        message: '已查出符合条件的所有商品',
        type: 'success'
      })
    },

    // 查询表单失去焦点事件
    loss_focus() {
      if (!this.formInline.name.trim()) {
        this.page = 1
        this.goods(this.page, this.pagesize)
      }
    },

    // 每条数据的操作中的删除方法
    async handleClick(value) {
      if (this.totals % this.pagesize === 1) {
        this.page -= 1
      }
      if (this.page <= 1) {
        this.page = 1
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delet({
            id: value.id
          }).then(() => {
            // 点击删除后的消息提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 重新渲染页面
            if (this.formInline.name) {
              this.checkData(this.page, this.pagesize)
            } else {
              this.goods(this.page, this.pagesize)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 每条数据的操作中的编辑商品方法
    handleEdit(value) {
      this.$store.commit('exitclick', value)
      this.$store.commit('changetitle', '编辑')
      this.$router.push('/products/add')
    },

    // 当复选框状态发生改变时触发
    handleSelectionChange(row) {
      this.multipleSelection = row
      const arr = []
      row.forEach((ele) => {
        arr.push(ele.id)
      })
      this.ids = arr
    },

    // 添加商品方法
    add() {
      this.$store.commit('changetitle', '添加')
      this.$router.push('/products/add')
    },

    // 批量删除方法
    btn_delete() {
      const idsStr = this.ids.join(',')
      this.$confirm('此操作将永久删除选中的文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.ids.length !== 0) {
            deletes({
              ids: idsStr
            }).then((res) => {
              if (res.status === 200) {
                // 点击删除后的消息提示
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                // 判断是否是最后一页
                if (Math.ceil(this.totals / this.pagesize) === this.page) {
                  const remainderPage =
                    this.totals % this.pagesize === 0
                      ? this.pagesize
                      : this.totals % this.pagesize
                  if (remainderPage === this.ids.length) {
                    this.page = this.page - 1
                  }
                }
                // 重新渲染页面
                if (this.formInline.name) {
                  this.checkData(this.page, this.pagesize)
                } else {
                  this.goods(this.page, this.pagesize)
                }
              }
            })
          } else {
            this.$message({
              type: 'info',
              message: '未选中任何一项，请勾选要删除的商品'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },

  created() {
    // 商品列表数据请求
    this.goods(this.page, this.pagesize)
  }
}
</script>

<style lang="less" scoped>
.products_list {
  // 表格数据居中样式
  /deep/ .table-center {
    text-align: center;
  }
  padding: 15px;
  // 标题样式
  .title {
    font-weight: 600;
  }
  // 产品查询添加栏样式
  .add {
    width: 100%;
    height: 50px;
    margin-top: 15px;
    padding: 0 20px;
    background-color: white;
    .demo-form-inline {
      padding-top: 5px;
      /deep/ .el-input__inner {
        width: 180px;
      }
    }
  }
  // 产品列表样式
  .list {
    width: 100%;
    height: 500px;
    margin-top: 15px;
    background-color: white;
  }
  // 页码区样式
  .page {
    width: 100%;
    height: 125px;
    margin-top: 15px;
    padding-top: 55px;
    text-align: center;
  }
}
</style>

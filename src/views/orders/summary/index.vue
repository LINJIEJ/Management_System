<template>
  <div>
    <!-- 顶部区域 -->
    <div class="header">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="预定编号">
            <el-input v-model="formInline.name" size="small" placeholder="预定编号"></el-input>
          </el-form-item>
          <el-form-item label="预定时间">
            <el-date-picker v-model="formInline.date" size="small" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="checkSummarybtn">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <el-button size="small" type="warning">导出</el-button>
        <el-button size="small" type="primary" @click="resert">返回</el-button>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%" header-cell-class-name="active-header"
        cell-class-name="table-center">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="collectNumber" label="汇总单编号">
        </el-table-column>
        <el-table-column prop="person" label="汇总人">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="time" label="汇总时间">
        </el-table-column>
        <el-table-column prop="total" label="汇总单总价格">
        </el-table-column>
        <el-table-column prop="huizongStatus" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">撤销汇总</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="Page">
      <Page :totalxs="totalsize" @changePage="CurrentChange" :currentPages="curPage" :pagesizes="pageSize"></Page>
    </div>
  </div>
</template>

<script>
import { collectAlllist, removeCollectlist, checkCollectList } from '@/api/class'
import dayjs from 'dayjs'
import Page from '@/components/page.vue'
export default {
  components: {
    Page
  },
  data() {
    return {
      // 顶部查询区域
      formInline: {},
      // 订单列表数据展示
      tableData: [],
      // 总条数
      totalsize: 0,
      // 当前页数
      curPage: 1,
      // 每页条数
      pageSize: 8
    }
  },
  methods: {
    dayjs,

    // 重新渲染数据
    resert() {
      this.getcolleceAllList()
    },

    // 查询按钮
    checkSummarybtn() {
      this.checkSummary_router()
    },

    // 查询订单数据请求
    async checkSummary_router() {
      const { data: res } = await checkCollectList({
        collectId: this.formInline.name,
        time: dayjs(this.formInline.date).format('YYYY'),
        page: this.curPage,
        size: this.pageSize
      })
      this.tableData = res.data
      this.totalsize = res.total
      this.$message({
        message: '查询汇总数据成功',
        type: 'success'
      })
    },

    // 获取分页
    CurrentChange(value) {
      this.curPage = value
      // 重新渲染数据
      this.getcolleceAllList()
    },

    // 撤销汇总
    handleEdit(value1, value2) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeCollect(value2)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 撤销汇总接口
    async removeCollect(value) {
      await removeCollectlist({
        id: value.id
      })
      this.getcolleceAllList()
    },

    // 获取订单汇总列表请求
    async getcolleceAllList() {
      const { data: res } = await collectAlllist({
        page: this.curPage,
        size: this.pageSize
      })
      this.tableData = res.data
      this.totalsize = res.total
    }
  },
  created() {
    // 获取订单汇总列表方法
    this.getcolleceAllList()
  }
}
</script>

<style lang="less" scoped>
.header {
  background: #fff;
  margin-bottom: 20px;
  padding: 10px;

  .el-form-item {
    margin-bottom: 16px;
  }

  .group {
    border: 1px solid #eee;
    padding: 8px;
  }
}

.Page {
  width: 100%;
  height: 125px;
  margin-top: 15px;
  padding-top: 55px;
  text-align: center;
}

.content {
  background: #fff;

  /deep/ .active-header {
    color: #333;
    text-align: center;
  }

  /deep/ .table-center {
    text-align: center;
  }

  .pagination {
    padding: 10px;
  }
}
</style>

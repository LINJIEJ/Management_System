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
            <el-button type="primary" size="small" @click="checkbtn">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <el-button size="small" type="warning" @click="collectbtn">订单汇总</el-button>

        <!-- 导出excel数据的组件 -->
        <download-excel class="export-excel-wrapper" :data="tableData" :fields="json_fields" :header="title"
          name="订单列表数据.xls">
          <el-button size="small" type="warning">导出为excel</el-button>
        </download-excel>
        <el-button size="small" type="primary" @click="resert">返回</el-button>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%" header-cell-class-name="active-header"
        cell-class-name="table-center" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="goodsId" label="订单编号">
        </el-table-column>
        <el-table-column prop="goodsName" label="下单人">
        </el-table-column>
        <el-table-column prop="goods_unit" label="所属部门">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="time" label="汇总时间">
        </el-table-column>
        <el-table-column prop="price" label="订单总价格">
        </el-table-column>
        <el-table-column prop="state" label="汇总状态">
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
import { goodsAlllist, updategoodslist, checkGoodsList } from '@/api/class'
import dayjs from 'dayjs'
import Page from '@/components/page.vue'
export default {
  components: {
    Page
  },
  data() {
    return {
      // 导出excel的表头名称和对应的值
      title: '订单列表数据',
      json_fields: {
        // 通过这种格式可以让excel中过长的数据完整显示出来
        订单编号: {
          field: 'goodsId',
          callback: value => {
            return '&nbsp;' + value
          }
        },
        下单人: 'goodsName',
        所属部门: 'goods_unit',
        联系电话: 'phone',
        汇总时间: 'time',
        订单总价格: 'price',
        汇总状态: 'state'
      },

      // 顶部查询区域
      formInline: {
        name: '',
        date: ''
      },
      // 订单列表数据展示
      tableData: [],
      // 总条数
      totalsize: 0,
      // 当前页数
      curPage: 1,
      // 每页条数
      pageSize: 8,
      // 选中的ID
      arrId: []
    }
  },
  methods: {
    // 格式化日期
    dayjs,

    // 重新渲染数据
    resert() {
      this.getAllGoodsList()
    },

    // 查询按钮
    checkbtn() {
      this.check_router()
    },

    // 查询订单数据请求
    async check_router() {
      const { data: res } = await checkGoodsList({
        goodsId: this.formInline.name,
        time: dayjs(this.formInline.date).format('YYYY'),
        page: this.curPage,
        size: this.pageSize
      })
      this.tableData = res.data
      this.totalsize = res.total
      this.$message({
        message: '查询数据成功',
        type: 'success'
      })
    },

    // 订单汇总按钮
    collectbtn() {
      if (this.arrId.length < 2) {
        this.$alert('汇总条数不能少于两条', '订单汇总', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: '取消汇总'
            })
          }
        })
      } else {
        this.muchCollect()
      }
    },

    // 批量汇总请求
    async muchCollect() {
      await updategoodslist({
        ids: this.arrId.join(',')
      })
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.getAllGoodsList()
    },

    // 复选框状态发生变化触发
    handleSelectionChange(selection) {
      const arr = []
      selection.forEach(ele => {
        if (ele.state === '未汇总') {
          arr.push(ele.id)
        } else {
          this.$message({
            message: '该订单已汇总，勾选后不会重复汇总'
          })
        }
      })
      selection.forEach((value) => { })
      this.arrId = arr
      this.DetailsForm = selection
    },

    // 获取分页
    CurrentChange(value) {
      this.curPage = value
      // 重新渲染数据
      this.getAllGoodsList()
    },

    // 获取订单列表请求
    async getAllGoodsList() {
      const { data: res } = await goodsAlllist({
        page: this.curPage,
        size: this.pageSize
      })
      res.data.forEach(ele => {
        ele.state = ele.state === '1' ? '未汇总' : '已汇总'
      })
      this.tableData = res.data
      this.totalsize = res.total
      console.log('订单列表', res)
    }

  },
  created() {
    // 获取订单列表方法
    this.getAllGoodsList()
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

.export-excel-wrapper {
  display: inline-block;
  margin: 0 10px;
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

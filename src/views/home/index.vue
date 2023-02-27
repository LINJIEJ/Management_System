<template>
  <div class="home">
    <!-- 头部样式 -->
    <!-- 第一个标签 -->
    <div class="header">
      <div style="background-color: #409eff" class="box">
        <div class="box1">
          <h4 class="h">总销售额</h4>
          <p class="p">{{ obj.totalsales }}</p>
        </div>
        <div class="box2">今日销售额：{{ obj.sales }}</div>
      </div>

      <!-- 第二个标签 -->
      <div style="background-color: #67c23a" class="box">
        <div class="box1">
          <h4 class="h">总访问量</h4>
          <p class="p">{{ obj.totalcollection }}</p>
        </div>
        <div class="box2">今日访问量：{{ obj.collection }}</div>
      </div>

      <!-- 第三个标签 -->
      <div style="background-color: #e6a23c" class="box">
        <div class="box1">
          <h4 class="h">总收藏量</h4>
          <p class="p">{{ obj.visits }}</p>
        </div>
        <div class="box2">今日收藏量：{{ obj.totalvisit }}</div>
      </div>

      <!-- 第四个标签 -->
      <div style="background-color: #909399" class="box">
        <div class="box1">
          <h4 class="h">总支付量</h4>
          <p class="p">{{ obj.totalpay }}</p>
        </div>
        <div class="box2">今日支付量：{{ obj.pay }}</div>
      </div>
    </div>

    <!-- 主体部分 -->
    <div class="content">
      <div class="content-1">
        <p style="padding: 10px 0">月销售额</p>
        <div class="content-1-1">
          <echarts_z></echarts_z>
        </div>
      </div>
      <div class="content-2">
        <p style="padding: 10px 0">比例分配</p>
        <div class="content-2-1">
          <echarts_y></echarts_y>
        </div>
      </div>
    </div>

    <!-- 尾部部分 -->
    <div class="footer">
      <!-- 第一个盒子 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>今日订单</h3>
        </div>
        <div>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8"
              ><div class="padding">今日订单数</div>
              <div class="size">{{ order.ordersNumber }}</div>
            </el-col>
            <el-col :span="8"
              ><div class="padding">汇总确认订单</div>
              <div class="size">{{ order.confirm }}</div>
            </el-col>
            <el-col :span="8"
              ><div class="padding">累计金额</div>
              <div class="size">{{ order.amount }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!-- 第二个盒子 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>本月订单</h3>
        </div>
        <div>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8"
              ><div class="padding">本月订单数</div>
              <div class="size">{{ order.culOrdersNumber }}</div>
            </el-col>
            <el-col :span="8"
              ><div class="padding">汇总确认订单</div>
              <div class="size">{{ order.culConfirm }}</div>
            </el-col>
            <el-col :span="8"
              ><div class="padding">累计金额</div>
              <div class="size">{{ order.culAmount }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!-- 第三个盒子 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>快捷入口</h3>
        </div>
        <div>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8"
              ><div class="padding">
                <el-button type="primary">产品管理</el-button>
              </div>
            </el-col>
            <el-col :span="8"
              ><div class="padding">
                <el-button type="success">消息管理</el-button>
              </div>
            </el-col>
            <el-col :span="8"
              ><div class="padding">
                <el-button type="info">内容管理</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import echarts_z from '@/components/ehcarts/index.vue'
import echarts_y from '@/components/ehcarts/index1.vue'
import { course, orders } from '@/api/class'
export default {
  components: {
    echarts_z,
    echarts_y
  },
  data() {
    return {
      obj: {},
      order: {}
    }
  },
  created() {
    // 获取支付量，销售量的请求
    this.course()
    // 今日订单和本月订单请求
    this.orders()
  },
  methods: {
    // 获取支付量，销售量的请求
    async course() {
      const { data: res } = await course()
      this.obj = res.message
    },
    // 今日订单和本月订单请求
    async orders() {
      const { data: res } = await orders()
      this.order = res.message
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  // 头部样式
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 0;
    color: #f7f7f7;
    // p标签样式
    .p {
      font-size: 20px;
      padding: 10px 0 10px 30px;
    }
    // h4标签样式
    .h {
      font-weight: 400;
      padding-left: 10px;
    }
    .box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: calc(100% / 5);
      height: 100px;
      padding-top: 5px;
      background-color: aqua;
      border-radius: 20px;
      overflow: hidden;
      // 上半部分
      .box1 {
        width: 100%;
        border-bottom: 1px solid #f7f7f7;
        height: 65px;
      }
      // 下半部分
      .box2 {
        width: 100%;
        flex: 1;
        padding: 0 30px;
      }
    }
  }
  // 主体样式
  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // 左边区域
    .content-1 {
      padding: 10px;
      height: 400px;
      flex: 2;
      background-color: white;
      .content-1-1 {
        width: 100%;
      }
    }
    // 右边区域
    .content-2 {
      padding: 10px;
      height: 400px;
      flex: 1;
      background-color: white;
      margin-left: 20px;
      .content-2-1 {
        width: 100%;
      }
    }
  }
  // 尾部样式
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 20px;
    .padding {
      padding: 20px 0 20px 0;
      font-size: 14px;
    }
    .size {
      font-size: 24px;
    }
    /deep/ .el-card__body {
      text-align: center;
    }
    .box-card {
      flex: 1;
      height: 240px;
      margin: 5px;
      background-color: white;
    }
    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
  }
}
</style>

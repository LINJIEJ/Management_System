<template>
  <div id="Echarts" style="width: 700px; height: 350px"></div>
</template>

<script>
import { pillar } from '@/api/class'
export default {
  data() {
    return {
      sale: [],
      saleNum: []
    }
  },
  methods: {
    myEcharts(sale, saleNum) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('Echarts'))

      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['销售额', '销售量']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['肉类', '水产', '蔬菜', '冷饮食品', '水果']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '销售额',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: saleNum
          },
          {
            name: '销售量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: sale
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    // echarts图表请求
    async pillar() {
      const { data: res } = await pillar()
      res.message.forEach((item) => {
        this.sale.push(item.sales)
        this.saleNum.push(item.salesVolume)
      })
      this.myEcharts(this.sale, this.saleNum)
    }
  },

  created() {
    this.pillar()
  },

  mounted() {}
}
</script>

<style lang="less" scoped>
</style>

<template>
  <div id="Echart" style="width: 350px; height: 400px"></div>
</template>

<script>
import { pillar } from '@/api/class'
export default {
  data() {
    return {
      arr: []
    }
  },
  methods: {
    myEcharts(sale) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('Echart'))
      var option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: sale,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
        const obj = {}
        obj.value = item.salesVolume
        obj.name = item.foot
        this.arr.push(obj)
      })
      this.myEcharts(this.arr)
    }
  },
  created() {
    // echarts图表请求
    this.pillar()
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
</style>

<template>
  <div class="main">
    <div id="order-bar" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'VueAdminTemplateMasterOrderBar',

  data() {
    return {

    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const barEchart = echarts.init(document.getElementById('order-bar'))
      const option = {
        title: {
          text: '订单退单柱状图',
          textStyle: {
            color: '#94A2CD',
            fontStyle: 'normal'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          formatter: function(params, ticket, callback) {
            return `${params.seriesName}<br/>${params.marker}${params.name}:${params.value}`
          },
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          type: 'plain',
          bottom: 10
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#979AA5'
            }
          },
          axisTick: {
            show: true
          }
        },
        series: [
          {
            name: '订单',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            color: ['#AD01F9']
          },
          {
            name: '退单',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            color: ['#23AEF4']
          }
        ]
      }

      barEchart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  width: 100%;
  height: 100%;
  #order-bar{
    width: 100%;
    height: 100%;
  }
}
</style>

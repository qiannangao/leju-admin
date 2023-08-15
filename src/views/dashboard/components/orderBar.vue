<template>
  <div class="main">
    <div id="order-bar" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import orderBackData from './data'
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
      const dateList = orderBackData.map(item => item.date)
      const orderList = orderBackData.map(item => item.order)
      const returnList = orderBackData.map(item => item.returnNum)
      const option = {
        title: {
          text: '订单退单柱状图',
          textStyle: {
            color: '#94A2CD',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: 24
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
          bottom: 10,
          textStyle: {
            color: '#8B99C4' }
        },
        xAxis: {
          type: 'category',
          data: dateList
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#979AA5'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: true
          }
        },
        series: [
          {
            name: '订单',
            data: orderList,
            type: 'bar',
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#7B06DD'// 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: '#B400FB' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#AC05D4' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          },
          {
            name: '退单',
            data: returnList,
            type: 'bar',
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#24C8FF' // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: '#24A0FF' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#2493FF' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
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

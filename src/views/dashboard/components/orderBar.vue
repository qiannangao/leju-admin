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
          text: '订单退单柱状图'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
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

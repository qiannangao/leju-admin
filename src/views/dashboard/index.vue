<template>
  <div class="dashboard-container">
    <div id="box" style="width:100px;height:30px" />

    <div class="order-container">
      <OrderBarEchart /></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import OrderBarEchart from '@/views/dashboard/components/orderBar.vue'
export default {
  name: 'Dashboard',
  components: {
    OrderBarEchart
  },
  data() {
    return {

    }
  },
  mounted() {
    // 初始化echarts实例对象
    const textEcharts = echarts.init(document.getElementById('box'))
    // 配置
    const option = {
      title: {
        text: '1'
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
          data: [5, 20, 36, 10, 10, 20],
          color: [
            'purple'
          ]
        }
      ]
    }
    // 设置
    textEcharts.setOption(option)
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  .order-container{
    width: 600px;
    height: 400px;
    border: 1px solid #000;
    margin: 50px auto;
  }
}
</style>

<template>
  <div style="width:400px;height:400px">
    <div id="pie-echart" style="width:300px;height:300px" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'VueAdminTemplateMasterPieEchart',

  data() {
    return {

    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const pieEchart = echarts.init(document.getElementById('pie-echart'))
      const option = {

        tooltip: {
          trigger: 'item',
          formatter: '{b}数量: {c}个;占比 ({d}%)',
          backgroundColor: 'rgba(0,0,0,0.5)',

          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: [
            'rose1',
            'rose2',
            'rose3',
            'rose4',
            'rose5',
            'rose6',
            'rose7',
            'rose8'
          ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Area Mode',
            type: 'pie',
            radius: ['30%', '60%'],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 0
            },

            data: [
              {
                value: 25,
                name: 'Android',
                label: {
                  color: '#6A48DC'
                },
                itemStyle: {
                  color: '#6A48DC'
                }
              },
              {
                value: 20,
                name: 'ios',
                label: {
                  color: '#24A2FF'
                },
                itemStyle: {
                  color: '#24A2FF'
                }
              },
              {
                value: 15,
                name: 'PC Web',
                label: {
                  color: '#BD00FF'
                },
                itemStyle: {
                  color: '#BD00FF'
                }
              },
              {
                value: 5,
                name: 'Wap Web',
                label: {
                  color: '#771E8D'
                },
                itemStyle: {
                  color: '#771E8D'
                }
              }
            ]
          }
        ]
      }
      pieEchart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

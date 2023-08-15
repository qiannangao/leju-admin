<template>
  <div ref="container" class="dashboard-container">
    <i
      style="color: #fff; font-size: 28px; margin-top: 10px; margin-left: 10px"
      class="el-icon-full-screen"
      @click="changeFullScreen"
    />
    <div class="title">不凡数据大屏</div>
    <!-- <div id="box" style="width:100px;height:30px" /> -->

    <div class="data">
      <!--数字增长 -->
      <div class="sell-data">
        <div style="font-size: 24px">
          电商数据
          <span style="color: #3a4d63">Shell Data</span>
        </div>
        <div class="sale">
          <span style="float: left">销售量</span>
          <span style="float: right; color: #3387e5">万元</span>
        </div>
        <div class="num">
          <countTo :start-val="startVal" :end-val="endVal" :duration="3000" />
        </div>
      </div>
      <!-- 柱形图 -->
      <div class="order-container">
        <OrderBarEchart />
      </div>
      <!-- 统计数据 -->
      <div class="count-data">
        <div style="font-size: 24px; margin-bottom: 15px">
          统计数据
          <span style="color: #3a4d63">Statistics Data</span>
        </div>
        <div class="order">
          <div class="item">
            <div class="icon">
              <i style="color: #8f62f5; font-size: 24px" class="el-icon-date" />
            </div>
            <div class="text">
              <div class="num">85.6</div>
              <div class="des">订单总数(万)</div>
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <i
                style="color: #ea9502; font-size: 24px"
                class="el-icon-s-opportunity"
              />
            </div>
            <div class="text">
              <div class="num">32.5</div>
              <div class="des">销售总量(万)</div>
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <i
                style="color: #e1433b; font-size: 24px"
                class="el-icon-s-custom"
              />
            </div>
            <div class="text">
              <div class="num">92.6</div>
              <div class="des">人均消费</div>
            </div>
          </div>
          <div class="item">
            <div class="icon">
              <i
                style="color: #a3c948; font-size: 24px"
                class="el-icon-lightning"
              />
            </div>
            <div class="text">
              <div class="num">45</div>
              <div class="des">近十分钟新增订单数量</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 完成百分比 -->
    <div class="middle">
      <!-- 词云 -->
      <div class="word-echart">
        <div style="font-size: 24px; color: #8b99c4; margin-bottom: 20px">
          热门搜索词 Top Search
        </div>
        <WordEchart />
      </div>
      <div class="chart">
        <!-- 地图 -->
        <div class="map-echart">
          <div style="font-size: 24px; color: #8b99c4; margin-bottom: 20px">
            全国订单人数分布图
          </div>
          <MapEchart />
        </div>
        <!-- 饼图 -->
        <div class="pie-echart">
          <div style="font-size: 24px; color: #8b99c4; margin-bottom: 20px">
            购买终端
          </div>
          <PieEchart />
        </div>
      </div>
    </div>
    <!-- 大额订单 -->
    <div class="huge-order">
      <div style="font-size: 24px; margin-bottom: 15px; color: #fff">
        大额订单
        <span style="color: #3a4d63;font-size:20px">Top Supper Orders</span>
      </div>
      <el-table class="table" :data="orderList" border :cell-style="{borderColor:'#9aa8d4'}">
        <el-table-column
          prop="time"
          label="时间"
          width="80"
        />
        <el-table-column
          prop="name"
          label="物品"
          width="80"
        />
        <el-table-column
          prop="num"
          label="数量"
          width="70"
        />
        <el-table-column
          prop="price"
          label="金额"
          width="70"
        />

      </el-table>

    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import OrderBarEchart from '@/views/dashboard/components/orderBar.vue'
import countTo from 'vue-count-to'
import WordEchart from '@/views/dashboard/components/wordEchart.vue'
import MapEchart from './components/mapEchart.vue'
import PieEchart from './components/pieEchart.vue'
import screenfull from 'screenfull'
export default {
  name: 'Dashboard',
  components: {
    OrderBarEchart,
    countTo,
    WordEchart,
    MapEchart,
    PieEchart
  },
  data() {
    return {
      startVal: 0,
      endVal: 20001011,
      orderList: [
        {
          time: '2023-5-1',
          name: '灯具',
          num: 8,
          price: 988
        },
        {
          time: '2023-5-2',
          name: '实木地板',
          num: 200,
          price: 288
        },
        {
          time: '2023-5-3',
          name: '墙贴',
          num: 33,
          price: 99
        },
        {
          time: '2023-5-4',
          name: '北欧装饰画',
          num: 111,
          price: 378
        }
      ]
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
          color: ['purple']
        }
      ]
    }
    // 设置
    textEcharts.setOption(option)
  },
  methods: {
    // 全屏
    changeFullScreen() {
      if (screenfull.isEnabled) {
        // 控制是否全屏的按钮
        screenfull.toggle(this.$refs.container)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 1000px;
  background-color: #0a1631;
  position: relative;
  .title {
    font-weight: 600;
    font-size: 36px;
    color: #fff;
    width: 300px;
    height: 50px;
    margin: 20px auto;
    text-shadow: 0 0 3px #fff, 0 0 15px #fff;
  }
  .data {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: space-between;
    .order-container {
      width: 600px;
      height: 400px;
      // border: 1px solid #000;
      margin: 0px auto;
    }
    .sell-data {
      margin-left: 5px;
      // border: 1px solid #000;
      width: 300px;
      height: 200px;
      color: #9aa8d4;
      .title {
        font-size: 24px;
      }
      .sale {
        width: 280px;
        height: 30px;
        margin-top: 10px;
      }
      .num {
        color: #fff;
        font-weight: 700;
        font-size: 60px;
      }
    }
    .count-data {
      width: 320px;
      height: 300px;
      color: #9aa8d4;
      // background-color: pink;
      .order {
        width: 300px;
        height: 200px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-right: 5px;
        .item {
          width: 130px;
          height: 80px;
          .icon {
            width: 30px;
            height: 30px;
            float: left;
          }
          .text {
            width: 100px;
            height: 50px;
            float: right;
            .num {
              color: #fff;
              font-weight: 700;
              font-size: 28px;
              width: 100px;
              height: 40px;
            }
            .des {
              color: #9aa8d4;
              font-size: 14px;
              width: 100px;
              height: 30px;
            }
          }
        }
      }
    }
  }
  .middle {
    width: 100%;
    height: 600px;
    .word-echart {
      float: left;
      margin-left: 5px;
      width: 400px;
      height: 500px;
      // border: 1px solid #000;
    }
    .chart {
      width: 600px;
      height: 500px;
      float: left;
      .map-echart {
        float: left;
        // border: 1px solid #000;
        width: 300px;
        height: 300px;
      }
      .pie-echart {
        width: 300px;
        height: 300px;
        float: right;
      }
    }
  }
  .huge-order {
    width: 320px;
    height: 400px;
    position: absolute;
    right: 5px;
    top: 400px;
 /*最外层透明*/
::v-deep .el-table,
::v-deep .el-table__expanded-cell {
 background-color: transparent !important;
 color: #9aa8d4;
 border: #9aa8d4;
}
/* 表格内背景颜色 */
::v-deep .el-table th,
::v-deep .el-table tr,
::v-deep .el-table td {
 background-color: transparent !important;
 border: 0; //去除表格
 color: #9aa8d4;
}
  }
}
</style>

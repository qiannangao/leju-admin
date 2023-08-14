<template>
  <div class="main">
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-form
        ref="formOrder"
        :model="searchList"
        label-width="80px"
        size="mini"
      >
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="订单编号" size="mini">
              <el-input v-model="searchList.orderSn" size="mini" placeholder="请输入订单编号" />
            </el-form-item>
          </el-col>
          <!--  订单类型：0->正常订单；1->秒杀订单 , -->
          <el-col :span="6" :offset="0">
            <el-form-item label="订单类型" size="mini">
              <el-select v-model="searchList.orderType" clearable>
                <el-option label="正常订单" :value="0" />
                <el-option label="秒杀订单" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- payType (integer, optional): 支付方式：0->未支付；1->支付宝；2->微信 , -->
          <el-col :span="6" :offset="0">
            <el-form-item label="支付方式" size="mini">
              <el-select v-model="searchList.payType" clearable>
                <el-option label="未支付" :value="0" />
                <el-option label="支付宝支付" :value="1" />
                <el-option label="微信支付" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- status (integer, optional): 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->退货；5->无效订单 -->
          <el-col :span="6" :offset="0">
            <el-form-item label="支付状态" size="mini">
              <el-select v-model="searchList.status" clearable>
                <el-option
                  v-for="item in payStatus"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="20">
            <el-form-item>
              <el-button
                type="primary"
                @click="doSearch"
              >搜索</el-button>
              <el-button
                @click="doReset"
              >重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 訂單列表 -->
    <el-card shadow="never" class="margin-30">
      <el-table :data="orderList" border stripe>
        <el-table-column type="index" label="#" width="50" fixed="left" />
        <el-table-column prop="orderSn" label="订单编号" width="180" />
        <!-- payType (integer, optional): 支付方式：0->未支付；1->支付宝；2->微信  -->
        <el-table-column prop="payType" label="支付方式" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.payType === 0">
              <el-tag
                type="info"
                effect="dark"
              >
                未支付
              </el-tag>
            </div>
            <div v-if="scope.row.payType === 1">
              <svg-icon icon-class="zhifubao" />
            </div>
            <div v-if="scope.row.payType === 2">
              <svg-icon icon-class="wechat" />
            </div>
          </template>
        </el-table-column>
        <!-- status (integer, optional): 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->退货；5->无效订单 -->
        <el-table-column prop="status" label="订单状态" width="180">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0" type="danger" size="normal" effect="dark">待付款</el-tag>
            <el-tag v-if="scope.row.status==1" type="warning" size="normal">待发货</el-tag>
            <el-tag v-if="scope.row.status==2" type="success" size="normal" effect="dark">已发货</el-tag>
            <el-tag v-if="scope.row.status==3" type="info" size="normal">已完成</el-tag>
            <el-tag v-if="scope.row.status==4" type="warning" size="normal">退货</el-tag>
            <el-tag v-if="scope.row.status==5" type="info" size="normal" effect="dark">无效订单</el-tag>

          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="180" />
        <el-table-column prop="memberUsername " label="用户账号" width="180" />
        <!-- orderType (integer, optional): 订单类型：0->正常订单；1->秒杀订单 , -->
        <el-table-column prop="orderType" label="订单类型" width="180">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.orderType==0" type="success">正常订单</el-tag>
            <el-tag v-if="scope.row.orderType==1" type="danger">秒杀订单</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="note " label="备注" width="180" />
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="goOrderDetail(scope.row.id)">查看订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="24" :offset="5">
        <el-pagination
          :current-page.sync="pagination.start"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagination.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          background
          @size-change="sizeChange"
          @current-change="currentChange"
        />
      </el-col>

    </el-row>

  </div>
</template>

<script>
import { findOrdersByPage } from '@/api/order/order'
import mixin from '@/mixins/index'
import { filterNullstr } from '@/utils'
export default {
  name: 'VueAdminTemplateMasterIndex',
  mixins: [mixin],
  data() {
    return {
      searchList: {},
      orderList: [],
      payStatus: [
        {
          text: '待付款',
          value: 0
        },
        {
          text: '待发货',
          value: 1
        },
        {
          text: '已发货',
          value: 2
        },
        {
          text: '已完成',
          value: 3
        },
        {
          text: '退货',
          value: 4
        },
        {
          text: '无效订单',
          value: 5
        }
      ]
    }
  },

  created() {
    this.dofindOrdersByPage()
  },

  methods: {
    // 搜索
    doSearch() {
      this.pagination.start = 1
      this.dofindOrdersByPage()
    },
    // 重置
    doReset() {
      this.searchList = this.$options.data().searchList
      this.pagination.start = 1
      this.dofindOrdersByPage()
    },
    // 每页展示多少变化
    sizeChange(val) {
      this.pagination.start = 1
      this.pagination.limit = val
      this.dofindOrdersByPage()
    },
    // 当前页变化
    currentChange(val) {
      this.pagination.start = val
      this.dofindOrdersByPage()
    },
    // 查询订单列表
    async dofindOrdersByPage() {
      const newForm = filterNullstr(this.searchList)
      const res = await findOrdersByPage(
        this.pagination.start,
        this.pagination.limit,
        newForm

      )
      console.log(res)
      const { success, data, message } = res
      if (success) {
        this.orderList = data.rows
        this.pagination.total = data.total
      } else {
        this.$message.error(message)
      }
    },
    // 查看订单
    goOrderDetail(id) {
      this.$router.push({ name: 'OrderDetail', params: { id }})
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  ::v-deep.el-form-item__label {
    font-weight: normal;
  }
  .svg-icon[data-v-c8a70580] {
    width: 50px;
    height: 30px;
  }
}
</style>

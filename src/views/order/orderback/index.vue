<template>
  <div class="main">
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-form ref="form" :model="searchForm" label-width="80px" size="mini">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="订单编号">
              <el-input v-model="searchForm.orderSn" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <!-- status (string, optional): 申请状态：0->待处理；1->退货中；2->已完成；3->已拒绝 -->
            <el-form-item label="退单状态">
              <el-select v-model="searchForm.status" clearable style="width:100%">
                <el-option
                  v-for="item in returnStatus"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                />
              </el-select>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="16">
            <el-form-item>
              <el-button type="primary">搜索</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>

    </el-card>
    <el-card shadow="never" class="margin-30">
      <el-table :data="orderBackList" border stripe>
        <el-table-column
          type="index"
          label="#"
          width="50"
          fixed="left"
        />
        <el-table-column
          prop="orderSn"
          label="订单编号"
          width="180"
        />
        <el-table-column
          label="退单状态"
          width="180"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.status===0" type="danger" size="mini">待处理</el-button>
            <el-button v-if="scope.row.status===1" type="warning" size="mini">退货中</el-button>
            <el-button v-if="scope.row.status===2" type="primary" size="mini">已完成</el-button>
            <el-button v-if="scope.row.status===3" type="info" size="mini">已拒绝</el-button>

          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="180"
        />
        <el-table-column
          prop="reason"
          label="退单原因"
          width="180"
        />
        <el-table-column
          prop="productName"
          label="商品名称"
          width="180"
        />
        <el-table-column
          label="商品属性"
          width="180"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.productAttr|toStr }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="handleNote"
          label="商家备注"
          width="180"
        />
        <el-table-column
          prop="createTime"
          label="添加时间"
          width="180"
        />
        <el-table-column
          label="操作"
          width="180"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button type="primary" @click="goOrderBack(scope.row.id)">查看订单</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>

  </div>
</template>

<script>
import { findReturnApply } from '@/api/order/order'
import mixin from '@/mixins/index'
export default {
  name: 'VueAdminTemplateMasterIndex',
  filters: {
    toStr(str) {
      const newArr = JSON.parse(str).map(item => {
        return item.key + ':' + item.value
      })
      return newArr.join(',')
    }
  },
  mixins: [mixin],
  data() {
    return {
      searchForm: {
      },
      returnStatus: [
        {
          text: '待处理',
          value: 0
        },
        {
          text: '退货中',
          value: 1
        },
        {
          text: '已完成',
          value: 2
        },
        {
          text: '已拒绝',
          value: 3
        }
      ],
      orderBackList: []
    }
  },
  created() {
    this.dofindReturnApply()
  },

  methods: {
    async dofindReturnApply() {
      const res = await findReturnApply(this.pagination.start, this.pagination.limit)
      const { success, message, data } = res
      if (success) {
        this.orderBackList = data.rows
        this.pagination.total = data.rows
      } else {
        this.$message.error(message)
      }
    },
    // 查看訂單詳情
    goOrderBack(id) {
      this.$router.push({ name: 'OrderbackDetail', params: { id }})
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  ::v-deep.el-form-item__label {
    font-weight: normal;
  }
}
</style>

<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <!-- 'status': 1, // 订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单 -->
      <el-steps :active="orderBase.status + 1" align-center>
        <el-step title="待付款" :description="orderBase.createTime" />
        <el-step title="代发货" :description="orderBase.paymentTime" />
        <el-step title="已发货" :description="orderBase.deliveryTime" />
        <el-step v-if="orderBase.status!=4" title="已完成" :description="orderBase.receiveTime" />
        <el-step v-if="orderBase.status!=3" title="退货" :description="orderBase.finishTime" />
      </el-steps>
      <el-divider />
      <!-- 1订单信息 -->
      <div>
        <div class="title">
          <span style="font-weight: 600; margin-right: 30px">订单信息</span>
          <el-tag
            v-if="orderBase.status == 0"
            type="danger"
            size="mini"
            effect="dark"
          >待付款</el-tag>
          <el-tag
            v-if="orderBase.status == 1"
            type="warning"
            size="mini"
          >待发货</el-tag>
          <el-tag
            v-if="orderBase.status == 2"
            type="success"
            size="mini"
            effect="dark"
          >已发货</el-tag>
          <el-tag
            v-if="orderBase.status == 3"
            type="info"
            size="mini"
          >已完成</el-tag>
          <el-tag
            v-if="orderBase.status == 4"
            type="warning"
            size="mini"
          >退货</el-tag>
          <el-tag
            v-if="orderBase.status == 5"
            type="info"
            size="mini"
            effect="dark"
          >无效订单</el-tag>
        </div>
        <el-row :gutter="20" style="margin-bottom: 20px; margin-top: 20px">
          <el-col :span="6" :offset="0">
            <div>
              订单金额：
              <span style="color: red">{{ orderBase.totalAmount }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              订单编号：
              <span>{{ orderBase.orderSn }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              用户账号：
              <span>{{ orderBase.memberUsername }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              备注：
              <span>{{ orderBase.note }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <div>
              下单时间：
              <span>{{ orderBase.createTime }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              付款时间：
              <span>{{ orderBase.paymentTime }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              发货时间：
              <span>{{ orderBase.deliveryTime }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              收货时间：
              <span>{{ orderBase.receiveTime }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-divider direction="horizontal" content-position="left" />
      <!--2 收货人信息 -->
      <div>
        <div class="title">
          <span style="font-weight: 600; margin-right: 30px">收货人信息</span>
        </div>
        <el-row :gutter="20" style="margin-bottom: 20px; margin-top: 20px">
          <el-col :span="6" :offset="0">
            <div>
              收货人：
              <span>{{ orderBase.receiverName }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              用户姓名：
              <span>{{ orderBase.memberUsername }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              手机号码
              <span>{{ orderBase.billReceiverPhone }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              邮政编码：
              <span>{{ orderBase.receiverPostCode }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <div>
              地区：
              <span>{{ orderBase.receiverProvince }}-{{
                orderBase.receiverCity
              }}-{{ orderBase.receiverRegion }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              详细地址：
              <span>{{ orderBase.receiverDetailAddress }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-divider direction="horizontal" content-position="left" />

      <!-- 3 商品信息 -->
      <div>
        <div class="title" style="margin-bottom:30px">
          <span style="font-weight: 600; margin-right: 30px">商品信息</span>
        </div>
        <el-table :data="orderItems" border stripe>
          <el-table-column
            :prop="productName ? productName : '空'"
            label="商品名称"
            width="180px"
          />
          <el-table-column
            :prop="productName"
            label="商品图片"
            width="120px"
            align="center"
          >
            <template slot-scope="scope">
              <img
                width="100"
                height="80"
                :src="scope.row.productSkuPic"
                alt=""
              >
            </template>
          </el-table-column>
          <el-table-column label="是否退货" width="180px" align="center">
            <!--  'isReturn': 0, // 是否退单: 0 否  ;  1  是 -->
            <template slot-scope="scope">
              <el-button type="text" size="small">{{
                scope.row.isReturn == 0 ? '否' : '是'
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            :prop="productBrand"
            label="品牌"
            width="120px"
            align="center"
          />
          <el-table-column
            :prop="productPrice"
            label="价格"
            width="180px"
            align="center"
          />
          <el-table-column
            :prop="productQuantity"
            label="商品数量"
            width="180px"
            align="center"
          />
          <el-table-column
            :prop="totalPrice"
            label="小计"
            width="180px"
            align="center"
            fixed="right"
          />
        </el-table>
      </div>
      <el-divider direction="horizontal" content-position="left" />
      <!-- 4费用信息 -->
      <div>
        <div class="title" style="margin-bottom:30px">
          <span style="font-weight: 600; margin-right: 30px">费用信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <div>
              运费金额：
              <span style="color: red; margin-right: 20px">0</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              订单总金额
              <span style="color: red; margin-right: 20px">{{ orderItems.totalPrice }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              实际金额：
              <span style="color: red; margin-right: 20px">{{ orderItems.realAmount }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              促销优化金额：
              <span style="color: red; margin-right: 20px">{{ orderItems.promotionAmount }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-divider direction="horizontal" content-position="left" />
      <!-- 5发货 -->
      <div v-if="orderBase.status === 1">
        <el-form ref="form" :model="sendForm" label-width="80px" size="mini">
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="物流公司" prop="deliveryCompany">

                <el-select v-model="sendForm.deliveryCompany" placeholder="物流公司" clearable filterable>
                  <el-option
                    label="中通"
                    value="中通"
                  />
                  <el-option
                    label="申通"
                    value="申通"
                  />
                  <el-option
                    label="圆通"
                    value="圆通"
                  />
                  <el-option
                    label="邮政"
                    value="邮政"
                  />
                  <el-option
                    label="京东"
                    value="京东"
                  />
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="物流单号" prop="deliverySn">
                <el-input v-model="sendForm.deliverySn" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item>
                <el-button type="primary" @click="doSendProduct">确认发货</el-button>

              </el-form-item>
            </el-col>

          </el-row>

        </el-form>

      </div>
      <!-- 6 物流信息 -->
      <div v-if="orderBase.status !== 0 | orderBase.status !== 1">
        <div>物流信息：
          <span>{{ orderBase.deliveryCompany }} [{{ orderBase.deliverySn }}]</span></div>

      </div>

    </el-card>
  </div>
</template>

<script>
import { orderDetail, sendDone } from '@/api/order/order'
export default {
  name: 'VueAdminTemplateMasterOrderDetail',
  data() {
    return {
      orderId: '',
      orderBase: {},
      orderItems: [],
      sendForm: {}
    }
  },

  created() {
    this.orderId = this.$route.params.id
    this.getorderDetail()
  },

  methods: {
    async getorderDetail() {
      const res = await orderDetail(this.orderId)
      const { success, message, data } = res
      if (success) {
        this.orderBase = data.orderDetail.orderBase
        this.orderItems = data.orderDetail.orderItems
      } else {
        this.$message.error(message)
      }
    },
    async doSendProduct() {
      const res = await sendDone({
        orderId: this.orderId,
        ...this.sendForm
      })
      const { success, message } = res
      if (success) {
        this.getOrderDetail()
      } else {
        this.$message.error(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

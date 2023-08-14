<template>
  <div class="main">
    <el-card shadow="never" class="margin-30">
      <!-- 1 -->
      <!-- status (string, optional): 申请状态：0->待处理；1->退货中；2->已完成；3->已拒绝 -->
      <h3>
        订单信息：
        <el-tag
          v-if="orderBackDetail.status === 0"
          type="danger"
          size="mini"
          effect="dark"
        >待处理</el-tag>
        <el-tag
          v-if="orderBackDetail.status === 1"
          type="warning"
          size="mini"
          effect="dark"
        >退货中</el-tag>
        <el-tag
          v-if="orderBackDetail.status === 2"
          type="success"
          size="mini"
          effect="dark"
        >已完成</el-tag>
        <el-tag
          v-if="orderBackDetail.status === 3"
          type="info"
          size="mini"
          effect="dark"
        >已拒绝</el-tag>
      </h3>
      <div>
        <el-row style="margin-bottom: 30px" :gutter="20">
          <el-col :span="8" :offset="0">
            <div>
              订单编号：
              <span>{{ orderBackDetail.orderSn }}</span>
              <router-link
                style="font-size: 14px; color: #409eff; margin-left: 5px"
                :to="'/order/orderDetail/'+orderBackDetail.orderId"
              >查看订单详情</router-link>
            </div>
          </el-col>
          <el-col :span="4" :offset="0">
            <div>
              退单人姓名：
              <span>{{ orderBackDetail.returnName }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              退单理由：
              <span>{{ orderBackDetail.reason }}</span>
            </div>
          </el-col>
          <el-col :span="6" :offset="0">
            <div>
              退单描述：
              <span>{{ orderBackDetail.description }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 30px" :gutter="20">
          <el-col :span="6" :offset="0">
            申请时间：
            <span>{{ orderBackDetail.createTime }}</span>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 30px" :gutter="20">
          <el-col :span="6" :offset="0">
            <div style="margin-bottom: 10px">退单图片:</div>
            <img
              width="100"
              height="100"
              :src="orderBackDetail.proofPics"
              alt=""
            >
          </el-col>
        </el-row>
      </div>
      <el-divider direction="horizontal" content-position="left" />
      <!-- 2 -->
      <h3>退货商品</h3>
      <div>
        <el-table :data="[orderBackDetail]" border stripe>
          <el-table-column label="商品图片" width="120">
            <template slot-scope="scope">
              <img
                width="100"
                height="100"
                :src="scope.row.productPic"
                alt=""
              >
            </template>
          </el-table-column>
          <el-table-column prop="description" label="商品描述" width="180" />
          <el-table-column prop="productPrice" label="商品价格" width="180" />
          <el-table-column label="商品属性" width="180">
            <template slot-scope="scope">
              <div>{{ scope.row.productAttr | toStr }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="productCount" label="商品数量" width="180" />
          <el-table-column
            prop="productRealPrice"
            label="总计"
            width="180"
            fixed="right"
          />
        </el-table>
      </div>
      <el-divider direction="horizontal" content-position="left" />

      <!-- 3 -->
      <h3>用户信息：</h3>
      <div>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            联系人：
            <span>{{ orderBackDetail.returnName }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            联系电话：
            <span>{{ orderBackDetail.returnPhone }}</span>
          </el-col>
        </el-row>
      </div>
      <el-divider direction="horizontal" content-position="left" />

      <!-- 4 -->
      <h3>费用信息：</h3>
      <div>
        <el-row style="margin-bottom: 10px" :gutter="20">
          <el-col :span="6" :offset="0">
            退单金额：
            <span style="color: red">{{ orderBackDetail.returnAmount }}</span>
          </el-col>
          <el-col :span="6" :offset="0">
            运费金额：
            <span style="color: red">{{ orderBackDetail.freightAmount }}</span>
          </el-col>
        </el-row>
      </div>
      <el-divider direction="horizontal" content-position="left" />

      <!-- 5 “待处理”时显示 -->
      <el-row v-if="orderBackDetail.status === 0" :gutter="20">
        <el-col :span="24" :offset="0">
          <el-form
            ref="form"
            :model="returnForm"
            label-width="80px"
            size="normal"
            style="font-size: 20px"
          >
            <el-row :gutter="20">
              <el-col :span="8" :offset="0">
                <el-form-item label="退款金额" prop="returnAmount">
                  <el-input-number
                    v-model="returnForm.returnAmount"
                    size="mini"
                    style="width: 100%"
                    label=""
                    :min="0"
                    :step="1"
                    :controls="true"
                    controls-position="both"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="处理人" prop="handleMan">
                  <el-input v-model="returnForm.handleMan" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="处理备注" prop="handleNote">
                  <el-input v-model="returnForm.handleNote" size="mini" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 30px" :gutter="20">
              <el-col :span="10" :offset="8">
                <el-form-item>
                  <el-button
                    type="primary"
                    size="medium"
                    @click="doagreeApply()"
                  >同意退款</el-button>
                  <el-button
                    size="medium"
                    @click="dorejectApply()"
                  >拒绝退款</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col></el-row>
      <!-- 6 “退货中”显示 -->
      <div v-if="orderBackDetail.status === 1">
        <h3>处理结果：</h3>
        <div>
          <el-row style="margin-bottom:20px" :gutter="20">
            <el-col :span="6" :offset="0">
              处理人:
              <span>{{ orderBackDetail.handleMan }}</span>
            </el-col>
            <el-col :span="6" :offset="0">
              处理备注:
              <span>{{ orderBackDetail.handleNote }}</span>
            </el-col>
            <el-col :span="6" :offset="0">
              处理时间:
              <span>{{ orderBackDetail.handleTime }}</span>
            </el-col>
          </el-row>
          <!-- 收货表单 -->
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form
                ref="receiveFormComp"
                :model="receiveForm"
                :rules="rules"
                label-width="110px"
              >
                <el-row :gutter="20">
                  <el-col :span="6" :offset="0">
                    <el-form-item label="收货人" size="mini" prop="receiveMan">
                      <el-input v-model="receiveForm.receiveMan" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :offset="0">
                    <el-form-item
                      label="收货备注"
                      size="mini"
                      prop="receiveNote"
                    >
                      <el-input v-model="receiveForm.receiveNote" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="6" :offset="10">
                    <el-form-item>
                      <el-button
                        type="primary"
                        @click="doreceiveProduct()"
                      >确认收货</el-button>

                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 7 "已完成"时显示 -->
      <div v-if="orderBackDetail.status===2">
        <h3>收货信息：</h3>
        <div>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              退单收货人：
              <span>{{ orderBackDetail.receiveMan }}</span>
            </el-col>
            <el-col :span="6" :offset="0">
              退单收货备注：
              <span>{{ orderBackDetail.receiveNote }}</span>
            </el-col>
            <el-col :span="6" :offset="0">
              退单收货时间：
              <span>{{ orderBackDetail.receiveTime }}</span>
            </el-col>
          </el-row>

        </div>
      </div>
      <!-- 8 “已拒绝” -->
      <div v-if="orderBackDetail.status===3">
        <h3>处理结果：</h3>
        <div>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              退单人：
              <span>{{ orderBackDetail.handleMan }}</span>
            </el-col>
            <el-col :span="6" :offset="0">
              处理备注：
              <span>{{ orderBackDetail.handleNote }}</span>
            </el-col>
            <el-col :span="6" :offset="0">
              处理时间：
              <span>{{ orderBackDetail.handleTime }}</span>
            </el-col>
          </el-row>

        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { orderReturn, agreeApply, rejectApply, receiveProduct } from '@/api/order/order'
export default {
  name: 'VueAdminTemplateMasterOrderBackDetail',
  filters: {
    toStr(str) {
      // console.log(this.parse(str))
      // const newStr = this.parse(str)
      const newArr = JSON.parse(str).map((item) => {
        if (item.value) {
          return item.key + ':' + item.value
        } else {
          return item.key + '为空'
        }
      })
      return newArr.join(',')
    }
  },

  data() {
    return {
      orderBackId: '',
      orderBackDetail: [],
      returnForm: {},
      receiveForm: {},
      rules: {
        receiveMan: [
          { required: true, message: '收货人必填', trigger: 'blur' }
        ],
        receiveNote: [
          { required: true, message: '收获备注必填', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    console.log(this.$route.params)
    this.orderBackId = this.$route.params.id
    this.getorderReturn()
  },

  methods: {
    // 获取退单信息
    async getorderReturn() {
      const res = await orderReturn(this.orderBackId)
      const { success, data, message } = res
      if (success) {
        this.orderBackDetail = data.orderReturnApply
        console.log(this.orderBackDetail)
      } else {
        this.$message.error(message)
      }
    },
    // 同意退单
    async doagreeApply() {
      this.returnForm.id = this.orderBackId
      const res = await agreeApply(this.orderBackId, this.returnForm)
      const { success, message } = res
      if (success) {
        // 成功则更新数据
        this.$message.success('您已同意退款请求')
        this.getorderReturn()
      } else {
        this.$message.error(message)
      }
    },
    // 拒绝退单
    async dorejectApply() {
      this.returnForm.id = this.orderBackId
      const res = await rejectApply(this.orderBackId, this.returnForm)
      const { success, message } = res
      if (success) {
        this.$message.success('您已拒绝退款请求')
        this.getorderReturn()
      } else {
        this.$message.error(message)
      }
    },
    // 确认收货
    doreceiveProduct() {
      this.$refs.receiveFormComp.validate(async(valid) => {
        if (valid) {
          this.receiveForm.id = this.orderBackId
          const res = await receiveProduct(this.orderBackId, this.receiveForm)
          const { success, message } = res
          if (success) {
            this.$message.success('确认收货成功')
            this.getorderReturn()
          } else {
            this.$message.error(message)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  ::v-deep.el-form-item__label {
    font-weight: normal;
    font-size: 16px;

  }
}
</style>

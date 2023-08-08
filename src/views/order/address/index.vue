<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <el-button type="primary" size="mini" @click="goAddAddress">新增</el-button>
      </div>
      <el-table
        :data="addressList"
        style="width: 100%"
        stripe
      >
        <el-table-column
          type="index"
          label="#"
          width="50"
          fixed="left"
        />
        <el-table-column
          prop="addressName"
          label="地址名称"
          width="180"
        />
        <el-table-column
          prop="addressName"
          label="默认发货地址"
          width="120"
        >
          <!-- 默认发货地址 0否，1是 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.sendStatus"
              :active-value="1"
              :inactive-value="0"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="收货人姓名"
          width="180"
        />

        <el-table-column
          prop="phone"
          label="收货人电话"
          width="180"
        />
        <el-table-column
          prop="detailAddress"
          label="收货人地址"
          width="200"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.province }}
              {{ scope.row.city }}
              {{ scope.row.region }}</div>
            <div>{{ scope.row.addressName }}</div>

          </template>
        </el-table-column>
        <el-table-column
          prop="receiveStatus"
          label="默认收货地址"
          width="180"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180"
        />
        <el-table-column
          label="操作"
          width="100"
          fixed="right"
        >
          <template>
            <el-button type="text" style="color:#409EFF">编辑</el-button>
            <el-button type="text" style="color:red">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>
    <el-dialog width="60%" title="新增地址" :visible.sync="dialogTableVisible">
      <el-form ref="formAddress" v-model="address" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="地址名称" prop="addressName">
              <el-input v-model="address.addressName" placeholder="请输入地址名称" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="收货人姓名">
              <el-input v-model="address.name" placeholder="请输入收货人姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="收货人手机号">
              <el-input v-model="address.phone" placeholder="请输入收货人手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="邮政编码">
              <el-input v-model="address.postCode" placeholder="请输入邮政编码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="收货地址">

              <el-cascader
                v-model="selectedOptions"
                style="width:100%"
                size="large"
                :options="regionData"
                @change="cascaderChange"
              />

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="详细地址">
              <el-input v-model="address.detailAddress " placeholder="请输入详细地址" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="8">
            <el-form-item>
              <el-button @click="dialogTableVisible = false">取 消</el-button>
              <el-button type="primary" @click="doSubmit">确 定</el-button>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form></el-dialog>
  </div>
</template>

<script>
import { regionData, codeToText } from 'element-china-area-data'
import { getAddress, addAddress } from '@/api/order/address'
export default {
  name: 'VueAdminTemplateMasterIndex',

  data() {
    return {
      addressList: [],
      dialogTableVisible: false,
      address: '',
      regionData,
      selectedOptions: ['11', '1101', '110101'],
      rules: {
        addressName: [
          { required: true, message: '请输入地址名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.getAddressList()
  },

  methods: {
    async getAddressList() {
      const res = await getAddress()
      console.log('getaddress', res)
      const { success, data, message } = res
      if (success) {
        this.addressList = data.items
      } else {
        this.$message.error(message)
      }
    },
    // 新增地址
    goAddAddress() {
      this.dialogTableVisible = true
    },
    cascaderChange(e) {
      console.log(e)
      console.log(codeToText[e[0]], codeToText[e[1]], codeToText[e[2]])
    },
    // 提交;新增或修改
    doSubmit() {
      // 表单校验
      this.$refs.formAddress.validate(async(valid) => {
        if (valid) {
          this.address.province = codeToText[this.selectedOptions[0]]
          this.address.city = codeToText[this.selectedOptions[1]]
          this.address.region = codeToText[this.selectedOptions[2]]
          this.address.cityCode = this.selectedOptions.join(',')

          const res = await addAddress(this.address)
          console.log('addAddress', res)
          const { success, message } = res
          if (success) {
            // 关闭对话框
            this.dialogTableVisible = false
            // 更新数据
            this.$emit('refresh')
            // 重置表单
          } else {
            this.$message.error(message)
          }
        } else {
          this.$message.warning('注意表单校验')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <el-button
          type="primary"
          size="mini"
          @click="goAddAddress"
        >新增</el-button>
      </div>
      <el-table :data="addressList" style="width: 100%" stripe>
        <el-table-column type="index" label="#" width="50" fixed="left" />
        <el-table-column prop="addressName" label="地址名称" width="180" />
        <el-table-column prop="addressName" label="默认发货地址" width="120">
          <!-- 默认发货地址 0否，1是 -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.sendStatus"
              :active-value="1"
              :inactive-value="0"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="收货人姓名" width="180" />

        <el-table-column prop="phone" label="收货人电话" width="180" />
        <el-table-column prop="detailAddress" label="收货人地址" width="200">
          <template slot-scope="scope">
            <div>
              {{ scope.row.province }}
              {{ scope.row.city }}
              {{ scope.row.region }}
            </div>
            <div>{{ scope.row.addressName }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="receiveStatus"
          label="默认收货地址"
          width="180"
        />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              style="color: #409eff"
              @click="editAddress(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="text"
              style="color: red"
              @click="doDelAddress(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      width="60%"
      :title="address.id ? '更新地址' : '新增地址'"
      :visible.sync="dialogTableVisible"
      @close="closeSubmit"
    >
      <el-form ref="formAddress" :model="address" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="地址名称" prop="addressName">
              <el-input
                v-model="address.addressName"
                placeholder="请输入地址名称"
              />
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
              <el-input
                v-model="address.phone"
                placeholder="请输入收货人手机号"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="邮政编码">
              <el-input
                v-model="address.postCode"
                placeholder="请输入邮政编码"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="收货地址">
              <el-cascader
                v-model="selectedOptions"
                style="width: 100%"
                size="large"
                :options="regionData"
                @change="cascaderChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="详细地址">
              <el-input
                v-model="address.detailAddress"
                placeholder="请输入详细地址"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="8">
            <el-form-item>
              <el-button @click="cancelSubmit">取 消</el-button>
              <el-button type="primary" @click="doSubmit">确 定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form></el-dialog>
  </div>
</template>

<script>
import { regionData, codeToText } from 'element-china-area-data'
import {
  getAddress,
  addAddress,
  companyAddress,
  updateAddress,
  delAddress
} from '@/api/order/address'
export default {
  name: 'VueAdminTemplateMasterIndex',

  data() {
    return {
      addressList: [],
      dialogTableVisible: false,
      address: {},
      regionData,
      selectedOptions: ['11', '1101', '110101'],
      rules: {
        addressName: [{ required: true, message: '地址必填', trigger: 'blur' }]
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
    // 取消提交
    cancelSubmit() {
      console.log('取消', 111)
      this.dialogTableVisible = false
      // 重置表单
      // console.log(this.$options.data)
      this.address = this.$options.data().address
      this.selectedOptions = this.$options.data().selectedOptions
    },
    closeSubmit() {
      console.log('关闭', 222)
      this.address = this.$options.data().address
      this.selectedOptions = this.$options.data().selectedOptions
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
          let fun = null
          if (this.address.id) {
            // 更新
            fun = updateAddress
          } else {
            // 新增
            fun = addAddress
          }
          const res = await fun(this.address)
          console.log('Address', res)
          const { success, message } = res
          if (success) {
            // 关闭对话框
            this.dialogTableVisible = false

            // 重置表单
            // console.log(this.$options.data)
            this.address = this.$options.data().address
            this.selectedOptions = this.$options.data().selectedOptions
            this.getAddressList()
          } else {
            this.$message.error(message)
          }
        } else {
          this.$message.warning('注意表单校验')
          return false
        }
      })
    },
    // 编辑
    async editAddress(id) {
      this.dialogTableVisible = true
      const res = await companyAddress(id)
      const { success, data, message } = res
      if (success) {
        this.address = data.address
        this.selectedOptions = data.address.cityCode.split(',')
        console.log(data.address.cityCode.split(','))
      } else {
        this.$message.error(message)
      }
    },
    // 删除
    doDelAddress(id) {
      this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await delAddress(id)
        const { success, message } = res
        if (success) {
          this.$message.success(message)
          this.getAddressList()
        } else {
          this.$message.error(message)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }

}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <el-collapse>
      <el-collapse-item title="商品管理介绍" name="1">
        <div>
          商品管理模块可以对客户端的商品进行增删改查等相关操作,来控制客户端商品的列表展示和商品详情
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-card shadow="never" class="margin-30">
      <el-collapse>
        <el-collapse-item title="条件查询" name="1">
          <el-form ref="form" :model="brandList" label-width="80px" size="normal">
            <el-row :gutter="20">
              <el-col :span="6" :offset="0">
                <el-form-item label="商品名称" />
              </el-col>
              <el-col :span="6" :offset="0">
                <el-form-item label="商品货号">
                  <el-select v-model="ruleForm.region" placeholder="请选择品牌名称">
                    <el-option
                      v-for="(item,index) in brandName"
                      :key="index"
                      label="item"
                    />

                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="0">
                <el-form-item label="品牌" />
              </el-col>
              <el-col :span="6" :offset="0">
                <el-form-item label="上架状态" />
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="6" :offset="0">
                <el-form-item label="审核状态">
                  <el-input v-model="form.name" />
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="0">
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">重置</el-button>
                  <el-button>搜索</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import { findAllBrand } from '@/api/product/brand'
export default {
  name: 'VueAdminTemplateMasterIndex',

  data() {
    return {
      brandList: [],
      brandName: []
    }
  },

  created() {
    this.findAllBrandList()
  },

  methods: {
    async  findAllBrandList() {
      const res = await findAllBrand()
      const { success, data, message } = res
      if (success) {
        this.brandList = data.items
        this.brandName = this.brandList.filter(item => item.name)
        console.log('brandName', this.brandName)
      } else {
        this.$message.error(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>
          <el-button type="primary" size="mini">新增</el-button>
        </span>
      </div>
      <el-table :data="brandList" border stripe>
        <el-table-column
          type="index"
          label="序号"
          width="50"
        />
        <el-table-column
          prop="name"
          label="品牌名称"
          width="180"
        />
        <el-table-column

          label="展示状态"
          width="180"
        >
          <template slot-scope="scope">
            <!-- showStatus (integer, optional): 是否展示: 0-> 否 , 1-> 是 , -->
            <el-switch v-model="scope.row.showStatus" :active-value="1" :inactive-value="0">是否展示
            </el-switch>

          </template>
        </el-table-column>
        <el-table-column

          label="logo"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <img width="100" height="100" :src="scope.row.logo" alt="">
          </template>
        </el-table-column>
        <el-table-column

          label="专区大图"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <img width="100" height="100" :src="scope.row.bigPic" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="brandStory"
          label="品牌故事"
          width="120"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="120"
          align="center"
        />
      </el-table>

    </el-card>

  </div>
</template>

<script>
import { findBrandByPage } from '@/api/product/product'
import mixin from '@/mixins/index'
export default {
  name: 'VueAdminTemplateMasterIndex',
  mixins: [mixin],
  data() {
    return {
      brandList: ''
    }
  },

  created() {
    this.findAllBrandList()
  },

  methods: {
    async findAllBrandList() {
      const res = await findBrandByPage(this.pagination.start, this.pagination.limit)
      const { success, data, message } = res
      if (success) {
        this.brandList = data.rows
      } else {
        this.$message.error(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

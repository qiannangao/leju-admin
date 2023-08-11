<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>分类管理</span>
      </div>
      <el-card shadow="never">
        <div slot="header">
          <span>乐居分类</span>
        </div>
        <el-row :gutter="20">
          <el-col v-for="item in lejuCateList" :key="item.id" :span="6" :offset="0">
            <el-card shadow="never">
              <div slot="header">
                <span>{{ item.name }}</span>
              </div>
              <div>
                <img width="100%" height="250px" :src="item.icon" alt="">
              </div>
            </el-card>

          </el-col>

        </el-row>

      </el-card>

    </el-card>
    <el-card v-if="categoryList" shadow="never" class="margin-30">
      <div slot="header">
        <span>全部分类</span>
      </div>
      <el-table
        :data="categoryList"
        style="width: 100%"
        row-key="id"
      >

        <el-table-column
          label="菜单名称"
          prop="name"
        />
        <el-table-column
          label="图片"
        >
          <template slot-scope="scope">
            <img width="80" height="80" :src="scope.row.icon" alt="">
          </template>
        </el-table-column>
        <el-table-column
          label="分类名字"
          prop="name"
        />
        <el-table-column
          label="排序"
          prop="sort"
        />
        <el-table-column
          label="显示状态"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.showStatus===1?'显示':'不显示' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="导航栏展示"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.navStatus===1?'显示':'不显示' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          prop="description"
        >
          <!-- <template slot-scope="scope">
            <div>{{ scope.row.description?description:'描述为空' }}</div>
          </template> -->
        </el-table-column>
        <el-table-column
          label="创建时间"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.createTime }}</div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
import { getAllCategory } from '@/api/product/product'
export default {
  name: 'VueAdminTemplateMasterIndex',

  data() {
    return {
      categoryList: [],
      lejuCateList: ''
    }
  },

  created() {
    this.getAllCategoryList()
  },

  methods: {
    async getAllCategoryList() {
      const res = await getAllCategory()
      const { success, message, data } = res
      if (success) {
        // 遍历data.items每一项，将category拆开
        data.items.forEach(item => {
          this.categoryList.push({
            children: item.children,
            ...item.category
          })
        })
        console.log('展开后的categoryList', this.categoryList)
        const lejuList = data.items.find(
          (item) => item.category.name === '乐居'
        )
        this.lejuCateList = lejuList.children
      } else {
        this.$message.error(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

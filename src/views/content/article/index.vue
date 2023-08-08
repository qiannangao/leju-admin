<template>
  <div class="main">
    <el-card class="margin-30" shadow="never">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
      </div>
      <!-- 卡片内容 -->
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="作者">
              <el-input v-model="form.author" placeholder="作者" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="标题">
              <el-input v-model="form.title" placeholder="标题" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="编辑类型">
              <!-- editorType (integer, optional): 编辑器类型: 0 富文本; 1 markdown , -->
              <el-select
                v-model="form.editorType"
                style="width: 100%"
                placeholder="编辑器类型"
                clearable
              >
                <el-option label="富文本" :value="0" />
                <el-option label="markdown" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="18">
            <el-button size="mini" @click="doReset">重置</el-button>
            <el-button type="primary" size="mini" @click="doSearch">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never" class="margin-30" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>
          <el-button type="primary" size="mini" @click="doAddArticle">新增</el-button>
        </span>
      </div>
      <!-- card body -->
      <el-table
        v-loading="loading"
        :data="articleList"
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="title" label="文章标题" width="120" />
        <el-table-column label="展示图片" width="150">
          <template slot-scope="scope">
            <img width="100" height="100" :src="scope.row.coverImg" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" width="180" />

        <el-table-column prop="author" label="文章作者" width="130" />

        <el-table-column label="文章是否展示">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isShow"

              :active-value="1"
              :inactive-value="0"
              @change="isArticleShow(scope.row.isShow,scope.row.id)"
            />
          </template>
        </el-table-column>

        <el-table-column label="编辑器类型">
          <template slot-scope="scope">
            <!-- 0 富文本 1 markdown -->
            <el-button v-if="scope.row.editorType==0" style="color:#409EFF" plain size="mini">富文本</el-button>
            <el-button v-else style="color:#409EFF" plain size="mini">markdown</el-button>

          </template>
        </el-table-column>
        <el-table-column prop="editorType" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" style="color:#409EFF" icon="el-icon-edit-outline" @click="editArticle(scope.row.id)">编辑文章</el-button>
            <el-button type="text" size="mini" style="color:#f00" @click="doDelArticle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- 分页其中pagesize后面的数字必须是第一条的整数倍 -->
      <el-pagination
        style="margin:20px"
        :current-page="pagination.start"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagination.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>
<script>
import { findArticle, changeShowStatus, delArticle } from '@/api/content/article'
import { filterNullstr } from '@/utils'
import mixin from '@/mixins/index'
export default {
  mixins: [mixin],
  data() {
    return {
      loading: false,
      form: {
        // editorType: 1
      },
      articleList: []

    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },

    // 搜索
    doSearch() {
      // 每次搜索从第一页开始
      this.pagination.start = 1
      this.getArticle()
    },
    // 重置
    doReset() {
      // 点击重置，数据清空，保存初始值，重新渲染，显示第一页
      // 选项配置都会被存储在实例的 $options ,重置组件一般都选vm.$options.data()
      this.form = this.$options.data().form
      // 重置后再次获取数据，数据仍从第一页显示
      this.pagination.start = 1
      this.getArticle()
    },
    async getArticle() {
      // 开启进度条
      this.loading = true
      // 存在空字符串不传值
      const newForm = filterNullstr(this.form)
      // 每次查询需要输入起始页，限制页，表单数据.表单数据作为data传入
      const res = await findArticle(this.pagination.start, this.pagination.limit, newForm)
      console.log(res)
      const { success, data, message } = res
      if (success) {
        const { rows, total } = data
        this.articleList = rows
        this.pagination.total = total
      } else {
        // 把res的错误信息message展示出来
        this.$message.error(message)
      }
      this.loading = false
    },
    handleSizeChange(val) {
      // 每次页码变化都需要重新从第一页开始
      console.log(`每页 ${val} 条`)
      this.pagination.start = 1
      this.pagination.limit = val
      this.getArticle()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagination.start = val
      this.getArticle()
    },
    // 文章是否显示
    async isArticleShow(flag, id) {
      const res = await changeShowStatus({
        isShow: flag,
        id: id
      })
      console.log(res)
      const { success, message } = res
      if (success) {
        this.$message.success('修改状态成功')
      } else {
        this.$message.error(message)
      }
    },
    // 添加文章
    doAddArticle() {
      this.$router.push({ name: 'Detail' })
    },
    // 编辑文章
    editArticle(id) {
      this.$router.push({ name: 'Detail', params: { id }})
    },
    // 删除
    doDelArticle(id) {
      this.$confirm('此操作将永久删除该文章，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await delArticle(id)
        const { success, message } = res
        if (success) {
          this.$message.success('删除成功')
          // 删除成功后渲染数据
          this.getArticle()
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
.main {
  ::v-deep .el-form-item__label {
    font-weight: normal;
  }
}
</style>

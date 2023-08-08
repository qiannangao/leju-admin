<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="http://leju.bufan.cloud/lejuAdmin/material/uploadFileOssSave"
          multiple
          :headers="token"
          :on-success="handelSuccess"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <!-- card body -->
      <el-row :gutter="20">
        <el-col
          v-for="item in materialList"
          :key="item.id"
          :offset="0"
          style="width: 20%"
        >
          <el-card shadow="never" :body-style="{ padding: '5px' }" style="margin-bottom:30px">
            <div slot="header">
              <span>创建时间：{{ item.createTime }}</span>
            </div>
            <el-image
              style="width: 220px; height: 250px"
              :src="item.ossUrl"
              :preview-src-list="srcList"
            />
            <el-button type="danger" size="mini" @click="dodelMaterial(item.id)">删除</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { findMaterial, delMaterial } from '@/api/content/material'
import mixin from '@/mixins/index'
export default {
  name: 'VueAdminTemplateMasterIndex',
  mixins: [mixin],
  data() {
    return {
      materialList: []
    }
  },
  computed: {
    srcList() {
      return this.materialList.map(item => item.ossUrl)
    }
  },

  created() {
    this.findMaterialList()
  },
  methods: {
    async findMaterialList() {
      const res = await findMaterial(
        this.pagination.start,
        this.pagination.limit
      )
      console.log(res)
      const { success, message, data } = res
      if (success) {
        this.materialList = data.rows
        this.pagination.total = data.total
      } else {
        this.$message.error(message)
      }
    },
    // 上传多张超出

    handleExceed(files, fileList) {
      // 超出不发请求,只打印
      console.log(files, fileList)
    },
    handelSuccess(res) {
      const { success, message } = res
      if (success) {
        this.$message.success('上传成功')
        this.findMaterialList()
        this.$refs.upload.clearFiles()
      } else {
        this.$message.success(message)
      }
    },
    // 删除
    async dodelMaterial(id) {
      const res = await delMaterial(id)
      console.log(res)
      const { success, message } = res
      if (success) {
        this.$message.success('删除成功')
        this.findMaterialList()
      } else {
        this.$message.error(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

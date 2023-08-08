<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>{{ articleId ? '编辑文章' : '新增文章' }}</span>
      </div>
      <el-form
        ref="articleForm"
        :model="article"
        :rules="rules"
        label-width="120px"
        size="mini"
      >
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item prop="author" label="作者">
              <el-input v-model="article.author" placeholder="作者" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item prop="title" label="标题">
              <el-input v-model="article.title" placeholder="标题" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item prop="isShow" label="是否显示">
              <el-switch
                v-model="article.isShow"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item prop="summary" label="摘要">
              <el-input
                v-model="article.summary"
                type="textarea"
                :rows="3"
                placeholder="摘要"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item prop="coverImg" label="封面图片">
              <el-upload
                ref="imgUpload"
                :action="uploadFileOss"
                :headers="token"
                :on-success="handelImg"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="article.coverImg"
                  width="100"
                  height="100"
                  :src="article.coverImg"
                  alt=""
                >
                <el-button
                  v-else
                  size="small"
                  type="primary"
                >点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="18" :offset="0">
            <!-- editorType (integer, optional): 编辑器类型: 0 富文本; 1 markdown , -->
            <el-form-item label="切换富文本类型">
              <el-radio
                v-model="article.editorType"
                :label="0"
                @change="editorTypeChange"
              >富文本</el-radio>
              <el-radio
                v-model="article.editorType"
                :label="1"
                @change="editorTypeChange"
              >markdown</el-radio>
              <span
                style="color: orange"
              ><i
                class="el-icon-warning-outline"
              />注意，切换编辑器会清空编辑内容</span>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- content1 (string, optional): 文章内容, 这里指富文本或者markdown 原文 ,
content2 (string, optional): 富文本或者markdown转换后的html内容 , -->
        <el-row :gutter="20">
          <el-col :span="18" :offset="0">
            <el-form-item prop="content1">
              <!-- 富文本编辑器 -->
              <Tinymce
                v-if="article.editorType == 0"
                v-model="article.content1"
                :height="300"
              />
              <!-- markdown编辑器 -->
              <mavon-editor
                v-if="article.editorType == 1"
                ref="mavonEditor"
                v-model="article.content1"
                @imgAdd="$imgAdd"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="doSubmit">{{
            articleId ? '保存编辑' : '新增文章'
          }}</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import {
  addArticle,
  getArticleDetail,
  updateArticle
} from '@/api/content/article'
import Tinymce from '@/components/Tinymce'
import mixin from '@/mixins/index'
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
  name: 'Detail',
  components: { Tinymce },
  mixins: [mixin],
  data() {
    return {
      article: {
        coverImg: '',
        editorType: 0

      },
      articleId: '',
      rules: {
        author: [
          // required必填,trigger失去焦点时触发
          { required: true, message: '请输入作者名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1-10个字符', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1-10个字符', trigger: 'blur' }
        ],
        isShow: [{ required: true, message: '必选', trigger: 'blur' }],
        coverImg: [{ required: true, message: '必填', trigger: 'blur' }],
        summary: [
          { required: true, message: '必填', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1-10个字符', trigger: 'blur' }
        ],
        content1: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      textarea: ''
    }
  },

  created() {
    this.articleId = this.$route.params.id
    if (this.articleId) {
      this.getArticle()
    }
  },
  mounted() {},

  methods: {
    // 获取文章
    async getArticle() {
      const res = await getArticleDetail(this.articleId)
      console.log('articledetail', res)
      const { success, message, data } = res
      if (success) {
        this.article = data.productArticle
      } else {
        this.$message.error(message)
      }
    },
    handelImg(response) {
      // 	function(response, file, fileList)
      console.log(response)
      const { success, message, data } = response
      if (success) {
        // this.$set(this.article, 'coverImg', data.fileUrl)
        this.article.coverImg = data.fileUrl
        // 去掉文件名
        this.$refs.imgUpload.clearFiles()
      } else {
        this.$message.error(message)
      }
    },
    beforeAvatarUpload(file) {
      const isIMG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1.5
      // const reg = /^image\/(jpg|png)$/
      // const isImg = reg.test(file.type)
      if (!isIMG) {
        this.$message.error('上传头像图片只能是 JPG /PNG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1.5MB!')
      }
      return isIMG && isLt2M
    },
    // 点击切换富文本
    editorTypeChange() {
      // 切换时清空编辑器
      this.article.content1 = ''
    },
    // 上传头像
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      axios({
        url: this.uploadFileOss,
        method: 'post',
        data: formdata,
        headers: { 'token': getToken() }
      }).then((res) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */
        const { success, data, message } = res.data
        if (success) {
          this.$refs.mavonEditor.$img2Url(pos, data.fileUrl)
        } else {
          this.$message.error(message)
        }
      })
    },
    doSubmit() {
      this.$refs.articleForm.validate(async(valid) => {
        if (valid) {
          // 获取到html文档
          // console.log(this.$refs.mavonEditor.d_render)
          // 检查缺少的参数;author,content1,coverImg,editorType,isShow,title
          if (this.article.editorType === 0) {
            this.article.content2 = this.article.content1
          } else if (this.article.editorType === 1) {
            this.article.content2 = this.$refs.mavonEditor.d_render
          }
          console.log(this.article)
          let fun = null
          if (this.articleId) {
            fun = updateArticle
          } else {
            fun = addArticle
          }
          const res = await fun(this.article)
          const { success, message } = res
          if (success) {
            this.$router.push({
              name: 'Article'
            })
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
</style>

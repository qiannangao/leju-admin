<template>
  <div class="main">
    <el-steps :active="step" finish-status="success">
      <el-step title="商品基本信息" />
      <el-step title="添加库存信息" />
      <el-step title="添加移动端详情" />
    </el-steps>
    <el-card shadow="never" class="margin-30">
      <el-form
        ref="productForm"
        :model="product"
        label-width="100px"
        size="mini"
      >
        <div v-show="step == 1">
          <!-- 基本信息 -->
          <!-- 1公共标题 -->
          <div class="title">
            <div class="title-text">基本信息</div>
            <el-divider />
          </div>
          <!--2 表单 -->
          <el-row :gutter="20">
            <el-col :span="7" :offset="0">
              <el-form-item label="商品名称">
                <el-input v-model="product.name" />
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="0">
              <el-form-item label="商品编码">
                <el-input v-model="product.productSn" />
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="0">
              <el-form-item label="商品分类">
                <el-select
                  v-model="product.productCategoryId"
                  style="width:100%"
                  placeholder="请选择分类"
                >
                  <el-option
                    v-for="item in lejuCateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <el-form-item label="商品品牌">
                <el-select
                  v-model="product.brandId"
                  style="width:100%"
                  placeholder="请选择商品品牌"
                >
                  <el-option
                    v-for="item in brandList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" :offset="0">
              <el-form-item label="商品描述" size="normal">
                <el-input
                  v-model="product.description"
                  type="textarea"
                  placeholder="请输入商品描述"
                  size="normal"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 商品属性 -->
          <div class="title">
            <div class="title-text">商品属性</div>
            <el-divider />
          </div>
          <el-row :gutter="20">
            <el-col :span="7" :offset="0">
              <el-form-item label="商品原价(单位:元)" size="mini">
                <el-input-number
                  v-model="product.originalPrice"
                  style="width:100%"
                  size="mini"
                  label="商品原价"
                  :min="100"
                  :step="100"
                  :controls="true"
                  controls-position="both"
                />

              </el-form-item>

            </el-col>
            <!-- 、// 促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购 , -->
            <el-col :span="7" :offset="0">
              <el-form-item label="促销类型">
                <el-select v-model="product.promotionStartTime" disabled>
                  <el-option
                    v-for="item in promotionList"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  />
                </el-select>

              </el-form-item>

            </el-col>
            <el-col :span="7" :offset="0">
              <el-form-item label="活动价格">
                <el-input v-model="product.promotionPrice" disabled />

              </el-form-item>

            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="0" /><el-col :span="7" :offset="0">
              <el-form-item label="重量(kg)" size="mini">
                <el-input-number
                  v-model="product.weight"
                  style="width:100%"
                  size="mini"
                  label="重量"
                  :min="0"
                  :step="10"
                  :controls="true"
                  controls-position="both"
                />

              </el-form-item>

            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="7" :offset="0">
              <!-- 审核状态：0->未审核；1->审核通过 , -->
              <el-form-item label="审核状态" size="normal">
                <el-switch v-model="product.verifyStatus" :active-value="1" :inactive-value="0" />

              </el-form-item>

            </el-col>
            <el-col :span="7" :offset="0">
              <!-- ：0->下架；1->上架 ,, -->
              <el-form-item label="是否上架" size="normal">
                <el-switch v-model="product.publishStatus" :active-value="1" :inactive-value="0" />

              </el-form-item>

            </el-col>

          </el-row>

          <el-row :gutter="20">
            <el-col :span="7" :offset="0">
              <el-form-item label="缩略图" size="normal">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadFileOss"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :headers="token"
                >
                  <img v-if="product.pic" :src="product.pic" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>

            </el-col>

          </el-row>
          <!-- 三 -->
          <div class="title">
            <div class="title-text">其他信息</div>
            <el-divider />
          </div>
          <el-row :gutter="20">
            <el-col :span="7" :offset="0">
              <!-- 0->不推荐；1->推荐  -->
              <el-form-item label="推荐状态" size="normal">
                <el-switch v-model="product.recommendStatus" :active-value="1" :inactive-value="0" />

              </el-form-item>

            </el-col>
            <el-col :span="7" :offset="0">
              <!--:0->不是新品；1->新品   -->
              <el-form-item label="新品状态" size="normal">
                <el-switch v-model="product.newStatus" :active-value="1" :inactive-value="0" />

              </el-form-item>

            </el-col>
            <el-col :span="7" :offset="0">
              <!--:是否为预告商品：0->不是；1->是 -->
              <el-form-item label="新品状态" size="normal">
                <el-switch v-model="product.previewStatus" :active-value="1" :inactive-value="0" />

              </el-form-item>

            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7" :offset="0">
              <el-form-item label="搜索关键词" size="normal">
                <el-input v-model="product.keywords" placeholder="请输入关键词" size="normal" />

              </el-form-item>

            </el-col>
            <el-col :span="7" :offset="0">
              <el-form-item label="库存预警(單位：件)" size="normal">
                <el-input-number
                  v-model="product.lowStock"
                  size="normal"
                  label="库存预警"
                  :min="0"
                  :step="1"
                  :controls="true"
                  controls-position="both"
                />

              </el-form-item>

            </el-col>
            <el-col :span="7" :offset="0">
              <el-form-item label="商品排序" size="normal">
                <el-input-number
                  v-model="product.sort"
                  size="normal"
                  label="商品排序"
                  :min="0"
                  :step="1"
                  :controls="true"
                  controls-position="both"
                />

              </el-form-item>

            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="产品服务">
                <!-- 1->无忧退货；2->快速退款；3->免费包邮  -->
                <el-checkbox-group v-model="product.serviceIds">
                  <el-checkbox label="1">无忧退货</el-checkbox>
                  <el-checkbox label="2">快速退款</el-checkbox>
                  <el-checkbox label="3">免费包邮</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>

          </el-row>

        </div>

        <div v-show="step == 2">
          <div class="title">
            <div class="title-text">商品sku信息</div>
            <el-divider />
          </div>
          <el-row :gutter="20">
            <el-col :span="10" :offset="0">
              <el-form-item label="标题" size="normal">
                <el-input v-model="product.name" placeholder="标题" size="normal" />

              </el-form-item>

            </el-col>
            <el-col :span="10" :offset="0">
              <el-form-item label="副标题" size="normal">
                <el-input v-model="product.detailDesc" placeholder="副标题" size="normal" />

              </el-form-item>

            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="画册图片" size="normal">
                <el-upload
                  ref="uploadAlbum"
                  :action="uploadFileOss"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="handleSucc"
                  :headers="token"
                >
                  <i class="el-icon-plus" />
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-form-item>

            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" :offset="0">
              <el-form-item label="sku设置" size="normal" />

            </el-col>

          </el-row>

        </div>
        <div v-show="step == 3">3</div>

        <el-form-item>
          <el-button
            v-if="step != 1"
            type="primary"
            @click="prev"
          >上一步</el-button>
          <el-button v-if="step != 3" type="primary" @click="next">{{
            step === 1 ? '下一步,填写库存信息' : '下一步,填写移动端详情'
          }}</el-button>
          <el-button
            v-if="step == 3"
            type="primary"
            @click="doSubmit"
          >提交保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import mixin from '@/mixins/index'
import { getAllCategory, findAllBrand } from '@/api/product/product'
export default {
  name: 'VueAdminTemplateMasterProductDetail',
  mixins: [mixin],
  data() {
    return {
      product: {
        pic: '',
        serviceIds: [],
        albumPics: []
      },
      step: 1,
      lejuCateList: {},
      brandList: {},
      imageUrl: '',

      dialogImageUrl: '',
      dialogVisible: false,
      promotionList: [
        {
          text: '没有促销使用原价',
          value: 0
        },
        {
          text: '使用促销价',
          value: 1
        },
        {
          text: '使用会员价',
          value: 2
        },
        {
          text: '使用阶梯价格',
          value: 3
        },
        {
          text: '使用满减价格',
          value: 4
        },
        {
          text: '限时购',
          value: 5
        }
      ]
    }
  },

  created() {
    this.getAllCategoryList()
    this.getfindAllBrand()
  },

  methods: {
    prev() {
      this.step--
    },
    next() {
      this.step++
    },
    // 获取分类
    async getAllCategoryList() {
      const res = await getAllCategory()
      const { success, message, data } = res
      if (success) {
        const lejuList = data.items.find(
          (item) => item.category.name === '乐居'
        )
        this.lejuCateList = lejuList.children
      } else {
        this.$message.error(message)
      }
    },
    // 获取品牌列表
    async getfindAllBrand() {
      const res = await findAllBrand()
      const { success, data, message } = res
      if (success) {
        this.brandList = data.items
      } else {
        this.$message.error(message)
      }
    },
    // 缩略图上传之前
    beforeAvatarUpload(file) {
      // 上传文件之前的钩子，参数为上传的文件，
      console.log('file', file)
    },
    // 缩略图上传成功
    handleAvatarSuccess(res) {
      console.log('res', res)
      const { success, message, data } = res
      if (success) {
        this.product.albumPics.push(data.fileUrl)
      } else {
        this.$message.error(message)
      }
    },
    // 预览图册
    handlePictureCardPreview(file) {
      // 点击文件列表中已上传的文件时的钩子
      console.log('file', file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 移除图册
    handleRemove(file) {
      console.log(file)
      // 把未删除的过滤出来
      this.product.albumPics = this.product.albumPics.filter(item => item !== file.response.data.fileUrl)
      this.$refs.uploadAlbum.uploadFiles = this.$refs.uploadAlbum.uploadFiles.filter(item => item.uid !== file.uid)
    },
    // 照片墙上传成功
    handleSucc(res) {
      console.log('res', res)
      const { success, message, data } = res
      if (success) {
        this.product.albumPics.push(data.fileUrl)
      } else {
        this.$message.error(message)
      }
    },

    // 提交
    doSubmit() {
      // 根据分类id获取分类名称后再一起提交
      // product是要提交的对象；在lejuList中找到该条数据，提取出name
      this.product.productCategoryName = this.lejuCateList.find(
        (item) => item.id === this.product.productCategoryId
      ).name
      // 根据品牌id获取品牌名称
      this.product.brandName = this.brandList.find(
        (item) => item.id === this.product.brandId
      ).name
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .el-steps {
    padding: 50px 200px;
    background-color: #fff;
  }
  .title {
    .text {
      font-weight: normal;
      font-size: 16px;
      margin: 0;
    }
    .el-divider {
      margin: 10px 0 30px;
    }
  }
  ::v-deep .el-form-item__label{
  font-weight: normal;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid grey;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;

  }
}
</style>

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
        :rules="rules"
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
              <el-form-item prop="name" label="商品名称">
                <el-input v-model="product.name" />
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="0">
              <el-form-item prop="productSn" label="商品编码">
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
              <el-form-item prop="detailTitle" label="标题" size="normal">
                <el-input v-model="product.detailTitle" placeholder="标题" size="normal" />

              </el-form-item>

            </el-col>
            <el-col :span="10" :offset="0">
              <el-form-item prop="detailDesc" label="副标题" size="normal">
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
                  :file-list="product.albumPics"
                >
                  <i class="el-icon-plus" />
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>

              </el-form-item>

            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="sku设置" size="normal">
                <div v-if="tempSkuColor.list.length">
                  <span style="margin-right:10px">颜色:</span>
                  <el-checkbox-group v-model="tempSkuColor.checkedList" style="display:inline-block">
                    <el-checkbox v-for="(item,index) in tempSkuColor.list" :key="index" :label="item">{{ item }}
                      <span style="margin-left:5px;color:red;font-size:14px" @click.stop="delSkuOption('color',item)">删除</span>
                    </el-checkbox>

                  </el-checkbox-group>
                </div>
                <div v-if="tempSkuSize.list.length">
                  <span style="margin-right:10px">大小:</span>
                  <el-checkbox-group v-model="tempSkuSize.checkedList" style="display:inline-block">
                    <el-checkbox v-for="(item,index) in tempSkuSize.list" :key="index" :label="item">{{ item }}
                      <span style="margin-left:5px;color:red;font-size:14px" @click.stop="delSkuOption('size',item)">删除</span>
                    </el-checkbox>

                  </el-checkbox-group>
                </div>
                <el-input v-model="tempSkuColor.text" style="width:200px;margin-right:10px" placeholder="顔色描述：例如天空蓝" size="mini" />
                <el-button type="primary" size="mini" plain @click="createSkuOption('color')">创建颜色选项</el-button>
                <el-input v-model="tempSkuSize.text" style="width:200px;margin-right:10px;margin-left:20px" placeholder="大小：例如32G" size="mini" />
                <el-button type="primary" size="mini" plain @click="createSkuOption('size')">创建大小选项</el-button>
                <el-button
                  style="margin-left:100px"
                  type="primary"
                  size="mini"
                  @click="buildSkuList"
                >生成sku列表</el-button>
                <el-button type="primary" size="mini">新增sku</el-button>

              </el-form-item>

            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item size="normal">
                <el-table :data="pmsSkuStockList" border stripe>
                  <el-table-column
                    type="index"
                    label="#"
                    width="50"
                    align="center"
                    fixed="left"
                  />
                  <el-table-column
                    label="图片"
                    width="100"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-upload
                        class="avatar-uploader"
                        :action="uploadFileOss"
                        :show-file-list="false"
                        :headers="token"
                        :on-success="handleskuImgSuccess"
                        :before-upload="beforeskuImgUpload"
                        @click.native="uploadSkuImg(scope.row.tempId)"
                      >
                        <img v-if="scope.row.pic" width="80" height="80" :src="scope.row.pic">
                        <i
                          v-else
                          class="el-icon-plus
                        el-icon-sku
                        avatar-uploader-icon-sku"
                        />
                      </el-upload>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="颜色"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.color" size="normal" />

                    </template>
                  </el-table-column>
                  <el-table-column
                    label="大小"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.size" size="normal" />

                    </template>
                  </el-table-column>
                  <el-table-column
                    label="库存"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.stock" size="normal" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="库存警戒线"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.lowStock" size="normal" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="锁定库存"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.lockStock" size="normal" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="sku编码"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.skuCode" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="价格（单位：分）"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.price" size="normal" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="销量"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sale" size="normal" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    align="center"
                    fixed="right"
                  >
                    <el-button type="text" size="mini" style="color:red">删除</el-button>

                  </el-table-column>
                </el-table>
              </el-form-item>

            </el-col>

          </el-row>

        </div>
        <div v-show="step == 3">
          <el-form-item label="商品描述" size="normal">
            <Tinymce
              v-model="product.description"
              :height="300"
            />
          </el-form-item>

        </div>

        <el-form-item style="text-align:center;margin-right:100px">
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
import { getAllCategory, findAllBrand, addProductAndSkus, productSkusDetail, updateProductAndSkus } from '@/api/product/product'
import { v4 as uuidv4 } from 'uuid'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'VueAdminTemplateMasterProductDetail',
  components: { Tinymce },
  mixins: [mixin],
  data() {
    return {
      productId: '', // 用于编辑
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
      ],
      tempSkuColor: {
        text: '',
        list: ['月光白', '芭比粉', '芋泥紫'],
        checkedList: []
      },
      tempSkuSize: {
        text: '',
        list: ['32G', '64G', '128G', '256G'],
        checkedList: []
      },
      pmsSkuStockList: [],
      tempId: '',
      firstPageField: ['name', 'productSn'],
      secondPageField: ['detailTitle', 'detailDesc'],
      thirdPageField: [],
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        productSn: [{ required: true, message: '请输入商品编码', trigger: 'blur' }],
        detailTitle: [{ required: true, message: '请输入商品标题', trigger: 'blur' }],
        detailDesc: [{ required: true, message: '请输入商品副标题', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.productId = this.$route.params.id
    if (this.productId) {
      // 根据id获取商品详情
      this.doproductSkusDetail(this.productId)
    }
    this.getAllCategoryList()
    this.getfindAllBrand()
  },

  methods: {
    prev() {
      this.step--
    },
    next() {
      let fileds = []
      if (this.step === 1) {
        fileds = this.firstPageField
      } else if (this.step === 2) {
        fileds = this.secondPageField
      }
      let allfileds = true
      this.$refs.productForm.validateField(fileds, (errmsg) => {
        if (errmsg) {
          this.$message.warning(errmsg)
          // 有一个错，则为错
          allfileds = false && allfileds
        } else {
          console.log('验证通过')
          allfileds = true && allfileds
        }
      })
      if (allfileds) {
        this.step++
      }
    },
    // 获取商品详情
    async doproductSkusDetail(id) {
      const res = await productSkusDetail(id)
      const { success, data, message } = res
      if (success) {
        // this.$message.success(message)
        data.product.serviceIds = data.product.serviceIds.split(',')
        data.product.albumPics = data.product.albumPics.split(',')
        const tempAlbumPics = []
        data.product.albumPics.forEach(item => {
          tempAlbumPics.push({
            name: item.substring(item.lastIndexOf('/') + 1),
            url: item
          })
        })
        data.product.albumPics = tempAlbumPics
        this.product = data.product
        this.pmsSkuStockList = data.skus
      } else {
        this.$message.error(message)
      }
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
        // this.product.albumPics.push(data.fileUrl)
        this.product.pic = data.fileUrl
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
      console.log('file', file.url)
      console.log('过滤前', this.product.albumPics)
      // this.product.albumPics = this.product.albumPics.filter(item => item !== file.response.data.fileUrl)
      this.product.albumPics = this.product.albumPics.filter(item => item.url !== file.url)
      console.log('过滤后', this.product.albumPics)
      this.$refs.uploadAlbum.uploadFiles = this.$refs.uploadAlbum.uploadFiles.filter(item => item.uid !== file.uid)
    },
    // 图册上传成功
    handleSucc(res) {
      console.log('res', res)
      const { success, message, data } = res
      if (success) {
        this.product.albumPics.push({ url: data.fileUrl })
      } else {
        this.$message.error(message)
      }
    },
    // 创建sku
    createSkuOption(type) {
      if (type === 'color') {
        if (this.tempSkuColor.text) {
          // 判断是否有重复值
          const item = this.tempSkuColor.list.find(item => item === this.tempSkuColor.text)
          if (!item) {
            this.tempSkuColor.list.push(this.tempSkuColor.text)
            // 添加后清空输入框
            this.tempSkuColor.text = ''
          } else {
            this.$message.warning('颜色' + this.tempSkuColor.text + '已存在')
          }
        }
      } else if (type === 'size') {
        if (this.tempSkuSize.text) {
          // 判断是否有重复值
          const item = this.tempSkuSize.list.find(item => item === this.tempSkuSize.text)
          if (!item) {
            this.tempSkuSize.list.push(this.tempSkuSize.text)
            // 添加后清空输入框
            this.tempSkuSize.text = ''
          } else {
            this.$message.warning('颜色' + this.tempSkuSize.text + '已存在')
          }
        }
      }
    },
    // 删除sku
    delSkuOption(type, option) {
      if (type === 'color') {
      // 因为删除一次删除一个的，所以可以直接查询index删除一个
        this.tempSkuColor.list = this.tempSkuColor.list.filter(item => item !== option)
        const index = this.tempSkuColor.checkedList.findIndex(item => item === option)
        if (index !== -1) {
          this.tempSkuColor.checkedList.splice(index, 1)
        } else {
          this.$message.warning('您需选中才能进行删除')
        }
      } else if (type === 'size') {
        this.tempSkuSize.list = this.tempSkuSize.list.filter(item => item !== option)
        const index = this.tempSkuSize.checkedList.findIndex(item => item === option)
        if (index !== -1) {
          this.tempSkuSize.checkedList.splice(index, 1)
        } else {
          this.$message.warning('您需选中才能进行删除')
        }
      }
    },
    // 生成sku列表
    buildSkuList() {
      this.$confirm('此操作将清空sku列表，并生成新的列表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dobuildSkuList()
        this.$message({
          type: 'success',
          message: '生成成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    dobuildSkuList() {
      if (this.tempSkuColor.list.length && this.tempSkuSize.list.length) {
        for (let i = 0; i < this.tempSkuColor.checkedList.length; i++) {
          for (let j = 0; j < this.tempSkuSize.checkedList.length; j++) {
            this.pmsSkuStockList.push(
              {
                // 'id': 'string', // 如果是新增 不需要
                tempId: uuidv4(),
                'lockStock': 100, // 锁定库存
                'lowStock': 0, // 库存警戒线
                'pic': '', // 图片
                'price': 100, // 当前价格
                // 'productId': 'string', // 商品的id,如果是新增,不需要
                'promotionPrice': 0, // 单品促销价格
                'sale': 0, // 销量
                'skuCode': '', // sku的编码,手动填写
                // spData:  [{"key":"颜色","value":"蓝色"},{"key":"容量","value":"32G"}]
                // 'spData': 'string', // sku属性，json格式String类型 ,
                'stock': 100, // 库存,
                size: this.tempSkuSize.checkedList[j],
                color: this.tempSkuColor.checkedList[i]
              }
            )
          }
        }
      } else {
        this.$message.warning('至少选中一项颜色或大小')
      }
    },
    // skuimg上传之前
    beforeskuImgUpload() {
      return true
    },
    // 拿到点击的那条数据的id
    uploadSkuImg(id) {
      this.tempId = id
    },
    // skuimg上传成功
    handleskuImgSuccess(res) {
      console.log('handleskuImgSuccess', res)
      // 找到点击的那条数据
      const item = this.pmsSkuStockList.find(item => item.tempId === this.tempId)
      if (item) {
        const { success, message, data } = res
        if (success) {
        // this.$set(this.article, 'coverImg', data.fileUrl)
          item.pic = data.fileUrl
          this.tempId = ''
        } else {
          this.$message.error(message)
        }
      }
    },
    // 规整参数
    formatParams() {
      // 1规整skuList
      const tempSkuList = []
      this.pmsSkuStockList.forEach(item => {
        // 把skulist的每个item数组push到临时的skulist中，最后再赋值回去
        tempSkuList.push({
          ...item,
          // spData:  [{"key":"颜色","value":"蓝色"},{"key":"容量","value":"32G"}]
          spData: JSON.stringify([
            {
              key: '颜色',
              value: item.color
            },
            {
              key: '容量',
              value: item.size
            }

          ])// sku属性，json格式String类型 ,

        })
        console.log('解构赋值后的tempSkuList', tempSkuList)
      })
      console.log('tempSkuList', tempSkuList)
      this.pmsSkuStockList = tempSkuList
      // 2 规整 product
      this.product.albumPics = this.product.albumPics.join(',')
      this.product.serviceIds = this.product.serviceIds.join(',')
      // 格式化商品
      // 根据分类id获取分类名称后再一起提交
      // product是要提交的对象；在lejuList中找到该条数据，提取出name
      const item = this.lejuCateList.find(
        (item) => item.id === this.product.productCategoryId
      )
      if (item) {
        this.product.productCategoryName = item.name
      }
      // 根据品牌id获取品牌名称
      const brandItem = this.brandList.find(
        (item) => item.id === this.product.brandId
      )
      if (brandItem) {
        this.product.brandName = brandItem.name
      }
    },
    // 提交
    async doSubmit() {
      this.formatParams()
      // 规整完数据后再赋值
      const productParams = {
        pmsSkuStockList: this.pmsSkuStockList,
        product: this.product
      }
      console.log('规整后的数据productParams', productParams)
      let fun = null

      if (this.productId) {
        fun = updateProductAndSkus
      } else {
        fun = addProductAndSkus
      }
      const res = await fun(productParams)
      const { success, message } = res
      if (success) {
        this.$router.push({ name: 'List' })
      } else {
        this.$message.error(message)
      }
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
  .avatar-uploader-icon-sku {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 178px;
    text-align: center;
    border: 1px solid grey;
  }
.el-icon-sku:before {
    content: "";
    position: absolute;
    bottom: 70px;
    right: 12px;
    width: 80px;
    height: 80px;
}
  .avatar {
    width: 178px;
    height: 178px;
    display: block;

  }
}
</style>

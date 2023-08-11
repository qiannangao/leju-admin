<template>
  <div class="main">
    <el-collapse>
      <el-collapse-item title="商品管理介绍" name="1">
        <div>
          商品管理模块可以对客户端的商品进行增删改查等相关操作,来控制客户端商品的列表展示和商品详情
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 2 搜索下拉框 -->
    <el-card shadow="never" class="margin-30">
      <el-collapse>
        <el-collapse-item title="条件查询" name="1">
          <el-form
            ref="form"
            :model="formProduct"
            label-width="80px"
            size="normal"
          >
            <el-row :gutter="20">
              <el-col :span="6" :offset="0">
                <el-form-item label="商品名称">
                  <el-input v-model="formProduct.name" />
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="0">
                <el-form-item label="商品货号">
                  <el-input v-model="formProduct.productSn" />
                </el-form-item>
              </el-col>
              <!-- 第三列-品牌 -->
              <el-col :span="6" :offset="0">
                <el-form-item label="品牌">
                  <el-select
                    v-model="formProduct.brandId"
                    placeholder="请选择品牌名称"
                  >
                    <!-- value值绑定的是品牌id,也就是formProduct.brandId -->
                    <el-option
                      v-for="item in brandList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- 第四列 -->
              <el-col :span="6" :offset="0">
                <el-form-item label="上架状态">
                  <el-select
                    v-model="formProduct.publishStatus"
                    placeholder="请选择上架状态"
                  >
                    <!--  上架状态，0->下架；1->上架 , -->
                    <el-option label="下架" :value="0" />
                    <el-option label="上架" :value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="6" :offset="0">
                <el-form-item label="审核状态">
                  <el-select
                    v-model="formProduct.verifyStatus"
                    placeholder="请选择审核状态"
                  >
                    <!--  审核状态：0->未审核；1->审核通过-->
                    <el-option label="审核通过" :value="1" />
                    <el-option label="未审核" :value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="12">
                <el-form-item>
                  <el-button size="mini">重置</el-button>
                  <el-button type="primary" size="mini">搜索</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <!--3 商品列表 -->
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>
          <el-button
            type="primary"
            size="mini"
            @click="goAddProduct"
          >新增</el-button>
          <el-button type="primary" size="mini">导出为excel文件</el-button>
        </span>
      </div>
      <el-table :data="productList" style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center"
        />
        <el-table-column label="商品图片" width="180" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" width="100" height="100">
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="180" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.name }}</div>
            <div>{{ scope.row.brandName }}</div>
            <div>{{ scope.row.description }}</div>
          </template>
        </el-table-column>
        <el-table-column label="商品价格" width="100" align="center">
          <template slot-scope="scope">
            <div>原价：{{ scope.row.originalPrice }}</div>
            <div>现价：{{ scope.row.price }}</div>

          </template>
        </el-table-column>
        <el-table-column prop="productCategoryName" label="商品类别" width="100" align="center" />
        <!-- 标签 -->
        <el-table-column label="标签" width="180" align="center">
          <template slot-scope="scope">
            <!-- newStatus (integer, optional): 新品状态:0->不是新品；1->新品 , -->
            <!-- recommendStatus (integer, optional): 推荐状态；0->不推荐；1->推荐 , -->
            <div>
              是否新品：<el-switch v-model="scope.row.newStatus" :active-value="1" :inactive-value="0" />
            </div>
            <div>
              是否推荐：<el-switch v-model="scope.row.recommendStatus" :active-value="1" :inactive-value="0" />
            </div>
          </template>
        </el-table-column>
        <!-- 标签2 -->
        <el-table-column label="标签" width="180" align="center">
          <template slot-scope="scope">
            <!-- publishStatus (integer, optional): 上架状态：0->下架；1->上架 , -->
            <!-- verifyStatus (integer, optional): 审核状态：0->未审核；1->审核通过 , -->
            <div>
              是否上架：<el-switch v-model="scope.row.publishStatus" :active-value="1" :inactive-value="0" />
            </div>
            <div>
              是否审核：<el-switch v-model="scope.row.verifyStatus" :active-value="1" :inactive-value="0" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="sku" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editSku(scope.row.id)">编辑sku</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="120" align="center" />
        <el-table-column prop="sort" label="排序" width="120" align="center" />
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editProduct(scope.row.id)">编辑</el-button>
            <el-button
              type="text"
              size="mini"
              style="color:red"
              @click="delProduct(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-dialog title="sku列表" :visible.sync="dialogTableVisible">
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
      </el-dialog>
    </el-card>
    <!-- 4分页器 -->
    <el-pagination
      class="margin-30"
      :current-page.sync="pagination.start"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="pagination.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      background
      @size-change="sizeChange"
      @current-change="currentChange"
    />

  </div>
</template>

<script>
import { findAllBrand, productsByPage, getSkusByProductId } from '@/api/product/product'
import mixin from '@/mixins/index'
export default {
  name: 'VueAdminTemplateMasterIndex',
  mixins: [mixin],
  data() {
    return {
      formProduct: {},
      brandList: [],
      productList: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      pmsSkuStockList: []
    }
  },

  created() {
    this.findAllBrandList()
    this.getproductsByPage()
  },

  methods: {
    async findAllBrandList() {
      const res = await findAllBrand()
      const { success, data, message } = res
      if (success) {
        this.brandList = data.items
        this.brandName = this.brandList.filter((item) => item.name)
        console.log('brandName', this.brandName)
      } else {
        this.$message.error(message)
      }
    },
    async getproductsByPage() {
      const res = await productsByPage(
        this.pagination.start,
        this.pagination.limit,
        this.formProduct
      )
      console.log('getproductsByPage', res)
      const { success, data, message } = res
      if (success) {
        this.productList = data.rows
      } else {
        this.$message.error(message)
      }
    },
    // 每页展示多少页变化
    sizeChange(val) {
      this.pagination.start = 1
      this.pagination.limit = val
      this.getproductsByPage()
    },
    // 当前页变化
    currentChange(val) {
      this.pagination.start = val
      this.getproductsByPage()
    },
    // 去新增
    goAddProduct() {
      this.$router.push({ name: 'AddDetail' })
    },
    // 编辑商品
    editProduct(id) {
      this.$router.push({ name: 'EditDetail', params: { id }})
    },
    // 编辑sku
    async editSku(id) {
      console.log(id)
      const res = await getSkusByProductId(id)
      const { success, data, message } = res
      if (success) {
        this.pmsSkuStockList = data.items
        this.dialogTableVisible = true
      } else {
        this.$message.error(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .el-collapse {
    text-indent: 10px;
    background-color: #fff;
    padding-bottom: 10px;
  }
  ::v-deep .el-form-item__label {
    font-weight: normal;
  }
}
</style>

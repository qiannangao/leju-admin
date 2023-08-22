<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-button size="mini" @click="dosaveInitMenus">初始化菜单</el-button>

              <el-button
                type="primary"
                size="mini"
                @click="doAddMenu"
              >新增菜单</el-button>
            </el-col>
          </el-row>
        </span>
      </div>
      <!-- card body -->
      <el-dialog title="新增菜单" :visible.sync="dialogFormVisible">
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <div>菜单类型</div>
            <el-radio v-model="radio" label="1">顶级目录</el-radio>
            <el-radio v-model="radio" label="2">菜单</el-radio>
            <el-radio v-model="radio" label="3">按钮</el-radio>
          </el-col>
        </el-row>

        <el-form :model="menuForm">
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="上级菜单" size="normal">
                <el-cascader
                  v-model="id"
                  :props="{ expandTrigger: 'hover',label:'title',checkStrictly:true,value:'pid',disabled:'disabled',emitPath:false}"
                  :options="list"
                />

              </el-form-item>

            </el-col>
            <el-col :span="12" :offset="0" />
          </el-row>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogFormVisible = false"
          >确 定</el-button>
        </div>
      </el-dialog>

      <el-table :data="menuList" border stripe row-key="id">
        <el-table-column prop="title" label="菜单名称" width="180" />
        <el-table-column label="图标" width="120">
          <template slot-scope="scope">
            <i :class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column prop="level" label="等级" width="180" />
        <el-table-column prop="sort" label="排序" width="180" />
        <el-table-column prop="permissionValue" label="权限标识" width="180" />
        <el-table-column prop="path" label="路由" width="180" />
        <el-table-column prop="component" label="组建路径" width="180" />
        <el-table-column label="是否可用" width="180">
          <template slot-scope="scope">
            <div>{{ scope.row.status == 1 ? '可用' : '不可用' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180"
          fixed="right"
        />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { findAllPermissions, saveInitMenus } from '@/api/auth/index'
var _ = require('lodash')
import asyncRoutes from '@/router/index'
export default {
  name: 'VueAdminTemplateMasterIndex',

  data() {
    return {
      pid: '',
      menuList: [],
      dialogFormVisible: false,
      menuForm: {}
    }
  },
  computed: {
    // 深克隆一份数据
    list() {
      var cloneList = _.cloneDeep(this.menuList)
      console.log(cloneList)
      // 克隆数据后操作，去除空数据，新增disabled属性
      this.buildColneList(cloneList)
      return cloneList
    }
  },

  created() {
    this.dofindAllPermissions()
  },
  methods: {
    async dofindAllPermissions() {
      const res = await findAllPermissions()
      const { success, message, data } = res
      if (success) {
        this.menuList = data.menus
      } else {
        this.$message.error(message)
      }
    },
    async doAddMenu() {
      this.dialogFormVisible = true
    },
    // 给数据加disabled属性，清除空children数组
    buildColneList(cloneList) {
      for (let i = 0; i < cloneList.length; i++) {
        const item = cloneList[i]
        if (item.type === 2) {
          // 是按钮
          item.disabled = 'disabled'
        }
        if (item.children && item.children.length > 0) {
          // 递归
          this.buildColneList(item.children)
        } else {
          delete item.children
        }
      }
    },
    // 初始化菜单
    async dosaveInitMenus() {
      //     {
      //   "alwaysShow": false,
      //   "children": [
      //     {}
      //   ],
      //   "component": "string",
      //   "hidden": false,

      //   "id": "string",

      //   "meta": "string",

      //   "name": "string",
      //   "path": "string",

      //   "pid": "string",
      //   "redirect": "string",

      //   "status": 0,
      //   "title": "string",
      //   "type": 0
      // }
      const res = await saveInitMenus(
        asyncRoutes
      )
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

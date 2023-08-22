<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>
          <el-button type="primary" size="mini" @click="dialogFormVisible=true;dialogTitle='新增角色'">新增角色</el-button>
        </span>
      </div>
      <el-dialog width="400px" :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form :model="roleForm" :rules="rules">
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item prop="roleName" label="角色名称">
                <el-input v-model="roleForm.roleName" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="角色编码">
                <el-input v-model="roleForm.roleCode" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="角色描述">
                <el-input v-model="roleForm.remark" type="textarea" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item size="normal">
                <el-checkbox label="展开/关闭" @change="handleAllExpand" />
                <el-checkbox label="全选/取消全选" @change="handleAllCheck" />

                <el-tree
                  ref="refTree"
                  :data="menuList"
                  :props="defaultProps"
                  show-checkbox
                  node-key="id"
                />
              </el-form-item>

            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :offset="10">

              <el-button
                size="mini"
                @click="dialogFormVisible = false"
              >取消</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="doAddRoles"
              >确定</el-button>
            </el-col>

          </el-row>

        </el-form>

      </el-dialog>
      <el-table :data="rolesList" border stripe>
        <el-table-column
          type="index"
          label="#"
          width="50"
          fixed="left"
        />
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="220"
        />
        <el-table-column
          prop="roleCode"
          label="角色编码"
          width="220"
        />
        <el-table-column
          prop="remark"
          label="备注"
          width="220"
        />
        <el-table-column
          prop="createTime"
          label="添加时间"
          width="220"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="180"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="doEditRole(scope.row.id)">编辑</el-button>
            <el-button size="mini" @click="delRole(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination
        v-if="rolesList"
        :current-page.sync="pagination.start"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagination.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
      />

    </el-card>
  </div>
</template>

<script>
import { findRolesByPage, findAllPermissions, saveRolePermissions
  , findRolePermissions, removeRole
} from '@/api/auth/index'
import mixin from '@/mixins/index'
export default {
  name: 'VueAdminTemplateMasterIndex',
  mixins: [mixin],
  data() {
    return {
      dialogFormVisible: false,
      rolesList: [],
      roleForm: {
        permissionIds: ''
      },
      menuList: [],
      allChecked: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }

        ]
      },
      menuListIds: [],
      dialogTitle: ''
    }
  },

  created() {
    this.dofindRolesByPage()
    this.dofindAllPermissions()
  },

  methods: {
    // 分页器
    sizeChange(val) {
      this.pagination.start = 1
      this.pagination.limit = val
      this.dofindRolesByPage()
    },
    currentChange(val) {
      this.pagination.start = val
      this.dofindRolesByPage()
    },
    // 查询角色
    async dofindRolesByPage() {
      const res = await findRolesByPage(
        this.pagination.start,
        this.pagination.limit
      )
      const { success, data, message } = res
      if (success) {
        this.rolesList = data.rows
        this.pagination.total = data.total
      } else {
        this.$message.error(message)
      }
    },
    // 查询菜单
    async dofindAllPermissions() {
      const res = await findAllPermissions()
      const { success, message, data } = res
      if (success) {
        this.menuList = data.menus
      } else {
        this.$message.error(message)
      }
    },
    // 菜单全部，展开关闭
    handleAllExpand(e) {
      // nodesMap是一个对象
      console.log(this.$refs.refTree.store.nodesMap)
      const nodesMap = this.$refs.refTree.store.nodesMap
      for (const key in nodesMap) {
        const item = nodesMap[key]
        item.expanded = e
      }
    },
    // 菜单全选/取消全选
    handleAllCheck(e) {
      if (e) {
        this.getAllIds(this.menuList)
        this.$refs.refTree.setCheckedKeys(this.menuListIds)
      } else {
        this.menuListIds = []
        this.$refs.refTree.setCheckedKeys(this.menuListIds)
      }
    },
    // 获取所有id
    getAllIds(menuList) {
      for (let i = 0; i < menuList.length; i++) {
        const item = menuList[i]
        this.menuListIds.push(item.id)
        if (item.children && item.children.length > 0) {
          this.getAllIds(item.children)
        }
      }
    },
    // 新增角色
    async doAddRoles() {
      const arr = this.$refs.refTree.getCheckedKeys()
      console.log(arr)
      //       Role对象 {
      // createTime (string, optional): 创建时间 ,
      // id (string, optional): 角色id ,
      // isDeleted (boolean, optional): 逻辑删除 1（true）已删除， 0（false）未删除 ,
      // modifyTime (string, optional): 更新时间 ,
      // permissionIds (Array[string], optional): 权限id集合 ,
      // remark (string, optional): 备注 ,
      // roleCode (string, optional): 角色编码 ,
      // roleName (string, optional): 角色名称
      // }
      this.roleForm.permissionIds = arr
      const res = await saveRolePermissions(this.roleForm)
      const { success, message } = res
      if (success) {
        console.log(111)
        this.dialogFormVisible = false
        this.$message.success('新增角色成功')
      } else {
        this.$message.error(message)
      }
    },
    // 编辑
    async doEditRole(id) {
      const res = await findRolePermissions(id)
      const { success, message, data } = res
      if (success) {
        this.dialogTitle = '编辑角色'
        this.dialogFormVisible = true
        this.roleForm = data.role
      } else {
        this.$message.error(message)
      }
    },
    // 删除角色
    delRole(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const res = removeRole(id)
        const { success } = res
        if (success) {
          this.$message.success('删除成功')
          this.dofindAllPermissions()
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
</style>

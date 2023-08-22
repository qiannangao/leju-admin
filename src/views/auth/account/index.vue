<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>
          <el-button type="primary" size="mini" @click="doAddUser">新增账号</el-button>

        </span>
      </div>
      <!-- card body -->
      <el-dialog title="新增账号" :visible.sync="dialogFormVisible">
        <el-form :model="userForm">
          <el-form-item label="用户名">
            <el-input v-model="userForm.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userForm.password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="userForm.nickName" autocomplete="off" />
          </el-form-item>
          <!-- <el-form-item label="头像">
            <template>
              <img style="border-radius:50" width="50" height="50" :src="userForm.salt" alt="">
            </template>

          </el-form-item> -->
          <el-form-item label="角色">
            <el-select v-model="userForm.roleIds" placeholder="请选择" @change="logUser">
              <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              />
            </el-select>

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dosaveUserRoles">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>

  </div>
</template>

<script>
import { saveUserRoles, findAllRoles } from '@/api/auth/index'
export default {
  name: 'VueAdminTemplateMasterIndex',

  data() {
    return {
      userForm: {
        roleIds: []
      },
      dialogFormVisible: false,
      rolesList: []
    }
  },

  created() {
    this.dofindAllRoles()
  },

  methods: {
    logUser(e) {
      console.log(e)
    },
    async dofindAllRoles() {
      const res = await findAllRoles()
      const { success, data, message } = res
      this.dialogFormVisible === false
      if (success) {
        // data.items.forEach(item => {
        //   this.rolesList.push(
        //     {
        //       roleName: item.roleName,
        //       value: item.id
        //     }
        //   )
        // })
        this.rolesList = data.items

        console.log('roleslist', this.rolesList)
      } else {
        this.$message.error(message)
      }
    },
    doAddUser() {
      this.dialogFormVisible = true
    },
    async dosaveUserRoles() {
      this.userForm.roleIds = this.userForm.roleIds.split(',')
      console.log('userForm', this.userForm)
      const res = await saveUserRoles(this.userForm)
      const { success, message } = res
      if (success) {
        this.dialogFormVisible === false
      } else {
        this.$message.error(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

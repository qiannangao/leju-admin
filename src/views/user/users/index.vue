<template>
  <div>
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>用户管理</span>
      </div>
      <el-table :data="userList" border stripe>
        <el-table-column
          type="index"
          label="序号"
          width="50"
          fixed="left"
        />
        <el-table-column
          prop="username"
          label="用户名"
          width="180"
        />
        <el-table-column

          label="头像"
          width="120"
        >
          <template slot-scope="scope">
            <img width="80" height="80" style="border-radius:80px" :src="scope.row.icon" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          width="180"
        />
        <el-table-column
          prop="realname"
          label="真实姓名"
          width="180"
        />
        <el-table-column

          label="性别"
          width="180"
        >
          <!-- 0 男 1女 -->
          <template slot-scope="scope">
            <div v-if="scope.row.sex==1">女</div>
            <div v-if="scope.row.sex==0">男</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="180"
        />
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
        />
        <el-table-column
          prop="birthday"
          label="生日"
          width="180"
        />
        <el-table-column
          prop="createTime"
          label="注册事件"
          width="180"
          fixed="right"
        />
      </el-table>

    </el-card>

  </div>
</template>

<script>
import { findMembersByPage } from '@/api/user/user'
import mixin from '@/mixins/index'

export default {
  name: 'VueAdminTemplateMasterIndex',
  mixins: [mixin],
  data() {
    return {
      userList: ''
    }
  },

  created() {
    this.dofindMembersByPage()
  },

  methods: {
    async dofindMembersByPage() {
      const res = await findMembersByPage(this.pagination.start, this.pagination.limit)
      const { success, message, data } = res
      if (success) {
        this.userList = data.rows
      } else {
        this.$message.error(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

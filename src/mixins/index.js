import { getToken } from '@/utils/myAuth'
export default {
  data() {
    return {
      pagination: {
        total: 0,
        start: 1,
        limit: 10
      },
      // 打包时这个路径不会和baseUrl拼接，应该写全路径
      uploadFileOss: 'http://leju.bufan.cloud/lejuAdmin/material/uploadFileOss'
    }
  },
  computed: {
    token() {
      return { token: getToken() }
    }
  }
}

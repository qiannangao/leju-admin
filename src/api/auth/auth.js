import request from '@/api/request'
// 获取初始菜单
export function getInitMenus() {
  return request({
    url: `/admin/sysAuth/index/getInitMenus`
  })
}

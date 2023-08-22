import request from '@/api/request'
// 查询所有菜单
export function findAllPermissions() {
  return request({
    url: `/admin/sysAuth/permission/findAllPermissions`
  })
}
// 查询角色分页
export function findRolesByPage(start, limit) {
  return request({
    url: `/admin/sysAuth/role/findRolesByPage/${start}/${limit}`
  })
}
// 新增角色
export function saveRolePermissions(data) {
  return request({
    url: `/admin/sysAuth/role/saveRolePermissions`,
    method: 'post',
    data
  })
}
// 修改角色
export function updateRolePermissions(data) {
  return request({
    url: `/admin/sysAuth/role/updateRolePermissions`,
    method: 'PUT',
    data
  })
}
// 获取角色详情
export function findRolePermissions(id) {
  return request({
    url: ` /admin/sysAuth/role/findRolePermissions/${id}`

  })
}
// 删除角色
export function removeRole(id) {
  return request({
    url: `/admin/sysAuth/role/removeRole/${id}`,
    method: 'DELETE'

  })
}
// 新增菜单
export function addMenu(data) {
  return request({
    url: `/admin/sysAuth/permission/save`,
    method: 'post',
    data

  })
}
// 初始化菜单
export function saveInitMenus(data) {
  return request({
    url: `/admin/sysAuth/permission/saveInitMenus`,
    method: 'post',
    data

  })
}
// 新增账号
export function saveUserRoles(data) {
  return request({
    url: `/admin/sysAuth/user/saveUserRoles`,
    method: 'post',
    data

  })
}
// 查询所有角色
export function findAllRoles() {
  return request({
    url: `/admin/sysAuth/role/findAllRoles`
  })
}

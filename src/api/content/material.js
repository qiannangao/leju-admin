import request from '@/api/request'

// 上传素材
export function uploadFileOss() {
  return request({
    url: '/lejuAdmin/material/uploadFileOssSave',
    method: 'post'
  })
}
// 查询素材
export function findMaterial(start, limit) {
  return request({
    url: `/lejuAdmin/material/findMaterialByPage/${start}/${limit}`
  })
}

// 删除
export function delMaterial(id) {
  return request({
    url: `/lejuAdmin/material/delMaterial/${id}`,
    method: 'delete'
  })
}

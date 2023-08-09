import request from '@/api/request'
// 获取地址
export function getAddress(start, limit, data) {
  return request({
    url: `/lejuAdmin/companyAddress/addressList`
  })
}
// 新增地址

export function addAddress(data) {
  return request({
    url: `/lejuAdmin/companyAddress/save`,
    method: 'post',
    data
  })
}
// 获取地址详情

export function companyAddress(id) {
  return request({
    url: `/lejuAdmin/companyAddress/${id}`

  })
}
// 更新
export function updateAddress(data) {
  return request({
    url: `/lejuAdmin/companyAddress/update`,
    method: 'post',
    data

  })
}
// 删除
export function delAddress(id) {
  return request({
    url: `/lejuAdmin/companyAddress/${id}`,
    method: 'delete'

  })
}


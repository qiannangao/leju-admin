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

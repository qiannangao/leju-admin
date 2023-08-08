// /lejuAdmin/brand/findAllBrand
import request from '@/api/request'
// 获取品牌列表
export function findAllBrand() {
  return request({
    url: `lejuAdmin/brand/findAllBrand`
  })
}

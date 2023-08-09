// /lejuAdmin/brand/findAllBrand
import request from '@/api/request'
// 获取品牌列表
export function findAllBrand() {
  return request({
    url: `lejuAdmin/brand/findAllBrand`
  })
}
// 获取商品列表
export function productsByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}
// 获取分类
export function getAllCategory() {
  return request({
    url: `/lejuAdmin/category/getAllCategory`
  })
}


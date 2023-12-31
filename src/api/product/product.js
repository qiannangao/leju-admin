// /lejuAdmin/brand/findAllBrand
import request from '@/api/request'
// 获取品牌列表
export function findAllBrand() {
  return request({
    url: `lejuAdmin/brand/findAllBrand`
  })
}
// 获取品牌列表分页
export function findBrandByPage(start, limit) {
  return request({
    url: `/lejuAdmin/brand/findBrandByPage/${start}/${limit}`
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
// 新增商品
export function addProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/addProductAndSkus`,
    method: 'post',
    data
  })
}
// 获取商品详情
export function productSkusDetail(id) {
  return request({
    url: ` /lejuAdmin/product/productSkusDetail/${id}`
  })
}
// 更新
export function updateProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/updateProductAndSkus`,
    method: 'post',
    data
  })
}
// 根据商品id查询库存
export function getSkusByProductId(id) {
  return request({
    url: `/lejuAdmin/sku/getSkusByProductId/${id}`
  })
}

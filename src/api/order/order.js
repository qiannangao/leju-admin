import request from '@/api/request'
// 获取订单列表
export function findOrdersByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/order/findOrdersByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}
// 获取订单详情
export function orderDetail(id) {
  return request({
    url: `/lejuAdmin/order/orderDetail/${id}`

  })
}
// 发货
export function sendDone(data) {
  return request({
    url: `/lejuAdmin/order/sendDone`,
    method: 'post',
    data
  })
}
// 获取退单列表
export function findReturnApply(start, limit, data) {
  return request({
    url: `/lejuAdmin/orderReturn/findReturnApply/${start}/${limit}`,
    method: 'post',
    data
  })
}
// 获取退单详情
export function orderReturn(id) {
  return request({
    url: `/lejuAdmin/orderReturn/${id}`

  })
}
// 同意退单
export function agreeApply(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/agreeApply/${id}`,
    method: 'post',
    data
  })
}
// 拒绝退单
export function rejectApply(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/rejectApply/${id}`,
    method: 'post',
    data
  })
}
// 确认收货
export function receiveProduct(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/receiveProduct/${id}`,
    method: 'post',
    data
  })
}


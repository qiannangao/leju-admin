import request from '@/api/request'
export function findArticle(start, limit, data) {
  return request({
    url: `/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
    method: 'post',
    data

  })
}
// 新增文章
export function addArticle(data) {
  return request({
    url: '/lejuAdmin/productArticle/addArticle',
    method: 'post',
    data

  })
}
// 获取文章
export function getArticleDetail(id) {
  return request({
    url: `/lejuAdmin/productArticle/productArticle/${id}`

  })
}
// 更新文章
export function updateArticle(data) {
  return request({
    url: `/lejuAdmin/productArticle/updateArticle`,
    method: 'post',
    data
  })
}
// 删除文章
export function delArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/del/${id}`,
    method: 'delete'
  })
}
// 显示文章
export function changeShowStatus(data) {
  return request({
    url: `/lejuAdmin/productArticle/changeShowStatus`,
    method: 'post',
    data
  })
}

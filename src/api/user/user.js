import request from '@/api/request'

export function findMembersByPage(start, limit) {
  return request({
    url: `/lejuAdmin/member/findMembersByPage/${start}/${limit}`

  })
}

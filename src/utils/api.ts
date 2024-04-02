import request from './request'
export const agentSearch = (params: Record<string, string>) => {
  return request({
    url: '/agent_search',
    method: 'post',
    data: params
  })
}
export const agentAdd = (params: Record<string, string>) => {
  return request({
    url: '/agent_add',
    method: 'post',
    data: params
  })
}
//frckqy.laf.run/agent_delete
export const agentDelete = (params: Record<string, string>) => {
  return request({
    url: '/agent_delete',
    method: 'post',
    data: params
  })
}
export const agentEdit = (params: Record<string, string>) => {
  return request({
    url: '/agent_edit',
    method: 'post',
    data: params
  })
}

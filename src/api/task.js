import request from '@/utils/request'
/**
 * 工单搜索/获取工单
 * @param {*} params 搜索所需的对象
 * @returns Promise
 */
export const taskSearch = (params) => {
  return request({
    url: '/task-service/task/search',
    params,
  })
}

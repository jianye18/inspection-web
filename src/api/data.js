import axios from '@/libs/api.request'

export const getTableData = (formData) => {
  return axios.request({
    url: '/user/getUserPageList',
    data: formData,
    method: 'post'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

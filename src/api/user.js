import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  return axios.request({
    url: '/login/loginIn',
    data: {
      loginName: userName,
      password: password
    },
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const getTableData = (formData) => {
  return axios.request({
    url: '/user/getUserPageList',
    data: formData,
    method: 'post'
  })
}

export const saveUser = (formData) => {
  return axios.request({
    url: '/user/saveUser',
    data: formData,
    method: 'post'
  })
}

export const deleteUser = (userId) => {
  return axios.request({
    url: '/user/deleteUser/' + userId,
    method: 'delete'
  })
}
export const getAllRoleList = () => {
  return axios.request({
    url: '/role/getAllRoleList',
    method: 'get'
  })
}

export const getUser = (nickName, userId) => {
  return axios.request({
    url: '/user/judgeNickNameIsExist?nickName=' + nickName + '&userId=' + userId,
    method: 'get'
  })
}

export const getUserRoleListByUserId = (userId) => {
  return axios.request({
    url: '/user/getUserRoleListByUserId?userId=' + userId,
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/login/loginOut',
    method: 'post'
  })
}

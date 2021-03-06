import axios from '../axios'

/*
 * 角色管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/role/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/role/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/role/findPage',
        method: 'post',
        data
    })
}
// 查询全部
export const findAll = () => {
    return axios({
        url: '/role/findAll',
        method: 'get'
    })
}
// 查询角色菜单集合
export const findRoleMenus = (params) => {
    return axios({
        url: '/role/findRoleMenus',
        method: 'get',
        params
    })
}
// 保存角色菜单集合
export const saveRoleMenus = (data) => {
    return axios({
        url: '/role/saveRoleMenus',
        method: 'post',
        data
    })
}

// 首页审核状态
export const getMemberStatus = (data) => {
    return axios({
        url: '/api/member/company/member_status',
        method: 'post',
        data
    })
}
//平台角色更改状态
export const changeStatus = (data) => {
  return axios({
    url: '/admin/app/user/modify_status',
    method: 'post',
    data
  })
}

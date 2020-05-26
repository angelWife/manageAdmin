import axios from '../axios'

// 角色管理列表
export const getRoleList = (data) => {
  return axios({
      url: '/admin/app/role/table_data',
      method: 'post',
      data
  })
}

//新增和编辑
export const editRoleInfo = (data) => {
  return axios({
      url: '/admin/app/role/modify',
      method: 'post',
      data
  })
}

//角色详
export const getRoleInfo = (data) => {
  return axios({
      url: '/admin/app/role/load_by_id',
      method: 'post',
      data
  })
}

//角色状态编辑
export const editRoleStatus = (data) => {
  return axios({
    url: '/admin/app/role/modify_status',
    method: 'post',
    data
  })
}

// 权限编辑
// /admin/app/menu/modify
export const editAuthority = (data) => {
  return axios({
      url: '/admin/app/menu/modify',
      method: 'post',
      data
  })
}

// 获取权限菜单
export const getMenuList = (data) => {
  return axios({
      url: '/admin/app/menu/load',
      method: 'post',
      data
  })
}

//部门列表
export const departmentList = (data) => {
  return axios({
      url: '/admin/app/department/load_tree_by_parent',
      method: 'post',
      data
  })
}

//部门编辑
export const departmentEdit = (data) => {
  return axios({
      url: '/admin/app/department/modify',
      method: 'post',
      data
  })
}

//用户列表
export const getUserList = (data) => {
  return axios({
      url: '/admin/app/user/table_data',
      method: 'post',
      data
  })
}

//用户展示列表 /admin/app/role/list_data
export const getSelectUserList = (data) => {
  return axios({
      url: '/admin/app/role/list_data',
      method: 'post',
      data
  })
}
//用户列编辑
export const userEdit = (data) => {
  return axios({
      url: '/admin/app/user/modify',
      method: 'post',
      data
  })
}
//修改用户密码
export const userPwdChange = (data) => {
  return axios({
      url: '/admin/app/user/modify_pd',
      method: 'post',
      data
  })
}
//删除协会架构管理
export const delDepartment = (data) => {
  return axios({
    url: '/admin/app/department/delete_dept',
    method: 'post',
    data
  })
}

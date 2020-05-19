import axios from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/user/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/user/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/user/findPage',
        method: 'post',
        data
    })
}
// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: '/user/findPermissions',
        method: 'get',
        params
    })
}

//修改个人登录密码
export const changeUserPwd = (data) => {
    return axios({
        url: '/common/app/user/modify_pd',
        method: 'post',
        data
    })
}
//代办事项 
export const getTodoList=(data)=>{
    return axios({
      url: '/api/workflow/get_serial_list',
      method: 'post',
      data
  })
} 
//获取通知公告列表
export const getNoticeList=(data)=>{
      return axios({
        url: '/api/message/notice/table_data',
        method: 'post',
        data
    })
} 
//查看公告通知
export const checkNoticeDetail=(id)=>{
       return axios({
        url: '/api/message/system/read',
        method: 'post',
        data:{id}
    })
} 
//系统消息列表
export const getSysMessageList=(data)=>{
      return axios({
        url: '/api/message/system/table_data',
        method: 'post',
        data
    })
}
//系统消息查看
export const checkSysMessageDetail=(id)=>{
      return axios({
        url: '/api/message/system/read',
        method: 'post',
        data:{id}
    })
}
//获取年费详情
export const getYearPayDetail=(id)=>{
    
}
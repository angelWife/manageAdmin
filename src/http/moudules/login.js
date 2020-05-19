import axios from '../axios'

/*
 * 系统登录模块
 */

// 登录
export const login = (data, header) => {
    return axios({
        url: '/login/in',
        method: 'post',
        data,
        header
    })
}

// 登出
export const logout = () => {
    return axios({
        url: '/login/out',
        method: 'post'
    })
}

// 获取机构列表
export const getOrganList = () => {
    return axios({
        url: '/user/choose_agency',
        method: 'post'
    })
}
//注册账户
export const registerUser = (data) => {
    return axios({
        url: '/user/register',
        method: 'post',
        data
    })
}

//忘记密码
export const getPassword = (data, header) => {
    return axios({
        url: '/login/forget',
        method: 'post',
        data,
        header
    })
}
//重置密码
export const resetPassword = () => {
    return axios({
        url: '/login/reset',
        method: 'post'
    })
}
//保存会员缴费界面
export const savePayPage = () => {
    return axios({
        url: '/login/save_pay_info',
        method: 'post'
    })
}
//短信发送
export const smsSend = (data) => {
  return axios({
    url: '/sms/register',
    method: 'post',
    data
  })
}

import axios from '../axios'

/* 
 * 消息中心
 */

// 系统消息分页查询
export const sysMessage = (data) => {
    return axios({
        url: '/admin/message/system/table_data',
        method: 'post',
        data
    })
}

// 新建 编辑
export const sysAdd = (data) => {
    return axios({
        url: '/admin/message/system/add',
        method: 'post',
        data
    })
}
// 发布

export const sysPublish = (data) => {
    return axios({
        url: '/admin/message/system/publish',
        method: 'post',
        data
    })
}

// 删除
export const sysDelete = (data) => {
    return axios({
        url: '/admin/message/system/delte',
        method: 'post',
        data
    })
}

// 复制
export const sysCopy = (data) => {
    return axios({
        url: '/admin/message/system/copy',
        method: 'post',
        data
    })
}

// 下架
export const sysDown = (data) => {
    return axios({
        url: '/admin/message/system/down',
        method: 'post',
        data
    })
}

//发送监控

export const sysListen = (data) => {
    return axios({
        url: '/admin/message/system/listen',
        method: 'post',
        data
    })
}

// 显示系统消息
export const sysView = (data) => {
    return axios({
        url: '/admin/message/system/view',
        method: 'post',
        data
    })
}

// 通知公告分页查询
export const noticeMessage = (data) => {
    return axios({
        url: '/admin/message/notice/table_data',
        method: 'post',
        data
    })
}

// 通知公告 新建 编辑
export const noticeAdd = (data) => {
    return axios({
        url: '/admin/message/notice/add',
        method: 'post',
        data
    })
}
//通知公告 发布

export const noticePublish = (data) => {
    return axios({
        url: '/admin/message/notice/publish',
        method: 'post',
        data
    })
}

//通知公告 删除
export const noticeDelete = (data) => {
    return axios({
        url: '/admin/message/notice/delte',
        method: 'post',
        data
    })
}

// 通知公告 复制
export const noticeCopy = (data) => {
    return axios({
        url: '/admin/message/notice/copy',
        method: 'post',
        data
    })
}

//通知公告  下架
export const noticeDown = (data) => {
    return axios({
        url: '/admin/message/notice/down',
        method: 'post',
        data
    })
}

// 通知公告 发送监控

export const noticeListen = (data) => {
    return axios({
        url: '/admin/message/notice/listen',
        method: 'post',
        data
    })
}

// 显示 通知公告 
export const noticeView = (data) => {
    return axios({
        url: '/admin/message/notice/view',
        method: 'post',
        data
    })
}

// 模板管理 分页查询
export const modelMessage = (data) => {
    return axios({
        url: '/admin/message/model/table_data',
        method: 'post',
        data
    })
}
// 新建 编辑
export const modelAdd = (data) => {
    return axios({
        url: '/admin/message/model/add',
        method: 'post',
        data
    })
}

// 显示
export const modelView = (data) => {
    return axios({
        url: '/admin/message/model/view',
        method: 'post',
        data
    })
}

// 短信平台 分页查询
export const smsMessage = (data) => {
    return axios({
        url: '/admin/message/sms/table_data',
        method: 'post',
        data
    })
}

// 短信平台 新建 编辑
export const smsAdd = (data) => {
    return axios({
        url: '/admin/message/sms/add',
        method: 'post',
        data
    })
}
//短信平台 发布

export const smsPublish = (data) => {
    return axios({
        url: '/admin/message/sms/publish',
        method: 'post',
        data
    })
}

//短信平台 删除
export const smsDelete = (data) => {
    return axios({
        url: '/admin/message/sms/delte',
        method: 'post',
        data
    })
}

//短信平台 复制
export const smsCopy = (data) => {
    return axios({
        url: '/admin/message/sms/copy',
        method: 'post',
        data
    })
}

//短信平台 下架
export const smsDown = (data) => {
    return axios({
        url: '/admin/message/sms/down',
        method: 'post',
        data
    })
}
// 短信平台 发送监控
export const smsListen = (data) => {
    return axios({
        url: '/admin/message/sms/listen',
        method: 'post',
        data
    })
}
// 短信平台 发送监控
export const smsAddListen = (data) => {
    return axios({
        url: '/admin/message/sms/add_listen',
        method: 'post',
        data
    })
}
// 显示
export const smsView = (data) => {
    return axios({
        url: '/admin/message/sms/view',
        method: 'post',
        data
    })
}

// 邮件平台 分页查询
export const emailMessage = (data) => {
    return axios({
        url: '/admin/message/email/table_data',
        method: 'post',
        data
    })
}

// 邮件平台 新建 编辑
export const emailAdd = (data) => {
    return axios({
        url: '/admin/message/email/add',
        method: 'post',
        data
    })
}
//邮件平台 发布

export const emailPublish = (data) => {
    return axios({
        url: '/admin/message/email/publish',
        method: 'post',
        data
    })
}

//邮件平台 删除
export const emailDelete = (data) => {
    return axios({
        url: '/admin/message/email/delte',
        method: 'post',
        data
    })
}

//邮件平台 复制
export const emailCopy = (data) => {
    return axios({
        url: '/admin/message/email/copy',
        method: 'post',
        data
    })
}

//邮件平台 下架
export const emailDown = (data) => {
    return axios({
        url: '/admin/message/email/down',
        method: 'post',
        data
    })
}
// 邮件平台 发送监控
export const emailListen = (data) => {
    return axios({
        url: '/admin/message/email/listen',
        method: 'post',
        data
    })
}
// 邮件平台 发送监控
export const emailAddListen = (data) => {
    return axios({
        url: '/admin/message/email/add_listen',
        method: 'post',
        data
    })
}
// 显示
export const emailView = (data) => {
    return axios({
        url: '/admin/message/email/view',
        method: 'post',
        data
    })
}
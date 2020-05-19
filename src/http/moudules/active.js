import axios from '../axios'

/*
 *市场活动
 */

// 分页查询
export const showActive = (data) => {
    return axios({
        url: '/admin/activity/info/activity_query',
        method: 'post',
        data
    })
}

// 新建编辑活动
export const newActive = (data) => {
    return axios({
        url: '/admin/activity/info/addOrUpdate',
        method: 'post',
        data
    })
}

// 发布活动
export const publishActive = (data) => {
    return axios({
        url: '/admin/activity/info/publish',
        method: 'post',
        data
    })
}
// 复制活动
export const copyActive = (data) => {
    return axios({
        url: '/admin/activity/info/copy',
        method: 'post',
        data
    })
}
// 下架活动
export const downActive = (data) => {
    return axios({
        url: '/admin/activity/info/publish_down',
        method: 'post',
        data
    })
}
// 删除活动
export const deleteActive = (data) => {
    return axios({
        url: '/admin/activity/info/delete',
        method: 'post',
        data
    })
}
// 报名确认
export const confrimActive = (data) => {
    return axios({
        url: '/admin/activity/info/ack_enrol_people',
        method: 'post',
        data
    })
}
// 报名退出
export const quitActive = (data) => {
    return axios({
        url: '/admin/activity/info/quit_enrol_people',
        method: 'post',
        data
    })
}
// 报名确认 分页数据
export const confrimData = (data) => {
    return axios({
        url: '/admin/activity/info/table_data_people',
        method: 'post',
        data
    })
}
// 添加 参与者
export const addJoin = (data) => {
    return axios({
        url: '/admin/activity/info/modify_people',
        method: 'post',
        data
    })
}

//显示活动详情
export const viewData = (data) => {
    return axios({
        url: '/admin/activity/info/view',
        method: 'post',
        data
    })
}
// 显示活动统计数据
export const activityData = (data) => {
    return axios({
        url: '/admin/activity/info/view_data',
        method: 'post',
        data
    })
}

// 报名退出
export const exitActive = (data) => {
    return axios({
        url: '/admin/activity/info/quit_enrol_people',
        method: 'post',
        data
    })
}

// 分页数据 监控
export const viewListen = (data) => {
    return axios({
        url: '/admin/activity/info/view_listen',
        method: 'post',
        data
    })
}
// 发送监控
export const sendListen = (data) => {
    return axios({
        url: '/admin/activity/info/send_listen',
        method: 'post',
        data
    })
}
// 全体监控
export const sendAll = (data) => {
  return axios({
    url: '/admin/activity/info/send_listen_all',
    method: 'post',
    data
  })
}


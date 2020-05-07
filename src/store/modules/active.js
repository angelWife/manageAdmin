import axios from '../axios'

/*
 * 市场活动管理
 */

export const showActive = (data) => {
    return axios({
        url: '/admin/activity/info/activity_query',
        method: 'post',
        data
    })
}
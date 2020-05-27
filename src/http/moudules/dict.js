import axios from '../axios'

/* 
 * 字典管理模块
 */

//工作流状态
export const workFlowStatus=(params)=>{
    return axios({
        url: '/dict/workflow/wktype',
        method: 'get',
        params
    })
}

// 显示
export const showDic = (data) => {
    return axios({
        url: '/admin/sys/dict/table_data',
        method: 'post',
        data
    })
}

// 新建
export const newDiction = () => {
    return axios({
        url: '/dict/sys/dictTypeList',
        method: 'get'
    })
}
// 新建提交
export const saveDic = (data) => {
    return axios({
        url: '/admin/sys/dict/modify',
        method: 'post',
        data
    })
}
// 删除
export const deleteRow = (data) => {
    return axios({
        url: '/admin/sys/dict/modify_remove',
        method: 'post',
        data
    })
}
// 公共select的接口
export const sysType = (data) => {
    return axios({
        url: '/common/sys/dict/load_by_type',
        method: 'post',
        data
    })
}
//公司类型
export const companyTypeList=()=>{
     return axios({
        url: '/dict/member/companyType',
        method: 'get',
    })
}
//最高学历
export const hightestEducation=()=>{
     return axios({
        url: '/dict/member/educatorType',
        method: 'get',
    })
}
//性别
export const getGender=()=>{
     return axios({
        url: '/dict/member/gender',
        method: 'get',
    })
}
//是否上市
export const getListed=()=>{
     return axios({
        url: '/dict/member/listed',
        method: 'get',
    })
}
//股东类型
export const shareholderType=()=>{
     return axios({
        url: '/dict/member/shareholderTypeList',
        method: 'get',
    })
}
// 会员状态
export const memberStatusList = () => {
    return axios({
        url: '/dict/member/memberStatusList',
        method: 'get',
    })
}
// 发布状态
export const publishStatusList = () => {
    return axios({
        url: '/dict/member/publishStatusList',
        method: 'get',
    })
}

// 年费计算审核状态
export const payOrganList = () => {
    return axios({
        url: '/dict/member/payOrganList',
        method: 'get',
    })
}
// 资格 能力
export const qualityType = () => {
    return axios({
        url: '/dict/member/qualificationType',
        method: 'get',
    })
}
// 市场活动管理 监控活动
export const monitorStatus = () => {
    return axios({
        url: '/dict/activity/sendStatus',
        method: 'get',
    })
}

// 参与者报名状态
export const enrollStatus = () => {
    return axios({
        url: '/dict/activity/enrolPeopleStatus',
        method: 'get',
    })
}

// 发票寄送状态
export const billStatus = () => {
    return axios({
        url: '/dict/member/sendStatus',
        method: 'get',
    })
}

// 年审监控 基本信息
export const basicStatus = () => {
    return axios({
        url: '/dict/member/companyReviewStatus',
        method: 'get',
    })
}

// 年审监控 会员代表
export const memberStatus = () => {
    return axios({
        url: '/dict/member/memberRepReviewStatus',
        method: 'get',
    })
}

// 消息中心 发布状态
export const msgStatus = () => {
    return axios({
        url: '/dict/message/publishStatusList',
        method: 'get',
    })
}

// 阅读状态
export const readStatus = () => {
    return axios({
        url: '/dict/message/listenList',
        method: 'get',
    })
}

// 消息模板类型
export const modelStatus = () => {
    return axios({
        url: '/dict/message/modelType',
        method: 'get',
    })
}

// 对象类型
export const objType = () => {
    return axios({
        url: '/dict/message/sendType',
        method: 'get',
    })
}

// 对象类型
export const enrollType = () => {
    return axios({
        url: '/dict/activity/enrolStatus',
        method: 'get',
    })
}

// 阅读状态
export const readType = () => {
    return axios({
        url: '/dict/message/apiReadStatus',
        method: 'get',
    })
}

// 阅读状态
export const feeName = (data) => {
    return axios({
        url: '/api/member/pay/query_list',
        method: 'post',
        data
    })
}

//业务流水状态 
export const workStatus = () => {
    return axios({
        url: '/dict/workflow/wkstatus',
        method: 'get',
    })
}

//业务流水类型
export const workTypes = () => {
    return axios({
        url: '/dict/workflow/wktype',
        method: 'get',
    })
}

//信息变更类型  wk_change_type
export const infoChangeTypes = () => {
    return axios({
        url: '/dict/workflow/wk_change_type',
        method: 'get',
    })
}
//获取机构类型  POST /api/sys/dict/table_data
export const getTableTypes = (data) => {
    return axios({
        url: '/common/sys/dict/load_by_type',
        method: 'post',
        data
    })
}
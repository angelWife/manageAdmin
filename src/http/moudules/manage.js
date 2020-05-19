import axios from '../axios'

/* 
 * 审批中心
 */

// 审批列表
export const getManageList = (data) => {
  return axios({
    url: '/admin/workflow/get_serial_list',
    method: 'post',
    data
  })
}

//查看流水VO数据
export const manageDetail = (data) => {
  return axios({
    url: '/admin/workflow/get_table_data_by_serialnumber',
    method: 'post',
    data
  })
}

//流水进度列表 
export const manageProcessList = (data) => {
  return axios({
    url: '/admin/workflow/get_task_list',
    method: 'post',
    data
  })
}

//流水数据
export const manageInfo = (data) => {
  return axios({
    url: '/admin/workflow/get_ingtask_by_serialnumber',
    method: 'post',
    data
  })
}

//更新流水数据
export const manageUpdate = (data) => {
  return axios({
    url: '/admin/workflow/sync_workflow_state',
    method: 'post',
    data
  })
}
// 审批或拒审
export const manageOper = (data) => {
  return axios({
    url: '/admin/workflow/complete_task',
    method: 'post',
    data
  })
}
// 流水流程图  /admin/workflow/get_task_list_pic_url
export const manageImgUrl = (data) => {
  return axios({
    url: '/admin/workflow/get_task_list_pic_url',
    method: 'post',
    data
  })
}

// 公司信息
export const manageCompanyInfo = (data) => {
  return axios({
    url: '/admin/member/info/view_company',
    method: 'post',
    data
  })
}
// 联系人信息
export const manageContactInfo = (data) => {
  return axios({
    url: '/admin/member/info/List_data_contact',
    method: 'post',
    data
  })
}
// 会员信息
export const manageMemberInfo = (data) => {
  return axios({
    url: '/admin/member/info/view_member',
    method: 'post',
    data
  })
}
// 会员代表信息
export const manageRepInfo = (data) => {
  return axios({
    url: '/admin/member/info/view_rep',
    method: 'post',
    data
  })
}
// 高管信息
export const manageSeniorInfo = (data) => {
  return axios({
    url: '/admin/member/info/list_data_senior',
    method: 'post',
    data
  })
}
// 股东信息
export const manageShareholderInfo = (data) => {
  return axios({
    url: '/admin/member/info/list_data_shareholder',
    method: 'post',
    data
  })
}
// 业务信息
export const manageBusinessInfo = (data) => {
  return axios({
    url: '/admin/member/info/view_business_info',
    method: 'post',
    data
  })
}
// 补充说明
export const manageMoreInfo = (data) => {
  return axios({
    url: '/admin/member/info/view_more_info',
    method: 'post',
    data
  })
}
//添加凭证
export const manageMoreAdd = (data) => {
  return axios({
    url: '/admin/member/info/add_more',
    method: 'post',
    data
  })
}
//添加凭证附件
export const manageMoreAddFile = (data) => {
  return axios({
    url: '/admin/member/info/add_more_file',
    method: 'post',
    data
  })
}
//会费信息 
export const getVipCost = (data) => {
  return axios({
      url: '/admin/member/pay/get-dues',
      method: 'post',
      data
  })
}
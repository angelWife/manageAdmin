import axios from '../axios'

/*
 * 会员模块
 */

/*
 * 会员组管理
 */
export const showGroup = (data) => {
    return axios({
        url: '/admin/member/group/view_group',
        method: 'post',
        data
    })
}

// 保存
export const actMember = (data) => {
    return axios({
        url: '/admin/member/group/modify_group',
        method: 'post',
        data
    })
}
// 删除会员组
export const groupDelete = (header) => {
    return axios({
        url: '/admin/member/group/del_member_group',
        method: 'post',
        header
    })
}
// 显示组内信息
export const showMember = (data) => {
    return axios({
        url: '/admin/member/group/view_group_member',
        method: 'post',
        data
    })
}
// 删除会员
export const deleteMember = (data) => {
    return axios({
        url: '/admin/member/group/del_member',
        method: 'post',
        data
    })
}
// 批量删除会员
export const delBatchMember = (data) => {
    return axios({
        url: '/admin/member/group/del_batch_member',
        method: 'post',
        data
    })
}
// 搜索会员
export const queryMember = (data) => {
    return axios({
        url: '/admin/member/group/query_member',
        method: 'post',
        data
    })
}

// 添加会员
export const addMember = (data) => {
    return axios({
        url: '/admin/member/group/modify',
        method: 'post',
        data
    })
}

// 根据分类添加
export const cateMember = () => {
    return axios({
        url: '/admin/member/group/category_member',
        method: 'post',
    })
}

// 会员档案
export const showRecord = (data) => {
    return axios({
        // url: '/admin/member/info/advance_search',
        url: '/admin/member/archives/page',
        method: 'post',
        data
    })
}

// 上传附件
export const addFile = () => {
    return axios({
        url: '/admin/member/visit/add_file',
        method: 'post',
    })
}

// 新建、编辑拜访记录
export const addVisit = (data) => {
    return axios({
        url: '/admin/member/visit/add_visit',
        method: 'post',
        data
    })
}
// 删除拜访记录
export const delVisit = (data) => {
    return axios({
        url: '/admin/member/visit/del_visit',
        method: 'post',
        data
    })
}
// 显示拜访记录
export const showVisit = (data) => {
    return axios({
        url: '/admin/member/visit/list_data_visit',
        method: 'post',
        data
    })
}

//查询年费管理
export const showFee = (data) => {
    return axios({
        url: '/admin/member/pay/table_data_annual',
        method: 'post',
        data
    })
}

// 新建编辑 年费管理
export const addFee = (data) => {
    return axios({
        url: '/admin/member/pay/add_annual',
        method: 'post',
        data
    })
}

// 删除年费
export const deleteFee = (data) => {
    return axios({
        url: '/admin/member/pay/delete_fee',
        method: 'post',
        data
    })
}

// 年费标准分页数据
export const showCalcu = (data) => {
    return axios({
        url: '/admin/member/pay/table_data_standard',
        method: 'post',
        data
    })
}
export const deleteCalcu = (data) => {
    return axios({
        url: '/admin/member/pay/delete_organ',
        method: 'post',
        data
    })
}
export const viewCalcu = (data) => {
    return axios({
        url: '/admin/member/pay/view_standard',
        method: 'post',
        data
    })
}
export const editCalcu = (data) => {
    return axios({
        url: '/admin/member/pay/edit_oneOrgan',
        method: 'post',
        data
    })
}

// 年审相关
export const showAnnual = (data) => {
    return axios({
        url: '/admin/member/annual/table_data_annual',
        method: 'post',
        data
    })
}
export const deleteAnnual = (data) => {
    return axios({
        url: '/admin/member/annual/delete_annual',
        method: 'post',
        data
    })
}
// 发布
export const publishAnnual = (data) => {
    return axios({
        url: '/admin/member/annual/publish_annual',
        method: 'post',
        data
    })
}
//下架
export const downAnnual = (data) => {
    return axios({
        url: '/admin/member/annual/down_annual',
        method: 'post',
        data
    })
}
export const addMemberName = (data) => {
    return axios({
        url: '/common/app/info/query_member',
        method: 'post',
        data
    })
}

// 新建 name提交
export const newAnnual = (data) => {
    return axios({
        url: '/admin/member/annual/modify',
        method: 'post',
        data
    })
}
// 公共  --推送提交
export const publicMsg = (data) => {
    return axios({
        url: `/common/app/info/modify`,
        method: 'post',
        data
    })
}
export const showMsgMmber = (data) => {
    return axios({
        url: '/common/app/info/view',
        method: 'post',
        data
    })
}

// 显示会员信息
export const basicMember = (data) => {
    return axios({
        //url: '/admin/member/info/view_member',
        url:"/admin/member/archives/view_member",
        method: 'post',
        data
    })
}
// 显示公司基本信息
export const basicComp = (params) => {
    return axios({
       //url: '/admin/member/info/view_company',
        url:"/admin/member/archives/view_company",
        method: 'get',
        params
    })
}
// 显示联系人基本信息
export const basicContact = (params) => {
    return axios({
        url: '/admin/member/archives/contact/list',
        method: 'get',
        params
    })
}
// 显示会员代表
export const basicRep = (params) => {
    return axios({
        url: '/admin/member/archives/rep/view',
        method: 'get',
        params
    })
}
// 股东
export const basicShare = (params) => {
    return axios({
        url: '/admin/member/archives/shareholder/list',
        method: 'get',
        params
    })
}
// 高管
export const basicSenior = (params) => {
    return axios({
        url: '/admin/member/archives/senior/list',
        method: 'get',
        params
    })
}
// 显示业务信息
export const basicInfo = (params) => {
    return axios({
        url: '/admin/member/archives/business-info/view',
        method: 'get',
        params
    })
}
//判断12种业务  管理员
export const basicType = (params) => {
    return axios({
        url: '/admin/member/archives/businessType',
        method: 'get',
        params
    })
}
//判断12种业务  成员
export const serviceType = (params) => {
    return axios({
        url: '/api/member/info/businessType',
        method: 'get',
        params
    })
}
// 发票寄送管理
export const queryInvoice = (data) => {
    return axios({
        url: '/admin/member/pay/query_invoice',
        method: 'post',
        data
    })
}
// 会员档案 变更记录`
export const changeNote = (params) => {
    return axios({
        url: '/admin/member/archives/query_change_record',
        method: 'get',
        params
    })
}
// 会员档案 缴费记录
export const payNote = (data) => {
    return axios({
        url: '/admin/member/pay/query_pay_record',
        method: 'post',
        data
    })
}
// 流程进度
export const viewFlow = (data) => {
    return axios({
        url: '/admin/member/info/view_flow',
        method: 'post',
        data
    })
}
// 查看补充说明
export const viewInfo = (data) => {
    return axios({
        url: '/admin/member/info/view_more_info',
        method: 'post',
        data
    })
}
//缴纳监控
export const payMintorList=(data)=>{
     return axios({
        url: '/admin/member/pay/view_listen',
        method: 'post',
        data
    })
}
// 显示监控数据
export const showTotal = (data) => {
    return axios({
        url: '/admin/member/annual/view_total',
        method: 'post',
        data
    })
}
// 基本信息
export const showBasic = (data) => {
    return axios({
        url: '/admin/member/annual/view_listen',
        method: 'post',
        data
    })
}
// 会员代表
export const showRep = (data) => {
    return axios({
        url: '/admin/member/annual/view_listen_rep',
        method: 'post',
        data
    })
}
/**
 * 会员服务
 */
// 查看参与者列表
export const activitySign = (data) => {
    return axios({
        url: '/api/activity/info/view_people',
        method: 'post',
        data
    })
}

export const activityView = (data) => {
    return axios({
        url: '/api/activity/info/view',
        method: 'post',
        data
    })
}

export const activityTable = (data) => {
    return axios({
        url: '/api/activity/info/table_data',
        method: 'post',
        data
    })
}

export const joinAdd = (data) => {
    return axios({
        url: '/api/activity/info/modify_people',
        method: 'post',
        data
    })
}

export const deleteEnroll = (data) => {
    return axios({
        url: '/api/activity/info/delete_people',
        method: 'post',
        data
    })
}

// 显示会员信息
export const serviceMember = (data) => {
    return axios({
        url: '/api/member/info/view_member',
        method: 'post',
        data
    })
}
// 显示公司基本信息
export const serviceComp = (data) => {
    return axios({
        url: '/api/member/info/view_company',
        method: 'post',
        data
    })
}
// 显示联系人基本信息
export const serviceContact = (params) => {
    return axios({
        url: '/api/member/info/contact/list',
        method: 'get',
        params
    })
}
// 显示会员代表
export const serviceRep = (data) => {
    return axios({
        url: '/api/member/info/rep/view',
        method: 'post',
        data
    })
}
// 股东
export const serviceShare = (params) => {
    return axios({
        url: '/api/member/info/shareholder/list',
        method: 'get',
        params
    })
}
// 高管
export const serviceSenior = (params) => {
    return axios({
        url: '/api/member/info/senior/list',
        method: 'get',
        params
    })
}
// 显示业务信息
export const serviceInfo = (params) => {
    return axios({
        url: '/api/member/info/business-info/view',
        method: 'get',
        params
    })
}

// 会员档案 变更记录
export const serviceChangeNote = (params) => {
    return axios({
        url: '/api/member/info/query_change_record',
        method: 'get',
        params
    })
}
// 会员档案 缴费记录
export const servicePayNote = (data) => {
    return axios({
        url: '/api/member/pay/query_pay_record',
        method: 'post',
        data
    })
}
// 会员档案 缴费记录
export const servicePayDetail = (data) => {
    return axios({
        url: '/api/member/pay/payDetail',
        method: 'post',
        data
    })
}

// 添加发票记录
export const addBill = (data) => {
    return axios({
        url: '/api/member/pay/add_notice',
        method: 'post',
        data
    })
}
//年费缴纳
export const yearPay=(data)=>{
     return axios({
        url: '/api/member/pay/payFee',
        method: 'post',
        data
    })
}
// 通知公告箱
export const noticeRead = (data) => {
    return axios({
        url: '/api/message/notice/read',
        method: 'post',
        data
    })
}

export const noticeTable = (data) => {
    return axios({
        url: '/api/message/notice/table_data',
        method: 'post',
        data
    })
}
// 系统消息箱
export const systemRead = (data) => {
    return axios({
        url: '/api/message/system/read',
        method: 'post',
        data
    })
}

export const systemTable = (data) => {
    return axios({
        url: '/api/message/system/table_data',
        method: 'post',
        data
    })

}
//会员管理
//联系人新增
export const linkManAdd = (data,url) => {
    return axios({
        url,
        method: 'post',
        data
    })


}
//股东新增
export const  shareholdersAdd=(data)=>{
      return axios({
        url: '/admin/member/info/add_shareholder',
        method: 'post',
        data
    })
}
//会员代表新增
export const saveMemberRepresentative=(data,url)=>{
      return axios({
        url,
        method: 'post',
        data
    })
}
//股东保存
export const saveShareholder=(data,url)=>{
        return axios({
        url,
        method: 'post',
        data
    })
}
//高管保存
export const saveSeniorExecutive=(data,url)=>{
        return axios({
        url,
        method: 'post',
        data
    })
}
//联系人设置默认
export const setDefaultLinkMan=(url)=>{
        return axios({
        url,
        method: 'put',

    })
}
//保存业务信息
export const saveBus=(data,url)=>{
        return axios({
        url,
        method: 'post',
        data
    })
}
//会员认定 联系人保存
export const linkManAddCommon=(data)=>{
      return axios({
        url:"/common/member/apply/contact/addOrUpdateBatch",
        method: 'post',
        data
    })
}
//会员认定 股东保存
 export const saveShareholderCommon=(data)=>{
      return axios({
        url:"/common/member/apply/shareholder/addOrUpdateBatch",
        method: 'post',
        data
    })
 }
 //会员认定 高管保存
  export const saveSeniorExecutiveCommon=(data)=>{
      return axios({
        url:"/common/member/apply/senior/addOrUpdateBatch",
        method: 'post',
        data
    })
 }
 //会员认定 高管列表
export function getSeniorExecutiveListCommon(){
      return axios({
        url:"/common/member/apply/senior/list",
        method: 'get',

    })
}
//会员认定 高管删除

export function delSeniorExecutiveListCommon(data){
      return axios({
        url:`/common/member/apply/senior/delete?id=${data.id}`,
        method: 'delete',


    })
}
  //会员认定 业务信息保存1
  export const saveBusCommon=(data)=>{
      return axios({
        url:"/common/member/apply/modify_business",
        method: 'post',
        data
    })
 }
 //会员认定 业务信息保存2
  export const saveBus_2_Common=(data)=>{
      return axios({
        url:"/common/member/apply/modify_business_two",
        method: 'post',
        data
    })
 }
 //会员认定 业务信息保存3
  export const saveBus_3_Common=(data)=>{
      return axios({
        url:"/common/member/apply/modify_business_three",
        method: 'post',
        data
    })
 }
  //会员认定 业务信息保存4
  export const saveBus_4_Common=(data)=>{
      return axios({
        url:"/common/member/apply/modify_business_four",
        method: 'post',
        data
    })
 }
 //会员认定 业务信息保存5
  export const saveBus_5_Common=(data)=>{
      return axios({
        url:"/common/member/apply/modify_business_five",
        method: 'post',
        data
    })
 }
  //会员认定 业务信息保存6
  export const saveBus_6_Common=(data)=>{
      return axios({
        url:"/common/member/apply/modify_business_six",
        method: 'post',
        data
    })
 }
 //会员认定 业务信息保存7
  export const saveBus_7_Common=(data)=>{
      return axios({
        url:"/common/member/apply/modify_business_seven",
        method: 'post',
        data
    })
 }
 //会员认定 业务信息保存8
  export const saveBus_8_Common=(data)=>{
      return axios({
        url:"/common/member/apply/modify_business_eight",
        method: 'post',
        data
    })
 }
 //会员认定 业务信息保存9
  export const saveBus_9_Common=(data)=>{
      return axios({
        url:"/common/member/apply/modify_business_nine",
        method: 'post',
        data
    })
 }
  //会员认定 业务信息保存10
  export const saveBus_10_Common=(data)=>{
      return axios({
        url:"/common/member/apply/modify_business_ten",
        method: 'post',
        data
    })
 }
  //会员认定 业务信息保存11
  export const saveBus_11_Common=(data)=>{
      return axios({
        url:"/common/member/apply/modify_business_eleven",
        method: 'post',
        data
    })
 }
 //会员认定 业务信息保存12
  export const saveBus_12_Common=(data)=>{
      return axios({
        url:"/common/member/apply/modify_business_twelve",
        method: 'post',
        data
    })
 }
  //会员认定 业务信息获取
  export const getBusListCommon=(data)=>{
      return axios({
        url:"/common/member/apply/qualification-checkbox/view",
        method:'get',


    })
 }
  //会员认定 业务信息删除
  export const deleteBusCommon=(data)=>{
      return axios({
        url:"/common/member/apply/shareholder/addOrUpdateBatch",
        method: 'post',
        data
    })
 }
 //会员认定 会员代表保存
 export const saveMemberRepresentativeCommon=(data)=>{
      return axios({
        url:"/common/member/apply/rep/addOrUpdate",
        method: 'post',
        data
    })
 }
 //会员认定 默认联系人设定
  export const setDefaultLinkManCommon=(data)=>{
      return axios({
        url:`/common/member/apply/contact/set-default?contactId=${data.contactId}`,
        method: 'put',

    })
 }
 //会员认定 获取联系人列表
export function getLinkManListCommon(){
      return axios({
        url:"/common/member/apply/contact/list",
        method: 'get',

    })
}
//会员认定 联系人删除
export function linkmanDeleteCommon(data){
      return axios({
        url:`/common/member/apply/contact/delete?contactId=${data.contactId}`,
        method: 'delete',


    })
}
//会员认定 股东列表获取
export function getShareholderCommon(){
     return axios({
        url:"/common/member/apply/shareholder/list",
        method: 'get',

    })
}
//会员认定 股东删除
export function delShareholderCommon(data){
     return axios({
        url:`/common/member/apply/shareholder/delete?id=${data.id}`,
        method: 'delete',

    })
}
// 会员认定  加载业务信息
export function loadBusinessInformationCommon(){
     return axios({
        url:"/common/member/apply/view_business_info",
        method: 'post',
        data:{}
    })
}
//会员认定  查询公司基本信息
export function getCompanyInfoCommon(){
     return axios({
        url:"/common/member/apply/company-info/view",
        method: 'post',
        data:{}

    })
}

////会员认定  查询会员代表
export function getRepCommon(){
     return axios({
        url:"/common/member/apply/rep/view",
        method: 'post',
        data:{}

    })

}
export function companyPwdChange(data){
  return axios({
    url:"/admin/member/company/reset",
    method: 'post',
    data

  })

}

//会员  联系人删除  api and admin
export function deleteLinkMan(url){
     return axios({
        url,
        method: 'delete',

    })
}
//会员  股东删除  api and admin
export function deleteShareholder(url){
     return axios({
        url,
        method: 'delete',

    })
}

//会员 高管删除  api and admin
export function deleteSeniorExecute(url){
     return axios({
        url,
        method: 'delete',

    })
}
 //会员 具备投资能力 api and admin
 export function getQualities(url,params){
     return axios({
            url,
            method:'get',
            params

      })
 }



//admin获取变更信息的类型   需要companyId
export function adminInfoChangeList(data){
    return axios({
       url:"/admin/workflow/get_ing_task_ref_module",
       method: 'post',
       data
   })
}
//common加载证件类型
export function loadLicenceTypeCommon(data){
    return axios({
       url:"/common/sys/dict/load_license_type",
       method: 'get',

   })
}

//退会申请
export function memberOut(data){
    return axios({
       url:"/api/member/leave/save",
       method: 'post',
       data
   })
}
//会员服务 年审listGET
export function yearApproval(){
    return axios({
       url:"/api/member/annual/query_list",
       method: 'get',

   })
}
//会员服务  年审提交
export function yearApprovalSubmit(params){
    return axios({
       url:"/api/member/annual/confirm",
       method: 'get',
       params
   })
}
export function yearCostConfirm(params){
  return axios({
    url:"/api/member/annual/confirm",
    method: 'get',
    params
  })
}
export function publishYearCostProject(params){
  return axios({
    url:"/admin/member/pay/publish",
    method: 'PUT',
    params
  })
}
export function yearCostProjectDown(params){
     return axios({
       url:"/admin/member/pay/down",
       method: 'put',
       params
   })
} 
// 会员管理 年费计算
export function yearCostAutoCalc(data){
     return axios({
       url:"/admin/member/pay/auto-calc",
       method: 'post',
       data
   })
}
//会员管理 新建年费回显
export function viewYearCost(){
     return axios({
       url:"/admin/member/pay/view_annual",
       method: 'get',
      
   })
}
//会员认定总的提交
export function memberApprovalSaveAll(data){
    return axios({
       url:"/api/member/info/save_all",
       method: 'post',
       data
   })
}
//api 工作流
export function workflowAPI(data){
    return axios({
       url:"/api/workflow/get_ing_task_ref_module",
       method: 'post',
       data
   })
}
//admin 工作流
export function workflowAdmin(data){
    return axios({
       url:"/admin/workflow/get_ing_task_ref_module",
       method: 'post',
       data
   })
}
//寄送
export function setSentStatus(params){
     return axios({
       url:"/admin/member/pay/set-status",
       method: 'put',
       params
    })
}
//会员认定加载会员认定书
export function queryMembership(data){
     return axios({
       url:"/api/member/company/file/rhsqh_load",
       method: 'post',
       data
    })
}
//管理员加载会员认定书
export function queryMembershipAdmin(data){
     return axios({
       url:`/admin/member/company/file/rhsqh_load?companyId=${data.companyId}`,
       method: 'post',
       data
    })
}

// 会员认定流程   /api/workflow/get_my_ing_member_check_task
export function getMemberProcess(data){
    return axios({
      url:`/api/workflow/get_my_ing_member_check_task`,
      method: 'post',
      data
   })
}

//会费缴纳   api/member/pay/payDues
export function payMemberDues(data){
    return axios({
      url:`/api/member/pay/payDues`,
      method: 'post',
      data
   })
}
//审批   /api/workflow/complete_task
export function memberCheckCost(data){
    return axios({
      url:`/api/workflow/complete_task`,
      method: 'post',
      data
   })
}
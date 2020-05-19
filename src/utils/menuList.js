
export const menuList = [
  {
    id: 1,
    name: "首页",
    icon: "el-icon-location",
    path: "/myHome/index",
    hasChild: false
  },
  {
    id: Math.random() * 99999,
    name: "审批中心",
    icon: "el-icon-c-scale-to-original",
    children: [{
      id: Math.random() * 99999,
      name: "审批管理",
      path: "/approval/manager",
    }, {
      id: Math.random() * 99999,
      name: "信息变更审批详情",
      path: "/approval/infoChange",
    }, {
      id: Math.random() * 99999,
      name: "信息变更审批查看",
      path: "/approval/infoChangeCK",
    }, {
      id: Math.random() * 99999,
      name: "信息变更（内部）审批详情",
      path: "/approval/innerChange",
    }, {
      id: Math.random() * 99999,
      name: "信息变更（内部）审批查看",
      path: "/approval/innerChangeCK",
    }, {
      id: Math.random() * 99999,
      name: "信息变更(年审)审批详情",
      path: "/approval/annualChange",
    }, {
      id: Math.random() * 99999,
      name: "信息变更(年审)审批查看",
      path: "/approval/annualChangeCK",
    }, {
      id: Math.random() * 99999,
      name: "会员代表变更审批详情",
      path: "/approval/memberChange",
    }, {
      id: Math.random() * 99999,
      name: "会员代表变更审批查看",
      path: "/approval/memberChangeCK",
    }, {
      id: Math.random() * 99999,
      name: "会员代表变更(内部)审批详情",
      path: "/approval/meInnerChange",
    }, {
      id: Math.random() * 99999,
      name: "会员代表变更(内部)审批查看",
      path: "/approval/meInnerChangeCK",
    }, {
      id: Math.random() * 99999,
      name: "会员代表变更(年审)审批详情",
      path: "/approval/meAnnualChange",
    }, {
      id: Math.random() * 99999,
      name: "会员代表变更(年审)审批查看",
      path: "/approval/meAnnualChangeCK",
    }, {
      id: Math.random() * 99999,
      name: "年费缴纳审批详情",
      path: "/approval/annualFee",
    }, {
      id: Math.random() * 99999,
      name: "年费缴纳审批查看",
      path: "/approval/annualFeeCK",
    }, {
      id: Math.random() * 99999,
      name: "活动审批详情",
      path: "/approval/activityAppro",
    }, {
      id: Math.random() * 99999,
      name: "活动审批查看",
      path: "/approval/activityApproCK",
    }, {
      id: Math.random() * 99999,
      name: "退会审批详情",
      path: "/approval/exitAppro",
    }, {
      id: Math.random() * 99999,
      name: "退会审批查看",
      path: "/approval/exitApproCK",
    }, {
      id: Math.random() * 99999,
      name: "超级管理员",
      path: "/approval/supManager",
    }, {
      id: Math.random() * 99999,
      name: "年费核对管理",
      path: "/approval/yearFee",
    },]
  },
  {
    id: Math.random() * 99999,
    name: "会员服务",
    icon: "el-icon-user-solid",
    children: [{
      id: Math.random() * 99999,
      name: "会员信息",
      path: "/member/memberInfo",
    }, {
      id: Math.random() * 99999,
      name: "变更记录",
      path: "/member/changeNote",
    }, {
      id: Math.random() * 99999,
      name: "审批查看",
      path: "/member/approCheck",
    }, {
      id: Math.random() * 99999,
      name: "缴费记录",
      path: "/member/payNote",
    }, {
      id: Math.random() * 99999,
      name: "缴费记录详情",
      path: "/member/payDetails",
    }, {
      id: Math.random() * 99999,
      name: "证书下载",
      path: "/member/paperDown",
    }, {
      id: Math.random() * 99999,
      name: "年审确认",
      path: "/member/annualConfirm",
    }, {
      id: Math.random() * 99999,
      name: "年费缴纳",
      path: "/member/annualPay",
    }, {
      id: Math.random() * 99999,
      name: "退会申请",
      path: "/member/exitOrg",
    }, {
      id: Math.random() * 99999,
      name: "活动报名",
      path: "/member/eventReg",
    }, {
      id: Math.random() * 99999,
      name: "通知公告",
      path: "/member/notice",
    }, {
      id: Math.random() * 99999,
      name: "系统消息",
      path: "/member/system",
    }]
  },
  {
    id: Math.random() * 99999,
    name: "会员信息",
    icon: "el-icon-user-solid",
    children: [{
      id: Math.random() * 99999,
      name: "会员认定申请",
      path: "/users/apply",
    }, {
      id: Math.random() * 99999,
      name: "审批进度",
      path: "/users/progressApply",
    }, {
      id: Math.random() * 99999,
      name: "会费缴纳",
      path: "/users/costInfo",
    }, {
      id: Math.random() * 99999,
      name: "会员信息",
      path: "/users/userMsg",
    }]
  },
  {
    id: Math.random() * 99999,
    name: "会员管理",
    icon: "el-icon-user-solid",
    children: [{
      id: Math.random() * 99999,
      name: "会员档案管理",
      path: "/member/archives",
    }, {
      id: Math.random() * 99999,
      name: "年审管理",
      path: "/member/annualReview",
    }, {
      id: Math.random() * 99999,
      name: "会员年费管理",
      path: "/member/yearCost",
    }, {
      id: Math.random() * 99999,
      name: "发票寄送管理",
      path: "/member/sendInvoice",
    }, {
      id: Math.random() * 99999,
      name: "会员组管理",
      path: "/member/memberGroup",
    }]
  },
  {
    id: Math.random() * 99999,
    name: "市场活动管理",
    icon: "el-icon-s-marketing",
    children: [{
      id: Math.random() * 99999,
      name: "活动管理",
      path: "/marketActive/activeList",
    }]
  },
  {
    id: Math.random() * 99999,
    name: "消息中心",
    icon: "el-icon-s-comment",
    children: [{
      id: Math.random() * 99999,
      name: "短信发送平台",
      path: "/newsCenter/newsList",
    }, {
      id: Math.random() * 99999,
      name: "邮件发送平台",
      path: "/newsCenter/mailList",
    }, {
      id: Math.random() * 99999,
      name: "系统消息发送平台",
      path: "/newsCenter/sysList",
    }, {
      id: Math.random() * 99999,
      name: "通知公告发送平台",
      path: "/newsCenter/noticeList",
    }, {
      id: Math.random() * 99999,
      name: "短信模板管理",
      path: "/newsCenter/newsTemplate",
    }, {
      id: Math.random() * 99999,
      name: "邮件模板管理",
      path: "/newsCenter/mailTemplate",
    }, {
      id: Math.random() * 99999,
      name: "系统消息模板管理",
      path: "/newsCenter/sysTemplate",
    }]
  },
  {
    id: Math.random() * 99999,
    name: "系统管理",
    icon: "el-icon-s-claim",
    children: [{
      id: Math.random() * 99999,
      name: "协会架构管理",
      path: "/system/framework",
    }, {
      id: Math.random() * 99999,
      name: "用户管理",
      path: "/system/user",
    }, {
      id: Math.random() * 99999,
      name: "权限管理",
      path: "/system/authority",
    }, {
      id: Math.random() * 99999,
      name: "角色管理",
      path: "/system/role",
    }, {
      id: Math.random() * 99999,
      name: "数据字典管理",
      path: "/system/dictionary",
    }]
  }/* ,
  {
    id: Math.random() * 99999,
    name: "电子签章",
    icon: "el-icon-s-claim",
    children: [{
      id: Math.random() * 99999,
      name: "iWebOffice",
      path: "/iWebOffice/iWebOffice",
    }, {
      id: Math.random() * 99999,
      name: "officeDemo",
      path: "/iWebOffice/officeDemo",
    }]
  } */
]

export default {
  menuList
}
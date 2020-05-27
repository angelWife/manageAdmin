import Vue from "vue";
import Router from "vue-router";
import Cookies from "js-cookie";
import Login from "@/views/login/index";
import loginMandatory from "@/views/login/loginMandatory";
import GetPassword from '@/views/login/getPassword'
import SetPassword from '@/views/login/setPassword'
import Register from '@/views/login/register'
import LoginSuccess from '@/views/login/success'
import NotFound from "@/views/Error/404";
import Home from "@/views/Home";
import Index from "@/views/myHome/index";
import userApply from '@/views/users/apply'
import progressApply from '@/views/users/progressApply';
import costInfo from '@/views/users/costInfo';
import userMsg from '@/views/users/userMsg';
import msgList from '@/views/users/msgList';
import approManage from '@/views/approval/approManage';
import approMember from '@/views/approval/approMember';
import infoChange from '@/views/approval/infoChange';
import infoChangeCK from '@/views/approval/infoChangeCK';
import innerChange from '@/views/approval/innerChange';
import innerChangeCK from '@/views/approval/innerChangeCK';
import annualChange from '@/views/approval/annualChange';
import annualChangeCK from '@/views/approval/annualChangeCK';
import memberChange from '@/views/approval/memberChange';
import memberChangeCK from '@/views/approval/memberChangeCK';
import meInnerChange from '@/views/approval/meInnerChange';
import meInnerChangeCK from '@/views/approval/meInnerChangeCK ';
import meAnnualChange from '@/views/approval/meAnnualChange';
import meAnnualChangeCK from '@/views/approval/meAnnualChangeCK';
import annualFee from '@/views/approval/annualFee';
import annualFeeCK from '@/views/approval/annualFeeCK';
import activityAppro from '@/views/approval/activityAppro';
import activityApproCK from '@/views/approval/activityApproCK';
import exitAppro from '@/views/approval/exitAppro';
import exitApproCK from '@/views/approval/exitApproCK';
import supManager from '@/views/approval/supManager';
import memberInfo from '@/views/member/memberInfo';
import changeNote from '@/views/member/changeNote';
import approCheck from '@/views/member/approCheck';
import payNote from '@/views/member/payNote';
import payDetails from '@/views/member/payDetails';
import flowChart from '@/views/approval/flowChart'

import paperDown from '@/views/member/paperDownload';
import annualConfirm from '@/views/member/annualConfirm';
import annualPay from '@/views/member/annualPay';
import exitOrg from '@/views/member/exitOrg';
import eventReg from '@/views/member/eventReg';
import eventPreview from '@/views/member/eventPreview';
import registerInfo from '@/views/member/registerInfo';
import Notice from '@/views/member/Notice';
import System from '@/views/member/System';
import NoticeContent from '@/views/member/NoticeContent';
import SysContent from '@/views/member/SysContent';

import memberArchives from '@/views/memberManage/archives';
import memberArchivesDetail from '@/views/memberManage/archivesDetail';
import memberPaper from '@/views/memberManage/memberPaper';
import alterNote from '@/views/memberManage/alterNote';
import alterDetail from '@/views/memberManage/alterDetail';
import useNote from '@/views/memberManage/useNote';
import visitNote from '@/views/memberManage/visitNote';


import memberAnnualReview from '@/views/memberManage/annualReview';
import newAnnual from '@/views/memberManage/newAnnual';
import editAnnual from '@/views/memberManage/editAnnual';
import checkAnnual from '@/views/memberManage/checkAnnual';
import annualMonitor from '@/views/memberManage/annualMonitor';

import memberYearCost from '@/views/memberManage/yearCost';
import annualCalcu from '@/views/memberManage/annualCalcu';
import mintorPay from '@/views/memberManage/mintorPay';

import memberSendInvoice from '@/views/memberManage/sendInvoice';
import memberGroup from '@/views/memberManage/memberGroup';
import groupManage from '@/views/memberManage/groupManage';

import activeList from '@/views/marketActive/activeList';
import activeAdd from '@/views/marketActive/activeAdd';
import activeEdit from '@/views/marketActive/activeEdit';
import confirmSign from '@/views/marketActive/confirmSign';
import newsList from '@/views/newsCenter/newsList';
import newsAdd from '@/views/newsCenter/newsAdd';
import newsEdit from '@/views/newsCenter/newsEdit';

import newsTemplate from '@/views/newsCenter/newsTemplate';
import msgEdit from '@/views/newsCenter/msgEdit';
import mailList from '@/views/newsCenter/mailList';
import mailAdd from '@/views/newsCenter/mailAdd';
import mailEdit from '@/views/newsCenter/mailEdit';

import mailTemplate from '@/views/newsCenter/mailTemplate';
import mailTemEdit from '@/views/newsCenter/mailTemEdit';
import sysList from '@/views/newsCenter/sysList';
import sysAdd from '@/views/newsCenter/sysAdd';
import sysTemplate from '@/views/newsCenter/sysTemplate';
import sysTemEdit from '@/views/newsCenter/sysTemEdit';
import noticeList from '@/views/newsCenter/noticeList';
import noticeAdd from '@/views/newsCenter/noticeAdd';
import addTemplate from '@/views/newsCenter/addTemplate';
import sysFramework from '@/views/system/framework';
import sysAuthority from '@/views/system/authority';
import sysRole from '@/views/system/role';
import sysUser from '@/views/system/user';
import sysDictionary from '@/views/system/dictionary';

import yearFee from '@/views/approval/yearFee';
import iWebOffice from '@/views/iWebOffice/iWebOffice';
import officeDemo from '@/views/iWebOffice/officeDemo';
import signature from '@/views/iWebOffice/signature';

// import Generator from "@/views/Generator/Generator";
import api from "@/http/api";
import store from "@/store";
// component:resolve=>require(["../components/login.vue"],resolve)
//iweboffice

Vue.use(Router);

const router = new Router({
  routes: [
    { // 首页
      path: "/",
      name: "首页",
      component: Home,
      iconCls: 'fa fa-address-card',
      leaf: true, //只有一个节点
      children: [{
        path: '/myHome/index',
        component: Index,
        name: '首页',
        iconCls: 'el-icon-star-on'
      }]
    },
    {
      path: "/",
      name: "会员信息",
      component: Home,
      iconCls: 'el-icon-s-flag',
      leaf: false, //只有一个节点
      children: [
        {
          path: "/users/apply",
          name: "会员认定申请",
          component: userApply
        },
        {
          path: "/users/progressApply",
          name: "审批进度",
          component: progressApply
        },
        {
          path: "/users/costInfo",
          name: "会费缴纳",
          component: costInfo
        },
        {
          path: "/users/userMsg",
          name: "会员信息",
          component: userMsg
        },
        {
          path: "/users/msgList",
          name: "信息列表",
          component: msgList
        },
      ]
    },
    // 审批中心
    {
      path: "/",
      name: "审批中心",
      component: Home,
      iconCls: 'el-icon-s-flag',
      leaf: false, //只有一个节点
      children: [
        {
          path: "/approval/manager",
          name: "审批管理",
          component: approManage
        }, {
          path: "/approval/memberDetails",
          name: "会员认定审批详情",
          component: approMember
        }, {
          path: "/approval/infoChange",
          name: "信息变更审批详情",
          component: infoChange
        }, {
          path: "/approval/infoChangeCK",
          name: "信息变更审批查看",
          component: infoChangeCK
        }, {
          path: "/approval/innerChange",
          name: "信息变更(内部)审批详情",
          component: innerChange
        }, {
          path: "/approval/innerChangeCK",
          name: "信息变更(内部)查看",
          component: innerChangeCK
        }, {
          path: "/approval/annualChange",
          name: "信息变更(年审)审批详情",
          component: annualChange
        }, {
          path: "/approval/annualChangeCK",
          name: "信息变更(年审)审批查看",
          component: annualChangeCK
        }, {
          path: "/approval/memberChange",
          name: "会员代表变更审批详情",
          component: memberChange
        }, {
          path: "/approval/memberChangeCK",
          name: "会员代表变更审批详情",
          component: memberChangeCK
        }, {
          path: "approval/meInnerChange",
          name: "会员代表变更(内部)审批详情",
          component: meInnerChange
        }, {
          path: "approval/meInnerChangeCK",
          name: "会员代表变更(内部)审批查看",
          component: meInnerChangeCK
        }, {
          path: "approval/meAnnualChange",
          name: "会员代表变更(年审)审批详情",
          component: meAnnualChange
        }, {
          path: "approval/meAnnualChangeCK",
          name: "会员代表变更(年审)审批查看",
          component: meAnnualChangeCK
        }, {
          path: "approval/annualFee",
          name: "年费缴纳审批详情",
          component: annualFee
        }, {
          path: "approval/annualFeeCK",
          name: "年费缴纳审批查看",
          component: annualFeeCK
        }, {
          path: "approval/activityAppro",
          name: "活动审批详情",
          component: activityAppro
        }, {
          path: "approval/activityApproCK",
          name: "活动审批查看",
          component: activityApproCK
        }, {
          path: "approval/exitAppro",
          name: "退会审批详情",
          component: exitAppro
        }, {
          path: "approval/exitApproCK",
          name: "退会审批查看",
          component: exitApproCK
        }, {
          path: "approval/supManager",
          name: "超级管理员",
          component: supManager
        }, {
          path: "/approval/yearFee",
          name: "年费核对管理",
          component: yearFee
        }, {
          path: "/approval/flowChart",
          name: "流程图",
          component: flowChart
        }
      ]
    },
    // 会员服务
    {
      path: "/",
      name: "会员服务",
      component: Home,
      iconCls: 'el-icon-s-flag',
      leaf: false, //只有一个节点
      children: [
        {
          path: "/member/memberInfo",
          name: "会员信息",
          component: memberInfo
        }, {
          path: "/member/changeNote",
          name: "变更记录",
          component: changeNote
        }, {
          path: "/member/approCheck",
          name: "审批查看",
          component: approCheck
        }, {
          path: "/member/payNote",
          name: "缴费记录",
          component: payNote
        },
        {
          path: "/member/payDetails",
          name: "缴费记录详情",
          component: payDetails
        },
        {
          path: "/member/paperDown",
          name: "证书下载",
          component: paperDown
        },
        {
          path: "/member/annualConfirm",
          name: "年审确认",
          component: annualConfirm
        }, {
          path: "/member/annualPay",
          name: "年费缴纳",
          component: annualPay
        }, {
          path: "/member/exitOrg",
          name: "退会申请",
          component: exitOrg
        }, {
          path: "/member/eventReg",
          name: "活动报名",
          component: eventReg
        }, {
          path: "/member/eventPreview",
          name: "活动信息预览",
          component: eventPreview
        }, {
          path: "/member/registerInfo",
          name: "活动报名",
          component: registerInfo,
          props: (route) => ({ actType: route.query.actType })
        }, {
          path: "/member/notice",
          name: "通知公告箱",
          component: Notice,
        }, {
          path: "/member/NoticeContent",
          name: "通知公告详情",
          component: NoticeContent,
        }, {
          path: "/member/system",
          name: "系统消息箱",
          component: System,
        }, {
          path: "/member/SysContent",
          name: "系统消息详情",
          component: SysContent,
        },
      ]
    },
    // 会员管理
    {
      path: "/",
      name: "会员管理",
      component: Home,
      iconCls: 'el-icon-s-flag',
      leaf: false, //只有一个节点
      children: [
        {
          path: "/member/archives",
          name: "会员档案管理",
          component: memberArchives
        },
        {
          path: "/member/archivesDetail",
          name: "会员档案详情",
          component: memberArchivesDetail,
        },
        {
          path: "/member/memberPaper",
          name: "会员档案详情",
          component: memberPaper
        },
        {
          path: "/member/alterNote",
          name: "会员档案详情",
          component: alterNote
        },
        {
          path: "/member/alterDetail",
          name: "会员档案详情",
          component: alterDetail
        },
        {
          path: "/member/useNote",
          name: "会员档案详情",
          component: useNote
        },
        {
          path: "/member/visitNote",
          name: "会员档案详情",
          component: visitNote,
        },
        {
          path: "/member/annualReview",
          name: "年审管理",
          component: memberAnnualReview
        },
        {
          path: "/member/newAnnual",
          name: "新建年审",
          component: newAnnual,
        },
        {
          path: "/member/editAnnual",
          name: "编辑年审",
          component: editAnnual
        },
        {
          path: "/member/checkAnnual",
          name: "查看年审",
          component: checkAnnual
        },
        {
          path: "/member/annualMonitor",
          name: "年审监控",
          component: annualMonitor
        },
        {
          path: "/member/yearCost",
          name: "会员年费管理",
          component: memberYearCost
        },
        {
          path: "/member/annualCalcu",
          name: "年费计算",
          component: annualCalcu
        },
        {
          path: "/member/mintorPay",
          name: "缴纳监控",
          component: mintorPay
        },
        {
          path: "/member/sendInvoice",
          name: "发票寄送管理",
          component: memberSendInvoice
        },
        {
          path: "/member/memberGroup",
          name: "会员组管理",
          component: memberGroup
        },
        {
          path: "/member/groupManage",
          name: "会员组配置",
          component: groupManage,
          props: (route) => ({ id: Number(route.query.groupid) })
        }
      ]
    },
    //市场活动管理
    {
      path: "/",
      name: "市场活动管理",
      component: Home,
      iconCls: 'el-icon-s-flag',
      leaf: false, //只有一个节点
      children: [
        {
          path: "/marketActive/activeList",
          name: "活动管理",
          component: activeList
        },
        {
          path: "/marketActive/activeAdd",
          name: "新建活动",
          component: activeAdd
        },
        {
          path: "/marketActive/activeEdit",
          name: "编辑活动",
          component: activeEdit
        },
        {
          path: "/marketActive/confirmSign",
          name: "报名确认",
          component: confirmSign
        },
      ]
    },
    //消息中心
    {
      path: "/",
      name: "消息中心",
      component: Home,
      iconCls: 'el-icon-s-flag',
      leaf: false, //只有一个节点
      children: [
        {
          path: "/newsCenter/newsList",
          name: "短信发送平台",
          component: newsList
        },
        {
          path: "/newsCenter/newsAdd",
          name: "新增短信发送任务",
          component: newsAdd
        },
        {
          path: "/newsCenter/newsEdit",
          name: "编辑短信发送任务",
          component: newsEdit
        },
        {
          path: "/newsCenter/newsTemplate",
          name: "短信模板管理",
          component: newsTemplate
        },
        {
          path: "/newsCenter/msgEdit",
          name: "短信模板编辑",
          component: msgEdit
        },
        {
          path: "/newsCenter/mailList",
          name: "邮件发送平台",
          component: mailList
        },
        {
          path: "/newsCenter/mailAdd",
          name: "新增邮件发送任务",
          component: mailAdd
        },
        {
          path: "/newsCenter/mailEdit",
          name: "编辑邮件发送任务",
          component: mailEdit
        },
        {
          path: "/newsCenter/mailTemplate",
          name: "邮件模板管理",
          component: mailTemplate
        },
        {
          path: "/newsCenter/mailTemEdit",
          name: "邮件模板编辑",
          component: mailTemEdit
        },
        {
          path: "/newsCenter/sysList",
          name: "系统消息发送平台",
          component: sysList
        },
        {
          path: "/newsCenter/sysAdd",
          name: "新增系统消息发送任务",
          component: sysAdd
        },
        {
          path: "/newsCenter/sysTemplate",
          name: "系统消息模板管理",
          component: sysTemplate
        },
        {
          path: "/newsCenter/sysTemEdit",
          name: "系统消息模板编辑",
          component: sysTemEdit
        },
        {
          path: "/newsCenter/noticeList",
          name: "通知公告发送平台",
          component: noticeList
        },
        {
          path: "/newsCenter/noticeAdd",
          name: "新增通知公告发送任务",
          component: noticeAdd
        },
        {
          path: "/newsCenter/addTemplate",
          name: "模板编辑",
          component: addTemplate
        },
      ]
    },
    //市场活动管理
    {
      path: "/",
      name: "系统管理",
      component: Home,
      iconCls: 'el-icon-s-flag',
      leaf: false, //只有一个节点
      children: [
        {
          path: "/system/framework",
          name: "协会架构管理",
          component: sysFramework
        },
        {
          path: "/system/authority",
          name: "权限管理",
          component: sysAuthority
        },
        {
          path: "/system/role",
          name: "角色管理",
          component: sysRole
        },
        {
          path: "/system/user",
          name: "用户管理",
          component: sysUser
        },
        {
          path: "/system/dictionary",
          name: "数据字典管理",
          component: sysDictionary
        },
      ]
    },//iweboffice

    { // 登录 注册 重置密码
      path: "/login/index",
      name: "登录",
      component: Login
    },
    {
      path: "/login/loginMandatory",
      name: "强制登录",
      component: loginMandatory
    },
    {
      path: "/login/getPassword",
      name: "GetPassword",
      component: GetPassword
    },
    {
      path: "/login/setPassword",
      name: "SetPassword",
      component: SetPassword
    },
    {
      path: "/login/register",
      name: "Register",
      component: Register
    },
    {
      path: "/login/success",
      name: "LoginSuccess",
      component: LoginSuccess
    },
    // {
    //   path: "/iWebOffice/iWebOffice",
    //   name: "iWebOffice",
    //   component: iWebOffice
    // },
    // {
    //   path: "/iWebOffice/officeDemo",
    //   name: "officeDemo",
    //   component: officeDemo
    // },
    {
      path: "/iWebOffice/signature",
      name: 'Signature',
      component: signature
    }
  ],
  base: '/',
  mode: "hash",
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
});


// router.beforeEach((to, from, next) => {
//   // 登录界面登录成功之后，会把用户信息保存在会话
//   // 存在时间为会话生命周期，页面关闭即失效。
//   let token = Cookies.get('token')
//   let userName = sessionStorage.getItem('user')
//   if(token) {
//     if (to.path === '/login/index') {
//       next({ path: '/' })
//     }else{
//       addDynamicMenuAndRoutes(userName, to, from)
//       next()
//     }
//   }else{
//     next({ path: '/login/index' })
//   }
// })

/**
 * 加载动态菜单和路由
 */
function addDynamicMenuAndRoutes(userName, to, from) {
  // 处理IFrame嵌套页面
  handleIFrameUrl(to.path);
  if (store.state.app.menuRouteLoaded) {
    console.log("动态菜单和路由已经存在.");
    return;
  }
  api.menu
    .findNavTree({
      userName: userName
    })
    .then(res => {
      // 添加动态路由
      let dynamicRoutes = addDynamicRoutes(res.data);
      // 处理静态组件绑定路由
      handleStaticComponent(router, dynamicRoutes);
      router.addRoutes(router.options.routes);
      // 保存加载状态
      store.commit("menuRouteLoaded", true);
      // 保存菜单树
      store.commit("setNavTree", res.data);
    })
    .then(res => {
      api.user.findPermissions({
        name: userName
      }).then(res => {
        // 保存用户权限标识集合
        store.commit("setPerms", res.data);
      });
    })
    .catch(function (res) { });
}

/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
function handleStaticComponent(router, dynamicRoutes) {
  for (let j = 0; j < dynamicRoutes.length; j++) {
    if (dynamicRoutes[j].name == "代码生成") {
      dynamicRoutes[j].component = Generator;
      break;
    }
  }
  router.options.routes[0].children = router.options.routes[0].children.concat(
    dynamicRoutes
  );
}

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path;
  let length = store.state.iframe.iframeUrls.length;
  for (let i = 0; i < length; i++) {
    let iframe = store.state.iframe.iframeUrls[i];
    if (path != null && path.endsWith(iframe.path)) {
      url = iframe.url;
      store.commit("setIFrameUrl", url);
      break;
    }
  }
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
// function addDynamicRoutes(menuList = [], routes = []) {
//   var temp = [];
//   for (var i = 0; i < menuList.length; i++) {
//     if (menuList[i].children && menuList[i].children.length >= 1) {
//       temp = temp.concat(menuList[i].children);
//     } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
//       menuList[i].url = menuList[i].url.replace(/^\//, "");
//       // 创建路由配置
//       var route = {
//         path: menuList[i].url,
//         component: null,
//         name: menuList[i].name,
//         meta: {
//           icon: menuList[i].icon,
//           index: menuList[i].id
//         }
//       };
//       let path = getIFramePath(menuList[i].url);
//       if (path) {
//         // 如果是嵌套页面, 通过iframe展示
//         route["path"] = path;
//         route["component"] = resolve =>
//           require([`@/views/IFrame/IFrame`], resolve);
//         // 存储嵌套页面路由路径和访问URL
//         let url = getIFrameUrl(menuList[i].url);
//         let iFrameUrl = {
//           path: path,
//           url: url
//         };
//         store.commit("addIFrameUrl", iFrameUrl);
//       } else {
//         try {
//           // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
//           // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
//           let array = menuList[i].url.split("/");
//           let url = "";
//           for (let i = 0; i < array.length; i++) {
//             url +=
//               array[i].substring(0, 1).toUpperCase() +
//               array[i].substring(1) +
//               "/";
//           }
//           url = url.substring(0, url.length - 1);
//           route["component"] = resolve => require([`@/views/${url}`], resolve);
//         } catch (e) {}
//       }
//       routes.push(route);
//     }
//   }
//   if (temp.length >= 1) {
//     addDynamicRoutes(temp, routes);
//   } else {
//     console.log("动态路由加载...");
//     console.log(routes);
//     console.log("动态路由加载完成.");
//   }
//   return routes;
// }

export default router;

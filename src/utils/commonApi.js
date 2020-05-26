import Vue from 'vue';
import { Message } from 'element-ui';
import { pubParam } from './common'
import axios from '../http/axios'
const vm = new Vue()


export function warnMES(message) {
    Message({
        message: message,
        type: "warning"
    });
}
export function tipMES(message) {
    Message({
        message: message,
    });
}
export function successMES(message) {
    Message({
        message: message,
        type: "success"
    });
}
/**公共接口
 *
 * 会员信息
*/

// 会员信息
export async function apiBasicMember(funObj, param) {
    let obj = {};
    await vm.$api.member[funObj](param).then(res => {
        if (res.success) {
            obj = res.data;
        } else {
            // warnMES(res.message);
        }
    }).catch(err => {
        console.error(err)
    })
    return obj;
}


// 公共字典
export async function apiDic(funObj, param) {
    let arr = [];
    await vm.$api.dict[funObj](param).then(res => {
        if (res.success) {
            arr.push(...res.data)
        } else {
            // warnMES(res.message);
        }
    }).catch(err => {
        console.error(err)
    })
    return arr;
}

// 市场活动
export async function apiAct(funObj, param) {
    let obj = {};
    await vm.$api.active[funObj](param).then(res => {
        if (res.success) {
            if (isNaN(res.data)) {
                obj = { ...res.data }
            } else {
                obj = res.data
            }

        } else {
            // warnMES(res.message);
        }
    }).catch(err => {
        console.error(err)
    })
    console.log("promise返回数据", obj);
    return obj;
}

// 公共展示数据
export async function apiShow(apiObj, funObj, param) {
    let obj = {};
    await vm.$api[apiObj][funObj](param).then(res => {
        if (res.success) {
            if (Object.prototype.toString.call(res.data) === '[object Array]' && res.data.indexOf('rows') > -1) {
                obj = { ...res.data }
            } else {
                obj = res.data
            }
        } else {
            // warnMES(res.message);
        }
    }).catch(err => {
        console.error(err)
    })
    console.log("promise返回数据", obj);
    return obj;
}


export function backPage(data) {
    return {
        total: data.total,
        pageSize: data.pageSize,
        currentPage: data.pageIndexCurrent
    };
}
// 有页数 返回
export function hasPage(param) {
    if (!!param) {
        return {
            pageIndex: param,
            pageSize: pubParam.page.pageSize
        };
    } else {
        return pubParam.page;
    }
}
/**
 * 
 * @param select 
 */
export function apiChose(funObj, arr) {
    vm.$api.dict[funObj]().then(res => {
        if (res.success) {
            arr.length = 0
            arr.push(...res.data);
        } else {
            // warnMES(res.message);
        }
    }).catch(err => {
        console.error(err)
    })
}


// 删除
export function apiOperate(apiObj, funObj, param, callback, mes) {
    vm.$api[apiObj][funObj](param).then(res => {
        if (res.success) {
            tipMES(mes);
            if (callback) { callback() };
        } else {
            // warnMES(res.message);
        }
    }).catch(err => {
        console.error(err)
    })
}
// 公共推送消息
export function publicMsg(upObj, id, type, remind, platform, apiFun) {
    let conditon = {}
    if (remind) {
        conditon = {
            companyIdList: upObj.companyIdList
                ? upObj.companyIdList
                : [],
            flagMessageRemind: upObj.flagMessageRemind
                ? upObj.flagMessageRemind
                : 2,
            flagEmailRemind: upObj.flagEmailRemind
                ? upObj.flagEmailRemind
                : 2,
            groupIdList: upObj.groupIdList
                ? upObj.groupIdList
                : [],
        }
    } else {
        conditon = {
            companyIdList: upObj.companyIdList
                ? upObj.companyIdList
                : [],
            groupIdList: upObj.groupIdList
                ? upObj.groupIdList
                : [],
        }
    }
    if (platform == 'sms' && upObj.mobileNumList.length > 0) {
        conditon = {
            mobileNumList: upObj.mobileNumList
        }
    }
    if (platform == 'mail' && upObj.emailAddressList.length > 0) {
        conditon = {
            emailAddressList: upObj.emailAddressList
        }
    }
    vm.$api.member
        .publicMsg({
            ...conditon,
            typeId: id,
            type: type
            // (1, "活动) (2, "年审") (3,"系统消息") (4,"通知公告") (5,"邮件发送") (6,"短信发送")
        })
        .then(res => {
            if (res.success) {
                /*  publishMsg(id, "提交成功", apiFun) */
            } else {
                // warnMES(res.message);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// 发布消息
export function publishMsg(id, message, apiFun) {
    vm.$api.message[apiFun]({
        messageId: id,
        publishType: message == "提交成功" ? 2 : 1
        // 2为提交存入数据库  1为列表点击发布出去
    }).then((res) => {
        if (res.success) {
            successMES(message);
        } else {
            // warnMES(res.message);
        }
    }).catch(error => {
        console.log(error);
    });
}
export function saveCompanyBasicInfo(data, url) {
    return axios({
        url,
        method: 'post',
        data
    })
}
//会员认定 公司信息保存
export function saveCompanyBasicInfoCommon(data) {
    return axios({
        url: "/common/member/apply/company-info/add",
        method: 'post',
        data
    })
}

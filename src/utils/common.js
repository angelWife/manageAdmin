import Vue from 'vue';
import { Message } from 'element-ui';
import { format } from "./datetime";

let vm = new Vue()

export function warnMES(message) {
    Message({
        message: message,
        type: "warning"
    });
}

export function successMES(message) {
    Message({
        message: message,
        type: "success"
    });
}

export function tipMES(message) {
    Message({
        message: message,
    });
}
// 公共方法
export function mapTime(data, time1, time2) {
    let lastdata = [];
    data.rows.map(v => {
        v[time1] = v[time1] ? format(v[time1]) : "-";
        v[time2] = v[time2] ? format(v[time2]) : "-";
        lastdata.push(v);
    });
    return lastdata;
}
export function dataTime(data, time) {
    let lastdata = [];
    data.map(v => {
        v[time] = v[time] ? format(v[time]) : "-";
        lastdata.push(v);
    });
    return lastdata;
}
// 公共分页data
export let pageFive = {
    total: 0,
    pageSize: 5,
    currentPage: 1
}
export let pageTen = {
    total: 0,
    pageSize: 10,
    currentPage: 1
}
// 公共上传参数
export let pubParam = {
    pageDialog: {
        pageIndex: 1,
        pageSize: 5,
    },
    page: {
        pageIndex: 1,
        pageSize: 6,
    }
}
/**公共接口 
 * 状态  公共推送
*/

// 机构类型
export function apiSelect(param, arr) {
    vm.$api.dict.sysType(param).then(res => {
        if (res.success) {
            arr.length = 0
            arr.push(...res.data);
        } else {
            warnMES(res.message);
        }
    }).catch(err => {
        console.error(err)
    })
}
// 会员状态
export function apiMemberStatus(arr) {
    vm.$api.dict.memberStatusList().then(res => {
        if (res.success) {
            arr.length = 0
            arr.push(...res.data);
        } else {
            warnMES(res.message);
        }
    }).catch(err => {
        console.error(err)
    })
}
// 发布状态
export function apiPublishStatus(arr) {
    vm.$api.dict.publishStatusList().then(res => {
        if (res.success) {
            arr.length = 0
            arr.push(...res.data);
        } else {
            warnMES(res.message);
        }
    }).catch(err => {
        console.error(err)
    })
}

// 公共查询type
export function selectType(val, list) {
    if (val == "") return "";
    let type = "";
    list.forEach(v => {
        if (v.dictVal == val) {
            type = v.dictKey;
        }
    });
    return type;
}
export function selectVal(val, list) {
    if (val == "") return "";
    let type = "";
    list.forEach(v => {
        if (v.val == val) {
            type = v.key;
        }
    });
    return type;
}
// 时间毫秒数获取
export function getDateTime(time) {
    if (time) {
        return new Date(time).getTime()
    } else {
        return ''
    }
}
// 是否上市转换
export function flagList(str) {
    if (str == "yes") {
        return 1
    }
    if (str == "no") {
        return 2
    }
    if (str == "") {
        return ''
    }
}
// 数组对象去重
export function deleteDuplic(arr, key) {
    const result = [];
    const obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i][key]]) {
            result.push(arr[i]);
            obj[arr[i][key]] = true;
        }
    }
    return result;
}
// 字符串首字母大写
export function firstUpperCase(str) {
    let arr = str.split(' ');
    let uppserCase = ([first, ...rest]) => first.toUpperCase() + rest.join('');
    let result = '';
    arr.forEach((val) => {
        result += uppserCase(val) + ' ';
    })
    return result;
}

// 查询接口 + 分页 通用 响应返回
export function queryResp(queryData, page, resdata, time1, time2) {
    let mapData = [];
    if (time1 && time2) {
        mapData = mapTime(resdata, time1, time2)
        queryData.length = 0;
        queryData.push(...mapData)
    } else {
        queryData.length = 0;
        queryData.push(...resdata.rows)
    }
    // console.log('res', queryData);
    if (page) {
        page['total'] = resdata.total;
        page['pageSize'] = resdata.pageSize;
        page['currentPage'] = resdata.pageIndexCurrent;
    }

}

//获取相关部门
export function comDepartmentList(arr) {
    vm.$api.system.departmentList().then(res => {
        if (res.success) {
            arr.length = 0
            arr.push(...res.data);
        } else {
            warnMES(res.message);
        }
    }).catch(err => {
        console.error(err)
    })
}
//获取相关角色
export function comUserList(arr) {
    vm.$api.system.getSelectUserList().then(res => {
        if (res.success) {
            arr.length = 0
            arr.push(...res.data);
        } else {
            warnMES(res.message);
        }
    }).catch(err => {
        console.error(err)
    })
}

//图片获取地址
export function setImgUrl(url) {
    if(url.indexOf("http")>=0){
        return url;
    }else{
        return `http://47.97.18.42/zgtfintech_upload${url}`
    }
}
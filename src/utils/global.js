/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

// 后台管理系统服务器地址
export const baseUrl = 'http://192.168.31.60:7777'   //'http://47.97.18.42:7778' http://192.168.31.72:7778 http://192.168.31.73:7778 
// 系统数据备份还原服务器地址
export const backupBaseUrl = 'http://localhost:8002'
const commonFileUploadUrl = "/common/file/upload"
export default {
    baseUrl,
    backupBaseUrl,
    commonFileUploadUrl
}

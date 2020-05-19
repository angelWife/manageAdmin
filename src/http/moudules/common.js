import axios from '../axios'
import Cookies from "js-cookie";
/* 
 *
 */
export const uploadFile = (data) => {
    return axios({
        url: '/common/file/upload',
        method: 'post',
        data
    })
}
//退会申请书
export const uploadBackFile = (data) => {
  return axios({
      url: '/api/member/leave/upload',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'channel':'Management',
        'token':Cookies.get('token'),
       
      }
  })
}
//会员文件上传
export const memberUploadFile = (data) => {
  return axios({
      url: '/common/file/upload',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'channel':'Management',
        'token':Cookies.get('token'),
       
      }
  })
}
//文件下载
export function formSubmit(url,data){
     return axios({
      url,
      method: "post",
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
//会员文件模板下载
export const memberDownloadTemplate = (url,data) => {
  return axios({
      url,
      method: "get",
      data,
      responseType: "blob",
   });
}

export function blobDownloadFile(rep,fileName){
  let name='';
   if(rep.headers["content-disposition"]){
        let regex = /"([^"]*)"/g;
      let currentResult;
      let results = [];
      let strValue=rep.headers["content-disposition"].split('; ')[1];
      while ((currentResult = regex.exec(strValue)) !== null) {
          results.push(currentResult[1]);
      }
           name=results[0];
           if(name==undefined){
              name=strValue.split('=')[1];
           }
        
   }else{
      name= fileName;
   }
   
     let fileReader = new FileReader();
     fileReader.onload = function() {
      try {
         let jsonData = JSON.parse(this.result);
         if (jsonData.code==200 && !jsonData.data) {
             Message.error('暂无数据导出');
        
          }else{
            
             Message.error(jsonData.info || '暂无数据导出'); 
          }
      } catch (err) {
        
          let fileDownload = require("js-file-download");
        fileDownload(rep.data, name);
     }
   }
    fileReader.readAsText(rep.data);
} 
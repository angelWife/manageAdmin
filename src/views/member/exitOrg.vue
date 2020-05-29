<template>
  <div class="container">
    <div class="suggest">
      <div class="title">说明</div>
      <div
        class="content"
      >非常感谢您过去对协会工作的支持，根据协会流程要求，请下载并填写退会申请书，经由协会审核通过后，您的会员状态将会变为退会状态，保留会员基本信息与账号，同时，退会会员仍能与普通注册用户一样参加协会举办的活动。</div>
    </div>
    <div style="height:40px">
      <div :span="2" class="text">退会申请书：</div>
      <div :span="24" class="tt-box">
        <el-upload
          class="upload-demo"
          :multiple="false"
          :action="uploadUrl"
          :http-request="uploadFile"
          :on-remove="removeFile"
          accept=".doc, .docx"
          :on-preview='downLoadSqs'
          :file-list="fileList"
          :limit="1">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>

        <span class="down" style="cursor:pointer" @click.prevent="downLoadTemplate">退会申请书模板下载</span>
      </div>
    </div>

    <div class="btn-box">
      <el-button :disabled="Apply">取消</el-button>
      <el-button :disabled="Apply" type="primary" @click="sureSubmit">提交</el-button>
      <span style="color:red" v-if="Apply">您已经提交过退回申请，请耐心等待协会的审批结果</span>
    </div>
  </div>
</template>
<script>
import global from '@/utils/global'
import Cookies from "js-cookie";
import { successMES,warnMES} from "../../utils/commonApi";
 import { memberDownloadTemplate,blobDownloadFile } from "./../../http/moudules/common"
export default {
  data() {
    return {
      Apply: false, // 是否提交申请
      filePath:'',
      uploadUrl:global.baseUrl+'/api/member/leave/upload',
      fileList:['/api/member/leave/upload']
    };
  },
  mounted() {
    this.getMemberStatus()
  },
  methods: {
    getMemberStatus(){
      this.$api.role.getMemberStatus().then(res=>{
        if(res.success){

        }
      })
    },
    uploadFile(obj){
      if( Math.floor( obj.file.size/(1024*1024) ) > 10 ){
          warnMES('最多上传10M')
          return
      }
      let formData = new FormData();
      formData.append('file',obj.file);
      this.$api.common.uploadBackFile(formData).then((res=>{
           if(res && res.code=='200' && res.data){
                successMES('上传成功');
                this.filePath=res.data
                console.log(res);
           }
      })).catch(error=>{

      })
    },
    removeFile(){
       this.filePath='';
    },
    downLoadTemplate(){
            memberDownloadTemplate('/common/file/templet/thsqs',{type:'download'}).then(rep=>{
               blobDownloadFile(rep)
            })
    },
    downLoadSqs(){
      window.location.href= this.filePath.fullPath
    },

    getFilePath(response, file, fileList){
      console.log(response)
    },
    sureSubmit(){
       if(!this.filePath){
           warnMES("请选择文件");
           return
       }
       this.$api.member.memberOut({filePath:this.filePath}).then((res=>{
        if(res.success){
          this.$message.success('申请成功！')
          this.$router.push("/myHome/index");
        }
      }))
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 30px;
  height: 100%;
  .suggest {
    padding-bottom: 20px;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 30px;
    .title {
      font-size: 14px;
      color: #8d8d8d;
      font-weight: 600;
    }
    .content {
      font-size: 14px;
      color: #8d8d8d;
      margin-bottom: 20px;
    }
  }
  .text {
    line-height: 40px;
    float: left;
  }
  .tt-box {
    float: left;
    .down {
      line-height: 40px;
      color: #1890ff;
    }
  }
  .btn-box {
    margin-top: 60px;
    margin-left: 60px;
  }
}
.el-upload-list__item:hover{
  cursor: pointer;
}
</style>

<template>
  <div class="acriveAdd comModal">
    <el-form
      class="comFormBox"
      :model="activityForm"
      ref="activityForm"
      label-width="120px"
      label="left"
      line="true"
    >
      <el-row class="m-t-20">
        <el-col :span="10">
          <el-form-item label="活动名称：" class="mustFill">
            <el-input v-model="activityForm.name" placeholder="请输入活动名称" :disabled="check"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="活动类型：" class="mustFill">
            <el-select v-model="activityForm.activityType" placeholder="请选择活动类型" :disabled="check">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :value="item.dictKey"
                :label="item.dictVal"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="活动开始结束时间：" class="mustFill" >
            <el-date-picker
              v-model="activityForm.actStart"
              :disabled="check"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp" 
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="活动报到开始结束时间:" class="mustFill">
            <el-date-picker
              v-model="activityForm.liveRep"
              :disabled="check"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="活动报名开始结束时间：" class="mustFill">
            <el-date-picker
              v-model="activityForm.actSign"
              :disabled="check"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="活动地点：" class="mustFill">
            <el-input v-model="activityForm.address" placeholder="请输入活动地点" :disabled="check"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="活动人数：" class="mustFill">
            <el-input
              v-model="activityForm.activityPersonNum"
              placeholder="请输入活动人数"
              :disabled="check"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="会员单位允许报名人数：" class="mustFill">
            <el-input
              v-model="activityForm.organPersonNum"
              placeholder="请输入会员单位允许报名人数"
              :disabled="check"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="附件" class="mustFill">
            <el-upload
              :disabled="check"
              class="upload-box"
              :multiple="false"
              ref="uploadApplication"
              :action="global.baseUrl+global.commonFileUploadUrl"
              :http-request="uploadFile"
              :on-change="getWordList"
              :show-file-list = "false"
              >
              <el-button size="small" icon="el-icon-upload2" :disabled="check">上传文件</el-button>
              
            </el-upload>
            <div style="margin-left:10px;" v-if="activityForm.filePath">
              <span style="margin-right:10px;">{{activityForm.fileName}}</span>
              <a v-if="activityForm.fileName && activityForm.filePath" :href="activityForm.filePath" target="_blank" class="buttonText">下载</a>
              <!-- <a v-if="activityForm.fileName && activityForm.filePath" href="javascript：void(0)"  class="buttonText">删除</a> -->
              <span v-if="activityForm.fileName && activityForm.filePath" @click="onClearW" class="buttonText" :style="!check?{color:'#f56c6c',cursor:'pointer',marginLeft:'10px'}:'margin-left:10px;'">删除</span>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="10"></el-col>
      </el-row>
    </el-form>
    <msgPush title="消息推送：" :bus="bus" :id="id" :check="check" :pushType="1" style="padding:0;"></msgPush>
    <div class="footBtnBox text_right" v-if="!check">
      <el-button @click="queryBtn" type>取消</el-button>
      <el-button @click="keepBtn" type>保存</el-button>
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </div>
    <div class="footBtnBox text_right" v-if="check">
      <el-button @click="queryBtn" type>返回</el-button>
    </div>
  </div>
</template>
<script>
import {
  warnMES,
  successMES,
  tipMES,
  pageTen,
  pubParam,
  apiSelect,
  apiMemberStatus,
  apiPublishStatus,
  selectType,
  selectVal,
  pageChange,
  queryResp,
  mapTime,
  getDateTime
} from "../../utils/common";
  import global from '@/utils/global'
import { apiAct, backPage, apiChose } from "../../utils/commonApi";
import { memberUploadFile,uploadFile } from "./../../http/moudules/common"
import { format } from "../../utils/datetime";
import msgPush from "@/views/common/msgPush";
import Vue from "vue";

export default {
  data() {
    return {
      bus: new Vue(),
      addVisible: false,
      activityForm: {
        name: "",
        type: "",
        address:'',
        actStart: [],
        liveRep: [],
        actSign: [],
        place: "",
        person: "",
        number: "",
        activityPersonNum:'',
        organPersonNum:'',
        filePath:'',//文件地址string化
        fileName:'',//文件名
      },
      typeList: [],
      id: "",
      typeId: 0,
      msgParam: {},

      check: false,
    };
  },
  created() {
    apiSelect({ type: 6 }, this.typeList); // 活动类型
    
    this.bus.$on("msgBox", data => {
      this.msgParam = data;
      // console.log(data)
    });
    if (this.$route.query.rowId) {
      this.id = this.$route.query.rowId + '';
      console.log(this.id)
      this.check = this.$route.query.check ? true : false;
      if(this.check){
        this.$store.commit('setHeadTitle','查看');
        // this.$store.state.app.headTitle = '查看';
      }
      apiAct("viewData", { id: this.id }).then(resolve => {
        console.log()
        this.activityForm = {
          name: resolve.name,
          address: resolve.address,
          activityType: resolve.activityType,
          actStart: [new Date(resolve.activityDateStart), new Date(resolve.activityDateEnd)],
          liveRep: [new Date(resolve.checkInDateStart), new Date(resolve.checkInDateEnd)],
          actSign: [new Date(resolve.enrolDateStart), new Date(resolve.enrolDateEnd)],
          organPersonNum: resolve.organPersonNum,
          activityPersonNum: resolve.activityPersonNum,
          filePath: resolve.filePath,
          fileName: resolve.fileName
        };
      });
    }
  },
  mounted(){
    
    
  },
  methods: {
    onClearW(){
      if(this.check){
        return;
      }
      this.$confirm(
        "确认删除此文件?",
        "",
        {
          confirmButtonText: "继续",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.activityForm.filePath = '';
        this.activityForm.fileName = '';
      })
      .catch(() => {
        // tipMES("已取消");
      });
    },
    queryBtn(){//取消按钮点击
      this.$router.go(-1);
    },
    keepBtn(){
      this.submitAnn(1);
    },
    submitForm() {
      // 验证
      if(this.activityForm.name.trim().length == 0){
        warnMES("请输入活动名称");
        return;
      } 
      if(!this.activityForm.activityType){
        warnMES("请选择活动类型");
        return;
      }
      if(this.activityForm.actStart.length !=2){
        warnMES("请选择正确的活动开始时间");
        return;
      }
      if(this.activityForm.liveRep.length !=2){
        warnMES("请选择正确的活动报道开始时间");
        return;
      }
      if(this.activityForm.actSign.length !=2){
        warnMES("请选择正确的活动报名开始结束时间");
        return;
      }
      if(this.activityForm.address.trim().length == 0){
        warnMES("请输入活动地点");
        return;
      }
      console.log(this.activityForm.activityPersonNum)
      if(this.activityForm.activityPersonNum == ''){
        warnMES("请输入活动人数");
        return;
      }
      if(this.activityForm.organPersonNum == ''){
        warnMES("请输入会员单位允许报名人数");
        return;
      }
      console.log(this.activityForm.filePath)
      if(!this.activityForm.filePath || this.activityForm.filePath==''){
        warnMES("请上传附件");
        return;
      }
      // if(!this.msgParam.companyIdList || this.msgParam.companyIdList.length == 0){
      //   warnMES("请添加会员");
      //   return;
      // }
      this.$confirm(
        "请注意，活动提交后将需要经过审批流程，审批期间及审批后无法再对活动进行编辑",
        "",
        {
          confirmButtonText: "继续",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.submitAnn(2);
        })
        // .catch(() => {
        //   // tipMES("已取消");
        // });
    },
    getWordList(file,fileList){
      // this.activityForm.filePath = fileList;
    },
    uploadFile(obj){//上传文件
        if( Math.floor( obj.file.size/(1024*1024) ) > 10 ){
            warnMES('最多上传10M')
            return
        }
        let formData = new FormData();
        formData.append('file',obj.file);
        let url="",method="";
        // if(obj.data.id==1){
        //     url="/api/member/company/file/rhsqh_upload";
        //     method="post"
        // }
        let that = this;
        uploadFile(formData,url,method).then((res=>{
          if(res && res.code=='200' && res.data){
              successMES('上传成功');
              console.log(obj)
              console.log(res)
              that.activityForm.filePath = res.data.fullPath;
              that.activityForm.fileName = obj.file.name;
          }
        })).catch(error=>{

        })
    },
    // 新建 提交或保存type:1是保存草稿，2是提交 ,
    submitAnn(type) {
      // type:
      
      apiAct("newActive", {
        name: this.activityForm.name,
        address: this.activityForm.address,
        activityType: this.activityForm.activityType,
        activityDateStart: this.activityForm.actStart[0],
        activityDateEnd: this.activityForm.actStart[1],
        checkInDateStart: this.activityForm.liveRep[0],
        checkInDateEnd: this.activityForm.liveRep[1],
        enrolDateStart: this.activityForm.actSign[0],
        enrolDateEnd: this.activityForm.actSign[1],
        organPersonNum: this.activityForm.organPersonNum,
        activityPersonNum: this.activityForm.activityPersonNum,
        filePath: this.activityForm.filePath,
        fileName: this.activityForm.fileName,
        id: this.id,
        draftOrSubmit:type?type:2
      }).then(resolve => {
        window.history.back(-1);
        this.typeId = resolve;
        console.log(this.msgParam);
        if(this.msgParam && this.msgParam.companyIdList.length){
          this.newGet(resolve);
        }
      });
    },
    // 新建 推送
    newGet(obj) {
      this.$api.member
        .publicMsg({
          companyIdList: this.msgParam.companyIdList
            ? this.msgParam.companyIdList
            : [],
          flagMessageRemind: this.msgParam.flagMessageRemind
            ? this.msgParam.flagMessageRemind
            : 2,
          flagEmailRemind: this.msgParam.flagEmailRemind
            ? this.msgParam.flagEmailRemind
            : 2,
          groupIdList: this.msgParam.groupIdList
            ? this.msgParam.groupIdList
            : [],
          typeId: obj.id||null,
          type: 1
        })
        .then(res => {
          if (res.success) {
            successMES("提交成功");
          } else {
            warnMES(res.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    backWin(){
      window.history.back(-1);
    }
  },
  components: {
    msgPush
  }
};
</script>
<style lang="less">
.acriveAdd {
  .spantext {
    display: inline-block;
    margin-right: 150px;
  }
  .p-t-b-10 {
    padding: 10px 0;
  }
  .vipBox {
    width: 400px;
    height: 200px;
    border-radius: 5px;
    padding: 10px 15px;
    border: 1px solid #e6e6e6;
    .el-tag {
      margin-right: 10px;
    }
    .el-checkbox {
      margin: 0 10px;
      display: block;
    }
    button {
      margin: 5px;
    }
  }
  .chooseBox {
    margin-bottom: 20px;
  }
  .comFormBox {
    // width: calc(100% - 160px);
    // padding: 0 20px 0 40px;
    .el-form-item {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      .el-form-item__label {
        line-height: 100% !important;
        text-align: left;
      }
      .el-form-item__content {
        -webkit-box-flex: 1;
        flex-grow: 1;
        margin-left: 0 !important;
        > .el-select {
          width: 85%;
          min-width: 200px;
        }
        > .el-input {
          width: 85% !important;
          min-width: 200px;
        }
        > .el-range-editor.el-input__inner {
          width: 85%;
        }
      }
      .avatar-uploader {
        .el-upload-list {
          .el-upload-list__item {
            width: 100px;
            height: 100px;
            line-height: 100px;
          }
        }
        .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          &:hover {
            border-color: #409eff;
          }
          &.el-upload--picture-card {
            width: 100px;
            height: 100px;
            line-height: 100px;
          }
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
        }
        .avatar {
          width: 100px;
          height: 100px;
          display: block;
        }
      }
      .el-date-editor .el-range-separator {
        min-width: 20px;
      }
    }
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .input_style,
  .el-range-editor.el-input__inner,
  .el-select {
    width: calc(100% - 140px);
  }
}
.footBtn {
  padding: 20px;
}
.acriveAdd{
  padding-bottom:60px;
}
</style>
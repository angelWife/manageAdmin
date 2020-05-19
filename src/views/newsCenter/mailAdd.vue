<template>
  <div class="myformAdd comModal hasfoot">
    <el-form class="comFormBox" label-width="120px" label="left">
      <el-row class="m-t-20" style="padding-left: 30px;">
        <el-col :span="20">
          <el-form-item label="邮件标题：">
            <el-input v-model="form.emailTitle" placeholder="请输邮件标题" :disabled="check"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="m-t-20" style="padding-left: 30px;">
        <el-col :span="20">
          <el-form-item label="邮件内容：">
            <el-card style="height: 680px;">
              <quill-editor
                v-model="form.emailData"
                :disabled="check"
                ref="myQuillEditor"
                style="height: 500px;"
              ></quill-editor>
            </el-card>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="padding-left: 30px;">
        <el-col :span="8">
          <el-form-item label="发送测试：">
            <el-input placeholder="请输入测试邮箱" v-model="form.email" :disabled="check">
              <el-button
                slot="append"
                type="primary"
                style="background-color: #409EFF;border-color: #409EFF;color:#fff"
              >发送测试邮箱</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <msgPush
        title="发送对象："
        :pushType="5"
        :bus="bus"
        :id="messageId"
        :check="check"
        :seleMember="true"
        :sendTime="true"
        platform="mail"
      ></msgPush>
    </el-form>
    <div class="footBtnBox text_right">
      <el-button type @click="back">取消</el-button>
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import msgPush from "@/views/common/msgPush";
import { apiDic, apiShow, backPage, publicMsg } from "../../utils/commonApi";
import { pageTen, pubParam, successMES } from "../../utils/common";

import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      bus: new Vue(),
      form: {
        emailTitle: "",
        emailData: "",
        email: ""
      },
      msgParam: {},
      sendParam: {},
      ObjParam: {},
      messageId: "",
      check: false,

      sendOn: {}
    };
  },
  created() {
    this.bus.$on("sendTime", data => {
      console.log("sendTime", data);
      this.sendParam = data;
    });

    this.bus.$on("msgBox", data => {
      console.log("msgBox", data);
      this.msgParam = data;
    });

    this.bus.$on("sendObj", data => {
      console.log("sendObj", data);
      this.ObjParam = data;
    });

    if (!!this.$route.query.rowId) {
      this.messageId = Number(this.$route.query.rowId);
      this.check = this.$route.query.check ? true : false;
      apiShow("message", "emailView", {
        id: this.messageId
      }).then(resolve => {
        this.form = {
          emailTitle: resolve.emailTitle,
          emailData: resolve.emailData
        };
        this.sendOn = {
          flagSendDelay: resolve.flagSendDelay,
          sendDate: resolve.sendTime
        };
        this.bus.$emit("timeEdit", this.sendOn);
        this.bus.$emit("sendObject", resolve.sendObjectType);
      });
    }
  },
  methods: {
    submitForm() {
      if(!!this.form.emailData&&!!this.form.emailTitle&&(this.msgParam.companyIdList.length>0||this.msgParam.groupIdList.length>0)){
        apiShow("message", "emailAdd", {
          ...this.form,
          ...this.sendParam,
          'id': this.messageId,
          'memberList': this.msgParam.companyIdList.join(","),
          'memberGroupList': this.msgParam.groupIdList.join(","),
          'sendObjectType':this.ObjParam
        }).then(resolve => {
          publicMsg(this.msgParam, resolve, 5, false, "mail", "emailPublish");
          this.$router.go(-1);
        });
      }else{
        this.$message({
          message: '请填写邮件内容，标题和接收人或组！',
          type: 'warning'
        });
      }
    },
    back(){
      this.$router.go(-1);
    }
  },
  components: {
    msgPush,
    quillEditor
  }
};
</script>
<style lang="less">
.myformAdd {
  .text {
    line-height: 20px;
  }
  .spantext {
    display: inline-block;
    margin-right: 50px;
  }
  .p-t-b-10 {
    padding: 10px 0;
  }
  .el-checkbox {
    margin: 0 10px;
  }
  .vipBox {
    width: 400px;
    height: 200px;
    border-radius: 5px;
    border: 1px solid #e6e6e6;
    button {
      margin: 5px;
    }
  }
  .chooseBox {
    margin-bottom: 20px;
  }
  .comFormBox {
    width: calc(100% - 160px);
    padding: 0 20px 0 40px;
    .el-form-item {
      .el-form-item__label {
        min-height: 10px;
      }
      .el-form-item__content {
        > .el-select {
          width: 80%;
          min-width: 200px;
        }
        > .el-input {
          width: 100% !important;
          min-width: 200px;
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
}
.footBtn {
  padding: 20px;
}
</style>

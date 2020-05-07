<template>
  <div class="myformAdd comModal hasfoot">
    <el-form class="comFormBox" ref="ruleForm" label-width="140px" label="left">
      <el-row class="m-t-20">
        <el-col :span="16">
          <el-form-item label="公告标题：">
            <el-input placeholder="请输公告标题" v-model="form.noticeTitle" :disabled="check"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="m-t-20">
        <el-col :span="16">
          <el-form-item label="公告内容：">
            <el-card style="height: 540px;">
              <quill-editor v-model="form.noticeData" style="height: 400px;" :disabled="check"></quill-editor>
            </el-card>
          </el-form-item>
        </el-col>
      </el-row>
      <msgPush
        title="发送对象："
        :seleMember="false"
        :sendTime="true"
        :bus="bus"
        :id="messageId"
        :check="check"
        :pushType="4"
      ></msgPush>
    </el-form>
    <div class="footBtnBox text_right">
      <el-button>取消</el-button>
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </div>
  </div>
</template>
<script>
import msgPush from "@/views/common/msgPush";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { apiDic, apiShow, backPage, publicMsg } from "../../utils/commonApi";
import { pageTen, pubParam, successMES } from "../../utils/common";
import Vue from "vue";

export default {
  components: {
    quillEditor,
    msgPush
  },
  data() {
    return {
      bus: new Vue(),
      form: {
        noticeTitle: "",
        noticeData: ""
      },
      msgParam: {},
      sendParam: {},
      messageId: "",
      check: false,

      sendOn: {}
    };
  },
  created() {
    this.bus.$on("sendTime", data => {
      console.log(data);
      this.sendParam = data;
    });

    this.bus.$on("msgBox", data => {
      console.log(data);
      this.msgParam = data;
    });

    if (!!this.$route.query.rowId) {
      this.messageId = Number(this.$route.query.rowId);
      this.check = this.$route.query.check ? true : false;
      apiShow("message", "noticeView", {
        id: this.messageId
      }).then(resolve => {
        this.form = {
          noticeTitle: resolve.noticeTitle,
          noticeData: resolve.noticeData
        };
        this.sendOn = {
          flagSendDelay: resolve.flagSendDelay,
          sendDate: resolve.sendDate
        };
        this.bus.$emit("timeEdit", this.sendOn);
      });
    }
  },
  methods: {
    submitForm() {
      apiShow("message", "noticeAdd", {
        ...this.form,
        ...this.sendParam,
        id: this.messageId
      }).then(resolve => {
        publicMsg(this.msgParam, resolve, 4, false, "", "noticePublish");
      });
    }
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
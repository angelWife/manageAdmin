<template>
  <div class="myformAdd comModal hasfoot">
    <el-form class="comFormBox" label-width="120px" label="left">
      <el-row class="m-t-20" style="padding-left: 30px;">
        <el-col :span="10">
          <el-form-item label="短信内容：">
            <el-input
              type="textarea"
              :disabled="check"
              v-model="form.messageContent"
              placeholder="请输入短信内容，注意不要超过140个字"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="padding-left: 30px;">
        <el-col :span="10">
          <el-form-item label="发送测试：">
            <el-input placeholder="请输入测试手机号" v-model="form.testMobileNum" :disabled="check">
              <el-button
                slot="append"
                type="primary"
                style="background-color: #409EFF;border-color: #409EFF;color:#fff"
              >发送短信测试</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <msgPush
        title="发送对象："
        :pushType="6"
        :bus="bus"
        :id="messageId"
        :seleMember="true"
        :sendTime="true"
        :check="check"
        platform="sms"
      ></msgPush>
    </el-form>
    <div class="footBtnBox text_right">
      <el-button type>取消</el-button>
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import msgPush from "@/views/common/msgPush";
import { apiDic, apiShow, backPage, publicMsg } from "../../utils/commonApi";
import { pageTen, pubParam, successMES } from "../../utils/common";

export default {
  data() {
    return {
      bus: new Vue(),
      form: {
        messageContent: "",
        testMobileNum: ""
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
      apiShow("message", "smsView", {
        id: this.messageId
      }).then(resolve => {
        this.form = {
          messageContent: resolve.messageContent,
          testMobileNum: resolve.testMobileNum
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
      apiShow("message", "smsAdd", {
        ...this.form,
        ...this.sendParam,
        id: this.messageId,
        sendObjectType: this.ObjParam
      }).then(resolve => {
        publicMsg(this.msgParam, resolve, 6, false, "sms", "smsPublish");
      });
    }
  },
  components: {
    msgPush
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
  .member-head {
    height: 50px;
  }
  .vipBox {
    height: 300px;
    border-radius: 5px;
    border: 1px solid #e6e6e6;
    padding: 10px;
    .el-checkbox {
      display: block;
      height: 30px;
    }
    .el-tag {
      margin-right: 10px;
    }
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